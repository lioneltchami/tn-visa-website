import type { Metadata } from 'next'
import { withCanonical } from '@/lib/seo'
import Link from 'next/link'
import ContentLayout from '@/components/layout/ContentLayout'
import { Callout } from '@/components/ui/Callout'
import AffiliateLink from '@/components/ui/AffiliateLink'
import AffiliateDisclosure from '@/components/ui/AffiliateDisclosure'

export const metadata: Metadata = withCanonical('/credentials', {
  title: 'Canadian Credentials for TN Visa Applications',
  description: 'How Canadian degrees and professional designations (CPA, P.Eng, RN) map to US equivalents for TN visa applications.',
})

export default function CredentialsPage() {
  return (
    <ContentLayout
      title="Canadian Credentials & TN Visa"
      description="How your Canadian degrees and professional designations translate for TN visa applications."
      breadcrumbs={[{ label: 'Credentials', href: '/credentials' }]}
      lastUpdated="April 2026"
    >
      <AffiliateDisclosure />

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Canadian Degrees</h2>
      <p className="text-fg-secondary mb-4">
        Canadian university degrees are <strong>directly accepted</strong> for TN visa applications. No credential evaluation is needed in most cases. CBP officers are familiar with Canadian institutions.
      </p>
      <ul className="list-disc pl-6 space-y-2 text-fg-secondary mb-8">
        <li><strong>Bachelor&apos;s degrees</strong> from any recognized Canadian university satisfy the TN education requirement</li>
        <li><strong>Master&apos;s and Doctorate</strong> degrees exceed the minimum for all TN professions</li>
        <li><strong>College diplomas</strong> (2-3 year) qualify for the 10 professions that accept &quot;diploma + 3 years experience&quot;</li>
        <li>Bring your <strong>original degree or a certified copy</strong> — photocopies may not be accepted</li>
      </ul>

      <Callout type="tip" title="No Evaluation Needed">
        Unlike other visa categories, TN applications from Canadians with Canadian degrees typically do NOT require a WES or other credential evaluation. Just bring your original degree.
      </Callout>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Professional Designations</h2>
      <p className="text-fg-secondary mb-4">Canadian professional designations map to US equivalents:</p>
      <div className="overflow-x-auto mb-8">
        <table className="w-full text-sm border-collapse border border-border">
          <thead>
            <tr className="bg-bg-secondary">
              <th className="border border-border px-4 py-3 text-left font-semibold text-fg">Canadian Designation</th>
              <th className="border border-border px-4 py-3 text-left font-semibold text-fg">US Equivalent</th>
              <th className="border border-border px-4 py-3 text-left font-semibold text-fg">TN Profession</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="border border-border px-4 py-3 text-fg-secondary">CPA (CPA Canada)</td><td className="border border-border px-4 py-3 text-fg-secondary">CPA</td><td className="border border-border px-4 py-3"><Link href="/professions/accountant" className="text-accent hover:underline">Accountant</Link></td></tr>
            <tr><td className="border border-border px-4 py-3 text-fg-secondary">CA (legacy, pre-2014)</td><td className="border border-border px-4 py-3 text-fg-secondary">CPA</td><td className="border border-border px-4 py-3"><Link href="/professions/accountant" className="text-accent hover:underline">Accountant</Link></td></tr>
            <tr><td className="border border-border px-4 py-3 text-fg-secondary">CGA (legacy)</td><td className="border border-border px-4 py-3 text-fg-secondary">CPA</td><td className="border border-border px-4 py-3"><Link href="/professions/accountant" className="text-accent hover:underline">Accountant</Link></td></tr>
            <tr><td className="border border-border px-4 py-3 text-fg-secondary">CMA (legacy)</td><td className="border border-border px-4 py-3 text-fg-secondary">CMA/CPA</td><td className="border border-border px-4 py-3"><Link href="/professions/accountant" className="text-accent hover:underline">Accountant</Link></td></tr>
            <tr><td className="border border-border px-4 py-3 text-fg-secondary">P.Eng (PEO, APEGA, EGBC, etc.)</td><td className="border border-border px-4 py-3 text-fg-secondary">PE</td><td className="border border-border px-4 py-3"><Link href="/professions/engineer" className="text-accent hover:underline">Engineer</Link></td></tr>
            <tr><td className="border border-border px-4 py-3 text-fg-secondary">RN (CNO, CRNBC, CARNA, etc.)</td><td className="border border-border px-4 py-3 text-fg-secondary">RN (state licence needed)</td><td className="border border-border px-4 py-3"><Link href="/professions/registered-nurse" className="text-accent hover:underline">Registered Nurse</Link></td></tr>
            <tr><td className="border border-border px-4 py-3 text-fg-secondary">P.Pharm (provincial)</td><td className="border border-border px-4 py-3 text-fg-secondary">RPh</td><td className="border border-border px-4 py-3"><Link href="/professions/pharmacist" className="text-accent hover:underline">Pharmacist</Link></td></tr>
            <tr><td className="border border-border px-4 py-3 text-fg-secondary">OAQ / OAA / AIBC (architecture)</td><td className="border border-border px-4 py-3 text-fg-secondary">AIA / state licence</td><td className="border border-border px-4 py-3"><Link href="/professions/architect" className="text-accent hover:underline">Architect</Link></td></tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">When You Need a Credential Evaluation</h2>
      <p className="text-fg-secondary mb-4">A credential evaluation (e.g., from WES) is needed when:</p>
      <ul className="list-disc pl-6 space-y-2 text-fg-secondary mb-4">
        <li>Your degree is from a <strong>non-Canadian, non-US institution</strong></li>
        <li>You hold a <strong>3-year bachelor&apos;s degree</strong> (some countries) and need to prove US equivalency</li>
        <li>A <strong>CBP officer specifically requests</strong> an evaluation (rare for Canadian degrees)</li>
        <li>You&apos;re applying for a <strong>regulated profession</strong> that requires US state licensing</li>
      </ul>
      <p className="text-fg-secondary mb-8">
        <AffiliateLink offer="wes-evaluation">WES (World Education Services)</AffiliateLink> is the most widely accepted credential evaluation service for TN visa applications.
      </p>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Province-Specific Notes</h2>
      <ul className="list-disc pl-6 space-y-2 text-fg-secondary mb-8">
        <li><strong>Quebec:</strong> French-language degrees are accepted. Bring an English translation of your diploma if it&apos;s only in French. The Ordre des ingénieurs du Québec (OIQ) P.Eng is recognized.</li>
        <li><strong>Ontario:</strong> PEO (Professional Engineers Ontario) P.Eng is the most commonly presented engineering licence. CNO (College of Nurses of Ontario) RN is accepted.</li>
        <li><strong>British Columbia:</strong> EGBC (Engineers and Geoscientists BC) P.Eng is accepted. CRNBC nursing licence is recognized.</li>
        <li><strong>Alberta:</strong> APEGA P.Eng is accepted. CPA Alberta designation is recognized.</li>
      </ul>

      <Callout type="info" title="Bring Your Licence Documentation">
        If you hold a Canadian professional licence, bring the original licence certificate or a letter of good standing from your provincial regulatory body. This strengthens your TN application significantly.
      </Callout>

      <div className="mt-12 pt-8 border-t border-border">
        <h2 className="text-xl font-bold text-fg mb-4">Related Resources</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link href="/professions" className="card card-interactive p-4 text-center font-medium text-accent">63 TN Professions</Link>
          <Link href="/documents" className="card card-interactive p-4 text-center font-medium text-accent">Required Documents</Link>
          <Link href="/eligibility" className="card card-interactive p-4 text-center font-medium text-accent">Eligibility Checker</Link>
          <Link href="/employer-letter" className="card card-interactive p-4 text-center font-medium text-accent">Employer Letter Guide</Link>
        </div>
      </div>
    </ContentLayout>
  )
}
