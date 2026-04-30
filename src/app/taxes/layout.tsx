import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'TN Visa Tax Guide for Canadians',
  description: 'U.S. and Canadian tax obligations for TN visa holders. Includes Substantial Presence Test calculator.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
