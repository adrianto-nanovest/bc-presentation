// Two framed engines side by side, and the one thesis line under both of them — as
// numbers, for a 1280×720 stage.
//
// TWO FRAMES, IDENTICAL IN EVERY DIMENSION. Left is the acceptance model, right is the
// change model, and this module gives the two boxes ONE width, ONE height, ONE top edge
// and ONE placement function ({@link panelLeft}) so that nothing about either frame's
// SIZE can say which one matters more. Inside each frame a chain of NODES runs top to
// bottom; the nodes are placed by two functions ({@link tamTierTop} and
// {@link kotterLinkTop}), and both chains are cut to end on the same pixel
// ({@link BODY_BOTTOM}) so that neither chain is longer than the other either. Every
// equality in this file is load-bearing, and the paragraphs below say what each one is
// holding up.
//
// ═══ AND THE ONE INEQUALITY IS THE SHAPE OF THE TWO CHAINS, WHICH IS THE FIGURE'S WHOLE
// JOB. The acceptance model is a CAUSAL chain that FORKS and MERGES — one source of belief
// fanning out to two beliefs, the two beliefs converging into one intention, the intention
// producing use — and the change model is an ORDERED SEQUENCE, five links run in one
// direction. Two chains drawn as two columns of equal boxes joined by hairline ticks say
// neither of those things: they say "list", twice, and a room at projection distance reads
// two lists. So the two chains are given two STRUCTURES that differ before a word is read:
//
//   · THE LEFT CHAIN IS CENTRED AND SYMMETRICAL, and it visibly splits. Its junctions are
//     horizontal spans ({@link FAN_SPAN_WIDTH}) 280px wide across the frame's own centre
//     line, with arrowheads hanging off both ends of the fork and one arrowhead returning
//     to the centre out of the merge. The only place on this stage where two nodes stand
//     side by side is the tier those two arrowheads point into.
//   · THE RIGHT CHAIN IS A RAIL DOWN ONE EDGE, and it visibly runs straight through. One
//     unbroken stroke on one axis ({@link KOTTER_RAIL_CENTRE_X}), as tall as the whole
//     chain ({@link BODY_HEIGHT}), carries the sequence; the five links hang off it on five
//     equal ties ({@link KOTTER_TIE_LENGTH}); and four arrowheads on that same axis
//     ({@link kotterArrowTop}) say "then" four times.
//
// A viewer who cannot read either frame can still see that the left figure branches and
// the right figure does not, and that is the reading the two published models actually
// have.
//
// ═══ THE CONNECTORS ARE PATHS NOW, AND THIS MODULE HANDS OUT THE `d` STRINGS. The first
// cut of this figure drew twelve `<div>` rules and eight CSS border-triangles, because it
// was closing the zero-SMIL question by mounting no `<svg>` at all. That is not the way
// this deck closes it any more — `./components/agentic-org.css` one slide earlier draws six
// SVG spokes and runs six infinite bead loops with ZERO SMIL, because a CSS animation on an
// SVG element is not a SMIL element and the reduced-motion squash in `src/styles/globals.css`
// reaches it. What a path buys that a stack of boxes cannot:
//
//   · A CONNECTOR CAN BE DRAWN. `pathLength` normalisation plus a `stroke-dashoffset`
//     keyframe makes the fork grow OUT of the node above it, in the direction the model
//     claims causation runs. Three boxes fading in beside each other cannot say that.
//   · A CONNECTOR CAN CARRY A CURRENT. The left frame's whole argument is that belief is
//     PRODUCED downstream of conditions a leader sets, and the figure now says it in
//     motion: a dotted current runs source → beliefs → intention → use, for as long as the
//     slide is up. The right frame's argument is different in kind, so its motion is
//     different in kind — ONE runner sweeping the rail top to bottom, with each station
//     flashing as the runner reaches it. Continuous circuit against single ordered pass:
//     the two models' difference, in the one channel a static diagram does not have.
//   · ONE ELEMENT PER CONNECTOR INSTEAD OF THREE. A fork arm was a stem box, a span box and
//     a triangle box that had to be kept in agreement by arithmetic in three places; it is
//     one `d` string here, and the arithmetic is in this file only.
//
// So every mark on both chains is a `<path>`, every arrowhead is a `<polygon>`, and the
// eight functions at the bottom of this module are the only place their coordinates exist.
// See {@link ARROW_POINTS_LENGTH} for the one guarantee the polygons keep.
//
// ═══ THE NO-THIRD-LADDER GUARANTEE STILL LIVES IN THIS FILE, WHICH IS WHY THE FIVE LINKS
// OF THE RIGHT-HAND CHAIN ARE PLACED HERE AND NOT COUNTED ANYWHERE THE COMPONENT CAN SEE.
// §6.6 refuses a third ordered vocabulary beside `gap-capability-ladder`'s L1–L5 and
// `mandate-phases-gates`'s P0–P3 in as many words ("Learn → Experiment → Build →
// Integrate → Own is OUT: it would be a THIRD ladder"), and the reference this slide was
// drawn from numbers its five change steps `01`…`05` on a rising staircase — which is
// precisely the object §6.6 forbids. So:
//
//   · ALL FIVE LINKS ARE THE SAME HEIGHT ({@link NODE_HEIGHT}), the same width
//     ({@link KOTTER_LINK_WIDTH}) and the same left edge ({@link KOTTER_LINK_LEFT}).
//     {@link kotterLinkTop} is `i × pitch` and there is no per-link offset table for an
//     edit to reach into, so a link CANNOT be indented, inset, widened, raised or grown
//     to rank it. A staircase is a scale; five identical boxes on one left edge are a
//     chain.
//   · NO LINK CARRIES AN INDEX. There is no badge box, no numeral column and no ordinal
//     coordinate anywhere in this module — not even an unused one. The order is carried
//     by POSITION (top to bottom), by the RAIL the five hang off, by the four arrowheads on
//     it ({@link kotterArrowTop}) and by the TIME the runner reaches each station
//     ({@link kotterStationOffset}) — which is exactly how the LEFT frame carries its own
//     causal order. Two chains, one mechanism.
//   · THE RAIL IS ONE STROKE AND NOT FIVE. {@link kotterRailPath} is a single unbroken
//     290px path from the top of the first link to the bottom of the last, and the five
//     links are TIED to it by five ties of one length ({@link KOTTER_TIE_LENGTH}) at five
//     identical heights ({@link kotterTieTop}). A continuous line cannot rank the things
//     hung off it: there is no first segment to make heavier and no last segment to let
//     fade, because there are no segments.
//   · AND THE RUNNER CANNOT RANK THEM EITHER, which is the one thing the motion had to be
//     checked against. It is ONE mark that visits all five stations at one speed for one
//     duration; over a cycle every station gets the identical flash. A runner that slowed,
//     brightened or lingered at any station would be a scale drawn in time, which is the
//     same object §6.6 refuses drawn in space. {@link kotterStationOffset} is `i × pitch`
//     for exactly that reason — the arrival TIMES are as evenly spaced as the boxes.
//
// ═══ AND THE LEFT FRAME IS HELD TO THE SAME RULE, though its shape is a fan rather than
// a rail. Its four tiers are NOT four rungs: {@link TAM_TIER_HEIGHTS} gives the three
// lower tiers one height and the top tier the extra room its four named factors need,
// and that is the ONLY height difference on the stage — a difference in CONTENT, not in
// rank. The two belief nodes on the second tier are the same width as each other
// ({@link tamNodeWidth}) and are placed by the same function at two column indices, so
// neither belief can be ranked over the other; the model itself does not rank them.
//
// ═══ NO COLOUR IS EXPORTED FROM THIS MODULE AT ALL, the same decision
// `./middle-out-geometry.ts` records and for the same reason: rank on this stage is a
// colour tier and reveal is an opacity, and the two must not be reachable through one
// object. A geometry module that exported a token name would let a renderer resolve
// "which frame is bright" and "which frame has arrived" out of the same import, which is
// how a slide ends up expressing rank as opacity. The tiers live in
// `./components/TamKotterFrames.tsx`, in one table, as CSS var names — no hex and no
// `rgba()` literal.
//
// ═══ NOTHING IS PINNED TO `./geometry.ts` OR `./middle-out-geometry.ts`, though both
// stand in this directory and both agree about the stage. The rule the leader tree keeps
// is that a figure module restates the stage from `src/styles/globals.css` — the
// authority — rather than importing a sibling's copy of it, because a cross-import welds
// two stages that only happen to agree today. The three modules read the same stylesheet
// and derive their own numbers from it.
//
// Proved importable from bare Node, not assumed — the property every geometry module in
// this tree keeps, so a coordinate can be checked without a bundler:
//
//   $ node --experimental-strip-types -e \
//       'import("./src/slides/leader-shape/tam-kotter-geometry.ts")
//          .then(m => console.log(Object.keys(m).length, "exports"))'
//
// ═══ THE VERTICAL BUDGET, top to bottom, and it is arithmetic rather than measurement.
// `.fig-label` at y=36, `.slide-headline-row` at y=80; a one-line `.slide-headline.small`
// (40px on 1.05) ends the headline row at y=122, and the two frames start on
// {@link CONTENT_TOP} = 156 — `.slide-content`'s OWN top in `src/styles/globals.css`.
//
// THE 34px OF AIR UNDER THE HEADLINE IS A CORRECTION AND NOT A PREFERENCE (owner call).
// This figure shipped with the frames at y=140, 18px under the headline's last pixel, and
// on a projector the two frame borders read as a rule attached to the headline rather than
// as the top edge of two boxes — the title looked like it was sitting ON the figure. C.2
// (`f8-your-agentic-os`) is the floor the owner named: it lays its figure out inside
// `.slide-content`, so its first painted pixel is 34px under the same headline. This stage
// takes the same number, and it takes it from the same authority rather than from C.2 —
// see {@link HEADLINE_CLEARANCE}.
//
//   ─── FRAME · both of them, identical boxes ──────────────────── box 156 → 576 ───
//   172  frame title      · 12px mono caps ·0.20em                            → 188
//   192  attribution      · 12.5px sans                                       → 210
//   222  header hairline  · 1px                                               → 223
//
//   ─── LEFT FRAME · the causal chain, four tiers, one fork, one merge ─ 234 → 524 ───
//   234  EXTERNAL FACTORS node · mark at x=78, text from x=106              → 326
//        240 label · 258 caption · 284 factor row · 304 factor row
//   326  the FORK · stem 10 · spreader 4 · two arrowheads 6                    → 346
//   346  the two belief nodes, side by side                                    → 392
//   392  the MERGE · two stems 10 · joiner 4 · one arrowhead 6                 → 412
//   412  the intention node                                                    → 458
//   458  the one straight connector · rule 14 · arrowhead 6                    → 478
//   478  the actual-use node                                                   → 524
//
//   ─── RIGHT FRAME · the ordered chain, one rail and five links ── 234 → 524 ───
//   234  the RAIL · 4 wide, unbroken, 290 tall, x = 682                        → 524
//   234  link → 280 · tie at 255 · arrowhead 289                              → 295
//   295  link → 341 · tie at 316 · arrowhead 350                              → 356
//   356  link → 402 · tie at 377 · arrowhead 411                              → 417
//   417  link → 463 · tie at 438 · arrowhead 472                              → 478
//   478  link · tie at 499 · NO arrowhead — the sequence ends here             → 524
//
//   ─── EACH FRAME'S CLOSER (inside its own frame, under its own chain) ──────────
//   538  closer · 15px serif, ONE line                                        → 560
//   ─── THE THESIS (full width, and the only thing outside both frames) ──────────
//   596  thesis · 18px serif, ONE line                                        → 620
//   ───────────────────────────────────────────────────────────────────────────────
//   floor y=632 · lowest painted box 620 · {@link NAV_ZONE_CLEARANCE} = 12
//
// THE FLOOR IS THE HOVER BAND AND NOT `.slide-content`'s BOTTOM, the rule every geometry
// module in the leader tree keeps: `.nav-zone` is `bottom: 0; height: 88px` in
// `src/styles/globals.css`, so its top edge is y=632 and nothing on this stage may cross
// it. Content under that band is content the presenter's own pointer makes the NavBar
// fade up over.
//
// AND THE THESIS IS NOW PUSHED DOWN ONTO THAT FLOOR (owner call), where it used to float
// 24px under the frames with 28px of dead stage below it. Two things changed together and
// neither works without the other: the line is set at {@link THESIS_FONT_SIZE} instead of
// 22px, and it sits at {@link THESIS_TOP} with exactly {@link NAV_ZONE_CLEARANCE} = 12px
// of air under it. What that buys is 12px of frame height and a stage whose reading order
// is unmistakable — figure, then the one line the figure was evidence for, on the floor,
// where a room's eye goes last. A 22px line 56px off the floor competed with the headline
// for the room's attention while the figure was still being explained.
//
// ═══ EVERY COPY BUDGET BELOW IS A REAL MEASUREMENT, NOT AN ESTIMATE. Each string was
// rendered in headless Chromium under the deck's own font cascade — the four families
// `index.html` loads from the Google Fonts CDN, awaited to `document.fonts.status ===
// "loaded"` before a single box was measured — as a `white-space: nowrap` clone for the
// width and AGAIN as a wrapping block at its real box width for the line count, with the
// keyword runs italic exactly as `src/components/highlight.tsx` emits them. That is the
// method `leader-invest/chicken-egg-geometry.ts` records and argues for over
// `canvas.measureText`. BOTH FACES ARE GIVEN, because the deck loads its faces from a CDN
// and an auditorium without it renders the fallbacks:
//
//   box                 register                     webfont / fallback   measure  lines
//   headline            40px display + kw italic     799.08 /   980.42      1184     1
//   thesis              18px serif  + kw italic      648.69 /   634.36      1184     1
//   frame closer (long) 15px serif  + kw italic      435.00 /   452.16       536     1
//   frame title (long)  12px mono ·0.20em ·upper     259.20 /   259.23       536     1
//   attribution (long)  12.5px sans                  388.98 /   387.23       536     1
//   node label (long)   11px mono ·0.16em ·upper     175.56 /   175.59       212     1
//   node caption (long) 12px sans                    195.09 /   195.80       212     1
//   factor (long)       12px sans                    135.64 /   134.51       224     1
//
// THE TWO SERIF FIGURES ARE THE 22px MEASUREMENTS SCALED BY 18/22, which is honest for a
// linear register and is stated rather than implied: 792.84 → 648.69 and 775.33 → 634.36.
// The line was measured at 22px, it is set at 18, and at 55% of the measure either way the
// difference cannot decide anything.
//
// THE FALLBACK FACE IS THE ONE THAT DECIDES for the display register — the headline is 23%
// wider without the CDN — and the WEBFONT decides for the sans, which is why each budget
// below states which face it was cut against. It is always the loser. The MONO figures are
// the same on both faces to within 0.03px, because every monospace face the cascade can
// land on is a 0.6em face.
//
// Pure data and pure functions. No React, no DOM, no CSS-var strings, and no work at
// module scope beyond the arithmetic below.

