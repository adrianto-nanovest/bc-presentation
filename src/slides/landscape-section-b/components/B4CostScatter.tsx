// B4CostScatter — R3 layout for slide B.4's Cost × Intelligence category.
//
// A small scatter plot with mono-cap axis ticks, an annotation arrow from
// the most expensive frontier model to the cheapest open-weight near-peer,
// and a single italic label parked along the arrow.
//
// Coordinate system: x = blended $/M (log scale $1 → $16); y = Intelligence
// Index (linear 48 → 62). Dots are colored by `kind`:
//   • frontier   → copper-700 fill
//   • open-weight → copper-300 fill (matches table highlight idiom)
//
// Label placement rules (Task 21):
//   • Points in the right ~15% of the plot area render their label LEFT of
//     the dot so they don't clip the SVG right edge.
//   • Specific overlap pairs (GLM, Qwen 3.6) get vertical offsets + thin
//     connector lines to avoid label-on-label clashes.
//
// Annotation:
//   • Curved SVG path that bows ABOVE the data so it never crosses the
//     Gemini 3.1 Pro dot. Label parks in the upper-right whitespace with a
//     neutral-950 halo so it stays legible over gridlines.
import { useEffect, useRef, useState } from "react";
import type { B4ScatterAnnotation, B4ScatterPoint } from "../content";

export interface B4CostScatterProps {
  points: readonly B4ScatterPoint[];
  annotation: B4ScatterAnnotation;
}

// SVG viewport — wider right padding (Task 21) so labels on far-right dots
// have somewhere to live when they flip to the left side.
const VB_W = 580;
const VB_H = 320;
const PAD_L = 56;
const PAD_R = 32;
const PAD_T = 16;
const PAD_B = 36;

const X_MIN = 1.0;
const X_MAX = 16.0;
const Y_MIN = 48;
const Y_MAX = 62;

// Threshold: points at or past this x (in plot-area fraction) flip their
// labels to the LEFT side of the dot to avoid clipping the SVG right edge.
const RIGHT_FLIP_FRAC = 0.85;

const X_TICKS: readonly number[] = [1, 2, 4, 8, 16];
const Y_TICKS: readonly number[] = [50, 54, 58, 62];

function xToPx(cost: number): number {
  const t =
    (Math.log2(Math.max(cost, X_MIN)) - Math.log2(X_MIN)) /
    (Math.log2(X_MAX) - Math.log2(X_MIN));
  return PAD_L + t * (VB_W - PAD_L - PAD_R);
}

function yToPx(intel: number): number {
  const t = (intel - Y_MIN) / (Y_MAX - Y_MIN);
  return PAD_T + (1 - t) * (VB_H - PAD_T - PAD_B);
}

// Per-point vertical label offsets — used to keep labels off their dots and
// to break ties between dots that collide in cost+intel space. Positive y
// nudges the label DOWN; negative nudges it UP. Labels with a nonzero entry
// also center-anchor on the dot (textAnchor="middle"), with a thin vertical
// connector line from the dot to the label.
const LABEL_Y_OFFSET: Record<string, number> = {
  GLM: -14,                  // above the dot
  "Qwen 3.6": 14,            // below the dot
  "Claude Opus 4.7": 14,     // below the dot
  "GPT-5.5": 14,             // below the dot — would otherwise clip the right edge
};

// Per-point label-side override — wins over the right-edge auto-flip. Use for
// points that aren't near the right edge but still benefit from a manual side
// (e.g. to avoid overlapping a sibling label cluster).
const LABEL_SIDE_OVERRIDE: Record<string, "left" | "right"> = {
  "Grok 4.3": "left",
};

