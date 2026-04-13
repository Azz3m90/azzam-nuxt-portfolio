<script setup lang="ts">
const { t, tm, rt } = useI18n()
const localePath = useLocalePath()

useSeo({
  title: t('meta.seoServices.title'),
  description: t('meta.seoServices.description'),
  image: 'https://azzamazizali.sy/images/Azzam.jpg',
  imageAlt: 'Technical SEO Services by Azzam Aziz Ali',
  breadcrumb: [{ name: 'SEO Services', url: 'https://azzamazizali.sy/seo-services' }],
})

const services = computed(() => [
  {
    icon: '🔬',
    title: t('seoServices.services.audit.title'),
    description: t('seoServices.services.audit.description'),
    features: (tm('seoServices.services.audit.features') as any[]).map(rt),
    price: t('seoServices.services.audit.price'),
  },
  {
    icon: '⚡',
    title: t('seoServices.services.speed.title'),
    description: t('seoServices.services.speed.description'),
    features: (tm('seoServices.services.speed.features') as any[]).map(rt),
    price: t('seoServices.services.speed.price'),
  },
  {
    icon: '📝',
    title: t('seoServices.services.onPage.title'),
    description: t('seoServices.services.onPage.description'),
    features: (tm('seoServices.services.onPage.features') as any[]).map(rt),
    price: t('seoServices.services.onPage.price'),
  },
  {
    icon: '🌍',
    title: t('seoServices.services.international.title'),
    description: t('seoServices.services.international.description'),
    features: (tm('seoServices.services.international.features') as any[]).map(rt),
    price: t('seoServices.services.international.price'),
  },
  {
    icon: '📊',
    title: t('seoServices.services.analytics.title'),
    description: t('seoServices.services.analytics.description'),
    features: (tm('seoServices.services.analytics.features') as any[]).map(rt),
    price: t('seoServices.services.analytics.price'),
  },
  {
    icon: '🏗️',
    title: t('seoServices.services.full.title'),
    description: t('seoServices.services.full.description'),
    features: (tm('seoServices.services.full.features') as any[]).map(rt),
    price: t('seoServices.services.full.price'),
  },
])

const faq = computed(() => [
  { q: t('seoServices.faq.q1'), a: t('seoServices.faq.a1') },
  { q: t('seoServices.faq.q2'), a: t('seoServices.faq.a2') },
  { q: t('seoServices.faq.q3'), a: t('seoServices.faq.a3') },
  { q: t('seoServices.faq.q4'), a: t('seoServices.faq.a4') },
])

const whyHirePoints = computed(() => [
  { icon: '🚀', title: t('seoServices.whyHire.faster.title'), desc: t('seoServices.whyHire.faster.desc') },
  { icon: '🎯', title: t('seoServices.whyHire.technical.title'), desc: t('seoServices.whyHire.technical.desc') },
  { icon: '📊', title: t('seoServices.whyHire.data.title'), desc: t('seoServices.whyHire.data.desc') },
  { icon: '💬', title: t('seoServices.whyHire.direct.title'), desc: t('seoServices.whyHire.direct.desc') },
])

const statsMap = computed(() => [
  { val: '75%', label: t('seoServices.provenTrack.organic') },
  { val: '34.6%', label: t('seoServices.provenTrack.userGrowth') },
  { val: '4', label: t('seoServices.provenTrack.countries') },
  { val: '10+', label: t('seoServices.provenTrack.experience') },
])
</script>

