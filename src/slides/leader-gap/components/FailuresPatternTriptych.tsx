// PROTOTYPE A of the B.3 + B.4 merge — "THE VIGNETTE TRIPTYCH".
//
// THE FIGURE, IN ONE SENTENCE. Three tall cards side by side, each crowned by a small
// animated plate that draws its failure without words and filled with the record of the
// phase underneath it — and at the second pose all three CONTRACT to the one lesson they
// reduce to, freeing the bottom half of the stage for the shift those lessons license.
//
// WHY SIDE BY SIDE AND NOT DOWN A LIST. The merged slide's whole claim is that the three
// entries are THE SAME SHAPE, and sameness is an argument made side by side; a list
// argues sequence. `../three-failures-geometry.ts` already draws these three as a
// vertical dated ledger and argues at length against a fourth horizontal figure in a row
// of four slides — a triptych is the one shape left that is neither that ledger nor
// another band, and it happens to be the shape the argument wants.
//
// WHY THE RECORD IS PRINTED AND NOT HOVERED. An earlier cut kept `did` and `cost` in a
// shared band and left the cards holding a picture and three labels. It reads well and
// it leaves a room that is NOT being presented to with nothing on the stage. The record
// is now on the card, in full, at pose 0: the phase's name, its confession, the four
// things that happened inside it, and the line it taught. The plate paid for it —
// 105px down to 64.
//
// THE THREE PLATES, AND WHY EACH IS THE SHAPE IT IS:
//   1 · TOOLS, AND NO METHOD — five glyphs drifting on five orbits that never share a
//       centre. Five is `../content.ts`'s own number ("5+ AI coding tools explored").
//       Still, the dashed orbits still say it: five paths, no order.
//   2 · TEN CONNECTORS, TWO LEFT — ten squares riding ONE closed ellipse and going round
//       it forever, ALL TEN FILLED when the ring starts; eight lose the fill one at a
//       time, take a struck diagonal, and keep going round as empty boxes. The
//       arithmetic is the copy's own ("8 of 10 AI connectors — scrapped"; "2 connectors"
//       among what held), derived in the geometry module from a single list of survivors
//       so the picture cannot disagree with the sentence. The circle is the argument as
//       much as the count is: nine months of building, being overtaken, and building
//       again is a phase that went ROUND.
//   3 · ONE GATE, AND A QUEUE — eighteen departments funnel into a slot one item wide
//       and pile up behind it, while ONE change gets out the far side on a slow loop.
//
// TWO POSES:
//   0 — THE RECORD. Three plates running, three phases printed in full.
//   1 — THE LESSONS, AND THE SHIFT. Each card contracts to `PHASE n / X OVER Y / the
//       quote`; THE PLATES KEEP RUNNING; the CopperRule draws under them; and the shift —
//       two boxes and the closing question — arrives in the 236px each card gave up.
//
// THE PLATES DO NOT FREEZE AT POSE 1, and that is a deliberate reversal of the first cut
// (owner call, 2026-08-13). Pausing three loops mid-sentence read as the stage going
// dead under a presenter who was still talking; the three pictures are ambient
// decoration over a record that is already legible, so they run for as long as the slide
// is up. `./failures-pattern.css` no longer carries a pause rule at all.
//
// `pose >= n` everywhere and never `===` — a pose is everything argued so far, and the
// walk backwards has to work.
//
// ZERO SMIL. Every plate is CSS keyframes over the pathLength=1 draw idiom, so the global
// `prefers-reduced-motion: reduce` squash in `src/styles/globals.css` parks every arrival
// on its finished frame — see ./failures-pattern.css, which owns every keyframe under
// the `gfp-` prefix.
//
// DECLARES NO SlideDef — `../gap-failures-pattern.tsx` owns the one this file renders
// inside, and the deck's AST harvest counts them.
import { useState, type CSSProperties, type ReactNode } from "react";
import { Bot, PenLine, Sparkles, Terminal, Wrench, type LucideIcon } from "lucide-react";
import { highlight } from "@/components/highlight";
import { CopperRule, Reveal } from "@/slides/foundation-core-section-e/components/Reveal";
import "./failures-pattern.css";
import {
  CARD_HAIRLINE_HEIGHT,
  CARD_HAIRLINE_Y,
  CARD_HEIGHT_LESSON,
  CARD_HEIGHT_RECORD,
  CARD_INNER_WIDTH,
  CARD_PAD_X,
  CARD_TOP,
  CARD_WIDTH,
  CONNECTOR_STRUCK,
  CONTENT_WIDTH,
  EXIT,
  EYEBROW_TOP,
  FUNNEL,
  GATE,
  HAPPENED_LABEL_Y,
  HAPPENING_HEIGHT,
  HAPPENING_INDENT,
  HAPPENING_MARKER,
  LEARNED_HEIGHT,
  LEARNED_MEASURE,
  LEARNED_RAIL_GAP,
  LEARNED_RAIL_WIDTH,
  LEARNED_Y,
  LESSON_TITLE_Y,
  MINDSET_HEIGHT,
  MINDSET_LABEL_WIDTH,
  MINDSET_TOP,
  MONO_ROW_HEIGHT,
  NODE_COUNT,
  NODE_RING_INSET,
  NODE_SIZE,
  PERIOD_Y,
  PHASE_Y,
  PLATE_HEIGHT,
  PLATE_WIDTH,
  PLATE_Y,
  QUEUE_APPROACH_X,
  QUEUE_DOTS,
  QUEUE_DOT_RADIUS,
  QUEUE_START_MS,
  QUEUE_STEP_MS,
  QUOTE_HEIGHT,
  QUOTE_Y,
  RING_CX,
  RING_CY,
  RING_PATH,
  RING_RX,
  RING_RY,
  RING_TURN_S,
  SHIFT_BOX_BORDER,
  SHIFT_BOX_HEIGHT,
  SHIFT_BOX_PAD_X,
  SHIFT_BULLET_HEIGHT,
  SHIFT_BULLET_INDENT,
  SHIFT_BULLET_INSET,
  SHIFT_BULLET_MARKER,
  SHIFT_BULLET_STEP,
  SHIFT_COL_MEASURE,
  SHIFT_COL_TOP,
  SHIFT_COL_WIDTH,
  SHIFT_EYEBROW_TOP,
  SHIFT_RULE_Y,
  SHIFT_TITLE_INSET,
  SIDE_MARGIN,
  SMALL_MONO_ROW_HEIGHT,
  STAGE,
  STRIKE_START_MS,
  STRIKE_STEP_MS,
  SUBTITLE_HEIGHT,
  SUBTITLE_Y,
  SURVIVOR_INDICES,
  TITLE_ROW_HEIGHT,
  TITLE_Y,
  TOOL_GLYPHS,
  cardLeft,
  happeningY,
  ringStart,
  shiftColLeft,
} from "../gap-failures-pattern-geometry";
import { gapFailuresPatternContent as C } from "../content";

