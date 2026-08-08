// The base rate, as numbers — stage coordinates for a 1280×720 stage.
//
// FOUR BANDS DOWN THE STAGE, AND THE SECOND ONE IS THE ARGUMENT. Band 1 is the eyebrow
// with the attribution bound under it; band 2 is the pair itself — two rows, each a
// percentage and its label on the left and a FIELD OF MARKS on the right; one copper
// rule closes the evidence; band 3 says what each rate is worth in two equal columns;
// band 4 is the closer, full width, alone.
//
// THE FIGURE IS A COUNT AND NOT A LENGTH, AND THAT IS WHY THIS FILE EXISTS AND NOT A
// SECOND COPY OF `src/slides/leader-gap/hardest-part-geometry.ts`. B.1 draws its
// statistic as ONE BAR PARTITIONED 70/30: two segments that tile one measure, so the eye
// reads two LENGTHS that share an edge and sum to a whole. Nothing about this slide's
// pair works that way. 78% and 6% are TWO RATES over the same population, quoted with the
// word "versus" and NOT with "of which" — the source
// (`docs/researches/2026-07-31-hr-group-agentic-org-analysis.md` line 106) never says the
// six are a subset of the seventy-eight — so a drawing that carved one out of the other
// would assert containment the source does not, and two bars from a shared left edge
// would invite the eye to sum them. THE ENCODING HERE IS THEREFORE THE REPEATED MARK:
// {@link MARK_SIZE} is one square, one square is one organization in a hundred, and every
// square on the stage is the same square. What differs between the two rows is HOW MANY,
// which is the only difference the source states. It is also the only encoding in which
// the two numbers read as what they are at the back of a room — a crowd nobody can count,
// and six things anybody can.
//
// AND IT IS A RULE RATHER THAN A PREFERENCE. §6.2 states that the deck's repeated passes
// degenerate "the moment two of the three passes share an image or a statistic", and
// gh#70 applies the same test across sections: B.1 already spent the split bar and the
// 70%, so D.1 may spend neither.
//
// THE TWO SHARES ARE THE STATISTIC, AS FRACTIONS, and every count and every box width
// below is DERIVED from them rather than typed beside them ({@link ADOPTION_SHARE},
// {@link IMPLEMENTATION_SHARE}). A reword that moved a figure in `./content.ts` and left
// a field alone is the one failure this slide has that nobody would see on a projector,
// so the two are welded — here by derivation, and in
// `tests/unit/invest-base-rates.test.tsx` by a cross-module assertion that the copy's own
// "78%" and "6%" are the fractions below. That is the weld B.1 keeps between its
// `PEOPLE_SHARE` and its quoted sentence, kept the same way for the same reason: this
// module CANNOT import `./content.ts` for the value (that file's `@/` runtime import is
// documented at its own top), so the test is the other end of the weld.
//
// THE MEASURE CHAIN, IN THE ORDER IT IS DECIDED, because every horizontal number on this
// stage falls out of one choice: a mark is {@link MARK_SIZE} = 24px square with
// {@link MARK_GAP} = 8 between marks, {@link FIELD_COLS} = 26 marks fill a row, so
// {@link FIELD_WIDTH} = `26 × 24 + 25 × 8` = 824 and {@link FIGURE_COL_WIDTH} takes the
// remainder, 1184 − 28 − 824 = 332. Nothing is measured; the field tiles and the figure
// column is what is left, which at 332 is 80px wider than the longest label it carries.
//
// THE STAGE FACTS ARE PINNED, NOT RESTATED, exactly as `./subscription-geometry.ts` and
// `./security-geometry.ts` pin theirs: the two facts `./geometry.ts` types LITERALLY are
// pinned through a type-only `import()` that both tsc and Node's type stripper erase, and
// the two it widens to `number` are re-derived by the same arithmetic with the CSS rule
// quoted beside them. `./chicken-egg-geometry.ts` carries the three-way measurement of
// why no specifier for `./geometry` satisfies tsc and bare Node at once while
// `allowImportingTsExtensions` is `false`; it is not re-quoted here.
//
// Proved importable from bare Node, not assumed — the property every geometry module in
// this directory keeps, so a coordinate can be checked without a bundler:
//
//   $ node --experimental-strip-types -e \
//       'import("./src/slides/leader-invest/base-rates-geometry.ts")
//          .then(m => console.log(Object.keys(m).length, "exports"))'
//
// THE VERTICAL BUDGET, top to bottom, and it is arithmetic rather than measurement.
// `.fig-label` at y=36, `.slide-headline-row` at y=80; a one-line `.slide-headline.small`
// (40px on 1.05) ends the headline row at y=122; band 1 starts on {@link CONTENT_TOP} =
// 156, `.slide-content`'s own `top` — the call every leader slide in this directory makes.
//
//   ─────────────── BAND 1 · WHAT THIS IS, AND WHERE IT CAME FROM (full width) ─────────
//   156  eyebrow · 11px mono caps, ONE line                              → 172
//   180  the attribution · 10.5px mono, ONE line                         → 196
//
//   ─────────────── BAND 2 · THE PAIR (figure column 332 · field 824) ──────────────────
//        ROW A · ADOPTION
//   224  "78%" · 36px mono          │  224  78 marks, 26 × 3            → 274 / 312
//   282  "HAVE ADOPTED AI" · 11px mono caps                             → 298
//        ROW B · PROPER IMPLEMENTATION
//   340  "6%" · 36px mono           │  340  6 marks, 6 × 1              → 390 / 364
//   398  "HAVE IMPLEMENTED IT PROPERLY"                                 → 414
//
//   442  copper rule ···· spans the full width                          → 443
//
//   ─────────────── BAND 3 · WHAT EACH RATE BUYS (two EQUAL columns of 578) ────────────
//   471  eyebrow · full width                                           → 487
//   499  common line │ rare line · 17px serif, TWO lines each           → 547
//
//   ─────────────── BAND 4 · THE CLOSER ────────────────────────────────────────────────
//   573  closer · 22px serif, full width, ONE line                      → 605
//   ────────────────────────────────────────────────────────────────────────────────────
//   floor y=632 · lowest painted box 605 · {@link NAV_ZONE_CLEARANCE} = 27
//
// THE FLOOR IS THE HOVER BAND AND NOT `.slide-content`'s BOTTOM, the same rule all four
// sibling geometry modules keep: `.nav-zone` is `bottom: 0; height: 88px`, so nothing on
// this stage may cross y=632.
//
// THE ATTRIBUTION IS BOUND TO THE EYEBROW AND NOT TO THE FIGURES, which is the opposite
// of B.1's arrangement and is a decision `./content.ts` argues at length: when the
// strongest claim available about a number is WHERE IT WAS READ, the stage says that
// before it shows the number. Geometrically it costs nothing — {@link SOURCE_TOP} takes
// the same 8px binding gap B.1 spends putting its citation under its statistic — and it
// buys the property that no pose of this slide ever shows an unattributed percentage.
//
// DECLARATION ORDER IS INITIALISATION ORDER IN THIS FILE, deliberately, and it is not the
// reading order the budget above suggests. The MARKS block sits between band 1 and band
// 2 because band 2's own coordinates are derived from the field's width and depth, and a
// `const` read before its declaration is a temporal-dead-zone throw at module load —
// which for a geometry module means a blank stage at first paint. Sections are ordered so
// that never happens; the four `@throws` guards below are function bodies and are
// therefore free to name anything.
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
 *  on this stage may cross. */
