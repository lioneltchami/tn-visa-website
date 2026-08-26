import { describe, expect, it } from 'vitest'
import {
  paymentIntentId,
  shouldRevokeOnCharge,
  shouldRevokeOnDispute,
} from '@/lib/stripe-webhook-events'

describe('stripe webhook event helpers', () => {
  it('extracts a string payment intent id', () => {
    expect(paymentIntentId('pi_123')).toBe('pi_123')
  })

  it('extracts an expanded payment intent id', () => {
    expect(paymentIntentId({ id: 'pi_456' } as never)).toBe('pi_456')
  })

  it('returns null when payment intent is missing', () => {
    expect(paymentIntentId(null)).toBeNull()
    expect(paymentIntentId(undefined)).toBeNull()
  })

  it('revokes when a charge has any refund amount', () => {
    expect(
      shouldRevokeOnCharge({
        refunded: true,
        amount_refunded: 2900,
        amount: 2900,
      } as never)
    ).toBe(true)

    expect(
      shouldRevokeOnCharge({
        refunded: false,
        amount_refunded: 0,
        amount: 2900,
      } as never)
    ).toBe(false)
  })

  it('revokes on dispute creation', () => {
    expect(shouldRevokeOnDispute()).toBe(true)
  })
})
