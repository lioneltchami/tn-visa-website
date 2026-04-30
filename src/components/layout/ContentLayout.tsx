import Link from 'next/link'
import { type ReactNode } from 'react'
import { Reveal } from '@/components/ui/Reveal'

interface ContentLayoutProps {
  title: string
  description: string
  lastUpdated?: string
  children: ReactNode
  breadcrumbs?: { label: string; href: string }[]
}

export default function ContentLayout({ title, description, lastUpdated, children, breadcrumbs }: ContentLayoutProps) {
  return (
    <div className="section-padding">
      <div className="max-w-3xl mx-auto">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="flex items-center gap-1.5 text-sm text-fg-muted mb-6">
            <Link href="/" className="hover:text-accent transition-colors">Home</Link>
            {breadcrumbs.map((crumb) => (
              <span key={crumb.href} className="flex items-center gap-1.5">
                <span>/</span>
                <Link href={crumb.href} className="hover:text-accent transition-colors">
                  {crumb.label}
                </Link>
              </span>
            ))}
          </nav>
        )}

        <Reveal>
          <h1 className="gradient-text text-3xl sm:text-4xl font-bold mb-4">{title}</h1>
          <p className="text-fg-secondary text-lg mb-10">{description}</p>
        </Reveal>

        <div className="space-y-8">{children}</div>

        {lastUpdated && (
          <div className="mt-12 pt-6 border-t border-border">
            <span className="badge text-xs">Last updated: {lastUpdated}</span>
          </div>
        )}
      </div>
    </div>
  )
}
