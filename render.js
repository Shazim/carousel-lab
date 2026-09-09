#!/usr/bin/env node
// Usage: node render.js <post-slug>
// Reads posts/<slug>/post.json, renders 1080x1350 PNGs + _contact.png
// into posts/<slug>/exports/
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const arg = (process.argv[2] || '').replace(/^posts\//, '').replace(/\/$/, '');
if (!arg) {
  const available = fs.readdirSync(path.join(__dirname, 'posts'))
    .filter((d) => fs.existsSync(path.join(__dirname, 'posts', d, 'post.json')));
  console.error('Usage: node render.js <post-slug>\nAvailable posts: ' + available.join(', '));
  process.exit(1);
}

const postDir = path.join(__dirname, 'posts', arg);
const post = JSON.parse(fs.readFileSync(path.join(postDir, 'post.json'), 'utf8'));
const template = require(path.join(__dirname, 'templates', post.template + '.js'));
const outDir = path.join(postDir, 'exports');   // PNGs only
const buildDir = path.join(postDir, 'build');    // HTML only
fs.mkdirSync(outDir, { recursive: true });
fs.mkdirSync(buildDir, { recursive: true });

const shoot = (htmlPath, pngPath, size, fullPage = false) =>
  execSync(
    `npx playwright screenshot --viewport-size=${size} --wait-for-timeout=3000 ${fullPage ? '--full-page ' : ''}"file://${htmlPath}" "${pngPath}"`,
    { stdio: 'pipe' }
  );

const pages = template.build(post, { root: __dirname });
const names = Object.keys(pages);

for (const name of names) {
  const htmlPath = path.join(buildDir, name + '.html');
  fs.writeFileSync(htmlPath, pages[name]);
  shoot(htmlPath, path.join(outDir, name + '.png'), '1080,1350');
  console.log('✓', name + '.png');
}

// contact sheet — all slides as one image, to judge the set at a glance
const thumbs = names.map((n) =>
  `<div style="text-align:center"><img src="../exports/${n}.png" style="width:100%;display:block;border-radius:8px"><div style="font:13px sans-serif;color:#888;margin-top:6px">${n}</div></div>`
).join('');
const contactHtml = `<!DOCTYPE html><html><body style="margin:0;background:#1c1c1c;padding:24px">
  <div style="display:grid;grid-template-columns:repeat(${Math.min(names.length, 4)},1fr);gap:20px">${thumbs}</div>
</body></html>`;
const contactPath = path.join(buildDir, '_contact.html');
fs.writeFileSync(contactPath, contactHtml);
shoot(contactPath, path.join(outDir, '_contact.png'), '1720,600', true);
console.log('✓ _contact.png');

// LinkedIn document post: all slides as one PDF at exact slide size
const pdfPages = names.map((n) =>
  `<div style="width:1080px;height:1350px;page-break-after:always;overflow:hidden"><img src="../exports/${n}.png" style="width:1080px;height:1350px;display:block"></div>`
).join('');
const pdfHtml = `<!DOCTYPE html><html><head><style>@page{size:1080px 1350px;margin:0}*{margin:0;padding:0}</style></head><body>${pdfPages}</body></html>`;
const pdfSrc = path.join(buildDir, '_linkedin.html');
fs.writeFileSync(pdfSrc, pdfHtml);

// Threads draft: hook + spine as a text thread
const spine = []
  .concat((post.levels || []).map((l, i) => `${i + 1}. ${l.title}`))
  .concat((post.slides || []).map((sl, i) => sl.title ? `${i + 1}. ${sl.title}` : null).filter(Boolean))
  .concat((post.topics || []).map((t, i) => `${i + 1}. ${t.word}${t.after || ''}`));
const threads = `# Threads draft — ${post.title}

Post 1 (hook):
${post.title.toLowerCase()} — the full breakdown 🧵

Post 2 (spine):
${spine.join('\n')}

Post 3 (CTA):
${post.keyword ? `full pack is free — comment ${post.keyword} on the IG version (@shazimbuilds) and it's yours.` : 'full version is on IG — @shazimbuilds.'}

(edit voice before posting — this is a draft skeleton)
`;
fs.writeFileSync(path.join(postDir, 'threads.md'), threads);
console.log('✓ threads.md');

(async () => {
  const { chromium } = require('playwright');
  const browser = await chromium.launch();
  const pg = await browser.newPage();
  await pg.goto('file://' + pdfSrc);
  await pg.pdf({ path: path.join(outDir, 'linkedin.pdf'),
    preferCSSPageSize: true, printBackground: true });
  await browser.close();
  console.log('✓ linkedin.pdf');
  console.log(`\n${names.length} slides -> posts/${arg}/exports/`);
})();
