// PROTOTYPE gh#19 — throwaway. The figure: one curve, three states.
//
// step 0  the curve is an Archimedean spiral, drawn lap by lap, each lap
//         slower and HEAVIER than the last. Every human turn fires on ONE
//         radial spoke, so your turns are collinear — one per lap — and a
//         hairline spoke makes that collinearity a drawn fact.
// step 1  every point's radius is interpolated toward one constant. The spiral
//         becomes an exact circle, and the stacked human turns merge into TWO
//         — the entry and the gate. Then the figure docks right. Hovering a
//         row MOUNTS that row's apparatus, one group at a time, on an
//         otherwise clean canvas.
// step 2  the whole apparatus is mounted at once, labelled with the Friday
//         4 PM run. Hover now promotes a group instead of revealing it.
//
// The insertion mechanic, used on BOTH ends of the axis:
//
//   step 1   YOU set ─────────▶ START ○ ring ○ CHECK ─────────▶ YOU signs
//   step 2   YOU set ▶ [16:00] ▶ START ○ ring ○ CHECK ▶ ◇ ▶ STOP ▶ YOU signs
//
// The clock and the condition do not appear BESIDE the humans; they push into
// the arrows and take the middle. That is what draws "nobody presses start"
// and "work stops and waits for a person" without captioning either.
//
// Rules this file obeys, from the gh#19 grilling session:
//   - Nothing unrevealed is drawn. No ghosts, ever. An element is absent from
//     the SVG, or it is at full strength. Opacity is only an entry cross-fade.
//   - Rank is stroke weight and colour tier. Never opacity.
//   - The ring is drawn once and only ever re-lit. It never re-draws.
//   - Labels carry a surface-coloured backing plate, so a label can sit over
//     a stroke without either one becoming unreadable. Moving labels out of
//     the way is impossible on a spiral — every direction crosses a lap.
//   - CSS vars only, no hex literals.
import type { CSSProperties } from "react";
import {
  C0,
  CHECK_NODE,
  CLOCK,
  CLOCK_R,
  DIAMOND_C,
  DIAMOND_R,
  ENTRY_HUMAN,
  GATE_HUMAN,
  GAUGE_CAP,
  GAUGE_FROM,
  GAUGE_IDLE,
  GAUGE_OVERRUN,
  PHASE_ANGLE,
  R_FIN,
  R_GAUGE,
  R_INNER,
  R_PHASE_LABEL,
  RING_ARCS,
  SHIP_NODE,
  START_NODE,
  STATE_FILE,
  STOP_BOX,
  aiTheta,
  arcPath,
  curvePath,
  curvePoint,
  lapSegments,
  polar,
  spiral,
  youTheta,
  type Pt,
} from "./geometry";
import { brief as B, type DecisionId } from "./brief";

const L = B.apparatusLabels;
const FADE = "opacity 380ms var(--ease)";
const SURFACE = "var(--surface-dark)";

const mono = (size: number, track = 0): CSSProperties => ({
  fontFamily: "var(--mono)",
  fontSize: size,
  letterSpacing: track ? `${track}px` : undefined,
});

/** Mono text with a backing plate. Width is estimated from the glyph advance
 *  (JetBrains Mono is 0.6 em) plus the tracking, which is exact enough for a
 *  plate and costs no measurement pass. */
function Tag({
  x,
  y,
  text,
  size = 10.5,
  track = 1.6,
  fill,
  anchor = "start",
}: {
  x: number;
  y: number;
  text: string;
  size?: number;
  track?: number;
  fill: string;
  anchor?: "start" | "middle" | "end";
}) {
  const w = text.length * (size * 0.6 + track) + 9;
  const h = size + 8;
  const left = anchor === "start" ? x - 4 : anchor === "end" ? x - w + 4 : x - w / 2;
  return (
    <g>
      <rect x={left} y={y - size + 1} width={w} height={h} fill={SURFACE} />
      <text x={x} y={y} textAnchor={anchor} style={mono(size, track)} fill={fill}>
        {text}
      </text>
    </g>
  );
}

