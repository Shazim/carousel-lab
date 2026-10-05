// Template: level-series v2 — premium pass: fixed 88px margin frame, one type
// scale across all slides, 8px spacing grid, layered shadow tokens, drawn
// macOS-quality folders, SVG dune composition background. 1080x1350.
const fs = require('fs');
const path = require('path');

const LOGO_DIR = path.join(__dirname, '..', 'assets', 'logos');
const INK = '#22384C';
const MUTE = '#6C7A88';
const SH_SM = '0 4px 14px rgba(30,40,50,.07)';
const SH_MD = '0 12px 32px rgba(30,40,50,.10), 0 3px 8px rgba(30,40,50,.05)';
const SH_LG = '0 32px 70px rgba(30,40,50,.16), 0 8px 20px rgba(30,40,50,.07)';

function loadIcon(name) {
  const raw = fs.readFileSync(path.join(LOGO_DIR, name + '.svg'), 'utf8');
  return raw.replace(/<svg([^>]*)>/, (m, attrs) => {
    attrs = attrs.replace(/\s(width|height|style)="[^"]*"/g, '');
    return `<svg${attrs} width="100%" height="100%">`;
  });
}

const CSS = `
  * { margin:0; padding:0; box-sizing:border-box; }
  .slide { width:1080px; height:1350px; position:relative; overflow:hidden;
           font-family:'Manrope',sans-serif; color:${INK};
           background:linear-gradient(180deg,#FBF6EC 0%, #F6F2E8 34%, #F0F0E9 62%, #EBEEE9 100%); }

  /* --- layered dune composition (fallback when no painted bg) ------------ */
  .scape { position:absolute; inset:0; pointer-events:none; }
  .scape .sun { position:absolute; top:-16%; left:50%; transform:translateX(-50%);
        width:1500px; height:760px; border-radius:50%;
        background:radial-gradient(ellipse, rgba(255,190,110,.22), rgba(255,190,110,0) 62%); }
  .scape svg.dunes { position:absolute; bottom:0; left:0; width:100%; }
  .scape .haze { position:absolute; bottom:0; left:0; right:0; height:64%;
        background:linear-gradient(180deg, rgba(251,246,236,0) 0%,
          rgba(251,246,236,.6) 34%, rgba(251,246,236,0) 72%); }
  .bgimg { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; }
  .bgfade { position:absolute; inset:0;
        background:linear-gradient(180deg,#FBF6EC 0%, rgba(251,246,236,.9) 26%, rgba(251,246,236,0) 60%); }

  /* --- frame: nothing crosses the 88px margin --------------------------- */
  .content { position:absolute; inset:0; padding:84px 88px 88px;
             display:flex; flex-direction:column; }
  .tblock { display:flex; flex-direction:column; align-items:flex-start; }
  .right .tblock { text-align:right; align-items:flex-end; }

  .pillrow { display:flex; align-items:center; gap:18px; margin:12px 0 16px; }
  .lvlpill { display:inline-block; background:#141A21; color:#fff; font-size:23px;
             font-weight:700; border-radius:999px; padding:6px 20px;
             letter-spacing:.3px; box-shadow:${SH_SM}; }
  .byline { font-size:20px; font-weight:700; letter-spacing:1.8px;
            color:rgba(34,56,76,.35); }
  .title { font-family:'Fraunces',serif; font-weight:590; font-size:110px;
           line-height:1.02; letter-spacing:-2.5px;
           font-variation-settings:'opsz' 144, 'SOFT' 0, 'WONK' 0; }
  .bar { height:14px; width:190px; border-radius:7px; margin:24px 0 28px; }
  .def { font-size:30px; font-weight:500; color:${MUTE}; line-height:1.42; max-width:880px; }
  .body { font-size:40px; font-weight:650; line-height:1.34; margin-top:24px;
          letter-spacing:-.4px; max-width:912px; }
  .usefor { font-size:26px; font-weight:600; color:${MUTE}; margin:36px 0 14px; }
  .chips { display:flex; gap:16px; flex-wrap:wrap; max-width:912px; }
  .right .chips { justify-content:flex-end; }
  .chip { background:#fff; border-radius:999px; padding:13px 28px; font-size:27px;
          font-weight:700; box-shadow:${SH_SM}; letter-spacing:-.2px;
          display:inline-flex; align-items:center; gap:13px; }
  .chip i { width:11px; height:11px; border-radius:50%; display:inline-block; }

  /* --- mockups ----------------------------------------------------------- */
  .mockcard { background:rgba(255,255,255,.96); border-radius:32px; padding:20px;
              box-shadow:${SH_LG}; }
  .win { background:#10151D; border-radius:22px; padding:28px 34px; color:#D7DCE3;
         font-family:'JetBrains Mono',ui-monospace,monospace; font-size:21px; line-height:1.62; }
  .win-sm .win { font-size:19px; line-height:1.54; padding:22px 30px; }
  .win-sm .meter { margin-top:12px; padding-top:12px; }
  .win-sm.mockcard { padding:16px; }
  .winhead { display:flex; align-items:center; gap:12px; margin:-2px 0 18px;
             font-family:-apple-system,'Manrope',sans-serif; font-size:20px; color:#8B93A0; }
  .dots { display:inline-flex; gap:8px; margin-right:6px; }
  .dots i { width:14px; height:14px; border-radius:50%; display:inline-block; }
  .winhead b { color:#E8EBEF; font-weight:600; letter-spacing:.2px; }
  .burst { width:32px; height:32px; border-radius:9px; background:#C96442;
           display:inline-flex; align-items:center; justify-content:center; }

  .trow { display:flex; align-items:center; gap:16px; background:#171E29;
          border-radius:14px; padding:14px 20px; margin:12px 0; }
  .trow .tic { width:36px; height:36px; border-radius:10px; display:flex; align-items:center;
          justify-content:center; font-weight:700; font-size:19px; color:#0F1520;
          font-family:-apple-system,sans-serif; flex:none; }
  .trow .tr { margin-left:auto; color:#7ED9A2; font-size:19px; padding-left:16px; flex:none; }
  .perm { background:#241D14; border:1px solid #453722; border-radius:14px;
          padding:16px 20px; margin-top:16px; }
  .perm .q { color:#E8C88A; font-size:20px; margin-bottom:14px; }
  .pbtn { display:inline-block; border-radius:10px; padding:9px 18px; font-size:18px;
          margin-right:12px; background:#2A3140; color:#CFD5DE;
          font-family:-apple-system,sans-serif; }
  .pbtn.yes { background:#7ED9A2; color:#0F1F16; font-weight:700; }

  .dim { color:#77808E; } .grn { color:#7ED9A2; } .org { color:#E8913D; }
  .cy { color:#7FBEE8; } .yl { color:#E8C88A; }
  .hlt { background:#E8913D; color:#181207; border-radius:6px; padding:1px 8px; }

  .meter { display:flex; align-items:center; gap:16px; margin-top:18px;
           border-top:1px solid #232B37; padding-top:16px; font-size:19px; color:#8B93A0; }
  .meter .track { flex:1; height:9px; background:#1D2530; border-radius:5px; }
  .meter .fill { height:9px; width:14%; background:#E8913D; border-radius:5px; }

  .cmdrow { display:flex; gap:28px; margin:10px 0; }
  .cmdrow b { color:#E8913D; font-weight:500; min-width:220px; }
  .skrow { display:flex; gap:28px; padding:12px 18px; border-radius:12px; margin:5px 0; }
  .skrow b { color:#E8913D; font-weight:500; min-width:236px; }
  .skrow.hot { background:#241D14; }

  .grid8 { display:grid; grid-template-columns:repeat(4,1fr); gap:24px; margin-bottom:48px; }
  .ltile { background:#FCFAF5; border-radius:30px; aspect-ratio:1; display:flex;
           align-items:center; justify-content:center; box-shadow:${SH_MD}; }
  .ltile .lg { width:42%; height:42%; }

  .diagram { position:relative; height:432px; }
  .node { position:absolute; background:#10151D; border-radius:18px; padding:18px 26px;
          color:#E8EBEF; font-size:22px; font-weight:600; box-shadow:${SH_LG};
          font-family:-apple-system,'Manrope',sans-serif; width:264px; }
  .node small { display:block; color:#8B93A0; font-weight:500; font-size:17.5px; margin-top:5px; }
  .node .live { color:#7ED9A2; }

  /* --- cover / cta --------------------------------------------------------*/
  .cover { position:absolute; inset:0; text-align:center; padding-top:104px; }
  .cover .ck { font-size:36px; font-weight:700; margin-top:20px; letter-spacing:-.3px; }
  .cover .ct { font-family:'Fraunces',serif; font-weight:590; font-size:148px;
               letter-spacing:-4px; line-height:1.04;
               font-variation-settings:'opsz' 144, 'SOFT' 0, 'WONK' 0; }
  .frow { display:flex; justify-content:center; gap:14px; margin-top:48px; padding:0 40px; }
  .fcell { width:104px; text-align:center; }
  .fcell .lvlpill { font-size:16px; padding:4px 13px; margin:0 0 10px; }
  .fcell .fl { font-size:18.5px; font-weight:700; margin-top:8px; letter-spacing:-.2px; }

  .skick { font-size:23px; font-weight:800; letter-spacing:5px; text-transform:uppercase; color:#B8612A; }
  .tabs { display:flex; gap:8px; flex-wrap:wrap; margin:-2px 0 20px; }
  .tab { font-family:-apple-system,'Manrope',sans-serif; font-size:17px; font-weight:700;
         color:#7D8796; border:1.5px solid #283140; border-radius:9px; padding:5px 12px; }
  .tab.done { color:#7ED9A2; border-color:#23452F; }
  .tab.on { background:#E8913D; color:#181207; border-color:#E8913D; }
  .nrow { display:flex; align-items:center; gap:20px; padding:16px 18px; border-radius:14px; margin:6px 0; }
  .nrow.hot { background:#1B2230; }
  .nrow .nt { width:52px; height:52px; border-radius:14px; background:#0A0D12; border:1.5px solid #283140;
              display:flex; align-items:center; justify-content:center; flex:none; }
  .nrow .nt span { width:28px; height:28px; display:flex; color:#D7DCE3; }
  .nrow b { font-family:-apple-system,'Manrope',sans-serif; font-size:26px; color:#E8EBEF; font-weight:600; min-width:150px; }
  .nrow em { font-style:normal; margin-left:auto; color:#E8913D; font-size:23px; }
  .wm { position:absolute; bottom:32px; left:0; right:0; text-align:center;
        font-family:'Manrope',sans-serif; font-size:21px; font-weight:700;
        letter-spacing:2.5px; color:rgba(34,56,76,.38); z-index:9; }
  .wm.onart { color:rgba(255,252,245,.88); text-shadow:0 1px 10px rgba(60,55,40,.4); }
  .wm.top { top:34px; bottom:auto; }

  .cta-h { font-family:'Fraunces',serif; font-weight:590; font-size:96px;
           letter-spacing:-2.5px; line-height:1.14;
           font-variation-settings:'opsz' 144, 'SOFT' 0, 'WONK' 0; }
  .mk { background:#F5D93F; border-radius:12px; padding:2px 20px; box-shadow:${SH_SM}; }
  .cta-sub { font-size:36px; font-weight:600; line-height:1.44; margin-top:40px; max-width:840px; }
  .bigpill { display:inline-block; background:#141A21; color:#fff; border-radius:999px;
             padding:24px 64px; font-size:40px; font-weight:700; margin-top:56px;
             box-shadow:${SH_MD}; }
`;

