// Three failures reduced to a phrase each, a brace that joins them, and the one thing
// they were.
//
// THE FIGURE IS A CONVERGENCE. Three reductions stack in the left column; a vertical
// hairline to their right spans exactly those three rows; a short horizontal stub leaves
// that hairline at its exact vertical centre; and ONE statement sits to the right of the
// stub, vertically centred against the brace. Nothing else in this deck draws a
// many-into-one — `./HardestPartBeats.tsx` draws a split bar, `./NoSopBeats.tsx` a
// lopsided diptych with four empty rules, `./CapabilityLadder.tsx` a staircase — and the
// shape IS this slide's argument: the room can see the three rhyme before the copy says
// so.
//
// THE HAIRLINE AND THE STUB ARE ONE GRAPHIC, and the code says so in three ways: the
// same colour tier ({@link TIER.brace}), the same 1px weight, and the same arrival step.
// Two weights or two tiers would read as a rule and a mark rather than as a brace, and
// the whole image is that the pointer GROWS OUT of the bracket.
//
// NO GEOMETRY IS TYPED HERE. Every box's `left`, `top`, `width` and `height` comes from
// `../the-pattern-geometry.ts`, including the two coordinates the image rests on — the
// hairline's span, derived from the row placement function, and the stub's shelf,
// derived from that span. A literal for either is how a convergence drifts into a
// diagram of three things next to a fourth.
//
// IT READS NO VARIANT AND NO BRAND, like `./HardestPartBeats.tsx` and `./NoSopBeats.tsx`
// and unlike `./CapabilityLadder.tsx`: this slide has no brand axis at all, so there is
// no `…For(brand)` prop to look for. `../content.ts` argues it; the short form is that
// the failures on this stage are the presenter's own and belong to neither room.
//
// CSS VARS ONLY, NO HEX AND NO rgba() LITERALS — including the brace's two boxes.
//
// RANK IS A COLOUR TIER BETWEEN ROLES — see {@link TIER} — and opacity means "not
// revealed yet", i.e. TIME, never rank. The case worth stating here is the THREE
// REDUCTIONS against the ONE STATEMENT: the statement is one tier brighter because it is
// what the three collapse INTO, and the three share a single tier between them because
// the slide's claim is that they are the same failure. Ranking one reduction over
// another — by tier or by opacity — would be an ordering the copy does not make.
//
// ZERO SMIL NODES, at every pose, under any motion preference — and closed BY
// CONSTRUCTION exactly as `./NoSopBeats.tsx`, `./HardestPartBeats.tsx`,
// `leader-invest/components/SubscriptionBeats.tsx` and
// `leader-mandate/components/EnablementModel.tsx` close it: THIS FIGURE MOUNTS NO
// `<svg>` AT ALL, so there is no `<animate>`, `<animateTransform>`, `<animateMotion>` or
// `<set>` to gate at mount and the reduced-motion census is 0 with nothing to inspect.
// The hairline and the stub are plain boxes for exactly that reason — an SVG `<line>`
// pair would have bought nothing and would have re-opened a question the deck answers
// with a `matchMedia` gate three times elsewhere (`E12LoopAnatomy`, `E12MindsetDiptych`,
// `E9DistractionMotion`). The entire motion budget here is `.fade`'s transition pair
// plus `.copper-rule`'s `scaleX`, and the global `prefers-reduced-motion: reduce` rule in
// `src/styles/globals.css` squashes both to 0.01ms — so every pose rests on its finished
// frame under either preference. NO NEW KEYFRAME, NO NEW CLASS, NO NEW FONT.
import type { CSSProperties } from "react";
// Section E's copy, the tree's de facto shared reveal primitive. The census of its
// importers is kept by `leader-mandate/components/EnablementModel.tsx` and
// `leader-invest/components/SubscriptionBeats.tsx`; this file moves that count again and
// so does not re-quote it. `CopperRule` comes from the same file for the same reason.
import { CopperRule, Reveal } from "@/slides/foundation-core-section-e/components/Reveal";
import { highlight } from "@/components/highlight";
import {
  BRACE_HEIGHT,
  BRACE_LEFT,
  BRACE_TOP,
  CAPABILITY_HEIGHT,
  CAPABILITY_TOP,
  CLOSER_HEIGHT,
  CLOSER_TOP,
  CONTENT_WIDTH,
  EYEBROW_HEIGHT,
  EYEBROW_TOP,
  HAIRLINE_WIDTH,
  PATTERN_HEIGHT,
  PATTERN_LEFT,
  PATTERN_TOP,
  PATTERN_WIDTH,
  REDUCTION_LEFT,
  REDUCTION_WIDTH,
  ROW_HEIGHT,
  RULE_TOP,
  SAME_EYEBROW_TOP,
  SIDE_MARGIN,
  STUB_HEIGHT,
  STUB_LEFT,
  STUB_TOP,
  STUB_WIDTH,
  reductionRowTop,
} from "../the-pattern-geometry";
import { gapThePatternContent as C } from "../content";

