// F.4 — WRITE ONCE (Skills, with progressive disclosure)
//
// Mirrors the F.2 canonical Section F pattern exactly. Two-step structure
// with hover-only details and an aligned right-pane bordered box.
//
// Step axis (2 steps; canonical pose = 1):
//   0 — All 5 facet cards stagger-reveal on the left. Hover is always on.
//       Right pane shows the bordered box framing an empty content area.
//       Hovering any facet card crossfades the matching illustration into
//       the bordered box. Footer hidden.
//   1 — Footer (italic copper-200 caption) fades in below the facet cards.
//       Everything else stays revealed; hover continues to drive details.
//
// Border alignment (canonical):
//   The right-pane bordered box uses the same `top: 156 / bottom: 80` as the
//   left FacetMenu so the top and bottom borders align exactly with the
//   FacetMenu's top edge (header baseline) and bottom edge. An invisible
//   visibility section title inside the bordered box mirrors the left's
//   mono header + 12px gap + CopperRule, so when a facet hover illustration
//   crossfades in, its content top sits on the same baseline as the left's
//   first facet card.
//
// Hover behaviour:
//   activeFacet === null         → bordered box shows; content area empty
//   activeFacet === "<facet-id>" → matching illustration crossfades in (700ms)
//
// Animation loops (reuse Section-F shared keyframes from globals.css):
//   • SkillMdPreview         — Typewriter streams body; post-completion the
//                              block caret keeps blinking via the existing
//                              tw-caret-block / tw-blink pair.
//   • SkillProgressiveDisclosure — L1 / L2 / L3 bars share the
//                              f-card-cycle-border pattern (3s loop,
//                              top→bottom index) so the border highlight
//                              sweeps METADATA → INSTRUCTIONS → RESOURCES
//                              while each level's own copper bg tint is
//                              preserved across the cycle.
//   • HowClaudePicks         — the three match-skill rows take turns
//                              re-highlighting via f-seq-pulse-1/2/3.
//   • TokenBudget            — the three stacked bar segments breathe via
//                              the shared f-pointer-pulse keyframe.
//   • ExampleBreakdown       — the L1 / L2 / L3 cards glow in sequence via
//                              the f-card-cycle-border pattern (3s loop,
//                              top→bottom index). Border-only so each
//                              card's own copper tint stays intact.
import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { highlight } from "@/components/highlight";
import { FacetMenu } from "./components/FacetMenu";
import { DetailCanvas } from "./components/DetailCanvas";
import { Typewriter } from "./components/Typewriter";
import { LucideIcon } from "./components/LucideIcon";
import { useFacetListBounds } from "./components/useFacetListBounds";
import { f4Content as C } from "./content";

// ───────────────────── shared layout constants (F-section canonical) ─────────────────────
//
// Right pane width — top / bottom are measured at runtime via
// `useFacetListBounds` so the wrapper aligns with the FacetMenu's card stack
// exactly.

const RIGHT_W = 660;

// ───────────────────── slide ─────────────────────

