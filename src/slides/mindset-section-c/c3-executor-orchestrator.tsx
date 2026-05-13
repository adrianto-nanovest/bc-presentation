// C.3 — EXECUTOR → ORCHESTRATOR (v2 — E7-modeled layout)
//
// Restructure (Task 18 — 2026-05-13). The previous 50/50 vertical split
// produced a lot of empty space and the bullet rows overflowed at the
// right edge. This rewrite models C.3 on E.7:
//
//   ┌──────────────────────────────────────────────────────────────────┐
//   │  FIG · headline                                                  │
//   │                                                                  │
//   │           ┌── illustration band — full-width ──┐                 │
//   │           │  [executor]      →     [orchestr.] │   (top:156)     │
//   │           │  dimmed↔bright transition on step 2│                 │
//   │           └──────────────────────────────────────┘               │
//   │                          BEFORE → AFTER                          │
//   │                                                                  │
//   │  EXECUTOR ───────       │       ORCHESTRATOR ───────             │
//   │                         │       Direct. Verify. Decide.          │
//   │  ┌────┐ ┌────┐         │       ┌────┐ ┌────┐                    │
//   │  │card│ │card│  + 1    │       │card│ │card│  + 1               │
//   │  └────┘ └────┘  more   │       └────┘ └────┘  more               │
//   │                                                                  │
//   │              AI handles the typing.                              │
//   │              You handle the thinking.                            │
//   └──────────────────────────────────────────────────────────────────┘
//
// Step rhythm — 3 steps, canonicalPose: 3 (was 5 / 4):
//
//   mount   FIG, slide title, illustration scaffold draw in.
//   step 1  Executor at full opacity, orchestrator dimmed (0.25).
//           LEFT EXECUTOR header + 5 capability cards stagger-fade.
//   step 2  Orchestrator brightens to 1.0, executor dims to 0.45.
//           Copper hairline draws L→R between the two silhouettes.
//           RIGHT ORCHESTRATOR header + triad caption + 5 cards stagger.
//   step 3  Footer punchline reveals — "AI handles the typing.
//           You handle the *thinking*." 4s ambient pulse on `thinking`.
//
// Cards: A.1 `CapabilityShape` card-mode style — bordered, copper glyph,
// serif body. Sharp corners (radius 0), gentle hover lift to copper-300
// border + 1.02 scale.
import { useEffect, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { AmbientPulse } from "@/components/AmbientPulse";
import { highlight as KW } from "@/components/highlight";
import { MindsetSilhouette } from "./components/MindsetSilhouette";
import { c3Icons } from "./components/C3Icons";
import { c3Content as C } from "./content";

// ───────────────────── geometry ─────────────────────
// 1280×720 stage. Header reserves y:0–~130.

const ILLUS_TOP = 130;
const ILLUS_HEIGHT = 230;          // top:130 → bottom:~360

// Silhouettes — sized down vs. legacy so both fit comfortably in the band.
const EXEC_W = 140;
const EXEC_H = Math.round(EXEC_W * (220 / 160)); // 193
const ORCH_W = 140;
const ORCH_H = Math.round(ORCH_W * (240 / 180)); // 187

// Center each silhouette horizontally around x=440 (left) and x=720 (right)
// — gives a ~280px gap between centers. Wraps are absolutely positioned
// inside the illustration band so we set `left` to the leftmost edge.
const EXEC_CENTER_X = 480;
const ORCH_CENTER_X = 800;

// Hairline between silhouettes — at mid-figure height (relative to band).
// Stage y = ILLUS_TOP + ILLUS_HEIGHT/2 = 130 + 115 = 245. Draws L→R on step 2.
const HAIRLINE_Y_STAGE = ILLUS_TOP + Math.round(ILLUS_HEIGHT / 2);
const HAIRLINE_X1 = EXEC_CENTER_X + EXEC_W / 2 + 16;   // executor right edge + gap
const HAIRLINE_X2 = ORCH_CENTER_X - ORCH_W / 2 - 16;   // orchestrator left edge - gap

// Bottom 50/50 split with vertical divider — pulled up to match the
// tighter top band and to leave room for the footer punchline above nav.
const SPLIT_TOP = 400;
const SPLIT_BOTTOM_Y = 600;
const SPLIT_BOTTOM_PAD = 120;       // bottom inset from stage bottom (720 - 600 = 120)
const DIVIDER_X = 640;
const LEFT_PAD = 48;
const RIGHT_PAD = 48;
const COL_GAP = 24;                 // visual breathing room around the divider

// ───────────────────── icon mapping ─────────────────────

// Positional mapping to c3Content.executor.bullets / .orchestrator.bullets.
// Both arrays MUST stay length-aligned with their bullets (6 entries each).
// Reuse of a key across bullets is fine — content drives the slide, not
// icon uniqueness (e.g. shieldCheck appears for both "Verify and review"
// and "Set the guardrails" — both are verification/protection acts).
const EXECUTOR_ICON_KEYS = [
  "keyboard",      // "Write the work line by line"
  "magnifier",     // "Debug manually"
  "paperStack",    // "Document everything"
  "repeatArrows",  // "Repetitive sub-tasks"
  "paperStack",    // "Manual handoffs" — paper passing between hands
  "clock",         // "Time → typing"
] as const;

const ORCHESTRATOR_ICON_KEYS = [
  "compass",       // "Design and architect"
  "penBrief",      // "Specify intent"
  "shieldCheck",   // "Verify and review"
  "shieldCheck",   // "Set the guardrails"
  "flag",          // "Decide and own it"
  "lightbulb",     // "Time → thinking"
] as const;

// ───────────────────── slide ─────────────────────

export function C3ExecutorOrchestrator() {
  const { stepIndex } = useDeck();

  // mount-driven fade for FIG + headline + illustration scaffold
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = window.setTimeout(() => setLoaded(true), 80);
    return () => window.clearTimeout(t);
  }, []);

  // Step gates
  //   0 (load): FIG + headline + illustration scaffold (silhouettes muted)
  //   1: executor bright, orchestrator dim 0.25; left section reveals
  //   2: orchestrator bright (executor dims to 0.45); right section reveals; hairline draws
  //   3 (canon): footer punchline + ambient pulse
  const leftOn = stepIndex >= 1;
  const rightOn = stepIndex >= 2;
  const footerOn = stepIndex >= 3;
  const pulseOn = stepIndex >= 3;

  // Silhouette opacity per step
  let execOpacity = 1.0;
  let orchOpacity = 0.25;
  if (stepIndex >= 2) {
    execOpacity = 0.45;
    orchOpacity = 1.0;
  }

  return (
    <div
      data-testid="slide-c3"
      style={{ position: "absolute", inset: 0, overflow: "hidden" }}
    >
      {/* Scoped hover styles for capability cards. Kept here so the reveal
          stagger (inline `transitionDelay` on opacity+transform of the OUTER
          wrapper) cannot leak into the hover transitions on the inner card
          (border-color / background / color / scale). */}
      <style>{`
        [data-testid="slide-c3"] .c3-card {
          transition: border-color 200ms var(--ease),
                      background-color 200ms var(--ease),
                      color 200ms var(--ease),
                      transform 200ms var(--ease);
        }
        [data-testid="slide-c3"] .c3-card:hover {
          border-color: var(--copper-300);
          background-color: rgba(217,158,108,0.10);
          color: var(--copper-100);
          transform: scale(1.02);
        }
      `}</style>

      {/* Background — plain neutral-950 + dot-grid (matches C.2). */}
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

      {/* FIG label */}
      <FigLabel section="C" num={3} label={C.figLabel} />

      {/* Canonical slide headline with keyword highlight */}
      <div className="slide-headline-row">
        <h1 className="slide-headline small">
          {KW(C.headline, C.headlineKw)}
        </h1>
      </div>

      {/* ───────── Top illustration band ───────── */}
      <div
        data-testid="c3-illustration-band"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: ILLUS_TOP,
          height: ILLUS_HEIGHT,
          zIndex: 4,
          pointerEvents: "none",
        }}
      >
        {/* Executor silhouette wrapper */}
        <div
          data-testid="c3-executor-silhouette-wrap"
          style={{
            position: "absolute",
            left: EXEC_CENTER_X - EXEC_W / 2,
            top: (ILLUS_HEIGHT - EXEC_H) / 2,
            width: EXEC_W,
            height: EXEC_H,
            opacity: execOpacity,
            transition: "opacity 700ms var(--ease)",
            willChange: "opacity",
          }}
        >
          <MindsetSilhouette variant="executor" size={EXEC_W} />
        </div>

        {/* Orchestrator silhouette wrapper */}
        <div
          data-testid="c3-orchestrator-silhouette-wrap"
          style={{
            position: "absolute",
            left: ORCH_CENTER_X - ORCH_W / 2,
            top: (ILLUS_HEIGHT - ORCH_H) / 2,
            width: ORCH_W,
            height: ORCH_H,
            opacity: orchOpacity,
            transition: "opacity 700ms var(--ease)",
            willChange: "opacity",
          }}
        >
          <MindsetSilhouette variant="orchestrator" size={ORCH_W} />
        </div>

        {/* Copper hairline + arrowhead between the two figures — draws L→R
            when step 2 fires. Moving pulse circles activate at canonical
            step (3) and travel along the arrow path. */}
        <Hairline
          on={rightOn}
          pulse={stepIndex >= 3}
          x1={HAIRLINE_X1}
          x2={HAIRLINE_X2}
          yInBand={HAIRLINE_Y_STAGE - ILLUS_TOP}
        />

        {/* BEFORE → AFTER mono caption beneath the silhouettes */}
        <div
          data-testid="c3-before-after-caption"
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: ILLUS_HEIGHT - 24,
            textAlign: "center",
            fontFamily: "var(--mono)",
            fontSize: 11,
            letterSpacing: "0.22em",
            color: "var(--copper-300)",
            textTransform: "uppercase",
            opacity: loaded ? 1 : 0,
            transition: "opacity 500ms var(--ease) 240ms",
          }}
        >
          Before <span style={{ opacity: 0.6, margin: "0 8px" }}>→</span> After
        </div>
      </div>

      {/* ───────── Vertical divider (between bottom sections) ───────── */}
      <div
        data-testid="c3-divider"
        aria-hidden
        style={{
          position: "absolute",
          left: DIVIDER_X - 0.5,
          top: SPLIT_TOP,
          width: 1,
          height: SPLIT_BOTTOM_Y - SPLIT_TOP,
          background: "var(--copper-700)",
          zIndex: 4,
          opacity: loaded ? 1 : 0,
          transition: "opacity 500ms var(--ease) 160ms",
        }}
      />

      {/* ───────── LEFT — EXECUTOR section ───────── */}
      <Section
        side="left"
        title="EXECUTOR"
        titleColor="var(--copper-300)"
        triadCaption={C.executorSubtitle}
        on={leftOn}
        bullets={C.executor.bullets}
        iconKeys={EXECUTOR_ICON_KEYS}
        iconColor="var(--copper-300)"
        testIdPrefix="c3-executor"
      />

      {/* ───────── RIGHT — ORCHESTRATOR section ───────── */}
      <Section
        side="right"
        title="ORCHESTRATOR"
        titleColor="var(--copper-400)"
        triadCaption={C.triadCaption}
        on={rightOn}
        bullets={C.orchestrator.bullets}
        iconKeys={ORCHESTRATOR_ICON_KEYS}
        iconColor="var(--copper-400)"
        testIdPrefix="c3-orchestrator"
      />

      {/* ───────── Footer punchline ─────────
          Sits at bottom:60 so it clears the deck nav buttons (~bottom:16–40)
          and breathes above the bottom edge. */}
      <div
        data-testid="c3-punchline"
        style={{
          position: "absolute",
          left: 48,
          right: 48,
          bottom: 60,
          display: "flex",
          justifyContent: "center",
          zIndex: 6,
          opacity: footerOn ? 1 : 0,
          transform: footerOn ? "translateY(0)" : "translateY(8px)",
          transition:
            "opacity 600ms var(--ease), transform 600ms var(--ease)",
        }}
      >
        <Punchline
          text={C.punchline}
          keywords={C.punchlineKw}
          pulse={pulseOn}
        />
      </div>
    </div>
  );
}

