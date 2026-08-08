// Two framed chains side by side, and the one line under both of them — as numbers,
// for a 1280×720 stage.
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
//   · THE RIGHT CHAIN IS A SPINE DOWN ONE EDGE, and it visibly runs straight through. One
//     unbroken rule on one axis ({@link KOTTER_SPINE_CENTRE_X}), as tall as the whole chain
//     ({@link BODY_HEIGHT}), carries the sequence; the five links hang off it on five equal
//     ties ({@link KOTTER_TIE_LENGTH}); and four arrowheads on that same axis
//     ({@link kotterArrowTop}) say "then" four times.
//
// A viewer who cannot read either frame can still see that the left figure branches and
// the right figure does not, and that is the reading the two models actually have.
//
// ═══ EVERY CONNECTOR CARRIES A DIRECTION, AND IT CARRIES IT WITH AN ARROWHEAD. Both
// chains are claims about what CAUSES or FOLLOWS what, and a rule with two identical ends
// states an adjacency instead. Eight heads are drawn — four on the left chain, four on the
// right — all one size ({@link ARROW_HEAD_WIDTH} × {@link ARROW_HEAD_HEIGHT}), all pointing
// down the page, and every one of them with its TIP on the top edge of the thing it points
// at. See {@link RULE_THICKNESS} for why the rules under them are 4px and not the 2px this
// figure shipped with, and for why an arrowhead here costs no `<svg>`.
//
// ═══ THE NO-THIRD-LADDER GUARANTEE LIVES IN THIS FILE, WHICH IS WHY THE FIVE LINKS OF
// THE RIGHT-HAND CHAIN ARE PLACED HERE AND NOT COUNTED ANYWHERE THE COMPONENT CAN SEE.
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
//     by POSITION (top to bottom), by the SPINE the five hang off, and by the four
//     arrowheads on it ({@link kotterArrowTop}) — which is exactly how the LEFT frame
//     carries its own causal order. Two chains, one mechanism.
//   · THE SPINE IS ONE RULE AND NOT FIVE. {@link KOTTER_SPINE_CENTRE_X} carries a single
//     unbroken 278px rule from the top of the first link to the bottom of the last, and
//     the five links are TIED to it by five ties of one length ({@link KOTTER_TIE_LENGTH})
//     at five identical heights ({@link kotterTieTop}). A continuous line cannot rank the
//     things hung off it: there is no first segment to make heavier and no last segment to
//     let fade, because there are no segments. Four rules of graded lengths in four gaps
//     would have been a scale with four intervals on it; one rule with four equal
//     arrowheads on it is a route being followed.
//   · THE FOUR ARROWHEADS ARE ONE SIZE AND SIT ON ONE AXIS, tips on the top edge of the
//     link each one points at. They say "then", four times, in one voice. They are the
//     ONLY thing on the right-hand chain that distinguishes one gap from another, and
//     they distinguish them by POSITION alone.
//
// ═══ AND THE LEFT FRAME IS HELD TO THE SAME RULE, though its shape is a fan rather than
// a spine. Its four tiers are NOT four rungs: {@link TAM_TIER_HEIGHTS} gives the three
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
// ═══ THE FIGURE MOUNTS NO `<svg>`, AND THIS MODULE IS SHAPED SO IT NEVER HAS TO — NOT
// EVEN FOR THE EIGHT ARROWHEADS. The zero-SMIL requirement is closed BY CONSTRUCTION, the
// way `gap-no-sop`, `mandate-levers` and `shape-middle-out` close it: mount no `<svg>` node
// and there is no `<animate>`, `<animateTransform>`, `<animateMotion>`, `<set>` or
// `<animateColor>` to gate at any pose under any motion preference. Every graphic here is
// therefore a POSITIONED BOX — two frame rectangles, two header hairlines, nine node
// rectangles, four factor markers, twelve connector rules and eight arrowheads — and every
// number below is a `left`/`top`/`width`/`height` in px for exactly that reason.
//
// A HEAD IS A BOX TOO, which is the only reason this figure could grow arrowheads without
// growing an `<svg>`. `mindset-section-c/components/C4LoopBackArrow.tsx` already draws one
// in this deck out of a `width: 0; height: 0` element with two transparent borders and one
// coloured one, and that is the idiom used here: {@link ARROW_HEAD_WIDTH} is the box's
// border-box width and {@link ARROW_HEAD_HEIGHT} its height, so a head is placed by the
// same `left`/`top` arithmetic as every rule beside it and `arrowHeadLeft` is the only new
// coordinate the construction costs. An `<svg><marker>` would have bought the identical
// triangle and re-opened a question this deck has had to answer with a `matchMedia` gate
// three times elsewhere. Do not reach for SVG here.
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
// (40px on 1.05) ends the headline row at y=122, so {@link FIGURE_CEILING} is 134 and the
// two frames start on {@link CONTENT_TOP} = 140. THIS SLIDE HAS NO KICKER, which is the
// 16px it spends: `./middle-out-geometry.ts` holds y=134 for a standing kicker and starts
// its chart at `.slide-content`'s own 156, and this stage buys those sixteen pixels back
// because the thing that would stand there — "two named models" — is what the two frame
// titles already say, twice, in the frames' own chrome.
//
//   ─── FRAME · both of them, identical boxes ──────────────────── box 140 → 548 ───
//   156  frame title      · 12px mono caps ·0.20em                            → 172
//   176  attribution      · 12.5px sans                                       → 194
//   206  header hairline  · 1px                                               → 207
//
//   ─── LEFT FRAME · the causal chain, four tiers, one fork, one merge ─ 218 → 496 ───
//   218  EXTERNAL FACTORS node                                                → 310
//        224 label · 242 caption · 268 factor row · 288 factor row
//   310  the FORK · stem 6 · spreader 4 · two arrowheads 6                    → 326
//   326  the two belief nodes, side by side                                   → 372
//   372  the MERGE · two stems 6 · joiner 4 · one arrowhead 6                 → 388
//   388  the intention node                                                   → 434
//   434  the one straight connector · rule 10 · arrowhead 6                   → 450
//   450  the actual-use node                                                  → 496
//
//   ─── RIGHT FRAME · the ordered chain, one spine and five links ── 218 → 496 ───
//   218  the SPINE · 4 wide, unbroken, 278 tall, x = 682                      → 496
//   218  link → 264 · tie at 239 · arrowhead 270                              → 276
//   276  link → 322 · tie at 297 · arrowhead 328                              → 334
//   334  link → 380 · tie at 355 · arrowhead 386                              → 392
//   392  link → 438 · tie at 413 · arrowhead 444                              → 450
//   450  link · tie at 471 · NO arrowhead — the sequence ends here            → 496
//
//   ─── EACH FRAME'S CLOSER (inside its own frame, under its own chain) ──────────
//   510  closer · 15px serif, ONE line                                        → 532
//   ─── THE UNIFYING LINE (full width, and the only thing outside both) ──────────
//   572  unifier · 22px serif, ONE line                                       → 604
//   ───────────────────────────────────────────────────────────────────────────────
//   floor y=632 · lowest painted box 604 · {@link NAV_ZONE_CLEARANCE} = 28
//
// THE FLOOR IS THE HOVER BAND AND NOT `.slide-content`'s BOTTOM, the rule every geometry
// module in the leader tree keeps: `.nav-zone` is `bottom: 0; height: 88px` in
// `src/styles/globals.css`, so its top edge is y=632 and nothing on this stage may cross
// it. Content under that band is content the presenter's own pointer makes the NavBar
// fade up over.
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
//   unifier             22px serif  + kw italic      792.84 /   775.33      1184     1
//   frame closer (long) 15px serif  + kw italic      435.00 /   452.16       536     1
//   frame title (long)  12px mono ·0.20em ·upper     259.20 /   259.23       536     1
//   attribution (long)  12.5px sans                  388.98 /   387.23       536     1
//   node label (long)   11px mono ·0.16em ·upper     175.56 /   175.59       236     1
//   node caption (long) 12px sans                    195.09 /   195.80       236     1
//   factor (long)       12px sans                    118.88 /   117.77       236     1
//
// THE FALLBACK FACE IS THE ONE THAT DECIDES for the display and serif registers — the
// headline is 23% wider without the CDN — and the WEBFONT decides for the sans, which is
// why each budget below states which face it was cut against. It is always the loser.
// The MONO figures are the same on both faces to within 0.03px, because every monospace
// face the cascade can land on is a 0.6em face.
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
 * The highest y the figure may start at: 134.
 *
 * `.slide-headline-row` is at `top: 80px` and a one-line `.slide-headline.small` is 40px
 * on 1.05, so the headline's last pixel is at y ≈ 122 and 134 clears it by 12 — the
 * leader tree's binding gap. It is the same number `./middle-out-geometry.ts` hangs its
 * KICKER from, and this slide reaches it with the frames themselves.
 */
