import { describe, expect, it } from 'vitest'
import {
  interpretRevocationFollowUp,
  revocationStatus,
  type RevocationResult,
} from '@/lib/purchases'

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

describe('interpretRevocationFollowUp', () => {
  it('returns missing when there are no rows', () => {
    expect(interpretRevocationFollowUp([])).toEqual({ kind: 'missing' })
  })

  it('returns already_revoked when every row has revoked_at set', () => {
    expect(
      interpretRevocationFollowUp([
        { id: 'p1', revoked_at: '2026-01-01T00:00:00.000Z' },
        { id: 'p2', revoked_at: '2026-01-02T00:00:00.000Z' },
      ])
    ).toEqual({ kind: 'already_revoked', purchaseId: 'p1' })
  })

  it('returns still_active when any row has revoked_at null', () => {
    expect(
      interpretRevocationFollowUp([{ id: 'p-active', revoked_at: null }])
    ).toEqual({ kind: 'still_active', purchaseId: 'p-active' })
  })

  it('returns still_active for mixed revoked and active rows', () => {
    expect(
      interpretRevocationFollowUp([
        { id: 'p-revoked', revoked_at: '2026-01-01T00:00:00.000Z' },
        { id: 'p-active', revoked_at: null },
      ])
    ).toEqual({ kind: 'still_active', purchaseId: 'p-active' })
  })
})
