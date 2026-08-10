import type { Metadata } from 'next'
import Link from 'next/link'
import ContentLayout from '@/components/layout/ContentLayout'
import { withCanonical } from '@/lib/seo'

export const metadata: Metadata = withCanonical('/blog', {
  title: 'TN Visa Blog',
  description:
    'Articles, guides, and analysis for Canadian professionals working in the US on TN visas.',
})

const posts = [
  {
    slug: 'tn-visa-nurses-2026',
    title: 'TN Visa for Nurses 2026: Complete Guide for Canadian RNs',
    date: '2026-05-09',
    category: 'Guide',
    author: 'TN Visa Guide Editorial Team',
  },
  {
    slug: 'tn-visa-processing-times-2026',
    title: 'TN Visa Processing Times 2026: How Long Does It Take?',
    date: '2026-05-09',
    category: 'Guide',
    author: 'TN Visa Guide Editorial Team',
  },
  {
    slug: 'tn-visa-salary-requirements-2026',
    title: 'TN Visa Salary Requirements 2026: Minimum Pay & Prevailing Wage',
    date: '2026-05-09',
    category: 'Guide',
    author: 'TN Visa Guide Editorial Team',
  },
  {
    slug: 'tn-visa-engineers-2026',
    title: 'TN Visa for Engineers 2026: Requirements, Degrees & Job Titles',
    date: '2026-05-09',
    category: 'Guide',
    author: 'TN Visa Guide Editorial Team',
  },
  {
    slug: 'tn-visa-renewal-2026',
    title: 'TN Visa Renewal 2026: Step-by-Step Process & Timeline',
    date: '2026-05-09',
    category: 'Guide',
    author: 'TN Visa Guide Editorial Team',
  },
  {
    slug: 'tn-visa-interview-questions-2026',
    title: 'TN Visa Interview Questions 2026: What CBP Officers Ask',
    date: '2026-05-09',
    category: 'Guide',
    author: 'TN Visa Guide Editorial Team',
  },
  {
    slug: 'tn-visa-accountants-2026',
    title: 'TN Visa for Accountants 2026: CPA Requirements & Process',
    date: '2026-05-09',
    category: 'Guide',
    author: 'TN Visa Guide Editorial Team',
  },
  {
    slug: 'tn-visa-denied-what-to-do',
    title: 'TN Visa Denied? What To Do Next (2026 Guide)',
    date: '2026-05-09',
    category: 'Guide',
    author: 'TN Visa Guide Editorial Team',
  },
  {
    slug: 'tn-visa-green-card-path-2026',
    title: 'TN Visa to Green Card 2026: Pathways & Timing Strategy',
    date: '2026-05-09',
    category: 'Guide',
    author: 'TN Visa Guide Editorial Team',
  },
  {
    slug: 'tn-visa-remote-work-rules-2026',
    title: 'Working Remotely on TN Visa 2026: Rules, Risks & Best Practices',
    date: '2026-05-09',
    category: 'Guide',
    author: 'TN Visa Guide Editorial Team',
  },
  {
    slug: 'tn-visa-computer-science-degree-2026',
    title: 'Can You Get a TN Visa with a Computer Science Degree in 2026?',
    date: '2026-04-28',
    category: 'Policy',
    author: 'TN Visa Guide Editorial Team',
  },
  {
    slug: 'tn-visa-vs-h1b-2026',
    title: 'TN Visa vs H-1B in 2026: Complete Comparison After the $100K Fee',
    date: '2026-04-27',
    category: 'Comparison',
    author: 'TN Visa Guide Editorial Team',
  },
  {
    slug: 'usmca-ends-tn-visa',
    title: 'What Happens to Your TN Visa if USMCA Ends?',
    date: '2026-04-26',
    category: 'Policy',
    author: 'TN Visa Guide Editorial Team',
  },
  {
    slug: 'tn-visa-remote-work-2026',
    title: 'TN Visa Remote Work Rules: Can You Work from Canada?',
    date: '2026-04-25',
    category: 'Guide',
    author: 'TN Visa Guide Editorial Team',
  },
  {
    slug: 'canadian-moving-to-us-2026',
    title: 'Moving to the US from Canada: Complete 2026 Financial Guide',
    date: '2026-04-24',
    category: 'Guide',
    author: 'TN Visa Guide Editorial Team',
  },
  {
    slug: 'tn-visa-mexico-2026',
    title: 'TN Visa for Mexican Professionals: 2026 Complete Guide',
    date: '2026-04-23',
    category: 'Guide',
    author: 'TN Visa Guide Editorial Team',
  },
]

export default function BlogPage() {
  return (
    <ContentLayout
      title="TN Visa Blog"
      description="In-depth articles and analysis for TN visa applicants."
      breadcrumbs={[{ label: 'Blog', href: '/blog' }]}
      lastUpdated="April 2026"
    >
      <ul className="divide-y divide-border border-y border-border">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`} className="block py-5 group">
              <p className="text-xs font-semibold text-accent mb-1">{post.category}</p>
              <h2 className="font-display text-lg font-bold text-fg leading-snug mb-2 group-hover:text-accent transition-colors">
                {post.title}
              </h2>
              <p className="text-xs text-fg-muted">
                {post.author}
                {' · '}
                {new Date(post.date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </ContentLayout>
  )
}
