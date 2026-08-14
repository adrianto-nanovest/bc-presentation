// The base rate, as two hundreds — stage coordinates for a 1280×720 stage.
//
// TWO PLATES SIDE BY SIDE, AND EACH ONE IS A WHOLE HUNDRED. A plate is a 10 × 10 field of
// squares — {@link PER_HUNDRED} of them, always all hundred drawn — with a text column
// beside it carrying that rate's figure, its label, when it was measured, and what it buys.
// The left plate is the common position, the right one is the rare one, and the two plates
// are IDENTICAL in every measure: same grid, same square, same column, same shelves. What
// differs between them is HOW MANY SQUARES ARE FILLED, which is the only difference the
// survey states.
//
// ═══ THE FRAME IS THE DENOMINATOR, AND THAT IS THE 2026-08-14 REWORK. The previous cut of
// this module drew ONLY the filled marks — a 78-mark field above a 6-mark field, each as
// wide as its own count — so the two rows were different SIZES of object and the small one
// read as a stub rather than as a rate. Both plates now draw all hundred squares and fill
// the count: the unfilled ones are an OUTLINE, at {@link MARK_BORDER}, and they are the
// hundred the percentage is already a percentage OF. Drawing them states no third statistic
// — "%" means "in a hundred", and the eyebrow says so in words before a square is filled —
// and it is what makes 6 read as 6 IN A HUNDRED at the back of a room instead of as six
// squares somebody chose to draw.
//
// ═══ TWO SEPARATE HUNDREDS, DELIBERATELY, AND NEVER ONE HUNDRED RE-LIT. The obvious cheaper
// figure is a single grid that fills to 88 and then drains to 6, and it is REFUSED: the
// survey reports two rates over its respondents and never says the six are what is left of
// the eighty-eight, so a drawing that carved one out of the other would assert a subset
// relation the source does not measure. Two plates assert only what is quoted — a rate, and
// a rate — and the comparison is made by the eye across a gutter rather than by an animation
// that empties one number into the other.
//
// ═══ AND IT IS NOT A BAR, WHICH IS A RULE RATHER THAN A PREFERENCE. B.1 draws its statistic
// as ONE BAR PARTITIONED 70/30 and E.5 draws three HORIZONTAL BARS with a count-up on each;
// §6.2's rule that two passes may share no image and no statistic is applied across sections
// here, so D.1 spends neither. The encoding is the repeated mark: {@link MARK_SIZE} is one
// square, one square is one organization in a hundred, and every square on both plates is
// the same square.
//
// ═══ THE TWO SHARES ARE THE STATISTIC, AS FRACTIONS, and every count below is DERIVED from
// them rather than typed beside them ({@link ADOPTION_SHARE}, {@link IMPLEMENTATION_SHARE}).
// A reword that moved a figure in `./content.ts` and left a field alone is the one failure
// this slide has that nobody would see on a projector, so they are welded — here by
// derivation, and in `tests/unit/invest-base-rates.test.tsx` by a cross-module assertion that
// the copy's own "88%" and "6%" are the fractions below. This module CANNOT import
// `./content.ts` for the value (that file's `@/` runtime import is documented at its own
// top), so the test is the other end of the weld.
//
// ═══ TWO SHARES, TWO PLATES, ONE POSE EACH — the 2026-08-14 owner cut. The left plate used
// to be measured TWICE, filling to 78 at one pose and on to 88 at the next, so the base rate
// read as a TREND. The trend is gone: the room is shown WHERE EVERYONE IS, once, and the ten
// squares that used to arrive on their own carried a second reading the slide never needed.
// A rate is now one number, one fill and one pose.
//
// ═══ THE MEASURE CHAIN, IN THE ORDER IT IS DECIDED, because every horizontal number on this
// stage falls out of two choices. FIRST the stage is cut into two plates: {@link PLATE_COUNT}
// = 2 plates and one {@link PLATE_GAP} = 72 gutter tile the 1184px content width, so
// {@link PLATE_WIDTH} = (1184 − 72) / 2 = 556. THEN the plate is cut into a grid and a
// column: a square is {@link MARK_SIZE} = 24px with {@link MARK_GAP} = 4, {@link GRID_COLS} =
// 10 squares fill a row, so {@link GRID_SIZE} = `10 × 24 + 9 × 4` = 276 — square, because
// 10 × 10 is the only shape of a hundred a room reads as a hundred without counting — and
// {@link TEXT_COL_WIDTH} takes the remainder, 556 − 276 − 24 = 256.
//
// ═══ THE STAGE FACTS ARE PINNED, NOT RESTATED, exactly as `./subscription-geometry.ts` and
// `./security-geometry.ts` pin theirs: the two facts `./geometry.ts` types LITERALLY are
// pinned through a type-only `import()` that both tsc and Node's type stripper erase, and
// the two it widens to `number` are re-derived by the same arithmetic with the CSS rule
// quoted beside them. `./chicken-egg-geometry.ts` carries the three-way measurement of why
// no specifier for `./geometry` satisfies tsc and bare Node at once while
// `allowImportingTsExtensions` is `false`; it is not re-quoted here.
//
// Proved importable from bare Node, not assumed — the property every geometry module in this
// directory keeps, so a coordinate can be checked without a bundler:
//
//   $ node --experimental-strip-types -e \
//       'import("./src/slides/leader-invest/base-rates-geometry.ts")
//          .then(m => console.log(Object.keys(m).length, "exports"))'
//
// ═══ THE VERTICAL BUDGET, top to bottom, and it is arithmetic rather than measurement.
// `.fig-label` at y=36, `.slide-headline-row` at y=80; a one-line `.slide-headline.small`
// (40px on 1.05) ends the headline row at y=122; band 1 starts on {@link CONTENT_TOP} = 156,
// `.slide-content`'s own top — the call every leader slide in this directory makes.
//
//   ─────────────── BAND 1 · THE UNIT, AND THE SURVEY (full width) ─────────────────────
//   156  eyebrow · 11px mono caps, ONE line                              → 172
//   180  the citation · 10.5px mono, ONE line                            → 196
//
//   ─────────────── BAND 2 · THE TWO PLATES (556 each · 72 gutter) ─────────────────────
//        grid 276 × 276                    │  text column 256
//   224  100 squares, 10 × 10       → 500  │  224  figure · 48px display        → 280
//                                          │  288  label · 11px mono caps, 2 ln → 320
//                                          │  328  the note · 11px mono caps    → 344
//                                          │  372  reading · a bordered box     → 476
//
//   ─────────────── BAND 3 · THE PRICE, ANCHORED TO THE FLOOR ──────────────────────────
//   553  copper rule ···· spans the full width                           → 554
//   590  the closer · 19px serif, full width, ONE line                   → 616
//   ────────────────────────────────────────────────────────────────────────────────────
//   floor y=632 · lowest painted box 616 · {@link NAV_ZONE_CLEARANCE} = 16
//
// ═══ THE READING IS A BORDERED BOX NOW, and it is the one object on this stage that is not
// bare type. Each plate's reading sits inside {@link READING_BOX_HEIGHT} of box with a
// dashed border and the deck's travelling-ants overlay (`.gap-box-live` in
// `src/styles/globals.css`, the same box B.4's open marker stands in). It buys the pair the
// one thing bare type could not: the reading is what the deck CONCLUDES from the plate above
// it, and a frame is what separates a conclusion from a caption at the back of a room. The
// text is vertically CENTRED inside the box rather than set from its top, so the two boxes —
// which are the same height and hold sentences of different lengths — never read as one
// finished and one abandoned.
//
// THE FLOOR IS THE HOVER BAND AND NOT `.slide-content`'s BOTTOM, the same rule all four
// sibling geometry modules keep: `.nav-zone` is `bottom: 0; height: 88px`, so nothing on
// this stage may cross y=632.
//
// ═══ BAND 3 IS MEASURED UPWARD FROM THE FLOOR, AND IT IS THE ONLY BAND IN THIS DIRECTORY
// THAT IS. Every other shelf on every other stage here is derived from the band above it, so
// the bottom of the stage is whatever is left over. The closer is the opposite: its distance
// from the NavBar band is the REQUIREMENT ({@link NAV_ZONE_CLEARANCE} = 16, chosen, and the
// tightest of the five stages in this directory — D.5 keeps 14), and {@link CLOSER_TOP} and
// {@link RULE_TOP} are both derived backwards from it. It used to be a 22px line at y=573,
// one beat under a reading band that ended at 547 — close enough to the evidence to read as
// its caption and large enough to compete with the two figures. It is now 19px on the floor
// of the stage: the last thing on it, ranked BELOW the two quoted percentages in size and
// ABOVE the four lines of reading it closes. A verdict does not need to be the biggest thing
// on a slide; it needs to be the last one and the lowest one. {@link RULE_TOP}'s own guard is
// what keeps the derivation honest — it throws if the air above the rule ever runs out.
//
// ═══ ONE CITATION, FULL WIDTH, ABOVE BOTH PLATES, and its position is the argument. The
// previous cut put a single attribution above two figures because the pair had no named
// upstream owner at all and the honest ceiling was where it had been read. Both figures are
// now the same published survey's, so the citation is a real one — publisher, report, month,
// sample, field window — and it stays ABOVE the plates rather than splitting into two
// captions under them: printing it twice would say two sources, and the fact that ALL THREE
// rates on this stage come from ONE survey is itself the credibility this slide runs on. No
// frame of this slide ever shows an unattributed percentage.
//
// ═══ DECLARATION ORDER IS INITIALISATION ORDER IN THIS FILE, deliberately, and it is not the
// reading order the budget above suggests. The MARKS block sits between band 1 and band 2
// because band 2's own coordinates are derived from the grid's width, and a `const` read
// before its declaration is a temporal-dead-zone throw at module load — which for a geometry
// module means a blank stage at first paint. Sections are ordered so that never happens; the
// `@throws` guards below are function bodies and are therefore free to name anything.
//
// Pure data and pure functions. No React, no DOM, and no work at module scope beyond the
// arithmetic below.

