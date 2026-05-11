// Single source of truth for all Section E slide copy (E.1–E.11).
//
// Schema is ported verbatim from `claude-design-project/jsx/data.jsx` — the
// design source — with two differences:
//   1. `const E<N> = {...}` → `export const e<N>Content = {...} as const`
//   2. The window-globals attach is dropped (TS modules export instead).
//
// Field names match the design source EXACTLY (e.g. `headlineKw`, `naivePrompt`,
// `properLabels`, `spine[].pop`, `whyPoints`, `satellites`, `rings[].sub`,
// `practices[].pattern`). Slide files in this directory will be re-ported in
// the matching tasks (T10–T20) to consume this new shape; until then, TS
// errors in those slide files are expected.
//
// Markup convention: data carries plain strings + a sibling `kw` / `*Kw` array
// of substrings to highlight at render time. No inline `<em>` tags in data.

export const e1Content = {
  headline: "Three layers. Each one contains the last.",
  headlineKw: ["Each one contains the last"],
  layers: [
    {
      id: "prompt", label: "PROMPT", titleA: "Prompt", titleB: "Engineering",
      essence: "the instructions", kw: ["instructions"],
      summarySub: "How to interact with AI properly.",
      blurb: "How you instruct. The starting point — clarity, structure, examples.",
      tags: ["Role", "Task", "Output", "Examples", "Structure"],
    },
    {
      id: "context", label: "CONTEXT", titleA: "Context", titleB: "Engineering",
      essence: "the information", kw: ["information"],
      summarySub: "How to weaponize AI with the right understanding.",
      blurb: "What the model sees. Memory, retrieval, tools — the surrounding payload.",
      tags: ["Memory", "RAG", "Tools", "System", "Persistence"],
    },
    {
      id: "harness", label: "HARNESS", titleA: "Harness", titleB: "Engineering",
      essence: "the system", kw: ["system"],
      summarySub: "How to leverage AI at its optimal capability.",
      blurb: "The system around the model. Orchestration, observability, autonomy.",
      tags: ["Orchestration", "Observability", "Subagents", "Triggers", "Memory"],
    },
  ],
  quote: "A decent model with a great harness beats a great model with a bad harness.",
  quoteKw: ["A decent model with a great harness beats a great model with a bad harness"],
  attr: "— Anthropic",
} as const;

export const e2Content = {
  headline: "Layer 1: Prompt — clarity.",
  headlineKw: ["Prompt"],
  definition: "The instructions you give the model.",
  definitionKw: ["instructions"],
  outcomes: [
    { text: "Vague in → vague out.", kw: ["Vague in"] },
    { text: "Structured in → structured out.", kw: ["Structured in"] },
    { text: "Show what good looks like → fewer iterations, more useful results.", kw: ["Show what good looks like"] },
  ],
  bridge: "Next: the canonical structure behind every good prompt.",
  bridgeKw: ["canonical structure"],
  naivePrompt: "Write me this week's project report.",
  naiveResult: "This week, the team made progress on several initiatives.\nVarious items were completed and others are ongoing.\nNext week we plan to continue the work in flight.",
  properPrompt: "Role: You are a project lead preparing the Friday status report.\nTask: Draft a concise weekly status — (1) what shipped, (2) what's at risk, (3) next week.\nContext: For EOD Friday team standup. Audience: 8 cross-functional stakeholders.\nExamples: See last week's report (attached) — match structure and tone.\nOutput: Markdown, H2 sections, ~250 words. Lead with the at-risk item.",
  properLabels: ["Role:", "Task:", "Context:", "Examples:", "Output:"],
  properResult: "## At Risk: Module B\nMigration is 1 sprint behind plan; root cause is the upstream schema change.\n## Shipped\n- Onboarding revamp · 12% activation lift\n- Checkout refactor merged behind flag\n## Next Week\n- Cut Module B remediation branch",
} as const;