type FailureCard = (typeof C.cards)[number];
type PhaseLesson = (typeof C.lessons)[number];

// ───────────────────── the tiers, in one table ─────────────────────

/**
 * One tier per ROLE, brightest text first, under the headline's `--neutral-50`:
 *
 *   role          token           register
 *   mindset       --neutral-50    17px serif — the slide's last arrival
 *   happenLabel   --neutral-100   12.5px serif 600 — what the thing was called
 *   quote         --neutral-100   14px serif italic — the lesson, said out loud
 *   learned       --neutral-100   13.5px serif italic — what the phase taught
 *   shiftTitle    --neutral-100   15px serif 600 — the half of the move
 *   subtitle      --neutral-300   13px serif italic — the phase's confession
 *   happenRest    --neutral-400   12.5px serif — what it meant
 *   shiftBullet   --neutral-300   12.5px serif — what changed
 *   title         --copper-100    14px mono caps — the phase's own name
 *   period        --copper-500    11px mono caps — when
 *   eyebrow       --copper-500    11px mono caps — band headings
 *   sectionLabel  --copper-600    10px mono caps — the list's heading, inside a card
 *
 * RANK BETWEEN ROLES IS A COLOUR TIER, NEVER OPACITY — the deck's rule. Opacity on this
 * stage means TIME and nothing else: the cross-fade between a card's two faces, and
 * nothing besides.
 *
 * NO COPPER PROSE. Copper is for mono labels, for the plates' own strokes, for the two
 * rails, and for the `highlight()` keyword — which is the deck-wide idiom and not this
 * slide's invention.
 */
const TIER = {
  eyebrow: "var(--copper-500)",
  period: "var(--copper-500)",
  sectionLabel: "var(--copper-600)",
  title: "var(--copper-100)",
  subtitle: "var(--neutral-300)",
  happenLabel: "var(--neutral-100)",
  happenRest: "var(--neutral-400)",
  learned: "var(--neutral-100)",
  quote: "var(--neutral-100)",
  shiftTitle: "var(--neutral-100)",
  shiftBullet: "var(--neutral-300)",
  mindset: "var(--neutral-50)",
  rail: "var(--copper-600)",
  hairline: "var(--copper-800)",
} as const;

// ───────────────────── type registers ─────────────────────

const monoLabel: CSSProperties = {
  fontFamily: "var(--mono)",
  fontSize: 11,
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  lineHeight: 1.3,
  whiteSpace: "nowrap",
};

/** How long a card takes to contract from its record into its lesson: 520ms. Slower
 *  than the deck's 450ms fade on purpose — the room has to SEE the record leave, or the
 *  lesson reads as a different slide rather than as what the record reduced to. */
const CONTRACT_MS = 520;

// ───────────────────── the figure ─────────────────────

