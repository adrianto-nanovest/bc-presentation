// MIDDLE-OUT — §4.3's last `shape` slide, and the one that hands the deck over.
//
// Issue #68, Phase 7. No #16 prototype covers it, so nothing is productionized from
// one; the visual contract is settled here the way `leader-gap/gap-no-sop.tsx` settled
// its own — one figure component (`./components/MiddleOutBands.tsx`), one geometry
// module (`./middle-out-geometry.ts`), one walk (`./middle-out-walk.ts`), and every
// string in `./content.ts`.
//
// WHY THE SLIDE EXISTS. Section C has already said what an agentic organisation IS
// (C.1's ring) and what one looks like in this company (C.2). Neither says how it
// arrives. The room in front of this deck is division heads, and the sentence they are
// waiting for — the one that decides whether anything in the previous forty slides
// happens — is whose job the rollout is. This slide answers it with an org chart: the
// top holds the mandate and cannot see an ordinary Tuesday, the bottom holds the work
// and cannot authorise a change to it, and the middle holds both plus the one thing
// neither holds — people who copy what it does, because they watched it.
//
// REWORKED 2026-08-14, AND THIS PARAGRAPH IS THE RECORD OF WHAT MOVED. The slide shipped
// as three full-width text bands walked over FIVE poses, with the right third of each band
// reserved for copy that arrived only on the last one. Four faults, all of them visible
// from the back of a room: it read as prose in rectangles rather than as a figure; the
// headline sat 12px above a mono kicker that repeated its job; the thesis was set at 22px,
// which made the footer the loudest thing on the stage; and four of the five clicks were
// spent revealing what the room had already inferred from the shape.
//
// WHY THE SLIDE IS SHAPED THIS WAY NOW. THREE COLUMNS, AND THE MIDDLE ROW IS THE HERO OF
// ALL THREE.
//   · THE PLATES (left) are the organisation: top management, middle management and its
//     AI champions, the teams. One left edge, one width, one placement rule — so no plate
//     can be ranked by position. The middle plate is warmer, brighter and one row taller,
//     and that row is copy only it has: the four things a champion holds.
//   · THE RAIL (centre) is the claim. Two arrows leave the middle plate's own centre line
//     in opposite directions, the same length, offset in x, from one origin bar — and each
//     carries the name of the act it draws and one line of what that act consists of.
//     ARROWHEADS, which the shipped figure refused: two heads pointing away from one
//     origin are how a still frame says "both directions, at once".
//   · THE CARDS (right) are the verdict, one per plate, aligned to it edge for edge:
//     TOP-DOWN generic and shallow, BOTTOM-UP deep and powerless, MIDDLE-OUT both. The
//     ALIGNMENT is the argument — an approach is a consequence of where you sit — which is
//     why the three are not a free-standing panel.
// `./components/MiddleOutBands.tsx` holds the tier table that draws the ranking and
// `./middle-out-geometry.ts` holds the equalities that stop the stack becoming a ladder —
// §6.6 refuses a third ladder beside L1–L5 and P0–P3 in as many words, and three stacked
// boxes are one careless number away from being one.
//
// TWO POSES, AND THE FIRST ONE IS THE WHOLE FIGURE. `./middle-out-walk.ts` owns WHEN:
//   0 — THE FIGURE, complete, built over six staggered steps inside the one pose (the
//       organisation, what each tier holds, the origin, the two directions, what they are,
//       the verdict on each). A room reads a diagram in about two seconds and then
//       listens; the build buys reading ORDER without asking anybody to wait for a claim.
//   1 — THE THESIS, and nothing else new. It keeps a pose of its own because it is not
//       part of the figure: it is what the room is asked to do about it, and a sentence
//       that arrived with the picture would be read as the picture's caption.
//
// `canonicalPose: THESIS_POSE` — the fullest pose, and the only one the PDF and PPTX
// exports print. IMPORTED AND NOT TYPED, for the same reason `steps` is: a third pose
// would move it, and a literal 1 would silently pin the export to a page whose last
// sentence is missing. Pose 0 exports a figure that argues the middle is the lever and
// never says what the room is supposed to do with that, which is the one way this slide
// could travel badly.
//
// NO BRAND AXIS, AND ISSUE #68 SAYS SO IN AS MANY WORDS: identical copy under both
// brands. So this file imports no `VARIANT` and there is no `…For(brand)` resolver to
// look for — the fourth leader slide to make that call, after `gap-hardest-part`,
// `gap-no-sop` and `mandate-enablement`. §4.4's seven brand × deckSet slots do not list
// this slide, and an ORG CHART is not an organisation's own evidence: every organisation
// in this group has a board, division heads and teams, and naming one of them would be
// inventing a fact to fill a fork. What it buys is a test that mounts the same component
// under both leader brands and compares byte for byte.
//
// THE LETTER IS NOT AUTHORED HERE, AND gh#71 IS THE PROOF RATHER THAN THE PROMISE. This
// slide composed as the THIRD of the `shape` run from gh#68 until `shape-tam-kotter`
// inserted ahead of it (§4.3), and it is the FOURTH now — a figure that changed without
// this file, its geometry, its walk or its content module being opened for it, because
// neither figure is written down in any file under `src/slides/leader-shape/`:
// `FigLabel` takes a LABEL only and the composer derives the rest (§3.5).
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { highlight } from "@/components/highlight";
import { MiddleOutBands } from "./components/MiddleOutBands";
import { shapeMiddleOutContent as C } from "./content";
import { STEP_COUNT, THESIS_POSE } from "./middle-out-walk";

