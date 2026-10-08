import { defineContentConfig, defineCollection, z } from '@nuxt/content'

const blogSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  date: z.string().optional(),
  image: z.string().optional(),
  tags: z.array(z.string()).optional(),
  readTime: z.number().optional(),
})

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: 'page',
      source: 'blog/**/*.md',
      schema: blogSchema,
    }),
    // Arabic translations share slugs with the English posts; the /ar/ prefix comes from i18n routing
    blog_ar: defineCollection({
      type: 'page',
      source: { include: 'ar/blog/**/*.md', prefix: '/blog' },
      schema: blogSchema,
    }),
  },
})
