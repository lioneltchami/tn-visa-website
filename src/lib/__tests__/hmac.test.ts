import { createHmac } from 'node:crypto'
import { describe, expect, it } from 'vitest'
import { hmacSha256Base64Url, timingSafeEqualString } from '@/lib/hmac'

describe('edge HMAC', () => {
  it('matches node:crypto HMAC-SHA256 base64url (existing tokens stay valid)', async () => {
    const secret = 'test-secret-do-not-use-in-production'
    const payload = '3f2504e0-4f89-11d3-9a0c-0305e82c3301.1763420000'
    const node = createHmac('sha256', secret).update(payload).digest('base64url')
    expect(await hmacSha256Base64Url(secret, payload)).toBe(node)
  })

  it('compares strings in constant time', () => {
    expect(timingSafeEqualString('abc', 'abc')).toBe(true)
    expect(timingSafeEqualString('abc', 'abd')).toBe(false)
    expect(timingSafeEqualString('abc', 'ab')).toBe(false)
  })
})
