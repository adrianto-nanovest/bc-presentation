// The five poses — MIDDLE-OUT as a figure in TIME.
//
// `./content.ts` owns the words and `./middle-out-geometry.ts` owns the stage
// coordinates; this module owns WHEN. It is the third seam in the pattern
// `./walk.ts` established for the slide beside this one, and it is deliberately the
// same shape so a reader who has read one has read both.
//
// ═══ THE FIVE POSES, AND WHAT EACH ONE ARGUES:
//
//   0 · {@link POSE.CHART} — three bands, their row labels, and the standing kicker.
//       The organisation, named and nothing else. No claim has been made yet, all
//       three bands rest at the same colour tier, and the room's only job is to find
//       itself in one of the rows. This is `canonicalPose`'s natural home if the
//       exports ever want one: it is the only pose that is purely the figure.
//   1 · The TOP band gains what it holds and what it cannot do.
//   2 · The BOTTOM band gains the same two rows.
//   3 · The MIDDLE band gains its two rows AND lights to the bright tier. Both halves
//       of that happen on one pose because they are one claim — see {@link isMiddleLit}.
//   4 · {@link TRANSLATION_POSE} — the two direction lines, their shared label, the two
//       translations, and the closer.
//
// ═══ NOTHING THAT HAS ARRIVED EVER LEAVES, AND THAT IS ARITHMETIC RATHER THAN CARE.
// Every gate below is a `>=` against a pose, so a pose is everything argued so far and
// there is no state for a later pose to undo. That is also what makes stepping the deck
// BACKWARDS — 4 → 0 — true by construction: walking back asks the same questions of a
// smaller number and gets the earlier answers, because there is no history for a
// backwards step to contradict. In particular the middle band does not un-light and the
// two direction rules do not un-draw; they simply have not arrived yet.
//
// ═══ NO POSE RESTS ON EVIDENCE WITH ITS CONCLUSION MISSING. Poses 1 and 2 each finish a
// whole band — what it holds AND what it cannot do — rather than laying out three
// `holds` rows and then three `qualifier` rows, which would leave pose 1 resting on a
// stage that says only that everybody has something. Pose 3 is the conclusion those two
// were evidence for. Pose 4 carries the closer on the SAME pose as the two translations
// it summarises, and that is a deliberate departure from `./walk.ts` next door, which
// gives its closer a pose of its own: there, six beats of evidence were still lit and a
// claim arriving beside the sixth would have read as a caption on it. Here the two
// translations ARE the closer's subject and there is nothing else on the stage for it to
// be mistaken for a caption on — so the component staggers it LAST within the pose
// instead, which buys the same separation without spending a step the argument does not
// need.
//
// ═══ EVERY FUNCTION HERE IS TOTAL AND NONE OF THEM THROWS. A pose is UI state — it
// arrives from `DeckContext`, from a deep link, or from a test that deliberately
// over-shoots — and a slide that crashes on a pose is worse in front of a room than a
// slide with nothing revealed. That is the opposite of `bandTop` and `claimRowTop` in
// `./middle-out-geometry.ts`, which DO throw, and the difference is deliberate: an
// out-of-range BAND index is an authoring bug the author must be shown, while an
// out-of-range POSE is not an authoring bug at all. {@link showsBandClaims} therefore
// answers `false` for a band the chart does not have rather than throwing — the
// geometry's placement function will throw on the same index a moment later, so the
// authoring bug is still caught, at the one seam that owns it.
//
// ═══ THE STEP BUDGET IS DERIVED FROM THE BAND COUNT — see {@link STEP_COUNT}. A fourth
// band must GROW the budget, not silently lose a beat.
//
// Pure data and pure functions. No React, no DOM, no work at module scope beyond
// counting the bands.
//
// IMPORTABLE FROM A VITEST TEST, AND — UNLIKE `./middle-out-geometry.ts` — NOT FROM BARE
// `node`. The one import below is a VALUE import of a sibling written without a file
// extension, which is what the whole tree does and what Vite and Vitest resolve;
// `node --experimental-strip-types` does not, and answers `ERR_MODULE_NOT_FOUND`. The
// distinction is written down because the two modules beside this one both claim
// bare-node importability and both earn it (one imports nothing, the other imports a
// type), so a reader would otherwise reasonably assume it here.
import { shapeMiddleOutContent } from "./content";

/**
 * The two poses that have NAMES, because the other three are counted.
 *
 *   0 · `CHART` — the three bands and their row labels. The organisation, before any
 *       claim about it.
 *   1 · `FIRST_CLAIM` — the first band gains its two rows.
 *
 * NAMED RATHER THAN COMPARED AS LITERALS: `pose >= 1` in a component says nothing about
 * what 1 IS, and the off-by-one this slide is at risk of lives exactly on this boundary
 * — does the first claim land on pose 0, on top of a chart the room has not finished
 * reading, or on 1? Everything below derives from `FIRST_CLAIM`, so holding the bare
 * chart for a second pose is one edit here and no edit anywhere else.
 *
 * THE THREE CLAIM BEATS ARE NOT NAMED. Beat `i` is `FIRST_CLAIM + i`, and which band
 * beat `i` argues is `./content.ts`'s `claimBeat` — three more names here would be
 * three more places to disagree with the teaching order that file holds.
 */
