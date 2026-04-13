<script setup lang="ts">
const { t, tm, rt } = useI18n()
const localePath = useLocalePath()

useSeo({
  title: 'FastCaisse SaaS Case Study | 34% User Growth & 75% Organic Traffic – Azzam Aziz Ali',
  description: 'How I built FastCaisse — a multi-restaurant SaaS ordering platform — achieving 34.6% weekly user growth and 75% organic traffic increase through Laravel, Vue 3, and technical SEO.',
  image: 'https://azzamazizali.sy/images/Azzam.jpg',
  imageAlt: 'FastCaisse SaaS Case Study — 34% User Growth by Azzam Aziz Ali',
  type: 'article',
  breadcrumb: [
    { name: 'Case Studies', url: 'https://azzamazizali.sy/case-studies' },
    { name: 'FastCaisse', url: 'https://azzamazizali.sy/case-studies/fastcaisse' },
  ],
  article: {
    publishedTime: '2024-01-01',
    tags: ['SaaS', 'Laravel', 'Vue 3', 'SEO', 'FastCaisse'],
  },
})

const problemBullets = computed(() => (tm('caseStudies.fastcaisseDetail.problem.bullets') as any[]).map(rt))
const archItems = computed(() => (tm('caseStudies.fastcaisseDetail.strategy.architecture.items') as any[]).map(rt))
const seoItems = computed(() => (tm('caseStudies.fastcaisseDetail.strategy.seo.items') as any[]).map(rt))
const paymentItems = computed(() => (tm('caseStudies.fastcaisseDetail.strategy.payments.items') as any[]).map(rt))
const multilangItems = computed(() => (tm('caseStudies.fastcaisseDetail.strategy.multilang.items') as any[]).map(rt))

const results = computed(() => [
  { label: t('caseStudies.fastcaisseDetail.results.activeUsers'), value: t('caseStudies.fastcaisseDetail.results.activeUsersVal') },
  { label: t('caseStudies.fastcaisseDetail.results.eventsTracked'), value: t('caseStudies.fastcaisseDetail.results.eventsTrackedVal') },
  { label: t('caseStudies.fastcaisseDetail.results.pageViews'), value: t('caseStudies.fastcaisseDetail.results.pageViewsVal') },
  { label: t('caseStudies.fastcaisseDetail.results.userGrowth'), value: t('caseStudies.fastcaisseDetail.results.userGrowthVal') },
  { label: t('caseStudies.fastcaisseDetail.results.organicSessions'), value: t('caseStudies.fastcaisseDetail.results.organicSessionsVal') },
  { label: t('caseStudies.fastcaisseDetail.results.countries'), value: t('caseStudies.fastcaisseDetail.results.countriesVal') },
])
</script>