// ───────────────────── the stage, pinned ─────────────────────

/** The ledger module, as a TYPE only — the pin's other end. Same construction, same
 *  reason, as `./subscription-geometry.ts`'s and `./security-geometry.ts`'s. */
type Ledger = typeof import("./geometry");

/** The stage. 1280×720 — the deck's one stage size, PINNED to `./geometry.ts`'s own
 *  `STAGE`, which types it literally. */
export const STAGE: Ledger["STAGE"] = { width: 1280, height: 720 };

/** The deck's side margin — `.fig-label`, `.slide-headline-row` and `.slide-content` all
 *  sit at `left: 48px` in `src/styles/globals.css`. PINNED, like {@link STAGE}. */
export const SIDE_MARGIN: Ledger["SIDE_MARGIN"] = 48;

/** The width every full-bleed box on this stage gets: 1184. RE-DERIVED, NOT PINNED — the
 *  ledger computes this one, so its declared type is the widened `number` and an
 *  annotation could not fail. Same for {@link NAV_ZONE_TOP}. */
export const CONTENT_WIDTH = STAGE.width - 2 * SIDE_MARGIN;

/** `.nav-zone` is `bottom: 0; height: 88px`, so its top edge is y=632 — the floor nothing
 *  on this stage may cross, and the datum band 3 is measured up from. */