// ───────────────────── Section (one half of bottom row) ─────────────────────

interface SectionProps {
  side: "left" | "right";
  title: string;
  titleColor: string;
  triadCaption?: string;
  on: boolean;
  bullets: readonly string[];
  iconKeys: readonly (keyof typeof c3Icons)[];
  iconColor: string;
  testIdPrefix: string;
}

function Section({
  side,
  title,
  titleColor,
  triadCaption,
  on,
  bullets,
  iconKeys,
  iconColor,
  testIdPrefix,
}: SectionProps) {
  const isLeft = side === "left";
  const sectionStyle: CSSProperties = isLeft
    ? {
        position: "absolute",
        left: LEFT_PAD,
        top: SPLIT_TOP,
        bottom: SPLIT_BOTTOM_PAD,
        width: DIVIDER_X - LEFT_PAD - COL_GAP,
        zIndex: 5,
      }
    : {
        position: "absolute",
        left: DIVIDER_X + COL_GAP,
        top: SPLIT_TOP,
        bottom: SPLIT_BOTTOM_PAD,
        right: RIGHT_PAD,
        zIndex: 5,
      };

  return (
    <div data-testid={testIdPrefix} style={sectionStyle}>
      {/* Header row — label + 40% rule */}
      <div
        data-testid={`${testIdPrefix}-header`}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          opacity: on ? 1 : 0,
          transform: on ? "translateY(0)" : "translateY(-4px)",
          transition:
            "opacity 320ms var(--ease), transform 320ms var(--ease)",
        }}
      >
        <span
          data-testid={`${testIdPrefix}-title`}
          style={{
            fontFamily: "var(--mono)",
            fontSize: 13,
            letterSpacing: "0.22em",
            color: titleColor,
            textTransform: "uppercase",
            fontWeight: 500,
            whiteSpace: "nowrap",
          }}
        >
          {title}
        </span>
        <span
          style={{
            flex: "0 0 40%",
            height: 1,
            background: "var(--copper-700)",
            transformOrigin: "left center",
            transform: on ? "scaleX(1)" : "scaleX(0)",
            transition: "transform 480ms var(--ease) 80ms",
          }}
        />
      </div>

      {/* Triad caption — orchestrator side only */}
      {triadCaption ? (
        <div
          data-testid={`${testIdPrefix}-triad`}
          style={{
            marginTop: 4,
            fontFamily: "var(--mono)",
            fontSize: 11,
            letterSpacing: "0.22em",
            color: "var(--copper-300)",
            textTransform: "uppercase",
            opacity: on ? 1 : 0,
            transition: "opacity 400ms var(--ease) 140ms",
          }}
        >
          {triadCaption}
        </div>
      ) : null}

      {/* Card grid — 2 columns × 3 rows (6 cards fill the grid exactly). */}
      <div
        data-testid={`${testIdPrefix}-cards`}
        style={{
          marginTop: 12,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          columnGap: 10,
          rowGap: 8,
        }}
      >
        {bullets.map((b, i) => (
          <CapabilityCard
            key={b}
            on={on}
            delay={i * 80}
            label={b}
            iconKey={iconKeys[i]}
            iconColor={iconColor}
            testId={`${testIdPrefix}-card-${i}`}
          />
        ))}
      </div>
    </div>
  );
}