// ───────────────────── the stage, restated ─────────────────────

/**
 * This slide's copy, as a TYPE only — the other end of the two count pins
 * ({@link KOTTER_LINK_COUNT}, {@link FACTOR_COUNT}). Type-space only, so bare Node never
 * has to resolve it.
 */
type TamKotterCopy = (typeof import("./content"))["shapeTamKotterContent"];

/** The stage. 1280×720 — the deck's one stage size, restated (see the header for why
 *  there is nothing this module is allowed to pin it to). */
export const STAGE = { width: 1280, height: 720 } as const;

/** The deck's side margin — `.fig-label`, `.slide-headline-row` and `.slide-content` all
 *  sit at `left: 48px` in `src/styles/globals.css`. */
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
 * Where the headline's last pixel is: 122.
 *
 * `.slide-headline-row` is at `top: 80px` and a one-line `.slide-headline.small` is 40px
 * on 1.05, so 80 + 42 = 122. Exported because {@link HEADLINE_CLEARANCE} is the number the
 * owner's correction is actually about, and a reader checking it needs both ends of the
 * subtraction.
 */
export const HEADLINE_BOTTOM = 122;

/**
 * The highest y the figure may start at: 134 — and this stage deliberately does NOT use
 * it.
 *
 * 12 under {@link HEADLINE_BOTTOM} is the leader tree's binding gap, and it is the right
 * number for a line of TYPE hung under a headline (`./middle-out-geometry.ts` hangs its
 * standing kicker there). It is the wrong number for a BORDER, which is what this stage
 * starts with, and the difference is what the owner's correction is about — see
 * {@link CONTENT_TOP}. Kept and exported so the two numbers can be compared in one place,
 * and so a later figure in this directory can hang type at 134 without re-deriving it.
 */
export const FIGURE_CEILING = HEADLINE_BOTTOM + 12;

/**
 * The shelf both frames start on: 156 — `.slide-content`'s OWN `top`.
 *
 * TAKEN FROM THE STYLESHEET AND NOT FROM C.2, though C.2 is the slide the owner pointed
 * at. `f8-your-agentic-os` lays its figure out inside `.slide-content` and therefore
 * starts 34px under the same headline; the number they share is `globals.css`'s, so this
 * module restates the authority rather than transcribing a sibling's use of it. Every
 * standard-shell slide in the deck already begins here, which is what makes 34px the
 * deck's own answer to "how much air goes under a headline" rather than this figure's.
 *
 * IT REPLACES 140, WHICH WAS 18px OF AIR AND VISIBLY TOO LITTLE (owner call, screenshot).
 * The old number was derived correctly from the wrong premise: it cleared
 * {@link FIGURE_CEILING} by 6 and spent the 16px a kicker would have taken on frame
 * height. But the first thing this stage paints under the headline is a 1px COPPER BORDER
 * running the full width of the stage, and at 18px that border reads as an underline on
 * the headline. Type can sit at 12–18px under a headline because type has its own
 * sidebearings and a ragged right edge; a full-width rule has neither.
 *
 * THE 16px IT COSTS CAME BACK OUT OF THE THESIS, not out of the chains — see
 * {@link THESIS_TOP}. Both chains are 12px TALLER than they were before this correction.
 */
export const CONTENT_TOP = 156;

/**
 * The air between the headline and the first painted pixel of the figure: 34.
 *
 * DERIVED FROM BOTH ENDS so it cannot drift, and exported because it is the one number the
 * owner's correction names: it is the MINIMUM, and C.2 is where the floor was set. A later
 * edit that lowers it is re-opening a decision that has already been made on a projector.
 */
export const HEADLINE_CLEARANCE = CONTENT_TOP - HEADLINE_BOTTOM;

// ───────────────────── the two frames ─────────────────────

/**
 * How many frames there are: 2.
 *
 * TWO IS THE SLIDE. One model explains why a person starts and the other explains why an
 * organisation does not stop, and neither is sufficient — which is the sentence the thesis
 * at the foot of the stage makes. A third frame would not be a layout problem, it would be
 * a different slide.
 */
export const PANEL_COUNT = 2;

/** The LEFT frame: 0 — the acceptance model. Named rather than written as a literal at
 *  the call sites that need it, so "the frame the causal chain lives in" is a word. */
export const TAM_PANEL = 0;

/** The RIGHT frame: 1 — the change model. */
export const KOTTER_PANEL = 1;

/**
 * The gutter between the two frames: 32.
 *
 * WIDE ENOUGH TO BE A GAP AND NARROW ENOUGH TO BE A PAIR. At 48 the two frames read as
 * two slides printed beside each other; at 16 the two borders read as one double rule and
 * the stage becomes a single table with a seam down it. 32 is the deck's own paragraph
 * gap and it leaves each frame 576px, which is what {@link PANEL_INNER_WIDTH} is spent
 * out of.
 *
 * Not exported: {@link PANEL_WIDTH} and {@link panelLeft} carry it.
 */
const PANEL_GAP = 32;

/**
 * Each frame's width: 576 — DERIVED as an equal share of the stage, never typed.
 *
 * THE EQUALITY IS THE ARGUMENT AND NOT A CONVENIENCE. This slide's claim is that belief
 * and sequence are two conditions, not a condition and a caveat; a frame drawn wider than
 * the one beside it would rank the two models by area before either had said anything.
 * Deriving the width from `CONTENT_WIDTH` and `PANEL_GAP` means there is no per-frame
 * number for an edit to widen, and re-cutting the gutter moves both frames together.
 */
export const PANEL_WIDTH = (CONTENT_WIDTH - PANEL_GAP) / PANEL_COUNT;

/** A frame's inner padding, left and right: 20. Not exported — the two values derived
 *  from it are. */
const PANEL_PAD_X = 20;

/**
 * A frame's inner padding, top and bottom: 16.
 *
 * TIGHTER THAN THE HORIZONTAL PADDING ON PURPOSE. The frames are tall and narrow, so
 * equal padding would leave the header floating; 16 over 20 makes the box read as a
 * column of content rather than as a card with a margin. Not exported.
 */
const PANEL_PAD_Y = 16;

/** The width available inside a frame: 536 — the measure every string on this stage
 *  except the headline and the thesis is cut against. */
export const PANEL_INNER_WIDTH = PANEL_WIDTH - 2 * PANEL_PAD_X;

/** The guard every frame placement function shares, so an index one of them accepts is
 *  always an index the others place. Not exported. */
function assertPanel(fn: string, index: number): void {
  if (!Number.isInteger(index) || index < 0 || index >= PANEL_COUNT) {
    throw new Error(
      `${fn}: no frame ${index} — this stage has ${PANEL_COUNT} ` +
        `(0…${PANEL_COUNT - 1}): the acceptance model and the change model. A third ` +
        `would cut both existing frames from ${PANEL_WIDTH} to ` +
        `${(CONTENT_WIDTH - 2 * PANEL_GAP) / 3}px, which is under the measure every ` +
        `copy budget in this module was cut against.`,
    );
  }
}

/**
 * Frame `index`'s left edge: 48, 656.
 *
 * ONE FUNCTION, AND IT IS `i × (width + gap)`. There is deliberately no per-frame offset
 * table — see the header on why equal geometry is what holds the two frames unranked.
 *
 * @throws on a third frame — see {@link assertPanel}. An out-of-range FRAME index is an
 *         authoring bug and the author must be shown it, exactly as `bandTop` in
 *         `./middle-out-geometry.ts` throws. A POSE is different: `./tam-kotter-walk.ts`
 *         answers every pose question totally and never throws, because a pose is UI
 *         state and a slide that crashes on one is worse in front of a room than a slide
 *         with nothing revealed.
 */
export function panelLeft(index: number): number {
  assertPanel("panelLeft", index);
  return SIDE_MARGIN + index * (PANEL_WIDTH + PANEL_GAP);
}

/**
 * The left edge of everything inside frame `index`: 68, 676.
 *
 * @throws through {@link panelLeft} on a frame this stage does not have.
 */
export function panelInnerLeft(index: number): number {
  return panelLeft(index) + PANEL_PAD_X;
}

/**
 * Frame `index`'s own vertical centre line: 336, 944.
 *
 * THE LEFT CHAIN IS BUILT ENTIRELY OUT OF THIS. Its fan leaves the centre line, spreads,
 * and returns to it, so the whole causal chain hangs off one number and cannot come to
 * disagree with the boxes it connects.
 *
 * THE RIGHT CHAIN DELIBERATELY DOES NOT USE IT, and that is the asymmetry the whole figure
 * turns on. Its sequence runs down a RAIL at the frame's inner LEFT edge
 * ({@link KOTTER_RAIL_CENTRE_X}) with the five links hung off it, because a chain that ran
 * down the same centre line as the one opposite would be the second column this figure
 * exists not to be. Frame 1's centre line is therefore computable and unused — kept
 * because {@link panelLeft} and {@link panelInnerLeft} are one function per frame and this
 * one is too, and a version that threw for frame 1 would be an exception dressed as a
 * coordinate.
 *
 * @throws through {@link panelLeft} on a frame this stage does not have.
 */
export function panelCentreX(index: number): number {
  return panelInnerLeft(index) + PANEL_INNER_WIDTH / 2;
}

// ───────────────────── inside a frame: the header ─────────────────────

/** The top edge of a frame's inner content: 172. Both frames, one value. */
export const PANEL_INNER_TOP = CONTENT_TOP + PANEL_PAD_Y;

/** A frame TITLE's box: 16 — 12px mono on 1.3 is a 15.60 line box and JetBrains Mono's
 *  content area is 1.3em, so the painted extent is 15.60 and the box carries 0.40 spare. */
export const FRAME_TITLE_HEIGHT = 16;

/** Where a frame's title sits: 172. */
export const FRAME_TITLE_TOP = PANEL_INNER_TOP;

/** The air between the title and the attribution under it: 4 — the tightest gap on this
 *  stage, because the two lines are one object. Not exported. */
const TITLE_TO_ATTRIBUTION = 4;

