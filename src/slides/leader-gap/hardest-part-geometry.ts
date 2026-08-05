// The hardest part, as numbers — stage coordinates for a 1280×720 stage.
//
// FIVE BANDS DOWN THE STAGE, AND THE SECOND ONE IS THE ARGUMENT. Band 1 is the
// quoted statistic with its source under it; band 2 is that statistic drawn — one
// split bar, 70% of the measure against 30% of it; band 3 hangs the CONTENTS of
// each half under the half it belongs to, so "what the 70% is" is read literally
// underneath the 70% mass rather than in a list somewhere else; one copper rule
// closes the split; band 4 names the gap in two equal columns; band 5 is the
// closer, full width, alone.
//
// THE SPLIT BAR IS WHY THIS FILE EXISTS AND NOT A SIXTH COPY OF A COLUMN GRID.
// Every other geometry module in the leader tree cuts a grid whose columns are
// EQUAL and whose count is a list length (`leader-invest/security-geometry.ts`,
// `leader-invest/subscription-geometry.ts`, `leader-mandate/geometry.ts`). This
// one's upper half is deliberately UNEQUAL, in a ratio that is not a layout
// preference but the statistic itself: {@link PEOPLE_SHARE} is 0.70 because the
// quoted figure is 70%, and {@link PEOPLE_WIDTH} / {@link TECHNOLOGY_WIDTH} are
// derived from it rather than typed. A reworded statistic that changed the number
// and left the bar alone is the one failure this slide has that nobody would see
// on a projector, so the two are welded — here by derivation, and in
// `tests/unit/gap-hardest-part.test.tsx` by a cross-module assertion that the
// copy's own "70%" and this file's fraction are the same number.
//
// THE 70/30 COLLISION, STATED SO NOBODY WELDS THE WRONG TWO THINGS. `./geometry.ts`
// draws the Capability Ladder, whose L3 rung is defined as "Decision contract ·
// 70/30 split" (§6.5). THAT 70/30 IS A DIFFERENT 70/30: it is how much of a bounded
// agentic decision the machine may take against how much stays with a human. THIS
// 70/30 is the ADOPTION-FAILURE split — how many failures are people and process
// against how many are technology (§6.1). The two numbers agree by coincidence and
// nothing in this file, in `./content.ts` or in the component may make one stand for
// the other; in particular no string on this slide prints the phrase "70/30", which
// is the ladder's, and the two halves are labelled with their own percentages.
//
// NOTHING IS PINNED TO `./geometry.ts`, and that is a fact about the ladder's
// module rather than a choice here: it exports treads, slots and an anchor
// function and no stage constants at all — there is no `STAGE` and no
// `SIDE_MARGIN` to pin to, unlike `leader-invest/geometry.ts`, which is what
// `leader-invest/subscription-geometry.ts` pins its twin pair against. So the
// stage facts below are RESTATED from `src/styles/globals.css` (the authority for
// all four) and carry the arithmetic that would fail if one of them moved.
//
// Proved importable from bare Node, not assumed — the property every geometry
// module in this tree keeps, so a coordinate can be checked without a bundler:
//
//   $ node --experimental-strip-types -e \
//       'import("./src/slides/leader-gap/hardest-part-geometry.ts")
//          .then(m => console.log(Object.keys(m).length, "exports"))'
//
// THE VERTICAL BUDGET, top to bottom, and it is arithmetic rather than
// measurement. `.fig-label` at y=36, `.slide-headline-row` at y=80; a one-line
// `.slide-headline.small` (40px on 1.05) ends the headline row at y=122; band 1
// starts on {@link CONTENT_TOP} = 156, `.slide-content`'s own `top` — the call
// every recent leader slide makes.
//
//   ─────────────── BAND 1 · THE QUOTED STATISTIC (full width) ───────────────
//   156  eyebrow · 11px mono caps                                      → 172
//   184  the statistic · 28px serif, ONE line                          → 224
//   232  the source · 10.5px mono, ONE line                            → 248
//
//   ─────────────── BAND 2 · THE SAME NUMBER, DRAWN ─────────────────────────
//   276  the split bar · two segments, 823 + 8 + 353                    → 292
//   300  the two half labels · 11px mono caps, one per segment          → 316
//
//   ─────────────── BAND 3 · WHAT IS INSIDE EACH HALF ───────────────────────
//        people, in TWO sub-columns of 397 under the 70% segment
//        technology, in ONE column of 353 under the 30% segment
//   340  row 0                                                         → 360
//   372  row 1                                                         → 392
//   404  row 2                                                         → 424
//
//   452  copper rule ···· spans the full width                          → 453
//
//   ─────────────── BAND 4 · THE GAP (two EQUAL columns of 578) ─────────────
//   481  eyebrow · full width                                          → 497
//   509  access line │ capability line · 17px serif, TWO lines each     → 557
//
//   ─────────────── BAND 5 · THE CLOSER ────────────────────────────────────
//   583  closer · 22px serif, full width, ONE line                     → 615
//   ─────────────────────────────────────────────────────────────────────────
//   floor y=632 · lowest painted box 615 · {@link NAV_ZONE_CLEARANCE} = 17
//
// THE FLOOR IS THE HOVER BAND AND NOT `.slide-content`'s BOTTOM, the same rule the
// leader tree's other four geometry modules keep: `.nav-zone` is `bottom: 0;
// height: 88px`, so nothing on this stage may cross y=632.
//
// WHY THE 70% HALF IS TWO SUB-COLUMNS AND THE 30% HALF IS ONE. Not symmetry, and
// not decoration: the 70% names five structural things and the 30% names three, so
// a single column under each would leave the wide half two rows DEEPER than the
// narrow one — 5 rows against 3 — and {@link RULE_TOP} is derived from the deeper
// column, which would push the whole lower stage 64px down and take
// {@link NAV_ZONE_CLEARANCE} negative. Cutting the wide half in two lands both
// halves on three rows and on the same floor, and it costs nothing to read:
// the 70% segment is 823px wide, which is two comfortable 397px measures.
//
// Pure data and pure functions. No React, no DOM, and no work at module scope
// beyond the arithmetic below.