export function FailuresPatternTriptych({ pose }: { pose: number }) {
  // `>=` and never `===`, the step-reveal rule: a pose is everything argued so far.
  const isShape = pose >= 1;

  // Hover lights a card and leans its plate in. NOTHING ELSE — there is no band left to
  // drive, so there is no pin, no `data-no-advance`, and a click anywhere on the stage
  // turns the page the way it does on every other slide in this section.
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div data-testid="gfp" data-pose={pose} style={{ position: "absolute", inset: 0 }}>
      {/* The deck's 24px dot grid at 5%, held BELOW the headline so it never paints over
          the wrapper's own two rows — this component renders after them, so a full-bleed
          layer would sit on top of both. */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 128,
          bottom: 0,
          opacity: 0.05,
          backgroundImage: "radial-gradient(rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          pointerEvents: "none",
        }}
      />

      {/* ───── one shelf, two headings. Both spans are absolutely stacked and carry
          their OWN underline, so the rule is always exactly as wide as the words over
          it and neither heading ever moves the other. ───── */}
      <Reveal
        on
        delay={40}
        style={{
          position: "absolute",
          left: SIDE_MARGIN,
          top: EYEBROW_TOP,
          height: MONO_ROW_HEIGHT + 6,
          width: CONTENT_WIDTH,
        }}
      >
        <EyebrowFace visible={!isShape} testId="gfp-record-eyebrow">
          {C.recordEyebrow}
        </EyebrowFace>
        <EyebrowFace visible={isShape} testId="gfp-lessons-eyebrow">
          {C.lessonsEyebrow}
        </EyebrowFace>
      </Reveal>

      {/* ───── the triptych ───── */}
      <div
        data-testid="gfp-triptych"
        style={{
          position: "absolute",
          left: 0,
          top: CARD_TOP,
          width: STAGE.width,
          height: CARD_HEIGHT_RECORD,
        }}
      >
        {C.cards.map((card, i) => (
          <Reveal
            key={card.id}
            on
            delay={120 + i * 90}
            style={{ position: "absolute", left: cardLeft(i), top: 0, width: CARD_WIDTH }}
          >
            <PhaseCard
              card={card}
              lesson={C.lessons[i]}
              index={i}
              lit={hoveredId === card.id}
              isShape={isShape}
              onHover={setHoveredId}
            />
          </Reveal>
        ))}
      </div>

      {/* ───── the shift · everything the contraction paid for ─────

          THE WHOLE BLOCK IS INERT, AT BOTH POSES, AND THAT IS A BUG FIX. It renders
          AFTER the triptych, so it is on top of it — and at pose 0 it is invisible but
          still hit-testable, which meant the boxes, their bullets and the closing
          sentence were eating every pointer that crossed the LOWER HALF of the three
          cards. Hovering a card lit it near the top and did nothing near the bottom.
          Nothing in here is interactive at either pose, so the fix is the file's own
          idiom one level up: `pointer-events: none` on one wrapper, inherited by
          everything inside it, exactly as `CardFace` and `EyebrowFace` already do for
          their hidden layers. The stage's click-to-advance is unaffected — it listens
          on an ancestor. */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", left: SIDE_MARGIN, top: SHIFT_RULE_Y, width: CONTENT_WIDTH }}>
          <CopperRule on={isShape} delay={CONTRACT_MS - 160} />
        </div>

        <Reveal
          on={isShape}
          delay={CONTRACT_MS - 80}
          as="p"
          style={{
            ...monoLabel,
            position: "absolute",
            left: SIDE_MARGIN,
            top: SHIFT_EYEBROW_TOP,
            margin: 0,
            color: TIER.eyebrow,
          }}
        >
          {C.shiftEyebrow}
        </Reveal>

        {/* ───── the shift, in two boxes · the same move seen from two ends ───── */}
        {C.shiftColumns.map((col, i) => (
          <Reveal
            key={col.title}
            on={isShape}
            delay={CONTRACT_MS + i * 90}
            className="box-hover"
            data-testid={`gfp-shift-col-${i}`}
            style={{
              position: "absolute",
              left: shiftColLeft(i),
              top: SHIFT_COL_TOP,
              width: SHIFT_COL_WIDTH,
              // BOTH BOXES ARE THE SAME HEIGHT, even though the second half holds three
              // bullets and the first four: two boxes side by side that bottom out at
              // different heights read as one of them being unfinished.
              height: SHIFT_BOX_HEIGHT,
              boxSizing: "border-box",
              border: `${SHIFT_BOX_BORDER}px solid var(--copper-700)`,
              background: "rgba(10,10,10,0.6)",
              // THE ONE HOLE IN THE WRAPPER'S INERTNESS, AND IT IS CUT PER POSE. These two
              // boxes light under the pointer like every other box in the four sibling
              // figures (`globals.css`'s `.box-hover`), which needs them hit-testable — and
              // the block above them is `pointer-events: none` precisely because at pose 0
              // they are invisible and sitting over the lower half of the three cards. So the
              // hole opens exactly when the boxes are painted and on nothing else in here: at
              // pose 1 they stand below `CARD_BOTTOM_LESSON` and shadow nothing. The bullets
              // inherit `auto` from the box they are inside, which is the box itself.
              pointerEvents: isShape ? "auto" : "none",
            }}
          >
            <p
              style={{
                position: "absolute",
                left: SHIFT_BOX_PAD_X,
                top: SHIFT_TITLE_INSET,
                margin: 0,
                width: SHIFT_COL_MEASURE,
                fontFamily: "var(--serif)",
                fontSize: 15,
                fontWeight: 600,
                lineHeight: 1.3,
                color: TIER.shiftTitle,
              }}
            >
              {col.title}
            </p>
            {col.bullets.map((b, j) => (
              <div
                key={b}
                style={{
                  position: "absolute",
                  left: SHIFT_BOX_PAD_X,
                  top: SHIFT_BULLET_INSET + j * SHIFT_BULLET_STEP,
                  width: SHIFT_BULLET_INDENT + SHIFT_COL_MEASURE,
                  height: SHIFT_BULLET_HEIGHT,
                }}
              >
                {/* the record's own marker — the two lists on this stage are marked the
                    same way or they are not the same kind of list */}
                <span
                  aria-hidden
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 7,
                    width: SHIFT_BULLET_MARKER,
                    height: SHIFT_BULLET_MARKER,
                    background: TIER.rail,
                  }}
                />
                <p
                  style={{
                    position: "absolute",
                    left: SHIFT_BULLET_INDENT,
                    top: 0,
                    margin: 0,
                    width: SHIFT_COL_MEASURE,
                    height: SHIFT_BULLET_HEIGHT,
                    overflow: "hidden",
                    fontFamily: "var(--serif)",
                    fontSize: 12.5,
                    lineHeight: 1.4,
                    color: TIER.shiftBullet,
                    whiteSpace: "nowrap",
                  }}
                >
                  {highlight(b, col.bulletsKw)}
                </p>
              </div>
            ))}
          </Reveal>
        ))}

        {/* the closing question, on one row with its own label */}
        <Reveal
          on={isShape}
          delay={CONTRACT_MS + 260}
          data-testid="gfp-mindset"
          style={{
            position: "absolute",
            left: SIDE_MARGIN,
            top: MINDSET_TOP,
            width: CONTENT_WIDTH,
            height: MINDSET_HEIGHT,
            display: "flex",
            alignItems: "baseline",
          }}
        >
          <span style={{ ...monoLabel, fontSize: 10, width: MINDSET_LABEL_WIDTH, color: TIER.eyebrow }}>
            {C.mindsetLabel}
          </span>
          <span
            style={{
              fontFamily: "var(--serif)",
              fontSize: 17,
              lineHeight: 1.45,
              color: TIER.mindset,
              whiteSpace: "nowrap",
            }}
          >
            {highlight(C.mindset, C.mindsetKw)}
          </span>
        </Reveal>
      </div>
    </div>
  );
}

