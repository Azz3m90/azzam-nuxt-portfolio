<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const currentYear = new Date().getFullYear()

const navLinks = [
  { key: 'about', to: '/about' },
  { key: 'projects', to: '/projects' },
  { key: 'caseStudies', to: '/case-studies' },
  { key: 'seoServices', to: '/seo-services' },
  { key: 'blog', to: '/blog' },
  { key: 'resume', to: '/resume' },
  { key: 'contact', to: '/contact' },
]

const socials = [
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/azzamazizali/', icon: 'linkedin' },
  { name: 'GitHub', url: 'https://github.com/Azz3m90', icon: 'github' },
  { name: 'WhatsApp', url: 'https://wa.me/+963991576641', icon: 'whatsapp' },
  { name: 'YouTube', url: 'https://www.youtube.com/@azzamazizali', icon: 'youtube' },
]
</script>

<template>
  <footer class="bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-300 pt-12 sm:pt-16 pb-8 mt-12 sm:mt-24 border-t border-slate-200 dark:border-transparent">
    <div class="container-custom">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 mb-8 sm:mb-12">
        <div>
          <div class="text-2xl font-extrabold mb-3">
            <span class="gradient-text">Azzam</span><span class="text-slate-800 dark:text-white">.</span>
          </div>
          <p class="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-4">{{ t('footer.tagline') }}</p>
          <div class="flex gap-3">
            <a
              v-for="s in socials"
              :key="s.name"
              :href="s.url"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="s.name"
              class="w-9 h-9 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-primary-600 hover:text-white dark:hover:bg-primary-600 text-slate-600 dark:text-slate-300 flex items-center justify-center transition-colors duration-200"
            >
              <svg v-if="s.icon === 'linkedin'" class="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              <svg v-else-if="s.icon === 'github'" class="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
              </svg>
              <svg v-else-if="s.icon === 'whatsapp'" class="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <svg v-else-if="s.icon === 'youtube'" class="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
              </svg>
            </a>
          </div>
        </div>

        <div>
          <h3 class="text-slate-800 dark:text-white font-semibold mb-4 text-sm uppercase tracking-widest">Navigation</h3>
          <ul class="space-y-2">
            <li v-for="link in navLinks" :key="link.key">
              <NuxtLink
                :to="localePath(link.to)"
                class="text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm transition-colors duration-200"
              >
                {{ t(`nav.${link.key}`) }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="text-slate-800 dark:text-white font-semibold mb-4 text-sm uppercase tracking-widest">Quick Contact</h3>
          <ul class="space-y-3 text-sm text-slate-500 dark:text-slate-400">
            <li class="flex items-center gap-2">
              <svg class="w-4 h-4 text-primary-400 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
              </svg>
              <a href="mailto:Azzamazezali@gmail.com" class="hover:text-primary-400 transition-colors">Azzamazezali@gmail.com</a>
            </li>
            <li class="flex items-center gap-2">
              <svg class="w-4 h-4 text-primary-400 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
              </svg>
              <span>Tartus, Syria (Remote)</span>
            </li>
            <li class="mt-4">
              <span class="inline-flex items-center gap-2 badge-green badge text-xs">
                <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Available for new projects
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div class="border-t border-slate-200 dark:border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <p>© {{ currentYear }} Azzam Aziz Ali. {{ t('footer.rights') }}</p>
        <div class="flex items-center gap-4">
          <NuxtLink
            :to="localePath('/privacy-policy')"
            class="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            {{ t('gdpr.learnMore') }}
          </NuxtLink>
          <p>{{ t('footer.madeWith') }}</p>
        </div>
      </div>
    </div>
  </footer>
</template>