export const POSE = { CHART: 0, FIRST_CLAIM: 1 } as const;

/**
 * Three beats — one per band, READ OFF THE BANDS.
 *
 * ONE BAND PER BEAT AND NO GROUPING. The two outer bands could be argued together —
 * they are the same shape of claim, and a presenter in a hurry will say them in one
 * breath — but a shared beat would put the top's limit and the bottom's limit on the
 * stage at the same moment, and the middle band's "Holds both" depends on the room
 * having felt them as two separate absences.
 *
 * FROM `shapeMiddleOutContent.bands.length` AND NOT FROM `BAND_COUNT` in
 * `./middle-out-geometry.ts`, though a test holds those two equal. A beat argues a
 * band's COPY — its two rows, their eyebrows, their keywords — so the array the copy
 * lives in is the honest source; the geometry's count answers a different question (how
 * the stage is divided). Either gives 3 today, and taking it from the copy means a
 * fourth band written into the content grows the walk even if the stage has not been
 * re-cut yet.
 */
export const CLAIM_BEATS: number = shapeMiddleOutContent.bands.length;

/**
 * The last pose that argues a band: 3.
 *
 * `POSE.FIRST_CLAIM + CLAIM_BEATS − 1`, i.e. the last index of the walk rather than one
 * past its end. It is exported because it is the pose the MIDDLE band arrives on, which
 * is the pose the figure changes colour on — see {@link isMiddleLit}.
 */
export const LAST_CLAIM_POSE: number = POSE.FIRST_CLAIM + CLAIM_BEATS - 1;

/**
 * The pose the two translations and the closer arrive on: 4 — the first pose AFTER the
 * last band.
 *
 * `POSE.FIRST_CLAIM + CLAIM_BEATS`, which is the same arithmetic as "one past the end"
 * on an array and fails the same way if it is typed by hand: a literal 4 would draw the
 * direction rules on top of the third band's own claims the day a fourth band landed,
 * with no error anywhere.
 *
 * IT IS ITS OWN POSE AND DOES NOT SHARE THE MIDDLE BAND'S. The two translations are what
 * the middle band's position lets it DO, and they can only be read as consequences of a
 * claim the room has already been given. Arriving together, they would read as three
 * more rows of the middle band.
 */
export const TRANSLATION_POSE: number = POSE.FIRST_CLAIM + CLAIM_BEATS;

/**
 * Five — what the slide file declares as `steps`.
 *
 * `TRANSLATION_POSE + 1`, because a step count is a COUNT and the translations are the
 * last INDEX: chart + three bands + translations = 5 poses, 0…4.
 *
 * DERIVED FROM THE BAND COUNT ON PURPOSE. A fourth band must GROW the step budget to
 * six rather than silently lose a beat, and a literal `steps: 5` is exactly how it would
 * lose one: the fourth band's claims would be a pose the deck cannot reach —
 * `DeckContext` clamps at `steps - 1` — so there would be no error, no blank slide and
 * no test failure, just one band whose claims are never made and a set of translations
 * that arrive while a band is still unargued. The step budget is therefore not a layout
 * number; it is a consequence of how many bands there are.
 */
export const STEP_COUNT: number = TRANSLATION_POSE + 1;

/**
 * "No band arrives at this pose" — and it is a VALUE, not `null` and not `undefined`.
 *
 * −1 is what an index-returning function can return without widening its type, so every
 * caller compares one number against one number and the band indices stay indices. A
 * `number | null` would put a truthiness bug one keystroke away, because band 0 — the
 * board, the first beat of the walk — is falsy. It is also out of range for every array
 * on this slide, so a caller that forgets to check gets `undefined` from
 * `bands[NO_ARRIVAL]` and renders visibly nothing, rather than the LAST band — which is
 * what `bands.at(-1)` would hand back, and which would arrive the teams' claims under
 * the closer's own pose.
 */
export const NO_ARRIVAL = -1;

/**
 * Which band's claims ARRIVE at the given pose: poses 1…3 → the band whose `claimBeat`
 * is `pose − 1`, and every other pose {@link NO_ARRIVAL}.
 *
 * THIS IS WHERE THE TEACHING ORDER BECOMES A TIME. `./content.ts` says the argument runs
 * top → bottom → MIDDLE and records why; this function is the only place that order is
 * turned into poses, so the rows, the eyebrows and the stagger delays all ask one
 * question of the same pose and cannot come to disagree about which band is being
 * argued.
 *
 * `findIndex` RETURNS −1 ON A MISS, which IS {@link NO_ARRIVAL} — so poses 0 and 4 fall
 * out of the search rather than being special-cased, and there is no un-arrive step for
 * a later edit to forget.
 *
 * TOTAL, AND IT DOES NOT THROW. A pose outside the walk — negative, past the last, or
 * fractional — answers {@link NO_ARRIVAL}. `Number.isInteger` is the sharper half of
 * that: pose 1.5 would otherwise search for `claimBeat === 0.5`, which is a miss today
 * and would stay a miss, but the check states the intent rather than relying on the
 * beats happening to be whole numbers.
 */
