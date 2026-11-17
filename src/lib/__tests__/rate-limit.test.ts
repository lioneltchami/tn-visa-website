import { describe, expect, it } from 'vitest'
import { getClientIp } from '@/lib/rate-limit'

function req(headers: Record<string, string>): Request {
  return new Request('https://tnvisaguide.ca/', { headers })
}

describe('getClientIp', () => {
  it('prefers cf-connecting-ip over forwarded headers', () => {
    expect(
      getClientIp(
        req({
          'cf-connecting-ip': '203.0.113.9',
          'x-forwarded-for': '198.51.100.1, 203.0.113.9',
          'x-real-ip': '192.0.2.1',
        })
      )
    ).toBe('203.0.113.9')
  })

  it('uses the first x-forwarded-for hop when Cloudflare is absent', () => {
    expect(getClientIp(req({ 'x-forwarded-for': '198.51.100.1, 203.0.113.9' }))).toBe(
      '198.51.100.1'
    )
  })

  it('falls back to x-real-ip, then unknown', () => {
    expect(getClientIp(req({ 'x-real-ip': '192.0.2.1' }))).toBe('192.0.2.1')
    expect(getClientIp(req({}))).toBe('unknown')
  })

  it('accepts a Headers-like getter (next/headers)', () => {
    const headers = new Headers({ 'cf-connecting-ip': '203.0.113.10' })
    expect(getClientIp(headers)).toBe('203.0.113.10')
  })
})
