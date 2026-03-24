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

export const useSeo = (options: SeoOptions = {}) => {
  const config = useRuntimeConfig()
  const route = useRoute()
  const { locale } = useI18n()

  const siteUrl = config.public.siteUrl as string
  const fullUrl = `${siteUrl}${route.path}`
  const defaultImage = `${siteUrl}/images/og-default.jpg`

  const title = options.title ?? `${AUTHOR_NAME} | Full Stack Developer & SEO Specialist`
  const description = options.description ?? 'Senior Full Stack Developer with 10+ years building SaaS platforms using Laravel, React, Vue & Django. SEO Specialist achieving 75% organic traffic growth.'
  const image = options.image ?? defaultImage
  const imageAlt = options.imageAlt ?? `${AUTHOR_NAME} — Senior Full Stack Developer & SEO Specialist`
  const ogLocale = locale.value === 'ar' ? 'ar_SA' : 'en_US'
  const alternateLocale = locale.value === 'ar' ? 'en_US' : 'ar_SA'

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
      ? 'noindex, nofollow'
      : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    ...(options.type === 'article' && options.article
      ? {
          articlePublishedTime: options.article.publishedTime,
          articleModifiedTime: options.article.modifiedTime ?? new Date().toISOString(),
          articleAuthor: AUTHOR_NAME,
          articleTag: options.article.tags?.join(', '),
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
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: SITE_NAME,
      description: 'Portfolio of Azzam Aziz Ali — Senior Full Stack Developer & SEO Specialist',
      publisher: {
        '@type': 'Person',
        '@id': `${siteUrl}/#person`,
        name: AUTHOR_NAME,
      },
    },
    author: {
      '@type': 'Person',
      '@id': `${siteUrl}/#person`,
      name: AUTHOR_NAME,
      url: siteUrl,
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
          { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
          ...options.breadcrumb.map((crumb, i) => ({
            '@type': 'ListItem',
            position: i + 2,
            name: crumb.name,
            item: crumb.url,
          })),
        ],
      }),
    })
  }

  const enPath = route.path.replace(/^\/ar/, '') || '/'
  const arPath = `/ar${enPath === '/' ? '' : enPath}`

  useHead({
    htmlAttrs: { lang: locale.value, dir: locale.value === 'ar' ? 'rtl' : 'ltr' },
    link: [
      { rel: 'canonical', href: fullUrl },
      {
        rel: 'alternate',
        hreflang: 'en',
        href: `${siteUrl}${enPath}`,
      },
      {
        rel: 'alternate',
        hreflang: 'ar',
        href: `${siteUrl}${arPath}`,
      },
      {
        rel: 'alternate',
        hreflang: 'x-default',
        href: `${siteUrl}${enPath}`,
      },
    ],
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
  email: 'azzam@azzamazizali.sy',
  telephone: '+963991576641',
  sameAs: [
    'https://www.linkedin.com/in/azzamazizali/',
    'https://github.com/Azz3m90',
    'https://stackoverflow.com/users/10049474/azzam-ali',
    'https://www.youtube.com/@azzamazizali',
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
