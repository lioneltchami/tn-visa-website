import type { Metadata } from 'next'
import { withCanonical } from '@/lib/seo'
import Link from 'next/link'
import ContentLayout from '@/components/layout/ContentLayout'
import { ComparisonTable } from '@/components/ui/ComparisonTable'
import { Callout } from '@/components/ui/Callout'

export const metadata: Metadata = withCanonical('/compare/tn-vs-e2', {
  title: 'TN Visa vs E-2 Visa Comparison',
  description: 'Compare TN and E-2 visas for Canadian professionals and treaty investors.',
})

export default function TNvsE2Page() {
  return (
    <ContentLayout title="TN Visa vs E-2 Visa" description="For Canadian professionals considering business ownership in the US." breadcrumbs={[{ label: 'Compare', href: '/compare' }, { label: 'TN vs E-2', href: '/compare/tn-vs-e2' }]} lastUpdated="April 2026">
      <ComparisonTable headers={['', 'TN Visa', 'E-2 Visa']} rows={[
        { label: 'Eligibility', values: ['63 USMCA professions', 'Treaty country investors'] },
        { label: 'Requirement', values: ['Degree + employer letter', 'Substantial investment in US business'] },
        { label: 'Cap', values: ['No cap', 'No cap'] },
        { label: 'Processing', values: ['Same day at border', '2-4 months (consular)'] },
        { label: 'Duration', values: ['3 years renewable', '2-5 years renewable'] },
        { label: 'Dual Intent', values: ['No', 'No (but renewable indefinitely)'] },
        { label: 'Self-Employment', values: ['No', 'Yes (you own the business)'] },
        { label: 'Investment', values: ['None', 'Typically $100K+ (no fixed minimum)'] },
      ]} />
      <Callout type="tip" title="When to Consider E-2">E-2 is the go-to visa for Canadian entrepreneurs who want to run their own business in the US.</Callout>
      <div className="mt-8"><Link href="/compare" className="text-accent hover:underline">&larr; All comparisons</Link></div>
    </ContentLayout>
  )
}
