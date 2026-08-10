import { ALL_PRODUCTS } from "@/lib/products";
import { absoluteUrl } from "@/lib/seo";
import { SITE_NAME } from "@/lib/site-identity";

/** Product / Offer JSON-LD for the digital kits catalog. */
export function productsCatalogSchema() {
	return {
		"@context": "https://schema.org",
		"@type": "ItemList",
		name: `${SITE_NAME} digital preparation kits`,
		itemListElement: ALL_PRODUCTS.map((product, index) => ({
			"@type": "ListItem",
			position: index + 1,
			item: {
				"@type": "Product",
				name: product.name,
				description: product.description,
				sku: product.id,
				brand: { "@type": "Brand", name: SITE_NAME },
				url: absoluteUrl("/products"),
				offers: {
					"@type": "Offer",
					url: absoluteUrl("/products"),
					priceCurrency: "USD",
					price: (product.priceCents / 100).toFixed(2),
					availability: "https://schema.org/InStock",
					seller: { "@type": "Organization", name: SITE_NAME },
				},
			},
		})),
	};
}
