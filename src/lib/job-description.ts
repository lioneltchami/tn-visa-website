/**
 * Turn messy external job-description blobs into structured sections
 * for display and requirement extraction.
 */

export type JobFact = { label: string; value: string };

export type JobDescriptionBlock =
	| { type: "paragraph"; text: string; title?: string }
	| { type: "list"; title?: string; items: string[] }
	| { type: "facts"; facts: JobFact[] };

export type ParsedJobDescription = {
	blocks: JobDescriptionBlock[];
	/** Qualification/requirement bullets pulled from the body when present. */
	requirements: string[];
};

const SECTION_HEADERS = [
	"about the role",
	"about this role",
	"job description",
	"overview",
	"qualifications",
	"requirements",
	"responsibilities",
	"duties",
	"benefits",
	"what we offer",
	"compensation",
	"how to apply",
	"for immediate consideration",
	"apply now",
] as const;

const FACT_LABELS = [
	"job type",
	"setting",
	"population type",
	"duration",
	"location",
	"schedule",
	"shift",
	"salary",
	"pay",
	"employment type",
] as const;

const REQUIREMENTS_TITLES = new Set(["qualifications", "requirements"]);

const FACT_LABEL_PATTERN =
	"Job Type|Setting|Population Type|Duration|Location|Schedule|Shift|Salary|Pay|Employment Type";

