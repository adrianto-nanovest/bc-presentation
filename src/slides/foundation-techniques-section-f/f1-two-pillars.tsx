// F.1 — TWO PILLARS (Section F opener)
//
// Section opener · split-stage map (knowledge × capability). Both flagship
// visuals (bridge-artifact + layer-cake) are previewed *dim*, side-by-side,
// without committing to either. Audience leaves F.1 knowing the section's
// shape: what AI knows × what AI does.
//
// Layout — centered title block above two equal-width visual panels on the
// 1280×720 stage. Title bar sits in the upper third; pillars occupy the
// middle band; faint connecting ◯←→◯ animates between them on step 3.
//
// 4 reveal steps (spec §4.3):
//   0 — title + subtitle visible; both pillars present at low opacity (0.15)
//   1 — LEFT pillar (KNOWLEDGE) brightens (→ 0.4); copper underline animates
//       on label; tagline fades in
//   2 — RIGHT pillar (CAPABILITY) brightens; copper underline; tagline fades
//   3 — Faint copper connecting lines (◯←→◯) animate between pillar centers
//
// Hover behavior (spec §4.4) — CSS-only tooltips on each pillar:
//   LEFT  → "F.2 · grounding"
//   RIGHT → "F.3 – F.7 · the package"
import type { CSSProperties } from "react";
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { highlight } from "@/components/highlight";
import { BridgeArtifact } from "./components/BridgeArtifact";
import { LayerCake } from "./components/LayerCake";
import { Reveal, CopperRule } from "./components/Reveal";
import { f1Content as C } from "./content";

// Stage-anchored geometry. All values resolved against the 1280×720 stage.
const STAGE_W = 1280;
const PILLAR_W = 480;
const PILLAR_H = 360;
const PILLAR_TOP = 296;
const PILLAR_GAP = 80; // gap between pillars where the ◯←→◯ connector sits
const PILLAR_LEFT = (STAGE_W - PILLAR_W * 2 - PILLAR_GAP) / 2; // 120
const PILLAR_RIGHT_LEFT = PILLAR_LEFT + PILLAR_W + PILLAR_GAP; // 680

// ───────────────────── slide ─────────────────────

export function F1TwoPillars() {
  const { stepIndex } = useDeck();

  // Per-pillar brightness driven by step: 0.15 dim → 0.4 lit.
  const leftLit = stepIndex >= 1;
  const rightLit = stepIndex >= 2;
  const showConnector = stepIndex >= 3;

  return (
    <>
      <FigLabel section="F" num={1} label="TWO PILLARS" />

      {/* ───────────── Title block (centered, upper third) ───────────── */}
      <div
        data-testid="f1-title-block"
        style={{
          position: "absolute",
          top: 116,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 14,
        }}
      >
        <Reveal on data-testid="f1-headline">
          <h1
            style={{
              fontFamily: "var(--display)",
              fontSize: 64,
              color: "var(--neutral-50)",
              margin: 0,
              lineHeight: 1,
              letterSpacing: "-0.01em",
              textAlign: "center",
            }}
          >
            {highlight(C.headline, C.headlineKw)}
          </h1>
        </Reveal>

        <div style={{ width: "40%", display: "flex", justifyContent: "center" }}>
          <CopperRule on delay={200} width="100%" />
        </div>

        <Reveal on delay={350} data-testid="f1-subtitle">
          <p
            style={{
              fontFamily: "var(--serif)",
              fontStyle: "italic",
              fontSize: 22,
              color: "var(--copper-200)",
              margin: 0,
              textAlign: "center",
              lineHeight: 1.2,
            }}
          >
            {highlight(C.subtitle, C.subtitleKw)}
          </p>
        </Reveal>
      </div>

      {/* ───────────── Connector ◯←→◯ (step 3 only) ─────────────
          Sits centered between the two pillars, vertically aligned with
          the illustration band. Two small circles + a horizontal line. */}
      <Connector
        on={showConnector}
        leftX={PILLAR_LEFT + PILLAR_W}
        rightX={PILLAR_RIGHT_LEFT}
        y={PILLAR_TOP + PILLAR_H / 2}
      />

      {/* ───────────── LEFT pillar — KNOWLEDGE ───────────── */}
      <Pillar
        side="left"
        lit={leftLit}
        left={PILLAR_LEFT}
        top={PILLAR_TOP}
        width={PILLAR_W}
        height={PILLAR_H}
        label={C.pillars[0].label}
        tagline={C.pillars[0].tagline}
        taglineKw={C.pillars[0].taglineKw}
        tooltip={C.pillars[0].tooltip}
        testId="f1-pillar-knowledge"
      >
        <BridgeArtifact mode="default" dim size={420} />
      </Pillar>

      {/* ───────────── RIGHT pillar — CAPABILITY ───────────── */}
      <Pillar
        side="right"
        lit={rightLit}
        left={PILLAR_RIGHT_LEFT}
        top={PILLAR_TOP}
        width={PILLAR_W}
        height={PILLAR_H}
        label={C.pillars[1].label}
        tagline={C.pillars[1].tagline}
        taglineKw={C.pillars[1].taglineKw}
        tooltip={C.pillars[1].tooltip}
        testId="f1-pillar-capability"
      >
        <LayerCake mode="compact" lit={[]} dim />
      </Pillar>
    </>
  );
}

