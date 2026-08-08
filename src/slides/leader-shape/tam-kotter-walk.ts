// The six poses — TWO FRAMES as a figure in TIME.
//
// `./content.ts` owns the words and `./tam-kotter-geometry.ts` owns the stage
// coordinates; this module owns WHEN. It is the third seam in the pattern `./walk.ts`
// established for the first slide of this section and `./middle-out-walk.ts` repeated for
// the last, and it is deliberately the same shape so a reader who has read one has read
// all three.
//
// ═══ THE SIX POSES, AND WHAT EACH ONE ARGUES:
//
//   0 · {@link FACTORS_POSE} — the LEFT frame, named and attributed, with the top of its
//       causal chain: what shapes belief, and the four conditions that shape it. The room
//       is given the model's name, its author, its year and the one tier of it that is
//       inside a division head's authority — before it is told what any of that produces.
//   1 · {@link BELIEFS_POSE} — the two beliefs, their two questions, and the fan that
//       links them to the tier above. This is the pose that says the four conditions are
//       INPUTS to something rather than a list of good practice.
//   2 · {@link USE_POSE} — the intention, the use it becomes, and the left frame's own
//       closer. The left half is a whole argument at the end of this pose and could stand
//       on the stage alone.
//   3 · {@link SEQUENCE_POSE} — the RIGHT frame arrives entire: its name, its
//       attribution, and the five links of the condensed chain, staggered inside the one
//       pose so the room watches a chain being followed rather than a block appearing.
//   4 · {@link ORDER_POSE} — the right frame's closer. What the sequence costs when it is
//       run out of order.
//   5 · {@link UNIFIER_POSE} — the one line that belongs to neither frame, under both of
//       them. `canonicalPose`.
//
// ═══ NOTHING THAT HAS ARRIVED EVER LEAVES, AND THAT IS ARITHMETIC RATHER THAN CARE.
// Every gate below is a `>=` against a pose, so a pose is everything argued so far and
// there is no state for a later pose to undo. That is also what makes stepping the deck
// BACKWARDS — 5 → 0 — true by construction: walking back asks the same questions of a
// smaller number and gets the earlier answers, because there is no history for a
// backwards step to contradict. In particular the left frame does not dim when the right
// one arrives, and the right frame does not un-draw; it simply has not arrived yet.
//
// ═══ NO POSE RESTS ON EVIDENCE WITH ITS CONCLUSION MISSING. Pose 0 is a frame with a
// heading and one complete node, not a bordered box waiting to be filled. Pose 1 does not
// leave the two beliefs unconnected — the fan arrives with them. Pose 2 carries the left
// frame's CLOSER on the same pose as the two nodes it summarises, and that is a
// deliberate departure from `./walk.ts` next door, which gives its closer a pose of its
// own: there, six beats of evidence were still lit and a claim arriving beside the sixth
// would have read as a caption on it. Here the closer is the left frame's verdict on a
// chain that is finished the moment those two nodes land, and there is nothing else on
// that half of the stage for it to be mistaken for a caption on — so the component
// staggers it LAST within the pose instead, which buys the same separation without
// spending a step the argument does not need.
//
// ═══ THE RIGHT FRAME ARRIVES WHOLE, AND ITS FIVE LINKS DO NOT GET FIVE POSES. That is
// the load-bearing pose decision on this slide and it is a no-third-ladder decision
// rather than a pacing one. Five links on five clicks is a countdown: the room would
// count them, the presenter would number them out loud, and the deck would have taught a
// five-point scale without printing a single digit — which is precisely what §6.6's
// refusal is about (see `./content.ts`'s guardrails 1–6). One pose says the sequence is
// ONE object. The component still staggers the five inside that pose, because a chain
// that appears all at once is a block rather than a chain, but a stagger is 90ms of
// reading order and a pose is a claim the presenter stops on.
//
// ═══ AND THE RIGHT FRAME'S BOX WAITS FOR ITS OWN NAME. There is no gate here that draws
// an empty bordered rectangle on the right half of the stage at poses 0–2. `mandate-levers`
// establishes that an empty form UNDER ITS OWN HEADING reads as a promise rather than as a
// half-drawn stage — but the heading is what makes that true, and on this slide the
// heading IS the pose-3 event. An unlabelled empty box standing for three poses is the
// failure that precedent names, not the case it licenses. So {@link showsSequence} gates
// the frame, its title, its attribution, its hairline and its five links as one arrival.
//
// ═══ EVERY FUNCTION HERE IS TOTAL AND NONE OF THEM THROWS. A pose is UI state — it
// arrives from `DeckContext`, from a deep link, or from a test that deliberately
// over-shoots — and a slide that crashes on a pose is worse in front of a room than a
// slide with nothing revealed. That is the opposite of `panelLeft`, `kotterLinkTop` and
// `tamTierTop` in `./tam-kotter-geometry.ts`, which DO throw, and the difference is
// deliberate: an out-of-range FRAME, LINK or TIER index is an authoring bug the author
// must be shown, while an out-of-range POSE is not an authoring bug at all.
//
// ═══ EVERY POSE IS DERIVED FROM THE ONE BEFORE IT, AND THE STEP BUDGET FROM THE LAST.
// There is no `POSE` table of six literals here, unlike `./middle-out-walk.ts`, and the
// difference is a real one rather than a style: that module names two poses and COUNTS
// three off an array of bands, so a table of the named ones is honest. This slide counts
// nothing — all six poses are authored beats, and the five links of the right-hand chain
// deliberately do NOT contribute one each. So the honest construction is a chain of `+1`s
// in reading order, each carrying the reason it comes where it does, with
// {@link STEP_COUNT} and {@link CANONICAL_POSE} falling out of the end of it. Insert a
// beat anywhere in that chain and every later pose, the step budget and the export's
// canonical page all move together, and the slide file is not edited.
//
// Pure data and pure functions. No React, no DOM, and no work at module scope beyond the
// arithmetic below.
//
// IMPORTABLE FROM BARE `node` AS WELL AS FROM VITEST — this module imports nothing at
// all, which is worth stating because the equivalent module for the slide behind this one
// is NOT bare-node importable (it takes a VALUE import of `./content` to count its bands,
// and `node --experimental-strip-types` does not resolve extensionless sibling
// specifiers). Nothing here needs the copy, because no pose on this slide is counted off
// an array — see the paragraph above.

