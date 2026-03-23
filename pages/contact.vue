<script setup lang="ts">
import emailjs from '@emailjs/browser'
const { t } = useI18n()

useSeo({
  title: t('meta.contact.title'),
  description: t('meta.contact.description'),
})

const form = reactive({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
})

const status = ref<'idle' | 'sending' | 'success' | 'error'>('idle')

const handleSubmit = async () => {
  status.value = 'sending'
  try {
    const templateParams = {
      from_name: form.name,
      from_email: form.email,
      phone: form.phone,
      subject: form.subject,
      message: form.message,
      reply_to: form.email,
    }
    await emailjs.send('service_ujqbs18', 'template_t6b94oj', templateParams, 'XIjkv4D3fR2kaOGbt')
    await emailjs.send('service_ujqbs18', 'template_980cf6f', templateParams, 'XIjkv4D3fR2kaOGbt')
    status.value = 'success'
    Object.assign(form, { name: '', email: '', phone: '', subject: '', message: '' })
  } catch {
    status.value = 'error'
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
                  <svg class="w-4 h-4 text-primary-600 dark:text-primary-400" fill="currentColor" viewBox="0 0 20 20">
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
                  <svg class="w-4 h-4 text-emerald-600 dark:text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
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
                  <svg class="w-4 h-4 text-slate-600 dark:text-slate-400" fill="currentColor" viewBox="0 0 20 20">
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
              <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
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
              >
                {{ social.name }}
              </a>
            </div>
          </div>
        </div>

        <div class="lg:col-span-3">
          <div class="card p-8">
            <h2 class="text-xl font-bold text-slate-900 dark:text-white mb-6">Send a Message</h2>

            <Transition name="fade">
              <div v-if="status === 'success'" class="bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 p-4 rounded-xl mb-6 flex items-center gap-3">
                <svg class="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                {{ t('contact.form.success') }}
              </div>
              <div v-else-if="status === 'error'" class="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 p-4 rounded-xl mb-6 flex items-center gap-3">
                <svg class="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
                </svg>
                {{ t('contact.form.error') }}
              </div>
            </Transition>

            <form class="space-y-5" @submit.prevent="handleSubmit">
              <div class="grid sm:grid-cols-2 gap-5">
                <div>
                  <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">{{ t('contact.form.name') }} *</label>
                  <input
                    v-model="form.name"
                    type="text"
                    required
                    :placeholder="t('contact.form.name')"
                    class="input-field"
                  >
                </div>
                <div>
                  <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">{{ t('contact.form.email') }} *</label>
                  <input
                    v-model="form.email"
                    type="email"
                    required
                    :placeholder="t('contact.form.email')"
                    class="input-field"
                  >
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">{{ t('contact.form.phone') }}</label>
                <input
                  v-model="form.phone"
                  type="tel"
                  :placeholder="t('contact.form.phonePlaceholder')"
                  class="input-field"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">{{ t('contact.form.subject') }}</label>
                <input
                  v-model="form.subject"
                  type="text"
                  :placeholder="t('contact.form.subject')"
                  class="input-field"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">{{ t('contact.form.message') }} *</label>
                <textarea
                  v-model="form.message"
                  required
                  rows="6"
                  :placeholder="t('contact.form.message')"
                  class="input-field resize-none"
                ></textarea>
              </div>
              <button
                type="submit"
                :disabled="status === 'sending'"
                class="btn-primary w-full justify-center text-base py-3.5 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <svg v-if="status === 'sending'" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
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

<style scoped>
.fade-enter-active, .fade-leave-active { transition: all 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: translateY(-8px); }
</style>
