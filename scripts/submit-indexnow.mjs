#!/usr/bin/env node
/**
 * Submit sitemap URLs to IndexNow after deploy.
 * Usage: node scripts/submit-indexnow.mjs
 * Optional: INDEXNOW_KEY, NUXT_PUBLIC_SITE_URL
 */
const SITE = (process.env.NUXT_PUBLIC_SITE_URL || 'https://azzamazizali.sy').replace(/\/$/, '')
const KEY = process.env.INDEXNOW_KEY || 'a7f3c9e2b8d14f6a9c0e5b2d8f1a4c7e'
const HOST = SITE.replace(/^https?:\/\//, '')

const STATIC_PATHS = [
  '/', '/about', '/projects', '/case-studies', '/case-studies/fastcaisse',
  '/seo-services', '/resume', '/blog', '/contact',
  '/ar', '/ar/about', '/ar/projects', '/ar/case-studies', '/ar/case-studies/fastcaisse',
  '/ar/seo-services', '/ar/resume', '/ar/blog', '/ar/contact',
]

const PROJECT_SLUGS = [
  'rsk-platform', 'az-containers-belgium', 'fastcaisse-ordering-platform', 'fastcaisse-kiosk',
  'lindenberg-apotheke', 'astramind', 'emtethal-landing-page', 'fastcaisse-marketing-site',
  'little-lemon-booking', 'il-moro-group', 'fastcaisse-online-ordering', 'gelato-naturale',
  'seetaha-award-debugger', 'seetah-scc', 'matthias-and-sea', 'geco-consulting',
  'hexabitz-code-editor', 'fastcaisse-pos-system', 'hexabitz-ide-system', 'hexabitz',
  'caresine-products', 'opinion-mining-system', 'opinion-mining-youtube', 'ecommerce-jackets',
  'university-indexer',
]

const urls = [
  ...STATIC_PATHS.map(p => `${SITE}${p === '/' ? '/' : p}`),
  ...PROJECT_SLUGS.flatMap(slug => [
    `${SITE}/projects/${slug}`,
    `${SITE}/ar/projects/${slug}`,
  ]),
]

const payload = {
  host: HOST,
  key: KEY,
  keyLocation: `https://${HOST}/${KEY}.txt`,
  urlList: urls,
}

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify(payload),
})

console.log(`IndexNow: ${res.status} ${res.statusText} — submitted ${urls.length} URLs`)
if (!res.ok) {
  const text = await res.text().catch(() => '')
  console.error(text)
  process.exit(1)
}
