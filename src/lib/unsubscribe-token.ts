import { createHmac, timingSafeEqual } from 'crypto'

const DEFAULT_TTL_DAYS = 30
const MAX_TOKEN_LENGTH = 1024
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export type UnsubscribeTokenPayload = {
  email: string
  expiresAt: number
}

export function normalizeSubscriberEmail(value: unknown): string | null {
  if (typeof value !== 'string') return null

  const email = value.trim().toLowerCase()
  if (!email || email.length > 320 || !EMAIL_REGEX.test(email)) return null

  return email
}

function getSecret(): string {
  const secret = process.env.UNSUBSCRIBE_TOKEN_SECRET
  if (!secret) throw new Error('UNSUBSCRIBE_TOKEN_SECRET is not set')
  return secret
}

function sign(payload: string): string {
  return createHmac('sha256', getSecret()).update(payload).digest('base64url')
}

export function createUnsubscribeToken(email: string, ttlDays = DEFAULT_TTL_DAYS): string {
  const normalizedEmail = normalizeSubscriberEmail(email)
  if (!normalizedEmail) throw new Error('createUnsubscribeToken: invalid email')

  const expiresAt = Math.floor(Date.now() / 1000) + Math.round(ttlDays * 86_400)
  const payload = `${normalizedEmail}.${expiresAt}`

  return `${Buffer.from(payload, 'utf8').toString('base64url')}.${sign(payload)}`
}

export function verifyUnsubscribeToken(token: unknown): UnsubscribeTokenPayload | null {
  if (typeof token !== 'string' || token.length < 32 || token.length > MAX_TOKEN_LENGTH) return null

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

  const payloadSeparator = payload.lastIndexOf('.')
  if (payloadSeparator <= 0) return null

  const email = normalizeSubscriberEmail(payload.slice(0, payloadSeparator))
  const expiresAt = Number(payload.slice(payloadSeparator + 1))
  if (!email || !Number.isFinite(expiresAt) || expiresAt <= Math.floor(Date.now() / 1000)) return null

  return { email, expiresAt }
}
