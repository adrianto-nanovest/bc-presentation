// PROTOTYPE — throwaway. Variant A · "THE DIAL".
//
// Form thesis: kill the list. The five decisions ARE the figure — they sit as
// stations on one open ring, and the ring is broken on the left, where a
// single YOU block terminates both of its ends. "You're at both ends" is not
// a caption; it is the geometry.
//
// What this variant is testing:
//   - Can five labels live ON a ring and still read at projector distance?
//   - Does an OPEN ring (a 320° arc with a human-shaped gap) say the thing
//     better than a closed ring plus a chain→ring fold animation?
//   - The turn-by-turn "before" is a static struck-through inset, not a morph.
//     Is the contrast still legible without the fold?
import { useState } from "react";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { HintIcon } from "@/components/HintIcon";
import { highlight } from "@/components/highlight";
import { LucideIcon } from "@/slides/foundation-core-section-e/components/LucideIcon";
import { Reveal, CopperRule } from "@/slides/foundation-core-section-e/components/Reveal";
import { brief as B, type DecisionId } from "./brief";

// ── ring geometry ────────────────────────────────────────────────────────
const CX = 700;
const CY = 400;
const R = 132;
const GAP_START = 200; // arc begins here (clockwise) — the loop's launch end
const SWEEP = 320; // 40° of missing ring on the left = where the human is
const SEG = SWEEP / 5;

const polar = (r: number, deg: number): [number, number] => {
  const a = (deg * Math.PI) / 180;
  return [CX + r * Math.cos(a), CY + r * Math.sin(a)];
};

const arc = (r: number, a0: number, a1: number) => {
  const [x0, y0] = polar(r, a0);
  const [x1, y1] = polar(r, a1);
  const large = a1 - a0 > 180 ? 1 : 0;
  return `M ${x0} ${y0} A ${r} ${r} 0 ${large} 1 ${x1} ${y1}`;
};

// Station i sits mid-segment; its label sits radially outside it.
const stationAngle = (i: number) => GAP_START + (i + 0.5) * SEG;

// Label anchoring per station, hand-tuned so no two boxes collide.
const LABEL_ANCHOR: Record<number, string> = {
  0: "translate(-50%, -100%)", // upper-left  — sits above the arc
  1: "translate(-50%, -100%)", // upper-right — sits above the arc
  2: "translate(0, -50%)", // right       — sits beside the arc
  3: "translate(-50%, 0)", // lower-right — sits below the arc
  4: "translate(-50%, 0)", // lower-left  — sits below the arc
};

