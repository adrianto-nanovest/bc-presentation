// PROTOTYPE gh#19 — throwaway. Pure geometry for E.12 · THE LOOP.
//
// One idea holds the whole slide together: the step-0 spiral and the step-1
// ring are THE SAME CURVE. Interpolate every point's radius toward a single
// constant and an Archimedean spiral becomes an exact circle — a spiral at
// q = 0, a circle at q = 1. Three laps merge into one ring, and the three
// human turns stacked on one radial spoke merge into two.
//
// Space A ("hero space") is the full stage: spiral centred at C0.
// Space B ("ring space") is the docked figure: ring centred at C1, radius
// R_FIN. The dock is an affine map from A to B, applied PER POINT in JS
// rather than as an SVG transform — an SVG transform would scale the stroke
// widths and the labels with it, and gh#17 variant B's recorded failure was
// exactly that (station labels fell from 11 px to ~8 px when the ring scaled).

export type Pt = [number, number];

export const C0: Pt = [640, 392]; // hero centre — full stage
export const C1: Pt = [834, 400]; // docked ring centre — right canvas

export const R_INNER = 74; // spiral radius at its unterminated inner start
export const R_SPIRAL = 240; // spiral radius at its unterminated outer end
export const R_BIG = 176; // the merged circle, still at centre, still large
export const R_FIN = 136; // the docked ring

/** Every human turn fires on this radial, once per lap — so the YOU turns are
 *  collinear and "you are in every cycle" is geometry, not a caption. */
export const YOU_SPOKE = 215;
/** The opposite radial: the machine's turn. */
export const AI_SPOKE = 35;

/** A fraction of a lap past the last human turn, so the outer end of the
 *  spiral stops mid-air with no node and no arrowhead. The absence of a
 *  terminator is the message. */
export const TAIL_LAPS = 0.15;

export const TAU = Math.PI * 2;
export const DEG = Math.PI / 180;

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const clamp01 = (t: number) => (t < 0 ? 0 : t > 1 ? 1 : t);

/** Normalised progress across [a, b], clamped. */
export const ramp = (t: number, a: number, b: number) =>
  clamp01((t - a) / (b - a));

/** Smoothstep, for the dock — the merge itself is intentionally linear in q
 *  so the radius collapse reads as mechanical rather than bouncy. */
export const ease = (t: number) => {
  const c = clamp01(t);
  return c * c * (3 - 2 * c);
};

export interface Spiral {
  laps: number;
  thetaEnd: number;
  /** Archimedean growth per radian. */
  k: number;
}

export function spiral(laps: number): Spiral {
  const thetaEnd = (laps + TAIL_LAPS) * TAU;
  return { laps, thetaEnd, k: (R_SPIRAL - R_INNER) / thetaEnd };
}

/** Radius of the spiral at theta, after merging toward the circle by q. */
export function radiusAt(s: Spiral, theta: number, q: number): number {
  return lerp(R_INNER + s.k * theta, R_BIG, q);
}

/** The dock: scale and translate hero space into ring space by d. */
export function dockPoint(p: Pt, d: number): Pt {
  const s = lerp(1, R_FIN / R_BIG, d);
  const cx = lerp(C0[0], C1[0], d);
  const cy = lerp(C0[1], C1[1], d);
  return [cx + s * (p[0] - C0[0]), cy + s * (p[1] - C0[1])];
}

/** A point on the merging, docking curve. */
export function curvePoint(
  s: Spiral,
  theta: number,
  q: number,
  d: number,
): Pt {
  const r = radiusAt(s, theta, q);
  const a = theta;
  return dockPoint([C0[0] + r * Math.cos(a), C0[1] + r * Math.sin(a)], d);
}

/** Polyline path for the curve across [th0, th1] (radians). */
export function curvePath(
  s: Spiral,
  th0: number,
  th1: number,
  q: number,
  d: number,
  samples = 460,
): string {
  if (th1 - th0 <= 0.001) return "";
  const n = Math.max(2, Math.round(((th1 - th0) / s.thetaEnd) * samples));
  let out = "";
  for (let i = 0; i <= n; i++) {
    const [x, y] = curvePoint(s, th0 + ((th1 - th0) * i) / n, q, d);
    out += `${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)} `;
  }
  return out.trim();
}