export const NAV_ZONE_TOP = STAGE.height - 88;

/** The one shelf band 1 starts on: 156 — `.slide-content`'s own `top`, clearing the 40px
 *  headline row that ends at y=122. */
export const CONTENT_TOP = 156;

// ───────────────────── the registers, as box heights ─────────────────────

/** A one-line mono eyebrow's box: 16. 11px on 1.3 is a 14.30 line box; the box carries 1.70
 *  more. ONE CONSTANT FOR THE THREE one-line mono caps rows on this stage — band 1's eyebrow
 *  and the two plate notes. The same 16 all four siblings cut. */
export const EYEBROW_HEIGHT = 16;

/** The air between a claim and the thing bound to it: 8 — the one adjacency a label may never
 *  lose. It binds each label to the figure it is the predicate of, and each note to that
 *  label. Not exported. */
const BINDING_GAP = 8;

/** A beat change: 28. Every band on this stage starts one of these below the last, and the
 *  reading inside a plate column starts one below the note. Not exported. */
const BAND_GAP = 28;

// ───────────────────── band 1 · the unit, and the survey ─────────────────────

/** Band 1's eyebrow: 156. It carries the UNIT both grids are drawn in, which is why it lands
 *  before a single square is filled. */
export const UNIT_EYEBROW_TOP = CONTENT_TOP;

