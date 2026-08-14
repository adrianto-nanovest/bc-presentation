// THE ENABLEMENT MODEL — the first slide of THE MANDATE, and the last thing a
// leader is asked to authorize.
//
// Spec §6.8 (content) · §4.3's leader deck table · §11 Phase 6. No #16 prototype
// covers this slide, so nothing is productionized from one: the visual contract
// is settled here, and settled the same way its three siblings' were — one figure
// component, one geometry module, one stylesheet, copy in the section's own content
// module.
//
// ═══ RE-CUT 2026-08-14 (owner's call), AND THE RE-CUT IS THE FILE. What shipped was
// TWO COLUMNS AND A BAND: four pillars beside three tracks, bottoming out on one
// line, over a bordered band holding one organisation's quoted brief, argued in four
// reveals with nothing ever leaving the stage. Three complaints retired it, and each
// one is answered by a different part of the rebuild:
//
//   1. THE STAGE WAS FULL AND NOTHING ON IT WAS BIG. Ten things named at once means
//      nothing gets more than a tenth of the room, and this is a top-management
//      slide. So the first three poses each get ONE HERO — three blocks, then four
//      pillars, then three tracks — at 330px a card with an 88px animated mark, and
//      the FOURTH pose recaps all three at chip size and wires them together. The
//      brief is quoted verbatim in `./components/EnablementModel.tsx`.
//   2. THE EYEBROWS SAT TWELVE PIXELS UNDER A 40px DISPLAY HEADLINE, so the room read
//      a title and a second title as one wrapped line. The eyebrow shelf is 156 now,
//      which is `.slide-content`'s own top and the same 34px of air `leader-invest`'s
//      D.1…D.4 cut for the identical complaint.
//   3. THE BAND NAMED ANOTHER ORGANISATION IN A ROOM THE BRIEF DID NOT COME FROM. It
//      was honest about its provenance and it was still the wrong object. It is gone,
//      and what stands in its place is three GENERIC blocks the same programme meets
//      in both rooms. See `./content.ts`: the slide now prints no organisation's name
//      at any pose in either deck, which is a stronger property than the one it had.
//
// ═══ 5 POSES, one argument each, AND THE FIRST THREE ARE MUTUALLY EXCLUSIVE WHILE THE
// LAST TWO ACCUMULATE. That is the one place this slide departs from its three siblings,
// all of which accumulate throughout. `./components/EnablementModel.tsx` carries the
// reasoning for the departure and for why each hero is conditionally MOUNTED rather than
// gated.
//
//   0 — THE BLOCKS. What stops us today: approval, literacy, resistance. The slide
//       opens on the problem and not on the programme, because a leader shown four
//       pillars first prices them and a leader shown three blocks first recognises
//       them. Every mark in this scene performs a FAILURE.
//   1 — THE PILLARS. What the programme is made of. Four answers, on the shelf the
//       three problems just left, at the same card height — so the click reads as a
//       row being answered. Every mark here performs a STRUCTURE WORKING.
//   2 — THE TRACKS. Who it reaches, and how deep. Three full-width rows, three lanes
//       of falling width and rising tier. Every mark here performs REACH.
//   3 — THE WHOLE MODEL. All ten things at chip size in three columns, with four
//       drawn connectors from each block to the pillars that answer it, and a hairline
//       — not a fifth connector — between the pillars and the tracks. The one frame on
//       the slide that is not a restatement: no hero pose can show that two pillars
//       answer one block, because the two lists are never on stage together anywhere
//       else.
//   4 — THE THESIS, UNDER THE MODEL THAT EARNS IT. A copper rule and one line of 19px
//       serif on the deck's own thesis shelf, and POSE 3 DOES NOT MOVE: the recap stays
//       exactly where it is, does not re-animate and does not re-tile. That is the
//       owner's second-pass correction and it is the right one — cleared to one
//       sentence the room reads an assertion with its evidence gone, printed under the
//       frame it summarises it reads as that frame's conclusion. The model travels to
//       any company; which block gets cleared first does not, and that is the ask this
//       slide hands to K.2's phases and gates.
//
// ═══ `canonicalPose: 4` — THE LAST POSE, AND FOR THIS SLIDE THAT IS ALSO THE FULLEST
// ONE. `canonicalPose` is the frame the PDF and PPTX exports print, so what it has to be
// is the fullest pose; the first cut of this rebuild made pose 4 a cleared stage carrying
// one sentence and had to set 3 to avoid exporting a thesis with none of its evidence.
// The owner's correction removed that problem rather than working around it: pose 4 now
// prints the whole model AND the line it argues for, so the last pose and the fullest pose
// are the same frame again and this slide is back on its siblings' `steps - 1`.
//
// ═══ AND WHY IT HAS NO BRAND AXIS, which is the one thing about this file that will
// surprise a reader of its three siblings. `gap-capability-ladder`,
// `shape-agentic-org` and `invest-own-proof` each resolve a brand block at module
// scope, because each puts an organisation's own evidence in front of that
// organisation. This one resolves nothing, and after the re-cut it resolves nothing for
// the plainest possible reason: there is no organisation-specific string on the stage to
// vary. `./content.ts` argues that at length and
// `tests/unit/mandate-enablement.test.tsx` holds it as a rule: NO rendered string on
// this slide may name an organisation, at any pose, in either leader deck.
//
// ═══ THE LETTER IS NOT AUTHORED HERE. What this slide prints is derived from the
// composed deck (§3.5): `FigLabel` takes a label only, and no rendered string under
// `src/slides/leader-mandate/` may name a letter or a number.
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { highlight } from "@/components/highlight";
import { EnablementModel } from "./components/EnablementModel";
import { mandateEnablementContent as C } from "./content";

// ───────────────────── slide ─────────────────────

export function MandateEnablement() {
  const { stepIndex } = useDeck();

  return (
    <>
      <FigLabel label={C.figLabel} />

      {/* `.slide-headline.small` — 40px and not the base 46, for the shelf reason every
          recent leader slide records: 40px on 1.05 from top 80 ends the headline row at
          122, and 46px would end it at 128.3. The 34px of air under it is what
          `../enablement-geometry.ts`'s `EYEBROW_TOP` spends, and it is the whole of
          complaint 2 above. */}
      <div className="slide-headline-row">
        <h1 className="slide-headline small">{highlight(C.headline, C.headlineKw)}</h1>
      </div>

      <EnablementModel pose={stepIndex} />
    </>
  );
}

// ───────────────────── slide def ─────────────────────

// NO `const BRAND_CONTENT = …fFor(VARIANT.brand)` HERE, and its absence is the
// decision — see the header. This is the only leader-only slide in the tree that
// imports no `VARIANT` at all, which is also what lets its test compare the
// rendered stage across two variant epochs and prove the two leader decks print
// the same bytes.
export const mandateEnablementSlide: SlideDef = {
  id: "mandate-enablement",
  steps: 5,
  canonicalPose: 4,
  animationMode: "step-reveal",
  surface: "dark",
  sectionKey: "mandate",
  render: () => <MandateEnablement />,
};
