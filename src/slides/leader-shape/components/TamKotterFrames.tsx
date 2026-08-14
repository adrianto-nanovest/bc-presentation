// Two framed engines, and the one thesis line under both of them.
//
// THE FIGURE IS TWO FRAMES THAT ARE IDENTICAL IN EVERY RESPECT EXCEPT WHAT THEY SAY.
// Same width, same height, same top edge, same border, same ground, same header
// construction, same node idiom, same colour tiers, same build rhythm, and two chains cut to
// end on the same pixel. `../tam-kotter-geometry.ts` holds every one of those equalities as
// arithmetic; this file holds the three things it deliberately does not — the colour tiers,
// the arrival delays and the choice of mark per node — and spends none of them on ranking one
// frame over the other.
//
// AND THE TWO CHAINS INSIDE THEM ARE SHAPED TO BE TOLD APART WITHOUT BEING READ, which is
// the one asymmetry on the stage and the reason the figure exists. The acceptance model
// FORKS and MERGES: a 280px bar with an arrowhead hanging off each end splits one source
// into two beliefs, and a second bar returns them to one intention. The change model RUNS
// STRAIGHT THROUGH: one unbroken rail down the frame's inner left edge, five links tied off
// it, four arrowheads on that one axis. A room that can read neither frame can still see
// that the left figure branches and the right figure does not — and that is exactly what the
// two published models say.
//
// ────────────────────────────────────────────────────────────────────────────
// WHAT CHANGED, AND WHY — three owner calls, 2026-08-14, and each one is load-bearing.
//
//   1. TWO POSES, NOT SIX. `../tam-kotter-walk.ts` argues it at length. The whole figure
//      arrives on pose 0 as a staged BUILD on mount, and the one remaining click is the
//      thesis. What used to be five gates is now one timetable ({@link BUILD}).
//   2. THE THESIS IS SMALLER AND ON THE FLOOR. 18px instead of 22, at y=596 instead of 572,
//      12px over the NavBar band instead of 28 — see `THESIS_TOP` and `THESIS_FONT_SIZE` in
//      `../tam-kotter-geometry.ts`. The stage it gives back went into the frames.
//   3. THE FIGURE MOVES, AND THE MOTION IS THE ARGUMENT. The twelve `<div>` connector rules
//      and eight CSS border-triangles are gone; both chains are now SVG paths that DRAW
//      themselves in the direction their model claims causation runs, and then carry motion
//      at rest — a continuous current down the left chain, a single runner sweeping the right
//      one with each station flashing as it is reached. `./tam-kotter.css` owns every
//      keyframe and states why the two loops are different in kind. Ten animated marks
//      (`./TamKotterGlyphs.tsx`) sit one per node.
//
//   AND THE FRAMES START 16px LOWER (y=156, not 140), which is the fourth call and the
//   smallest: the two frame borders read as an underline on the headline at 18px of air.
//   `CONTENT_TOP` records the measurement.
// ────────────────────────────────────────────────────────────────────────────
//
// WHY THE TWO FRAMES MUST BE EQUAL. The slide's claim is a conjunction: belief is why a
// person starts and sequence is why an organisation does not stop, and neither is
// sufficient. A stage that drew one frame wider, taller, brighter or earlier would be
// arguing that one of the two is the real answer and the other is the caveat — which is the
// opposite of the sentence printed under both of them. THAT NOW HAS A TIME DIMENSION TOO:
// {@link BUILD} starts the rail on the same millisecond as the causal chain's first node and
// lands both closers on the same beat, so neither model appears to be introduced first.
//
// WHAT THE FIGURE REFUSES TO SAY, and each refusal is enforced by something concrete:
//
//   · NO NUMBER ON THE CAUSAL CHAIN, AND `01`…`05` ON THE ORDERED ONE — which is an owner
//     decision of 2026-08-14 and a narrowing of a rule this file used to state absolutely.
//     `../tam-kotter-geometry.ts`'s "the ordinal on a card" section carries the whole
//     argument: §6.6 refuses a third ordered VOCABULARY (a named scale the deck teaches and
//     reuses), and an index on the cards of a published five-step sequence is not one. What
//     holds the two apart is enforced here and in that module — the numeral sits in the
//     card's top-right corner in the quietest legible tier, never at the head of the label
//     where it would join the link's NAME; the acceptance model's five nodes get none at all,
//     because its second tier is a PAIR the model does not order; and `../content.ts` still
//     has no ordinal field, so the string is formatted from the array index by
//     {@link ordinalFor} and cannot survive a reorder. `./TamKotterGlyphs.tsx` still draws no
//     digit and no countable set of five.
//   · NO RANK AMONG THE FIVE, AND NONE AMONG THE FIVE ON THE OTHER SIDE. One tier for all
//     ten node labels, one for all ten captions, one for all ten marks, one for all four
//     factor marks — see {@link TIER}. `mandate-levers` makes the identical call about its
//     four levers and for the identical reason: a brighter first item, or five items fading
//     out down the frame, is a ladder drawn without a single digit. THE RAIL, ITS FOUR HEADS
//     AND THE RUNNER ARE HELD TO THE SAME RULE: one path for the whole sequence rather than
//     four segments, five ties of one length, four heads of one size, and one runner at one
//     speed whose five station flashes are one keyframe with five evenly-spaced phases.
//   · NO STAIRCASE. `leader-mandate/mandate-phases-gates.tsx` owns the ascending-tread
//     idiom in this deck for P0–P3, and a second one here would read as a maturity scale
//     however carefully it was captioned. A rail is the opposite object: every stop on it is
//     the same distance from the line and the same distance from its neighbours, and the
//     runner reaches them at five evenly-spaced moments.
//   · NO LETTER AND NO FIGURE NUMBER. `FigLabel` takes a LABEL only; the composer
//     supplies the rest (§3.5). Nothing under this directory names one.
//
// RANK IS A COLOUR TIER AND OPACITY IS TIME — see {@link TIER}, which is the one place
// either decision is made. There is no dimmed state anywhere on this stage, for anything, at
// any pose: nothing is on the stage at a reduced tier waiting to be brightened, and the only
// opacity that changes is a build arriving. Attention is bought with added light, never
// subtracted (§7.1).
//
// ZERO SMIL NODES, at both poses, under any motion preference — and this figure now keeps
// that rule the way `./PillarOrbit.tsx` keeps it rather than the way it used to. It used to
// mount no `<svg>` at all; it now mounts exactly one, and no `<animate>`,
// `<animateTransform>`, `<animateMotion>`, `<set>` or `<animateColor>` element anywhere
// inside it. Every mark that moves is moved by a CSS animation in `./tam-kotter.css`, which
// the global `prefers-reduced-motion: reduce` rule in `src/styles/globals.css` reaches and
// which that file's own media block finishes.
//
// CSS VARS ONLY, NO HEX AND NO rgba() LITERAL, anywhere — including the eleven connector
// paths, the eight arrowheads, the two motion overlays, the factor marks, the two header
// hairlines and both frame grounds. `none` on a `fill` or a `stroke` is a CSS-wide keyword
// and not a colour literal.
//
// EVERY COORDINATE IS READ AND THE ONE GATE IS ASKED. Not one number below is computed
// here: the placements and the eleven path strings come from `../tam-kotter-geometry.ts`,
// and the pose from `../tam-kotter-walk.ts`. The literals that DO appear are type registers
// — font sizes, tracking, line heights, a 1px border — and each one is a number that
// geometry module already assumed when it cut its boxes, PLUS the build timetable and
// {@link RUNNER_MS}, which are durations and belong to time rather than to space.
//
// IT READS NO VARIANT AND NO BRAND, like `MiddleOutBands.tsx` beside it and unlike
// `./PillarOrbit.tsx`: issue #71 gives this slide no brand axis at all, so there is no
// `…For(brand)` prop to look for and both leader rooms read identical bytes off one stage. A
// published model says the same thing in both of them.
import { Fragment, type CSSProperties, type ReactNode } from "react";
// Section E's copy, the tree's de facto shared reveal primitive — the same import
// `MiddleOutBands.tsx`, `NoSopBeats.tsx` and `LeverBoard.tsx` make. It carries every BOX and
// every STRING on this stage; the eleven paths and eight polygons inside the `<svg>` do not
// use it, because `.fade`'s `transform: translateY(8px)` is a CSS transform and a CSS
// transform on an SVG child is in USER UNITS — a path nudged 8 user units would land 8px off
// its own arrowhead. `./tam-kotter.css` gives them `tk-draw` and `tk-fade-in` instead, which
// touch opacity and dash offset only.
import { Reveal } from "@/slides/foundation-core-section-e/components/Reveal";
import { highlight } from "@/components/highlight";
import {
  ATTRIBUTION_HEIGHT,
  ATTRIBUTION_TOP,
  CONTENT_TOP,
  CURRENT_THICKNESS,
  FACTOR_HEIGHT,
  FACTOR_MARKER_SIZE,
  FACTOR_TEXT_WIDTH,
  FRAME_CLOSER_HEIGHT,
  FRAME_CLOSER_TOP,
  FRAME_TITLE_HEIGHT,
  FRAME_TITLE_TOP,
  GLYPH_SIZE,
  HEADER_RULE_HEIGHT,
  HEADER_RULE_TOP,
  INDEX_HEIGHT,
  INDEX_WIDTH,
  KOTTER_LINK_LEFT,
  KOTTER_LINK_WIDTH,
  KOTTER_PANEL,
  KOTTER_RAIL_CENTRE_X,
  NODE_CAPTION_HEIGHT,
  NODE_HEIGHT,
  NODE_LABEL_HEIGHT,
  PANEL_HEIGHT,
  PANEL_INNER_WIDTH,
  PANEL_WIDTH,
  RULE_THICKNESS,
  SOURCE_NODE_HEIGHT,
  STAGE,
  TAM_PANEL,
  TAM_TIER,
  THESIS_FONT_SIZE,
  THESIS_HEIGHT,
  THESIS_LEFT,
  THESIS_TOP,
  THESIS_WIDTH,
  arrowPoints,
  factorColumnLeft,
  factorMarkerTop,
  factorRowTop,
  factorTextLeft,
  glyphLeft,
  glyphTop,
  indexLeft,
  indexTop,
  kotterArrowTop,
  kotterLinkTop,
  kotterRailPath,
  kotterStationOffset,
  kotterTiePath,
  nodeCaptionTop,
  nodeLabelTop,
  nodeLabelWidth,
  nodeTextLeft,
  nodeTextWidth,
  panelInnerLeft,
  panelLeft,
  tamArrowTop,
  tamForkPath,
  tamMergePath,
  tamNodeCentreX,
  tamNodeLeft,
  tamNodeWidth,
  tamStraightPath,
  tamTierTop,
  panelCentreX,
} from "../tam-kotter-geometry";
import { shapeTamKotterContent as C } from "../content";
import { showsThesis } from "../tam-kotter-walk";
import { TamKotterGlyph, type GlyphId } from "./TamKotterGlyphs";
import "./tam-kotter.css";

