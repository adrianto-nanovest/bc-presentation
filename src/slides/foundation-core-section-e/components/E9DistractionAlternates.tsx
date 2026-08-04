// DEV ONLY — the E.9 distraction variants that did NOT ship, plus the switcher.
//
// gh issue #11 prototyped four answers to "how should multi-turn token
// compounding and the quality curve be drawn, in sync?". Variant D won and
// lives in E9DistractionMotion.tsx. The other three and the original SMIL anim
// are kept here so the decision can be revisited without re-deriving them.
//
// Nothing in this file reaches production: E9DistractionMotion imports it
// through a dynamic `import()` guarded by `import.meta.env.DEV`, which Rollup
// evaluates as `false` and drops along with this chunk.
//
// Reach them in a dev build with `?proto=current|A|B|C|D`, `[` / `]` to cycle,
// `\` to replay. Nothing renders on screen: the deck is presented from
// `npm run dev`, so the floating pill was removed and pause / scrub went with
// it, having no URL form. To scrub again, restore the bar from git history —
// the props it needs are still on SwitcherProps.
//
// Every figure here is a pure function of the same `Frame` the shipping figure
// takes, so promoting one is a matter of moving it into E9DistractionMotion.tsx
// and repointing PRODUCTION_KEY / ProductionFigure.
//
// Why each one lost:
//   current  The original. A bar filling beside a curve falling, with nothing
//            tying them together and no notion of a turn at all.
//   A        Clearest "carried forward" read of the four — bar N's dim base is
//            exactly bar N−1's height, joined by a tie-line. Lost because a
//            1.55× ladder plotted linearly leaves turns 1–3 as specks in an
//            empty field, and because its chart is a separate panel that only
//            LOOKS synchronised.
//   B        Strongest containment metaphor (each turn drawn around the last),
//            but the per-turn payload chips are too small to quantify anything
//            and the nesting stops reading past ~5 levels.
//   C        Best sync legibility of the losers — a level line leaves the fill
//            surface, runs right and elbows into the chart playhead — and the
//            sharpest argument: at 140k the window is still 30% free and the
//            quality is already gone. Worth revisiting if the shared-axis
//            layout ever has to become left/right, since the drawn linkage is
//            the only mechanism here that survives splitting the panes.
import { useEffect } from "react";
import { DistractionAnim } from "./PitfallAnims";
import {
  C,
  ChartChrome,
  CUM_K,
  curvePath,
  DegradedBadge,
  DUMB_ZONE,
  MONO,
  NEW_K,
  perf,
  PERF_FLOOR,
  perfY,
  PROMPT_SHARE,
  Readout,
  SVG_H,
  SVG_STYLE,
  SVG_W,
  T_MAX,
  THRESHOLD_K,
  TURNS,
  type DistractionFigure,
  type Frame,
  type SwitcherProps,
} from "./E9DistractionMotion";

/** The original anim: self-contained SMIL, ignores the shared frame. */
function CurrentAnim() {
  return <DistractionAnim />;
}

// ───────────────────── A — ledger stack ─────────────────────
// Cumulative bars, one per turn. Bar i's lower portion is EXACTLY the height of
// bar i−1 (it is the same number), drawn dim, with a dashed tie-line joining
// the two — so "everything before is carried in" is a geometric fact you can
// see, not a caption. Chart is a conventional line plot to its right.

