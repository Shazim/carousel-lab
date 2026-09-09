// Template: meme — single-image post: generated character photo as full-bleed
// base, composited caption + real logos + handle in code. 1080x1350.
const fs = require('fs');
const path = require('path');

const LOGO_DIR = path.join(__dirname, '..', 'assets', 'logos');

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
           background:#F1E9D6; font-family:'Manrope',sans-serif; }
  .base { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; }

  .caption { position:absolute; left:50%; transform:translateX(-50%);
             text-align:center; font-weight:800; color:#26201A;
             letter-spacing:-1px; line-height:1.16; white-space:nowrap; }

  .team { position:absolute; text-align:center; }
  .team .tl { font-size:31px; font-weight:800; color:#26201A; margin-bottom:26px; }
  .team .row { display:flex; gap:38px; justify-content:center; }
  .team .it { text-align:center; }
  .team .lg { width:62px; height:62px; margin:0 auto; }
  .team .nm { font-size:21px; font-weight:600; color:#3C352C; margin-top:10px; }

  .handle { position:absolute; font-size:25px; font-weight:700; letter-spacing:1.5px; }
`;

function build(post, { root }) {
  const p = post.meme;
  const img = path.resolve(root, p.image);
  const cap = p.caption.map((l, i) =>
    `<div class="caption" style="top:${p.captionY + i * p.captionSize * 1.18}px;font-size:${p.captionSize}px;${p.captionColor ? `color:${p.captionColor};` : ''}">${l}</div>`
  ).join('');
  const team = p.team ? `<div class="team" style="left:${p.team.x}px;top:${p.team.y}px;width:${p.team.w || 400}px">
      <div class="tl">${p.team.label}</div>
      <div class="row">${p.team.items.map((t) =>
        `<div class="it"><div class="lg" style="color:${t.color || '#26201A'}">${loadIcon(t.icon)}</div><div class="nm">${t.label}</div></div>`).join('')}</div>
    </div>` : '';
  const handle = `<div class="handle" style="left:${p.handleX}px;top:${p.handleY}px;color:${p.handleColor || 'rgba(255,255,255,.85)'}">${post.handle}</div>`;
  const html = `<!DOCTYPE html><html><head><meta charset="utf-8">
  <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400..800&display=swap" rel="stylesheet">
  <style>${CSS}</style></head><body><div class="slide">
    <img class="base" src="file://${img}">${cap}${team}${handle}
  </div></body></html>`;
  return { '01-meme': html };
}

module.exports = { build };
