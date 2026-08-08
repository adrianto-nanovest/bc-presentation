// TAM AND KOTTER — the `shape` run's third slide, and the only one in the leader deck
// that argues from published work rather than from this company.
//
// Issue #71, Phase 7, and §11 builds it LAST — it is the slide the phase table names as
// "deliverable verbally if it slips", which is exactly why it had to be built as if it
// would not be. No #16 prototype covers it, so nothing is productionized from one; the
// visual contract is settled here the way `./shape-middle-out.tsx` and
// `leader-gap/gap-no-sop.tsx` settled theirs — one figure component
// (`./components/TamKotterFrames.tsx`), one geometry module
// (`./tam-kotter-geometry.ts`), one walk (`./tam-kotter-walk.ts`), and every string in
// `./content.ts`.
//
// WHY THE SLIDE EXISTS. §6.6 says HR p15's four principles are NOT authored as a slide
// and that each backing is delivered natively instead, with "Kotter/TAM in C.3". So this
// is one of those four backings, and its job is narrow and load-bearing: every other
// slide in this run argues from what this group has done, which a division head can
// discount as one consultant's reading of it. Two models with an author and a year on
// them cannot be discounted that way. It is also what the slide behind it stands on — the
// middle-out claim is an assertion about where adoption spreads from, and this stage is
// where the room is given the published account of WHY people adopt at all and WHY
// change stops. THE ATTRIBUTIONS ARE THE POINT AND NOT THE FOOTNOTE; the years render
// on the stage for that reason and for no other.
//
// WHY THE SLIDE IS SHAPED THIS WAY. TWO IDENTICAL FRAMES, AND NEITHER ONE WINS. The
// claim is a conjunction — belief is why a person starts, sequence is why an
// organisation does not stop, and neither is sufficient — so every equality in the
// figure is deliberate: one width, one height, one top edge, one border, one ground, one
// header construction, one node idiom, one set of colour tiers, and two chains cut by
// `./tam-kotter-geometry.ts` to end on the same pixel. A frame drawn wider, taller,
// brighter or earlier than the one beside it would be arguing that one of the two is the
// real answer and the other is the caveat, which is the opposite of the sentence printed
// under both of them. The one asymmetry on the stage is the SHAPE of the two chains — a
// fan on the left, a column on the right — and it is the difference between a causal
// model and an ordered one.
//
// ═══ NO THIRD LADDER, AND THIS IS THE SLIDE THAT WAS MOST AT RISK OF BEING ONE. §6.6
// refuses a third ordered vocabulary beside `gap-capability-ladder`'s L1–L5 and
// `mandate-phases-gates`'s P0–P3 in as many words, and the reference this slide was drawn
// from prints its five change steps as `01`…`05` badges on a rising staircase — which is
// precisely the object that refusal names. The five ship and the SCALE does not, and the
// decision is recorded here the way `leader-mandate/mandate-levers.tsx` records its own:
//
//   · NO NUMERAL ON ANY LINK, and no ordinal FIELD for one to be printed from.
//     `./content.ts`'s `ChainNode` carries an id, a label and a caption and nothing else;
//     the loop in `./components/TamKotterFrames.tsx` spends its index on a position and a
//     delay and never on `children`.
//   · NO PER-LINK COLOUR RANKING. One tier for all five labels, one for all five
//     captions, on both sides of the stage — the same call `mandate-levers` makes about
//     its four levers, and for the same reason: five items fading out down a frame is a
//     ladder drawn without a digit.
//   · NO ASCENT IN THE GEOMETRY. All five links get one height, one width, one left edge
//     and `i × pitch`. Equal geometry is the anti-ladder guarantee and it lives in a
//     geometry module precisely so a copy edit cannot undo it.
//   · ORDER IS POSITION AND CONNECTORS, on BOTH halves. Top-to-bottom placement plus 4px
//     rules and arrowheads — if that is enough to say "external factors shape belief" on
//     the left, it is enough to say "urgency comes before coalition" on the right. The
//     heads are BORDER TRIANGLES, not `<svg>` markers (the idiom
//     `mindset-section-c/components/C4LoopBackArrow.tsx` already uses), so the figure
//     still mounts no SVG at all and the zero-SMIL question stays closed by construction.
//     Note what the two halves do NOT share: the left forks and merges, the right runs
//     one unbroken spine straight through. That difference is the two models' difference,
//     and it is the only thing on this stage that ranks anything.
//   · THE FIVE ARRIVE ON ONE POSE. `./tam-kotter-walk.ts` argues this at length and it is
//     the load-bearing pose decision on the slide: five links on five clicks is a
//     countdown, the room would count them, and the deck would have taught a five-point
//     scale without printing a digit.
//   · THE ORDER CLAIM IS COPY. "The order matters" is a sentence in the right frame's
//     closer, said once, where the room can agree or disagree with it. A numbered
//     staircase makes the same claim structurally, everywhere, permanently, and without
//     saying it.
//
// SIX POSES, one argument each. `./tam-kotter-walk.ts` owns WHEN each lands; this is what
// each one SAYS:
//   0 — THE ACCEPTANCE MODEL, named, attributed, and the top of its causal chain: what
//       shapes belief, and the four conditions that shape it. The room gets the model's
//       name, its author, its year and the one tier of it that is inside a division
//       head's authority — before it is told what any of that produces.
//   1 — THE TWO BELIEFS and the fan that feeds them. The pose that says those four
//       conditions are INPUTS to something rather than a list of good practice.
//   2 — THE INTENTION, THE USE, AND THE LEFT FRAME'S CLOSER. The left half is a whole
//       argument at the end of this pose and could stand on the stage alone.
//   3 — THE CHANGE MODEL, entire: named, attributed, and its five links staggered into a
//       chain inside the one pose.
//   4 — THE CHANGE MODEL'S CLOSER. What the sequence costs when it is run out of order,
//       and the only place the deck says that the order matters.
//   5 — THE LINE UNDER BOTH FRAMES. The one object on the stage that belongs to neither
//       model.
//
// NO POSE RESTS ON EVIDENCE WITH ITS CONCLUSION MISSING. Pose 0 is a frame with a heading
// and one complete node, never a bordered box waiting to be filled — and the RIGHT
// frame's box is not drawn at all until pose 3, because `mandate-levers`' "an empty form
// under its own heading reads as a promise" is true of the HEADING and this slide's
// heading is itself the pose-3 event. Pose 1 does not leave the two beliefs unconnected.
// Pose 2 carries the left frame's verdict on the same pose as the nodes it summarises,
// staggered a full beat behind them. Pose 4 is a claim that needs its own click. Pose 5 is
// the conclusion all five were evidence for.
//
// `canonicalPose: CANONICAL_POSE` — the fullest pose, and the only one the PDF and PPTX
// exports print. IMPORTED AND NOT TYPED, for the same reason `steps` is: it is "the last
// pose", so inserting a beat moves it, and a literal 5 would silently pin the export to a
// page where the last argument is still arriving. Any lower pose is a half-made argument
// on a page that cannot explain itself — pose 4 exports two complete, attributed academic
// frames with NO statement of how they relate, left for the reader to join, which is the
// one way this slide could travel badly inside an organisation.
//
// NO BRAND AXIS, AND ISSUE #71 SAYS SO IN AS MANY WORDS: no brand slot, identical copy
// under both brands, do not invent variance. So this file imports no `VARIANT`, defines
// no `…For(brand)` resolver and holds no `Record<Brand, …>` — there is nothing here to
// look for. §4.4's seven brand × deckSet slots do not list this slide, and a PUBLISHED
// MODEL is nobody's local evidence at all: Davis (1989) says the same thing in both
// rooms, and three byte-identical blocks in a brand table is what a deck looks like on
// the day somebody edits one of them. What the absence buys is a test that mounts the
// same component under both leader brands and compares byte for byte.
//
// THE LETTER IS NOT AUTHORED HERE. This slide INSERTS into a run that already exists
// (§4.3) and steps `shape-middle-out` one figure along without that file being opened —
// which is the standing proof of §3.5 and the reason no figure is written down in any
// file under `src/slides/leader-shape/`: `FigLabel` takes a LABEL only and the composer
// derives the rest. No rendered string under this directory names a section letter or a
// figure number.
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { highlight } from "@/components/highlight";
import { TamKotterFrames } from "./components/TamKotterFrames";
import { shapeTamKotterContent as C } from "./content";
import { CANONICAL_POSE, STEP_COUNT } from "./tam-kotter-walk";

