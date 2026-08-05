// Where the data goes, and what answers it, as numbers — stage coordinates for a 1280×720
// stage.
//
// A THREE-COLUMN GRID ABOVE A COPPER RULE, AND A TWO-COLUMN SPLIT BELOW IT — and the grid
// is the argument, not a tidy way to fill a stage. §6.7's beat 1 is three DESTINATIONS, so
// the stage is cut into three columns and each column IS one destination; the rule then
// closes beat 1, and beats 2 and 3 divide what is left. Two things follow that no other
// module in this directory needs: the column count and the destination count are ONE fact
// (see {@link DESTINATION_COUNT}), and the split below the rule reuses the SAME column
// edges rather than declaring its own, so nothing on the stage sits on a shelf the grid
// does not own.
//
// A THIRD GEOMETRY MODULE IN THIS DIRECTORY, AND NOT A THIRD HALF OF EITHER OTHER ONE.
// `./geometry.ts` exists because the ledger's column is not the same height in both decks;
// `./chicken-egg-geometry.ts` exists because D.3 is two columns with fixed-length lists in
// both. Neither is true here: this slide's brand axis (§4.4 slot 4) changes ONE box's
// contents and not its height — {@link CALLBACK_HEIGHT} is cut for the longest of the
// three brand lines and the sourced arm's citation is what sets
// {@link CALLBACK_BLOCK_BOTTOM} for every brand, so the verdict below it lands on the same
// shelf in both rooms. A module whose subject is "how tall is a column of `n` figures" has
// no room for one whose subject is "which of three columns reaches furthest down".
//
// THE FOUR STAGE FACTS ARE RESTATED HERE, NOT IMPORTED, for the reason
// `./chicken-egg-geometry.ts` records at length: no specifier for `./geometry` satisfies
// tsc and bare Node at once while `allowImportingTsExtensions` is `false` in
// `tsconfig.json`, and bare-node importability is the property worth keeping, because a
// geometry module a harness cannot import is a geometry module nothing measures. So the
// two facts the ledger types LITERALLY are PINNED to it through a type-only `import()`,
// and the two it widens to `number` are re-derived from those pins by the same one-line
// arithmetic. See {@link STAGE} and {@link NAV_ZONE_TOP} for what that does and does not
// guarantee.
//
// PROVED IMPORTABLE, not assumed — the claim `./content.ts` explicitly cannot make:
//
//   $ node --experimental-strip-types -e \
//       'import("./src/slides/leader-invest/security-geometry.ts")
//          .then(m => console.log(Object.keys(m).length, "exports"))'
//   42 exports
//
// (Plus Node's own ExperimentalWarning on stderr.) The two type-only `import()`s below —
// `./geometry` for the stage pins, `./content` for the three counts — cost nothing at run
// time: they live in type positions, both tsc and Node's type stripper erase them, and the
// run above is the proof that nothing resolves `./content.ts`, which bare Node cannot load
// at all (its `@/` runtime import is documented at the top of that file).
//
// THE VERTICAL BUDGET, top to bottom, AND IT IS ARITHMETIC RATHER THAN MEASUREMENT — every
// number below is this file's own derivation, and the box heights it is built from come
// from the line-box table further down. `.fig-label` is at y=36 and `.slide-headline-row`
// at y=80; a one-line `.slide-headline.small` is 40px on 1.05, so the headline row ends at
// y=122. The grid then starts on {@link CONTENT_TOP} = 156, which is `.slide-content`'s own
// `top` in `src/styles/globals.css` — the shelf the deck declares for content under a
// headline row, and this slide has no eyebrow band to cross first. Both sibling leader
// slides make the same two calls.
//
//   col 0 · x=48            col 1 · x=452           col 2 · x=856
//   ─────────────────────── BEAT 1 · WHERE IT GOES ────────────────────────
//   156  destination label  156  destination label  156  destination label   → 175
//   183  contract           183  contract           183  contract            → 205
//
//   231  figure "4 pts"     231  figure "5.2 pts"   231  brand callback      → 262 / 281
//   264  metric             264  metric                                      → 286
//   294  price source ····· spans col 0–1 (w=780)   289  callback citation    → 310 / 319
//
//   ─────────────────────── BEAT 1 · THE VERDICT ──────────────────────────
//   343  verdict ·········· spans all three columns (w=1184)                 → 375
//   399  copper rule ······ spans all three columns                          → 400
//
//   ──────── BEAT 2 (col 0–1, w=780) ────────  ─── BEAT 3 (col 2, w=376) ───
//   424  eyebrow                               424  eyebrow                  → 440
//   452  exposure line                         452  four domain chips        → 484 / 478
//   508  exposure row 0                        498  the retrofit line        → 530 / 560
//   546  exposure row 1                        576  provenance               → 568 / 606
//   584  exposure row 2                                                      → 606
//   ───────────────────────────────────────────────────────────────────────────
//   floor y=632 · lowest painted box 606 · {@link NAV_ZONE_CLEARANCE} = 26
//
// THE FLOOR IS THE HOVER BAND AND NOT `.slide-content`'s BOTTOM. This slide takes that
// class's `top` and refuses its `bottom`: `bottom: 80px` puts a floor at y=640, which is
// 8px INSIDE `.nav-zone` (`bottom: 0; height: 88px`), and a box there is a box the
// presenter's own pointer makes the chrome fade up over. Nothing on this stage may cross
// y=632.
//
// THE TWO LOWER COLUMNS END ON THE SAME LINE, BY DERIVATION. Beat 2's last exposure row and
// beat 3's provenance line both land on y=606, because {@link PROVENANCE_TOP} is
// `EXPOSURE_ROWS_BOTTOM − CITATION_HEIGHT_WRAPPED` — the provenance hangs UP from beat 2's
// floor rather than down from the retrofit line. Two things follow, and both are the point:
// the two halves of the lower stage read as one band rather than as two lists of different
// lengths, and the gap above the provenance is the RESIDUE of that derivation
// ({@link RETROFIT_TO_PROVENANCE}, 16px today) rather than a number chosen beside it. A
// near-miss — one column ending 20px short of the other — reads as a mistake at projection
// scale, which is why the alignment is structural instead of eyeballed. This is the same
// derivation `./chicken-egg-geometry.ts` uses for its pilot card, pointed the other way:
// there the card hangs up from the bill's floor.
//
// THE BAND UNDER BEAT 1's VERDICT IS DELIBERATE, AND SO IS THE ONE ABOVE THE RULE. The
// verdict is one sentence across the full width with 24px of air over the rule under it,
// and neither gap holds anything. Beat 1 is a comparison and its verdict is the only thing
// on the stage that is a DECISION; crowding either side of it would rank it with the table
// it decides. Do not fill them.
//
// TWO CAPACITIES, TWO DIFFERENT NEIGHBOURS, AND ONLY ONE OF THEM IS VERTICAL — which is
// why only one of them is a shelf function here. `./chicken-egg-geometry.ts` records what
// it costs to blame the wrong neighbour in a throw message, so each of these names the
// thing that actually refuses it:
//
//   · A FOURTH EXPOSURE ROW hits THE FLOOR, and drags beat 3's provenance line with it.
//     Four rows would end at y=644, 12px inside the band, and because
//     {@link PROVENANCE_TOP} is derived from the row block's bottom the provenance line
//     would follow it down to y=614…644. {@link exposureRowTop} throws, and its message
//     says both halves.
//   · A FOURTH DESTINATION has no COLUMN, which is a horizontal refusal and lands at
//     {@link colLeft} — the grid has three columns and the third is already the brand
//     callback's and beat 3's. Nothing in the budget above moves; there is simply nowhere
//     to put it.
//   · A FIFTH GOVERNANCE DOMAIN is refused BY THE TYPE ALONE, and that is stated rather
//     than dressed up as a capacity. The four chips are laid out in flow, side by side,
//     with widths the browser computes from the glyphs — so a fifth one's failure is
//     horizontal OVERFLOW inside a 376px column, and no arithmetic in this file can
//     predict where it lands without measuring text. What exists instead is
//     {@link DOMAIN_COUNT}, pinned to `./content.ts`'s tuple, so a fifth domain stops this
//     file compiling; and the chip row is `nowrap`, so if one is ever added anyway the
//     failure is an overflow a browser check can see rather than a second row of chips
//     inside a box cut for one.
//   · A THIRD PRICE FIGURE is refused BY THE TYPE ALONE TOO, and for a weaker reason worth
//     naming: it would land in {@link colLeft}`(2)`, which is a real column, so nothing
//     throws. {@link FIGURE_COUNT} is the only refusal, and what it protects is not the
//     layout but the argument — the third column belongs to the brand callback.
//
// Pure data and pure functions. No React, no DOM, and no work at module scope beyond the
// arithmetic below.

