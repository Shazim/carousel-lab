// Editorial template — paper texture, serif, highlighter marks, chat-input mockups
const fs = require('fs');
const path = require('path');


const HI = {
  yellow:   '#F2EC4E',
  lavender: '#DCC5EE',
  green:    '#C7EC82',
  cyan:     '#A9E9DB',
  pink:     '#F6C7DE',
};
const INK = ['#2E7D32', '#E07B39', '#4169E1', '#8E44AD', '#E75480']; // scribble colors
const CLAY = '#C96442';

const NOISE = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E")`;

const CLAUDE_BURST = fs.readFileSync(path.join(__dirname, '..', 'assets', 'logos', 'claude.svg'), 'utf8')
  .replace(/<svg([^>]*)>/, (m, a) => `<svg${a.replace(/\sfill="[^"]*"/, '')} fill="${CLAY}" width="100%" height="100%">`);

function scribble(color, w = 250, variant = 0) {
  const paths = [
    `M6 10 C ${w * 0.25} 2, ${w * 0.55} 16, ${w - 6} 7`,
    `M6 8 C ${w * 0.3} 16, ${w * 0.6} 2, ${w - 6} 11`,
  ];
  const second = variant % 2 === 0
    ? `<path d="M${w * 0.08} 15 C ${w * 0.4} 9, ${w * 0.7} 17, ${w * 0.8} 12" fill="none" stroke="${color}" stroke-width="2.4" stroke-linecap="round" opacity="0.85"/>` : '';
  return `<svg class="scr" viewBox="0 0 ${w} 20" style="width:${w}px" xmlns="http://www.w3.org/2000/svg">
    <path d="${paths[variant % 2]}" fill="none" stroke="${color}" stroke-width="3" stroke-linecap="round"/>${second}
  </svg>`;
}

function hi(word, color) {
  return `<span class="hi" style="background:linear-gradient(transparent 30%, ${color} 30%, ${color} 96%, transparent 96%)">${word}</span>`;
}

function card(text) {
  return `<div class="card">
    <div class="ctext">${text}</div>
    <div class="crow">
      <span class="plus">+</span>
      <span class="cright"><span class="model">Opus 4.8 <svg width="15" height="9" viewBox="0 0 15 9" fill="none"><path d="M1.5 1.5 7.5 7.5 13.5 1.5" stroke="#8f8b85" stroke-width="1.8" stroke-linecap="round"/></svg></span>
      <span class="send"><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 20V5M12 5 5.5 11.5M12 5l6.5 6.5" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg></span></span>
    </div>
  </div>`;
}

function section(label, text, inkColor, variant) {
  return `<div class="sec">
    <div class="sech">${label}${scribble(inkColor, 240, variant)}</div>
    ${card(text)}
  </div>`;
}

