import type { Metadata } from 'next'
import { withCanonical } from '@/lib/seo'
import Link from 'next/link'
import ContentLayout from '@/components/layout/ContentLayout'
import { ComparisonTable } from '@/components/ui/ComparisonTable'
import { Callout } from '@/components/ui/Callout'

export const metadata: Metadata = withCanonical('/compare/tn-vs-o1', {
  title: 'TN Visa vs O-1 Visa Comparison',
  description: 'Compare TN and O-1 visas for Canadian professionals with extraordinary ability.',
})

export default function TNvsO1Page() {
  return (
    <ContentLayout title="TN Visa vs O-1 Visa" description="For Canadian professionals with exceptional achievements." breadcrumbs={[{ label: 'Compare', href: '/compare' }, { label: 'TN vs O-1', href: '/compare/tn-vs-o1' }]} lastUpdated="April 2026">
      <ComparisonTable headers={['', 'TN Visa', 'O-1 Visa']} rows={[
        { label: 'Eligibility', values: ['63 USMCA professions', 'Extraordinary ability in any field'] },
        { label: 'Cap', values: ['No cap', 'No cap'] },
        { label: 'Processing', values: ['Same day at border', '2-6 months (15 days premium)'] },
        { label: 'Duration', values: ['3 years, renewable', '3 years, renewable'] },
        { label: 'Dual Intent', values: ['No', 'Yes (effectively)'] },
        { label: 'Self-Employment', values: ['No', 'Yes (via agent)'] },
        { label: 'Cost', values: ['$80 at border', '$1,000-5,000+ (attorney needed)'] },
        { label: 'Evidence Required', values: ['Degree + employer letter', 'Extensive: awards, publications, high salary, etc.'] },
      ]} />
      <Callout type="tip" title="When to Consider O-1">If you have significant achievements (publications, awards, patents, high salary) and want self-employment or dual intent, O-1 may be worth the higher cost and complexity.</Callout>
      <div className="mt-8"><Link href="/compare" className="text-accent hover:underline">&larr; All comparisons</Link></div>
    </ContentLayout>
  )
}
