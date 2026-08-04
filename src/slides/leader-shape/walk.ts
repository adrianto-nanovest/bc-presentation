// The nine poses — THE AGENTIC ORGANIZATION as a figure in TIME.
//
// Spec §7.1 (the step budget: nine steps, six beats, no grouping) · §6.6 (what each
// beat has to say and what it has to index). `./content.ts` owns the words and
// `./geometry.ts` owns the stage coordinates; this module owns WHEN.
//
// WHY IT IS ITS OWN MODULE. The pose → pillar map is the ONE fact the slide file,
// the six spokes, the six boxes, the decision column, the closer and the tests all
// read, and it is neither copy nor coordinates — so it has no home in either of the
// other two. Left inline in the component it would be four `pose >= n` comparisons
// spread through one JSX tree, which is how a figure ends up with a spoke that
// thickens at a pose the box it joins is not lit at, and it would give a node test
// nothing to hold: the walk's rules would only be checkable by rendering.
//
// EVERY FUNCTION HERE IS A FUNCTION OF THE POSE ALONE. No state, no memo, no
// "previously focused" pillar, nothing to reset. That is what makes the issue's
// `8 → 0` acceptance criterion true BY CONSTRUCTION — walking backwards asks the
// same four questions of a smaller number and gets the earlier answers, because
// there is no history for a backwards step to contradict. It is also what makes "no
// beat leaves a pillar stuck in its focused state" arithmetic rather than cleanup:
// see {@link focusedPillarIndex} at {@link CLOSER_POSE}.
//
// THE STEP BUDGET IS DERIVED FROM THE PILLAR COUNT, deliberately — see
// {@link STEP_COUNT}. A seventh pillar must GROW the budget, not silently lose a
// beat.
//
// Pure data and pure functions. No React, no DOM, no work at module scope beyond
// counting the pillars.
//
// IMPORTABLE FROM A VITEST TEST, AND — UNLIKE `./geometry.ts` — NOT FROM BARE `node`.
// The one import below is a VALUE import of a sibling written without a file
// extension, which is what the whole tree does and what Vite and Vitest resolve;
// `node --experimental-strip-types` does not, and answers `ERR_MODULE_NOT_FOUND`.
// The distinction is written down because `./geometry.ts` and `./content.ts` both
// claim bare-node importability and both earn it (one imports nothing, the other
// imports a type), so a reader would otherwise reasonably assume it here — and
// `scripts/gh55-verify.mjs` is a bare-node harness that tried. It transcribes the
// three pose numbers instead, which is the trade this comment exists to make
// visible: a second copy of `2 / 8 / 9` in the harness, in exchange for the count
// staying derived from the pillars everywhere the deck actually renders from.
import { shapeOrgContent } from "./content";

/**
 * The three poses that have NAMES, because the other six are counted.
 *
 *   0 · `HUB` — the hub, its brand line, and the standing kicker. Who the enabler
 *       is, before what surrounds it.
 *   1 · `RING` — the six pillars, spokes and labels arrive as a sweep, all at full
 *       strength. This is `canonicalPose`: the pose the PDF and PPTX exports print.
 *   2 · `FIRST_DECISION` — the walk starts, on pillar 0, and the decision column
 *       opens beside the ring.
 *
 * NAMED RATHER THAN COMPARED AS LITERALS: `pose >= 1` in a component says nothing
 * about what 1 IS, and both off-by-ones this slide is at risk of live on these
 * boundaries — does the first decision land on pose 1 (overwriting the reveal the
 * room has not finished reading) or on 2? does the closer's pose keep the sixth
 * pillar lit? Everything below derives from `FIRST_DECISION`, so moving the walk
 * one pose later is one edit here and no edit anywhere else.
 *
 * THE SIX BEATS ARE NOT NAMED. Beat `i` is `FIRST_DECISION + i` for pillar `i`, and
 * six more names would be six more places to disagree with the ring order
 * `./content.ts` holds.
 */
export const POSE = { HUB: 0, RING: 1, FIRST_DECISION: 2 } as const;

