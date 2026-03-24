<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()

useHead({
  title: t('privacyPolicy.metaTitle'),
  meta: [
    { name: 'description', content: t('privacyPolicy.metaDescription') },
    { name: 'robots', content: 'noindex, follow' },
  ],
})

const lastUpdated = '2025-01-01'
</script>

<template>
  <div class="container-custom py-16 sm:py-24 max-w-3xl mx-auto">
    <div class="mb-10">
      <NuxtLink
        :to="localePath('/')"
        class="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors mb-6"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        {{ t('privacyPolicy.backHome') }}
      </NuxtLink>
      <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-3">
        {{ t('privacyPolicy.title') }}
      </h1>
      <p class="text-slate-500 dark:text-slate-400 text-sm">{{ t('privacyPolicy.lastUpdated') }}: {{ lastUpdated }}</p>
    </div>

    <div
      :dir="locale === 'ar' ? 'rtl' : 'ltr'"
      class="prose prose-slate dark:prose-invert max-w-none prose-headings:font-bold prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-3 prose-p:text-slate-600 dark:prose-p:text-slate-300 prose-li:text-slate-600 dark:prose-li:text-slate-300 prose-a:text-primary-600 dark:prose-a:text-primary-400"
    >
      <p>{{ t('privacyPolicy.intro') }}</p>

      <h2>{{ t('privacyPolicy.controllerTitle') }}</h2>
      <p>{{ t('privacyPolicy.controllerText') }}</p>
      <ul>
        <li><strong>{{ t('privacyPolicy.name') }}:</strong> Azzam Aziz Ali</li>
        <li><strong>{{ t('privacyPolicy.website') }}:</strong> <a href="https://azzamazizali.sy" target="_blank" rel="noopener">azzamazizali.sy</a></li>
        <li><strong>Email:</strong> <a href="mailto:azzam@azzamazizali.com">azzam@azzamazizali.com</a></li>
      </ul>

      <h2>{{ t('privacyPolicy.dataCollectedTitle') }}</h2>
      <p>{{ t('privacyPolicy.dataCollectedText') }}</p>
      <ul>
        <li>{{ t('privacyPolicy.dataItem1') }}</li>
        <li>{{ t('privacyPolicy.dataItem2') }}</li>
        <li>{{ t('privacyPolicy.dataItem3') }}</li>
        <li>{{ t('privacyPolicy.dataItem4') }}</li>
      </ul>
      <p>{{ t('privacyPolicy.dataContactForm') }}</p>

      <h2>{{ t('privacyPolicy.purposeTitle') }}</h2>
      <ul>
        <li>{{ t('privacyPolicy.purpose1') }}</li>
        <li>{{ t('privacyPolicy.purpose2') }}</li>
        <li>{{ t('privacyPolicy.purpose3') }}</li>
      </ul>

      <h2>{{ t('privacyPolicy.legalBasisTitle') }}</h2>
      <p>{{ t('privacyPolicy.legalBasisText') }}</p>
      <ul>
        <li><strong>{{ t('privacyPolicy.legalBasisConsent') }}:</strong> {{ t('privacyPolicy.legalBasisConsentDesc') }}</li>
        <li><strong>{{ t('privacyPolicy.legalBasisLegitimate') }}:</strong> {{ t('privacyPolicy.legalBasisLegitimateDesc') }}</li>
      </ul>

      <h2>{{ t('privacyPolicy.cookiesTitle') }}</h2>
      <p>{{ t('privacyPolicy.cookiesText') }}</p>
      <table class="text-sm w-full border-collapse">
        <thead>
          <tr class="border-b border-slate-200 dark:border-slate-700">
            <th class="text-start py-2 pe-4 font-semibold">{{ t('privacyPolicy.cookieName') }}</th>
            <th class="text-start py-2 pe-4 font-semibold">{{ t('privacyPolicy.cookieProvider') }}</th>
            <th class="text-start py-2 font-semibold">{{ t('privacyPolicy.cookiePurpose') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b border-slate-100 dark:border-slate-800">
            <td class="py-2 pe-4 font-mono text-xs">_ga, _ga_*</td>
            <td class="py-2 pe-4">Google Analytics</td>
            <td class="py-2">{{ t('privacyPolicy.cookieGaPurpose') }}</td>
          </tr>
          <tr class="border-b border-slate-100 dark:border-slate-800">
            <td class="py-2 pe-4 font-mono text-xs">cookie-consent</td>
            <td class="py-2 pe-4">azzamazizali.sy</td>
            <td class="py-2">{{ t('privacyPolicy.cookieConsentPurpose') }}</td>
          </tr>
          <tr>
            <td class="py-2 pe-4 font-mono text-xs">nuxt-color-mode</td>
            <td class="py-2 pe-4">azzamazizali.sy</td>
            <td class="py-2">{{ t('privacyPolicy.cookieThemePurpose') }}</td>
          </tr>
        </tbody>
      </table>

      <h2>{{ t('privacyPolicy.thirdPartyTitle') }}</h2>
      <p>{{ t('privacyPolicy.thirdPartyText') }}</p>
      <ul>
        <li>
          <strong>Google Analytics 4</strong> — {{ t('privacyPolicy.gaDesc') }}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">{{ t('privacyPolicy.googlePrivacy') }}</a>.
          <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">{{ t('privacyPolicy.gaOptOut') }}</a>.
        </li>
        <li>
          <strong>Netlify</strong> — {{ t('privacyPolicy.netlifyDesc') }}
          <a href="https://www.netlify.com/privacy/" target="_blank" rel="noopener noreferrer">{{ t('privacyPolicy.netlifyPrivacy') }}</a>.
        </li>
      </ul>

      <h2>{{ t('privacyPolicy.retentionTitle') }}</h2>
      <p>{{ t('privacyPolicy.retentionText') }}</p>

      <h2>{{ t('privacyPolicy.rightsTitle') }}</h2>
      <p>{{ t('privacyPolicy.rightsIntro') }}</p>
      <ul>
        <li><strong>{{ t('privacyPolicy.rightAccess') }}</strong></li>
        <li><strong>{{ t('privacyPolicy.rightRectification') }}</strong></li>
        <li><strong>{{ t('privacyPolicy.rightErasure') }}</strong></li>
        <li><strong>{{ t('privacyPolicy.rightRestriction') }}</strong></li>
        <li><strong>{{ t('privacyPolicy.rightPortability') }}</strong></li>
        <li><strong>{{ t('privacyPolicy.rightObject') }}</strong></li>
        <li><strong>{{ t('privacyPolicy.rightWithdraw') }}</strong></li>
      </ul>
      <p>{{ t('privacyPolicy.rightsContact') }} <a href="mailto:azzam@azzamazizali.com">azzam@azzamazizali.com</a>.</p>

      <h2>{{ t('privacyPolicy.consentManageTitle') }}</h2>
      <p>{{ t('privacyPolicy.consentManageText') }}</p>

      <h2>{{ t('privacyPolicy.childrenTitle') }}</h2>
      <p>{{ t('privacyPolicy.childrenText') }}</p>

      <h2>{{ t('privacyPolicy.changesTitle') }}</h2>
      <p>{{ t('privacyPolicy.changesText') }}</p>

      <h2>{{ t('privacyPolicy.contactTitle') }}</h2>
      <p>{{ t('privacyPolicy.contactText') }} <a href="mailto:azzam@azzamazizali.com">azzam@azzamazizali.com</a>.</p>
    </div>
  </div>
</template>
