// Template: icon-grid — bold Poppins, dark/light slides, 2x2 app tile grid,
// floating blurred icons, photo hook cover. Content comes from a post JSON.
const fs = require('fs');
const path = require('path');

const LOGO_DIR = path.join(__dirname, '..', 'assets', 'logos');
const ORANGE = '#FF8A00';

function loadIcon(name) {
  const raw = fs.readFileSync(path.join(LOGO_DIR, name + '.svg'), 'utf8');
  return raw.replace(/<svg([^>]*)>/, (m, attrs) => {
    attrs = attrs.replace(/\s(fill|width|height|style)="[^"]*"/g, '');
    return `<svg${attrs} fill="currentColor" width="100%" height="100%">`;
  });
}

const CUSTOM = {
  mindstudio: `<svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%">
    <path d="M3.5 17.5V10.2c0-2.1 1.7-3.8 3.8-3.8 1.5 0 2.8.85 3.4 2.1.6-1.25 1.9-2.1 3.4-2.1 2.1 0 3.8 1.7 3.8 3.8 0 .3.25.55.55.55 1.7 0 3.05 1.4 3.05 3.05v3.7a1.9 1.9 0 0 1-3.8 0v-3.15a1.05 1.05 0 0 0-2.1 0v3.15a1.9 1.9 0 0 1-3.8 0v-7.1a1.05 1.05 0 0 0-2.1 0v7.1a1.9 1.9 0 0 1-3.8 0Z"/>
  </svg>`,
  botpress: `<svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="currentColor" stroke-width="1.6">
    <path d="M7.2 12 15.6 6.6M7.2 12l8.4 5.4"/>
    <path fill="currentColor" stroke="none" d="M5.2 8.9 8.4 10.7v3.6L5.2 16.1 2 14.3v-3.6zM15.4 3l3.2 1.8v3.6l-3.2 1.8-3.2-1.8V4.8zM15.4 13.8l3.2 1.8v3.6L15.4 21l-3.2-1.8v-3.6z"/>
  </svg>`,
  zapierstar: `<svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor">
    <path d="M14.13 12c0 .63-.11 1.23-.32 1.79-.56.21-1.17.33-1.8.33h-.02c-.63 0-1.24-.12-1.8-.33-.21-.56-.32-1.16-.32-1.79v-.01c0-.63.11-1.23.32-1.79.56-.21 1.17-.33 1.8-.33h.02c.63 0 1.24.12 1.8.33.21.56.32 1.16.32 1.79zM21.5 10.5h-5.88l4.16-4.16c-.33-.46-.7-.9-1.1-1.3-.4-.4-.84-.77-1.3-1.1L13.22 8.1V2.22C12.68 2.13 12.13 2.08 11.56 2.08h-.01c-.57 0-1.12.05-1.66.14V8.1L5.73 3.94c-.46.33-.9.7-1.3 1.1-.4.4-.77.84-1.1 1.3l4.16 4.16H1.61s-.09 1.09-.09 1.65v.01c0 .56.03 1.11.09 1.65h5.88l-4.16 4.16c.33.46.7.9 1.1 1.3.4.4.84.77 1.3 1.1l4.16-4.16v5.88c.54.09 1.09.14 1.65.14h.03c.56 0 1.11-.05 1.65-.14v-5.88l4.16 4.16c.46-.33.9-.7 1.3-1.1.4-.4.77-.84 1.1-1.3l-4.16-4.16h5.88c.06-.54.09-1.09.09-1.65v-.01c0-.56-.03-1.11-.09-1.65z"/>
  </svg>`,
};

function iconHTML(id) {
  if (CUSTOM[id]) return CUSTOM[id];
  if (id === 'autogen') return `<span class="ag">AG</span>`;
  return loadIcon(id);
}