// macOS-quality folder: gradient body, lighter front face, highlight edge
let folderSeq = 0;
function folder(color, w = 88) {
  const id = 'fg' + (++folderSeq);
  return `<svg style="width:${w}px;height:${Math.round(w * 0.76)}px;display:block;
      filter:drop-shadow(0 5px 10px rgba(30,40,50,.22))" viewBox="0 0 92 70">
    <defs>
      <linearGradient id="${id}a" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${color}" stop-opacity=".82"/>
        <stop offset="1" stop-color="${color}"/>
      </linearGradient>
      <linearGradient id="${id}b" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#fff" stop-opacity=".38"/>
        <stop offset=".18" stop-color="#fff" stop-opacity=".12"/>
        <stop offset="1" stop-color="#fff" stop-opacity="0"/>
      </linearGradient>
    </defs>
    <path d="M4 15 q0-7 7-7 h21 q3 0 5 2 l5 5 h39 q7 0 7 7 v33 q0 7-7 7 H11 q-7 0-7-7 Z" fill="url(#${id}a)"/>
    <path d="M4 24 q0-4 4-4 h76 q4 0 4 4 v31 q0 7-7 7 H11 q-7 0-7-7 Z" fill="${color}" style="filter:brightness(1.14) saturate(.94)"/>
    <path d="M4 24 q0-4 4-4 h76 q4 0 4 4 v6 H4 Z" fill="url(#${id}b)"/>
  </svg>`;
}

