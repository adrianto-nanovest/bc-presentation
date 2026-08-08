// Three things we got wrong, as numbers — stage coordinates for a 1280×720 stage.
//
// TWO BANDS, AND THE FIRST ONE IS A LEDGER WITH A VERTICAL SPINE. Band 1 is one mono
// heading and three dated entries: a PERIOD RAIL down the left, right-aligned so every
// date hugs the same edge; a 1px SPINE beside it running the height of the three
// entries; a small filled MARK sitting on the spine at each entry's title shelf; and to
// the right of the spine, per entry, a mono title with two prose lines under it — what
// we did, and what it cost. One copper rule closes the ledger. Band 2 is the closer,
// full width, alone.
//
// THE SPINE IS WHY THIS FILE EXISTS AND NOT A REUSE OF EITHER NEIGHBOUR'S MODULE. Two
// slides in front of this one in the same run already draw a horizontal image:
// `./hardest-part-geometry.ts` cuts a split BAR whose two segments are a quoted
// statistic, and `./no-sop-geometry.ts` lays out a lopsided DIPTYCH of two columns with
// four empty rules in the right one. A third horizontal figure in three consecutive
// slides is how a run starts reading as one long slide. This one is VERTICAL and it is
// vertical for a reason the copy carries: a confession is a record kept in order, and
// the shape of a record kept in order is a dated margin with entries hanging off it.
//
// THE SPINE IS THE LEDGER'S MARGIN AND NOT EVIDENCE, which is why {@link SPINE_TOP} and
// {@link SPINE_HEIGHT} span all three entries from the first pose, when only the first
// entry has arrived. A spine that grew one entry at a time would be a progress bar —
// it would say "there is more coming", and a room counting how many admissions are left
// is a room that has stopped listening to the one on the stage. A full-height rule
// beside a single entry says the opposite and says it honestly: the record has three
// lines in it, and this is the first.
//
// NOTHING IS PINNED TO `./geometry.ts`, `./hardest-part-geometry.ts` OR
// `./no-sop-geometry.ts`. The ladder's module exports treads and slots and no stage
// constants at all, and the two figure modules that do restate the stage restate it
// from `src/styles/globals.css` rather than from each other — a cross-import between
// two slides' geometry welds two stages that only happen to agree today. So the stage
// facts below are RESTATED from that stylesheet (the authority for all four) and carry
// the arithmetic that would fail if one of them moved.
//
// Proved importable from bare Node, not assumed — the property every geometry module in
// this tree keeps, so a coordinate can be checked without a bundler:
//
//   $ node --experimental-strip-types -e \
//       'import("./src/slides/leader-gap/three-failures-geometry.ts")
//          .then(m => console.log(Object.keys(m).length, "exports"))'
//
// THE VERTICAL BUDGET, top to bottom, and it is arithmetic rather than measurement.
// `.fig-label` at y=36, `.slide-headline-row` at y=80; a one-line `.slide-headline.small`
// (40px on 1.05) ends the headline row at y=122; band 1 starts on {@link CONTENT_TOP} =
// 156, `.slide-content`'s own `top` — the call every recent leader slide makes.
//
//   ─── BAND 1 · THE LEDGER ── rail 132 · spine at x=196 · entries from x=217 ───
//   156  the ledger's one eyebrow · 11px mono caps                        → 172
//
//        the spine · 1px wide, x=196, y=184 … 514                        (330 tall)
//
//   184  entry 0 · period (rail, right-aligned) + title · 11px mono caps  → 200
//   188      its mark, on the spine · 9 × 8                               → 196
//   208      what we did   · 15px serif, ONE line                         → 230
//   236      what it cost  · 15px serif, TWO lines budgeted               → 278
//   302  entry 1 · period + title                                        → 318
//   306      its mark                                                     → 314
//   326      what we did                                                  → 348
//   354      what it cost                                                 → 396
//   420  entry 2 · period + title                                        → 436
//   424      its mark                                                     → 432
//   444      what we did                                                  → 466
//   472      what it cost                                                 → 514
//
//   542  copper rule ···· spans the full width                            → 543
//
//   ─────────────── BAND 2 · THE CLOSER ────────────────────────────────────────
//   583  closer · 22px serif, full width, ONE line                        → 615
//   ─────────────────────────────────────────────────────────────────────────────
//   floor y=632 · lowest painted box 615 · {@link NAV_ZONE_CLEARANCE} = 17
//
// THE FLOOR IS THE HOVER BAND AND NOT `.slide-content`'s BOTTOM, the same rule the
// leader tree's other geometry modules keep: `.nav-zone` is `bottom: 0; height: 88px`,
// so nothing on this stage may cross y=632.
//
// WHY `cost` GETS A TWO-LINE BOX AND `did` GETS ONE, WHICH IS THE ONE ASYMMETRY HERE
// AND IS MEASURED RATHER THAN PREFERRED. Both rows are the same register in the same
// measure — 15px serif in {@link ENTRY_WIDTH} = 1015px, which is ≈135 characters a line
// (see {@link ENTRY_WIDTH} for the per-character arithmetic). The longest `did` in
// `./content.ts` is 116 characters ≈ 866px, 85% of the measure, so it is a one-liner
// with 149px of reword margin. The longest `cost` is 129 characters ≈ 963px, 95% of the
// measure — one line by arithmetic, but 5% of margin against an average-advance estimate
// is not a margin, and the failure mode of getting it wrong is a wrap into the entry
// underneath, which is the one fault on this stage a reader would take for a design. So
// the cost row budgets TWO lines and pays 20px for the certainty. Three two-line rows
// per entry would not fit: 3 × (16 + 8 + 42 + 6 + 42) plus the gaps puts the closer
// through the floor by ~30px, which is what the derived clearance below reports.
//
// Pure data and pure functions. No React, no DOM, and no work at module scope beyond
// the arithmetic below.

