// Three organisational bands and two directions out of the middle one, as numbers —
// stage coordinates for a 1280×720 stage.
//
// THREE FULL-WIDTH BANDS, TOP TO BOTTOM: the board and the C-suite, BU and division
// heads, the teams. Each one is a box of identical height holding a mono row label and
// two claim rows, and each box reserves a column on its right that stays empty until
// the last pose. At that pose the reserved column fills: the top band's holds the
// translation that travels UP into it, the bottom band's holds the one that travels
// DOWN into it, and the middle band's holds the label both of them belong to. Between
// the claims and that column runs a narrow RAIL carrying the two direction lines and
// the one origin bar they leave from.
//
// ═══ THE GEOMETRY IS THE ANTI-LADDER GUARANTEE, WHICH IS WHY IT LIVES HERE AND NOT IN
// THE COMPONENT. §6.6 refuses a third ladder beside L1–L5 and P0–P3 in as many words
// ("Learn → Experiment → Build → Integrate → Own is OUT: it would be a THIRD ladder"),
// and three stacked bands are one careless number away from being one. So:
//
//   · ALL THREE BANDS ARE THE SAME HEIGHT ({@link BAND_HEIGHT}), start at the same
//     left edge ({@link BAND_LEFT}) and are the same width ({@link BAND_WIDTH}). There
//     is exactly one placement function, {@link bandTop}, and it is `i × pitch` — so a
//     band CANNOT be indented, inset, widened or grown to rank it. A chart whose rows
//     differ only in what they say is an org chart; one whose rows differ in size is a
//     scale, and no edit to `./content.ts` can turn this one into the second.
//   · THE MIDDLE BAND IS RANKED BY COLOUR AND BY NOTHING THIS MODULE OWNS. It gets no
//     extra height, no extra width, no offset and no halo. {@link MIDDLE_BAND_INDEX}
//     is the only thing exported about it, and it is DERIVED (see below) rather than
//     typed, so the band the argument is about cannot end up being a different row
//     from the band the chart draws in the middle.
//   · THE TWO DIRECTION LINES ARE THE SAME LENGTH ({@link RULE_HEIGHT}, which IS
//     {@link BAND_PITCH}) and sit at DIFFERENT x ({@link UPWARD_RULE_LEFT} against
//     {@link DOWNWARD_RULE_LEFT}). Two collinear strokes with a gap between them would
//     read as one dashed axis with a stop on it — an axis with three marks is a scale
//     — so they are offset instead, and the only horizontal mark on the stage is
//     {@link ORIGIN_BAR_TOP}'s single bar joining them at the MIDDLE band's own centre
//     line. One origin, two directions, no stops.
//
// ═══ NO COLOUR IS EXPORTED FROM THIS MODULE AT ALL, and that is a decision rather than
// an omission. Rank on this stage is a colour tier and reveal is opacity, and the two
// must not be reachable from the same place: a geometry module that exported a token
// name would let a renderer resolve "which band is bright" and "which band has
// arrived" out of one object, which is exactly how a slide ends up expressing rank as
// opacity. The tiers live in the component, in the one table
// `leader-gap/components/NoSopBeats.tsx` established — CSS var names only, no hex and
// no `rgba()` literal — and this module exports the two facts that table needs:
// {@link MIDDLE_BAND_INDEX} and nothing else.
//
// ═══ THE FIGURE MOUNTS NO `<svg>`, AND THIS MODULE IS SHAPED SO IT DOES NOT HAVE TO.
// The zero-SMIL requirement is closed BY CONSTRUCTION the way `gap-no-sop` closes it:
// mount no `<svg>` node, and there is no `<animate>`, `<animateTransform>`,
// `<animateMotion>`, `<set>` or `<animateColor>` to gate at any pose under any motion
// preference. Every graphic on this stage is therefore a POSITIONED BOX — three band
// rectangles, two vertical rules and one horizontal bar — and every number below is a
// `left`/`top`/`width`/`height` in px for exactly that reason. The two rules are
// 2px-wide boxes, not `<line>` elements. Do not reach for SVG here: it would buy
// nothing and re-open a question the deck answers with a `matchMedia` gate three times
// elsewhere.
//
// ═══ NOTHING IS PINNED TO `./geometry.ts`, though it stands two files away and agrees
// about the stage. The rule the leader tree keeps is that a figure module restates the
// stage from `src/styles/globals.css` — the authority — rather than importing a
// sibling's copy of it, because a cross-import welds two stages that only happen to
// agree today. `./geometry.ts` cut its ring against a NavBar floor and a headline
// ceiling; this module reads the same two rules from the same stylesheet and derives
// its own numbers from them.
//
// Proved importable from bare Node, not assumed — the property every geometry module
// in this tree keeps, so a coordinate can be checked without a bundler:
//
//   $ node --experimental-strip-types -e \
//       'import("./src/slides/leader-shape/middle-out-geometry.ts")
//          .then(m => console.log(Object.keys(m).length, "exports"))'
//
// ═══ THE VERTICAL BUDGET, top to bottom, and it is arithmetic rather than measurement.
// `.fig-label` at y=36, `.slide-headline-row` at y=80; a one-line `.slide-headline.small`
// (40px on 1.05) ends the headline row at y=122; the kicker sits on {@link KICKER_TOP}
// = 134 and ends at ≈148, so {@link FIGURE_CEILING} is 152 — the same reasoning and the
// same two numbers `./geometry.ts` records for the slide beside this one. The chart
// starts on {@link CONTENT_TOP} = 156, `.slide-content`'s own `top`.
//
//   ─── BAND · THE BOARD AND THE C-SUITE ───────────────────────── box 156 → 268 ───
//   172  row label · 11px mono caps                                          → 188
//   200  HOLDS  ·  claim row · 15px sans, ONE line                           → 220
//   232  CANNOT ·  claim row · 15px sans, ONE line                           → 252
//                     (x 872) upward translation · 17px serif, TWO lines  188 → 236
//
//   ─── BAND · BU AND DIVISION HEADS ───────────────────────────── box 288 → 400 ───
//   304  row label                                                           → 320
//   332  HOLDS  ·  claim row                                                 → 352
//   364  ALONE  ·  claim row                                                 → 384
//                     (x 872) THE TWO TRANSLATIONS · 11px mono caps       336 → 352
//
//   ─── BAND · THE TEAMS ───────────────────────────────────────── box 420 → 532 ───
//   436  row label                                                           → 452
//   464  HOLDS  ·  claim row                                                 → 484
//   496  CANNOT ·  claim row                                                 → 516
//                     (x 872) downward translation · 17px serif, TWO lines 452 → 500
//
//   ─── THE RAIL (x 808…872, between the claims and the translations) ──────────────
//   212  upward rule    · x 853, 2px wide                                    → 344
//   343  origin bar     · x 825…855, 2px tall, on the MIDDLE band's centre    → 345
//   344  downward rule  · x 825, 2px wide                                    → 476
//
//   ─── THE CLOSER (full width, and the only thing outside every band) ─────────────
//   568  closer · 22px serif, ONE line                                       → 600
//   ───────────────────────────────────────────────────────────────────────────────
//   floor y=632 · lowest painted box 600 · {@link NAV_ZONE_CLEARANCE} = 32
//
// THE FLOOR IS THE HOVER BAND AND NOT `.slide-content`'s BOTTOM, the same rule every
// other geometry module in the leader tree keeps: `.nav-zone` is `bottom: 0; height:
// 88px` in `src/styles/globals.css`, so its top edge is y=632 and nothing on this stage
// may cross it. Content under that band is content the presenter's own pointer makes
// the NavBar fade up over.
//
// ═══ EVERY COPY BUDGET BELOW IS A REAL MEASUREMENT, NOT AN ESTIMATE. Each width was
// read off a `white-space: nowrap` clone in Chromium under the deck's own font
// cascade, with the keyword runs italic exactly as `src/components/highlight.tsx`
// emits them — the method `leader-invest/chicken-egg-geometry.ts` records and argues
// for over `canvas.measureText`. The harness reproduces that module's own published
// figure for its headline to within 0.14% on the fallback face, which is what makes
// the numbers below trustworthy. BOTH FACES ARE GIVEN because the deck loads its four
// families from the Google Fonts CDN and an auditorium without it renders the
// fallbacks — and for the display face the fallback is 30% WIDER, which is what nearly
// cost this slide its one-line headline (see {@link HEADLINE_BUDGET_CHARS}).
//
//   box                 register                     webfont / fallback   measure  lines
//   headline            40px display + kw italic     778.33 /  1004.92      1184     1
//   closer              22px serif  + kw italic      855.95 /   809.38      1184     1
//   claim row (longest) 15px sans   + kw italic      549.25 /   528.69       648     1
//   translation (up)    17px serif  + kw italic      580.92 /   551.64       336     2
//   translation (down)  17px serif  + kw italic      504.36 /   495.28       336     2
//   row label (longest) 11px mono ·0.22em ·upper     225.50 /   225.53       736     1
//   eyebrow (longest)   11px mono ·0.22em ·upper      54.13 /    54.14        72     1
//   kicker              11px mono ·0.22em ·upper     207.47 /   207.50      1184     1
//
// The LINE COUNTS in the last column are not inferred from those widths — each string
// was re-measured a second time as a wrapping block AT its box width, and the heights
// came back identical under both faces. The two translations are two lines each on
// both, which is what {@link TRANSLATION_HEIGHT} is cut for.
//
// Pure data and pure functions. No React, no DOM, no CSS-var strings, and no work at
// module scope beyond the arithmetic below.

