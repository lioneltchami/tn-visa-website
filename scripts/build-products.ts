/**
 * Build branded paid PDFs from the Markdown in `products/`.
 *
 * This command is review-first: it creates verified PDFs but does not upload
 * them unless the protected workflow calls `--upload-existing` for an already
 * reviewed artifact.
 *
 *   npm run build:products
 *   npm run build:products -- --skip-upload
 *   npm run build:products -- --only=interview-kit
 *   npm run build:products -- --upload-existing
 *
 * Requires Pandoc, Poppler utilities, and a Chromium-based browser. Buyer-specific
 * watermarking is applied only by the authenticated download route, never to the
 * private master artifact held in storage.
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
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import { join, resolve } from 'path'
import { pathToFileURL } from 'url'
import { ALL_PRODUCTS, allProductFiles, type ProductFile } from '../src/lib/products'

const ROOT = resolve(__dirname, '..')
const SOURCE_DIR = join(ROOT, 'products')
const BUILD_DIR = join(ROOT, '.products-build')
const BRAND_ICON_PATH = join(ROOT, 'public', 'icon.svg')
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

type Args = { only?: string; uploadExisting: boolean }
type Heading = { level: number; text: string }

function parseArgs(argv: string[]): Args {
  const only = argv.find((arg) => arg.startsWith('--only='))?.split('=')[1]
  const upload = argv.includes('--upload')
  const skipUpload = argv.includes('--skip-upload')
  const uploadExisting = argv.includes('--upload-existing')

  if (upload) {
    throw new Error('Direct upload is disabled. Use the protected Build product PDFs workflow after artifact review.')
  }
  if (skipUpload && uploadExisting) {
    throw new Error('Use either --skip-upload or --upload-existing, not both')
  }

  return { only, uploadExisting }
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
  @page { size: Letter; margin: 18mm 16mm 24mm; }
  * { box-sizing: border-box; }
  html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 10.5pt;
    line-height: 1.55;
    color: #17171d;
    margin: 0;
  }
  .cover {
    min-height: 8.15in;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 6mm 18mm;
    page-break-after: always;
  }
  .brand-lockup { display: flex; align-items: center; gap: 4mm; margin-bottom: 16mm; }
  .brand-lockup img { width: 13mm; height: 13mm; object-fit: contain; }
  .brand-wordmark { margin: 0; color: #b91c1c; font-size: 11pt; font-weight: 750; letter-spacing: .14em; text-transform: uppercase; }
  .cover .eyebrow { font-size: 9pt; font-weight: 700; letter-spacing: .16em; text-transform: uppercase; color: #6b7280; margin: 0 0 4mm; }
  .cover h1 { font-size: 30pt; line-height: 1.12; letter-spacing: -.025em; margin: 0 0 6mm; page-break-before: avoid; }
  .cover .subtitle { font-size: 13pt; color: #44444f; margin: 0 0 15mm; max-width: 130mm; }
  .cover .meta { font-size: 9.5pt; color: #4b5563; border-top: 2px solid #b91c1c; padding-top: 5mm; max-width: 140mm; }
  .cover .meta p { margin: 0 0 2.5mm; }
  .cover .meta strong { color: #17171d; }
  .contents { page-break-after: always; padding-top: 5mm; }
  .contents h2 { margin-top: 0; }
  .contents p { color: #4b5563; }
  .contents ol { columns: 2; column-gap: 12mm; padding-left: 6mm; }
  .contents li { break-inside: avoid; margin: 0 0 2.25mm; }
  .contents .level-1 { font-weight: 700; color: #17171d; margin-top: 2mm; }
  h1, h2, h3, h4 { color: #14141a; line-height: 1.25; }
  h1 { font-size: 20pt; margin: 0 0 6mm; page-break-before: always; page-break-after: avoid; }
  h2 { font-size: 15pt; margin: 9mm 0 3mm; page-break-after: avoid; }
  h3 { font-size: 12pt; margin: 7mm 0 2mm; page-break-after: avoid; }
  h4 { font-size: 10.75pt; margin: 6mm 0 2mm; page-break-after: avoid; }
  p, li { orphans: 3; widows: 3; }
  ul, ol { padding-left: 6mm; }
  a { color: #9f1239; text-decoration: underline; text-decoration-thickness: .4pt; word-break: break-word; }
  blockquote { margin: 4mm 0; padding: 3mm 5mm; border-left: 3px solid #b91c1c; background: #fdf2f2; color: #30303a; }
  code { font-family: "SF Mono", Menlo, Consolas, monospace; font-size: 9.5pt; background: #f2f2f7; padding: 0 2px; }
  pre { background: #f6f6fa; padding: 4mm; overflow-wrap: break-word; white-space: pre-wrap; page-break-inside: avoid; }
  table { width: 100%; border-collapse: collapse; margin: 4mm 0; font-size: 9.25pt; page-break-inside: avoid; }
  th, td { border: 1px solid #dcdce4; padding: 2mm 3mm; text-align: left; vertical-align: top; }
  th { background: #fdf2f2; color: #7f1d1d; }
  hr { border: 0; border-top: 1px solid #e2e2ea; margin: 8mm 0; }
  .document-part + .document-part { page-break-before: always; }
  .document-part > :first-child { page-break-before: avoid; }
`

function escapeMoneyDelimiters(markdown: string): string {
  // Product source uses dollar signs as currency, not Markdown math delimiters.
  return markdown.replace(/\$/g, '\\$')
}

function linkifyBareUrls(markdown: string): string {
  // The source intentionally keeps resource tables readable. Convert ordinary
  // bare domains to Markdown links while preserving lines with authored links.
  const bareUrl = /(?<![\w@/\[])(?:(?:[a-z0-9-]+\.)+(?:gov|org|com|ca|edu)(?:\/[A-Za-z0-9._~:/?#[\]@!$&'()*+,;=%-]*)?)/gi
  return markdown
    .split('\n')
    .map((line) => (line.includes('](') ? line : line.replace(bareUrl, (url) => `[${url}](https://${url})`)))
    .join('\n')
}

function extractHeadings(markdown: string): Heading[] {
  return markdown
    .split('\n')
    .map((line) => line.match(/^(#{1,2})\s+(.+?)\s*#*\s*$/))
    .filter((match): match is RegExpMatchArray => Boolean(match))
    .map((match) => ({
      level: match[1].length,
      text: match[2].replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').trim(),
    }))
    .filter((heading) => heading.text.length > 0)
}

function contentsHtml(headings: Heading[]): string {
  const list = headings
    .slice(0, 36)
    .map((heading) => `<li class="level-${heading.level}">${heading.text}</li>`)
    .join('\n')

  return `
  <section class="contents">
    <p class="eyebrow">Navigation</p>
    <h2>Contents</h2>
    <p>Use this overview together with the PDF reader’s bookmark panel. The bookmarked headings provide direct in-document navigation.</p>
    <ol>${list}</ol>
  </section>`
}

function coverHtml(file: ProductFile, edition: string): string {
  const icon = pathToFileURL(BRAND_ICON_PATH).href
  return `
  <section class="cover">
    <div class="brand-lockup">
      <img src="${icon}" alt="TN Visa Guide maple leaf mark" />
      <p class="brand-wordmark">TN Visa Guide</p>
    </div>
    <p class="eyebrow">Licensed digital edition</p>
    <h1>${file.label}</h1>
    <p class="subtitle">Practical TN preparation materials for Canadian professionals using the USMCA framework.</p>
    <div class="meta">
      <p><strong>Edition:</strong> ${edition}</p>
      <p><strong>Personal-use licence.</strong> This work is proprietary to TN Visa Guide and licensed only to the purchaser. Do not reproduce, redistribute, resell, post, or share it without prior written permission.</p>
      <p>Each delivered buyer copy is visibly personalised for licence verification. Personalisation deters unauthorised sharing; it does not replace lawful handling of the purchaser’s own copy.</p>
      <p>Updates, free tools, and support: <a href="https://tnvisaguide.ca">tnvisaguide.ca</a> · <a href="mailto:hello@tnvisaguide.ca">hello@tnvisaguide.ca</a></p>
      <p>General information only — not legal advice. Confirm current requirements with official government sources and consult a qualified immigration lawyer for your case.</p>
    </div>
  </section>`
}

function markdownToHtml(markdown: string): string {
  return execFileSync('pandoc', ['-f', 'gfm+autolink_bare_uris', '-t', 'html5'], {
    input: linkifyBareUrls(escapeMoneyDelimiters(markdown)),
    encoding: 'utf8',
    maxBuffer: 32 * 1024 * 1024,
  })
}

function buildHtml(file: ProductFile, edition: string): string {
  const sourceMarkdown = file.sources.map((source) => {
    const sourcePath = join(SOURCE_DIR, source)
    if (!existsSync(sourcePath)) throw new Error(`Missing product source: ${sourcePath}`)
    return readFileSync(sourcePath, 'utf8')
  })
  const headings = sourceMarkdown.flatMap(extractHeadings)
  const parts = sourceMarkdown
    .map((markdown) => `<section class="document-part">${markdownToHtml(markdown)}</section>`)
    .join('\n')

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="author" content="TN Visa Guide" />
<meta name="description" content="Licensed TN Visa Guide digital publication" />
<title>${file.label} | TN Visa Guide</title>
<style>${PRINT_CSS}</style>
</head>
<body>
${coverHtml(file, edition)}
${contentsHtml(headings)}
<main>${parts}</main>
</body>
</html>`
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Chrome’s command-line renderer gives consistent local and CI output. The
 * experimental outline and structure flags provide reader navigation and tagged
 * source structure; Poppler verification checks the produced tagged PDF.
 */
