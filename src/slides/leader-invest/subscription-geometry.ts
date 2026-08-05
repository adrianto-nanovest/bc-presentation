// Individual seats become a managed line item, as numbers — stage coordinates for a
// 1280×720 stage.
//
// A THREE-COLUMN GRID ABOVE A COPPER RULE, AND A TWO-COLUMN SPLIT BELOW IT — the same
// bones as `./security-geometry.ts`, reused on purpose so the section's two comparison
// slides read at one rhythm, and cut differently where the argument differs. Above the
// rule the grid IS beat 1 against beat 2: column 0 is what individual subscriptions
// cannot give the company (four gaps), column 1 is what managed seats add (four
// capabilities), and column 2 is what the fourth capability BUYS — the November
// post-assessment tie, which is the sentence beat 2 exists for. Below the rule, beat 3:
// the formula and its tier table span columns 0–1 (the widest thing on the slide is the
// price strings, and the §12.2 gate forbids trimming them), the brand anchor takes
// column 2 (§4.4 slot 7), and the closer spans all three, full width, last.
//
// A FOURTH GEOMETRY MODULE IN THIS DIRECTORY, AND NOT A FOURTH HALF OF ANY OTHER.
// `./geometry.ts` is a ledger's column heights, `./chicken-egg-geometry.ts` is two
// fixed-list columns, `./security-geometry.ts` is a grid whose column count is a
// destination count. This one's subject is a grid whose LOWER half is a table with a
// formula over it — and its one derived-alignment decision goes the OTHER way from
// D.4's: the two lower columns do NOT end on one line here, because the full-width
// closer under both is what closes the band, and forcing the anchor's citation down to
// the tier table's floor would tear it off the line it attributes (see
// {@link ANCHOR_SOURCE_TOP}).
//
// THE STAGE FACTS ARE RESTATED HERE, NOT IMPORTED, for the reason
// `./chicken-egg-geometry.ts` records at length: no specifier for `./geometry`
// satisfies tsc and bare Node at once while `allowImportingTsExtensions` is `false`,
// and bare-node importability is the property worth keeping. The literal facts are
// PINNED through type-only `import()`s; the widened ones are re-derived by the same
// arithmetic. Proved importable, not assumed:
//
//   $ node --experimental-strip-types -e \
//       'import("./src/slides/leader-invest/subscription-geometry.ts")
//          .then(m => console.log(Object.keys(m).length, "exports"))'
//
// THE VERTICAL BUDGET, top to bottom, AND IT IS ARITHMETIC RATHER THAN MEASUREMENT.
// `.fig-label` at y=36, `.slide-headline-row` at y=80; a one-line
// `.slide-headline.small` (40px on 1.05) ends the headline row at y=122; the grid
// starts on {@link CONTENT_TOP} = 156, `.slide-content`'s own `top` — the same two
// calls all three sibling leader slides make.
//
//   col 0 · x=48            col 1 · x=452           col 2 · x=856
//   ─────── BEAT 1 · TODAY ─────  ── BEAT 2 · MANAGED ──  ── BEAT 2 · THE PAYOFF ──
//   156  eyebrow             156  eyebrow             156  eyebrow            → 172
//   184  gap row 0           184  capability row 0    184  analytics line     → 206 / 234
//   222  gap row 1           222  capability row 1                            → 244
//   260  gap row 2           260  capability row 2                            → 282
//   298  gap row 3           298  capability row 3                            → 320
//
//   344  copper rule ······· spans all three columns                          → 345
//
//   ──────── BEAT 3 (col 0–1, w=780) ────────  ──── SLOT 7 (col 2, w=376) ────
//   369  formula eyebrow                       369  anchor eyebrow            → 385
//   397  the formula (22px mono)               397  anchor line (3 × 18px)    → 428 / 471
//   442  tier row 0                            479  anchor source (3 × 10.5)  → 464 / 523
//   474  tier row 1                                                           → 496
//   506  tier row 2                                                           → 528
//   540  the lever line                                                       → 562
//
//   586  closer ············ spans all three columns (w=1184)                 → 618
//   ───────────────────────────────────────────────────────────────────────────
//   floor y=632 · lowest painted box 618 · {@link NAV_ZONE_CLEARANCE} = 14
//
// THE FLOOR IS THE HOVER BAND AND NOT `.slide-content`'s BOTTOM, exactly as its three
// siblings: `.nav-zone` is `bottom: 0; height: 88px`, so nothing on this stage may
// cross y=632. The closer ends 14px above it — the thinnest clearance in this
// directory (D.4 keeps 26), and it is spent on purpose: the closer is the AC's own
// required sentence and the last thing the room reads, and every 22px-serif shelf
// above it is already at the section's minimum gaps. An edit that grows anything in
// the lower-left column shows up here first, as a negative number.
//
// THE TWO LOWER COLUMNS END UNEQUAL, AND THAT IS A DECISION — the opposite one from
// `./security-geometry.ts`'s derived alignment, recorded so nobody "fixes" it. There,
// the two lower columns were the stage's last band and a 20px mismatch read as a
// mistake; here the full-width closer IS the last band and closes both columns at
// once, so the anchor column may end where its own content ends (y=523) and its
// citation stays 8px under the line it attributes. Deriving the citation down to the
// lever's floor (y=562) would put 47px between an attribution and its claim, which is
// the one adjacency a citation may never lose.
//
// Pure data and pure functions. No React, no DOM, and no work at module scope beyond
// the arithmetic below.

