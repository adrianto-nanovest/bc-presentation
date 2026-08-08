// THE FOUR LEVERS — the last slide of THE MANDATE, and the first one that asks
// the room to do something on a specific morning.
//
// Spec §6.8 (content) · §4.3's leader deck table, which gives the `mandate` run
// three slides and this one the tail of it · §4.4, which lists NO slot for this
// slide · §6.6's guardrail on new ladders · §11 Phase 7. No #16 prototype covers
// this slide, so nothing is productionized from one: the visual contract is
// settled here, and settled the same way every leader-only slide's in this tree
// has been — one figure component, one geometry module, copy in the section's own
// content module.
//
// WHERE THE FOUR COME FROM, AND WHY THE REWORDING IS THE SLIDE. They are Group
// HR's own enablement levers — `Convene · Champion · Unblock access · Sustain the
// rhythm` — and in that playbook they are what a GROUP FUNCTION pulls. Printed
// unchanged in front of a BU or Division Head they would be somebody else's job
// description, and the room's honest answer would be "then take it to them". So
// every one is restated as an act inside one person's authority, and the scoping
// is where the work is rather than in the verbs: "fund it from the line you
// already hold" is a different ask from "fund it", and only one of the two can be
// signed in the room. `./content.ts` holds that as a RULE and not as a tone —
// `authorizableAlone` throws at module load on any lever that waits on the
// committee, on Group HR or on a budget cycle — so the property fails in the edit
// that breaks it rather than at CI a commit later.
//
// WHY THE SLIDE IS SHAPED THIS WAY. A slide whose whole claim is "you can
// authorize all of this alone" has to survive a leader mentally sorting the list
// into what they can sign and what they will have to take somewhere else. So the
// stage does the sorting in front of them: four acts down the left, and to the
// right a FORM with a column for each of the four things a leader's act could
// wait on — themselves, the committee, Group HR, a budget cycle. SIXTEEN BOXES
// ARE DRAWN AND FOUR ARE FILLED, all four in the same column. Nothing says that
// in a sentence; the count says it, and a count is the one kind of claim a room
// can check from the back row.
//
// AND IT IS NOT EITHER SIBLING'S IMAGE, which was a requirement rather than a
// preference. K.1 is two text columns under two headings with a lane ramp down
// the right; K.2 is a staircase over four calendar columns; this is a single
// column of rows ruled off against a four-column form. What the three DO share is
// the row idiom — a mono label over one line — because that is the deck's standard
// construction for "a named thing and what it means", and a third reading habit
// in three consecutive slides is a cost the room pays for nothing.
//
// THE BAND IS THE SECTION'S THIRD, AND IT IS EARNED RATHER THAN INHERITED. The
// question was whether a third bordered band in three consecutive slides makes the
// run read as one long slide. It does not, and the reason is what the band holds:
// on K.1 it is DigiTech's stated bottleneck, on K.2 the organisation's own
// roadmap, and here the playbook these four levers were lifted from — three
// attributed claims somebody actually made, in the one object this section uses
// for exactly that. The alternative was to assert the rewording in the closer and
// cite nothing, which would have made "reworded to you" a thing the deck says
// about itself. It also buys the four rows their purity: the source's own labels
// live in the citation, once, instead of trailing every row as a parenthesis in a
// second register. The FIGURES differ on all three slides; the CITATION APPARATUS
// is deliberately constant, and a reader tempted to vary it should read
// `../leader-mandate/type-registers.ts` on why the band's tokens are shared at all.
//
// 5 POSES, one argument each:
//   0 — THE FOUR ACTS. Both headings, the form's four heads and its head rule
//       stand from here — the empty form under its own question reads as a
//       promise rather than as a half-drawn stage (K.1's call about its empty
//       right column, made for the same reason). The four levers land top to
//       bottom, and the room is asked for all four before it is told what any of
//       them costs in signatures.
//   1 — THE FORM. Sixteen boxes, every one of them empty, building left to right.
//       This is the pose that asks the question — "what does each one need before
//       it can happen?" — and it is worth its own click precisely because the
//       answer is one click away: a form that arrived already filled would land
//       the question and its answer in the same glance, and the marks would be
//       decoration rather than a result.
//   2 — THE ANSWER. Four marks, one per lever, in the same column, at the same
//       stagger the levers themselves arrived on. Three columns stay empty for
//       the rest of the slide, which is the whole figure.
//   3 — THE BAND. Where the four came from, quoted and attributed. It arrives
//       AFTER the answer rather than before it, because a room that has just been
//       shown that all four are theirs is a room that can hear "and these are not
//       even ours" as provenance; the same band first would have read as a
//       disclaimer on an ask that had not been made yet.
//   4 — THE CLOSER. What follows from a set of levers that waits on nobody: the
//       absence of a decision is itself a decision, and it is one the room takes.
//
// `canonicalPose: 4` — the fullest pose, and the only one the PDF and PPTX exports
// print. A canonical pose of 3 would export the section's entire ask with its
// closer missing, which on the slide that ENDS the mandate is the one way this
// deck could travel badly: the exported page would show a room four things it can
// do and stop before saying what happens if it does none of them.
//
// THERE IS NO BRAND AXIS, and this is the second slide in THIS SECTION to import
// no `VARIANT` at all — `mandate-enablement.tsx` is the first, and a reader coming
// from `mandate-phases-gates.tsx`, which does import one, should read
// `./content.ts`'s header before concluding that one of the three is wrong.
//
// ONE COUNT RECORDED HERE SO NOBODY RE-DERIVES IT FROM A STALE LINE: K.1's own
// header calls itself "the only leader-only slide in the tree that imports no
// `VARIANT` at all". That was true when gh#60 wrote it and is not any more —
// `gap-hardest-part`, `gap-no-sop`, `gap-three-failures`, `gap-the-pattern` and
// `invest-chicken-egg` each abstain too, which makes this the seventh and not the
// second. Rewording that file is not this ticket's to do; repeating its number
// would have been.
//
// THE TWO IN THIS SECTION ABSTAIN FOR DIFFERENT REASONS and `./content.ts` argues
// both. K.1 has no axis because its subject is generic by construction and the one
// specific thing on its stage is a quotation; this slide has no axis because its
// subject is THE PERSON IN THE ROOM, and that person is the same person in both
// rooms — a BU or Division Head with a calendar, a headcount and a budget line
// they already hold. §4.4 lists seven brand slots and none of them is this slide;
// §6.8 gives it no brand callback. A `Record<Brand, …>` here would be three
// byte-identical blocks, which is what a deck looks like on the day somebody edits
// one of them.
//
// NO THIRD LADDER IS INVENTED (§6.6). The deck carries exactly two ordered
// vocabularies — `gap-capability-ladder`'s L1–L5 and K.2's P0–P3 — and "Learn →
// Experiment → Build → Integrate → Own" was cut precisely so the room would hold
// one set of levels and not three. The four levers here cannot become a third: they
// are not levels, they are not stages, and nothing about them is ordered by
// MATURITY. `./content.ts` says on the field that their order is the order they get
// pulled in, and the stage backs that up by ranking none of them — one tier for all
// four labels, one for all four lines, one mark each. A future edit that numbered
// them, or dimmed the later ones, would turn a list of four acts into a ladder by
// accident.
//
// THE LETTER IS NOT AUTHORED HERE, and like `mandate-phases-gates.tsx` this slide
// APPENDS inside a run that already exists — so it moves no letter and no number
// anywhere in either leader deck: `mandate` was already K when gh#60 opened it, and
// `meta`/`principles`/`lab` were already L/M/N. It also COMPLETES the run at §4.3's
// three slides, which is the last thing that can be appended to it without a spec
// change. What this slide prints is derived from the composed deck (§3.5):
// `FigLabel` takes a label only, and no rendered string under
// `src/slides/leader-mandate/` may name a letter or a number.
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { highlight } from "@/components/highlight";
import { LeverBoard } from "./components/LeverBoard";
import { mandateLeversContent as C } from "./content";

// ───────────────────── slide ─────────────────────

export function MandateLevers() {
  const { stepIndex } = useDeck();

  return (
    <>
      <FigLabel label={C.figLabel} />

      <div className="slide-headline-row">
        <h1 className="slide-headline small">{highlight(C.headline, C.headlineKw)}</h1>
      </div>

      <LeverBoard pose={stepIndex} />
    </>
  );
}

// ───────────────────── slide def ─────────────────────

// NO `const BRAND_CONTENT = …For(VARIANT.brand)` HERE, and its absence is the
// decision — see the header. Importing no `VARIANT` is also what lets a test mount
// this stage in two variant epochs and compare the rendered bytes, which is the
// form `tests/unit/mandate-enablement.test.tsx` holds K.1's identical property in
// and the cheapest way to prove the two leader decks print the same slide.
export const mandateLeversSlide: SlideDef = {
  id: "mandate-levers",
  steps: 5,
  canonicalPose: 4,
  animationMode: "step-reveal",
  surface: "dark",
  sectionKey: "mandate",
  render: () => <MandateLevers />,
};