// ───────────────────── the stage, restated and pinned ─────────────────────

/**
 * The ledger module, as a TYPE only — the pin's other end.
 *
 * `typeof import(…)` is a type-space construct: tsc resolves it, Node's type stripper
 * deletes it, and no runtime import exists to resolve. Same construction, same reason, as
 * `./chicken-egg-geometry.ts`'s.
 */
type Ledger = typeof import("./geometry");

/**
 * This slide's copy, as a TYPE only — the other end of the three count pins
 * ({@link DESTINATION_COUNT}, {@link FIGURE_COUNT}, {@link EXPOSURE_COUNT},
 * {@link DOMAIN_COUNT}).
 *
 * ONE ALIAS FOR FOUR PINS, so each of them reads as a field lookup rather than as a
 * 120-character type path, and so `./content.ts` is named once. Type-space again: bare Node
 * cannot load that module at all (its `@/` runtime import is the point of it), and this
 * reference does not ask it to.
 */
type SecurityCopy = (typeof import("./content"))["investSecurityContent"];

/**
 * The stage. 1280×720, PINNED to `./geometry.ts`'s own `STAGE`.
 *
 * The annotation is the lock: `./geometry.ts` declares `STAGE` with `as const`, so its type
 * is `{ readonly width: 1280; readonly height: 720 }`, and a stage resized there stops this
 * file compiling.
 *
 * WHAT THE PIN DOES NOT DO: it is exactly as strong as the ledger's literal type. If a
 * later edit there widens the declaration (`export const STAGE: { width: number … }`), this
 * annotation goes vacuous and says nothing — silently. A browser harness is the other half:
 * it measures the stage element rather than reading either module's copy.
 */
