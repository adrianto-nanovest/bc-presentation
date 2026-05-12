// H.2 — THE DISCIPLINE
//
// Spec: docs/specs/2026-05-12-slides-application-H-discipline.md §H.2 (lines 119–197).
//
// The "right answer" partner to H.1's pitfall wall. Eight practice cards
// arranged 4×2; a calm sequential glow loop washes left-to-right, top-to-
// bottom; step 2 reveals a horizontal pitfall pill row beneath a copper rule
// and unlocks the cross-highlight interaction (hover practice → matching pills
// glow; hover pill → matching practices glow).
//
// 3 reveal steps:
//   0 — Practice cards stagger in (delay 120 + i*80); composition glow loop
//       starts ~800ms post-mount; subhead beneath headline.
//   1 — Optional one-time unison flare across all 8 cards (200ms in / 800ms
//       out) to signal "catalogue captured — what does it FIX?".
//   2 — Copper rule animates 0→100%; "RESOLVES WHAT?" header + 8 pitfall
//       pills stagger in; "⊙ Resolves: A · B · G" caption appears beneath
//       each card's move-line; cross-highlight binding activates.
import type { SlideDef } from "@/deck/types";
import { useState } from "react";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { highlight } from "@/components/highlight";
import { Reveal } from "../foundation-core-section-e/components/Reveal";
import {
  DisciplineWall,
  type PracticeCardData,
  type PitfallPillData,
} from "./components/DisciplineWall";
import { h2Content as C } from "./content";

// ─────────────────────────────────────────────────────────────────────────────

export function H2DisciplineWall() {
  const { stepIndex } = useDeck();
  const [hoveredPracticeId, setHoveredPracticeId] = useState<string | null>(
    null,
  );
  const [hoveredPillId, setHoveredPillId] = useState<string | null>(null);

  const showPills = stepIndex >= 2;
  const showResolves = stepIndex >= 2;

  // Adapt readonly content tuples → mutable arrays the component expects.
  const practices: PracticeCardData[] = C.cards.map((c) => ({
    num: c.num,
    name: c.name,
    move: c.move,
    resolves: c.resolves,
    glyphKind: c.glyphKind,
  }));
  const pills: PitfallPillData[] = C.pills.map((p) => ({
    id: p.id,
    label: p.label,
  }));

  return (
    <div data-testid="h2-root" style={{ position: "absolute", inset: 0 }}>
      <FigLabel section="H" num={2} label={C.figLabel} />

      {/* Headline (always structural) */}
      <h1
        className="slide-headline small"
        style={{
          position: "absolute",
          top: 80,
          left: 48,
          right: 48,
          margin: 0,
        }}
      >
        {highlight(C.headline, [...C.headlineKw])}
      </h1>

      {/* Subhead — mono 11px copper-400 uppercase */}
      <Reveal
        on={true}
        delay={80}
        style={{
          position: "absolute",
          top: 128,
          left: 48,
          right: 48,
          fontFamily: "var(--mono)",
          fontSize: 11,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "var(--copper-400)",
        }}
      >
        {C.subhead}
      </Reveal>

      {/* Interactive region — practice grid + rule + pills.
          `data-no-advance` shields hover/click on the wall from the deck's
          click-to-advance handler. */}
      <div
        data-no-advance
        style={{
          position: "absolute",
          left: 48,
          right: 48,
          top: 156,
          bottom: 24,
        }}
      >
        <DisciplineWall
          practices={practices}
          pills={pills}
          resolvesHeader={C.resolvesHeader}
          pillsVisible={showPills}
          showResolves={showResolves}
          stepIndex={stepIndex}
          hoveredPracticeId={hoveredPracticeId}
          hoveredPillId={hoveredPillId}
          onPracticeHover={setHoveredPracticeId}
          onPillHover={setHoveredPillId}
        />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

export const h2Slide: SlideDef = {
  steps: 3,
  canonicalPose: 2,
  animationMode: "step-reveal",
  surface: "dark",
  section: "H",
  render: () => <H2DisciplineWall />,
};
