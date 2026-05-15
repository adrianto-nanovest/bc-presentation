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
  closingLine: "Same tool. Same access. Different operator.",
  closingLineKw: ["Same access", "Different operator"] as const,
  cards: [
    {
      id: "A",
      name: "Vibe coding",
      symptom: "No spec, no review, no plan",
      cost: "Burns trust, breaks deploys",
      costKw: ["trust", "deploys"] as const,
      glyphKind: "vibe-coding",
      pillLabel: "vibe coding",
    },
    {
      id: "B",
      name: "Prompt-and-pray",
      symptom: "Asks once, ships output",
      cost: "Generic results, blamed the tool",
      costKw: ["results", "the tool"] as const,
      glyphKind: "prompt-pray",
      pillLabel: "prompt-and-pray",
    },
    {
      id: "C",
      name: "Sensitive-data leaks",
      symptom: "Pasted credentials into prompt",
      cost: "One paste = full breach",
      costKw: ["paste", "breach"] as const,
      glyphKind: "data-leak",
      pillLabel: "sensitive data",
    },
    {
      id: "D",
      name: "Tool overload",
      symptom: "Twenty tools, no strategy",
      cost: "AI picks wrong one under stress",
      costKw: ["wrong", "stress"] as const,
      glyphKind: "tool-overload",
      pillLabel: "tool overload",
    },
    {
      id: "E",
      name: "Confidently-wrong",
      symptom: "\"AI said it; must be right\"",
      cost: "Decisions on hallucinated facts",
      costKw: ["hallucinated"] as const,
      glyphKind: "hallucination",
      pillLabel: "hallucination",
    },
    {
      id: "F",
      name: "Stale data as truth",
      symptom: "Knowledge cutoff hidden",
      cost: "Yesterday's answer to today's question",
      costKw: ["answer", "question"] as const,
      glyphKind: "stale-data",
      pillLabel: "stale data",
    },
    {
      id: "G",
      name: "Over-engineering",
      symptom: "AI for what scripts handle",
      cost: "Cost + maintenance for nothing",
      costKw: ["nothing"] as const,
      glyphKind: "over-engineering",
      pillLabel: "over-engineering",
    },
    {
      id: "H",
      name: "Context rot",
      symptom: "One session lived too long",
      cost: "Performance degrades silently",
      costKw: ["degrades"] as const,
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
  subheadKw: ["Eight moves", "New discipline"] as const,
  resolvesHeader: "RESOLVES WHAT?",
  cards: [
    {
      num: 1,
      name: "Sharpen the axe",
      move: "Spec first; tools aligned to outcome",
      moveKw: ["Spec", "outcome"] as const,
      resolves: ["A", "B", "G"] as const,
      glyphKind: "sharpen-axe",
    },
    {
      num: 2,
      name: "Goal-driven",
      move: "Start from outcome; work backward",
      moveKw: ["outcome", "backward"] as const,
      resolves: ["B", "D", "G"] as const,
      glyphKind: "goal-arrow",
    },
    {
      num: 3,
      name: "Build skills, not prompts",
      move: "Reusable Claude Skills, MCP, Plugins",
      moveKw: ["Reusable"] as const,
      resolves: ["D", "H"] as const,
      glyphKind: "skill-block",
    },
    {
      num: 4,
      name: "Human-in-the-loop",
      move: "Approval gates; review before commit",
      moveKw: ["Approval", "review", "commit"] as const,
      resolves: ["A", "E"] as const,
      glyphKind: "human-loop",
    },
    {
      num: 5,
      name: "Context discipline",
      move: "Compact, fresh sessions, just-in-time",
      moveKw: ["fresh", "just-in-time"] as const,
      resolves: ["H", "F"] as const,
      glyphKind: "context-window",
    },
    {
      num: 6,
      name: "Don't reinvent the wheel",
      move: "Reuse community Skills, MCPs, Gems",
      moveKw: ["Reuse", "Skills"] as const,
      resolves: ["D", "B"] as const,
      glyphKind: "wheel-reuse",
    },
    {
      num: 7,
      name: "Eval-driven iteration",
      move: "Grader tests + regression checks",
      moveKw: ["tests", "checks"] as const,
      resolves: ["E", "A"] as const,
      glyphKind: "eval-tick",
    },
    {
      num: 8,
      name: "Foundation first",
      move: "Mental model before tools",
      moveKw: ["Mental", "tools"] as const,
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
  beat1: {
    lineA: { text: "The competition is not AI.", kw: ["not AI"] },
    lineB: {
      text: "It's someone learning the discipline first.",
      kw: ["the discipline"],
    },
  },
  beat2: { text: "Next: the discipline, in practice.", kw: ["in practice"] },
  figLabel: "BRIDGE · DISCIPLINE",
} as const;
