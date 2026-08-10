import JsonLd from "@/components/JsonLd";
import ContentLayout from "@/components/layout/ContentLayout";
import FeeCalculator from "@/components/tools/FeeCalculator";
import { Callout } from "@/components/ui/Callout";
import FeeSourceLinks from "@/components/ui/FeeSourceLinks";
import { approxCad, fees, premiumLabel, usd } from "@/lib/fees";

export default function FeesPage() {
	return (
		<ContentLayout
			title="TN Visa Fees & Costs"
			description="Calculate your total costs for TN visa application, renewal, and dependents."
			breadcrumbs={[{ label: "Fees", href: "/fees" }]}
			lastUpdated="August 2026"
		>
			<JsonLd
				data={{
					"@context": "https://schema.org",
					"@type": "WebApplication",
					name: "TN Visa Fee Calculator",
					description:
						"Calculate your total TN visa application costs including filing fees, premium processing, and dependent fees.",
					url: "https://tnvisaguide.ca/fees",
					applicationCategory: "FinanceApplication",
					offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
				}}
			/>
			<p className="text-sm text-fg-muted mb-6">
				All fees shown in USD (as of {fees.lastVerified}). Approximate CAD
				equivalents use 1 USD = {fees.usdToCad} CAD for rough planning only.
			</p>
			<FeeCalculator />

			<h2 className="text-2xl font-bold text-fg mt-12 mb-4">Fee Breakdown</h2>

			<h3 className="text-xl font-semibold mt-6 mb-3">
				Port of Entry (POE) Fees
			</h3>
			<div className="overflow-x-auto">
				<table className="w-full border-collapse border border-border mb-6">
					<thead>
						<tr className="bg-bg-secondary">
							<th className="border border-border px-4 py-2 text-left font-semibold text-fg">
								Fee
							</th>
							<th className="border border-border px-4 py-2 text-left font-semibold text-fg">
								Amount
							</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td className="border border-border px-4 py-2 text-fg-secondary">
								TN Processing Fee
							</td>
							<td className="border border-border px-4 py-2 text-fg-secondary">
								{usd(fees.poe.processingFee)}
							</td>
						</tr>
						<tr>
							<td className="border border-border px-4 py-2 text-fg-secondary">
								I-94 Fee (Land Border)
							</td>
							<td className="border border-border px-4 py-2 text-fg-secondary">
								{usd(fees.poe.i94LandBorder)}
							</td>
						</tr>
						<tr>
							<td className="border border-border px-4 py-2 text-fg-secondary">
								I-94 Fee (Airport)
							</td>
							<td className="border border-border px-4 py-2 text-fg-secondary">
								{fees.poe.i94Airport === 0
									? "$0 (included in airfare)"
									: usd(fees.poe.i94Airport)}
							</td>
						</tr>
					</tbody>
				</table>
			</div>

			<h3 className="text-xl font-semibold mt-6 mb-3">
				Form I-129 Petition Fees
			</h3>
			<div className="overflow-x-auto">
				<table className="w-full border-collapse border border-border mb-6">
					<thead>
						<tr className="bg-bg-secondary">
							<th className="border border-border px-4 py-2 text-left font-semibold text-fg">
								Employer Size
							</th>
							<th className="border border-border px-4 py-2 text-left font-semibold text-fg">
								I-129 Fee
							</th>
							<th className="border border-border px-4 py-2 text-left font-semibold text-fg">
								Asylum Program Fee
							</th>
							<th className="border border-border px-4 py-2 text-left font-semibold text-fg">
								Total
							</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td className="border border-border px-4 py-2 text-fg-secondary">
								Large Employer (&gt;25 employees)
							</td>
							<td className="border border-border px-4 py-2 text-fg-secondary">
								{usd(fees.i129.largeFiling)}
							</td>
							<td className="border border-border px-4 py-2 text-fg-secondary">
								{usd(fees.i129.largeAsylum)}
							</td>
							<td className="border border-border px-4 py-2 font-semibold text-fg">
								{usd(fees.i129.largeFiling + fees.i129.largeAsylum)}
							</td>
						</tr>
						<tr>
							<td className="border border-border px-4 py-2 text-fg-secondary">
								Small Employer (≤25 employees)
							</td>
							<td className="border border-border px-4 py-2 text-fg-secondary">
								{usd(fees.i129.smallFiling)}
							</td>
							<td className="border border-border px-4 py-2 text-fg-secondary">
								{usd(fees.i129.smallAsylum)}
							</td>
							<td className="border border-border px-4 py-2 font-semibold text-fg">
								{usd(fees.i129.smallFiling + fees.i129.smallAsylum)}
							</td>
						</tr>
						<tr>
							<td className="border border-border px-4 py-2 text-fg-secondary">
								Qualifying Nonprofit
							</td>
							<td className="border border-border px-4 py-2 text-fg-secondary">
								{usd(fees.i129.nonprofitFiling)}
							</td>
							<td className="border border-border px-4 py-2 text-fg-secondary">
								{usd(fees.i129.nonprofitAsylum)}
							</td>
							<td className="border border-border px-4 py-2 font-semibold text-fg">
								{usd(fees.i129.nonprofitFiling + fees.i129.nonprofitAsylum)}
							</td>
						</tr>
					</tbody>
				</table>
			</div>

			<h3 className="text-xl font-semibold mt-6 mb-3">Premium Processing</h3>
			<p className="mb-4 text-fg-secondary">
				Premium processing guarantees a response within 15 business days for an
				additional fee of <strong>{premiumLabel()}</strong> (
				{approxCad(fees.premiumProcessing)}).
			</p>

			<h3 className="text-xl font-semibold mt-6 mb-3">Other Potential Costs</h3>
			<ul className="list-disc pl-6 mb-6 space-y-2 text-fg-secondary">
				<li>
					Credential evaluation (WES, IQAS):{" "}
					{usd(fees.other.credentialEval.min)}–
					{usd(fees.other.credentialEval.max)}
				</li>
				<li>
					Certified translations: {usd(fees.other.translations.min)}–
					{usd(fees.other.translations.max)} per document
				</li>
				<li>
					Immigration attorney: {usd(fees.other.attorney.min)}–
					{usd(fees.other.attorney.max)}
				</li>
				<li>
					TD visa for dependents (land border): {usd(fees.other.tdLandBorder)}
					/person (I-94 fee)
				</li>
				<li>
					TD visa for dependents (airport):{" "}
					{fees.other.tdAirport === 0 ? "$0" : usd(fees.other.tdAirport)}
				</li>
				<li>Passport photos: $15–$20</li>
			</ul>

			<Callout type="info" title="I-94 Fee Increase">
				The I-94 fee increased from {usd(fees.poe.i94LandPrevious)} to{" "}
				{usd(fees.poe.i94LandBorder)} at land borders effective{" "}
				{fees.poe.i94LandEffective}.
			</Callout>

			<Callout type="info" title="Premium Processing Increase">
				Premium processing increased from {usd(fees.premiumProcessingPrevious)}{" "}
				to {premiumLabel()} effective {fees.premiumProcessingEffective}.
			</Callout>

			<FeeSourceLinks />
		</ContentLayout>
	);
}
