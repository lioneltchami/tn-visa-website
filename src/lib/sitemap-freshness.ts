/**
 * Sitemap entries use the declared fallback date.
 * Source files are not on the Edge isolate, so mtime is not available at runtime.
 */
export function sitemapLastModified(route: string, fallback: string, sourceFile?: string): string {
  void route
  void sourceFile
  return fallback
}
