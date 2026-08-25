import { describe, expect, it } from 'vitest'
import {
  buildContentChunks,
  chunkText,
  parseIngestArgs,
  sourceSha256,
} from '../embedding-ingest'

describe('embedding ingestion helpers', () => {
  it('requires an explicit ready-version ID for activation', () => {
    expect(parseIngestArgs([])).toEqual({ guidePath: undefined, activateVersion: undefined })
    expect(parseIngestArgs(['--guide-path=/tmp/guide.md'])).toEqual({
      guidePath: '/tmp/guide.md',
      activateVersion: undefined,
    })
    expect(parseIngestArgs(['--activate-version=00000000-0000-0000-0000-000000000001'])).toEqual({
      guidePath: undefined,
      activateVersion: '00000000-0000-0000-0000-000000000001',
    })
  })

  it('creates non-empty chunks with overlap validation', () => {
    const chunks = chunkText('One. Two. Three.', 2, 1)
    expect(chunks.length).toBeGreaterThan(1)
    expect(() => chunkText('One.', 10, 10)).toThrow('overlapWords')
  })

  it('preserves source section metadata', () => {
    const chunks = buildContentChunks('## Fees\nThe fee is listed.\n\n## Documents\nBring a letter.')
    expect(chunks).toHaveLength(2)
    expect(chunks.map((chunk) => chunk.metadata.section)).toEqual(['Fees', 'Documents'])
  })

  it('produces stable source fingerprints', () => {
    expect(sourceSha256('guide')).toBe(sourceSha256('guide'))
    expect(sourceSha256('guide')).not.toBe(sourceSha256('changed guide'))
  })
})
