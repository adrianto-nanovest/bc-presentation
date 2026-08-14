// Three organisational tiers, two acts out of the middle one and three approach cards —
// as numbers. Stage coordinates for a 1280×720 stage.
//
// ═══ REWORKED 2026-08-14, AND THE STAGE IS A DIFFERENT SHAPE. The module this replaces
// cut three full-width text bands with a 336px column reserved on their right that stood
// empty for four of five poses. What it drew was legible and it was not a FIGURE: the
// room read prose in rectangles. The new stage is three COLUMNS —
//
//   · THE PLATES (x 48…700). Three tier boxes, top to bottom: top management, middle
//     management, the teams. Each holds a mono name row and two claim rows; the MIDDLE
//     one holds a third row and is 28px taller for it.
//   · THE RAIL (x 700…920). Two arrows leaving the middle plate's own centre line in
//     opposite directions — one up to the top plate's centre, one down to the teams' —
//     each with the mono label and the one-line gloss of the act it draws.
//   · THE CARDS (x 936…1232). Three approach boxes, each aligned to its plate top and
//     bottom edge for edge: TOP-DOWN beside the top plate, MIDDLE-OUT beside the middle,
//     BOTTOM-UP beside the teams. The alignment IS the argument — an approach is a
//     consequence of where you sit — so it is geometry and not a caption.
//
// ═══ THE ANTI-LADDER GUARANTEE, WHICH IS WHY IT LIVES HERE AND NOT IN THE COMPONENT.
// §6.6 refuses a third ladder beside L1–L5 and P0–P3 in as many words ("Learn →
// Experiment → Build → Integrate → Own is OUT: it would be a THIRD ladder"), and three
// stacked boxes are one careless number away from being one. So:
//
//   · ALL THREE PLATES START AT ONE LEFT EDGE ({@link PLATE_LEFT}) AND ARE ONE WIDTH
//     ({@link PLATE_WIDTH}), and there is exactly one placement function
//     ({@link plateTop}) which walks the stack with no per-plate offset table for an
//     edit to reach into. A plate CANNOT be indented, inset or narrowed to rank it.
//   · THE ONE UNEQUAL DIMENSION IS THE MIDDLE PLATE'S HEIGHT, AND IT IS UNEQUAL IN THE
//     DIRECTION A SCALE CANNOT USE. {@link MIDDLE_PLATE_HEIGHT} is
//     {@link PLATE_HEIGHT} + one row, because the middle tier carries one row of copy
//     the other two do not (`middleChips` in `./content.ts` — the four things a champion
//     has). A ladder is MONOTONIC; `top < middle > bottom` is an emphasis. The height is
//     therefore DERIVED from that row's own registers rather than typed, so deleting the
//     string re-cuts all three plates to one height and no number here has to be
//     remembered.
//   · THE TWO OUTER PLATES ARE IDENTICAL TO THE PIXEL — one height, one width, one left
//     edge, one internal layout — so the only difference between the top of the chart
//     and the bottom of it is what each one says.
//   · THE RAIL IS ONE DOUBLE-HEADED ARROW AND NOT A SCALE. Both halves are the same
//     length ({@link ARROW_SPAN}, one plate centre to the next), they share one x
//     ({@link ARROW_CENTRE_X}) so the eye reads a single unbroken line, and each END
//     carries an arrowhead pointing AWAY from the middle. What §6.6's refusal forbids is
//     a scale, and a scale needs STOPS — an axis with three marks on it is a ruler. There
//     is exactly one mark between the two heads, {@link ORIGIN_DOT_SIZE}'s dot on the
//     middle plate's centre line, and it is the origin rather than a stop: nothing to
//     count, and no direction of travel. THE FIRST CUT OF THIS FIGURE offset the two
//     shafts by 12px and joined them with a horizontal bar, on the theory that collinear
//     strokes would read as a dashed axis; what it drew was a dimension-line ELBOW, which
//     says "these two are one measurement" — the opposite of two acts leaving one place.
//
// ═══ NO COLOUR IS EXPORTED FROM THIS MODULE AT ALL, and that is a decision rather than
// an omission. Rank on this stage is a colour tier and arrival is opacity, and the two
// must not be reachable from the same place: a geometry module that exported a token name
// would let a renderer resolve "which plate is bright" and "which plate has arrived" out
// of one object, which is exactly how a slide ends up expressing rank as opacity. The
// tiers live in the component, in the one table `leader-gap/components/NoSopBeats.tsx`
// established — CSS var names only, no hex and no `rgba()` literal — and this module
// exports the one fact that table needs: {@link MIDDLE_TIER_INDEX}.
//
// ═══ THE FIGURE MOUNTS NO `<svg>`, AND THIS MODULE IS SHAPED SO IT DOES NOT HAVE TO.
// The zero-SMIL requirement is closed BY CONSTRUCTION: mount no `<svg>` node, and there
// is no `<animate>`, `<animateTransform>`, `<animateMotion>`, `<set>` or `<animateColor>`
// to gate at any pose under any motion preference. Every graphic on this stage is a
// POSITIONED BOX — three plate rectangles, three card rectangles, two shafts, two
// arrowheads (CSS border triangles) and one round origin dot — and every number below is a
// `left`/`top`/`width`/`height` in px for exactly that reason. Do not reach for SVG here:
// it would buy nothing and re-open a question the deck answers with a `matchMedia` gate
// three times elsewhere.
//
// ═══ NOTHING IS PINNED TO `./geometry.ts` OR `./tam-kotter-geometry.ts`, though both
// stand beside this file and agree about the stage. The rule the leader tree keeps is
// that a figure module restates the stage from `src/styles/globals.css` — the authority —
// rather than importing a sibling's copy of it, because a cross-import welds two stages
// that only happen to agree today.
//
// Proved importable from bare Node, not assumed — the property every geometry module in
// this tree keeps, so a coordinate can be checked without a bundler:
//
//   $ node --experimental-strip-types -e \
//       'import("./src/slides/leader-shape/middle-out-geometry.ts")
//          .then(m => console.log(Object.keys(m).length, "exports"))'
//
// ═══ THE VERTICAL BUDGET, top to bottom, and it is arithmetic rather than measurement.
// `.fig-label` at y=36, `.slide-headline-row` at y=80; a one-line `.slide-headline.small`
// (40px on 1.05) ends the headline row at y=122. THERE IS NO KICKER ANY MORE — the
// shipped stage put a mono line at y=134, 12px under the display face, and it read as a
// title under a title AND was addressing the middle when this deck's room is mostly TOP
// MANAGEMENT (`./content.ts` records both faults on `roomTag`, which carries the addressing
// now, on the TOP plate). So the figure starts on {@link FIGURE_TOP} = 160 with 38px of air
// above it, which is the second half of the same fix.
//
//   ─── PLATE · TOP MANAGEMENT ──────────────────────────────── box 160 → 268 ───
//   174  name row · 11px mono caps + the THIS ROOM tag, right-aligned      → 190
//   202  HOLDS  ·  claim row · 15px sans, ONE line                        → 222
//   234  CANNOT ·  claim row · 15px sans, ONE line                        → 254
//
//   ─── PLATE · MIDDLE MANAGEMENT ───────────────────────────── box 290 → 426 ───
//   304  name row + subname                                               → 320
//   332  HOLDS  ·  claim row                                              → 352
//   364  ALONE  ·  claim row                                              → 384
//   396  chips  ·  11px mono caps — the row only this plate has           → 412
//
//   ─── PLATE · THE TEAMS ───────────────────────────────────── box 448 → 556 ───
//   462  name row                                                         → 478
//   490  HOLDS  ·  claim row                                              → 510
//   522  CANNOT ·  claim row                                              → 542
//
//   ─── THE RAIL (x 700…920 · every mark centred on x=716) ──────────────────────
//   214  up arrowhead   · 16×12, tip on the TOP plate's centre line        → 226
//   226  up shaft       · 4px wide, grows UP out of the origin             → 358
//   247  INFLUENCE UP   · 11px mono caps                                   → 263
//   271  up gloss       · 13px sans, up to three lines                     → 325
//   310  up pulse       · 48px bright segment, runs 310 → 226, looping      → 358
//   353  origin dot     · 10×10 round, on the MIDDLE plate's centre line   → 363
//   358  down pulse     · 48px bright segment, runs 358 → 442, looping      → 406
//   358  down shaft     · 4px wide, grows DOWN out of the origin           → 490
//   391  DRIVE DOWN     · 11px mono caps                                   → 407
//   415  down gloss     · 13px sans                                        → 469
//   490  down arrowhead · 16×12, tip on the TEAMS plate's centre line       → 502
//
//   ─── THE CARDS (x 936…1232, each aligned to its own plate) ───────────────────
//   180  TOP-DOWN   label · 11px mono caps        · verdict 206 → 248
//   324  MIDDLE-OUT label                         · verdict 350 → 392
//   468  BOTTOM-UP  label                         · verdict 494 → 536
//
//   ─── THE THESIS (full width, and the only thing outside every box) ───────────
//   588  thesis · 18px serif, ONE line                                     → 614
//   ─────────────────────────────────────────────────────────────────────────────
//   floor y=632 · lowest painted box 614 · {@link NAV_ZONE_CLEARANCE} = 18
//
// THE FLOOR IS THE HOVER BAND AND NOT `.slide-content`'s BOTTOM, the same rule every
// other geometry module in the leader tree keeps: `.nav-zone` is `bottom: 0; height:
// 88px` in `src/styles/globals.css`, so its top edge is y=632 and nothing on this stage
// may cross it. THE THESIS SITS AS CLOSE TO IT AS ANYTHING IN THE DECK — 18px — and that
// is the brief: the last sentence belongs directly above the navigation bar, so the room
// reads the figure and then reads the line under it, with nothing in between.
//
// ═══ EVERY COPY BUDGET BELOW IS A REAL MEASUREMENT, NOT AN ESTIMATE. Each width was read
// off a `white-space: nowrap` clone in Chromium under the deck's own font cascade, with
// the keyword runs italic exactly as `src/components/highlight.tsx` emits them, AND the
// same string re-measured a second time as a wrapping block AT its box width to get the
// line count — inferring a line count from a nowrap width is how a two-line box ships as
// three. BOTH FACES ARE GIVEN because the deck loads its four families from the Google
// Fonts CDN and an auditorium without it renders the fallbacks. Measured 2026-08-14, with
// both faces warmed and confirmed loaded before measuring (`document.fonts.load` per
// family, then `document.fonts.ready`; awaiting `ready` alone resolves before anything on
// the page has ASKED for a webfont and silently measures the fallback twice).
//
//   box                  register                    webfont / fallback  measure lines
//   headline             40px display + kw italic     801.16 / 1027.72     1184    1
//   thesis               18px serif  + kw italic      943.83 /  901.28     1184    1
//   claim row (longest)  15px sans   + kw italic      450.08 /  431.06      516    1
//   name row (longest)   11px mono ·0.22em ·upper     351.78 /  351.83      499    1
//   chips                11px mono ·0.22em ·upper     451.00 /  451.06      604    1
//   act label (longest)  11px mono ·0.22em ·upper     108.25 /  108.27      176    1
//   act gloss (longest)  13px sans   + kw italic      362.17 /  355.73      176   3 / 2
//   card label (longest) 11px mono ·0.22em ·upper      90.20 /   90.22      264    1
//   card verdict (long)  15px serif                   291.80 /  273.47      264    2
//   eyebrow (longest)    11px mono ·0.22em ·upper      54.13 /   54.14       72    1
//
// THE ONE ROW WHERE THE TWO FACES DISAGREE is the downward act's gloss: three lines on
// Inter, two on the system fallback. That is why {@link GLOSS_HEIGHT} is cut for three and
// the component centres the copy inside it — the box is right under both faces and the
// two-line render sits on its own centre line rather than floating at the top of it.
//
// Pure data and pure functions. No React, no DOM, no CSS-var strings, and no work at
// module scope beyond the arithmetic below.

