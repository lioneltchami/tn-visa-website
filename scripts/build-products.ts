/**
 * Build the paid PDFs from the markdown in `products/` and upload them to the
 * private `product-files` Supabase Storage bucket that the download routes
 * read from.
 *
 *   npm run build:products              # build + upload everything
 *   npm run build:products -- --skip-upload
 *   npm run build:products -- --only=interview-kit
 *
 * Requires: pandoc (brew install pandoc) and Google Chrome for PDF rendering.
 */

import { createClient } from '@supabase/supabase-js'
import { execFileSync, spawn } from 'child_process'
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} from 'fs'
import { tmpdir } from 'os'
import { join, resolve } from 'path'
import { ALL_PRODUCTS, allProductFiles, type ProductFile } from '../src/lib/products'

const ROOT = resolve(__dirname, '..')
const SOURCE_DIR = join(ROOT, 'products')
const BUILD_DIR = join(ROOT, '.products-build')
const BUCKET = 'product-files'
const RENDER_TIMEOUT_MS = 90_000
const POLL_INTERVAL_MS = 750
const MIN_PDF_BYTES = 5_000

const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].filter(Boolean) as string[]

type Args = { only?: string; skipUpload: boolean }

function parseArgs(argv: string[]): Args {
  const only = argv.find((arg) => arg.startsWith('--only='))?.split('=')[1]
  return { only, skipUpload: argv.includes('--skip-upload') }
}

/** Minimal .env.local reader so the script works without dotenv wrappers. */
function loadEnvLocal(): void {
  const envPath = join(ROOT, '.env.local')
  if (!existsSync(envPath)) return

  for (const line of readFileSync(envPath, 'utf8').split('\n')) {
    const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/)
    if (!match) continue
    const [, key, rawValue] = match
    if (process.env[key]) continue
    process.env[key] = rawValue.replace(/^["']|["']$/g, '')
  }
}

function which(command: string): string | null {
  try {
    return execFileSync('which', [command], { encoding: 'utf8' }).trim() || null
  } catch {
    return null
  }
}

function findChrome(): string {
  const found = CHROME_CANDIDATES.find((candidate) => existsSync(candidate))
  if (found) return found
  throw new Error('Chrome not found. Install Google Chrome or set CHROME_PATH.')
}

const PRINT_CSS = `
  @page { size: Letter; margin: 18mm 16mm 20mm; }
  * { box-sizing: border-box; }
  body {
    font-family: -apple-system, "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 10.5pt;
    line-height: 1.55;
    color: #1a1a1f;
    margin: 0;
  }
  .cover { padding-top: 60mm; page-break-after: always; }
  .cover .eyebrow { font-size: 11pt; letter-spacing: .18em; text-transform: uppercase; color: #6366f1; margin-bottom: 14mm; }
  /* Must override the global "new page before every h1" rule below. */
  .cover h1 { font-size: 30pt; line-height: 1.15; margin: 0 0 6mm; page-break-before: avoid; }
  .cover .subtitle { font-size: 13pt; color: #44444f; margin: 0 0 18mm; }
  .cover .meta { font-size: 10pt; color: #6b6b76; border-top: 1px solid #d8d8e0; padding-top: 6mm; }
  .cover .meta strong { color: #1a1a1f; }
  h1, h2, h3, h4 { color: #14141a; line-height: 1.25; }
  h1 { font-size: 20pt; margin: 0 0 6mm; page-break-before: always; page-break-after: avoid; }
  h2 { font-size: 15pt; margin: 9mm 0 3mm; page-break-after: avoid; }
  h3 { font-size: 12pt; margin: 7mm 0 2mm; page-break-after: avoid; }
  p, li { orphans: 3; widows: 3; }
  ul, ol { padding-left: 6mm; }
  a { color: #4f46e5; text-decoration: none; word-break: break-word; }
  blockquote {
    margin: 4mm 0; padding: 3mm 5mm;
    border-left: 3px solid #6366f1; background: #f4f4fb; color: #33333d;
  }
  code { font-family: "SF Mono", Menlo, Consolas, monospace; font-size: 9.5pt; background: #f2f2f7; padding: 0 2px; }
  pre { background: #f6f6fa; padding: 4mm; overflow-wrap: break-word; white-space: pre-wrap; page-break-inside: avoid; }
  table { width: 100%; border-collapse: collapse; margin: 4mm 0; font-size: 9.5pt; page-break-inside: avoid; }
  th, td { border: 1px solid #dcdce4; padding: 2mm 3mm; text-align: left; vertical-align: top; }
  th { background: #f4f4fb; }
  hr { border: 0; border-top: 1px solid #e2e2ea; margin: 8mm 0; }
  /* The cover already ends with a page break — don't add a blank page. */
  main > *:first-child { page-break-before: avoid; }
  .part-break { page-break-before: always; }
`

function coverHtml(file: ProductFile, edition: string): string {
  return `
  <section class="cover">
    <p class="eyebrow">TN Visa Guide</p>
    <h1>${file.label}</h1>
    <p class="subtitle">For Canadian professionals applying for TN status under USMCA.</p>
    <div class="meta">
      <p><strong>Edition:</strong> ${edition}</p>
      <p><strong>Licensed copy.</strong> For personal use by the purchaser. Please do not redistribute.</p>
      <p>Updates, free tools and support: tnvisaguide.ca &middot; hello@tnvisaguide.ca</p>
      <p>General information only &mdash; not legal advice. Consult an immigration lawyer for your specific case.</p>
    </div>
  </section>`
}

function markdownToHtml(markdown: string): string {
  return execFileSync('pandoc', ['-f', 'gfm', '-t', 'html5'], {
    input: markdown,
    encoding: 'utf8',
    maxBuffer: 32 * 1024 * 1024,
  })
}

function buildHtml(file: ProductFile, edition: string): string {
  const parts = file.sources.map((source, index) => {
    const sourcePath = join(SOURCE_DIR, source)
    if (!existsSync(sourcePath)) throw new Error(`Missing product source: ${sourcePath}`)

    const html = markdownToHtml(readFileSync(sourcePath, 'utf8'))
    return index === 0 ? html : `<div class="part-break"></div>${html}`
  })

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>${file.label}</title>
<style>${PRINT_CSS}</style>
</head>
<body>
${coverHtml(file, edition)}
<main>${parts.join('\n')}</main>
</body>
</html>`
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Chrome writes the PDF and then frequently keeps the process alive, so we
 * watch the output file until its size settles and kill the browser ourselves.
 */
async function renderPdf(chrome: string, htmlPath: string, pdfPath: string): Promise<void> {
  const profileDir = mkdtempSync(join(tmpdir(), 'tn-products-chrome-'))
  const chromeProcess = spawn(
    chrome,
    [
      '--headless=new',
      '--disable-gpu',
      '--no-first-run',
      '--no-pdf-header-footer',
      '--run-all-compositor-stages-before-draw',
      `--user-data-dir=${profileDir}`,
      '--virtual-time-budget=8000',
      `--print-to-pdf=${pdfPath}`,
      `file://${htmlPath}`,
    ],
    { stdio: 'ignore' }
  )

  const deadline = Date.now() + RENDER_TIMEOUT_MS
  let previousSize = -1

  try {
    while (Date.now() < deadline) {
      await sleep(POLL_INTERVAL_MS)

      if (existsSync(pdfPath)) {
        const size = statSync(pdfPath).size
        if (size >= MIN_PDF_BYTES && size === previousSize) return
        previousSize = size
      } else if (chromeProcess.exitCode !== null) {
        break
      }
    }
  } finally {
    if (chromeProcess.exitCode === null) {
      chromeProcess.kill('SIGKILL')
      // Give Chrome a beat to release file locks before we wipe the profile.
      await sleep(400)
    }
    try {
      rmSync(profileDir, { recursive: true, force: true })
    } catch {
      // Best-effort cleanup — leftover temp dirs are harmless.
    }
  }

  if (!existsSync(pdfPath) || statSync(pdfPath).size < MIN_PDF_BYTES) {
    throw new Error(`Chrome produced no usable PDF at ${pdfPath}`)
  }
}

