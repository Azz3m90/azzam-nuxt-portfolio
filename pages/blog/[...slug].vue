<script setup lang="ts">
const { t, locale } = useI18n()
const route = useRoute()
const localePath = useLocalePath()

const slugParam = route.params.slug
const slug = Array.isArray(slugParam) ? slugParam.join('/') : String(slugParam)
const contentPath = `/blog/${slug}`

const isAr = computed(() => locale.value === 'ar')

const { data: post } = await useAsyncData(
  () => `blog-${locale.value}-${slug}`,
  () => isAr.value
    ? queryCollection('blog_ar').path(contentPath).first()
    : queryCollection('blog').path(contentPath).first(),
  { watch: [locale] },
)

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found', fatal: true })
}

const siteBase = computed(() => isAr.value ? 'https://azzamazizali.sy/ar' : 'https://azzamazizali.sy')

const formattedDate = computed(() => {
  if (!post.value?.date) return ''
  return new Date(post.value.date).toLocaleDateString(isAr.value ? 'ar-SY' : 'en-GB', {
    year: 'numeric', month: 'long', day: 'numeric',
  })
})

useSeo({
  title: post.value.title,
  description: post.value.description,
  image: post.value.image ? `https://azzamazizali.sy${post.value.image}` : 'https://azzamazizali.sy/images/Azzam.jpg',
  imageAlt: post.value.title,
  type: 'article',
  breadcrumb: [
    { name: isAr.value ? 'المدونة' : 'Blog', url: `${siteBase.value}/blog` },
    { name: post.value.title, url: `${siteBase.value}${contentPath}` },
  ],
  article: {
    publishedTime: post.value.date,
    modifiedTime: post.value.date,
    tags: post.value.tags,
  },
})
</script>

<template>
  <article v-if="post" class="py-20">
    <div class="container-custom max-w-3xl">
      <div class="mb-6">
        <NuxtLink :to="localePath('/blog')" class="btn-ghost text-sm ps-0">
          <svg class="w-4 h-4 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
          {{ t('blog.title') }}
        </NuxtLink>
      </div>

      <header class="mb-10">
        <div class="flex flex-wrap gap-2 mb-4">
          <span v-for="tag in post.tags || []" :key="tag" class="badge text-xs">{{ tag }}</span>
        </div>
        <h1 class="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4 leading-tight">
          {{ post.title }}
        </h1>
        <p v-if="post.description" class="text-lg text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
          {{ post.description }}
        </p>
        <div class="flex items-center gap-3 text-sm text-slate-400">
          <span>{{ isAr ? 'عزّام عزيز علي' : 'Azzam Aziz Ali' }}</span>
          <span v-if="post.date">·</span>
          <time v-if="post.date" :datetime="post.date">{{ formattedDate }}</time>
          <span v-if="post.readTime">·</span>
          <span v-if="post.readTime">{{ post.readTime }} {{ t('blog.minuteRead') }}</span>
        </div>
      </header>

      <div class="prose prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-24 prose-a:text-primary-600 dark:prose-a:text-primary-400 prose-pre:bg-slate-900 [&_pre]:[direction:ltr] [&_pre]:text-left" :class="{ 'font-arabic prose-lg': isAr }">
        <ContentRenderer :value="post" />
      </div>
    </div>
  </article>
</template>
