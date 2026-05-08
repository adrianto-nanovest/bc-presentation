// Single source of truth for all Section E slide copy. Plan A populates
// e1Content..e5Content; Plan B will append e6Content..e11Content.

import type { ReactNode } from "react";

export const e1Content = {
  headline: "Three layers. Each one contains the last.",
  headlineKeywords: ["Each one contains the last"] as const,
  layers: [
    { layer: "prompt" as const, label: "PROMPT", essence: "the instructions", essenceKeywords: ["instructions"] as const },
    { layer: "context" as const, label: "CONTEXT", essence: "the information", essenceKeywords: ["information"] as const },
    { layer: "harness" as const, label: "HARNESS", essence: "the system", essenceKeywords: ["system"] as const },
  ],
  quote: "A decent model with a great harness beats a great model with a bad harness. — Anthropic",
  quoteKeywords: ["A decent model with a great harness beats a great model with a bad harness"] as const,
};

export const e2Content = {
  headline: "Layer 1: Prompt — clarity.",
  headlineKeywords: ["Prompt"] as const,
  definition: "The instructions you give the model.",
  definitionKeywords: ["instructions"] as const,
  outcomes: [
    { text: "Vague in → vague out.", keywords: ["Vague in"] as const },
    { text: "Structured in → structured out.", keywords: ["Structured in"] as const },
    {
      text: "Show what good looks like → fewer iterations, more useful results.",
      keywords: ["Show what good looks like"] as const,
    },
  ],
  bridge: "Next: the canonical structure behind every good prompt.",
  bridgeKeywords: ["canonical structure"] as const,
  naivePrompt: "Write me this week's project report.",
  naiveResult: [
    "This week, the team made progress on several initiatives.",
    "Various items were completed and others are ongoing.",
    "Next week we plan to continue the work in flight.",
    "Please reach out with any questions.",
  ].join("\n"),
  properPrompt: [
    "Role: You are a project lead preparing the Friday status report.",
    "Task: Draft a concise weekly status — (1) what shipped, (2) what's at risk,",
    "      (3) what's planned for next week.",
    "Context: For the EOD Friday team standup. Audience: 8 cross-functional",
    "         stakeholders. Last week we missed a milestone on Module B.",
    "Examples: See last week's report (attached) — match structure, tone,",
    "          and focus areas.",
    "Output: Markdown, H2 sections, ~250 words. Lead with the at-risk item.",
  ].join("\n"),
  properElementLabels: ["Role:", "Task:", "Context:", "Examples:", "Output:"] as const,
  properResult: [
    "## At Risk: Module B",
    "Migration is 1 sprint behind plan; root cause is the upstream schema change.",
    "## Shipped",
    "- Onboarding revamp · 12% activation lift in test cohort",
    "- Checkout refactor merged behind flag",
    "## Next Week",
    "- Cut Module B remediation branch",
    "- Roll checkout flag to 25%",
  ].join("\n"),
};

