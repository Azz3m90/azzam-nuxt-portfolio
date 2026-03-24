export const handler = async (event) => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'https://azzamazizali.sy',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' }
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ message: 'Method Not Allowed' }) }
  }

  let body
  try {
    body = JSON.parse(event.body || '{}')
  } catch {
    return { statusCode: 400, headers, body: JSON.stringify({ message: 'Invalid JSON' }) }
  }

  const { name, email, turnstileToken } = body

  if (!name?.trim() || !email?.trim() || !turnstileToken) {
    return { statusCode: 400, headers, body: JSON.stringify({ message: 'Missing required fields' }) }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email.trim())) {
    return { statusCode: 400, headers, body: JSON.stringify({ message: 'Invalid email address' }) }
  }

  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) {
    return { statusCode: 500, headers, body: JSON.stringify({ message: 'Server misconfiguration' }) }
  }

  const formData = new URLSearchParams()
  formData.append('secret', secret)
  formData.append('response', turnstileToken)
  if (event.headers['x-forwarded-for']) {
    formData.append('remoteip', event.headers['x-forwarded-for'].split(',')[0].trim())
  }

  const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body: formData,
  })

  const verification = await verifyRes.json()

  if (!verification.success) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ message: 'Captcha verification failed', codes: verification['error-codes'] }),
    }
  }

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({ success: true, message: 'Verified successfully' }),
  }
}
