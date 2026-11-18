import type { Metadata } from "next";
import Link from "next/link";
import ContentLayout from "@/components/layout/ContentLayout";
import { Callout } from "@/components/ui/Callout";
import { withCanonical } from "@/lib/seo";
import { SITE_EMAIL, SITE_NAME } from "@/lib/site-identity";

export const metadata: Metadata = withCanonical("/terms", {
	title: "Terms",
	description:
		"TN Visa Guide is an educational site, not a law firm. Paid guides are templates. Payments are processed by Stripe.",
});

export default function TermsPage() {
	return (
		<ContentLayout
			title="Terms"
			description="What this site is, what the paid guides are, and how payment and access work."
			breadcrumbs={[{ label: "Terms", href: "/terms" }]}
			lastUpdated="November 2026"
		>
			<p className="text-fg-secondary mb-4">
				{SITE_NAME} is an independent educational resource on TN classification
				under USMCA. It is not a law firm and it does not provide legal advice.
			</p>

			<Callout type="warning" title="Not legal advice">
				Nothing on this site creates an attorney-client relationship. Immigration
				outcomes depend on your facts and current agency practice. For
				case-specific advice, consult a licensed immigration attorney.
			</Callout>

			<h2 className="text-2xl font-bold text-fg mt-8 mb-4">The guides</h2>
			<p className="text-fg-secondary mb-4">
				Most of the site is free. Optional paid PDFs are templates and
				preparation guides: employer-letter templates, interview preparation,
				and application checklists. They are starting points. You have to edit
				them so they match your job, your employer, and your credentials.
			</p>
			<p className="text-fg-secondary mb-8">
				They are not a filing service, not a prediction of approval, and not a
				substitute for current government instructions. Requirements and port
				practice change. Check the official sources before you apply or travel.
			</p>

			<h2 className="text-2xl font-bold text-fg mt-8 mb-4">Payment and access</h2>
			<p className="text-fg-secondary mb-4">
				Payments are processed by Stripe. You pay on Stripe Checkout. We email
				a download link to the address Stripe gives us. The files are digital
				PDFs. The download page shows how many downloads remain.
			</p>
			<p className="text-fg-secondary mb-4">
				The guides are licensed for the purchaser’s personal use. Do not post,
				redistribute, resell, or share them without written permission.
			</p>
			<p className="text-fg-secondary mb-8">
				Email{" "}
				<a href={`mailto:${SITE_EMAIL}`} className="text-accent hover:underline">
					{SITE_EMAIL}
				</a>{" "}
				with the purchase reference from your receipt if you need help with a
				download or want a refund reviewed. If a payment is fully refunded, or
				if Stripe reports a dispute, we turn off download access for that
				purchase. A partial refund does not turn access off.
			</p>

			<h2 className="text-2xl font-bold text-fg mt-8 mb-4">Using the site</h2>
			<p className="text-fg-secondary mb-4">
				The chat assistant answers from this guide and is not legal advice. Job
				listings send you to the employer’s own application page. Accounts,
				subscriptions, and purchases are described in the{" "}
				<Link href="/privacy" className="text-accent hover:underline">
					privacy page
				</Link>
				. Affiliate relationships are described in the{" "}
				<Link href="/disclosure" className="text-accent hover:underline">
					disclosure
				</Link>
				.
			</p>
			<p className="text-fg-secondary">
				We can update these pages and the guides. The date at the bottom of
				this page is when it last changed. Questions: {SITE_EMAIL}.
			</p>
		</ContentLayout>
	);
}
