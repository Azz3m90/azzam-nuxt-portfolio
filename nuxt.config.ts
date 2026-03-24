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

  colorMode: {
    classSuffix: '',
    preference: 'dark',
    fallback: 'dark',
    storageKey: 'nuxt-color-mode',
  },

  i18n: {
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
    quality: 85,
    formats: ['webp', 'avif'],
    screens: { xs: 320, sm: 640, md: 768, lg: 1024, xl: 1280, xxl: 1536 },
    provider: 'none',
  },

  content: {
    highlight: { theme: 'github-dark' },
    markdown: { toc: { depth: 3, searchDepth: 3 } },
  },

  sitemap: {
    siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://azzamazizali.sy',
    strictNuxtContentPaths: true,
    xsl: false,
    defaults: {
      changefreq: 'monthly' as const,
      priority: 0.8,
      lastmod: new Date().toISOString().split('T')[0],
    },
    urls: [
      { loc: '/', priority: 1.0, changefreq: 'weekly' as const, lastmod: new Date().toISOString().split('T')[0] },
      { loc: '/about', priority: 0.9, changefreq: 'monthly' as const, lastmod: new Date().toISOString().split('T')[0] },
      { loc: '/projects', priority: 0.9, changefreq: 'weekly' as const, lastmod: new Date().toISOString().split('T')[0] },
      { loc: '/case-studies', priority: 0.85, changefreq: 'monthly' as const, lastmod: new Date().toISOString().split('T')[0] },
      { loc: '/case-studies/fastcaisse', priority: 0.85, changefreq: 'monthly' as const, lastmod: new Date().toISOString().split('T')[0] },
      { loc: '/seo-services', priority: 0.9, changefreq: 'monthly' as const, lastmod: new Date().toISOString().split('T')[0] },
      { loc: '/resume', priority: 0.8, changefreq: 'monthly' as const, lastmod: new Date().toISOString().split('T')[0] },
      { loc: '/blog', priority: 0.85, changefreq: 'daily' as const, lastmod: new Date().toISOString().split('T')[0] },
      { loc: '/contact', priority: 0.8, changefreq: 'monthly' as const, lastmod: new Date().toISOString().split('T')[0] },
      { loc: '/privacy-policy', priority: 0.3, changefreq: 'yearly' as const, lastmod: new Date().toISOString().split('T')[0] },
    ],
  },

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      script: [
        {
          children: `if(location.hostname==='coruscating-blini-0b4753.netlify.app'){location.replace('https://azzamazizali.sy'+location.pathname+location.search+location.hash)}`,
        },
      ],
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
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/png', href: '/favicon.png', sizes: '32x32' },
        { rel: 'apple-touch-icon', href: '/favicon.png' },
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
    public: {
      turnstileSiteKey: process.env.NUXT_PUBLIC_TURNSTILE_SITEKEY || '0x4AAAAAACjhI98Fk0RqnlYp',
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://azzamazizali.sy',
      gaId: process.env.NUXT_PUBLIC_GA_ID || '',
      gscVerification: process.env.NUXT_PUBLIC_GSC_VERIFICATION || '',
    },
  },

  nitro: {
    prerender: { routes: ['/sitemap.xml', '/sitemap_index.xml'] },
  },

  typescript: { strict: true, shim: false },
  experimental: { viewTransition: true },
})
