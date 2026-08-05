// THE DEADLOCK, AND WHO CAN SKIP IT — the second slide of the WHY INVEST run, and
// the only one in the deck that admits to breaking somebody's rules.
//
// Spec §6.7 (D.3's four beats, and "beat 3 is load-bearing") · §6.2 (the shadow-AI
// escalation: B.2 as CONDITION, D.4 beat 2 as EXPOSURE, this slide as RATIONAL
// BEHAVIOUR, and no image or statistic shared between any two of them) · §11's Phase
// 6 row, by the owner call of 2026-08-04 that put this slide in a phase at all. No
// #16 prototype covers it, so nothing is productionized from one; the visual contract
// is settled here the way its three siblings' were — one figure component, one
// geometry module.
//
// WHY THE SLIDE IS SHAPED THIS WAY. §6.7's argument is a TRADE, not a warning: a
// division that has no budget without proof and no proof without budget will produce
// the workaround by itself, so the useful thing to put in front of a division head is
// what the workaround actually cost and what it bought. That is why the four costs are
// on the stage rather than in the presenter's mouth, and why the sentence that ended
// the story legitimately — full investment released — is the biggest, brightest prose
// on the slide. Without it the left column is advice to breach terms of service.
//
// NO BRAND AXIS, and that is a decision. §4.4's table of seven brand × deckSet slots
// does not list this slide: the deadlock, the shared accounts and the ban are
// NANOVEST'S OWN, and a resolver here would have to invent a version of this history
// for a division that never lived it. So there is no `*For(brand)` call at module
// scope, unlike `./invest-own-proof.tsx` — one story, byte-identical in both leader
// decks, which is a claim a browser check can settle by diffing the two decks'
// rendered boxes.
//
// 4 POSES FOR 4 BEATS — AND NOT ONE BEAT PER POSE. The split is the ticket's sharpest
// constraint and `./components/ChickenEggBeats.tsx` carries the full argument; in one
// line: a pose is a RESTING STATE, #57 forbids any pose that ends on beat 2, so beat 2
// and beat 3 share pose 1 and beat 4 takes the two poses that frees.
//
//   0 — THE DEADLOCK. The headline says every division starts in it; the two mono
//       clauses are the loop, each the other with its two nouns swapped.
//   1 — THE TRADE. What we did on shared accounts and what it cost, itemised — then
//       the copper rule and, LAST, the fact that it worked and the investment was
//       released. Beat 3 arrives after beat 2 in the reveal order and below it in the
//       reading order, so §6.7's beat order is kept and no resting state ends on the
//       confession.
//   2 — THE TURN. The one sentence addressed to the room: the person in the chair can
//       skip all three.
//   3 — THE TERMS. The pilot as a bordered card — 30 days, a handful of seats, one
//       named use case each, a kill criterion, a spend cap. Four limits and a clock.
//
// `canonicalPose: 3` — the fullest pose, and the only one the PDF and PPTX exports
// print. Any lower is indefensible for this slide in particular: a canonical pose of
// 1 would export a page whose last word is the ban, and 2 would export an offer with
// no terms on it. An exported PDF has no presenter attached to it, so the exported
// frame has to be the one that is safe to read alone.
//
// THE LETTER IS NOT AUTHORED HERE, and the number is one behind §6.7's. This slide
// composes as **D.2** today — second in the `invest` run, behind `invest-own-proof` —
// while §6.7 numbers it **D.3**, because §6.7 describes the FINISHED section and
// `invest-base-rates` (§6.7's D.1) is unbuilt. That gap is §3.5 working as designed:
// a letter and a number are derived from what the deck actually holds, `FigLabel`
// takes a label only, and no rendered string under `src/slides/leader-invest/` may
// name either. Do not "fix" the figure to D.3 — the day D.1 lands, both this slide
// and its sibling move one number and no file here is opened.
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { highlight } from "@/components/highlight";
import { ChickenEggBeats } from "./components/ChickenEggBeats";
import { investChickenEggContent as C } from "./content";

// ───────────────────── slide ─────────────────────

export function InvestChickenEgg() {
  const { stepIndex } = useDeck();

  return (
    <>
      <FigLabel label={C.figLabel} />

      {/* `.slide-headline.small` — 40px and not the base 46. Both fit on one line
          (564.94px and 649.69px against a 1184px measure, measured as a nowrap clone
          in Chromium — see `./chicken-egg-geometry.ts`'s type table for the method and
          for why `canvas.measureText` is not it), so the reason is the
          shelf and not the wrap: the two columns start at y=156, which is
          `.slide-content`'s own top, and 46px would end the headline row at 128.3
          instead of 122. The sibling leader slides make the same call for the same
          reason. */}
      <div className="slide-headline-row">
        <h1 className="slide-headline small">{highlight(C.headline, C.headlineKw)}</h1>
      </div>

      <ChickenEggBeats pose={stepIndex} />
    </>
  );
}

// ───────────────────── slide def ─────────────────────

export const investChickenEggSlide: SlideDef = {
  id: "invest-chicken-egg",
  steps: 4,
  canonicalPose: 3,
  animationMode: "step-reveal",
  surface: "dark",
  sectionKey: "invest",
  render: () => <InvestChickenEgg />,
};
