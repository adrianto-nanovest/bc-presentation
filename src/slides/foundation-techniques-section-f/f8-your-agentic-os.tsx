// F.8 — YOUR AGENTIC OS (Section F coronation slide)
//
// Slim orchestrator. The previous typographic 9-layer stack + 4-output-card
// diagrammatic layout was retired in the 2026-05-14 monitor-mockup rework
// (see docs/specs/2026-05-14-f8-agentic-os-monitor.md). This slide now
// delegates almost all visual surface to <AgenticOSMonitor />.
//
// Step axis (2 steps; canonicalPose = 1):
//   0 → bezel materializes; staggered reveal of left rail, main canvas, right rail
//   1 → footer tagline reveals (canonical pose)
//
// Click-to-advance is blocked inside the bezel via data-no-advance on
// the monitor wrapper (see Slide.tsx click handler).
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { highlight } from "@/components/highlight";
import { AgenticOSMonitor } from "./components/AgenticOSMonitor";
import { Reveal } from "./components/Reveal";
import { f8Content } from "./content";

export function F8YourAgenticOs() {
  const { stepIndex } = useDeck();

  return (
    <>
      <FigLabel section="F" num={8} label="YOUR AGENTIC OS" />

      <div className="slide-headline-row">
        <h1
          data-testid="f8-headline"
          className="slide-headline small"
          style={{ textAlign: "left", margin: 0 }}
        >
          {highlight(f8Content.headline, f8Content.headlineKw)}
        </h1>
      </div>

      <div className="slide-content">
        <AgenticOSMonitor stepIndex={stepIndex} />

        <Reveal
          on={stepIndex >= 1}
          delay={120}
          data-testid="f8-tagline"
          style={{
            marginTop: 14,
            textAlign: "left",
            fontFamily: "var(--display)",
            fontStyle: "italic",
            fontSize: 16,
            color: "var(--neutral-300)",
            lineHeight: 1.3,
          }}
        >
          {highlight(f8Content.tagline, f8Content.taglineKw)}
        </Reveal>
      </div>
    </>
  );
}

export const f8Slide: SlideDef = {
  steps: 2,
  canonicalPose: 1,
  animationMode: "step-reveal",
  surface: "dark",
  section: "F",
  render: () => <F8YourAgenticOs />,
};
