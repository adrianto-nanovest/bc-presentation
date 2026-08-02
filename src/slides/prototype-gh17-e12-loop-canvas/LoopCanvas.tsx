// PROTOTYPE — gh#17. THROWAWAY. Not imported by any shipping slide.
//
// The E.12 right-column canvas: a turn-by-turn chain that folds into a ring,
// then five hover states that LIGHT what is already drawn.
//
// Three variants, and they disagree about exactly one thing — open question 2,
// "can BUDGET overlay the same ring, or does it need a second figure?":
//
//   A — OVERLAY   one ring. Every apparatus is pre-drawn dim and never moves.
//                 BUDGET is a concentric dashed ghost twin, always faintly
//                 present, that lifts on hover. Densest; zero motion.
//   B — TWIN      apparatus pre-drawn dim like A, but BUDGET is a SECOND
//                 FIGURE: the ring shrinks and slides left, an uncapped twin
//                 draws beside it, meters between. Only BUDGET moves layout.
//   C — GAUGE     apparatus is HIDDEN until hover and docks in place, and
//                 BUDGET duplicates nothing at all — spend is an arc gauge
//                 wrapped around the ring with a cap tick on it.
//
// So A vs C also settles "must the canvas show everything at once", and B
// settles "is a layout move worth the comparison".
//
// The ring anatomy itself is SHARED across all three on purpose. The brief
// (gh#10) fixes it, so three different ring anatomies would answer a question
// nobody asked. Fold timing and un-hover behaviour are scalars, not
// structures — they are switcher CONTROLS, so they can be judged against all
// three variants rather than baked one-per-variant.
//
// Colours are CSS vars only — no hex, no rgba literals. Alpha is expressed as
// `opacity` / `strokeOpacity` so the copper ramp stays the single accent.
import { useEffect, useRef, useState } from "react";

export type LoopRow = "trigger" | "memory" | "condition" | "budget" | "gate";
export type VariantKey = "A" | "B" | "C";

// ───────────────────── geometry ─────────────────────
// One ring, four stations, clockwise from START at the left.
//   START (180°) → RUN (270°, top) → CHECK (0°, right) → SHIP (90°, bottom)
// The chain is the same four nodes unrolled onto a horizontal line, so the
// fold is a per-node lerp plus a per-segment control-point lerp: exactly
// straight at q=0, exactly circular at q=1.

export const VB_W = 660;
export const VB_H = 420;
const CX = 330;
const CY = 186;
const R = 110;
const KAPPA = 0.5523; // cubic control length for a 90° arc

const STATION_DEG = [180, 270, 360, 450];
const CHAIN_Y = CY - 26;
const CHAIN_GAP = 126;

type Pt = readonly [number, number];

const rad = (d: number) => (d * Math.PI) / 180;
const onRing = (deg: number): Pt => [
  CX + R * Math.cos(rad(deg)),
  CY + R * Math.sin(rad(deg)),
];
const tangent = (deg: number): Pt => [-Math.sin(rad(deg)), Math.cos(rad(deg))];
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const lerpPt = (a: Pt, b: Pt, t: number): Pt => [
  lerp(a[0], b[0], t),
  lerp(a[1], b[1], t),
];
const clamp01 = (n: number) => Math.max(0, Math.min(1, n));
const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
/** 0 before `a`, 1 after `b`, smooth between. */
const ramp = (t: number, a: number, b: number) => clamp01((t - a) / (b - a));

const CHAIN_PT: Pt[] = [0, 1, 2, 3].map((i) => [
  CX + (i - 1.5) * CHAIN_GAP,
  CHAIN_Y,
]);
const RING_PT: Pt[] = STATION_DEG.map(onRing);

/** Node positions at fold progress q. */
function nodesAt(q: number): Pt[] {
  return CHAIN_PT.map((c, i) => lerpPt(c, RING_PT[i], q));
}

/**
 * One segment of the loop as a cubic, at fold progress q.
 * `i` is the source station; segment 3 (SHIP→START) closes the ring and has
 * no chain counterpart, so it keeps the circular controls throughout and is
 * revealed by opacity instead — the moment it appears is the moment the chain
 * stops being a chain.
 */
