import type { Metadata } from 'next'
import { withCanonical } from '@/lib/seo'

export const metadata: Metadata = withCanonical('/documents', {
  title: 'Required TN Visa Documents for Canadian Applicants',
  description: 'Complete checklist of documents needed for your TN visa application, including employer letter requirements.',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
