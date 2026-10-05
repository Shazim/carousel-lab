// Template: model-cards — Family A dark spec-sheet. Black ground, Cal Sans
// display, Manrope body, JetBrains Mono prices. Model cards with real logos,
// a money bar chart, a flow slide and a question CTA. 1080x1350.
const fs = require('fs');
const path = require('path');

const LOGO_DIR = path.join(__dirname, '..', 'assets', 'logos');
const ORANGE = '#FF8A00';
const GROUND = '#0B0B0C';
const CARD = '#141618';
const LINE = '#25282C';
const TEXT = '#F3F1ED';
const MUTE = '#878D94';

function loadIcon(name) {
  const raw = fs.readFileSync(path.join(LOGO_DIR, name + '.svg'), 'utf8');
  return raw.replace(/<svg([^>]*)>/, (m, attrs) => {
    attrs = attrs.replace(/\s(fill|width|height|style)="[^"]*"/g, '');
    return `<svg${attrs} fill="currentColor" width="100%" height="100%">`;
  });
}

const BURST = `<svg viewBox="0 0 24 24" fill="${ORANGE}" width="100%" height="100%"><path d="M12 1.6l1.9 7.5 7.5 1.9-7.5 1.9-1.9 7.5-1.9-7.5L2.6 11l7.5-1.9z"/></svg>`;