export interface LoopFigureProps {
  laps: number;
  drawn: number;
  q: number;
  d: number;
  ringOn: boolean;
  /** Step 2: every group is mounted at once. Below it, groups mount on hover. */
  apparatusOn: boolean;
  active: DecisionId | null;
  reduced: boolean;
}

export function LoopFigure({
  laps,
  drawn,
  q,
  d,
  ringOn,
  apparatusOn,
  active,
  reduced,
}: LoopFigureProps) {
  const s = spiral(laps);
  const heroOn = !ringOn;
  const theta = s.thetaEnd * drawn;
  const spokesOn = heroOn && q < 0.3;

  const lit = (id: DecisionId) => active === id;
  /** Mounted: everything at step 2, one group at a time before that. */
  const show = (id: DecisionId) => ringOn && (apparatusOn || active === id);
  const strokeOf = (on: boolean) => (on ? "var(--copper-200)" : "var(--copper-700)");
  const textOf = (on: boolean) => (on ? "var(--copper-100)" : "var(--copper-500)");
  const wOf = (on: boolean, base = 1.4) => (on ? base + 1 : base);
  const arrow = (on: boolean) => (on ? "url(#p19-arrow)" : "url(#p19-arrow-dim)");

  const youFirst = curvePoint(s, youTheta(0), q, d);
  const youLast = curvePoint(s, youTheta(laps - 1), q, d);
  const aiFirst = curvePoint(s, aiTheta(0), q, d);
  const aiLast = curvePoint(s, aiTheta(laps - 1), q, d);

  const showTrigger = show("trigger");
  const showCond = show("condition");

  return (
    <svg
      width={1280}
      height={720}
      viewBox="0 0 1280 720"
      data-testid="p19-figure"
      data-phase={
        ringOn ? (apparatusOn ? "full" : "ring") : d > 0 ? "dock" : q > 0 ? "merge" : "hero"
      }
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      aria-hidden
    >
      <defs>
        <marker id="p19-arrow" viewBox="0 0 8 8" refX={7} refY={4} markerWidth={5} markerHeight={5} orient="auto">
          <path d="M 0 0 L 8 4 L 0 8 z" fill="var(--copper-300)" />
        </marker>
        <marker id="p19-arrow-dim" viewBox="0 0 8 8" refX={7} refY={4} markerWidth={4.5} markerHeight={4.5} orient="auto">
          <path d="M 0 0 L 8 4 L 0 8 z" fill="var(--copper-600)" />
        </marker>
      </defs>

      {/* ── the curve ───────────────────────────────────────────────────────
          Drawn lap by lap, each lap heavier than the last. It cross-fades out
          as the notched arcs take over: at that instant the two geometries are
          identical, so the ring never appears to re-draw. */}
      {(!ringOn || d < 1) && (
        <g style={{ opacity: ringOn ? 0 : 1, transition: FADE }}>
          {lapSegments(s).map((seg, i) => {
            const upTo = q > 0 ? seg.th1 : Math.min(seg.th1, theta);
            if (upTo <= seg.th0) return null;
            return (
              <path
                key={`lap-${i}`}
                d={curvePath(s, seg.th0, upTo, q, d)}
                fill="none"
                stroke={seg.tier}
                strokeWidth={seg.w}
                strokeLinecap="round"
              />
            );
          })}

          {/* The drawing head — the brightest thing on stage while the spiral
              grows, and what makes each lap a beat. */}
          {heroOn && q === 0 && drawn > 0.01 && drawn < 0.999 && (
            <circle
              cx={curvePoint(s, theta, 0, 0)[0]}
              cy={curvePoint(s, theta, 0, 0)[1]}
              r={5}
              fill="var(--neutral-0)"
            />
          )}
        </g>
      )}

      {/* ── the two spokes ──────────────────────────────────────────────────
          Your turns are collinear by construction. The hairline says so out
          loud, and it is the thing the merge collapses. */}
      {spokesOn && laps > 1 && (
        <g style={{ opacity: 1 }}>
          <path d={`M ${aiFirst[0]} ${aiFirst[1]} L ${aiLast[0]} ${aiLast[1]}`} stroke="var(--copper-800)" strokeWidth={1} />
          <path d={`M ${youFirst[0]} ${youFirst[1]} L ${youLast[0]} ${youLast[1]}`} stroke="var(--copper-700)" strokeWidth={1.2} strokeDasharray="2 4" />
        </g>
      )}

      {/* ── hero: the time origin ───────────────────────────────────────────
          The stamp sits in the spiral's hollow, where nothing else can be, and
          a hairline ties it to the point where the first lap actually begins. */}
      {heroOn && q === 0 && drawn > 0.02 && (
        <g style={{ opacity: 1 }}>
          <path d={`M ${C0[0] + 34} ${C0[1]} L ${C0[0] + R_INNER - 6} ${C0[1]}`} stroke="var(--copper-800)" strokeWidth={1} />
          <circle cx={C0[0] + R_INNER} cy={C0[1]} r={3.4} fill="var(--copper-300)" />
          <Tag x={C0[0] - 4} y={C0[1] + 4} text={B.hero.startStamp} fill="var(--copper-200)" anchor="middle" />
        </g>
      )}

      {/* ── the machine's turns ─────────────────────────────────────────────
          Rings, not dots, and filled with the surface so the curve passes
          BEHIND them — filled hollow they read as struck-through. As the merge
          completes they land on the circle and shrink out: they are the ring. */}
      {!ringOn &&
        Array.from({ length: laps }, (_, i) => {
          const th = aiTheta(i);
          if (q === 0 && th > theta) return null;
          const [x, y] = curvePoint(s, th, q, d);
          const r = 5.4 * (1 - Math.max(0, (q - 0.55) / 0.45));
          if (r <= 0.2) return null;
          return <circle key={`ai-${i}`} cx={x} cy={y} r={r} fill={SURFACE} stroke="var(--copper-400)" strokeWidth={1.6} />;
        })}

      {heroOn && q === 0 && laps > 0 && aiTheta(laps - 1) <= theta && (
        <Tag x={aiLast[0] + 16} y={aiLast[1] + 4} text={B.hero.aiSpoke} fill="var(--copper-500)" />
      )}

      {/* ── your turns ──────────────────────────────────────────────────────
          One per lap. During the dock the FIRST and the LAST travel to the two
          ends of the axis; the ones between dissolve. Three become two, which
          is the closer, performed rather than captioned. */}
      {!ringOn &&
        Array.from({ length: laps }, (_, i) => {
          const th = youTheta(i);
          if (q === 0 && th > theta) return null;
          const isFirst = i === 0;
          const isLast = i === laps - 1;
          const survives = isFirst || isLast;
          const onCurve = curvePoint(s, th, q, 0);
          const target: Pt = isFirst ? ENTRY_HUMAN : GATE_HUMAN;
          const p: Pt = survives
            ? [onCurve[0] + (target[0] - onCurve[0]) * d, onCurve[1] + (target[1] - onCurve[1]) * d]
            : curvePoint(s, th, q, d);
          const gone = !survives && q > 0.5;
          if (gone && q >= 1) return null;
          return (
            <g key={`you-${i}`} style={{ opacity: gone ? 0 : 1, transition: FADE }}>
              <circle cx={p[0]} cy={p[1]} r={6.4} fill="var(--copper-100)" />
              {q === 0 && (
                <Tag x={p[0] - 15} y={p[1] + 4} text={B.hero.youSpoke[i] ?? `TASK ${i + 1}`} fill="var(--copper-100)" anchor="end" />
              )}
            </g>
          );
        })}

      {/* ── the ring ───────────────────────────────────────────────────────
          Four notched arcs, never a hoop. gh#18's finding: a continuous band
          reads as one thick hoop and buries the count. */}
      {ringOn && (
        <g style={{ opacity: 1 }}>
          {RING_ARCS.map(([a0, a1], i) => {
            // Arc 2 is CHECK → SHIP: the way round when the answer is NO.
            const onArc = i === 2 && lit("condition");
            return (
              <path
                key={`arc-${i}`}
                d={arcPath(R_FIN, a0, a1)}
                fill="none"
                stroke={onArc ? "var(--copper-200)" : "var(--copper-600)"}
                strokeWidth={onArc ? 9 : 5}
                strokeLinecap="butt"
                style={{ transition: "stroke 240ms var(--ease), stroke-width 240ms var(--ease)" }}
              />
            );
          })}

          {/* Node → row: START is the trigger's target, RUN is where spend
              accrues, CHECK is the condition, SHIP is what writes state. */}
          {PHASE_ANGLE.map((a, i) => {
            const owner: DecisionId = (["trigger", "budget", "condition", "memory"] as const)[i];
            const on = lit(owner);
            const [x, y] = polar(R_FIN, a);
            return (
              <circle
                key={`node-${i}`}
                cx={x}
                cy={y}
                r={on ? 7 : 5}
                fill={on ? "var(--copper-100)" : "var(--copper-400)"}
                style={{ transition: "all 240ms var(--ease)" }}
              />
            );
          })}

          {/* Phase labels sit INSIDE the ring, so the entire outer band stays
              free for the apparatus. Written at final size, after the dock —
              never scaled, which was gh#17 variant B's recorded failure. */}
          {B.phases.map((name, i) => {
            const [x, y] = polar(R_PHASE_LABEL, PHASE_ANGLE[i]);
            return (
              <text key={name} x={x} y={y + 4} textAnchor="middle" style={mono(11, 2.2)} fill="var(--copper-300)">
                {name}
              </text>
            );
          })}

          {/* The runner. The figure is RUNNING, not drawn: a comet built from
              three weight tiers rather than an opacity gradient, so it holds
              on a washed-out projector. */}
          {!reduced && (
            <g>
              <animateTransform
                attributeName="transform"
                type="rotate"
                from={`0 ${polar(0, 0)[0]} ${polar(0, 0)[1]}`}
                to={`360 ${polar(0, 0)[0]} ${polar(0, 0)[1]}`}
                dur="7s"
                repeatCount="indefinite"
              />
              <path d={arcPath(R_FIN, 138, 157)} fill="none" stroke="var(--copper-700)" strokeWidth={2} />
              <path d={arcPath(R_FIN, 157, 171)} fill="none" stroke="var(--copper-400)" strokeWidth={3.4} />
              <path d={arcPath(R_FIN, 171, 180)} fill="none" stroke="var(--copper-100)" strokeWidth={4.6} />
              <circle cx={polar(R_FIN, 180)[0]} cy={polar(R_FIN, 180)[1]} r={4} fill="var(--neutral-0)" />
            </g>
          )}
        </g>
      )}

      {/* ── WEST end · YOU sets it ──────────────────────────────────────────
          The arrow spans the whole gap at step 1. When TRIGGER mounts, the
          clock takes the middle of it. */}
      {ringOn && (
        <g data-testid="p19-west">
          <path
            d={`M ${ENTRY_HUMAN[0] + 16} 400 L ${showTrigger ? CLOCK[0] - CLOCK_R - 4 : START_NODE[0] - 8} 400`}
            stroke={strokeOf(lit("trigger"))}
            strokeWidth={wOf(lit("trigger"))}
            markerEnd={arrow(lit("trigger"))}
            fill="none"
            style={{ transition: "stroke 240ms var(--ease)" }}
          />
          {showTrigger && (
            <g data-testid="p19-clock" style={{ opacity: 1 }}>
              <circle cx={CLOCK[0]} cy={CLOCK[1]} r={CLOCK_R} fill={SURFACE} stroke={strokeOf(lit("trigger"))} strokeWidth={wOf(lit("trigger"), 1.6)} style={{ transition: "stroke 240ms var(--ease)" }} />
              <path d={`M ${CLOCK[0]} ${CLOCK[1] - 9} L ${CLOCK[0]} ${CLOCK[1]} L ${CLOCK[0] + 7} ${CLOCK[1] + 3}`} fill="none" stroke={strokeOf(lit("trigger"))} strokeWidth={wOf(lit("trigger"), 1.4)} strokeLinecap="round" />
              <path d={`M ${CLOCK[0] + CLOCK_R + 4} 400 L ${START_NODE[0] - 8} 400`} stroke={strokeOf(lit("trigger"))} strokeWidth={wOf(lit("trigger"))} markerEnd={arrow(lit("trigger"))} fill="none" style={{ transition: "stroke 240ms var(--ease)" }} />
              <Tag x={CLOCK[0]} y={CLOCK[1] + 34} text={L.clock} fill={textOf(lit("trigger"))} anchor="middle" />
            </g>
          )}
          <Human p={ENTRY_HUMAN} on={lit("trigger")} />
          <text x={ENTRY_HUMAN[0]} y={ENTRY_HUMAN[1] - 26} textAnchor="middle" style={mono(11, 2.4)} fill={textOf(lit("trigger"))}>
            {L.you}
          </text>
          <text x={ENTRY_HUMAN[0]} y={ENTRY_HUMAN[1] + 32} textAnchor="middle" style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 11.5 }} fill="var(--neutral-400)">
            {L.youSet}
          </text>
        </g>
      )}

      {/* ── EAST end · the condition, then YOU signs ────────────────────────
          Same mechanic: one arrow at step 1, and the diamond plus STOP push
          into it when CONDITION mounts. The gate is AFTER the stop, because a
          gate that fires every lap is not a loop. */}
      {ringOn && (
        <g data-testid="p19-east">
          <path
            d={`M ${CHECK_NODE[0] + 8} 400 L ${showCond ? DIAMOND_C[0] - DIAMOND_R.w - 4 : GATE_HUMAN[0] - 20} 400`}
            stroke={strokeOf(showCond ? lit("condition") : lit("gate"))}
            strokeWidth={wOf(showCond ? lit("condition") : lit("gate"))}
            markerEnd={arrow(showCond ? lit("condition") : lit("gate"))}
            fill="none"
            style={{ transition: "stroke 240ms var(--ease)" }}
          />
          {showCond && (
            <g data-testid="p19-condition" style={{ opacity: 1 }}>
              <path
                d={`M ${DIAMOND_C[0]} ${DIAMOND_C[1] - DIAMOND_R.h} L ${DIAMOND_C[0] + DIAMOND_R.w} ${DIAMOND_C[1]} L ${DIAMOND_C[0]} ${DIAMOND_C[1] + DIAMOND_R.h} L ${DIAMOND_C[0] - DIAMOND_R.w} ${DIAMOND_C[1]} Z`}
                fill={SURFACE}
                stroke={strokeOf(lit("condition"))}
                strokeWidth={wOf(lit("condition"), 1.6)}
                style={{ transition: "stroke 240ms var(--ease)" }}
              />
              <Tag x={DIAMOND_C[0]} y={DIAMOND_C[1] - 32} text={L.check} size={10} track={1.6} fill={textOf(lit("condition"))} anchor="middle" />
              <Tag x={DIAMOND_C[0]} y={DIAMOND_C[1] + 46} text={L.stopCondition} size={9} track={0.8} fill={textOf(lit("condition"))} anchor="middle" />
              <path d={`M ${DIAMOND_C[0] + DIAMOND_R.w + 4} 400 L ${STOP_BOX.x - 8} 400`} fill="none" stroke={strokeOf(lit("condition"))} strokeWidth={wOf(lit("condition"))} markerEnd={arrow(lit("condition"))} style={{ transition: "stroke 240ms var(--ease)" }} />
              <Tag x={(DIAMOND_C[0] + DIAMOND_R.w + STOP_BOX.x) / 2} y={384} text={L.yes} size={9.5} track={1.4} fill={textOf(lit("condition"))} anchor="middle" />
              <rect x={STOP_BOX.x} y={STOP_BOX.y} width={STOP_BOX.w} height={STOP_BOX.h} fill={SURFACE} stroke={strokeOf(lit("condition"))} strokeWidth={wOf(lit("condition"), 1.2)} style={{ transition: "stroke 240ms var(--ease)" }} />
              <text x={STOP_BOX.x + STOP_BOX.w / 2} y={STOP_BOX.y + 20} textAnchor="middle" style={mono(10.5, 2)} fill={textOf(lit("condition"))}>
                {L.stop}
              </text>
              <Tag x={polar(166, 33)[0]} y={polar(166, 33)[1]} text={L.no} size={9.5} track={1.4} fill={textOf(lit("condition"))} anchor="middle" />
              {/* STOP → the gate. Only exists once STOP does. */}
              <path d={`M ${STOP_BOX.x + STOP_BOX.w + 4} 400 L ${GATE_HUMAN[0] - 20} 400`} fill="none" stroke={strokeOf(lit("gate"))} strokeWidth={wOf(lit("gate"))} markerEnd={arrow(lit("gate"))} style={{ transition: "stroke 240ms var(--ease)" }} />
            </g>
          )}
          <Human p={GATE_HUMAN} on={lit("gate")} />
          <text x={GATE_HUMAN[0]} y={GATE_HUMAN[1] - 26} textAnchor="middle" style={mono(11, 2.4)} fill={textOf(lit("gate"))}>
            {L.gateHuman}
          </text>
          <text x={GATE_HUMAN[0]} y={GATE_HUMAN[1] + 32} textAnchor="middle" style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 11.5 }} fill="var(--neutral-400)">
            {L.gateSigns}
          </text>
        </g>
      )}

      {/* ── SOUTH · MEMORY — written after SHIP, read before START. ──────── */}
      {show("memory") && (
        <g data-testid="p19-memory" style={{ opacity: 1 }}>
          <path
            d={`M ${SHIP_NODE[0] - 6} ${SHIP_NODE[1] + 6} C 792 580, 736 582, ${STATE_FILE[0] + 22} ${STATE_FILE[1] + 6}`}
            fill="none"
            stroke={strokeOf(lit("memory"))}
            strokeWidth={wOf(lit("memory"))}
            markerEnd={arrow(lit("memory"))}
            style={{ transition: "stroke 240ms var(--ease)" }}
          />
          <path
            d={`M ${STATE_FILE[0] - 4} ${STATE_FILE[1] - 22} C 668 492, 692 452, ${START_NODE[0] - 4} 412`}
            fill="none"
            stroke={strokeOf(lit("memory"))}
            strokeWidth={wOf(lit("memory"), 1.2)}
            strokeDasharray="4 4"
            markerEnd={arrow(lit("memory"))}
            style={{ transition: "stroke 240ms var(--ease)" }}
          />
          <StateFile p={STATE_FILE} on={lit("memory")} />
          <Tag x={768} y={600} text={L.writeAfter} size={9.5} track={1.4} fill={textOf(lit("memory"))} anchor="middle" />
          <Tag x={620} y={472} text={L.readBefore} size={9.5} track={1.4} fill={textOf(lit("memory"))} anchor="end" />
          <Tag x={STATE_FILE[0]} y={STATE_FILE[1] + 42} text={L.stateFile} size={10} track={1.2} fill={textOf(lit("memory"))} anchor="middle" />
        </g>
      )}

      {/* ── NORTH · BUDGET ──────────────────────────────────────────────────
          The gauge rides the outer band across the north, the only quadrant
          with no apparatus. On hover the fill runs at the cap tick and is
          CHOPPED by it, and the dashed overrun shows where an uncapped loop
          would have gone. That is the "second ring with no stop" image,
          recovered as motion instead of a twin. */}
      {show("budget") && (
        <g data-testid="p19-budget" style={{ opacity: 1 }}>
          <path d={arcPath(R_GAUGE, GAUGE_FROM, GAUGE_CAP)} fill="none" stroke="var(--copper-800)" strokeWidth={5} strokeLinecap="butt" />
          <path
            d={arcPath(R_GAUGE, GAUGE_FROM, lit("budget") ? GAUGE_CAP : GAUGE_IDLE)}
            fill="none"
            stroke={lit("budget") ? "var(--copper-200)" : "var(--copper-600)"}
            strokeWidth={lit("budget") ? 6 : 3.5}
            strokeLinecap="butt"
            style={{ transition: "all 620ms var(--ease)" }}
          />
          <path
            d={`M ${polar(R_GAUGE - 11, GAUGE_CAP)[0]} ${polar(R_GAUGE - 11, GAUGE_CAP)[1]} L ${polar(R_GAUGE + 11, GAUGE_CAP)[0]} ${polar(R_GAUGE + 11, GAUGE_CAP)[1]}`}
            stroke={lit("budget") ? "var(--neutral-0)" : "var(--copper-300)"}
            strokeWidth={lit("budget") ? 2.8 : 1.6}
            style={{ transition: "all 240ms var(--ease)" }}
          />
          <Tag x={polar(R_GAUGE + 24, 232)[0]} y={polar(R_GAUGE + 24, 232)[1]} text={L.spend} size={9.5} track={1.6} fill={textOf(lit("budget"))} anchor="middle" />
          <Tag x={polar(R_GAUGE + 26, GAUGE_CAP)[0] + 8} y={polar(R_GAUGE + 26, GAUGE_CAP)[1]} text={L.cap} size={9.5} track={1.6} fill={lit("budget") ? "var(--neutral-0)" : "var(--copper-400)"} />
          {lit("budget") && (
            <>
              <path d={arcPath(R_GAUGE, GAUGE_CAP, GAUGE_OVERRUN)} fill="none" stroke="var(--copper-600)" strokeWidth={3} strokeDasharray="3 5" />
              <Tag x={polar(R_GAUGE + 14, GAUGE_OVERRUN)[0] + 10} y={polar(R_GAUGE + 14, GAUGE_OVERRUN)[1] - 4} text={L.uncapped} size={9.5} track={1.2} fill="var(--copper-400)" />
            </>
          )}
        </g>
      )}
    </svg>
  );
}

