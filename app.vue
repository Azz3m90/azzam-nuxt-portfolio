<script setup lang="ts">
const { locale } = useI18n()
const colorMode = useColorMode()

useHead({
  htmlAttrs: {
    lang: locale,
    dir: computed(() => locale.value === 'ar' ? 'rtl' : 'ltr'),
    class: computed(() => colorMode.value === 'dark' ? 'dark' : ''),
  },
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Azzam Aziz Ali Portfolio',
        url: 'https://azzamazizali.com',
        description: 'Senior Full Stack Developer & SEO Specialist — Laravel, React, Vue, Django',
      }),
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Azzam Aziz Ali',
        url: 'https://azzamazizali.com',
        image: 'https://azzamazizali.com/images/Azzam.jpg',
        jobTitle: 'Senior Full Stack Developer & SEO Specialist',
        sameAs: [
          'https://www.linkedin.com/in/azzamazizali/',
          'https://github.com/Azz3m90',
          'https://stackoverflow.com/users/10049474/azzam-ali',
          'https://www.youtube.com/@azzamazizali',
        ],
        worksFor: { '@type': 'Organization', name: 'FastCaisse', url: 'https://fastcaisse.be' },
        address: { '@type': 'PostalAddress', addressLocality: 'Tartus', addressRegion: 'Syria' },
      }),
    },
  ],
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
