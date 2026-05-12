// B.1 — THE AI EVOLUTION JOURNEY
//
// Compresses 75 years of AI history into ONE motion-vignette. A single
// horizontal rail crosses the stage with 6 evenly-spaced circle nodes; era
// label-boxes alternate ABOVE/BELOW the rail and are joined to their circle
// by a short vertical connector. The "WE ARE HERE" marker bobs below era-5.
// Era-6 (AGI) renders dashed + dimmed to honestly signal "not yet".
//
// Step map (the load animation is mount-driven — every era + the full rail
// fade in simultaneously with a left-to-right stagger, every era except
// era-1 starting at dimmed opacity):
//   load (on mount):  rail + 6 circles + 6 label boxes + dashed tail
//                     reveal in stagger; only era-1 is "lit"; eras 2-6 stay
//                     dimmed at opacity 0.22 until their step.
//   stepIndex 0:      era-1 already lit (load state).
//   stepIndex 1:      era-2 brightens + rail segment 1→2 brightens.
//   stepIndex 2:      era-3 brightens + segment 2→3.
//   stepIndex 3:      era-4 brightens + segment 3→4.
//   stepIndex 4:      era-5 brightens + segment 4→5 + WE ARE HERE marker.
//   stepIndex 5:      era-6 (AGI) brightens with dashed border + dashed tail.
//   stepIndex 6 (canonical): footer caption fades in.
//
// Hover (presenter detail layer, available once an era is revealed):
//   Hovering a circle OR its label-box highlights both, and slides a
//   full-width popover (3-column grid) up from the bottom. Mouse-leave
//   clears the popover; the slot is always-mounted so layout never jumps.
import { useEffect, useMemo, useState, type ReactNode } from "react";
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { highlight as KW } from "@/components/highlight";
import { Reveal } from "@/slides/foundation-core-section-e/components/Reveal";
import { EraNode } from "./components/EraNode";
import { TimelineRail } from "./components/TimelineRail";
import { WeAreHereMarker } from "./components/WeAreHereMarker";
import { B1HoverPopover } from "./components/B1HoverPopover";
import { b1Content as C, type B1EraKey } from "./content";

// ─── Stage geometry ───
// Rail spans most of the stage width; pulled in to keep the wider (~210px)
// label boxes fully inside the 1280px stage at the leftmost/rightmost nodes.
const RAIL_LEFT = 165;
const RAIL_RIGHT = 1115;
const NODE_COUNT = 6;
const NODE_SPACING = (RAIL_RIGHT - RAIL_LEFT) / (NODE_COUNT - 1); // 190
const NODE_CENTERS = Array.from({ length: NODE_COUNT }, (_, i) => RAIL_LEFT + i * NODE_SPACING);
// Rail vertical baseline. With 2-line label boxes (~50px tall) the
// below-row bottom edge sits at RAIL_Y + CIRCLE_RADIUS + CONNECTOR_LENGTH +
// 50 ≈ 432, which clears the popover slot (bottom:90, height:110 → top
// edge ≈ y=520). The above-row top edge sits at RAIL_Y − CIRCLE_RADIUS −
// CONNECTOR_LENGTH − 50 ≈ 208, which clears the headline row (top:80,
// height ~50 → bottom ~150).
const RAIL_Y = 320;
const CIRCLE_RADIUS = 34;
const CONNECTOR_LENGTH = 28; // short stub between circle edge and label box
const LABEL_BOX_WIDTH = 210;

// ───────────────────── slide ─────────────────────

