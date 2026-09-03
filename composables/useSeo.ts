interface SeoOptions {
  title?: string
  description?: string
  image?: string
  imageAlt?: string
  type?: 'website' | 'article' | 'profile'
  noIndex?: boolean
  breadcrumb?: Array<{ name: string; url: string }>
  article?: {
    publishedTime?: string
    modifiedTime?: string
    tags?: string[]
  }
}

const SITE_NAME = 'Azzam Aziz Ali Portfolio'
const AUTHOR_NAME = 'Azzam Aziz Ali'
const TWITTER_HANDLE = '@azzamazizali'
const CANONICAL_DOMAIN = 'https://azzamazizali.sy'

/** Keep SERP titles in the ~50–60 char sweet spot without cutting mid-word awkwardly. */
function normalizeTitle(raw: string): string {
  const title = raw.replace(/\s+/g, ' ').trim()
  if (title.length <= 60) return title
  const cut = title.slice(0, 57)
  const lastSpace = cut.lastIndexOf(' ')
  return `${(lastSpace > 40 ? cut.slice(0, lastSpace) : cut).trimEnd()}…`
}

/** Cap meta descriptions at ~160 chars (Screaming Frog / GSC). Callers supply 150+ where possible. */
function normalizeDescription(raw: string): string {
  const text = raw.replace(/\s+/g, ' ').trim()
  if (text.length <= 160) return text
  const cut = text.slice(0, 157)
  const lastSpace = cut.lastIndexOf(' ')
  return `${(lastSpace > 120 ? cut.slice(0, lastSpace) : cut).trimEnd()}…`
}

function toHttpsAbsolute(url: string): string {
  if (!url) return CANONICAL_DOMAIN
  if (url.startsWith('https://')) return url
  if (url.startsWith('http://')) return url.replace(/^http:\/\//i, 'https://')
  if (url.startsWith('/')) return `${CANONICAL_DOMAIN}${url}`
  return url
}

export const useSeo = (options: SeoOptions = {}) => {
  const route = useRoute()
  const { locale } = useI18n()

  const fullUrl = toHttpsAbsolute(`${CANONICAL_DOMAIN}${route.path === '/' ? '/' : route.path.replace(/\/$/, '')}`)
  const defaultImage = `${CANONICAL_DOMAIN}/images/Azzam.jpg`

  const title = normalizeTitle(options.title ?? `${AUTHOR_NAME} | Full Stack Developer & SEO Specialist`)
  const description = normalizeDescription(
    options.description
      ?? 'Senior Full Stack Developer with 10+ years building SaaS platforms using Laravel, React, Vue & Django. SEO Specialist achieving 75% organic traffic growth.',
  )
  const image = toHttpsAbsolute(options.image ?? defaultImage)
  const imageAlt = options.imageAlt ?? `${AUTHOR_NAME} — Senior Full Stack Developer & SEO Specialist`
  const ogLocale = locale.value === 'ar' ? 'ar_SA' : 'en_US'
  const alternateLocale = locale.value === 'ar' ? 'en_US' : 'ar_SA'

  // titleTemplate '%s' prevents Unhead treating "A | B" as title+template and dropping the suffix
  useHead({ titleTemplate: '%s' })

  useSeoMeta({
    title,
    description,
    author: AUTHOR_NAME,
    ogTitle: title,
    ogDescription: description,
    ogImage: image,
    ogImageAlt: imageAlt,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogImageType: 'image/jpeg',
    ogImageSecureUrl: image,
    ogType: options.type ?? 'website',
    ogUrl: fullUrl,
    ogSiteName: SITE_NAME,
    ogLocale,
    ogLocaleAlternate: [alternateLocale],
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: image,
    twitterImageAlt: imageAlt,
    twitterSite: TWITTER_HANDLE,
    twitterCreator: TWITTER_HANDLE,
    robots: options.noIndex
      ? 'noindex, follow'
      : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    ...(options.type === 'article' && options.article
      ? {
          articlePublishedTime: options.article.publishedTime,
          articleModifiedTime: options.article.modifiedTime ?? new Date().toISOString(),
          articleAuthor: [AUTHOR_NAME],
          articleTag: options.article.tags,
        }
      : {}),
  })

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': options.type === 'article' ? 'Article' : 'WebPage',
    name: title,
    description,
    url: fullUrl,
    inLanguage: locale.value === 'ar' ? 'ar-SA' : 'en-US',
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${CANONICAL_DOMAIN}/#website`,
      url: CANONICAL_DOMAIN,
      name: SITE_NAME,
      description: 'Portfolio of Azzam Aziz Ali — Senior Full Stack Developer & SEO Specialist',
      publisher: {
        '@type': 'Person',
        '@id': `${CANONICAL_DOMAIN}/#person`,
        name: AUTHOR_NAME,
      },
    },
    author: {
      '@type': 'Person',
      '@id': `${CANONICAL_DOMAIN}/#person`,
      name: AUTHOR_NAME,
      url: CANONICAL_DOMAIN,
    },
    image: {
      '@type': 'ImageObject',
      url: image,
      width: 1200,
      height: 630,
    },
    dateModified: options.article?.modifiedTime ?? new Date().toISOString().split('T')[0],
    ...(options.article?.publishedTime ? { datePublished: options.article.publishedTime } : {}),
  }

  const scripts: Array<{ type: string; innerHTML: string }> = [
    { type: 'application/ld+json', innerHTML: JSON.stringify(webPageSchema) },
  ]

  if (options.breadcrumb && options.breadcrumb.length > 0) {
    scripts.push({
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: CANONICAL_DOMAIN },
          ...options.breadcrumb.map((crumb, i) => ({
            '@type': 'ListItem',
            position: i + 2,
            name: crumb.name,
            item: toHttpsAbsolute(crumb.url),
          })),
        ],
      }),
    })
  }

  // Canonical only — hreflang comes from useLocaleHead in app.vue (reciprocal + self-ref)
  useHead({
    htmlAttrs: { lang: locale.value, dir: locale.value === 'ar' ? 'rtl' : 'ltr' },
    link: [{ rel: 'canonical', href: fullUrl }],
    script: scripts,
  })
}

