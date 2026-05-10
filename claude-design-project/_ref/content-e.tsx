// Saved verbatim copy of section E content.tsx — for build reference only.
// Single source of truth for all Section E slide copy.

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
    { text: "Show what good looks like → fewer iterations, more useful results.", keywords: ["Show what good looks like"] as const },
  ],
  bridge: "Next: the canonical structure behind every good prompt.",
  bridgeKeywords: ["canonical structure"] as const,
  naivePrompt: "Write me this week's project report.",
  naiveResult: "This week, the team made progress on several initiatives.\nVarious items were completed and others are ongoing.\nNext week we plan to continue the work in flight.\nPlease reach out with any questions.",
  properPrompt: "Role: You are a project lead preparing the Friday status report.\nTask: Draft a concise weekly status — (1) what shipped, (2) what's at risk,\n      (3) what's planned for next week.\nContext: For the EOD Friday team standup. Audience: 8 cross-functional\n         stakeholders. Last week we missed a milestone on Module B.\nExamples: See last week's report (attached) — match structure, tone,\n          and focus areas.\nOutput: Markdown, H2 sections, ~250 words. Lead with the at-risk item.",
  properElementLabels: ["Role:", "Task:", "Context:", "Examples:", "Output:"] as const,
  properResult: "## At Risk: Module B\nMigration is 1 sprint behind plan; root cause is the upstream schema change.\n## Shipped\n- Onboarding revamp · 12% activation lift in test cohort\n- Checkout refactor merged behind flag\n## Next Week\n- Cut Module B remediation branch\n- Roll checkout flag to 25%",
};

export const e3Content = {
  headline: "One skeleton. Many names.",
  headlineKeywords: ["One skeleton"] as const,
  footerCaption: "Different mnemonics. Same six ingredients.",
  footerCaptionKeywords: ["Same six ingredients"] as const,
  spine: [
    { id: "role", num: 1, name: "Role", essence: "Who AI should be", popoverLines: ["Define who the AI should be.", '"You are ... with N years exp specialized in ..."', "Examples: project lead, ops analyst, geology reviewer."] },
    { id: "instruction", num: 2, name: "Instruction", essence: "Action to perform + how", popoverLines: ["Clear action + constraints.", '"Analyze ..." · "Please exclude ..." · "Ultrathink on ..."', "Also covers: style, tone, process detail, control."] },
    { id: "output", num: 3, name: "Output Format", essence: "Shape of the result", popoverLines: ["Specify how the response is structured.", "Formats: Markdown · Tables · YAML · JSON · CSV · PDF."] },
    { id: "context", num: 4, name: "Context", essence: "Background + audience", popoverLines: ["Essential additional information.", "Categories: Background · Objectives · Goal · Audience · Constraints."] },
    { id: "examples", num: 5, name: "Examples", essence: "Show good output", popoverLines: ["Show what good output looks like.", "Forms: Attached example docs · sample input/output pairs."] },
    { id: "input", num: 6, name: "Input", essence: "Specific data", popoverLines: ["The specific data to work with.", "Forms: Attached file · specific request.", "Note: User prompt; if instructions are generic → system prompt."] },
  ],
  frameworks: [
    { id: "race", acronym: "RACE", breakdown: "Role · Action · Context · Explanation", spineHits: [1, 2, 4] },
    { id: "care", acronym: "CARE", breakdown: "Context · Action · Result · Example", spineHits: [4, 2, 3, 5] },
    { id: "ape", acronym: "APE", breakdown: "Action · Purpose · Execution", spineHits: [2] },
    { id: "roses", acronym: "ROSES", breakdown: "Role · Objective · Scenario · Expected output · Solution", spineHits: [1, 2, 4, 3, 2] },
    { id: "create", acronym: "CREATE", breakdown: "Character · Request · Examples · Adjustments · Type · Extras", spineHits: [1, 2, 5, 3, 4] },
    { id: "coast", acronym: "COAST", breakdown: "Context · Objective · Actions · Scenario · Task", spineHits: [4, 2, 2, 4, 2] },
    { id: "tag", acronym: "TAG", breakdown: "Task · Action · Goal", spineHits: [2, 2, 2] },
    { id: "pain", acronym: "PAIN", breakdown: "Problem · Action · Information · Next steps", spineHits: [4, 2, 6, 2] },
    { id: "rise", acronym: "RISE", breakdown: "Role · Input · Steps · Execution", spineHits: [1, 6, 2, 2] },
    { id: "creo", acronym: "CREO", breakdown: "Context · Request · Explanation · Outcome", spineHits: [4, 2, 3, 2] },
  ],
};