// ───────────────────── Pillar ─────────────────────

interface PillarProps {
  side: "left" | "right";
  lit: boolean;
  left: number;
  top: number;
  width: number;
  height: number;
  label: string;
  tagline: string;
  taglineKw: readonly string[];
  tooltip: string;
  testId: string;
  children: React.ReactNode;
}

function Pillar({
  side,
  lit,
  left,
  top,
  width,
  height,
  label,
  tagline,
  taglineKw,
  tooltip,
  testId,
  children,
}: PillarProps) {
  // Whole-pillar dim → lit transition driven by stepIndex.
  // 0.15 = mute dim (both pillars at step 0)
  // 0.4  = lit teaser (after step 1/2 — still NOT full brightness; F.1 keeps
  //         both flagship visuals previewed, not committed)
  const pillarOpacity = lit ? 0.4 : 0.15;

  // Tooltip anchor — outside (above-outer for each side so it never overlaps
  // the connector zone). LEFT pillar → tooltip top-left corner. RIGHT pillar
  // → tooltip top-right corner.
  const tooltipStyle: CSSProperties = {
    position: "absolute",
    top: -38,
    [side === "left" ? "left" : "right"]: 0,
    padding: "5px 10px",
    fontFamily: "var(--mono)",
    fontSize: 11,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: "var(--copper-200)",
    background: "var(--neutral-900)",
    border: "1px solid var(--copper-800)",
    borderRadius: 2,
    opacity: 0,
    transition: "opacity 220ms var(--ease)",
    pointerEvents: "none",
    whiteSpace: "nowrap",
    zIndex: 10,
  } as CSSProperties;

  return (
    <div
      data-testid={testId}
      data-lit={lit ? "1" : "0"}
      className="f1-pillar"
      style={{
        position: "absolute",
        left,
        top,
        width,
        height,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 14,
      }}
    >
      {/* Tooltip (CSS-only — fades in on group :hover via inline class). */}
      <span data-testid={`${testId}-tooltip`} className="f1-pillar-tooltip" style={tooltipStyle}>
        {tooltip}
      </span>

      {/* Label + copper underline (the underline animates when the pillar
          becomes lit — same step-driven trigger as the brightness). */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
        }}
      >
        <span
          style={{
            fontFamily: "var(--mono)",
            fontSize: 13,
            letterSpacing: "0.28em",
            color: lit ? "var(--copper-200)" : "var(--neutral-400)",
            textTransform: "uppercase",
            transition: "color 320ms var(--ease)",
          }}
        >
          {label}
        </span>
        <CopperRule on={lit} width={56} />
      </div>

      {/* Dim illustration zone — wrapped in opacity-controlled box so the
          step-driven transition is on the whole illustration as a unit. */}
      <div
        data-testid={`${testId}-art`}
        style={{
          flex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: pillarOpacity,
          transition: "opacity 520ms var(--ease)",
        }}
      >
        {children}
      </div>

      {/* Italic tagline — fades in only once the pillar is lit. */}
      <Reveal on={lit} delay={150} data-testid={`${testId}-tagline`}>
        <p
          style={{
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontSize: 18,
            color: "var(--copper-200)",
            margin: 0,
            textAlign: "center",
            lineHeight: 1.2,
          }}
        >
          {highlight(tagline, taglineKw)}
        </p>
      </Reveal>

      {/* CSS-only hover tooltip — scoped to this component. The class
          `.f1-pillar` enables `:hover .f1-pillar-tooltip { opacity: 1 }`. */}
      <style>{`
        .f1-pillar:hover .f1-pillar-tooltip { opacity: 1; }
      `}</style>
    </div>
  );
}

