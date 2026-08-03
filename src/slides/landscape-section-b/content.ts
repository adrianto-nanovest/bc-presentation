// Section B — Landscape (B.1–B.5) content. Single source of truth for all
// text strings + keyword arrays used by the five landscape slides.
//
// Conventions match the rest of the deck (see ../foundation-core/content.ts):
//   - Plain strings, sibling `*Kw` / `kw` substring arrays.
//   - 1–3 keywords per chunk; copper-400 italic at render time.

// ─── B.1 — The AI Evolution Journey ────────────────────────────────────────

export type B1EraKey =
  | "rule-based"
  | "statistical"
  | "deep-learning"
  | "llm"
  | "agentic"
  | "agi";

export interface B1Era {
  key: B1EraKey;
  label: string;       // "RULE-BASED" — full label, shown in hover popover
  /** Optional one-line abbreviation for the always-visible label box.
   *  Used when `label` is too long to fit on one line at 11px mono. */
  shortLabel?: string;
  years: string;       // "1970s–80s"
  caption: string;     // plain caption, single short sentence (~10–15 words)
  captionKw: readonly string[];
  /** Label-box vertical position relative to the rail. */
  position: "above" | "below";
  /** One short sentence — concrete artifact/system that defines the era. */
  signatureArtifact: string;
  /** One short sentence — knowledge-work flavored, audience-neutral. */
  realWorldEquivalent: string;
  hereMarker?: boolean;
  dimmed?: boolean;    // for AGI (forecast)
}

export interface B1Content {
  figLabel: string;
  slideTitle: string;
  slideTitleKw: readonly string[];
  eras: readonly B1Era[];
  footerCaption: string;
  footerCaptionKw: readonly string[];
}

export const b1Content: B1Content = {
  figLabel: "FROM RULES TO REASONING",
  slideTitle: "Seventy-five years of AI, in one glance.",
  slideTitleKw: ["one glance"],
  eras: [
    {
      key: "rule-based",
      label: "RULE-BASED",
      years: "1970s–80s",
      caption: "Follows hand-written if-then rules. No learning.",
      captionKw: ["if-then rules"],
      position: "above",
      signatureArtifact:
        "MYCIN medical expert system; first rule-based email filters.",
      realWorldEquivalent:
        "Your spam folder when it ran on hand-written rules.",
    },
    {
      key: "statistical",
      label: "STATISTICAL LEARNING",
      years: "1990s–2010s",
      caption: "Finds patterns in data instead of being told the rules.",
      captionKw: ["patterns in data"],
      position: "below",
      signatureArtifact:
        "Amazon collaborative filtering (2003); the Netflix Prize (2006).",
      realWorldEquivalent:
        "Netflix or Spotify quietly learning what you'll click next.",
    },
    {
      key: "deep-learning",
      label: "DEEP LEARNING & PERCEPTION",
      shortLabel: "DEEP LEARNING",
      years: "2012–2022",
      caption: "Learns to see and hear from raw pixels and audio.",
      captionKw: ["see and hear"],
      position: "above",
      signatureArtifact:
        "AlexNet's 2012 ImageNet win; the 2017 Transformer paper.",
      realWorldEquivalent:
        "Face unlock on your phone; Siri finally understanding you.",
    },
    {
      key: "llm",
      label: "LARGE LANGUAGE MODELS",
      years: "2022–2024",
      caption: "Holds a conversation and drafts in plain language.",
      captionKw: ["holds a conversation"],
      position: "below",
      signatureArtifact:
        "ChatGPT — 100M users in two months, fastest launch in history.",
      realWorldEquivalent:
        "The chatbot you reach for to draft emails and summarise docs.",
    },
    {
      key: "agentic",
      label: "AGENTIC REASONING",
      years: "2024–2026",
      caption: "Thinks, plans, uses tools, and works for minutes on a task.",
      captionKw: ["plans, uses tools"],
      position: "above",
      signatureArtifact:
        "OpenAI o1, Claude computer use, Sonnet 4.5 leading SWE-bench.",
      realWorldEquivalent:
        "An assistant that opens your tools and finishes the task itself.",
      hereMarker: true,
    },
    {
      key: "agi",
      label: "AGI (emerging)",
      years: "2026–27+",
      caption: "Reasons at expert level across most knowledge-work domains.",
      captionKw: ["expert level"],
      position: "below",
      signatureArtifact:
        "Anthropic forecasts Nobel-level reasoning by late 2026 / early 2027.",
      realWorldEquivalent:
        "A teammate who could lead research or strategy on day one.",
      dimmed: true,
    },
  ],
  footerCaption:
    "Every stage is still alive in some part of your workflow — the frontier just moved.",
  footerCaptionKw: ["frontier just moved"],
};

// ─── B.2 — AI Fields & Terminology (nested rings) ──────────────────────────