// ───────────────────── CapabilityCard ─────────────────────
// Modeled on A.1 CapabilityShape `card` mode. Sharp corners, bordered,
// copper glyph, serif body. Hover: copper-300 border + 1.02 scale.

interface CapabilityCardProps {
  on: boolean;
  delay: number;
  label: string;
  iconKey: keyof typeof c3Icons;
  iconColor: string;
  testId: string;
}

function CapabilityCard({
  on,
  delay,
  label,
  iconKey,
  iconColor,
  testId,
}: CapabilityCardProps) {
  const glyph = c3Icons[iconKey];

  // Hover-delay fix (Task 25): the previous version applied `transitionDelay:
  // ${delay}ms` to a `transition` shorthand that covered border-color / bg /
  // color too — so later cards (delay up to ~400ms) felt sluggish on hover.
  //
  // Approach: outer wrapper owns the reveal (opacity + translateY only, with
  // the stagger delay scoped to those two properties). Inner `.c3-card`
  // element owns the hover affordance (border-color, background, color, and
  // a scale transform) via a scoped `<style>` block — those transitions have
  // ZERO delay regardless of which card you hover.
  return (
    <div
      data-testid={testId}
      style={{
        opacity: on ? 1 : 0,
        transform: on ? "translateY(0)" : "translateY(8px)",
        transition:
          "opacity 420ms var(--ease), transform 420ms var(--ease)",
        transitionDelay: on ? `${delay}ms` : "0ms",
        willChange: "opacity, transform",
      }}
    >
      <div
        className="c3-card"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "8px 12px",
          border: "1px solid var(--copper-800)",
          borderRadius: 0,
          background: "rgba(20,12,6,0.4)",
          fontFamily: "var(--serif)",
          fontSize: 13,
          color: "var(--neutral-200)",
          lineHeight: 1.25,
          boxSizing: "border-box",
          transformOrigin: "center center",
          cursor: "default",
        }}
      >
        <span
          aria-hidden
          style={{
            flex: "0 0 14px",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 14,
            height: 14,
            color: iconColor,
          }}
        >
          {glyph}
        </span>
        <span style={{ flex: "1 1 auto", minWidth: 0 }}>
          <BulletText text={label} />
        </span>
      </div>
    </div>
  );
}