// ───────────────────── the tiers, in one table ─────────────────────

/**
 * One tier per ROLE, and not one per box. Hand-derived WCAG relative luminances over
 * `src/styles/globals.css`'s hexes, brightest first, under the headline's `--neutral-50`
 * (0.9131):
 *
 *   role        token           luminance   register
 *   verdict     --neutral-100    0.7835     22px serif — the closer
 *   claim       --neutral-200    0.6584     20px serif — the pattern statement
 *                                           17px serif — the capability verdict
 *   row         --neutral-300    0.3663     15px sans — the three reductions
 *   label       --copper-400     0.2967     11px mono caps — the two eyebrows
 *   brace       --copper-700     0.0865     the hairline and the stub, one graphic
 *
 * NO COPPER TEXT ON THIS STAGE AT ALL, and that is the epistemics drawn in colour — the
 * rule `leader-invest/components/SubscriptionBeats.tsx` records and both of this
 * directory's other figures inherit: copper text means A THING QUOTED FROM SOMEWHERE
 * ELSE, and the neutral tiers are the deck's own voice. THIS SLIDE QUOTES NOTHING and
 * cites nothing — it is the presenter's own record, generalised — so every word on the
 * stage is neutral and the only copper is the two mono labels and the brace.
 *
 * `--copper-400` UNDER `--neutral-300` FOR THE MONO LABELS is the shipped precedent all
 * three sibling leader figures cite — exactly this token in exactly this register, 11px
 * mono caps — and it is precedent, not a documented exemption.
 *
 * THE PATTERN STATEMENT AND THE CAPABILITY VERDICT SHARE ONE TIER, deliberately. The
 * statement is the brightest thing in band 1 because the three reductions under the same
 * bracket are a tier below it; the verdict is the brightest thing in band 2 because it is
 * alone there. Ranking one over the other would say the generalisation outranks what the
 * room is meant to do with it, or the reverse — and the slide makes neither claim. What
 * separates them is SIZE (20 against 17) and BAND ORDER, which is what actually differs.
 *
 * THE BRACE IS NOT HELD TO THE TEXT FLOOR, for the reason `./HardestPartBeats.tsx`'s bar
 * segments are not: a hairline is compared, not read. `--copper-700` is `.copper-rule`'s
 * own token — the weight the whole deck already draws a hairline at on this surface — so
 * the brace is legible at projection distance without inventing a tint, and using the
 * deck's own rule colour is what makes the convergence read as drawn BY this deck rather
 * than as a stray border.
 */
const TIER = {
  /** Both mono caps rows: the reductions' heading and the statement's. */
  label: "var(--copper-400)",
  /** The hairline and the stub. ONE TOKEN FOR BOTH — they are one graphic. */
  brace: "var(--copper-700)",
  /** The three reductions. ONE TIER FOR ALL THREE — see the header. */
  row: "var(--neutral-300)",
  /** The pattern statement and the capability verdict. */
  claim: "var(--neutral-200)",
  /** The closer. The brightest text under the headline row. */
  verdict: "var(--neutral-100)",
} as const;

// ───────────────────── type registers ─────────────────────

/** The mono LABEL register. Uppercase, because both mono labels on this stage are
 *  headings — this slide quotes nothing, so it needs none of the two-case helper its
 *  siblings ship for citations. */
function mono(color: string): CSSProperties {
  return {
    fontFamily: "var(--mono)",
    fontSize: 11,
    letterSpacing: "0.22em",
    textTransform: "uppercase",
    lineHeight: 1.3,
    color,
  };
}

