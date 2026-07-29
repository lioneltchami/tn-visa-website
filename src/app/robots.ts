import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/dashboard',
        '/my-documents',
        '/profile',
        '/onboarding',
        '/analyzer',
        '/login',
        '/signup',
        '/products/download',
        '/products/success',
      ],
    },
    sitemap: 'https://tnvisaguide.ca/sitemap.xml',
  }
}
