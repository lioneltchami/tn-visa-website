import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { Resend } from 'resend'

export const dynamic = 'force-dynamic'

const DOWNLOAD_LINKS: Record<string, string> = {
  'interview-kit': 'https://tnvisaguide.ca/products/success?product=interview-kit',
  'letter-templates': 'https://tnvisaguide.ca/products/success?product=letter-templates',
  'complete-guide': 'https://tnvisaguide.ca/products/success?product=complete-guide',
}

export async function POST(req: Request) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!

  let event: Stripe.Event
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const productId = session.metadata?.productId
    const email = session.customer_details?.email

    if (email && productId && process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY)
      await resend.emails.send({
        from: 'TN Visa Guide <hello@tnvisaguide.ca>',
        to: email,
        subject: 'Your TN Visa Guide Purchase \u2014 Download Link',
        html: `
          <h2>Thank you for your purchase!</h2>
          <p>Your download is ready:</p>
          <p><a href="${DOWNLOAD_LINKS[productId] || 'https://tnvisaguide.ca/products/success'}">Click here to download</a></p>
          <p>If you have any questions, reply to this email.</p>
          <p>\u2014 The TN Visa Guide Team</p>
        `,
      }).catch(console.error)
    }
  }

  return NextResponse.json({ received: true })
}
