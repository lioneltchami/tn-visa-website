import { execFileSync } from 'child_process'
import { existsSync, readFileSync, statSync } from 'fs'
import { PDFDocument } from 'pdf-lib'
import { join, resolve } from 'path'
import { allProductFiles, type ProductFile } from '../src/lib/products'

const ROOT = resolve(__dirname, '..')
const BUILD_DIR = join(ROOT, '.products-build')
const MIN_PDF_BYTES = 5_000
const MIN_ACTIVE_LINKS = 3

function pdfPath(file: ProductFile): string {
  const slug = file.path.replace(/[/\\]/g, '_').replace(/\.pdf$/, '')
  return join(BUILD_DIR, `${slug}.pdf`)
}

async function verify(file: ProductFile): Promise<void> {
  const path = pdfPath(file)
  if (!existsSync(path)) throw new Error(`Missing product PDF: ${path}`)
  if (statSync(path).size < MIN_PDF_BYTES) throw new Error(`Product PDF is too small: ${path}`)

  const pdf = await PDFDocument.load(readFileSync(path), { updateMetadata: false })
  const title = pdf.getTitle() ?? ''
  if (!title.includes('TN Visa Guide')) throw new Error(`Missing TN Visa Guide title metadata: ${path}`)
  if (pdf.getPageCount() < 3) throw new Error(`Unexpected page count (${pdf.getPageCount()}): ${path}`)

  const info = execFileSync('pdfinfo', [path], { encoding: 'utf8' })
  if (!/^Tagged:\s+yes$/m.test(info)) throw new Error(`PDF is not tagged: ${path}`)

  const urls = execFileSync('pdfinfo', ['-url', path], { encoding: 'utf8' })
  const links = urls.split('\n').filter((line) => /\bAnnotation\s+(?:https?:|mailto:)/.test(line))
  if (links.length < MIN_ACTIVE_LINKS) throw new Error(`Only ${links.length} active PDF links found: ${path}`)

  const text = execFileSync('pdftotext', [path, '-'], { encoding: 'utf8' })
  for (const required of ['TN Visa Guide', 'Contents', 'Licensed personal-use edition', 'Page 1 of']) {
    if (!text.includes(required)) throw new Error(`PDF is missing required release text "${required}": ${path}`)
  }

  console.log(`✓ ${file.label}: ${pdf.getPageCount()} pages, tagged, ${links.length} active links, licensed footer`)
}

async function main(): Promise<void> {
  const files = allProductFiles()
  for (const file of files) await verify(file)
  console.log(`Verified ${files.length} production PDF artifact(s).`)
}

main().catch((error) => {
  console.error('Product PDF verification failed:', error instanceof Error ? error.message : error)
  process.exit(1)
})
