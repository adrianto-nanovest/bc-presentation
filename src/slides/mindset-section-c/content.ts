// Section C — Mindset (C.1–C.5 + Bridge) content. Single source of truth for
// all text strings + keyword arrays used by the mindset arc and the C→D
// bridge slide.
//
// Conventions match the rest of the deck (see ../foundation-core/content.ts):
//   - Plain strings, sibling `*Kw` substring arrays at the same level.
//   - 1–3 keywords per chunk; copper-400 italic at render time.
//
// Header convention (post 2026-05-13 rework):
//   Each of c1Content..c5Content carries a `headline` field used by the
//   canonical `.slide-headline.small` header (FigLabel + headline). C1 and
//   C5 additionally carry a `bigHeadline` field for the large strikethrough
//   declaration that lives in the body of the slide.

// ─── C.1 — Tool → Bridge ───────────────────────────────────────────────────

export interface C1Content {
  figLabel: string;
  slideTitle: string;
  headline: string;               // canonical .slide-headline.small text
  headlineKw: readonly string[];  // KW() targets for canonical headline
  bigHeadline: string;            // body declaration with strikethrough — "AI is not a tool."
  strikethroughWord: string;      // word to strikethrough — "tool"
  clarifier: string;              // "It's a bridge."
  clarifierKw: readonly string[];
  fromLabel: string;
  fromText: string;
  toLabel: string;
  toText: string;
  toTextKw: readonly string[];
  heroSrc: string;
  heroAlt: string;
  darkenStrength: number;
}

export const c1Content: C1Content = {
  figLabel: "MINDSET 1 / 5",
  slideTitle: "From Tool to Bridge.",
  headline: "From Tool to Bridge.",
  headlineKw: ["Tool", "Bridge"],
  bigHeadline: "AI is not a tool.",
  strikethroughWord: "tool",
  clarifier: "It's a bridge.",
  clarifierKw: ["bridge"],
  fromLabel: "From",
  fromText: "occasional use, narrow tasks, single sessions.",
  toLabel: "To",
  toText: "daily fluency, broad reach, standing capability.",
  toTextKw: ["standing capability"],
  heroSrc: "/heroes/c1-bridge.jpg",
  heroAlt: "Bridge stretching toward horizon",
  darkenStrength: 0.2,
};

// ─── C.2 — Replacement → Multiplier ────────────────────────────────────────

export interface C2CardBullet {
  text: string;
  kw: readonly string[];
}

export interface C2Card {
  label: string;                  // "LEVERAGE" | "VELOCITY" | "JUDGMENT"
  animKey: string;                // "leverage" | "velocity" | "judgment"
  bullets: readonly C2CardBullet[];
}

export interface C2Content {
  figLabel: string;
  headline: string;               // canonical .slide-headline.small text
  headlineKw: readonly string[];  // KW() targets for canonical headline
  recognition: string;
  recognitionItalicClause: string; // "That's a reasonable place to start."
  fearPanel: string;
  arrow: string;
  leveragePanel: string;
  leverageSub: string;            // italic "So I learn to use it."
  cards: readonly C2Card[];
  footer: string;                 // B4-style bottom-left italic 14px, new last step
  footerKw: readonly string[];
}

