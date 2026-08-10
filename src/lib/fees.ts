import feesData from "@/data/fees.json";

export type FeeSource = (typeof feesData.sources)[number];

/** Canonical fee dataset — import this instead of hardcoding dollar amounts. */
export const fees = feesData;

export function usd(amount: number): string {
	return `$${amount.toLocaleString("en-US")}`;
}

export function usdRange(min: number, max: number): string {
	return `${usd(min)}–${usd(max)}`;
}

export function approxCad(usdAmount: number): string {
	const cad = Math.round(usdAmount * fees.usdToCad);
	return `~$${cad.toLocaleString("en-US")} CAD`;
}

/** Lowest → highest I-129 package (filing + asylum program fee). */
export function i129TotalMin(): number {
	return Math.min(
		fees.i129.smallFiling + fees.i129.smallAsylum,
		fees.i129.nonprofitFiling + fees.i129.nonprofitAsylum,
		fees.i129.largeFiling + fees.i129.largeAsylum,
	);
}

export function i129TotalMax(): number {
	return Math.max(
		fees.i129.smallFiling + fees.i129.smallAsylum,
		fees.i129.nonprofitFiling + fees.i129.nonprofitAsylum,
		fees.i129.largeFiling + fees.i129.largeAsylum,
	);
}

export function i129FilingRangeLabel(): string {
	return usdRange(
		fees.i129.smallFiling,
		fees.i129.largeFiling + fees.i129.largeAsylum,
	);
}

export function i129TotalRangeLabel(): string {
	return usdRange(i129TotalMin(), i129TotalMax());
}

export function poeLandTotal(): number {
	return fees.poe.processingFee + fees.poe.i94LandBorder;
}

export function poeLandTotalLabel(): string {
	return usd(poeLandTotal());
}

export function poeCostLabel(): string {
	// Airport is processing only; land is processing + I-94.
	return `${usd(fees.poe.processingFee)}–${usd(poeLandTotal())} (airport/land)`;
}

export function premiumLabel(): string {
	return usd(fees.premiumProcessing);
}

export function getFeeSource(id: FeeSource["id"]): FeeSource {
	const source = fees.sources.find((s) => s.id === id);
	if (!source) throw new Error(`Unknown fee source: ${id}`);
	return source;
}