// ───────────────────── the stage, restated ─────────────────────

/**
 * This slide's copy, as a TYPE only — the other end of the count pin
 * ({@link BAND_COUNT}). Type-space only, so bare Node never has to resolve it.
 */
type MiddleOutCopy = (typeof import("./content"))["shapeMiddleOutContent"];

/** The stage. 1280×720 — the deck's one stage size, restated (see the header for why
 *  there is nothing this module is allowed to pin it to). */
export const STAGE = { width: 1280, height: 720 } as const;

/** The deck's side margin — `.fig-label`, `.slide-headline-row` and `.slide-content`
 *  all sit at `left: 48px` in `src/styles/globals.css`. */
export const SIDE_MARGIN = 48;

/** The width every full-bleed box on this stage gets: 1184. */
export const CONTENT_WIDTH = STAGE.width - 2 * SIDE_MARGIN;

/**
 * The top edge of the NavBar's HOVER ZONE — the line this figure may not cross: 632.
 *
 * `720 − 88`: `.nav-zone` in `src/styles/globals.css` is `position: absolute; bottom: 0;
 * height: 88px`, and the band is a hover target whether or not the bar inside it is
 * currently at opacity 0.
 */
export const NAV_ZONE_TOP = STAGE.height - 88;

/**
 * Where the standing kicker sits: 134 — the band between the headline and the chart.
 *
 * The same line `./geometry.ts` hangs the sibling slide's kicker from, and for the same
 * arithmetic: `.slide-headline-row` is at `top: 80px` and a one-line
 * `.slide-headline.small` is 40px on 1.05, so the headline ends at y ≈ 122 and 134
 * clears it by 12.
 *
 * IT IS ALSO THE NUMBER THE HEADLINE BUDGET PROTECTS. A headline that wrapped to two
 * lines would end at y ≈ 164 and paint straight through this shelf — see
 * {@link HEADLINE_BUDGET_CHARS}, which exists because the drafted headline did exactly
 * that on the fallback face.
 */