function segPath(i: number, q: number): string {
  const n = nodesAt(q);
  const a = n[i];
  const b = n[(i + 1) % 4];
  const ta = tangent(STATION_DEG[i]);
  const tb = tangent(STATION_DEG[i] + 90);
  const ringC1: Pt = [a[0] + KAPPA * R * ta[0], a[1] + KAPPA * R * ta[1]];
  const ringC2: Pt = [b[0] - KAPPA * R * tb[0], b[1] - KAPPA * R * tb[1]];
  let c1 = ringC1;
  let c2 = ringC2;
  if (i < 3) {
    const straightC1 = lerpPt(a, b, 1 / 3);
    const straightC2 = lerpPt(a, b, 2 / 3);
    c1 = lerpPt(straightC1, ringC1, q);
    c2 = lerpPt(straightC2, ringC2, q);
  }
  return `M ${a[0]} ${a[1]} C ${c1[0]} ${c1[1]} ${c2[0]} ${c2[1]} ${b[0]} ${b[1]}`;
}

/** Arc on the ring (or a concentric radius) from `from`° to `to`°, clockwise. */
function arcPath(from: number, to: number, radius = R): string {
  const a: Pt = [CX + radius * Math.cos(rad(from)), CY + radius * Math.sin(rad(from))];
  const b: Pt = [CX + radius * Math.cos(rad(to)), CY + radius * Math.sin(rad(to))];
  const large = Math.abs(to - from) > 180 ? 1 : 0;
  return `M ${a[0]} ${a[1]} A ${radius} ${radius} 0 ${large} 1 ${b[0]} ${b[1]}`;
}

// Apparatus anchors — fixed, so nothing is ever placed at hover time.
const CLOCK: Pt = [CX - R - 92, CY];
const STOP: Pt = [CX + R + 84, CY];
const FILE: Pt = [CX - 122, CY + 188];
const GATE: Pt = [CX + 126, CY + 172];
const HUMAN_IN: Pt = [CX - R - 92, CY - 60];

// ───────────────────── clock ─────────────────────

const LAP_MS = 3200;

function useClock(replayKey: number, reduced: boolean) {
  const [ms, setMs] = useState(reduced ? 1e6 : 0);
  const raf = useRef(0);
  useEffect(() => {
    if (reduced) {
      setMs(1e6);
      return;
    }
    const t0 = performance.now();
    const tick = (now: number) => {
      setMs(now - t0);
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [replayKey, reduced]);
  return ms;
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}

// ───────────────────── glyphs ─────────────────────

const DIM = "var(--copper-800)";
const MID = "var(--copper-600)";
const LIT = "var(--copper-200)";
const HOT = "var(--copper-100)";
const MONO = "var(--mono)";

function Human({ x, y, s = 1, color = LIT, opacity = 1, sw = 1.7 }: {
  x: number; y: number; s?: number; color?: string; opacity?: number; sw?: number;
}) {
  return (
    <g transform={`translate(${x},${y}) scale(${s})`} opacity={opacity}>
      <circle cx={0} cy={-8} r={4.8} fill="none" stroke={color} strokeWidth={sw} />
      <path d="M -8 7 A 8 8 0 0 1 8 7" fill="none" stroke={color} strokeWidth={sw} />
    </g>
  );
}

function Clock({ x, y, color, hand }: { x: number; y: number; color: string; hand: number }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <circle r={15} fill="none" stroke={color} strokeWidth={1.8} />
      <line x1={0} y1={0} x2={0} y2={-9} stroke={color} strokeWidth={1.8} />
      <line
        x1={0}
        y1={0}
        x2={11 * Math.cos(rad(hand - 90))}
        y2={11 * Math.sin(rad(hand - 90))}
        stroke={color}
        strokeWidth={1.4}
      />
      {[0, 90, 180, 270].map((d) => (
        <circle key={d} cx={15 * Math.cos(rad(d))} cy={15 * Math.sin(rad(d))} r={1.3} fill={color} />
      ))}
    </g>
  );
}

function FileNode({ x, y, color }: { x: number; y: number; color: string }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <path
        d="M -15 -20 L 7 -20 L 15 -12 L 15 20 L -15 20 Z"
        fill="none"
        stroke={color}
        strokeWidth={1.8}
      />
      <path d="M 7 -20 L 7 -12 L 15 -12" fill="none" stroke={color} strokeWidth={1.4} />
      {[-4, 2, 8].map((dy) => (
        <line key={dy} x1={-8} y1={dy} x2={8} y2={dy} stroke={color} strokeWidth={1.2} />
      ))}
    </g>
  );
}

