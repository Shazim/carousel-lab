# The Capy Founder — recurring meme character

One character, forever: a calm capybara founder (calm = the automation payoff —
the character IS the value proposition). Never switch animals; vary the SCENE.
Base image on file: `capy-founder.png` (phone + coffee at walnut desk).

## Base prompt (Google AI Studio / Nano Banana — reuse verbatim, then vary the action)

```
A photorealistic studio photograph of a capybara founder wearing a plain
beige hoodie, sitting in a black ergonomic office chair at a walnut desk,
[ACTION — e.g. holding a smartphone to its ear with one paw and a white
coffee mug in the other], a slightly open silver laptop on the desk, one
yellow sticky note on the laptop lid. Plain warm cream studio background,
soft even lighting, gentle contact shadow under the desk, shot on 85mm,
clean product-photography look. The top 25% of the frame is empty plain
background. No text, no words, no logos, no watermark anywhere. Portrait 4:5.
```

- Too cartoonish → add "not illustration, not 3D render — photorealistic".
- Same chat session for new scenes: "same capybara, same desk world, now: …"
- Scene ideas: buried in sticky notes · presenting a chart to an empty room ·
  six coffee mugs during launch week · tiny party hat, alone, "we shipped".

## Compositing

Captions, "the team :" logos and the handle are NEVER generated — they're
composited by `templates/meme.js` (real SVG logos from assets/logos/).
See `posts/capy-team-meme/post.json` for the working example + positions.
Caption rescripts stay founder-flex, not stall-jokes ("client: wow, your team
ships fast" > "let me ask my team").
