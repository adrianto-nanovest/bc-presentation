// Three things handed out, four questions never answered, and the fray a rollout
// line ends in when nobody writes the next rule — §6.2's condition, carried by one
// persistent scene instead of accumulated prose.
//
// REWRITTEN 2026-08-11 (owner call, productionized from the B.2 prototype's variant D
// "BOXES × FRAY"; the prototype directory is deleted in the same change). The first
// cut was a static diptych that accumulated three text bands into one dense final
// screen; this figure is ONE PERSISTENT SCENE whose elements morph between four poses:
//
//   0 — WHAT WAS HANDED OUT. Three icon boxes across the top, hero-sized. The spine
//       draws its first segment low across the stage and lands one labelled dot:
//       HANDED OUT. The organisation did the visible things right.
//   1 — AND WHAT WAS NEVER WRITTEN DOWN. The issued row holds its ground; the four
//       question boxes land directly below it, each with the EMPTY answer rule that
//       belongs to it. The spine extends to a second labelled dot — NEVER WRITTEN —
//       and pings there: guidance stops here.
//   2 — WHAT THE SILENCE LEAVES BEHIND. Both bands compact into two tidy chip rows;
//       the freed space is where the whole spine RISES, and the stopped line fans out
//       into two dozen swaying private hairlines — one per improvised rule, each
//       ending in a tick somewhere nobody else can read.
//   3 — THE FRAME. The fan dims to an afterimage, one dashed line marches on from the
//       second dot — the rule only the leader can write — and the closer lands under
//       it: nobody broke a rule; writing one is the leader's job.
//
// WHY PERSISTENT AND NOT REMOUNTING POSES — B.1's reason, inherited: the morphs ARE
// the argument's connective tissue (the boxes that compact into receipts are the same
// boxes that were argued, and the line that frays is the line the room watched stop),
// so elements keep identity and every pose change is a two-way CSS TRANSITION set
// inline. Mount choreography — draws, pops, the fan opening — is keyframes from
// ./no-sop.css on nodes that mount WITH their beat, so a walk backwards and forwards
// replays the entry. An element that needs both wears a wrapper: the outer node owns
// the pose transition, the inner owns the mount animation, because an animation's
// fill-mode holds its properties hostage against any transition on the same node.
//
// THE POSE GATE IS INLINE OPACITY — {@link gate} always writes `opacity`, so the unit
// test reads visibility off `el.style.opacity` the way `./HardestPartBeats.tsx`'s
// does. Opacity means TIME on this stage — not argued yet (a gate), or already argued
// past (the fan's dim to 0.16 at the closer) — plus one documented TEXTURE case: the
// strands' own 0.5–0.9 spread, variation inside a single role so two dozen identical
// claims read as a fray and not as a wedge. Rank between ROLES is a colour tier,
// never opacity — the deck's rule, unchanged.
//
// THIS FIGURE MOUNTS `<svg>` AND STILL MOUNTS ZERO SMIL NODES, at every pose, under
// any motion preference — the first `<svg>` on this slide, and it closes the
// reduced-motion AC the way the Capability Ladder next door closes it rather than the
// way the old diptych did: every vector motion here is a CSS animation or transition
// (`no-sop-draw` is `gap-ladder-draw`'s idiom — pathLength 1, dasharray 1, dashoffset
// animated by keyframe), so the global `prefers-reduced-motion: reduce` squash in
// `src/styles/globals.css` parks every draw on its finished frame and runs the two
// infinite decorations once. No `<animate>`, no `<animateTransform>`, no `<set>`, no
// matchMedia gate, no JS motion source at all.
//
// CSS VARS ONLY, NO HEX AND NO rgba() LITERALS — including the box chrome
// (./no-sop.css) and every stroke below.
import { type CSSProperties, type ReactNode } from "react";
// Section E's copy, the tree's de facto shared reveal primitive — the census of its
// importers is kept by `leader-mandate/components/EnablementModel.tsx`; this file
// keeps its one use (the verdict) from before the redesign, so the count holds.
import { Reveal } from "@/slides/foundation-core-section-e/components/Reveal";
import { highlight } from "@/components/highlight";
import "./no-sop.css";
import {
  BAND_RIGHT,
  CHIP_HEIGHT,
  CONDITION_TITLE_TOP,
  DOT_ISSUED_X,
  DOT_LABEL_OFFSET_Y,
  DOT_LABEL_WIDTH,
  DOT_UNWRITTEN_X,
  FAN_ORIGIN,
  FIGURE_HEIGHT,
  FIGURE_LEFT,
  FIGURE_TOP,
  FIGURE_WIDTH,
  FRAY_STRANDS,
  ISSUED_BOX_WIDTH,
  ISSUED_HERO_HEIGHT,
  ISSUED_TOP,
  PING_RADIUS,
  QUESTION_CHIP_TOP,
  QUESTION_CHIP_WIDTH,
  QUESTION_HERO_HEIGHT,
  QUESTION_HERO_WIDTH,
  SPINE_RISE,
  SPINE_X0,
  SPINE_Y,
  UNWRITTEN_TITLE_TOP_CHIP,
  UNWRITTEN_TITLE_TOP_HERO,
  VERDICT_LEFT,
  VERDICT_TOP,
  VERDICT_WIDTH,
  issuedBoxLeft,
  questionChipLeft,
  questionHeroLeft,
  questionHeroTop,
} from "../no-sop-geometry";
import { gapNoSopContent as C } from "../content";

