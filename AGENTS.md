# Repository Guidelines

## Project Overview

Personal developer portfolio built with **Nuxt 4** (SSR enabled). Features a blog, case studies, multilingual support (EN/AR with RTL), dark/light mode, and Google Analytics integration.

## Project Structure & Module Organization

```
components/      # UI components, namespaced under App/ subfolder
composables/     # Shared logic (useProjects.ts, useSeo.ts, etc.)
content/         # Markdown-driven blog posts and case studies (@nuxt/content)
i18n/locales/    # Translation files (en.json, ar.json)
layouts/         # Page shell (default.vue)
pages/           # File-based routing (blog/, case-studies/, about.vue)
plugins/         # Analytics and theme-switcher plugins
server/          # Server API routes
types/           # Shared TypeScript type definitions
assets/          # Global styles (Tailwind entry point)
public/          # Static assets served as-is
```

Content (blog, case studies) is managed as Markdown files under `content/` and queried via `@nuxt/content`. i18n routing uses `prefix_except_default` strategy — Arabic pages are prefixed with `/ar/`, English is unprefixed.

## Build, Test, and Development Commands

```bash
npm run dev          # Start dev server on http://localhost:3000
npm run build        # Production SSR build
npm run generate     # Static site generation
npm run preview      # Preview production build locally
npm run typecheck    # Run TypeScript type checking (nuxt typecheck)
npm run postinstall  # Regenerate Nuxt types (nuxt prepare) — run after install
```

No test suite is configured. Use `npm run typecheck` as the primary correctness check.

## Coding Style & Naming Conventions

- **TypeScript strict mode** is enabled (`strict: true`, `shim: false`).
- **Tailwind CSS** with the Typography plugin for prose styling.
- **Color mode** defaults to dark; uses `@nuxtjs/color-mode`.
- No ESLint or Prettier config found — follow Nuxt/Vue 3 Composition API conventions and keep files consistent with existing code style.
- Composables are named with the `use` prefix (`useProjects`, `useSeo`).
- Vue components use PascalCase filenames, organized in subdirectories by feature.

## Commit Guidelines

Commit messages in this repo are informal and lowercase, describing the change concisely:

```
fix me Google tags
new resume
redirect from
new urgent fixes
adding gtags
```

Follow the same casual, descriptive style. No enforced conventional commits format.
