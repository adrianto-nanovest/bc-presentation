// C.4 — THE SHAPE OF THE NEW WORK (v4, 2026-05-13)
//
// Makes C.3's "Orchestrator" identity *concrete*. Shows exactly what the new
// shape of work looks like — Specify → Generate → Verify → Ship + iterate
// — plus the time-distribution shift that frames Verification as the new
// core skill:
//
//        BEFORE   10% Specify · 80% Generate · 10% Verify
//        AFTER    30% Specify · 20% Generate · 50% Verify
//
// The visual rhyme: in the V-shape work *descends* into Generate (AI takes
// over) and *ascends* back into Verify (human resumes), then bounces out
// to SHIP IT as a distinct state node. A straight dotted iterate line runs
// underneath the V from VERIFY back to SPECIFY — making the recursive
// nature explicit without curve clutter.
//
// Layout —
//   Header:    FigLabel + .slide-headline.small ("The Shape of the New Work.")
//              Both render INSTANTLY (no fade) to match C.1's header pattern.
//   V-diagram: positioned y:156–400 (below slide title at y:80–~130). The
//              diagram owns its own internal auto-stagger reveal, so the
//              outer container is fully opaque on mount.
//   Bars:      BEFORE y≈460, AFTER y≈540 (hidden until step 1)
//   Footer:    Bottom-left italic 14px (step 2) — B4 pattern
//
// Background — plain neutral-950 + dot-grid (diagrammatic tier; matches
// C.2 / C.3).
//
// Motion (3 steps total — steps: 3, canonicalPose: 2) —
//   step 0 (load):        Header (FIG + title) renders instantly. V-diagram
//                         runs its own AUTO-STAGGER reveal —
//                         T+200ms SPECIFY → T+700ms SPEC→GEN arrow + GEN →
//                         T+1200ms GEN→VER arrow + VERIFY → T+1700ms
//                         VER→SHIP arrow + SHIP IT node → T+2200ms ITERATE
//                         line + label. Total ≈ 2.6s.
//   step 1:               BEFORE + AFTER bars reveal simultaneously with
//                         segment scaleX 0→1 (180ms stagger per segment).
//                         V-diagram is already fully revealed.
//   step 2 (canon):       B4-style footer caption reveals — italic 14px,
//                         bottom-left, copper-keyword highlight.
import { useState } from "react";
import type { ReactNode } from "react";
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { highlight as KW } from "@/components/highlight";
import { VWorkflowDiagram } from "./components/VWorkflowDiagram";
import {
  TimeDistributionBar,
  type TimeDistributionSegment,
} from "./components/TimeDistributionBar";
import { c4Content as C } from "./content";

// ─── Stage geometry (1280×720) ───
const SIDE_PAD = 48;

// V-diagram occupies y:148–432 (284px tall band). It sits below the slide
// title (top:80, ~46px tall → bottom ~126) with breathing room. The extra
// vertical room (vs the original 244px band) lets the recursive iterate
// line sit cleanly below the GENERATE box without overlapping its caption.
const V_TOP = 148;
const V_BOTTOM = 432;
const V_HEIGHT = V_BOTTOM - V_TOP; // 284

// V-stage width cap — the SVG nodes are absolutely-positioned divs whose
// `left` is a percentage of the container width (not the SVG's rendered
// width). With the container at the full 1184px (1280 − 2×48), the SHIP
// label drifts past the right pad. Capping the diagram stage at 1000px
// keeps the V centered and SHIP comfortably inside the safe area.
const V_STAGE_MAX_W = 1080;

// BEFORE / AFTER bars
const BEFORE_BAR_TOP = 470;
const AFTER_BAR_TOP = 550;

// Footer band — B4 convention (left:48, bottom:50, italic 14px, max 760).
const FOOTER_LEFT = SIDE_PAD;
const FOOTER_BOTTOM = 50;
const FOOTER_MAX_W = 900;

