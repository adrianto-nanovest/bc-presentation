// Three things that were handed out, four questions that were never written down, and
// the condition the second column produces.
//
// THE FIGURE IS AN UNFILLED FORM. The left column is a short inventory, each row with a
// small FILLED mark beside it; the right column is four questions, each followed by a
// full-width EMPTY RULE where the answer would have been written. Nothing is drawn in
// the blanks at any pose — they are the argument, and a stage that filled one in would
// be answering the question the slide exists to say nobody answered. That image belongs
// to this slide alone: §6.2 makes shadow AI a three-pass escalation whose passes may
// share no image and no statistic, and `../content.ts` records the comparison against
// the other two (`leader-invest/content.ts`'s D.3 and D.4, both shipped) string by
// string.
//
// NO DIGIT IS PAINTED ANYWHERE ON THIS STAGE, at any pose. `../content.ts` carries the
// reason: a pass with no number in it cannot share a statistic with the two passes
// behind it, and an absence is testable in a way that a list of forbidden values is
// not. Nothing in this file computes, formats or renders a quantity.
//
// IT READS NO VARIANT AND NO BRAND, like `./HardestPartBeats.tsx` next door and unlike
// `./CapabilityLadder.tsx`: this slide has no brand axis at all, so there is no
// `…For(brand)` prop to look for. `../content.ts` argues it; the short form is that an
// absence of written guidance is not an organisation's own evidence, so §4.4's seven
// slots do not list this slide.
//
// CSS VARS ONLY, NO HEX AND NO rgba() LITERALS — including the two graphic tiers, the
// issued marks and the empty answer rules.
//
// RANK IS A COLOUR TIER BETWEEN ROLES — see {@link TIER} — and opacity means "not
// revealed yet", i.e. TIME, never rank. The case worth stating here is the EIGHT BODY
// ROWS: the three issued rows and the four questions share ONE tier, because ranking a
// question over an inventory row would make a claim the two headings already make in
// words, and drawing the unanswered column faded would say "not argued yet" on a stage
// where fading is what a pose gate does.
//
// ZERO SMIL NODES, at every pose, under any motion preference — and closed BY
// CONSTRUCTION exactly as `./HardestPartBeats.tsx`,
// `leader-invest/components/SubscriptionBeats.tsx` and
// `leader-mandate/components/EnablementModel.tsx` close it: THIS FIGURE MOUNTS NO
// `<svg>` AT ALL, so there is no `<animate>`, `<animateTransform>`, `<animateMotion>`
// or `<set>` to gate at mount and the reduced-motion census is 0 with nothing to
// inspect. The marks and the empty answer rules are plain boxes for exactly that
// reason — an SVG `<line>` pair would have bought nothing and would have re-opened a
// question the deck answers with a `matchMedia` gate three times elsewhere
// (`E12LoopAnatomy`, `E12MindsetDiptych`, `E9DistractionMotion`). The entire motion
// budget here is `.fade`'s transition pair plus `.copper-rule`'s `scaleX`, and the
// global `prefers-reduced-motion: reduce` rule in `src/styles/globals.css` squashes
// both to 0.01ms — so every pose rests on its finished frame under either preference.
// NO NEW KEYFRAME, NO NEW CLASS, NO NEW FONT.
import type { CSSProperties } from "react";
// Section E's copy, the tree's de facto shared reveal primitive. The census of its
// importers is kept by `leader-mandate/components/EnablementModel.tsx` and
// `leader-invest/components/SubscriptionBeats.tsx`; this file moves that count again
// and so does not re-quote it. `CopperRule` comes from the same file for the same
// reason.
import { CopperRule, Reveal } from "@/slides/foundation-core-section-e/components/Reveal";
import { highlight } from "@/components/highlight";
import {
  ANSWER_RULE_HEIGHT,
  CLOSER_HEIGHT,
  CLOSER_TOP,
  CONDITION_EYEBROW_TOP,
  CONDITION_LINE_HEIGHT,
  CONTENT_WIDTH,
  EYEBROW_HEIGHT,
  EYEBROW_TOP,
  ISSUED_LEFT,
  ISSUED_TEXT_LEFT,
  ISSUED_TEXT_WIDTH,
  ISSUED_WIDTH,
  MARK_HEIGHT,
  MARK_WIDTH,
  ROW_HEIGHT,
  RULE_TOP,
  SIDE_MARGIN,
  UNWRITTEN_LEFT,
  UNWRITTEN_WIDTH,
  answerRuleTop,
  conditionLineTop,
  issuedMarkTop,
  issuedRowTop,
  questionTop,
} from "../no-sop-geometry";
import { gapNoSopContent as C } from "../content";

