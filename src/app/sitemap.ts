import type { MetadataRoute } from 'next'
import professions from '@/data/professions.json'
import { SEED_COMPANIES } from '@/data/seed-companies'
import {
  COMPANY_LAST_MODIFIED,
  PROFESSION_LAST_MODIFIED,
  SITEMAP_BLOGS,
  SITEMAP_STATIC,
} from '@/data/sitemap-entries'
import { absoluteUrl } from '@/lib/seo'

function toSitemapItem(entry: {
  path: string
  lastModified: string
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
  priority: number
}): MetadataRoute.Sitemap[number] {
  return {
    url: absoluteUrl(entry.path),
    lastModified: entry.lastModified,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const companyRoutes: MetadataRoute.Sitemap = SEED_COMPANIES.map((c) => ({
    url: absoluteUrl(`/companies/${c.id}`),
    lastModified: COMPANY_LAST_MODIFIED,
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }))

  const professionRoutes: MetadataRoute.Sitemap = professions.map((p) => ({
    url: absoluteUrl(`/professions/${p.slug}`),
    lastModified: PROFESSION_LAST_MODIFIED,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [
    ...SITEMAP_STATIC.map(toSitemapItem),
    ...SITEMAP_BLOGS.map(toSitemapItem),
    ...professionRoutes,
    ...companyRoutes,
  ]
}