// ───────────────────── the stage, restated ─────────────────────

/**
 * This slide's copy, as a TYPE only — the other end of the two count pins
 * ({@link PEOPLE_ITEM_COUNT}, {@link TECHNOLOGY_ITEM_COUNT}). Type-space only, so
 * bare Node never has to resolve it.
 */
type HardestPartCopy = (typeof import("./content"))["gapHardestPartContent"];

/** The stage. 1280×720 — the deck's one stage size, restated (see the header for
 *  why there is nothing in this directory to pin it to). */
export const STAGE = { width: 1280, height: 720 } as const;

/** The deck's side margin — `.fig-label`, `.slide-headline-row` and
 *  `.slide-content` all sit at `left: 48px` in `src/styles/globals.css`. */
export const SIDE_MARGIN = 48;

/** The width every full-bleed box on this stage gets: 1184. */
export const CONTENT_WIDTH = STAGE.width - 2 * SIDE_MARGIN;

/** `.nav-zone` is `bottom: 0; height: 88px`, so its top edge is y=632 — the floor
 *  nothing on this stage may cross. */
export const NAV_ZONE_TOP = STAGE.height - 88;

/** The one shelf band 1 starts on: 156 — `.slide-content`'s own `top`, clearing
 *  the 40px headline row that ends at y=122. */
export const CONTENT_TOP = 156;

// ───────────────────── the registers, as box heights ─────────────────────

/** A mono eyebrow's box: 16. 11px on 1.3 is a 14.30 line box; the box carries 1.70
 *  more. ONE CONSTANT FOR ALL FOUR mono caps rows on this stage — band 1's
 *  eyebrow, the two half labels, band 4's eyebrow. */
export const EYEBROW_HEIGHT = 16;

/** The air between a label and the body it labels: 12 — the leader tree's binding
 *  gap. Not exported. */
const LABEL_TO_BODY = 12;

/** The air between a claim and the citation UNDER it: 8 — tighter than
 *  {@link LABEL_TO_BODY} on purpose, and the one adjacency a citation may never
 *  lose. It binds the source to the statistic and the half labels to their bar
 *  segments. Not exported. */
