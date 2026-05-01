import { NextResponse } from 'next/server'
import Stripe from 'stripe'

export const dynamic = 'force-dynamic'

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

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: { name: product.name, description: product.description },
          unit_amount: product.price,
        },
        quantity: 1,
      }],
      success_url: `${req.headers.get('origin')}/products/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/products`,
      metadata: { productId },
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('Checkout error:', err)
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: 'Failed to create checkout session', detail: message }, { status: 500 })
  }
}
