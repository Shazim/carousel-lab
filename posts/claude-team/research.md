# Research: claude-team

## Reference
Charlie Hills (@charliehills), "42 Things to Install in Claude", Instagram carousel, 7 slides,
slide 1 a 7.2s video (720x900). Downloaded via fastdl.app on 27 Oct 2026, saved in
`references/claude-team-42/`. We cloned the layout system only (CEO card wired to five
department cards, department slides with tab bar + tool rows + usage badges, CTA with the
department cards again). Copy, data, palette and art are ours. His pixel mascot is
Anthropic's character and was not used; departments get drawn icons instead.

## Data (verified 27 Oct 2026)
Source: Claude Code session logs, `~/.claude/projects/*/*.jsonl`, every `tool_use` block with
a timestamp from 2026-08-28 to 2026-10-27 (60 days). Shazim's Mac only, so web/other machines
are not counted.

- 45 sessions, 48 active days, 6,844 Bash (terminal) tool calls.
- Installed skills: 252 personal (`~/.claude/skills/*/SKILL.md`) + 76 inside the 6 installed
  plugins (vercel 3, mongodb 8, chatcut 17, linkedin-skills 12, clay 35, frontend-design 1) = **328**.
- Skills loaded at least once (Skill tool): 27 names, of which **18** are in the installed 328.
  The other 9 are built-in or project-level skills (artifact-design, anthropic-skills:pdf,
  anthropic-skills:humanizer, update-config, claude-api, onboard, fewer-permission-prompts,
  lemo-opuscar, edit-reel in motion-graphic/.claude). So "328 installed, I used 18" is exact.
- MCP / connector calls: claude-in-chrome 1,818 · ChatCut 1,182 · built-in browser
  (Claude_Browser) 775 · Firecrawl 149 (connector id 5af79643) · La Growth Machine 106 ·
  Instantly 23 · Notion 16 (adfe53cb) · Postiz MCP 9 (d4e47fcd) · n8n MCP 9 (6965739c) ·
  Vercel MCP 2. One connector (367863e7, 151 calls, CRM/enrichment) could not be identified
  with certainty and was left out.
- CLI counts = Bash calls where the tool ran as a command (strict regex on command position):
  git 466 · ffmpeg 274 · ImageMagick 155 · gstack browse 90 · gh 89 · docker 61 ·
  playwright 57 · postiz 41 (+9 MCP = 50) · vercel 33 (+2 MCP = 35) · yt-dlp 13 ·
  hyperframes 8 (+1 skill load = 9).
- Skill loads used on slides: artifact-design 6, ui-ux-pro-max 4, impeccable 4,
  taste-skill (high-end-visual-design, from Leonxlnx/taste-skill) 2, linkedin-skills 3
  (humanizer 2 + post-writer 1), openreply-campaign 1 (slide shows "my product" instead).

Reproduce: `python3 posts/claude-team/guide/audit_claude.py` (the same script is in the guide).
Its CLI section uses a looser "first word of each command" count, so its CLI numbers differ
slightly from the strict counts above; skills and MCP numbers match.

## Install steps (checked 27 Oct 2026)
- Claude in Chrome: code.claude.com/docs/en/chrome (`/chrome`, `claude --chrome`, paid plan).
- Firecrawl MCP: docs.firecrawl.dev/mcp-server (`claude mcp add firecrawl -e FIRECRAWL_API_KEY=… -- npx -y firecrawl-mcp`).
- Notion MCP: developers.notion.com/docs/get-started-with-mcp (`claude mcp add --transport http notion https://mcp.notion.com/mcp`).
- gstack: github.com/garrytan/gstack README (clone to ~/.claude/skills/gstack, `./setup`, needs Bun).
- ui-ux-pro-max: github.com/nextlevelbuilder/ui-ux-pro-max-skill (plugin marketplace route).
- impeccable: README now says `npx impeccable install` then `/impeccable init` (impeccable.style).
- taste-skill: `npx skills add Leonxlnx/taste-skill`.
- ChatCut: chatcut.io/claude; marketplace ChatCut-Inc/agent-plugin, plugin chatcut@chatcut-inc (matches this Mac).
- Postiz: docs.postiz.com/cli (`npm install -g postiz`, `postiz auth:login`; skill gitroomhq/postiz-agent).
- HyperFrames: hyperframes.heygen.com; `npx skills add heygen-com/hyperframes` (Node 22+, ffmpeg).
- La Growth Machine: lagrowthmachine.com/claude-code-mcp/.
- Instantly: help.instantly.ai article 12980002; MCP URL https://mcp.instantly.ai/mcp with Authorization header (matches this Mac's config).
- n8n: docs.n8n.io/connect/connect-to-n8n-mcp-server/ (instance-level MCP, per-workflow access).
- linkedin-skills: github.com/sergebulaev/linkedin-skills; plugin linkedin-skills@linkedin-skills (matches this Mac).
- Claude Code native install: `curl -fsSL https://claude.ai/install.sh | bash`, or the desktop app.
