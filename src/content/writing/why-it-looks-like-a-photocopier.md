---
title: "Why this site looks like a photocopier sneezed on it"
description: "A short manifesto for printing the web in two inks: on palettes, misregistration, and why I banned gradients from my own house."
date: 2026-11-20
tags: [design, meta]
---

Every website I open lately looks like it was assembled from the same five
parts: a hero, three cards, a gradient, a font called Inter. It's not ugly.
It's *generic*, and generic is worse — it's the sound of a machine averaging
everything it has ever seen.

So I wrote myself a rulebook before writing a line of CSS. It lives in
`DESIGN.md` in the repo and it's deliberately boring to read and strict to
follow:

- Two inks plus paper. Orange `#FF6C2F`, blue `#0078BF`, cream `#F4F1EA`, ink
  `#1B1B1B`. Nothing else exists.
- Square corners, thick borders, hard offset shadows with zero blur. If a
  shadow has blur, it's a mistake, not a style.
- No gradients anywhere, ever. Especially not purple ones.
- Motion in `steps()`, never `ease`. Machines ease; photocopiers stamp.
- Type that argues back: Big Shoulders Display for shouting, Newsreader for
  talking, Courier Prime for the price tags.

The riso details are the fun part. Overlapping inks multiply into a darker
blend, so orange over blue makes its own third color. Headlines get a second
copy of themselves offset by 3px in the other ink — deliberate misregistration,
the way a real two-drum print drifts. There's a grain overlay because paper
has tooth.

> If you showed this page to someone and they said "an AI made this", I'd have failed.

That's the actual test I run every change against. Not "is it pretty" —
*is it specific*. Specificity is the anti-slop. A zine has an issue number, a
barcode, crop marks, a colophon. A template has a hero and three cards.

If you want the full rules, they're all in
[DESIGN.md](https://github.com/JoeRourke123/joerourke.co.uk/blob/main/DESIGN.md).
Steal them. Then break one on purpose and tell me which one.

— J.
