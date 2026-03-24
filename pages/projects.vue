<script setup lang="ts">
const { t, locale } = useI18n()
const { projects, filterProjects } = useProjects()

const config = useRuntimeConfig()
const siteUrl = config.public.siteUrl as string

useSeo({
  title: t('meta.projects.title'),
  description: t('meta.projects.description'),
  image: `${siteUrl}/images/og-projects.jpg`,
  imageAlt: 'Projects Portfolio — Azzam Aziz Ali Full Stack Developer',
  breadcrumb: [{ name: 'Projects', url: `${siteUrl}/projects` }],
})

const activeFilter = ref('all')
const filters = [
  { key: 'all', label: t('projects.all') },
  { key: 'saas', label: t('projects.saas') },
  { key: 'web', label: t('projects.web') },
  { key: 'ecommerce', label: t('projects.ecommerce') },
  { key: 'design', label: t('projects.design') },
  { key: 'ai', label: t('projects.ai') },
]

const filteredProjects = computed(() => filterProjects(activeFilter.value))

const sliderIndex = reactive<Record<number, number>>({})
const sliderTimers = reactive<Record<number, ReturnType<typeof setInterval>>>({})

function getActiveImage(project: { id: number; image: string; images?: string[] }): string {
  if (project.images && project.images.length > 1) {
    return project.images[sliderIndex[project.id] ?? 0] ?? project.image
  }
  return project.image
}

function startSlider(project: { id: number; images?: string[] }) {
  if (!project.images || project.images.length <= 1) return
  sliderIndex[project.id] = 0
  sliderTimers[project.id] = setInterval(() => {
    sliderIndex[project.id] = ((sliderIndex[project.id] ?? 0) + 1) % project.images!.length
  }, 1200)
}

function stopSlider(project: { id: number; images?: string[] }) {
  if (!project.images || project.images.length <= 1) return
  clearInterval(sliderTimers[project.id])
  sliderIndex[project.id] = 0
}
</script>

<template>
  <div class="py-12 sm:py-16 lg:py-20">
    <div class="container-custom">
      <div class="text-center mb-14">
        <p class="section-label justify-center">{{ t('projects.subtitle') }}</p>
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">
          {{ t('projects.title') }}
        </h1>
        <p class="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
          {{ t('projects.description') }}
        </p>
      </div>

      <div class="flex flex-wrap gap-2 justify-center mb-6 sm:mb-10">
        <button
          v-for="filter in filters"
          :key="filter.key"
          :class="[
            'px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200',
            activeFilter === filter.key
              ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400',
          ]"
          @click="activeFilter = filter.key"
        >
          {{ filter.label }}
        </button>
      </div>

      <Transition name="grid" mode="out-in">
        <div :key="activeFilter" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <a
            v-for="project in filteredProjects"
            :key="project.id"
            :href="project.url !== '#' ? project.url : undefined"
            :target="project.url !== '#' ? '_blank' : undefined"
            rel="noopener noreferrer"
            class="project-card group"
            :class="{ 'cursor-default pointer-events-none': project.url === '#' }"
            @mouseenter="startSlider(project)"
            @mouseleave="stopSlider(project)"
          >
            <div class="relative h-48 bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <NuxtImg
                :src="getActiveImage(project)"
                :alt="locale === 'ar' && project.titleAr ? project.titleAr : project.title"
                class="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                width="600"
                height="400"
                loading="lazy"
              />
              <div
                v-if="project.images && project.images.length > 1"
                class="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5"
              >
                <span
                  v-for="(_, i) in project.images"
                  :key="i"
                  class="w-1.5 h-1.5 rounded-full transition-colors duration-300"
                  :class="(sliderIndex[project.id] ?? 0) === i ? 'bg-white' : 'bg-white/40'"
                />
              </div>
            </div>
            <div class="p-5">
              <div class="flex items-start justify-between mb-1.5">
                <h2 class="font-bold text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors text-sm">
                  {{ locale === 'ar' && project.titleAr ? project.titleAr : project.title }}
                </h2>
                <svg v-if="project.url !== '#'" class="w-3.5 h-3.5 text-slate-400 group-hover:text-primary-500 shrink-0 mt-0.5 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                </svg>
              </div>
              <p class="text-xs text-slate-400 mb-3">{{ project.dateLabel }}</p>
              <div class="flex flex-wrap gap-1.5">
                <span v-for="tag in project.tags.slice(0, 4)" :key="tag" class="text-xs px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 font-medium">
                  {{ tag }}
                </span>
              </div>
            </div>
          </a>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.grid-enter-active, .grid-leave-active { transition: all 0.25s; }
.grid-enter-from, .grid-leave-to { opacity: 0; transform: translateY(10px); }
</style>
