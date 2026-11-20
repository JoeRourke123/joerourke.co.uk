# DESIGN.md — joerourke.co.uk "risograph zine"

This document is the law of this site. It was written **before any code**.
No visual change may land that violates it. If a change needs an exception,
change this document first, in the same PR, with the reason.

## 1. Concept

A personal site (portfolio + blog) that reads like a **photocopied /
risograph zine**: cream paper, two ink colors that overprint, visible
grain, deliberate misregistration, crop marks, stickers, barcodes, issue
numbers. Brutalist grammar (thick ink borders, hard zero-blur offset
shadows, square corners) but warm, print-culture, handmade — the opposite
of a generic AI-generated SaaS page.

Vibe words: *xerox punk, gig poster, indie press, school newsletter,
field notes.* Imperfect on purpose. One or two recurring techniques,
repeated consistently — never a pile of random effects.

## 2. Hard bans (the anti-"AI slop" list)

Any of these in a PR = reject the PR:

1. Gradients of any kind (backgrounds, text, borders). Flat fills only.
2. `border-radius` > 0 anywhere. Corners are square.
3. `box-shadow` with blur > 0. Only hard offset shadows: `Npx Npx 0 var(--ink)`.
4. Identity fonts Inter, Roboto, Arial, system-ui, or "tasteful default"
   pairings (Space Grotesk/Geist alone, cream+terracotta, dark+acid green).
5. Purple/indigo anything. (Our blue is riso blue `#0078BF`, flat — allowed.)
6. Emoji as icons or decoration. Icons are hand-drawn inline SVG only.
7. Centered hero + three equal-width cards. Layouts are asymmetric, left-aligned.
8. Glassmorphism, neon glow, orbs, bokeh, gradient text.
9. Soft `ease` / `ease-in-out` transitions. Motion is `steps()` or `linear` only.
10. Generic copy: "passionate about", "in today's fast-paced world", "delve",
    "leverage", "game-changer", "unlock", "elevate", "journey", lorem ipsum,
    stock photos, "trusted by" bars, pill badges on everything.
11. Dark-mode-by-default or neon-on-dark. The site is paper. One inverted
    (ink-background) band is allowed per page for contrast.
12. Trackers, analytics, cookies, cookie banners.

## 3. Color tokens (the whole palette — nothing else)

```css
--paper:      #F4F1EA;  /* cream stock */
--paper-dark: #EAE3D0;  /* darker cream for alt surfaces */
--ink:        #1B1B1B;  /* near-black ink */
--orange:     #FF6C2F;  /* riso orange */
--blue:       #0078BF;  /* riso blue */
```

Rules:

- Max 2 ink colors + paper + ink, ever. Overlaps must use
  `mix-blend-mode: multiply` so orange × blue prints as a dark blend.
- Contrast: body text is always `--ink` on `--paper` (~15:1). `--orange` on
  paper is ~2:1 → **display/large type and fills with ink text only, never
  body text**. `--blue` on paper ~3.7:1 → large/bold text only. Cream on
  `--blue` ~4:1 → large text only. Cream on `--ink` ~15:1 → fine.
- One inverted band per page max: `background: var(--ink)`, text `--paper`.

## 4. Typography

Self-hosted via Fontsource (OFL), imported as individual weight files:

| Role    | Font                  | Weights      | Use |
|---------|-----------------------|--------------|-----|
| Display | Big Shoulders Display | 400 / 700 / 900 | masthead, h1–h3, pull quotes, buttons, section titles (often uppercase) |
| Prose   | Newsreader            | 400 / 500 / 700 + italic 400 | all body text |
| Mono    | Courier Prime         | 400 / 700 | labels, dates, tags, meta, ticker, nav, code |

Rules:

- Prose measure: 62–72ch, `font-size: 1.125rem`, `line-height: 1.65`.
- Display headings: `line-height: 0.9`, uppercase allowed, sizes via clamp:
  - cover masthead `clamp(3.5rem, 14vw, 10rem)`
  - h1 `clamp(2.6rem, 7vw, 5.5rem)` · h2 `clamp(2rem, 5vw, 3.5rem)` · h3 `clamp(1.4rem, 3vw, 2rem)`
- Mono labels: `text-transform: uppercase; letter-spacing: 0.08em; font-size: 0.8125rem`.
- No font is ever loaded from a third-party CDN.

## 5. Risograph texture rules