export const NAV_ZONE_TOP = STAGE.height - 88;

/** The one shelf band 1 starts on: 156 — `.slide-content`'s own `top`, clearing the 40px
 *  headline row that ends at y=122. */
export const CONTENT_TOP = 156;

// ───────────────────── the registers, as box heights ─────────────────────

/** A mono eyebrow's box: 16. 11px on 1.3 is a 14.30 line box; the box carries 1.70 more.
 *  ONE CONSTANT FOR ALL FOUR mono caps rows on this stage — band 1's eyebrow, the two row
 *  labels, band 3's eyebrow. The same 16 all four siblings cut. */
export const EYEBROW_HEIGHT = 16;

/** The air between a label and the body it labels: 12 — the section's binding gap. Not
 *  exported. */
const LABEL_TO_BODY = 12;

/** The air between a claim and the thing bound to it: 8 — tighter than
 *  {@link LABEL_TO_BODY} on purpose, and the one adjacency a citation may never lose. It
 *  binds the attribution to the eyebrow that says what is being attributed, and each row
 *  label to the figure above it. Not exported. */
const BINDING_GAP = 8;

/** A beat change: 28. Every band on this stage starts one of these below the last. Not
 *  exported. */
const BAND_GAP = 28;

// ───────────────────── band 1 · what this is, and where it came from ─────────────────────

