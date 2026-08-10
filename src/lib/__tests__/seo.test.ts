import { readdirSync } from 'fs'
import { join } from 'path'
import { describe, expect, it } from 'vitest'
import sitemap from '@/app/sitemap'
import professions from '@/data/professions.json'
import { SEED_COMPANIES } from '@/data/seed-companies'
import { SITEMAP_BLOGS, SITEMAP_STATIC } from '@/data/sitemap-entries'
import { absoluteUrl, pageAlternates, withCanonical } from '@/lib/seo'
import { CANONICAL_ORIGIN } from '@/lib/site'

describe('absoluteUrl / pageAlternates', () => {
  it('maps paths to absolute canonical URLs', () => {
    expect(absoluteUrl('/')).toBe(CANONICAL_ORIGIN)
    expect(absoluteUrl('')).toBe(CANONICAL_ORIGIN)
    expect(absoluteUrl('/faq')).toBe(`${CANONICAL_ORIGIN}/faq`)
    expect(absoluteUrl('faq')).toBe(`${CANONICAL_ORIGIN}/faq`)
    expect(absoluteUrl('/blog/tn-visa-nurses-2026/')).toBe(
      `${CANONICAL_ORIGIN}/blog/tn-visa-nurses-2026`
    )
  })

  it('builds self-referencing alternates per path', () => {
    expect(pageAlternates('/fees')).toEqual({
      canonical: `${CANONICAL_ORIGIN}/fees`,
      languages: { 'en-CA': `${CANONICAL_ORIGIN}/fees` },
    })
    expect(pageAlternates('/')).toEqual({
      canonical: CANONICAL_ORIGIN,
      languages: { 'en-CA': CANONICAL_ORIGIN },
    })
  })

  it('merges canonical without dropping other metadata', () => {
    const meta = withCanonical('/denied', {
      title: 'Denied',
      description: 'What to do',
      robots: { index: true },
    })
    expect(meta.title).toBe('Denied')
    expect(meta.robots).toEqual({ index: true })
    expect(meta.alternates?.canonical).toBe(`${CANONICAL_ORIGIN}/denied`)
  })

  it('never points every page at the homepage', () => {
    const faq = withCanonical('/faq', { title: 'FAQ' })
    const home = withCanonical('/', { title: 'Home' })
    expect(faq.alternates?.canonical).not.toBe(home.alternates?.canonical)
    expect(faq.alternates?.canonical).toBe(`${CANONICAL_ORIGIN}/faq`)
  })
})

describe('sitemap completeness', () => {
  it('includes every blog post directory under src/app/blog', () => {
    const blogDir = join(process.cwd(), 'src/app/blog')
    const slugs = readdirSync(blogDir, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name)
      .sort()

    const sitemapSlugs = SITEMAP_BLOGS.map((e) => e.path.replace('/blog/', '')).sort()
    expect(sitemapSlugs).toEqual(slugs)
  })

  it('uses distinct lastModified values (not one blanket date)', () => {
    const dates = new Set([...SITEMAP_STATIC, ...SITEMAP_BLOGS].map((e) => e.lastModified))
    expect(dates.size).toBeGreaterThan(1)
  })

  it('emits absolute urls for static, blogs, professions, and companies', () => {
    const entries = sitemap()
    const urls = new Set(entries.map((e) => e.url))

    expect(urls.has(CANONICAL_ORIGIN)).toBe(true)
    expect(urls.has(`${CANONICAL_ORIGIN}/faq`)).toBe(true)
    expect(urls.has(`${CANONICAL_ORIGIN}/about`)).toBe(true)
    expect(urls.has(`${CANONICAL_ORIGIN}/disclosure`)).toBe(true)
    expect(urls.has(`${CANONICAL_ORIGIN}/blog/tn-visa-nurses-2026`)).toBe(true)
    expect(urls.has(`${CANONICAL_ORIGIN}/blog/tn-visa-accountants-2026`)).toBe(true)

    for (const p of professions) {
      expect(urls.has(`${CANONICAL_ORIGIN}/professions/${p.slug}`)).toBe(true)
    }
    for (const c of SEED_COMPANIES) {
      expect(urls.has(`${CANONICAL_ORIGIN}/companies/${c.id}`)).toBe(true)
    }

    expect(entries.length).toBe(
      SITEMAP_STATIC.length + SITEMAP_BLOGS.length + professions.length + SEED_COMPANIES.length
    )
  })

  it('has no duplicate urls', () => {
    const entries = sitemap()
    const urls = entries.map((e) => e.url)
    expect(new Set(urls).size).toBe(urls.length)
  })
})
