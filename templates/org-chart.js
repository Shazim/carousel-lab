// Template: org-chart — a stack organised like a company. Warm graph-paper
// ground, Cal Sans display, Manrope body, JetBrains Mono for names/numbers.
// Cover = CEO card wired to department cards (animated: dots run down the
// wires and light each department; render.js records it to MP4).
// Department slides = tab bar + "hire" rows with real usage badges.
// Orange = personal accent; each department carries one highlighter tint
// (the single per-slide variation). 1080x1350.
const fs = require('fs');
const path = require('path');

const LOGO_DIR = path.join(__dirname, '..', 'assets', 'logos');
const ORANGE = '#FF8A00';
const ORANGE_TXT = '#E2700A';
const INK = '#171512';
const MUTE = '#5E5A52';
const FAINT = '#A29C90';
const LINE = '#E4DED2';
const SH_SM = '0 4px 14px rgba(40,30,20,.07)';
const SH_MD = '0 12px 32px rgba(40,30,20,.10), 0 3px 8px rgba(40,30,20,.05)';
const SH_LG = '0 32px 70px rgba(40,30,20,.16), 0 8px 20px rgba(40,30,20,.07)';

// department tints: [soft card bg, strong mark, text-safe ink]
const TINTS = {
  orange: ['#FFF1E0', '#FFB45C', '#B8590A'],
  lilac: ['#F4ECFA', '#C9A9E6', '#7A4BA6'],
  lime: ['#F1F8E2', '#AEDB5E', '#4F7A12'],
  mint: ['#E6F7F2', '#7FD6BF', '#1F7A63'],
  pink: ['#FCEBF3', '#F09BC3', '#A33A6C'],
};

// drawn glyphs (24px grid, stroked) for tools without an official mark
const G = {
  code: '<path d="M8.5 7 3.5 12l5 5M15.5 7l5 5-5 5"/>',
  search: '<circle cx="10.5" cy="10.5" r="6"/><path d="m15 15 5.5 5.5"/>',
  pen: '<path d="M4 20l4.5-1.2L19.3 8a2.1 2.1 0 0 0-3-3L5.5 15.7z"/><path d="m14.5 6.5 3 3"/>',
  film: '<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="M3 9.5h18M7.5 5l2 4.5M12.5 5l2 4.5M17.5 5l2 4.5"/>',
  send: '<path d="M21 3 10.5 13.5"/><path d="M21 3l-6.5 18-4-7.5L3 9.5z"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.6 2.8 3.8 5.8 3.8 9s-1.2 6.2-3.8 9c-2.6-2.8-3.8-5.8-3.8-9S9.4 5.8 12 3z"/>',
  flame: '<path d="M12 21c-3.9 0-6.5-2.6-6.5-6.2 0-3.4 2.6-5.4 3.6-8.8 2 1.4 3 3.2 3 5 .9-.6 1.6-1.7 1.8-3 2.4 1.9 4.6 4.3 4.6 7.1 0 3.4-2.7 5.9-6.5 5.9z"/>',
  layers: '<path d="m12 3 9 5-9 5-9-5z"/><path d="m3 12.5 9 5 9-5"/><path d="m3 17 9 5 9-5"/>',
  image: '<rect x="3" y="4" width="18" height="16" rx="2.5"/><circle cx="9" cy="9.5" r="1.8"/><path d="m21 16-5-5-9 9"/>',
  layout: '<rect x="3" y="3" width="18" height="18" rx="2.5"/><path d="M3 9h18M9 9v12"/>',
  palette: '<path d="M12 3a9 9 0 1 0 0 18c1.2 0 1.8-.9 1.8-1.8 0-1.3-1-1.7-1-2.8 0-1 .8-1.6 1.8-1.6H17a4 4 0 0 0 4-4C21 6.6 17 3 12 3z"/><circle cx="7.5" cy="11" r="1.2"/><circle cx="10" cy="7" r="1.2"/><circle cx="15" cy="7" r="1.2"/>',
  check: '<path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.2 7.5 9.5 4.3-1.3 7.5-4.9 7.5-9.5V6z"/><path d="m8.5 12 2.5 2.5 4.5-5"/>',
  sparkle: '<path d="M12 3c.6 4.6 2.4 6.4 7 7-4.6.6-6.4 2.4-7 7-.6-4.6-2.4-6.4-7-7 4.6-.6 6.4-2.4 7-7z"/><path d="M19 15.5c.3 1.9 1 2.6 2.5 2.9-1.5.3-2.2 1-2.5 2.9-.3-1.9-1-2.6-2.5-2.9 1.5-.3 2.2-1 2.5-2.9z"/>',
  scissors: '<circle cx="6" cy="6.5" r="2.8"/><circle cx="6" cy="17.5" r="2.8"/><path d="M8.3 8.2 20 18M8.3 15.8 20 6"/>',
  calendar: '<rect x="3.5" y="5" width="17" height="15.5" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4M8 14h3"/>',
  download: '<path d="M12 4v11M7 10.5l5 5 5-5M4.5 19.5h15"/>',
  play: '<rect x="3" y="4" width="18" height="16" rx="3"/><path d="m10 8.5 5.5 3.5-5.5 3.5z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m3.5 6.5 8.5 6.5 8.5-6.5"/>',
  reply: '<path d="M4 5.5h16a1.5 1.5 0 0 1 1.5 1.5v9a1.5 1.5 0 0 1-1.5 1.5H10L5.5 21v-3.5H4A1.5 1.5 0 0 1 2.5 16V7A1.5 1.5 0 0 1 4 5.5z"/><path d="M7 10h10M7 13.5h6"/>',
  terminal: '<rect x="3" y="4" width="18" height="16" rx="3"/><path d="m7 9 3 3-3 3M12.5 15H17"/>',
};
const glyph = (k, stroke = '#fff') => `<svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="${stroke}" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${G[k]}</svg>`;

