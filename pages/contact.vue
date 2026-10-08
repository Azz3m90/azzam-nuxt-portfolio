<script setup lang="ts">
const { t } = useI18n()
const { success: toastSuccess, error: toastError } = useToast()
const config = useRuntimeConfig()
useSeo({
  title: t('meta.contact.title'),
  description: t('meta.contact.description'),
  image: 'https://azzamazizali.sy/images/Azzam.jpg',
  imageAlt: t('meta.contact.title'),
  breadcrumb: [{ name: t('nav.contact'), url: 'https://azzamazizali.sy/contact' }],
})

useHead({
  script: [
    {
      src: 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit&onload=onTurnstileLoad',
      async: true,
      defer: true,
    },
  ],
})

declare const turnstile: {
  render: (el: HTMLElement, options: Record<string, unknown>) => string
  reset: (id: string) => void
}

const form = reactive({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
})

const touched = reactive({
  name: false,
  email: false,
  message: false,
})

const errors = computed(() => ({
  name: touched.name && !form.name.trim() ? 'Name is required' : '',
  email: touched.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())
    ? form.email ? 'Enter a valid email address' : 'Email is required'
    : '',
  message: touched.message && !form.message.trim() ? 'Message is required' : '',
}))

const isValid = computed(() =>
  form.name.trim() &&
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()) &&
  form.message.trim(),
)

const status = ref<'idle' | 'sending' | 'success' | 'error'>('idle')
const captchaError = ref(false)
const attachmentError = ref('')
const files = ref<File[]>([])
const fileInput = ref<HTMLInputElement | null>(null)
const turnstileWidgetId = ref<string | null>(null)
const turnstileContainer = ref<HTMLElement | null>(null)

const MAX_FILES = 5
const MAX_FILE_BYTES = 5 * 1024 * 1024
const ALLOWED_EXT = /\.(pdf|doc|docx|txt|zip|jpe?g|png|webp|gif)$/i

const formatSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

const onFilesSelected = (event: Event) => {
  const input = event.target as HTMLInputElement
  const selected = Array.from(input.files || [])
  attachmentError.value = ''

  const next = [...files.value]
  for (const file of selected) {
    if (next.length >= MAX_FILES) {
      attachmentError.value = t('contact.form.attachmentsMax')
      break
    }
    if (!ALLOWED_EXT.test(file.name) || file.size > MAX_FILE_BYTES) {
      attachmentError.value = t('contact.form.attachmentsInvalid')
      continue
    }
    if (next.some(f => f.name === file.name && f.size === file.size)) continue
    next.push(file)
  }

  files.value = next
  if (input) input.value = ''
}

const removeFile = (index: number) => {
  files.value = files.value.filter((_, i) => i !== index)
  attachmentError.value = ''
}

const getTurnstileTheme = () =>
  document.documentElement.classList.contains('dark') ? 'dark' : 'light'

const renderTurnstile = () => {
  if (!turnstileContainer.value || typeof turnstile === 'undefined') return
  if (turnstileWidgetId.value) return
  turnstileWidgetId.value = turnstile.render(turnstileContainer.value, {
    sitekey: config.public.turnstileSiteKey,
    theme: getTurnstileTheme(),
    'error-callback': () => { captchaError.value = true },
    'expired-callback': () => { captchaError.value = true },
  })
}

onMounted(() => {
  (window as unknown as Record<string, unknown>).onTurnstileLoad = renderTurnstile
  if (typeof turnstile !== 'undefined') renderTurnstile()
})

const getTurnstileToken = (): string => {
  const input = document.querySelector<HTMLInputElement>('[name="cf-turnstile-response"]')
  return input?.value ?? ''
}

const handleSubmit = async () => {
  touched.name = true
  touched.email = true
  touched.message = true

  if (!isValid.value) return

  const token = getTurnstileToken()
  if (!token) {
    captchaError.value = true
    return
  }
  captchaError.value = false
  attachmentError.value = ''
  status.value = 'sending'

  try {
    const payload = new FormData()
    payload.append('name', form.name)
    payload.append('email', form.email)
    payload.append('phone', form.phone || 'Not provided')
    payload.append('subject', form.subject || 'No subject')
    payload.append('message', form.message)
    payload.append('turnstileToken', token)
    for (const file of files.value) {
      payload.append('attachments', file, file.name)
    }

    await $fetch('/api/contact', {
      method: 'POST',
      body: payload,
    })

    status.value = 'success'
    toastSuccess(t('contact.form.success'))
    Object.assign(form, { name: '', email: '', phone: '', subject: '', message: '' })
    Object.assign(touched, { name: false, email: false, message: false })
    files.value = []
    if (fileInput.value) fileInput.value.value = ''
    if (turnstileWidgetId.value) turnstile.reset(turnstileWidgetId.value)
  } catch {
    status.value = 'error'
    toastError(t('contact.form.error'))
    if (turnstileWidgetId.value) turnstile.reset(turnstileWidgetId.value)
  }
}

