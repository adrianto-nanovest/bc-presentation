// OrchestrationPattern — self-contained SVG micro-diagrams for the four
// canonical sub-agent orchestration patterns rendered on F.7.
//
// Used in two modes:
//   - default: 180×110 viewport tile, four instances in a 2×2 grid
//   - zoomed:  560×360 viewport with timing/dataflow callouts overlaid in
//              italic serif copper-200 (per spec §10.4 ORCHESTRATION PATTERNS)
//
// Motion uses SMIL animations on `<circle>` pulse nodes (matching the
// `PitfallAnims.tsx` pattern used in E.8). Pulses travel along straight
// edges via `cx`/`cy` interpolation between fixed endpoint coordinates;
// no `<animateMotion>` so we don't pay the path-resolution cost. Each
// arrow draw is ~200ms; sequences chain via `begin` offsets.
//
// The `on` prop gates motion: when false, only the static nodes/edges
// render. When `animateOnReveal` is true and `on` is true, the SMIL
// animations resolve at component mount (default SMIL behavior).
import type { CSSProperties } from "react";

export type OrchestrationVariant =
  | "centralized"
  | "decentralized"
  | "chain"
  | "parallel";

export interface OrchestrationPatternProps {
  variant: OrchestrationVariant;
  /** Brighten / mount motion. When false, render dim static graph. */
  on: boolean;
  /** Auto-play SMIL animations on reveal. (SMIL begins at mount; this is
   *  effectively a documentation flag — kept for future gated re-runs.) */
  animateOnReveal?: boolean;
  /** Render the larger 560×360 version with timing/dataflow callouts. */
  zoomed?: boolean;
}

// ────────────────────── shared style tokens ──────────────────────

const NODE_R = 9; // 18px diameter (reduced from 12/24px)
const NODE_FILL = "var(--neutral-900)";
const NODE_STROKE = "var(--copper-700)";
const NODE_STROKE_W = 1.1;
const NODE_TEXT = "var(--copper-200)";
const EDGE_STROKE = "var(--copper-500)";
const EDGE_W = 1.1;
const PULSE_R = 2.5;
const PULSE_FILL = "var(--copper-200)";

const PULSE_DUR = 0.25; // 250ms — visually reads as ~200ms with ease
const LOOP_GAP = 0.6; // pause after a full cycle before next start

// Static node — circle + centered label glyph.
function Node({
  cx,
  cy,
  label,
  r = NODE_R,
  pulse = false,
  pulseDelay = 0,
}: {
  cx: number;
  cy: number;
  label: string;
  r?: number;
  pulse?: boolean;
  pulseDelay?: number;
}) {
  return (
    <g>
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill={NODE_FILL}
        stroke={NODE_STROKE}
        strokeWidth={NODE_STROKE_W}
      >
        {pulse ? (
          <animate
            attributeName="r"
            values={`${r};${r * 1.18};${r}`}
            keyTimes="0;0.5;1"
            dur="1.6s"
            begin={`${pulseDelay}s`}
            repeatCount="indefinite"
          />
        ) : null}
      </circle>
      <text
        x={cx}
        y={cy + 1}
        textAnchor="middle"
        dominantBaseline="middle"
        fill={NODE_TEXT}
        fontSize={r >= 22 ? 13 : 7.5}
        fontFamily="var(--mono)"
        letterSpacing="0.04em"
      >
        {label}
      </text>
    </g>
  );
}

// Edge — single line between two nodes (no arrowhead, copper-500 1.5px).
function Edge({
  x1,
  y1,
  x2,
  y2,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}) {
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={EDGE_STROKE}
      strokeWidth={EDGE_W}
      strokeLinecap="round"
    />
  );
}

