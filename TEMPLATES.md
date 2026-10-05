# TEMPLATES.md — template catalog & post.json schemas

Every template is a CommonJS module in `templates/` exporting
`build(post, { root }) -> { '<NN-name>': '<html>' }`. render.js writes each page
to `posts/<slug>/build/`, screenshots 1080×1350 PNGs to `posts/<slug>/exports/`,
then builds `_contact.png`, `exports/linkedin.pdf` and `threads.md`.

Common post.json meta (all templates):

```json
{
  "slug": "…", "title": "…", "topic": "…", "handle": "@shazimbuilds",
  "keyword": null, "guideUrl": null, "status": "draft", "posted": null,
  "results": { "reach": null, "saves": null, "shares": null, "comments": null, "follows": null },
  "notes": "…", "template": "<template-name>"
}
```

`keyword` non-null ⇒ `guide/guide.html` must exist before posting.

## Logo ids (assets/logos/, auto-inlined + recolorable)

claude · googlegemini · grok · openai · zapier(wordmark — prefer custom
`zapierstar` in icon-grid) · n8n · make · notion · crewai · gmail · googledrive
· googlecalendar · googlesheets · googledocs · googlechrome · github · stripe
· linear · figma · postgresql · whatsapp · instagram · x.
Hand-drawn inside templates: mindstudio, botpress, zapierstar, autogen ("AG" text).
`slack.svg` is an empty dead file — do not use. New logo: fetch SVG into
assets/logos/ (simpleicons CDN `https://cdn.simpleicons.org/<slug>`, or lobehub
`https://unpkg.com/@lobehub/icons-static-svg@latest/icons/<slug>.svg` for AI
brands), then reference by filename.

---

## 1. icon-grid — bold dark/light tool grids (Family A)

Cal Sans titles + Manrope, dark `#191919` / light radial slides, 2×2 app tiles
with pill labels, blurred floating tiles, photo hook cover (cutout from
`shazim/` + orange glow + silhouette drop-shadow, built-in).

```json
"cover": { "line1": "I wish someone", "line2": "had told me this",
           "highlight": "sooner", "photo": "shazim/one.png",
           "minis": ["chatgpt","zapier","n8n","notionai"] },
"slides": [ { "theme": "dark|light", "t1": "Prompt", "t2": "Engineering",
              "orangeT2": true, "sub": "one sentence…",
              "tools": ["claude","gemini","grok","chatgpt"],
              "floats": [ { "tool": "claude", "corner": "tl|tr|ml|mr|bl|br",
                            "size": 185, "bg": "#FF5A00", "fg": "#fff",
                            "blur": 8, "z": 5, "top": 60 } ] } ],
"cta": { "line1": "Follow for more AI", "line2": "Tips, Tricks & Tutorials" }
```

Tool ids here are TOOLS-map keys (claude, gemini, grok, chatgpt, zapier, n8n,
make, notionai, crewai, mindstudio, autogen, botpress) — add new ones in the
TOOLS map in the template. Dark-slide floats look best with `bg:#FF5A00, fg:#fff`.
Cover photo omitted ⇒ dashed placeholder slot renders.

## 2. editorial — Bad/Good/Great chat cards (Family B)

Paper + noise, Fraunces (roman, no italics), marker highlights, scribble
underlines, dark chat-input mockups ("Opus 4.8" chip + send button).

```json
"cover": { "words": ["Bad","Good","Great"], "brand": "Claude Prompts" },
"topics": [ { "word": "Content", "after": " Ideas",
              "color": "yellow|lavender|green|cyan|pink",
              "bad": "…", "good": "…", "great": "… Think step by step." } ],
"cta": { "kicker": "Follow For More", "big": "AI & Building" }
```

Constraint: `great` text ≤ ~480 chars or the card crowds the frame. 5 topics is
the sweet spot (7 slides total).

## 3. editorial-grid — title + 2×2 visual grid (Family B)

Vitamin-style: Fraunces title with highlighted word, grid cells = image / stat
card / emoji fallback, scribble-underlined labels.

```json
"cover": { "kicker": "the founder checkup", "line1": "Your startup is",
           "line2": "vitamin deficient", "color": "lavender", "sub": "…" },
"slides": [ { "headline": "Vitamin A", "color": "yellow", "underlineWord": "startup",
  "items": [
    { "label": "Agents", "visual": { "type": "img",
        "src": "assets/images/wc-agent.png", "fallback": "🤖" } },
    { "label": "Admin time", "visual": { "type": "stat",
        "title": "Admin hrs / week", "value": "−9 hrs", "color": "#E07B39",
        "chart": "donut|bars-down|bars-up|line|progress", "pct": 72 } } ] } ],
"cta": { "kicker": "want the full prescription?", "line1": "Comment",
         "line2": "VITAMIN", "color": "yellow", "sub": "…" }
```

