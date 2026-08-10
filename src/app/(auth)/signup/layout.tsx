import type { Metadata } from 'next'
import { withCanonical } from '@/lib/seo'

export const metadata: Metadata = withCanonical('/signup', {
  title: 'Create Account',
  description: 'Create your TN Visa Guide account.',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
