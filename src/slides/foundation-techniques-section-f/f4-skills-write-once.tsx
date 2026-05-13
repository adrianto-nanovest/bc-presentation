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
//   • SkillProgressiveDisclosure — L1 / L2 / L3 bars share f-seq-pulse-1/2/3
//                              so the highlight sweeps METADATA → INSTRUCTIONS
//                              → RESOURCES on a ~2.5s loop.
//   • HowClaudePicks         — the three match-skill rows take turns
//                              re-highlighting via f-seq-pulse-1/2/3.
//   • TokenBudget            — the three stacked bar segments breathe via
//                              the shared f-pointer-pulse keyframe.
//   • ExampleBreakdown       — the L1 / L2 / L3 cards glow in sequence via
//                              f-seq-pulse-1/2/3.
import { useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { highlight } from "@/components/highlight";
import { FacetMenu } from "./components/FacetMenu";
import { DetailCanvas } from "./components/DetailCanvas";
import { Typewriter } from "./components/Typewriter";
import { LucideIcon } from "./components/LucideIcon";
import { f4Content as C } from "./content";

// ───────────────────── shared layout constants (F-section canonical) ─────────────────────
//
// Mirror the FacetMenu's vertical rhythm so the right pane's content area
// top-aligns with the left's first facet card top-border. See F.2 header
// comment for the full pixel rationale.

const PANE_TOP = 156;
const PANE_BOTTOM = 80;
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
  const [modalOpen, setModalOpen] = useState(false);
  const effectiveFacet = hoverEnabled ? activeFacet : null;

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
        activeFacet={effectiveFacet}
        onHover={hoverEnabled ? setActiveFacet : () => {}}
        showCards={showCards}
        header={C.header}
        footer={C.footer}
        footerKw={[...C.footerKw]}
        showFooter={showFooter}
      />

      {/* RIGHT — bordered box. Top/bottom borders align with FacetMenu's
          top edge (PANE_TOP) and bottom edge (PANE_BOTTOM) exactly. */}
      <div
        data-testid="f4-right-pane"
        style={{
          position: "absolute",
          right: 48,
          top: PANE_TOP,
          width: RIGHT_W,
          bottom: PANE_BOTTOM,
          border: "1px solid var(--copper-700)",
          background: "rgba(10,10,10,0.5)",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Invisible-visibility header strip — mirrors the left FacetMenu's
            mono header + 12px gap + 1px copper rule + 16px gap so the right
            pane's content area top aligns with the left's first facet card
            top border exactly. Padding 16px matches the bordered box's gutter. */}
        <div
          aria-hidden
          style={{
            visibility: "hidden",
            padding: "0 16px",
            paddingTop: 16,
          }}
        >
          <span
            style={{
              fontFamily: "var(--mono)",
              fontSize: 11,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              display: "block",
            }}
          >
            {C.header}
          </span>
          <div style={{ marginTop: 12, height: 1 }} />
        </div>

        {/* Content area — DetailCanvas renders nothing until a facet hover. */}
        <div
          style={{
            position: "relative",
            flex: 1,
            margin: 16,
            marginTop: 16,
          }}
        >
          <DetailCanvas
            activeFacet={effectiveFacet}
            states={{
              "what-it-is": (
                <WhatItIsState
                  onExpand={() => setModalOpen(true)}
                  active={effectiveFacet === "what-it-is"}
                />
              ),
              "progressive-disclosure": <ProgressiveDisclosureState />,
              "how-claude-picks": <HowClaudePicksState />,
              "lean-context": <LeanContextState />,
              example: <ExampleState />,
            }}
          />
        </div>
      </div>

      {/* SKILL.md full-content modal — opened from WHAT IT IS state */}
      {modalOpen ? (
        <SkillModal open onClose={() => setModalOpen(false)} />
      ) : null}
    </>
  );
}

// ───────────────────── shared sub-section header ─────────────────────
//
// Used by every facet hover state to label the illustration. Mono uppercase
// label + italic serif caption underneath. Sits at the top of each state.

interface FacetHeaderProps {
  label: string;
  caption: string;
}

function FacetHeader({ label, caption }: FacetHeaderProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <span
        style={{
          fontFamily: "var(--mono)",
          fontSize: 11,
          letterSpacing: "0.22em",
          color: "var(--copper-300)",
          textTransform: "uppercase",
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: "var(--serif)",
          fontStyle: "italic",
          fontSize: 13,
          color: "var(--copper-200)",
          lineHeight: 1.4,
        }}
      >
        {caption}
      </span>
    </div>
  );
}

