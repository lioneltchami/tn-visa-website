import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import ContentLayout from '@/components/layout/ContentLayout'
import { Callout } from '@/components/ui/Callout'
import AffiliateLink from '@/components/ui/AffiliateLink'
import AffiliateDisclosure from '@/components/ui/AffiliateDisclosure'

export const metadata: Metadata = {
  title: 'Moving to the US from Canada: Complete 2026 Financial Guide',
  description: 'Everything Canadian TN visa holders need to know about banking, credit, taxes, health insurance, and housing when moving to the US in 2026.',
}

export default function MovingFinancialGuideBlogPost() {
  return (
    <ContentLayout
      title="Moving to the US from Canada: Complete 2026 Financial Guide"
      description="Banking, credit, taxes, insurance, housing — the financial checklist every Canadian needs before and after crossing the border."
      breadcrumbs={[{ label: 'Blog', href: '/blog' }, { label: 'Moving Financial Guide', href: '/blog/canadian-moving-to-us-2026' }]}
      lastUpdated="April 2026"
    >
      <AffiliateDisclosure />

      <div className="rounded-xl overflow-hidden mb-8 -mt-2">
        <Image src="https://images.unsplash.com/photo-1534430480872-3498386e7856?w=1200&h=400&fit=crop" alt="City skyline" width={1200} height={400} className="w-full h-48 sm:h-64 object-cover" />
      </div>

      <Callout type="info" title="Before You Move">
        Start your financial prep 2–3 months before your move date. Some steps — like building US credit — are much easier to start from Canada.
      </Callout>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Before You Move</h2>
      <ul className="list-disc pl-6 space-y-2 text-fg-secondary mb-8">
        <li><strong>Keep your Canadian bank accounts open</strong> — you&apos;ll need them for tax refunds, RRSP access, and transfers</li>
        <li><strong>Apply for a US credit card from Canada</strong> — RBC and TD offer cross-border products that give you a head start</li>
        <li><strong>Set up a <AffiliateLink offer="wise-account">Wise multi-currency account</AffiliateLink></strong> to move money between CAD and USD at the real exchange rate</li>
        <li><strong>Gather your <Link href="/documents" className="text-accent hover:underline">documents</Link></strong> — you&apos;ll need them for SSN, banking, and housing applications</li>
      </ul>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Your First Week in the US</h2>
      <p className="text-fg-secondary mb-4">
        <strong>Day 1–2:</strong> Apply for your Social Security Number at your local SSA office. Bring your passport, TN approval (I-94), and offer letter. Processing takes 2–4 weeks.
      </p>
      <p className="text-fg-secondary mb-8">
        <strong>Day 3–5:</strong> Open a US bank account. Chase, Bank of America, and Wells Fargo all accept TN visa holders with a passport and I-94. You don&apos;t need an SSN to open an account — you can add it later.
      </p>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Banking &amp; Credit</h2>
      <p className="text-fg-secondary mb-4">
        You arrive in the US with <strong>zero credit history</strong>. Your Canadian score doesn&apos;t transfer. To build credit fast: get a secured credit card, become an authorized user on a colleague&apos;s card, or use services like Nova Credit that translate your Canadian credit history for US lenders.
      </p>
      <p className="text-fg-secondary mb-8">
        For ongoing transfers between Canada and the US, <AffiliateLink offer="wise-account">Wise</AffiliateLink> consistently offers the best rates — far cheaper than bank wire transfers.
      </p>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Taxes: Dual Filing Your First Year</h2>
      <p className="text-fg-secondary mb-4">
        The year you move, you&apos;ll likely file taxes in <strong>both countries</strong>. In Canada, you file as an emigrant for the portion of the year you were resident. In the US, you may qualify as a resident alien under the Substantial Presence Test (SPT) or elect to file as one.
      </p>
      <p className="text-fg-secondary mb-8">
        The Canada-US tax treaty prevents double taxation, but you need to file correctly to claim treaty benefits. See our <Link href="/taxes" className="text-accent hover:underline">complete tax guide</Link> for details.
      </p>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Health Insurance</h2>
      <p className="text-fg-secondary mb-8">
        Most TN holders get insurance through their employer — review your plan carefully, as US healthcare works very differently from OHIP/MSP. If your employer doesn&apos;t offer coverage, you can purchase a plan through the ACA marketplace (healthcare.gov). Don&apos;t go without coverage — a single ER visit can cost $5,000+.
      </p>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Housing Without Credit History</h2>
      <p className="text-fg-secondary mb-8">
        Landlords run credit checks, and you won&apos;t have a US score. Prepare to offer 2–3 months&apos; rent upfront, provide your employer letter and offer letter as proof of income, or use a corporate housing service for your first few months. Some landlords accept international credit reports via Nova Credit.
      </p>

      <div className="mt-12 pt-8 border-t border-border">
        <h2 className="text-xl font-bold text-fg mb-4">Related</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link href="/taxes" className="card card-interactive p-4 text-center font-medium text-accent">Tax Guide</Link>
          <Link href="/moving" className="card card-interactive p-4 text-center font-medium text-accent">Moving Checklist</Link>
          <Link href="/documents" className="card card-interactive p-4 text-center font-medium text-accent">Required Documents</Link>
        </div>
      </div>
    </ContentLayout>
  )
}
