import { beforeEach, describe, expect, it } from 'vitest'
import { createDownloadToken, verifyDownloadToken } from '@/lib/download-token'

const PURCHASE_ID = '3f2504e0-4f89-11d3-9a0c-0305e82c3301'

describe('download tokens', () => {
  beforeEach(() => {
    process.env.DOWNLOAD_TOKEN_SECRET = 'test-secret-do-not-use-in-production'
  })

  it('round-trips a purchase id', () => {
    const token = createDownloadToken(PURCHASE_ID)
    expect(verifyDownloadToken(token)).toMatchObject({
      purchaseId: PURCHASE_ID,
    })
  })

  it('rejects a tampered signature', () => {
    const token = createDownloadToken(PURCHASE_ID)
    const tampered = `${token.slice(0, -1)}${token.endsWith('a') ? 'b' : 'a'}`
    expect(verifyDownloadToken(tampered)).toBeNull()
  })

  it('rejects a swapped payload', () => {
    const token = createDownloadToken(PURCHASE_ID)
    const signature = token.slice(token.lastIndexOf('.') + 1)
    const forgedPayload = Buffer.from(
      `11111111-1111-1111-1111-111111111111.${Math.floor(Date.now() / 1000) + 60}`,
      'utf8'
    ).toString('base64url')

    expect(verifyDownloadToken(`${forgedPayload}.${signature}`)).toBeNull()
  })

  it('rejects an expired token', () => {
    const token = createDownloadToken(PURCHASE_ID, -1)
    expect(verifyDownloadToken(token)).toBeNull()
  })

  it('rejects tokens signed with another secret', () => {
    const token = createDownloadToken(PURCHASE_ID)
    process.env.DOWNLOAD_TOKEN_SECRET = 'a-different-secret'
    expect(verifyDownloadToken(token)).toBeNull()
  })

  it('rejects malformed input', () => {
    for (const value of [null, undefined, '', 'not-a-token', 'a.b', 42, {}]) {
      expect(verifyDownloadToken(value)).toBeNull()
    }
  })

  it('refuses to sign a non-uuid purchase id', () => {
    expect(() => createDownloadToken('../../etc/passwd')).toThrow()
  })

  it('requires a dedicated secret in production', () => {
    delete process.env.DOWNLOAD_TOKEN_SECRET
    process.env.NODE_ENV = 'production'
    expect(() => createDownloadToken(PURCHASE_ID)).toThrow(
      'DOWNLOAD_TOKEN_SECRET must be set in production'
    )
    process.env.NODE_ENV = 'test'
  })
})
