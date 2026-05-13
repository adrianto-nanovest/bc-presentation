// F.1 — TWO PILLARS (Section F opener)
//
// Section opener · split-stage map (knowledge × capability). Both flagship
// visuals (bridge-artifact + layer-cake) are previewed side-by-side. As the
// reveal progresses, the subtitle motion-merges into the title, the
// illustration band shifts upward, and each pillar lights up at FULL
// brightness as it is named. The closing step adds a connector with a copper
// shimmer that travels back and forth, plus a footer caption.
//
// Layout — centered title block above two equal-width visual panels on the
// 1280×720 stage. Title bar sits in the upper third until step 2, after
// which the subtitle collapses into the title and the pillars slide up.
//
// 4 reveal steps (Adri-indexed; code stepIndex shown in parens):
//   Step 1 (stepIndex 0) — title + subtitle visible; both pillars present at
//                          low opacity (0.15 unlit baseline)
//   Step 2 (stepIndex 1) — subtitle merges into title via coordinated
//                          transform (font-size + position + letter-spacing
//                          over 700ms). LEFT pillar (KNOWLEDGE) brightens to
//                          full brightness. Illustration band shifts up ~96px.
//   Step 3 (stepIndex 2) — RIGHT pillar (CAPABILITY) brightens to full
//                          brightness. Illustration band remains shifted.
//   Step 4 (stepIndex 3) — Faint copper ◯←→◯ connector reveals between
//                          pillar centers; a copper dot shimmers back-and-
//                          forth along the line on a continuous 2.4s loop.
//                          Footer caption fades in at the bottom.
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
const PILLAR_TOP_BASE = 296;
const PILLAR_TOP_SHIFTED = 200; // 96px upward shift once header collapses
const PILLAR_GAP = 80; // gap between pillars where the ◯←→◯ connector sits
const PILLAR_LEFT = (STAGE_W - PILLAR_W * 2 - PILLAR_GAP) / 2; // 120
const PILLAR_RIGHT_LEFT = PILLAR_LEFT + PILLAR_W + PILLAR_GAP; // 680

// All canonical cake layers — used to glow the LayerCake when the right
// pillar is lit. (F.1 doesn't break out per-layer reveal; the whole cake
// just brightens together.)
const CAKE_LAYERS_LIT = ["CLAUDE.md", "HOOKS", "SKILLS", "AGENTS"];

// ───────────────────── slide ─────────────────────

