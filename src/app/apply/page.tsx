import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import ContentLayout from "@/components/layout/ContentLayout";
import { Callout } from "@/components/ui/Callout";
import { ComparisonTable } from "@/components/ui/ComparisonTable";
import FeeSourceLinks from "@/components/ui/FeeSourceLinks";
import { StepList } from "@/components/ui/StepList";
import {
	fees,
	i129TotalRangeLabel,
	poeCostLabel,
	premiumLabel,
	usd,
} from "@/lib/fees";
import { withCanonical } from "@/lib/seo";

export const metadata: Metadata = withCanonical("/apply", {
	title: "How to Apply for a TN Visa from Canada",
	description:
		"Two methods to apply: at the border (same-day) or by filing Form I-129 with USCIS. Step-by-step guide for Canadians.",
});

export default function ApplyPage() {
	return (
		<ContentLayout
			title="How to Apply for a TN Visa"
			description="Two methods: apply at the border (same-day) or file Form I-129 with USCIS."
			breadcrumbs={[{ label: "Apply", href: "/apply" }]}
			lastUpdated="August 2026"
		>
			<JsonLd
				data={{
					"@context": "https://schema.org",
					"@type": "HowTo",
					name: "How to Apply for a TN Visa",
					description:
						"Two methods to apply for TN visa status: at the port of entry or by filing Form I-129.",
					step: [
						{
							"@type": "HowToStep",
							name: "Gather documents",
							text: "Collect passport, employer letter, degree, transcripts, and supporting materials.",
						},
						{
							"@type": "HowToStep",
							name: "Choose application method",
							text: "Decide between Port of Entry (same-day) or Form I-129 (mail-in).",
						},
						{
							"@type": "HowToStep",
							name: "Submit application",
							text: "Present documents at the border or have employer file I-129 with USCIS.",
						},
						{
							"@type": "HowToStep",
							name: "Receive approval",
							text: "Get your I-94 confirming TN status and authorized stay.",
						},
					],
				}}
			/>

			<div className="rounded-xl overflow-hidden mb-8 -mt-2">
				<Image
					src="https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=1200&h=400&fit=crop"
					alt="International border crossing"
					width={1200}
					height={400}
					className="w-full h-48 sm:h-64 object-cover"
				/>
			</div>

			<ComparisonTable
				headers={["", "Port of Entry (POE)", "Form I-129 (USCIS)"]}
				rows={[
					{
						label: "Processing Time",
						values: ["Same day", "2–5 months (15 days with premium)"],
					},
					{
						label: "Cost",
						values: [
							poeCostLabel(),
							`${i129TotalRangeLabel()} filing + ${premiumLabel()} if premium`,
						],
					},
					{
						label: "Risk",
						values: [
							"Denied at border, must return to Canada",
							"Denied by mail, can reapply",
						],
					},
					{
						label: "Best For",
						values: [
							"First-time applicants with strong cases",
							"Complex cases, renewals, or risk-averse applicants",
						],
					},
				]}
			/>

			<h2 className="text-2xl font-bold text-fg mt-12 mb-4">
				Port of Entry Application
			</h2>
			<StepList
				steps={[
					{
						title: "Gather documents",
						description:
							"Collect passport, employer letter, degree, transcripts, and supporting materials.",
					},
					{
						title: "Choose your port of entry",
						description:
							"Select an airport with preclearance or a land border crossing.",
					},
					{
						title: "Arrive at the border",
						description: "Tell the officer you are applying for TN status.",
					},
					{
						title: "Present your documents",
						description: "Hand over your complete application package.",
					},
					{
						title: "Answer officer questions",
						description:
							"Explain your role, qualifications, and temporary intent clearly.",
					},
					{
						title: "Pay fees",
						description: `Pay the ${usd(fees.poe.processingFee)} processing fee (plus ${usd(fees.poe.i94LandBorder)} I-94 fee at land borders).`,
					},
					{
						title: "Receive your I-94",
						description:
							"Your I-94 confirms TN status and authorized stay duration.",
					},
				]}
			/>

			<Callout type="tip" title="Airport Preclearance">
				Airport preclearance is safer — if denied, you can withdraw your
				application and remain in Canada rather than being turned away at the
				border.
			</Callout>

			<h2 className="text-2xl font-bold text-fg mt-12 mb-4">
				Form I-129 (USCIS Filing)
			</h2>
			<StepList
				steps={[
					{
						title: "Employer files Form I-129",
						description:
							"Your U.S. employer submits Form I-129 with the TN supplement to USCIS.",
					},
					{
						title: "Include supporting documents",
						description:
							"Attach employer letter, credentials, and all supporting evidence.",
					},
					{
						title: "Pay filing fee",
						description: `Filing fee varies by employer size (${i129TotalRangeLabel()}). Add ${premiumLabel()} for optional premium processing.`,
					},
					{
						title: "Wait for receipt notice",
						description: "USCIS sends Form I-797C confirming receipt.",
					},
					{
						title: "Receive approval",
						description: "USCIS sends Form I-797A approval notice.",
					},
					{
						title: "Enter the U.S.",
						description:
							"Present your approval notice at the border to activate TN status.",
					},
				]}
			/>

			<Callout type="info" title="Premium Processing">
				Premium processing (Form I-907) guarantees USCIS action within 15
				business days for an additional {premiumLabel()} fee.
			</Callout>

			<FeeSourceLinks
				ids={["uscis-fees", "uscis-premium", "cbp-i94", "uscis-policy-manual"]}
			/>

			<div className="mt-8 flex flex-wrap gap-4">
				<Link href="/documents" className="text-accent hover:underline">
					Required documents →
				</Link>
				<Link href="/fees" className="text-accent hover:underline">
					Fee breakdown →
				</Link>
				<Link href="/border-interview" className="text-accent hover:underline">
					Border interview guide →
				</Link>
				<Link href="/processing-times" className="text-accent hover:underline">
					Processing times →
				</Link>
			</div>
		</ContentLayout>
	);
}
