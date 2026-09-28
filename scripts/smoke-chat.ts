/**
 * Production smoke test for the public chat assistant.
 * Parses the AI SDK data stream and checks for guide-grounded answers.
 *
 * Usage:
 *   npm run smoke:chat
 *   SMOKE_CHAT_ORIGIN=https://tnvisaguide.ca npm run smoke:chat
 */

const ORIGIN = (process.env.SMOKE_CHAT_ORIGIN ?? 'https://tnvisaguide.ca').replace(/\/+$/, '')
const CHAT_URL = `${ORIGIN}/api/chat`
/** GitHub-hosted runners often eat a Cloudflare interstitial on the first hit. */
const CF_RETRY_DELAYS_MS = [2000, 4000]

const FALLBACK_MARKERS = [
  "i don't have specific information about that",
  'i don\u2019t have specific information about that',
]

type Case = {
  name: string
  question: string
  assert: (answer: string) => boolean
  hint: string
}

const CASES: Case[] = [
  {
    name: 'fees',
    question: 'What is the TN processing fee?',
    assert: (answer) =>
      /\$?\s*50\b/.test(answer) && !FALLBACK_MARKERS.some((m) => answer.toLowerCase().includes(m)),
    hint: 'Expect $50 CBP processing fee and no fallback phrase',
  },
  {
    name: 'poe',
    question: 'How do Canadians apply for a TN visa at a port of entry?',
    assert: (answer) =>
      /port of entry|border|cbp|preclearance|secondary inspection/i.test(answer) &&
      !FALLBACK_MARKERS.some((m) => answer.toLowerCase().includes(m)),
    hint: 'Expect POE/CBP guidance and no fallback phrase',
  },
]

export function isCloudflareChallenge(status: number, body: string): boolean {
  if (status !== 403 && status !== 503) return false
  const head = body.slice(0, 500).toLowerCase()
  return head.includes('just a moment') || head.includes('cdn-cgi/challenge')
}

function parseDataStream(raw: string): string {
  const chunks: string[] = []

  for (const line of raw.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed.startsWith('0:')) continue
    const payload = trimmed.slice(2)
    try {
      const parsed = JSON.parse(payload)
      if (typeof parsed === 'string') chunks.push(parsed)
    } catch {
      chunks.push(payload)
    }
  }

  return chunks.join('').trim()
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function askOnce(question: string): Promise<{ status: number; answer: string; raw: string }> {
  const response = await fetch(CHAT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Origin: ORIGIN,
      Referer: `${ORIGIN}/`,
      Accept: 'text/plain, */*',
      'User-Agent': 'tnvisa-chat-smoke/1.0',
    },
    body: JSON.stringify({
      messages: [{ role: 'user', content: question }],
    }),
  })

  const raw = await response.text()
  return {
    status: response.status,
    answer: parseDataStream(raw),
    raw,
  }
}

async function ask(question: string): Promise<{ status: number; answer: string; raw: string }> {
  let result = await askOnce(question)
  for (let i = 0; i < CF_RETRY_DELAYS_MS.length; i++) {
    if (!isCloudflareChallenge(result.status, result.raw)) break
    const delay = CF_RETRY_DELAYS_MS[i]
    console.log(`  Cloudflare challenge, retry in ${delay / 1000}s`)
    await sleep(delay)
    result = await askOnce(question)
  }
  return result
}

async function main() {
  console.log(`Chat smoke against ${ORIGIN}`)
  let failed = 0

  for (const testCase of CASES) {
    process.stdout.write(`• ${testCase.name}… `)
    try {
      const { status, answer, raw } = await ask(testCase.question)
      if (status !== 200) {
        failed += 1
        console.log('FAIL')
        console.log(`  HTTP ${status}: ${raw.slice(0, 240)}`)
        continue
      }

      if (!answer) {
        failed += 1
        console.log('FAIL')
        console.log('  Empty parsed answer from data stream')
        continue
      }

      if (!testCase.assert(answer)) {
        failed += 1
        console.log('FAIL')
        console.log(`  Hint: ${testCase.hint}`)
        console.log(`  Answer preview: ${answer.slice(0, 280).replace(/\s+/g, ' ')}`)
        continue
      }

      console.log('PASS')
    } catch (error) {
      failed += 1
      console.log('FAIL')
      console.log(`  ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  if (failed > 0) {
    console.error(`\n${failed}/${CASES.length} chat smoke checks failed`)
    process.exit(1)
  }

  console.log(`\nAll ${CASES.length} chat smoke checks passed`)
}

const entry = process.argv[1]?.replace(/\\/g, '/')
if (entry?.endsWith('scripts/smoke-chat.ts') || entry?.endsWith('scripts/smoke-chat.js')) {
  main()
}