export const c2Content: C2Content = {
  figLabel: "MINDSET 2 / 5",
  headline: "From Fear to Leverage.",
  headlineKw: ["Fear", "Leverage"],
  recognition:
    "Most of us start with AI the way we started with Google — type, read, move on. That's a reasonable place to start.",
  recognitionItalicClause: "That's a reasonable place to start.",
  fearPanel: "AI will replace me.",
  arrow: "→",
  leveragePanel: "Someone using AI will.",
  leverageSub: "So I learn to use it.",
  cards: [
    {
      label: "MULTIPLIER",
      animKey: "leverage",
      bullets: [
        { text: "10× existing output", kw: ["10×"] },
        { text: "On work you already do well", kw: ["already do well"] },
        { text: "Compound over time", kw: ["Compound"] },
      ],
    },
    {
      label: "VELOCITY",
      animKey: "velocity",
      bullets: [
        { text: "5 drafts in the time of 1", kw: ["5 drafts"] },
        { text: "Cheaper to try, easier to discard", kw: ["Cheaper"] },
        { text: "More shots, more learning", kw: ["More shots"] },
      ],
    },
    {
      label: "JUDGMENT",
      animKey: "judgment",
      bullets: [
        { text: "Your taste scales when typing doesn't", kw: ["taste scales"] },
        { text: "Verify is the new bottleneck", kw: ["Verify"] },
        { text: "Domain expertise wins", kw: ["Domain expertise"] },
      ],
    },
    {
      label: "REACH",
      animKey: "reach",
      bullets: [
        { text: "Beyond your team's headcount", kw: ["headcount"] },
        { text: "Cross-domain in one head", kw: ["Cross-domain"] },
        { text: "Output that travels with you", kw: ["travels"] },
      ],
    },
  ],
  footer: "Move from fear to fluency. The cost of trying is now nearly zero.",
  footerKw: ["fear", "fluency", "nearly zero"],
};

// ─── C.3 — Executor → Orchestrator ─────────────────────────────────────────

export interface C3Side {
  label: string;            // "EXECUTOR"
  bullets: readonly string[];
}

export interface C3Content {
  figLabel: string;
  headline: string;               // canonical .slide-headline.small text
  headlineKw: readonly string[];  // KW() targets for canonical headline
  executor: C3Side;
  executorSubtitle: string;       // "DO. DEBUG. REPEAT." — mono caps beneath EXECUTOR (parallels triadCaption)
  orchestrator: C3Side;
  triadCaption: string;           // "Direct. Verify. Decide." — mono caps beneath ORCHESTRATOR
  punchline: string;
  punchlineKw: readonly string[];
}

export const c3Content: C3Content = {
  figLabel: "MINDSET 3 / 5",
  headline: "From Executor to Orchestrator.",
  headlineKw: ["Executor", "Orchestrator"],
  executor: {
    label: "EXECUTOR",
    bullets: [
      "Write the work line by line",
      "Debug manually",
      "Document everything",
      "Repetitive sub-tasks",
      "Manual handoffs",
      "Time → typing",
    ],
  },
  executorSubtitle: "DO. DEBUG. REPEAT.",
  orchestrator: {
    label: "ORCHESTRATOR",
    bullets: [
      "Design and architect",
      "Specify intent",
      "Verify and review",
      "Set the guardrails",
      "Decide and own it",
      "Time → thinking",
    ],
  },
  triadCaption: "Direct. Verify. Decide.",
  punchline: "AI handles the typing. You handle the thinking.",
  punchlineKw: ["thinking"],
};

// ─── C.4 — V-Bounce Workflow ───────────────────────────────────────────────

export interface C4Node {
  label: string;              // "SPECIFY"
  caption: string;
}

export interface C4Distribution {
  specifyPct: number;
  generatePct: number;
  verifyPct: number;
}

export interface C4Content {
  figLabel: string;
  headline: string;               // canonical .slide-headline.small text
  headlineKw: readonly string[];  // KW() targets for canonical headline
  nodes: readonly C4Node[];   // specify, generate, verify, ship
  humanCaption: string;
  aiCaption: string;
  before: C4Distribution;
  after: C4Distribution;
  punchline: string;
  punchlineKw: readonly string[];
  anchor: string;
  anchorKw: readonly string[];
  coreSkillKw: readonly string[]; // ambient-pulse target on the anchor line
  footer: string;                 // B4-style bottom-left italic 14px
  footerKw: readonly string[];
}