// ───────────────────── the tiers, in one table ─────────────────────

/**
 * One tier per ROLE, and not one per box. Hand-derived WCAG relative luminances over
 * `src/styles/globals.css`'s hexes, brightest first, under the headline's
 * `--neutral-50` (0.9131):
 *
 *   role        token           luminance   register
 *   verdict     --neutral-100    0.7835     22px serif — the closer
 *   claim       --neutral-200    0.6584     17px serif — the two condition lines
 *   row         --neutral-300    0.3663     15px sans — all eight body rows
 *   label       --copper-400     0.2967     11px mono caps — the three eyebrows
 *   mark        --copper-500     0.2168     the filled mark beside an issued row
 *   blank       --copper-700     0.0865     the empty rule under a question
 *
 * NO COPPER TEXT ON THIS STAGE AT ALL, and that is the epistemics drawn in colour —
 * the rule `leader-invest/components/SubscriptionBeats.tsx` records and
 * `./HardestPartBeats.tsx` inherits: copper text means A THING QUOTED FROM SOMEWHERE
 * ELSE, and the neutral tiers are the deck's own voice. THIS SLIDE QUOTES NOTHING. Its
 * neighbour opens the run with BCG/McKinsey's sentence in `--copper-200`; this one has
 * no statistic and no source (see `../content.ts` on why it carries none), so every
 * word on the stage is neutral and the only copper is the three mono labels and the two
 * graphic tiers.
 *
 * `--copper-400` UNDER `--neutral-300` FOR THE MONO LABELS is the shipped precedent all
 * three sibling leader figures cite — exactly this token in exactly this register, 11px
 * mono caps — and it is precedent, not a documented exemption.
 *
 * THE TWO GRAPHIC TIERS ARE NOT HELD TO THE TEXT FLOOR, for the reason
 * `./HardestPartBeats.tsx`'s bar segments are not: a mark and a rule are compared, not
 * read. `--copper-700` is `.copper-rule`'s own token — the hairline the whole deck
 * already draws at this weight on this surface — so the empty answer rules are legible
 * at projection distance without inventing a tint, and `--copper-500` above it makes
 * the short filled mark unmistakably the BRIGHTER of the two. THAT ORDER IS THE IMAGE:
 * what was handed out is drawn brighter than what was left blank.
 */
const TIER = {
  /** The three mono caps rows: both diptych headings and band 2's. */
  label: "var(--copper-400)",
  /** The filled mark beside each issued row. The brand copper. */
  mark: "var(--copper-500)",
  /** The empty rule under each question — the deck's own hairline token. */
  blank: "var(--copper-700)",
  /** All eight body rows, in both columns. ONE TIER FOR BOTH — see the header. */
  row: "var(--neutral-300)",
  /** The two condition lines — descriptions, one tier under the verdict. */
  claim: "var(--neutral-200)",
  /** The closer. The brightest text under the headline row. */
  verdict: "var(--neutral-100)",
} as const;

// ───────────────────── type registers ─────────────────────

/** The mono LABEL register. Uppercase, because every mono label on this stage is a
 *  heading — this slide has no sentence-length citation, so it needs none of the
 *  two-case helper its siblings ship. */
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

/** The sans register — all eight body rows, cut for one line each. */
const rowStyle: CSSProperties = {
  fontFamily: "var(--sans)",
  fontSize: 15,
  lineHeight: 1.3,
  color: TIER.row,
};

/** The prose register — the two condition lines and the closer. Upright serif; the only
 *  italics on this stage are the keywords `highlight()` places, and the eight body rows
 *  get none of those (`../content.ts`'s keyword rule). */
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
 * `leader-mandate/type-registers.ts` and used unchanged by every leader figure that has
 * a stagger at all. 120 keeps the first box off the same frame as the click.
 */
