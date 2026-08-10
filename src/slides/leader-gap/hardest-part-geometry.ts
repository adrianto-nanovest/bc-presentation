// The hardest part, as numbers — stage coordinates for a 1280×720 stage.
//
// REWRITTEN 2026-08-10 with the slide's redesign (owner call, from the B.1
// prototype's variant B "TWO SPEEDS"). The first cut stacked five static bands;
// this stage is TWO LANES THAT MOVE and one summary shelf:
//
//   · the ACCESS lane keeps ONE position for the slide's whole life and has two
//     heights — full while the race runs, thin from pose 1 on;
//   · the CAPABILITY lane MORPHS: race height at pose 0, anatomy height at pose 1,
//     scoreboard height under the access lane at pose 2 — so its label top, track
//     top and track height are POSE-INDEXED, and {@link capabilityGeometry} is the
//     one way to read them;
//   · pose 2's summary shelf re-draws the statistic as a split bar whose two
//     segment widths are DERIVED from {@link PEOPLE_SHARE}, which is 0.70 because
//     the quoted figure is 70% — the same weld the first cut kept, held in
//     `tests/unit/gap-hardest-part.test.tsx` as a cross-module assertion.
//
// THE 70/30 COLLISION, restated so nobody welds the wrong two things: `./geometry.ts`
// draws the Capability Ladder, whose L3 rung is "Decision contract · 70/30 split" —
// how much of a bounded agentic DECISION the machine may take. THIS module's
// {@link PEOPLE_SHARE} is the ADOPTION-FAILURE split (§6.1). The two numbers agree
// by coincidence and neither module may read the other's.
//
// THE VERTICAL BUDGET, top to bottom. `.fig-label` at y=36, `.slide-headline-row`
// at y=80; a one-line `.slide-headline.small` (40px on 1.05) ends the headline row
// at y=122; the eyebrow slot sits at {@link EYEBROW_TOP} = 166.
//
//   ─────────── THE ACCESS LANE (one position, two heights) ───────────
//   214  label row                                                → 234
//   240  track · 66 full (pose 0) / 20 thin (pose 1+)             → 306 / 260
//
//   ─────────── THE CAPABILITY LANE (pose-indexed) ────────────────────
//   pose 0 · label 356 · track 382+66 → 448 · footnote 460 → 480
//   pose 1 · label 284 · track 310+130 → 440 · captions 454 · verdict slot 540
//   pose 2 · label 278 · track 304+20 → 324
//
//   ─────────── POSE 2 · THE SUMMARY SHELF ────────────────────────────
//   368  the statistic · 28px serif, one line                     → 404
//   448  the source · 10.5px mono, one line                       → 464
//   498  the split bar · 484 + 8 + 208 of a 700 measure           → 510
//   518  the two bar labels · 10px mono                           → 531
//   562  the closer · 24px serif, one line                        → 594
//   ─────────────────────────────────────────────────────────────────────
//   floor y=632 · lowest painted box 594 · {@link NAV_ZONE_CLEARANCE} = 38
//
// THE FLOOR IS THE HOVER BAND AND NOT `.slide-content`'s BOTTOM, the rule every
// leader geometry module keeps: `.nav-zone` is `bottom: 0; height: 88px`, so
// nothing on this stage may cross y=632.
//
// Proved importable from bare Node, not assumed — the property every geometry
// module in this tree keeps, so a coordinate can be checked without a bundler:
//
//   $ node --experimental-strip-types -e \
//       'import("./src/slides/leader-gap/hardest-part-geometry.ts")
//          .then(m => console.log(Object.keys(m).length, "exports"))'
//
// Pure data and pure functions. No React, no DOM, and no work at module scope
// beyond the arithmetic below.

// ───────────────────── the stage, restated ─────────────────────

/**
 * This slide's copy, as a TYPE only — the other end of the count pin
 * ({@link SEGMENT_COUNT}). Type-space only, so bare Node never has to resolve it.
 */
type HardestPartCopy = (typeof import("./content"))["gapHardestPartContent"];

/** The stage. 1280×720 — the deck's one stage size, restated from
 *  `src/styles/globals.css` (nothing in this directory exports it). */
export const STAGE = { width: 1280, height: 720 } as const;

/** The deck's side margin — `.fig-label`, `.slide-headline-row` and
 *  `.slide-content` all sit at `left: 48px` in `src/styles/globals.css`. */
export const SIDE_MARGIN = 48;

/** The width every full-bleed box on this stage gets: 1184. Both lane tracks
 *  take exactly this. */
export const CONTENT_WIDTH = STAGE.width - 2 * SIDE_MARGIN;

