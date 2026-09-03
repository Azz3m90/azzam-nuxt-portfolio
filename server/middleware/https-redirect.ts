/**
 * Force HTTPS when the app sits behind a reverse proxy (cPanel / Cloudflare / nginx)
 * that forwards the original scheme via X-Forwarded-Proto.
 * Fixes crawl issues: HTTP→HTTPS canonicals and HTTP pages linking to HTTPS.
 */
export default defineEventHandler((event) => {
  const proto = getRequestHeader(event, 'x-forwarded-proto')
  if (proto !== 'http') return

  const host = getRequestHeader(event, 'host')
  if (!host || host.includes('localhost') || host.startsWith('127.')) return

  const url = getRequestURL(event)
  return sendRedirect(event, `https://${host}${url.pathname}${url.search}`, 301)
})
