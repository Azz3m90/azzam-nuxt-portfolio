<script setup lang="ts">
const { t } = useI18n()

useSeo({
  title: t('meta.resume.title'),
  description: t('meta.resume.description'),
})

const techStack = {
  'Backend': ['Laravel', 'PHP', 'Django', 'Python', 'Go', 'Ruby on Rails', 'REST API', 'Node.js'],
  'Frontend': ['React', 'Vue 3', 'Nuxt 3', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Bootstrap', 'jQuery'],
  'Databases': ['MySQL', 'PostgreSQL', 'Redis', 'Firebase', 'SQLite'],
  'SEO & Analytics': ['Google Analytics 4', 'Search Console', 'Screaming Frog', 'Schema Markup', 'Hreflang', 'Core Web Vitals', 'Moz'],
  'DevOps & Tools': ['Git', 'GitHub', 'Docker', 'Linux', 'Nginx', 'VS Code', 'Composer', 'NPM'],
  'CMS & E-commerce': ['WordPress', 'PrestaShop', 'WooCommerce'],
}

const experience = [
  {
    role: 'Senior Full Stack Developer & SEO Specialist',
    company: 'FastCaisse',
    period: '2022 – Present',
    location: 'Belgium (Remote)',
    bullets: [
      'Architected multi-restaurant SaaS ordering platform (Laravel + Vue 3) serving 70+ active users across 4 countries',
      'Achieved 34.6% weekly user growth and 75% organic search traffic increase through technical SEO',
      'Built kiosk mode, admin dashboard, multi-language support (EN/FR/NL/AR), and payment integrations (Stripe, Mollie)',
      'Implemented schema markup, hreflang, and Core Web Vitals optimization achieving LCP < 2.5s',
    ],
  },
  {
    role: 'Full Stack Developer',
    company: 'Hexabitz',
    period: '2021 – 2022',
    location: 'Syria (Remote)',
    bullets: [
      'Built a browser-based IoT hardware programming IDE using React + Monaco Editor',
      'Developed company marketing website with SEO-optimized documentation pages',
      'Integrated hardware APIs and real-time serial communication via WebSocket',
    ],
  },
  {
    role: 'SEO Specialist',
    company: 'Caresine',
    period: '2020 – 2022',
    location: 'Remote',
    bullets: [
      'Led technical SEO and content strategy for multi-language e-commerce platform',
      'Implemented schema markup across 500+ product pages improving rich snippet visibility',
      'Developed Arabic SEO content strategy targeting MENA market',
    ],
  },
]

const education = {
  degree: 'Bachelor of Engineering — Computer Engineering',
  university: 'Tishreen University',
  location: 'Lattakia, Syria',
  period: '2015 – 2020',
}
</script>

<template>
  <div class="py-20">
    <div class="container-custom max-w-4xl">
      <div class="flex flex-wrap items-start justify-between gap-6 mb-12">
        <div>
          <p class="section-label">{{ t('resume.subtitle') }}</p>
          <h1 class="text-5xl font-extrabold text-slate-900 dark:text-white">{{ t('resume.title') }}</h1>
          <p class="text-xl text-primary-600 dark:text-primary-400 font-semibold mt-2">{{ t('resume.jobTitle') }}</p>
          <div class="flex flex-wrap gap-3 mt-4 text-sm text-slate-500 dark:text-slate-400">
            <span class="flex items-center gap-1">📍 Tartus, Syria (Remote)</span>
            <span class="flex items-center gap-1">✉️ azzam@azzamazizali.com</span>
            <span class="flex items-center gap-1">💬 +963 991 576 641</span>
          </div>
        </div>
        <a
          href="/cv/Azzams_Resume.pdf"
          download
          class="btn-primary shrink-0"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
          </svg>
          {{ t('resume.download') }}
        </a>
      </div>

      <div class="flex flex-wrap gap-4 mb-12 p-6 card">
        <div class="text-center px-4">
          <p class="text-3xl font-extrabold gradient-text">10+</p>
          <p class="text-xs text-slate-500 dark:text-slate-400">Years Experience</p>
        </div>
        <div class="w-px bg-slate-200 dark:bg-slate-700"></div>
        <div class="text-center px-4">
          <p class="text-3xl font-extrabold gradient-text">22+</p>
          <p class="text-xs text-slate-500 dark:text-slate-400">Projects Delivered</p>
        </div>
        <div class="w-px bg-slate-200 dark:bg-slate-700"></div>
        <div class="text-center px-4">
          <p class="text-3xl font-extrabold gradient-text">40+</p>
          <p class="text-xs text-slate-500 dark:text-slate-400">Happy Clients</p>
        </div>
        <div class="w-px bg-slate-200 dark:bg-slate-700"></div>
        <div class="text-center px-4">
          <p class="text-3xl font-extrabold gradient-text">75%</p>
          <p class="text-xs text-slate-500 dark:text-slate-400">Organic Traffic Growth</p>
        </div>
      </div>

      <section class="mb-12">
        <h2 class="text-2xl font-extrabold text-slate-900 dark:text-white mb-6 pb-2 border-b border-slate-200 dark:border-slate-700">
          {{ t('resume.experience') }}
        </h2>
        <div class="space-y-8">
          <div v-for="job in experience" :key="job.company" class="card p-6">
            <div class="flex flex-wrap items-start justify-between gap-3 mb-3">
              <div>
                <h3 class="text-lg font-bold text-slate-900 dark:text-white">{{ job.role }}</h3>
                <p class="text-primary-600 dark:text-primary-400 font-semibold">{{ job.company }} · {{ job.location }}</p>
              </div>
              <span class="badge text-xs">{{ job.period }}</span>
            </div>
            <ul class="space-y-2">
              <li v-for="bullet in job.bullets" :key="bullet" class="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                <span class="text-primary-500 mt-1 shrink-0">▸</span>
                {{ bullet }}
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section class="mb-12">
        <h2 class="text-2xl font-extrabold text-slate-900 dark:text-white mb-6 pb-2 border-b border-slate-200 dark:border-slate-700">
          {{ t('resume.skills') }}
        </h2>
        <div class="grid sm:grid-cols-2 gap-4">
          <div v-for="(techs, category) in techStack" :key="category" class="card p-5">
            <h3 class="text-xs font-bold uppercase tracking-widest text-primary-600 dark:text-primary-400 mb-3">{{ category }}</h3>
            <div class="flex flex-wrap gap-1.5">
              <span v-for="tech in techs" :key="tech" class="text-xs px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-medium">
                {{ tech }}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section class="mb-12">
        <h2 class="text-2xl font-extrabold text-slate-900 dark:text-white mb-6 pb-2 border-b border-slate-200 dark:border-slate-700">
          {{ t('resume.education') }}
        </h2>
        <div class="card p-6">
          <div class="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 class="text-lg font-bold text-slate-900 dark:text-white">{{ education.degree }}</h3>
              <p class="text-primary-600 dark:text-primary-400 font-semibold">{{ education.university }} · {{ education.location }}</p>
            </div>
            <span class="badge text-xs">{{ education.period }}</span>
          </div>
        </div>
      </section>

      <section>
        <h2 class="text-2xl font-extrabold text-slate-900 dark:text-white mb-6 pb-2 border-b border-slate-200 dark:border-slate-700">
          {{ t('resume.certifications') }}
        </h2>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <div v-for="cert in [
            'Google SEO Fundamentals',
            'Google SEO Capstone Project',
            'Optimizing for Google Search',
            'Advanced Content & Social Tactics',
            'Advanced React (Meta/Coursera)',
            'Mastering Laravel & PHP',
            'Principles of UX/UI Design',
            'Gemini Certified Educator',
            'Increase SEO Traffic with WordPress',
          ]" :key="cert" class="flex items-center gap-2.5 px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-sm text-slate-700 dark:text-slate-300 font-medium">
            <svg class="w-4 h-4 text-emerald-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
            </svg>
            {{ cert }}
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
