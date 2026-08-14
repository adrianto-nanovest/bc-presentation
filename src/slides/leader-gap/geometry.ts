// The staircase, as numbers — stage coordinates for a 1280×720 stage.
//
// Spec §7.2: the `hr-group-agentic-org/web/index.html` path-draw ports cleanly,
// and the geometry was never the cost. It is RE-CUT here rather than copied,
// because the original is a 1920-wide page and the two things that had to move
// are the two this file exists to state: how much headroom the annotations get,
// and how much floor the rung labels get.
//
// THE VERTICAL BUDGET, and why these numbers and not rounder ones:
//
//   · A rung label hangs UNDER its tread and is up to 78px tall (two lines of
//     display serif, then two of sans). The lowest tread is therefore at 552 —
//     one pixel lower and L1's label crosses y=640, where the NavBar's hover
//     zone starts (`E12Primitives` measured that band at ≈660 and stops content
//     at 648; the same rule applies here).
//   · A marker chip sits ABOVE the staircase, in the band no tread reaches. The
//     highest tread is at 328, so that band is y<328 across the FULL width —
//     which is the whole reason the chips are above and not beside. A chip beside
//     a tread has to dodge the next riser; a chip above the top tread dodges
//     nothing.
//
// So the rise is 56 and the run is 220: steep enough to read as a climb from the
// back row, shallow enough that both budgets above survive. Changing either
// number moves both.
//
// Pure data and pure functions. No React, no DOM, no work at module scope beyond
// deriving the two path strings — importable from a node test.

/** One horizontal step of the staircase. `y` is the tread; `x1`→`x2` its run. */
export interface Tread {
  x1: number;
  x2: number;
  y: number;
}

/**
 * The five treads, L1 (lowest, left) to L5 (highest, right).
 *
 * Indexed by RUNG INDEX, so `TREADS[2]` is L3 — the same index the content
 * module's markers name. There is no separate rung→tread table on purpose: one
 * of the two would drift, and it would drift silently because a marker attached
 * to the wrong tread still renders.
 */
export const TREADS: readonly Tread[] = [
  { x1: 88, x2: 308, y: 552 },
  { x1: 308, x2: 528, y: 496 },
  { x1: 528, x2: 748, y: 440 },
  { x1: 748, x2: 968, y: 384 },
  // The last run is 4px wider so the path ends at 1192 — an 88px right margin,
  // matching the left one. L5's label gets the extra width, which it needs least.
  { x1: 968, x2: 1192, y: 328 },
];

/** How many rungs the ladder has. Derived, so §6.5's five cannot be five here
 *  and four in a loop somewhere else. */
export const RUNG_COUNT = TREADS.length;

/**
 * The last rung the staircase is drawn SOLID through: L4.
 *
 * L5's own definition is that it is declared only when earned, and nothing on
 * this slide — not the cited claim, not the question, not our own mark — is
 * placed anywhere near it. So the top step is drawn in the dash the deck already
 * spends on "not claimed" (the open marker's chip and leader), and the room reads
 * the ladder's last step as a step nobody has built rather than as a promise the
 * figure is quietly making. NOT A FIFTH ENCODING: it is the same dash, saying the
 * same thing, about a step instead of about a mark.
 */
export const EARNED_THROUGH_RUNG = 3;

export interface Point {
  x: number;
  y: number;
}

/**
 * Where a marker attaches to the staircase.
 *
 * A UNION AND NOT A FRACTIONAL RUNG INDEX. The prototype took `at: number` and
 * interpolated between tread CENTRES, which on a staircase puts every fractional
 * marker in mid-air — `at: 0.4` landed 26px above the L1 tread, touching nothing.
 * A staircase has exactly two places a marker can honestly sit: on a tread, or on
 * the riser between two treads. This says which, and "between L1 and L2" then
 * means a point that is actually on the figure.
 *
 * `t` says WHERE ALONG a tread, and it is optional because the answer is the
 * midpoint unless a layout says otherwise. It cannot put a marker off the figure:
 * every value it accepts is a point on that tread.
 */
export type Anchor =
  | { readonly on: "tread"; readonly rung: number; readonly t?: number }
  /** The riser rising OUT OF rung `below` — `below: 0` is the L1–L2 riser. */
  | { readonly on: "riser"; readonly below: number };