export interface B2Tier {
  tier: 1 | 2 | 3 | 4 | 5;
  /** Full tier name — used by the right-panel detail header. */
  label: string;
  /** Compact label hung off each ring in NestedRingStack. */
  shortLabel: string;
  caption: string;
  captionKw: readonly string[];
  /** Serif italic single-line essence (right-panel headline subline). */
  essence: string;
  essenceKw: readonly string[];
  /** 3–4 short bullets — each one crisp point (right-panel body). */
  bullets: readonly string[];
  /** 3 short chips (1–3 words each) rendered on a single row. */
  examples: readonly string[];
}

export interface B2Content {
  figLabel: string;
  slideTitle: string;
  slideTitleKw: readonly string[];
  tiers: readonly B2Tier[];
  footerCaption: string;
  footerCaptionKw: readonly string[];
  /** @deprecated replaced by footerCaption — retained for compat, unused. */
  anchor: string;
  /** @deprecated replaced by footerCaptionKw — retained for compat, unused. */
  anchorKw: readonly string[];
}

export const b2Content: B2Content = {
  figLabel: "NESTED, NOT EQUAL",
  slideTitle: "Five rings, one nested family.",
  slideTitleKw: ["nested"],
  tiers: [
    {
      tier: 1,
      label: "ARTIFICIAL INTELLIGENCE",
      shortLabel: "AI",
      caption: "Any system that mimics human intelligence.",
      captionKw: [],
      essence: "The umbrella over every machine that ever tried to think.",
      essenceKw: ["umbrella"],
      bullets: [
        "The broadest term: any system that performs tasks that normally need human intelligence.",
        "Coined in 1956 at Dartmouth — older than the laptop, older than the internet.",
        "Spans hand-coded rules to self-driving cars; not all AI learns.",
        "Every ring inside this one — ML, deep learning, LLMs — is still AI.",
      ],
      examples: ["Chess Engines", "Calendars", "Routing"],
    },
    {
      tier: 2,
      label: "MACHINE LEARNING",
      shortLabel: "ML",
      caption: "AI that learns from examples instead of rules.",
      captionKw: [],
      essence: "Intelligence that emerges from experience, not from instructions.",
      essenceKw: ["experience"],
      bullets: [
        "A subset of AI: instead of hand-written rules, the machine learns patterns from data.",
        "Took off in the 1990s–2000s as data and compute became cheap.",
        "Workhorse behind fraud detection, recommendations, predictive maintenance.",
        "The leap: humans stop spelling out every rule; the system finds them.",
      ],
      examples: ["Netflix Recs", "Spam Filters", "Auto-tag"],
    },
    {
      tier: 3,
      label: "DEEP LEARNING",
      shortLabel: "DL",
      caption: "ML using neural networks with many layers.",
      captionKw: [],
      essence: "When machines learn to learn through layers of abstraction.",
      essenceKw: ["layers of abstraction"],
      bullets: [
        "ML using neural networks with many layers — hence \"deep.\"",
        "AlexNet's 2012 ImageNet win was the watershed; GPUs made it practical.",
        "Each layer learns a richer abstraction: edges, then shapes, then objects.",
        "Powers face unlock, voice assistants, and image understanding.",
      ],
      examples: ["Face ID", "Siri", "AlexNet"],
    },
    {
      tier: 4,
      label: "GENERATIVE AI",
      shortLabel: "GEN AI",
      caption: "Deep Learning that creates — text, images, video, audio.",
      captionKw: ["creates"],
      essence: "The leap from understanding to creating something new.",
      essenceKw: ["creating something new"],
      bullets: [
        "Deep learning that generates new content instead of just classifying it.",
        "Mainstream since 2022–2023 — diffusion for images, Transformers for text.",
        "Outputs text, images, video, audio, code — anything with a pattern.",
        "Underneath: statistics predicting \"what comes next\" — pixel by pixel, word by word.",
      ],
      examples: ["DALL-E", "Sora", "Suno"],
    },
    {
      tier: 5,
      label: "LARGE LANGUAGE MODELS",
      shortLabel: "LLMs",
      caption: "GenAI for text and language. Claude, GPT, Gemini, Llama.",
      captionKw: [],
      essence: "Language models so large they mimic the texture of human thought.",
      essenceKw: ["texture of human thought"],
      bullets: [
        "Generative AI tuned specifically for language — the innermost ring.",
        "Built on the Transformer architecture (2017); ChatGPT brought it mainstream in 2022.",
        "Predicts the next word billions of times to produce fluent, contextual text.",
        "Fluency is not understanding — they're pattern-matching at planetary scale.",
      ],
      examples: ["ChatGPT", "Claude", "Gemini"],
    },
  ],
  footerCaption: "AI is the envelope; LLMs are the letter inside.",
  footerCaptionKw: ["envelope", "letter"],
  // deprecated: replaced by footerCaption — retained for compat.
  anchor: "Everything inside the box belongs to the box outside it.",
  anchorKw: [],
};

