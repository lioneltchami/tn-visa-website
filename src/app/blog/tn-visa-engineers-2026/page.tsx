import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import ContentLayout from '@/components/layout/ContentLayout'
import { Callout } from '@/components/ui/Callout'
import JsonLd from '@/components/JsonLd'

export const metadata: Metadata = {
  title: 'TN Visa for Engineers 2026: Requirements, Degrees & Job Titles',
  description: 'Complete guide for Canadian engineers seeking TN visa status. Which engineering degrees qualify, job title requirements, and how to prove eligibility.',
}

export default function TNVisaEngineers2026() {
  return (
    <ContentLayout
      title="TN Visa for Engineers 2026: Complete Guide"
      description="Engineering is one of the most common TN categories. Here's everything you need to qualify."
      breadcrumbs={[{ label: 'Blog', href: '/blog' }, { label: 'TN Visa for Engineers 2026', href: '/blog/tn-visa-engineers-2026' }]}
      lastUpdated="May 2026"
    >
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'Article', headline: 'TN Visa for Engineers 2026: Requirements, Degrees & Job Titles', datePublished: '2026-05-09', dateModified: '2026-05-09', author: { '@type': 'Organization', name: 'TN Visa Guide' } }} />

      <div className="rounded-xl overflow-hidden mb-8 -mt-2">
        <Image src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&h=400&fit=crop" alt="Engineer at work" width={1200} height={400} className="w-full h-48 sm:h-64 object-cover" />
      </div>

      <Callout type="info" title="Key Requirement">
        The TN &quot;Engineer&quot; category requires a Baccalaureate degree in engineering. A computer science degree does NOT qualify for Engineer — use Computer Systems Analyst instead.
      </Callout>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Engineering Disciplines That Qualify</h2>
      <p className="text-fg-secondary mb-4">Any engineering degree from an accredited program qualifies:</p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-8">
        {['Mechanical Engineering', 'Electrical Engineering', 'Civil Engineering', 'Chemical Engineering', 'Aerospace Engineering', 'Biomedical Engineering', 'Environmental Engineering', 'Industrial Engineering', 'Materials Engineering', 'Nuclear Engineering', 'Petroleum Engineering', 'Software Engineering'].map(eng => (
          <div key={eng} className="bg-surface-secondary rounded-lg p-3 text-sm text-fg-secondary">{eng}</div>
        ))}
      </div>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Degree Requirements</h2>
      <ul className="list-disc pl-6 space-y-2 text-fg-secondary mb-8">
        <li><strong>Minimum:</strong> Bachelor&apos;s degree (B.Eng, B.A.Sc, B.Sc in Engineering)</li>
        <li><strong>Accreditation:</strong> Must be from CEAB-accredited program (Canadian Engineering Accreditation Board)</li>
        <li><strong>Transcripts:</strong> Bring official transcripts showing engineering coursework</li>
        <li><strong>P.Eng not required:</strong> Professional engineering license is NOT required for TN</li>
      </ul>

      <Callout type="warning" title="Common Mistake">
        &quot;Engineering Technology&quot; diplomas (3-year programs) do NOT qualify. You need a 4-year engineering degree.
      </Callout>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Job Titles That Work</h2>
      <p className="text-fg-secondary mb-4">Your job title should clearly indicate engineering work:</p>
      <div className="overflow-x-auto mb-8">
        <table className="w-full text-sm text-fg-secondary border border-border rounded-lg">
          <thead><tr className="bg-surface-secondary"><th className="p-3 text-left font-semibold text-fg">✅ Good Titles</th><th className="p-3 text-left font-semibold text-fg">❌ Problematic Titles</th></tr></thead>
          <tbody>
            <tr className="border-t border-border"><td className="p-3">Mechanical Engineer</td><td className="p-3">Project Manager</td></tr>
            <tr className="border-t border-border"><td className="p-3">Senior Electrical Engineer</td><td className="p-3">Technical Lead</td></tr>
            <tr className="border-t border-border"><td className="p-3">Civil Engineer II</td><td className="p-3">Developer</td></tr>
            <tr className="border-t border-border"><td className="p-3">Staff Software Engineer</td><td className="p-3">Consultant</td></tr>
            <tr className="border-t border-border"><td className="p-3">Design Engineer</td><td className="p-3">Analyst</td></tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Software Engineers: Special Considerations</h2>
      <p className="text-fg-secondary mb-4">
        &quot;Software Engineer&quot; is tricky because it can fall under two TN categories:
      </p>
      <ul className="list-disc pl-6 space-y-2 text-fg-secondary mb-8">
        <li><strong>Engineer</strong> — Requires a degree in Software Engineering or Computer Engineering</li>
        <li><strong>Computer Systems Analyst</strong> — Accepts Computer Science degrees</li>
      </ul>
      <p className="text-fg-secondary mb-8">
        If you have a CS degree, apply as Computer Systems Analyst even if your title is &quot;Software Engineer.&quot; See our <Link href="/blog/tn-visa-computer-science-degree-2026" className="text-accent hover:underline">CS degree guide</Link>.
      </p>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Job Duties to Emphasize</h2>
      <p className="text-fg-secondary mb-4">Your offer letter should describe engineering work:</p>
      <ul className="list-disc pl-6 space-y-2 text-fg-secondary mb-8">
        <li>Design and develop [mechanical/electrical/software] systems</li>
        <li>Perform engineering analysis and calculations</li>
        <li>Create technical specifications and documentation</li>
        <li>Test and validate engineering solutions</li>
        <li>Apply engineering principles to solve problems</li>
        <li>Collaborate with cross-functional engineering teams</li>
      </ul>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Documents Checklist</h2>
      <ul className="list-disc pl-6 space-y-2 text-fg-secondary mb-8">
        <li>Canadian passport</li>
        <li>Engineering degree (original or certified copy)</li>
        <li>Official transcripts</li>
        <li>Job offer letter with engineering duties</li>
        <li>Resume showing engineering experience</li>
        <li>$80 fee (land border) for border application</li>
      </ul>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Salary Expectations (2026)</h2>
      <div className="overflow-x-auto mb-8">
        <table className="w-full text-sm text-fg-secondary border border-border rounded-lg">
          <thead><tr className="bg-surface-secondary"><th className="p-3 text-left font-semibold text-fg">Engineering Type</th><th className="p-3 text-left font-semibold text-fg">Entry Level</th><th className="p-3 text-left font-semibold text-fg">Senior Level</th></tr></thead>
          <tbody>
            <tr className="border-t border-border"><td className="p-3">Software Engineer</td><td className="p-3">$90,000</td><td className="p-3">$180,000+</td></tr>
            <tr className="border-t border-border"><td className="p-3">Mechanical Engineer</td><td className="p-3">$70,000</td><td className="p-3">$130,000</td></tr>
            <tr className="border-t border-border"><td className="p-3">Electrical Engineer</td><td className="p-3">$75,000</td><td className="p-3">$140,000</td></tr>
            <tr className="border-t border-border"><td className="p-3">Civil Engineer</td><td className="p-3">$65,000</td><td className="p-3">$120,000</td></tr>
            <tr className="border-t border-border"><td className="p-3">Chemical Engineer</td><td className="p-3">$75,000</td><td className="p-3">$140,000</td></tr>
          </tbody>
        </table>
      </div>

      <Callout type="tip" title="Pro Tip">
        If your job title doesn&apos;t include &quot;Engineer,&quot; ask your employer to update it. &quot;Senior Mechanical Engineer&quot; is much clearer than &quot;Technical Specialist&quot; for TN purposes.
      </Callout>

      <div className="mt-12 pt-8 border-t border-border">
        <h2 className="text-xl font-bold text-fg mb-4">Related Resources</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link href="/professions/engineer" className="card card-interactive p-4 text-center font-medium text-accent">Engineer Profession Details</Link>
          <Link href="/blog/tn-visa-computer-science-degree-2026" className="card card-interactive p-4 text-center font-medium text-accent">CS Degree Guide</Link>
          <Link href="/employer-letter" className="card card-interactive p-4 text-center font-medium text-accent">Offer Letter Template</Link>
          <Link href="/jobs" className="card card-interactive p-4 text-center font-medium text-accent">Engineering Jobs</Link>
        </div>
      </div>
    </ContentLayout>
  )
}