export const e3Content = {
  headline: "One skeleton. Many names.",
  headlineKeywords: ["One skeleton"] as const,
  footerCaption: "Different mnemonics. Same six ingredients.",
  footerCaptionKeywords: ["Same six ingredients"] as const,
  spine: [
    {
      id: "role",
      num: 1 as const,
      name: "Role",
      essence: "Who AI should be",
      popoverLines: [
        "Define who the AI should be.",
        '"You are ... with N years exp specialized in ..."',
        "Examples: project lead, ops analyst, geology reviewer.",
      ],
    },
    {
      id: "instruction",
      num: 2 as const,
      name: "Instruction",
      essence: "Action to perform + how",
      popoverLines: [
        "Clear action + constraints.",
        '"Analyze ..." · "Please exclude ..." · "Ultrathink on ..."',
        "Also covers: style, tone, process detail, control.",
      ],
    },
    {
      id: "output",
      num: 3 as const,
      name: "Output Format",
      essence: "Shape of the result",
      popoverLines: [
        "Specify how the response is structured.",
        "Formats: Markdown · Tables · YAML · JSON · CSV · PDF.",
      ],
    },
    {
      id: "context",
      num: 4 as const,
      name: "Context",
      essence: "Background + audience",
      popoverLines: [
        "Essential additional information.",
        "Categories: Background · Objectives · Goal · Audience · Constraints.",
      ],
    },
    {
      id: "examples",
      num: 5 as const,
      name: "Examples",
      essence: "Show good output",
      popoverLines: [
        "Show what good output looks like.",
        "Forms: Attached example docs · sample input/output pairs.",
      ],
    },
    {
      id: "input",
      num: 6 as const,
      name: "Input",
      essence: "Specific data",
      popoverLines: [
        "The specific data to work with.",
        "Forms: Attached file · specific request.",
        "Note: User prompt; if instructions are generic → system prompt.",
      ],
    },
  ],
  frameworks: [
    { id: "race", acronym: "RACE", breakdown: "Role · Action · Context · Explanation", spineHits: [1, 2, 4] as const },
    { id: "care", acronym: "CARE", breakdown: "Context · Action · Result · Example", spineHits: [4, 2, 3, 5] as const },
    { id: "ape", acronym: "APE", breakdown: "Action · Purpose · Execution", spineHits: [2] as const },
    { id: "roses", acronym: "ROSES", breakdown: "Role · Objective · Scenario · Expected output · Solution", spineHits: [1, 2, 4, 3, 2] as const },
    { id: "create", acronym: "CREATE", breakdown: "Character · Request · Examples · Adjustments · Type · Extras", spineHits: [1, 2, 5, 3, 4] as const },
    { id: "coast", acronym: "COAST", breakdown: "Context · Objective · Actions · Scenario · Task", spineHits: [4, 2, 2, 4, 2] as const },
    { id: "tag", acronym: "TAG", breakdown: "Task · Action · Goal", spineHits: [2, 2, 2] as const },
    { id: "pain", acronym: "PAIN", breakdown: "Problem · Action · Information · Next steps", spineHits: [4, 2, 6, 2] as const },
    { id: "rise", acronym: "RISE", breakdown: "Role · Input · Steps · Execution", spineHits: [1, 6, 2, 2] as const },
    { id: "creo", acronym: "CREO", breakdown: "Context · Request · Explanation · Outcome", spineHits: [4, 2, 3, 2] as const },
  ],
};

export const e6Content = {
  headline: "Layer 2: Context — relevance.",
  headlineKeywords: ["Context"] as const,
  subHeadline: "6 components — the full context the model can see.",
  subHeadlineKeywords: ["6 components"] as const,
  definition: "Context = filling the model's window with just the right information — for each step.",
  definitionKeywords: ["right information"] as const,
  analogy: "Like hiring an expert with amnesia — capable, but useless without context.",
  analogyKeywords: ["amnesia"] as const,
  satellites: [
    {
      id: "user-prompt",
      label: "User Prompt",
      icon: "MessageSquare" as const,
      popoverLines: [
        "The instructions you just spent four slides on.",
        "Includes the output format spec — that lives inside the prompt itself.",
        "One of six components — not the only one.",
      ],
    },
    {
      id: "conv-mem",
      label: "Conversation Memory",
      icon: "History" as const,
      popoverLines: [
        "Short-term — what was said earlier in this session.",
        "Episodic memory. Resets when session ends.",
      ],
    },
    {
      id: "rag",
      label: "RAG Knowledge Base",
      icon: "BookOpen" as const,
      popoverLines: [
        "Retrieved documents pulled in for this specific question.",
        "Retrieval-Augmented Generation.",
      ],
    },
    {
      id: "tools",
      label: "Tools & APIs",
      icon: "Wrench" as const,
      popoverLines: [
        "Actions the model can take in the world — call a function, query a database, fetch live data.",
      ],
    },
    {
      id: "persist",
      label: "Persistent Memory",
      icon: "Archive" as const,
      popoverLines: [
        "Long-term — what the model remembers across sessions.",
        "Semantic + Episodic memory. Last week's conversation informs this week's.",
      ],
    },
    {
      id: "system",
      label: "System Instructions",
      icon: "Shield" as const,
      popoverLines: [
        "The persistent rules — who the model is, what it can or can't do, what tone to use.",
        "Procedural memory.",
      ],
    },
  ],
};

