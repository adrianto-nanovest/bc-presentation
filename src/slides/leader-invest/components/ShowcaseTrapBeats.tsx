// THE SURFACE AND THE SOURCE — D.2's figure, in three acts, a recap and a floor.
//
// ═══ FIVE POSES ON ONE SKELETON, AND THE SKELETON IS THE 2026-08-16 REDRAW.
//
//   0 · THE PICTURE     the plate, four empty frames under it, the prompt card beside it,
//                       and one dimension line filled six pixels of four hundred and eighty
//   1 · WHAT IS UNDER IT the same frames take their names and their light; the same line
//                       crawls the other seventy-nine eightieths. NOTHING LEAVES THE STAGE.
//   2 · TWO CHARTS      the prompt card's rectangle is taken by a twin column: the same
//                       plate, an empty frame, and a dimension line that never moved
//   3 · THE RECAP       three cards, each holding a small drawing of the act it recaps
//   4 · THE FLOOR       pose 3, plus a rule and the ask
//
// EVERY POSE OCCUPIES THE SAME BAND. `../showcase-trap-geometry.ts` starts every scene at
// `BODY_TOP` and ends every scene at `SCENE_BOTTOM`, and asserts the second half of that at
// module load. The figure used to stop at y=486 and leave 104 pixels of black above the
// NavBar on three poses and 174 on a fourth; the sentence shelf now carries all five poses at
// y=590, so the stage has a top edge, a bottom edge and no hole in either.
//
// ═══ WHAT IS GATED AND WHAT IS MOUNTED, WHICH IS K.1's RULE AND THE REASON IT EXISTS.
//
//   MOUNTED ACROSS POSES 0…2, so it is ONE object and not three: the hero plate, the four
//   row frames, the left column's dimension line. The room watches the SAME chart, standing
//   on the SAME four frames, over the SAME line, for three poses — which is what makes act 2
//   a discovery about the object in front of it rather than a new picture.
//
//   GATED ON TOP OF THOSE MOUNTED OBJECTS: each row's name and sentence, the foot reading,
//   the foot tick. Nothing they share a rectangle with is ever drawn, so they may cross-fade
//   in place; and that is the whole of the pose 0 → 1 transition. No box moves, nothing
//   leaves, four frames gain light and gain text, and a bar crawls.
//
//   CONDITIONALLY MOUNTED, because two scenes share one rectangle: the prompt card and the
//   twin column (poses 0…1 against pose 2), the four eyebrows, the five sentences, and the
//   row wipes — a keyframe that is mounted before its pose has already finished by the time
//   the room gets there.
//
// ═══ TWO STAGGERS, AND THE SECOND ONE IS THE SLIDE. Everything on this stage arrives on the
// deck's own pitch ({@link STAGGER_MS} = 90) EXCEPT the four rows of act 2, which arrive on
// {@link LAYER_STAGGER_MS} = 260 and each take 900ms to draw their own rule. That is not a
// style choice and it is not decoration: act 1's chart is complete in 380ms and act 2 is
// still working when a room has finished reading it. See `./showcase-trap.css` for why
// neither duration claims to be the ratio — the ratio is the line, and only the line.
//
// ═══ NO `useState`, NO `useEffect`, NO `requestAnimationFrame`, NO SMIL. Every frame on
// this stage is a function of `pose`; every motion is CSS. The one drawn layer is a single
// `.svg-layer` at 1:1 with the stage, and it is LAST in markup so the bars paint over their
// own plate and the scan travels across both — with `pointer-events: none`, so it can never
// shadow the click-to-advance or a box's hover.

