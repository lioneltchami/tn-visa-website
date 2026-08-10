import type { Metadata } from 'next'
import { withCanonical } from '@/lib/seo'

export const metadata: Metadata = withCanonical('/companies', {
  title: 'TN-Friendly Companies Directory',
  description: 'Companies that actively hire Canadian professionals on TN visas. Browse by industry and profession.',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
