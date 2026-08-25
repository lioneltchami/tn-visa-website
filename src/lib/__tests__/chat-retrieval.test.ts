import { describe, expect, it } from 'vitest'
import {
  CHAT_RETRIEVAL_MATCH_COUNT,
  DEFAULT_CHAT_MATCH_THRESHOLD,
  getChatMatchThreshold,
  shouldRetryWithoutThreshold,
} from '../chat-retrieval'

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

  it('uses a bounded source window large enough for factual guide subsections', () => {
    expect(CHAT_RETRIEVAL_MATCH_COUNT).toBe(8)
  })

  it('retries ranked retrieval only when a positive threshold returns no matches', () => {
    expect(shouldRetryWithoutThreshold(0, 0.2)).toBe(true)
    expect(shouldRetryWithoutThreshold(1, 0.2)).toBe(false)
    expect(shouldRetryWithoutThreshold(0, 0)).toBe(false)
  })
})