// ───────────────────── the stage, restated ─────────────────────

/**
 * This slide's copy, as a TYPE only — the other end of the count pin
 * ({@link TIER_COUNT}). Type-space only, so bare Node never has to resolve it.
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
 * Where the headline row ends: 122.
 *
 * `.slide-headline-row` is at `top: 80px` and a one-line `.slide-headline.small` is 40px
 * on 1.05, so the row paints 80…122. Stated as a constant because {@link FIGURE_TOP}'s
 * whole justification is the distance between the two, and that distance is the first
 * thing the 2026-08-14 rework was asked to fix.
 */
export const HEADLINE_BOTTOM = 122;

/**
 * The shelf the figure starts on: 160.
 *
 * 38px UNDER THE HEADLINE, AND THAT NUMBER IS THE FIX. The shipped stage put a mono
 * kicker at y=134 — 12px under a 40px display face — and then started the chart at 156,
 * so the headline, a second title and the first plate's own name row arrived inside 50px
 * of each other and read as one crowded block. The kicker is gone (`middleTag` in
 * `./content.ts` carries what it said) and the plates start 4px lower, which buys the
 * headline its own air without spending any of the figure's.
 */
export const FIGURE_TOP = 160;

// ───────────────────── the registers, as box heights ─────────────────────

/** A mono caps box: 16. 11px on 1.3 is a 14.30 line box and JetBrains Mono's content
 *  area is 1.3em, so the painted extent is 14.30 and the box carries 1.70 spare. ONE
 *  CONSTANT FOR EVERY MONO ROW on this stage — the three plate names, the subname, the
 *  tag, the chips, the six claim eyebrows, the two act labels and the three card
 *  labels. */
