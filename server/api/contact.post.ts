export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const config = useRuntimeConfig()

  if (!body.name || !body.email || !body.message) {
    throw createError({ statusCode: 400, message: 'Missing required fields' })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(body.email)) {
    throw createError({ statusCode: 400, message: 'Invalid email address' })
  }

  if (!body.turnstileToken) {
    throw createError({ statusCode: 400, message: 'Captcha token missing' })
  }

  const verification = await $fetch<{ success: boolean; 'error-codes'?: string[] }>(
    'https://challenges.cloudflare.com/turnstile/v0/siteverify',
    {
      method: 'POST',
      body: new URLSearchParams({
        secret: config.turnstileSecret as string,
        response: body.turnstileToken,
      }),
    },
  )

  if (!verification.success) {
    throw createError({ statusCode: 400, message: 'Captcha verification failed' })
  }

  return {
    success: true,
    message: 'Message received. Azzam will reply within 24 hours.',
  }
})
