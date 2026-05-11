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
  label: string;       // "RULE-BASED"
  years: string;       // "1970s–80s"
  caption: string;     // plain caption (no inline em)
  captionKw: readonly string[];
  hereMarker?: boolean;
  dimmed?: boolean;    // for AGI (forecast)
}

export interface B1Content {
  figLabel: string;
  eras: readonly B1Era[];
}

export const b1Content: B1Content = {
  figLabel: "THE JOURNEY HERE",
  eras: [
    {
      key: "rule-based",
      label: "RULE-BASED",
      years: "1970s–80s",
      caption: "Tell it exactly what to do. No learning.",
      captionKw: [],
    },
    {
      key: "statistical",
      label: "STATISTICAL LEARNING",
      years: "1990s–2010s",
      caption: "Learns patterns from data. Spam filters, recommendations.",
      captionKw: [],
    },
    {
      key: "deep-learning",
      label: "DEEP LEARNING & PERCEPTION",
      years: "2012–2022",
      caption:
        "Sees and hears. ImageNet, voice assistants, the Transformer paper (2017).",
      captionKw: ["Transformer paper"],
    },
    {
      key: "llm",
      label: "LARGE LANGUAGE MODELS",
      years: "2022–2024",
      caption: "Conversational. ChatGPT — 100M users in 2 months.",
      captionKw: ["ChatGPT"],
    },
    {
      key: "agentic",
      label: "AGENTIC REASONING",
      years: "2024–2026",
      caption:
        "Thinks, plans, uses tools, works for minutes. o1, Claude computer use, Sonnet 4.5.",
      captionKw: ["o1, Claude computer use, Sonnet 4.5"],
      hereMarker: true,
    },
    {
      key: "agi",
      label: "AGI (emerging)",
      years: "2026–27+",
      caption:
        "Expert-level reasoning across domains. Not yet — Anthropic forecasts late 2026 / early 2027.",
      captionKw: ["Not yet — Anthropic forecasts late 2026 / early 2027."],
      dimmed: true,
    },
  ],
};

// ─── B.2 — AI Fields & Terminology (nested rects) ──────────────────────────

export interface B2Tier {
  tier: 1 | 2 | 3 | 4 | 5;
  label: string;
  caption: string;
  captionKw: readonly string[];
}

export interface B2Content {
  figLabel: string;
  tiers: readonly B2Tier[];
  anchor: string;
  anchorKw: readonly string[];
}

export const b2Content: B2Content = {
  figLabel: "THE MAP",
  tiers: [
    {
      tier: 1,
      label: "ARTIFICIAL INTELLIGENCE",
      caption: "Any system that mimics human intelligence.",
      captionKw: [],
    },
    {
      tier: 2,
      label: "MACHINE LEARNING",
      caption: "AI that learns from examples instead of rules.",
      captionKw: [],
    },
    {
      tier: 3,
      label: "DEEP LEARNING",
      caption: "ML using neural networks with many layers.",
      captionKw: [],
    },
    {
      tier: 4,
      label: "GENERATIVE AI",
      caption: "Deep Learning that creates — text, images, video, audio.",
      captionKw: ["creates"],
    },
    {
      tier: 5,
      label: "LARGE LANGUAGE MODELS",
      caption: "GenAI for text and language. Claude, GPT, Gemini, Llama.",
      captionKw: [],
    },
  ],
  anchor: "Everything inside the box belongs to the box outside it.",
  anchorKw: [],
};

// ─── B.3 — Model Mechanics & Landscape Map ─────────────────────────────────

export interface B3Dial {
  label: string;          // "Temperature"
  caption: string;        // plain caption
  captionKw: readonly string[];
  hover: string;          // tech detail
}

export interface B3Chip {
  name: string;
  bestFor: string; // tooltip "best for X"
}

export interface B3TaskRow {
  task: string;           // "Write/Think"
  chips: readonly B3Chip[];
}

export interface B3Content {
  figLabel: string;
  dials: readonly B3Dial[];
  taskRows: readonly B3TaskRow[];
}

