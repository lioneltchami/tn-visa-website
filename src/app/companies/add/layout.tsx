import type { Metadata } from 'next'
import { withCanonical } from '@/lib/seo'

export const metadata: Metadata = withCanonical('/companies/add', {
  title: 'Add Your Company',
  description: 'List your company as TN-friendly to attract Canadian talent.',
})

export default function Layout({ children }: { children: React.ReactNode }) { return children }
