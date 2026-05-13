// Single source of truth for all Section F slide copy (F.1–F.9).
//
// Schema convention mirrors Section E (`src/slides/foundation-core-section-e/content.tsx`):
// plain string fields + sibling `kw` / `*Kw` arrays of substrings to highlight
// at render time. NO inline `<em>` tags in data. Icons referenced by string
// name resolved against `./components/LucideIcon.tsx`.
//
// All body examples are universal knowledge-work scenarios (weekly report,
// document audit, email triage, meeting summarization, customer support
// routing, spreadsheet analysis, calendar/scheduling, knowledge-base lookup).
// NEVER mining-specific — per `feedback_generic_examples.md` and spec §2.3.

// ─────────────────── F.1 — TWO PILLARS ───────────────────
//
// Section opener. Spec §4. Two equal-width pillar panels labeled
// KNOWLEDGE / CAPABILITY with dim flagship visuals (bridge-artifact +
// layer-cake). Copper-light tagline beneath each.
export const f1Content = {
  headline: "Two Pillars",
  headlineKw: ["Two Pillars"],
  subtitle: "what AI knows · what AI does",
  subtitleKw: ["knows", "does"],
  pillars: [
    {
      id: "knowledge",
      label: "KNOWLEDGE",
      tagline: "AI gets to facts",
      taglineKw: ["facts"],
      tooltip: "F.2 · grounding",
    },
    {
      id: "capability",
      label: "CAPABILITY",
      tagline: "AI gets to act",
      taglineKw: ["act"],
      tooltip: "F.3 – F.7 · the package",
    },
  ],
  footer: "five techniques · one agentic stack",
  footerKw: ["techniques", "agentic stack"],
} as const;

// ─────────────────── F.2 — GROUND TRUTH (RAG) ───────────────────
//
// Knowledge pillar deep-dive. Spec §5. 5-facet menu + bridge-artifact canvas
// with default file/.md state (LLM Wiki canonical) + cycling RAG types.
export const f2Content = {
  headline: "RAG · Grounding in your facts",
  headlineKw: ["Grounding", "facts"],
  header: "FIVE FACETS · RAG",
  facets: [
    {
      id: "what-it-is",
      title: "WHAT IT IS",
      essence: "a fact-checker reading the actual manual",
      essenceKw: ["fact-checker", "actual manual"],
      icon: "BookOpen",
    },
    {
      id: "how-it-works",
      title: "HOW IT WORKS",
      essence: "retrieve → augment → generate",
      essenceKw: ["retrieve", "augment", "generate"],
      icon: "Workflow",
    },
    {
      id: "the-types",
      title: "THE TYPES",
      essence: "vector · graph · file · hybrid",
      essenceKw: ["vector", "graph", "file", "hybrid"],
      icon: "Layers",
    },
    {
      id: "when-to-reach",
      title: "WHEN TO REACH",
      essence: "large data, fact-sensitive, fresh",
      essenceKw: ["fact-sensitive", "fresh"],
      icon: "Target",
    },
    {
      id: "example",
      title: "EXAMPLE",
      essence: "answer from the company handbook",
      essenceKw: ["company handbook"],
      icon: "Search",
    },
  ],
  footer: "agents read summaries, not raw chaos",
  footerKw: ["summaries", "raw chaos"],
} as const;

