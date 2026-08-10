"use client";

import clsx from "clsx";
import {
	Check,
	Clock3,
	Download,
	FileText,
	Loader2,
	LockKeyhole,
	type LucideIcon,
	MessageCircle,
	Package,
} from "lucide-react";
import { useState } from "react";
import { trackBeginCheckout, trackEvent } from "@/hooks/useAnalytics";
import { ALL_PRODUCTS, formatPrice, type ProductId } from "@/lib/products";

const ICONS: Record<ProductId, LucideIcon> = {
	"letter-templates": FileText,
	"interview-kit": MessageCircle,
	"complete-guide": Package,
};

export default function ProductCards() {
	const [loading, setLoading] = useState<ProductId | null>(null);
	const [error, setError] = useState<string | null>(null);

	async function handleBuy(productId: ProductId) {
		const product = ALL_PRODUCTS.find(
			(candidate) => candidate.id === productId,
		);
		if (!product) return;

		trackEvent("checkout_click", {
			product_id: product.id,
			product_name: product.name,
			value: product.priceCents / 100,
			currency: "USD",
		});
		setLoading(productId);
		setError(null);
		try {
			const res = await fetch("/api/checkout", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ productId }),
			});
			const data = await res.json().catch(() => null);

			if (!res.ok || !data?.url) {
				throw new Error(
					data?.error || "Checkout is unavailable right now. Please try again.",
				);
			}

			trackBeginCheckout(product);
			window.location.href = data.url;
		} catch (err) {
			console.error(err);
			setError(
				err instanceof Error
					? err.message
					: "Something went wrong. Please try again.",
			);
			setLoading(null);
		}
	}

	return (
		<div className="my-8">
			<ul className="mb-8 flex flex-col gap-2 text-sm text-fg-secondary">
				{[
					{ icon: LockKeyhole, label: "Secure Stripe checkout" },
					{ icon: Download, label: "Instant PDF access" },
					{ icon: Clock3, label: "Download link valid 1 year" },
				].map(({ icon: TrustIcon, label }) => (
					<li key={label} className="flex items-center gap-2">
						<TrustIcon className="h-4 w-4 text-accent shrink-0" aria-hidden />
						{label}
					</li>
				))}
			</ul>

			<div className="divide-y divide-border border-y border-border">
				{ALL_PRODUCTS.map((product) => {
					const Icon = ICONS[product.id];
					return (
						<div
							key={product.id}
							className={clsx(
								"py-6 sm:py-8",
								product.popular &&
									"bg-bg-secondary/40 -mx-4 px-4 sm:mx-0 sm:px-0",
							)}
						>
							<div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
								<h3 className="font-display text-xl font-bold text-fg flex items-center gap-2">
									<Icon className="w-5 h-5 text-accent shrink-0" aria-hidden />
									{product.shortName}
									{product.popular && (
										<span className="text-xs font-semibold text-accent border border-accent px-2 py-0.5 rounded">
											Best value
										</span>
									)}
								</h3>
								<p className="font-display text-2xl font-bold text-fg tabular-nums">
									{formatPrice(product.priceCents)}
								</p>
							</div>
							{product.id === "complete-guide" && (
								<p className="mb-2 text-xs font-semibold text-success">
									Save $9 vs. buying both kits separately
								</p>
							)}
							<p className="mb-4 text-sm leading-relaxed text-fg-secondary max-w-2xl">
								{product.description}
							</p>
							<ul className="space-y-1.5 mb-5 max-w-2xl">
								{product.features.map((feature) => (
									<li
										key={feature}
										className="flex items-start gap-2 text-sm text-fg-secondary"
									>
										<Check
											className="w-4 h-4 text-accent shrink-0 mt-0.5"
											aria-hidden
										/>
										{feature}
									</li>
								))}
							</ul>
							<button
								onClick={() => handleBuy(product.id)}
								disabled={loading !== null}
								className={clsx(
									"disabled:opacity-60 inline-flex items-center gap-2",
									product.popular ? "btn-primary" : "btn-secondary",
								)}
							>
								{loading === product.id ? (
									<Loader2 className="w-4 h-4 animate-spin" />
								) : (
									`Get instant access — ${formatPrice(product.priceCents)}`
								)}
							</button>
						</div>
					);
				})}
			</div>

			{error && (
				<p role="alert" className="mt-4 text-sm text-danger">
					{error}
				</p>
			)}
		</div>
	);
}
