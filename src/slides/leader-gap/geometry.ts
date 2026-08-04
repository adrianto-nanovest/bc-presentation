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
// deriving the path string — importable from a node test.

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
 * The staircase as one `<path>` — tread, riser, tread, riser, …
 *
 * ONE PATH AND NOT NINE SEGMENTS, because the draw-in is a single
 * `stroke-dashoffset` sweep: nine elements would each draw over their own
 * length in the same time and the staircase would assemble in nine places at
 * once instead of climbing.
 */
export const STAIR_PATH: string = TREADS.reduce(
  (d, tread, i) => `${d} H ${tread.x2}${i < TREADS.length - 1 ? ` V ${TREADS[i + 1].y}` : ""}`,
  `M ${TREADS[0].x1} ${TREADS[0].y}`,
);

/**
 * Where a marker attaches to the staircase.
 *
 * A UNION AND NOT A FRACTIONAL RUNG INDEX. The prototype took `at: number` and
 * interpolated between tread CENTRES, which on a staircase puts every fractional
 * marker in mid-air — `at: 0.4` landed 26px above the L1 tread, touching nothing.
 * A staircase has exactly two places a marker can honestly sit: on a tread, or on
 * the riser between two treads. This says which, and "between L1 and L2" then
 * means a point that is actually on the figure.
 */
export type Anchor =
  | { readonly on: "tread"; readonly rung: number }
  /** The riser rising OUT OF rung `below` — `below: 0` is the L1–L2 riser. */
  | { readonly on: "riser"; readonly below: number };

export interface Point {
  x: number;
  y: number;
}

/**
 * The point on the staircase an anchor names.
 *
 * @throws on a rung index the ladder does not have, or on a riser above the top
 *         tread. A marker silently clamped to L5 is a marker making a claim
 *         nobody authored, and it would look deliberate.
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
    return { x: (tread.x1 + tread.x2) / 2, y: tread.y };
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

/** The right slot — the tech function: an asserted chip, or the stated absence
 *  where a brand has nothing to place. ONE SLOT FOR BOTH, so "the space is never
 *  left blank" is a property of the layout and not of remembering to fill it. */
export const TECH_SLOT = { left: 456, width: 360 } as const;

/** The aside's two lines, right-aligned so they read INTO the L1–L2 riser its dot
 *  sits on. It gets no leader at all — see `./components/CapabilityLadder.tsx`. */
export const ASIDE_SLOT = { right: 1280 - 298, top: 448, width: 238 } as const;

/** The closer, in the floor the top of the staircase leaves empty. Right-aligned,
 *  and it starts 18px clear of L3's label (which ends at x=738). */
export const CLOSER_SLOT = { left: 756, right: 48, top: 500 } as const;

/** How far short of its dot a leader line stops, so the tether and the dot read
 *  as two marks rather than one blob. */
export const LEADER_GAP = 10;
