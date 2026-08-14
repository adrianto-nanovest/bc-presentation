// The two poses — TWO ENGINES as a figure in TIME.
//
// `./content.ts` owns the words, `./tam-kotter-geometry.ts` owns the stage coordinates and
// `./components/tam-kotter.css` owns the motion; this module owns WHEN. It is the third
// seam in the pattern `./walk.ts` established for the first slide of this section and
// `./middle-out-walk.ts` repeated for the last.
//
// ────────────────────────────────────────────────────────────────────────────
// SIX POSES BECAME TWO (owner call). What was here — FACTORS · BELIEFS · USE ·
// SEQUENCE · ORDER · UNIFIER, one `>=` gate each — is retired, and the argument is worth
// writing down because the retired version spent a page defending the six.
//
//   1. THE SIX POSES WERE A READING ORDER, AND A READING ORDER IS NOT A CLICK. Every one
//      of poses 0…4 added a piece of ONE object: a frame, then two nodes of that frame,
//      then two more, then the second frame, then its verdict. Nothing was ever REVISED,
//      contradicted, or shown to be conditional on the pose before it — which is the only
//      thing a presenter click can buy that a stagger cannot. A room does not need
//      permission to look at the second half of a diagram.
//   2. THE STAGGER WAS ALREADY DOING THE WORK. `./components/TamKotterFrames.tsx` staggered
//      inside every one of those six poses — the frame box, then its header, then its
//      body, then each link 90ms after the last. Five of the six poses were therefore a
//      click that started a stagger the sixth would have started anyway.
//   3. AND THE RIGHT FRAME STOOD EMPTY FOR THREE OF THEM. The old {@link showsSequence}
//      gate held half the stage black until pose 3, so a presenter who spoke to the left
//      frame for two minutes did it beside 576px of nothing. The two frames are a PAIR —
//      that is the slide's entire claim — and a pair presented one at a time is two
//      slides.
//   4. THE ONE CLICK THAT SURVIVED IS THE ONE THAT CHANGES THE ARGUMENT. Both frames are
//      evidence; the thesis is the conclusion drawn FROM them, it belongs to neither, and
//      it is the only object on this stage a room can agree or disagree with. That is a
//      claim arriving, not a piece of a diagram, and it is worth a press.
//
// WHAT THE OLD SHAPE COST, stated plainly so this is reversible: six poses guaranteed the
// presenter walked the room through both models in one order. Two poses do not — the room
// gets the whole figure at once and can read the right frame while the presenter is on the
// left. That is the trade. The BUILD is what pays for it: the figure does not appear, it
// assembles, in the order the argument runs (see `./components/tam-kotter.css`), so the
// reading order survives as motion instead of as gates.
// ────────────────────────────────────────────────────────────────────────────
//
// ═══ THE TWO POSES, AND WHAT EACH ONE ARGUES:
//
//   0 · `FIGURE` — BOTH MODELS, ENTIRE. Two frames, two attributions, ten nodes, ten
//       animated marks, both chains, both closers. It arrives as a staged BUILD on mount
//       rather than as a block: the frames outline, the headers land, the causal chain
//       grows downward out of its own source node while the rail draws down the right
//       edge, the links land on it in order, and the two verdicts arrive last. Then the
//       figure keeps moving — a current running the left frame's chain and a runner
//       sweeping the right frame's rail — for as long as the slide is up.
//   1 · `THESIS` — the one line that belongs to neither frame, under both of them.
//       `canonicalPose`.
//
// ═══ NOTHING THAT HAS ARRIVED EVER LEAVES, AND THAT IS ARITHMETIC RATHER THAN CARE. The
// one gate below is a `>=` against a pose, so a pose is everything argued so far and there
// is no state for a later pose to undo. That is also what makes stepping the deck BACKWARDS
// — 1 → 0 — true by construction: walking back asks the same question of a smaller number
// and gets the earlier answer. In particular the figure does not dim when the thesis
// arrives, and it does not un-build.
//
// ═══ THE BUILD IS NOT A POSE AND MUST NOT BECOME ONE. It runs on MOUNT, because
// `src/deck/Deck.tsx` renders only the active slide and the component type changes on every
// slide move — so mounting IS arriving, and a one-shot CSS animation is the honest way to
// express "this happened when the room got here". A second pose that started the build
// would put the whole figure behind a click the presenter has to remember to press, and the
// slide would open on an empty stage. `./components/agentic-org.css` records the same
// decision for C.1, which was rebuilt the same way and in the same week.
//
// ═══ EVERY FUNCTION HERE IS TOTAL AND NONE OF THEM THROWS. A pose is UI state — it
// arrives from `DeckContext`, from a deep link, or from a test that deliberately
// over-shoots — and a slide that crashes on a pose is worse in front of a room than a slide
// with nothing revealed. That is the opposite of `panelLeft`, `kotterLinkTop` and
// `tamTierTop` in `./tam-kotter-geometry.ts`, which DO throw, and the difference is
// deliberate: an out-of-range FRAME, LINK or TIER index is an authoring bug the author
// must be shown, while an out-of-range POSE is not an authoring bug at all.
//
// Pure data and pure functions. No React, no DOM, and no work at module scope.
//
// IMPORTABLE FROM BARE `node` AS WELL AS FROM VITEST — this module imports nothing at all.