<template>
  <div class="py-20">
    <div class="container-custom max-w-4xl">
      <div class="mb-4">
        <NuxtLink :to="localePath('/case-studies')" class="btn-ghost text-sm ps-0">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
          {{ t('caseStudies.fastcaisseDetail.back') }}
        </NuxtLink>
      </div>

      <div class="mb-12">
        <div class="flex flex-wrap gap-2 mb-4">
          <span class="badge">SaaS</span>
          <span class="badge">Laravel</span>
          <span class="badge">Vue 3</span>
          <span class="badge">Technical SEO</span>
        </div>
        <h1 class="text-5xl font-extrabold text-slate-900 dark:text-white mb-4 leading-tight">
          {{ t('caseStudies.fastcaisseDetail.heroTitle') }}
        </h1>
        <p class="text-xl text-slate-500 dark:text-slate-400 leading-relaxed">
          {{ t('caseStudies.fastcaisseDetail.heroDesc') }}
        </p>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-14">
        <div class="metric-card card-hover">
          <div class="metric-value">34.6%</div>
          <div class="metric-label">{{ t('caseStudies.fastcaisseDetail.metrics.weeklyUserGrowth') }}</div>
        </div>
        <div class="metric-card card-hover">
          <div class="metric-value">75%</div>
          <div class="metric-label">{{ t('caseStudies.fastcaisseDetail.metrics.organicTrafficIncrease') }}</div>
        </div>
        <div class="metric-card card-hover">
          <div class="metric-value">62.6%</div>
          <div class="metric-label">{{ t('caseStudies.fastcaisseDetail.metrics.eventCountGrowth') }}</div>
        </div>
        <div class="metric-card card-hover">
          <div class="metric-value">54.2%</div>
          <div class="metric-label">{{ t('caseStudies.fastcaisseDetail.metrics.pageViewsIncrease') }}</div>
        </div>
      </div>

      <div class="prose prose-lg dark:prose-invert max-w-none space-y-12">
        <div class="card p-8 border-l-4 border-red-500">
          <h2 class="text-2xl font-extrabold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
            <span class="text-red-500">⚠</span> {{ t('caseStudies.problem') }}
          </h2>
          <p class="text-slate-600 dark:text-slate-300 leading-relaxed">
            {{ t('caseStudies.fastcaisseDetail.problem.intro') }}
          </p>
          <ul class="mt-4 space-y-2 text-slate-600 dark:text-slate-300">
            <li v-for="bullet in problemBullets" :key="bullet" class="flex items-start gap-2">
              <span class="text-red-400 mt-1">✗</span>
              {{ bullet }}
            </li>
          </ul>
        </div>

        <div class="card p-8 border-l-4 border-primary-500">
          <h2 class="text-2xl font-extrabold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
            <span class="text-primary-500">🧠</span> {{ t('caseStudies.strategy') }}
          </h2>
          <div class="space-y-4 text-slate-600 dark:text-slate-300">
            <p>{{ t('caseStudies.fastcaisseDetail.strategy.intro') }}</p>
            <div class="grid sm:grid-cols-2 gap-4">
              <div class="bg-slate-50 dark:bg-slate-800 rounded-xl p-4">
                <h3 class="font-bold text-slate-900 dark:text-white mb-2">{{ t('caseStudies.fastcaisseDetail.strategy.architecture.title') }}</h3>
                <ul class="text-sm space-y-1">
                  <li v-for="item in archItems" :key="item">{{ item }}</li>
                </ul>
              </div>
              <div class="bg-slate-50 dark:bg-slate-800 rounded-xl p-4">
                <h3 class="font-bold text-slate-900 dark:text-white mb-2">{{ t('caseStudies.fastcaisseDetail.strategy.seo.title') }}</h3>
                <ul class="text-sm space-y-1">
                  <li v-for="item in seoItems" :key="item">{{ item }}</li>
                </ul>
              </div>
              <div class="bg-slate-50 dark:bg-slate-800 rounded-xl p-4">
                <h3 class="font-bold text-slate-900 dark:text-white mb-2">{{ t('caseStudies.fastcaisseDetail.strategy.payments.title') }}</h3>
                <ul class="text-sm space-y-1">
                  <li v-for="item in paymentItems" :key="item">{{ item }}</li>
                </ul>
              </div>
              <div class="bg-slate-50 dark:bg-slate-800 rounded-xl p-4">
                <h3 class="font-bold text-slate-900 dark:text-white mb-2">{{ t('caseStudies.fastcaisseDetail.strategy.multilang.title') }}</h3>
                <ul class="text-sm space-y-1">
                  <li v-for="item in multilangItems" :key="item">{{ item }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="card p-8 border-l-4 border-slate-400">
          <h2 class="text-2xl font-extrabold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
            <span>⚙️</span> {{ t('caseStudies.stack') }}
          </h2>
          <div class="flex flex-wrap gap-2">
            <span v-for="tech in ['Laravel 10', 'Vue 3', 'Nuxt 3', 'TypeScript', 'MySQL', 'Redis', 'Tailwind CSS', 'Stripe', 'Mollie', 'Screaming Frog', 'Google Search Console', 'Google Analytics 4', 'REST API', 'Hreflang']" :key="tech" class="badge">
              {{ tech }}
            </span>
          </div>
        </div>

        <div class="card p-8 border-l-4 border-emerald-500">
          <h2 class="text-2xl font-extrabold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
            <span class="text-emerald-500">📊</span> {{ t('caseStudies.results') }}
          </h2>
          <div class="grid sm:grid-cols-2 gap-4 mb-6">
            <div v-for="result in results" :key="result.label" class="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-4">
              <p class="font-bold text-emerald-700 dark:text-emerald-300">{{ result.value }}</p>
              <p class="text-sm text-slate-500 dark:text-slate-400">{{ result.label }}</p>
            </div>
          </div>
          <div class="bg-slate-50 dark:bg-slate-800 rounded-xl p-5">
            <h3 class="font-bold text-slate-900 dark:text-white mb-2">{{ t('caseStudies.fastcaisseDetail.results.positioningTitle') }}</h3>
            <blockquote class="text-slate-600 dark:text-slate-300 italic">
              "{{ t('caseStudies.fastcaisseDetail.results.positioningQuote') }}"
            </blockquote>
          </div>
        </div>
      </div>

      <div class="mt-16 card p-8 text-center">
        <h2 class="text-2xl font-extrabold text-slate-900 dark:text-white mb-3">
          {{ t('caseStudies.fastcaisseDetail.cta.title') }}
        </h2>
        <p class="text-slate-500 dark:text-slate-400 mb-6">
          {{ t('caseStudies.fastcaisseDetail.cta.desc') }}
        </p>
        <div class="flex flex-wrap gap-4 justify-center">
          <NuxtLink :to="localePath('/contact')" class="btn-primary">{{ t('caseStudies.fastcaisseDetail.cta.bookConsultation') }}</NuxtLink>
          <NuxtLink :to="localePath('/seo-services')" class="btn-secondary">{{ t('caseStudies.fastcaisseDetail.cta.seoServices') }}</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