const socials = [
  {
    name: 'GitHub',
    url: 'https://github.com/Azz3m90',
    color: 'text-slate-800 dark:text-white',
    path: 'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12',
  },
  {
    name: 'WhatsApp',
    url: 'https://wa.me/+963983847632',
    color: 'text-emerald-600',
    path: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z',
  },
  {
    name: 'YouTube',
    url: 'https://www.youtube.com/@azzamazizali',
    color: 'text-red-600',
    path: 'M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z',
  },
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/share/1DRNUw1GMQ/',
    color: 'text-blue-700',
    path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
  },
  {
    name: 'Stack Overflow',
    url: 'https://stackoverflow.com/users/10049474/azzam-ali',
    color: 'text-orange-500',
    path: 'M15.725 0l-1.72 1.277 6.39 8.588 1.716-1.277L15.725 0zm-3.94 3.418l-1.369 1.644 8.225 6.85 1.369-1.644-8.225-6.85zm-3.15 4.465l-.905 1.94 9.702 4.517.904-1.94-9.701-4.517zm-1.85 4.86l-.44 2.093 10.473 2.201.44-2.092-10.473-2.203zM1.89 15.47V24h19.19v-8.53h-2.133v6.397H4.021v-6.396H1.89zm4.265 2.133v2.13h10.66v-2.13H6.154z',
  },
]
</script>

