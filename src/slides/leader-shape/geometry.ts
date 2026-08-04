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
// fading up over it, and the box GROWS when the focus walk reaches it — on the
// prototype's own 76px box, `76 × 0.07 ÷ 2 + 4 = 6.66` more, so its real worst
// number is −32.66 (see {@link FOCUS_GROWTH_SPENT} for the same arithmetic on the
// 72px box this module ships). So the ellipse was flattened and lifted.
//
// THE VERTICAL BUDGET, and why these numbers and not rounder ones:
//
//   · THE FLOOR. `.nav-zone` is `bottom: 0; height: 88px` (`src/styles/globals.css`),
//     so the hover band's top edge is y = 632. The lowest pillar's box bottom is
//     {@link LOWEST_PILLAR_BOTTOM} = 610, which leaves {@link NAV_ZONE_CLEARANCE}
//     = 22px — of which the focus walk was reserved {@link FOCUS_GROWTH_RESERVE}
//     and spends {@link FOCUS_GROWTH_SPENT}, leaving
//     {@link FOCUSED_NAV_ZONE_CLEARANCE} = 15.48px at the pose that grows the
//     bottom box. `HUB.y = 400` and `RY = 174` are the pair that lands
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
// the column the walk writes into ({@link WALK_COLUMN}), and 280 is the widest
// ellipse that does. Changing `HUB.x` alone breaks one end or the other.
//
// Pure data and pure functions. No React, no DOM, and the only work at module scope
// is derivation: the ring's six centres, the same six grown to their focused size,
// and the two clearance budgets read off them — importable from a node test.

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
 * The left edge of the column the WALK WRITES INTO: 764.
 *
 * THIS IS WHERE THE FOCUS WALK PRINTS, and it is no longer reserved space. §6.6
 * spends the room the HR original's Specify → Generate → Verify panel used on a
 * walk that names the leader's decision in each pillar; this edge is where that
 * column starts, {@link WALK_COLUMN} is the whole slot derived from it, and the
 * ring was cut to stop 33.5px short of it (see the horizontal budget at the top of
 * this file). The figure and the column are one budget read from both ends.
 *
 * AND THE CLOSER IS HERE TOO, NOT ALONG THE BOTTOM — §7.1's recorded layout risk,
 * which survives intact and is now quantified. The bottom strip is OCCUPIED by the
 * lowest pillar ({@link LOWEST_PILLAR_BOTTOM} = 610 against a floor of
 * {@link NAV_ZONE_TOP} = 632) and that same pillar GROWS when the walk focuses it,
 * by {@link FOCUS_GROWTH_SPENT}. A closer set under the figure would therefore sit
 * either inside the NavBar's hover band or under the sixth beat's own halo. The
 * column the walk has just finished with is empty at exactly the pose the closer
 * needs it, so the closer takes it.
 *
 * The number is the prototype's own panel left edge, kept so the figure rebuilt
 * here fits the panel that was drawn beside it.
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
 * lowest pillar is one of the six the walk focuses, and a focused pillar is bigger
 * than a resting one — {@link FOCUSED_NAV_ZONE_CLEARANCE} is what is left once it is.
 */
export const NAV_ZONE_CLEARANCE: number = NAV_ZONE_TOP - LOWEST_PILLAR_BOTTOM;