// ───────────────────── the stage, restated ─────────────────────

/**
 * This slide's copy, as a TYPE only — the other end of the count pin
 * ({@link FAILURE_COUNT}). Type-space only, so bare Node never has to resolve it.
 */
type ThreeFailuresCopy = (typeof import("./content"))["gapThreeFailuresContent"];

/** The stage. 1280×720 — the deck's one stage size, restated (see the header for why
 *  there is nothing in this directory to pin it to). */
export const STAGE = { width: 1280, height: 720 } as const;

/** The deck's side margin — `.fig-label`, `.slide-headline-row` and `.slide-content`
 *  all sit at `left: 48px` in `src/styles/globals.css`. */
export const SIDE_MARGIN = 48;

/** The width every full-bleed box on this stage gets: 1184. */
export const CONTENT_WIDTH = STAGE.width - 2 * SIDE_MARGIN;

/** `.nav-zone` is `bottom: 0; height: 88px`, so its top edge is y=632 — the floor
 *  nothing on this stage may cross. */
export const NAV_ZONE_TOP = STAGE.height - 88;

/** The one shelf band 1 starts on: 156 — `.slide-content`'s own `top`, clearing the
 *  40px headline row that ends at y=122. */
export const CONTENT_TOP = 156;

// ───────────────────── the registers, as box heights ─────────────────────

/**
 * A mono caps row's box: 16. 11px on 1.3 is a 14.30 line box; the box carries 1.70 more.
 *
 * ONE CONSTANT FOR EVERY MONO ROW ON THIS STAGE — the ledger's eyebrow, the three period
 * labels and the three entry titles. They are one register in three measures, and giving
 * a title a taller box would rank it over its own date by size for a difference the
 * ledger already carries by position.
 */
export const MONO_ROW_HEIGHT = 16;

/** The air between a label and the body it labels: 12 — the leader tree's binding gap.
 *  Not exported. */
const LABEL_TO_BODY = 12;

/** A beat change: 28. Not exported. */
const BAND_GAP = 28;

// ───────────────────── band 1 · the ledger's frame ─────────────────────

/** The ledger's one heading, on the content shelf: 156. */
export const LEDGER_EYEBROW_TOP = CONTENT_TOP;

