import { createServiceSupabase } from '@/lib/supabase/admin'

/**
 * Fixed-window rate limiting shared by the public API routes.
 *
 * Counters live in Postgres (`consume_rate_limit`) so limits hold across
 * serverless instances. If Postgres is unavailable the limiter degrades to a
 * per-instance in-memory window rather than failing open completely.
 */

export type RateLimitResult = {
  allowed: boolean
  limit: number
  remaining: number
  resetSeconds: number
}

type MemoryWindow = { count: number; resetAt: number }

const MEMORY_MAX_KEYS = 5_000
const memoryWindows = new Map<string, MemoryWindow>()

function consumeInMemory(key: string, limit: number, windowSeconds: number): RateLimitResult {
  const now = Date.now()

  if (memoryWindows.size > MEMORY_MAX_KEYS) {
    memoryWindows.forEach((window, existingKey) => {
      if (window.resetAt <= now) memoryWindows.delete(existingKey)
    })
  }

  const current = memoryWindows.get(key)
  const window =
    current && current.resetAt > now ? current : { count: 0, resetAt: now + windowSeconds * 1000 }

  window.count += 1
  memoryWindows.set(key, window)

  return {
    allowed: window.count <= limit,
    limit,
    remaining: Math.max(limit - window.count, 0),
    resetSeconds: Math.max(Math.ceil((window.resetAt - now) / 1000), 0),
  }
}

export async function consumeRateLimit(
  key: string,
  limit: number,
  windowSeconds: number
): Promise<RateLimitResult> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return consumeInMemory(key, limit, windowSeconds)
  }

  try {
    const { data, error } = await createServiceSupabase()
      .rpc('consume_rate_limit', {
        p_key: key,
        p_limit: limit,
        p_window_seconds: windowSeconds,
      })
      .maybeSingle<{
        is_allowed: boolean
        remaining: number
        reset_seconds: number
      }>()

    if (error || !data) throw error ?? new Error('consume_rate_limit returned no row')

    return {
      allowed: data.is_allowed,
      limit,
      remaining: data.remaining,
      resetSeconds: data.reset_seconds,
    }
  } catch (err) {
    console.warn('[rate-limit] falling back to in-memory window:', err)
    return consumeInMemory(key, limit, windowSeconds)
  }
}

/** First hop of the proxy chain: Cloudflare in front of Vercel. */
export function getClientIp(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for')
  if (forwarded) {
    const first = forwarded.split(',')[0]?.trim()
    if (first) return first
  }
  return req.headers.get('cf-connecting-ip') || req.headers.get('x-real-ip') || 'unknown'
}

export function rateLimitHeaders(result: RateLimitResult): Record<string, string> {
  return {
    'X-RateLimit-Limit': String(result.limit),
    'X-RateLimit-Remaining': String(result.remaining),
    'X-RateLimit-Reset': String(result.resetSeconds),
    ...(result.allowed ? {} : { 'Retry-After': String(Math.max(result.resetSeconds, 1)) }),
  }
}
