---
title: "خطأ في وسم Canonical أخفى صفحاتي العربية عن Google"
description: "كان Search Console يضع صفحات ‎/ar/ تحت 'Alternate page with proper canonical tag'. السبب كان canonical ثابتًا ووسوم hreflang مكررة في إعداد Nuxt i18n. هكذا أصلحته."
date: "2026-08-22"
tags: ["SEO تقني", "Nuxt", "i18n", "Hreflang"]
readTime: 6
---

لفترة من الوقت، لم تكن النسخة العربية من هذا الموقع مفهرسة تقريبًا. الصفحات موجودة وتفتح بشكل طبيعي، وموجودة في الـ sitemap. لكن في Google Search Console، كانت كل روابط `/ar/` تقريبًا تحت **"Alternate page with proper canonical tag"**.

الاسم يبدو غير مقلق، وأحيانًا لا يكون مقلقًا فعلًا. لكن في حالتي كان يعني أن Google قرر أن الصفحات العربية مجرد نسخ من الإنجليزية، وصار يفهرس الروابط الإنجليزية فقط.

الخطأ كان خطئي، وأخذ مني وقتًا حتى أراه.

## كيف كان الموقع مُعدّاً

يستخدم الموقع `@nuxtjs/i18n` مع استراتيجية `prefix_except_default`:

- الإنجليزية: `https://azzamazizali.sy/projects`
- العربية: `https://azzamazizali.sy/ar/projects`

هذا إعداد سليم تمامًا. المشكلة كانت داخل `<head>`.

## الخطأ الأول: الـ canonical يشير دائمًا إلى الإنجليزية

في البداية، كانت عندي دالة تبني رابط الـ canonical من مسار أساسي، وكتبتها قبل إضافة العربية. كانت تحذف بادئة اللغة. فصارت صفحة `/ar/projects` تعلن هذا:

```html
<link rel="canonical" href="https://azzamazizali.sy/projects">
```

بالنسبة لـ Google هذا يعني: "النسخة الأصلية من هذه الصفحة هي الإنجليزية، افهرس تلك". وهذا بالضبط ما فعله Google.

وسم canonical يجب أن يشير إلى **الصفحة نفسها**، مع بادئة اللغة. كل نسخة لغوية هي صفحة أصلية بحد ذاتها، وليست نسخة مكررة. أما ربط الترجمات ببعضها فهو وظيفة hreflang، وليس canonical.

## الخطأ الثاني: مصدران لوسوم hreflang

المشكلة الثانية كانت أكثر فوضى. كنت أستدعي `useLocaleHead()` في `app.vue`، وهو يولّد روابط hreflang ورابط canonical. ثم في بعض الصفحات كنت أضيف *أيضًا* روابطي الخاصة عبر `useHead()`. فصار في بعض الصفحات وسما canonical، وفي بعضها روابط hreflang لا تتطابق مع بعضها.

يريد Google أن تكون وسوم hreflang **متبادلة**. إذا أشارت الصفحة الإنجليزية إلى العربية، يجب أن تشير العربية إليها بالمقابل، وكل صفحة يجب أن تشير إلى نفسها أيضًا. وعندما تتعارض هذه الإشارات، يميل Google إلى تجاهلها كلها.

## ما الذي غيّرته

جعلت لكل وسم مصدرًا واحدًا فقط:

**hreflang** يأتي فقط من `useLocaleHead` في `app.vue`. وأحذف منه الـ canonical حتى لا يتعارض مع الـ canonical الخاص بالصفحة:

```ts
const localeHead = useLocaleHead({ addSeoAttributes: true })

useHead(computed(() => ({
  link: (localeHead.value.link ?? []).filter(l => l.rel !== 'canonical'),
  meta: localeHead.value.meta,
})))
```

**canonical** يأتي فقط من الـ composable الخاص بي `useSeo()`، ويُبنى من مسار الصفحة *الحالية* دون حذف أي شيء:

```ts
const fullUrl = `${CANONICAL_DOMAIN}${route.path.replace(/\/$/, '')}`
useHead({ link: [{ rel: 'canonical', href: fullUrl }] })
```

هذا كل شيء. canonical واحد لكل صفحة يشير إليها هي. ومجموعة واحدة من روابط hreflang تُولَّد بالطريقة نفسها في كل صفحة.

وتأكدت أيضًا من ضبط `baseUrl` في إعدادات i18n. بدونه تخرج روابط hreflang نسبية، و Google يريدها روابط كاملة.

## التحقق بالطريقة الصحيحة

لا تعتمد على لوحة Elements في أدوات المطوّر لهذا الأمر. هي تعرض الـ DOM بعد الـ hydration، وهذا ليس دائمًا ما أرسله السيرفر. أنا تحققت بهذا الأمر:

```bash
curl -s https://azzamazizali.sy/ar/projects | grep -E 'canonical|hreflang'
```

المطلوب canonical واحد بالضبط (يشير إلى رابط `/ar/`)، ورابط `hreflang` لكل من `en` و `ar` و `x-default`.

بعد النشر، استخدمت "Validate fix" في Search Console. أخذت الصفحات العربية بضعة أسابيع حتى انتقلت إلى "Indexed"، وهذا طبيعي. Google ليس مستعجلًا.

## باختصار

- canonical = هذه الصفحة بالضبط، مع بادئة اللغة.
- hreflang = روابط بين الترجمات، متبادلة، ومن مصدر واحد.
- لا تسمح أبدًا لقطعتين من الكود بكتابة وسم الـ head نفسه.

خطأ صغير، لكنه أبقى نصف موقعي خارج Google لأشهر.