// ───────────────────── the tiers, in one table ─────────────────────

/**
 * One tier per ROLE, and NOT ONE OF THEM VARIES BY FRAME, BY LINK OR BY POSE.
 *
 * Hand-derived WCAG relative luminances over `src/styles/globals.css`'s hexes, brightest
 * first, under the headline's `--neutral-50` (0.9131):
 *
 *   role            token            luminance   what it paints
 *   verdict         --neutral-100     0.7835     18px serif — the thesis under both frames
 *   runner          --copper-100      0.7835     the rail's travelling mark and its five
 *                                                station flashes
 *   frameCloser     --neutral-200     0.6584     15px serif — each frame's own verdict
 *   frame.title     --copper-200       0.5917     12px mono caps — each frame's name
 *   current         --copper-200       0.5917     the left chain's travelling dots
 *   node.label      --copper-300       0.4029     11px mono caps — all ten node names
 *   glyph           --copper-300       0.4029     all ten animated marks (in the stylesheet)
 *   support         --neutral-300     0.3663     12–12.5px sans — captions, factors,
 *                                                and both attributions
 *   connector       --copper-400       0.2966     all eleven chain paths at 4px, and all
 *                                                eight arrowheads
 *   marker          --copper-500       0.2168     the 4×4 square beside each factor
 *   node.edge       --copper-700       0.0866     a node's 1px border — the deck's own
 *                                                hairline token (`.copper-rule`)
 *   frame.edge      --copper-800       0.0471     a frame's 1px border
 *   frame.rule      --copper-800       0.0471     the hairline under a frame's header
 *   node.fill       --copper-950       0.0081     a node's ground
 *   frame.fill      --neutral-900     0.0030     the stage's own — a frame is an outline
 *
 * ═══ THERE IS NO REST/LIT PAIR ON THIS STAGE AND THAT IS THE POINT. `MiddleOutBands.tsx`
 * one slide later declares two tiers for one object and lights it, because its whole
 * argument is that one of three equal rows matters more. This slide's argument is that
 * NEITHER of two frames matters more, so there is nothing here for a pose to brighten and
 * no property that could be added to one frame and not the other. A future edit that gave
 * either frame a second tier would be answering a question this slide does not ask.
 *
 * ═══ THE TEN NODES ARE ONE TIER AND THE FIVE LINKS ARE HALF OF THEM. Every node label on
 * the stage is `--copper-300` and every caption is `--neutral-300`, on both sides, top to
 * bottom, and every one of the ten animated marks is `--copper-300` too (declared in
 * `./tam-kotter.css`, because a stylesheet is where a stroke colour belongs). That is the
 * colour half of the no-third-ladder guardrail (`../content.ts` guardrail 2): the geometry
 * stops a link being ranked by size and this table stops it being ranked by light, and
 * between them there is no channel left in which five links could become five levels.
 *
 * ═══ THE TWO MOTION TIERS ARE THE ONE DEPARTURE IN THIS TABLE, AND IT IS DELIBERATE. Every
 * other graphic role sits BELOW `support`'s 0.3663, on the rule that a static graphic is
 * read as structure and must not outrank the strings it connects. `current` and `runner`
 * sit above it, and the reason is that they are not compared against the strings — they are
 * compared against the 4px `--copper-400` line they are painted directly on top of. A dot
 * one tier over its own line is invisible at projection distance; two tiers is the minimum
 * separation that reads, and it is the whole of what the extra light buys. Neither is
 * brighter than the closers or the thesis, so the reading order of the stage's PROSE is
 * untouched, and both vanish under `prefers-reduced-motion` — which is the other half of
 * why they are allowed to be loud: they are the only marks on the stage a reader can turn
 * off.
 *
 * ═══ THE RUNNER IS ONE TIER OVER THE CURRENT, AND THAT IS NOT A RANKING OF THE TWO MODELS.
 * It is a ranking of ONE MARK against FIFTEEN: the left chain carries roughly fifteen dots
 * at any moment and the right rail carries a single 34px segment for 8% of its cycle, so
 * equal brightness would make the runner the quieter half of the figure. What the two tiers
 * hold equal is PRESENCE — both loops run for as long as the slide is up — and that is the
 * property the two frames' equality actually rests on.
 *
 * ═══ THE FRAME IS AN OUTLINE AND THE NODES ARE FILLED, which is the inverse of what a
 * card layout would do and is deliberate. Two filled panels would read as two slides
 * pasted onto one stage; two outlined regions read as two frames of one argument, which is
 * what the line underneath then joins.
 *
 * ═══ `support` IS ONE VALUE FOR THREE ROLES — the two attributions, the ten node captions
 * and the four factors — and that is a decision rather than a shortcut. All three are
 * SUPPORTING text: a citation, a gloss and a named condition. `--neutral-300` is gh#50's
 * floor for prose on a dark stage and nothing on this stage rests below it.
 */