/**
 * The citation's shelf: 180 — 8px under the eyebrow, ABOVE both plates.
 *
 * See the header: the citation leads the evidence here rather than following it, and it is
 * ONE line for BOTH plates because all three rates on this stage are one survey's.
 */
export const CITATION_TOP = UNIT_EYEBROW_TOP + EYEBROW_HEIGHT + BINDING_GAP;

/** The citation's box: 16, cut for ONE line of 10.5px mono on 1.4 (14.70 painted, 1.30
 *  spare). Above gh#50's 9.5px mono floor.
 *
 *  ONE LINE AND NOT TWO, WHICH IS THE 2026-08-14 OWNER CUT. The citation used to run two
 *  lines and ≈360 characters — a wall of legal text over the evidence it licensed. It names
 *  the same report in ≈165 characters now: publisher, title, month, sample, nations, and the
 *  definition the rare rate is a rate of. A reword past ≈180 characters wraps into a second
 *  line, which a browser check sees and jsdom cannot. */
export const CITATION_HEIGHT = 16;

// ───────────────────── the squares ─────────────────────
//
// Declared before band 2 because band 2's coordinates are derived from them — see the header
// on declaration order.

/**
 * The denominator a percentage already states: 100.
 *
 * NOT A STATISTIC AND NOT AN INVENTION — it is what "%" means, and unlike the previous cut of
 * this module, EVERY PLATE DRAWS ALL HUNDRED. The unfilled squares are the hundred the rate
 * is a rate of; they carry no count of their own on the stage and `./content.ts` prints no
 * number for them. What they buy is that the six read as six IN A HUNDRED rather than as six
 * squares.
 */
export const PER_HUNDRED = 100;

/**
 * The adoption rate the survey measured, as a fraction: 0.88 — a STATISTIC, and the first of
 * the two numbers in this file that is not a layout decision.
 *
 * `investBaseRatesContent.adoptionFigure` prints "88%". THE YEAR-AGO 78% IS GONE from this
 * module and from the stage: the slide states where everyone IS, once, and a rate that
 * arrived in two instalments spent a whole pose on a rise the argument never used.
 */
export const ADOPTION_SHARE = 0.88;

/** The share the same survey calls AI high performers, as a fraction: 0.06. The other end of
 *  the same weld — `investBaseRatesContent.implementationFigure` prints "6%". */
export const IMPLEMENTATION_SHARE = 0.06;

/**
 * How many squares the left plate fills: 88. Derived.
 *
 * ROUNDED AS A GUARD, NOT AS A FIX — and the two shares this file actually holds do not need
 * it. Measured with `node`: `0.88 * 100 === 88` and `0.06 * 100 === 6` are both `true`. The
 * GENERAL concern is real, though: `0.29 * 100` is `28.999999999999996447` and `0.55 * 100`
 * is `55.000000000000007105`, neither of which is an integer. IEEE 754 doubles cannot
 * represent most two-decimal fractions, so whether `share * 100` lands on a whole number is a
 * property of the particular share and not of the arithmetic.
 *
 * WHICH IS WHY THE `Math.round` STAYS. These are QUOTED STATISTICS and the next revision of
 * the survey may quote 0.29 or 0.55 instead; without the round, a share a hair below its
 * integer would fill one square fewer than the figure beside it claims.
 */
export const ADOPTION_COUNT = Math.round(ADOPTION_SHARE * PER_HUNDRED);

/** How many squares the right plate fills: 6. Derived and rounded for
 *  {@link ADOPTION_COUNT}'s reason, and exact for the same reason too — `0.06 * 100 === 6` is
 *  `true` today, and the guard is there for the share that replaces it. */
export const IMPLEMENTATION_COUNT = Math.round(IMPLEMENTATION_SHARE * PER_HUNDRED);

