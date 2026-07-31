// E.9 CONTEXT DISTRACTION — the compounding/degradation figure.
//
// Replaces the original 2.2s progress-bar-and-curve SMIL anim, which showed a
// bar filling next to a line falling and never said the two were the same
// event. Selected from four prototyped variants — gh issue #11; the three that
// lost, plus the original, are kept switchable in a dev build. See "Switching"
// below.
//
// ── The sync mechanism (the point of the whole figure) ───────────────────────
// One clock produces one derived number: `T`, the cumulative token total at
// time t. BOTH panes are pure functions of `T`. The degradation curve is not on
// its own timeline that happens to be timed to match the growth — it is
// plotted against the very variable that drives the growth, so the two cannot
// drift. `T` advances continuously (the curve never lags behind a turn) but
// rises in per-turn beats, so each turn still reads as a discrete event:
// `frameAt` eases `T` over the first 70% of a turn's slot, then holds.
//
// ── What it renders — "one shared axis" ─────────────────────────────────────
//   • Both panes sit on ONE x-axis of cumulative tokens, stacked top/bottom, so
//     a single playhead crosses both. Sync is the layout, not a claim. (The
//     brief asked for left/right; the shared axis was chosen over it precisely
//     because a left/right split cannot share a scale.)
//   • Top: one block per turn, its WIDTH being that turn's new tokens — so the
//     blocks widen to the right and the compounding is spatial. Each block is
//     split prompt/response, with a stronger turn boundary over the top, or six
//     turns read as twelve.
//   • Every turn draws a re-send arc back to each earlier turn, because every
//     turn re-sends all of them. The arc count runs 0,1,3,6,10,15 — the
//     quadratic is on screen, and the readout counts it.
//   • Bottom: the quality curve, its y-axis clipped at 40% AND LABELLED. Drawn
//     100%→0% the curve only reaches ~0.48 and the fall read as a shrug.
//   • Ends on the DEGRADED badge and holds; re-hovering the card replays it,
//     because PitfallCanvas keys this subtree on the active pitfall.
//
// ── Honesty of the numbers ─────────────────────────────────────────────────
// The token ladder (6→15→30→52→87→140k) is a plausible shape, NOT a
// measurement, and the quality curve is a trend, not a benchmark — which is why
// its y-axis carries no numeric ticks beyond the two range ends. The only
// grounded quantity is the ~100k threshold marker (Gemini team, via
// docs/researches/context-engineering-pitfalls.md § Context Distraction).
// Putting a real curve on this slide needs a cited source first.
//
// Exports (PDF/PPTX) are unaffected: this figure only exists while a pitfall
// card is hovered or pinned, and E.9's canonicalPose has no card active.
//
// Switching variants (dev only, never bundled for production — see
// E9DistractionAlternates.tsx): `?proto=current|A|B|C|D` plus `[` / `]` to
// cycle, `\` to replay, and a pause/scrub control. Scrubbing is how the sync
// gets judged: stop anywhere and the two panes still agree. To ship a different
// variant permanently, move its figure into this file and repoint
// PRODUCTION_KEY / ProductionFigure.
// (`?variant=` is taken by the berau|general deck build — src/variant.ts.)
import { useEffect, useRef, useState, type ComponentType } from "react";

// ───────────────────── the shared model ─────────────────────

/** New tokens added per turn, in thousands. Compounding ~1.55×. */
export const NEW_K = [6, 9.3, 14.4, 22.3, 34.6, 53.6] as const;

/** Cumulative total after each turn: 6 → 15 → 30 → 52 → 87 → 140 (k). */
export const CUM_K = NEW_K.reduce<number[]>(
  (acc, n, i) => [...acc, (acc[i - 1] ?? 0) + n],
  [],
);

export const TURNS = NEW_K.length;
export const T_MAX = CUM_K[TURNS - 1];
/** ~100k tokens — the documented point where degradation is unmistakable. */
export const THRESHOLD_K = 100;
/** Prompt's share of each turn's new tokens; the rest is the response. */
export const PROMPT_SHARE = 0.42;

const LEAD = 0.25; // beat before turn 1
const TURN_DUR = 0.85; // seconds per turn
const RISE = 0.7; // fraction of a turn slot spent rising; rest holds
const SETTLE = 0.7; // after the last turn, before DEGRADED lands
export const TOTAL_DUR = LEAD + TURNS * TURN_DUR + SETTLE;

const easeOut = (u: number) => 1 - Math.pow(1 - u, 3);

