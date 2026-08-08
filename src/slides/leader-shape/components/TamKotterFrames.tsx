// Two framed chains, and the one line under both of them.
//
// THE FIGURE IS TWO FRAMES THAT ARE IDENTICAL IN EVERY RESPECT EXCEPT WHAT THEY SAY.
// Same width, same height, same top edge, same border, same ground, same header
// construction, same node idiom, same colour tiers, and two chains cut to end on the same
// pixel. `../tam-kotter-geometry.ts` holds every one of those equalities as arithmetic;
// this file holds the two things it deliberately does not — the colour tiers and the
// arrival delays — and spends neither of them on ranking one frame over the other.
//
// AND THE TWO CHAINS INSIDE THEM ARE SHAPED TO BE TOLD APART WITHOUT BEING READ, which is
// the one asymmetry on the stage and the reason the figure exists. The acceptance model
// FORKS and MERGES: a 280px bar with an arrowhead hanging off each end splits one source
// into two beliefs, and a second bar returns them to one intention. The change model RUNS
// STRAIGHT THROUGH: one unbroken spine down the frame's inner left edge, five links tied
// off it, four arrowheads on that one axis. A room that can read neither frame can still
// see that the left figure branches and the right figure does not — and that is exactly
// what the two published models say. The first cut of this figure drew both halves as
// columns of equal boxes joined by 2px ticks, and at projection distance a fork that no
// one can see is a bulleted list.
//
// WHY THE TWO FRAMES MUST BE EQUAL. The slide's claim is a conjunction: belief is why a
// person starts and sequence is why an organisation does not stop, and neither is
// sufficient. A stage that drew one frame wider, taller, brighter or earlier would be
// arguing that one of the two is the real answer and the other is the caveat — which is
// the opposite of the sentence printed under both of them.
//
// WHAT THE FIGURE REFUSES TO SAY, and each refusal is enforced by something concrete:
//
//   · NO NUMBER ON ANY LINK OF THE RIGHT-HAND CHAIN. §6.6 refuses a third ordered
//     vocabulary beside L1–L5 and P0–P3, and the reference this slide was drawn from
//     prints its five change steps as `01`…`05` badges on a rising staircase. Nothing in
//     this file renders an index: the five links are mapped for their POSITION and their
//     DELAY and the loop variable reaches no `children`. `../content.ts` has no ordinal
//     field for one to be printed from, and `../tam-kotter-geometry.ts` places all five
//     at one width, one left edge and `i × pitch`.
//   · NO RANK AMONG THE FIVE, AND NONE AMONG THE FOUR ON THE OTHER SIDE. One tier for all
//     nine node labels, one for all nine captions, one for all four factor marks — see
//     {@link TIER}. `mandate-levers` makes the identical call about its four levers and
//     for the identical reason: a brighter first item, or five items fading out down the
//     frame, is a ladder drawn without a single digit. THE SPINE AND ITS FOUR ARROWHEADS
//     ARE HELD TO THE SAME RULE: one rule for the whole sequence rather than four
//     segments, five ties of one length, four heads of one size. There is no per-step
//     mark on this stage for an edit to grade.
//   · NO STAIRCASE. `leader-mandate/mandate-phases-gates.tsx` owns the ascending-tread
//     idiom in this deck for P0–P3, and a second one here would read as a maturity scale
//     however carefully it was captioned. A spine is the opposite object: every stop on
//     it is the same distance from the line and the same distance from its neighbours.
//   · NO LETTER AND NO FIGURE NUMBER. `FigLabel` takes a LABEL only; the composer
//     supplies the rest (§3.5). Nothing under this directory names one.
//
// EIGHT ARROWHEADS, AND NOT ONE `<svg>` NODE — see the zero-SMIL paragraph below, which
// this figure still closes BY CONSTRUCTION. A head here is a `width: 0; height: 0` element
// with two transparent flanks and one coloured border, which is the idiom
// `mindset-section-c/components/C4LoopBackArrow.tsx` already uses in this deck; {@link Head}
// is the whole implementation. `MiddleOutBands.tsx` one slide later still draws none, and
// that is not an inconsistency this file has to resolve: its two marks are DIRECTION rules
// on two bands that point at each other, where the direction is said by which band a rule
// belongs to. Here the marks are CONNECTORS between boxes, and a connector with two
// identical ends states an adjacency where the model states a cause.
//
// RANK IS A COLOUR TIER AND OPACITY IS TIME — see {@link TIER}, which is the one place
// either decision is made. Opacity on this stage means "has not arrived yet": the right
// frame is absent for three poses and then present, and it is present at exactly the tiers
// the left frame has been at since pose 0. There is no dimmed state anywhere on this
// stage, for anything, at any pose. Attention is bought with added light, never subtracted
// (§7.1).
//
// ZERO SMIL NODES, at every pose, under any motion preference — and closed BY
// CONSTRUCTION the way `MiddleOutBands.tsx`, `leader-gap/components/NoSopBeats.tsx` and
// `leader-mandate/components/LeverBoard.tsx` close it: THIS FIGURE MOUNTS NO `<svg>` AT
// ALL, so there is no `<animate>`, `<animateTransform>`, `<animateMotion>`, `<set>` or
// `<animateColor>` to gate at mount and nothing for a reduced-motion census to inspect.
// The two frame boxes, the two header hairlines, the nine node boxes, the four factor
// marks, the twelve connector rules and the eight arrowheads are plain absolutely-positioned
// `<div>`s for exactly that reason — `../tam-kotter-geometry.ts` is shaped to make that
// possible and says so at its head, and the heads were added in the same shape rather than
// as an `<svg><marker>` precisely so this paragraph did not have to grow a `matchMedia`
// gate. The whole motion budget is `.fade`'s transition pair plus the
// `fadeReveal` keyframe `.fade.on` adds (`src/styles/globals.css`), and the global
// `prefers-reduced-motion: reduce` rule at the top of that stylesheet squashes BOTH
// channels to 0.01ms — so every pose rests on its finished frame under either preference,
// every pose renders COMPLETE, and there is no `matchMedia` gate to write.
// NO NEW KEYFRAME, NO NEW CLASS, NO NEW FONT, NO NEW LIBRARY.
//
// CSS VARS ONLY, NO HEX AND NO rgba() LITERAL, anywhere — including the connector rules,
// the eight arrowheads, the factor marks, the two header hairlines and both frame grounds.
// `transparent` appears twice per head and is a CSS-wide KEYWORD, not a colour literal: it
// names "no paint at all", which no token in `src/styles/globals.css` does or should.
//
// EVERY COORDINATE IS READ AND EVERY GATE IS ASKED. Not one number below is computed
// here: the placements come from `../tam-kotter-geometry.ts` and the poses from
// `../tam-kotter-walk.ts`, which is what stops this component forming its own opinion
// about where a link sits or what pose 3 means. The literals that DO appear are type
// registers — font sizes, tracking, line heights, a 1px border — and each one is a number
// that geometry module already assumed when it cut its boxes (see its vertical budget:
// 12px mono on 1.3, 12.5px sans, 11px mono, 12px sans, 15px serif, 22px serif).
//
// IT READS NO VARIANT AND NO BRAND, like `MiddleOutBands.tsx` beside it and unlike
// `./PillarOrbit.tsx`: issue #71 gives this slide no brand axis at all, so there is no
// `…For(brand)` prop to look for and both leader rooms read identical bytes off one
// stage. A published model says the same thing in both of them.
//
// `Fragment` is imported for its KEY and for nothing else: several of the loops below
// contribute two or three absolutely-positioned boxes each to one list, and a wrapping
// `<div>` would put a static block box into `.stage`'s own flow for no reason. A keyed
// fragment groups them without adding an element.
import { Fragment, type CSSProperties, type ReactNode } from "react";
// Section E's copy, the tree's de facto shared reveal primitive — the same import
// `MiddleOutBands.tsx`, `NoSopBeats.tsx` and `LeverBoard.tsx` make. `CopperRule` is
// deliberately NOT taken: it animates `scaleX` from the left, which reads as a line being
// DRAWN in one direction. Five of this stage's twelve rules are vertical, so it would not
// even apply to them — and on the two junction bars of the left frame's fans, a line drawn
// left to right would say one belief is reached before the other, which is the one thing
// those two marks exist to deny. It is also fixed at 1px, and every rule here is four.
import { Reveal } from "@/slides/foundation-core-section-e/components/Reveal";
import { highlight } from "@/components/highlight";
import {
  ARROW_HEAD_HALF_WIDTH,
  ARROW_HEAD_HEIGHT,
  ATTRIBUTION_HEIGHT,
  ATTRIBUTION_TOP,
  BODY_HEIGHT,
  BODY_TOP,
  CONTENT_TOP,
  FACTOR_HEIGHT,
  FACTOR_MARKER_SIZE,
  FACTOR_TEXT_WIDTH,
  FAN_SPAN_WIDTH,
  FAN_STEM,
  FRAME_CLOSER_HEIGHT,
  FRAME_CLOSER_TOP,
  FRAME_TITLE_HEIGHT,
  FRAME_TITLE_TOP,
  HEADER_RULE_HEIGHT,
  HEADER_RULE_TOP,
  KOTTER_LINK_LEFT,
  KOTTER_LINK_WIDTH,
  KOTTER_PANEL,
  KOTTER_SPINE_CENTRE_X,
  KOTTER_TIE_LEFT,
  KOTTER_TIE_LENGTH,
  NODE_CAPTION_HEIGHT,
  NODE_HEIGHT,
  NODE_LABEL_HEIGHT,
  PANEL_HEIGHT,
  PANEL_INNER_WIDTH,
  PANEL_WIDTH,
  RULE_THICKNESS,
  SOURCE_NODE_HEIGHT,
  TAM_PANEL,
  TAM_STRAIGHT_RULE_HEIGHT,
  TAM_TIER,
  UNIFIER_HEIGHT,
  UNIFIER_LEFT,
  UNIFIER_TOP,
  UNIFIER_WIDTH,
  arrowHeadLeft,
  factorColumnLeft,
  factorMarkerTop,
  factorRowTop,
  factorTextLeft,
  fanSpanLeft,
  kotterArrowTop,
  kotterLinkTop,
  kotterTieTop,
  nodeCaptionTop,
  nodeLabelTop,
  nodeTextLeft,
  nodeTextWidth,
  panelCentreX,
  panelInnerLeft,
  panelLeft,
  tamArrowTop,
  tamConnectorTop,
  tamNodeCentreX,
  tamNodeLeft,
  tamNodeWidth,
  tamTierTop,
  verticalRuleLeft,
} from "../tam-kotter-geometry";
import { shapeTamKotterContent as C } from "../content";
import {
  showsBeliefs,
  showsKotterCloser,
  showsSequence,
  showsTamCloser,
  showsUnifier,
  showsUse,
} from "../tam-kotter-walk";

