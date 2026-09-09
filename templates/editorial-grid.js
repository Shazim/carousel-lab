// Template: editorial-grid — paper texture + serif (editorial family), but the
// body is a 2x2 grid of visuals (image / stat card / emoji) with underlined labels.
const fs = require('fs');
const path = require('path');

const HI = {
  yellow: '#F2EC4E', lavender: '#DCC5EE', green: '#C7EC82',
  cyan: '#A9E9DB', pink: '#F6C7DE',
};
const INK = ['#2E7D32', '#E07B39', '#4169E1', '#8E44AD', '#E75480'];

const NOISE = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E")`;

function scribble(color, w = 220, variant = 0) {
  const paths = [
    `M6 10 C ${w * 0.25} 2, ${w * 0.55} 16, ${w - 6} 7`,
    `M6 8 C ${w * 0.3} 16, ${w * 0.6} 2, ${w - 6} 11`,
  ];
  return `<svg class="scr" viewBox="0 0 ${w} 20" style="width:${w}px" xmlns="http://www.w3.org/2000/svg">
    <path d="${paths[variant % 2]}" fill="none" stroke="${color}" stroke-width="3.2" stroke-linecap="round"/>
  </svg>`;
}

function hi(word, color) {
  return `<span class="hi" style="background:linear-gradient(transparent 30%, ${color} 30%, ${color} 96%, transparent 96%)">${word}</span>`;
}

// ---- stat cards (the HTML-native visuals) --------------------------------
function chart(v) {
  const c = v.color || '#3E7BFA';
  switch (v.chart) {
    case 'donut':
      return `<div class="donut" style="background:conic-gradient(${c} ${v.pct || 70}%, #E9E8F0 0)"><div class="dhole"></div></div>`;
    case 'bars-down':
      return `<div class="bars">${[68, 50, 34, 18].map((h) => `<div style="height:${h}px;background:${c}"></div>`).join('')}</div>`;
    case 'bars-up':
      return `<div class="bars">${[18, 34, 50, 68].map((h) => `<div style="height:${h}px;background:${c}"></div>`).join('')}</div>`;
    case 'line':
      return `<svg width="150" height="72" viewBox="0 0 150 72">
        <polyline points="6,58 34,44 62,50 90,30 118,34 144,12" fill="none" stroke="${c}" stroke-width="3" stroke-dasharray="1 6" stroke-linecap="round"/>
        ${[[6,58],[34,44],[62,50],[90,30],[118,34],[144,12]].map(([x,y]) => `<circle cx="${x}" cy="${y}" r="4.5" fill="${c}"/>`).join('')}
      </svg>`;
    case 'progress':
      return `<div class="ptrack"><div class="pfill" style="width:${v.pct || 85}%;background:${c}"></div></div>`;
    default: return '';
  }
}

function statCard(v) {
  return `<div class="stat">
    <div class="spill">${v.title}</div>
    <div class="sval" style="color:${v.color || '#3E7BFA'}">${v.value}</div>
    <div class="schart">${chart(v)}</div>
  </div>`;
}

function cellVisual(v, root) {
  if (v.type === 'img' && v.src) {
    const abs = path.resolve(root, v.src);
    if (fs.existsSync(abs)) return `<img class="vimg" src="file://${abs}">`;
    if (v.fallback) return `<div class="vemoji">${v.fallback}</div>`;
  }
  if (v.type === 'stat') return statCard(v);
  return `<div class="vemoji">${v.emoji || v.fallback || '✳️'}</div>`;
}