// ─── B.3 — How LLMs Work: The Pipeline and Its Dials ───────────────────────
//
// Replaces the previous "DIALS AND DOMAINS" content. See:
//   docs/specs/2026-05-12-slides-B3-B4-mechanics-and-models.md §2
//   docs/researches/2026-05-12-llm-mechanics-and-parameters.md
//
// Render-time convention: each `*Kw` array lists substrings that should be
// italicised in copper-300 inside the corresponding string.

export interface B3PipelineStage {
  id: "tokenize" | "embed" | "attend" | "predict";
  label: string;
}

export interface B3Pipeline {
  /** Example sentence rendered as five token boxes (TOKENIZE stage). */
  sentence: readonly string[];
  /** Full input sentence shown in the RAW INPUT box at the top of the column
   *  (typewriter-streamed once on mount). */
  inputSentence: string;
  /** Mono-caption label for the RAW INPUT box. */
  inputLabel: string;
  /** Mono-caption label for the PREDICTED NEXT WORD box at the bottom. */
  outputLabel: string;
  /** Prefix shown in the output sentence — the cycling candidate is appended
   *  in copper-300 italic at the end. */
  outputPrefix: string;
  /** Candidate next-tokens shown in the PREDICT & SAMPLE distribution. */
  candidates: readonly string[];
  /** Four named pipeline stages, left → right. */
  stages: readonly B3PipelineStage[];
}

export interface B3ParamTileBullet {
  text: string;
  keywords: readonly string[];
}

export interface B3ParamTile {
  id:
    | "effort"
    | "max-tok"
    | "context"
    | "temp"
    | "top-p"
    | "sys-prompt";
  /** Tile heading in mono-caption caps. */
  label: string;
  /** Up to 3 short bullet fragments (≤ one line each at tile width).
   *  Each bullet renders with `KW(text, keywords)` for inline italic copper-300. */
  bullets: ReadonlyArray<B3ParamTileBullet>;
}

export interface B3Content {
  figLabel: string;
  /** Left column section title (above pipeline). Mono-caps, A.1 convention. */
  leftSectionTitle: string;
  /** Right column section title (above tile grid). Mono-caps, A.1 convention. */
  rightSectionTitle: string;
  slideTitle: string;
  slideTitleKw: readonly string[];
  pipeline: B3Pipeline;
  paramTiles: readonly B3ParamTile[];
  footer: string;
  footerKw: readonly string[];
}

export const b3Content: B3Content = {
  figLabel: "MECHANICS & CONTROLS",
  leftSectionTitle: "NEXT-WORD PREDICTION",
  rightSectionTitle: "MODEL PARAMETERS",
  slideTitle: "How LLMs work — the pipeline and its dials.",
  slideTitleKw: ["pipeline", "dials"],
  pipeline: {
    sentence: ["The", "report", "needs", "to", "be"],
    inputSentence: "The report needs to be ___",
    inputLabel: "RAW INPUT",
    outputLabel: "PREDICTED NEXT WORD",
    outputPrefix: "The report needs to be ",
    candidates: ["completed", "reviewed", "submitted", "finished"],
    stages: [
      { id: "tokenize", label: "TOKENIZE" },
      { id: "embed", label: "EMBED" },
      { id: "attend", label: "ATTEND" },
      { id: "predict", label: "PREDICT & SAMPLE" },
    ],
  },
  paramTiles: [
    {
      id: "effort",
      label: "EFFORT",
      bullets: [
        { text: "Controls how long it thinks", keywords: ["thinks"] },
        { text: "Higher = deeper reasoning", keywords: ["deeper"] },
        { text: "Cost grows with effort", keywords: ["Cost"] },
      ],
    },
    {
      id: "max-tok",
      label: "MAX TOKENS",
      bullets: [
        { text: "Hard ceiling on output", keywords: ["ceiling"] },
        { text: "Cuts off mid-sentence if hit", keywords: ["cuts off"] },
        { text: "Smaller cap = lower cost", keywords: ["lower cost"] },
      ],
    },
    {
      id: "context",
      label: "CONTEXT WINDOW",
      bullets: [
        { text: "Total memory per turn", keywords: ["memory"] },
        { text: "Input + output share it", keywords: ["share"] },
        { text: "Bigger = pricier, less sharp", keywords: ["less sharp"] },
      ],
    },
    {
      id: "temp",
      label: "TEMPERATURE",
      bullets: [
        { text: "The creativity knob", keywords: ["creativity"] },
        { text: "Low = predictable, safe", keywords: ["predictable"] },
        { text: "High = inventive, wild", keywords: ["inventive"] },
      ],
    },
    {
      id: "top-p",
      label: "TOP-P",
      bullets: [
        { text: "Keeps the likely candidates", keywords: ["likely"] },
        { text: "Trims the long tail", keywords: ["trims"] },
        { text: "Tames wildness, not voice", keywords: ["Tames"] },
      ],
    },
    {
      id: "sys-prompt",
      label: "SYSTEM PROMPT",
      bullets: [
        { text: "Standing rules for the model", keywords: ["rules"] },
        { text: "Sets role, tone, language", keywords: ["role"] },
        { text: "Persists across every turn", keywords: ["Persists"] },
      ],
    },
  ],
  footer:
    "The mechanics are universal. Which model — and how you tune it — is yours to choose.",
  footerKw: ["mechanics", "Which model"],
};

