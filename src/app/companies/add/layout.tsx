import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Add Your Company',
  description: 'List your company as TN-friendly to attract Canadian talent.',
}

export default function Layout({ children }: { children: React.ReactNode }) { return children }
