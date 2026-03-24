<script setup lang="ts">
const { locale } = useI18n()

useHead({
  htmlAttrs: {
    lang: locale,
    dir: computed(() => locale.value === 'ar' ? 'rtl' : 'ltr'),
  },
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Azzam Aziz Ali Portfolio',
        url: 'https://azzamazizali.sy',
        description: 'Senior Full Stack Developer & SEO Specialist — Laravel, React, Vue, Django',
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://azzamazizali.sy/?q={search_term_string}',
          'query-input': 'required name=search_term_string',
        },
      }),
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Azzam Aziz Ali',
        url: 'https://azzamazizali.sy',
        image: 'https://azzamazizali.sy/images/Azzam.jpg',
        jobTitle: 'Senior Full Stack Developer & SEO Specialist',
        description: 'Senior Full Stack Developer with 10+ years building SaaS platforms using Laravel, React, Vue & Django. SEO Specialist achieving 75% organic traffic growth.',
        email: 'azzam@azzamazizali.com',
        telephone: '+963991576641',
        knowsAbout: ['Laravel', 'React', 'Vue.js', 'Nuxt', 'Django', 'TypeScript', 'SEO', 'SaaS Development'],
        sameAs: [
          'https://www.linkedin.com/in/azzamazizali/',
          'https://github.com/Azz3m90',
          'https://stackoverflow.com/users/10049474/azzam-ali',
          'https://www.youtube.com/@azzamazizali',
          'https://www.facebook.com/azzam.ali.9484',
        ],
        worksFor: { '@type': 'Organization', name: 'FastCaisse', url: 'https://fastcaisse.be' },
        address: { '@type': 'PostalAddress', addressLocality: 'Tartus', addressCountry: 'SY' },
      }),
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