// ─── B.4 — Models by Category: Frontier vs Open-Weight ─────────────────────
//
// Replaces the previous "TIERS, COMPETITORS, AND WHERE THE WORK RUNS" content.
// See:
//   docs/specs/2026-05-12-slides-B3-B4-mechanics-and-models.md §3
//   docs/researches/2026-06-08-llm-benchmarks-june-2026.md  (Artificial Analysis snapshot)
//   docs/researches/2026-05-11-foundation-model-landscape.md  (canonical model + tool names)
//
// Note on Moonshot model name: the spec text reads "Kimi K2.5" but the research
// (and Moonshot's April 2026 release) standardises on "Kimi K2.6" — we use K2.6
// throughout the content layer. The slide-level spec call-out can be reconciled
// at delivery time.

export type B4CategoryLayout = "R1" | "R2" | "R3";

/** Lucide icon names used by B4 category cards. Keep narrow so the icon
 *  import map in B4CategoryCard.tsx stays bundle-tight. */
export type B4IconName =
  | "PenLine"
  | "Code2"
  | "Wrench"
  | "Eye"
  | "Sparkles"
  | "DollarSign";

export type B4CategoryId =
  | "write-reason"
  | "code"
  | "agentic"
  | "multimodal"
  | "creative"
  | "cost-intel";

export interface B4Category {
  id: B4CategoryId;
  /** Left-card label (Inter caps). */
  label: string;
  /** Sub-label (mono-caption); names the benchmark or framing for the row. */
  subLabel: string;
  /** Right-pane layout switch. */
  layout: B4CategoryLayout;
  /** Lucide icon name; rendered 22px copper-300 in the card. */
  iconName: B4IconName;
  /** One short serif-italic line (≤ 90 chars) summarising the category. */
  essence: string;
  /** Substrings inside `essence` to italicise in copper-300. */
  essenceKw: readonly string[];
  /** Single italic footer line rendered at the bottom of the detail panel
   *  (Task 20). Cost-Intelligence is the exception — it uses the scatter's
   *  own annotation in lieu of a footnote, so `footnote` is empty there. */
  footnote: string;
  /** Substrings inside `footnote` to italicise in copper-300. */
  footnoteKw: readonly string[];
}

export interface B4BenchmarkRow {
  name: string;
  /** Raw benchmark score (AA Intelligence Index or category composite). */
  score: number;
}

export interface B4OpenWeightRow extends B4BenchmarkRow {
  /** Italic tagline shown beneath the open-weight bar. */
  tagline: string;
}

export interface B4BenchmarkBlock {
  /** Top-3 frontier models for this category. */
  frontier: readonly B4BenchmarkRow[];
  /** Single open-weight champion for this category. */
  openWeight: B4OpenWeightRow;
  /** Bar full-width reference. **100 for every category** — a shared
   *  denominator, so a score label can never outrun its own bar. The old
   *  per-category maxima (65 / 65 / 85 / 100) silently clipped any bar that
   *  outgrew them, which is the hazard this deletes rather than resets. */
  scaleMax: number;
  /** Optional unit suffix on each score label (e.g. "%" for MMMU). */
  unit?: string;
  /** Decimal places on the score label. Matches how AA itself publishes the
   *  figure — whole numbers for the Intelligence Index and MMMU-Pro, one
   *  decimal for the Coding and Agentic indices. Defaults to 1. */
  decimals?: number;
}

/** R1 chart data, keyed by category id (only R1 categories appear here). */
export interface B4Benchmarks {
  "write-reason": B4BenchmarkBlock;
  code: B4BenchmarkBlock;
  agentic: B4BenchmarkBlock;
  multimodal: B4BenchmarkBlock;
}

/** Four media arenas, matching how AA groups them. Speech (TTS) and music
 *  (vocals) are separate leaderboards and separate model classes — collapsing
 *  them into one "voice" group put Suno, which makes songs, under a heading
 *  about voices. */
export interface B4CreativeChips {
  image: readonly string[];
  video: readonly string[];
  speech: readonly string[];
  music: readonly string[];
}

export interface B4ScatterPoint {
  name: string;
  /** AA Intelligence Index score. */
  intelligence: number;
  /** Cost to run one Intelligence-Index task, USD. */
  cost: number;
  kind: "frontier" | "open-weight";
}