/**
 * Six beats — one per pillar, READ OFF THE PILLARS.
 *
 * §7.1: "six pillars × one leader decision each is six beats minimum". The issue
 * refuses the grouping that would make it three (governance+tools / people+strategy
 * / process+companions) because a shared beat costs the one-decision-per-pillar
 * clarity that is the whole reason this slide can be an index. So: six, no grouping.
 *
 * FROM `shapeOrgContent.pillars.length` AND NOT FROM `PILLAR_COUNT` in
 * `./geometry.ts`, though the test holds those two equal. A beat prints a pillar's
 * COPY — its label, its decision, its keyword — so the array the copy lives in is
 * the honest source; the geometry's count answers a different question (how the
 * ellipse is divided). Either would give 6 today, and taking it from the copy means
 * a seventh pillar written into the content grows the walk even if the ring has not
 * been re-cut yet.
 */
export const DECISION_BEATS: number = shapeOrgContent.pillars.length;

/**
 * The closer's pose: 8 — the first pose AFTER the last beat.
 *
 * `FIRST_DECISION + DECISION_BEATS`, which is the same arithmetic as "one past the
 * end" on an array and fails the same way if it is typed by hand: an 8 written as a
 * literal would print the closer on top of the sixth decision the day a seventh
 * pillar lands, with no error anywhere.
 *
 * IT IS ITS OWN POSE AND DOES NOT SHARE THE SIXTH BEAT'S. §6.6's closer is the claim
 * the six decisions were evidence for — "none of them is a tool purchase" — and a
 * claim that appears while its last piece of evidence is still lit reads as a
 * caption on that piece. It also needs the column the sixth beat is using.
 */
export const CLOSER_POSE: number = POSE.FIRST_DECISION + DECISION_BEATS;

/**
 * Nine — what `./shape-agentic-org.tsx` declares as `steps`.
 *
 * `CLOSER_POSE + 1`, because a step count is a COUNT and the closer is the last
 * INDEX: hub + ring + six beats + closer = 9 poses, 0…8.
 *
 * DERIVED FROM THE PILLAR COUNT ON PURPOSE. A seventh pillar must GROW the step
 * budget to ten rather than silently lose a beat, and a literal `steps: 9` is
 * exactly how it would lose one: the seventh pillar's decision would be a pose the
 * deck cannot reach — `DeckContext` clamps at `steps - 1` — so there would be no
 * error, no blank slide and no test failure, just one pillar whose decision is never
 * spoken and a closer that arrives while a pillar is still lit. The step budget is
 * therefore not a layout number; it is a consequence of how many decisions there
 * are.
 */
export const STEP_COUNT: number = CLOSER_POSE + 1;

/**
 * "No pillar is focused" — and it is a VALUE, not `null` and not `undefined`.
 *
 * −1 is what an index-returning function can return without widening its type, so
 * every caller compares one number against one number and the geometry indexes stay
 * indexes. A `number | null` would put a truthiness bug one keystroke away, because
 * pillar 0 — Governance, the first beat of the walk — is falsy.
 *
 * IT IS ALSO OUT OF RANGE FOR EVERY ARRAY ON THIS SLIDE, which is the second half of
 * the choice: a caller that forgets to check gets `undefined` from
 * `pillars[NO_FOCUS]` and renders a visibly empty column, rather than the LAST
 * pillar — which is what `pillars.at(-1)` would hand back, and which would light AI
 * Companions under the closer's own copy.
 */
export const NO_FOCUS = -1;

