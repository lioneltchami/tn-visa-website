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

    const supabase = createServiceSupabase()
    const markUnsubscribed = () =>
      supabase
        .from('subscribers')
        .update({ unsubscribed_at: new Date().toISOString() })
        .eq('email', payload.email)
        .is('unsubscribed_at', null)
        .select('id')

    const updated = await markUnsubscribed()
    if (updated.error) throw updated.error

    if (!updated.data?.length) {
      const existing = await supabase
        .from('subscribers')
        .select('id, unsubscribed_at')
        .eq('email', payload.email)
        .maybeSingle<{ id: string; unsubscribed_at: string | null }>()

      if (existing.error) throw existing.error

      if (!existing.data) {
        const inserted = await supabase.from('subscribers').insert({
          email: payload.email,
          unsubscribed_at: new Date().toISOString(),
        })

        // Concurrent subscribe/unsubscribe won the insert. Set the opt-out on that row.
        if (inserted.error?.code === '23505') {
          const raced = await markUnsubscribed()
          if (raced.error) throw raced.error
        } else if (inserted.error) {
          throw inserted.error
        }
      } else if (!existing.data.unsubscribed_at) {
        // Row appeared after the first update and is still subscribed.
        const retry = await markUnsubscribed()
        if (retry.error) throw retry.error
        if (!retry.data?.length) throw new Error('Failed to record unsubscribe')
      }
    }

    // The operation is idempotent. A valid token always receives the same
    // response, whether the address was already unsubscribed or had no row yet.
    return NextResponse.json({ success: true }, { headers: NO_STORE })
  } catch (err) {
    console.error('[unsubscribe] Unexpected error:', err)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500, headers: NO_STORE }
    )
  }
}
