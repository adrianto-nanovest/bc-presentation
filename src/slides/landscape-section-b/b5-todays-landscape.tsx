// B.5 — TODAY'S LANDSCAPE + THE INVERSE HOOK (THE PARADOX)
//
// Echoes D.1's grammar — open enormous with a single dominant stat, then
// pivot through "And yet…" into a 3-bar inverse landscape, and close with
// the cliffhanger that Section C answers.
//
// The 92% counter-up MUST mirror D.1's 73% counter-up exactly — same
// component (`CountUp` from foundation-core/components), same easing curve
// (`[0.16, 1, 0.3, 1]`), same duration (1500ms). The BigStat wrapper
// (`./components/BigStat.tsx`) was rewired to delegate to that canonical
// CountUp so the rhyme is structural rather than visual approximation.
//
// Step map (load animation is mount-driven; stepIndex 0 = first Space press):
//   load (on mount): FIG label + dot-grid bg fade in
//   stepIndex 0:     Big stat counts up 0 → 92 (1500ms easeOutExpo)
//   stepIndex 1:     Stat caption fades in below
//   stepIndex 2:     Mechanism line "And yet..." slides in italic
//   stepIndex 3:     Bar 1 (79%) grows from left
//   stepIndex 4:     Bar 2 (11%) grows — shockingly narrow vs Bar 1
//   stepIndex 5 (canonical):
//                    Bar 3 (40%) dashed-outline grows + cliffhanger fades in
//                    italic with 4s ambient copper pulse on `difference`
//
// Background tier: diagrammatic / data → plain neutral-950 + dot-grid.
import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { highlight } from "@/components/highlight";
import { AmbientPulse } from "@/components/AmbientPulse";
import { BigStat } from "./components/BigStat";
import { b5Content as C, type B5Bar } from "./content";

// Stage: 1280×720. FIG band ~88px top, nav reserves ~64px bottom.
const SIDE_PAD = 64;

// Vertical anchors. Tuned to feel like D.1's open-enormous grammar without
// busting 720px.
const STAT_TOP = 96;          // big stat baseline area
const CAPTION_TOP = 360;      // beneath the stat
const MECHANISM_TOP = 420;    // "And yet..."
const BARS_TOP = 472;         // three bars stacked
const CLIFFHANGER_TOP = 642;  // closing italic line

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
  const statOn = stepIndex >= 0;
  const captionOn = stepIndex >= 1;
  const mechanismOn = stepIndex >= 2;
  const barOn = (i: number) => stepIndex >= 3 + i;
  const cliffOn = stepIndex >= 5;

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
          opacity: 0.05,
          backgroundImage:
            "radial-gradient(rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          zIndex: 1,
        }}
      />

      <FigLabel section="B" num={5} label={C.figLabel} />

      {/* ───────────── Big stat (centered, dominates upper third) ───────────── */}
      <div
        data-testid="b5-stat-block"
        style={{
          position: "absolute",
          left: SIDE_PAD,
          right: SIDE_PAD,
          top: STAT_TOP,
          height: 260,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: mountedOn ? 1 : 0,
          transition: "opacity 0.4s var(--ease)",
          zIndex: 5,
        }}
      >
        {/* The counter only mounts after statOn so it starts at 0 on the
            audience's first Space press, matching D.1's behavior. While
            the slide is freshly entered (stepIndex < 0 cannot happen, but
            during pre-load we still want a placeholder), we render the
            target value invisibly to reserve layout space. */}
        {statOn ? (
          <BigStat
            to={C.bigStat}
            suffix={C.bigStatSuffix}
            size={260}
            duration={1500}
            color="var(--copper-400)"
            suffixColor="var(--copper-300)"
            testId="b5-big-stat"
          />
        ) : (
          <div
            aria-hidden
            style={{
              fontFamily: "var(--display)",
              fontSize: 260,
              lineHeight: 0.85,
              color: "transparent",
            }}
          >
            00%
          </div>
        )}
      </div>

      {/* ───────────── Stat caption ───────────── */}
      <div
        data-testid="b5-caption"
        style={{
          position: "absolute",
          left: SIDE_PAD,
          right: SIDE_PAD,
          top: CAPTION_TOP,
          textAlign: "center",
          opacity: captionOn ? 1 : 0,
          transform: captionOn ? "translateY(0)" : "translateY(6px)",
          transition: "opacity 0.4s var(--ease), transform 0.4s var(--ease)",
          zIndex: 5,
        }}
      >
        <p
          style={{
            margin: 0,
            fontFamily: "var(--serif)",
            fontSize: 22,
            color: "var(--neutral-200)",
            lineHeight: 1.35,
          }}
        >
          {highlight(C.bigStatCaption, C.bigStatCaptionKw)}
        </p>
      </div>

      {/* ───────────── Mechanism — "And yet..." ───────────── */}
      <div
        data-testid="b5-mechanism"
        style={{
          position: "absolute",
          left: SIDE_PAD,
          right: SIDE_PAD,
          top: MECHANISM_TOP,
          textAlign: "center",
          opacity: mechanismOn ? 1 : 0,
          transform: mechanismOn ? "translateY(0)" : "translateY(8px)",
          transition: "opacity 0.4s var(--ease), transform 0.4s var(--ease)",
          zIndex: 5,
        }}
      >
        <span
          style={{
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontSize: 28,
            color: "var(--neutral-400)",
            letterSpacing: "-0.005em",
          }}
        >
          {C.mechanism}
        </span>
      </div>

      {/* ───────────── Three inverse bars ───────────── */}
      <div
        data-testid="b5-bars"
        style={{
          position: "absolute",
          left: SIDE_PAD + 120,
          right: SIDE_PAD + 120,
          top: BARS_TOP,
          display: "flex",
          flexDirection: "column",
          gap: 16,
          zIndex: 5,
        }}
      >
        {C.bars.map((b, i) => (
          <InverseBarRow key={b.pct} bar={b} on={barOn(i)} />
        ))}
      </div>

      {/* ───────────── Cliffhanger ───────────── */}
      <div
        data-testid="b5-cliffhanger"
        style={{
          position: "absolute",
          left: SIDE_PAD,
          right: SIDE_PAD,
          top: CLIFFHANGER_TOP,
          textAlign: "center",
          opacity: cliffOn ? 1 : 0,
          transform: cliffOn ? "translateY(0)" : "translateY(8px)",
          transition: "opacity 0.5s var(--ease) 0.15s, transform 0.5s var(--ease) 0.15s",
          zIndex: 5,
        }}
      >
        <Cliffhanger
          text={C.cliffhanger}
          keyword={C.cliffhangerKw[0] ?? "difference"}
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

