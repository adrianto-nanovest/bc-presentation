// B.3 — MODEL MECHANICS & LANDSCAPE MAP
//
// Densest slide in the opener. Demystifies *how* you talk to a model (3 dials
// on the left) and *which* model for what (5 task rows on the right). Layout
// is a 50/50 vertical split with a 1px copper-700 divider that draws in on
// load. Surface clean, depth on demand via hover.
//
// Step map (load animation is mount-driven; stepIndex 0 = first Space press):
//   load (on mount):  FIG label + dot-grid bg + vertical divider draws in
//   stepIndex 0:      Dial 1 (Temperature)    slides in from left, knob settles → Mid
//   stepIndex 1:      Dial 2 (Context Window) slides in
//   stepIndex 2:      Dial 3 (System Prompt)  slides in
//   stepIndex 3:      All 5 right-side task rows fade in with 100ms stagger
//   stepIndex 4:      Faint copper ambient pulse on all model chips (canonical pose)
//
// Hover (presenter detail layer):
//   • DialRow → mono technical-name popover ("temperature: 0.0 - 1.5+")
//   • ModelChip → lifts, copper-200 border, "best for X" caption beneath
//
// Spec note: model names live in content.ts so they can be refreshed at
// delivery time without diving into JSX (frontier models shift).
import { useEffect, useState, type CSSProperties } from "react";
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { highlight } from "@/components/highlight";
import { DialRow } from "./components/DialRow";
import { TaskRow } from "./components/TaskRow";
import { ModelChip } from "./components/ModelChip";
import { b3Content as C } from "./content";

// Stage-anchored layout (1280×720 stage; content sits below the 88px FIG band).
const STAGE_W = 1280;
const CONTENT_TOP = 116;
const CONTENT_BOTTOM = 56;
const SIDE_PAD = 64;
const DIVIDER_X = STAGE_W / 2;

// ───────────────────── slide ─────────────────────

export function B3MechanicsLandscape() {
  const { stepIndex } = useDeck();

  // Divider draws in on mount as part of load animation (no Space needed).
  const [dividerOn, setDividerOn] = useState(false);
  useEffect(() => {
    const t = window.setTimeout(() => setDividerOn(true), 120);
    return () => window.clearTimeout(t);
  }, []);

  // Step gates. stepIndex 0 = first Space press (dial 1 reveal).
  const dialOn = (i: number) => stepIndex >= i;
  const tasksOn = stepIndex >= 3;
  const glowOn = stepIndex >= 4;

  return (
    <div data-testid="slide-b3" style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      {/* Background — plain neutral-950 + subtle dot-grid texture (matches A.1). */}
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

      <FigLabel section="B" num={3} label={C.figLabel} />

      {/* Vertical divider — 1px copper-700, draws in on load via stroke-
          dashoffset animation. Spans the content band only (not the full
          stage height) so the FIG label and bottom nav stay clean. */}
      <DividerLine
        on={dividerOn}
        x={DIVIDER_X}
        top={CONTENT_TOP}
        bottom={CONTENT_BOTTOM}
      />

      {/* ───────────── LEFT HALF — Dials ───────────── */}
      <div
        data-testid="b3-left"
        style={{
          position: "absolute",
          left: SIDE_PAD,
          top: CONTENT_TOP + 24,
          width: DIVIDER_X - SIDE_PAD - 40,
          bottom: CONTENT_BOTTOM,
          display: "flex",
          flexDirection: "column",
          zIndex: 5,
        }}
      >
        <SectionLabel text="HOW YOU TALK TO IT" />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            marginTop: 24,
            justifyContent: "flex-start",
          }}
        >
          {C.dials.map((d, i) => (
            <DialRow
              key={d.label}
              label={d.label}
              caption={highlight(d.caption, d.captionKw)}
              hover={d.hover}
              on={dialOn(i)}
            />
          ))}
        </div>
      </div>

      {/* ───────────── RIGHT HALF — Task rows ───────────── */}
      <div
        data-testid="b3-right"
        style={{
          position: "absolute",
          left: DIVIDER_X + 40,
          top: CONTENT_TOP + 24,
          right: SIDE_PAD,
          bottom: CONTENT_BOTTOM,
          display: "flex",
          flexDirection: "column",
          zIndex: 5,
        }}
      >
        <SectionLabel text="WHICH MODEL FOR WHAT" />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 6,
            marginTop: 24,
          }}
        >
          {C.taskRows.map((row, i) => (
            <TaskRow
              key={row.task}
              task={row.task}
              on={tasksOn}
              delay={i * 100}
            >
              {row.chips.map((chip) => (
                <ModelChip
                  key={chip.name}
                  name={chip.name}
                  bestFor={chip.bestFor}
                  glow={glowOn}
                />
              ))}
            </TaskRow>
          ))}
        </div>
      </div>

      {/* Inline keyframe for the model-chip ambient pulse. Scoped to B.3 via
          the unique animation name; safe to ship inline alongside the slide. */}
      <style>{`
        @keyframes b3-chip-glow {
          0%, 100% {
            box-shadow: 0 0 0 rgba(217,158,108,0);
            border-color: var(--copper-700);
          }
          50% {
            box-shadow: 0 0 10px rgba(217,158,108,0.35);
            border-color: var(--copper-500);
          }
        }
      `}</style>
    </div>
  );
}

// ───────────────────── SectionLabel ─────────────────────
// Small uppercase mono caption that anchors each half ("HOW YOU TALK TO IT"
// / "WHICH MODEL FOR WHAT"). Visual stand-in for a sub-header without
// committing to display-type, keeps the two halves balanced.

function SectionLabel({ text }: { text: string }) {
  return (
    <span
      style={{
        fontFamily: "var(--mono)",
        fontSize: 11,
        letterSpacing: "0.28em",
        color: "var(--copper-200)",
        textTransform: "uppercase",
      }}
    >
      {text}
    </span>
  );
}

// ───────────────────── DividerLine ─────────────────────
// 1px copper-700 vertical line. Draws in on load via stroke-dashoffset (pathLength)
// animation so the audience sees the stage take shape rather than appear all at once.

function DividerLine({
  on,
  x,
  top,
  bottom,
}: {
  on: boolean;
  x: number;
  top: number;
  bottom: number;
}) {
  const height = 720 - top - bottom;
  const containerStyle: CSSProperties = {
    position: "absolute",
    left: x - 1,
    top,
    width: 2,
    height,
    zIndex: 3,
    pointerEvents: "none",
  };
  return (
    <div data-testid="b3-divider" data-on={on ? "1" : "0"} style={containerStyle}>
      <svg
        width={2}
        height={height}
        viewBox={`0 0 2 ${height}`}
        style={{ display: "block", overflow: "visible" }}
        aria-hidden
      >
        <line
          x1={1}
          y1={0}
          x2={1}
          y2={height}
          stroke="var(--copper-700)"
          strokeWidth="1"
          strokeDasharray={height}
          strokeDashoffset={on ? 0 : height}
          style={{
            transition: "stroke-dashoffset 700ms var(--ease)",
          }}
        />
      </svg>
    </div>
  );
}

// ───────────────────── slide def ─────────────────────

export const b3Slide: SlideDef = {
  // 5 stepIndex values (0..4): three dial reveals, task fade, glow pulse.
  // Load animation (divider draw-in) is mount-driven and not a Space step.
  steps: 5,
  canonicalPose: 4,
  animationMode: "step-reveal",
  surface: "dark",
  section: "B",
  render: () => <B3MechanicsLandscape />,
};
