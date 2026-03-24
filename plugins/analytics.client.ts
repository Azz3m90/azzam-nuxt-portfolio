export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const gaId = config.public.gaId as string

  if (!gaId) return

  window.dataLayer = window.dataLayer || []

  function gtag(...args: unknown[]) {
    window.dataLayer.push(args)
  }

  window.gtag = gtag

  gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    wait_for_update: 500,
  })

  gtag('js', new Date())
  gtag('config', gaId, {
    anonymize_ip: true,
    cookie_flags: 'SameSite=None;Secure',
    send_page_view: false,
  })

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`
  document.head.insertBefore(script, document.head.firstChild)

  const stored = localStorage.getItem('cookie-consent')
  if (stored === 'accepted') {
    gtag('consent', 'update', {
      analytics_storage: 'granted',
      ad_storage: 'denied',
    })
  }

  const router = useRouter()
  router.afterEach((to) => {
    const consentState = localStorage.getItem('cookie-consent')
    if (consentState === 'accepted') {
      gtag('event', 'page_view', {
        page_path: to.fullPath,
        page_title: document.title,
      })
    }
  })
})