export const STAGE: Ledger["STAGE"] = { width: 1280, height: 720 };

/** The deck's side margin — `.fig-label`, `.slide-headline-row` and `.slide-content` all sit
 *  at `left: 48px` in `src/styles/globals.css`. PINNED, like {@link STAGE}. */
export const SIDE_MARGIN: Ledger["SIDE_MARGIN"] = 48;

/**
 * The width every full-bleed box on this stage gets: 1184.
 *
 * RE-DERIVED, NOT PINNED, and the difference matters. `./geometry.ts` computes this one, so
 * its declared type is the widened `number` — and an annotation of `number` accepts any
 * number at all, which is a check that cannot fail. So this is the ledger's own expression
 * over the two pinned facts above. Same for {@link NAV_ZONE_TOP}.
 */
export const CONTENT_WIDTH = STAGE.width - 2 * SIDE_MARGIN;

/** `.nav-zone` is `bottom: 0; height: 88px`, so its top edge is y=632 — the floor for slide
 *  content (see the header). Re-derived, not pinned, for the reason
 *  {@link CONTENT_WIDTH} gives. */
export const NAV_ZONE_TOP = STAGE.height - 88;

// ───────────────────── the grid ─────────────────────

/**
 * How many columns the stage is cut into: 3.
 *
 * IT IS THE SAME FACT AS THE DESTINATION COUNT, and {@link DESTINATION_COUNT} is where the
 * two are welded together. Declared as a literal `const` so its type is `3` rather than
 * `number`, which is what makes that weld a compile-time one.
 */
export const COL_COUNT = 3;

/**
 * The gutter between two columns: 28.
 *
 * WIDER THAN EVERY GAP INSIDE A COLUMN THAT IS NOT A BEAT CHANGE, which is the whole job.
 * The gaps a column spends on binding a label to its line are 8 and 12, and the gap that
 * separates the destination table from the price band under it is 26 — so 28 is the widest
 * white space on the upper stage and the room groups it into three columns before it reads
 * anything. At 16 the three destinations would read as one wide table with three headings.
 */
const COL_GAP = 28;

/**
 * One column: 376.
 *
 * DERIVED FROM THE GRID AND NOT CHOSEN, so the three columns tile {@link CONTENT_WIDTH}
 * exactly and the third one's right edge is the deck's own margin — `856 + 376 = 1232`,
 * which is `1280 − 48`. That the three tile the content width is an identity and not a
 * check; what a browser check can prove is that the rendered columns land on these edges
 * and that no column's type crosses a gutter.
 */
export const COL_W = (CONTENT_WIDTH - (COL_COUNT - 1) * COL_GAP) / COL_COUNT;

/**
 * Two columns plus the gutter between them: 780 — the measure beat 2 and the price band
 * are set in.
 *
 * NOT A FOURTH COLUMN, and the name says so: it is a SPAN over columns 0 and 1, exactly
 * the way a table cell spans. Beat 2 gets it because the exposure is the widest prose on
 * the lower stage and beat 3 gets the remaining column; the price band gets it because its
 * source line has four things to carry (see `./content.ts`'s `priceSource`) and a 376px
 * measure would wrap it to three lines.
 */
export const WIDE_W = 2 * COL_W + COL_GAP;

/**
 * The one shelf the grid starts on: 156.
 *
 * `.slide-content`'s own `top` in `src/styles/globals.css` — the shelf the deck declares
 * for content under a headline row. It clears the headline by 34px (40px display on 1.05
 * from y=80 ends at 122), and this slide has no mono eyebrow under the headline to cross,
 * which is what the sibling ledger slide spends its y=134 shelf on.
 */
export const CONTENT_TOP = 156;

// ───────────────────── beat 1 · the three destinations ─────────────────────

/**
 * How many destinations beat 1 names: 3 — PINNED TO TWO THINGS AT ONCE, which is the one
 * lock in this file that could not be written as two.
 *
 * The annotated type is `./content.ts`'s `destinations["length"]`, read through a type-only
 * `import()`, and the assigned value is {@link COL_COUNT}. So a fourth destination in the
 * copy fails here, AND a grid re-cut to four columns fails here, and neither can drift from
 * the other in silence. Written as two constants with the same literal, a copy edit and a
 * layout edit could each pass on their own.
 *
 * DEFECT-INJECTED BEFORE IT WAS TRUSTED: a fourth entry in `./content.ts`'s destination
 * tuple fails with `error TS2322: Type '3' is not assignable to type '4'` on this line, and
 * `COL_COUNT = 4` fails with `Type '4' is not assignable to type '3'` on the same line.
 */
