import type { Metadata } from 'next'
import { withCanonical } from '@/lib/seo'

export const metadata: Metadata = withCanonical('/companies', {
  title: 'Companies That Hire TN Visa Canadians (2026)',
  description: 'Directory of TN-friendly US employers hiring Canadians — filter by industry and TN profession.',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