export function F4SkillsWriteOnce() {
  const { stepIndex } = useDeck();

  // CANONICAL Section F step-gate pattern (mirrors F.2):
  //   showCards     = stepIndex >= 0   → all 5 cards stagger-reveal at step 0
  //   hoverEnabled  = stepIndex >= 0   → hover always-on once cards are in
  //   showFooter    = stepIndex >= 1   → footer reveals at canonical pose
  const showCards = stepIndex >= 0;
  const hoverEnabled = stepIndex >= 0;
  const showFooter = stepIndex >= 1;

  const [activeFacet, setActiveFacet] = useState<string | null>(null);
  const [pinnedFacet, setPinnedFacet] = useState<string | null>(null);
  // Pin wins over hover so a pinned facet remains the right-pane illustration
  // even when the user mouses away (or onto another card pre-click).
  const effectiveFacet = hoverEnabled ? (pinnedFacet ?? activeFacet) : null;

  const { top: paneTop, bottom: paneBottom } = useFacetListBounds();

  return (
    <>
      <FigLabel section="F" num={4} label="WRITE ONCE" />

      <div className="slide-headline-row">
        <h1 className="slide-headline small">
          {highlight(C.headline, [...C.headlineKw])}
        </h1>
      </div>

      {/* LEFT — facet menu. All 5 cards reveal at stepIndex 0; footer at 1. */}
      <FacetMenu
        items={C.facets.map((f) => ({
          id: f.id,
          title: f.title,
          essence: f.essence,
          essenceKw: f.essenceKw,
          icon: f.icon,
        }))}
        activeFacet={hoverEnabled ? activeFacet : null}
        onHover={hoverEnabled ? setActiveFacet : () => {}}
        pinnedFacet={pinnedFacet}
        onPin={setPinnedFacet}
        showCards={showCards}
        header={C.header}
        showHint
        footer={C.footer}
        footerKw={[...C.footerKw]}
        showFooter={showFooter}
      />

      {/* RIGHT — transparent popover anchor. Top / bottom match the left
          FacetMenu's card-stack extent exactly (measured at runtime).
          Content centers vertically within that range. */}
      <div
        data-testid="f4-right-pane"
        style={{
          position: "absolute",
          right: 48,
          top: paneTop,
          width: RIGHT_W,
          bottom: paneBottom,
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        {/* Content area — DetailCanvas renders nothing until a facet hover.
            `maxHeight: 100%` constrains popover content to the FacetMenu's
            card-stack vertical bounds. */}
        <div
          style={{
            position: "relative",
            width: "100%",
            maxHeight: "100%",
            height: "100%",
            pointerEvents: "auto",
          }}
        >
          <DetailCanvas
            activeFacet={effectiveFacet}
            states={{
              "what-it-is": (
                <WhatItIsState active={effectiveFacet === "what-it-is"} />
              ),
              "progressive-disclosure": <ProgressiveDisclosureState />,
              "how-claude-picks": (
                <HowClaudePicksState
                  active={effectiveFacet === "how-claude-picks"}
                />
              ),
              "lean-context": (
                <LeanContextState active={effectiveFacet === "lean-context"} />
              ),
              example: <ExampleState />,
            }}
          />
        </div>
      </div>
    </>
  );
}

// ───────────────────── shared atoms ─────────────────────
//
// FacetHeader was removed in the popover refactor (Item 1).

// ───────────────────── WHAT IT IS state: SKILL.md preview ─────────────────────
//
// Mock file-editor frame: monospace font, dark bg with copper border, filename
// strip at the top. The Typewriter streams the full SKILL.md preview body and
// then loops back to the beginning — an infinite "Claude is responding" loop.

interface WhatItIsStateProps {
  active: boolean;
}

function WhatItIsState({ active }: WhatItIsStateProps) {
  const text = C.skillMdPreview.body;
  // Slow enough to read the whole body once before it loops.
  const duration = Math.min(7200, Math.max(2400, text.length * 32));
  return (
    <div
      data-testid="f4-what-it-is"
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "8px 12px",
        gap: 14,
      }}
    >
      <div
        data-testid="f4-skill-md-preview"
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          border: "1px solid var(--copper-700)",
          background: "rgba(10,10,10,0.85)",
          minHeight: 0,
        }}
      >
        {/* Filename strip */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "8px 14px",
            borderBottom: "1px solid var(--copper-800)",
            background: "rgba(122,70,38,0.18)",
          }}
        >
          <span
            aria-hidden="true"
            style={{
              display: "inline-block",
              width: 9,
              height: 9,
              borderRadius: "50%",
              background: "var(--copper-500)",
            }}
          />
          <span
            style={{
              fontFamily: "var(--mono)",
              fontSize: 10.5,
              letterSpacing: "0.18em",
              color: "var(--copper-200)",
              textTransform: "uppercase",
            }}
          >
            {C.skillMdPreview.filename}
          </span>
        </div>
        {/* Streaming body — loops indefinitely. */}
        <div
          style={{
            flex: 1,
            padding: "12px 16px",
            overflow: "hidden",
            minHeight: 0,
          }}
        >
          <Typewriter
            key={active ? "active" : "idle"}
            play={active}
            text={text}
            duration={duration}
            caretStyle="block"
            caretWhen={active}
            loop
            loopPauseMs={1200}
            style={{
              fontFamily: "var(--mono)",
              fontSize: 11,
              color: "var(--neutral-100)",
              whiteSpace: "pre-wrap",
              margin: 0,
              lineHeight: 1.55,
            }}
          />
        </div>
      </div>
    </div>
  );
}

