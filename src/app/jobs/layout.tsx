import type { Metadata } from 'next'
import { withCanonical } from '@/lib/seo'

export const metadata: Metadata = withCanonical('/jobs', {
  title: 'TN Visa Jobs in the USA for Canadians (2026)',
  description: 'TN visa sponsorship jobs in the USA for Canadians — every listing checked for USMCA profession eligibility. Updated regularly.',
})

export default function Layout({ children }: { children: React.ReactNode }) { return children }
