import type { Metadata } from 'next'
import { withCanonical } from '@/lib/seo'
import Link from 'next/link'
import ContentLayout from '@/components/layout/ContentLayout'
import { Callout } from '@/components/ui/Callout'

export const metadata: Metadata = withCanonical('/self-employment', {
  title: 'TN Visa Self-Employment Rules (Banned Since 2025)',
  description: 'Self-employment is explicitly prohibited on a TN visa since June 2025. Learn what counts as self-employment, the 1099 gray area, and visa alternatives for entrepreneurs.',
})

export default function SelfEmploymentPage() {
  return (
    <ContentLayout
      title="TN Visa & Self-Employment"
      description="As of June 2025, USCIS formally banned self-employment on TN visas. Here's what that means and what your alternatives are."
      breadcrumbs={[{ label: 'Self-Employment', href: '/self-employment' }]}
      lastUpdated="April 2026"
    >
      <Callout type="danger" title="Self-Employment Is Prohibited">
        Self-employment on a TN visa can result in visa revocation, removal from the United States, and bars to future entry. This applies even if you formed a US company.
      </Callout>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">The Rule</h2>
      <p className="text-fg-secondary mb-4">
        In its June 2025 policy update, USCIS formally codified what had been informal guidance for years: <strong>self-employment is not permitted on TN visa status</strong>.
      </p>
      <p className="text-fg-secondary mb-4">
        TN status requires employment with a <strong>bona fide U.S.-based employer</strong>. The employer must be an independent entity that controls the work — not a company owned or controlled by the TN visa holder themselves.
      </p>
      <p className="text-fg-secondary mb-8">
        This means you cannot start a company in the US and have that company sponsor your own TN visa. You also cannot work as a freelancer or independent consultant without a genuine employer-employee relationship.
      </p>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">What Counts as Self-Employment</h2>
      <p className="text-fg-secondary mb-4">USCIS considers the following to be self-employment, all of which disqualify you from TN status:</p>
      <ul className="list-disc pl-6 space-y-2 text-fg-secondary mb-8">
        <li><strong>Sole or controlling shareholder:</strong> If you own more than 50% of the company that sponsors your TN visa, that&apos;s self-employment.</li>
        <li><strong>Independent contractor without employer control:</strong> If you set your own hours, choose your own clients, and control how the work is done, there is no genuine employer-employee relationship.</li>
        <li><strong>Foreign employer doing business in the US:</strong> If you own a Canadian company and have it &quot;hire&quot; you to work in the US, USCIS will likely view this as self-employment.</li>
        <li><strong>Sole proprietorship or partnership:</strong> Operating any business where you are the principal is self-employment regardless of how it&apos;s structured.</li>
      </ul>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Can I Work as a 1099 Contractor?</h2>
      <p className="text-fg-secondary mb-4">
        This is a gray area. The key question is whether a <strong>genuine employer-employee relationship</strong> exists, regardless of how you&apos;re classified for tax purposes.
      </p>
      <p className="text-fg-secondary mb-4">A 1099 arrangement <strong>may</strong> qualify if:</p>
      <ul className="list-disc pl-6 space-y-2 text-fg-secondary mb-4">
        <li>The company controls <strong>what</strong> work you do, <strong>when</strong> you do it, and <strong>how</strong> you do it</li>
        <li>You work primarily or exclusively for one company</li>
        <li>The company provides tools, equipment, or workspace</li>
        <li>The company sets your schedule and deadlines</li>
      </ul>
      <p className="text-fg-secondary mb-4">A 1099 arrangement <strong>does not</strong> qualify if:</p>
      <ul className="list-disc pl-6 space-y-2 text-fg-secondary mb-8">
        <li>You set your own hours and work independently</li>
        <li>You have multiple clients simultaneously</li>
        <li>You control how the work is performed</li>
        <li>You invoice for completed projects rather than receiving regular pay</li>
      </ul>

      <Callout type="warning" title="High Risk">
        Even if your 1099 arrangement looks like employment, CBP officers and USCIS adjudicators may disagree. If you&apos;re working as a contractor, have an immigration lawyer evaluate your specific situation before applying.
      </Callout>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Alternatives for Entrepreneurs</h2>
      <p className="text-fg-secondary mb-4">If you want to run your own business in the US, these visa categories may be options:</p>

      <div className="space-y-4 mb-8">
        <div className="card p-5">
          <h3 className="font-semibold text-fg mb-1">E-1 Treaty Trader</h3>
          <p className="text-sm text-fg-secondary">For Canadian citizens engaged in substantial trade between Canada and the US. Requires that over 50% of your trade is between the two countries. No minimum investment amount, but trade must be &quot;substantial.&quot;</p>
        </div>
        <div className="card p-5">
          <h3 className="font-semibold text-fg mb-1">E-2 Treaty Investor</h3>
          <p className="text-sm text-fg-secondary">For Canadian citizens investing a substantial amount in a US business. No fixed minimum, but typically $100,000+ is expected. You must actively direct and develop the business. Renewable indefinitely.</p>
        </div>
        <div className="card p-5">
          <h3 className="font-semibold text-fg mb-1">O-1 Extraordinary Ability</h3>
          <p className="text-sm text-fg-secondary">For individuals with extraordinary ability in sciences, arts, education, business, or athletics. Requires evidence of sustained national or international acclaim. High bar, but allows self-petitioning through an agent.</p>
        </div>
        <div className="card p-5">
          <h3 className="font-semibold text-fg mb-1">L-1 Intracompany Transferee</h3>
          <p className="text-sm text-fg-secondary">For employees transferring from a Canadian office to a US office of the same company. Requires that you&apos;ve worked for the company abroad for at least 1 year. You can open a new US office under L-1.</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Can I Start a Side Business?</h2>
      <p className="text-fg-secondary mb-4">
        <strong>No.</strong> TN status authorizes you to work only for the employer listed on your TN approval. Any business activity outside that employment — including freelancing, consulting on the side, or running an online business — violates your status.
      </p>
      <p className="text-fg-secondary mb-8">
        This includes passive business activities like managing rental properties, running an e-commerce store, or providing paid consulting outside your TN employment. While enforcement varies, the risk of status revocation is real.
      </p>

      <Callout type="info" title="Passive Investment Is Generally OK">
        Passive investment (owning stocks, real estate held by a property manager, silent partnership) is generally permitted because it does not constitute &quot;work.&quot; However, actively managing those investments crosses the line.
      </Callout>

      <div className="mt-12 pt-8 border-t border-border">
        <h2 className="text-xl font-bold text-fg mb-4">Related Resources</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link href="/eligibility" className="card card-interactive p-4 text-center font-medium text-accent">Check Your Eligibility</Link>
          <Link href="/apply" className="card card-interactive p-4 text-center font-medium text-accent">How to Apply</Link>
          <Link href="/employer-letter" className="card card-interactive p-4 text-center font-medium text-accent">Employer Letter Guide</Link>
          <Link href="/green-card" className="card card-interactive p-4 text-center font-medium text-accent">Green Card Pathways</Link>
        </div>
      </div>
    </ContentLayout>
  )
}
