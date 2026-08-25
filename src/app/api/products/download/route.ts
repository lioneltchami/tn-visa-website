import { NextResponse } from "next/server";
import { verifyDownloadToken } from "@/lib/download-token";
import { getProduct } from "@/lib/products";
import {
	consumeDownload,
	getPurchaseById,
	isPurchaseRevoked,
} from "@/lib/purchases";
import {
	consumeRateLimit,
	getClientIp,
	rateLimitHeaders,
} from "@/lib/rate-limit";
import { createServiceSupabase } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";
export const maxDuration = 15;

const BUCKET = "product-files";
const SIGNED_URL_TTL_SECONDS = 120;
const DOWNLOAD_LIMIT = 60;
const DOWNLOAD_WINDOW_SECONDS = 60 * 60;

const NO_STORE = { "Cache-Control": "no-store, max-age=0" };

export async function GET(req: Request) {
	const url = new URL(req.url);
	const token = url.searchParams.get("token");
	const requestedFile = url.searchParams.get("file");

	const payload = verifyDownloadToken(token);
	if (!payload) {
		return NextResponse.json(
			{ error: "This download link is invalid or has expired." },
			{ status: 403, headers: NO_STORE },
		);
	}

	const rate = await consumeRateLimit(
		`download:${getClientIp(req)}`,
		DOWNLOAD_LIMIT,
		DOWNLOAD_WINDOW_SECONDS,
	);
	if (!rate.allowed) {
		return NextResponse.json(
			{ error: "Too many download requests. Please try again shortly." },
			{ status: 429, headers: { ...NO_STORE, ...rateLimitHeaders(rate) } },
		);
	}

	try {
		const purchase = await getPurchaseById(payload.purchaseId);
		if (!purchase) {
			return NextResponse.json(
				{ error: "We could not find that purchase." },
				{ status: 404, headers: NO_STORE },
			);
		}

		if (isPurchaseRevoked(purchase)) {
			return NextResponse.json(
				{
					error:
						"This purchase is no longer active. Email hello@tnvisaguide.ca if you think this is a mistake.",
				},
				{ status: 403, headers: NO_STORE },
			);
		}

		const product = getProduct(purchase.product_id);
		if (!product) {
			console.error(
				"[download] Purchase references unknown product:",
				purchase.product_id,
			);
			return NextResponse.json(
				{
					error:
						"This product is unavailable. Please contact hello@tnvisaguide.ca.",
				},
				{ status: 500, headers: NO_STORE },
			);
		}

		// Only files that belong to the purchased product can be requested.
		const file = requestedFile
			? product.files.find((candidate) => candidate.path === requestedFile)
			: product.files[0];

		if (!file) {
			return NextResponse.json(
				{ error: "That file is not part of your purchase." },
				{ status: 403, headers: NO_STORE },
			);
		}

		const consumption = await consumeDownload(purchase.id);
		if (!consumption.allowed) {
			return NextResponse.json(
				{
					error: `Download limit reached (${consumption.downloadsMax}). Email hello@tnvisaguide.ca and we will reissue your link.`,
				},
				{ status: 429, headers: NO_STORE },
			);
		}

		const { data, error } = await createServiceSupabase()
			.storage.from(BUCKET)
			.createSignedUrl(file.path, SIGNED_URL_TTL_SECONDS, {
				download: file.filename,
			});

		if (error || !data?.signedUrl) {
			console.error(
				"[download] Signed URL failed for",
				file.path,
				error?.message,
			);
			return NextResponse.json(
				{
					error:
						"Your files are being finalized. Please try again in a few minutes or email hello@tnvisaguide.ca.",
				},
				{ status: 503, headers: NO_STORE },
			);
		}

		return NextResponse.redirect(data.signedUrl, {
			status: 307,
			headers: NO_STORE,
		});
	} catch (err) {
		console.error("[download] Unexpected error:", err);
		return NextResponse.json(
			{ error: "Something went wrong. Please email hello@tnvisaguide.ca." },
			{ status: 500, headers: NO_STORE },
		);
	}
}
