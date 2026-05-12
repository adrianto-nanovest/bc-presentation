// B.5 — TODAY'S LANDSCAPE + THE INVERSE HOOK (AI LANDSCAPE PARADOX)
//
// Closing beat of Section B. Opens enormous on the "88% of organizations have
// adopted AI" stat, collapses the stat into a header-pose tagline (D.1 grammar),
// pivots through a centered "And yet…" beat, drops the 3-bar adoption-vs-outcome
// funnel, and closes with the cliffhanger that Section C answers.
//
// The big stat's morph from center-pose → header-pose mirrors D.1's stat
// collapse exactly: a single element that re-poses via animated `top` +
// `fontSize` + `lineHeight` + `letterSpacing` (700ms var(--ease)). The serif
// subline shifts to a display font as it joins the header. Per-bar CountUps
// use the canonical CountUp (now with decimal support) so bar 3 animates
// 0.0 → 5.5 while bars 1–2 stay integer.
//
// Step map (load animation is mount-driven; stepIndex 0 = first Space press):
//   load (on mount):  FIG label + dot-grid bg fade in
//   stepIndex 0       (FIRST beat — centered "open-enormous" frame):
//                     Big 88% counts up 0 → 88 with serif subline at baseline.
//                     Source mono-caps Reveal beneath at delay 1700ms.
//                     No "And yet", no chart, no cliffhanger.
//   stepIndex 1       (PIVOT moment):
//                     Big 88% block COLLAPSES via D.1 morph (top 130→76,
//                     font-size 200→40, justify center→start, subline serif→
//                     display + neutral-100→neutral-50). The source-caption
//                     fades. A centered "And yet…" appears mid-stage in serif
//                     italic 72px copper-200, delayed 0.4s so it lands AFTER
//                     the morph settles.
//   stepIndex 2       (CHART enter):
//                     "And yet" fades; header pose stays. Chart title + mono
//                     subtitle reveal above 3 horizontal bars that stagger in
//                     150ms apart, each with a scaleX fill grow AND a CountUp
//                     0 → pct (1200ms). Bar 3 (5.5%) uses decimal CountUp.
//                     Bars become hover-aware once armed.
//   stepIndex 3       (CANONICAL — cliffhanger):
//                     "What separates them? Not the model — the mental model."
//                     reveals below the bars in italic serif 36px with a
//                     4s AmbientPulse on the multi-word keyword "mental model".
//
// Background tier: diagrammatic / data → plain neutral-950 + dot-grid.
import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { highlight as KW } from "@/components/highlight";
import { AmbientPulse } from "@/components/AmbientPulse";
import { Reveal } from "@/slides/foundation-core-section-e/components/Reveal";
import { CountUp } from "@/slides/foundation-core/components/CountUp";
import { b5Content as C, type B5Bar } from "./content";

// Stage: 1280×720. FIG band ~88px top, nav reserves ~64px bottom.

// ───────────────────── slide ─────────────────────

