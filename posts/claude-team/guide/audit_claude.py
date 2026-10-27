#!/usr/bin/env python3
"""Audit your Claude Code setup: what you installed vs what you actually used.

Reads the session logs Claude Code keeps in ~/.claude/projects (nothing leaves
your machine) and prints:
  1. skills you loaded, with counts
  2. skills you installed but never loaded
  3. MCP servers / connectors by number of tool calls
  4. the command-line tools Claude ran most

Usage:  python3 audit_claude.py            (last 60 days)
        python3 audit_claude.py 30         (last 30 days)
"""
import collections, datetime, glob, json, os, re, sys

DAYS = int(sys.argv[1]) if len(sys.argv) > 1 else 60
HOME = os.path.expanduser("~/.claude")
since = (datetime.datetime.now(datetime.timezone.utc) - datetime.timedelta(days=DAYS)).strftime("%Y-%m-%d")

skills, mcp, cli = collections.Counter(), collections.Counter(), collections.Counter()
sessions, days = set(), set()
HEREDOC = re.compile(r"<<-?\s*['\"]?(\w+)['\"]?[^\n]*\n.*?\n\s*\1\b", re.S)
PROGRAM = re.compile(r"^[a-z][\w.+-]*$")
SHELL = set("for do done if then else elif fi while until case esac in echo printf cd export local "
            "set unset true false sleep read source test return exit wait trap eval import from def print".split())

for path in glob.glob(f"{HOME}/projects/*/*.jsonl"):
    for line in open(path, errors="ignore"):
        try:
            row = json.loads(line)
        except ValueError:
            continue
        if (row.get("timestamp") or "") < since:
            continue
        msg = row.get("message")
        blocks = msg.get("content") if isinstance(msg, dict) else None
        if not isinstance(blocks, list):
            continue
        for b in blocks:
            if not isinstance(b, dict) or b.get("type") != "tool_use":
                continue
            sessions.add(path)
            days.add(row["timestamp"][:10])
            name, args = b.get("name", ""), b.get("input") or {}
            if name == "Skill":
                skills[args.get("skill", "?")] += 1
            elif name.startswith("mcp__"):
                mcp[name.split("__")[1]] += 1
            elif name == "Bash":
                cmd = HEREDOC.sub("", args.get("command") or "")
                ran = set()
                for part in re.split(r"&&|\|\||;|\||\n|\$\(|`", cmd):
                    words = [w for w in part.split() if "=" not in w]
                    while words and words[0] in ("sudo", "npx", "time", "env", "exec"):
                        words = words[1:]
                    if words:
                        tool = os.path.basename(words[0])
                        if PROGRAM.match(tool) and tool not in SHELL:
                            ran.add(tool)
                for tool in ran:  # count each tool once per command
                    cli[tool] += 1

# installed skills: personal skills + skills inside installed plugins
installed = {os.path.basename(os.path.dirname(p)) for p in glob.glob(f"{HOME}/skills/*/SKILL.md")}
try:
    plugins = json.load(open(f"{HOME}/plugins/installed_plugins.json"))
    for key, entries in plugins.get("plugins", plugins).items():
        for e in entries if isinstance(entries, list) else [entries]:
            for p in glob.glob(f"{e.get('installPath', '')}/**/SKILL.md", recursive=True):
                installed.add(key.split("@")[0] + ":" + os.path.basename(os.path.dirname(p)))
except (OSError, ValueError, AttributeError):
    pass

used = {s for s in skills if s in installed}
never = sorted(s for s in installed if s not in used)

print(f"\nLast {DAYS} days: {len(sessions)} sessions on {len(days)} days\n")
print(f"SKILLS: {len(installed)} installed, {len(used)} of them used at least once")
for s, n in skills.most_common():
    print(f"  {n:>5}  {s}{'' if s in installed else '   (built-in or project skill)'}")
print(f"\nMCP SERVERS / CONNECTORS (tool calls)")
for s, n in mcp.most_common(15):
    print(f"  {n:>5}  {s}")
print(f"\nCOMMAND-LINE TOOLS CLAUDE RAN MOST")
for s, n in cli.most_common(20):
    print(f"  {n:>5}  {s}")
print(f"\nINSTALLED BUT NEVER USED ({len(never)}):")
print("  " + ", ".join(never) if never else "  none")
print("\nTip: connectors added in claude.ai show up as long ids. Match them by the")
print("tool names in your logs, or check Settings > Connectors.\n")
