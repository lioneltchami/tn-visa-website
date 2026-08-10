import type { Metadata } from 'next'
import { withCanonical } from '@/lib/seo'

export const metadata: Metadata = withCanonical('/eligibility', {
  title: 'TN Visa Eligibility Checker for Canadians',
  description: 'Check if your profession qualifies for TN visa status. Interactive tool covering all 63 USMCA professions.',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
