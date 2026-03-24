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

const showBackToTop = ref(false)

onMounted(() => {
  window.addEventListener('scroll', () => {
    showBackToTop.value = window.scrollY > 400
  })
})

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <div :class="['min-h-screen flex flex-col', locale === 'ar' ? 'font-arabic' : 'font-sans']">
    <AppHeader />
    <main class="flex-1 pt-16">
      <slot />
    </main>
    <AppFooter />
    <AppCookieConsent />

    <Transition name="back-to-top">
      <button
        v-if="showBackToTop"
        @click="scrollToTop"
        class="fixed bottom-6 end-6 z-50 w-11 h-11 rounded-full bg-primary-600 hover:bg-primary-700 text-white shadow-lg flex items-center justify-center transition-colors"
        aria-label="Back to top"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"/>
        </svg>
      </button>
    </Transition>
  </div>
</template>

<style scoped>
.back-to-top-enter-active,
.back-to-top-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.back-to-top-enter-from,
.back-to-top-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>
