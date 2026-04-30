import type { Metadata } from 'next'
import Link from 'next/link'
import ContentLayout from '@/components/layout/ContentLayout'

export const metadata: Metadata = {
  title: 'TN Visa Blog',
  description: 'Articles, guides, and analysis for Canadian professionals working in the US on TN visas.',
}

const posts = [
  { slug: 'tn-visa-computer-science-degree-2026', title: 'Can You Get a TN Visa with a Computer Science Degree in 2026?', date: '2026-04-28', category: 'Policy', author: 'TN Visa Guide Team' },
  { slug: 'tn-visa-vs-h1b-2026', title: 'TN Visa vs H-1B in 2026: Complete Comparison After the $100K Fee', date: '2026-04-27', category: 'Comparison', author: 'TN Visa Guide Team' },
  { slug: 'usmca-ends-tn-visa', title: 'What Happens to Your TN Visa if USMCA Ends?', date: '2026-04-26', category: 'Policy', author: 'TN Visa Guide Team' },
  { slug: 'tn-visa-remote-work-2026', title: 'TN Visa Remote Work Rules: Can You Work from Canada?', date: '2026-04-25', category: 'Guide', author: 'TN Visa Guide Team' },
  { slug: 'canadian-moving-to-us-2026', title: 'Moving to the US from Canada: Complete 2026 Financial Guide', date: '2026-04-24', category: 'Guide', author: 'TN Visa Guide Team' },
  { slug: 'tn-visa-mexico-2026', title: 'TN Visa for Mexican Professionals: 2026 Complete Guide', date: '2026-04-23', category: 'Guide', author: 'TN Visa Guide Team' },
]

export default function BlogPage() {
  return (
    <ContentLayout
      title="TN Visa Blog"
      description="In-depth articles and analysis for TN visa applicants."
      breadcrumbs={[{ label: 'Blog', href: '/blog' }]}
      lastUpdated="April 2026"
    >
      <div className="space-y-4">
        {posts.map(post => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="card card-interactive p-5 block">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-semibold text-fg text-lg">{post.title}</h2>
                <p className="text-sm text-fg-muted mt-1">{post.author} · {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
              </div>
              <span className="badge shrink-0">{post.category}</span>
            </div>
          </Link>
        ))}
      </div>
    </ContentLayout>
  )
}
