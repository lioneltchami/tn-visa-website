import type { MetadataRoute } from 'next'
import { SEED_COMPANIES } from '@/data/seed-companies'
import professions from '@/data/professions.json'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://tnvisaguide.ca'
  const lastModified = '2026-04-28'

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${base}/eligibility`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/professions`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/apply`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/apply/port-of-entry`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/documents`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/fees`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/renewal`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/dependents`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/employers`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/taxes`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/green-card`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/moving`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/mistakes`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/changes`, lastModified, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/compare`, lastModified, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/companies`, lastModified, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${base}/denied`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/border-interview`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/employer-letter`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/self-employment`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/processing-times`, lastModified, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/faq`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/letter-builder`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/products`, lastModified, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/experiences`, lastModified, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${base}/jobs`, lastModified, changeFrequency: 'daily', priority: 0.8 },
    { url: `${base}/usmca-review`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/government-shutdown`, lastModified, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/employer-guide`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/blog`, lastModified, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${base}/blog/tn-visa-computer-science-degree-2026`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/blog/tn-visa-vs-h1b-2026`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/blog/usmca-ends-tn-visa`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/blog/tn-visa-remote-work-2026`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/blog/canadian-moving-to-us-2026`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/blog/tn-visa-mexico-2026`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/glossary`, lastModified, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/compare/tn-vs-o1`, lastModified, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/compare/tn-vs-l1`, lastModified, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/compare/tn-vs-e2`, lastModified, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/credentials`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
  ]

  const companyRoutes: MetadataRoute.Sitemap = SEED_COMPANIES.map(c => ({
    url: `${base}/companies/${c.id}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }))

  const professionRoutes: MetadataRoute.Sitemap = professions.map(p => ({
    url: `${base}/professions/${p.slug}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticRoutes, ...professionRoutes, ...companyRoutes]
}
