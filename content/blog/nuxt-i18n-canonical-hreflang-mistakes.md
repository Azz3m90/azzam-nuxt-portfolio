---
title: "The Canonical Tag Mistake That Hid My Arabic Pages From Google"
description: "Search Console kept flagging my /ar/ pages as 'Alternate page with proper canonical tag'. The cause was a hardcoded canonical and duplicate hreflang tags in a Nuxt i18n setup. Here's how I fixed it."
date: "2026-08-22"
tags: ["Technical SEO", "Nuxt", "i18n", "Hreflang"]
readTime: 6
---

For a while, almost none of the Arabic version of this site was indexed. The pages existed and loaded fine. They were in the sitemap. But in Google Search Console, nearly every `/ar/` URL sat under **"Alternate page with proper canonical tag"**.

That status sounds harmless, and sometimes it is. In my case it meant Google had decided the Arabic pages were just copies of the English ones and was only indexing the English URLs.

It was my fault, and it took a while to see why.

## How the site is set up

The site uses `@nuxtjs/i18n` with the `prefix_except_default` strategy:

- English: `https://azzamazizali.sy/projects`
- Arabic: `https://azzamazizali.sy/ar/projects`

That's a perfectly good setup. The problem was in the `<head>`.

## Mistake #1: the canonical always pointed to English

Early on, I had a helper that built the canonical URL from a base path, and I'd written it before adding Arabic. It stripped the locale prefix. So `/ar/projects` declared this:

```html
<link rel="canonical" href="https://azzamazizali.sy/projects">
```

To Google, that says: "The real version of this page is the English one. Index that." And Google did exactly that.

A canonical tag has to point to **the page itself**, including the locale prefix. Each language version is its own original page, not a duplicate. Hreflang is what tells Google the pages are translations of each other. Canonical isn't for that.

## Mistake #2: two sources of hreflang

The second problem was messier. I was calling `useLocaleHead()` in `app.vue`, which generates hreflang alternates and a canonical. Then on some pages I *also* added my own `useHead()` links. Some pages ended up with two canonicals, and some had hreflang links that didn't match each other.

Google wants hreflang to be **reciprocal**. If the English page points to the Arabic page, the Arabic page must point back. Each page should also reference itself. When those signals conflict, Google tends to ignore all of them.

## What I changed

I picked one owner for each tag:

**hreflang** comes only from `useLocaleHead` in `app.vue`. I filter out its canonical, so it can't fight with the page-level one:

```ts
const localeHead = useLocaleHead({ addSeoAttributes: true })

useHead(computed(() => ({
  link: (localeHead.value.link ?? []).filter(l => l.rel !== 'canonical'),
  meta: localeHead.value.meta,
})))
```

**canonical** comes only from my `useSeo()` composable, built from the *current* route path with nothing stripped:

```ts
const fullUrl = `${CANONICAL_DOMAIN}${route.path.replace(/\/$/, '')}`
useHead({ link: [{ rel: 'canonical', href: fullUrl }] })
```

That's it. One canonical per page, pointing at itself. One set of hreflang links, generated the same way on every page.

I also made sure `baseUrl` is set in the i18n config. Without it, the hreflang links come out as relative URLs, and Google wants absolute ones.

## Checking it properly

Don't trust the dev tools Elements panel for this. It shows the DOM after hydration, and that isn't always what the server sent. I checked with:

```bash
curl -s https://azzamazizali.sy/ar/projects | grep -E 'canonical|hreflang'
```

You want exactly one canonical (pointing to the `/ar/` URL) and an `hreflang` link for `en`, `ar` and `x-default`.

After deploying, I used "Validate fix" in Search Console. It took a few weeks for the Arabic pages to move into "Indexed", which is normal. Google isn't in a hurry.

## The short version

- Canonical = this exact page, locale prefix included.
- Hreflang = links between the translations, reciprocal, from one source.
- Never let two pieces of code write the same head tag.

It's a small bug. It still kept half my site out of Google for months.