/**
 * Which pillar the given pose focuses: poses 2…7 → pillars 0…5, and every other
 * pose {@link NO_FOCUS}.
 *
 * THE WHOLE FOCUS RULE, IN ONE PLACE. The boxes, the spokes, the eyebrow, the
 * counter and the decision line all ask this one question of the same pose, so a
 * spoke cannot thicken for a box that is not lit and the counter cannot say "03" on
 * the beat that lights pillar 3.
 *
 * THE CLOSER POSE RETURNS `NO_FOCUS`, and that is the implementation of the issue's
 * "no beat leaves a pillar stuck in its focused state". At pose 8 the ring is back
 * to exactly the figure it was at pose 1 — six pillars at full strength, six
 * hairline spokes, nothing dimmed and nothing lit — and the only thing added is the
 * closer. It falls out of the arithmetic (`8 - 2 = 6`, which is not a pillar), so
 * there is no un-focus step for a later edit to forget. The alternative every
 * prototype reaches for is to keep the last-focused index and clear it on the closer;
 * that is one place to forget and one place to get wrong when the walk is stepped
 * BACKWARDS from 8.
 *
 * TOTAL, AND IT DOES NOT THROW. A pose outside the walk — negative, past the last,
 * or fractional — returns `NO_FOCUS` instead. That is the opposite of `pillarCentre`
 * and `decisionCounter`, which throw, and the difference is deliberate: an
 * out-of-range PILLAR index is an authoring bug the author must be shown, while a
 * pose is UI state, and a slide that crashes on a pose is worse in front of a room
 * than a slide with nothing focused.
 *
 * NO PRODUCTION CALLER CAN REACH THOSE POSES TODAY, and the totality is worth the
 * two comparisons anyway. `DeckProvider` stores an integer step and clamps `goTo` to
 * `steps - 1`, so the deck hands this function 0…8 and nothing else; what reaches the
 * edges is a DIRECT CALL — this module's own test, the component test that renders
 * pose 12 to prove nothing extra appears — plus whatever a later edit to `steps`
 * leaves behind in an export or a deep link. So: defensive by intent, not a path
 * anyone walks.
 *
 * `Number.isInteger` IS THE SHARPER HALF of that: pose 2.5 would otherwise pass the
 * range check as 0.5 and hand a caller `pillars[0.5]` — `undefined` — from a value
 * that had already been checked against `NO_FOCUS`, which renders as a lit spoke
 * beside an empty column rather than as an error.
 */
export function focusedPillarIndex(pose: number): number {
  if (!Number.isInteger(pose)) return NO_FOCUS;
  const index = pose - POSE.FIRST_DECISION;
  return index >= 0 && index < DECISION_BEATS ? index : NO_FOCUS;
}

/**
 * Whether the six pillars, their spokes and their labels are on the stage.
 *
 * TRUE FROM {@link POSE.RING} ONWARD AND NEVER FALSE AGAIN — the ring is not a pose,
 * it is the figure, and every pose after 1 is an argument laid over it. This is what
 * says the walk never removes anything: the six arrive once, at full strength, and
 * the beats add light to one of them (§7.1 — attention is bought with added light,
 * never subtracted).
 *
 * A `pose === 1` HERE WOULD BE THE BUG THIS FUNCTION EXISTS TO PREVENT, and it is
 * the kind a reveal written per-pose invites: the pillars would vanish the moment
 * the first decision arrived.
 */
export function showsPillars(pose: number): boolean {
  return pose >= POSE.RING;
}

/**
 * Whether the closer is on the stage.
 *
 * `>=` AND NOT `===`, even though {@link CLOSER_POSE} is the last pose the deck can
 * reach. A `===` would make the closer VANISH at any pose past the end, which is the
 * wrong failure mode for the same reason {@link focusedPillarIndex} is total: the
 * over-shoot is not a production path today (`DeckProvider` clamps), it is a direct
 * call — a test proving pose 12 adds nothing — and whatever a later edit to `steps`
 * strands in an export or a deep link. The last pose of a slide should be the pose
 * that survives being over-shot.
 */
export function showsCloser(pose: number): boolean {
  return pose >= CLOSER_POSE;
}

/**
 * Whether the walk's column is on the stage at all — its left hairline and the slot
 * around it (`WALK_COLUMN` in `./geometry.ts`).
 *
 * TRUE FROM THE FIRST BEAT ONWARD, INCLUDING THE CLOSER'S POSE, which is why this is
 * a separate question from `focusedPillarIndex(pose) !== NO_FOCUS`. The column is one
 * object holding two things in turn — six decisions, then the closer — and the
 * prototype's mistake was to treat them as two: it faded a bordered panel out with
 * `opacity: active ? 1 : 0` and faded a SECOND bordered block in for the closer, so
 * at pose 8 the left hairline blinked off and on in the same place. Two elements
 * pretending to be one column, and the blink is what gives it away on a projector.
 *
 * IT ALSO NEVER OPENS AT POSE 1. The ring's own reveal is a 6-box sweep, and a
 * hairline arriving beside it would compete with the thing the room is watching.
 */
export function showsWalkColumn(pose: number): boolean {
  return pose >= POSE.FIRST_DECISION;
}
