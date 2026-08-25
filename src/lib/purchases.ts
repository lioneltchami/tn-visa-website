import type { ProductId } from '@/lib/products'
import { createServiceSupabase } from '@/lib/supabase/admin'

/** Server-only access to the `purchases` table (RLS allows service role only). */

export type PurchaseRecord = {
  id: string
  stripe_session_id: string
  stripe_payment_intent: string | null
  product_id: string
  email: string | null
  amount_total: number | null
  currency: string | null
  download_count: number
  max_downloads: number
  fulfilled_at: string | null
  revoked_at: string | null
  created_at: string
}

const COLUMNS =
  'id, stripe_session_id, stripe_payment_intent, product_id, email, amount_total, currency, download_count, max_downloads, fulfilled_at, revoked_at, created_at'

export function isPurchaseRevoked(purchase: Pick<PurchaseRecord, 'revoked_at'>): boolean {
  return purchase.revoked_at != null
}

export type EnsurePurchaseInput = {
  stripeSessionId: string
  productId: ProductId
  email?: string | null
  amountTotal?: number | null
  currency?: string | null
  stripePaymentIntent?: string | null
}

/**
 * Idempotently record a paid checkout session. Both the Stripe webhook and the
 * success page call this, so whichever arrives first creates the row and the
 * buyer gets access even if the other path fails.
 */
export async function ensurePurchase(
  input: EnsurePurchaseInput
): Promise<{ purchase: PurchaseRecord; created: boolean }> {
  const supabase = createServiceSupabase()

  const existing = await supabase
    .from('purchases')
    .select(COLUMNS)
    .eq('stripe_session_id', input.stripeSessionId)
    .maybeSingle<PurchaseRecord>()

  if (existing.error) throw existing.error
  if (existing.data) return { purchase: existing.data, created: false }

  const inserted = await supabase
    .from('purchases')
    .insert({
      stripe_session_id: input.stripeSessionId,
      stripe_payment_intent: input.stripePaymentIntent ?? null,
      product_id: input.productId,
      email: input.email ?? null,
      amount_total: input.amountTotal ?? null,
      currency: input.currency ?? 'usd',
    })
    .select(COLUMNS)
    .maybeSingle<PurchaseRecord>()

  if (inserted.data) return { purchase: inserted.data, created: true }

  // Unique violation: a concurrent webhook/success-page call won the race.
  if (inserted.error && inserted.error.code !== '23505') throw inserted.error

  const raced = await supabase
    .from('purchases')
    .select(COLUMNS)
    .eq('stripe_session_id', input.stripeSessionId)
    .maybeSingle<PurchaseRecord>()

  if (raced.error) throw raced.error
  if (!raced.data) throw inserted.error ?? new Error('Failed to record purchase')

  return { purchase: raced.data, created: false }
}

export async function getPurchaseById(purchaseId: string): Promise<PurchaseRecord | null> {
  const { data, error } = await createServiceSupabase()
    .from('purchases')
    .select(COLUMNS)
    .eq('id', purchaseId)
    .maybeSingle<PurchaseRecord>()

  if (error) throw error
  return data
}

/** Idempotently revoke access for a refunded or disputed payment. */
export async function revokePurchaseByPaymentIntent(
  paymentIntentId: string
): Promise<{ revoked: boolean; purchaseId?: string }> {
  const { data, error } = await createServiceSupabase()
    .from('purchases')
    .update({ revoked_at: new Date().toISOString() })
    .eq('stripe_payment_intent', paymentIntentId)
    .is('revoked_at', null)
    .select('id')

  if (error) throw error
  if (!data?.length) return { revoked: false }

  return { revoked: true, purchaseId: data[0].id }
}

/**
 * Claim the one-time fulfillment email for a purchase. Returns true only for
 * the caller that flipped `fulfilled_at`, so Stripe webhook retries never send
 * duplicate emails.
 */
export async function claimFulfillment(purchaseId: string): Promise<boolean> {
  const { data, error } = await createServiceSupabase()
    .from('purchases')
    .update({ fulfilled_at: new Date().toISOString() })
    .eq('id', purchaseId)
    .is('fulfilled_at', null)
    .select('id')

  if (error) throw error
  return (data?.length ?? 0) > 0
}

/** Undo a fulfillment claim so a later retry can send the email again. */
export async function releaseFulfillment(purchaseId: string): Promise<void> {
  const { error } = await createServiceSupabase()
    .from('purchases')
    .update({ fulfilled_at: null })
    .eq('id', purchaseId)

  if (error) console.error('[purchases] Failed to release fulfillment claim:', error.message)
}

export type DownloadConsumption = {
  allowed: boolean
  downloadsUsed: number
  downloadsMax: number
}

/** Atomically consume one download slot (see `consume_download` in Postgres). */
export async function consumeDownload(purchaseId: string): Promise<DownloadConsumption> {
  const { data, error } = await createServiceSupabase()
    .rpc('consume_download', { p_purchase_id: purchaseId })
    .maybeSingle<{
      is_allowed: boolean
      downloads_used: number
      downloads_max: number
    }>()

  if (error) throw error

  return {
    allowed: Boolean(data?.is_allowed),
    downloadsUsed: data?.downloads_used ?? 0,
    downloadsMax: data?.downloads_max ?? 0,
  }
}
