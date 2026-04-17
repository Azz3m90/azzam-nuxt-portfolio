<script setup lang="ts">
const { t, locale } = useI18n()
const route = useRoute()
const localePath = useLocalePath()
const { getProjectBySlug, projects } = useProjects()

const slug = route.params.slug as string
const project = getProjectBySlug(slug)

if (!project) {
  throw createError({ statusCode: 404, statusMessage: 'Project not found' })
}

const isAr = computed(() => locale.value === 'ar')
const title = computed(() => isAr.value && project.titleAr ? project.titleAr : project.title)
const desc = computed(() => isAr.value && project.descriptionAr ? project.descriptionAr : (project.description ?? ''))
const longDesc = computed(() => isAr.value && project.longDescriptionAr ? project.longDescriptionAr : (project.longDescription ?? desc.value))
const role = computed(() => isAr.value && project.roleAr ? project.roleAr : (project.role ?? ''))
const features = computed(() => isAr.value && project.featuresAr ? project.featuresAr : (project.features ?? []))
const challenges = computed(() => isAr.value && project.challengesAr ? project.challengesAr : (project.challenges ?? []))

useSeo({
  title: `${project.title} | Azzam Aziz Ali`,
  description: project.description ?? project.title,
  image: `https://azzamazizali.sy${project.image}`,
  imageAlt: `${project.title} — Project by Azzam Aziz Ali`,
  breadcrumb: [
    { name: 'Projects', url: 'https://azzamazizali.sy/projects' },
    { name: project.title, url: `https://azzamazizali.sy/projects/${project.slug}` },
  ],
})

const allImages = computed(() => {
  if (project.images && project.images.length > 0) return project.images
  return [project.image]
})

const currentSlide = ref(0)
const isTransitioning = ref(false)
let autoplayTimer: ReturnType<typeof setInterval> | null = null

function goToSlide(index: number) {
  if (isTransitioning.value) return
  isTransitioning.value = true
  currentSlide.value = index
  setTimeout(() => { isTransitioning.value = false }, 500)
  resetAutoplay()
}

function nextSlide() {
  goToSlide((currentSlide.value + 1) % allImages.value.length)
}

function prevSlide() {
  goToSlide((currentSlide.value - 1 + allImages.value.length) % allImages.value.length)
}

function resetAutoplay() {
  if (autoplayTimer) clearInterval(autoplayTimer)
  if (allImages.value.length > 1) {
    autoplayTimer = setInterval(nextSlide, 5000)
  }
}

onMounted(() => { resetAutoplay() })
onUnmounted(() => { if (autoplayTimer) clearInterval(autoplayTimer) })

const currentIdx = computed(() => projects.findIndex(p => p.slug === slug))
const prevProject = computed(() => currentIdx.value > 0 ? projects[currentIdx.value - 1] : null)
const nextProject = computed(() => currentIdx.value < projects.length - 1 ? projects[currentIdx.value + 1] : null)

const categoryLabels: Record<string, string> = {
  saas: 'SaaS',
  ecommerce: 'E-Commerce',
  web: 'Web App',
  design: 'Design',
  ai: 'AI & ML',
}
</script>