export const b3Content: B3Content = {
  figLabel: "DIALS AND DOMAINS",
  dials: [
    {
      label: "Temperature",
      caption: "Creativity knob. Low = predictable. High = inventive.",
      captionKw: [],
      hover: "temperature: 0.0 - 1.5+",
    },
    {
      label: "Context Window",
      caption: "Working memory size. How much it can hold at once.",
      captionKw: [],
      hover: "context_window (Claude Opus 4.7: 1M+ tokens)",
    },
    {
      label: "System Prompt",
      caption: "Standing rules. What it should always remember.",
      captionKw: [],
      hover: 'system: "..."',
    },
  ],
  taskRows: [
    {
      task: "Write/Think",
      chips: [
        { name: "Claude Opus 4.7", bestFor: "Opus: deepest reasoning + safest enterprise" },
        { name: "GPT-5.5", bestFor: "fastest code" },
        { name: "Gemini 3.1 Pro", bestFor: "long context" },
      ],
    },
    {
      task: "Draw",
      chips: [
        { name: "Flux 2 Pro", bestFor: "realism + text-in-image" },
        { name: "Midjourney v8", bestFor: "aesthetics king" },
      ],
    },
    {
      task: "Video",
      chips: [
        { name: "Veo 3.1", bestFor: "all-rounder + 4K" },
        { name: "Kling 3.0", bestFor: "cinematic multi-shot" },
        { name: "Runway Gen-4.5", bestFor: "granular camera control" },
      ],
    },
    {
      task: "Voice/Music",
      chips: [
        { name: "ElevenLabs", bestFor: "realistic voices" },
        { name: "Suno v5", bestFor: "full songs" },
      ],
    },
    {
      task: "Automate",
      chips: [
        { name: "Claude Computer Use", bestFor: "desktop" },
        { name: "OpenAI Operator", bestFor: "web" },
      ],
    },
  ],
};

// ─── B.4 — Tiers & Deployment ──────────────────────────────────────────────

export interface B4Tier {
  position: "top" | "mid" | "apex";
  model: string;       // "Claude Haiku 4.5"
  price: string;       // "~$0.80/M tok"
  caption: string;
  captionKw: readonly string[];
}

export interface B4Competitor {
  name: string;
  desc: string;
}

export interface B4Content {
  figLabel: string;
  tiers: readonly B4Tier[];
  competitors: readonly B4Competitor[];
  cloud: { label: string; superlative: string; superlativeKw: readonly string[] };
  local: { label: string; superlative: string; superlativeKw: readonly string[] };
  insight: string;
  insightKw: readonly string[];
}

export const b4Content: B4Content = {
  figLabel: "TIERS, COMPETITORS, AND WHERE THE WORK RUNS",
  tiers: [
    {
      position: "top",
      model: "Claude Haiku 4.5",
      price: "~$0.80/M tok",
      caption: "Fast + cheap. High-volume work.",
      captionKw: [],
    },
    {
      position: "mid",
      model: "Claude Sonnet 4.6",
      price: "~$3/M tok",
      caption: "Default workhorse. Most everyday work.",
      captionKw: [],
    },
    {
      position: "apex",
      model: "Claude Opus 4.7",
      price: "~$15/M tok",
      caption: "Deepest reasoning. Hard problems, long thinking.",
      captionKw: [],
    },
  ],
  competitors: [
    { name: "Qwen 3.6", desc: "Bahasa fluent · open-weight" },
    { name: "DeepSeek V4", desc: "1M context, R1 reasoning" },
    { name: "Moonshot Kimi K2.6", desc: "multi-agent swarm" },
    { name: "SEA-LION", desc: "11 SEA languages" },
  ],
  cloud: {
    label: "Opus 4.7 · GPT-5.5 · Gemini 3.1",
    superlative: "best raw capability",
    superlativeKw: ["raw capability"],
  },
  local: {
    label: "Ollama + Llama 4 / Mistral / Qwen open-weight",
    superlative: "best for your domain",
    superlativeKw: ["your domain"],
  },
  insight:
    "A smaller fine-tuned model can outperform frontier on your specific work.",
  insightKw: ["your"],
};

// ─── B.5 — Today's Landscape + Inverse Hook ────────────────────────────────

export interface B5Bar {
  pct: number;             // counter value, e.g. 79
  label: string;
  source: string;          // e.g. "(Gartner, 2025)"
  widthPct: number;        // visual bar width in pct (0–100)
  variant: "primary" | "dim" | "dashed";
}

export interface B5Content {
  figLabel: string;
  bigStat: number;         // 92
  bigStatSuffix: string;   // "%"
  bigStatCaption: string;
  bigStatCaptionKw: readonly string[];
  mechanism: string;       // "And yet..."
  bars: readonly B5Bar[];
  cliffhanger: string;
  cliffhangerKw: readonly string[];
}

export const b5Content: B5Content = {
  figLabel: "THE PARADOX",
  bigStat: 92,
  bigStatSuffix: "%",
  bigStatCaption:
    "Indonesia. Knowledge workers using GenAI. Highest in the world.",
  bigStatCaptionKw: [],
  mechanism: "And yet...",
  bars: [
    {
      pct: 79,
      label: "adopted AI agents",
      source: "(Gartner, 2025)",
      widthPct: 70,
      variant: "primary",
    },
    {
      pct: 11,
      label: "actually in production",
      source: "(Gartner)",
      widthPct: 11,
      variant: "dim",
    },
    {
      pct: 40,
      label: "will be cancelled by 2027",
      source: "(Gartner)",
      widthPct: 40,
      variant: "dashed",
    },
  ],
  cliffhanger: "What makes the difference?",
  cliffhangerKw: ["difference"],
};