function logo(name, color) {
  const raw = fs.readFileSync(path.join(LOGO_DIR, name + '.svg'), 'utf8');
  return raw.replace(/<title>.*?<\/title>/, '').replace(/<svg([^>]*)>/, (m, attrs) => {
    attrs = attrs.replace(/\s(width|height|style|fill)="[^"]*"/g, '');
    return `<svg${attrs} fill="${color || 'currentColor'}" width="100%" height="100%">`;
  });
}

const BURST = (c) => `<svg viewBox="0 0 24 24" fill="${c}" width="100%" height="100%"><path d="M12 1.6l1.9 7.5 7.5 1.9-7.5 1.9-1.9 7.5-1.9-7.5L2.6 11l7.5-1.9z"/></svg>`;

// a tool tile: official mark on white, or drawn glyph on a gradient tile
function tile(t, cls = '') {
  if (t.logo) return `<span class="tile ${cls}"><span class="lg">${logo(t.logo, t.color)}</span></span>`;
  const c = t.color || ORANGE;
  return `<span class="tile glyph ${cls}" style="background:linear-gradient(155deg, ${c}CC 0%, ${c} 100%)"><span class="lg">${glyph(t.glyph || 'sparkle')}</span></span>`;
}

const CSS = `
  * { margin:0; padding:0; box-sizing:border-box; }
  .slide { width:1080px; height:1350px; position:relative; overflow:hidden; background:#F7F4ED;
           color:${INK}; font-family:'Manrope',sans-serif; }
  .grid { position:absolute; inset:0;
          background-image:linear-gradient(#ECE7DC 1.2px, transparent 1.2px), linear-gradient(90deg, #ECE7DC 1.2px, transparent 1.2px);
          background-size:40px 40px; background-position:-1px -1px; }
  .glow { position:absolute; right:-150px; top:-170px; width:480px; height:480px; opacity:.10; transform:rotate(12deg); }
  .glow2 { position:absolute; left:-180px; bottom:-200px; width:520px; height:520px; border-radius:50%;
           background:radial-gradient(circle, rgba(255,138,0,.10) 0%, rgba(255,138,0,0) 70%); }

  /* identity pill (the handle on every slide) */
  .who { position:absolute; top:72px; right:88px; display:flex; align-items:center; gap:14px; background:#fff;
         border:1.5px solid ${LINE}; border-radius:999px; padding:8px 24px 8px 8px; box-shadow:${SH_SM}; }
  .who img { width:52px; height:52px; border-radius:50%; object-fit:cover; object-position:50% 18%; background:#ddd; }
  .who b { font-size:24px; font-weight:800; letter-spacing:-.2px; }
  .who span { font-size:24px; font-weight:600; color:${MUTE}; }

  .wrap { position:absolute; inset:0; padding:184px 88px 120px; display:flex; flex-direction:column; }
  .kicker { font-family:'JetBrains Mono',monospace; font-size:22px; font-weight:500; letter-spacing:4px;
            text-transform:uppercase; color:${ORANGE_TXT}; }
  .head { display:flex; align-items:flex-end; justify-content:space-between; gap:24px; margin-top:16px; }
  .title { font-family:'Cal Sans',sans-serif; font-weight:400; font-size:96px; line-height:1.02; letter-spacing:-2px; }
  .title em { font-style:normal; color:${ORANGE}; }
  .sub { font-size:30px; font-weight:500; color:${MUTE}; line-height:1.4; margin-top:16px; }

  /* department art tile */
  .dart { width:120px; height:120px; border-radius:32px; flex:none; display:flex; align-items:center; justify-content:center;
          box-shadow:${SH_MD}, inset 0 1.5px 0 rgba(255,255,255,.6); margin-bottom:6px; }
  .dart span { width:56%; height:56%; display:flex; }

  /* tab bar */
  .tabs { display:flex; justify-content:space-between; align-items:center; background:#fff; border:1.5px solid ${LINE};
          border-radius:24px; padding:10px; margin-top:32px; box-shadow:${SH_SM}; }
  .tab { font-family:'JetBrains Mono',monospace; font-size:20px; font-weight:500; letter-spacing:2px; text-transform:uppercase;
         color:${FAINT}; padding:12px 16px; border-radius:16px; display:flex; align-items:center; gap:10px; border:1.5px solid transparent; }
  .tab i { width:9px; height:9px; border-radius:50%; background:#D6D0C4; }
  .tab.tceo { color:#C96442; }
  .tab.tceo span { width:24px; height:24px; display:flex; }
  .tab.on i { background:currentColor; }

  /* hire rows */
  .rows { display:flex; flex-direction:column; gap:16px; margin-top:24px; }
  .row { background:#fff; border:1.5px solid ${LINE}; border-radius:24px; height:124px; padding:0 28px 0 22px;
         display:flex; align-items:center; gap:24px; box-shadow:${SH_SM}; }
  .tile { width:80px; height:80px; border-radius:22px; background:#fff; border:1.5px solid ${LINE}; flex:none;
          display:flex; align-items:center; justify-content:center; box-shadow:${SH_SM}; }
  .tile .lg { width:50%; height:50%; display:flex; }
  .tile.glyph { border:none; box-shadow:${SH_SM}, inset 0 1.5px 0 rgba(255,255,255,.35); }
  .tile.glyph .lg { width:54%; height:54%; }
  .meta { flex:1; min-width:0; }
  .nm { display:flex; align-items:baseline; gap:14px; white-space:nowrap; }
  .nm b { font-family:'JetBrains Mono',monospace; font-size:31px; font-weight:500; letter-spacing:-.5px; }
  .nm span { font-size:23px; font-weight:800; color:${ORANGE_TXT}; }
  .ds { font-size:26px; font-weight:500; color:${MUTE}; margin-top:6px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
  .rt { display:flex; flex-direction:column; align-items:flex-end; gap:10px; flex:none; }
  .num { font-family:'JetBrains Mono',monospace; font-size:28px; color:${FAINT}; }
  .calls { font-family:'JetBrains Mono',monospace; font-size:19px; font-weight:500; letter-spacing:1.5px; text-transform:uppercase;
           border-radius:10px; padding:6px 12px; white-space:nowrap; }

  /* page dots */
  .dots { position:absolute; left:0; right:0; bottom:64px; display:flex; justify-content:center; gap:10px; }
  .dots i { width:12px; height:12px; border-radius:6px; background:#D9D3C7; }
  .dots i.on { width:44px; background:${ORANGE}; }

  /* cover */
  .cov { position:absolute; inset:0; padding:184px 88px 120px; display:flex; flex-direction:column; }
  .chip { align-self:flex-start; display:flex; align-items:center; gap:10px; font-family:'JetBrains Mono',monospace; font-size:20px;
          letter-spacing:3px; text-transform:uppercase; color:${ORANGE_TXT}; background:#FFF1E0; border:1.5px solid #FFD6A6;
          border-radius:999px; padding:9px 18px; }
  .chip span { width:20px; height:20px; display:flex; }
  .cov .h1 { font-family:'Cal Sans',sans-serif; font-size:120px; line-height:1.0; letter-spacing:-3px; margin-top:28px; }
  .cov .h1 em { font-style:normal; color:${ORANGE}; }
  .cov .sub { font-size:30px; margin-top:24px; }
  .cov .sub b { color:${INK}; font-weight:800; }

  .org { position:relative; width:904px; height:560px; margin-top:auto; }
  .org svg.wires { position:absolute; inset:0; overflow:visible; }
  .ceo { position:absolute; left:312px; top:0; width:280px; height:172px; background:#fff; border:2px solid #E9B9A4;
         border-radius:26px; box-shadow:${SH_MD}; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:10px; }
  .ceo .badge { position:absolute; top:-15px; font-family:'JetBrains Mono',monospace; font-size:17px; letter-spacing:2px;
                color:#fff; background:#C96442; border-radius:8px; padding:3px 10px; }
  .ceo .cl { width:66px; height:66px; display:flex; }
  .ceo b { font-family:'JetBrains Mono',monospace; font-size:26px; font-weight:500; }
  .dept { position:absolute; top:292px; width:164px; height:268px; border-radius:24px; border:2px solid transparent;
          display:flex; flex-direction:column; align-items:center; justify-content:space-between; padding:22px 8px 18px; }
  .dept .di { width:88px; height:88px; border-radius:22px; display:flex; align-items:center; justify-content:center;
              box-shadow:${SH_SM}, inset 0 1.5px 0 rgba(255,255,255,.55); }
  .dept .di span { width:56%; height:56%; display:flex; }
  .dept .dn { font-family:'JetBrains Mono',monospace; font-size:21px; letter-spacing:2.5px; font-weight:500; }
  .dept .dc { font-size:20px; font-weight:700; color:${MUTE}; }
  .wire { fill:none; stroke-width:2.5; stroke-dasharray:7 8; }
  .pulse { position:absolute; left:0; top:0; width:24px; height:24px; margin:-12px 0 0 -12px; border-radius:50%;
           border:3px solid #fff; box-shadow:0 2px 6px rgba(40,30,20,.25); opacity:0; }

  /* audit (waffle) */
  .waffle { display:grid; grid-template-columns:repeat(28, 26px); gap:6px; justify-content:center; margin-top:40px; }
  .waffle i { width:26px; height:26px; border-radius:6px; background:#fff; border:1.5px solid ${LINE}; }
  .waffle i.u { background:${ORANGE}; border-color:${ORANGE}; box-shadow:0 3px 8px rgba(255,138,0,.30); }
  .legend { display:flex; justify-content:center; gap:40px; margin-top:32px; font-size:26px; font-weight:700; color:${MUTE}; }
  .legend i { display:inline-block; width:22px; height:22px; border-radius:6px; margin-right:12px; vertical-align:-3px;
              background:#fff; border:1.5px solid ${LINE}; }
  .legend i.u { background:${ORANGE}; border-color:${ORANGE}; }
  .work { display:flex; gap:16px; margin-top:auto; }
  .wk { flex:1; background:#fff; border:1.5px solid ${LINE}; border-radius:24px; padding:24px 24px 22px; box-shadow:${SH_SM}; }
  .wk .v { font-family:'JetBrains Mono',monospace; font-size:40px; font-weight:500; letter-spacing:-1px; }
  .wk .l { font-size:22px; font-weight:600; color:${MUTE}; margin-top:6px; line-height:1.3; }
  .worklbl { font-family:'JetBrains Mono',monospace; font-size:20px; letter-spacing:3px; text-transform:uppercase; color:${FAINT};
             margin:0 0 16px; }

  /* cta */
  .cta { position:absolute; inset:0; padding:184px 88px 120px; display:flex; flex-direction:column; align-items:center; text-align:center; }
  .cta .star { width:96px; height:96px; display:flex; margin-top:8px; }
  .cta .h1 { font-family:'Cal Sans',sans-serif; font-size:128px; line-height:1.0; letter-spacing:-3px; margin-top:32px; }
  .cta .h1 em { font-style:normal; color:${ORANGE}; }
  .cta .sub { max-width:860px; margin-top:32px; }
  .cta .sub b { color:${INK}; font-weight:800; }
  .ask { display:flex; align-items:center; gap:20px; margin-top:48px; font-family:'Cal Sans',sans-serif; font-size:52px; letter-spacing:-.5px; }
  .kw { font-family:'JetBrains Mono',monospace; font-size:52px; font-weight:500; letter-spacing:8px; color:${ORANGE_TXT};
        border:3px solid ${ORANGE}; background:#FFF1E0; border-radius:20px; padding:6px 24px 6px 32px; }
  .mini { display:flex; gap:16px; margin-top:auto; width:100%; }
  .mini .m { flex:1; border-radius:22px; border:2px solid transparent; padding:22px 8px 20px; display:flex; flex-direction:column; align-items:center; gap:14px; }
  .mini .di { width:64px; height:64px; border-radius:18px; display:flex; align-items:center; justify-content:center; box-shadow:${SH_SM}; }
  .mini .di span { width:56%; height:56%; display:flex; }
  .mini .dn { font-family:'JetBrains Mono',monospace; font-size:19px; letter-spacing:2px; font-weight:500; }
  .mini .dc { font-size:19px; font-weight:700; color:${MUTE}; }
`;