async function renderPdf(chrome: string, htmlPath: string, pdfPath: string): Promise<void> {
  const profileDir = mkdtempSync(join(tmpdir(), 'tn-products-chrome-'))
  const chromeProcess = spawn(
    chrome,
    [
      '--headless=new',
      '--disable-gpu',
      '--no-first-run',
      '--no-default-browser-check',
      '--no-pdf-header-footer',
      '--run-all-compositor-stages-before-draw',
      '--generate-pdf-document-outline',
      '--generate-pdf-document-structure',
      `--user-data-dir=${profileDir}`,
      '--virtual-time-budget=8000',
      `--print-to-pdf=${pdfPath}`,
      pathToFileURL(htmlPath).href,
    ],
    { stdio: 'ignore' },
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
      await sleep(400)
    }
    rmSync(profileDir, { recursive: true, force: true })
  }

  if (!existsSync(pdfPath) || statSync(pdfPath).size < MIN_PDF_BYTES) {
    throw new Error(`Chrome produced no usable PDF at ${pdfPath}`)
  }
}

async function brandMasterPdf(file: ProductFile, pdfPath: string): Promise<void> {
  const pdf = await PDFDocument.load(readFileSync(pdfPath), { updateMetadata: false })
  const font = await pdf.embedFont(StandardFonts.Helvetica)
  const pages = pdf.getPages()
  const pageCount = pages.length

  for (let index = 0; index < pages.length; index += 1) {
    const page = pages[index]
    const { width } = page.getSize()
    const text = 'TN Visa Guide · Licensed personal-use edition · © 2026 TN Visa Guide'
    const label = `Page ${index + 1} of ${pageCount}`
    const labelWidth = font.widthOfTextAtSize(label, 7)

    page.drawLine({
      start: { x: 36, y: 23 },
      end: { x: width - 36, y: 23 },
      thickness: 0.35,
      color: rgb(0.78, 0.8, 0.84),
      opacity: 0.95,
    })
    page.drawText(text, { x: 36, y: 13, size: 7, font, color: rgb(0.28, 0.3, 0.34) })
    page.drawText(label, {
      x: width - 36 - labelWidth,
      y: 13,
      size: 7,
      font,
      color: rgb(0.28, 0.3, 0.34),
    })
  }

  pdf.setTitle(`${file.label} | TN Visa Guide`)
  pdf.setAuthor('TN Visa Guide')
  pdf.setCreator('TN Visa Guide')
  pdf.setProducer('TN Visa Guide production PDF pipeline')
  pdf.setSubject('Licensed TN Visa Guide digital publication')
  pdf.setKeywords(['TN Visa Guide', 'Licensed personal-use edition', 'USMCA TN'])
  pdf.setModificationDate(new Date())
  writeFileSync(pdfPath, await pdf.save())
}

