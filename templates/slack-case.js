// Template: slack-case — client case study told inside Slack. Cool white
// "product" ground, Cal Sans display, Manrope body, Lato inside the Slack
// mockups (Slack's real UI face). Orange = personal accent; teal = anything
// Orbiqon built (the bot, the credit chip). 1080x1350.
const fs = require('fs');
const path = require('path');

const LOGO_DIR = path.join(__dirname, '..', 'assets', 'logos');
const ORANGE = '#FF8A00';
const ORANGE_TXT = '#E2700A';
const TEAL = '#0097B2';
const INK = '#111418';
const MUTE = '#5F6670';
const FAINT = '#9AA1A9';
const LINE = '#DDE1E5';
const SH_SM = '0 4px 14px rgba(20,30,40,.06)';
const SH_MD = '0 12px 32px rgba(20,30,40,.09), 0 3px 8px rgba(20,30,40,.05)';
const SH_LG = '0 32px 70px rgba(20,30,40,.14), 0 8px 20px rgba(20,30,40,.06)';

function icon(name, color) {
  const raw = fs.readFileSync(path.join(LOGO_DIR, name + '.svg'), 'utf8');
  const keep = name === 'slack-color';
  return raw.replace(/<svg([^>]*)>/, (m, attrs) => {
    attrs = attrs.replace(/\s(width|height|style)="[^"]*"/g, '');
    if (!keep) attrs = attrs.replace(/\sfill="[^"]*"/g, '') + ` fill="${color || 'currentColor'}"`;
    return `<svg${attrs} width="100%" height="100%">`;
  });
}

const BURST = (c) => `<svg viewBox="0 0 24 24" fill="${c}" width="100%" height="100%"><path d="M12 1.6l1.9 7.5 7.5 1.9-7.5 1.9-1.9 7.5-1.9-7.5L2.6 11l7.5-1.9z"/></svg>`;
const FLOW = `<svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round"><circle cx="5" cy="12" r="2.6" fill="#fff"/><circle cx="19" cy="6" r="2.6" fill="#fff"/><circle cx="19" cy="18" r="2.6" fill="#fff"/><path d="M7.5 11 16.5 7M7.5 13l9 4"/></svg>`;
const CLOCK = `<svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>`;

