import ContentLayout from '@/components/layout/ContentLayout'
import { Callout } from '@/components/ui/Callout'
import { Checklist } from '@/components/ui/Checklist'
import AffiliateLink from '@/components/ui/AffiliateLink'
import AffiliateDisclosure from '@/components/ui/AffiliateDisclosure'
import Link from 'next/link'

export default function DocumentsPage() {
  return (
    <ContentLayout
      title="Required Documents"
      description="Complete checklist of documents needed for your TN visa application."
      breadcrumbs={[{label:'Documents', href:'/documents'}]}
      lastUpdated="April 2026"
    >
      <AffiliateDisclosure />
      <Checklist
        title="Application Documents"
        items={[
          'Valid Canadian passport',
          'Employer support letter on company letterhead',
          'Degree/diploma (original or certified copy)',
          'Official transcripts',
          'Professional license (if applicable)',
          'Resume/CV',
          'Previous TN approval notices (if renewing)',
          'Previous I-94 records',
        ]}
      />

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Employer Support Letter Requirements</h2>
      <p className="mb-4">The employer letter must contain:</p>
      <ul className="list-disc pl-6 space-y-2 mb-8">
        <li>TN profession name (must match USMCA list exactly)</li>
        <li>Detailed description of duties</li>
        <li>Your qualifications for the role</li>
        <li>Start and end date of employment</li>
        <li>Work location</li>
        <li>Salary/compensation</li>
        <li>Temporary intent language</li>
        <li>Brief employer overview</li>
      </ul>

      <Callout type="danger" title="Critical">
        A weak employer letter is the #1 reason for TN denial. Ensure it is detailed, specific, and clearly ties your qualifications to the USMCA profession.
      </Callout>

      <Callout type="tip" title="Pro Tip">
        Bring multiple copies of all documents, organized with a cover sheet summarizing your application.
      </Callout>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Additional Documents for I-129 Filing</h2>
      <ul className="list-disc pl-6 space-y-2 mb-8">
        <li>Form I-129 with TN supplement</li>
        <li>Filing fee (varies by employer size — see <Link href="/fees" className="text-accent hover:underline">fee calculator</Link>)</li>
        <li>Form I-907 (if requesting premium processing)</li>
        <li>Copy of current I-94</li>
      </ul>

      <Callout type="tip" title="Need a Credential Evaluation?">
        If your degree is from outside the US, you may need a credential evaluation. <AffiliateLink href="https://www.wes.org/evaluations-and-fees/" provider="wes">WES (World Education Services)</AffiliateLink> is the most widely accepted evaluation service for TN visa applications.
      </Callout>

      <div className="mt-8 space-x-4">
        <Link href="/apply" className="text-accent hover:underline">
          How to apply →
        </Link>
        <Link href="/fees" className="text-accent hover:underline">
          Fee breakdown →
        </Link>
      </div>
    </ContentLayout>
  )
}