function VariantA({ f }: { f: Frame }) {
  const BASE = 250;
  const MAX_H = 190;
  const SLOT = 43;
  const barX = (i: number) => 14 + i * SLOT;
  const BAR_W = 29;
  const hOf = (k: number) => (k / T_MAX) * MAX_H;

  return (
    <svg
      data-testid="pit-anim-distraction"
      data-figure="ledger-stack"
      viewBox={`0 0 ${SVG_W} ${SVG_H}`}
      style={SVG_STYLE}
    >
      <Readout f={f} x={14} y={16} />
      <text x={14} y={32} fill={C.labelDim} fontSize={8} fontFamily={MONO} letterSpacing="0.16em">
        EVERY TURN RE-SENDS EVERY EARLIER TURN
      </text>

      {/* left — the ledger */}
      {Array.from({ length: TURNS }).map((_, i) => {
        if (f.turn <= i) return null;
        const live = f.turn === i + 1;
        const prevK = i === 0 ? 0 : CUM_K[i - 1];
        const newK = (live ? f.u : 1) * NEW_K[i];
        const carriedH = hOf(prevK);
        const promptH = hOf(newK * PROMPT_SHARE);
        const responseH = hOf(newK * (1 - PROMPT_SHARE));
        const x = barX(i);
        const yCarried = BASE - carriedH;
        const yPrompt = yCarried - promptH;
        const yResponse = yPrompt - responseH;
        return (
          <g key={i}>
            {/* the tie-line: previous bar's top → this bar's carried boundary */}
            {i > 0 && (
              <line
                x1={barX(i - 1) + BAR_W}
                y1={yCarried}
                x2={x}
                y2={yCarried}
                stroke={C.carriedLine}
                strokeWidth={0.7}
                strokeDasharray="2 2"
              />
            )}
            {carriedH > 0 && (
              <rect x={x} y={yCarried} width={BAR_W} height={carriedH} fill={C.carried} />
            )}
            <rect x={x} y={yPrompt} width={BAR_W} height={promptH} fill={C.prompt} />
            <rect x={x} y={yResponse} width={BAR_W} height={responseH} fill={C.response} />
            <text
              x={x + BAR_W / 2}
              y={BASE + 13}
              textAnchor="middle"
              fill={live ? C.label : C.labelDim}
              fontSize={8}
              fontFamily={MONO}
            >
              {i + 1}
            </text>
            {live && (
              <text
                x={x + BAR_W / 2}
                y={yResponse - 5}
                textAnchor="middle"
                fill={C.response}
                fontSize={7.5}
                fontFamily={MONO}
              >
                {`${Math.round(f.T)}k`}
              </text>
            )}
          </g>
        );
      })}
      <line x1={10} y1={BASE} x2={274} y2={BASE} stroke={C.rule} strokeWidth={0.7} />
      {/* No "TURN →" axis label: at this width it lands on top of the last
          turn's tick. The numbered ticks and the readout already say it. */}
      {/* legend — below the turn numbers, not beside them */}
      <g>
        {[
          ["carried forward", C.carried],
          ["prompt", C.prompt],
          ["response", C.response],
        ].map(([label, fill], i) => (
          <g key={label} transform={`translate(${14 + i * 92}, 274)`}>
            <rect width={7} height={7} fill={fill} />
            <text x={11} y={6.5} fill={C.labelDim} fontSize={7} fontFamily={MONO}>
              {label}
            </text>
          </g>
        ))}
      </g>

      {/* right — the chart */}
      <ChartChrome x0={320} y0={54} w={286} h={196} showThreshold={f.T >= THRESHOLD_K * 0.55} />
      <path d={curvePath(f.T, 320, 54, 286, 196)} fill="none" stroke={C.curve} strokeWidth={1.4} strokeLinecap="round" />
      {CUM_K.map((k, i) =>
        f.done > i ? (
          <circle
            key={i}
            cx={320 + (k / T_MAX) * 286}
            cy={perfY(perf(k), 54, 196)}
            r={2}
            fill={perf(k) < DUMB_ZONE ? C.bad : C.curve}
          />
        ) : null,
      )}
      {f.T > 0 && (
        <circle
          cx={320 + (f.T / T_MAX) * 286}
          cy={perfY(perf(f.T), 54, 196)}
          r={3.2}
          fill={C.response}
          stroke={C.bad}
          strokeWidth={0.6}
        />
      )}
      <DegradedBadge on={f.degraded} x={544} y={30} />
    </svg>
  );
}

// ───────────────────── B — nested frames ─────────────────────
// Containment instead of stacking: turn i draws a frame AROUND turn i−1's
// frame. "Carried forward" is literal enclosure, and the outermost frame's
// label is the running total. Chart is a filled area, so degradation reads as
// mass lost from the top rather than a line falling.

