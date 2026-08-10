import type { Metadata } from 'next'
import { withCanonical } from '@/lib/seo'

export const metadata: Metadata = withCanonical('/login', {
  title: 'Sign In',
  description: 'Sign in to your TN Visa Guide account.',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