async function verifyPdf(file: ProductFile, pdfPath: string): Promise<void> {
  const bytes = readFileSync(pdfPath)
  if (bytes.length < MIN_PDF_BYTES) throw new Error(`PDF is too small: ${pdfPath}`)

  const pdf = await PDFDocument.load(bytes, { updateMetadata: false })
  const pageCount = pdf.getPageCount()
  if (pageCount < 3) throw new Error(`PDF has too few pages (${pageCount}): ${pdfPath}`)
  if (!pdf.getTitle()?.includes('TN Visa Guide')) {
    throw new Error(`PDF is missing TN Visa Guide title metadata: ${pdfPath}`)
  }

  const pages = pdf.getPages()
  for (let index = 0; index < pages.length; index += 1) {
    const page = pages[index]
    const { width, height } = page.getSize()
    if (width < 500 || height < 700) {
      throw new Error(`PDF page ${index + 1} has an unexpected page size: ${pdfPath}`)
    }
  }

  const info = execFileSync('pdfinfo', [pdfPath], { encoding: 'utf8' })
  if (!/^Tagged:\s+yes$/m.test(info)) {
    throw new Error(`PDF is not tagged for accessibility: ${pdfPath}`)
  }

  const urls = execFileSync('pdfinfo', ['-url', pdfPath], { encoding: 'utf8' })
  const linkCount = urls.split('\n').filter((line) => /\bAnnotation\s+(?:https?:|mailto:)/.test(line)).length
  if (linkCount < 3) {
    throw new Error(`PDF has too few active resource links (${linkCount}): ${pdfPath}`)
  }

  const extractedText = execFileSync('pdftotext', [pdfPath, '-'], { encoding: 'utf8' })
  if (!extractedText.includes('TN Visa Guide') || !extractedText.includes('Licensed personal-use edition')) {
    throw new Error(`PDF is missing required TN Visa Guide licence footer: ${pdfPath}`)
  }

  console.log(`  ✓ verified ${pageCount} pages, tagged structure, ${linkCount} active links, required licence footer, and valid dimensions`)
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
    const { error } = await supabase.storage.createBucket(BUCKET, { public: false })
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

function buildPaths(file: ProductFile): { htmlPath: string; pdfPath: string } {
  const slug = file.path.replace(/[/\\]/g, '_').replace(/\.pdf$/, '')
  return {
    htmlPath: join(BUILD_DIR, `${slug}.html`),
    pdfPath: join(BUILD_DIR, `${slug}.pdf`),
  }
}

async function main(): Promise<void> {
  const args = parseArgs(process.argv.slice(2))
  loadEnvLocal()

  const selected = args.only
    ? ALL_PRODUCTS.filter((product) => product.id === args.only).flatMap((product) => product.files)
    : allProductFiles()
  if (selected.length === 0) throw new Error(`No product files matched --only=${args.only}`)

  const unique = [...new Map(selected.map((file) => [file.path, file])).values()]

  if (args.uploadExisting) {
    const verified = unique.map((file) => ({ file, pdfPath: buildPaths(file).pdfPath }))
    for (const { file, pdfPath } of verified) await verifyPdf(file, pdfPath)
    await upload(verified)
    console.log(`\nUploaded ${verified.length} verified PDF artifact(s).`)
    return
  }

  if (!which('pandoc') || !which('pdfinfo') || !which('pdftotext')) {
    throw new Error('pandoc, pdfinfo, and pdftotext must be installed before building product PDFs.')
  }
  const chrome = findChrome()
  const edition = new Date().toLocaleDateString('en-CA', { year: 'numeric', month: 'long' })
  mkdirSync(BUILD_DIR, { recursive: true })

  for (const file of unique) {
    const { htmlPath, pdfPath } = buildPaths(file)
    console.log(`Building ${file.label} (${file.sources.join(' + ')})`)
    writeFileSync(htmlPath, buildHtml(file, edition), 'utf8')
    await renderPdf(chrome, htmlPath, pdfPath)
    await brandMasterPdf(file, pdfPath)
    await verifyPdf(file, pdfPath)
    console.log(`  → ${pdfPath} (${Math.round(statSync(pdfPath).size / 1024)} KB)`)
  }

  console.log('\nBuilt verified PDF artifacts without publishing. Review them, then use the protected upload workflow.')
}

main().catch((err) => {
  console.error('\nProduct build failed:', err instanceof Error ? err.message : err)
  process.exit(1)
})
