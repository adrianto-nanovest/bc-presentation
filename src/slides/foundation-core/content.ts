// Single source of truth for all Section D slide copy.

export const d1Content = {
  beat1: {
    statValue: 73,                       // animated 0 → 73
    statSuffix: "%",
    subLine: "of automation projects fail.",
    subLineKeywords: ["fail"] as const,
    caption: "— widely cited across automation industry research, 2024–2026",
  },
  beat2: {
    mechanism: "Automation amplifies what's already there. Broken or excellent.",
    mechanismKeywords: ["Automation", "Broken", "excellent"] as const,
    manualBar: { fromPct: 0, toPct: 18, counterTo: 1, label: "manual pace" },
    machineBar: { fromPct: 0, toPct: 140, counterTo: 1000, label: "machine pace" },
  },
  beat3: {
    prescription: "Fix the spec first. Then automate.",
    prescriptionKeywords: ["spec"] as const,
    subPrescription: "Process improvement is a prerequisite, not a phase.",
    subPrescriptionKeywords: ["prerequisite"] as const,
  },
};

export const d2Content = {
  headline: "Three disciplines converge. One evolves.",
  headlineKeywords: ["converge", "evolves"] as const,
  cards: [
    {
      key: "bpm" as const,
      title: "BPM",
      subName: "Business Process Management",
      tagline: "The GPS for operations",
      taglineKeywords: ["GPS"] as const,
      bullets: [
        "Holistic workflow optimization",
        "Identifies bottlenecks and waste",
        "Redesigns end-to-end flow",
      ],
      copperStop: "copper-700" as const,
      position: "bpm-tl" as const,
      hoverAnalogy:
        "Like asking 'where's the waste?' before you ask 'how do we go faster?'.",
    },
    {
      key: "rpa" as const,
      title: "RPA",
      subName: "Robotic Process Automation",
      tagline: "Deterministic digital workers",
      taglineKeywords: ["Deterministic"] as const,
      bullets: [
        "Rule-based task execution",
        "Fast, reliable, no intelligence needed",
        "Scales repetitive operations",
      ],
      copperStop: "copper-500" as const,
      position: "rpa-tr" as const,
      hoverAnalogy:
        "Like a digital worker following a checklist exactly — fast, never tired, never improvises.",
    },
    {
      key: "ai" as const,
      title: "AI",
      subName: "Artificial Intelligence",
      tagline: "Core strengths",
      taglineKeywords: ["Core strengths"] as const,
      bullets: [
        "Summarization & analysis",
        "Generation & NLU",
        "Multimodal & adaptive learning",
      ],
      copperStop: "copper-400" as const,
      position: "ai-bc" as const,
      hoverAnalogy:
        "What AI does well — quickly, at scale, on text/image/audio simultaneously.",
    },
    {
      key: "ipa" as const,
      title: "IPA",
      subName: "Intelligent Process Automation",
      tagline: "End-to-end intelligent workflow",
      taglineKeywords: ["intelligent"] as const,
      bullets: [
        "Combines process, automation, and AI",
        "Context-aware and adaptive",
        "End-to-end orchestration",
      ],
      copperStop: "copper-300" as const,
      position: "ipa-c" as const,
      hoverAnalogy:
        "Process discipline + deterministic automation + AI strengths, in one workflow.",
    },
    {
      key: "agentic" as const,
      title: "AGENTIC AUTOMATION",
      subName: "Autonomous Agents",
      tagline: "Goals, not just steps",
      taglineKeywords: ["Goals"] as const,
      bullets: [
        "Self-directed orchestration toward outcomes",
        "Multi-agent collaboration",
        "Continuous learning and adaptation",
      ],
      copperStop: "copper-200" as const,
      position: "agentic-r" as const,
      hoverAnalogy:
        "An agent that pursues a goal — 'ensure zero unplanned downtime' — and adapts as conditions change.",
    },
  ],
};