export const e3Content = {
  headline: "One skeleton. Many names.",
  headlineKw: ["One skeleton"],
  footer: "Different mnemonics. Same six ingredients.",
  footerKw: ["Same six ingredients"],
  spine: [
    {
      id: "role", num: 1, name: "Role", essence: "Who AI should be",
      pop: {
        desc: "Define who the AI should be.",
        pattern: '"You are ... with N years exp specialized in ..."',
        rows: [
          { label: "Examples", items: ["project lead", "ops analyst", "geology reviewer"] },
        ],
      },
    },
    {
      id: "instruction", num: 2, name: "Instruction", essence: "Action + how",
      pop: {
        desc: "Clear action + constraints.",
        rows: [
          { label: "Triggers", items: ['"Analyze ..."', '"Please exclude ..."', '"Ultrathink on ..."'] },
          { label: "Also covers", items: ["style", "tone", "process detail", "control"] },
        ],
      },
    },
    {
      id: "output", num: 3, name: "Output Format", essence: "Shape of result",
      pop: {
        desc: "Specify how the response is structured.",
        rows: [
          { label: "Formats", items: ["Markdown", "Tables", "YAML", "JSON", "CSV", "PDF"] },
        ],
      },
    },
    {
      id: "context", num: 4, name: "Context", essence: "Background + audience",
      pop: {
        desc: "Essential additional information.",
        rows: [
          { label: "Categories", items: ["Background", "Objectives", "Goal", "Audience", "Constraints"] },
        ],
      },
    },
    {
      id: "examples", num: 5, name: "Examples", essence: "Show good output",
      pop: {
        desc: "Show what good output looks like.",
        rows: [
          { label: "Forms", items: ["Attached example docs", "sample input/output pairs"] },
        ],
      },
    },
    {
      id: "input", num: 6, name: "Input", essence: "Specific data",
      pop: {
        desc: "The specific data to work with.",
        rows: [
          { label: "Forms", items: ["Attached file", "specific request"] },
        ],
        note: "User prompt; if instructions are generic → system prompt.",
      },
    },
  ],
  frameworks: [
    { id: "race",   acronym: "RACE",   breakdown: "Role · Action · Context · Explanation",                hits: [1, 2, 4] },
    { id: "care",   acronym: "CARE",   breakdown: "Context · Action · Result · Example",                  hits: [4, 2, 3, 5] },
    { id: "ape",    acronym: "APE",    breakdown: "Action · Purpose · Execution",                         hits: [2] },
    { id: "coast",  acronym: "COAST",  breakdown: "Context · Objective · Actions · Scenario · Task",      hits: [4, 2] },
    { id: "create", acronym: "CREATE", breakdown: "Character · Request · Examples · Adjustments · Type · Extras", hits: [1, 2, 5, 3, 4] },
    { id: "roses",  acronym: "ROSES",  breakdown: "Role · Objective · Scenario · Expected · Solution",    hits: [1, 2, 4, 3] },
    { id: "tag",    acronym: "TAG",    breakdown: "Task · Action · Goal",                                 hits: [2] },
    { id: "pain",   acronym: "PAIN",   breakdown: "Problem · Action · Information · Next steps",          hits: [4, 2, 6] },
    { id: "rise",   acronym: "RISE",   breakdown: "Role · Input · Steps · Execution",                     hits: [1, 6, 2] },
    { id: "creo",   acronym: "CREO",   breakdown: "Context · Request · Explanation · Outcome",            hits: [4, 2, 3] },
  ],
} as const;