// ─────────────────── F.3 — THE PACKAGE (Plugins overview) ───────────────────
//
// Capability umbrella opener. Spec §6. 5-facet menu + layer-cake canvas with
// copper PLUGIN ribbon + MCP connector dots.
export const f3Content = {
  headline: "Plugins · The expertise package",
  headlineKw: ["expertise package"],
  header: "FIVE FACETS · PLUGIN",
  facets: [
    {
      id: "what-it-is",
      title: "WHAT IT IS",
      essence: "your expertise, in a folder anyone can install",
      essenceKw: ["folder", "install"],
      icon: "Package",
    },
    {
      id: "whats-inside",
      title: "WHAT'S INSIDE",
      essence: "Skills · Hooks · MCP · Sub-agents · CLAUDE.md",
      essenceKw: ["Skills", "Hooks", "MCP", "Sub-agents", "CLAUDE.md"],
      icon: "Layers",
    },
    {
      id: "why-package",
      title: "WHY PACKAGE",
      essence: "install once, distribute, version, update everywhere",
      essenceKw: ["install once", "everywhere"],
      icon: "Share2",
    },
    {
      id: "how-it-loads",
      title: "HOW IT LOADS",
      essence: "discover → load → context-budget",
      essenceKw: ["discover", "load", "context-budget"],
      icon: "Workflow",
    },
    {
      id: "example",
      title: "EXAMPLE",
      essence: 'a "weekly-report" plugin shipped to the team',
      essenceKw: ["weekly-report", "shipped"],
      icon: "Folder",
    },
  ],
  footer: "expertise, packaged",
  footerKw: ["packaged"],
  // Canonical layer-cake stack (bottom → top) referenced by F.3 default canvas.
  cakeLayers: ["CLAUDE.md", "HOOKS", "SKILLS", "AGENTS"],
  // MCP connector adjunct icons fanning to the cake's right side (F.3 default).
  mcpConnectors: ["Notion", "GitHub", "Slack", "GDrive", "Mongo"],
} as const;

// ─────────────────── F.4 — WRITE ONCE (Skills + progressive disclosure) ───────────────────
//
// Plugin component · Skills deep-dive. Spec §7. 5-facet menu + 3-level
// progressive-disclosure flagship right canvas.
export const f4Content = {
  headline: "Skills · Write expertise once",
  headlineKw: ["Write expertise once"],
  header: "FIVE FACETS · SKILLS",
  facets: [
    {
      id: "what-it-is",
      title: "WHAT IT IS",
      essence: "a job description Claude follows perfectly",
      essenceKw: ["job description", "perfectly"],
      icon: "FileText",
    },
    {
      id: "progressive-disclosure",
      title: "PROGRESSIVE DISCLOSURE",
      essence:
        "metadata first, instructions when triggered, resources as needed",
      essenceKw: ["metadata first", "when triggered", "as needed"],
      icon: "Layers",
    },
    {
      id: "how-claude-picks",
      title: "HOW CLAUDE PICKS",
      essence: "model-invoked, name + description match user intent",
      essenceKw: ["model-invoked", "match user intent"],
      icon: "Compass",
    },
    {
      id: "lean-context",
      title: "LEAN CONTEXT, RICH KNOWLEDGE",
      essence:
        "the payoff: context budget protected, expertise unlimited",
      essenceKw: ["context budget protected", "expertise unlimited"],
      icon: "Sparkles",
    },
    {
      id: "example",
      title: "EXAMPLE",
      essence: 'a "weekly-report-author" skill',
      essenceKw: ["weekly-report-author"],
      icon: "Bot",
    },
  ],
  footer: "write once. update once. everyone gets the new standard.",
  footerKw: ["write once", "everyone gets the new standard"],
  // Progressive-disclosure flagship — three copper stops on same hue.
  disclosure: [
    {
      id: "metadata",
      level: 1,
      label: "METADATA",
      heading: "30%",
      badge: "always loaded",
      tokens: "~100 tokens",
      detail: "name + description (YAML frontmatter)",
      copper: "copper-700",
    },
    {
      id: "instructions",
      level: 2,
      label: "INSTRUCTIONS",
      heading: "55%",
      badge: "when triggered",
      tokens: "<5K tokens",
      detail: "SKILL.md content loaded",
      copper: "copper-500",
    },
    {
      id: "resources",
      level: 3,
      label: "RESOURCES",
      heading: "80%",
      badge: "as needed",
      tokens: "unlimited",
      detail: "Reference files, scripts, examples",
      copper: "copper-200",
    },
  ],
  disclosureCallout: {
    title: "LEAN CONTEXT + RICH KNOWLEDGE",
    body: "Model-invoked: Claude uses skills when relevant",
    bodyKw: ["Model-invoked", "when relevant"],
  },
  // SKILL.md preview content typed by F.4's WHAT IT IS hover state (Typewriter).
  skillMdPreview: {
    filename: "weekly-report-author/SKILL.md",
    body: `---
name: weekly-report-author
description: Drafts weekly status reports from project notes.
---

# Weekly Report Author

You are a senior project manager preparing the Friday status report.

## Sections
1. What shipped this week
2. What's at risk
3. Next week's priorities

## Tone
Factual, audience: 8 cross-functional stakeholders.`,
  },
  // EXAMPLE facet payload — explicit L1 / L2 / L3 breakdown for the canonical
  // weekly-report-author skill (per spec §7.4 EXAMPLE bullet).
  exampleBreakdown: {
    l1: "name: weekly-report-author / description: drafts weekly status reports from project notes",
    l2: "full SKILL.md — role: senior PM, sections: progress / blockers / next-week, tone: factual",
    l3: "examples/2026-Q1-weekly-template.md, examples/escalation-template.md",
  },
} as const;

