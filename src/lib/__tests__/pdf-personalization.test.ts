import { existsSync, readFileSync } from 'fs'
import { join, resolve } from 'path'
import { PDFDocument, StandardFonts } from 'pdf-lib'
import { describe, expect, it } from 'vitest'
import { allProductFiles } from '@/lib/products'
import { personalizeProductPdf } from '@/lib/pdf-personalization'

const SOURCE_DIR = resolve(__dirname, '../../../products')

async function samplePdf(): Promise<Uint8Array> {
  const pdf = await PDFDocument.create()
  const page = pdf.addPage([612, 792])
  const font = await pdf.embedFont(StandardFonts.Helvetica)
  page.drawText('TN Visa Guide test document', { x: 72, y: 720, size: 14, font })
  return pdf.save()
}

describe('product PDF protection and source quality', () => {
  it('creates a valid personalized purchaser copy with TN Visa Guide metadata', async () => {
    const bytes = await personalizeProductPdf(await samplePdf(), {
      purchaserEmail: 'buyer@example.test',
      purchaseId: 'ea67e39d-a2ef-4fb4-b4e5-2a53b5e8a009',
      productName: 'Test Product',
    })

    const result = await PDFDocument.load(bytes, { updateMetadata: false })
    expect(result.getPageCount()).toBe(1)
    expect(result.getTitle()).toBe('Test Product')
    expect(result.getAuthor()).toBe('TN Visa Guide')
    expect(result.getSubject()).toBe('Licensed purchaser copy')
  })

  it('keeps every paid-product source present and free of superseded fee and operational claims', () => {
    const disallowed = [
      /\$56 fee/i,
      /\$6 I-94/i,
      /\$460–\$1,015/i,
      /76-day DHS shutdown/i,
      /Billy Bishop Toronto \(new pre-clearance/i,
      /wet signature required/i,
      /Vetting Center/i,
      /42\.63%/i,
    ]

    for (const file of allProductFiles()) {
      for (const source of file.sources) {
        const sourcePath = join(SOURCE_DIR, source)
        expect(existsSync(sourcePath), `missing ${source}`).toBe(true)
        const text = readFileSync(sourcePath, 'utf8')
        for (const pattern of disallowed) {
          expect(text, `${source} contains superseded claim ${pattern}`).not.toMatch(pattern)
        }
      }
    }
  })
})