// ───────────────────── the stage, restated and pinned ─────────────────────

/** The ledger module, as a TYPE only — the pin's other end. Same construction, same
 *  reason, as `./security-geometry.ts`'s. */
type Ledger = typeof import("./geometry");

/**
 * This slide's copy, as a TYPE only — the other end of the three count pins
 * ({@link GAP_COUNT}, {@link CAPABILITY_COUNT}, {@link TIER_COUNT}). Type-space only:
 * bare Node cannot load `./content.ts` at all (its `@/` runtime import is the point
 * of it), and this reference does not ask it to.
 */
type SubscriptionCopy = (typeof import("./content"))["investSubscriptionContent"];

/** The stage. 1280×720, PINNED to `./geometry.ts`'s own `STAGE` — see
 *  `./security-geometry.ts`'s twin for what the pin does and does not guarantee. */
export const STAGE: Ledger["STAGE"] = { width: 1280, height: 720 };

/** The deck's side margin — `.fig-label`, `.slide-headline-row` and `.slide-content`
 *  all sit at `left: 48px` in `src/styles/globals.css`. PINNED, like {@link STAGE}. */
export const SIDE_MARGIN: Ledger["SIDE_MARGIN"] = 48;

/** The width every full-bleed box on this stage gets: 1184. RE-DERIVED, NOT PINNED —
 *  the ledger computes this one, so its declared type is the widened `number` and an
 *  annotation could not fail. Same for {@link NAV_ZONE_TOP}. */
export const CONTENT_WIDTH = STAGE.width - 2 * SIDE_MARGIN;

/** `.nav-zone` is `bottom: 0; height: 88px`, so its top edge is y=632 — the floor. */
export const NAV_ZONE_TOP = STAGE.height - 88;

// ───────────────────── the grid ─────────────────────

/** How many columns the stage is cut into: 3 — a literal `const`, so the weld at
 *  {@link colLeft} is compile-visible. The upper grid spends them as beat 1 · beat 2 ·
 *  beat 2's payoff; the lower as beat 3 (two of them) · the brand anchor. */
export const COL_COUNT = 3;

/** The gutter between two columns: 28 — `./security-geometry.ts`'s own number, kept so
 *  the section's two grid slides group at the same white space. Not exported. */
const COL_GAP = 28;

/** One column: 376. Derived, so the three tile {@link CONTENT_WIDTH} exactly —
 *  `856 + 376 = 1232 = 1280 − 48`. */
export const COL_W = (CONTENT_WIDTH - (COL_COUNT - 1) * COL_GAP) / COL_COUNT;

/** Two columns plus the gutter between them: 780 — the measure beat 3's formula, tier
 *  table and lever line are set in. A SPAN, not a fourth column: the tier price
 *  strings carry currency, period and date-read in one uncut string (§12.2), and a
 *  376px measure would wrap every one of them. */
export const WIDE_W = 2 * COL_W + COL_GAP;

/** The one shelf the grid starts on: 156 — `.slide-content`'s own `top`, clearing the
 *  40px headline row that ends at y=122. All three siblings make the same call. */
export const CONTENT_TOP = 156;

// ───────────────────── the upper stage · beats 1 and 2 ─────────────────────

