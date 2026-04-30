import ContentLayout from '@/components/layout/ContentLayout'
import JsonLd from '@/components/JsonLd'
import { Callout } from '@/components/ui/Callout'
import FeeCalculator from '@/components/tools/FeeCalculator'
import fees from '@/data/fees.json'

export default function FeesPage() {
  return (
    <ContentLayout
      title="TN Visa Fees & Costs"
      description="Calculate your total costs for TN visa application, renewal, and dependents."
      breadcrumbs={[{label:'Fees', href:'/fees'}]}
      lastUpdated="April 2026"
    >
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "TN Visa Fee Calculator",
        "description": "Calculate your total TN visa application costs including filing fees, premium processing, and dependent fees.",
        "url": "https://tnvisaguide.ca/fees",
        "applicationCategory": "FinanceApplication",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
      }} />
      <p className="text-sm text-fg-muted mb-6">All fees shown in USD. Approximate CAD equivalents shown where applicable (rate: 1 USD = 1.38 CAD).</p>
      <FeeCalculator />

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Fee Breakdown</h2>

      <h3 className="text-xl font-semibold mt-6 mb-3">Port of Entry (POE) Fees</h3>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-border mb-6">
          <thead>
            <tr className="bg-bg-secondary">
              <th className="border border-border px-4 py-2 text-left font-semibold text-fg">Fee</th>
              <th className="border border-border px-4 py-2 text-left font-semibold text-fg">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-border px-4 py-2 text-fg-secondary">TN Processing Fee</td>
              <td className="border border-border px-4 py-2 text-fg-secondary">${fees.poe.processingFee}</td>
            </tr>
            <tr>
              <td className="border border-border px-4 py-2 text-fg-secondary">I-94 Fee (Land Border)</td>
              <td className="border border-border px-4 py-2 text-fg-secondary">${fees.poe.i94LandBorder}</td>
            </tr>
            <tr>
              <td className="border border-border px-4 py-2 text-fg-secondary">I-94 Fee (Airport)</td>
              <td className="border border-border px-4 py-2 text-fg-secondary">${fees.poe.i94Airport === 0 ? '$0 (included in airfare)' : `$${fees.poe.i94Airport}`}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="text-xl font-semibold mt-6 mb-3">Form I-129 Petition Fees</h3>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-border mb-6">
          <thead>
            <tr className="bg-bg-secondary">
              <th className="border border-border px-4 py-2 text-left font-semibold text-fg">Employer Size</th>
              <th className="border border-border px-4 py-2 text-left font-semibold text-fg">I-129 Fee</th>
              <th className="border border-border px-4 py-2 text-left font-semibold text-fg">Asylum Program Fee</th>
              <th className="border border-border px-4 py-2 text-left font-semibold text-fg">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-border px-4 py-2 text-fg-secondary">Large Employer (&gt;25 employees)</td>
              <td className="border border-border px-4 py-2 text-fg-secondary">${fees.i129.largeFiling.toLocaleString()}</td>
              <td className="border border-border px-4 py-2 text-fg-secondary">${fees.i129.largeAsylum.toLocaleString()}</td>
              <td className="border border-border px-4 py-2 font-semibold text-fg">${(fees.i129.largeFiling + fees.i129.largeAsylum).toLocaleString()}</td>
            </tr>
            <tr>
              <td className="border border-border px-4 py-2 text-fg-secondary">Small Employer (≤25 employees)</td>
              <td className="border border-border px-4 py-2 text-fg-secondary">${fees.i129.smallFiling.toLocaleString()}</td>
              <td className="border border-border px-4 py-2 text-fg-secondary">${fees.i129.smallAsylum.toLocaleString()}</td>
              <td className="border border-border px-4 py-2 font-semibold text-fg">${(fees.i129.smallFiling + fees.i129.smallAsylum).toLocaleString()}</td>
            </tr>
            <tr>
              <td className="border border-border px-4 py-2 text-fg-secondary">Qualifying Nonprofit</td>
              <td className="border border-border px-4 py-2 text-fg-secondary">${fees.i129.nonprofitFiling.toLocaleString()}</td>
              <td className="border border-border px-4 py-2 text-fg-secondary">${fees.i129.nonprofitAsylum}</td>
              <td className="border border-border px-4 py-2 font-semibold text-fg">${(fees.i129.nonprofitFiling + fees.i129.nonprofitAsylum).toLocaleString()}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="text-xl font-semibold mt-6 mb-3">Premium Processing</h3>
      <p className="mb-4">
        Premium processing guarantees a response within 15 business days for an additional fee of <strong>${fees.premiumProcessing.toLocaleString()}</strong>.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">Other Potential Costs</h3>
      <ul className="list-disc pl-6 mb-6 space-y-2">
        <li>Credential evaluation (WES, IQAS): ${fees.other.credentialEval.min}–${fees.other.credentialEval.max}</li>
        <li>Certified translations: ${fees.other.translations.min}–${fees.other.translations.max} per document</li>
        <li>Immigration attorney: ${fees.other.attorney.min.toLocaleString()}–${fees.other.attorney.max.toLocaleString()}</li>
        <li>TD visa for dependents (land border): ${fees.other.tdLandBorder}/person (I-94 fee)</li>
        <li>TD visa for dependents (airport): ${fees.other.tdAirport === 0 ? '$0' : `$${fees.other.tdAirport}`}</li>
        <li>Passport photos: $15–$20</li>
      </ul>

      <Callout type="info" title="I-94 Fee Increase">
        The I-94 fee increased from $6 to ${fees.poe.i94LandBorder} at land borders effective September 30, 2025.
      </Callout>

      <Callout type="info" title="Premium Processing Increase">
        Premium processing increased to ${fees.premiumProcessing.toLocaleString()} effective March 1, 2026.
      </Callout>
    </ContentLayout>
  )
}
