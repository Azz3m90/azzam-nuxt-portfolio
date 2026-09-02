function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export function buildClientAutoReplyEmail(options: {
  name: string
  subject: string
  siteUrl: string
  attachmentCount: number
}) {
  const name = options.name.trim()
  const subject = options.subject.trim()
  const siteUrl = options.siteUrl.trim().replace(/\/$/, '')
  const { attachmentCount } = options
  const year = new Date().getFullYear()
  const host = siteUrl.replace(/^https?:\/\//, '')

  const receivedNote = attachmentCount > 0
    ? `Your message and ${attachmentCount} attachment${attachmentCount === 1 ? '' : 's'} were received successfully.`
    : 'Your message was received successfully.'

  const text = [
    `Hi ${name},`,
    '',
    'Thank you for contacting Azzam Aziz Ali.',
    '',
    receivedNote,
    'I typically respond within 24 hours on business days.',
    '',
    `Regarding: ${subject}`,
    '',
    'In the meantime, you can explore:',
    `- Portfolio: ${siteUrl}`,
    `- Projects: ${siteUrl}/projects`,
    `- SEO services: ${siteUrl}/seo-services`,
    `- YouTube: https://www.youtube.com/@azzamazizali`,
    '',
    'Best regards,',
    'Eng. Azzam Aziz Ali',
    'Full Stack Developer & SEO Specialist',
    'projects@azzamazizali.sy',
    siteUrl,
  ].join('\n')

  const safeName = escapeHtml(name)
  const safeSubject = escapeHtml(subject)
  const safeSiteUrl = escapeHtml(siteUrl)
  const safeHost = escapeHtml(host)
  const safeReceivedNote = escapeHtml(receivedNote)

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Message received</title>
</head>
<body style="margin:0;padding:0;background-color:#f1f5f9;font-family:Inter,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#0f172a;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#f1f5f9;padding:32px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:600px;background-color:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e2e8f0;">
          <tr>
            <td style="background-color:#1d4ed8;padding:28px 32px;">
              <p style="margin:0;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;color:#bfdbfe;font-weight:600;">Azzam Aziz Ali</p>
              <h1 style="margin:8px 0 0;font-size:24px;line-height:1.3;color:#ffffff;font-weight:700;">Thank you for reaching out</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:32px;">
              <p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:#0f172a;">Hi ${safeName},</p>
              <p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:#334155;">
                Thank you for contacting me. ${safeReceivedNote}
              </p>
              <p style="margin:0 0 24px;font-size:16px;line-height:1.6;color:#334155;">
                I will review your request and reply within <strong style="color:#0f172a;">24 hours</strong> on business days.
              </p>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;margin:0 0 28px;">
                <tr>
                  <td style="padding:16px 18px;">
                    <p style="margin:0 0 6px;font-size:12px;letter-spacing:0.06em;text-transform:uppercase;color:#64748b;font-weight:600;">Your inquiry</p>
                    <p style="margin:0;font-size:15px;line-height:1.5;color:#0f172a;font-weight:600;">${safeSubject}</p>
                  </td>
                </tr>
              </table>

              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 0 28px;">
                <tr>
                  <td align="center" style="border-radius:10px;background-color:#2563eb;">
                    <a href="${safeSiteUrl}" style="display:inline-block;padding:12px 22px;font-size:14px;font-weight:600;color:#ffffff;text-decoration:none;border-radius:10px;">
                      Visit portfolio
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 8px;font-size:14px;line-height:1.6;color:#64748b;">Useful links</p>
              <p style="margin:0;font-size:14px;line-height:1.8;">
                <a href="${safeSiteUrl}/projects" style="color:#2563eb;text-decoration:none;font-weight:600;">Projects</a>
                <span style="color:#cbd5e1;">&nbsp;·&nbsp;</span>
                <a href="${safeSiteUrl}/seo-services" style="color:#2563eb;text-decoration:none;font-weight:600;">SEO services</a>
                <span style="color:#cbd5e1;">&nbsp;·&nbsp;</span>
                <a href="https://www.youtube.com/@azzamazizali" style="color:#2563eb;text-decoration:none;font-weight:600;">YouTube</a>
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:22px 32px;border-top:1px solid #e2e8f0;background-color:#f8fafc;">
              <p style="margin:0 0 4px;font-size:15px;font-weight:700;color:#0f172a;">Eng. Azzam Aziz Ali</p>
              <p style="margin:0 0 12px;font-size:13px;color:#64748b;">Full Stack Developer &amp; SEO Specialist</p>
              <p style="margin:0;font-size:13px;line-height:1.7;color:#64748b;">
                <a href="mailto:projects@azzamazizali.sy" style="color:#2563eb;text-decoration:none;">projects@azzamazizali.sy</a><br>
                <a href="${safeSiteUrl}" style="color:#2563eb;text-decoration:none;">${safeHost}</a>
              </p>
              <p style="margin:16px 0 0;font-size:11px;color:#94a3b8;">
                © ${year} Azzam Aziz Ali. This is an automated confirmation of your contact form submission.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`

  return {
    subject: 'We received your message — Azzam Aziz Ali',
    text,
    html,
  }
}
