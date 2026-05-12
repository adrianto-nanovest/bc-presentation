// DisciplineWall — composition wrapper for the H.2 practice grid + pitfall pills.
//
// Spec: docs/specs/2026-05-12-slides-application-H-discipline.md §H.2 (lines 119–197).
//
// Visual contract:
//   ┌───────┬───────┬───────┬───────┐
//   │ card1 │ card2 │ card3 │ card4 │   ← 4×2 grid of practice cards
//   ├───────┼───────┼───────┼───────┤
//   │ card5 │ card6 │ card7 │ card8 │
//   └───────┴───────┴───────┴───────┘
//   ─── copper rule ─── (step 2)
//   RESOLVES WHAT?      (step 2 mono header)
//   [pill A][pill B]…   (step 2, staggered in)
//
// Composition loop (must feel CALM/ORDERED — opposite of H.1's chaos):
//   Cards light copper-300 → copper-200 sequentially in row-major order
//   (0→1→2→3→4→5→6→7) at ~1.25s cadence; each glow holds ~400ms then settles.
//   After the 8th card settles, ~2s pause, then restart from index 0.
//   Loop runs continuously regardless of stepIndex. Implemented via a chained
//   setTimeout schedule keyed off mount.
//
// Cross-highlight:
//   Slide-level state (hoveredPracticeId / hoveredPillId) drives a two-way
//   spotlight. When a practice card is hovered, pills whose id ∈ card.resolves
//   gain a copper-200 border + glow (200ms). When a pill is hovered, every
//   practice card whose `resolves` contains that pill id glows copper-200.
//   `flashAll` is a one-shot unison flare (step 0→1 transition).
import { useEffect, useState } from "react";
import { AnimatedGlyph, type GlyphKind } from "@/components/AnimatedGlyph";
import { Reveal } from "../../foundation-core-section-e/components/Reveal";

// ─────────────────────────────────────────────────────────────────────────────
// Types
//
// Pill ids are alphabetic strings ("A".."H"). Practice nums are numeric (1..8).
// We normalise to strings throughout this component so cross-highlight Sets
// have a single key shape — practice IDs are stringified card.num values.
// ─────────────────────────────────────────────────────────────────────────────

export type PitfallId = string;
export type PracticeId = string;

export interface PracticeCardData {
  num: number;
  name: string;
  move: string;
  resolves: readonly PitfallId[];
  glyphKind: GlyphKind;
}

export interface PitfallPillData {
  id: PitfallId;
  label: string;
}

interface DisciplineWallProps {
  practices: readonly PracticeCardData[];
  pills: readonly PitfallPillData[];
  resolvesHeader: string;
  pillsVisible: boolean;
  showResolves: boolean;
  stepIndex: number;
  hoveredPracticeId: PracticeId | null;
  hoveredPillId: PitfallId | null;
  onPracticeHover: (id: PracticeId | null) => void;
  onPillHover: (id: PitfallId | null) => void;
}

// ─────────────────────────────────────────────────────────────────────────────
// Loop tunings — calm cadence; do not crank these without re-reading the spec.
// ─────────────────────────────────────────────────────────────────────────────

const CARD_COUNT = 8;
const CARD_DURATION_MS = 1250; // gap between activations (~1.25s)
const GLOW_HOLD_MS = 400; // how long each card stays "active" before settling
const TAIL_PAUSE_MS = 2000; // breath after the last card settles
// Total cycle: 8 × 1250 + 2000 = 12_000ms.
const CYCLE_MS = CARD_COUNT * CARD_DURATION_MS + TAIL_PAUSE_MS;

// One-time unison flare on step 0 → 1 transition.
const FLASH_IN_MS = 200;
const FLASH_HOLD_MS = 0;
const FLASH_OUT_MS = 800;
const FLASH_TOTAL_MS = FLASH_IN_MS + FLASH_HOLD_MS + FLASH_OUT_MS;

// ─────────────────────────────────────────────────────────────────────────────
// DisciplineWall
// ─────────────────────────────────────────────────────────────────────────────