/**
 * How much of {@link NAV_ZONE_CLEARANCE} the focus walk is allowed to spend: 8px.
 *
 * BUDGETED ONE TICKET BEFORE IT WAS SPENT, AND NOW IT IS SPENT. §7.1 settles that
 * the focused pillar GAINS light — copper fill, a thickened spoke, a halo — and the
 * prototype expressed part of that as a 1.07 scale on the box. On a 72px box that
 * scale drops the bottom edge by `72 × 0.07 ÷ 2 = 2.52px`, and the prototype's halo
 * (`box-shadow 0 0 0 4px`) adds 4 more: 6.52px, rounded UP to 8 so the author of
 * the walk had a whole number to spend and the estimate could only be generous.
 *
 * WHAT THE WALK ACTUALLY SPENT is {@link FOCUS_GROWTH_SPENT} = 6.52 of the 8
 * reserved, which leaves {@link FOCUSED_NAV_ZONE_CLEARANCE} = 15.48px between the
 * focused bottom pillar and the hover band. The two invariants a test holds are
 * `FOCUS_GROWTH_SPENT <= FOCUS_GROWTH_RESERVE` — the estimate was not exceeded —
 * and `FOCUSED_LOWEST_PILLAR_BOTTOM < NAV_ZONE_TOP`, which is the claim §7.1 asked
 * for and the one that survives if the reserve is ever re-estimated.
 *
 * THE CONSTANT AND ITS 8 STAY, now that the real figure is 6.52. It is the CEILING
 * a later edit has to fit under — a heavier halo, a larger scale, a focused label
 * hung below the box — and the estimate is the only thing that says how much room
 * such an edit has WITHOUT re-deriving the ring. Deleting it because the spend came
 * in low would leave the next author measuring against 22px of resting clearance
 * that the focused pose does not have.
 */
export const FOCUS_GROWTH_RESERVE = 8;

// ───────────────────── the focus pose, measured ─────────────────────
// §7.1 asked one question about this figure — "the lowest satellite … grows on
// focus. Re-check clearance when rebuilt." — and it is answered here, in numbers,
// at the FOCUSED pose rather than the resting one. `./walk.ts` says which poses
// reach it; these say what it costs in stage space when they do.

/**
 * How much bigger a focused pillar's box is: ×1.07.
 *
 * THE PROTOTYPE'S VALUE, kept for two reasons and not one. It is what the owner
 * approved with variant A on a browser walkthrough, and it is the number
 * {@link FOCUS_GROWTH_RESERVE} was budgeted against — so changing it is not a taste
 * edit, it is a re-spend of the floor budget. 1.1 would cost 7.6 of the 8 reserved
 * and still fit; 1.15 costs 9.4 and does not.
 *
 * A TRANSFORM AND NOT A LAYOUT CHANGE, which is why a scale is the right primitive:
 * growing `PILLAR_BOX.w`/`.h` on one pillar would re-wrap that pillar's label at
 * exactly the moment the room is looking at it, and the box is placed by
 * `translate(-50%, -50%)` (see `./components/PillarOrbit.tsx`) so the scale composes
 * onto the transform that already centres it.
 *
 * IT GROWS ABOUT THE CENTRE, so only HALF the vertical growth travels toward the
 * floor — which is the `÷ 2` in {@link FOCUS_GROWTH_SPENT} and the reason a 7%
 * scale on a 72px box costs 2.52px at the bottom edge rather than 5.04.
 */
export const FOCUS_SCALE = 1.07;

/**
 * The focused box's halo, in px: 4 — the prototype's `box-shadow 0 0 0 4px`.
 *
 * A SPREAD, NOT A BLUR, which is why it is an exact number and not an estimate:
 * `0 0 0 4px` is no offset, no blur and a 4px spread, so the shadow paints a copper
 * ring exactly 4px outside the box's own edge on every side and the focused pillar's
 * lowest PAINTED pixel is 4 below its scaled bottom edge. A blurred shadow would
 * fade out over a distance nobody can put a number on, which is the other reason
 * this figure's halo is a hard ring.
 *
 * AND `getBoundingClientRect` DOES NOT SEE IT. A box-shadow is outside the box
 * model entirely — it affects no layout and no bounding rect — while a transform
 * scale IS reflected in the rect a browser returns. So a rendered measurement of the
 * focused pillar reports the scaled box and stops there, and would report a
 * clearance 4px larger than the projector shows. That is precisely how a halo lands
 * inside the NavBar's band with a passing measurement, so the halo is a NAMED
 * CONSTANT added by hand in {@link FOCUS_GROWTH_SPENT} rather than something a
 * browser check picks up on its own.
 */
export const FOCUS_HALO_WIDTH = 4;

