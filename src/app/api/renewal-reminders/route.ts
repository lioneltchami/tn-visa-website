import { type NextRequest, NextResponse } from 'next/server'
import { authorizeCronRequest, newRunId } from '@/lib/cron-auth'
import { consumeRateLimit } from '@/lib/rate-limit'
import { sendRenewalReminders } from '@/lib/renewal-reminders'

export const dynamic = 'force-dynamic'
export const maxDuration = 60

async function handle(req: NextRequest) {
  const unauthorized = authorizeCronRequest(req)
  if (unauthorized) return unauthorized

  const runId = newRunId()
  const dryRun = req.nextUrl.searchParams.get('dryRun') === '1'
  const startedAt = Date.now()

  const lock = await consumeRateLimit('renewal-reminders', 1, 30 * 60)
  if (!lock.allowed && !dryRun) {
    return NextResponse.json(
      { error: `Rate limited. Retry in ~${lock.resetSeconds}s.`, runId },
      { status: 429 }
    )
  }

  try {
    const result = await sendRenewalReminders({ dryRun })
    const durationMs = Date.now() - startedAt
    const success = result.failed === 0
    const status = success ? 200 : result.sent > 0 ? 207 : 500

    console.log(
      JSON.stringify({
        event: 'renewal-reminders.end',
        runId,
        durationMs,
        ...result,
        status,
      })
    )

    return NextResponse.json({ runId, durationMs, ...result }, { status })
  } catch (err) {
    console.error('[renewal-reminders] failed', { runId, err })
    return NextResponse.json(
      {
        runId,
        error: err instanceof Error ? err.message : 'Reminder run failed',
      },
      { status: 500 }
    )
  }
}

export async function GET(req: NextRequest) {
  return handle(req)
}

export async function POST(req: NextRequest) {
  return handle(req)
}
