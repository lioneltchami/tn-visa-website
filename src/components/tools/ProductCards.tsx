'use client'

import clsx from 'clsx'
import { Check, FileText, Loader2, type LucideIcon, MessageCircle, Package } from 'lucide-react'
import { useState } from 'react'
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

      window.location.href = data.url
    } catch (err) {
      console.error(err)
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
      setLoading(null)
    }
  }

  return (
    <div className="my-8">
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
                  Most Popular
                </span>
              )}
              <Icon className="w-8 h-8 text-accent mb-3" />
              <h3 className="text-lg font-bold text-fg mb-1">{product.shortName}</h3>
              <p className="text-3xl font-bold gradient-text mb-4">
                {formatPrice(product.priceCents)}
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
                  `Buy for ${formatPrice(product.priceCents)}`
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
