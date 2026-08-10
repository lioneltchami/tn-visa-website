import Link from "next/link";

export default function NotFound() {
	return (
		<div className="flex flex-col justify-center min-h-[50vh] gap-4 px-4 py-16 container-wide max-w-xl">
			<p className="font-display text-5xl font-bold text-accent">404</p>
			<h1 className="font-display text-2xl font-bold text-fg">
				Page not found
			</h1>
			<p className="text-fg-secondary max-w-md text-pretty">
				The page you&apos;re looking for doesn&apos;t exist or has been moved.
			</p>
			<div className="flex flex-wrap gap-3 mt-2">
				<Link href="/" className="btn-primary">
					Go home
				</Link>
				<Link href="/eligibility" className="btn-secondary">
					Check eligibility
				</Link>
			</div>
		</div>
	);
}
