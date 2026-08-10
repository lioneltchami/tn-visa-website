import type { Metadata } from "next";
import { CANONICAL_ORIGIN } from "@/lib/site";

/** Absolute URL for a site path (`/` → origin, `/faq` → origin/faq). */
export function absoluteUrl(path = "/"): string {
	if (!path || path === "/") return CANONICAL_ORIGIN;
	const normalized = path.startsWith("/") ? path : `/${path}`;
	return `${CANONICAL_ORIGIN}${normalized.replace(/\/+$/, "")}`;
}

/** Self-referencing canonical + en-CA alternate for a page. */
export function pageAlternates(
	path: string,
): NonNullable<Metadata["alternates"]> {
	const url = absoluteUrl(path);
	return {
		canonical: url,
		languages: { "en-CA": url },
	};
}

/** Attach the correct per-page canonical without clobbering other metadata. */
export function withCanonical(path: string, meta: Metadata): Metadata {
	return {
		...meta,
		alternates: {
			...meta.alternates,
			...pageAlternates(path),
		},
	};
}