// ───────────────────── PROGRESSIVE DISCLOSURE state ─────────────────────
//
// Flagship 3-level ladder. Wraps the SkillProgressiveDisclosure component
// (level="all") with the canonical FacetHeader, and tags each level bar with
// the shared f-seq-pulse-1/2/3 keyframes so METADATA → INSTRUCTIONS →
// RESOURCES highlight in turn on the 2.5s loop. Achieved via three absolutely
// positioned overlays aligned to the level bars — keeps the component
// untouched while the loop reads as part of the illustration.

function ProgressiveDisclosureState() {
  return (
    <div
      data-testid="f4-progressive-disclosure"
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "8px 12px",
        gap: 14,
      }}
    >
      {/* Replicated level ladder so we can apply per-row sequential pulse
          glows without forking SkillProgressiveDisclosure. */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {C.disclosure.map((lv, i) => {
          return (
            <DisclosureLevelBar
              key={lv.id}
              level={lv}
              isLast={i === C.disclosure.length - 1}
              cycleIndex={i}
              cycleDuration={C.disclosure.length}
            />
          );
        })}
      </div>

      <div style={{ flex: 1 }} />

      {/* Footer caption — relocated "Model invoked" line. Matches the
          footer styling used by HOW CLAUDE PICKS / LEAN CONTEXT / EXAMPLE
          (italic copper-200 serif). Tagged with the original callout
          testid so existing tests keep passing. */}
      <p
        data-testid="f4-disclosure-callout"
        style={{
          fontFamily: "var(--serif)",
          fontStyle: "italic",
          fontSize: 12.5,
          color: "var(--copper-200)",
          margin: 0,
          lineHeight: 1.4,
        }}
      >
        {highlight(
          C.disclosureCallout.body,
          [...C.disclosureCallout.bodyKw],
        )}
      </p>
    </div>
  );
}

interface DisclosureLevel {
  id: string;
  level: 1 | 2 | 3;
  label: string;
  heading: string;
  badge: string;
  tokens: string;
  detail: string;
}

interface DisclosureLevelBarProps {
  level: DisclosureLevel;
  isLast: boolean;
  cycleIndex: number;
  cycleDuration: number;
}

function DisclosureLevelBar({
  level,
  isLast,
  cycleIndex,
  cycleDuration,
}: DisclosureLevelBarProps) {
  // Same copper monochromatic stops as the standalone component (copper-700 /
  // copper-500 / copper-200), just compacted to fit alongside FacetHeader. The
  // per-tint background is preserved across the cycle (border-only variant);
  // only the outer border is driven by the shared f-card-cycle-border animation.
  const tints: Record<1 | 2 | 3, { bg: string; icon: string }> = {
    1: {
      bg: "rgba(74,37,17,0.45)",
      icon: "FileText",
    },
    2: {
      bg: "rgba(184,110,61,0.28)",
      icon: "BookOpen",
    },
    3: {
      bg: "rgba(232,196,160,0.16)",
      icon: "Folder",
    },
  };
  const tint = tints[level.level];
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        data-testid={`f4-disclosure-level-${level.level}`}
        className="f-card-cycle-border"
        style={{
          background: tint.bg,
          padding: "8px 12px",
          display: "flex",
          flexDirection: "column",
          gap: 4,
          ["--cycle-duration" as string]: `${cycleDuration}s`,
          ["--cycle-delay" as string]: `${cycleIndex}s`,
        } as CSSProperties}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <LucideIcon name={tint.icon} size={16} color="var(--copper-100)" />
          <span
            style={{
              fontFamily: "var(--mono)",
              fontSize: 11,
              letterSpacing: "0.20em",
              color: "var(--copper-100)",
              textTransform: "uppercase",
            }}
          >
            {level.label}
          </span>
          <span
            style={{
              fontFamily: "var(--mono)",
              fontSize: 9,
              letterSpacing: "0.16em",
              color: "var(--copper-300)",
              textTransform: "uppercase",
              border: "1px solid var(--copper-700)",
              padding: "1px 5px",
              borderRadius: 2,
            }}
          >
            L{level.level}
          </span>
          <span
            style={{
              marginLeft: "auto",
              fontFamily: "var(--mono)",
              fontSize: 10,
              letterSpacing: "0.16em",
              color: "var(--copper-200)",
              textTransform: "uppercase",
              background: "rgba(184,110,61,0.18)",
              border: "1px solid var(--copper-700)",
              padding: "1px 6px",
            }}
          >
            {level.badge}
          </span>
        </div>
        <div
          style={{
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontSize: 12,
            color: "var(--neutral-200)",
            lineHeight: 1.4,
          }}
        >
          {level.detail}{" "}
          <span style={{ color: "var(--neutral-400)", fontStyle: "normal" }}>
            ({level.tokens})
          </span>
        </div>
      </div>
      {!isLast ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: 18,
          }}
          aria-hidden="true"
        >
          <span
            style={{
              fontFamily: "var(--mono)",
              fontSize: 14,
              color: "var(--copper-300)",
            }}
          >
            ↓
          </span>
        </div>
      ) : null}
    </div>
  );
}

