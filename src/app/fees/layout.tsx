import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'TN Visa Fees & Cost Calculator',
  description: 'Calculate your total TN visa costs. Fee breakdown for POE, I-129, premium processing, and dependents.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