export const DESTINATION_COUNT: SecurityCopy["destinations"]["length"] = COL_COUNT;

/**
 * A destination label's box: 19.
 *
 * 13px mono on 1.3 is a 16.90 line box, and JetBrains Mono's content area at 13px is the
 * same 16.90 (its `line-height: normal` ratio is 1.3em), so the type paints 16.90 and the
 * box carries 2.10 more — the ≈2px rule the header's line-box table holds every box on this
 * slide to. THE SLACK IS NOT DESCENDER ROOM: the three labels are set in caps and have
 * none.
 */
export const LABEL_HEIGHT = 19;

/** The air between a destination's label and the contract line under it: 8 — the smallest
 *  gap on the stage. The label belongs TO its line; anything larger and the three labels
 *  read as a heading row over a table instead of as the first line of three columns. Not
 *  exported. */
const LABEL_TO_CONTRACT = 8;

/** A contract line's shelf: 183. */
export const CONTRACT_TOP = CONTENT_TOP + LABEL_HEIGHT + LABEL_TO_CONTRACT;

/**
 * A 15px sans row's box: 22. One line of 15px on 1.3 is a 19.50 line box, and this is the
 * one register on the slide whose face asks for LESS than its line box (Inter's content area
 * at 15px is 19.005), so 19.50 is the painted extent and 2.50 is spare.
 *
 * ONE HEIGHT FOR BOTH LISTS ON THIS SLIDE — the three contract lines and the three exposure
 * rows — and it is the same 22 `./chicken-egg-geometry.ts` gives D.3's two lists, because
 * all four lists are the same register at the same size. What differs between a contract and
 * an exposure is which beat it belongs to, not the shape of a row.
 */
export const LIST_ROW_HEIGHT = 22;

/** Where the destination table ends: 205. */
const DESTINATIONS_BOTTOM = CONTRACT_TOP + LIST_ROW_HEIGHT;

// ───────────────────── beat 1 · the price, and the brand's own position ─────────────────

/** The gap that separates the destination table from the price band: 26 — the largest in the
 *  upper stage, and it is a SUB-BEAT change rather than a beat change. Beat 1 argues two
 *  things (where the data goes, then what the third destination costs), and this gap is the
 *  only thing on the stage saying the two figures are not a fourth row of the table. Not
 *  exported. */
const TABLE_TO_PRICE = 26;

/** The price band's shelf: 231. The brand callback shares it — see {@link CALLBACK_TOP}. */
export const PRICE_TOP = DESTINATIONS_BOTTOM + TABLE_TO_PRICE;

/**
 * How many figures beat 1 lands: 2, PINNED to `./content.ts`'s tuple.
 *
 * WHAT THIS PIN PROTECTS IS THE ARGUMENT AND NOT THE LAYOUT, which is unusual enough in
 * this file to say out loud. A third figure would be placed at {@link colLeft}`(2)` — a
 * real column, so nothing would throw — on top of the brand callback. The tuple is the only
 * thing that refuses it, and §6.7 gives beat 1 two metrics.
 */
export const FIGURE_COUNT: SecurityCopy["priceFigures"]["length"] = 2;

/**
 * A figure's box: 31.
 *
 * 22px mono on 1.1 is a 24.20 line box, but JetBrains Mono's content area at 22px is 28.60,
 * so the painted extent is 28.60 and the box carries 2.40 more. The line box is the
 * SMALLER of the two here, which is why the box is cut to the content area and not to the
 * line box — a box cut to 24.20 would clip the digits it holds.
 */
export const FIGURE_HEIGHT = 31;

/** The air between a figure and the metric under it: 2. A figure and its metric are ONE
 *  statement read top to bottom, and 2px is what keeps them from reading as two rows while
 *  still leaving the two boxes separable for a check. Not exported. */
const FIGURE_TO_METRIC = 2;

/** A metric's shelf: 264. */
export const METRIC_TOP = PRICE_TOP + FIGURE_HEIGHT + FIGURE_TO_METRIC;

/** The air between the metrics and the citation under them: 8 — the same 8 that binds a
 *  destination label to its contract, because it does the same job: the source line belongs
 *  TO the two figures. Not exported. */
const METRIC_TO_SOURCE = 8;

/** The price source line's shelf: 294. */
export const PRICE_SOURCE_TOP = METRIC_TOP + LIST_ROW_HEIGHT + METRIC_TO_SOURCE;

/**
 * A one-line citation's box: 16.
 *
 * 10.5px mono on 1.3 is a 13.65 line box and JetBrains Mono's content area at 10.5px is the
 * same 13.65, so the type paints 13.65 and the box carries 2.35 more. 10.5px clears gh#50's
 * 9.5px mono floor, and it is the size `./components/ProofLedger.tsx` sets its own
 * attribution at — one citation register across the section.
 */
export const CITATION_HEIGHT = 16;

/** Where the price band ends: 310. */
const PRICE_BLOCK_BOTTOM = PRICE_SOURCE_TOP + CITATION_HEIGHT;

