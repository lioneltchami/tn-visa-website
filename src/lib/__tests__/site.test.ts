import { afterEach, describe, expect, it, vi } from 'vitest'
import { CANONICAL_ORIGIN, isAllowedOrigin, resolveOrigin, siteUrl } from '@/lib/site'

function requestWithOrigin(origin?: string): Request {
  return new Request('https://tnvisaguide.ca/api/checkout', {
    method: 'POST',
    headers: origin ? { origin } : {},
  })
}

describe('origin handling', () => {
  afterEach(() => {
    vi.unstubAllEnvs()
    delete process.env.NEXT_PUBLIC_SITE_URL
  })

  it('accepts the canonical and www origins', () => {
    expect(isAllowedOrigin(CANONICAL_ORIGIN)).toBe(true)
    expect(isAllowedOrigin('https://www.tnvisaguide.ca')).toBe(true)
  })

  it('rejects look-alike and empty origins', () => {
    for (const origin of [
      'https://tnvisaguide.ca.evil.com',
      'http://tnvisaguide.ca',
      'https://evil.example',
      null,
      undefined,
      '',
    ]) {
      expect(isAllowedOrigin(origin)).toBe(false)
    }
  })

  it('falls back to the canonical origin for untrusted redirect targets', () => {
    expect(resolveOrigin(requestWithOrigin('https://evil.example'))).toBe(CANONICAL_ORIGIN)
    expect(resolveOrigin(requestWithOrigin())).toBe(CANONICAL_ORIGIN)
    expect(resolveOrigin(requestWithOrigin('https://www.tnvisaguide.ca'))).toBe(
      'https://www.tnvisaguide.ca'
    )
  })

  it('uses the configured site url for email links', () => {
    expect(siteUrl()).toBe(CANONICAL_ORIGIN)

    vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'https://staging.tnvisaguide.ca/')
    expect(siteUrl()).toBe('https://staging.tnvisaguide.ca')

    vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'not-a-url')
    expect(siteUrl()).toBe(CANONICAL_ORIGIN)
  })
})