/** The eyebrow's two headings: absolutely stacked, cross-faded, each with its own
 *  underline. Inert while invisible — a hidden heading must never take a pointer. */
function EyebrowFace({
  visible,
  testId,
  children,
}: {
  visible: boolean;
  testId: string;
  children: ReactNode;
}) {
  return (
    <span
      data-testid={testId}
      data-visible={visible ? "1" : "0"}
      style={{
        ...monoLabel,
        position: "absolute",
        left: 0,
        top: 0,
        color: TIER.eyebrow,
        borderBottom: "1px solid var(--copper-700)",
        paddingBottom: 5,
        opacity: visible ? 1 : 0,
        transition: `opacity 300ms var(--ease) ${visible ? 160 : 0}ms`,
        pointerEvents: "none",
      }}
    >
      {children}
    </span>
  );
}

// ───────────────────── one card, two faces ─────────────────────

interface PhaseCardProps {
  card: FailureCard;
  lesson: PhaseLesson;
  index: number;
  /** Pointer is on this card — lights the chrome and leans the plate in. */
  lit: boolean;
  /** Pose 1: the card contracts to its lesson. The plate keeps running. */
  isShape: boolean;
  onHover: (id: string | null) => void;
}

function PhaseCard({ card, lesson, index, lit, isShape, onHover }: PhaseCardProps) {
  // B4CategoryCard's hover ramp, minus the pin state this slide has no band for.
  const shell: CSSProperties = {
    position: "relative",
    width: "100%",
    height: isShape ? CARD_HEIGHT_LESSON : CARD_HEIGHT_RECORD,
    boxSizing: "border-box",
    border: "1px solid",
    borderColor: lit ? "var(--copper-200)" : "var(--copper-700)",
    background: lit ? "rgba(184,110,61,0.06)" : "rgba(10,10,10,0.6)",
    // The record's rows are still painted while the box shrinks past them; without this
    // they would hang below the border for the whole 520ms and read as a broken card.
    overflow: "hidden",
    transition:
      `height ${CONTRACT_MS}ms var(--ease), ` +
      "border-color 200ms var(--ease), background 200ms var(--ease)",
  };

  return (
    <div
      data-testid={`gfp-card-${card.id}`}
      data-shape={isShape ? "1" : "0"}
      onMouseEnter={() => onHover(card.id)}
      onMouseLeave={() => onHover(null)}
      style={shell}
    >
      {/* the plate — shared by both faces, running at both poses, and the reason the
          contraction reads as the same card losing its lower half */}
      <div style={{ position: "absolute", left: CARD_PAD_X, top: PLATE_Y }}>
        <Plate id={card.id} index={index} active={lit} />
      </div>

      {/* the plate's own rule — picture above, words below */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: CARD_PAD_X,
          top: CARD_HAIRLINE_Y,
          width: CARD_INNER_WIDTH,
          height: CARD_HAIRLINE_HEIGHT,
          background: lit ? "var(--copper-600)" : TIER.hairline,
          transition: "background 200ms var(--ease)",
        }}
      />

      <CardFace visible={!isShape} testId={`gfp-record-${card.id}`}>
        <RecordFace card={card} />
      </CardFace>
      <CardFace visible={isShape} testId={`gfp-lesson-${card.id}`}>
        <LessonFace lesson={lesson} />
      </CardFace>
    </div>
  );
}

