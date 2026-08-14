// The walk — THE AGENTIC ORGANIZATION's six decisions, and WHO drives them.
//
// Spec §7.1 (the visual contract) · §6.6 (what each decision has to say and what it
// has to index). `./content.ts` owns the words and `./geometry.ts` owns the stage
// coordinates; this module owns WHICH PILLAR IS OPEN and WHEN THE RECAP LANDS.
//
// ────────────────────────────────────────────────────────────────────────────
// THE WALK IS NO LONGER A STEP BUDGET. It used to be: nine poses, six of them one
// beat each, `focusedPillarIndex(pose)` reading the presenter's click count. That
// shape is retired here and the reason is worth stating, because #55 spent an
// argument getting the budget to nine and this reverses it.
//
//   · A NINE-POSE WALK PUTS THE ORDER IN THE DECK'S HANDS. Governance, then tools,
//     then people, then strategy, then process, then companions — always, in that
//     order, whatever the room asks. §6.6's actual requirement is that the slide be
//     an INDEX for section D, and an index is something you look things up in. A
//     Div Head who asks "what about the seats?" during the governance beat has to be
//     walked through three decisions they did not ask for to get an answer.
//   · SIX OF THE NINE POSES WERE THE SAME POSE. Poses 2…7 differed only in which of
//     six pillars was lit — one fact, spent six times out of a deck-wide budget.
//   · AND THE FIGURE ARRIVED IN TWO HALVES. Pose 0 was a disc alone on a black
//     stage; the room read a circle with no organisation around it and waited. The
//     figure is one thing, so it arrives as one thing (see `./components/agentic-org.css`
//     for the build that replaced the pose split).
//
// SO: TWO POSES, AND THE POINTER OWNS THE SIX. {@link POSE} is the whole budget.
// Focus is {@link resolveFocus}'s answer to hover and pin, not the pose's, which is
// why the type of this module's main export changed from `(pose) => index` to
// `(pinned, hovered) => index`.
// ────────────────────────────────────────────────────────────────────────────
//
// WHY IT IS STILL ITS OWN MODULE. The focus rule is the ONE fact the six boxes, the
// six spokes, the panel's eyebrow, its counter, its decision and its point list all
// read, and it is neither copy nor coordinates — so it has no home in either of the
// other two. Left inline in the component it would be a ternary repeated in five
// places, which is how a figure ends up with a spoke that surges for a box that is
// not lit, and it would give a node test nothing to hold: the rules would only be
// checkable by rendering.
//
// EVERY FUNCTION HERE IS PURE, and takes its whole world as arguments. No state, no
// memo, nothing to reset — the state lives in the ONE component that owns the
// pointer (`./components/PillarOrbit.tsx`) and is handed here to be interpreted.
// That is what makes "no interaction leaves a pillar stuck open" arithmetic rather
// than cleanup: leaving a box hands `NO_FOCUS` back in, and there is no history for
// the next call to contradict.
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
// imports a type), so a reader would otherwise reasonably assume it here — and the
// browser harness is a bare-node script that tried. It transcribes the two pose
// numbers instead, which is the trade this comment exists to make visible.
import { shapeOrgContent } from "./content";

/**
 * BOTH POSES, AND BOTH ARE NAMED — there is nothing left to count.
 *
 *   0 · `FIGURE` — the hub, its brand line, six spokes, six pillars, and the panel
 *       beside them. THE WHOLE FIGURE, arriving in one staged build rather than
 *       across two presenter clicks. The six decisions are reachable from here with
 *       the pointer alone; see {@link resolveFocus}.
 *   1 · `RECAP` — the same figure with all six pillars lit at once and the panel
 *       turned over to what the room has just been shown: six pillars, six
 *       decisions, and the claim they were evidence for.
 *
 * NAMED RATHER THAN COMPARED AS LITERALS: `pose >= 1` in a component says nothing
 * about what 1 IS, and this slide's one remaining off-by-one lives on that boundary
 * — does the recap replace the panel's idle copy or lie on top of it?
 *
 * THE SIX PILLARS ARE NOT POSES ANY MORE. That is the whole of this rewrite, and it
 * is why this object has two keys where it had three.
 */