/** Band 1's eyebrow: 156. It carries the UNIT the mark fields are drawn in, which is why
 *  it lands before anything is drawn. */
export const STATISTIC_EYEBROW_TOP = CONTENT_TOP;

/**
 * The attribution's shelf: 180 — 8px under the eyebrow, ABOVE the two figures.
 *
 * See the header: the citation leads the evidence here rather than following it, because
 * the provenance is the weakest thing about this pair and no room may read either
 * percentage before it is told what it is reading.
 */
export const SOURCE_TOP = STATISTIC_EYEBROW_TOP + EYEBROW_HEIGHT + BINDING_GAP;

/** The attribution's box: 16, cut for ONE line of 10.5px mono (a 13.65 line box, 2.35
 *  spare). Above gh#50's 9.5px mono floor. A reword past ≈185 characters wraps into band
 *  2, which a browser check sees and jsdom cannot. */
export const SOURCE_HEIGHT = 16;

// ───────────────────── the marks ─────────────────────
//
// Declared before band 2 because band 2's coordinates are derived from them — see the
// header on declaration order.

/**
 * The denominator a percentage already states: 100.
 *
 * NOT A STATISTIC AND NOT AN INVENTION — it is what "%" means. It is exported because the
 * two counts below are derived through it and because `./content.ts`'s eyebrow says it out
 * loud on the stage ("ONE MARK IS ONE ORGANIZATION IN A HUNDRED"). NO FIELD DRAWS ALL
 * HUNDRED: painting the twenty-two that adopted nothing would put a third quantity on the
 * stage that the source never states, and gh#70's AC forbids one.
 */
export const PER_HUNDRED = 100;

/**
 * The adoption rate, as a fraction: 0.78 — THE STATISTIC, and one of the two numbers in
 * this file that is not a layout decision.
 *
 * It exists so {@link ADOPTION_COUNT} is DERIVED from the quoted figure instead of typed
 * beside it. `tests/unit/invest-base-rates.test.tsx` holds it against
 * `investBaseRatesContent.adoptionFigure`, which prints "78%".
 */
export const ADOPTION_SHARE = 0.78;

/** The proper-implementation rate, as a fraction: 0.06. The other end of the same weld —
 *  `investBaseRatesContent.implementationFigure` prints "6%". */
export const IMPLEMENTATION_SHARE = 0.06;

/**
 * How many marks the upper field holds: 78. Derived.
 *
 * ROUNDED AS A GUARD, NOT AS A FIX — AND THE TWO SHARES THIS FILE ACTUALLY HOLDS DO NOT
 * NEED IT. Measured with `node`: `(0.78 * 100).toPrecision(20)` is `78.000000000000000000`
 * and `0.78 * 100 === 78` is `true`; the same holds for `0.06 * 100 === 6`. An earlier
 * revision of this comment claimed `78.00000000000001` and `6.000000000000001`, which is
 * false for both, and it is corrected here rather than deleted because the GENERAL concern
 * is real: `0.29 * 100` is `28.999999999999996447`, `0.07 * 100` is `7.0000000000000008882`
 * and `0.55 * 100` is `55.000000000000007105`, none of which is an integer. IEEE 754
 * doubles cannot represent most two-decimal fractions, so whether `share * 100` lands on a
 * whole number is a property of the particular share and not of the arithmetic.
 *
 * WHICH IS WHY THE `Math.round` STAYS. {@link ADOPTION_SHARE} is a QUOTED STATISTIC and the
 * next revision of the source may quote 0.29 or 0.55 instead; without the round, a share
 * that lands a hair below its integer would make {@link fieldRows} return 4 and paint a
 * fourth row holding one mark nobody can account for. The round costs nothing today and
 * removes a failure mode that would arrive with a content edit, not a code one.
 */