export function F1TwoPillars() {
  const { stepIndex } = useDeck();

  // stepIndex 0 = step 1 (initial). Subtitle merges into title once we hit
  // stepIndex 1 (step 2) — and from that point on the illustration band
  // also slides up.
  const headerCollapsed = stepIndex >= 1;
  const leftLit = stepIndex >= 1;
  const rightLit = stepIndex >= 2;
  const showConnector = stepIndex >= 3;
  const showFooter = stepIndex >= 3;

  const pillarTop = headerCollapsed ? PILLAR_TOP_SHIFTED : PILLAR_TOP_BASE;

  return (
    <>
      <FigLabel section="F" num={1} label="TWO PILLARS" />

      {/* ───────────── Title block (centered, upper third) ─────────────
          Two stacked lines whose typographic shells animate as one unit.
          On step 2 the subtitle's font-size, color, letter-spacing, and
          vertical position all retarget the title — making it read as a
          motion-merge rather than a discrete fade. */}
      <div
        data-testid="f1-title-block"
        data-collapsed={headerCollapsed ? "1" : "0"}
        style={{
          position: "absolute",
          top: headerCollapsed ? 76 : 116,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: headerCollapsed ? 6 : 14,
          transition:
            "top 0.7s var(--ease), gap 0.7s var(--ease)",
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

        <div
          style={{
            width: headerCollapsed ? "28%" : "40%",
            display: "flex",
            justifyContent: "center",
            transition: "width 0.7s var(--ease)",
          }}
        >
          <CopperRule on delay={200} width="100%" />
        </div>

        {/* Subtitle — animates into the title via coordinated transform.
            On step 2, font-size shrinks, letter-spacing tightens, color
            shifts toward the title's neutral hue, and the line nudges up
            so it visually tucks against the rule. Mirrors D.1's
            stat-into-header collapse (foundation-core/d1-the-trap.tsx). */}
        <Reveal on delay={350} data-testid="f1-subtitle">
          <p
            data-collapsed={headerCollapsed ? "1" : "0"}
            style={{
              fontFamily: "var(--serif)",
              fontStyle: "italic",
              fontSize: headerCollapsed ? 16 : 22,
              color: headerCollapsed
                ? "var(--copper-300)"
                : "var(--copper-200)",
              letterSpacing: headerCollapsed ? "0.04em" : "normal",
              margin: 0,
              textAlign: "center",
              lineHeight: 1.2,
              transform: headerCollapsed
                ? "translateY(-4px)"
                : "translateY(0)",
              transition:
                "font-size 0.7s var(--ease), color 0.7s var(--ease), letter-spacing 0.7s var(--ease), transform 0.7s var(--ease)",
            }}
          >
            {highlight(C.subtitle, C.subtitleKw)}
          </p>
        </Reveal>
      </div>

      {/* ───────────── Connector ◯←→◯ (step 4 only) ─────────────
          Sits centered between the two pillars, vertically aligned with
          the illustration band. After the static reveal completes, a
          copper shimmer dot travels back and forth along the line. */}
      <Connector
        on={showConnector}
        leftX={PILLAR_LEFT + PILLAR_W}
        rightX={PILLAR_RIGHT_LEFT}
        y={pillarTop + PILLAR_H / 2}
      />

      {/* ───────────── LEFT pillar — KNOWLEDGE ───────────── */}
      <Pillar
        side="left"
        lit={leftLit}
        left={PILLAR_LEFT}
        top={pillarTop}
        width={PILLAR_W}
        height={PILLAR_H}
        label={C.pillars[0].label}
        tagline={C.pillars[0].tagline}
        taglineKw={C.pillars[0].taglineKw}
        tooltip={C.pillars[0].tooltip}
        testId="f1-pillar-knowledge"
      >
        <BridgeArtifact mode="default" dim={!leftLit} size={420} />
      </Pillar>

      {/* ───────────── RIGHT pillar — CAPABILITY ───────────── */}
      <Pillar
        side="right"
        lit={rightLit}
        left={PILLAR_RIGHT_LEFT}
        top={pillarTop}
        width={PILLAR_W}
        height={PILLAR_H}
        label={C.pillars[1].label}
        tagline={C.pillars[1].tagline}
        taglineKw={C.pillars[1].taglineKw}
        tooltip={C.pillars[1].tooltip}
        testId="f1-pillar-capability"
      >
        <LayerCake
          mode="compact"
          lit={rightLit ? CAKE_LAYERS_LIT : []}
          dim={!rightLit}
        />
      </Pillar>

      {/* ───────────── Footer caption (step 4) ─────────────
          Italic copper-200 mono, with copper-accent + italic highlight on
          1–3 keywords (deck-wide rule). Mirrors E.4's footer reveal
          (foundation-core-section-e/e4-prompt-methodologies.tsx:213-237). */}
      {showFooter && (
        <Reveal
          on={showFooter}
          delay={200}
          data-testid="f1-footer"
          style={{
            position: "absolute",
            left: 48,
            right: 48,
            bottom: 64,
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontFamily: "var(--mono)",
              fontStyle: "italic",
              fontSize: 14,
              letterSpacing: "0.12em",
              color: "var(--copper-200)",
              margin: 0,
              lineHeight: 1.4,
            }}
          >
            {highlight(C.footer, C.footerKw)}
          </p>
        </Reveal>
      )}
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
  // 0.15 = unlit baseline (still readable but clearly muted)
  // 1.0  = full brightness once the pillar is lit (per task #1: pillars on
  //         steps 2–4 should NOT pre-dim — they appear at full brightness
  //         when lit, with only unlit pillars staying muted).
  const pillarOpacity = lit ? 1 : 0.15;

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
        transition: "top 0.7s var(--ease)",
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

      {/* Illustration zone — opacity tracks the lit state as a unit. Only
          unlit pillars dim; lit pillars render at full brightness (no
          pre-dim / slow-brighten anti-pattern). */}
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

// Continuous shimmer animation — copper dot travels back and forth between
// the two circles. Component-scoped keyframes (namespaced to `f1-` so they
// can't collide with global rules). The dot only animates AFTER the static
// reveal completes (1000ms lead-in covers circles + line + arrow caps).
function Connector({ on, leftX, rightX, y }: ConnectorProps) {
  // Two faint copper circles with a horizontal line between them. The line
  // animates via scaleX on reveal (0 → 1), circles fade in, then a copper
  // shimmer dot loops back-and-forth on a continuous 2.4s cycle.
  const width = rightX - leftX;
  const cR = 6;
  // Shimmer path endpoints — just inside each circle's inner edge.
  const shimmerX1 = cR * 2 + 8;
  const shimmerX2 = width - cR * 2 - 8;

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
        {/* Shimmer dot — copper-200, glowing, travels back-and-forth on a
            continuous 2.4s cycle. Starts AFTER the static reveal (1000ms
            delay covers circles + line + arrow caps). The dot itself is
            opacity-gated by the same `on` flag so it doesn't appear before
            the connector is shown. */}
        {on && (
          <circle
            data-testid="f1-connector-shimmer"
            cx={shimmerX1}
            cy={18}
            r={3}
            fill="var(--copper-200)"
            style={{
              filter: "drop-shadow(0 0 4px var(--copper-300))",
              animation:
                "f1-connector-shimmer 2.4s cubic-bezier(0.45, 0, 0.55, 1) 1s infinite",
            }}
          />
        )}
      </svg>
      <style>{`
        @keyframes f1-connector-shimmer {
          0%   { transform: translateX(0); opacity: 0; }
          10%  { opacity: 1; }
          50%  { transform: translateX(${shimmerX2 - shimmerX1}px); opacity: 1; }
          90%  { opacity: 1; }
          100% { transform: translateX(0); opacity: 0; }
        }
      `}</style>
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
