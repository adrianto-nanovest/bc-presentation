// Single source of truth for all Section G slide copy (G.1–G.11).
// Schema convention mirrors Section F (`src/slides/foundation-techniques-section-f/content.tsx`):
// plain string fields + sibling `kw` / `*Kw` arrays of substrings to highlight
// at render time. NO inline `<em>` tags in data.
//
// All body examples are universal knowledge-work scenarios — never mining-specific.

import type { ComparisonDef } from "@/components/DetailPanel";

// ─────────────────── G.1 — ECOSYSTEM OVERVIEW ───────────────────

export const g1Content = {
  headline: "Three vendors. Specialization, not single winners.",
  headlineKw: ["Specialization", "single winners"] as const,
  closingLine:
    "Pick the right tool for each task — never the right vendor for every task.",
  closingLineKw: ["never the right vendor"] as const,
  vendors: [
    {
      id: "claude",
      label: "Deep reasoning + agentic workflows",
      ringColor: "var(--copper-200)",
    },
    {
      id: "google",
      label: "Integration + research",
      ringColor: "var(--copper-300)",
    },
    {
      id: "openai",
      label: "Accessibility + ecosystem",
      ringColor: "var(--copper-400)",
    },
  ] as const,
} as const;

// ─────────────────── G.2 — CLAUDE PLATFORMS ───────────────────

export const g2Content = {
  headline: "Five surfaces. One Claude.",
  headlineKw: ["Five surfaces", "One Claude"] as const,
  columns: ["Platform", "Surface", "Audience", "Killer feature"] as const,
  rows: [
    {
      platform: "Chat",
      surface: "Web/Mobile",
      audience: "Anyone",
      killer: "Conversational AI with file upload + web search",
    },
    {
      platform: "Cowork",
      surface: "Desktop/Web",
      audience: "Knowledge workers",
      killer: "Autonomous task execution for non-engineers",
    },
    {
      platform: "Code",
      surface: "Desktop",
      audience: "Developers",
      killer: "Multi-pane IDE with parallel agent workflows",
    },
    {
      platform: "CLI",
      surface: "Terminal",
      audience: "Developers + power users",
      killer: "Fully scriptable Claude Code in your shell",
    },
    {
      platform: "Web (Design + Code + Artifacts)",
      surface: "Web",
      audience: "Designers + builders",
      killer: "Browser-based design-system extraction → production handoff",
    },
  ] as const,
  footer: "Same Claude. Different shape for the surface you live in.",
  footerKw: ["Different shape"] as const,
} as const;

// ─────────────────── G.3 — CLAUDE CAPABILITIES ───────────────────

export const g3Content = {
  headline: "Eight surfaces. Pick the ones you'll use.",
  headlineKw: ["Eight surfaces"] as const,
  subhead: "All 8 cards have video walkthroughs. Two have feature comparisons.",
  cards: [
    {
      id: "connectors",
      name: "Connectors",
      desc: "External system handshake.",
      videoFile: "Claude Connectors - Introduction.mp4",
      glyph: "connectors",
      hasCompare: false,
    },
    {
      id: "plugins",
      name: "Plugins",
      desc: "Bundled capability folders.",
      videoFile: "Claude Cowork - Plugins.mp4",
      glyph: "plugins",
      hasCompare: false,
    },
    {
      id: "projects",
      name: "Projects",
      desc: "Persistent workspace memory.",
      videoFile: "Claude Cowork - Projects.mp4",
      glyph: "projects",
      hasCompare: false,
    },
    {
      id: "dispatch",
      name: "Dispatch",
      desc: "Hand off work to agents.",
      videoFile: "Claude Cowork - Dispatch.mp4",
      glyph: "dispatch",
      hasCompare: false,
    },
    {
      id: "schedules",
      name: "Schedules",
      desc: "Autonomous, recurring cloud tasks.",
      videoFile: "Claude Cowork - Schedules.mp4",
      glyph: "schedules",
      hasCompare: true,
    },
    {
      id: "artifacts",
      name: "Web Artifacts",
      desc: "Inline interactive output.",
      videoFile: "Claude Web - Artifacts.mp4",
      glyph: "artifacts",
      hasCompare: true,
    },
    {
      id: "diagrams",
      name: "Diagrams",
      desc: "Interactive node-graph rendering.",
      videoFile: "Claude Web - Interactive Diagrams.mp4",
      glyph: "diagrams",
      hasCompare: false,
    },
    {
      id: "design",
      name: "Design",
      desc: "Design-system extraction → handoff.",
      videoFile: "Claude Design - Introduction.mp4",
      glyph: "design",
      hasCompare: false,
    },
  ] as const,
  footer: "Each is a different shape of help. Pick by need, not novelty.",
  footerKw: ["different shape", "Pick by need"] as const,
} as const;