const CLAIM_TO_CITATION = 8;

/** A beat change: 28. Three bands start on one of these. Not exported. */
const BAND_GAP = 28;

// ───────────────────── band 1 · the quoted statistic ─────────────────────

/** Band 1's eyebrow: 156. */
export const STATISTIC_EYEBROW_TOP = CONTENT_TOP;

/** The statistic's shelf: 184. */
export const STATISTIC_TOP = STATISTIC_EYEBROW_TOP + EYEBROW_HEIGHT + LABEL_TO_BODY;

/**
 * The statistic's box: 40, cut for ONE line of 28px serif.
 *
 * 28px on 1.3 is a 36.40 line box painting 38.19 (Source Serif 4's content area,
 * the taller of the two extents), so the box carries 1.81 spare. ONE LINE IS THE
 * CLAIM: 64 characters of 28px serif measure ≈845px in a 1184px box, and the
 * failure mode of a reword past that is a wrap into the source line — which a
 * browser check sees and jsdom cannot, so it is stated here rather than asserted.
 */
export const STATISTIC_HEIGHT = 40;

/** The source's shelf: 232 — 8px under the statistic it attributes. */
export const SOURCE_TOP = STATISTIC_TOP + STATISTIC_HEIGHT + CLAIM_TO_CITATION;

/** The source's box: 16, cut for ONE line of 10.5px mono (a 13.65 line box, 2.35
 *  spare). Above gh#50's 9.5px mono floor. */
export const SOURCE_HEIGHT = 16;

// ───────────────────── band 2 · the same number, drawn ─────────────────────

/** The split bar's shelf: 276. */
export const BAR_TOP = SOURCE_TOP + SOURCE_HEIGHT + BAND_GAP;

/** The bar's height: 16 — a mass, not a rule. `.copper-rule`'s 1px is a divider
 *  and this is a quantity, so it is its own box rather than a thick rule. */
export const BAR_HEIGHT = 16;

/**
 * The air between the two segments: 8.
 *
 * NOT ZERO, AND NOT A BORDER. Two abutting segments in two colour tiers read as one
 * bar with a seam — and a 1px seam is exactly what a projector loses first. 8px of
 * background says "two masses" at the back of the room with no extra element and no
 * hairline to lose. It is taken OUT of the measure before the ratio is applied, so
 * the ratio stays the statistic's rather than the statistic's minus a gap. Not
 * exported.
 */
const BAR_SPLIT_GAP = 8;

/**
 * The people-&-process share: 0.70 — THE STATISTIC, AS A FRACTION.
 *
 * This is the one number in this file that is not a layout decision. It exists so
 * {@link PEOPLE_WIDTH} and {@link TECHNOLOGY_WIDTH} are DERIVED from the quoted
 * figure instead of typed beside it, and so a test can hold the derivation against
 * `./content.ts`'s own copy (which prints "70%" three times: in the statistic, in
 * the people label and in the closer). See the header for the collision with the
 * ladder's unrelated 70/30.
 */
export const PEOPLE_SHARE = 0.7;

/** The measure the ratio is applied to: 1176 — the content width less the seam
 *  between the segments. Not exported. */
const BAR_MEASURE = CONTENT_WIDTH - BAR_SPLIT_GAP;

/** The 70% segment: 823. Derived from {@link PEOPLE_SHARE}, rounded to a whole
 *  pixel — `0.7 × 1176 = 823.2`, and 823/1176 is 69.98%, which no eye and no
 *  projector distinguishes from 70. */
export const PEOPLE_WIDTH = Math.round(PEOPLE_SHARE * BAR_MEASURE);

/** The 30% segment: 353. Derived as the REMAINDER and not as `0.3 × measure`, so
 *  the two segments plus the seam tile {@link CONTENT_WIDTH} exactly whatever
 *  rounding does to the larger one. */
export const TECHNOLOGY_WIDTH = BAR_MEASURE - PEOPLE_WIDTH;

/** The 70% segment's left edge: 48 — the stage's own margin. */
export const PEOPLE_LEFT = SIDE_MARGIN;

