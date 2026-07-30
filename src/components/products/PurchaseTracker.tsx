'use client'

import { useEffect } from 'react'
import { trackPurchase } from '@/hooks/useAnalytics'

type PurchaseTrackerProps = {
  transactionId: string
  productId: string
  productName: string
  value: number
  currency: string
}

export default function PurchaseTracker(props: PurchaseTrackerProps) {
  const { transactionId, productId, productName, value, currency } = props

  useEffect(() => {
    const storageKey = `purchase_tracked:${transactionId}`
    if (sessionStorage.getItem(storageKey)) return

    trackPurchase({ transactionId, productId, productName, value, currency })
    sessionStorage.setItem(storageKey, '1')
  }, [currency, productId, productName, transactionId, value])

  return null
}