/** The brand callback's shelf: 231 — THE SAME SHELF THE FIGURES START ON, and the same
 *  number rather than a second one that happens to agree. The price of self-hosting and
 *  what this room already self-hosts are the two halves of one answer; a stage where one
 *  started 20px below the other would rank them. */
export const CALLBACK_TOP = PRICE_TOP;

/**
 * The brand callback's box: 50, cut for TWO lines of 18px serif.
 *
 * Two lines of 18px on 1.3 are 46.80 of line box, and Source Serif 4's content area at 18px
 * is 24.55 against a 23.40 line box, so the painted extent is 47.95 and the box carries
 * 2.05 more.
 *
 * ONE HEIGHT FOR ALL THREE BRANDS, AND THAT IS THE DECISION THIS CONSTANT EXISTS FOR. The
 * three lines in `./content.ts`'s brand table are within a few characters of each other and
 * all three are cut for two lines, so the box does not move between decks — which is what
 * keeps {@link VERDICT_TOP} a single shelf. A box that shrank to one line for one brand
 * would put that deck's verdict 24px higher than the other's, and the verdict is the one
 * sentence on beat 1 both rooms are meant to take away.
 */
export const CALLBACK_HEIGHT = 50;

/** The air between the callback and its citation: 8 — the third use of the same number, and
 *  the same reason each time. Not exported. */
const CALLBACK_TO_SOURCE = 8;

/** The callback citation's shelf: 289. Only the sourced arm of
 *  `./content.ts`'s `OnPremCallback` renders here; the arm that states an absence has
 *  nothing to attribute and prints no element (see {@link CALLBACK_BLOCK_BOTTOM}). */
export const CALLBACK_SOURCE_TOP = CALLBACK_TOP + CALLBACK_HEIGHT + CALLBACK_TO_SOURCE;

/**
 * A two-line citation's box: 30.
 *
 * Two lines of 10.5px mono on 1.3 are 27.30 of line box, painting 27.30, so the box carries
 * 2.70 more. Used twice — the callback's citation and beat 3's provenance line — because
 * they are the same register at the same size and two constants here would only drift.
 */
export const CITATION_HEIGHT_WRAPPED = 30;

/**
 * Where the callback column ends: 319 — AND IT IS THE SOURCED ARM'S BOTTOM IN EVERY DECK,
 * not just in the deck that renders a citation.
 *
 * That is the point of computing it rather than measuring it. A Berau leader deck prints no
 * citation, so nothing is painted between y=281 and y=319 there; the shelf below still
 * derives from this number, so the verdict lands on y=343 in both rooms. Deriving
 * {@link VERDICT_TOP} from "the lowest box that actually rendered" is the version of this
 * that ships a deck-dependent thesis line, which is the failure `./geometry.ts`'s fixed
 * `CLOSER_TOP` records from the other direction.
 */
const CALLBACK_BLOCK_BOTTOM = CALLBACK_SOURCE_TOP + CITATION_HEIGHT_WRAPPED;

/** Where beat 1's evidence ends: 319 — the lower of its two columns' floors, so the verdict
 *  clears both. The callback column is the deeper one today; taking the max rather than the
 *  callback's own bottom is what keeps that true if the price band ever grows. */
const BEAT_ONE_BOTTOM = Math.max(PRICE_BLOCK_BOTTOM, CALLBACK_BLOCK_BOTTOM);

// ───────────────────── beat 1 · the verdict, and the rule that closes it ─────────────────

/** The air between beat 1's evidence and its verdict: 24. It has to read as a TURN — the
 *  comparison stops, then the decision arrives — which is why it is three times the 8 that
 *  binds a citation to what it cites. Not exported. */
const BEAT_ONE_TO_VERDICT = 24;

/** Beat 1's verdict shelf: 343. Full width, and the first box on the stage that is not in a
 *  column — see the header for why the two bands of air around it hold nothing. */
export const VERDICT_TOP = BEAT_ONE_BOTTOM + BEAT_ONE_TO_VERDICT;

/**
 * One line of 22px serif on 1.3 is a 28.60 line box that paints 30.00, and this box is cut
 * for ONE line: 32.
 *
 * 1.3 IS THE RENDERER'S NUMBER, and Source Serif 4's content area at 22px is 30.00 (ratio
 * 1.3636) — the same arithmetic `./chicken-egg-geometry.ts`'s `WORKAROUND_HEIGHT` records,
 * and the same box, because it is the same register at the same size.
 *
 * ONE LINE IS A CLAIM A BROWSER HAS TO SETTLE, not an assumption: a second line would land
 * in the 24px of air above the copper rule. The header's line-box table records the measured
 * width.
 */
export const VERDICT_HEIGHT = 32;

/** The air between the verdict and the rule under it: 24 — matched to the air above the
 *  verdict, so the decision sits in a band of its own rather than being pushed against
 *  either neighbour. Not exported. */
const VERDICT_TO_RULE = 24;

