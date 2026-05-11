// B.1 — THE AI EVOLUTION JOURNEY
//
// Compresses 75 years of AI history into ONE motion-vignette. Horizontal
// timeline across 6 era nodes, each connected by a copper rail that extends
// stage-by-stage. The "WE ARE HERE" marker pulses below stage 5 once the
// audience reaches the present. Stage 6 (AGI) is rendered dimmed + dashed
// to honestly frame the forecast — never accidentally read as "done".
//
// Step map (load animation is mount-driven; stepIndex 0 = first Space press):
//   load (on mount):  FIG label + bare timeline container fade in
//   stepIndex 0:      Node 1 (RULE-BASED) + rail draws to node 1
//   stepIndex 1:      Node 2 (STATISTICAL) + rail extends to node 2
//   stepIndex 2:      Node 3 (DEEP LEARNING) + rail extends to node 3
//   stepIndex 3:      Node 4 (LLM) + rail extends to node 4
//   stepIndex 4:      Node 5 (AGENTIC) + rail extends to node 5
//                     + WE ARE HERE marker (4s ambient pulse)
//   stepIndex 5 (canonical): Node 6 (AGI) dimmed/dashed + dashed rail tail
//
// Stage geometry: 1280×720. FIG band top 88px, nav reserves ~80px at bottom.
// Timeline sits at vertical mid-content (~y=360-ish baseline).
import { useEffect, useState, type ReactNode } from "react";
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { highlight } from "@/components/highlight";
import { EraNode } from "./components/EraNode";
import { TimelineRail } from "./components/TimelineRail";
import { WeAreHereMarker } from "./components/WeAreHereMarker";
import { b1Content as C } from "./content";

// ─── Stage geometry ───
// Total horizontal span of node centers — ~80% of stage width, but pulled
// in enough that the leftmost/rightmost EraNode caption boxes (168px wide
// each) sit fully inside the 1280px stage.
const RAIL_LEFT = 110;
const RAIL_RIGHT = 1170;
const NODE_COUNT = 6;
// 6 nodes evenly spaced. Spacing in px between adjacent node centers.
const NODE_SPACING = (RAIL_RIGHT - RAIL_LEFT) / (NODE_COUNT - 1); // 212
const NODE_CENTERS = Array.from({ length: NODE_COUNT }, (_, i) => RAIL_LEFT + i * NODE_SPACING);
// Timeline center vertical baseline. Tuned to leave room for label-above and
// year+caption-below on a 720px stage (FIG band ~88px; nav band ~64px).
//
// Vertical stack from each node wrapper's top edge:
//   label band (~32px incl. spacing) → circle (64px) → year (~22px) → caption
// We want the rail line to intersect the circle's vertical center, so the
// wrapper sits 32 + (NODE_DIAMETER / 2) above RAIL_Y.
const RAIL_Y = 332;
// label band 30px + margin-top 6 = 36px from wrapper top to circle top.
// Circle is 64px (32px radius), so for circle center to sit on RAIL_Y:
//   NODE_TOP + 36 + 32 = RAIL_Y  →  NODE_TOP = RAIL_Y - 68
const NODE_TOP = RAIL_Y - 68; // 264
// WE ARE HERE marker sits below the caption block of node 5. Caption max
// height ≈ 64px (4 lines); year ~22px above caption. Place marker ~180px
// below the rail (~y=512).
const HERE_MARKER_TOP = RAIL_Y + 180;

// ───────────────────── slide ─────────────────────

export function B1EvolutionJourney() {
  const { stepIndex } = useDeck();

  // Mount-driven load: rail container fades in shortly after slide arrival.
  const [containerOn, setContainerOn] = useState(false);
  useEffect(() => {
    const t = window.setTimeout(() => setContainerOn(true), 150);
    return () => window.clearTimeout(t);
  }, []);

  // Step gates. stepIndex 0 = node 1; stepIndex 5 = node 6 (AGI).
  const nodeOn = (i: number) => stepIndex >= i;
  // Rail solid progress is the fraction of segments revealed (0..5 segments
  // between 6 nodes). At stepIndex 0 only node 1 is up, but no segment is
  // drawn yet; at stepIndex 1 node 2 + segment 1 are drawn; …; stepIndex 4
  // → segments 1–4 (all of solid rail). stepIndex 5 → dashed AGI tail.
  const solidSegments = Math.max(0, Math.min(4, stepIndex)); // 0..4 solid segments
  const railSolidLength = NODE_SPACING * 4; // node-1 → node-5
  const railProgress = solidSegments / 4; // 0..1
  const dashedTailOn = stepIndex >= 5;
  const hereOn = stepIndex >= 4;

  return (
    <div data-testid="slide-b1" style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      {/* Background — plain neutral-950 + subtle dot-grid texture. */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background: "var(--neutral-950)",
          zIndex: 0,
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.05,
          backgroundImage:
            "radial-gradient(rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          zIndex: 1,
        }}
      />

      <FigLabel section="B" num={1} label={C.figLabel} />

      {/* Timeline container — fades in on mount. Holds rail + nodes. */}
      <div
        data-testid="b1-stage"
        style={{
          position: "absolute",
          inset: 0,
          opacity: containerOn ? 1 : 0,
          transition: "opacity 400ms var(--ease)",
          zIndex: 5,
        }}
      >
        {/* The rail itself — solid segment up to node 5, dashed tail to node 6. */}
        <TimelineRail
          left={NODE_CENTERS[0]}
          top={RAIL_Y}
          length={railSolidLength}
          dashedTailLength={NODE_SPACING}
          progress={railProgress}
          dashedOn={dashedTailOn}
        />

        {/* Era nodes — anchored by center-x to NODE_CENTERS[i]. */}
        {C.eras.map((era, i) => {
          const cx = NODE_CENTERS[i];
          const isActive = era.hereMarker === true;
          const isDimmed = era.dimmed === true;
          return (
            <div
              key={era.key}
              style={{
                position: "absolute",
                left: cx,
                top: NODE_TOP,
                transform: "translateX(-50%)",
                width: 168,
              }}
            >
              <EraNode
                glyph={<EraGlyph eraKey={era.key} />}
                label={era.label}
                years={era.years}
                caption={highlight(era.caption, era.captionKw)}
                active={isActive}
                dimmed={isDimmed}
                on={nodeOn(i)}
              />
            </div>
          );
        })}

        {/* WE ARE HERE marker — anchored below node 5. Pulses 4s ambient. */}
        <div
          style={{
            position: "absolute",
            left: NODE_CENTERS[4],
            top: HERE_MARKER_TOP,
            transform: "translateX(-50%)",
          }}
        >
          <WeAreHereMarker on={hereOn} delay={200} />
        </div>
      </div>
    </div>
  );
}

