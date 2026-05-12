// Single source of truth for all Section H slide copy (H.1–H.3).
// Schema mirrors Section G (`src/slides/application-section-g/content.tsx`):
// plain string fields + sibling `kw` / `*Kw` arrays of substrings to highlight
// at render time. NO inline `<em>` tags in data.
//
// Body examples are universal knowledge-work scenarios — never mining-specific.
// Source spec: docs/specs/2026-05-12-slides-application-H-discipline.md

// ─────────────────── H.1 — THE TRAP ───────────────────

export const h1Content = {
  figLabel: "THE TRAP",
  headline: "What untrained use looks like.",
  headlineKw: ["untrained use"] as const,
  subhead:
    "Eight ways teams burn time, money, and trust. Same tool. Different operator.",
  closingLine: "Same tool. Same access. Different operator.",
  closingLineKw: ["Different operator"] as const,
  cards: [
    {
      id: "A",
      name: "Vibe coding",
      symptom: "No spec, no review, no plan",
      cost: "Burns trust, breaks deploys",
      glyphKind: "vibe-coding",
      pillLabel: "vibe coding",
    },
    {
      id: "B",
      name: "Prompt-and-pray",
      symptom: "Asks once, ships output",
      cost: "Generic results, blamed the tool",
      glyphKind: "prompt-pray",
      pillLabel: "prompt-and-pray",
    },
    {
      id: "C",
      name: "Sensitive-data leaks",
      symptom: "Pasted credentials into prompt",
      cost: "One paste = full breach",
      glyphKind: "data-leak",
      pillLabel: "sensitive data",
    },
    {
      id: "D",
      name: "Tool overload",
      symptom: "Twenty tools, no strategy",
      cost: "AI picks wrong one under stress",
      glyphKind: "tool-overload",
      pillLabel: "tool overload",
    },
    {
      id: "E",
      name: "Confidently-wrong",
      symptom: "\"AI said it; must be right\"",
      cost: "Decisions on hallucinated facts",
      glyphKind: "hallucination",
      pillLabel: "hallucination",
    },
    {
      id: "F",
      name: "Stale data as truth",
      symptom: "Knowledge cutoff hidden",
      cost: "Yesterday's answer to today's question",
      glyphKind: "stale-data",
      pillLabel: "stale data",
    },
    {
      id: "G",
      name: "Over-engineering",
      symptom: "AI for what scripts handle",
      cost: "Cost + maintenance for nothing",
      glyphKind: "over-engineering",
      pillLabel: "over-engineering",
    },
    {
      id: "H",
      name: "Context rot",
      symptom: "One session lived too long",
      cost: "Performance degrades silently",
      glyphKind: "context-rot",
      pillLabel: "context rot",
    },
  ] as const,
} as const;

// ─────────────────── H.2 — THE DISCIPLINE ───────────────────

export const h2Content = {
  figLabel: "THE DISCIPLINE",
  headline: "What discipline looks like.",
  headlineKw: ["discipline"] as const,
  subhead: "Eight moves the craftsman uses. Same tool. New discipline.",
  resolvesHeader: "RESOLVES WHAT?",
  cards: [
    {
      num: 1,
      name: "Sharpen the axe",
      move: "Spec first; tools aligned to outcome",
      resolves: ["A", "B", "G"] as const,
      glyphKind: "sharpen-axe",
    },
    {
      num: 2,
      name: "Goal-driven",
      move: "Start from outcome; work backward",
      resolves: ["B", "D", "G"] as const,
      glyphKind: "goal-arrow",
    },
    {
      num: 3,
      name: "Build skills, not one-off prompts",
      move: "Reusable Claude Skills, MCP, Plugins",
      resolves: ["D", "H"] as const,
      glyphKind: "skill-block",
    },
    {
      num: 4,
      name: "Human-in-the-loop",
      move: "Approval gates; review before commit",
      resolves: ["A", "E"] as const,
      glyphKind: "human-loop",
    },
    {
      num: 5,
      name: "Context discipline",
      move: "Compact, fresh sessions, just-in-time",
      resolves: ["H", "F"] as const,
      glyphKind: "context-window",
    },
    {
      num: 6,
      name: "Don't reinvent the wheel",
      move: "Reuse community Skills, MCPs, Gems",
      resolves: ["D", "B"] as const,
      glyphKind: "wheel-reuse",
    },
    {
      num: 7,
      name: "Eval-driven iteration",
      move: "Grader tests + regression checks",
      resolves: ["E", "A"] as const,
      glyphKind: "eval-tick",
    },
    {
      num: 8,
      name: "Foundation first",
      move: "Mental model before tools",
      resolves: ["B", "D", "G"] as const,
      glyphKind: "foundation-stack",
    },
  ] as const,
  // Pitfall pills — derived from h1Content.cards, alphabetical A–H.
  // Repeated here (not imported) so this stays the literal source of truth
  // for H.2's cross-highlighting layer.
  pills: [
    { id: "A", label: "vibe coding" },
    { id: "B", label: "prompt-and-pray" },
    { id: "C", label: "sensitive data" },
    { id: "D", label: "tool overload" },
    { id: "E", label: "hallucination" },
    { id: "F", label: "stale data" },
    { id: "G", label: "over-engineering" },
    { id: "H", label: "context rot" },
  ] as const,
} as const;

// ─────────────────── H.3 — BRIDGE TO I ───────────────────

export const h3Content = {
  heroSrc: "/heroes/h3-bridge.jpg",
  beat1: { text: "The competition is not AI.", kw: ["not AI"] as const },
  beat2: {
    text: "It's the colleague who learned the discipline first.",
    kw: ["the discipline"] as const,
  },
  attribution: "— Section I · Showcase",
  figLabel: "BRIDGE · DISCIPLINE",
} as const;