/** The 30% segment's left edge: 879. `879 + 353 = 1232 = 1280 − 48`, so the bar
 *  ends on the right margin. */
export const TECHNOLOGY_LEFT = PEOPLE_LEFT + PEOPLE_WIDTH + BAR_SPLIT_GAP;

/** Each half's label shelf: 300 — 8px under the segment it names, so a label can
 *  never be read against the wrong mass. */
export const HALF_LABEL_TOP = BAR_TOP + BAR_HEIGHT + CLAIM_TO_CITATION;

// ───────────────────── band 3 · what is inside each half ─────────────────────

/** The air between the half labels and the rows they head: 24 — bigger than the
 *  binding 12, smaller than a 28 beat change: the rows are the label's own
 *  contents, not a new claim. Not exported. */
const LABEL_TO_ROWS = 24;

/** Where every row in band 3 starts: 340. */
export const ROWS_TOP = HALF_LABEL_TOP + EYEBROW_HEIGHT + LABEL_TO_ROWS;

/** A 15px sans row's box: 20 — one 19.50 line box with 0.50 spare, cut for ONE
 *  line. The measure is 397 (people) or 353 (technology); a reword past ~50
 *  characters wraps, which a browser check sees. */
export const ROW_HEIGHT = 20;

/** The air between two rows: 12. Not exported. */
const ROW_GAP = 12;

/** How far apart two rows sit: 32. Derived. Not exported. */
const ROW_PITCH = ROW_HEIGHT + ROW_GAP;

/**
 * How many structural things the 70% is made of: 5, PINNED to `./content.ts`'s
 * tuple. Five is §6.1's own reading of the people-&-process half, and it is the
 * count {@link ROWS_PER_SUB_COLUMN} is cut from.
 */
export const PEOPLE_ITEM_COUNT: HardestPartCopy["peopleItems"]["length"] = 5;

/** How many things money already buys: 3, PINNED to `./content.ts`'s tuple. */
export const TECHNOLOGY_ITEM_COUNT: HardestPartCopy["technologyItems"]["length"] = 3;

/** How many sub-columns the 70% half is cut into: 2 — a literal `const`, so the
 *  weld at {@link peopleItemLeft} is compile-visible. */
export const SUB_COL_COUNT = 2;

/** The air between the two sub-columns: 29 — one more than the {@link BAND_GAP},
 *  chosen so the two 397px measures tile the 823px segment exactly. Not
 *  exported. */
const SUB_COL_GAP = 29;

/** One sub-column of the 70% half: 397. `2 × 397 + 29 = 823`. */
export const SUB_COL_WIDTH = (PEOPLE_WIDTH - SUB_COL_GAP) / SUB_COL_COUNT;

/** How deep each sub-column of the 70% half goes: 3 — `ceil(5 / 2)`, derived, so a
 *  sixth structural item deepens the column by arithmetic instead of by an edit
 *  somebody forgot. */
export const ROWS_PER_SUB_COLUMN = Math.ceil(PEOPLE_ITEM_COUNT / SUB_COL_COUNT);

/**
 * How deep band 3 goes: 3 — the DEEPER of the two halves.
 *
 * Derived over both counts, because either half can be the one that decides the
 * floor: three structural sub-column rows against three technology rows today, and
 * the moment either grows the whole lower stage moves and
 * {@link NAV_ZONE_CLEARANCE} is what reports it.
 */
export const BAND_3_ROW_COUNT = Math.max(ROWS_PER_SUB_COLUMN, TECHNOLOGY_ITEM_COUNT);

/** Where band 3 ends: 424. Not exported — {@link RULE_TOP} carries it forward. */
const ROWS_BOTTOM = ROWS_TOP + (BAND_3_ROW_COUNT - 1) * ROW_PITCH + ROW_HEIGHT;