// ───────────────────── the tiers, in one table ─────────────────────

/**
 * One tier per ROLE, and not one per box — brightest text first, under the headline's
 * `--neutral-50`:
 *
 *   role        token           register
 *   verdict     --neutral-100   24px serif — the closer
 *   hero row    --neutral-200   14.5/13.5px sans — every hero face's sentence
 *   chip text   --neutral-300   10px mono caps — the receipts
 *   label       --copper-400    11px mono caps — the three band titles; 10px — the
 *                               two dot captions
 *   icon/spine  --copper-300/400/500 — the small illustrations and the step diagram,
 *                               brighter than the strands they argue against
 *   blank       --copper-700    the empty rule inside each question hero
 *
 * NO COPPER TEXT ON THIS STAGE beyond the mono labels — the rule
 * `leader-invest/components/SubscriptionBeats.tsx` records: copper text means a thing
 * quoted from somewhere else, and THIS SLIDE QUOTES NOTHING (no statistic, no source —
 * `../content.ts` on why it deliberately carries none).
 *
 * THE FRAY'S FOUR TINTS — copper-500/600/700 and ONE neutral-500 — are the one place a
 * neutral enters the graphics: the strands are two dozen instances of a single role
 * ("a private rule"), spread over four adjacent tints as texture, and none of the four
 * is brighter than the spine that fed them. What was handed out stays the brightest
 * mark; what the vacuum produced is dimmer than the line that stopped. THAT ORDER IS
 * THE IMAGE.
 */
const TIER = {
  label: "var(--copper-400)",
  icon: "var(--copper-300)",
  spine: "var(--copper-400)",
  dotIssued: "var(--copper-500)",
  dotUnwritten: "var(--copper-300)",
  ping: "var(--copper-500)",
  heroRow: "var(--neutral-200)",
  chipText: "var(--neutral-300)",
  blank: "var(--copper-700)",
  leaderLine: "var(--copper-200)",
  verdict: "var(--neutral-100)",
} as const;

/** The fray's four tints, indexed by each strand's deterministic `tint` — the palette
 *  half of `FRAY_STRANDS`, kept here because the geometry module carries no colour. */
const STRAND_TINTS = [
  "var(--copper-500)",
  "var(--copper-600)",
  "var(--copper-700)",
  "var(--neutral-500)",
] as const;

// ───────────────────── the two motions ─────────────────────

/**
 * The morph every persistent box rides between poses — geometry plus the gate, plus
 * E.4's hover pace for the chrome `./no-sop.css` owns (carried inline because this
 * string overrides any class transition).
 */
const MOVE =
  "left 650ms var(--ease), top 650ms var(--ease), " +
  "width 650ms var(--ease), height 650ms var(--ease), " +
  "opacity 450ms var(--ease), " +
  "border-color 200ms var(--ease), background 200ms var(--ease)";

/**
 * A pose gate: opacity written ALWAYS (the test's visibility hook), transitioned both
 * ways, delayed only on the way IN — leaving must be immediate or a pose walk
 * backwards drags ghosts through the morph.
 */
function gate(on: boolean, delayMs = 0, rise = false): CSSProperties {
  return {
    opacity: on ? 1 : 0,
    ...(rise ? { transform: on ? "translateY(0)" : "translateY(8px)" } : null),
    transition:
      `opacity 450ms var(--ease) ${on ? delayMs : 0}ms` +
      (rise ? `, transform 450ms var(--ease) ${on ? delayMs : 0}ms` : ""),
  };
}