const CSS = `
  * { margin:0; padding:0; box-sizing:border-box; }
  .slide { width:1080px; height:1350px; position:relative; overflow:hidden;
           font-family:'Manrope',sans-serif;
           --ground:${GROUND}; --card:${CARD}; --line:${LINE}; --text:${TEXT};
           --mute:${MUTE}; --faint:#6A7077; --tile:#000; --pick:#17150F;
           --track:#2B2F34; --arrow:#3A3F45; --shadow:0 14px 34px rgba(0,0,0,.34);
           --glow:rgba(255,138,0,.13); --ok:#3FB97A; --bad:#FF5F57; --well:#0E0F11;
           background:var(--ground); color:var(--text); }
  .slide.light { --ground:#F5F3EE; --card:#FFFFFF; --line:#E3DFD6; --text:#14161A;
           --mute:#6B7177; --faint:#969CA3; --tile:#0E0F11;
           --pick:#FFF7EE; --track:#E3DFD6; --arrow:#C3BEB4;
           --shadow:0 12px 30px rgba(60,50,35,.09), 0 3px 8px rgba(60,50,35,.05);
           --glow:rgba(255,138,0,.16); --ok:#23955B; --bad:#D93A33; --well:#F3F1EC; }
  .glow { position:absolute; top:-340px; right:-260px; width:900px; height:900px;
          border-radius:50%; background:radial-gradient(circle,
          var(--glow), rgba(255,138,0,0) 62%); pointer-events:none; }
  .wrap { position:absolute; inset:0; padding:84px 88px 118px;
          display:flex; flex-direction:column; }

  .kicker { font-size:23px; font-weight:800; letter-spacing:5px; text-transform:uppercase;
            color:${ORANGE}; margin-bottom:22px; }
  .title { font-family:'Cal Sans',sans-serif; font-weight:400; font-size:74px;
           line-height:1.08; letter-spacing:-.5px; }
  .body { font-size:32px; font-weight:500; color:var(--mute); line-height:1.45;
          margin-top:24px; max-width:880px; }

  /* model cards */
  .fill { flex:1; display:flex; flex-direction:column; justify-content:center; padding:48px 0 8px; }
  .cards { display:flex; flex-direction:column; gap:24px; }
  .card { background:var(--card); border:1.5px solid var(--line); border-radius:28px;
          padding:34px 36px; display:flex; align-items:center; gap:28px;
          box-shadow:var(--shadow); }
  .card.pick { border-color:rgba(255,138,0,.55); background:var(--pick);
               box-shadow:var(--shadow), inset 3px 0 0 ${ORANGE}; }
  .tile { width:90px; height:90px; border-radius:24px; background:var(--tile);
          border:1.5px solid var(--line); display:flex; align-items:center;
          justify-content:center; flex:none; }
  .tile .lg { width:48%; height:48%; }
  .cards.solo .card { padding:50px 46px; gap:34px; }
  .cards.solo .tile { width:118px; height:118px; border-radius:30px; }
  .cards.solo .cname { font-size:46px; }
  .cards.solo .cnote { font-size:26px; margin-top:10px; }
  .cards.solo .cprice { font-size:40px; }
  .cmeta { flex:1; min-width:0; }
  .cname { font-size:36px; font-weight:700; letter-spacing:-.3px; }
  .cnote { font-size:23px; font-weight:500; color:var(--mute); margin-top:6px; }
  .cprice { font-family:'JetBrains Mono',monospace; font-size:29px; font-weight:500;
            font-variant-numeric:tabular-nums; text-align:right; flex:none;
            white-space:nowrap; }
  .card.pick .cprice { color:${ORANGE}; }
  .card .cprice small { display:block; font-size:16px; color:var(--mute);
                        letter-spacing:1px; margin-top:6px; font-weight:400; }
  .where { font-family:'JetBrains Mono',monospace; font-size:24px; color:var(--text);
           text-align:right; flex:none; }

  /* chart */
  .chart { display:flex; flex-direction:column; gap:34px; }
  .brow { display:flex; align-items:center; gap:26px; }
  .blabel { width:252px; flex:none; font-size:28px; font-weight:600; }
  .btrack { flex:1; display:flex; align-items:center; gap:22px; min-width:0; }
  .bar { height:54px; border-radius:12px; background:var(--track); flex:none; }
  .brow.win .bar { background:${ORANGE}; }
  .bval { font-family:'JetBrains Mono',monospace; font-size:36px; font-weight:500;
          font-variant-numeric:tabular-nums; color:var(--mute); white-space:nowrap; }
  .brow.win .bval { color:${ORANGE}; font-size:52px; }
  .brow.win .blabel { color:var(--text); }
  .cfoot { font-size:22px; color:var(--faint); margin-top:34px; }

  /* stat */
  .stat { background:var(--card); border:1.5px solid var(--line);
          border-radius:30px; padding:52px; text-align:center;
          box-shadow:var(--shadow); }
  .stat .big { font-family:'JetBrains Mono',monospace; font-size:112px; font-weight:500;
               color:${ORANGE}; line-height:1; font-variant-numeric:tabular-nums; }
  .stat .cap { font-size:27px; color:var(--mute); margin-top:20px; font-weight:500; }

  /* flow */
  .flow { display:flex; flex-direction:column; gap:18px; }
  .fstep { background:var(--card); border:1.5px solid var(--line); border-radius:24px;
           padding:26px 32px; display:flex; align-items:center; gap:24px; }
  .fstep.hot { border-color:rgba(255,138,0,.55); background:var(--pick); }
  .fstep .n { font-family:'JetBrains Mono',monospace; font-size:22px; color:${ORANGE};
              width:34px; flex:none; }
  .fstep .t { font-size:30px; font-weight:600; }
  .fstep .s { font-size:23px; color:var(--mute); margin-top:4px; }
  .farrow { text-align:center; color:var(--arrow); font-size:26px; line-height:1; }
  .closer { font-size:30px; font-weight:600; margin-top:34px; line-height:1.4; }
  .closer b { color:${ORANGE}; font-weight:600; }

  /* cover */
  .cov { position:absolute; inset:0; padding:104px 88px 118px;
         display:flex; flex-direction:column; justify-content:center; }
  .cov .ctitle { font-family:'Cal Sans',sans-serif; font-weight:400; font-size:132px;
                 line-height:1.02; letter-spacing:-2px; }
  .cov .ctitle em { font-style:normal; color:${ORANGE}; }
  .cov .csub { font-size:34px; color:var(--mute); margin-top:30px; font-weight:500;
               line-height:1.4; max-width:820px; }
  .logorow { display:flex; gap:20px; margin-top:76px; }
  .logorow .tile { width:120px; height:120px; border-radius:28px; }
  .logorow .tile .lg { width:46%; height:46%; }
  .stamp { font-family:'JetBrains Mono',monospace; font-size:20px; color:var(--faint);
           margin-top:34px; letter-spacing:.5px; }

  /* cta */
  .cta { position:absolute; inset:0; padding:88px; display:flex;
         flex-direction:column; align-items:center; justify-content:center;
         text-align:center; }
  .cta .q { font-family:'Cal Sans',sans-serif; font-weight:400; font-size:82px;
            line-height:1.14; letter-spacing:-1px; }
  .cta .q em { font-style:normal; color:${ORANGE}; }
  .cta .sub { font-size:30px; color:var(--mute); margin-top:40px; font-weight:500; }

  /* cover big number */
  .cov .cbig { font-family:'Cal Sans',sans-serif; font-size:270px; line-height:.92;
               letter-spacing:-6px; color:${ORANGE}; margin:6px 0 18px; }
  .cov .cbig .tl { font-size:.4em; vertical-align:.62em; margin-right:10px; letter-spacing:0; opacity:.8; }
  .cov .ctitle.sm { font-size:84px; line-height:1.08; letter-spacing:-1px; }

  /* scan */
  .scan { display:flex; flex-direction:column; gap:22px; }
  .snum { background:var(--card); border:1.5px solid var(--line); border-radius:28px;
          padding:36px 40px; display:flex; align-items:baseline; gap:28px; box-shadow:var(--shadow); }
  .snum.hot { border-color:rgba(255,138,0,.55); background:var(--pick); }
  .snum b { font-family:'Cal Sans',sans-serif; font-weight:400; font-size:96px; line-height:1;
            letter-spacing:-2px; min-width:370px; }
  .snum.hot b { color:${ORANGE}; }
  .snum span { font-size:30px; font-weight:600; color:var(--mute); }
  .snum.hot span { color:var(--text); }
  .chiprow { display:flex; gap:12px; flex-wrap:wrap; margin-top:8px; }
  .tchip { font-size:23px; font-weight:600; color:var(--mute); border:1.5px solid var(--line);
           border-radius:999px; padding:9px 20px; }

  /* mock window */
  .mock { background:var(--card); border:1.5px solid var(--line); border-radius:28px;
          overflow:hidden; box-shadow:var(--shadow); }
  .mhead { display:flex; align-items:center; gap:14px; padding:20px 28px;
           border-bottom:1.5px solid var(--line); font-size:22px; font-weight:600; color:var(--mute); }
  .mdots { display:inline-flex; gap:8px; }
  .mdots i { width:13px; height:13px; border-radius:50%; display:inline-block; }
  .mbody { padding:30px 32px 32px; display:flex; flex-direction:column; gap:18px; }
  .mono { font-family:'JetBrains Mono',monospace; }
  .url { background:var(--well); border:1.5px solid var(--line); border-radius:14px;
         padding:18px 22px; font-family:'JetBrains Mono',monospace; font-size:26px; color:var(--mute); }
  .url .id { background:${ORANGE}; color:#120B02; border-radius:6px; padding:1px 8px; font-weight:500; }
  .who { font-size:21px; color:var(--mute); }
  .out { display:flex; align-items:center; gap:18px; font-size:27px; font-weight:600;
         padding:16px 20px; border-radius:16px; border:1.5px solid var(--line); }
  .out i { width:38px; height:38px; border-radius:50%; flex:none; display:flex; align-items:center;
           justify-content:center; font-style:normal; font-size:21px; font-weight:800; color:#fff; }
  .out.bad i { background:var(--bad); } .out.ok i { background:var(--ok); }
  .out.bad { border-color:color-mix(in srgb, var(--bad) 45%, transparent); }
  .out.ok { border-color:color-mix(in srgb, var(--ok) 45%, transparent); }
  .out em { font-style:normal; color:var(--mute); font-weight:500; }
  .term { background:var(--well); border-radius:16px; padding:24px 26px;
          font-family:'JetBrains Mono',monospace; font-size:23px; line-height:1.75; color:var(--text); }
  .term .p { color:${ORANGE}; } .term .d { color:var(--mute); } .term .g { color:var(--ok); }
  .trow3 { display:flex; align-items:center; justify-content:space-between; padding:14px 4px;
           border-bottom:1.5px solid var(--line); font-family:'JetBrains Mono',monospace; font-size:26px; }
  .trow3:last-of-type { border-bottom:none; }
  .badge { font-family:'Manrope',sans-serif; font-size:20px; font-weight:800; letter-spacing:.5px;
           border-radius:999px; padding:7px 16px; }
  .badge.ok { color:var(--ok); background:color-mix(in srgb, var(--ok) 14%, transparent); }
  .badge.bad { color:var(--bad); background:color-mix(in srgb, var(--bad) 14%, transparent); }
  .sql { font-family:'JetBrains Mono',monospace; font-size:21px; color:var(--mute);
         background:var(--well); border-radius:12px; padding:14px 18px; }
  .sql b { color:${ORANGE}; font-weight:500; }
  .payrow { display:flex; align-items:center; gap:20px; }
  .testmode { font-size:19px; font-weight:800; letter-spacing:2px; color:${ORANGE};
              border:1.5px solid ${ORANGE}; border-radius:8px; padding:6px 12px; }
  .paybtn { position:relative; background:var(--text); color:var(--ground); font-size:30px;
            font-weight:800; border-radius:14px; padding:18px 40px; }
  .paybtn sup { position:absolute; top:-14px; right:-16px; background:${ORANGE}; color:#120B02;
                font-size:19px; font-weight:800; border-radius:999px; padding:4px 11px; }
  .card4242 { font-family:'JetBrains Mono',monospace; font-size:21px; color:var(--mute); margin-left:auto; }
  .step { display:flex; align-items:center; gap:18px; font-size:27px; font-weight:600; }
  .step .n { font-family:'JetBrains Mono',monospace; font-size:20px; color:${ORANGE}; width:30px; }
  .step em { font-style:normal; margin-left:auto; font-family:'JetBrains Mono',monospace;
             font-size:21px; color:var(--mute); font-weight:400; }
  .step.done em { color:var(--ok); }
  .mnote { font-size:23px; color:var(--mute); margin-top:24px; line-height:1.45; }
  .mnote b { color:var(--text); font-weight:600; }

  /* compare */
  .cmp { display:flex; flex-direction:column; gap:22px; }
  .ccard { background:var(--card); border:1.5px solid var(--line); border-radius:30px;
           padding:44px 46px; box-shadow:var(--shadow); }
  .ccard.pick { border-color:rgba(255,138,0,.55); background:var(--pick);
                box-shadow:var(--shadow), inset 3px 0 0 ${ORANGE}; }
  .ccard .top { display:flex; align-items:baseline; gap:22px; }
  .ccard .amt { font-family:'Cal Sans',sans-serif; font-size:100px; line-height:1; letter-spacing:-1px; }
  .ccard.pick .amt { color:${ORANGE}; }
  .ccard .lbl { font-size:31px; font-weight:600; color:var(--mute); }
  .ccard.pick .lbl { color:var(--text); }
  .ticks { display:flex; flex-wrap:wrap; gap:12px 12px; margin-top:28px; }
  .tick { font-size:25px; font-weight:600; border-radius:999px; padding:10px 20px;
          color:var(--ok); background:color-mix(in srgb, var(--ok) 13%, transparent); }

  /* cta pill */
  .cta .pill { margin-top:44px; background:${ORANGE}; color:#120B02; font-size:32px; font-weight:800;
               border-radius:999px; padding:20px 46px; }

  .foot { position:absolute; left:88px; right:88px; bottom:52px;
          display:flex; align-items:center; justify-content:space-between; }
  .foot .mark { display:flex; align-items:center; gap:14px; }
  .foot .mark .b { width:26px; height:26px; }
  .foot .handle { font-size:24px; font-weight:700; letter-spacing:1.5px; color:var(--mute); }
  .foot .count { font-family:'JetBrains Mono',monospace; font-size:22px; color:var(--faint);
                 font-variant-numeric:tabular-nums; }
`;