// Travelling pulse along a straight segment. `begin` chains sequences.
function PulseDot({
  x1,
  y1,
  x2,
  y2,
  begin,
  dur = PULSE_DUR,
  repeat = true,
  cycleDur,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  begin: number;
  dur?: number;
  repeat?: boolean;
  /** Total cycle duration for repeating animation. */
  cycleDur?: number;
}) {
  // We keep the dot invisible outside its active window by animating opacity
  // alongside position. For a repeating cycle we set the same `dur` for both
  // animations; for one-shot, both freeze at end.
  const repeatProps = repeat
    ? { repeatCount: "indefinite" as const, dur: `${cycleDur ?? dur}s` }
    : { fill: "freeze" as const, dur: `${dur}s` };

  // For the repeating case we encode the visible window inside the keyTimes.
  if (repeat) {
    const cycle = cycleDur ?? dur;
    const startFrac = Math.min(begin / cycle, 0.95);
    const endFrac = Math.min((begin + dur) / cycle, 1);
    const beforeEnd = Math.max(startFrac - 0.001, 0);
    const afterEnd = Math.min(endFrac + 0.001, 1);
    const keyTimes = `0;${beforeEnd.toFixed(4)};${startFrac.toFixed(4)};${endFrac.toFixed(4)};${afterEnd.toFixed(4)};1`;
    return (
      <circle r={PULSE_R} fill={PULSE_FILL} cx={x1} cy={y1} opacity={0}>
        <animate
          attributeName="cx"
          values={`${x1};${x1};${x1};${x2};${x2};${x2}`}
          keyTimes={keyTimes}
          {...repeatProps}
        />
        <animate
          attributeName="cy"
          values={`${y1};${y1};${y1};${y2};${y2};${y2}`}
          keyTimes={keyTimes}
          {...repeatProps}
        />
        <animate
          attributeName="opacity"
          values="0;0;1;1;0;0"
          keyTimes={keyTimes}
          {...repeatProps}
        />
      </circle>
    );
  }

  // One-shot (e.g., used inside larger composite animations if ever needed).
  return (
    <circle r={PULSE_R} fill={PULSE_FILL} cx={x1} cy={y1} opacity={0}>
      <animate
        attributeName="cx"
        values={`${x1};${x2}`}
        begin={`${begin}s`}
        {...repeatProps}
      />
      <animate
        attributeName="cy"
        values={`${y1};${y2}`}
        begin={`${begin}s`}
        {...repeatProps}
      />
      <animate
        attributeName="opacity"
        values="0;1;1;0"
        keyTimes="0;0.05;0.95;1"
        begin={`${begin}s`}
        {...repeatProps}
      />
    </circle>
  );
}

// ────────────────────── per-variant geometry ──────────────────────

// 180×110 default viewport coordinate system (reduced from 220×140).
const W = 180;
const H = 110;

// CENTRALIZED — planner [P] top center, workers [a][b][c] across bottom.
// Sequential round-trip: P→a→P→b→P→c→P. Total cycle: 6 hops × 0.25s + gap.
function CentralizedFigure({ on }: { on: boolean }) {
  const Px = W / 2;
  const Py = 22;
  const wy = 84;
  const aX = 42;
  const bX = 90;
  const cX = 138;

  // 6 hops + LOOP_GAP padding
  const cycle = PULSE_DUR * 6 + LOOP_GAP;

  return (
    <>
      {/* Edges */}
      <Edge x1={Px} y1={Py + NODE_R} x2={aX} y2={wy - NODE_R} />
      <Edge x1={Px} y1={Py + NODE_R} x2={bX} y2={wy - NODE_R} />
      <Edge x1={Px} y1={Py + NODE_R} x2={cX} y2={wy - NODE_R} />

      {/* Nodes */}
      <Node cx={Px} cy={Py} label="P" pulse={on} />
      <Node cx={aX} cy={wy} label="a" />
      <Node cx={bX} cy={wy} label="b" />
      <Node cx={cX} cy={wy} label="c" />

      {on ? (
        <>
          {/* P → a → P */}
          <PulseDot
            x1={Px}
            y1={Py + NODE_R}
            x2={aX}
            y2={wy - NODE_R}
            begin={0}
            cycleDur={cycle}
          />
          <PulseDot
            x1={aX}
            y1={wy - NODE_R}
            x2={Px}
            y2={Py + NODE_R}
            begin={PULSE_DUR}
            cycleDur={cycle}
          />
          {/* P → b → P */}
          <PulseDot
            x1={Px}
            y1={Py + NODE_R}
            x2={bX}
            y2={wy - NODE_R}
            begin={PULSE_DUR * 2}
            cycleDur={cycle}
          />
          <PulseDot
            x1={bX}
            y1={wy - NODE_R}
            x2={Px}
            y2={Py + NODE_R}
            begin={PULSE_DUR * 3}
            cycleDur={cycle}
          />
          {/* P → c → P */}
          <PulseDot
            x1={Px}
            y1={Py + NODE_R}
            x2={cX}
            y2={wy - NODE_R}
            begin={PULSE_DUR * 4}
            cycleDur={cycle}
          />
          <PulseDot
            x1={cX}
            y1={wy - NODE_R}
            x2={Px}
            y2={Py + NODE_R}
            begin={PULSE_DUR * 5}
            cycleDur={cycle}
          />
        </>
      ) : null}
    </>
  );
}

