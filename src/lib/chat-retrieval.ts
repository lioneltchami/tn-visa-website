export const DEFAULT_CHAT_MATCH_THRESHOLD = 0.2

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
