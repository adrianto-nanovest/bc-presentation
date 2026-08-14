// The two poses — D.2 as a figure in TIME.
//
// `./content.ts` owns the words, `./geometry.ts` owns the stage coordinates, and this module
// owns WHEN. After the 2026-08-14 rework there is very little of it left, which is the point.
//
// ═══ THE TWO POSES:
//
//   0 · {@link POSE.DOSSIER} — THE WHOLE FIGURE. The source plate with its caption and the
//       owner's name, the origin, every wire, every card with its figure, its leader, its
//       epistemic chip and what it measures, and the citation under all of it.
//   1 · {@link THESIS_POSE} — the rule and the thesis. Nothing else new.
//
// ═══ WHY THREE POSES BECAME TWO, WHICH IS THE OWNER'S CALL AND NOT A TIDY-UP. The shipped
// walk spent pose 0 on a headline and an eyebrow, pose 1 on the figures, and pose 2 on the
// thesis. Pose 0 was therefore a CLICK THAT SHOWED NOTHING — the headline is already on the
// stage before the first step, so the room sat in front of a title, a second title and an
// empty stage while the presenter clicked. Evidence is not an argument that has to be
// assembled a number at a time either: four figures from one owner are ONE claim, and the
// room reads them the way it reads a table — all at once, then listens.
//
// So the dossier arrives complete, in one pose, built over a staggered second and a half that
// reads as wiring rather than as a sequence of claims (`./components/ProofLedger.tsx` owns
// the order and states it). The thesis keeps a pose of its own because it is not part of the
// evidence: it is what the room is asked to conclude FROM the evidence, and a sentence that
// arrived with the figures would be read as their caption.
//
// ═══ NOTHING THAT HAS ARRIVED EVER LEAVES, AND THAT IS ARITHMETIC RATHER THAN CARE. The one
// gate below is a `>=` against a pose, so a pose is everything argued so far and there is no
// state for a later pose to undo. That also makes stepping the deck BACKWARDS — 1 → 0 — true
// by construction: walking back asks the same question of a smaller number and gets the
// earlier answer.
//
// ═══ EVERY FUNCTION HERE IS TOTAL AND NONE OF THEM THROWS. A pose is UI state — it arrives
// from `DeckContext`, from a deep link, or from a test that deliberately over-shoots — and a
// slide that crashes on a pose is worse in front of a room than a slide with nothing
// revealed. That is the opposite of `cardTop` and `chainY` in `./geometry.ts`, which DO
// throw, and the difference is deliberate: an out-of-range CARD is an authoring bug the
// author must be shown, while an out-of-range POSE is not an authoring bug at all.
//
// Pure data and pure functions. No React, no DOM, no work at module scope, and NO IMPORTS —
// two poses are not a function of how much copy there is — so this module, like
// `./geometry.ts`, is importable from bare `node`.

/**
 * The two poses, both NAMED. There is nothing left to count.
 *
 *   0 · `DOSSIER` — the plate, the harness, every card, and the citation.
 *   1 · `THESIS` — the rule, and the sentence under it.
 *
 * NAMED RATHER THAN COMPARED AS LITERALS: `pose >= 1` in a component says nothing about what
 * 1 IS, and this is the one boundary the slide can get wrong — a thesis that landed on pose 0
 * would be read as the dossier's caption instead of as what the room is asked to conclude.
 */
export const POSE = { DOSSIER: 0, THESIS: 1 } as const;

/**
 * The pose the thesis arrives on: 1 — and the slide's last.
 *
 * Exported as its own name, rather than left as `POSE.THESIS` at the call sites, because two
 * different files ask two different questions of it: the slide file asks "what is the fullest
 * pose" (`canonicalPose`) and the component asks "is the thesis up yet". Both answers are
 * this number, and it should only ever be written once.
 */
export const THESIS_POSE: number = POSE.THESIS;

/**
 * Two — what the slide file declares as `steps`.
 *
 * `THESIS_POSE + 1`, because a step count is a COUNT and the thesis is the last INDEX.
 * DERIVED rather than typed for the reason every step budget in this tree is: a literal would
 * survive a third pose being added and the deck would clamp at `steps - 1`, leaving whatever
 * arrived last unreachable — no error, no blank slide, no failing test.
 */
export const STEP_COUNT: number = THESIS_POSE + 1;

/**
 * Whether the DOSSIER is on the stage — always, at every pose the deck can reach and at every
 * pose it cannot.
 *
 * IT EXISTS AS A FUNCTION SO THE COMPONENT CANNOT TAKE A SHORTCUT. Every element of the
 * figure asks this module whether it is visible, and the answer being a constant is a
 * DECISION about the slide (one pose builds it) rather than an absence of one. Give the cards
 * an `on={true}` written inline and the next author has no seam to hang a second pose off;
 * ask here, and the whole walk is still one file.
 *
 * TOTAL AND CONSTANT: it takes no argument, because a figure with no arrival has no
 * relationship to a pose at all.
 */
export function showsDossier(): boolean {
  return true;
}

/**
 * Whether the thesis — and the rule that opens for it — is on the stage.
 *
 * `>=` AND NOT `===`, even though {@link THESIS_POSE} is the last pose the deck can reach: a
 * `===` would make the sentence VANISH at any pose past the end, and the last pose of a slide
 * should be the pose that survives being over-shot. `Number.isInteger` is deliberately NOT
 * checked — a fractional pose between 0 and 1 answers `false` and one past 1 answers `true`,
 * which is the same monotone answer the deck's own clamped integer poses get.
 */
export function showsThesis(pose: number): boolean {
  return pose >= THESIS_POSE;
}