export const KICKER_TOP = 134;

/**
 * The highest y the chart may start at: 152.
 *
 * {@link KICKER_TOP} plus one line of 11px mono (≈14px at the deck's default
 * line-height) puts the kicker's last pixel at ≈148, rounded up to a clear line. The
 * same constant and the same reasoning as `./geometry.ts`'s, restated here rather than
 * imported for the reason the header gives.
 */
export const FIGURE_CEILING = 152;

/** The shelf the chart starts on: 156 — `.slide-content`'s own `top`, and 4px clear of
 *  {@link FIGURE_CEILING}. The call every recent leader slide makes. */
export const CONTENT_TOP = 156;

// ───────────────────── the registers, as box heights ─────────────────────

/** A mono caps box: 16. 11px on 1.3 is a 14.30 line box and JetBrains Mono's content
 *  area is 1.3em, so the painted extent is 14.30 and the box carries 1.70 spare. ONE
 *  CONSTANT FOR EVERY MONO ROW on this stage — the three row labels, the six claim
 *  eyebrows and the translations' shared label. */
export const EYEBROW_HEIGHT = 16;

/** A 15px sans claim row's box: 20 — one 19.50 line box with 0.50 spare, cut for ONE
 *  line. ONE HEIGHT FOR ALL SIX ROWS: a `holds` row and a `qualifier` row are the same
 *  register making two different claims, and giving either a taller box would rank
 *  them by size for a difference the eyebrow beside them already carries. */
export const ROW_HEIGHT = 20;

/** The air between a label and the body it labels: 12 — the leader tree's binding gap.
 *  Not exported. */
const LABEL_TO_ROWS = 12;

/** The air between a band's two claim rows: 12. The same gap as the one above it, so
 *  the label binds to the pair rather than to the first row. Not exported. */
const ROW_GAP = 12;

// ───────────────────── the three bands ─────────────────────

/**
 * How many rows the chart has: 3, PINNED to `./content.ts`'s tuple.
 *
 * THREE IS NOT A LAYOUT CHOICE. It is how many places there are to stand in an
 * organisation as this slide reads it — above the work, in it, and between — and
 * `./content.ts` names them. It is stated here because {@link MIDDLE_BAND_INDEX} is
 * derived from it and nothing else in this module could.
 *
 * AND IT MUST STAY ODD. A chart with an even number of rows has no middle row, and
 * this slide's entire argument is about one. The derivation below is what enforces it:
 * with four bands {@link MIDDLE_BAND_INDEX} is 1.5, which is not an index, and a test
 * asserting `Number.isInteger` on it fails before anything renders.
 */
export const BAND_COUNT: MiddleOutCopy["bands"]["length"] = 3;

/** The topmost row: 0. Named rather than written as a literal at the two call sites
 *  that need it, so "the band the upward translation reaches" is a word. */
export const TOP_BAND_INDEX = 0;

/**
 * The row the whole slide is about: 1 — DERIVED, never typed.
 *
 * `(BAND_COUNT − 1) / 2` is the middle of an odd-length row of boxes, which is the only
 * honest definition of "the middle band": it is not the second one, it is the one with
 * as many bands above it as below. Typing a 1 would leave the argument pointing at the
 * second row from the top the first time the chart changed shape, and nothing would
 * say so — the middle band's only visible difference is a colour tier, so the slide
 * would go on rendering, brightly, about the wrong people.
 *
 * IT IS ALSO WHERE BOTH TRANSLATIONS LEAVE FROM. {@link ORIGIN_BAR_TOP} and
 * {@link TRANSLATION_EYEBROW_TOP} both sit on this band's centre line, and the two
 * direction rules meet there, so re-cutting the chart moves the whole rail with it.
 */