// G.3 compare overlays:
export const g3SchedulesCompare = {
  title: "Schedules vs Routines vs /loop",
  columns: ["Cowork Schedules", "Code Routines", "/loop command"] as const,
  rows: [
    {
      label: "What",
      cells: [
        "Scheduled autonomous task",
        "Scheduled local task",
        "Recurring in-session prompt",
      ],
    },
    {
      label: "Where",
      cells: ["Anthropic cloud", "Your machine", "Your active Code session"],
    },
    {
      label: "Who",
      cells: ["Knowledge worker", "Power user / dev", "Active worker iterating"],
    },
    {
      label: "Needs machine on",
      cells: ["No", "Yes", "Yes"],
    },
    {
      label: "Needs open session",
      cells: ["No", "No", "Yes"],
    },
    {
      label: "Survives restart",
      cells: ["Yes", "Yes", "No"],
    },
    {
      label: "Local file access",
      cells: ["No (fresh clone)", "Yes", "Yes"],
    },
    {
      label: "Permissions",
      cells: ["None (fully autonomous)", "Configurable", "Inherits session"],
    },
    {
      label: "Min interval",
      cells: ["1 hour", "1 minute", "1 minute"],
    },
  ] as const,
  footer:
    "Why this is the n8n / Zapier killer: native LLM brain + cloud infra. Traditional automation platforms bolt LLM nodes onto a workflow engine. These features ARE the workflow engine, with the LLM as the brain.",
} as const;

export const g3ArtifactsCompare = {
  title: "Web Artifacts vs Live Artifacts",
  columns: ["Web Artifacts", "Live Artifacts (Cowork)"] as const,
  rows: [
    {
      label: "What",
      cells: [
        "Inline interactive output",
        "Connector-backed auto-refresh interactive output",
      ],
    },
    {
      label: "Where",
      cells: ["Claude.ai chat sidebar", "Cowork workspace surface"],
    },
    {
      label: "Who",
      cells: ["Anyone in chat (demo, share)", "Team operations, dashboards, ops"],
    },
    {
      label: "Refresh",
      cells: ["On request", "Auto on every open"],
    },
    {
      label: "Source",
      cells: [
        "In-chat code",
        "Connector-backed (Asana, Slack, Jira, Salesforce)",
      ],
    },
    {
      label: "Use case",
      cells: ["Demo, share, one-off tools", "Live KPI dashboard, project tracker"],
    },
  ] as const,
} as const;

// ─────────────────── G.4 — BUILT-IN TOOLS & COMMANDS ───────────────────

