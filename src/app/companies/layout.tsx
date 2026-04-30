import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'TN-Friendly Companies Directory',
  description: 'Companies that actively hire Canadian professionals on TN visas. Browse by industry and profession.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
