// F.4 — WRITE ONCE (Skills, with progressive disclosure)
//
// Spec §7. E.8-style split-pane (480/660): FacetMenu on the left, DetailCanvas
// on the right. Five facets (WHAT IT IS · PROGRESSIVE DISCLOSURE · HOW CLAUDE
// PICKS · LEAN CONTEXT, RICH KNOWLEDGE · EXAMPLE). The flagship right canvas
// is the three-level progressive-disclosure ladder (copper monochromatic
// stops — copper-700 / copper-500 / copper-200, NOT teal/green/orange).
//
// Step axis (7 steps — spec §7.5):
//   0 — title + facet header + copper rule visible; canvas at default but
//       only L1 visible (METADATA only)
//   1 — facet 1 reveals; L2 fades in canvas (level=2)
//   2 — facet 2 reveals; L3 + LEAN CONTEXT callout fade in (level="all")
//   3 — facet 3 reveals
//   4 — facet 4 reveals
//   5 — facet 5 reveals
//   6 — footer italic reveals
//
// Hover: after step 5, hovering a facet swaps the DetailCanvas state.
// WHAT IT IS hover state additionally supports click-modal expansion of the
// full SKILL.md content.
//
// Canonical pose: 5 — all facets revealed, all 3 disclosure levels visible,
// LEAN CONTEXT callout visible.
import { useState } from "react";
import type { CSSProperties } from "react";
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { highlight } from "@/components/highlight";
import { FacetMenu } from "./components/FacetMenu";
import { DetailCanvas } from "./components/DetailCanvas";
import { Typewriter } from "./components/Typewriter";
import { SkillProgressiveDisclosure } from "./components/SkillProgressiveDisclosure";
import { f4Content as C } from "./content";

// ───────────────────── slide ─────────────────────

export function F4SkillsWriteOnce() {
  const { stepIndex } = useDeck();
  const [activeFacet, setActiveFacet] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Step gating
  const showCards = stepIndex >= 1; // facets cascade starting step 1
  const showFooter = stepIndex >= 6;

  // Disclosure level builds in tandem with the facet menu (spec §7.5).
  // Steps 0 → only L1; step 1 → L1+L2; step 2+ → all (incl. callout).
  const defaultDisclosureLevel: 1 | 2 | "all" =
    stepIndex <= 0 ? 1 : stepIndex === 1 ? 2 : "all";

  // After all facets revealed, hover is enabled.
  const hoverEnabled = stepIndex >= 5;
  const effectiveFacet = hoverEnabled ? activeFacet : null;

  return (
    <>
      <FigLabel section="F" num={4} label="WRITE ONCE" />

      <div className="slide-headline-row">
        <h1 className="slide-headline small">
          {highlight(C.headline, C.headlineKw)}
        </h1>
      </div>

      {/* LEFT pane — FacetMenu */}
      <FacetMenu
        items={C.facets}
        activeFacet={effectiveFacet}
        onHover={hoverEnabled ? setActiveFacet : () => {}}
        showCards={showCards}
        header={C.header}
        footer={C.footer}
        footerKw={C.footerKw}
        showFooter={showFooter}
      />

      {/* RIGHT pane — DetailCanvas */}
      <div
        data-testid="f4-right-pane"
        style={{
          position: "absolute",
          right: 48,
          top: 156,
          width: 660,
          bottom: 80,
        }}
      >
        <DetailCanvas
          activeFacet={effectiveFacet}
          defaultState={
            <SkillProgressiveDisclosure level={defaultDisclosureLevel} />
          }
          states={{
            // WHAT IT IS — SKILL.md preview with Expand → modal
            "what-it-is": (
              <SkillMdPreview
                onExpand={() => setModalOpen(true)}
                active={effectiveFacet === "what-it-is"}
              />
            ),
            // PROGRESSIVE DISCLOSURE — full ladder (same as default)
            "progressive-disclosure": (
              <SkillProgressiveDisclosure level="all" />
            ),
            // HOW CLAUDE PICKS — user query + match-scored skills dropdown
            "how-claude-picks": <HowClaudePicks />,
            // LEAN CONTEXT, RICH KNOWLEDGE — token-budget bar
            "lean-context": <TokenBudget />,
            // EXAMPLE — L1/L2/L3 breakdown cards
            example: <ExampleBreakdown />,
          }}
        />
      </div>

      {/* SKILL.md full-content modal — opened from WHAT IT IS state */}
      {modalOpen ? (
        <SkillModal open onClose={() => setModalOpen(false)} />
      ) : null}
    </>
  );
}

