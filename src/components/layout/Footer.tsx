import Link from "next/link";

/* Hallmark · footer: dense colophon (not 4-column SaaS index) */

const primary = [
	{ href: "/eligibility", label: "Eligibility" },
	{ href: "/professions", label: "Professions" },
	{ href: "/apply", label: "Apply" },
	{ href: "/fees", label: "Fees" },
	{ href: "/documents", label: "Documents" },
	{ href: "/faq", label: "FAQ" },
	{ href: "/blog", label: "Blog" },
	{ href: "/jobs", label: "Jobs" },
	{ href: "/products", label: "Products" },
	{ href: "/about", label: "About" },
	{ href: "/disclosure", label: "Disclosure" },
];

const secondary = [
	{ href: "/renewal", label: "Renewal" },
	{ href: "/taxes", label: "Taxes" },
	{ href: "/green-card", label: "Green card" },
	{ href: "/moving", label: "Moving" },
	{ href: "/compare", label: "TN vs H-1B" },
	{ href: "/changes", label: "Policy updates" },
	{ href: "/employer-guide", label: "Employers" },
	{ href: "/letter-builder", label: "Letter builder" },
];

export default function Footer() {
	return (
		<footer className="border-t border-border bg-bg-secondary mt-auto">
			<div className="container-wide py-10 sm:py-12">
				<p className="font-display text-xl font-bold text-fg mb-2">
					TN Visa Guide
				</p>
				<p className="text-sm text-fg-secondary max-w-2xl mb-6">
					Independent educational resource on TN classification under USMCA. Not
					a law firm. Not legal advice.
				</p>

				<ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm mb-4">
					{primary.map((l) => (
						<li key={l.href}>
							<Link
								href={l.href}
								className="text-fg hover:text-accent transition-colors"
							>
								{l.label}
							</Link>
						</li>
					))}
				</ul>

				<ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-fg-muted mb-8">
					{secondary.map((l) => (
						<li key={l.href}>
							<Link href={l.href} className="hover:text-fg transition-colors">
								{l.label}
							</Link>
						</li>
					))}
				</ul>

				<div className="pt-6 border-t border-border text-xs text-fg-muted space-y-2">
					<p>
						Some links are affiliate partners and are marked on-page.{" "}
						<Link
							href="/disclosure"
							className="underline hover:text-fg-secondary"
						>
							Disclosure
						</Link>
						.
					</p>
					<p>
						© {new Date().getFullYear()} TN Visa Guide ·{" "}
						<a
							href="https://www.uscis.gov"
							target="_blank"
							rel="noopener noreferrer"
							className="hover:text-fg-secondary"
						>
							uscis.gov
						</a>
						{" · "}
						<a
							href="https://www.cbp.gov"
							target="_blank"
							rel="noopener noreferrer"
							className="hover:text-fg-secondary"
						>
							cbp.gov
						</a>
						{" · "}
						<a
							href="https://ustr.gov"
							target="_blank"
							rel="noopener noreferrer"
							className="hover:text-fg-secondary"
						>
							ustr.gov
						</a>
					</p>
				</div>
			</div>
		</footer>
	);
}
