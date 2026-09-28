import { describe, expect, it } from 'vitest'
import { isCloudflareChallenge } from '../../../scripts/smoke-chat'

const CF_HTML = '<!DOCTYPE html><html lang="en-US"><head><title>Just a moment...</title>'

describe('chat smoke Cloudflare challenge', () => {
  it('retries only the interstitial, not an app 403', () => {
    expect(isCloudflareChallenge(403, CF_HTML)).toBe(true)
    expect(isCloudflareChallenge(503, 'cdn-cgi/challenge-platform')).toBe(true)
    expect(
      isCloudflareChallenge(403, '{"error":"Requests from this origin are not allowed."}')
    ).toBe(false)
    expect(isCloudflareChallenge(200, CF_HTML)).toBe(false)
  })
})
