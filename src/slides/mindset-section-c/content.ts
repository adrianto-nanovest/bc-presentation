// Section C — Mindset (C.1–C.5 + Bridge) content. Single source of truth for
// all text strings + keyword arrays used by the mindset arc and the C→D
// bridge slide.
//
// Conventions match the rest of the deck (see ../foundation-core/content.ts):
//   - Plain strings, sibling `*Kw` substring arrays at the same level.
//   - 1–3 keywords per chunk; copper-400 italic at render time.

// ─── C.1 — Tool → Bridge ───────────────────────────────────────────────────

export interface C1Content {
  figLabel: string;
  headline: string;
  strikethroughWord: string;     // word to strikethrough — "tool"
  clarifier: string;             // "It's a bridge."
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
  figLabel: "FROM TOOL TO BRIDGE",
  headline: "AI is not a tool.",
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

export interface C2Card {
  title: string;            // "MULTIPLIER"
  body: string;
  bodyKw: readonly string[];
}

export interface C2Content {
  figLabel: string;
  recognition: string;
  recognitionItalicClause: string; // "That's a reasonable place to start."
  fearPanel: string;
  arrow: string;
  leveragePanel: string;
  leverageSub: string;            // italic "So I learn to use it."
  cards: readonly C2Card[];
}

export const c2Content: C2Content = {
  figLabel: "FROM FEAR TO LEVERAGE",
  recognition:
    "Most of us start with AI the way we started with Google — type, read, move on. That's a reasonable place to start.",
  recognitionItalicClause: "That's a reasonable place to start.",
  fearPanel: "AI will replace me.",
  arrow: "→",
  leveragePanel: "Someone using AI will.",
  leverageSub: "So I learn to use it.",
  cards: [
    {
      title: "MULTIPLIER",
      body: "10× your existing output on what you already do well.",
      bodyKw: [],
    },
    {
      title: "CO-PILOT",
      body: "AI drafts, you decide. AI types, you think.",
      bodyKw: [],
    },
    {
      title: "FORCE-MULTIPLIER",
      body: "Your team's reach expands without headcount change.",
      bodyKw: [],
    },
  ],
};

// ─── C.3 — Executor → Orchestrator ─────────────────────────────────────────

export interface C3Side {
  label: string;            // "EXECUTOR"
  bullets: readonly string[];
}

export interface C3Content {
  figLabel: string;
  executor: C3Side;
  orchestrator: C3Side;
  punchline: string;
  punchlineKw: readonly string[];
}

export const c3Content: C3Content = {
  figLabel: "A NEW ROLE",
  executor: {
    label: "EXECUTOR",
    bullets: [
      "Write the work line by line",
      "Debug manually",
      "Document everything",
      "Repetitive sub-tasks",
      "Time → typing",
    ],
  },
  orchestrator: {
    label: "ORCHESTRATOR",
    bullets: [
      "Design and architect",
      "Specify intent",
      "Verify and review",
      "Decide and innovate",
      "Time → thinking",
    ],
  },
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
  nodes: readonly C4Node[];   // specify, generate, verify, ship
  humanCaption: string;
  aiCaption: string;
  before: C4Distribution;
  after: C4Distribution;
  punchline: string;
  punchlineKw: readonly string[];
  anchor: string;
  anchorKw: readonly string[];
}

export const c4Content: C4Content = {
  figLabel: "THE NEW WORK SHAPE",
  nodes: [
    { label: "SPECIFY", caption: "what to build, why it's right" },
    { label: "GENERATE", caption: "bulk work — AI does this" },
    { label: "VERIFY", caption: "review, validate, polish" },
    { label: "→ SHIP", caption: "" },
  ],
  humanCaption: "HUMAN WORK: SPECIFY + VERIFY",
  aiCaption: "AI WORK: GENERATE (bulk)",
  before: { specifyPct: 10, generatePct: 80, verifyPct: 10 },
  after: { specifyPct: 30, generatePct: 20, verifyPct: 50 },
  punchline: "More time on what and why. Less time on how to type it.",
  punchlineKw: ["how to type it"],
  anchor: "This is the productivity multiplier.",
  anchorKw: ["productivity multiplier"],
};

// ─── C.5 — Role → Trajectory ───────────────────────────────────────────────

export interface C5Beat {
  label: string;            // "COMPETITIVE"
  caption: string;
  captionKw: readonly string[];
}

export interface C5Content {
  figLabel: string;
  headline: string;
  strikethroughWord: string;    // "role"
  clarifier: string;            // "It's a trajectory you build."
  clarifierKw: readonly string[];
  beats: readonly C5Beat[];
  closing: string;
  closingKw: readonly string[];
  heroSrc: string;
  heroAlt: string;
  darkenStrength: number;
}

export const c5Content: C5Content = {
  figLabel: "WHEREVER YOU GO",
  headline: "It's not a role you take.",
  strikethroughWord: "role",
  clarifier: "It's a trajectory you build.",
  clarifierKw: ["trajectory"],
  beats: [
    {
      label: "COMPETITIVE",
      caption: "Roles without AI fluency fall behind.",
      captionKw: [],
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
      caption: "From repetitive execution to creative judgment.",
      captionKw: ["creative judgment"],
    },
  ],
  closing:
    "The bridge from where you are to wherever you need to be.",
  closingKw: ["wherever you need to be"],
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
  darkenStrength: 0.3,
};
