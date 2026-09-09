# Watercolor icon set — generation prompts (Google AI / Imagen)

The founder-vitamins post renders with emoji fallbacks until these exist.
Generate each icon, remove/keep the transparent background, save with the EXACT
filename below into `assets/images/`, then re-run `node render.js founder-vitamins`
— the template swaps emoji → image automatically.

## Style skeleton (paste this + one subject line)

```
A single [SUBJECT], hand-painted watercolor illustration, soft muted colors,
gentle pigment granulation, clean shapes, slight paper texture in the strokes,
isolated on a plain white background, no text, no letters, no numbers,
centered, generous margin around the subject, flat lighting, no cast shadow.
```

Generate all icons in ONE chat session so the style stays consistent.
Export ~1024x1024 PNG. White bg is fine (paper bg hides it after light feathering);
transparent is better if the tool offers it.

## The set (filename → subject line)

| File | Subject |
|---|---|
| wc-agent.png | friendly rounded robot assistant, soft blue-gray |
| wc-envelope.png | open envelope with a letter sliding out, warm cream |
| wc-invoice.png | paper receipt with a percent stamp, soft coral |
| wc-wrench.png | crossed wrench and screwdriver, olive green |
| wc-camera.png | vintage film clapperboard, charcoal and cream |
| wc-compare.png | two polaroid photos side by side, warm neutrals |
| wc-laptop.png | open laptop with code brackets on screen, slate blue |
| wc-pen.png | fountain pen writing on a small page, walnut brown |
| wc-chat.png | round speech bubble with three dots, soft gray |
| wc-clock.png | classic alarm clock, muted red |
| wc-dashboard.png | small bar-chart dashboard card, indigo bars |
| wc-note.png | folded morning-brief note with a coffee ring, cream |
| wc-alert.png | small rotating warning beacon, soft red-orange |
| wc-mailbox.png | classic mailbox with flag up, dusty teal |
| wc-magnet.png | horseshoe magnet, muted crimson |
| wc-calendar.png | desk calendar with one starred day, coral and cream |

## Tips

- If a result comes back glossy/3D, add: "flat watercolor painting, not 3D render".
- If it adds text anywhere, regenerate — lettering always comes back garbled.
- Keep one accent color per icon; the paper background does the harmonizing.
