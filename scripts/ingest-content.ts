import { createClient } from '@supabase/supabase-js'
import OpenAI from 'openai'
import { readFileSync } from 'fs'
import { resolve } from 'path'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! })

function chunkText(text: string, maxTokens = 500, overlap = 50): string[] {
  const sentences = text.split(/(?<=[.!?])\s+/)
  const chunks: string[] = []
  let current = ''

  for (const sentence of sentences) {
    if ((current + ' ' + sentence).split(/\s+/).length > maxTokens && current) {
      chunks.push(current.trim())
      // Keep overlap
      const words = current.split(/\s+/)
      current = words.slice(-overlap).join(' ') + ' ' + sentence
    } else {
      current += (current ? ' ' : '') + sentence
    }
  }
  if (current.trim()) chunks.push(current.trim())
  return chunks
}

async function main() {
  const guidePath = resolve(__dirname, '../../tn-visa-guide/TN-VISA-COMPLETE-GUIDE.md')
  const content = readFileSync(guidePath, 'utf-8')

  // Split by sections first
  const sections = content.split(/^## /m).filter(Boolean)
  const allChunks: { content: string; metadata: { section: string } }[] = []

  for (const section of sections) {
    const title = section.split('\n')[0].trim()
    const chunks = chunkText(section)
    for (const chunk of chunks) {
      allChunks.push({ content: chunk, metadata: { section: title } })
    }
  }

  console.log(`Processing ${allChunks.length} chunks...`)

  // Clear existing embeddings
  await supabase.from('content_embeddings').delete().neq('id', '00000000-0000-0000-0000-000000000000')

  // Process in batches of 20
  for (let i = 0; i < allChunks.length; i += 20) {
    const batch = allChunks.slice(i, i + 20)
    const embeddings = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: batch.map(c => c.content),
    })

    const rows = batch.map((chunk, j) => ({
      content: chunk.content,
      embedding: JSON.stringify(embeddings.data[j].embedding),
      metadata: chunk.metadata,
    }))

    const { error } = await supabase.from('content_embeddings').insert(rows)
    if (error) console.error('Insert error:', error.message)
    else console.log(`Inserted batch ${Math.floor(i / 20) + 1}/${Math.ceil(allChunks.length / 20)}`)
  }

  console.log('Done!')
}

main().catch(console.error)