export function C4VBounceWorkflow() {
  const { stepIndex } = useDeck();

  // Step gates (v4 — 3 steps total).
  //   step 0 (load) : FIG + title render instantly; V-diagram runs its
  //                   own internal auto-stagger reveal.
  //   step 1        : BEFORE + AFTER bars reveal (diagram fully revealed)
  //   step 2 (canon): B4-style footer reveals
  const barsOn = stepIndex >= 1;
  const footerOn = stepIndex >= 2;
  // Iterate line is part of the diagram; its visibility timing is
  // owned by VWorkflowDiagram's internal reveal sequence.
  const showLoopBack = true;

  // Mutable V-nodes from content.ts.
  const vNodes = C.nodes;

  // Build segment specs. Colors per spec:
  //   BEFORE: Specify copper-300, Generate copper-700 (dominant), Verify copper-300 dim
  //   AFTER:  Specify copper-400, Generate copper-700 dim, Verify copper-400 (dominant)
  const beforeSegments: TimeDistributionSegment[] = [
    { label: "Specify", percent: C.before.specifyPct, color: "var(--copper-300)" },
    { label: "Generate", percent: C.before.generatePct, color: "var(--copper-700)" },
    { label: "Verify", percent: C.before.verifyPct, color: "var(--copper-300)" },
  ];
  const afterSegments: TimeDistributionSegment[] = [
    { label: "Specify", percent: C.after.specifyPct, color: "var(--copper-400)" },
    { label: "Generate", percent: C.after.generatePct, color: "var(--copper-700)" },
    { label: "Verify", percent: C.after.verifyPct, color: "var(--copper-400)" },
  ];

  return (
    <div
      data-testid="slide-c4"
      style={{ position: "absolute", inset: 0, overflow: "hidden" }}
    >
      {/* Background — plain neutral-950 + dot-grid. */}
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

      {/* FIG label — canonical top-left position, via shared component.
          Renders instantly (no fade) — matches C.1's header pattern. */}
      <FigLabel section="C" num={4} label={C.figLabel} />

      {/* Slide title — canonical .slide-headline.small at top:80 left:48.
          Renders instantly (no fade). KW highlights surface "Shape" and
          "New Work" with copper italic. */}
      <div className="slide-headline-row">
        <h1 className="slide-headline small">{KW(C.headline, C.headlineKw)}</h1>
      </div>

      {/* ───────────── V-workflow diagram ─────────────
          Positioned y:156–400, capped at V_STAGE_MAX_W and centered. The
          component owns its own internal coordinate space + internal
          auto-stagger reveal — no outer opacity fade is needed. */}
      <div
        data-testid="c4-v-stage"
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          top: V_TOP,
          width: `calc(100% - ${SIDE_PAD * 2}px)`,
          maxWidth: V_STAGE_MAX_W,
          height: V_HEIGHT,
          zIndex: 5,
        }}
      >
        <VWorkflowDiagram
          nodes={vNodes}
          humanCaption={C.humanCaption}
          aiCaption={C.aiCaption}
          stepIndex={stepIndex}
          showLaneHairline={true}
          showLoopBack={showLoopBack}
        />
      </div>

      {/* ───────────── BEFORE / AFTER bars (step 2) ───────────── */}
      <div
        data-testid="c4-before-row"
        style={{
          position: "absolute",
          left: SIDE_PAD,
          right: SIDE_PAD,
          top: BEFORE_BAR_TOP,
          display: "flex",
          justifyContent: "center",
          opacity: barsOn ? 1 : 0,
          transition: "opacity 400ms var(--ease)",
          zIndex: 5,
        }}
      >
        <HoverableTimeDistributionBar
          label="BEFORE"
          labelColor="var(--neutral-400)"
          segments={beforeSegments}
          on={barsOn}
          testId="c4-before-bar"
        />
      </div>
      <div
        data-testid="c4-after-row"
        style={{
          position: "absolute",
          left: SIDE_PAD,
          right: SIDE_PAD,
          top: AFTER_BAR_TOP,
          display: "flex",
          justifyContent: "center",
          opacity: barsOn ? 1 : 0,
          transition: "opacity 400ms var(--ease)",
          zIndex: 5,
        }}
      >
        <HoverableTimeDistributionBar
          label="AFTER"
          labelColor="var(--copper-400)"
          segments={afterSegments}
          on={barsOn}
          testId="c4-after-bar"
        />
      </div>

      {/* ───────────── B4-style footer (step 3) ─────────────
          Bottom-left italic 14px, copper-keyword highlight. Replaces the
          prior anchor line (Option A — footer is the slide's closer). */}
      <div
        data-testid="c4-footer"
        style={{
          position: "absolute",
          left: FOOTER_LEFT,
          bottom: FOOTER_BOTTOM,
          maxWidth: FOOTER_MAX_W,
          zIndex: 6,
        }}
      >
        <p
          data-testid="c4-footer-text"
          style={{
            margin: 0,
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontSize: 14,
            color: "var(--neutral-400)",
            lineHeight: 1.4,
            opacity: footerOn ? 1 : 0,
            transform: footerOn ? "translateY(0)" : "translateY(6px)",
            transition:
              "opacity 500ms var(--ease), transform 500ms var(--ease)",
          }}
        >
          {KW(C.footer, C.footerKw)}
        </p>
      </div>
    </div>
  );
}

