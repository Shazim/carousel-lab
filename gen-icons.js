#!/usr/bin/env node
// Usage: node gen-icons.js [icon-name ...]      (no args = all missing icons)
// Generates the watercolor icon set via Gemini API into assets/images/.
// Needs GEMINI_API_KEY in env (source ~/.zshrc first if needed).
// Skips icons whose PNG already exists — safe to re-run until the set is done.
const fs = require('fs');
const path = require('path');

const KEY = process.env.GEMINI_API_KEY;
if (!KEY) { console.error('GEMINI_API_KEY not set. Run: source ~/.zshrc'); process.exit(1); }

const MODEL = process.env.GEMINI_IMAGE_MODEL || 'gemini-2.5-flash-image';
const OUT = path.join(__dirname, 'assets', 'images');

const STYLE = (subject) =>
  `A single ${subject}, hand-painted watercolor illustration, soft muted colors, ` +
  `gentle pigment granulation, clean simple shapes, slight paper texture in the ` +
  `brush strokes, isolated on a plain white background, no text, no letters, ` +
  `no numbers, centered, generous margin around the subject, flat lighting, ` +
  `no cast shadow. Flat watercolor painting, not a 3D render.`;

const ICONS = {
  'wc-agent':     'friendly rounded robot assistant head, soft muted blue-gray',
  'wc-envelope':  'open envelope with a letter sliding out, warm cream',
  'wc-invoice':   'blank paper receipt with only wavy lines suggesting text and a coral percent-sign stamp, no readable words or numbers',
  'wc-wrench':    'crossed wrench and screwdriver, olive green',
  'wc-camera':    'film clapperboard, charcoal and cream',
  'wc-compare':   'two blank polaroid photo frames side by side, warm neutrals',
  'wc-laptop':    'open laptop with abstract code brackets on screen, slate blue',
  'wc-pen':       'fountain pen writing on a small blank page, walnut brown',
  'wc-chat':      'round speech bubble with three dots, soft gray',
  'wc-clock':     'classic alarm clock with plain face, muted red',
  'wc-dashboard': 'small bar-chart dashboard card with plain bars, indigo',
  'wc-note':      'folded note with a coffee ring stain, cream',
  'wc-alert':     'small rotating warning beacon light, soft red-orange',
  'wc-mailbox':   'classic mailbox with flag up, dusty teal',
  'wc-magnet':    'horseshoe magnet, muted crimson',
  'wc-calendar':  'desk calendar with one starred day, coral and cream',
};

async function generate(name, subject) {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`,
    {
      method: 'POST',
      headers: { 'x-goog-api-key': KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: STYLE(subject) }] }],
        generationConfig: {
          responseModalities: ['TEXT', 'IMAGE'],
          imageConfig: { aspectRatio: '1:1' },
        },
      }),
    }
  );
  const data = await res.json();
  if (data.error) throw new Error(`${data.error.code}: ${(data.error.message || '').slice(0, 140)}`);
  const part = (data.candidates?.[0]?.content?.parts || []).find((p) => p.inlineData);
  if (!part) throw new Error('no image in response');
  fs.writeFileSync(path.join(OUT, name + '.png'), Buffer.from(part.inlineData.data, 'base64'));
}

(async () => {
  const requested = process.argv.slice(2);
  const targets = (requested.length ? requested : Object.keys(ICONS))
    .map((n) => n.replace(/\.png$/, ''))
    .filter((n) => {
      if (!ICONS[n]) { console.log('??', n, '(unknown icon, skipped)'); return false; }
      if (!requested.length && fs.existsSync(path.join(OUT, n + '.png'))) {
        console.log('=', n, '(exists, skipped)'); return false;
      }
      return true;
    });

  let ok = 0, failed = [];
  for (const name of targets) {
    try {
      process.stdout.write(`> ${name} ... `);
      await generate(name, ICONS[name]);
      console.log('saved'); ok++;
      await new Promise((r) => setTimeout(r, 4000)); // gentle on rate limits
    } catch (e) {
      console.log('FAILED —', e.message); failed.push(name);
    }
  }
  console.log(`\n${ok} generated, ${failed.length} failed${failed.length ? ': ' + failed.join(', ') : ''}`);
  if (ok) console.log('Next: node render.js founder-vitamins');
})();
