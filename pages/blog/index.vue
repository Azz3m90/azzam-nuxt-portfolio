<script setup lang="ts">
const { t } = useI18n()

const config = useRuntimeConfig()
const siteUrl = config.public.siteUrl as string

useSeo({
  title: t('meta.blog.title'),
  description: t('meta.blog.description'),
  image: `${siteUrl}/images/og-blog.jpg`,
  imageAlt: 'Blog — Full Stack Dev & SEO Insights by Azzam Aziz Ali',
  breadcrumb: [{ name: 'Blog', url: `${siteUrl}/blog` }],
})

const { data: posts } = await useAsyncData('blog', () =>
  queryCollection('blog').order('date', 'DESC').all(),
)
</script>

<template>
  <div class="py-20">
    <div class="container-custom">
      <div class="text-center mb-14">
        <p class="section-label justify-center">{{ t('blog.subtitle') }}</p>
        <h1 class="text-5xl font-extrabold text-slate-900 dark:text-white mb-4">
          {{ t('blog.title') }}
        </h1>
        <p class="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
          {{ t('blog.description') }}
        </p>
      </div>

      <div v-if="posts && posts.length > 0" class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <NuxtLink
          v-for="post in posts"
          :key="post.path"
          :to="post.path"
          class="card card-hover overflow-hidden group"
        >
          <div v-if="post.image" class="h-48 overflow-hidden">
            <NuxtImg :src="post.image" :alt="post.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" width="600" height="400" loading="lazy"/>
          </div>
          <div v-else class="h-48 bg-gradient-to-br from-primary-100 to-accent/10 dark:from-primary-900/30 dark:to-accent/10 flex items-center justify-center">
            <span class="text-5xl">✍️</span>
          </div>
          <div class="p-6">
            <div class="flex flex-wrap gap-2 mb-3">
              <span v-for="tag in (post.tags || []).slice(0, 3)" :key="tag" class="badge text-xs">{{ tag }}</span>
            </div>
            <h2 class="font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
              {{ post.title }}
            </h2>
            <p class="text-sm text-slate-500 dark:text-slate-400 mb-4 line-clamp-2">{{ post.description }}</p>
            <div class="flex items-center justify-between text-xs text-slate-400">
              <span>{{ post.date }}</span>
              <span v-if="post.readTime">{{ post.readTime }} {{ t('blog.minuteRead') }}</span>
            </div>
          </div>
        </NuxtLink>
      </div>

      <div v-else class="text-center py-24">
        <div class="text-6xl mb-6">✍️</div>
        <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-3">{{ t('blog.noPosts') }}</h2>
        <p class="text-slate-500 dark:text-slate-400 mb-8">Topics coming up: Laravel best practices, Vue 3 patterns, SEO for SaaS, and more.</p>
        <div class="flex flex-wrap gap-3 justify-center">
          <span v-for="topic in ['Laravel', 'Vue 3', 'Technical SEO', 'SaaS Development', 'Core Web Vitals', 'React Patterns']" :key="topic" class="badge">{{ topic }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