/** Where the first entry — and the spine — begin: 184. */
export const BODY_TOP = LEDGER_EYEBROW_TOP + MONO_ROW_HEIGHT + LABEL_TO_BODY;

/** The period rail's left edge: 48 — the stage's own margin. */
export const RAIL_LEFT = SIDE_MARGIN;

/**
 * The period rail: 132, and it is a POSITION rather than a text budget.
 *
 * THE CHARACTER MEASURE, STATED. JetBrains Mono's advance is 0.6em, so an 11px character
 * is 6.60px, and `letter-spacing: 0.22em` adds 2.42px after each one — 9.02px per
 * character. 132px is therefore ≈14.6 characters, and the longest period `./content.ts`
 * holds ("Q2–Q4 2025", ten characters) measures 90.20px. The 41.80px left over is not
 * slack waiting to be reclaimed: the rail is RIGHT-ALIGNED to the spine, so its width is
 * what decides where the spine stands, and every date ends on the same edge whatever its
 * length.
 *
 * THE NUMBER IS FIXED FROM THE OTHER END, and that is the constraint worth knowing before
 * changing it. Every pixel here is a pixel {@link ENTRY_WIDTH} does not get, and the
 * right column has to hold a 129-character sentence inside two lines. Widening this rail
 * past ~180 starts costing the ledger a line.
 */
export const RAIL_WIDTH = 132;

/** The air between the right-aligned dates and the spine: 16. Tighter than the spine's
 *  own indent on the other side, because a date belongs to the entry it names and the
 *  gap is what says so. Not exported. */
const RAIL_TO_SPINE = 16;

/** The spine's left edge: 196. */
export const SPINE_LEFT = RAIL_LEFT + RAIL_WIDTH + RAIL_TO_SPINE;

/** The spine's thickness: 1 — `.copper-rule`'s own height, restated, because the spine
 *  is a plain box rather than that class (see the component on why) and jsdom computes
 *  no stylesheet. */
export const SPINE_WIDTH = 1;

/** The air between the spine and an entry's text: 20. Wider than {@link RAIL_TO_SPINE},
 *  so the spine reads as a margin the entries hang off rather than as a divider between
 *  two columns of equal weight. Not exported. */
const SPINE_TO_ENTRY = 20;

/** Where every entry's title, prose and keywords start: 217. */
export const ENTRY_LEFT = SPINE_LEFT + SPINE_WIDTH + SPINE_TO_ENTRY;

/**
 * The measure every entry's text gets: 1015 — derived as the REMAINDER, so the rail, the
 * spine, the indent and the text tile {@link CONTENT_WIDTH} exactly whatever the rail is
 * set to.
 *
 * THE CHARACTER BUDGET, STATED, because this is the number the copy was cut against.
 * Source Serif 4 averages ≈0.4977em per character in English prose (the deck's own
 * measured datum: 124 characters of 17px serif measure ≈1050px), which is 7.47px at
 * 15px. So this measure holds ≈135 characters on ONE line and ≈271 across TWO, against
 * `./content.ts`'s longest `did` (116 characters, ≈866px) and longest `cost` (129
 * characters, ≈963px). Every prose row on this stage therefore sits on at most two
 * lines, which is what {@link COST_HEIGHT} budgets and {@link DID_HEIGHT} does not need
 * to — see the header for why the two rows differ.
 *
 * The three mono titles are far inside it: the longest is 30 characters, 270.60px at
 * 9.02px per character, a quarter of the measure.
 */
export const ENTRY_WIDTH = CONTENT_WIDTH - (ENTRY_LEFT - SIDE_MARGIN);

// ───────────────────── band 1 · one entry ─────────────────────

/**
 * How many failures are on the record: 3, PINNED to `./content.ts`'s tuple.
 *
 * Three is the copy's own count — the research documents three, the headline says three
 * and the figure label says three — and it is also what this stage is cut for. A fourth
 * entry deepens the ledger by {@link ENTRY_PITCH} = 118px, takes the rule, the closer and
 * {@link NAV_ZONE_CLEARANCE} with it, and lands the closer 101px inside the NavBar's
 * hover band. The tuple in `./content.ts` refuses it first; this pin is what makes that
 * refusal a compile error here too.
 */