const CSS = `
  * { margin:0; padding:0; box-sizing:border-box; }
  .slide { width:1080px; height:1350px; position:relative; overflow:hidden;
           background:linear-gradient(180deg,#F3F4F6 0%,#E9ECEF 100%);
           color:${INK}; font-family:'Manrope',sans-serif; }
  .dots-bg { position:absolute; inset:0; opacity:.5;
             background-image:radial-gradient(#D3D8DE 1.3px, transparent 1.3px);
             background-size:28px 28px; mask-image:linear-gradient(180deg,#000 0%,transparent 55%); }
  .wrap { position:absolute; inset:0; padding:84px 88px 120px; display:flex; flex-direction:column; }
  .kicker { font-size:23px; font-weight:800; letter-spacing:5px; text-transform:uppercase;
            color:${ORANGE_TXT}; margin-bottom:22px; }
  .title { font-family:'Cal Sans',sans-serif; font-weight:400; font-size:74px; line-height:1.08;
           letter-spacing:-.5px; }
  .body { font-size:32px; font-weight:500; color:${MUTE}; line-height:1.45; margin-top:24px; max-width:880px; }
  .fill { flex:1; display:flex; flex-direction:column; justify-content:center; padding:44px 0 8px; }

  /* tiles */
  .tile { width:88px; height:88px; border-radius:24px; background:#fff; border:1.5px solid ${LINE};
          display:flex; align-items:center; justify-content:center; flex:none; box-shadow:${SH_SM}; }
  .tile .lg { width:50%; height:50%; display:flex; }

  /* cards (agents) */
  .cards { display:flex; flex-direction:column; gap:22px; }
  .card { background:#fff; border:1.5px solid ${LINE}; border-radius:28px; padding:32px 34px;
          display:flex; align-items:center; gap:26px; box-shadow:${SH_MD}; }
  .card .name { font-size:34px; font-weight:700; letter-spacing:-.3px; }
  .card .note { font-size:23px; color:${MUTE}; margin-top:6px; font-weight:500; }
  .card .meta { flex:1; min-width:0; }
  .inslack { display:flex; align-items:center; gap:10px; font-family:'Lato',sans-serif;
             font-size:20px; font-weight:700; color:${MUTE}; border:1.5px solid ${LINE};
             border-radius:999px; padding:9px 16px 9px 12px; flex:none; }
  .inslack span { width:24px; height:24px; display:flex; }

  /* before list */
  .blist { display:flex; flex-direction:column; gap:18px; }
  .brow { background:#fff; border:1.5px solid ${LINE}; border-radius:24px; padding:28px 30px;
          display:flex; align-items:center; gap:22px; box-shadow:${SH_SM}; }
  .brow .ck { width:46px; height:46px; color:#C2453A; flex:none; display:flex; }
  .brow .t { font-size:30px; font-weight:600; flex:1; }
  .brow .tag { font-size:19px; font-weight:800; letter-spacing:1.5px; text-transform:uppercase;
               color:#C2453A; background:#FBEAE8; border-radius:999px; padding:8px 16px; flex:none; }

  /* grid of 22 */
  .g22 { display:flex; flex-wrap:wrap; gap:14px; justify-content:center; }
  .g22 .w { width:137px; height:108px; border-radius:20px; background:#fff; border:1.5px solid ${LINE};
            position:relative; box-shadow:${SH_SM}; padding:16px 18px; display:flex; flex-direction:column;
            justify-content:space-between; }
  .g22 .w .n { font-family:'JetBrains Mono',monospace; font-size:21px; color:${FAINT}; }
  .g22 .w .d { position:absolute; top:18px; right:18px; width:11px; height:11px; border-radius:50%; background:#2EB67D; }
  .g22 .w .l { font-size:21px; font-weight:800; color:#fff; }
  .g22 .w.hot { background:${ORANGE}; border-color:${ORANGE}; }
  .g22 .w.hot .n { color:rgba(255,255,255,.75); }
  .g22 .w.hot .d { background:#fff; }
  .glegend { display:flex; justify-content:center; gap:28px; margin-top:28px; font-size:22px; color:${MUTE}; font-weight:600; }
  .glegend i { display:inline-block; width:12px; height:12px; border-radius:50%; margin-right:9px; vertical-align:1px; }

  /* slack window */
  .sw { background:#fff; border:1.5px solid ${LINE}; border-radius:24px; overflow:hidden;
        box-shadow:${SH_LG}; font-family:'Lato',sans-serif; display:flex; zoom:1.24; }
  .sw.withside { zoom:1.12; }
  .sw .side { width:268px; background:#3F0E40; color:#CFC3CF; padding:24px 0; flex:none; }
  .sw .ws { color:#fff; font-weight:900; font-size:24px; padding:0 24px 18px; border-bottom:1px solid #5A2C5B; margin-bottom:12px; }
  .sw .sec { font-size:17px; font-weight:700; padding:12px 24px 6px; color:#B39DB3; }
  .sw .ch { font-size:21px; padding:6px 24px; }
  .sw .ch.on { background:#1164A3; color:#fff; font-weight:700; }
  .sw .ch.bold { color:#fff; font-weight:900; }
  .sw .main { flex:1; min-width:0; }
  .sw .bar { display:flex; align-items:center; justify-content:space-between; padding:18px 26px;
             border-bottom:1.5px solid #EAECEE; }
  .sw .bar b { font-size:24px; font-weight:900; color:${INK}; }
  .sw .bar span { font-size:18px; color:${FAINT}; }
  .sw .msgs { padding:22px 26px 26px; display:flex; flex-direction:column; gap:22px; }
  .msg { display:flex; gap:16px; }
  .av { width:50px; height:50px; border-radius:11px; flex:none; display:flex; align-items:center;
        justify-content:center; background:${TEAL}; padding:11px; }
  .mc { flex:1; min-width:0; }
  .mh { display:flex; align-items:center; gap:10px; }
  .mh b { font-size:22px; font-weight:900; color:${INK}; }
  .app { font-size:13px; font-weight:700; color:#616061; background:#E8E8E8; border-radius:4px; padding:2px 6px; letter-spacing:.3px; }
  .ts { font-size:17px; color:${FAINT}; }
  .mt { font-size:22px; line-height:1.45; color:#1D1C1D; margin-top:3px; }
  .mt b { font-weight:900; }
  .att { border-left:4px solid ${TEAL}; padding:4px 0 4px 16px; margin-top:12px; }
  .att .at { font-size:21px; font-weight:900; color:#1D1C1D; }
  .att .al { font-size:19px; color:#454245; line-height:1.45; margin-top:3px; }
  .att .al em { font-style:normal; font-weight:700; color:#1D1C1D; }
  .ilist { margin-top:10px; display:flex; flex-direction:column; gap:10px; }
  .item { display:flex; align-items:flex-start; gap:12px; font-size:20px; color:#1D1C1D; line-height:1.4; }
  .item .bul { color:${TEAL}; font-weight:900; }
  .item .src { font-size:16px; color:#616061; background:#F4F4F4; border:1px solid #E2E2E2;
               border-radius:6px; padding:2px 8px; margin-left:4px; white-space:nowrap; }
  .btns { display:flex; gap:10px; margin-top:14px; flex-wrap:wrap; }
  .sbtn { font-size:18px; font-weight:700; color:#1D1C1D; border:1.5px solid #CFD3D8; border-radius:8px; padding:7px 15px; }
  .sbtn.on { background:#007A5A; border-color:#007A5A; color:#fff; }
  .okline { display:flex; align-items:center; gap:10px; margin-top:8px; font-size:19px; color:#007A5A; font-weight:700; }

  /* stack */
  .stackrow { display:flex; align-items:center; justify-content:center; gap:26px; }
  .stackrow .tile { width:150px; height:150px; border-radius:38px; }
  .stackrow .plus { font-family:'Cal Sans',sans-serif; font-size:56px; color:${FAINT}; }
  .bigstat { text-align:center; margin-top:56px; }
  .bigstat .v { font-family:'Cal Sans',sans-serif; font-size:116px; line-height:1; color:${ORANGE_TXT}; letter-spacing:-2px; }
  .bigstat .c { font-size:30px; font-weight:600; color:${MUTE}; margin-top:16px; }
  .credit { display:inline-flex; align-items:center; gap:12px; margin:40px auto 0; font-size:22px; font-weight:800;
            color:${TEAL}; border:1.5px solid ${TEAL}; border-radius:999px; padding:11px 22px; letter-spacing:.5px; }
  .credit span { width:22px; height:22px; display:flex; }

  /* cover */
  .cov { position:absolute; inset:0; padding:96px 88px 120px; display:flex; flex-direction:column; justify-content:center; }
  .cov .big { font-family:'Cal Sans',sans-serif; font-size:330px; line-height:.86; letter-spacing:-10px; color:${ORANGE}; }
  .cov .ct { font-family:'Cal Sans',sans-serif; font-size:80px; line-height:1.1; letter-spacing:-1px; margin-top:22px; }
  .cov .ct .m { color:${MUTE}; }
  .cov .row { display:flex; align-items:center; gap:18px; margin-top:64px; }
  .cov .row .tile { width:118px; height:118px; border-radius:32px; }
  .cov .row .lbl { font-size:24px; font-weight:700; color:${MUTE}; margin-left:10px; line-height:1.35; }

  /* cta */
  .cta { position:absolute; inset:0; padding:88px; display:flex; flex-direction:column; justify-content:center; }
  .cta .rule { display:flex; flex-direction:column; gap:20px; }
  .cta .r { background:#fff; border:1.5px solid ${LINE}; border-radius:26px; padding:30px 34px; box-shadow:${SH_MD};
            display:flex; align-items:baseline; gap:20px; }
  .cta .r b { font-family:'Cal Sans',sans-serif; font-weight:400; font-size:46px; letter-spacing:-.5px; }
  .cta .r span { font-size:28px; font-weight:600; color:${MUTE}; }
  .cta .r.agent b { color:${ORANGE_TXT}; }
  .cta .q { font-family:'Cal Sans',sans-serif; font-size:88px; line-height:1.1; letter-spacing:-1px; margin-top:72px; }
  .cta .q em { font-style:normal; color:${ORANGE_TXT}; }

  .foot { position:absolute; left:88px; right:88px; bottom:52px; display:flex; align-items:center; justify-content:space-between; }
  .foot .mark { display:flex; align-items:center; gap:14px; }
  .foot .mark .b { width:26px; height:26px; display:flex; }
  .foot .handle { font-size:24px; font-weight:700; letter-spacing:1.5px; color:${MUTE}; }
  .foot .count { font-family:'JetBrains Mono',monospace; font-size:22px; color:${FAINT}; }
`;

