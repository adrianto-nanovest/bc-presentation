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
   * key of the run it lands inside — as of gh#54 that is `shape`, because the
   * row sits immediately after `shape-agentic-org` (§4.3's C.2).
   *
   * THREE WAYS TO GET IT WRONG, and only two of them are loud:
   *
   *   - value `tools` with the row up at C.2 → `tools` forms a second run at
   *     `g1` (R4, at module load).
   *   - value `shape` with the row back inside the TOOLS run → `shape` forms a
   *     second run at f8 (R4, at module load).
   *   - NO ENTRY AT ALL → f8 keeps `techniques`, which no other leader slide
   *     holds, so it becomes a one-slide run and claims a section LETTER of its
   *     own, in a deck that cut the section that letter is named after. That one
   *     composes cleanly and is wrong on the projector, which is why the entry
   *     is not optional and why this doc says so rather than trusting R4 to
   *     catch every case.
   */
  sectionOverrides?: Readonly<Record<string, SectionKey>>;
}

/**
 * The standard deck, slot by slot — 65 slots as of gh#48, which inserted
 * `e12-loop-engineering` ahead of the section-E bridge (§4.2).
 *
 * This list IS the deck's order as of §4.1; nothing else states it. The section
 * letters it produces (A–K) are DERIVED by `./compose.ts` from where each run
 * of `sectionKey`s falls, so no comment here promises a letter. Grouping and
 * counts are annotated because a 65-line list is otherwise unreviewable.
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
  "e12-loop-engineering",
  "e13-bridge-to-f",
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
 * The leader deck — 65 slides across FOURTEEN sections. The COUNT is gh#59's and the
 * SECTION COUNT is gh#60's, and the gap between those two tickets is the thing to read
 * before verifying anything here. The Phase 4 floor was 56 and held no slide the
 * standard deck did not; gh#48's `e12-loop-engineering` was the first addition and
 * ships to BOTH sets, gh#53's `gap-capability-ladder` was the first slide that reached
 * THIS LIST ALONE, gh#54's `shape-agentic-org` is the second, gh#56's
 * `invest-own-proof` is the third, gh#57's `invest-chicken-egg` is the fourth, gh#60's
 * `mandate-enablement` is the fifth, gh#61's `mandate-phases-gates` is the sixth,
 * gh#58's `invest-security` is the seventh and gh#59's `invest-subscription` is the
 * eighth.
 *
 * A NEW SLIDE IS NOT A NEW RUN, and EIGHT LEADER-ONLY SLIDES HAVE COST ONLY FOUR
 * PUSHES.
 * gh#57 was the first slide here to show the difference: it appends at the END of the
 * `invest` run gh#56 opened, so it claims no letter, forms no run and renumbers
 * nothing — every letter behind it is gh#56's, unedited. gh#61 did the same thing at
 * the end of the `mandate` run gh#60 opened, gh#58 did it a third time at the end
 * of `invest`, and gh#59 a fourth, behind gh#58's row. The other four — gh#53, gh#54,
 * gh#56 and
 * gh#60 — each OPENED a run and each moved every letter behind it. A comment that
 * counts slides where it means pushes would send the next reader looking for four
 * renumberings that never happened.
 *
 * EVERY NEW RUN MOVES EVERY LETTER BEHIND IT — AND gh#57, gh#61, gh#58 AND gh#59 MOVED
 * NOTHING, BECAUSE NONE OF THEM OPENED A RUN. That quartet is §3.4 R2 working as
 * designed
 * and the one thing to know before verifying anything against this deck. Today the runs
 * read
 * `opening`(A) · `gap`(B) · `shape`(C) · `invest`(D) · `landscape`(E) ·
 * `mindset`(F) · `process`(G) · `fundamentals`(H) · `tools`(I) · `pitfalls`(J) ·
 * `mandate`(K) · `meta`(L) · `principles`(M) · `lab`(N) — so the closer is N.3.
 * The loop slide still prints H.12, exactly where gh#56 left it: the three
 * leader-only runs in front of the curriculum each pushed ten runs along
 * (E.12 → F.12 → G.12 → H.12, its file never opened once), gh#57 APPENDED INSIDE
 * `invest` and pushed nothing at all — the FIRST insert in this list of which that
 * is true — gh#60's `mandate` landed behind `pitfalls` (§3.6) and pushed only
 * `meta`, `principles` and `lab`, gh#61 APPENDED INSIDE `mandate` and pushed
 * nothing either, the second such insert, gh#58 APPENDED INSIDE `invest` for the
 * third and gh#59 for the fourth — closing that run at its §6.7 end. §4.3's A–N was
 * reached by APPENDING N, not
 * by pushing H, and every leader slide still unbuilt appends the way gh#57, gh#61,
 * gh#58 and
 * gh#59 did (or, for `invest-base-rates`, inserts at the front of a run that already
 * has a letter). Anyone checking a figure on a leader deck reads the COMPOSED deck,
 * never a
 * literal.
 *
 * The curriculum is the standard deck's, minus section F and with F.8 kept: it
 * is the deck a leader can be walked through on Aug 18 whether or not the rest of
 * Phases 6–7 land. Those phases grow it to 73 slides (§4.3) by filling `gap`,
 * `shape`, `invest` and `mandate`; the section COUNT is now final at fourteen —
 * every remaining Phase 6/7 slide appends to a run that already exists — and every
 * id below survives that.
 *
 * WHAT THIS LIST DOES NOT HOLD, and why:
 *
 *   - `f1`–`f7`, `f9` — CUT. Section F teaches how to build the techniques; a
 *     leader authorizes them and does not implement them (§4.3).
 *   - `f8-your-agentic-os` — KEPT, and it is the one slide out of its home
 *     section, so it carries the single `sectionOverrides` entry below.
 *
 * f8 IS BACK AT C.2, WHERE §4.3 PUTS IT — and the argument that kept it inside the
 * TOOLS run from gh#41 until now is history, recorded here because reversing a
 * deviation silently is how it comes back. That argument was: §4.3's C.2 is
 * `shape-agentic-org`'s concrete answer, `shape-agentic-org` did not exist, and a
 * lone `shape` run would have put f8 THIRD IN THE DECK, between the agenda and the
 * landscape, with no argument in front of it. Between `g10-beyond-big-three` and
 * the bridge out of TOOLS it had one.
 *
 * C.1 NOW EXISTS (gh#54), so the objection is gone — and §4.3's 2026-08-04
 * amendment confirms the placement on the CONTENT rather than on the table: f8's
 * nav rail reads Dashboard · Skills · Agents · Vault · Memory · Connectors ·
 * People · Settings, which is PILLAR-SHAPED, NOT TECHNIQUE-SHAPED. After C.1's
 * hub-and-spokes it is the same organization drawn as one concrete screen, which
 * is a better neighbour than the tool comparison it was parked beside. The row
 * moves and the override value flips to `shape` in the SAME edit: either half
 * alone gives one section key two runs and throws at module load (R4).
 */