/** A mono eyebrow's box: 16. 11px on 1.3 is a 14.30 line box; the box carries 1.70
 *  more. ONE CONSTANT FOR ALL FIVE eyebrows on this stage — three upper, two lower —
 *  same call as `./security-geometry.ts`'s. */
export const EYEBROW_HEIGHT = 16;

/** The air between an eyebrow and the body it labels: 12 — the section's binding gap.
 *  Not exported. */
const EYEBROW_TO_BODY = 12;

/** A 15px sans row's box: 22 — one 19.50 line box plus 2.50 spare, the same row every
 *  list in this section uses (`./chicken-egg-geometry.ts` and
 *  `./security-geometry.ts` both cut it). One height for ALL FOUR lists on this slide:
 *  the four gaps, the four capabilities, the three tier rows and the lever line. */
export const LIST_ROW_HEIGHT = 22;

/** The air between two upper-list rows: 16 — the section's list rhythm. Not exported. */
const LIST_ROW_GAP = 16;

/** How far apart two upper rows sit: 38. Derived. Not exported. */
const LIST_ROW_PITCH = LIST_ROW_HEIGHT + LIST_ROW_GAP;

/** Where every upper column's body starts: 184. */
export const ROWS_TOP = CONTENT_TOP + EYEBROW_HEIGHT + EYEBROW_TO_BODY;

/**
 * How many gaps beat 1 names: 4, PINNED to `./content.ts`'s tuple — and how many
 * capabilities beat 2 names, welded to the SAME constant one line below, because the
 * two columns are one comparison: a fifth gap with four capabilities (or the reverse)
 * would render a ledger with a hole in it, and the weld makes that a compile error on
 * whichever tuple moved.
 */
export const GAP_COUNT: SubscriptionCopy["gaps"]["length"] = 4;

/** Beat 2's count, welded to beat 1's — see {@link GAP_COUNT}. */
export const CAPABILITY_COUNT: SubscriptionCopy["capabilities"]["length"] = GAP_COUNT;

/** Where the two four-row columns end: 320. Not exported — {@link RULE_TOP} carries
 *  it forward. */
const UPPER_ROWS_BOTTOM = ROWS_TOP + (GAP_COUNT - 1) * LIST_ROW_PITCH + LIST_ROW_HEIGHT;

/** The analytics line's shelf: 184 — the same shelf the rows start on, one number and
 *  not a second one that agrees: the third column's sentence is beat 2's payoff, read
 *  ACROSS from the capability list, not under it. */
export const ANALYTICS_TOP = ROWS_TOP;

/** The analytics line's box: 50, cut for TWO lines of 18px serif — two 23.40 line
 *  boxes painting 24.55 each (Source Serif 4's content area), 2.05 spare. The same box
 *  `./security-geometry.ts` cuts for its two-line callback, because it is the same
 *  register at the same size in the same 376px column. */
export const ANALYTICS_HEIGHT = 50;

/**
 * Upper row `index`'s top edge, in stage coordinates — one function for BOTH columns,
 * because {@link GAP_COUNT} welds their counts.
 *
 * @throws on a fifth row. THE COUNT IS WHAT REFUSES IT, not the floor: the rule's
 *         shelf is DERIVED from this block's bottom, so a fifth row would not collide
 *         with anything — it would push the rule, the whole lower stage and the closer
 *         down 38px, and the closer is already 14px off the NavBar band. The throw is
 *         what keeps that failure at the call site instead of at the bottom of the
 *         slide.
 */
export function upperRowTop(index: number): number {
  if (!Number.isInteger(index) || index < 0 || index >= GAP_COUNT) {
    throw new Error(
      `upperRowTop: no row ${index} — beats 1 and 2 hold ${GAP_COUNT} rows each ` +
        `(0…${GAP_COUNT - 1}), welded to one count because they are one comparison. ` +
        `A row ${GAP_COUNT} would not collide here: it would push RULE_TOP and the ` +
        `whole lower stage down ${LIST_ROW_PITCH}px, and the closer already ends ` +
        `${NAV_ZONE_TOP - CLOSER_BOTTOM}px above the NavBar band. Both tuples in ` +
        `./content.ts refuse the fifth entry first.`,
    );
  }
  return ROWS_TOP + index * LIST_ROW_PITCH;
}

// ───────────────────── the rule that closes the comparison ─────────────────────

/** The air between the upper rows and the rule: 24 — a beat change, three times the
 *  binding gap. Not exported. */
