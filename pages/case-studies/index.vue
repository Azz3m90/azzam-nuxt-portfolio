<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

useSeo({
  title: t('meta.caseStudies.title'),
  description: t('meta.caseStudies.description'),
  image: 'https://azzamazizali.sy/images/Azzam.jpg',
  imageAlt: 'Case Studies — FastCaisse SaaS by Azzam Aziz Ali',
  breadcrumb: [{ name: 'Case Studies', url: 'https://azzamazizali.sy/case-studies' }],
})
</script>

<template>
  <div class="py-20">
    <div class="container-custom">
      <div class="text-center mb-16">
        <p class="section-label justify-center">{{ t('caseStudies.subtitle') }}</p>
        <h1 class="text-5xl font-extrabold text-slate-900 dark:text-white mb-4">
          {{ t('caseStudies.title') }}
        </h1>
        <p class="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
          {{ t('caseStudies.description') }}
        </p>
      </div>

      <div class="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <NuxtLink
          :to="localePath('/case-studies/fastcaisse')"
          class="card card-hover p-8 group"
        >
          <div class="flex items-center gap-3 mb-5">
            <div class="w-12 h-12 rounded-xl bg-primary-600 flex items-center justify-center text-white font-bold text-lg">FC</div>
            <div>
              <h2 class="text-xl font-bold text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                FastCaisse SaaS Platform
              </h2>
              <p class="text-sm text-slate-500">Multi-Restaurant Ordering System</p>
            </div>
          </div>

          <p class="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
            How I built and scaled a multi-restaurant SaaS ordering platform from zero to users in 4 countries using Laravel, Vue 3, and technical SEO.
          </p>

          <div class="grid grid-cols-2 gap-3 mb-6">
            <div class="bg-slate-50 dark:bg-slate-800 rounded-xl p-3 text-center">
              <p class="text-2xl font-extrabold gradient-text">34.6%</p>
              <p class="text-xs text-slate-500">Weekly User Growth</p>
            </div>
            <div class="bg-slate-50 dark:bg-slate-800 rounded-xl p-3 text-center">
              <p class="text-2xl font-extrabold gradient-text">75%</p>
              <p class="text-xs text-slate-500">Organic Traffic Increase</p>
            </div>
          </div>

          <div class="flex flex-wrap gap-1.5 mb-6">
            <span v-for="tag in ['Laravel', 'Vue 3', 'Technical SEO', 'SaaS', 'Multi-language']" :key="tag" class="badge text-xs">{{ tag }}</span>
          </div>

          <div class="flex items-center gap-2 text-primary-600 dark:text-primary-400 font-semibold text-sm group-hover:gap-3 transition-all">
            {{ t('caseStudies.readCaseStudy') }}
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </div>
        </NuxtLink>

        <div class="card p-8 border-dashed flex flex-col items-center justify-center text-center gap-4 opacity-60">
          <div class="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-2xl">🔜</div>
          <h2 class="text-xl font-bold text-slate-900 dark:text-white">More Case Studies</h2>
          <p class="text-slate-500 dark:text-slate-400 text-sm">
            CareSine e-commerce SEO, Hexabitz IoT IDE, and more case studies coming soon.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