// ───────────────────── the tiers, in one table ─────────────────────

/**
 * One tier per ROLE, and NOT ONE OF THEM VARIES BY FRAME, BY LINK OR BY POSE.
 *
 * Hand-derived WCAG relative luminances over `src/styles/globals.css`'s hexes, brightest
 * first, under the headline's `--neutral-50` (0.9131):
 *
 *   role            token            luminance   what it paints
 *   verdict         --neutral-100     0.7835     22px serif — the line under both frames
 *   frameCloser     --neutral-200     0.6584     15px serif — each frame's own verdict
 *   frame.title     --copper-200       0.5917     12px mono caps — each frame's name
 *   node.label      --copper-300       0.4029     11px mono caps — all nine node names
 *   support         --neutral-300     0.3663     12–12.5px sans — captions, factors,
 *                                                and both attributions
 *   connector       --copper-400       0.2966     all twelve chain rules at 4px, and all
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
 * ═══ THE NINE NODES ARE ONE TIER AND THE FIVE LINKS ARE FOUR OF THEM. Every node label
 * on the stage is `--copper-300` and every caption is `--neutral-300`, on both sides,
 * top to bottom. That is the colour half of the no-third-ladder guardrail (`../content.ts`
 * guardrail 2): the geometry stops a link being ranked by size and this table stops it
 * being ranked by light, and between them there is no channel left in which five links
 * could become five levels. `mandate-levers` states the same rule about its four levers.
 *
 * ═══ THE FRAME IS AN OUTLINE AND THE NODES ARE FILLED, which is the inverse of what a
 * card layout would do and is deliberate. Two filled panels would read as two slides
 * pasted onto one stage; two outlined regions read as two frames of one argument, which is
 * what the line underneath then joins. The fill channel is therefore unspent at the frame
 * level and available at the node level, where `--copper-950` over the stage's own ground
 * is just enough to make nine boxes read as objects in a chain rather than as nine ruled
 * cells.
 *
 * ═══ `support` IS ONE VALUE FOR THREE ROLES — the two attributions, the nine node
 * captions and the four factors — and that is a decision rather than a shortcut. All
 * three are SUPPORTING text: a citation, a gloss and a named condition. Ranking them
 * against each other would make a claim none of them is trying to make, and it would put
 * the attribution — the one string on this stage a leader might want to write down — into
 * a competition with a caption. `--neutral-300` is gh#50's floor for prose on a dark
 * stage and nothing on this stage rests below it.
 *
 * ═══ THE TWO GRAPHIC TIERS ARE NOT HELD TO THE TEXT FLOOR, for the reason `NoSopBeats.tsx`'s
 * marks are not: a rule is compared, not read.
 *
 * ═══ THE CONNECTOR TIER MOVED UP, `--copper-600` → `--copper-400`, AND IT MOVED PAST THE
 * FACTOR MARK ON THE WAY. This figure first shipped its chains as 2px rules in
 * `--copper-600`, one tier under the factor marks and two over the node borders, and both
 * halves of it read as a column of identically-sized boxes at projection distance: the fork
 * did not fork, the merge did not merge, and five links joined by four faint ticks read as
 * a bulleted list. The connectors are the ONLY thing carrying order on this stage — §6.6
 * takes numerals, badges and graded colour off the table, and `../tam-kotter-geometry.ts`
 * takes size off it — so they cannot be among the quietest marks on it. `--copper-400` at
 * 4px is a mark that survives a wall, and it sits deliberately UNDER `support`'s 0.3663 so
 * that the graphic layer still ranks below every string it connects.
 *
 * ═══ AND THE FACTOR MARK STAYED WHERE IT WAS, which is now one tier BELOW the connectors
 * rather than one above. That inversion is the correct one and not a casualty: a factor
 * mark says "this is an item in a set" and a connector says "this causes that". One is
 * punctuation inside a node, the other is the argument between nodes. The two are never
 * adjacent — every mark is inside the source node and every connector is outside all nine —
 * so the pair is never compared, and if it ever were, the louder of them should be the one
 * making a claim.
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
  /** All nine nodes, on both sides of the stage. */
  node: {
    edge: "var(--copper-700)",
    fill: "var(--copper-950)",
    label: "var(--copper-300)",
  },
  /** The two attributions, the nine captions and the four factors — see the table. */
  support: "var(--neutral-300)",
  /** The square beside each of the four factors. Copper rather than neutral so it reads
   *  as a MARK rather than as a period that lost its sentence. */
  marker: "var(--copper-500)",
  /** Every mark either chain is built from — the left frame's six rules and four
   *  arrowheads, the right frame's spine, five ties and four arrowheads. ONE TIER FOR ALL
   *  OF THEM: a connector that was brighter on one side of the stage would say that chain
   *  was the real one, and a head brighter than the rule it ends would read as a separate
   *  object sitting near a line. */
  connector: "var(--copper-400)",
  /** Each frame's own closer. Brighter than anything inside its chain, quieter than the
   *  line that belongs to neither frame. */
  frameCloser: "var(--neutral-200)",
  /** The line under both frames. The brightest text under the headline row. */
  verdict: "var(--neutral-100)",
} as const;

