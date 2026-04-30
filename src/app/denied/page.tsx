import type { Metadata } from 'next'
import Link from 'next/link'
import ContentLayout from '@/components/layout/ContentLayout'
import { Callout } from '@/components/ui/Callout'
import AffiliateLink from '@/components/ui/AffiliateLink'
import AffiliateDisclosure from '@/components/ui/AffiliateDisclosure'
import JsonLd from '@/components/JsonLd'

export const metadata: Metadata = {
  title: 'TN Visa Denied: What To Do Next',
  description: 'Denied a TN visa? Learn the common denial reasons, the critical difference between denial and withdrawal, and how to reapply successfully.',
}

export default function DeniedPage() {
  return (
    <ContentLayout
      title="TN Visa Denied: What To Do Next"
      description="A denial is not the end. Understand why it happened and how to move forward."
      breadcrumbs={[{ label: 'Denied', href: '/denied' }]}
      lastUpdated="April 2026"
    >
      <AffiliateDisclosure />
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'What are the most common reasons for TN visa denial?', acceptedAnswer: { '@type': 'Answer', text: 'The most common reasons are: degree mismatch with the TN profession (especially Computer Science for Engineer since June 2025), vague job descriptions in the employer letter, failure to demonstrate non-immigrant intent, missing credentials, and incomplete documentation.' } },
          { '@type': 'Question', name: 'Can I reapply after a TN visa denial?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. There is no waiting period. You can reapply immediately at a different port of entry, or file Form I-129 with USCIS. Address the specific reason for denial before reapplying.' } },
          { '@type': 'Question', name: 'What is the difference between a TN visa denial and withdrawal?', acceptedAnswer: { '@type': 'Answer', text: 'A withdrawal means you voluntarily pull your application before a decision — it does not go on your record. A denial is an official refusal that is recorded and may affect future applications. Always ask to withdraw rather than accept a denial.' } },
          { '@type': 'Question', name: 'Can a TN visa denial lead to expedited removal?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. If denied at a land border, CBP can issue an expedited removal order under INA 235(b)(1), which bars you from entering the US for 5 years. This is why airport preclearance is safer — you can withdraw and remain in Canada.' } },
          { '@type': 'Question', name: 'What was the TN visa denial rate in 2024?', acceptedAnswer: { '@type': 'Answer', text: 'The Department of State consular denial rate was 42.63% in FY2024. However, the USCIS approval rate recovered to 94.6% in Q2 2025 for properly prepared applications.' } },
        ],
      }} />

      <Callout type="danger" title="Critical: Denial vs Withdrawal">
        If the officer signals they will deny your application, ask to <strong>withdraw</strong> your application instead. A withdrawal does not go on your record. A denial does — and can trigger expedited removal at land borders.
      </Callout>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Common Denial Reasons</h2>
      <ul className="list-disc pl-6 space-y-2 text-fg-secondary mb-8">
        <li><strong>Degree mismatch:</strong> Your degree doesn&apos;t align with the TN profession category. The most common case since June 2025: Computer Science degrees used for the Engineer category (no longer accepted).</li>
        <li><strong>Vague job description:</strong> The employer support letter doesn&apos;t clearly describe duties that match the USMCA profession. Generic or one-page letters are now grounds for denial.</li>
        <li><strong>Non-immigrant intent issues:</strong> Evidence suggesting you plan to stay permanently — one-way ticket, moving boxes in your car, mentioning green card plans.</li>
        <li><strong>Missing supervisor for Scientific Technician:</strong> Since June 2025, ScT applicants must name a supervising professional. Self-directed roles are denied.</li>
        <li><strong>Overqualified for position:</strong> Your credentials far exceed the role requirements, raising suspicion about the true nature of the position.</li>
        <li><strong>Incomplete documentation:</strong> Missing transcripts, unsigned employer letter, expired passport, or no credential evaluation when required.</li>
        <li><strong>Job title mismatch:</strong> The job title in the letter doesn&apos;t match a USMCA profession name exactly (e.g., &quot;Software Engineer&quot; is not &quot;Engineer&quot;).</li>
      </ul>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Denial vs Withdrawal</h2>
      <div className="overflow-x-auto mb-8">
        <table className="w-full text-sm border-collapse border border-border">
          <thead>
            <tr className="bg-bg-secondary">
              <th className="border border-border px-4 py-3 text-left font-semibold text-fg">Denial</th>
              <th className="border border-border px-4 py-3 text-left font-semibold text-fg">Withdrawal</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-border px-4 py-3 text-fg-secondary">Goes on your immigration record</td>
              <td className="border border-border px-4 py-3 text-fg-secondary">Does NOT go on your record</td>
            </tr>
            <tr>
              <td className="border border-border px-4 py-3 text-fg-secondary">May trigger expedited removal at land borders</td>
              <td className="border border-border px-4 py-3 text-fg-secondary">No removal consequences</td>
            </tr>
            <tr>
              <td className="border border-border px-4 py-3 text-fg-secondary">Must be disclosed on future applications</td>
              <td className="border border-border px-4 py-3 text-fg-secondary">No disclosure required</td>
            </tr>
            <tr>
              <td className="border border-border px-4 py-3 text-fg-secondary">Can make future applications harder</td>
              <td className="border border-border px-4 py-3 text-fg-secondary">You can reapply immediately with a stronger case</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">What To Do After a Denial</h2>
      <ol className="list-decimal pl-6 space-y-3 text-fg-secondary mb-8">
        <li><strong>Review the denial reason carefully.</strong> The officer should provide a written or verbal explanation. Understand exactly what was insufficient.</li>
        <li><strong>Gather additional evidence.</strong> If the issue was documentation, get stronger credentials, a more detailed employer letter, or a credential evaluation.</li>
        <li><strong>Consider a different TN category.</strong> If denied under Engineer, you may qualify under Computer Systems Analyst or Mathematician. Review the <Link href="/professions" className="text-accent hover:underline">full profession list</Link>.</li>
        <li><strong>Consult an immigration lawyer.</strong> After a denial, professional guidance significantly improves your chances on the next attempt. A lawyer can identify the specific weakness and fix it.</li>
        <li><strong>Reapply with a stronger case.</strong> Address every issue from the denial. Bring additional supporting documents. Consider filing I-129 with USCIS instead of reapplying at the border.</li>
      </ol>

      <Callout type="tip" title="Professional Help After a Denial">
        After a denial, professional guidance significantly improves your chances on the next attempt. <AffiliateLink href="https://tnvisaexpert.com/services/jump-start-basic-tn-visa-support-service/" provider="tnvisaexpert">TN Visa Expert offers visa assessments</AffiliateLink> starting at $850 with a money-back guarantee.
      </Callout>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Can You Reapply?</h2>
      <p className="text-fg-secondary mb-4">
        Yes — there is <strong>no waiting period</strong> after a TN visa denial. You can:
      </p>
      <ul className="list-disc pl-6 space-y-2 text-fg-secondary mb-8">
        <li><strong>Reapply at a different port of entry</strong> — immediately, with a stronger application package</li>
        <li><strong>File Form I-129 with USCIS</strong> — your employer files a petition by mail. Slower (3-5 months, or 15 days with premium processing) but avoids the border interview entirely</li>
        <li><strong>Apply at airport preclearance</strong> — if previously denied at a land border, airport preclearance is safer because you can withdraw and stay in Canada if things go poorly</li>
      </ul>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Expedited Removal Warning</h2>
      <p className="text-fg-secondary mb-4">
        At <strong>land border crossings</strong>, a denial can trigger <strong>expedited removal</strong> under INA 235(b)(1). This is a serious consequence:
      </p>
      <ul className="list-disc pl-6 space-y-2 text-fg-secondary mb-8">
        <li>You are barred from entering the US for <strong>5 years</strong></li>
        <li>The removal order goes on your permanent immigration record</li>
        <li>Future visa applications of any type will be affected</li>
        <li>There is no appeal process for expedited removal</li>
      </ul>

      <Callout type="info" title="Why Airport Preclearance Is Safer">
        At Canadian airport preclearance facilities, if your application is going poorly, you can withdraw and simply walk back into the Canadian terminal. At a land border, you&apos;re already at the US border and subject to US immigration enforcement.
      </Callout>

      <Callout type="tip" title="Prepare Before You Apply">
        The best way to avoid denial is thorough preparation. Read our <Link href="/border-interview" className="text-accent hover:underline font-medium">border interview guide</Link> and <Link href="/employer-letter" className="text-accent hover:underline font-medium">employer letter guide</Link> before applying.
      </Callout>

      <div className="mt-12 pt-8 border-t border-border">
        <h2 className="text-xl font-bold text-fg mb-4">Related Resources</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link href="/border-interview" className="card card-interactive p-4 text-center font-medium text-accent">Border Interview Guide</Link>
          <Link href="/employer-letter" className="card card-interactive p-4 text-center font-medium text-accent">Employer Letter Guide</Link>
          <Link href="/eligibility" className="card card-interactive p-4 text-center font-medium text-accent">Check Your Eligibility</Link>
          <Link href="/fees" className="card card-interactive p-4 text-center font-medium text-accent">Fee Calculator</Link>
        </div>
      </div>
    </ContentLayout>
  )
}
