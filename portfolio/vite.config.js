import process from 'node:process'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, loadEnv } from 'vite'
import projects from './src/data/projects.js'
import { defaultDescription, formatTitle, pageMeta } from './src/data/seo.js'
import { STATUE_SRC } from './src/data/statue.js'

const escapeHtml = (value) => String(value)
  .replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// Static <head> tags matching <SEO> for crawlers that skip JS; main.jsx removes them on boot.
function headFor(siteUrl, path, { title, description = defaultDescription, type = 'website' }) {
  const fullTitle = escapeHtml(formatTitle(title))
  const desc = escapeHtml(description)
  const url = `${siteUrl}${path}`
  const image = `${siteUrl}/og-image.png`
  return [
    `<title data-prerender>${fullTitle}</title>`,
    `<meta data-prerender name="description" content="${desc}" />`,
    `<link data-prerender rel="canonical" href="${url}" />`,
    `<meta data-prerender property="og:title" content="${fullTitle}" />`,
    `<meta data-prerender property="og:description" content="${desc}" />`,
    `<meta data-prerender property="og:type" content="${type}" />`,
    `<meta data-prerender property="og:url" content="${url}" />`,
    '<meta data-prerender property="og:site_name" content="Sameer Shameem" />',
    `<meta data-prerender property="og:image" content="${image}" />`,
    '<meta data-prerender property="og:image:width" content="1200" />',
    '<meta data-prerender property="og:image:height" content="630" />',
    '<meta data-prerender name="twitter:card" content="summary_large_image" />',
    `<meta data-prerender name="twitter:title" content="${fullTitle}" />`,
    `<meta data-prerender name="twitter:description" content="${desc}" />`,
    `<meta data-prerender name="twitter:image" content="${image}" />`,
  ].join('\n    ')
}

// Emits sitemap.xml + robots.txt from the real routes so they never drift from the app.
function seoFiles(siteUrl) {
  const routes = [
    ['/', 'weekly', '1.0', pageMeta['/']],
    ['/work', 'weekly', '0.9', pageMeta['/work']],
    ['/services', 'monthly', '0.8', pageMeta['/services']],
    ['/about', 'monthly', '0.8', pageMeta['/about']],
    ['/contact', 'monthly', '0.8', pageMeta['/contact']],
    ...projects.map((p) => [`/work/${p.slug}`, 'monthly', '0.7', { title: `${p.title} — Case Study`, description: p.summary }]),
  ]

  return {
    name: 'seo-files',
    apply: 'build',
    enforce: 'post',
    generateBundle(_, bundle) {
      // Pre-render route-specific <head> into <route>/index.html.
      const shell = bundle['index.html']
      if (shell?.type === 'asset') {
        const html = String(shell.source)
        const withHead = (path, meta) => html.replace(
          /<!--seo:start-->[\s\S]*?<!--seo:end-->/,
          headFor(siteUrl, path, meta),
        )
        for (const [path, , , meta] of routes) {
          // Home only: start fetching the statue texture with the HTML (it is the hero's main image).
          if (path === '/') {
            shell.source = withHead(path, meta).replace(
              '</head>',
              `  <link rel="preload" as="image" href="${STATUE_SRC}" type="image/webp" fetchpriority="high" />\n  </head>`,
            )
          }
          else this.emitFile({ type: 'asset', fileName: `${path.slice(1)}/index.html`, source: withHead(path, meta) })
        }
      }

      const lastmod = new Date().toISOString().slice(0, 10)
      const urls = routes
        .map(([path, changefreq, priority]) => `  <url>\n    <loc>${siteUrl}${path}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`)
        .join('\n')
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      })
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const siteUrl = (env.VITE_SITE_URL || 'https://sameer-portfolio.example.com').replace(/\/$/, '')

  return {
    plugins: [react(), tailwindcss(), seoFiles(siteUrl)],
    build: {
      // The 3D scene (three.js) is a lazy chunk loaded only on the home page.
      chunkSizeWarningLimit: 1100,
    },
  }
})
