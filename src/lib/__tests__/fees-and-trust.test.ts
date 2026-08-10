import { describe, expect, it } from "vitest";
import { blogArticleSchema } from "@/lib/article-schema";
import {
	fees,
	i129TotalMax,
	i129TotalMin,
	i129TotalRangeLabel,
	poeLandTotal,
	premiumLabel,
	usd,
} from "@/lib/fees";
import { productsCatalogSchema } from "@/lib/product-schema";
import { ALL_PRODUCTS } from "@/lib/products";
import { organizationSameAs } from "@/lib/site-identity";

describe("fees helpers", () => {
	it("formats USD amounts", () => {
		expect(usd(2965)).toBe("$2,965");
		expect(premiumLabel()).toBe("$2,965");
	});

	it("matches fees.json for POE land total and I-129 band", () => {
		expect(poeLandTotal()).toBe(
			fees.poe.processingFee + fees.poe.i94LandBorder,
		);
		expect(i129TotalMin()).toBeLessThanOrEqual(i129TotalMax());
		expect(i129TotalRangeLabel()).toContain("$510");
		expect(i129TotalRangeLabel()).toContain("$1,615");
	});

	it("exposes citation sources", () => {
		expect(fees.sources.some((s) => s.id === "uscis-fees")).toBe(true);
		expect(fees.sources.every((s) => s.url.startsWith("https://"))).toBe(true);
	});

	it("includes visa integrity fee in other", () => {
		expect(fees.other.visaIntegrityFee).toBe(250);
	});

	it("includes Policy Manual and Federal Register", () => {
		const ids = fees.sources.map((s) => s.id);
		expect(ids).toContain("uscis-policy-manual");
		expect(ids).toContain("federal-register");
		expect(fees.lastVerified).toMatch(/^\d{4}-\d{2}-\d{2}$/);
	});
});

describe("product schema", () => {
	it("lists every catalog product with Offer price", () => {
		const schema = productsCatalogSchema();
		expect(schema.itemListElement).toHaveLength(ALL_PRODUCTS.length);
		for (const item of schema.itemListElement) {
			expect(item.item["@type"]).toBe("Product");
			expect(item.item.offers["@type"]).toBe("Offer");
			expect(item.item.offers.priceCurrency).toBe("USD");
		}
	});
});

describe("organization sameAs", () => {
	it("ignores empty env and accepts https urls", () => {
		expect(organizationSameAs()).toEqual([]);
	});
});

describe("article schema", () => {
	it("uses Person author with /about url, not bare Organization", () => {
		const schema = blogArticleSchema({
			headline: "Test",
			datePublished: "2026-05-09",
			path: "/blog/test",
		});
		expect(schema.author["@type"]).toBe("Person");
		expect(schema.author.url).toContain("/about");
		expect(schema.publisher["@type"]).toBe("Organization");
		expect(schema.publisher.name).toBeTruthy();
	});
});