export const g4Content = {
  headline: "You don't need to write code to use these.",
  headlineKw: ["don't need to write code"] as const,
  quadrants: [
    {
      id: "agents",
      header: "AGENTS",
      items: [
        { name: "Explore", essence: "fast read-only repo search", glyph: "explore" },
        { name: "Plan", essence: "design before you build", glyph: null },
        { name: "Task", essence: "track work as you go", glyph: null },
        { name: "general-purpose", essence: "the catch-all worker", glyph: null },
        {
          name: "claude-code-guide",
          essence: "answers about Claude Code itself",
          glyph: null,
        },
      ] as const,
    },
    {
      id: "slash",
      header: "SLASH COMMANDS",
      items: [
        {
          name: "/clear",
          essence: "wipe the conversation, keep the project",
          glyph: "clear",
        },
        { name: "/rewind", essence: "step back to a previous turn", glyph: "rewind" },
        {
          name: "/compact",
          essence: "summarize history into fresh context",
          glyph: "compact",
        },
        { name: "/loop", essence: "run a prompt on a recurring interval", glyph: "loop" },
        { name: "/init", essence: "create a CLAUDE.md for this repo", glyph: "init" },
        { name: "/agents", essence: "view + configure your subagents", glyph: "agents" },
        { name: "/resume", essence: "pick up a past session", glyph: null },
        { name: "/help", essence: "list everything you can ask", glyph: null },
      ] as const,
    },
    {
      id: "tools",
      header: "BUILT-IN TOOLS",
      items: [
        { name: "Read", essence: "pull bytes off disk", glyph: null },
        { name: "Write", essence: "create a file", glyph: null },
        { name: "Edit", essence: "exact-string replace in a file", glyph: null },
        { name: "Bash", essence: "run a shell command", glyph: null },
        { name: "Grep", essence: "ripgrep across the repo", glyph: null },
        { name: "Glob", essence: "match files by pattern", glyph: null },
        { name: "WebFetch", essence: "pull a URL into context", glyph: null },
        { name: "WebSearch", essence: "search the web", glyph: null },
        { name: "Task", essence: "spawn a subagent", glyph: null },
        { name: "Skill", essence: "invoke a saved capability", glyph: null },
      ] as const,
    },
    {
      id: "hooks",
      header: "HOOKS",
      items: [
        { name: "SessionStart", essence: "fires when you open Claude", glyph: null },
        {
          name: "UserPromptSubmit",
          essence: "before your message reaches the model",
          glyph: null,
        },
        {
          name: "PreToolUse",
          essence: "before a tool call runs",
          glyph: "pretool",
        },
        {
          name: "PostToolUse",
          essence: "after a tool call returns",
          glyph: null,
        },
        {
          name: "PreCompact",
          essence: "before history is summarized",
          glyph: null,
        },
        { name: "Stop", essence: "when Claude finishes a turn", glyph: null },
      ] as const,
    },
  ] as const,
  footer: "Skills are recipes. MCP is the kitchen. Plugins are the meal kits.",
  footerKw: ["recipes", "kitchen", "meal kits"] as const,
} as const;

// ─────────────────── G.5 — GOOGLE ───────────────────

export const g5Content = {
  headline: "Seven surfaces. NotebookLM is the standout.",
  headlineKw: ["NotebookLM", "standout"] as const,
  subhead:
    "Source-grounded research. Native to your workspace. The integration play.",
  hero: {
    id: "notebooklm",
    name: "NotebookLM",
    desc: "Source-grounded research over your own documents — answers cited, sources visible. Audio overviews, mind maps, briefing docs.",
    videoFile: "NotebookLM - Introduction.mp4",
    glyph: "notebooklm",
  } as const,
  cards: [
    {
      id: "workspace-studio",
      name: "Workspace Studio",
      desc: "Gemini stitched into Docs, Sheets, Slides, Gmail.",
      videoFile: "Google Workspace Studio - Introduction.mp4",
      glyph: "workspace-studio",
    },
    {
      id: "ai-studio",
      name: "AI Studio",
      desc: "Build + ship: prompt playground, model picker, deploy.",
      videoFile: "Google AI Studio - Introduction.mp4",
      glyph: "ai-studio",
    },
    {
      id: "canvas",
      name: "Canvas",
      desc: "Documents that morph into apps in-place.",
      videoFile: "Gemini - Canvas.mp4",
      glyph: "canvas",
    },
    {
      id: "flow",
      name: "Flow",
      desc: "Frame-by-frame video generation.",
      videoFile: "Google Flow - Introduction.mp4",
      glyph: "flow",
    },
    {
      id: "stitch",
      name: "Stitch",
      desc: "Visual app design — sketch in, layout out.",
      videoFile: "Google Stitch - Introduction.mp4",
      glyph: "stitch",
    },
    {
      id: "gems",
      name: "Gems",
      desc: "Persona-pinned Gemini for repeated jobs.",
      videoFile: "Gemini - Gems.mp4",
      glyph: "gems",
    },
  ] as const,
  footer: "Already in Google Workspace? Half of this is one click away.",
  footerKw: ["one click away"] as const,
} as const;

