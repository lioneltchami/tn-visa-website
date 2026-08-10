import type { Metadata } from 'next'
import { withCanonical } from '@/lib/seo'

export const metadata: Metadata = withCanonical('/fees', {
  title: 'TN Visa Fees & Cost Calculator (USD & CAD)',
  description: 'Calculate your total TN visa costs. Fee breakdown for POE, I-129, premium processing, and dependents.',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