import type { CSSProperties, ReactNode } from "react";
import { CopperRule, Reveal } from "@/slides/foundation-core-section-e/components/Reveal";
import { highlight } from "@/components/highlight";
import {
  BAR_COUNT,
  BAR_WIDTH,
  BOX_FINDING_HEIGHT,
  BOX_FINDING_OFFSET,
  BOX_FINDING_SIZE,
  BOX_HAIRLINE_OFFSET,
  BOX_HEIGHT,
  BOX_LABEL_OFFSET,
  BOX_PAD_X,
  BOX_QUESTION_HEIGHT,
  BOX_QUESTION_OFFSET,
  BOX_QUESTION_SIZE,
  BOX_TEXT_WIDTH,
  BOX_TOP,
  BOX_WIDTH,
  CHART_BASELINE,
  CHART_OFFSET,
  COLUMN_WIDTH,
  CONTENT_WIDTH,
  EYEBROW_TOP,
  HERO_LEFT,
  HOLLOW_HEIGHT,
  HOLLOW_TOP,
  LABEL_HEIGHT,
  LABEL_SIZE,
  LABEL_TRACKING,
  LAYER_HEIGHT,
  LAYER_LABEL_GAP,
  LAYER_LABEL_WIDTH,
  LAYER_LINE_SIZE,
  LAYER_LINE_WIDTH,
  LAYER_PAD_X,
  MARK_LEFT,
  MARK_SIZE,
  MARK_TOP,
  MARK_TRACKING,
  MARK_WIDTH,
  METER_HEIGHT,
  METER_TOP,
  METER_WIDTH,
  PLATE_HAIRLINE_OFFSET,
  PLATE_HEIGHT,
  PLATE_PAD,
  PLATE_TITLE_OFFSET,
  PLATE_TOP,
  PLATE_WIDTH,
  PROMPT_BUILDS_LABEL_OFFSET,
  PROMPT_BUILD_SIZE,
  PROMPT_CHEVRON_WIDTH,
  PROMPT_FOOT_OFFSET,
  PROMPT_FOOT_RULE_OFFSET,
  PROMPT_FOOT_SIZE,
  PROMPT_HAIRLINE_OFFSET,
  PROMPT_HEIGHT,
  PROMPT_LABEL_OFFSET,
  PROMPT_LEFT,
  PROMPT_LINE_OFFSET,
  PROMPT_LINE_SIZE,
  PROMPT_PAD_X,
  PROMPT_TEXT_WIDTH,
  PROMPT_TOP,
  PROMPT_WIDTH,
  READING_TOP,
  READING_WIDTH,
  RIGHT_COL,
  RULE_TOP,
  SCENE_BOTTOM,
  SENTENCE_HEIGHT,
  SENTENCE_SIZE,
  SENTENCE_TOP,
  SIDE_MARGIN,
  STAGE,
  SUBLABEL_SIZE,
  SURFACE_FILL,
  THUMB_HEIGHT,
  THUMB_OFFSET,
  THUMB_WIDTH,
  TICK_TOP,
  TWIN_LEFT,
  barHeight,
  barLeft,
  boxLeft,
  layerTop,
  meterFootTick,
  meterHeadTick,
  promptBuildTop,
} from "../showcase-trap-geometry";
import { investShowcaseTrapContent as C } from "../content";
import { TrapGlyph, assertTrapGlyphId } from "./ShowcaseTrapGlyphs";
import "./showcase-trap.css";

// ───────────────────── the colour ladder ─────────────────────

/**
 * Every colour this stage paints, as a variable and never a literal.
 *
 *   role          token            register
 *   sentence      --neutral-100    19px serif — one shelf, five tenants
 *   question      --neutral-100    15px serif — the recap's own deliverable
 *   typed         --copper-200     14px mono  — the prompt, as it was typed
 *   built         --neutral-200    14px sans  — what the same prompt also makes
 *   layerLine     --neutral-200    13px sans  — what a row actually took
 *   finding       --neutral-300    13px sans  — a verdict the acts already proved
 *   label         --copper-400     9.5–11px mono caps — every eyebrow, name and reading
 *   mark          --copper-500     9.5px mono caps — the provenance chip
 *   ink           --copper-500     the seven bars, and the plate's own drawing
 *   live          --copper-300     the effort line's fill, the ticks, and the scan
 *   frame         --copper-700     every box border
 *   dormant       --copper-900     a frame that is on the stage and not yet named
 *   hairline      --copper-800     a plate's and a card's own rule
 *   track         --copper-800     the effort line's empty channel
 *   ground        --neutral-900    the one fill on the stage
 *
 * NOTHING IS EVER DIMMED TO PROMOTE SOMETHING ELSE (§7.1). The four frames go from `dormant`
 * to `frame` between pose 0 and pose 1 — they GAIN light, and nothing beside them loses any.
 * That single step is the figure's most important state change and it is the cheapest one on
 * the stage: a room that walked past four dark rectangles for a minute watches them turn out
 * to have been the answer.
 */
const TIER = {
  sentence: "var(--neutral-100)",
  question: "var(--neutral-100)",
  typed: "var(--copper-200)",
  built: "var(--neutral-200)",
  layerLine: "var(--neutral-200)",
  finding: "var(--neutral-300)",
  label: "var(--copper-400)",
  mark: "var(--copper-500)",
  ink: "var(--copper-500)",
  live: "var(--copper-300)",
  frame: "var(--copper-700)",
  dormant: "var(--copper-900)",
  hairline: "var(--copper-800)",
  track: "var(--copper-800)",
  ground: "var(--neutral-900)",
} as const;

// ───────────────────── the two clocks ─────────────────────

const LEAD_MS = 120;
const STAGGER_MS = 90;
const delay = (step: number) => LEAD_MS + step * STAGGER_MS;

/**
 * The four rows' own pitch: 260, against the deck's 90.
 *
 * THIS NUMBER IS THE SLIDE. Act 1's whole chart is on the stage in 380ms; act 2's four rows
 * take 900ms each and land 260ms apart, so the last one completes about a second and a half
 * after the first begins. A room does not have to be told that one of the two was slow.
 */
const LAYER_STAGGER_MS = 260;

