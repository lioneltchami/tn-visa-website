import type { Metadata } from "next";
import ContentLayout from "@/components/layout/ContentLayout";
import { Callout } from "@/components/ui/Callout";
import { ComparisonTable } from "@/components/ui/ComparisonTable";
import FeeSourceLinks from "@/components/ui/FeeSourceLinks";
import { StepList } from "@/components/ui/StepList";
import { fees, i129TotalRangeLabel, premiumLabel, usd } from "@/lib/fees";
import { withCanonical } from "@/lib/seo";

export const metadata: Metadata = withCanonical("/renewal", {
	title: "TN Visa Renewal Guide for Canadians",
	description:
		"How to renew your TN status, timing strategies, and the 240-day automatic extension rule.",
});

export default function RenewalPage() {
	return (
		<ContentLayout
			title="TN Visa Renewal & Extension"
			description="How to renew your TN status, timing, and the 240-day automatic extension rule."
			breadcrumbs={[{ label: "Renewal", href: "/renewal" }]}
			lastUpdated="April 2026"
		>
			<h2 className="text-2xl font-bold mb-4">Key Facts</h2>
			<ul className="list-disc pl-6 mb-6 space-y-2">
				<li>
					Each TN approval grants up to <strong>3 years</strong> of status
				</li>
				<li>
					<strong>Unlimited renewals</strong> — no cap on how many times you can
					extend
				</li>
				<li>No maximum cumulative duration on TN status</li>
			</ul>

			<Callout type="tip" title="No Maximum Duration">
				The old &quot;3-year limit&quot; is a myth — there is no maximum
				cumulative time you can spend in TN status. You can renew indefinitely
				as long as you maintain a valid nonimmigrant intent.
			</Callout>

			<h2 className="text-2xl font-bold text-fg mt-12 mb-4">Renewal Methods</h2>

			<h3 className="text-xl font-semibold mt-6 mb-3">
				Method 1: At the Port of Entry (POE)
			</h3>
			<StepList
				steps={[
					{
						title: "Gather documents",
						description:
							"Updated employer support letter, proof of qualifications, valid passport, current I-94.",
					},
					{
						title: "Travel to a U.S. port of entry",
						description:
							"Drive to a land border or fly into a U.S. airport with preclearance.",
					},
					{
						title: "Present your application to CBP",
						description: `Provide your support letter and documents to the officer. Pay the ${usd(fees.poe.processingFee)} processing fee + ${usd(fees.poe.i94LandBorder)} I-94 (land).`,
					},
					{
						title: "Receive new I-94",
						description:
							"If approved, you receive a new I-94 with a fresh 3-year validity period.",
					},
				]}
			/>

			<h3 className="text-xl font-semibold mt-6 mb-3">
				Method 2: Form I-129 (Employer Petition)
			</h3>
			<StepList
				steps={[
					{
						title: "Employer prepares Form I-129",
						description:
							"Your U.S. employer files the petition with USCIS on your behalf.",
					},
					{
						title: "Gather supporting documents",
						description:
							"Updated support letter, credentials, copy of current I-94, and filing fees.",
					},
					{
						title: "Submit to USCIS",
						description:
							"Mail the petition to the appropriate USCIS service center or file online.",
					},
					{
						title: "Wait for adjudication",
						description:
							"Standard processing takes 3–5 months. Premium processing guarantees 15 business days.",
					},
					{
						title: "Receive approval notice (I-797)",
						description:
							"Once approved, your status is extended. A new I-94 is attached to the approval notice.",
					},
				]}
			/>

			<h3 className="text-xl font-semibold mt-6 mb-3">
				Method 3: Form I-539 (For Dependents)
			</h3>
			<StepList
				steps={[
					{
						title: "File Form I-539",
						description:
							"TD dependents file I-539 to extend their status, often concurrently with the TN holder's I-129.",
					},
					{
						title: "Include supporting evidence",
						description:
							"Proof of relationship (marriage/birth certificate), copy of TN holder's approval or pending receipt.",
					},
					{
						title: "Await decision",
						description:
							"Processing times mirror I-129. TD status extends with the TN holder's approval.",
					},
				]}
			/>

			<h2 className="text-2xl font-bold text-fg mt-12 mb-4">
				POE vs. I-129 Comparison
			</h2>
			<ComparisonTable
				headers={["Factor", "POE Renewal", "I-129 Renewal"]}
				rows={[
					{
						label: "Processing Time",
						values: ["Same day", "3–5 months (15 days premium)"],
					},
					{
						label: "Cost",
						values: [
							`${usd(fees.poe.processingFee)} + ${usd(fees.poe.i94LandBorder)} I-94 (land)`,
							`${i129TotalRangeLabel()} + ${premiumLabel()} premium (optional)`,
						],
					},
					{
						label: "Pros",
						values: [
							"Fast, cheap, immediate result",
							"No travel required, 240-day rule applies",
						],
					},
					{
						label: "Cons",
						values: [
							"Must leave & re-enter U.S., risk of denial at border",
							"Expensive, slow without premium",
						],
					},
				]}
			/>

			<h2 className="text-2xl font-bold text-fg mt-12 mb-4">
				The 240-Day Rule
			</h2>
			<p className="mb-4">
				If your employer files Form I-129 <strong>before</strong> your current
				TN status expires, you are authorized to continue working for up to{" "}
				<strong>240 days</strong> while the petition is pending. This prevents
				gaps in employment authorization during processing delays.
			</p>

			<Callout type="warning" title="240-Day Rule Limitations">
				The 240-day rule only applies to the <strong>same employer</strong> who
				filed the petition. It does <strong>NOT</strong> apply if you leave the
				United States — re-entry requires an approved petition or new POE
				application.
			</Callout>

			<h2 className="text-2xl font-bold text-fg mt-12 mb-4">
				Timing Your Renewal
			</h2>
			<p className="mb-4">
				Start the renewal process at least <strong>60 days before</strong> your
				current status expires. USCIS accepts I-129 petitions up to 6 months
				before expiration. This buffer accounts for processing delays and gives
				you time to pursue alternatives if needed.
			</p>

			<FeeSourceLinks
				ids={["uscis-fees", "uscis-premium", "cbp-i94", "uscis-policy-manual"]}
			/>
		</ContentLayout>
	);
}
