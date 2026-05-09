import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import ContentLayout from '@/components/layout/ContentLayout'
import { Callout } from '@/components/ui/Callout'
import JsonLd from '@/components/JsonLd'

export const metadata: Metadata = {
  title: 'TN Visa Renewal 2026: Step-by-Step Process & Timeline',
  description: 'How to renew your TN visa in 2026. Border renewal vs mail-in, when to apply, required documents, and what happens if your job changes.',
}

export default function TNVisaRenewal2026() {
  return (
    <ContentLayout
      title="TN Visa Renewal 2026: Complete Guide"
      description="Your TN expires in 3 years, but you can renew indefinitely. Here's exactly how to do it."
      breadcrumbs={[{ label: 'Blog', href: '/blog' }, { label: 'TN Visa Renewal 2026', href: '/blog/tn-visa-renewal-2026' }]}
      lastUpdated="May 2026"
    >
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'Article', headline: 'TN Visa Renewal 2026: Step-by-Step Process & Timeline', datePublished: '2026-05-09', dateModified: '2026-05-09', author: { '@type': 'Organization', name: 'TN Visa Guide' } }} />

      <div className="rounded-xl overflow-hidden mb-8 -mt-2">
        <Image src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&h=400&fit=crop" alt="Document renewal" width={1200} height={400} className="w-full h-48 sm:h-64 object-cover" />
      </div>

      <Callout type="tip" title="Good News">
        TN status can be renewed indefinitely. There&apos;s no maximum number of renewals — people have maintained TN status for 10+ years.
      </Callout>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Renewal Options</h2>
      <div className="overflow-x-auto mb-8">
        <table className="w-full text-sm text-fg-secondary border border-border rounded-lg">
          <thead><tr className="bg-surface-secondary"><th className="p-3 text-left font-semibold text-fg">Method</th><th className="p-3 text-left font-semibold text-fg">Time</th><th className="p-3 text-left font-semibold text-fg">Cost</th><th className="p-3 text-left font-semibold text-fg">Best For</th></tr></thead>
          <tbody>
            <tr className="border-t border-border"><td className="p-3 font-medium">Border (re-entry)</td><td className="p-3">Same day</td><td className="p-3">$80</td><td className="p-3">Most people</td></tr>
            <tr className="border-t border-border"><td className="p-3 font-medium">USCIS Mail (I-129)</td><td className="p-3">3–6 months</td><td className="p-3">$695</td><td className="p-3">Can&apos;t travel</td></tr>
            <tr className="border-t border-border"><td className="p-3 font-medium">USCIS Premium</td><td className="p-3">15 days</td><td className="p-3">$2,805</td><td className="p-3">Urgent cases</td></tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">When to Renew</h2>
      <ul className="list-disc pl-6 space-y-2 text-fg-secondary mb-8">
        <li><strong>Border renewal:</strong> Can be done anytime, even years before expiration</li>
        <li><strong>USCIS mail:</strong> File up to 6 months before expiration</li>
        <li><strong>Don&apos;t wait until the last minute</strong> — Start planning 2–3 months ahead</li>
      </ul>

      <Callout type="warning" title="Important">
        If your TN expires while a USCIS renewal is pending, you can keep working but cannot travel. Leaving the US voids your pending application.
      </Callout>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Border Renewal: Step by Step</h2>
      <ol className="list-decimal pl-6 space-y-3 text-fg-secondary mb-8">
        <li><strong>Get a new offer letter</strong> from your employer (same format as original)</li>
        <li><strong>Gather documents:</strong> Passport, current I-94, degree, new offer letter</li>
        <li><strong>Drive to Canada</strong> — You must physically leave the US</li>
        <li><strong>Re-enter at a US port of entry</strong> and request TN renewal</li>
        <li><strong>Pay $80 fee</strong> and receive new I-94 with 3-year validity</li>
      </ol>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Documents for Renewal</h2>
      <ul className="list-disc pl-6 space-y-2 text-fg-secondary mb-8">
        <li>Valid Canadian passport (6+ months validity recommended)</li>
        <li>Current I-94 (print from <a href="https://i94.cbp.dhs.gov" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">i94.cbp.dhs.gov</a>)</li>
        <li>New offer letter from employer</li>
        <li>Original degree or certified copy</li>
        <li>Recent pay stubs (proves you&apos;re still employed)</li>
        <li>$80 fee</li>
      </ul>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">What If Your Job Changed?</h2>
      <h3 className="text-lg font-semibold text-fg mt-6 mb-3">Same employer, same role</h3>
      <p className="text-fg-secondary mb-4">Straightforward renewal. Just get a new offer letter.</p>

      <h3 className="text-lg font-semibold text-fg mt-6 mb-3">Same employer, different role</h3>
      <p className="text-fg-secondary mb-4">
        If your job duties changed significantly, you may need a new TN application (not just renewal). The new role must still qualify under a TN profession.
      </p>

      <h3 className="text-lg font-semibold text-fg mt-6 mb-3">Different employer</h3>
      <p className="text-fg-secondary mb-4">
        This is a new TN application, not a renewal. You&apos;ll need a complete application package from the new employer.
      </p>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">USCIS Mail Renewal (Form I-129)</h2>
      <p className="text-fg-secondary mb-4">Use this if you can&apos;t or don&apos;t want to travel to Canada:</p>
      <ol className="list-decimal pl-6 space-y-3 text-fg-secondary mb-8">
        <li>Employer files Form I-129 with USCIS</li>
        <li>Include TN supplement, offer letter, degree copy</li>
        <li>Pay $695 filing fee (+ $2,805 for premium processing)</li>
        <li>Wait 3–6 months (or 15 days with premium)</li>
        <li>Receive approval notice (I-797)</li>
      </ol>

      <Callout type="info" title="240-Day Rule">
        If you file for renewal before your TN expires, you can continue working for up to 240 days while the application is pending.
      </Callout>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Common Renewal Issues</h2>
      <ul className="list-disc pl-6 space-y-2 text-fg-secondary mb-8">
        <li><strong>Expired passport:</strong> Renew your passport before your TN renewal</li>
        <li><strong>Job title changed:</strong> Make sure new title still qualifies</li>
        <li><strong>Salary decreased:</strong> May raise questions — have explanation ready</li>
        <li><strong>Company name changed:</strong> Bring documentation of the change</li>
        <li><strong>Green card pending:</strong> Can complicate renewal — see our <Link href="/green-card" className="text-accent hover:underline">green card guide</Link></li>
      </ul>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Tips for Smooth Renewal</h2>
      <ul className="list-disc pl-6 space-y-2 text-fg-secondary mb-8">
        <li>Keep your documents organized and accessible</li>
        <li>Renew early — don&apos;t wait until the last month</li>
        <li>Use the same border crossing if it worked before</li>
        <li>Go on a weekday morning for shorter waits</li>
        <li>Bring extra copies of everything</li>
      </ul>

      <div className="mt-12 pt-8 border-t border-border">
        <h2 className="text-xl font-bold text-fg mb-4">Related Resources</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link href="/renewal" className="card card-interactive p-4 text-center font-medium text-accent">Full Renewal Guide</Link>
          <Link href="/documents" className="card card-interactive p-4 text-center font-medium text-accent">Document Checklist</Link>
          <Link href="/employer-letter" className="card card-interactive p-4 text-center font-medium text-accent">Offer Letter Template</Link>
          <Link href="/border-interview" className="card card-interactive p-4 text-center font-medium text-accent">Border Interview Tips</Link>
        </div>
      </div>
    </ContentLayout>
  )
}