/** The rows hang off the plate, so they start after it — one stagger's worth of the four
 *  frames' own pitch, which is also what keeps the first frame from landing in front of the
 *  chart it stands under. */
const LAYER_LEAD_MS = LAYER_STAGGER_MS;
const layerDelay = (index: number) => LAYER_LEAD_MS + index * LAYER_STAGGER_MS;

/** How long a row's own rule takes to cross it — `st-row-wipe`'s duration, restated so the
 *  wipe can be started after the row it belongs to has been named. */
const ROW_WIPE_LEAD_MS = 120;

/** Every pose's eyebrow arrives first, and all four share the step so a click between poses
 *  does not move the shelf's own clock. */
const EYEBROW_STEP = 0;

/** Act 1's arrival order. The four frames are NOT on this clock — they run on the rows' own
 *  260ms pitch from pose 0, which is the slide's tempo argument stated once before it is
 *  made. */
const SURFACE_STEP = {
  plate: 1,
  card: 2,
  meter: 3,
  headReading: 4,
  mark: 5,
  sentence: 6,
} as const;

/** The seven bars' own pitch inside act 1: 40ms, and it is the fastest stagger in either
 *  leader deck. That is deliberate — see the file header. */
const BAR_STAGGER_MS = 40;
const BAR_LEAD_MS = 260;
const barDelay = (index: number) => BAR_LEAD_MS + index * BAR_STAGGER_MS;

/** The plate's own line draws after its last bar. */
const CHART_LINE_DELAY_MS = BAR_LEAD_MS + BAR_COUNT * BAR_STAGGER_MS;

/** Act 2's arrival order for everything that is NOT a row. The foot reading waits for the
 *  bar that reaches it — a figure printed before its own measurement arrives is a caption. */
const SOURCE_STEP = { footReading: 5 } as const;

/** Act 2's sentence lands after the last row has finished drawing itself: ≈1.8s. It is the
 *  longest wait on this stage and it is the point of the pose. */
const SOURCE_SENTENCE_DELAY_MS = layerDelay(3) + 900;

/** Act 3's arrival order. */
const TWIN_STEP = { plate: 1, hollow: 2, meter: 3, reading: 4, sentence: 5 } as const;

/** The recap's arrival order — three cards, then the sentence under them. */
const RECAP_STEP = { first: 1, sentence: 4 } as const;

/** The floor's arrival order. The rule comes BEFORE the sentence — a rule that followed its
 *  own sentence would be underlining it. */
const FLOOR_STEP = { rule: 0, closer: 1 } as const;

// ───────────────────── type registers ─────────────────────

function mono(size: number, color: string, ls: number): CSSProperties {
  return {
    fontFamily: "var(--mono)",
    fontSize: size,
    letterSpacing: `${ls}em`,
    textTransform: "uppercase",
    color,
    margin: 0,
  };
}

function serif(size: number, color: string): CSSProperties {
  return {
    fontFamily: "var(--serif)",
    fontSize: size,
    lineHeight: 1.3,
    color,
    margin: 0,
  };
}

function sans(size: number, color: string): CSSProperties {
  return {
    fontFamily: "var(--sans)",
    fontSize: size,
    lineHeight: 1.4,
    color,
    margin: 0,
  };
}

/**
 * A drawn group's reveal — OPACITY ONLY, never transform.
 *
 * `.fade` owns `transform` and would fight an SVG group's own `transform` attribute, so the
 * drawn layer gets its own two-property reveal rather than the shared class.
 */
function Mark({
  on,
  delay: ms,
  className,
  testId,
  children,
}: {
  on: boolean;
  delay: number;
  className?: string;
  testId: string;
  children: ReactNode;
}) {
  return (
    <g
      className={className}
      data-testid={testId}
      style={{
        opacity: on ? 1 : 0,
        transition: "opacity 0.45s var(--ease)",
        transitionDelay: on ? `${ms}ms` : "0ms",
      }}
    >
      {children}
    </g>
  );
}

// ───────────────────── the plate ─────────────────────

/**
 * One chart, drawn twice with the same function.
 *
 * THE TWIN IS NOT A SECOND DRAWING. Both plates take their bars, their heights, their line
 * and their padding from the same geometry, offset by nothing but a left edge — because the
 * one thing act 3 must not allow is a room finding a difference on the surface. If the two
 * charts differed by a pixel the slide would be answering its own question.
 */
