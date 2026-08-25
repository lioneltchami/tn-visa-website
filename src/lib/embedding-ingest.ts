import { createHash } from 'crypto'

export type ContentChunk = {
  content: string
  metadata: { section: string }
}

export type IngestArgs = {
  guidePath?: string
  activateVersion?: string
}

export function parseIngestArgs(argv: string[]): IngestArgs {
  const guidePath = argv.find((arg) => arg.startsWith('--guide-path='))?.split('=')[1]
  const activateVersion = argv.find((arg) => arg.startsWith('--activate-version='))?.split('=')[1]
  return { guidePath, activateVersion }
}

export function chunkText(text: string, maxWords = 500, overlapWords = 50): string[] {
  if (maxWords < 1) throw new Error('maxWords must be positive')
  if (overlapWords < 0 || overlapWords >= maxWords) {
    throw new Error('overlapWords must be non-negative and smaller than maxWords')
  }

  const sentences = text.split(/(?<=[.!?])\s+/)
  const chunks: string[] = []
  let current = ''

  for (const sentence of sentences) {
    if ((current + ' ' + sentence).trim().split(/\s+/).length > maxWords && current) {
      chunks.push(current.trim())
      const words = current.trim().split(/\s+/)
      current = words.slice(-overlapWords).join(' ') + ' ' + sentence
    } else {
      current += (current ? ' ' : '') + sentence
    }
  }

  if (current.trim()) chunks.push(current.trim())
  return chunks
}

export function buildContentChunks(content: string): ContentChunk[] {
  const sections = content.split(/^## /m).filter(Boolean)
  const chunks: ContentChunk[] = []

  for (const section of sections) {
    const title = section.split('\n')[0].trim()
    for (const piece of chunkText(section)) {
      chunks.push({ content: piece, metadata: { section: title } })
    }
  }

  if (chunks.length === 0) throw new Error('Guide content produced no embedding chunks')
  return chunks
}

export function sourceSha256(content: string): string {
  return createHash('sha256').update(content).digest('hex')
}
