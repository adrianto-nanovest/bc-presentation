// Single source of truth for all Section E slide copy (E.1–E.12).
//
// Schema is ported verbatim from `claude-design-project/jsx/data.jsx` — the
// design source — with three differences:
//   1. `const E<N> = {...}` → `export const e<N>Content = {...} as const`
//   2. The window-globals attach is dropped (TS modules export instead).
//   3. The bridge's beat 2 is not a field but a PICK over the deck set, because
//      the two decks hand section E off to different sections — see `e13Beat2For`.
//
// Field names match the design source EXACTLY (e.g. `headlineKw`, `naivePrompt`,
// `properLabels`, `spine[].pop`, `whyPoints`, `satellites`, `rings[].sub`,
// `practices[].pattern`). Slide files in this directory will be re-ported in
// the matching tasks (T10–T20) to consume this new shape; until then, TS
// errors in those slide files are expected.
//
// Markup convention: data carries plain strings + a sibling `kw` / `*Kw` array
// of substrings to highlight at render time. No inline `<em>` tags in data.
//
// One string here varies with the DECK SET — the bridge's beat 2, see
// `e13Beat2For`. Type-only import, so this module still pulls in nothing
// at runtime and stays plain data.
import type { DeckSetId } from "@/deck-variants";

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
  /**
   * THE LOOP — step 3's focal card and the summary's fourth row.
   *
   * Same shape as a `layers` entry so one `FocalDetail` renders both, but it is
   * deliberately NOT in `layers`: the three layers are one run (space), the loop
   * is repetition of that run (time). `eyebrow` and `summaryMarker` are what keep
   * that distinction visible — the three read `Layer 1..3`, this one does not
   * take the number `4`. Swap those two strings to `"Layer 4"` if the deck later
   * decides the loop IS a fourth layer; nothing else has to move.
   *
   * `summaryMarker` sits in the rank column beside `Loop Engineering`, so it
   * must NOT be the word `Loop` again — it says where the loop sits, the way
   * `Layer 1` does. `Around` is the short form of the eyebrow above; `Outer`
   * and `Repeat` are the other two that fit the 64px column.
   */
  loop: {
    id: "loop", label: "LOOP", titleA: "Loop", titleB: "Engineering",
    essence: "the repetition", kw: ["repetition"],
    eyebrow: "Around all three",
    summaryMarker: "Around",
    summarySub: "How to make AI run again without you in every turn.",
    blurb: "What runs the stack again. A heartbeat starts it, a checker verifies it, and a spine carries state from one run into the next.",
    tags: ["Heartbeat", "Spine", "Verify", "Human Gate", "Autonomy"],
  },
  // Step 4 — the full stack, named. The three rings are one run; the outer ring
  // is the repetition around them. See spec §8.2.
  loopFooter: "Three layers make one run. The loop makes it repeat.",
  loopFooterKw: ["one run", "makes it repeat"],
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

