// I.3 — THE PORTFOLIO (F8-style monitor rewrite, 2026-05-15)
//
// The previous 30/70 CategoryList + HarnessCanvas layout has been retired in
// favor of an F8-style bezel monitor with a LEFT NAV RAIL + main panel (no
// right chat rail). Four panels: WORKFLOWS / PLUGINS / CONNECTORS /
// WORKSHOPS. Click-to-advance is blocked by `<Interactive>` so the audience
// can tab around the monitor without the deck navigating away.
//
// Step axis (2 steps; canonicalPose = 1, mirroring F8):
//   0 → bezel materializes; staggered reveal of nav + main
//   1 → caption reveals (canonical pose)
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { Interactive } from "@/motion/Interactive";
import { FigLabel } from "@/components/FigLabel";
import { highlight } from "@/components/highlight";
import { PortfolioMonitor } from "./components/PortfolioMonitor";
import { Reveal } from "../foundation-techniques-section-f/components/Reveal";
import { i3Content as C } from "./content";

export function I3Portfolio() {
  const { stepIndex } = useDeck();

  return (
    <>
      <FigLabel section="I" num={3} label="THE PORTFOLIO" />

      <div className="slide-headline-row">
        <h1
          data-testid="i3-headline"
          className="slide-headline small"
          style={{ textAlign: "left", margin: 0 }}
        >
          {highlight(C.headline, ["Built", "Taught", "In production"])}
        </h1>
      </div>

      <div className="slide-content">
        <Interactive>
          <PortfolioMonitor stepIndex={stepIndex} />
        </Interactive>

        <Reveal
          on={stepIndex >= 1}
          delay={120}
          data-testid="i3-caption"
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
          {highlight("Click any tab to see how it works", ["any tab"])}
        </Reveal>
      </div>
    </>
  );
}

export const i3Slide: SlideDef = {
  steps: 2,
  canonicalPose: 1,
  animationMode: "step-reveal",
  surface: "dark",
  section: "I",
  render: () => <I3Portfolio />,
};
