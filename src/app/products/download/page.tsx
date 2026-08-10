import type { Metadata } from 'next'
import { withCanonical } from '@/lib/seo'
import Link from 'next/link'
import ContentLayout from '@/components/layout/ContentLayout'
import ProductDownloadList from '@/components/products/ProductDownloadList'
import { Callout } from '@/components/ui/Callout'
import { verifyDownloadToken } from '@/lib/download-token'
import { getProduct } from '@/lib/products'
import { getPurchaseById } from '@/lib/purchases'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = withCanonical('/products/download', {
  title: 'Your Downloads',
  robots: { index: false, follow: false },
})

export default async function DownloadPage({ searchParams }: { searchParams: { token?: string } }) {
  const payload = verifyDownloadToken(searchParams.token)
  const purchase = payload ? await getPurchaseById(payload.purchaseId).catch(() => null) : null
  const product = purchase ? getProduct(purchase.product_id) : null

  if (!payload || !purchase || !product) {
    return (
      <ContentLayout
        title="Download Link Not Valid"
        description="This link has expired, was mistyped, or belongs to a purchase we cannot find."
        breadcrumbs={[{ label: 'Products', href: '/products' }]}
      >
        <Callout type="warning" title="We can reissue your link">
          Email{' '}
          <a href="mailto:hello@tnvisaguide.ca" className="text-accent hover:underline">
            hello@tnvisaguide.ca
          </a>{' '}
          from the address you used at checkout and we will send a fresh download link.
        </Callout>

        <Link
          href="/products"
          className="inline-block px-5 py-2.5 rounded-full border border-border text-fg-secondary font-medium text-sm hover:bg-bg-secondary"
        >
          Back to Products
        </Link>
      </ContentLayout>
    )
  }

  const remaining = Math.max(purchase.max_downloads - purchase.download_count, 0)

  return (
    <ContentLayout
      title="Your Downloads"
      description={`${product.name} — download any time from this page.`}
      breadcrumbs={[{ label: 'Products', href: '/products' }]}
    >
      <ProductDownloadList product={product} token={searchParams.token as string} />

      <Callout type="info" title="Link details">
        {remaining} of {purchase.max_downloads} downloads remaining. Need more? Email{' '}
        <a href="mailto:hello@tnvisaguide.ca" className="text-accent hover:underline">
          hello@tnvisaguide.ca
        </a>
        .
      </Callout>
    </ContentLayout>
  )
}
