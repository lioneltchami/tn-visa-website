import type { Metadata } from 'next'
import { withCanonical } from '@/lib/seo'

export const metadata: Metadata = withCanonical('/experiences', {
  title: 'TN Visa Community Experiences',
  description: 'Real TN visa application stories from the community. Filter by profession, outcome, and application method.',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