/**
 * What the focused pose costs at the bottom edge: 6.52px.
 *
 * `72 × 0.07 ÷ 2 + 4` — half the scale's growth, because the box scales about its
 * own centre and only the downward half travels toward the floor, plus the WHOLE
 * halo, because the ring is painted outside the scaled edge and is invisible to
 * every layout measurement (see {@link FOCUS_HALO_WIDTH}).
 *
 * DERIVED, NEVER TYPED, like {@link NAV_ZONE_CLEARANCE} above it: a literal 6.52
 * would survive an edit to the scale, the halo or the box height and be wrong at
 * all three, silently, in the one number the floor budget is spent from.
 *
 * IN IEEE FLOATS IT IS 6.520000000000002, not a clean 6.52 — `1.07 - 1` is
 * `0.07000000000000006`. A test that pins the value must use `toBeCloseTo`; the
 * assertions that hold to the bit are the RELATIONS
 * (`FOCUSED_LOWEST_PILLAR_BOTTOM === LOWEST_PILLAR_BOTTOM + FOCUS_GROWTH_SPENT`) and
 * the inequality against {@link FOCUS_GROWTH_RESERVE}, which is what the budget
 * actually claims.
 */
export const FOCUS_GROWTH_SPENT: number =
  (PILLAR_BOX.h * (FOCUS_SCALE - 1)) / 2 + FOCUS_HALO_WIDTH;

/**
 * The lowest pillar's bottom edge AT THE POSE THAT FOCUSES IT: 616.52.
 *
 * §7.1's re-check, done against the pose that is actually at risk. Pillar
 * {@link LOWEST_PILLAR_INDEX} is one of the six the walk focuses — the walk visits
 * all six, one beat each (`./walk.ts`) — so this pose is reached in front of a room
 * and is not a hypothetical worst case.
 *
 * THE HALO IS INSIDE THIS NUMBER even though no rendered measurement can see it,
 * which is what makes this the honest bottom edge rather than the measurable one.
 */
export const FOCUSED_LOWEST_PILLAR_BOTTOM: number =
  LOWEST_PILLAR_BOTTOM + FOCUS_GROWTH_SPENT;

/**
 * What is left between the FOCUSED bottom pillar and the NavBar's hover band:
 * 15.48px.
 *
 * `632 − 616.52`, and the answer to the only risk §7.1 recorded against this
 * figure: the ring clears the band at its WORST pose, not merely at rest. The
 * resting {@link NAV_ZONE_CLEARANCE} is 22, the walk spends 6.52 of it, and 15.48
 * is what a presenter's pointer has to work with under the lit pillar.
 *
 * THE PROTOTYPE'S EQUIVALENT IS −26 AT REST AND −32.66 ONCE ITS OWN 76px BOX IS
 * FOCUSED (`76 × 0.07 ÷ 2 + 4`), and nothing in the prototype said so — which is why
 * this module derives both poses instead of one.
 *
 * MUST STAY POSITIVE, and that is the assertion worth writing: in floats this reads
 * 15.480000000000018, so pin it with `toBeCloseTo` or, better, as
 * `FOCUSED_LOWEST_PILLAR_BOTTOM < NAV_ZONE_TOP`.
 */
export const FOCUSED_NAV_ZONE_CLEARANCE: number =
  NAV_ZONE_TOP - FOCUSED_LOWEST_PILLAR_BOTTOM;

/**
 * Pillar `i`'s box AT ITS FOCUSED POSE — the resting box grown by
 * {@link FOCUS_SCALE} about its own centre, then by {@link FOCUS_HALO_WIDTH} on
 * every side.
 *
 * THE HALO IS PART OF THE BOX HERE and is part of no browser measurement anywhere:
 * a `box-shadow` spread is outside `getBoundingClientRect`, so the rendered figure
 * cannot tell anyone where its own outer edge is (see {@link FOCUS_HALO_WIDTH}).
 * This function is the only place that edge exists, which is why the horizontal
 * budget below is derived from it rather than from a screenshot.
 *
 * @throws through {@link pillarCentre} on an index the ring does not have.
 */