export const MIDDLE_BAND_INDEX = (BAND_COUNT - 1) / 2;

/** The bottom row: 2. Derived, so it is the last band whatever {@link BAND_COUNT} is. */
export const BOTTOM_BAND_INDEX = BAND_COUNT - 1;

/** A band box's horizontal padding: 24. Not exported — the two edges derived from it
 *  are. */
const BAND_PAD_X = 24;

/** A band box's vertical padding: 16. Not exported. */
const BAND_PAD_Y = 16;

/** The left edge of every band box: 48 — the stage's own margin. ONE VALUE FOR ALL
 *  THREE: an indented band would be a band being ranked by position, which is what a
 *  scale does (see the header). */
export const BAND_LEFT = SIDE_MARGIN;

/** Every band box is FULL WIDTH: 1184. Same answer, same reason. Full-bleed is also
 *  what makes three strips read as one organisation rather than as three cards. */
export const BAND_WIDTH = CONTENT_WIDTH;

/**
 * A band's inner height: 80 — a label, a gap, two claim rows and the gap between them.
 *
 * Derived from the five constants above rather than typed, so a taller register or a
 * looser gap moves {@link BAND_HEIGHT}, the pitch, the floor and
 * {@link NAV_ZONE_CLEARANCE} together. Not exported: the two numbers a renderer needs
 * are {@link BAND_HEIGHT} and {@link claimRowTop}.
 */
const BAND_INNER_HEIGHT =
  EYEBROW_HEIGHT + LABEL_TO_ROWS + ROW_HEIGHT + ROW_GAP + ROW_HEIGHT;

/** Every band box's height: 112. THE SAME FOR ALL THREE — see the header; this is the
 *  single number that keeps the chart from being a scale. */
export const BAND_HEIGHT = BAND_INNER_HEIGHT + 2 * BAND_PAD_Y;

/**
 * The air between two band boxes: 20.
 *
 * TIGHTER THAN THE LEADER TREE'S 28px BAND GAP, on purpose. These three boxes are rows
 * of ONE chart, not three bands of an argument, and at 28 they start reading as three
 * separate blocks that happen to be stacked. 20 is close enough to bind them and wide
 * enough that the two direction rules have somewhere to cross. Not exported —
 * {@link BAND_PITCH} carries it.
 */
const BAND_GAP = 20;

/** How far apart two band boxes sit: 132. Derived. It is ALSO the length of each
 *  direction rule ({@link RULE_HEIGHT}), because a rule spans exactly one band's
 *  centre to the next one's. */
export const BAND_PITCH = BAND_HEIGHT + BAND_GAP;

/** The guard every band placement function shares, so an index one of them accepts is
 *  always an index the others place. Not exported. */
function assertBand(fn: string, index: number): void {
  if (!Number.isInteger(index) || index < 0 || index >= BAND_COUNT) {
    throw new Error(
      `${fn}: no band ${index} — the chart has ${BAND_COUNT} ` +
        `(0…${BAND_COUNT - 1}): the board, the middle, the teams. The tuple in ` +
        `./content.ts refuses the extra entry first, and a fourth band would push ` +
        `the closer ${BAND_PITCH}px down through the NavBar band at y=${NAV_ZONE_TOP} ` +
        `— and would leave MIDDLE_BAND_INDEX at 1.5, which is not a row.`,
    );
  }
}

/**
 * Band `index`'s box top, in stage coordinates: 156, 288, 420.
 *
 * ONE FUNCTION, AND IT IS `i × pitch`. There is deliberately no per-band offset table
 * for an edit to reach into — see the header on why equal geometry is what holds the
 * no-new-ladder guardrail.
 *
 * @throws on a fourth band — see {@link assertBand}. An out-of-range BAND index is an
 *         authoring bug and the author must be shown it, exactly as `pillarCentre` in
 *         `./geometry.ts` throws. A POSE is different: `./middle-out-walk.ts` answers
 *         every pose question totally and never throws, because a pose is UI state and
 *         a slide that crashes on one is worse in front of a room than a slide with
 *         nothing revealed.
 */
export function bandTop(index: number): number {
  assertBand("bandTop", index);
  return CONTENT_TOP + index * BAND_PITCH;
}

/**
 * Band `index`'s vertical centre line: 212, 344, 476.
 *
 * THE RAIL IS BUILT ENTIRELY OUT OF THIS. Both direction rules start and end on one of
 * these three lines, the origin bar sits on the middle one, and each translation box is
 * centred on the line of the band it belongs to — so the whole right-hand half of the
 * figure moves with the chart and cannot come to disagree with it.
 *
 * @throws through {@link bandTop} on a band the chart does not have.
 */
export function bandCentreY(index: number): number {
  return bandTop(index) + BAND_HEIGHT / 2;
}

/** Where the chart ends: 532. Not exported — {@link CLOSER_TOP} carries it forward. */
const BANDS_BOTTOM = CONTENT_TOP + (BAND_COUNT - 1) * BAND_PITCH + BAND_HEIGHT;

// ───────────────────── inside a band: the three columns ─────────────────────