export const ADOPTION_COUNT = Math.round(ADOPTION_SHARE * PER_HUNDRED);

/** How many marks the lower field holds: 6. Derived and rounded for
 *  {@link ADOPTION_COUNT}'s reason, and exact for the same reason too — `0.06 * 100 === 6`
 *  is `true` today, and the guard is there for the share that replaces it. */
export const IMPLEMENTATION_COUNT = Math.round(IMPLEMENTATION_SHARE * PER_HUNDRED);

/**
 * How many marks a full row of either field holds: 26.
 *
 * THE ONLY FACTOR OF {@link ADOPTION_COUNT} THAT WORKS ON THIS STAGE, and the other
 * candidates are recorded so nobody re-opens the choice. 78 factorises as
 * 1·2·3·6·13·26·39·78, and the field has ≈824px of stage to tile at {@link MARK_GAP}:
 *
 *   13 columns → a 56px mark and SIX rows, 376px deep — deeper than the whole lower stage.
 *   26 columns → a 24px mark and THREE rows, 88px deep. Whole pixels, and the count fills
 *                every row exactly, so the field has no ragged last line to explain.
 *   39 columns → a 13.3px mark — not a whole pixel, and below the size at which a
 *                projected square is a square rather than a speck.
 *
 * A COUNT THAT DIVIDES EXACTLY IS THE POINT. A ragged final row would draw the eye to the
 * remainder — a number the source does not state — instead of to the mass.
 */
export const FIELD_COLS = 26;

/** The air between two marks: 8 — the same gap the citations bind at, and one third of a
 *  mark. Wide enough that the field reads as SEPARATE marks at the back of a room rather
 *  than as a solid block, which is the whole difference between a count and a bar. Not
 *  exported. */
const MARK_GAP = 8;

/** One mark: a 24px square. The chosen unit, and the head of the measure chain in the
 *  header — big enough to survive a projector, small enough that 26 of them and their
 *  gaps leave a usable figure column. */
export const MARK_SIZE = 24;

/** How far apart two marks sit: 32. Derived. */
export const MARK_PITCH = MARK_SIZE + MARK_GAP;

/** The mark field's width: 824. Derived — `26 × 24 + 25 × 8` — so a full row tiles it
 *  exactly and no mark is a fractional pixel. */
export const FIELD_WIDTH = FIELD_COLS * MARK_SIZE + (FIELD_COLS - 1) * MARK_GAP;

/** The three field functions share one guard: a field holds at least one mark and never
 *  more than the adoption count. Not exported. */
function assertCount(fn: string, count: number): void {
  if (!Number.isInteger(count) || count < 1 || count > ADOPTION_COUNT) {
    throw new Error(
      `${fn}: no field of ${count} marks — this stage draws exactly two, of ` +
        `${ADOPTION_COUNT} and ${IMPLEMENTATION_COUNT} marks, both derived from the ` +
        `quoted rates (${ADOPTION_SHARE} and ${IMPLEMENTATION_SHARE} of ` +
        `${PER_HUNDRED}). A third field would be a third rate, and the source states two.`,
    );
  }
}

/**
 * How many rows a field of `count` marks takes: 3 for the adoption field, 1 for the
 * implementation one.
 *
 * @throws on a count no field on this stage holds — see {@link assertCount}.
 */
export function fieldRows(count: number): number {
  assertCount("fieldRows", count);
  return Math.ceil(count / FIELD_COLS);
}

/**
 * How wide a field of `count` marks is: 824 for the adoption field, 184 for the
 * implementation one.
 *
 * DERIVED AND NOT {@link FIELD_WIDTH} FOR BOTH. A six-mark field placed in an 824px box
 * would be 640px of invisible element sitting under the stage's right margin, and any
 * check that measured "the field" would measure the box rather than the marks.
 *
 * @throws on a count no field on this stage holds — see {@link assertCount}.
 */
