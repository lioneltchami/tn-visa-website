import { beforeEach, describe, expect, it } from 'vitest'
import {
  buildHtml,
  reminderUnsubscribeUrl,
  shouldReclaimUnsentReminder,
  shouldSkipUnsubscribed,
} from '@/lib/renewal-reminders'
import { verifyUnsubscribeToken } from '@/lib/unsubscribe-token'

describe('renewal reminder claim', () => {
  it('reclaims a unique collision that never recorded a send', () => {
    expect(shouldReclaimUnsentReminder('23505', null)).toBe(true)
    expect(shouldReclaimUnsentReminder('23505', undefined)).toBe(true)
  })

  it('leaves a unique collision alone once sent_at is set', () => {
    expect(shouldReclaimUnsentReminder('23505', '2026-11-01T00:00:00.000Z')).toBe(false)
  })

  it('does not reclaim other database errors', () => {
    expect(shouldReclaimUnsentReminder(undefined, null)).toBe(false)
    expect(shouldReclaimUnsentReminder('42501', null)).toBe(false)
  })
})

describe('renewal reminder unsubscribe', () => {
  beforeEach(() => {
    process.env.UNSUBSCRIBE_TOKEN_SECRET = 'test-unsubscribe-secret-do-not-use-in-production'
    process.env.NEXT_PUBLIC_SITE_URL = 'https://tnvisaguide.ca'
  })

  it('skips opted-out addresses and keeps everyone else', () => {
    expect(shouldSkipUnsubscribed('2026-11-01T00:00:00.000Z')).toBe(true)
    expect(shouldSkipUnsubscribed(null)).toBe(false)
    expect(shouldSkipUnsubscribed(undefined)).toBe(false)
  })

  it('puts a real unsubscribe URL in the reminder', () => {
    const href = reminderUnsubscribeUrl(' Reader@Example.COM ')
    const url = new URL(href)
    expect(`${url.origin}${url.pathname}`).toBe('https://tnvisaguide.ca/unsubscribe')
    expect(verifyUnsubscribeToken(url.searchParams.get('token'))).toMatchObject({
      email: 'reader@example.com',
    })

    const html = buildHtml({
      days: 30,
      firstName: 'Ada',
      employer: 'Acme',
      profession: 'Engineer',
      endDate: '2026-12-01',
      unsubscribeUrl: href,
    })
    expect(html).toContain(`href="${href}"`)
    expect(html).toContain('Unsubscribe')
  })
})