- **Grain**: one fixed full-viewport overlay (`pointer-events: none`,
  `z-index: 9999`), inline SVG `feTurbulence` noise as data URI,
  `opacity: 0.06`, `mix-blend-mode: multiply`.
- **Misregistration**: utility `.misreg` — element's text duplicated via
  `::before`/`::after` (`content: attr(data-text)`), offset 2–3px in the
  other ink color, `mix-blend-mode: multiply`, behind the main text.
  On `:hover` the offset grows by 1–2px with `transition: transform .15s steps(2)`.
- **Images**: always duotone-treated. Wrapper `.duo-blue` / `.duo-orange`:
  `img { filter: grayscale(1) contrast(1.15); mix-blend-mode: screen; }`
  over the ink-colored wrapper background, plus `border: var(--border)` and a
  hard shadow. Never raw full-color photos.
- **Print artifacts**: fixed crop marks in the four viewport corners; a
  registration mark (circle + cross) SVG; a barcode SVG in the footer;
  an "ISSUE No. 001" badge on the cover.

## 6. Brutalist grammar

```css
--border: 3px solid var(--ink);
--shadow:      6px 6px 0 var(--ink);
--shadow-lg:  10px 10px 0 var(--ink);
```

- Every card/button/sticker: `border: var(--border)`, square corners,
  `box-shadow: var(--shadow)`, background one of paper/orange/blue.
- Press states (physical): `:hover` → `transform: translate(-2px,-2px)`,
  shadow grows to `8px 8px`; `:active` → `transform: translate(6px,6px)`,
  shadow collapses to `0 0`. Transitions instant or `steps(2)` — never soft.
- Links: ink text, `text-decoration: underline 3px var(--orange)` with
  `text-underline-offset: 4px`; hover inverts (bg ink, text paper).
- `:focus-visible` → `outline: 3px solid var(--blue); outline-offset: 3px`.
- `::selection` → `background: var(--blue); color: var(--paper)`.
- Chunky scrollbar: 14px track paper, thumb ink with 3px border
  (`scrollbar-color` + `::-webkit-scrollbar`).

## 7. Motion rules

Allowed (ambient level):

- Ticker marquee: `animation: linear infinite`, seamless duplicated track,
  **pauses on `:hover`**.
- Blinking block cursor: `steps(1)` 1s infinite.
- Stamp-slam on load: once, `steps(6)` ~0.5s, scale 3→1 with rotation settle.
- Scroll-in reveals: `.reveal` elements get `.in` via a tiny
  IntersectionObserver; transition `transform, opacity .3s steps(4)`.
- Hover misregistration shift (see §5).

Banned: ease curves, animating blur/filters, spinners, parallax, autoplay.
`@media (prefers-reduced-motion: reduce)` kills **all** animation/transitions
and the JS skips the observer (elements render visible).

## 8. Layout rules

- Cover (`/`) is a **poster**: giant ransom-note masthead, stamp badge,
  cover lines, full-width nav rows with arrow doodles, ticker at the foot.
- Everything left-aligned, asymmetric. Sections read as standalone zine
  pages ("poster-per-section"), separated by 3px rules.
- Max content width 1100px; prose column 68ch. Generous but *structured*
  whitespace — structure is visible (borders, rules, marks), never vague.
- One inverted ink band per page max (e.g. footer).

## 9. Component inventory (all mandatory, spec'd here)

| Component | Spec |
|---|---|
| `Masthead` | Ransom-note: each letter of the site title is its own scrap (2px ink border, paper bg; some letters orange or blue bg), deterministic per-letter rotate/translate/size from a seeded hash, Big Shoulders mixed weights/case |
| `Nav` | Mono uppercase links; hover invert; sticky top bar with 3px bottom border |
| `Ticker` | Orange band, 3px borders, mono uppercase items separated by `///`, marquee, pause on hover |
| `Sticker` | Rotated card (rotate -3° to 3°), hard shadow, tape strip (semi-transparent paper-dark rectangle) on top |
| `StampBadge` | "ISSUE No. 001" — bordered circle-ish stamp, stamp-slam animation on load |
| `PostCard` | Border + shadow + press states; mono date / reading time / word count; Big Shoulders title; serif description; tag chips (mono, 2px border) |
| `TagChip` | Mono uppercase, 2px border, hover invert |
| Drop cap | First paragraph of a post: Big Shoulders, orange, `text-shadow: 3px 3px 0 var(--blue)`, float left |
| Pull quote | `blockquote`: Big Shoulders 900, orange, hard blue offset shadow, 3px left border |
| Code block | **No syntax highlighting.** Ink background, cream Courier Prime text, 3px border, `box-shadow: 6px 6px 0 var(--orange)`; copy button with press state |
| `CropMarks` | Fixed SVG crop marks, viewport corners |
| `Barcode` | Inline SVG of deterministic-width bars, footer |
| `Doodles` | Hand-drawn inline SVGs: arrow, scribble underline, circled word — stroke ink, `stroke-linecap: round`, slightly wobbly paths |
| 404 | "404 — THIS PAGE WAS MISPRINTED", crop marks, big display type, link home |
| Grain overlay | §5 |