/**
 * How many squares fill a row of either grid: 10.
 *
 * TEN AND NOT TWENTY-SIX, AND THE CHANGE OF SHAPE IS THE REWORK. The previous cut tiled 26
 * columns because 26 divides 78 exactly and a ragged last row would have drawn the eye to a
 * remainder. Nothing needs to divide now: both grids hold all hundred squares, so the shape
 * is free to be the one a room reads as a hundred WITHOUT COUNTING, and that shape is the
 * square. 10 × 10 also makes a fill legible by ROWS — 88 filled is "nearly nine rows", 6
 * filled is "most of one" — which is a second reading of the same number that a 26-wide strip
 * cannot give.
 */
export const GRID_COLS = 10;

/** How many rows either grid has: 10. Derived, so a grid is always the hundred it claims. */
export const GRID_ROWS = PER_HUNDRED / GRID_COLS;

/** The air between two squares: 4 — a sixth of a square. Wide enough that a filled
 *  block reads as SEPARATE squares at the back of a room rather than as a solid bar, which is
 *  the whole difference between a count and a length. Not exported. */
const MARK_GAP = 4;

/** One square: 24px. The chosen unit, and the head of the measure chain in the header — big
 *  enough to survive a projector, small enough that a hundred of them and their gaps fit
 *  beside a text column twice over. */
export const MARK_SIZE = 24;

/** The outline an unfilled square carries: 1px. Restated here because jsdom computes no
 *  stylesheet, so a test that read this off the DOM would read `NaN`; the colour is
 *  `../components/BaseRatesBeats.tsx`'s tier table, not this module's. */
export const MARK_BORDER = 1;

/** How far apart two squares sit: 28. Derived. */
export const MARK_PITCH = MARK_SIZE + MARK_GAP;

/** One grid, both ways: 276 — `10 × 24 + 9 × 4`. Square, so it tiles exactly and no square is
 *  a fractional pixel. */
export const GRID_SIZE = GRID_COLS * MARK_SIZE + (GRID_COLS - 1) * MARK_GAP;

/** All three square functions share one guard, so an index one of them accepts is always an
 *  index the others place. Not exported. */
function assertMark(fn: string, index: number): void {
  if (!Number.isInteger(index) || index < 0 || index >= PER_HUNDRED) {
    throw new Error(
      `${fn}: no square ${index} — a plate is a whole hundred (0…${PER_HUNDRED - 1}), which ` +
        `is what "%" means and not a layout choice. A square ${PER_HUNDRED} would open an ` +
        `eleventh row and push the grid ${MARK_PITCH}px past its own bottom at ` +
        `y=${GRID_TOP + GRID_SIZE}, and the closer already ends ${NAV_ZONE_CLEARANCE}px ` +
        `above the NavBar band at y=${NAV_ZONE_TOP}.`,
    );
  }
}

/**
 * Square `index`'s left edge, INSIDE its own grid: 0, 28, 56 … 252, then back to 0.
 *
 * GRID-LOCAL AND NOT STAGE-ABSOLUTE — the one set of placement functions in this directory
 * that is not measured against the stage, and the reason is that there are TWO grids. Each
 * plate mounts one positioned wrapper and its hundred squares are plain boxes inside it, so
 * their coordinates are the wrapper's and the same two functions place both plates.
 * {@link plateLeft} and {@link GRID_TOP} are the stage-absolute half.
 *
 * ROW-MAJOR, which is also the ARRIVAL ORDER: `../components/BaseRatesBeats.tsx` staggers
 * each square's own reveal by its index, so a plate BUILDS left-to-right and top-to-bottom
 * the way a page is read — frame and fill together, one square at a time. A quantity has no
 * order of its own — no square means anything the one beside it does not — so reading order
 * is the only order there is.
 *
 * @throws on a square past the hundred — see {@link assertMark}.
 */
export function markLeft(index: number): number {
  assertMark("markLeft", index);
  return (index % GRID_COLS) * MARK_PITCH;
}

/**
 * Square `index`'s top edge, INSIDE its own grid: 0, 28 … 252.
 *
 * The other half of {@link markLeft}'s row-major fill, and it guards its own index rather
 * than leaning on that one's: `100 % 10` is a legal column, so a 101st square would otherwise
 * be placed silently on top of the 91st.
 *
 * @throws on a square past the hundred — see {@link assertMark}.
 */