/**
 * The copper rule's shelf: 399.
 *
 * IT IS THE SLIDE'S OWN DIVIDER AND NOT A LIST'S TOTAL RULE, which is why it spans all
 * three columns — the opposite call from `./chicken-egg-geometry.ts`'s `RULE_TOP`, and for a
 * reason that is about what the two rules mean. There it closes a bill and must stop at the
 * gutter; here it closes a BEAT, and everything below it (the exposure, and the four
 * domains) is what beat 1's answer does not cover.
 */
export const RULE_TOP = VERDICT_TOP + VERDICT_HEIGHT + VERDICT_TO_RULE;

/** `.copper-rule` is `height: 1px` in `src/styles/globals.css`. Its `scaleX` reveal is a
 *  transform, so it takes no layout space beyond this pixel and adds no SMIL node. */
export const RULE_HEIGHT = 1;

// ───────────────────── the lower stage · beats 2 and 3 ─────────────────────

/** The air between the rule and the two columns under it: 24 — matched to the air above the
 *  rule, so the rule reads as a divider between two halves rather than as an underline of
 *  the verdict. Not exported. */
const RULE_TO_LOWER = 24;

/** The one shelf both lower columns start on: 424. Beat 2's eyebrow and beat 3's eyebrow,
 *  one number: the exposure and the answer to it are read left to right, not top to bottom,
 *  and a stage where one started lower would rank them. */
export const LOWER_TOP = RULE_TOP + RULE_HEIGHT + RULE_TO_LOWER;

/**
 * A mono eyebrow's box: 16. 11px on 1.3 is a 14.30 line box, and JetBrains Mono's content
 * area at 11px is the same 14.30, so the box carries 1.70 more.
 *
 * ONE CONSTANT FOR BOTH eyebrows — beat 2's and beat 3's — because they are the same string
 * register at the same size, and two numbers here would only ever drift. Same call as
 * `./chicken-egg-geometry.ts`'s `EYEBROW_HEIGHT`.
 */
export const EYEBROW_HEIGHT = 16;

/** The air between an eyebrow and the body it labels: 12. Deliberately small — the eyebrow
 *  belongs TO its beat, and a larger gap would let it read as a heading over the whole lower
 *  stage. Used by both columns. Not exported. */
const EYEBROW_TO_BODY = 12;

/** Beat 2's sentence shelf: 452. Beat 3's chip row shares it — see {@link DOMAINS_TOP}. */
export const EXPOSURE_LINE_TOP = LOWER_TOP + EYEBROW_HEIGHT + EYEBROW_TO_BODY;

/** Beat 2's sentence, cut for ONE line of 22px serif: 32 — the same register and the same
 *  box as {@link VERDICT_HEIGHT}. */
export const EXPOSURE_LINE_HEIGHT = VERDICT_HEIGHT;

/** The air between beat 2's sentence and the three rows under it: 24. The same 24 that
 *  separates beat 1's evidence from its verdict, doing the same job from the other side: the
 *  sentence is the claim and the three rows are what it costs, so they are one beat with a
 *  breath in it rather than four statements. Not exported. */
const LINE_TO_EXPOSURES = 24;

/** Beat 2's first row: 508. */
const EXPOSURE_ROWS_TOP = EXPOSURE_LINE_TOP + EXPOSURE_LINE_HEIGHT + LINE_TO_EXPOSURES;

/** The air between two list rows: 16, which puts 18.50px between two rendered 19.50px lines.
 *  A LIST, NOT THREE STATEMENTS. The same number `./chicken-egg-geometry.ts` gives D.3's
 *  lists, so the two slides' rows read at the same rhythm. Not exported. */
const LIST_ROW_GAP = 16;

/** How far apart two list rows sit: 38. Derived, so the capacity below moves with it. */
const LIST_ROW_PITCH = LIST_ROW_HEIGHT + LIST_ROW_GAP;

/** How tall a block of `count` list rows is. Private: it exists to derive the capacity and
 *  to keep its throw message measured rather than typed. */
function listBlockHeight(count: number): number {
  return (count - 1) * LIST_ROW_PITCH + LIST_ROW_HEIGHT;
}

/**
 * How many exposures beat 2 names: 3, PINNED to `./content.ts`'s tuple.
 *
 * A SECOND LOCK AND NOT THE FIRST ONE. `./content.ts` already refuses a fourth exposure at
 * its own `Three<LineItem>` annotation; this pin is what makes the geometry notice if that
 * tuple is ever widened, because beat 3's provenance shelf is derived from this number. The
 * relation it CANNOT express is `EXPOSURE_COUNT <= EXPOSURE_ROW_CAPACITY` — the capacity is
 * a computed `number`, so that one belongs to a test.
 */
export const EXPOSURE_COUNT: SecurityCopy["exposures"]["length"] = 3;

/** Where beat 2 ends: 606. Derived from the count, and the line beat 3's provenance is
 *  pinned to (see {@link PROVENANCE_TOP}). NOT exported — nothing outside this file reads
 *  it, and this module holds gh#57's rule that an export needs an outside reader. What a
 *  check reads instead is {@link NAV_ZONE_CLEARANCE}, which carries this number's whole
 *  content from the other end: the browser walk of 2026-08-05 measured the lowest painted
 *  box at y≈606 against a nav-zone top of 632, which is this constant and that clearance,
 *  observed rather than re-exported. */