function VariantB({ f }: { f: Frame }) {
  const CX = 142;
  const CY = 150;
  const STEP = 17;
  const IN_W = 54;
  const IN_H = 30;

  return (
    <svg
      data-testid="pit-anim-distraction"
      data-figure="nested-frames"
      viewBox={`0 0 ${SVG_W} ${SVG_H}`}
      style={SVG_STYLE}
    >
      <Readout f={f} x={14} y={16} />
      <text x={14} y={32} fill={C.labelDim} fontSize={8} fontFamily={MONO} letterSpacing="0.16em">
        EACH TURN WRAPS EVERY TURN BEFORE IT
      </text>

      {/* left — nesting, outermost drawn first so inner rings stay on top */}
      {Array.from({ length: TURNS })
        .map((_, i) => TURNS - 1 - i)
        .map((i) => {
          if (f.turn <= i) return null;
          const live = f.turn === i + 1;
          const g = live ? f.u : 1;
          const w = IN_W + 2 * STEP * i;
          const h = IN_H + 2 * STEP * i;
          const x = CX - w / 2;
          const y = CY - h / 2;
          const chip = 3 + 5 * (NEW_K[i] / NEW_K[TURNS - 1]);
          return (
            <g key={i} opacity={live ? 0.25 + 0.75 * g : 1}>
              <rect
                x={x}
                y={y}
                width={w}
                height={h}
                rx={2}
                fill={i === 0 ? "rgba(232,196,160,0.10)" : "rgba(122,70,38,0.10)"}
                stroke={live ? C.response : C.carriedLine}
                strokeWidth={live ? 1.1 : 0.7}
              />
              {/* the turn's own two payloads, sitting in its band */}
              <rect
                x={x + 4}
                y={y + 4}
                width={chip * 2.2 * g}
                height={chip}
                fill={C.prompt}
              />
              <rect
                x={x + w - 4 - chip * 2.6 * g}
                y={y + h - 4 - chip}
                width={chip * 2.6 * g}
                height={chip}
                fill={C.response}
              />
              {live && (
                <text
                  x={CX}
                  y={y - 6}
                  textAnchor="middle"
                  fill={C.response}
                  fontSize={8}
                  fontFamily={MONO}
                  letterSpacing="0.12em"
                >
                  {`TURN ${i + 1} · ${Math.round(f.T)}k`}
                </text>
              )}
            </g>
          );
        })}
      <text x={14} y={276} fill={C.labelDim} fontSize={7.5} fontFamily={MONO} letterSpacing="0.14em">
        INNERMOST = TURN 1 · OUTERMOST = NOW
      </text>

      {/* right — filled area */}
      <ChartChrome x0={320} y0={54} w={286} h={196} showThreshold={f.T >= THRESHOLD_K * 0.55} />
      {/* The fill is the gap between 100% and the curve — the quality LOST.
          Filling UNDER the curve read as a solid block and buried the band. */}
      <defs>
        <linearGradient id="proto-b-loss" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(168,90,60,0.30)" />
          <stop offset="100%" stopColor="rgba(168,90,60,0.04)" />
        </linearGradient>
      </defs>
      <path d={curvePath(f.T, 320, 54, 286, 196, true)} fill="url(#proto-b-loss)" stroke="none" />
      <path d={curvePath(f.T, 320, 54, 286, 196)} fill="none" stroke={C.curve} strokeWidth={1.4} strokeLinecap="round" />
      {f.T > 0 && (
        <>
          <line
            x1={320 + (f.T / T_MAX) * 286}
            y1={54}
            x2={320 + (f.T / T_MAX) * 286}
            y2={perfY(perf(f.T), 54, 196)}
            stroke={C.bad}
            strokeWidth={0.7}
            opacity={0.65}
          />
          <text
            x={320 + (f.T / T_MAX) * 286 - 4}
            y={54 + 9}
            textAnchor="end"
            fill={C.bad}
            fontSize={7.5}
            fontFamily={MONO}
          >
            {`−${Math.round((1 - perf(f.T)) * 100)}%`}
          </text>
          <circle
            cx={320 + (f.T / T_MAX) * 286}
            cy={perfY(perf(f.T), 54, 196)}
            r={3.2}
            fill={C.response}
            stroke={C.bad}
            strokeWidth={0.6}
          />
        </>
      )}
      <DegradedBadge on={f.degraded} x={544} y={30} />
    </svg>
  );
}

// ───────────────────── C — bounded window + drawn linkage ─────────────────────
// The only variant where the growth is BOUNDED: a context window with a ceiling
// it visibly runs out of. Turn blocks stack up from the floor and age (older =
// dimmer) without ever leaving. The sync is made mechanical: a bright level
// line leaves the fill surface, runs right, and elbows down into the chart's
// playhead. Same number, two panes, one visible linkage.

