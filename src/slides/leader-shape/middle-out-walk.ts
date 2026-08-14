// The two poses — MIDDLE-OUT as a figure in TIME.
//
// `./content.ts` owns the words and `./middle-out-geometry.ts` owns the stage
// coordinates; this module owns WHEN, and after the 2026-08-14 rework there is very
// little of it left. That is the point.
//
// ═══ THE TWO POSES:
//
//   0 · {@link POSE.FIGURE} — THE WHOLE FIGURE. Three plates with their names, all six
//       claim rows, the middle plate's chips and its tag, both arrows, both acts, and the
//       three approach cards. Everything except the last sentence.
//   1 · {@link THESIS_POSE} — the thesis, and nothing else new.
//
// ═══ WHY FIVE POSES BECAME TWO. The shipped walk laid the chart at pose 0 and then
// argued one plate per pose — top, teams, middle — before drawing the two directions at
// pose 4. Read as a script that is a good order; read as a STAGE it meant that for three
// of the five poses the wall carried a chart with holes in it, and a figure whose point is
// a SHAPE cannot be assembled a sentence at a time. A room reads a diagram in about two
// seconds and then listens; four clicks spent revealing what it has already inferred buy
// nothing and cost the presenter the initiative.
//
// So the figure arrives complete, in one pose, with a 90ms stagger inside it that reads as
// a build rather than as a sequence of claims (`./components/MiddleOutBands.tsx` owns the
// order and states it), and the presenter — not the deck — chooses which plate to speak
// first. The thesis keeps a pose of its own because it is not part of the figure: it is
// what the room is asked to do about it, and a sentence that arrived with the picture
// would be read as the picture's caption.
//
// ═══ NOTHING THAT HAS ARRIVED EVER LEAVES, AND THAT IS ARITHMETIC RATHER THAN CARE. The
// one gate below is a `>=` against a pose, so a pose is everything argued so far and
// there is no state for a later pose to undo. That also makes stepping the deck BACKWARDS
// — 1 → 0 — true by construction: walking back asks the same question of a smaller number
// and gets the earlier answer.
//
// ═══ THE MIDDLE PLATE IS BRIGHT FROM THE FIRST FRAME, and this module deliberately
// exports no function that says so. The shipped walk carried `isMiddleLit(pose)` because
// the plate lit on the pose its own claims arrived; now every plate arrives together, so
// "which plate is ranked" is a fact about the CHART and not about time — it lives in
// `./middle-out-geometry.ts` as `MIDDLE_TIER_INDEX` and in the component's tier table,
// and a pose function that answered `true` at every pose would be an invitation to
// re-introduce a walk that no longer exists.
//
// ═══ EVERY FUNCTION HERE IS TOTAL AND NONE OF THEM THROWS. A pose is UI state — it
// arrives from `DeckContext`, from a deep link, or from a test that deliberately
// over-shoots — and a slide that crashes on a pose is worse in front of a room than a
// slide with nothing revealed. That is the opposite of `plateTop` and `claimRowTop` in
// `./middle-out-geometry.ts`, which DO throw, and the difference is deliberate: an
// out-of-range TIER index is an authoring bug the author must be shown, while an
// out-of-range POSE is not an authoring bug at all.
//
// Pure data and pure functions. No React, no DOM, and no work at module scope. IT IMPORTS
// NOTHING — which the shipped version could not claim (it read the band count off
// `./content.ts` to derive a step per band) and which is now true because two poses are
// not a function of how much copy there is. So this module, like
// `./middle-out-geometry.ts`, is importable from bare `node`.

/**
 * The two poses, both NAMED. There is nothing left to count.
 *
 *   0 · `FIGURE` — the whole chart, the rail and the three cards.
 *   1 · `THESIS` — the sentence under it.
 *
 * NAMED RATHER THAN COMPARED AS LITERALS: `pose >= 1` in a component says nothing about
 * what 1 IS, and this is the one boundary the slide can get wrong — a thesis that landed
 * on pose 0 would be read as the figure's caption instead of as the ask that follows it.
 */
export const POSE = { FIGURE: 0, THESIS: 1 } as const;

/**
 * The pose the thesis arrives on: 1 — and the slide's last.
 *
 * Exported as its own name, rather than left as `POSE.THESIS` at the call sites, because
 * two different files ask two different questions of it: the slide file asks "what is the
 * fullest pose" (`canonicalPose`) and the component asks "is the thesis up yet". Both
 * answers are this number, and it should only ever be written once.
 */
export const THESIS_POSE: number = POSE.THESIS;

/**
 * Two — what the slide file declares as `steps`.
 *
 * `THESIS_POSE + 1`, because a step count is a COUNT and the thesis is the last INDEX.
 * DERIVED rather than typed for the reason every step budget in this tree is: a literal
 * would survive a third pose being added and the deck would clamp at `steps - 1`, leaving
 * whatever arrived last unreachable — no error, no blank slide, no failing test.
 */
export const STEP_COUNT: number = THESIS_POSE + 1;

/**
 * Whether the FIGURE is on the stage — always, at every pose the deck can reach and at
 * every pose it cannot.
 *
 * IT EXISTS AS A FUNCTION SO THE COMPONENT CANNOT TAKE A SHORTCUT. Every element on this
 * stage asks this module whether it is visible, and the figure's answer being a constant
 * is a decision about the slide (one pose builds it) rather than an absence of one. Give
 * the plates an `on={true}` written inline and the next author has no seam to hang a
 * second pose off; ask here, and the whole walk is still one file.
 *
 * TOTAL AND CONSTANT: it takes no argument, because a figure with no arrival has no
 * relationship to a pose at all.
 */
export function showsFigure(): boolean {
  return true;
}

/**
 * Whether the thesis is on the stage.
 *
 * `>=` AND NOT `===`, even though {@link THESIS_POSE} is the last pose the deck can reach:
 * a `===` would make the sentence VANISH at any pose past the end, and the last pose of a
 * slide should be the pose that survives being over-shot. `Number.isInteger` is
 * deliberately NOT checked — a fractional pose between 0 and 1 answers `false` and one
 * past 1 answers `true`, which is the same monotone answer the deck's own clamped integer
 * poses get.
 */
export function showsThesis(pose: number): boolean {
  return pose >= THESIS_POSE;
}