// ───────────────────── WHAT IT IS state: SKILL.md preview ─────────────────────
//
// Mock file-editor frame: monospace font, dark bg with copper border, filename
// strip at the top, Typewriter streams the SKILL.md preview body. The block
// caret keeps blinking after streaming completes (caretWhen={active}) — that
// gives the "live cursor on a finished file" steady-state. Expand → opens a
// modal with the full SKILL.md.

interface WhatItIsStateProps {
  onExpand: () => void;
  active: boolean;
}

function WhatItIsState({ onExpand, active }: WhatItIsStateProps) {
  const text = C.skillMdPreview.body;
  const duration = Math.min(2800, Math.max(900, text.length * 14));
  return (
    <div
      data-testid="f4-what-it-is"
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        padding: "8px 12px",
        gap: 14,
      }}
    >
      <FacetHeader
        label="WHAT IT IS"
        caption="a job description Claude follows perfectly"
      />

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
        {/* Streaming body — block caret keeps blinking after typing ends. */}
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
        {/* Expand → hint */}
        <div
          style={{
            padding: "8px 14px",
            borderTop: "1px solid var(--copper-800)",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <button
            type="button"
            data-testid="f4-skill-md-expand"
            onClick={onExpand}
            style={{
              fontFamily: "var(--mono)",
              fontSize: 10.5,
              letterSpacing: "0.22em",
              color: "var(--copper-200)",
              textTransform: "uppercase",
              background: "transparent",
              border: "1px solid var(--copper-700)",
              padding: "5px 10px",
              cursor: "pointer",
              transition:
                "border-color 0.2s var(--ease), background 0.2s var(--ease), color 0.2s var(--ease)",
            }}
            onMouseEnter={(e) => {
              const t = e.currentTarget;
              t.style.borderColor = "var(--copper-200)";
              t.style.background = "rgba(184,110,61,0.12)";
              t.style.color = "var(--copper-100)";
            }}
            onMouseLeave={(e) => {
              const t = e.currentTarget;
              t.style.borderColor = "var(--copper-700)";
              t.style.background = "transparent";
              t.style.color = "var(--copper-200)";
            }}
          >
            Expand &rarr;
          </button>
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
        padding: "8px 12px",
        gap: 14,
      }}
    >
      <FacetHeader
        label="PROGRESSIVE DISCLOSURE"
        caption="metadata first · instructions when triggered · resources as needed"
      />

      <div
        style={{
          position: "relative",
          flex: 1,
          minHeight: 0,
        }}
      >
        {/* Replicated level ladder + callout so we can apply per-row
            sequential pulse glows without forking SkillProgressiveDisclosure. */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {C.disclosure.map((lv, i) => {
            const pulseClass = (
              ["f-seq-pulse-1", "f-seq-pulse-2", "f-seq-pulse-3"] as const
            )[i];
            return (
              <DisclosureLevelBar
                key={lv.id}
                level={lv}
                isLast={i === C.disclosure.length - 1}
                pulseClass={pulseClass}
              />
            );
          })}

          {/* LEAN CONTEXT callout */}
          <div
            data-testid="f4-disclosure-callout"
            style={{
              marginTop: 14,
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            <div
              style={{
                height: 1,
                background: "var(--copper-700)",
                width: "100%",
              }}
            />
            <span
              style={{
                fontFamily: "var(--mono)",
                fontSize: 11,
                letterSpacing: "0.22em",
                color: "var(--copper-200)",
                textTransform: "uppercase",
              }}
            >
              {C.disclosureCallout.title}
            </span>
            <span
              style={{
                fontFamily: "var(--serif)",
                fontStyle: "italic",
                fontSize: 12,
                color: "var(--neutral-300)",
                lineHeight: 1.4,
              }}
            >
              {highlight(
                C.disclosureCallout.body,
                [...C.disclosureCallout.bodyKw],
              )}
            </span>
          </div>
        </div>
      </div>
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
  pulseClass: "f-seq-pulse-1" | "f-seq-pulse-2" | "f-seq-pulse-3";
}

function DisclosureLevelBar({
  level,
  isLast,
  pulseClass,
}: DisclosureLevelBarProps) {
  // Same copper monochromatic stops as the standalone component (copper-700 /
  // copper-500 / copper-200), just compacted to fit alongside FacetHeader.
  const tints: Record<
    1 | 2 | 3,
    { bg: string; border: string; icon: string }
  > = {
    1: {
      bg: "rgba(122,70,38,0.30)",
      border: "var(--copper-800)",
      icon: "FileText",
    },
    2: {
      bg: "rgba(184,110,61,0.26)",
      border: "var(--copper-700)",
      icon: "BookOpen",
    },
    3: {
      bg: "rgba(232,196,160,0.20)",
      border: "var(--copper-600)",
      icon: "Folder",
    },
  };
  const tint = tints[level.level];
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        data-testid={`f4-disclosure-level-${level.level}`}
        className={pulseClass}
        style={{
          border: `1px solid ${tint.border}`,
          background: tint.bg,
          padding: "8px 12px",
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
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
// User query bar at top + Claude's match-engine dropdown showing 3 skills
// with match-scores. The three rows take turns re-highlighting via the shared
// f-seq-pulse-1/2/3 keyframes so the visual "scoring sweep" reads as a loop.

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

const MATCH_PULSE = [
  "f-seq-pulse-1",
  "f-seq-pulse-2",
  "f-seq-pulse-3",
] as const;

function HowClaudePicksState() {
  return (
    <div
      data-testid="f4-how-claude-picks"
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        padding: "8px 12px",
        gap: 14,
      }}
    >
      <FacetHeader
        label="HOW CLAUDE PICKS"
        caption="model-invoked · name + description match user intent"
      />

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

      {/* Skill match rows — sequential pulse loop. */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {MATCH_SKILLS.map((s, i) => {
          const isTop = i === 0;
          return (
            <div
              key={s.name}
              data-testid={`match-skill-${s.name}`}
              data-top={isTop ? "true" : "false"}
              className={MATCH_PULSE[i]}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "10px 14px",
                border: `1px solid ${
                  isTop ? "var(--copper-200)" : "var(--copper-800)"
                }`,
                background: isTop
                  ? "rgba(184,110,61,0.10)"
                  : "rgba(10,10,10,0.6)",
              }}
            >
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: 12,
                    letterSpacing: "0.06em",
                    color: isTop ? "var(--copper-100)" : "var(--neutral-200)",
                  }}
                >
                  {s.name}
                </span>
                <span
                  style={{
                    fontFamily: "var(--serif)",
                    fontStyle: "italic",
                    fontSize: 11.5,
                    color: "var(--neutral-400)",
                    lineHeight: 1.4,
                  }}
                >
                  {s.detail}
                </span>
              </div>
              <span
                style={{
                  fontFamily: "var(--display)",
                  fontSize: 22,
                  color: isTop ? "var(--copper-200)" : "var(--neutral-400)",
                  lineHeight: 1,
                }}
              >
                {s.score.toFixed(2)}
              </span>
            </div>
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

// ───────────────────── LEAN CONTEXT state: token-budget viz ─────────────────────
//
// Horizontal stacked bar: skill metadata = 0.5% (copper-700), active skill
// content = 4% (copper-500), available context = 95.5% (copper-200). The
// three segments share the shared f-pointer-pulse keyframe so the bars
// subtly breathe — emphasizing the "lean context, rich knowledge" payoff.

interface TokenSegment {
  id: string;
  label: string;
  pct: number;
  color: string;
  desc: string;
}

const TOKEN_SEGMENTS: readonly TokenSegment[] = [
  {
    id: "metadata",
    label: "Skill metadata",
    pct: 0.5,
    color: "var(--copper-700)",
    desc: "all skill names + descriptions loaded at session start",
  },
  {
    id: "active",
    label: "Active skill content",
    pct: 4,
    color: "var(--copper-500)",
    desc: "the one skill Claude triggered for this turn",
  },
  {
    id: "rest",
    label: "Available context",
    pct: 95.5,
    color: "var(--copper-200)",
    desc: "free for your conversation, files, history",
  },
];

function LeanContextState() {
  return (
    <div
      data-testid="f4-lean-context"
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        padding: "8px 12px",
        gap: 14,
      }}
    >
      <FacetHeader
        label="LEAN CONTEXT, RICH KNOWLEDGE"
        caption="context budget protected · expertise unlimited"
      />

      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <span
          style={{
            fontFamily: "var(--mono)",
            fontSize: 10,
            letterSpacing: "0.20em",
            color: "var(--copper-300)",
            textTransform: "uppercase",
          }}
        >
          CONTEXT BUDGET
        </span>
        <span
          style={{
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontSize: 12.5,
            color: "var(--copper-200)",
            lineHeight: 1.4,
          }}
        >
          One full context window &middot; 200K tokens
        </span>
      </div>

      {/* Stacked bar — each segment breathes via f-pointer-pulse. */}
      <div
        style={{
          display: "flex",
          width: "100%",
          height: 44,
          border: "1px solid var(--copper-800)",
          overflow: "hidden",
        }}
      >
        {TOKEN_SEGMENTS.map((seg) => (
          <div
            key={seg.id}
            data-testid={`token-seg-${seg.id}`}
            className="f-pointer-pulse"
            style={{
              flexBasis: `${seg.pct}%`,
              minWidth: 2,
              background: seg.color,
              borderRight:
                seg.id !== "rest" ? "1px solid var(--copper-900)" : "none",
            }}
          />
        ))}
      </div>

      {/* Legend */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {TOKEN_SEGMENTS.map((seg) => (
          <div
            key={seg.id}
            style={{ display: "flex", alignItems: "center", gap: 12 }}
          >
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
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
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
            <span
              style={{
                fontFamily: "var(--display)",
                fontSize: 19,
                color: "var(--copper-200)",
                lineHeight: 1,
              }}
            >
              {seg.pct}%
            </span>
          </div>
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

// ───────────────────── EXAMPLE state: L1/L2/L3 breakdown ─────────────────────
//
// Three stacked cards showing the same skill at each disclosure level. The
// cards glow in sequence on the shared f-seq-pulse-1/2/3 loop.

interface ExampleCardSpec {
  level: 1 | 2 | 3;
  label: string;
  bodyKey: "l1" | "l2" | "l3";
  border: string;
  bg: string;
  text: string;
  pulseClass: "f-seq-pulse-1" | "f-seq-pulse-2" | "f-seq-pulse-3";
}

const EXAMPLE_CARDS: readonly ExampleCardSpec[] = [
  {
    level: 1,
    label: "L1 · METADATA",
    bodyKey: "l1",
    border: "var(--copper-800)",
    bg: "rgba(122,70,38,0.30)",
    text: "var(--copper-100)",
    pulseClass: "f-seq-pulse-1",
  },
  {
    level: 2,
    label: "L2 · INSTRUCTIONS",
    bodyKey: "l2",
    border: "var(--copper-700)",
    bg: "rgba(184,110,61,0.24)",
    text: "var(--copper-100)",
    pulseClass: "f-seq-pulse-2",
  },
  {
    level: 3,
    label: "L3 · RESOURCES",
    bodyKey: "l3",
    border: "var(--copper-600)",
    bg: "rgba(232,196,160,0.18)",
    text: "var(--neutral-50)",
    pulseClass: "f-seq-pulse-3",
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
        padding: "8px 12px",
        gap: 14,
      }}
    >
      <FacetHeader
        label="EXAMPLE · weekly-report-author"
        caption="the same skill, seen at each disclosure level."
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          flex: 1,
        }}
      >
        {EXAMPLE_CARDS.map((c) => (
          <div
            key={c.level}
            data-testid={`example-card-l${c.level}`}
            className={c.pulseClass}
            style={{
              border: `1px solid ${c.border}`,
              background: c.bg,
              padding: "10px 14px",
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
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
    </div>
  );
}

// ───────────────────── SkillModal — full SKILL.md overlay ─────────────────────
//
// Fixed-positioned overlay with a dark backdrop and a centered content card.
// Close via the X button OR clicking the backdrop. Content: the FULL SKILL.md
// body as it would live on disk.

interface SkillModalProps {
  open: boolean;
  onClose: () => void;
}

const FULL_SKILL_MD = `---
name: weekly-report-author
description: Drafts weekly status reports from project notes.
allowed-tools: [Read, Glob, Grep]
---

# Weekly Report Author

You are a senior project manager preparing the Friday status report.

## Audience
8 cross-functional stakeholders. Tone: factual, no hedging, no marketing.

## Sections
1. What shipped this week
   - bullets, each one outcome + owner + link
2. What's at risk
   - bullets, each one risk + mitigation + owner
3. Next week's priorities
   - max 5 bullets, ranked

## Tone
Factual, audience: 8 cross-functional stakeholders.
Prefer plain verbs. Avoid: leverage, ecosystem, synergy.

## Resources (loaded on demand)
- examples/2026-Q1-weekly-template.md
- examples/escalation-template.md
- snippets/common-status-phrases.md

## Workflow
1. Read project notes from \`./notes/\` for the past 7 days.
2. Group by section above.
3. Compose draft in markdown. No headers above H2.
4. Hand back to user for review.
`;

function SkillModal({ open, onClose }: SkillModalProps) {
  if (!open) return null;
  return (
    <div
      data-testid="f4-skill-modal-backdrop"
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.7)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        data-testid="f4-skill-modal"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "min(820px, 86vw)",
          maxHeight: "82vh",
          background: "rgba(15,15,15,0.98)",
          border: "1px solid var(--copper-700)",
          boxShadow:
            "0 24px 60px -16px rgba(0,0,0,0.6), 0 0 0 1px var(--copper-800)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Modal header */}
        <ModalHeader onClose={onClose} />
        {/* Modal body */}
        <div
          style={{
            padding: "18px 22px",
            overflow: "auto",
          }}
        >
          <pre
            style={{
              fontFamily: "var(--mono)",
              fontSize: 12.5,
              color: "var(--neutral-100)",
              whiteSpace: "pre-wrap",
              margin: 0,
              lineHeight: 1.6,
            }}
          >
            {FULL_SKILL_MD}
          </pre>
        </div>
      </div>
    </div>
  );
}

function ModalHeader({ onClose }: { onClose: () => void }): ReactNode {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "14px 20px",
        borderBottom: "1px solid var(--copper-800)",
        background: "rgba(122,70,38,0.18)",
      }}
    >
      <span
        aria-hidden="true"
        style={{
          display: "inline-block",
          width: 10,
          height: 10,
          borderRadius: "50%",
          background: "var(--copper-300)",
        }}
      />
      <span
        style={{
          fontFamily: "var(--mono)",
          fontSize: 12,
          letterSpacing: "0.18em",
          color: "var(--copper-200)",
          textTransform: "uppercase",
        }}
      >
        weekly-report-author/SKILL.md
      </span>
      <span
        style={{
          fontFamily: "var(--mono)",
          fontSize: 10,
          letterSpacing: "0.18em",
          color: "var(--neutral-400)",
          textTransform: "uppercase",
          marginLeft: 12,
        }}
      >
        full content
      </span>
      <CloseButton onClose={onClose} />
    </div>
  );
}

interface CloseButtonProps {
  onClose: () => void;
}

function CloseButton({ onClose }: CloseButtonProps) {
  const base: CSSProperties = {
    marginLeft: "auto",
    fontFamily: "var(--mono)",
    fontSize: 11,
    letterSpacing: "0.22em",
    color: "var(--copper-200)",
    textTransform: "uppercase",
    background: "transparent",
    border: "1px solid var(--copper-700)",
    padding: "6px 12px",
    cursor: "pointer",
    transition:
      "border-color 0.2s var(--ease), background 0.2s var(--ease), color 0.2s var(--ease)",
  };
  return (
    <button
      type="button"
      data-testid="f4-skill-modal-close"
      onClick={onClose}
      style={base}
      onMouseEnter={(e) => {
        const t = e.currentTarget;
        t.style.borderColor = "var(--copper-200)";
        t.style.background = "rgba(184,110,61,0.12)";
        t.style.color = "var(--copper-100)";
      }}
      onMouseLeave={(e) => {
        const t = e.currentTarget;
        t.style.borderColor = "var(--copper-700)";
        t.style.background = "transparent";
        t.style.color = "var(--copper-200)";
      }}
    >
      Close &times;
    </button>
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
