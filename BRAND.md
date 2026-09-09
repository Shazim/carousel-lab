# @shazimbuilds — Brand & Typography Guidelines v1

Grounded in the actual orbiqon.com brand (pulled from the live site CSS on
2026-09-02) + carousel-specific typography practice. This file is the single
source of truth; templates implement it.

---

## 1. What orbiqon.com actually uses (research findings)

| Layer | Finding |
|---|---|
| Display font | **Cal Sans** (geometric display, used for headings) |
| Body font | **Manrope** (primary), Inter (utility only) |
| Backgrounds | Near-blacks: `#0C0C0C`, `#0A0A0A`, `#131313`, `#1A1A1A` |
| Accent | **Teal `#0097B2`** (founder-confirmed; the sky blues in the CSS bundle are component noise) |
| Secondary | soft red `#FF8A8A` |

Implication: the company brand is dark + teal + Cal Sans. The personal
brand (@shazimbuilds) should rhyme with it, not clone it.

## 2. The two content families

Two visual families, each with a locked type system. Never mix them in one post.

### Family A — "Build" (tech/bold posts: tool grids, level series, launches)

| Role | Font | Spec |
|---|---|---|
| Display | **Cal Sans** | 80–110px, uppercase or title case, ls −1 to −2px |
| Support text | **Manrope 400–500** | 30–36px, line-height 1.4 |
| Kicker | Manrope 700 caps | 22–26px, +4–6px tracking, muted color |
| Inside UI mockups | **SF Pro** (`-apple-system`) | mimics real Apple UI — never a "design" font |
| Code | JetBrains Mono / ui-monospace | |

Why: Cal Sans = the orbiqon.com heading font → every carousel quietly matches
the company site people land on. It also replaces Poppins, which (like Inter)
is the default font of low-effort AI carousels.

### Family B — "Editorial" (teaching posts: prompts, frameworks, guides)

| Role | Font | Spec |
|---|---|---|
| Display | **Fraunces 560–580** (approved alternate: Newsreader 500–600) | roman, never italic-as-style |
| ALL reading text | The same serif, 400–480 | serif does the reading; this is what kills the AI look |
| Kicker | Inter/Manrope 600 caps +6px tracking, or small serif caps | |
| Inside UI mockups | **SF Pro** (`-apple-system`) | chat cards & stat cards read as real screenshots |
| Code | JetBrains Mono | |

Rule learned the hard way: a sans-serif (especially Inter) in a prominent
reading role is the #1 "AI-made" tell. Sans lives ONLY inside UI mockups.

## 3. Color tokens

| Token | Hex | Use |
|---|---|---|
| `ink-black` | `#0C0C0C` | Family A dark background (matches orbiqon.com) |
| `paper` | `#EFECE3` | Family B background (+ noise texture) |
| `ink` | `#171512` | Editorial text |
| `accent-orange` | `#FF8A00` | PRIMARY personal accent — highlights, CTA |
| `clay` | `#C96442` | Claude-related marks, warm secondary |
| `orbiqon-teal` | `#0097B2` | Bridge color: anything pointing to Orbiqon (site, offer, company CTA) |
| Highlighters | `#F2EC4E` `#DCC5EE` `#C7EC82` `#A9E9DB` `#F6C7DE` | Editorial marks, rotate per slide |

Accent decision (deliberate): **orange stays primary** for @shazimbuilds —
every AI account is blue/purple; orange owns the feed and already marks your
existing posts. Orbiqon teal appears exactly when the content points at the
company. Don't swap them per mood.

## 4. Carousel type rules (the craft checklist)

1. **Max 2 families per post** (serif + UI sans, or Cal Sans + Manrope). Third font = never.
2. **Minimum reading size 28px** on the 1080px canvas. Phone-check anything smaller.
3. **Weight jumps ≥ 200** between hierarchy levels — 400 next to 500 reads as a mistake.
4. **Display: tight; body: open.** Headlines lh 1.0–1.15, ls slightly negative. Body lh 1.4–1.5.
5. **Caps need air**: any uppercase kicker gets +4–6px letter-spacing.
6. **Italics are an accent**, one word or a tiny "vs" — never a full line, never a paragraph.
7. **One highlight device per family**: marker-highlight + scribble (B), pill/underline bar (A).
8. **Break the center sometimes.** All-centered every-slide is a template tell; editorial slides may left-align.
9. **UI mockups always in system fonts** with real, correct content (real JSON, real prompts).
10. **Never ship**: Apple emoji as icons, Inter/Poppins as reading text, fake garbled code, gray-on-gray < 28px.

## 4b. Premium polish rules (the $10k pass — learned 2026-09-02)

The gap between "80% matching" and premium is never layout — it's these:

1. **One margin frame.** 88px canvas margin on all four sides. NOTHING touches or
   crowds it — if content doesn't fit, cut content or shrink the mockup, never
   the frame. Bottom margin is the one amateurs violate first.
2. **One type scale per set.** Title/def/body/chips sizes are IDENTICAL on every
   slide of a carousel. Never shrink type to make a slide fit — resize the
   mockup or trim words. A reader flipping slides must feel zero size jumps.
3. **8px spacing grid.** Every gap is a multiple of 8 (16/24/32/40/56/88). No
   eyeballed margins. Adjacent elements relate by clear steps, not near-misses.
4. **Layered shadow tokens, used consistently:**
   - sm: `0 4px 14px rgba(30,40,50,.07)` (chips, tiles)
   - md: `0 12px 32px rgba(30,40,50,.10), 0 3px 8px rgba(30,40,50,.05)` (cards)
   - lg: `0 32px 70px rgba(30,40,50,.16), 0 8px 20px rgba(30,40,50,.07)` (hero mockups)
   One element = one token. Never a lone hard shadow.
5. **UI mockups get air.** Window padding ≥ 28/34, row line-height ≥ 1.6, radius
   20–24, white mat 18–22px around the window with the lg shadow. Cramped
   mockups are the fastest "cheap" signal after fonts.
6. **Icons are drawn, not implied.** Folder/badge/device icons need gradient +
   highlight edge + soft shadow (macOS quality), not flat two-tone shapes.
7. **Backgrounds are compositions, not gradients.** Layered SVG silhouettes with
   a focal detail (path, figure, sun haze) minimum; generated painting ideal.
   A bare gradient or blurred blob reads as template.
8. **Repetition with one variation.** Slides repeat the identical structure;
   exactly ONE thing varies per slide (accent color, mock content, alignment).
   Consistency is the premium feel; the variation is what keeps it alive.

## 5. Imagery

- **Icons/illustration**: matched watercolor set (Nano Banana 2 / Lite, one AI Studio
  session per set, style skeleton in `assets/images/ICON-PROMPTS.md`). Lite tier is
  fine for flat icons and background washes.
- **Backgrounds**: generated paintings must reserve negative space for type
  ("generous empty space in the upper half" in the prompt).
- **Photos**: transparent cutouts in `shazim/`, always composited with glow +
  silhouette drop-shadow + warm grade (built into the icon-grid cover).
- **Never** one-shot a full slide in an image model — text and logos always come out wrong.

## 6. Per-template mapping

| Template | Family | Status |
|---|---|---|
| icon-grid (dark tool grids) | A | done (Poppins → Cal Sans/Manrope, 2026-09-02) |
| editorial (Bad/Good/Great) | B | done (Fraunces pass 2026-09-02) |
| editorial-grid (vitamins) | B | done; icons pending |
| level-series (Hooks-style, planned) | A + generated background | not built yet |
