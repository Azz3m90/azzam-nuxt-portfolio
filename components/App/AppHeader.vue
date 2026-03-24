<script setup lang="ts">
const { t, locale } = useI18n()
const colorMode = useColorMode()
const route = useRoute()

const isMenuOpen = ref(false)
const isScrolled = ref(false)

const isDark = computed(() => colorMode.preference === 'dark')
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

const toggleTheme = () => {
  const newMode = colorMode.preference === 'dark' ? 'light' : 'dark'
  colorMode.preference = newMode
}

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
        ? 'header-scrolled'
        : 'bg-transparent',
    ]"
  >
    <div class="container-custom flex items-center justify-between h-16 md:h-18">
      <NuxtLink :to="localePath('/')" class="flex items-center gap-1 text-xl font-extrabold shrink-0" @click="closeMenu">
        <span class="gradient-text">Azzam</span>
        <span class="text-slate-800 dark:text-white">.</span>
      </NuxtLink>

      <nav class="hidden xl:flex items-center gap-0.5 xl:gap-1">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.key"
          :to="link.to"
          class="nav-link text-sm px-3 xl:px-4 py-2"
          active-class="nav-link-active"
        >
          {{ t(`nav.${link.key}`) }}
        </NuxtLink>
      </nav>

      <div class="flex items-center gap-1.5 sm:gap-2">
        <NuxtLink
          :to="switchLocalePath(otherLocale)"
          class="header-icon-btn inline-flex items-center justify-center gap-1"
          :title="otherLocale === 'ar' ? 'العربية' : 'English'"
        >
          <svg class="w-[18px] h-[18px] shrink-0" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10"/>
            <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
          </svg>
          <span class="text-xs font-bold leading-none">{{ otherLocaleLabel }}</span>
        </NuxtLink>

        <button
          class="header-icon-btn inline-flex items-center justify-center"
          :aria-label="isDark ? t('theme.light') : t('theme.dark')"
          type="button"
          @click="toggleTheme"
        >
          <Transition name="theme-icon" mode="out-in">
            <svg v-if="isDark" key="sun" class="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"/>
            </svg>
            <svg v-else key="moon" class="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/>
            </svg>
          </Transition>
        </button>

        <NuxtLink :to="localePath('/contact')" class="btn-primary text-sm hidden sm:inline-flex py-2 px-4">
          {{ t('nav.bookConsultation') }}
        </NuxtLink>

        <button
          class="xl:hidden flex items-center justify-center header-icon-btn relative"
          aria-label="Toggle menu"
          @click="toggleMenu"
        >
          <span class="sr-only">Menu</span>
          <div class="hamburger-lines" :class="{ 'is-open': isMenuOpen }">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      </div>
    </div>

    <Transition name="mobile-menu">
      <div v-show="isMenuOpen" class="xl:hidden mobile-nav-panel">
        <nav class="container-custom py-4 flex flex-col gap-1">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.key"
            :to="link.to"
            class="mobile-nav-link"
            active-class="mobile-nav-link-active"
            @click="closeMenu"
          >
            {{ t(`nav.${link.key}`) }}
          </NuxtLink>
          <div class="mt-3 pt-3 border-t border-slate-200/80 dark:border-slate-700/50 flex flex-col gap-3">
            <button
              class="mobile-nav-link w-full justify-between"
              @click.prevent="toggleTheme"
            >
              <span>{{ isDark ? t('theme.light') : t('theme.dark') }}</span>
              <svg v-if="isDark" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"/>
              </svg>
              <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/>
              </svg>
            </button>
            <NuxtLink
              :to="switchLocalePath(otherLocale)"
              class="mobile-nav-link w-full justify-between"
              @click="closeMenu"
            >
              <span>{{ otherLocale === 'ar' ? 'العربية' : 'English' }}</span>
              <span class="text-xs font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800">{{ otherLocaleLabel }}</span>
            </NuxtLink>
            <NuxtLink :to="localePath('/contact')" class="btn-primary text-sm w-full justify-center" @click="closeMenu">
              {{ t('nav.bookConsultation') }}
            </NuxtLink>
          </div>
        </nav>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.header-scrolled {
  @apply bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl shadow-lg shadow-slate-900/5 dark:shadow-slate-950/50
         border-b border-slate-200/50 dark:border-slate-700/30;
}

.header-icon-btn {
  @apply h-9 px-2 rounded-xl text-sm font-bold
         text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400
         hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200;
}

.nav-link {
  @apply inline-flex items-center font-medium rounded-xl text-slate-600 dark:text-slate-400
         hover:text-primary-600 dark:hover:text-primary-400
         hover:bg-primary-50/50 dark:hover:bg-slate-800/60 transition-all duration-200;
}
.nav-link-active {
  @apply text-primary-600 dark:text-primary-400 bg-primary-100/50 dark:bg-primary-900/20 shadow-sm shadow-primary-500/5;
}

.mobile-nav-panel {
  @apply bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl
         border-t border-slate-200/80 dark:border-slate-700/30
         shadow-xl shadow-slate-900/10 dark:shadow-slate-950/50
         max-h-[calc(100vh-4rem)] overflow-y-auto;
}

.mobile-nav-link {
  @apply flex items-center px-4 py-3 text-sm font-medium rounded-xl
         text-slate-700 dark:text-slate-300
         hover:text-primary-600 dark:hover:text-primary-400
         hover:bg-primary-50/80 dark:hover:bg-primary-900/20
         active:scale-[0.98] transition-all duration-200;
}
.mobile-nav-link-active {
  @apply text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20;
}

.hamburger-lines {
  @apply w-5 h-4 flex flex-col justify-between;
}
.hamburger-lines span {
  @apply block h-0.5 w-full bg-current rounded-full transition-all duration-300 origin-center;
}
.hamburger-lines.is-open span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}
.hamburger-lines.is-open span:nth-child(2) {
  opacity: 0;
  transform: scaleX(0);
}
.hamburger-lines.is-open span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

.mobile-menu-enter-active { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
.mobile-menu-leave-active { transition: all 0.2s cubic-bezier(0.4, 0, 1, 1); }
.mobile-menu-enter-from { opacity: 0; transform: translateY(-12px); }
.mobile-menu-leave-to { opacity: 0; transform: translateY(-8px); }

.theme-icon-enter-active, .theme-icon-leave-active { transition: all 0.2s ease; }
.theme-icon-enter-from { opacity: 0; transform: rotate(-90deg) scale(0.5); }
.theme-icon-leave-to { opacity: 0; transform: rotate(90deg) scale(0.5); }
</style>
