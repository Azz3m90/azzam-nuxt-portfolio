export type ConsentStatus = 'accepted' | 'declined' | null

const CONSENT_KEY = 'cookie-consent'

export function useGdpr() {
  const consent = useState<ConsentStatus>('gdpr-consent', () => null)

  function initConsent() {
    if (import.meta.client) {
      const stored = localStorage.getItem(CONSENT_KEY) as ConsentStatus
      consent.value = stored
    }
  }

  function acceptConsent() {
    consent.value = 'accepted'
    if (import.meta.client) {
      localStorage.setItem(CONSENT_KEY, 'accepted')
      if (typeof window.gtag === 'function') {
        window.gtag('consent', 'update', {
          analytics_storage: 'granted',
          ad_storage: 'denied',
        })
      }
    }
  }

  function declineConsent() {
    consent.value = 'declined'
    if (import.meta.client) {
      localStorage.setItem(CONSENT_KEY, 'declined')
      if (typeof window.gtag === 'function') {
        window.gtag('consent', 'update', {
          analytics_storage: 'denied',
          ad_storage: 'denied',
        })
      }
    }
  }

  const showBanner = computed(() => consent.value === null)

  return {
    consent,
    initConsent,
    acceptConsent,
    declineConsent,
    showBanner,
  }
}
