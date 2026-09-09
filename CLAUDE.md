# carousel-lab

**Read `AGENTS.md` first — it is the operator manual for this folder** (workflow,
rules, image pipeline, distribution). Then:

- `BRAND.md` — locked brand system: fonts, colors, spacing grid, anti-AI rules.
- `TEMPLATES.md` — post.json schema for each of the 6 templates.

Quick commands (run from this folder):

```bash
node render.js <post-slug>                    # slides + contact sheet + linkedin.pdf + threads.md
node new-post.js <slug> <template> "Title"    # scaffold a post
```

Non-negotiables: never generate text/logos/whole slides with image models;
rewrite reference content for the founder audience, never copy; look at every
rendered PNG before delivering; content lives in post.json, design lives in
templates/; the handle @shazimbuilds appears on every slide.