/** E.4's `PaneLayer`, scoped to one card: absolutely stacked, cross-faded, and inert
 *  while invisible so a hidden face can never eat a pointer event meant for the card. */
function CardFace({
  visible,
  testId,
  children,
}: {
  visible: boolean;
  testId: string;
  children: ReactNode;
}) {
  return (
    <div
      data-testid={testId}
      data-visible={visible ? "1" : "0"}
      style={{
        position: "absolute",
        inset: 0,
        opacity: visible ? 1 : 0,
        // In at the far end of the contraction, out at the near end: the record is gone
        // before the box has finished closing over where it was.
        transition: `opacity 280ms var(--ease) ${visible ? CONTRACT_MS - 200 : 0}ms`,
        pointerEvents: "none",
      }}
    >
      {children}
    </div>
  );
}

/** POSE 0 — the phase, in full: when, what it was called, what we told ourselves, the
 *  four things that happened, and the line it taught. */
function RecordFace({ card }: { card: FailureCard }) {
  return (
    <>
      <div style={{ ...cardRow(PERIOD_Y), ...monoLabel, color: TIER.period }}>{card.period}</div>

      <div style={{ ...cardRow(TITLE_Y), ...cardTitle, height: TITLE_ROW_HEIGHT }}>
        {card.title}
      </div>

      <p
        style={{
          ...cardRow(SUBTITLE_Y),
          margin: 0,
          height: SUBTITLE_HEIGHT,
          overflow: "hidden",
          fontFamily: "var(--serif)",
          fontStyle: "italic",
          fontSize: 13,
          lineHeight: 1.35,
          color: TIER.subtitle,
        }}
      >
        {highlight(card.subtitle, card.subtitleKw)}
      </p>

      <div
        style={{
          ...cardRow(HAPPENED_LABEL_Y),
          ...monoLabel,
          fontSize: 10,
          height: SMALL_MONO_ROW_HEIGHT,
          color: TIER.sectionLabel,
        }}
      >
        WHAT HAPPENED
      </div>

      {card.happenings.map((h, i) => (
        <div key={h.label} style={{ ...cardRow(happeningY(i)), height: HAPPENING_HEIGHT }}>
          <span
            aria-hidden
            style={{
              position: "absolute",
              left: 0,
              top: 6,
              width: HAPPENING_MARKER,
              height: HAPPENING_MARKER,
              background: TIER.rail,
            }}
          />
          <p
            style={{
              position: "absolute",
              left: HAPPENING_INDENT,
              top: 0,
              margin: 0,
              width: CARD_INNER_WIDTH - HAPPENING_INDENT,
              height: HAPPENING_HEIGHT,
              overflow: "hidden",
              fontFamily: "var(--serif)",
              fontSize: 12.5,
              lineHeight: 1.35,
              color: TIER.happenRest,
            }}
          >
            <span style={{ fontWeight: 600, color: TIER.happenLabel }}>{h.label}</span>
            {" — "}
            {highlight(h.rest, h.restKw)}
          </p>
        </div>
      ))}

      <div style={{ ...cardRow(LEARNED_Y), height: LEARNED_HEIGHT }}>
        <span
          aria-hidden
          style={{
            position: "absolute",
            left: 0,
            top: 1,
            width: LEARNED_RAIL_WIDTH,
            height: LEARNED_HEIGHT - 2,
            background: TIER.rail,
          }}
        />
        <p
          style={{
            position: "absolute",
            left: LEARNED_RAIL_WIDTH + LEARNED_RAIL_GAP,
            top: 0,
            margin: 0,
            width: LEARNED_MEASURE,
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontSize: 13.5,
            lineHeight: 1.4,
            color: TIER.learned,
            whiteSpace: "nowrap",
          }}
        >
          {highlight(card.learned, card.learnedKw)}
        </p>
      </div>
    </>
  );
}