const TOOLS = {
  claude:    { label: 'Claude',     bg: '#CC7A5E', fg: '#FDF4EE', icon: 'claude',       size: 62 },
  gemini:    { label: 'Gemini',     bg: '#FFFFFF', fg: '#4F52E9', icon: 'googlegemini', size: 58 },
  grok:      { label: 'Grok',       bg: '#FFFFFF', fg: '#0B0B0B', icon: 'grok',         size: 58 },
  chatgpt:   { label: 'Chat GPT',   bg: '#3F9E7C', fg: '#FFFFFF', icon: 'openai',       size: 60 },
  zapier:    { label: 'Zapier',     bg: '#FF4F00', fg: '#FFFFFF', icon: 'zapierstar',   size: 56 },
  n8n:       { label: 'n8n',        bg: '#E94A74', fg: '#FFFFFF', icon: 'n8n',          size: 62 },
  make:      { label: 'Make',       bg: '#FFFFFF', fg: '#8A2BE2', icon: 'make',         size: 58 },
  notionai:  { label: 'Notion AI',  bg: '#0E0E0E', fg: '#FFFFFF', icon: 'notion',       size: 54 },
  crewai:    { label: 'Crew AI',    bg: '#FFFFFF', fg: '#0B0B0B', icon: 'crewai',       size: 60 },
  mindstudio:{ label: 'MindStudio', bg: '#FFFFFF', fg: '#0B0B0B', icon: 'mindstudio',   size: 62 },
  autogen:   { label: 'Autogen',    bg: '#2E2E2E', fg: '#C9C9C9', icon: 'autogen',      size: 0  },
  botpress:  { label: 'Botpress',   bg: '#FFFFFF', fg: '#0B0B0B', icon: 'botpress',     size: 58 },
};

const CSS = `
  * { margin:0; padding:0; box-sizing:border-box; }
  .slide { width:1080px; height:1350px; position:relative; overflow:hidden;
           font-family:'Manrope',sans-serif; }
  .dark  { background:#191919; color:#fff; }
  .light { background:radial-gradient(ellipse 90% 70% at 50% 38%, #fdfdfd 0%, #ededed 100%); color:#111; }

  .flow { position:absolute; top:200px; left:0; right:0; bottom:0;
          display:flex; flex-direction:column; align-items:center; }
  .titles { text-align:center; }
  .t1, .t2 { font-family:'Cal Sans',sans-serif; font-size:88px; font-weight:400;
             text-transform:uppercase; line-height:1.04; letter-spacing:0; }
  .t2.orange { color:${ORANGE}; }
  .sub { margin:26px auto 0; max-width:780px; font-size:34px; font-weight:500;
         line-height:1.38; }
  .dark .sub { color:#E9E9E9; }
  .light .sub { color:#2A2A2A; }

  .grid { margin-top:78px; display:flex; flex-direction:column; align-items:center; gap:44px; }
  .grow { display:flex; gap:30px; }
  .cell { display:flex; flex-direction:column; align-items:center; gap:26px; }
  .tile { width:206px; height:206px; border-radius:46px;
          display:flex; align-items:center; justify-content:center;
          box-shadow:0 18px 45px rgba(0,0,0,.18); }
  .light .tile { box-shadow:0 18px 40px rgba(0,0,0,.10); }
  .tile .logo { display:flex; }
  .pill { border:2.5px solid currentColor; border-radius:999px;
          padding:8px 30px; font-size:31px; font-weight:600; }
  .ag { font-size:82px; font-weight:700; letter-spacing:1px;
        background:linear-gradient(180deg,#E8E8E8,#8f8f8f);
        -webkit-background-clip:text; background-clip:text; color:transparent; }

  .float { position:absolute; border-radius:38px;
           display:flex; align-items:center; justify-content:center; }
  .float .logo { display:flex; }

  .cta { position:absolute; top:0; bottom:0; left:0; right:0;
         display:flex; flex-direction:column; align-items:center; justify-content:center;
         text-align:center; }
  .cta .l1 { font-family:'Cal Sans',sans-serif; font-size:58px; font-weight:400; text-transform:uppercase; letter-spacing:0; line-height:1.18; }
  .cta .l2 { font-family:'Cal Sans',sans-serif; font-size:58px; font-weight:400; text-transform:uppercase; color:${ORANGE}; letter-spacing:0; line-height:1.18; }

  .hook { position:absolute; top:170px; left:0; right:0; text-align:center; font-family:'Cal Sans',sans-serif;
          font-size:96px; font-weight:400; line-height:1.06; letter-spacing:-1px; color:#141414; z-index:2; }
  .hl { display:inline-block; background:${ORANGE}; color:#fff; padding:0 34px 8px;
        transform:rotate(-1.5deg); border-radius:6px; }
  .mini { position:absolute; width:78px; height:78px; border-radius:22px;
          display:flex; align-items:center; justify-content:center;
          box-shadow:0 10px 24px rgba(0,0,0,.18); z-index:3; }
  .photo { position:absolute; bottom:0; left:50%; transform:translateX(-50%);
           height:860px; z-index:4;
           filter: drop-shadow(0 34px 70px rgba(20,15,5,.30))
                   drop-shadow(0 8px 22px rgba(20,15,5,.18))
                   contrast(1.04) brightness(1.03) saturate(1.05) sepia(.05); }
  .photo-glow { position:absolute; bottom:-360px; left:50%; transform:translateX(-50%);
           width:1600px; height:1600px; border-radius:50%; z-index:1;
           background:radial-gradient(circle,
             rgba(255,138,0,.34) 0%, rgba(255,150,40,.18) 38%, rgba(255,138,0,0) 64%); }
  .photo-ground { position:absolute; bottom:0; left:0; right:0; height:230px; z-index:2;
           background:linear-gradient(180deg, rgba(0,0,0,0), rgba(60,45,25,.10)); }
  .photo-slot { position:absolute; bottom:0; left:50%; transform:translateX(-50%);
          width:660px; height:760px; border-radius:40px 40px 0 0;
          border:4px dashed #b9b9b9; display:flex; flex-direction:column; gap:18px;
          align-items:center; justify-content:center; color:#9a9a9a;
          font-size:30px; font-weight:500; background:rgba(255,255,255,.5); }
`;