/** `.nav-zone` is `bottom: 0; height: 88px`, so its top edge is y=632 — the floor
 *  nothing on this stage may cross. */
export const NAV_ZONE_TOP = STAGE.height - 88;

/** The one eyebrow slot — all three pose eyebrows crossfade in this box. */
export const EYEBROW_TOP = 166;

// ───────────────────── the race's one measured claim ─────────────────────

/**
 * How far the capability lane gets while the room watches: 0.14 of the lane.
 *
 * A DRAMATISATION, NOT A MEASUREMENT, and deliberately unlabelled as a number:
 * no authored string prints "14%", the fill is simply small and still moving.
 * The five anatomy slices are cut from the remainder, so the one thing this
 * constant must stay is WELL UNDER {@link PEOPLE_SHARE} — a fill that read as
 * "most of the lane" would draw the opposite of the slide's claim.
 */
export const EARNED_PROGRESS = 0.14;

/** How many milestone ticks texture the capability lane's unrun distance at
 *  pose 0: 14. Texture, not data — they mark nothing. */
export const TICK_COUNT = 14;

// ───────────────────── the access lane ─────────────────────

/** The access lane's label row: 214. One position for the slide's whole life. */
export const ACCESS_LABEL_TOP = 214;

/** The access track's shelf: 240. NEVER MOVES — the redesign's rule is that this
 *  lane keeps its place and gives up only its HEIGHT. */
export const ACCESS_TRACK_TOP = 240;

/** The access track while the race runs: 66 — tall enough for the three in-bar
 *  items and the finish flag at 11px mono. */
export const ACCESS_TRACK_HEIGHT = 66;

/** The access track from pose 1 on: 20 — a fact, not a figure. The lane is done
 *  arguing; it stays as the scoreboard row the capability lane joins at pose 2. */
export const ACCESS_TRACK_HEIGHT_THIN = 20;

// ───────────────────── the capability lane, pose-indexed ─────────────────────

/** One pose's capability-lane boxes. All stage coordinates. */
export interface CapabilityLaneGeometry {
  labelTop: number;
  trackTop: number;
  trackHeight: number;
}

/** The three shapes the lane takes — see the header's budget for the arithmetic
 *  each row clears. Not exported: {@link capabilityGeometry} is the way in. */
const CAPABILITY_BY_POSE: readonly CapabilityLaneGeometry[] = [
  { labelTop: 356, trackTop: 382, trackHeight: 66 }, // pose 0 · the race
  { labelTop: 284, trackTop: 310, trackHeight: 130 }, // pose 1 · the anatomy
  { labelTop: 278, trackTop: 304, trackHeight: 20 }, // pose 2 · the scoreboard
];

/** How many poses this slide has: 3. The slide def's `steps` and the array above
 *  are both held to it. */
export const POSE_COUNT = CAPABILITY_BY_POSE.length;

/**
 * The capability lane's boxes at `pose` — the one reader for the lane that moves.
 *
 * @throws on a pose the slide does not have, at the call site rather than as an
 *         undefined property read three renders later.
 */
export function capabilityGeometry(pose: number): CapabilityLaneGeometry {
  const row = CAPABILITY_BY_POSE[pose];
  if (!Number.isInteger(pose) || !row) {
    throw new Error(
      `capabilityGeometry: no pose ${pose} — this slide has ${POSE_COUNT} ` +
        `(0…${POSE_COUNT - 1}): race, anatomy, scoreboard.`,
    );
  }
  return row;
}

// ───────────────────── the anatomy's five slices ─────────────────────

/**
 * How many structural things fill the lane's unrun distance: 5, PINNED to
 * `./content.ts`'s tuple — a sixth segment re-cuts every slice below, and this
 * weld is what reports it.
 */
export const SEGMENT_COUNT: HardestPartCopy["segments"]["length"] = 5;

/** One anatomy slice, as FRACTIONS of the track width (the track is 100%-based
 *  so the slices survive the lane's height morphs untouched). */
export interface SegmentSlice {
  /** The slice's left edge, 0…1 of the track. */
  left: number;
  /** The slice's width, 0…1 of the track. */
  width: number;
}

/**
 * Segment `index`'s slice of the capability lane: the unrun `1 − EARNED_PROGRESS`
 * cut into {@link SEGMENT_COUNT} equal parts, starting where the fill ends. The
 * five slices tile the lane's remainder exactly — the last one ends on 1.
 *
 * @throws on a sixth segment — the tuple in `./content.ts` refuses it first.
 */
