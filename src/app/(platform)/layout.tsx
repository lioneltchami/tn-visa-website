import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard',
  robots: { index: false },
}

export default function PlatformLayout({ children }: { children: React.ReactNode }) {
  return <div className="container-tight section-padding">{children}</div>
}
