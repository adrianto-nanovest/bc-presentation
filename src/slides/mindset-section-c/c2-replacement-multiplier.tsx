// C.2 — REPLACEMENT → MULTIPLIER (60:40 split, 2×2 leverage grid)
//
// Section C's empathetic "permission slip" slide. v3 rework (Task 24)
// restructures the step model around the leverage box:
//
//   LEFT pane (700px) — TWO labelled sub-sections:
//     1. THE STARTING LINE   recognition quote (3 lines, Source Serif italic
//                            22px, final clause in copper-300 italic).
//     2. THE TURN            "AI will replace me." (stagger-entry, then
//                            strikethrough). Below it, a copper-bordered
//                            LEVERAGE BOX with "Someone using AI will." +
//                            italic "So I learn to use it." The box pulses
//                            (4s breathing copper glow) once we reach the
//                            footer step.
//
//   RIGHT pane (480px) — THE LEVERAGE 2×2 grid of 4 B3ParamTile cards:
//     LEVERAGE | VELOCITY            (each card stretches its grid cell via
//     JUDGMENT | REACH                style={{ width: "100%", height: "100%" }}
//                                     and allowBulletWrap for the few long
//                                     bullets that exceed one line at ~225px.)
//
//   FOOTER (new in v3, B.4-style):
//     bottom-left italic 14px caption that quotes the new
//     c2Content.footer — "Move from fear to fluency. The cost of trying
//     is now nearly zero." — with KW() highlights.
//
// Header convention (post 2026-05-13 rework):
//   FIG + .slide-headline.small (with KW() highlights on "Fear" / "Leverage").
//
// Motion (5 steps, canonicalPose: 4) —
//   stepIndex 0 (load):   FIG + slide title + LEFT TOP recognition fade in.
//   stepIndex 1:          LEFT BOTTOM — THE TURN sub-title + dramatic
//                         single-phrase entry of "AI will replace me."
//                         (translateY 20→0 over 500ms, opacity 0→1 over
//                         400ms). Strikethrough NOT yet active.
//   stepIndex 2:          COMBINED reveal:
//                          T+0    copper-700 strikethrough draws (500ms).
//                          T+300  CopperArrow pathLength 0→1 (400ms).
//                          T+600  leverage BOX fades in (border + bg
//                                 darken; "Someone using AI will." text);
//                                 italic "So I learn to use it." 250ms
//                                 after. The leverage BOX picks up the
//                                 c2BoxPulse 4s ease-in-out infinite glow
//                                 the moment it appears.
//   stepIndex 3:          RIGHT pane — THE LEVERAGE sub-title + 4 cards
//                         in 2×2 grid fade-in-from-below with 120ms
//                         stagger; SVG card animations begin looping.
//   stepIndex 4 (canon):  Footer caption fades in.
import { useEffect, useState } from "react";
import type { ComponentType, CSSProperties, ReactNode } from "react";
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { StrikethroughAnimator } from "@/components/StrikethroughAnimator";
import { highlight as KW } from "@/components/highlight";
import { CopperArrow } from "./components/CopperArrow";
import { B3ParamTile } from "@/slides/landscape-section-b/components/B3ParamTile";
import {
  LeverageAnim,
  VelocityAnim,
  JudgmentAnim,
  ReachAnim,
} from "./components/C2CardAnims";
import { c2Content as C } from "./content";

// ───────────────────── slide ─────────────────────

// Map content.ts `animKey` → matching SVG animation component. Wave 1 added
// REACH as the 4th card so the lookup grows from 3 → 4 entries.
const animByKey: Record<string, ComponentType> = {
  leverage: LeverageAnim,
  velocity: VelocityAnim,
  judgment: JudgmentAnim,
  reach: ReachAnim,
};

// Sub-title style shared by left-top, left-bottom, and right-pane headings.
// Mono caps 11px copper-300 0.22em uppercase — matches the canonical small
// labels used across Section C (cf. C.3 EXECUTOR/ORCHESTRATOR, C.4 stage
// labels).
const SUBTITLE_STYLE: CSSProperties = {
  fontFamily: "var(--mono)",
  fontSize: 11,
  letterSpacing: "0.22em",
  color: "var(--copper-300)",
  textTransform: "uppercase",
  lineHeight: 1,
  margin: 0,
};