export const e4Content = {
  headline: "Eight techniques. Three tiers.",
  headlineKw: ["Three tiers"],
  footer: "Higher tiers borrow from later layers. ART · RAG · ReAct already point to context and harness.",
  footerKw: ["Higher tiers", "context", "harness"],
  tiers: [
    {
      id: "basic", label: "BASIC", copper: "copper-700",
      cards: [
        { id: "zero-shot", title: "Zero-Shot",        essence: "Ask once, no examples" },
        { id: "few-shot",  title: "Few-Shot",         essence: "Show 2–3 examples" },
        { id: "cot",       title: "Chain-of-Thought", essence: "Think step by step" },
      ],
    },
    {
      id: "intermediate", label: "INTERMEDIATE", copper: "copper-500",
      cards: [
        { id: "self-cons", title: "Self-Consistency", essence: "Multiple paths, consensus" },
        { id: "tot",       title: "Tree of Thoughts", essence: "Branch decision paths" },
      ],
    },
    {
      id: "advanced", label: "ADVANCED", copper: "copper-300",
      cards: [
        { id: "rag",   title: "RAG",   essence: "Retrieve + ground in docs" },
        { id: "art",   title: "ART",   essence: "Reason + use tools" },
        { id: "react", title: "ReAct", essence: "Think → Act → Observe → repeat" },
      ],
    },
  ],
  modal: {
    "zero-shot": {
      bestFor: "well-defined tasks · quick single-pass requests",
      tradeOff: "relies entirely on training",
      example: '"Analyze the financial risks in our Q3 report\nand provide recommendations."',
    },
    "few-shot": {
      bestFor: "classification · formatting · style mimicking",
      tradeOff: "examples consume tokens",
      example: '"Classify these customer emails by department:\n  \'Help with my balance\' → Finance\n  \'The app keeps crashing\' → Tech Support\nNow classify: \'Error in last month\'s invoice\'"',
    },
    "cot": {
      bestFor: "math · logic · multi-step reasoning",
      tradeOff: "longer outputs, but more accurate",
      example: '"Calculate our CAC. Think step-by-step:\n  1. Identify all marketing expenses\n  2. Count new customers acquired\n  3. Divide expenses by customers"',
    },
    "self-cons": {
      bestFor: "high-stakes · accuracy-critical work",
      tradeOff: "≈3× compute, far more reliable",
      example: '"Generate 3 approaches to cut costs 15%.\nFor each: steps, time, savings.\nThen identify which elements appear\nin all three approaches."',
    },
    "tot": {
      bestFor: "strategic decisions · option evaluation",
      tradeOff: "heavier reasoning, systematic",
      example: '"Expand to a new market — explore paths:\n  Path A: Singapore vs Thailand\n  Path B: Germany vs Netherlands\nRecommend the best path with justification."',
    },
    "rag": {
      bestFor: "questions about your data · recent events",
      tradeOff: "needs retrieval setup",
      example: '"From our company knowledge base:\nsearch all mentions of \'remote work policy\'.\nThen create an updated employee FAQ\nfor the top 5 questions on guidelines."',
    },
    "art": {
      bestFor: "multi-step workflows · different capabilities",
      tradeOff: "needs tool wiring",
      example: '"Prepare our quarterly financials:\n  1. Calculator → growth percentages\n  2. Web search → industry benchmarks\n  3. CRM → metrics + comparison charts"',
    },
    "react": {
      bestFor: "investigation · debugging · adaptive workflows",
      tradeOff: "agent loop — the heart of agents",
      example: '"Debug last month\'s churn spike:\n  Thought → check support tickets\n  Action → search Oct complaints\n  Observation → 45% billing issues"',
    },
  },
} as const;

export const e5Content = {
  headline: "A great prompt still has limits.",
  headlineKw: ["A great prompt", "limits"],
  bp: ["Be clear and concise", "Iterate and test", "Steer with detail", "Evaluate the output", "Set success metrics"],
  cm: ["Vague instructions", "Overcomplicated prompts", "Lack of context", "Ignoring AI limitations", "Failing to iterate"],
  wallSub: "Even a perfect prompt can't:",
  wallSubKw: ["can't"],
  constraints: [
    "Provide knowledge the model wasn't trained on",
    "Pull current or proprietary data",
    "Use tools, call APIs, or take actions",
    "Persist memory across sessions",
    "Verify its own output against reality",
    "Run autonomously on schedule or trigger",
  ],
  closing: "That's where the next layers begin.",
  closingKw: ["next layers"],
} as const;

