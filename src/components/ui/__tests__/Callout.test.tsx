import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Callout } from "../Callout";

describe("Callout", () => {
	it("renders children content", () => {
		render(<Callout type="info">Test content</Callout>);
		expect(screen.getByText("Test content")).toBeInTheDocument();
	});

	it("renders title when provided", () => {
		render(
			<Callout type="warning" title="Warning Title">
				Content
			</Callout>,
		);
		expect(screen.getByText("Warning Title")).toBeInTheDocument();
	});

	it("renders without title", () => {
		render(<Callout type="tip">Just content</Callout>);
		expect(screen.getByText("Just content")).toBeInTheDocument();
	});

	it("applies correct styling for each type", () => {
		const { container: info } = render(<Callout type="info">Info</Callout>);
		expect(info.firstChild).toHaveClass("border");
		expect(info.firstChild).toHaveClass("border-border");

		const { container: danger } = render(
			<Callout type="danger">Danger</Callout>,
		);
		expect(danger.firstChild).toHaveClass("border");
		expect(screen.getByText("Danger")).toBeInTheDocument();
	});
});
