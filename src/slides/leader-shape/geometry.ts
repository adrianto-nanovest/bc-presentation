// The hub and its six spokes, as numbers — stage coordinates for a 1280×720 stage.
//
// Spec §7.1 settled the ARRANGEMENT (hub-and-spokes holds at projection
// distance; the ledger stack and the two-column spine are dead) and recorded ONE
// open risk against it: "the lowest satellite sits at y ≈ 620 … close to the
// NavBar hover zone, and it grows on focus. Re-check clearance when rebuilt."
// This module is that re-check, done in numbers rather than by eye, which is why
// the ellipse is re-cut here instead of copied from
// `src/slides/prototype-gh16-leader-slides/pillars-a-orbit.tsx`.
//
// THE PROTOTYPE'S NUMBERS FAIL, and by how much: `HUB.y = 430`, `RY = 190`,
// `SAT_H = 76` put the lowest pillar's centre at y = 620 and its box bottom at
// y = 658 — 26px INSIDE the hover band that starts at {@link NAV_ZONE_TOP}. On a
// projector that is a pillar a presenter cannot point at without the NavBar
// fading up over it, and the box GROWS when the next ticket's focus walk reaches
// it. So the ellipse was flattened and lifted.
//
// THE VERTICAL BUDGET, and why these numbers and not rounder ones:
//
//   · THE FLOOR. `.nav-zone` is `bottom: 0; height: 88px` (`src/styles/globals.css`),
//     so the hover band's top edge is y = 632. The lowest pillar's box bottom is
//     {@link LOWEST_PILLAR_BOTTOM} = 610, which leaves {@link NAV_ZONE_CLEARANCE}
//     = 22px — of which {@link FOCUS_GROWTH_RESERVE} is spoken for by a walk this
//     ticket does not render. `HUB.y = 400` and `RY = 174` are the pair that lands
//     the bottom box exactly on that floor; 406/178 would land it at 620 and spend
//     the reserve.
//   · THE CEILING. `.slide-headline-row` is at `top: 80px` and a `.slide-headline.small`
//     is 40px on 1.05 line-height, so a one-line headline ends at y ≈ 122, and the
//     kicker under it (one line of 11px mono) ends at y ≈ 147. The highest pillar's
//     box top is 190, so the figure never reaches either.
//   · THE LABEL IS INSIDE ITS BOX — icon over label, both centred in the
//     196×72 rectangle — so the box bottom governs the label bottom too and the
//     floor above is ONE number rather than two that can disagree. That is a
//     layout decision recorded here because the alternative (a label hung under
//     the box, as the capability ladder hangs its rung names) would put 20px of
//     type below y = 610 and re-enter the band this module exists to stay out of.
//
// THE HORIZONTAL BUDGET. `RX = 280` and a 196-wide box put the outermost box
// edges at 49.5 and 730.5: inside the deck's 48px side margin on the left, and
// clear of {@link WALK_COLUMN_LEFT} on the right by 33.5px. Those two are the
// same constraint from both ends — the figure has to fit BETWEEN the margin and
// the column the next ticket writes into, and 280 is the widest ellipse that
// does. Changing `HUB.x` alone breaks one end or the other.
//
// Pure data and pure functions. No React, no DOM, no work at module scope beyond
// deriving the ring — importable from a node test.

/** A point on the stage. */
export interface Point {
  x: number;
  y: number;
}

// ───────────────────── the stage's own edges ─────────────────────
// Not this figure's numbers — the deck's, restated here as the constraints the
// figure was measured against. Each one is sourced, because a figure that fails
// against a number nobody wrote down fails silently.

/** The deck's side margin — `.fig-label`, `.slide-headline-row` and
 *  `.slide-content` all sit at `left: 48px` in `src/styles/globals.css`. */
export const SIDE_MARGIN = 48;

