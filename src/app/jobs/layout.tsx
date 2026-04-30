import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'TN Visa Job Board',
  description: 'Browse TN visa-eligible jobs. Every listing is verified for USMCA profession eligibility.',
}

export default function Layout({ children }: { children: React.ReactNode }) { return children }