// ─────────────────── G.6 — OPENAI ───────────────────

export const g6Content = {
  headline: "Three surfaces. Brief by design.",
  headlineKw: ["Brief by design"] as const,
  subhead: "Brief because OpenAI overlaps the others; deep where they don't.",
  cards: [
    {
      id: "chatgpt",
      name: "ChatGPT",
      desc: "Web search + ecosystem; the most accessible AI for the public.",
      videoFile: null,
      glyph: "chatgpt",
    },
    {
      id: "codex",
      name: "Codex App",
      desc: "Coding-focused desktop GUI; parallel git worktrees; macOS GA.",
      videoFile: "Codex App - Introduction.mp4",
      glyph: "codex",
    },
    {
      id: "workspace-agents",
      name: "Workspace Agents",
      desc: "Cloud-running autonomous agents; scheduled triggers; Slack/Salesforce/Workspace integration.",
      videoFile: "ChatGPT - Workspace Agents.mp4",
      glyph: "workspace-agents",
    },
  ] as const,
  footer:
    "Workspace Agents is the most underrated of these three — autonomous + cloud + integration-rich.",
  footerKw: ["most underrated"] as const,
} as const;

// ─────────────────── G.7 — HEAD-TO-HEAD ───────────────────

export const g7Content = {
  headline: "Easily confused. Pick by shape, not vendor.",
  headlineKw: ["shape", "vendor"] as const,
  cards: [
    {
      title: "Persistent AI config",
      items: ["Gems", "Projects", "Workspace Agents"],
      summary:
        "Persona / container / autonomous task. Three shapes of the same idea.",
    },
    {
      title: "Design-to-code",
      items: ["Stitch", "Claude Design"],
      summary: "Visual-first vs prompt-first. Sketch in your favorite tool.",
    },
    {
      title: "Interactive output",
      items: ["Canvas", "Live Artifacts"],
      summary: "Doc-mode vs app-mode. One edits, the other ships.",
    },
    {
      title: "Developer IDE",
      items: ["Claude Desktop", "Codex App"],
      summary:
        "Both real IDEs. Different shapes — chat-canvas vs GUI-worktrees.",
    },
    {
      title: "CLI",
      items: ["Claude Code CLI", "Codex CLI", "Gemini CLI"],
      summary: "All three are real CLIs. Pick by your team's tool-calling needs.",
    },
  ] as const,
  comparisons: [
    {
      title: "Persistent AI config",
      columns: [
        { name: "Gems", vendor: "Google" },
        { name: "Projects", vendor: "Anthropic" },
        { name: "Workspace Agents", vendor: "OpenAI" },
      ],
      rows: [
        {
          label: "SHAPE",
          cells: ["Persona", "Container", "Autonomous task"],
        },
        {
          label: "WHAT",
          cells: [
            "Custom Gemini with instructions + knowledge",
            "Knowledge container with files + chat history",
            "Continuously-running cloud agent",
          ],
        },
        {
          label: "WHERE",
          cells: ["Gemini app", "Claude.ai web", "ChatGPT cloud"],
        },
        {
          label: "WHO",
          cells: [
            "Personal + team productivity",
            "Project teams, knowledge workers",
            "Enterprise + ops automation",
          ],
        },
        {
          label: "TRIGGER",
          cells: [
            "Manual call",
            "Manual chat",
            "Schedule, GitHub, webhook, API",
          ],
        },
        {
          label: "PERSISTENCE",
          cells: [
            "Instructions + KB",
            "Files + memory across chats",
            "Task definition + integrations",
          ],
        },
        {
          label: "PICK WHEN",
          cells: [
            "You want a named expert for repeat tasks",
            "You want one shared workspace for a project",
            "You want a job that runs without you (24/7)",
          ],
        },
      ],
    },
    {
      title: "Design-to-code",
      columns: [
        { name: "Stitch", vendor: "Google" },
        { name: "Claude Design", vendor: "Anthropic" },
      ],
      rows: [
        {
          label: "ENTRY",
          cells: ["Drag visual components", "Describe in plain language"],
        },
        {
          label: "DESIGN SYS",
          cells: [
            "Built-in templates",
            "Extracted from your codebase / Figma",
          ],
        },
        {
          label: "EXPORT",
          cells: ["React / Next.js", "Design intent bundle → Claude Code"],
        },
        {
          label: "HANDOFF",
          cells: ["AI Studio / Antigravity", "Claude Code (production)"],
        },
        {
          label: "PICK WHEN",
          cells: [
            "Visual-thinking designers",
            "Codebase-aware, system-extracted",
          ],
        },
      ],
    },
    {
      title: "Interactive output",
      columns: [
        { name: "Canvas", vendor: "Google Gemini" },
        { name: "Live Artifacts", vendor: "Anthropic Cowork" },
      ],
      rows: [
        {
          label: "MODE",
          cells: ["Doc-style edit", "App-style render"],
        },
        {
          label: "SOURCE",
          cells: ["Inline doc/code", "Connector-backed"],
        },
        {
          label: "REFRESH",
          cells: ["Manual", "Auto on every open"],
        },
        {
          label: "EDIT",
          cells: ["In-place text edit", "Code regeneration"],
        },
        {
          label: "USE CASE",
          cells: [
            "Collaborative draft + iteration",
            "Live KPI dashboard, project tracker",
          ],
        },
      ],
    },
    {
      title: "Developer IDE",
      columns: [
        { name: "Claude Desktop", vendor: "Anthropic" },
        { name: "Codex App", vendor: "OpenAI" },
      ],
      rows: [
        {
          label: "UI MODEL",
          cells: ["Multi-pane chat + canvas", "VS Code base (familiar)"],
        },
        {
          label: "PARALLELISM",
          cells: ["Per-thread agents", "Native git worktrees"],
        },
        {
          label: "COMPUTER USE",
          cells: ["Permission rules", "Visual + background (macOS GA)"],
        },
        {
          label: "MOBILE",
          cells: ["/remote-control dispatch", "Not available"],
        },
        {
          label: "PICK WHEN",
          cells: [
            "Mobile-first async + tool-calling lead",
            "Desktop-heavy IDE workflow",
          ],
        },
      ],
    },
    {
      title: "CLI",
      columns: [
        { name: "Claude Code CLI", vendor: "Anthropic" },
        { name: "Codex CLI", vendor: "OpenAI" },
        { name: "Gemini CLI", vendor: "Google" },
      ],
      rows: [
        {
          label: "CONTEXT WINDOW",
          cells: ["1M (Opus 4.7)", "400K + 35% infl", "~1M (Gemini 3 Pro)"],
        },
        {
          label: "DEFAULT MODEL",
          cells: ["Sonnet 4.6", "GPT-5.4", "Gemini 3 Pro"],
        },
        {
          label: "TOOL-CALLING",
          cells: ["77.3% MCP-At", "68.1%", "Mid-pack"],
        },
        {
          label: "PARALLEL WT",
          cells: ["Manual setup", "Native", "Manual"],
        },
        {
          label: "SANDBOX",
          cells: [
            "Permission rules",
            "Starlark policy engine",
            "Permission rules",
          ],
        },
        {
          label: "SUBAGENTS",
          cells: ["Yes (Explore, Plan, Task)", "Yes", "Yes"],
        },
        {
          label: "HOOKS",
          cells: ["~21 events", "6 events", "Limited"],
        },
        {
          label: "PLUGINS",
          cells: ["Mature", "Maturing", "Early"],
        },
        {
          label: "PRICE",
          cells: [
            "Capped (Pro/Max/Team)",
            "Capped (Plus/Business)",
            "Generous free + paid",
          ],
        },
      ],
    },
  ] satisfies ComparisonDef[],
  pickWhenSummaries: [
    "You want a named expert for repeat tasks · one shared workspace for a project · a job that runs without you (24/7).",
    "Visual-thinking designers → Stitch. Codebase-aware, system-extracted → Claude Design.",
    "Collaborative draft + iteration → Canvas. Live KPI dashboard, project tracker → Live Artifacts.",
    "Mobile-first async + tool-calling lead → Claude Desktop. Desktop-heavy IDE workflow → Codex App.",
    "Pick by your team's tool-calling needs, parallelism model, and existing ecosystem.",
  ] as const,
} as const;