// Hairline beneath each sub-title — copper-700 at 30% (LEFT) or 40% (RIGHT).
// Width controlled by `widthPct` prop on the helper below.
function SubTitleBlock({
  label,
  hairlineWidthPct,
}: {
  label: string;
  hairlineWidthPct: number;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <span style={SUBTITLE_STYLE}>{label}</span>
      <div
        aria-hidden
        style={{
          height: 1,
          width: `${hairlineWidthPct}%`,
          background: "var(--copper-700)",
          opacity: 0.55,
        }}
      />
    </div>
  );
}

export function C2ReplacementMultiplier() {
  const { stepIndex } = useDeck();

  // Mount-driven flag so the LEFT TOP recognition block visibly fades + lifts
  // in on first show. `loaded` (stepIndex >= 0) is always true at mount so it
  // can't drive a real animation — `mounted` flips one tick later.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = window.setTimeout(() => setMounted(true), 80);
    return () => window.clearTimeout(t);
  }, []);

  // Step gates. stepIndex 0 = load pose (FIG + title + LEFT TOP block).
  const fearOn = stepIndex >= 1;
  // Step 2 fires the combined strike → arrow → leverage-box reveal.
  const combinedOn = stepIndex >= 2;
  const cardsOn = stepIndex >= 3;
  const footerOn = stepIndex >= 4;
  const pulseOn = stepIndex >= 2;

  // Shared reveal helper. easeOutExpo curve comes from --ease.
  const liftStyle = (
    on: boolean,
    lift = 12,
    duration = 500,
    delay = 0,
  ): CSSProperties => ({
    opacity: on ? 1 : 0,
    transform: on ? "translateY(0)" : `translateY(${lift}px)`,
    transition: `opacity ${duration}ms var(--ease) ${delay}ms, transform ${duration}ms var(--ease) ${delay}ms`,
    willChange: "opacity, transform",
  });

  // Header (FIG + slide title) renders instantly — no mount-driven fade. The
  // recognition quote below uses `liftStyle(mounted, …)` so it visibly fades
  // in on first show (one tick after mount).

  // Dramatic single-phrase entry for the fear line — translateY 20→0 over
  // 500ms + opacity 0→1 over 400ms. Specified as the acceptable variant in
  // Task 24.
  const fearEntry: CSSProperties = {
    opacity: fearOn ? 1 : 0,
    transform: fearOn ? "translateY(0)" : "translateY(20px)",
    transition:
      "opacity 400ms var(--ease), transform 500ms var(--ease)",
    willChange: "opacity, transform",
  };

  return (
    <div
      data-testid="slide-c2"
      style={{ position: "absolute", inset: 0, overflow: "hidden" }}
    >
      {/* Background — neutral-950 base + subtle 24px dot grid. Matches B.3
          / C.1 / C.3 / C.4 / C.5 — the standard dark surface used everywhere
          in Section C except the Bridge. */}
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

      {/* Canonical FIG label — `<FigLabel>` defaults to top:36 left:48.
          Renders instantly with no opacity gate (Task 30 v4). */}
      <FigLabel section="C" num={2} label={C.figLabel} />

      {/* Canonical slide title — `.slide-headline.small` at top:80 left:48.
          KW() highlights "Fear" + "Leverage" per c2Content.headlineKw.
          Renders instantly with no opacity gate (Task 30 v4). */}
      <div className="slide-headline-row">
        <h1 className="slide-headline small">{KW(C.headline, C.headlineKw)}</h1>
      </div>

      {/* ════════════════════════════════════════════════════════════════
          LEFT PANE — 60% (left:48 top:156 width:700 bottom:80)
          Two stacked sub-sections: THE STARTING LINE (recognition) and
          THE TURN (fear → leverage flow).
          ════════════════════════════════════════════════════════════════ */}
      <div
        data-testid="c2-left-pane"
        style={{
          position: "absolute",
          left: 48,
          top: 156,
          width: 700,
          bottom: 80,
          display: "flex",
          flexDirection: "column",
          // Space between the two sub-sections.
          gap: 28,
          zIndex: 5,
        }}
      >
        {/* ───────── LEFT TOP: THE STARTING LINE ─────────
            Recognition quote — three Source Serif italic 22px lines. Final
            clause copper-300. Fades in on step 0. */}
        <div
          data-testid="c2-starting-line"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            ...liftStyle(mounted, 6, 400),
          }}
        >
          <SubTitleBlock label="THE STARTING LINE" hairlineWidthPct={30} />
          <RecognitionLineInline italicClause={C.recognitionItalicClause} />
        </div>

        {/* ───────── LEFT BOTTOM: THE TURN ─────────
            v4 layout (Task 30) — vertical centered stack:
              sub-title → fear BOX → downward arrow → leverage BOX.
            Fear line (step 1) + combined strike/arrow/box reveal (step 2).
            The leverage stack picks up a slow copper pulse on step 4. */}
        <div
          data-testid="c2-the-turn"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 14,
          }}
        >
          <div style={{ ...liftStyle(fearOn, 6, 400), alignSelf: "stretch" }}>
            <SubTitleBlock label="THE TURN" hairlineWidthPct={30} />
          </div>

          {/* FEAR BOX — "AI will replace me." now wrapped in a copper-
              bordered container that mirrors the leverage box below.
              Strikethrough still draws across the text on step 2. */}
          <div
            data-testid="c2-fear-box"
            style={{
              display: "block",
              width: 480,
              padding: "16px 20px",
              border: "1px solid var(--copper-700)",
              borderRadius: 2,
              background: "rgba(20,12,6,0.4)",
              ...fearEntry,
            }}
          >
            <div
              data-testid="c2-fear"
              style={{
                fontFamily: "var(--serif)",
                fontStyle: "italic",
                fontSize: 28,
                color: "var(--neutral-100)",
                lineHeight: 1.15,
                fontWeight: 400,
                textAlign: "center",
              }}
            >
              <StrikethroughAnimator
                active={combinedOn}
                duration={500}
                thickness={4}
              >
                {C.fearPanel}
              </StrikethroughAnimator>
            </div>
          </div>

          {/* DOWNWARD ARROW — vertical copper arrow centered between the
              two boxes. Draws after the strikethrough (T+300ms inside
              step 2). The outer wrapper matches the 480-wide box so the
              arrow lands on the boxes' horizontal centerline. */}
          <div
            style={{
              width: 480,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              data-testid="c2-arrow"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                opacity: combinedOn ? 1 : 0,
                transition: "opacity 220ms var(--ease) 300ms",
                height: 40,
                width: 28,
              }}
            >
              <CopperArrow
                direction="down"
                on={combinedOn}
                length={40}
                duration={400}
                delay={300}
              />
            </div>
          </div>

          {/* LEVERAGE BOX — copper-bordered container that fades in 600ms
              after the combined reveal begins. Contains the two-line
              leverage stack. Picks up the c2BoxPulse animation the moment
              it appears (step 2).

              Box style: 1px solid copper-700 border, 16px 20px padding,
              rgba(20,12,6,0.4) background, fixed 480 width to match the
              fear box above; inner text is center-aligned. */}
          <div
            data-testid="c2-leverage-box"
            style={{
              display: "block",
              width: 480,
              padding: "16px 20px",
              border: "1px solid var(--copper-700)",
              borderRadius: 2,
              background: "rgba(20,12,6,0.4)",
              opacity: combinedOn ? 1 : 0,
              transform: combinedOn ? "translateY(0)" : "translateY(8px)",
              transition:
                "opacity 500ms var(--ease) 600ms, transform 500ms var(--ease) 600ms",
              animation: pulseOn
                ? "c2BoxPulse 4s ease-in-out infinite"
                : "none",
              willChange: "opacity, transform, box-shadow, border-color",
            }}
          >
            <div
              data-testid="c2-leverage"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 6,
                minWidth: 0,
              }}
            >
              <div
                style={{
                  fontFamily: "var(--serif)",
                  fontSize: 24,
                  color: "var(--neutral-100)",
                  lineHeight: 1.2,
                  fontWeight: 400,
                  textAlign: "center",
                }}
              >
                {C.leveragePanel}
              </div>
              <div
                style={{
                  opacity: combinedOn ? 1 : 0,
                  transform: combinedOn ? "translateY(0)" : "translateY(4px)",
                  transition:
                    "opacity 400ms var(--ease) 850ms, transform 400ms var(--ease) 850ms",
                  fontFamily: "var(--serif)",
                  fontStyle: "italic",
                  fontSize: 22,
                  color: "var(--copper-300)",
                  lineHeight: 1.2,
                  fontWeight: 400,
                  textAlign: "center",
                }}
              >
                {C.leverageSub}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════
          RIGHT PANE — 40% (right:48 top:156 width:480 bottom:80)
          THE LEVERAGE sub-title + 2×2 grid of B3ParamTile cards.
          ════════════════════════════════════════════════════════════════ */}
      <div
        data-testid="c2-right-pane"
        style={{
          position: "absolute",
          right: 48,
          top: 156,
          width: 480,
          bottom: 80,
          display: "flex",
          flexDirection: "column",
          gap: 16,
          zIndex: 5,
          ...liftStyle(cardsOn, 6, 400),
        }}
      >
        <SubTitleBlock label="THE LEVERAGE" hairlineWidthPct={40} />

        {/* 2×2 CSS Grid — each cell stretches a B3ParamTile via
            style={{ width: "100%", height: "100%" }}. Gap 14px. With width
            480 and 14px gap, each tile is ~233px wide. With ~400px column
            height across two rows, each tile is ~190px tall. */}
        <div
          data-testid="c2-cards-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridTemplateRows: "1fr 1fr",
            gap: 14,
            width: "100%",
            flex: "1 1 auto",
            minHeight: 0,
          }}
        >
          {C.cards.map((card, i) => {
            const Anim = animByKey[card.animKey];
            const wrapStyle: CSSProperties = {
              opacity: cardsOn ? 1 : 0,
              transform: cardsOn ? "translateY(0)" : "translateY(14px)",
              transition:
                "opacity 600ms var(--ease), transform 600ms var(--ease)",
              transitionDelay: cardsOn ? `${i * 120}ms` : "0ms",
              willChange: "opacity, transform",
              // Cell wrapper lets the tile fill its grid track cleanly.
              width: "100%",
              height: "100%",
            };
            // Adapt content.ts bullet shape (`kw`) to B3ParamTile's prop
            // shape (`keywords`).
            const tileBullets = card.bullets.map((b) => ({
              text: b.text,
              keywords: b.kw,
            }));
            return (
              <div
                key={card.label}
                data-testid={`c2-card-${i}`}
                style={wrapStyle}
              >
                <B3ParamTile
                  label={card.label}
                  bullets={tileBullets}
                  style={{ width: "100%", height: "100%" }}
                  allowBulletWrap
                >
                  {Anim ? <Anim /> : null}
                </B3ParamTile>
              </div>
            );
          })}
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════
          FOOTER CAPTION — B.4-style italic 14px, bottom-left. New in v3
          as the canonical pose; reveals on step 4 alongside the box
          pulse-glow.
          ════════════════════════════════════════════════════════════════ */}
      <div
        style={{
          position: "absolute",
          left: 48,
          bottom: 50,
          maxWidth: 800,
          zIndex: 6,
        }}
      >
        <p
          data-testid="c2-footer-caption"
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