/**
 * The first pose: 0 — the left frame, named and attributed, and the top of its causal
 * chain.
 *
 * NAMED RATHER THAN WRITTEN AS A LITERAL, and named at 0 rather than assumed. The
 * off-by-one this slide is at risk of lives exactly here: does the left frame's first
 * node land on pose 0, or does pose 0 hold an empty labelled frame and the node arrive on
 * 1? It lands on 0, because a frame whose header stands over nothing is the "slide that
 * failed to finish" reading, and because the four external factors are the half of the
 * acceptance model this room can act on — the room should be looking at them while the
 * presenter is still saying the model's name.
 *
 * THERE IS NO `showsFactors` GATE, and its absence is the decision. Everything this pose
 * carries is on the stage at every pose the deck can reach, so a gate would be a question
 * with one answer — the same call `./components/MiddleOutBands.tsx` makes about its
 * standing kicker.
 */
export const FACTORS_POSE = 0;

/**
 * The two beliefs and the fan that feeds them: 1.
 *
 * ONE PAST {@link FACTORS_POSE}, and derived rather than typed for the reason every
 * constant in this chain is: inserting a beat ahead of this one must move it, and a
 * literal 1 is how a later beat silently lands on top of an earlier one.
 *
 * THE TWO BELIEFS SHARE A POSE AND MUST GO ON SHARING ONE. The acceptance model treats
 * them as a pair — neither precedes the other and neither outranks it — and two poses
 * would put a sequence on the stage that the model does not have. The component may
 * stagger them by milliseconds; what it may not do is put them on different poses, and
 * `./tam-kotter-geometry.ts` holds the same line in space by giving them one width and
 * one line.
 */