const EXPOSURE_ROWS_BOTTOM = EXPOSURE_ROWS_TOP + listBlockHeight(EXPOSURE_COUNT);

/** What beat 2's rows may spend between the first one and the floor: 124. Private — it
 *  derives the capacity. */
const EXPOSURE_ROWS_BUDGET = NAV_ZONE_TOP - EXPOSURE_ROWS_TOP;

/**
 * How many exposure rows the column can hold — DERIVED, so raising the rule or growing the
 * gaps above lowers the capacity in the same edit.
 *
 * `n` rows occupy `(n − 1) · pitch + height`, so the budget allows
 * `floor((budget − height) / pitch) + 1`. It comes out at 3, which is §6.7's count, with
 * 26px of the budget unspent — and that leftover IS {@link NAV_ZONE_CLEARANCE}, read from
 * the other end. The two are one piece of arithmetic, so a test that compares them proves
 * nothing; what a test can prove is that three rows fit and four do not.
 */
export const EXPOSURE_ROW_CAPACITY =
  Math.floor((EXPOSURE_ROWS_BUDGET - LIST_ROW_HEIGHT) / LIST_ROW_PITCH) + 1;

/** What is left between the lowest boxes on the stage — beat 2's last row and beat 3's
 *  provenance line, which land on the same y by derivation — and the NavBar's hover band:
 *  26px. Derived from both ends, so an edit anywhere above moves it and a browser check
 *  fails on it. */
export const NAV_ZONE_CLEARANCE = NAV_ZONE_TOP - EXPOSURE_ROWS_BOTTOM;

/** Beat 3's chip row shelf: 452 — the same shelf beat 2's sentence starts on, and the same
 *  number rather than a second one that agrees. */
export const DOMAINS_TOP = EXPOSURE_LINE_TOP;

/**
 * The chip row's box: 26.
 *
 * A CHIP IS TALLER THAN ITS TYPE, which is the whole arithmetic here: 11px mono on 1.3 is a
 * 14.30 line box, plus `4px` of padding top and bottom and a 1px border on each edge, so a
 * chip paints 24.30 and the row carries 1.70 more.
 *
 * ONE BOX FOR FOUR CHIPS, and it is the ONE box on this stage laid out in FLOW rather than
 * against the grid — see {@link DOMAIN_COUNT} for why that is unavoidable and what it costs.
 */
export const DOMAINS_HEIGHT = 26;

/**
 * How many governance domains beat 3 renders: 4, PINNED to `./content.ts`'s tuple.
 *
 * THE ONLY REFUSAL THERE IS, AND SAYING SO IS THE POINT. Every other list on this slide is
 * refused twice — once by its tuple and once by a shelf function that runs out of stage —
 * and this one cannot be, because the four chips are laid out side by side in FLOW with
 * widths the browser computes from the glyphs. No arithmetic in this file knows how wide
 * "GOVERNANCE" is, so no function here can throw on a fifth domain. What holds instead:
 * this annotation stops the file compiling, and the chip row is set `nowrap`, so a fifth
 * chip added anyway would OVERFLOW a 376px column horizontally — a failure a browser check
 * can see — rather than silently wrapping to a second row inside a box cut for one.
 */
export const DOMAIN_COUNT: SecurityCopy["domains"]["length"] = 4;

/** The air between the four chips and the sentence under them: 20. Bigger than the 12 that
 *  binds an eyebrow to its beat, smaller than the 24 of a turn — the retrofit line is what
 *  the chips are FOR, not a new claim. Not exported. */
const DOMAINS_TO_RETROFIT = 20;

/** Beat 3's sentence shelf: 498. */
export const RETROFIT_TOP = DOMAINS_TOP + DOMAINS_HEIGHT + DOMAINS_TO_RETROFIT;

/**
 * Two lines of 22px serif on 1.3 are 57.20 of line box that paint 58.60, and this box is cut
 * for both: 62.
 *
 * TWO LINES BY DESIGN, NOT BY ACCIDENT — the sentence is set in a 376px column, and the
 * header's line-box table records the measured width. 22px and not 24: this is the same
 * register as beat 1's verdict and beat 2's line, and this slide states its rank in COLOUR
 * and POSITION rather than in three prose sizes (see `./components/SecurityBeats.tsx`'s tier
 * table). The 3.40 of spare is more than the ≈2px the other boxes carry, and it is there
 * because the box is even: an odd 61 would put every shelf below it on a half-pixel of its
 * own.
 */
export const RETROFIT_HEIGHT = 62;