function escapeRegExp(value: string): string {
	return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function titleCaseHeader(raw: string): string {
	return raw
		.replace(/:$/, "")
		.trim()
		.toLowerCase()
		.replace(/\b\w/g, (c) => c.toUpperCase());
}

function isSectionHeader(line: string): boolean {
	const normalized = line.replace(/:$/, "").trim().toLowerCase();
	return (SECTION_HEADERS as readonly string[]).includes(normalized);
}

function matchSectionHeaderPrefix(
	line: string,
): { header: string; rest: string } | null {
	for (const header of SECTION_HEADERS) {
		const re = new RegExp(`^${escapeRegExp(header)}\\s*:?\\s*`, "i");
		if (!re.test(line)) continue;
		const rest = line.replace(re, "").trim();
		return { header, rest };
	}
	return null;
}

function matchFactLabel(text: string): JobFact | null {
	const match = text.match(/^([A-Za-z][A-Za-z\s]{1,30}?):\s*(.+)$/);
	if (!match) return null;
	const label = match[1].trim();
	const value = match[2].trim();
	if (!(FACT_LABELS as readonly string[]).includes(label.toLowerCase()))
		return null;
	if (!value || value.length > 200) return null;
	if (new RegExp(`\\b(?:${FACT_LABEL_PATTERN}):`, "i").test(value)) return null;
	return { label, value };
}

function isBullet(line: string): boolean {
	return /^[•\-*]\s*/.test(line);
}

function stripBullet(line: string): string {
	return line.replace(/^[•\-*]\s*/, "").trim();
}

function splitLines(text: string): string[] {
	return text
		.split(/\n+/)
		.map((line) => line.trim())
		.filter(Boolean);
}

function truncateFactValue(value: string): string {
	let cleaned = value.trim().replace(/[.;]\s*$/, "");
	const sentenceEnd = cleaned.search(/(?<=\w)\.\s+[A-Z]/);
	if (sentenceEnd > 0) cleaned = cleaned.slice(0, sentenceEnd);
	return cleaned.trim();
}

/**
 * Insert structure into wall-of-text employer copy before section parsing.
 */
export function normalizeJobDescriptionText(raw: string): string {
	let text = raw
		.replace(/\r\n/g, "\n")
		.replace(/\u00a0/g, " ")
		.replace(/[ \t]+\n/g, "\n")
		.trim();

	// Mid-sentence bullets → own lines
	text = text.replace(/\s*[•●▪]\s*/g, "\n• ");

	// Break before common fact labels after a sentence end
	text = text.replace(
		new RegExp(`([.!?])\\s+(?=(?:${FACT_LABEL_PATTERN}):)`, "gi"),
		"$1\n\n",
	);

	// Mid-line section headers with a colon.
	// Multi-word role headers may appear mid-line without punctuation
	// ("…Insurance About the Role:"). Single-word headers like "benefits:"
	// only split after a clause boundary to avoid "offer strong benefits: medical".
	const headersByLength = [...SECTION_HEADERS].sort(
		(a, b) => b.length - a.length,
	);
	const aggressiveHeaders = new Set([
		"about the role",
		"about this role",
		"for immediate consideration",
		"how to apply",
		"what we offer",
		"job description",
	]);
	for (const header of headersByLength) {
		const pattern = aggressiveHeaders.has(header)
			? new RegExp(`([^\\n])\\s*(${escapeRegExp(header)})\\s*:`, "gi")
			: new RegExp(`(^|[.\\n!?])\\s*(${escapeRegExp(header)})\\s*:`, "gi");
		text = text.replace(
			pattern,
			(_full, boundary: string, matched: string) =>
				`${boundary}\n\n${titleCaseHeader(matched)}:\n`,
		);
	}

	// Bare headers already on their own line
	for (const header of headersByLength) {
		const pattern = new RegExp(
			`(?:^|\\n)\\s*(${escapeRegExp(header)})\\s*:?\\s*(?=\\n|$)`,
			"gi",
		);
		text = text.replace(
			pattern,
			(_full, matched: string) => `\n\n${titleCaseHeader(matched)}:\n`,
		);
	}

	// ALL-CAPS section labels anywhere (no colon required)
	text = text.replace(
		/\s*(QUALIFICATIONS|RESPONSIBILITIES|REQUIREMENTS|DUTIES|BENEFITS)\b\s*:?\s*/g,
		(_full, matched: string) => `\n\n${titleCaseHeader(matched)}:\n`,
	);

	text = text.replace(/^\s*•\s*$/gm, "");
	text = text.replace(
		/•\s*([^•\n]*?)\s+Benefits:\s*$/gim,
		"• $1\n\nBenefits:\n",
	);

	return text.replace(/\n{3,}/g, "\n\n").trim();
}

function extractInlineFacts(line: string): JobFact[] {
	const facts: JobFact[] = [];
	const labelsFound: { label: string; index: number }[] = [];
	const re = new RegExp(`\\b(${FACT_LABEL_PATTERN}):\\s*`, "gi");

	let match: RegExpExecArray | null;
	while ((match = re.exec(line)) !== null) {
		labelsFound.push({ label: match[1], index: match.index });
	}

	for (let i = 0; i < labelsFound.length; i++) {
		const current = labelsFound[i];
		const labelEnd = current.index + current.label.length + 1;
		const valueStart = line.slice(labelEnd).search(/\S/);
		if (valueStart < 0) continue;
		const start = labelEnd + valueStart;
		const end =
			i + 1 < labelsFound.length ? labelsFound[i + 1].index : line.length;
		const value = truncateFactValue(line.slice(start, end));
		if (!value || value.length > 160) continue;
		facts.push({ label: current.label, value });
	}

	return facts;
}

function stripInlineFacts(line: string, facts: JobFact[]): string {
	let remainder = line;
	for (const fact of facts) {
		const re = new RegExp(
			`${escapeRegExp(fact.label)}:\\s*${escapeRegExp(fact.value)}\\.?\\s*`,
			"i",
		);
		remainder = remainder.replace(re, "");
	}
	return remainder
		.replace(/\s{2,}/g, " ")
		.replace(/^[.\s]+|[.\s]+$/g, "")
		.trim();
}

/**
 * Parse employer job copy into display blocks + requirements list.
 */
export function parseJobDescription(raw: string): ParsedJobDescription {
	if (!raw?.trim()) return { blocks: [], requirements: [] };

	const lines = splitLines(normalizeJobDescriptionText(raw));
	const facts: JobFact[] = [];
	const blocks: JobDescriptionBlock[] = [];
	const requirements: string[] = [];

	let currentTitle: string | undefined;
	let collectingRequirements = false;
	let paragraphBuf: string[] = [];
	let listBuf: string[] = [];

	const flushList = () => {
		if (!listBuf.length) return;
		const items = listBuf
			.map(stripBullet)
			.map((item) => item.replace(/\*+$/, "").trim())
			.filter((item) => item.length > 0 && !isSectionHeader(item));
		listBuf = [];
		if (!items.length) return;

		// Lead prose under the same section should not keep a duplicate heading.
		const prev = blocks[blocks.length - 1];
		if (
			prev?.type === "paragraph" &&
			prev.title &&
			currentTitle &&
			prev.title.toLowerCase() === currentTitle.toLowerCase()
		) {
			blocks[blocks.length - 1] = { type: "paragraph", text: prev.text };
		}

		blocks.push({ type: "list", title: currentTitle, items });
		if (collectingRequirements) {
			for (const item of items) {
				if (requirements.length < 12) requirements.push(item.slice(0, 500));
			}
		}
		currentTitle = undefined;
		collectingRequirements = false;
	};

	const flushParagraph = () => {
		if (!paragraphBuf.length) return;
		const text = paragraphBuf
			.join(" ")
			.replace(/\s{2,}/g, " ")
			.trim();
		paragraphBuf = [];
		if (!text) return;

		if (currentTitle) {
			// Keep title open for following bullets; requirements come from bullets only.
			blocks.push({ type: "paragraph", title: currentTitle, text });
			return;
		}

		blocks.push({ type: "paragraph", text });
	};

	const flushAll = () => {
		flushList();
		flushParagraph();
		currentTitle = undefined;
		collectingRequirements = false;
	};

	const startSection = (header: string) => {
		flushAll();
		currentTitle = titleCaseHeader(header);
		collectingRequirements = REQUIREMENTS_TITLES.has(
			currentTitle.toLowerCase(),
		);
	};

	for (const line of lines) {
		if (isSectionHeader(line)) {
			startSection(line);
			continue;
		}

		const prefixed = matchSectionHeaderPrefix(line);
		if (prefixed) {
			const startsWithHeader = new RegExp(
				`^${escapeRegExp(prefixed.header)}\\b`,
				"i",
			).test(line);
			if (startsWithHeader) {
				startSection(prefixed.header);
				if (prefixed.rest) {
					if (isBullet(prefixed.rest)) listBuf.push(prefixed.rest);
					else paragraphBuf.push(prefixed.rest);
				}
				continue;
			}
		}

		if (!currentTitle && !listBuf.length) {
			const inlineFacts = extractInlineFacts(line);
			if (inlineFacts.length >= 1) {
				const onlyFacts = inlineFacts.length >= 2 || line.trim().length < 140;
				if (onlyFacts) {
					facts.push(...inlineFacts);
					const remainder = stripInlineFacts(line, inlineFacts);
					if (remainder && !isSectionHeader(remainder))
						paragraphBuf.push(remainder);
					continue;
				}
			}

			const loneFact = matchFactLabel(line);
			if (loneFact) {
				facts.push(loneFact);
				continue;
			}
		}

		if (isBullet(line)) {
			flushParagraph();
			const cleaned = stripBullet(line);
			if (isSectionHeader(cleaned)) {
				startSection(cleaned);
				continue;
			}
			listBuf.push(line);
			continue;
		}

		if (listBuf.length) {
			listBuf[listBuf.length - 1] = `${listBuf[listBuf.length - 1]} ${line}`;
			continue;
		}

		paragraphBuf.push(line);
	}

	flushAll();

	if (facts.length) {
		const byLabel = new Map<string, JobFact>();
		for (const fact of facts) byLabel.set(fact.label.toLowerCase(), fact);
		blocks.unshift({ type: "facts", facts: Array.from(byLabel.values()) });
	}

	return {
		blocks: blocks.filter((block) => {
			if (block.type === "list") return block.items.length > 0;
			if (block.type === "paragraph") return block.text.length > 0;
			return block.facts.length > 0;
		}),
		requirements,
	};
}

/**
 * Prefer JSearch highlight quals; fall back to parsing the description body.
 */
export function extractJobRequirements(
	description: string,
	highlightItems?: string[] | null,
): string[] {
	if (highlightItems?.length) {
		return highlightItems
			.map((item) => item.trim().slice(0, 500))
			.filter(Boolean)
			.slice(0, 8);
	}
	return parseJobDescription(description).requirements.slice(0, 8);
}