export interface B4ScatterAnnotation {
  from: string;
  to: string;
  /** Mid-arrow label, italic. */
  label: string;
}

export interface B4Heatmap {
  rows: readonly string[];        // 4 model rows
  columns: readonly string[];     // 5 category columns (CREATIVE excluded)
  /** 0–1 normalised scores. COST column is inverted (cheaper = higher). */
  scores: readonly (readonly number[])[];
  /** Italic descriptor rendered beneath the matrix. */
  descriptor: string;
}

/** Five bands. `best` is the strict column leader; the other four are set by
 *  distance from that leader, so the grid is reproducible rather than
 *  hand-tuned (see the derivation comment above `qualitativeSummary`). */
export type B4QualitativeCell =
  | "best"
  | "very-good"
  | "good"
  | "average"
  | "weak";

export interface B4QualitativeSummary {
  /** 4 model rows (top → bottom). */
  rows: readonly string[];
  /** 5 category columns (left → right). */
  columns: readonly string[];
  /** 4×5 qualitative grid, derived at content-time from this slide's own
   *  `benchmarks` scores and `scatter` costs — never from `heatmap`. */
  cells: readonly (readonly B4QualitativeCell[])[];
  /** Header above the matrix (mono-caps). */
  header: string;
  /** Serif-italic descriptor below the matrix. */
  footer: string;
  /** Substrings inside `footer` to italicise in copper-300. */
  footerKw: readonly string[];
}

export interface B4Content {
  figLabel: string;
  slideTitle: string;
  slideTitleKw: readonly string[];
  leftSectionTitle: string;
  rightSectionTitle: string;
  rightSectionTitlePinned: string;
  rightSectionTitleSummary: string;
  categories: readonly B4Category[];
  benchmarks: B4Benchmarks;
  creativeChips: B4CreativeChips;
  scatter: readonly B4ScatterPoint[];
  scatterAnnotation: B4ScatterAnnotation;
  /** @deprecated retained for compat; new slide uses `qualitativeSummary`. */
  heatmap: B4Heatmap;
  qualitativeSummary: B4QualitativeSummary;
  footer: string;
  footerKw: readonly string[];
  /** Right-aligned freshness stamp below the matrix. Also carries the
   *  effort-tier disclosure — the R1 bars are deliberately bare, so this is
   *  the one place the reader learns the scores are at maximum effort. */
  freshness: string;
  /** One mono line under the freshness stamp at step 1. It exists to correct
   *  the single thing the open-weight column would otherwise imply — that
   *  open weights buy you a security benefit. They do not: every open model
   *  near the frontier is a 200B–1T MoE consumed through somebody's API. The
   *  full security argument lives at leader D.4. */
  onPremNote: string;
  /** Substrings inside `onPremNote` to highlight in copper. */
  onPremNoteKw: readonly string[];
}