export function segmentSlice(index: number): SegmentSlice {
  if (!Number.isInteger(index) || index < 0 || index >= SEGMENT_COUNT) {
    throw new Error(
      `segmentSlice: no segment ${index} — the lane's remainder is cut into ` +
        `${SEGMENT_COUNT} (0…${SEGMENT_COUNT - 1}), pinned to ./content.ts's tuple.`,
    );
  }
  const width = (1 - EARNED_PROGRESS) / SEGMENT_COUNT;
  return { left: EARNED_PROGRESS + index * width, width };
}

/** The caption row under the anatomy's five slices: 454 — 14px under the pose-1
 *  track's bottom edge (310 + 130). */
export const CAPTION_TOP = 454;

/** The footnote's shelf: 460, pose 0 ONLY (owner call 2026-08-10) — 12px under
 *  the pose-0 track's bottom edge (382 + 66). */
export const FOOTNOTE_TOP = 460;

/** The one verdict slot poses 0 and 1 share: 540, full width, centered. The two
 *  lines crossfade in this box; pose 2's closer lives on the summary shelf. */
export const VERDICT_TOP = 540;

// ───────────────────── pose 2 · the summary shelf ─────────────────────

/**
 * The people-&-process share: 0.70 — THE STATISTIC, AS A FRACTION.
 *
 * The one number in this file that is not a layout decision. It exists so the
 * summary bar's segment widths are DERIVED from the quoted figure instead of
 * typed beside it, and so a test can hold the derivation against `./content.ts`'s
 * own copy (which prints "70%" three times: statistic, people label, closer).
 * See the header for the collision with the ladder's unrelated 70/30.
 */
export const PEOPLE_SHARE = 0.7;

/** The statistic's shelf: 368 — clear of the scoreboard's bottom edge (324). */
export const SUMMARY_STATISTIC_TOP = 368;

/** The source's shelf: 448. Bound to the statistic in space AND in arrival order
 *  — the room never reads the number unattributed. */
export const SUMMARY_SOURCE_TOP = 448;

/** The summary bar's measure: 700, centered — an exhibit, not a full-bleed band;
 *  the two full-width objects on this stage are the lanes. */
export const SUMMARY_BAR_WIDTH = 700;

/** The bar's left edge: 290 — centered on the stage. */
export const SUMMARY_BAR_LEFT = (STAGE.width - SUMMARY_BAR_WIDTH) / 2;

/** The bar's shelf: 498. */
export const SUMMARY_BAR_TOP = 498;

/** The bar's height: 12 — a mass, not a rule. */
export const SUMMARY_BAR_HEIGHT = 12;

/** The air between the two segments: 8 — two masses, not one bar with a seam a
 *  projector loses. Taken OUT of the measure before the ratio is applied. */
const SUMMARY_BAR_GAP = 8;

/** The measure the ratio is applied to: 692. Not exported. */
const SUMMARY_BAR_MEASURE = SUMMARY_BAR_WIDTH - SUMMARY_BAR_GAP;

/** The 70% segment: 484. Derived from {@link PEOPLE_SHARE}, rounded to a whole
 *  pixel — 484/692 is 69.94%, which no eye distinguishes from 70. */
export const SUMMARY_PEOPLE_WIDTH = Math.round(PEOPLE_SHARE * SUMMARY_BAR_MEASURE);

/** The 30% segment: 208. Derived as the REMAINDER, so the two segments plus the
 *  seam tile the measure exactly whatever rounding does to the larger one. */
export const SUMMARY_TECHNOLOGY_WIDTH = SUMMARY_BAR_MEASURE - SUMMARY_PEOPLE_WIDTH;

/** The 30% segment's left edge: 782. `782 + 208 = 990 = 290 + 700`, so the bar
 *  ends on its own right edge. */
export const SUMMARY_TECHNOLOGY_LEFT =
  SUMMARY_BAR_LEFT + SUMMARY_PEOPLE_WIDTH + SUMMARY_BAR_GAP;

/** The two bar labels' shelf: 518 — 8px under the masses they name. */
export const SUMMARY_BAR_LABEL_TOP = SUMMARY_BAR_TOP + SUMMARY_BAR_HEIGHT + 8;

/** The closer's shelf: 562. */
export const SUMMARY_CLOSER_TOP = 562;

/** The closer's box: 32, cut for ONE line of 24px serif — a 31.2 line box. */
export const SUMMARY_CLOSER_HEIGHT = 32;

/** What is left between the closer and the NavBar's hover band: 38px. Derived
 *  from both ends, so an edit anywhere above moves it and a test fails on it
 *  before the stage crosses the band. */
export const NAV_ZONE_CLEARANCE =
  NAV_ZONE_TOP - (SUMMARY_CLOSER_TOP + SUMMARY_CLOSER_HEIGHT);
