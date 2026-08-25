import { createClient } from '@supabase/supabase-js'
import OpenAI from 'openai'
import { existsSync, readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'
import {
  buildContentChunks,
  parseIngestArgs,
  sourceSha256,
  type ContentChunk,
} from '../src/lib/embedding-ingest'

const MODEL = 'text-embedding-3-small'
const BATCH_SIZE = 20

type IngestReport = {
  versionId?: string
  status: 'failed' | 'ready' | 'active'
  guidePath: string
  sourceSha256: string
  expectedChunks: number
  insertedChunks: number
  model: string
  startedAt: string
  completedAt: string
  error?: string
}

function requiredEnv(name: string): string {
  const value = process.env[name]
  if (!value) throw new Error(`${name} is required`)
  return value
}

function reportPath(): string {
  return process.env.INGEST_REPORT_PATH || resolve(process.cwd(), 'embedding-ingest-report.json')
}

function writeReport(report: IngestReport): void {
  writeFileSync(reportPath(), `${JSON.stringify(report, null, 2)}\n`)
}

async function markFailed(
  supabase: ReturnType<typeof createClient>,
  versionId: string | undefined,
  error: unknown
): Promise<void> {
  if (!versionId) return
  const reason = error instanceof Error ? error.message : String(error)
  const { error: updateError } = await supabase
    .from('content_embedding_versions')
    .update({ status: 'failed', failure_reason: reason, completed_at: new Date().toISOString() })
    .eq('id', versionId)
  if (updateError) console.error('Unable to record failed embedding version:', updateError.message)
}

async function insertBatch(
  supabase: ReturnType<typeof createClient>,
  openai: OpenAI,
  versionId: string,
  batch: ContentChunk[]
): Promise<void> {
  const embeddings = await openai.embeddings.create({
    model: MODEL,
    input: batch.map((chunk) => chunk.content),
  })

  if (embeddings.data.length !== batch.length) {
    throw new Error(`Embedding API returned ${embeddings.data.length} vectors for ${batch.length} chunks`)
  }

  const { error } = await supabase.from('content_embeddings').insert(
    batch.map((chunk, index) => ({
      content: chunk.content,
      embedding: JSON.stringify(embeddings.data[index].embedding),
      metadata: chunk.metadata,
      version_id: versionId,
    }))
  )
  if (error) throw new Error(`Embedding insert failed: ${error.message}`)
}

async function activateReadyVersion(
  supabase: ReturnType<typeof createClient>,
  targetVersionId: string
): Promise<void> {
  const startedAt = new Date().toISOString()
  const { data: version, error: versionError } = await supabase
    .from('content_embedding_versions')
    .select('id, source_path, source_sha256, chunk_count, model')
    .eq('id', targetVersionId)
    .single()
  if (versionError || !version) {
    throw new Error(`Unable to load embedding version: ${versionError?.message || targetVersionId}`)
  }

  const { error: activateError } = await supabase.rpc('activate_content_embedding_version', {
    target_version_id: targetVersionId,
  })
  if (activateError) throw new Error(`Unable to activate embedding version: ${activateError.message}`)

  writeReport({
    versionId: targetVersionId,
    status: 'active',
    guidePath: version.source_path,
    sourceSha256: version.source_sha256,
    expectedChunks: version.chunk_count,
    insertedChunks: version.chunk_count,
    model: version.model,
    startedAt,
    completedAt: new Date().toISOString(),
  })
  console.log(`Activated embedding version ${targetVersionId}.`)
}

async function buildReadyVersion(supabase: ReturnType<typeof createClient>, guidePath: string): Promise<void> {
  const startedAt = new Date().toISOString()
  if (!existsSync(guidePath)) throw new Error(`Guide file does not exist: ${guidePath}`)
  const content = readFileSync(guidePath, 'utf-8')
  if (!content.trim()) throw new Error(`Guide file is empty: ${guidePath}`)

  const chunks = buildContentChunks(content)
  const sourceHash = sourceSha256(content)
  const openai = new OpenAI({ apiKey: requiredEnv('OPENAI_API_KEY') })
  let versionId: string | undefined
  let insertedChunks = 0

  try {
    const { data: version, error: versionError } = await supabase
      .from('content_embedding_versions')
      .insert({
        source_sha256: sourceHash,
        source_path: guidePath,
        model: MODEL,
        chunk_count: chunks.length,
        status: 'building',
      })
      .select('id')
      .single()
    if (versionError || !version) {
      throw new Error(`Unable to create embedding version: ${versionError?.message || 'no version returned'}`)
    }
    versionId = version.id

    console.log(`Building embedding version ${versionId} from ${chunks.length} chunks...`)
    for (let index = 0; index < chunks.length; index += BATCH_SIZE) {
      const batch = chunks.slice(index, index + BATCH_SIZE)
      await insertBatch(supabase, openai, versionId, batch)
      insertedChunks += batch.length
      console.log(`Inserted batch ${Math.floor(index / BATCH_SIZE) + 1}/${Math.ceil(chunks.length / BATCH_SIZE)}`)
    }

    const { count, error: countError } = await supabase
      .from('content_embeddings')
      .select('*', { count: 'exact', head: true })
      .eq('version_id', versionId)
    if (countError) throw new Error(`Unable to verify inserted chunks: ${countError.message}`)
    if (count !== chunks.length) {
      throw new Error(`Embedding version expected ${chunks.length} rows but has ${count ?? 0}`)
    }

    const { error: readyError } = await supabase
      .from('content_embedding_versions')
      .update({ status: 'ready', completed_at: new Date().toISOString(), failure_reason: null })
      .eq('id', versionId)
    if (readyError) throw new Error(`Unable to mark embedding version ready: ${readyError.message}`)

    writeReport({
      versionId,
      status: 'ready',
      guidePath,
      sourceSha256: sourceHash,
      expectedChunks: chunks.length,
      insertedChunks,
      model: MODEL,
      startedAt,
      completedAt: new Date().toISOString(),
    })
    console.log(`Built ready embedding version ${versionId}.`)
  } catch (error) {
    await markFailed(supabase, versionId, error)
    writeReport({
      versionId,
      status: 'failed',
      guidePath,
      sourceSha256: sourceHash,
      expectedChunks: chunks.length,
      insertedChunks,
      model: MODEL,
      startedAt,
      completedAt: new Date().toISOString(),
      error: error instanceof Error ? error.message : String(error),
    })
    throw error
  }
}

async function main(): Promise<void> {
  const args = parseIngestArgs(process.argv.slice(2))
  const supabase = createClient(
    requiredEnv('NEXT_PUBLIC_SUPABASE_URL'),
    requiredEnv('SUPABASE_SERVICE_ROLE_KEY'),
    { auth: { autoRefreshToken: false, persistSession: false } }
  )

  if (args.activateVersion) {
    await activateReadyVersion(supabase, args.activateVersion)
    return
  }

  const guidePath = args.guidePath
    ? resolve(args.guidePath)
    : resolve(__dirname, '../../tn-visa-guide/TN-VISA-COMPLETE-GUIDE.md')
  await buildReadyVersion(supabase, guidePath)
}

main().catch((error) => {
  console.error('Embedding ingestion failed:', error instanceof Error ? error.message : error)
  process.exit(1)
})