const LEAD_MS = 120;
const STAGGER_MS = 90;

/** How many steps into a pose a box arrives, as milliseconds of delay. */
const delay = (step: number) => LEAD_MS + step * STAGGER_MS;

/**
 * POSE 2's ARRIVAL ORDER — the rule and the eyebrow together, then the condition, then
 * what it leaves behind.
 *
 * THE ORDER IS THE ARGUMENT and the pose ends on the CONSEQUENCE: a pose that rested on
 * "the question still gets answered" would rest on the half a room can hear as
 * resourcefulness, and the cost — that none of those answers is readable by anybody
 * else — is the half that makes it a condition worth acting on.
 */
const CONDITION_STEP = {
  rule: 0,
  eyebrow: 0,
  condition: 1,
  consequence: 2,
} as const;

// ───────────────────── the figure ─────────────────────

export interface NoSopBeatsProps {
  /** 0…3. See `../gap-no-sop.tsx` for what each pose argues. */
  pose: number;
}

export function NoSopBeats({ pose }: NoSopBeatsProps) {
  // The left column needs no gate: it stands from pose 0 and never leaves. The three
  // below are `>=` and not `===` for the reason every step-reveal slide in the deck is
  // — a pose is everything argued so far.
  const showUnwritten = pose >= 1;
  const showCondition = pose >= 2;
  const showCloser = pose >= 3;

  return (
    <>
      {/* ───── BAND 1, LEFT · WHAT THE ORGANISATION HANDED OUT ─────
          `on` is hardcoded true: `pose >= 0` is a check that cannot fail, and this tree
          deletes those on sight. */}
      <Reveal
        on
        delay={delay(0)}
        data-testid="no-sop-issued-eyebrow"
        style={{
          position: "absolute",
          left: ISSUED_LEFT,
          top: EYEBROW_TOP,
          width: ISSUED_WIDTH,
          height: EYEBROW_HEIGHT,
          ...mono(TIER.label),
          whiteSpace: "nowrap",
        }}
      >
        {C.issuedEyebrow}
      </Reveal>

      {/* Each row and its mark share ONE step: the mark is not a second beat, it is how
          the row is drawn, and staggering them would put a bullet on the stage before
          the thing it belongs to. */}
      {C.issued.map((item, i) => (
        <Reveal
          key={`${item.id}-mark`}
          on
          delay={delay(i + 1)}
          data-testid={`no-sop-issued-mark-${item.id}`}
          style={{
            position: "absolute",
            left: ISSUED_LEFT,
            top: issuedMarkTop(i),
            width: MARK_WIDTH,
            height: MARK_HEIGHT,
            background: TIER.mark,
          }}
        />
      ))}

      {C.issued.map((item, i) => (
        <Reveal
          key={item.id}
          on
          delay={delay(i + 1)}
          data-testid={`no-sop-issued-${item.id}`}
          style={{
            position: "absolute",
            left: ISSUED_TEXT_LEFT,
            top: issuedRowTop(i),
            width: ISSUED_TEXT_WIDTH,
            height: ROW_HEIGHT,
            ...rowStyle,
          }}
        >
          {item.label}
        </Reveal>
      ))}

      {/* ───── BAND 1, RIGHT · AND WHAT IT NEVER WROTE DOWN ─────
          The heading opens on "AND" so the two columns read as one sentence across the
          gutter. */}
      <Reveal
        on={showUnwritten}
        delay={delay(0)}
        data-testid="no-sop-unwritten-eyebrow"
        style={{
          position: "absolute",
          left: UNWRITTEN_LEFT,
          top: EYEBROW_TOP,
          width: UNWRITTEN_WIDTH,
          height: EYEBROW_HEIGHT,
          ...mono(TIER.label),
          whiteSpace: "nowrap",
        }}
      >
        {C.unwrittenEyebrow}
      </Reveal>

      {/* THE QUESTION AND ITS EMPTY RULE ARRIVE ON THE SAME STEP, always. A question
          that landed a beat before its blank would read as a question being answered
          next; a blank that landed first would be a stray line. The pair IS the beat —
          asked, and nothing written. */}
      {C.questions.map((item, i) => (
        <Reveal
          key={item.id}
          on={showUnwritten}
          delay={delay(i + 1)}
          data-testid={`no-sop-question-${item.id}`}
          style={{
            position: "absolute",
            left: UNWRITTEN_LEFT,
            top: questionTop(i),
            width: UNWRITTEN_WIDTH,
            height: ROW_HEIGHT,
            ...rowStyle,
          }}
        >
          {item.label}
        </Reveal>
      ))}

      {/* THE FOUR BLANKS. Plain boxes and NOT `CopperRule`: that primitive animates
          `scaleX` from the left, which reads as a line being DRAWN — the one thing an
          unwritten answer must not look like. These fade in with the question above
          them and then hold, empty, at every pose after. */}
      {C.questions.map((item, i) => (
        <Reveal
          key={`${item.id}-blank`}
          on={showUnwritten}
          delay={delay(i + 1)}
          data-testid={`no-sop-answer-blank-${item.id}`}
          style={{
            position: "absolute",
            left: UNWRITTEN_LEFT,
            top: answerRuleTop(i),
            width: UNWRITTEN_WIDTH,
            height: ANSWER_RULE_HEIGHT,
            background: TIER.blank,
          }}
        />
      ))}

      {/* THE RULE THAT CLOSES THE DIPTYCH — full width, because it divides the SLIDE:
          above it what was handed out and what was not, below it the condition that
          pair leaves. A `div` with the deck's own `.copper-rule` `scaleX`; a `<line>`
          would be the first `<svg>` on the slide. The testid sits on a positioned
          WRAPPER because `CopperRule` spreads no `data-*` props. */}
      <div
        data-testid="no-sop-rule"
        style={{ position: "absolute", left: SIDE_MARGIN, top: RULE_TOP, width: CONTENT_WIDTH }}
      >
        <CopperRule on={showCondition} delay={delay(CONDITION_STEP.rule)} width="100%" />
      </div>

      {/* ───── BAND 2 · WHAT THE SILENCE LEAVES BEHIND ───── */}
      <Reveal
        on={showCondition}
        delay={delay(CONDITION_STEP.eyebrow)}
        data-testid="no-sop-condition-eyebrow"
        style={{
          position: "absolute",
          left: SIDE_MARGIN,
          top: CONDITION_EYEBROW_TOP,
          width: CONTENT_WIDTH,
          height: EYEBROW_HEIGHT,
          ...mono(TIER.label),
          whiteSpace: "nowrap",
        }}
      >
        {C.conditionEyebrow}
      </Reveal>

      <Reveal
        on={showCondition}
        as="p"
        delay={delay(CONDITION_STEP.condition)}
        data-testid="no-sop-condition-line"
        style={{
          position: "absolute",
          left: SIDE_MARGIN,
          top: conditionLineTop(0),
          width: CONTENT_WIDTH,
          height: CONDITION_LINE_HEIGHT,
          ...prose(17, TIER.claim),
        }}
      >
        {highlight(C.conditionLine, C.conditionLineKw)}
      </Reveal>

      <Reveal
        on={showCondition}
        as="p"
        delay={delay(CONDITION_STEP.consequence)}
        data-testid="no-sop-consequence-line"
        style={{
          position: "absolute",
          left: SIDE_MARGIN,
          top: conditionLineTop(1),
          width: CONTENT_WIDTH,
          height: CONDITION_LINE_HEIGHT,
          ...prose(17, TIER.claim),
        }}
      >
        {highlight(C.consequenceLine, C.consequenceLineKw)}
      </Reveal>

      {/* ───── BAND 3 · THE CLOSER — THE SLIDE'S LAST ARRIVAL ─────
          Full width, alone in its band, and the one sentence here addressed to the room
          rather than to the condition. It is what stops four unanswered questions
          reading as an accusation. */}
      <Reveal
        on={showCloser}
        as="p"
        delay={delay(0)}
        data-testid="no-sop-closer"
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
