import { describe, expect, it } from 'vitest'
import { getChatFollowUps } from '@/lib/chat-follow-ups'
import { CHAT_FALLBACK_PHRASE } from '@/lib/chat-response'

describe('getChatFollowUps', () => {
  it('returns no links on fallback answers', () => {
    expect(getChatFollowUps('What is the TN processing fee?', CHAT_FALLBACK_PHRASE)).toEqual([])
  })

  it('suggests fees and products for fee questions', () => {
    const links = getChatFollowUps(
      'What is the TN processing fee?',
      'The TN processing fee is $50 at CBP. Land border totals include a $30 I-94 fee.'
    )
    expect(links.map((l) => l.href)).toEqual(['/fees', '/products'])
  })

  it('suggests apply and interview paths for POE questions', () => {
    const links = getChatFollowUps(
      'How do Canadians apply at a port of entry?',
      'Canadians can apply at a land border port of entry and meet a CBP officer in secondary inspection.'
    )
    expect(links.map((l) => l.href)).toContain('/apply')
    expect(links.map((l) => l.href)).toContain('/border-interview')
  })

  it('caps at three unique links', () => {
    const links = getChatFollowUps(
      'What documents do I need for a border interview and fees?',
      'Bring your employer letter, credentials, and pay the $50 processing fee at CBP.'
    )
    expect(links.length).toBeLessThanOrEqual(3)
    expect(new Set(links.map((l) => l.href)).size).toBe(links.length)
  })
})
