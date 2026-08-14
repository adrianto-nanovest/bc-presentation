// TAM AND KOTTER — the `shape` run's third slide, and the only one in the leader deck
// that argues from published work rather than from this company.
//
// Issue #71, Phase 7, and §11 built it LAST — it is the slide the phase table names as
// "deliverable verbally if it slips", which is exactly why it had to be built as if it
// would not be. No #16 prototype covers it, so nothing is productionized from one; the
// visual contract is settled here the way `./shape-middle-out.tsx` and
// `leader-gap/gap-no-sop.tsx` settled theirs — one figure component
// (`./components/TamKotterFrames.tsx`), one glyph set
// (`./components/TamKotterGlyphs.tsx`), one stylesheet
// (`./components/tam-kotter.css`), one geometry module (`./tam-kotter-geometry.ts`), one
// walk (`./tam-kotter-walk.ts`), and every string in `./content.ts`.
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
// ────────────────────────────────────────────────────────────────────────────
// SIX OWNER CALLS, 2026-08-14, AND THIS FILE CHANGED FOR ONLY ONE OF THEM. Recorded here
// because a reader comparing this header to the git history will want the whole list:
//
//   0. THE CARDS ANSWER THE POINTER AND THE ORDERED FIVE CARRY `01`…`05` — the latest two
//      calls, and the second one overrides a standing guardrail. Hover adds a border tier, a
//      lifted ground, a copper halo, a brighter label and a brighter mark to the card under
//      the pointer and changes nothing about the other nine (§7.1); it is CSS only, with no
//      React state to get stuck. The numbering, and the line between an INDEX and a SCALE
//      that makes it safe, is argued in `./tam-kotter-geometry.ts`'s "the ordinal on a card".
//   1. TWO POSES, NOT SIX — the figure arrives entire on pose 0 and the thesis takes the
//      one remaining click. `./tam-kotter-walk.ts` argues it and `steps` follows it
//      without a number being typed here. THE ONLY CHANGE VISIBLE IN THIS FILE IS THAT
//      ITS COMMENTS NOW SAY TWO, which is the whole point of importing the budget rather
//      than declaring it.
//   2. THE THESIS IS SMALLER AND SITS ON THE FLOOR — 18px at y=596, 12px over the NavBar
//      band instead of 22px at y=572 with 28px of dead stage under it. `THESIS_TOP`,
//      `THESIS_FONT_SIZE` and `NAV_ZONE_CLEARANCE` in `./tam-kotter-geometry.ts`.
//   3. THE FIGURE MOVES — both chains are SVG paths that draw themselves in the direction
//      their model claims causation runs, then carry motion at rest: a continuous current
//      down the causal chain, a single runner sweeping the ordered one with each station
//      flashing as it is reached, and ten animated marks, one per node.
//      `./components/tam-kotter.css` owns every keyframe.
//   4. THE FRAMES START 16px LOWER, at `.slide-content`'s own y=156 rather than 140,
//      because two full-width copper borders 18px under a headline read as an underline on
//      it. C.2 is the floor the owner named; `CONTENT_TOP` takes the number from
//      `globals.css` instead, which is where C.2 gets it.
//
// THE HEADLINE IS UNTOUCHED BY ALL SIX and so is every string in `./content.ts` — none of
// these is a copy change, and the two frames still say exactly what they said.
// ────────────────────────────────────────────────────────────────────────────
//
// WHY THE SLIDE IS SHAPED THIS WAY. TWO IDENTICAL FRAMES, AND NEITHER ONE WINS. The
// claim is a conjunction — belief is why a person starts, sequence is why an
// organisation does not stop, and neither is sufficient — so every equality in the
// figure is deliberate: one width, one height, one top edge, one border, one ground, one
// header construction, one node idiom, one set of colour tiers, one glyph size, two chains
// cut by `./tam-kotter-geometry.ts` to end on the same pixel, and — since the walk
// collapsed — ONE BUILD TIMETABLE that starts both chains on the same millisecond and
// lands both closers on the same beat. A frame drawn wider, taller, brighter or earlier
// than the one beside it would be arguing that one of the two is the real answer and the
// other is the caveat, which is the opposite of the sentence printed under both of them.
//
// THE ONE ASYMMETRY ON THE STAGE IS THE SHAPE OF THE TWO CHAINS — a fan on the left, a rail
// on the right — and it is now carried in two channels rather than one. In SPACE: the left
// chain is centred and visibly splits, the right runs one unbroken line down its frame's
// inner edge. In TIME: the left chain's motion is a continuous current with no beginning,
// the right chain's is a single runner that cannot reach the fourth station without passing
// the third. That is the difference between a causal model and an ordered one, said twice,
// in the two channels a room actually reads at projection distance.
//
// ═══ NO THIRD LADDER, AND THIS IS THE SLIDE THAT WAS MOST AT RISK OF BEING ONE. §6.6
// refuses a third ordered vocabulary beside `gap-capability-ladder`'s L1–L5 and
// `mandate-phases-gates`'s P0–P3 in as many words, and the reference this slide was drawn
// from prints its five change steps as `01`…`05` badges on a rising staircase — which is
// precisely the object that refusal names. The five ship and the SCALE does not, and the
// decision is recorded here the way `leader-mandate/mandate-levers.tsx` records its own:
//
//   · NO ORDINAL FIELD IN THE COPY, AND `01`…`05` PRINTED ON THE ORDERED CHAIN ONLY. The
//     numerals are an owner decision of 2026-08-14 that narrows this guardrail rather than
//     dropping it, and `./tam-kotter-geometry.ts`'s "the ordinal on a card" section is where
//     the narrowing is argued: §6.6 refuses a third ordered VOCABULARY — a named scale the
//     deck teaches and then reuses — and an index on the cards of a published five-step
//     sequence is not one. The acceptance model's five nodes carry none and must not gain
//     one, because its second tier is a PAIR the model explicitly does not order.
//     `./content.ts`'s `ChainNode` still carries an id, a label and a caption and nothing
//     else, so the strings are formatted from the array index at render and cannot survive a
//     reorder of the five. `./components/TamKotterGlyphs.tsx` draws no digit and no
//     countable set of five.
//   · NO PER-LINK COLOUR RANKING. One tier for all five labels, one for all five
//     captions, one for all five marks, on both sides of the stage — the same call
//     `mandate-levers` makes about its four levers, and for the same reason: five items
//     fading out down a frame is a ladder drawn without a digit.
//   · NO ASCENT IN THE GEOMETRY. All five links get one height, one width, one left edge
//     and `i × pitch`. Equal geometry is the anti-ladder guarantee and it lives in a
//     geometry module precisely so a copy edit cannot undo it.
//   · AND NO ASCENT IN THE MOTION EITHER, which is the guardrail the rebuild had to extend.
//     The runner is ONE mark at ONE speed, and its five station flashes are one keyframe at
//     one duration whose delays are `i × pitch` apart — so over a cycle every station gets a
//     byte-identical flash. A runner that slowed, brightened or lingered at any station
//     would be a scale drawn in time, which is the same object §6.6 refuses drawn in space.
//   · ORDER IS POSITION, CONNECTORS AND ARRIVAL TIME, on BOTH halves. Top-to-bottom
//     placement plus 4px paths and arrowheads — if that is enough to say "external factors
//     shape belief" on the left, it is enough to say "urgency comes before coalition" on the
//     right. What the two halves do NOT share is the SHAPE: the left forks and merges, the
//     right runs one unbroken rail straight through.
//   · THE FIVE ARRIVE ON ONE POSE, and they always did. `./tam-kotter-walk.ts` argued it
//     when there were six poses and the argument survived the collapse to two: five links on
//     five clicks is a countdown, the room would count them, and the deck would have taught
//     a five-point scale without printing a digit. A 90ms stagger is reading order; a pose
//     is a claim the presenter stops on.
//   · THE ORDER CLAIM IS COPY. "The order matters" is a sentence in the right frame's
//     closer, said once, where the room can agree or disagree with it. A numbered
//     staircase makes the same claim structurally, everywhere, permanently, and without
//     saying it.
//
// TWO POSES, one argument each. `./tam-kotter-walk.ts` owns WHEN and
// `./components/TamKotterFrames.tsx`'s `BUILD` owns the 1.6 seconds inside pose 0; this is
// what each pose SAYS:
//   0 — BOTH MODELS, ENTIRE, AND MOVING. Two frames, two attributions, ten nodes, ten
//       marks, both chains, both verdicts. It assembles rather than appearing — the frames
//       outline, the two models name and cite themselves, the causal chain grows downward
//       out of its own source while the rail draws down the right edge, the links land on
//       the rail in sequence, the two verdicts arrive together — and then it keeps moving
//       for as long as the slide is up. NOTHING IS DIMMED and nothing is waiting to be
//       undimmed (§7.1 — attention is bought with added light, never subtracted).
//   1 — THE THESIS. The one object on the stage that belongs to neither model, on the
//       floor, under both of them.
//
// NO POSE RESTS ON EVIDENCE WITH ITS CONCLUSION MISSING. Pose 0 is two complete, attributed
// frames, each with its own verdict, and it is a whole argument that could stand alone in
// front of a room. Pose 1 is the conjunction those two were evidence for.
//
// `canonicalPose: CANONICAL_POSE` — the fullest pose, and the only one the PDF and PPTX
// exports print. IMPORTED AND NOT TYPED, for the same reason `steps` is: it is "the last
// pose", so inserting a beat moves it, and a literal 1 would silently pin the export to a
// page where the last argument is still arriving. Pose 0 would export two complete,
// attributed academic frames with NO statement of how they relate, left for the reader to
// join, which is the one way this slide could travel badly inside an organisation.
//
// WHAT THE EXPORT LOSES IS THE MOTION, and that is not an argument for a different pose: a
// PDF page has no current and no runner, and both are decorations on a claim that is fully
// carried by position, arrowheads and copy. `./components/tam-kotter.css` parks every loop
// on a composed frame under `prefers-reduced-motion` for the same reason, which is the
// standing proof that the still figure carries the argument.
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

      {/* `.slide-headline.small` — 40px and not the base 46, which is now a legibility
          decision rather than a shelf one. It used to be measured against a figure that
          started at y=140 and would have lost 6px of air to a 46px line; the frames now
          start at `.slide-content`'s own 156 and there is 34px under the headline either
          way (`HEADLINE_CLEARANCE`). What 40 still buys is the one-line guarantee below.

          THE HEADLINE NAMES THE TWO HALVES AND THE STAGE ARGUES THEM, and it is measured
          to ONE line under BOTH faces — see `HEADLINE_BUDGET_CHARS` in
          `./tam-kotter-geometry.ts`. A wrapped headline lands at y = 122…164, which the
          owner's 34px of air now absorbs with 8px to spare instead of painting through the
          top edge of both frames. That is a real improvement and it is not a licence. */}
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
  // TWO, IMPORTED AND NOT TYPED — and the import is what let a six-pose walk become a
  // two-pose one without this line being edited. `STEP_COUNT` is the last pose plus one,
  // derived in `./tam-kotter-walk.ts`, so inserting or removing a beat grows or shrinks
  // this on its own. A literal is how an inserted beat becomes a pose the deck can never
  // reach (`DeckContext` clamps at `steps - 1`): no error, no blank slide, no failing test,
  // just one argument that is never made.
  steps: STEP_COUNT,
  // The last pose, and imported for the same reason — see the header on why the export
  // may not pause on pose 0.
  canonicalPose: CANONICAL_POSE,
  animationMode: "step-reveal",
  surface: "dark",
  sectionKey: "shape",
  render: () => <ShapeTamKotter />,
};