// ─────────────────── F.5 — THE ADAPTER (MCP) ───────────────────
//
// Plugin component · MCP deep-dive. Spec §8. 5-facet menu + USB-analogy
// default canvas; hover swaps to dual-role / API-vs-MCP-vs-CLI / what-MCP-exposes.
export const f5Content = {
  headline: "MCP · The universal adapter",
  headlineKw: ["universal adapter"],
  header: "FIVE FACETS · MCP",
  facets: [
    {
      id: "what-it-is",
      title: "WHAT IT IS",
      essence: "USB for AI",
      essenceKw: ["USB for AI"],
      icon: "Usb",
    },
    {
      id: "dual-role",
      title: "DUAL ROLE",
      essence: "data side · tool side · same protocol",
      essenceKw: ["data side", "tool side", "same protocol"],
      icon: "ChevronsRightLeft",
    },
    {
      id: "compare",
      title: "API vs MCP vs CLI",
      essence: "three ways AI talks to your systems",
      essenceKw: ["three ways"],
      icon: "GitBranch",
    },
    {
      id: "what-mcp-exposes",
      title: "WHAT MCP EXPOSES",
      essence: "resources · tools · prompts",
      essenceKw: ["resources", "tools", "prompts"],
      icon: "Plug",
    },
    {
      id: "example",
      title: "EXAMPLE",
      essence: '"summarize my inbox at 5pm daily"',
      essenceKw: ["summarize my inbox"],
      icon: "Inbox",
    },
  ],
  footer: "one protocol, two pillars",
  footerKw: ["one protocol", "two pillars"],
  // What MCP exposes — three quick-reference cards (per spec §8.4 WHAT MCP EXPOSES).
  exposes: [
    {
      id: "resources",
      title: "Resources",
      body: "data + context (documents, meeting notes, records)",
      bodyKw: ["data", "context"],
    },
    {
      id: "tools",
      title: "Tools",
      body: "functions the AI can call (send email, update sheet, fetch report)",
      bodyKw: ["functions the AI can call"],
    },
    {
      id: "prompts",
      title: "Prompts",
      body: "templated workflows",
      bodyKw: ["templated workflows"],
    },
  ],
  // MCPCompare default state — three columns. MCP highlighted (★ + underline).
  compare: [
    {
      id: "api",
      title: "API",
      tagline: "rigid contract / devs lift each one",
      taglineKw: ["rigid contract"],
      // Per-column click-modal copy: tradeoff bullets covering rigidity,
      // portability, security, dev-effort, runtime-cost (per spec §8.6).
      modal: {
        bullets: [
          "Rigidity: schema is locked per vendor — every endpoint coded by hand",
          "Portability: low — re-wire per integration",
          "Security: bespoke auth flow per API",
          "Dev-effort: high — each new system is a project",
          "Runtime-cost: low once shipped, but slow to add capability",
        ],
      },
    },
    {
      id: "mcp",
      title: "MCP",
      tagline: "standard / portable / install once",
      taglineKw: ["standard", "portable", "install once"],
      highlight: true,
      sublabel: "best for AI agents",
      sublabelKw: ["AI agents"],
      modal: {
        bullets: [
          "Rigidity: standardized — same protocol across servers",
          "Portability: high — swap servers without changing your prompt",
          "Security: scoped permissions per server, audited at boundary",
          "Dev-effort: low — install once, reuse everywhere",
          "Runtime-cost: small protocol overhead, large productivity gain",
        ],
      },
    },
    {
      id: "cli",
      title: "CLI",
      tagline: "flexible / powerful / but local",
      taglineKw: ["flexible", "powerful", "local"],
      modal: {
        bullets: [
          "Rigidity: none — shell freedom, anything goes",
          "Portability: machine-bound — works where the binary lives",
          "Security: process-level — broad blast radius if mis-prompted",
          "Dev-effort: very low — wrap existing tools",
          "Runtime-cost: per-call shell spin-up, harder to audit",
        ],
      },
    },
  ],
} as const;

