import { NextResponse } from "next/server";
import Stripe from "stripe";
import { sendPurchaseEmail } from "@/lib/fulfillment";
import { getProduct } from "@/lib/products";
import {
	claimFulfillment,
	ensurePurchase,
	releaseFulfillment,
	revokePurchaseByPaymentIntent,
} from "@/lib/purchases";
import {
	paymentIntentId,
	shouldRevokeOnCharge,
	shouldRevokeOnDispute,
} from "@/lib/stripe-webhook-events";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
	if (session.payment_status !== "paid") {
		return NextResponse.json({ received: true, ignored: "unpaid session" });
	}

	const product = getProduct(session.metadata?.productId);
	if (!product) {
		console.error(
			"[webhook] Unknown productId on session",
			session.id,
			session.metadata?.productId,
		);
		return NextResponse.json({ received: true, ignored: "unknown product" });
	}

	const email =
		session.customer_details?.email || session.customer_email || null;

	let purchaseId: string | undefined;
	try {
		const { purchase } = await ensurePurchase({
			stripeSessionId: session.id,
			productId: product.id,
			email,
			amountTotal: session.amount_total,
			currency: session.currency,
			stripePaymentIntent:
				typeof session.payment_intent === "string"
					? session.payment_intent
					: null,
		});
		purchaseId = purchase.id;

		if (!email) {
			console.warn(
				"[webhook] Paid session without an email address:",
				session.id,
			);
			return NextResponse.json({ received: true, emailed: false });
		}

		const claimed = await claimFulfillment(purchase.id);
		if (!claimed) {
			return NextResponse.json({
				received: true,
				emailed: false,
				reason: "already sent",
			});
		}

		await sendPurchaseEmail({ email, product, purchaseId: purchase.id });

		return NextResponse.json({ received: true, emailed: true });
	} catch (err) {
		if (purchaseId) await releaseFulfillment(purchaseId);
		console.error("[webhook] Fulfillment failed for session", session.id, err);
		return NextResponse.json({ error: "Fulfillment failed" }, { status: 500 });
	}
}

async function handleAccessRevocation(
	paymentIntent: string | null,
	reason: string,
) {
	if (!paymentIntent) {
		console.warn(`[webhook] ${reason} without a payment intent id`);
		return NextResponse.json({
			received: true,
			revoked: false,
			reason: "no payment intent",
		});
	}

	try {
		const result = await revokePurchaseByPaymentIntent(paymentIntent);
		if (result.revoked) {
			console.info(
				"[webhook] Revoked purchase",
				result.purchaseId,
				"for",
				reason,
			);
		}
		return NextResponse.json({
			received: true,
			revoked: result.revoked,
			purchaseId: result.purchaseId,
		});
	} catch (err) {
		console.error("[webhook] Revocation failed for", paymentIntent, err);
		return NextResponse.json({ error: "Revocation failed" }, { status: 500 });
	}
}

export async function POST(req: Request) {
	const secretKey = process.env.STRIPE_SECRET_KEY;
	const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

	if (!secretKey || !webhookSecret) {
		console.error("[webhook] Stripe keys are not configured");
		return NextResponse.json({ error: "Not configured" }, { status: 503 });
	}

	const signature = req.headers.get("stripe-signature");
	if (!signature)
		return NextResponse.json({ error: "Missing signature" }, { status: 400 });

	const body = await req.text();

	let event: Stripe.Event;
	try {
		event = new Stripe(secretKey).webhooks.constructEvent(
			body,
			signature,
			webhookSecret,
		);
	} catch (err) {
		console.error("[webhook] Signature verification failed:", err);
		return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
	}

	switch (event.type) {
		case "checkout.session.completed":
			return handleCheckoutCompleted(
				event.data.object as Stripe.Checkout.Session,
			);

		case "charge.refunded": {
			const charge = event.data.object as Stripe.Charge;
			if (!shouldRevokeOnCharge(charge)) {
				return NextResponse.json({
					received: true,
					ignored: "no refund amount",
				});
			}
			return handleAccessRevocation(
				paymentIntentId(charge.payment_intent),
				"charge.refunded",
			);
		}

		case "charge.dispute.created": {
			const dispute = event.data.object as Stripe.Dispute;
			if (!shouldRevokeOnDispute()) {
				return NextResponse.json({
					received: true,
					ignored: "dispute not actionable",
				});
			}
			return handleAccessRevocation(
				paymentIntentId(dispute.payment_intent),
				"charge.dispute.created",
			);
		}

		default:
			return NextResponse.json({ received: true, ignored: event.type });
	}
}
