// THE SURFACE AND THE SOURCE — D.2's figure, in three acts, a recap and a floor.
//
// ═══ FIVE POSES, AND THE SPLIT BETWEEN `===` AND `>=` IS THE ARGUMENT.
//
//   0 · THE CHART            one plate, seven bars, an effort column filled 3px of 240
//   1 · WHAT IS UNDER IT     the same plate, four rows arriving under it, the column full
//   2 · TWO CHARTS           the same plate, and a twin with an empty frame under it
//   3 · THE RECAP            three boxes, each turning a finding into a question
//   4 · THE FLOOR            pose 3, plus a rule and a line
//
// THE PLATE IS ONE OBJECT ACROSS THREE POSES, which is why it is REVEAL-GATED and not
// conditionally mounted. `../showcase-trap-geometry.ts` cuts it at 528 for the twin case and
// draws the hero at the same 528 in poses 0 and 1 for exactly this reason: the chart a room
// admires in act 1 and the chart it cannot distinguish in act 3 must be THE SAME OBJECT, at
// the same size, in the same place. A plate that remounted per pose would re-snap its seven
// bars three times and the room would read three charts.
//
// EVERYTHING THAT SHARES A RECTANGLE WITH SOMETHING ELSE IS CONDITIONALLY MOUNTED, which is
// K.1's rule and the reason it exists: two gated scenes in one rectangle cross-fade INTO
// each other, and a gated scene plays its stagger once at slide mount, so walking backwards
// finds it already assembled. Three tenants share the eyebrow shelf, three share the act
// line's shelf, and TWO SHARE THE WHOLE RIGHT HALF — the effort column (poses 0…1) and the
// twin plate (pose 2) occupy the same rectangle, which is the composition's own argument:
// pose 2 does not add a chart beside the cost, it REPLACES the cost with a chart that has
// not paid it.
//
// THE RECAP AND THE THESIS ARE NOT EXCLUSIVE. The thesis is what the recap is FOR, so it
// lands under a frame that stays put — pose 4 is pose 3 plus a rule and a line, and the
// three boxes do not move, re-animate or re-tile.
//
// ═══ TWO STAGGERS, AND THE SECOND ONE IS THE SLIDE. Everything on this stage arrives on the
// deck's own pitch ({@link STAGGER_MS} = 90) EXCEPT the four rows of act 2, which arrive on
// {@link LAYER_STAGGER_MS} = 260 and each take 900ms to draw their own rule. That is not a
// style choice and it is not decoration: act 1's chart is complete in 380ms and act 2 is
// still working when a room has finished reading it. See `./showcase-trap.css` for why
// neither duration claims to be the ratio — the ratio is the column, and only the column.
//
// ═══ NO `useState`, NO `useEffect`, NO `requestAnimationFrame`, NO SMIL. Every frame on
// this stage is a function of `pose`; every motion is CSS. The one drawn layer is a single
// `.svg-layer` at 1:1 with the stage, and it is LAST in markup so the bars paint over their
// own plate and the scan travels across both — with `pointer-events: none`, so it can never
// shadow the click-to-advance or a box's hover.

import type { CSSProperties } from "react";
import { CopperRule, Reveal } from "@/slides/foundation-core-section-e/components/Reveal";
import { highlight } from "@/components/highlight";
import {
  ACT_LINE_HEIGHT,
  ACT_LINE_SIZE,
  ACT_LINE_TOP,
  BAR_COUNT,
  BAR_WIDTH,
  BOX_FINDING_HEIGHT,
  BOX_FINDING_OFFSET,
  BOX_FINDING_SIZE,
  BOX_GLYPH_OFFSET,
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
  CONTENT_WIDTH,
  EYEBROW_TOP,
  GLYPH_SIZE,
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
  MARK_SIZE,
  MARK_TOP,
  MARK_TRACKING,
  METER_HEIGHT,
  METER_LEFT,
  METER_TOP,
  METER_WIDTH,
  PLATE_HAIRLINE_OFFSET,
  PLATE_HEIGHT,
  PLATE_PAD,
  PLATE_TITLE_OFFSET,
  PLATE_TOP,
  PLATE_WIDTH,
  READING_FOOT_TOP,
  READING_HEAD_TOP,
  READING_LEFT,
  READING_WIDTH,
  RULE_TOP,
  SIDE_MARGIN,
  STAGE,
  SURFACE_FILL,
  THESIS_HEIGHT,
  THESIS_TEXT_SIZE,
  THESIS_TOP,
  TWIN_LEFT,
  barHeight,
  barLeft,
  boxLeft,
  layerTop,
} from "../showcase-trap-geometry";
import { investShowcaseTrapContent as C } from "../content";
import { TrapGlyph, assertTrapGlyphId } from "./ShowcaseTrapGlyphs";
import "./showcase-trap.css";