export const POSE = { FIGURE: 0, RECAP: 1 } as const;

/**
 * Six — READ OFF THE PILLARS, exactly as the retired step budget was.
 *
 * FROM `shapeOrgContent.pillars.length` AND NOT FROM `PILLAR_COUNT` in
 * `./geometry.ts`, though the test holds those two equal. What this counts is how
 * many decisions there are to open, and a decision is COPY — its label, its
 * sentence, its keyword, its point list — so the array the copy lives in is the
 * honest source; the geometry's count answers a different question (how the ellipse
 * is divided). Either would give 6 today, and taking it from the copy means a
 * seventh pillar written into the content is reachable even if the ring has not been
 * re-cut yet.
 */
export const PILLAR_COUNT: number = shapeOrgContent.pillars.length;

/**
 * Two — what `./shape-agentic-org.tsx` declares as `steps`.
 *
 * A LITERAL, AND DELIBERATELY SO, WHERE THE OLD BUDGET WAS DERIVED. The nine-step
 * version computed `steps` from the pillar count because a seventh pillar had to
 * GROW the budget or silently lose a beat. That hazard is gone with the beats: a
 * seventh pillar now costs zero steps, because the pointer reaches it for free. The
 * budget is the figure plus the recap, and it is two whatever the ring holds — so
 * deriving it from anything would be arithmetic that only pretends to depend on
 * something.
 *
 * `Object.keys(POSE).length` WAS CONSIDERED AND REFUSED for the same reason: it is
 * true today by coincidence rather than by rule, and it would break the moment a
 * pose was named that is not a step (a print-only pose, say). The two poses ARE the
 * two steps, so the count is spelled once, here, and `POSE.RECAP + 1` below is the
 * relation a test can hold it to.
 */
export const STEP_COUNT = 2;

/**
 * "No pillar is open" — and it is a VALUE, not `null` and not `undefined`.
 *
 * −1 is what an index-returning function can return without widening its type, so
 * every caller compares one number against one number and the geometry indexes stay
 * indexes. A `number | null` would put a truthiness bug one keystroke away, because
 * pillar 0 — Governance, at twelve o'clock — is falsy.
 *
 * IT IS ALSO OUT OF RANGE FOR EVERY ARRAY ON THIS SLIDE, which is the second half of
 * the choice: a caller that forgets to check gets `undefined` from
 * `pillars[NO_FOCUS]` and renders a visibly empty panel, rather than the LAST pillar
 * — which is what `pillars.at(-1)` would hand back, and which would open AI
 * Companions under the idle copy for no reason anyone could see.
 */
export const NO_FOCUS = -1;

/**
 * Whether `i` names a pillar the ring actually has.
 *
 * THE ONE GUARD BOTH POINTER CHANNELS GO THROUGH. Hover and pin are set from event
 * handlers, and an event handler is the one place on this slide where a value
 * arrives from outside the module's own arithmetic. `Number.isInteger` is the sharp
 * half: an index of 2.5 would otherwise pass a bare range check and hand a caller
 * `pillars[2.5]` — `undefined` — from a value that had already been checked against
 * {@link NO_FOCUS}, which renders as a surging spoke beside an empty panel rather
 * than as an error.
 */
export function isPillarIndex(i: number): boolean {
  return Number.isInteger(i) && i >= 0 && i < PILLAR_COUNT;
}