// ───────────────────── Connector ◯←→◯ ─────────────────────

interface ConnectorProps {
  on: boolean;
  leftX: number;
  rightX: number;
  y: number;
}

function Connector({ on, leftX, rightX, y }: ConnectorProps) {
  // Two faint copper circles with a horizontal line between them. The line
  // animates via scaleX on reveal (0 → 1), circles fade in.
  const width = rightX - leftX;
  const cR = 6;

  const containerStyle: CSSProperties = {
    position: "absolute",
    left: leftX,
    top: y - 18,
    width,
    height: 36,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    pointerEvents: "none",
    opacity: on ? 1 : 0,
    transition: "opacity 420ms var(--ease)",
  };

  return (
    <div data-testid="f1-connector" data-on={on ? "1" : "0"} style={containerStyle}>
      <svg
        width={width}
        height={36}
        viewBox={`0 0 ${width} 36`}
        style={{ display: "block", overflow: "visible" }}
        aria-hidden
      >
        {/* Left circle */}
        <circle
          cx={cR + 2}
          cy={18}
          r={cR}
          fill="none"
          stroke="var(--copper-300)"
          strokeWidth="1.2"
          opacity={on ? 0.7 : 0}
          style={{ transition: "opacity 320ms var(--ease)" }}
        />
        {/* Right circle */}
        <circle
          cx={width - cR - 2}
          cy={18}
          r={cR}
          fill="none"
          stroke="var(--copper-300)"
          strokeWidth="1.2"
          opacity={on ? 0.7 : 0}
          style={{
            transition: "opacity 320ms var(--ease)",
            transitionDelay: on ? "120ms" : "0ms",
          }}
        />
        {/* Connecting line — animates left→right via scaleX */}
        <line
          x1={cR * 2 + 4}
          y1={18}
          x2={width - cR * 2 - 4}
          y2={18}
          stroke="var(--copper-400)"
          strokeWidth="1"
          opacity={0.55}
          style={{
            transformOrigin: `${cR * 2 + 4}px 18px`,
            transform: on ? "scaleX(1)" : "scaleX(0)",
            transition: "transform 520ms var(--ease)",
            transitionDelay: on ? "200ms" : "0ms",
          }}
        />
        {/* Tiny arrow caps — point inward, suggest bidirectional bridge */}
        <polygon
          points={`${cR * 2 + 4},18 ${cR * 2 + 10},14 ${cR * 2 + 10},22`}
          fill="var(--copper-400)"
          opacity={on ? 0.7 : 0}
          style={{
            transition: "opacity 220ms var(--ease)",
            transitionDelay: on ? "560ms" : "0ms",
          }}
        />
        <polygon
          points={`${width - cR * 2 - 4},18 ${width - cR * 2 - 10},14 ${width - cR * 2 - 10},22`}
          fill="var(--copper-400)"
          opacity={on ? 0.7 : 0}
          style={{
            transition: "opacity 220ms var(--ease)",
            transitionDelay: on ? "560ms" : "0ms",
          }}
        />
      </svg>
    </div>
  );
}

// ───────────────────── slide def ─────────────────────

export const f1Slide: SlideDef = {
  steps: 4,
  canonicalPose: 3,
  animationMode: "step-reveal",
  surface: "dark",
  section: "F",
  render: () => <F1TwoPillars />,
};