export const usePersonSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': 'https://azzamazizali.sy/#person',
  name: 'Azzam Aziz Ali',
  url: 'https://azzamazizali.sy',
  image: {
    '@type': 'ImageObject',
    url: 'https://azzamazizali.sy/images/Azzam.jpg',
    width: 400,
    height: 400,
  },
  jobTitle: 'Senior Full Stack Developer & SEO Specialist',
  description: 'Senior Full Stack Developer with 10+ years building SaaS. Google-certified SEO Specialist.',
  email: 'projects@azzamazizali.sy',
  telephone: '+963983847632',
  sameAs: [
    'https://www.linkedin.com/in/azzamazizali/',
    'https://github.com/Azz3m90',
    'https://stackoverflow.com/users/10049474/azzam-ali',
    'https://www.youtube.com/@azzamazizali',
    'https://www.facebook.com/share/1DRNUw1GMQ/',
  ],
  knowsAbout: ['Laravel', 'React', 'Vue.js', 'Django', 'TypeScript', 'SEO', 'SaaS Development'],
  knowsLanguage: ['en', 'ar'],
  address: { '@type': 'PostalAddress', addressLocality: 'Tartus', addressCountry: 'SY' },
  worksFor: { '@type': 'Organization', name: 'FastCaisse', url: 'https://fastcaisse.be' },
  hasOccupation: {
    '@type': 'Occupation',
    name: 'Full Stack Developer',
    occupationLocation: { '@type': 'Country', name: 'Syria' },
    skills: 'Laravel, React, Vue.js, Django, TypeScript, Node.js, Technical SEO',
  },
  alumniOf: {
    '@type': 'EducationalOrganization',
    name: 'Tishreen University',
    address: { '@type': 'PostalAddress', addressLocality: 'Lattakia', addressCountry: 'SY' },
  },
})