export function B5TodaysLandscape() {
  const { stepIndex } = useDeck();

  // Mount-driven load: FIG label + background settle. The stat counter
  // actually starts on stepIndex >= 0 (the first Space press) — same beat
  // as D.1's stat reveal.
  const [mountedOn, setMountedOn] = useState(false);
  useEffect(() => {
    const t = window.setTimeout(() => setMountedOn(true), 80);
    return () => window.clearTimeout(t);
  }, []);

  // Step gates.
  const statOn = stepIndex >= 0;          // big 88% counter mounted/running
  const showHeaderPose = stepIndex >= 1;  // D.1-style collapse to header pose
  const andYetOn = stepIndex === 1;       // "And yet…" centerpiece — step 1 only
  const barsOn = stepIndex >= 2;          // chart title + bars stagger in at 2
  const cliffOn = stepIndex >= 3;         // cliffhanger reveals at canonical pose

  return (
    <div
      data-testid="slide-b5"
      style={{ position: "absolute", inset: 0, overflow: "hidden" }}
    >
      {/* Background — plain dark + dot-grid. */}
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
          opacity: mountedOn ? 0.05 : 0,
          backgroundImage:
            "radial-gradient(rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          transition: "opacity 0.4s var(--ease)",
          zIndex: 1,
        }}
      />

      <FigLabel section="B" num={5} label={C.figLabel} />

      {/* ───────────── Combined stat + tagline group ─────────────
          Single element that morphs from center-pose (step 0) to header-pose
          (step 1+). Mirrors D.1's grammar exactly: top + fontSize + lineHeight
          + letterSpacing animate over 700ms var(--ease); justifyContent
          switches from center→flex-start; the serif subline shifts to display
          and brightens to neutral-50 as it joins the header pose. */}
      <div
        data-testid="b5-stat-block"
        style={{
          position: "absolute",
          left: 48,
          right: 48,
          top: showHeaderPose ? 76 : 130,
          transition: "top 0.7s var(--ease)",
          zIndex: 5,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: showHeaderPose ? 16 : 24,
            justifyContent: showHeaderPose ? "flex-start" : "center",
            flexWrap: "wrap",
          }}
        >
          <h1
            data-testid="b5-big-stat"
            style={{
              margin: 0,
              fontFamily: "var(--display)",
              fontWeight: 400,
              lineHeight: showHeaderPose ? 1.05 : 0.9,
              letterSpacing: showHeaderPose ? "-0.01em" : "normal",
              fontSize: showHeaderPose ? 40 : 200,
              transition:
                "font-size 0.7s var(--ease), line-height 0.7s var(--ease), letter-spacing 0.7s var(--ease)",
              display: "inline-flex",
              alignItems: "baseline",
              color: "var(--copper-700)",
            }}
          >
            {statOn ? (
              <CountUp
                from={0}
                to={C.bigStat}
                durationMs={1500}
                testId="b5-big-stat-counter"
              />
            ) : (
              "0"
            )}
            <span
              style={{
                fontSize: showHeaderPose ? "1em" : "0.55em",
                marginLeft: showHeaderPose ? "0.02em" : "0.05em",
                color: "var(--copper-300)",
                transition: "font-size 0.7s var(--ease)",
              }}
            >
              {C.bigStatSuffix}
            </span>
          </h1>
          <p
            style={{
              margin: 0,
              fontFamily: showHeaderPose ? "var(--display)" : "var(--serif)",
              fontWeight: 400,
              color: showHeaderPose ? "var(--neutral-50)" : "var(--neutral-100)",
              fontSize: showHeaderPose ? 40 : 32,
              lineHeight: showHeaderPose ? 1.05 : 1.25,
              letterSpacing: showHeaderPose ? "-0.01em" : "normal",
              transition:
                "font-size 0.7s var(--ease), line-height 0.7s var(--ease), color 0.7s var(--ease), font-family 0s 0.35s",
              maxWidth: 720,
            }}
          >
            {KW(C.bigStatCaption, C.bigStatCaptionKw)}
          </p>
        </div>

        {/* Mono-caps source line — visible only in center-pose (step 0).
            Fades out as the collapse begins. */}
        {!showHeaderPose && (
          <Reveal
            on={statOn}
            delay={1700}
            style={{ textAlign: "center", marginTop: 28 }}
          >
            <p
              style={{
                fontFamily: "var(--mono)",
                fontSize: 12,
                letterSpacing: "0.18em",
                color: "var(--neutral-500)",
                textTransform: "uppercase",
                margin: 0,
              }}
            >
              {C.bigStatSource}
            </p>
          </Reveal>
        )}
      </div>

      {/* ───────────── "And yet…" centerpiece (step 1 only) ─────────────
          Centered below the now-shrunk header. Serif italic 72px copper-200
          — the dramatic pause moment. Delay 0.4s on the IN transition so it
          lands AFTER the morph (700ms) is well underway (graceful overlap). */}
      <div
        data-testid="b5-and-yet"
        style={{
          position: "absolute",
          left: 48,
          right: 48,
          top: 330,
          textAlign: "center",
          opacity: andYetOn ? 1 : 0,
          transform: andYetOn ? "translateY(0)" : "translateY(8px)",
          transition: andYetOn
            ? "opacity 0.5s var(--ease) 0.4s, transform 0.5s var(--ease) 0.4s"
            : "opacity 0.4s var(--ease), transform 0.4s var(--ease)",
          pointerEvents: andYetOn ? "auto" : "none",
          zIndex: 5,
        }}
      >
        <span
          style={{
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontSize: 72,
            color: "var(--copper-200)",
            letterSpacing: "-0.005em",
            lineHeight: 1.1,
          }}
        >
          {C.mechanism}
        </span>
      </div>

      {/* ───────────── Chart title + subtitle (step 2+) ─────────────
          Sits above the 3-bar funnel, left-aligned to the bars container. */}
      <div
        data-testid="b5-chart-header"
        style={{
          position: "absolute",
          left: 200,
          right: 200,
          top: 210,
          opacity: barsOn ? 1 : 0,
          transform: barsOn ? "translateY(0)" : "translateY(8px)",
          transition: "opacity 0.4s var(--ease), transform 0.4s var(--ease)",
          pointerEvents: barsOn ? "auto" : "none",
          zIndex: 5,
        }}
      >
        <h2
          data-testid="b5-chart-title"
          style={{
            margin: 0,
            fontFamily: "var(--display)",
            fontWeight: 400,
            fontSize: 28,
            color: "var(--neutral-100)",
            lineHeight: 1.1,
          }}
        >
          {C.chartTitle}
        </h2>
        <p
          data-testid="b5-chart-subtitle"
          style={{
            margin: "8px 0 0 0",
            fontFamily: "var(--mono)",
            fontSize: 11,
            letterSpacing: "0.18em",
            color: "var(--neutral-500)",
            textTransform: "uppercase",
          }}
        >
          {C.chartSubtitle}
        </p>
      </div>

      {/* ───────────── Three inverse bars (step 2+) ─────────────
          Container 880px wide centered on 1280 stage (left:200 / right:200).
          Top:290 leaves room for the chart header above. Bars stagger in
          150ms apart and become hover-aware once armed. */}
      <div
        data-testid="b5-bars"
        style={{
          position: "absolute",
          left: 200,
          right: 200,
          top: 290,
          display: "flex",
          flexDirection: "column",
          gap: 24,
          opacity: barsOn ? 1 : 0,
          transition: "opacity 0.4s var(--ease)",
          pointerEvents: barsOn ? "auto" : "none",
          zIndex: 5,
        }}
      >
        {C.bars.map((b, i) => (
          <InverseBarRow
            key={b.pct}
            bar={b}
            on={barsOn}
            delayMs={i * 150}
          />
        ))}
      </div>

      {/* ───────────── Cliffhanger (step 3 — canonical) ─────────────
          Centered below the bars, italic serif 36px with copper-400 underlined
          keyword + 4s AmbientPulse on the multi-word "mental model". */}
      <div
        data-testid="b5-cliffhanger"
        style={{
          position: "absolute",
          left: 48,
          right: 48,
          top: 540,
          textAlign: "center",
          opacity: cliffOn ? 1 : 0,
          transform: cliffOn ? "translateY(0)" : "translateY(8px)",
          transition: "opacity 0.5s var(--ease) 0.15s, transform 0.5s var(--ease) 0.15s",
          zIndex: 5,
        }}
      >
        <Cliffhanger
          text={C.cliffhanger}
          keyword={C.cliffhangerKw[0] ?? "mental model"}
          on={cliffOn}
        />
      </div>
    </div>
  );
}