export function fieldWidth(count: number): number {
  assertCount("fieldWidth", count);
  return Math.min(count, FIELD_COLS) * MARK_PITCH - MARK_GAP;
}

/**
 * How deep a field of `count` marks is: 88 for the adoption field, 24 for the
 * implementation one.
 *
 * @throws on a count no field on this stage holds — {@link fieldRows} guards it.
 */
export function fieldHeight(count: number): number {
  return fieldRows(count) * MARK_PITCH - MARK_GAP;
}

/** The two placement functions below share one guard, so an index one of them accepts is
 *  always an index the other places. Not exported. */
function assertMark(fn: string, index: number): void {
  if (!Number.isInteger(index) || index < 0 || index >= ADOPTION_COUNT) {
    throw new Error(
      `${fn}: no mark ${index} — the deepest field on this stage holds ` +
        `${ADOPTION_COUNT} marks (0…${ADOPTION_COUNT - 1}), which is ` +
        `${ADOPTION_SHARE} × ${PER_HUNDRED} and not a layout choice. A mark ` +
        `${ADOPTION_COUNT} would open a fourth row and push every band below band 2 ` +
        `down ${MARK_PITCH}px, and the closer already ends ${NAV_ZONE_CLEARANCE}px ` +
        `above the NavBar band at y=${NAV_ZONE_TOP}.`,
    );
  }
}

/**
 * Mark `index`'s left edge, INSIDE its own field: 0, 32, 64 … 800, then back to 0.
 *
 * FIELD-LOCAL AND NOT STAGE-ABSOLUTE — the one place in this directory where a placement
 * function is not measured against the stage, and the reason is the reveal rather than the
 * layout. A FIELD ARRIVES AS ONE BOX: seventy-eight `Reveal`s at the section's 90ms
 * stagger would take seven seconds to fill, and the claim is the SIZE of the crowd, not
 * the order it turned up in. So `../components/BaseRatesBeats.tsx` mounts one positioned
 * wrapper per field and the marks are plain boxes inside it, which makes their coordinates
 * the wrapper's. {@link FIELD_LEFT}, {@link ADOPTION_TOP} and {@link IMPLEMENTATION_TOP}
 * are the stage-absolute half.
 *
 * ROW-MAJOR, unlike `hardest-part-geometry.ts`'s column-major sub-columns: those five
 * items are an ordered list whose order is the argument, and these marks are a QUANTITY —
 * no mark means anything the one beside it does not, so reading order is the only order
 * there is.
 *
 * @throws on a mark past the deepest field — see {@link assertMark}.
 */
export function markLeft(index: number): number {
  assertMark("markLeft", index);
  return (index % FIELD_COLS) * MARK_PITCH;
}

/**
 * Mark `index`'s top edge, INSIDE its own field: 0, 32, 64.
 *
 * The other half of {@link markLeft}'s row-major fill, and it guards its own index rather
 * than leaning on that one's: `78 % 26` is a legal column, so a 79th mark would otherwise
 * be placed silently on top of the 53rd.
 *
 * @throws on a mark past the deepest field — see {@link assertMark}.
 */
export function markTop(index: number): number {
  assertMark("markTop", index);
  return Math.floor(index / FIELD_COLS) * MARK_PITCH;
}

// ───────────────────── band 2 · the pair ─────────────────────

/** The gutter between the figure column and the mark field: 28 — the beat-change gap,
 *  because a figure and its field are two readings of one fact rather than two items in a
 *  list. Not exported. */
const FIGURE_COL_GAP = 28;

/** The left column, which holds one figure and its label: 332. The REMAINDER of the
 *  measure chain — the field tiles first and this column takes what is left, which is
 *  80px wider than the longest label it carries. */
export const FIGURE_COL_WIDTH = CONTENT_WIDTH - FIGURE_COL_GAP - FIELD_WIDTH;

