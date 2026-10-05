// Template: agent-recipes — floating warm card, page counter, kicker/title/body,
// connects chips, WHEN/DO/SEND agent workflow windows, recipe + connector slides.
// Family A light: Cal Sans + Manrope on paper. 1080x1350.
const fs = require('fs');
const path = require('path');

const LOGO_DIR = path.join(__dirname, '..', 'assets', 'logos');
const INK = '#1E1A15';
const MUTE = '#6E675D';
const CLAY = '#C96442';
const SH_SM = '0 4px 14px rgba(60,50,35,.06)';
const SH_MD = '0 12px 32px rgba(60,50,35,.09), 0 3px 8px rgba(60,50,35,.04)';

function loadIcon(name) {
  const raw = fs.readFileSync(path.join(LOGO_DIR, name + '.svg'), 'utf8');
  return raw.replace(/<svg([^>]*)>/, (m, attrs) => {
    attrs = attrs.replace(/\s(width|height|style)="[^"]*"/g, '');
    return `<svg${attrs} width="100%" height="100%">`;
  });
}

const BURST = (c = '#fff') => `<svg viewBox="0 0 24 24" fill="${c}" width="100%" height="100%"><path d="M12 1.6l1.9 7.5 7.5 1.9-7.5 1.9-1.9 7.5-1.9-7.5L2.6 11l7.5-1.9z"/></svg>`;

