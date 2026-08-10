import type { Metadata } from 'next'
import Link from 'next/link'
import ContentLayout from '@/components/layout/ContentLayout'
import { Callout } from '@/components/ui/Callout'
import EmailCapture from '@/components/ui/EmailCapture'
import FeeSourceLinks from '@/components/ui/FeeSourceLinks'
import { fees, usd } from '@/lib/fees'
import { withCanonical } from '@/lib/seo'

export const metadata: Metadata = withCanonical('/changes', {
  title: 'Recent TN Visa Policy Changes (2024-2026)',
  description:
    'Major TN visa policy updates including the June 2025 USCIS overhaul affecting engineers, economists, and self-employment.',
})

export default function ChangesPage() {
  return (
    <ContentLayout
      title="Recent Policy Changes & News"
      description="Major TN visa policy updates from 2024-2026, including the June 2025 USCIS overhaul."
      breadcrumbs={[{ label: 'Updates', href: '/changes' }]}
      lastUpdated="April 2026"
    >
      <section>
        <h2 className="text-2xl font-bold text-fg mt-12 mb-4">June 2025 USCIS Policy Update</h2>
        <p className="mb-4">
          The biggest change to TN visas in decades. USCIS issued comprehensive policy guidance that
          significantly tightened requirements:
        </p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-border mb-4">
            <thead>
              <tr className="bg-bg-secondary">
                <th className="border border-border px-4 py-2 text-left font-semibold text-fg">
                  Change
                </th>
                <th className="border border-border px-4 py-2 text-left font-semibold text-fg">
                  Impact
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border px-4 py-2 text-fg-secondary">
                  Self-employment banned
                </td>
                <td className="border border-border px-4 py-2 text-fg-secondary">
                  Cannot create LLC to self-sponsor; must have U.S. employer
                </td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-2 text-fg-secondary">
                  U.S. employer required
                </td>
                <td className="border border-border px-4 py-2 text-fg-secondary">
                  Foreign employers cannot petition; must have U.S. entity
                </td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-2 text-fg-secondary">
                  Engineer narrowed
                </td>
                <td className="border border-border px-4 py-2 text-fg-secondary">
                  Must hold engineering degree; IT roles no longer qualify
                </td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-2 text-fg-secondary">
                  Economist narrowed
                </td>
                <td className="border border-border px-4 py-2 text-fg-secondary">
                  Must perform actual economic research; business analysts excluded
                </td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-2 text-fg-secondary">
                  Scientific Technician clarified
                </td>
                <td className="border border-border px-4 py-2 text-fg-secondary">
                  Must work under supervision of a professional in the list
                </td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-2 text-fg-secondary">
                  Computer Systems Analyst clarified
                </td>
                <td className="border border-border px-4 py-2 text-fg-secondary">
                  Pure software development may not qualify; must involve systems analysis
                </td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-2 text-fg-secondary">
                  Increased scrutiny
                </td>
                <td className="border border-border px-4 py-2 text-fg-secondary">
                  Officers now verify duties match category more rigorously
                </td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-2 text-fg-secondary">
                  Degree relevance
                </td>
                <td className="border border-border px-4 py-2 text-fg-secondary">
                  Degree must be directly related to TN category — not just any bachelor&apos;s
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <Callout type="danger" title="Self-Employment Prohibited">
        Self-employment is now explicitly prohibited. Creating an LLC to self-sponsor will result in
        denial. You must have a legitimate U.S. employer with a real employer-employee relationship.
      </Callout>

      <section>
        <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Fee Changes</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-border mb-4">
            <thead>
              <tr className="bg-bg-secondary">
                <th className="border border-border px-4 py-2 text-left font-semibold text-fg">
                  Fee
                </th>
                <th className="border border-border px-4 py-2 text-left font-semibold text-fg">
                  Old
                </th>
                <th className="border border-border px-4 py-2 text-left font-semibold text-fg">
                  New
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border px-4 py-2 text-fg-secondary">I-94 (border)</td>
                <td className="border border-border px-4 py-2 text-fg-secondary">
                  {usd(fees.poe.i94LandPrevious)}
                </td>
                <td className="border border-border px-4 py-2 text-fg-secondary">
                  {usd(fees.poe.i94LandBorder)}
                </td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-2 text-fg-secondary">
                  Visa Integrity and Border Security Fee
                </td>
                <td className="border border-border px-4 py-2 text-fg-secondary">N/A</td>
                <td className="border border-border px-4 py-2 text-fg-secondary">
                  {usd(fees.other.visaIntegrityFee)}
                </td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-2 text-fg-secondary">
                  Premium Processing
                </td>
                <td className="border border-border px-4 py-2 text-fg-secondary">
                  {usd(fees.premiumProcessingPrevious)}
                </td>
                <td className="border border-border px-4 py-2 text-fg-secondary">
                  {usd(fees.premiumProcessing)}
                </td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-2 text-fg-secondary">
                  USCIS inflation adjustments
                </td>
                <td className="border border-border px-4 py-2 text-fg-secondary">—</td>
                <td className="border border-border px-4 py-2 text-fg-secondary">
                  Annual increases across all forms
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-fg mt-12 mb-4">2026 Updates</h2>
        <div className="space-y-4 mb-8">
          <div className="card p-4 border-l-4 border-l-accent">
            <p className="font-semibold text-fg text-sm">
              March 2026 — Billy Bishop Toronto Pre-Clearance
            </p>
            <p className="text-sm text-fg-secondary">
              Billy Bishop Toronto City Airport (YTZ) now offers US CBP pre-clearance, giving
              Canadian TN applicants a new processing location in downtown Toronto.
            </p>
          </div>
          <div className="card p-4 border-l-4 border-l-warning">
            <p className="font-semibold text-fg text-sm">
              March 2026 — Premium Processing Fee Increase
            </p>
            <p className="text-sm text-fg-secondary">
              Premium processing (Form I-907) increased from {usd(fees.premiumProcessingPrevious)}{' '}
              to {usd(fees.premiumProcessing)} for I-129 petitions including TN.
            </p>
          </div>
          <div className="card p-4 border-l-4 border-l-danger">
            <p className="font-semibold text-fg text-sm">December 2025 — USCIS Vetting Center</p>
            <p className="text-sm text-fg-secondary">
              USCIS created a centralized Vetting Center expanding social media and online presence
              checks. Expect more secondary inspections and longer processing at the border.
            </p>
          </div>
          <div className="card p-4 border-l-4 border-l-warning">
            <p className="font-semibold text-fg text-sm">
              September 2025 — Mexican In-Person Interview Requirement
            </p>
            <p className="text-sm text-fg-secondary">
              All Mexican TN visa applicants now require in-person interviews at US consulates,
              adding processing time.
            </p>
          </div>
          <div className="card p-4 border-l-4 border-l-accent">
            <p className="font-semibold text-fg text-sm">September 2025 — I-94 Fee Increase</p>
            <p className="text-sm text-fg-secondary">
              The I-94 fee at land borders increased from {usd(fees.poe.i94LandPrevious)} to{' '}
              {usd(fees.poe.i94LandBorder)} under the One Big Beautiful Bill Act, raising the total
              POE cost to {usd(fees.poe.processingFee + fees.poe.i94LandBorder)}.
            </p>
          </div>
        </div>
      </section>

      <Callout type="info" title="Related: Government Shutdown">
        The DHS government shutdown (70+ days and counting) is causing longer wait times at the
        border but TN processing continues.{' '}
        <Link href="/government-shutdown" className="text-accent hover:underline font-medium">
          Read the full impact guide
        </Link>
        .
      </Callout>

      <section>
        <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Denial Rate Spike</h2>
        <p className="mb-4">
          FY 2024 saw an unprecedented <strong>42.63% denial rate</strong> for TN petitions filed
          with USCIS — the highest on record. This was driven by increased scrutiny of Computer
          Systems Analyst, Engineer, and Management Consultant categories.
        </p>
        <p className="mb-4">
          By Q2 2025, the approval rate recovered to <strong>94.6%</strong> as applicants adapted to
          the new standards with stronger documentation and more precise category matching.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-fg mt-12 mb-4">ACA/Health Insurance Changes</h2>
        <p className="mb-4">
          Premium tax credits (subsidies) that helped lawful immigrants afford marketplace health
          insurance are being phased out for non-permanent residents. TN holders who rely on ACA
          marketplace plans should budget for full-price premiums starting in 2026.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Trump Administration Impact</h2>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li>
            <strong>Increased scrutiny</strong> — More RFEs (Requests for Evidence) and longer
            processing times
          </li>
          <li>
            <strong>No specific TN executive order</strong> — TN has not been directly targeted by
            executive action
          </li>
          <li>
            <strong>Trade tensions</strong> — U.S.-Canada trade disputes create uncertainty about
            USMCA future
          </li>
          <li>
            <strong>General anti-immigration rhetoric</strong> — Border officers may apply stricter
            standards
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-fg mt-12 mb-4">USMCA 2026 Review</h2>
        <p className="mb-4">
          The USMCA treaty (which governs TN visas) has a{' '}
          <strong>mandatory review on July 1, 2026</strong>. This is the single biggest risk to the
          TN visa program.
        </p>
        <p className="mb-4 font-semibold">Four possible outcomes:</p>
        <ol className="list-decimal pl-6 space-y-2 mb-4">
          <li>
            <strong>Withdrawal</strong> — Any party can withdraw with 6 months notice (TN visas
            would end)
          </li>
          <li>
            <strong>Renewal</strong> — All parties agree to extend for another 16 years (best case)
          </li>
          <li>
            <strong>Renegotiation</strong> — Terms modified, TN categories could change
          </li>
          <li>
            <strong>No consensus</strong> — Annual reviews until resolved (uncertainty continues)
          </li>
        </ol>
        <p className="mb-4">
          Approximately <strong>~50,000 Canadians</strong> currently hold TN status and would be
          affected by any changes.
        </p>
      </section>

      <Callout type="warning" title="USMCA Review Risk">
        The USMCA 2026 review is the biggest risk to TN visas. If you plan to stay in the U.S.
        long-term, consider pursuing a green card as a backup plan before the review date.{' '}
        <Link href="/usmca-review" className="text-accent hover:underline font-medium">
          Read our full USMCA review analysis →
        </Link>
      </Callout>

      <p className="mt-6">
        <Link href="/green-card" className="text-accent hover:underline font-medium">
          Learn about green card pathways →
        </Link>
      </p>
      <FeeSourceLinks
        ids={['uscis-policy-manual', 'federal-register', 'uscis-tn', 'usmca-ustr', 'uscis-fees']}
      />
      <EmailCapture
        variant="inline"
        title="Subscribe to Policy Alerts"
        description="Get notified when TN visa rules change."
      />
    </ContentLayout>
  )
}
