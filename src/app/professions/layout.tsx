import type { Metadata } from 'next'
import { withCanonical } from '@/lib/seo'

export const metadata: Metadata = withCanonical('/professions', {
  title: 'TN Visa Eligible Professions List',
  description: 'All 63 USMCA professions eligible for TN status. Searchable and filterable with credential requirements.',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
