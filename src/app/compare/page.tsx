import type { Metadata } from 'next'
import Link from 'next/link'
import ContentLayout from '@/components/layout/ContentLayout'
import { Callout } from '@/components/ui/Callout'
import { ComparisonTable } from '@/components/ui/ComparisonTable'
import { withCanonical } from '@/lib/seo'

export const metadata: Metadata = withCanonical('/compare', {
  title: 'TN Visa vs H-1B Visa Comparison',
  description:
    'Comprehensive comparison of TN and H-1B visas for Canadian professionals considering U.S. employment.',
})

export default function ComparePage() {
  return (
    <ContentLayout
      title="TN Visa vs H-1B Visa"
      description="A comprehensive comparison for Canadian professionals"
      lastUpdated="April 2026"
      breadcrumbs={[{ label: 'Compare', href: '/compare' }]}
    >
      <ComparisonTable
        headers={['', 'TN Visa', 'H-1B Visa']}
        rows={[
          {
            label: 'Processing Time',
            values: ['Same day at border', 'Several months'],
          },
          {
            label: 'Annual Cap',
            values: ['No cap', "65,000 + 20,000 (master's)"],
          },
          {
            label: 'Lottery',
            values: ['No lottery required', 'Subject to lottery (~25% chance)'],
          },
          {
            label: 'Duration',
            values: ['3 years, renewable indefinitely', '6 years max (extendable with GC pending)'],
          },
          { label: 'Cost', values: ['From $50', '$2,000-$10,000+'] },
          {
            label: 'Employer Change',
            values: ['New application at border (same day)', 'New petition required (months)'],
          },
          {
            label: 'Dual Intent',
            values: ['No (single intent only)', 'Yes (can pursue green card)'],
          },
          {
            label: 'Eligible Countries',
            values: ['Canada and Mexico only', 'All countries'],
          },
          {
            label: 'Professions',
            values: ['63 specific professions', 'Any specialty occupation'],
          },
          { label: 'Self-Employment', values: ['Prohibited', 'Prohibited'] },
          {
            label: 'Dependents Work',
            values: ['TD cannot work', 'H-4 EAD available (with conditions)'],
          },
          {
            label: 'Green Card Path',
            values: ['Indirect (must manage intent)', 'Direct (dual intent allowed)'],
          },
        ]}
      />

      <div className="mt-12 space-y-6">
        <Callout type="tip" title="Choose TN if…">
          <ul className="list-disc list-inside space-y-1">
            <li>You&apos;re a Canadian or Mexican citizen</li>
            <li>Your profession is on the TN list</li>
            <li>You want same-day processing with minimal cost</li>
            <li>You value flexibility to change employers quickly</li>
            <li>You don&apos;t need to pursue a green card immediately</li>
          </ul>
        </Callout>

        <Callout type="info" title="Choose H-1B if…">
          <ul className="list-disc list-inside space-y-1">
            <li>Your profession isn&apos;t on the TN list</li>
            <li>You want to pursue a green card directly</li>
            <li>You need dual intent protection</li>
            <li>You&apos;re not from Canada or Mexico</li>
          </ul>
        </Callout>

        <Callout type="warning" title="Consider both if…">
          <ul className="list-disc list-inside space-y-1">
            <li>You qualify for TN but plan to eventually get a green card</li>
            <li>You want to start on TN and transition to H-1B later</li>
            <li>Your employer is willing to sponsor either visa type</li>
          </ul>
        </Callout>

        <p className="text-[var(--fg-muted)]">
          Planning to transition from TN to a green card?{' '}
          <Link href="/green-card" className="text-[var(--accent)] underline">
            Learn about the green card path →
          </Link>
        </p>
      </div>
      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">More Visa Comparisons</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Link
          href="/compare/tn-vs-o1"
          className="card card-interactive p-4 text-center font-medium text-accent"
        >
          TN vs O-1
        </Link>
        <Link
          href="/compare/tn-vs-l1"
          className="card card-interactive p-4 text-center font-medium text-accent"
        >
          TN vs L-1
        </Link>
        <Link
          href="/compare/tn-vs-e2"
          className="card card-interactive p-4 text-center font-medium text-accent"
        >
          TN vs E-2
        </Link>
      </div>
    </ContentLayout>
  )
}