const CSS = `
  * { margin:0; padding:0; box-sizing:border-box; }
  .slide { width:1080px; height:1350px; background:#E6E1D6; position:relative;
           font-family:'Manrope',sans-serif; color:${INK}; overflow:hidden; }
  .card { position:absolute; inset:56px; background:#F3EFE6; border-radius:44px;
          padding:60px 64px 132px; box-shadow:0 30px 70px rgba(60,50,35,.10);
          display:flex; flex-direction:column; }

  .counter { position:absolute; top:52px; right:56px; background:#FBF8F1;
             border-radius:999px; padding:9px 26px; font-size:26px; font-weight:600;
             color:#8B8375; box-shadow:${SH_SM}; }
  .kicker { color:${CLAY}; font-size:24px; font-weight:800; letter-spacing:4.5px;
            text-transform:uppercase; margin:44px 0 22px; }
  .title { font-family:'Cal Sans',sans-serif; font-weight:400; font-size:66px;
           line-height:1.1; letter-spacing:0; max-width:880px; }
  .body { font-size:33px; font-weight:500; color:${MUTE}; line-height:1.46;
          margin-top:22px; max-width:880px; }

  .clabel { color:${CLAY}; font-size:21px; font-weight:800; letter-spacing:3.5px;
            text-transform:uppercase; margin:40px 0 16px; }
  .chips { display:flex; gap:16px; flex-wrap:wrap; }
  .chip { background:#FBF8F1; border-radius:999px; padding:11px 24px; font-size:27px;
          font-weight:700; box-shadow:${SH_SM}; display:inline-flex; align-items:center; gap:12px; }
  .chip .lg { width:27px; height:27px; }

  .agent { background:#FBF8F1; border-radius:26px; margin-top:40px;
           border:1.5px solid #E9E3D5; box-shadow:${SH_MD}; overflow:hidden; }
  .ahead { display:flex; align-items:center; gap:12px; padding:20px 28px;
           border-bottom:1.5px solid #EDE7D9; font-size:26px; font-weight:600; color:#8B8375; }
  .dots { display:inline-flex; gap:8px; margin-right:8px; }
  .dots i { width:14px; height:14px; border-radius:50%; display:inline-block; }
  .arows { padding:14px 28px 24px; }
  .arow { display:flex; align-items:center; gap:20px; padding:15px 0; }
  .stage { min-width:96px; text-align:center; border-radius:999px; padding:8px 0;
           font-size:19px; font-weight:800; letter-spacing:1.2px; color:#fff; }
  .s-when { background:#B65C38; } .s-do { background:#A49B8C; } .s-send { background:#3E8E5B; }
  .s-fail { background:#C2453A; }
  .aic { width:46px; height:46px; background:#fff; border-radius:12px; box-shadow:${SH_SM};
         display:flex; align-items:center; justify-content:center; flex:none; }
  .aic .lg { width:26px; height:26px; }
  .arow span.t { font-size:29px; font-weight:600; }

  .try { font-family:'JetBrains Mono',ui-monospace,monospace; font-size:23px;
         color:${CLAY}; line-height:1.55; margin-top:30px; max-width:900px; }

  .grid { display:grid; grid-template-columns:repeat(4,1fr); gap:20px; margin-top:44px; }
  .gtile { background:#FBF8F1; border-radius:22px; padding:24px 0 18px; text-align:center;
           box-shadow:${SH_SM}; }
  .gtile .lg { width:42px; height:42px; margin:0 auto 12px; }
  .gtile div { font-size:24px; font-weight:600; color:#5C554A; }

  .formula { display:flex; align-items:center; gap:12px; margin-top:40px; flex-wrap:wrap; }
  .fpill { background:#F2DACB; color:#A34F2C; border-radius:999px; padding:10px 26px;
           font-size:26px; font-weight:700; }
  .fplus { color:#B3A995; font-size:28px; font-weight:600; }

  .code { background:#262019; border-radius:26px; padding:40px 44px; margin-top:44px;
          font-family:'JetBrains Mono',ui-monospace,monospace; font-size:26px;
          line-height:2.15; color:#E8E2D8; box-shadow:${SH_MD}; }
  .code b { color:#E08B5E; font-weight:500; }
  .note { font-size:28px; font-weight:600; color:${MUTE}; margin-top:30px; }
  .note b { color:${INK}; }

  .togglelist { background:#FBF8F1; border-radius:26px; margin-top:44px; padding:10px 30px;
                border:1.5px solid #E9E3D5; box-shadow:${SH_MD}; }
  .trow2 { display:flex; align-items:center; gap:18px; padding:21px 0;
           border-bottom:1.5px solid #EFE9DC; }
  .trow2:last-child { border-bottom:none; }
  .trow2 .aic { width:44px; height:44px; }
  .trow2 span.t { font-size:30px; font-weight:600; }
  .trow2 .on { margin-left:auto; color:#3E8E5B; font-size:24px; font-weight:700; margin-right:14px; }
  .tgl { width:66px; height:36px; border-radius:999px; background:#3E8E5B; position:relative; }
  .tgl::after { content:''; position:absolute; right:4px; top:4px; width:28px; height:28px;
                border-radius:50%; background:#fff; }

  /* cover extras */
  .ckick { color:${CLAY}; font-size:24px; font-weight:800; letter-spacing:5px;
           text-transform:uppercase; margin-bottom:28px; }
  .cicons { display:flex; gap:18px; margin-top:64px; }
  .cicons .aic { width:96px; height:96px; border-radius:26px; }
  .cicons .aic .lg { width:50px; height:50px; }
  .ccap { font-size:30px; font-weight:700; color:${MUTE}; margin-top:26px; }
  .cbig { font-family:'Cal Sans',sans-serif; font-size:250px; line-height:.9; letter-spacing:-6px;
          color:${CLAY}; margin-bottom:22px; }
  .cbig .tl { font-size:.38em; vertical-align:.7em; margin-right:8px; letter-spacing:0; opacity:.75; }
  .ct2.sm { font-size:78px; line-height:1.12; }

  /* scan */
  .scan { display:flex; flex-direction:column; gap:20px; margin-top:44px; }
  .snum { background:#FBF8F1; border:1.5px solid #E9E3D5; border-radius:26px; padding:30px 36px;
          display:flex; align-items:baseline; gap:26px; box-shadow:${SH_SM}; }
  .snum.hot { border-color:${CLAY}; background:#FCF1E7; }
  .snum b { font-family:'Cal Sans',sans-serif; font-weight:400; font-size:88px; line-height:1;
            min-width:350px; }
  .snum.hot b { color:${CLAY}; }
  .snum span { font-size:30px; font-weight:700; color:${MUTE}; }
  .snum.hot span { color:${INK}; }
  .builders { display:flex; align-items:center; gap:14px; flex-wrap:wrap; margin-top:30px; }
  .builders .bl { font-size:22px; font-weight:800; letter-spacing:3px; text-transform:uppercase;
                  color:${CLAY}; margin-right:6px; }

  /* matrix (toggle comparison) */
  .matrix { background:#FBF8F1; border-radius:26px; margin-top:40px; padding:8px 30px 10px;
            border:1.5px solid #E9E3D5; box-shadow:${SH_MD}; }
  .mrow { display:grid; grid-template-columns:1fr 130px 130px; align-items:center;
          padding:20px 0; border-bottom:1.5px solid #EFE9DC; }
  .mrow:last-child { border-bottom:none; }
  .mrow.mh { padding:18px 0 14px; }
  .mrow.mh span { font-family:'Cal Sans',sans-serif; font-size:40px; text-align:center; color:${MUTE}; }
  .mrow.mh span.hi { color:${CLAY}; }
  .mrow .t { font-size:30px; font-weight:600; }
  .mrow .c { display:flex; justify-content:center; }
  .tgl.off { background:#D8D1C3; }
  .tgl.off::after { right:auto; left:4px; }

  .foot { position:absolute; left:64px; right:64px; bottom:44px; }
  .foot .line { height:1.5px; background:#DDD6C8; margin-bottom:26px; }
  .foot .row { display:flex; align-items:center; justify-content:space-between; }
  .foot .mark { width:34px; height:34px; }
  .foot .handle { font-size:26px; font-weight:700; letter-spacing:1.5px; color:#A79E8F; }

  .center { flex:1; display:flex; flex-direction:column; align-items:center;
            justify-content:center; text-align:center; margin-top:-30px; }
  .ct1 { font-family:'Cal Sans',sans-serif; font-size:92px; color:${CLAY}; line-height:1.12; }
  .ct2 { font-family:'Cal Sans',sans-serif; font-size:92px; color:${INK}; line-height:1.12; }
  .apptile { width:132px; height:132px; background:${CLAY}; border-radius:32px; margin-top:64px;
             display:flex; align-items:center; justify-content:center; box-shadow:${SH_MD}; }
  .apptile svg { width:64px; height:64px; }

  .cta1 { font-family:'Cal Sans',sans-serif; font-size:96px; color:${INK}; }
  .cta2 { font-family:'Cal Sans',sans-serif; font-size:66px; color:${CLAY}; margin-top:18px; line-height:1.25; }
  .iconrow { display:flex; gap:16px; margin-top:40px; }
  .iconrow .aic { width:56px; height:56px; border-radius:14px; }
  .iconrow .lg { width:30px; height:30px; }
  .ctabody { font-size:33px; font-weight:600; color:${MUTE}; line-height:1.5; margin-top:44px; max-width:720px; }
  .ctapill { background:${CLAY}; color:#fff; border-radius:999px; padding:20px 54px;
             font-size:36px; font-weight:800; margin-top:52px; box-shadow:${SH_MD}; }
`;

