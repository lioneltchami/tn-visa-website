import type { Metadata } from 'next'
import { withCanonical } from '@/lib/seo'
import ContentLayout from '@/components/layout/ContentLayout'
import { Callout } from '@/components/ui/Callout'
import { StepList } from '@/components/ui/StepList'
import { ComparisonTable } from '@/components/ui/ComparisonTable'

export const metadata: Metadata = withCanonical('/dependents', {
  title: 'TD Status for TN Visa Dependents',
  description: 'Guide to TD status for spouses and children of TN visa holders, including work restrictions and school enrollment.',
})

export default function DependentsPage() {
  return (
    <ContentLayout
      title="TD Status for Dependents"
      description="How your spouse and children can accompany you to the United States."
      breadcrumbs={[{label:'Dependents', href:'/dependents'}]}
      lastUpdated="April 2026"
    >
      <h2 className="text-2xl font-bold mb-4">Who Qualifies for TD Status?</h2>
      <ul className="list-disc pl-6 mb-6 space-y-2">
        <li><strong>Spouse</strong> — legally married partner (common-law may qualify with proof)</li>
        <li><strong>Children</strong> — unmarried and under 21 years of age</li>
      </ul>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Application Process (Canadian Dependents at POE)</h2>
      <StepList
        steps={[
          { title: 'Gather documents', description: 'Valid Canadian passport, marriage certificate or birth certificate proving relationship to TN holder.' },
          { title: 'Obtain proof of TN status', description: 'Copy of TN holder\'s I-94, approval notice, or support letter. Dependents can apply simultaneously with the TN holder.' },
          { title: 'Present at port of entry', description: 'Accompany the TN holder or present independently at a U.S. POE with all documents.' },
          { title: 'Receive TD I-94', description: 'If approved, each dependent receives their own I-94 with the same expiration as the TN holder.' },
        ]}
      />

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Documents Needed</h2>
      <ul className="list-disc pl-6 mb-6 space-y-2">
        <li>Valid passport (for each dependent)</li>
        <li>Marriage certificate (for spouse)</li>
        <li>Birth certificate (for children)</li>
        <li>Copy of TN holder&apos;s I-94 or approval notice</li>
        <li>Copy of TN holder&apos;s support letter</li>
        <li>Proof of financial support (if requested)</li>
      </ul>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">TD Status Rules</h2>
      <ComparisonTable
        headers={['Question', 'Answer']}
        rows={[
          { label: 'Can TD holders work?', values: ['NO — absolutely prohibited'] },
          { label: 'Can TD holders study?', values: ['YES — full-time or part-time'] },
          { label: 'Can TD children attend school?', values: ['YES — K-12 and university'] },
          { label: 'What if TN holder changes status?', values: ['TD holders must also change status'] },
          { label: 'What if TN holder loses status?', values: ['TD status terminates immediately'] },
        ]}
      />

      <Callout type="danger" title="TD Holders Cannot Work">
        TD holders are absolutely prohibited from working in the United States — any employment, paid or unpaid, violates status and jeopardizes both the TD holder&apos;s and the TN holder&apos;s immigration status.
      </Callout>

      <Callout type="info" title="TD Holders Can Study">
        TD holders CAN study full-time at any U.S. institution without changing to F-1 student status. There is no restriction on the type or level of study.
      </Callout>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">If a TD Holder Wants to Work</h2>
      <p className="mb-4">
        A TD dependent who wishes to work in the United States must obtain their own independent work authorization. Options include:
      </p>
      <ul className="list-disc pl-6 mb-6 space-y-2">
        <li>Apply for their own TN status (if they qualify under a USMCA profession)</li>
        <li>Obtain an H-1B or other work visa through a sponsoring employer</li>
        <li>Change to a status that permits employment</li>
      </ul>
      <p className="text-sm text-fg-muted">
        The TD holder cannot simply &quot;add&quot; work authorization to their existing TD status — a full change of status is required.
      </p>
    </ContentLayout>
  )
}