/**
 * The top edge of the NavBar's HOVER ZONE — the line this figure may not cross.
 *
 * `720 − 88`: `.nav-zone` in `src/styles/globals.css` is
 * `position: absolute; bottom: 0; height: 88px`, and the band is a hover target
 * whether or not the bar inside it is currently at opacity 0. Content under it
 * is content the presenter's own pointer makes the chrome fade up over.
 *
 * NOT 660 or 648. Those are the numbers `E12Primitives` measured and
 * `src/slides/leader-gap/geometry.ts` reuses — an approximation of the same band
 * plus its own margin. This module reads the CSS rule instead, because the
 * prototype's failure here was 26px and an approximate floor cannot tell a 22px
 * pass from a 26px fail.
 */
export const NAV_ZONE_TOP = 632;

/**
 * Where the standing kicker sits — the band between the headline and the figure.
 *
 * 134, the same line `src/slides/leader-gap/geometry.ts` hangs its provenance
 * from, and for the same arithmetic: `.slide-headline-row` is at `top: 80px` and a
 * one-line `.slide-headline.small` is 40px on 1.05 line-height, so the headline
 * ends at y ≈ 122 and 134 clears it by 12.
 */
export const KICKER_TOP = 134;

/**
 * The highest y the figure may start at: 152.
 *
 * {@link KICKER_TOP} plus one line of 11px mono (≈14px at the deck's default
 * line-height) puts the kicker's last pixel at ≈148, rounded up to a clear line.
 * The ceiling half of the vertical budget, stated as a number so the test can
 * hold the ring to it — the top pillar's box top is 190, 38px under it, and an
 * ellipse raised to close that gap would have to lower its bottom.
 */
export const FIGURE_CEILING = 152;

/**
 * The left edge of the column the figure leaves empty.
 *
 * RESERVED, NOT USED — this ticket ships the slide at its resting pose and
 * renders nothing here. §6.6 spends the space the HR original's
 * Specify → Generate → Verify panel used on a focus walk that names the leader's
 * decision in each pillar, and §7.1 records WHY it has to be this column: the
 * bottom strip is occupied by the lowest pillar and cannot hold a second line of
 * type. The number is the prototype's own panel left edge, kept so the figure
 * rebuilt here fits the panel that was drawn beside it.
 */
export const WALK_COLUMN_LEFT = 764;

// ───────────────────── the figure ─────────────────────

/**
 * The hub — "The Enabler", and the centre of the whole argument.
 *
 * `y = 400` is 40px above the stage's own centre line, which is what buys the
 * bottom pillar its clearance without flattening the ellipse so far that the
 * six pillars stop reading as a ring. `r = 66` is the prototype's, unchanged:
 * the disc has to hold a mono label over a 19px display line and nothing about
 * the re-cut made it hold more.
 */
export const HUB = { x: 390, y: 400, r: 66 } as const;

/**
 * The ellipse the pillars sit on. Wider than tall, and deliberately so.
 *
 * A CIRCLE (rx = ry) IS THE OBVIOUS SHAPE AND IT DOES NOT FIT. At `r = 280` the
 * lowest box bottom would be at 716 — off the stage; at the `r = 174` the floor
 * allows, the ring collapses to 348 wide and the six 196-wide boxes overlap. A
 * 16:9 stage has horizontal room and no vertical room, so the ring takes the
 * shape of the space it is in.
 */
export const RING = { rx: 280, ry: 174 } as const;

/**
 * One pillar's box. 196×72 — the prototype's width, 4px off its height.
 *
 * The height is what pays for the clearance: 76 would put the bottom box at 612
 * and, once the walk scales it, inside {@link FOCUS_GROWTH_RESERVE}. 72 holds a
 * 22px icon over the label with 8px of padding, and it holds it with room for the
 * label to WRAP TO TWO LINES even though today it does not: the longest label,
 * "Process & Methodology", measures ≈169px in the 174px the box leaves it and so
 * renders on one line, with ≈5px of slack. That slack is the reason the height is
 * specified for two lines rather than the one it currently draws — a font fallback
 * that renders 3% wider wraps it, and a box cut to fit one line would clip on the
 * projector instead of growing downward into the clearance.
 */
export const PILLAR_BOX = { w: 196, h: 72 } as const;