// ───────────────────── the colour ladder ─────────────────────

/**
 * Every colour this stage paints, as a variable and never a literal.
 *
 *   role          token            register
 *   thesis        --neutral-100    19px serif — the closer, alone on the floor
 *   act           --neutral-100    17px serif — one sentence per act, one shelf
 *   question      --neutral-100    15px serif — the recap's own deliverable
 *   layerLine     --neutral-200    13px sans  — what a row actually took
 *   finding       --neutral-300    13px sans  — a verdict the acts already proved
 *   label         --copper-400     9.5–11px mono caps — every eyebrow, name and reading
 *   mark          --copper-500     9.5px mono caps — the provenance chip
 *   ink           --copper-500     the seven bars, and the plate's own drawing
 *   live          --copper-300     the effort column's fill, and the scan
 *   frame         --copper-700     every box border
 *   hairline      --copper-800     a plate's and a box's own rule
 *   track         --copper-800     the effort column's empty track
 *   ground        --neutral-900    the one fill on the stage
 *
 * NOTHING IS EVER DIMMED TO PROMOTE SOMETHING ELSE (§7.1) — attention is bought with added
 * light, and the four rows of act 2 are drawn in the same tier at pose 2 as at pose 1. The
 * only thing that changes between those poses is what appears BESIDE them.
 */
