import type { Metadata } from 'next'
import Link from 'next/link'
import ContentLayout from '@/components/layout/ContentLayout'
import { ComparisonTable } from '@/components/ui/ComparisonTable'
import { Callout } from '@/components/ui/Callout'

export const metadata: Metadata = {
  title: 'TN Visa vs L-1 Visa Comparison',
  description: 'Compare TN and L-1 visas for Canadian professionals and intracompany transferees.',
}

export default function TNvsL1Page() {
  return (
    <ContentLayout title="TN Visa vs L-1 Visa" description="For Canadian professionals considering intracompany transfers." breadcrumbs={[{ label: 'Compare', href: '/compare' }, { label: 'TN vs L-1', href: '/compare/tn-vs-l1' }]} lastUpdated="April 2026">
      <ComparisonTable headers={['', 'TN Visa', 'L-1 Visa']} rows={[
        { label: 'Eligibility', values: ['63 USMCA professions', 'Intracompany transferees (manager, executive, specialized knowledge)'] },
        { label: 'Requirement', values: ['US job offer', '1 year at foreign office of same company'] },
        { label: 'Cap', values: ['No cap', 'No cap (L-1A); 5,500/year (L-1B blanket)'] },
        { label: 'Processing', values: ['Same day at border', '2-6 months (15 days premium)'] },
        { label: 'Duration', values: ['3 years renewable', '7 years (L-1A) or 5 years (L-1B)'] },
        { label: 'Dual Intent', values: ['No', 'Yes'] },
        { label: 'Self-Employment', values: ['No', 'No (but can be executive of own company)'] },
        { label: 'New Office', values: ['No', 'Yes (L-1 allows opening new US office)'] },
      ]} />
      <Callout type="tip" title="When to Consider L-1">L-1 is ideal if you already work for a multinational company with US and Canadian offices.</Callout>
      <div className="mt-8"><Link href="/compare" className="text-accent hover:underline">&larr; All comparisons</Link></div>
    </ContentLayout>
  )
}