const CSS = `
  * { margin:0; padding:0; box-sizing:border-box; }
  .slide { width:1080px; height:1350px; position:relative; overflow:hidden;
           background:#EFECE3; font-family:'Fraunces', Georgia, serif;
           font-variation-settings:'opsz' 100; color:#171512; }
  .slide::before { content:''; position:absolute; inset:0; background-image:${NOISE};
           opacity:.4; mix-blend-mode:multiply; pointer-events:none; z-index:0; }
  .wrap { position:absolute; inset:0; display:flex; flex-direction:column;
          align-items:center; padding-top:100px; }

  .title { text-align:center; font-size:78px; font-weight:560; line-height:1.14; letter-spacing:-1.5px; }
  .title .tw { position:relative; display:inline-block; }
  .title .tw .scr { position:absolute; left:50%; transform:translateX(-50%); bottom:-14px; }
  .hi { padding:0 12px; margin:0 -4px; }

  .grid { margin-top:96px; display:grid; grid-template-columns:1fr 1fr;
          column-gap:150px; row-gap:92px; }
  .cell { width:330px; display:flex; flex-direction:column; align-items:center; gap:30px; }
  .vis { height:250px; display:flex; align-items:center; justify-content:center; }
  .vemoji { font-size:160px; line-height:1;
            filter:saturate(.9) drop-shadow(0 12px 22px rgba(40,30,10,.18)); }
  .vimg { max-height:250px; max-width:300px;
          filter:drop-shadow(0 12px 22px rgba(40,30,10,.15)); }
  .label { font-size:40px; font-weight:520; letter-spacing:-.3px;
           display:flex; flex-direction:column; align-items:center; }
  .label .scr { margin-top:0px; }

  .stat { width:250px; background:#fff; border-radius:24px; padding:20px 22px 24px;
          box-shadow:0 16px 32px rgba(40,30,10,.12), 0 2px 6px rgba(40,30,10,.06);
          display:flex; flex-direction:column; align-items:center; gap:10px; }
  .spill { font-family:'Inter',sans-serif; font-size:21px; color:#6d6a64;
           background:#F0EFEA; border-radius:10px; padding:5px 16px; }
  .sval { font-family:'Inter',sans-serif; font-size:42px; font-weight:600; }
  .schart { display:flex; align-items:flex-end; justify-content:center; min-height:78px; }
  .donut { width:110px; height:110px; border-radius:50%; display:flex;
           align-items:center; justify-content:center; }
  .dhole { width:62px; height:62px; border-radius:50%; background:#fff; }
  .bars { display:flex; align-items:flex-end; gap:10px; height:72px; }
  .bars div { width:22px; border-radius:5px 5px 2px 2px; }
  .ptrack { width:170px; height:26px; border:2.5px solid #d8d6cf; border-radius:14px;
            padding:3px; }
  .pfill { height:100%; border-radius:9px; }

  .center { position:absolute; inset:0; display:flex; flex-direction:column;
            align-items:center; justify-content:center; text-align:center; z-index:1; }
  .kicker { font-family:'Inter',sans-serif; font-size:23px; font-weight:600;
            letter-spacing:6px; text-transform:uppercase; color:#8a857c; }
  .big { font-size:116px; font-weight:580; letter-spacing:-3px; line-height:1.1; margin-top:22px; }
  .subline { font-family:'Inter',sans-serif; font-size:29px; font-weight:400;
             color:#55524b; margin-top:48px; max-width:700px; line-height:1.5; }
  .handle { position:absolute; bottom:70px; left:0; right:0; text-align:center;
            font-family:'Inter',sans-serif; font-size:26px; letter-spacing:2px; color:#8a857c; }
  .scr { display:block; }
`;

function page(inner) {
  return `<!DOCTYPE html><html><head><meta charset="utf-8">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400..650&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
  <style>${CSS}</style></head><body><div class="slide">${inner}</div></body></html>`;
}

function gridSlide(s, i, root) {
  const colors = Object.values(HI);
  const hiColor = s.color ? HI[s.color] : colors[i % colors.length];
  const cells = s.items.map((item, j) => `
    <div class="cell">
      <div class="vis">${cellVisual(item.visual || {}, root)}</div>
      <div class="label">${item.label}${scribble(INK[(i + j) % INK.length], Math.min(300, 34 + item.label.length * 22), j)}</div>
    </div>`).join('');
  return page(`<div class="wrap">
    <div class="title">
      ${s.line1seg1 || 'Your'} <span class="tw">${s.underlineWord || 'startup'}${scribble(INK[(i + 1) % INK.length], 200, i)}</span> ${s.line1seg2 || 'needs'}<br>
      ${hi(s.headline, hiColor)}
    </div>
    <div class="grid">${cells}</div>
  </div>`);
}

function build(post, { root }) {
  const pages = {};
  let n = 0;
  const pad = (x) => String(x).padStart(2, '0');

  if (post.cover) {
    pages[`${pad(++n)}-cover`] = page(`
      <div class="center">
        <div class="kicker">${post.cover.kicker || ''}</div>
        <div class="big">${post.cover.line1}<br>${hi(post.cover.line2, HI[post.cover.color] || HI.lavender)}</div>
        <div class="subline">${post.cover.sub || ''}</div>
      </div>
      ${post.handle ? `<div class="handle">${post.handle}</div>` : ''}
    `);
  }

  (post.slides || []).forEach((s, i) => {
    const slug = s.headline.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    pages[`${pad(++n)}-${slug}`] = gridSlide(s, i, root);
  });

  if (post.cta) {
    pages[`${pad(++n)}-cta`] = page(`
      <div class="center">
        <div class="kicker">${post.cta.kicker}</div>
        <div class="big">${post.cta.line1}<br>${hi(post.cta.line2, HI[post.cta.color] || HI.yellow)}</div>
        <div class="subline">${post.cta.sub || ''}</div>
      </div>
      ${post.handle ? `<div class="handle">${post.handle}</div>` : ''}
    `);
  }
  return pages;
}

module.exports = { build };
