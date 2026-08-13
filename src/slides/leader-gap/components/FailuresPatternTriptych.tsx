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
//       Frozen, the dashed orbits still say it: five paths, no order.
//   2 · TEN CONNECTORS, FOUR LEFT — ten nodes; six struck through one at a time and
//       dropped to the neutral tier, four lit and pulsing. The arithmetic is REAL DATA
//       ("6 of 10 AI connectors — scrapped"; "4 connectors" among what held), derived in
//       the geometry module from a single list of survivors so the picture cannot
//       disagree with the sentence.
//   3 · ONE GATE, AND A QUEUE — eighteen departments funnel into a slot one item wide
//       and pile up behind it, while ONE change gets out the far side on a slow loop.
//
// TWO POSES:
//   0 — THE RECORD. Three plates running, three phases printed in full.
//   1 — THE LESSONS, AND THE SHIFT. Each card contracts to `PHASE n / X OVER Y / the
//       quote`; the plates freeze; the CopperRule draws under them; and the shift — two
//       columns and the closing question — arrives in the 236px each card gave up.
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
  SHIFT_BULLET_HEIGHT,
  SHIFT_BULLET_STEP,
  SHIFT_BULLET_Y0,
  SHIFT_COL_MEASURE,
  SHIFT_COL_TITLE_HEIGHT,
  SHIFT_COL_TOP,
  SHIFT_COL_WIDTH,
  SHIFT_EYEBROW_TOP,
  SHIFT_RAIL_GAP,
  SHIFT_RAIL_WIDTH,
  SHIFT_RULE_Y,
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
  nodeAt,
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

      {/* ───── the shift · everything the contraction paid for ───── */}
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

      {C.shiftColumns.map((col, i) => (
        <Reveal
          key={col.title}
          on={isShape}
          delay={CONTRACT_MS + i * 90}
          data-testid={`gfp-shift-col-${i}`}
          style={{
            position: "absolute",
            left: shiftColLeft(i),
            top: SHIFT_COL_TOP,
            width: SHIFT_COL_WIDTH,
          }}
        >
          {/* the rail — one copper line per half of the move */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              left: 0,
              top: 2,
              width: SHIFT_RAIL_WIDTH,
              height:
                SHIFT_COL_TITLE_HEIGHT +
                9 +
                (col.bullets.length - 1) * SHIFT_BULLET_STEP +
                SHIFT_BULLET_HEIGHT -
                4,
              background: TIER.rail,
            }}
          />
          <p
            style={{
              position: "absolute",
              left: SHIFT_RAIL_WIDTH + SHIFT_RAIL_GAP,
              top: 0,
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
            <p
              key={b}
              style={{
                position: "absolute",
                left: SHIFT_RAIL_WIDTH + SHIFT_RAIL_GAP,
                top: SHIFT_BULLET_Y0 - SHIFT_COL_TOP + j * SHIFT_BULLET_STEP,
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
  /** Pose 1: the card contracts to its lesson and the plate holds its frame. */
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
      className={isShape ? "gfp-still" : undefined}
      onMouseEnter={() => onHover(card.id)}
      onMouseLeave={() => onHover(null)}
      style={shell}
    >
      {/* the plate — shared by both faces, and the reason the contraction reads as the
          same card losing its lower half */}
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

/** PLATE 2 · TEN CONNECTORS, FOUR LEFT. Six struck through one at a time and dropped to
 *  the neutral tier; four lit, filled, and still breathing. The arithmetic is real data
 *  and it is derived — see `SURVIVOR_INDICES` in the geometry module. */
function ConnectorsPlate({ active }: { active: boolean }) {
  const live = active ? "var(--copper-300)" : "var(--copper-500)";

  return (
    <div {...plateShell(active)} data-testid="gfp-plate-connectors">
      <svg
        viewBox={`0 0 ${PLATE_WIDTH} ${PLATE_HEIGHT}`}
        width={PLATE_WIDTH}
        height={PLATE_HEIGHT}
        style={plateSvg}
        aria-hidden="true"
      >
        {Array.from({ length: NODE_COUNT }, (_, i) => i).map((i) => {
          const { x, y } = nodeAt(i);
          const survived = SURVIVOR_INDICES.includes(i);
          if (survived) {
            const cx = x + NODE_SIZE / 2;
            const cy = y + NODE_SIZE / 2;
            return (
              <g key={i} data-testid={`gfp-node-${i}`} data-state="live">
                <rect
                  className="gfp-loop"
                  x={x - 3}
                  y={y - 3}
                  width={NODE_SIZE + 6}
                  height={NODE_SIZE + 6}
                  fill="none"
                  stroke={live}
                  strokeWidth={1}
                  style={{
                    transformBox: "view-box",
                    transformOrigin: `${cx}px ${cy}px`,
                    animation: `gfp-glow 3.1s ease-out ${1400 + i * 260}ms infinite`,
                    transition: "stroke 220ms var(--ease)",
                  }}
                />
                <rect
                  x={x}
                  y={y}
                  width={NODE_SIZE}
                  height={NODE_SIZE}
                  fill={live}
                  style={{ transition: "fill 220ms var(--ease)" }}
                />
              </g>
            );
          }
          const order = CONNECTOR_STRUCK.indexOf(i);
          const delay = STRIKE_START_MS + order * STRIKE_STEP_MS;
          return (
            <g
              key={i}
              data-testid={`gfp-node-${i}`}
              data-state="struck"
              style={{
                opacity: active ? 0.92 : 0.72,
                transition: "opacity 220ms var(--ease)",
              }}
            >
              <rect
                x={x}
                y={y}
                width={NODE_SIZE}
                height={NODE_SIZE}
                fill="none"
                strokeWidth={1.2}
                style={{ animation: `gfp-dim 620ms var(--ease) ${delay}ms both` }}
              />
              <path
                d={`M ${x - 3} ${y + NODE_SIZE + 3} L ${x + NODE_SIZE + 3} ${y - 3}`}
                pathLength={1}
                fill="none"
                stroke="var(--neutral-500)"
                strokeWidth={1.2}
                strokeDasharray={1}
                strokeDashoffset={1}
                style={{ animation: `gfp-draw 380ms var(--ease) ${delay}ms both` }}
              />
            </g>
          );
        })}
      </svg>
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