// ───────────────────── HOW CLAUDE PICKS state ─────────────────────
//
// Horizontal bar chart of Claude's match scores. Each row:
//   [ TITLE + description (fixed-width left column) ]
//   [ BAR (track; inner fill scales 0 → score via f-bar-grow) ]
//   [ NUMBER (right; counts up from 0 → score in sync with the bar) ]
// All three bars start at the same x-position because the left column is a
// fixed width — so the bars are left-aligned with each other.

interface MatchSkill {
  name: string;
  score: number;
  detail: string;
}

const MATCH_SKILLS: readonly MatchSkill[] = [
  {
    name: "weekly-report-author",
    score: 0.92,
    detail: "drafts weekly status reports from project notes",
  },
  {
    name: "doc-author",
    score: 0.41,
    detail: "generic document drafting",
  },
  {
    name: "email-drafter",
    score: 0.18,
    detail: "composes outgoing messages",
  },
];

// Bar/count animation duration in ms — kept in one place so the CSS bar and
// the JS counter stay perfectly in sync.
const PICK_BAR_DURATION_MS = 1100;

interface HowClaudePicksStateProps {
  active: boolean;
}

function HowClaudePicksState({ active }: HowClaudePicksStateProps) {
  return (
    <div
      data-testid="f4-how-claude-picks"
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "8px 12px",
        gap: 14,
      }}
    >
      {/* User query */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <span
          style={{
            fontFamily: "var(--mono)",
            fontSize: 10,
            letterSpacing: "0.20em",
            color: "var(--copper-300)",
            textTransform: "uppercase",
          }}
        >
          USER QUERY
        </span>
        <div
          style={{
            border: "1px solid var(--copper-700)",
            background: "rgba(10,10,10,0.75)",
            padding: "10px 14px",
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontSize: 14,
            color: "var(--neutral-100)",
            lineHeight: 1.4,
          }}
        >
          &ldquo;draft this week&rsquo;s status report&rdquo;
        </div>
      </div>

      {/* Match-engine label */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span
          style={{
            fontFamily: "var(--mono)",
            fontSize: 10,
            letterSpacing: "0.20em",
            color: "var(--copper-300)",
            textTransform: "uppercase",
          }}
        >
          CLAUDE&rsquo;S MATCH ENGINE
        </span>
        <div style={{ flex: 1, height: 1, background: "var(--copper-800)" }} />
      </div>

      {/* Horizontal bar-chart rows. */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {MATCH_SKILLS.map((s, i) => {
          const isTop = i === 0;
          return (
            <MatchSkillBarRow
              key={s.name}
              skill={s}
              isTop={isTop}
              active={active}
            />
          );
        })}
      </div>

      <div style={{ flex: 1 }} />

      <p
        style={{
          fontFamily: "var(--serif)",
          fontStyle: "italic",
          fontSize: 12.5,
          color: "var(--copper-200)",
          margin: 0,
          lineHeight: 1.4,
        }}
      >
        {highlight(
          "Claude scores skill name + description against the user intent and loads the top match.",
          ["scores", "top match"],
        )}
      </p>
    </div>
  );
}

interface MatchSkillBarRowProps {
  skill: MatchSkill;
  isTop: boolean;
  active: boolean;
}

function MatchSkillBarRow({ skill, isTop, active }: MatchSkillBarRowProps) {
  const fill = isTop ? "var(--copper-200)" : "var(--copper-700)";
  const numColor = isTop ? "var(--copper-200)" : "var(--neutral-300)";
  return (
    <div
      data-testid={`match-skill-${skill.name}`}
      data-top={isTop ? "true" : "false"}
      style={{
        display: "grid",
        gridTemplateColumns: "220px 1fr 56px",
        alignItems: "center",
        gap: 14,
      }}
    >
      {/* Left — title + description (fixed width). */}
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <span
          style={{
            fontFamily: "var(--mono)",
            fontSize: 12,
            letterSpacing: "0.06em",
            color: isTop ? "var(--copper-100)" : "var(--neutral-200)",
          }}
        >
          {skill.name}
        </span>
        <span
          style={{
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontSize: 11,
            color: "var(--neutral-400)",
            lineHeight: 1.4,
          }}
        >
          {skill.detail}
        </span>
      </div>

      {/* Center — bar track. Inner fill scales from 0 → score (0–1). */}
      <div
        style={{
          position: "relative",
          height: 14,
          background: "rgba(10,10,10,0.6)",
          border: "1px solid var(--copper-800)",
          overflow: "hidden",
        }}
      >
        <div
          className={active ? "f-bar-grow" : undefined}
          style={{
            position: "absolute",
            inset: 0,
            width: `${skill.score * 100}%`,
            background: fill,
            transformOrigin: "left center",
            ...(active
              ? ({
                  ["--bar-duration" as string]: `${PICK_BAR_DURATION_MS}ms`,
                } as CSSProperties)
              : { transform: "scaleX(0)" }),
          }}
        />
      </div>

      {/* Right — count-up numeric value. */}
      <CountUp
        value={skill.score}
        play={active}
        duration={PICK_BAR_DURATION_MS}
        decimals={2}
        style={{
          fontFamily: "var(--display)",
          fontSize: 22,
          color: numColor,
          lineHeight: 1,
          textAlign: "right",
        }}
      />
    </div>
  );
}

// ───────────────────── CountUp helper ─────────────────────
//
// Counts from 0 → `value` over `duration` ms using requestAnimationFrame. Used
// by F.4's HOW CLAUDE PICKS bar chart so the numeric label stays in sync with
// the bar fill keyframe.

interface CountUpProps {
  value: number;
  play: boolean;
  duration: number;
  decimals?: number;
  startDelayMs?: number;
  suffix?: string;
  style?: CSSProperties;
}

function CountUp({
  value,
  play,
  duration,
  decimals = 0,
  startDelayMs = 0,
  suffix = "",
  style,
}: CountUpProps) {
  const [n, setN] = useState(play ? 0 : value);
  const rafRef = useRef<number | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!play) {
      setN(0);
      return;
    }
    const launch = () => {
      const start = performance.now();
      const tick = (t: number) => {
        const elapsed = t - start;
        const frac = Math.min(1, elapsed / duration);
        setN(frac * value);
        if (frac < 1) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          setN(value);
        }
      };
      rafRef.current = requestAnimationFrame(tick);
    };
    if (startDelayMs > 0) {
      setN(0);
      timeoutRef.current = setTimeout(launch, startDelayMs);
    } else {
      launch();
    }
    return () => {
      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      if (timeoutRef.current != null) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [play, value, duration, startDelayMs]);

  return (
    <span style={style}>
      {n.toFixed(decimals)}
      {suffix}
    </span>
  );
}