// ───────────────────── EraGlyph — per-era SVG icon ─────────────────────
//
// Each era gets a signature glyph that hints at its mechanism. Drawn as
// 36×36 SVGs that inherit `color` (set by EraNode based on active/dimmed).
function EraGlyph({ eraKey }: { eraKey: string }): ReactNode {
  switch (eraKey) {
    case "rule-based":
      return <RuleBasedGlyph />;
    case "statistical":
      return <StatisticalGlyph />;
    case "deep-learning":
      return <DeepLearningGlyph />;
    case "llm":
      return <LLMGlyph />;
    case "agentic":
      return <AgenticGlyph />;
    case "agi":
      return <AGIGlyph />;
    default:
      return null;
  }
}

const GLYPH_SIZE = 32;
const glyphSvgProps = {
  width: GLYPH_SIZE,
  height: GLYPH_SIZE,
  viewBox: "0 0 32 32",
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

// IF→THEN flowchart (a labeled diamond stub).
function RuleBasedGlyph() {
  return (
    <svg {...glyphSvgProps} aria-hidden>
      <rect x="3" y="6" width="9" height="6" />
      <rect x="20" y="20" width="9" height="6" />
      <path d="M12 9 H16 V23 H20" />
      <circle cx="16" cy="9" r="0.6" fill="currentColor" />
      <circle cx="20" cy="23" r="0.6" fill="currentColor" />
    </svg>
  );
}

// Scatter dots + best-fit line (linear regression).
function StatisticalGlyph() {
  return (
    <svg {...glyphSvgProps} aria-hidden>
      <line x1="4" y1="28" x2="28" y2="6" opacity={0.55} />
      <circle cx="7" cy="22" r="1.1" fill="currentColor" />
      <circle cx="11" cy="19" r="1.1" fill="currentColor" />
      <circle cx="14" cy="14" r="1.1" fill="currentColor" />
      <circle cx="18" cy="13" r="1.1" fill="currentColor" />
      <circle cx="22" cy="9" r="1.1" fill="currentColor" />
      <circle cx="25" cy="8" r="1.1" fill="currentColor" />
    </svg>
  );
}

// Layered grid → eye (deep learning that perceives).
function DeepLearningGlyph() {
  return (
    <svg {...glyphSvgProps} aria-hidden>
      <circle cx="16" cy="16" r="9" />
      <circle cx="16" cy="16" r="3.2" fill="currentColor" />
      {/* Layer hints — small radial spokes */}
      <line x1="16" y1="4" x2="16" y2="7" opacity={0.55} />
      <line x1="16" y1="25" x2="16" y2="28" opacity={0.55} />
      <line x1="4" y1="16" x2="7" y2="16" opacity={0.55} />
      <line x1="25" y1="16" x2="28" y2="16" opacity={0.55} />
    </svg>
  );
}

// Chat bubble (LLMs / conversational).
function LLMGlyph() {
  return (
    <svg {...glyphSvgProps} aria-hidden>
      <path d="M4 8 H28 V22 H14 L8 28 V22 H4 Z" />
      <line x1="9" y1="14" x2="23" y2="14" opacity={0.6} />
      <line x1="9" y1="18" x2="20" y2="18" opacity={0.6} />
    </svg>
  );
}

// Orchestrated cluster — central hub + 3 satellites (agentic tools).
function AgenticGlyph() {
  return (
    <svg {...glyphSvgProps} aria-hidden>
      <circle cx="16" cy="16" r="3.5" fill="currentColor" />
      <circle cx="6" cy="8" r="2" />
      <circle cx="26" cy="9" r="2" />
      <circle cx="16" cy="27" r="2" />
      <line x1="8" y1="9" x2="14" y2="14" />
      <line x1="24" y1="11" x2="18" y2="14" />
      <line x1="16" y1="25" x2="16" y2="20" />
    </svg>
  );
}

// AGI — dashed humanoid silhouette (not-yet figure).
function AGIGlyph() {
  return (
    <svg {...glyphSvgProps} aria-hidden strokeDasharray="3 2" opacity={0.85}>
      <circle cx="16" cy="9" r="3.5" />
      <path d="M9 28 V20 Q9 14 16 14 Q23 14 23 20 V28" />
    </svg>
  );
}

// ───────────────────── slide def ─────────────────────

export const b1Slide: SlideDef = {
  // 6 stepIndex values (0..5): one per era reveal.
  // Load animation (timeline-container fade) is mount-driven, not a Space step.
  steps: 6,
  canonicalPose: 5,
  animationMode: "step-reveal",
  surface: "dark",
  section: "B",
  render: () => <B1EvolutionJourney />,
};
