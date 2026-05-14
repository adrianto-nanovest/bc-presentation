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
//   ─── copper rule ─── (step 1)
//   RESOLVES WHAT?      (step 1 mono header)
//   [pill A][pill B]…   (step 1, staggered in)
//
// Behaviour:
//   • No auto-animation — the presenter drives attention by hovering.
//   • Cross-highlight: hovering a practice card lights pills whose id is in
//     `card.resolves` (and vice versa). Wiring lives at the slide level so
//     state crosses the grid/pill-row boundary.
import { useState } from "react";
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
  hoveredPracticeId: PracticeId | null;
  hoveredPillId: PitfallId | null;
  onPracticeHover: (id: PracticeId | null) => void;
  onPillHover: (id: PitfallId | null) => void;
}

// ─────────────────────────────────────────────────────────────────────────────
// DisciplineWall
// ─────────────────────────────────────────────────────────────────────────────

export function DisciplineWall({
  practices,
  pills,
  resolvesHeader,
  pillsVisible,
  showResolves,
  hoveredPracticeId,
  hoveredPillId,
  onPracticeHover,
  onPillHover,
}: DisciplineWallProps) {
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
      {/* Practice grid — 4×2. Rows size to content (no fixed height) so the
          vertical card-to-card gap matches the horizontal column gap exactly;
          a fixed height would force rows to 1fr and leave slack inside cards
          that reads as an inflated vertical gap. */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gridAutoRows: "auto",
          gap: 18,
          flex: "0 0 auto",
        }}
      >
        {practices.map((card, i) => {
          const id = card.num.toString();
          return (
            <Reveal key={id} on={true} delay={120 + i * 80}>
              <PracticeCard
                practice={card}
                crossHighlighted={crossHighlightedPracticeIds.has(id)}
                showResolves={showResolves}
                onHoverChange={onPracticeHover}
              />
            </Reveal>
          );
        })}
      </div>

      {/* Pitfall section — header / copper rule / pills (step 1).
          Header sits ABOVE the rule, so the pill row hugs the rule and stays
          well clear of the bottom-right nav indicators. The 24px that used to
          live as the section's marginTop is now spent on the header + its
          breathing room, so the rule's vertical position is preserved. */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: "1 1 auto",
          minHeight: 0,
        }}
      >
        {/* RESOLVES WHAT? mono header — ABOVE the rule.
            marginTop is the breathing room from the practice-grid row 2;
            marginBottom is the tight header-to-rule gap (label hugs its
            rule, content below the rule gets its own larger margin). */}
        <Reveal
          on={pillsVisible}
          delay={300}
          style={{
            fontFamily: "var(--mono)",
            fontSize: 11,
            lineHeight: 1.4,
            letterSpacing: "0.22em",
            color: "var(--copper-300)",
            textTransform: "uppercase",
            marginTop: 28,
            marginBottom: 6,
          }}
        >
          {resolvesHeader}
        </Reveal>

        {/* Copper rule — animates 0 → 100% width on step 1 */}
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

        {/* Pill row — directly under the rule */}
        <div style={{ marginTop: 14 }}>
          <PitfallPillRow
            pills={pills}
            crossHighlightedIds={crossHighlightedPillIds}
            visible={pillsVisible}
            onHoverChange={onPillHover}
          />
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PracticeCard
// ─────────────────────────────────────────────────────────────────────────────

interface PracticeCardProps {
  practice: PracticeCardData;
  crossHighlighted: boolean;
  showResolves: boolean;
  onHoverChange: (id: PracticeId | null) => void;
}

function PracticeCard({
  practice,
  crossHighlighted,
  showResolves,
  onHoverChange,
}: PracticeCardProps) {
  const [hover, setHover] = useState(false);
  const id = practice.num.toString();
  const lit = hover || crossHighlighted;

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

      {/* Name — display 18px neutral-50, uppercase, single line */}
      <div
        style={{
          fontFamily: "var(--display)",
          fontSize: 18,
          color: "var(--neutral-50)",
          lineHeight: 1.1,
          letterSpacing: "0.02em",
          textTransform: "uppercase",
          whiteSpace: "nowrap",
        }}
      >
        {practice.name}
      </div>

      {/* Move — serif italic 13px neutral-300 (matches H.1 cost line) */}
      <div
        style={{
          fontFamily: "var(--serif)",
          fontSize: 13,
          color: "var(--neutral-300)",
          lineHeight: 1.3,
          fontStyle: "italic",
        }}
      >
        {practice.move}
      </div>

      {/* Resolves caption — mono 10px copper-400, hidden until step 1 */}
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