// ───────────────────── WHAT IT IS state: SKILL.md preview ─────────────────────
//
// Mock terminal/file-editor frame: monospace font, dark bg with copper border,
// filename strip at the top, Typewriter streams the SKILL.md preview body.
// "Expand →" button at the bottom-right opens the full modal.

interface SkillMdPreviewProps {
  onExpand: () => void;
  active: boolean;
}

function SkillMdPreview({ onExpand, active }: SkillMdPreviewProps) {
  // Typewriter duration scales with the preview body length. We key the
  // Typewriter on `active` so it restarts whenever the WHAT IT IS state
  // becomes active (rather than streaming silently while invisible).
  const text = C.skillMdPreview.body;
  const duration = Math.min(2800, Math.max(900, text.length * 14));
  return (
    <div
      data-testid="f4-skill-md-preview"
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        border: "1px solid var(--copper-700)",
        background: "rgba(10,10,10,0.85)",
      }}
    >
      {/* Filename strip */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "10px 16px",
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
            background: "var(--copper-500)",
          }}
        />
        <span
          style={{
            fontFamily: "var(--mono)",
            fontSize: 11,
            letterSpacing: "0.18em",
            color: "var(--copper-200)",
            textTransform: "uppercase",
          }}
        >
          {C.skillMdPreview.filename}
        </span>
      </div>
      {/* Streaming body */}
      <div
        style={{
          flex: 1,
          padding: "14px 18px",
          overflow: "hidden",
        }}
      >
        <Typewriter
          key={active ? "active" : "idle"}
          play={active}
          text={text}
          duration={duration}
          caretStyle="block"
          style={{
            fontFamily: "var(--mono)",
            fontSize: 12,
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
          padding: "10px 16px",
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
  );
}

// ───────────────────── HOW CLAUDE PICKS state ─────────────────────
//
// User query bar at top + Claude's matching-engine dropdown showing 3 skills
// with match-scores (top match in copper border).

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

function HowClaudePicks() {
  return (
    <div
      data-testid="f4-how-claude-picks"
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        padding: "8px 12px",
        gap: 18,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 6,
        }}
      >
        <span
          style={{
            fontFamily: "var(--mono)",
            fontSize: 11,
            letterSpacing: "0.22em",
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
            padding: "12px 16px",
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontSize: 16,
            color: "var(--neutral-100)",
            lineHeight: 1.4,
          }}
        >
          &ldquo;draft this week&rsquo;s status report&rdquo;
        </div>
      </div>

      {/* Matching-engine label */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <span
          style={{
            fontFamily: "var(--mono)",
            fontSize: 11,
            letterSpacing: "0.22em",
            color: "var(--copper-300)",
            textTransform: "uppercase",
          }}
        >
          CLAUDE&rsquo;S MATCH ENGINE
        </span>
        <div
          style={{
            flex: 1,
            height: 1,
            background: "var(--copper-800)",
          }}
        />
      </div>

      {/* Skill match dropdown */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        {MATCH_SKILLS.map((s, i) => {
          const isTop = i === 0;
          return (
            <div
              key={s.name}
              data-testid={`match-skill-${s.name}`}
              data-top={isTop ? "true" : "false"}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "12px 16px",
                border: `1px solid ${
                  isTop ? "var(--copper-200)" : "var(--copper-800)"
                }`,
                background: isTop
                  ? "rgba(184,110,61,0.10)"
                  : "rgba(10,10,10,0.6)",
                boxShadow: isTop
                  ? "0 0 24px -10px var(--copper-300)"
                  : "none",
              }}
            >
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
                <span
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: 13,
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
                    fontSize: 12,
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
                  fontSize: 26,
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
          fontSize: 13,
          color: "var(--copper-200)",
          margin: 0,
          lineHeight: 1.4,
        }}
      >
        Model-invoked: Claude scores skill name + description against the user
        intent and loads the top match.
      </p>
    </div>
  );
}

// ───────────────────── LEAN CONTEXT state: token-budget viz ─────────────────────
//
// Horizontal stacked bar: skill metadata = 0.5% (copper-700), active skill
// content = 4% (copper-500), rest = available context = 95.5% (copper-200).

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

