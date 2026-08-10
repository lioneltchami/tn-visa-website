import type { Metadata } from 'next'
import { withCanonical } from '@/lib/seo'
import Link from 'next/link'
import ContentLayout from '@/components/layout/ContentLayout'
import { Callout } from '@/components/ui/Callout'
import JsonLd from '@/components/JsonLd'
import { blogArticleSchema } from '@/lib/article-schema'
import { fees, poeLandTotalLabel, usd } from '@/lib/fees'

export const metadata: Metadata = withCanonical('/blog/tn-visa-vs-h1b-2026', {
  title: 'TN Visa vs H-1B in 2026: Complete Comparison After the $100K Fee',
  description: 'Compare TN visa and H-1B for Canadian professionals in 2026. With the new H-1B fee pushing costs past $100K, the TN visa is more attractive than ever.',
})

export default function TNvsH1BBlogPost() {
  return (
    <ContentLayout
      title="TN Visa vs H-1B in 2026: Complete Comparison After the $100K Fee"
      description="The new H-1B fee changes everything for Canadians. Here's how to decide between TN and H-1B."
      breadcrumbs={[{ label: 'Blog', href: '/blog' }, { label: 'TN vs H-1B 2026', href: '/blog/tn-visa-vs-h1b-2026' }]}
      lastUpdated="April 2026"
    >
      <JsonLd data={blogArticleSchema({ headline: 'TN Visa vs H-1B in 2026: Complete Comparison After the $100K Fee', datePublished: '2026-04-30', dateModified: '2026-04-30', path: '/blog/tn-visa-vs-h1b-2026' })} />

      <Callout type="warning" title="2026 Update: H-1B Costs Have Skyrocketed">
        The new asylum-funding fee adds up to $75,000 on top of existing H-1B costs. Total employer cost now exceeds $100K in many cases.
      </Callout>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Key Differences at a Glance</h2>
      <div className="overflow-x-auto mb-8">
        <table className="w-full text-sm text-fg-secondary border border-border rounded-lg">
          <thead><tr className="bg-surface-secondary"><th className="p-3 text-left font-semibold text-fg">Feature</th><th className="p-3 text-left font-semibold text-fg">TN Visa</th><th className="p-3 text-left font-semibold text-fg">H-1B</th></tr></thead>
          <tbody>
            <tr className="border-t border-border"><td className="p-3 font-medium">Annual Cap</td><td className="p-3">None</td><td className="p-3">65,000 + 20,000 (master&apos;s)</td></tr>
            <tr className="border-t border-border"><td className="p-3 font-medium">Processing Time</td><td className="p-3">Same day at border</td><td className="p-3">3–6 months (lottery first)</td></tr>
            <tr className="border-t border-border"><td className="p-3 font-medium">Employer Cost</td><td className="p-3">~{poeLandTotalLabel()} (border) / ~{usd(fees.i129.smallFiling)} (mail filing)</td><td className="p-3">$100K+ with new fees</td></tr>
            <tr className="border-t border-border"><td className="p-3 font-medium">Dual Intent</td><td className="p-3">No</td><td className="p-3">Yes</td></tr>
            <tr className="border-t border-border"><td className="p-3 font-medium">Duration</td><td className="p-3">3 years, unlimited renewals</td><td className="p-3">3 years, max 6 total</td></tr>
            <tr className="border-t border-border"><td className="p-3 font-medium">Employer Change</td><td className="p-3">New application at border</td><td className="p-3">Transfer petition required</td></tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">The $100K Fee Impact</h2>
      <p className="text-fg-secondary mb-4">
        The new H-1B asylum-funding fee (up to $75,000 for large employers) has fundamentally changed the calculus. Combined with existing filing fees, premium processing, and legal costs, <strong>total H-1B sponsorship now exceeds $100K</strong> for many employers. This makes the TN visa — at roughly {poeLandTotalLabel()} at the land border — an extraordinary bargain.
      </p>
      <p className="text-fg-secondary mb-8">
        For a detailed breakdown, see our <Link href="/fees" className="text-accent hover:underline">complete fee comparison</Link>.
      </p>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">The Dual Intent Trade-Off</h2>
      <p className="text-fg-secondary mb-4">
        The TN visa&apos;s biggest limitation: it does <strong>not</strong> allow dual intent. You cannot openly pursue a green card while on TN status without risking denial at renewal. The H-1B explicitly allows dual intent — you can file for permanent residency while maintaining status.
      </p>
      <p className="text-fg-secondary mb-8">
        That said, many Canadians successfully transition from TN to green card. The key is timing. See our <Link href="/green-card" className="text-accent hover:underline">green card pathways guide</Link>.
      </p>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">When to Choose TN</h2>
      <ul className="list-disc pl-6 space-y-2 text-fg-secondary mb-8">
        <li>You qualify under a <Link href="/eligibility" className="text-accent hover:underline">TN profession</Link> and want to start working fast</li>
        <li>Your employer wants to avoid $100K+ in H-1B fees</li>
        <li>You&apos;re not ready to commit to permanent residency yet</li>
        <li>You value the flexibility to change employers easily at the border</li>
      </ul>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">When to Choose H-1B</h2>
      <ul className="list-disc pl-6 space-y-2 text-fg-secondary mb-8">
        <li>You want to pursue a green card immediately with dual intent protection</li>
        <li>Your profession isn&apos;t on the TN list</li>
        <li>Your employer is willing to absorb the cost</li>
        <li>You need the certainty of a 6-year defined path</li>
      </ul>

      <Callout type="info" title="Bottom Line">
        For most Canadian professionals in 2026, the TN visa is the better starting point. It&apos;s faster, cheaper, and has no cap. You can always transition to H-1B or a green card later.
      </Callout>

      <div className="mt-12 pt-8 border-t border-border">
        <h2 className="text-xl font-bold text-fg mb-4">Related</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link href="/compare" className="card card-interactive p-4 text-center font-medium text-accent">Full Visa Comparison</Link>
          <Link href="/green-card" className="card card-interactive p-4 text-center font-medium text-accent">Green Card Pathways</Link>
          <Link href="/fees" className="card card-interactive p-4 text-center font-medium text-accent">Fee Breakdown</Link>
          <Link href="/eligibility" className="card card-interactive p-4 text-center font-medium text-accent">Eligibility Checker</Link>
        </div>
      </div>
    </ContentLayout>
  )
}