function InverseBarRow({ bar, on }: { bar: B5Bar; on: boolean }) {
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

  return (
    <div
      data-testid="b5-inverse-bar"
      data-variant={variant}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr",
        gap: 6,
      }}
    >
      {/* Top row: pct + label + source citation */}
      <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
        <span
          style={{
            fontFamily: "var(--display)",
            fontSize: 26,
            color: variant === "primary" ? "var(--copper-200)" : "var(--copper-300)",
            lineHeight: 1,
            minWidth: 62,
          }}
        >
          {bar.pct}%
        </span>
        <span
          style={{
            fontFamily: "var(--serif)",
            fontSize: 15,
            color: "var(--neutral-200)",
            lineHeight: 1.2,
          }}
        >
          {bar.label}
        </span>
        <span
          style={{
            fontFamily: "var(--mono)",
            fontSize: 10,
            letterSpacing: "0.18em",
            color: "var(--neutral-500)",
            textTransform: "uppercase",
            marginLeft: "auto",
          }}
        >
          {bar.source}
        </span>
      </div>
      {/* Bar track: grows from left via transform: scaleX. We use scaleX with
          transform-origin: left so the grow feels physical (anchored to the
          left edge) rather than a width-resize. Final scaled width = widthPct
          relative to the track. */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: variant === "primary" ? 24 : 18,
          background: "rgba(184,110,61,0.05)",
          border: "1px solid var(--copper-900)",
          overflow: "visible",
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
            transform: on ? "scaleX(1)" : "scaleX(0)",
            transition: "transform 0.7s var(--ease)",
            ...fillStyle,
          }}
        />
      </div>
    </div>
  );
}

// ───────────────────── Cliffhanger ─────────────────────
// Italic closing line. The single highlighted keyword carries a copper
// underline + the deck-wide 4s AmbientPulse glow once the line is visible.

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
  // italic flow.
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
    fontSize: 30,
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
  // 6 stepIndex values (0..5): stat, caption, mechanism, bar1, bar2, bar3+cliff.
  steps: 6,
  canonicalPose: 5,
  animationMode: "step-reveal",
  surface: "dark",
  section: "B",
  render: () => <B5TodaysLandscape />,
};
