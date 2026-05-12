// G.9 — THE WORKFLOW
//
// Spec §2.G.9. The seven-stage end-to-end recipe shown as a horizontal
// pipeline with a continuous flow particle. Each stage card carries an
// AnimatedGlyph that loops on its own; the WorkflowPipeline component drives
// the per-stage `active` pulse as the particle traverses left → right.
//
// 3 reveal steps:
//   0 — All 7 stage cards stagger in (delay 120 + i*80); subhead reveals;
//       pipeline particle starts immediately
//   1 — "Keep orchestrator LEAN" maxim band fades in (rule animates 0→40%)
//   2 — Footer line beneath the maxim reveals
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { highlight } from "@/components/highlight";
import type { GlyphKind } from "@/components/AnimatedGlyph";
import { Reveal } from "./components/Reveal";
import { WorkflowPipeline, type StageDef } from "./components/WorkflowPipeline";
import { g9Content as C } from "./content";

// ─────────────────────────────────────────────────────────────────────────────

export function G9Workflow() {
  const { stepIndex } = useDeck();

  const showMaxim = stepIndex >= 1;
  const showFooter = stepIndex >= 2;

  // Adapt content stages → StageDef (preserves readonly typing).
  const stages: StageDef[] = C.stages.map((s) => ({
    num: s.num,
    name: s.name,
    purpose: s.purpose,
    tools: s.tools,
    glyphKind: s.glyphKind as GlyphKind,
  }));

  return (
    <>
      <FigLabel section="G" num={9} label="THE WORKFLOW" />

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

      {/* Subhead — mono 11px copper-400, uppercase */}
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

      {/* Pipeline + maxim band — wrapped in data-no-advance */}
      <div data-no-advance>
        {/* Pipeline region */}
        <div
          style={{
            position: "absolute",
            left: 48,
            right: 48,
            top: 156,
            bottom: 160,
            display: "flex",
            alignItems: "stretch",
            justifyContent: "center",
          }}
        >
          {/* Stagger the cards by wrapping each in Reveal — but the pipeline
              itself owns the layout. Simplest: put the WorkflowPipeline inside
              a single Reveal for entry, then let stage-level Reveals stagger. */}
          <PipelineWithStagger stages={stages} />
        </div>

        {/* Maxim band — 80px tall, sits above the bottom:80 inset */}
        <div
          style={{
            position: "absolute",
            left: 48,
            right: 48,
            bottom: 80,
            height: 80,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
          }}
        >
          {/* Copper rule — animates 0 → 40% width on step 1 */}
          <div
            style={{
              height: 1,
              background: "var(--copper-300)",
              width: showMaxim ? "40%" : "0%",
              opacity: showMaxim ? 1 : 0,
              transition:
                "width 600ms var(--ease), opacity 600ms var(--ease)",
              transitionDelay: showMaxim ? "0ms" : "0ms",
            }}
          />

          <Reveal
            on={showMaxim}
            delay={120}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 6,
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontFamily: "var(--mono)",
                fontSize: 11,
                letterSpacing: "0.22em",
                color: "var(--copper-200)",
                textTransform: "uppercase",
              }}
            >
              {C.maxim.label}
            </div>
            <div
              style={{
                fontFamily: "var(--serif)",
                fontStyle: "italic",
                fontSize: 14,
                color: "var(--neutral-300)",
                lineHeight: 1.3,
              }}
            >
              {C.maxim.caption}
            </div>
          </Reveal>
        </div>
      </div>

      {/* Footer line — step 2 reveal, italic display 18px copper-200 */}
      <Reveal
        on={showFooter}
        delay={120}
        style={{
          position: "absolute",
          bottom: 36,
          left: 48,
          right: 48,
          textAlign: "center",
          fontFamily: "var(--display)",
          fontStyle: "italic",
          fontSize: 18,
          color: "var(--copper-200)",
          lineHeight: 1.3,
        }}
      >
        {highlight(C.footer, [...C.footerKw])}
      </Reveal>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PipelineWithStagger
//
// Wraps each stage in its own <Reveal> so the 7 cards stagger in on entry
// while the pipeline still owns the flow-particle loop and active-state
// orchestration. We render the WorkflowPipeline once and overlay per-stage
// reveal opacity via a sibling-ordered fade.
// ─────────────────────────────────────────────────────────────────────────────

function PipelineWithStagger({ stages }: { stages: StageDef[] }) {
  // Per-stage stagger: we wrap the entire pipeline in an outer container that
  // applies per-stage opacity transitions. Easiest: wrap each stage card in a
  // Reveal — but WorkflowPipeline renders its own layout. Two options:
  //   (a) Add stagger inside WorkflowPipeline (couples concerns).
  //   (b) Apply a CSS keyframe stagger to immediate children at this level.
  //
  // We pick (b) so WorkflowPipeline stays focused on the flow loop. The
  // stage cards are first-level grid children; we use nth-child timing to
  // stagger their fade-in.
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
      }}
    >
      <style>{`
        .g9-stagger > div > div:first-child > * {
          /* Stagger the 7 stage cards. Selector targets:
             .g9-stagger → WorkflowPipeline root → first child (cards row) → each card */
          opacity: 0;
          animation: g9-card-in 360ms var(--ease) forwards;
        }
        .g9-stagger > div > div:first-child > *:nth-child(1) { animation-delay: 120ms; }
        .g9-stagger > div > div:first-child > *:nth-child(2) { animation-delay: 200ms; }
        .g9-stagger > div > div:first-child > *:nth-child(3) { animation-delay: 280ms; }
        .g9-stagger > div > div:first-child > *:nth-child(4) { animation-delay: 360ms; }
        .g9-stagger > div > div:first-child > *:nth-child(5) { animation-delay: 440ms; }
        .g9-stagger > div > div:first-child > *:nth-child(6) { animation-delay: 520ms; }
        .g9-stagger > div > div:first-child > *:nth-child(7) { animation-delay: 600ms; }
        @keyframes g9-card-in {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <div className="g9-stagger" style={{ width: "100%", height: "100%" }}>
        <WorkflowPipeline stages={stages} />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

export const g9Slide: SlideDef = {
  steps: 3,
  canonicalPose: 2,
  animationMode: "step-reveal",
  surface: "dark",
  section: "G",
  render: () => <G9Workflow />,
};
