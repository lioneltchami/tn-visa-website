import type { Metadata } from 'next'
import Link from 'next/link'
import ContentLayout from '@/components/layout/ContentLayout'
import { Callout } from '@/components/ui/Callout'
import EmailCapture from '@/components/ui/EmailCapture'

export const metadata: Metadata = {
  title: 'USMCA 2026 Review: What It Means for TN Visa Holders',
  description: 'The mandatory USMCA joint review deadline is July 1, 2026. Four possible outcomes and what TN visa holders should do now.',
}

export default function USMCAReviewPage() {
  return (
    <ContentLayout
      title="USMCA 2026 Review"
      description="The mandatory joint review deadline is July 1, 2026. Here's what could happen to your TN visa."
      breadcrumbs={[{ label: 'USMCA Review', href: '/usmca-review' }]}
      lastUpdated="April 2026"
    >
      <Callout type="warning" title="July 1, 2026 Deadline">
        The USMCA mandatory joint review is less than 2 months away. All three countries (US, Canada, Mexico) must evaluate whether the agreement continues to serve their interests.
      </Callout>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">What Is the USMCA Review?</h2>
      <p className="text-fg-secondary mb-4">
        USMCA (the agreement that replaced NAFTA in 2020) includes a mandatory joint review every 6 years. The first review deadline is <strong>July 1, 2026</strong>. All three countries must decide whether to extend the agreement for another 16 years.
      </p>
      <p className="text-fg-secondary mb-8">
        The TN visa exists because of USMCA Chapter 16. If the agreement ends, the legal basis for TN status could disappear — affecting approximately <strong>50,000 Canadians</strong> currently working in the US on TN visas.
      </p>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Four Possible Outcomes</h2>

      <div className="space-y-4 mb-8">
        <div className="card p-5 border-l-4 border-l-success">
          <h3 className="font-semibold text-fg mb-1">Scenario 1: Straightforward Renewal</h3>
          <p className="text-sm text-fg-secondary">All three countries agree to extend USMCA for 16 years. TN visas continue unchanged. Minor updates to the profession list are possible but unlikely. <strong>This is the most likely outcome</strong> — the immigration chapter has never been a primary focus of trade negotiations.</p>
        </div>
        <div className="card p-5 border-l-4 border-l-accent">
          <h3 className="font-semibold text-fg mb-1">Scenario 2: No Consensus, Agreement Continues</h3>
          <p className="text-sm text-fg-secondary">Countries can&apos;t agree on changes but don&apos;t withdraw. USMCA continues automatically until its sunset in 2036, with annual reviews. TN visas continue but with ongoing uncertainty.</p>
        </div>
        <div className="card p-5 border-l-4 border-l-warning">
          <h3 className="font-semibold text-fg mb-1">Scenario 3: Contentious Renegotiation</h3>
          <p className="text-sm text-fg-secondary">One or more countries demand significant changes. Immigration provisions could be targeted, though historically they haven&apos;t been. The profession list could be modified. Negotiations could take months.</p>
        </div>
        <div className="card p-5 border-l-4 border-l-danger">
          <h3 className="font-semibold text-fg mb-1">Scenario 4: US Withdrawal</h3>
          <p className="text-sm text-fg-secondary">Trump has privately considered quitting USMCA entirely. If the US withdraws (requires 6 months notice), TN visas could end. Existing holders would likely be allowed to finish their current status period. <strong>This is the worst case but least likely.</strong></p>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Why Withdrawal Is Unlikely</h2>
      <ul className="list-disc pl-6 space-y-2 text-fg-secondary mb-8">
        <li>Over 85% of US imports from Canada and Mexico enter duty-free under USMCA</li>
        <li>North American exports support over 17 million jobs</li>
        <li>The US needs Canada and Mexico to reduce China supply chain dependencies</li>
        <li>The immigration chapter has never been a primary focus of trade disputes</li>
        <li>Only ~50,000 Canadians use TN vs 2,800 Americans on CUSMA permits in Canada — the US benefits from the brain drain</li>
      </ul>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">What TN Holders Should Do Now</h2>
      <ol className="list-decimal pl-6 space-y-2 text-fg-secondary mb-8">
        <li><strong>Don&apos;t panic.</strong> The most likely outcome is continuation with minor or no changes to TN provisions.</li>
        <li><strong>Keep your documents current.</strong> Ensure your passport, I-94, and employer letter are up to date.</li>
        <li><strong>Consider your green card options.</strong> If you want long-term stability, explore <Link href="/green-card" className="text-accent hover:underline">green card pathways</Link> (EB-2 NIW, employer-sponsored PERM, H-1B bridge).</li>
        <li><strong>Track your TN status.</strong> Use our <Link href="/status" className="text-accent hover:underline">status tracker</Link> to monitor your expiration date and get renewal reminders.</li>
        <li><strong>Stay informed.</strong> Subscribe below for updates when the review outcome is announced.</li>
      </ol>

      <EmailCapture variant="banner" title="Get USMCA Review Updates" description="Be the first to know when the review outcome is announced. Free, no spam." />

      <Callout type="info" title="Current Status">
        The USTR has published a Federal Register notice announcing public consultations. All three governments are accepting public comments. No formal decision has been announced as of April 2026.
      </Callout>

      <div className="mt-12 pt-8 border-t border-border">
        <h2 className="text-xl font-bold text-fg mb-4">Related Resources</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link href="/green-card" className="card card-interactive p-4 text-center font-medium text-accent">Green Card Pathways</Link>
          <Link href="/renewal" className="card card-interactive p-4 text-center font-medium text-accent">Renewal Guide</Link>
          <Link href="/changes" className="card card-interactive p-4 text-center font-medium text-accent">Policy Changes</Link>
          <Link href="/compare" className="card card-interactive p-4 text-center font-medium text-accent">TN vs H-1B</Link>
        </div>
      </div>
    </ContentLayout>
  )
}