export const e4Content = {
  headline: "Eight techniques. Three tiers.",
  headlineKeywords: ["Three tiers"] as const,
  footerCaption: "Higher tiers borrow from later layers. ART · RAG · ReAct already point to context and harness.",
  footerCaptionKeywords: ["Higher tiers", "context", "harness"] as const,
  tiers: [
    { id: "basic", label: "BASIC", copper: "copper-700",
      cards: [
        { id: "zero-shot", title: "Zero-Shot", essence: "Ask once, no examples" },
        { id: "few-shot", title: "Few-Shot", essence: "Show 2–3 examples" },
        { id: "cot", title: "Chain-of-Thought", essence: "Think step by step" },
      ]},
    { id: "intermediate", label: "INTERMEDIATE", copper: "copper-500",
      cards: [
        { id: "self-cons", title: "Self-Consistency", essence: "Multiple paths, consensus" },
        { id: "tot", title: "Tree of Thoughts", essence: "Branch decision paths" },
      ]},
    { id: "advanced", label: "ADVANCED", copper: "copper-300",
      cards: [
        { id: "rag", title: "RAG", essence: "Retrieve + ground in docs" },
        { id: "art", title: "ART", essence: "Reason + use tools" },
        { id: "react", title: "ReAct", essence: "Think → Act → Observe → repeat" },
      ]},
  ],
  // modal content per technique:
  modal: {
    "zero-shot":   [["Best for","well-defined tasks · quick single-pass requests"],["Example","\"Analyze the financial risks in our Q3 report and provide recommendations.\""],["Trade-off","simplest path; relies entirely on training"]],
    "few-shot":    [["Best for","classification · formatting · style mimicking"],["Example","Classify these emails by department: Example 1: 'I need help with my account balance' → Finance · Example 2: 'The app keeps crashing' → Tech Support · Now classify: 'I found an error in my invoice'"],["Trade-off","examples consume tokens; pattern transfers reliably"]],
    "cot":         [["Best for","math · logic · multi-step reasoning"],["Example","Calculate customer acquisition cost. Think step-by-step: 1. List marketing expenses · 2. Count new customers · 3. Divide. Show your reasoning."],["Trade-off","longer outputs; more accurate on hard problems"]],
    "self-cons":   [["Best for","high-stakes decisions · accuracy-critical work"],["Example","Generate 3 different approaches to reduce costs by 15%. For each: list steps, estimate time, calculate savings. Identify elements common to all three."],["Trade-off","3× compute cost; substantially more reliable"]],
    "tot":         [["Best for","strategic decisions · multi-option evaluation"],["Example","Path A: Singapore vs Thailand. Path B: Germany vs Netherlands. For each: market size, regulations, competition. Recommend best."],["Trade-off","heavier reasoning; explores trade-offs systematically"]],
    "rag":         [["Layer","Layer 2"],["Best for","questions about your data · recent events · specific knowledge"],["Example","Using our knowledge base: search for 'remote work policy'. Create updated FAQ addressing top 5 questions."],["Trade-off","needs retrieval setup; grounds answers in real sources"]],
    "art":         [["Layer","Layer 3"],["Best for","multi-step workflows requiring different capabilities"],["Example","For quarterly financials: calculator for growth %, search web for benchmarks, access CRM, generate charts. Select tools automatically."],["Trade-off","needs tool wiring; massively expands what's possible"]],
    "react":       [["Layer","Layer 3"],["Best for","investigation · debugging · adaptive workflows"],["Example","Debug churn: Thought (check support tickets) → Action (search Oct DB) → Observation (45% billing complaints) → Thought (billing issue?) → Action (check logs) → continue."],["Trade-off","agent loop; the heart of how modern AI agents work"]],
  },
};