/** One entry per lap, plus the unterminated tail. Each lap is drawn heavier
 *  than the last: the cost of doing the turns accumulates, and the figure
 *  encodes that in stroke weight rather than saying it. */
export function lapSegments(s: Spiral): { th0: number; th1: number; w: number; tier: string }[] {
  const out: { th0: number; th1: number; w: number; tier: string }[] = [];
  const tiers = ["var(--copper-700)", "var(--copper-600)", "var(--copper-500)", "var(--copper-400)"];
  for (let i = 0; i < s.laps; i++) {
    out.push({
      th0: i * TAU,
      th1: (i + 1) * TAU,
      w: 1.4 + i * 0.55,
      tier: tiers[Math.min(i, tiers.length - 1)],
    });
  }
  out.push({
    th0: s.laps * TAU,
    th1: s.thetaEnd,
    w: 1.4 + s.laps * 0.55,
    tier: tiers[Math.min(s.laps, tiers.length - 1)],
  });
  return out;
}

/** Theta of human turn `i` (0-based lap index). */
export const youTheta = (i: number) => (YOU_SPOKE + i * 360) * DEG;
/** Theta of machine turn `i`. */
export const aiTheta = (i: number) => (AI_SPOKE + i * 360) * DEG;

// ── ring space ────────────────────────────────────────────────────────────

/** Polar around the docked ring centre. */
export function polar(r: number, deg: number): Pt {
  const a = deg * DEG;
  return [C1[0] + r * Math.cos(a), C1[1] + r * Math.sin(a)];
}

/** A chevron sitting ON the ring at `deg`, pointing the way the lap travels
 *  (clockwise). The running comet gives direction in motion; a still frame —
 *  a screenshot, a PDF export, a projector between animations — has none
 *  without this. */
export function chevronPath(r: number, deg: number, size = 5): string {
  const a = deg * DEG;
  // Tangent (clockwise) and outward normal at this point on the circle.
  const tx = -Math.sin(a);
  const ty = Math.cos(a);
  const nx = Math.cos(a);
  const ny = Math.sin(a);
  const [px, py] = polar(r, deg);
  const tip: Pt = [px + tx * size, py + ty * size];
  const a1: Pt = [px - tx * size * 0.55 + nx * size * 0.78, py - ty * size * 0.55 + ny * size * 0.78];
  const a2: Pt = [px - tx * size * 0.55 - nx * size * 0.78, py - ty * size * 0.55 - ny * size * 0.78];
  return `M ${a1[0].toFixed(2)} ${a1[1].toFixed(2)} L ${tip[0].toFixed(2)} ${tip[1].toFixed(2)} L ${a2[0].toFixed(2)} ${a2[1].toFixed(2)}`;
}

export function arcPath(r: number, a0: number, a1: number): string {
  const [x0, y0] = polar(r, a0);
  const [x1, y1] = polar(r, a1);
  const large = Math.abs(a1 - a0) > 180 ? 1 : 0;
  const sweep = a1 > a0 ? 1 : 0;
  return `M ${x0.toFixed(2)} ${y0.toFixed(2)} A ${r} ${r} 0 ${large} ${sweep} ${x1.toFixed(2)} ${y1.toFixed(2)}`;
}

/** Clockwise from the west. PLAN is at 180° so the entry axis is horizontal.
 *
 *  The four stations are the four phases of ONE LAP OF WORK: plan it, run it,
 *  check it, write down what happened. `START` was removed — it is not a phase
 *  of work, it is the entry, and it was doing that job twice (a station inside
 *  the ring AND the target of the entry arrow). Every source ring agrees:
 *  Plan · Execute · Verify · Learn (Article A; the practitioner doc §2.2). */
export const PHASE_ANGLE = [180, 270, 360, 450];
/** Radius the four phase labels sit at — INSIDE the ring, so the whole outer
 *  band is free for the apparatus. */
export const R_PHASE_LABEL = 98;