export function focusedPillarBox(i: number): Box {
  const { x, y } = pillarCentre(i);
  const halfW = (PILLAR_BOX.w * FOCUS_SCALE) / 2 + FOCUS_HALO_WIDTH;
  const halfH = (PILLAR_BOX.h * FOCUS_SCALE) / 2 + FOCUS_HALO_WIDTH;
  return { left: x - halfW, right: x + halfW, top: y - halfH, bottom: y + halfH };
}

/** Every pillar at its focused pose — scanned once, so the two extremes below can
 *  never be read off a hand-picked index. */
const FOCUSED_BOXES: readonly Box[] = Array.from(
  { length: PILLAR_COUNT },
  (_unused, i) => focusedPillarBox(i),
);

/**
 * The leftmost pixel the figure ever paints: 38.65 — which is 9.35px INSIDE the
 * deck's 48px side margin, and that is a deviation this module states rather than
 * hides.
 *
 * IT IS FORCED, NOT CHOSEN, and the arithmetic is what says so. The resting box of
 * the two outermost pillars starts at 49.5 (see the horizontal budget at the top of
 * this file), so the figure has **1.5px** of margin slack. §7.1 settles that the
 * focused pillar GAINS a halo, and {@link FOCUS_HALO_WIDTH} is 4 — so the halo alone
 * crosses the margin at ANY scale, including 1.0. The two rules cannot both hold:
 * either the outermost pillars are the only two of six that may not be emphasised,
 * or the margin gives way for one pose. §7.1 is the stronger rule — a walk that
 * skipped two pillars would not be an index — so the margin gives way.
 *
 * WHAT IS PRESERVED, and it is the half that matters on a projector:
 *
 *   · NOTHING IS CLIPPED. 38.65 > 0, so the halo is on the stage, not off it. A
 *     browser reports 38.64 for it, one 1/64px `LayoutUnit` quantum below this
 *     module's 38.6529 — which is why `scripts/gh55-verify.mjs` compares the two
 *     within a sub-pixel tolerance rather than for equality.
 *   · NO GLYPH LEAVES THE MARGIN. The box's own 10px horizontal padding scales with
 *     it, so the label's content edge sits at `42.65 + 10 × 1.07 = 53.35` — still
 *     inside 48. The margin is a TYPE margin, and it is type that keeps it. The halo
 *     carries no glyphs. `scripts/gh55-verify.mjs` measures the rendered label rect
 *     rather than trusting that sum, because the padding lives in the renderer.
 *   · THE RIGHT SIDE, where the constraint is real, is unaffected — see
 *     {@link FOCUSED_WALK_COLUMN_GAP}.
 *
 * The alternative that was NOT taken: shrinking the ring's `rx` to buy margin. It
 * costs the ellipse 12px of width at both ends to gain 4, and `RING.rx = 280` is
 * already the widest ellipse that fits between this margin and the walk's column —
 * so it would pay for a halo with the gap that keeps the six labels from overlapping.
 */
export const FOCUSED_OUTERMOST_LEFT: number = Math.min(
  ...FOCUSED_BOXES.map((b) => b.left),
);

/** The rightmost pixel the figure ever paints: 741.35 — the mirror of
 *  {@link FOCUSED_OUTERMOST_LEFT} on a ring symmetric about the hub's vertical
 *  axis, and the number {@link FOCUSED_WALK_COLUMN_GAP} is spent from. */
export const FOCUSED_OUTERMOST_RIGHT: number = Math.max(
  ...FOCUSED_BOXES.map((b) => b.right),
);

/**
 * How far the focused figure reaches into the side margin: 9.35px.
 *
 * DERIVED SO THE DEVIATION HAS A NUMBER AND A TEST. It is asserted, not merely
 * tolerated — `tests/unit/shape-agentic-org.test.tsx` holds it under one full
 * margin, so an edit that doubles the halo or reaches for a 1.2 scale fails there
 * instead of pushing the ring off the stage in silence.
 */
