import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import type { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import ContentLayout from '@/components/layout/ContentLayout'
import ProductCards from '@/components/tools/ProductCards'
import { Callout } from '@/components/ui/Callout'
import { productsCatalogSchema } from '@/lib/product-schema'
import { withCanonical } from '@/lib/seo'

export const metadata: Metadata = withCanonical('/products', {
  title: 'TN Visa Guides & Templates',
  description:
    'Ready-to-use TN visa preparation materials: border interview kit, employer letter templates, and complete application guide.',
})

const previews = [
  {
    title: 'Border Interview Kit',
    file: 'interview-kit-part1.md',
    start: '1. **The complete border process**',
    end: 'Read this guide at least',
  },
  {
    title: 'Letter Template Pack',
    file: 'letter-templates.md',
    start: '### What to Customise',
    end: '### What NOT to Change',
  },
  {
    title: 'Complete Application Guide',
    file: 'complete-guide.md',
    start: 'This guide is organized into five parts',
    end: 'Each section is designed',
  },
]

function previewExcerpt(file: string, start: string, end: string) {
  const source = readFileSync(join(process.cwd(), 'products', file), 'utf8')
  const excerpt = source.slice(source.indexOf(start), source.indexOf(end))

  return excerpt
    .replace(/^###?\s+/gm, '')
    .replace(/[>*`]/g, '')
    .replace(/\*\*/g, '')
    .replace(/\n+/g, ' ')
    .trim()
}

export default function ProductsPage() {
  return (
    <ContentLayout
      title="Spend Less Time Organizing. Arrive Prepared."
      description="Ready-to-use TN visa templates, interview practice, and application checklists — delivered instantly."
      breadcrumbs={[{ label: 'Products', href: '/products' }]}
      lastUpdated="August 2026"
    >
      <JsonLd data={productsCatalogSchema()} />

      <p className="max-w-3xl text-base leading-relaxed text-fg-secondary">
        Choose only what you need. Every kit turns scattered requirements into a practical
        preparation workflow you can review, customize, and take with you.
      </p>

      <ProductCards />

      <section className="mt-14 border-t border-border pt-8" aria-labelledby="products-who-for">
        <h2 id="products-who-for" className="font-display text-2xl font-bold text-fg">
          Who these guides are for
        </h2>
        <div className="mt-5 grid gap-6 sm:grid-cols-2">
          <div>
            <h3 className="font-semibold text-fg">A good fit if you want to</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-fg-secondary">
              <li>work from a clear document, interview, or employer-letter checklist</li>
              <li>adapt a starting template to accurate facts from your employer and credentials</li>
              <li>practice before a border or preclearance interview</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-fg">Not a fit if you need</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-fg-secondary">
              <li>case-specific legal advice, representation, or a prediction of approval</li>
              <li>a substitute for checking current government requirements or port procedures</li>
              <li>templates that can be used unchanged regardless of your actual role or qualifications</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-14 border-t border-border pt-8" aria-labelledby="product-previews">
        <h2 id="product-previews" className="font-display text-2xl font-bold text-fg">
          Sample pages from the guides
        </h2>
        <p className="mt-2 text-sm text-fg-secondary">
          Short excerpts from the current product source files, shown so you can assess the format before purchase.
        </p>
        <div className="mt-5 divide-y divide-border border-y border-border">
          {previews.map((preview) => (
            <article key={preview.file} className="py-5">
              <h3 className="font-semibold text-fg">{preview.title}</h3>
              <blockquote className="mt-2 max-w-3xl border-l-2 border-accent pl-4 text-sm leading-relaxed text-fg-secondary">
                {previewExcerpt(preview.file, preview.start, preview.end)}
              </blockquote>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-14 border-t border-border pt-8" aria-labelledby="products-faq">
        <h2 id="products-faq" className="font-display text-2xl font-bold text-fg">
          Product questions
        </h2>
        <div className="mt-5 divide-y divide-border border-y border-border">
          <details className="group py-4">
            <summary className="cursor-pointer font-semibold text-fg">What if I need help with a refund or download?</summary>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-fg-secondary">
              Email hello@tnvisaguide.ca with the purchase reference from your receipt so the team can help with access or review the request.
            </p>
          </details>
          <details className="group py-4">
            <summary className="cursor-pointer font-semibold text-fg">Are the guides updated?</summary>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-fg-secondary">
              Each guide identifies its edition and source-check date. Requirements and port practices can change, so confirm the current official guidance before applying or travelling.
            </p>
          </details>
          <details className="group py-4">
            <summary className="cursor-pointer font-semibold text-fg">Is this legal advice?</summary>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-fg-secondary">
              No. The guides are educational preparation materials, not legal advice or a guarantee of approval. Consult a qualified immigration attorney for advice about your specific situation.
            </p>
          </details>
        </div>
      </section>

      <Callout type="info" title="100% Digital Delivery">
        All products are delivered as downloadable PDF files after purchase. No physical shipping.
      </Callout>

      <Callout type="tip" title="Licensed purchaser copy">
        Each download is personalized with the purchaser’s checkout email and a purchase reference
        for licence verification and to deter unauthorized sharing. The guides are proprietary to TN
        Visa Guide and are licensed for the purchaser’s personal use only; they may not be posted,
        redistributed, resold, or shared without written permission.
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
