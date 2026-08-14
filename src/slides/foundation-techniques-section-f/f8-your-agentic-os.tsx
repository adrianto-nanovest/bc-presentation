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
// THE COPY ON THIS SLIDE VARIES WITH THE DECK SET IN TWO PLACES, both resolved by
// ./content and neither by a ternary here:
//   · the tagline that reveals at step 1 (#54) — `f8CloserFor`
//   · the figure label and the headline (owner call, 2026-08-14) — `f8HeaderFor`
// Read the decisions there. Both exist for one reason: the standard decks run this
// as F.8 in front of people who will build it, the leader decks run it at C.2 in
// front of someone who will fund it.
//
// Click-to-advance is blocked inside the bezel via data-no-advance on
// the monitor wrapper (see Slide.tsx click handler).
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { VARIANT } from "@/variant";
import { FigLabel } from "@/components/FigLabel";
import { HintIcon } from "@/components/HintIcon";
import { highlight } from "@/components/highlight";
import { AgenticOSMonitor } from "./components/AgenticOSMonitor";
import { Reveal } from "./components/Reveal";
// `f8Content` is not imported here any more: the header was its last reader on this
// slide, and the monitor's own copy goes straight to <AgenticOSMonitor />.
import { f8CloserFor, f8HeaderFor } from "./content";

export function F8YourAgenticOs() {
  const { stepIndex } = useDeck();

  // The closer follows the AUDIENCE: the standard decks run this slide as F.8 and
  // close section F on portability, the leader decks run it at C.2 in front of a
  // sponsor (§4.5, #54). Resolved by the content module's own pick, off
  // `VARIANT.deckSet` and NOT off a `letterOf` lookup — the letter this slide
  // prints is derived from its composed position (§3) and reads `C` on one deck
  // and `F` on the other, but the letter is an output of composition, not the
  // thing the line depends on. Read inside the component like the section-E
  // bridge's beat 2 does, since the component is the only consumer; `VARIANT`
  // itself resolves at module scope, so one module epoch holds one deck set.
  const closer = f8CloserFor(VARIANT.deckSet);
  // The header follows the same audience the closer does, and off the same field.
  // The LETTER in front of the label is still not ours: `FigLabel` derives `C.2` /
  // `F.8` from the composed position (§3.5), and only the label text is picked here.
  const header = f8HeaderFor(VARIANT.deckSet);

  return (
    <>
      <FigLabel label={header.figLabel} />

      <div className="slide-headline-row">
        <h1
          data-testid="f8-headline"
          className="slide-headline small"
          style={{ textAlign: "left", margin: 0 }}
        >
          {highlight(header.headline, header.headlineKw)}
        </h1>
      </div>

      <div
        data-testid="f8-hint"
        style={{
          position: "absolute",
          top: 30,
          right: 48,
          zIndex: 50,
        }}
      >
        <HintIcon
          position="left"
          text="Click to swap models and switch panels on left rail, scroll inside any view."
        />
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
          {highlight(closer.tagline, closer.taglineKw)}
        </Reveal>
      </div>
    </>
  );
}

export const f8Slide: SlideDef = {
  id: "f8-your-agentic-os",
  steps: 2,
  canonicalPose: 1,
  animationMode: "step-reveal",
  surface: "dark",
  sectionKey: "techniques",
  render: () => <F8YourAgenticOs />,
};
