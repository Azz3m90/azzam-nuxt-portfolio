<script setup lang="ts">
import emailjs from '@emailjs/browser'

const { t } = useI18n()
const { success: toastSuccess, error: toastError } = useToast()
const config = useRuntimeConfig()
const siteUrl = config.public.siteUrl as string

useSeo({
  title: t('meta.contact.title'),
  description: t('meta.contact.description'),
  image: `${siteUrl}/images/og-contact.jpg`,
  imageAlt: 'Contact Azzam Aziz Ali — Full Stack Developer & SEO Specialist',
  breadcrumb: [{ name: 'Contact', url: `${siteUrl}/contact` }],
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
const turnstileWidgetId = ref<string | null>(null)
const turnstileContainer = ref<HTMLElement | null>(null)

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
  status.value = 'sending'

  try {
    await Promise.all([
      emailjs.send('service_ujqbs18', 'template_t6b94oj', {
        to_email: 'Azzamazezali@gmail.com',
        name: form.name,
        email: form.email,
        phone: form.phone || 'Not provided',
        subject: form.subject || 'No subject',
        message: form.message,
        portfolio_url: 'https://azzamazizali.sy',
        youtube_url: 'https://www.youtube.com/@azzamazizali',
      }, 'XIjkv4D3fR2kaOGbt'),
      emailjs.send('service_ujqbs18', 'template_980cf6f', {
        to_email: form.email,
        name: form.name,
        sender_email: form.email,
        portfolio_url: 'https://azzamazizali.sy',
        youtube_url: 'https://www.youtube.com/@azzamazizali',
      }, 'XIjkv4D3fR2kaOGbt'),
    ])

    status.value = 'success'
    toastSuccess(t('contact.form.success'))
    Object.assign(form, { name: '', email: '', phone: '', subject: '', message: '' })
    Object.assign(touched, { name: false, email: false, message: false })
    if (turnstileWidgetId.value) turnstile.reset(turnstileWidgetId.value)
  } catch {
    status.value = 'error'
    toastError(t('contact.form.error'))
    if (turnstileWidgetId.value) turnstile.reset(turnstileWidgetId.value)
  }
}

const socials = [
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/azzamazizali/', color: 'text-blue-600' },
  { name: 'GitHub', url: 'https://github.com/Azz3m90', color: 'text-slate-800 dark:text-white' },
  { name: 'WhatsApp', url: 'https://wa.me/+963991576641', color: 'text-emerald-600' },
  { name: 'YouTube', url: 'https://www.youtube.com/@azzamazizali', color: 'text-red-600' },
  { name: 'Facebook', url: 'https://www.facebook.com/azzam.ali.9484', color: 'text-blue-700' },
  { name: 'Stack Overflow', url: 'https://stackoverflow.com/users/10049474/azzam-ali', color: 'text-orange-500' },
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
            <h2 class="font-bold text-slate-900 dark:text-white mb-5">Contact Info</h2>
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
                  <a href="mailto:azzam@azzamazizali.com" class="text-slate-800 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors text-sm font-medium">
                    azzam@azzamazizali.com
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
                  <a href="https://wa.me/+963991576641" target="_blank" rel="noopener noreferrer" class="text-slate-800 dark:text-white hover:text-emerald-600 transition-colors text-sm font-medium">
                    +963 991 576 641
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
              <p class="text-sm font-semibold text-slate-900 dark:text-white">Available for new projects</p>
            </div>
            <p class="text-xs text-slate-500 dark:text-slate-400">{{ t('contact.info.response') }}</p>
          </div>

          <div class="card p-6">
            <h3 class="font-bold text-slate-900 dark:text-white mb-4 text-sm">Connect on Social</h3>
            <div class="flex flex-wrap gap-2">
              <a
                v-for="social in socials"
                :key="social.name"
                :href="social.url"
                target="_blank"
                rel="noopener noreferrer"
                :class="['text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors', social.color]"
                :aria-label="`${social.name} profile`"
              >
                {{ social.name }}
              </a>
            </div>
          </div>
        </div>

        <div class="lg:col-span-3">
          <div class="card p-8">
            <h2 class="text-xl font-bold text-slate-900 dark:text-white mb-6">Send a Message</h2>

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


