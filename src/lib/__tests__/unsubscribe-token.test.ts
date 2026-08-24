import { beforeEach, describe, expect, it } from 'vitest'
import {
  createUnsubscribeToken,
  normalizeSubscriberEmail,
  verifyUnsubscribeToken,
} from '@/lib/unsubscribe-token'

const EMAIL = 'reader@example.com'

describe('unsubscribe tokens', () => {
  beforeEach(() => {
    process.env.UNSUBSCRIBE_TOKEN_SECRET = 'test-unsubscribe-secret-do-not-use-in-production'
  })

  it('normalizes an email before signing and verifying it', () => {
    const token = createUnsubscribeToken(' Reader@Example.COM ')
    expect(verifyUnsubscribeToken(token)).toMatchObject({ email: EMAIL })
  })

  it('rejects a tampered signature', () => {
    const token = createUnsubscribeToken(EMAIL)
    const tampered = `${token.slice(0, -1)}${token.endsWith('a') ? 'b' : 'a'}`
    expect(verifyUnsubscribeToken(tampered)).toBeNull()
  })

  it('rejects a token signed with a different secret', () => {
    const token = createUnsubscribeToken(EMAIL)
    process.env.UNSUBSCRIBE_TOKEN_SECRET = 'another-secret'
    expect(verifyUnsubscribeToken(token)).toBeNull()
  })

  it('rejects expired and malformed tokens', () => {
    expect(verifyUnsubscribeToken(createUnsubscribeToken(EMAIL, -1))).toBeNull()

    for (const value of [null, undefined, '', 'not-a-token', 'a.b', 42, {}]) {
      expect(verifyUnsubscribeToken(value)).toBeNull()
    }
  })

  it('rejects invalid email values', () => {
    for (const value of [null, undefined, '', 'not-an-email', 'a'.repeat(321) + '@example.com']) {
      expect(normalizeSubscriberEmail(value)).toBeNull()
    }
    expect(() => createUnsubscribeToken('not-an-email')).toThrow()
  })
})