/** The sans register — the three reductions, cut for one line each. */
const rowStyle: CSSProperties = {
  fontFamily: "var(--sans)",
  fontSize: 15,
  lineHeight: 1.3,
  color: TIER.row,
};

/** The prose register — the statement, the verdict and the closer. Upright serif; the
 *  only italics on this stage are the keywords `highlight()` places, and the three
 *  reductions get none of those (`../content.ts`'s keyword rule). */
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
 * 120ms of lead-in, 90ms between boxes — the leader tree's two numbers, taken from
 * `leader-mandate/type-registers.ts` and used unchanged by every leader figure that has a
 * stagger at all. 120 keeps the first box off the same frame as the click.
 */
const LEAD_MS = 120;
const STAGGER_MS = 90;

/** How many steps into a pose a box arrives, as milliseconds of delay. */
const delay = (step: number) => LEAD_MS + step * STAGGER_MS;

/**
 * POSE 1's ARRIVAL ORDER — the heading, then the brace AND the statement together.
 *
 * THE BRACE MAY NOT LAND BEFORE THE THING IT POINTS AT. A hairline and a stub arriving a
 * beat early is a stray graphic pointing into empty space, and for one beat the stage
 * would be claiming a convergence it has not stated. So both halves of the brace and the
 * statement share ONE step, and the only thing ahead of them is the heading that says
 * what the block under it is — the eyebrow-then-body order every figure in this tree
 * keeps.
 */
const BRACE_STEP = {
  eyebrow: 0,
  hairline: 1,
  stub: 1,
  statement: 1,
} as const;

/**
 * POSE 2's ARRIVAL ORDER — the rule, then the verdict.
 *
 * The rule is a divider and the verdict is what it divides band 1 from, so the pose ends
 * on the CLAIM rather than on the line above it.
 */
const VERDICT_STEP = {
  rule: 0,
  capability: 1,
} as const;

// ───────────────────── the figure ─────────────────────

export interface ThePatternBeatsProps {
  /** 0…3. See `../gap-the-pattern.tsx` for what each pose argues. */
  pose: number;
}

