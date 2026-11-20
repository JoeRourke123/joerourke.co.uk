# joerourke.co.uk — a two-ink zine

Personal site + blog, printed risograph-style: cream paper, two inks, grain,
misregistration, crop marks. Static Astro site, markdown blog, deploys to
GitHub Pages.

**Read [DESIGN.md](./DESIGN.md) before changing anything visual.** It is the
strict design system for this site (palette, type, motion, component specs,
banned AI-slop patterns, and a 10-point audit every visual PR must pass).

## Run locally

```bash
npm ci
npm run dev     # http://localhost:4321
npm run build   # static output in dist/
```

## Write a post

Drop a markdown file in `src/content/writing/`:

```md
---
title: "My post title"
description: "One-line dek, shown on index cards and RSS."
date: 2026-11-20
tags: [design, meta]
---

Body in markdown. Images: wrap in `<figure class="duo duo-blue">…</figure>`
for the duotone treatment. Code blocks are intentionally un-highlighted.
```

URL is `/writing/<filename>/`. Tags get their own pages at
`/writing/tag/<tag>/`. RSS regenerates at `/rss.xml` on build.

## Deploy (owner steps, one-time)

1. Push/merge to `main`.
2. In repo **Settings → Pages → Build and deployment**: Source = **GitHub
   Actions**. (The workflow in `.github/workflows/deploy.yml` does the rest.)
3. Optional custom domain: set **joerourke.co.uk** under Settings → Pages and
   add the DNS records GitHub suggests. `astro.config.mjs` already assumes the
   root domain; if you skip the custom domain, set `base: '/joerourke.co.uk'`
   and `site: 'https://joerourke123.github.io'` there instead.