## 10. Pages & IA

`/` cover · `/writing` index · `/writing/<slug>/` posts ·
`/writing/tag/<tag>/` tag pages · `/about` · `/now` · `/colophon` ·
`/rss.xml` · `404`. All URLs lowercase, trailing slashes handled by Astro.

## 11. Content model (Astro content collections)

- Posts: `src/content/writing/*.md`. Filename = slug.
- Front matter (zod schema in `src/content.config.ts`):
  `title: string`, `description: string`, `date: date`, `tags: string[]` (default `[]`).
- Index sorts by `date` desc. Reading time + word count computed from body.
- Images colocated with the post (Astro assets) or in `public/`; `alt` text
  mandatory; all images get the duotone treatment (§5).
- RSS at `/rss.xml` via `@astrojs/rss`, linked in footer and ticker.

## 12. Voice & copy rules (blog + pages)

- First person, punchy, witty, specific. Short sentences. Name concrete
  things (apps, numbers, places). Opinions allowed — preferred.
- Banned phrases: see §2.10. Also banned: emoji, "I hope this email finds
  you well"-style filler, marketing CTAs, question headlines.
- Headlines are statements. Meta labels are deadpan mono ("ISSUE No.",
  "FILED UNDER", "EST.").

## 13. Accessibility

- WCAG AA for all text per the contrast rules in §3.
- Skip link, semantic landmarks (`header/nav/main/footer`), one h1 per page.
- All interactive elements keyboard-operable; no hover-only information.
- `alt` on every image; aria-labels on icon-only links.
- `prefers-reduced-motion` honored everywhere (§7).

## 14. Performance & tech

- Astro (static, zero hydration — plain `.astro` components, no React).
- One tiny inline script max (IntersectionObserver reveals); total client JS
  ≤ 8 kB; no frameworks, no Tailwind.
- Self-hosted woff2 via Fontsource; preload only Big Shoulders 900 and
  Newsreader 400.
- Images lazy + explicit dimensions. Lighthouse ≥ 90 target.
- `syntaxHighlight: false` in astro config (see §9 code block).

## 15. Deployment

- Static output to `dist/`; `.github/workflows/deploy.yml` builds with
  `actions/upload-pages-artifact` and deploys with `actions/deploy-pages`
  (source: GitHub Actions). **Enabling Pages on the repo and any custom
  domain (joerourke.co.uk) is the owner's manual step** — the workflow file
  ships ready. `site`/`base` in `astro.config.mjs` default to
  `https://joerourke.co.uk` + `/`; change `base` if serving under a project
  path instead.

## 16. File conventions

```
src/content.config.ts      collection schema
src/content/writing/       markdown posts (+ colocated images)
src/styles/global.css      tokens in :root + all component CSS (plain CSS)
src/layouts/               BaseLayout.astro, PostLayout.astro
src/components/            one component per file, PascalCase
src/pages/                 routes incl. rss.xml.js, 404.astro
src/utils/                 posts.ts (query/sort/reading time)
```

## 17. Pre-merge audit (answer all 10, out loud, in the PR)

1. Any gradient, radius, or blurred shadow? → must be no.
2. Any banned font/emoji/purple? → no.
3. Are we using more than paper + ink + orange + blue? → no.
4. Is any body text below AA contrast? → no.
5. Any `ease` transition or soft motion? → no.
6. Does any section look like a centered hero + 3 equal cards? → no.
7. Does the copy contain a banned phrase? → no.
8. Is there a new effect that isn't one of the recurring techniques? → remove or justify.
9. Does it still feel like a photocopied zine and not a template? → yes.
10. Did DESIGN.md need changing? → change it in the same PR with the reason.