export const BELIEFS_POSE = FACTORS_POSE + 1;

/**
 * The intention, the use it becomes, and the left frame's closer: 2.
 *
 * TWO NODES AND A VERDICT ON ONE POSE, which is the only pose on this slide that carries
 * more than one beat of its own frame. It is deliberate: `BEHAVIORAL INTENTION` and
 * `ACTUAL USE` are the model's least surprising half — a room that has been given the
 * four conditions and the two beliefs can finish the sentence itself — and spending two
 * clicks on the part the room has already worked out is how a presenter loses it. The
 * component staggers the three arrivals so the chain still reads as a chain.
 *
 * IT IS ALSO THE POSE THE LEFT HALF BECOMES WHOLE ON. At the end of it the frame has a
 * name, an author, a year, a complete causal chain and a verdict — which is what makes
 * the next pose an ADDITION rather than a continuation.
 */
export const USE_POSE = BELIEFS_POSE + 1;

/**
 * The right frame, entire: 3 — its name, its attribution, its hairline and all five
 * links of the condensed chain.
 *
 * ONE POSE FOR FIVE LINKS. See the header: five links on five poses would be a countdown
 * and a countdown is the third ladder §6.6 refuses. What arrives here is one object — a
 * sequence — and the stagger inside the pose is reading order, not argument.
 *
 * IT CANNOT ARRIVE EARLIER THAN THE LEFT FRAME'S CLOSER, and that ordering is the slide's
 * argument in time: the acceptance model explains why a person starts, and the change
 * model only becomes interesting once the room has accepted that starting is not the same
 * as sticking. A right frame standing beside an unfinished left one would read as two
 * diagrams competing for the room's attention.
 */
export const SEQUENCE_POSE = USE_POSE + 1;

/**
 * The right frame's closer: 4.
 *
 * ITS OWN POSE, and NOT shared with the five links the way the left frame's closer is
 * shared with its last two nodes. The difference is what the two closers do. The left
 * one restates what its chain has just shown; this one makes a CLAIM the chain does not
 * make — that most initiatives stall, and that skipping is why — and a claim that arrives
 * in the same breath as the evidence for it reads as a caption on the evidence. It also
 * carries the one sentence that says the order matters, which is the sentence this
 * slide's whole geometry refuses to say structurally, so it gets the room's full
 * attention for one click.
 */
export const ORDER_POSE = SEQUENCE_POSE + 1;

/**
 * The line under both frames: 5 — the last pose, and the only object on this stage that
 * belongs to neither model.
 *
 * IT ARRIVES WITH BOTH FRAMES COMPLETE AND NEVER BEFORE. It is a conjunction — belief
 * AND sequence — and a conjunction printed while one of its two halves is still arriving
 * is a promise rather than a conclusion. This is also the only pose on the slide that
 * changes nothing inside either frame, which is the point: the room's eyes leave the two
 * boxes and land on the one line that connects them.
 */
export const UNIFIER_POSE = ORDER_POSE + 1;

/**
 * Six — what the slide file declares as `steps`.
 *
 * `UNIFIER_POSE + 1`, because a step count is a COUNT and the unifying line is the last
 * INDEX: left frame (3 poses) + right frame (2) + the line under both (1) = 6 poses, 0…5.
 *
 * DERIVED AND NOT TYPED, for the reason `./middle-out-walk.ts` states at length about its
 * own: a literal `steps: 6` is exactly how an inserted beat becomes a pose the deck can
 * never reach — `DeckContext` clamps at `steps - 1`, so there would be no error, no blank
 * slide and no failing test, just one argument that is never made and a unifying line
 * that arrives while a frame is still incomplete.
 */
