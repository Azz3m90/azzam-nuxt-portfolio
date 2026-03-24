<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

const config = useRuntimeConfig()
const siteUrl = config.public.siteUrl as string

useSeo({
  title: t('meta.seoServices.title'),
  description: t('meta.seoServices.description'),
  image: `${siteUrl}/images/og-seo-services.jpg`,
  imageAlt: 'Technical SEO Services by Azzam Aziz Ali',
  breadcrumb: [{ name: 'SEO Services', url: `${siteUrl}/seo-services` }],
})

const services = [
  {
    icon: '🔬',
    title: 'Technical SEO Audit',
    description: "Full crawl analysis, Core Web Vitals optimization, indexation issues, schema markup review, and internal linking strategy. I find what's hurting your rankings and fix it.",
    features: ['Screaming Frog crawl analysis', 'Core Web Vitals (LCP, CLS, FID)', 'Schema markup audit', 'Redirect chain resolution', 'Mobile usability'],
    price: 'From $299',
  },
  {
    icon: '⚡',
    title: 'Page Speed Optimization',
    description: 'I write the code myself. No handoff to another team. Reduce LCP, eliminate CLS, optimize TTFB, lazy-load assets, and implement modern image formats.',
    features: ['LCP under 2.5s guaranteed', 'Image optimization (WebP/AVIF)', 'Critical CSS extraction', 'JavaScript code splitting', 'Server-side caching setup'],
    price: 'From $499',
  },
  {
    icon: '📝',
    title: 'On-Page SEO & Content Strategy',
    description: 'Keyword research, search intent mapping, optimized content briefs, H1/H2 hierarchy, and semantic HTML implementation.',
    features: ['Keyword research & clustering', 'Competitor gap analysis', 'Content briefs', 'Meta tag optimization', 'Internal linking strategy'],
    price: 'From $199',
  },
  {
    icon: '🌍',
    title: 'International & Multilingual SEO',
    description: 'Hreflang implementation, GBP optimization, multi-language URL structure, and country-specific targeting. Proven results for Arabic + European markets.',
    features: ['Hreflang setup & validation', 'RTL (Arabic) SEO', 'Country-level targeting', 'GBP optimization', 'Multilingual sitemap'],
    price: 'From $399',
  },
  {
    icon: '📊',
    title: 'SEO Analytics & Reporting',
    description: 'GA4 setup, Search Console configuration, custom dashboards, and monthly reporting with actionable insights — not just vanity metrics.',
    features: ['GA4 configuration', 'Search Console setup', 'Looker Studio dashboards', 'Monthly ranking reports', 'Conversion tracking'],
    price: 'From $149/mo',
  },
  {
    icon: '🏗️',
    title: 'Full SEO Implementation',
    description: 'The full package: audit + implementation + monitoring. Best for businesses that want results without managing multiple agencies.',
    features: ['Everything in all services', 'Weekly check-ins', 'Priority support', 'A/B testing', 'Quarterly strategy review'],
    price: 'Custom Quote',
  },
]

const faq = [
  {
    q: 'What makes you different from an SEO agency?',
    a: 'I\'m a developer first. I don\'t hand off recommendations to a dev team — I implement them myself. That means faster execution, no miscommunication, and direct accountability for results.',
  },
  {
    q: 'Can you work on non-English sites?',
    a: 'Yes. I have hands-on experience with Arabic (RTL), French, Dutch, and German websites. I\'ve implemented hreflang setups for multi-country SaaS platforms.',
  },
  {
    q: 'How long until I see results?',
    a: 'Technical fixes often show results in 4–8 weeks. Content and authority-building strategies typically take 3–6 months. I provide transparent reporting throughout.',
  },
  {
    q: 'Do you work with WordPress sites?',
    a: 'Yes. I\'m certified in WordPress SEO and have worked with WooCommerce, PrestaShop, and custom Laravel/Nuxt applications.',
  },
]
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
          <span class="badge-green badge">✓ Google-Certified SEO Specialist</span>
          <span class="badge">✓ Developer Background</span>
          <span class="badge">✓ Proven SaaS Results</span>
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
              Get Started →
            </NuxtLink>
          </div>
        </div>
      </div>

      <div class="grid lg:grid-cols-2 gap-8 mb-20 items-center">
        <div class="card p-8 bg-gradient-to-br from-primary-50 to-accent/5 dark:from-primary-900/20 dark:to-accent/10 border-primary-200 dark:border-primary-800">
          <h2 class="text-2xl font-extrabold text-slate-900 dark:text-white mb-4">Proven Track Record</h2>
          <div class="grid grid-cols-2 gap-4">
            <div v-for="(val, label) in {'75%': 'Organic traffic growth', '34.6%': 'Weekly user growth', '4': 'Countries ranking', '10+': 'Years experience'}" :key="label" class="text-center">
              <p class="text-3xl font-extrabold gradient-text">{{ label }}</p>
              <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">{{ val }}</p>
            </div>
          </div>
        </div>
        <div>
          <h2 class="text-2xl font-extrabold text-slate-900 dark:text-white mb-4">Why Hire a Developer-SEO?</h2>
          <div class="space-y-4">
            <div v-for="point in [
              { icon: '🚀', title: 'Faster Implementation', desc: 'I write code. No waiting on developers to implement recommendations.' },
              { icon: '🎯', title: 'Technical Depth', desc: 'I can debug crawl issues, fix server configs, and optimize database queries.' },
              { icon: '📊', title: 'Data-Driven', desc: 'Every decision backed by GA4, Search Console, and crawl data.' },
              { icon: '💬', title: 'Direct Communication', desc: 'No account managers. You talk directly to the person doing the work.' },
            ]" :key="point.title" class="flex gap-4">
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
        <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white text-center mb-6 sm:mb-10">Frequently Asked Questions</h2>
        <div class="max-w-3xl mx-auto space-y-4">
          <div v-for="item in faq" :key="item.q" class="card p-6">
            <h3 class="font-bold text-slate-900 dark:text-white mb-2">{{ item.q }}</h3>
            <p class="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{{ item.a }}</p>
          </div>
        </div>
      </div>

      <div class="card p-6 sm:p-8 lg:p-12 text-center bg-gradient-to-br from-primary-600 to-accent text-white rounded-3xl">
        <h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-4">Ready to Grow Your Organic Traffic?</h2>
        <p class="text-white/80 mb-8 max-w-xl mx-auto">
          Get a free 30-minute SEO audit call. I'll analyze your site and give you actionable insights — no strings attached.
        </p>
        <div class="flex flex-wrap gap-4 justify-center">
          <NuxtLink :to="localePath('/contact')" class="btn-secondary bg-white text-primary-700 border-white hover:bg-white/90">
            {{ t('seoServices.cta') }}
          </NuxtLink>
          <NuxtLink :to="localePath('/case-studies')" class="btn-secondary text-white border-white/40 hover:border-white hover:bg-white/10">
            See Case Studies
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
