<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

useSeo({
  title: 'FastCaisse SaaS Case Study | 34% User Growth & 75% Organic Traffic – Azzam Aziz Ali',
  description: 'How I built FastCaisse — a multi-restaurant SaaS ordering platform — achieving 34.6% weekly user growth and 75% organic traffic increase through Laravel, Vue 3, and technical SEO.',
  type: 'article',
})
</script>

<template>
  <div class="py-20">
    <div class="container-custom max-w-4xl">
      <div class="mb-4">
        <NuxtLink :to="localePath('/case-studies')" class="btn-ghost text-sm ps-0">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
          Back to Case Studies
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
          FastCaisse: Building a Multi-Restaurant SaaS Platform with 34% Weekly User Growth
        </h1>
        <p class="text-xl text-slate-500 dark:text-slate-400 leading-relaxed">
          A complete story of engineering a scalable ordering system from scratch — and driving global organic visibility with technical SEO.
        </p>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-14">
        <div class="metric-card card-hover">
          <div class="metric-value">34.6%</div>
          <div class="metric-label">Weekly User Growth</div>
        </div>
        <div class="metric-card card-hover">
          <div class="metric-value">75%</div>
          <div class="metric-label">Organic Traffic Increase</div>
        </div>
        <div class="metric-card card-hover">
          <div class="metric-value">62.6%</div>
          <div class="metric-label">Event Count Growth</div>
        </div>
        <div class="metric-card card-hover">
          <div class="metric-value">54.2%</div>
          <div class="metric-label">Page Views Increase</div>
        </div>
      </div>

      <div class="prose prose-lg dark:prose-invert max-w-none space-y-12">
        <div class="card p-8 border-l-4 border-red-500">
          <h2 class="text-2xl font-extrabold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
            <span class="text-red-500">⚠</span> {{ t('caseStudies.problem') }}
          </h2>
          <p class="text-slate-600 dark:text-slate-300 leading-relaxed">
            Restaurant owners in Belgium were struggling with fragmented ordering solutions — each location managing separate menus, payment providers, and delivery zones. There was no unified, multi-restaurant SaaS platform serving the French, Dutch, and Arabic-speaking market with kiosk support.
          </p>
          <ul class="mt-4 space-y-2 text-slate-600 dark:text-slate-300">
            <li class="flex items-start gap-2">
              <span class="text-red-400 mt-1">✗</span>
              No multi-restaurant management from a single admin panel
            </li>
            <li class="flex items-start gap-2">
              <span class="text-red-400 mt-1">✗</span>
              No SEO-optimized marketing pages to drive organic traffic
            </li>
            <li class="flex items-start gap-2">
              <span class="text-red-400 mt-1">✗</span>
              No kiosk/self-service ordering mode
            </li>
            <li class="flex items-start gap-2">
              <span class="text-red-400 mt-1">✗</span>
              Fragmented payment and delivery integrations
            </li>
          </ul>
        </div>

        <div class="card p-8 border-l-4 border-primary-500">
          <h2 class="text-2xl font-extrabold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
            <span class="text-primary-500">🧠</span> {{ t('caseStudies.strategy') }}
          </h2>
          <div class="space-y-4 text-slate-600 dark:text-slate-300">
            <p>The architecture was designed around three core pillars: scalability, multi-tenancy, and SEO.</p>
            <div class="grid sm:grid-cols-2 gap-4">
              <div class="bg-slate-50 dark:bg-slate-800 rounded-xl p-4">
                <h3 class="font-bold text-slate-900 dark:text-white mb-2">🏗️ Architecture</h3>
                <ul class="text-sm space-y-1">
                  <li>Laravel multi-tenant backend with restaurant isolation</li>
                  <li>Vue 3 SPA for ordering UI with Composition API</li>
                  <li>Nuxt 3 SSR for SEO-optimized marketing pages</li>
                  <li>Redis for session/cart management</li>
                </ul>
              </div>
              <div class="bg-slate-50 dark:bg-slate-800 rounded-xl p-4">
                <h3 class="font-bold text-slate-900 dark:text-white mb-2">🔍 SEO Strategy</h3>
                <ul class="text-sm space-y-1">
                  <li>Restaurant schema markup (LocalBusiness, Menu)</li>
                  <li>Hreflang for FR/NL/EN/AR language targeting</li>
                  <li>Core Web Vitals optimization (LCP &lt; 2.5s)</li>
                  <li>Keyword-targeted landing pages per city</li>
                </ul>
              </div>
              <div class="bg-slate-50 dark:bg-slate-800 rounded-xl p-4">
                <h3 class="font-bold text-slate-900 dark:text-white mb-2">💳 Payments & Integrations</h3>
                <ul class="text-sm space-y-1">
                  <li>Stripe + Mollie payment integration</li>
                  <li>Webhook-based order status updates</li>
                  <li>Print receipt API for kiosk mode</li>
                </ul>
              </div>
              <div class="bg-slate-50 dark:bg-slate-800 rounded-xl p-4">
                <h3 class="font-bold text-slate-900 dark:text-white mb-2">🌍 Multi-language</h3>
                <ul class="text-sm space-y-1">
                  <li>Full RTL support for Arabic</li>
                  <li>Laravel localization + Vue i18n</li>
                  <li>SEO-friendly URL structure per locale</li>
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
            <div v-for="(result, label) in {
              'Active Users (7-day)': '70 active users',
              'Events Tracked': '356 events',
              'Page Views': '111 views',
              'User Growth': '+34.6% week-over-week',
              'Organic Sessions': '+75% increase',
              'Countries Reached': 'BE, SG, CN, US',
            }" :key="label" class="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-4">
              <p class="font-bold text-emerald-700 dark:text-emerald-300">{{ result }}</p>
              <p class="text-sm text-slate-500 dark:text-slate-400">{{ label }}</p>
            </div>
          </div>
          <div class="bg-slate-50 dark:bg-slate-800 rounded-xl p-5">
            <h3 class="font-bold text-slate-900 dark:text-white mb-2">Positioning Statement</h3>
            <blockquote class="text-slate-600 dark:text-slate-300 italic">
              "Built and scaled FastCaisse, a multi-restaurant SaaS platform generating 34% weekly user growth and 75% organic traffic increase through technical SEO and performance optimization — achieving cross-country organic visibility in under 12 months."
            </blockquote>
          </div>
        </div>
      </div>

      <div class="mt-16 card p-8 text-center">
        <h2 class="text-2xl font-extrabold text-slate-900 dark:text-white mb-3">
          Need Similar Results for Your Project?
        </h2>
        <p class="text-slate-500 dark:text-slate-400 mb-6">
          Let's talk about your SaaS, your organic growth goals, or your technical challenges.
        </p>
        <div class="flex flex-wrap gap-4 justify-center">
          <NuxtLink :to="localePath('/contact')" class="btn-primary">Book a Consultation</NuxtLink>
          <NuxtLink :to="localePath('/seo-services')" class="btn-secondary">SEO Services</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
