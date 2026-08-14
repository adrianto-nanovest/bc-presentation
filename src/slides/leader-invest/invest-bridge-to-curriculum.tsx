// WHY INVEST · BRIDGE · CURRICULUM — the hinge of the whole leader deck (gh#72).
//
// LEADER DECKS ONLY, and the one bridge that closes TWO runs: `shape` ships none, so
// this stage is the last word for THE SHAPE and WHY INVEST together (see
// `./content.ts`'s `investBridgeContent`). Behind it the deck stops arguing and starts
// skimming — §4.3 retains curriculum sections E–J verbatim and walks them at speed —
// and this slide is where the room is told that, and why.
//
// The id names neither letter. It composes as D.5 today; the figure is derived (§3.5).
//
// 2 steps:
//   0 — beat 1 reveals (two display lines + copper rule).
//   1 — beat 2 reveals (italic copper handoff).
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { BridgeHero } from "@/components/BridgeHero";
import { investBridgeContent } from "./content";

// ───────────────────── slide ─────────────────────

export function InvestBridgeToCurriculum() {
  const { stepIndex } = useDeck();

  return (
    <BridgeHero
      testId="invest-bridge"
      copy={investBridgeContent}
      showBeat1={stepIndex >= 0}
      showBeat2={stepIndex >= 1}
      // Line A is two sentences on one row (36 characters) and beat 2 runs to 38, so
      // this stage takes the full 1120 measure H.3 uses. Anything narrower wraps a
      // beat, which is the one failure a DOM-less test cannot see.
      measure={1120}
    />
  );
}

// ───────────────────── slide def ─────────────────────

export const investBridgeToCurriculumSlide: SlideDef = {
  id: "invest-bridge-to-curriculum",
  steps: 2,
  canonicalPose: 1,
  animationMode: "step-reveal",
  surface: "dark",
  sectionKey: "invest",
  render: () => <InvestBridgeToCurriculum />,
};