export function B1EvolutionJourney() {
  const { stepIndex } = useDeck();

  // Mount-driven load: container fades in, then per-era stagger fires.
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = window.setTimeout(() => setLoaded(true), 120);
    return () => window.clearTimeout(t);
  }, []);

  // Hover state — era key (or null). Drives both per-era highlight ring AND
  // the bottom popover slot.
  const [hoveredKey, setHoveredKey] = useState<B1EraKey | null>(null);

  // Reveal gates.
  // - eraOn[i]: era i has finished loading (true after mount stagger fires).
  //   We treat this as "rendered at all"; the dim/bright split is done via
  //   `eraBright[i]`.
  // - eraBright[i]: era is at full brightness (not dimmed). Step 0 lights
  //   era-1; step k lights era (k+1); era-6 lights at step 5.
  // - hereOn: WE ARE HERE marker is visible (step 4+).
  // - dashedTailOn: AGI dashed tail visible (step 5+).
  // - showFooter: footer caption visible (step 6 — canonical pose).
  const eraBright = useMemo(
    () => Array.from({ length: NODE_COUNT }, (_, i) => stepIndex >= i),
    [stepIndex],
  );
  const hereOn = stepIndex >= 4;
  const dashedTailOn = stepIndex >= 5;
  const showFooter = stepIndex >= 6;

  // Rail solid progress: fraction of segments revealed. Segment i runs from
  // node-i to node-(i+1). Segment 0 (node-1 → node-2) lights at step 1; …
  // segment 3 (node-4 → node-5) lights at step 4. So solid segments count
  // = clamp(stepIndex, 0, 4).
  const solidSegments = Math.max(0, Math.min(4, stepIndex));
  const railProgress = solidSegments / 4;
  const railSolidLength = NODE_SPACING * 4; // node-1 → node-5

  // Resolve hovered era data for the popover.
  const hoveredEra = hoveredKey
    ? C.eras.find((e) => e.key === hoveredKey) ?? null
    : null;

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

      <div className="slide-headline-row">
        <h1 className="slide-headline small">
          {KW(C.slideTitle, C.slideTitleKw)}
        </h1>
      </div>

      {/* Timeline stage — fades in on mount. Holds rail + nodes + label boxes. */}
      <div
        data-testid="b1-stage"
        style={{
          position: "absolute",
          inset: 0,
          opacity: loaded ? 1 : 0,
          transition: "opacity 400ms var(--ease)",
          zIndex: 5,
        }}
      >
        {/* The rail — dim base + bright segment that grows with `progress` +
            dashed AGI tail. */}
        <TimelineRail
          left={NODE_CENTERS[0]}
          top={RAIL_Y}
          length={railSolidLength}
          dashedTailLength={NODE_SPACING}
          progress={railProgress}
          dashedOn={dashedTailOn}
        />

        {/* Era markers — circle + connector + label box. Position alternates. */}
        {C.eras.map((era, i) => {
          const cx = NODE_CENTERS[i];
          const isAgi = era.dimmed === true;
          const isActive = era.hereMarker === true && hereOn;
          const bright = eraBright[i] ?? false;
          // Pre-reveal dim OR AGI dim (until step 5) OR AGI always-soft fill.
          const dimmed = !bright;
          const highlighted = hoveredKey === era.key && bright;
          // Stagger delay for the mount-driven load. 80ms per node.
          const loadDelay = 200 + i * 80;
          const above = era.position === "above";

          return (
            <EraGroup
              key={era.key}
              centerX={cx}
              railY={RAIL_Y}
              above={above}
              loaded={loaded}
              loadDelay={loadDelay}
              bright={bright}
              isAgi={isAgi}
              highlighted={highlighted}
              circle={
                <EraNode
                  glyph={<EraGlyph eraKey={era.key} />}
                  active={isActive}
                  highlighted={highlighted}
                  dimmed={dimmed}
                  isAgi={isAgi}
                  on={loaded}
                  delay={loadDelay}
                  onMouseEnter={bright ? () => setHoveredKey(era.key) : undefined}
                  onMouseLeave={
                    bright
                      ? () =>
                          setHoveredKey((prev) => (prev === era.key ? null : prev))
                      : undefined
                  }
                />
              }
              labelBox={
                <LabelBox
                  label={era.shortLabel ?? era.label}
                  years={era.years}
                  dimmed={dimmed}
                  isAgi={isAgi}
                  highlighted={highlighted}
                  onMouseEnter={bright ? () => setHoveredKey(era.key) : undefined}
                  onMouseLeave={
                    bright
                      ? () =>
                          setHoveredKey((prev) => (prev === era.key ? null : prev))
                      : undefined
                  }
                />
              }
            />
          );
        })}

        {/* WE ARE HERE marker — sits BELOW era-5 (era-5's label box is above
            the rail, so the marker fills the empty space below pointing up). */}
        <div
          style={{
            position: "absolute",
            left: NODE_CENTERS[4],
            top: RAIL_Y + CIRCLE_RADIUS + 18,
            transform: "translateX(-50%)",
            zIndex: 6,
          }}
        >
          <WeAreHereMarker on={hereOn} delay={150} />
        </div>
      </div>

      {/* Hover popover slot — always mounted so layout never jumps. */}
      <div
        data-testid="b1-popover-slot"
        style={{
          position: "absolute",
          left: 48,
          right: 48,
          bottom: 90,
          height: 110,
          pointerEvents: "none",
          zIndex: 30,
        }}
      >
        <B1HoverPopover
          era={
            hoveredEra
              ? {
                  label: hoveredEra.label,
                  title: titleForEra(hoveredEra.key),
                  years: hoveredEra.years,
                  caption: KW(hoveredEra.caption, hoveredEra.captionKw),
                  signatureArtifact: hoveredEra.signatureArtifact,
                  realWorldEquivalent: hoveredEra.realWorldEquivalent,
                  dim: hoveredEra.dimmed === true,
                }
              : null
          }
        />
      </div>

      {/* Footer caption — fades in at canonical pose. */}
      <Reveal
        on={showFooter}
        data-testid="b1-footer"
        style={{
          position: "absolute",
          left: 48,
          right: 48,
          bottom: 50,
          zIndex: 7,
        }}
      >
        <p
          style={{
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontSize: 14,
            color: "var(--neutral-400)",
            margin: 0,
            lineHeight: 1.4,
          }}
        >
          {KW(C.footerCaption, C.footerCaptionKw)}
        </p>
      </Reveal>
    </div>
  );
}