/** POSE 1 — what the phase reduced to, on the record's own shelves: the period's line
 *  carries the phase number, the title's line carries the trade. */
function LessonFace({ lesson }: { lesson: PhaseLesson }) {
  return (
    <>
      <div style={{ ...cardRow(PHASE_Y), ...monoLabel, color: TIER.period }}>{lesson.phase}</div>
      <div style={{ ...cardRow(LESSON_TITLE_Y), ...cardTitle, height: TITLE_ROW_HEIGHT }}>
        {lesson.title}
      </div>
      <p
        style={{
          ...cardRow(QUOTE_Y),
          margin: 0,
          height: QUOTE_HEIGHT,
          overflow: "hidden",
          fontFamily: "var(--serif)",
          fontStyle: "italic",
          fontSize: 14,
          lineHeight: 1.45,
          color: TIER.quote,
        }}
      >
        {highlight(lesson.quote, lesson.quoteKw)}
      </p>
    </>
  );
}

/** Every row inside a card sits on the same left rail and the same measure. */
function cardRow(top: number): CSSProperties {
  return {
    position: "absolute",
    left: CARD_PAD_X,
    top,
    width: CARD_INNER_WIDTH,
  };
}

const cardTitle: CSSProperties = {
  fontFamily: "var(--mono)",
  fontSize: 14,
  letterSpacing: "0.1em",
  lineHeight: 1.3,
  textTransform: "uppercase",
  color: TIER.title,
  whiteSpace: "nowrap",
};

// ───────────────────── the three plates ─────────────────────

/** Keyed by `../content.ts`'s own card ids, so a reordered tuple keeps its pictures —
 *  ./NoSopBeats.tsx's idiom. An id with no plate draws nothing rather than throwing: a
 *  review URL must never render a blank stage. */
function Plate({ id, index, active }: { id: string; index: number; active: boolean }) {
  if (id === "tools-before-method") return <ToolsPlate active={active} />;
  if (id === "built-what-existed") return <ConnectorsPlate active={active} />;
  if (id === "owned-their-work") return <QueuePlate active={active} />;
  // Unreachable with the shipped tuple; `index` keeps the signature honest for a fourth.
  return <div key={index} style={{ width: PLATE_WIDTH, height: PLATE_HEIGHT }} />;
}

const plateShell = (active: boolean): { className: string; style: CSSProperties } => ({
  className: `gfp-vig${active ? " is-active" : ""}`,
  style: { position: "relative", width: PLATE_WIDTH, height: PLATE_HEIGHT },
});

const plateSvg: CSSProperties = { position: "absolute", inset: 0 };

const TOOL_ICONS: Record<(typeof TOOL_GLYPHS)[number]["icon"], LucideIcon> = {
  Sparkles,
  Terminal,
  PenLine,
  Wrench,
  Bot,
};

/** PLATE 1 · TOOLS, AND NO METHOD. Five glyphs, five orbits, no shared centre — and
 *  nothing on this plate aligns with anything else on either axis, which is the whole
 *  picture. The orbits are what makes the FROZEN frame still say it. */
function ToolsPlate({ active }: { active: boolean }) {
  const ink = active ? "var(--copper-100)" : "var(--copper-300)";
  const orbit = active ? "var(--copper-600)" : "var(--copper-800)";

  return (
    <div {...plateShell(active)} data-testid="gfp-plate-tools">
      <svg
        viewBox={`0 0 ${PLATE_WIDTH} ${PLATE_HEIGHT}`}
        width={PLATE_WIDTH}
        height={PLATE_HEIGHT}
        style={plateSvg}
        aria-hidden="true"
      >
        {TOOL_GLYPHS.map((g, i) => (
          <ellipse
            key={i}
            className="gfp-orbit gfp-loop"
            cx={g.x}
            cy={g.y}
            rx={g.orbit.rx}
            ry={g.orbit.ry}
            transform={`rotate(${g.orbit.rot} ${g.x} ${g.y})`}
            fill="none"
            stroke={orbit}
            strokeWidth={1}
            strokeDasharray="3 5"
            style={{ transition: "stroke 220ms var(--ease)" }}
          />
        ))}
      </svg>

      {TOOL_GLYPHS.map((g, i) => {
        const Icon = TOOL_ICONS[g.icon];
        return (
          <span
            key={i}
            className="gfp-loop"
            style={{
              position: "absolute",
              left: g.x - g.size / 2,
              top: g.y - g.size / 2,
              width: g.size,
              height: g.size,
              display: "inline-flex",
              color: ink,
              transition: "color 220ms var(--ease)",
              animation: `gfp-drift-${g.drift} ${g.dur}s ease-in-out ${g.delay}s infinite`,
            }}
          >
            <Icon size={g.size} color="currentColor" strokeWidth={1.5} aria-hidden />
          </span>
        );
      })}
    </div>
  );
}