export function markTop(index: number): number {
  assertMark("markTop", index);
  return Math.floor(index / GRID_COLS) * MARK_PITCH;
}

/**
 * Is square `index` filled on a plate whose count is `count`?
 *
 * THE ONE PLACE THE FIGURE AND THE DRAWING MEET, and it is a pure function so the test can
 * hold it against the copy's own percentages without rendering anything. Row-major, so a
 * plate's filled squares are always a prefix of the reading order and a plate never has a
 * hole in it.
 *
 * @throws on a square past the hundred — see {@link assertMark} — and on a count no plate on
 *         this stage fills.
 */
export function isFilled(index: number, count: number): boolean {
  assertMark("isFilled", index);
  if (!Number.isInteger(count) || count < 1 || count > PER_HUNDRED) {
    throw new Error(
      `isFilled: no plate fills ${count} squares — this stage fills ${ADOPTION_COUNT} and ` +
        `${IMPLEMENTATION_COUNT}, both derived from the quoted rates (${ADOPTION_SHARE} and ` +
        `${IMPLEMENTATION_SHARE} of ${PER_HUNDRED}). A third count would be a rate this deck ` +
        `does not quote.`,
    );
  }
  return index < count;
}

// ───────────────────── band 2 · the two plates ─────────────────────

/** How many plates the stage is cut into: 2 — a literal `const`, so the weld at
 *  {@link plateLeft} is compile-visible. One plate per rate, and the left one is measured
 *  twice. */
export const PLATE_COUNT = 2;

/** The gutter between the two plates: 72. The widest gap on this stage, and it is doing work:
 *  the two plates are two SEPARATE hundreds, and the air between them is what keeps the right
 *  one from reading as the left one's remainder. */
export const PLATE_GAP = 72;

/**
 * One plate: 556, and the two are EQUAL.
 *
 * THE STAGE IS NOT CUT 88/6, AND THAT IS THE DECISION. The counts are unequal; the two CLAIMS
 * are the same size of claim — what a common position is worth against what a rare one is —
 * and cutting the plates to the rates would say the majority reading matters fourteen times
 * more, which is the opposite of what the copy says. Equal plates, unequal fills, and the
 * fills are the statistic.
 */
export const PLATE_WIDTH = (CONTENT_WIDTH - PLATE_GAP) / PLATE_COUNT;

/**
 * Plate `index`'s left edge, in stage coordinates: 48, 676.
 *
 * ABSOLUTE AND NOT SLOT-RELATIVE, like every placement function in this directory except the
 * three grid ones, which say why they are not.
 *
 * @throws on a third plate — the stage holds one plate per quoted rate, and a third would be
 *         a rate this deck does not quote.
 */
export function plateLeft(index: number): number {
  if (!Number.isInteger(index) || index < 0 || index >= PLATE_COUNT) {
    throw new Error(
      `plateLeft: no plate ${index} — the stage is one plate per quoted rate ` +
        `(0…${PLATE_COUNT - 1}), tiling the ${CONTENT_WIDTH}px content width ` +
        `(${PLATE_COUNT} × ${PLATE_WIDTH} + ${PLATE_GAP}).`,
    );
  }
  return SIDE_MARGIN + index * (PLATE_WIDTH + PLATE_GAP);
}

/** Both grids' top edge, ONE number: 240 — a beat below the citation that attributes them.
 *  The two plates rest on one shelf, because two hundreds at two heights would rank one. */
export const GRID_TOP = CITATION_TOP + CITATION_HEIGHT + BAND_GAP;

/** Where both grids end: 516. Derived. */
export const GRID_BOTTOM = GRID_TOP + GRID_SIZE;

/** The gutter between a plate's grid and its text column: 24. Not exported. */
const TEXT_COL_GAP = 24;

/** A plate's text column: 256. The REMAINDER of the measure chain — the grid tiles first and
 *  the column takes what is left, which is what sets the two labels' wrap. */
export const TEXT_COL_WIDTH = PLATE_WIDTH - GRID_SIZE - TEXT_COL_GAP;

/**
 * Plate `index`'s text column left edge, in stage coordinates: 348, 976.
 *
 * @throws on a third plate — {@link plateLeft} guards it.
 */
