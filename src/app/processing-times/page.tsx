import type { Metadata } from "next";
import Link from "next/link";
import ContentLayout from "@/components/layout/ContentLayout";
import { Callout } from "@/components/ui/Callout";
import { ComparisonTable } from "@/components/ui/ComparisonTable";
import FeeSourceLinks from "@/components/ui/FeeSourceLinks";
import {
	approxCad,
	fees,
	i129TotalRangeLabel,
	poeLandTotalLabel,
	premiumLabel,
	usd,
} from "@/lib/fees";
import { withCanonical } from "@/lib/seo";

export const metadata: Metadata = withCanonical("/processing-times", {
	title: "TN Visa Processing Times (2026)",
	description:
		"Current TN visa processing times for port of entry, I-129 USCIS petition, and consular applications. Updated for the 2026 DHS shutdown.",
});

export default function ProcessingTimesPage() {
	return (
		<ContentLayout
			title="TN Visa Processing Times"
			description="How long each application method takes, what to expect during the 2026 government shutdown, and tips for faster processing."
			breadcrumbs={[{ label: "Processing Times", href: "/processing-times" }]}
			lastUpdated="August 2026"
		>
			<ComparisonTable
				headers={["Method", "Processing Time", "Cost"]}
				rows={[
					{
						label: "Port of Entry (Canadian)",
						values: [
							"Same day (15 min – 2 hours)",
							`${poeLandTotalLabel()} (${approxCad(fees.poe.processingFee + fees.poe.i94LandBorder)})`,
						],
					},
					{
						label: "POE during DHS shutdown",
						values: [
							"Same day + 2–3 extra hours",
							`${poeLandTotalLabel()} (${approxCad(fees.poe.processingFee + fees.poe.i94LandBorder)})`,
						],
					},
					{
						label: "I-129 USCIS (standard)",
						values: [
							"3–5 months",
							`${i129TotalRangeLabel()} (${approxCad(fees.i129.smallFiling)}–${approxCad(fees.i129.largeFiling + fees.i129.largeAsylum)})`,
						],
					},
					{
						label: "I-129 USCIS (premium)",
						values: [
							"15 business days",
							`${premiumLabel()} (${approxCad(fees.premiumProcessing)}) + filing fee`,
						],
					},
					{
						label: "Consular (Mexican)",
						values: ["2–8 weeks", "$185 DS-160 fee"],
					},
				]}
			/>

			<Callout
				type="info"
				title="Border Processing Continues During the Shutdown"
			>
				TN visa applications at the border are NOT affected by the DHS
				government shutdown. CBP treats port-of-entry inspections as essential
				operations. USCIS also remains open for fee-funded filings like I-129
				petitions.
			</Callout>

			<h2 className="text-2xl font-bold text-fg mt-12 mb-4">
				2026 Government Shutdown Impact
			</h2>
			<p className="text-fg-secondary mb-4">
				The DHS government shutdown — now over 70 days as of April 2026 and the
				longest in US history — is affecting immigration services in several
				ways:
			</p>
			<ul className="list-disc pl-6 space-y-2 text-fg-secondary mb-8">
				<li>
					<strong>Border processing continues</strong> but with longer wait
					times and more secondary inspections due to enhanced vetting
				</li>
				<li>
					<strong>USCIS remains operational</strong> for fee-funded services
					including I-129 petitions and premium processing
				</li>
				<li>
					<strong>H-1B filings are stalled</strong> because the Department of
					Labor LCA system is offline — making TN more attractive for eligible
					Canadians
				</li>
				<li>
					<strong>Enhanced vetting</strong> since December 2025 means more
					social media checks and longer secondary inspections
				</li>
				<li>
					<strong>Lawmakers are targeting June 1, 2026</strong> for a
					resolution, but no deal is confirmed
				</li>
			</ul>

			<h2 className="text-2xl font-bold text-fg mt-12 mb-4">
				Premium Processing
			</h2>
			<p className="text-fg-secondary mb-4">
				Premium processing (Form I-907) guarantees that USCIS will take action
				on your I-129 petition within <strong>15 business days</strong>.
				&quot;Action&quot; means an approval, denial, or Request for Evidence
				(RFE) — not necessarily a final decision.
			</p>
			<ul className="list-disc pl-6 space-y-2 text-fg-secondary mb-4">
				<li>
					<strong>Cost:</strong> {premiumLabel()} as of{" "}
					{fees.premiumProcessingEffective} (increased from{" "}
					{usd(fees.premiumProcessingPrevious)})
				</li>
				<li>
					<strong>Who pays:</strong> Typically the employer, but the applicant
					can pay
				</li>
				<li>
					<strong>If an RFE is issued:</strong> The 15-day clock stops and
					resets when you respond
				</li>
				<li>
					<strong>Refund:</strong> If USCIS doesn&apos;t act within 15 business
					days, the fee is refunded and the case is expedited
				</li>
			</ul>
			<p className="text-fg-secondary mb-8">
				Premium processing is worth it for time-sensitive cases — job start
				dates, expiring status, or when you need certainty. For straightforward
				renewals with no urgency, standard processing saves {premiumLabel()}.
			</p>

			<h2 className="text-2xl font-bold text-fg mt-12 mb-4">
				Tips for Faster Processing
			</h2>
			<ul className="list-disc pl-6 space-y-2 text-fg-secondary mb-8">
				<li>
					<strong>Apply at airport preclearance</strong> — generally faster than
					land borders, with shorter secondary inspection queues
				</li>
				<li>
					<strong>Avoid peak travel times</strong> — early morning weekdays are
					typically less busy than weekends or holidays
				</li>
				<li>
					<strong>Have documents perfectly organized</strong> — a cover sheet,
					tabbed sections, and multiple copies speed up the officer&apos;s
					review
				</li>
				<li>
					<strong>Choose a high-volume port of entry</strong> — officers at
					Toronto Pearson (YYZ), Vancouver (YVR), and Montreal (YUL) process
					more TN applications and are more experienced
				</li>
				<li>
					<strong>File I-129 with premium processing</strong> if you can&apos;t
					risk a border interview — 15 business days is predictable
				</li>
				<li>
					<strong>Respond to RFEs immediately</strong> — don&apos;t wait until
					the deadline. Faster responses mean faster decisions.
				</li>
			</ul>

			<Callout type="tip" title="Best Strategy for First-Time Applicants">
				If your case is straightforward (clear degree match, strong employer
				letter), apply at airport preclearance for same-day approval. If your
				case is complex or you&apos;ve been denied before, file I-129 with
				premium processing for a more thorough review without the pressure of a
				border interview.
			</Callout>

			<FeeSourceLinks
				ids={["uscis-premium", "uscis-fees", "cbp-i94", "uscis-policy-manual"]}
			/>

			<div className="mt-12 pt-8 border-t border-border">
				<h2 className="text-xl font-bold text-fg mb-4">Related Resources</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
					<Link
						href="/apply"
						className="card card-interactive p-4 text-center font-medium text-accent"
					>
						How to Apply
					</Link>
					<Link
						href="/fees"
						className="card card-interactive p-4 text-center font-medium text-accent"
					>
						Fee Calculator
					</Link>
					<Link
						href="/border-interview"
						className="card card-interactive p-4 text-center font-medium text-accent"
					>
						Border Interview Guide
					</Link>
					<Link
						href="/documents"
						className="card card-interactive p-4 text-center font-medium text-accent"
					>
						Required Documents
					</Link>
				</div>
			</div>
		</ContentLayout>
	);
}
