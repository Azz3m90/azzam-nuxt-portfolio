import { readFileSync, readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const SITE_URL = process.env.NUXT_PUBLIC_SITE_URL || 'https://azzamazizali.sy'
// Sitemap sources are read from the content itself, so a new project or post can't be forgotten.
const PROJECT_SLUGS = [...readFileSync(fileURLToPath(new URL('./composables/useProjects.ts', import.meta.url)), 'utf8')
  .matchAll(/^\s+slug: '([^']+)',\r?$/gm)].map(m => m[1]!)
const BLOG_DIR = fileURLToPath(new URL('./content/blog', import.meta.url))
const BLOG_POSTS = readdirSync(BLOG_DIR).filter(f => f.endsWith('.md')).map(file => ({
  slug: file.replace(/\.md$/, ''),
  date: readFileSync(`${BLOG_DIR}/${file}`, 'utf8').match(/^date:\s*["']?(\d{4}-\d{2}-\d{2})/m)?.[1],
}))

export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: false },

  ssr: true,

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@nuxt/image',
    '@nuxt/content',
    '@nuxtjs/i18n',
    '@nuxtjs/sitemap',
  ],

  // Required by @nuxtjs/sitemap + hreflang absolute URLs
  site: {
    url: SITE_URL,
    name: 'Azzam Aziz Ali Portfolio',
  },

  colorMode: {
    classSuffix: '',
    preference: 'dark',
    fallback: 'dark',
    storageKey: 'nuxt-color-mode',
  },

  i18n: {
    baseUrl: SITE_URL,
    locales: [
      { code: 'en', language: 'en-US', name: 'English', dir: 'ltr', file: 'en.json' },
      { code: 'ar', language: 'ar-SA', name: 'العربية', dir: 'rtl', file: 'ar.json' },
    ],
    defaultLocale: 'en',
    langDir: 'locales/',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: false,
  },

  image: {
    quality: 80,
    format: ['webp', 'avif'],
    screens: { xs: 320, sm: 640, md: 768, lg: 1024, xl: 1280, xxl: 1536 },
    provider: 'none',
  },

  content: {
    build: {
      markdown: {
        toc: { depth: 3, searchDepth: 3 },
        highlight: { theme: 'github-dark' },
      },
    },
  },

  // Privacy is noindex — keep it out of the sitemap.
  // With i18n, @nuxtjs/sitemap emits a sitemap index + per-locale sitemaps (with reciprocal hreflang);
  // _i18nTransform gives every project/post its /ar/ twin. Only real dates go into lastmod —
  // a build-date lastmod on every URL teaches Google to ignore the field.
  sitemap: {
    xsl: false,
    autoLastmod: true,
    exclude: [
      '/privacy-policy',
      '/ar/privacy-policy',
    ],
    urls: [
      ...PROJECT_SLUGS.map(slug => ({ loc: `/projects/${slug}`, _i18nTransform: true })),
      ...BLOG_POSTS.map(post => ({
        loc: `/blog/${post.slug}`,
        _i18nTransform: true,
        ...(post.date ? { lastmod: post.date } : {}),
      })),
    ],
  },

  routeRules: {
    // Static images change rarely; let browsers and CDNs reuse them (Lighthouse "efficient cache policy").
    '/images/**': { headers: { 'Cache-Control': 'public, max-age=2592000, stale-while-revalidate=86400' } },
    '/privacy-policy': { headers: { 'X-Robots-Tag': 'noindex, follow' } },
    '/ar/privacy-policy': { headers: { 'X-Robots-Tag': 'noindex, follow' } },
    '/**': {
      headers: {
        'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
        'X-Content-Type-Options': 'nosniff',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
      },
    },
  },

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      meta: [
        { name: 'theme-color', content: '#2563eb', media: '(prefers-color-scheme: light)' },
        { name: 'theme-color', content: '#0f172a', media: '(prefers-color-scheme: dark)' },
        { name: 'author', content: 'Azzam Aziz Ali' },
        { name: 'color-scheme', content: 'dark light' },
        { name: 'mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        { name: 'apple-mobile-web-app-title', content: 'Azzam Ali' },
        ...(process.env.NUXT_PUBLIC_GSC_VERIFICATION ? [{ name: 'google-site-verification', content: process.env.NUXT_PUBLIC_GSC_VERIFICATION }] : []),
        { name: 'thumbnail', content: 'https://azzamazizali.sy/images/Azzam.jpg' },
      ],
      link: [
        // Square, 48px-multiple icons: required for Google to show the favicon in search results.
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/png', sizes: '48x48', href: '/favicon-48x48.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'image_src', href: 'https://azzamazizali.sy/images/Azzam.jpg' },
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Noto+Kufi+Arabic:wght@400;500;600;700;800&display=swap',
        },
      ],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    turnstileSecret: process.env.TURNSTILE_SECRET_KEY || '',
    smtpHost: process.env.SMTP_HOST || '',
    smtpPort: process.env.SMTP_PORT || '465',
    smtpUser: process.env.SMTP_USER || '',
    smtpPass: process.env.SMTP_PASS || '',
    contactTo: process.env.CONTACT_TO || 'projects@azzamazizali.sy',
    indexNowKey: process.env.INDEXNOW_KEY || 'a7f3c9e2b8d14f6a9c0e5b2d8f1a4c7e',
    public: {
      turnstileSiteKey: process.env.NUXT_PUBLIC_TURNSTILE_SITEKEY || '0x4AAAAAACjhI98Fk0RqnlYp',
      siteUrl: SITE_URL,
      gaId: process.env.NUXT_PUBLIC_GA_ID || '',
      gscVerification: process.env.NUXT_PUBLIC_GSC_VERIFICATION || '',
      indexNowKey: process.env.INDEXNOW_KEY || 'a7f3c9e2b8d14f6a9c0e5b2d8f1a4c7e',
    },
  },

  nitro: {
    preset: 'node-server',
    minify: true,
    sourceMap: false,
    compressPublicAssets: true,
    prerender: { routes: ['/sitemap.xml'] },
  },

  typescript: { strict: true, shim: false },
  experimental: { viewTransition: true },
})
