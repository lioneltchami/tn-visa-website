import { Resend } from 'resend'
import { createDownloadToken } from '@/lib/download-token'
import type { Product } from '@/lib/products'
import { siteUrl } from '@/lib/site'

const FROM_ADDRESS = 'TN Visa Guide <hello@tnvisaguide.ca>'
const SUPPORT_EMAIL = 'hello@tnvisaguide.ca'

export function buildDownloadPageUrl(token: string, base = siteUrl()): string {
  return `${base}/products/download?token=${encodeURIComponent(token)}`
}

export function buildFileUrl(token: string, filePath: string, base = ''): string {
  const params = new URLSearchParams({ token, file: filePath })
  return `${base}/api/products/download?${params.toString()}`
}

/**
 * Send the purchase receipt containing the signed download link.
 * Throws on delivery failure so callers can retry (Stripe replays webhooks).
 */
export async function sendPurchaseEmail(input: {
  email: string
  product: Product
  purchaseId: string
}): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) throw new Error('RESEND_API_KEY is not configured')

  const token = createDownloadToken(input.purchaseId)
  const downloadUrl = buildDownloadPageUrl(token)

  const fileList = input.product.files
    .map((file) => `<li style="margin-bottom:6px;">${file.label} &mdash; PDF</li>`)
    .join('')

  const { error } = await new Resend(apiKey).emails.send({
    from: FROM_ADDRESS,
    to: input.email,
    subject: `Your ${input.product.name} — download inside`,
    html: `
      <div style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;max-width:560px;">
        <h2 style="margin-bottom:8px;">Thank you for your purchase!</h2>
        <p style="margin-top:0;">Your <strong>${input.product.name}</strong> is ready to download.</p>
        <p style="margin:24px 0;">
          <a href="${downloadUrl}"
             style="background:#6366f1;color:#ffffff;text-decoration:none;padding:12px 20px;border-radius:999px;font-weight:600;display:inline-block;">
            Download your files
          </a>
        </p>
        <p style="margin-bottom:6px;"><strong>What's included:</strong></p>
        <ul style="margin-top:0;padding-left:20px;">${fileList}</ul>
        <p style="color:#666;font-size:13px;">
          Keep this email — the link stays valid for one year and works on any device.
          If the button doesn't work, paste this into your browser:<br />
          <span style="word-break:break-all;">${downloadUrl}</span>
        </p>
        <p style="color:#666;font-size:13px;">
          Questions or trouble downloading? Reply to this email or contact ${SUPPORT_EMAIL}.
        </p>
        <p style="color:#666;font-size:13px;">— The TN Visa Guide Team</p>
      </div>
    `,
  })

  if (error) throw new Error(`Resend failed: ${error.message}`)
}
