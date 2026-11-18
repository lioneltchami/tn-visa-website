import { NextResponse } from 'next/server'
import { consumeRateLimit, getClientIp, rateLimitHeaders } from '@/lib/rate-limit'
import { createServiceSupabase } from '@/lib/supabase/admin'
import { verifyUnsubscribeToken } from '@/lib/unsubscribe-token'

export const dynamic = 'force-dynamic'

const UNSUBSCRIBE_LIMIT = 10
const UNSUBSCRIBE_WINDOW_SECONDS = 60 * 60
const NO_STORE = { 'Cache-Control': 'no-store, max-age=0' }

export async function POST(req: Request) {
  const rate = await consumeRateLimit(
    `unsubscribe:${getClientIp(req)}`,
    UNSUBSCRIBE_LIMIT,
    UNSUBSCRIBE_WINDOW_SECONDS
  )
  if (!rate.allowed) {
    return NextResponse.json(
      { error: 'Too many unsubscribe attempts. Please try again later.' },
      { status: 429, headers: { ...NO_STORE, ...rateLimitHeaders(rate) } }
    )
  }

  try {
    const body = (await req.json()) as { token?: unknown }
    const payload = verifyUnsubscribeToken(body?.token)
    if (!payload) {
      return NextResponse.json(
        { error: 'This unsubscribe link is invalid or has expired.' },
        { status: 403, headers: NO_STORE }
      )
    }

    // Upsert so profile-email / renewal-reminder opt-outs stick even when no
    // subscribers row exists yet (shouldSkipUnsubscribed only skips when set).
    const { error } = await createServiceSupabase()
      .from('subscribers')
      .upsert(
        { email: payload.email, unsubscribed_at: new Date().toISOString() },
        { onConflict: 'email' }
      )

    if (error) throw error

    // Idempotent: a valid token always gets success after the upsert lands.
    return NextResponse.json({ success: true }, { headers: NO_STORE })
  } catch (err) {
    console.error('[unsubscribe] Unexpected error:', err)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500, headers: NO_STORE }
    )
  }
}