export function DisciplineWall({
  practices,
  pills,
  resolvesHeader,
  pillsVisible,
  showResolves,
  stepIndex,
  hoveredPracticeId,
  hoveredPillId,
  onPracticeHover,
  onPillHover,
}: DisciplineWallProps) {
  // Composition loop — sequential glow over 8 cards.
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    const scheduleCycle = () => {
      if (cancelled) return;
      for (let i = 0; i < CARD_COUNT; i++) {
        // Activate card i.
        timeouts.push(
          setTimeout(() => {
            if (!cancelled) setActiveIndex(i);
          }, i * CARD_DURATION_MS),
        );
        // Settle card i after the glow hold; the next activation will overwrite
        // before this fires for indices < CARD_COUNT - 1, which is fine —
        // setActiveIndex(null) only "wins" if no successor has stamped a new i.
        timeouts.push(
          setTimeout(() => {
            if (!cancelled) {
              setActiveIndex((cur) => (cur === i ? null : cur));
            }
          }, i * CARD_DURATION_MS + GLOW_HOLD_MS),
        );
      }
      timeouts.push(
        setTimeout(() => {
          if (!cancelled) scheduleCycle();
        }, CYCLE_MS),
      );
    };

    // Defer first cycle ~800ms so card stagger-in finishes first.
    timeouts.push(setTimeout(scheduleCycle, 800));

    return () => {
      cancelled = true;
      timeouts.forEach(clearTimeout);
    };
  }, []);

  // One-shot unison flare when stepIndex transitions to 1.
  const [flashAll, setFlashAll] = useState(false);
  useEffect(() => {
    if (stepIndex !== 1) return;
    setFlashAll(true);
    const t = setTimeout(() => setFlashAll(false), FLASH_TOTAL_MS);
    return () => clearTimeout(t);
  }, [stepIndex]);

  // Cross-highlight derivations.
  const hoveredPractice =
    hoveredPracticeId !== null
      ? (practices.find((c) => c.num.toString() === hoveredPracticeId) ?? null)
      : null;
  const crossHighlightedPillIds = new Set<PitfallId>(
    hoveredPractice?.resolves ?? [],
  );
  const crossHighlightedPracticeIds = new Set<PracticeId>(
    hoveredPillId
      ? practices
          .filter((c) => c.resolves.includes(hoveredPillId))
          .map((c) => c.num.toString())
      : [],
  );

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Practice grid — 4×2 */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gridTemplateRows: "repeat(2, 1fr)",
          gap: 18,
          flex: "0 0 auto",
          height: 440,
        }}
      >
        {practices.map((card, i) => {
          const id = card.num.toString();
          return (
            <Reveal key={id} on={true} delay={120 + i * 80}>
              <PracticeCard
                practice={card}
                index={i}
                active={activeIndex === i}
                crossHighlighted={crossHighlightedPracticeIds.has(id)}
                flashAll={flashAll}
                showResolves={showResolves}
                onHoverChange={onPracticeHover}
              />
            </Reveal>
          );
        })}
      </div>

      {/* Pitfall section — copper rule + header + pills (step 2) */}
      <div
        style={{
          marginTop: 24,
          display: "flex",
          flexDirection: "column",
          gap: 14,
          flex: "1 1 auto",
          minHeight: 0,
        }}
      >
        {/* Copper rule — animates 0 → 100% width on step 2 */}
        <div
          style={{
            height: 1,
            background: "var(--copper-300)",
            width: pillsVisible ? "100%" : "0%",
            opacity: pillsVisible ? 1 : 0,
            transition:
              "width 600ms var(--ease), opacity 600ms var(--ease)",
            transitionDelay: pillsVisible ? "200ms" : "0ms",
          }}
        />

        {/* RESOLVES WHAT? mono header */}
        <Reveal
          on={pillsVisible}
          delay={300}
          style={{
            fontFamily: "var(--mono)",
            fontSize: 11,
            letterSpacing: "0.22em",
            color: "var(--copper-300)",
            textTransform: "uppercase",
          }}
        >
          {resolvesHeader}
        </Reveal>

        {/* Pill row */}
        <PitfallPillRow
          pills={pills}
          crossHighlightedIds={crossHighlightedPillIds}
          visible={pillsVisible}
          onHoverChange={onPillHover}
        />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PracticeCard
// ─────────────────────────────────────────────────────────────────────────────

interface PracticeCardProps {
  practice: PracticeCardData;
  index: number;
  active: boolean;
  crossHighlighted: boolean;
  flashAll: boolean;
  showResolves: boolean;
  onHoverChange: (id: PracticeId | null) => void;
}

