declare global {
  interface Window {
    __themeToggleReady__: boolean
  }
}

export default defineNuxtPlugin(() => {
  if (process.server || typeof window === 'undefined') return
  
  if (window.__themeToggleReady__) return
  window.__themeToggleReady__ = true

  const toggleTheme = (e: Event) => {
    e.preventDefault()
    e.stopPropagation()
    
    try {
      const html = document.documentElement
      const isDarkNow = html.classList.contains('dark')
      const newMode = isDarkNow ? 'light' : 'dark'
      
      html.classList.remove('light', 'dark')
      html.classList.add(newMode)
      
      localStorage.setItem('nuxt-color-mode', newMode)
    } catch (err) {
      console.error('Toggle theme error:', err)
    }
  }

  const attachListeners = () => {
    try {
      const header = document.querySelector('header')
      if (!header) {
        setTimeout(attachListeners, 100)
        return
      }
      
      const buttons = header.querySelectorAll('button')
      buttons.forEach((btn) => {
        const ariaLabel = btn.getAttribute('aria-label')
        if (ariaLabel && (ariaLabel.includes('light') || ariaLabel.includes('dark'))) {
          btn.addEventListener('click', toggleTheme)
        }
      })
    } catch (err) {
      console.error('Attach listeners error:', err)
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', attachListeners)
  } else {
    attachListeners()
  }
  
  setTimeout(attachListeners, 500)
})
