import { openai } from '@ai-sdk/openai'
import { streamText } from 'ai'
import { consumeRateLimit, getClientIp, rateLimitHeaders } from '@/lib/rate-limit'
import { isAllowedOrigin } from '@/lib/site'
import {
  CHAT_RETRIEVAL_MATCH_COUNT,
  getChatMatchThreshold,
  shouldRetryWithoutThreshold,
} from '@/lib/chat-retrieval'
import { createServiceSupabase } from '@/lib/supabase/admin'

export const maxDuration = 30
export const dynamic = 'force-dynamic'

const MAX_MESSAGES = 20
const MAX_MESSAGE_CHARS = 1500
const MAX_TOTAL_CHARS = 12_000
const MAX_RESPONSE_TOKENS = 700
const EMBEDDING_TIMEOUT_MS = 8_000

function envNumber(name: string, fallback: number): number {
  const parsed = Number(process.env[name])
  return Number.isFinite(parsed) && parsed > 0 ? Math.floor(parsed) : fallback
}

/**
 * Every reply costs an embedding call plus a completion, so the endpoint is
 * capped three ways: short-term burst per IP, daily per IP, and a site-wide
 * daily ceiling that bounds the worst-case OpenAI bill.
 */
function rateLimitPlan(ip: string) {
  return [
    {
      key: `chat:burst:${ip}`,
      limit: envNumber('CHAT_BURST_LIMIT', 8),
      windowSeconds: 5 * 60,
    },
    {
      key: `chat:daily:${ip}`,
      limit: envNumber('CHAT_IP_DAILY_LIMIT', 40),
      windowSeconds: 86_400,
    },
    {
      key: 'chat:daily:global',
      limit: envNumber('CHAT_GLOBAL_DAILY_LIMIT', 1_200),
      windowSeconds: 86_400,
    },
  ]
}

type ChatMessage = { role: 'user' | 'assistant'; content: string }

/** Drop anything the client should not control (system prompts, tool calls). */
function sanitizeMessages(value: unknown): ChatMessage[] | null {
  if (!Array.isArray(value) || value.length === 0 || value.length > MAX_MESSAGES) return null

  const messages: ChatMessage[] = []
  let totalChars = 0

  for (const raw of value) {
    if (!raw || typeof raw !== 'object') return null

    const { role, content } = raw as { role?: unknown; content?: unknown }
    if (role !== 'user' && role !== 'assistant') return null
    if (typeof content !== 'string') return null

    const trimmed = content.trim()
    if (!trimmed) continue
    if (trimmed.length > MAX_MESSAGE_CHARS) return null

    totalChars += trimmed.length
    if (totalChars > MAX_TOTAL_CHARS) return null

    messages.push({ role, content: trimmed })
  }

  return messages.length > 0 ? messages : null
}

function getSupabase() {
  return createServiceSupabase()
}

function getSupabaseHost(): string {
  try {
    return new URL(process.env.NEXT_PUBLIC_SUPABASE_URL ?? '').host || 'missing'
  } catch {
    return 'invalid'
  }
}

const SYSTEM_PROMPT = `You are a TN visa expert assistant for Canadian professionals seeking to work in the United States under USMCA.

Rules:
- Answer questions using ONLY the provided context from the TN Visa Guide.
- If the context doesn't contain the answer, say "I don't have specific information about that. Please check the relevant page on our site or consult an immigration lawyer."
- Always recommend consulting an immigration lawyer for specific cases.
- Never provide legal advice. You provide general information only.
- Cite the relevant section when possible (e.g., "According to the Fees section...").
- Be concise — aim for 2-4 paragraphs maximum.
- If asked about the June 2025 USCIS policy update, emphasize that Computer Science degrees no longer qualify for the Engineer category.
- Always note that self-employment is banned on TN visas since June 2025.
- Format responses with markdown for readability.`

