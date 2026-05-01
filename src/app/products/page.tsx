import type { Metadata } from 'next'
import Image from 'next/image'
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
      <div className="rounded-xl overflow-hidden mb-8 -mt-2">
        <Image src="https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=1200&h=400&fit=crop" alt="Professional guides and templates" width={1200} height={400} className="w-full h-48 sm:h-64 object-cover" />
      </div>

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