function VariantC({ f }: { f: Frame }) {
  const WX = 44;
  const WW = 116;
  const FLOOR = 254;
  const CEIL = 46;
  const WH = FLOOR - CEIL;
  /**
   * The frame is a real window capacity, NOT the session total. Scaling it to
   * the session total filled it to the brim — which both collided the level
   * line with the chart title and told the wrong story. Degradation starts at
   * ~100k with headroom to spare: the session is only 70% full and already in
   * the dumb zone. That is the point.
   */
  const WINDOW_CAP = 200;
  const yOf = (k: number) => FLOOR - (k / WINDOW_CAP) * WH;

  const CX0 = 320;
  const CY0 = 60;
  const CW = 286;
  const CH = 190;
  const headX = CX0 + (f.T / T_MAX) * CW;
  const headY = perfY(perf(f.T), CY0, CH);
  const levelY = yOf(f.T);
  const overflow = f.T >= THRESHOLD_K;

  return (
    <svg
      data-testid="pit-anim-distraction"
      data-figure="bounded-window"
      viewBox={`0 0 ${SVG_W} ${SVG_H}`}
      style={SVG_STYLE}
    >
      <Readout f={f} x={14} y={16} />
      <text x={14} y={32} fill={C.labelDim} fontSize={8} fontFamily={MONO} letterSpacing="0.16em">
        ONE WINDOW · NOTHING EVER LEAVES IT
      </text>

      {/* the window */}
      <rect x={WX} y={CEIL} width={WW} height={WH} fill="rgba(122,70,38,0.07)" stroke={C.ruleFaint} strokeWidth={0.7} />
      {Array.from({ length: TURNS }).map((_, i) => {
        if (f.turn <= i) return null;
        const live = f.turn === i + 1;
        const prevK = i === 0 ? 0 : CUM_K[i - 1];
        const newK = (live ? f.u : 1) * NEW_K[i];
        const age = f.turn - 1 - i; // 0 = newest
        const dim = live ? 1 : Math.max(0.3, 1 - age * 0.16);
        const pK = newK * PROMPT_SHARE;
        return (
          <g key={i}>
            <rect
              x={WX + 1}
              y={yOf(prevK + pK)}
              width={WW - 2}
              height={yOf(prevK) - yOf(prevK + pK)}
              fill={C.prompt}
              opacity={dim}
            />
            <rect
              x={WX + 1}
              y={yOf(prevK + newK)}
              width={WW - 2}
              height={yOf(prevK + pK) - yOf(prevK + newK)}
              fill={C.response}
              opacity={dim * 0.92}
            />
            <line
              x1={WX + 1}
              y1={yOf(prevK)}
              x2={WX + WW - 1}
              y2={yOf(prevK)}
              stroke="rgba(10,10,10,0.7)"
              strokeWidth={0.7}
            />
          </g>
        );
      })}
      {/* the ~100k ceiling — drawn over the fill, and the breach tinted, so the
          wall is an event rather than a line that quietly disappears */}
      {overflow && (
        <rect
          x={WX + 1}
          y={levelY}
          width={WW - 2}
          height={yOf(THRESHOLD_K) - levelY}
          fill="rgba(168,90,60,0.62)"
        />
      )}
      <line
        x1={WX - 6}
        y1={yOf(THRESHOLD_K)}
        x2={WX + WW + 6}
        y2={yOf(THRESHOLD_K)}
        stroke={C.bad}
        strokeWidth={overflow ? 1.4 : 0.8}
        strokeDasharray={overflow ? undefined : "3 2"}
      />
      <text
        x={WX - 9}
        y={yOf(THRESHOLD_K) + 3}
        textAnchor="end"
        fill={C.bad}
        fontSize={7.5}
        fontFamily={MONO}
      >
        ~100k
      </text>
      {/* Label sits under the floor — above the frame it collided with the
          variant's own subtitle. */}
      <text
        x={WX + WW / 2}
        y={FLOOR + 14}
        textAnchor="middle"
        fill={overflow ? C.bad : C.labelDim}
        fontSize={8}
        fontFamily={MONO}
        letterSpacing="0.16em"
      >
        {`${WINDOW_CAP}k CONTEXT WINDOW`}
      </text>
      <text
        x={WX + WW / 2}
        y={FLOOR + 26}
        textAnchor="middle"
        fill={C.labelDim}
        fontSize={7}
        fontFamily={MONO}
        opacity={0.8}
      >
        turn 1 at the floor · nothing pops
      </text>
      {/* Headroom left when quality has already gone — C's whole argument. */}
      {overflow && (
        // Inside the empty headroom, not above the frame — above it, this lands
        // on the variant's own subtitle.
        <text
          x={WX + WW / 2}
          y={CEIL + 24}
          textAnchor="middle"
          fill={C.bad}
          fontSize={7.5}
          fontFamily={MONO}
          letterSpacing="0.1em"
        >
          <tspan x={WX + WW / 2} dy="0">{`${Math.round(100 - (f.T / WINDOW_CAP) * 100)}% STILL FREE`}</tspan>
          <tspan x={WX + WW / 2} dy="10">AND ALREADY DUMB</tspan>
        </text>
      )}

      {/* the linkage — this is the sync, drawn */}
      {f.T > 0 && (
        <g>
          <line x1={WX} y1={levelY} x2={WX + WW} y2={levelY} stroke={C.response} strokeWidth={1.1} />
          <line
            x1={WX + WW}
            y1={levelY}
            x2={headX}
            y2={levelY}
            stroke={C.label}
            strokeWidth={0.7}
            strokeDasharray="3 3"
          />
          <line x1={headX} y1={levelY} x2={headX} y2={headY} stroke={C.label} strokeWidth={0.7} strokeDasharray="3 3" />
          <circle cx={headX} cy={levelY} r={1.6} fill={C.label} />
        </g>
      )}

      {/* right — chart (no x-axis token label; the linkage supplies the reading) */}
      <rect x={CX0} y={perfY(DUMB_ZONE, CY0, CH)} width={CW} height={CY0 + CH - perfY(DUMB_ZONE, CY0, CH)} fill={C.badFill} />
      <line
        x1={CX0}
        y1={perfY(DUMB_ZONE, CY0, CH)}
        x2={CX0 + CW}
        y2={perfY(DUMB_ZONE, CY0, CH)}
        stroke={C.bad}
        strokeWidth={0.6}
        strokeDasharray="3 3"
        opacity={0.7}
      />
      <text
        x={CX0 + 4}
        y={perfY(DUMB_ZONE, CY0, CH) + 11}
        fill={C.bad}
        fontSize={8}
        fontFamily={MONO}
        letterSpacing="0.16em"
      >
        DUMB ZONE
      </text>
      <line x1={CX0} y1={CY0} x2={CX0} y2={CY0 + CH} stroke={C.rule} strokeWidth={0.7} />
      <line x1={CX0} y1={CY0 + CH} x2={CX0 + CW} y2={CY0 + CH} stroke={C.rule} strokeWidth={0.7} />
      <text x={CX0} y={CY0 - 8} fill={C.label} fontSize={8} fontFamily={MONO} letterSpacing="0.18em">
        RESPONSE QUALITY
      </text>
      <text x={CX0 - 5} y={CY0 + 4} textAnchor="end" fill={C.labelDim} fontSize={7.5} fontFamily={MONO}>
        100%
      </text>
      <text x={CX0 - 5} y={CY0 + CH + 3} textAnchor="end" fill={C.labelDim} fontSize={7.5} fontFamily={MONO}>
        {`${Math.round(PERF_FLOOR * 100)}%`}
      </text>
      <path d={curvePath(f.T, CX0, CY0, CW, CH)} fill="none" stroke={C.curve} strokeWidth={1.4} strokeLinecap="round" />
      {f.T > 0 && (
        <circle cx={headX} cy={headY} r={3.2} fill={C.response} stroke={C.bad} strokeWidth={0.6} />
      )}
      <DegradedBadge on={f.degraded} x={544} y={34} />
    </svg>
  );
}

