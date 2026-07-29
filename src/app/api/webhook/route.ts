import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { sendPurchaseEmail } from '@/lib/fulfillment'
import { getProduct } from '@/lib/products'
import { claimFulfillment, ensurePurchase, releaseFulfillment } from '@/lib/purchases'

export const dynamic = 'force-dynamic'
export const maxDuration = 30

export async function POST(req: Request) {
  const secretKey = process.env.STRIPE_SECRET_KEY
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!secretKey || !webhookSecret) {
    console.error('[webhook] Stripe keys are not configured')
    return NextResponse.json({ error: 'Not configured' }, { status: 503 })
  }

  const signature = req.headers.get('stripe-signature')
  if (!signature) return NextResponse.json({ error: 'Missing signature' }, { status: 400 })

  const body = await req.text()

  let event: Stripe.Event
  try {
    event = new Stripe(secretKey).webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err) {
    console.error('[webhook] Signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type !== 'checkout.session.completed') {
    return NextResponse.json({ received: true, ignored: event.type })
  }

  const session = event.data.object as Stripe.Checkout.Session
  if (session.payment_status !== 'paid') {
    return NextResponse.json({ received: true, ignored: 'unpaid session' })
  }

  const product = getProduct(session.metadata?.productId)
  if (!product) {
    // Returning 200 stops Stripe retrying something we can never fulfill.
    console.error('[webhook] Unknown productId on session', session.id, session.metadata?.productId)
    return NextResponse.json({ received: true, ignored: 'unknown product' })
  }

  const email = session.customer_details?.email || session.customer_email || null

  let purchaseId: string | undefined
  try {
    const { purchase } = await ensurePurchase({
      stripeSessionId: session.id,
      productId: product.id,
      email,
      amountTotal: session.amount_total,
      currency: session.currency,
      stripePaymentIntent:
        typeof session.payment_intent === 'string' ? session.payment_intent : null,
    })
    purchaseId = purchase.id

    if (!email) {
      console.warn('[webhook] Paid session without an email address:', session.id)
      return NextResponse.json({ received: true, emailed: false })
    }

    // Claim first so concurrent webhook replays cannot both send the email.
    const claimed = await claimFulfillment(purchase.id)
    if (!claimed)
      return NextResponse.json({
        received: true,
        emailed: false,
        reason: 'already sent',
      })

    await sendPurchaseEmail({ email, product, purchaseId: purchase.id })

    return NextResponse.json({ received: true, emailed: true })
  } catch (err) {
    if (purchaseId) await releaseFulfillment(purchaseId)
    // 500 makes Stripe retry; the buyer can already download from the success page.
    console.error('[webhook] Fulfillment failed for session', session.id, err)
    return NextResponse.json({ error: 'Fulfillment failed' }, { status: 500 })
  }
}
