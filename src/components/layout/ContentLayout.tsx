import Link from 'next/link'
import type { ReactNode } from 'react'
import JsonLd from '@/components/JsonLd'

interface ContentLayoutProps {
  title: string
  description: string
  lastUpdated?: string
  children: ReactNode
  breadcrumbs?: { label: string; href: string }[]
}

export default function ContentLayout({
  title,
  description,
  lastUpdated,
  children,
  breadcrumbs,
}: ContentLayoutProps) {
  const breadcrumbLd = breadcrumbs?.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://tnvisaguide.ca',
          },
          ...breadcrumbs.map((b, i) => ({
            '@type': 'ListItem',
            position: i + 2,
            name: b.label,
            item: `https://tnvisaguide.ca${b.href}`,
          })),
        ],
      }
    : null

  return (
    <div className="section-padding">
      <div className="max-w-3xl mx-auto">
        {breadcrumbLd && <JsonLd data={breadcrumbLd} />}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="flex items-center gap-1.5 text-sm text-fg-muted mb-6">
            <Link href="/" className="hover:text-accent transition-colors">
              Home
            </Link>
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

        <h1 className="font-display text-3xl sm:text-4xl font-bold mb-4 text-fg text-balance">
          {title}
        </h1>
        <p className="text-fg-secondary text-lg mb-10 text-pretty">{description}</p>

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
