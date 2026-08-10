import { EDITORIAL, SITE_EMAIL, SITE_LOGO_URL, SITE_NAME, SITE_URL } from '@/lib/site-identity'

export type ArticleSchemaInput = {
  headline: string
  description?: string
  datePublished: string
  dateModified?: string
  /** Site path, e.g. `/blog/tn-visa-renewal-2026` */
  path: string
  image?: string
}

/** Named Person author pointing at /about — prefer over bare Organization. */
export function articleAuthorPerson() {
  return {
    '@type': 'Person' as const,
    name: EDITORIAL.name,
    jobTitle: EDITORIAL.jobTitle,
    url: `${SITE_URL}/about`,
    email: SITE_EMAIL,
    worksFor: {
      '@type': 'Organization' as const,
      name: SITE_NAME,
      url: SITE_URL,
    },
  }
}

export function articlePublisher() {
  return {
    '@type': 'Organization' as const,
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject' as const,
      url: SITE_LOGO_URL,
    },
  }
}

/** Standard Article JSON-LD for blog posts (citable author + publisher). */
export function blogArticleSchema(input: ArticleSchemaInput) {
  const url = `${SITE_URL}${input.path.startsWith('/') ? input.path : `/${input.path}`}`
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: input.headline,
    ...(input.description ? { description: input.description } : {}),
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    author: articleAuthorPerson(),
    publisher: articlePublisher(),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    url,
    ...(input.image ? { image: input.image } : {}),
    isAccessibleForFree: true,
  }
}