export const FIGURE_CEILING = 134;

/**
 * The shelf both frames start on: 140.
 *
 * SIXTEEN PIXELS ABOVE `.slide-content`'s OWN `top` (156), which is where the two sibling
 * slides in this section start, and the departure is deliberate rather than a rounding.
 * Both of them spend those pixels on a standing mono kicker at y=134; this stage has none,
 * because what a kicker would say — that these are two named models — is what the two
 * frame TITLES say, twice, inside the frames' own chrome. Spending the line twice would
 * be a heading over two headings.
 *
 * The 6px of extra air over {@link FIGURE_CEILING} is the whole difference, and it is
 * spent on the one thing this stage has that neither sibling does: a frame BORDER, whose
 * top edge is a drawn line rather than a line of type, and which reads tight against a
 * headline at 4px in a way a row of 11px mono does not.
 */
export const CONTENT_TOP = 140;

// ───────────────────── the two frames ─────────────────────

/**
 * How many frames there are: 2.
 *
 * TWO IS THE SLIDE. One model explains why a person starts and the other explains why an
 * organisation does not stop, and neither is sufficient — which is the sentence the
 * unifying line at the foot of the stage makes. A third frame would not be a layout
 * problem, it would be a different slide.
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
 *  except the headline and the unifying line is cut against. */
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
 * THE RIGHT CHAIN DELIBERATELY DOES NOT USE IT, and that is the asymmetry the figure is
 * built on. Its sequence runs down a SPINE at the frame's inner LEFT edge
 * ({@link KOTTER_SPINE_CENTRE_X}) with the five links hung off it, because a chain that
 * ran down the same centre line as the one opposite would be the second column this figure
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

