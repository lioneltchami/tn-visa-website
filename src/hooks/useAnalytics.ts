'use client'

type AnalyticsValue =
  string | number | boolean | AnalyticsValue[] | { [key: string]: AnalyticsValue }
export type AnalyticsParams = Record<string, AnalyticsValue | undefined>

type AnalyticsWindow = Window & {
  plausible?: (name: string, opts?: { props: Record<string, string | number | boolean> }) => void
  gtag?: (command: 'event', name: string, params?: AnalyticsParams) => void
}

export function trackEvent(name: string, props?: AnalyticsParams) {
  if (typeof window === 'undefined') return
  const analytics = window as AnalyticsWindow

  // Plausible Analytics
  if (analytics.plausible) {
    const scalarProps = props
      ? Object.fromEntries(
          Object.entries(props).filter((entry): entry is [string, string | number | boolean] =>
            ['string', 'number', 'boolean'].includes(typeof entry[1])
          )
        )
      : undefined
    analytics.plausible(name, scalarProps ? { props: scalarProps } : undefined)
  }

  // GA4. gtag queues events in dataLayer even while its script is still loading.
  analytics.gtag?.('event', name, props)
}

export function trackBeginCheckout(product: { id: string; name: string; priceCents: number }) {
  trackEvent('begin_checkout', {
    currency: 'USD',
    value: product.priceCents / 100,
    items: [
      {
        item_id: product.id,
        item_name: product.name,
        price: product.priceCents / 100,
        quantity: 1,
      },
    ],
  })
}

export function trackPurchase(input: {
  transactionId: string
  productId: string
  productName: string
  value: number
  currency: string
}) {
  trackEvent('purchase', {
    transaction_id: input.transactionId,
    currency: input.currency.toUpperCase(),
    value: input.value,
    items: [
      {
        item_id: input.productId,
        item_name: input.productName,
        price: input.value,
        quantity: 1,
      },
    ],
  })
}
