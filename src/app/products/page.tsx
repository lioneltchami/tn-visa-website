import type { Metadata } from 'next'
import Image from 'next/image'
import ContentLayout from '@/components/layout/ContentLayout'
import ProductCards from '@/components/tools/ProductCards'
import { Callout } from '@/components/ui/Callout'

export const metadata: Metadata = {
  title: 'TN Visa Guides & Templates',
  description:
    'Ready-to-use TN visa preparation materials: border interview kit, employer letter templates, and complete application guide.',
}

export default function ProductsPage() {
  return (
    <ContentLayout
      title="Spend Less Time Organizing. Arrive Prepared."
      description="Ready-to-use TN visa templates, interview practice, and application checklists — delivered instantly."
      breadcrumbs={[{ label: 'Products', href: '/products' }]}
      lastUpdated="April 2026"
    >
      <div className="rounded-xl overflow-hidden mb-8 -mt-2">
        <Image
          src="https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=1200&h=400&fit=crop"
          alt="Professional guides and templates"
          width={1200}
          height={400}
          className="w-full h-48 sm:h-64 object-cover"
        />
      </div>

      <p className="mx-auto max-w-3xl text-center text-base leading-relaxed text-fg-secondary">
        Choose only what you need. Every kit turns scattered requirements into a practical
        preparation workflow you can review, customize, and take with you.
      </p>

      <ProductCards />

      <Callout type="info" title="100% Digital Delivery">
        All products are delivered instantly as downloadable PDF files after purchase. No physical
        shipping.
      </Callout>

      <Callout type="tip" title="Not ready to buy? Start free.">
        Use our free{' '}
        <a href="/eligibility" className="text-accent hover:underline">
          eligibility checker
        </a>
        ,{' '}
        <a href="/fees" className="text-accent hover:underline">
          fee calculator
        </a>
        , and{' '}
        <a href="/letter-builder" className="text-accent hover:underline">
          letter builder
        </a>
        . The paid kits are for applicants who want the preparation work already organized.
      </Callout>
    </ContentLayout>
  )
}
