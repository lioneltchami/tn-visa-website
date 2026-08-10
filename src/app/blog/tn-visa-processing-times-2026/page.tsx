import type { Metadata } from 'next'
import { withCanonical } from '@/lib/seo'
import Image from 'next/image'
import Link from 'next/link'
import ContentLayout from '@/components/layout/ContentLayout'
import { Callout } from '@/components/ui/Callout'
import JsonLd from '@/components/JsonLd'
import { blogArticleSchema } from '@/lib/article-schema'
import { i129TotalRangeLabel, poeLandTotalLabel, premiumLabel } from '@/lib/fees'

export const metadata: Metadata = withCanonical('/blog/tn-visa-processing-times-2026', {
  title: 'TN Visa Processing Times 2026: How Long Does It Take?',
  description: 'Current TN visa processing times for 2026. Border processing, consulate appointments, mail-in applications, and premium processing options explained.',
})

export default function TNVisaProcessingTimes2026() {
  return (
    <ContentLayout
      title="TN Visa Processing Times 2026: How Long Does It Take?"
      description="From same-day approval to weeks of waiting — here's what to expect for each TN application method."
      breadcrumbs={[{ label: 'Blog', href: '/blog' }, { label: 'Processing Times 2026', href: '/blog/tn-visa-processing-times-2026' }]}
      lastUpdated="May 2026"
    >
      <JsonLd data={blogArticleSchema({ headline: 'TN Visa Processing Times 2026: How Long Does It Take?', datePublished: '2026-05-09', dateModified: '2026-05-09', path: '/blog/tn-visa-processing-times-2026' })} />

      <div className="rounded-xl overflow-hidden mb-8 -mt-2">
        <Image src="https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=1200&h=400&fit=crop" alt="Clock and calendar" width={1200} height={400} className="w-full h-48 sm:h-64 object-cover" />
      </div>

      <Callout type="tip" title="Good News for 2026">
        Border processing remains the fastest option — most applicants are approved in under 30 minutes. No appointment needed.
      </Callout>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Processing Times by Method</h2>
      <div className="overflow-x-auto mb-8">
        <table className="w-full text-sm text-fg-secondary border border-border rounded-lg">
          <thead><tr className="bg-surface-secondary"><th className="p-3 text-left font-semibold text-fg">Method</th><th className="p-3 text-left font-semibold text-fg">Processing Time</th><th className="p-3 text-left font-semibold text-fg">Cost</th><th className="p-3 text-left font-semibold text-fg">Best For</th></tr></thead>
          <tbody>
            <tr className="border-t border-border"><td className="p-3 font-medium">Port of Entry (Border)</td><td className="p-3">15–60 minutes</td><td className="p-3">{poeLandTotalLabel()}</td><td className="p-3">Most applicants</td></tr>
            <tr className="border-t border-border"><td className="p-3 font-medium">US Consulate (Canada)</td><td className="p-3">1–3 weeks</td><td className="p-3">$185</td><td className="p-3">Complex cases</td></tr>
            <tr className="border-t border-border"><td className="p-3 font-medium">USCIS Mail (Form I-129)</td><td className="p-3">3–6 months</td><td className="p-3">{i129TotalRangeLabel()}</td><td className="p-3">Change of status</td></tr>
            <tr className="border-t border-border"><td className="p-3 font-medium">USCIS Premium Processing</td><td className="p-3">15 business days</td><td className="p-3">{premiumLabel()}</td><td className="p-3">Urgent cases</td></tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Port of Entry (Recommended)</h2>
      <p className="text-fg-secondary mb-4">
        The fastest and cheapest option. Drive or fly to a US port of entry, present your documents, and get approved on the spot.
      </p>
      <h3 className="text-lg font-semibold text-fg mt-6 mb-3">What affects wait time?</h3>
      <ul className="list-disc pl-6 space-y-2 text-fg-secondary mb-8">
        <li><strong>Time of day</strong> — Early morning (6–8am) is usually fastest</li>
        <li><strong>Day of week</strong> — Tuesdays and Wednesdays are less busy</li>
        <li><strong>Border crossing</strong> — Smaller crossings are faster than major ones</li>
        <li><strong>Document quality</strong> — Complete, organized documents speed things up</li>
        <li><strong>Officer questions</strong> — Simple cases: 15 min. Complex cases: 45–60 min</li>
      </ul>

      <Callout type="info" title="Pro Tip">
        Peace Bridge (Buffalo), Ambassador Bridge (Detroit), and Pacific Highway (Vancouver) have dedicated TN processing. Avoid weekends and holidays.
      </Callout>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">US Consulate Processing</h2>
      <p className="text-fg-secondary mb-4">
        If you prefer not to apply at the border, you can schedule an appointment at a US consulate in Canada.
      </p>
      <h3 className="text-lg font-semibold text-fg mt-6 mb-3">Current wait times (May 2026)</h3>
      <div className="overflow-x-auto mb-8">
        <table className="w-full text-sm text-fg-secondary border border-border rounded-lg">
          <thead><tr className="bg-surface-secondary"><th className="p-3 text-left font-semibold text-fg">Consulate</th><th className="p-3 text-left font-semibold text-fg">Appointment Wait</th></tr></thead>
          <tbody>
            <tr className="border-t border-border"><td className="p-3">Toronto</td><td className="p-3">5–10 business days</td></tr>
            <tr className="border-t border-border"><td className="p-3">Vancouver</td><td className="p-3">7–14 business days</td></tr>
            <tr className="border-t border-border"><td className="p-3">Calgary</td><td className="p-3">3–7 business days</td></tr>
            <tr className="border-t border-border"><td className="p-3">Montreal</td><td className="p-3">5–12 business days</td></tr>
            <tr className="border-t border-border"><td className="p-3">Ottawa</td><td className="p-3">3–5 business days</td></tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">USCIS Mail-In (Form I-129)</h2>
      <p className="text-fg-secondary mb-4">
        This method is for people already in the US who need to change status or extend their TN. It&apos;s the slowest option.
      </p>
      <h3 className="text-lg font-semibold text-fg mt-6 mb-3">Current USCIS processing times</h3>
      <ul className="list-disc pl-6 space-y-2 text-fg-secondary mb-8">
        <li><strong>California Service Center:</strong> 4–6 months</li>
        <li><strong>Vermont Service Center:</strong> 3–5 months</li>
        <li><strong>Premium Processing:</strong> 15 business days guaranteed</li>
      </ul>

      <Callout type="warning" title="Important">
        While your I-129 is pending, you can continue working if you filed before your current status expired. But you cannot travel — leaving the US voids your pending application.
      </Callout>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Premium Processing: Worth It?</h2>
      <p className="text-fg-secondary mb-4">
        For {premiumLabel()} extra, USCIS guarantees a decision within 15 business days. If they don&apos;t meet the deadline, you get a refund.
      </p>
      <h3 className="text-lg font-semibold text-fg mt-6 mb-3">When premium processing makes sense:</h3>
      <ul className="list-disc pl-6 space-y-2 text-fg-secondary mb-8">
        <li>You&apos;re already in the US and can&apos;t leave to apply at the border</li>
        <li>Your employer needs you to start immediately</li>
        <li>You have an urgent travel need</li>
        <li>Your employer is willing to pay the fee</li>
      </ul>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Factors That Slow Down Processing</h2>
      <ul className="list-disc pl-6 space-y-2 text-fg-secondary mb-8">
        <li><strong>Incomplete documents</strong> — Missing offer letter details, unclear job duties</li>
        <li><strong>Unusual profession</strong> — Less common TN categories get more scrutiny</li>
        <li><strong>Previous visa issues</strong> — Past denials or overstays</li>
        <li><strong>Name check delays</strong> — Common names may require additional verification</li>
        <li><strong>Request for Evidence (RFE)</strong> — Adds 60–90 days to USCIS processing</li>
      </ul>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">How to Speed Things Up</h2>
      <ol className="list-decimal pl-6 space-y-3 text-fg-secondary mb-8">
        <li><strong>Use the border</strong> — It&apos;s 100x faster than USCIS mail</li>
        <li><strong>Prepare perfect documents</strong> — Use our <Link href="/documents" className="text-accent hover:underline">document checklist</Link></li>
        <li><strong>Get a strong offer letter</strong> — See our <Link href="/employer-letter" className="text-accent hover:underline">template</Link></li>
        <li><strong>Go early on a weekday</strong> — Avoid peak times</li>
        <li><strong>Choose a smaller border crossing</strong> — Less traffic, faster processing</li>
      </ol>

      <div className="mt-12 pt-8 border-t border-border">
        <h2 className="text-xl font-bold text-fg mb-4">Related Resources</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link href="/apply/port-of-entry" className="card card-interactive p-4 text-center font-medium text-accent">Port of Entry Guide</Link>
          <Link href="/documents" className="card card-interactive p-4 text-center font-medium text-accent">Document Checklist</Link>
          <Link href="/processing-times" className="card card-interactive p-4 text-center font-medium text-accent">Live Processing Times</Link>
          <Link href="/border-interview" className="card card-interactive p-4 text-center font-medium text-accent">Border Interview Tips</Link>
        </div>
      </div>
    </ContentLayout>
  )
}
