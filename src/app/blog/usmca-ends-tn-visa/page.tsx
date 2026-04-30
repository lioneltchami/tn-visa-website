import type { Metadata } from 'next'
import Link from 'next/link'
import ContentLayout from '@/components/layout/ContentLayout'
import { Callout } from '@/components/ui/Callout'
import JsonLd from '@/components/JsonLd'

export const metadata: Metadata = {
  title: 'What Happens to Your TN Visa if USMCA Ends?',
  description: 'The USMCA joint review is set for July 2026. Here are the 4 scenarios for TN visa holders and what you should do now to protect your status.',
}

export default function USMCAEndsBlogPost() {
  return (
    <ContentLayout
      title="What Happens to Your TN Visa if USMCA Ends?"
      description="The USMCA faces its first joint review in July 2026. Here's what every TN visa holder needs to know."
      breadcrumbs={[{ label: 'Blog', href: '/blog' }, { label: 'USMCA & TN Visa', href: '/blog/usmca-ends-tn-visa' }]}
      lastUpdated="April 2026"
    >
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'Article', headline: 'What Happens to Your TN Visa if USMCA Ends?', datePublished: '2026-04-30', dateModified: '2026-04-30', author: { '@type': 'Organization', name: 'TN Visa Guide' } }} />

      <Callout type="warning" title="July 2026: The First Joint Review">
        USMCA includes a mandatory joint review every 6 years. The first review is scheduled for July 2026. All three countries must agree to extend, or the agreement begins a 16-year sunset.
      </Callout>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">The July 2026 Deadline</h2>
      <p className="text-fg-secondary mb-8">
        USMCA (which replaced NAFTA in 2020) contains a sunset clause: every 6 years, the US, Canada, and Mexico must jointly review and confirm the agreement. If any country objects, USMCA enters a 16-year wind-down period. The TN visa exists solely because of Chapter 16 of USMCA. No agreement = no TN visa program. For the full policy breakdown, see our <Link href="/usmca-review" className="text-accent hover:underline">USMCA review tracker</Link>.
      </p>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">The 4 Scenarios</h2>

      <h3 className="text-xl font-semibold mt-8 mb-3">Scenario 1: Full Extension (Most Likely)</h3>
      <p className="text-fg-secondary mb-4">All three countries confirm USMCA for another 6 years. TN visa continues unchanged. This is the most likely outcome — the economic integration is too deep to unwind.</p>

      <h3 className="text-xl font-semibold mt-8 mb-3">Scenario 2: Extension with Modifications</h3>
      <p className="text-fg-secondary mb-4">Countries agree to extend but negotiate changes. The TN profession list could be updated — professions added or removed. This could actually <strong>benefit</strong> tech workers if the list is modernized.</p>

      <h3 className="text-xl font-semibold mt-8 mb-3">Scenario 3: No Agreement, Sunset Begins</h3>
      <p className="text-fg-secondary mb-4">One country blocks extension. USMCA enters a 16-year sunset period. The TN visa would continue during this period but with increasing uncertainty. You&apos;d have years to transition to another status.</p>

      <h3 className="text-xl font-semibold mt-8 mb-3">Scenario 4: Immediate Termination</h3>
      <p className="text-fg-secondary mb-8">Extremely unlikely. Even in the worst case, the sunset clause provides 16 years of wind-down. An immediate end would require all three countries to agree to terminate — which would devastate $1.4 trillion in annual trade.</p>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">What Happens to Current TN Holders?</h2>
      <p className="text-fg-secondary mb-8">
        Even if USMCA enters sunset, current TN holders would almost certainly be allowed to finish their authorized stay period. Historical precedent supports this — when NAFTA transitioned to USMCA in 2020, existing TN holders experienced <strong>zero disruption</strong>. The transition was seamless.
      </p>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">What You Should Do Now</h2>
      <ol className="list-decimal pl-6 space-y-2 text-fg-secondary mb-8">
        <li><strong>Don&apos;t panic</strong> — full extension is the most likely outcome by far</li>
        <li><strong>Renew your TN</strong> before July 2026 if it&apos;s expiring soon, to lock in a 3-year window</li>
        <li><strong>Explore green card options</strong> — having a <Link href="/green-card" className="text-accent hover:underline">permanent residency path</Link> removes USMCA dependency entirely</li>
        <li><strong>Understand your alternatives</strong> — know which <Link href="/compare" className="text-accent hover:underline">other visa categories</Link> you could qualify for</li>
        <li><strong>Stay informed</strong> — follow our <Link href="/usmca-review" className="text-accent hover:underline">USMCA tracker</Link> for real-time updates</li>
      </ol>

      <Callout type="info" title="The Most Likely Outcome">
        USMCA will almost certainly be extended. The US, Canada, and Mexico have $1.4 trillion in annual trade at stake. The TN visa program is a small but valued part of that relationship. Plan for continuity, but have a backup.
      </Callout>

      <div className="mt-12 pt-8 border-t border-border">
        <h2 className="text-xl font-bold text-fg mb-4">Related</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link href="/usmca-review" className="card card-interactive p-4 text-center font-medium text-accent">USMCA Review Tracker</Link>
          <Link href="/green-card" className="card card-interactive p-4 text-center font-medium text-accent">Green Card Pathways</Link>
          <Link href="/compare" className="card card-interactive p-4 text-center font-medium text-accent">Visa Comparison</Link>
        </div>
      </div>
    </ContentLayout>
  )
}