export interface Frame {
  /** Cumulative tokens (k) right now — the one variable both halves read. */
  T: number;
  /** 1-based index of the turn in flight; 0 before the first. */
  turn: number;
  /** Rise progress of the turn in flight, 0→1. */
  u: number;
  /** Turns whose rise has completed. */
  done: number;
  /** True once the whole sequence has settled. */
  degraded: boolean;
}

function frameAt(t: number): Frame {
  const x = t - LEAD;
  if (x <= 0) {
    return { T: 0, turn: 0, u: 0, done: 0, degraded: false };
  }
  const i = Math.min(TURNS - 1, Math.floor(x / TURN_DUR));
  const phase = Math.min(1, x / TURN_DUR - i);
  const u = easeOut(Math.min(1, phase / RISE));
  const prev = i === 0 ? 0 : CUM_K[i - 1];
  return {
    T: prev + u * (CUM_K[i] - prev),
    turn: i + 1,
    u,
    done: u >= 1 ? i + 1 : i,
    degraded: t >= LEAD + TURNS * TURN_DUR + 0.25,
  };
}

/**
 * Response quality as a function of cumulative tokens. Monotone, accelerating
 * — flat at first, falling away past the threshold. Shape only; see the
 * "NUMBERS ARE ILLUSTRATIVE" note at the top of this file.
 */
export const perf = (tokensK: number) =>
  1 - 0.52 * Math.pow(Math.max(0, tokensK) / T_MAX, 1.6);

/** The band an audience reads as "the dumb zone". */
export const DUMB_ZONE = 0.66;

/**
 * Bottom of the plotted y-range. The curve only falls to ~0.48, so a chart
 * drawn 100%→0% spends half its height empty and the fall reads as a shrug.
 * Clipping the axis at 40% (and labelling it) makes the same honest curve read
 * as a collapse.
 */
export const PERF_FLOOR = 0.4;

/** Perf value → y inside a chart box. */
export const perfY = (p: number, y0: number, h: number) =>
  y0 + (1 - (p - PERF_FLOOR) / (1 - PERF_FLOOR)) * h;

// ───────────────────── palette ─────────────────────

export const C = {
  carried: "rgba(122,70,38,0.55)", // copper-700 — tokens dragged forward
  carriedLine: "rgba(122,70,38,0.9)",
  prompt: "rgb(201,133,72)", // copper-400
  response: "rgb(232,196,160)", // copper-200
  rule: "rgba(212,153,102,0.35)",
  ruleFaint: "rgba(212,153,102,0.16)",
  label: "rgb(217,158,108)", // copper-300
  labelDim: "rgb(180,128,86)",
  curve: "rgb(229,199,159)",
  bad: "rgb(168,90,60)",
  badFill: "rgba(168,90,60,0.12)",
} as const;

export const MONO = "var(--mono)";
export const SVG_W = 620;
export const SVG_H = 300;
export const SVG_STYLE: React.CSSProperties = { width: SVG_W, height: SVG_H };

// ───────────────────── shared bits (math + chrome only) ─────────────────────
// Deliberately NOT a shared <Chart> component: each variant is free to throw
// out the chart's orientation and fill, and two of them do.

/**
 * Sample the perf curve from 0 to `T` in a chart box, as an SVG path.
 * `closeToTop` shuts the path against the 100% line instead of the axis, so the
 * filled region is the quality LOST rather than the quality kept.
 */
export function curvePath(
  T: number,
  x0: number,
  y0: number,
  w: number,
  h: number,
  closeToTop = false,
) {
  if (T <= 0) return "";
  const n = 44;
  const pts: string[] = [];
  for (let i = 0; i <= n; i++) {
    const tk = (T * i) / n;
    const x = x0 + (tk / T_MAX) * w;
    const y = perfY(perf(tk), y0, h);
    pts.push(`${x.toFixed(2)},${y.toFixed(2)}`);
  }
  const line = `M${pts.join("L")}`;
  if (!closeToTop) return line;
  const xEnd = x0 + (T / T_MAX) * w;
  return `${line}L${xEnd.toFixed(2)},${y0}L${x0},${y0}Z`;
}