// ───────────────────── EraGroup — circle + connector + label box ─────────────

interface EraGroupProps {
  centerX: number;
  railY: number;
  above: boolean;
  loaded: boolean;
  loadDelay: number;
  bright: boolean;
  isAgi: boolean;
  highlighted: boolean;
  circle: ReactNode;
  labelBox: ReactNode;
}

function EraGroup({
  centerX,
  railY,
  above,
  loaded,
  loadDelay,
  bright,
  isAgi,
  highlighted,
  circle,
  labelBox,
}: EraGroupProps) {
  // Connector line geometry — short vertical stub from circle edge to label
  // box. Same length on both sides; label box sits CONNECTOR_LENGTH px past
  // the circle edge (so total offset from rail center = CIRCLE_RADIUS +
  // CONNECTOR_LENGTH).
  const connectorTop = above
    ? railY - CIRCLE_RADIUS - CONNECTOR_LENGTH
    : railY + CIRCLE_RADIUS;

  // Label box sits flush with the connector's far end.
  const labelBoxTop = above
    ? railY - CIRCLE_RADIUS - CONNECTOR_LENGTH
    : railY + CIRCLE_RADIUS + CONNECTOR_LENGTH;

  // Group dim/highlight state. AGI gets slight extra dim on the label box even
  // when bright — applied inside LabelBox.
  const dimmed = !bright;
  const opacityVisible = loaded ? 1 : 0;
  // Connector stroke colour follows the same brightness rule as the circle:
  // dim copper-700 when un-revealed, copper-300 (or 700 for AGI) when bright,
  // copper-200 when highlighted.
  const connectorStroke = highlighted
    ? "var(--copper-200)"
    : dimmed
      ? "var(--copper-700)"
      : isAgi
        ? "var(--copper-700)"
        : "var(--copper-400)";
  const connectorOpacity = dimmed ? 0.5 : 1;

  return (
    <>
      {/* Circle — centered on (centerX, railY) */}
      <div
        style={{
          position: "absolute",
          left: centerX,
          top: railY,
          transform: "translate(-50%, -50%)",
          zIndex: 4,
        }}
      >
        {circle}
      </div>

      {/* Vertical connector stub */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: centerX,
          top: connectorTop,
          width: 1,
          height: CONNECTOR_LENGTH,
          transform: "translateX(-50%)",
          background: connectorStroke,
          opacity: loaded ? connectorOpacity : 0,
          transition:
            "opacity 500ms var(--ease), background 320ms var(--ease)",
          transitionDelay: `${loadDelay}ms`,
          zIndex: 3,
        }}
      />

      {/* Label box — alternating above/below */}
      <div
        style={{
          position: "absolute",
          left: centerX,
          top: above ? undefined : labelBoxTop,
          bottom: above ? 720 - labelBoxTop : undefined,
          transform: "translateX(-50%)",
          width: LABEL_BOX_WIDTH,
          opacity: opacityVisible,
          transition: "opacity 400ms var(--ease)",
          transitionDelay: `${loadDelay}ms`,
          zIndex: 4,
        }}
      >
        {labelBox}
      </div>
    </>
  );
}