export function VariantA() {
  const { stepIndex } = useDeck();
  const [hover, setHover] = useState<DecisionId | null>(null);
  const [pinned, setPinned] = useState<DecisionId | null>(null);
  const active = pinned ?? hover;

  const showFigure = stepIndex >= 0;
  const showLand = stepIndex >= 1;

  // Step 1 with nothing selected lights the whole ring at once.
  const allLit = showLand && active === null;
  const activeDecision = B.decisions.find((d) => d.id === active) ?? null;

  return (
    <>
      <FigLabel {...B.fig} />

      <div className="slide-headline-row">
        <h1 className="slide-headline small">
          {highlight(B.headline, B.headlineKw)}
        </h1>
      </div>

      <div
        style={{
          position: "absolute",
          left: 48,
          top: 136,
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <span
          style={{
            fontFamily: "var(--mono)",
            fontSize: 10.5,
            letterSpacing: "0.22em",
            color: "var(--copper-600)",
            textTransform: "uppercase",
          }}
        >
          {B.qualifier}
        </span>
        <HintIcon text="Hover a station to open it, click to pin/unpin." />
      </div>

      {/* ── LEFT — the before, the tagline, the worked example, the closer ── */}
      <div
        style={{
          position: "absolute",
          left: 48,
          top: 182,
          width: 366,
          bottom: 84,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* The shift, stated as a static contrast rather than a morph. */}
        <Reveal on={showFigure} delay={80}>
          <div
            style={{
              fontFamily: "var(--mono)",
              fontSize: 9.5,
              letterSpacing: "0.24em",
              color: "var(--copper-700)",
              textTransform: "uppercase",
            }}
          >
            {B.shift.beforeLabel}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              marginTop: 9,
              position: "relative",
              width: "fit-content",
            }}
          >
            {B.shift.beforeChain.map((n, i) => (
              <span key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                {i > 0 && (
                  <span style={{ color: "var(--copper-800)", fontSize: 11 }}>→</span>
                )}
                <span
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: 10.5,
                    letterSpacing: "0.12em",
                    padding: "3px 7px",
                    border: "1px solid var(--copper-800)",
                    color:
                      n === "you" ? "var(--copper-200)" : "var(--neutral-500)",
                    background:
                      n === "you" ? "rgba(184,110,61,0.10)" : "transparent",
                  }}
                >
                  {n}
                </span>
              </span>
            ))}
            <span
              aria-hidden
              style={{
                position: "absolute",
                left: -4,
                right: -4,
                top: "50%",
                height: 1,
                background: "var(--copper-500)",
                transform: "scaleX(1)",
                transformOrigin: "left",
                opacity: 0.85,
              }}
            />
          </div>
          <div
            style={{
              fontFamily: "var(--serif)",
              fontStyle: "italic",
              fontSize: 12.5,
              color: "var(--neutral-400)",
              marginTop: 9,
            }}
          >
            {B.shift.beforeNote}
          </div>
        </Reveal>

        <div style={{ height: 26 }} />

        {/* Worked example — always on, so the abstraction never floats free. */}
        <Reveal on={showFigure} delay={220}>
          <div
            style={{
              border: "1px solid var(--copper-800)",
              background: "rgba(0,0,0,0.45)",
              padding: "12px 14px",
            }}
          >
            <div
              style={{
                fontFamily: "var(--mono)",
                fontSize: 9.5,
                letterSpacing: "0.24em",
                color: "var(--copper-300)",
                textTransform: "uppercase",
              }}
            >
              {B.example.kicker}
            </div>
            <div style={{ marginTop: 8 }}>
              <CopperRule on={showFigure} width="100%" />
            </div>
            <div
              style={{
                fontFamily: "var(--serif)",
                fontSize: 13,
                color: "var(--neutral-200)",
                lineHeight: 1.45,
                marginTop: 10,
              }}
            >
              <em
                style={{ color: "var(--copper-200)", fontStyle: "normal" }}
              >
                {B.example.when}
              </em>{" "}
              — {B.example.what}.
            </div>
            <div
              style={{
                fontFamily: "var(--mono)",
                fontSize: 10.5,
                color: "var(--neutral-300)",
                lineHeight: 1.45,
                marginTop: 10,
                paddingTop: 9,
                borderTop: "1px solid var(--copper-900)",
              }}
            >
              <span style={{ color: "var(--copper-400)" }}>
                {B.example.conditionLabel} ·{" "}
              </span>
              {B.example.condition}
            </div>
            <div
              style={{
                fontFamily: "var(--mono)",
                fontSize: 10.5,
                color: "var(--copper-200)",
                marginTop: 8,
                letterSpacing: "0.04em",
              }}
            >
              <span style={{ color: "var(--copper-700)" }}>
                {B.example.implLabel} ·{" "}
              </span>
              {B.example.impl}
            </div>
          </div>
        </Reveal>

        <div style={{ flex: 1, minHeight: 18 }} />

        <Reveal on={showLand} delay={60}>
          <p
            style={{
              fontFamily: "var(--display)",
              fontSize: 24,
              lineHeight: 1.15,
              color: "var(--copper-100)",
              margin: 0,
            }}
          >
            {highlight(B.tagline, B.taglineKw)}
          </p>
        </Reveal>

        <Reveal on={showLand} delay={220}>
          <p
            style={{
              fontFamily: "var(--serif)",
              fontStyle: "italic",
              fontSize: 14,
              color: "var(--neutral-400)",
              margin: "12px 0 0",
              lineHeight: 1.4,
            }}
          >
            {highlight(B.closer, B.closerKw)}
          </p>
        </Reveal>
      </div>

      {/* ── RIGHT — the open ring ─────────────────────────────────────────── */}
      <svg
        width={1280}
        height={720}
        viewBox="0 0 1280 720"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          opacity: showFigure ? 1 : 0,
          transition: "opacity 0.6s var(--ease)",
        }}
        aria-hidden
      >
        {/* No continuous base arc: the ring IS the five segments, split by
            visible notches. A solid band underneath read as one thick brown
            hoop at projector distance and buried the "five". */}
        {B.decisions.map((d, i) => {
          const lit = allLit || active === d.id;
          return (
            <path
              key={d.id}
              d={arc(R, GAP_START + i * SEG + 2.6, GAP_START + (i + 1) * SEG - 2.6)}
              fill="none"
              stroke={lit ? "var(--copper-300)" : "var(--copper-700)"}
              strokeWidth={lit ? 9 : 5}
              strokeLinecap="butt"
              style={{
                transition:
                  "stroke 0.25s var(--ease), stroke-width 0.25s var(--ease)",
              }}
            />
          );
        })}

        {/* Station dots. */}
        {B.decisions.map((d, i) => {
          const [x, y] = polar(R, stationAngle(i));
          const lit = allLit || active === d.id;
          return (
            <circle
              key={d.id}
              cx={x}
              cy={y}
              r={lit ? 6 : 4}
              fill={lit ? "var(--copper-200)" : "var(--copper-600)"}
              style={{ transition: "all 0.25s var(--ease)" }}
            />
          );
        })}

        {/* The runner — one cycle, unattended, forever. */}
        <g>
          <circle cx={CX + R} cy={CY} r={4.5} fill="var(--copper-100)" opacity={0.9}>
            <animateTransform
              attributeName="transform"
              type="rotate"
              from={`${GAP_START} ${CX} ${CY}`}
              to={`${GAP_START + SWEEP} ${CX} ${CY}`}
              dur="6s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0;0.95;0.95;0"
              keyTimes="0;0.08;0.9;1"
              dur="6s"
              repeatCount="indefinite"
            />
          </circle>
        </g>

        {/* Both ends terminate on the human. */}
        <path
          d={`M 560 384 L ${polar(R, GAP_START)[0] - 4} ${polar(R, GAP_START)[1] + 4}`}
          stroke="var(--copper-400)"
          strokeWidth={1.5}
          fill="none"
          markerEnd="url(#va-arrow)"
        />
        <path
          d={`M ${polar(R, GAP_START + SWEEP)[0] - 4} ${polar(R, GAP_START + SWEEP)[1] - 4} L 560 416`}
          stroke="var(--copper-400)"
          strokeWidth={1.5}
          fill="none"
          markerEnd="url(#va-arrow)"
        />
        <defs>
          <marker
            id="va-arrow"
            viewBox="0 0 8 8"
            refX={7}
            refY={4}
            markerWidth={5}
            markerHeight={5}
            orient="auto"
          >
            <path d="M 0 0 L 8 4 L 0 8 z" fill="var(--copper-300)" />
          </marker>
        </defs>
      </svg>

      {/* YOU — one block, sitting in the ring's gap, holding both ends. */}
      <Reveal
        on={showFigure}
        delay={300}
        style={{
          position: "absolute",
          left: 452,
          top: 372,
          width: 104,
          textAlign: "center",
        }}
      >
        <div
          style={{
            border: "1px solid var(--copper-300)",
            background: "rgba(184,110,61,0.12)",
            padding: "8px 0 9px",
          }}
        >
          <div
            style={{
              fontFamily: "var(--mono)",
              fontSize: 13,
              letterSpacing: "0.3em",
              color: "var(--copper-100)",
              textIndent: "0.3em",
            }}
          >
            YOU
          </div>
          <div
            style={{
              fontFamily: "var(--serif)",
              fontStyle: "italic",
              fontSize: 10.5,
              color: "var(--copper-300)",
              marginTop: 2,
            }}
          >
            set · sign
          </div>
        </div>
      </Reveal>

      {/* Station labels — the list, dissolved onto the figure. */}
      {B.decisions.map((d, i) => {
        const [x, y] = polar(R + 36, stationAngle(i));
        const lit = allLit || active === d.id;
        const isPinned = pinned === d.id;
        return (
          // Outer div owns the anchor transform. It cannot go on the Reveal:
          // `.fade.on` runs a `fadeReveal` keyframe that animates `transform`,
          // and a running CSS animation beats an inline style — the anchor
          // would be wiped and the label would land in the wrong place.
          <div
            key={d.id}
            data-no-advance=""
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: i === 2 ? 176 : 172,
              transform: LABEL_ANCHOR[i],
            }}
          >
          <Reveal
            on={showFigure}
            delay={340 + i * 90}
            data-testid={`va-station-${d.id}`}
            data-active={String(active === d.id)}
          >
            <div
              onMouseEnter={() => setHover(d.id)}
              onMouseLeave={() => setHover(null)}
              onClick={() => setPinned((c) => (c === d.id ? null : d.id))}
              style={{
                cursor: "pointer",
                padding: "5px 8px",
                textAlign: i === 2 ? "left" : "center",
                border: `1px solid ${isPinned ? "var(--copper-300)" : "transparent"}`,
                // Wash only on real selection. At step 1 everything lights, and
                // washing all five turned the labels back into a card grid —
                // exactly the thing this variant is arguing against.
                background:
                  active === d.id ? "rgba(184,110,61,0.10)" : "transparent",
                transition: "all 0.2s var(--ease)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  justifyContent: i === 2 ? "flex-start" : "center",
                  color: lit ? "var(--copper-100)" : "var(--copper-500)",
                }}
              >
                <LucideIcon name={d.icon} size={13} color="currentColor" />
                <span
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: 12.5,
                    letterSpacing: "0.2em",
                  }}
                >
                  {d.title}
                </span>
              </div>
              <div
                style={{
                  fontFamily: "var(--serif)",
                  fontStyle: "italic",
                  fontSize: 12.5,
                  lineHeight: 1.3,
                  color: lit ? "var(--neutral-100)" : "var(--neutral-400)",
                  marginTop: 3,
                  transition: "color 0.2s var(--ease)",
                }}
              >
                {d.essence}
              </div>
            </div>
          </Reveal>
          </div>
        );
      })}

      {/* Ring interior — the caption well. Never re-draws the figure. */}
      <div
        style={{
          position: "absolute",
          left: CX - 96,
          top: CY - 62,
          width: 192,
          height: 124,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          pointerEvents: "none",
        }}
      >
        {activeDecision ? (
          <>
            <div
              style={{
                fontFamily: "var(--mono)",
                fontSize: 9.5,
                letterSpacing: "0.24em",
                color: "var(--copper-400)",
              }}
            >
              {activeDecision.num} / 05
            </div>
            <div
              style={{
                fontFamily: "var(--serif)",
                fontSize: 12,
                lineHeight: 1.4,
                color: "var(--neutral-100)",
                marginTop: 7,
              }}
            >
              {activeDecision.long}
            </div>
            {"warning" in activeDecision && activeDecision.warning ? (
              <div
                style={{
                  fontFamily: "var(--serif)",
                  fontStyle: "italic",
                  fontSize: 10.5,
                  lineHeight: 1.35,
                  color: "var(--copper-300)",
                  marginTop: 7,
                }}
              >
                {activeDecision.warning}
              </div>
            ) : null}
          </>
        ) : (
          <>
            <div
              style={{
                fontFamily: "var(--mono)",
                fontSize: 11,
                letterSpacing: "0.28em",
                color: "var(--copper-500)",
              }}
            >
              FIVE DECISIONS
            </div>
            <div
              style={{
                fontFamily: "var(--serif)",
                fontStyle: "italic",
                fontSize: 14,
                lineHeight: 1.4,
                color: "var(--neutral-400)",
                marginTop: 8,
              }}
            >
              {B.shift.afterNote}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export const variantAName = "The Dial — five stations on one open ring";