// DECENTRALIZED — 4 nodes in a 2×2 mesh, all interconnected (6 edges).
// Bidirectional pulses peer-to-peer; we stagger 6 directed pulses across
// the cycle so the mesh feels alive without overcrowding.
function DecentralizedFigure({ on }: { on: boolean }) {
  const left = 42;
  const right = 138;
  const top = 28;
  const bot = 82;
  // Square corners: A(tl), B(tr), C(bl), D(br)
  const A = { x: left, y: top, label: "A" };
  const B = { x: right, y: top, label: "B" };
  const C = { x: left, y: bot, label: "C" };
  const D = { x: right, y: bot, label: "D" };

  const cycle = PULSE_DUR * 6 + LOOP_GAP;

  // 6 edges (full mesh of 4): AB, AC, AD, BC, BD, CD
  // For each edge we direct a pulse one way; stagger across cycle.
  const edges: Array<{
    from: typeof A;
    to: typeof A;
    delay: number;
  }> = [
    { from: A, to: B, delay: 0 },
    { from: B, to: D, delay: PULSE_DUR },
    { from: D, to: C, delay: PULSE_DUR * 2 },
    { from: C, to: A, delay: PULSE_DUR * 3 },
    { from: A, to: D, delay: PULSE_DUR * 4 },
    { from: B, to: C, delay: PULSE_DUR * 5 },
  ];

  return (
    <>
      {/* Edges (static lines for all 6 connections) */}
      {edges.map((e, i) => (
        <Edge
          key={`edge-${i}`}
          x1={e.from.x}
          y1={e.from.y}
          x2={e.to.x}
          y2={e.to.y}
        />
      ))}

      {/* Nodes */}
      <Node cx={A.x} cy={A.y} label={A.label} />
      <Node cx={B.x} cy={B.y} label={B.label} />
      <Node cx={C.x} cy={C.y} label={C.label} />
      <Node cx={D.x} cy={D.y} label={D.label} />

      {on
        ? edges.map((e, i) => (
            <PulseDot
              key={`pulse-${i}`}
              x1={e.from.x}
              y1={e.from.y}
              x2={e.to.x}
              y2={e.to.y}
              begin={e.delay}
              cycleDur={cycle}
            />
          ))
        : null}
    </>
  );
}

// CHAIN — A → B → C in a horizontal line. Single sequential pulse.
function ChainFigure({ on }: { on: boolean }) {
  const y = H / 2;
  const ax = 32;
  const bx = 90;
  const cx = 148;

  const cycle = PULSE_DUR * 2 + LOOP_GAP;

  return (
    <>
      <Edge x1={ax + NODE_R} y1={y} x2={bx - NODE_R} y2={y} />
      <Edge x1={bx + NODE_R} y1={y} x2={cx - NODE_R} y2={y} />

      <Node cx={ax} cy={y} label="A" />
      <Node cx={bx} cy={y} label="B" />
      <Node cx={cx} cy={y} label="C" />

      {on ? (
        <>
          <PulseDot
            x1={ax + NODE_R}
            y1={y}
            x2={bx - NODE_R}
            y2={y}
            begin={0}
            cycleDur={cycle}
          />
          <PulseDot
            x1={bx + NODE_R}
            y1={y}
            x2={cx - NODE_R}
            y2={y}
            begin={PULSE_DUR}
            cycleDur={cycle}
          />
        </>
      ) : null}
    </>
  );
}