export const c4Content: C4Content = {
  figLabel: "MINDSET 4 / 5",
  headline: "The Shape of the New Work.",
  headlineKw: ["Shape", "New Work"],
  nodes: [
    { label: "SPECIFY", caption: "what to build, why it's right" },
    { label: "GENERATE", caption: "bulk work — AI does this" },
    { label: "VERIFY", caption: "review, validate, judge" },
    { label: "SHIP IT", caption: "result goes out the door" },
  ],
  humanCaption: "HUMAN WORK: SPECIFY + VERIFY",
  aiCaption: "AI WORK: GENERATE (bulk)",
  before: { specifyPct: 10, generatePct: 80, verifyPct: 10 },
  after: { specifyPct: 30, generatePct: 20, verifyPct: 50 },
  punchline: "More time on what and why. Less time on how to type it.",
  punchlineKw: ["how to type it"],
  anchor: "Verification is the new core skill.",
  anchorKw: ["Verification is the new core skill"],
  coreSkillKw: ["core skill"],
  footer: "More time on what to build and why it's right. Less time on how to type.",
  footerKw: ["what to build", "why it's right", "how to type"],
};

// ─── C.5 — Role → Trajectory ───────────────────────────────────────────────

export interface C5Beat {
  label: string;            // "COMPETITIVE"
  caption: string;
  captionKw: readonly string[];
}

export interface C5Content {
  figLabel: string;
  headline: string;               // canonical .slide-headline.small text
  headlineKw: readonly string[];  // KW() targets for canonical headline
  bigHeadline: string;            // body declaration — "It's not a role you take."
  strikethroughWord: string;      // "role"
  clarifier: string;              // "It's a trajectory you build."
  clarifierKw: readonly string[];
  beats: readonly C5Beat[];
  closing: string;
  closingKw: readonly string[];
  heroSrc: string;
  heroAlt: string;
  darkenStrength: number;
}

export const c5Content: C5Content = {
  figLabel: "MINDSET 5 / 5",
  headline: "From Role to Trajectory.",
  headlineKw: ["Role", "Trajectory"],
  bigHeadline: "It's not a role you take.",
  strikethroughWord: "role",
  clarifier: "It's a trajectory you build.",
  clarifierKw: ["trajectory"],
  beats: [
    {
      label: "COMPETITIVE",
      caption: "Roles without AI fluency stop being economical.",
      captionKw: ["economical"],
    },
    {
      label: "CAPACITY",
      caption: "AI fluency multiplies what one person can do.",
      captionKw: [],
    },
    {
      label: "CULTURAL",
      caption: "Modern teams default to AI-augmented work.",
      captionKw: [],
    },
    {
      label: "PERSONAL",
      caption: "From writing the answer to choosing the question.",
      captionKw: ["choosing the question"],
    },
  ],
  closing:
    "The bridge from where you are to wherever you need to be.",
  closingKw: ["where you are"],
  heroSrc: "/heroes/c5-path.jpg",
  heroAlt: "Path leading into the distance",
  darkenStrength: 0.25,
};

// ─── Bridge — Mindset → Mechanics ──────────────────────────────────────────

export interface BridgeQuoteLine {
  text: string;
  kw: readonly string[];
}

export interface BridgeContent {
  figLabel: string;
  quoteLines: readonly BridgeQuoteLine[];
  attribution: string;
  handoff: string;
  handoffKw: readonly string[];
  heroSrc: string;
  heroAlt: string;
  darkenStrength: number;
}

export const bridgeContent: BridgeContent = {
  figLabel: "FROM MINDSET TO MECHANICS",
  quoteLines: [
    { text: "Knowledge is power.", kw: ["power"] },
    { text: "Information is liberating.", kw: ["liberating"] },
    {
      text:
        "Education is the premise of progress, in every society, in every family.",
      kw: ["family"],
    },
  ],
  attribution: "— Kofi Annan",
  handoff: "From here, the how.",
  handoffKw: ["how"],
  heroSrc: "/heroes/bridge-foundation.jpg",
  heroAlt: "Foundation under construction at dawn",
  darkenStrength: 0.08,
};
