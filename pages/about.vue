<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()

useSeo({
  title: t('meta.about.title'),
  description: t('meta.about.description'),
})

const experience = [
  {
    role: 'Senior Full Stack Developer & SEO Specialist',
    company: 'FastCaisse',
    url: 'https://fastcaisse.be',
    period: '2022 – Present',
    location: 'Belgium (Remote)',
    description: 'Built and scaled a multi-restaurant SaaS ordering platform serving customers in Belgium, Singapore, China, and the US. Architected the ordering system, kiosk mode, admin dashboard, payment integration, and SEO-optimized marketing pages.',
    achievements: [
      '34.6% weekly active user growth',
      '75% increase in organic search traffic',
      '62.6% event count increase',
      'Multi-language support (EN, FR, AR, NL)',
      'Cross-country organic visibility (4+ countries)',
    ],
    stack: ['Laravel', 'Vue 3', 'Nuxt', 'MySQL', 'Redis', 'Payment APIs'],
  },
  {
    role: 'Full Stack Developer',
    company: 'Hexabitz',
    url: 'https://hexabitz.com',
    period: '2021 – 2022',
    location: 'Syria (Remote)',
    description: 'Developed a browser-based IoT hardware programming IDE using React and Monaco Editor. Built the company marketing website and integrated hardware documentation systems.',
    achievements: [
      'Built custom browser-based IDE for IoT hardware',
      'React + Monaco Editor integration',
      'SEO-optimized product documentation pages',
    ],
    stack: ['React', 'TypeScript', 'Django', 'Python', 'Monaco Editor'],
  },
  {
    role: 'SEO Specialist',
    company: 'Caresine',
    url: 'https://caresine.com',
    period: '2020 – 2022',
    location: 'Remote',
    description: 'Led technical SEO and content strategy for an e-commerce platform, driving organic traffic through structured data, performance optimization, and keyword-targeted content.',
    achievements: [
      'Implemented schema markup across 500+ product pages',
      'Improved Core Web Vitals scores',
      'Developed content strategy for Arabic and English markets',
    ],
    stack: ['PrestaShop', 'Screaming Frog', 'Google Analytics', 'Search Console'],
  },
]

const certificates = [
  { title: 'Google SEO Fundamentals', issuer: 'Google/Coursera', icon: '🔍', url: '/cv/WebDevelopment/SEO/Google_SEO_Fundamentals.pdf' },
  { title: 'Optimizing for Google Search', issuer: 'Google/Coursera', icon: '📊', url: '/cv/WebDevelopment/SEO/Optimizing_a_Website_for_Google_Search.pdf' },
  { title: 'Google SEO Capstone Project', issuer: 'Google/Coursera', icon: '🏆', url: '/cv/WebDevelopment/SEO/Google_SEO_Capstone_Project.pdf' },
  { title: 'Advanced Content & Social Tactics', issuer: 'Coursera', icon: '📣', url: '/cv/WebDevelopment/SEO/Advanced_Content_and_Social_Tactics_to_Optimize.pdf' },
  { title: 'Mastering Laravel & PHP', issuer: 'Udemy', icon: '⚡', url: '/cv/WebDevelopment/Mastering_PHP_and_Laravel.pdf' },
  { title: 'Advanced React', issuer: 'Meta/Coursera', icon: '⚛️', url: '/cv/WebDevelopment/Advanced_React.pdf' },
  { title: 'Principles of UX/UI Design', issuer: 'Meta/Coursera', icon: '🎨', url: '/cv/WebDevelopment/Principles_of_UX_UI_Design.pdf' },
  { title: 'Gemini Certified Educator', issuer: 'Google', icon: '🤖', url: '/cv/Gemini/Gemini_Certified_Educator.jpg' },
]
</script>