/** The mark field's left edge: 408. `408 + 824 = 1232 = 1280 − 48`, so the field ends on
 *  the stage's right margin. */
export const FIELD_LEFT = SIDE_MARGIN + FIGURE_COL_WIDTH + FIGURE_COL_GAP;

/** Row A's shelf — the figure's top edge and its field's top edge, ONE number: 224. The
 *  numeral and the marks it counts start on the same line, which is the whole of what
 *  binds them. */
export const ADOPTION_TOP = SOURCE_TOP + SOURCE_HEIGHT + BAND_GAP;

/**
 * A figure's box: 50, cut for ONE line of 36px mono on 1.1.
 *
 * 36px mono paints a 46.80 content area (the larger of the two extents at this
 * line-height), so the box carries 3.20 spare — the same arithmetic
 * `./subscription-geometry.ts` runs for its 22px formula.
 *
 * 36 AND NOT MORE, WHICH IS THE ONE TYPE DECISION ON THIS STAGE WORTH ARGUING. These two
 * numerals are the largest thing under the headline and they should be; but the headline
 * is 40px, and a figure set larger than the claim it is evidence for inverts the slide's
 * own order — the rule `gap-hardest-part` records when it puts its headline in front of
 * its statistic. 36 is the largest size that stays under 40.
 */
export const FIGURE_HEIGHT = 50;

/** Row A's label shelf: 282 — 8px under the figure it belongs to, so a label can never be
 *  read against the wrong percentage. */
export const ADOPTION_LABEL_TOP = ADOPTION_TOP + FIGURE_HEIGHT + BINDING_GAP;

/** Row A's field depth: 88 — three rows of marks. */
export const ADOPTION_FIELD_HEIGHT = fieldHeight(ADOPTION_COUNT);

/** Row B's field depth: 24 — one row of marks. */
export const IMPLEMENTATION_FIELD_HEIGHT = fieldHeight(IMPLEMENTATION_COUNT);

/**
 * Row B's shelf: 340.
 *
 * Derived from row A's DEEPER half — its field (312), not its label column (298) — so the
 * two rows cannot overlap whichever half grows. Today the field is deeper; a shorter
 * statistic that dropped the adoption field to two rows would make the label column the
 * deeper one and this arithmetic would follow it without an edit.
 */
export const IMPLEMENTATION_TOP =
  Math.max(ADOPTION_LABEL_TOP + EYEBROW_HEIGHT, ADOPTION_TOP + ADOPTION_FIELD_HEIGHT) +
  BAND_GAP;

/** Row B's label shelf: 398. */
export const IMPLEMENTATION_LABEL_TOP = IMPLEMENTATION_TOP + FIGURE_HEIGHT + BINDING_GAP;

/** Where band 2 ends: 414 — row B's LABEL, which is deeper than its one-row field, so the
 *  two rows resolve their floors the opposite way round. Not exported;
 *  {@link RULE_TOP} carries it forward. */
const PAIR_BOTTOM = Math.max(
  IMPLEMENTATION_LABEL_TOP + EYEBROW_HEIGHT,
  IMPLEMENTATION_TOP + IMPLEMENTATION_FIELD_HEIGHT,
);

// ───────────────────── the rule that closes the evidence ─────────────────────

/** The copper rule's shelf: 442. It spans the FULL width, not one column: above it is what
 *  was reported, below it is what this deck concludes from it. */
export const RULE_TOP = PAIR_BOTTOM + BAND_GAP;

/** `.copper-rule` is `height: 1px` in `src/styles/globals.css` — restated, because jsdom
 *  computes no stylesheet and a test that read this box's height off the DOM would read
 *  `NaN`. */
export const RULE_HEIGHT = 1;

// ───────────────────── band 3 · what each rate buys ─────────────────────

/** Band 3's eyebrow: 471 — 28px under the rule, matching the air above it. */
export const READING_EYEBROW_TOP = RULE_TOP + RULE_HEIGHT + BAND_GAP;

/** How many columns band 3 is cut into: 2 — a literal `const`, so the weld at
 *  {@link readingColLeft} is compile-visible. */
export const READING_COL_COUNT = 2;

