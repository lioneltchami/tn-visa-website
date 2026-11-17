import { beforeEach, describe, expect, it } from "vitest";
import { createDownloadToken, verifyDownloadToken } from "@/lib/download-token";

const PURCHASE_ID = "3f2504e0-4f89-11d3-9a0c-0305e82c3301";

describe("download tokens", () => {
	beforeEach(() => {
		process.env.DOWNLOAD_TOKEN_SECRET = "test-secret-do-not-use-in-production";
	});

	it("round-trips a purchase id", async () => {
		const token = await createDownloadToken(PURCHASE_ID);
		expect(await verifyDownloadToken(token)).toMatchObject({
			purchaseId: PURCHASE_ID,
		});
	});

	it("rejects a tampered signature", async () => {
		const token = await createDownloadToken(PURCHASE_ID);
		const tampered = `${token.slice(0, -1)}${token.endsWith("a") ? "b" : "a"}`;
		expect(await verifyDownloadToken(tampered)).toBeNull();
	});

	it("rejects a swapped payload", async () => {
		const token = await createDownloadToken(PURCHASE_ID);
		const signature = token.slice(token.lastIndexOf(".") + 1);
		const forgedPayload = Buffer.from(
			`11111111-1111-1111-1111-111111111111.${Math.floor(Date.now() / 1000) + 60}`,
			"utf8",
		).toString("base64url");

		expect(await verifyDownloadToken(`${forgedPayload}.${signature}`)).toBeNull();
	});

	it("rejects an expired token", async () => {
		const token = await createDownloadToken(PURCHASE_ID, -1);
		expect(await verifyDownloadToken(token)).toBeNull();
	});

	it("rejects tokens signed with another secret", async () => {
		const token = await createDownloadToken(PURCHASE_ID);
		process.env.DOWNLOAD_TOKEN_SECRET = "a-different-secret";
		expect(await verifyDownloadToken(token)).toBeNull();
	});

	it("rejects malformed input", async () => {
		for (const value of [null, undefined, "", "not-a-token", "a.b", 42, {}]) {
			expect(await verifyDownloadToken(value)).toBeNull();
		}
	});

	it("refuses to sign a non-uuid purchase id", async () => {
		await expect(createDownloadToken("../../etc/passwd")).rejects.toThrow();
	});

	it("requires a dedicated secret in production", async () => {
		delete process.env.DOWNLOAD_TOKEN_SECRET;
		const previous = process.env.CF_PAGES;
		process.env.CF_PAGES = "1";
		try {
			await expect(createDownloadToken(PURCHASE_ID)).rejects.toThrow(
				"DOWNLOAD_TOKEN_SECRET must be set in production",
			);
		} finally {
			if (previous === undefined) delete process.env.CF_PAGES;
			else process.env.CF_PAGES = previous;
			process.env.DOWNLOAD_TOKEN_SECRET =
				"test-secret-do-not-use-in-production";
		}
	});
});