const TIER = {
  /** The two frames, and every value in here is painted twice. */
  frame: {
    edge: "var(--copper-800)",
    /** The stage's own ground — the frame is an outline, not a card. Declared rather
     *  than omitted so the decision is visible where the border is chosen. */
    fill: "var(--neutral-900)",
    /** The hairline under a frame's header. The frame's own edge value, because it is
     *  the same object continued inwards: a brighter divider would cut the header off
     *  from the frame instead of dividing it. */
    rule: "var(--copper-800)",
    /** A frame's name. One tier over the node labels below it, because it names the
     *  whole chain and they name its parts. */
    title: "var(--copper-200)",
  },
  /** THE TEN CARDS ARE NOT IN THIS TABLE, AND THE ABSENCE IS THE DECISION — see the
   *  paragraph above. Their border (`--copper-700`), ground (`--copper-950`) and label
   *  (`--copper-300`) are declared on `.tk-card` in `./tam-kotter.css`, because all three
   *  change under the pointer and an inline colour cannot be overridden by a `:hover` rule at
   *  any specificity. The ordinal's `--copper-400` is there for the same reason. */
  /** The two attributions, the ten captions and the four factors — see the table. */
  support: "var(--neutral-300)",
  /** The square beside each of the four factors. Copper rather than neutral so it reads
   *  as a MARK rather than as a period that lost its sentence. */
  marker: "var(--copper-500)",
  /** Every static mark either chain is built from — the left frame's five paths and four
   *  arrowheads, the right frame's rail, five ties and four arrowheads. ONE TIER FOR ALL
   *  OF THEM: a connector that was brighter on one side of the stage would say that chain
   *  was the real one, and a head brighter than the path it ends would read as a separate
   *  object sitting near a line. */
  connector: "var(--copper-400)",
  /** The LEFT chain's travelling dots. Two tiers over the path they ride — see the table. */
  current: "var(--copper-200)",
  /** The RIGHT rail's travelling mark and its five station flashes. One object, one tier. */
  runner: "var(--copper-100)",
  /** Each frame's own closer. Brighter than anything inside its chain, quieter than the
   *  line that belongs to neither frame. */
  frameCloser: "var(--neutral-200)",
  /** The thesis. The brightest text under the headline row. */
  verdict: "var(--neutral-100)",
} as const;

/** A box's border weight. `1px` is the deck's own, and `boxSizing: border-box` at every
 *  call site below keeps it INSIDE the rectangle `../tam-kotter-geometry.ts` cut, so a
 *  border is never a coordinate this file invented. */
const hairline = (edge: string) => `1px solid ${edge}`;

// ───────────────────── type registers ─────────────────────

/**
 * The mono LABEL register — the two frame titles at 12px/0.20em and the ten node labels
 * at 11px/0.16em, both uppercase because every mono string on this stage is a heading.
 *
 * TWO SIZES AND TWO TRACKINGS FROM ONE FUNCTION, and the tracking falls with the size on
 * purpose: 0.22em is the deck's mono eyebrow tracking at 11px in a full-width row, and a
 * node label lives in a 212px box where that much air costs a character. Both values are
 * what `../tam-kotter-geometry.ts` measured its budgets against, so neither is free to
 * drift here.
 */
function mono(size: number, color: string | undefined, tracking: string): CSSProperties {
  return {
    fontFamily: "var(--mono)",
    fontSize: size,
    letterSpacing: tracking,
    textTransform: "uppercase",
    lineHeight: 1.3,
    // `undefined` OMITS THE PROPERTY, and two of the four call sites want exactly that: a
    // card's label and its ordinal take their colour from `./tam-kotter.css` so a `:hover`
    // rule can move them. React drops an `undefined` style value, so nothing is written.
    color,
  };
}

/** The CITATION register — the model, its author and its year. 12.5px sans on 1.35, half
 *  a pixel over the caption register, because it is the one line on this stage a leader
 *  might copy down. Upright: the deck's italics belong to `highlight()`. */
const attribution: CSSProperties = {
  fontFamily: "var(--sans)",
  fontSize: 12.5,
  lineHeight: 1.35,
  color: TIER.support,
};

/** The CAPTION register — the ten node glosses and the four named factors, cut for ONE
 *  line each (`NODE_CAPTION_HEIGHT` / `FACTOR_HEIGHT`, which are the same 16). */
const caption: CSSProperties = {
  fontFamily: "var(--sans)",
  fontSize: 12,
  lineHeight: 1.3,
  color: TIER.support,
};

/**
 * The prose register — each frame's closer at 15 and the thesis at
 * {@link THESIS_FONT_SIZE}.
 *
 * THE THESIS'S SIZE IS IMPORTED AND NOT WRITTEN HERE, unlike every other number in this
 * section, and that is the one exception in the file. `THESIS_HEIGHT` is cut from it and
 * `NAV_ZONE_CLEARANCE` is cut from that, so a size that lived only in this renderer could be
 * raised back to 22 without the line box following it — and the line would paint into the
 * NavBar band with nothing to report it.
 *
 * UPRIGHT SERIF, and the only italics on this stage are the keywords `highlight()` places.
 * `mandate-levers` sets its closer in serif ITALIC and this stage deliberately does not
 * follow it: an italic keyword inside an already-italic sentence changes colour and nothing
 * else, which spends the deck's one emphasis channel for free.
 */
function prose(size: number, color: string): CSSProperties {
  return {
    fontFamily: "var(--serif)",
    fontSize: size,
    lineHeight: 1.3,
    color,
    margin: 0,
  };
}

// ───────────────────── the build ─────────────────────

