import type { Metadata } from 'next'
import { withCanonical } from '@/lib/seo'
import Link from 'next/link'
import ContentLayout from '@/components/layout/ContentLayout'
import { Callout } from '@/components/ui/Callout'
import JsonLd from '@/components/JsonLd'
import { blogArticleSchema } from '@/lib/article-schema'

export const metadata: Metadata = withCanonical('/blog/tn-visa-green-card-path-2026', {
  title: 'TN Visa to Green Card 2026: Pathways & Timing Strategy',
  description: 'How to transition from TN visa to green card. EB-2, EB-3, PERM process, timing strategies, and how to maintain TN status during the process.',
})

export default function TNVisaGreenCard2026() {
  return (
    <ContentLayout
      title="TN Visa to Green Card 2026: Your Path to Permanent Residency"
      description="Yes, you can get a green card while on TN status. Here's how to do it right."
      breadcrumbs={[{ label: 'Blog', href: '/blog' }, { label: 'TN to Green Card 2026', href: '/blog/tn-visa-green-card-path-2026' }]}
      lastUpdated="May 2026"
    >
      <JsonLd data={blogArticleSchema({ headline: 'TN Visa to Green Card 2026: Pathways & Timing Strategy', datePublished: '2026-05-09', dateModified: '2026-05-09', path: '/blog/tn-visa-green-card-path-2026' })} />

      <Callout type="warning" title="The Dual Intent Problem">
        TN visa does NOT allow dual intent. You cannot openly pursue a green card while maintaining TN status. But there are legal strategies to navigate this.
      </Callout>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Understanding the Challenge</h2>
      <p className="text-fg-secondary mb-4">
        The TN visa requires &quot;non-immigrant intent&quot; — you must intend to return to Canada when your employment ends. A green card application signals immigrant intent, which technically conflicts with TN status.
      </p>
      <p className="text-fg-secondary mb-8">
        However, thousands of Canadians successfully transition from TN to green card every year. The key is timing and strategy.
      </p>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Green Card Categories for TN Holders</h2>
      <div className="overflow-x-auto mb-8">
        <table className="w-full text-sm text-fg-secondary border border-border rounded-lg">
          <thead><tr className="bg-surface-secondary"><th className="p-3 text-left font-semibold text-fg">Category</th><th className="p-3 text-left font-semibold text-fg">Requirements</th><th className="p-3 text-left font-semibold text-fg">Timeline</th></tr></thead>
          <tbody>
            <tr className="border-t border-border"><td className="p-3 font-medium">EB-1A (Extraordinary Ability)</td><td className="p-3">Exceptional achievements in field</td><td className="p-3">6–12 months</td></tr>
            <tr className="border-t border-border"><td className="p-3 font-medium">EB-1B (Outstanding Researcher)</td><td className="p-3">Research position + recognition</td><td className="p-3">6–12 months</td></tr>
            <tr className="border-t border-border"><td className="p-3 font-medium">EB-2 (Advanced Degree)</td><td className="p-3">Master&apos;s+ or Bachelor&apos;s + 5 years</td><td className="p-3">2–3 years</td></tr>
            <tr className="border-t border-border"><td className="p-3 font-medium">EB-2 NIW (National Interest Waiver)</td><td className="p-3">Work benefits US national interest</td><td className="p-3">1–2 years</td></tr>
            <tr className="border-t border-border"><td className="p-3 font-medium">EB-3 (Skilled Worker)</td><td className="p-3">Bachelor&apos;s degree + job offer</td><td className="p-3">2–4 years</td></tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">The PERM Process</h2>
      <p className="text-fg-secondary mb-4">
        Most employment-based green cards (EB-2, EB-3) require PERM labor certification:
      </p>
      <ol className="list-decimal pl-6 space-y-3 text-fg-secondary mb-8">
        <li><strong>Prevailing wage determination</strong> — DOL determines minimum salary (2–3 months)</li>
        <li><strong>Recruitment</strong> — Employer advertises position to US workers (2–3 months)</li>
        <li><strong>PERM application</strong> — Filed with DOL (6–12 months for approval)</li>
        <li><strong>I-140 petition</strong> — Filed with USCIS (4–6 months, or 15 days premium)</li>
        <li><strong>I-485 adjustment</strong> — Final green card application (6–18 months)</li>
      </ol>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Timing Strategy: The Safe Approach</h2>
      <p className="text-fg-secondary mb-4">
        The safest strategy is to switch to H-1B before filing for a green card:
      </p>
      <div className="card p-5 mb-8">
        <h3 className="font-semibold text-fg mb-3">Recommended Timeline</h3>
        <ol className="list-decimal pl-6 space-y-2 text-fg-secondary">
          <li><strong>Year 1–2:</strong> Work on TN, establish yourself at the company</li>
          <li><strong>Year 2–3:</strong> Employer files H-1B petition (allows dual intent)</li>
          <li><strong>Once on H-1B:</strong> Start PERM process openly</li>
          <li><strong>Year 4–6:</strong> Complete green card process</li>
        </ol>
      </div>

      <Callout type="info" title="Why H-1B First?">
        H-1B explicitly allows dual intent. Once you&apos;re on H-1B, you can pursue a green card without any conflict. This is the cleanest path.
      </Callout>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">The Riskier Direct Approach</h2>
      <p className="text-fg-secondary mb-4">
        Some people file for green cards while on TN status. This works but has risks:
      </p>
      <ul className="list-disc pl-6 space-y-2 text-fg-secondary mb-8">
        <li><strong>PERM filing:</strong> Generally considered safe — it&apos;s an employer action</li>
        <li><strong>I-140 filing:</strong> Moderate risk — shows intent but not definitive</li>
        <li><strong>I-485 filing:</strong> High risk — this is the actual green card application</li>
      </ul>
      <p className="text-fg-secondary mb-8">
        The risk is at TN renewal. If a CBP officer sees a pending I-485, they may deny your TN renewal due to immigrant intent.
      </p>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Maintaining TN During Green Card Process</h2>
      <ul className="list-disc pl-6 space-y-2 text-fg-secondary mb-8">
        <li><strong>Don&apos;t volunteer information</strong> — You don&apos;t have to mention pending applications</li>
        <li><strong>Renew via USCIS mail</strong> — Avoids border officer questions</li>
        <li><strong>Keep ties to Canada</strong> — Property, bank accounts, family connections</li>
        <li><strong>Be prepared to explain</strong> — If asked, have a consistent story</li>
        <li><strong>Consider H-1B switch</strong> — Eliminates the dual intent problem entirely</li>
      </ul>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">EB-2 NIW: The Self-Petition Option</h2>
      <p className="text-fg-secondary mb-4">
        National Interest Waiver lets you self-petition without employer sponsorship:
      </p>
      <ul className="list-disc pl-6 space-y-2 text-fg-secondary mb-8">
        <li>No PERM required (saves 1–2 years)</li>
        <li>No employer sponsorship needed</li>
        <li>Must prove your work benefits the US national interest</li>
        <li>Works well for researchers, entrepreneurs, specialized professionals</li>
      </ul>

      <Callout type="tip" title="Canadian Advantage">
        As a Canadian, you have no visa backlog. Once your I-140 is approved, you can file I-485 immediately. Citizens of India and China often wait 10+ years.
      </Callout>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Realistic Timeline for Canadians</h2>
      <div className="overflow-x-auto mb-8">
        <table className="w-full text-sm text-fg-secondary border border-border rounded-lg">
          <thead><tr className="bg-surface-secondary"><th className="p-3 text-left font-semibold text-fg">Path</th><th className="p-3 text-left font-semibold text-fg">Total Time</th></tr></thead>
          <tbody>
            <tr className="border-t border-border"><td className="p-3">EB-1A/EB-1B (if you qualify)</td><td className="p-3">8–18 months</td></tr>
            <tr className="border-t border-border"><td className="p-3">EB-2 NIW</td><td className="p-3">12–24 months</td></tr>
            <tr className="border-t border-border"><td className="p-3">EB-2/EB-3 with PERM</td><td className="p-3">2–4 years</td></tr>
            <tr className="border-t border-border"><td className="p-3">TN → H-1B → EB-2/EB-3</td><td className="p-3">3–5 years</td></tr>
          </tbody>
        </table>
      </div>

      <div className="mt-12 pt-8 border-t border-border">
        <h2 className="text-xl font-bold text-fg mb-4">Related Resources</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link href="/green-card" className="card card-interactive p-4 text-center font-medium text-accent">Full Green Card Guide</Link>
          <Link href="/blog/tn-visa-vs-h1b-2026" className="card card-interactive p-4 text-center font-medium text-accent">TN vs H-1B Comparison</Link>
          <Link href="/renewal" className="card card-interactive p-4 text-center font-medium text-accent">TN Renewal Guide</Link>
          <Link href="/compare" className="card card-interactive p-4 text-center font-medium text-accent">Visa Comparison</Link>
        </div>
      </div>
    </ContentLayout>
  )
}
