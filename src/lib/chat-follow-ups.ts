import { isChatGroundedResponse } from "@/lib/chat-response";

export type ChatFollowUp = {
	href: string;
	label: string;
	topic: string;
};

function uniqueByHref(links: ChatFollowUp[]): ChatFollowUp[] {
	const seen = new Set<string>();
	return links.filter((link) => {
		if (seen.has(link.href)) return false;
		seen.add(link.href);
		return true;
	});
}

/**
 * Soft guide CTAs after a grounded assistant reply. Keeps chat as the front door
 * without pushing products on fallback answers.
 */
export function getChatFollowUps(
	userMessage: string,
	assistantMessage: string,
): ChatFollowUp[] {
	if (!isChatGroundedResponse(assistantMessage)) return [];

	const q = userMessage.toLowerCase();
	const a = assistantMessage.toLowerCase();
	const links: ChatFollowUp[] = [];

	const feeTopic =
		/fee|cost|processing|i-94|\$50|\$80|\bpay\b/.test(q) ||
		/processing fee|\$50|\$80|\$30 i-94/.test(a);

	const documentTopic = /document|letter|employer|checklist|paperwork/.test(q);

	const poeTopic =
		/port of entry|border|interview|poe|cbp|preclearance|secondary inspection/.test(
			q,
		);

	const eligibilityTopic =
		/eligible|eligibility|profession|degree|qualify/.test(q);

	if (feeTopic) {
		links.push({ href: "/fees", label: "Fee calculator", topic: "fees" });
		links.push({
			href: "/products",
			label: "Preparation kits",
			topic: "products",
		});
	}

	if (documentTopic) {
		links.push({
			href: "/documents",
			label: "Document checklist",
			topic: "documents",
		});
		links.push({
			href: "/letter-builder",
			label: "Letter builder",
			topic: "letter_builder",
		});
		links.push({
			href: "/products",
			label: "Letter templates",
			topic: "products",
		});
	}

	if (poeTopic) {
		links.push({ href: "/apply", label: "How to apply", topic: "apply" });
		links.push({
			href: "/border-interview",
			label: "Border interview guide",
			topic: "border_interview",
		});
		links.push({
			href: "/products",
			label: "Interview kit",
			topic: "products",
		});
	}

	if (eligibilityTopic) {
		links.push({
			href: "/eligibility",
			label: "Eligibility checker",
			topic: "eligibility",
		});
		links.push({
			href: "/professions",
			label: "63 professions",
			topic: "professions",
		});
	}

	if (links.length === 0) {
		links.push(
			{ href: "/fees", label: "Fees & sources", topic: "fees" },
			{ href: "/apply", label: "How to apply", topic: "apply" },
			{ href: "/faq", label: "FAQ", topic: "faq" },
		);
	}

	return uniqueByHref(links).slice(0, 3);
}
