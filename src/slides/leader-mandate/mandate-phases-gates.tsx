// PHASES AND GATES — the Capability Ladder a second time, read as a plan.
//
// Spec §6.8 (content) · §6.5 (the ladder this maps onto) · §4.4 slot 6 (the brand
// axis) · §11 Phase 6. No #16 prototype covers this slide, so nothing is
// productionized from one: the visual contract is settled here, the same way its
// siblings' were — one figure component, one geometry module, one stylesheet, copy in
// the section's own content module.
//
// ═══ RE-CUT 2026-08-15 (owner's call), AND THE RE-CUT IS THE FILE. What shipped was ONE
// STAGE HOLDING EVERYTHING: a small staircase across the top, four phase columns under
// it, a bordered band under those, and the ask under that — five bands of content and
// thirteen named objects, assembled over four poses that only ever added.
// `./phases-gates-geometry.ts` records the three complaints that retired it. Each is
// answered by a different part of the rebuild, and all three had already been answered
// on K.1 one slide earlier:
//
//   1. THE STAGE WAS FULL AND NOTHING ON IT WAS BIG. This is a top-management slide, and
//      a staircase drawn at an 18px rise so four columns and a band could fit under it is
//      a staircase nobody reads from the back row. Three of the five poses are now HEROES
//      with one figure each, and the fourth recaps all three.
//   2. THE HEADING SHELF WAS 134, twelve pixels under a 40px display headline, so the
//      room read the title and the first mono line as one wrapped line. The eyebrow shelf
//      is 156 now, which is `.slide-content`'s own top.
//   3. THE ASK WAS 20px SERIF ITALIC AT 572 while K.1's, one click earlier, was 19px
//      UPRIGHT at 590 over a copper rule. Two adjacent slides ended their arguments in
//      two registers. This one now stands on K.1's shelf.
//
// AND ONE CORRECTION THAT IS NOT A LAYOUT DECISION AT ALL. The Berau block asserted that
// P0 WAS COMPLETE, headed its band "AUG 18 IS THE GATE", and closed on "The AI
// Ambassadors already exist." None of the three is true: the plan has slipped, the
// competition is still running, the post-assessment has not been taken, and no
// Ambassador has been named. `./content.ts` carries the corrected block and the argument
// for why a P0 still in flight makes this slide STRONGER — a finished phase lets a room
// say "good, that worked"; an unfinished one puts them inside the phase the slide is
// about. `leader-gap/content.ts` took the same correction a day earlier.
//
// ═══ 5 POSES, one argument each, AND THE FIRST THREE ARE MUTUALLY EXCLUSIVE WHILE THE
// LAST TWO ACCUMULATE. `./components/PhaseLadder.tsx` carries the reasoning for the
// split and for why each hero is conditionally MOUNTED rather than gated.
//
//   0 — THE LADDER. `gap-capability-ladder`'s staircase at its own scale, drawing itself
//       in, with the two rungs no phase reaches drawn in that slide's own dash and named
//       by two dashed notes. The room reads the vocabulary it already knows, big, before
//       anything is placed on it — and learns that the plan stops one rung short of the
//       top of the ladder it is drawn on.
//   1 — THE PHASES. Four cards on one shelf: the phase, the rung it leaves you on, an
//       animated mark, and the ORGANISATION'S OWN published dates, cited underneath in
//       its own words. This is the pose that reads as a timeline, and it is meant to.
//   2 — THE GATES. The SAME four cards, on the same shelf, at the same width: only the
//       mark and the body change, and the dates become what has to be true to leave.
//       The slide's turn, made by the stage rather than asserted by a sentence.
//   3 — THE WHOLE PLAN. The staircase again, small, with a chip on every tread a phase
//       lands on, over four columns carrying both halves at once. The one frame that says
//       WHICH PHASE STANDS ON WHICH RUNG — no hero pose can, because the staircase and
//       the columns are never on stage together anywhere else.
//   4 — THE THESIS, UNDER THE PLAN THAT EARNS IT. A copper rule and one line of 19px
//       serif, and POSE 3 DOES NOT MOVE.
//
// `canonicalPose: 4` — the last pose, and for this slide that is also the fullest one,
// which is what `canonicalPose` has to be: it is the frame the PDF and PPTX exports
// print, and a canonical pose short of it would export a plan with its ask missing.
//
// ═══ THE MOTION IS THE ARGUMENT. The two card scenes print the same four columns and
// the only thing separating them is the grammar of the marks: every state mark performs
// A CALENDAR ADVANCING — something that moves, repeats and arrives nowhere new — and
// every gate mark performs A MEASUREMENT THAT LANDS. That pair IS the headline, said in
// the one channel a printed plan does not have. `./components/phases.css` holds all ten
// keyframes and `./components/PhaseGlyphs.tsx` the eight shapes.
//
// ═══ THE BRAND AXIS IS THE CALENDAR, THE CITATION AND THE ASK — nothing else (§4.4 slot
// 6). No phase, no gate, no rung and no scene line is on it. That split is what lets this
// slide put two organisations' real roadmaps on one structure without either room being
// shown a plan built around the other's dates.
//
// ═══ NO THIRD LADDER IS INVENTED (§6.6, #61's third AC). "Learn → Experiment → Build →
// Integrate → Own" was cut from this deck precisely so the room would carry one
// vocabulary, and the four phase STATES here cannot become a second one: they are
// adjectives on `gap-capability-ladder`'s rungs, and two of them — CLAIMED and SOLID —
// name the same rung, which is the one thing a ladder cannot do.
//
// ═══ THIS IS WHERE #7'S EXCLUSION IS REVERSED, AND ONLY HERE. §5.3 keeps the programme
// framing — the competition, the rewards, AI Forge, the post-assessment — out of the
// standard decks; it is the organiser's announcement and is handled verbally there.
// Leaders are asked to SPONSOR, and "gates, not dates" needs real gates, so this slide
// names all of it. THE REVERSAL IS SCOPED BY COMPOSITION AND BY NOTHING ELSE:
// `mandate-phases-gates` is in `LEADER_SLIDE_IDS` and in no standard list, so the
// exclusion holds everywhere this file is not composed.
// `tests/unit/mandate-phases-gates.test.tsx` asserts that directly, beside the copy that
// depends on it.
//
// ═══ A NAMING COLLISION THAT IS NOT A MISTAKE, so nobody reconciles it later. This slide
// prints K.2 — the `mandate` run's second slide. The Practice Lab's
// `k2-practice-lab-overview` prints N.2 in these same leader decks, and K.2 in a standard
// one. Two different slides that have each printed "K.2" in some deck: the id in that
// file's name is its own BASENAME, frozen when it was written against a deck where the
// lab was section K, and §3.4 R2 has moved it twice since. What disambiguates the two is
// the file basename and the section key, and never the letter — which is why no file
// under `src/slides/leader-mandate/` may hold one.
//
// ═══ THE LETTER IS NOT AUTHORED HERE. What this slide prints is derived from the
// composed deck (§3.5): `FigLabel` takes a label only, and no rendered string under
// `src/slides/leader-mandate/` may name a letter or a number.
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { VARIANT } from "@/variant";
import { FigLabel } from "@/components/FigLabel";
import { highlight } from "@/components/highlight";
import { PhaseLadder } from "./components/PhaseLadder";
import {
  mandatePhasesGatesContent as C,
  phasesGatesFor,
  type PhasesGatesBrandBlock,
} from "./content";

