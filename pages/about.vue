<script setup lang="ts">
const { t, tm, rt, locale } = useI18n()
const localePath = useLocalePath()

useSeo({
  title: t('meta.about.title'),
  description: t('meta.about.description'),
  image: 'https://azzamazizali.sy/images/Azzam.jpg',
  imageAlt: 'About Azzam Aziz Ali — Senior Full Stack Developer',
  type: 'profile',
  breadcrumb: [{ name: 'About', url: 'https://azzamazizali.sy/about' }],
})

const experience = computed(() => [
  {
    role: t('about.jobs.astramind.role'),
    company: 'AstraMind',
    url: 'https://astramind.de',
    period: '11/2025 – Present',
    location: t('about.jobs.astramind.location'),
    description: t('about.jobs.astramind.description'),
    achievements: (tm('about.jobs.astramind.achievements') as any[]).map(rt),
    stack: ['Nuxt 3', 'Next.js 14', 'Vue.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
  },
  {
    role: t('about.jobs.fastcaisse.role'),
    company: 'FastCaisse',
    url: 'https://fastcaisse.be',
    period: '01/2023 – Present',
    location: t('about.jobs.fastcaisse.location'),
    description: t('about.jobs.fastcaisse.description'),
    achievements: (tm('about.jobs.fastcaisse.achievements') as any[]).map(rt),
    stack: ['Laravel', 'Node.js', 'PHP', 'Vue 3', 'MySQL', 'Redis'],
  },
  {
    role: t('about.jobs.emtethal.role'),
    company: 'Emtethal',
    url: '#',
    period: '06/2025 – 10/2025',
    location: t('about.jobs.emtethal.location'),
    description: t('about.jobs.emtethal.description'),
    achievements: (tm('about.jobs.emtethal.achievements') as any[]).map(rt),
    stack: ['Django', 'React', 'Python', 'REST API', 'Figma'],
  },
  {
    role: t('about.jobs.hexabitz.role'),
    company: 'Hexabitz',
    url: 'https://hexabitz.com',
    period: '06/2022 – 05/2023',
    location: t('about.jobs.hexabitz.location'),
    description: t('about.jobs.hexabitz.description'),
    achievements: (tm('about.jobs.hexabitz.achievements') as any[]).map(rt),
    stack: ['Laravel', 'Babylon.js', 'JavaScript', 'PHP', 'IoT'],
  },
  {
    role: t('about.jobs.seetah.role'),
    company: 'Seetah Award',
    url: '#',
    period: '09/2021 – 01/2022',
    location: t('about.jobs.seetah.location'),
    description: t('about.jobs.seetah.description'),
    achievements: (tm('about.jobs.seetah.achievements') as any[]).map(rt),
    stack: ['Laravel', 'CodeIgniter', 'JavaScript', 'SEO'],
  },
  {
    role: t('about.jobs.bonzuttner.role'),
    company: 'Bonzuttner',
    url: '#',
    period: '06/2021 – 05/2022',
    location: t('about.jobs.bonzuttner.location'),
    description: t('about.jobs.bonzuttner.description'),
    achievements: (tm('about.jobs.bonzuttner.achievements') as any[]).map(rt),
    stack: ['Django', 'Python', 'Agile', 'REST API'],
    video: 'https://www.youtube.com/watch?v=UhHuoMAKMLc',
  },
])

const certificates = [
  { title: 'Django Web Framework', issuer: 'Meta/Coursera', icon: '🐍', url: '/cv/WebDevelopment/Web_Django_Framework.pdf' },
  { title: 'Fundamentals of NuxtJS', issuer: 'Udemy', icon: '💚', url: '/cv/WebDevelopment/NuxtJS.pdf' },
  { title: 'Introduction to SEO', issuer: 'Coursera', icon: '🔎', url: '/cv/WebDevelopment/SEO/Introduction_to_SEO.pdf' },
  { title: 'Google SEO Fundamentals', issuer: 'Google/Coursera', icon: '🔍', url: '/cv/WebDevelopment/SEO/Google_SEO_Fundamentals.pdf' },
  { title: 'Optimizing for Google Search', issuer: 'Google/Coursera', icon: '📊', url: '/cv/WebDevelopment/SEO/Optimizing_a_Website_for_Google_Search.pdf' },
  { title: 'Google SEO Capstone Project', issuer: 'Google/Coursera', icon: '🏆', url: '/cv/WebDevelopment/SEO/Google_SEO_Capstone_Project.pdf' },
  { title: 'Advanced Content & Social Tactics', issuer: 'Coursera', icon: '📣', url: '/cv/WebDevelopment/SEO/Advanced_Content_and_Social_Tactics_to_Optimize.pdf' },
  { title: 'Increase SEO Traffic with WordPress', issuer: 'Coursera', icon: '📝', url: '/cv/WebDevelopment/Increase_SEO_Traffic_with_WordPress.pdf' },
  { title: 'Principles of UX/UI Design', issuer: 'Meta/Coursera', icon: '🎨', url: '/cv/WebDevelopment/Principles_of_UX_UI_Design.pdf' },
  { title: 'Mastering Laravel & PHP', issuer: 'Udemy', icon: '⚡', url: '/cv/WebDevelopment/Mastering_PHP_and_Laravel.pdf' },
  { title: 'React Basics', issuer: 'Meta/Coursera', icon: '⚛️', url: '/cv/WebDevelopment/React_Basics.pdf' },
  { title: 'Advanced React', issuer: 'Meta/Coursera', icon: '⚛️', url: '/cv/WebDevelopment/Advanced_React.pdf' },
  { title: 'AngularJS', issuer: 'Coursera', icon: '🅰️', url: '/cv/WebDevelopment/AngularJS.pdf' },
  { title: 'VueJS', issuer: 'Udemy', icon: '💚', url: '/cv/WebDevelopment/VueJS.pdf' },
  { title: 'Full-Stack Web Developer', issuer: 'Coursera', icon: '🌐', url: '/cv/WebDevelopment/Full_Stack_Web_Developer.pdf' },
  { title: 'Bootstrap 4', issuer: 'Coursera', icon: '🅱️', url: '/cv/WebDevelopment/Front_End_Web_UI_Frameworks_and_Tools_Bootstrap_4.pdf' },
  { title: 'HTML5 / CSS3 / JavaScript', issuer: 'Coursera', icon: '💻', url: '/cv/WebDevelopment/HTML5_CSS3_JS_Certificate.pdf' },
  { title: 'Python', issuer: 'Coursera', icon: '🐍', url: '/cv/WebDevelopment/Python.pdf' },
  { title: 'Python to Access Web Data', issuer: 'Coursera', icon: '🕸️', url: '/cv/WebDevelopment/Python_to_Access_Web_Data.pdf' },
  { title: 'Perform Sentiment Analysis with scikit-learn', issuer: 'Coursera', icon: '🤖', url: '/cv/WebDevelopment/Coursera_Perform_Sentiment_Analysis_with_scikit-learn.pdf' },
  { title: 'Go (Golang)', issuer: 'Coursera', icon: '🔵', url: '/cv/WebDevelopment/Go.pdf' },
  { title: 'Ruby on Rails', issuer: 'Coursera', icon: '💎', url: '/cv/WebDevelopment/ruby-on-rails.pdf' },
  { title: 'Introduction to Dart', issuer: 'Coursera', icon: '🎯', url: '/cv/WebDevelopment/Coursera_Introduction_to_Dart.pdf' },
  { title: 'R Language', issuer: 'Coursera', icon: '📊', url: '/cv/WebDevelopment/R_Language.pdf' },
  { title: 'Flutter & Dart', issuer: 'Udemy', icon: '🦋', url: '/cv/AndroidDevelopment/flutter-1.pdf' },
  { title: 'Android Developer', issuer: 'Google', icon: '📱', url: '/cv/AndroidDevelopment/Android_Developer.pdf' },
  { title: 'CCNA Networking', issuer: 'Cisco', icon: '🌐', url: '/cv/Networking/0001.jpg' },
  { title: 'Controlling Gauge System', issuer: 'Industrial Training', icon: '⚙️', url: '/cv/controlling/controlling_guage_system.jpg' },
  { title: 'Engineering Certificate', issuer: 'Tishreen University', icon: '🎓', url: '/cv/Engineering/IMG_20191022_155503.jpg' },
  { title: 'LinkedIn Premium Quick Tips', issuer: 'LinkedIn Learning', icon: '💼', url: '/cv/LinkedIn/CertificateOfCompletion_LinkedIn%20Premium%20Quick%20Tips.pdf' },
  { title: 'Gemini Certified Educator', issuer: 'Google', icon: '🤖', url: '/cv/Gemini/Gemini_Certified_Educator.jpg' },
  { title: 'Gemini Certified University Student', issuer: 'Google', icon: '🎓', url: '/cv/Gemini/GeminiCertified_student.jpg' },
  { title: 'Experience Certificate – FastCaisse', issuer: 'FastCaisse (Belgium)', icon: '🏅', url: '/cv/FAST_CAISSE_Experience_Certificate_Azzam_Aziz_Ali-signed.pdf' },
  { title: 'Experience Certificate – Hexabitz', issuer: 'Hexabitz (USA)', icon: '🏅', url: '/cv/Azzams_Experience_CERTIFICATE_in_Hexabitz_Full-Stack_Web_Developer.pdf' },
  { title: 'SEO Specialist Certificate – Caresine', issuer: 'Caresine', icon: '🔍', url: '/cv/Caresine_SEO_Specialist_Caresine_company_Azzam.pdf' },
]
</script>

<template>
  <div class="py-12 sm:py-16 lg:py-20">
    <div class="container-custom">
      <div class="max-w-4xl mx-auto mb-12 sm:mb-16 lg:mb-20">
        <p class="section-label">{{ t('about.subtitle') }}</p>
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 leading-tight">
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

      <div class="mb-12 sm:mb-16 lg:mb-20">
        <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-6 sm:mb-10">
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
              <div class="flex flex-wrap gap-1.5" :class="{ 'mb-4': job.video }">
                <span v-for="tech in job.stack" :key="tech" class="text-xs px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-medium">
                  {{ tech }}
                </span>
              </div>
              <a
                v-if="job.video"
                :href="job.video"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 text-sm font-semibold text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                {{ t('about.watchInterview') }}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="mb-12 sm:mb-16 lg:mb-20">
        <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-6 sm:mb-10">
          {{ t('resume.certifications') }}
        </h2>
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
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
        <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-4">
          {{ t('about.ctaTitle') }}
        </h2>
        <p class="text-slate-600 dark:text-slate-300 mb-8 max-w-xl mx-auto">
          {{ t('about.ctaDesc') }}
        </p>
        <div class="flex flex-wrap gap-4 justify-center">
          <NuxtLink :to="localePath('/contact')" class="btn-primary">{{ t('nav.bookConsultation') }}</NuxtLink>
          <NuxtLink :to="localePath('/resume')" class="btn-secondary">{{ t('about.viewResume') }}</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
