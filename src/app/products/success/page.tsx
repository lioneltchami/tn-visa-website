import { CheckCircle } from 'lucide-react'
import type { Metadata } from 'next'
import { headers } from 'next/headers'
import Link from 'next/link'
import Stripe from 'stripe'
import ContentLayout from '@/components/layout/ContentLayout'
import ProductDownloadList from '@/components/products/ProductDownloadList'
import { Callout } from '@/components/ui/Callout'
import { createDownloadToken } from '@/lib/download-token'
import { getProduct, type Product } from '@/lib/products'
import { ensurePurchase } from '@/lib/purchases'
import { consumeRateLimit } from '@/lib/rate-limit'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Purchase Complete',
  robots: { index: false, follow: false },
}

const LOOKUP_LIMIT = 30
const LOOKUP_WINDOW_SECONDS = 60 * 60

type Access = { product: Product; token: string; email: string | null }

/**
 * Grant access straight from the verified Stripe session so the buyer never
 * depends on the webhook or the receipt email arriving first.
 */
async function resolveAccess(sessionId: string | undefined): Promise<Access | null> {
  if (!sessionId || sessionId.length > 120) return null

  const secretKey = process.env.STRIPE_SECRET_KEY
  if (!secretKey) return null

  const forwarded = headers().get('x-forwarded-for')
  const ip = forwarded?.split(',')[0]?.trim() || headers().get('cf-connecting-ip') || 'unknown'
  const rate = await consumeRateLimit(`success:${ip}`, LOOKUP_LIMIT, LOOKUP_WINDOW_SECONDS)
  if (!rate.allowed) return null

  try {
    const session = await new Stripe(secretKey).checkout.sessions.retrieve(sessionId)
    if (session.payment_status !== 'paid') return null

    const product = getProduct(session.metadata?.productId)
    if (!product) return null

    const email = session.customer_details?.email || session.customer_email || null

    const { purchase } = await ensurePurchase({
      stripeSessionId: session.id,
      productId: product.id,
      email,
      amountTotal: session.amount_total,
      currency: session.currency,
      stripePaymentIntent:
        typeof session.payment_intent === 'string' ? session.payment_intent : null,
    })

    return { product, token: createDownloadToken(purchase.id), email }
  } catch (err) {
    console.error('[success] Could not resolve checkout session:', err)
    return null
  }
}

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: { session_id?: string }
}) {
  const access = await resolveAccess(searchParams.session_id)

  if (!access) {
    return (
      <ContentLayout
        title="Thank You"
        description="We could not confirm this purchase automatically."
        breadcrumbs={[{ label: 'Products', href: '/products' }]}
      >
        <Callout type="info" title="Check your email">
          If your payment went through, your download link is on its way to your inbox (check spam
          too). Nothing there within 10 minutes? Email{' '}
          <a href="mailto:hello@tnvisaguide.ca" className="text-accent hover:underline">
            hello@tnvisaguide.ca
          </a>{' '}
          and we will send your files right away.
        </Callout>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/products"
            className="px-5 py-2.5 rounded-full border border-border text-fg-secondary font-medium text-sm hover:bg-bg-secondary"
          >
            Back to Products
          </Link>
          <Link
            href="/"
            className="px-5 py-2.5 rounded-full gradient-bg text-white font-medium text-sm"
          >
            Go Home
          </Link>
        </div>
      </ContentLayout>
    )
  }

  return (
    <ContentLayout
      title="Your Files Are Ready"
      description={`Payment confirmed — ${access.product.name} is unlocked below.`}
      breadcrumbs={[{ label: 'Products', href: '/products' }]}
    >
      <div className="flex items-center gap-2 text-success">
        <CheckCircle className="w-5 h-5" />
        <span className="font-medium">Purchase complete</span>
      </div>

      <ProductDownloadList product={access.product} token={access.token} />

      <Callout type="tip" title="Keep your link">
        {access.email
          ? `We also emailed your download link to ${access.email}.`
          : 'Bookmark this page — your download link is also in your receipt email.'}{' '}
        Links stay valid for one year on any device.
      </Callout>

      <Callout type="info" title="Need help?">
        Trouble opening a file? Email{' '}
        <a href="mailto:hello@tnvisaguide.ca" className="text-accent hover:underline">
          hello@tnvisaguide.ca
        </a>{' '}
        and we will sort it out.
      </Callout>
    </ContentLayout>
  )
}
