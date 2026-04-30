import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'TN Visa Eligibility Checker',
  description: 'Check if your profession qualifies for TN visa status. Interactive tool covering all 63 USMCA professions.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