/**
 * Row `row`'s top edge, in stage coordinates — one function for BOTH halves,
 * because both are cut to {@link BAND_3_ROW_COUNT}.
 *
 * @throws on a row past the band. THE FLOOR IS WHAT REFUSES IT: {@link RULE_TOP} is
 *         derived from this band's bottom, so an extra row would not collide with
 *         anything — it would push the rule, band 4 and the closer down
 *         {@link ROW_PITCH}px, and the closer already ends
 *         {@link NAV_ZONE_CLEARANCE}px above the NavBar's hover band. The throw
 *         keeps that failure at the call site instead of at the bottom of the
 *         slide. Both tuples in `./content.ts` refuse the extra entry first.
 */
export function bandRowTop(row: number): number {
  if (!Number.isInteger(row) || row < 0 || row >= BAND_3_ROW_COUNT) {
    throw new Error(
      `bandRowTop: no row ${row} — band 3 is ${BAND_3_ROW_COUNT} rows deep ` +
        `(0…${BAND_3_ROW_COUNT - 1}): ceil(${PEOPLE_ITEM_COUNT}/${SUB_COL_COUNT}) ` +
        `people rows against ${TECHNOLOGY_ITEM_COUNT} technology rows. A row ` +
        `${BAND_3_ROW_COUNT} would push RULE_TOP and the whole lower stage down ` +
        `${ROW_PITCH}px, and the closer already ends ${NAV_ZONE_CLEARANCE}px above ` +
        `the NavBar band at y=${NAV_ZONE_TOP}.`,
    );
  }
  return ROWS_TOP + row * ROW_PITCH;
}

/** The two placement functions below share one guard, so an index one of them
 *  accepts is always an index the other places. Not exported. */
function assertPeopleItem(fn: string, index: number): void {
  if (!Number.isInteger(index) || index < 0 || index >= PEOPLE_ITEM_COUNT) {
    throw new Error(
      `${fn}: no structural item ${index} — the 70% half names ` +
        `${PEOPLE_ITEM_COUNT} (0…${PEOPLE_ITEM_COUNT - 1}), laid column-major down ` +
        `${SUB_COL_COUNT} sub-columns of ${SUB_COL_WIDTH}px. The tuple in ` +
        `./content.ts refuses the extra entry first.`,
    );
  }
}

/**
 * Which sub-column of the 70% half a structural item sits in, and where its left
 * edge is: 48 for items 0–2, 474 for items 3–4.
 *
 * COLUMN-MAJOR, not row-major. The five items are one ordered list and the order is
 * the argument, so filling down sub-column 0 and then down sub-column 1 keeps
 * reading order intact; a row-major fill would make the list read 0,3,1,4,2 and no
 * label on the stage would say so.
 *
 * @throws on a sixth item — see {@link assertPeopleItem}.
 */
export function peopleItemLeft(index: number): number {
  assertPeopleItem("peopleItemLeft", index);
  const subColumn = Math.floor(index / ROWS_PER_SUB_COLUMN);
  return PEOPLE_LEFT + subColumn * (SUB_COL_WIDTH + SUB_COL_GAP);
}

/**
 * Which row of its sub-column a structural item sits on: rows 0,1,2 for items
 * 0,1,2 and rows 0,1 for items 3,4.
 *
 * The other half of {@link peopleItemLeft}'s column-major fill. It guards its own
 * index rather than leaning on {@link bandRowTop}'s: `5 % 3` is a legal row, so a
 * sixth item would be silently placed on top of the third one.
 *
 * @throws on a sixth item — see {@link assertPeopleItem}.
 */
export function peopleItemTop(index: number): number {
  assertPeopleItem("peopleItemTop", index);
  return bandRowTop(index % ROWS_PER_SUB_COLUMN);
}

// ───────────────────── the rule that closes the split ─────────────────────

/** The air between band 3 and the rule: 28 — a beat change. Not exported. */
const ROWS_TO_RULE = BAND_GAP;

/** The copper rule's shelf: 452. It spans the FULL width, not one half: above it is
 *  what the split is, below it is the gap the split names. */
export const RULE_TOP = ROWS_BOTTOM + ROWS_TO_RULE;

/** `.copper-rule` is `height: 1px` in `src/styles/globals.css` — restated, because
 *  jsdom computes no stylesheet and a test that read this box's height off the DOM
 *  would read `NaN`. */
export const RULE_HEIGHT = 1;

// ───────────────────── band 4 · the gap ─────────────────────

