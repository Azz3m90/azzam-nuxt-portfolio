<script setup lang="ts">
const { t, locale } = useI18n()
const colorMode = useColorMode()
const route = useRoute()

const isMenuOpen = ref(false)
const isScrolled = ref(false)

const isDark = computed(() => colorMode.value === 'dark')
const isRtl = computed(() => locale.value === 'ar')

const navLinks = computed(() => [
  { key: 'home', to: localePath('/') },
  { key: 'about', to: localePath('/about') },
  { key: 'projects', to: localePath('/projects') },
  { key: 'caseStudies', to: localePath('/case-studies') },
  { key: 'seoServices', to: localePath('/seo-services') },
  { key: 'blog', to: localePath('/blog') },
  { key: 'resume', to: localePath('/resume') },
  { key: 'contact', to: localePath('/contact') },
])

const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()

const otherLocale = computed(() => locale.value === 'en' ? 'ar' : 'en')
const otherLocaleLabel = computed(() => locale.value === 'en' ? 'ع' : 'EN')

const toggleMenu = () => { isMenuOpen.value = !isMenuOpen.value }
const closeMenu = () => { isMenuOpen.value = false }
const toggleTheme = () => { colorMode.preference = isDark.value ? 'light' : 'dark' }

onMounted(() => {
  window.addEventListener('scroll', () => { isScrolled.value = window.scrollY > 20 })
})

watch(route, closeMenu)
</script>

<template>
  <header
    :class="[
      'fixed top-0 inset-x-0 z-50 transition-all duration-300',
      isScrolled
        ? 'glass shadow-sm shadow-slate-200/50 dark:shadow-slate-900/50'
        : 'bg-transparent',
    ]"
  >
    <div class="container-custom flex items-center justify-between h-16">
      <NuxtLink :to="localePath('/')" class="flex items-center gap-1 text-xl font-extrabold">
        <span class="gradient-text">Azzam</span>
        <span class="text-slate-800 dark:text-white">.</span>
      </NuxtLink>

      <nav class="hidden lg:flex items-center gap-1">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.key"
          :to="link.to"
          class="btn-ghost text-sm"
          active-class="text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20"
        >
          {{ t(`nav.${link.key}`) }}
        </NuxtLink>
      </nav>

      <div class="flex items-center gap-2">
        <NuxtLink
          :to="switchLocalePath(otherLocale)"
          class="btn-ghost text-sm font-bold w-9 h-9 justify-center p-0"
          :title="otherLocale === 'ar' ? 'العربية' : 'English'"
        >
          {{ otherLocaleLabel }}
        </NuxtLink>

        <button
          class="btn-ghost w-9 h-9 justify-center p-0"
          :aria-label="isDark ? t('theme.light') : t('theme.dark')"
          @click="toggleTheme"
        >
          <svg v-if="isDark" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"/>
          </svg>
          <svg v-else class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/>
          </svg>
        </button>

        <NuxtLink :to="localePath('/contact')" class="btn-primary text-sm hidden sm:inline-flex py-2">
          {{ t('nav.bookConsultation') }}
        </NuxtLink>

        <button
          class="lg:hidden btn-ghost w-9 h-9 justify-center p-0"
          aria-label="Toggle menu"
          @click="toggleMenu"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path v-if="!isMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
    </div>

    <Transition name="mobile-menu">
      <div v-if="isMenuOpen" class="lg:hidden glass border-t border-slate-200/50 dark:border-slate-700/30">
        <nav class="container-custom py-4 flex flex-col gap-1">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.key"
            :to="link.to"
            class="btn-ghost text-sm justify-start"
            active-class="text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20"
          >
            {{ t(`nav.${link.key}`) }}
          </NuxtLink>
          <div class="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700">
            <NuxtLink :to="localePath('/contact')" class="btn-primary text-sm w-full justify-center">
              {{ t('nav.bookConsultation') }}
            </NuxtLink>
          </div>
        </nav>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.mobile-menu-enter-active, .mobile-menu-leave-active { transition: all 0.2s; }
.mobile-menu-enter-from, .mobile-menu-leave-to { opacity: 0; transform: translateY(-8px); }
</style>