/**
 * Beat 3's provenance shelf: 576 — DERIVED UPWARD FROM BEAT 2's FLOOR.
 *
 * `EXPOSURE_ROWS_BOTTOM − CITATION_HEIGHT_WRAPPED`, so the two lower columns end on the same
 * line (y=606) by construction rather than by eye. See the header for why that direction and
 * not the other; in one line, the alignment is what makes the lower stage read as one band,
 * and a column ending 20px short of its neighbour reads as a mistake at projection scale.
 *
 * THE PRICE OF THE DERIVATION is that a fourth exposure row drags this line down with it —
 * which is exactly what {@link exposureRowTop}'s throw message says, because a message that
 * named only the floor would send a later author looking for 12px it could not find.
 */
export const PROVENANCE_TOP = EXPOSURE_ROWS_BOTTOM - CITATION_HEIGHT_WRAPPED;

/** The least air beat 3's provenance line may have under the retrofit sentence: 16. Under
 *  that, a two-line citation stops reading as the sentence's own source and starts reading
 *  as a third line of it. Private — it is what {@link RETROFIT_TO_PROVENANCE} is checked
 *  against. */
const RETROFIT_TO_PROVENANCE_MIN = 16;

/**
 * The air between the retrofit sentence and the provenance line: 16px today, and A RESIDUE
 * rather than a choice — everything else in this column is derived, so this gap is what is
 * left.
 *
 * It sits exactly on {@link RETROFIT_TO_PROVENANCE_MIN}, which is worth saying plainly: this
 * column has no slack at all. Exported because it is the one number in the lower stage a
 * browser check should watch — an edit anywhere in either lower column shows up here first,
 * and it shows up as a negative number or as an overlap.
 */
export const RETROFIT_TO_PROVENANCE = PROVENANCE_TOP - (RETROFIT_TOP + RETROFIT_HEIGHT);

// ───────────────────── the derivations ─────────────────────

/**
 * Column `index`'s left edge, in stage coordinates: 48, 452, 856.
 *
 * ABSOLUTE AND NOT SLOT-RELATIVE, like `./chicken-egg-geometry.ts`'s `clauseTop`: every box
 * on this slide is placed against the stage, and a renderer that has to add an origin is a
 * renderer that can forget to. The one exception is the four domain chips, which are laid
 * out in flow inside a box this function places — see {@link DOMAIN_COUNT}.
 *
 * @throws on a fourth column. THE GRID IS WHAT REFUSES IT, and the message says so: there is
 *         no arithmetic to move, because a fourth column would have to come out of the
 *         three that tile the content width.
 */
export function colLeft(index: number): number {
  if (!Number.isInteger(index) || index < 0 || index >= COL_COUNT) {
    throw new Error(
      `colLeft: no column ${index} — the stage is a ${COL_COUNT}-column grid ` +
        `(0…${COL_COUNT - 1}), and the three columns tile the deck's ${CONTENT_WIDTH}px ` +
        `content width exactly (${COL_COUNT} × ${COL_W} + ${COL_COUNT - 1} × ${COL_GAP}). A ` +
        `fourth column has nowhere to come from: at this gutter it would make every column ` +
        `${COL_W - (CONTENT_WIDTH - 3 * COL_GAP) / 4}px narrower, and column 2 already ` +
        `carries the brand callback and all of beat 3.`,
    );
  }
  return SIDE_MARGIN + index * (COL_W + COL_GAP);
}

/**
 * Exposure row `index`'s top edge, in stage coordinates.
 *
 * @throws on a row the column cannot hold. THE FLOOR IS WHAT REFUSES IT, and the message
 *         names the second casualty as well: beat 3's provenance line is derived from this
 *         block's bottom, so it travels down with a fourth row rather than being hit by it.
 */
export function exposureRowTop(index: number): number {
  if (!Number.isInteger(index) || index < 0 || index >= EXPOSURE_ROW_CAPACITY) {
    const needed = listBlockHeight(EXPOSURE_ROW_CAPACITY + 1);
    const overflow = needed - EXPOSURE_ROWS_BUDGET;
    throw new Error(
      `exposureRowTop: no exposure row ${index} — beat 2 holds ${EXPOSURE_ROW_CAPACITY} rows ` +
        `(0…${EXPOSURE_ROW_CAPACITY - 1}). Row ${EXPOSURE_ROW_CAPACITY} needs ${needed}px of ` +
        `the ${EXPOSURE_ROWS_BUDGET}px this column has between y=${EXPOSURE_ROWS_TOP} and the ` +
        `NavBar's hover band at y=${NAV_ZONE_TOP} — ${overflow}px more than there is, so its ` +
        `own box would end at y=${EXPOSURE_ROWS_TOP + needed}. AND IT WOULD TAKE BEAT 3 WITH ` +
        `IT: the provenance line hangs UP from this block's bottom edge ` +
        `(y=${EXPOSURE_ROWS_BOTTOM} today, y=${EXPOSURE_ROWS_TOP + needed} then), so it would ` +
        `land at y=${EXPOSURE_ROWS_TOP + needed - CITATION_HEIGHT_WRAPPED} and end inside the ` +
        `band as well.`,
    );
  }
  return EXPOSURE_ROWS_TOP + index * LIST_ROW_PITCH;
}