function Head({ x, y, ang, color, size = 6.5 }: {
  x: number; y: number; ang: number; color: string; size?: number;
}) {
  return (
    <path
      d={`M 0 0 L ${-size} ${size * 0.58} L ${-size} ${-size * 0.58} Z`}
      fill={color}
      transform={`translate(${x},${y}) rotate(${ang})`}
    />
  );
}

function Mono({ x, y, children, color = MID, size = 10, anchor = "middle" as const, ls = "0.16em" }: {
  x: number; y: number; children: string; color?: string; size?: number;
  anchor?: "start" | "middle" | "end"; ls?: string;
}) {
  return (
    <text x={x} y={y} fill={color} fontSize={size} fontFamily={MONO} letterSpacing={ls} textAnchor={anchor}>
      {children}
    </text>
  );
}

// ───────────────────── which parts each row lights ─────────────────────

type Part =
  | "clock" | "entry" | "file" | "mem" | "diamond" | "stop" | "gate"
  | "ghost" | "meters" | "gauge";

const ROW_PARTS: Record<LoopRow, Part[]> = {
  trigger: ["clock", "entry"],
  memory: ["file", "mem"],
  condition: ["diamond", "stop"],
  budget: ["ghost", "meters", "gauge"],
  gate: ["gate"],
};

/** Ring segments a row lights. 0:START→RUN 1:RUN→CHECK 2:CHECK→SHIP 3:SHIP→START */
const ROW_SEGS: Record<LoopRow, number[]> = {
  trigger: [0],
  memory: [3],
  condition: [2],
  budget: [0, 1, 2, 3],
  gate: [2],
};

/** Stations a row lights. */
const ROW_NODES: Record<LoopRow, number[]> = {
  trigger: [0],
  memory: [3, 0],
  condition: [2],
  budget: [],
  gate: [3],
};

// ───────────────────── the canvas ─────────────────────

export interface LoopCanvasProps {
  variant: VariantKey;
  /** Hovered/pinned row, or null for the idle ring. */
  active: LoopRow | null;
  /** Step 1: everything lights at once and the ring runs one clean cycle. */
  allLit: boolean;
  /** Total entry-sequence duration in ms (chain → fold → settle). */
  entryMs: number;
  /** Bump to replay the entry sequence. */
  replayKey: number;
}