export const e4Content = {
  headline: "Eight techniques. Three tiers.",
  headlineKeywords: ["Three tiers"] as const,
  footerCaption: "Higher tiers borrow from later layers. ART · RAG · ReAct already point to context and harness.",
  footerCaptionKeywords: ["Higher tiers", "context", "harness"] as const,
  tierAnnotation: "↘ context · harness",
  tiers: [
    {
      id: "basic",
      label: "BASIC",
      copper: "copper-700" as const,
      cards: [
        { id: "zero-shot", title: "Zero-Shot", essence: "Ask once, no examples" },
        { id: "few-shot", title: "Few-Shot", essence: "Show 2–3 examples" },
        { id: "cot", title: "Chain-of-Thought", essence: "Think step by step" },
      ],
    },
    {
      id: "intermediate",
      label: "INTERMEDIATE",
      copper: "copper-500" as const,
      cards: [
        { id: "self-cons", title: "Self-Consistency", essence: "Multiple paths, consensus" },
        { id: "tot", title: "Tree of Thoughts", essence: "Branch decision paths" },
      ],
    },
    {
      id: "advanced",
      label: "ADVANCED",
      copper: "copper-300" as const,
      cards: [
        { id: "rag", title: "RAG", essence: "Retrieve + ground in docs" },
        { id: "art", title: "ART", essence: "Reason + use tools" },
        { id: "react", title: "ReAct", essence: "Think → Act → Observe → repeat" },
      ],
    },
  ],
  modalContent: {
    "zero-shot": {
      bullets: [
        { label: "Best for", body: "well-defined tasks · quick single-pass requests" },
        { label: "Example", body: '"Analyze the financial risks in our Q3 report and provide recommendations."' },
        { label: "Trade-off", body: "simplest path; relies entirely on training" },
      ],
    },
    "few-shot": {
      bullets: [
        { label: "Best for", body: "classification · formatting · style mimicking" },
        { label: "Example", body: "Classify these emails by department: Example 1: 'I need help with my account balance' → Finance · Example 2: 'The app keeps crashing' → Tech Support · Now classify: 'I found an error in my invoice'" },
        { label: "Trade-off", body: "examples consume tokens; pattern transfers reliably" },
      ],
    },
    cot: {
      bullets: [
        { label: "Best for", body: "math · logic · multi-step reasoning" },
        { label: "Example", body: "Calculate customer acquisition cost. Think step-by-step: 1. List marketing expenses · 2. Count new customers · 3. Divide. Show your reasoning." },
        { label: "Trade-off", body: "longer outputs; more accurate on hard problems" },
      ],
    },
    "self-cons": {
      bullets: [
        { label: "Best for", body: "high-stakes decisions · accuracy-critical work" },
        { label: "Example", body: "Generate 3 different approaches to reduce costs by 15%. For each: list steps, estimate time, calculate savings. Identify elements common to all three." },
        { label: "Trade-off", body: "3× compute cost; substantially more reliable" },
      ],
    },
    tot: {
      bullets: [
        { label: "Best for", body: "strategic decisions · multi-option evaluation" },
        { label: "Example", body: "Path A: Singapore vs Thailand. Path B: Germany vs Netherlands. For each: market size, regulations, competition. Recommend best." },
        { label: "Trade-off", body: "heavier reasoning; explores trade-offs systematically" },
      ],
    },
    rag: {
      layerAnnotation: "Layer 2",
      bullets: [
        { label: "Best for", body: "questions about your data · recent events · specific knowledge" },
        { label: "Example", body: "Using our knowledge base: search for 'remote work policy'. Create updated FAQ addressing top 5 questions." },
        { label: "Trade-off", body: "needs retrieval setup; grounds answers in real sources" },
      ],
    },
    art: {
      layerAnnotation: "Layer 3",
      bullets: [
        { label: "Best for", body: "multi-step workflows requiring different capabilities" },
        { label: "Example", body: "For quarterly financials: calculator for growth %, search web for benchmarks, access CRM, generate charts. Select tools automatically." },
        { label: "Trade-off", body: "needs tool wiring; massively expands what's possible" },
      ],
    },
    react: {
      layerAnnotation: "Layer 3",
      bullets: [
        { label: "Best for", body: "investigation · debugging · adaptive workflows" },
        { label: "Example", body: "Debug churn: Thought (check support tickets) → Action (search Oct DB) → Observation (45% billing complaints) → Thought (billing issue?) → Action (check logs) → continue." },
        { label: "Trade-off", body: "agent loop; the heart of how modern AI agents work" },
      ],
    },
  },
};