export const EYEBROW_HEIGHT = 16;

/** A 15px sans claim row's box: 20 — one 19.50 line box with 0.50 spare, cut for ONE
 *  line. ONE HEIGHT FOR ALL SIX ROWS: a `holds` row and a `qualifier` row are the same
 *  register making two different claims, and giving either a taller box would rank them
 *  by size for a difference the eyebrow beside them already carries. */
export const ROW_HEIGHT = 20;

/** The air between a label and the body it labels: 12 — the leader tree's binding gap.
 *  Not exported. */
const LABEL_TO_ROWS = 12;

/** The air between two claim rows: 12. The same gap as the one above it, so the name
 *  binds to the pair rather than to the first row. Not exported. */
const ROW_GAP = 12;

// ───────────────────── the three plates ─────────────────────

/**
 * How many rows the chart has: 3, PINNED to `./content.ts`'s tuple.
 *
 * THREE IS NOT A LAYOUT CHOICE. It is how many places there are to stand in an
 * organisation as this slide reads it — above the work, in it, and between — and
 * `./content.ts` names them. It is stated here because {@link MIDDLE_TIER_INDEX} is
 * derived from it and nothing else in this module could.
 *
 * AND IT MUST STAY ODD. A chart with an even number of rows has no middle row, and this
 * slide's entire argument is about one. The derivation below is what enforces it: with
 * four tiers {@link MIDDLE_TIER_INDEX} is 1.5, which is not an index, and a test
 * asserting `Number.isInteger` on it fails before anything renders.
 */
export const TIER_COUNT: MiddleOutCopy["tiers"]["length"] = 3;

/** The topmost row: 0. Named rather than written as a literal at the call sites that
 *  need it, so "the plate the upward arrow reaches" is a word. */
export const TOP_TIER_INDEX = 0;

/**
 * The row the whole slide is about: 1 — DERIVED, never typed.
 *
 * `(TIER_COUNT − 1) / 2` is the middle of an odd-length stack, which is the only honest
 * definition of "the middle tier": it is not the second one, it is the one with as many
 * plates above it as below. Typing a 1 would leave the argument pointing at the second
 * row from the top the first time the chart changed shape, and nothing would say so —
 * the middle plate's visible differences are a colour tier and 28px of height, so the
 * slide would go on rendering, brightly, about the wrong people.
 *
 * IT IS ALSO WHERE BOTH ARROWS LEAVE FROM. {@link ORIGIN_Y} is this plate's centre line
 * and both shafts terminate on it, so re-cutting the chart moves the whole rail with it.
 */
export const MIDDLE_TIER_INDEX = (TIER_COUNT - 1) / 2;

/** The bottom row: 2. Derived, so it is the last plate whatever {@link TIER_COUNT} is. */
export const BOTTOM_TIER_INDEX = TIER_COUNT - 1;

/** A plate's horizontal padding: 24. Not exported — the two edges derived from it are. */
const PLATE_PAD_X = 24;

/** A plate's vertical padding: 14. Not exported. */
const PLATE_PAD_Y = 14;

/** The left edge of every plate: 48 — the stage's own margin. ONE VALUE FOR ALL THREE:
 *  an indented plate would be a plate being ranked by position, which is what a scale
 *  does (see the header). */
export const PLATE_LEFT = SIDE_MARGIN;

/**
 * Every plate's width: 652.
 *
 * NOT FULL-BLEED, and that is the rework's central trade. The shipped bands were 1184
 * wide and reserved 336 of it for a column that stood empty until the last pose; these
 * plates give that width to the rail and the cards, which are on the stage from the
 * first pose and are the two things that make the figure a figure. 652 is what is left
 * of 1184 after {@link RAIL_WIDTH} (220), {@link CARD_WIDTH} (296) and the 16px gutter
 * between the rail and the cards — so the three columns tile the stage exactly and this
 * number cannot drift from them.
 */
export const PLATE_WIDTH = 652;

/**
 * A plate's inner height: 80 — a name row, a gap, two claim rows and the gap between
 * them.
 *
 * Derived from the four registers above rather than typed, so a taller register or a
 * looser gap moves {@link PLATE_HEIGHT}, the middle plate's height, the stack, the
 * cards, the rail and {@link NAV_ZONE_CLEARANCE} together. Not exported.
 */
const PLATE_INNER_HEIGHT =
  EYEBROW_HEIGHT + LABEL_TO_ROWS + ROW_HEIGHT + ROW_GAP + ROW_HEIGHT;

/** The two OUTER plates' height: 108. IDENTICAL FOR BOTH — the top of the chart and the
 *  bottom of it differ in what they say and in nothing else. */
export const PLATE_HEIGHT = PLATE_INNER_HEIGHT + 2 * PLATE_PAD_Y;

/** The air between the chips row and the claim row above it: 12 — the same gap as
 *  between the two claim rows, so the extra row reads as a third row of the same plate
 *  rather than as a footer under it. Not exported. */
const CLAIM_TO_CHIPS = 12;

/**
 * The MIDDLE plate's height: 136 — {@link PLATE_HEIGHT} plus one mono row and its gap.
 *
 * DERIVED FROM THE ROW IT EXISTS FOR, never typed, and this is the number guardrail 3
 * turns on. The middle plate is taller because it carries `middleChips` — the four
 * things a champion holds that no org chart shows — and for no other reason. Delete that
 * string from `./content.ts` and this expression collapses to {@link PLATE_HEIGHT}, all
 * three plates come out equal, and the stack, the rail and the cards re-cut themselves
 * around it. A typed `136` is how a content cut leaves a plate 28px taller than its
 * copy, which is a plate ranked by size — the one thing §6.6's refusal forbids.
 *
 * AND UNEQUAL IN THE ONE DIRECTION A SCALE CANNOT USE. A ladder is monotonic; `top <
 * middle > bottom` is an emphasis. The two outer plates stay identical to the pixel.
 */