// ───────────────────── slide ─────────────────────

export function ShapeTamKotter() {
  const { stepIndex } = useDeck();

  return (
    <>
      <FigLabel label={C.figLabel} />

      {/* `.slide-headline.small` — 40px and not the base 46, for the shelf reason every
          recent leader slide records: the frames start at y=140, and 46px would end the
          headline row at 128.3 instead of 122, leaving 11.7px of air over the frames'
          top border instead of 18.

          THE HEADLINE NAMES THE TWO HALVES AND THE STAGE ARGUES THEM, and it is measured
          to ONE line under BOTH faces — see `HEADLINE_BUDGET_CHARS` in
          `./tam-kotter-geometry.ts`. A wrapped headline lands at y = 122…164 and paints
          straight through the top edge of both frames, which is the failure the sibling
          slide's drafted line actually hit. */}
      <div className="slide-headline-row">
        <h1 className="slide-headline small">{highlight(C.headline, C.headlineKw)}</h1>
      </div>

      <TamKotterFrames pose={stepIndex} />
    </>
  );
}

// ───────────────────── slide def ─────────────────────

// NO `const BRAND_CONTENT = …For(VARIANT.brand)` HERE, and its absence is the decision —
// see the header.
export const shapeTamKotterSlide: SlideDef = {
  // The file's basename, frozen at the moment the file was named, and not a section
  // reference: this slide prints one figure in today's leader decks and a different one
  // the day anything ahead of it in the `shape` run changes, under an id that never
  // changes.
  id: "shape-tam-kotter",
  // SIX, IMPORTED AND NOT TYPED. `STEP_COUNT` is the last pose plus one, and every pose
  // in `./tam-kotter-walk.ts` is derived from the one before it — so inserting a beat
  // anywhere in that chain grows this on its own. A literal `6` is how an inserted beat
  // becomes a pose the deck can never reach (`DeckContext` clamps at `steps - 1`): no
  // error, no blank slide, no failing test, just one argument that is never made and a
  // unifying line that arrives while a frame is still incomplete.
  steps: STEP_COUNT,
  // The last pose, and imported for the same reason — see the header on why the export
  // may not pause anywhere earlier.
  canonicalPose: CANONICAL_POSE,
  animationMode: "step-reveal",
  surface: "dark",
  sectionKey: "shape",
  render: () => <ShapeTamKotter />,
};
