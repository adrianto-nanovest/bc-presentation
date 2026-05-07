// src/slides/reveal-and-closing/content.ts
// Single source of truth for all reveal+closing slide copy.
// Editing copy here does not require touching slide components.

export const i1Content = {
  headlineParts: ["What you've been watching for the last ", "90 minutes", " — ", "facilitated with AI", "."],
  subLine: "And here's the process that made it possible.",
  subLineKeywords: ["process"] as const,
  tagline: "Built with harnesses = production-grade result.",
  taglineKeywords: ["harnesses", "production-grade result"] as const,
  stages: [
    { num: 1, label: "Research", sub: "14 parallel agents → topic deep-dives", keywords: ["parallel agents"] as const },
    { num: 2, label: "Per-slide brainstorm", sub: "Structure → beats → content", keywords: ["beats"] as const },
    { num: 3, label: "Design system", sub: "Typography · color · motion · components", keywords: ["Typography · color · motion · components"] as const },
    { num: 4, label: "Plugins + Skills", sub: "frontend-slides · brainstorming · writing-plans", keywords: ["frontend-slides", "brainstorming", "writing-plans"] as const },
    { num: 5, label: "MCP", sub: "NotebookLM · gemini-image-gen", keywords: ["NotebookLM", "gemini-image-gen"] as const },
    { num: 6, label: "Deck generation", sub: "Scripted · reviewed · iterated", keywords: ["reviewed"] as const },
  ],
};

export const i2Content = {
  name: "ADRIANTO TEDJOKUSUMO",
  role: { text: "Head of TPM @ Nanovest · AI Steering Committee Lead", keywords: ["Nanovest", "AI Steering Committee Lead"] as const },
  delivery: { text: "13 years tech delivery. Zero formal AI training.", keywords: ["Zero formal AI training"] as const },
  credentials: { text: "ITB Electrical Eng · Chosun M.S. Computer Vision · 8+ yrs PM (Toppan Ecquaria · Blibli)", keywords: ["Computer Vision"] as const },
  timeline: {
    anchors: [
      { id: "mar2025", label: "Mar 2025", caption: "start", hover: "Started reading papers, daily Claude/ChatGPT use, no goals." },
      { id: "sep2025", label: "Sep 2025", caption: "first deliverables", hover: "First MCPs + plugins shipped to internal team." },
      { id: "today", label: "Today", caption: "still beginner", captionKeywords: ["still beginner"] as const, hover: "Active builds, still learning. This deck is one of them." },
    ],
    segmentLabel: "6mo foundation + experiment",
    cvHover: "Master's thesis: image segmentation. Pre-LLM era.",
  },
};

export const i3Content = {
  headline: "Built. Taught. In production.",
  caption: "Click any item to see how it works",
  defaultCaption: "The harness pattern / Five expressions follow",
  list: [
    { kind: "header" as const, label: "HARNESSES" },
    { kind: "subheader" as const, label: "Workflows (n8n)" },
    { kind: "item" as const, id: "stocks-intel", label: "stocks intel", weight: "heavy" as const },
    { kind: "item" as const, id: "legal-docs", label: "legal docs", weight: "heavy" as const },
    { kind: "item" as const, id: "exchange-alerts", label: "exchange alerts", weight: "heavy" as const },
    { kind: "subheader" as const, label: "Plugins (Claude)" },
    { kind: "item" as const, id: "nanovest-product", label: "nanovest-product", weight: "heavy" as const },
    { kind: "item" as const, id: "notebooklm", label: "NotebookLM", weight: "heavy" as const },
    { kind: "header" as const, label: "TOOLS" },
    { kind: "item" as const, id: "gemini-image-gen", label: "gemini-image-gen", weight: "light" as const },
    { kind: "item" as const, id: "sonarqube", label: "Sonarqube", weight: "light" as const },
    { kind: "item" as const, id: "bitbucket", label: "Bitbucket", weight: "light" as const },
    { kind: "header" as const, label: "WORKSHOPS facilitated" },
    { kind: "item" as const, id: "hr-group-ai", label: "HR Group AI · Sinarmas Group", weight: "light" as const },
    { kind: "item" as const, id: "townhall-aisc", label: "Townhall AISC · Nanovest", weight: "light" as const },
    { kind: "item" as const, id: "ai-sdlc", label: "AI-SDLC · Nanovest", weight: "light" as const },
    { kind: "item" as const, id: "pilot-workshop", label: "Pilot Workshop · Nanovest", weight: "light" as const },
  ],
};

export const i4Content = {
  firstBeat: [
    { text: "Foundation", durationMs: 250, keyword: true },
    { text: "before", durationMs: 200 },
    { text: "velocity", durationMs: 250, keyword: true },
    { text: ".", durationMs: 80 },
  ],
  secondBeatA: "In a year, a Project Manager built this.",
  secondBeatAKeywords: ["Project Manager"] as const,
  secondBeatB: "— In a year, what could you build?",
  secondBeatBKeywords: ["you"] as const,
};

