import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign in to your TN Visa Guide account.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
