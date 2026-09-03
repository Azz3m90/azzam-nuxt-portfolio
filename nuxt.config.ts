const SITE_URL = process.env.NUXT_PUBLIC_SITE_URL || 'https://azzamazizali.sy'
const TODAY = new Date().toISOString().split('T')[0]
const PROJECT_SLUGS = [
  'rsk-platform', 'az-containers-belgium', 'fastcaisse-ordering-platform', 'fastcaisse-kiosk',
  'lindenberg-apotheke', 'astramind', 'emtethal-landing-page', 'fastcaisse-marketing-site',
  'little-lemon-booking', 'il-moro-group', 'fastcaisse-online-ordering', 'gelato-naturale',
  'seetaha-award-debugger', 'seetah-scc', 'matthias-and-sea', 'geco-consulting',
  'hexabitz-code-editor', 'fastcaisse-pos-system', 'hexabitz-ide-system', 'hexabitz',
  'caresine-products', 'opinion-mining-system', 'opinion-mining-youtube', 'ecommerce-jackets',
  'university-indexer',
] as const

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
    formats: ['webp', 'avif'],
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

  // Privacy is noindex — keep it out of the sitemap. App sources + dynamic projects cover indexable URLs.
  // With i18n, @nuxtjs/sitemap emits a sitemap index + per-locale sitemaps (with reciprocal hreflang).
  sitemap: {
    xsl: false,
    autoLastmod: true,
    exclude: [
      '/privacy-policy',
      '/ar/privacy-policy',
    ],
    defaults: {
      changefreq: 'monthly' as const,
      priority: 0.8,
      lastmod: TODAY,
    },
    urls: PROJECT_SLUGS.map(slug => ({
      loc: `/projects/${slug}`,
      priority: 0.7 as const,
      changefreq: 'monthly' as const,
      lastmod: TODAY,
    })),
  },

  routeRules: {
    '/privacy-policy': { robots: 'noindex, follow' },
    '/ar/privacy-policy': { robots: 'noindex, follow' },
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
        { name: 'google-site-verification', content: process.env.NUXT_PUBLIC_GSC_VERIFICATION || '' },
        { name: 'thumbnail', content: 'https://azzamazizali.sy/images/Azzam.jpg' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/apple-touch-icon.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/apple-touch-icon.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/apple-touch-icon.png' },
        { rel: 'shortcut icon', type: 'image/png', href: '/apple-touch-icon.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'image_src', href: 'https://azzamazizali.sy/images/Azzam.jpg' },
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Noto+Kufi+Arabic:wght@300;400;500;600;700;800&display=swap',
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
