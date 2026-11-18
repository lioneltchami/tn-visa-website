import { describe, expect, it } from 'vitest'
import { revocationStatus, type RevocationResult } from '@/lib/purchases'

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