/**
 * PLATE 2 · TEN CONNECTORS, TWO LEFT — and the ring is the argument as much as the count
 * is. Ten squares ride one closed ellipse and go round it forever; all ten start FILLED,
 * and eight lose the fill one at a time, take a struck diagonal, and keep going round as
 * empty boxes. Nothing is removed: ten were built, and the phase kept carrying all ten.
 *
 * THE NODES ARE HTML AND NOT SVG, which is the one place this figure leaves the idiom
 * next door. CSS motion path (`offset-path`/`offset-distance`) is what turns a closed
 * ellipse into circular motion without a frame loop and without SMIL, and it is
 * dependable on HTML elements in every browser this deck runs in; on SVG children it is
 * not. The dashed TRACK underneath is still SVG — it is a drawing, not a traveller.
 *
 * EACH NODE CARRIES ITS OWN START AND NO ANIMATION-DELAY. `--gfp-ring-start` is the
 * node's tenth of the path and its keyframe runs from there to there + 100%, so the loop
 * has no seam AND the reduced-motion squash parks each node on its own place in the ring
 * rather than stacking all ten on the path's origin — which is exactly what a negative
 * `animation-delay` would have done.
 */
function ConnectorsPlate({ active }: { active: boolean }) {
  const live = active ? "var(--copper-300)" : "var(--copper-500)";
  const track = active ? "var(--copper-600)" : "var(--copper-800)";
  const shell = plateShell(active);

  return (
    <div
      {...shell}
      data-testid="gfp-plate-connectors"
      // One variable for the live tier, so a node's own fill and its breathing ring can
      // never disagree, and the hover ramp is one transition per node rather than two.
      style={{ ...shell.style, ["--gfp-live" as string]: live }}
    >
      <svg
        viewBox={`0 0 ${PLATE_WIDTH} ${PLATE_HEIGHT}`}
        width={PLATE_WIDTH}
        height={PLATE_HEIGHT}
        style={plateSvg}
        aria-hidden="true"
      >
        {/* the track — the line the ten are travelling, dashed like the tools' orbits and
            marching under the pointer for the same reason */}
        <ellipse
          className="gfp-orbit"
          cx={RING_CX}
          cy={RING_CY}
          rx={RING_RX}
          ry={RING_RY}
          fill="none"
          stroke={track}
          strokeWidth={1}
          strokeDasharray="3 5"
          style={{ transition: "stroke 220ms var(--ease)" }}
        />
      </svg>

      {Array.from({ length: NODE_COUNT }, (_, i) => i).map((i) => {
        const survived = SURVIVOR_INDICES.includes(i);
        const order = CONNECTOR_STRUCK.indexOf(i);
        const delay = STRIKE_START_MS + order * STRIKE_STEP_MS;
        const strike = NODE_SIZE + 6;

        return (
          <span
            key={i}
            data-testid={`gfp-node-${i}`}
            data-state={survived ? "live" : "struck"}
            className="gfp-node gfp-loop"
            style={{
              left: 0,
              top: 0,
              width: NODE_SIZE,
              height: NODE_SIZE,
              ["--gfp-ring-start" as string]: `${ringStart(i)}%`,
              offsetPath: `path("${RING_PATH}")`,
              // THE BASE VALUE IS THE TRUTH AND THE TURN IS DECORATION OVER IT — the
              // tools plate's rule, and here it is load-bearing rather than tidy.
              // `gfp-ring` takes no fill mode (a loop that never ends needs none), so
              // under the reduced-motion squash the animation finishes in 0.01ms and the
              // property REVERTS to this base. Without it that base is `0%` for all ten
              // and the ring collapses to a stack of ten squares on the path's origin.
              offsetDistance: `${ringStart(i)}%`,
              background: survived ? "var(--gfp-live)" : undefined,
              transition: "background-color 220ms var(--ease)",
              animation: survived
                ? // ONE ANIMATION: it went round, and it is still going round.
                  `gfp-ring ${RING_TURN_S}s linear infinite`
                : // TWO: the same turn, plus the one-shot that takes its fill away. The
                  // scrap ends on the frame the picture rests on, so `both` is the whole
                  // of its state — a struck node is never repainted by the hover ramp.
                  `gfp-ring ${RING_TURN_S}s linear infinite, ` +
                  `gfp-scrap 620ms var(--ease) ${delay}ms both`,
            }}
          >
            {survived ? (
              // the two that held, still breathing — decoration over a fill that already
              // carries the fact
              <span
                aria-hidden
                className="gfp-loop"
                style={{
                  position: "absolute",
                  inset: -NODE_RING_INSET,
                  border: "1px solid var(--gfp-live)",
                  animation: `gfp-glow 3.1s ease-out ${1400 + i * 260}ms infinite`,
                }}
              />
            ) : (
              // the strike, drawn corner to corner and a shade past both — the same
              // pathLength=1 idiom every other line on these three plates uses
              <svg
                aria-hidden
                width={strike}
                height={strike}
                viewBox={`0 0 ${strike} ${strike}`}
                style={{ position: "absolute", left: -3, top: -3 }}
              >
                <path
                  d={`M 1 ${strike - 1} L ${strike - 1} 1`}
                  pathLength={1}
                  fill="none"
                  stroke="var(--neutral-500)"
                  strokeWidth={1.2}
                  strokeDasharray={1}
                  strokeDashoffset={1}
                  style={{ animation: `gfp-draw 380ms var(--ease) ${delay}ms both` }}
                />
              </svg>
            )}
          </span>
        );
      })}
    </div>
  );
}