let THEME = '';
function page(inner) {
  return `<!DOCTYPE html><html><head><meta charset="utf-8">
  <link href="https://fonts.googleapis.com/css2?family=Cal+Sans&family=Manrope:wght@400..800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>${CSS}</style></head><body><div class="slide ${THEME}"><div class="glow"></div>${inner}</div></body></html>`;
}

function foot(handle, i, total) {
  return `<div class="foot">
    <div class="mark"><span class="b">${BURST}</span><span class="handle">${handle}</span></div>
    <span class="count">${String(i).padStart(2, '0')} / ${String(total).padStart(2, '0')}</span>
  </div>`;
}

const LOGO_FG = { claude: '#D97757', openai: '#FFFFFF', googlegemini: '#8AB4F8',
                  copilot: '#FFFFFF', microsoft: '#FFFFFF' };

function tile(icon) {
  return `<span class="tile"><span class="lg" style="color:${LOGO_FG[icon] || '#FFF'}">${loadIcon(icon)}</span></span>`;
}

function cards(list) {
  return `<div class="cards ${list.length === 1 ? 'solo' : ''}">${list.map((c) => `<div class="card ${c.pick ? 'pick' : ''}">
    ${tile(c.icon)}
    <span class="cmeta"><div class="cname">${c.name}</div>${c.note ? `<div class="cnote">${c.note}</div>` : ''}</span>
    ${c.price ? `<span class="cprice">${c.price}${c.priceNote ? `<small>${c.priceNote}</small>` : ''}</span>`
              : `<span class="where">${c.where}</span>`}
  </div>`).join('')}</div>`;
}

