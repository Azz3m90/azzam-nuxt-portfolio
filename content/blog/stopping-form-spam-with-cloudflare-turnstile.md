---
title: "How I Stopped Contact Form Spam Without Annoying Real Users"
description: "reCAPTCHA puzzles were costing me real leads, and honeypots alone weren't enough. Here's the Cloudflare Turnstile setup I now use on Nuxt sites, including the server-side check people forget."
date: "2026-06-18"
tags: ["Security", "Nuxt", "Cloudflare", "Forms"]
readTime: 5
---

Every contact form I've put online has been found by bots within days. A few years ago one client's form was getting more than a hundred spam messages a day: crypto offers, SEO "audits", and messages in languages nobody on the team spoke. The real enquiries were buried in there somewhere.

I tried the usual options before settling on what I use now.

## What I tried first

**reCAPTCHA v2 (the checkbox and the traffic lights).** It stopped the spam, but people hate it. One client told me a customer called them just to say they'd given up after the third round of "select all the buses". That's a lost lead, and you'll never know how many more there were.

**A honeypot field.** A hidden input that humans don't see and bots fill in. Cheap and invisible, and it still catches a surprising number of simple bots. But the smarter ones skip it. I still use one, just not on its own.

**Rate limiting by IP.** Helpful against floods, useless against spam that comes from many different IPs.

## Cloudflare Turnstile

Turnstile is Cloudflare's CAPTCHA replacement. Most visitors never see a challenge. It runs a few checks in the background and gives the browser a token. If it's unsure, it shows a single checkbox. No traffic lights.

It's free, it doesn't need your site to be behind Cloudflare, and it's what I've used on this site and on client projects like AZ Containers.

## The part people get wrong

Adding the widget to the page is the easy half. Plenty of tutorials stop there, which means the form is "protected" by a widget a bot can simply ignore and post straight to your API.

**You have to verify the token on the server.** In Nuxt, my API route does something like this:

```ts
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { turnstileSecret } = useRuntimeConfig()

  const verification = await $fetch<{ success: boolean }>(
    'https://challenges.cloudflare.com/turnstile/v0/siteverify',
    {
      method: 'POST',
      body: new URLSearchParams({
        secret: turnstileSecret,
        response: body.turnstileToken,
      }),
    },
  )

  if (!verification.success) {
    throw createError({ statusCode: 400, message: 'Captcha verification failed' })
  }

  // only now send the email
})
```

A few details:

- The **secret key** lives in `runtimeConfig` (server-only), loaded from an environment variable. Never put it in `public`.
- Tokens are **single-use** and expire after a few minutes. If the user takes a long time on the form or submission fails, reset the widget so they get a fresh token.
- Validate the other fields on the server too. Turnstile tells you it's probably a human. It doesn't tell you the email address is valid.

## My current stack for forms

1. Honeypot field (catches lazy bots for free)
2. Turnstile, verified server-side
3. Server-side validation of every field
4. Basic rate limiting on the endpoint

Since moving to this, spam on the forms I manage has dropped to almost nothing. More importantly, I haven't had a single "your form doesn't work" message from a real person.

Security that frustrates your users isn't really security. It just moves the damage somewhere you can't see it.
