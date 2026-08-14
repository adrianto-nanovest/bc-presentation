// PITFALLS · BRIDGE · MANDATE — the leader deck's own end to this section (gh#72).
//
// LEADER DECKS ONLY, and the slot `h3-bridge-to-i` vacated. THE PROBLEM IT FIXES was
// not a missing slide but a bridge pointing past the section in front of it: `h3`
// hands off to THE META-PROCESS, and in a leader deck THE MANDATE sits between the two
// (§3.6), so the room was told "next: the discipline, in practice" and then shown the
// ask. `h3` now composes behind `mandate-levers` at K.4, where its target really is
// next, and this slide bridges PITFALLS into THE MANDATE.
//
// IT IS KEYED `pitfalls`, NOT `mandate`, and it lives in this directory for the same
// reason: the run it closes is this section's. A bridge keyed `mandate` would sit at
// the FRONT of that run, and every bridge in the deck is the last slide of the section
// it leaves. The file is in `application-section-h/` because that is the `pitfalls`
// run's directory — being in the POOL is not being in a deck (§4.1), and only the two
// leader lists name this id.
//
// 2 steps:
//   0 — beat 1 reveals (two display lines + copper rule).
//   1 — beat 2 reveals (italic copper handoff).
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { BridgeHero } from "@/components/BridgeHero";
import { pitfallsBridgeContent } from "./content";

// ───────────────────── slide ─────────────────────

export function PitfallsBridgeToMandate() {
  const { stepIndex } = useDeck();

  return (
    <BridgeHero
      testId="pitfalls-bridge"
      copy={pitfallsBridgeContent}
      showBeat1={stepIndex >= 0}
      showBeat2={stepIndex >= 1}
      // 37 characters on line A, the longest beat-1 line of the three new bridges, so
      // this stage takes the full measure.
      measure={1120}
    />
  );
}

// ───────────────────── slide def ─────────────────────

export const pitfallsBridgeToMandateSlide: SlideDef = {
  id: "pitfalls-bridge-to-mandate",
  steps: 2,
  canonicalPose: 1,
  animationMode: "step-reveal",
  surface: "dark",
  sectionKey: "pitfalls",
  render: () => <PitfallsBridgeToMandate />,
};