/** The left edge of everything inside a band box: 72. */
export const BAND_INNER_LEFT = BAND_LEFT + BAND_PAD_X;

/** The width available inside a band box: 1136. Not exported — the three columns
 *  derived from it are, and they tile it exactly. */
const BAND_INNER_WIDTH = BAND_WIDTH - 2 * BAND_PAD_X;

/**
 * The column the translations print in: 336, and it is EMPTY until the last pose.
 *
 * CUT FOR TWO LINES OF 17px SERIF, which is the measurement this number exists to
 * satisfy rather than a share of the stage. The longer of the two translations is
 * 580.92px of type on the webfont face; at 336 it breaks into exactly two lines under
 * both faces, measured as a wrapping block and not inferred from the nowrap width. At
 * 296 it would take three, and a third line is what {@link TRANSLATION_HEIGHT}'s box is
 * not cut for.
 *
 * IT IS RESERVED INSIDE THE BAND BOXES, NOT BESIDE THEM, and that is the layout's one
 * real idea. The bands stay full width, so the chart reads as an organisation rather
 * than as a table with a truncated right edge — and the translation that travels UP
 * prints INSIDE the top band, the one that travels DOWN prints INSIDE the bottom band,
 * and the label they share prints inside the middle one. The copy lands in the band it
 * reaches. The cost is 336px of band that stands empty for four of the five poses,
 * which is the same trade `WALK_COLUMN` in `./geometry.ts` makes and records.
 */
export const TRANSLATION_WIDTH = 336;

/**
 * The rail between the claims and the translations: 64.
 *
 * WIDE ENOUGH FOR TWO OFFSET RULES AND TWO GUTTERS. The rule pair is 30px across
 * ({@link RULE_SEPARATION} plus one rule's thickness), which leaves 17px of clear
 * space on each side — to the claim column's right edge on one side and to the
 * translations' first glyph on the other. At 48 those gutters fall to 9px and the
 * upward rule starts reading as an underline on the translation beside it.
 */
export const RAIL_WIDTH = 64;

/**
 * The column the row label and the six claim rows print in: 736.
 *
 * DERIVED AS THE REMAINDER, so the three columns tile {@link BAND_INNER_WIDTH} exactly
 * whatever the two above are set to. 736 is also what the longest row label needs
 * (225.50px) with room to spare, and it is the number {@link CLAIM_TEXT_WIDTH} is spent
 * out of.
 */
export const CLAIM_WIDTH = BAND_INNER_WIDTH - RAIL_WIDTH - TRANSLATION_WIDTH;

/** The claim column's left edge: 72 — the band's own inner left. */
export const CLAIM_LEFT = BAND_INNER_LEFT;

/** The rail's left edge: 808. */
export const RAIL_LEFT = CLAIM_LEFT + CLAIM_WIDTH;

/** The translation column's left edge: 872. `872 + 336 = 1208 = 1232 − 24`, so the
 *  column ends on the band box's own inner right edge. */
export const TRANSLATION_LEFT = RAIL_LEFT + RAIL_WIDTH;

/**
 * The gutter each claim row's mono eyebrow gets: 72.
 *
 * SEVEN CHARACTERS OF 11px MONO at 0.22em tracking, which is 9.02px per character
 * including the trailing tracking. The longest eyebrow `./content.ts` holds is CANNOT
 * at 54.13px, so the gutter carries 17.87px of slack; "AND ALONE" would have been
 * 81.19px and did not fit, which is why the middle band's second eyebrow is the five
 * characters it is — that trade is recorded on the string itself.
 *
 * A FIXED GUTTER AND NOT AN INLINE PREFIX, because the six claim rows have to start on
 * ONE left edge. Three eyebrows of three different lengths setting three different text
 * indents is the fastest way to make a chart look like it was typeset by accident.
 */
export const EYEBROW_WIDTH = 72;

/** The air between an eyebrow and the claim it labels: 16. Not exported. */
const EYEBROW_TO_CLAIM = 16;

/** Where a claim row's text starts: 160. */
export const CLAIM_TEXT_LEFT = CLAIM_LEFT + EYEBROW_WIDTH + EYEBROW_TO_CLAIM;

/**
 * The measure a claim row's text gets: 648.
 *
 * ONE LINE IS THE CLAIM, and it is measured rather than hoped for: the longest of the
 * six rows is 549.25px on the webfont face and 528.69px on the fallback, so the box
 * carries 98.75px — about 15% — of slack, and both faces were re-measured as wrapping
 * blocks at exactly this width and came back one line. A row that wrapped would push
 * into the row under it and, on the bottom band, into the band's own padding.
 */
export const CLAIM_TEXT_WIDTH = CLAIM_WIDTH - EYEBROW_WIDTH - EYEBROW_TO_CLAIM;

// ───────────────────── inside a band: the rows ─────────────────────

/**
 * Band `index`'s row label top: 172, 304, 436.
 *
 * @throws through {@link bandTop} on a band the chart does not have.
 */
export function bandLabelTop(index: number): number {
  return bandTop(index) + BAND_PAD_Y;
}