/**
 * THE WHOLE FIGURE'S ARRIVAL, IN MILLISECONDS FROM MOUNT — the timetable that replaced five
 * presenter clicks.
 *
 * IT RUNS ON MOUNT AND NOT ON A STEP, because `src/deck/Deck.tsx` renders only the active
 * slide and the component type changes on every slide move, so mounting IS arriving. See
 * `../tam-kotter-walk.ts` on why the build is not a pose.
 *
 * ═══ THE ORDER IS THE ARGUMENT, WHICH IS THE WHOLE POINT OF SPENDING 1.6 SECONDS ON IT. The
 * retired six-pose walk guaranteed the room met the models in the order the argument runs;
 * two poses cannot guarantee it, and this table is what buys it back. Read down the numbers
 * and you get the slide's reading order: the frames outline, the two models name and cite
 * themselves, the causal chain grows downward out of its own source while the rail draws down
 * the right edge, the links land on the rail in sequence, the two verdicts arrive together,
 * and the motion starts once every line it rides on has finished drawing.
 *
 * ═══ THE TWO FRAMES ARE INTERLEAVED AND NOT SEQUENCED, and that is the equality this figure
 * is built on expressed in time. `chain` is one number and BOTH halves take it: the left
 * frame's source node and the right frame's rail arrive on the same millisecond, and
 * `closer` is one number that both verdicts take. A table that built the left frame and then
 * the right would say the acceptance model is the premise and the change model the
 * consequence — which is precisely the reading the thesis exists to refuse.
 *
 * ═══ WHAT DOES NOT GET ITS OWN NUMBER, and each absence is a decision:
 *
 *   · THE FOUR FACTORS SHARE ONE BEAT. They are a SET — nothing in the model orders them —
 *     and staggering them by even 90ms would say "first this, then that" about four
 *     conditions that hold simultaneously. `../content.ts` argues that on the tuple and
 *     `../tam-kotter-geometry.ts` lays them out as a 2×2 block for the same reason.
 *   · THE TWO BELIEFS SHARE ONE BEAT, for the same reason: the acceptance model treats them
 *     as a pair and ranks neither, and 90ms between them is the smallest possible way to
 *     rank one.
 *   · A LINK AND ITS TIE SHARE ONE BEAT. A box that appeared and was attached 90ms later
 *     would be a box that had to be connected up.
 *   · THE TITLE, THE ATTRIBUTION AND THE HEADER HAIRLINE SHARE ONE BEAT. A frame that named
 *     itself and then, 90ms later, admitted where the name came from would read as a
 *     citation being appended rather than as a source being given.
 *
 * ═══ THE FIVE LINKS DO GET A BEAT EACH, and that is the one stagger on the stage that is
 * about ORDER rather than about grouping — 90ms apart, which is reading order and not a
 * countdown. `../tam-kotter-walk.ts` explains the difference between that and five poses:
 * a stagger is 90ms the room does not consciously see, and a pose is a claim the presenter
 * stops on. The four left-hand connectors are staggered against their nodes for the same
 * reason — each path lands half a beat behind the box it leaves, so the room sees the line
 * being drawn OUT of one node and INTO the next rather than appearing beside both.
 */
const BUILD = {
  /** The two frame outlines. 120ms keeps the first mark off the same frame as the slide
   *  change, which is the leader tree's standing lead-in. */
  box: 120,
  /** Both headers, entire — two titles, two attributions, two hairlines. */
  header: 210,
  /** THE LEFT FRAME'S SOURCE NODE AND THE RIGHT FRAME'S RAIL, on one number. */
  chain: 340,
  /** The four factors inside the source node, and the first link on the rail. */
  chainSecond: 430,
  /** The fork, drawn out of the source node. */
  tamFork: 480,
  /** The two beliefs, landing on the fork's two arrowheads. */
  tamBeliefs: 570,
  /** The merge, drawn out of both beliefs. */
  tamMerge: 660,
  /** The intention the two beliefs meet in. */
  tamIntention: 750,
  /** The drop from the intention to the use it becomes. */
  tamDrop: 840,
  /** The end of the causal chain. */
  tamUse: 930,
  /** How far apart the five links land: 90ms — the leader tree's stagger, unchanged. */
  linkStagger: 90,
  /** BOTH CLOSERS, on one number, a clear beat after the last thing either chain does. The
   *  full beat of silence is the difference between a verdict and one more node. */
  closer: 1120,
  /** THE MOTION, LAST. Every path it rides on has finished drawing by 1.0s; 1240 leaves the
   *  drawn figure alone on the stage for a moment first, so a room reads the STRUCTURE
   *  before anything starts moving through it. Motion that arrived with the lines would make
   *  the build itself look like the animation. */
  motion: 1240,
} as const;

/**
 * The runner's period: 4200ms — PINNED to `.tk-runner` in `./tam-kotter.css`.
 *
 * THE ONE DURATION THIS FILE HAS TO KNOW, and it knows it because the five station flashes
 * are phased against it: a station's delay is `kotterStationOffset(i) × RUNNER_MS`, which is
 * the moment the runner reaches that station. The offsets are geometry and the period is
 * time, so the multiplication has to happen somewhere, and it happens here rather than as
 * five hand-written delays in the stylesheet — five literals would be five chances for the
 * rail and the flashes to drift apart the first time the period changed.
 *
 * IF IT CHANGES, IT CHANGES IN TWO PLACES. That is stated rather than solved: the honest
 * alternative is a CSS custom property written from here, and a `--tk-runner-ms` that the
 * stylesheet had to read would put this figure's rhythm in an inline style where the
 * reduced-motion block cannot reach it. Two places and a comment is the cheaper trade.
 */
const RUNNER_MS = 4200;

// ───────────────────── the parts ─────────────────────

/** An inline animation delay — the whole of what a build step is once it reaches an
 *  element. Written once so no call site below has to spell the unit. */
const at = (ms: number): CSSProperties => ({ animationDelay: `${ms}ms` });

/**
 * The ordinal printed on a numbered card, from its zero-based position: `01`…`05`.
 *
 * ONE FORMATTER FOR BOTH CHAINS, AND WHAT EACH ONE FEEDS IT IS THE DIFFERENCE THAT MATTERS.
 * The ordered chain passes its LINK index, because the model publishes five steps in an order.
 * The causal chain passes its TIER index (`TAM_TIER`), because its second tier holds two cards
 * the model treats as a pair — so both beliefs are handed `TAM_TIER.BELIEFS` and both print
 * `02`. One function, two callers, and the pair falls out of the tier table rather than out of
 * a special case here.
 *
 * FORMATTED FROM AN INDEX AND NOT READ FROM THE COPY, which is the half of the no-numeral
 * guardrail that survives the owner's decision to print these at all (see the "ordinal on a
 * card" section in `../tam-kotter-geometry.ts` for the whole argument). `../content.ts`'s
 * `ChainNode` still has no `order`, `step`, `index` or `badge` field, so nobody can reorder
 * either chain and leave the numbers behind — the numbers ARE the position, computed at the
 * moment of render.
 *
 * ZERO-PADDED TO TWO DIGITS, which is a typographic decision and not an arithmetic one:
 * `1`…`5` in a 26px right-aligned box are five marks of two different widths, and `01`…`05`
 * are five marks of one width. One width is what makes a column of numerals read as an index
 * rather than as five separate labels.
 *
 * IT IS DELIBERATELY NOT EXPORTED AND DELIBERATELY TAKES NO PREFIX. A version that could be
 * called with `"P"` or `"L"` would be the third ordered VOCABULARY §6.6 actually refuses —
 * see the geometry module on the difference between an index and a scale.
 */