/** The top edge of a frame's inner content: 156. Both frames, one value. */
export const PANEL_INNER_TOP = CONTENT_TOP + PANEL_PAD_Y;

/** A frame TITLE's box: 16 — 12px mono on 1.3 is a 15.60 line box and JetBrains Mono's
 *  content area is 1.3em, so the painted extent is 15.60 and the box carries 0.40 spare. */
export const FRAME_TITLE_HEIGHT = 16;

/** Where a frame's title sits: 156. */
export const FRAME_TITLE_TOP = PANEL_INNER_TOP;

/** The air between the title and the attribution under it: 4 — the tightest gap on this
 *  stage, because the two lines are one object. Not exported. */
const TITLE_TO_ATTRIBUTION = 4;

/** An ATTRIBUTION's box: 18 — 12.5px sans on 1.35 is a 16.88 line box painting ≈17.5, so
 *  the box carries 0.5 spare. Cut for ONE line; see {@link ATTRIBUTION_BUDGET_CHARS}. */
export const ATTRIBUTION_HEIGHT = 18;

/** Where a frame's attribution sits: 176 — the model's name and its author, on the line
 *  under the frame's own name. */
export const ATTRIBUTION_TOP = FRAME_TITLE_TOP + FRAME_TITLE_HEIGHT + TITLE_TO_ATTRIBUTION;

/** The air between the attribution and the hairline under it: 12. Not exported. */
const ATTRIBUTION_TO_RULE = 12;

/** The header hairline's thickness: 1 — `.copper-rule`'s own weight in
 *  `src/styles/globals.css`, and the deck's standard divider. THINNER THAN A CONNECTOR
 *  ({@link RULE_THICKNESS}) on purpose: this line divides, the connectors argue. */
export const HEADER_RULE_HEIGHT = 1;

/**
 * The hairline under each frame's header: 206.
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

/** Where both chains start: 218. ONE VALUE FOR BOTH FRAMES — the two chains begin on the
 *  same line, so neither model appears to start earlier than the other. */
export const BODY_TOP = HEADER_RULE_TOP + HEADER_RULE_HEIGHT + RULE_TO_BODY;

// ───────────────────── the node, which both chains are built from ─────────────────────
//
// ONE NODE IDIOM FOR NINE BOXES, and it is the reason the two frames can carry order the
// same way. A node is a bordered box holding a mono LABEL over a sans CAPTION: four of
// them make the left frame's causal chain, five make the right frame's ordered chain, and
// because they are the same object the room learns to read one of them once. What differs
// between the two halves is the SHAPE of the chain — a fan and a column — and nothing
// else. A second node idiom on the right would have made the two frames two figures.

/** A node's horizontal padding: 12. Not exported — {@link nodeTextLeft} and
 *  {@link nodeTextWidth} are. */
const NODE_PAD_X = 12;

/** A node's vertical padding: 6. Not exported. */
const NODE_PAD_Y = 6;

/** A node LABEL's box: 15 — 11px mono on 1.3 is a 14.30 line box, 0.70 spare. ONE HEIGHT
 *  FOR ALL NINE LABELS in both chains. */
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
 * ONE HEIGHT FOR EIGHT OF THE NINE NODES, and it is the single number that keeps the
 * right-hand chain from being a staircase: five boxes of one height on one left edge
 * cannot be read as five rungs. Derived from the four registers above rather than typed,
 * so a taller label or a looser gap moves every node, both chains, both frames and
 * {@link NAV_ZONE_CLEARANCE} together.
 */
export const NODE_HEIGHT = 2 * NODE_PAD_Y + NODE_LABEL_HEIGHT + LABEL_TO_CAPTION + NODE_CAPTION_HEIGHT;

/** Where a node's text starts, given the node's own left edge. */
export function nodeTextLeft(nodeLeft: number): number {
  return nodeLeft + NODE_PAD_X;
}

/** The measure a node's text gets, given the node's own width: 512 in a full-width node,
 *  236 in one of the two belief nodes. Both numbers are budgets below. */
