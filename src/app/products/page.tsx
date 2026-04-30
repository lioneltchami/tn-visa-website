import type { Metadata } from 'next'
import ContentLayout from '@/components/layout/ContentLayout'
import { Callout } from '@/components/ui/Callout'
import ProductCards from '@/components/tools/ProductCards'

export const metadata: Metadata = {
  title: 'TN Visa Guides & Templates',
  description: 'Professional TN visa preparation materials: border interview kit, employer letter templates, and complete application guide.',
}

export default function ProductsPage() {
  return (
    <ContentLayout
      title="TN Visa Guides & Templates"
      description="Professional preparation materials to maximize your chances of TN visa approval."
      breadcrumbs={[{ label: 'Products', href: '/products' }]}
      lastUpdated="April 2026"
    >
      <ProductCards />

      <Callout type="info" title="100% Digital Delivery">
        All products are delivered instantly as downloadable PDF files after purchase. No physical shipping.
      </Callout>

      <Callout type="tip" title="Free Resources">
        All core TN visa information on this site is free. These products save you time by organizing everything into ready-to-use formats. Check our free <a href="/eligibility" className="text-accent hover:underline">eligibility checker</a>, <a href="/fees" className="text-accent hover:underline">fee calculator</a>, and <a href="/letter-builder" className="text-accent hover:underline">letter builder</a>.
      </Callout>
    </ContentLayout>
  )
}
