import { NextResponse } from 'next/server'
import { getProduct } from '@/lib/products'
import { consumeRateLimit, getClientIp, rateLimitHeaders } from '@/lib/rate-limit'
import { resolveOrigin } from '@/lib/site'

export const dynamic = 'force-dynamic'
export const maxDuration = 15

const CHECKOUT_LIMIT = 15
const CHECKOUT_WINDOW_SECONDS = 60 * 60

export async function POST(req: Request) {
  if (!process.env.STRIPE_SECRET_KEY) {
    console.error('[checkout] STRIPE_SECRET_KEY is not configured')
    return NextResponse.json({ error: 'Checkout is temporarily unavailable.' }, { status: 503 })
  }

  const rate = await consumeRateLimit(
    `checkout:${getClientIp(req)}`,
    CHECKOUT_LIMIT,
    CHECKOUT_WINDOW_SECONDS
  )
  if (!rate.allowed) {
    return NextResponse.json(
      { error: 'Too many checkout attempts. Please try again later.' },
      { status: 429, headers: rateLimitHeaders(rate) }
    )
  }

  let productId: unknown
  try {
    productId = (await req.json())?.productId
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const product = getProduct(productId)
  if (!product) return NextResponse.json({ error: 'Invalid product' }, { status: 400 })

  const origin = resolveOrigin(req)

  try {
    const res = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        mode: 'payment',
        'payment_method_types[0]': 'card',
        'line_items[0][price_data][currency]': 'usd',
        'line_items[0][price_data][product_data][name]': product.name,
        'line_items[0][price_data][product_data][description]': product.description,
        'line_items[0][price_data][unit_amount]': product.priceCents.toString(),
        'line_items[0][quantity]': '1',
        success_url: `${origin}/products/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/products`,
        'metadata[productId]': product.id,
      }),
    })

    const data = await res.json()

    if (!res.ok || !data?.url) {
      console.error(
        '[checkout] Stripe session creation failed:',
        data?.error?.message || res.status
      )
      return NextResponse.json(
        { error: 'Could not start checkout. Please try again.' },
        { status: 502 }
      )
    }

    return NextResponse.json({ url: data.url }, { headers: rateLimitHeaders(rate) })
  } catch (err) {
    console.error('[checkout] Unexpected error:', err)
    return NextResponse.json(
      { error: 'Could not start checkout. Please try again.' },
      { status: 500 }
    )
  }
}
