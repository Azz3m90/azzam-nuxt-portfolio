<script setup lang="ts">
const { locale } = useI18n()

useHead({
  htmlAttrs: {
    lang: locale.value,
    dir: locale.value === 'ar' ? 'rtl' : 'ltr',
  },
})

watch(locale, (val) => {
  if (process.client) {
    document.documentElement.lang = val
    document.documentElement.dir = val === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.classList.remove('rtl', 'ltr')
    document.documentElement.classList.add(val === 'ar' ? 'rtl' : 'ltr')
  }
})
</script>

<template>
  <div :class="['min-h-screen flex flex-col', locale === 'ar' ? 'font-arabic' : 'font-sans']">
    <AppHeader />
    <main class="flex-1 pt-16">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
