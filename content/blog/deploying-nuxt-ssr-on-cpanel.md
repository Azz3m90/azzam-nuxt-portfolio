---
title: "Deploying Nuxt SSR on cPanel: What Actually Worked for Me"
description: "Shared hosting and Nuxt SSR don't get along out of the box. Here's the build-locally, upload-.output setup I ended up with on CloudLinux cPanel, and the mistakes that cost me a weekend."
date: "2026-09-14"
tags: ["Nuxt", "Deployment", "cPanel", "Node.js"]
readTime: 7
---

I'll be honest: if I had the choice, I wouldn't run a Nuxt SSR app on cPanel. A small VPS with Docker and Nginx is easier to reason about, and that's what I use for most client work. But sometimes the hosting is already paid for, the domain is already there, and nobody wants to migrate. This portfolio is one of those cases.

So this is the setup I landed on after a few failed attempts. It's not elegant. It works.

## The problem

Most cPanel hosts these days ship a "Setup Node.js App" screen, usually backed by CloudLinux and Passenger. On paper you point it at your project, click "Run NPM Install", and you're done.

In practice, my first try looked like this:

1. Upload the whole repo.
2. Run `npm install` from cPanel.
3. Run `npm run build` over SSH.
4. Watch the process get killed halfway through the build.

Shared hosts limit memory per account, and a Nuxt build with `@nuxt/content`, i18n, image optimisation and the sitemap module wants more than they'll give you. You won't always get a clear error either. Sometimes the build just stops.

## Build on your machine, ship only the output

The fix is obvious once you accept it: **don't build on the server.** Build on your PC, and upload only what Nitro produces.

With `preset: 'node-server'` in `nuxt.config.ts`, `nuxt build` gives you a self-contained `.output` folder. `.output/server/index.mjs` is the entry point, and `.output/server/package.json` lists only the runtime dependencies the server bundle needs. That's a much smaller list than your project's `package.json`.

I wrote a small script, `npm run pack:cpanel`, that copies `.output` into a clean `deploy/cpanel-dist` folder and writes a `package.json` next to it.

## The package.json gotcha

This is the one that cost me most of a Saturday.

CloudLinux creates a virtual environment for your app (something like `~/nodevenv/portfilio/24/`) and installs whatever is in the **root** `package.json` of the application folder. If you upload your normal project `package.json`, it tries to install Nuxt, Tailwind, TypeScript and everything else you only need at build time. Slow at best, broken at worst.

So the script takes Nitro's production `package.json` and rewrites it slightly:

```js
const nitroPkg = JSON.parse(readFileSync(nitroPkgPath, 'utf8'))
nitroPkg.main = '.output/server/index.mjs'
nitroPkg.scripts = { start: 'node .output/server/index.mjs' }
writeFileSync(join(outDir, 'package.json'), JSON.stringify(nitroPkg, null, 2))
```

Now "Run NPM Install" in cPanel installs a handful of packages instead of hundreds, and they're exactly the ones the server bundle imports.

## The cPanel settings that matter

These are the settings I use. Getting one of them wrong gives you a generic Passenger error page with no useful details:

- **Application root:** `portfilio` (the folder, *not* `portfilio/.output/server`)
- **Application startup file:** `.output/server/index.mjs`
- **Application mode:** Production
- **Environment:** `NODE_ENV=production`

I kept setting the application root to the server folder because it felt logical. It isn't. The root has to be where `package.json` sits, otherwise the virtual environment installs dependencies in the wrong place and the server can't find them.

## A safety net: server.mjs

I also keep a tiny `server.mjs` in the project. It checks that `.output/server/index.mjs` and its `node_modules` folder actually exist before starting, and prints a readable message if they don't:

```js
if (!existsSync(entry)) {
  console.error('[server.mjs] Missing build output. Build on your PC, then upload .output')
  process.exit(1)
}
```

It also maps `PORT` to `NITRO_PORT`, because Passenger hands you a port through `PORT` and Nitro looks for its own variable first. Small thing, but it's the difference between "app started" and "app started on the wrong port and nothing responds".

## My deploy routine now

1. `npm run build` locally
2. `npm run pack:cpanel`
3. Zip `deploy/cpanel-dist` and upload it through File Manager (or `scp` it if SSH is enabled)
4. Extract it into `~/portfilio`
5. Click **Run NPM Install**, then **Restart**

It takes about five minutes, and most of that is the upload.

## Would I recommend it?

For a portfolio or a small marketing site, yes. It's fine. For anything with real traffic, background jobs or WebSockets, no. Get a VPS. Shared hosting will let you down at the worst moment, and you won't have the logs to find out why.

If you're stuck with cPanel, though, remember this: build locally, upload only `.output`, and keep the root `package.json` as small as you can.