export const FOCUSED_MARGIN_INTRUSION: number = SIDE_MARGIN - FOCUSED_OUTERMOST_LEFT;

/**
 * What still separates the focused figure from the walk's column: 22.65px.
 *
 * THE CONSTRAINT THAT IS REAL, as opposed to the margin above. Nothing sits left of
 * the stage's edge, so intruding on the margin costs a reader nothing; the column at
 * {@link WALK_COLUMN_LEFT} holds the decision the focused pillar is being read
 * against, and a halo that touched it would put the two things the room is comparing
 * into one mark. The resting gap is 33.5 and the focus spends 10.85 of it.
 *
 * MUST STAY POSITIVE. It is the horizontal twin of
 * {@link FOCUSED_NAV_ZONE_CLEARANCE}: same pose, same growth, other axis.
 */
export const FOCUSED_WALK_COLUMN_GAP: number =
  WALK_COLUMN_LEFT - FOCUSED_OUTERMOST_RIGHT;

/**
 * The slot the walk writes into: the decision column, and then the closer.
 *
 * ONE OBJECT, because five of these numbers are one rectangle and the sixth is the
 * gutter inside it. A renderer that assembled them from the loose constants would be
 * free to place the eyebrow, the decision and the closer in three slightly different
 * columns — and it would, because the closer is written at a different pose from the
 * beats. They are two poses of the SAME slot (see `showsWalkColumn` in `./walk.ts`
 * for why the column's own hairline outlives the beats).
 *
 * `right` IS A CSS OFFSET, NOT AN x. The column is placed `left`/`right` so its
 * type wraps against the deck's own {@link SIDE_MARGIN} — a fixed width plus a left
 * edge would let a longer decision run to 1240 while the headline above it stops at
 * 1232, and an 8px overhang at the right margin is visible against every slide
 * behind this one.
 *
 * TOP AND BOTTOM COME OFF THE RING, not out of the air. `top` is `pillarBox(0).top`,
 * so the column starts level with the top box of the ring beside it; `bottom` is
 * {@link LOWEST_PILLAR_BOTTOM}, so the column's floor IS the figure's floor and the
 * column INHERITS {@link NAV_ZONE_CLEARANCE} instead of carrying a second floor
 * budget that could disagree with the first. Re-cutting the ellipse moves the
 * column with it — which is the failure the prototype had: its panel was
 * `top: 196, bottom: 116`, hand-picked beside a ring whose top box started at 202
 * (6px of misalignment nobody could see) and whose floor was at 658 while the panel
 * stopped at y = 604, 54px short of it for no stated reason.
 *
 * AND THERE IS NO `width`. One was carried here and removed: `left` + `right` place
 * the column, the renderer reads nothing else, and the 468 it held was the column's
 * OUTER width — not the measure the type gets, which is 468 less the 28px gutter and
 * the 1px rule. A constant that no renderer reads and whose name overstates what it
 * measures is worse than the arithmetic it saves; the harness measures the content
 * box off the element instead (`scripts/gh55-verify.mjs`).
 */
export const WALK_COLUMN: {
  readonly left: number;
  readonly right: number;
  readonly top: number;
  readonly bottom: number;
  readonly rulePad: number;
} = {
  left: WALK_COLUMN_LEFT,
  right: SIDE_MARGIN,
  top: pillarBox(0).top,
  bottom: LOWEST_PILLAR_BOTTOM,
  /**
   * The gutter between the column's left hairline and its type: 28 — the
   * prototype's `paddingLeft`, kept with the rest of variant A.
   *
   * The hairline is the column's only chrome, and it is doing the job a heading rule
   * does: it says the type beside it is one block and not three stacked lines. At
   * 12–16px the rule reads as an underline that has fallen over; at 28 it reads as a
   * margin. It is also 28 and not 48 because the column has 468px of width and a
   * 21px serif decision needs most of it — the pad is spent out of the type's own
   * measure.
   */
  rulePad: 28,
};

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