/** A path drawing itself in — `no-sop-draw` over the pathLength=1 idiom. Mount
 *  choreography: lives on nodes that mount WITH their beat. */
const drawStyle = (delay: number, dur = 0.9): CSSProperties => ({
  strokeDasharray: 1,
  strokeDashoffset: 1,
  animation: `no-sop-draw ${dur}s var(--ease) ${delay}ms forwards`,
});

// ───────────────────── the small illustrations ─────────────────────

/** One stroke set per content id — hairline pictograms in the icon tier, `aria-hidden`
 *  because every one of them sits beside the words it depicts. NO DIGIT and no text is
 *  painted by any of these: they are strokes only, so the no-digit rule
 *  (`../content.ts`) is a copy fact the marks cannot break. */
function Icon({ size, children }: { size: number; children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke={TIER.icon}
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      {children}
    </svg>
  );
}

/** Keyed by the content tuples' own ids, so a reordered tuple keeps its pictures. */
const ICONS: Record<string, ReactNode> = {
  // a key handed over
  login: (
    <>
      <circle cx="7" cy="12" r="3.2" />
      <path d="M10.2 12H20M17 12v3.4M20 12v2.6" />
    </>
  ),
  // a screen, playing, on a stand
  demonstration: (
    <>
      <rect x="3.5" y="4.5" width="17" height="11" rx="1.5" />
      <path d="M12 15.5v3M8.5 20.5h7" />
      <path d="M10.4 7.6l4.3 2.4-4.3 2.4z" fill={TIER.icon} stroke="none" />
    </>
  ),
  // the memo everyone got
  encouragement: (
    <>
      <rect x="3.5" y="6" width="17" height="12.5" rx="1.5" />
      <path d="M3.5 7.2l8.5 6 8.5-6" />
    </>
  ),
  // work going into a tray
  "may-go-in": (
    <>
      <path d="M12 3.5v6.4M9.2 7.2L12 10l2.8-2.8" />
      <path d="M3.5 13.5h4.6l1.8 2.4h4.2l1.8-2.4h4.6" />
      <path d="M3.5 13.5V19a1 1 0 0 0 1 1h15a1 1 0 0 0 1-1v-5.5" />
    </>
  ),
  // the prohibition that was never drawn
  "may-never": (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M6.6 6.6l10.8 10.8" />
    </>
  ),
  // scales, with nobody holding them
  "who-decides": (
    <>
      <path d="M12 4.5v14M8.5 19.5h7M5 7.5h14" />
      <path d="M5 7.5l-2.3 4.8M5 7.5l2.3 4.8M2.7 12.3a2.4 2.4 0 0 0 4.6 0" />
      <path d="M19 7.5l-2.3 4.8M19 7.5l2.3 4.8M16.7 12.3a2.4 2.4 0 0 0 4.6 0" />
    </>
  ),
  // the disclosure that has no address
  "who-hears": (
    <path d="M5.5 5h13a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-8l-4 3.5V16h-1a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z" />
  ),
};

// ───────────────────── type registers ─────────────────────

const monoLabel: CSSProperties = {
  fontFamily: "var(--mono)",
  fontSize: 11,
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  color: TIER.label,
  whiteSpace: "nowrap",
};

const dotLabel: CSSProperties = {
  position: "absolute",
  width: DOT_LABEL_WIDTH,
  textAlign: "center",
  fontFamily: "var(--mono)",
  fontSize: 10,
  lineHeight: 1.3,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: TIER.label,
  whiteSpace: "nowrap",
};

const chipText: CSSProperties = {
  fontFamily: "var(--mono)",
  fontSize: 10,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: TIER.chipText,
  whiteSpace: "nowrap",
};

/** Geometry only — border and fill live in `.no-sop-box` (./no-sop.css) so the
 *  E.4-style :hover can override them. */
const boxShell: CSSProperties = {
  position: "absolute",
  boxSizing: "border-box",
  overflow: "hidden",
};

const layer: CSSProperties = { position: "absolute", inset: 0 };

/** THE EMPTY ANSWER RULE inside each question hero — the surviving half of the first
 *  cut's image, still never filled at any pose. Inset past the box's padding, one
 *  emphatic hairline in the blank tier, 14px off the box floor so it reads as a line
 *  somebody was supposed to write on rather than as the box's own border. */