export const e5Content = {
  headline: "A great prompt still has limits.",
  headlineKeywords: ["A great prompt", "limits"] as const,
  bestPracticesHeader: "BEST PRACTICES",
  bestPractices: ["Be clear and concise","Iterate and test","Steer with detail","Evaluate the output","Set success metrics"],
  commonMistakesHeader: "COMMON MISTAKES",
  commonMistakes: ["Vague instructions","Overcomplicated prompts","Lack of context","Ignoring AI limitations","Failing to iterate"],
  wallHeader: "WHERE PROMPT ENDS",
  wallSubLine: "Even a perfect prompt can't:",
  wallSubLineKeywords: ["can't"] as const,
  constraints: ["Provide knowledge the model wasn't trained on","Pull current or proprietary data","Use tools, call APIs, or take actions","Persist memory across sessions","Verify its own output against reality","Run autonomously on schedule or trigger"],
  closingCaption: "That's where the next layers begin.",
  closingCaptionKeywords: ["That's where the next layers begin"] as const,
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
    { id: "user-prompt", label: "User Prompt", icon: "MessageSquare", popoverLines: ["The instructions you just spent four slides on.","Includes the output format spec — that lives inside the prompt itself.","One of six components — not the only one."]},
    { id: "conv-mem", label: "Conversation Memory", icon: "History", popoverLines: ["Short-term — what was said earlier in this session.","Episodic memory. Resets when session ends."]},
    { id: "rag", label: "RAG Knowledge Base", icon: "BookOpen", popoverLines: ["Retrieved documents pulled in for this specific question.","Retrieval-Augmented Generation."]},
    { id: "tools", label: "Tools & APIs", icon: "Wrench", popoverLines: ["Actions the model can take in the world — call a function, query a database, fetch live data."]},
    { id: "persist", label: "Persistent Memory", icon: "Archive", popoverLines: ["Long-term — what the model remembers across sessions.","Semantic + Episodic memory. Last week's conversation informs this week's."]},
    { id: "system", label: "System Instructions", icon: "Shield", popoverLines: ["The persistent rules — who the model is, what it can or can't do, what tone to use.","Procedural memory."]},
  ],
};

export const e7Content = {
  headline: "Four strategies. Each one solves a context problem.",
  headlineKeywords: ["Each one solves a context problem"] as const,
  footerCaption: "When context grows, these four keep it useful.",
  footerCaptionKeywords: ["keep it useful"] as const,
  rings: [
    { id: "write", label: "WRITE", subHeadline: "Store data for future use", subList: ["Long-term memory","Scratchpad","Session state"], copper: "copper-700",
      popoverLines: ["Save what you'll need later.","For your weekly report: this week's draft saves into long-term memory so next week's task can reference it."]},
    { id: "select", label: "SELECT", subHeadline: "Choose data needed for the task", subList: ["Retrieve tools","Retrieve scratchpad","Retrieve memory","Retrieve knowledge"], copper: "copper-600",
      popoverLines: ["Pull only what's relevant now.","For 'this Friday's report' fetch the last 7 days of activity, not the last year."]},
    { id: "compress", label: "COMPRESS", subHeadline: "Summarize past events efficiently", subList: ["Summarize","Trim irrelevant tokens"], copper: "copper-500",
      popoverLines: ["Summarize the past so it fits.","Replace 12 prior weekly reports with a single trend-summary that fits the context window."]},
    { id: "isolate", label: "ISOLATE", subHeadline: "Separate tasks to avoid interference", subList: ["Partition state","Sandbox","Multi-agent"], copper: "copper-400",
      popoverLines: ["Keep tasks from polluting each other.","The drafting task and the verification task each get their own context — no cross-contamination."]},
  ],
};