<template>
  <div class="py-12 sm:py-16 lg:py-20">
    <div class="container-custom">
      <div class="text-center mb-16 max-w-3xl mx-auto">
        <p class="section-label justify-center">{{ t('seoServices.subtitle') }}</p>
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">
          {{ t('seoServices.title') }}
        </h1>
        <p class="text-lg text-slate-500 dark:text-slate-400 mb-6">
          {{ t('seoServices.description') }}
        </p>
        <div class="flex flex-wrap gap-3 justify-center">
          <span class="badge-green badge">✓ {{ t('seoServices.certified') }}</span>
          <span class="badge">✓ {{ t('seoServices.badges.developer') }}</span>
          <span class="badge">✓ {{ t('seoServices.badges.proven') }}</span>
        </div>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
        <div v-for="service in services" :key="service.title" class="card card-hover p-7 flex flex-col">
          <div class="text-4xl mb-4">{{ service.icon }}</div>
          <h2 class="text-xl font-bold text-slate-900 dark:text-white mb-3">{{ service.title }}</h2>
          <p class="text-slate-600 dark:text-slate-300 text-sm mb-4 leading-relaxed flex-1">{{ service.description }}</p>
          <ul class="space-y-1.5 mb-5">
            <li v-for="feature in service.features" :key="feature" class="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
              <svg class="w-3.5 h-3.5 text-emerald-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
              {{ feature }}
            </li>
          </ul>
          <div class="flex items-center justify-between mt-auto pt-5 border-t border-slate-200 dark:border-slate-700">
            <span class="font-bold text-primary-600 dark:text-primary-400">{{ service.price }}</span>
            <NuxtLink :to="localePath('/contact')" class="text-sm font-semibold text-primary-600 dark:text-primary-400 hover:underline">
              {{ t('seoServices.getStarted') }}
            </NuxtLink>
          </div>
        </div>
      </div>

      <div class="grid lg:grid-cols-2 gap-8 mb-20 items-center">
        <div class="card p-8 bg-gradient-to-br from-primary-50 to-accent/5 dark:from-primary-900/20 dark:to-accent/10 border-primary-200 dark:border-primary-800">
          <h2 class="text-2xl font-extrabold text-slate-900 dark:text-white mb-4">{{ t('seoServices.provenTrack.title') }}</h2>
          <div class="grid grid-cols-2 gap-4">
            <div v-for="stat in statsMap" :key="stat.label" class="text-center">
              <p class="text-3xl font-extrabold gradient-text">{{ stat.val }}</p>
              <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">{{ stat.label }}</p>
            </div>
          </div>
        </div>
        <div>
          <h2 class="text-2xl font-extrabold text-slate-900 dark:text-white mb-4">{{ t('seoServices.whyHire.title') }}</h2>
          <div class="space-y-4">
            <div v-for="point in whyHirePoints" :key="point.title" class="flex gap-4">
              <span class="text-2xl shrink-0">{{ point.icon }}</span>
              <div>
                <h3 class="font-bold text-slate-900 dark:text-white text-sm">{{ point.title }}</h3>
                <p class="text-sm text-slate-500 dark:text-slate-400">{{ point.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mb-20">
        <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white text-center mb-6 sm:mb-10">{{ t('seoServices.faqTitle') }}</h2>
        <div class="max-w-3xl mx-auto space-y-4">
          <div v-for="item in faq" :key="item.q" class="card p-6">
            <h3 class="font-bold text-slate-900 dark:text-white mb-2">{{ item.q }}</h3>
            <p class="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{{ item.a }}</p>
          </div>
        </div>
      </div>

      <div class="card p-6 sm:p-8 lg:p-12 text-center bg-gradient-to-br from-primary-600 to-accent text-white rounded-3xl">
        <h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-4">{{ t('seoServices.ctaTitle') }}</h2>
        <p class="text-white/80 mb-8 max-w-xl mx-auto">
          {{ t('seoServices.ctaDesc') }}
        </p>
        <div class="flex flex-wrap gap-4 justify-center">
          <NuxtLink :to="localePath('/contact')" class="btn-secondary bg-white text-primary-700 border-white hover:bg-white/90">
            {{ t('seoServices.cta') }}
          </NuxtLink>
          <NuxtLink :to="localePath('/case-studies')" class="btn-secondary text-white border-white/40 hover:border-white hover:bg-white/10">
            {{ t('seoServices.caseStudies') }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
