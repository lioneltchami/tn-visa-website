import type { Metadata } from 'next'
import { withCanonical } from '@/lib/seo'

export const metadata: Metadata = withCanonical('/experiences/submit', {
  title: 'Share Your TN Visa Experience',
  description: 'Help other applicants by sharing your TN visa application experience.',
})

export default function Layout({ children }: { children: React.ReactNode }) { return children }