// ───────────────────── helpers ─────────────────────

// Inline recognition line — three visual lines, left-aligned within the
// LEFT pane (was centered in the v1 layout). Final clause "That's a
// reasonable place to start." renders in copper-300 italic; the other two
// lines are neutral-300 italic.
function RecognitionLineInline({
  italicClause,
}: {
  italicClause: string;
}): ReactNode {
  return (
    <p
      data-testid="c2-recognition-line"
      style={{
        fontFamily: "var(--serif)",
        fontStyle: "italic",
        fontSize: 22,
        color: "var(--neutral-300)",
        margin: 0,
        lineHeight: 1.4,
        textAlign: "left",
        fontWeight: 400,
      }}
    >
      <span style={{ display: "block" }}>
        Most of us start with AI the way we started
      </span>
      <span style={{ display: "block" }}>
        with Google — type, read, move on.
      </span>
      <span
        data-testid="c2-recognition-clause"
        style={{
          display: "block",
          color: "var(--copper-300)",
          fontStyle: "italic",
        }}
      >
        {italicClause}
      </span>
    </p>
  );
}

// ───────────────────── slide def ─────────────────────

export const c2Slide: SlideDef = {
  steps: 5,
  canonicalPose: 4,
  animationMode: "step-reveal",
  surface: "dark",
  section: "C",
  render: () => <C2ReplacementMultiplier />,
};