/** PLATE 3 · ONE GATE, AND A QUEUE. Eighteen departments funnel into a slot one item
 *  wide and pile up behind it — front of the queue first, so the room WATCHES it back up
 *  — while one change gets out the far side on a seven-second loop. */
function QueuePlate({ active }: { active: boolean }) {
  const wall = active ? "var(--copper-600)" : "var(--copper-800)";
  const gate = active ? "var(--copper-100)" : "var(--copper-300)";
  const dot = active ? "var(--copper-300)" : "var(--copper-500)";

  const wallStyle = (delay: number): CSSProperties => ({
    animation: `gfp-draw 900ms var(--ease) ${delay}ms both`,
    transition: "stroke 220ms var(--ease)",
  });

  return (
    <div {...plateShell(active)} data-testid="gfp-plate-queue">
      <svg
        viewBox={`0 0 ${PLATE_WIDTH} ${PLATE_HEIGHT}`}
        width={PLATE_WIDTH}
        height={PLATE_HEIGHT}
        style={plateSvg}
        aria-hidden="true"
      >
        {/* the funnel — everything the organisation asked for, narrowing */}
        <path
          d={`M ${FUNNEL.x0} ${FUNNEL.topY0} L ${FUNNEL.x1} ${FUNNEL.topY1}`}
          pathLength={1}
          fill="none"
          stroke={wall}
          strokeWidth={1.2}
          strokeDasharray={1}
          strokeDashoffset={1}
          style={wallStyle(200)}
        />
        <path
          d={`M ${FUNNEL.x0} ${FUNNEL.bottomY0} L ${FUNNEL.x1} ${FUNNEL.bottomY1}`}
          pathLength={1}
          fill="none"
          stroke={wall}
          strokeWidth={1.2}
          strokeDasharray={1}
          strokeDashoffset={1}
          style={wallStyle(280)}
        />

        {/* the way out, one item wide */}
        <rect
          x={GATE.x}
          y={GATE.topBar.y}
          width={GATE.width}
          height={GATE.topBar.height}
          fill={gate}
          style={{ transition: "fill 220ms var(--ease)" }}
        />
        <rect
          x={GATE.x}
          y={GATE.bottomBar.y}
          width={GATE.width}
          height={GATE.bottomBar.height}
          fill={gate}
          style={{ transition: "fill 220ms var(--ease)" }}
        />
        <path
          d={`M ${EXIT.x0} ${EXIT.y} L ${EXIT.x1} ${EXIT.y}`}
          fill="none"
          stroke={wall}
          strokeWidth={1}
          strokeDasharray="4 6"
          opacity={0.7}
          style={{ transition: "stroke 220ms var(--ease)" }}
        />

        {/* the pile. Outer group arrives and stops; inner circle presses on the gate for
            as long as the plate runs — two transforms, so two nodes. */}
        {QUEUE_DOTS.map((d, i) => (
          <g
            key={i}
            style={{
              ["--gfp-approach" as string]: `${QUEUE_APPROACH_X}px`,
              animation: `gfp-queue-in 540ms var(--ease) ${
                QUEUE_START_MS + i * QUEUE_STEP_MS
              }ms both`,
            }}
          >
            <circle
              className="gfp-loop"
              cx={d.x}
              cy={d.y}
              r={QUEUE_DOT_RADIUS}
              fill={dot}
              style={{
                transition: "fill 220ms var(--ease)",
                animation: `gfp-jostle ${1.8 + (i % 5) * 0.22}s ease-in-out ${
                  QUEUE_START_MS + i * QUEUE_STEP_MS + 620
                }ms infinite`,
              }}
            />
          </g>
        ))}

        {/* the one change that got through */}
        <circle
          className="gfp-loop"
          cx={EXIT.x0 + 6}
          cy={EXIT.y}
          r={QUEUE_DOT_RADIUS}
          fill={gate}
          style={{
            ["--gfp-escape-x" as string]: `${EXIT.x1 - EXIT.x0 - 12}px`,
            animation: "gfp-escape 7s linear 2200ms infinite",
            transition: "fill 220ms var(--ease)",
          }}
        />
      </svg>
    </div>
  );
}