const DOTS = `<span class="mdots"><i style="background:#EC6A5E"></i><i style="background:#F5BF4F"></i><i style="background:#61C554"></i></span>`;
const MOCKS = {
  urlbar: (m) => `<div class="who">${m.who}</div>
    <div class="url">${m.url}</div>
    ${m.outcomes.map((o) => `<div class="out ${o.ok ? 'ok' : 'bad'}"><i>${o.ok ? '✓' : '✕'}</i><span>${o.t}</span></div>`).join('')}`,
  terminal: (m) => `<div class="term">${m.lines.join('<br>')}</div>`,
  tables: (m) => `${m.rows.map((r) => `<div class="trow3"><span>${r.name}</span><span class="badge ${r.on ? 'ok' : 'bad'}">${r.on ? 'RLS enabled' : 'RLS disabled'}</span></div>`).join('')}
    ${m.sql ? `<div class="sql">${m.sql}</div>` : ''}`,
  payment: (m) => `<div class="payrow"><span class="testmode">TEST MODE</span><span class="paybtn">${m.button}<sup>×2</sup></span><span class="card4242">4242 4242 4242 4242</span></div>
    ${m.outcomes.map((o) => `<div class="out ok"><i>✓</i><span>${o.t} <em>${o.r}</em></span></div>`).join('')}`,
  steps: (m) => m.steps.map((st, i) => `<div class="step ${st.done ? 'done' : ''}"><span class="n">${String(i + 1).padStart(2, '0')}</span>${st.t}<em>${st.r || ''}</em></div>`).join(''),
};