/**
 * The point on the staircase an anchor names.
 *
 * @throws on a rung index the ladder does not have, on a riser above the top
 *         tread, or on a `t` outside the tread. A marker silently clamped to L5
 *         is a marker making a claim nobody authored, and it would look
 *         deliberate.
 */
export function anchorPoint(anchor: Anchor): Point {
  if (anchor.on === "tread") {
    const tread = TREADS[anchor.rung];
    if (!tread) {
      throw new Error(
        `anchorPoint: no rung ${anchor.rung} — the ladder has ${RUNG_COUNT} ` +
          `(0…${RUNG_COUNT - 1}).`,
      );
    }
    const t = anchor.t ?? 0.5;
    if (!(t >= 0 && t <= 1)) {
      throw new Error(`anchorPoint: t ${t} is off rung ${anchor.rung}'s tread — it runs 0…1.`);
    }
    return { x: tread.x1 + t * (tread.x2 - tread.x1), y: tread.y };
  }

  const lower = TREADS[anchor.below];
  const upper = TREADS[anchor.below + 1];
  if (!lower || !upper) {
    throw new Error(
      `anchorPoint: no riser above rung ${anchor.below} — a riser needs the tread ` +
        `above it, and the ladder has ${RUNG_COUNT} rungs (0…${RUNG_COUNT - 1}).`,
    );
  }
  // The riser IS the shared x of the two treads, and its midpoint is the honest
  // reading of "between these two rungs".
  return { x: lower.x2, y: (lower.y + upper.y) / 2 };
}

// ───────────────────── the staircase as a path ─────────────────────
//
// THREE PATHS ARE DRAWN AND ONE POLYLINE DEFINES THEM ALL. The figure needs the
// climb split three ways — earned (solid), unearned (dashed), and the stretch
// between two marks (the gap, lit on its own pose) — and every one of those is a
// SUB-WALK of the same corners. So the corners are the data and the paths are
// derived, which is what keeps a highlighted stretch from drifting one pixel off
// the line it is highlighting.
//
// Each path is still ONE element, so its draw-in stays a single
// `stroke-dashoffset` sweep and climbs instead of assembling in nine places.

const EPSILON = 1e-6;

/**
 * The staircase as a polyline — every corner, in climbing order.
 *
 * Ten points for five treads: each tread contributes both its ends, and because
 * a tread starts exactly where the one below it finished, the RISERS fall out as
 * the segments between them. There is no separate riser table for the same reason
 * there is no separate rung→tread table: the second copy is the one that drifts.
 */
export const CORNERS: readonly Point[] = TREADS.flatMap((tread) => [
  { x: tread.x1, y: tread.y },
  { x: tread.x2, y: tread.y },
]);

/** Is `p` on the axis-aligned segment `a`→`b`? */
function onSegment(p: Point, a: Point, b: Point): boolean {
  const between = (v: number, lo: number, hi: number) =>
    v >= Math.min(lo, hi) - EPSILON && v <= Math.max(lo, hi) + EPSILON;
  return Math.abs(a.x - b.x) < EPSILON
    ? Math.abs(p.x - a.x) < EPSILON && between(p.y, a.y, b.y)
    : Math.abs(p.y - a.y) < EPSILON && between(p.x, a.x, b.x);
}

/**
 * How far along the staircase a point sits, in user units from L1's left end.
 *
 * MEASURED, not assumed, and that is what makes {@link stairPathBetween} safe to
 * hand a coordinate: a point the ladder does not have cannot be ordered against
 * one it does, so it throws here rather than producing a path that leaves the
 * figure. Manhattan length, because every segment is axis-aligned.
 *
 * @throws when `p` is not on the staircase.
 */
export function alongStair(p: Point): number {
  let run = 0;
  for (let i = 0; i < CORNERS.length - 1; i += 1) {
    const a = CORNERS[i];
    const b = CORNERS[i + 1];
    if (onSegment(p, a, b)) return run + Math.abs(p.x - a.x) + Math.abs(p.y - a.y);
    run += Math.abs(b.x - a.x) + Math.abs(b.y - a.y);
  }
  throw new Error(`alongStair: (${p.x}, ${p.y}) is not on the staircase.`);
}