function tile(toolId) {
  const t = TOOLS[toolId];
  const inner = t.icon === 'autogen'
    ? iconHTML('autogen')
    : `<div class="logo" style="width:${t.size}%;height:${t.size}%;color:${t.fg}">${iconHTML(t.icon)}</div>`;
  return `<div class="tile" style="background:${t.bg}">${inner}</div>`;
}

function cell(toolId) {
  return `<div class="cell">${tile(toolId)}<div class="pill">${TOOLS[toolId].label}</div></div>`;
}

function grid(ids) {
  return `<div class="grid">
    <div class="grow">${cell(ids[0])}${cell(ids[1])}</div>
    <div class="grow">${cell(ids[2])}${cell(ids[3])}</div>
  </div>`;
}

const CORNERS = {
  tl: { top: 60, left: -45 },  tr: { top: 60, right: -35 },
  ml: { top: 200, left: -55 }, mr: { top: 230, right: -45 },
  bl: { bottom: -60, left: -55 }, br: { bottom: -65, right: -70 },
};

function float(f) {
  const t = TOOLS[f.tool];
  const pos = { ...(CORNERS[f.corner] || CORNERS.tr) };
  const OPP = { top: 'bottom', bottom: 'top', left: 'right', right: 'left' };
  for (const k of ['top', 'bottom', 'left', 'right']) {
    if (f[k] != null) { delete pos[OPP[k]]; pos[k] = f[k]; }
  }
  const size = f.size || 200;
  const posCss = Object.entries(pos).map(([k, v]) => `${k}:${v}px`).join(';');
  return `<div class="float" style="width:${size}px;height:${size}px;background:${f.bg || t.bg};
      ${posCss};transform:rotate(${f.rotate ?? (f.corner?.includes('l') ? -16 : 17)}deg);
      filter:blur(${f.blur || Math.max(7, Math.round(size / 25))}px);
      border-radius:${Math.round(size * 0.26)}px;${f.z != null ? `z-index:${f.z};` : ''}">
    <div class="logo" style="width:58%;height:58%;color:${f.fg || t.fg}">${iconHTML(t.icon)}</div>
  </div>`;
}

