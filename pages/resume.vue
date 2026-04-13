<script setup lang="ts">
const { t, tm, rt } = useI18n()

useSeo({
  title: t('meta.resume.title'),
  description: t('meta.resume.description'),
  image: 'https://azzamazizali.sy/images/Azzam.jpg',
  imageAlt: 'Resume — Azzam Aziz Ali Senior Full Stack Developer',
  breadcrumb: [{ name: 'Resume', url: 'https://azzamazizali.sy/resume' }],
})

const techStack = {
  'Backend': ['Laravel', 'PHP', 'Django', 'Python', 'Go', 'Ruby on Rails', 'REST API', 'Node.js'],
  'Frontend': ['React', 'Vue 3', 'Nuxt 3', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Bootstrap', 'jQuery', 'SASS', 'Axios', 'AngularJS', 'HTML5', 'CSS3', 'Next.js'],
  'Databases': ['MySQL', 'PostgreSQL', 'Redis', 'Firebase', 'SQLite'],
  'SEO & Analytics': ['Google Analytics 4', 'Search Console', 'Screaming Frog', 'Schema Markup', 'Hreflang', 'Core Web Vitals', 'Moz'],
  'DevOps & Tools': ['Git', 'GitHub', 'Docker', 'Linux', 'Nginx', 'VS Code', 'Composer', 'NPM', 'Webpack'],
  'CMS & E-commerce': ['WordPress', 'PrestaShop', 'WooCommerce'],
  'Collaboration': ['ClickUp', 'Slack', 'FileZilla', 'DBeaver', 'Android Studio'],
}

const experience = computed(() => [
  {
    role: t('resume.jobs.astramind.role'),
    company: 'AstraMind',
    period: '11/2025 – Present',
    location: t('resume.jobs.astramind.location'),
    bullets: (tm('resume.jobs.astramind.bullets') as any[]).map(rt),
  },
  {
    role: t('resume.jobs.fastcaisse.role'),
    company: 'FastCaisse',
    period: '01/2023 – Present',
    location: t('resume.jobs.fastcaisse.location'),
    bullets: (tm('resume.jobs.fastcaisse.bullets') as any[]).map(rt),
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

const education = [
  {
    degree: 'Master in Web Technologies',
    university: 'Syrian Virtual University',
    location: 'Syria',
    period: '2019 – 2021',
    gpa: '3.25 / 4.0',
  },
  {
    degree: 'B.Sc. Electronics & Communication Engineering',
    university: 'Tishreen University',
    location: 'Lattakia, Syria',
    period: '2008 – 2014',
    gpa: '2.75 / 4.0',
  },
]
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
            <span class="flex items-center gap-1">📍 Tartus, Syria (Remote)</span>
            <span class="flex items-center gap-1">✉️ Azzamazezali@gmail.com</span>
            <span class="flex items-center gap-1">💬 <span dir="ltr">+963 991 576 641</span></span>
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
        <div class="text-center px-4">
          <p class="text-3xl font-extrabold gradient-text">10+</p>
          <p class="text-xs text-slate-500 dark:text-slate-400">Years Experience</p>
        </div>
        <div class="hidden sm:block w-px bg-slate-200 dark:bg-slate-700"></div>
        <div class="text-center px-4">
          <p class="text-3xl font-extrabold gradient-text">22+</p>
          <p class="text-xs text-slate-500 dark:text-slate-400">Projects Delivered</p>
        </div>
        <div class="hidden sm:block w-px bg-slate-200 dark:bg-slate-700"></div>
        <div class="text-center px-4">
          <p class="text-3xl font-extrabold gradient-text">40+</p>
          <p class="text-xs text-slate-500 dark:text-slate-400">Happy Clients</p>
        </div>
        <div class="hidden sm:block w-px bg-slate-200 dark:bg-slate-700"></div>
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
        <div class="space-y-4">
          <div v-for="edu in education" :key="edu.degree" class="card p-6">
            <div class="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 class="text-lg font-bold text-slate-900 dark:text-white">{{ edu.degree }}</h3>
                <p class="text-primary-600 dark:text-primary-400 font-semibold">{{ edu.university }} · {{ edu.location }}</p>
                <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">GPA: {{ edu.gpa }}</p>
              </div>
              <span class="badge text-xs">{{ edu.period }}</span>
            </div>
          </div>
        </div>
      </section>

      <section class="mb-12">
        <h2 class="text-2xl font-extrabold text-slate-900 dark:text-white mb-6 pb-2 border-b border-slate-200 dark:border-slate-700">
          Experience Certificates
        </h2>
        <div class="grid sm:grid-cols-3 gap-4">
          <a
            v-for="cert in [
              { title: 'FastCaisse – Full Stack & SEO', issuer: 'FastCaisse, Belgium', file: '/cv/FAST_CAISSE_Experience_Certificate_Azzam_Aziz_Ali-signed.pdf' },
              { title: 'Hexabitz – Full Stack Developer', issuer: 'Hexabitz, USA', file: '/cv/Azzams_Experience_CERTIFICATE_in_Hexabitz_Full-Stack_Web_Developer.pdf' },
              { title: 'Caresine – SEO Specialist', issuer: 'Caresine', file: '/cv/Caresine_SEO_Specialist_Caresine_company_Azzam.pdf' },
            ]"
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
              title="Job Interview — Azzam Aziz Ali"
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