function dunes(h) {
  const s = h / 560; // vertical stretch, walker drawn at final scale
  const y = (v) => Math.round(v * s);
  return `<svg class="dunes" viewBox="0 0 1080 ${h}" preserveAspectRatio="none" height="${h}">
  <path d="M0 ${y(250)} C 190 ${y(200)} 400 ${y(240)} 560 ${y(268)} C 740 ${y(300)} 920 ${y(272)} 1080 ${y(236)} L1080 ${h} 0 ${h}Z" fill="#E8E0C9" opacity=".5"/>
  <path d="M0 ${y(356)} C 230 ${y(306)} 430 ${y(366)} 630 ${y(376)} C 810 ${y(384)} 970 ${y(352)} 1080 ${y(336)} L1080 ${h} 0 ${h}Z" fill="#DCD8BB" opacity=".55"/>
  <path d="M540 ${h} C 552 ${y(512)} 522 ${y(470)} 546 ${y(424)} C 560 ${y(396)} 552 ${y(380)} 548 ${y(366)}" stroke="#F3ECD6" stroke-width="16" fill="none" stroke-linecap="round" opacity=".8"/>
  <path d="M0 ${y(462)} C 260 ${y(420)} 520 ${y(482)} 780 ${y(466)} C 900 ${y(458)} 1000 ${y(446)} 1080 ${y(440)} L1080 ${h} 0 ${h}Z" fill="#CCCEA9" opacity=".6"/>
  <g opacity=".75" fill="#57534A" transform="translate(547 ${y(352)}) scale(${Math.max(1, s * 1.15)}) translate(-547 -352)">
    <circle cx="547" cy="352" r="6.5"/>
    <path d="M547 358 c -4 6 -5 14 -4 22 l 3.4 1 c .4 -7 .6 -13 .6 -13 s 1.6 6 2.6 13 l 3.4 -1 c 1 -9 -1 -16 -6 -22 Z"/>
  </g>
</svg>`;
}