// ─────────── Bar with per-segment hover (% glow + 1px lift) ───────────
//
// Wraps TimeDistributionBar; positions an absolutely-positioned hover
// overlay on top of the bar with three transparent zones (one per segment).
// Hovering a zone elevates the underlying segment via a slight lift
// transform and brightens the % caption beneath.
function HoverableTimeDistributionBar(props: {
  label: string;
  labelColor: string;
  segments: readonly TimeDistributionSegment[];
  on: boolean;
  testId?: string;
}): ReactNode {
  const { label, labelColor, segments, on, testId } = props;
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  return (
    <div
      data-testid={testId ? `${testId}-wrap` : undefined}
      style={{ position: "relative", width: "100%", maxWidth: 1000 }}
    >
      <TimeDistributionBar
        label={label}
        labelColor={labelColor}
        segments={segments}
        on={on}
        trackWidth={820}
        testId={testId}
      />

      {/* Hover overlay — three flex zones aligned over the bar track. The
          row label (90px + 18px gap) sits to the left, so the zones start at
          offset 108px and span the 820px track. */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: 108,
          top: 0,
          width: 820,
          height: 32,
          display: "flex",
          pointerEvents: on ? "auto" : "none",
        }}
      >
        {segments.map((seg, i) => (
          <div
            key={`hover-${seg.label}-${i}`}
            data-testid={`${testId}-hover-${seg.label.toLowerCase()}`}
            onMouseEnter={() => setHoveredIdx(i)}
            onMouseLeave={() => setHoveredIdx(null)}
            style={{
              flex: `0 0 ${seg.percent}%`,
              height: "100%",
              cursor: "default",
              transform:
                hoveredIdx === i ? "translateY(-1px)" : "translateY(0)",
              transition: "transform 180ms var(--ease)",
              boxShadow:
                hoveredIdx === i
                  ? "0 0 0 1px var(--copper-400), 0 0 12px rgba(184,110,61,0.35)"
                  : "none",
              borderRadius: 1,
            }}
          />
        ))}
      </div>

      {/* Hover-driven % glow overlay — sits over the segment captions row
          beneath the bar track. The captions are flex children at the
          assigned percent; we mirror that to highlight the hovered one. */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: 108,
          top: 38,
          width: 820,
          display: "flex",
          pointerEvents: "none",
        }}
      >
        {segments.map((seg, i) => (
          <div
            key={`pct-glow-${seg.label}-${i}`}
            style={{
              flex: `0 0 ${seg.percent}%`,
              display: "flex",
              justifyContent: "center",
              paddingTop: 2,
              opacity: hoveredIdx === i ? 1 : 0,
              transition: "opacity 180ms var(--ease)",
            }}
          >
            <span
              style={{
                fontFamily: "var(--display)",
                fontSize: 18,
                color: "var(--copper-300)",
                lineHeight: 1,
                textShadow: "0 0 10px rgba(184,110,61,0.55)",
              }}
            >
              {seg.percent}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ───────────────────── slide def ─────────────────────

// Step count = 3 (step values 0..2): step 0 = load (full diagram visible),
// step 1 = BEFORE/AFTER bars, step 2 (canonical) = B4 footer.
export const c4Slide: SlideDef = {
  steps: 3,
  canonicalPose: 2,
  animationMode: "step-reveal",
  surface: "dark",
  section: "C",
  render: () => <C4VBounceWorkflow />,
};