function Plate({
  left,
  on,
  arriveAt,
  testId,
}: {
  left: number;
  on: boolean;
  arriveAt: number;
  testId: string;
}) {
  return (
    <Reveal
      on={on}
      delay={arriveAt}
      className="box-hover"
      data-testid={testId}
      style={{
        position: "absolute",
        left,
        top: PLATE_TOP,
        width: PLATE_WIDTH,
        height: PLATE_HEIGHT,
        boxSizing: "border-box",
        border: `1px solid ${TIER.frame}`,
        background: TIER.ground,
      }}
    >
      <p
        data-testid={`${testId}-title`}
        style={{
          position: "absolute",
          left: PLATE_PAD,
          top: PLATE_TITLE_OFFSET,
          width: PLATE_WIDTH - 2 * PLATE_PAD,
          height: LABEL_HEIGHT,
          ...mono(LABEL_SIZE, TIER.label, LABEL_TRACKING),
          lineHeight: 1.3,
          whiteSpace: "nowrap",
        }}
      >
        {C.chartTitle}
      </p>
      <div
        data-testid={`${testId}-hairline`}
        style={{
          position: "absolute",
          left: PLATE_PAD,
          top: PLATE_HAIRLINE_OFFSET,
          width: PLATE_WIDTH - 2 * PLATE_PAD,
          height: 1,
          background: TIER.hairline,
        }}
      />
    </Reveal>
  );
}

/** The seven bars and the line over them, for the plate whose left edge is `left`. */
function ChartInk({ left, on, testId }: { left: number; on: boolean; testId: string }) {
  const tops = Array.from({ length: BAR_COUNT }, (_, i) => CHART_BASELINE - barHeight(i));
  const points = tops
    .map((top, i) => `${barLeft(left, i) + BAR_WIDTH / 2},${top}`)
    .join(" ");

  return (
    <Mark on={on} delay={0} testId={testId}>
      {tops.map((top, i) => (
        <rect
          key={barLeft(left, i)}
          className={on ? "st-bar" : undefined}
          x={barLeft(left, i)}
          y={top}
          width={BAR_WIDTH}
          height={barHeight(i)}
          fill={TIER.ink}
          style={{ animationDelay: `${barDelay(i)}ms` }}
        />
      ))}
      <polyline
        className={on ? "st-draw" : undefined}
        points={points}
        fill="none"
        stroke={TIER.live}
        strokeWidth={1.5}
        strokeLinejoin="round"
        pathLength={1}
        style={{ animationDelay: `${CHART_LINE_DELAY_MS}ms` }}
      />
    </Mark>
  );
}

// ───────────────────── the dimension line ─────────────────────

/**
 * One column's effort line: a channel, a fill, and an extension tick per reading.
 *
 * THE FILL IS A TRANSITION AND NOT A KEYFRAME, so walking backwards is free and a reader
 * with motion turned off still lands on a measurable bar. The head is drawn from the line's
 * own left edge and scaled along x, so the sliver is exactly `SURFACE_FILL / METER_WIDTH` of
 * it — six of four hundred and eighty — and the browser is never handed a sub-pixel bar to
 * round as it likes.
 */
function EffortLine({
  colLeft,
  full,
  on,
  arriveAt,
  testId,
}: {
  colLeft: number;
  full: boolean;
  on: boolean;
  arriveAt: number;
  testId: string;
}) {
  return (
    <Mark on={on} delay={arriveAt} testId={testId}>
      <rect
        x={colLeft}
        y={METER_TOP}
        width={METER_WIDTH}
        height={METER_HEIGHT}
        fill="none"
        stroke={TIER.track}
        strokeWidth={1}
      />
      <rect
        data-testid={`${testId}-fill`}
        x={colLeft}
        y={METER_TOP}
        width={METER_WIDTH}
        height={METER_HEIGHT}
        fill={TIER.live}
        style={{
          transformBox: "fill-box",
          transformOrigin: "left",
          transform: `scaleX(${full ? 1 : SURFACE_FILL / METER_WIDTH})`,
          transition: "transform 1600ms var(--ease)",
        }}
      />
      {/* The head tick — where the picture's own cost stops. It is drawn OVER the fill, so
          at pose 1 a room watches the bar swallow the mark it started from. */}
      <line
        data-testid={`${testId}-head-tick`}
        x1={meterHeadTick(colLeft)}
        y1={TICK_TOP}
        x2={meterHeadTick(colLeft)}
        y2={METER_TOP + METER_HEIGHT}
        stroke={TIER.live}
        strokeWidth={1}
      />
      <line
        data-testid={`${testId}-foot-tick`}
        x1={meterFootTick(colLeft)}
        y1={TICK_TOP}
        x2={meterFootTick(colLeft)}
        y2={METER_TOP}
        stroke={TIER.label}
        strokeWidth={1}
        style={{
          opacity: full ? 1 : 0,
          transition: "opacity 0.45s var(--ease)",
          transitionDelay: full ? `${delay(SOURCE_STEP.footReading)}ms` : "0ms",
        }}
      />
    </Mark>
  );
}

// ───────────────────── the figure ─────────────────────

export interface ShowcaseTrapBeatsProps {
  pose: number;
}

