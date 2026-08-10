import type { Metadata } from 'next'
import { withCanonical } from '@/lib/seo'
import Link from 'next/link'
import ContentLayout from '@/components/layout/ContentLayout'
import { Callout } from '@/components/ui/Callout'
import JsonLd from '@/components/JsonLd'
import { blogArticleSchema } from '@/lib/article-schema'
import { poeLandTotalLabel } from '@/lib/fees'

export const metadata: Metadata = withCanonical('/blog/tn-visa-accountants-2026', {
  title: 'TN Visa for Accountants 2026: CPA Requirements & Process',
  description: 'Complete guide for Canadian accountants seeking TN visa status. CPA requirements, degree qualifications, Big 4 transfers, and salary expectations.',
})

export default function TNVisaAccountants2026() {
  return (
    <ContentLayout
      title="TN Visa for Accountants 2026: Complete Guide"
      description="Canadian accountants are in demand at US firms. Here's how to qualify for TN status."
      breadcrumbs={[{ label: 'Blog', href: '/blog' }, { label: 'TN Visa for Accountants 2026', href: '/blog/tn-visa-accountants-2026' }]}
      lastUpdated="May 2026"
    >
      <JsonLd data={blogArticleSchema({ headline: 'TN Visa for Accountants 2026: CPA Requirements & Process', datePublished: '2026-05-09', dateModified: '2026-05-09', path: '/blog/tn-visa-accountants-2026' })} />

      <Callout type="info" title="Key Requirement">
        TN Accountant status requires EITHER a Baccalaureate degree OR a CPA/CA/CGA/CMA designation. You don&apos;t need both.
      </Callout>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Qualification Options</h2>
      <p className="text-fg-secondary mb-4">You can qualify for TN Accountant status through:</p>
      <div className="overflow-x-auto mb-8">
        <table className="w-full text-sm text-fg-secondary border border-border rounded-lg">
          <thead><tr className="bg-surface-secondary"><th className="p-3 text-left font-semibold text-fg">Path</th><th className="p-3 text-left font-semibold text-fg">Requirements</th></tr></thead>
          <tbody>
            <tr className="border-t border-border"><td className="p-3 font-medium">Degree Path</td><td className="p-3">Bachelor&apos;s degree in Accounting, Finance, or Business (with accounting focus)</td></tr>
            <tr className="border-t border-border"><td className="p-3 font-medium">Designation Path</td><td className="p-3">CPA, CA, CGA, or CMA designation from a Canadian provincial body</td></tr>
            <tr className="border-t border-border"><td className="p-3 font-medium">Combined</td><td className="p-3">Both degree and designation (strongest application)</td></tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Canadian CPA → US Practice</h2>
      <p className="text-fg-secondary mb-4">
        Your Canadian CPA allows you to work in the US on a TN visa, but there are limitations:
      </p>
      <ul className="list-disc pl-6 space-y-2 text-fg-secondary mb-8">
        <li><strong>TN status:</strong> Canadian CPA qualifies you for TN Accountant</li>
        <li><strong>Signing authority:</strong> You cannot sign US audit reports without a US CPA license</li>
        <li><strong>Public practice:</strong> Some states have reciprocity agreements with Canadian provinces</li>
        <li><strong>Industry roles:</strong> No US CPA needed for corporate accounting positions</li>
      </ul>

      <Callout type="tip" title="Good News">
        Many states offer CPA reciprocity for Canadian CPAs. You may be able to get a US CPA license without retaking all exams.
      </Callout>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Job Titles That Work</h2>
      <div className="overflow-x-auto mb-8">
        <table className="w-full text-sm text-fg-secondary border border-border rounded-lg">
          <thead><tr className="bg-surface-secondary"><th className="p-3 text-left font-semibold text-fg">✅ Good Titles</th><th className="p-3 text-left font-semibold text-fg">❌ Problematic Titles</th></tr></thead>
          <tbody>
            <tr className="border-t border-border"><td className="p-3">Staff Accountant</td><td className="p-3">Bookkeeper</td></tr>
            <tr className="border-t border-border"><td className="p-3">Senior Accountant</td><td className="p-3">Accounts Payable Clerk</td></tr>
            <tr className="border-t border-border"><td className="p-3">Tax Accountant</td><td className="p-3">Financial Analyst (use different category)</td></tr>
            <tr className="border-t border-border"><td className="p-3">Audit Manager</td><td className="p-3">Controller (may work, but less clear)</td></tr>
            <tr className="border-t border-border"><td className="p-3">Forensic Accountant</td><td className="p-3">Finance Manager</td></tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Big 4 Transfers</h2>
      <p className="text-fg-secondary mb-4">
        If you work at Deloitte, PwC, EY, or KPMG in Canada, internal transfers to US offices are common:
      </p>
      <ul className="list-disc pl-6 space-y-2 text-fg-secondary mb-8">
        <li><strong>Process:</strong> HR handles most paperwork; you provide documents</li>
        <li><strong>Timeline:</strong> Usually 2–4 weeks for internal transfers</li>
        <li><strong>Support:</strong> Big 4 have immigration teams to help</li>
        <li><strong>Locations:</strong> NYC, Chicago, LA, and other major cities have large offices</li>
      </ul>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Job Duties to Include</h2>
      <p className="text-fg-secondary mb-4">Your offer letter should describe accounting work:</p>
      <ul className="list-disc pl-6 space-y-2 text-fg-secondary mb-8">
        <li>Prepare and analyze financial statements</li>
        <li>Perform auditing procedures and testing</li>
        <li>Prepare tax returns and tax planning</li>
        <li>Maintain general ledger and accounting records</li>
        <li>Ensure compliance with GAAP/IFRS standards</li>
        <li>Advise on accounting policies and procedures</li>
      </ul>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Salary Expectations (2026)</h2>
      <div className="overflow-x-auto mb-8">
        <table className="w-full text-sm text-fg-secondary border border-border rounded-lg">
          <thead><tr className="bg-surface-secondary"><th className="p-3 text-left font-semibold text-fg">Role</th><th className="p-3 text-left font-semibold text-fg">Public Accounting</th><th className="p-3 text-left font-semibold text-fg">Industry</th></tr></thead>
          <tbody>
            <tr className="border-t border-border"><td className="p-3 font-medium">Staff/Associate</td><td className="p-3">$60,000–$75,000</td><td className="p-3">$55,000–$70,000</td></tr>
            <tr className="border-t border-border"><td className="p-3 font-medium">Senior</td><td className="p-3">$75,000–$100,000</td><td className="p-3">$70,000–$95,000</td></tr>
            <tr className="border-t border-border"><td className="p-3 font-medium">Manager</td><td className="p-3">$100,000–$140,000</td><td className="p-3">$95,000–$130,000</td></tr>
            <tr className="border-t border-border"><td className="p-3 font-medium">Senior Manager</td><td className="p-3">$140,000–$180,000</td><td className="p-3">$130,000–$170,000</td></tr>
            <tr className="border-t border-border"><td className="p-3 font-medium">Director/Partner</td><td className="p-3">$200,000+</td><td className="p-3">$180,000+</td></tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Documents Checklist</h2>
      <ul className="list-disc pl-6 space-y-2 text-fg-secondary mb-8">
        <li>Canadian passport</li>
        <li>Bachelor&apos;s degree (if using degree path)</li>
        <li>CPA/CA/CGA/CMA certificate (if using designation path)</li>
        <li>Letter of good standing from provincial CPA body</li>
        <li>Job offer letter with accounting duties</li>
        <li>Resume showing accounting experience</li>
        <li>{poeLandTotalLabel()} fee (land border)</li>
      </ul>

      <Callout type="warning" title="Common Issue">
        &quot;Financial Analyst&quot; doesn&apos;t clearly fall under Accountant. If your role is analytical, consider applying as Management Consultant or Economist instead.
      </Callout>

      <div className="mt-12 pt-8 border-t border-border">
        <h2 className="text-xl font-bold text-fg mb-4">Related Resources</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link href="/professions/accountant" className="card card-interactive p-4 text-center font-medium text-accent">Accountant Profession Details</Link>
          <Link href="/jobs" className="card card-interactive p-4 text-center font-medium text-accent">Accounting Jobs</Link>
          <Link href="/employer-letter" className="card card-interactive p-4 text-center font-medium text-accent">Offer Letter Template</Link>
          <Link href="/credentials" className="card card-interactive p-4 text-center font-medium text-accent">Credential Evaluation</Link>
        </div>
      </div>
    </ContentLayout>
  )
}