// Render bullet body. If the text contains " → " we render the tail italic.
function BulletText({ text }: { text: string }) {
  const arrowIdx = text.indexOf(" → ");
  if (arrowIdx === -1) return <>{text}</>;
  const head = text.slice(0, arrowIdx);
  const tail = text.slice(arrowIdx + 3);
  return (
    <>
      {head}
      <span style={{ opacity: 0.7, margin: "0 4px" }}>→</span>
      <em style={{ fontStyle: "italic" }}>{tail}</em>
    </>
  );
}

// ───────────────────── Hairline between silhouettes ─────────────────────
// 1px copper-400 horizontal hairline with a small arrowhead. PathLength
// draws 0→1 left-to-right over 800ms when `on` is true (step 2).

function Hairline({
  on,
  pulse,
  x1,
  x2,
  yInBand,
}: {
  on: boolean;
  pulse: boolean;
  x1: number;
  x2: number;
  yInBand: number;
}) {
  const length = x2 - x1;
  // Path segment the pulses travel along — from line start (0,10) to just
  // before the arrowhead (length-2, 10). Both circles use this same path.
  const pulsePath = `M 0 10 L ${length - 2} 10`;
  // SVG path drawing animation via stroke-dashoffset on a horizontal line.
  return (
    <svg
      data-testid="c3-hairline"
      data-on={on ? "1" : "0"}
      data-pulse={pulse ? "1" : "0"}
      width={length + 20}
      height={20}
      viewBox={`0 0 ${length + 20} 20`}
      style={{
        position: "absolute",
        left: x1,
        top: yInBand - 10,
        overflow: "visible",
        pointerEvents: "none",
      }}
      aria-hidden
    >
      <line
        x1={0}
        y1={10}
        x2={length}
        y2={10}
        stroke="var(--copper-400)"
        strokeWidth={1}
        strokeDasharray={length}
        strokeDashoffset={on ? 0 : length}
        style={{ transition: "stroke-dashoffset 800ms var(--ease)" }}
      />
      {/* Arrowhead at right end */}
      <polyline
        points={`${length - 6},6 ${length},10 ${length - 6},14`}
        fill="none"
        stroke="var(--copper-400)"
        strokeWidth={1}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          opacity: on ? 1 : 0,
          transition: "opacity 320ms var(--ease) 600ms",
        }}
      />
      {/* Moving pulses — two copper dots travelling executor→orchestrator,
          offset by 1s so one is always mid-flight. Only mounted at the
          canonical step (matches footer reveal). */}
      {pulse ? (
        <>
          <circle
            data-testid="c3-hairline-pulse-1"
            r={3}
            fill="var(--copper-100)"
            style={{ filter: "drop-shadow(0 0 6px var(--copper-300))" }}
          >
            <animateMotion
              dur="2s"
              repeatCount="indefinite"
              path={pulsePath}
            />
          </circle>
          <circle
            data-testid="c3-hairline-pulse-2"
            r={3}
            fill="var(--copper-100)"
            style={{ filter: "drop-shadow(0 0 6px var(--copper-300))" }}
          >
            <animateMotion
              dur="2s"
              repeatCount="indefinite"
              begin="1s"
              path={pulsePath}
            />
          </circle>
        </>
      ) : null}
    </svg>
  );
}

