#!/usr/bin/env node
// Usage: node new-post.js <slug> <template> "Title"
// Scaffolds posts/<slug>/ with post.json, caption.md, CHECKLIST.md, exports/
const fs = require('fs');
const path = require('path');

const [slug, templateName, ...titleParts] = process.argv.slice(2);
const templates = fs.readdirSync(path.join(__dirname, 'templates')).map((f) => f.replace('.js', ''));
if (!slug || !templateName) {
  console.error(`Usage: node new-post.js <slug> <template> "Title"\nTemplates: ${templates.join(', ')}`);
  process.exit(1);
}
if (!templates.includes(templateName)) {
  console.error(`Unknown template "${templateName}". Available: ${templates.join(', ')}`);
  process.exit(1);
}
const title = titleParts.join(' ') || slug;
const dir = path.join(__dirname, 'posts', slug);
if (fs.existsSync(dir)) { console.error(`posts/${slug}/ already exists`); process.exit(1); }
fs.mkdirSync(path.join(dir, 'exports'), { recursive: true });

const stubs = {
  'icon-grid': {
    cover: { line1: 'Hook line one', line2: 'hook line two', highlight: 'punch', photo: 'shazim/one.png', minis: ['chatgpt', 'zapier', 'n8n', 'notionai'] },
    slides: [{ theme: 'dark', t1: 'Title', t2: 'Line Two', orangeT2: true, sub: 'One-sentence explanation of this slide topic.', tools: ['claude', 'gemini', 'grok', 'chatgpt'] }],
    cta: { line1: 'Follow for more AI', line2: 'Tips, Tricks & Tutorials' },
  },
  editorial: {
    cover: { words: ['Bad', 'Good', 'Great'], brand: 'Claude Prompts' },
    topics: [{ word: 'Topic', after: ' Name', color: 'yellow', bad: 'Lazy one-liner.', good: 'Decent ask with a [VARIABLE].', great: 'Role + context variables + task + constraints. Think step by step.' }],
    cta: { kicker: 'Follow For More', big: 'AI & Building' },
  },
};

const post = {
  slug, title, topic: '', handle: '@shazimbuilds',
  keyword: null, guideUrl: null, status: 'draft', posted: null,
  results: { reach: null, saves: null, shares: null, comments: null, follows: null },
  notes: '',
  template: templateName,
  ...(stubs[templateName] || {}),
};
fs.writeFileSync(path.join(dir, 'post.json'), JSON.stringify(post, null, 2));

fs.writeFileSync(path.join(dir, 'caption.md'), `# Caption — ${title}

Keyword: **(none — follow CTA)**

## Caption (paste this)

first line: searchable words, not clever words.

story. the list. the point.

follow @shazimbuilds for more.

## Hashtags (3–5, in caption)

\`\`\`
#buildinpublic #aitools #shazimbuilds
\`\`\`

## Pinned comment

> seed the conversation — ask a question people can answer in one word.
`);

fs.writeFileSync(path.join(dir, 'CHECKLIST.md'), `# Post checklist — ${title}

## Before rendering
- [ ] Every number/claim in post.json is real or clearly illustrative.
- [ ] Read slide titles top to bottom — do they form one story?

## Build
- [ ] node render.js ${slug}
- [ ] Open exports/_contact.png — does the set read as one post?
- [ ] Check every slide on your phone at actual size.

## If this post has a lead magnet
- [ ] Build the guide into guide/, publish it, test the link in a private window.
- [ ] Set the keyword in post.json and update caption.md.

## Post
- [ ] Upload PNGs from exports/ in numerical order.
- [ ] Paste caption from caption.md. Post + pin the pinned comment.
- [ ] Reply to comments in the first hour.

## After
- [ ] Log reach / saves / comments / follows into post.json results.
`);

console.log(`Created posts/${slug}/
  post.json     ← fill in the content
  caption.md    ← write the caption
  CHECKLIST.md  ← posting-day list
  exports/      ← run: node render.js ${slug}`);
