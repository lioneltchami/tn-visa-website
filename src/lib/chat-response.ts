/** Matches the assistant fallback prescribed in `src/app/api/chat/route.ts`. */
export const CHAT_FALLBACK_PHRASE =
	"I don't have specific information about that. Please check the relevant page on our site or consult an immigration lawyer.";

export function isChatFallbackResponse(content: string): boolean {
	const normalized = content.trim().toLowerCase();
	return (
		normalized.includes("i don't have specific information about that") ||
		normalized.includes("i don\u2019t have specific information about that") ||
		normalized.includes("no relevant context found")
	);
}

export function isChatGroundedResponse(content: string): boolean {
	return content.trim().length > 0 && !isChatFallbackResponse(content);
}