/** An ATTRIBUTION's box: 18 — 12.5px sans on 1.35 is a 16.88 line box painting ≈17.5, so
 *  the box carries 0.5 spare. Cut for ONE line; see {@link ATTRIBUTION_BUDGET_CHARS}. */
export const ATTRIBUTION_HEIGHT = 18;

/** Where a frame's attribution sits: 192 — the model's name and its author, on the line
 *  under the frame's own name. */
export const ATTRIBUTION_TOP = FRAME_TITLE_TOP + FRAME_TITLE_HEIGHT + TITLE_TO_ATTRIBUTION;

/** The air between the attribution and the hairline under it: 12. Not exported. */
const ATTRIBUTION_TO_RULE = 12;

/** The header hairline's thickness: 1 — `.copper-rule`'s own weight in
 *  `src/styles/globals.css`, and the deck's standard divider. THINNER THAN A CONNECTOR
 *  ({@link RULE_THICKNESS}) on purpose: this line divides, the connectors argue. */
export const HEADER_RULE_HEIGHT = 1;

/**
 * The hairline under each frame's header: 222.
 *
 * IT IS WHAT MAKES THE FRAME A FRAME RATHER THAN A CARD. Without it the title, the
 * attribution and the first node of the chain read as three items in one list, and the
 * room has to work out which of them is the heading. With it the frame has a header and a
 * body, which is the reading every framed diagram in this deck asks for.
 *
 * It spans {@link PANEL_INNER_WIDTH} and not the frame box, so the rule stops on the same
 * two edges every line of type inside the frame starts and ends on.
 */
export const HEADER_RULE_TOP = ATTRIBUTION_TOP + ATTRIBUTION_HEIGHT + ATTRIBUTION_TO_RULE;

/** The air between the hairline and the first node of the chain: 11 — slightly under the
 *  12 above it, so the rule binds DOWN to the body it introduces rather than sitting
 *  midway between two things. Not exported. */
const RULE_TO_BODY = 11;

/** Where both chains start: 234. ONE VALUE FOR BOTH FRAMES — the two chains begin on the
 *  same line, so neither model appears to start earlier than the other. */
export const BODY_TOP = HEADER_RULE_TOP + HEADER_RULE_HEIGHT + RULE_TO_BODY;

// ───────────────────── the node, which both chains are built from ─────────────────────
//
// ONE NODE IDIOM FOR TEN BOXES, and it is the reason the two frames can carry order the
// same way. A node is a bordered box holding a mono LABEL over a sans CAPTION with an
// animated GLYPH on its right: five of them make the left frame's causal chain, five make
// the right frame's ordered chain, and because they are the same object the room learns to
// read one of them once. What differs between the two halves is the SHAPE of the chain — a
// fan and a rail — and nothing else. A second node idiom on the right would have made the
// two frames two figures.

/**
 * A node's horizontal padding: 10 — DOWN FROM 12, and the two pixels went into the
 * caption's measure.
 *
 * THE GLYPH SLOT IS PAID FOR OUT OF THIS AND OUT OF NOTHING ELSE. Adding a 20px mark to
 * the right of every node takes {@link GLYPH_SIZE} + {@link GLYPH_GAP} = 28px off the
 * measure, and the tightest string on the stage — a belief node's 195.80px caption in a
 * 260px box — had 40px of slack to spend and would have been left with 12. Two pixels of
 * padding on each side buys 4 of them back, and a node whose text starts 10px inside its
 * own border still reads as a padded box at 12px. Not exported — {@link nodeTextLeft} and
 * {@link nodeTextWidth} are.
 */
const NODE_PAD_X = 10;

/** A node's vertical padding: 6. Not exported. */
const NODE_PAD_Y = 6;

/** A node LABEL's box: 15 — 11px mono on 1.3 is a 14.30 line box, 0.70 spare. ONE HEIGHT
 *  FOR ALL TEN LABELS in both chains. */
export const NODE_LABEL_HEIGHT = 15;

/** The air between a node's label and its caption: 3 — they are one object, and anything
 *  looser reads as two rows. Not exported. */
const LABEL_TO_CAPTION = 3;

/** A node CAPTION's box: 16 — 12px sans on 1.3 is a 15.60 line box, 0.40 spare. Cut for
 *  ONE line; see {@link NODE_CAPTION_BUDGET_CHARS}. */
export const NODE_CAPTION_HEIGHT = 16;

/**
 * Every node's height: 46 — EXCEPT the one that carries the four named factors.
 *
 * ONE HEIGHT FOR NINE OF THE TEN NODES, and it is the single number that keeps the
 * right-hand chain from being a staircase: five boxes of one height on one left edge
 * cannot be read as five rungs. Derived from the four registers above rather than typed,
 * so a taller label or a looser gap moves every node, both chains, both frames and
 * {@link NAV_ZONE_CLEARANCE} together.
 *
 * IT IS ALSO WHAT THE GLYPH SLOT IS CENTRED IN, and the arithmetic is exact rather than
 * lucky: `(46 − 20) / 2 = 13`, an integer, so a 20px mark sits on a whole pixel in every
 * node on the stage. See {@link glyphTop} for why the tall node uses the same number.
 */
export const NODE_HEIGHT = 2 * NODE_PAD_Y + NODE_LABEL_HEIGHT + LABEL_TO_CAPTION + NODE_CAPTION_HEIGHT;

/**
 * A node's animated glyph: 20×20.
 *
 * TWENTY IS THE SIZE AT WHICH A STROKE MARK IS STILL A DRAWING. Below about 16 a 1.6px
 * stroke in a 20-unit viewBox stops resolving into a shape at projection distance and
 * becomes a smudge that reads as a bullet; above about 24 the mark starts to compete with
 * the 11px label beside it, and the node becomes an icon with a caption rather than a
 * label with a mark. The whole slot — mark plus {@link GLYPH_GAP} — is 28px, which is 13%
 * of a belief node's measure and 5% of a full-width node's.
 *
 * TEN MARKS, ONE SIZE, AND THAT IS THE SAME RULE AS EVERY OTHER DIMENSION ON THIS STAGE. A
 * glyph drawn larger on one node would rank it, and the two frames would stop being a
 * pair — see the header. `./components/TamKotterGlyphs.tsx` draws all ten in one 20-unit
 * viewBox for exactly this reason.
 */
export const GLYPH_SIZE = 20;

/** The air between a node's glyph and the text after it: 8 — enough that the mark is not
 *  read as the first character of the label, tight enough that it is read as belonging to
 *  the node rather than floating in its padding. */
export const GLYPH_GAP = 8;

/**
 * Where a node's text starts, given the node's own left edge: 106, 382 for the second
 * belief, 742 for a link.
 *
 * THE GLYPH COMES FIRST AND THE TEXT IS INSET PAST IT, which is a correction and not the
 * first cut. The marks were placed flush to each node's RIGHT padding, which put a perfect
 * column down each frame and left every mark 450px from the label it belongs to in the
 * right-hand chain — a column of ten marks that read as a separate index rather than as
 * part of the ten boxes. Leading, the mark is adjacent to the name it illustrates, and the
 * column it forms is 10px inside each node's left border: on the right-hand chain that puts
 * it directly in line with the tie the rail feeds each station through, so the rail visibly
 * arrives AT something.
 *
 * IT COSTS THE SAME MEASURE EITHER WAY. {@link nodeTextWidth} subtracts the slot once and
 * does not care which side of the text it is on, so no copy budget moved with this change.
 */
export function nodeTextLeft(nodeLeft: number): number {
  return nodeLeft + NODE_PAD_X + GLYPH_SIZE + GLYPH_GAP;
}

/**
 * The measure a node's CAPTION gets, given the node's own width: 488 in a full-width node,
 * 212 in one of the two belief nodes, 460 in one of the five links.
 *
 * `width − 2·pad − glyph − gap` — the glyph slot is subtracted HERE and in exactly one
 * place, so no register on this stage can be cut against a measure the glyph does not come
 * out of. Both narrow numbers are budgets at the foot of this module.
 *
 * THE ORDINAL DOES NOT COME OUT OF THIS, and that is what makes numbering the acceptance
 * model's chain possible at all. The numeral sits on the LABEL's row (see {@link indexTop}),
 * two rows above the caption's last pixel, so it costs the label its slot and costs the
 * caption nothing — see {@link nodeLabelWidth}. Taking it out of both would leave a belief
 * card's caption 178px of measure for a 195.80px question, and the caption would wrap into
 * the merge that is the one mark saying two beliefs become one intention.
 */
export function nodeTextWidth(nodeWidth: number): number {
  return nodeWidth - 2 * NODE_PAD_X - GLYPH_GAP - GLYPH_SIZE;
}

/**
 * The measure a node's LABEL gets: the caption's, less the ordinal's slot on a numbered card
 * — 458 in a full-width node, 182 in a belief node, 430 in a link.
 *
 * THE TIGHTEST MEASURE ON THE STAGE IS A NUMBERED BELIEF CARD'S LABEL, at 182px against a
 * longest label of 175.59px. That 6.4px is the whole reason {@link INDEX_WIDTH} is 22 and not
 * 26, and it is why the register was taken down to 12px when the acceptance model's chain was
 * numbered too — see {@link NODE_LABEL_BUDGET_CHARS}, which is now cut against this number
 * rather than against the caption's.
 */
export function nodeLabelWidth(nodeWidth: number, indexed = false): number {
  return nodeTextWidth(nodeWidth) - (indexed ? GLYPH_GAP + INDEX_WIDTH : 0);
}

/** Where a node's LABEL sits, given the node's own top edge. */
export function nodeLabelTop(nodeTop: number): number {
  return nodeTop + NODE_PAD_Y;
}

/** Where a node's CAPTION sits, given the node's own top edge. ONE FUNCTION FOR BOTH
 *  CHAINS, so a caption can never sit at a different height on one side of the stage than
 *  on the other. */
export function nodeCaptionTop(nodeTop: number): number {
  return nodeLabelTop(nodeTop) + NODE_LABEL_HEIGHT + LABEL_TO_CAPTION;
}

/**
 * Where a node's GLYPH sits horizontally, given the node's own left edge: 78, 354 for the
 * second belief, 714 for every link.
 *
 * FLUSH TO THE NODE'S LEFT PADDING, so the marks stand on the same vertical line as the
 * text used to and the text is inset past them — see {@link nodeTextLeft} for why that is a
 * correction rather than the first cut. On the right-hand chain all five land on 714, which
 * is 10px past the link's left border and directly in line with the tie the rail feeds it
 * through.
 *
 * IT TAKES NO WIDTH ARGUMENT, and that is the second thing the correction bought: a
 * trailing mark has to be placed from the far edge of a box, so it depended on the node's
 * width and could be moved by re-cutting one. A leading mark depends on the padding alone.
 */
export function glyphLeft(nodeLeft: number): number {
  return nodeLeft + NODE_PAD_X;
}

/**
 * Where a node's GLYPH sits vertically, given the node's own top edge: `top + 13`.
 *
 * CENTRED ON THE LABEL-AND-CAPTION BLOCK, NOT ON THE BOX — which is the same number for
 * nine of the ten nodes and a deliberately different one for the tenth. The text block is
 * `NODE_LABEL_HEIGHT + LABEL_TO_CAPTION + NODE_CAPTION_HEIGHT` = 34 tall starting at
 * `NODE_PAD_Y`, so its centre is at `6 + 17 = 23` and a 20px mark hangs from 13. In a
 * standard 46px node that is also the box's own centre; in the 92px node that carries the
 * four factors it is NOT, and the mark stays up on the label row where it belongs rather
 * than drifting down beside the factor block and reading as a fifth factor.
 */
export function glyphTop(nodeTop: number): number {
  return (
    nodeLabelTop(nodeTop) +
    (NODE_LABEL_HEIGHT + LABEL_TO_CAPTION + NODE_CAPTION_HEIGHT - GLYPH_SIZE) / 2
  );
}