function page(inner) {
  return `<!DOCTYPE html><html><head><meta charset="utf-8">
  <link href="https://fonts.googleapis.com/css2?family=Cal+Sans&family=Manrope:wght@400..800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>${CSS}</style></head><body><div class="slide">${inner}</div></body></html>`;
}

function foot(handle) {
  return `<div class="foot"><div class="line"></div><div class="row">
    <div class="mark" style="color:${CLAY}">${BURST(CLAY)}</div>
    <div class="handle">${handle}</div></div></div>`;
}

function counter(i, total) {
  return `<div class="counter">${String(i).padStart(2, '0')} / ${total}</div>`;
}

function icon(name, color) {
  return `<span class="lg"${color ? ` style="color:${color}"` : ''}>${loadIcon(name)}</span>`;
}

function chips(list) {
  return `<div class="chips">${list.map((c) =>
    `<span class="chip">${c.icon ? icon(c.icon, c.color) : ''}${c.label}</span>`).join('')}</div>`;
}

function agentWindow(a) {
  const stage = { WHEN: 's-when', DO: 's-do', SEND: 's-send',
                  TRY: 's-when', FAIL: 's-fail', FIX: 's-do', PASS: 's-send' };
  return `<div class="agent">
    <div class="ahead"><span class="dots"><i style="background:#D97C55"></i><i style="background:#E0B96A"></i><i style="background:#7FB98A"></i></span>${a.name} · ${a.status}</div>
    <div class="arows">${a.rows.map((r) => `<div class="arow">
      <span class="stage ${stage[r.s]}">${r.s}</span>
      <span class="aic">${icon(r.icon, r.color)}</span>
      <span class="t">${r.t}</span></div>`).join('')}</div>
  </div>`;
}

