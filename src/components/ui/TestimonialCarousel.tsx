"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";

const TESTIMONIALS = [
	{
		quote:
			"Used the eligibility checker and letter builder to prepare my application. Approved at Pearson in 20 minutes.",
		name: "Priya Sharma",
		role: "Software Developer",
		location: "Toronto, ON → San Francisco, CA",
	},
	{
		quote:
			"The profession pages helped me understand exactly what CBP looks for. The border interview guide was spot-on.",
		name: "Marc-André Dupont",
		role: "Financial Analyst",
		location: "Montreal, QC → New York, NY",
	},
	{
		quote:
			"After the June 2025 changes, I was worried my CS degree wouldn't work. This guide showed me the CSA path.",
		name: "James Chen",
		role: "Full-Stack Engineer",
		location: "Vancouver, BC → Seattle, WA",
	},
	{
		quote:
			"The fee calculator saved me from overpaying. I had no idea the costs varied so much by employer size.",
		name: "Aisha Okafor",
		role: "Registered Nurse",
		location: "Calgary, AB → Houston, TX",
	},
	{
		quote:
			"Got my TN approved at Peace Bridge using the employer letter template. The whole process took 45 minutes.",
		name: "Daniel Kowalski",
		role: "Management Consultant",
		location: "Toronto, ON → Chicago, IL",
	},
];

export default function TestimonialCarousel() {
	const [current, setCurrent] = useState(0);

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
		}, 5000);
		return () => clearInterval(timer);
	}, []);

	const t = TESTIMONIALS[current];

	return (
		<div className="max-w-2xl">
			<blockquote className="border border-border bg-bg p-6 sm:p-8 rounded">
				<p className="text-fg text-lg text-pretty mb-6">
					&ldquo;{t.quote}&rdquo;
				</p>
				<footer className="text-sm">
					<p className="font-semibold text-fg">{t.name}</p>
					<p className="text-fg-muted">
						{t.role} · {t.location}
					</p>
				</footer>
			</blockquote>
			<div className="flex gap-2 mt-4" role="tablist" aria-label="Testimonials">
				{TESTIMONIALS.map((_, i) => (
					<button
						key={i}
						type="button"
						role="tab"
						aria-selected={i === current}
						aria-label={`Show testimonial ${i + 1}`}
						onClick={() => setCurrent(i)}
						className={clsx(
							"h-2 w-6 rounded transition-colors",
							i === current ? "bg-accent" : "bg-border hover:bg-border-hover",
						)}
					/>
				))}
			</div>
		</div>
	);
}