function page(inner) {
  return `<!DOCTYPE html><html><head><meta charset="utf-8">
  <link href="https://fonts.googleapis.com/css2?family=Cal+Sans&family=Manrope:wght@400..800&family=Lato:wght@400;700;900&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>${CSS}</style></head><body><div class="slide"><div class="dots-bg"></div>${inner}</div></body></html>`;
}

function foot(H, i, total) {
  return `<div class="foot"><div class="mark"><span class="b">${BURST(ORANGE)}</span><span class="handle">${H}</span></div>
    <span class="count">${String(i).padStart(2, '0')} / ${String(total).padStart(2, '0')}</span></div>`;
}

function tile(name, color) {
  return `<span class="tile"><span class="lg">${icon(name, color)}</span></span>`;
}

function message(m) {
  return `<div class="msg"><span class="av">${FLOW}</span><div class="mc">
    <div class="mh"><b>${m.name || 'Content OS'}</b><span class="app">APP</span><span class="ts">${m.time || ''}</span></div>
    ${m.text ? `<div class="mt">${m.text}</div>` : ''}
    ${(m.atts || []).map((a) => `<div class="att" ${a.color ? `style="border-color:${a.color}"` : ''}>
      <div class="at">${a.title}</div>${(a.lines || []).map((l) => `<div class="al">${l}</div>`).join('')}</div>`).join('')}
    ${m.list ? `<div class="ilist">${m.list.map((it) => `<div class="item"><span class="bul">›</span><span>${it.t}${it.src ? ` <span class="src">${it.src}</span>` : ''}</span></div>`).join('')}</div>` : ''}
    ${m.buttons ? `<div class="btns">${m.buttons.map((b) => `<span class="sbtn ${b.on ? 'on' : ''}">${b.t}</span>`).join('')}</div>` : ''}
    ${(m.ok || []).map((o) => `<div class="okline">✓ ${o}</div>`).join('')}
  </div></div>`;
}