/** A box's border weight. `1px` is the deck's own, and `boxSizing: border-box` at every
 *  call site below keeps it INSIDE the rectangle `../tam-kotter-geometry.ts` cut, so a
 *  border is never a coordinate this file invented. Written as a whole declaration the
 *  way `./PillarOrbit.tsx` writes its own, so only the colour differs between the frame
 *  and the nodes inside it. */
const hairline = (edge: string) => `1px solid ${edge}`;

// ───────────────────── type registers ─────────────────────

/**
 * The mono LABEL register — the two frame titles at 12px/0.20em and the nine node labels
 * at 11px/0.16em, both uppercase because every mono string on this stage is a heading.
 *
 * TWO SIZES AND TWO TRACKINGS FROM ONE FUNCTION, and the tracking falls with the size on
 * purpose: 0.22em is the deck's mono eyebrow tracking at 11px in a full-width row, and a
 * node label lives in a 236px box where that much air costs a character. Both values are
 * what `../tam-kotter-geometry.ts` measured its budgets against, so neither is free to
 * drift here.
 */
function mono(size: number, color: string, tracking: string): CSSProperties {
  return {
    fontFamily: "var(--mono)",
    fontSize: size,
    letterSpacing: tracking,
    textTransform: "uppercase",
    lineHeight: 1.3,
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

/** The CAPTION register — the nine node glosses and the four named factors, cut for ONE
 *  line each (`NODE_CAPTION_HEIGHT` / `FACTOR_HEIGHT`, which are the same 16). */
const caption: CSSProperties = {
  fontFamily: "var(--sans)",
  fontSize: 12,
  lineHeight: 1.3,
  color: TIER.support,
};

/**
 * The prose register — each frame's closer at 15 and the line under both at 22.
 *
 * UPRIGHT SERIF, and the only italics on this stage are the keywords `highlight()`
 * places. `mandate-levers` sets its closer in serif ITALIC and this stage deliberately
 * does not follow it: an italic keyword inside an already-italic sentence changes colour
 * and nothing else, which spends the deck's one emphasis channel for free. The rule this
 * file keeps is `MiddleOutBands.tsx`'s, one slide later in the same section.
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

// ───────────────────── the stagger ─────────────────────

/**
 * 120ms of lead-in, 90ms between objects — the leader tree's two numbers, taken from
 * `leader-mandate/type-registers.ts` and used unchanged by every leader figure that has a
 * stagger at all. 120 keeps the first box off the same frame as the click.
 */
const LEAD_MS = 120;
const STAGGER_MS = 90;

/** How many steps into a pose an object arrives, as milliseconds of delay. FRACTIONAL
 *  STEPS ARE LEGAL AND USED: a connector lands half a beat after the node it leaves, so
 *  the rule is visibly drawn out of one box and into the next rather than appearing
 *  beside both. */
const delay = (step: number) => LEAD_MS + step * STAGGER_MS;

/**
 * A FRAME'S OWN ARRIVAL — the box, then its two lines of header, then its body.
 *
 * ONE TABLE FOR BOTH FRAMES, which is the stagger half of the equality this figure is
 * built on: the right frame arrives at pose 3 in exactly the rhythm the left one arrived
 * at pose 0, so the room recognises the second frame as the same kind of object before it
 * has read a word of it.
 *
 * `body` IS WHERE EITHER CHAIN STARTS. On the left that is the top tier of the causal
 * chain; on the right it is the first link. Naming it once is what keeps the two halves
 * from drifting into two different openings.
 */
const FRAME_STEP = { box: 0, header: 0.5, body: 1 } as const;

/**
 * THE LEFT FRAME'S OPENING POSE, after its header: the top tier, then the four factors it
 * names.
 *
 * THE FOUR FACTORS SHARE ONE STEP AND MUST GO ON SHARING ONE. They are a SET — nothing in
 * the model orders them — and staggering them by even 90ms would say "first this, then
 * that" about four conditions that hold simultaneously. `../content.ts` argues that on the
 * tuple and `../tam-kotter-geometry.ts` lays them out as a 2×2 block for the same reason;
 * this is the same line held at millisecond granularity.
 */
const OPENING_STEP = { node: FRAME_STEP.body, factors: FRAME_STEP.body + 1 } as const;

/**
 * THE BELIEF POSE — the fan, then both beliefs.
 *
 * THE TWO BELIEFS SHARE ONE STEP, for the reason the four factors do: the acceptance model
 * treats them as a pair and ranks neither, and 90ms between them is the smallest possible
 * way to rank one. The fan lands half a beat ahead of them so the room sees where they
 * come from before it reads what they are.
 */
const BELIEF_STEP = { fan: 0, node: 0.5 } as const;

/**
 * THE USE POSE — two nodes, two connectors and the left frame's verdict.
 *
 * THE CLOSER IS LAST WITHIN THE POSE, which is the separation `../tam-kotter-walk.ts`
 * buys instead of spending a sixth step on it: the chain it summarises finishes one beat
 * earlier, so the verdict lands on a finished argument without needing a click of its own.
 * The full beat of silence between the last node and the closer is the difference between
 * a verdict and a fifth node.
 */
const USE_STEP = { fan: 0, intention: 0.5, rule: 1, use: 1.5, closer: 2.5 } as const;

/**
 * THE SEQUENCE POSE — the spine, then the five links that hang off it.
 *
 * THE SPINE LANDS FIRST AND WHOLE, half a beat ahead of the first link, and that ordering
 * is the pose's argument. What arrives at pose 3 is a SEQUENCE, and the spine is the
 * sequence; the five links are what is on it. A rail drawn after the boxes would read as a
 * line being added to tidy them up, and a rail drawn segment by segment between them would
 * be the four-interval scale `../tam-kotter-geometry.ts` refuses to cut.
 *
 * `link` IS A STEP PER LINK AND `arrow` IS THE HALF-BEAT AFTER IT, so each arrowhead lands
 * between the link it leaves and the link it points at — the room watches the sequence
 * being walked. A link's TIE shares its link's beat exactly, because a link and the tie
 * that fixes it to the spine are one arrival: a box that appeared and was attached 90ms
 * later would be a box that had to be connected up.
 */
const SEQUENCE_STEP = { spine: FRAME_STEP.body, link: FRAME_STEP.body + 0.5, arrow: 0.5 } as const;

// ───────────────────── the parts ─────────────────────

/**
 * One connector segment. Every rule on this stage — the left frame's six and the right
 * frame's spine and five ties — is one of these.
 *
 * A `<div>` AND NOT A `<line>`, which is the whole zero-SMIL decision in one element:
 * mount no `<svg>` and there is nothing for a reduced-motion census to find. See the
 * header.
 */
function Rule({
  on,
  step,
  slot,
  left,
  top,
  width,
  height,
}: {
  on: boolean;
  step: number;
  slot: string;
  left: number;
  top: number;
  width: number;
  height: number;
}) {
  return (
    <Reveal
      on={on}
      delay={delay(step)}
      data-testid={`tam-kotter-rule-${slot}`}
      style={{
        position: "absolute",
        left,
        top,
        width,
        height,
        backgroundColor: TIER.connector,
      }}
    />
  );
}

/**
 * One arrowhead, pointing DOWN. All eight of this stage's heads are one of these.
 *
 * A `<div>` AND NOT A `<polygon>`, WHICH IS WHY THIS FIGURE COULD GROW ARROWHEADS AT ALL.
 * A zero-sized box with two transparent flanks and one coloured border paints a triangle —
 * the idiom `mindset-section-c/components/C4LoopBackArrow.tsx` already uses in this deck —
 * so the whole zero-SMIL guarantee in the header survives the change untouched: no `<svg>`
 * is mounted, so there is no `<animate>`, `<animateTransform>`, `<animateMotion>`, `<set>`
 * or `<animateColor>` to gate at any pose under any motion preference. An
 * `<svg><marker orient="auto">` would have drawn the identical triangle and cost this file
 * a `matchMedia` gate it currently does not need.
 *
 * `centreX` AND NOT `left`, unlike {@link Rule}. A head is placed on an AXIS — the same
 * axis its rule stands on — and `arrowHeadLeft` is the one place the half-width is
 * subtracted. A caller that could pass a raw `left` could land a 12px head 4px off the 4px
 * line it terminates, which is a third of the mark and reads as a printing fault.
 *
 * ALL EIGHT POINT THE SAME WAY, so there is no `direction` prop and there is deliberately
 * nothing to pass one to. Both chains run top to bottom; a head that could point up would
 * be a feedback loop neither published model has, and the acceptance model in particular is
 * frequently misdrawn with one.
 *
 * THE TIP LANDS ON THE TOP EDGE OF WHAT IT POINTS AT. `top` is therefore always
 * `<something>Top − ARROW_HEAD_HEIGHT`, and `../tam-kotter-geometry.ts` does that
 * subtraction in {@link tamArrowTop} and {@link kotterArrowTop} rather than here.
 */
function Head({
  on,
  step,
  slot,
  centreX,
  top,
}: {
  on: boolean;
  step: number;
  slot: string;
  centreX: number;
  top: number;
}) {
  return (
    <Reveal
      on={on}
      delay={delay(step)}
      data-testid={`tam-kotter-head-${slot}`}
      style={{
        position: "absolute",
        left: arrowHeadLeft(centreX),
        top,
        // The triangle. `width`/`height` are zero and the BORDERS are the mark: under
        // `globals.css`'s global `border-box`, the used border box is exactly
        // `ARROW_HEAD_WIDTH × ARROW_HEAD_HEIGHT`, which is what the geometry module cut.
        width: 0,
        height: 0,
        borderLeft: `${ARROW_HEAD_HALF_WIDTH}px solid transparent`,
        borderRight: `${ARROW_HEAD_HALF_WIDTH}px solid transparent`,
        borderTop: `${ARROW_HEAD_HEIGHT}px solid ${TIER.connector}`,
      }}
    />
  );
}

/**
 * One node — a bordered box holding a mono LABEL over a sans CAPTION.
 *
 * NINE CALLS, ONE COMPONENT, AND THAT IS STRUCTURAL RATHER THAN TIDY. The four constructs
 * of the acceptance model and the five links of the change model are the same kind of
 * object and are rendered by the same code, so there is no place for the right-hand five
 * to acquire a badge, an index or a second tier that the left-hand four do not have. The
 * moment this file needed two node components it would have two node vocabularies, and
 * the first thing the second one would grow is a number.
 *
 * `children` IS FOR THE ONE NODE THAT CARRIES MORE — the top of the causal chain, which
 * lists four named factors under its caption. `../tam-kotter-geometry.ts` gives that one
 * node its own height and `../content.ts` gives it its own type, so the extra content
 * cannot appear in a box that was not cut for it.
 */
function NodeBox({
  node,
  on,
  step,
  left,
  top,
  width,
  height,
  children,
}: {
  node: { id: string; label: string; caption: string };
  on: boolean;
  step: number;
  left: number;
  top: number;
  width: number;
  height: number;
  children?: ReactNode;
}) {
  const textLeft = nodeTextLeft(left);
  const textWidth = nodeTextWidth(width);
  return (
    <Reveal
      on={on}
      delay={delay(step)}
      data-testid={`tam-kotter-node-${node.id}`}
      style={{
        position: "absolute",
        left,
        top,
        width,
        height,
        // `border-box`, so the 1px border paints INSIDE the rectangle the geometry module
        // cut. A content-box border would make every node 48 tall against chains budgeted
        // at 46 and push both frames' floors 10px down.
        boxSizing: "border-box",
        border: hairline(TIER.node.edge),
        backgroundColor: TIER.node.fill,
      }}
    >
      {/* NO `highlight()` ON EITHER LINE, AND NONE ON ANY MONO OR CAPTION STRING ON THIS
          STAGE. The nine labels are names and the nine captions are one-line glosses;
          both carry no `*Kw` sibling by construction (`../content.ts`'s keyword rule),
          and a copper italic inside an 11px uppercase label would emphasise a fragment of
          a published construct's name and read as a rendering fault. */}
      <div
        data-testid={`tam-kotter-node-${node.id}-label`}
        style={{
          position: "absolute",
          left: textLeft - left,
          top: nodeLabelTop(top) - top,
          width: textWidth,
          height: NODE_LABEL_HEIGHT,
          ...mono(11, TIER.node.label, "0.16em"),
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
          width: textWidth,
          height: NODE_CAPTION_HEIGHT,
          ...caption,
        }}
      >
        {node.caption}
      </div>
      {children}
    </Reveal>
  );
}

// ───────────────────── the figure ─────────────────────

export interface TamKotterFramesProps {
  /** 0…5. See `../shape-tam-kotter.tsx` for what each pose argues, and
   *  `../tam-kotter-walk.ts` for why the five links of the right-hand chain share one. */
  pose: number;
}

export function TamKotterFrames({ pose }: TamKotterFramesProps) {
  // THE POSE, ASKED WHERE IT IS ANSWERED. Every question goes to `../tam-kotter-walk.ts`
  // and none is re-derived from a comparison here, so no branch in this tree can form its
  // own opinion about what pose 3 means.
  const beliefs = showsBeliefs(pose);
  const use = showsUse(pose);
  const sequence = showsSequence(pose);

  // THE TWO FRAMES, AS ONE LIST, and this is the strongest statement this file makes: the
  // box, the title, the attribution and the hairline are rendered by ONE loop, so there is
  // no per-frame code path for an edit to make one of them wider, brighter or earlier.
  // What differs between the two entries is three strings and one gate — the left frame is
  // on the stage from the first pose, the right one arrives with its own name (see
  // `showsSequence` for why its box does not stand empty before then).
  const frames = [
    {
      slot: "tam",
      panel: TAM_PANEL,
      title: C.tam.frameLabel,
      attribution: C.tam.attribution,
      on: true,
    },
    {
      slot: "kotter",
      panel: KOTTER_PANEL,
      title: C.kotter.frameLabel,
      attribution: C.kotter.attribution,
      on: sequence,
    },
  ];

  const tamInner = panelInnerLeft(TAM_PANEL);
  // THE LEFT FRAME'S CENTRE LINE, AND THERE IS NO `kotterCentre` BESIDE IT. The right
  // frame's chain runs on `KOTTER_SPINE_CENTRE_X` — its inner LEFT edge — and that absence
  // is the asymmetry the figure is built on rather than an omission: two chains centred in
  // two identical frames give the room two columns and one reading.
  const tamCentre = panelCentreX(TAM_PANEL);
  const kotterInner = panelInnerLeft(KOTTER_PANEL);

  return (
    <>
      {/* ───── THE TWO FRAMES ───── */}
      {frames.map((frame) => (
        <Fragment key={frame.slot}>
          <Reveal
            on={frame.on}
            delay={delay(FRAME_STEP.box)}
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
            on={frame.on}
            delay={delay(FRAME_STEP.header)}
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
          {/* THE ATTRIBUTION — the model, its author and its year, on the line under the
              frame's own name and on the same beat as it. It is not a beat of its own:
              a frame that named itself and then, 90ms later, admitted where the name
              came from would read as a citation being appended rather than as a source
              being given. */}
          <Reveal
            on={frame.on}
            delay={delay(FRAME_STEP.header)}
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
            on={frame.on}
            delay={delay(FRAME_STEP.header)}
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

      {/* ═════ THE LEFT FRAME · THE CAUSAL CHAIN ═════ */}

      {/* ───── WHAT SHAPES BELIEF ─────
          The one node on the stage that carries a list. It stands from the first pose
          with the four conditions inside it, because those four are the half of the
          model this room can act on and the room should be reading them while the
          presenter is still saying the model's name. */}
      <NodeBox
        node={C.tam.source}
        on
        step={OPENING_STEP.node}
        left={tamNodeLeft(TAM_PANEL, TAM_TIER.SOURCE, 0)}
        top={tamTierTop(TAM_TIER.SOURCE)}
        width={tamNodeWidth(TAM_TIER.SOURCE)}
        height={SOURCE_NODE_HEIGHT}
      >
        {/* THE FOUR NAMED FACTORS, in a 2×2 block, each behind a 4×4 mark. ONE STEP FOR
            ALL FOUR — see {@link OPENING_STEP}. The mark is a box and not a bullet
            character, so nothing in `../content.ts` has to carry a glyph that means
            "this is an item", and it is deliberately not a numeral: a marked list is a
            set, a numbered list is an order, and these four have none.
            Positioned in the node's own coordinates, which is why every `left` and `top`
            here is a stage coordinate minus the node's — the node is the offset parent. */}
        {C.tam.source.factors.map((factor, i) => {
          const columnLeft = factorColumnLeft(i);
          const rowTop = factorRowTop(i);
          const originLeft = tamNodeLeft(TAM_PANEL, TAM_TIER.SOURCE, 0);
          const originTop = tamTierTop(TAM_TIER.SOURCE);
          return (
            <Fragment key={factor}>
              <Reveal
                on
                delay={delay(OPENING_STEP.factors)}
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
                delay={delay(OPENING_STEP.factors)}
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

      {/* ───── THE FORK DOWN TO THE TWO BELIEFS ─────
          One stem out of the node above, one 280px bar spanning the two belief centre
          lines, one ARROWHEAD hanging off each end of it and pointing into the box under
          it. Four marks and one arrival: they are one connector, and together they are the
          whole of this figure's claim that the acceptance model SPLITS — the room does not
          have to read either belief to see that one thing has become two.

          THE BAR SITS EXACTLY HALFWAY DOWN THE GAP (`FAN_STEM`), so it reads as a junction
          rather than as an underline on the node above or a header over the two below, and
          the room below it is exactly one arrowhead — which is why the fork's two arms are
          bare heads with no stub under them. `../tam-kotter-geometry.ts` derives that from
          `ARROW_HEAD_HEIGHT` rather than leaving it to hold by luck. */}
      <Rule
        on={beliefs}
        step={BELIEF_STEP.fan}
        slot="tam-source-stem"
        left={verticalRuleLeft(tamCentre)}
        top={tamConnectorTop(TAM_TIER.SOURCE)}
        width={RULE_THICKNESS}
        height={FAN_STEM}
      />
      <Rule
        on={beliefs}
        step={BELIEF_STEP.fan}
        slot="tam-source-span"
        left={fanSpanLeft(TAM_PANEL)}
        top={tamConnectorTop(TAM_TIER.SOURCE) + FAN_STEM}
        width={FAN_SPAN_WIDTH}
        height={RULE_THICKNESS}
      />
      {C.tam.beliefs.map((belief, column) => (
        <Head
          key={belief.id}
          on={beliefs}
          step={BELIEF_STEP.fan}
          slot={`tam-fork-${belief.id}`}
          centreX={tamNodeCentreX(TAM_PANEL, TAM_TIER.BELIEFS, column)}
          top={tamArrowTop(TAM_TIER.SOURCE)}
        />
      ))}

      {/* ───── THE TWO BELIEFS ─────
          One width, one line, one delay. The model ranks neither and neither does this
          stage — see {@link BELIEF_STEP}. */}
      {C.tam.beliefs.map((belief, column) => (
        <NodeBox
          key={belief.id}
          node={belief}
          on={beliefs}
          step={BELIEF_STEP.node}
          left={tamNodeLeft(TAM_PANEL, TAM_TIER.BELIEFS, column)}
          top={tamTierTop(TAM_TIER.BELIEFS)}
          width={tamNodeWidth(TAM_TIER.BELIEFS)}
          height={NODE_HEIGHT}
        />
      ))}

      {/* ───── THE MERGE BACK IN, TO THE INTENTION ─────
          The mirror of the fork above, drawn out of the same three parts turned over: two
          stems rising out of the two beliefs, one bar on the same two centre lines, one
          ARROWHEAD returning to the frame's own centre. Both beliefs feed one intention,
          which is the model's claim and the reason the left chain is a fan rather than a
          second column — and it is the second half of what the room sees before it reads
          anything: one becomes two, two become one.

          THE TWO STEMS CARRY NO HEAD. A head says "this arrives at that", and what these
          two arrive at is the bar, not a box. The only head on this connector is the one
          that lands on `BEHAVIORAL INTENTION`. */}
      {C.tam.beliefs.map((belief, column) => (
        <Rule
          key={belief.id}
          on={use}
          step={USE_STEP.fan}
          slot={`tam-stem-${belief.id}`}
          left={verticalRuleLeft(tamNodeCentreX(TAM_PANEL, TAM_TIER.BELIEFS, column))}
          top={tamConnectorTop(TAM_TIER.BELIEFS)}
          width={RULE_THICKNESS}
          height={FAN_STEM}
        />
      ))}
      <Rule
        on={use}
        step={USE_STEP.fan}
        slot="tam-join-span"
        left={fanSpanLeft(TAM_PANEL)}
        top={tamConnectorTop(TAM_TIER.BELIEFS) + FAN_STEM}
        width={FAN_SPAN_WIDTH}
        height={RULE_THICKNESS}
      />
      <Head
        on={use}
        step={USE_STEP.fan}
        slot="tam-merge"
        centreX={tamCentre}
        top={tamArrowTop(TAM_TIER.BELIEFS)}
      />

      <NodeBox
        node={C.tam.intention}
        on={use}
        step={USE_STEP.intention}
        left={tamNodeLeft(TAM_PANEL, TAM_TIER.INTENTION, 0)}
        top={tamTierTop(TAM_TIER.INTENTION)}
        width={tamNodeWidth(TAM_TIER.INTENTION)}
        height={NODE_HEIGHT}
      />

      {/* THE LAST LINK OF THE CAUSAL CHAIN — one straight rule and one head, the only
          unforked connector on this side of the stage and the only one drawn as a line
          that ends in a point rather than as a junction.

          THE RULE STOPS WHERE THE HEAD STARTS (`TAM_STRAIGHT_RULE_HEIGHT`, which is the gap
          less one head) rather than running under it. A 4px rule continuing to the tip of a
          12px head pokes out of both flanks over the last two pixels and paints a small
          cross at the point of the arrow — invisible in a screenshot, obvious on a wall. */}
      <Rule
        on={use}
        step={USE_STEP.rule}
        slot="tam-intention-use"
        left={verticalRuleLeft(tamCentre)}
        top={tamConnectorTop(TAM_TIER.INTENTION)}
        width={RULE_THICKNESS}
        height={TAM_STRAIGHT_RULE_HEIGHT}
      />
      <Head
        on={use}
        step={USE_STEP.rule}
        slot="tam-intention-use"
        centreX={tamCentre}
        top={tamArrowTop(TAM_TIER.INTENTION)}
      />

      <NodeBox
        node={C.tam.use}
        on={use}
        step={USE_STEP.use}
        left={tamNodeLeft(TAM_PANEL, TAM_TIER.USE, 0)}
        top={tamTierTop(TAM_TIER.USE)}
        width={tamNodeWidth(TAM_TIER.USE)}
        height={NODE_HEIGHT}
      />

      {/* ───── THE LEFT FRAME'S VERDICT ─────
          A full beat after the chain finishes, which is what makes it a verdict rather
          than a fifth node. It is the one sentence in this frame addressed to the room:
          two of the four tiers above it are beliefs held by other people, and this line
          names the one a leader can actually reach. */}
      <Reveal
        on={showsTamCloser(pose)}
        as="p"
        delay={delay(USE_STEP.closer)}
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

      {/* ═════ THE RIGHT FRAME · THE ORDERED CHAIN ═════ */}

      {/* ───── THE SPINE ─────
          ONE UNBROKEN RULE, from the top edge of the first link to the bottom edge of the
          last, down the frame's inner LEFT edge rather than its centre. It is the change
          model's sequence drawn as one object, and it is what makes this half of the stage
          structurally different from the other half at a glance: the left frame is centred
          and splits, this one runs straight through.

          IT IS ALSO THE ANTI-LADDER GUARANTEE IN ONE ELEMENT. There is no per-gap segment
          here — one `<div>` spans all four intervals — so there is nothing for an edit to
          lengthen, thicken or fade per step. The four things that DO vary down this rail
          are four arrowheads of one size at four positions, and a position is not a rank.

          `BODY_HEIGHT` is the height BOTH chains are cut to, so the spine ends on the same
          pixel the left chain's last node does. A rail that overshot its last stop would
          say there is a sixth step the slide did not print. */}
      <Rule
        on={sequence}
        step={SEQUENCE_STEP.spine}
        slot="kotter-spine"
        left={verticalRuleLeft(KOTTER_SPINE_CENTRE_X)}
        top={BODY_TOP}
        width={RULE_THICKNESS}
        height={BODY_HEIGHT}
      />

      {/* ───── FIVE LINKS, FIVE TIES AND FOUR ARROWHEADS, ON ONE POSE ─────
          ONE GATE FOR ALL OF IT. Five links on five poses would be a countdown, and a
          countdown is the third ladder §6.6 refuses — `../tam-kotter-walk.ts` argues that
          at length. What the stagger buys instead is reading ORDER: each link lands a beat
          after the one above it, with the tie that fixes it to the spine on the same beat,
          and each arrowhead half a beat later — so the room watches the sequence being
          walked rather than a block appearing.

          THE INDEX REACHES THE DELAY AND THE POSITION AND NOTHING ELSE. `i` is used three
          times below — by `kotterLinkTop`, by `kotterTieTop` and by `delay` — and never as
          `children`. There is no badge element, no counter and no ordinal string anywhere
          in this block, and `../content.ts` carries no field one could be built from.

          EVERY LINK TAKES THE SAME TWO CONSTANTS FOR ITS BOX. `KOTTER_LINK_LEFT` and
          `KOTTER_LINK_WIDTH` are not functions of `i` and there is no third argument to
          reach for: a link cannot be indented, inset or widened to rank it, which is the
          same guarantee `kotterLinkTop`'s `i × pitch` makes vertically.

          The last link has no arrowhead under it, which is why the head is drawn only for
          links that have a successor: `kotterArrowTop` throws on the last one, so the
          sequence visibly ENDS rather than pointing into the frame's own closer. */}
      {C.kotter.links.map((link, i) => (
        <Fragment key={link.id}>
          <Rule
            on={sequence}
            step={SEQUENCE_STEP.link + i}
            slot={`kotter-tie-${link.id}`}
            left={KOTTER_TIE_LEFT}
            top={kotterTieTop(i)}
            width={KOTTER_TIE_LENGTH}
            height={RULE_THICKNESS}
          />
          <NodeBox
            node={link}
            on={sequence}
            step={SEQUENCE_STEP.link + i}
            left={KOTTER_LINK_LEFT}
            top={kotterLinkTop(i)}
            width={KOTTER_LINK_WIDTH}
            height={NODE_HEIGHT}
          />
          {i < C.kotter.links.length - 1 ? (
            <Head
              on={sequence}
              step={SEQUENCE_STEP.link + i + SEQUENCE_STEP.arrow}
              slot={`kotter-${link.id}`}
              centreX={KOTTER_SPINE_CENTRE_X}
              top={kotterArrowTop(i)}
            />
          ) : null}
        </Fragment>
      ))}

      {/* ───── THE RIGHT FRAME'S VERDICT ─────
          Its own pose, unlike its opposite number — see `ORDER_POSE` in
          `../tam-kotter-walk.ts`. It carries the one sentence that says the order
          matters, which is precisely the claim this frame's geometry refuses to make
          structurally, so it gets the room to itself for a click. */}
      <Reveal
        on={showsKotterCloser(pose)}
        as="p"
        delay={delay(0)}
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

      {/* ═════ THE LINE UNDER BOTH FRAMES ═════
          Full width, outside both frames, and the last thing to arrive. It is the only
          object on this stage that belongs to neither model and the only place the two
          frames touch — which is why it waits until both of them are complete.
          `UNIFIER_TOP` puts its lowest pixel at y = 604 against the NavBar hover band at
          y = 632; the 28px between them is `NAV_ZONE_CLEARANCE` and nothing below this
          element spends any of it. */}
      <Reveal
        on={showsUnifier(pose)}
        as="p"
        delay={delay(0)}
        data-testid="tam-kotter-unifier"
        style={{
          position: "absolute",
          left: UNIFIER_LEFT,
          top: UNIFIER_TOP,
          width: UNIFIER_WIDTH,
          height: UNIFIER_HEIGHT,
          ...prose(22, TIER.verdict),
        }}
      >
        {highlight(C.unifier, C.unifierKw)}
      </Reveal>
    </>
  );
}