// ─────────────────── F.6 — THE UNSEXY WORK (Hooks) ───────────────────
//
// Plugin component · Hooks. Spec §9. 4-facet menu (not 5 — STRUCTURE/TYPES
// fused with THREE HOOKS DOING THE UNSEXY WORK) + 3-column canonical canvas.
export const f6Content = {
  headline: "Hooks · Doing the unsexy work",
  headlineKw: ["unsexy work"],
  header: "FOUR FACETS · HOOKS",
  facets: [
    {
      id: "what-it-is",
      title: "WHAT IT IS",
      essence: "reflexes on events",
      essenceKw: ["reflexes", "events"],
      icon: "Bell",
    },
    {
      id: "lifecycle-events",
      title: "LIFECYCLE EVENTS",
      essence: "SessionStart · PreToolUse · PostToolUse · Stop · etc.",
      essenceKw: ["SessionStart", "PreToolUse", "PostToolUse", "Stop"],
      icon: "Clock",
    },
    {
      id: "three-hooks",
      title: "THREE HOOKS DOING THE UNSEXY WORK",
      essence: "the canonical 3-column",
      essenceKw: ["canonical 3-column"],
      icon: "Hammer",
    },
    {
      id: "example",
      title: "EXAMPLE",
      essence: "auto-audit on every weekly-report save",
      essenceKw: ["auto-audit", "every weekly-report save"],
      icon: "CheckCircle",
    },
  ],
  footer: "reflexes on events. AI quietly doing its homework.",
  footerKw: ["reflexes on events", "homework"],
  // 3-column canonical visual — the F.6 flagship.
  columns: [
    {
      id: "session-start",
      type: "SessionStart",
      title: "SessionStart",
      tagline: "auto-convert what Claude can't read",
      taglineKw: ["auto-convert", "can't read"],
      // Sketch caption referenced by the column illustration.
      sketchCaption:
        "hand drops PDF/DOCX/XLSX into bucket → .md  .md  .md",
    },
    {
      id: "post-tool-use",
      type: "PostToolUse",
      title: "PostToolUse",
      subtitle: "Edit | Write",
      tagline: "every action recorded",
      taglineKw: ["every action recorded"],
      sketchCaption: "clipboard with audit log lines",
    },
    {
      id: "stop",
      type: "Stop",
      title: "Stop",
      tagline: "human gate at session end",
      taglineKw: ["human gate", "session end"],
      sketchCaption:
        'owl with thought: "wait — did anyone ack the report?"',
    },
  ],
} as const;