// ───────────────────── the ordinal on a card ─────────────────────
//
// ═══ BOTH CHAINS NOW CARRY ORDINALS, AND THAT IS AN OWNER DECISION THAT OVERRIDES A STANDING
// GUARDRAIL (owner call, 2026-08-14, in two parts — the ordered chain first, the causal one
// after). It has to be recorded rather than merely implemented, because five modules under
// this directory argue at length that it must not happen and a later reader will find those
// arguments before they find this one.
//
// WHAT §6.6 ACTUALLY REFUSES, and what it does not. The refusal is of a THIRD ORDERED
// VOCABULARY beside `gap-capability-ladder`'s L1–L5 and `mandate-phases-gates`'s P0–P3 —
// that is, a named scale the deck teaches and then reuses, so that a room starts asking
// "which level are we at?". The owner's instruction is narrower than that: number the cards of
// two published models so the room can see the structure at a glance and the presenter can say
// "step three". The two are separable, and the separation is what the rest of this section is
// for:
//
//   · THE ORDERED CHAIN IS NUMBERED BY LINK: `01`…`05`, one per card, which is the sequence
//     the model publishes.
//   · THE CAUSAL CHAIN IS NUMBERED BY TIER, NOT BY CARD: `01`, `02`, `02`, `03`, `04` — and
//     THE TWO BELIEF CARDS SHARE `02`. That is the one decision in this section that is not a
//     transcription of the owner's words, and it is the only numbering of the left frame that
//     is not a misquotation of Davis. The acceptance model's second tier is a PAIR it
//     explicitly does not order; `02` and `03` on two beliefs would print a sequence the
//     literature denies, and the room would leave believing usefulness is weighed before
//     effort. Two cards showing the same numeral say the true thing instead — these are one
//     stage, in parallel — and they say it in the same channel the numbers are already in.
//     `TAM_TIER` is what the renderer indexes for it, so the shared numeral is the tier table
//     and cannot drift from the fan the geometry draws.
//   · THE NUMERAL IS AN INDEX, NOT A SCALE. It sits at the card's TOP RIGHT corner in the
//     quietest legible tier — not in a badge, not in a filled chip, not on a tread, and not
//     at the head of the label where it would become part of the card's NAME. `01` beside
//     `CREATE URGENCY` is a position in a list; `L1 · CREATE URGENCY` is a level.
//   · ONE REGISTER FOR ALL NINE NUMERALS, BOTH FRAMES. 12px mono in one colour at one
//     position, which is the two-frames-are-equal contract applied to the newest mark on the
//     stage. It is 12 rather than the 14 the ordered chain shipped with, and the belief cards
//     are why: at 14 the slot left a 260px card's label 178px of measure for a 175.59px label,
//     and 2.4px is not slack. The owner's "we can make it small, it is ok" is what licensed
//     taking it down — and taking it down on BOTH sides rather than only the left is what
//     keeps the two frames a pair.
//   · NOTHING ELSE ABOUT A NUMBERED CARD CHANGES. All ten keep one height idiom, one label
//     tier, one caption tier, one mark size, one hover state; the five links keep one width,
//     one left edge and `i × pitch`. The numeral is the ONLY per-card difference on the stage.
//   · THERE IS STILL NO ORDINAL FIELD IN THE COPY. `./content.ts`'s `ChainNode` is unchanged;
//     both strings are formatted at the point of render — from the array index on the right,
//     from the tier index on the left. That half of the guardrail is intact, and it is the
//     half that matters for a copy edit: nobody can reorder either chain and leave the numbers
//     behind.

/**
 * The box an ordinal is set in: 22 × 16.
 *
 * 22 IS TWO DIGITS AT 12px MONO PLUS ITS OWN TRACKING, with room for a third that will never
 * come: a 0.6em face gives 7.2px per digit, so `01` measures 14.4 and 0.06em of tracking takes
 * it to ≈15.9. 16 is the 12px line box (15.6) rounded up, which keeps {@link indexTop} an
 * integer.
 *
 * IT WAS 26 × 18 AT 14px AND CAME DOWN WHEN THE LEFT FRAME WAS NUMBERED TOO. The binding
 * constraint is a belief card, whose 260px box leaves its label 212px before the ordinal and
 * 182px after — against a longest label of 175.59px. At 14px the same arithmetic gave 178px,
 * which is 2.4px of slack and not a budget. See {@link nodeLabelWidth} and the section header
 * on why the register came down on BOTH sides rather than only the narrow one.
 *
 * IT IS A MEASURE AND NOT A BADGE. There is no border, no ground and no radius here, because
 * a numeral in a box is a chip and a chip is the thing the reference this slide was drawn
 * from puts on a rising tread. See the section header.
 */
export const INDEX_WIDTH = 22;
export const INDEX_HEIGHT = 16;

/** Where a card's ordinal sits horizontally, given the card's own left edge and width: 572 on
 *  the causal chain's full-width cards, 296 and 572 on its two belief cards, 1180 on all five
 *  links. Flush to the card's right padding, so the numerals of a chain stand on one line down
 *  its outer edge — the furthest point on a card from the mark and the label, which is where
 *  an index belongs and a name does not. */
export function indexLeft(nodeLeft: number, nodeWidth: number): number {
  return nodeLeft + nodeWidth - NODE_PAD_X - INDEX_WIDTH;
}

/**
 * Where a card's ordinal sits vertically, given the card's own top edge: `top + 4`.
 *
 * TWO PIXELS ABOVE THE LABEL ROW, which is what makes it the card's TOP right rather than
 * its right: a numeral optically centred on the label row reads as a second column of the
 * label, and lifted by two it reads as a corner mark. It is also the one register on this
 * stage that is deliberately NOT on the label's own baseline.
 *
 * IT IS ON THE LABEL'S ROW AND NOT THE CAPTION'S, AND THAT IS A LAYOUT GUARANTEE RATHER THAN
 * A PREFERENCE. The box runs `top + 4 … top + 20` and a caption's row starts at `top + 24`, so
 * a numeral can never sit beside a caption — which is what lets {@link nodeTextWidth} give
 * every caption the full measure and charge the ordinal to the short string instead. Move this
 * down and a belief card's 195.80px question starts wrapping.
 */
export function indexTop(nodeTop: number): number {
  return nodeLabelTop(nodeTop) - 2;
}

// ───────────────────── the connectors ─────────────────────

/**
 * A connector's stroke width: 4 — four times `.copper-rule`'s 1px, and twice what this
 * figure first shipped with.
 *
 * THESE ARE THE MARKS THE WHOLE NO-THIRD-LADDER DECISION RESTS ON. Order on this stage is
 * carried by position and by these strokes and by nothing else — no numeral, no badge, no
 * graded colour — so a connector that a projector at the back of a room loses is an
 * argument the room cannot follow.
 *
 * TWO PIXELS WAS NOT ENOUGH, AND THAT IS A MEASURED FAILURE RATHER THAN A PREFERENCE. At
 * 2px in `--copper-600` the nine segments of the left chain and the four of the right one
 * came out at roughly one projected pixel over a `--neutral-900` ground, and both halves of
 * the figure collapsed into what they are made of: a column of identically-sized bordered
 * boxes. The fork stopped forking, the merge stopped merging, and the five links of the
 * change model read as a bulleted list.
 *
 * IT IS ALSO THE CHANNEL THE CURRENT RUNS INSIDE — see {@link CURRENT_THICKNESS}, which is
 * derived from it.
 */
export const RULE_THICKNESS = 4;

/**
 * The current's stroke width: 2 — HALF the connector it runs inside.
 *
 * IT WAS 4 AND THAT WAS WRONG, on a screenshot rather than in principle. A 3px dot at the
 * connector's own width, in a brighter tier, does not ride the line — it REPLACES the line
 * for its own length, so both fan bars came out as chains of copper beads and the left frame
 * read as three dashed rules. A dashed connector says "weak link", which is the opposite of
 * what a causal model's spine should say, and it is exactly the reading
 * `RULE_THICKNESS`'s own 2px-was-not-enough note was written to prevent.
 *
 * AT HALF THE WIDTH THE STRUCTURE SURVIVES THE MOTION. The `--copper-400` line is continuous
 * at all times and 1px of it shows on each flank of every dot, so what the room sees is
 * something travelling THROUGH a connector rather than a connector made of dots. Derived
 * rather than typed, so re-cutting the connector keeps the ratio — and 2 is the smallest
 * width that survives the stage's own scale-down on a laptop preview.
 *
 * THE RUNNER IS NOT HELD TO THIS, deliberately, and `./components/TamKotterFrames.tsx` says
 * so where it strokes the two: the runner is ONE 34px segment and its job IS to replace the
 * rail for its own length — that is what makes it read as a position on a route rather than
 * as a dotted overlay. Two overlays, two widths, two different claims.
 */
export const CURRENT_THICKNESS = RULE_THICKNESS / 2;

/**
 * How wide an arrowhead is across its base: 12 — three times the stroke it terminates.
 *
 * DERIVED FROM {@link RULE_THICKNESS}, so a head can never come to be a different mark from
 * the line it ends. THREE TIMES is the smallest multiple that reads as a HEAD rather than
 * as a swelling: at 2× a 4px stroke ends in an 8px wedge that a projector renders as a
 * blunt tip, and at 4× the head starts to read as a separate triangle that happens to sit
 * near a line. Eight heads on this stage, one width.
 */
export const ARROW_HEAD_WIDTH = 3 * RULE_THICKNESS;

/** Half of it: 6 — the number an arrowhead is actually PLACED with, because a head is
 *  centred on an axis. */
export const ARROW_HEAD_HALF_WIDTH = ARROW_HEAD_WIDTH / 2;

/**
 * How tall an arrowhead is: 6 — the same as its half-width, so its two flanks meet at a
 * right angle.
 *
 * A 90° APEX IS THE ONE ANGLE THAT SURVIVES BOTH ENDS OF THIS FIGURE'S SCALE. Sharper
 * heads (a taller triangle on the same base) are what a drawing program defaults to and
 * they read as elegant on a monitor and as a taper — a line that got thicker — from the
 * back of a room. Blunter heads read as a chevron pointing nowhere. At 12 across and 6
 * down the head is unmistakably a triangle at 1280×720 and still a triangle at a quarter of
 * it.
 *
 * IT IS ALSO THE NUMBER THE LEFT CHAIN'S FAN IS CUT AROUND — see {@link FAN_STEM}, which
 * subtracts exactly one head's height so that a fork's ARM ends where its head begins.
 */
export const ARROW_HEAD_HEIGHT = ARROW_HEAD_HALF_WIDTH;

/**
 * How many coordinates an arrowhead's `points` attribute carries: 3.
 *
 * A TRIANGLE IS THREE POINTS AND {@link arrowPoints} RETURNS EXACTLY THREE, which is worth
 * a constant because it is the one property of that function a test can hold without
 * re-deriving its arithmetic. Eight heads on this stage go through it, and a fourth point
 * — a bevel, a notch, a "nicer" head — would be the first step towards eight heads that
 * are not the same mark.
 */
export const ARROW_POINTS_LENGTH = 3;

/**
 * One arrowhead, as an SVG `points` string — centred on `centreX`, base on `top`, tip
 * {@link ARROW_HEAD_HEIGHT} below it.
 *
 * A `<polygon>` AND NOT A CSS BORDER TRIANGLE, which is the one reversal in this figure's
 * rebuild. The first cut drew all eight heads as `width: 0; height: 0` elements with two
 * transparent borders, because it was closing the zero-SMIL question by mounting no `<svg>`
 * at all; that is not how this deck closes it (see the header), and inside an `<svg>` a
 * polygon is the plain answer. It also puts the head in the same coordinate space, the same
 * fill tier and the same DOM parent as the path it terminates, so the two cannot come to
 * disagree about where the line ends.
 *
 * THE TIP LANDS ON THE TOP EDGE OF WHAT IT POINTS AT, which is the rule every one of this
 * stage's eight heads keeps: `top` is always `<something>Top − ARROW_HEAD_HEIGHT`, and
 * {@link tamArrowTop} and {@link kotterArrowTop} do that subtraction so a call site cannot
 * forget it.
 *
 * ALL EIGHT POINT DOWN THE PAGE, so there is no direction argument and there is
 * deliberately nothing to pass one to. Both chains run top to bottom; a head that could
 * point up would be a feedback loop neither published model has, and the acceptance model
 * in particular is frequently misdrawn with one.
 */
export function arrowPoints(centreX: number, top: number): string {
  const left = centreX - ARROW_HEAD_HALF_WIDTH;
  const right = centreX + ARROW_HEAD_HALF_WIDTH;
  return `${left},${top} ${right},${top} ${centreX},${top + ARROW_HEAD_HEIGHT}`;
}