// ───────────────────── slide ─────────────────────

export function MandatePhasesGates({ content }: { content: PhasesGatesBrandBlock }) {
  const { stepIndex } = useDeck();

  return (
    <>
      <FigLabel label={C.figLabel} />

      {/* `.slide-headline.small` — 40px and not the base 46, for the shelf reason every
          recent leader slide records: 40px on 1.05 from top 80 ends the headline row at
          122, and 46px would end it at 128.3. The 34px of air under it is what
          `./phases-gates-geometry.ts`'s `EYEBROW_TOP` spends, and it is the whole of
          complaint 2 in this file's header. */}
      <div className="slide-headline-row">
        <h1 className="slide-headline small">{highlight(C.headline, C.headlineKw)}</h1>
      </div>

      <PhaseLadder content={content} pose={stepIndex} />
    </>
  );
}

// ───────────────────── slide def ─────────────────────

// Resolved ONCE, at module scope, exactly as `gap-capability-ladder` and
// `invest-own-proof` resolve theirs and for the same reason: `VARIANT` resolves at
// module scope, so one module epoch holds one brand and the URL that decided it
// cannot change without a reload. The figure below takes the resolved block as a
// PROP and reads no variant of its own — which is what lets one test mount both
// brands' calendars in the same epoch and compare them (§4.4 slot 6).
//
// K.1 IS THE SECTION'S EXCEPTION, NOT THIS SLIDE. `mandate-enablement.tsx` imports
// no `VARIANT` at all because it has no brand axis; a reader coming from that file
// should read `./content.ts`'s header before concluding that one of the two is
// wrong.
const BRAND_CONTENT = phasesGatesFor(VARIANT.brand);

export const mandatePhasesGatesSlide: SlideDef = {
  id: "mandate-phases-gates",
  steps: 5,
  canonicalPose: 4,
  animationMode: "step-reveal",
  surface: "dark",
  sectionKey: "mandate",
  render: () => <MandatePhasesGates content={BRAND_CONTENT} />,
};
