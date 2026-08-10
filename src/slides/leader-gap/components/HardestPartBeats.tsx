// Two lanes off one signature: the access lane finishes in under a second, the
// capability lane crawls behind a live day counter — and the gap §6.1 names is
// the difference between those two speeds, carried by motion instead of prose.
//
// REWRITTEN 2026-08-10 (owner call, productionized from the B.1 prototype's
// variant B "TWO SPEEDS"; the prototype directory is deleted in the same change).
// The first cut was five static bands that accumulated onto one screen; this
// figure is ONE PERSISTENT SCENE whose elements MORPH between three poses:
//
//   0 — THE RACE. Both lanes at full height. The access lane fills to 100% in
//       850ms and flags DAY 1 · DONE; the capability lane crawls to a sliver
//       over six seconds and its day counter keeps ticking. The race line lands
//       last, with the slide's first keyword: "signature".
//   1 — THE ANATOMY. The access lane THINS IN PLACE (same top, 66→20px) — it is
//       done arguing and becomes a fact. The capability lane rises and grows,
//       and its unrun distance splits into the five structural segments, each a
//       word on the lane and a note under it. The pose-0 footnote leaves the
//       stage here (owner call). Verdict: "None of it can be procured."
//   2 — THE SUMMARY. The capability lane parks under the access lane at the
//       same thin height — a two-line scoreboard: PROCURED · DONE DAY 1 against
//       EARNED · STILL RUNNING — and the evidence lands beneath: the verbatim
//       statistic with its attribution, the split bar cut from PEOPLE_SHARE,
//       and the closer.
//
// WHY PERSISTENT AND NOT REMOUNTING POSES: the morphs ARE the argument's
// connective tissue (the same lane that raced is the lane that gets dissected,
// and the same two lanes are what the scoreboard summarises), so the elements
// must keep identity across poses. Every pose change is therefore a CSS
// TRANSITION set inline (runs both ways on the pose walk); mount choreography —
// the race itself — is keyframes from ./hardest-part.css and runs ONCE, at
// slide entry. An element that needs BOTH wears a wrapper: the outer node owns
// the pose gate, the inner owns the mount animation, because an animation's
// fill-mode holds its properties hostage against any transition on the same node.
//
// THE POSE GATE IS INLINE OPACITY — {@link gate} always writes `opacity`, so the
// unit test reads visibility off `el.style.opacity` the way the step-reveal
// siblings read `.fade.on`. Opacity here means TIME (not argued yet / already
// argued past), never rank — the deck's rule, unchanged.
//
// ZERO SMIL, ZERO `<svg>`, BY CONSTRUCTION — the property the first cut kept and
// this one keeps the same way: nothing here mounts a vector element at all. The
// one JS motion source is the day counter's interval, and it gates itself on
// `prefers-reduced-motion` (the global CSS squash cannot reach an interval).
//
// CSS VARS ONLY, NO HEX AND NO rgba() LITERALS. Rank between the two lane fills
// is a colour tier (copper gradient against `--copper-700`), never opacity.
import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { highlight } from "@/components/highlight";
import "./hardest-part.css";
import {
  ACCESS_LABEL_TOP,
  ACCESS_TRACK_HEIGHT,
  ACCESS_TRACK_HEIGHT_THIN,
  ACCESS_TRACK_TOP,
  CAPTION_TOP,
  CONTENT_WIDTH,
  EARNED_PROGRESS,
  EYEBROW_TOP,
  FOOTNOTE_TOP,
  SIDE_MARGIN,
  SUMMARY_BAR_HEIGHT,
  SUMMARY_BAR_LABEL_TOP,
  SUMMARY_BAR_LEFT,
  SUMMARY_BAR_TOP,
  SUMMARY_CLOSER_TOP,
  SUMMARY_PEOPLE_WIDTH,
  SUMMARY_SOURCE_TOP,
  SUMMARY_STATISTIC_TOP,
  SUMMARY_TECHNOLOGY_LEFT,
  SUMMARY_TECHNOLOGY_WIDTH,
  TICK_COUNT,
  VERDICT_TOP,
  capabilityGeometry,
  segmentSlice,
} from "../hardest-part-geometry";
import { gapHardestPartContent as C } from "../content";