async function getRelevantContext(query: string): Promise<string> {
  if (query.length < 3) return ''

  try {
    const embeddingResponse = await fetch('https://api.openai.com/v1/embeddings', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ model: 'text-embedding-3-small', input: query }),
      signal: AbortSignal.timeout(EMBEDDING_TIMEOUT_MS),
    })

    if (!embeddingResponse.ok) {
      console.error('[chat] Embedding request failed:', embeddingResponse.status)
      return ''
    }

    const { data } = await embeddingResponse.json()
    if (!data?.[0]?.embedding) return ''

    const matchThreshold = getChatMatchThreshold(process.env.CHAT_MATCH_THRESHOLD)
    const supabase = getSupabase()
    let { data: matches, error } = await supabase.rpc('match_content', {
      query_embedding: JSON.stringify(data[0].embedding),
      match_threshold: matchThreshold,
      match_count: CHAT_RETRIEVAL_MATCH_COUNT,
    })

    if (error) {
      console.error('[chat] match_content failed:', error.message)
      return ''
    }

    if (shouldRetryWithoutThreshold(matches?.length ?? 0, matchThreshold)) {
      console.info(`[chat] No content matches at threshold ${matchThreshold}; retrying ranked retrieval`)
      const retry = await supabase.rpc('match_content', {
        query_embedding: JSON.stringify(data[0].embedding),
        match_threshold: 0,
        match_count: CHAT_RETRIEVAL_MATCH_COUNT,
      })
      matches = retry.data
      error = retry.error
    }

    if (error) {
      console.error('[chat] ranked match_content retry failed:', error.message)
      return ''
    }
    if (!matches?.length) {
      console.info('[chat] No content matches after ranked retrieval retry', {
        supabaseHost: getSupabaseHost(),
        serviceRoleConfigured: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
      })
      return ''
    }

    return matches
      .map(
        (m: { content: string; metadata: { section?: string } }) =>
          `[Section: ${m.metadata?.section || 'General'}]\n${m.content}`
      )
      .join('\n\n---\n\n')
  } catch (err) {
    console.error('[chat] Context lookup failed:', err)
    return ''
  }
}

export async function POST(req: Request) {
  if (!process.env.OPENAI_API_KEY) {
    console.error('[chat] OPENAI_API_KEY is not configured')
    return Response.json({ error: 'The assistant is temporarily unavailable.' }, { status: 503 })
  }

  const origin = req.headers.get('origin')
  if (origin && !isAllowedOrigin(origin)) {
    return Response.json({ error: 'Requests from this origin are not allowed.' }, { status: 403 })
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return Response.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const messages = sanitizeMessages((body as { messages?: unknown })?.messages)
  if (!messages) {
    return Response.json(
      {
        error: `Please keep it to ${MAX_MESSAGES} messages of up to ${MAX_MESSAGE_CHARS} characters each.`,
      },
      { status: 400 }
    )
  }

  const ip = getClientIp(req)
  for (const rule of rateLimitPlan(ip)) {
    const result = await consumeRateLimit(rule.key, rule.limit, rule.windowSeconds)
    if (!result.allowed) {
      const isGlobal = rule.key.endsWith('global')
      return Response.json(
        {
          error: isGlobal
            ? 'The assistant has hit its daily limit. Please try again tomorrow or browse the guide pages.'
            : 'You have reached the chat limit. Please try again a bit later.',
        },
        { status: 429, headers: rateLimitHeaders(result) }
      )
    }
  }

  const lastUserMessage = [...messages].reverse().find((m) => m.role === 'user')?.content ?? ''
  const context = await getRelevantContext(lastUserMessage)

  const result = streamText({
    model: openai('gpt-4o-mini'),
    system: `${SYSTEM_PROMPT}\n\n--- CONTEXT FROM TN VISA GUIDE ---\n${context || 'No relevant context found.'}\n--- END CONTEXT ---`,
    messages,
    maxTokens: MAX_RESPONSE_TOKENS,
  })

  return result.toDataStreamResponse()
}