/** Axis frame + dumb-zone band + ~100k marker, shared by A / B / D. */
export function ChartChrome({
  x0,
  y0,
  w,
  h,
  showThreshold,
}: {
  x0: number;
  y0: number;
  w: number;
  h: number;
  showThreshold: boolean;
}) {
  const zoneY = perfY(DUMB_ZONE, y0, h);
  const thX = x0 + (THRESHOLD_K / T_MAX) * w;
  return (
    <>
      <rect
        x={x0}
        y={zoneY}
        width={w}
        height={y0 + h - zoneY}
        fill={C.badFill}
      />
      <line
        x1={x0}
        y1={zoneY}
        x2={x0 + w}
        y2={zoneY}
        stroke={C.bad}
        strokeWidth={0.6}
        strokeDasharray="3 3"
        opacity={0.7}
      />
      {/* Left-anchored: the curve head ends at the bottom-RIGHT of this band. */}
      <text
        x={x0 + 4}
        y={zoneY + 11}
        fill={C.bad}
        fontSize={8}
        fontFamily={MONO}
        letterSpacing="0.16em"
      >
        DUMB ZONE
      </text>
      {/* axes */}
      <line x1={x0} y1={y0} x2={x0} y2={y0 + h} stroke={C.rule} strokeWidth={0.7} />
      <line
        x1={x0}
        y1={y0 + h}
        x2={x0 + w}
        y2={y0 + h}
        stroke={C.rule}
        strokeWidth={0.7}
      />
      <text
        x={x0 - 5}
        y={y0 + 4}
        textAnchor="end"
        fill={C.labelDim}
        fontSize={7.5}
        fontFamily={MONO}
      >
        100%
      </text>
      {/* Axis clipped at PERF_FLOOR — labelled, so the steepness isn't a lie. */}
      <text
        x={x0 - 5}
        y={y0 + h + 3}
        textAnchor="end"
        fill={C.labelDim}
        fontSize={7.5}
        fontFamily={MONO}
      >
        {`${Math.round(PERF_FLOOR * 100)}%`}
      </text>
      <text
        x={x0}
        y={y0 - 8}
        fill={C.label}
        fontSize={8}
        fontFamily={MONO}
        letterSpacing="0.18em"
      >
        RESPONSE QUALITY
      </text>
      <text
        x={x0 + w}
        y={y0 + h + 13}
        textAnchor="end"
        fill={C.labelDim}
        fontSize={7.5}
        fontFamily={MONO}
        letterSpacing="0.14em"
      >
        CUMULATIVE TOKENS →
      </text>
      {showThreshold && (
        <>
          <line
            x1={thX}
            y1={y0}
            x2={thX}
            y2={y0 + h}
            stroke={C.bad}
            strokeWidth={0.6}
            strokeDasharray="2 3"
            opacity={0.85}
          />
          <text
            x={thX - 4}
            y={y0 + 10}
            textAnchor="end"
            fill={C.bad}
            fontSize={7.5}
            fontFamily={MONO}
            letterSpacing="0.1em"
          >
            ~100k
          </text>
        </>
      )}
    </>
  );
}

export function DegradedBadge({ on, x, y }: { on: boolean; x: number; y: number }) {
  return (
    <g opacity={on ? 1 : 0} style={{ transition: "opacity 0.4s var(--ease)" }}>
      <rect
        x={x}
        y={y}
        width={62}
        height={15}
        fill="rgba(168,90,60,0.4)"
        stroke={C.bad}
        strokeWidth={0.5}
      />
      <text
        x={x + 31}
        y={y + 10.5}
        textAnchor="middle"
        fill={C.response}
        fontSize={7.5}
        fontFamily={MONO}
        letterSpacing="0.18em"
      >
        DEGRADED
      </text>
    </g>
  );
}

/** Live state readout — "TURN 4 · 52k TOKENS". */
export function Readout({ f, x, y }: { f: Frame; x: number; y: number }) {
  return (
    <text x={x} y={y} fill={C.label} fontSize={9} fontFamily={MONO} letterSpacing="0.16em">
      {f.turn === 0 ? "TURN —" : `TURN ${f.turn}`}
      <tspan fill={C.labelDim}>{"  ·  "}</tspan>
      <tspan fill={C.response}>{`${Math.round(f.T)}k TOKENS`}</tspan>
    </text>
  );
}

// ───────────────────── the shipping figure (variant D) ─────────────────────
// Top/bottom, not left/right. Both panes are plotted on the SAME x-axis of
// cumulative tokens, so a single playhead crosses both and sync is not a claim
// but the layout. Turn blocks get wider to the right (that width IS the
// compounding), and every turn draws a re-send arc back to each earlier turn —
// so the arc count goes 0,1,3,6,10,15 and the quadratic is on screen.