/** How many claim rows every band has: 2 — what it holds, and the one further thing
 *  that is true of it. A literal `const`, so the weld at {@link claimRowTop} is
 *  compile-visible; `./content.ts`'s `Band` interface is the other end of it. */
export const CLAIM_ROWS = 2;

/** How far apart two claim rows sit: 32. Derived. Not exported. */
const CLAIM_ROW_PITCH = ROW_HEIGHT + ROW_GAP;

/**
 * The top edge of band `index`'s claim row `row`: 200/232, 332/364, 464/496.
 *
 * TWO INDICES AND ONE FUNCTION, because a claim row's position is a fact about the
 * chart and not about the band — every band lays its two rows out identically, which is
 * the guarantee in the header stated as code.
 *
 * @throws on a band the chart does not have, or on a third row.
 */
export function claimRowTop(index: number, row: number): number {
  assertBand("claimRowTop", index);
  if (!Number.isInteger(row) || row < 0 || row >= CLAIM_ROWS) {
    throw new Error(
      `claimRowTop: no claim row ${row} — every band has ${CLAIM_ROWS} ` +
        `(0…${CLAIM_ROWS - 1}): what it holds, and the one further thing that is ` +
        `true of it. A third would grow BAND_HEIGHT by ${CLAIM_ROW_PITCH}px on all ` +
        `three bands at once.`,
    );
  }
  return bandLabelTop(index) + EYEBROW_HEIGHT + LABEL_TO_ROWS + row * CLAIM_ROW_PITCH;
}

// ───────────────────── the rail · two directions, one origin ─────────────────────

/**
 * A direction rule's thickness: 2 — twice `.copper-rule`'s 1px.
 *
 * THESE ARE MARKS THE ARGUMENT RESTS ON, not dividers, and 1px at the back of a room is
 * the first thing a projector loses. It is the same call, for the same reason, that
 * `leader-gap/no-sop-geometry.ts` makes for its issued marks.
 */
export const RULE_THICKNESS = 2;

/**
 * How far apart the two direction rules sit horizontally: 28.
 *
 * THE RULES ARE OFFSET AND NOT COLLINEAR, and this is the number that does it. Two
 * strokes on one x — one running up from the middle band, one running down — are one
 * dashed vertical axis with a stop in the middle of it, and an axis with stops on it is
 * the scale §6.6 forbids. At 28 they are unmistakably two marks, and the origin bar is
 * short enough to read as a join rather than as a rung.
 *
 * Not exported: {@link UPWARD_RULE_LEFT} and {@link ORIGIN_BAR_WIDTH} carry it.
 */
const RULE_SEPARATION = 28;

/** How much of the rail the pair occupies: 30. Not exported. */
const RULE_PAIR_WIDTH = RULE_SEPARATION + RULE_THICKNESS;

/**
 * The DOWNWARD rule's left edge: 825 — the left of the pair, and the nearer one to the
 * claims.
 *
 * THE DOWNWARD TRANSLATION IS THE FIRST OF THE TWO in `./content.ts`'s reading order (a
 * mandate into work, then work into the next decision), so it takes the left stroke.
 * That is the only thing the left/right choice encodes, and it deliberately encodes
 * nothing about up or down: the DIRECTIONS are carried by which band each rule reaches
 * and by where its copy sits, never by which side of the rail it is on.
 */
export const DOWNWARD_RULE_LEFT = RAIL_LEFT + (RAIL_WIDTH - RULE_PAIR_WIDTH) / 2;

/** The UPWARD rule's left edge: 853. */
export const UPWARD_RULE_LEFT = DOWNWARD_RULE_LEFT + RULE_SEPARATION;

/**
 * Each direction rule's length: 132 — which IS {@link BAND_PITCH}, and is derived from
 * it rather than typed.
 *
 * A RULE SPANS EXACTLY ONE BAND'S CENTRE LINE TO THE NEXT ONE'S, so the two are the
 * same length by construction. That equality is not decoration: two rules of different
 * lengths would rank one translation over the other, and the slide's claim is that the
 * middle does both, at once.
 */
export const RULE_HEIGHT = BAND_PITCH;

/** The UPWARD rule's top: 212 — the top band's centre line. It ends on the middle
 *  band's, at 344. */
export const UPWARD_RULE_TOP = bandCentreY(TOP_BAND_INDEX);

/** The DOWNWARD rule's top: 344 — the middle band's centre line. It ends on the bottom
 *  band's, at 476. */
export const DOWNWARD_RULE_TOP = bandCentreY(MIDDLE_BAND_INDEX);

/** The origin bar's left edge: 825 — the same as the downward rule's, so the bar joins
 *  the two strokes rather than sitting under one of them. */
export const ORIGIN_BAR_LEFT = DOWNWARD_RULE_LEFT;

/** The origin bar's width: 30 — exactly the pair's own span, so it reaches both strokes
 *  and neither pixel further. */
export const ORIGIN_BAR_WIDTH = RULE_PAIR_WIDTH;

/** The origin bar's thickness: 2 — the rules', so the three marks are one weight. */
export const ORIGIN_BAR_HEIGHT = RULE_THICKNESS;

