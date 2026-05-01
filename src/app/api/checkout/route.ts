import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const maxDuration = 15

const PRODUCTS: Record<string, { name: string; price: number; description: string }> = {
  'interview-kit': { name: 'TN Visa Border Interview Kit', price: 4900, description: '30+ CBP questions with ideal answers, profession-specific prep, and emergency scenarios.' },
  'letter-templates': { name: 'Employer Letter Template Pack', price: 2900, description: 'Templates for 10 TN professions with pre-written duties, qualifications, and temporary intent language.' },
  'complete-guide': { name: 'Complete TN Visa Application Guide', price: 6900, description: 'Interview Kit + Letter Templates + step-by-step walkthrough, document checklist, and renewal guide.' },
}

export async function POST(req: Request) {
  try {
    const { productId } = await req.json()
    const product = PRODUCTS[productId]
    if (!product) return NextResponse.json({ error: 'Invalid product' }, { status: 400 })

    const origin = req.headers.get('origin') || 'https://tnvisaguide.ca'

    const res = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.STRIPE_SECRET_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        'mode': 'payment',
        'payment_method_types[0]': 'card',
        'line_items[0][price_data][currency]': 'usd',
        'line_items[0][price_data][product_data][name]': product.name,
        'line_items[0][price_data][product_data][description]': product.description,
        'line_items[0][price_data][unit_amount]': product.price.toString(),
        'line_items[0][quantity]': '1',
        'success_url': `${origin}/products/success?session_id={CHECKOUT_SESSION_ID}`,
        'cancel_url': `${origin}/products`,
        'metadata[productId]': productId,
      }),
    })

    const data = await res.json()
    if (!res.ok) return NextResponse.json({ error: 'Stripe error', detail: data.error?.message || 'Unknown' }, { status: 500 })

    return NextResponse.json({ url: data.url })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: 'Failed to create checkout session', detail: message }, { status: 500 })
  }
}
