<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()
const { featuredProjects } = useProjects()

const config = useRuntimeConfig()
const siteUrl = config.public.siteUrl as string

useSeo({
  title: t('meta.home.title'),
  description: t('meta.home.description'),
  image: `${siteUrl}/images/og-home.jpg`,
  imageAlt: 'Azzam Aziz Ali — Senior Full Stack Developer & SEO Specialist',
  type: 'profile',
})

const personSchema = usePersonSchema()
useHead({
  script: [{ type: 'application/ld+json', innerHTML: JSON.stringify(personSchema) }],
})

const stats = [
  { value: '10+', label: t('stats.experience'), icon: '🏆' },
  { value: '22+', label: t('stats.projects'), icon: '🚀' },
  { value: '40+', label: t('stats.clients'), icon: '🤝' },
  { value: '34%', label: t('stats.userGrowth'), icon: '📈' },
]

const skillGroups = computed(() => [
  { key: 'backend', label: t('skills.backend'), items: ['Laravel', 'Django', 'PHP', 'Python', 'Go', 'Ruby on Rails', 'Node.js', 'REST API'] },
  { key: 'frontend', label: t('skills.frontend'), items: ['React', 'Vue 3', 'Nuxt 3', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Bootstrap', 'jQuery', 'SASS', 'Axios', 'Next.js', 'HTML5', 'CSS3'] },
  { key: 'seo', label: t('skills.seo'), items: ['Technical SEO', 'Core Web Vitals', 'Schema Markup', 'Google Analytics', 'Screaming Frog', 'MOZ'] },
  { key: 'databases', label: t('skills.databases'), items: ['MySQL', 'PostgreSQL', 'Redis', 'Firebase', 'SQLite'] },
  { key: 'tools', label: t('skills.tools'), items: ['Git', 'NPM', 'Webpack', 'VS Code', 'ClickUp', 'Slack', 'DBeaver', 'FileZilla', 'Android Studio', 'Composer', 'WordPress', 'PrestaShop'] },
])

const testimonials = [
  {
    name: 'FastCaisse Team',
    role: 'SaaS Platform — Belgium',
    text: 'Azzam built our entire ordering platform from scratch. Multi-restaurant, multi-language, SEO-optimized. Exceptional work.',
    avatar: '🏢',
  },
  {
    name: 'Hexabitz',
    role: 'IoT Company',
    text: 'Delivered a custom browser-based IDE for hardware programming. Clean code, on time, zero compromises.',
    avatar: '⚡',
  },
]

const isVisible = ref(false)
onMounted(() => {
  isVisible.value = true
})
</script>

<template>
  <div>
    <section class="relative min-h-screen flex items-center overflow-hidden" id="home">
      <div class="blob blob-1 opacity-20 dark:opacity-10 -top-40 -left-40 w-96 h-96 bg-primary-400"></div>
      <div class="blob blob-2 opacity-20 dark:opacity-10 -bottom-40 -right-40 w-[30rem] h-[30rem] bg-accent"></div>

      <div class="container-custom relative z-10 py-20">
        <div class="grid lg:grid-cols-2 gap-16 items-center">
          <div :class="['transition-all duration-700', isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8']">
            <div class="flex items-center gap-3 mb-6">
              <span class="badge-green badge text-xs">
                <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse me-1.5"></span>
                {{ t('hero.availableForWork') }}
              </span>
            </div>

            <h1 class="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-4 leading-[1.05]">
              <span class="text-slate-800 dark:text-white">{{ t('hero.greeting') }}</span><br>
              <span class="gradient-text">{{ t('hero.name') }}</span>
            </h1>

            <p class="text-xl sm:text-2xl lg:text-3xl font-semibold text-slate-600 dark:text-slate-300 mb-2">
              {{ t('hero.title') }}
            </p>
            <p class="text-lg sm:text-xl text-primary-600 dark:text-primary-400 font-medium mb-6">
              {{ t('hero.subtitle') }}
            </p>

            <p class="text-base sm:text-lg text-slate-500 dark:text-slate-400 mb-8 sm:mb-10 max-w-xl leading-relaxed text-balance">
              {{ t('hero.tagline') }}
            </p>

            <div class="flex flex-wrap gap-4">
              <NuxtLink :to="localePath('/projects')" class="btn-primary text-sm sm:text-base px-6 sm:px-8 py-3">
                {{ t('hero.cta') }}
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </NuxtLink>
              <NuxtLink :to="localePath('/contact')" class="btn-secondary text-sm sm:text-base px-6 sm:px-8 py-3">
                {{ t('hero.ctaSecondary') }}
              </NuxtLink>
            </div>

            <div class="mt-10 flex flex-wrap gap-2">
              <span v-for="tech in ['Laravel', 'React', 'Vue 3', 'Django', 'TypeScript', 'SEO']" :key="tech" class="badge text-xs">
                {{ tech }}
              </span>
            </div>
          </div>

          <div :class="['transition-all duration-700 delay-200 flex justify-center', isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8']">
            <div class="relative">
              <div class="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-accent/20 rounded-3xl blur-2xl scale-110"></div>
              <div class="relative w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 rounded-3xl overflow-hidden border-4 border-white/10 shadow-2xl">
                <NuxtImg
                  src="/images/Azzam.jpg"
                  alt="Azzam Aziz Ali - Senior Full Stack Developer & SEO Specialist"
                  class="w-full h-full object-cover"
                  loading="eager"
                  width="400"
                  height="400"
                />
              </div>

              <div class="absolute -bottom-4 -left-4 card px-3 py-2 sm:px-4 sm:py-3 shadow-xl hidden sm:block">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-xl bg-primary-600 flex items-center justify-center text-white text-sm font-bold">FC</div>
                  <div>
                    <p class="text-xs font-bold text-slate-800 dark:text-white">FastCaisse SaaS</p>
                    <p class="text-xs text-emerald-600 dark:text-emerald-400">+34% weekly users ↑</p>
                  </div>
                </div>
              </div>

              <div class="absolute -top-4 -right-4 card px-3 py-2 sm:px-4 sm:py-3 shadow-xl hidden sm:block">
                <div class="text-center">
                  <p class="text-2xl font-extrabold gradient-text">75%</p>
                  <p class="text-xs text-slate-500 dark:text-slate-400">Organic traffic ↑</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <a href="#stats" class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400 hover:text-primary-500 transition-colors animate-bounce" :aria-label="t('hero.scrollDown')">
        <span class="text-xs font-medium">{{ t('hero.scrollDown') }}</span>
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
        </svg>
      </a>
    </section>

    <section class="py-16 bg-slate-50 dark:bg-slate-900/50" id="stats">
      <div class="container-custom">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          <div v-for="stat in stats" :key="stat.label" class="metric-card card-hover">
            <div class="text-3xl mb-2">{{ stat.icon }}</div>
            <div class="metric-value">{{ stat.value }}</div>
            <div class="metric-label">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-12 sm:py-16 lg:py-24" id="about-preview">
      <div class="container-custom">
        <div class="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p class="section-label">{{ t('about.subtitle') }}</p>
            <h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white mb-6 leading-tight">
              {{ t('about.title') }}
            </h2>
            <p class="text-lg text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
              {{ t('about.bio1') }}
            </p>
            <p class="text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
              {{ t('about.bio2') }}
            </p>
            <div class="flex flex-wrap gap-3">
              <NuxtLink :to="localePath('/about')" class="btn-primary">
                Read My Story
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </NuxtLink>
              <a href="/cv/Azzams_Resume.pdf" download class="btn-secondary">
                {{ t('about.downloadResume') }}
              </a>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div v-for="group in skillGroups" :key="group.key" class="card p-5">
              <h3 class="text-xs font-bold uppercase tracking-widest text-primary-600 dark:text-primary-400 mb-3">{{ group.label }}</h3>
              <div class="flex flex-wrap gap-1.5">
                <span v-for="tech in group.items" :key="tech" class="text-xs px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-medium">
                  {{ tech }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-12 sm:py-16 lg:py-24 bg-slate-50 dark:bg-slate-900/50" id="fastcaisse-metrics">
      <div class="container-custom">
        <div class="text-center mb-12">
          <p class="section-label mx-auto justify-center">Featured Case Study</p>
          <h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
            FastCaisse — Multi-Restaurant SaaS Platform
          </h2>
          <p class="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            Built and scaled a full-stack ordering SaaS serving restaurants across 4 countries, with measurable organic growth driven by technical SEO.
          </p>
        </div>

        <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div class="metric-card card-hover">
            <div class="metric-value">34.6%</div>
            <div class="metric-label">Weekly Active Users Growth</div>
          </div>
          <div class="metric-card card-hover">
            <div class="metric-value">75%</div>
            <div class="metric-label">Organic Search Sessions Increase</div>
          </div>
          <div class="metric-card card-hover">
            <div class="metric-value">62.6%</div>
            <div class="metric-label">Event Count Increase</div>
          </div>
          <div class="metric-card card-hover">
            <div class="metric-value">4</div>
            <div class="metric-label">Countries (BE, SG, CN, US)</div>
          </div>
        </div>

        <div class="flex flex-wrap gap-3 justify-center mb-8">
          <span v-for="tech in ['Laravel', 'Vue 3', 'MySQL', 'Redis', 'Nuxt SEO', 'Payment Integration', 'Multi-language', 'Kiosk Mode']" :key="tech" class="badge">
            {{ tech }}
          </span>
        </div>

        <div class="text-center">
          <NuxtLink :to="localePath('/case-studies')" class="btn-primary">
            Read Full Case Study
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </NuxtLink>
        </div>
      </div>
    </section>

    <section class="py-12 sm:py-16 lg:py-24" id="featured-projects">
      <div class="container-custom">
        <div class="flex items-end justify-between mb-12">
          <div>
            <p class="section-label">{{ t('projects.featured') }}</p>
            <h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white">
              {{ t('projects.title') }}
            </h2>
          </div>
          <NuxtLink :to="localePath('/projects')" class="btn-ghost hidden sm:flex">
            View All Projects
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </NuxtLink>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <a
            v-for="project in featuredProjects"
            :key="project.id"
            :href="project.url"
            target="_blank"
            rel="noopener noreferrer"
            class="project-card group"
          >
            <div class="h-52 bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <NuxtImg
                :src="project.image"
                :alt="project.title"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                width="600"
                height="400"
                loading="lazy"
              />
            </div>
            <div class="p-5">
              <div class="flex items-start justify-between mb-2">
                <h3 class="font-bold text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {{ locale === 'ar' && project.titleAr ? project.titleAr : project.title }}
                </h3>
                <svg class="w-4 h-4 text-slate-400 group-hover:text-primary-500 shrink-0 mt-0.5 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                </svg>
              </div>
              <p v-if="project.description" class="text-sm text-slate-500 dark:text-slate-400 mb-3 line-clamp-2">
                {{ locale === 'ar' && project.descriptionAr ? project.descriptionAr : project.description }}
              </p>
              <div class="flex flex-wrap gap-1.5">
                <span v-for="tag in project.tags.slice(0, 3)" :key="tag" class="text-xs px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-medium">
                  {{ tag }}
                </span>
              </div>
            </div>
          </a>
        </div>

        <div class="text-center mt-10 sm:hidden">
          <NuxtLink :to="localePath('/projects')" class="btn-primary">View All Projects</NuxtLink>
        </div>
      </div>
    </section>

    <section class="py-12 sm:py-16 lg:py-24 bg-slate-50 dark:bg-slate-900/50" id="testimonials">
      <div class="container-custom">
        <p class="section-label justify-center">Social Proof</p>
        <h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white text-center mb-8 sm:mb-12">
          Trusted by Teams Across Europe & Beyond
        </h2>
        <div class="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div v-for="t in testimonials" :key="t.name" class="card p-8">
            <div class="text-3xl mb-4">{{ t.avatar }}</div>
            <blockquote class="text-slate-600 dark:text-slate-300 mb-6 italic leading-relaxed">
              "{{ t.text }}"
            </blockquote>
            <div>
              <p class="font-bold text-slate-900 dark:text-white">{{ t.name }}</p>
              <p class="text-sm text-primary-600 dark:text-primary-400">{{ t.role }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-12 sm:py-16 lg:py-24 relative overflow-hidden" id="cta">
      <div class="absolute inset-0 bg-gradient-to-br from-primary-600 to-accent"></div>
      <div class="absolute inset-0 opacity-10" style="background-image: url(&quot;data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='white'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e&quot;)"></div>
      <div class="container-custom relative z-10 text-center">
        <h2 class="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4">
          Ready to Scale Your Product?
        </h2>
        <p class="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
          Let's discuss your project — full stack development, SEO audit, or technical co-founder role.
        </p>
        <div class="flex flex-wrap gap-4 justify-center">
          <NuxtLink :to="localePath('/contact')" class="btn-secondary bg-white text-primary-700 border-white hover:bg-white/90 text-sm sm:text-base px-6 sm:px-8 py-3">
            Get in Touch
          </NuxtLink>
          <a href="https://wa.me/+963991576641" target="_blank" rel="noopener noreferrer" class="btn-secondary text-white border-white/40 hover:border-white hover:bg-white/10 text-sm sm:text-base px-6 sm:px-8 py-3">
            WhatsApp Me
          </a>
        </div>
      </div>
    </section>
  </div>
</template>