export function claimingBandIndex(pose: number): number {
  if (!Number.isInteger(pose)) return NO_ARRIVAL;
  const beat = pose - POSE.FIRST_CLAIM;
  return shapeMiddleOutContent.bands.findIndex((band) => band.claimBeat === beat);
}

/**
 * Whether band `bandIndex`'s two claim rows are on the stage at the given pose.
 *
 * THE CUMULATIVE GATE, and the one the six rows actually read. `>=` and not `===`: the
 * rows arrive once and stay for every pose after, which is what says the walk never
 * removes anything (attention on this stage is bought with added light, never
 * subtracted). A `pose === …` here would be the bug this function exists to prevent —
 * the top band's claims would vanish the moment the bottom band's arrived, and the
 * middle band's "Holds both" would then refer to two rows nobody can see.
 *
 * FALSE FOR A BAND THE CHART DOES NOT HAVE, rather than a throw — see the header. An
 * unknown band has no claims to show, and `bandTop` in `./middle-out-geometry.ts`
 * throws on the same index at the moment the component tries to place it.
 */
export function showsBandClaims(bandIndex: number, pose: number): boolean {
  const band = shapeMiddleOutContent.bands[bandIndex];
  if (!band) return false;
  return pose >= POSE.FIRST_CLAIM + band.claimBeat;
}

/**
 * Whether the MIDDLE band is at its bright tier.
 *
 * TRUE FROM {@link LAST_CLAIM_POSE} ONWARD AND NEVER FALSE AGAIN. The middle band lights
 * on the pose its own claims arrive, because the light and the claim are one event: the
 * band gets brighter BECAUSE of what has just been said about it, and a tier change on
 * any other pose would be the stage ranking a band before it had earned it (pose 2) or
 * as an afterthought to the translations (pose 4).
 *
 * IT IS WRITTEN AGAINST THE LAST CLAIM POSE AND NOT AGAINST A BAND INDEX, deliberately.
 * `./content.ts` gives the middle band the LAST claim beat precisely so that the
 * brightest band is the one that arrives last, and phrasing this as
 * `showsBandClaims(MIDDLE_BAND_INDEX, pose)` would make this module import
 * `./middle-out-geometry.ts` or re-derive `(BAND_COUNT − 1) / 2` a second time. The two
 * facts are welded by a test — `bands[MIDDLE_BAND_INDEX].claimBeat === CLAIM_BEATS − 1`
 * — which is the assertion to write if the teaching order is ever re-sorted, because
 * re-sorting it without moving this function would light the wrong band.
 *
 * RANK, NOT REVEAL. What this gates is a COLOUR TIER on the copper/neutral ramp, never
 * an opacity: opacity on this stage means "not revealed yet", i.e. TIME, and the middle
 * band has been on the stage since pose 0. A brighter band among three identical boxes
 * is the slide's entire argument rendered without a word.
 */
export function isMiddleLit(pose: number): boolean {
  return pose >= LAST_CLAIM_POSE;
}

/**
 * Whether the rail and the translation column are on the stage: the two direction
 * rules, the origin bar, the shared label and the two translations.
 *
 * ONE GATE FOR ALL FIVE OBJECTS, because they are one arrival. The two rules are
 * simultaneous by construction — the slide's claim is that the middle translates in both
 * directions at once, and two gates would let a later edit stagger them into a sequence,
 * which is the reading the no-new-ladder guardrail exists to prevent. The component may
 * still stagger them by MILLISECONDS within the pose; what it may not do is put them on
 * different poses.
 *
 * `>=` AND NOT `===`, even though {@link TRANSLATION_POSE} is the last pose the deck can
 * reach: a `===` would make the whole close VANISH at any pose past the end, and the
 * last pose of a slide should be the pose that survives being over-shot.
 */
export function showsTranslations(pose: number): boolean {
  return pose >= TRANSLATION_POSE;
}

/**
 * Whether the closer is on the stage.
 *
 * IT DELEGATES RATHER THAN REPEATING `pose >= TRANSLATION_POSE`, and that is the whole
 * reason it exists as its own function. The closer and the translations are two
 * different objects — one is the figure's last mark, the other is the slide's last
 * sentence — so a component and a test should each be able to ask about the one they
 * mean. But they arrive together, and two functions with the same body are two places
 * for a later edit to move only one. Delegation says "same pose, by definition" in a way
 * that cannot drift.
 *
 * IF THE CLOSER EVER NEEDS ITS OWN POSE, this is the single line to change, and
 * {@link STEP_COUNT} would have to grow with it.
 */
export function showsCloser(pose: number): boolean {
  return showsTranslations(pose);
}