function build(post, { root }) {
  const pages = {};
  let n = 0;
  const total = (post.cover ? 1 : 0) + (post.slides || []).length + (post.cta ? 1 : 0);
  const pad = (x) => String(x).padStart(2, '0');
  const H = post.handle || '@shazimbuilds';

  if (post.cover) {
    pages[`${pad(++n)}-cover`] = page(`<div class="card">
      <div class="center">
        ${post.cover.kicker ? `<div class="ckick">${post.cover.kicker}</div>` : ''}
        ${post.cover.big ? `<div class="cbig">${post.cover.big}</div>` : ''}
        ${post.cover.line1 ? `<div class="ct1">${post.cover.line1}</div>` : ''}
        <div class="ct2 ${post.cover.big ? 'sm' : ''}">${post.cover.line2}</div>
        ${post.cover.icons
          ? `<div class="cicons">${post.cover.icons.map((i) => `<span class="aic">${icon(i.icon, i.color)}</span>`).join('')}</div>
             ${post.cover.caption ? `<div class="ccap">${post.cover.caption}</div>` : ''}`
          : `<div class="apptile">${BURST('#fff')}</div>`}
      </div>${foot(H)}</div>`);
  }

  (post.slides || []).forEach((s) => {
    let inner = '';
    if (s.type === 'idea') {
      inner = `<div class="kicker">${s.kicker}</div><div class="title">${s.title}</div>
        <div class="body">${s.body}</div>
        <div class="grid">${s.tools.map((t) => `<div class="gtile"><div class="lg">${loadIcon(t.icon)}</div><div>${t.label}</div></div>`).join('')}</div>
        <div class="formula">${s.formula.map((f, i) => `${i ? '<span class="fplus">+</span>' : ''}<span class="fpill">${f}</span>`).join('')}</div>`;
    } else if (s.type === 'agent') {
      inner = `<div class="kicker">${s.kicker}</div><div class="title">${s.title}</div>
        <div class="body">${s.body}</div>
        <div class="clabel">${s.connectsLabel || 'connects'}</div>${chips(s.connects)}
        ${agentWindow(s.agent)}
        ${s.try ? `<div class="try">${s.tryLabel || 'Try:'} ${s.tryRaw ? s.try : `“${s.try}”`}</div>` : ''}`;
    } else if (s.type === 'recipe') {
      inner = `<div class="kicker">${s.kicker}</div><div class="title">${s.title}</div>
        <div class="body">${s.body}</div>
        <div class="code">${s.lines.map((l) => `<div><b>${l.k}:</b> ${l.v}</div>`).join('')}</div>
        <div class="note">${s.note}</div>`;
    } else if (s.type === 'scan') {
      inner = `<div class="kicker">${s.kicker}</div><div class="title">${s.title}</div>
        <div class="body">${s.body}</div>
        <div class="scan">${s.nums.map((x) => `<div class="snum ${x.hot ? 'hot' : ''}"><b>${x.n}</b><span>${x.t}</span></div>`).join('')}</div>
        <div class="builders"><span class="bl">built on</span>${chips(s.builders).replace('<div class="chips">', '').replace(/<\/div>$/, '')}</div>`;
    } else if (s.type === 'matrix') {
      inner = `<div class="kicker">${s.kicker}</div><div class="title">${s.title}</div>
        <div class="body">${s.body}</div>
        <div class="matrix">
          <div class="mrow mh"><span></span><span>${s.cols[0]}</span><span class="hi">${s.cols[1]}</span></div>
          ${s.rows.map((r) => `<div class="mrow"><span class="t">${r}</span>
            <span class="c"><span class="tgl off"></span></span><span class="c"><span class="tgl"></span></span></div>`).join('')}
        </div>`;
    } else if (s.type === 'unlock') {
      inner = `<div class="kicker">${s.kicker}</div><div class="title">${s.title}</div>
        <div class="body">${s.body}</div>
        <div class="togglelist">${s.connectors.map((c) => `<div class="trow2">
          <span class="aic"><span class="lg">${loadIcon(c.icon)}</span></span>
          <span class="t">${c.label}</span><span class="on">on</span><span class="tgl"></span>
        </div>`).join('')}</div>`;
    }
    const slug = (s.slug || s.title).toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 30);
    pages[`${pad(++n)}-${slug}`] = page(`<div class="card">${counter(n, total)}${inner}${foot(H)}</div>`);
  });

  if (post.cta) {
    pages[`${pad(++n)}-cta`] = page(`<div class="card">${counter(n, total)}
      <div class="center">
        <div class="cta1">${post.cta.line1}</div>
        <div class="cta2">${post.cta.line2}</div>
        <div class="iconrow">${post.cta.icons.map((i) => typeof i === 'string'
          ? `<span class="aic"><span class="lg">${loadIcon(i)}</span></span>`
          : `<span class="aic">${icon(i.icon, i.color)}</span>`).join('')}</div>
        <div class="ctabody">${post.cta.body}</div>
        <div class="ctapill">${post.cta.pill}</div>
      </div>${foot(H)}</div>`);
  }
  if (post.accent) {
    const A = post.accent;
    const swap = { '#C96442': A.main, '#B65C38': A.dark, '#F2DACB': A.soft, '#A34F2C': A.text };
    for (const k of Object.keys(pages)) {
      for (const [from, to] of Object.entries(swap)) if (to) pages[k] = pages[k].split(from).join(to);
    }
  }
  return pages;
}

module.exports = { build };
