import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { consumeRateLimit, getClientIp, rateLimitHeaders } from '@/lib/rate-limit'
import { siteUrl } from '@/lib/site'
import { createServiceSupabase } from '@/lib/supabase/admin'
import { createUnsubscribeToken, normalizeSubscriberEmail } from '@/lib/unsubscribe-token'

export const dynamic = 'force-dynamic'

const REQUEST_LIMIT = 5
const REQUEST_WINDOW_SECONDS = 60 * 60
const NO_STORE = { 'Cache-Control': 'no-store, max-age=0' }
const GENERIC_RESPONSE = {
  success: true,
  message: 'If this address has an active subscription, we sent a secure unsubscribe link.',
}

function unsubscribeUrl(token: string): string {
  const url = new URL('/unsubscribe', siteUrl())
  url.searchParams.set('token', token)
  return url.toString()
}

export async function POST(req: Request) {
  const rate = await consumeRateLimit(
    `unsubscribe-request:${getClientIp(req)}`,
    REQUEST_LIMIT,
    REQUEST_WINDOW_SECONDS
  )
  if (!rate.allowed) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429, headers: { ...NO_STORE, ...rateLimitHeaders(rate) } }
    )
  }

  try {
    const body = (await req.json()) as { email?: unknown }
    const email = normalizeSubscriberEmail(body?.email)
    if (!email) return NextResponse.json(GENERIC_RESPONSE, { headers: NO_STORE })

    const { data: subscriber, error } = await createServiceSupabase()
      .from('subscribers')
      .select('email')
      .eq('email', email)
      .is('unsubscribed_at', null)
      .maybeSingle()

    if (error) throw error

    if (subscriber && process.env.RESEND_API_KEY) {
      const token = createUnsubscribeToken(email)
      const resend = new Resend(process.env.RESEND_API_KEY)
      await resend.emails.send({
        from: 'TN Visa Guide <hello@tnvisaguide.ca>',
        to: email,
        subject: 'Confirm your TN Visa Guide unsubscribe request',
        html: `
          <p>We received a request to unsubscribe this email address from TN Visa Guide.</p>
          <p><a href="${unsubscribeUrl(token)}">Confirm unsubscribe</a></p>
          <p style="font-size:12px;color:#888;">If you did not request this, no action is needed.</p>
        `,
      }).catch((err: unknown) => console.error('[unsubscribe-request] Email failed:', err))
    }

    return NextResponse.json(GENERIC_RESPONSE, { headers: NO_STORE })
  } catch (err) {
    console.error('[unsubscribe-request] Unexpected error:', err)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500, headers: NO_STORE }
    )
  }
}
