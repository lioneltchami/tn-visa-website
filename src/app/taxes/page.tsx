import ContentLayout from '@/components/layout/ContentLayout'
import TableOfContents from '@/components/ui/TableOfContents'
import { Callout } from '@/components/ui/Callout'
import AffiliateLink from '@/components/ui/AffiliateLink'
import AffiliateDisclosure from '@/components/ui/AffiliateDisclosure'
import SPTCalculator from '@/components/tools/SPTCalculator'

export default function TaxesPage() {
  return (
    <ContentLayout
      title="Tax Implications for TN Visa Holders"
      description="U.S. and Canadian tax obligations, the Substantial Presence Test, and required forms."
      breadcrumbs={[{label:'Taxes', href:'/taxes'}]}
      lastUpdated="April 2026"
    >
      <TableOfContents headings={[
        { id: 'spt', text: 'Substantial Presence Test', level: 2 },
        { id: 'treaty', text: 'Canada-U.S. Tax Treaty', level: 2 },
        { id: 'social-security', text: 'Social Security & Medicare', level: 2 },
        { id: 'rrsp', text: 'RRSP & 401(k)', level: 2 },
        { id: 'forms', text: 'Required Forms', level: 2 },
        { id: 'fbar', text: 'FBAR & FATCA', level: 2 },
        { id: 'no-tax-states', text: 'States With No Income Tax', level: 2 },
      ]} />
      <AffiliateDisclosure />
      <SPTCalculator />

      <h2 id="spt" className="text-2xl font-bold text-fg mt-12 mb-4">Substantial Presence Test (SPT)</h2>
      <p className="mb-4">
        The IRS uses the Substantial Presence Test to determine if you are a U.S. tax resident. You meet the test if:
      </p>
      <ul className="list-disc pl-6 mb-4 space-y-2">
        <li>You were present in the U.S. for at least <strong>31 days</strong> during the current year, AND</li>
        <li>The sum of the following equals <strong>183 days or more</strong>:</li>
      </ul>
      <div className="bg-bg-secondary p-4 rounded-lg mb-6 font-mono text-sm text-fg">
        (Days in current year × 1) + (Days in year-1 × 1/3) + (Days in year-2 × 1/6) ≥ 183
      </div>

      <Callout type="tip">
        Most TN workers meet the Substantial Presence Test within their first or second calendar year in the U.S., making them U.S. tax residents.
      </Callout>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Canada-U.S. Tax Treaty</h2>
      <ul className="list-disc pl-6 mb-6 space-y-2">
        <li><strong>Prevents double taxation</strong> — income is not taxed twice through foreign tax credits</li>
        <li><strong>Tie-breaker rules</strong> — if both countries claim you as a resident, the treaty determines which has primary taxing rights</li>
        <li><strong>Foreign tax credits</strong> — taxes paid to one country offset obligations in the other</li>
      </ul>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Social Security & Medicare</h2>
      <ul className="list-disc pl-6 mb-6 space-y-2">
        <li><strong>Social Security:</strong> 6.2% of wages (employer matches)</li>
        <li><strong>Medicare:</strong> 1.45% of wages (employer matches)</li>
        <li><strong>Totalization Agreement:</strong> Canada-U.S. agreement prevents double contributions and allows combining credits from both countries for benefit eligibility</li>
      </ul>

      <h2 id="rrsp" className="text-2xl font-bold text-fg mt-12 mb-4">RRSP & 401(k)</h2>
      <ul className="list-disc pl-6 mb-6 space-y-2">
        <li><strong>RRSP:</strong> Growth is tax-deferred in the U.S. under the tax treaty (must file Form 8891 election or rely on treaty)</li>
        <li><strong>401(k):</strong> Contributions reduce U.S. taxable income but are NOT deductible in Canada</li>
        <li><strong>Returning to Canada:</strong> 401(k) can be rolled into an RRSP (within limits) to avoid double taxation</li>
      </ul>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Required Forms</h2>

      <h3 className="text-xl font-semibold mt-6 mb-3">U.S. Tax Forms</h3>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-border mb-6">
          <thead>
            <tr className="bg-bg-secondary">
              <th className="border border-border px-4 py-2 text-left font-semibold text-fg">Form</th>
              <th className="border border-border px-4 py-2 text-left font-semibold text-fg">Purpose</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-border px-4 py-2 text-fg-secondary">1040</td>
              <td className="border border-border px-4 py-2 text-fg-secondary">U.S. individual income tax return (residents)</td>
            </tr>
            <tr>
              <td className="border border-border px-4 py-2 text-fg-secondary">1040-NR</td>
              <td className="border border-border px-4 py-2 text-fg-secondary">Non-resident income tax return (first year if not yet resident)</td>
            </tr>
            <tr>
              <td className="border border-border px-4 py-2 text-fg-secondary">8833</td>
              <td className="border border-border px-4 py-2 text-fg-secondary">Treaty-based return position disclosure</td>
            </tr>
            <tr>
              <td className="border border-border px-4 py-2 text-fg-secondary">8938</td>
              <td className="border border-border px-4 py-2 text-fg-secondary">FATCA — Statement of Specified Foreign Financial Assets</td>
            </tr>
            <tr>
              <td className="border border-border px-4 py-2 text-fg-secondary">FinCEN 114 (FBAR)</td>
              <td className="border border-border px-4 py-2 text-fg-secondary">Report of Foreign Bank and Financial Accounts</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="text-xl font-semibold mt-6 mb-3">Canadian Tax Forms</h3>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-border mb-6">
          <thead>
            <tr className="bg-bg-secondary">
              <th className="border border-border px-4 py-2 text-left font-semibold text-fg">Form</th>
              <th className="border border-border px-4 py-2 text-left font-semibold text-fg">Purpose</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-border px-4 py-2 text-fg-secondary">T1 General</td>
              <td className="border border-border px-4 py-2 text-fg-secondary">Canadian income tax return (report worldwide income if still resident)</td>
            </tr>
            <tr>
              <td className="border border-border px-4 py-2 text-fg-secondary">T1161</td>
              <td className="border border-border px-4 py-2 text-fg-secondary">List of properties by an emigrant of Canada</td>
            </tr>
            <tr>
              <td className="border border-border px-4 py-2 text-fg-secondary">T1243</td>
              <td className="border border-border px-4 py-2 text-fg-secondary">Deemed disposition of property upon emigration</td>
            </tr>
            <tr>
              <td className="border border-border px-4 py-2 text-fg-secondary">NR73</td>
              <td className="border border-border px-4 py-2 text-fg-secondary">Determination of residency status (optional but recommended)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">FBAR & FATCA</h2>
      <ul className="list-disc pl-6 mb-6 space-y-2">
        <li><strong>FBAR (FinCEN 114):</strong> Required if aggregate value of foreign accounts exceeds <strong>$10,000</strong> at any point during the year. Filed electronically by April 15 (auto-extension to October 15).</li>
        <li><strong>FATCA (Form 8938):</strong> Required if foreign assets exceed <strong>$50,000</strong> (single) or <strong>$100,000</strong> (married filing jointly) on last day of year, or $75,000/$150,000 at any point.</li>
      </ul>

      <Callout type="warning" title="FBAR Penalties">
        Penalties for FBAR non-filing: up to <strong>$16,536 per violation</strong> for non-willful failures. Willful violations can result in penalties up to $100,000 or 50% of account balance, plus potential criminal charges.
      </Callout>

      <Callout type="tip" title="Transferring Money Between Countries?">
        TN visa holders often need to move money between Canada and the US. <AffiliateLink href="https://wise.com/invite/" provider="wise">Wise (formerly TransferWise)</AffiliateLink> offers the best exchange rates and lowest fees for international transfers.
      </Callout>

      <h2 className="text-2xl font-bold text-fg mt-12 mb-4">States With No Income Tax</h2>
      <p className="mb-3">These U.S. states do not levy a state income tax:</p>
      <ul className="list-disc pl-6 mb-6 columns-2 space-y-1">
        <li>Alaska</li>
        <li>Florida</li>
        <li>Nevada</li>
        <li>New Hampshire*</li>
        <li>South Dakota</li>
        <li>Tennessee</li>
        <li>Texas</li>
        <li>Washington</li>
        <li>Wyoming</li>
      </ul>
      <p className="text-sm text-fg-muted">
        *New Hampshire taxes only interest and dividend income (phasing out fully by 2027).
      </p>
    </ContentLayout>
  )
}