export const FAILURE_COUNT: ThreeFailuresCopy["failures"]["length"] = 3;

/** The air between an entry's title and what we did: 8. Not exported. */
const TITLE_TO_DID = 8;

/** A one-line 15px serif row's box: 22. 15px on 1.3 is a 19.50 line box painting 20.46
 *  (Source Serif 4's content area), so the box carries 1.54 spare. */
export const DID_HEIGHT = 22;

/** The air between what we did and what it cost: 6 — the tightest gap on the stage. The
 *  two lines are ONE record entry, not two claims, and the gap is what says the
 *  consequence belongs to the decision above it. Not exported. */
const DID_TO_COST = 6;

/** A two-line 15px serif row's box: 42. Two 19.50 line boxes are 39.00, painting 39.96,
 *  so the box carries 2.04 spare. TWO LINES ARE BUDGETED AND ONE IS USUALLY PAINTED —
 *  see the header: the longest cost sentence is 95% of {@link ENTRY_WIDTH} and the box
 *  buys certainty rather than space. */
export const COST_HEIGHT = 42;

/** How tall one entry is: 94. Derived over every row and gap inside it, so a register
 *  change moves the ledger, the rule, the closer and the clearance together. */
export const ENTRY_HEIGHT =
  MONO_ROW_HEIGHT + TITLE_TO_DID + DID_HEIGHT + DID_TO_COST + COST_HEIGHT;

/** The air between two entries: 24. Three times {@link DID_TO_COST} and three times
 *  {@link TITLE_TO_DID}, which is what keeps five boxes reading as one entry rather than
 *  as five rows down a list. Not exported. */
const ENTRY_GAP = 24;

/** How far apart two entries sit: 118. Derived. Not exported. */
const ENTRY_PITCH = ENTRY_HEIGHT + ENTRY_GAP;

/**
 * The mark that sits ON the spine at an entry's title shelf: 9 wide.
 *
 * ODD ON PURPOSE, so it centres on a 1px spine at an integer coordinate:
 * `196 + (1 − 9) / 2 = 192`. It is the only box on this stage that straddles another
 * one, and a half-pixel mark on a hairline is a smudge on a projector.
 */
export const MARK_WIDTH = 9;

/** The mark's height: 8 — even, so it centres on the 16px title row at an integer
 *  offset of 4. Eight against the spine's one is what makes it read as a MARK on the
 *  record rather than as a thickening of the margin. */
export const MARK_HEIGHT = 8;

/** The mark's left edge: 192 — centred on the spine, derived from it rather than typed,
 *  so the mark cannot drift off the line it sits on. */
export const MARK_LEFT = SPINE_LEFT + (SPINE_WIDTH - MARK_WIDTH) / 2;

/**
 * The guard every placement function on this stage shares, so an index one of them
 * accepts is always an index the others place. Not exported.
 *
 * The message names what a fourth entry would MOVE, because that is the failure a caller
 * cannot see: the throw is loud, the silent version is a closer painted under the NavBar.
 */
function assertFailure(fn: string, index: number): void {
  if (!Number.isInteger(index) || index < 0 || index >= FAILURE_COUNT) {
    throw new Error(
      `${fn}: no failure ${index} — the record holds ${FAILURE_COUNT} ` +
        `(0…${FAILURE_COUNT - 1}). The tuple in ./content.ts refuses the extra entry ` +
        `first, and a fourth would deepen the ledger by ${ENTRY_PITCH}px, push the ` +
        `spine, the rule and the closer down with it, and land the closer ` +
        `${ENTRY_PITCH - NAV_ZONE_CLEARANCE}px inside the NavBar band at y=${NAV_ZONE_TOP}.`,
    );
  }
}

/**
 * Entry `index`'s shelf, in stage coordinates: 184, 302, 420.
 *
 * ONE SHELF FOR THE PERIOD AND THE TITLE, on either side of the spine. They are one
 * beat — a date with no name is a stray label and a name with no date is not a record —
 * so nothing in this module gives either of them a shelf of its own.
 *
 * @throws on a fourth entry — see {@link assertFailure}.
 */
