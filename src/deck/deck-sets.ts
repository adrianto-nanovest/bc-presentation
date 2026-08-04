// Spec §4.1 — what a deck set IS: one flat, ordered list of slide ids.
//
// Composition used to be "concatenate the nine section index modules", which
// made the deck's order an emergent property of nine files that no one file
// stated. It is now ONE list per deck set, reviewable as a single artifact, and
// walked by `./slots.ts`. THE TWO SETS HAVE DIVERGED as of gh#41, which is what
// makes drift explicit: appending a slide to section E lengthens whichever list
// names it and no other, so a curriculum edit meant for both decks has to be
// written into both lists — deliberately, and visibly in one diff.
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
   * The leader deck has exactly one entry, and it is load-bearing: it relocates
   * `f8-your-agentic-os` out of the cut F section, and the value MUST be the
   * key of the run it lands inside. Without it, f8 keeps `techniques`, which no
   * other leader slide holds, and a one-slide `techniques` run in the middle of
   * `tools` splits `tools` into two runs — R4, at module load.
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
 * The leader deck at the Phase 4 FLOOR — 56 slides, ten sections, no new slide.
 *
 * The curriculum is the standard deck's, minus section F and with F.8 kept: it
 * is the deck a leader can be walked through on Aug 18 whether or not Phases
 * 6–7 land. Phases 5–7 grow it to 73 slides across A–N (§4.3) by inserting the
 * `gap`, `shape`, `invest` and `mandate` runs; every id below survives that.
 *
 * WHAT THIS LIST DOES NOT HOLD, and why:
 *
 *   - `f1`–`f7`, `f9` — CUT. Section F teaches how to build the techniques; a
 *     leader authorizes them and does not implement them (§4.3).
 *   - `f8-your-agentic-os` — KEPT, and it is the one slide out of its home
 *     section, so it carries the single `sectionOverrides` entry below.
 *
 * f8 SITS INSIDE THE TOOLS RUN, not at C.2 where §4.3 puts it — a deviation
 * decided on gh#41 and reversed in Phase 6. §4.3's C.2 is `shape-agentic-org`'s
 * concrete answer, and at the floor `shape-agentic-org` does not exist: a lone
 * `shape` run would put f8 THIRD IN THE DECK, between the agenda and the
 * landscape, with no argument in front of it. Between `g10-beyond-big-three` and
 * the bridge out of TOOLS it has one. Phase 6 moves the entry and flips the
 * override value to `shape` in the same edit — the mechanism does not change.
 */
const LEADER_SLIDE_IDS: readonly string[] = [
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
  // fundamentals — the bridge's beat 2 names TOOLS here, not the cut F section;
  // the pick lives in the slide's own content module (§4.1)
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
  "e12-bridge-to-f", // Phase 5 inserts THE LOOP before this and renames it `e13`
  // tools — plus the relocated f8, which is why the override exists
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
  "f8-your-agentic-os", // relocated out of the cut F section — see the doc above
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
  // lab — leaders run the same lab (§4.4), so this run is the standard one
  "k1-challenge-handoff",
  "k2-practice-lab-overview", // canonical slot: `k2-gems` resolves behind it
  "k3-thank-you",
];

/**
 * The composition of every registered deck set.
 *
 * The two lists are separate constants and no longer one shared one: as of
 * gh#41 the leader deck really is a different deck, and
 * `tests/unit/variant-composition.test.tsx` states the difference — 8 slides
 * shorter, no `f1`–`f7`/`f9`, f8 retained — rather than the old "they are
 * identical" claim.
 */
export const DECK_SET_COMPOSITION: Record<DeckSetId, DeckSet> = {
  standard: { id: "standard", slides: STANDARD_SLIDE_IDS },
  leader: {
    id: "leader",
    slides: LEADER_SLIDE_IDS,
    // ONE ENTRY, and `tools` rather than §4.3's `shape` for as long as f8 sits
    // in the TOOLS run. The value must name the run f8 lands inside or R4
    // throws at load — see the `sectionOverrides` doc above.
    sectionOverrides: { "f8-your-agentic-os": "tools" },
  },
};

/**
 * The slide defs that reach NO deck set — and the reason each is allowed to.
 *
 * Spec §10.1 check 7 (gh#44). Once the lists above own the order, a slide file
 * can exist, compile, pass its own unit test and reach no deck AT ALL, silently:
 * nothing else in the codebase compares "what exists" against "what composes".
 * `tests/unit/deck-orphan-guard.test.ts` does, and requires every def in the
 * tree to be either composed by a deck set or named here. That is what turns
 * §4.1's "drift becomes explicit" into a decision someone has to make — a new
 * slide fails the suite until its id is written into a deck-set list above, or
 * into this one AND into the guard's pinned list of orphans. Adding an entry
 * here is deliberately not the cheap way out: it takes a second edit, in a file
 * that says out loud that one orphan is all this repo has.
 *
 * WHY IT LIVES HERE, beside the lists, and not in the test: "this slide ships to
 * no audience, on purpose" is a statement about the DECK, not a fixture. A
 * reader of the composition sees the exception without opening a test file, and
 * the exception sits one screen from the lists it is an exception to.
 *
 * A RECORD AND NOT AN ARRAY because the reason is the load-bearing half. A bare
 * id list accepts a new entry with no argument beside it, which is the drift
 * this guard exists to catch, arriving one review cycle later.
 *
 * NOT HERE, deliberately: the five `src/slides/prototype-gh*` directories. They
 * declare no `SlideDef`, so the guard never sees them, and Phases 5–8 delete
 * them — an entry would be a permanent record of a temporary thing.
 */
export const ORPHANED_SLIDES: Readonly<Record<string, string>> = {
  "hex-ladder":
    "A developer utility, not a slide of any deck. Declared as " +
    "`hexLadderDevSlide` in `./registry.tsx` rather than in a slide file, " +
    "reached only by typing `?dev=hexladder`, and kept for the colour " +
    "calibration `scripts/projection-test.mjs` runs. Held outside every list " +
    "above so it can never enter audience navigation — that route is NOT " +
    "`import.meta.env.DEV`-gated the way the prototype routes are, so being " +
    "unreachable by navigation is the whole of what keeps it off a projector.",
};