export const e6Content = {
  headline: "Layer 2: Context — relevance.",
  headlineKw: ["Context"],
  sub: "What & Why",
  subKw: [],
  definition: "Context = filling the model's window with just the right information — for each step.",
  definitionKw: ["right information"],
  whyPoints: [
    { text: "AI without context is like hiring an expert with amnesia.", kw: ["amnesia"] },
    { text: "Context lets the model make business‑appropriate decisions.", kw: ["business‑appropriate"] },
    { text: "Reduces the need for detailed prompts every time.", kw: ["every time"] },
  ],
  reveal: "6 components — the full context the model can see.",
  revealKw: ["6 components"],
  satellites: [
    {
      id: "user-prompt", label: "User Prompt", icon: "MessageSquare",
      hover: {
        kicker: "Layer 1 · the prompt itself",
        body: "The instructions you just spent four slides on. Includes the output‑format spec.",
        tag: "One of six components — not the only one.",
        tagKw: ["not the only one"],
      },
    },
    {
      id: "conv-mem", label: "Conversation Memory", icon: "History",
      hover: {
        kicker: "Episodic memory · short‑term",
        body: "What was said earlier in this session — the running thread.",
        tag: "Resets when the session ends.",
        tagKw: ["Resets"],
      },
    },
    {
      id: "rag", label: "RAG Knowledge", icon: "BookOpen",
      hover: {
        kicker: "Retrieval‑Augmented Generation",
        body: "Documents pulled in for this specific question — search hits stitched into the window.",
        tag: "Just‑in‑time knowledge.",
        tagKw: ["Just‑in‑time"],
      },
    },
    {
      id: "tools", label: "Tools & APIs", icon: "Wrench",
      hover: {
        kicker: "Actions in the world",
        body: "Call a function, query a database, fetch live data — the model takes action, not just talks.",
        tag: "Reads and writes beyond text.",
        tagKw: ["Reads and writes"],
      },
    },
    {
      id: "persist", label: "Persistent Memory", icon: "Archive",
      hover: {
        kicker: "Semantic + episodic · long‑term",
        body: "What the model remembers across sessions — facts, preferences, history.",
        tag: "Last week's conversation informs this week's.",
        tagKw: ["Last week's"],
      },
    },
    {
      id: "system", label: "System Instructions", icon: "Shield",
      hover: {
        kicker: "Procedural memory · persistent rules",
        body: "Who the model is, what it can or can't do, the tone to use.",
        tag: "The unchanging guardrails.",
        tagKw: ["unchanging guardrails"],
      },
    },
  ],
  next: "Next: The How — 4 strategies for managing context.",
  nextKw: ["4 strategies"],
} as const;

export const e7Content = {
  headline: "Four strategies. Each one solves a context problem.",
  headlineKw: ["Each one solves a context problem"],
  footer: "When context grows, these four keep it useful.",
  footerKw: ["keep it useful"],
  rings: [
    { id: "write",    label: "WRITE",    sub: "Store data for future use",            list: ["Long-term memory", "Scratchpad", "Session state"], copper: "copper-700" },
    { id: "select",   label: "SELECT",   sub: "Choose data needed for the task",      list: ["Retrieve tools", "Retrieve scratchpad", "Retrieve memory", "Retrieve knowledge"], copper: "copper-600" },
    { id: "compress", label: "COMPRESS", sub: "Summarize past events efficiently",    list: ["Summarize", "Trim irrelevant tokens"], copper: "copper-500" },
    { id: "isolate",  label: "ISOLATE",  sub: "Separate tasks to avoid interference", list: ["Partition state", "Sandbox", "Multi-agent"], copper: "copper-400" },
  ],
} as const;

export const e8Content = {
  headline: "Context works. But you're orchestrating it every session.",
  headlineKw: ["you're orchestrating it"],
  pitfalls: [
    { id: "conflict",    icon: "GitMerge",     title: "CONTEXT CONFLICT",    essence: "Sources contradict → cognitive gridlock" },
    { id: "confusion",   icon: "Triangle",     title: "CONTEXT CONFUSION",   essence: "Tools + noise + cognitive overload" },
    { id: "poisoning",   icon: "Droplets",     title: "CONTEXT POISONING",   essence: "Wrong info spreads silently" },
    { id: "distraction", icon: "TrendingDown", title: "CONTEXT DISTRACTION", essence: "Token overload → the 'dumb zone'" },
  ],
  // Mirrors `E8.satellites = E6.satellites` from the design source — same six
  // components rendered without the rich `hover` payload inside this slide.
  satellites: e6Content.satellites,
  footer: "Each session, you fight all of this. There's a better way.",
  footerKw: ["you", "better way"],
} as const;