// ───────────────────── the right frame: one rail, five links ─────────────────────
//
// THE RAIL IS THE SEQUENCE, AND THE FIVE LINKS ARE WHAT IS ON IT. The change model's whole
// claim is that these five are run in an order, and the figure this slide first shipped
// said that with four 12px ticks between five boxes — which at projection distance is five
// boxes. So the right-hand chain is a RAIL: one unbroken stroke down the frame's inner left
// edge, running the full height of the chain, with the five links tied off it and four
// arrowheads on it. It is a route with five stops on it rather than a list with four gaps
// in it, and the difference is legible from the back of the room without a word being read.
//
// IT IS NOT A LADDER AND CANNOT BECOME ONE. Every number below is shared by all five links
// — one left edge ({@link KOTTER_LINK_LEFT}), one width ({@link KOTTER_LINK_WIDTH}), one
// tie length ({@link KOTTER_TIE_LENGTH}), one tie offset ({@link kotterTieTop}) — and the
// rail itself is a SINGLE path, so there is no per-gap segment for an edit to lengthen,
// thicken or fade. `mandate-phases-gates` owns the ascending staircase in this deck and
// §6.6 forbids a second one; a rail is the opposite object, because every stop on it is
// the same distance from the line.

/**
 * How many links the change model is condensed to: 5, PINNED to `./content.ts`'s tuple.
 *
 * FIVE IS THE CONDENSATION AND NOT A LAYOUT CHOICE — the source model has eight steps and
 * `./content.ts` says on the attribution that the deck prints the condensed form. It is
 * stated here because {@link BODY_HEIGHT} is derived from it and nothing else in this
 * module could be.
 *
 * IT IS NOT AN ORDINAL RANGE AND MUST NOT BECOME ONE. Nothing in this module turns this
 * count into a printed number: there is no badge box, no numeral column and no `01`…`05`
 * anywhere on the stage. The count exists to divide a height, and that is all.
 */
export const KOTTER_LINK_COUNT: TamKotterCopy["kotter"]["links"]["length"] = 5;

/**
 * How tall both chains are: 290 — and on this stage it is the FIXED end of the arithmetic.
 *
 * IT IS CUT FROM THE FRAME, NOT ADDED UP FROM THE LINKS, and that inversion is what the
 * owner's two corrections cost. The frames now start 16px lower ({@link CONTENT_TOP}) and
 * the thesis sits on the floor ({@link THESIS_TOP}), which fixes the frame's height at
 * {@link PANEL_HEIGHT} and therefore fixes what is left for a chain once the header, the
 * closer and the padding are taken out. So this is a literal — the one in this module — and
 * the two gap constants ({@link KOTTER_CONNECT}, {@link TAM_CONNECT}) are what fall out of
 * it. Written the other way round, a taller node would have pushed the thesis through the
 * NavBar band instead of tightening the air between five boxes.
 *
 * BOTH CHAINS ARE CUT TO IT, and the equality is the last of the frame's unranked
 * guarantees: the two frames are the same width, the same height and the same top, and the
 * two CHAINS inside them end on the same pixel. A left chain that stopped 40px short would
 * leave the acceptance model looking like the smaller half of the argument, which is the
 * opposite of what the thesis says.
 *
 * IT IS ALSO THE LENGTH THE RUNNER TRAVELS. {@link kotterRailPath} is a straight line of
 * exactly this height, so `stroke-dasharray` sums and `stroke-dashoffset` distances in
 * `./components/tam-kotter.css` are this number and no other — see
 * {@link kotterStationOffset}.
 *
 * DIVISIBLE BY BOTH 4 AND 3 ONCE THE NODES ARE TAKEN OUT, which is not a coincidence and
 * is the reason this number is 290 rather than 288 or 296: `290 − 5·46 = 60` divides four
 * ways for the right chain, and `290 − (92 + 3·46) = 60` divides three ways for the left,
 * so every connector on the stage lands on a whole pixel. A test holds both.
 */
export const BODY_HEIGHT = 290;

/** Where both chains end: 524. */
export const BODY_BOTTOM = BODY_TOP + BODY_HEIGHT;

/**
 * The gap the RIGHT frame's rail crosses between two links: 15 — DERIVED, never typed.
 *
 * THE SAME FOR ALL FOUR, and that is the point: four equal intervals say "then, then,
 * then" and nothing about distance. Graded gaps would put a scale on the stage without a
 * single numeral being printed.
 *
 * `(BODY_HEIGHT − five nodes) / four gaps` is what keeps the two chains' floors together:
 * the right chain has more, shorter boxes than the left, so the two pay their differences
 * out in different amounts of air. See {@link BODY_HEIGHT} for why the height is the fixed
 * end of that arithmetic on this stage and both gaps are the free one — the reverse of what
 * this module did before the frames were re-cut.
 *
 * FIFTEEN LEAVES 9px OF RAIL ABOVE EVERY ARROWHEAD, which is the property that matters at
 * projection scale: a head that filled its gap would touch both links and read as a bracket
 * joining them, and a head centred in the gap would point at the middle of nothing. Sitting
 * low, with its tip on the next link's top edge, it points at the link.
 */
export const KOTTER_CONNECT =
  (BODY_HEIGHT - KOTTER_LINK_COUNT * NODE_HEIGHT) / (KOTTER_LINK_COUNT - 1);

/** How far apart two links sit: 61. Derived. Not exported — {@link kotterLinkTop} and
 *  {@link kotterStationOffset} carry it. */
const KOTTER_PITCH = NODE_HEIGHT + KOTTER_CONNECT;

/** The guard the right-frame placement functions share. Not exported. */
function assertLink(fn: string, index: number): void {
  if (!Number.isInteger(index) || index < 0 || index >= KOTTER_LINK_COUNT) {
    throw new Error(
      `${fn}: no link ${index} — the condensed chain has ${KOTTER_LINK_COUNT} ` +
        `(0…${KOTTER_LINK_COUNT - 1}). The tuple in ./content.ts refuses the extra ` +
        `entry first, and a sixth link would have to come out of BODY_HEIGHT's ${BODY_HEIGHT}px ` +
        `— leaving ${(BODY_HEIGHT - (KOTTER_LINK_COUNT + 1) * NODE_HEIGHT) / KOTTER_LINK_COUNT}px ` +
        `between links, which is under one arrowhead.`,
    );
  }
}

/**
 * Link `index`'s box top: 234, 295, 356, 417, 478.
 *
 * ONE FUNCTION, AND IT IS `i × pitch`. There is deliberately no per-link offset table for
 * an edit to reach into: the reference this slide was drawn from raises each of its five
 * steps above the one before it, and a single per-link `y` nudge is all it would take to
 * rebuild that staircase here. See the header.
 *
 * @throws on a sixth link — see {@link assertLink}.
 */
export function kotterLinkTop(index: number): number {
  assertLink("kotterLinkTop", index);
  return BODY_TOP + index * KOTTER_PITCH;
}

/**
 * The top of the ARROWHEAD below link `index`: 289, 350, 411, 472.
 *
 * ITS TIP LANDS ON THE TOP EDGE OF LINK `index + 1`. `kotterLinkTop(index + 1) −
 * ARROW_HEAD_HEIGHT` is the same number written the other way round, and it is written from
 * the gap here so that the head cannot drift off the rail if {@link KOTTER_CONNECT} is ever
 * re-cut.
 *
 * FOUR ARROWHEADS FOR FIVE LINKS, so the last link has none and the chain visibly ENDS
 * rather than trailing off — the room should be able to see that the model is finished, not
 * that the slide ran out of room. The RAIL ends on the same pixel the last link does
 * ({@link BODY_BOTTOM}) for the same reason: a rail that overshot its last stop, or a head
 * hanging below it, would say there is a sixth step the slide did not print.
 *
 * @throws on the last link, which has nothing under it, and on a link the chain does not
 *         have. Asking for the arrowhead below the last link is an authoring bug of
 *         exactly the kind this module throws on: it would point out of the bottom of the
 *         chain and into the frame's own closer.
 */
export function kotterArrowTop(index: number): number {
  assertLink("kotterArrowTop", index);
  if (index === KOTTER_LINK_COUNT - 1) {
    throw new Error(
      `kotterArrowTop: link ${index} is the last of ${KOTTER_LINK_COUNT} and has ` +
        `nothing under it — there are ${KOTTER_LINK_COUNT - 1} arrowheads, ` +
        `0…${KOTTER_LINK_COUNT - 2}. A head here would point out of the end of the ` +
        `chain and into the frame's own closer.`,
    );
  }
  return kotterLinkTop(index) + NODE_HEIGHT + KOTTER_CONNECT - ARROW_HEAD_HEIGHT;
}

/**
 * The vertical axis the right frame's whole chain runs on: 682.
 *
 * PLACED SO THE WIDEST MARK ON THE RAIL STARTS ON THE FRAME'S OWN INNER LEFT EDGE.
 * `panelInnerLeft(1) + ARROW_HEAD_HALF_WIDTH` is 676 + 6, which puts the left flank of
 * every arrowhead at exactly 676 — the line the frame's title, its attribution, its header
 * hairline and its closer all start on. The stroke itself is narrower and therefore inset
 * by 4, which is the correct way round: the heads are the marks a reader's eye lands on, so
 * THEY set the margin and the line hangs inside it.
 *
 * ON THE LEFT EDGE AND NOT ON {@link panelCentreX}, which is the asymmetry the whole figure
 * turns on. A sequence drawn down the middle of its frame, opposite a causal chain drawn
 * down the middle of its own, gives the room two centred columns and one reading: "two
 * lists". Down the edge, it gives the room a rail — and the left frame keeps the centre
 * line it needs for a fork that is symmetrical about it.
 */
export const KOTTER_RAIL_CENTRE_X = panelInnerLeft(KOTTER_PANEL) + ARROW_HEAD_HALF_WIDTH;

/**
 * How far each link stands off the rail: 20 — the frame's own inner padding.
 *
 * THE RAIL BECOMES A SECOND LEFT EDGE AND THE LINKS KEEP THE FRAME'S OWN RHYTHM. A frame's
 * content is inset 20 from its border; a link is inset 20 from the rail it hangs on, so the
 * one distance the eye already has from the header row is the one it gets again inside the
 * chain. It is also long enough to read as a TIE rather than as a nick in the box's border,
 * which is what anything under about 12px looks like at this weight.
 *
 * ONE LENGTH FOR ALL FIVE, and it is a constant rather than a function of the index for the
 * same reason {@link kotterLinkTop} is `i × pitch`: five ties of graded length would be a
 * scale drawn sideways, and this figure has already spent its whole argument refusing one.
 */
export const KOTTER_TIE_LENGTH = PANEL_PAD_X;

/** Where a tie starts: 684 — the rail's own right edge, so tie and rail meet with no seam
 *  and no overlap. */
export const KOTTER_TIE_LEFT = KOTTER_RAIL_CENTRE_X + RULE_THICKNESS / 2;

/**
 * Every link's left edge: 704 — the rail, plus the tie that carries the link to it.
 *
 * DERIVED, so the boxes cannot come to float free of the rail: move the rail or re-cut the
 * tie and all five links follow. There is no per-link term in it — see the section header.
 */
export const KOTTER_LINK_LEFT = KOTTER_TIE_LEFT + KOTTER_TIE_LENGTH;

/**
 * Every link's width: 508 — what is left of the frame's measure once the rail and the tie
 * are taken out of it.
 *
 * THE RIGHT CHAIN'S BOXES ARE NARROWER THAN THE LEFT CHAIN'S FULL-WIDTH NODES (508 against
 * 536) AND THAT IS NOT A RANKING. It is the width the rail costs, spent identically by all
 * five, and it is the visible sign that these five hang off something — a box that ran to
 * the frame's own edge would leave the rail standing in the margin beside it rather than
 * carrying it. Both frames are still one width, one height and one top edge; what differs
 * is the shape of the chain inside, which is the one difference this figure is making.
 *
 * NO COPY BUDGET MOVES WITH IT. `nodeTextWidth(508)` is 460, and every budget in this
 * module is cut against the NARROWEST measure on the stage — a belief node's 212 — so the
 * right chain's strings have twice the room their budget assumes.
 */
export const KOTTER_LINK_WIDTH = panelInnerLeft(KOTTER_PANEL) + PANEL_INNER_WIDTH - KOTTER_LINK_LEFT;

/**
 * The top of link `index`'s tie: 255, 316, 377, 438, 499.
 *
 * CENTRED ON THE LINK'S OWN BOX, which is the only vertical position that reads as an
 * attachment: a tie meeting a box near its top edge reads as a header rule and one near its
 * bottom as an underline. Derived from {@link NODE_HEIGHT} and {@link RULE_THICKNESS}, so a
 * taller node or a heavier stroke keeps the tie on the box's middle.
 *
 * @throws through {@link kotterLinkTop} on a link the chain does not have.
 */