function SharedAxisFigure({ f }: { f: Frame }) {
  const X0 = 42;
  const XW = 552;
  const xOf = (k: number) => X0 + (k / T_MAX) * XW;
  const BLOCK_Y = 108;
  const BLOCK_H = 26;
  const CY0 = 168;
  const CH = 108;

  const visible = Array.from({ length: TURNS }, (_, i) => i).filter((i) => f.turn > i);
  const arcs: React.ReactElement[] = [];
  for (const i of visible) {
    const live = f.turn === i + 1;
    const g = live ? f.u : 1;
    const prevK = i === 0 ? 0 : CUM_K[i - 1];
    const nowK = prevK + (live ? f.u : 1) * NEW_K[i];
    const to = (xOf(prevK) + xOf(nowK)) / 2;
    for (let j = 0; j < i; j++) {
      const from = (xOf(j === 0 ? 0 : CUM_K[j - 1]) + xOf(CUM_K[j])) / 2;
      const lift = 12 + Math.abs(to - from) * 0.24;
      arcs.push(
        <path
          key={`${i}-${j}`}
          d={`M${from},${BLOCK_Y} Q${(from + to) / 2},${BLOCK_Y - lift} ${to},${BLOCK_Y}`}
          fill="none"
          stroke={C.carriedLine}
          strokeWidth={0.6}
          opacity={0.34 * g}
        />,
      );
    }
  }
  // Count the arcs actually on screen, not the completed turns — otherwise the
  // readout lags the drawing by one turn.
  const links = arcs.length;

  return (
    <svg
      data-testid="pit-anim-distraction"
      data-figure="shared-axis"
      viewBox={`0 0 ${SVG_W} ${SVG_H}`}
      style={SVG_STYLE}
    >
      <Readout f={f} x={X0} y={16} />
      <text x={X0} y={30} fill={C.labelDim} fontSize={8} fontFamily={MONO} letterSpacing="0.16em">
        {`RE-SENT PAIRS: ${links}`}
      </text>
      <text
        x={X0 + XW}
        y={16}
        textAnchor="end"
        fill={C.labelDim}
        fontSize={8}
        fontFamily={MONO}
        letterSpacing="0.16em"
      >
        ONE AXIS · BOTH PANES
      </text>

      {arcs}

      {/* turn blocks — width = that turn's new tokens */}
      {visible.map((i) => {
        const live = f.turn === i + 1;
        const prevK = i === 0 ? 0 : CUM_K[i - 1];
        const nowK = prevK + (live ? f.u : 1) * NEW_K[i];
        const x = xOf(prevK);
        const w = Math.max(0.5, xOf(nowK) - x);
        const pW = w * PROMPT_SHARE;
        return (
          <g key={i}>
            <rect x={x} y={BLOCK_Y} width={pW} height={BLOCK_H} fill={C.prompt} opacity={live ? 1 : 0.75} />
            <rect x={x + pW} y={BLOCK_Y} width={w - pW} height={BLOCK_H} fill={C.response} opacity={live ? 1 : 0.7} />
            {/* Turn boundary has to out-read the prompt/response boundary, or
                six turns look like twelve. */}
            <line
              x1={x}
              y1={BLOCK_Y - 4}
              x2={x}
              y2={BLOCK_Y + BLOCK_H + 4}
              stroke="rgb(10,10,10)"
              strokeWidth={2}
            />
            <line
              x1={x}
              y1={BLOCK_Y - 4}
              x2={x}
              y2={BLOCK_Y + BLOCK_H + 4}
              stroke={C.label}
              strokeWidth={0.6}
            />
            {w > 14 && (
              <text
                x={x + w / 2}
                y={BLOCK_Y + BLOCK_H + 11}
                textAnchor="middle"
                fill={live ? C.label : C.labelDim}
                fontSize={7.5}
                fontFamily={MONO}
              >
                {i + 1}
              </text>
            )}
          </g>
        );
      })}
      <text x={X0} y={BLOCK_Y - 8} fill={C.label} fontSize={8} fontFamily={MONO} letterSpacing="0.18em">
        TURNS
      </text>

      {/* chart on the same x-axis */}
      <ChartChrome x0={X0} y0={CY0} w={XW} h={CH} showThreshold={f.T >= THRESHOLD_K * 0.55} />
      <path d={curvePath(f.T, X0, CY0, XW, CH)} fill="none" stroke={C.curve} strokeWidth={1.4} strokeLinecap="round" />

      {/* the single playhead through both panes */}
      {f.T > 0 && (
        <>
          <line
            x1={xOf(f.T)}
            y1={BLOCK_Y - 20}
            x2={xOf(f.T)}
            y2={CY0 + CH}
            stroke={C.response}
            strokeWidth={0.8}
            opacity={0.55}
          />
          <circle
            cx={xOf(f.T)}
            cy={perfY(perf(f.T), CY0, CH)}
            r={3.2}
            fill={C.response}
            stroke={C.bad}
            strokeWidth={0.6}
          />
        </>
      )}
      <DegradedBadge on={f.degraded} x={X0 + XW - 62} y={40} />
    </svg>
  );
}
// ───────────────────── clock ─────────────────────

