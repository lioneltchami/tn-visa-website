import type { Metadata } from 'next'
import { withCanonical } from '@/lib/seo'
import Image from 'next/image'
import Link from 'next/link'
import ContentLayout from '@/components/layout/ContentLayout'
import { Callout } from '@/components/ui/Callout'
import JsonLd from '@/components/JsonLd'
import { blogArticleSchema } from '@/lib/article-schema'

export const metadata: Metadata = withCanonical('/blog/tn-visa-remote-work-rules-2026', {
  title: 'Working Remotely on TN Visa 2026: Rules, Risks & Best Practices',
  description: 'Can you work remotely on a TN visa? Rules for working from home, traveling while employed, and what happens if you work from Canada.',
})

export default function TNVisaRemoteWork2026() {
  return (
    <ContentLayout
      title="Working Remotely on TN Visa 2026: What You Need to Know"
      description="Remote work is common, but TN visa rules weren't designed for it. Here's how to stay compliant."
      breadcrumbs={[{ label: 'Blog', href: '/blog' }, { label: 'Remote Work on TN 2026', href: '/blog/tn-visa-remote-work-rules-2026' }]}
      lastUpdated="May 2026"
    >
      <JsonLd data={blogArticleSchema({ headline: 'Working Remotely on TN Visa 2026: Rules, Risks & Best Practices', datePublished: '2026-05-09', dateModified: '2026-05-09', path: '/blog/tn-visa-remote-work-rules-2026' })} />

      <div className="rounded-xl overflow-hidden mb-8 -mt-2">
        <Image src="https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=1200&h=400&fit=crop" alt="Remote work setup" width={1200} height={400} className="w-full h-48 sm:h-64 object-cover" />
      </div>

      <Callout type="warning" title="Key Rule">
        TN visa requires you to work IN the United States. Extended remote work from Canada or other countries can jeopardize your status.
      </Callout>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">The Basic Rule</h2>
      <p className="text-fg-secondary mb-4">
        Your TN visa authorizes you to work for a specific US employer at a specific US location. The assumption is that you&apos;re physically present in the US performing that work.
      </p>
      <p className="text-fg-secondary mb-8">
        Working remotely <strong>within the US</strong> (from your home, a coffee shop, while traveling domestically) is generally fine. The issues arise when you work from <strong>outside the US</strong>.
      </p>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Remote Work Scenarios</h2>

      <div className="space-y-4 mb-8">
        <div className="card p-5 border-l-4 border-l-green-500">
          <h3 className="font-semibold text-fg mb-2">✅ Working from home in the US</h3>
          <p className="text-fg-secondary text-sm">Completely fine. Your home office in Texas, California, or anywhere in the US is acceptable.</p>
        </div>

        <div className="card p-5 border-l-4 border-l-green-500">
          <h3 className="font-semibold text-fg mb-2">✅ Occasional work while traveling in the US</h3>
          <p className="text-fg-secondary text-sm">Working from a hotel in another state during a vacation is fine.</p>
        </div>

        <div className="card p-5 border-l-4 border-l-yellow-500">
          <h3 className="font-semibold text-fg mb-2">⚠️ Short trips to Canada (1–2 weeks)</h3>
          <p className="text-fg-secondary text-sm">Gray area. Occasional short visits where you check email are generally tolerated, but shouldn&apos;t be a regular pattern.</p>
        </div>

        <div className="card p-5 border-l-4 border-l-red-500">
          <h3 className="font-semibold text-fg mb-2">❌ Extended work from Canada</h3>
          <p className="text-fg-secondary text-sm">Working from Canada for weeks or months undermines your TN status. You&apos;re supposed to be in the US.</p>
        </div>

        <div className="card p-5 border-l-4 border-l-red-500">
          <h3 className="font-semibold text-fg mb-2">❌ Living in Canada, commuting to US</h3>
          <p className="text-fg-secondary text-sm">TN requires US residence. Living in Canada and crossing daily/weekly is problematic.</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Why This Matters</h2>
      <ul className="list-disc pl-6 space-y-2 text-fg-secondary mb-8">
        <li><strong>TN renewal risk:</strong> CBP may question why you need TN if you&apos;re not in the US</li>
        <li><strong>Tax complications:</strong> Working from Canada creates Canadian tax obligations</li>
        <li><strong>Status maintenance:</strong> Extended absence may be seen as abandoning TN status</li>
        <li><strong>Employer liability:</strong> Your employer may have payroll/tax issues</li>
      </ul>

      <Callout type="info" title="The 30-Day Guideline">
        While there&apos;s no official rule, immigration attorneys generally suggest keeping trips outside the US under 30 days to avoid questions about whether you&apos;ve abandoned your status.
      </Callout>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">What Your Offer Letter Should Say</h2>
      <p className="text-fg-secondary mb-4">
        If your role is remote-first, your offer letter should still specify a US work location:
      </p>
      <div className="card p-5 bg-surface-secondary mb-8">
        <p className="text-fg-secondary text-sm italic">
          &quot;Position: Software Engineer (Remote)<br />
          Primary Work Location: San Francisco, CA<br />
          This position allows remote work from any location within the United States.&quot;
        </p>
      </div>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Traveling While on TN</h2>
      <p className="text-fg-secondary mb-4">You can travel freely, but keep these points in mind:</p>
      <ul className="list-disc pl-6 space-y-2 text-fg-secondary mb-8">
        <li><strong>Carry your documents:</strong> Passport, I-94, offer letter when crossing borders</li>
        <li><strong>Short trips are fine:</strong> Vacations, family visits, conferences</li>
        <li><strong>Re-entry:</strong> You&apos;ll go through TN inspection each time you return</li>
        <li><strong>Don&apos;t overstay abroad:</strong> Extended absence raises questions</li>
      </ul>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Working for a Canadian Company Remotely</h2>
      <p className="text-fg-secondary mb-4">
        This is a common question: &quot;Can I live in the US on TN and work remotely for a Canadian company?&quot;
      </p>
      <p className="text-fg-secondary mb-8">
        <strong>No.</strong> TN status is tied to a specific US employer. You cannot use TN to work for a non-US company, even remotely. You would need a different visa or work authorization.
      </p>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Best Practices for Remote TN Workers</h2>
      <ul className="list-disc pl-6 space-y-2 text-fg-secondary mb-8">
        <li><strong>Maintain US residence:</strong> Keep a US address, bank accounts, driver&apos;s license</li>
        <li><strong>Limit time outside US:</strong> Keep international trips short and infrequent</li>
        <li><strong>Document your presence:</strong> Keep records showing you live/work in the US</li>
        <li><strong>Pay US taxes:</strong> File as a US tax resident</li>
        <li><strong>Communicate with employer:</strong> Ensure they understand the requirements</li>
        <li><strong>Get it in writing:</strong> Have your US work location documented</li>
      </ul>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">What If Your Company Is Fully Remote?</h2>
      <p className="text-fg-secondary mb-4">
        Many tech companies have no physical office. This is fine for TN purposes as long as:
      </p>
      <ul className="list-disc pl-6 space-y-2 text-fg-secondary mb-8">
        <li>The company is a US entity (incorporated in the US)</li>
        <li>You work from within the United States</li>
        <li>Your offer letter specifies a US location (even if it&apos;s your home address)</li>
        <li>You&apos;re paid through US payroll</li>
      </ul>

      <Callout type="tip" title="Bottom Line">
        Remote work on TN is fine — as long as &quot;remote&quot; means working from somewhere in the United States. The visa requires your physical presence in the US.
      </Callout>

      <div className="mt-12 pt-8 border-t border-border">
        <h2 className="text-xl font-bold text-fg mb-4">Related Resources</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link href="/taxes" className="card card-interactive p-4 text-center font-medium text-accent">Tax Guide for TN Workers</Link>
          <Link href="/employer-letter" className="card card-interactive p-4 text-center font-medium text-accent">Offer Letter Template</Link>
          <Link href="/renewal" className="card card-interactive p-4 text-center font-medium text-accent">TN Renewal Guide</Link>
          <Link href="/moving" className="card card-interactive p-4 text-center font-medium text-accent">Moving to the US Guide</Link>
        </div>
      </div>
    </ContentLayout>
  )
}
