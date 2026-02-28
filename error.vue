<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

defineProps<{
  error: {
    statusCode: number
    statusMessage: string
  }
}>()

const handleError = () => clearError({ redirect: localePath('/') })
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950">
    <div class="text-center px-6">
      <p class="text-8xl font-extrabold gradient-text mb-4">{{ error.statusCode }}</p>
      <h1 class="text-3xl font-bold text-slate-900 dark:text-white mb-3">
        {{ error.statusCode === 404 ? 'Page Not Found' : 'Something Went Wrong' }}
      </h1>
      <p class="text-slate-500 dark:text-slate-400 mb-8 max-w-md mx-auto">
        {{ error.statusCode === 404
          ? 'The page you are looking for does not exist or has been moved.'
          : error.statusMessage }}
      </p>
      <button class="btn-primary" @click="handleError">
        Back to Home
      </button>
    </div>
  </div>
</template>