// ─────────────────── F.7 — SPECIALISTS (Sub-agents + orchestration) ───────────────────
//
// Plugin component · Sub-agents deep-dive. Spec §10. 5-facet menu + 2×2
// orchestration-pattern grid canvas.
export const f7Content = {
  headline: "Sub-agents · Specialist departments",
  headlineKw: ["Specialist departments"],
  header: "FIVE FACETS · AGENTS",
  facets: [
    {
      id: "what-it-is",
      title: "WHAT IT IS",
      essence: "specialists, not generalists",
      essenceKw: ["specialists", "not generalists"],
      icon: "Users",
    },
    {
      id: "how-it-works",
      title: "HOW SUB-AGENTS WORK",
      essence: "isolated context · specific role · own permissions",
      essenceKw: ["isolated context", "specific role", "own permissions"],
      icon: "Cpu",
    },
    {
      id: "patterns",
      title: "ORCHESTRATION PATTERNS",
      essence: "centralized · decentralized · chain · parallel",
      essenceKw: ["centralized", "decentralized", "chain", "parallel"],
      icon: "Network",
    },
    {
      id: "when-to-use",
      title: "WHEN TO USE WHICH",
      essence: "tradeoff matrix",
      essenceKw: ["tradeoff matrix"],
      icon: "Map",
    },
    {
      id: "example",
      title: "EXAMPLE",
      essence: 'a "monthly board pack" multi-agent workflow',
      essenceKw: ["monthly board pack"],
      icon: "Workflow",
    },
  ],
  footer: "the planner picks the pattern",
  footerKw: ["planner picks the pattern"],
  // Four canonical orchestration patterns (2×2 grid default canvas).
  patterns: [
    {
      id: "centralized",
      variant: "centralized",
      label: "CENTRALIZED",
      essence: "planner top",
      essenceKw: ["planner top"],
    },
    {
      id: "decentralized",
      variant: "decentralized",
      label: "DECENTRALIZED",
      essence: "peer mesh",
      essenceKw: ["peer mesh"],
    },
    {
      id: "chain",
      variant: "chain",
      label: "CHAIN",
      essence: "sequential",
      essenceKw: ["sequential"],
    },
    {
      id: "parallel",
      variant: "parallel",
      label: "PARALLEL",
      essence: "fan-out / merge",
      essenceKw: ["fan-out", "merge"],
    },
  ],
} as const;