// E5 — PROMPT · EXAMPLES (new slide; transcribed verbatim from
// docs/specs/2026-06-01-e5-prompt-examples-spec.md §"Data Model Summary").
export const e5Content = {
  figLabel: "LAYER 1 · EXAMPLES",
  headline: "The recipe, in real prompts.",
  headlineKw: ["real prompts"],
  footer: "Notice the pattern, not the wording. Every strong prompt is just these parts, assembled.",
  footerKw: ["pattern", "assembled"],

  useCases: [
    // --- 1. email ---
    {
      id: "email",
      icon: "Mail",
      title: "Draft an Email",
      subtitle: "Turn a rough idea into a polished message.",
      goal: "Turn a rough idea into a properly toned, ready-to-send email without starting from scratch.",
      segments: [
        { text: "You are a professional business writer.", structure: "role" },
        { text: "Draft a short email to a colleague asking to reschedule next Tuesday's check-in — I have a conflicting commitment that just came up.", structure: "instruction" },
        { text: "Keep it friendly and under 80 words.", structure: "output" },
      ],
      structures: ["role", "instruction", "output"],
      techniques: [
        { id: "zero-shot", label: "Zero-Shot", refs: [] },
      ],
    },

    // --- 2. summary ---
    {
      id: "summary",
      icon: "FileText",
      title: "Summarize a Report",
      subtitle: "Compress a long document into a short briefing.",
      goal: "Compress a lengthy report into a short, scannable briefing without reading every word yourself.",
      segments: [
        { text: "Summarize the following report", structure: "instruction" },
        { text: "into a 5-bullet executive briefing.", structure: "output" },
        { text: "The audience is senior management who have 2 minutes to read it, so lead with the most important finding and skip implementation detail.", structure: "context" },
        { text: "[Paste report text here]", structure: "input" },
      ],
      structures: ["instruction", "output", "context", "input"],
      techniques: [
        { id: "zero-shot", label: "Zero-Shot", refs: [] },
      ],
    },

    // --- 3. actions ---
    {
      id: "actions",
      icon: "ListChecks",
      title: "Meeting → Action Items",
      subtitle: "Turn messy notes into a clear task list.",
      goal: "Convert raw meeting notes into a clean, assigned action-item list without manually re-reading everything.",
      segments: [
        { text: "You are an efficient meeting coordinator.", structure: "role" },
        { text: "Read the notes below and extract every action item. For each item, list: the task, the person responsible, and the due date if mentioned.", structure: "instruction" },
        { text: "Format the result as a numbered list. If no owner or date is clear, write \"TBD.\"", structure: "output" },
        { text: "[Paste meeting notes here]", structure: "input" },
      ],
      structures: ["role", "instruction", "output", "input"],
      techniques: [
        { id: "zero-shot", label: "Zero-Shot", refs: [] },
      ],
    },

    // --- 4. compare ---
    {
      id: "compare",
      icon: "Scale",
      title: "Compare & Recommend",
      subtitle: "Weigh options side-by-side, then pick one.",
      goal: "Get a structured comparison of two or more options — and a final recommendation with clear reasoning — rather than a vague \"it depends.\"",
      segments: [
        { text: "I need to choose a tool for managing our team's weekly reporting: Option A is a shared spreadsheet, Option B is a project management app we already have a licence for.", structure: "input" },
        { text: "Think through this step by step: first compare them on ease of use, visibility for stakeholders, and maintenance effort.", structure: "instruction" },
        { text: "Then weigh those factors for a 12-person team where most members are not tech-savvy.", structure: "context" },
        { text: "End with a single clear recommendation and a one-sentence reason.", structure: "output" },
      ],
      structures: ["input", "instruction", "context", "output"],
      techniques: [
        { id: "cot", label: "Chain-of-Thought", refs: ["instruction"] },
      ],
    },

    // --- 5. timeline ---
    {
      id: "timeline",
      icon: "Calendar",
      title: "Plan a Project Timeline",
      subtitle: "Break a goal into phases with dates.",
      goal: "Break a high-level goal into a realistic, phased schedule with named milestones and target dates.",
      segments: [
        { text: "You are an experienced project planner.", structure: "role" },
        { text: "I need a four-phase rollout plan for launching a new internal reporting process across a department of 60 people, starting 1 July.", structure: "context" },
        { text: "Work through each phase in order: define the goal of the phase, who is involved, and the target completion date.", structure: "instruction" },
        { text: "Write each phase in this format — Phase 1 — [Name]: [Goal]. Team: [who]. Done by: [date].", structure: "examples" },
        { text: "Present the result as a short numbered list, one phase per line.", structure: "output" },
      ],
      structures: ["role", "context", "instruction", "examples", "output"],
      techniques: [
        { id: "cot",      label: "Chain-of-Thought", refs: ["instruction"] },
        { id: "few-shot", label: "Few-Shot",          refs: ["examples"] },
      ],
    },

    // --- 6. rewrite ---
    {
      id: "rewrite",
      icon: "Users",
      title: "Rewrite for an Audience",
      subtitle: "Make technical text plain for non-experts.",
      goal: "Transform jargon-heavy text into plain language that any non-specialist can understand and act on.",
      segments: [
        { text: "You are a plain-language editor.", structure: "role" },
        { text: "Rewrite the paragraph below so that anyone unfamiliar with technical terms can understand it.", structure: "instruction" },
        {
          text: "Match the style of this example:\nBefore: \"The system will undergo scheduled maintenance to apply critical security patches and upgrade legacy middleware dependencies.\"\nAfter: \"We will briefly take the system offline to fix security issues and update some older software components.\"",
          structure: "examples"
        },
        { text: "Keep the same meaning, use short sentences, and avoid any technical terms.", structure: "output" },
        { text: "[Paste the paragraph to rewrite here]", structure: "input" },
      ],
      structures: ["role", "instruction", "examples", "output", "input"],
      techniques: [
        { id: "few-shot", label: "Few-Shot", refs: ["examples"] },
      ],
    },
  ],
} as const;