const UPPER_TO_RULE = 24;

/** The copper rule's shelf: 344. It spans all three columns for
 *  `./security-geometry.ts`'s reason: it closes a BEAT, not a list — above it what the
 *  seats are, below it what they cost. */
export const RULE_TOP = UPPER_ROWS_BOTTOM + UPPER_TO_RULE;

/** `.copper-rule` is `height: 1px` in `src/styles/globals.css`. */
export const RULE_HEIGHT = 1;

/** The air between the rule and the lower stage: 24, matched to the air above it. Not
 *  exported. */
const RULE_TO_LOWER = 24;

/** The one shelf both lower columns start on: 369. */
export const LOWER_TOP = RULE_TOP + RULE_HEIGHT + RULE_TO_LOWER;

// ───────────────────── beat 3 · the formula and its table (col 0–1) ─────────────────

/** The formula's shelf: 397. */
export const FORMULA_TOP = LOWER_TOP + EYEBROW_HEIGHT + EYEBROW_TO_BODY;

/** The formula's box: 31 — 22px mono on 1.1, whose content area (28.60) is the larger
 *  of the two extents, plus 2.40 spare. The same box `./security-geometry.ts` cuts for
 *  its 22px figures, because it is the same register at the same size. */
export const FORMULA_HEIGHT = 31;

/** The air between the formula and the tier table: 14 — bigger than the 12 that binds
 *  a label, smaller than a 24 beat change: the table is the formula's own price input,
 *  not a new claim. Not exported. */
const FORMULA_TO_TIERS = 14;

/** The tier table's first row: 442. */
const TIERS_TOP = FORMULA_TOP + FORMULA_HEIGHT + FORMULA_TO_TIERS;

/** The air between two tier rows: 10 — TIGHTER than the upper lists' 16, and the
 *  difference is the point: the gaps and capabilities are read row by row, and the
 *  tier table is scanned as ONE price block the formula points into. Not exported. */
const TIER_ROW_GAP = 10;

/** How far apart two tier rows sit: 32. Not exported. */
const TIER_ROW_PITCH = LIST_ROW_HEIGHT + TIER_ROW_GAP;

/** How many tiers beat 3 prices: 3, PINNED to `./content.ts`'s tuple. THREE IS THE
 *  TIERING — most of the division, a few heavy builders, the 150-seat threshold — and
 *  a fourth row would push the lever line and the closer toward a floor with 14px of
 *  slack. {@link tierRowTop} throws on it. */
export const TIER_COUNT: SubscriptionCopy["tiers"]["length"] = 3;

/** Where the tier table ends: 528. Not exported. */
const TIERS_BOTTOM = TIERS_TOP + (TIER_COUNT - 1) * TIER_ROW_PITCH + LIST_ROW_HEIGHT;

/** The air between the table and the lever line under it: 12. The lever is the
 *  table's own footnote — the same two plans, billed the other way. Not exported. */
const TIERS_TO_LEVER = 12;

/** The lever line's shelf: 540. */
export const LEVER_TOP = TIERS_BOTTOM + TIERS_TO_LEVER;

/** Where beat 3's left column ends: 562. Not exported — {@link CLOSER_TOP} carries it
 *  forward. */
const LEVER_BOTTOM = LEVER_TOP + LIST_ROW_HEIGHT;

/**
 * Tier row `index`'s top edge, in stage coordinates.
 *
 * @throws on a fourth row. THE FLOOR IS WHAT REFUSES IT: a fourth row pushes the
 *         lever to y={@link LEVER_TOP}+{@link TIER_ROW_PITCH} and the closer to
 *         within {@link TIER_ROW_PITCH}−14 px PAST the NavBar band. The tuple in
 *         `./content.ts` refuses it first, at the definition site.
 */
export function tierRowTop(index: number): number {
  if (!Number.isInteger(index) || index < 0 || index >= TIER_COUNT) {
    throw new Error(
      `tierRowTop: no tier row ${index} — beat 3 prices ${TIER_COUNT} tiers ` +
        `(0…${TIER_COUNT - 1}). A row ${TIER_COUNT} would push the lever line to ` +
        `y=${LEVER_TOP + TIER_ROW_PITCH} and the closer to ` +
        `y=${CLOSER_TOP + TIER_ROW_PITCH}…${CLOSER_BOTTOM + TIER_ROW_PITCH}, ` +
        `${CLOSER_BOTTOM + TIER_ROW_PITCH - NAV_ZONE_TOP}px INSIDE the NavBar's ` +
        `hover band at y=${NAV_ZONE_TOP}.`,
    );
  }
  return TIERS_TOP + index * TIER_ROW_PITCH;
}

