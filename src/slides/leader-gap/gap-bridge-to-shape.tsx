// THE GAP · BRIDGE · SHAPE — the last slide of the leader deck's first run (gh#72).
//
// LEADER DECKS ONLY. `src/deck/deck-sets.ts` names it in the leader list and in no
// other, so a standard deck never composes it — see `deck-orphan-guard.test.ts` for
// why an id that reaches no list at all is a failure rather than a no-op.
//
// The id names the section it LEAVES and the one it hands off to, never a letter: this
// slide composes as B.5 today and every figure it prints is derived from its position
// (§3.5). A row inserted anywhere in front of the `gap` run moves the letter, a row
// inserted inside the run moves the number, and neither touches this file.
//
// 2 steps:
//   0 — beat 1 reveals (two display lines + copper rule).
//   1 — beat 2 reveals (italic copper handoff).
//
// The stage is `@/components/BridgeHero`, shared with the deck's two other new
// bridges. This file is copy plus step policy and holds no layout at all — the five
// Phase-2 bridges each hold their own copy of that markup and are deliberately not
// ported (see the component's header).
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { BridgeHero } from "@/components/BridgeHero";
import { gapBridgeContent } from "./content";

// ───────────────────── slide ─────────────────────

export function GapBridgeToShape() {
  const { stepIndex } = useDeck();

  return (
    <BridgeHero
      testId="gap-bridge"
      copy={gapBridgeContent}
      showBeat1={stepIndex >= 0}
      showBeat2={stepIndex >= 1}
      // Both lines are short — "None of it was a tool problem." is 30 characters
      // against E.13's longest at 27 — so this one keeps a measure near E.13's
      // rather than the 1120 the two other new bridges need.
      measure={900}
    />
  );
}

// ───────────────────── slide def ─────────────────────

export const gapBridgeToShapeSlide: SlideDef = {
  id: "gap-bridge-to-shape",
  steps: 2,
  canonicalPose: 1,
  animationMode: "step-reveal",
  surface: "dark",
  sectionKey: "gap",
  render: () => <GapBridgeToShape />,
};
