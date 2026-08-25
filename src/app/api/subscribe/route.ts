import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { consumeRateLimit, getClientIp, rateLimitHeaders } from '@/lib/rate-limit'
import { siteUrl } from '@/lib/site'
import { createServiceSupabase } from '@/lib/supabase/admin'
import { createUnsubscribeToken, normalizeSubscriberEmail } from '@/lib/unsubscribe-token'

export const dynamic = 'force-dynamic'

const SUBSCRIBE_LIMIT = 5
const SUBSCRIBE_WINDOW_SECONDS = 60 * 60
const NO_STORE = { 'Cache-Control': 'no-store, max-age=0' }

type SubscribeRequest = {
  email?: unknown
  name?: unknown
  interests?: unknown
}

function normalizeName(value: unknown): string | null {
  if (typeof value !== 'string') return null
  const name = value.trim()
  return name ? name.slice(0, 120) : null
}

function normalizeInterests(value: unknown): string[] {
  if (!Array.isArray(value)) return []

  return value
    .filter((item): item is string => typeof item === 'string')
    .map((item) => item.trim().slice(0, 80))
    .filter(Boolean)
    .slice(0, 10)
}

function unsubscribeUrl(token: string): string {
  const url = new URL('/unsubscribe', siteUrl())
  url.searchParams.set('token', token)
  return url.toString()
}

export async function POST(req: Request) {
  const rate = await consumeRateLimit(
    `subscribe:${getClientIp(req)}`,
    SUBSCRIBE_LIMIT,
    SUBSCRIBE_WINDOW_SECONDS
  )
  if (!rate.allowed) {
    return NextResponse.json(
      { error: 'Too many subscription attempts. Please try again later.' },
      { status: 429, headers: { ...NO_STORE, ...rateLimitHeaders(rate) } }
    )
  }

  try {
    const body = (await req.json()) as SubscribeRequest
    const email = normalizeSubscriberEmail(body?.email)
    if (!email) {
      return NextResponse.json(
        { error: 'Valid email is required.' },
        { status: 400, headers: NO_STORE }
      )
    }

    const name = normalizeName(body.name)
    const interests = normalizeInterests(body.interests)
    const shouldSendWelcomeEmail = Boolean(process.env.RESEND_API_KEY)
    const token = shouldSendWelcomeEmail ? createUnsubscribeToken(email) : null

    const { error: dbError } = await createServiceSupabase().from('subscribers').insert({
      email,
      name,
      interests,
    })

    if (dbError && dbError.code !== '23505') throw dbError

    // Do not reveal whether an email was already subscribed. This response is
    // intentionally the same for first-time and duplicate submissions.
    if (!dbError && shouldSendWelcomeEmail && token) {
      const resend = new Resend(process.env.RESEND_API_KEY)
      await resend.emails.send({
        from: 'TN Visa Guide <hello@tnvisaguide.ca>',
        to: email,
        subject: 'Welcome to TN Visa Guide — Here’s your free checklist',
        html: `
          <h2>Welcome to TN Visa Guide!</h2>
          <p>Thanks for subscribing${name ? `, ${name}` : ''}. Here's what you'll get:</p>
          <ul>
            <li>Policy change alerts (USMCA review, USCIS updates)</li>
            <li>TN visa tips and guides</li>
            <li>New TN-friendly job postings</li>
          </ul>
          <p><strong>Your free checklist:</strong> Visit <a href="${siteUrl()}/documents">tnvisaguide.ca/documents</a> for the complete TN visa document checklist.</p>
          <p>— The TN Visa Guide Team</p>
          <hr />
          <p style="font-size:12px;color:#888;">You're receiving this because you subscribed at tnvisaguide.ca. <a href="${unsubscribeUrl(token)}">Unsubscribe</a></p>
        `,
      }).catch((err: unknown) => console.error('[subscribe] Welcome email failed:', err))
    }

    return NextResponse.json({ success: true }, { headers: NO_STORE })
  } catch (err) {
    console.error('[subscribe] Unexpected error:', err)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500, headers: NO_STORE }
    )
  }
}
