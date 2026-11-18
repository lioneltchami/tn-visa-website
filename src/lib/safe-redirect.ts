const FALLBACK = '/dashboard'

/**
 * Next 14 router.push assigns another origin for //evil, /\evil, and absolute URLs.
 * Allow a same-site path: one leading slash, no backslash, no protocol.
 * C0 controls are rejected because the URL parser strips them ("/\t/evil" becomes "//evil").
 */
export function safeInternalPath(value: string | null | undefined): string {
  if (typeof value !== 'string' || value.length === 0) return FALLBACK
  if (/[\u0000-\u001F\u007F]/.test(value) || value !== value.trim()) return FALLBACK
  if (!value.startsWith('/') || value.startsWith('//') || value.startsWith('/\\')) return FALLBACK
  if (value.includes('\\')) return FALLBACK
  if (value.includes('://') || /^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(value)) return FALLBACK
  return value
}