/**
 * WHICH PILLAR THE PANEL IS SPEAKING FOR — the whole interaction rule, in one total
 * function.
 *
 * THREE CHANNELS, ONE ANSWER, AND THE ORDER IS `pinned → hovered → focused`.
 *
 * THE PIN WINS, AND IT WINS OVER EVERYTHING (owner call, 2026-08-14). This reverses
 * the order this module shipped with, so the argument it reverses is kept here rather
 * than deleted:
 *
 *   · HOVER-WINS made the pin a HOME rather than a lock — sweep the ring, each
 *     pillar answers, take the pointer off and the figure settles back on the pinned
 *     one. Read as a rule about the FIGURE that is still true, and it is exactly what
 *     {@link isLit} still does.
 *   · BUT IT MADE THE PIN USELESS FOR THE THING A PIN IS FOR. A presenter pins Tools
 *     to talk over it; the pointer then has to be parked off the figure for the whole
 *     time they are talking, because crossing any of the other five boxes on the way
 *     to the clicker swaps the panel out from under the sentence they are saying. A
 *     pin that only holds while nothing else is touched is not a pin.
 *
 * SO THE TWO QUESTIONS ARE SPLIT, and that split is the whole of this change. THIS
 * function answers "what does the PANEL say", and the pin owns it. {@link isLit}
 * answers "which boxes are lit", and hover still lights whatever it is on — so the
 * ring goes on responding to the pointer (the boxes never read as dead) while the
 * words on the right stay where the presenter put them.
 *
 * `focused` IS THE KEYBOARD'S POINTER, AND IT IS A THIRD CHANNEL RATHER THAN A
 * SECOND WRITER OF THE FIRST. Merging DOM focus into `hovered` is the obvious
 * saving and it produces one real bug: a mouse click leaves the button focused, so
 * the click handler has to blur it (otherwise the deck's own Space/Arrow keys make
 * `:focus-visible` match and paint a ring nobody asked for) — and a blur that also
 * cleared `hovered` would close the pillar the pointer is still sitting on. Two
 * channels, two lifetimes: `hovered` ends when the pointer leaves, `focused` ends
 * when the caret does, and neither can end the other.
 *
 * HOVER OVER FOCUS, in the one case where they disagree AND nothing is pinned: the
 * pointer moved last. Tabbing to a pillar and then sweeping the mouse elsewhere
 * should follow the mouse; the caret has not moved and will still be there when the
 * pointer leaves.
 *
 * `NO_FOCUS` IS THE ONLY IDLE ANSWER, and it is reached several ways that must not
 * be distinguishable — nothing touched at all, or a hover that has just ended over a
 * figure with no pin. The panel shows its idle copy in every one of them, which is
 * why this returns one value and not a `{ source }` pair.
 *
 * TOTAL, AND IT DOES NOT THROW — the opposite of `pillarCentre` and
 * `decisionCounter`, which do, and the difference is deliberate. An out-of-range
 * PILLAR index in the CONTENT is an authoring bug the author must be shown. An
 * out-of-range index arriving HERE is a pointer event, i.e. UI state, and a slide
 * that crashes on a stray pointer value is worse in front of a room than a slide
 * with nothing open. So all three arguments go through {@link isPillarIndex} and
 * anything that fails it is read as "not there".
 *
 * @param pinned  the pillar a click has fixed, or {@link NO_FOCUS}
 * @param hovered the pillar under the pointer, or {@link NO_FOCUS}
 * @param focused the pillar holding DOM focus, or {@link NO_FOCUS}
 */
export function resolveFocus(pinned: number, hovered: number, focused: number): number {
  if (isPillarIndex(pinned)) return pinned;
  if (isPillarIndex(hovered)) return hovered;
  if (isPillarIndex(focused)) return focused;
  return NO_FOCUS;
}

/**
 * WHETHER PILLAR `i` IS LIT ON THE RING — the other half of the split
 * {@link resolveFocus} describes, and the half the pointer still owns.
 *
 * A PREDICATE PER PILLAR AND NOT A SECOND "WHICH ONE", because with a pin down there
 * can be TWO: the pinned pillar, which is what the panel is speaking for and stays
 * lit for as long as the pin is down, and whichever pillar the pointer or the caret
 * is on. That is the answer to the one objection pin-wins invites — that a pinned
 * slide reads as dead. The boxes still answer the hand; only the words do not move.
 *
 * TWO LIT AT ONCE IS NOT AMBIGUOUS, because the pinned one carries the pin mark and
 * the panel names it in words (`shape-decision-*-pin`). Without those two marks this
 * would be a figure with two subjects; with them it is a figure with a subject and a
 * pointer.
 *
 * IT IS STILL PURE ADDITION (§7.1). Nothing here dims anything: a pillar is either at
 * {@link REST}-tier or above it, and lighting a second box takes nothing from the
 * first.
 *
 * AT MOST TWO, WHICH IS WHY `hovered` AND `focused` COLLAPSE FIRST. They are two
 * pointers, and when they disagree the POINTER moved last — the same rule
 * {@link resolveFocus} applies for the same reason. Lighting both would put three
 * boxes on the ring at once (pin, caret, pointer) with a mark on only one of them,
 * and the two that carried no mark would be indistinguishable from each other.
 *
 * TOTAL AND NON-THROWING for the same reason {@link resolveFocus} is: every argument
 * is UI state, and `i` is guarded so a caller cannot get `true` for a pillar the ring
 * does not have.
 */