// ─────────────────── F.8 — YOUR AGENTIC OS (coronation) ───────────────────
//
// Section synthesis. Spec §11. Full-stage layout (not 480/660 split).
// Enriched 9-layer stack (LEFT) + 4 output cards (RIGHT) + horizontal
// facet strip on top + closing portability tagline.
export const f8Content = {
  headline: "Your Agentic OS",
  headlineKw: ["Agentic OS"],
  // Horizontal facet strip across the top — lights up as step-reveal beats.
  facetStrip: [
    { id: "components", label: "COMPONENTS" },
    { id: "outputs", label: "OUTPUTS" },
    { id: "portable", label: "PORTABLE" },
    { id: "build-incremental", label: "BUILD INCREMENTAL" },
  ],
  // 9-layer enriched stack, bottom-to-top per spec §11.4.
  // Each layer has hover popover copy (~6 lines, plain text).
  stack: [
    {
      id: "claude-md",
      label: "CLAUDE.md",
      caption: "the foundation",
      captionKw: ["foundation"],
      popover:
        "your default instructions, persona, tone preferences. Loaded on every session.",
      popoverKw: ["every session"],
    },
    {
      id: "tools",
      label: "TOOLS (MCP)",
      caption: "your connections",
      captionKw: ["connections"],
      popover:
        "live links to Gmail, calendar, files, knowledge base. AI can read and act safely.",
      popoverKw: ["read and act safely"],
    },
    {
      id: "people",
      label: "PEOPLE",
      caption: "your context",
      captionKw: ["context"],
      popover:
        "your role, your team, your escalation chain — so AI knows who matters.",
      popoverKw: ["who matters"],
    },
    {
      id: "data",
      label: "DATA",
      caption: "your sources",
      captionKw: ["sources"],
      popover:
        "your owned documents, reports, notes — RAG-grounding for accuracy.",
      popoverKw: ["RAG-grounding"],
    },
    {
      id: "hooks",
      label: "HOOKS",
      caption: "your reflexes",
      captionKw: ["reflexes"],
      popover:
        "auto-checks at every save, audit logs, human gates at session end.",
      popoverKw: ["auto-checks", "human gates"],
    },
    {
      id: "skills",
      label: "SKILLS",
      caption: "your playbooks",
      captionKw: ["playbooks"],
      popover:
        "packaged expertise: a skill per task you do repeatedly.",
      popoverKw: ["packaged expertise"],
    },
    {
      id: "agents",
      label: "AGENTS",
      caption: "your specialists",
      captionKw: ["specialists"],
      popover:
        "sub-agents trained on specific roles — finance, scheduling, drafting.",
      popoverKw: ["specific roles"],
    },
    {
      id: "human-in-loop",
      label: "HUMAN IN LOOP",
      caption: "your approval gates",
      captionKw: ["approval gates"],
      popover:
        "for high-stakes decisions, AI proposes, you decide. Always.",
      popoverKw: ["AI proposes, you decide"],
    },
    {
      id: "orchestration",
      label: "ORCHESTRATION",
      caption: "your conductor",
      captionKw: ["conductor"],
      popover:
        "the pattern binding agents together — centralized, parallel, etc.",
      popoverKw: ["binding agents together"],
    },
  ],
  // 4 user-facing output cards on the right side (per spec §11.5).
  outputs: [
    {
      id: "daily-digest",
      kind: "daily-digest",
      title: "DAILY DIGEST",
      subtitle: "today's brief",
      subtitleKw: ["today's brief"],
      body: "one-page summary of inbox + calendar + open tasks",
      bodyKw: ["one-page summary"],
      popover:
        "5am: 'today: 2 docs to review, 3 meetings, weather, news bullets'",
      popoverKw: ["today"],
    },
    {
      id: "tasks",
      kind: "tasks",
      title: "TASKS",
      subtitle: "from email + chats",
      subtitleKw: ["email", "chats"],
      body: "extracted action items, ranked by urgency",
      bodyKw: ["action items", "ranked by urgency"],
      popover:
        "from your inbox: 'reply to Pak A re: Q2 budget review'",
      popoverKw: ["your inbox"],
    },
    {
      id: "schedule",
      kind: "schedule",
      title: "SCHEDULE",
      subtitle: "calendar synced",
      subtitleKw: ["calendar synced"],
      body: "proposed shifts, conflicts flagged",
      bodyKw: ["conflicts flagged"],
      popover:
        "11:00 conflict: budget review vs. team 1:1 — propose reschedule?",
      popoverKw: ["conflict", "reschedule"],
    },
    {
      id: "memories",
      kind: "memories",
      title: "MEMORIES",
      subtitle: "never re-explain",
      subtitleKw: ["never re-explain"],
      body: "persistent context across sessions",
      bodyKw: ["persistent context"],
      popover:
        "remembers: your tone preferences, frequent contacts, recurring projects",
      popoverKw: ["tone preferences", "recurring projects"],
    },
  ],
  // Closing tagline — appears EXACTLY ONCE in the deck (spec §11.10).
  tagline: "this is yours — wherever you go, you carry it.",
  taglineKw: ["this is yours", "wherever you go, you carry it"],
} as const;

// ─────────────────── F.9 — NEXT (photographic bridge to G) ───────────────────
//
// Photographic exhale closing Section F. Spec §12. Mirrors E.11 / D.5
// template: hero photo, copper-light vignette, headline + copper rule + subline.
export const f9Content = {
  // Hero photo prompt (per spec §12.3) — final asset drafted at implementation.
  heroPhotoPrompt:
    "Pre-dawn light over a cinematic landscape, copper sun catching distant horizon, editorial-serious tone, no people, wide angle, single light source from horizon. 16:9. Suggests 'dawn of new tools.'",
  vignetteSide: "bottom-left",
  // Three reveal beats (per spec §12.4).
  beat1: { text: "Techniques covered.", kw: ["Techniques covered"] },
  beat2: { text: "Tools next.", kw: ["Tools next"] },
} as const;