const LEADER_SLIDE_IDS: readonly string[] = [
  // opening — the cover claims no number, so A.1 is the second slot
  "title",
  "a1-what-youve-seen", // canonical slot: `a1-general` / `a1-gems` resolve behind it
  // gap — the first leader-only run (gh#53). §4.3 gives it five slides and the
  // ladder is the LAST of them, so the other four insert AHEAD of this line; the run
  // itself sits here, in front of `landscape`, and that is what pushed every
  // later letter in this deck by one (§3.4 R2).
  //
  // THOSE FOUR HOLD NO TICKET, which this comment claimed otherwise until gh#57. §11
  // puts `gap-hardest-part`, `gap-no-sop`, `gap-three-failures` and `gap-the-pattern`
  // in the PHASE 7 row; the open issues run out at #63 and every one of #52–#63 is
  // Phase 6 (`gh issue list`, 2026-08-05). The "#55–#58" named here before were C.1's
  // focus walk and D.2–D.4 — none of them a `gap` slide.
  "gap-capability-ladder",
  // shape — the second leader-only run (gh#54), and the second push. §4.3 gives
  // this run four slides — C.3 (`shape-tam-kotter`) and C.4 (`shape-middle-out`)
  // append after f8, so the two lines below stay adjacent.
  "shape-agentic-org",
  // Relocated out of the cut F section and back to §4.3's C.2, which is why the
  // override exists and why it now reads `shape` — see the doc above.
  "f8-your-agentic-os",
  // invest — the third leader-only run (gh#56), and the third push: the loop slide
  // prints H.12 here now and this push is what took the closer to M.3. It reads N.3
  // today, because gh#60's `mandate` run pushed it once more — see the doc above.
  // §6.7 gives this run five slides and FOUR of them exist, adjacent and in §6.7's
  // order — gh#56's `invest-own-proof` (§6.7's D.2), gh#57's `invest-chicken-egg`
  // (§6.7's D.3), gh#58's `invest-security` (§6.7's D.4) and gh#59's
  // `invest-subscription` (§6.7's D.5). ALL FOUR COMPOSE ONE
  // NUMBER EARLIER THAN §6.7 GIVES THEM, as D.1, D.2, D.3 and D.4, because
  // `invest-base-rates` (§6.7's D.1) is unbuilt and inserts AHEAD of all four lines.
  // That slide has no ticket at all: §11's Phase 7 row holds it, beside `gap-no-sop`,
  // so it is not waiting on Phase 6. All four composed figures are derived per deck
  // (§3.5) — nothing here and nothing in any of the four slides pins one.
  //
  // gh#57, gh#58 AND gh#59 APPENDED, NONE INSERTED: each line lands at the end of the
  // run,
  // so no letter and no number below this block changed for any of them. What did
  // change is
  // every fixture ROW INDEX behind it, which is a different thing and is recorded in
  // `tests/unit/deck-numbering-fixture.test.tsx`. gh#59 closes the run at its §6.7
  // end: `invest-subscription` is §6.7's LAST invest slide, so the only edit this run
  // has left is D.1's insert at the front.
  "invest-own-proof",
  "invest-chicken-egg",
  "invest-security",
  "invest-subscription",
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
  "e12-loop-engineering",
  "e13-bridge-to-f",
  // tools — g1…g11 with no hole and no second run, as of gh#54: the relocated f8
  // used to sit between `g10-beyond-big-three` and the bridge below
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
  // mandate — the fourth leader-only run (gh#60), and the ONLY one that is not in
  // front of the curriculum: §3.6 puts it between `pitfalls` and `meta`, so it
  // pushed `meta`/`principles`/`lab` to L/M/N and moved no curriculum letter at
  // all. §6.8 gives this run three slides — K.1, K.2 and `mandate-levers` (K.3,
  // Phase 7) — and each APPENDS behind the last, so none of them moves a letter
  // either. This is the last run §4.3 asks for: the leader deck's section count is
  // final at fourteen.
  "mandate-enablement",
  // gh#61, and it is the cheapest kind of edit this list takes — the same one gh#57
  // made two runs above: a row appended to the END of an existing run. No letter
  // moves, because `mandate` already had one; no NUMBER moves either, because R3
  // renumbers only inside the run that changed and this row is that run's last. Both
  // leader decks therefore grew from 62 slides to 63 with every figure in the file
  // unchanged — see the numbering fixture, where the diff is one added row and
  // nothing else.
  "mandate-phases-gates",
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
 * `tests/unit/variant-composition.test.tsx` states the difference — no
 * `f1`–`f7`/`f9`, f8 retained and relocated — rather than the old "they are
 * identical" claim.
 *
 * THE DIFFERENCE IS NO LONGER ONE NUMBER, which is why it is not stated as one
 * here. gh#41's leader deck was "the standard deck minus eight"; it is now that
 * minus eight PLUS its own slides, so the two lists are LEVEL (65 against 65) and
 * the two halves move independently — `tests/unit/deck-registry.test.ts` holds
 * them as separate constants for exactly that reason, and a single subtraction
 * written here would go stale on the next leader-only ADDITION, whether it opens a
 * run or joins one. It has been eight (gh#41), seven (gh#53), six (gh#54), five
 * (gh#56), four (gh#57), three (gh#60), two (gh#61), one (gh#58) and zero (gh#59) —
 * nine values in
 * nine tickets, none of which edited a standard-deck row.
 */
export const DECK_SET_COMPOSITION: Record<DeckSetId, DeckSet> = {
  standard: { id: "standard", slides: STANDARD_SLIDE_IDS },
  leader: {
    id: "leader",
    slides: LEADER_SLIDE_IDS,
    // ONE ENTRY, and §4.3's `shape` as of gh#54 — f8 now sits at C.2, directly
    // behind `shape-agentic-org`. The value must name the run f8 lands inside or
    // R4 throws at load — see the `sectionOverrides` doc above.
    sectionOverrides: { "f8-your-agentic-os": "shape" },
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
 * NOT HERE, deliberately: the `src/slides/prototype-gh*` directory that is left.
 * It declares no `SlideDef`, so the guard never sees it, and Phase 6 deletes it —
 * an entry would be a permanent record of a temporary thing.
 */
export const ORPHANED_SLIDES: Readonly<Record<string, string>> = {
  "hex-ladder":
    "A developer utility, not a slide of any deck. Declared as " +
    "`hexLadderDevSlide` in `./registry.tsx` rather than in a slide file, " +
    "reached only by typing `?dev=hexladder`, and kept for the colour " +
    "calibration `scripts/projection-test.mjs` runs. Held outside every list " +
    "above so it can never enter audience navigation — that route is NOT " +
    "`import.meta.env.DEV`-gated the way the prototype route is, so being " +
    "unreachable by navigation is the whole of what keeps it off a projector.",
};
