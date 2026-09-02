import nodemailer from 'nodemailer'

type MailAttachment = {
  filename: string
  content: Buffer
  contentType: string
}

const MAX_FILES = 5
const MAX_FILE_BYTES = 5 * 1024 * 1024
const MAX_TOTAL_BYTES = 15 * 1024 * 1024
const ALLOWED_MIME = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/zip',
  'application/x-zip-compressed',
  'text/plain',
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
])

function sanitizeHeader(value: string): string {
  return value.replace(/[\r\n]+/g, ' ').trim().slice(0, 200)
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function fieldValue(
  parts: { name?: string; data: Buffer; filename?: string; type?: string }[],
  key: string,
): string {
  const part = parts.find(p => p.name === key && !p.filename)
  return part ? part.data.toString('utf8').trim() : ''
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const parts = await readMultipartFormData(event)

  if (!parts?.length) {
    throw createError({ statusCode: 400, message: 'Invalid form data' })
  }

  const nameRaw = fieldValue(parts, 'name')
  const emailRaw = fieldValue(parts, 'email')
  const phoneRaw = fieldValue(parts, 'phone')
  const subjectRaw = fieldValue(parts, 'subject')
  const messageRaw = fieldValue(parts, 'message')
  const turnstileToken = fieldValue(parts, 'turnstileToken')

  if (!nameRaw || !emailRaw || !messageRaw) {
    throw createError({ statusCode: 400, message: 'Missing required fields' })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(emailRaw)) {
    throw createError({ statusCode: 400, message: 'Invalid email address' })
  }

  if (!turnstileToken) {
    throw createError({ statusCode: 400, message: 'Captcha token missing' })
  }

  if (!config.smtpHost || !config.smtpUser || !config.smtpPass) {
    throw createError({ statusCode: 500, message: 'Email service is not configured' })
  }

  if (config.turnstileSecret) {
    const verification = await $fetch<{ success: boolean; 'error-codes'?: string[] }>(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        body: new URLSearchParams({
          secret: config.turnstileSecret as string,
          response: turnstileToken,
        }),
      },
    )

    if (!verification.success) {
      throw createError({ statusCode: 400, message: 'Captcha verification failed' })
    }
  }

  const fileParts = parts.filter(p => p.filename)
  if (fileParts.length > MAX_FILES) {
    throw createError({ statusCode: 400, message: `Maximum ${MAX_FILES} attachments allowed` })
  }

  let totalBytes = 0
  const attachments: MailAttachment[] = []

  for (const file of fileParts) {
    const filename = sanitizeHeader(file.filename || 'attachment')
    const type = file.type || 'application/octet-stream'
    const size = file.data.byteLength

    if (size <= 0) continue
    if (size > MAX_FILE_BYTES) {
      throw createError({ statusCode: 400, message: `File too large: ${filename} (max 5MB each)` })
    }
    if (!ALLOWED_MIME.has(type)) {
      throw createError({ statusCode: 400, message: `File type not allowed: ${filename}` })
    }

    totalBytes += size
    if (totalBytes > MAX_TOTAL_BYTES) {
      throw createError({ statusCode: 400, message: 'Total attachments exceed 15MB' })
    }

    attachments.push({
      filename,
      content: file.data,
      contentType: type,
    })
  }

  const name = sanitizeHeader(nameRaw)
  const email = sanitizeHeader(emailRaw)
  const phone = sanitizeHeader(phoneRaw || 'Not provided')
  const subject = sanitizeHeader(subjectRaw || 'No subject')
  const message = messageRaw.slice(0, 5000)
  const siteUrl = config.public.siteUrl as string
  const contactTo = (config.contactTo as string) || 'projects@azzamazizali.sy'
  const attachmentNames = attachments.map(a => a.filename).filter(Boolean).join(', ')

  const transporter = nodemailer.createTransport({
    host: config.smtpHost as string,
    port: Number(config.smtpPort) || 465,
    secure: true,
    auth: {
      user: config.smtpUser as string,
      pass: config.smtpPass as string,
    },
  })

  try {
    await transporter.sendMail({
      from: `"Portfolio Contact" <${config.smtpUser}>`,
      to: contactTo,
      replyTo: email,
      subject: `Portfolio contact: ${subject}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `Subject: ${subject}`,
        `Attachments: ${attachmentNames || 'None'}`,
        '',
        message,
      ].join('\n'),
      html: `
        <h2>New portfolio contact</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
        <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
        <p><strong>Attachments:</strong> ${escapeHtml(attachmentNames || 'None')}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
        <p><a href="${escapeHtml(siteUrl)}">${escapeHtml(siteUrl)}</a></p>
      `,
      attachments,
    })
  } catch {
    throw createError({ statusCode: 502, message: 'Failed to send email' })
  }

  // Auto-reply is best-effort: Gmail rejects unauthenticated SPF/DKIM senders
  try {
    const autoReply = buildClientAutoReplyEmail({
      name,
      subject,
      siteUrl,
      attachmentCount: attachments.length,
    })

    await transporter.sendMail({
      from: `"Azzam Aziz Ali" <${config.smtpUser}>`,
      to: email,
      subject: autoReply.subject,
      text: autoReply.text,
      html: autoReply.html,
    })
  } catch {
    // Do not fail the contact form when client inbox rejects auto-reply
  }

  return {
    success: true,
    message: 'Message received. Azzam will reply within 24 hours.',
  }
})