// ─────────────────── G.8 — CAPABILITY MATRIX ───────────────────

export const g8Content = {
  headline: "Vendor × use case. The decoder.",
  headlineKw: ["decoder"] as const,
  rows: [
    {
      useCase: "Chat Q&A",
      claude: { dots: 3, label: "Sonnet 4.6" },
      google: { dots: 3, label: "Gemini 3 Pro" },
      openai: { dots: 3, label: "GPT-5.5" },
      bestFit: "Choose by ecosystem",
    },
    {
      useCase: "Document analysis",
      claude: { dots: 3, label: "Opus 4.7 vision" },
      google: { dots: 4, label: "NotebookLM (grounded)" },
      openai: { dots: 3, label: "GPT-5.4 Thinking" },
      bestFit: "NotebookLM (private docs)",
    },
    {
      useCase: "Code generation",
      claude: { dots: 4, label: "Sonnet 4.6 / Code" },
      google: { dots: 2, label: "Antigravity" },
      openai: { dots: 3, label: "GPT-5.3 Codex" },
      bestFit: "Claude (CursorBench lead)",
    },
    {
      useCase: "Prototype/Design",
      claude: { dots: 4, label: "Claude Design" },
      google: { dots: 3, label: "Stitch + AI Studio" },
      openai: { dots: 0, label: "—" },
      bestFit: "Claude Design (sys extraction)",
    },
    {
      useCase: "Agentic workflow",
      claude: { dots: 4, label: "Cowork" },
      google: { dots: 3, label: "Workspace Studio" },
      openai: { dots: 3, label: "Workspace Agents" },
      bestFit: "Cowork (knowledge work)",
    },
    {
      useCase: "Real-time dashboards",
      claude: { dots: 4, label: "Live Artifacts" },
      google: { dots: 2, label: "Sheets + Gemini" },
      openai: { dots: 2, label: "ChatGPT" },
      bestFit: "Live Artifacts",
    },
  ] as const,
  prompts: [
    "Already using Workspace? → Gemini. Otherwise → Sonnet 4.6.",
    "Private docs? → NotebookLM. Otherwise → Opus 4.7.",
    "Solo? → Sonnet 4.6. Long-horizon async? → Codex CLI.",
    "Visual-first? → Stitch. Codebase-aware? → Claude Design.",
    "Knowledge work? → Cowork. Schedule-driven? → Workspace Agents.",
    "Connector-backed? → Live Artifacts. Spreadsheet-native? → Sheets + Gemini.",
  ] as const,
  footer: "Six use cases. Three vendors. The matrix is the map.",
  footerKw: ["the matrix is the map"] as const,
} as const;

