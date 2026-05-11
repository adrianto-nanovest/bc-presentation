// C.3 — EXECUTOR → ORCHESTRATOR
//
// Diagrammatic mid-section slide. Introduces the new self-image: from the
// person who types every line to the person who designs, specifies, and
// verifies — while AI handles the bulk. The quotable line of the deck lives
// here:
//
//     "AI handles the typing. You handle the thinking."
//
// Layout — vertical 50/50 split with a 1px copper-700 divider drawn via
// pathLength on mount (identical pattern to B.3).
//
//   LEFT  (BEFORE / EXECUTOR)     → neutral-500, hunched silhouette + 5 bullets
//   RIGHT (AFTER  / ORCHESTRATOR) → copper-400, taller/wider silhouette + 5 bullets
//   BOTTOM-CENTER                  → italic Source Serif punchline; `thinking`
//                                    in copper-400 italic + copper underline
//                                    + 4s ambient pulse.
//
// Motion (5 steps, canonicalPose: 4) —
//   mount:               FIG + vertical divider draw in (700ms pathLength)
//   stepIndex 0:         LEFT silhouette + title `EXECUTOR` reveal (500ms)
//   stepIndex 1:         LEFT bullets stagger-fade (5 × 80ms)
//   stepIndex 2:         RIGHT silhouette + title `ORCHESTRATOR` reveal —
//                        silhouette settles into expansive pose via opacity +
//                        slight scale (700ms easeOutExpo)
//   stepIndex 3:         RIGHT bullets stagger-fade (5 × 80ms)
//   stepIndex 4 (canon): Punchline fades in italic; copper underline +
//                        4s ambient pulse on `thinking`.
//
// Hover (presenter detail layer) — Hover any bullet for a 1-line
// elaboration to the right. CSS-only.
import { useEffect, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { AmbientPulse } from "@/components/AmbientPulse";
import { MindsetSilhouette } from "./components/MindsetSilhouette";
import { c3Content as C } from "./content";

// Stage geometry (1280×720 stage; content below 88px FIG band).
const STAGE_W = 1280;
const CONTENT_TOP = 116;
const CONTENT_BOTTOM = 140;       // leave room for punchline + nav
const SIDE_PAD = 80;
const DIVIDER_X = STAGE_W / 2;

// Optional hover elaborations for each bullet — kept short, presenter detail.
// Keys are the bullet index 0..4.
const EXECUTOR_HOVER: readonly string[] = [
  "Every keystroke is yours — speed capped by your typing.",
  "Step through it yourself, line by line, eyes on the screen.",
  "Notes, comments, status updates — all written by hand.",
  "The same shape of work, over and over and over.",
  "The bottleneck is how fast you can move your fingers.",
];

const ORCHESTRATOR_HOVER: readonly string[] = [
  "Shape the system, the interfaces, the trade-offs.",
  "Say what you want and why — let the generation follow.",
  "Read the output critically; catch what's wrong before it ships.",
  "Make the calls only a human can make. Push the frontier.",
  "Time freed from typing is time spent on judgment.",
];

// ───────────────────── slide ─────────────────────

export function C3ExecutorOrchestrator() {
  const { stepIndex } = useDeck();

  // FIG + divider draw on mount (no Space needed).
  const [dividerOn, setDividerOn] = useState(false);
  useEffect(() => {
    const t = window.setTimeout(() => setDividerOn(true), 120);
    return () => window.clearTimeout(t);
  }, []);

  // Step gates. stepIndex 0 = first Space press (left silhouette/title).
  const leftOn = stepIndex >= 0;
  const leftBulletsOn = stepIndex >= 1;
  const rightOn = stepIndex >= 2;
  const rightBulletsOn = stepIndex >= 3;
  const punchlineOn = stepIndex >= 4;
  const pulseOn = stepIndex >= 4;

  return (
    <div
      data-testid="slide-c3"
      style={{ position: "absolute", inset: 0, overflow: "hidden" }}
    >
      {/* Background — plain neutral-950 + dot-grid (matches B.3 + C.2). */}
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

      <FigLabel section="C" num={3} label={C.figLabel} />

      {/* Vertical divider — copper-700, draws in via stroke-dashoffset. */}
      <DividerLine
        on={dividerOn}
        x={DIVIDER_X}
        top={CONTENT_TOP}
        bottom={CONTENT_BOTTOM}
      />

      {/* ───────────── LEFT — EXECUTOR (BEFORE) ───────────── */}
      <SidePanel
        align="left"
        kicker="BEFORE"
        kickerColor="var(--neutral-500)"
        title={C.executor.label}
        titleColor="var(--neutral-400)"
        silhouette={
          <MindsetSilhouette
            variant="executor"
            size={132}
            style={{
              opacity: leftOn ? 1 : 0,
              transform: leftOn ? "scale(1)" : "scale(0.96)",
              transition:
                "opacity 500ms var(--ease), transform 500ms var(--ease)",
              transformOrigin: "center bottom",
            }}
          />
        }
        bullets={C.executor.bullets}
        bulletsOn={leftBulletsOn}
        bulletColor="var(--neutral-500)"
        hoverColor="var(--neutral-400)"
        hoverTexts={EXECUTOR_HOVER}
        titleOn={leftOn}
        testIdPrefix="c3-executor"
      />

      {/* ───────────── RIGHT — ORCHESTRATOR (AFTER) ───────────── */}
      <SidePanel
        align="right"
        kicker="AFTER"
        kickerColor="var(--copper-300)"
        title={C.orchestrator.label}
        titleColor="var(--copper-400)"
        silhouette={
          <MindsetSilhouette
            variant="orchestrator"
            size={152}
            style={{
              opacity: rightOn ? 1 : 0,
              transform: rightOn ? "scale(1)" : "scale(0.94)",
              // Slightly slower, more expansive feel — 700ms easeOutExpo via
              // the shared --ease curve.
              transition:
                "opacity 700ms var(--ease), transform 700ms var(--ease)",
              transformOrigin: "center bottom",
            }}
          />
        }
        bullets={C.orchestrator.bullets}
        bulletsOn={rightBulletsOn}
        bulletColor="var(--copper-400)"
        hoverColor="var(--copper-200)"
        hoverTexts={ORCHESTRATOR_HOVER}
        titleOn={rightOn}
        testIdPrefix="c3-orchestrator"
      />

      {/* ───────────── BOTTOM-CENTER punchline ───────────── */}
      <div
        data-testid="c3-punchline"
        style={{
          position: "absolute",
          left: 48,
          right: 48,
          bottom: 56,
          display: "flex",
          justifyContent: "center",
          zIndex: 6,
          opacity: punchlineOn ? 1 : 0,
          transform: punchlineOn ? "translateY(0)" : "translateY(10px)",
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

// ───────────────────── SidePanel ─────────────────────
// One half of the 50/50 split. Renders kicker label + title + silhouette +
// 5 bullets. Bullets stagger-fade based on `bulletsOn`.

interface SidePanelProps {
  align: "left" | "right";
  kicker: string;
  kickerColor: string;
  title: string;
  titleColor: string;
  silhouette: ReactNode;
  bullets: readonly string[];
  bulletsOn: boolean;
  bulletColor: string;
  hoverColor: string;
  hoverTexts: readonly string[];
  titleOn: boolean;
  testIdPrefix: string;
}

function SidePanel({
  align,
  kicker,
  kickerColor,
  title,
  titleColor,
  silhouette,
  bullets,
  bulletsOn,
  bulletColor,
  hoverColor,
  hoverTexts,
  titleOn,
  testIdPrefix,
}: SidePanelProps) {
  const isLeft = align === "left";
  const positionStyle: CSSProperties = isLeft
    ? {
        left: SIDE_PAD,
        right: undefined,
        width: DIVIDER_X - SIDE_PAD - 48,
      }
    : {
        left: undefined,
        right: SIDE_PAD,
        width: DIVIDER_X - SIDE_PAD - 48,
      };

  return (
    <div
      data-testid={testIdPrefix}
      style={{
        position: "absolute",
        top: CONTENT_TOP + 24,
        bottom: CONTENT_BOTTOM,
        display: "flex",
        flexDirection: "column",
        gap: 18,
        alignItems: isLeft ? "flex-start" : "flex-end",
        textAlign: isLeft ? "left" : "right",
        zIndex: 5,
        ...positionStyle,
      }}
    >
      {/* Kicker — small mono caps caption */}
      <span
        style={{
          fontFamily: "var(--mono)",
          fontSize: 11,
          letterSpacing: "0.28em",
          color: kickerColor,
          textTransform: "uppercase",
          opacity: titleOn ? 1 : 0,
          transition: "opacity 400ms var(--ease)",
        }}
      >
        {kicker}
      </span>

      {/* Silhouette */}
      <div
        data-testid={`${testIdPrefix}-silhouette-wrap`}
        style={{
          display: "flex",
          justifyContent: isLeft ? "flex-start" : "flex-end",
          width: "100%",
        }}
      >
        {silhouette}
      </div>

      {/* Title */}
      <h2
        data-testid={`${testIdPrefix}-title`}
        style={{
          fontFamily: "var(--mono)",
          fontWeight: 500,
          fontSize: 22,
          letterSpacing: "0.22em",
          color: titleColor,
          textTransform: "uppercase",
          margin: 0,
          opacity: titleOn ? 1 : 0,
          transform: titleOn ? "translateY(0)" : "translateY(8px)",
          transition:
            "opacity 500ms var(--ease), transform 500ms var(--ease)",
        }}
      >
        {title}
      </h2>

      {/* Bullets */}
      <ul
        data-testid={`${testIdPrefix}-bullets`}
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "flex",
          flexDirection: "column",
          gap: 8,
          width: "100%",
        }}
      >
        {bullets.map((b, i) => {
          const onAt = bulletsOn;
          return (
            <li
              key={b}
              data-testid={`${testIdPrefix}-bullet-${i}`}
              className="c3-bullet"
              style={{
                opacity: onAt ? 1 : 0,
                transform: onAt ? "translateY(0)" : "translateY(8px)",
                transition:
                  "opacity 420ms var(--ease), transform 420ms var(--ease)",
                transitionDelay: onAt ? `${i * 80}ms` : "0ms",
                display: "flex",
                alignItems: "baseline",
                justifyContent: isLeft ? "flex-start" : "flex-end",
                gap: 12,
                color: bulletColor,
                fontFamily: "var(--serif)",
                fontSize: 17,
                lineHeight: 1.45,
              }}
            >
              {isLeft ? (
                <>
                  <span style={{ flex: "0 0 auto" }}>
                    <BulletDot color={bulletColor} />
                  </span>
                  <span style={{ flex: "0 1 auto" }}>
                    <BulletText text={b} />
                  </span>
                  <span
                    className="c3-bullet-hover"
                    style={{
                      flex: "1 1 auto",
                      fontFamily: "var(--serif)",
                      fontStyle: "italic",
                      fontSize: 13,
                      color: hoverColor,
                      opacity: 0,
                      transform: "translateX(-4px)",
                      transition:
                        "opacity 200ms var(--ease), transform 200ms var(--ease)",
                      pointerEvents: "none",
                      marginLeft: 12,
                    }}
                  >
                    {hoverTexts[i]}
                  </span>
                </>
              ) : (
                <>
                  <span
                    className="c3-bullet-hover"
                    style={{
                      flex: "1 1 auto",
                      fontFamily: "var(--serif)",
                      fontStyle: "italic",
                      fontSize: 13,
                      color: hoverColor,
                      opacity: 0,
                      transform: "translateX(4px)",
                      transition:
                        "opacity 200ms var(--ease), transform 200ms var(--ease)",
                      pointerEvents: "none",
                      marginRight: 12,
                      textAlign: "right",
                    }}
                  >
                    {hoverTexts[i]}
                  </span>
                  <span style={{ flex: "0 1 auto" }}>
                    <BulletText text={b} />
                  </span>
                  <span style={{ flex: "0 0 auto" }}>
                    <BulletDot color={bulletColor} />
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ul>

      {/* Hover behavior — when a bullet is hovered, surface its elaboration. */}
      <style>{`
        [data-testid="${testIdPrefix}"] .c3-bullet:hover .c3-bullet-hover {
          opacity: 1;
          transform: translateX(0);
        }
      `}</style>
    </div>
  );
}

// Render bullet body. If the text ends with an arrow construct like
// "Time → typing" we render the last token italic (the arrow makes it a
// natural emphasis point).
function BulletText({ text }: { text: string }) {
  const arrowIdx = text.indexOf(" → ");
  if (arrowIdx === -1) return <>{text}</>;
  const head = text.slice(0, arrowIdx);
  const tail = text.slice(arrowIdx + 3);
  return (
    <>
      {head}
      <span style={{ opacity: 0.7, margin: "0 6px" }}>→</span>
      <em style={{ fontStyle: "italic" }}>{tail}</em>
    </>
  );
}

function BulletDot({ color }: { color: string }) {
  return (
    <span
      aria-hidden
      style={{
        display: "inline-block",
        width: 6,
        height: 6,
        borderRadius: "50%",
        background: color,
        opacity: 0.7,
        transform: "translateY(-2px)",
      }}
    />
  );
}

// ───────────────────── Punchline ─────────────────────
// "AI handles the typing. You handle the thinking."
//   • Source Serif italic ~32px, neutral-200
//   • "You handle the" bolded
//   • "thinking" in copper-400 italic + copper-500 underline + 4s pulse
function Punchline({
  text,
  keywords,
  pulse,
}: {
  text: string;
  keywords: readonly string[];
  pulse: boolean;
}): ReactNode {
  // We expect the structure: "AI handles the typing. You handle the thinking."
  // We split on the "You handle the " phrase to bold it, then on `thinking`
  // (last keyword) for the copper accent.
  const kw = keywords[0] ?? "thinking";
  const boldPhrase = "You handle the";
  const boldIdx = text.indexOf(boldPhrase);
  const kwIdx = text.indexOf(kw);

  // Bail to plain rendering if either marker is missing.
  if (boldIdx === -1 || kwIdx === -1) {
    return (
      <p style={punchlineParaStyle()}>
        {text}
      </p>
    );
  }

  const head = text.slice(0, boldIdx);          // "AI handles the typing. "
  const boldRun = text.slice(boldIdx, kwIdx);   // "You handle the "
  const tail = text.slice(kwIdx + kw.length);   // trailing period

  const accent = (
    <em
      data-testid="c3-keyword-accent"
      style={{
        fontFamily: "var(--serif)",
        fontStyle: "italic",
        color: "var(--copper-400)",
        fontWeight: 400,
        textDecoration: pulse ? "underline" : "none",
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
    fontSize: 32,
    color: "var(--neutral-200)",
    margin: 0,
    lineHeight: 1.3,
    fontWeight: 400,
    textAlign: "center",
    maxWidth: 980,
  };
}

// ───────────────────── DividerLine ─────────────────────
// 1px copper-700 vertical line. Draws in on mount via stroke-dashoffset.
// Mirrors B.3's pattern verbatim.
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
    <div data-testid="c3-divider" data-on={on ? "1" : "0"} style={containerStyle}>
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

export const c3Slide: SlideDef = {
  steps: 5,
  canonicalPose: 4,
  animationMode: "step-reveal",
  surface: "dark",
  section: "C",
  render: () => <C3ExecutorOrchestrator />,
};