// ───────────────────── LabelBox — strict 2-line era label + year ───────────
// Line 1: era label (mono caps 11px copper-300, single line, never wraps)
// Line 2: year range (mono 10px neutral-400)
// The full plain-language caption lives in the hover popover, not here.

interface LabelBoxProps {
  label: string;
  years: string;
  dimmed: boolean;
  isAgi: boolean;
  highlighted: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

function LabelBox({
  label,
  years,
  dimmed,
  isAgi,
  highlighted,
  onMouseEnter,
  onMouseLeave,
}: LabelBoxProps) {
  const baseBorder = "var(--copper-700)";
  const border = highlighted ? "var(--copper-200)" : baseBorder;
  // AGI label box stays slightly dimmer than other revealed boxes even at
  // full brightness — honest "not yet" framing.
  const opacity = dimmed ? 0.22 : isAgi ? 0.85 : 1;
  const shadow = highlighted
    ? "0 0 0 1px var(--copper-200), 0 0 18px -6px var(--copper-400)"
    : "none";

  return (
    <div
      data-testid="b1-label-box"
      data-dimmed={dimmed ? "1" : "0"}
      data-highlighted={highlighted ? "1" : "0"}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        border: `1px solid ${border}`,
        background: "rgba(10,10,10,0.7)",
        padding: "8px 12px",
        boxShadow: shadow,
        opacity,
        transition:
          "opacity 500ms var(--ease), border-color 220ms var(--ease), box-shadow 220ms var(--ease)",
        display: "flex",
        flexDirection: "column",
        gap: 3,
        cursor: onMouseEnter ? "default" : undefined,
      }}
    >
      <span
        style={{
          fontFamily: "var(--mono)",
          fontSize: 11,
          letterSpacing: "0.18em",
          color: "var(--copper-300)",
          textTransform: "uppercase",
          lineHeight: 1.2,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: "var(--mono)",
          fontSize: 10,
          letterSpacing: "0.14em",
          color: "var(--neutral-400)",
          textTransform: "uppercase",
          lineHeight: 1.2,
        }}
      >
        {years}
      </span>
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

// ───────────────────── popover title helper ─────────────────────
// Slightly more readable than the all-caps era label for the popover's
// display heading. Keeps a single source of truth here so content.ts stays
// strict (label = mono-caps form only).
function titleForEra(key: B1EraKey): string {
  switch (key) {
    case "rule-based":
      return "Rule-Based Systems";
    case "statistical":
      return "Statistical Learning";
    case "deep-learning":
      return "Deep Learning & Perception";
    case "llm":
      return "Large Language Models";
    case "agentic":
      return "Agentic Reasoning";
    case "agi":
      return "Artificial General Intelligence";
  }
}

// ───────────────────── slide def ─────────────────────

export const b1Slide: SlideDef = {
  // 7 stepIndex slots (0..6): one per era reveal (6) + footer caption.
  // Load animation (rail + dimmed lattice) is mount-driven, not a Space step.
  steps: 7,
  canonicalPose: 6,
  animationMode: "step-reveal",
  surface: "dark",
  section: "B",
  render: () => <B1EvolutionJourney />,
};
