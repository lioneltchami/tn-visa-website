import type { Metadata } from "next";
import Link from "next/link";
import ContentLayout from "@/components/layout/ContentLayout";
import { withCanonical } from "@/lib/seo";
import { SITE_EMAIL, SITE_NAME } from "@/lib/site-identity";

export const metadata: Metadata = withCanonical("/privacy", {
	title: "Privacy",
	description:
		"What TN Visa Guide collects — accounts, email updates, Stripe payments, chat, analytics, and job listings — and why.",
});

export default function PrivacyPage() {
	return (
		<ContentLayout
			title="Privacy"
			description="What this site collects, why, and how to reach us."
			breadcrumbs={[{ label: "Privacy", href: "/privacy" }]}
			lastUpdated="November 2026"
		>
			<p className="text-fg-secondary mb-4">
				{SITE_NAME} is an educational website. This page lists information the
				site stores or sends to the services that run it. Email{" "}
				<a href={`mailto:${SITE_EMAIL}`} className="text-accent hover:underline">
					{SITE_EMAIL}
				</a>{" "}
				with a privacy question.
			</p>

			<h2 className="text-2xl font-bold text-fg mt-8 mb-4">Accounts</h2>
			<p className="text-fg-secondary mb-4">
				Sign-up asks for an email and password. The account is stored with
				Supabase, which keeps you signed in with a session cookie.
			</p>
			<p className="text-fg-secondary mb-4">
				If you finish onboarding, we store the profile you submit. A
				professional profile can include your name, headline, TN profession,
				years of experience, education, and LinkedIn, GitHub, or portfolio
				links. An employer profile can include the company name, industry,
				size, location, and careers link.
			</p>
			<p className="text-fg-secondary mb-8">
				You can upload files to that account: an employer letter, degree or
				diploma, transcript, professional license, I-94, passport copy, or
				another file you choose. If you save TN status, we store the
				profession, employer, dates, and notes you enter, and we use the
				account email to send renewal reminders.
			</p>

			<h2 className="text-2xl font-bold text-fg mt-8 mb-4">Email updates</h2>
			<p className="text-fg-secondary mb-8">
				The subscribe form requires an email. Name and topic interests are
				optional. We store them so we can send the checklist and later notes
				about policy changes, guides, and job postings. The welcome message
				includes an unsubscribe link. You can also email {SITE_EMAIL}.
			</p>

			<h2 className="text-2xl font-bold text-fg mt-8 mb-4">Payments</h2>
			<p className="text-fg-secondary mb-8">
				Paid guides are checked out with Stripe. Card details are entered on
				Stripe, not on this site. We keep the email Stripe returns, the
				product, the amount, the currency, Stripe’s payment ids, how many
				times the file was downloaded, and whether download access was turned
				off. We use that record to email the download link and to turn access
				off when a payment is fully refunded or disputed. Receipts come from{" "}
				{SITE_EMAIL}.
			</p>

			<h2 className="text-2xl font-bold text-fg mt-8 mb-4">Chat</h2>
			<p className="text-fg-secondary mb-8">
				The assistant sends what you type to our server, then to OpenAI, to
				draft a reply from the guide. We do not save a chat transcript in our
				database. The server does store a rate-limit counter keyed by IP
				address so one visitor cannot exhaust the assistant. The same kind of
				counter applies to subscribe and checkout attempts.
			</p>

			<h2 className="text-2xl font-bold text-fg mt-8 mb-4">Analytics</h2>
			<p className="text-fg-secondary mb-8">
				Every page loads Plausible to count visits to tnvisaguide.ca. If a
				Google Analytics measurement id is configured for the deployment, the
				site also loads Google’s measurement script. Checkout and purchase
				events go through those scripts when they are loaded. They do not
				receive your password or uploaded documents.
			</p>

			<h2 className="text-2xl font-bold text-fg mt-8 mb-4">
				Jobs and materials you submit
			</h2>
			<p className="text-fg-secondary mb-4">
				A job listing links to the employer’s own application page. We do not
				receive the application you send there.
			</p>
			<p className="text-fg-secondary mb-4">
				A signed-in employer can post a listing: title, description,
				requirements, location, pay range, work arrangement, and that external
				apply link. Files you upload in your account stay with your account.
			</p>
			<p className="text-fg-secondary mb-8">
				Signed-in readers can submit a TN experience — profession, filing
				method, outcome, and the story you write — for review before it is
				published. We store that story with your account. The public page shows
				the story, not your name.
			</p>

			<h2 className="text-2xl font-bold text-fg mt-8 mb-4">
				Services that process this information
			</h2>
			<ul className="list-disc pl-6 space-y-2 text-fg-secondary mb-4">
				<li>
					Supabase — accounts, profiles, uploads, subscribers, purchases, and
					rate-limit counters
				</li>
				<li>Stripe — card payment</li>
				<li>OpenAI — chat replies</li>
				<li>
					Resend — subscription and purchase email, when email sending is
					configured
				</li>
				<li>
					Plausible on every page, and Google Analytics when a measurement id
					is set
				</li>
			</ul>
			<p className="text-fg-secondary mb-8">
				Affiliate links leave this site. We do not send those partners your
				account or subscriber email. See the{" "}
				<Link href="/disclosure" className="text-accent hover:underline">
					affiliate disclosure
				</Link>
				.
			</p>

			<h2 className="text-2xl font-bold text-fg mt-8 mb-4">Contact</h2>
			<p className="text-fg-secondary">
				Email{" "}
				<a href={`mailto:${SITE_EMAIL}`} className="text-accent hover:underline">
					{SITE_EMAIL}
				</a>{" "}
				about this page, a subscription, or a purchase. The{" "}
				<Link href="/terms" className="text-accent hover:underline">
					terms
				</Link>{" "}
				explain what the guides are and are not.
			</p>
		</ContentLayout>
	);
}