export function textColLeft(index: number): number {
  return plateLeft(index) + GRID_SIZE + TEXT_COL_GAP;
}

/** Both figures' shelf: 240 — the grid's own top, so a rate and the hundred it is a rate of
 *  start on the same line. */
export const FIGURE_TOP = GRID_TOP;

/**
 * A figure's box: 56, cut for ONE line of 48px display serif on 1.05.
 *
 * 48 AND NOT MORE, WHICH IS THE ONE TYPE DECISION ON THIS STAGE WORTH ARGUING. These two
 * numerals are the largest thing under the headline and they should be; but the headline is
 * 40px, and a figure set larger than the claim it is evidence for inverts the slide's own
 * order — the rule `gap-hardest-part` records when it puts its headline in front of its
 * statistic. Instrument Serif reads narrower than its point size at this measure, so 48px of
 * it sits UNDER a 40px line of the same face in optical weight while still being the loudest
 * object on the stage.
 */
export const FIGURE_HEIGHT = 56;

/** Both labels' shelf: 304 — 8px under the figure each one is the predicate of, so a label can
 *  never be read against the wrong percentage. */
export const LABEL_TOP = FIGURE_TOP + FIGURE_HEIGHT + BINDING_GAP;

/** A label's box: 32, cut for TWO lines of 11px mono caps on 1.3 (28.60 painted, 3.40 spare).
 *  ONE HEIGHT FOR BOTH, so the band does not step when one label wraps and the other does not
 *  — and today one does: the left plate's label runs ≈480px at 0.22em tracking in a 256px
 *  column, the right plate's ≈200px on one line. */
export const LABEL_HEIGHT = 32;

/** Both notes' shelf: 344 — 8px under the label. The note is the one string on a plate that
 *  says WHEN the rate was measured, which is what lets the left plate print two figures from
 *  one survey without either of them being undated. */
export const NOTE_TOP = LABEL_TOP + LABEL_HEIGHT + BINDING_GAP;

/** Where a plate's note ends: 360. Derived; the note takes the shared
 *  {@link EYEBROW_HEIGHT}. */
export const NOTE_BOTTOM = NOTE_TOP + EYEBROW_HEIGHT;

/** Both readings' shelf: 372 — a beat below the note, INSIDE the plate whose rate it reads.
 *  The readings used to be a band of their own across the bottom of the stage; they are a
 *  plate's own last line now, which is what freed the floor for the closer. */
export const READING_TOP = NOTE_BOTTOM + BAND_GAP;

/** The air a reading keeps inside its own border: 14 horizontally, 12 vertically. Wide enough
 *  that the frame reads as a box around a sentence rather than as a rule touching it. */
export const READING_PAD_X = 14;
export const READING_PAD_Y = 12;

/** The border a reading's box carries: 1px, dashed. Restated here because jsdom computes no
 *  stylesheet; the colour is `../components/BaseRatesBeats.tsx`'s tier table. */
export const READING_BORDER = 1;

/**
 * A reading's BOX: 104 — the frame, not the type.
 *
 * ONE HEIGHT FOR BOTH PLATES, so the band does not step when one sentence is reworded a word
 * shorter than the other — the two are read as a pair and an offset between them would read
 * as a mistake. The box holds {@link READING_TEXT_HEIGHT} of measure between
 * {@link READING_PAD_Y} of air and its own 1px border, and the type inside is CENTRED
 * vertically rather than set from the top: the two sentences do not wrap to the same number
 * of lines, and centring is what keeps the shorter one from looking like an unfinished box.
 */
export const READING_BOX_HEIGHT = 104;

/**
 * The measure a reading's type actually gets: 78 — four lines of 15px serif on 1.4 (84.00
 * painted) is MORE than this, deliberately, because the box centres its type and the two
 * sentences are cut for THREE lines in the ≈228px column the padding leaves.
 *
 * FOUR LINES STILL FIT the box without touching its border, because the type is centred and
 * `overflow` is never clipped; what the number states is the budget a reword is expected to
 * stay inside. A browser check is the only thing that sees a real wrap.
 */