export function nodeTextWidth(nodeWidth: number): number {
  return nodeWidth - 2 * NODE_PAD_X;
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

// ───────────────────── the connectors ─────────────────────

/**
 * A connector's thickness: 4 — four times `.copper-rule`'s 1px, and twice what this figure
 * first shipped with.
 *
 * THESE ARE THE MARKS THE WHOLE NO-THIRD-LADDER DECISION RESTS ON. Order on this stage is
 * carried by position and by these rules and by nothing else — no numeral, no badge, no
 * graded colour — so a connector that a projector at the back of a room loses is an
 * argument the room cannot follow.
 *
 * TWO PIXELS WAS NOT ENOUGH, AND THAT IS A MEASURED FAILURE RATHER THAN A PREFERENCE. At
 * 2px in `--copper-600` the nine segments of the left chain and the four of the right one
 * came out at roughly one projected pixel over a `--neutral-900` ground, and both halves of
 * the figure collapsed into what they are made of: a column of identically-sized bordered
 * boxes. The fork stopped forking, the merge stopped merging, and the five links of the
 * change model read as a bulleted list — which is precisely the reading §6.6's refusal
 * leaves the connectors to carry. A mark that has to survive a projector, and that is the
 * only carrier of an argument, gets weight before it gets subtlety. `./components/
 * TamKotterFrames.tsx` raised the tier in the same edit and for the same reason.
 *
 * FOUR AND NOT THREE, because every gap on this stage is an even number and a 3px box
 * centred on a line lands on a half pixel: {@link verticalRuleLeft} would return `x − 1.5`
 * at all five vertical rules, {@link kotterTieTop} would return a `.5` at all five ties,
 * and the browser would resolve the same mark two ways at two scales. Four keeps every
 * coordinate in this module an integer, which is the property the whole vertical budget
 * above is checked against.
 */
export const RULE_THICKNESS = 4;

/**
 * How wide an arrowhead is across its base: 12 — three times the rule it terminates.
 *
 * DERIVED FROM {@link RULE_THICKNESS}, so a head can never come to be a different mark from
 * the line it ends. THREE TIMES is the smallest multiple that reads as a HEAD rather than
 * as a swelling: at 2× a 4px rule ends in an 8px wedge that a projector renders as a blunt
 * tip, and at 4× the head starts to read as a separate triangle that happens to sit near a
 * line. Eight heads on this stage, one width.
 */
export const ARROW_HEAD_WIDTH = 3 * RULE_THICKNESS;

/** Half of it: 6 — the number an arrowhead is actually PLACED with, because a head is
 *  centred on an axis. Exported because the renderer needs it twice per head (a CSS
 *  border triangle is two transparent flanks of exactly this width). */
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
 * subtracts exactly one head's height so that a fork's ARM is a head with no stub under it.
 */
export const ARROW_HEAD_HEIGHT = ARROW_HEAD_HALF_WIDTH;

/**
 * The gap the RIGHT frame's spine crosses between two links: 12.
 *
 * THE SAME FOR ALL FOUR, and that is the point: four equal intervals say "then, then,
 * then" and nothing about distance. Graded gaps would put a scale on the stage without a
 * single numeral being printed.
 *
 * IT IS ALSO EXACTLY TWICE {@link ARROW_HEAD_HEIGHT}, which is what lets an arrowhead sit
 * in the LOWER half of every gap with a clear 6px of spine above it. A head that filled its
 * gap would touch both links and read as a bracket joining them; a head centred in the gap
 * would point at the middle of nothing. Sitting low, with its tip on the next link's top
 * edge, it points at the link.
 */
export const KOTTER_CONNECT = 12;

/**
 * The left edge of a vertical connector standing on the centre line `centreX`.
 *
 * A FOUR-PIXEL BOX CENTRED ON A LINE STARTS TWO PIXELS LEFT OF IT, and those two pixels are
 * the difference between a rule that meets the middle of the box above it and one that is
 * visibly off by half its own weight at projection scale. It is a coordinate, so it lives
 * here rather than as a `- 2` written at each of the five VERTICAL rules on this stage —
 * and written five times it is five chances to write `- RULE_THICKNESS` instead. The two
 * HORIZONTAL marks of the left frame's fans span between centre lines rather than standing
 * on one, so they take {@link fanSpanLeft} instead; the five ties of the right frame's
 * spine start ON a computed edge and take {@link KOTTER_TIE_LEFT}.
 */
export function verticalRuleLeft(centreX: number): number {
  return centreX - RULE_THICKNESS / 2;
}

/**
 * The left edge of an arrowhead pointing down the centre line `centreX`: 192 and 468 for
 * the fork's two arms, 330 for the merge and for the one straight connector, 676 for all
 * four of the right frame's.
 *
 * THE SAME CONSTRUCTION AS {@link verticalRuleLeft} AND A SEPARATE FUNCTION, because a head
 * and a rule are centred on the same axis and are three times apart in width. One function
 * taking a width would let a call site pass the wrong one and land a head 4px off its own
 * line, which at 12px across is a third of the mark.
 */
export function arrowHeadLeft(centreX: number): number {
  return centreX - ARROW_HEAD_HALF_WIDTH;
}

// ───────────────────── the right frame: one spine, five links ─────────────────────
//
// THE SPINE IS THE SEQUENCE, AND THE FIVE LINKS ARE WHAT IS ON IT. The change model's whole
// claim is that these five are run in an order, and the figure this slide first shipped
// said that with four 12px ticks between five boxes — which at projection distance is five
// boxes. So the right-hand chain is rebuilt as a RAIL: one unbroken rule down the frame's
// inner left edge, running the full height of the chain, with the five links tied off it
// and four arrowheads on it. It is a route with five stops on it rather than a list with
// four gaps in it, and the difference is legible from the back of the room without a word
// being read.
//
// IT IS NOT A LADDER AND CANNOT BECOME ONE. Every number below is shared by all five links
// — one left edge ({@link KOTTER_LINK_LEFT}), one width ({@link KOTTER_LINK_WIDTH}), one
// tie length ({@link KOTTER_TIE_LENGTH}), one tie offset ({@link kotterTieTop}) — and the
// spine itself is a SINGLE rule, so there is no per-gap segment for an edit to lengthen,
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

/** How far apart two links sit: 58. Derived. Not exported — {@link kotterLinkTop} carries
 *  it. */
const KOTTER_PITCH = NODE_HEIGHT + KOTTER_CONNECT;

/**
 * How tall both chains are: 278 — DERIVED FROM THE LONGER OF THE TWO, which is the
 * right-hand one.
 *
 * BOTH CHAINS ARE CUT TO THIS, and the equality is the last of the frame's unranked
 * guarantees: the two frames are the same width, the same height and the same top, and
 * now the two CHAINS inside them end on the same pixel. A left chain that stopped 40px
 * short would leave the acceptance model looking like the smaller half of the argument,
 * which is the opposite of what the unifying line says.
 *
 * The left chain reaches it by spending the difference on its three connectors — see
 * {@link TAM_CONNECT}, which is a division rather than a literal for exactly that reason.
 */
export const BODY_HEIGHT = KOTTER_LINK_COUNT * NODE_HEIGHT + (KOTTER_LINK_COUNT - 1) * KOTTER_CONNECT;

/** Where both chains end: 496. */
export const BODY_BOTTOM = BODY_TOP + BODY_HEIGHT;

/** The guard the two right-frame placement functions share. Not exported. */
function assertLink(fn: string, index: number): void {
  if (!Number.isInteger(index) || index < 0 || index >= KOTTER_LINK_COUNT) {
    throw new Error(
      `${fn}: no link ${index} — the condensed chain has ${KOTTER_LINK_COUNT} ` +
        `(0…${KOTTER_LINK_COUNT - 1}). The tuple in ./content.ts refuses the extra ` +
        `entry first, and a sixth link would grow BODY_HEIGHT by ${KOTTER_PITCH}px on ` +
        `both chains at once and push the unifying line through the NavBar band at ` +
        `y=${NAV_ZONE_TOP}.`,
    );
  }
}

/**
 * Link `index`'s box top: 218, 276, 334, 392, 450.
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
 * The top of the ARROWHEAD below link `index`: 270, 328, 386, 444.
 *
 * ITS TIP LANDS ON THE TOP EDGE OF LINK `index + 1`, which is the rule every one of this
 * stage's eight heads keeps: a head points AT something and its tip touches what it points
 * at. `kotterLinkTop(index + 1) − ARROW_HEAD_HEIGHT` is the same number written the other
 * way round, and it is written from the gap here so that the head cannot drift off the
 * spine if {@link KOTTER_CONNECT} is ever re-cut.
 *
 * FOUR ARROWHEADS FOR FIVE LINKS, so the last link has none and the chain visibly ENDS
 * rather than trailing off — the room should be able to see that the model is finished, not
 * that the slide ran out of room. The SPINE ends on the same pixel the last link does
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
 * PLACED SO THE WIDEST MARK ON THE SPINE STARTS ON THE FRAME'S OWN INNER LEFT EDGE.
 * `panelInnerLeft(1) + ARROW_HEAD_HALF_WIDTH` is 676 + 6, which puts the left flank of
 * every arrowhead at exactly 676 — the line the frame's title, its attribution, its header
 * hairline and its closer all start on. The rule itself is narrower and therefore inset by
 * 4, which is the correct way round: the heads are the marks a reader's eye lands on, so
 * THEY set the margin and the line hangs inside it.
 *
 * ON THE LEFT EDGE AND NOT ON {@link panelCentreX}, which is the asymmetry the whole figure
 * turns on. A sequence drawn down the middle of its frame, opposite a causal chain drawn
 * down the middle of its own, gives the room two centred columns and one reading: "two
 * lists". Down the edge, it gives the room a rail — and the left frame keeps the centre
 * line it needs for a fork that is symmetrical about it.
 */
export const KOTTER_SPINE_CENTRE_X = panelInnerLeft(KOTTER_PANEL) + ARROW_HEAD_HALF_WIDTH;

/**
 * How far each link stands off the spine: 20 — the frame's own inner padding.
 *
 * THE SPINE BECOMES A SECOND LEFT EDGE AND THE LINKS KEEP THE FRAME'S OWN RHYTHM. A frame's
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

/** Where a tie starts: 684 — the spine's own right edge, so tie and spine meet with no
 *  seam and no overlap. */
export const KOTTER_TIE_LEFT = KOTTER_SPINE_CENTRE_X + RULE_THICKNESS / 2;

/**
 * Every link's left edge: 704 — the spine, plus the tie that carries the link to it.
 *
 * DERIVED, so the boxes cannot come to float free of the rail: move the spine or re-cut the
 * tie and all five links follow. There is no per-link term in it — see the section header.
 */
export const KOTTER_LINK_LEFT = KOTTER_TIE_LEFT + KOTTER_TIE_LENGTH;

/**
 * Every link's width: 508 — what is left of the frame's measure once the spine and the tie
 * are taken out of it.
 *
 * THE RIGHT CHAIN'S BOXES ARE NARROWER THAN THE LEFT CHAIN'S FULL-WIDTH NODES (508 against
 * 536) AND THAT IS NOT A RANKING. It is the width the rail costs, spent identically by all
 * five, and it is the visible sign that these five hang off something — a box that ran to
 * the frame's own edge would leave the spine standing in the margin beside it rather than
 * carrying it. Both frames are still one width, one height and one top edge; what differs
 * is the shape of the chain inside, which is the one difference this figure is making.
 *
 * NO COPY BUDGET MOVES WITH IT. `nodeTextWidth(508)` is 484, and every budget in this
 * module is cut against the NARROWEST measure on the stage — a belief node's 236 — so the
 * right chain's strings have twice the room their budget assumes, before and after.
 */
export const KOTTER_LINK_WIDTH = panelInnerLeft(KOTTER_PANEL) + PANEL_INNER_WIDTH - KOTTER_LINK_LEFT;

/**
 * The top of link `index`'s tie: 239, 297, 355, 413, 471.
 *
 * CENTRED ON THE LINK'S OWN BOX, which is the only vertical position that reads as an
 * attachment: a tie meeting a box near its top edge reads as a header rule and one near its
 * bottom as an underline. Derived from {@link NODE_HEIGHT} and {@link RULE_THICKNESS}, so a
 * taller node or a heavier rule keeps the tie on the box's middle.
 *
 * @throws through {@link kotterLinkTop} on a link the chain does not have.
 */
export function kotterTieTop(index: number): number {
  return kotterLinkTop(index) + (NODE_HEIGHT - RULE_THICKNESS) / 2;
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
 * EVER A DIFFERENT SIZE FROM ANOTHER. It carries the same label and caption as every other
 * node plus the four named factors, and the extra height is exactly those two rows and the
 * air over them — derived, so it cannot drift into being a size that ranks it. Nothing
 * else about it differs: same left edge, same width, same border, same tier.
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
 * The gap each of the left chain's three connectors spans: 16 — DERIVED, never typed.
 *
 * `(BODY_HEIGHT − the four tiers) / (tiers − 1)` is what makes the two chains END ON ONE
 * PIXEL: the left chain has fewer, taller boxes than the right, so it pays the difference
 * out in air between them. A literal 16 would hold today and would silently leave the two
 * chains ragged the first time either side gained a node — and a ragged pair of chains is
 * the one way this stage could accidentally rank one model over the other, since the
 * longer chain would look like the fuller argument.
 *
 * IT IS ALSO WHY THE LEFT CONNECTORS ARE LONGER THAN THE RIGHT ONES (16 against
 * {@link KOTTER_CONNECT}'s 12), which is not an inconsistency: within each chain every
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
 * Tier `tier`'s top edge: 218, 326, 388, 450.
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
 * The top of the connector BELOW tier `tier`: 310, 372, 434.
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
        `0…${TAM_TIER_COUNT - 2}. A rule here would run from the end of the chain into ` +
        `the frame's own closer.`,
    );
  }
  return tamTierTop(tier) + TAM_TIER_HEIGHTS[tier];
}