// ───────────────────── type registers ─────────────────────

/** The mono LABEL register — lane names, tags, eyebrows, in-bar items. */
function mono(size: number, color: string, ls = 0.16): CSSProperties {
  return {
    fontFamily: "var(--mono)",
    fontSize: size,
    letterSpacing: `${ls}em`,
    textTransform: "uppercase",
    color,
  };
}

/** The prose register — the verdict lines, the statistic, the closer. */
function serif(size: number, color: string): CSSProperties {
  return { fontFamily: "var(--serif)", fontSize: size, lineHeight: 1.3, color, margin: 0 };
}

/** Both lane tracks: full width, hairline copper border, near-surface bed. */
const TRACK: CSSProperties = {
  position: "absolute",
  left: SIDE_MARGIN,
  width: CONTENT_WIDTH,
  border: "1px solid var(--copper-800)",
  background: "var(--neutral-800)",
  overflow: "hidden",
  boxSizing: "border-box",
};

// ───────────────────── the two motions ─────────────────────

/** The morph every persistent box rides between poses — top and height only,
 *  so a mount keyframe on a CHILD node is never fighting it. */
const MOVE = "top 650ms var(--ease), height 650ms var(--ease)";

/**
 * A pose gate: opacity written ALWAYS (the test's visibility hook), transitioned
 * both ways, delayed only on the way IN — leaving must be immediate or a pose
 * walk backwards drags ghosts through the morph.
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

// ───────────────────── the moving parts ─────────────────────

/**
 * Days tick from slide entry and never stop — the clock the access lane already
 * beat. Hidden after pose 0 but still running underneath, so a walk BACK to the
 * race finds more days gone, which is the honest direction for this number.
 * Gated on `prefers-reduced-motion` at mount: the global CSS squash cannot
 * reach an interval, so the interval asks the same query itself.
 */
function DayCounter() {
  const [day, setDay] = useState(1);
  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches === true;
    if (reduced) return undefined;
    const t = setInterval(() => setDay((d) => Math.min(d + 1, 999)), 650);
    return () => clearInterval(t);
  }, []);
  return (
    <>
      {C.dayLabel} {day}
    </>
  );
}

/** One eyebrow slot, three texts, crossfaded in place. */
function Eyebrow({ on, testid, children }: { on: boolean; testid: string; children: ReactNode }) {
  return (
    <div
      data-testid={testid}
      style={{
        position: "absolute",
        left: SIDE_MARGIN,
        top: EYEBROW_TOP,
        ...mono(11, "var(--copper-400)", 0.22),
        ...gate(on),
      }}
    >
      {children}
    </div>
  );
}

// ───────────────────── the figure ─────────────────────

export interface HardestPartBeatsProps {
  /** 0…2. See `../gap-hardest-part.tsx` for what each pose argues. */
  pose: number;
}