function slackWindow(w) {
  const side = w.sidebar ? `<div class="side"><div class="ws">${w.sidebar.workspace}</div>
    <div class="sec">Channels</div>
    ${w.sidebar.channels.map((c) => `<div class="ch ${c === w.channel ? 'on' : (w.sidebar.bold || []).includes(c) ? 'bold' : ''}"># ${c}</div>`).join('')}
    <div class="sec">Apps</div><div class="ch bold">Content OS</div></div>` : '';
  return `<div class="sw ${w.sidebar ? 'withside' : ''}">${side}<div class="main">
    <div class="bar"><b># ${w.channel}</b><span>${w.members || ''}</span></div>
    <div class="msgs">${w.messages.map(message).join('')}</div></div></div>`;
}

function build(post, { root }) {
  const pages = {};
  const H = post.handle || '@shazimbuilds';
  const total = 1 + (post.slides || []).length + 1;
  let n = 0;
  const pad = (x) => String(x).padStart(2, '0');

  const c = post.cover;
  pages[`${pad(++n)}-cover`] = page(`<div class="cov">
    <div class="kicker">${c.kicker}</div>
    <div class="big">${c.big}</div>
    <div class="ct">${c.title}</div>
    <div class="row">${c.logos.map((l) => tile(l.icon, l.color)).join('')}${c.label ? `<span class="lbl">${c.label}</span>` : ''}</div>
  </div>${foot(H, n, total)}`);

  (post.slides || []).forEach((s) => {
    let body = '';
    if (s.type === 'agents') {
      body = `<div class="cards">${s.cards.map((k) => `<div class="card">${tile(k.icon, k.color)}
        <div class="meta"><div class="name">${k.name}</div><div class="note">${k.note}</div></div>
        <span class="inslack"><span>${icon('slack-color')}</span>in Slack</span></div>`).join('')}</div>`;
    } else if (s.type === 'before') {
      body = `<div class="blist">${s.rows.map((r) => `<div class="brow"><span class="ck">${CLOCK}</span>
        <span class="t">${r}</span><span class="tag">${s.tag || 'by hand'}</span></div>`).join('')}</div>`;
    } else if (s.type === 'grid') {
      const tiles = Array.from({ length: s.count }, (_, i) => {
        const hot = s.highlight[i];
        return `<div class="w ${hot ? 'hot' : ''}"><span class="n">${pad(i + 1)}</span><span class="d"></span>${hot ? `<span class="l">${hot}</span>` : ''}</div>`;
      }).join('');
      body = `<div class="g22">${tiles}</div>
        <div class="glegend"><span><i style="background:#2EB67D"></i>running</span><span><i style="background:${ORANGE}"></i>in this post</span></div>`;
    } else if (s.type === 'slack') {
      body = slackWindow(s.window);
    } else if (s.type === 'stack') {
      body = `<div class="stackrow">${s.logos.map((l, i) => `${i ? '<span class="plus">+</span>' : ''}${tile(l.icon, l.color)}`).join('')}</div>
        <div class="bigstat"><div class="v">${s.stat}</div><div class="c">${s.cap}</div></div>
        ${s.credit ? `<div class="credit"><span>${BURST(TEAL)}</span>${s.credit}</div>` : ''}`;
    }
    const slug = s.slug || s.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 26);
    pages[`${pad(++n)}-${slug}`] = page(`<div class="wrap">
      <div class="kicker">${s.kicker}</div><div class="title">${s.title}</div>
      ${s.body ? `<div class="body">${s.body}</div>` : ''}
      <div class="fill">${body}</div></div>${foot(H, n, total)}`);
  });

  const t = post.cta;
  pages[`${pad(++n)}-cta`] = page(`<div class="cta">
    <div class="kicker">${t.kicker}</div>
    <div class="rule">${t.rules.map((r) => `<div class="r ${r.agent ? 'agent' : ''}"><b>${r.b}</b><span>${r.s}</span></div>`).join('')}</div>
    <div class="q">${t.q}</div>
  </div>${foot(H, n, total)}`);
  return pages;
}

module.exports = { build };