// ───────────────────── slide ─────────────────────

export function ShapeMiddleOut() {
  const { stepIndex } = useDeck();

  return (
    <>
      <FigLabel label={C.figLabel} />

      {/* `.slide-headline.small` — 40px and not the base 46, the call every recent leader
          slide records: a one-line 40px headline ends the row at y=122, and 46 would end
          it at 128.3.

          THE HEADLINE NOW HAS ITS OWN AIR, AND THAT IS HALF OF THE 2026-08-14 FIX. The
          shipped stage put a mono kicker at y=134 — 12px under the display face — and
          started the figure at 156, so a headline, a second title and the first row's own
          name arrived inside 50px of each other. The kicker is gone (its addressing is a
          tag on the middle plate now) and `FIGURE_TOP` is 160, which leaves 38px between
          the headline and anything else.

          THE HEADLINE REFUSES ONE MODEL AND NAMES THE OTHER, in that order, and it is
          measured to ONE line under BOTH faces — see `HEADLINE_BUDGET_CHARS` in
          `./middle-out-geometry.ts`, which exists because the drafted line wrapped on the
          Georgia fallback. */}
      <div className="slide-headline-row">
        <h1 className="slide-headline small">{highlight(C.headline, C.headlineKw)}</h1>
      </div>

      <MiddleOutBands pose={stepIndex} />
    </>
  );
}

// ───────────────────── slide def ─────────────────────

// NO `const BRAND_CONTENT = …For(VARIANT.brand)` HERE, and its absence is the decision —
// see the header.
export const shapeMiddleOutSlide: SlideDef = {
  // The file's basename, frozen at the moment the file was named, and not a section
  // reference: this slide printed C.3 in the leader decks until `shape-tam-kotter`
  // landed on gh#71 and prints C.4 now, under an id that never changed.
  id: "shape-middle-out",
  // TWO, IMPORTED AND NOT TYPED. `STEP_COUNT` is `THESIS_POSE + 1` — the figure, then
  // the sentence — and it was FIVE until the 2026-08-14 rework, which is the reason it
  // stays imported rather than being written out now that the number is small: a literal
  // `2` is how a third pose becomes one the deck can never reach (`DeckContext` clamps at
  // `steps - 1`), with no error, no blank slide and no failing test.
  steps: STEP_COUNT,
  // The last pose, and imported for the same reason — see the header on why the export
  // may not pause on the figure alone.
  canonicalPose: THESIS_POSE,
  animationMode: "step-reveal",
  surface: "dark",
  sectionKey: "shape",
  render: () => <ShapeMiddleOut />,
};