export function ShowcaseTrapBeats({ pose }: ShowcaseTrapBeatsProps) {
  // ONE `<=`, TWO RANGES AND TWO `===` — see the file header. The left column is a SET that
  // three poses share; the right column is one rectangle with two tenants; the recap is what
  // the closer is for.
  const act = pose <= 2;
  const named = pose >= 1 && pose <= 2;
  const card = pose <= 1;
  const twin = pose === 2;
  const recap = pose >= 3;
  const floor = pose === 4;

  /** Every eyebrow, mark, reading and sentence spans a shelf over something else, so none of
   *  them may take a pointer. `.box-hover` is on the boxes, and these are not boxes. */
  const shelf = (
    text: string,
    top: number,
    left: number,
    width: number,
    style: CSSProperties,
    ms: number,
    testId: string,
    align: "left" | "right" = "left",
  ) => (
    <Reveal
      on
      as="p"
      delay={ms}
      data-testid={testId}
      style={{
        position: "absolute",
        left,
        top,
        width,
        height: LABEL_HEIGHT,
        ...style,
        lineHeight: 1.3,
        whiteSpace: "nowrap",
        textAlign: align,
        pointerEvents: "none",
      }}
    >
      {text}
    </Reveal>
  );

  const eyebrow = (text: string, testId: string) =>
    shelf(
      text,
      EYEBROW_TOP,
      SIDE_MARGIN,
      CONTENT_WIDTH - MARK_WIDTH,
      mono(LABEL_SIZE, TIER.label, LABEL_TRACKING),
      delay(EYEBROW_STEP),
      testId,
    );

  /**
   * THE ONE SHELF EVERY POSE PRINTS ON, and the reason this stage has no hole in the bottom
   * of it. Keyed by pose so the outgoing sentence unmounts and the incoming one plays its
   * own arrival — a shared node with swapped children would change the text with no motion
   * at all, which on a 19px line reads as a glitch rather than as a beat.
   */
  const sentence = (
    text: string,
    kw: readonly string[],
    ms: number,
    testId: string,
  ) => (
    <Reveal
      key={testId}
      on
      as="p"
      delay={ms}
      data-testid={testId}
      style={{
        position: "absolute",
        left: SIDE_MARGIN,
        top: SENTENCE_TOP,
        width: CONTENT_WIDTH,
        height: SENTENCE_HEIGHT,
        ...serif(SENTENCE_SIZE, TIER.sentence),
        pointerEvents: "none",
      }}
    >
      {highlight(text, kw)}
    </Reveal>
  );

  return (
    <>
      {/* ─────────── the left column · one plate, four frames, one line ─────────── */}

      {act && (
        <>
          <Plate
            left={HERO_LEFT}
            on
            arriveAt={delay(SURFACE_STEP.plate)}
            testId="showcase-trap-hero"
          />

          {C.layers.map((layer, index) => (
            <Reveal
              key={layer.id}
              on
              // THE FRAME'S OWN CLOCK IS THE ROW'S CLOCK, at pose 0 and at pose 1 alike.
              // `Reveal` writes one `transitionDelay` for every property it transitions, so
              // the same 260ms pitch that lands four dark frames under a chart that snapped
              // together in 380 is the pitch their light comes up on when they are named.
              delay={layerDelay(index)}
              className="box-hover st-row"
              data-testid={`showcase-trap-layer-${layer.id}`}
              style={{
                position: "absolute",
                left: HERO_LEFT,
                top: layerTop(index),
                width: COLUMN_WIDTH,
                height: LAYER_HEIGHT,
                boxSizing: "border-box",
                // DASHED IS THE ENCODING AND NOT A DECORATION: a solid border is a thing
                // the room can see, and every one of these four is a thing it cannot.
                // The palette holds one hue, so form carries the distinction (§7.1).
                border: `1px dashed ${named ? TIER.frame : TIER.dormant}`,
                background: TIER.ground,
                display: "flex",
                alignItems: "center",
                padding: `0 ${LAYER_PAD_X}px`,
              }}
            >
              {/* The row's own rule, crawling across it — 900ms, which is the tempo half of
                  act 2's argument. Mounted only from pose 1: a keyframe that is on the stage
                  before its pose has already finished by the time the room gets there. */}
              {named && (
                <div
                  className="st-row-wipe"
                  data-testid={`showcase-trap-wipe-${layer.id}`}
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    width: "100%",
                    height: 1,
                    background: TIER.hairline,
                    animationDelay: `${layerDelay(index) + ROW_WIPE_LEAD_MS}ms`,
                    pointerEvents: "none",
                  }}
                />
              )}
              <Reveal
                on={named}
                delay={layerDelay(index)}
                as="span"
                data-testid={`showcase-trap-layer-label-${layer.id}`}
                style={{
                  width: LAYER_LABEL_WIDTH,
                  flexShrink: 0,
                  ...mono(LABEL_SIZE, TIER.label, LABEL_TRACKING),
                  lineHeight: 1.3,
                  whiteSpace: "nowrap",
                }}
              >
                {layer.label}
              </Reveal>
              <Reveal
                on={named}
                delay={layerDelay(index) + ROW_WIPE_LEAD_MS}
                as="span"
                data-testid={`showcase-trap-layer-line-${layer.id}`}
                style={{
                  width: LAYER_LINE_WIDTH,
                  marginLeft: LAYER_LABEL_GAP,
                  ...sans(LAYER_LINE_SIZE, TIER.layerLine),
                }}
              >
                {layer.line}
              </Reveal>
            </Reveal>
          ))}

          {shelf(
            C.surfaceReading,
            READING_TOP,
            HERO_LEFT,
            READING_WIDTH,
            mono(LABEL_SIZE, TIER.label, LABEL_TRACKING),
            delay(SURFACE_STEP.headReading),
            "showcase-trap-reading-head",
          )}

          <Reveal
            on={named}
            as="p"
            delay={delay(SOURCE_STEP.footReading)}
            data-testid="showcase-trap-reading-foot"
            style={{
              position: "absolute",
              left: meterFootTick(HERO_LEFT) - READING_WIDTH,
              top: READING_TOP,
              width: READING_WIDTH,
              height: LABEL_HEIGHT,
              ...mono(LABEL_SIZE, TIER.label, LABEL_TRACKING),
              lineHeight: 1.3,
              whiteSpace: "nowrap",
              textAlign: "right",
              pointerEvents: "none",
            }}
          >
            {C.sourceReading}
          </Reveal>
        </>
      )}

      {/* ─────────── the right column, tenant one · the prompt card (poses 0…1) ─────────── */}

      {card && (
        <Reveal
          on
          delay={delay(SURFACE_STEP.card)}
          className="box-hover st-card"
          data-testid="showcase-trap-prompt"
          style={{
            position: "absolute",
            left: PROMPT_LEFT,
            top: PROMPT_TOP,
            width: PROMPT_WIDTH,
            height: PROMPT_HEIGHT,
            boxSizing: "border-box",
            border: `1px solid ${TIER.frame}`,
            background: TIER.ground,
          }}
        >
          <p
            data-testid="showcase-trap-prompt-label"
            style={{
              position: "absolute",
              left: PROMPT_PAD_X,
              top: PROMPT_LABEL_OFFSET,
              width: PROMPT_TEXT_WIDTH,
              height: LABEL_HEIGHT,
              ...mono(LABEL_SIZE, TIER.label, LABEL_TRACKING),
              lineHeight: 1.3,
              whiteSpace: "nowrap",
            }}
          >
            {C.promptLabel}
          </p>

          <div
            className="st-hairline"
            data-testid="showcase-trap-prompt-hairline"
            style={{
              position: "absolute",
              left: PROMPT_PAD_X,
              top: PROMPT_HAIRLINE_OFFSET,
              width: PROMPT_TEXT_WIDTH,
              height: 1,
            }}
          />

          {/* THE ARTIFACT, NOT A DESCRIPTION OF ONE. A chevron, the line as it was typed,
              and a caret that goes on blinking after it — the register a room reads as a
              thing somebody did rather than as a sentence about doing it. */}
          <div
            data-testid="showcase-trap-prompt-line"
            style={{
              position: "absolute",
              left: PROMPT_PAD_X,
              top: PROMPT_LINE_OFFSET,
              width: PROMPT_TEXT_WIDTH,
              display: "flex",
              alignItems: "center",
              whiteSpace: "nowrap",
            }}
          >
            <svg
              width={PROMPT_CHEVRON_WIDTH}
              height={PROMPT_LINE_SIZE}
              viewBox="0 0 12 14"
              aria-hidden="true"
              style={{ flexShrink: 0, overflow: "visible" }}
            >
              <polyline
                points="3,3 8,7 3,11"
                fill="none"
                stroke={TIER.label}
                strokeWidth={1.4}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span
              className="st-type"
              style={{
                // THE TWO THINGS A STYLESHEET CANNOT HOLD, and both are the same fact: how
                // long the string is. The width the reveal ends on and the number of steps
                // it takes to get there are one measurement, so a reworded prompt retypes
                // itself at the right pace without an edit in the CSS.
                ["--st-chars" as string]: `${C.promptLine.length}`,
                animationTimingFunction: `steps(${C.promptLine.length})`,
                animationDelay: `${delay(SURFACE_STEP.card) + 320}ms`,
                fontFamily: "var(--mono)",
                fontSize: PROMPT_LINE_SIZE,
                letterSpacing: 0,
                color: TIER.typed,
              }}
            >
              {C.promptLine}
            </span>
            <span
              className="st-caret"
              aria-hidden="true"
              style={{
                background: TIER.live,
                animationDelay: `${delay(SURFACE_STEP.card) + 320}ms`,
              }}
            />
          </div>

          <Reveal
            on
            as="p"
            delay={delay(SURFACE_STEP.card) + 520}
            data-testid="showcase-trap-prompt-builds-label"
            style={{
              position: "absolute",
              left: PROMPT_PAD_X,
              top: PROMPT_BUILDS_LABEL_OFFSET,
              width: PROMPT_TEXT_WIDTH,
              height: LABEL_HEIGHT,
              ...mono(SUBLABEL_SIZE, TIER.label, LABEL_TRACKING),
              lineHeight: 1.3,
              whiteSpace: "nowrap",
            }}
          >
            {C.promptBuildsLabel}
          </Reveal>

          {C.promptBuilds.map((line, index) => (
            <Reveal
              key={line}
              on
              as="p"
              delay={delay(SURFACE_STEP.card) + 620 + index * 110}
              data-testid={`showcase-trap-prompt-build-${index}`}
              style={{
                position: "absolute",
                left: PROMPT_PAD_X,
                top: promptBuildTop(index),
                width: PROMPT_TEXT_WIDTH,
                ...sans(PROMPT_BUILD_SIZE, TIER.built),
                whiteSpace: "nowrap",
              }}
            >
              {line}
            </Reveal>
          ))}

          <div
            data-testid="showcase-trap-prompt-foot-rule"
            style={{
              position: "absolute",
              left: PROMPT_PAD_X,
              top: PROMPT_FOOT_RULE_OFFSET,
              width: PROMPT_TEXT_WIDTH,
              height: 1,
              background: TIER.hairline,
            }}
          />

          <Reveal
            on
            as="p"
            delay={delay(SURFACE_STEP.card) + 980}
            data-testid="showcase-trap-prompt-foot"
            style={{
              position: "absolute",
              left: PROMPT_PAD_X,
              top: PROMPT_FOOT_OFFSET,
              width: PROMPT_TEXT_WIDTH,
              ...serif(PROMPT_FOOT_SIZE, TIER.finding),
            }}
          >
            {C.promptFoot}
          </Reveal>
        </Reveal>
      )}

      {/* ─────────── the right column, tenant two · the twin (pose 2) ─────────── */}

      {twin && (
        <>
          <Plate
            left={TWIN_LEFT}
            on
            arriveAt={delay(TWIN_STEP.plate)}
            testId="showcase-trap-twin"
          />

          <Reveal
            on
            delay={delay(TWIN_STEP.hollow)}
            className="box-hover st-empty"
            data-testid="showcase-trap-hollow"
            style={{
              position: "absolute",
              left: TWIN_LEFT,
              top: HOLLOW_TOP,
              width: COLUMN_WIDTH,
              height: HOLLOW_HEIGHT,
              boxSizing: "border-box",
              border: `1px dashed ${TIER.frame}`,
              background: TIER.ground,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              data-testid="showcase-trap-hollow-label"
              style={{
                ...mono(LABEL_SIZE, TIER.label, LABEL_TRACKING),
                lineHeight: 1.3,
                whiteSpace: "nowrap",
              }}
            >
              {C.hollowLabel}
            </span>
          </Reveal>

          {/* THE TWIN'S OWN BILL, AT THE SAME SCALE. Two identical surfaces over two
              dimension lines that are not close: one paid five days, one paid thirty
              minutes, and the room has just failed to tell them apart from the top. */}
          {shelf(
            C.surfaceReading,
            READING_TOP,
            RIGHT_COL,
            READING_WIDTH,
            mono(LABEL_SIZE, TIER.label, LABEL_TRACKING),
            delay(TWIN_STEP.reading),
            "showcase-trap-twin-reading",
          )}
        </>
      )}

      {/* ─────────── the eyebrow shelf · four tenants, plus the mark ─────────── */}

      {pose === 0 && eyebrow(C.surfaceEyebrow, "showcase-trap-surface-eyebrow")}
      {pose === 1 && eyebrow(C.sourceEyebrow, "showcase-trap-source-eyebrow")}
      {pose === 2 && eyebrow(C.twinEyebrow, "showcase-trap-twin-eyebrow")}
      {recap && eyebrow(C.recapEyebrow, "showcase-trap-recap-eyebrow")}

      {act &&
        shelf(
          C.mark,
          MARK_TOP,
          MARK_LEFT,
          MARK_WIDTH,
          mono(MARK_SIZE, TIER.mark, MARK_TRACKING),
          delay(SURFACE_STEP.mark),
          "showcase-trap-mark",
          "right",
        )}

      {/* ─────────── the recap (poses 3 AND 4) ─────────── */}

      {recap &&
        C.questions.map((question, index) => (
          <Reveal
            key={question.id}
            on
            delay={delay(RECAP_STEP.first + index)}
            className="box-hover st-card"
            data-testid={`showcase-trap-box-${question.id}`}
            style={{
              position: "absolute",
              left: boxLeft(index),
              top: BOX_TOP,
              width: BOX_WIDTH,
              height: BOX_HEIGHT,
              boxSizing: "border-box",
              border: `1px solid ${TIER.frame}`,
              background: TIER.ground,
            }}
          >
            <p
              data-testid={`showcase-trap-box-label-${question.id}`}
              style={{
                position: "absolute",
                left: BOX_PAD_X,
                top: BOX_LABEL_OFFSET,
                width: BOX_TEXT_WIDTH,
                height: LABEL_HEIGHT,
                ...mono(LABEL_SIZE, TIER.label, LABEL_TRACKING),
                lineHeight: 1.3,
                whiteSpace: "nowrap",
              }}
            >
              {question.label}
            </p>

            <div
              className="st-hairline"
              data-testid={`showcase-trap-box-hairline-${question.id}`}
              style={{
                position: "absolute",
                left: BOX_PAD_X,
                top: BOX_HAIRLINE_OFFSET,
                width: BOX_TEXT_WIDTH,
                height: 1,
              }}
            />

            <div style={{ position: "absolute", left: BOX_PAD_X, top: THUMB_OFFSET }}>
              <TrapGlyph
                id={assertTrapGlyphId(question.glyph)}
                width={THUMB_WIDTH}
                height={THUMB_HEIGHT}
                testId={`showcase-trap-glyph-${question.id}`}
              />
            </div>

            <p
              data-testid={`showcase-trap-box-finding-${question.id}`}
              style={{
                position: "absolute",
                left: BOX_PAD_X,
                top: BOX_FINDING_OFFSET,
                width: BOX_TEXT_WIDTH,
                height: BOX_FINDING_HEIGHT,
                ...sans(BOX_FINDING_SIZE, TIER.finding),
              }}
            >
              {question.finding}
            </p>

            <p
              data-testid={`showcase-trap-box-question-${question.id}`}
              style={{
                position: "absolute",
                left: BOX_PAD_X,
                top: BOX_QUESTION_OFFSET,
                width: BOX_TEXT_WIDTH,
                height: BOX_QUESTION_HEIGHT,
                ...serif(BOX_QUESTION_SIZE, TIER.question),
                lineHeight: 1.4,
              }}
            >
              {highlight(question.question, question.questionKw)}
            </p>
          </Reveal>
        ))}

      {/* ─────────── the floor · the rule is the FINALE's own mark ─────────── */}

      {floor && (
        <div
          data-testid="showcase-trap-rule"
          style={{
            position: "absolute",
            left: SIDE_MARGIN,
            top: RULE_TOP,
            width: CONTENT_WIDTH,
          }}
        >
          <CopperRule on delay={delay(FLOOR_STEP.rule)} width="100%" />
        </div>
      )}

      {/* ─────────── the sentence shelf · five tenants, one rectangle ─────────── */}

      {pose === 0 &&
        sentence(
          C.surfaceLine,
          C.surfaceLineKw,
          delay(SURFACE_STEP.sentence),
          "showcase-trap-surface-line",
        )}
      {pose === 1 &&
        sentence(
          C.sourceLine,
          C.sourceLineKw,
          SOURCE_SENTENCE_DELAY_MS,
          "showcase-trap-source-line",
        )}
      {pose === 2 &&
        sentence(
          C.twinLine,
          C.twinLineKw,
          delay(TWIN_STEP.sentence),
          "showcase-trap-twin-line",
        )}
      {pose === 3 &&
        sentence(
          C.recapLine,
          C.recapLineKw,
          delay(RECAP_STEP.sentence),
          "showcase-trap-recap-line",
        )}
      {floor &&
        sentence(C.closer, C.closerKw, delay(FLOOR_STEP.closer), "showcase-trap-thesis")}

      {/* ─────────── the drawn layer, LAST so the ink paints over its own plate ─────────── */}

      <svg
        className="svg-layer"
        data-testid="showcase-trap-svg"
        viewBox={`0 0 ${STAGE.width} ${STAGE.height}`}
        aria-hidden="true"
      >
        {act && <ChartInk left={HERO_LEFT} on testId="showcase-trap-hero-ink" />}
        {twin && <ChartInk left={TWIN_LEFT} on testId="showcase-trap-twin-ink" />}

        {act && (
          <EffortLine
            colLeft={HERO_LEFT}
            full={named}
            on
            arriveAt={delay(SURFACE_STEP.meter)}
            testId="showcase-trap-meter"
          />
        )}

        {twin && (
          <EffortLine
            colLeft={RIGHT_COL}
            full={false}
            on
            arriveAt={delay(TWIN_STEP.meter)}
            testId="showcase-trap-twin-meter"
          />
        )}

        {twin && (
          <Mark on delay={delay(TWIN_STEP.hollow)} testId="showcase-trap-scan">
            <rect
              className="st-scan"
              x={SIDE_MARGIN}
              y={PLATE_TOP + CHART_OFFSET}
              width={2}
              height={SCENE_BOTTOM - (PLATE_TOP + CHART_OFFSET)}
              fill={TIER.live}
              style={{ ["--st-scan-travel" as string]: `${CONTENT_WIDTH - 2}px` }}
            />
          </Mark>
        )}
      </svg>
    </>
  );
}