// ─────────────────── G.9 — THE WORKFLOW ───────────────────

export const g9Content = {
  headline: "Building a production-grade website, end to end.",
  headlineKw: ["end to end"] as const,
  subhead:
    "Same recipe. Different deliverable. Pick the use case that fits your work.",
  stages: [
    {
      num: "01",
      name: "RESEARCH",
      purpose: "Understand the problem",
      tools: ["NotebookLM", "Drive MCP", "web"],
      glyphKind: "magnifier-scan",
    },
    {
      num: "02",
      name: "BRAINSTORM",
      purpose: "Explore approaches",
      tools: ["Claude chat", "multi-option trade-offs"],
      glyphKind: "lightbulb-pulse",
    },
    {
      num: "03",
      name: "PLAN",
      purpose: "Design the solution",
      tools: ["Claude chat", "Architect subagent", "spec doc"],
      glyphKind: "map-fold",
    },
    {
      num: "04",
      name: "PROTOTYPE",
      purpose: "Sketch + design system",
      tools: ["Stitch OR Claude Design", "image gen (nano)"],
      glyphKind: "pencil-grid",
    },
    {
      num: "05",
      name: "IMPLEMENT",
      purpose: "Build with AI",
      tools: ["Claude Code", "Plugins", "Skills", "MCP"],
      glyphKind: "hammer-strike",
    },
    {
      num: "06",
      name: "TEST",
      purpose: "Verify quality",
      tools: ["Claude evals", "subagent tests"],
      glyphKind: "flask-bubble",
    },
    {
      num: "07",
      name: "SHIP",
      purpose: "Deploy with confidence",
      tools: ["Codex review", "Routines", "PR auto-merge"],
      glyphKind: "rocket-launch",
    },
  ] as const,
  maxim: {
    label: "KEEP ORCHESTRATOR LEAN",
    caption: "Claude conducts; specialists do the work in their stage.",
  },
  footer: "Screenshot this slide. It's the recipe — for whatever you're building.",
  footerKw: ["the recipe"] as const,
} as const;

