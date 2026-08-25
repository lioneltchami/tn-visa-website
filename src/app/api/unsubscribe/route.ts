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

    const { error } = await createServiceSupabase()
      .from('subscribers')
      .update({ unsubscribed_at: new Date().toISOString() })
      .eq('email', payload.email)
      .is('unsubscribed_at', null)

    if (error) throw error

    // The operation is idempotent. A valid token always receives the same
    // response, whether the address was already unsubscribed or no longer exists.
    return NextResponse.json({ success: true }, { headers: NO_STORE })
  } catch (err) {
    console.error('[unsubscribe] Unexpected error:', err)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500, headers: NO_STORE }
    )
  }
}
