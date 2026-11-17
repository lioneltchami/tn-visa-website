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

  it('normalizes an email before signing and verifying it', async () => {
    const token = await createUnsubscribeToken(' Reader@Example.COM ')
    expect(await verifyUnsubscribeToken(token)).toMatchObject({ email: EMAIL })
  })

  it('rejects a tampered signature', async () => {
    const token = await createUnsubscribeToken(EMAIL)
    const tampered = `${token.slice(0, -1)}${token.endsWith('a') ? 'b' : 'a'}`
    expect(await verifyUnsubscribeToken(tampered)).toBeNull()
  })

  it('rejects a token signed with a different secret', async () => {
    const token = await createUnsubscribeToken(EMAIL)
    process.env.UNSUBSCRIBE_TOKEN_SECRET = 'another-secret'
    expect(await verifyUnsubscribeToken(token)).toBeNull()
  })

  it('rejects expired and malformed tokens', async () => {
    expect(await verifyUnsubscribeToken(await createUnsubscribeToken(EMAIL, -1))).toBeNull()

    for (const value of [null, undefined, '', 'not-a-token', 'a.b', 42, {}]) {
      expect(await verifyUnsubscribeToken(value)).toBeNull()
    }
  })

  it('rejects invalid email values', async () => {
    for (const value of [null, undefined, '', 'not-an-email', 'a'.repeat(321) + '@example.com']) {
      expect(normalizeSubscriberEmail(value)).toBeNull()
    }
    await expect(createUnsubscribeToken('not-an-email')).rejects.toThrow()
  })
})