/**
 * Seconds since mount, pausable, resettable, and overridable by the scrub
 * slider. Under `prefers-reduced-motion` it goes straight to the end pose.
 */
function useClock(epoch: number, paused: boolean, scrub: number | null) {
  const [t, setT] = useState(0);
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => setT(scrub != null ? scrub * TOTAL_DUR : 0), [epoch, scrub]);

  const doneRef = useRef(false);
  useEffect(() => {
    if (scrub != null) return;
    if (reduced) {
      setT(TOTAL_DUR);
      return;
    }
    if (paused) return;
    doneRef.current = false;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      setT((v) => {
        const next = v + dt;
        if (next >= TOTAL_DUR) doneRef.current = true;
        return Math.min(TOTAL_DUR, next);
      });
      if (!doneRef.current) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [epoch, paused, scrub, reduced]);

  return t;
}

// ───────────────────── dev-only variant switching ─────────────────────
// The original anim, the three losing variants and the switcher UI live in
// E9DistractionAlternates.tsx and are reached only through this dynamic import.
// In a production build `import.meta.env.DEV` is `false`, so the whole block is
// dead code: Rollup drops the import and never emits the chunk — verified by
// grepping dist/ for the alternates' marker strings.

/** Key of the variant this deck ships. Kept in sync with ProductionFigure. */
export const PRODUCTION_KEY = "D";

const ProductionFigure = SharedAxisFigure;

/** Every figure takes the same frame, so any of them can be swapped in. */
export type DistractionFigure = ComponentType<{ f: Frame }>;

export interface SwitcherProps {
  current: string;
  onPick: (next: string) => void;
  t: number;
  f: Frame;
  paused: boolean;
  onPause: () => void;
  scrub: number | null;
  onScrub: (v: number | null) => void;
  onReplay: () => void;
}

interface AlternatesModule {
  ALTERNATE_FIGURES: Record<string, DistractionFigure>;
  DistractionSwitcher: ComponentType<SwitcherProps>;
}

function useAlternates() {
  const [mod, setMod] = useState<AlternatesModule | null>(null);
  useEffect(() => {
    if (!import.meta.env.DEV) return;
    let live = true;
    void import("./E9DistractionAlternates").then((m) => {
      if (live) setMod(m as unknown as AlternatesModule);
    });
    return () => {
      live = false;
    };
  }, []);
  return mod;
}

function readProtoParam(): string {
  // Dev only: in a production build the alternates do not exist, so honoring
  // `?proto=A` there would leave the slide with no figure at all.
  if (!import.meta.env.DEV || typeof window === "undefined") {
    return PRODUCTION_KEY;
  }
  return (
    new URLSearchParams(window.location.search).get("proto") ?? PRODUCTION_KEY
  );
}

// ───────────────────── component ─────────────────────

export function DistractionMotion() {
  const [key, setKey] = useState(readProtoParam);
  const [epoch, setEpoch] = useState(0);
  const [paused, setPaused] = useState(false);
  const [scrub, setScrub] = useState<number | null>(null);

  const t = useClock(epoch, paused, scrub);
  const f = frameAt(t);

  const alternates = useAlternates();
  const Switcher = alternates?.DistractionSwitcher;

  // Falls back to the shipped figure while the dynamic import is in flight, and
  // in production, where there is nothing to fall back from.
  const Figure: DistractionFigure =
    (key === PRODUCTION_KEY ? undefined : alternates?.ALTERNATE_FIGURES[key]) ??
    ProductionFigure;

  const pick = (next: string) => {
    setKey(next);
    setEpoch((e) => e + 1);
    setScrub(null);
    setPaused(false);
    const p = new URLSearchParams(window.location.search);
    p.set("proto", next);
    window.history.replaceState(null, "", `?${p.toString()}`);
  };

  const replay = () => {
    setScrub(null);
    setPaused(false);
    setEpoch((n) => n + 1);
  };

  return (
    <>
      {/* Remount on replay so the `current` alternate's SMIL restarts too. */}
      <Figure key={epoch} f={f} />
      {Switcher && (
        <Switcher
          current={key}
          onPick={pick}
          t={t}
          f={f}
          paused={paused}
          onPause={() => setPaused((p) => !p)}
          scrub={scrub}
          onScrub={setScrub}
          onReplay={replay}
        />
      )}
    </>
  );
}