/**
 * BOTH POSES, AND BOTH ARE NAMED — there is nothing left to count.
 *
 *   0 · `FIGURE` — both frames, both chains, both closers, every mark. See the header on
 *       why this is one pose and not five, and on why its staged build is not a pose.
 *   1 · `THESIS` — the line under both frames.
 *
 * NAMED RATHER THAN COMPARED AS LITERALS: `pose >= 1` in a component says nothing about
 * what 1 IS, and the one remaining off-by-one on this slide lives on that boundary — does
 * the thesis arrive with the figure, or after it? It arrives after, because a conjunction
 * printed while its evidence is still assembling is a promise rather than a conclusion.
 *
 * THE SAME TWO-KEY SHAPE `./walk.ts` USES FOR C.1, deliberately: the two slides were
 * re-posed in the same week for the same reason, and a reader who has read one pose table
 * in this directory should recognise the next.
 */
export const POSE = { FIGURE: 0, THESIS: 1 } as const;

/**
 * Two — what `./shape-tam-kotter.tsx` declares as `steps`.
 *
 * `POSE.THESIS + 1`, because a step count is a COUNT and the thesis is the last INDEX.
 * DERIVED AND NOT TYPED, for the reason `./middle-out-walk.ts` states at length about its
 * own: a literal `steps: 2` is exactly how an inserted beat becomes a pose the deck can
 * never reach — `DeckContext` clamps at `steps - 1`, so there would be no error, no blank
 * slide and no failing test, just one argument that is never made.
 *
 * NOTE WHAT IT IS NOT DERIVED FROM. It is not `Object.keys(POSE).length`, which is true
 * today by coincidence and would break the moment a pose was named that is not a step; and
 * it is not counted off the five links or the four tiers, because not one of those
 * contributes a beat — that is the whole of this rewrite. `./walk.ts` next door argues the
 * same point about its six pillars.
 */
export const STEP_COUNT = POSE.THESIS + 1;

/**
 * The pose the PDF and PPTX exports print: 1 — the fullest one.
 *
 * IMPORTED AND NOT TYPED IN THE SLIDE FILE, for the same reason as {@link STEP_COUNT}: it
 * is "the last pose", so inserting a beat moves it, and a literal 1 would silently pin the
 * export to a page where the last argument is still arriving.
 *
 * POSE 0 WOULD EXPORT TWO COMPLETE, ATTRIBUTED ACADEMIC FRAMES WITH NO STATEMENT OF HOW
 * THEY RELATE — two models printed side by side and left for the reader to join, which is
 * the one way a slide about adoption could travel badly inside an organisation. The thesis
 * is the only thing on the stage that says why there are two frames at all.
 *
 * WHAT THE EXPORT LOSES EITHER WAY IS THE MOTION, and that is not a reason to pick a
 * different pose: a PDF page has no current and no runner, and both are decorations on an
 * argument that is fully carried by position, arrowheads and copy. The figure is complete
 * and legible as a still — see `./components/tam-kotter.css`, which parks every loop on a
 * composed frame under reduced motion for exactly the same reason.
 */
export const CANONICAL_POSE = POSE.THESIS;

/**
 * Whether the thesis is on the stage — the slide's ONE gate.
 *
 * `>=` AND NOT `===`, even though {@link POSE.THESIS} is the last pose the deck can reach:
 * a `===` would make the slide's conclusion VANISH at any pose past the end, and the last
 * pose of a slide should be the pose that survives being over-shot. The over-shoot is not a
 * production path today (`DeckProvider` clamps `goTo` at `steps - 1`); it is a direct call —
 * the test that renders pose 7 to prove nothing extra appears — plus whatever a later edit
 * to `steps` strands in an export or a deep link.
 *
 * THERE IS NO SECOND GATE, AND THE ABSENCE IS THE DESIGN. Every other object on this stage
 * is on it at every pose the deck can reach, so a `showsFactors`, `showsBeliefs`,
 * `showsSequence` or `showsCloser` would be a question with one answer — the same call
 * `./components/MiddleOutBands.tsx` makes about its standing kicker. A second gate is also
 * all it would take to put half the figure back behind a click.
 */
export function showsThesis(pose: number): boolean {
  return pose >= POSE.THESIS;
}
