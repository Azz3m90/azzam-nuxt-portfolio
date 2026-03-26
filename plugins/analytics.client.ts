export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const gaId = config.public.gaId as string

  if (!gaId) return

  window.dataLayer = window.dataLayer || []

  // Must use `arguments` object — gtag internals depend on it, not a plain array
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments)
  }

  window.gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    wait_for_update: 500,
  })

  window.gtag('js', new Date())
  window.gtag('config', gaId, {
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
    window.gtag('consent', 'update', {
      analytics_storage: 'granted',
      ad_storage: 'denied',
    })
    window.gtag('event', 'page_view', {
      page_path: window.location.pathname + window.location.search,
      page_title: document.title,
    })
  }

  const router = useRouter()
  router.afterEach((to) => {
    if (localStorage.getItem('cookie-consent') === 'accepted') {
      window.gtag('event', 'page_view', {
        page_path: to.fullPath,
        page_title: document.title,
      })
    }
  })
})