function PracticeCard({
  practice,
  active,
  crossHighlighted,
  flashAll,
  showResolves,
  onHoverChange,
}: PracticeCardProps) {
  const [hover, setHover] = useState(false);
  const id = practice.num.toString();
  const lit = hover || active || crossHighlighted || flashAll;

  return (
    <div
      onMouseEnter={() => {
        setHover(true);
        onHoverChange(id);
      }}
      onMouseLeave={() => {
        setHover(false);
        onHoverChange(null);
      }}
      style={{
        boxSizing: "border-box",
        padding: 16,
        display: "flex",
        flexDirection: "column",
        gap: 8,
        // Default border copper-300 — practices are the active partner, hence
        // brighter than H.1's copper-700 default. Lit states all jump to
        // copper-200 + glow.
        border: `1px solid ${lit ? "var(--copper-200)" : "var(--copper-300)"}`,
        background: hover
          ? "rgba(184,110,61,0.06)"
          : "rgba(10, 10, 10, 0.5)",
        boxShadow: lit ? "0 0 12px rgba(184,110,61,0.18)" : "none",
        transition:
          "border-color 0.2s var(--ease), background 0.2s var(--ease), box-shadow 0.2s var(--ease)",
        position: "relative",
        cursor: "default",
      }}
    >
      {/* Number — mono 11px copper-300 */}
      <div
        style={{
          fontFamily: "var(--mono)",
          fontSize: 11,
          letterSpacing: "0.18em",
          color: "var(--copper-300)",
        }}
      >
        {practice.num}
      </div>

      {/* Glyph — 48×48 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          paddingTop: 2,
          paddingBottom: 2,
        }}
      >
        <AnimatedGlyph kind={practice.glyphKind} size={48} />
      </div>

      {/* Name — display 18px neutral-50, uppercase */}
      <div
        style={{
          fontFamily: "var(--display)",
          fontSize: 18,
          color: "var(--neutral-50)",
          lineHeight: 1.1,
          letterSpacing: "0.02em",
          textTransform: "uppercase",
        }}
      >
        {practice.name}
      </div>

      {/* Move — serif 14px neutral-100 */}
      <div
        style={{
          fontFamily: "var(--serif)",
          fontSize: 14,
          color: "var(--neutral-100)",
          lineHeight: 1.3,
          fontStyle: "italic",
        }}
      >
        {practice.move}
      </div>

      {/* Resolves caption — mono 10px copper-400, hidden until step 2 */}
      <div
        style={{
          fontFamily: "var(--mono)",
          fontSize: 10,
          letterSpacing: "0.14em",
          color: "var(--copper-400)",
          marginTop: "auto",
          opacity: showResolves ? 1 : 0,
          transform: showResolves ? "translateY(0)" : "translateY(4px)",
          transition:
            "opacity 300ms var(--ease), transform 300ms var(--ease)",
        }}
      >
        {`⊙ Resolves: ${practice.resolves.join(" · ")}`}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PitfallPillRow
// ─────────────────────────────────────────────────────────────────────────────

interface PitfallPillRowProps {
  pills: readonly PitfallPillData[];
  crossHighlightedIds: Set<PitfallId>;
  visible: boolean;
  onHoverChange: (id: PitfallId | null) => void;
}

function PitfallPillRow({
  pills,
  crossHighlightedIds,
  visible,
  onHoverChange,
}: PitfallPillRowProps) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 8,
      }}
    >
      {pills.map((pill, i) => (
        <Reveal key={pill.id} on={visible} delay={400 + i * 60}>
          <PitfallPill
            pill={pill}
            crossHighlighted={crossHighlightedIds.has(pill.id)}
            onHoverChange={onHoverChange}
          />
        </Reveal>
      ))}
    </div>
  );
}

interface PitfallPillProps {
  pill: PitfallPillData;
  crossHighlighted: boolean;
  onHoverChange: (id: PitfallId | null) => void;
}

function PitfallPill({
  pill,
  crossHighlighted,
  onHoverChange,
}: PitfallPillProps) {
  const [hover, setHover] = useState(false);
  const lit = hover || crossHighlighted;

  return (
    <div
      onMouseEnter={() => {
        setHover(true);
        onHoverChange(pill.id);
      }}
      onMouseLeave={() => {
        setHover(false);
        onHoverChange(null);
      }}
      style={{
        fontFamily: "var(--mono)",
        fontSize: 11,
        letterSpacing: "0.08em",
        color: lit ? "var(--copper-200)" : "var(--copper-400)",
        padding: "4px 10px",
        border: `1px solid ${lit ? "var(--copper-200)" : "var(--copper-700)"}`,
        background: "rgba(10, 10, 10, 0.55)",
        boxShadow: lit ? "0 0 8px rgba(184,110,61,0.16)" : "none",
        transition:
          "border-color 0.2s var(--ease), color 0.2s var(--ease), box-shadow 0.2s var(--ease)",
        cursor: "default",
        whiteSpace: "nowrap",
      }}
    >
      <span
        style={{
          color: "var(--copper-300)",
          marginRight: 6,
          opacity: 0.85,
        }}
      >
        {pill.id}
      </span>
      {pill.label}
    </div>
  );
}