export const MIDDLE_PLATE_HEIGHT =
  PLATE_HEIGHT + CLAIM_TO_CHIPS + EYEBROW_HEIGHT;

/**
 * The air between two plates: 22.
 *
 * TIGHTER THAN THE LEADER TREE'S 28px BAND GAP, on purpose. These three boxes are rows
 * of ONE chart, not three bands of an argument, and at 28 they start reading as three
 * separate cards that happen to be stacked. 22 is close enough to bind them and wide
 * enough that the two arrowheads have room to sit in the gap beside them. Not exported —
 * the stack below carries it.
 */
const PLATE_GAP = 22;

/** The guard every plate placement function shares, so an index one of them accepts is
 *  always an index the others place. Not exported. */
function assertTier(fn: string, index: number): void {
  if (!Number.isInteger(index) || index < 0 || index >= TIER_COUNT) {
    throw new Error(
      `${fn}: no tier ${index} — the chart has ${TIER_COUNT} ` +
        `(0…${TIER_COUNT - 1}): top management, the middle, the teams. The tuple in ` +
        `./content.ts refuses the extra entry first, and a fourth tier would push the ` +
        `thesis through the NavBar band at y=${NAV_ZONE_TOP} — and would leave ` +
        `MIDDLE_TIER_INDEX at 1.5, which is not a row.`,
    );
  }
}

/**
 * Plate `index`'s own height: 108, 136, 108.
 *
 * ONE FUNCTION, so "how tall is this plate" is asked in one place and the stack below
 * cannot come to disagree with the box the renderer draws.
 *
 * @throws on a fourth plate — see {@link assertTier}.
 */
export function plateHeight(index: number): number {
  assertTier("plateHeight", index);
  return index === MIDDLE_TIER_INDEX ? MIDDLE_PLATE_HEIGHT : PLATE_HEIGHT;
}

/**
 * Plate `index`'s box top, in stage coordinates: 160, 290, 448.
 *
 * A SUM AND NOT `i × pitch`, because the plates are not all one height any more — the
 * shipped module could multiply and this one has to accumulate. What it still refuses is
 * a per-plate offset table: the only inputs are {@link FIGURE_TOP}, the plate heights
 * above this one and one shared {@link PLATE_GAP}, so no single plate can be nudged.
 *
 * @throws on a fourth plate — see {@link assertTier}. An out-of-range TIER index is an
 *         authoring bug and the author must be shown it, exactly as `pillarCentre` in
 *         `./geometry.ts` throws. A POSE is different: `./middle-out-walk.ts` answers
 *         every pose question totally and never throws, because a pose is UI state and a
 *         slide that crashes on one is worse in front of a room than a slide with nothing
 *         revealed.
 */
export function plateTop(index: number): number {
  assertTier("plateTop", index);
  let top = FIGURE_TOP;
  for (let above = 0; above < index; above++) {
    top += plateHeight(above) + PLATE_GAP;
  }
  return top;
}

/**
 * Plate `index`'s vertical centre line: 214, 358, 502.
 *
 * THE RAIL AND THE CARDS ARE BUILT ENTIRELY OUT OF THIS. Both arrows start and end on
 * one of these three lines, the origin bar sits on the middle one, each act's text block
 * is centred between two of them, and each card's contents are centred on the line of
 * the plate it belongs to — so the whole right-hand two thirds of the figure moves with
 * the chart and cannot come to disagree with it.
 *
 * THE THREE LINES ARE EVENLY SPACED, at 144 apart, and that is not a coincidence to be
 * relied on carelessly: it holds because the middle plate grows symmetrically about its
 * own centre and the two gaps are equal. {@link ARROW_SPAN} is derived from these
 * centres rather than from a pitch constant precisely so that a change which broke the
 * symmetry would move the arrows with it instead of leaving them the same length.
 *
 * @throws through {@link plateTop} on a plate the chart does not have.
 */
export function plateCentreY(index: number): number {
  return plateTop(index) + plateHeight(index) / 2;
}

/** Where the chart ends: 556. Not exported — {@link THESIS_TOP} carries it forward. */
const PLATES_BOTTOM =
  plateTop(BOTTOM_TIER_INDEX) + plateHeight(BOTTOM_TIER_INDEX);

// ───────────────────── inside a plate ─────────────────────

/** The left edge of everything inside a plate: 72. */
export const PLATE_INNER_LEFT = PLATE_LEFT + PLATE_PAD_X;

/** The width available inside a plate: 604. */
export const PLATE_INNER_WIDTH = PLATE_WIDTH - 2 * PLATE_PAD_X;

/**
 * The gutter each claim row's mono eyebrow gets: 72.
 *
 * SEVEN CHARACTERS OF 11px MONO at 0.22em tracking, which is 9.02px per character
 * including the trailing tracking. The longest eyebrow `./content.ts` holds is CANNOT at
 * 54.13px, so the gutter carries 17.87px of slack; "AND ALONE" would have been 81.19px
 * and did not fit, which is why the middle plate's second eyebrow is the five characters
 * it is — that trade is recorded on the string itself.
 *
 * A FIXED GUTTER AND NOT AN INLINE PREFIX, because the six claim rows have to start on
 * ONE left edge. Three eyebrows of three different lengths setting three different text
 * indents is the fastest way to make a chart look like it was typeset by accident.
 */
export const EYEBROW_WIDTH = 72;

/** The air between an eyebrow and the claim it labels: 16. Not exported. */
const EYEBROW_TO_CLAIM = 16;

/** Where a claim row's text starts: 160. */
export const CLAIM_TEXT_LEFT = PLATE_INNER_LEFT + EYEBROW_WIDTH + EYEBROW_TO_CLAIM;

/**
 * The measure a claim row's text gets: 516.
 *
 * ONE LINE IS THE CLAIM, and it is measured rather than hoped for: the longest of the
 * six rows is 450.08px on the webfont face and 431.06px on the fallback, so the box
 * carries 65.92px — about 13% — of slack, and both faces were re-measured as wrapping
 * blocks at exactly this width and came back one line. A row that wrapped would push
 * into the row under it and then into the plate's own padding.
 */
export const CLAIM_TEXT_WIDTH = PLATE_INNER_WIDTH - EYEBROW_WIDTH - EYEBROW_TO_CLAIM;

/**
 * Plate `index`'s name row top: 174, 304, 462.
 *
 * @throws through {@link plateTop} on a plate the chart does not have.
 */
export function plateNameTop(index: number): number {
  return plateTop(index) + PLATE_PAD_Y;
}