function bg(root, img, strength = 1, duneH = 560) {
  for (const candidate of [img, img && img.replace(/\.png$/, '.jpg')].filter(Boolean)) {
    const abs = path.resolve(root, candidate);
    if (fs.existsSync(abs)) return `<img class="bgimg" src="file://${abs}"><div class="bgfade"></div>`;
  }
  return `<div class="scape" style="opacity:${strength}"><div class="sun"></div>${dunes(duneH)}<div class="haze"></div></div>`;
}

function winhead(title, sub) {
  return `<div class="winhead"><span class="dots"><i style="background:#EC6A5E"></i><i style="background:#F5BF4F"></i><i style="background:#61C554"></i></span>
    <span class="burst"><svg width="19" height="19" viewBox="0 0 24 24" fill="#fff"><path d="M12 2l1.8 7.2L21 12l-7.2 1.8L12 21l-1.8-7.2L3 12l7.2-1.8z"/></svg></span>
    <b>${title}</b>${sub ? `<span>${sub}</span>` : ''}</div>`;
}

const MOCKS = {
  toolcalls(m) {
    const colors = { R: '#7FBEE8', E: '#E8C88A', $: '#7ED9A2' };
    const rows = m.rows.map((r) => `<div class="trow">
      <span class="tic" style="background:${colors[r.k] || '#ccc'}">${r.k}</span>
      <span><b style="color:#E8EBEF;font-family:-apple-system,'Manrope',sans-serif;font-weight:600">${r.t}</b> <span class="dim">${r.d}</span></span>
      <span class="tr">${r.r}</span></div>`).join('');
    const perm = m.perm ? `<div class="perm"><div class="q">${m.perm.q} <b style="color:#fff">${m.perm.cmd}</b></div>
      <span class="pbtn yes">✓ Yes</span><span class="pbtn">Yes, don't ask again</span><span class="pbtn">No, tell Claude what to do</span></div>` : '';
    return rows + perm;
  },
  lines(m) { return m.lines.map((l) => `<div style="margin:5px 0">${l}</div>`).join(''); },
  cmdlist(m) { return m.rows.map((r) => `<div class="cmdrow"><b>${r.c}</b><span class="dim">${r.d}</span></div>`).join(''); },
  names(m) {
    return m.rows.map((r) => `<div class="nrow ${r.hot ? 'hot' : ''}"><span class="nt"><span>${loadIcon(r.icon)}</span></span>
      <b>${r.name}</b><em>${r.term}</em></div>`).join('');
  },
  skill(m) {
    const tabs = `<div class="tabs">${m.tabs.map((t, i) =>
      `<span class="tab ${i === m.active ? 'on' : i < m.active ? 'done' : ''}">${i < m.active ? '✓ ' : ''}${t}</span>`).join('')}</div>`;
    return tabs + m.lines.map((l) => `<div style="margin:5px 0">${l}</div>`).join('');
  },
  skilllist(m) { return m.rows.map((r, i) => `<div class="skrow ${i === 0 ? 'hot' : ''}"><b>${r.c}</b><span class="dim">${r.d}</span></div>`).join(''); },
};