function page(inner, H, avatar, { anim = '' } = {}) {
  return `<!DOCTYPE html><html><head><meta charset="utf-8">
  <link href="https://fonts.googleapis.com/css2?family=Cal+Sans&family=Manrope:wght@400..800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>${CSS}${anim}</style></head><body><div class="slide"><div class="grid"></div>
  <div class="glow">${BURST(ORANGE)}</div><div class="glow2"></div>
  <div class="who">${avatar ? `<img src="${avatar}">` : ''}<b>${H.name}</b><span>· ${H.handle}</span></div>
  ${inner}</div></body></html>`;
}

const dots = (i, total) => `<div class="dots">${Array.from({ length: total }, (_, k) => `<i class="${k === i - 1 ? 'on' : ''}"></i>`).join('')}</div>`;

function deptArt(d, cls = 'dart') {
  const t = TINTS[d.tint];
  return `<span class="${cls}" style="background:linear-gradient(155deg, ${t[1]}AA 0%, ${t[1]} 100%)"><span>${glyph(d.glyph, '#fff')}</span></span>`;
}

function build(post, { root }) {
  const pages = {};
  const H = { name: post.author || 'Shazim Khan', handle: post.handle || '@shazimbuilds' };
  const avatar = post.avatar ? 'file://' + path.join(root, post.avatar) : null;
  const depts = post.departments;
  const total = 1 + (post.audit ? 1 : 0) + depts.length + 1;
  let n = 0;
  const pad = (x) => String(x).padStart(2, '0');
  const P = (inner, opt) => page(inner, H, avatar, opt);

  // ---- cover: org chart (static by default; ?anim runs the loop) ----
  const c = post.cover;
  const W = 904, cx = W / 2, cw = 164, gap = (W - cw * depts.length) / (depts.length - 1);
  const x = (i) => cw / 2 + i * (cw + gap);
  const wires = depts.map((d, i) => `M${cx} 172 C ${cx} 236, ${x(i)} 228, ${x(i)} 292`);
  const LOOP = c.loop || 6; // seconds
  // dot travels TRAVEL s, card stays lit LIT s; all finish 0.3s before the loop restarts
  const TRAVEL = 0.7, LIT = 1.4;
  const step = (LOOP - TRAVEL - LIT - 0.3) / (depts.length - 1);
  const anim = depts.map((d, i) => {
    const t = TINTS[d.tint];
    const a = (i * step / LOOP) * 100, b = ((i * step + TRAVEL) / LOOP) * 100, e = ((i * step + TRAVEL + LIT) / LOOP) * 100;
    return `
    .anim .p${i} { offset-path:path('${wires[i]}'); animation:run${i} ${LOOP}s linear infinite; }
    @keyframes run${i} { 0%,${a.toFixed(2)}% { offset-distance:0%; opacity:0 } ${(a + 1).toFixed(2)}% { opacity:1 }
      ${b.toFixed(2)}% { offset-distance:100%; opacity:1 } ${(b + 2).toFixed(2)}%,100% { offset-distance:100%; opacity:0 } }
    .anim .d${i} { animation:lit${i} ${LOOP}s ease-in-out infinite; }
    @keyframes lit${i} { 0%,${(b - 0.5).toFixed(2)}% { background:${t[0]}; border-color:${t[0]}; transform:translateY(0); box-shadow:none }
      ${(b + 3).toFixed(2)}%,${(Math.min(e, 100) - 4).toFixed(2)}% { background:${t[1]}66; border-color:${t[1]}; transform:translateY(-10px); box-shadow:${SH_MD} }
      ${Math.min(e, 100).toFixed(2)}%,100% { background:${t[0]}; border-color:${t[0]}; transform:translateY(0); box-shadow:none } }`;
  }).join('');
  const cover = `<div class="cov">
    <div class="chip"><span>${BURST(ORANGE)}</span>${c.chip}</div>
    <div class="h1">${c.title}</div>
    <div class="sub">${c.sub}</div>
    <div class="org">
      <svg class="wires" viewBox="0 0 ${W} 560">${depts.map((d, i) => `<path class="wire" d="${wires[i]}" stroke="${TINTS[d.tint][1]}"/>`).join('')}</svg>
      <div class="ceo"><span class="badge">CEO</span><span class="cl">${logo('claude', '#D97757')}</span><b>${c.ceo || 'Claude Code'}</b></div>
      ${depts.map((d, i) => { const t = TINTS[d.tint]; return `<div class="dept d${i}" style="left:${x(i) - cw / 2}px;background:${t[0]};border-color:${t[0]}">
        ${deptArt(d, 'di')}<span class="dn" style="color:${t[2]}">${d.tab}</span><span class="dc">${d.hires.length} hires</span></div>`; }).join('')}
      ${depts.map((d, i) => `<i class="pulse p${i}" style="background:${TINTS[d.tint][1]}"></i>`).join('')}
    </div>
  </div>${dots(++n, total)}`;
  const animScript = `<script>if(location.search.includes('anim'))document.querySelector('.slide').classList.add('anim')</script>`;
  pages[`${pad(n)}-cover`] = P(cover + animScript, { anim });

  // ---- audit: waffle of installed vs used ----
  if (post.audit) {
    const a = post.audit;
    // scatter the used cells (seeded, so every render is identical)
    let seed = 0x9e3779b9; const used = new Set();
    const rnd = () => { seed = (seed + 0x6D2B79F5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
    while (used.size < a.used) used.add(Math.floor(rnd() * a.installed));
    const cells = Array.from({ length: a.installed }, (_, i) => `<i class="${used.has(i) ? 'u' : ''}"></i>`).join('');
    pages[`${pad(++n)}-audit`] = P(`<div class="wrap">
      <div class="kicker">${a.kicker}</div>
      <div class="head"><div class="title">${a.title}</div></div>
      <div class="sub">${a.sub}</div>
      <div class="waffle">${cells}</div>
      <div class="legend"><span><i class="u"></i>${a.used} used at least once</span><span><i></i>${a.installed - a.used} never opened</span></div>
      <div style="margin-top:auto"><div class="worklbl">${a.workLabel}</div>
      <div class="work">${a.work.map((w) => `<div class="wk"><div class="v">${w.v}</div><div class="l">${w.l}</div></div>`).join('')}</div></div>
    </div>${dots(n, total)}`);
  }

  // ---- one slide per department ----
  let no = 0;
  depts.forEach((d, di) => {
    const t = TINTS[d.tint];
    const tabs = `<div class="tabs"><span class="tab tceo"><span>${logo('claude', '#D97757')}</span>CEO</span>
      ${depts.map((o, k) => k === di
        ? `<span class="tab on" style="color:${t[2]};background:${t[0]};border-color:${t[1]}"><i></i>${o.tab}</span>`
        : `<span class="tab"><i></i>${o.tab}</span>`).join('')}</div>`;
    const rows = d.hires.map((h) => `<div class="row">${tile(h)}
      <div class="meta"><div class="nm"><b>${h.name}</b><span>${h.role}</span></div><div class="ds">${h.does}</div></div>
      <div class="rt"><span class="num">${pad(++no)}</span>
      ${h.calls ? `<span class="calls" style="background:${t[0]};color:${t[2]}">${h.calls}</span>` : ''}</div></div>`).join('');
    pages[`${pad(++n)}-${d.tab.toLowerCase()}`] = P(`<div class="wrap">
      <div class="kicker">Department ${di + 1} of ${depts.length} · ${d.tab} · ${d.hires.length} hires</div>
      <div class="head"><div class="title">${d.title}</div>${deptArt(d)}</div>
      <div class="sub">${d.sub}</div>
      ${tabs}<div class="rows">${rows}</div>
    </div>${dots(n, total)}`);
  });

  // ---- CTA ----
  const k = post.cta;
  pages[`${pad(++n)}-cta`] = P(`<div class="cta">
    <span class="star">${BURST(ORANGE)}</span>
    <div class="h1">${k.title}</div>
    <div class="sub">${k.sub}</div>
    ${post.keyword ? `<div class="ask"><span>Comment</span><span class="kw">${post.keyword}</span><span>${k.after || "and I'll send it."}</span></div>` : ''}
    <div class="mini">${depts.map((d) => { const t = TINTS[d.tint]; return `<div class="m" style="background:${t[0]};border-color:${t[1]}77">
      ${deptArt(d, 'di')}<span class="dn" style="color:${t[2]}">${d.tab}</span><span class="dc">${d.hires.length} hires</span></div>`; }).join('')}</div>
  </div>${dots(n, total)}`);

  return pages;
}

// pages that render.js should also record as looping MP4 (via ?anim)
const animated = (post) => (post.cover && post.cover.animate !== false ? [{ name: '01-cover', seconds: post.cover.loop || 6 }] : []);

module.exports = { build, animated };