/** How many claim rows every plate has: 2 — what it holds, and the one further thing
 *  that is true of it. A literal `const`, so the weld at {@link claimRowTop} is
 *  compile-visible; `./content.ts`'s `Tier` interface is the other end of it. */
export const CLAIM_ROWS = 2;

/** How far apart two claim rows sit: 32. Derived. Not exported. */
const CLAIM_ROW_PITCH = ROW_HEIGHT + ROW_GAP;

/**
 * The top edge of plate `index`'s claim row `row`: 202/234, 332/364, 490/522.
 *
 * TWO INDICES AND ONE FUNCTION, because a claim row's position is a fact about the chart
 * and not about the plate — every plate lays its two rows out identically, which is the
 * guarantee in the header stated as code.
 *
 * @throws on a plate the chart does not have, or on a third row.
 */
export function claimRowTop(index: number, row: number): number {
  assertTier("claimRowTop", index);
  if (!Number.isInteger(row) || row < 0 || row >= CLAIM_ROWS) {
    throw new Error(
      `claimRowTop: no claim row ${row} — every plate has ${CLAIM_ROWS} ` +
        `(0…${CLAIM_ROWS - 1}): what it holds, and the one further thing that is true ` +
        `of it. A third would grow every plate by ${CLAIM_ROW_PITCH}px at once.`,
    );
  }
  return plateNameTop(index) + EYEBROW_HEIGHT + LABEL_TO_ROWS + row * CLAIM_ROW_PITCH;
}

/**
 * How far an eyebrow's box sits BELOW the top edge of the claim row it labels: 4.
 *
 * IT IS A BASELINE CORRECTION AND NOT A NUDGE, and this is the arithmetic. A block box
 * puts its first line box at its own top edge, so the baseline of a run set at font size
 * `F` with `line-height: 1.3` lands at `0.65·F + ((ascent − descent) / 2)·F` from that
 * edge. Every face this deck can fall back to — JetBrains Mono, IBM Plex Mono, SF Mono,
 * Inter, system-ui — reports `(ascent − descent) / 2` between 0.346 and 0.375, so the
 * baseline is ≈`1.01·F` in every one of them and the drop the two registers need is
 * `1.01 × (15 − 11)` = 4.04px.
 *
 * WHICH IS {@link ROW_HEIGHT} − {@link EYEBROW_HEIGHT}, and that is not a coincidence:
 * both boxes are one 1.3em line rounded up to the next even pixel, so the difference of
 * the two boxes IS the difference of the two baselines to within a rounding. Writing it
 * as the subtraction keeps the correction true if either register is retuned, and it
 * lands the eyebrow's box bottom flush with its claim row's — an eyebrow is bottom-set
 * inside the row it labels.
 *
 * WHAT IT FIXES, reported 2026-08-14 from the stage: HOLDS, CANNOT and ALONE floated
 * about four pixels above the sentence beside them, which reads at the back of a room as
 * a label that belongs to the row above.
 */
export const EYEBROW_BASELINE_DROP = ROW_HEIGHT - EYEBROW_HEIGHT;

/**
 * The top edge of the eyebrow labelling plate `index`'s claim row `row`: 206/238,
 * 336/368, 494/526.
 *
 * @throws through {@link claimRowTop} on a plate the chart does not have, or on a third
 * row.
 */
export function claimEyebrowTop(index: number, row: number): number {
  return claimRowTop(index, row) + EYEBROW_BASELINE_DROP;
}

/**
 * The chips row — the one row only the MIDDLE plate has: 396.
 *
 * DERIVED FROM THE LAST CLAIM ROW rather than from the plate's bottom edge, so it sits a
 * normal row gap under the copy above it and the plate's extra height is spent where the
 * reader expects it. It is the row {@link MIDDLE_PLATE_HEIGHT} exists for, and the two
 * numbers are derived from the same three constants — so they cannot disagree about
 * whether the row fits inside its plate.
 */
export const CHIPS_TOP =
  claimRowTop(MIDDLE_TIER_INDEX, CLAIM_ROWS - 1) + ROW_HEIGHT + CLAIM_TO_CHIPS;

/** The chips row's box: 16 — one mono caps line. */
export const CHIPS_HEIGHT = EYEBROW_HEIGHT;

// ───────────────────── the rail · two acts, one origin ─────────────────────

/** The rail's left edge: 700 — the plates' own right edge. */
export const RAIL_LEFT = PLATE_LEFT + PLATE_WIDTH;

/**
 * The rail's width: 220.
 *
 * WIDE ENOUGH FOR THE ARROW PAIR AND FOR THE TWO ACTS' COPY. The arrows occupy 28px of
 * it (see {@link UP_SHAFT_LEFT}), the labels and glosses take {@link ACT_TEXT_WIDTH} =
 * 172, and 20px of gutter separates them. At 160 the glosses take four lines and the
 * rail becomes a third text column; at 280 the plates lose the measure that keeps their
 * six claim rows on one line each.
 */
export const RAIL_WIDTH = 220;

/** How far into the rail the arrows sit: 8 — measured to the LEFTMOST PAINTED PIXEL of
 *  the pair, which is the down arrowhead's own left edge and not a shaft's. Not
 *  exported. */
const ARROW_INSET = 8;

/**
 * An arrow shaft's thickness: 4 — four times `.copper-rule`'s 1px.
 *
 * THESE ARE THE FIGURE'S TWO STRUCTURAL MARKS, not dividers, and 1px at the back of a
 * room is the first thing a projector loses. The shipped figure drew them at 2px with no
 * heads; at 4px with a head they are the first thing the eye finds after the middle
 * plate, which is the reading order this slide wants.
 */
export const SHAFT_THICKNESS = 4;

/** An arrowhead's width: 16 — four times the shaft, which is what makes a head read as a
 *  head at the back of a room. Drawn as a CSS border triangle, so it costs no `<svg>`. */
export const HEAD_WIDTH = 16;

/** An arrowhead's height: 12. Not equal to its width on purpose: a 16×16 head is an
 *  equilateral wedge that reads as a play button, and 16×12 reads as an arrow. */
export const HEAD_HEIGHT = 12;

/**
 * The x every mark on the rail is centred on: 716.
 *
 * ONE AXIS, TWO HEADS, NO JOIN — and this is the shape the figure was CORRECTED to on
 * 2026-08-14. The first cut offset the two shafts by 12px and joined them with a short
 * horizontal bar on the middle plate's centre line, on the theory that two collinear
 * strokes would read as one dashed axis with a stop in it. What it actually drew was an
 * ELBOW: a bracket, of the kind a dimension line has, which says "these two things are one
 * measurement" — the opposite of two acts leaving one place.
 *
 * THE GUARDRAIL IS STILL KEPT, and by a better mark. What §6.6's refusal forbids is a
 * SCALE, and a scale needs STOPS: an axis with three marks on it is a ruler. This is one
 * unbroken line with an arrowhead at each END and one dot at its middle — no intermediate
 * mark, nothing to count, and both heads pointing AWAY from the dot. A double-headed arrow
 * is the one figure in the vocabulary that cannot be read as a progression, because it has
 * no direction of travel.
 */