// default float layout when a slide doesn't specify one: alternate corners
function autoFloats(tools, i, theme) {
  const dark = theme === 'dark';
  const a = { tool: tools[0], corner: i % 2 ? 'tl' : 'tr', size: 185 };
  const b = { tool: tools[1] || tools[0], corner: i % 2 ? 'br' : 'bl', size: 285 };
  if (dark) { a.bg = '#FF5A00'; a.fg = '#fff'; b.bg = '#FF5A00'; b.fg = '#fff'; }
  return [a, b];
}

const MINI_POS = [
  { rotate: -12, top: 84, left: 262 },
  { rotate: 16, top: 120, right: 84 },
  { rotate: -16, top: 520, left: 250 },
  { rotate: 12, top: 528, right: 240 },
];

function mini(toolId, pos) {
  const t = TOOLS[toolId];
  const { rotate, ...p } = pos;
  const posCss = Object.entries(p).map(([k, v]) => `${k}:${v}px`).join(';');
  return `<div class="mini" style="background:${t.bg};${posCss};transform:rotate(${rotate}deg)">
    <div class="logo" style="width:56%;height:56%;color:${t.fg}">${iconHTML(t.icon)}</div>
  </div>`;
}

function page(bodyClass, inner) {
  return `<!DOCTYPE html><html><head><meta charset="utf-8">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Cal+Sans&family=Manrope:wght@400..800&display=swap" rel="stylesheet">
  <style>${CSS}</style></head>
  <body><div class="slide ${bodyClass}">${inner}</div></body></html>`;
}

function coverSlide(cover, root) {
  const minis = (cover.minis || []).slice(0, 4)
    .map((t, i) => mini(t, MINI_POS[i])).join('\n');
  const photo = cover.photo
    ? `<div class="photo-glow"></div><div class="photo-ground"></div><img class="photo" src="file://${path.resolve(root, cover.photo)}">`
    : `<div class="photo-slot"><div style="font-size:64px">📸</div>Your cutout photo goes here<br>(transparent PNG)</div>`;
  const floats = (cover.floats || [
    { tool: 'zapier', corner: 'br', size: 260, blur: 10, bottom: 140, right: -40, z: 5 },
    { tool: 'gemini', corner: 'ml', size: 130, blur: 2, top: 990, left: 24, z: 1 },
  ]).map(float).join('\n');
  const hl = cover.highlight ? `<br><span class="hl">${cover.highlight}</span>` : '';
  return page('light', `
    ${floats}
    <div class="hook">${cover.line1}<br>${cover.line2}${hl}</div>
    ${minis}
    ${photo}
  `);
}

function gridSlide(s, i) {
  const floats = (s.floats ? s.floats : autoFloats(s.tools, i, s.theme)).map(float).join('\n');
  return page(s.theme, `
    ${floats}
    <div class="flow">
      <div class="titles">
        <div class="t1">${s.t1}</div>
        <div class="t2 ${s.orangeT2 ? 'orange' : ''}">${s.t2}</div>
        <div class="sub">${s.sub}</div>
      </div>
      ${grid(s.tools)}
    </div>
  `);
}

function ctaSlide(cta) {
  const floats = (cta.floats || [
    { tool: 'claude', corner: 'tr', size: 190, bg: '#FF5A00', fg: '#fff' },
    { tool: 'zapier', corner: 'ml', size: 190 },
    { tool: 'zapier', corner: 'bl', size: 260 },
    { tool: 'n8n', corner: 'br', size: 300 },
  ]).map(float).join('\n');
  return page('light', `${floats}
    <div class="cta"><div class="l1">${cta.line1}</div><div class="l2">${cta.line2}</div></div>
  `);
}

// post JSON -> { 'NN-name': html }
function build(post, { root }) {
  const pages = {};
  let n = 0;
  const pad = (x) => String(x).padStart(2, '0');
  if (post.cover) pages[`${pad(++n)}-cover`] = coverSlide(post.cover, root);
  (post.slides || []).forEach((s, i) => {
    const slug = (s.t1 + '-' + s.t2).toLowerCase().replace(/[^a-z0-9]+/g, '-');
    pages[`${pad(++n)}-${slug}`] = gridSlide(s, i);
  });
  if (post.cta) pages[`${pad(++n)}-cta`] = ctaSlide(post.cta);
  return pages;
}

module.exports = { build };