export const ALTERNATE_FIGURES: Record<string, DistractionFigure> = {
  current: CurrentAnim,
  A: VariantA,
  B: VariantB,
  C: VariantC,
};

const KEYS = ["current", "A", "B", "C", "D"] as const;

export function DistractionSwitcher({
  current,
  onPick,
  onReplay,
}: SwitcherProps) {
  const i = Math.max(0, KEYS.indexOf(current as (typeof KEYS)[number]));
  const step = (delta: number) =>
    onPick(KEYS[(i + delta + KEYS.length) % KEYS.length]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tgt = e.target as HTMLElement | null;
      if (
        tgt?.isContentEditable ||
        tgt?.tagName === "INPUT" ||
        tgt?.tagName === "TEXTAREA"
      ) {
        return;
      }
      // `[` / `]` / `\` are unbound in useKeyboardNav, so none of this steals a
      // presenter key.
      if (e.key === "[") {
        e.preventDefault();
        step(-1);
      } else if (e.key === "]") {
        e.preventDefault();
        step(1);
      } else if (e.key === "\\") {
        e.preventDefault();
        onReplay();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  });

  // Keyboard only. The old floating pill is gone: the deck is demoed straight
  // out of `npm run dev`, so nothing dev-only may render on stage. Variant
  // choice therefore travels by `?proto=` and by `[` / `]`; the pause and scrub
  // controls went with the bar, since neither has a URL form.
  return null;
}
