<script setup lang="ts">
const { locale } = useI18n()

// Reciprocal hreflang + self-refs from @nuxtjs/i18n; pages set their own canonical via useSeo
const localeHead = useLocaleHead({ seo: true })

useHead(computed(() => ({
  titleTemplate: '%s',
  htmlAttrs: {
    lang: locale.value,
    dir: locale.value === 'ar' ? 'rtl' : 'ltr',
    ...(localeHead.value.htmlAttrs || {}),
  },
  link: (localeHead.value.link ?? []).filter((l: { rel?: string }) => l.rel !== 'canonical'),
  meta: localeHead.value.meta,
})))

// Site-wide entities. Page schemas from useSeo reference these by @id.
// No SearchAction: the site has no search, and Google retired the sitelinks search box in 2024.
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': 'https://azzamazizali.sy/#website',
        name: 'Azzam Aziz Ali Portfolio',
        alternateName: ['Azzam Aziz Ali', 'عزّام عزيز علي'],
        url: 'https://azzamazizali.sy',
        description: 'Senior Full Stack Developer & SEO Specialist — Laravel, React, Vue, Django',
        inLanguage: ['en-US', 'ar-SA'],
        publisher: { '@id': 'https://azzamazizali.sy/#person' },
      }),
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(usePersonSchema()),
    },
  ],
})

</script>

<template>
  <NuxtLoadingIndicator color="#3b82f6" :height="3" :duration="2000" :throttle="100" />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <AppToast />
</template>