const BLANK_INSET_X = 20;
const BLANK_BOTTOM = 14;
const BLANK_HEIGHT = 1.5;

// ───────────────────── the figure ─────────────────────

export interface NoSopBeatsProps {
  /** 0…3. See `../gap-no-sop.tsx` for what each pose argues. */
  pose: number;
}

export function NoSopBeats({ pose }: NoSopBeatsProps) {
  // `>=` and not `===`, the step-reveal rule: a pose is everything argued so far.
  const showQuestions = pose >= 1;
  const compact = pose >= 2; // both bands to chips, the spine rises, the fan is hero
  const showFray = pose >= 2;
  const showCloser = pose >= 3;

  const spineTop = compact ? SPINE_Y - SPINE_RISE : SPINE_Y;

  return (
    <div
      style={{
        position: "absolute",
        left: FIGURE_LEFT,
        top: FIGURE_TOP,
        width: FIGURE_WIDTH,
        height: FIGURE_HEIGHT,
      }}
    >
      {/* ───── the three band titles — each arrives with its beat and STAYS (owner
          call: titles never replace each other). Title 2 rides with its band when the
          stage compacts; title 3 arrives over the space the fan takes. ───── */}
      <div
        data-testid="no-sop-issued-eyebrow"
        style={{ position: "absolute", left: 0, top: 0, ...monoLabel }}
      >
        {C.issuedEyebrow}
      </div>
      <div
        data-testid="no-sop-unwritten-eyebrow"
        style={{
          position: "absolute",
          left: 0,
          top: compact ? UNWRITTEN_TITLE_TOP_CHIP : UNWRITTEN_TITLE_TOP_HERO,
          ...monoLabel,
          ...gate(showQuestions, 100),
          transition:
            `top 650ms var(--ease), ` +
            `opacity 450ms var(--ease) ${showQuestions ? 100 : 0}ms`,
        }}
      >
        {C.unwrittenEyebrow}
      </div>
      <div
        data-testid="no-sop-condition-eyebrow"
        style={{
          position: "absolute",
          left: 0,
          top: CONDITION_TITLE_TOP,
          ...monoLabel,
          ...gate(showFray, 300),
        }}
      >
        {C.conditionEyebrow}
      </div>

      {/* ───── the step diagram — the spine, its two dots, the fan, the closer's
          marching line. ONE svg, CSS-animated only: zero SMIL (see the header). ── */}
      <svg
        data-testid="no-sop-diagram"
        viewBox={`0 0 ${FIGURE_WIDTH} ${FIGURE_HEIGHT}`}
        width={FIGURE_WIDTH}
        height={FIGURE_HEIGHT}
        style={{ position: "absolute", inset: 0, overflow: "visible", pointerEvents: "none" }}
        aria-hidden="true"
      >
        {/* the spine — authored LOW, riding up as one group when the stage compacts,
            so everything on it moves as one object */}
        <g
          data-testid="no-sop-spine"
          style={{
            transform: compact ? `translateY(-${SPINE_RISE}px)` : "translateY(0)",
            transition: "transform 650ms var(--ease)",
          }}
        >
          {/* pose 0 — the first segment and its dot: the rollout DELIVERED here */}
          <path
            data-testid="no-sop-spine-issued"
            d={`M ${SPINE_X0} ${SPINE_Y} H ${DOT_ISSUED_X}`}
            pathLength={1}
            fill="none"
            stroke={TIER.spine}
            strokeWidth={2.5}
            style={drawStyle(150, 0.6)}
          />
          <circle
            data-testid="no-sop-dot-issued"
            cx={DOT_ISSUED_X}
            cy={SPINE_Y}
            r={4}
            fill={TIER.dotIssued}
            className="fade on"
            style={{ animationDelay: "650ms" }}
          />

          {/* pose 1 — the line reaches the questions and STOPS. Mounted on arrival so
              the walk back replays the draw. */}
          {showQuestions && (
            <>
              <path
                data-testid="no-sop-spine-unwritten"
                d={`M ${DOT_ISSUED_X} ${SPINE_Y} H ${DOT_UNWRITTEN_X}`}
                pathLength={1}
                fill="none"
                stroke={TIER.spine}
                strokeWidth={2.5}
                style={drawStyle(100, 0.7)}
              />
              <circle
                data-testid="no-sop-dot-unwritten"
                cx={DOT_UNWRITTEN_X}
                cy={SPINE_Y}
                r={4.5}
                fill={TIER.dotUnwritten}
                className="fade on"
                style={{ animationDelay: "700ms" }}
              />
              {/* the terminus waiting for an answer that never comes — two staggered
                  rings, pure decoration, parked invisible under reduced motion */}
              {[0, 1.3].map((d) => (
                <circle
                  key={d}
                  cx={DOT_UNWRITTEN_X}
                  cy={SPINE_Y}
                  r={PING_RADIUS}
                  fill="none"
                  stroke={TIER.ping}
                  strokeWidth={1.3}
                  style={{
                    transformBox: "view-box",
                    transformOrigin: `${DOT_UNWRITTEN_X}px ${SPINE_Y}px`,
                    transform: "scale(0.12)",
                    opacity: 0,
                    animation: `no-sop-ping 2.6s ease-out ${900 + d * 1000}ms infinite`,
                  }}
                />
              ))}
            </>
          )}
        </g>

        {/* pose 2 — the fan, authored at the risen position it appears in. Dims to an
            afterimage when the closer lands: argued past, still true. */}
        {showFray && (
          <g
            data-testid="no-sop-fray"
            className="no-sop-dimmable"
            style={{ opacity: showCloser ? 0.16 : 1 }}
          >
            {FRAY_STRANDS.map((s, i) => (
              <g
                key={i}
                style={{
                  transformBox: "view-box",
                  transformOrigin: `${FAN_ORIGIN.x}px ${FAN_ORIGIN.y}px`,
                  animation: `no-sop-wobble ${s.swayDur}s ease-in-out ${s.swayDelay}s infinite alternate`,
                }}
              >
                <path
                  d={s.d}
                  pathLength={1}
                  fill="none"
                  stroke={STRAND_TINTS[s.tint]}
                  strokeWidth={1.1}
                  opacity={s.opacity}
                  style={drawStyle(s.delay + 350)}
                />
                <rect
                  x={s.tick.x - 1}
                  y={s.tick.y - 6}
                  width={2}
                  height={12}
                  fill={STRAND_TINTS[s.tint]}
                  opacity={s.opacity}
                  className="fade on"
                  style={{
                    transformBox: "view-box",
                    transformOrigin: `${s.tick.x}px ${s.tick.y}px`,
                    rotate: `${s.tick.rot}deg`,
                    animationDelay: `${s.delay + 1100}ms`,
                  }}
                />
              </g>
            ))}
          </g>
        )}

        {/* pose 3 — the one line only the leader can write: dashed because it is not
            written yet, marching because it is waiting on the room */}
        {showCloser && (
          <path
            data-testid="no-sop-leader-line"
            d={`M ${FAN_ORIGIN.x} ${FAN_ORIGIN.y} H ${BAND_RIGHT}`}
            fill="none"
            stroke={TIER.leaderLine}
            strokeWidth={2}
            strokeDasharray="12 9"
            style={{
              animation:
                "fadeReveal 0.5s var(--ease) 250ms both, no-sop-march 1.7s linear 250ms infinite",
            }}
          />
        )}
      </svg>

      {/* ───── the dot captions — the diagram's own titles, riding the spine ───── */}
      <div
        data-testid="no-sop-dot-label-issued"
        className="fade on"
        style={{
          ...dotLabel,
          left: DOT_ISSUED_X - DOT_LABEL_WIDTH / 2,
          top: spineTop + DOT_LABEL_OFFSET_Y,
          transition: "top 650ms var(--ease)",
          animationDelay: "700ms",
        }}
      >
        {C.issuedDotLabel}
      </div>
      {showQuestions && (
        <div
          data-testid="no-sop-dot-label-unwritten"
          className="fade on"
          style={{
            ...dotLabel,
            left: DOT_UNWRITTEN_X - DOT_LABEL_WIDTH / 2,
            top: spineTop + DOT_LABEL_OFFSET_Y,
            transition: "top 650ms var(--ease)",
            animationDelay: "750ms",
          }}
        >
          {C.unwrittenDotLabel}
        </div>
      )}

      {/* ───── the issued band — hero through poses 0–1, receipts after. The box is
          the persistent node (MOVE); the pop is on an inner layer; the two faces
          crossfade inside it. ───── */}
      {C.issued.map((item, i) => (
        <div
          key={item.id}
          data-testid={`no-sop-issued-${item.id}`}
          className="no-sop-box"
          style={{
            ...boxShell,
            left: issuedBoxLeft(i),
            top: ISSUED_TOP,
            width: ISSUED_BOX_WIDTH,
            height: compact ? CHIP_HEIGHT : ISSUED_HERO_HEIGHT,
            transition: MOVE,
          }}
        >
          <div style={{ ...layer, animation: `no-sop-pop 0.55s var(--ease) ${350 + i * 220}ms both` }}>
            {/* hero face */}
            <div
              data-testid={`no-sop-issued-hero-${item.id}`}
              style={{
                ...layer,
                padding: "0 20px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: 14,
                ...gate(!compact),
              }}
            >
              <Icon size={26}>{ICONS[item.id]}</Icon>
              <span
                style={{
                  fontFamily: "var(--sans)",
                  fontSize: 14.5,
                  lineHeight: 1.45,
                  color: TIER.heroRow,
                  whiteSpace: "nowrap",
                }}
              >
                {item.label}
              </span>
            </div>
            {/* chip face */}
            <div
              data-testid={`no-sop-issued-chip-${item.id}`}
              style={{
                ...layer,
                padding: "0 14px",
                display: "flex",
                alignItems: "center",
                gap: 10,
                ...gate(compact, 250),
              }}
            >
              <Icon size={14}>{ICONS[item.id]}</Icon>
              <span style={chipText}>{item.short}</span>
            </div>
          </div>
        </div>
      ))}

      {/* ───── the question band — a 2×2 hero grid directly below the issued row,
          a four-chip row after. THE QUESTION AND ITS EMPTY RULE ARE ONE FACE: the
          blank arrives with its question and is never filled at any pose. ───── */}
      {C.questions.map((q, i) => (
        <div
          key={q.id}
          data-testid={`no-sop-question-${q.id}`}
          className="no-sop-box"
          style={{
            ...boxShell,
            left: compact ? questionChipLeft(i) : questionHeroLeft(i),
            top: compact ? QUESTION_CHIP_TOP : questionHeroTop(i),
            width: compact ? QUESTION_CHIP_WIDTH : QUESTION_HERO_WIDTH,
            height: compact ? CHIP_HEIGHT : QUESTION_HERO_HEIGHT,
            ...gate(showQuestions, 200 + i * 170),
            transition: `${MOVE}, opacity 450ms var(--ease) ${showQuestions ? 200 + i * 170 : 0}ms`,
          }}
        >
          {/* hero face — icon, the question, its empty answer rule */}
          <div
            data-testid={`no-sop-question-hero-${q.id}`}
            style={{ ...layer, padding: "16px 20px", ...gate(!compact) }}
          >
            <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
              <Icon size={22}>{ICONS[q.id]}</Icon>
              <span
                style={{
                  fontFamily: "var(--sans)",
                  fontSize: 13.5,
                  lineHeight: 1.35,
                  color: TIER.heroRow,
                }}
              >
                {q.label}
              </span>
            </div>
            <div
              data-testid={`no-sop-answer-blank-${q.id}`}
              style={{
                position: "absolute",
                left: BLANK_INSET_X,
                right: BLANK_INSET_X,
                bottom: BLANK_BOTTOM,
                height: BLANK_HEIGHT,
                background: TIER.blank,
              }}
            />
          </div>
          {/* chip face */}
          <div
            data-testid={`no-sop-question-chip-${q.id}`}
            style={{
              ...layer,
              padding: "0 12px",
              display: "flex",
              alignItems: "center",
              gap: 8,
              ...gate(compact, 250),
            }}
          >
            <Icon size={12}>{ICONS[q.id]}</Icon>
            <span style={{ ...chipText, fontSize: 9.5 }}>{q.short}</span>
          </div>
        </div>
      ))}

      {/* ───── pose 3 — the verdict, under the marching line: the one sentence here
          addressed to the room, and what stops four unanswered questions and a frayed
          line reading as an accusation. ───── */}
      {showCloser && (
        <div style={{ position: "absolute", left: VERDICT_LEFT, top: VERDICT_TOP, width: VERDICT_WIDTH }}>
          <Reveal
            on
            as="p"
            delay={650}
            data-testid="no-sop-closer"
            style={{
              margin: 0,
              fontFamily: "var(--serif)",
              fontSize: 24,
              lineHeight: 1.45,
              textAlign: "center",
              color: TIER.verdict,
            }}
          >
            {highlight(C.closer, C.closerKw)}
          </Reveal>
        </div>
      )}
    </div>
  );
}
