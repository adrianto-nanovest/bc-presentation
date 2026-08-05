// PHASES AND GATES — the Capability Ladder a second time, read as a plan.
//
// Spec §6.8 (content) · §6.5 (the ladder this maps onto) · §4.4 slot 6 (the brand
// axis) · §11 Phase 6. No #16 prototype covers this slide, so nothing is
// productionized from one: the visual contract is settled here, the same way its
// four siblings' were — one figure component, one geometry module, copy in the
// section's own content module.
//
// WHY THE SLIDE IS SHAPED THIS WAY. §6.5 ends by saying its B.5 and this slide are
// "the same object seen twice", so the strongest thing this stage can do is draw
// the same staircase. It does: five treads in the same order under the same
// names, taken from `leader-gap`'s own rung array through an import (see
// `./content.ts` for the argument), with the four phases standing on the three
// rungs §6.5's mapping gives them — P0–P1 → L2, P2 → L3, P3 → L4. Two facts about
// the plan are therefore geometry rather than copy, and a leader who reads only
// the shapes still gets both:
//
//   · TWO PHASES SHARE ONE RUNG. Getting an organisation onto L2 and keeping it
//     there without the programme pushing are different work, and a plan that
//     collapsed them is how "we ran the workshop" becomes "we are at L2".
//   · TWO RUNGS TAKE NO PHASE AT ALL. L1 is behind the start line and L5 is
//     `gap-capability-ladder`'s "declared only when earned", so the plan on this
//     stage stops one rung short of the top of the ladder it is drawn on. Nothing
//     says that in a sentence.
//
// B.5 IS THE SPEC'S NAME FOR THAT SLIDE AND NOT THE DECK'S, which is why it stands
// above only inside a §6.5 citation and why every other line in this directory
// names the basename instead. §6.5 numbers `gap-capability-ladder` B.5 because it
// describes the FINISHED `gap` run of five; two of those five are built, so the
// composed leader decks derive B.2 for it today — B.1 until gh#65 landed §6.1's slide
// at the head of the run — and it keeps moving until Phase 7 lands the other three
// (§11; the "#55–#58" this comment named before are C.1's focus walk and D.2–D.4, none
// of them a `gap` slide). The basename is what is true in both, which is the rule this
// file states further down and the reason it is followed here.
//
// NO THIRD LADDER IS INVENTED (§6.6, #61's third AC). "Learn → Experiment → Build
// → Integrate → Own" was cut from this deck precisely so the room would carry one
// vocabulary, and the four phase STATES here cannot become a second one: they are
// adjectives on `gap-capability-ladder`'s rungs, and two of them — CLAIMED and
// SOLID — name the same rung, which is the one thing a ladder cannot do.
// `./content.ts` states that on the field itself, where an author writing a fifth
// phase will read it.
//
// 5 POSES, one argument each:
//   0 — THE SAME LADDER. Five rungs, in order, under `gap-capability-ladder`'s own
//       fig label. Nothing is placed on it yet, which is the pose the room
//       recognises it in.
//   1 — THE PHASES. Four chips land on the staircase and four columns open under
//       it, each carrying the organisation's own published calendar. This is the
//       pose that reads as a timeline, and it is meant to.
//   2 — THE GATES. What actually ends each phase. The slide's turn: the dates
//       above are the organisation's, the gates are the deck's, and only one of
//       the two decides anything.
//   3 — THE BAND. The organisation's own words about where its roadmap already
//       goes, quoted and attributed — and, for Berau, the day the room is sitting
//       in.
//   4 — THE CLOSER. The ask, which differs by brand because the two rooms are
//       being asked different things.
//
// `canonicalPose: 4` — the fullest pose, and the only one the PDF and PPTX exports
// print. A canonical pose short of it would export a plan with its gates showing
// and the ask missing, which is the one way this slide could travel badly.
//
// THE BRAND AXIS IS THE CALENDAR, THE CITATION AND THE ASK — nothing else (§4.4
// slot 6). No phase, no gate and no rung is on it. That split is what lets this
// slide put two organisations' real roadmaps on one structure without either
// room being shown a plan built around the other's dates.
//
// THIS IS WHERE #7'S EXCLUSION IS REVERSED, AND ONLY HERE. §5.3 keeps the
// programme framing — the competition, the rewards, AI Forge, the post-assessment
// — out of the standard decks; it is the organiser's announcement and is handled
// verbally there. Leaders are asked to SPONSOR, and "gates, not dates" needs real
// gates, so this slide names all of it. THE REVERSAL IS SCOPED BY COMPOSITION AND
// BY NOTHING ELSE: `mandate-phases-gates` is in `LEADER_SLIDE_IDS` and in no
// standard list, so the exclusion holds everywhere this file is not composed.
// `tests/unit/mandate-phases-gates.test.tsx` asserts that directly, beside the
// copy that depends on it.
//
// A NAMING COLLISION THAT IS NOT A MISTAKE, so nobody reconciles it later. This
// slide prints K.2 — the `mandate` run's second slide. The Practice Lab's
// `k2-practice-lab-overview` prints N.2 in these same leader decks, and K.2 in a
// standard one. Two different slides that have each printed "K.2" in some deck:
// the id in that file's name is its own BASENAME, frozen when it was written
// against a deck where the lab was section K, and §3.4 R2 has moved it twice
// since. What disambiguates the two is the file basename and the section key, and
// never the letter — which is why no file under `src/slides/leader-mandate/` may
// hold one.
//
// THE LETTER IS NOT AUTHORED HERE. This slide APPENDS inside a run that already
// exists, so unlike its four leader-only siblings it moves no letter and no number
// anywhere in either deck: `mandate` was already K when gh#60 opened it, and
// `meta`/`principles`/`lab` were already L/M/N. What this slide prints is derived
// from the composed deck (§3.5): `FigLabel` takes a label only, and no rendered
// string under `src/slides/leader-mandate/` may name a letter or a number.
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
