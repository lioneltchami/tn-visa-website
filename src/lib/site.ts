export const CANONICAL_ORIGIN = 'https://tnvisaguide.ca'

const PRODUCTION_ORIGINS = [CANONICAL_ORIGIN, 'https://www.tnvisaguide.ca']

function allowedOrigins(): string[] {
  if (process.env.NODE_ENV === 'production') return PRODUCTION_ORIGINS
  return [...PRODUCTION_ORIGINS, 'http://localhost:3000', 'http://127.0.0.1:3000']
}

export function isAllowedOrigin(origin: string | null | undefined): boolean {
  return Boolean(origin) && allowedOrigins().includes(origin as string)
}

/**
 * Never trust the `Origin` header for redirect targets: an attacker-supplied
 * origin would end up in Stripe's success/cancel URLs.
 */
export function resolveOrigin(req: Request): string {
  const origin = req.headers.get('origin')
  return isAllowedOrigin(origin) ? (origin as string) : CANONICAL_ORIGIN
}

/** Absolute base URL for links sent in emails. */
export function siteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL
  if (configured && /^https?:\/\//.test(configured)) return configured.replace(/\/+$/, '')
  return CANONICAL_ORIGIN
}
