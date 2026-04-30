import { openai } from '@ai-sdk/openai'
import { streamText } from 'ai'
import { createClient } from '@supabase/supabase-js'

export const maxDuration = 30
export const dynamic = 'force-dynamic'

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
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
  const embeddingResponse = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ model: 'text-embedding-3-small', input: query }),
  })
  const { data } = await embeddingResponse.json()
  if (!data?.[0]?.embedding) return ''

  const { data: matches } = await getSupabase().rpc('match_content', {
    query_embedding: JSON.stringify(data[0].embedding),
    match_threshold: 0.5,
    match_count: 5,
  })

  if (!matches?.length) return ''
  return matches.map((m: { content: string; metadata: { section?: string } }) =>
    `[Section: ${m.metadata?.section || 'General'}]\n${m.content}`
  ).join('\n\n---\n\n')
}

export async function POST(req: Request) {
  const { messages } = await req.json()
  const lastMessage = messages[messages.length - 1]?.content || ''

  const context = await getRelevantContext(lastMessage)

  const result = streamText({
    model: openai('gpt-4o-mini'),
    system: `${SYSTEM_PROMPT}\n\n--- CONTEXT FROM TN VISA GUIDE ---\n${context || 'No relevant context found.'}\n--- END CONTEXT ---`,
    messages,
  })

  return result.toDataStreamResponse()
}
