import type { Metadata } from 'next'
import { withCanonical } from '@/lib/seo'

export const metadata: Metadata = withCanonical('/professions', {
  title: 'TN Visa Professions List (63 USMCA Jobs) 2026',
  description: 'Full list of 63 TN visa professions for Canadians — credentials, degree rules, and which jobs qualify under USMCA 2026.',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
