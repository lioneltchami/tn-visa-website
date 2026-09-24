import { describe, expect, it } from 'vitest'
import robots from '@/app/robots'

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

describe('robots AI crawler policy', () => {
  it('allows citation crawlers and still blocks private paths', () => {
    const result = robots()
    const rules = Array.isArray(result.rules) ? result.rules : [result.rules]
    const agents = rules.map((rule) => rule.userAgent)
    expect(agents).toEqual(['*', ...AI_CRAWLERS])
    for (const rule of rules) {
      expect(rule.allow).toBe('/')
      expect(rule.disallow).toEqual(
        expect.arrayContaining(['/dashboard', '/login', '/products/download'])
      )
    }
    expect(result.sitemap).toBe('https://tnvisaguide.ca/sitemap.xml')
  })
})
