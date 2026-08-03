// Opening arc — Title + Section A content. Single source of truth for all
// text strings + keyword arrays used by the Title slide and A.1.
//
// Conventions match the rest of the deck (see ../foundation-core/content.ts):
//   - Plain strings only — no inline <em> tags.
//   - A sibling `*Kw` / `kw` array carries substrings that should render with
//     KeywordHighlight (copper-400 italic) at the slide level.
//   - 1–3 keywords per chunk (feedback_keyword_highlighting.md).

// ─── Title ─────────────────────────────────────────────────────────────────

export interface TitleContent {
  displayHeadline: string;
  displayHeadlineKw: readonly string[];
  /** Editorial tagline sitting directly below the headline. */
  tagline: string;
  taglineKw: readonly string[];
  /** Bottom-left credit chip — facilitator name + org, single line. */
  facilitator: string;
  heroSrc: string;
  heroAlt: string;
  darkenStrength: number;
}

export const titleContent: TitleContent = {
  displayHeadline: "From AI Curiosity to AI Capability",
  displayHeadlineKw: [],
  tagline:
    "A working session on the AI stack, the mindset shift, and the new operator role — for everyone, not just engineers.",
  taglineKw: ["mindset shift", "operator role"],
  facilitator: "Adrianto Tedjokusumo · Nanovest",
  heroSrc: "/heroes/title-data-topology.jpg",
  heroAlt: "Abstract copper threads converging in deep space",
  darkenStrength: 0.18,
};

// The workshop chip is NOT authored here: it is the brand label plus the deck
// set's label suffix, derived by `variantLabel` in src/deck-variants.ts. Once
// gh#23 puts the login eyebrow on that same call, the two cannot drift apart.

// ─── A.1 — "What you've already seen" ──────────────────────────────────────

export type A1IconName =
  | "MessageSquare"
  | "FileText"
  | "ScanSearch"
  | "Sparkles"
  | "Map"
  | "PenLine";

export interface A1Capability {
  label: string;
  iconName: A1IconName;
  description: string;
  descriptionKw: readonly string[];
}

export interface A1Question {
  text: string;
  kw: readonly string[];
  /** Full section pointer label, e.g. "SECTION F · TECHNIQUES". The leading
   *  "→ " arrow is rendered by the card component, not stored here. */
  sectionLabel: string;
}

export interface A1Content {
  figLabel: string;
  slideTitle: string;
  slideTitleKw: readonly string[];
  tagline: string;
  taglineKw: readonly string[];
  /** Step-0 centered rule-header above the chip strip. */
  ruleHeader: string;
  /** Step-1 left column heading (above the capability cards). */
  leftHeading: string;
  /** Step-1 right column heading (above the question cards). */
  rightHeading: string;
  capabilities: readonly A1Capability[];
  questions: readonly A1Question[];
  footerCaption: string;
  footerCaptionKw: readonly string[];
}

export const a1Content: A1Content = {
  figLabel: "WHAT YOU'VE ALREADY SEEN",
  slideTitle: "The capabilities you brought to the room.",
  slideTitleKw: ["capabilities"],
  tagline: "What you saw is real. And it opens some questions.",
  taglineKw: ["questions"],
  ruleHeader: "Capabilities Covered",
  leftHeading: "Five capabilities",
  rightHeading: "Questions we'll answer",
  capabilities: [
    {
      label: "AI CHATBOT",
      iconName: "MessageSquare",
      description: "Conversational interfaces that answer, ask back, and follow up.",
      descriptionKw: ["ask back"],
    },
    {
      label: "SUMMARIZATION",
      iconName: "FileText",
      description: "Distilling long content into the parts that actually matter.",
      descriptionKw: ["actually matter"],
    },
    {
      label: "DOCUMENT ANALYSIS",
      iconName: "ScanSearch",
      description: "Reading, parsing, and reasoning over files and forms.",
      descriptionKw: ["reasoning"],
    },
    {
      label: "PROMPT ENGINEERING",
      iconName: "Sparkles",
      description: "Shaping the question so the model gives back what you need.",
      descriptionKw: ["Shaping the question"],
    },
    {
      label: "GEOSPATIAL AI",
      iconName: "Map",
      description: "Layering intelligence over maps, locations, and physical sites.",
      descriptionKw: ["Layering intelligence"],
    },
  ],
  // Order matches downstream section flow: D → E → F → G → H.
  questions: [
    {
      text: "What if you fixed the process before you automated it?",
      kw: ["fixed the process"],
      sectionLabel: "SECTION D · PROCESS & METHODOLOGY",
    },
    {
      text: "What if you never had to re-explain your context again?",
      kw: ["re-explain"],
      sectionLabel: "SECTION E · ENGINEERING FUNDAMENTALS",
    },
    {
      text: "What if you could plug AI into your work, not just chat?",
      kw: ["not just chat"],
      sectionLabel: "SECTION F · TECHNIQUES",
    },
    {
      text: "What if you knew which tool to use, when, and how?",
      kw: ["when, and how"],
      sectionLabel: "SECTION G · TOOLS ECOSYSTEM",
    },
    {
      text: "What if one person's solution became everyone's tool?",
      kw: ["everyone's tool"],
      sectionLabel: "SECTION H · PITFALLS & BEST PRACTICES",
    },
  ],
  footerCaption: "Five capabilities already in the room. Five questions still ahead.",
  footerCaptionKw: ["already", "ahead"],
};

// ─── A.1 (general variant) — "What we mostly know / don't know yet" ────────
//
// Non-Berau BUs have no Session-1 winners to point back at, so the hook trades
// social proof ("your colleagues built this") for familiarity ("you already
// use this daily") — same rhetorical job, different evidence. Structure and
// animation are identical to the Berau A.1; only content differs.

export const a1GeneralContent: A1Content = {
  figLabel: "WHERE WE ALL START",
  slideTitle: "The AI most of us already know.",
  slideTitleKw: ["already know"],
  tagline: "Most of this is familiar by now. And it opens some questions.",
  taglineKw: ["questions"],
  ruleHeader: "What We Mostly Know",
  leftHeading: "What we mostly know",
  rightHeading: "What we don't know yet",
  capabilities: [
    {
      label: "AI CHATBOT",
      iconName: "MessageSquare",
      description: "Conversational interfaces that answer, ask back, and follow up.",
      descriptionKw: ["ask back"],
    },
    {
      label: "SUMMARIZATION",
      iconName: "FileText",
      description: "Distilling long content into the parts that actually matter.",
      descriptionKw: ["actually matter"],
    },
    {
      label: "DOCUMENT ANALYSIS",
      iconName: "ScanSearch",
      description: "Reading, parsing, and reasoning over files and forms.",
      descriptionKw: ["reasoning"],
    },
    {
      label: "DRAFTING & WRITING",
      iconName: "PenLine",
      description: "First passes of emails, reports, and messages in seconds.",
      descriptionKw: ["First passes"],
    },
    {
      label: "PROMPT ENGINEERING",
      iconName: "Sparkles",
      description: "Shaping the question so the model gives back what you need.",
      descriptionKw: ["Shaping the question"],
    },
  ],
  // Shared by reference: these cards ARE the D→H agenda, and sections D–H are
  // identical across variants — sharing the object means an edit can't drift.
  questions: a1Content.questions,
  footerCaption: "Five things we mostly know. Five questions still ahead.",
  footerCaptionKw: ["mostly know", "ahead"],
};
