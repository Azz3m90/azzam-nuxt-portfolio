interface SeoOptions {
  title?: string
  description?: string
  image?: string
  type?: 'website' | 'article' | 'profile'
  noIndex?: boolean
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

  useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    ogImage: image,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogType: options.type ?? 'website',
    ogUrl: fullUrl,
    ogSiteName: 'Azzam Aziz Ali Portfolio',
    ogLocale: locale.value === 'ar' ? 'ar_SA' : 'en_US',
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: image,
    twitterSite: '@azzamazizali',
    robots: options.noIndex ? 'noindex, nofollow' : 'index, follow',
  })

  useHead({
    htmlAttrs: { lang: locale.value, dir: locale.value === 'ar' ? 'rtl' : 'ltr' },
    link: [{ rel: 'canonical', href: fullUrl }],
  })
}

export const usePersonSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Azzam Aziz Ali',
  url: 'https://azzamazizali.com',
  image: 'https://azzamazizali.com/images/Azzam.jpg',
  jobTitle: 'Senior Full Stack Developer & SEO Specialist',
  description: 'Senior Full Stack Developer with 10+ years building SaaS. Google-certified SEO Specialist.',
  sameAs: [
    'https://www.linkedin.com/in/azzamazizali/',
    'https://github.com/Azz3m90',
    'https://stackoverflow.com/users/10049474/azzam-ali',
    'https://www.youtube.com/@azzamazizali',
  ],
  knowsAbout: ['Laravel', 'React', 'Vue.js', 'Django', 'TypeScript', 'SEO', 'SaaS Development'],
  address: { '@type': 'PostalAddress', addressLocality: 'Tartus', addressRegion: 'Syria' },
  worksFor: { '@type': 'Organization', name: 'FastCaisse', url: 'https://fastcaisse.be' },
})
