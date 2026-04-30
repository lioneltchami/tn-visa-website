import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'TN Visa Eligible Professions List',
  description: 'All 63 USMCA professions eligible for TN status. Searchable and filterable with credential requirements.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
