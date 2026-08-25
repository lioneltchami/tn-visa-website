import { describe, expect, it } from 'vitest'
import {
  CHAT_FALLBACK_PHRASE,
  isChatFallbackResponse,
  isChatGroundedResponse,
} from '@/lib/chat-response'

describe('chat-response', () => {
  it('detects the prescribed fallback phrase', () => {
    expect(isChatFallbackResponse(CHAT_FALLBACK_PHRASE)).toBe(true)
    expect(isChatGroundedResponse(CHAT_FALLBACK_PHRASE)).toBe(false)
  })

  it('treats fee answers as grounded', () => {
    const answer =
      'The TN processing fee is $50 at the port of entry. Land border totals include a $30 I-94 fee.'
    expect(isChatFallbackResponse(answer)).toBe(false)
    expect(isChatGroundedResponse(answer)).toBe(true)
  })
})