export function ThePatternBeats({ pose }: ThePatternBeatsProps) {
  // The three reductions need no gate: they stand from pose 0 and never leave. The three
  // below are `>=` and not `===` for the reason every step-reveal slide in the deck is —
  // a pose is everything argued so far.
  const showBrace = pose >= 1;
  const showVerdict = pose >= 2;
  const showCloser = pose >= 3;

  return (
    <>
      {/* ───── BAND 1, LEFT · THE THREE, IN ONE LINE EACH ─────
          `on` is hardcoded true: `pose >= 0` is a check that cannot fail, and this tree
          deletes those on sight. */}
      <Reveal
        on
        delay={delay(0)}
        data-testid="the-pattern-reduction-eyebrow"
        style={{
          position: "absolute",
          left: REDUCTION_LEFT,
          top: EYEBROW_TOP,
          width: REDUCTION_WIDTH,
          height: EYEBROW_HEIGHT,
          ...mono(TIER.label),
          whiteSpace: "nowrap",
        }}
      >
        {C.reductionEyebrow}
      </Reveal>

      {/* ALL THREE ON ONE POSE, staggered one step apart inside it. The stagger is
          reading order and nothing else — no mark, no rule and no tier separates them,
          because the slide's claim is that the three are the same failure. */}
      {C.reductions.map((item, i) => (
        <Reveal
          key={item.id}
          on
          delay={delay(i + 1)}
          data-testid={`the-pattern-reduction-${item.id}`}
          style={{
            position: "absolute",
            left: REDUCTION_LEFT,
            top: reductionRowTop(i),
            width: REDUCTION_WIDTH,
            height: ROW_HEIGHT,
            ...rowStyle,
          }}
        >
          {item.label}
        </Reveal>
      ))}

      {/* ───── BAND 1, RIGHT · WHAT WAS THE SAME ───── */}
      <Reveal
        on={showBrace}
        delay={delay(BRACE_STEP.eyebrow)}
        data-testid="the-pattern-same-eyebrow"
        style={{
          position: "absolute",
          left: PATTERN_LEFT,
          top: SAME_EYEBROW_TOP,
          width: PATTERN_WIDTH,
          height: EYEBROW_HEIGHT,
          ...mono(TIER.label),
          whiteSpace: "nowrap",
        }}
      >
        {C.sameEyebrow}
      </Reveal>

      {/* THE BRACE, HALF ONE · the vertical hairline, spanning exactly the three rows.
          A plain box and NOT `CopperRule`: that primitive animates `scaleX` from the
          left, which draws a HORIZONTAL line growing sideways — the wrong axis and the
          wrong gesture for a bracket that is supposed to already be there the moment the
          three rows are read together. */}
      <Reveal
        on={showBrace}
        delay={delay(BRACE_STEP.hairline)}
        data-testid="the-pattern-brace-hairline"
        style={{
          position: "absolute",
          left: BRACE_LEFT,
          top: BRACE_TOP,
          width: HAIRLINE_WIDTH,
          height: BRACE_HEIGHT,
          background: TIER.brace,
        }}
      />

      {/* THE BRACE, HALF TWO · the stub, leaving the hairline at its exact centre. Same
          tier, same weight, same step — one graphic in two boxes. */}
      <Reveal
        on={showBrace}
        delay={delay(BRACE_STEP.stub)}
        data-testid="the-pattern-brace-stub"
        style={{
          position: "absolute",
          left: STUB_LEFT,
          top: STUB_TOP,
          width: STUB_WIDTH,
          height: STUB_HEIGHT,
          background: TIER.brace,
        }}
      />

      {/* THE ONE STATEMENT the three reductions instantiate — the only sentence in this
          band, arriving on the same step as the brace that points at it. */}
      <Reveal
        on={showBrace}
        as="p"
        delay={delay(BRACE_STEP.statement)}
        data-testid="the-pattern-statement"
        style={{
          position: "absolute",
          left: PATTERN_LEFT,
          top: PATTERN_TOP,
          width: PATTERN_WIDTH,
          height: PATTERN_HEIGHT,
          ...prose(20, TIER.claim),
        }}
      >
        {highlight(C.pattern, C.patternKw)}
      </Reveal>

      {/* THE RULE THAT CLOSES THE BRACE — full width, because it divides the SLIDE:
          above it three failures collapsed into one sentence, below it what that sentence
          means. A `div` with the deck's own `.copper-rule` `scaleX`; a `<line>` would be
          the first `<svg>` on the slide. The testid sits on a positioned WRAPPER because
          `CopperRule` spreads no `data-*` props. */}
      <div
        data-testid="the-pattern-rule"
        style={{ position: "absolute", left: SIDE_MARGIN, top: RULE_TOP, width: CONTENT_WIDTH }}
      >
        <CopperRule on={showVerdict} delay={delay(VERDICT_STEP.rule)} width="100%" />
      </div>

      {/* ───── BAND 2 · THE VERDICT ─────
          Full width, one line, and no eyebrow: a label over a single sentence would be a
          heading for a paragraph of one. */}
      <Reveal
        on={showVerdict}
        as="p"
        delay={delay(VERDICT_STEP.capability)}
        data-testid="the-pattern-capability-line"
        style={{
          position: "absolute",
          left: SIDE_MARGIN,
          top: CAPABILITY_TOP,
          width: CONTENT_WIDTH,
          height: CAPABILITY_HEIGHT,
          ...prose(17, TIER.claim),
        }}
      >
        {highlight(C.capabilityLine, C.capabilityLineKw)}
      </Reveal>

      {/* ───── BAND 3 · THE CLOSER — THE SLIDE'S LAST ARRIVAL ─────
          Full width, alone in its band, and the one sentence here addressed to the room
          rather than to the record. */}
      <Reveal
        on={showCloser}
        as="p"
        delay={delay(0)}
        data-testid="the-pattern-closer"
        style={{
          position: "absolute",
          left: SIDE_MARGIN,
          top: CLOSER_TOP,
          width: CONTENT_WIDTH,
          height: CLOSER_HEIGHT,
          ...prose(22, TIER.verdict),
        }}
      >
        {highlight(C.closer, C.closerKw)}
      </Reveal>
    </>
  );
}
