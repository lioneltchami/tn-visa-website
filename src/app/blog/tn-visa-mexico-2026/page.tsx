import type { Metadata } from 'next'
import Link from 'next/link'
import ContentLayout from '@/components/layout/ContentLayout'
import { Callout } from '@/components/ui/Callout'

export const metadata: Metadata = {
  title: 'TN Visa for Mexican Professionals: 2026 Complete Guide',
  description: 'Mexican TN visa applicants face consular processing, in-person interviews, and higher denial rates. Step-by-step guide for 2026.',
}

export default function MexicoTNBlogPost() {
  return (
    <ContentLayout
      title="TN Visa for Mexican Professionals: 2026 Complete Guide"
      description="The TN visa process for Mexican citizens is fundamentally different from Canadians. Here's exactly what to expect and how to prepare."
      breadcrumbs={[{ label: 'Blog', href: '/blog' }, { label: 'TN Visa for Mexicans', href: '/blog/tn-visa-mexico-2026' }]}
      lastUpdated="April 2026"
    >
      <Callout type="warning" title="Key Difference: Visa Stamp Required">
        Unlike Canadians who apply at the border, Mexican citizens must go through consular processing at a US Embassy and obtain a visa stamp before entering the US.
      </Callout>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Key Differences from Canadians</h2>
      <ul className="list-disc pl-6 space-y-2 text-fg-secondary mb-8">
        <li><strong>Visa stamp required</strong> — Canadians are visa-exempt; Mexicans must get a physical visa stamp in their passport</li>
        <li><strong>Consular processing</strong> — you apply at a US Embassy/Consulate, not at the border</li>
        <li><strong>DS-160 form</strong> — required online application before your interview</li>
        <li><strong>In-person interview</strong> — mandatory at the consulate (required since September 2025)</li>
        <li><strong>Higher denial rates</strong> — 17.57% denial rate in 2023, and climbing</li>
        <li><strong>Longer timeline</strong> — expect 4–8 weeks from application to approval vs. same-day for Canadians</li>
      </ul>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">The Process: Step by Step</h2>
      <ol className="list-decimal pl-6 space-y-2 text-fg-secondary mb-8">
        <li><strong>Get your job offer</strong> — secure a position in a <Link href="/professions" className="text-accent hover:underline">qualifying TN profession</Link></li>
        <li><strong>Gather documents</strong> — degree, transcripts, employer support letter, credential evaluations if needed</li>
        <li><strong>Complete DS-160</strong> — the online nonimmigrant visa application at ceac.state.gov</li>
        <li><strong>Pay the fees</strong> — $185 MRV fee (DS-160) + $250 Visa Integrity and Border Security Fee</li>
        <li><strong>Schedule your interview</strong> — book at your nearest US Embassy/Consulate</li>
        <li><strong>Attend the interview</strong> — bring all original documents; the officer decides on the spot</li>
        <li><strong>Receive your passport</strong> — if approved, your passport is returned with the TN visa stamp (3–7 business days)</li>
        <li><strong>Enter the US</strong> — present your visa stamp at the port of entry</li>
      </ol>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">The In-Person Interview</h2>
      <p className="text-fg-secondary mb-8">
        Since September 2025, in-person interviews are required for all Mexican TN applicants. The consular officer will verify your qualifications, ask about your job duties, and assess whether your role matches a TN profession. Be prepared to explain your job in plain language — not just read from your employer letter.
      </p>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Higher Denial Rates</h2>
      <p className="text-fg-secondary mb-4">
        Mexican TN applicants face significantly higher denial rates than Canadians. In 2023, the denial rate was <strong>17.57%</strong> — and it&apos;s been climbing. Common reasons for denial:
      </p>
      <ul className="list-disc pl-6 space-y-1 text-fg-secondary mb-8">
        <li>Job duties don&apos;t clearly match the TN profession category</li>
        <li>Degree doesn&apos;t align with the claimed profession</li>
        <li>Weak employer support letter</li>
        <li>Officer suspects immigrant intent (214(b) denial)</li>
      </ul>
      <p className="text-fg-secondary mb-8">
        If you&apos;re <Link href="/denied" className="text-accent hover:underline">denied</Link>, you can reapply — there&apos;s no waiting period. But fix the underlying issue first.
      </p>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Costs</h2>
      <ul className="list-disc pl-6 space-y-1 text-fg-secondary mb-8">
        <li><strong>$185</strong> — DS-160 / MRV application fee (non-refundable)</li>
        <li><strong>$250</strong> — Visa Integrity and Border Security Fee (paid after approval, before visa issuance)</li>
        <li><strong>Total: $435</strong> — compared to $50 for Canadians at the border</li>
      </ul>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Tips for Success</h2>
      <ul className="list-disc pl-6 space-y-2 text-fg-secondary mb-8">
        <li><strong>Invest in your employer letter</strong> — this is the most important document. It must clearly map your duties to a TN profession</li>
        <li><strong>Bring original documents</strong> — degrees, transcripts, and professional licenses. Copies aren&apos;t enough</li>
        <li><strong>Practice your interview</strong> — be ready to explain your role, qualifications, and why you qualify</li>
        <li><strong>Show ties to Mexico</strong> — TN is a nonimmigrant visa; demonstrating you plan to return helps</li>
        <li><strong>Apply at a less busy consulate</strong> — wait times vary significantly between locations</li>
      </ul>

      <div className="mt-12 pt-8 border-t border-border">
        <h2 className="text-xl font-bold text-fg mb-4">Related</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link href="/apply" className="card card-interactive p-4 text-center font-medium text-accent">How to Apply</Link>
          <Link href="/professions" className="card card-interactive p-4 text-center font-medium text-accent">TN Professions List</Link>
          <Link href="/denied" className="card card-interactive p-4 text-center font-medium text-accent">Denied? Next Steps</Link>
          <Link href="/border-interview" className="card card-interactive p-4 text-center font-medium text-accent">Interview Prep</Link>
        </div>
      </div>
    </ContentLayout>
  )
}