/**
 * The top of the ARROWHEAD that ends the connector below tier `tier`: 320, 382, 444.
 *
 * ONE FUNCTION FOR ALL FOUR OF THE LEFT CHAIN'S HEADS — the fork's two arms share tier 0's
 * value, because both point into the same tier and this chain's two beliefs arrive on one
 * line. Its tip lands on {@link tamTierTop}`(tier + 1)`, which is the rule every head on
 * this stage keeps: a head points AT something and its tip touches what it points at.
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
 * THE FORK AND THE MERGE ARE BUILT ENTIRELY OUT OF THIS. The spreader that leaves the top
 * tier reaches these two lines, the fork's two arrowheads are centred on them
 * ({@link arrowHeadLeft}), the two stems under the beliefs rise from them, and the joiner
 * that returns to the intention node spans them — so the whole fan moves with the boxes and
 * cannot come to point between them.
 *
 * @throws through {@link tamNodeLeft} on a tier, column or frame that does not exist.
 */
export function tamNodeCentreX(panel: number, tier: number, column: number): number {
  return tamNodeLeft(panel, tier, column) + tamNodeWidth(tier) / 2;
}

/**
 * How far a connector's stem runs before the horizontal mark that spreads or joins it: 6 —
 * DERIVED as what is left of {@link TAM_CONNECT} once the horizontal mark's own 4px and one
 * arrowhead's height are taken out of it.
 *
 * THE SUBTRACTION IS THE GUARANTEE THAT A FORK'S ARM IS A HEAD AND NOTHING ELSE. Below the
 * spreader there is exactly {@link ARROW_HEAD_HEIGHT} of room, so each of the fork's two
 * arms is drawn as a bare triangle hanging off the bar with its tip on the belief node's
 * top edge, and the merge's single drop is the same. That is deliberate and not a shortage:
 * a 12px-wide head sitting on a 4px stub of two or three pixels reads as a rendering
 * artefact at this scale, and a bar with two triangles hanging off it is the plainest fork
 * a figure can draw. Re-cut {@link TAM_CONNECT} and the STEM grows; the arm stays exactly
 * one head, and the head stays attached to the bar.
 *
 * IT ALSO STILL SITS HALFWAY DOWN THE GAP — 6 above the bar, 6 below — because the head's
 * height and the stem's happen to agree at today's numbers. A spreader that sat closer to
 * the node above would read as an underline on it; one that sat closer to the nodes below
 * would read as a shared header over them. Halfway is the only position that reads as a
 * junction, and the arithmetic above is what keeps it there while also keeping the arms
 * attached.
 */
