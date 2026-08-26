"use client";

import {
	type JobDescriptionBlock,
	parseJobDescription,
} from "@/lib/job-description";

interface JobDescriptionProps {
	text: string;
	/** Hide sections already rendered elsewhere (e.g. Requirements list). */
	hideSections?: string[];
}

function FactsBlock({ facts }: { facts: { label: string; value: string }[] }) {
	return (
		<dl className="grid gap-2 sm:grid-cols-2 text-sm rounded border border-border p-4 bg-bg-secondary/40">
			{facts.map((fact) => (
				<div key={`${fact.label}:${fact.value}`} className="min-w-0">
					<dt className="text-fg-muted">{fact.label}</dt>
					<dd className="text-fg-secondary font-medium">{fact.value}</dd>
				</div>
			))}
		</dl>
	);
}

function Block({ block }: { block: JobDescriptionBlock }) {
	if (block.type === "facts") {
		return <FactsBlock facts={block.facts} />;
	}

	if (block.type === "list") {
		const looksLikeProse =
			block.items.length === 1 && block.items[0].length > 120;
		return (
			<div>
				{block.title && (
					<h3 className="font-medium text-fg mb-2">{block.title}</h3>
				)}
				{looksLikeProse ? (
					<p className="text-fg-secondary leading-relaxed">{block.items[0]}</p>
				) : (
					<ul className="list-disc pl-5 space-y-1">
						{block.items.map((item) => (
							<li key={item} className="text-fg-secondary">
								{item}
							</li>
						))}
					</ul>
				)}
			</div>
		);
	}

	return (
		<div>
			{block.title && (
				<h3 className="font-medium text-fg mb-2">{block.title}</h3>
			)}
			<p className="text-fg-secondary leading-relaxed">{block.text}</p>
		</div>
	);
}

export function JobDescription({
	text,
	hideSections = [],
}: JobDescriptionProps) {
	const hidden = new Set(hideSections.map((s) => s.toLowerCase()));
	const { blocks } = parseJobDescription(text);
	const visible = blocks.filter((block) => {
		if (!("title" in block) || !block.title) return true;
		return !hidden.has(block.title.toLowerCase());
	});

	if (!visible.length) {
		return <p className="text-fg-muted">No description provided.</p>;
	}

	return (
		<div className="space-y-5">
			{visible.map((block, index) => (
				<Block key={index} block={block} />
			))}
		</div>
	);
}
