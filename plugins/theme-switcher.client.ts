export default defineNuxtPlugin(() => {
  if (process.server) return
  
  const colorMode = useColorMode()
  
  const syncTheme = () => {
    const html = document.documentElement
    const currentMode = colorMode.value
    
    html.classList.remove('light', 'dark')
    html.classList.add(currentMode)
  }
  
  watch(() => colorMode.value, syncTheme, { immediate: true })
})