/** 3.6° cut a gap of ~8.5 px at R_FIN — and the phase node, a 10 px disc, sits
 *  in the middle of it and filled it. The build claimed gh#18's finding and
 *  drew a hoop anyway. 5.5° cuts ~26 px, which clears the node with ~8 px of
 *  dark either side, so the four phases read as four. */
const NOTCH = 5.5;
/** Four notched arcs, not one hoop. gh#18's only load-bearing finding: a
 *  continuous band reads as a single thick hoop and buries the count. */
export const RING_ARCS: [number, number][] = [0, 1, 2, 3].map((i) => [
  PHASE_ANGLE[i] + NOTCH,
  PHASE_ANGLE[(i + 1) % 4] + (i === 3 ? 360 : 0) - NOTCH,
]) as [number, number][];

// ── apparatus anchors (ring space, all hand-placed one group per quadrant) ──
//
// The whole figure sits on ONE horizontal axis, and a human terminates each
// end of it:
//
//   YOU set → [clock] → START ○ ring ○ CHECK → ◇ DONE? → YES → STOP → YOU signs
//
// "You were in every cycle. Now you're at both ends" is then a fact about the
// composition — the two humans are the west and east extremes of one line.
//
// The ring centre sits well left of stage centre so the east chain has room
// for the diamond, its edges, and the gate. The left margin closes up against
// the card column to pay for it.

export const ENTRY_HUMAN: Pt = [560, 400];
export const CLOCK: Pt = [630, 400];
export const CLOCK_R = 15;
export const PLAN_NODE = polar(R_FIN, 180);
export const EXECUTE_NODE = polar(R_FIN, 270);
export const VERIFY_NODE = polar(R_FIN, 0);
/** Formerly `SHIP_NODE`. It sits on the RETURN leg — `VERIFY → here → PLAN`,
 *  which is the way round when the answer is NO. Shipping on the fail branch
 *  is wrong in every source: Article A ("if the result passes the check, ship
 *  it"), the practitioner doc §2.2 (`VERIFY → yes → SHIP`). What actually
 *  happens on this node is what the memory group has always hung off it —
 *  the run writes down what it did. So it is REMEMBER, and the loop ships
 *  once, off-ring, at STOP. */
export const REMEMBER_NODE = polar(R_FIN, 90);

export const STATE_FILE: Pt = [654, 552];

/** The condition diamond hangs well off the ring, with a real edge from the
 *  CHECK node into it. Centred on the node it covered the CHECK phase label
 *  and had no edge at all. */
export const DIAMOND_C: Pt = [1016, 400];
export const DIAMOND_R = { w: 22, h: 19 };
export const STOP_BOX = { x: 1060, y: 385, w: 58, h: 30 };

/** The GATE human sits AFTER `STOP`, not off the SHIP edge.
 *
 *  This corrects the anatomy inherited from gh#17. A gate that fires on every
 *  lap is not a loop — it is turn-by-turn with extra steps, which is the exact
 *  thing this slide attacks. `GATE`'s own copy says "where work stops and waits
 *  for a person", and the place work STOPS is `STOP`. So the loop runs
 *  unattended until the condition is met, and only then does a person sign. */
export const GATE_HUMAN: Pt = [1168, 400];

/** The budget gauge rides the OUTER band across the north, where no apparatus
 *  group lives. Inside was tried first and collided with the phase labels. */
export const R_GAUGE = 158;
export const GAUGE_FROM = 195;
export const GAUGE_CAP = 315;
export const GAUGE_IDLE = 285;
/** A radial leader from the EXECUTE node out to the gauge. Without it the gauge is
 *  a second concentric arc floating beside the ring, and at projector distance
 *  that reads as a rival ring — exactly the "second ring" image #19 item 3
 *  cut. Tied to RUN, it reads as one annotation: spend accrues while it runs. */
export const GAUGE_LEADER_DEG = 270;
/** How far past the cap tick the dashed "no cap" overrun reaches. Bounded so
 *  it stops clear of the CHECK diamond. */
export const GAUGE_OVERRUN = 338;
