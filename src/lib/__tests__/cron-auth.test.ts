import { afterEach, describe, expect, it, vi } from 'vitest'
import { authorizeCronRequest } from '@/lib/cron-auth'

function req(auth?: string): Request {
  return new Request('https://tnvisaguide.ca/api/jobs/sync', {
    headers: auth ? { authorization: auth } : {},
  })
}

describe('cron auth', () => {
  afterEach(() => {
    vi.unstubAllEnvs()
  })

  it('rejects when no secrets are configured', () => {
    vi.stubEnv('SYNC_SECRET', '')
    vi.stubEnv('CRON_SECRET', '')
    delete process.env.SYNC_SECRET
    delete process.env.CRON_SECRET
    const res = authorizeCronRequest(req('Bearer anything'))
    expect(res?.status).toBe(500)
  })

  it('rejects missing or wrong bearer tokens', async () => {
    vi.stubEnv('CRON_SECRET', 'correct-secret-value-here')
    expect(authorizeCronRequest(req())?.status).toBe(401)
    expect(authorizeCronRequest(req('Bearer wrong'))?.status).toBe(401)
  })

  it('accepts either CRON_SECRET or SYNC_SECRET', () => {
    vi.stubEnv('CRON_SECRET', 'cron-secret-aaaaaaaa')
    vi.stubEnv('SYNC_SECRET', 'sync-secret-bbbbbbbb')
    expect(authorizeCronRequest(req('Bearer cron-secret-aaaaaaaa'))).toBeNull()
    expect(authorizeCronRequest(req('Bearer sync-secret-bbbbbbbb'))).toBeNull()
  })
})
