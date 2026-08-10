import type { Metadata } from 'next'
import { withCanonical } from '@/lib/seo'
import Link from 'next/link'
import ContentLayout from '@/components/layout/ContentLayout'
import { Callout } from '@/components/ui/Callout'
import AffiliateLink from '@/components/ui/AffiliateLink'
import AffiliateDisclosure from '@/components/ui/AffiliateDisclosure'
import JsonLd from '@/components/JsonLd'

export const metadata: Metadata = withCanonical('/employer-letter', {
  title: 'TN Visa Employer Letter Guide — Canadian Requirements',
  description: 'How to write a TN visa employer support letter that won\'t get denied. Required elements, sample structure, common mistakes, and profession-specific tips.',
})

export default function EmployerLetterPage() {
  return (
    <ContentLayout
      title="TN Visa Employer Support Letter Guide"
      description="The employer support letter is the single most important document in your TN application. A weak letter is the #1 reason for denials."
      breadcrumbs={[{ label: 'Employer Letter', href: '/employer-letter' }]}
      lastUpdated="April 2026"
    >
      <AffiliateDisclosure />

      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'HowTo', name: 'How to Write a TN Visa Employer Support Letter', description: 'Step-by-step guide to writing an employer support letter for TN visa applications.', step: [
        { '@type': 'HowToStep', name: 'Use company letterhead', text: 'Print the letter on official company letterhead with full contact information.' },
        { '@type': 'HowToStep', name: 'State the TN profession', text: 'Include the exact USMCA profession name that matches the applicant role.' },
        { '@type': 'HowToStep', name: 'Detail job duties', text: 'List 5-7 specific professional duties tied to the TN profession category.' },
        { '@type': 'HowToStep', name: 'Include qualifications', text: 'Reference the applicant degree, credentials, and relevant experience.' },
        { '@type': 'HowToStep', name: 'Add employment terms', text: 'Specify start date, end date, salary, and work location.' },
        { '@type': 'HowToStep', name: 'State temporary intent', text: 'Include language confirming the position is temporary.' },
      ] }} />
      <Callout type="danger" title="Job Title Must Match USMCA Exactly">
        The TN profession name in the letter must match the USMCA list exactly. &quot;Software Engineer&quot; is NOT the same as &quot;Engineer.&quot; &quot;Financial Analyst&quot; is NOT &quot;Economist.&quot; Check the <Link href="/professions" className="text-accent hover:underline font-medium">full profession list</Link> for exact names.
      </Callout>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Why the Support Letter Matters</h2>
      <p className="text-fg-secondary mb-4">
        The employer support letter is not just a formality — it <strong>is</strong> your application. The CBP officer or USCIS adjudicator uses it to determine whether you qualify for TN status. Everything else (degree, transcripts, resume) is supporting evidence for what the letter claims.
      </p>
      <p className="text-fg-secondary mb-8">
        Immigration lawyers consistently report that a weak, vague, or incomplete support letter is the <strong>#1 cause of TN visa denials</strong>. Since the June 2025 USCIS policy tightening, the bar for letter quality has risen significantly.
      </p>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Required Elements</h2>
      <p className="text-fg-secondary mb-4">Every TN visa employer support letter must include all of the following:</p>
      <ol className="list-decimal pl-6 space-y-3 text-fg-secondary mb-8">
        <li><strong>Company letterhead</strong> — official letterhead with company name, address, phone, and logo</li>
        <li><strong>Date and addressee</strong> — current date, addressed to &quot;U.S. Customs and Border Protection&quot; (for POE) or &quot;U.S. Citizenship and Immigration Services&quot; (for I-129)</li>
        <li><strong>Applicant&apos;s full legal name and citizenship</strong> — &quot;This letter is in support of [Full Name], a citizen of Canada&quot;</li>
        <li><strong>Specific TN profession category</strong> — must match the USMCA Appendix 2 list exactly (e.g., &quot;Engineer,&quot; &quot;Computer Systems Analyst,&quot; &quot;Accountant&quot;)</li>
        <li><strong>Detailed job duties</strong> — minimum 5-7 bullet points describing specific, professional-level duties. This is the most scrutinized section.</li>
        <li><strong>How duties relate to the TN profession</strong> — explicitly connect each duty to the USMCA profession category</li>
        <li><strong>Applicant&apos;s qualifications</strong> — degree name, institution, graduation year, professional licences, relevant experience</li>
        <li><strong>Employment terms</strong> — start date, end date (required for temporary intent), annual salary, work location (city and state)</li>
        <li><strong>Temporary nature statement</strong> — explicit language that the position is temporary and the applicant will depart the US when employment ends</li>
        <li><strong>Company description</strong> — 2-3 sentences about what the company does, size, and industry</li>
        <li><strong>Signature block</strong> — printed name, title, signature, phone number, and email of an authorized company representative (HR director, VP, or C-level)</li>
      </ol>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Sample Letter Structure</h2>
      <p className="text-fg-secondary mb-4">Use this outline as a starting point. Customize every section for your specific situation.</p>
      <div className="card p-6 bg-bg-secondary font-mono text-sm text-fg-secondary space-y-4 mb-8 overflow-x-auto">
        <p className="text-fg-muted italic">[Company Letterhead]</p>
        <p>[Date]</p>
        <p>U.S. Customs and Border Protection<br />Port of Entry<br />[City, State]</p>
        <p><strong>RE: TN Visa Application for [Full Legal Name] — [TN Profession Category]</strong></p>
        <p>Dear Officer:</p>
        <p>[Company Name] is a [brief company description — industry, size, what you do]. We are writing to support the TN visa application of [Full Name], a citizen of Canada, for the position of [Job Title] under the USMCA [TN Profession Category] classification.</p>
        <p><strong>Position and Duties:</strong><br />
        [Name] will serve as [Job Title] and will be responsible for:<br />
        • [Specific duty #1 — tied to TN profession]<br />
        • [Specific duty #2]<br />
        • [Specific duty #3]<br />
        • [Specific duty #4]<br />
        • [Specific duty #5]<br />
        • [Specific duty #6]<br />
        • [Specific duty #7]</p>
        <p><strong>Qualifications:</strong><br />
        [Name] holds a [Degree] in [Field] from [University], graduated [Year]. [He/She] also holds [professional licence/certification]. [He/She] has [X] years of experience in [relevant field].</p>
        <p><strong>Terms of Employment:</strong><br />
        Start date: [Date]<br />
        End date: [Date — must include an end date]<br />
        Salary: $[Amount] per year<br />
        Location: [City, State]</p>
        <p><strong>Temporary Nature:</strong><br />
        This position is temporary in nature. [Name] will depart the United States upon completion of [his/her] employment or expiration of [his/her] authorized stay.</p>
        <p>Sincerely,<br /><br />[Signature]<br />[Printed Name]<br />[Title]<br />[Phone] | [Email]</p>
      </div>

      <Callout type="info" title="This Is a Template, Not Legal Advice">
        This outline provides general guidance. Every application is different. For complex cases — especially Engineer, Management Consultant, or Scientific Technician — have an immigration lawyer review your letter before submitting.
      </Callout>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Common Mistakes</h2>
      <ul className="list-disc pl-6 space-y-2 text-fg-secondary mb-8">
        <li><strong>Vague job duties:</strong> &quot;Will perform engineering tasks&quot; is not enough. List 5-7 specific, measurable duties.</li>
        <li><strong>Wrong profession name:</strong> Using &quot;Software Engineer&quot; instead of &quot;Engineer&quot; or &quot;Computer Systems Analyst.&quot; The USMCA name must be exact.</li>
        <li><strong>Missing end date:</strong> Without an end date, the officer may question temporary intent. Always include one (up to 3 years).</li>
        <li><strong>No temporary language:</strong> The letter must explicitly state the position is temporary and the applicant will leave when it ends.</li>
        <li><strong>Too short:</strong> A one-page letter with generic language signals a weak case. Aim for 2-3 pages with detailed duties.</li>
        <li><strong>Duties don&apos;t match the profession:</strong> If applying as an Engineer, duties must involve engineering principles — not just coding or IT support.</li>
        <li><strong>Unsigned or wrong signatory:</strong> Must be signed by someone authorized to hire (HR director, VP, or above). A team lead or recruiter may not suffice.</li>
      </ul>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Profession-Specific Tips</h2>

      <h3 className="text-lg font-semibold mt-6 mb-2">
        <Link href="/professions/engineer" className="text-accent hover:underline">Engineer</Link>
      </h3>
      <p className="text-fg-secondary mb-4">
        Since June 2025, duties must involve the application of engineering principles. Specify the engineering discipline (mechanical, civil, electrical). Reference the applicant&apos;s engineering degree or PE/P.Eng licence. Avoid describing pure software development.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2">
        <Link href="/professions/computer-systems-analyst" className="text-accent hover:underline">Computer Systems Analyst</Link>
      </h3>
      <p className="text-fg-secondary mb-4">
        Emphasize systems analysis, design, and implementation — not programming. Describe how the role evaluates business requirements and designs technology solutions. Avoid listing coding as a primary duty.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2">
        <Link href="/professions/management-consultant" className="text-accent hover:underline">Management Consultant</Link>
      </h3>
      <p className="text-fg-secondary mb-4">
        Clearly describe the consulting engagement with a defined scope and timeline. Emphasize the advisory nature — the consultant recommends, management decides. Include specific deliverables. This cannot be a permanent operational role.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2">
        <Link href="/professions/accountant" className="text-accent hover:underline">Accountant</Link>
      </h3>
      <p className="text-fg-secondary mb-4">
        Reference the specific Canadian designation (CPA, CA, CGA, CMA) with the designation number. Detail professional accounting duties — auditing, tax preparation, financial reporting. Distinguish from bookkeeping.
      </p>

      <Callout type="warning" title="2026: Stricter Letter Requirements">
        Since the June 2025 USCIS policy update, CBP officers and USCIS adjudicators are scrutinizing support letters more closely than ever. Immigration lawyers report that &quot;the old, vague support letters that used to work are now grounds for denial.&quot; Invest the time to get your letter right.
      </Callout>

      <Callout type="tip" title="Best Investment You Can Make">
        Having an immigration lawyer review your employer letter is the single best investment in your TN application. <AffiliateLink offer="tnvisaexpert-services">TN Visa Expert offers professional letter review and full TN visa services</AffiliateLink> starting at $850.
      </Callout>

      <div className="mt-12 pt-8 border-t border-border">
        <h2 className="text-xl font-bold text-fg mb-4">Related Resources</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link href="/professions" className="card card-interactive p-4 text-center font-medium text-accent">All 63 TN Professions</Link>
          <Link href="/apply" className="card card-interactive p-4 text-center font-medium text-accent">How to Apply</Link>
          <Link href="/border-interview" className="card card-interactive p-4 text-center font-medium text-accent">Border Interview Guide</Link>
          <Link href="/denied" className="card card-interactive p-4 text-center font-medium text-accent">What If Denied?</Link>
        </div>
      </div>
    </ContentLayout>
  )
}