// ───────────────────── LEAN CONTEXT state: token-budget viz ─────────────────────
//
// ONE horizontal context bar at the top of the popover representing 100% of
// the 200K-token window, split into three copper segments
// (metadata 0.5% / active 4.5% / on-disk knowledge 95.5%). Below the bar,
// three description rows explain each segment.
//
// Stagger: each segment grows from 0 → target width via `f-bar-grow`, and
// its description row fades in via `f-fade-up`. Each step waits for the
// previous to finish via cumulative `animation-delay = N * duration`.

interface TokenSegment {
  id: string;
  label: string;
  pct: number;
  visualPct: number;
  color: string;
  desc: string;
}

const TOKEN_SEGMENTS: readonly TokenSegment[] = [
  {
    id: "metadata",
    label: "Skill metadata",
    pct: 0.5,
    visualPct: 0.5,
    color: "var(--copper-700)",
    desc: "all skill names + descriptions loaded at session start",
  },
  {
    id: "active",
    label: "Active skill content",
    pct: 4.5,
    visualPct: 4.5,
    color: "var(--copper-500)",
    desc: "the one skill Claude triggered for this turn",
  },
  {
    id: "rest",
    label: "On-disk knowledge",
    pct: 95,
    visualPct: 95,
    color: "var(--copper-200)",
    desc: "reference files, scripts, examples — fetched only when needed",
  },
];

