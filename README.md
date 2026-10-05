# Carousel Lab — @shazimbuilds

Code-based content factory for Instagram/LinkedIn. One folder per post; design
lives in code templates, content lives in JSON; every render produces the full
distribution kit. Built with Claude Code, operable by any AI coding tool.

**AI agents: read `AGENTS.md` (operator manual) → `BRAND.md` (design law) →
`TEMPLATES.md` (schemas).** Those three files contain everything this README
summarizes.

## Commands

```bash
node render.js <post-slug>                    # render a post
node new-post.js <slug> <template> "Title"    # scaffold a new post
node gen-icons.js [names...]                  # icon gen via Gemini API (needs key+quota)
```

Setup on a fresh machine: Node ≥ 18 → `npm i` → `npx playwright install chromium`.

## What one render produces

```
posts/<slug>/
  post.json          content + meta (keyword, status, results log)
  caption.md         IG caption, hashtags, pinned comment, reply lines
  CHECKLIST.md       posting-day steps
  threads.md         Threads draft (hook / spine / CTA)
  guide/             lead magnet (only for keyword-CTA posts) — html + pdf
  build/             intermediate HTML (regenerated every render)
  exports/
    NN-*.png         1080×1350 slides — upload to IG in order
    _contact.png     whole set at a glance — review before posting
    linkedin.pdf     LinkedIn document post, exact slide size
```

## Templates (8)

| Template | Style | Use for |
|---|---|---|
| icon-grid | Cal Sans on dark, 2×2 app tiles, photo hook cover | tool roundups |
| editorial | Fraunces on paper, Bad/Good/Great chat mockups | prompt teaching |
| editorial-grid | Fraunces + 2×2 illustrated grid + stat cards | concept frameworks |
| level-series | landscape bg, serif levels, real UI mockups | mastery ladders |
| agent-recipes | floating card, WHEN/DO/SEND workflows | system recipes |
| meme | generated character photo + composited text/logos | the capy founder |
| model-cards | black spec sheet, model/price cards, charts, UI checks | reference posts |
| slack-case | cool white, real Slack-style mockups | client case studies |

## Video posts

Reels have no template: same folder shape, `"template": null, "format": "video"`,
and the deliverables are the hook, caption, hashtags, pinned comment, replies
and the guide (see `posts/expensive-employee/`). Post natively to IG + TikTok.

## The rules in one breath

Clone layouts, never words — rewrite everything for founders. Text, logos and
UI mockups are always HTML (real content); image models only make photos,
backgrounds and illustration sets (prompts + exact filenames in
`assets/images/*.md`). Brand is locked in BRAND.md — Cal Sans/Manrope (build
family), Fraunces (editorial family), orange #FF8A00 owns the feed, teal
#0097B2 points to Orbiqon, and the §4b premium rules (88px frame, one type
scale, 8px grid, shadow tokens) are non-negotiable. Keyword CTAs only when the
guide exists. Look at every PNG before it ships. Log results after posting.

## Distribution

IG (native PNGs) → LinkedIn personal profile (linkedin.pdf as document post,
next morning) → Threads (threads.md) → TikTok when there's video. Orbiqon
accounts post proof (client builds), never this content. Cadence while growing:
2 carousels + 1 meme + 1 Orbiqon proof post per week, stories daily.

## History

Built Sep 2026 in Claude Code sessions; predecessor system at
`~/Downloads/carousel-system` (structure carried over). Product roadmap for
turning this into a SaaS: the "Carousel Engine Ladder" brief (artifact).