/**
 * Six, and the ring is divided by it.
 *
 * THE COUNT IS HR p4's, not a layout choice — the six pillars are the slide's
 * subject and `./content.ts` names them. It is stated here because the ring's
 * angles are computed from it and nothing else in this module could derive it;
 * `tests/unit/shape-agentic-org.test.tsx` holds the two halves together, so a
 * seventh pillar in the content cannot quietly land on top of the first.
 */
export const PILLAR_COUNT = 6;

/** How far short of the box edge — and of the hub's disc — a spoke stops, so
 *  the tether and the thing it tethers read as two marks and not one. */
export const SPOKE_STANDOFF = 6;

/**
 * The floor the ray-to-rectangle crossing divides by.
 *
 * Pillars 0 and 3 sit exactly above and below the hub, where the ray is vertical
 * and its HORIZONTAL crossing is at infinity. In IEEE floats `Math.cos(-π/2)` is
 * 6.1e-17 rather than a clean 0, so the crossing comes out ≈1.6e18 — astronomically
 * far, and correctly discarded by the `Math.min` in {@link spokeSegment}, which is
 * why the figure has always drawn right. This clamp is therefore not load-bearing
 * for the six angles the ring actually uses; it is here so the division can never
 * see a true zero and hand `Math.min` an `Infinity` if `PILLAR_COUNT` ever changes
 * to one that lands a cosine exactly on 0.
 */
const AXIS_EPSILON = 1e-9;

/**
 * The six pillar centres, indexed by RING ORDER (`./content.ts`'s array order).
 *
 * The first pillar sits at TWELVE O'CLOCK (−90°) and the rest run clockwise, so
 * index 0 is the top of the ring and index 3 its bottom. That matters twice: the
 * ring order is the focus walk's teaching order (see `./content.ts`), so the
 * walk will step around the ring rather than jump across it, and the LOWEST box
 * — the one the floor budget is about — is therefore a derived index and not a
 * literal 3 (see {@link LOWEST_PILLAR_INDEX}).
 */
export const PILLAR_CENTRES: readonly Point[] = Array.from(
  { length: PILLAR_COUNT },
  (_unused, i) => {
    const theta = (i * 2 * Math.PI) / PILLAR_COUNT - Math.PI / 2;
    return {
      x: HUB.x + Math.cos(theta) * RING.rx,
      y: HUB.y + Math.sin(theta) * RING.ry,
    };
  },
);

/**
 * Where pillar `i` sits.
 *
 * @throws on an index the ring does not have. A seventh pillar wrapped back onto
 *         the first would render as five pillars and one that looks emphasised —
 *         which is exactly the state §7.1 forbids at rest, arriving by accident.
 */
export function pillarCentre(i: number): Point {
  const centre = PILLAR_CENTRES[i];
  if (!centre) {
    throw new Error(
      `pillarCentre: no pillar ${i} — the ring has ${PILLAR_COUNT} ` +
        `(0…${PILLAR_COUNT - 1}).`,
    );
  }
  return centre;
}

/** One pillar's box edges, in stage coordinates. The box is CENTRED on its
 *  point, which is what the renderer's `translate(-50%, -50%)` does. */
