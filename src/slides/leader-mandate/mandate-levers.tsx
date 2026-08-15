// THE FOUR LEVERS — the last slide of THE MANDATE, and the only one that asks the
// room to sign something.
//
// Spec §6.8 (content) · §4.3's leader deck table, which gives the `mandate` run
// three slides and this one the tail of it · §4.4, which lists NO slot for this
// slide · §6.6's guardrail on new ladders · §11 Phase 7. No #16 prototype covers
// this slide, so nothing is productionized from one: the visual contract is settled
// here, the same way its two siblings' were — one figure component, one geometry
// module, one stylesheet, one glyph module, copy in the section's own content module.
//
// ═══ RE-CUT 2026-08-15 (owner's call), AND THE RE-CUT IS THE FILE. What shipped was
// ONE STAGE HOLDING EVERYTHING: four lever rows of 13.5px prose down the left, a
// four-column SIGN-OFF FORM down the right with sixteen boxes in it, a bordered
// citation band under both, and the ask under that — five bands of content assembled
// over five poses that only ever added. `./levers-geometry.ts` records the four
// complaints that retired it, and all four had already been answered on K.1 and K.2:
//
//   1. THE FORM NAMED PEOPLE THE ROOM COULD NOT IDENTIFY. Its columns were `YOU`,
//      `THE COMMITTEE`, `GROUP HR` and `A BUDGET CYCLE`, and only the first is a
//      person in the room. Nothing in either organisation's own vocabulary tells a
//      BU or Division Head which committee that is, and a figure whose argument is a
//      COUNT OF EMPTY BOXES fails the moment the room stops to ask whose boxes they
//      are. THE CLAIM IS UNCHANGED AND IS NOW MADE BY CONVERGENCE: four curves leave
//      four levers and arrive at one box, and the box says `YOU`.
//   2. THE CITATION BAND QUOTED A DOCUMENT THE ROOM HAS NEVER READ — an outside
//      Group HR playbook, by name, with its four labels in quotation marks. That is
//      provenance for the deck's author and noise for the audience. It is spoken
//      now, not printed, which is the call K.1 made about its own band earlier the
//      same week. K.2 KEPT ITS OWN AND SHOULD HAVE: that band quotes the ROOM's
//      programme and roadmap, not a stranger's, so it is evidence rather than a
//      footnote. This note read "K.1 and K.2 each" until 2026-08-15 and was simply
//      wrong about the sibling — `./components/PhaseLadder.tsx` prints K.2's band on
//      the `phases` pose and always has.
//   3. THE STAGE WAS FULL AND NOTHING ON IT WAS BIG. Four of the six poses are now
//      HEROES with one 260px animated mark each, and the fifth recaps all four.
//   4. THE SHELVES WERE THIS SLIDE'S OWN. The headings hung at 134 — twelve pixels
//      under a 40px display headline, so the room read the title and the first mono
//      line as one wrapped line — and the ask stood at 572 in 20px serif ITALIC
//      while both siblings' stood at 590 in 19px UPRIGHT over a copper rule. Both
//      are K.1's now, and this was the last slide in the deck standing on either.
//
// ═══ WHERE THE FOUR COME FROM, AND WHY THE REWORDING IS STILL THE SLIDE. They are an
// enablement playbook's four levers, and in that playbook they are what a GROUP
// FUNCTION pulls. Printed unchanged in front of a Division Head they would be somebody
// else's job description, and the room's honest answer would be "then take it to
// them". So every one is restated as an act inside one person's authority, and the
// scoping is where the work is rather than in the verbs: "pay for it from the budget
// you already hold" is a different ask from "pay for it", and only one of the two can
// be signed in the room. `./content.ts` holds that as a RULE and not as a tone —
// `ownedByTheRoom` throws at module load on any lever whose act has lost the phrase
// that keeps it authorizable alone — so the property fails in the edit that breaks it
// rather than at CI a commit later.
//
// ═══ 6 POSES, one argument each, AND THE FIRST FOUR ARE MUTUALLY EXCLUSIVE WHILE THE
// LAST TWO ACCUMULATE. `./components/LeverBoard.tsx` carries the reasoning for the
// split and for why each hero is conditionally MOUNTED rather than gated.
//
//   0 — SPEAK AT THE START. A lectern that stands, and one figure that walks up to it
//       over and over. The act beside it, the reason under that, and what the
//       organisation loses without it on the shelf at the foot of the stage. The mark
//       was a churning week under this lever's two earlier readings; both turned on
//       booking time, and 2026-08-16 retired the premise — see `./content.ts`.
//   1 — BACK THE AMBASSADORS. Six figures, TWO of them clear of the row under one
//       guard breathing around both. The mark's subject is the boundary, not the
//       people, and the boundary is one act of authority over everybody inside it.
//       IT SURVIVED THE 2026-08-15 RETERMING UNTOUCHED, and reads truer for it: the
//       lever no longer asks the room to pick the two figures — the Culture
//       department's framework does that — so the guard IS the whole act now.
//   2 — OPEN THE ACCESS. A barrier that lifts, one mark that passes, and posts that
//       never move — because what opens is the access and not the wall.
//   3 — KEEP IT FUNDED. A block that does not shrink, a flow that keeps arriving off
//       it, and a check that lands. The block is the argument: the money comes off a
//       line that is already there.
//   4 — ALL FOUR, AND WHERE THEY END. The four levers as cards on one shelf, each
//       carrying the mark the room has just seen at hero size, and four curves leaving
//       them for a single box that says `YOU`. The one frame that says the four acts
//       have ONE signature between them — no hero pose can, because a hero shows one
//       lever and the claim is about the set.
//   5 — THE THESIS, UNDER THE RECAP THAT EARNS IT. A copper rule and one line of 19px
//       serif, and POSE 4 DOES NOT MOVE.
//
// `canonicalPose: 5` — the last pose, and for this slide that is also the fullest one,
// which is what `canonicalPose` has to be: it is the frame the PDF and PPTX exports
// print, and a canonical pose short of it would export the section's whole ask with
// its closer missing. On the slide that ENDS the mandate that is the one way this deck
// could travel badly — the exported page would show a room four things it can do and
// stop before saying what happens if it does none of them.
//
// ═══ NEITHER NUMBER IS TYPED HERE. `steps` and `canonicalPose` are read from
// `./levers-geometry.ts`'s `POSE_COUNT` and `THESIS_POSE`, which are derived from the
// content module's own lever tuple. One hero per lever plus a recap plus the ask is
// the slide's shape, so a fifth lever moves the step count, the recap's tiling and the
// figure's timetable in one edit and leaves nothing for an author to remember.
//
// ═══ NO THIRD LADDER IS INVENTED (§6.6). The deck carries exactly two ordered
// vocabularies — `gap-capability-ladder`'s L1–L5 and K.2's P0–P3 — and "Learn →
// Experiment → Build → Integrate → Own" was cut precisely so the room would hold one
// set of levels and not three. The four levers here cannot become a third: they are
// not levels, they are not stages, and nothing about them is ordered by MATURITY.
// `./content.ts` says on the field that their order is the order they get pulled in,
// and the stage backs that up by ranking none of them — one tier for all four names,
// one for all four acts, one mark size per scene. THIS IS THE RULE THE RE-CUT CAME
// CLOSEST TO BREAKING: four hero poses invite an eyebrow reading "LEVER ONE", and an
// ordinal on an eyebrow is how a list of four acts becomes a ladder by accident. Every
// hero's eyebrow is the lever's own name and nothing else.
//
// ═══ THERE IS NO BRAND AXIS, and this is the second slide in THIS SECTION to import
// no `VARIANT` at all — `mandate-enablement.tsx` is the first, and a reader coming
// from `mandate-phases-gates.tsx`, which does import one, should read `./content.ts`'s
// header before concluding that one of the three is wrong.
//
// THE TWO IN THIS SECTION ABSTAIN FOR DIFFERENT REASONS and `./content.ts` argues
// both. K.1 has no axis because its subject is generic by construction; this slide has
// none because its subject is THE PERSON IN THE ROOM, and that person is the same
// person in both rooms — a BU or Division Head with a calendar, a headcount and a
// budget line they already hold. §4.4 lists seven brand slots and none of them is this
// slide; §6.8 gives it no brand callback. A `Record<Brand, …>` here would be three
// byte-identical blocks, which is what a deck looks like on the day somebody edits one
// of them.
//
// ═══ THE LETTER IS NOT AUTHORED HERE, and this re-cut moves no letter and no number
// anywhere in either leader deck: `mandate` was already K, this row is still the run's
// last, and R3 renumbers only inside a run that changed. Nothing composed changed at
// all — the slide's id, its section key and its position in `./index.ts` are what they
// were. What this slide PRINTS is derived from the composed deck (§3.5): `FigLabel`
// takes a label only, and no rendered string under `src/slides/leader-mandate/` may
// name a letter or a number.
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { highlight } from "@/components/highlight";
import { LeverBoard } from "./components/LeverBoard";
import { POSE_COUNT, THESIS_POSE } from "./levers-geometry";
import { mandateLeversContent as C } from "./content";