// ───────────────────── Punchline ─────────────────────
// "AI handles the typing. You handle the *thinking*."
//   • Source Serif italic 22px, neutral-200
//   • "You handle the" bolded
//   • "thinking" copper-400 italic + copper-500 underline + 4s pulse

function Punchline({
  text,
  keywords,
  pulse,
}: {
  text: string;
  keywords: readonly string[];
  pulse: boolean;
}): ReactNode {
  const kw = keywords[0] ?? "thinking";
  const boldPhrase = "You handle the";
  const boldIdx = text.indexOf(boldPhrase);
  const kwIdx = text.indexOf(kw);

  if (boldIdx === -1 || kwIdx === -1) {
    return <p style={punchlineParaStyle()}>{text}</p>;
  }

  const head = text.slice(0, boldIdx);
  const boldRun = text.slice(boldIdx, kwIdx);
  const tail = text.slice(kwIdx + kw.length);

  const accent = (
    <em
      data-testid="c3-keyword-accent"
      style={{
        fontFamily: "var(--serif)",
        fontStyle: "italic",
        color: "var(--copper-400)",
        fontWeight: 400,
        textDecorationLine: "underline",
        textDecorationColor: pulse ? "var(--copper-500)" : "transparent",
        textUnderlineOffset: "4px",
        textDecorationThickness: "1px",
        transition: "text-decoration-color 400ms var(--ease)",
      }}
    >
      {kw}
    </em>
  );

  return (
    <p style={punchlineParaStyle()} data-testid="c3-punchline-text">
      {head}
      <strong
        style={{
          fontWeight: 600,
          color: "var(--neutral-100)",
          fontStyle: "italic",
        }}
      >
        {boldRun}
      </strong>
      {pulse ? (
        <AmbientPulse periodSeconds={4} keyword={kw}>
          {accent}
        </AmbientPulse>
      ) : (
        accent
      )}
      {tail}
    </p>
  );
}

function punchlineParaStyle(): CSSProperties {
  return {
    fontFamily: "var(--serif)",
    fontStyle: "italic",
    fontSize: 22,
    color: "var(--neutral-200)",
    margin: 0,
    lineHeight: 1.3,
    fontWeight: 400,
    textAlign: "center",
    maxWidth: 980,
  };
}

// ───────────────────── slide def ─────────────────────

export const c3Slide: SlideDef = {
  steps: 4,           // step indices 0,1,2,3
  canonicalPose: 3,
  animationMode: "step-reveal",
  surface: "dark",
  section: "C",
  render: () => <C3ExecutorOrchestrator />,
};