export const ARROW_CENTRE_X = RAIL_LEFT + ARROW_INSET + HEAD_WIDTH / 2;

/** Both shafts' left edge: 714 — they share one x, which is what makes them one line. */
export const SHAFT_LEFT = ARROW_CENTRE_X - SHAFT_THICKNESS / 2;

/** Both arrowheads' left edge: 708 — the head is wider than the shaft, so this is the
 *  rail's own inset and the leftmost painted pixel of the whole mark. */
export const HEAD_LEFT = ARROW_CENTRE_X - HEAD_WIDTH / 2;

/**
 * Where both arrows leave from: 358 — the MIDDLE plate's own centre line.
 *
 * ONE ORIGIN FOR BOTH, and it is the whole figure in one number: the two acts are not a
 * sequence and not a scale, they are one position doing two things at once. Everything
 * else on the rail is measured from here.
 */
export const ORIGIN_Y = plateCentreY(MIDDLE_TIER_INDEX);

/**
 * Each arrow's total length: 144 — one plate centre to the next.
 *
 * DERIVED FROM THE CENTRES AND NOT FROM A PITCH CONSTANT, so the two halves are the same
 * length only because the chart is symmetric about its middle plate, and a change that
 * broke that symmetry would move them instead of silently leaving them equal. Two halves of
 * different lengths would rank one act over the other, and the slide's claim is that the
 * middle does both, at once.
 */
export const ARROW_SPAN = ORIGIN_Y - plateCentreY(TOP_TIER_INDEX);

/** A shaft's length: 132 — the span, less the head it ends in. TWO SHAFTS OF THIS LENGTH
 *  ON ONE x, meeting at {@link ORIGIN_Y}, are what the eye reads as a single 264px line:
 *  they are two elements only because each one has to GROW from the origin outward, and a
 *  single element cannot scale in two directions at once. */
export const SHAFT_HEIGHT = ARROW_SPAN - HEAD_HEIGHT;

/** The UP shaft's top: 226. Its BOTTOM edge is the origin, which is the end it grows
 *  from. */
export const UP_SHAFT_TOP = ORIGIN_Y - SHAFT_HEIGHT;

/** The UP arrowhead's top: 214 — its tip lands exactly on the TOP plate's centre line. */
export const UP_HEAD_TOP = plateCentreY(TOP_TIER_INDEX);

/** The DOWN shaft's top: 358 — the origin, which is the end it grows from. */
export const DOWN_SHAFT_TOP = ORIGIN_Y;

/** The DOWN arrowhead's top: 490 — its tip lands on the TEAMS plate's centre line. */
export const DOWN_HEAD_TOP = plateCentreY(BOTTOM_TIER_INDEX) - HEAD_HEIGHT;

/**
 * The travelling pulse's length: 48 — the bright segment that runs out along each shaft,
 * over and over, for as long as the slide is up.
 *
 * WHAT IT IS FOR. A drawn arrow says the act HAPPENED once; a pulse leaving the middle
 * every couple of seconds says it is what the middle DOES. It is the only motion on this
 * stage that never stops, and it is the figure's claim rather than decoration — which is
 * the same argument `./components/agentic-org.css` makes for C.1's spoke flow, the one
 * other infinite animation in the leader tree.
 *
 * 48px IS ABOUT A THIRD OF A SHAFT: long enough to read as a moving object at the back of
 * a room, short enough that the line it runs along is never mostly bright.
 */
export const FLOW_LENGTH = 48;

/** How far a pulse travels: 84 — the shaft, less the pulse's own length, so it starts flush
 *  with the origin and finishes flush against the arrowhead. Derived, so re-cutting the
 *  chart re-cuts the travel with it. */
export const FLOW_TRAVEL = SHAFT_HEIGHT - FLOW_LENGTH;

/** The UP pulse's box top: 310 — the origin end of the up shaft, which is where it starts
 *  before translating towards the tip. */
export const UP_FLOW_TOP = UP_SHAFT_TOP + SHAFT_HEIGHT - FLOW_LENGTH;

/** The DOWN pulse's box top: 358 — the origin, which for the downward shaft IS its box's
 *  own top edge. */
export const DOWN_FLOW_TOP = DOWN_SHAFT_TOP;

/**
 * The origin marker's diameter: 10 — a round dot, and the only round thing on this stage.
 *
 * IT REPLACES THE ELBOW. What the figure needs at the origin is a mark saying "from
 * here", and the smallest one that reads at projection scale is a filled dot two and a
 * half times the shaft's width. Round rather than square because every other box on this
 * stage has corners (`--radius-base` is 0px deck-wide), so a disc cannot be mistaken for a
 * fourth small plate — and because a dot has no orientation, which is the point of it.
 *
 * It is painted in the MIDDLE plate's own edge tier rather than the arrows', which the
 * component's tier table states: one origin, two directions, and the origin is the row the
 * slide is about.
 */
export const ORIGIN_DOT_SIZE = 10;

/** The origin dot's left edge: 711 — centred on the shafts' own axis. */
export const ORIGIN_DOT_LEFT = ARROW_CENTRE_X - ORIGIN_DOT_SIZE / 2;

/** The origin dot's top: 353 — centred on the MIDDLE plate's centre line, so the dot sits
 *  exactly where the two shafts meet. */
export const ORIGIN_DOT_TOP = ORIGIN_Y - ORIGIN_DOT_SIZE / 2;

// ───────────────────── the rail's copy ─────────────────────

/** The gutter between the arrow and the copy beside it: 20 — wider than the plates' own
 *  16, because the mark it clears is 4px of solid copper rather than a line of type. Not
 *  exported. */
const ARROW_TO_TEXT = 20;

/** The left edge of both acts' copy: 744 — clear of the arrowheads. */
export const ACT_TEXT_LEFT = HEAD_LEFT + HEAD_WIDTH + ARROW_TO_TEXT;

/** The measure both acts' copy gets: 176, which runs to the rail's own right edge. */
export const ACT_TEXT_WIDTH = RAIL_LEFT + RAIL_WIDTH - ACT_TEXT_LEFT;