// ───────────────────── InverseBarRow ─────────────────────
// Horizontal bar with grow-from-left animation. Variant controls fill/border
// treatment per spec: primary (full copper fill), dim (~55% opacity copper),
// dashed (no fill, dashed copper outline).
//
// Percentage label animates via the canonical CountUp — bar 3 uses decimals=1
// so 5.5 animates as 0.0 → 5.5. Integer bars (88, 25) use decimals=0.
// When the row is armed, hover state lifts border/background/box-shadow and
// brightens the label colors (mirrors b2 TierLadderCard treatment).

function InverseBarRow({
  bar,
  on,
  delayMs = 0,
}: {
  bar: B5Bar;
  on: boolean;
  delayMs?: number;
}) {
  const variant = bar.variant;
  const fillStyle: CSSProperties = (() => {
    switch (variant) {
      case "primary":
        return { background: "var(--copper-400)", opacity: 1 };
      case "dim":
        return { background: "var(--copper-300)", opacity: 0.5 };
      case "dashed":
        return {
          background: "transparent",
          border: "1px dashed var(--copper-200)",
          opacity: 0.85,
        };
    }
  })();

  // Internal stagger: only mount the count-up after the row's own delay
  // elapses, so the count-up animation lines up with the bar fill grow.
  const [armed, setArmed] = useState(false);
  const [hovered, setHovered] = useState(false);
  useEffect(() => {
    if (!on) {
      setArmed(false);
      setHovered(false);
      return;
    }
    const t = window.setTimeout(() => setArmed(true), delayMs);
    return () => window.clearTimeout(t);
  }, [on, delayMs]);

  const isHot = armed && hovered;
  // Integer bars (88, 25) animate as integers; decimals (5.5) animate as 0.0 → 5.5.
  const decimals = Number.isInteger(bar.pct) ? 0 : 1;

  // Label color picks copper-100 on hover, otherwise the variant default
  // (primary → copper-200, dim/dashed → copper-300).
  const labelColor = isHot
    ? "var(--copper-100)"
    : variant === "primary"
      ? "var(--copper-200)"
      : "var(--copper-300)";

  return (
    <div
      data-testid="b5-inverse-bar"
      data-variant={variant}
      data-hovered={isHot ? "true" : "false"}
      onMouseEnter={armed ? () => setHovered(true) : undefined}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr",
        gap: 6,
        opacity: armed ? 1 : 0,
        transform: armed ? "translateY(0)" : "translateY(6px)",
        transition: "opacity 0.4s var(--ease), transform 0.4s var(--ease)",
        cursor: armed ? "default" : undefined,
      }}
    >
      {/* Top row: pct + label (source citation removed per spec) */}
      <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
        <span
          style={{
            fontFamily: "var(--display)",
            fontSize: 26,
            color: labelColor,
            lineHeight: 1,
            minWidth: 72,
            display: "inline-flex",
            alignItems: "baseline",
            transition: "color 0.18s var(--ease)",
          }}
        >
          {armed ? (
            <CountUp
              from={0}
              to={bar.pct}
              durationMs={1200}
              decimals={decimals}
            />
          ) : (
            <span aria-hidden style={{ opacity: 0 }}>
              {decimals > 0 ? "0.0" : "00"}
            </span>
          )}
          <span style={{ marginLeft: 2 }}>%</span>
        </span>
        <span
          style={{
            fontFamily: "var(--serif)",
            fontSize: 15,
            color: isHot ? "var(--neutral-50)" : "var(--neutral-200)",
            lineHeight: 1.2,
            transition: "color 0.18s var(--ease)",
          }}
        >
          {bar.label}
        </span>
      </div>
      {/* Bar track: grows from left via transform: scaleX (transform-origin
          left) so the grow feels physical (anchored to the left edge) rather
          than a width-resize. Final scaled width = widthPct relative to track.
          Hover state mirrors b2 TierLadderCard: brighter border, faint copper
          fill, copper glow ring. */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: variant === "primary" ? 24 : 18,
          background: isHot
            ? "rgba(217,158,108,0.08)"
            : "rgba(184,110,61,0.05)",
          border: `1px solid ${isHot ? "var(--copper-200)" : "var(--copper-700)"}`,
          boxShadow: isHot
            ? "0 0 0 1px var(--copper-400) inset, 0 0 22px -10px var(--copper-400)"
            : "none",
          overflow: "visible",
          transition:
            "background 0.18s var(--ease), border-color 0.18s var(--ease), box-shadow 0.18s var(--ease)",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: `${bar.widthPct}%`,
            transformOrigin: "left center",
            transform: armed ? "scaleX(1)" : "scaleX(0)",
            transition: "transform 0.7s var(--ease)",
            ...fillStyle,
          }}
        />
      </div>
    </div>
  );
}

