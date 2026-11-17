import { base64UrlToUtf8, bytesToBase64Url, hmacSha256Base64Url, timingSafeEqualString } from '@/lib/hmac'

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
  const dedicated = process.env.DOWNLOAD_TOKEN_SECRET
  const isProduction =
    process.env.NODE_ENV === 'production' || process.env.CF_PAGES === '1'

  if (dedicated) return dedicated

  if (isProduction) {
    throw new Error('DOWNLOAD_TOKEN_SECRET must be set in production')
  }

  const fallback = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!fallback) {
    throw new Error('DOWNLOAD_TOKEN_SECRET (or SUPABASE_SERVICE_ROLE_KEY) is not set')
  }

  return fallback
}

async function sign(payload: string): Promise<string> {
  return hmacSha256Base64Url(getSecret(), payload)
}

export async function createDownloadToken(purchaseId: string, ttlDays = DEFAULT_TTL_DAYS): Promise<string> {
  if (!UUID_RE.test(purchaseId)) throw new Error('createDownloadToken: invalid purchase id')

  const expiresAt = Math.floor(Date.now() / 1000) + Math.round(ttlDays * 86_400)
  const payload = `${purchaseId}.${expiresAt}`

  return `${bytesToBase64Url(new TextEncoder().encode(payload))}.${await sign(payload)}`
}

export async function verifyDownloadToken(token: unknown): Promise<DownloadTokenPayload | null> {
  if (typeof token !== 'string' || token.length < 32 || token.length > 512) return null

  const separator = token.lastIndexOf('.')
  if (separator <= 0) return null

  const encodedPayload = token.slice(0, separator)
  const signature = token.slice(separator + 1)
  if (!encodedPayload || !signature) return null

  let payload: string
  try {
    payload = base64UrlToUtf8(encodedPayload)
  } catch {
    return null
  }

  const expected = await sign(payload)
  if (!timingSafeEqualString(expected, signature)) return null

  const [purchaseId, rawExpiry] = payload.split('.')
  const expiresAt = Number(rawExpiry)
  if (!purchaseId || !UUID_RE.test(purchaseId)) return null
  if (!Number.isFinite(expiresAt) || expiresAt <= Math.floor(Date.now() / 1000)) return null

  return { purchaseId, expiresAt }
}
