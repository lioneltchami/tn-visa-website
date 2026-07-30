'use client'

import clsx from 'clsx'
import {
  Check,
  Clock3,
  Download,
  FileText,
  Loader2,
  LockKeyhole,
  type LucideIcon,
  MessageCircle,
  Package,
} from 'lucide-react'
import { useState } from 'react'
import { trackBeginCheckout, trackEvent } from '@/hooks/useAnalytics'
import { ALL_PRODUCTS, formatPrice, type ProductId } from '@/lib/products'

const ICONS: Record<ProductId, LucideIcon> = {
  'letter-templates': FileText,
  'interview-kit': MessageCircle,
  'complete-guide': Package,
}

export default function ProductCards() {
  const [loading, setLoading] = useState<ProductId | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleBuy(productId: ProductId) {
    const product = ALL_PRODUCTS.find((candidate) => candidate.id === productId)
    if (!product) return

    trackEvent('checkout_click', {
      product_id: product.id,
      product_name: product.name,
      value: product.priceCents / 100,
      currency: 'USD',
    })
    setLoading(productId)
    setError(null)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId }),
      })
      const data = await res.json().catch(() => null)

      if (!res.ok || !data?.url) {
        throw new Error(data?.error || 'Checkout is unavailable right now. Please try again.')
      }

      trackBeginCheckout(product)
      window.location.href = data.url
    } catch (err) {
      console.error(err)
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
      setLoading(null)
    }
  }

  return (
    <div className="my-8">
      <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {[
          { icon: LockKeyhole, label: 'Secure Stripe checkout' },
          { icon: Download, label: 'Instant PDF access' },
          { icon: Clock3, label: 'Download link valid 1 year' },
        ].map(({ icon: TrustIcon, label }) => (
          <div
            key={label}
            className="flex items-center justify-center gap-2 rounded-lg border border-border bg-bg-secondary/50 px-3 py-2.5 text-sm font-medium text-fg-secondary"
          >
            <TrustIcon className="h-4 w-4 text-success" aria-hidden="true" />
            {label}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {ALL_PRODUCTS.map((product) => {
          const Icon = ICONS[product.id]
          return (
            <div
              key={product.id}
              className={clsx(
                'card p-6 flex flex-col relative',
                product.popular && 'border-accent border-2'
              )}
            >
              {product.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 gradient-bg text-white text-xs font-bold px-3 py-1 rounded-full">
                  Best Value
                </span>
              )}
              <Icon className="w-8 h-8 text-accent mb-3" />
              <h3 className="text-lg font-bold text-fg mb-1">{product.shortName}</h3>
              <p className="text-3xl font-bold gradient-text mb-2">
                {formatPrice(product.priceCents)}
              </p>
              {product.id === 'complete-guide' && (
                <p className="mb-3 text-xs font-semibold text-success">
                  Save $9 vs. buying both kits separately
                </p>
              )}
              <p className="mb-4 text-sm leading-relaxed text-fg-secondary">
                {product.description}
              </p>
              <ul className="space-y-2 mb-6 flex-1">
                {product.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-fg-secondary">
                    <Check className="w-4 h-4 text-success shrink-0 mt-0.5" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleBuy(product.id)}
                disabled={loading !== null}
                className={clsx(
                  'w-full py-2.5 rounded-full font-medium text-sm transition-all disabled:opacity-60',
                  product.popular
                    ? 'gradient-bg text-white'
                    : 'border border-border hover:bg-bg-secondary text-fg'
                )}
              >
                {loading === product.id ? (
                  <Loader2 className="w-4 h-4 animate-spin mx-auto" />
                ) : (
                  `Get instant access — ${formatPrice(product.priceCents)}`
                )}
              </button>
            </div>
          )
        })}
      </div>

      {error && (
        <p role="alert" className="mt-4 text-sm text-danger text-center">
          {error}
        </p>
      )}
    </div>
  )
}