/** The gutter between band 3's two columns: 28. Not exported. */
const READING_COL_GAP = 28;

/**
 * One column of band 3: 578, and the two are EQUAL.
 *
 * THE BAND IS NOT CUT 78/6, AND THAT IS THE DECISION. Band 2 is unequal because the pair
 * is; band 3's two claims are the same SIZE of claim — what a common position is worth
 * against what a rare one is — and cutting the columns to the rates would say the majority
 * reading matters thirteen times more, which is the opposite of what the copy says. Equal
 * columns, unequal counts, and the counts are in the band above.
 */
export const READING_COL_WIDTH = (CONTENT_WIDTH - READING_COL_GAP) / READING_COL_COUNT;

/** Both of band 3's lines start on one shelf: 499. */
export const READING_LINE_TOP = READING_EYEBROW_TOP + EYEBROW_HEIGHT + LABEL_TO_BODY;

/**
 * Band 3's line box: 48, cut for TWO lines of 17px serif.
 *
 * Two 22.10 line boxes paint 22.10 + 23.19 = 45.29 (Source Serif 4's content area on the
 * last line), so the box carries 2.71 spare. ONE HEIGHT FOR BOTH COLUMNS, so the band does
 * not step when one sentence is reworded a word shorter than the other — the two are read
 * as a pair and a 22px offset between them would read as a mistake. Both strings run ≈105
 * characters in a 578px measure, under the ≈150 two lines hold.
 */
export const READING_LINE_HEIGHT = 48;

/** Where band 3 ends: 547. Not exported — {@link CLOSER_TOP} carries it forward. */
const READING_BOTTOM = READING_LINE_TOP + READING_LINE_HEIGHT;

/**
 * Band 3 column `index`'s left edge, in stage coordinates: 48, 654.
 *
 * ABSOLUTE AND NOT SLOT-RELATIVE, like every placement function in this directory except
 * the two mark ones, which say why they are not.
 *
 * @throws on a third column — the band holds the two readings of ONE pair, and a third
 *         would be a reading of a rate the source does not state.
 */
export function readingColLeft(index: number): number {
  if (!Number.isInteger(index) || index < 0 || index >= READING_COL_COUNT) {
    throw new Error(
      `readingColLeft: no column ${index} — band 3 is the two readings of ONE pair ` +
        `(0…${READING_COL_COUNT - 1}), tiling the ${CONTENT_WIDTH}px content width ` +
        `(${READING_COL_COUNT} × ${READING_COL_WIDTH} + ${READING_COL_GAP}).`,
    );
  }
  return SIDE_MARGIN + index * (READING_COL_WIDTH + READING_COL_GAP);
}

// ───────────────────── band 4 · the closer ─────────────────────

/** The air between band 3 and the closer: 26 — a beat change, two short of the
 *  {@link BAND_GAP} above, and that difference is part of the slack this stage has left.
 *  Not exported. */
const READING_TO_CLOSER = 26;

/** The closer's shelf: 573. Full width — the one sentence addressed to every band above
 *  it. */
export const CLOSER_TOP = READING_BOTTOM + READING_TO_CLOSER;

/** The closer's box: 32, cut for ONE line of 22px serif — a 28.60 line box painting 30.01,
 *  1.99 spare. The same box every 22px verdict in this section takes. */
export const CLOSER_HEIGHT = 32;

/** Where the stage's lowest box ends: 605. Not exported — the clearance below carries its
 *  whole content. */
const CLOSER_BOTTOM = CLOSER_TOP + CLOSER_HEIGHT;

/**
 * What is left between the closer and the NavBar's hover band: 27px.
 *
 * The most slack of the five stages in this directory (D.5 keeps 14, D.4 keeps 26), and it
 * is not waste: this slide carries the fewest boxes of the five and the one thing it must
 * not do is crowd the two fields, which are read as MASSES rather than as text. Derived
 * from both ends, so an edit anywhere above moves it and a test fails on it before the
 * stage crosses the band.
 */
export const NAV_ZONE_CLEARANCE = NAV_ZONE_TOP - CLOSER_BOTTOM;
