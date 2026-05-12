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
//   docs/researches/2026-05-12-llm-benchmarks-may-2026.md  (Artificial Analysis snapshot)
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
}

/** R1 chart data, keyed by category id (only R1 categories appear here). */
export interface B4Benchmarks {
  "write-reason": B4BenchmarkBlock;
  code: B4BenchmarkBlock;
  agentic: B4BenchmarkBlock;
  multimodal: B4BenchmarkBlock;
}

export interface B4CreativeChips {
  draw: readonly string[];
  video: readonly string[];
  voice: readonly string[];
  /** Italic explanation of why this category has no numeric chart. */
  footnote: string;
}

export interface B4ScatterPoint {
  name: string;
  /** AA Intelligence Index score. */
  intelligence: number;
  /** Blended cost per 1M tokens, USD. */
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

export type B4QualitativeCell = "best" | "good" | "average" | "weak";

export interface B4QualitativeSummary {
  /** 4 model rows (top → bottom). */
  rows: readonly string[];
  /** 5 category columns (left → right). */
  columns: readonly string[];
  /** 4×5 qualitative grid, derived once at content-time from heatmap.scores. */
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
  /** Right-aligned freshness stamp in the footer band. */
  freshness: string;
}

export const b4Content: B4Content = {
  figLabel: "FRONTIER vs OPEN-WEIGHT",
  slideTitle: "Six categories, one map of what wins where.",
  slideTitleKw: ["wins where"],
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
      footnote:
        "Frontier leads on reasoning; the open-weight gap is six points and shrinking.",
      footnoteKw: ["six points"],
    },
    {
      id: "code",
      label: "CODE",
      subLabel: "SWE-bench Verified",
      layout: "R1",
      iconName: "Code2",
      essence: "Writing, refactoring, and debugging across whole repos.",
      essenceKw: ["whole repos"],
      footnote:
        "Top frontier models clear most graded tasks; open-weight catches the rest with prompting.",
      footnoteKw: ["open-weight catches"],
    },
    {
      id: "agentic",
      label: "AGENTIC",
      subLabel: "Tau-bench / Agentic",
      layout: "R1",
      iconName: "Wrench",
      essence: "Planning multi-step work, calling tools, finishing tasks.",
      essenceKw: ["calling tools"],
      footnote:
        "Tool-calling reliability is the new battleground — open-weight is six points back.",
      footnoteKw: ["Tool-calling reliability"],
    },
    {
      id: "multimodal",
      label: "MULTIMODAL",
      subLabel: "MMMU",
      layout: "R1",
      iconName: "Eye",
      essence: "Reading images, video, and speech alongside text.",
      essenceKw: ["images, video, and speech"],
      footnote:
        "Only one open-weight model accepts video; the rest stop at text + image.",
      footnoteKw: ["video"],
    },
    {
      id: "creative",
      label: "CREATIVE TOOLS",
      subLabel: "Different model class",
      layout: "R2",
      iconName: "Sparkles",
      essence: "Generating images, video, and voice — different model class.",
      essenceKw: ["different model class"],
      footnote:
        "Different model class — different leaderboards. None of the named eight above compete here.",
      footnoteKw: ["Different model class"],
    },
    {
      id: "cost-intel",
      label: "COST × INTELLIGENCE",
      subLabel: "Open-weight punchline",
      layout: "R3",
      iconName: "DollarSign",
      essence: "How much capability you get per dollar spent.",
      essenceKw: ["per dollar"],
      footnote: "",
      footnoteKw: [],
    },
  ],
  benchmarks: {
    // WRITE & REASON — AA Intelligence Index, May 2026.
    // GPT-5.5 (xhigh) 60, Opus 4.7 57, Gemini 3.1 Pro 57, Kimi K2.6 54.
    // (Spec drafted "Opus ~58 / Gemini ~56 [verify]"; AA snapshot in
    // 2026-05-12-llm-benchmarks-may-2026.md tied both at 57.)
    "write-reason": {
      frontier: [
        { name: "GPT-5.5", score: 60 },
        { name: "Claude Opus 4.7", score: 57 },
        { name: "Gemini 3.1 Pro", score: 57 },
      ],
      openWeight: {
        name: "Kimi K2.6",
        score: 54,
        tagline: "within 6 pts of leader",
      },
    },
    // CODE — SWE-bench Verified / SciCode / Terminal-Bench composite.
    // Research file: GPT-5.5, Opus 4.7, Grok 4.3 lead; DeepSeek V4 Pro is
    // the open-weight champion. [verify] AA does not publish individual
    // SWE-bench numbers separately — scores below are AA-composite
    // approximations and must be confirmed against artificialanalysis.ai
    // ≤14 days before delivery.
    code: {
      frontier: [
        { name: "GPT-5.5", score: 60 }, // [verify] composite proxy
        { name: "Claude Opus 4.7", score: 58 }, // [verify] composite proxy
        { name: "Grok 4.3", score: 54 }, // [verify] composite proxy
      ],
      openWeight: {
        name: "DeepSeek V4 Pro",
        score: 52, // [verify] composite proxy
        tagline: "within 8 pts of leader",
      },
    },
    // AGENTIC — Tau-bench / Terminal-Bench Hard / APEX-Agents composite.
    // Research file: GPT-5.5, Gemini 3.1 Pro, Opus 4.7 lead; Kimi K2.6 open-weight.
    // [verify] AA composite, individual Tau-bench numbers not published.
    agentic: {
      frontier: [
        { name: "GPT-5.5", score: 60 }, // [verify] composite proxy
        { name: "Gemini 3.1 Pro", score: 57 }, // [verify] composite proxy
        { name: "Claude Opus 4.7", score: 57 }, // [verify] composite proxy
      ],
      openWeight: {
        name: "Kimi K2.6",
        score: 54, // [verify] composite proxy
        tagline: "swarm-class agent, 6 pts back",
      },
    },
    // MULTIMODAL — MMMU-Pro.
    // Research file: Gemini 3.1 Pro leads on multimodal breadth (text + image
    // + speech + video), then GPT-5.5, then Opus 4.7. Kimi K2.6 supports
    // text + image + video among open-weights. [verify] MMMU numbers per model.
    multimodal: {
      frontier: [
        { name: "Gemini 3.1 Pro", score: 57 }, // [verify] MMMU proxy
        { name: "GPT-5.5", score: 60 }, // [verify] MMMU proxy
        { name: "Claude Opus 4.7", score: 57 }, // [verify] MMMU proxy
      ],
      openWeight: {
        name: "Kimi K2.6",
        score: 54, // [verify] MMMU proxy
        tagline: "only open-weight with video input",
      },
    },
  },
  creativeChips: {
    draw: ["Flux 2 Pro", "Midjourney v8", "Nanobanana Pro"],
    video: ["Veo 3.1", "Kling 3.0", "Runway Gen-4"],
    voice: ["ElevenLabs", "Suno v5"],
    footnote:
      "Different model class — different leaderboards. None of the named 8 above compete here.",
  },
  // R3 scatter — Cost × Intelligence. Cost is blended $/M tokens at 3:1
  // input:output ratio per Artificial Analysis (May 2026). Source rows in
  // 2026-05-12-llm-benchmarks-may-2026.md PART 5.
  scatter: [
    { name: "GPT-5.5", intelligence: 60, cost: 15.0, kind: "frontier" },
    { name: "Claude Opus 4.7", intelligence: 57, cost: 12.08, kind: "frontier" },
    { name: "Gemini 3.1 Pro", intelligence: 57, cost: 4.5, kind: "frontier" },
    { name: "Grok 4.3", intelligence: 53, cost: 1.75, kind: "frontier" },
    { name: "Kimi K2.6", intelligence: 54, cost: 2.32, kind: "open-weight" },
    { name: "DeepSeek V4", intelligence: 52, cost: 2.32, kind: "open-weight" },
    // [verify] Qwen 3.6 and GLM blended costs are not published on AA as of
    // May 2026 (AA tracks Qwen3.5 variants for speed/cost only). Values below
    // are estimates from vendor pricing pages and must be confirmed before
    // delivery; Intelligence Index scores are also unpublished — using 50 as
    // a placeholder peg consistent with their tier on overall reasoning.
    { name: "Qwen 3.6", intelligence: 50, cost: 1.5, kind: "open-weight" }, // [verify]
    { name: "GLM", intelligence: 50, cost: 1.2, kind: "open-weight" }, // [verify]
  ],
  scatterAnnotation: {
    from: "GPT-5.5",
    to: "Kimi K2.6",
    label: "90% the intelligence, ⅕ the cost",
  },
  // R4 heatmap — 4 rows × 5 columns of 0–1 normalised scores.
  // Columns: WRITE & REASON, CODE, AGENTIC, MULTIMODAL, COST.
  // Per-column normalisation: each column's max = 1.0.
  // COST column is INVERTED (cheaper = higher value), so the Kimi K2.6 row
  // dominates COST while the three frontier rows dominate the other four.
  // Derivations (rounded to 2dp):
  //   WRITE & REASON  raw 60/57/57/54  → 1.00 / 0.95 / 0.95 / 0.90
  //   CODE            raw 60/58/57/52  → 1.00 / 0.97 / 0.95 / 0.87 (Grok 54 not in heatmap)
  //   AGENTIC         raw 60/57/57/54  → 1.00 / 0.95 / 0.95 / 0.90
  //   MULTIMODAL      raw 60/57/57/54  → Gemini leads → 1.00 / 0.95 / 0.95 / 0.90
  //   COST (inverted) blended $15 / $12.08 / $4.50 / $2.32
  //                   inverse-of-cost normalised to Kimi=1.0 →
  //                   0.155 / 0.192 / 0.516 / 1.00
  heatmap: {
    rows: ["GPT-5.5", "Claude Opus 4.7", "Gemini 3.1 Pro", "Kimi K2.6"],
    columns: ["WRITE & REASON", "CODE", "AGENTIC", "MULTIMODAL", "COST"],
    scores: [
      // GPT-5.5
      [1.0, 1.0, 1.0, 1.0, 0.15],
      // Claude Opus 4.7
      [0.95, 0.97, 0.95, 0.95, 0.19],
      // Gemini 3.1 Pro
      [0.95, 0.95, 0.95, 1.0, 0.52],
      // Kimi K2.6 (open-weight; wins COST, ~5× cheaper than GPT-5.5)
      [0.9, 0.87, 0.9, 0.9, 1.0],
    ],
    descriptor:
      "Frontier leads 4/5. Kimi K2.6 leads cost by 5×. The gap is fine-tunable.",
  },
  // Qualitative 4×5 matrix derived from `heatmap.scores` using the rule:
  //   col-max         → "best"
  //   ≥ 0.95 × max    → "good"
  //   ≥ 0.85 × max    → "average"
  //   below           → "weak"
  // Pre-computed at content-time so render-side never re-derives.
  // Reference scores (rows × cols):
  //   GPT-5.5         [1.00, 1.00, 1.00, 1.00, 0.15]
  //   Claude Opus 4.7 [0.95, 0.97, 0.95, 0.95, 0.19]
  //   Gemini 3.1 Pro  [0.95, 0.95, 0.95, 1.00, 0.52]
  //   Kimi K2.6       [0.90, 0.87, 0.90, 0.90, 1.00]
  qualitativeSummary: {
    rows: ["GPT-5.5", "Claude Opus 4.7", "Gemini 3.1 Pro", "Kimi K2.6"],
    columns: ["WRITE & REASON", "CODE", "AGENTIC", "MULTIMODAL", "COST"],
    cells: [
      // GPT-5.5
      ["best",    "best",    "best",    "best",    "weak"],
      // Claude Opus 4.7
      ["good",    "good",    "good",    "good",    "weak"],
      // Gemini 3.1 Pro (ties MULTIMODAL with GPT-5.5)
      ["good",    "good",    "good",    "best",    "weak"],
      // Kimi K2.6 (open-weight; wins COST)
      ["average", "average", "average", "average", "best"],
    ],
    header: "AT A GLANCE — RELATIVE STRENGTH",
    footer:
      "Frontier wins 4 of 5 categories. Open-weight wins cost by a wide margin.",
    footerKw: ["Frontier", "Open-weight", "cost"],
  },
  footer:
    "Frontier wins on average. Fine-tuned open-weight wins on your work.",
  footerKw: ["Frontier", "Fine-tuned open-weight", "your work"],
  freshness: "Benchmark data: Artificial Analysis · May 2026",
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
