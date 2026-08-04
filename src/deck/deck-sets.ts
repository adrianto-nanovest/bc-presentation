// Spec §4.1 — what a deck set IS: one flat, ordered list of slide ids.
//
// Composition used to be "concatenate the nine section index modules", which
// made the deck's order an emergent property of nine files that no one file
// stated. It is now ONE list per deck set, reviewable as a single artifact, and
// walked by `./slots.ts`. That is also what will make drift explicit ONCE THE
// TWO SETS DIVERGE (§4.3): appending a slide to section E will then lengthen
// whichever list names it and no other. Today they still share one list — see
// `DECK_SET_COMPOSITION` — so today an edit reaches both.
//
// WHY NOT IN `src/deck-variants.ts`, where `DECK_SETS` already lives. That
// module is imported by `middleware.ts` through a RELATIVE path and must stay
// import-free — its own test asserts that, because the `@/` alias does not
// resolve in Vercel's middleware build and the breakage would not surface until
// deploy. `sectionOverrides` is typed by `SectionKey`, which is an import, and
// 64 id strings would ride into the Edge bundle for no Edge purpose. So the
// split is: `labelSuffix` stays there (the Edge login page prints it), the
// composition lives here, client-only, keyed by the same `DeckSetId`.
//
// Pure data. No React, no DOM, no work at module scope.

import type { DeckSetId } from "@/deck-variants";
import type { SectionKey } from "./sections";

export interface DeckSet {
  id: DeckSetId;
  /**
   * The slots this deck set runs, in order.
   *
   * ONE ENTRY PER SLOT, NOT PER FILE. A slot with brand alternates — A.1
   * (`a1-what-youve-seen` / `a1-general` / `a1-gems`) and K.2
   * (`k2-practice-lab-overview` / `k2-gems`) — names its CANONICAL id here and
   * the alternate resolves behind it (`./slots.ts`). Ids are file basenames and
   * `tests/unit/deck-slide-ids.test.ts` pins that rule, so a slot is never
   * renamed to make this lookup easier.
   */
  slides: readonly string[];
  /**
   * slide id → the section key it takes IN THIS DECK SET.
   *
   * COMPOSITION FACTS ONLY (§4.1). Copy variance stays in the slide's own
   * content module behind a typed resolver — a generic override bag for copy is
   * untyped by construction and the compiler stops helping.
   *
   * Empty today. The leader deck needs exactly one:
   * `{ "f8-your-agentic-os": "shape" }`, because it relocates that slide out of
   * the cut F section and without the override R1 would split the `shape` run
   * in three and R4 would throw.
   */
  sectionOverrides?: Readonly<Record<string, SectionKey>>;
}

/**
 * The standard deck, slot by slot — today's order, unchanged.
 *
 * This list IS the deck's order as of §4.1; nothing else states it. The section
 * letters it produces (A–K) are DERIVED by `./compose.ts` from where each run
 * of `sectionKey`s falls, so no comment here promises a letter. Grouping and
 * counts are annotated because a 64-line list is otherwise unreviewable.
 *
 * `k1-challenge-handoff` and `k2-practice-lab-overview` are listed
 * unconditionally: a brand without a Practice Lab drops them at resolution
 * time, from the one place that declares them (`PRACTICE_LAB_ONLY_IDS`), rather
 * than from a second list per deck set.
 */
const STANDARD_SLIDE_IDS: readonly string[] = [
  // opening — the cover claims no number, so A.1 is the second slot
  "title",
  "a1-what-youve-seen", // canonical slot: `a1-general` / `a1-gems` resolve behind it
  // landscape
  "b1-evolution-journey",
  "b2-fields-terminology",
  "b3-mechanics-landscape",
  "b4-tiers-deployment",
  "b5-todays-landscape",
  // mindset — five plus the bridge into `process`
  "c1-tool-to-bridge",
  "c2-replacement-multiplier",
  "c3-executor-orchestrator",
  "c4-v-bounce-workflow",
  "c5-role-trajectory",
  "c6-bridge-to-d",
  // process
  "d1-the-trap",
  "d2-the-convergence",
  "d3-one-process-four-levels",
  "d4-decision-pattern",
  "d5-bridge-to-e",
  // fundamentals
  "e1-three-layers",
  "e2-prompt-what-why",
  "e3-prompt-structure",
  "e4-prompt-methodologies",
  "e5-prompt-examples",
  "e6-prompt-the-wall",
  "e7-context-what-why",
  "e8-context-strategies",
  "e9-context-the-wall",
  "e10-harness-what-why",
  "e11-harness-practices",
  "e12-bridge-to-f", // Phase 5 inserts E.12 · LOOP ENGINEERING before this and renames it
  // techniques
  "f1-two-pillars",
  "f2-rag-ground-truth",
  "f3-plugins-the-package",
  "f4-skills-write-once",
  "f5-mcp-the-adapter",
  "f6-hooks-unsexy-work",
  "f7-subagents-specialists",
  "f8-your-agentic-os",
  "f9-bridge-to-g",
  // tools
  "g1-ecosystem-overview",
  "g2-claude-platforms",
  "g3-claude-capabilities",
  "g4-builtin-tools",
  "g5-google",
  "g6-openai",
  "g7-head-to-head",
  "g8-capability-matrix",
  "g9-workflow",
  "g10-beyond-big-three",
  "g11-bridge-to-h",
  // pitfalls
  "h1-pitfall-wall",
  "h2-discipline-wall",
  "h3-bridge-to-i",
  // meta
  "i1-meta-process",
  "i2-profile-journey",
  "i3-portfolio",
  "i4-key-message-bridge",
  // principles
  "j1-humility-intro",
  "j2-five-principles",
  "j3-recipe-buildup",
  "j4-recipe-ship",
  // lab — the first two compose only where the brand runs the Practice Lab
  "k1-challenge-handoff",
  "k2-practice-lab-overview", // canonical slot: `k2-gems` resolves behind it
  "k3-thank-you",
];

/**
 * The composition of every registered deck set.
 *
 * The leader set deliberately points at the SAME list: only the `· Leadership`
 * suffix separates a leader variant from its middle-management sibling until
 * §4.3 gives the leader deck its own order, and sharing the constant means the
 * two cannot drift apart by accident while they are meant to be identical.
 * `tests/unit/variant-composition.test.tsx`'s "leader deck sets, before Phase 4"
 * block is what says so out loud.
 */
export const DECK_SET_COMPOSITION: Record<DeckSetId, DeckSet> = {
  standard: { id: "standard", slides: STANDARD_SLIDE_IDS },
  leader: { id: "leader", slides: STANDARD_SLIDE_IDS },
};