const TIER = {
  thesis: "var(--neutral-100)",
  act: "var(--neutral-100)",
  question: "var(--neutral-100)",
  layerLine: "var(--neutral-200)",
  finding: "var(--neutral-300)",
  label: "var(--copper-400)",
  mark: "var(--copper-500)",
  ink: "var(--copper-500)",
  live: "var(--copper-300)",
  frame: "var(--copper-700)",
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
const layerDelay = (index: number) => LEAD_MS + index * LAYER_STAGGER_MS;

/** How long a row's own rule takes to cross it — `st-row-wipe`'s duration, restated so the
 *  wipe can be started after the row it belongs to has arrived. */
const ROW_WIPE_LEAD_MS = 120;

/** Every pose's eyebrow arrives first, and all four share the step so a click between poses
 *  does not move the shelf's own clock. */
const EYEBROW_STEP = 0;

/** Act 1's arrival order. The line is LAST: a pose that ended on its own drawing would
 *  leave a room looking at a chart with nothing said about it. */
const SURFACE_STEP = { plate: 1, column: 2, reading: 3, mark: 4, line: 5 } as const;

/** The seven bars' own pitch inside act 1: 40ms, and it is the fastest stagger in either
 *  leader deck. That is deliberate — see the file header. */
const BAR_STAGGER_MS = 40;
const BAR_LEAD_MS = 260;
const barDelay = (index: number) => BAR_LEAD_MS + index * BAR_STAGGER_MS;

/** The plate's own line draws after its last bar. */
const CHART_LINE_DELAY_MS = BAR_LEAD_MS + BAR_COUNT * BAR_STAGGER_MS;

/** Act 2's arrival order for everything that is NOT a row. */
const SOURCE_STEP = { headReading: 1 } as const;

/** Act 2's line lands after the last row has finished drawing itself. */
const SOURCE_LINE_DELAY_MS = layerDelay(3) + 900;

/** Act 3's arrival order. */
const TWIN_STEP = { plate: 1, hollow: 2, line: 3 } as const;

/** The recap's arrival order. */
const RECAP_STEP = { first: 1 } as const;

/** The floor's arrival order. The rule comes BEFORE the sentence — a rule that followed its
 *  own sentence would be underlining it. */
const THESIS_STEP = { rule: 0, thesis: 1 } as const;

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
  children: React.ReactNode;
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

// ───────────────────── the figure ─────────────────────

export interface ShowcaseTrapBeatsProps {
  pose: number;
}

export function ShowcaseTrapBeats({ pose }: ShowcaseTrapBeatsProps) {
  // ONE `<=`, TWO RANGES AND THREE `===` — see the file header. The plate is a SET that
  // three poses share; the eyebrow, the act line and the right half are each one rectangle
  // with three tenants; the recap is what the thesis is for.
  const act = pose <= 2;
  const layers = pose >= 1 && pose <= 2;
  const column = pose <= 1;
  const columnFull = pose === 1;
  const twin = pose === 2;
  const recap = pose >= 3;
  const thesis = pose === 4;

  /** Every eyebrow, act line and reading spans a shelf over something else, so none of them
   *  may take a pointer. `.box-hover` is on the boxes, and these are not boxes. */
  const shelf = (
    text: string,
    top: number,
    left: number,
    width: number,
    style: CSSProperties,
    step: number,
    testId: string,
  ) => (
    <Reveal
      on
      as="p"
      delay={delay(step)}
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
      CONTENT_WIDTH,
      mono(LABEL_SIZE, TIER.label, LABEL_TRACKING),
      EYEBROW_STEP,
      testId,
    );

  /** An act's own sentence, on the one shelf all three share. */
  const actLine = (
    text: string,
    kw: readonly string[],
    ms: number,
    testId: string,
  ) => (
    <Reveal
      on
      as="p"
      delay={ms}
      data-testid={testId}
      style={{
        position: "absolute",
        left: SIDE_MARGIN,
        top: ACT_LINE_TOP,
        width: CONTENT_WIDTH,
        height: ACT_LINE_HEIGHT,
        ...serif(ACT_LINE_SIZE, TIER.act),
        pointerEvents: "none",
      }}
    >
      {highlight(text, kw)}
    </Reveal>
  );

  return (
    <>
      {/* ─────────── acts 1…3 · the plate, and the four rows under it ─────────── */}

      {act && (
        <>
          <Plate
            left={HERO_LEFT}
            on
            arriveAt={delay(SURFACE_STEP.plate)}
            testId="showcase-trap-hero"
          />

          {layers &&
            C.layers.map((layer, index) => (
              <Reveal
                key={layer.id}
                on
                delay={layerDelay(index)}
                className="box-hover"
                data-testid={`showcase-trap-layer-${layer.id}`}
                style={{
                  position: "absolute",
                  left: HERO_LEFT,
                  top: layerTop(index),
                  width: PLATE_WIDTH,
                  height: LAYER_HEIGHT,
                  boxSizing: "border-box",
                  // DASHED IS THE ENCODING AND NOT A DECORATION: a solid border is a thing
                  // the room can see, and every one of these four is a thing it cannot.
                  // The palette holds one hue, so form carries the distinction (§7.1).
                  border: `1px dashed ${TIER.frame}`,
                  background: TIER.ground,
                  display: "flex",
                  alignItems: "center",
                  padding: `0 ${LAYER_PAD_X}px`,
                }}
              >
                {/* The row's own rule, crawling across it — 900ms, which is the tempo half
                    of act 2's argument. It starts after the row it belongs to has landed. */}
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
                <span
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
                </span>
                <span
                  data-testid={`showcase-trap-layer-line-${layer.id}`}
                  style={{
                    width: LAYER_LINE_WIDTH,
                    marginLeft: LAYER_LABEL_GAP,
                    ...sans(LAYER_LINE_SIZE, TIER.layerLine),
                  }}
                >
                  {layer.line}
                </span>
              </Reveal>
            ))}
        </>
      )}

      {/* ─────────── the right half, tenant one · the effort column (poses 0…1) ─────────── */}

      {column && (
        <>
          {shelf(
            C.surfaceReading,
            READING_FOOT_TOP,
            READING_LEFT,
            READING_WIDTH,
            mono(LABEL_SIZE, TIER.label, LABEL_TRACKING),
            SURFACE_STEP.reading,
            "showcase-trap-reading-foot",
          )}

          {columnFull &&
            shelf(
              C.sourceReading,
              READING_HEAD_TOP,
              READING_LEFT,
              READING_WIDTH,
              mono(LABEL_SIZE, TIER.label, LABEL_TRACKING),
              SOURCE_STEP.headReading,
              "showcase-trap-reading-head",
            )}

          {shelf(
            C.mark,
            MARK_TOP,
            READING_LEFT,
            READING_WIDTH,
            mono(MARK_SIZE, TIER.mark, MARK_TRACKING),
            SURFACE_STEP.mark,
            "showcase-trap-mark",
          )}
        </>
      )}

      {/* ─────────── the right half, tenant two · the twin (pose 2) ─────────── */}

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
              width: PLATE_WIDTH,
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
        </>
      )}

      {/* ─────────── the eyebrow shelf · three tenants ─────────── */}

      {pose === 0 && eyebrow(C.surfaceEyebrow, "showcase-trap-surface-eyebrow")}
      {pose === 1 && eyebrow(C.sourceEyebrow, "showcase-trap-source-eyebrow")}
      {pose === 2 && eyebrow(C.twinEyebrow, "showcase-trap-twin-eyebrow")}
      {recap && eyebrow(C.recapEyebrow, "showcase-trap-recap-eyebrow")}

      {/* ─────────── the act line's shelf · three tenants ─────────── */}

      {pose === 0 &&
        actLine(
          C.surfaceLine,
          C.surfaceLineKw,
          delay(SURFACE_STEP.line),
          "showcase-trap-surface-line",
        )}
      {pose === 1 &&
        actLine(
          C.sourceLine,
          C.sourceLineKw,
          SOURCE_LINE_DELAY_MS,
          "showcase-trap-source-line",
        )}
      {pose === 2 &&
        actLine(C.twinLine, C.twinLineKw, delay(TWIN_STEP.line), "showcase-trap-twin-line")}

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

            <div
              style={{
                position: "absolute",
                left: (BOX_WIDTH - GLYPH_SIZE) / 2,
                top: BOX_GLYPH_OFFSET,
              }}
            >
              <TrapGlyph
                id={assertTrapGlyphId(question.glyph)}
                size={GLYPH_SIZE}
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

      {/* ─────────── the floor (pose 4, UNDER the recap) ─────────── */}

      {thesis && (
        <>
          <div
            data-testid="showcase-trap-rule"
            style={{
              position: "absolute",
              left: SIDE_MARGIN,
              top: RULE_TOP,
              width: CONTENT_WIDTH,
            }}
          >
            <CopperRule on delay={delay(THESIS_STEP.rule)} width="100%" />
          </div>

          <Reveal
            on
            as="p"
            delay={delay(THESIS_STEP.thesis)}
            data-testid="showcase-trap-thesis"
            style={{
              position: "absolute",
              left: SIDE_MARGIN,
              top: THESIS_TOP,
              width: CONTENT_WIDTH,
              height: THESIS_HEIGHT,
              ...serif(THESIS_TEXT_SIZE, TIER.thesis),
              pointerEvents: "none",
            }}
          >
            {highlight(C.closer, C.closerKw)}
          </Reveal>
        </>
      )}

      {/* ─────────── the drawn layer, LAST so the ink paints over its own plate ─────────── */}

      <svg
        className="svg-layer"
        data-testid="showcase-trap-svg"
        viewBox={`0 0 ${STAGE.width} ${STAGE.height}`}
        aria-hidden="true"
      >
        {act && <ChartInk left={HERO_LEFT} on testId="showcase-trap-hero-ink" />}
        {twin && <ChartInk left={TWIN_LEFT} on testId="showcase-trap-twin-ink" />}

        {column && (
          <Mark
            on
            delay={delay(SURFACE_STEP.column)}
            testId="showcase-trap-column"
          >
            <rect
              x={METER_LEFT}
              y={METER_TOP}
              width={METER_WIDTH}
              height={METER_HEIGHT}
              fill="none"
              stroke={TIER.track}
              strokeWidth={1}
            />
            {/* THE ONE QUANTITY ON THE STAGE. A full-height rect scaled from its own foot,
                so the sliver is exactly SURFACE_FILL / METER_HEIGHT of it — 3 of 240 — and
                the browser is never handed a sub-pixel bar to round as it likes. It is a
                TRANSITION and not a keyframe, so walking backwards is free and a reader with
                motion turned off still lands on a measurable column. */}
            <rect
              data-testid="showcase-trap-column-fill"
              x={METER_LEFT}
              y={METER_TOP}
              width={METER_WIDTH}
              height={METER_HEIGHT}
              fill={TIER.live}
              style={{
                transformBox: "fill-box",
                transformOrigin: "bottom",
                transform: `scaleY(${columnFull ? 1 : SURFACE_FILL / METER_HEIGHT})`,
                transition: "transform 1400ms var(--ease)",
              }}
            />
          </Mark>
        )}

        {twin && (
          <Mark on delay={delay(TWIN_STEP.hollow)} testId="showcase-trap-scan">
            <rect
              className="st-scan"
              x={SIDE_MARGIN}
              y={PLATE_TOP + CHART_OFFSET}
              width={2}
              height={PLATE_TOP + PLATE_HEIGHT - (PLATE_TOP + CHART_OFFSET)}
              fill={TIER.live}
              style={{ ["--st-scan-travel" as string]: `${CONTENT_WIDTH - 2}px` }}
            />
          </Mark>
        )}
      </svg>
    </>
  );
}
