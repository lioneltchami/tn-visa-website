export const AFFILIATE_OFFERS = {
	"tnvisaexpert-services": {
		provider: "tnvisaexpert",
		url:
			process.env.NEXT_PUBLIC_AFFILIATE_TNVISAEXPERT_SERVICES_URL ||
			"https://tnvisaexpert.com/services/",
	},
	"tnvisaexpert-interview": {
		provider: "tnvisaexpert",
		url:
			process.env.NEXT_PUBLIC_AFFILIATE_TNVISAEXPERT_INTERVIEW_URL ||
			"https://tnvisaexpert.com/products/tn-visa-border-interview-kit/",
	},
	"tnvisaexpert-denied": {
		provider: "tnvisaexpert",
		url:
			process.env.NEXT_PUBLIC_AFFILIATE_TNVISAEXPERT_DENIED_URL ||
			"https://tnvisaexpert.com/services/jump-start-basic-tn-visa-support-service/",
	},
	"wes-evaluation": {
		provider: "wes",
		url:
			process.env.NEXT_PUBLIC_AFFILIATE_WES_URL ||
			"https://www.wes.org/evaluations-and-fees/",
	},
	"wise-account": {
		provider: "wise",
		url:
			process.env.NEXT_PUBLIC_AFFILIATE_WISE_URL || "https://wise.com/invite/",
	},
} as const;

export type AffiliateOffer = keyof typeof AFFILIATE_OFFERS;
export type AffiliateProvider =
	(typeof AFFILIATE_OFFERS)[AffiliateOffer]["provider"];

export function getAffiliateOffer(offer: AffiliateOffer) {
	return AFFILIATE_OFFERS[offer];
}