export function kotterTieTop(index: number): number {
  return kotterLinkTop(index) + (NODE_HEIGHT - RULE_THICKNESS) / 2;
}

/** The rail, as one unbroken path: a straight 290px line at x=682. Authored TOP TO BOTTOM,
 *  which is what makes a negative `stroke-dashoffset` animation travel down it — the
 *  direction the sequence runs. */
export function kotterRailPath(): string {
  return `M ${KOTTER_RAIL_CENTRE_X} ${BODY_TOP} L ${KOTTER_RAIL_CENTRE_X} ${BODY_BOTTOM}`;
}

/**
 * Link `index`'s tie, as a path — from the rail out to the link's own left edge.
 *
 * @throws through {@link kotterTieTop} on a link the chain does not have.
 */
export function kotterTiePath(index: number): string {
  const y = kotterTieTop(index) + RULE_THICKNESS / 2;
  return `M ${KOTTER_TIE_LEFT} ${y} L ${KOTTER_LINK_LEFT} ${y}`;
}

/**
 * How far along the rail station `index` sits, as a fraction of the rail: 0.079, 0.290,
 * 0.500, 0.710, 0.921.
 *
 * THE ONE NUMBER THE MOTION IS SYNCHRONISED ON, and the reason it is a FRACTION rather
 * than a delay in milliseconds: the runner's period lives in
 * `./components/tam-kotter.css`, this module owns distance, and a geometry file that
 * exported "1217ms" would be holding a timing decision in a coordinate. The component
 * multiplies.
 *
 * `i × pitch` AGAIN, which is what keeps the arrival times as evenly spaced as the boxes.
 * Five stations at five equal fractions means every flash in a cycle is the same length of
 * time after the one before it — the runner cannot appear to hurry through one part of the
 * sequence and dwell on another, which would be a scale drawn in time (see the header).
 *
 * MEASURED TO THE TIE, not to the link's top edge: the tie is where the rail and the
 * station touch, so it is the point the runner visibly reaches.
 *
 * @throws through {@link kotterTieTop} on a link the chain does not have.
 */
export function kotterStationOffset(index: number): number {
  const y = kotterTieTop(index) + RULE_THICKNESS / 2;
  return (y - BODY_TOP) / BODY_HEIGHT;
}

// ───────────────────── the left frame: four tiers ─────────────────────

/** The tiers of the causal chain, by NAME — the four constructs the acceptance model
 *  names, in the order the model runs them. Named rather than compared as literals, so
 *  "the tier the two beliefs live on" is a word in the renderer and in this module. */
export const TAM_TIER = { SOURCE: 0, BELIEFS: 1, INTENTION: 2, USE: 3 } as const;

/** The gap between the two belief nodes: 16. Not exported — {@link tamNodeWidth} and
 *  {@link tamNodeLeft} carry it. */
const BELIEF_GAP = 16;

/**
 * How many nodes each tier holds: one, two, one, one.
 *
 * THE FAN IS THE LEFT FRAME'S WHOLE SHAPE. One source of belief, two beliefs it shapes,
 * one intention they meet in, one use that follows — and the second tier is the only
 * place on this stage where two nodes stand side by side. That split is what makes the
 * left chain visibly a CAUSAL model rather than a second ordered list: a reader who sees
 * two boxes fed by one and feeding one has read the model without a caption.
 *
 * Not exported: {@link tamNodeWidth} and {@link tamTierColumns} carry it, and a renderer
 * that could read the table could also index it out of range.
 */
const TAM_TIER_COLUMNS = [1, 2, 1, 1] as const;

/** How many nodes stand on the second tier: 2. Derived, so the two belief nodes and the
 *  fan that reaches them cannot come to disagree about how many there are. */
export const BELIEF_COLUMNS = TAM_TIER_COLUMNS[TAM_TIER.BELIEFS];

/**
 * How many named factors the top tier lists: 4, PINNED to `./content.ts`'s tuple.
 *
 * THEY ARE A SET AND NOT A SEQUENCE, which is why they are laid out as a 2×2 block and
 * not as a column: four items in one column under a chain of boxes would read as four
 * more links. {@link factorRowTop} and {@link factorColumnLeft} fill the block in reading
 * order and nothing about that order is a rank — `./content.ts` says so on the tuple.
 */
export const FACTOR_COUNT: TamKotterCopy["tam"]["source"]["factors"]["length"] = 4;

/** How many columns the factor block has: 2. A 2×2 block, so the four read as a set. Not
 *  exported — {@link factorColumnLeft} carries it. */
const FACTOR_COLUMNS = 2;

/** How many rows the factor block has: 2. Derived from the two above. Not exported. */
const FACTOR_ROWS = FACTOR_COUNT / FACTOR_COLUMNS;

/** A factor row's box: 16 — the caption register's own, so the block sets on the same
 *  rhythm as every caption on the stage. */
export const FACTOR_HEIGHT = NODE_CAPTION_HEIGHT;

/** The air between the two factor rows: 4. Not exported. */
const FACTOR_ROW_GAP = 4;

/** The air between the top tier's caption and the factor block under it: 10 — wider than
 *  the 3 that binds a label to its caption, so the four factors read as a list the node
 *  holds rather than as a third line of the node's own copy. Not exported. */
const CAPTION_TO_FACTORS = 10;

/**
 * The top tier's height: 92 — the ONE node on this stage that is not
 * {@link NODE_HEIGHT}.
 *
 * IT IS TALLER BECAUSE IT SAYS MORE, AND THAT IS THE ONLY REASON A BOX ON THIS STAGE IS
 * EVER A DIFFERENT SIZE FROM ANOTHER. It carries the same label, caption and glyph as every
 * other node plus the four named factors, and the extra height is exactly those two rows
 * and the air over them — derived, so it cannot drift into being a size that ranks it.
 * Nothing else about it differs: same left edge, same width, same border, same tier, same
 * 20px mark on the same label row (see {@link glyphTop}).
 */
export const SOURCE_NODE_HEIGHT =
  NODE_HEIGHT + CAPTION_TO_FACTORS + FACTOR_ROWS * FACTOR_HEIGHT + (FACTOR_ROWS - 1) * FACTOR_ROW_GAP;

/** Every tier's height, in order: 92, 46, 46, 46. Not exported — {@link tamTierHeight}
 *  is. */
const TAM_TIER_HEIGHTS = [SOURCE_NODE_HEIGHT, NODE_HEIGHT, NODE_HEIGHT, NODE_HEIGHT] as const;

/** How many tiers the causal chain has: 4. Derived from the heights table rather than
 *  typed, so a fifth tier grows every number below it. */
export const TAM_TIER_COUNT = TAM_TIER_HEIGHTS.length;

/** What all four tiers occupy before their connectors: 230. Not exported —
 *  {@link TAM_CONNECT} is the only thing that needs it. */
const TAM_NODES_HEIGHT = TAM_TIER_HEIGHTS.reduce((sum, height) => sum + height, 0);

/**
 * The gap each of the left chain's three connectors spans: 20 — DERIVED, never typed.
 *
 * `(BODY_HEIGHT − the four tiers) / (tiers − 1)` is what makes the two chains END ON ONE
 * PIXEL: the left chain has fewer, taller boxes than the right, so it pays the difference
 * out in air between them. A literal 20 would hold today and would silently leave the two
 * chains ragged the first time either side gained a node — and a ragged pair of chains is
 * the one way this stage could accidentally rank one model over the other, since the
 * longer chain would look like the fuller argument.
 *
 * IT IS ALSO WHY THE LEFT CONNECTORS ARE LONGER THAN THE RIGHT ONES (20 against
 * {@link KOTTER_CONNECT}'s 15), which is not an inconsistency: within each chain every
 * connector is the same length as every other, which is the property that stops either
 * chain becoming a scale. Across the two chains they differ because the two chains have
 * different numbers of boxes to hang in the same height.
 */
export const TAM_CONNECT = (BODY_HEIGHT - TAM_NODES_HEIGHT) / (TAM_TIER_COUNT - 1);

/** The guard every left-frame placement function shares. Not exported. */
function assertTier(fn: string, tier: number): void {
  if (!Number.isInteger(tier) || tier < 0 || tier >= TAM_TIER_COUNT) {
    throw new Error(
      `${fn}: no tier ${tier} — the causal chain has ${TAM_TIER_COUNT} ` +
        `(0…${TAM_TIER_COUNT - 1}): what shapes belief, the two beliefs, the ` +
        `intention they meet in, and the use that follows. A fifth would make ` +
        `TAM_CONNECT ${(BODY_HEIGHT - TAM_NODES_HEIGHT - NODE_HEIGHT) / TAM_TIER_COUNT}px ` +
        `and the two chains would stop ending on the same line.`,
    );
  }
}

/**
 * Tier `tier`'s height: 92, 46, 46, 46.
 *
 * @throws on a tier the chain does not have — see {@link assertTier}.
 */
export function tamTierHeight(tier: number): number {
  assertTier("tamTierHeight", tier);
  return TAM_TIER_HEIGHTS[tier];
}

/**
 * How many nodes stand on tier `tier`: 1, 2, 1, 1.
 *
 * @throws on a tier the chain does not have.
 */
export function tamTierColumns(tier: number): number {
  assertTier("tamTierColumns", tier);
  return TAM_TIER_COLUMNS[tier];
}

/**
 * Tier `tier`'s top edge: 234, 346, 412, 478.
 *
 * CUMULATIVE OVER THE HEIGHTS TABLE rather than `i × pitch`, because this chain's tiers
 * are not all the same height — the top one carries four named factors. That is also the
 * reason this function and {@link kotterLinkTop} are two functions and not one with a
 * flag: the right-hand chain's placement being `i × pitch` is a GUARANTEE about it (no
 * link can be nudged), and folding the two would make that guarantee conditional.
 *
 * @throws on a tier the chain does not have.
 */
export function tamTierTop(tier: number): number {
  assertTier("tamTierTop", tier);
  let top = BODY_TOP;
  for (let i = 0; i < tier; i += 1) top += TAM_TIER_HEIGHTS[i] + TAM_CONNECT;
  return top;
}

/**
 * The top of the connector BELOW tier `tier`: 326, 392, 458.
 *
 * @throws on the last tier, which has nothing under it, and on a tier the chain does not
 *         have — the same call {@link kotterArrowTop} makes and for the same reason.
 */
export function tamConnectorTop(tier: number): number {
  assertTier("tamConnectorTop", tier);
  if (tier === TAM_TIER_COUNT - 1) {
    throw new Error(
      `tamConnectorTop: tier ${tier} is the last of ${TAM_TIER_COUNT} and has nothing ` +
        `under it — there are ${TAM_TIER_COUNT - 1} connectors, ` +
        `0…${TAM_TIER_COUNT - 2}. A path here would run from the end of the chain into ` +
        `the frame's own closer.`,
    );
  }
  return tamTierTop(tier) + TAM_TIER_HEIGHTS[tier];
}

/**
 * The top of the ARROWHEAD that ends the connector below tier `tier`: 340, 406, 472.
 *
 * ONE FUNCTION FOR ALL FOUR OF THE LEFT CHAIN'S HEADS — the fork's two arms share tier 0's
 * value, because both point into the same tier and this chain's two beliefs arrive on one
 * line. Its tip lands on {@link tamTierTop}`(tier + 1)`, which is the rule every head on
 * this stage keeps.
 *
 * @throws on the last tier, which has nothing under it, and on a tier the chain does not
 *         have — the same call {@link tamConnectorTop} makes and for the same reason.
 */
export function tamArrowTop(tier: number): number {
  assertTier("tamArrowTop", tier);
  if (tier === TAM_TIER_COUNT - 1) {
    throw new Error(
      `tamArrowTop: tier ${tier} is the last of ${TAM_TIER_COUNT} and has nothing under ` +
        `it — there are ${TAM_TIER_COUNT - 1} arrowheads, 0…${TAM_TIER_COUNT - 2}. A head ` +
        `here would point out of the end of the chain and into the frame's own closer.`,
    );
  }
  return tamTierTop(tier) + TAM_TIER_HEIGHTS[tier] + TAM_CONNECT - ARROW_HEAD_HEIGHT;
}

/**
 * The width of one node on tier `tier`: 536 everywhere except the belief tier, where two
 * nodes share the measure and get 260 each.
 *
 * DERIVED FROM THE COLUMN COUNT, so the two belief nodes are the same width as each other
 * by construction. The model does not rank perceived usefulness over perceived ease of
 * use, and a stage that drew one of them wider would be adding a claim the model does not
 * make.
 *
 * @throws through {@link tamTierColumns} on a tier the chain does not have.
 */