// ───────────────────── slot 7 · the brand anchor (col 2) ─────────────────────

/** The anchor line's shelf: 397 — the formula's own shelf, one number: the local
 *  anchor and the formula it anchors are read left to right. */
export const ANCHOR_LINE_TOP = FORMULA_TOP;

/** The anchor line's box: 74, cut for THREE lines of 18px serif (three 23.40 line
 *  boxes painting 71.35, 2.65 spare) — and ONE HEIGHT FOR ALL THREE BRANDS, for
 *  `./security-geometry.ts`'s `CALLBACK_HEIGHT` reason: the Berau prize line and the
 *  GEMS absence line are both cut for three lines in a 376px measure, so the column
 *  does not move between decks. */
export const ANCHOR_LINE_HEIGHT = 74;

/** The air between the anchor line and its citation: 8 — the binding gap a citation
 *  may never lose (see the header for why this column does NOT derive its citation
 *  down to the tier table's floor). Not exported. */
const ANCHOR_TO_SOURCE = 8;

/** The anchor citation's shelf: 479. Only the two arms with something to attribute
 *  render here; `no-organisation` prints no element (the union has no `source` field
 *  to leave empty). */
export const ANCHOR_SOURCE_TOP = ANCHOR_LINE_TOP + ANCHOR_LINE_HEIGHT + ANCHOR_TO_SOURCE;

/** A three-line citation's box: 44 — three 13.65 line boxes of 10.5px mono (40.95),
 *  3.05 spare. Taller than `./security-geometry.ts`'s two-line 30 because §8.1's
 *  attribution has three duties in one string (organizer's value · not the vendor's
 *  price · the vendor's own number, dated) and cutting it for two lines would invite
 *  the trim the §12.2 gate forbids. */
export const ANCHOR_SOURCE_HEIGHT = 44;

// ───────────────────── the closer ─────────────────────

/** The air between beat 3's floor and the closer: 24 — a beat change. Not exported. */
const LEVER_TO_CLOSER = 24;

/** The closer's shelf: 586. Full width — the one sentence on the slide addressed to
 *  every column above it. */
export const CLOSER_TOP = LEVER_BOTTOM + LEVER_TO_CLOSER;

/** The closer's box: 32, cut for ONE line of 22px serif — the same box every 22px
 *  verdict in this section takes. One line is a claim a browser check settles. */
export const CLOSER_HEIGHT = 32;

/** Where the stage's lowest box ends: 618. Not exported — the clearance below carries
 *  its whole content. */
const CLOSER_BOTTOM = CLOSER_TOP + CLOSER_HEIGHT;

/** What is left between the closer and the NavBar's hover band: 14px — the thinnest
 *  clearance in this directory, spent deliberately (see the header). Derived from both
 *  ends, so an edit anywhere above moves it and a check fails on it before the stage
 *  crosses the band. */
export const NAV_ZONE_CLEARANCE = NAV_ZONE_TOP - CLOSER_BOTTOM;

// ───────────────────── the derivations ─────────────────────

/**
 * Column `index`'s left edge, in stage coordinates: 48, 452, 856.
 *
 * ABSOLUTE AND NOT SLOT-RELATIVE, like every placement function in this directory:
 * every box on this slide is placed against the stage.
 *
 * @throws on a fourth column — the grid refuses it, exactly as
 *         `./security-geometry.ts`'s does: the three columns tile the content width,
 *         and column 2 already carries beat 2's payoff and the brand anchor.
 */
export function colLeft(index: number): number {
  if (!Number.isInteger(index) || index < 0 || index >= COL_COUNT) {
    throw new Error(
      `colLeft: no column ${index} — the stage is a ${COL_COUNT}-column grid ` +
        `(0…${COL_COUNT - 1}) tiling the deck's ${CONTENT_WIDTH}px content width ` +
        `(${COL_COUNT} × ${COL_W} + ${COL_COUNT - 1} × ${COL_GAP}). Column 2 already ` +
        `carries the November tie above the rule and the brand anchor below it.`,
    );
  }
  return SIDE_MARGIN + index * (COL_W + COL_GAP);
}