// ── glyphs ────────────────────────────────────────────────────────────────

function Human({ p, on }: { p: Pt; on: boolean }) {
  const c = on ? "var(--copper-100)" : "var(--copper-200)";
  return (
    <g
      transform={`translate(${p[0]} ${p[1]})`}
      stroke={c}
      strokeWidth={on ? 2.4 : 1.9}
      fill="none"
      strokeLinecap="round"
      style={{ transition: "stroke 240ms var(--ease), stroke-width 240ms var(--ease)" }}
    >
      <circle cx={0} cy={-9} r={6.2} />
      <path d="M -11.5 9 A 11.5 11.5 0 0 1 11.5 9" />
    </g>
  );
}

function StateFile({ p, on }: { p: Pt; on: boolean }) {
  const c = on ? "var(--copper-200)" : "var(--copper-700)";
  return (
    <g
      transform={`translate(${p[0]} ${p[1]})`}
      stroke={c}
      strokeWidth={on ? 2.2 : 1.4}
      fill="none"
      style={{ transition: "stroke 240ms var(--ease), stroke-width 240ms var(--ease)" }}
    >
      <path d="M -13 -20 H 4 L 13 -11 V 20 H -13 Z" fill={SURFACE} />
      <path d="M 4 -20 V -11 H 13" />
      <path d="M -7 -2 H 7 M -7 5 H 7 M -7 12 H 2" />
    </g>
  );
}
