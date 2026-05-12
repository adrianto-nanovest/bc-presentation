// C.4 — THE SHAPE OF THE NEW WORK
//
// Makes C.3's "Orchestrator" identity *concrete*. Shows exactly what the new
// shape of work looks like — Specify → Generate → Verify → Ship — plus the
// time-distribution shift that frames Verification as the new core skill:
//
//        BEFORE   10% Specify · 80% Generate · 10% Verify
//        AFTER    30% Specify · 20% Generate · 50% Verify
//
// The visual rhyme: in the V-shape work *descends* into Generate (AI takes
// over) and *ascends* back into Verify (human resumes). A dotted recursive
// loop-back arrow from VERIFY back to SPECIFY (revealed at step 3) converts
// the V from a one-pass diagram into a recursive shape — matching the
// research's strong claim that AI work is iterative.
//
// Layout —
//   Header:    FigLabel + .slide-headline.small ("The Shape of the New Work.")
//   V-diagram: positioned y:156–400 (below slide title at y:80–~130)
//   Bars:      BEFORE y≈480, AFTER y≈530
//   Bottom:    Punchline y≈610, Anchor y≈660
//
// Background — plain neutral-950 + dot-grid (diagrammatic tier; matches
// C.2 / C.3).
//
// Motion (5 steps, canonicalPose: 4) — collapsed from 6 by chunking the V's
// peaks into one beat —
//   load (mount-driven):  FIG + title + lane hairline fade in (400ms)
//   stepIndex 1:          Both V-peak nodes (SPECIFY + VERIFY) reveal
//                         simultaneously + both diagonal arrows draw down
//                         toward GENERATE position (700ms)
//   stepIndex 2:          GENERATE node + trough reveal; SHIP arrow extends
//                         right from VERIFY (600ms)
//   stepIndex 3:          Dotted recursive loop-back arrow draws
//                         (pathLength 0→1, 500ms); `iterate` label fades
//                         200ms after path completes
//   stepIndex 4 (canon):  BEFORE + AFTER bars grow simultaneously (segment
//                         stagger 180ms); punchline + anchor line fade
//                         200ms after bars; 4s ambient pulse on `core skill`
import { useEffect, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { AmbientPulse } from "@/components/AmbientPulse";
import { VWorkflowDiagram } from "./components/VWorkflowDiagram";
import {
  TimeDistributionBar,
  type TimeDistributionSegment,
} from "./components/TimeDistributionBar";
import { c4Content as C } from "./content";

// ─── Stage geometry (1280×720) ───
const SIDE_PAD = 48;

// V-diagram occupies y:156–400 (244px tall band). It sits below the slide
// title (top:80, ~46px tall → bottom ~126) with breathing room.
const V_TOP = 156;
const V_BOTTOM = 400;
const V_HEIGHT = V_BOTTOM - V_TOP; // 244

// BEFORE / AFTER bars
const BEFORE_BAR_TOP = 460;
const AFTER_BAR_TOP = 540;

// Bottom text lines
const PUNCHLINE_TOP = 622;
const ANCHOR_TOP = 666;

export function C4VBounceWorkflow() {
  const { stepIndex } = useDeck();

  // Mount-driven FIG + title + lane hairline fade (step-0 "load" pose).
  const [mountedOn, setMountedOn] = useState(false);
  useEffect(() => {
    const t = window.setTimeout(() => setMountedOn(true), 100);
    return () => window.clearTimeout(t);
  }, []);

  // Step gates.
  //   step 0 (load) : FIG + title + lane hairline
  //   step 1        : V peaks reveal (SPECIFY + VERIFY + both diagonals)
  //   step 2        : GENERATE + SHIP
  //   step 3        : dotted loop-back arrow draws
  //   step 4 (canon): bars + punchline + anchor + ambient pulse
  const barsOn = stepIndex >= 4;
  const punchlineOn = stepIndex >= 4;
  const anchorOn = stepIndex >= 4;
  const pulseOn = stepIndex >= 4;
  const showLoopBack = stepIndex >= 3;

  // No clamp — VWorkflowDiagram is fully drawn by step 2; for steps ≥ 3 the
  // diagram simply holds its canonical pose and the loop-back is rendered as
  // an overlay. Passing stepIndex directly lets the diagram know the deck has
  // advanced (required because `showLoopBack` is gated on stepIndex ≥ 3).
  const vStepIndex = stepIndex;

  // Mutable V-nodes: per spec §3.4 we drop the inline "→ SHIP" arrow prefix
  // (the diagram renders its own SHIP marker) and surface the
  // review/validate/judge caption already canonical in content.ts.
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

  // FIG + title fade-in (no lift, just opacity over 400ms).
  const headerFade: CSSProperties = {
    opacity: mountedOn ? 1 : 0,
    transition: "opacity 400ms var(--ease)",
    willChange: "opacity",
  };

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

      {/* FIG label — canonical top-left position, via shared component. */}
      <div style={headerFade}>
        <FigLabel section="C" num={4} label={C.figLabel} />
      </div>

      {/* Slide title — canonical .slide-headline.small at top:80 left:48. */}
      <div className="slide-headline-row" style={headerFade}>
        <h1 className="slide-headline small">{C.headline}</h1>
      </div>

      {/* ───────────── V-workflow diagram ─────────────
          Positioned y:156–400. The component owns its own internal
          coordinate space (1000×400 viewBox) — this wrapper just sets the
          bounding box of the V's stage area. */}
      <div
        data-testid="c4-v-stage"
        style={{
          position: "absolute",
          left: SIDE_PAD,
          right: SIDE_PAD,
          top: V_TOP,
          height: V_HEIGHT,
          opacity: mountedOn ? 1 : 0,
          transition: "opacity 400ms var(--ease)",
          zIndex: 5,
        }}
      >
        <VWorkflowDiagram
          nodes={vNodes}
          humanCaption={C.humanCaption}
          aiCaption={C.aiCaption}
          stepIndex={vStepIndex}
          showLaneHairline={true}
          showLoopBack={showLoopBack}
        />
      </div>

      {/* ───────────── BEFORE / AFTER bars ───────────── */}
      <div
        data-testid="c4-before-row"
        style={{
          position: "absolute",
          left: SIDE_PAD,
          right: SIDE_PAD,
          top: BEFORE_BAR_TOP,
          display: "flex",
          justifyContent: "center",
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

      {/* ───────────── BOTTOM — punchline + anchor ─────────────
          Both fade in 200ms after bars (segment stagger ~620ms total). */}
      <div
        data-testid="c4-punchline"
        style={{
          position: "absolute",
          left: SIDE_PAD,
          right: SIDE_PAD,
          top: PUNCHLINE_TOP,
          display: "flex",
          justifyContent: "center",
          opacity: punchlineOn ? 1 : 0,
          transform: punchlineOn ? "translateY(0)" : "translateY(8px)",
          transition:
            "opacity 600ms var(--ease) 800ms, transform 600ms var(--ease) 800ms",
          zIndex: 6,
        }}
      >
        <Punchline text={C.punchline} keyword={C.punchlineKw[0] ?? "how to type it"} />
      </div>

      <div
        data-testid="c4-anchor"
        style={{
          position: "absolute",
          left: SIDE_PAD,
          right: SIDE_PAD,
          top: ANCHOR_TOP,
          display: "flex",
          justifyContent: "center",
          opacity: anchorOn ? 1 : 0,
          transform: anchorOn ? "translateY(0)" : "translateY(8px)",
          transition:
            "opacity 600ms var(--ease) 1000ms, transform 600ms var(--ease) 1000ms",
          zIndex: 6,
        }}
      >
        <AnchorLine
          text={C.anchor}
          coreSkillKeyword={C.coreSkillKw[0] ?? "core skill"}
          pulse={pulseOn}
        />
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
  // Compose a copy of segments — when on and hovered, brighten the matching
  // segment by switching to copper-300 from copper-700 (or keep original).
  // We keep colors stable here; hover effect is delivered via the absolutely-
  // positioned overlay zones instead so we don't fight TimeDistributionBar.
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

// ───────────────────── Punchline ─────────────────────
// "More time on what and why. Less time on how to type it."
//   • Source Serif 4 italic ~24px, neutral-200
//   • `how to type it` rendered italic copper-400
function Punchline({
  text,
  keyword,
}: {
  text: string;
  keyword: string;
}): ReactNode {
  const idx = text.indexOf(keyword);
  const baseStyle: CSSProperties = {
    fontFamily: "var(--serif)",
    fontStyle: "italic",
    fontSize: 24,
    color: "var(--neutral-200)",
    lineHeight: 1.35,
    fontWeight: 400,
    margin: 0,
    textAlign: "center",
    maxWidth: 980,
  };
  if (idx < 0) {
    return <p style={baseStyle}>{text}</p>;
  }
  const head = text.slice(0, idx);
  const tail = text.slice(idx + keyword.length);
  return (
    <p style={baseStyle} data-testid="c4-punchline-text">
      {head}
      <em
        data-testid="c4-punchline-keyword"
        style={{
          color: "var(--copper-400)",
          fontStyle: "italic",
          fontFamily: "var(--serif)",
        }}
      >
        {keyword}
      </em>
      {tail}
    </p>
  );
}

// ───────────────────── AnchorLine ─────────────────────
// "Verification is the new core skill."
//   • Source Serif 4 italic ~22px, copper-400 (entire phrase)
//   • `core skill` keyword gets a copper-500 underline + 4s ambient pulse
//     at canonical pose.
function AnchorLine({
  text,
  coreSkillKeyword,
  pulse,
}: {
  text: string;
  coreSkillKeyword: string;
  pulse: boolean;
}): ReactNode {
  const baseStyle: CSSProperties = {
    fontFamily: "var(--serif)",
    fontStyle: "italic",
    fontSize: 22,
    color: "var(--copper-400)",
    lineHeight: 1.3,
    fontWeight: 400,
    margin: 0,
    textAlign: "center",
  };

  const idx = text.indexOf(coreSkillKeyword);
  if (idx < 0) {
    return (
      <p style={baseStyle} data-testid="c4-anchor-text">
        {text}
      </p>
    );
  }
  const head = text.slice(0, idx);
  const tail = text.slice(idx + coreSkillKeyword.length);

  const accent = (
    <em
      data-testid="c4-anchor-keyword"
      style={{
        fontStyle: "italic",
        fontFamily: "var(--serif)",
        color: "var(--copper-400)",
        textDecoration: "underline",
        textDecorationColor: "var(--copper-500)",
        textUnderlineOffset: "4px",
        textDecorationThickness: "1px",
      }}
    >
      {coreSkillKeyword}
    </em>
  );

  return (
    <p style={baseStyle} data-testid="c4-anchor-text">
      {head}
      {pulse ? (
        <AmbientPulse periodSeconds={4} keyword={coreSkillKeyword}>
          {accent}
        </AmbientPulse>
      ) : (
        accent
      )}
      {tail}
    </p>
  );
}

// ───────────────────── slide def ─────────────────────

export const c4Slide: SlideDef = {
  steps: 5,
  canonicalPose: 4,
  animationMode: "step-reveal",
  surface: "dark",
  section: "C",
  render: () => <C4VBounceWorkflow />,
};