function mockcard(mock, tilt, small) {
  const inner = MOCKS[mock.type](mock);
  const head = mock.title ? winhead(mock.title, mock.sub) : '';
  return `<div class="mockcard ${small ? 'win-sm' : ''}" style="${tilt ? `transform:rotate(${tilt}deg);` : ''}">
    <div class="win">${head}${inner}${mock.meter ? `<div class="meter"><span>context</span><div class="track"><div class="fill"></div></div><span>${mock.meter}</span></div>` : ''}</div></div>`;
}

function chips(list, color) {
  return `<div class="usefor">use it for</div><div class="chips">
    ${list.map((c) => `<span class="chip"><i style="background:${color}"></i>${c}</span>`).join('')}</div>`;
}

let PILL = 'Lvl';
function levelSlide(s, root) {
  const dark = s.n === 9 ? '#3A3A3A' : s.color;
  const ident = s.n != null
    ? `${folder(s.color)}<div class="pillrow"><span class="lvlpill">${PILL} ${s.n}</span><span class="byline">@shazimbuilds</span></div>`
    : `<div class="pillrow"><span class="skick">${s.kicker || ''}</span><span class="byline">@shazimbuilds</span></div>`;
  const head = `<div class="tblock">
      ${ident}
      <div class="title">${s.title}</div>
      <div class="bar" style="background:${dark}"></div>
      ${s.def ? `<div class="def">${s.def}</div>` : ''}
      ${s.body ? `<div class="body">${s.body}</div>` : ''}
      ${s.chips ? chips(s.chips, dark) : ''}
    </div>`;
  const grid = s.logos ? `<div class="grid8">${s.logos.map((l) =>
    `<div class="ltile"><div class="lg">${loadIcon(l)}</div></div>`).join('')}</div>` : '';
  const diagram = s.diagram ? `<div class="diagram">
      <svg width="904" height="432" style="position:absolute;inset:0">
        <line x1="452" y1="92" x2="145" y2="298" stroke="#9AA7B4" stroke-width="2.5"/>
        <line x1="452" y1="92" x2="452" y2="298" stroke="#9AA7B4" stroke-width="2.5"/>
        <line x1="452" y1="92" x2="759" y2="298" stroke="#9AA7B4" stroke-width="2.5"/>
      </svg>
      <div class="node" style="left:452px;top:0;transform:translateX(-50%);">✳ Claude<small>your main thread</small></div>
      ${s.diagram.map((d, i) => `<div class="node" style="left:${[145, 452, 759][i]}px;top:298px;transform:translateX(-50%);">
        <span class="live">●</span> ${d}<small>own context · running</small></div>`).join('')}
    </div>` : '';
  const mock = s.mock ? mockcard(s.mock, s.tilt, s.mockPos === 'top') : '';
  const top = s.mockPos === 'top';
  const parts = top
    ? [`<div style="padding-top:14px">${grid || mock || diagram}</div>`, `<div style="height:44px"></div>`, head]
    : [grid, head, `<div style="flex:1;min-height:40px"></div>`, mock || diagram];
  return `${bg(root, s.bgimg || 'assets/images/lvl-bg.png', 0.55)}<div class="content ${s.align === 'right' ? 'right' : ''}">${parts.join('\n')}</div>`;
}

