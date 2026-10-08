<script setup lang="ts">
const { t, tm, rt } = useI18n()

useSeo({
  title: t('meta.resume.title'),
  description: t('meta.resume.description'),
  image: 'https://azzamazizali.sy/images/Azzam.jpg',
  imageAlt: t('meta.resume.title'),
  breadcrumb: [{ name: t('nav.resume'), url: 'https://azzamazizali.sy/resume' }],
})

/** Keys map to resume.skillCategories.* in the locale files. */
const techStack = {
  backend: ['Laravel', 'PHP', 'Django', 'Python', 'Go', 'Ruby on Rails', 'REST API', 'Node.js'],
  frontend: ['React', 'Vue 3', 'Nuxt', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Bootstrap', 'jQuery', 'SASS', 'Axios', 'AngularJS', 'HTML5', 'CSS3', 'Next.js'],
  databases: ['MySQL', 'PostgreSQL', 'Redis', 'Firebase', 'SQLite'],
  seo: ['Google Analytics 4', 'Search Console', 'Screaming Frog', 'Schema Markup', 'Hreflang', 'Core Web Vitals', 'Moz'],
  devops: ['Git', 'GitHub', 'Docker', 'Linux', 'Nginx', 'VS Code', 'Composer', 'NPM', 'Webpack'],
  cms: ['WordPress', 'PrestaShop', 'WooCommerce'],
  collaboration: ['ClickUp', 'Slack', 'FileZilla', 'DBeaver', 'Android Studio'],
}

const stats = computed(() => [
  { value: '10+', label: t('resume.stats.experience') },
  { value: '22+', label: t('resume.stats.projects') },
  { value: '40+', label: t('resume.stats.clients') },
  { value: '75%', label: t('resume.stats.organic') },
])

const experienceCertificates = computed(() => [
  { key: 'fastcaisse', file: '/cv/FAST_CAISSE_Experience_Certificate_Azzam_Aziz_Ali-signed.pdf' },
  { key: 'hexabitz', file: '/cv/Azzams_Experience_CERTIFICATE_in_Hexabitz_Full-Stack_Web_Developer.pdf' },
  { key: 'caresine', file: '/cv/Caresine_SEO_Specialist_Caresine_company_Azzam.pdf' },
].map(cert => ({
  title: t(`resume.expCerts.${cert.key}.title`),
  issuer: t(`resume.expCerts.${cert.key}.issuer`),
  file: cert.file,
})))

const experience = computed(() => [
  {
    role: t('resume.jobs.astramind.role'),
    company: 'AstraMind',
    period: `11/2025 – ${t('common.present')}`,
    location: t('resume.jobs.astramind.location'),
    bullets: (tm('resume.jobs.astramind.bullets') as any[]).map(rt),
  },
  {
    role: t('resume.jobs.fastcaisse.role'),
    company: 'FastCaisse',
    period: `01/2023 – ${t('common.present')}`,
    location: t('resume.jobs.fastcaisse.location'),
    bullets: (tm('resume.jobs.fastcaisse.bullets') as any[]).map(rt),
  },
  {
    role: t('resume.jobs.rsk.role'),
    company: 'rsk-platform.com',
    period: '06/2026 – 09/2026',
    location: t('resume.jobs.rsk.location'),
    bullets: (tm('resume.jobs.rsk.bullets') as any[]).map(rt),
  },
  {
    role: t('resume.jobs.emtethal.role'),
    company: 'Emtethal',
    period: '06/2025 – 10/2025',
    location: t('resume.jobs.emtethal.location'),
    bullets: (tm('resume.jobs.emtethal.bullets') as any[]).map(rt),
  },
  {
    role: t('resume.jobs.hexabitz.role'),
    company: 'Hexabitz',
    period: '06/2022 – 05/2023',
    location: t('resume.jobs.hexabitz.location'),
    bullets: (tm('resume.jobs.hexabitz.bullets') as any[]).map(rt),
  },
  {
    role: t('resume.jobs.seetah.role'),
    company: 'Seetah Award',
    period: '09/2021 – 01/2022',
    location: t('resume.jobs.seetah.location'),
    bullets: (tm('resume.jobs.seetah.bullets') as any[]).map(rt),
  },
  {
    role: t('resume.jobs.bonzuttner.role'),
    company: 'Bonzuttner',
    period: '06/2021 – 05/2022',
    location: t('resume.jobs.bonzuttner.location'),
    bullets: (tm('resume.jobs.bonzuttner.bullets') as any[]).map(rt),
  },
])

const education = computed(() => [
  { key: 'svu', period: '2019 – 2021', gpa: '3.25 / 4.0' },
  { key: 'tishreen', period: '2008 – 2014', gpa: '2.75 / 4.0' },
].map(edu => ({
  degree: t(`resume.educationItems.${edu.key}.degree`),
  university: t(`resume.educationItems.${edu.key}.university`),
  location: t(`resume.educationItems.${edu.key}.location`),
  period: edu.period,
  gpa: edu.gpa,
})))
</script>

<template>
  <div class="py-12 sm:py-16 lg:py-20">
    <div class="container-custom max-w-4xl">
      <div class="flex flex-wrap items-start justify-between gap-6 mb-12">
        <div>
          <p class="section-label">{{ t('resume.subtitle') }}</p>
          <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white">{{ t('resume.title') }}</h1>
          <p class="text-xl text-primary-600 dark:text-primary-400 font-semibold mt-2">{{ t('resume.jobTitle') }}</p>
          <div class="flex flex-wrap gap-3 mt-4 text-sm text-slate-500 dark:text-slate-400">
            <span class="flex items-center gap-1">📍 {{ t('contact.info.location') }}</span>
            <span class="flex items-center gap-1">✉️ projects@azzamazizali.sy</span>
            <span class="flex items-center gap-1">💬 <span dir="ltr">+963 983 847 632</span></span>
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

      <div class="grid grid-cols-2 sm:flex sm:flex-wrap gap-4 mb-8 sm:mb-12 p-4 sm:p-6 card">
        <template v-for="(stat, i) in stats" :key="stat.label">
          <div v-if="i > 0" class="hidden sm:block w-px bg-slate-200 dark:bg-slate-700"></div>
          <div class="text-center px-4">
            <p class="text-3xl font-extrabold gradient-text">{{ stat.value }}</p>
            <p class="text-xs text-slate-500 dark:text-slate-400">{{ stat.label }}</p>
          </div>
        </template>
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
            <h3 class="text-xs font-bold uppercase tracking-widest text-primary-600 dark:text-primary-400 mb-3">{{ t(`resume.skillCategories.${category}`) }}</h3>
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
        <div class="space-y-4">
          <div v-for="edu in education" :key="edu.degree" class="card p-6">
            <div class="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 class="text-lg font-bold text-slate-900 dark:text-white">{{ edu.degree }}</h3>
                <p class="text-primary-600 dark:text-primary-400 font-semibold">{{ edu.university }} · {{ edu.location }}</p>
                <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">{{ t('resume.gpa') }}: <span dir="ltr">{{ edu.gpa }}</span></p>
              </div>
              <span class="badge text-xs">{{ edu.period }}</span>
            </div>
          </div>
        </div>
      </section>

      <section class="mb-12">
        <h2 class="text-2xl font-extrabold text-slate-900 dark:text-white mb-6 pb-2 border-b border-slate-200 dark:border-slate-700">
          {{ t('resume.experienceCertificates') }}
        </h2>
        <div class="grid sm:grid-cols-3 gap-4">
          <a
            v-for="cert in experienceCertificates"
            :key="cert.title"
            :href="cert.file"
            download
            class="card card-hover p-5 flex items-start gap-4 group"
          >
            <span class="text-3xl shrink-0">🏅</span>
            <div class="flex-1 min-w-0">
              <h3 class="font-semibold text-slate-900 dark:text-white text-sm group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{{ cert.title }}</h3>
              <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{{ cert.issuer }}</p>
            </div>
            <svg class="w-4 h-4 text-slate-400 group-hover:text-primary-500 transition-colors shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
            </svg>
          </a>
        </div>
      </section>

      <section class="mb-12">
        <h2 class="text-2xl font-extrabold text-slate-900 dark:text-white mb-6 pb-2 border-b border-slate-200 dark:border-slate-700">
          {{ t('resume.interview') }}
        </h2>
        <div class="card p-6">
          <div class="flex flex-wrap items-start gap-4 mb-4">
            <div class="flex-1 min-w-0">
              <h3 class="text-lg font-bold text-slate-900 dark:text-white">{{ t('resume.interviewTitle') }}</h3>
              <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">{{ t('resume.interviewDesc') }}</p>
            </div>
          </div>
          <div class="relative w-full rounded-xl overflow-hidden" style="padding-bottom: 56.25%;">
            <iframe
              class="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/UhHuoMAKMLc"
              :title="`${t('resume.interviewTitle')} — ${t('hero.name')}`"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>

      <section>
        <h2 class="text-2xl font-extrabold text-slate-900 dark:text-white mb-6 pb-2 border-b border-slate-200 dark:border-slate-700">
          {{ t('resume.certifications') }}
        </h2>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <div v-for="cert in [
            'Django Web Framework',
            'Fundamentals of NuxtJS',
            'Introduction to SEO',
            'Google SEO Fundamentals',
            'Google SEO Capstone Project',
            'Optimizing for Google Search',
            'Advanced Content & Social Tactics',
            'Increase SEO Traffic with WordPress',
            'Principles of UX/UI Design',
            'Mastering Laravel & PHP',
            'React Basics',
            'Advanced React (Meta/Coursera)',
            'AngularJS',
            'VueJS',
            'Full-Stack Web Developer',
            'Bootstrap 4',
            'HTML5 / CSS3 / JavaScript',
            'Python',
            'Python to Access Web Data',
            'Perform Sentiment Analysis with scikit-learn',
            'Go (Golang)',
            'Ruby on Rails',
            'Introduction to Dart',
            'R Language',
            'Flutter & Dart',
            'Android Developer',
            'CCNA Networking',
            'LinkedIn Premium Quick Tips',
            'Gemini Certified Educator',
            'Gemini Certified University Student',
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
