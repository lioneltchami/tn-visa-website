import type { MetadataRoute } from 'next'

/** Private routes stay disallowed for every crawler, including AI search bots. */
const DISALLOW = [
  '/dashboard',
  '/my-documents',
  '/profile',
  '/onboarding',
  '/analyzer',
  '/login',
  '/signup',
  '/products/download',
  '/products/success',
]

/**
 * Explicit allow for citation crawlers. Each group repeats DISALLOW so a
 * more-specific user-agent block does not drop the private-path rules.
 * Training-only crawlers (CCBot) are not blocked; we want citation, not a
 * silent training ban. Policy is also stated in public/llms.txt.
 */
const AI_CRAWLERS = [
  'GPTBot',
  'ChatGPT-User',
  'OAI-SearchBot',
  'ClaudeBot',
  'anthropic-ai',
  'PerplexityBot',
  'Google-Extended',
  'Bingbot',
]

function rule(userAgent: string): MetadataRoute.Robots['rules'] {
  return { userAgent, allow: '/', disallow: DISALLOW }
}

export default function robots(): MetadataRoute.Robots {
  return {
    rules: ['*', ...AI_CRAWLERS].map((ua) => rule(ua)) as NonNullable<
      MetadataRoute.Robots['rules']
    >,
    sitemap: 'https://tnvisaguide.ca/sitemap.xml',
  }
}