export const FAN_STEM = TAM_CONNECT - RULE_THICKNESS - ARROW_HEAD_HEIGHT;

/**
 * How much RULE the left chain's one unforked connector gets before its head: 10.
 *
 * THE ONLY CONNECTOR ON THIS STAGE THAT IS A LINE AND A HEAD RATHER THAN A JUNCTION — the
 * drop from the intention to the use it becomes, which is the one link in the acceptance
 * model that neither splits nor joins. It gets the whole gap minus one head, so the rule
 * stops exactly where the triangle starts.
 *
 * THE RULE MUST STOP, NOT RUN UNDER THE HEAD. A 4px rule continuing to the tip of a
 * 12px-wide head pokes out of both flanks over the head's last two pixels and paints a
 * small cross at the point of every arrow on the stage — a defect that is invisible at
 * 1280×720 in a screenshot and obvious on a wall. Every arrowed connector in this figure is
 * therefore drawn as `run − ARROW_HEAD_HEIGHT` of rule plus one head, and the fan's arms
 * are the degenerate case of it where the rule is nothing at all (see {@link FAN_STEM}).
 */
export const TAM_STRAIGHT_RULE_HEIGHT = TAM_CONNECT - ARROW_HEAD_HEIGHT;

/**
 * The left edge of the horizontal mark that spans the two belief columns: 196.
 *
 * IT REACHES THE TWO BELIEF CENTRE LINES AND NEITHER PIXEL FURTHER — the half-thickness
 * on each end is what makes the junction square rather than notched. Both the spreader
 * above the beliefs and the joiner below them use it, because they span the same two
 * lines.
 *
 * @throws through {@link tamNodeCentreX} on a frame this stage does not have.
 */
