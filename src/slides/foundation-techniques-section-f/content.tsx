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
  subtitle: "What AI knows. What AI does.",
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
  footer: "seven techniques · one agentic stack",
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
      essence: "Skills · Hooks · MCP · Sub-agents",
      essenceKw: ["Skills", "Hooks", "MCP", "Sub-agents"],
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
  cakeLayers: ["HOOKS", "SKILLS", "AGENTS"],
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
// Section synthesis. Spec §§2–9 (2026-05-14 rework). Monitor-mockup layout:
// bezel + top bar + nav rail + main canvas (panel per active tab) + chat rail.
// Driven by 6-step axis; nav-rail clicks override step-driven defaults.
// Closing portability tagline is load-bearing and appears EXACTLY ONCE in the
// entire deck — do not change the string.
export const f8Content = {
  headline: "The command center you carry.",
  headlineKw: ["command center", "carry"],
  tagline: "this is yours — wherever you go, you carry it.",
  taglineKw: ["yours", "carry it"],

  // ── Top status bar inside the monitor bezel (spec §3.1) ──
  topBar: {
    wordmark: "AGENTICOS",
    models: ["claude-opus-4-7", "claude-haiku-4.5", "gemini-3.1-pro", "gpt-5.5"],
    activeModel: "claude-opus-4-7",
    clock: "09:14",
  },

  // ── Left icon nav rail, 8 tabs (spec §3.2). Icon names resolve via
  // LucideIcon.tsx. Tooltip label shown on hover. ──
  navRail: [
    { id: "dashboard",  icon: "LayoutGrid", label: "Dashboard" },
    { id: "skills",     icon: "Wand2",      label: "Skills" },
    { id: "agents",     icon: "Bot",        label: "Agents" },
    { id: "vault",      icon: "FolderLock", label: "Vault" },
    { id: "memory",     icon: "Brain",      label: "Memory" },
    { id: "connectors", icon: "Plug",       label: "Connectors" },
    { id: "people",     icon: "Users",      label: "People" },
    { id: "settings",   icon: "Settings",   label: "Settings" },
  ],

  // ── Right chat rail (spec §3.4). Always visible. recentRuns has 12
  // entries; only ~6 visible, the rest scroll. ──
  chatRail: {
    heading: "RUN A SKILL TO BEGIN",
    placeholder:
      "Type any prompt, or pick a skill below to load a template…",
    quickSkills: [
      { label: "Morning Brief",  command: "/morning-brief" },
      { label: "Inbox Triage",   command: "/inbox-triage" },
      { label: "Deep Research",  command: "/deep-research" },
      { label: "YT Titles",      command: "/yt-titles" },
      { label: "Outline",        command: "/outline" },
      { label: "Carousel",       command: "/carousel" },
    ],
    recentRuns: [
      { time: "09:12", label: "Morning Brief",     status: "OK",   kw: ["Morning Brief"] },
      { time: "09:05", label: "Inbox Triage",      status: "OK",   kw: ["Inbox Triage"] },
      { time: "08:48", label: "YT Titles",         status: "OK",   kw: ["YT Titles"] },
      { time: "08:31", label: "Vault Cleanup",     status: "WARN", kw: ["Vault Cleanup"] },
      { time: "07:55", label: "Deep Research",     status: "OK",   kw: ["Deep Research"] },
      { time: "07:10", label: "Outline",           status: "OK",   kw: ["Outline"] },
      { time: "06:42", label: "Meeting Notes",     status: "OK",   kw: ["Meeting Notes"] },
      { time: "06:15", label: "Reply Drafter",     status: "OK",   kw: ["Reply Drafter"] },
      { time: "23:48", label: "Lightrag Upload",   status: "ERR",  kw: ["Lightrag Upload"] },
      { time: "22:30", label: "KB Query",          status: "OK",   kw: ["KB Query"] },
      { time: "21:05", label: "Carousel",          status: "OK",   kw: ["Carousel"] },
      { time: "20:20", label: "Calendar Optimizer",status: "OK",   kw: ["Calendar Optimizer"] },
    ],
  },

  // ── Dashboard panel: 4-tile grid (spec §4.1) ──
  dashboard: {
    digest: {
      items: [
        { time: "06:00", label: "5 emails awaiting reply",       kw: ["awaiting reply"] },
        { time: "06:00", label: "2 docs flagged for review",     kw: ["flagged for review"] },
        { time: "06:00", label: "3 meetings before lunch",       kw: ["3 meetings"] },
        { time: "06:00", label: "1 open thread from yesterday",  kw: ["open thread"] },
        { time: "06:00", label: "weekly digest ready to share",  kw: ["weekly digest"] },
      ],
    },
    brief: {
      headline: "3 meetings today — light afternoon, deep-work block 14:00–16:00.",
      priorities: [
        { text: "ship the Q2 plan draft to your lead before 11:00.", kw: ["Q2 plan draft", "before 11:00"] },
        { text: "review the research synthesis ahead of the 1:1.",    kw: ["research synthesis", "1:1"] },
        { text: "close the inbox thread on the budget revision.",     kw: ["inbox thread", "budget revision"] },
      ],
    },
    calendar: {
      slots: [
        { time: "09:30", label: "budget review",           kw: ["budget review"] },
        { time: "11:00", label: "1:1 with your lead",      kw: ["1:1"] },
        { time: "13:00", label: "review draft",            kw: ["review draft"] },
        { time: "15:00", label: "conflict: two holds overlap", conflict: true, kw: ["conflict"] },
      ],
    },
    activity: {
      points: [22, 28, 24, 31, 35, 30, 42, 38, 47, 52, 48, 56, 61, 68],
      total: 319,
      lastDay: 68,
    },
  },

  // ── Skills panel: 14 chips (spec §4.2). Each chip = { label, micro,
  // popover } with optional kw for the label. ──
  skills: [
    { id: "vault-cleanup",      command: "/vault-cleanup",      label: "Vault Cleanup",       micro: "sweep stale docs",        popover: "Scan your vault for stale or duplicate documents and propose a tidy-up plan.",   kw: ["Vault Cleanup"] },
    { id: "morning-brief",      command: "/morning-brief",      label: "Morning Brief",       micro: "compile today's brief",   popover: "Pulls inbox, calendar, and open tasks into a one-page brief by 06:00 every day.",  kw: ["Morning Brief"] },
    { id: "inbox-triage",       command: "/inbox-triage",       label: "Inbox Triage",        micro: "rank + draft replies",    popover: "Ranks your inbox by urgency and drafts context-aware replies for you to approve.", kw: ["Inbox Triage"] },
    { id: "deep-research",      command: "/deep-research",      label: "Deep Research",       micro: "long-form synthesis",     popover: "Long-form synthesis across the web and your own library, with citations.",        kw: ["Deep Research"] },
    { id: "yt-titles",          command: "/yt-titles",          label: "YT Titles",           micro: "viral title variants",    popover: "Generates 10 viral title variants for a video draft with hook + curiosity scores.", kw: ["YT Titles"] },
    { id: "outline",            command: "/outline",            label: "Outline",             micro: "doc structure draft",     popover: "Turns a rough brief into a clean section-by-section outline you can edit live.",   kw: ["Outline"] },
    { id: "kb-query",           command: "/kb-query",           label: "KB Query",            micro: "answer from your docs",   popover: "Answers a question grounded only in your own knowledge base, with source links.",  kw: ["KB Query"] },
    { id: "carousel",           command: "/carousel",           label: "Carousel",            micro: "slide carousel from doc", popover: "Turns a longform doc into a 6–10 slide social carousel with consistent styling.", kw: ["Carousel"] },
    { id: "short-form",         command: "/short-form",         label: "Short-form",          micro: "60-second cut-down",      popover: "Cuts a long talk or recording down to a sharp 60-second short with captions.",    kw: ["Short-form"] },
    { id: "lightrag-upload",    command: "/lightrag-upload",    label: "Lightrag Upload",     micro: "index new docs",          popover: "Indexes new documents into your retrieval graph so they're searchable next run.",  kw: ["Lightrag Upload"] },
    { id: "reply-drafter",      command: "/reply-drafter",      label: "Reply Drafter",       micro: "context-aware replies",   popover: "Drafts replies that match your tone and remember prior context on the thread.",    kw: ["Reply Drafter"] },
    { id: "meeting-notes",      command: "/meeting-notes",      label: "Meeting Notes",       micro: "transcribe + extract",    popover: "Transcribes a meeting and extracts decisions, action items, and open questions.",  kw: ["Meeting Notes"] },
    { id: "calendar-optimizer", command: "/calendar-optimizer", label: "Calendar Optimizer",  micro: "defrag your week",        popover: "Defrags your week — clusters focus time, spaces meetings, flags conflicts.",      kw: ["Calendar Optimizer"] },
    { id: "prd-drafter",        command: "/prd-drafter",        label: "PRD Drafter",         micro: "product spec scaffold",   popover: "Scaffolds a product spec from a one-line idea: problem, users, scope, risks.",     kw: ["PRD Drafter"] },
  ],

  // ── Agents panel: 6 cards (spec §4.3) ──
  agents: [
    { id: "finn",   initial: "F", name: "Finn",  role: "Finance Analyst",            lastActivity: "last run: 3h ago — drafted Q2 budget summary",  popover: "Use Finn when you need a numbers-first pass on budgets, forecasts, or spend reviews.", kw: ["Finance Analyst", "Q2 budget summary"] },
    { id: "sched",  initial: "S", name: "Sched", role: "Scheduler",                  lastActivity: "last run: 12m ago — resolved 2 calendar holds", popover: "Use Sched when your calendar fragments and you want a clean weekly shape back.",       kw: ["Scheduler", "calendar holds"] },
    { id: "draft",  initial: "D", name: "Draft", role: "Drafter",                    lastActivity: "last run: 1h ago — outlined a launch memo",     popover: "Use Draft when you need a first-pass write-up that matches your voice within minutes.",  kw: ["Drafter", "launch memo"] },
    { id: "rex",    initial: "R", name: "Rex",   role: "Researcher",                 lastActivity: "last run: 4h ago — synthesized 18 sources",     popover: "Use Rex when you need long-form synthesis with citations across the web and your docs.",  kw: ["Researcher", "synthesized"] },
    { id: "qa",     initial: "Q", name: "QA",    role: "QA Reviewer",                lastActivity: "last run: 25m ago — flagged 3 inconsistencies", popover: "Use QA when a draft is almost done and you want a sharp second pair of eyes on it.",      kw: ["QA Reviewer", "inconsistencies"] },
    { id: "reply",  initial: "Y", name: "Reply", role: "Customer Reply Specialist",  lastActivity: "last run: 8m ago — drafted 6 reply variants",   popover: "Use Reply when an inbox thread needs warmth and accuracy without losing your voice.",     kw: ["Customer Reply Specialist", "reply variants"] },
  ],

  // ── Vault panel: 8 folders + previews (spec §4.4). Default selected =
  // "drafts". `previews` is keyed by folder id so clicking another folder
  // swaps the preview pane. ──
  vault: {
    folders: [
      { id: "notes",        name: "Notes",               count: 142 },
      { id: "reports",      name: "Reports",             count: 38  },
      { id: "drafts",       name: "Drafts",              count: 22  },
      { id: "archive",      name: "Archive",             count: 511 },
      { id: "inbox-snaps",  name: "Inbox Snapshots",     count: 67  },
      { id: "transcripts",  name: "Meeting Transcripts", count: 94  },
      { id: "research",     name: "Research Library",    count: 213 },
      { id: "workshops",    name: "Workshops",           count: 18  },
    ],
    selectedFolder: "drafts",
    previews: {
      notes: {
        title: "field notes · open loops",
        lastEdited: "edited 14m ago",
        body: [
          "A running scratchpad of half-formed ideas worth revisiting later this week.",
          "Three threads keep coming back: pricing clarity, onboarding cliffs, and the slow review loop.",
          "None of these are urgent today, but each one will be cheaper to fix if it gets named soon.",
          "Next pass: pick the one with the smallest reversible step and try it before the Friday sync.",
        ],
      },
      reports: {
        title: "Q1 retrospective · v2 draft",
        lastEdited: "edited 2h ago",
        body: [
          "The headline number landed above plan, but the story underneath is more interesting than the chart.",
          "Two cohorts pulled the average up; the long tail moved less than we'd like and deserves its own pass.",
          "We held the line on quality even as volume grew, which is the result worth defending in the readout.",
          "Recommend a follow-up note on the tail cohort before next quarter's planning kicks off.",
        ],
      },
      drafts: {
        title: "untitled · launch announcement",
        lastEdited: "edited 8m ago",
        body: [
          "Opening with the audience problem, not the product feature, makes the rest of the post land harder.",
          "Three paragraphs in, the draft drifts into spec mode — that section needs to be cut or moved below the fold.",
          "The closing call to action is doing too much work; one clear next step beats three optional ones.",
          "Hold a final read tomorrow morning with fresh eyes before sending to the reviewers.",
        ],
      },
      archive: {
        title: "2025 retro · archived",
        lastEdited: "archived 3 months ago",
        body: [
          "A wide-angle look at the prior year, kept here for reference rather than active editing.",
          "The decisions that aged well were the ones we wrote down in one paragraph and revisited quarterly.",
          "The ones that aged badly tended to live only in chat threads, where context faded quickly.",
          "Worth re-reading once a year to recalibrate what 'good judgment' looked like in hindsight.",
        ],
      },
      "inbox-snaps": {
        title: "inbox snapshot · this morning",
        lastEdited: "captured 06:02",
        body: [
          "A flattened view of the inbox at the moment the morning brief ran, before triage.",
          "Five threads need a real reply, three need a one-line nudge, and the rest can wait the day out.",
          "Two threads are pre-drafted in Reply Drafter and are sitting in the chat rail waiting on approval.",
          "The snapshot itself is read-only; edits happen against the live inbox, not this artifact.",
        ],
      },
      transcripts: {
        title: "strategy sync · 2026-05-13",
        lastEdited: "transcribed yesterday",
        body: [
          "A clean transcript of yesterday's sync with speaker labels and rough timestamps every minute.",
          "Three decisions landed; each is pulled out into the meeting-notes summary above the transcript.",
          "Two open questions were parked deliberately and should reappear on next week's agenda.",
          "Searchable from KB Query — try a phrase from the meeting and the relevant minute jumps to the top.",
        ],
      },
      research: {
        title: "agentic systems · field survey",
        lastEdited: "edited last week",
        body: [
          "A working document pulling together what's been published on agentic systems in the last six months.",
          "Patterns are starting to repeat: orchestration matters more than model choice once tools are good.",
          "The gap in the literature is around evaluation — most write-ups claim wins without a clear test set.",
          "Next step: write a one-pager on what 'good evaluation' looks like for these systems in practice.",
        ],
      },
      workshops: {
        title: "workshop kit · facilitator notes",
        lastEdited: "edited 3 days ago",
        body: [
          "A reusable kit of prompts, slide outlines, and timing cues for hands-on sessions with mixed audiences.",
          "The opening exercise is doing most of the work — keep it short, concrete, and tied to their own examples.",
          "Sections in the middle can be swapped in or out depending on what the room signals in the first 20 minutes.",
          "The closing reflection has shipped well three runs in a row; resist the urge to over-engineer it.",
        ],
      },
    },
  },

  // ── Memory panel: 3 stacked sections (spec §4.5). Generic knowledge-work
  // placeholders only; no real personal info. ──
  memory: {
    identity: {
      heading: "WHO YOU ARE",
      bullets: [
        "knowledge worker on a small cross-functional team",
        "owns one surface end-to-end — writing, calls, ship",
        "single lead; backup is the team chat",
        "prefers async decisions with a written trail",
      ],
      kw: ["cross-functional", "end-to-end", "single lead", "async decisions"],
    },
    preferences: {
      heading: "HOW YOU WORK",
      bullets: [
        "tone: warm, direct, no jargon",
        "short paragraphs; bullets only for lists",
        "deep-work block 14:00–16:00, no meetings",
        "abbreviations: PRD, RFC, 1:1, EOD, TL;DR",
        "draft, sleep on it, ship next morning",
      ],
      kw: ["warm, direct", "deep-work block", "sleep on it"],
    },
    recurring: {
      heading: "WHAT YOU'RE WORKING ON",
      bullets: [
        "Q2 plan — final draft due Friday",
        "agentic workshop — facilitator notes in Vault",
        "research survey on evaluation — drafting a one-pager",
        "key contacts: lead, design partner, QA owner",
        "hold pricing changes until after the launch"
      ],
      kw: ["Q2 plan", "agentic workshop", "research survey"],
    },
    recentLearnings: {
      heading: "RECENT LEARNINGS",
      bullets: [
        "Loom replies cut sync meetings by ~40%",
        "Meeting notes ship faster when drafted in calendar slot",
        "Async decisions stick when written same day",
        "Outline first; prose second — half the rewrite cost",
      ],
      kw: ["Loom replies", "calendar slot", "Outline first"],
    },
  },

  // ── Connectors panel: 8 tiles (spec §4.6). All connected by default
  // except Linear, which shows "+ ADD". ──
  connectors: [
    { id: "gmail",    name: "Gmail",            sublabel: "Communication",  lastUsed: "last used 5 minutes ago",   connected: true,  popover: "Read and draft mail in your name; nothing sends without your approval.",                kw: ["last sync"] },
    { id: "gcal",     name: "Google Calendar",  sublabel: "Productivity",   lastUsed: "last used 12 minutes ago",  connected: true,  popover: "Read your calendar and propose holds, swaps, and conflict resolutions.",                kw: ["last sync"] },
    { id: "gdrive",   name: "Google Drive",     sublabel: "Storage",        lastUsed: "last used 1 hour ago",      connected: true,  popover: "Read your docs and slides; new files land in a single, agent-owned folder.",            kw: ["last sync"] },
    { id: "slack",    name: "Slack",            sublabel: "Communication",  lastUsed: "last used 2 minutes ago",   connected: true,  popover: "Listen to channels you opt in to and summarize threads on demand.",                     kw: ["last sync"] },
    { id: "notion",   name: "Notion",           sublabel: "Productivity",   lastUsed: "last used 30 minutes ago",  connected: true,  popover: "Read and update your knowledge base; edits go to a draft block for your review.",       kw: ["last sync"] },
    { id: "github",   name: "GitHub",           sublabel: "Development",    lastUsed: "last used 8 minutes ago",   connected: true,  popover: "Read issues and PRs, open draft PRs; merges always require your explicit approval.",    kw: ["last sync"] },
    { id: "stripe",   name: "Stripe",           sublabel: "Payment",        lastUsed: "last used 4 hours ago",     connected: true,  popover: "Read-only access to revenue and customer data for reporting; no write actions.",        kw: ["Read-only"] },
    { id: "linear",   name: "Linear",           sublabel: "Productivity",   lastUsed: "not connected",             connected: false, popover: "Connect Linear to let the agent open tickets, triage backlogs, and link work to plans.", kw: ["not connected"] },
  ],

  // ── People panel: 5 generic knowledge-work personas (spec §4.7). ──
  people: [
    {
      id: "lead",
      initials: "AL",
      name: "A. Lead",
      role: "your direct lead",
      persona: "prefers async over meetings; reviews drafts overnight.",
      lastInteraction: [
        "wed · approved the Q2 plan outline with two notes on scope.",
        "asked for a one-page summary by Friday morning.",
      ],
      kw: ["direct lead", "async"],
    },
    {
      id: "design",
      initials: "MD",
      name: "M. Design",
      role: "design partner",
      persona: "thinks in flows; loves Loom walkthroughs over docs.",
      lastInteraction: [
        "tue · sent a Loom on the onboarding redesign — 7 min.",
        "wants a written response, not another Loom in return.",
      ],
      kw: ["design partner", "flows"],
    },
    {
      id: "qa",
      initials: "JQ",
      name: "J. QA",
      role: "QA owner",
      persona: "blunt, precise, allergic to vague success criteria.",
      lastInteraction: [
        "mon · flagged 3 inconsistencies in the launch checklist.",
        "expects a yes/no on each before the Thursday cut.",
      ],
      kw: ["QA owner", "precise"],
    },
    {
      id: "pm-peer",
      initials: "SP",
      name: "S. Peer",
      role: "partner PM on the next launch",
      persona: "prefers shared docs over chat; oncall Tue and Thu.",
      lastInteraction: [
        "thu · proposed a swap on the release window — leaning yes.",
        "needs a decision so marketing can lock their dates.",
      ],
      kw: ["partner PM", "shared docs"],
    },
    {
      id: "exec-sponsor",
      initials: "RE",
      name: "R. Exec",
      role: "executive sponsor",
      persona: "wants the headline first; reads the appendix only if asked.",
      lastInteraction: [
        "fri · asked for a 5-line update before next week's review.",
        "no slides — a written paragraph is fine and preferred.",
      ],
      kw: ["executive sponsor", "headline first"],
    },
  ],
} as const;

// ─────────────────── F.9 — BRIDGE · CROSSED (photographic bridge to G) ───────────────────
//
// Photographic exhale closing Section F. Mirrors E.11 template: hero photo,
// copper-light vignette, two-row headline + copper rule + italic subline.
// 2-step reveal — beat1 (two stacked lines) → beat2 (italic copper).
export const f9Content = {
  heroPhotoPrompt:
    "Pre-dawn light over a cinematic landscape, copper sun catching distant horizon, editorial-serious tone, no people, wide angle, single light source from horizon. 16:9. Suggests 'dawn of new tools.'",
  vignetteSide: "bottom-left",
  beat1: {
    lineA: { text: "Seven techniques.", kw: ["techniques"] },
    lineB: { text: "The toolkit is open.", kw: ["toolkit"] },
  },
  beat2: {
    text: "Next: the platforms that bring them to life.",
    kw: ["platforms", "life"],
  },
} as const;