export function entryTop(index: number): number {
  assertFailure("entryTop", index);
  return BODY_TOP + index * ENTRY_PITCH;
}

/**
 * The top edge of entry `index`'s mark on the spine: 188, 306, 424 — centred on the
 * title row's box.
 *
 * DERIVED FROM THE SHELF AND NOT TYPED, so the mark cannot drift off the entry it marks
 * when the mono register changes.
 *
 * @throws on a fourth entry — see {@link assertFailure}.
 */
export function markTop(index: number): number {
  assertFailure("markTop", index);
  return entryTop(index) + (MONO_ROW_HEIGHT - MARK_HEIGHT) / 2;
}

/**
 * The top edge of entry `index`'s "what we did" row: 208, 326, 444.
 *
 * @throws on a fourth entry — see {@link assertFailure}.
 */
export function didTop(index: number): number {
  assertFailure("didTop", index);
  return entryTop(index) + MONO_ROW_HEIGHT + TITLE_TO_DID;
}

/**
 * The top edge of entry `index`'s "what it cost" row: 236, 354, 472.
 *
 * @throws on a fourth entry — see {@link assertFailure}.
 */
export function costTop(index: number): number {
  assertFailure("costTop", index);
  return didTop(index) + DID_HEIGHT + DID_TO_COST;
}

// ───────────────────── band 1 · the spine ─────────────────────

/** Where the ledger ends: 514 — the last entry's own bottom edge. */
export const LEDGER_BOTTOM = BODY_TOP + (FAILURE_COUNT - 1) * ENTRY_PITCH + ENTRY_HEIGHT;

/** The spine's top: 184 — the first entry's shelf, not the eyebrow's. The heading names
 *  the ledger; the spine holds the entries. */
export const SPINE_TOP = BODY_TOP;

/**
 * The spine's height: 330 — from the first entry's shelf to the last entry's bottom.
 *
 * DERIVED OVER THE WHOLE RECORD AND DRAWN AT THE FIRST POSE, when one entry has arrived.
 * See the header: a spine that grew with the entries would be a progress bar, and this
 * one is a margin.
 */
export const SPINE_HEIGHT = LEDGER_BOTTOM - SPINE_TOP;

// ───────────────────── the rule that closes the ledger ─────────────────────

/** The copper rule's shelf: 542. It spans the FULL width, not the ledger's: above it is
 *  the record, below it is the one line that owns it. */
export const RULE_TOP = LEDGER_BOTTOM + BAND_GAP;

/** `.copper-rule` is `height: 1px` in `src/styles/globals.css` — restated, because jsdom
 *  computes no stylesheet and a test that read this box's height off the DOM would read
 *  `NaN`. */
export const RULE_HEIGHT = 1;

// ───────────────────── band 2 · the closer ─────────────────────

/** The air between the rule and the closer: 40 — the biggest gap on the stage, and the
 *  one place this slide spends its slack. Everything above the rule is a record; the
 *  sentence below it is the only one addressed to the room, and it is set apart from the
 *  three entries it answers for. Not exported. */
const RULE_TO_CLOSER = 40;

/** The closer's shelf: 583. Full width — the one sentence that owns every entry above
 *  it. */
export const CLOSER_TOP = RULE_TOP + RULE_HEIGHT + RULE_TO_CLOSER;

/** The closer's box: 32, cut for ONE line of 22px serif — a 28.60 line box painting
 *  30.01, 1.99 spare. The same box every 22px verdict in the leader tree takes. */
export const CLOSER_HEIGHT = 32;

/** Where the stage's lowest box ends: 615. Not exported — the clearance below carries
 *  its whole content. */
const CLOSER_BOTTOM = CLOSER_TOP + CLOSER_HEIGHT;

/** What is left between the closer and the NavBar's hover band: 17px. Derived from BOTH
 *  ends — the ledger's own depth at the top and the closer's box at the bottom — so an
 *  edit anywhere above moves it and a test fails on it before the stage crosses the
 *  band. */
export const NAV_ZONE_CLEARANCE = NAV_ZONE_TOP - CLOSER_BOTTOM;