export const d3Content = {
  headline: "Monthly operations report — the same process at every level.",
  headlineKeywords: ["every level"] as const,
  levels: [
    {
      key: "bpm" as const,
      ask: "Where's the waste?",
      askKeywords: ["waste"] as const,
      doText:
        "Redesign report scope; consolidate three duplicate reports into one; integrate data sources end-to-end.",
      doKeywords: [] as const,
      outcome: "Fewer reports; clearer signal.",
      convergedBullets: [
        "Redesigned report scope",
        "3 reports → 1",
        "Sources integrated end-to-end",
      ],
    },
    {
      key: "rpa" as const,
      ask: "What repeats?",
      askKeywords: ["repeats"] as const,
      doText:
        "Bot pulls KPIs each Monday; populates the template; distributes to stakeholders.",
      doKeywords: [] as const,
      outcome: "Hours reclaimed; zero copy-paste.",
      convergedBullets: [
        "Bot pulls KPIs Monday",
        "Auto-fills template",
        "Auto-distributes",
      ],
    },
    {
      key: "ipa" as const,
      ask: "Which steps need AI's core strengths?",
      askKeywords: ["core strengths"] as const,
      doText:
        "Layer AI's core strengths: summarization (compress raw data), analysis (spot anomalies), generation (draft narrative), NLU (interpret stakeholder comments).",
      doKeywords: ["summarization", "analysis", "generation", "NLU"] as const,
      outcome: "Insight, not just data.",
      convergedBullets: [
        "Bot reads sources → summarizes anomalies",
        "Drafts narrative",
        "Flags risks",
      ],
    },
    {
      key: "agentic" as const,
      ask: "Can this run itself?",
      askKeywords: ["run itself"] as const,
      doText:
        "Agent monitors continuously; generates report on demand; escalates to leadership without being asked.",
      doKeywords: [] as const,
      outcome: "Earlier risk detection; report becomes ambient.",
      convergedBullets: [
        "Agent monitors continuously",
        "Generates on demand",
        "Escalates without being asked",
      ],
    },
  ],
  aiFeederBullets: [
    "Summarization · generation",
    "Analysis · NLU",
    "On the source data",
  ],
  resultCapstone: "~80% time saved · risks surfaced earlier",
  resultCapstoneKeywords: ["~80% time saved", "risks surfaced earlier"] as const,
};

export const d4Content = {
  headline: "Each level builds on the previous. You can't skip.",
  headlineKeywords: ["previous"] as const,
  footerCaption: "Skip a level, and the level above fails harder.",
  footerCaptionKeywords: ["fails harder"] as const,
  ladder: {
    questions: [
      { number: 1, question: "Does the process work today?", keywords: ["work today"] as const, yesLabel: "continue", noLabel: "STOP ↻" },
      { number: 2, question: "Have you removed waste + bottlenecks?", keywords: ["waste"] as const, yesLabel: "continue", noLabel: "apply BPM first" },
      { number: 3, question: "Are there repetitive, rule-based steps?", keywords: ["repetitive"] as const, yesLabel: "RPA", noLabel: "continue" },
      { number: 4, question: "Do steps need AI's core strengths?", keywords: ["AI's core strengths"] as const, yesLabel: "IPA", noLabel: "continue" },
      { number: 5, question: "Should it pursue a goal autonomously?", keywords: ["goal autonomously"] as const, yesLabel: "AGENTIC", noLabel: "stay at IPA" },
    ],
    terminals: [
      {
        abbrev: "BPM",
        subLine: "Redesign + integrate. The foundation everything else stands on.",
        altitudeTier: 1 as const,
        hoverExample: "Example: cut a 20-step approval flow to 8 steps before automating any of it.",
        fromQ: 2,
        branch: "no" as const,
      },
      {
        abbrev: "RPA",
        subLine: "Automate the rule-based parts. Reclaim hours.",
        altitudeTier: 2 as const,
        hoverExample: "Example: bot pulls 6 reports each Monday, fills the template, distributes.",
        fromQ: 3,
        branch: "yes" as const,
      },
      {
        abbrev: "IPA",
        subLine: "Layer AI's core strengths. Insight, not just data.",
        altitudeTier: 3 as const,
        hoverExample: "Example: bot reads source data, summarizes anomalies, flags risks for human review.",
        fromQ: 4,
        branch: "yes" as const,
      },
      {
        abbrev: "AGENTIC",
        subLine: "Autonomous orchestration. The process pursues the goal.",
        altitudeTier: 4 as const,
        hoverExample: "Example: agent monitors operations continuously, generates report on demand, escalates without being asked.",
        fromQ: 5,
        branch: "yes" as const,
      },
    ],
  },
};

export const d5Content = {
  beat1: { text: "Process is the spec.", keywords: ["spec"] as const },
  beat2: { text: "Engineering is the system around it.", keywords: ["system"] as const },
  bridge: { text: "Next: how that system gets built.", keywords: ["Next"] as const },
};