function build(post, { root }) {
  const pages = {};
  THEME = post.theme === 'light' ? 'light' : '';
  const H = post.handle || '@shazimbuilds';
  const total = 1 + (post.slides || []).length + 1;
  let n = 0;
  const pad = (x) => String(x).padStart(2, '0');

  // cover
  const c = post.cover;
  pages[`${pad(++n)}-cover`] = page(`<div class="cov">
    <div class="kicker">${c.kicker}</div>
    ${c.big ? `<div class="cbig">${c.big}</div>` : ''}
    <div class="ctitle ${c.big ? 'sm' : ''}">${c.title}</div>
    <div class="csub">${c.sub}</div>
    ${c.logos ? `<div class="logorow">${c.logos.map(tile).join('')}</div>` : ''}
    ${c.stamp ? `<div class="stamp">${c.stamp}</div>` : ''}
  </div>${foot(H, n, total)}`);

  (post.slides || []).forEach((s) => {
    let body = '';
    if (s.type === 'chart') {
      const max = Math.max(...s.bars.map((b) => b.value));
      body = `<div class="chart">${s.bars.map((b) => `<div class="brow ${b.win ? 'win' : ''}">
          <span class="blabel">${b.label}</span>
          <span class="btrack"><span class="bar" style="width:${Math.max(44, (b.value / max) * 430)}px"></span>
          <span class="bval">${b.display}</span></span>
        </div>`).join('')}<div class="cfoot">${s.foot}</div></div>`;
    } else if (s.type === 'stat') {
      body = `<div class="stat"><div class="big">${s.stat}</div><div class="cap">${s.cap}</div></div>`;
    } else if (s.type === 'flow') {
      body = `<div class="flow">${s.steps.map((st, i) => `${i ? '<div class="farrow">↓</div>' : ''}
        <div class="fstep ${st.hot ? 'hot' : ''}"><span class="n">${pad(i + 1)}</span>
        <span><div class="t">${st.t}</div><div class="s">${st.s}</div></span></div>`).join('')}
        <div class="closer">${s.closer}</div></div>`;
    } else if (s.type === 'scan') {
      body = `<div class="scan">${s.nums.map((x) => `<div class="snum ${x.hot ? 'hot' : ''}"><b>${x.n}</b><span>${x.t}</span></div>`).join('')}
        ${s.chips ? `<div class="chiprow">${s.chips.map((c) => `<span class="tchip">${c}</span>`).join('')}</div>` : ''}</div>`;
    } else if (s.type === 'mock') {
      body = `<div class="mock"><div class="mhead">${DOTS}${s.mock.title}</div>
        <div class="mbody">${MOCKS[s.mock.kind](s.mock)}</div></div>`;
    } else if (s.type === 'compare') {
      body = `<div class="cmp">${s.options.map((o) => `<div class="ccard ${o.pick ? 'pick' : ''}">
        <div class="top"><span class="amt">${o.amt}</span><span class="lbl">${o.lbl}</span></div>
        ${o.ticks ? `<div class="ticks">${o.ticks.map((t) => `<span class="tick">✓ ${t}</span>`).join('')}</div>` : ''}
      </div>`).join('')}</div>`;
    } else {
      body = cards(s.cards);
    }
    if (s.note) body += `<div class="mnote">${s.note}</div>`;
    const slug = s.slug || s.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 26);
    pages[`${pad(++n)}-${slug}`] = page(`<div class="wrap">
      <div class="kicker">${s.kicker}</div>
      <div class="title">${s.title}</div>
      ${s.body ? `<div class="body">${s.body}</div>` : ''}
      <div class="fill">${body}</div>
    </div>${foot(H, n, total)}`);
  });

  pages[`${pad(++n)}-cta`] = page(`<div class="cta">
    <div class="q">${post.cta.q}</div>
    <div class="sub">${post.cta.sub}</div>
    ${post.cta.pill ? `<div class="pill">${post.cta.pill}</div>` : ''}
  </div>${foot(H, n, total)}`);

  return pages;
}

module.exports = { build };
