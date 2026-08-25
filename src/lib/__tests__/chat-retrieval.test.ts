import { describe, expect, it } from 'vitest'
import { DEFAULT_CHAT_MATCH_THRESHOLD, getChatMatchThreshold } from '../chat-retrieval'

describe('getChatMatchThreshold', () => {
  it('uses the retrieval-friendly default when no override is configured', () => {
    expect(getChatMatchThreshold(undefined)).toBe(DEFAULT_CHAT_MATCH_THRESHOLD)
    expect(DEFAULT_CHAT_MATCH_THRESHOLD).toBe(0.2)
  })

  it('accepts a bounded deployment override', () => {
    expect(getChatMatchThreshold('0.35')).toBe(0.35)
  })

  it('rejects unsafe, invalid, or overly restrictive values', () => {
    expect(getChatMatchThreshold('not-a-number')).toBe(DEFAULT_CHAT_MATCH_THRESHOLD)
    expect(getChatMatchThreshold('0.09')).toBe(DEFAULT_CHAT_MATCH_THRESHOLD)
    expect(getChatMatchThreshold('0.61')).toBe(DEFAULT_CHAT_MATCH_THRESHOLD)
  })
})
