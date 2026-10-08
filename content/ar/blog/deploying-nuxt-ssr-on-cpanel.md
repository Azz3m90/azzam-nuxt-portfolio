---
title: "نشر Nuxt SSR على cPanel: الطريقة التي نجحت معي فعلًا"
description: "الاستضافة المشتركة وNuxt SSR لا يتفقان بسهولة. هذه الطريقة التي استقريت عليها على CloudLinux cPanel: البناء على جهازي ورفع مجلد ‎.output فقط، والأخطاء التي كلفتني عطلة نهاية أسبوع كاملة."
date: "2026-09-14"
tags: ["Nuxt", "النشر", "cPanel", "Node.js"]
readTime: 7
---

بصراحة، لو كان القرار بيدي لما شغّلت تطبيق Nuxt SSR على cPanel. سيرفر VPS صغير مع Docker وNginx أوضح بكثير، وهذا ما أستخدمه في أغلب مشاريع العملاء. لكن أحيانًا تكون الاستضافة مدفوعة سلفًا، والدومين مربوطًا بها، ولا أحد يريد النقل. هذا الموقع واحد من هذه الحالات.

لذلك هذه هي الطريقة التي وصلت إليها بعد عدة محاولات فاشلة. ليست أنيقة، لكنها تعمل.

## المشكلة

معظم استضافات cPanel اليوم فيها شاشة "Setup Node.js App"، وغالبًا تعمل فوق CloudLinux وPassenger. نظريًا تحدد مجلد المشروع، تضغط "Run NPM Install"، وانتهى الأمر.

عمليًا، محاولتي الأولى كانت هكذا:

1. رفعت المشروع كاملًا.
2. شغّلت `npm install` من cPanel.
3. شغّلت `npm run build` عبر SSH.
4. وشاهدت العملية تُقتل في منتصف البناء.

الاستضافة المشتركة تحدد الذاكرة لكل حساب، وبناء Nuxt مع `@nuxt/content` و i18n وتحسين الصور وsitemap يحتاج أكثر مما يسمحون به. ولن تحصل دائمًا على رسالة خطأ واضحة. أحيانًا يتوقف البناء وكفى.

## ابنِ على جهازك، وارفع الناتج فقط

الحل واضح بمجرد أن تتقبّله: **لا تبنِ على السيرفر.** ابنِ على جهازك، وارفع فقط ما ينتجه Nitro.

مع `preset: 'node-server'` في `nuxt.config.ts`، يعطيك `nuxt build` مجلد `.output` مستقلًا بذاته. الملف `.output/server/index.mjs` هو نقطة التشغيل، والملف `.output/server/package.json` يحتوي فقط على الحزم التي يحتاجها السيرفر وقت التشغيل، وهي قائمة أقصر بكثير من `package.json` الخاص بمشروعك.

كتبت سكربت صغيرًا، `npm run pack:cpanel`، ينسخ `.output` إلى مجلد نظيف `deploy/cpanel-dist` ويكتب بجانبه ملف `package.json`.

## مشكلة package.json

هذه هي التي أخذت مني معظم يوم السبت.

يُنشئ CloudLinux بيئة افتراضية لتطبيقك (شيء مثل `~/nodevenv/portfilio/24/`) ويثبّت كل ما في ملف `package.json` الموجود في **جذر** مجلد التطبيق. إذا رفعت ملف `package.json` العادي لمشروعك، سيحاول تثبيت Nuxt وTailwind وTypeScript وكل ما تحتاجه فقط وقت البناء. بطيء في أحسن الأحوال، ومعطّل في أسوئها.

لذلك يأخذ السكربت ملف `package.json` الخاص بـ Nitro ويعدّله قليلًا:

```js
const nitroPkg = JSON.parse(readFileSync(nitroPkgPath, 'utf8'))
nitroPkg.main = '.output/server/index.mjs'
nitroPkg.scripts = { start: 'node .output/server/index.mjs' }
writeFileSync(join(outDir, 'package.json'), JSON.stringify(nitroPkg, null, 2))
```

الآن زر "Run NPM Install" في cPanel يثبّت عددًا قليلًا من الحزم بدل المئات، وهي بالضبط الحزم التي يستوردها السيرفر.

## إعدادات cPanel المهمة

هذه هي الإعدادات التي أستخدمها. خطأ واحد فيها يعطيك صفحة خطأ عامة من Passenger بلا أي تفاصيل مفيدة:

- **Application root:** ‏`portfilio` (المجلد نفسه، *وليس* `portfilio/.output/server`)
- **Application startup file:** ‏`.output/server/index.mjs`
- **Application mode:** ‏Production
- **Environment:** ‏`NODE_ENV=production`

كنت أضع مسار مجلد السيرفر في Application root لأنه بدا منطقيًا. ليس كذلك. الجذر يجب أن يكون حيث يوجد `package.json`، وإلا ستثبّت البيئة الافتراضية الحزم في المكان الخطأ ولن يجدها السيرفر.

## شبكة أمان: server.mjs

أحتفظ أيضًا بملف `server.mjs` صغير في المشروع. يتأكد من وجود `.output/server/index.mjs` ومجلد `node_modules` الخاص به قبل التشغيل، ويطبع رسالة مفهومة إذا لم يجدهما:

```js
if (!existsSync(entry)) {
  console.error('[server.mjs] Missing build output. Build on your PC, then upload .output')
  process.exit(1)
}
```

وهو أيضًا ينقل قيمة `PORT` إلى `NITRO_PORT`، لأن Passenger يعطيك المنفذ عبر `PORT` بينما يبحث Nitro عن متغيره الخاص أولًا. تفصيل صغير، لكنه الفرق بين "التطبيق يعمل" و"التطبيق يعمل على المنفذ الخطأ ولا شيء يستجيب".

## طريقتي في النشر الآن

1. ‏`npm run build` على جهازي
2. ‏`npm run pack:cpanel`
3. أضغط مجلد `deploy/cpanel-dist` وأرفعه من File Manager (أو بـ `scp` إن كان SSH مفعّلًا)
4. أفك الضغط داخل `~/portfilio`
5. أضغط **Run NPM Install** ثم **Restart**

تأخذ العملية حوالي خمس دقائق، ومعظمها وقت الرفع.

## هل أنصح بها؟

لموقع شخصي أو موقع تسويقي صغير، نعم، لا بأس. لأي شيء فيه زيارات حقيقية أو مهام في الخلفية أو WebSockets، لا. خذ VPS. الاستضافة المشتركة ستخذلك في أسوأ لحظة، ولن تكون لديك السجلات لتعرف السبب.

لكن إن كنت مضطرًا لـ cPanel، فتذكّر هذا: ابنِ على جهازك، ارفع `.output` فقط، واجعل `package.json` في الجذر صغيرًا قدر الإمكان.