/**
 * The stretch of staircase between two points on it, as one `<path>` `d`.
 *
 * @throws when either point is off the figure, or when `to` does not climb above
 *         `from` — a stretch drawn backwards would still render, as a highlight
 *         over the wrong steps.
 */
export function stairPathBetween(from: Point, to: Point): string {
  const start = alongStair(from);
  const end = alongStair(to);
  if (end <= start + EPSILON) {
    throw new Error(
      `stairPathBetween: (${to.x}, ${to.y}) does not climb above (${from.x}, ${from.y}) — ` +
        `a stretch of this staircase runs one way.`,
    );
  }
  const corners = CORNERS.filter((corner) => {
    const at = alongStair(corner);
    return at > start + EPSILON && at < end - EPSILON;
  });
  return [
    `M ${from.x} ${from.y}`,
    ...corners.map((corner) => `L ${corner.x} ${corner.y}`),
    `L ${to.x} ${to.y}`,
  ].join(" ");
}

/** L1's left end up to L4's right end — the part of the ladder that is drawn as
 *  built. */
export const STAIR_PATH_EARNED: string = stairPathBetween(
  anchorPoint({ on: "tread", rung: 0, t: 0 }),
  anchorPoint({ on: "tread", rung: EARNED_THROUGH_RUNG, t: 1 }),
);

/** The last riser and L5's tread — drawn dashed. See {@link EARNED_THROUGH_RUNG}. */
export const STAIR_PATH_UNEARNED: string = stairPathBetween(
  anchorPoint({ on: "tread", rung: EARNED_THROUGH_RUNG, t: 1 }),
  anchorPoint({ on: "tread", rung: RUNG_COUNT - 1, t: 1 }),
);

// ───────────────────── the annotation slots ─────────────────────
// Three regions the treads and their labels leave empty, measured against the
// geometry above rather than eyeballed. A fourth would have to be argued for.

/**
 * Both marker chips hang from ONE shelf, 20px clear of the top tread.
 *
 * BOTTOM-ALIGNED, not top-aligned: the two chips are different heights (the
 * asserted one is a label and a source; the open one is a label, a question and
 * its evidence) and the slide's whole claim is that they differ by FORM. Sharing
 * a baseline says "same kind of object, read them side by side"; sharing a top
 * edge would make the height difference the loudest difference on the slide.
 */
export const CHIP_SHELF = 308;

/** The left slot — the OPEN marker. Its leader drops to L2's tread at x=418,
 *  which is inside this box, so the tether leaves the chip's own underside. */
export const OPEN_SLOT = { left: 48, width: 380 } as const;

/**
 * The middle slot — the tech function: an asserted chip, or the stated absence
 * where a brand has nothing to place. ONE SLOT FOR BOTH, so "the space is never
 * left blank" is a property of the layout and not of remembering to fill it.
 *
 * 284 WIDE AND NOT 360, because the aside now stands on L4's step at x=758 and the
 * two must not share a column: the chip is a bordered box and the aside is bare
 * text, so an overlap reads as the aside being a caption of the claim above it —
 * which is the one thing this ladder's three registers exist to prevent. The
 * citation takes a third line instead. That is the trade, stated.
 */
export const TECH_SLOT = { left: 456, width: 284 } as const;

/**
 * The aside's box, STANDING ON L4's STEP — bottom-aligned 12px above that tread.
 *
 * ABOVE THE TREAD AND NOT BESIDE THE RISER, which was the first cut and the wrong
 * one: right-aligned into the riser put this text at the riser's own height, and
 * L4's rung name hangs at that same height 20px to the right — so the mark landed
 * in the channel between them and read as L4's bullet point. Above the tread, THE
 * TREAD ITSELF SEPARATES THEM: the aside stands on the step and L4's label hangs
 * under it, which is also the honest picture of what a placement on a staircase
 * is.
 *
 * IT REACHES LEFT PAST THE RISER (x=692, where the first cut started at 758), and
 * that is what the owner's arrow bought: a bordered box needs a tether that leaves
 * its own edge, and every straight run from x>748 to the L3–L4 riser has to cross
 * either L4's tread or L4's rung label. Left of the riser the band between the two
 * treads is empty, so the leader drops out of this box's underside into it and
 * turns once. The chip above ends at x=740 and 20px higher, so nothing shares the
 * pocket.
 *
 * BOTTOM-ALIGNED and not top-pinned: the box grew a border and padding with the
 * arrow, and pinning its top would have pushed its underside onto L4's tread the
 * first time the note wrapped.
 *
 * RIGHT EDGE AT 958: L5's rung label starts at x=978, so the pocket ends 20px
 * short of it.
 */