export const e7Content = {
  headline: "Four strategies. Each one solves a context problem.",
  headlineKeywords: ["Each one solves a context problem"] as const,
  footerCaption: "When context grows, these four keep it useful.",
  footerCaptionKeywords: ["keep it useful"] as const,
  rings: [
    {
      id: "write",
      label: "WRITE",
      subHeadline: "Store data for future use",
      subList: ["Long-term memory", "Scratchpad", "Session state"],
      copper: "copper-700" as const,
      kinetic: "pause" as const,
      popoverLines: [
        "Save what you'll need later.",
        "For your weekly report: this week's draft saves into long-term memory so next week's task can reference it.",
      ],
    },
    {
      id: "select",
      label: "SELECT",
      subHeadline: "Choose data needed for the task",
      subList: ["Retrieve tools", "Retrieve scratchpad", "Retrieve memory", "Retrieve knowledge"],
      copper: "copper-600" as const,
      kinetic: "filter" as const,
      popoverLines: [
        "Pull only what's relevant now.",
        "For 'this Friday's report' fetch the last 7 days of activity, not the last year.",
      ],
    },
    {
      id: "compress",
      label: "COMPRESS",
      subHeadline: "Summarize past events efficiently",
      subList: ["Summarize", "Trim irrelevant tokens"],
      copper: "copper-500" as const,
      kinetic: "merge" as const,
      popoverLines: [
        "Summarize the past so it fits.",
        "Replace 12 prior weekly reports with a single trend-summary that fits the context window.",
      ],
    },
    {
      id: "isolate",
      label: "ISOLATE",
      subHeadline: "Separate tasks to avoid interference",
      subList: ["Partition state", "Sandbox", "Multi-agent"],
      copper: "copper-400" as const,
      kinetic: "split" as const,
      popoverLines: [
        "Keep tasks from polluting each other.",
        "The drafting task and the verification task each get their own context — no cross-contamination.",
      ],
    },
  ],
};

export const e5Content = {
  headline: "A great prompt still has limits.",
  headlineKeywords: ["A great prompt", "limits"] as const,
  bestPracticesHeader: "BEST PRACTICES",
  bestPractices: [
    "Be clear and concise",
    "Iterate and test",
    "Steer with detail",
    "Evaluate the output",
    "Set success metrics",
  ],
  commonMistakesHeader: "COMMON MISTAKES",
  commonMistakes: [
    "Vague instructions",
    "Overcomplicated prompts",
    "Lack of context",
    "Ignoring AI limitations",
    "Failing to iterate",
  ],
  wallHeader: "WHERE PROMPT ENDS",
  wallSubLine: "Even a perfect prompt can't:",
  wallSubLineKeywords: ["can't"] as const,
  constraints: [
    "Provide knowledge the model wasn't trained on",
    "Pull current or proprietary data",
    "Use tools, call APIs, or take actions",
    "Persist memory across sessions",
    "Verify its own output against reality",
    "Run autonomously on schedule or trigger",
  ],
  closingCaption: "That's where the next layers begin.",
  closingCaptionKeywords: ["That's where the next layers begin"] as const,
};

// Helper used by E.3 slide to build SpineElement[] with React popover nodes.
export function spinePopoverContent(lines: readonly string[]): ReactNode {
  return (
    <ul className="flex flex-col gap-1 font-serif text-neutral-100" style={{ fontSize: "0.95rem", lineHeight: 1.4 }}>
      {lines.map((l, i) => (
        <li key={i}>{l}</li>
      ))}
    </ul>
  );
}