function coverSlide(c, root) {
  return `${bg(root, c.bgimg || 'assets/images/lvl-bg-cover.png', 1, 720)}<div class="cover">
    <svg width="52" height="52" viewBox="0 0 24 24" fill="#C96442"><path d="M12 1.5l1.9 7.6L21.5 11l-7.6 1.9L12 20.5l-1.9-7.6L2.5 11l7.6-1.9z"/></svg>
    <div class="ck">${c.kicker}</div>
    <div class="ct" ${c.titleSize ? `style="font-size:${c.titleSize}px;letter-spacing:-3px"` : ''}>${c.title}</div>
    <div class="frow">${c.levels.map((l, i) => `<div class="fcell">
      <span class="lvlpill">${PILL} ${i + 1}</span><div style="display:flex;justify-content:center">${folder(l.color, 74)}</div><div class="fl">${l.label}</div>
    </div>`).join('')}</div>
  </div><div class="wm onart">@shazimbuilds</div>`;
}

function ctaSlide(c, root) {
  return `${bg(root, c.bgimg || 'assets/images/lvl-bg.png', 0.8)}<div class="content" style="justify-content:center;align-items:center;text-align:center">
    <div class="cta-h">${c.line1}<br><span class="mk">${c.mark}</span> ${c.line2}</div>
    <div class="cta-sub">${c.sub}</div>
    <div class="bigpill">${c.pill}</div>
  </div>`;
}

function page(inner) {
  return `<!DOCTYPE html><html><head><meta charset="utf-8">
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght,SOFT,WONK@9..144,400..650,0..100,0..1&family=Manrope:wght@400..800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>${CSS}</style></head><body><div class="slide">${inner}</div></body></html>`;
}

function build(post, { root }) {
  const pages = {};
  let n = 0;
  const pad = (x) => String(x).padStart(2, '0');
  PILL = post.pill || 'Lvl';
  if (post.cover) pages[`${pad(++n)}-cover`] = page(coverSlide(post.cover, root));
  (post.levels || []).forEach((s) => {
    const tag = s.n != null ? `${PILL.toLowerCase()}${s.n}-` : '';
    const slug = s.slug || s.title.toLowerCase().replace(/<[^>]+>/g, '').replace(/[^a-z0-9]+/g, '-');
    pages[`${pad(++n)}-${tag}${slug}`] = page(levelSlide(s, root));
  });
  if (post.cta) pages[`${pad(++n)}-cta`] = page(ctaSlide(post.cta, root));
  return pages;
}

module.exports = { build };
