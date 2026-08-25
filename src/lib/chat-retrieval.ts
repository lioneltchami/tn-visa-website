export const DEFAULT_CHAT_MATCH_THRESHOLD = 0.2
/**
 * The guide uses broad ~500-word chunks. Eight ranked matches retain enough
 * topical breadth for factual subsections such as Fees while keeping the
 * model context bounded and source-focused.
 */
export const CHAT_RETRIEVAL_MATCH_COUNT = 8

/**
 * Validates the semantic similarity threshold supplied to the public chat route.
 * Values outside the bounded range fall back to the tested default so a deployment
 * cannot accidentally disable retrieval or accept every unrelated document.
 */
export function getChatMatchThreshold(value: string | undefined): number {
  if (!value) return DEFAULT_CHAT_MATCH_THRESHOLD

  const parsed = Number.parseFloat(value)
  if (!Number.isFinite(parsed) || parsed < 0.1 || parsed > 0.6) {
    return DEFAULT_CHAT_MATCH_THRESHOLD
  }

  return parsed
}

/**
 * A threshold can screen out every result when a short question is compared with
 * a broad source chunk. In that case, return the ranked top matches rather than
 * sending a known in-corpus question to the generic fallback response.
 */
export function shouldRetryWithoutThreshold(matchCount: number, threshold: number): boolean {
  return matchCount === 0 && threshold > 0
}
