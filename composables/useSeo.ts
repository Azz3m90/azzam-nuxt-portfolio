interface SeoOptions {
  title?: string
  description?: string
  image?: string
  imageAlt?: string
  type?: 'website' | 'article' | 'profile'
  noIndex?: boolean
  breadcrumb?: Array<{ name: string; url: string }>
  /** Real pixel size of `image`; defaults to the 1200×630 OG format. */
  imageWidth?: number
  imageHeight?: number
  /** Extra JSON-LD nodes for this page (e.g. a CreativeWork for a project). */
  schemas?: Record<string, unknown>[]
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
const PERSON_ID = `${CANONICAL_DOMAIN}/#person`
const WEBSITE_ID = `${CANONICAL_DOMAIN}/#website`
/** Default share image is the square portrait, not the 1200×630 OG format. */
const DEFAULT_IMAGE = { url: `${CANONICAL_DOMAIN}/images/Azzam.jpg`, width: 1223, height: 1223 }

const imageMime = (url: string) =>
  /\.png$/i.test(url) ? 'image/png' : /\.webp$/i.test(url) ? 'image/webp' : 'image/jpeg'

/**
 * Keep SERP titles in the ~50–60 char sweet spot. "Name — Qualifier — Brand" titles drop their
 * middle segments first so the brand survives; only then is the text cut, never mid-word.
 */
function normalizeTitle(raw: string): string {
  let title = raw.replace(/\s+/g, ' ').trim()
  if (title.length <= 60) return title
  const parts = title.split(' — ')
  while (parts.length > 2 && parts.join(' — ').length > 60) parts.splice(parts.length - 2, 1)
  // A long name is worth more than the brand suffix.
  while (parts.length > 1 && parts.join(' — ').length > 60) parts.pop()
  title = parts.join(' — ')
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

  const title = normalizeTitle(options.title ?? `${AUTHOR_NAME} | Full Stack Developer & SEO Specialist`)
  const description = normalizeDescription(
    options.description
      ?? 'Senior Full Stack Developer with 10+ years building SaaS platforms using Laravel, React, Vue & Django. SEO Specialist achieving 75% organic traffic growth.',
  )
  const image = toHttpsAbsolute(options.image ?? DEFAULT_IMAGE.url)
  const isDefaultImage = image === DEFAULT_IMAGE.url
  const imageWidth = options.imageWidth ?? (isDefaultImage ? DEFAULT_IMAGE.width : 1200)
  const imageHeight = options.imageHeight ?? (isDefaultImage ? DEFAULT_IMAGE.height : 630)
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
    ogImageWidth: imageWidth,
    ogImageHeight: imageHeight,
    ogImageType: imageMime(image),
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
          articleModifiedTime: options.article.modifiedTime ?? options.article.publishedTime,
          articleAuthor: [AUTHOR_NAME],
          articleTag: options.article.tags,
        }
      : {}),
  })

  const imageObject = { '@type': 'ImageObject', url: image, width: imageWidth, height: imageHeight }
  // Person and WebSite are full nodes in app.vue; referencing them by @id links the graph.
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': options.type === 'profile' ? 'ProfilePage' : 'WebPage',
    '@id': `${fullUrl}#webpage`,
    name: title,
    description,
    url: fullUrl,
    inLanguage: locale.value === 'ar' ? 'ar-SA' : 'en-US',
    isPartOf: { '@id': WEBSITE_ID },
    ...(options.type === 'profile' ? { mainEntity: { '@id': PERSON_ID } } : { author: { '@id': PERSON_ID } }),
    primaryImageOfPage: imageObject,
  }

  const scripts: Array<{ type: 'application/ld+json'; innerHTML: string }> = [
    { type: 'application/ld+json', innerHTML: JSON.stringify(webPageSchema) },
  ]

  // Article rich results need headline, image, author and datePublished.
  if (options.type === 'article') {
    scripts.push({
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        '@id': `${fullUrl}#article`,
        headline: title,
        description,
        url: fullUrl,
        mainEntityOfPage: { '@id': `${fullUrl}#webpage` },
        inLanguage: locale.value === 'ar' ? 'ar-SA' : 'en-US',
        image: imageObject,
        author: { '@type': 'Person', '@id': PERSON_ID, name: AUTHOR_NAME, url: CANONICAL_DOMAIN },
        publisher: { '@id': PERSON_ID },
        ...(options.article?.publishedTime ? { datePublished: options.article.publishedTime } : {}),
        dateModified: options.article?.modifiedTime ?? options.article?.publishedTime,
        ...(options.article?.tags?.length ? { keywords: options.article.tags.join(', ') } : {}),
      }),
    })
  }

  for (const schema of options.schemas ?? []) {
    scripts.push({ type: 'application/ld+json', innerHTML: JSON.stringify({ '@context': 'https://schema.org', ...schema }) })
  }

  if (options.breadcrumb && options.breadcrumb.length > 0) {
    // Breadcrumbs on /ar/ pages must point at the /ar/ URLs, or they contradict the canonical.
    const isAr = locale.value === 'ar'
    const localizeUrl = (url: string) => {
      const abs = toHttpsAbsolute(url)
      if (!isAr || !abs.startsWith(CANONICAL_DOMAIN)) return abs
      const path = abs.slice(CANONICAL_DOMAIN.length)
      return path === '/ar' || path.startsWith('/ar/') ? abs : `${CANONICAL_DOMAIN}/ar${path === '/' ? '' : path}`
    }
    scripts.push({
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: isAr ? 'الرئيسية' : 'Home', item: isAr ? `${CANONICAL_DOMAIN}/ar` : CANONICAL_DOMAIN },
          ...options.breadcrumb.map((crumb, i) => ({
            '@type': 'ListItem',
            position: i + 2,
            name: crumb.name,
            item: localizeUrl(crumb.url),
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
  alternateName: 'عزّام عزيز علي',
  image: {
    '@type': 'ImageObject',
    url: DEFAULT_IMAGE.url,
    width: DEFAULT_IMAGE.width,
    height: DEFAULT_IMAGE.height,
  },
  jobTitle: 'Senior Full Stack Developer & SEO Specialist',
  description: 'Senior Full Stack Developer with 10+ years building SaaS platforms using Laravel, React, Vue & Django. Google-certified SEO Specialist achieving 75% organic traffic growth.',
  email: 'projects@azzamazizali.sy',
  telephone: '+963983847632',
  sameAs: [
    'https://www.linkedin.com/in/azzamazizali/',
    'https://github.com/Azz3m90',
    'https://stackoverflow.com/users/10049474/azzam-ali',
    'https://www.youtube.com/@azzamazizali',
    'https://www.facebook.com/share/1DRNUw1GMQ/',
  ],
  knowsAbout: ['Laravel', 'PHP', 'React', 'Next.js', 'Vue.js', 'Nuxt', 'Django', 'Python', 'TypeScript', 'Technical SEO', 'Core Web Vitals', 'Internationalization (i18n)', 'SaaS Development'],
  knowsLanguage: ['en', 'ar'],
  address: { '@type': 'PostalAddress', addressLocality: 'Tartus', addressCountry: 'SY' },
  worksFor: [
    { '@type': 'Organization', name: 'AstraMind', url: 'https://astramind.de' },
    { '@type': 'Organization', name: 'FastCaisse', url: 'https://fastcaisse.be' },
  ],
  hasOccupation: {
    '@type': 'Occupation',
    name: 'Full Stack Developer',
    occupationLocation: { '@type': 'Country', name: 'Syria' },
    skills: 'Laravel, React, Vue.js, Django, TypeScript, Node.js, Technical SEO',
  },
  alumniOf: [
    {
      '@type': 'CollegeOrUniversity',
      name: 'Syrian Virtual University',
      url: 'https://svuonline.org',
      address: { '@type': 'PostalAddress', addressCountry: 'SY' },
    },
    {
      '@type': 'CollegeOrUniversity',
      name: 'Tishreen University',
      address: { '@type': 'PostalAddress', addressLocality: 'Lattakia', addressCountry: 'SY' },
    },
  ],
})
