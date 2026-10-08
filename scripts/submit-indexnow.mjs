#!/usr/bin/env node
/**
 * Submit sitemap URLs to IndexNow after deploy.
 * Usage: node scripts/submit-indexnow.mjs
 * Optional: INDEXNOW_KEY, NUXT_PUBLIC_SITE_URL
 */
import { readFileSync, readdirSync } from 'node:fs'

const SITE = (process.env.NUXT_PUBLIC_SITE_URL || 'https://azzamazizali.sy').replace(/\/$/, '')
const KEY = process.env.INDEXNOW_KEY || 'a7f3c9e2b8d14f6a9c0e5b2d8f1a4c7e'
const HOST = SITE.replace(/^https?:\/\//, '')

const STATIC_PATHS = [
  '/', '/about', '/projects', '/case-studies', '/case-studies/fastcaisse',
  '/seo-services', '/resume', '/blog', '/contact',
  '/ar', '/ar/about', '/ar/projects', '/ar/case-studies', '/ar/case-studies/fastcaisse',
  '/ar/seo-services', '/ar/resume', '/ar/blog', '/ar/contact',
]

// Same sources as the sitemap in nuxt.config.ts, so new projects and posts are never missed.
const PROJECT_SLUGS = [...readFileSync(new URL('../composables/useProjects.ts', import.meta.url), 'utf8')
  .matchAll(/^\s+slug: '([^']+)',\r?$/gm)].map(m => m[1])
const BLOG_SLUGS = readdirSync(new URL('../content/blog/', import.meta.url))
  .filter(f => f.endsWith('.md'))
  .map(f => f.replace(/\.md$/, ''))

const urls = [
  ...STATIC_PATHS.map(p => `${SITE}${p === '/' ? '/' : p}`),
  ...PROJECT_SLUGS.flatMap(slug => [
    `${SITE}/projects/${slug}`,
    `${SITE}/ar/projects/${slug}`,
  ]),
  ...BLOG_SLUGS.flatMap(slug => [
    `${SITE}/blog/${slug}`,
    `${SITE}/ar/blog/${slug}`,
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
