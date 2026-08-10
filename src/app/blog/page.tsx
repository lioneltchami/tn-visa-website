import type { Metadata } from 'next'
import { withCanonical } from '@/lib/seo'
import Link from 'next/link'
import Image from 'next/image'
import ContentLayout from '@/components/layout/ContentLayout'

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
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&h=340&fit=crop',
  },
  {
    slug: 'tn-visa-processing-times-2026',
    title: 'TN Visa Processing Times 2026: How Long Does It Take?',
    date: '2026-05-09',
    category: 'Guide',
    author: 'TN Visa Guide Editorial Team',
    image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=600&h=340&fit=crop',
  },
  {
    slug: 'tn-visa-salary-requirements-2026',
    title: 'TN Visa Salary Requirements 2026: Minimum Pay & Prevailing Wage',
    date: '2026-05-09',
    category: 'Guide',
    author: 'TN Visa Guide Editorial Team',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=340&fit=crop',
  },
  {
    slug: 'tn-visa-engineers-2026',
    title: 'TN Visa for Engineers 2026: Requirements, Degrees & Job Titles',
    date: '2026-05-09',
    category: 'Guide',
    author: 'TN Visa Guide Editorial Team',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=340&fit=crop',
  },
  {
    slug: 'tn-visa-renewal-2026',
    title: 'TN Visa Renewal 2026: Step-by-Step Process & Timeline',
    date: '2026-05-09',
    category: 'Guide',
    author: 'TN Visa Guide Editorial Team',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=340&fit=crop',
  },
  {
    slug: 'tn-visa-interview-questions-2026',
    title: 'TN Visa Interview Questions 2026: What CBP Officers Ask',
    date: '2026-05-09',
    category: 'Guide',
    author: 'TN Visa Guide Editorial Team',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&h=340&fit=crop',
  },
  {
    slug: 'tn-visa-accountants-2026',
    title: 'TN Visa for Accountants 2026: CPA Requirements & Process',
    date: '2026-05-09',
    category: 'Guide',
    author: 'TN Visa Guide Editorial Team',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&h=340&fit=crop',
  },
  {
    slug: 'tn-visa-denied-what-to-do',
    title: 'TN Visa Denied? What To Do Next (2026 Guide)',
    date: '2026-05-09',
    category: 'Guide',
    author: 'TN Visa Guide Editorial Team',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=340&fit=crop',
  },
  {
    slug: 'tn-visa-green-card-path-2026',
    title: 'TN Visa to Green Card 2026: Pathways & Timing Strategy',
    date: '2026-05-09',
    category: 'Guide',
    author: 'TN Visa Guide Editorial Team',
    image: 'https://images.unsplash.com/photo-1569974507005-6dc61f97fb5c?w=600&h=340&fit=crop',
  },
  {
    slug: 'tn-visa-remote-work-rules-2026',
    title: 'Working Remotely on TN Visa 2026: Rules, Risks & Best Practices',
    date: '2026-05-09',
    category: 'Guide',
    author: 'TN Visa Guide Editorial Team',
    image: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&h=340&fit=crop',
  },
  {
    slug: 'tn-visa-computer-science-degree-2026',
    title: 'Can You Get a TN Visa with a Computer Science Degree in 2026?',
    date: '2026-04-28',
    category: 'Policy',
    author: 'TN Visa Guide Editorial Team',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=340&fit=crop',
  },
  {
    slug: 'tn-visa-vs-h1b-2026',
    title: 'TN Visa vs H-1B in 2026: Complete Comparison After the $100K Fee',
    date: '2026-04-27',
    category: 'Comparison',
    author: 'TN Visa Guide Editorial Team',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=340&fit=crop',
  },
  {
    slug: 'usmca-ends-tn-visa',
    title: 'What Happens to Your TN Visa if USMCA Ends?',
    date: '2026-04-26',
    category: 'Policy',
    author: 'TN Visa Guide Editorial Team',
    image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=600&h=340&fit=crop',
  },
  {
    slug: 'tn-visa-remote-work-2026',
    title: 'TN Visa Remote Work Rules: Can You Work from Canada?',
    date: '2026-04-25',
    category: 'Guide',
    author: 'TN Visa Guide Editorial Team',
    image: 'https://images.unsplash.com/photo-1521898284481-a5ec348cb555?w=600&h=340&fit=crop',
  },
  {
    slug: 'canadian-moving-to-us-2026',
    title: 'Moving to the US from Canada: Complete 2026 Financial Guide',
    date: '2026-04-24',
    category: 'Guide',
    author: 'TN Visa Guide Editorial Team',
    image: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=600&h=340&fit=crop',
  },
  {
    slug: 'tn-visa-mexico-2026',
    title: 'TN Visa for Mexican Professionals: 2026 Complete Guide',
    date: '2026-04-23',
    category: 'Guide',
    author: 'TN Visa Guide Editorial Team',
    image: 'https://images.unsplash.com/photo-1518659526054-190340b32735?w=600&h=340&fit=crop',
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="card card-interactive overflow-hidden group"
          >
            <div className="relative h-44 overflow-hidden">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute top-3 left-3 badge bg-bg/80 backdrop-blur-sm text-xs">
                {post.category}
              </span>
            </div>
            <div className="p-5">
              <h2 className="font-semibold text-fg leading-snug mb-2 group-hover:text-accent transition-colors">
                {post.title}
              </h2>
              <div className="flex items-center gap-2 text-xs text-fg-muted">
                <span>{post.author}</span>
                <span>·</span>
                <span>
                  {new Date(post.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </ContentLayout>
  )
}