export const j1Content = {
  line1: { text: "Still a beginner. A lot left to learn.", keywords: ["Still a beginner"] as const },
  line2: { text: "But I've earned a few lessons — through experiments, through failures.", keywords: ["experiments", "failures"] as const },
  line3: { text: "Here's some advice. So you don't repeat my mistakes.", keywords: ["repeat my mistakes"] as const },
};

export const j2Content = {
  headline: "Mindset before tools.",
  headlineKeywords: ["Mindset before tools"] as const,
  caption: "Hover any card for an example",
  cards: [
    {
      num: 1,
      headline: "Foundation precedes velocity",
      headlineKeywords: ["Foundation"] as const,
      sub: "understand before you output",
      hover: "Read the concept. Feel if it's relevant. Then experiment. Skip foundation — and you're just vibe-coding.",
    },
    {
      num: 2,
      headline: "Reps before sophistication",
      headlineKeywords: ["Reps"] as const,
      sub: "daily use beats clever prompts",
      hover: "Used Claude daily for months before trying to build anything.",
    },
    {
      num: 3,
      headline: "Stay current, don't chase",
      headlineKeywords: ["Stay"] as const,
      sub: "filter: does this serve my work?",
      hover: "New AI features ship constantly. My filter: does this serve my work? Most don't.",
    },
    {
      num: 4,
      headline: "Build the smallest thing that matters",
      headlineKeywords: ["smallest thing"] as const,
      sub: "a prompt template, a Skill, a snippet",
      hover: "First build was a prompt template. Took 30 minutes.",
    },
    {
      num: 5,
      headline: "Failure is the next iteration's blueprint",
      headlineKeywords: ["Failure is the next iteration's blueprint"] as const,
      sub: "improve before you ship",
      hover: "Most first builds didn't work. Each one rebuilt the next.",
    },
  ],
};

export const j3Content = {
  headline: "Habits before output. Steps 1–3 of the recipe.",
  headlineKeywords: ["Habits before output"] as const,
  caption: "Hover any step for an example",
  cards: [
    {
      num: 1,
      headline: "Read 1 thing a week about how AI works",
      headlineKeywords: ["1 thing a week"] as const,
      sub: "paper · post · well-written thread — anything conceptual",
      hover: "What I read mattered less than building the habit. The first months are about absorbing concepts.",
    },
    {
      num: 2,
      headline: "Use AI daily for anything",
      headlineKeywords: ["daily"] as const,
      sub: "drafting · summarizing · brainstorming · deciding — any task, any role",
      hover: "Months of daily use before I tried to build anything. Reps make later sophistication land.",
    },
    {
      num: 3,
      headline: "Pick ONE tool, go deep before adding others",
      headlineKeywords: ["ONE tool"] as const,
      sub: "skip the toolchain race — mastery beats sampling",
      hover: "Went deep on Claude. Skipped the LLM-of-the-week parade.",
    },
  ],
};

export const j4Content = {
  headline: "Artifacts that travel. Steps 4–6 of the recipe.",
  headlineKeywords: ["Artifacts that travel"] as const,
  caption: "Hover any step for an example",
  cards: [
    {
      num: 4,
      headline: "Find one recurring annoyance — AI-assist it 20% better",
      headlineKeywords: ["recurring annoyance", "20% better"] as const,
      sub: "your first build · prompt · skill · workflow snippet",
      hover: "First build was a prompt template for status updates. 30 min. Used it daily after.",
    },
    {
      num: 5,
      headline: "Evaluate ruthlessly",
      headlineKeywords: ["Evaluate ruthlessly"] as const,
      sub: "what's better? what still breaks? embrace failure — iterate",
      hover: "First MCP didn't work for two weeks of evenings. Each broken version informed the next.",
    },
    {
      num: 6,
      headline: "Once solid, share with many who have the same pain",
      headlineKeywords: ["many"] as const,
      sub: "their feedback is what makes it reusable for anyone",
      hover: "Shared nanovest-product plugin with PMs at Nanovest. Their feedback turned it into a reusable system.",
    },
  ],
  loopBackLabels: { five: "refine, iterate", six: "feedback from many" },
};

export const k1Content = {
  headline: ["Theory ends.", "Hands begin."],
  headlineKeywords: ["Theory ends. Hands begin"] as const,
  body1: "Tools loaded. Skills ready. Dummy data set.",
  body2: { text: "Open your laptop. Run the harnesses.", keywords: ["laptop"] as const },
  body3: "I'll be here.",
  tagline: "After this, the recipe is no longer theory.",
  taglineKeywords: ["After this, the recipe is no longer theory"] as const,
};