export function tamNodeWidth(tier: number): number {
  const columns = tamTierColumns(tier);
  return (PANEL_INNER_WIDTH - (columns - 1) * BELIEF_GAP) / columns;
}

/**
 * The left edge of node `column` on tier `tier`, in frame `panel`: 68 for every
 * full-width node, and 68 / 344 for the two belief nodes.
 *
 * @throws on a tier the chain does not have, on a column the tier does not have, or on a
 *         frame this stage does not have.
 */
export function tamNodeLeft(panel: number, tier: number, column: number): number {
  const columns = tamTierColumns(tier);
  if (!Number.isInteger(column) || column < 0 || column >= columns) {
    throw new Error(
      `tamNodeLeft: tier ${tier} holds ${columns} node(s) (0…${columns - 1}), not ` +
        `${column}. The causal chain fans exactly once, on tier ${TAM_TIER.BELIEFS}.`,
    );
  }
  return panelInnerLeft(panel) + column * (tamNodeWidth(tier) + BELIEF_GAP);
}

/**
 * The vertical centre line of node `column` on tier `tier`, in frame `panel`: 336 for
 * every full-width node, and 198 / 474 for the two belief nodes.
 *
 * THE FORK AND THE MERGE ARE BUILT ENTIRELY OUT OF THIS. The two fork arms reach these two
 * lines, the two stems under the beliefs rise from them, and the joiner that returns to the
 * intention node spans them — so the whole fan moves with the boxes and cannot come to
 * point between them.
 *
 * @throws through {@link tamNodeLeft} on a tier, column or frame that does not exist.
 */
export function tamNodeCentreX(panel: number, tier: number, column: number): number {
  return tamNodeLeft(panel, tier, column) + tamNodeWidth(tier) / 2;
}

/**
 * How far a fan's stem runs before the horizontal mark that spreads or joins it: 10 —
 * DERIVED as what is left of {@link TAM_CONNECT} once the horizontal mark's own 4px and one
 * arrowhead's height are taken out of it.
 *
 * THE SUBTRACTION IS THE GUARANTEE THAT A FORK'S ARM ENDS WHERE ITS HEAD BEGINS. Below the
 * spreader there is exactly {@link ARROW_HEAD_HEIGHT} of room, so each of the fork's two
 * arms comes off the bar and stops on the arrowhead's base with no stub of stroke poking
 * through the triangle — the defect that is invisible at 1280×720 in a screenshot and
 * obvious on a wall. Re-cut {@link TAM_CONNECT} and the STEM grows; the head stays attached
 * to the bar.
 */
export const FAN_STEM = TAM_CONNECT - RULE_THICKNESS - ARROW_HEAD_HEIGHT;

/**
 * The y a fan's horizontal mark runs along, below tier `tier`: 338, 404.
 *
 * A STROKE IS CENTRED ON ITS COORDINATE, which is the one thing that changed when the
 * twelve connector boxes became paths: a 4px `<div>` was placed by its TOP edge and a 4px
 * stroke is placed by its MIDDLE, so the half-thickness that used to be subtracted at five
 * call sites is added at one, here. The mark still sits halfway down the gap — 10px of
 * stem above it, 6px of arrowhead below.
 *
 * @throws through {@link tamConnectorTop} on the last tier or a tier the chain does not
 *         have.
 */
export function fanBarY(tier: number): number {
  return tamConnectorTop(tier) + FAN_STEM + RULE_THICKNESS / 2;
}

/**
 * The width of the horizontal mark that spans the two belief columns: 280.
 *
 * MEASURED BETWEEN THE CENTRES rather than added up from a width and a gap, so it is the
 * same number the fork's two arms travel to and cannot be derived a second, disagreeing
 * way. It is frame-independent — the two frames are identical, so the span is too.
 *
 * AT 280px ACROSS AND 4px THICK IT IS THE LARGEST MARK ON THE STAGE THAT IS NOT A BOX, and
 * that is the point of it: this one bar, with a triangle hanging off each end, is the
 * entire visual claim that the acceptance model FORKS. The room does not have to read
 * `PERCEIVED USEFULNESS` to see that one thing has become two.
 *
 * Exported for the copy budgets and for a test to hold; the two path builders below reach
 * the same two centre lines through {@link tamNodeCentreX} rather than through this.
 */
export const FAN_SPAN_WIDTH =
  tamNodeCentreX(TAM_PANEL, TAM_TIER.BELIEFS, BELIEF_COLUMNS - 1) -
  tamNodeCentreX(TAM_PANEL, TAM_TIER.BELIEFS, 0) +
  RULE_THICKNESS;

/**
 * ONE ARM OF THE FORK, as a path: out of the source node's bottom edge, down the frame's
 * centre line, across to belief `column`, and down onto that belief's arrowhead.
 *
 * TWO PATHS AND NOT THREE BOXES, AND BOTH OF THEM START AT THE SOURCE. The two arms
 * overlap exactly on the stem, which is invisible at one stroke and one tier and is what
 * makes each arm a COMPLETE route from cause to effect — so the draw-in animation grows
 * each arm out of the node above it, and the current flows the whole way down without a
 * seam or a junction to cross. Three boxes (stem, span, drop) could be given neither
 * property: a shared stem cannot be drawn twice in two directions, and a current would
 * have to be handed from one element to another mid-journey.
 *
 * @throws through {@link tamNodeCentreX} on a column the belief tier does not have, or on a
 *         frame this stage does not have.
 */
export function tamForkPath(panel: number, column: number): string {
  const stemX = panelCentreX(panel);
  const armX = tamNodeCentreX(panel, TAM_TIER.BELIEFS, column);
  const barY = fanBarY(TAM_TIER.SOURCE);
  return (
    `M ${stemX} ${tamConnectorTop(TAM_TIER.SOURCE)} L ${stemX} ${barY} ` +
    `L ${armX} ${barY} L ${armX} ${tamArrowTop(TAM_TIER.SOURCE)}`
  );
}

/**
 * ONE ARM OF THE MERGE, as a path: out of belief `column`'s bottom edge, down, across to
 * the frame's centre line, and onto the intention node's arrowhead.
 *
 * THE MIRROR OF {@link tamForkPath}, and the two arms overlap on the DROP rather than on
 * the stem. Both beliefs feed one intention, which is the model's claim and the reason the
 * left chain is a fan rather than a second column — and it is the second half of what the
 * room sees before it reads anything: one becomes two, two become one.
 *
 * @throws through {@link tamNodeCentreX} on a column the belief tier does not have, or on a
 *         frame this stage does not have.
 */
export function tamMergePath(panel: number, column: number): string {
  const armX = tamNodeCentreX(panel, TAM_TIER.BELIEFS, column);
  const dropX = panelCentreX(panel);
  const barY = fanBarY(TAM_TIER.BELIEFS);
  return (
    `M ${armX} ${tamConnectorTop(TAM_TIER.BELIEFS)} L ${armX} ${barY} ` +
    `L ${dropX} ${barY} L ${dropX} ${tamArrowTop(TAM_TIER.BELIEFS)}`
  );
}

/**
 * THE LAST LINK OF THE CAUSAL CHAIN, as a path: the drop from the intention to the use it
 * becomes.
 *
 * THE ONLY CONNECTOR ON THIS STAGE THAT NEITHER SPLITS NOR JOINS, and the only one that is
 * a plain line. It stops exactly where its arrowhead starts, which is the rule every arrowed
 * connector here keeps: a 4px stroke continuing to the tip of a 12px head pokes out of both
 * flanks over the head's last two pixels and paints a small cross at the point of the arrow.
 *
 * @throws through {@link panelCentreX} on a frame this stage does not have.
 */
export function tamStraightPath(panel: number): string {
  const x = panelCentreX(panel);
  return `M ${x} ${tamConnectorTop(TAM_TIER.INTENTION)} L ${x} ${tamArrowTop(TAM_TIER.INTENTION)}`;
}

// ───────────────────── the four named factors ─────────────────────

/** The gap between the two factor columns: 16 — the belief tier's own gap, so the two
 *  splits on this side of the stage are one measurement. Not exported. */
const FACTOR_COLUMN_GAP = BELIEF_GAP;

/** Where the factor block starts: 106 — the top tier node's own text left edge, so the 2×2
 *  block sets under the caption rather than under the mark beside it. */
export const FACTOR_BLOCK_LEFT = nodeTextLeft(tamNodeLeft(TAM_PANEL, TAM_TIER.SOURCE, 0));

/** The measure the factor block gets: 488 — the top tier node's own text measure, which is
 *  to say the glyph slot comes out of the factor block too. Not exported; the column width
 *  derived from it is. */
const FACTOR_BLOCK_WIDTH = nodeTextWidth(tamNodeWidth(TAM_TIER.SOURCE));

/** One factor column's width: 236. */
export const FACTOR_COLUMN_WIDTH =
  (FACTOR_BLOCK_WIDTH - (FACTOR_COLUMNS - 1) * FACTOR_COLUMN_GAP) / FACTOR_COLUMNS;

/** Where the factor block's first row sits: 284. Not exported — {@link factorRowTop}
 *  carries it. */
const FACTOR_BLOCK_TOP =
  nodeCaptionTop(tamTierTop(TAM_TIER.SOURCE)) + NODE_CAPTION_HEIGHT + CAPTION_TO_FACTORS;

/** The guard the two factor placement functions share. Not exported. */
function assertFactor(fn: string, index: number): void {
  if (!Number.isInteger(index) || index < 0 || index >= FACTOR_COUNT) {
    throw new Error(
      `${fn}: no factor ${index} — the top tier names ${FACTOR_COUNT} ` +
        `(0…${FACTOR_COUNT - 1}), in a ${FACTOR_COLUMNS}×${FACTOR_ROWS} block. The ` +
        `tuple in ./content.ts refuses the extra entry first, and a fifth would grow ` +
        `SOURCE_NODE_HEIGHT and break the two chains' shared floor.`,
    );
  }
}

/**
 * Factor `index`'s row top: 284, 284, 304, 304.
 *
 * FILLED IN READING ORDER — two across, then two more. NOT DOWN THE COLUMNS, because a
 * reader scanning a 2×2 block reads across first, and a block filled down would put the
 * second item under the first and read as a two-item list beside another two-item list.
 *
 * @throws on a fifth factor — see {@link assertFactor}.
 */
export function factorRowTop(index: number): number {
  assertFactor("factorRowTop", index);
  return FACTOR_BLOCK_TOP + Math.floor(index / FACTOR_COLUMNS) * (FACTOR_HEIGHT + FACTOR_ROW_GAP);
}

/**
 * Factor `index`'s column left: 106, 358, 106, 358.
 *
 * @throws on a fifth factor.
 */
export function factorColumnLeft(index: number): number {
  assertFactor("factorColumnLeft", index);
  return FACTOR_BLOCK_LEFT + (index % FACTOR_COLUMNS) * (FACTOR_COLUMN_WIDTH + FACTOR_COLUMN_GAP);
}

/**
 * The square beside each factor: 4×4.
 *
 * A MARK AND NOT A BULLET GLYPH, for the reason every graphic on this stage is drawn rather
 * than typed: a `·` or a `•` in the copy would put a character into `./content.ts` that
 * means "this is an item", which is a layout decision living in the words. It is also
 * DELIBERATELY NOT A NUMERAL and deliberately not one of the ten animated marks — a marked
 * list is a set, a numbered list is an order, and four moving glyphs inside a node that
 * already carries one would be four things competing with the node they belong to.
 */
export const FACTOR_MARKER_SIZE = 4;

/** The air between a factor's mark and its text: 8. Not exported. */
const FACTOR_MARKER_GAP = 8;

/** Where a factor's text starts, given its column's left edge: 118 or 370. */
export function factorTextLeft(columnLeft: number): number {
  return columnLeft + FACTOR_MARKER_SIZE + FACTOR_MARKER_GAP;
}

/** The measure a factor's text gets: 224 — and the budget below is cut against it. */
export const FACTOR_TEXT_WIDTH = FACTOR_COLUMN_WIDTH - FACTOR_MARKER_SIZE - FACTOR_MARKER_GAP;

/** A factor mark's top, given its row's top: centred on the text's own line box, which
 *  is the only vertical position that does not read as a dropped bullet. */
export function factorMarkerTop(rowTop: number): number {
  return rowTop + (FACTOR_HEIGHT - FACTOR_MARKER_SIZE) / 2;
}

// ───────────────────── each frame's closer ─────────────────────