export const e9Content = {
  headline: "Layer 3: Harness — execution.",
  headlineKw: ["Harness"],
  sub: "What & Why",
  definition: "Harness = the software around the model — orchestration loops, tools, memory, context management, hooks, observability.",
  definitionKw: ["software around the model"],
  whyPoints: [
    { text: "The harness, not the model, is the load‑bearing component of production agents.", kw: ["load‑bearing component"] },
    { text: "Same model, better harness: 52.8% → 66.5% task completion (+13.7 pts).", kw: ["52.8% → 66.5%"] },
    { text: "Multi‑agent harness designs lift completion by +90.2% over single‑agent.", kw: ["+90.2%"] },
    { text: "It automates the six context mitigations — so you don't have to each session.", kw: ["six context mitigations"] },
  ],
  includesKicker: "What the harness automates · the six context mitigations",
  includes: [
    "Context Isolation",
    "Context Pruning",
    "Context Summarization",
    "Context Offloading",
    "Subagent Verification",
    "Persistent Memory",
  ],
  thesis: "Agent = Model + Harness",
  quote: "A decent model with a great harness beats a great model with a bad harness.",
  quoteKw: ["decent model with a great harness", "great model with a bad harness"],
  stanza: ["It picks what to load.", "It cleans up.", "It verifies its work.", "It remembers."],
  tagline: "Build once. Use forever.",
} as const;

export const e10Content = {
  headline: "What good harness teams do: eight practices.",
  headlineKw: ["eight practices"],
  practices: [
    {
      id: "orchestration", icon: "Network", name: "Orchestration",
      essence: "The agentic loop that makes the model act.",
      pattern: "ReAct: prompt → infer → tool → observe → loop",
      bullets: [
        "Synchronous within one context window",
        "Persists across sessions via checkpointing",
        "Ends when the model emits no more tool calls",
      ],
    },
    {
      id: "plugins", icon: "Package", name: "Plugins",
      essence: "Pluggable capability layered onto the harness.",
      pattern: "Skills · MCP · Subagents · Hooks",
      bullets: [
        "Skills load dynamically from SKILL.md folders",
        "MCP — a USB-C standard for tools & data",
        "Subagents handle scoped subtasks in parallel",
      ],
    },
    {
      id: "memory", icon: "Brain", name: "Memory",
      essence: "Self-learning state that survives the session.",
      pattern: "Spec · PROGRESS.md · AGENTS.md · Git",
      bullets: [
        "Filesystem is the persistent state — not chat",
        "Memory files injected into every prompt",
        "Git history carries intent across sessions",
      ],
    },
    {
      id: "observability", icon: "Activity", name: "Observability",
      essence: "Every decision auditable, every token counted.",
      pattern: "Log · trace · checkpoint",
      bullets: [
        "Tool calls, results, reasoning all logged",
        "Token metrics ≈ 80% of completion variance",
        "Required for debug, compliance, tuning",
      ],
    },
    {
      id: "triggers", icon: "Zap", name: "Triggers",
      essence: "Lifecycle hooks that fire at the right moment.",
      pattern: "Manual · Schedule · Event",
      bullets: [
        "Pre-tool, post-edit, pre-commit, context-full",
        "Auto-validate, format, test on transition",
        "Citadel ships 22 hooks across 14 events",
      ],
    },
    {
      id: "spec-driven", icon: "FileText", name: "Spec-driven",
      essence: "An immutable spec is the source of truth.",
      pattern: "Spec → code → verify → repeat",
      bullets: [
        "Detailed requirements with testable acceptance",
        "Verification = spec compliance, not vibes",
        "Foundation for Ralph loops and multi-day work",
      ],
    },
    {
      id: "hitl", icon: "Users", name: "HITL",
      essence: "A human approves at the right moments.",
      pattern: "NEVER · TERMINATE · ALWAYS",
      bullets: [
        "Gate dangerous commands and ambiguous calls",
        "Mid-run course correction on long tasks",
        "AutoGen's three-mode model of human input",
      ],
    },
    {
      id: "ralph", icon: "Repeat", name: "Ralph Wiggum",
      essence: "Autonomous loop persists until the spec is met.",
      pattern: "Spec → attempt → fail → re-diagnose → repeat",
      bullets: [
        "Errors feed back into the next prompt",
        "Crosses context boundaries via checkpoints",
        "Success criteria / goal defined (like Codex)",
      ],
    },
  ],
  footer: "Each one automates work you do by hand today.",
  footerKw: ["automates work you do by hand today"],
} as const;

export const e11Content = {
  beat1: { text: "Three layers. The fundamentals are built.", kw: ["Three layers", "fundamentals"] },
  beat2: { text: "Next: the techniques that matter most.", kw: ["techniques that matter most"] },
} as const;