export function HardestPartBeats({ pose }: HardestPartBeatsProps) {
  const cap = capabilityGeometry(Math.min(pose, 2));

  return (
    <>
      <Eyebrow on={pose === 0} testid="hardest-part-eyebrow-race">
        {C.raceEyebrow}
      </Eyebrow>
      <Eyebrow on={pose === 1} testid="hardest-part-eyebrow-anatomy">
        {C.anatomyEyebrow}
      </Eyebrow>
      <Eyebrow on={pose >= 2} testid="hardest-part-eyebrow-summary">
        {C.statisticEyebrow}
      </Eyebrow>

      {/* ═══ THE ACCESS LANE — one position, two heights ═══ */}
      <div
        style={{
          position: "absolute",
          left: SIDE_MARGIN,
          top: ACCESS_LABEL_TOP,
          width: CONTENT_WIDTH,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span data-testid="hardest-part-access-lane" style={mono(13, "var(--neutral-100)", 0.18)}>
          {C.accessLane}
        </span>
        {/* the tag and its scoreboard form crossfade in one right-aligned slot */}
        <span style={{ position: "relative" }}>
          <span
            data-testid="hardest-part-access-tag"
            style={{ ...mono(11, "var(--copper-300)", 0.18), ...gate(pose === 0) }}
          >
            {C.accessTag}
          </span>
          <span
            data-testid="hardest-part-access-tag-done"
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              whiteSpace: "nowrap",
              ...mono(11, "var(--copper-300)", 0.18),
              ...gate(pose >= 1, 400),
            }}
          >
            {C.accessTagDone}
          </span>
        </span>
      </div>
      <div
        data-testid="hardest-part-access-track"
        style={{
          ...TRACK,
          top: ACCESS_TRACK_TOP,
          height: pose >= 1 ? ACCESS_TRACK_HEIGHT_THIN : ACCESS_TRACK_HEIGHT,
          transition: MOVE,
        }}
      >
        <div
          data-testid="hardest-part-access-fill"
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(90deg, var(--copper-700), var(--copper-500))",
            transformOrigin: "left",
            animation: "hp-fill-fast 850ms 400ms var(--ease) both",
          }}
        />
        {/* full-height dressing — gated out when the lane thins */}
        <div data-testid="hardest-part-access-items" style={gate(pose === 0)}>
          {C.accessItems.map((item, i) => (
            <span
              key={item}
              style={{
                position: "absolute",
                left: 40 + i * 190,
                top: 24,
                ...mono(11, "var(--copper-50)", 0.2),
                animation: "hp-pop 350ms 1300ms var(--ease) both",
              }}
            >
              {item}
            </span>
          ))}
          <span
            data-testid="hardest-part-access-done"
            style={{
              position: "absolute",
              right: 20,
              top: 24,
              ...mono(11, "var(--copper-100)", 0.18),
              fontWeight: 700,
              animation: "hp-pop 400ms 1500ms cubic-bezier(0.2, 1.3, 0.3, 1) both",
            }}
          >
            {C.accessDone}
          </span>
        </div>
      </div>

      {/* ═══ THE CAPABILITY LANE — the shape-shifter ═══ */}
      <div
        style={{
          position: "absolute",
          left: SIDE_MARGIN,
          top: cap.labelTop,
          width: CONTENT_WIDTH,
          display: "flex",
          justifyContent: "space-between",
          transition: MOVE,
        }}
      >
        <span
          data-testid="hardest-part-capability-lane"
          style={mono(13, "var(--neutral-100)", 0.18)}
        >
          {C.capabilityLane}
        </span>
        <span style={{ position: "relative" }}>
          <span
            data-testid="hardest-part-capability-tag"
            style={{ ...mono(11, "var(--copper-300)", 0.18), ...gate(pose < 2) }}
          >
            {C.capabilityTag}
          </span>
          <span
            data-testid="hardest-part-capability-tag-running"
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              whiteSpace: "nowrap",
              ...mono(11, "var(--copper-300)", 0.18),
              ...gate(pose >= 2, 400),
            }}
          >
            {C.capabilityTagRunning}
          </span>
        </span>
      </div>
      <div
        data-testid="hardest-part-capability-track"
        style={{
          ...TRACK,
          top: cap.trackTop,
          height: cap.trackHeight,
          transition: MOVE,
        }}
      >
        {/* milestone ticks — pose 0's texture only */}
        <div data-testid="hardest-part-capability-ticks" style={gate(pose === 0)}>
          {Array.from({ length: TICK_COUNT }, (_, i) => (
            <span
              key={i}
              style={{
                position: "absolute",
                left: `${((i + 1) / (TICK_COUNT + 1)) * 100}%`,
                top: 0,
                bottom: 0,
                borderLeft: "1px solid var(--copper-900)",
              }}
            />
          ))}
        </div>

        {/* the sliver a signature bought — crawls in at mount, then persists */}
        <div
          data-testid="hardest-part-capability-fill"
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            width: `${EARNED_PROGRESS * 100}%`,
            background: "var(--copper-700)",
            transformOrigin: "left",
            animation: "hp-fill-slow 6000ms 400ms linear both",
          }}
        >
          <span
            data-testid="hardest-part-capability-sofar"
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: "50%",
              marginTop: -8,
              textAlign: "center",
              ...mono(10, "var(--copper-200)", 0.14),
              ...gate(pose === 1, 300),
            }}
          >
            {C.soFar}
          </span>
        </div>

        {/* the leading edge, still working — pose 0 only */}
        <div data-testid="hardest-part-capability-live" style={gate(pose === 0)}>
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: `${EARNED_PROGRESS * 100}%`,
              width: 4,
              background: "var(--copper-300)",
              animation:
                "hp-fade 400ms 6400ms var(--ease) both, hp-pulse 1.6s 6400ms ease-in-out infinite",
            }}
          />
          <span
            style={{
              position: "absolute",
              left: `calc(${EARNED_PROGRESS * 100}% + 18px)`,
              top: 24,
              ...mono(12, "var(--copper-300)", 0.2),
              animation: "hp-fade 400ms 1200ms var(--ease) both",
            }}
          >
            <DayCounter /> · {C.stillRunning}
          </span>
        </div>

        {/* the five segments — pose 1's anatomy, staggered in, gone otherwise */}
        {C.segments.map((seg, i) => {
          const slice = segmentSlice(i);
          return (
            <div
              key={seg.id}
              data-testid={`hardest-part-segment-${seg.id}`}
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: `${slice.left * 100}%`,
                width: `${slice.width * 100}%`,
                borderLeft: "1px solid var(--copper-800)",
                background: "var(--copper-950)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: pose === 1 ? 1 : 0,
                transform: pose === 1 ? "translateY(0)" : "translateY(-8px)",
                transition:
                  `opacity 450ms var(--ease) ${pose === 1 ? 400 + i * 260 : 0}ms, ` +
                  `transform 450ms var(--ease) ${pose === 1 ? 400 + i * 260 : 0}ms`,
              }}
            >
              <span style={mono(12.5, "var(--copper-200)", 0.16)}>{seg.word}</span>
            </div>
          );
        })}
      </div>

      {/* the five notes under the anatomy — `--neutral-200`, the owner's
          brightness call: `--neutral-400` died at the back of the room */}
      {C.segments.map((seg, i) => {
        const slice = segmentSlice(i);
        return (
          <span
            key={seg.id}
            data-testid={`hardest-part-caption-${seg.id}`}
            style={{
              position: "absolute",
              left: SIDE_MARGIN + (slice.left + slice.width / 2) * CONTENT_WIDTH,
              top: CAPTION_TOP,
              transform: "translateX(-50%)",
              whiteSpace: "nowrap",
              fontFamily: "var(--sans)",
              fontSize: 13,
              color: "var(--neutral-200)",
              ...gate(pose === 1, 600 + i * 260),
            }}
          >
            {seg.note}
          </span>
        );
      })}

      {/* the footnote — pose 0 ONLY (owner call: it leaves when the anatomy
          arrives). Outer node gates, inner node owns the mount fade. */}
      <div
        data-testid="hardest-part-footnote"
        style={{
          position: "absolute",
          left: SIDE_MARGIN,
          top: FOOTNOTE_TOP,
          ...serif(15, "var(--neutral-300)"),
          ...gate(pose === 0),
        }}
      >
        <div style={{ animation: "hp-fade 500ms 3000ms var(--ease) both" }}>
          {highlight(C.footnote, C.footnoteKw)}
        </div>
      </div>

      {/* one verdict slot, two lines, crossfaded — poses 0 and 1 argue here;
          pose 2's sentence is the closer, on the summary shelf */}
      <div
        style={{
          position: "absolute",
          left: SIDE_MARGIN,
          right: SIDE_MARGIN,
          top: VERDICT_TOP,
          textAlign: "center",
        }}
      >
        <div data-testid="hardest-part-race-line" style={gate(pose === 0)}>
          <p
            style={{
              ...serif(22, "var(--neutral-100)"),
              animation: "hp-drop 500ms 4200ms var(--ease) both",
            }}
          >
            {highlight(C.raceLine, C.raceLineKw)}
          </p>
        </div>
        <p
          data-testid="hardest-part-anatomy-line"
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            ...serif(22, "var(--neutral-100)"),
            ...gate(pose === 1, 2100, true),
          }}
        >
          {highlight(C.anatomyLine, C.anatomyLineKw)}
        </p>
      </div>

      {/* ═══ POSE 2 · THE SUMMARY — the evidence under the scoreboard ═══ */}

      {/* THE QUOTATION, RENDERED WHOLE AND UNHIGHLIGHTED: somebody else's
          sentence, never split, recomposed or emphasised (the keyword rule's
          sharpest case, unchanged from the first cut). */}
      <p
        data-testid="hardest-part-statistic"
        style={{
          position: "absolute",
          left: 140,
          right: 140,
          top: SUMMARY_STATISTIC_TOP,
          textAlign: "center",
          ...serif(28, "var(--copper-200)"),
          ...gate(pose >= 2, 300, true),
        }}
      >
        {C.statistic}
      </p>
      <div
        data-testid="hardest-part-source"
        style={{
          position: "absolute",
          left: 140,
          right: 140,
          top: SUMMARY_SOURCE_TOP,
          textAlign: "center",
          fontFamily: "var(--mono)",
          fontSize: 10.5,
          letterSpacing: "0.02em",
          color: "var(--neutral-300)",
          ...gate(pose >= 2, 700),
        }}
      >
        {C.statisticSource}
      </div>

      {/* the statistic drawn — two masses in the statistic's own ratio, the
          derivation living in the geometry module, not here */}
      <div
        data-testid="hardest-part-bar-people"
        style={{
          position: "absolute",
          left: SUMMARY_BAR_LEFT,
          top: SUMMARY_BAR_TOP,
          width: SUMMARY_PEOPLE_WIDTH,
          height: SUMMARY_BAR_HEIGHT,
          background: "var(--copper-500)",
          transformOrigin: "left",
          transform: pose >= 2 ? "scaleX(1)" : "scaleX(0)",
          transition: `transform 650ms var(--ease) ${pose >= 2 ? 1000 : 0}ms`,
        }}
      />
      <div
        data-testid="hardest-part-bar-technology"
        style={{
          position: "absolute",
          left: SUMMARY_TECHNOLOGY_LEFT,
          top: SUMMARY_BAR_TOP,
          width: SUMMARY_TECHNOLOGY_WIDTH,
          height: SUMMARY_BAR_HEIGHT,
          background: "var(--copper-900)",
          transformOrigin: "left",
          transform: pose >= 2 ? "scaleX(1)" : "scaleX(0)",
          transition: `transform 500ms var(--ease) ${pose >= 2 ? 1250 : 0}ms`,
        }}
      />
      <div
        data-testid="hardest-part-people-label"
        style={{
          position: "absolute",
          left: SUMMARY_BAR_LEFT,
          top: SUMMARY_BAR_LABEL_TOP,
          ...mono(10, "var(--copper-400)", 0.18),
          ...gate(pose >= 2, 1500),
        }}
      >
        {C.peopleLabel}
      </div>
      <div
        data-testid="hardest-part-technology-label"
        style={{
          position: "absolute",
          left: SUMMARY_TECHNOLOGY_LEFT + SUMMARY_TECHNOLOGY_WIDTH,
          top: SUMMARY_BAR_LABEL_TOP,
          transform: "translateX(-100%)",
          whiteSpace: "nowrap",
          ...mono(10, "var(--copper-400)", 0.18),
          ...gate(pose >= 2, 1500),
        }}
      >
        {C.technologyLabel}
      </div>

      <p
        data-testid="hardest-part-closer"
        style={{
          position: "absolute",
          left: 140,
          right: 140,
          top: SUMMARY_CLOSER_TOP,
          textAlign: "center",
          ...serif(24, "var(--neutral-100)"),
          ...gate(pose >= 2, 1900, true),
        }}
      >
        {highlight(C.closer, C.closerKw)}
      </p>
    </>
  );
}