function TokenBudget() {
  return (
    <div
      data-testid="f4-token-budget"
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        padding: "8px 12px",
        gap: 20,
      }}
    >
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
          CONTEXT BUDGET
        </span>
        <span
          style={{
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontSize: 14,
            color: "var(--copper-200)",
            lineHeight: 1.4,
          }}
        >
          One full context window &middot; 200K tokens
        </span>
      </div>

      {/* Stacked bar */}
      <div
        style={{
          display: "flex",
          width: "100%",
          height: 56,
          border: "1px solid var(--copper-800)",
          overflow: "hidden",
        }}
      >
        {TOKEN_SEGMENTS.map((seg) => (
          <div
            key={seg.id}
            data-testid={`token-seg-${seg.id}`}
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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        {TOKEN_SEGMENTS.map((seg) => (
          <div
            key={seg.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
            }}
          >
            <span
              aria-hidden="true"
              style={{
                display: "inline-block",
                width: 14,
                height: 14,
                background: seg.color,
                border: "1px solid var(--copper-800)",
              }}
            />
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
              <span
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 12,
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
                  fontSize: 12,
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
                fontSize: 22,
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
          fontSize: 13,
          color: "var(--copper-200)",
          margin: 0,
          lineHeight: 1.4,
        }}
      >
        Lean context, rich knowledge &mdash; the payoff of progressive
        disclosure.
      </p>
    </div>
  );
}

// ───────────────────── EXAMPLE state: L1/L2/L3 breakdown ─────────────────────

interface ExampleCardSpec {
  level: 1 | 2 | 3;
  label: string;
  bodyKey: "l1" | "l2" | "l3";
  border: string;
  bg: string;
  text: string;
}

const EXAMPLE_CARDS: readonly ExampleCardSpec[] = [
  {
    level: 1,
    label: "L1 · METADATA",
    bodyKey: "l1",
    border: "var(--copper-800)",
    bg: "rgba(122,70,38,0.30)",
    text: "var(--copper-100)",
  },
  {
    level: 2,
    label: "L2 · INSTRUCTIONS",
    bodyKey: "l2",
    border: "var(--copper-700)",
    bg: "rgba(184,110,61,0.24)",
    text: "var(--copper-100)",
  },
  {
    level: 3,
    label: "L3 · RESOURCES",
    bodyKey: "l3",
    border: "var(--copper-600)",
    bg: "rgba(232,196,160,0.18)",
    text: "var(--neutral-50)",
  },
];

function ExampleBreakdown() {
  return (
    <div
      data-testid="f4-example-breakdown"
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        padding: "8px 12px",
        gap: 14,
      }}
    >
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
          EXAMPLE &middot; weekly-report-author
        </span>
        <span
          style={{
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontSize: 14,
            color: "var(--copper-200)",
            lineHeight: 1.4,
          }}
        >
          The same skill, seen at each disclosure level.
        </span>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          flex: 1,
        }}
      >
        {EXAMPLE_CARDS.map((c) => (
          <div
            key={c.level}
            data-testid={`example-card-l${c.level}`}
            style={{
              border: `1px solid ${c.border}`,
              background: c.bg,
              padding: "12px 16px",
              display: "flex",
              flexDirection: "column",
              gap: 6,
            }}
          >
            <span
              style={{
                fontFamily: "var(--mono)",
                fontSize: 11,
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
                fontSize: 12.5,
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
// Fixed-positioned overlay with a dark backdrop (rgba(0,0,0,0.7)) and a
// centered content card. Close via the X button OR clicking the backdrop.
//
// Content: the FULL SKILL.md body as it would live on disk — the preview
// snippet from `f4Content.skillMdPreview.body` plus the expanded examples
// section referenced in `f4Content.exampleBreakdown.l3` and the role/tone
// details from `exampleBreakdown.l2`.

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
        animation: "f4-modal-fade 200ms var(--ease)",
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
          boxShadow: "0 24px 60px -16px rgba(0,0,0,0.6), 0 0 0 1px var(--copper-800)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Modal header */}
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
  steps: 7,
  canonicalPose: 5,
  animationMode: "step-reveal",
  surface: "dark",
  section: "F",
  render: () => <F4SkillsWriteOnce />,
};
