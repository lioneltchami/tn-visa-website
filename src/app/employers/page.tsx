import type { Metadata } from 'next'
import ContentLayout from '@/components/layout/ContentLayout'
import { Callout } from '@/components/ui/Callout'

export const metadata: Metadata = {
  title: 'Guide for U.S. Employers',
  description: 'What U.S. employers need to know about sponsoring Canadian TN visa workers under USMCA.',
}

export default function EmployersPage() {
  return (
    <ContentLayout
      title="Guide for U.S. Employers"
      description="What employers need to know about sponsoring Canadian TN visa workers."
      breadcrumbs={[{label:'Employers', href:'/employers'}]}
      lastUpdated="April 2026"
    >
      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">What the Employer Must Do</h2>
      <ul className="list-disc pl-6 mb-6 space-y-2">
        <li>Provide a written job offer for a USMCA-listed profession</li>
        <li>Write a detailed employer support letter</li>
        <li>Employ the worker as a W-2 employee (not 1099 contractor)</li>
        <li>Withhold applicable federal, state, and FICA taxes</li>
        <li>Maintain compliance — notify USCIS of material changes</li>
      </ul>

      <Callout type="danger" title="Self-Employment Prohibited">
        TN workers cannot be self-employed or work for a company they own or control. The employer-employee relationship must be genuine, with the employer directing and controlling the work.
      </Callout>

      <h2 className="text-2xl font-bold mt-10 mb-4">Employer Eligibility Rules</h2>
      <ul className="list-disc pl-6 mb-6 space-y-2">
        <li><strong>Must be U.S.-based</strong> — strictly enforced since July 2025; the employing entity must have a physical U.S. presence</li>
        <li><strong>Canadian subsidiary&apos;s U.S. branch CAN qualify</strong> — as long as the U.S. entity is the actual employer</li>
        <li><strong>Staffing agencies face increased scrutiny</strong> — must demonstrate genuine control over the worker&apos;s duties</li>
        <li><strong>Independent contractor arrangements NOT allowed</strong> — must be W-2 employment with proper tax withholding</li>
      </ul>

      <h2 className="text-2xl font-bold mt-10 mb-4">Employer Support Letter Requirements</h2>
      <p className="mb-3">The support letter must include:</p>
      <ul className="list-disc pl-6 mb-6 space-y-2">
        <li>Company name, address, and EIN</li>
        <li>Job title matching a USMCA profession</li>
        <li>Detailed description of duties</li>
        <li>Qualifications required for the position</li>
        <li>How the applicant meets those qualifications</li>
        <li>Proposed start date and end date (max 3 years)</li>
        <li>Salary or compensation details</li>
        <li>Statement that the position is temporary (nonimmigrant intent)</li>
        <li>Signature of authorized company representative</li>
      </ul>

      <Callout type="warning" title="Material Changes Require New Application">
        Any material change in job duties, work location, or employer requires a new TN application. The worker cannot simply begin new duties — they must obtain fresh authorization first.
      </Callout>

      <h2 className="text-2xl font-bold mt-10 mb-4">Remote Work Rules</h2>
      <ul className="list-disc pl-6 mb-6 space-y-2">
        <li>The worker must be employed by a U.S. entity regardless of work location</li>
        <li>The primary work location stated on the application must be accurate</li>
        <li>Remote work from a different U.S. state may require an amended petition</li>
        <li>Working remotely from Canada for extended periods may jeopardize TN status</li>
      </ul>
    </ContentLayout>
  )
}
