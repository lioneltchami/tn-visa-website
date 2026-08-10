import { type FeeSource, fees } from "@/lib/fees";

type FeeSourceLinksProps = {
	/** Limit to these source ids; default = all. */
	ids?: FeeSource["id"][];
	className?: string;
};

export default function FeeSourceLinks({
	ids,
	className,
}: FeeSourceLinksProps) {
	const sources = ids
		? fees.sources.filter((s) => ids.includes(s.id))
		: fees.sources;

	return (
		<aside
			className={
				className ??
				"mt-10 rounded-lg border border-border bg-bg-secondary/40 p-4 text-sm text-fg-secondary"
			}
		>
			<p className="font-semibold text-fg mb-2">Primary sources</p>
			<ul className="list-disc pl-5 space-y-1">
				{sources.map((s) => (
					<li key={s.id}>
						<a
							href={s.url}
							target="_blank"
							rel="noopener noreferrer"
							className="text-accent hover:underline"
						>
							{s.label}
						</a>
					</li>
				))}
			</ul>
			<p className="mt-2 text-xs text-fg-muted">
				Fee amounts on this site last verified {fees.lastVerified}. Always
				confirm the live agency page before paying — schedules change.
			</p>
		</aside>
	);
}