// ───────────────────── Cliffhanger ─────────────────────
// Italic closing line. The single highlighted keyword (multi-word "mental
// model") carries a copper underline + the deck-wide 4s AmbientPulse glow
// once the line is visible. `text.indexOf(keyword)` handles multi-word
// substrings natively.

function Cliffhanger({
  text,
  keyword,
  on,
}: {
  text: string;
  keyword: string;
  on: boolean;
}) {
  // Split text around the keyword so we can wrap only the keyword in
  // AmbientPulse + underline styling without disturbing the surrounding
  // italic flow. indexOf works on multi-word substrings as-is.
  const idx = text.indexOf(keyword);
  let before: string = text;
  let after: string = "";
  let hasKeyword = false;
  if (idx >= 0) {
    before = text.slice(0, idx);
    after = text.slice(idx + keyword.length);
    hasKeyword = true;
  }

  const lineStyle: CSSProperties = {
    fontFamily: "var(--serif)",
    fontStyle: "italic",
    fontSize: 36,
    color: "var(--neutral-200)",
    lineHeight: 1.2,
    letterSpacing: "-0.005em",
  };

  const kwStyle: CSSProperties = {
    color: "var(--copper-400)",
    fontStyle: "italic",
    borderBottom: "1px solid var(--copper-400)",
    paddingBottom: 1,
  };

  if (!hasKeyword) {
    return <span style={lineStyle}>{text}</span>;
  }

  const keywordNode: ReactNode = on ? (
    <AmbientPulse keyword={keyword} periodSeconds={4}>
      <span style={kwStyle}>{keyword}</span>
    </AmbientPulse>
  ) : (
    <span style={kwStyle}>{keyword}</span>
  );

  return (
    <span style={lineStyle}>
      {before}
      {keywordNode}
      {after}
    </span>
  );
}

// ───────────────────── slide def ─────────────────────

export const b5Slide: SlideDef = {
  steps: 4,
  canonicalPose: 3,
  animationMode: "step-reveal",
  surface: "dark",
  section: "B",
  render: () => <B5TodaysLandscape />,
};