export const e6Content = {
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

export const e7Content = {
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

export const e8Content = {
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

export const e9Content = {
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
  satellites: e7Content.satellites,
  footer: "Each session, you fight all of this. There's a better way.",
  footerKw: ["you", "better way"],
} as const;

export const e10Content = {
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
  includesKicker: "Six context mitigations · the harness automates",
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

export const e11Content = {
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
    // The RUN-UNTIL-DONE card (§8.2). This card is `/goal` — turn-driven, and
    // it stops when a check passes. E.12 is `/loop` + Routines, which is
    // interval-driven: run-again-and-again. The two essences do the separating;
    // NEITHER slide cross-references the other.
    {
      id: "ralph", icon: "Repeat", name: "Ralph Wiggum",
      essence: "You start one job; it retries until a check passes.",
      pattern: "Spec → attempt → check → fix → until done",
      bullets: [
        "Errors feed back — it re-diagnoses and retries",
        "Runs past one context window via checkpoints",
        "Success criteria / goal defined as the check — /goal on Claude Code & Codex CLI",
      ],
    },
  ],
  footer: "Eight parts. Now — what runs them, without you.",
  footerKw: ["what runs them, without you"],
} as const;

/**
 * E.12 — LOOP ENGINEERING. Spec §8.3, as amended by the owner corrections on
 * gh#48 (pose 0) and gh#49 (poses 1 and 2). All three poses' copy is here.
 *
 * SOURCED FROM `prototype-gh19b-e12-loop-engineering/content.ts`, with the copy
 * changes the owner made on 2026-08-04 (see the slide file's header):
 *   1. the left verdict body is ONE LINE, so both panels' verdict dividers land
 *      at the same y
 *   2. Steinberger goes left and gains his affiliation; Cherny goes right,
 *      shortened to one line
 *   3–4. layout and hover, which are the slide file's business, not this one's.
 *   gh#49 · 2. EVERY PANEL'S ITALIC KICKER IS DELETED. The prototype gave each
 *      right-canvas panel a subtitle line under its title ("Two loops, one name:
 *      …" and its four siblings); all five are gone, title then illustration, so
 *      the strings are absent here rather than unused.
 *   gh#49 · 8. The recap is `thesis`, ONE line in E.11's footer style — not the
 *      prototype's display-weight three-liner, which is why `footnote` is gone.
 *   2026-08-04 · EVERY FOOT LINE IS DELETED TOO. Each right-canvas panel closed on
 *      one italic sentence on a ruled row, and pose 2 closed on `closer`; all five
 *      are gone, along with pose 1's `returnArc` label. Same treatment as the
 *      kickers above — the strings are ABSENT here, not left unused, so nothing
 *      in this file describes something the slide no longer draws.
 *
 * KEYWORDS, per §8.3: prose carries a `*Kw` sibling, mono never does. Every
 * string below is in exactly one of four groups, and
 * `tests/unit/e12-loop-engineering.test.tsx` asserts that the four ACCOUNT FOR ALL
 * OF THEM — so a bare string is a decision recorded here and not a gap:
 *
 *   MONO         every title, rail and panel; the heartbeat and tool strips, the
 *                source strip, station and rung names, run names, file names,
 *                axis labels, badges, gate labels, `THE VERDICT?`, both fork
 *                labels, `read` / `write`, the row numbers, the bridge words and
 *                both attributions. Labels, never sentences, so §8.3 forbids
 *                keywords on them.
 *   HIGHLIGHTED  every serif SENTENCE — the headline, both verdict reasons, the
 *                gate's line, both quotes, the guardrail, the thesis, every rail
 *                and kind description, every analogy and every flow node. 1–3
 *                keywords each.
 *   MICRO-LABEL  the four turns, `round and round`, station and spine subtitles,
 *                `risky` / `approved` / `pass`, the stop conditions, the run
 *                steps, the gate widths and their descriptions, `also called
 *                run-until-done`, the two diary roles. Serif, but two to five
 *                words: a "keyword inside" one of these would be the whole string,
 *                which highlights nothing. The 1–3-per-chunk rule needs a chunk.
 *   VERDICT CLAIM the two `verdictTitle`s. A verdict is ONE chunk of prose set on
 *                two lines — the claim at display weight, the reason beneath it —
 *                and the chunk's keywords land in the reason. This is the
 *                distribution the approved prototype shipped.
 */
export const e12Content = {
  // The mindset shift IS the headline — Cherny's and Steinberger's shared verb.
  headline: "Stop writing prompts. Start writing loops.",
  headlineKw: ["writing loops"],

  // ─────────────── pose 0 — the mindset shift, as a diptych ───────────────
  mindset: {
    left: {
      title: "PROMPTING — TURN BY TURN",
      // Four turns on an endless relay. `who` drives the icon only, so it is a
      // marker and not copy.
      rows: [
        { who: "you", text: "you type a prompt" },
        { who: "agent", text: "the agent replies" },
        { who: "you", text: "you read the reply" },
        { who: "you", text: "you type a prompt again" },
      ],
      /**
       * THE RETURN ARC'S LABEL. Was `you, again` until 2026-08-04, when the arc
       * moved to land on ROW 02 — so a label naming YOU sat pointing at the box
       * where the AGENT replies. This names the repetition instead, which is what
       * the arc now draws, and the panel's own `you`s (three of the four rows, and
       * the verdict's "all you") already carry the person.
       *
       * NOT `loop`, and not any word from it: `loop` is the RIGHT panel's word and
       * the headline's payoff, and lending it to the treadmill would spend it
       * before the diptych's contrast lands.
       */
      returnLabel: "round and round",
      verdictTitle: "You are holding the tool the whole time.",
      // ONE LINE (owner correction 1). The meaning held from the prototype's
      // two-line body: you are the heartbeat, the checker and the memory, and
      // the work stops when you stop.
      verdict: "Heartbeat, checker, memory — all you. Stop, and the work stops.",
      verdictKw: ["the work stops"],
    },
    bridge: ["THE", "LEVERAGE", "MOVES"],
    right: {
      title: "LOOPING — A SYSTEM YOU DESIGN ONCE",
      heartbeat: "HEARTBEAT — A SCHEDULE OR AN EVENT",
      stations: [
        { label: "DISCOVER", sub: "find the work" },
        { label: "IMPLEMENT", sub: "the maker" },
        { label: "VERIFY", sub: "the checker — a second agent" },
        { label: "COMMIT", sub: "opens the PR" },
      ],
      spine: { label: "SPINE", file: "progress.md", sub: "read first, written last" },
      gate: {
        label: "YOU — THE HUMAN GATE",
        sub: "only the risky calls come to you. You do not type each turn.",
        subKw: ["only the risky calls"],
      },
      risky: "risky",
      approved: "approved",
      pass: "pass",
      verdictTitle: "The loop holds the steps in the middle.",
      verdict: "You keep intent and accountability.",
      verdictKw: ["intent", "accountability"],
    },
    /**
     * The two practitioners who renamed the job — index 0 sits under the LEFT
     * panel, index 1 under the right (owner correction 2, which swapped them).
     *
     * §12.1 CALL 5, CLOSED 2026-08-04 (gh#50): BOTH LINES ARE NOW VERBATIM, and
     * the source they are verbatim from is named here.
     *
     * The wording is checked against Addy Osmani's originating essay
     * *Loop Engineering* (addyosmani.com/blog/loop-engineering/, 2026-06-07) —
     * the piece that named the practice by quoting these two people, and the
     * attribution source `docs/researches/2026-07-31-loop-engineering.md`
     * already cites. It prints:
     *   Steinberger — "You shouldn't be prompting coding agents anymore. You
     *                  should be designing loops that prompt your agents."
     *   Cherny      — "I don't prompt Claude anymore. I have loops running that
     *                  prompt Claude and figuring out what to do. My job is to
     *                  write loops"
     * Steinberger's line below is his second sentence, unedited. Cherny's is his
     * first and last sentence with the middle one elided, and the ELLIPSIS IS
     * THE POINT: the earlier paraphrase sat inside quotation marks, which reads
     * as verbatim to a room. `My` keeps its capital across the elision, because
     * lower-casing it would be an edit inside a quotation. One line is still what
     * correction 2 asks for.
     *
     * WHAT IS AND IS NOT VERIFIED, stated plainly because the slide names two
     * people. Osmani's essay is the SOURCE OF RECORD for both wordings, and it is
     * a named, dated, published source — which the previous Cherny sentence was
     * not. It is not the PRIMARY for Cherny: he spoke the line at Sequoia AI
     * Ascent in May 2026 (`docs/researches/2026-07-31-loop-engineering.md:181`),
     * that recording was NOT re-watched, and other outlets transcribe the middle
     * sentence differently. That is exactly why the middle sentence is the elided
     * one and why the two that ship are the two Osmani prints.
     *
     * The sentence marked *not verified* in
     * `docs/researches/topic-loop-engineering-x-articles.md` is that file's own
     * secondary retelling ("I do not prompt Claude anymore. I have loops running
     * that prompt Claude and figure out what to do."). It is not what ships.
     *
     * ATTRIBUTIONS, both checked because a named person plus a named company is
     * a factual claim on a slide:
     *   · Steinberger — **CREATOR**, not "founder", of OpenClaw. He wrote it
     *     (`docs/researches/2026-05-11-section-g-tooling-gaps.md`), and the
     *     press that reported his February 2026 move to OpenAI calls him its
     *     creator; stewardship went to a foundation, so "founder of" is both
     *     the weaker word and the one that ages worse.
     *   · Cherny — creator of Claude Code, and still its head at Anthropic.
     *     Osmani's essay describes him as head of Claude Code; his own public
     *     profile and the June 2026 press say creator. Both hold; the chip
     *     names the one the audience can place.
     */
    quotes: [
      {
        text: "You should be designing loops that prompt your agents.",
        kw: ["designing loops"],
        attr: "PETER STEINBERGER · CREATOR OF OPENCLAW",
      },
      {
        text: "I don't prompt Claude anymore … My job is to write loops.",
        kw: ["write loops"],
        attr: "BORIS CHERNY · CREATOR OF CLAUDE CODE",
      },
    ],
  },

  // ─────────────── poses 1–2 — the rail that carries both ───────────────
  // The rail is the anatomy of the big loop; pose 1 magnifies a part, pose 2
  // shows the same four parts wearing a name badge in one real loop. The hint
  // tooltip is NOT copy here on purpose: `HintIcon`'s deck-wide default already
  // says "hover for details, click to pin/unpin", the same affordance E.9 and
  // G.7 teach, and a second wording of one gesture is a second thing to keep true.
  railHeading: "THE BIG LOOP · FOUR PARTS",
  /**
   * NO RETURN-ARC LABEL. gh#49 correction 8 dropped it from pose 2; the owner
   * dropped it from pose 1 too on 2026-08-04, so the string is GONE rather than
   * unused — the dashed arc from SPINE back up to HEARTBEAT is the whole
   * statement, and `triage.ret` says it in the example's own words on pose 2.
   */

  /**
   * §12.1 CALL 1, CLOSED 2026-08-04 (gh#50) — THE `BUDGET` GUARDRAIL, and where
   * it went.
   *
   * DECISION: a foot line on E.12, under the rail, on POSES 1 AND 2. Not moved
   * to E.11, and not dropped.
   *
   * The old #10 brief carried five decision rows — `TRIGGER · MEMORY ·
   * CONDITION · BUDGET · GATE` — and the shipping form re-teaches four of them
   * as the four parts. `BUDGET` was the one with no successor: the closest thing
   * left is the triage example's *"at most 5 items"*, which is a cap DEMONSTRATED
   * and never NAMED. §12.1 calls it the slide's one risk row, in front of a room
   * that will go and build these, and forbids letting it vanish by omission.
   *
   * WHY THE RAIL AND NOT E.11. E.11 is eight practices at three bullets each,
   * all full; a ninth line there would land on a slide about what harness teams
   * do, two slides before the room is shown a loop that runs while they sleep.
   * The risk belongs beside the thing that carries it.
   *
   * WHY BOTH POSES AND NOT JUST POSE 1. `canonicalPose` is 2, and
   * `scripts/export-pdf.mjs` / `export-pptx.mjs` print exactly the canonical
   * pose — so a guardrail that lived only on pose 1 would be absent from every
   * PDF and every deck anyone takes away. That is the same omission by a
   * quieter route.
   *
   * WHY NO VENDOR NUMBER. §12.1 backs the row with "Claude Code's 7-day expiry
   * on recurring tasks". That number is in no research file in this repo, and
   * §12.2 is explicit that vendor terms are the highest-consequence place in the
   * deck to be wrong. The three caps below are true of any loop and need no
   * vendor's current policy to stay true.
   */
  guardrail: {
    label: "THE GUARDRAIL",
    text: "Cap what runs unattended — items per beat, spend, and an end date. A loop with no cap is a bill with no cap.",
    textKw: ["Cap what runs unattended", "a bill with no cap"],
  },

  parts: [
    {
      id: "heartbeat",
      num: "01",
      title: "HEARTBEAT",
      desc: "a schedule or an event starts a beat",
      descKw: ["starts a beat"],
    },
    {
      id: "beat",
      num: "02",
      title: "ONE BEAT",
      desc: "one full, self-contained run of the work",
      descKw: ["self-contained"],
    },
    {
      id: "checker",
      num: "03",
      title: "CHECKER",
      desc: "a separate agent grades the result",
      descKw: ["separate"],
    },
    {
      id: "spine",
      num: "04",
      title: "SPINE",
      desc: "progress.md — the memory between runs",
      descKw: ["memory between runs"],
    },
  ],

  /**
   * Pose 2's recap — ONE line, in E.11's footer style (gh#49 correction 8):
   * serif italic 13.5px on `--neutral-400`, not the prototype's 23.5px
   * display-weight three-liner. The three verbs are the three parts the loop
   * runs for you; the two nouns are what it cannot.
   */
  thesis:
    "Design the loop once — it starts, checks and remembers the work. You keep intent and accountability.",
  thesisKw: ["starts, checks and remembers", "intent and accountability"],

  // ─────────────── pose 1 — the four right-canvas panels ───────────────
  // NO KICKERS (gh#49 correction 2): title, then the illustration. The `NN ·`
  // prefix on each title is load-bearing since correction 3 deleted the leader
  // line — the number is now the only tie between the rail card and its panel.
  panels: {
    heartbeat: {
      title: "01 · THE FOUR HEARTBEATS",
      kinds: [
        {
          num: "1",
          name: "IN-SESSION",
          alt: "",
          desc: "repeats on a timer while you watch",
          descKw: ["while you watch"],
          stop: "stops when the session closes",
          tools: ["Claude Code · /loop"],
          analogy: "a kitchen timer: it only rings while you are in the kitchen",
          analogyKw: ["in the kitchen"],
        },
        {
          num: "2",
          name: "CONDITIONAL",
          alt: "also called run-until-done",
          desc: "repeats until a checked condition is true",
          descKw: ["a checked condition"],
          stop: "stops when the check passes",
          tools: ["Claude Code · /goal", "Codex · exec + tests"],
          /**
           * §12.1 CALL 2, CLOSED 2026-08-04 (gh#50) — the ONE line that stops
           * `/goal` being taught twice without acknowledgement.
           *
           * §8.2 splits the two slides as *"the Ralph card is `/goal`; E.12 is
           * `/loop` + Routines"*, and then the shipping form teaches `/goal`
           * here, as kind 2. The split is still right — run-until-done versus
           * run-again-and-again — so the fix is the cheap one §12.1 recommends:
           * kind 2 says out loud that the room has met this heartbeat already.
           * The alternative was re-cutting E.11's Ralph card a second time.
           *
           * IT NAMES THE CARD, NOT A NUMBER. "E.11" is derived per deck set
           * (§3) and the leader deck reorders sections, so a letter in copy is a
           * line that goes wrong silently on one of five decks. `Ralph Wiggum`
           * is the card's own name and moves with it.
           */
          callback: "Ralph Wiggum, from the harness",
          /** §8.3 wants a keyword on every PROSE string, and this row is prose —
           *  so the card's own name is the keyword. It is also the emphasis the
           *  line wants: the room is being pointed at a card, not at a sentence. */
          callbackKw: ["Ralph Wiggum"],
          analogy: "keep cooking until the taster says it is ready",
          analogyKw: ["until the taster"],
        },
        {
          num: "3",
          name: "SCHEDULED",
          alt: "",
          desc: "runs on a clock, even with the laptop closed",
          descKw: ["laptop closed"],
          stop: "stops when the schedule ends",
          tools: ["Claude Code · Routines", "ChatGPT · Tasks / cron"],
          analogy: "an alarm clock: it rings whether or not you are home",
          analogyKw: ["whether or not you are home"],
        },
        {
          num: "4",
          name: "EVENT-DRIVEN",
          alt: "",
          desc: "reacts the moment something happens",
          descKw: ["the moment"],
          stop: "stops when the event ends",
          /**
           * `GitHub` DROPPED FROM THE CLAUDE LINE (§12.1 call 3, gh#50). At the
           * mono floor this strip ran 16px past its card's padding — and §12.1
           * settles that trade in advance: *"an unreadable strip is worse than a
           * shorter one."* The example survives on the line below it, where
           * `@codex on a PR` IS the GitHub event; the two lines still name two
           * vendors and two kinds of trigger.
           */
          tools: ["Claude Code · Channels", "Codex · @codex on a PR"],
          analogy: "a doorbell: nothing happens until someone presses it",
          analogyKw: ["until someone presses it"],
        },
      ],
      axis: { left: "YOU HOLD IT", mid: "more and more unattended", right: "IT RUNS WITHOUT YOU" },
    },

    beat: {
      title: "02 · INSIDE ONE BEAT — THE AGENT RUNTIME",
      stations: [
        { num: "1", name: "BUILD THE CONTEXT", sub: "prompt + files + results" },
        { num: "2", name: "THE MODEL DECIDES", sub: "answer, or ask for tools" },
        { num: "3", name: "RUN THE TOOLS", sub: "do what the model asked" },
        { num: "4", name: "ADD THE RESULTS", sub: "outputs go into the context" },
      ],
      center: "repeat while the model keeps asking for tools",
      centerKw: ["keeps asking"],
      exitTitle: "the model stops asking — the beat ends",
      exitTitleKw: ["the beat ends"],
      exitSub: "back to the big loop: the checker, then the spine",
      exitSubKw: ["the checker, then the spine"],
    },

    checker: {
      title: "03 · THE CHECKER LADDER",
      axisL: "STRONGEST CHECKER",
      axisR: "WEAKEST",
      rungs: [
        {
          num: "1",
          name: "A PASSING TEST",
          desc: "Code. The test runner and the linter decide — a command cannot convince itself the work is fine.",
          descKw: ["cannot convince itself"],
          badge: "proof",
          claim: false,
          gate: "narrow",
          gateDesc: "spot-checks",
          gateWidth: 0.38,
        },
        {
          num: "2",
          name: "MECHANICAL CHECKS",
          desc: "Prose. Broken links, missing figures, banned words. Commands prove the mechanical part, and only that part.",
          descKw: ["only that part"],
          badge: "partial proof",
          claim: false,
          gate: "wider",
          gateDesc: "you judge the content",
          gateWidth: 0.68,
        },
        {
          num: "3",
          name: "A RUBRIC WITH A BAR",
          desc: "A reviewer agent grades the draft: “do not stop below 95.” The loop can act on the score — but a model's score is still an opinion.",
          descKw: ["still an opinion"],
          badge: "a claim, not a proof",
          claim: true,
          gate: "widest",
          gateDesc: "a person reads it",
          gateWidth: 1,
        },
      ],
      gateLabel: "THE HUMAN GATE",
    },

    spine: {
      title: "04 · THE SPINE — MEMORY BETWEEN RUNS",
      runs: [
        {
          name: "RUN 1 — MONDAY, 9:00",
          steps: ["read the spine first", "do the work", "update the spine last"],
        },
        {
          name: "RUN 2 — TUESDAY, 9:00",
          steps: ["read the spine first", "the work, building on Monday's", "update the spine last"],
        },
      ],
      wipe: "the session ends — the model's memory is wiped",
      wipeKw: ["memory is wiped"],
      lesson: "a repeated mistake? the lesson goes to the front of the diary",
      lessonKw: ["the front of the diary"],
      repoTitle: "THE REPO — CONTINUOUS ACROSS EVERY RUN",
      files: [
        {
          name: "CLAUDE.md / AGENTS.md",
          role: "the front of the diary",
          desc: "durable lessons and habits — read at the start of every run",
          descKw: ["every run"],
        },
        {
          name: "progress.md",
          role: "the back of the diary",
          desc: "what was tried, what passed, what is open — updated at the end",
          descKw: ["what is open"],
        },
      ],
      read: "read",
      write: "write",
    },
  },

  // ─────────────── pose 2 — the worked example ───────────────
  triage: {
    title: "THE MORNING-TRIAGE LOOP — ONE BEAT",
    hb: "THE HEARTBEAT · EVERY WEEKDAY AT 9:00",
    nodes: {
      read: { num: "1", text: "Read progress.md — the spine", kw: ["the spine"] },
      find: {
        num: "2",
        text: "Find the work (at most 5 items)",
        kw: ["at most 5"],
        // A `·`-joined SOURCE STRIP, mono like the heartbeat panel's tool strips
        // (§8.3): three examples, not a sentence, so it carries no keywords.
        sources: "CI FAILURES · OPEN ISSUES · AUDIT ADVISORIES",
      },
      draft: { num: "3", text: "Draft a fix in its own worktree — the maker", kw: ["the maker"] },
      review: { num: "4", text: "A separate reviewer grades it — the checker", kw: ["the checker"] },
      verdict: "THE VERDICT?",
      failLabel: "FAIL, OR RISKY",
      fail: {
        num: "5b",
        text: "Write it to “needs a human”",
        kw: ["needs a human"],
        sub: "no PR — a person decides later",
        subKw: ["a person decides"],
      },
      passLabel: "PASS, AND LOW RISK",
      pass: {
        num: "5a",
        text: "Open a pull request",
        kw: ["pull request"],
        sub: "a human reviews it there — the gate",
        subKw: ["the gate"],
      },
      update: { num: "6", text: "Update progress.md — tomorrow reads it", kw: ["tomorrow reads it"] },
    },
    ret: "the next candidate — and again tomorrow at 9:00",
    retKw: ["again tomorrow"],
  },

  /**
   * WHICH FLOW STAGES EACH RAIL PART OWNS (§8.3, pose 2). The rail is the
   * anatomy; the flow is the anatomy wearing a name badge, and hovering a part
   * lights exactly its stages and demotes the rest by colour tier.
   *
   * Keys are `parts[].id`, values are `triage.nodes` keys plus the two drawn
   * stages `hb` and `ret` — machine ids on both sides, which is why this table
   * holds no copy and is skipped by the copy audit.
   */
  lights: {
    heartbeat: ["hb", "ret"],
    beat: ["find", "draft"],
    checker: ["review", "verdict", "fail", "pass"],
    spine: ["read", "update"],
  },
} as const;

/** A rail part, and the four ids the panels and the light table are keyed to. */
export type E12Part = (typeof e12Content.parts)[number];
export type E12PartId = E12Part["id"];

/**
 * Every stage pose 2 draws, DERIVED from the light table rather than written
 * twice. A stage that no rail part owns cannot exist in this type, so a typo in
 * `litOf("verdcit", …)` is a compile error and not a stage that silently never
 * lights.
 */
export type E12StageId = (typeof e12Content.lights)[E12PartId][number];

/** One reveal: the string, plus the substrings rendered as keywords. */
export interface E13Beat {
  text: string;
  kw: readonly string[];
}

/**
 * The BRIDGE's beat 2 — the ONE string in section E that depends on the deck set.
 *
 * TRAP 3 (Appendix B) — this pick belongs to the bridge, `e13-bridge-to-f`. #8
 * wrote it against "E.12" when E.12 still meant the bridge; E.12 is now THE LOOP,
 * which never gets this pick. Named for the slide, not for a number.
 *
 * Beat 2 hands section E off by name, and the two decks hand off to different
 * sections: the standard deck runs F · TECHNIQUES next, and the leader deck cuts
 * F entirely (§4.3, gh#41), so there its next section is TOOLS ECOSYSTEM. The
 * leader line is F.9's own — `f9Content.beat2` in
 * `../foundation-techniques-section-f/content.tsx` — because F.9 is the bridge
 * into TOOLS that the leader deck no longer runs.
 *
 * A `Record<DeckSetId, …>` and not a `standard | leader` guess: a third deck set
 * fails to compile HERE, where the missing line would otherwise be an
 * `undefined` beat on a projector. Copy, never composition — `sectionOverrides`
 * stays composition-only (§4.1), so this does not live in the deck-set table.
 */
const E13_BEAT2_BY_DECK_SET: Record<DeckSetId, E13Beat> = {
  standard: { text: "Next: the techniques that matter most.", kw: ["techniques that matter most"] },
  leader: { text: "Next: the platforms that bring them to life.", kw: ["platforms", "life"] },
};

/** The beat 2 a deck set prints. THE RESOLVER LIVES HERE, in the content module,
 *  and the slide asks it — the same shape `titleContentFor` uses for the
 *  deck-set-scoped cover copy (gh#42). The table stays private so the pick is the
 *  only way in, and a caller cannot reach past it into the wrong deck set. */
export function e13Beat2For(deckSet: DeckSetId): E13Beat {
  return E13_BEAT2_BY_DECK_SET[deckSet];
}

export const e13Content = {
  beat1: {
    lineA: { text: "Three layers. One loop.", kw: ["layers", "loop"] },
    lineB: { text: "The fundamentals are built.", kw: ["fundamentals"] },
  },
  /** Beat 2 is NOT here: it depends on the deck set, so it is resolved by
   *  `e13Beat2For` and this object holds only what every deck prints alike. */
} as const;