export interface Box {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

/** Pillar `i`'s box. Derived from its centre, so a box and its spoke can never
 *  disagree about where the pillar is. */
export function pillarBox(i: number): Box {
  const { x, y } = pillarCentre(i);
  return {
    left: x - PILLAR_BOX.w / 2,
    right: x + PILLAR_BOX.w / 2,
    top: y - PILLAR_BOX.h / 2,
    bottom: y + PILLAR_BOX.h / 2,
  };
}

/**
 * Which pillar is lowest on the stage — SCANNED, not assumed.
 *
 * The floor budget is about whichever box sits closest to the NavBar band, and
 * on today's ring that is index 3. Reading it off the geometry means re-cutting
 * the ellipse — a different `PILLAR_COUNT`, a rotated ring — moves the budget
 * with it instead of leaving {@link NAV_ZONE_CLEARANCE} measuring the wrong box.
 */
export const LOWEST_PILLAR_INDEX: number = PILLAR_CENTRES.reduce(
  (lowest, centre, i) => (centre.y > PILLAR_CENTRES[lowest].y ? i : lowest),
  0,
);

/** The bottom edge of the lowest pillar's box — 610 on today's ring, and the one
 *  number the floor budget is spent on. */
export const LOWEST_PILLAR_BOTTOM: number = pillarBox(LOWEST_PILLAR_INDEX).bottom;

/**
 * How much stage is left between the figure and the NavBar's hover band: 22px.
 *
 * `632 − 610`, derived from {@link NAV_ZONE_TOP} and the ring above rather than
 * typed — so an edit that lowers `HUB.y` or grows `RING.ry` moves this number and
 * `tests/unit/shape-agentic-org.test.tsx` fails on it, which is the whole point
 * of the constant. §7.1's recorded risk was that the prototype's equivalent
 * number is NEGATIVE (632 − 658 = −26) and that nothing in the prototype said so.
 *
 * MUST STAY GREATER THAN {@link FOCUS_GROWTH_RESERVE}, not merely positive: the
 * lowest pillar is one of the six the next ticket's walk focuses, and a focused
 * pillar is bigger than a resting one.
 */
export const NAV_ZONE_CLEARANCE: number = NAV_ZONE_TOP - LOWEST_PILLAR_BOTTOM;

/**
 * How much of {@link NAV_ZONE_CLEARANCE} the next ticket is allowed to spend: 8px.
 *
 * NOTHING THIS TICKET RENDERS USES IT, and it is here anyway, because the
 * clearance above is only honest if it holds at the pose the slide will grow
 * into. §7.1 settles that the focused pillar GAINS light — copper fill, a
 * thickened spoke, a halo — and the prototype expressed part of that as a 1.07
 * scale on the box. On a 72px box that scale drops the bottom edge by
 * `72 × 0.07 ÷ 2 = 2.52px`, and the prototype's halo (`box-shadow 0 0 0 4px`)
 * adds 4 more: 6.52px, rounded up to 8 so the next author has a whole number to
 * spend and 14px still under it.
 *
 * The focus pose is not this ticket's to build. The HEADROOM for it is, because
 * a resting figure measured to the pixel against the wrong pose is a figure that
 * passes review and fails on a projector one ticket later.
 */
export const FOCUS_GROWTH_RESERVE = 8;

/** One spoke, box edge → disc edge. */
export interface Spoke {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

/**
 * The spoke joining pillar `i` to the hub, trimmed at both ends.
 *
 * CENTRE-TO-CENTRE IS WRONG TWICE OVER: the line would run under the box, where
 * the box's own fill hides it, and it would end inside the hub's disc, where the
 * disc hides it — so both ends of a spoke drawn honestly are invisible and the
 * visible middle looks like a line that stops for no reason. This trims to the
 * rectangle's boundary along the ray (the `min` of the two axis crossings, which
 * is exact for a rectangle) and to the disc's edge, then backs both ends off by
 * {@link SPOKE_STANDOFF}.
 *
 * @throws through {@link pillarCentre} on an index the ring does not have.
 */
export function spokeSegment(i: number): Spoke {
  const { x, y } = pillarCentre(i);
  // The ray from the pillar TOWARD the hub. Both ends are then measured along
  // it, so a spoke is one direction and not two half-guesses.
  const angle = Math.atan2(HUB.y - y, HUB.x - x);
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  // The two axis crossings; the nearer one is where the ray leaves the rectangle,
  // which is exact for a rectangle. See {@link AXIS_EPSILON} for what the clamp is
  // and is not doing — for the ring's own six angles the far term is ≈1.6e18 and
  // `Math.min` throws it away on its own.
  const toBoxEdge =
    Math.min(
      PILLAR_BOX.w / 2 / Math.max(Math.abs(cos), AXIS_EPSILON),
      PILLAR_BOX.h / 2 / Math.max(Math.abs(sin), AXIS_EPSILON),
    ) + SPOKE_STANDOFF;
  const toDiscEdge = HUB.r + SPOKE_STANDOFF;
  return {
    x1: x + cos * toBoxEdge,
    y1: y + sin * toBoxEdge,
    x2: HUB.x - cos * toDiscEdge,
    y2: HUB.y - sin * toDiscEdge,
  };
}
