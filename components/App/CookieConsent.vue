<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()
const { showBanner, initConsent, acceptConsent, declineConsent } = useGdpr()

onMounted(() => {
  initConsent()
})
</script>

<template>
  <Transition name="cookie-banner">
    <div
      v-if="showBanner"
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      class="fixed bottom-0 start-0 end-0 z-[100] p-4 sm:p-0"
      :dir="locale === 'ar' ? 'rtl' : 'ltr'"
    >
      <div class="sm:m-4 sm:max-w-lg sm:ms-auto sm:me-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-2xl p-5">
        <div class="flex items-start gap-3 mb-4">
          <div class="shrink-0 w-9 h-9 rounded-lg bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center">
            <svg class="w-5 h-5 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div>
            <h2 class="text-sm font-semibold text-slate-800 dark:text-white">{{ t('gdpr.title') }}</h2>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              {{ t('gdpr.description') }}
              <NuxtLink
                :to="localePath('/privacy-policy')"
                class="text-primary-600 dark:text-primary-400 hover:underline"
              >{{ t('gdpr.learnMore') }}</NuxtLink>.
            </p>
          </div>
        </div>
        <div class="flex gap-2 justify-end">
          <button
            type="button"
            @click="declineConsent"
            class="px-4 py-2 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {{ t('gdpr.decline') }}
          </button>
          <button
            type="button"
            @click="acceptConsent"
            class="px-4 py-2 text-xs font-medium rounded-lg bg-primary-600 hover:bg-primary-700 text-white transition-colors"
          >
            {{ t('gdpr.accept') }}
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.cookie-banner-enter-active,
.cookie-banner-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.cookie-banner-enter-from,
.cookie-banner-leave-to {
  opacity: 0;
  transform: translateY(1rem);
}
</style>
