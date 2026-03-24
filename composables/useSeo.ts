interface SeoOptions {
  title?: string
  description?: string
  image?: string
  imageAlt?: string
  type?: 'website' | 'article' | 'profile'
  noIndex?: boolean
  breadcrumb?: Array<{ name: string; url: string }>
}

export const useSeo = (options: SeoOptions = {}) => {
  const config = useRuntimeConfig()
  const route = useRoute()
  const { locale } = useI18n()

  const siteUrl = config.public.siteUrl as string
  const fullUrl = `${siteUrl}${route.path}`
  const defaultImage = `${siteUrl}/images/og-default.jpg`

  const title = options.title ?? 'Azzam Aziz Ali | Senior Full Stack Developer & SEO Specialist'
  const description = options.description ?? 'Senior Full Stack Developer with 10+ years building SaaS platforms using Laravel, React, Vue & Django. SEO Specialist achieving 75% organic traffic growth.'
  const image = options.image ?? defaultImage
  const imageAlt = options.imageAlt ?? 'Azzam Aziz Ali — Senior Full Stack Developer & SEO Specialist'
  const alternateLocale = locale.value === 'ar' ? 'en_US' : 'ar_SA'

  useSeoMeta({
    title,
    description,
    author: 'Azzam Aziz Ali',
    ogTitle: title,
    ogDescription: description,
    ogImage: image,
    ogImageAlt: imageAlt,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogType: options.type ?? 'website',
    ogUrl: fullUrl,
    ogSiteName: 'Azzam Aziz Ali Portfolio',
    ogLocale: locale.value === 'ar' ? 'ar_SA' : 'en_US',
    ogLocaleAlternate: [alternateLocale],
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: image,
    twitterImageAlt: imageAlt,
    twitterSite: '@azzamazizali',
    twitterCreator: '@azzamazizali',
    robots: options.noIndex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  })

  const scripts: Array<{ type: string; innerHTML: string }> = [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: title,
        description,
        url: fullUrl,
        inLanguage: locale.value === 'ar' ? 'ar-SA' : 'en-US',
        isPartOf: { '@type': 'WebSite', url: siteUrl, name: 'Azzam Aziz Ali Portfolio' },
        author: { '@type': 'Person', name: 'Azzam Aziz Ali', url: siteUrl },
        dateModified: new Date().toISOString().split('T')[0],
      }),
    },
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

  useHead({
    htmlAttrs: { lang: locale.value, dir: locale.value === 'ar' ? 'rtl' : 'ltr' },
    link: [
      { rel: 'canonical', href: fullUrl },
      {
        rel: 'alternate',
        hreflang: locale.value === 'ar' ? 'en' : 'ar',
        href: locale.value === 'ar' ? fullUrl.replace('/ar', '') : `${siteUrl}/ar${route.path}`,
      },
      { rel: 'alternate', hreflang: 'x-default', href: fullUrl.replace('/ar', '') || siteUrl },
    ],
    script: scripts,
  })
}

export const usePersonSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Azzam Aziz Ali',
  url: 'https://azzamazizali.sy',
  image: 'https://azzamazizali.sy/images/Azzam.jpg',
  jobTitle: 'Senior Full Stack Developer & SEO Specialist',
  description: 'Senior Full Stack Developer with 10+ years building SaaS. Google-certified SEO Specialist.',
  sameAs: [
    'https://www.linkedin.com/in/azzamazizali/',
    'https://github.com/Azz3m90',
    'https://stackoverflow.com/users/10049474/azzam-ali',
    'https://www.youtube.com/@azzamazizali',
  ],
  knowsAbout: ['Laravel', 'React', 'Vue.js', 'Django', 'TypeScript', 'SEO', 'SaaS Development'],
  address: { '@type': 'PostalAddress', addressLocality: 'Tartus', addressCountry: 'SY' },
  worksFor: { '@type': 'Organization', name: 'FastCaisse', url: 'https://fastcaisse.be' },
})