export function LoopCanvas({ variant, active, allLit, entryMs, replayKey }: LoopCanvasProps) {
  const reduced = usePrefersReducedMotion();
  const t = useClock(replayKey, reduced);

  // Entry timeline, as fractions of entryMs.
  const p = clamp01(t / entryMs);
  const chainIn = ramp(p, 0.02, 0.3);
  const q = easeInOut(ramp(p, 0.42, 0.84)); // fold progress
  const settled = ramp(p, 0.84, 1);
  const done = p >= 1;

  // One clean cycle on step 1 — timed from the moment step 1 arrives.
  const lapStart = useRef<number | null>(null);
  useEffect(() => {
    lapStart.current = allLit ? null : null;
  }, [allLit]);
  if (allLit && lapStart.current === null) lapStart.current = t;
  if (!allLit && lapStart.current !== null) lapStart.current = null;

  const lapU = allLit && lapStart.current !== null
    ? clamp01((t - lapStart.current) / (LAP_MS * 1.4))
    : 0;

  // Travelling pulse. Idle: free-running. GATE: "ring holds" — frozen at SHIP.
  // Step 1: exactly one lap from START, then holds.
  const freeAngle = 180 + ((t % LAP_MS) / LAP_MS) * 360;
  const pulseDeg = !done
    ? null
    : allLit
      ? 180 + easeOut(lapU) * 360
      : active === "gate"
        ? 450
        : freeAngle;
  const pulsePt = pulseDeg == null ? null : onRing(pulseDeg);

  const isLit = (part: Part) =>
    allLit || (active != null && ROW_PARTS[active].includes(part));
  const segLit = (i: number) =>
    allLit || (active != null && ROW_SEGS[active].includes(i));
  const nodeLit = (i: number) =>
    allLit || (active != null && ROW_NODES[active].includes(i));

  // Variant C hides apparatus entirely until it is called for; A and B keep it
  // permanently on the canvas at low opacity.
  const restOpacity = variant === "C" ? 0 : 0.24;
  const partOpacity = (part: Part) => (isLit(part) ? 1 : restOpacity) * settled;

  const nodes = nodesAt(q);
  const budgetOn = isLit("meters");
  // Variant B is the only one that moves the ring, and only for BUDGET.
  const split = variant === "B" && budgetOn;
  const S = 0.72;
  // NOTE: CSS transforms on SVG need units — `translate(-69.6,62.1)` is
  // invalid and silently ignored, which is how B first rendered its twin on
  // top of the untouched ring.
  const ringXform = split
    ? `translate(${168 - S * CX}px,${196 - S * CY}px) scale(${S})`
    : "translate(0px,0px) scale(1)";

  return (
    <svg
      data-testid="proto-loop-canvas"
      data-variant={variant}
      data-active={active ?? "idle"}
      data-phase={done ? "ring" : q > 0 ? "fold" : "chain"}
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      style={{ width: VB_W, height: VB_H, overflow: "visible" }}
    >
      {/* ── the ring group (B translates + scales this, and only this) ── */}
      <g
        style={{
          transform: ringXform,
          transition: "transform 0.55s var(--ease)",
        }}
      >
        {/* segments */}
        {[0, 1, 2, 3].map((i) => {
          const closing = i === 3;
          const drawn = closing ? q : chainIn;
          return (
            <path
              key={i}
              data-seg={i}
              d={segPath(i, q)}
              fill="none"
              stroke={segLit(i) ? LIT : DIM}
              strokeWidth={segLit(i) ? 3 : 2}
              strokeOpacity={drawn}
              style={{ transition: "stroke 0.28s var(--ease), stroke-width 0.28s var(--ease)" }}
            />
          );
        })}

        {/* stations */}
        {nodes.map((n, i) => (
          <g key={i} opacity={clamp01(ramp(p, 0.02 + i * 0.05, 0.14 + i * 0.05))}>
            <circle
              cx={n[0]}
              cy={n[1]}
              r={nodeLit(i) ? 8 : 6}
              fill="var(--surface-dark)"
              stroke={nodeLit(i) ? HOT : MID}
              strokeWidth={2}
              style={{ transition: "stroke 0.28s var(--ease), r 0.28s var(--ease)" }}
            />
            {/* chain label (YOU / AI) fades out as the ring labels fade in */}
            <g opacity={1 - clamp01(q * 1.6)}>
              <Mono x={n[0]} y={n[1] - 18} color={i % 2 === 0 ? HOT : MID} size={11}>
                {i % 2 === 0 ? "YOU" : "AI"}
              </Mono>
            </g>
          </g>
        ))}

        {/* ring station labels, inside the ring so the outside stays free */}
        <g opacity={clamp01((q - 0.55) / 0.45)}>
          {["START", "RUN", "CHECK", "SHIP"].map((label, i) => {
            const d = STATION_DEG[i];
            const lx = CX + (R - 40) * Math.cos(rad(d));
            const ly = CY + (R - 40) * Math.sin(rad(d));
            return (
              <Mono key={label} x={lx} y={ly + 4} color={nodeLit(i) ? HOT : MID} size={11}>
                {label}
              </Mono>
            );
          })}
        </g>

        {/* travelling pulse + its trail on step 1 */}
        {pulsePt && (
          <>
            {allLit && lapU > 0.01 && (
              <path
                d={arcPath(180, 180 + Math.min(easeOut(lapU) * 360, 359.9))}
                fill="none"
                stroke={HOT}
                strokeWidth={3}
                strokeOpacity={0.55}
                strokeLinecap="round"
              />
            )}
            <circle cx={pulsePt[0]} cy={pulsePt[1]} r={5} fill={HOT} />
            <circle cx={pulsePt[0]} cy={pulsePt[1]} r={11} fill="none" stroke={HOT} strokeWidth={1.2} opacity={0.4} />
          </>
        )}

        {/* ── TRIGGER — clock + entry arrow into START ── */}
        <g opacity={partOpacity("clock")} style={{ transition: "opacity 0.28s var(--ease)" }}>
          <Clock x={CLOCK[0]} y={CLOCK[1]} color={isLit("clock") ? LIT : MID} hand={(t / 12) % 360} />
          <line
            x1={CLOCK[0] + 22}
            y1={CY}
            x2={CX - R - 14}
            y2={CY}
            stroke={isLit("entry") ? LIT : MID}
            strokeWidth={2}
          />
          <Head x={CX - R - 8} y={CY} ang={0} color={isLit("entry") ? LIT : MID} />
          <Mono x={CLOCK[0]} y={CLOCK[1] + 34} color={isLit("clock") ? LIT : MID} size={9}>
            EVERY FRI 16:00
          </Mono>
        </g>

        {/* ── MEMORY — file below the ring, write-after / read-before ── */}
        <g opacity={partOpacity("file")} style={{ transition: "opacity 0.28s var(--ease)" }}>
          <FileNode x={FILE[0]} y={FILE[1]} color={isLit("file") ? LIT : MID} />
          {/* write-after: SHIP → file */}
          <path
            d={`M ${CX} ${CY + R + 8} C ${CX - 40} ${CY + R + 46} ${FILE[0] + 46} ${FILE[1] - 44} ${FILE[0] + 20} ${FILE[1] - 20}`}
            fill="none"
            stroke={isLit("mem") ? LIT : MID}
            strokeWidth={1.8}
          />
          <Head x={FILE[0] + 20} y={FILE[1] - 20} ang={128} color={isLit("mem") ? LIT : MID} />
          {/* read-before: file → START */}
          <path
            d={`M ${FILE[0] - 12} ${FILE[1] - 22} C ${FILE[0] - 46} ${FILE[1] - 70} ${CX - R - 34} ${CY + 58} ${CX - R - 12} ${CY + 10}`}
            fill="none"
            stroke={isLit("mem") ? LIT : MID}
            strokeWidth={1.8}
            strokeDasharray="5 4"
          />
          <Head x={CX - R - 12} y={CY + 10} ang={-62} color={isLit("mem") ? LIT : MID} />
          <Mono x={FILE[0]} y={FILE[1] + 36} color={isLit("file") ? LIT : MID} size={9}>
            STATE FILE
          </Mono>
          <Mono x={FILE[0] + 62} y={FILE[1] - 30} color={isLit("mem") ? LIT : MID} size={8} anchor="start">
            WRITE AFTER
          </Mono>
          <Mono x={FILE[0] - 26} y={FILE[1] - 58} color={isLit("mem") ? LIT : MID} size={8} anchor="end">
            READ BEFORE
          </Mono>
        </g>

        {/* ── CONDITION — diamond at CHECK, both exits ── */}
        <g opacity={partOpacity("diamond")} style={{ transition: "opacity 0.28s var(--ease)" }}>
          <path
            d={`M ${CX + R} ${CY - 19} L ${CX + R + 19} ${CY} L ${CX + R} ${CY + 19} L ${CX + R - 19} ${CY} Z`}
            fill="var(--surface-dark)"
            stroke={isLit("diamond") ? LIT : MID}
            strokeWidth={2}
          />
          <Mono x={CX + R} y={CY - 28} color={isLit("diamond") ? LIT : MID} size={9}>
            DONE?
          </Mono>
          {/* stop exit */}
          <line
            x1={CX + R + 21}
            y1={CY}
            x2={STOP[0] - 20}
            y2={CY}
            stroke={isLit("stop") ? LIT : MID}
            strokeWidth={1.8}
          />
          <Head x={STOP[0] - 16} y={CY} ang={0} color={isLit("stop") ? LIT : MID} />
          <rect
            x={STOP[0] - 14}
            y={CY - 15}
            width={44}
            height={30}
            fill="none"
            stroke={isLit("stop") ? LIT : MID}
            strokeWidth={1.8}
          />
          <Mono x={STOP[0] + 8} y={CY + 4} color={isLit("stop") ? LIT : MID} size={10}>
            STOP
          </Mono>
          <Mono x={STOP[0] - 22} y={CY - 10} color={isLit("stop") ? LIT : MID} size={8} anchor="end">
            YES
          </Mono>
          <Mono x={CX + R - 4} y={CY + 42} color={isLit("diamond") ? LIT : MID} size={8} anchor="end">
            NO
          </Mono>
        </g>

        {/* ── GATE — human outside, on the ship edge ── */}
        <g opacity={partOpacity("gate")} style={{ transition: "opacity 0.28s var(--ease)" }}>
          <path
            d={`M ${CX + 74} ${CY + 82} L ${GATE[0] - 6} ${GATE[1] - 22}`}
            fill="none"
            stroke={isLit("gate") ? LIT : MID}
            strokeWidth={1.8}
          />
          <Head x={GATE[0] - 4} y={GATE[1] - 20} ang={52} color={isLit("gate") ? LIT : MID} />
          <Human x={GATE[0]} y={GATE[1] + 2} s={1.25} color={isLit("gate") ? HOT : MID} />
          <Mono x={GATE[0]} y={GATE[1] + 34} color={isLit("gate") ? LIT : MID} size={9}>
            SIGNS OFF
          </Mono>
        </g>

        {/* ── BUDGET, variant A — concentric dashed ghost twin, no stop ── */}
        {variant === "A" && (
          <g
            opacity={(isLit("ghost") ? 1 : 0.14) * settled}
            style={{ transition: "opacity 0.28s var(--ease)" }}
          >
            <circle
              cx={CX}
              cy={CY}
              r={R + 30}
              fill="none"
              stroke={isLit("ghost") ? HOT : DIM}
              strokeWidth={2}
              strokeDasharray="7 6"
            />
            {isLit("ghost") && (
              <>
                <circle
                  cx={CX + (R + 30) * Math.cos(rad(freeAngle * 1.7))}
                  cy={CY + (R + 30) * Math.sin(rad(freeAngle * 1.7))}
                  r={4.5}
                  fill={HOT}
                />
                <Mono x={CX} y={CY - R - 40} color={HOT} size={9}>
                  NO STOP · SAME SCHEDULE
                </Mono>
              </>
            )}
          </g>
        )}

        {/* ── BUDGET, variant C — spend gauge wrapped on the ring itself ── */}
        {variant === "C" && (
          <g opacity={partOpacity("gauge")} style={{ transition: "opacity 0.28s var(--ease)" }}>
            <circle cx={CX} cy={CY} r={R + 18} fill="none" stroke={DIM} strokeWidth={6} />
            <path
              d={arcPath(180, 180 + Math.min(1, (t % 6000) / 4200) * 359.9, R + 18)}
              fill="none"
              stroke={HOT}
              strokeWidth={6}
              strokeLinecap="butt"
            />
            {/* cap tick at 70% of one full spend */}
            <line
              x1={CX + (R + 8) * Math.cos(rad(180 + 0.7 * 360))}
              y1={CY + (R + 8) * Math.sin(rad(180 + 0.7 * 360))}
              x2={CX + (R + 30) * Math.cos(rad(180 + 0.7 * 360))}
              y2={CY + (R + 30) * Math.sin(rad(180 + 0.7 * 360))}
              stroke={LIT}
              strokeWidth={2.5}
            />
            <Mono
              x={CX + (R + 46) * Math.cos(rad(180 + 0.7 * 360))}
              y={CY + (R + 46) * Math.sin(rad(180 + 0.7 * 360))}
              color={LIT}
              size={9}
            >
              CAP
            </Mono>
            <Mono x={CX} y={CY - R - 34} color={HOT} size={9}>
              SPEND PER RUN
            </Mono>
          </g>
        )}
      </g>

      {/* ── BUDGET, variant B — a genuine second figure beside the first ── */}
      {variant === "B" && (
        <g
          opacity={split ? 1 : 0}
          style={{ transition: "opacity 0.45s var(--ease)", pointerEvents: "none" }}
        >
          {/* The scaled ring drags its STOP box out to x≈339, so the twin has
              to start past ~430 or the meters land on top of it. */}
          <circle cx={512} cy={196} r={74} fill="none" stroke={HOT} strokeWidth={2.5} strokeDasharray="7 6" />
          <circle
            cx={512 + 74 * Math.cos(rad(freeAngle * 1.7))}
            cy={196 + 74 * Math.sin(rad(freeAngle * 1.7))}
            r={5}
            fill={HOT}
          />
          <Mono x={512} y={196 - 90} color={HOT} size={10}>
            NO STOP
          </Mono>
          <Mono x={512} y={196 + 104} color={HOT} size={9}>
            RUNS AGAIN. AND AGAIN.
          </Mono>
          <Mono x={168} y={196 + 116} color={LIT} size={9}>
            CAPPED · 7-DAY EXPIRY
          </Mono>
        </g>
      )}

      {/* ── spend meters — A and B only; C puts spend on the ring instead ── */}
      {variant !== "C" && (
        <g opacity={partOpacity("meters")} style={{ transition: "opacity 0.28s var(--ease)" }}>
          {[
            { x: variant === "B" ? 372 : 584, label: "CAPPED", capped: true },
            { x: variant === "B" ? 406 : 618, label: "OPEN", capped: false },
          ].map((m) => {
            const top = 96;
            const bottom = 262;
            const h = bottom - top;
            const raw = ((t % 6000) / 4200) * h;
            const fill = Math.max(0, m.capped ? Math.min(raw, h * 0.62) : Math.min(raw, h));
            return (
              <g key={m.label}>
                <rect x={m.x} y={top} width={20} height={h} fill="none" stroke={DIM} strokeWidth={1.5} />
                <rect x={m.x + 1.5} y={bottom - fill} width={17} height={fill} fill={m.capped ? LIT : HOT} />
                {m.capped && (
                  <line
                    x1={m.x - 5}
                    y1={bottom - h * 0.62}
                    x2={m.x + 25}
                    y2={bottom - h * 0.62}
                    stroke={HOT}
                    strokeWidth={2}
                  />
                )}
                {/* staggered — at 8px mono the two labels butt together */}
                <Mono
                  x={m.x + 10}
                  y={bottom + (m.capped ? 16 : 30)}
                  color={m.capped ? LIT : HOT}
                  size={8}
                  ls="0.1em"
                >
                  {m.label}
                </Mono>
              </g>
            );
          })}
        </g>
      )}

      {/* ── the humans: in every link during the chain, at both ends after ── */}
      {nodes.map((n, i) => {
        const outside = i === 0 || i === 2;
        const target: Pt = i === 0 ? HUMAN_IN : GATE;
        const pos = outside ? lerpPt(n, target, q) : n;
        const pulse = 0.55 + 0.45 * Math.abs(Math.sin((t / 520) + i));
        const op = outside
          ? clamp01(ramp(p, 0.06 + i * 0.05, 0.2 + i * 0.05))
          : clamp01(ramp(p, 0.06 + i * 0.05, 0.2 + i * 0.05)) * (1 - clamp01(q * 1.5));
        return (
          <Human
            key={`h${i}`}
            x={pos[0]}
            y={pos[1] + (outside ? lerp(30, 0, q) : 30)}
            s={lerp(0.95, outside ? 1.25 : 0.95, q)}
            color={done ? LIT : HOT}
            opacity={op * (done ? 1 : pulse)}
          />
        );
      })}

      {/* chain caption — only while it is still a chain */}
      <g opacity={(1 - clamp01(q * 2)) * chainIn}>
        <Mono x={CX} y={CY - 82} color={MID} size={10} ls="0.22em">
          YOU ARE IN EVERY LINK
        </Mono>
      </g>
    </svg>
  );
}