// ─────────────────── G.10 — BEYOND THE BIG THREE ───────────────────

export const g10Content = {
  headline: "Three more worth knowing — for when the giants don't fit.",
  headlineKw: ["the giants don't fit"] as const,
  subhead:
    "Open-source. Self-improving memory. LLM-native automation. Three moats the giants haven't filled.",
  cards: [
    {
      tool: "OpenClaw",
      differentiator: "Open-source AI agent",
      description:
        "Messaging-first interface; self-host friendly.",
      useCase: "Privacy-sensitive deploys, enterprises, gov.",
      footnote: "~350K stars, MIT license.",
      glyphKind: "openclaw",
    },
    {
      tool: "Hermes Agent",
      differentiator: "Self-improving + persistent memory",
      description:
        "Learns from prior runs; persistent context across sessions.",
      useCase:
        "Tasks where context across sessions matters more than raw capability.",
      footnote: "~64K stars.",
      glyphKind: "hermes",
    },
    {
      tool: "n8n",
      differentiator: "LLM-native workflow automation",
      description:
        "Workflow automation that turned LLM-native in 2026 (MCP integration).",
      useCase:
        "Cross-app workflows, no-code AI orchestration for ops + IT teams.",
      footnote: "~80K stars; self-host or SaaS.",
      glyphKind: "n8n",
    },
  ] as const,
  footer:
    "Privacy moats, memory moats, integration moats — the three things the Big Three are still figuring out.",
  footerKw: ["Privacy moats", "memory moats", "integration moats"] as const,
} as const;

// ─────────────────── G.11 — BRIDGE TO H ───────────────────

export const g11Content = {
  heroSrc: "/heroes/g11-bridge.jpg",
  beat1: { text: "You have the tools.", kw: ["the tools"] as const },
  beat2: {
    text: "Now the question becomes: how do you wield them?",
    kw: ["how do you wield them"] as const,
  },
  attribution: "— Section H · Pitfalls + Discipline",
  figLabel: "BRIDGE · WIELD",
} as const;
