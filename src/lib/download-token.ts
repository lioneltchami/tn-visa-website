import { createHmac, timingSafeEqual } from 'crypto'

/**
 * Stateless, signed download links: `base64url(purchaseId.expiry).hmac`.
 *
 * Tokens are derived from the purchase row instead of being stored, so the
 * webhook email and the post-checkout success page can hand out the exact
 * same link without a rotation race. Rotating the secret revokes every link.
 */

const DEFAULT_TTL_DAYS = 365
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export type DownloadTokenPayload = {
  purchaseId: string
  expiresAt: number
}

function getSecret(): string {
  // Falls back to the service role key (server-only, high entropy) so links
  // keep working even if DOWNLOAD_TOKEN_SECRET was never provisioned.
  const secret = process.env.DOWNLOAD_TOKEN_SECRET || process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!secret) {
    throw new Error('DOWNLOAD_TOKEN_SECRET (or SUPABASE_SERVICE_ROLE_KEY) is not set')
  }
  return secret
}

function sign(payload: string): string {
  return createHmac('sha256', getSecret()).update(payload).digest('base64url')
}

export function createDownloadToken(purchaseId: string, ttlDays = DEFAULT_TTL_DAYS): string {
  if (!UUID_RE.test(purchaseId)) throw new Error('createDownloadToken: invalid purchase id')

  const expiresAt = Math.floor(Date.now() / 1000) + Math.round(ttlDays * 86_400)
  const payload = `${purchaseId}.${expiresAt}`

  return `${Buffer.from(payload, 'utf8').toString('base64url')}.${sign(payload)}`
}

export function verifyDownloadToken(token: unknown): DownloadTokenPayload | null {
  if (typeof token !== 'string' || token.length < 32 || token.length > 512) return null

  const separator = token.lastIndexOf('.')
  if (separator <= 0) return null

  const encodedPayload = token.slice(0, separator)
  const signature = token.slice(separator + 1)
  if (!encodedPayload || !signature) return null

  let payload: string
  try {
    payload = Buffer.from(encodedPayload, 'base64url').toString('utf8')
  } catch {
    return null
  }

  const expected = Buffer.from(sign(payload), 'utf8')
  const received = Buffer.from(signature, 'utf8')
  if (expected.length !== received.length || !timingSafeEqual(expected, received)) return null

  const [purchaseId, rawExpiry] = payload.split('.')
  const expiresAt = Number(rawExpiry)
  if (!purchaseId || !UUID_RE.test(purchaseId)) return null
  if (!Number.isFinite(expiresAt) || expiresAt <= Math.floor(Date.now() / 1000)) return null

  return { purchaseId, expiresAt }
}