export function fanSpanLeft(panel: number): number {
  return verticalRuleLeft(tamNodeCentreX(panel, TAM_TIER.BELIEFS, 0));
}

/**
 * The width of that horizontal mark: 280 — the distance between the two belief centre
 * lines plus one thickness.
 *
 * MEASURED BETWEEN THE CENTRES RATHER THAN ADDED UP FROM A WIDTH AND A GAP, so it is the
 * same number the fork's two arrowheads are centred on and cannot be derived a second,
 * disagreeing way. It is frame-independent — the two frames are identical, so the span is
 * too — and {@link fanSpanLeft} is the only thing that has to know which frame it is being
 * drawn in.
 *
 * AT 280px ACROSS AND 4px THICK IT IS THE LARGEST MARK ON THE STAGE THAT IS NOT A BOX, and
 * that is the point of it: this one bar, with a triangle hanging off each end, is the
 * entire visual claim that the acceptance model FORKS. The room does not have to read
 * `PERCEIVED USEFULNESS` to see that one thing has become two.
 */
export const FAN_SPAN_WIDTH =
  tamNodeCentreX(TAM_PANEL, TAM_TIER.BELIEFS, BELIEF_COLUMNS - 1) -
  tamNodeCentreX(TAM_PANEL, TAM_TIER.BELIEFS, 0) +
  RULE_THICKNESS;

// ───────────────────── the four named factors ─────────────────────

/** The gap between the two factor columns: 16 — the belief tier's own gap, so the two
 *  splits on this side of the stage are one measurement. Not exported. */
const FACTOR_COLUMN_GAP = BELIEF_GAP;

/** Where the factor block starts: 80 — the top tier node's own text left edge. */
export const FACTOR_BLOCK_LEFT = nodeTextLeft(tamNodeLeft(TAM_PANEL, TAM_TIER.SOURCE, 0));

/** The measure the factor block gets: 512 — the top tier node's own text measure. Not
 *  exported; the column width derived from it is. */
const FACTOR_BLOCK_WIDTH = nodeTextWidth(tamNodeWidth(TAM_TIER.SOURCE));

/** One factor column's width: 248. */
export const FACTOR_COLUMN_WIDTH =
  (FACTOR_BLOCK_WIDTH - (FACTOR_COLUMNS - 1) * FACTOR_COLUMN_GAP) / FACTOR_COLUMNS;

/** Where the factor block's first row sits: 268. Not exported — {@link factorRowTop}
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
 * Factor `index`'s row top: 268, 268, 288, 288.
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
 * Factor `index`'s column left: 80, 344, 80, 344.
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
 * A MARK AND NOT A BULLET GLYPH, for the reason every graphic on this stage is a box: a
 * `·` or a `•` in the copy would put a character into `./content.ts` that means "this is
 * an item", which is a layout decision living in the words. It is also the one thing that
 * tells the four factors apart from the nine node captions at a glance, and it is
 * DELIBERATELY NOT A NUMERAL or a rule — a marked list is a set, a numbered list is an
 * order, and the four factors have none.
 */
export const FACTOR_MARKER_SIZE = 4;

/** The air between a factor's mark and its text: 8. Not exported. */
const FACTOR_MARKER_GAP = 8;

/** Where a factor's text starts, given its column's left edge: 92 or 356. */
export function factorTextLeft(columnLeft: number): number {
  return columnLeft + FACTOR_MARKER_SIZE + FACTOR_MARKER_GAP;
}

/** The measure a factor's text gets: 236 — and the budget below is cut against it. */
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

/** A frame closer's shelf: 510. ONE VALUE FOR BOTH FRAMES — the two verdicts sit on one
 *  line, so neither model appears to conclude before the other. */
