import { statSync } from 'fs'
import { join } from 'path'

/**
 * Sitemap entries use their source page's mtime when it is available at build time.
 * Keep the entry's declared date as a fallback for generated routes and environments
 * where source files are not present.
 */
export function sitemapLastModified(route: string, fallback: string, sourceFile?: string): string {
  const appPath = route === '/' ? 'page.tsx' : `${route.slice(1)}/page.tsx`
  const file = sourceFile ?? join('src', 'app', appPath)

  try {
    return statSync(join(process.cwd(), file)).mtime.toISOString().slice(0, 10)
  } catch {
    return fallback
  }
}