async function upload(files: { file: ProductFile; pdfPath: string }[]): Promise<void> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceKey) {
    throw new Error('NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required to upload')
  }

  const supabase = createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })

  const { data: buckets, error: listError } = await supabase.storage.listBuckets()
  if (listError) throw listError

  if (!buckets?.some((bucket) => bucket.name === BUCKET)) {
    const { error } = await supabase.storage.createBucket(BUCKET, {
      public: false,
    })
    if (error) throw error
    console.log(`Created private bucket "${BUCKET}"`)
  }

  for (const { file, pdfPath } of files) {
    const { error } = await supabase.storage.from(BUCKET).upload(file.path, readFileSync(pdfPath), {
      contentType: 'application/pdf',
      upsert: true,
    })

    if (error) throw new Error(`Upload failed for ${file.path}: ${error.message}`)
    console.log(`Uploaded ${file.path}`)
  }
}

async function main(): Promise<void> {
  const args = parseArgs(process.argv.slice(2))
  loadEnvLocal()

  if (!which('pandoc')) throw new Error('pandoc not found. Install it with: brew install pandoc')
  const chrome = findChrome()

  const selected = args.only
    ? ALL_PRODUCTS.filter((product) => product.id === args.only).flatMap((product) => product.files)
    : allProductFiles()

  if (selected.length === 0) throw new Error(`No product files matched --only=${args.only}`)

  const unique = [...new Map(selected.map((file) => [file.path, file])).values()]
  const edition = new Date().toLocaleDateString('en-CA', {
    year: 'numeric',
    month: 'long',
  })

  mkdirSync(BUILD_DIR, { recursive: true })

  const built: { file: ProductFile; pdfPath: string }[] = []

  for (const file of unique) {
    const slug = file.path.replace(/[/\\]/g, '_').replace(/\.pdf$/, '')
    const htmlPath = join(BUILD_DIR, `${slug}.html`)
    const pdfPath = join(BUILD_DIR, `${slug}.pdf`)

    console.log(`Building ${file.label} (${file.sources.join(' + ')})`)
    writeFileSync(htmlPath, buildHtml(file, edition), 'utf8')
    await renderPdf(chrome, htmlPath, pdfPath)

    const sizeKb = Math.round(statSync(pdfPath).size / 1024)
    console.log(`  → ${pdfPath} (${sizeKb} KB)`)
    built.push({ file, pdfPath })
  }

  if (args.skipUpload) {
    console.log('\nSkipped upload (--skip-upload). Review the PDFs, then re-run without the flag.')
    return
  }

  await upload(built)
  console.log(`\nDone. ${built.length} file(s) available to buyers.`)
}

main().catch((err) => {
  console.error('\nProduct build failed:', err instanceof Error ? err.message : err)
  process.exit(1)
})