<template>
  <div class="py-20">
    <div class="container-custom">
      <div class="max-w-4xl mx-auto mb-20">
        <p class="section-label">{{ t('about.subtitle') }}</p>
        <h1 class="text-5xl font-extrabold text-slate-900 dark:text-white mb-6 leading-tight">
          {{ t('about.title') }}
        </h1>
        <div class="grid md:grid-cols-3 gap-8 items-start">
          <div class="md:col-span-2 space-y-4">
            <p class="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              {{ t('about.bio1') }}
            </p>
            <p class="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              {{ t('about.bio2') }}
            </p>
            <div class="flex flex-wrap gap-3 pt-4">
              <a href="/cv/Azzams_Resume.pdf" download class="btn-primary">
                {{ t('about.downloadResume') }}
              </a>
              <NuxtLink :to="localePath('/contact')" class="btn-secondary">
                {{ t('nav.bookConsultation') }}
              </NuxtLink>
            </div>
          </div>
          <div class="rounded-2xl overflow-hidden shadow-2xl">
            <NuxtImg
              src="/images/Azzam.jpg"
              alt="Azzam Aziz Ali"
              class="w-full object-cover"
              width="400"
              height="500"
            />
          </div>
        </div>
      </div>

      <div class="mb-20">
        <h2 class="text-3xl font-extrabold text-slate-900 dark:text-white mb-10">
          {{ t('resume.experience') }}
        </h2>
        <div class="space-y-0">
          <div v-for="job in experience" :key="job.company" class="timeline-item">
            <div class="timeline-dot"></div>
            <div class="card p-6 ms-4">
              <div class="flex flex-wrap items-start justify-between gap-3 mb-3">
                <div>
                  <h3 class="text-xl font-bold text-slate-900 dark:text-white">{{ job.role }}</h3>
                  <a :href="job.url" target="_blank" rel="noopener noreferrer" class="text-primary-600 dark:text-primary-400 font-semibold hover:underline">
                    {{ job.company }}
                  </a>
                  <span class="text-slate-400 mx-2">·</span>
                  <span class="text-sm text-slate-500">{{ job.location }}</span>
                </div>
                <span class="badge text-xs">{{ job.period }}</span>
              </div>
              <p class="text-slate-600 dark:text-slate-300 mb-4">{{ job.description }}</p>
              <ul class="space-y-1.5 mb-4">
                <li v-for="achievement in job.achievements" :key="achievement" class="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                  <svg class="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  {{ achievement }}
                </li>
              </ul>
              <div class="flex flex-wrap gap-1.5">
                <span v-for="tech in job.stack" :key="tech" class="text-xs px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-medium">
                  {{ tech }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mb-20">
        <h2 class="text-3xl font-extrabold text-slate-900 dark:text-white mb-10">
          {{ t('resume.certifications') }}
        </h2>
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <a
            v-for="cert in certificates"
            :key="cert.title"
            :href="cert.url"
            download
            class="card card-hover p-5 flex flex-col gap-3 group"
          >
            <span class="text-3xl">{{ cert.icon }}</span>
            <div>
              <h3 class="font-semibold text-slate-900 dark:text-white text-sm group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                {{ cert.title }}
              </h3>
              <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{{ cert.issuer }}</p>
            </div>
            <svg class="w-4 h-4 text-slate-400 group-hover:text-primary-500 transition-colors mt-auto self-end" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
            </svg>
          </a>
        </div>
      </div>

      <div class="card p-8 text-center bg-gradient-to-br from-primary-50 to-accent/5 dark:from-primary-900/20 dark:to-accent/10 border-primary-200 dark:border-primary-800">
        <h2 class="text-3xl font-extrabold text-slate-900 dark:text-white mb-4">
          Let's Build Something Together
        </h2>
        <p class="text-slate-600 dark:text-slate-300 mb-8 max-w-xl mx-auto">
          Looking for a senior developer who delivers measurable results? Let's talk.
        </p>
        <div class="flex flex-wrap gap-4 justify-center">
          <NuxtLink :to="localePath('/contact')" class="btn-primary">{{ t('nav.bookConsultation') }}</NuxtLink>
          <NuxtLink :to="localePath('/resume')" class="btn-secondary">View Full Resume</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
