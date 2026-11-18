import { describe, expect, it } from 'vitest'
import { existingPurchaseVerdict, revocationStatus, type RevocationResult } from '@/lib/purchases'

describe('revocationStatus', () => {
  it('returns 500 when the purchase is not recorded yet', () => {
    const result: RevocationResult = { revoked: false, pending: true }
    expect(revocationStatus(result)).toBe(500)
  })

  it('returns 200 when the purchase was revoked', () => {
    const result: RevocationResult = { revoked: true, purchaseId: 'purchase-id' }
    expect(revocationStatus(result)).toBe(200)
  })

  it('returns 200 when the purchase was already revoked', () => {
    const result: RevocationResult = { revoked: false, purchaseId: 'purchase-id' }
    expect(revocationStatus(result)).toBe(200)
  })
})

describe('existingPurchaseVerdict', () => {
  it('returns missing when no purchase row is present', () => {
    expect(existingPurchaseVerdict(null)).toBe('missing')
    expect(existingPurchaseVerdict(undefined)).toBe('missing')
  })

  it('returns already-revoked when revoked_at is set', () => {
    expect(
      existingPurchaseVerdict({ id: 'purchase-id', revoked_at: '2026-01-01T00:00:00.000Z' })
    ).toBe('already-revoked')
  })

  it('returns active when the purchase still has access', () => {
    expect(existingPurchaseVerdict({ id: 'purchase-id', revoked_at: null })).toBe('active')
  })
})