export const FRAME_CLOSER_TOP = BODY_BOTTOM + BODY_TO_CLOSER;

/** A frame closer's box: 22, cut for ONE line of 15px serif — a 20.25 line box painting
 *  ≈20.4, so it carries ≈1.6 spare. See {@link FRAME_CLOSER_BUDGET_CHARS}. */
export const FRAME_CLOSER_HEIGHT = 22;

/** Where a frame's inner content ends: 532. Not exported. */
const PANEL_INNER_BOTTOM = FRAME_CLOSER_TOP + FRAME_CLOSER_HEIGHT;

/** Each frame's height: 408 — DERIVED from everything inside it, so a taller register or
 *  a longer chain grows the box rather than overflowing it. Both frames, one value. */
export const PANEL_HEIGHT = PANEL_INNER_BOTTOM + PANEL_PAD_Y - CONTENT_TOP;

/** Where both frames end: 548. */
export const PANEL_BOTTOM = CONTENT_TOP + PANEL_HEIGHT;

// ───────────────────── the unifying line ─────────────────────

/** The air between the frames and the line under both of them: 24 — the biggest gap on
 *  the stage. It is the only sentence here that belongs to neither frame, so it is set
 *  outside both. Not exported. */
const PANELS_TO_UNIFIER = 24;

/** The unifying line's shelf: 572. Full width — the one sentence addressed to both frames
 *  above it. */
export const UNIFIER_TOP = PANEL_BOTTOM + PANELS_TO_UNIFIER;

/** The unifying line's left edge and measure: 48 and 1184 — the stage's own. */
export const UNIFIER_LEFT = SIDE_MARGIN;
export const UNIFIER_WIDTH = CONTENT_WIDTH;

/** The unifying line's box: 32, cut for ONE line of 22px serif — a 28.60 line box
 *  painting 30.01, 1.99 spare. The same box every 22px verdict in the leader tree takes,
 *  and the string measures 792.84px of the 1184 available. */
export const UNIFIER_HEIGHT = 32;

/** Where the stage's lowest box ends: 604. Not exported — the clearance below carries its
 *  whole content. */
const UNIFIER_BOTTOM = UNIFIER_TOP + UNIFIER_HEIGHT;

/**
 * What is left between the unifying line and the NavBar's hover band: 28px.
 *
 * DERIVED FROM BOTH ENDS, so an edit anywhere above — a taller register, a sixth link, a
 * fifth tier, a fifth factor — moves it, and the only thing worth asserting about it is
 * that it stays positive. It is the one number that reports the whole vertical budget.
 */
export const NAV_ZONE_CLEARANCE = NAV_ZONE_TOP - UNIFIER_BOTTOM;

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
 * overflow a check would see: the row simply gets taller, and a second headline line
 * lands at y = 122…164, straight through {@link CONTENT_TOP}'s shelf and onto the top
 * edge of both frames. `./middle-out-geometry.ts` records the same failure actually
 * happening to a drafted line one slide later.
 */
export const HEADLINE_BUDGET_CHARS = 62;

/**
 * How long the unifying line may be: 104 characters.
 *
 * {@link UNIFIER_WIDTH} (1184px) over ≈10.86px per character — 22px Source Serif 4, which
 * is the WIDER of the two faces here and is what the shipped line (73 characters,
 * 792.84px, two italic runs) actually measured — gives ≈109, taken down to 104. A second
 * line would put the stage's lowest painted pixel at 636 against a floor of 632.
 */
export const UNIFIER_BUDGET_CHARS = 104;

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
 * How long a node's label may be: 26 characters.
 *
 * Cut against the NARROWEST node text measure on the stage — a belief node's 236px, not
 * the 512px a full-width node gets — over 8.36px per character at 11px mono, 0.16em
 * tracking, which gives ≈28 and is taken down to 26. The longest shipped label is 21
 * characters at 175.56px.
 *
 * ONE BUDGET FOR ALL NINE LABELS, and deliberately the tight one: the two chains print
 * the same register, and a label that fits in the right frame but wraps in a belief node
 * is exactly the kind of asymmetry that would make the two frames stop looking like a
 * pair. The failure mode is silent — an 11px uppercase label wrapping inside a 15px box
 * grows a sliver of type no bounding check reports and every projector shows.
 */
export const NODE_LABEL_BUDGET_CHARS = 26;

/**
 * How long a node's caption may be: 40 characters.
 *
 * The same narrowest measure (236px) over ≈5.59px per character at 12px Inter — the
 * wider of the two faces here, measured on the longest shipped caption (35 characters,
 * 195.09px) — gives ≈42, taken down to 40. A caption that wraps pushes into the node's
 * own bottom padding and then into the connector under it.
 */
export const NODE_CAPTION_BUDGET_CHARS = 40;

/**
 * How long a named factor may be: 35 characters.
 *
 * {@link FACTOR_TEXT_WIDTH} (236px) over ≈6.26px per character at 12px Inter — measured
 * on the shipped factor with the widest per-character advance rather than the longest
 * one, which is the honest way to cut a budget over four short strings — gives ≈37, taken
 * down to 35. The longest shipped factor is 24 characters at 135.64px.
 */
export const FACTOR_BUDGET_CHARS = 35;