<template>
  <div class="py-12 sm:py-16 lg:py-20">
    <div class="container-custom max-w-5xl">
      <div class="mb-6">
        <NuxtLink :to="localePath('/projects')" class="btn-ghost text-sm ps-0">
          <svg class="w-4 h-4 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
          {{ t('projectDetail.backToProjects') }}
        </NuxtLink>
      </div>

      <div class="card overflow-hidden mb-10">
        <div class="relative group bg-slate-100 dark:bg-slate-800">
          <div class="relative aspect-video overflow-hidden">
            <TransitionGroup name="slide-fade">
              <NuxtImg
                v-for="(img, i) in allImages"
                v-show="currentSlide === i"
                :key="img"
                :src="img"
                :alt="`${title} — screenshot ${i + 1}`"
                class="absolute inset-0 w-full h-full object-cover"
                width="1200"
                height="675"
                :loading="i === 0 ? 'eager' : 'lazy'"
              />
            </TransitionGroup>
          </div>

          <template v-if="allImages.length > 1">
            <button
              class="absolute start-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60"
              :aria-label="t('projectDetail.prevImage')"
              @click="prevSlide"
            >
              <svg class="w-5 h-5 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
              </svg>
            </button>
            <button
              class="absolute end-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60"
              :aria-label="t('projectDetail.nextImage')"
              @click="nextSlide"
            >
              <svg class="w-5 h-5 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </button>

            <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              <button
                v-for="(_, i) in allImages"
                :key="i"
                class="w-2.5 h-2.5 rounded-full transition-all duration-300"
                :class="currentSlide === i ? 'bg-white scale-125 shadow-lg' : 'bg-white/40 hover:bg-white/70'"
                :aria-label="`Go to image ${i + 1}`"
                @click="goToSlide(i)"
              />
            </div>

            <div class="absolute top-4 end-4 bg-black/40 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full">
              {{ currentSlide + 1 }} / {{ allImages.length }}
            </div>
          </template>
        </div>
      </div>

      <div class="mb-10">
        <div class="flex flex-wrap items-center gap-2 mb-4">
          <span class="badge">{{ categoryLabels[project.category] || project.category }}</span>
          <span v-if="project.featured" class="badge-green">{{ t('projectDetail.featured') }}</span>
          <span class="text-sm text-slate-400 dark:text-slate-500">{{ project.dateLabel }}</span>
        </div>

        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white mb-4 leading-tight">
          {{ title }}
        </h1>

        <p class="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
          {{ longDesc }}
        </p>

        <div class="flex flex-wrap gap-3">
          <a
            v-if="project.url !== '#'"
            :href="project.url"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-primary"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
            </svg>
            {{ t('projectDetail.viewLive') }}
          </a>
          <a
            v-if="project.github"
            :href="project.github"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-secondary"
          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            {{ t('projectDetail.viewCode') }}
          </a>
        </div>
      </div>

      <div class="grid lg:grid-cols-3 gap-8 mb-12">
        <div class="lg:col-span-2 space-y-8">
          <div v-if="features.length > 0" class="card p-6 sm:p-8">
            <h2 class="text-xl font-extrabold text-slate-900 dark:text-white mb-5 flex items-center gap-2">
              <svg class="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              {{ t('projectDetail.keyFeatures') }}
            </h2>
            <ul class="space-y-3">
              <li v-for="feature in features" :key="feature" class="flex items-start gap-3 text-slate-600 dark:text-slate-300">
                <svg class="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                {{ feature }}
              </li>
            </ul>
          </div>

          <div v-if="challenges.length > 0" class="card p-6 sm:p-8">
            <h2 class="text-xl font-extrabold text-slate-900 dark:text-white mb-5 flex items-center gap-2">
              <svg class="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
              {{ t('projectDetail.challenges') }}
            </h2>
            <ul class="space-y-3">
              <li v-for="challenge in challenges" :key="challenge" class="flex items-start gap-3 text-slate-600 dark:text-slate-300">
                <svg class="w-5 h-5 text-amber-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"/>
                </svg>
                {{ challenge }}
              </li>
            </ul>
          </div>
        </div>

        <div class="space-y-6">
          <div v-if="role" class="card p-6">
            <h3 class="text-sm font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
              {{ t('projectDetail.myRole') }}
            </h3>
            <p class="text-lg font-bold text-slate-900 dark:text-white">{{ role }}</p>
          </div>

          <div v-if="project.stack && project.stack.length > 0" class="card p-6">
            <h3 class="text-sm font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">
              {{ t('projectDetail.techStack') }}
            </h3>
            <div class="flex flex-wrap gap-2">
              <span v-for="tech in project.stack" :key="tech" class="badge">
                {{ tech }}
              </span>
            </div>
          </div>

          <div class="card p-6">
            <h3 class="text-sm font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">
              {{ t('projectDetail.tags') }}
            </h3>
            <div class="flex flex-wrap gap-2">
              <span v-for="tag in project.tags" :key="tag" class="text-xs px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 font-medium">
                {{ tag }}
              </span>
            </div>
          </div>

          <div class="card p-6">
            <h3 class="text-sm font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
              {{ t('projectDetail.date') }}
            </h3>
            <p class="font-bold text-slate-900 dark:text-white">{{ project.dateLabel }}</p>
          </div>
        </div>
      </div>

      <div class="flex items-center justify-between border-t border-slate-200 dark:border-slate-700/40 pt-8">
        <NuxtLink
          v-if="prevProject"
          :to="localePath(`/projects/${prevProject.slug}`)"
          class="btn-ghost text-sm group"
        >
          <svg class="w-4 h-4 rtl:rotate-180 transition-transform group-hover:-translate-x-1 rtl:group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
          <span class="hidden sm:inline">{{ isAr && prevProject.titleAr ? prevProject.titleAr : prevProject.title }}</span>
          <span class="sm:hidden">{{ t('projectDetail.prev') }}</span>
        </NuxtLink>
        <span v-else />
        <NuxtLink
          v-if="nextProject"
          :to="localePath(`/projects/${nextProject.slug}`)"
          class="btn-ghost text-sm group"
        >
          <span class="hidden sm:inline">{{ isAr && nextProject.titleAr ? nextProject.titleAr : nextProject.title }}</span>
          <span class="sm:hidden">{{ t('projectDetail.next') }}</span>
          <svg class="w-4 h-4 rtl:rotate-180 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </NuxtLink>
        <span v-else />
      </div>
    </div>
  </div>
</template>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(30px);
}
[dir='rtl'] .slide-fade-enter-from {
  transform: translateX(-30px);
}
.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
[dir='rtl'] .slide-fade-leave-to {
  transform: translateX(30px);
}
</style>