/** Band 4's eyebrow: 481 — 28px under the rule, matching the air above it. */
export const GAP_EYEBROW_TOP = RULE_TOP + RULE_HEIGHT + BAND_GAP;

/** How many columns band 4 is cut into: 2 — a literal `const`, so the weld at
 *  {@link gapColLeft} is compile-visible. */
export const GAP_COL_COUNT = 2;

/** The gutter between band 4's two columns: 28. Not exported. */
const GAP_COL_GAP = 28;

/**
 * One column of band 4: 578, and the two are EQUAL — the one place on this stage
 * where equal columns are the argument.
 *
 * Band 2's bar is unequal because the statistic is. Band 4's two claims are the
 * same SIZE of claim — one thing that is bought, one thing that is built — and
 * drawing them 70/30 would say the gap is 70% access, which is not what §6.1
 * says. Equal columns, unequal speeds, and the speed is in the copy.
 */
export const GAP_COL_WIDTH = (CONTENT_WIDTH - GAP_COL_GAP) / GAP_COL_COUNT;

/** Both of band 4's lines start on one shelf: 509. */
export const GAP_LINE_TOP = GAP_EYEBROW_TOP + EYEBROW_HEIGHT + LABEL_TO_BODY;

/**
 * Band 4's line box: 48, cut for TWO lines of 17px serif.
 *
 * Two 22.10 line boxes paint 22.10 + 23.19 = 45.29 (Source Serif 4's content area
 * on the last line), so the box carries 2.71 spare. ONE HEIGHT FOR BOTH COLUMNS,
 * so the band does not step when one sentence is reworded a word shorter than the
 * other — the two are read as a pair and a 22px offset between them would read as
 * a mistake.
 */
export const GAP_LINE_HEIGHT = 48;

/** Where band 4 ends: 557. Not exported — {@link CLOSER_TOP} carries it forward. */
const GAP_BOTTOM = GAP_LINE_TOP + GAP_LINE_HEIGHT;

/**
 * Band 4 column `index`'s left edge, in stage coordinates: 48, 654.
 *
 * ABSOLUTE AND NOT SLOT-RELATIVE, like every placement function in this directory:
 * every box on this slide is placed against the stage.
 *
 * @throws on a third column — the band holds exactly the two halves of one gap, and
 *         a third would be a third thing the gap runs between.
 */
export function gapColLeft(index: number): number {
  if (!Number.isInteger(index) || index < 0 || index >= GAP_COL_COUNT) {
    throw new Error(
      `gapColLeft: no column ${index} — band 4 is the two halves of ONE gap ` +
        `(0…${GAP_COL_COUNT - 1}), tiling the ${CONTENT_WIDTH}px content width ` +
        `(${GAP_COL_COUNT} × ${GAP_COL_WIDTH} + ${GAP_COL_GAP}).`,
    );
  }
  return SIDE_MARGIN + index * (GAP_COL_WIDTH + GAP_COL_GAP);
}

// ───────────────────── band 5 · the closer ─────────────────────

/** The air between band 4 and the closer: 26 — a beat change, two short of the
 *  {@link BAND_GAP} above, and that difference is the whole slack this stage has
 *  left. Not exported. */
const GAP_TO_CLOSER = 26;

/** The closer's shelf: 583. Full width — the one sentence addressed to every band
 *  above it. */
export const CLOSER_TOP = GAP_BOTTOM + GAP_TO_CLOSER;

/** The closer's box: 32, cut for ONE line of 22px serif — a 28.60 line box painting
 *  30.01, 1.99 spare. The same box every 22px verdict in the leader tree takes. */
export const CLOSER_HEIGHT = 32;

/** Where the stage's lowest box ends: 615. Not exported — the clearance below
 *  carries its whole content. */
const CLOSER_BOTTOM = CLOSER_TOP + CLOSER_HEIGHT;

/** What is left between the closer and the NavBar's hover band: 17px. Derived from
 *  both ends, so an edit anywhere above moves it and a test fails on it before the
 *  stage crosses the band. */
export const NAV_ZONE_CLEARANCE = NAV_ZONE_TOP - CLOSER_BOTTOM;
