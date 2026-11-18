/** JSON for a <script type="application/ld+json"> tag. Escapes U+003C so user text cannot close the tag. */
export function jsonLdHtml(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}
