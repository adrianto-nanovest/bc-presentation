// Single source of truth for all Section H slide copy (H.1–H.3).
// Schema mirrors Section G (`src/slides/application-section-g/content.tsx`):
// plain string fields + sibling `kw` / `*Kw` arrays of substrings to highlight
// at render time. NO inline `<em>` tags in data.
//
// Body examples are universal knowledge-work scenarios — never mining-specific.
// Source spec: docs/specs/2026-05-12-slides-application-H-discipline.md
//
// TWO BRIDGE BLOCKS LIVE AT THE FOOT OF THIS FILE, not one, and they belong to
// different decks: `h3Content` (which the leader deck composes at K.4, behind THE
// MANDATE) and `pitfallsBridgeContent` (leader-only, this section's own end). One
// string in the first varies with the deck set — see `h3Beat1LineBFor`. Type-only
// import, so this module still pulls in nothing at runtime and stays plain data.
import type { DeckSetId } from "@/deck-variants";

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

// ─────────────────── THE BRIDGE OUT OF THIS SECTION ───────────────────
//
// NAMED FOR THE SLIDE AND NOT FOR A NUMBER, because as of gh#72 the two decks do not
// even agree on which SECTION it ends. `h3-bridge-to-i` prints H.3 in a standard deck,
// last slide of PITFALLS; in a leader deck it composes behind `mandate-levers` and
// prints K.4, last slide of THE MANDATE (`sectionOverrides` in
// `src/deck/deck-sets.ts`). It bridges into THE META-PROCESS in both — which is the
// reason the move was the fix and a re-write was not: the slide always pointed at
// `meta`, and in the leader deck it had `mandate` sitting between it and its target.
//
// The leader deck's PITFALLS run ends on `pitfalls-bridge-to-mandate` below instead.

/** One reveal: the string, plus the substrings rendered as keywords. Structurally
 *  `BridgeBeat` in `@/components/BridgeHero`; declared here so this module keeps its
 *  no-runtime-import property and stays plain data. */
interface H3Beat {
  text: string;
  kw: readonly string[];
}

/**
 * BEAT 1's SECOND LINE — the one string in this section that depends on the deck set.
 *
 * Same shape as `e13Beat2For` in `../foundation-core-section-e/content.tsx`, and for
 * the same reason: copy varies by deck set, composition does not, so the pick lives in
 * the content module behind a typed resolver and `sectionOverrides` stays composition
 * only (§4.1).
 *
 * WHY THE LEADER LINE DIFFERS. In a standard deck this slide follows the discipline
 * wall and addresses a room of practitioners, so the competitor is a PERSON —
 * "someone". In a leader deck it lands one slide after THE FOUR LEVERS, in front of a
 * BU or Division Head who has just been asked to fund a mandate, and "someone" is too
 * small for that room: the thing that beats them is another ORGANISATION that started
 * earlier.
 *
 * IT IS "THE COMPANY" AND NOT "THE DIVISION", WHICH IS A DECISION AND NOT A SYNONYM.
 * A leader deck is presented to peers who run sibling divisions of one group; a line
 * that makes the winner an internal division sets the room against itself two slides
 * before the ask. An external competitor is the only version of this sentence that
 * every seat in that room is on the same side of.
 *
 * A `Record<DeckSetId, …>` and not a `deckSet === "leader"` ternary: a third deck set
 * fails to compile HERE, rather than reaching a projector as an `undefined` beat.
 */
const H3_BEAT1_LINE_B_BY_DECK_SET: Record<DeckSetId, H3Beat> = {
  standard: {
    text: "It's someone learning the discipline first.",
    kw: ["the discipline"],
  },
  leader: {
    text: "It is the company that learns the discipline first.",
    kw: ["learns the discipline"],
  },
};

/** The beat-1 second line a deck set prints. The table stays private so the pick is
 *  the only way in, exactly as `e13Beat2For` keeps its own. */
export function h3Beat1LineBFor(deckSet: DeckSetId): H3Beat {
  return H3_BEAT1_LINE_B_BY_DECK_SET[deckSet];
}

export const h3Content = {
  heroSrc: "/heroes/h3-bridge.jpg",
  beat1: {
    lineA: { text: "The competition is not AI.", kw: ["not AI"] },
    /** Line B is NOT here: it depends on the deck set, so it is resolved by
     *  `h3Beat1LineBFor` and this object holds only what every deck prints alike. */
  },
  beat2: { text: "Next: the discipline, in practice.", kw: ["in practice"] },
  figLabel: "BRIDGE · DISCIPLINE",
} as const;

// ─────────────────── PITFALLS · BRIDGE INTO THE MANDATE (gh#72) ───────────────────

/**
 * The leader deck's own end to this section — leader decks only, and the slot
 * `h3-bridge-to-i` vacated when it moved to K.4.
 *
 * WHY IT IS KEYED `pitfalls` AND LIVES IN THIS DIRECTORY, next to the standard
 * section's three slides rather than in a `leader-*` one: the run it closes IS this
 * section's, and every index module in the tree says what its own section contains.
 * A bridge keyed `mandate` would have to sit at the FRONT of that run — the deck's
 * bridges are the last slide of the section they leave, never the first of the one
 * they arrive in.
 *
 * BEAT 1 IS THE TWO SLIDES IN FRONT OF IT, TURNED INTO A DEMAND. J.1 shows untrained
 * use, J.2 shows what discipline looks like, and the leader's question after both is
 * why the second does not simply spread — so the answer, "someone must make room for
 * it", is what the four levers of THE MANDATE then are. Beat 2 names the section in
 * prose (§3.5) and points at the one thing this room can do that no other room can.
 *
 * "AUTHORISE" AND NOT "AUTHORIZE", matching D.3's shipped closer ("You can simply
 * authorise it"), which is the only other rendered string in either deck to use the
 * word.
 */
export const pitfallsBridgeContent = {
  heroSrc: "/heroes/pitfalls-to-mandate-bridge.jpg",
  figLabel: "BRIDGE · MANDATE",
  beat1: {
    lineA: { text: "Discipline does not spread by itself.", kw: ["by itself"] },
    lineB: { text: "Someone must make room for it.", kw: ["make room"] },
  },
  beat2: { text: "Next: what only you can authorise.", kw: ["only you"] },
} as const;
