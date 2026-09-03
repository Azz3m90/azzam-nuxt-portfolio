/**
 * Submit changed URLs to IndexNow (Bing, Yandex, Seznam, Naver, etc.).
 * POST JSON: { "urls": ["https://azzamazizali.sy/about", ...] }
 * Optional header: x-indexnow-secret matching INDEXNOW_KEY (or public key).
 */
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const key = (config.indexNowKey || config.public.indexNowKey) as string
  const siteUrl = (config.public.siteUrl as string).replace(/\/$/, '')
  const host = siteUrl.replace(/^https?:\/\//, '')

  const body = await readBody<{ urls?: string[] }>(event).catch(() => ({} as { urls?: string[] }))
  const urls = (body.urls ?? [])
    .map(u => String(u).trim())
    .filter(Boolean)
    .map(u => (u.startsWith('http') ? u.replace(/^http:\/\//i, 'https://') : `${siteUrl}${u.startsWith('/') ? u : `/${u}`}`))
    .filter(u => u.startsWith(`https://${host}`))

  if (!urls.length) {
    throw createError({ statusCode: 400, statusMessage: 'Provide urls: string[] for this host' })
  }

  const payload = {
    host,
    key,
    keyLocation: `https://${host}/${key}.txt`,
    urlList: [...new Set(urls)].slice(0, 10000),
  }

  const res = await $fetch.raw('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: payload,
    ignoreResponseError: true,
  })

  setResponseStatus(event, res.status >= 200 && res.status < 300 ? 200 : res.status)
  return {
    ok: res.status >= 200 && res.status < 300,
    status: res.status,
    submitted: payload.urlList.length,
  }
})
