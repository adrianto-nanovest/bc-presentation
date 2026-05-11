// Opening arc — Title + Section A content. Single source of truth for all
// text strings + keyword arrays used by the Title slide and A.1.
//
// Conventions match the rest of the deck (see ../foundation-core/content.ts):
//   - Plain strings only — no inline <em> tags.
//   - A sibling `*Kw` / `kw` array carries substrings that should render with
//     KeywordHighlight (copper-400 italic) at the slide level.
//   - 1–3 keywords per chunk (feedback_keyword_highlighting.md).
//
// Slide files in this folder consume these typed shapes; later
// implementation passes flesh out the visual layer without renaming fields.

// ─── Title ─────────────────────────────────────────────────────────────────

export interface TitleContent {
  displayHeadline: string;
  displayHeadlineKw: readonly string[];
  subtitle: string;
  attribution: string;
  heroSrc: string;
  heroAlt: string;
  darkenStrength: number;
}

export const titleContent: TitleContent = {
  displayHeadline: "From AI Curiosity to AI Capability",
  // Title is static — no copper italic on the display headline. Keyword
  // array is empty by design; we keep the field so the shape mirrors other
  // headlines and we can re-emphasize later if desired.
  displayHeadlineKw: [],
  subtitle: "BCE AI Catalyst · Vol 2, Session 2",
  attribution: "Adri · Nanovest",
  heroSrc: "/heroes/title-data-topology.jpg",
  heroAlt: "Abstract data topology",
  darkenStrength: 0.1,
};

// ─── A.1 — "What you've already seen" ──────────────────────────────────────

export interface A1Question {
  text: string;
  kw: readonly string[];
  pointer: string; // e.g. "→ Section F"
}

export interface A1Content {
  figLabel: string;       // "WHAT YOU'VE ALREADY SEEN"
  capabilityChips: readonly string[];
  bridgeLine: string;
  bridgeLineKw: readonly string[];
  questions: readonly A1Question[];
}

export const a1Content: A1Content = {
  figLabel: "WHAT YOU'VE ALREADY SEEN",
  capabilityChips: [
    "AI CHATBOT",
    "SUMMARIZATION",
    "DOCUMENT ANALYSIS",
    "PROMPT ENGINEERING",
    "GEOSPATIAL AI",
  ],
  bridgeLine: "What you saw is real. And it opens these questions.",
  bridgeLineKw: ["questions"],
  questions: [
    {
      text: "What if these tools could talk to each other?",
      kw: ["talk to each other"],
      pointer: "→ Section F",
    },
    {
      text: "What if context wasn't a one-shot prompt but a standing memory?",
      kw: ["standing memory"],
      pointer: "→ Section E",
    },
    {
      text: "What if the upstream process was audited before automation?",
      kw: ["upstream process"],
      pointer: "→ Section D",
    },
    {
      text: "What if every solution became a skill others could fork?",
      kw: ["skill others could fork"],
      pointer: "→ Section F+H",
    },
  ],
};