/** The air between an act's label and its gloss: 8 — tighter than the plates' 12,
 *  because these two lines are one block and the rail has two of them. Not exported. */
const ACT_LABEL_TO_GLOSS = 8;

/**
 * An act's gloss box: 54 — cut for THREE lines of 13px sans on 1.35.
 *
 * MEASURED AT THREE AND TWO, AND CUT FOR THREE. The upward gloss is 362.17px on the
 * webfont face and takes three lines at 176px of measure; the downward one takes three on
 * that face and TWO on the fallback. So three is the real maximum, two is a real render,
 * and the component centres the copy inside the box (see its `alignItems`) so the two-line
 * case sits on its own centre line instead of floating at the top of a box built for
 * three.
 */
export const GLOSS_HEIGHT = 54;

/** An act's whole text block: 78 — a label, a gap and a gloss box. Not exported; the two
 *  functions below carry it. */
const ACT_BLOCK_HEIGHT = EYEBROW_HEIGHT + ACT_LABEL_TO_GLOSS + GLOSS_HEIGHT;

/**
 * The top of the label belonging to the act that reaches plate `index`: 247 for the
 * upward act, 391 for the downward one.
 *
 * CENTRED ON THE ARROW'S OWN MIDSPAN — halfway between the origin and the plate the
 * arrow reaches — so each block sits beside its own arrow and neither can drift onto the
 * other's. ONE FUNCTION FOR BOTH, taking the plate the arrow REACHES: the upward act is
 * the one that reaches {@link TOP_TIER_INDEX} and the downward act is the one that
 * reaches {@link BOTTOM_TIER_INDEX}, which is the only fact that distinguishes them and
 * therefore the only argument this function needs.
 *
 * @throws through {@link plateCentreY} on a plate the chart does not have. It accepts the
 *         MIDDLE index without complaint and answers the origin's own line — there is no
 *         act that reaches the middle plate, so no caller asks.
 */
export function actLabelTop(index: number): number {
  const midspan = (ORIGIN_Y + plateCentreY(index)) / 2;
  return midspan - ACT_BLOCK_HEIGHT / 2;
}

/** The top of the gloss belonging to the act that reaches plate `index`: 271 / 415. */
export function actGlossTop(index: number): number {
  return actLabelTop(index) + EYEBROW_HEIGHT + ACT_LABEL_TO_GLOSS;
}

// ───────────────────── the three approach cards ─────────────────────

/** The gutter between the rail and the cards: 16. Not exported. */
const RAIL_TO_CARDS = 16;

/** The cards' left edge: 936. */
export const CARD_LEFT = RAIL_LEFT + RAIL_WIDTH + RAIL_TO_CARDS;

/**
 * Every card's width: 296 — and it is what is LEFT of the stage, derived rather than
 * chosen, so the three columns tile 1184 exactly.
 *
 * `48 + 652 + 220 + 16 + 296 = 1232`, which is the stage's own right margin. A card that
 * grew would take the plates' measure with it, which is the trade this expression makes
 * visible.
 */
export const CARD_WIDTH = STAGE.width - SIDE_MARGIN - CARD_LEFT;

/** A card's padding: 16 — half a plate's, because a card holds two short rows and a
 *  plate holds four long ones. Not exported. */
const CARD_PAD = 16;

/** The left edge of everything inside a card: 952. */
export const CARD_INNER_LEFT = CARD_LEFT + CARD_PAD;

/** The measure a card's copy gets: 264. The longest verdict is 291.80px on the webfont
 *  face and takes exactly two lines at this width under both faces. */
export const CARD_INNER_WIDTH = CARD_WIDTH - 2 * CARD_PAD;

/** The air between a card's label and its verdict: 10. Not exported. */
const CARD_LABEL_TO_VERDICT = 10;

/**
 * A card's verdict box: 42 — cut for TWO lines of 15px serif on 1.35.
 *
 * TWO IS THE MEASURED MAXIMUM: the middle card's verdict takes two lines at
 * {@link CARD_INNER_WIDTH} under both faces and the two outer ones take one. As with the
 * glosses, the component centres the text inside the box, so a one-line verdict sits on
 * its card's centre line rather than at the top of a two-line box.
 */
export const CARD_VERDICT_HEIGHT = 42;

/** A card's whole content block: 68 — a label, a gap and a verdict box. Not exported. */
const CARD_BLOCK_HEIGHT = EYEBROW_HEIGHT + CARD_LABEL_TO_VERDICT + CARD_VERDICT_HEIGHT;

/**
 * Card `index`'s label top: 180, 324, 468 — the block centred on the card's own centre
 * line, which IS its plate's ({@link plateCentreY}).
 *
 * THE CARD IS THE PLATE'S OWN BOX, SEEN AGAIN. Its top edge, its height and its centre
 * line are the plate's, so the two are level to the pixel at every size — that alignment
 * is what says "this approach belongs to this tier", and it is the reason the approaches
 * are not a free-standing panel of three.
 *
 * @throws through {@link plateCentreY} on a card the chart does not have.
 */
export function cardLabelTop(index: number): number {
  return plateCentreY(index) - CARD_BLOCK_HEIGHT / 2;
}

/** Card `index`'s verdict top: 206, 350, 494. */
export function cardVerdictTop(index: number): number {
  return cardLabelTop(index) + EYEBROW_HEIGHT + CARD_LABEL_TO_VERDICT;
}

// ───────────────────── the thesis ─────────────────────

/** The air between the chart and the thesis: 32. The thesis is the only sentence here
 *  that is not about a tier, so it is set outside all three boxes. Not exported. */
const PLATES_TO_THESIS = 32;

/** The thesis's shelf: 588. Full width — the one sentence addressed to every plate above
 *  it, and the only thing on this stage that belongs to no column. */
export const THESIS_TOP = PLATES_BOTTOM + PLATES_TO_THESIS;

/** The thesis's left edge and measure: 48 and 1184 — the stage's own. */
export const THESIS_LEFT = SIDE_MARGIN;
export const THESIS_WIDTH = CONTENT_WIDTH;

/**
 * The thesis's box: 26, cut for ONE line of 18px serif.
 *
 * 18px on 1.3 is a 23.40 line box; Source Serif 4's content area at this size is ≈1.36em
 * ≈ 24.48, so the painted extent is 24.48 and the box carries 1.52 spare — the same ≈2px
 * rule `leader-invest/chicken-egg-geometry.ts` derives for all six of its boxes.
 *
 * 18px AND NOT THE 22px THE SHIPPED CLOSER TOOK. At 22 the sentence was the loudest thing
 * on a stage whose argument is the figure above it — a headline in the footer. At 18 the
 * shipped thesis is 943.83px of a 1184px measure and reads as the line the presenter says
 * last, which is what a thesis is.
 */