// Per-segment animation duration. Stagger delay for segment N = N * DUR.
const LEAN_BAR_DURATION_MS = 700;
// Bar geometry — single track holding the three segments side-by-side.
const LEAN_BAR_HEIGHT = 22;

interface LeanContextStateProps {
  active: boolean;
}

function LeanContextState({ active }: LeanContextStateProps) {
  return (
    <div
      data-testid="f4-lean-context"
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "8px 12px",
        gap: 18,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <span
          style={{
            fontFamily: "var(--mono)",
            fontSize: 10,
            letterSpacing: "0.20em",
            color: "var(--copper-300)",
            textTransform: "uppercase",
          }}
        >
          CONTEXT BUDGET &middot; 200K TOKENS
        </span>

        {/* Single segmented bar — three segments lay out left-to-right via
            flex with widths in `flex-basis` percentages. Each segment grows
            from 0 → its width via a horizontal scaleX with cumulative delay. */}
        <div
          style={{
            position: "relative",
            display: "flex",
            width: "100%",
            height: LEAN_BAR_HEIGHT,
            background: "rgba(10,10,10,0.6)",
            border: "1px solid var(--copper-800)",
            overflow: "hidden",
          }}
        >
          {TOKEN_SEGMENTS.map((seg, i) => (
            <div
              key={seg.id}
              data-testid={`token-seg-${seg.id}`}
              style={{
                position: "relative",
                flex: `0 0 ${seg.visualPct}%`,
                height: "100%",
                overflow: "hidden",
              }}
            >
              <div
                className={active ? "f-bar-grow" : undefined}
                style={{
                  position: "absolute",
                  inset: 0,
                  background: seg.color,
                  transformOrigin: "left center",
                  ...(active
                    ? ({
                        ["--bar-duration" as string]: `${LEAN_BAR_DURATION_MS}ms`,
                        ["--bar-delay" as string]: `${i * LEAN_BAR_DURATION_MS}ms`,
                      } as CSSProperties)
                    : { transform: "scaleX(0)" }),
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Description rows — one per segment, fade in on the same cumulative
          stagger as the corresponding bar segment. */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {TOKEN_SEGMENTS.map((seg, i) => (
          <LeanContextDescriptionRow
            key={seg.id}
            seg={seg}
            index={i}
            active={active}
          />
        ))}
      </div>

      <div style={{ flex: 1 }} />

      <p
        style={{
          fontFamily: "var(--serif)",
          fontStyle: "italic",
          fontSize: 12.5,
          color: "var(--copper-200)",
          margin: 0,
          lineHeight: 1.4,
        }}
      >
        {highlight(
          "Lean context, rich knowledge — the payoff of progressive disclosure.",
          ["Lean context", "rich knowledge"],
        )}
      </p>
    </div>
  );
}

interface LeanContextDescriptionRowProps {
  seg: TokenSegment;
  index: number;
  active: boolean;
}

function LeanContextDescriptionRow({
  seg,
  index,
  active,
}: LeanContextDescriptionRowProps) {
  const delay = index * LEAN_BAR_DURATION_MS;
  return (
    <div
      className={active ? "f-fade-up" : undefined}
      style={{
        display: "grid",
        gridTemplateColumns: "12px 1fr 64px",
        alignItems: "center",
        gap: 12,
        ...(active
          ? ({
              ["--fade-duration" as string]: `${LEAN_BAR_DURATION_MS}ms`,
              ["--fade-delay" as string]: `${delay}ms`,
            } as CSSProperties)
          : { opacity: 0 }),
      }}
    >
      {/* Color-key swatch — same copper stop as the bar segment. */}
      <span
        aria-hidden="true"
        style={{
          display: "inline-block",
          width: 12,
          height: 12,
          background: seg.color,
          border: "1px solid var(--copper-800)",
        }}
      />

      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <span
          style={{
            fontFamily: "var(--mono)",
            fontSize: 11,
            letterSpacing: "0.12em",
            color: "var(--copper-100)",
            textTransform: "uppercase",
          }}
        >
          {seg.label}
        </span>
        <span
          style={{
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontSize: 11.5,
            color: "var(--neutral-300)",
            lineHeight: 1.4,
          }}
        >
          {seg.desc}
        </span>
      </div>

      <CountUp
        value={seg.pct}
        play={active}
        duration={LEAN_BAR_DURATION_MS}
        startDelayMs={delay}
        decimals={seg.pct < 1 ? 1 : 0}
        suffix="%"
        style={{
          fontFamily: "var(--display)",
          fontSize: 19,
          color: "var(--copper-200)",
          lineHeight: 1,
          textAlign: "right",
        }}
      />
    </div>
  );
}

// ───────────────────── EXAMPLE state: L1/L2/L3 breakdown ─────────────────────
//
// Three stacked cards showing the same skill at each disclosure level. The
// cards glow in sequence on the shared f-card-cycle pattern (3s loop,
// top→bottom index).

interface ExampleCardSpec {
  level: 1 | 2 | 3;
  label: string;
  bodyKey: "l1" | "l2" | "l3";
  bg: string;
  text: string;
}

const EXAMPLE_CARDS: readonly ExampleCardSpec[] = [
  {
    level: 1,
    label: "L1 · METADATA",
    bodyKey: "l1",
    bg: "rgba(74,37,17,0.45)",
    text: "var(--copper-100)",
  },
  {
    level: 2,
    label: "L2 · INSTRUCTIONS",
    bodyKey: "l2",
    bg: "rgba(184,110,61,0.28)",
    text: "var(--copper-100)",
  },
  {
    level: 3,
    label: "L3 · RESOURCES",
    bodyKey: "l3",
    bg: "rgba(232,196,160,0.16)",
    text: "var(--neutral-50)",
  },
];

function ExampleState() {
  return (
    <div
      data-testid="f4-example"
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "8px 12px",
        gap: 14,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        {EXAMPLE_CARDS.map((c, i) => (
          <div
            key={c.level}
            data-testid={`example-card-l${c.level}`}
            className="f-card-cycle-border"
            style={{
              background: c.bg,
              padding: "10px 14px",
              display: "flex",
              flexDirection: "column",
              gap: 4,
              ["--cycle-duration" as string]: `${EXAMPLE_CARDS.length}s`,
              ["--cycle-delay" as string]: `${i}s`,
            } as CSSProperties}
          >
            <span
              style={{
                fontFamily: "var(--mono)",
                fontSize: 10.5,
                letterSpacing: "0.22em",
                color: c.text,
                textTransform: "uppercase",
              }}
            >
              {c.label}
            </span>
            <span
              style={{
                fontFamily: "var(--mono)",
                fontSize: 11.5,
                color: "var(--neutral-100)",
                lineHeight: 1.5,
              }}
            >
              {C.exampleBreakdown[c.bodyKey]}
            </span>
          </div>
        ))}
      </div>

      <div style={{ flex: 1 }} />

      {/* Footer caption — matches HOW CLAUDE PICKS / LEAN CONTEXT footer
          styling (italic copper-200 serif, ~12.5px). Crystallizes the
          insight without restating the title. */}
      <p
        style={{
          fontFamily: "var(--serif)",
          fontStyle: "italic",
          fontSize: 12.5,
          color: "var(--copper-200)",
          margin: 0,
          lineHeight: 1.4,
        }}
      >
        {highlight(
          "Metadata stays loaded; body and resources fetched only on demand.",
          ["fetched only on demand"],
        )}
      </p>
    </div>
  );
}

// ───────────────────── slide def ─────────────────────

export const f4Slide: SlideDef = {
  steps: 2,
  canonicalPose: 1,
  animationMode: "step-reveal",
  surface: "dark",
  section: "F",
  render: () => <F4SkillsWriteOnce />,
};