/**
 * The origin bar's top: 343 — centred on the MIDDLE band's own centre line.
 *
 * THE ONLY HORIZONTAL MARK ON THE STAGE, and it is at the middle band, which is the
 * whole figure in one 30×2 box: both directions leave from one place, and that place is
 * the room. It is also the mark the component paints in the BRIGHT tier — the middle
 * band's tier, not the rules' — which is the second time the argument is made in colour
 * rather than in size.
 *
 * A SECOND AND THIRD BAR, at the top and bottom bands' centre lines, were drawn and
 * cut: three evenly spaced horizontal marks on a vertical rail are a scale with three
 * stops on it, which is precisely what guardrail 6 in `./content.ts` forbids. The rules
 * terminate on those two centre lines with nothing drawn at the terminus.
 */
export const ORIGIN_BAR_TOP = bandCentreY(MIDDLE_BAND_INDEX) - ORIGIN_BAR_HEIGHT / 2;

// ───────────────────── the translation column ─────────────────────

/**
 * A translation's box: 48, cut for TWO lines of 17px serif.
 *
 * 17px on 1.3 is a 22.10 line box, so two are 44.20; Source Serif 4's content area at
 * this size is ≈1.36em ≈ 23.12, and only the first line's overflow at the top and the
 * last line's at the bottom escape the block — so the painted extent is
 * `44.20 + (23.12 − 22.10) = 45.22` and the box carries 2.78 spare. That is the same
 * ≈2px rule `leader-invest/chicken-egg-geometry.ts` derives for all six of its boxes.
 *
 * TWO LINES IS MEASURED, NOT ASSUMED: both translations were rendered as wrapping
 * blocks at {@link TRANSLATION_WIDTH} under both the webfont and the fallback face and
 * came back 44.19px — two lines — in all four combinations.
 *
 * AND A THIRD LINE WOULD STILL BE INSIDE ITS BAND, which is why this is cut for two
 * rather than reserved for three. A third line adds 22.10 and takes the top band's box
 * to y ≈ 258 against a band bottom of 268, and the bottom band's to ≈ 522 against 532 —
 * so a face that broke differently would eat into the band's own padding and stop
 * there, rather than crossing anything. Reserving 72 instead would have left today's
 * two-line render floating 12px above the centre line it is supposed to sit on.
 */
export const TRANSLATION_HEIGHT = 48;

/**
 * The top edge of the translation that belongs to band `index`: 188 for the top band,
 * 452 for the bottom.
 *
 * CENTRED ON THE BAND'S OWN CENTRE LINE, which is the line the direction rule reaching
 * that band terminates on. So the copy and the stroke that carries it are level to the
 * pixel, and the upward translation sits HIGH on the stage while the downward one sits
 * LOW — which is the only place either direction is drawn. Nothing else on this stage
 * says "up" or "down", and no arrowhead does.
 *
 * IT ACCEPTS THE MIDDLE BAND TOO, and deliberately: the middle band's slot in this
 * column holds `translationEyebrow` rather than a translation, and a function that
 * threw on index 1 would make the caller special-case the one band the figure is
 * about. {@link TRANSLATION_EYEBROW_TOP} is the constant the component actually uses
 * there — this one exists so the two are visibly the same construction.
 *
 * @throws through {@link bandCentreY} on a band the chart does not have.
 */
export function translationTop(index: number): number {
  return bandCentreY(index) - TRANSLATION_HEIGHT / 2;
}

/**
 * The shared label over both translations: 336 — centred on the MIDDLE band's centre
 * line, between the two of them.
 *
 * IT IS NOT ABOVE EITHER TRANSLATION, and that is the point. One label at the origin
 * says the two lines below and above it are one act performed in two directions; a
 * label over each would have had to name the directions, and two mono headings reading
 * UPWARD and DOWNWARD are the closest this stage could come to drawing a scale by
 * accident.
 */
export const TRANSLATION_EYEBROW_TOP =
  bandCentreY(MIDDLE_BAND_INDEX) - EYEBROW_HEIGHT / 2;

// ───────────────────── the closer ─────────────────────

/** The air between the chart and the closer: 36 — the biggest gap on the stage. The
 *  closer is the only sentence here that is not about a band, so it is set outside all
 *  three. Not exported. */
const BANDS_TO_CLOSER = 36;

/** The closer's shelf: 568. Full width — the one sentence addressed to every band above
 *  it, and the only thing on this stage that belongs to no band. */
export const CLOSER_TOP = BANDS_BOTTOM + BANDS_TO_CLOSER;

/** The closer's left edge and measure: 48 and 1184 — the stage's own. */
export const CLOSER_LEFT = SIDE_MARGIN;
export const CLOSER_WIDTH = CONTENT_WIDTH;

/** The closer's box: 32, cut for ONE line of 22px serif — a 28.60 line box painting
 *  30.01, 1.99 spare. The same box every 22px verdict in the leader tree takes, and the
 *  string measures 855.95px of the 1184 available. */
export const CLOSER_HEIGHT = 32;

/** Where the stage's lowest box ends: 600. Not exported — the clearance below carries
 *  its whole content. */
const CLOSER_BOTTOM = CLOSER_TOP + CLOSER_HEIGHT;

