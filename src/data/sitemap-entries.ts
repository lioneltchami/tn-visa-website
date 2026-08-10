/**
 * Single source of truth for public sitemap URLs and freshness dates.
 * lastModified should move when the page's substantive content changes.
 */

export type SitemapFreq = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'

export type SitemapEntry = {
  path: string
  lastModified: string
  changeFrequency: SitemapFreq
  priority: number
}

/** End-of-month stand-ins for ContentLayout `lastUpdated` month labels. */
const APRIL_2026 = '2026-04-30'
const MAY_2026 = '2026-05-09'

export const SITEMAP_STATIC: SitemapEntry[] = [
  {
    path: '/',
    lastModified: APRIL_2026,
    changeFrequency: 'weekly',
    priority: 1.0,
  },
  {
    path: '/eligibility',
    lastModified: APRIL_2026,
    changeFrequency: 'monthly',
    priority: 0.9,
  },
  {
    path: '/professions',
    lastModified: APRIL_2026,
    changeFrequency: 'monthly',
    priority: 0.9,
  },
  {
    path: '/apply',
    lastModified: APRIL_2026,
    changeFrequency: 'monthly',
    priority: 0.9,
  },
  {
    path: '/apply/port-of-entry',
    lastModified: APRIL_2026,
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    path: '/documents',
    lastModified: APRIL_2026,
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    path: '/fees',
    lastModified: APRIL_2026,
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    path: '/renewal',
    lastModified: APRIL_2026,
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    path: '/dependents',
    lastModified: APRIL_2026,
    changeFrequency: 'monthly',
    priority: 0.7,
  },
  {
    path: '/employers',
    lastModified: APRIL_2026,
    changeFrequency: 'monthly',
    priority: 0.7,
  },
  {
    path: '/taxes',
    lastModified: APRIL_2026,
    changeFrequency: 'monthly',
    priority: 0.7,
  },
  {
    path: '/green-card',
    lastModified: APRIL_2026,
    changeFrequency: 'monthly',
    priority: 0.7,
  },
  {
    path: '/moving',
    lastModified: APRIL_2026,
    changeFrequency: 'monthly',
    priority: 0.7,
  },
  {
    path: '/mistakes',
    lastModified: APRIL_2026,
    changeFrequency: 'monthly',
    priority: 0.7,
  },
  {
    path: '/changes',
    lastModified: APRIL_2026,
    changeFrequency: 'weekly',
    priority: 0.8,
  },
  {
    path: '/compare',
    lastModified: APRIL_2026,
    changeFrequency: 'monthly',
    priority: 0.6,
  },
  {
    path: '/compare/tn-vs-o1',
    lastModified: APRIL_2026,
    changeFrequency: 'monthly',
    priority: 0.6,
  },
  {
    path: '/compare/tn-vs-l1',
    lastModified: APRIL_2026,
    changeFrequency: 'monthly',
    priority: 0.6,
  },
  {
    path: '/compare/tn-vs-e2',
    lastModified: APRIL_2026,
    changeFrequency: 'monthly',
    priority: 0.6,
  },
  {
    path: '/companies',
    lastModified: APRIL_2026,
    changeFrequency: 'weekly',
    priority: 0.6,
  },
  {
    path: '/denied',
    lastModified: APRIL_2026,
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    path: '/border-interview',
    lastModified: APRIL_2026,
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    path: '/employer-letter',
    lastModified: APRIL_2026,
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    path: '/self-employment',
    lastModified: APRIL_2026,
    changeFrequency: 'monthly',
    priority: 0.7,
  },
  {
    path: '/processing-times',
    lastModified: APRIL_2026,
    changeFrequency: 'weekly',
    priority: 0.8,
  },
  {
    path: '/faq',
    lastModified: APRIL_2026,
    changeFrequency: 'monthly',
    priority: 0.9,
  },
  {
    path: '/about',
    lastModified: '2026-08-09',
    changeFrequency: 'monthly',
    priority: 0.7,
  },
  {
    path: '/disclosure',
    lastModified: '2026-08-09',
    changeFrequency: 'yearly',
    priority: 0.3,
  },
  {
    path: '/letter-builder',
    lastModified: APRIL_2026,
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    path: '/products',
    lastModified: APRIL_2026,
    changeFrequency: 'monthly',
    priority: 0.6,
  },
  {
    path: '/experiences',
    lastModified: APRIL_2026,
    changeFrequency: 'weekly',
    priority: 0.7,
  },
  {
    path: '/jobs',
    lastModified: APRIL_2026,
    changeFrequency: 'daily',
    priority: 0.8,
  },
  {
    path: '/usmca-review',
    lastModified: APRIL_2026,
    changeFrequency: 'weekly',
    priority: 0.9,
  },
  {
    path: '/government-shutdown',
    lastModified: APRIL_2026,
    changeFrequency: 'weekly',
    priority: 0.8,
  },
  {
    path: '/employer-guide',
    lastModified: APRIL_2026,
    changeFrequency: 'monthly',
    priority: 0.7,
  },
  {
    path: '/glossary',
    lastModified: APRIL_2026,
    changeFrequency: 'monthly',
    priority: 0.6,
  },
  {
    path: '/credentials',
    lastModified: APRIL_2026,
    changeFrequency: 'monthly',
    priority: 0.7,
  },
  {
    path: '/blog',
    lastModified: MAY_2026,
    changeFrequency: 'weekly',
    priority: 0.7,
  },
]

/** All public blog posts — keep in sync with directories under src/app/blog */
export const SITEMAP_BLOGS: SitemapEntry[] = [
  {
    path: '/blog/tn-visa-computer-science-degree-2026',
    lastModified: '2026-04-28',
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    path: '/blog/tn-visa-vs-h1b-2026',
    lastModified: '2026-04-30',
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    path: '/blog/usmca-ends-tn-visa',
    lastModified: '2026-04-30',
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    path: '/blog/tn-visa-remote-work-2026',
    lastModified: APRIL_2026,
    changeFrequency: 'monthly',
    priority: 0.7,
  },
  {
    path: '/blog/canadian-moving-to-us-2026',
    lastModified: APRIL_2026,
    changeFrequency: 'monthly',
    priority: 0.7,
  },
  {
    path: '/blog/tn-visa-mexico-2026',
    lastModified: APRIL_2026,
    changeFrequency: 'monthly',
    priority: 0.7,
  },
  {
    path: '/blog/tn-visa-nurses-2026',
    lastModified: MAY_2026,
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    path: '/blog/tn-visa-renewal-2026',
    lastModified: MAY_2026,
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    path: '/blog/tn-visa-salary-requirements-2026',
    lastModified: MAY_2026,
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    path: '/blog/tn-visa-remote-work-rules-2026',
    lastModified: MAY_2026,
    changeFrequency: 'monthly',
    priority: 0.7,
  },
  {
    path: '/blog/tn-visa-processing-times-2026',
    lastModified: MAY_2026,
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    path: '/blog/tn-visa-interview-questions-2026',
    lastModified: MAY_2026,
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    path: '/blog/tn-visa-green-card-path-2026',
    lastModified: MAY_2026,
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    path: '/blog/tn-visa-engineers-2026',
    lastModified: MAY_2026,
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    path: '/blog/tn-visa-denied-what-to-do',
    lastModified: MAY_2026,
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    path: '/blog/tn-visa-accountants-2026',
    lastModified: MAY_2026,
    changeFrequency: 'monthly',
    priority: 0.8,
  },
]

export const PROFESSION_LAST_MODIFIED = APRIL_2026
export const COMPANY_LAST_MODIFIED = APRIL_2026