// ───────────────────── slide ─────────────────────

export function MandateLevers() {
  const { stepIndex } = useDeck();

  return (
    <>
      <FigLabel label={C.figLabel} />

      {/* `.slide-headline.small` — 40px and not the base 46, for the shelf reason every
          recent leader slide records: 40px on 1.05 from top 80 ends the headline row at
          122, and 46px would end it at 128.3. The 34px of air under it is what
          `./levers-geometry.ts`'s `EYEBROW_TOP` spends, and it is the whole of
          complaint 4 in this file's header. */}
      <div className="slide-headline-row">
        <h1 className="slide-headline small">{highlight(C.headline, C.headlineKw)}</h1>
      </div>

      <LeverBoard pose={stepIndex} />
    </>
  );
}

// ───────────────────── slide def ─────────────────────

// NO `const BRAND_CONTENT = …For(VARIANT.brand)` HERE, and its absence is the decision
// — see the header. Importing no `VARIANT` is also what lets a test mount this stage in
// two variant epochs and compare the rendered bytes, which is the form
// `tests/unit/mandate-enablement.test.tsx` holds K.1's identical property in and the
// cheapest way to prove the two leader decks print the same slide.
export const mandateLeversSlide: SlideDef = {
  id: "mandate-levers",
  steps: POSE_COUNT,
  canonicalPose: THESIS_POSE,
  animationMode: "step-reveal",
  surface: "dark",
  sectionKey: "mandate",
  render: () => <MandateLevers />,
};
