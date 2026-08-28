import { PDFDocument, StandardFonts, degrees, rgb } from 'pdf-lib'

const FOOTER_MARGIN = 36
const PERSONALIZATION_Y = 34
const FOOTER_SIZE = 7
const WATERMARK_SIZE = 26

function safePdfText(value: string, fallback: string, maxLength: number): string {
  const normalized = value.replace(/[\r\n\t]+/g, ' ').replace(/\s+/g, ' ').trim()
  return (normalized || fallback).slice(0, maxLength)
}

/**
 * Produces a buyer-specific copy at the moment of an authorized download.
 * This is a redistribution deterrent and proof of licence, not DRM: a recipient
 * can still copy a PDF they receive. Customer-facing copy must say this plainly.
 */
export async function personalizeProductPdf(
  source: Uint8Array,
  input: { purchaserEmail: string | null; purchaseId: string; productName: string },
): Promise<Uint8Array> {
  const pdf = await PDFDocument.load(source, { updateMetadata: false })
  const bodyFont = await pdf.embedFont(StandardFonts.Helvetica)
  const boldFont = await pdf.embedFont(StandardFonts.HelveticaBold)
  const purchaser = safePdfText(input.purchaserEmail ?? '', 'Verified purchaser', 96)
  const purchaseCode = safePdfText(input.purchaseId.replace(/-/g, '').slice(0, 12), 'N/A', 12)
  const pages = pdf.getPages()
  for (let index = 0; index < pages.length; index += 1) {
    const page = pages[index]
    const { width, height } = page.getSize()
    const footer = `Licensed to ${purchaser} · Purchase ${purchaseCode}`

    page.drawText(footer, {
      x: FOOTER_MARGIN,
      y: PERSONALIZATION_Y,
      size: FOOTER_SIZE,
      font: bodyFont,
      color: rgb(0.45, 0.06, 0.1),
      opacity: 0.86,
    })

    if (index > 0) {
      page.drawText('TN VISA GUIDE · LICENSED PERSONAL COPY', {
        x: width * 0.12,
        y: height * 0.4,
        size: WATERMARK_SIZE,
        font: boldFont,
        color: rgb(0.75, 0.08, 0.12),
        rotate: degrees(42),
        opacity: 0.07,
      })
    }
  }

  pdf.setTitle(input.productName)
  pdf.setAuthor('TN Visa Guide')
  pdf.setCreator('TN Visa Guide')
  pdf.setProducer('TN Visa Guide licensed PDF delivery')
  pdf.setSubject('Licensed purchaser copy')
  pdf.setKeywords(['TN Visa Guide', 'Licensed copy', 'Personal use only'])
  pdf.setModificationDate(new Date())

  return pdf.save()
}