// PARALLEL — single top P planner → 3 workers fan-out, then pulses loop
// BACK UP to the SAME top P (no bottom merge node). The planner pulses on
// the return-trip arrival so it reads as "P dispatches, P receives back".
function ParallelFigure({ on }: { on: boolean }) {
  const Ptx = W / 2;
  const Pty = 22;
  const wy = 72;
  const aX = 42;
  const bX = 90;
  const cX = 138;

  // Cycle: fan-out (0.25s) → fan-in back to same P (0.25s) → gap
  const cycle = PULSE_DUR * 2 + LOOP_GAP;

  return (
    <>
      {/* Edges between top P and each worker — shared for fan-out + fan-in */}
      <Edge x1={Ptx} y1={Pty + NODE_R} x2={aX} y2={wy - NODE_R} />
      <Edge x1={Ptx} y1={Pty + NODE_R} x2={bX} y2={wy - NODE_R} />
      <Edge x1={Ptx} y1={Pty + NODE_R} x2={cX} y2={wy - NODE_R} />

      {/* Nodes — single planner at top, 3 workers below. No bottom P. */}
      <Node cx={Ptx} cy={Pty} label="P" pulse={on} />
      <Node cx={aX} cy={wy} label="a" />
      <Node cx={bX} cy={wy} label="b" />
      <Node cx={cX} cy={wy} label="c" />

      {on ? (
        <>
          {/* Fan-out (simultaneous) — P → workers */}
          <PulseDot
            x1={Ptx}
            y1={Pty + NODE_R}
            x2={aX}
            y2={wy - NODE_R}
            begin={0}
            cycleDur={cycle}
          />
          <PulseDot
            x1={Ptx}
            y1={Pty + NODE_R}
            x2={bX}
            y2={wy - NODE_R}
            begin={0}
            cycleDur={cycle}
          />
          <PulseDot
            x1={Ptx}
            y1={Pty + NODE_R}
            x2={cX}
            y2={wy - NODE_R}
            begin={0}
            cycleDur={cycle}
          />
          {/* Fan-in (simultaneous) — workers loop BACK to the SAME top P */}
          <PulseDot
            x1={aX}
            y1={wy - NODE_R}
            x2={Ptx}
            y2={Pty + NODE_R}
            begin={PULSE_DUR}
            cycleDur={cycle}
          />
          <PulseDot
            x1={bX}
            y1={wy - NODE_R}
            x2={Ptx}
            y2={Pty + NODE_R}
            begin={PULSE_DUR}
            cycleDur={cycle}
          />
          <PulseDot
            x1={cX}
            y1={wy - NODE_R}
            x2={Ptx}
            y2={Pty + NODE_R}
            begin={PULSE_DUR}
            cycleDur={cycle}
          />
        </>
      ) : null}
    </>
  );
}

// ────────────────────── zoomed callouts ──────────────────────

interface CalloutCopy {
  timing: string;
  dataflow: string;
}

const ZOOM_CALLOUTS: Record<OrchestrationVariant, CalloutCopy> = {
  centralized: {
    timing: "Round-trip: ~500ms each · Total: ~2.5s for 5 workers",
    dataflow: "context shared via planner",
  },
  decentralized: {
    timing: "Peer hops: variable · No bottleneck, no global view",
    dataflow: "each peer holds its own context slice",
  },
  chain: {
    timing: "Per-link: ~500ms · Total scales linearly with chain depth",
    dataflow: "context handed forward, not returned",
  },
  parallel: {
    timing: "Fan-out: 1 hop · Fan-in: 1 hop · Total: ~1s regardless of N",
    dataflow: "isolated worker contexts merged at the planner",
  },
};

// ────────────────────── public component ──────────────────────

export function OrchestrationPattern({
  variant,
  on,
  // Reserved for future gated re-runs; SMIL already begins at mount.
  animateOnReveal: _animateOnReveal = false,
  zoomed = false,
}: OrchestrationPatternProps) {
  const wrapW = zoomed ? 560 : 180;
  const wrapH = zoomed ? 360 : 110;

  // Scale factor relative to the canonical figure coordinate space.
  const sx = zoomed ? wrapW / W : 1;
  const sy = zoomed ? (wrapH - 110) / H : 1; // leave room for callouts

  const wrapStyle: CSSProperties = {
    width: wrapW,
    height: wrapH,
    opacity: on ? 1 : 0.5,
    transition: "opacity 400ms var(--ease)",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
  };

  return (
    <div data-testid={`orchestration-${variant}`} style={wrapStyle}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width={W * sx}
        height={H * sy}
        style={{
          display: "block",
          margin: "0 auto",
          overflow: "visible",
        }}
      >
        {variant === "centralized" ? <CentralizedFigure on={on} /> : null}
        {variant === "decentralized" ? <DecentralizedFigure on={on} /> : null}
        {variant === "chain" ? <ChainFigure on={on} /> : null}
        {variant === "parallel" ? <ParallelFigure on={on} /> : null}
      </svg>

      {zoomed ? (
        <div
          style={{
            marginTop: 16,
            padding: "0 32px",
            display: "flex",
            flexDirection: "column",
            gap: 8,
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontFamily: "var(--mono)",
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--copper-300)",
              margin: 0,
            }}
          >
            {ZOOM_CALLOUTS[variant].timing}
          </p>
          <p
            style={{
              fontFamily: "var(--serif)",
              fontStyle: "italic",
              fontSize: 15,
              color: "var(--copper-200)",
              margin: 0,
              lineHeight: 1.4,
            }}
          >
            {ZOOM_CALLOUTS[variant].dataflow}
          </p>
        </div>
      ) : null}
    </div>
  );
}
