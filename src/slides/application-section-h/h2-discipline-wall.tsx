// H.2 — THE DISCIPLINE
//
// Spec: docs/specs/2026-05-12-slides-application-H-discipline.md §H.2 (lines 119–197).
//
// The "right answer" partner to H.1's pitfall wall. Eight practice cards
// arranged 4×2; presenter hovers a card to spotlight matching pitfall pills
// (and vice versa). No composition-level auto-animation.
//
// 2 reveal steps:
//   0 — Practice cards stagger in (delay 120 + i*80).
//   1 — Copper rule animates 0→100%; "RESOLVES WHAT?" header + 8 pitfall
//       pills stagger in; "⊙ Resolves: A · B · G" caption appears beneath
//       each card's move-line; cross-highlight binding activates.
import type { SlideDef } from "@/deck/types";
import { useState } from "react";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { highlight } from "@/components/highlight";
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

  const showPills = stepIndex >= 1;
  const showResolves = stepIndex >= 1;

  // Adapt readonly content tuples → mutable arrays the component expects.
  const practices: PracticeCardData[] = C.cards.map((c) => ({
    num: c.num,
    name: c.name,
    move: c.move,
    moveKw: c.moveKw,
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

      {/* Interactive region — practice grid + rule + pills.
          `data-no-advance` shields hover/click on the wall from the deck's
          click-to-advance handler. Layout mirrors H.1: top 148. */}
      <div
        data-no-advance
        style={{
          position: "absolute",
          left: 48,
          right: 48,
          top: 148,
          bottom: 24,
        }}
      >
        <DisciplineWall
          practices={practices}
          pills={pills}
          resolvesHeader={C.resolvesHeader}
          pillsVisible={showPills}
          showResolves={showResolves}
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
  steps: 2,
  canonicalPose: 1,
  animationMode: "step-reveal",
  surface: "dark",
  section: "H",
  render: () => <H2DisciplineWall />,
};