const CSS = `
  * { margin:0; padding:0; box-sizing:border-box; }
  .slide { width:1080px; height:1350px; position:relative; overflow:hidden;
           background:#EFECE3; font-family:'Fraunces', Georgia, serif; font-variation-settings:'opsz' 100; color:#171512; }
  .slide::before { content:''; position:absolute; inset:0; background-image:${NOISE};
           opacity:.4; mix-blend-mode:multiply; pointer-events:none; }
  .wrap { position:absolute; inset:0; padding:84px 96px 72px; display:flex; flex-direction:column; }

  .title { font-size:74px; font-weight:560; line-height:1.05; letter-spacing:-1.5px; }
  .hi { padding:0 10px; margin:0 -4px; box-decoration-break:clone; -webkit-box-decoration-break:clone; }

  .sec { margin-top:42px; }
  .sech { font-size:44px; font-weight:530; letter-spacing:0; display:inline-flex; flex-direction:column; gap:2px; }
  .scr { display:block; margin-top:-4px; }

  .card { margin-top:24px; background:#2B2A28; border-radius:28px; padding:28px 40px 18px;
          box-shadow:0 14px 34px rgba(30,25,15,.14); }
  .ctext { font-family:'Inter', sans-serif; font-size:23px; font-weight:400;
           color:#E3E0DA; line-height:1.52; letter-spacing:.1px; }
  .crow { display:flex; align-items:center; justify-content:space-between; margin-top:18px; }
  .plus { font-family:'Inter',sans-serif; font-size:32px; font-weight:300; color:#8f8b85; }
  .cright { display:flex; align-items:center; gap:22px; }
  .model { font-family:'Inter',sans-serif; font-size:21px; color:#8f8b85;
           display:inline-flex; align-items:center; gap:8px; }
  .send { width:48px; height:48px; border-radius:15px; background:${CLAY};
          display:inline-flex; align-items:center; justify-content:center; }

  /* cover + cta */
  .center { position:absolute; inset:0; display:flex; flex-direction:column;
            align-items:center; justify-content:center; text-align:center; }
  .big { font-size:124px; font-weight:580; letter-spacing:-3px; line-height:1; }
  .vs { font-size:40px; font-style:italic; font-weight:420; margin:38px 0; color:#55524b; }
  .brand { display:flex; align-items:center; gap:34px; margin-top:110px; }
  .brand .burst { width:130px; height:130px; transform:rotate(-8deg); }
  .brand .bt { font-size:88px; font-weight:560; letter-spacing:-2px; display:flex; flex-direction:column; }
  .handle { position:absolute; bottom:70px; left:0; right:0; text-align:center;
            font-family:'Inter',sans-serif; font-size:26px; letter-spacing:2px; color:#8a857c; }
  .kicker { font-family:'Inter',sans-serif; font-size:23px; font-weight:600; letter-spacing:6px; text-transform:uppercase; color:#8a857c; display:flex; flex-direction:column; align-items:center; }
  .cta-big { font-size:112px; font-weight:580; letter-spacing:-3px; line-height:1.08; margin-top:26px; }
`;

function page(inner) {
  return `<!DOCTYPE html><html><head><meta charset="utf-8">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400..650&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
  <style>${CSS}</style></head><body><div class="slide">${inner}</div></body></html>`;
}

function topicSlide({ n, before, word, after, color, ink, bad, good, great }) {
  const title = `${n} - ${before || ''}${hi(word, color)}${after || ''}`;
  return page(`<div class="wrap">
    <div class="title">${title}</div>
    ${section('Bad Prompt', bad, ink[0], 0)}
    ${section('Good Prompt', good, ink[1], 1)}
    ${section('Great Prompt', great, ink[2], 0)}
  </div>`);
}

// post JSON -> { 'NN-name': html }
function build(post) {
  const pages = {};
  let n = 0;
  const pad = (x) => String(x).padStart(2, '0');
  const colors = Object.values(HI);

  if (post.cover) {
    const words = post.cover.words.map((w, i) =>
      `<div class="big">${hi(w, colors[i % colors.length])}</div>`
    ).join('<div class="vs">vs</div>');
    pages[`${pad(++n)}-cover`] = page(`
      <div class="center" style="padding-top:40px">
        ${words}
        <div class="brand">
          <div class="burst">${CLAUDE_BURST}</div>
          <div class="bt"><span>${post.cover.brand}</span>${scribble(INK[0], 440, 0)}</div>
        </div>
      </div>
      ${post.handle ? `<div class="handle">${post.handle}</div>` : ''}
    `);
  }

  (post.topics || []).forEach((t, i) => {
    const color = t.color ? HI[t.color] : colors[i % colors.length];
    const ink = [INK[i % 5], INK[(i + 2) % 5], INK[(i + 4) % 5]];
    const slug = t.word.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    pages[`${pad(++n)}-${slug}`] = topicSlide({
      n: i + 1, before: t.before, word: t.word, after: t.after,
      color, ink, bad: t.bad, good: t.good, great: t.great,
    });
  });

  if (post.cta) {
    pages[`${pad(++n)}-cta`] = page(`
      <div class="center">
        <div class="kicker">${post.cta.kicker}${scribble(INK[1], 300, 1)}</div>
        <div class="cta-big">${post.cta.big}</div>
        ${scribble(INK[0], 560, 0)}
      </div>
      ${post.handle ? `<div class="handle">${post.handle}</div>` : ''}
    `);
  }
  return pages;
}

module.exports = { build };