const ordinalFor = (i: number): string => String(i + 1).padStart(2, "0");

/**
 * One structural connector, drawn.
 *
 * `pathLength={1}` IS NOT OPTIONAL AND IS SET HERE RATHER THAN LEFT TO THE CALLER. It is
 * the other half of `tk-draw`'s `stroke-dasharray: 1` in `./tam-kotter.css`: without it the
 * dash unit is user units and one dash of "1" would paint a single pixel of a 152px fork
 * arm. Setting it in the one component that renders a drawn path means the pair cannot come
 * apart.
 */
function Wire({ d, slot, delay }: { d: string; slot: string; delay: number }) {
  return (
    <path
      className="tk-draw"
      pathLength={1}
      d={d}
      data-testid={`tam-kotter-wire-${slot}`}
      style={at(delay)}
    />
  );
}

/**
 * One arrowhead, pointing DOWN. All eight of this stage's heads are one of these.
 *
 * IT FADES RATHER THAN DRAWS, and that is not laziness: a triangle has no direction to be
 * drawn in, so a dash-offset animation on it would paint a growing arc of outline that reads
 * as a rendering artefact. The head arrives a quarter of a beat after the path it terminates,
 * which is what makes the line look like it is arriving AT something.
 *
 * `arrowPoints` IS THE ONLY PLACE THE TRIANGLE IS COMPUTED. A caller passes an axis and a
 * top edge, which is how `../tam-kotter-geometry.ts` thinks about a head, and the tip is
 * always on the top edge of whatever it points at.
 */
function Head({
  centreX,
  top,
  slot,
  delay,
}: {
  centreX: number;
  top: number;
  slot: string;
  delay: number;
}) {
  return (
    <polygon
      className="tk-fade-in"
      points={arrowPoints(centreX, top)}
      fill={TIER.connector}
      stroke="none"
      data-testid={`tam-kotter-head-${slot}`}
      style={at(delay)}
    />
  );
}

/**
 * One node — a bordered box holding a mono LABEL over a sans CAPTION, with an animated
 * MARK on its right.
 *
 * TEN CALLS, ONE COMPONENT, AND THAT IS STRUCTURAL RATHER THAN TIDY. The four constructs of
 * the acceptance model and the five links of the change model are the same kind of object
 * and are rendered by the same code, so there is no place for the right-hand five to acquire
 * a badge, an index or a second tier that the left-hand five do not have. The moment this
 * file needed two node components it would have two node vocabularies, and the first thing
 * the second one would grow is a number.
 *
 * THE GLYPH IS A PROP AND NOT A LOOKUP INSIDE THIS COMPONENT, so the mapping from node to
 * mark is visible at the ten call sites where the nodes are placed rather than hidden in a
 * table a reader has to go and find. `GlyphId` makes an unmapped node a type error.
 *
 * `children` IS FOR THE ONE NODE THAT CARRIES MORE — the top of the causal chain, which
 * lists four named factors under its caption. `../tam-kotter-geometry.ts` gives that one
 * node its own height and `../content.ts` gives it its own type, so the extra content
 * cannot appear in a box that was not cut for it.
 */
function NodeBox({
  node,
  glyph,
  delay,
  left,
  top,
  width,
  height,
  ordinal,
  children,
}: {
  node: { id: string; label: string; caption: string };
  glyph: GlyphId;
  delay: number;
  left: number;
  top: number;
  width: number;
  height: number;
  ordinal?: string;
  children?: ReactNode;
}) {
  const textLeft = nodeTextLeft(left);
  // TWO MEASURES AND NOT ONE: the ordinal sits on the LABEL's row, so it is charged to the
  // label and the caption keeps the full width. See `nodeTextWidth` in
  // `../tam-kotter-geometry.ts` — charging both would wrap a belief card's question into the
  // merge below it.
  const labelWidth = nodeLabelWidth(width, ordinal !== undefined);
  const captionWidth = nodeTextWidth(width);
  return (
    <Reveal
      on
      className="tk-card"
      delay={delay}
      data-testid={`tam-kotter-node-${node.id}`}
      // NO `border`, NO `backgroundColor` AND NO `boxSizing` HERE — all three are on
      // `.tk-card` in `./tam-kotter.css`, which is what lets the hover rule reach them (an
      // inline declaration outranks every stylesheet rule at any specificity). `border-box`
      // moved with them: a content-box border would make every card 48 tall against chains
      // budgeted at 46 and push both frames' floors 10px down.
      style={{ position: "absolute", left, top, width, height }}
    >
      {/* NO `highlight()` ON EITHER LINE, AND NONE ON ANY MONO OR CAPTION STRING ON THIS
          STAGE. The ten labels are names and the ten captions are one-line glosses; both
          carry no `*Kw` sibling by construction (`../content.ts`'s keyword rule), and a
          copper italic inside an 11px uppercase label would emphasise a fragment of a
          published construct's name and read as a rendering fault. */}
      <div
        className="tk-card-label"
        data-testid={`tam-kotter-node-${node.id}-label`}
        style={{
          position: "absolute",
          left: textLeft - left,
          top: nodeLabelTop(top) - top,
          width: labelWidth,
          height: NODE_LABEL_HEIGHT,
          // NO COLOUR — `.tk-card-label` inherits the card's own, so one hover rule on the
          // card brightens the label and leaves the caption at `TIER.support`.
          ...mono(11, undefined, "0.16em"),
          whiteSpace: "nowrap",
        }}
      >
        {node.label}
      </div>
      <div
        data-testid={`tam-kotter-node-${node.id}-caption`}
        style={{
          position: "absolute",
          left: textLeft - left,
          top: nodeCaptionTop(top) - top,
          width: captionWidth,
          height: NODE_CAPTION_HEIGHT,
          ...caption,
        }}
      >
        {node.caption}
      </div>
      {/* THE ORDINAL, top right, and only on the cards a caller hands one to — which is the
          five links of the ordered chain and nothing else. `../tam-kotter-geometry.ts`'s
          "the ordinal on a card" section carries the whole argument for why this exists at
          all, why the acceptance model's five nodes must never be given one, and what keeps
          an index from becoming a level.

          `textAlign: right` IN A FIXED BOX, so the five numerals align on their right edge
          and stay aligned if the chain ever reaches double figures. */}
      {ordinal !== undefined ? (
        <div
          className="tk-card-index"
          data-testid={`tam-kotter-index-${node.id}`}
          style={{
            position: "absolute",
            left: indexLeft(left, width) - left,
            top: indexTop(top) - top,
            width: INDEX_WIDTH,
            height: INDEX_HEIGHT,
            textAlign: "right",
            // NO COLOUR — `.tk-card-index` owns it, and its hover tier with it.
            ...mono(12, undefined, "0.06em"),
          }}
        >
          {ordinal}
        </div>
      ) : null}

      {/* THE MARK, in the node's own coordinates — which is why both offsets are a stage
          coordinate minus the node's. `glyphTop` centres it on the label-and-caption block
          rather than on the box, so the one tall node keeps its mark up on the label row
          instead of dropping it beside the factor block. */}
      <div
        style={{
          position: "absolute",
          left: glyphLeft(left) - left,
          top: glyphTop(top) - top,
        }}
      >
        <TamKotterGlyph id={glyph} size={GLYPH_SIZE} testId={`tam-kotter-glyph-${node.id}`} />
      </div>
      {children}
    </Reveal>
  );
}