export const READING_TEXT_HEIGHT = READING_BOX_HEIGHT - 2 * READING_PAD_Y - 2 * READING_BORDER;

/** A reading's own measure: 226 — the column minus its box's padding and border. Derived from
 *  {@link TEXT_COL_WIDTH}, which is itself the remainder of the measure chain. */
export const READING_TEXT_WIDTH =
  TEXT_COL_WIDTH - 2 * READING_PAD_X - 2 * READING_BORDER;

/** Where the deeper of a plate's two columns ends: 500 — the grid, not the text column (476).
 *  Not exported; {@link RULE_TOP}'s guard is what uses it. */
const PLATE_BOTTOM = Math.max(GRID_BOTTOM, READING_TOP + READING_BOX_HEIGHT);

// ───────────────────── band 3 · the price, measured up from the floor ─────────────────────

/**
 * What is left between the closer and the NavBar's hover band: 16px — CHOSEN, not left over,
 * and the only figure in this file that band 3 does not derive.
 *
 * See the header: band 3 is measured UPWARD from y={@link NAV_ZONE_TOP} because the closer
 * sitting on the floor of the stage is the requirement rather than the remainder. 16 is the
 * tightest clearance of the five stages in this directory (D.5 keeps 14, D.4 keeps 26) and it
 * is deliberate: the line is the last thing the room reads and the closest thing to the edge.
 */
export const NAV_ZONE_CLEARANCE = 16;

/** The closer's box: 26, cut for ONE line of 19px serif on 1.3 (24.70 line box, 25.61
 *  painted). NINETEEN AND NOT TWENTY-TWO: it ranks under the two 48px figures it prices and
 *  over the 15px readings it closes, which is the whole of what a verdict's size has to
 *  say. */
export const CLOSER_HEIGHT = 26;

/** The closer's shelf: 590. Full width, alone, and as low as the NavBar band allows —
 *  DERIVED BACKWARDS from {@link NAV_ZONE_CLEARANCE}. */
export const CLOSER_TOP = NAV_ZONE_TOP - NAV_ZONE_CLEARANCE - CLOSER_HEIGHT;

/** `.copper-rule` is `height: 1px` in `src/styles/globals.css` — restated, because jsdom
 *  computes no stylesheet and a test that read this box's height off the DOM would read
 *  `NaN`. */
export const RULE_HEIGHT = 1;

/** The air between the rule and the closer it opens for: 36. Wider than a
 *  {@link BAND_GAP}, because the rule divides the SLIDE and not two bands of it. Not
 *  exported. */
const RULE_TO_CLOSER = 36;

/**
 * The copper rule's shelf: 553. Full width — above it is what was reported and what each rate
 * buys, below it is the one line this deck asks the room to leave with.
 *
 * DERIVED BACKWARDS from {@link CLOSER_TOP}, which is derived from the floor, so this is the
 * one shelf on this stage that moves when the NavBar band moves rather than when the content
 * above it does. That inverts the usual failure mode — a band that grows no longer pushes the
 * closer into the NavBar, it collides with the rule instead — so the collision is checked
 * here, once, at module load.
 *
 * @throws if band 2 has grown into band 3. The guard is a module-scope side effect, which
 *         this file otherwise forbids; it is here because the alternative is a silent overlap
 *         that only a screenshot would catch.
 */
export const RULE_TOP = (() => {
  const top = CLOSER_TOP - RULE_TO_CLOSER - RULE_HEIGHT;
  if (top <= PLATE_BOTTOM) {
    throw new Error(
      `RULE_TOP: band 2 ends at y=${PLATE_BOTTOM} and the rule is derived backwards from ` +
        `the floor to y=${top}. Band 3 is anchored to the NavBar band at y=${NAV_ZONE_TOP} ` +
        `(clearance ${NAV_ZONE_CLEARANCE}), so a plate that grows cannot push the closer ` +
        `down — it collides with the rule. Cut the plate, not the clearance.`,
    );
  }
  return top;
})();

/** The air band 3 leaves above its own rule: 37px. Exported because it is the slack an edit
 *  to band 2 spends, and a test can watch it shrink toward zero before {@link RULE_TOP}
 *  throws. */
export const RULE_HEADROOM = RULE_TOP - PLATE_BOTTOM;