export const THESIS_HEIGHT = 26;

/** Where the stage's lowest box ends: 614. Not exported — the clearance below carries its
 *  whole content. */
const THESIS_BOTTOM = THESIS_TOP + THESIS_HEIGHT;

/**
 * What is left between the thesis and the NavBar's hover band: 18px.
 *
 * DERIVED FROM BOTH ENDS, so an edit anywhere above — a taller register, a looser plate
 * gap, a fourth tier — moves it and a test fails on it before the stage crosses the band.
 * It is the one number that reports the whole vertical budget.
 *
 * 18 IS DELIBERATELY THE TIGHTEST CLEARANCE IN THE LEADER TREE. The brief for this stage
 * asks for the thesis "directly above the navigation bar", and the only thing worth
 * asserting about the number is that it stays positive: a NavBar that fades up under the
 * presenter's own pointer must never fade up OVER a sentence.
 */
export const NAV_ZONE_CLEARANCE = NAV_ZONE_TOP - THESIS_BOTTOM;

// ───────────────────── the copy budgets ─────────────────────
//
// jsdom computes no text, so nothing measures these at render time. Each is a measure
// divided by the per-character advance the browser actually reported for this slide's own
// longest string in that register, taken down for slack, and held over the COPY by the
// unit test — where an author can act on it — rather than discovered on a projector. Same
// construction, and the same admission, as `GATE_BUDGET_CHARS` in
// `leader-mandate/phases-gates-geometry.ts`.
//
// THE WIDER FACE IS THE ONE THAT DECIDES, and which face that is depends on the register:
// for the DISPLAY face the Georgia fallback is 28% wider, for the SANS and SERIF faces the
// WEBFONT is wider by 4–6%, and for MONO the two are identical to within 0.06px. Each
// budget below states which one it was cut against, and it is always the loser.

/**
 * How long the headline may be: 62 characters.
 *
 * `.slide-headline-row` gives 1184px. The shipped headline is 57 characters and measures
 * 1027.72px with the GEORGIA FALLBACK — 18.03px per character, tracking included — which
 * is 87% of the measure and one line. 1184 over that advance gives ≈65, taken down to 62.
 *
 * IT IS ENFORCED ON THE COPY AND NOT LEFT TO THE BROWSER, because the failure is not an
 * overflow a check would see: the row simply gets taller, and it eats the air over the
 * figure that {@link FIGURE_TOP} exists to protect.
 */
export const HEADLINE_BUDGET_CHARS = 62;

/**
 * How long a claim row may be: 66 characters.
 *
 * {@link CLAIM_TEXT_WIDTH} (516px) over ≈7.38px per character — 15px Inter, the WIDER of
 * the two faces here, measured on the longest shipped row (61 characters, 450.08px) —
 * gives ≈69, taken down to 66. A row that wraps does not overflow anything; it pushes the
 * row under it down, which on the middle plate means into the chips row.
 */
export const CLAIM_BUDGET_CHARS = 66;

/**
 * How long an act's gloss may be: 74 characters.
 *
 * {@link ACT_TEXT_WIDTH} × 3 lines (528px of measure) over ≈6.59px per character — 13px
 * Inter, again the wider face, measured on the longer of the two shipped glosses (55
 * characters, 362.17px) — gives ≈80, taken down to 74. The failure mode is a fourth line,
 * which {@link GLOSS_HEIGHT} is not cut for.
 */
export const GLOSS_BUDGET_CHARS = 74;

/**
 * How long an approach verdict may be: 68 characters.
 *
 * {@link CARD_INNER_WIDTH} × 2 lines (528px of measure) over ≈7.30px per character —
 * 15px Source Serif 4, the wider face, measured on the longest shipped verdict (40
 * characters, 291.80px) — gives ≈72, taken down to 68. A third line would push a card's
 * copy past its own padding, and on the two outer cards past the plate beside it.
 */
export const VERDICT_BUDGET_CHARS = 68;

/**
 * How long the thesis may be: 128 characters.
 *
 * {@link THESIS_WIDTH} (1184px) over ≈8.50px per character — 18px Source Serif 4, the
 * wider face, measured on the shipped thesis (111 characters, 943.83px, 80% of the
 * measure) — gives ≈139, taken down to 128. A second line would put the stage's lowest
 * painted pixel at 638 against a floor of 632, i.e. inside the NavBar's hover band.
 */
export const THESIS_BUDGET_CHARS = 128;

/**
 * How long a claim eyebrow may be: 7 characters.
 *
 * {@link EYEBROW_WIDTH} (72px) over 9.02px per character — 11px mono at 0.22em tracking,
 * which is the same on the webfont and on every monospace fallback the deck can fall back
 * to, all of which are 0.6em faces — gives ≈7.98, taken down to 7. The longest shipped
 * eyebrow is CANNOT at six.
 *
 * THE FAILURE MODE IS SILENT AND UGLY: an eighth character wraps the eyebrow onto a
 * second line inside a 16px box, so the gutter grows a descender-height sliver of type
 * that no bounding check reports and every projector shows.
 */
export const EYEBROW_BUDGET_CHARS = 7;

/**
 * How long a plate's whole name row may be: 52 characters.
 *
 * The middle plate's row is the longest and it carries THREE strings — the name, the
 * subname beside it and the tag at the far right — so the budget is over their sum. 11px
 * mono at 9.02px per character across {@link PLATE_INNER_WIDTH} (604px) less the tag's
 * own 81.20px and the 24px gutter in front of it leaves 499px, which is ≈55 characters,
 * taken down to 52. The shipped name and subname are 34 characters together and measure
 * 351.78px with the separator, so the row carries a third of its measure spare.
 *
 * IT IS WRITTEN DOWN ANYWAY: the names are what stands in place of an index on each plate
 * (guardrail 1 in `./content.ts`), so a name that grew into a sentence would be the first
 * sign the chart had started explaining itself instead of naming its rows.
 */
export const NAME_ROW_BUDGET_CHARS = 52;

/**
 * How long the chips row may be: 62 characters.
 *
 * {@link PLATE_INNER_WIDTH} (604px) over 9.02px per character gives ≈66, taken down to
 * 62. The shipped row is 49 characters and 451.00px — 75% of the measure — and it is the
 * one row the middle plate's extra height is spent on, so a second line would be a plate
 * that had outgrown the height its own copy earned.
 */
export const CHIPS_BUDGET_CHARS = 62;
