import type Stripe from 'stripe'

/** Extract a payment intent id from Stripe objects that may expand the relation. */
export function paymentIntentId(
  value: string | Stripe.PaymentIntent | null | undefined
): string | null {
  if (!value) return null
  return typeof value === 'string' ? value : value.id
}

/** Revoke only on a fully refunded charge (partial refunds keep access). */
export function shouldRevokeOnCharge(charge: Stripe.Charge): boolean {
  return charge.refunded && charge.amount_refunded > 0
}

export function shouldRevokeOnDispute(): boolean {
  return true
}