export function isLit(i: number, pinned: number, hovered: number, focused: number): boolean {
  if (!isPillarIndex(i)) return false;
  const pointer = isPillarIndex(hovered) ? hovered : focused;
  return i === pinned || i === pointer;
}

/**
 * What a click on pillar `i` does to the pin — TOGGLE, and the unpin is the same
 * gesture as the pin.
 *
 * A SECOND CLICK ON THE PINNED PILLAR RELEASES IT. Not a close button, not the Esc
 * key, not a click on the background: the background is the deck's own
 * click-to-advance target (`src/deck/Slide.tsx`), so a "click away to unpin" rule
 * would unpin and step the slide with one press. The pillar that took the pin is the
 * only element that can give it back without arguing with the deck.
 *
 * CLICKING A DIFFERENT PILLAR MOVES THE PIN rather than clearing it, because the
 * pointer is already there — a rule that required an unpin first would make moving
 * the pin cost two clicks, and under pin-wins ({@link resolveFocus}) it would make
 * the panel unreachable from the ring until the presenter remembered which box was
 * holding it.
 *
 * A NON-INDEX ARGUMENT CLEARS THE PIN, which is the only safe answer: it can only
 * arrive from a handler bound to something that is not a pillar, and leaving the
 * previous pin fixed would strand it with no element left to release it.
 */
export function togglePin(pinned: number, i: number): number {
  if (!isPillarIndex(i)) return NO_FOCUS;
  return pinned === i ? NO_FOCUS : i;
}

/**
 * Whether the recap is on the stage — and, with it, whether all six pillars are lit
 * at once.
 *
 * `>=` AND NOT `===`, even though {@link POSE.RECAP} is the last pose the deck can
 * reach. A `===` would make the recap VANISH at any pose past the end, and the last
 * pose of a slide should be the pose that survives being over-shot. The over-shoot is
 * not a production path today (`DeckProvider` clamps `goTo` at `steps - 1`); it is a
 * direct call — the test that renders pose 7 to prove nothing extra appears — plus
 * whatever a later edit to `steps` strands in an export or a deep link.
 */
export function showsRecap(pose: number): boolean {
  return pose >= POSE.RECAP;
}

/**
 * Whether the POINTER is live at this pose.
 *
 * FALSE AT THE RECAP, and that is a correctness rule rather than a tidy-up. The
 * recap lights all six pillars and gives the panel to a six-row summary; a hover
 * that could still open ONE pillar there would have to either overwrite the summary
 * the room is reading or un-light the other five — and un-lighting five pillars to
 * emphasise a sixth is precisely the subtraction §7.1 forbids. So at pose 1 the
 * figure stops answering the pointer and says one thing.
 *
 * THE PIN IS NOT CLEARED WHEN IT STOPS BEING READ, deliberately. Stepping 0 → 1 → 0
 * returns to the pillar the presenter had pinned, because a pin is the presenter's
 * place in the argument and losing it on a step to the recap and back would be the
 * one piece of history a backwards step could contradict. `resolveFocus` is not even
 * consulted at pose 1 — the state simply sits there, unread — which is why nothing
 * needs to be reset for this to be true.
 */
export function acceptsPointer(pose: number): boolean {
  return pose < POSE.RECAP;
}