/** The air between the end of a chain and the closer under it: 14 — wider than anything
 *  inside the chain, so the closer reads as a verdict on the frame rather than as a fifth
 *  or sixth link. Not exported. */
const BODY_TO_CLOSER = 14;

/** A frame closer's shelf: 538. ONE VALUE FOR BOTH FRAMES — the two verdicts sit on one
 *  line, so neither model appears to conclude before the other. */
export const FRAME_CLOSER_TOP = BODY_BOTTOM + BODY_TO_CLOSER;

/** A frame closer's box: 22, cut for ONE line of 15px serif — a 20.25 line box painting
 *  ≈20.4, so it carries ≈1.6 spare. See {@link FRAME_CLOSER_BUDGET_CHARS}. */
export const FRAME_CLOSER_HEIGHT = 22;

/** Where a frame's inner content ends: 560. Not exported. */
const PANEL_INNER_BOTTOM = FRAME_CLOSER_TOP + FRAME_CLOSER_HEIGHT;

/** Each frame's height: 420 — DERIVED from everything inside it, so a taller register or
 *  a longer chain grows the box rather than overflowing it. Both frames, one value. */
export const PANEL_HEIGHT = PANEL_INNER_BOTTOM + PANEL_PAD_Y - CONTENT_TOP;

/** Where both frames end: 576. */
export const PANEL_BOTTOM = CONTENT_TOP + PANEL_HEIGHT;

// ───────────────────── the thesis ─────────────────────

/**
 * The air between the frames and the thesis under them: 20.
 *
 * BIGGER THAN ANY GAP INSIDE A FRAME AND SMALLER THAN THE 24 IT REPLACES. It is the only
 * sentence on this stage that belongs to neither frame, so it is set outside both and needs
 * to read as a separate object; what it does NOT need is to float in the middle of the
 * space between the figure and the floor, which is what 24px of air above and 28 below
 * produced. Four pixels moved from above the line to below it, and the line went down onto
 * the floor with them. Not exported.
 */
const PANELS_TO_THESIS = 20;

/**
 * The thesis's shelf: 596 — full width, and as low as the stage allows.
 *
 * DERIVED FROM THE FRAMES ABOVE IT AND CHECKED AGAINST THE BAND BELOW IT, which is the
 * order that matters: the frames are placed first, the thesis follows them, and
 * {@link NAV_ZONE_CLEARANCE} is the assertion that the result still clears the NavBar. The
 * alternative — pinning the line to `NAV_ZONE_TOP − height − 12` and letting the gap above
 * it fall out — reads the same today and fails differently: a frame that grew would close
 * the gap silently instead of pushing a number below zero where a test can see it.
 *
 * "EXACTLY ABOVE THE NAVIGATION BAR" IS THE OWNER'S INSTRUCTION AND 12px IS WHAT IT MEANS
 * HERE. Zero would put the line's descenders inside a band the presenter's own pointer
 * makes a toolbar fade up over; 12 is the leader tree's binding gap, and it is the same
 * number this module uses to clear the headline at the top of the stage.
 */
export const THESIS_TOP = PANEL_BOTTOM + PANELS_TO_THESIS;

/** The thesis's left edge and measure: 48 and 1184 — the stage's own. */
export const THESIS_LEFT = SIDE_MARGIN;
export const THESIS_WIDTH = CONTENT_WIDTH;

/**
 * The thesis's size: 18px serif — DOWN FROM 22 (owner call).
 *
 * 22 WAS COMPETING WITH THE HEADLINE. The stage carries a 40px display headline at the top
 * and a 22px serif verdict 56px off the floor, and at that size the two read as two
 * headlines with a figure between them — the room's eye went to the bottom line while the
 * presenter was still opening the left frame. 18 keeps the line unambiguously the
 * brightest, largest thing under the figure — the two frame closers are 15 — while
 * reading as a CONCLUSION rather than as a second title.
 *
 * IT IS ALSO WHAT PAYS FOR THE FRAME HEIGHT. Four points off the size and one point off the
 * line box gives back 8px, the move onto the floor gives back another 16, and both chains
 * are 12px taller than they were — see {@link BODY_HEIGHT}.
 *
 * EXPORTED RATHER THAN WRITTEN IN THE COMPONENT, unlike every other type size on this
 * stage, because this one is load-bearing arithmetic: {@link THESIS_HEIGHT} is cut from it
 * and {@link NAV_ZONE_CLEARANCE} is cut from that. A size that lived only in the renderer
 * could be raised back to 22 without the line box following it, and the line would paint
 * into the NavBar band with nothing to report it.
 */
export const THESIS_FONT_SIZE = 18;

/** The thesis's box: 24, cut for ONE line of 18px serif on 1.3 — a 23.40 line box painting
 *  ≈24.6 at the deck's serif metrics, so the box carries the ascender and the descender
 *  with nothing to spare below it. See {@link THESIS_BUDGET_CHARS}. */
export const THESIS_HEIGHT = 24;

/** Where the stage's lowest box ends: 620. Not exported — the clearance below carries its
 *  whole content. */
const THESIS_BOTTOM = THESIS_TOP + THESIS_HEIGHT;

/**
 * What is left between the thesis and the NavBar's hover band: 12px.
 *
 * DERIVED FROM BOTH ENDS, so an edit anywhere above — a taller register, a sixth link, a
 * fifth tier, a fifth factor — moves it, and the only thing worth asserting about it is
 * that it stays positive. It is the one number that reports the whole vertical budget, and
 * on this stage it is also the one that says the owner's "exactly above the navigation bar"
 * was honoured: 12 and not 28.
 */
export const NAV_ZONE_CLEARANCE = NAV_ZONE_TOP - THESIS_BOTTOM;

// ───────────────────── the copy budgets ─────────────────────
//
// jsdom computes no text, so nothing measures these at render time. Each is a measure
// divided by the per-character advance the browser actually reported for this slide's own
// longest string in that register, taken down for slack, and held over the COPY where an
// author can act on it rather than discovered on a projector. Same construction, and the
// same admission, as `GATE_BUDGET_CHARS` in `leader-mandate/phases-gates-geometry.ts`.

/**
 * How long the headline may be: 62 characters.
 *
 * `.slide-headline-row` gives 1184px and the shipped headline measures 799.08px with
 * Instrument Serif and **980.42px with the Georgia fallback**, which is the face an
 * auditorium without the Google Fonts CDN renders and the one this budget is cut against:
 * 1184 over 17.83px per character gives ≈66, taken down to 62. The shipped line is 55
 * characters — 83% of the measure on the wide face, one line under both.
 *
 * IT IS ENFORCED ON THE COPY AND NOT LEFT TO THE BROWSER, because the failure is not an
 * overflow a check would see: the row simply gets taller, and a second headline line lands
 * at y = 122…164 — which used to paint straight through the frames' top border and now
 * paints into the 34px of air {@link HEADLINE_CLEARANCE} bought. That is a real improvement
 * and it is not a licence: at 164 the second line is 8px off the frames.
 */
export const HEADLINE_BUDGET_CHARS = 62;

/**
 * How long the thesis may be: 126 characters.
 *
 * {@link THESIS_WIDTH} (1184px) over ≈8.89px per character — 18px Source Serif 4, the
 * 22px measurement (10.86px/char, the wider of the two faces) scaled by 18/22 — gives
 * ≈133, taken down to 126. The shipped line is 73 characters at ≈648.69px, which is 55% of
 * the measure.
 *
 * THE FAILURE MODE MOVED WITH THE LINE AND GOT SHARPER. A second line used to put the
 * stage's lowest pixel at 636 against a floor of 632; it now puts it at 644, which is 12px
 * INSIDE the NavBar's hover band and directly under the bar's own buttons. The budget grew
 * by 22 characters and the consequence of breaking it grew too.
 */
export const THESIS_BUDGET_CHARS = 126;

/**
 * How long a frame's closer may be: 78 characters.
 *
 * {@link PANEL_INNER_WIDTH} (536px) over ≈6.55px per character — 15px Source Serif 4 on
 * the GEORGIA fallback, the wider face here, measured on the longer of the two shipped
 * closers (69 characters, 452.16px) — gives ≈81, taken down to 78. The failure mode is a
 * second line, which {@link FRAME_CLOSER_HEIGHT} is not cut for and which would push the
 * closer into the frame's own bottom padding.
 */
export const FRAME_CLOSER_BUDGET_CHARS = 78;

/**
 * How long a frame's title may be: 52 characters.
 *
 * {@link PANEL_INNER_WIDTH} (536px) over 9.60px per character — 12px mono at 0.20em
 * tracking, the same on the webfont and on every monospace fallback the deck can land on,
 * all of which are 0.6em faces — gives ≈55, taken down to 52. The longest shipped title
 * is 27 characters at 259.23px, which is 48% of the measure: a loose budget, written down
 * anyway because a title that grew into a sentence would be the first sign a frame had
 * started explaining itself instead of naming itself.
 */
export const FRAME_TITLE_BUDGET_CHARS = 52;

/**
 * How long an attribution may be: 78 characters.
 *
 * {@link PANEL_INNER_WIDTH} (536px) over ≈6.59px per character — 12.5px Inter, the wider
 * face here, measured on the longer of the two shipped attributions (64 characters,
 * 388.98px) — gives ≈81, taken down to 78.
 *
 * THIS IS THE ONE BUDGET THAT MAY NOT BE MET BY CUTTING THE STRING. The attribution is
 * the slide's whole claim to being something other than the presenter's opinion, and both
 * of them name a model, an author and a year. A budget breach here is a signal to move
 * the register, not to drop the year.
 */
export const ATTRIBUTION_BUDGET_CHARS = 78;

/**
 * How long a node's label may be: 21 characters — DOWN FROM 26, and the glyph and the ordinal
 * took the five between them.
 *
 * Cut against the NARROWEST label measure on the stage, which is a NUMBERED BELIEF CARD's
 * {@link nodeLabelWidth} of 182px — not the 212px a caption gets there and not the 458px a
 * full-width card's label gets — over 8.36px per character at 11px mono, 0.16em tracking,
 * which gives ≈21.7 and is taken down to 21.
 *
 * IT IS THE ONE BUDGET ON THIS STAGE WITH NO ROUNDING LEFT IN IT. The longest shipped label
 * is `PERCEIVED EASE OF USE` — 21 characters, 175.59px on both faces — so the budget is the
 * arithmetic and the shipped string is at it, with 6.4px of measure spare. That is deliberate
 * and it is the cost of numbering a 260px card: the two levers for buying more are
 * {@link INDEX_WIDTH} (already down from 26 to 22) and `BELIEF_GAP`, and the next label that
 * needs a 22nd character has to come out of one of them rather than out of the box.
 *
 * ONE BUDGET FOR ALL TEN LABELS, and deliberately the tight one: both chains print the same
 * register, and a label that fits in the right frame but wraps in a belief card is exactly the
 * kind of asymmetry that would make the two frames stop looking like a pair. The failure mode
 * is silent — an 11px uppercase label wrapping inside a 15px box grows a sliver of type no
 * bounding check reports and every projector shows.
 */
export const NODE_LABEL_BUDGET_CHARS = 21;

/**
 * How long a node's caption may be: 37 characters — DOWN FROM 40, and the glyph took the
 * three.
 *
 * The same narrowest measure (212px) over ≈5.59px per character at 12px Inter — the wider
 * of the two faces here, measured on the longest shipped caption (35 characters, 195.09px)
 * — gives ≈37, and it is NOT taken down: the longest shipped caption is 35 characters, so
 * the budget is the honest arithmetic with two characters of slack rather than a round
 * number under it.
 *
 * THIS IS THE TIGHTEST BUDGET ON THE STAGE AND THE GLYPH SLOT IS WHY. 195.80px of caption
 * in 212px of measure is 16px of room, which is what {@link NODE_PAD_X} was cut from 12 to
 * 10 to buy back. A caption that wraps pushes into the node's own bottom padding and then
 * into the connector under it — and on the belief tier the connector under it is the merge,
 * so a wrapped caption paints over the one mark that says two beliefs become one intention.
 */
export const NODE_CAPTION_BUDGET_CHARS = 37;

/**
 * How long a named factor may be: 35 characters.
 *
 * {@link FACTOR_TEXT_WIDTH} (224px) over ≈6.26px per character at 12px Inter — measured
 * on the shipped factor with the widest per-character advance rather than the longest
 * one, which is the honest way to cut a budget over four short strings — gives ≈35, and
 * the longest shipped factor is 24 characters at 135.64px.
 */
export const FACTOR_BUDGET_CHARS = 35;