export function B4CostScatter({ points, annotation }: B4CostScatterProps) {
  // Mount gate so dots can transition from rest.
  const [mounted, setMounted] = useState(false);
  const rafRef = useRef<number | null>(null);
  useEffect(() => {
    rafRef.current = window.requestAnimationFrame(() => setMounted(true));
    return () => {
      if (rafRef.current !== null) window.cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const from = points.find((p) => p.name === annotation.from);
  const to = points.find((p) => p.name === annotation.to);

  const plotW = VB_W - PAD_L - PAD_R;

  return (
    <div
      data-testid="b4-cost-scatter"
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
      }}
    >
      <svg
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        preserveAspectRatio="xMidYMid meet"
        style={{ width: "100%", height: "auto", display: "block" }}
        aria-hidden
      >
        {/* X / Y axis lines */}
        <line
          x1={PAD_L}
          y1={VB_H - PAD_B}
          x2={VB_W - PAD_R}
          y2={VB_H - PAD_B}
          stroke="var(--copper-800)"
          strokeWidth={1}
        />
        <line
          x1={PAD_L}
          y1={PAD_T}
          x2={PAD_L}
          y2={VB_H - PAD_B}
          stroke="var(--copper-800)"
          strokeWidth={1}
        />

        {/* X gridlines + tick labels */}
        {X_TICKS.map((t) => {
          const x = xToPx(t);
          return (
            <g key={`x-${t}`}>
              <line
                x1={x}
                y1={PAD_T}
                x2={x}
                y2={VB_H - PAD_B}
                stroke="var(--copper-900)"
                strokeOpacity={0.35}
                strokeWidth={1}
                strokeDasharray="2 4"
              />
              <text
                x={x}
                y={VB_H - PAD_B + 16}
                textAnchor="middle"
                fontFamily="var(--mono)"
                fontSize={10}
                letterSpacing="0.14em"
                fill="var(--copper-500)"
              >
                ${t}
              </text>
            </g>
          );
        })}

        {/* Y gridlines + tick labels */}
        {Y_TICKS.map((t) => {
          const y = yToPx(t);
          return (
            <g key={`y-${t}`}>
              <line
                x1={PAD_L}
                y1={y}
                x2={VB_W - PAD_R}
                y2={y}
                stroke="var(--copper-900)"
                strokeOpacity={0.35}
                strokeWidth={1}
                strokeDasharray="2 4"
              />
              <text
                x={PAD_L - 8}
                y={y + 3}
                textAnchor="end"
                fontFamily="var(--mono)"
                fontSize={10}
                letterSpacing="0.14em"
                fill="var(--copper-500)"
              >
                {t}
              </text>
            </g>
          );
        })}

        {/* Axis titles */}
        <text
          x={(PAD_L + VB_W - PAD_R) / 2}
          y={VB_H - 6}
          textAnchor="middle"
          fontFamily="var(--mono)"
          fontSize={10}
          letterSpacing="0.2em"
          fill="var(--copper-300)"
        >
          BLENDED $/M (LOG)
        </text>
        <text
          x={-((PAD_T + VB_H - PAD_B) / 2)}
          y={14}
          transform="rotate(-90)"
          textAnchor="middle"
          fontFamily="var(--mono)"
          fontSize={10}
          letterSpacing="0.2em"
          fill="var(--copper-300)"
        >
          INTELLIGENCE
        </text>

        {/* Annotation — curved path bowing ABOVE the data so it never
            crosses the Gemini 3.1 Pro dot. Label parks in the upper-right
            quadrant with a neutral-950 halo so the gridlines under it
            don't fight for legibility. */}
        {from && to && (
          <g
            data-testid="b4-scatter-annotation"
            style={{
              opacity: mounted ? 1 : 0,
              transition: "opacity 400ms var(--ease) 640ms",
            }}
          >
            <defs>
              <marker
                id="b4-arrow"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M0,0 L10,5 L0,10 z" fill="var(--copper-300)" />
              </marker>
            </defs>

            {(() => {
              const x1 = xToPx(from.cost);
              const y1 = yToPx(from.intelligence);
              const x2 = xToPx(to.cost);
              const y2 = yToPx(to.intelligence);
              // Quadratic control point above the chord midpoint so the
              // curve bows over the Gemini 3.1 Pro dot. Apex tuned so the
              // label that parks below it never clips the top of the SVG
              // viewBox.
              const ctrlX = (x1 + x2) / 2;
              const ctrlY = Math.min(y1, y2) - 40;
              const d = `M ${x1} ${y1} Q ${ctrlX} ${ctrlY} ${x2} ${y2}`;

              // Label parks just below the apex of the curve so it sits
              // inside the chart area instead of clipping the top edge.
              const labelX = ctrlX;
              const labelY = ctrlY + 22;
              const labelText = annotation.label;

              return (
                <>
                  <path
                    d={d}
                    fill="none"
                    stroke="var(--copper-300)"
                    strokeWidth={1.5}
                    strokeDasharray="3 4"
                    markerEnd="url(#b4-arrow)"
                  />
                  {/* Halo behind the label so gridlines don't bleed through. */}
                  <text
                    x={labelX}
                    y={labelY}
                    textAnchor="middle"
                    fontFamily="var(--serif)"
                    fontStyle="italic"
                    fontSize={12}
                    fill="var(--neutral-950)"
                    stroke="var(--neutral-950)"
                    strokeWidth={4}
                    strokeLinejoin="round"
                    paintOrder="stroke"
                  >
                    {labelText}
                  </text>
                  <text
                    x={labelX}
                    y={labelY}
                    textAnchor="middle"
                    fontFamily="var(--serif)"
                    fontStyle="italic"
                    fontSize={12}
                    fill="var(--copper-200)"
                  >
                    {labelText}
                  </text>
                </>
              );
            })()}
          </g>
        )}

        {/* Dots + labels */}
        {points.map((p, i) => {
          const cx = xToPx(p.cost);
          const cy = yToPx(p.intelligence);
          const isFrontier = p.kind === "frontier";
          const fill = isFrontier ? "var(--copper-700)" : "var(--copper-300)";
          const stroke = isFrontier ? "var(--copper-300)" : "var(--copper-100)";

          // Right-edge points flip labels LEFT to avoid clipping the SVG.
          // A per-point override wins over the auto-flip when set.
          const xFrac = (cx - PAD_L) / plotW;
          const side: "left" | "right" =
            LABEL_SIDE_OVERRIDE[p.name] ??
            (xFrac >= RIGHT_FLIP_FRAC ? "left" : "right");

          // Optional vertical offset for known label collisions. When a dot
          // has an offset, its label centers horizontally on the dot and the
          // connector becomes a vertical drop/rise — this keeps the offset
          // axis and the connector axis aligned.
          const dy = LABEL_Y_OFFSET[p.name] ?? 0;
          const centered = dy !== 0;
          const labelX = centered
            ? cx
            : side === "right"
              ? cx + 10
              : cx - 10;
          const labelY = cy + 3 + dy;
          const textAnchor: "start" | "middle" | "end" = centered
            ? "middle"
            : side === "right"
              ? "start"
              : "end";

          return (
            <g
              key={p.name}
              data-testid={`b4-scatter-dot-${p.name}`}
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? "scale(1)" : "scale(0.4)",
                transformOrigin: `${cx}px ${cy}px`,
                transition: `opacity 320ms var(--ease) ${
                  120 + i * 60
                }ms, transform 320ms var(--ease) ${120 + i * 60}ms`,
              }}
            >
              {/* Vertical connector from the dot to the offset label. The
                  endpoint sits just shy of the label baseline so the line
                  doesn't poke into the text. */}
              {centered && (
                <line
                  x1={cx}
                  y1={cy + (dy > 0 ? 6 : -6)}
                  x2={cx}
                  y2={dy > 0 ? labelY - 10 : labelY + 4}
                  stroke="var(--copper-700)"
                  strokeWidth={0.8}
                />
              )}
              <circle
                cx={cx}
                cy={cy}
                r={6}
                fill={fill}
                stroke={stroke}
                strokeWidth={1}
              />
              <text
                x={labelX}
                y={labelY}
                textAnchor={textAnchor}
                fontFamily="var(--serif)"
                fontSize={11}
                fill={isFrontier ? "var(--neutral-100)" : "var(--copper-100)"}
              >
                {p.name}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Legend strip under the plot. */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 18,
          marginTop: 8,
          fontFamily: "var(--mono)",
          fontSize: 9,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "var(--copper-500)",
          opacity: mounted ? 1 : 0,
          transition: "opacity 320ms var(--ease) 720ms",
        }}
      >
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          <span
            style={{
              width: 9,
              height: 9,
              borderRadius: "50%",
              background: "var(--copper-700)",
              border: "1px solid var(--copper-300)",
              display: "inline-block",
            }}
          />
          Frontier
        </span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          <span
            style={{
              width: 9,
              height: 9,
              borderRadius: "50%",
              background: "var(--copper-300)",
              border: "1px solid var(--copper-100)",
              display: "inline-block",
            }}
          />
          Open-weight
        </span>
      </div>
    </div>
  );
}