Exactly 4 items per slide. img cells auto-swap from emoji when the file exists.
Watercolor prompts for the pending set: `assets/images/ICON-PROMPTS.md`.
Stat values must be short ("−9 hrs", "+120%") or they wrap.

## 4. level-series — landscape bg + serif levels + UI mockups

The "9 Levels" style. Fixed 88px frame; ONE title scale for all slides; colored
macOS folders + Lvl pill + `@shazimbuilds` byline; SVG dune fallback background
(image slots: `assets/images/lvl-bg.png` per-slide, `lvl-bg-cover.png` cover —
auto-used when present, or set `bgimg` per slide).

```json
"cover": { "kicker": "The 9 levels of", "title": "Claude Code",
           "levels": [ { "label": "Terminal", "color": "#AECBEE" }, … 9 ] },
"levels": [ { "n": 1, "title": "Terminal", "color": "#AECBEE",
  "align": "right?", "mockPos": "top?", "tilt": -1.5,
  "def": "one-line definition", "body": "2–3 line explanation",
  "chips": ["…","…","…"],
  "mock": { "type": "toolcalls|lines|cmdlist|skilllist", "title": "Claude Code",
            "sub": "…", "meter": "38.4k / 1M",
            "rows|lines": "see posts/claude-code-levels/post.json" },
  "logos": ["notion", "… 8 ids (replaces mock — logo grid slide)"],
  "diagram": ["security review","test runner","docs writer"] } ],
"cta": { "line1": "Want the", "mark": "roadmap", "line2": "?", "sub": "…",
         "pill": "@shazimbuilds" }
```

Extensions (added for skills-once):
- `"pill": "Step"` replaces the "Lvl" label on slides and the cover.
- A slide without `n` drops the folder + pill and shows `kicker` instead
  (intro / payoff slides in a numbered set).
- Mock types `names` (`rows: [{icon,name,term,hot}]`) and `skill`
  (`tabs: [...]`, `active: i`, `lines: [...]` — tabs before `active` show ✓).
- Cover `titleSize` (px) for long titles; use `<br>` to control the break.
- Backgrounds resolve `assets/images/lvl-bg.{png,jpg}` / `lvl-bg-cover.{png,jpg}`.

Mock `lines` accept spans: `class='dim|grn|org|cy|yl|hlt'`. Inside `lines`, use
`&nbsp;` for indentation. `mockPos:"top"` shrinks the window font, never the
titles. Chips: ≤3, they must clear the bottom margin — verify visually.

## 5. agent-recipes — floating card + WHEN/DO/SEND workflows (Family A light)

The "5 agents" style. Cream card on darker ground, page counter, clay kicker,
Cal Sans title, connects chips, agent workflow window, mono "Try:" line,
footer brand bar (burst + handle) on every slide.

```json
"cover": { "line1": "5 AI agents", "line2": "every founder needs" },
"slides": [
 { "type": "idea", "slug": "the-idea", "kicker": "The idea", "title": "…",
   "body": "…", "tools": [{ "icon": "gmail", "label": "Gmail" } ×8],
   "formula": ["Role","Goal","Rules","Tools","Output"] },
 { "type": "agent", "slug": "lead-concierge", "kicker": "Agent 1",
   "title": "Lead Concierge", "body": "…",
   "connects": [{ "icon": "gmail", "label": "Gmail" } ×3],
   "agent": { "name": "concierge", "status": "live",
     "rows": [ { "s": "WHEN|DO|SEND", "icon": "gmail", "t": "…" } ×4 ] },
   "try": "one-line example prompt" },
 { "type": "recipe", "kicker": "…", "title": "…", "body": "…",
   "lines": [ { "k": "Role", "v": "you are my ____." } ×5 ], "note": "…<b>…</b>" },
 { "type": "unlock", "kicker": "…", "title": "…", "body": "…",
   "connectors": [{ "icon": "gmail", "label": "Gmail" } ×6] } ],
"cta": { "line1": "Your turn.", "line2": "5 agents. One weekend.",
         "icons": ["gmail","…×6"], "body": "…", "pill": "Comment AGENTS" }
```

Agent rows: exactly 1 WHEN, 2 DO, 1 SEND reads best. Body ≤ 2 lines, title 1 line.