export const STEP_COUNT = UNIFIER_POSE + 1;

/**
 * The pose the PDF and PPTX exports print: 5 — the fullest one.
 *
 * IMPORTED AND NOT TYPED IN THE SLIDE FILE, for the same reason as {@link STEP_COUNT}: it
 * is "the last pose", so inserting a beat moves it, and a literal 5 would silently pin
 * the export to a page where the last argument is still arriving.
 *
 * ANY LOWER POSE IS A HALF-MADE ARGUMENT ON A PAGE THAT CANNOT EXPLAIN ITSELF, and on
 * this slide the failure is specific: pose 4 exports two complete, attributed frames with
 * NO statement of how they relate — two academic models printed side by side and left for
 * the reader to join, which is the one way a slide about adoption could travel badly
 * inside an organisation. The unifying line is the only thing on the stage that says why
 * there are two frames at all.
 */
export const CANONICAL_POSE = UNIFIER_POSE;

/**
 * Whether the two belief nodes and the fan that feeds them are on the stage.
 *
 * `>=` AND NOT `===`, which is the cumulative rule every gate in this module keeps: the
 * nodes arrive once and stay for every pose after, because attention on this stage is
 * bought with added light and never subtracted. A `pose === …` here would be the bug this
 * function exists to prevent — the two beliefs would vanish the moment the intention node
 * arrived, and the causal chain would render with a hole in the middle of it.
 */
export function showsBeliefs(pose: number): boolean {
  return pose >= BELIEFS_POSE;
}

/** Whether the intention node, the use node and the two connectors between them are on
 *  the stage. */
export function showsUse(pose: number): boolean {
  return pose >= USE_POSE;
}

/**
 * Whether the LEFT frame's closer is on the stage.
 *
 * IT DELEGATES RATHER THAN REPEATING `pose >= USE_POSE`, and that is the whole reason it
 * exists as its own function — the same construction `./middle-out-walk.ts` uses for its
 * own closer. The closer and the last two nodes are different objects: one is the chain's
 * end, the other is the frame's verdict, and a component or a test should be able to ask
 * about the one it means. But they arrive together, and two functions with the same body
 * are two places for a later edit to move only one. Delegation says "same pose, by
 * definition" in a way that cannot drift.
 *
 * IF THE LEFT CLOSER EVER NEEDS ITS OWN POSE, this is the single line to change, and
 * every pose after it — plus {@link STEP_COUNT} and {@link CANONICAL_POSE} — moves on its
 * own.
 */
export function showsTamCloser(pose: number): boolean {
  return showsUse(pose);
}

/**
 * Whether the RIGHT frame is on the stage at all: its box, its title, its attribution,
 * its hairline and its five links.
 *
 * ONE GATE FOR ALL NINE OBJECTS, because they are one arrival. See the header on why the
 * frame's box is not drawn earlier, and on why the five links do not get five poses of
 * their own — a second gate here is all it would take for a later edit to turn the chain
 * into a countdown.
 */
export function showsSequence(pose: number): boolean {
  return pose >= SEQUENCE_POSE;
}

/** Whether the RIGHT frame's closer is on the stage. Its own gate and its own pose — see
 *  {@link ORDER_POSE} for why this one does not delegate the way its opposite number
 *  does. */
export function showsKotterCloser(pose: number): boolean {
  return pose >= ORDER_POSE;
}

/**
 * Whether the line under both frames is on the stage.
 *
 * `>=` AND NOT `===`, even though {@link UNIFIER_POSE} is the last pose the deck can
 * reach: a `===` would make the slide's conclusion VANISH at any pose past the end, and
 * the last pose of a slide should be the pose that survives being over-shot.
 */
export function showsUnifier(pose: number): boolean {
  return pose >= UNIFIER_POSE;
}