// ───────────────────── the figure ─────────────────────

export interface TamKotterFramesProps {
  /** 0 or 1. See `../tam-kotter-walk.ts` for what each pose argues, and why the ten nodes,
   *  the eleven paths and the two closers all arrive on the first one. */
  pose: number;
}

export function TamKotterFrames({ pose }: TamKotterFramesProps) {
  // THE POSE, ASKED WHERE IT IS ANSWERED — one question, because the slide has one gate.
  const thesis = showsThesis(pose);

  // THE TWO FRAMES, AS ONE LIST, and this is the strongest statement this file makes: the
  // box, the title, the attribution and the hairline are rendered by ONE loop, so there is
  // no per-frame code path for an edit to make one of them wider, brighter or earlier. What
  // differs between the two entries is three strings.
  const frames = [
    {
      slot: "tam",
      panel: TAM_PANEL,
      title: C.tam.frameLabel,
      attribution: C.tam.attribution,
    },
    {
      slot: "kotter",
      panel: KOTTER_PANEL,
      title: C.kotter.frameLabel,
      attribution: C.kotter.attribution,
    },
  ];

  const tamInner = panelInnerLeft(TAM_PANEL);
  // THE LEFT FRAME'S CENTRE LINE, AND THERE IS NO `kotterCentre` BESIDE IT. The right
  // frame's chain runs on `KOTTER_RAIL_CENTRE_X` — its inner LEFT edge — and that absence is
  // the asymmetry the figure is built on rather than an omission: two chains centred in two
  // identical frames give the room two columns and one reading.
  const tamCentre = panelCentreX(TAM_PANEL);
  const kotterInner = panelInnerLeft(KOTTER_PANEL);

  // THE FIVE PATHS OF THE LEFT CHAIN, CUT ONCE AND USED TWICE — once by the structural
  // stroke that draws, and again by the current that runs down it. Two `d` strings for one
  // connector is how a current ends up travelling a line the eye cannot see.
  const tamWires = [
    ...C.tam.beliefs.map((belief, column) => ({
      slot: `tam-fork-${belief.id}`,
      d: tamForkPath(TAM_PANEL, column),
      delay: BUILD.tamFork,
    })),
    ...C.tam.beliefs.map((belief, column) => ({
      slot: `tam-merge-${belief.id}`,
      d: tamMergePath(TAM_PANEL, column),
      delay: BUILD.tamMerge,
    })),
    { slot: "tam-drop", d: tamStraightPath(TAM_PANEL), delay: BUILD.tamDrop },
  ];

  // THE RAIL AND ITS FIVE TIES, on the same footing and for the same reason.
  const kotterWires = [
    { slot: "kotter-rail", d: kotterRailPath(), delay: BUILD.chain },
    ...C.kotter.links.map((link, i) => ({
      slot: `kotter-tie-${link.id}`,
      d: kotterTiePath(i),
      delay: BUILD.chainSecond + i * BUILD.linkStagger,
    })),
  ];

  return (
    <>
      {/* ───── THE TWO FRAMES ───── */}
      {frames.map((frame) => (
        <Fragment key={frame.slot}>
          <Reveal
            on
            delay={BUILD.box}
            data-testid={`tam-kotter-frame-${frame.slot}`}
            style={{
              position: "absolute",
              left: panelLeft(frame.panel),
              top: CONTENT_TOP,
              width: PANEL_WIDTH,
              height: PANEL_HEIGHT,
              boxSizing: "border-box",
              border: hairline(TIER.frame.edge),
              backgroundColor: TIER.frame.fill,
            }}
          />
          <Reveal
            on
            delay={BUILD.header}
            data-testid={`tam-kotter-title-${frame.slot}`}
            style={{
              position: "absolute",
              left: panelInnerLeft(frame.panel),
              top: FRAME_TITLE_TOP,
              width: PANEL_INNER_WIDTH,
              height: FRAME_TITLE_HEIGHT,
              ...mono(12, TIER.frame.title, "0.20em"),
              whiteSpace: "nowrap",
            }}
          >
            {frame.title}
          </Reveal>
          <Reveal
            on
            delay={BUILD.header}
            data-testid={`tam-kotter-attribution-${frame.slot}`}
            style={{
              position: "absolute",
              left: panelInnerLeft(frame.panel),
              top: ATTRIBUTION_TOP,
              width: PANEL_INNER_WIDTH,
              height: ATTRIBUTION_HEIGHT,
              ...attribution,
              whiteSpace: "nowrap",
            }}
          >
            {frame.attribution}
          </Reveal>
          <Reveal
            on
            delay={BUILD.header}
            data-testid={`tam-kotter-header-rule-${frame.slot}`}
            style={{
              position: "absolute",
              left: panelInnerLeft(frame.panel),
              top: HEADER_RULE_TOP,
              width: PANEL_INNER_WIDTH,
              height: HEADER_RULE_HEIGHT,
              backgroundColor: TIER.frame.rule,
            }}
          />
        </Fragment>
      ))}

      {/* ═════ THE WIRES · ONE `<svg>` FOR BOTH CHAINS ═════
          ONE ELEMENT AND NOT TWO, though it spans two frames. The two chains never share a
          coordinate and could have had an `<svg>` each; what a single stage-sized overlay
          buys is that every path in the figure is authored in the STAGE's own coordinates,
          which are the coordinates `../tam-kotter-geometry.ts` computes and the vertical
          budget in its header is written in. Two frame-local viewBoxes would mean two
          coordinate translations, and a translation is where a fork stops meeting the node
          above it.

          IT IS DECLARED AFTER THE FRAMES AND BEFORE THE NODES, which is the paint order the
          figure needs: the frames' own `--neutral-900` ground would cover the wires if they
          came first, and the nodes' `--copper-950` ground covers the last pixel of any path
          that runs under a box edge. SVG has no z-index; document order is the whole
          mechanism.

          `pointerEvents: none` BECAUSE THE STAGE IS A CLICK TARGET. `src/deck/Slide.tsx`
          advances a step on a click anywhere, and a 1280×720 transparent overlay that
          swallowed pointer events would make the whole slide unclickable — the one bug this
          construction could introduce that no visual check would find.

          `overflow: visible` FOR THE HEADS, whose tips sit exactly on a node's top edge and
          whose flanks would otherwise be clipped by a hairline at some device pixel ratios. */}
      <svg
        viewBox={`0 0 ${STAGE.width} ${STAGE.height}`}
        width={STAGE.width}
        height={STAGE.height}
        aria-hidden="true"
        data-testid="tam-kotter-wires"
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          overflow: "visible",
          pointerEvents: "none",
        }}
      >
        {/* ───── THE LEFT CHAIN · A FAN THAT SPLITS AND RETURNS ─────
            Two fork arms out of the source node, two merge arms out of the two beliefs, one
            drop into the use they become — and four heads. Each arm is a COMPLETE route from
            cause to effect (see `tamForkPath`), so the draw grows the whole way down and the
            current runs the whole way without a junction to cross. The two arms overlap
            exactly on their shared stem, which is invisible at one stroke and one tier. */}
        <g fill="none" stroke={TIER.connector} strokeWidth={RULE_THICKNESS}>
          {tamWires.map((wire) => (
            <Wire key={wire.slot} d={wire.d} slot={wire.slot} delay={wire.delay} />
          ))}
        </g>
        {C.tam.beliefs.map((belief, column) => (
          <Head
            key={belief.id}
            centreX={tamNodeCentreX(TAM_PANEL, TAM_TIER.BELIEFS, column)}
            top={tamArrowTop(TAM_TIER.SOURCE)}
            slot={`tam-fork-${belief.id}`}
            delay={BUILD.tamFork + BUILD.linkStagger / 2}
          />
        ))}
        <Head
          centreX={tamCentre}
          top={tamArrowTop(TAM_TIER.BELIEFS)}
          slot="tam-merge"
          delay={BUILD.tamMerge + BUILD.linkStagger / 2}
        />
        <Head
          centreX={tamCentre}
          top={tamArrowTop(TAM_TIER.INTENTION)}
          slot="tam-drop"
          delay={BUILD.tamDrop + BUILD.linkStagger / 2}
        />

        {/* ───── THE LEFT CHAIN'S CURRENT ─────
            The acceptance model's claim as motion: belief is PRODUCED downstream of
            conditions somebody sets, continuously, for as long as those conditions hold. It
            is a circuit and it has no beginning — which is exactly what the frame opposite
            is not. `./tam-kotter.css` argues the pair.

            THE FADE IS ON THIS `<g>` AND THE LOOP IS ON THE PATHS INSIDE IT. One element
            carrying both would carry one `animation` shorthand, and any later class change
            on it would restart the loop as well as the fade. */}
        <g className="tk-fade-in" style={at(BUILD.motion)} data-testid="tam-kotter-current">
          {/* HALF THE CONNECTOR'S WIDTH, so the `--copper-400` line stays continuous
              under the dots and 1px of it shows on each flank — see `CURRENT_THICKNESS`,
              which records the screenshot that made this a correction. At the connector's
              own width the dots REPLACE the line for their own length and both fan bars
              come out as chains of beads, which reads as a dashed connector. The RUNNER
              opposite is deliberately NOT held to this: it is one segment whose job is to
              be the rail's lit position. */}
          <g fill="none" stroke={TIER.current} strokeWidth={CURRENT_THICKNESS} strokeLinecap="round">
            {tamWires.map((wire) => (
              <path key={wire.slot} className="tk-current" d={wire.d} />
            ))}
          </g>
        </g>

        {/* ───── THE RIGHT CHAIN · ONE RAIL, FIVE TIES, FOUR HEADS ─────
            ONE UNBROKEN PATH from the top edge of the first link to the bottom edge of the
            last, down the frame's inner LEFT edge rather than its centre. It is the change
            model's sequence drawn as one object, and it is what makes this half of the stage
            structurally different from the other half at a glance.

            IT IS ALSO THE ANTI-LADDER GUARANTEE IN ONE ELEMENT. There is no per-gap segment
            here — one path spans all four intervals — so there is nothing for an edit to
            lengthen, thicken or fade per step. The four things that DO vary down this rail
            are four heads of one size at four positions, and a position is not a rank. */}
        <g fill="none" stroke={TIER.connector} strokeWidth={RULE_THICKNESS}>
          {kotterWires.map((wire) => (
            <Wire key={wire.slot} d={wire.d} slot={wire.slot} delay={wire.delay} />
          ))}
        </g>
        {C.kotter.links.slice(0, -1).map((link, i) => (
          <Head
            key={link.id}
            centreX={KOTTER_RAIL_CENTRE_X}
            top={kotterArrowTop(i)}
            slot={`kotter-${link.id}`}
            delay={BUILD.chainSecond + (i + 0.5) * BUILD.linkStagger}
          />
        ))}

        {/* ───── THE RUNNER, AND THE FIVE STATIONS IT LIGHTS ─────
            The change model's claim as motion: ONE pass, in one direction, touching five
            stations in order. A 34px bright segment sweeps the whole rail once per
            {@link RUNNER_MS}, and each tie flashes at the moment the runner reaches it —
            `kotterStationOffset(i) × RUNNER_MS` is that moment, and the offsets are `i ×
            pitch` apart so the five flashes are as evenly spaced in time as the boxes are in
            space.

            IT IS THE ONE PLACE THIS FIGURE SAYS "THE ORDER MATTERS" WITHOUT PRINTING A
            NUMERAL. `../content.ts`'s closer says it in a sentence the room can disagree
            with; this says it in a mechanism the room can watch. Neither says it as a scale. */}
        <g className="tk-fade-in" style={at(BUILD.motion)} data-testid="tam-kotter-runner">
          <path
            className="tk-runner"
            d={kotterRailPath()}
            fill="none"
            stroke={TIER.runner}
            strokeWidth={RULE_THICKNESS}
          />
          {C.kotter.links.map((link, i) => (
            <path
              key={link.id}
              className="tk-station"
              d={kotterTiePath(i)}
              fill="none"
              stroke={TIER.runner}
              strokeWidth={RULE_THICKNESS}
              data-testid={`tam-kotter-station-${link.id}`}
              style={at(kotterStationOffset(i) * RUNNER_MS)}
            />
          ))}
        </g>
      </svg>

      {/* ═════ THE LEFT FRAME · THE CAUSAL CHAIN ═════ */}

      {/* ───── WHAT SHAPES BELIEF ─────
          The one node on the stage that carries a list, and the top of the chain. Its mark
          is the only CONTROL in the set, because this is the only tier of the acceptance
          model a leader can reach — see `./TamKotterGlyphs.tsx`. */}
      <NodeBox
        node={C.tam.source}
        glyph="external-factors"
        ordinal={ordinalFor(TAM_TIER.SOURCE)}
        delay={BUILD.chain}
        left={tamNodeLeft(TAM_PANEL, TAM_TIER.SOURCE, 0)}
        top={tamTierTop(TAM_TIER.SOURCE)}
        width={tamNodeWidth(TAM_TIER.SOURCE)}
        height={SOURCE_NODE_HEIGHT}
      >
        {/* THE FOUR NAMED FACTORS, in a 2×2 block, each behind a 4×4 mark. ONE BEAT FOR ALL
            FOUR — see {@link BUILD}. The mark is a box and not a bullet character, so
            nothing in `../content.ts` has to carry a glyph that means "this is an item", and
            it is deliberately not a numeral and deliberately not one of the ten animated
            marks: a marked list is a set, a numbered list is an order, and four moving
            glyphs inside a node that already carries one would compete with the node they
            belong to. */}
        {C.tam.source.factors.map((factor, i) => {
          const columnLeft = factorColumnLeft(i);
          const rowTop = factorRowTop(i);
          const originLeft = tamNodeLeft(TAM_PANEL, TAM_TIER.SOURCE, 0);
          const originTop = tamTierTop(TAM_TIER.SOURCE);
          return (
            <Fragment key={factor}>
              <Reveal
                on
                delay={BUILD.chainSecond}
                data-testid={`tam-kotter-factor-mark-${i}`}
                style={{
                  position: "absolute",
                  left: columnLeft - originLeft,
                  top: factorMarkerTop(rowTop) - originTop,
                  width: FACTOR_MARKER_SIZE,
                  height: FACTOR_MARKER_SIZE,
                  backgroundColor: TIER.marker,
                }}
              />
              <Reveal
                on
                delay={BUILD.chainSecond}
                data-testid={`tam-kotter-factor-${i}`}
                style={{
                  position: "absolute",
                  left: factorTextLeft(columnLeft) - originLeft,
                  top: rowTop - originTop,
                  width: FACTOR_TEXT_WIDTH,
                  height: FACTOR_HEIGHT,
                  ...caption,
                }}
              >
                {factor}
              </Reveal>
            </Fragment>
          );
        })}
      </NodeBox>

      {/* ───── THE TWO BELIEFS ─────
          One width, one line, one delay. The model ranks neither and neither does this
          stage — see {@link BUILD}. The two marks differ in KIND and not in weight: a chart
          for the belief about usefulness, a ramp for the belief about effort. */}
      {C.tam.beliefs.map((belief, column) => (
        <NodeBox
          key={belief.id}
          node={belief}
          glyph={column === 0 ? "usefulness" : "ease-of-use"}
          // BOTH BELIEF CARDS SHOW `02`, AND THE INDEX IS THE TIER RATHER THAN THE COLUMN.
          // The acceptance model treats the two as a PAIR and orders neither, so `02` and
          // `03` here would print a sequence the literature denies and the room would leave
          // believing usefulness is weighed before effort. Two cards carrying one numeral say
          // the true thing — one stage, in parallel — in the channel the numbers are already
          // in. `../tam-kotter-geometry.ts`'s "ordinal on a card" section argues it at length.
          ordinal={ordinalFor(TAM_TIER.BELIEFS)}
          delay={BUILD.tamBeliefs}
          left={tamNodeLeft(TAM_PANEL, TAM_TIER.BELIEFS, column)}
          top={tamTierTop(TAM_TIER.BELIEFS)}
          width={tamNodeWidth(TAM_TIER.BELIEFS)}
          height={NODE_HEIGHT}
        />
      ))}

      <NodeBox
        node={C.tam.intention}
        glyph="intention"
        ordinal={ordinalFor(TAM_TIER.INTENTION)}
        delay={BUILD.tamIntention}
        left={tamNodeLeft(TAM_PANEL, TAM_TIER.INTENTION, 0)}
        top={tamTierTop(TAM_TIER.INTENTION)}
        width={tamNodeWidth(TAM_TIER.INTENTION)}
        height={NODE_HEIGHT}
      />

      <NodeBox
        node={C.tam.use}
        glyph="actual-use"
        ordinal={ordinalFor(TAM_TIER.USE)}
        delay={BUILD.tamUse}
        left={tamNodeLeft(TAM_PANEL, TAM_TIER.USE, 0)}
        top={tamTierTop(TAM_TIER.USE)}
        width={tamNodeWidth(TAM_TIER.USE)}
        height={NODE_HEIGHT}
      />

      {/* ═════ THE RIGHT FRAME · FIVE LINKS ON THE RAIL ═════
          THE INDEX REACHES THE POSITION, THE DELAY AND THE STATION PHASE, AND NOTHING ELSE.
          `i` is used four times below — by `kotterLinkTop`, by the delay, by the glyph map
          and (in the `<svg>` above) by `kotterStationOffset` — and never as `children`.
          There is no badge element, no counter and no ordinal string anywhere in this block,
          and `../content.ts` carries no field one could be built from.

          EVERY LINK TAKES THE SAME TWO CONSTANTS FOR ITS BOX. `KOTTER_LINK_LEFT` and
          `KOTTER_LINK_WIDTH` are not functions of `i` and there is no third argument to
          reach for: a link cannot be indented, inset or widened to rank it, which is the
          same guarantee `kotterLinkTop`'s `i × pitch` makes vertically. */}
      {C.kotter.links.map((link, i) => (
        <NodeBox
          key={link.id}
          node={link}
          glyph={link.id as GlyphId}
          delay={BUILD.chainSecond + i * BUILD.linkStagger}
          left={KOTTER_LINK_LEFT}
          top={kotterLinkTop(i)}
          width={KOTTER_LINK_WIDTH}
          height={NODE_HEIGHT}
          ordinal={ordinalFor(i)}
        />
      ))}

      {/* ═════ THE TWO CLOSERS, ON ONE LINE AND ON ONE BEAT ═════
          A full beat after either chain finishes, which is what makes them verdicts rather
          than one more node each — and on the SAME beat as each other, which is the last of
          the two frames' equalities. The left one restates what its chain has just shown;
          the right one makes a claim its chain does not make, and carries the one sentence
          that says the order matters. */}
      <Reveal
        on
        as="p"
        delay={BUILD.closer}
        data-testid="tam-kotter-closer-tam"
        style={{
          position: "absolute",
          left: tamInner,
          top: FRAME_CLOSER_TOP,
          width: PANEL_INNER_WIDTH,
          height: FRAME_CLOSER_HEIGHT,
          ...prose(15, TIER.frameCloser),
        }}
      >
        {highlight(C.tam.closer, C.tam.closerKw)}
      </Reveal>
      <Reveal
        on
        as="p"
        delay={BUILD.closer}
        data-testid="tam-kotter-closer-kotter"
        style={{
          position: "absolute",
          left: kotterInner,
          top: FRAME_CLOSER_TOP,
          width: PANEL_INNER_WIDTH,
          height: FRAME_CLOSER_HEIGHT,
          ...prose(15, TIER.frameCloser),
        }}
      >
        {highlight(C.kotter.closer, C.kotter.closerKw)}
      </Reveal>

      {/* ═════ THE THESIS ═════
          Full width, outside both frames, on the floor, and the only thing on this stage
          that waits for a click. It is the one object here that belongs to neither model and
          the only place the two frames touch — which is why it arrives after both of them
          are complete rather than beside them.

          `THESIS_TOP` puts its lowest pixel at y=620 against the NavBar hover band at y=632;
          the 12px between them is `NAV_ZONE_CLEARANCE` and nothing on this stage sits below
          it. The size is imported for the reason `prose` records. */}
      <Reveal
        on={thesis}
        as="p"
        delay={BUILD.box}
        data-testid="tam-kotter-thesis"
        style={{
          position: "absolute",
          left: THESIS_LEFT,
          top: THESIS_TOP,
          width: THESIS_WIDTH,
          height: THESIS_HEIGHT,
          ...prose(THESIS_FONT_SIZE, TIER.verdict),
        }}
      >
        {highlight(C.unifier, C.unifierKw)}
      </Reveal>
    </>
  );
}