Extensions (added for launch-checks):
- Stages also accept `TRY` / `FAIL` / `FIX` / `PASS` (check-style workflows).
- `"accent": { "main", "dark", "soft", "text" }` swaps the Claude clay for any
  accent — use brand orange `#D9620B / #B9530A / #F6DCC6 / #9C4508` for
  non-Claude topics.
- `connectsLabel` (default "connects"); chips may omit `icon`; any icon may set `color`.
- `try` is optional; `tryLabel` (default "Try:"), `tryRaw: true` drops the quotes.
- Cover: `kicker`, `big` (giant number, `<span class='tl'>~</span>` for a small
  tilde), `icons: [{icon,color}]` + `caption` replace the burst tile.
- `"type": "scan"` — `nums: [{n,t,hot}]` + `builders: [{icon?,label,color?}]`.
- `"type": "matrix"` — `cols: ["$5K","$15K"]`, `rows: [..]` → off/on toggle table.

## 6. meme — single image + composited caption/logos/handle

Base photo generated (see `assets/images/CHARACTER-CAPY.md` for the recurring
character), everything textual composited in code. Positions are absolute px on
the 1080×1350 canvas — tune by rendering and looking.

```json
"meme": { "image": "assets/images/capy-founder.png",
  "caption": ["line one", "line two"], "captionY": 66, "captionSize": 66,
  "captionColor": "#26201A (optional)",
  "team": { "x": 640, "y": 400, "w": 400, "label": "the team :",
    "items": [ { "icon": "claude", "label": "claude", "color": "#26201A?" } ×4 ] },
  "handleX": 672, "handleY": 1232, "handleColor": "rgba(255,255,255,.8)" }
```

## 7. model-cards — dark spec sheet (Family A, black + orange)

Data-dense reference posts: model/price cards, money charts, UI-mockup checks.
`"theme": "light"` switches to the light palette (dark logo tiles stay dark).
Kicker + Cal Sans title + body are top-anchored and identical on every slide;
the content block centres in the remaining space. A single card auto-scales to
a hero ("solo"). Posts: ai-model-picker, launch-checks.

```json
"theme": "light (optional)",
"cover": { "kicker": "…", "big": "<span class='tl'>~</span>5,000 (optional giant number)",
           "title": "… <em>orange words</em>", "sub": "…",
           "logos": ["claude","openai","googlegemini","copilot"], "stamp": "optional" },
"slides": [
 { "type": "cards", "kicker": "Rule 1", "title": "…", "body": "…",
   "cards": [ { "icon": "claude", "name": "Claude Opus 5.5", "note": "…",
                "price": "$4 / $20", "priceNote": "UNTIL …", "pick": true },
              { "icon": "copilot", "name": "Copilot", "where": "Microsoft 365" } ] },
 { "type": "chart", "bars": [ { "label": "…", "value": 30, "display": "~$30", "win": false } ], "foot": "…" },
 { "type": "stat", "stat": "~0.5s", "cap": "…" },
 { "type": "flow", "steps": [ { "t": "…", "s": "…", "hot": true } ], "closer": "… <b>…</b>" },
 { "type": "scan", "nums": [ { "n": "380,000", "t": "apps scanned" }, { "n": "~5,000", "t": "…", "hot": true } ],
   "chips": ["Lovable","Replit"] },
 { "type": "mock", "mock": { "kind": "urlbar|terminal|tables|payment|steps", "title": "window title", "…": "see posts/launch-checks" } },
 { "type": "compare", "options": [ { "amt": "$5K", "lbl": "…" },
     { "amt": "$15K", "lbl": "…", "pick": true, "ticks": ["…"] } ] } ],
"cta": { "q": "… <em>…</em>?", "sub": "…", "pill": "DM @shazimbuilds (optional)" }
```

Any slide may add `"note"` (small footnote under the content block).
Logo ids used: claude, openai, googlegemini, copilot (LobeHub — the real
Microsoft Copilot mark; never use githubcopilot for Microsoft 365).
Semantic pass/fail colours (`--ok` / `--bad`) are only for check outcomes —
never decoration. Prices: JetBrains Mono, tabular-nums.

---

## Building a NEW template (the process that works)

1. Study the reference: list every element, decide HTML vs image per element.
2. Sketch the vertical budget in px before coding (84/88px frame top/bottom;
   everything must fit at ONE type scale — shrink mockups/content, never type).
3. Use BRAND.md tokens: family fonts, shadow tokens sm/md/lg, 8px spacing grid.
4. Make it data-driven from day one — content lives in post.json only.
5. Include fallbacks for every image slot.
6. Render → inspect PNGs → fix → repeat. Check the two classic bugs: font-stack
   fallbacks inside mockups (Times leaking in), and bottom-margin violations.
7. Register the template in this file with its schema.
