import clsx from "clsx";
import { AlertTriangle, Info, Lightbulb, XCircle } from "lucide-react";
import type { ReactNode } from "react";

const config = {
	warning: {
		icon: AlertTriangle,
		accent: "text-warning",
		bg: "bg-bg-secondary",
	},
	tip: {
		icon: Lightbulb,
		accent: "text-success",
		bg: "bg-bg-secondary",
	},
	info: {
		icon: Info,
		accent: "text-accent",
		bg: "bg-bg-secondary",
	},
	danger: {
		icon: XCircle,
		accent: "text-danger",
		bg: "bg-bg-secondary",
	},
};

interface CalloutProps {
	type: "warning" | "tip" | "info" | "danger";
	title?: string;
	children: ReactNode;
}

export function Callout({ type, title, children }: CalloutProps) {
	const { icon: Icon, accent, bg } = config[type];

	return (
		<div className={clsx("rounded border border-border p-4 my-6", bg)}>
			<div className="flex items-center gap-2 mb-2">
				<Icon className={clsx("w-5 h-5 shrink-0", accent)} aria-hidden />
				{title && <span className="font-bold text-fg">{title}</span>}
			</div>
			<div className="text-fg-secondary text-sm">{children}</div>
		</div>
	);
}
