import { Download } from 'lucide-react'
import { buildFileUrl } from '@/lib/fulfillment'
import type { Product } from '@/lib/products'

export default function ProductDownloadList({
  product,
  token,
}: {
  product: Product
  token: string
}) {
  return (
    <div className="space-y-3">
      {product.files.map((file) => (
        <a
          key={file.path}
          href={buildFileUrl(token, file.path)}
          rel="nofollow"
          className="card p-4 flex items-center justify-between gap-4 hover:border-accent transition-colors"
        >
          <span>
            <span className="block font-semibold text-fg">{file.label}</span>
            <span className="text-sm text-fg-muted">{file.filename}</span>
          </span>
          <span className="shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full gradient-bg text-white text-sm font-medium">
            <Download className="w-4 h-4" />
            Download
          </span>
        </a>
      ))}
    </div>
  )
}
