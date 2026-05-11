// C.4 — THE V-BOUNCE WORKFLOW
//
// Makes C.3's "Orchestrator" identity *concrete*. Shows exactly what the new
// shape of work looks like — Specify → Generate → Verify → Ship — and the
// time-distribution shift that makes it a productivity multiplier:
//
//        BEFORE   10% Specify · 80% Generate · 10% Verify
//        AFTER    30% Specify · 20% Generate · 50% Verify
//
// The visual rhyme: in the V-shape work *descends* into Generate (AI takes
// over) and *ascends* back into Verify (human resumes). The dominant 80%
// Generate block in BEFORE collapses into a slim copper-700 in AFTER while
// Verify expands into a dominant 50% copper-400 block. The two bars stay
// visible simultaneously at canonical pose — the contrast itself is the
// emotional payoff.
//
// Layout —
//   TOP HALF (~50%):    V-workflow diagram (Specify → Generate → Verify → Ship)
//   BOTTOM HALF (~50%): BEFORE bar (10/80/10), AFTER bar (30/20/50)
//   BOTTOM:             Italic punchline + copper anchor line
//
// Background — plain neutral-950 + dot-grid (diagrammatic tier; matches
// C.2 / C.3).
//
// Motion (6 steps, canonicalPose: 5) —
//   mount:               FIG label fades in (200ms)
//   stepIndex 0:         SPECIFY node + connecting line draws toward
//                        GENERATE (600ms)
//   stepIndex 1:         GENERATE node + connecting line draws toward
//                        VERIFY (600ms)
//   stepIndex 2:         VERIFY node + SHIP arrow extends rightward (600ms)
//   stepIndex 3:         BEFORE bar — segments grow left-to-right with
//                        stagger; 80% copper-700 dominates (800ms total)
//   stepIndex 4:         AFTER bar — segments grow left-to-right; 50%
//                        copper-400 Verify dominates. BEFORE stays visible
//                        for contrast (800ms total)
//   stepIndex 5 (canon): Punchline + anchor italic fade in (600ms)
import { useEffect, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { VWorkflowDiagram } from "./components/VWorkflowDiagram";
import {
  TimeDistributionBar,
  type TimeDistributionSegment,
} from "./components/TimeDistributionBar";
import { c4Content as C } from "./content";

// ─── Stage geometry (1280×720) ───
const STAGE_W = 1280;
const SIDE_PAD = 64;

// Top half: V-diagram occupies ~290px of vertical space starting just below
// the FIG band. Bottom half: bars stacked above the punchline / anchor.
const FIG_BOTTOM = 100;
const V_TOP = FIG_BOTTOM + 12;       // ~112
const V_HEIGHT = 280;                // V-diagram band
const BARS_TOP = V_TOP + V_HEIGHT + 18; // ~410
const BARS_GAP = 16;                 // vertical gap between BEFORE and AFTER
const PUNCHLINE_TOP = 590;
const ANCHOR_TOP = 642;

export function C4VBounceWorkflow() {
  const { stepIndex } = useDeck();

  // Mount-driven FIG fade (no Space needed).
  const [mountedOn, setMountedOn] = useState(false);
  useEffect(() => {
    const t = window.setTimeout(() => setMountedOn(true), 100);
    return () => window.clearTimeout(t);
  }, []);

  // Step gates.
  // stepIndex 0/1/2 → V-diagram beats (driven inside VWorkflowDiagram by
  //                   passing stepIndex directly).
  // stepIndex 3     → BEFORE bar grows.
  // stepIndex 4     → AFTER bar grows.
  // stepIndex 5     → Punchline + anchor fade in.
  const beforeBarOn = stepIndex >= 3;
  const afterBarOn = stepIndex >= 4;
  const punchlineOn = stepIndex >= 5;
  const anchorOn = stepIndex >= 5;

  // The V-diagram only cares about steps 0..2. Clamp so once we move into the
  // bars (stepIndex ≥ 3) the V freezes in its canonical pose rather than
  // continuing to "advance".
  const vStepIndex = Math.min(stepIndex, 2);

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

      <FigLabel section="C" num={4} label={C.figLabel} />

      {/* ───────────── TOP — V-workflow diagram ───────────── */}
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
          nodes={C.nodes}
          humanCaption={C.humanCaption}
          aiCaption={C.aiCaption}
          stepIndex={vStepIndex}
        />
      </div>

      {/* ───────────── MIDDLE — BEFORE / AFTER bars ───────────── */}
      <div
        data-testid="c4-bars"
        style={{
          position: "absolute",
          left: SIDE_PAD,
          right: SIDE_PAD,
          top: BARS_TOP,
          display: "flex",
          flexDirection: "column",
          gap: BARS_GAP,
          alignItems: "center",
          zIndex: 5,
        }}
      >
        <TimeDistributionBar
          label="BEFORE"
          labelColor="var(--neutral-400)"
          segments={beforeSegments}
          on={beforeBarOn}
          trackWidth={Math.min(880, STAGE_W - SIDE_PAD * 2 - 140)}
          testId="c4-before-bar"
        />
        <TimeDistributionBar
          label="AFTER"
          labelColor="var(--copper-400)"
          segments={afterSegments}
          on={afterBarOn}
          trackWidth={Math.min(880, STAGE_W - SIDE_PAD * 2 - 140)}
          testId="c4-after-bar"
        />
      </div>

      {/* ───────────── BOTTOM — punchline + anchor ───────────── */}
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
            "opacity 600ms var(--ease), transform 600ms var(--ease)",
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
            "opacity 600ms var(--ease) 120ms, transform 600ms var(--ease) 120ms",
          zIndex: 6,
        }}
      >
        <AnchorLine text={C.anchor} keyword={C.anchorKw[0] ?? "productivity multiplier"} />
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
// "This is the productivity multiplier."
//   • Source Serif 4 italic ~22px, copper-400
//   • `productivity multiplier` is the keyword — rendered italic with the
//     full line in copper-400 since the entire phrase is the emphasis.
function AnchorLine({
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
    fontSize: 22,
    color: "var(--copper-400)",
    lineHeight: 1.3,
    fontWeight: 400,
    margin: 0,
    textAlign: "center",
  };
  if (idx < 0) {
    return <p style={baseStyle}>{text}</p>;
  }
  const head = text.slice(0, idx);
  const tail = text.slice(idx + keyword.length);
  return (
    <p style={baseStyle} data-testid="c4-anchor-text">
      {head}
      <em
        data-testid="c4-anchor-keyword"
        style={{
          color: "var(--copper-300)",
          fontStyle: "italic",
          fontFamily: "var(--serif)",
          borderBottom: "1px solid var(--copper-500)",
          paddingBottom: 1,
        }}
      >
        {keyword}
      </em>
      {tail}
    </p>
  );
}

// ───────────────────── slide def ─────────────────────

export const c4Slide: SlideDef = {
  steps: 6,
  canonicalPose: 5,
  animationMode: "step-reveal",
  surface: "dark",
  section: "C",
  render: () => <C4VBounceWorkflow />,
};