// ─── B.4 data vintage ───────────────────────────────────────────────────────
// EVERY number below comes from ONE capture: Artificial Analysis Intelligence
// Index **v4.1**, values confirmed **2 August 2026**. Sources:
//   docs/researches/2026-07-31-artificialanalysis-model-data.md   (roster)
//   docs/researches/2026-08-02-aa-gemini-pro-addendum.md          (corrections)
//   docs/references/artificialanalysis/2026-07-31-*.png           (media arenas)
//
// The failure mode this file guards against is MIXED VINTAGE — a pane that
// still shows June bars under an August freshness stamp is worse than no
// refresh at all. If you move one figure, re-read all of them, and re-derive
// `qualitativeSummary.cells`. `tests/unit/b4-models-by-category.test.tsx`
// re-applies the banding rule to these numbers and fails if the two disagree.
//
// Two figures here are known-unstable and were current at the stamp date:
// DeepSeek V4 Flash's Open-Weights classification moved once inside 48 hours,
// and GLM-5.2's cost moved 138% in the same window. Both are presented as
// current state, not as corrections to AA.
export const b4Content: B4Content = {
  figLabel: "MODELS BY CATEGORY",
  slideTitle: "Six categories, one map of what to use where.",
  slideTitleKw: ["to use where"],
  leftSectionTitle: "SIX CATEGORIES",
  rightSectionTitle: "MODEL DETAILS",
  rightSectionTitlePinned: "PINNED · MODEL DETAILS",
  rightSectionTitleSummary: "AT A GLANCE",
  categories: [
    {
      id: "write-reason",
      label: "WRITE & REASON",
      subLabel: "AA Intelligence Index",
      layout: "R1",
      iconName: "PenLine",
      essence: "Drafting, summarising, and chain-of-thought reasoning.",
      essenceKw: ["chain-of-thought"],
      // Footnotes carry MEANING, never numbers. The gap figure lives in the
      // open-weight tagline only; exact values stay on each bar's own score
      // label. Stating it in three places is what produced this refresh.
      footnote:
        "The general-purpose score. Two vendors and one open-weight model sit within a few points.",
      footnoteKw: ["within a few points"],
    },
    {
      id: "code",
      label: "CODE",
      subLabel: "AA Coding Index",
      layout: "R1",
      iconName: "Code2",
      essence: "Writing, refactoring, and debugging across whole repos.",
      essenceKw: ["whole repos"],
      footnote:
        "The tightest race of the four — open weights have all but caught up here.",
      footnoteKw: ["all but caught up"],
    },
    {
      id: "agentic",
      label: "AGENTIC",
      subLabel: "AA Agentic Index",
      layout: "R1",
      iconName: "Wrench",
      essence: "Planning multi-step work, calling tools, finishing tasks.",
      essenceKw: ["calling tools"],
      footnote:
        "Planning and tool-calling is where the frontier still holds a real lead.",
      footnoteKw: ["still holds a real lead"],
    },
    {
      id: "multimodal",
      label: "MULTIMODAL",
      subLabel: "MMMU-Pro",
      layout: "R1",
      iconName: "Eye",
      essence: "Reading images, video, and speech alongside text.",
      essenceKw: ["images, video, and speech"],
      footnote:
        "Reading scans, photos and charts. Everyone is close; this is table stakes now.",
      footnoteKw: ["table stakes"],
    },
    {
      id: "creative",
      label: "CREATIVE TOOLS",
      // Elo from human pairwise preference — a different metric class from the
      // four index panels, and it must not read as comparable to them.
      subLabel: "Elo arenas · human preference",
      layout: "R2",
      iconName: "Sparkles",
      // "voice" retired alongside the VOICE group: AA runs Speech (TTS) and
      // Vocals (music) as separate arenas, and Suno makes songs, not voices.
      essence:
        "Generating images, video, speech, and music — a different model class.",
      essenceKw: ["different model class"],
      footnote:
        "Different model class — different leaderboards. None of the language models above compete here.",
      footnoteKw: ["Different model class"],
    },
    {
      id: "cost-intel",
      label: "COST × INTELLIGENCE",
      subLabel: "What capability costs",
      layout: "R3",
      iconName: "DollarSign",
      essence: "How much capability you get per dollar spent.",
      essenceKw: ["per dollar"],
      footnote: "",
      footnoteKw: [],
    },
  ],
  // R1 · four benchmark panels. One roster across all four — three closed
  // vendors plus Kimi K3 as the single open-weight through-line, chosen over
  // GLM-5.2 because it carries the thesis (1.8 points off on code).
  //
  // Bar names are BARE. No effort tier rides along on the chart; the tier is
  // disclosed once, in `freshness`. Every score below is the model's figure at
  // maximum reasoning effort in the 2 Aug 2026 v4.1 capture.
  benchmarks: {
    // WRITE & REASON — AA Intelligence Index v4.1. AA publishes this one as a
    // whole number, hence `decimals: 0`.
    "write-reason": {
      scaleMax: 100,
      decimals: 0,
      frontier: [
        { name: "Claude Opus 5", score: 61 },
        { name: "GPT-5.6 Sol", score: 59 },
        { name: "Gemini 3.6 Flash", score: 50 },
      ],
      openWeight: {
        name: "Kimi K3",
        score: 57,
        tagline: "4 pts off the lead",
      },
    },
    // CODE — AA Coding Index (Terminal-Bench v2.1, SciCode). The tightest of
    // the four: Kimi K3 is 1.8 points off a closed leader.
    code: {
      scaleMax: 100,
      frontier: [
        { name: "Claude Opus 5", score: 78.0 },
        { name: "GPT-5.6 Sol", score: 77.4 },
        { name: "Gemini 3.6 Flash", score: 69.2 },
      ],
      openWeight: {
        name: "Kimi K3",
        score: 76.2,
        tagline: "1.8 pts off the lead",
      },
    },
    // AGENTIC — AA Agentic Index (GDPval-AA v2, τ³-Banking). Gemini 3.6 Flash's
    // 38.7 is the widest spread on the slide and is deliberately shown: it is
    // what the data says, and it is spoken to rather than softened.
    agentic: {
      scaleMax: 100,
      frontier: [
        { name: "Claude Opus 5", score: 55.3 },
        { name: "GPT-5.6 Sol", score: 54.0 },
        { name: "Gemini 3.6 Flash", score: 38.7 },
      ],
      openWeight: {
        name: "Kimi K3",
        score: 50.1,
        tagline: "5.2 pts off the lead",
      },
    },
    // MULTIMODAL — MMMU-Pro (visual reasoning). NOT a component of the
    // Intelligence Index; AA renders it as whole percentages, so GPT-5.6 Sol
    // and Gemini 3.6 Flash at 83% may not be a true tie.
    multimodal: {
      scaleMax: 100,
      decimals: 0,
      unit: "%",
      frontier: [
        { name: "Claude Opus 5", score: 85 },
        { name: "GPT-5.6 Sol", score: 83 },
        { name: "Gemini 3.6 Flash", score: 83 },
      ],
      openWeight: {
        name: "Kimi K3",
        score: 81,
        tagline: "4 pts off the lead",
      },
    },
  },
  // R2 · media arenas, ranked by Elo. Names only — an Elo figure next to the
  // index panels would invite a comparison that does not hold.
  //
  // Two judgement calls, recorded so they are not rediscovered as bugs:
  //   • Nano Banana 2 over MAI-Image-2.5 — AA puts both in rank Range 3–6 with
  //     overlapping CIs, i.e. statistically tied. Tie broke toward the tool
  //     this room may have touched.
  //   • Veo 3.1 (video rank 11) and ElevenLabs (speech rank 10) dropped. Both
  //     are the recognisable names and both are genuinely behind — not ties.
  //     Pre-empt those two verbally; they do not belong on the slide.
  creativeChips: {
    image: ["GPT Image 2", "Reve 2.1", "Nano Banana 2"],
    video: ["Gemini Omni Flash", "MiniMax H3", "Dreamina Seedance 2.0"],
    speech: ["Simba 3.2", "Qwen-Audio-3.0-TTS-Plus", "Gemini 3.1 Flash TTS"],
    music: ["Suno V5.5", "Mureka V9"],
  },
  // R3 scatter — X = cost to run ONE Intelligence-Index task (USD, log);
  // Y = AA Intelligence Index. Per-task replaces "cost to run the full Index",
  // which is the price of running a 9-evaluation suite once — unexplainable in
  // the room and irrelevant to it.
  //
  // Eight dots, EIGHT vendors: one model each, so the picture is the market
  // rather than a vendor's product line. Worth naming rather than being asked:
  // the entire open column is Chinese labs.
  scatter: [
    { name: "Claude Opus 5", intelligence: 61, cost: 2.34, kind: "frontier" },
    { name: "GPT-5.6 Sol", intelligence: 59, cost: 1.86, kind: "frontier" },
    { name: "Grok 4.5", intelligence: 54, cost: 0.44, kind: "frontier" },
    { name: "Gemini 3.6 Flash", intelligence: 50, cost: 0.56, kind: "frontier" },
    { name: "Kimi K3", intelligence: 57, cost: 0.86, kind: "open-weight" },
    // GLM-5.2's cost moved 138% in the 48 h before this capture (index
    // unchanged at 51, cause unestablished). The freshness stamp is what makes
    // the figure defensible.
    { name: "GLM-5.2", intelligence: 51, cost: 0.69, kind: "open-weight" },
    // Open Weights, MIT-licensed, weights on Hugging Face — the 31 July
    // reading of "Proprietary" was refuted on 2 August. This is what puts a
    // 50-index model at $0.03/task into the open column.
    { name: "DeepSeek V4 Flash", intelligence: 50, cost: 0.03, kind: "open-weight" },
    { name: "MiniMax-M3", intelligence: 44, cost: 0.14, kind: "open-weight" },
  ],
  // 50/61 = 82% of the intelligence; 2.34/0.03 = 1/78th the cost. Both halves
  // are reproducible from the two dots the arrow joins — the retired
  // "90% / 1/15th" claim matched no pair in the data.
  scatterAnnotation: {
    from: "Claude Opus 5",
    to: "DeepSeek V4 Flash",
    label: "82% of the intelligence, 1/78th the cost",
  },
  // R4 heatmap — DEPRECATED and UNRENDERED. The slide uses qualitativeSummary.
  //
  // This is the one block in this file that is NOT August vintage: it is frozen
  // June 2026 data and is deliberately left that way. Do not refresh it (that
  // would imply it is live), do not delete it (out of scope here), and do not
  // read a model name out of it. 4 rows × 5 cols, per-column normalised 0–1
  // (COST inverted: cheaper = higher).
  heatmap: {
    rows: ["Claude Opus 4.8", "GPT-5.5", "Gemini 3.1 Pro", "MiniMax-M3"],
    columns: ["WRITE & REASON", "CODE", "AGENTIC", "MULTIMODAL", "COST"],
    scores: [
      // Claude Opus 4.8 — leads reason + agentic
      [1.0, 0.95, 1.0, 0.95, 0.17],
      // GPT-5.5 — leads code
      [0.95, 1.0, 0.95, 0.95, 0.16],
      // Gemini — leads MULTIMODAL (3.5 Flash)
      [0.95, 0.95, 0.95, 1.0, 0.4],
      // MiniMax-M3 (open-weight; competitive agentic + multimodal, wins COST)
      [0.9, 0.87, 0.95, 0.95, 1.0],
    ],
    descriptor:
      "Frontier leads 4/5. Open-weight wins cost. The gap is fine-tunable.",
  },
  // Qualitative 4×5 matrix — DERIVED from the `benchmarks` and `scatter` values
  // above, never hand-set. Rows follow the R1 roster.
  //
  //   BEST    = strict column leader (two BEST only on an exact tie)
  //   then, by distance from that leader:
  //     capability  ≥95% V.GOOD · 88–95% GOOD · 75–88% AVERAGE · <75% WEAK
  //     cost, as a multiple of the cheapest in the column:
  //                 ≤1.75× V.GOOD · ≤2.5× GOOD · ≤4× AVERAGE · >4× WEAK
  //
  // Cost needs its own bands because price ratios spread far wider than score
  // ratios — the capability thresholds would flatten the whole column to WEAK.
  //
  // Worked, so a reviewer can check it without a calculator:
  //   W&R 61 → Sol 96.7% · Kimi 93.4% · Gemini 82.0%
  //   CODE 78.0 → Sol 99.2% · Kimi 97.7% · Gemini 88.7%
  //   AGENTIC 55.3 → Sol 97.6% · Kimi 90.6% · Gemini 70.0%
  //   MULTIMODAL 85 → Sol 97.6% · Gemini 97.6% · Kimi 95.3%
  //   COST $0.56 → Kimi 1.54× · Sol 3.32× · Opus 5 4.18×
  qualitativeSummary: {
    rows: ["Claude Opus 5", "GPT-5.6 Sol", "Gemini 3.6 Flash", "Kimi K3"],
    columns: ["WRITE & REASON", "CODE", "AGENTIC", "MULTIMODAL", "COST"],
    cells: [
      // Claude Opus 5 — tops every capability column, and pays for it
      ["best",      "best",      "best",      "best",      "weak"],
      // GPT-5.6 Sol — shadows the leader everywhere, at mid price
      ["very-good", "very-good", "very-good", "very-good", "average"],
      // Gemini 3.6 Flash — cheapest, and uneven
      ["average",   "good",      "weak",      "very-good", "best"],
      // Kimi K3 — never best, never bad, second-lowest price. The value row,
      // which is the argument the slide is making.
      ["good",      "very-good", "good",      "very-good", "very-good"],
    ],
    header: "AT A GLANCE — RELATIVE STRENGTH",
    footer:
      "Capability has one leader. Cost has another. Kimi K3 is close to both.",
    footerKw: ["Capability", "Cost", "Kimi K3"],
  },
  footer:
    "The best models are within a few points of each other. The bills are not.",
  footerKw: ["within a few points", "The bills are not"],
  freshness:
    "Artificial Analysis · 2 August 2026 · scores at maximum reasoning effort",
  onPremNote:
    "The most secure setup is the one you host yourself. Only sub-100B models are affordable to run — far behind in general, possibly better than the frontier at the job you fine-tune them for.",
  onPremNoteKw: ["host yourself", "sub-100B", "fine-tune"],
};