/**
 * What is left between the closer and the NavBar's hover band: 32px.
 *
 * DERIVED FROM BOTH ENDS, so an edit anywhere above — a taller register, a looser band
 * gap, a fourth band — moves it and a test fails on it before the stage crosses the
 * band. It is the one number that reports the whole vertical budget, and the only thing
 * worth asserting about it is that it stays positive.
 */
export const NAV_ZONE_CLEARANCE = NAV_ZONE_TOP - CLOSER_BOTTOM;

// ───────────────────── the copy budgets ─────────────────────
//
// jsdom computes no text, so nothing measures these at render time. Each is a measure
// divided by the per-character advance the browser actually reported for this slide's
// own longest string in that register, taken down for slack, and held over the COPY by
// the unit test — where an author can act on it — rather than discovered on a
// projector. Same construction, and the same admission, as `GATE_BUDGET_CHARS` in
// `leader-mandate/phases-gates-geometry.ts`.
//
// THE FALLBACK FACE IS THE ONE THAT DECIDES, in every budget where it is the wider of
// the two. For the display face it is wider by 29%, for the serif and sans faces the
// WEBFONT is wider — so each budget below states which face it was cut against, and it
// is always the loser.

/**
 * How long the headline may be: 62 characters.
 *
 * THIS IS THE BUDGET THAT WAS BREACHED, and it is written down because nothing else on
 * the stage would have reported it. `.slide-headline-row` gives 1184px and the drafted
 * headline — "Adoption does not come down from the top. It spreads out from the
 * middle." — measures 1004.06px with Instrument Serif and **1311.22px with Georgia**.
 * The deck loads its faces from the Google Fonts CDN, so the Georgia number is what an
 * auditorium without it renders, and at 1311 the headline takes two lines and the
 * second one paints through {@link KICKER_TOP}'s shelf at y = 134.
 *
 * 1184 over 17.63px per character — the advance Georgia actually reported at 40px on
 * the shipped string, tracking included — gives ≈67, taken down to 62. The shipped
 * headline is 57 characters and 1004.92px on that face, which is 85% of the measure.
 *
 * IT IS ENFORCED ON THE COPY AND NOT LEFT TO THE BROWSER, because the failure is not an
 * overflow a check would see: the row simply gets taller, and the collision is with a
 * shelf 12px below it that belongs to a different element.
 */
export const HEADLINE_BUDGET_CHARS = 62;

/**
 * How long a claim row may be: 86 characters.
 *
 * {@link CLAIM_TEXT_WIDTH} (648px) over ≈7.23px per character — 15px Inter, which is
 * the WIDER of the two faces here and is what the longest shipped row (76 characters,
 * 549.25px, one em dash and two italic runs) actually measured — gives ≈89, taken down
 * to 86. A row that wraps does not overflow anything; it pushes the row under it down,
 * which on the bottom band means into the padding and then into the band gap.
 */
export const CLAIM_BUDGET_CHARS = 86;

/**
 * How long a translation may be: 78 characters.
 *
 * {@link TRANSLATION_WIDTH} × 2 lines (672px of measure) over ≈8.18px per character —
 * 17px Source Serif 4, again the wider face, measured on the longer of the two shipped
 * translations (71 characters, 580.92px) — gives ≈82, taken down to 78. The failure
 * mode is a third line, which {@link TRANSLATION_HEIGHT} is not cut for.
 */
export const TRANSLATION_BUDGET_CHARS = 78;

/**
 * How long the closer may be: 104 characters.
 *
 * {@link CLOSER_WIDTH} (1184px) over ≈10.70px per character — 22px Source Serif 4, the
 * wider face, measured on the shipped closer (80 characters, 855.95px) — gives ≈110,
 * taken down to 104. A second line would put the stage's lowest painted pixel at 630
 * against a floor of 632.
 */
export const CLOSER_BUDGET_CHARS = 104;

/**
 * How long a claim eyebrow may be: 7 characters.
 *
 * {@link EYEBROW_WIDTH} (72px) over 9.02px per character — 11px mono at 0.22em
 * tracking, which is the same on the webfont and on every monospace fallback the deck
 * can fall back to, all of which are 0.6em faces — gives ≈7.98, taken down to 7. The
 * longest shipped eyebrow is CANNOT at six.
 *
 * THE FAILURE MODE IS SILENT AND UGLY: an eighth character wraps the eyebrow onto a
 * second line inside a 16px box, so the gutter grows a descender-height sliver of type
 * that no bounding check reports and every projector shows.
 */
export const EYEBROW_BUDGET_CHARS = 7;

/**
 * How long a band's row label may be: 78 characters.
 *
 * {@link CLAIM_WIDTH} (736px) over 9.02px per character gives ≈81, taken down to 78 —
 * a very loose budget, because the longest shipped label is 25 characters and these
 * three strings are job titles rather than sentences. It is written down anyway: the
 * labels are what stands in place of an index on each band (guardrail 1 in
 * `./content.ts`), so a label that grew into a sentence would be the first sign the
 * chart had started explaining itself instead of naming its rows.
 */
export const BAND_LABEL_BUDGET_CHARS = 78;