export const e8Content = {
  headline: "Context works. But you're orchestrating it every session.",
  headlineKeywords: ["you're orchestrating it"] as const,
  pitfalls: [
    { id: "conflict", icon: "GitMerge", title: "CONTEXT CONFLICT", essence: "Sources contradict → cognitive gridlock" },
    { id: "confusion", icon: "Triangle", title: "CONTEXT CONFUSION", essence: "Tools + noise + cognitive overload" },
    { id: "poisoning", icon: "Droplets", title: "CONTEXT POISONING", essence: "Wrong info spreads silently" },
    { id: "distraction", icon: "TrendingDown", title: "CONTEXT DISTRACTION", essence: "Token overload → the 'dumb zone'" },
  ],
  satellites: [
    { id: "user-prompt", label: "User Prompt", icon: "MessageSquare" },
    { id: "conv-mem", label: "Conversation Memory", icon: "History" },
    { id: "rag", label: "RAG Knowledge Base", icon: "BookOpen" },
    { id: "tools", label: "Tools & APIs", icon: "Wrench" },
    { id: "persist", label: "Persistent Memory", icon: "Archive" },
    { id: "system", label: "System Instructions", icon: "Shield" },
  ],
  footerCaption: "Each session, you fight all of this. There's a better way.",
  footerCaptionKeywords: ["you", "better way"] as const,
};

export const e9Content = {
  headline: "Layer 3: Harness — execution.",
  headlineKeywords: ["Harness"] as const,
  satellites: [
    { id: "user-prompt", label: "User Prompt", icon: "MessageSquare" },
    { id: "conv-mem", label: "Conversation Memory", icon: "History" },
    { id: "rag", label: "RAG Knowledge Base", icon: "BookOpen" },
    { id: "tools", label: "Tools & APIs", icon: "Wrench" },
    { id: "persist", label: "Persistent Memory", icon: "Archive" },
    { id: "system", label: "System Instructions", icon: "Shield" },
  ],
  includes: ["Context Isolation","Tool Loadout","Subagent Verification","Pruning","Summarization","Offloading"],
};

export const e10Content = {
  headline: "What good harness teams do: eight practices.",
  headlineKeywords: ["eight practices"] as const,
  practices: [
    { id: "orchestration", icon: "Network", name: "Orchestration", essence: "pattern + agents + tools",
      bullets: ["Main Agent dispatches","Delegate to sub-agents OR call tools direct","Pattern: centralized"]},
    { id: "plugins", icon: "Package", name: "Plugins", essence: "packaged: subagents, skills, hooks, MCP",
      bullets: ["Subagents — specialized workers","Skills — domain modules","Hooks — lifecycle guardrails","MCP — external integrations","One bundle, install everywhere"]},
    { id: "memory", icon: "Brain", name: "Memory", essence: "self-learning — gotchas stay",
      bullets: ["Captures gotchas during work","Records what broke, what worked","Stores decisions + rationale","Next session inherits"]},
    { id: "observability", icon: "Activity", name: "Observability", essence: "every decision auditable",
      bullets: ["Tool calls + results","Context state per step","Permission decisions","Token usage trends"]},
    { id: "triggers", icon: "Zap", name: "Triggers", essence: "manual, schedule, or event",
      bullets: ["Manual — you ask","Schedule — cron, daily, recurring","Event — webhook, file change, message"]},
    { id: "spec-driven", icon: "FileText", name: "Spec-driven", essence: "spec = source of truth",
      bullets: ["Spec is the contract","Progress measured against spec","No work outside the spec","Verification = spec compliance"]},
    { id: "hitl", icon: "Users", name: "HITL", essence: "approval at key steps",
      bullets: ["Approval gates on critical actions","Human pauses on ambiguity","Human signs off on dangerous commands","Human checkpoints on long runs"]},
    { id: "ralph", icon: "Repeat", name: "Ralph Wiggum", essence: "autonomous loop until done",
      bullets: ["Loops until spec is satisfied","Failure feeds back as input","Survives across context limits","\"I'm helping!\" persistence"]},
  ],
};

export const e11Content = {
  beat1: { text: "Three layers. The fundamentals are built.", keywords: ["Three layers", "fundamentals"] as const },
  beat2: { text: "Next: the techniques that matter most.", keywords: ["Next", "techniques that matter most"] as const },
};