<template>
  <div class="py-12 sm:py-16 lg:py-20">
    <div class="container-custom">
      <div class="text-center mb-14">
        <p class="section-label justify-center">{{ t('contact.subtitle') }}</p>
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">
          {{ t('contact.title') }}
        </h1>
        <p class="text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          {{ t('contact.description') }}
        </p>
      </div>

      <div class="grid lg:grid-cols-5 gap-12 max-w-5xl mx-auto">
        <div class="lg:col-span-2 space-y-6">
          <div class="card p-6">
            <h2 class="font-bold text-slate-900 dark:text-white mb-5">{{ t('contact.info.title') }}</h2>
            <ul class="space-y-4">
              <li class="flex items-start gap-3">
                <div class="w-8 h-8 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center shrink-0">
                  <svg class="w-4 h-4 text-primary-600 dark:text-primary-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                  </svg>
                </div>
                <div>
                  <p class="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wide mb-0.5">Email</p>
                  <a href="mailto:projects@azzamazizali.sy" class="text-slate-800 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors text-sm font-medium">
                    projects@azzamazizali.sy
                  </a>
                </div>
              </li>
              <li class="flex items-start gap-3">
                <div class="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center shrink-0">
                  <svg class="w-4 h-4 text-emerald-600 dark:text-emerald-400" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <div>
                  <p class="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wide mb-0.5">WhatsApp</p>
                  <a href="https://wa.me/+963983847632" target="_blank" rel="noopener noreferrer" dir="ltr" class="text-slate-800 dark:text-white hover:text-emerald-600 transition-colors text-sm font-medium inline-block">
                    +963 983 847 632
                  </a>
                </div>
              </li>
              <li class="flex items-start gap-3">
                <div class="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                  <svg class="w-4 h-4 text-slate-600 dark:text-slate-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <div>
                  <p class="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wide mb-0.5">Location</p>
                  <p class="text-slate-800 dark:text-white text-sm font-medium">Tartus, Syria (Remote-first)</p>
                </div>
              </li>
            </ul>
          </div>

          <div class="card p-6">
            <div class="flex items-center gap-2 mb-4">
              <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true"></span>
              <p class="text-sm font-semibold text-slate-900 dark:text-white">{{ t('contact.info.available') }}</p>
            </div>
            <p class="text-xs text-slate-500 dark:text-slate-400">{{ t('contact.info.response') }}</p>
          </div>

          <div class="card p-6">
            <h3 class="font-bold text-slate-900 dark:text-white mb-4 text-sm">{{ t('contact.info.social') }}</h3>
            <div class="flex flex-wrap gap-2">
              <a
                v-for="social in socials"
                :key="social.name"
                :href="social.url"
                target="_blank"
                rel="noopener noreferrer"
                :class="['w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center transition-colors', social.color]"
                :aria-label="`${social.name} profile`"
                :title="social.name"
              >
                <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path :d="social.path" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div class="lg:col-span-3">
          <div class="card p-8">
            <h2 class="text-xl font-bold text-slate-900 dark:text-white mb-6">{{ t('contact.form.sendTitle') }}</h2>

            <form novalidate class="space-y-5" @submit.prevent="handleSubmit" aria-label="Contact form">
              <div class="grid sm:grid-cols-2 gap-5">
                <div>
                  <label for="contact-name" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                    {{ t('contact.form.name') }} <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="contact-name"
                    v-model="form.name"
                    type="text"
                    autocomplete="name"
                    required
                    :aria-invalid="!!errors.name"
                    :aria-describedby="errors.name ? 'error-name' : undefined"
                    :placeholder="t('contact.form.name')"
                    :class="['input-field', errors.name ? 'border-red-400 dark:border-red-500 focus:ring-red-400' : '']"
                    @blur="touched.name = true"
                  >
                  <p v-if="errors.name" id="error-name" role="alert" class="mt-1.5 text-xs text-red-500 dark:text-red-400">
                    {{ errors.name }}
                  </p>
                </div>
                <div>
                  <label for="contact-email" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                    {{ t('contact.form.email') }} <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="contact-email"
                    v-model="form.email"
                    type="email"
                    autocomplete="email"
                    required
                    :aria-invalid="!!errors.email"
                    :aria-describedby="errors.email ? 'error-email' : undefined"
                    :placeholder="t('contact.form.email')"
                    :class="['input-field', errors.email ? 'border-red-400 dark:border-red-500 focus:ring-red-400' : '']"
                    @blur="touched.email = true"
                  >
                  <p v-if="errors.email" id="error-email" role="alert" class="mt-1.5 text-xs text-red-500 dark:text-red-400">
                    {{ errors.email }}
                  </p>
                </div>
              </div>

              <div>
                <label for="contact-phone" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  {{ t('contact.form.phone') }}
                </label>
                <input
                  id="contact-phone"
                  v-model="form.phone"
                  type="tel"
                  autocomplete="tel"
                  :placeholder="t('contact.form.phonePlaceholder')"
                  class="input-field"
                >
              </div>

              <div>
                <label for="contact-subject" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  {{ t('contact.form.subject') }}
                </label>
                <input
                  id="contact-subject"
                  v-model="form.subject"
                  type="text"
                  :placeholder="t('contact.form.subject')"
                  class="input-field"
                >
              </div>

              <div>
                <label for="contact-message" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  {{ t('contact.form.message') }} <span aria-hidden="true">*</span>
                </label>
                <textarea
                  id="contact-message"
                  v-model="form.message"
                  required
                  rows="6"
                  :aria-invalid="!!errors.message"
                  :aria-describedby="errors.message ? 'error-message' : undefined"
                  :placeholder="t('contact.form.message')"
                  :class="['input-field resize-none', errors.message ? 'border-red-400 dark:border-red-500 focus:ring-red-400' : '']"
                  @blur="touched.message = true"
                ></textarea>
                <p v-if="errors.message" id="error-message" role="alert" class="mt-1.5 text-xs text-red-500 dark:text-red-400">
                  {{ errors.message }}
                </p>
              </div>

              <div>
                <label for="contact-attachments" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  {{ t('contact.form.attachments') }}
                </label>
                <input
                  id="contact-attachments"
                  ref="fileInput"
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.txt,.zip,.jpg,.jpeg,.png,.webp,.gif"
                  class="block w-full text-sm text-slate-600 dark:text-slate-300 file:mr-4 file:rounded-lg file:border-0 file:bg-primary-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-primary-500"
                  @change="onFilesSelected"
                >
                <p class="mt-1.5 text-xs text-slate-500 dark:text-slate-400">
                  {{ t('contact.form.attachmentsHint') }}
                </p>
                <ul v-if="files.length" class="mt-3 space-y-2">
                  <li
                    v-for="(file, index) in files"
                    :key="`${file.name}-${file.size}-${index}`"
                    class="flex items-center justify-between gap-3 rounded-lg border border-slate-200 dark:border-slate-700 px-3 py-2 text-sm"
                  >
                    <span class="truncate text-slate-700 dark:text-slate-200">
                      {{ file.name }}
                      <span class="text-slate-400">({{ formatSize(file.size) }})</span>
                    </span>
                    <button
                      type="button"
                      class="shrink-0 text-red-500 hover:text-red-400 text-xs font-semibold"
                      @click="removeFile(index)"
                    >
                      {{ t('contact.form.attachmentsRemove') }}
                    </button>
                  </li>
                </ul>
                <p v-if="attachmentError" role="alert" class="mt-1.5 text-xs text-red-500 dark:text-red-400">
                  {{ attachmentError }}
                </p>
              </div>

              <div>
                <div ref="turnstileContainer" aria-label="Security verification"></div>
                <p v-if="captchaError" role="alert" class="mt-2 text-sm text-red-500 dark:text-red-400">
                  Please complete the captcha verification before sending.
                </p>
              </div>

              <button
                type="submit"
                :disabled="status === 'sending'"
                :aria-busy="status === 'sending'"
                class="btn-primary w-full justify-center text-base py-3.5 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <svg v-if="status === 'sending'" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
                {{ status === 'sending' ? t('contact.form.sending') : t('contact.form.submit') }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


