import type { Metadata } from 'next'
import Link from 'next/link'
import ContentLayout from '@/components/layout/ContentLayout'
import { Callout } from '@/components/ui/Callout'

export const metadata: Metadata = {
  title: 'TN Visa During the 2026 Government Shutdown',
  description: 'Can you still apply for a TN visa during the DHS government shutdown? Yes. Here is what you need to know.',
}

export default function GovernmentShutdownPage() {
  return (
    <ContentLayout
      title="TN Visa During the Government Shutdown"
      description="The DHS shutdown is the longest in US history. Here's how it affects TN visa applicants."
      breadcrumbs={[{ label: 'Government Shutdown', href: '/government-shutdown' }]}
      lastUpdated="April 2026"
    >
      <Callout type="info" title="TN Border Processing Continues">
        TN visa applications at the border are NOT affected by the shutdown. CBP treats port-of-entry inspections as essential operations. You can still apply.
      </Callout>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Current Situation</h2>
      <p className="text-fg-secondary mb-4">
        The Department of Homeland Security has been shut down for over <strong>70 days</strong> as of April 2026 — the longest DHS shutdown in US history. Lawmakers are targeting <strong>June 1, 2026</strong> for a resolution, but no deal is confirmed.
      </p>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">What&apos;s Affected</h2>
      <div className="overflow-x-auto mb-8">
        <table className="w-full text-sm border-collapse border border-border">
          <thead>
            <tr className="bg-bg-secondary">
              <th className="border border-border px-4 py-3 text-left font-semibold text-fg">Service</th>
              <th className="border border-border px-4 py-3 text-left font-semibold text-fg">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="border border-border px-4 py-3 text-fg-secondary">TN visa at border (CBP)</td><td className="border border-border px-4 py-3 text-success font-medium">✅ Operating</td></tr>
            <tr><td className="border border-border px-4 py-3 text-fg-secondary">I-129 petition (USCIS)</td><td className="border border-border px-4 py-3 text-success font-medium">✅ Operating (fee-funded)</td></tr>
            <tr><td className="border border-border px-4 py-3 text-fg-secondary">Premium processing</td><td className="border border-border px-4 py-3 text-success font-medium">✅ Operating</td></tr>
            <tr><td className="border border-border px-4 py-3 text-fg-secondary">H-1B filings (DOL LCA)</td><td className="border border-border px-4 py-3 text-danger font-medium">❌ Stalled</td></tr>
            <tr><td className="border border-border px-4 py-3 text-fg-secondary">E-Verify</td><td className="border border-border px-4 py-3 text-warning font-medium">⚠️ Limited</td></tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Impact on TN Applicants</h2>
      <ul className="list-disc pl-6 space-y-2 text-fg-secondary mb-8">
        <li><strong>Longer wait times:</strong> Enhanced vetting since December 2025 means more secondary inspections. Allow 2-3 extra hours at the border.</li>
        <li><strong>Social media checks:</strong> The USCIS Vetting Center (established Dec 2025) is conducting expanded online presence checks.</li>
        <li><strong>H-1B stalled = TN advantage:</strong> With H-1B filings blocked, TN is even more attractive for eligible Canadians.</li>
        <li><strong>No impact on fees:</strong> All TN-related fees remain unchanged.</li>
      </ul>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Tips for Applying During the Shutdown</h2>
      <ol className="list-decimal pl-6 space-y-2 text-fg-secondary mb-8">
        <li>Apply at <strong>airport preclearance</strong> rather than land borders — generally faster and safer.</li>
        <li>Arrive <strong>2-3 hours early</strong> to account for longer processing times.</li>
        <li>Have your documents <strong>perfectly organized</strong> — officers have less patience during high-volume periods.</li>
        <li>Consider <strong>I-129 with premium processing</strong> if you want to avoid the border entirely.</li>
        <li>Bring <strong>extra copies</strong> of everything.</li>
      </ol>

      <Callout type="tip" title="Silver Lining">
        With H-1B filings stalled, employers who might have pursued H-1B are now looking at TN as an alternative. If you&apos;re eligible for TN, this is actually a good time to apply — employers are more motivated to support TN applications.
      </Callout>

      <div className="mt-12 pt-8 border-t border-border">
        <h2 className="text-xl font-bold text-fg mb-4">Related Resources</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link href="/border-interview" className="card card-interactive p-4 text-center font-medium text-accent">Border Interview Guide</Link>
          <Link href="/processing-times" className="card card-interactive p-4 text-center font-medium text-accent">Processing Times</Link>
          <Link href="/apply" className="card card-interactive p-4 text-center font-medium text-accent">How to Apply</Link>
          <Link href="/usmca-review" className="card card-interactive p-4 text-center font-medium text-accent">USMCA 2026 Review</Link>
        </div>
      </div>
    </ContentLayout>
  )
}