// ─── B.5 — Today's Landscape + Inverse Hook ────────────────────────────────

export interface B5Bar {
  pct: number;             // counter value, e.g. 79
  label: string;
  widthPct: number;        // visual bar width in pct (0–100)
  variant: "primary" | "dim" | "dashed";
}

export interface B5Content {
  figLabel: string;
  bigStat: number;         // 88
  bigStatSuffix: string;   // "%"
  bigStatCaption: string;
  bigStatCaptionKw: readonly string[];
  /** Mono-caps source citation for the big stat — rendered beneath the
   *  88% block at step 0 (mirrors D.1's caption Reveal). */
  bigStatSource: string;
  mechanism: string;       // "And yet..."
  /** Display headline above the 3-bar funnel (step 2+). */
  chartTitle: string;
  /** Mono-caps subtitle beneath chartTitle citing the survey sources. */
  chartSubtitle: string;
  bars: readonly B5Bar[];
  cliffhanger: string;
  cliffhangerKw: readonly string[];
}

export const b5Content: B5Content = {
  figLabel: "AI LANDSCAPE PARADOX",
  bigStat: 88,
  bigStatSuffix: "%",
  bigStatCaption: "of organizations have adopted AI.",
  bigStatCaptionKw: [],
  bigStatSource: "MCKINSEY — STATE OF AI, 2025",
  mechanism: "And yet...",
  chartTitle: "Adoption is not outcome.",
  chartSubtitle: "MCKINSEY + DELOITTE ENTERPRISE SURVEYS · 2025–2026",
  bars: [
    {
      pct: 88,
      label: "have launched AI initiatives",
      widthPct: 88,
      variant: "primary",
    },
    {
      pct: 25,
      label: "have scaled AI to production",
      widthPct: 25,
      variant: "dim",
    },
    {
      pct: 5.5,
      label: "have realized measurable ROI on their AI investment",
      widthPct: 5.5,
      variant: "dashed",
    },
  ],
  cliffhanger: "What separates them? Not the model — the mental model.",
  cliffhangerKw: ["mental model"],
};
