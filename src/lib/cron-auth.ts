import { NextResponse } from 'next/server'
import { timingSafeEqualString } from '@/lib/hmac'

/**
 * Shared auth for GitHub scheduled workflows and manual Bearer triggers.
 * Send `Authorization: Bearer $CRON_SECRET` (or `$SYNC_SECRET`).
 */

function safeEqual(a: string, b: string): boolean {
  return timingSafeEqualString(a, b)
}

export function authorizeCronRequest(req: Request): NextResponse | null {
  const syncSecret = process.env.SYNC_SECRET
  const cronSecret = process.env.CRON_SECRET

  if (!syncSecret && !cronSecret) {
    console.error('[cron] Neither SYNC_SECRET nor CRON_SECRET is configured')
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }

  const authHeader = req.headers.get('authorization')
  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const token = authHeader.slice('Bearer '.length)
  const okSync = Boolean(syncSecret && safeEqual(token, syncSecret))
  const okCron = Boolean(cronSecret && safeEqual(token, cronSecret))

  if (!okSync && !okCron) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  return null
}

export function newRunId(): string {
  return `run_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`
}