export const ASIDE_SLOT = { left: 692, bottom: 372, width: 266 } as const;

/**
 * The aside's leader — the one diagram element on this slide that is an ARROW.
 *
 * TWO SEGMENTS AND ONE TURN, both axis-aligned like everything else on the figure:
 * down out of the box's underside at `x`, then right along the riser's own height
 * to an arrowhead that stops `tipGap` short of it. The turn is what keeps it clear
 * of L4's tread — a straight run from the box to the riser would cross the step it
 * is pointing under.
 *
 * `x` sits 12px inside the box's left edge, so the drop reads as leaving the box
 * rather than as passing beside it.
 */
export const ASIDE_LEADER = { x: ASIDE_SLOT.left + 12, tipGap: 8 } as const;

/**
 * The gap's label, in the crook above L2's tread.
 *
 * THE ONE POCKET THE FIGURE LEAVES INSIDE THE LIT STRETCH ITSELF, which is why
 * the tag goes here rather than beside the closer: it names the thing directly
 * under it. Bounded by L2's tread (y=496) below, L2's rung label (y=506) after
 * that, and the open marker's leader (x=198, under L1's chip) to the left.
 *
 * 120 WIDE AND NOT 180, which is what the pocket had while the L2–L3 riser at
 * x=528 was its only right-hand bound. A brand can now assert a mark ON L2 — Berau
 * does — and that mark's leader drops through this band on its way to the tread. The
 * tag holds two words of 10px mono, which is ≈64px, so the extra 60 was slack that
 * a leader had to dodge: the box gives it back and the leader lands at x=473 with a
 * clear channel either side. It is still a POCKET and not a column — the width is
 * what the words need, and a longer label would have to argue for the space.
 */
export const GAP_TAG_SLOT = { left: 326, top: 458, width: 120 } as const;

/**
 * WHERE A TWO-LINE RUNG LABEL ENDS, measured from the type that draws it rather
 * than eyeballed off a screenshot.
 *
 * The block starts 10px under its tread and is a 19px display line at 1.15, then
 * 4px, then two 11.5px sans lines at 1.3 — which is the shape L1's own definition
 * takes and the deepest of the five. Written as that sum and not as `618`, so a
 * type change moves the thing that lines up with it.
 */
const RUNG_LABEL_DEPTH = 10 + 19 * 1.15 + 4 + 2 * (11.5 * 1.3);

/** The floor the lowest rung's definition reaches — L1's, and the deck's lowest
 *  line of body copy on this stage. */
export const RUNG_LABEL_FLOOR = TREADS[0].y + RUNG_LABEL_DEPTH;

/**
 * The closer, in the floor the top of the staircase leaves empty.
 *
 * ON ONE LINE AND ON L1's BASELINE (owner, 2026-08-13). It used to sit at y=500 in
 * a 476px column and wrap to two right-aligned lines, which put the deck's one
 * reframe in a ragged block floating level with L3's rung label — two sentences
 * reading as four fragments. Bottom-aligned to {@link RUNG_LABEL_FLOOR} it lands on
 * the same baseline as L1's definition, so the stage closes on one horizontal:
 * the lowest rung on the left, the sentence about the whole ladder on the right.
 *
 * `left: 340` is what one line costs. At this height the only thing on the stage is
 * L1's label (x=98…298), so the column runs from just past it to the right margin —
 * 892px, against ≈700 the longest brand's closer needs at 20px.
 */
export const CLOSER_SLOT = { left: 340, right: 48, bottom: RUNG_LABEL_FLOOR } as const;

/** How far short of its dot a leader line stops, so the tether and the dot read
 *  as two marks rather than one blob. */
export const LEADER_GAP = 10;
