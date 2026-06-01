// E.5 — PROMPT · EXAMPLES
//
// The payoff slide for Section E: after the six structures (E3) and the basic
// techniques (E4), attendees see exactly how those parts combine in six real
// prompts they could type tomorrow.
//
// Spec: docs/specs/2026-06-01-e5-prompt-examples-spec.md
//
// Layout mirrors E3's stepIndex-0 two-column grid pinned to the 1280×720
// stage. LEFT = six use-case cards; RIGHT = a detail popover for the active
// use case (goal → streamed prompt → structure pills → technique pills).
//
// 2 steps:
//   0 — full interactive content (card list + popover + cross-highlight)
//   1 — footer caption reveals
//
// The signature interaction is a BIDIRECTIONAL cross-highlight (modelled on
// application-section-h/DisciplineWall): one piece of state — `activeStructures`
// — links prompt segments ↔ structure pills ↔ technique pills. Hover a segment,
// a structure pill, or a technique pill and every related piece lights up.
import { Fragment, useMemo, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { highlight } from "@/components/highlight";
import { Reveal, CopperRule } from "./components/Reveal";
import { LucideIcon } from "./components/LucideIcon";
import { Typewriter } from "./components/Typewriter";
import { e5Content as C } from "./content";

// ───────────────────── types & static maps ─────────────────────

type UseCase = (typeof C.useCases)[number];

// Display names for the six structure ids (Output Format is the only multi-word
// label; the rest mirror E3's spine names).
const STRUCTURE_NAMES: Record<string, string> = {
  role: "Role",
  instruction: "Instruction",
  output: "Output Format",
  context: "Context",
  examples: "Examples",
  input: "Input",
};

// 1–3 keyword(s) per subtitle to copper-italicize (deck-wide rule). Kept local
// rather than threaded through the frozen content data.
const SUBTITLE_KW: Record<string, string[]> = {
  email: ["polished message"],
  summary: ["short briefing"],
  actions: ["clear task list"],
  compare: ["recommendation"],
  timeline: ["phases with dates"],
  rewrite: ["non-experts"],
};

// 1 keyword per goal sentence (deck-wide rule, applied at render time).
const GOAL_KW: Record<string, string> = {
  email: "ready-to-send",
  summary: "scannable briefing",
  actions: "clean, assigned action-item list",
  compare: "final recommendation",
  timeline: "phased schedule",
  rewrite: "plain language",
};

const isPlaceholder = (text: string) =>
  text.trimStart().startsWith("[") && text.trimEnd().endsWith("]");

// ───────────────────── prompt display model ─────────────────────
//
// The Typewriter streams ONE `fullText` string but we want each segment to be
// an independently hoverable span. We build a flat list of "pieces" — segments
// interleaved with their join separators — each with a [start, end) offset into
// `fullText`. The Typewriter `render(visible)` prop then slices each piece out
// of the streamed prefix, so segment spans light up as the caret crosses them.
//
// Join rules (from the spec):
//   • default: blank line between segments ("\n\n")
//   • summary: join the instruction+output clause-split pair with a single
//     SPACE (they read as one sentence)
//   • rewrite examples: literal "\n" inside the segment renders as line breaks
type Piece =
  | { kind: "sep"; text: string; start: number }
  | { kind: "seg"; text: string; start: number; segIndex: number; structure: string };

function buildPieces(uc: UseCase): { pieces: Piece[]; fullText: string } {
  const pieces: Piece[] = [];
  let full = "";
  uc.segments.forEach((seg, i) => {
    if (i > 0) {
      // summary: clause-split instruction → output joins with a single space.
      const joinWithSpace =
        uc.id === "summary" &&
        uc.segments[i - 1].structure === "instruction" &&
        seg.structure === "output";
      const sep = joinWithSpace ? " " : "\n\n";
      pieces.push({ kind: "sep", text: sep, start: full.length });
      full += sep;
    }
    pieces.push({
      kind: "seg",
      text: seg.text,
      start: full.length,
      segIndex: i,
      structure: seg.structure,
    });
    full += seg.text;
  });
  return { pieces, fullText: full };
}

// ───────────────────── slide ─────────────────────

export function E5PromptExamples() {
  const { stepIndex } = useDeck();

  // Card selection mirrors E3/E4: the PIN wins. Nothing is pinned on arrival,
  // so the right panel starts empty and a hovered card live-previews it. Once a
  // card is pinned (click), the panel LOCKS to it — hovering other cards no
  // longer changes the right side — until the pinned card is clicked again to
  // unpin. Pinning is also what lets the presenter move the cursor into the
  // popover to hover its pills/segments without the panel vanishing.
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [pinnedId, setPinnedId] = useState<string | null>(null);
  const activeId = pinnedId ?? hoverId;

  // The single cross-highlight state: which structure ids are currently lit.
  // Set on hover of a segment / structure pill / technique pill; cleared on
  // leave. A technique with empty refs (Zero-Shot) lights nothing.
  const [activeStructures, setActiveStructures] = useState<string[]>([]);
  const litStructures = useMemo(
    () => new Set(activeStructures),
    [activeStructures],
  );

  const activeUseCase: UseCase | null = activeId
    ? C.useCases.find((u) => u.id === activeId) ?? null
    : null;

  const showFooter = stepIndex >= 1;

  return (
    <>
      <FigLabel section="E" num={5} label="LAYER 1 · EXAMPLES" />

      <div className="slide-headline-row">
        <h1 className="slide-headline small">
          {highlight(C.headline, C.headlineKw)}
        </h1>
      </div>

      {/*
        Two-column grid pinned to the stage, mirroring E3's stepIndex-0 layout:
          col 1 — section label + 6 use-case cards
          col 2 — gutter
          col 3 — detail popover for the active use case
      */}
      <div
        data-testid="e5-grid"
        style={{
          position: "absolute",
          left: 48,
          right: 48,
          top: 156,
          // 92 (not 80) lifts the grid's content clear of the step-1 footer at
          // bottom:50 — at 80 the last left card bottomed at y≈640 vs the footer
          // top at y≈650 (~10px gap); 92 opens a comfortable clearance.
          bottom: 92,
          display: "grid",
          gridTemplateColumns: "380px 32px minmax(0, 1fr)",
          gridTemplateRows: "auto minmax(0, 1fr)",
          rowGap: 12,
          columnGap: 0,
        }}
      >
        {/* Col 1, row 1 — section label */}
        <div style={{ gridColumn: 1, gridRow: 1 }}>
          <span
            style={{
              fontFamily: "var(--mono)",
              fontSize: 10,
              letterSpacing: "0.22em",
              color: "var(--copper-400)",
              textTransform: "uppercase",
            }}
          >
            Use Cases
          </span>
          <div style={{ height: 8 }} />
          <CopperRule on width="100%" />
        </div>

        {/* Col 1, row 2 — use-case card list */}
        <div
          style={{
            gridColumn: 1,
            gridRow: 2,
            display: "flex",
            flexDirection: "column",
            gap: 8,
            minHeight: 0,
          }}
        >
          {C.useCases.map((uc, i) => {
            const isPinned = pinnedId === uc.id;
            const isActive = activeId === uc.id;
            // Card highlight mirrors E3: a card is bright when it is pinned OR
            // hovered — independently. The pinned card stays lit AND any hovered
            // card also lights up (multiple cards can glow at once), while the
            // right panel stays locked to the pin (pin-wins, via `activeId`).
            const isHighlighted = isPinned || hoverId === uc.id;
            return (
              <Reveal
                key={uc.id}
                on={stepIndex >= 0}
                delay={120 + i * 70}
                style={{ display: "flex", flex: 1, minHeight: 0 }}
              >
                <div
                  data-testid={`e5-usecase-${uc.id}`}
                  data-active={isActive ? "true" : "false"}
                  data-highlighted={isHighlighted ? "true" : "false"}
                  data-no-advance=""
                  onMouseEnter={() => setHoverId(uc.id)}
                  onMouseLeave={() => setHoverId(null)}
                  onClick={() =>
                    setPinnedId((cur) => (cur === uc.id ? null : uc.id))
                  }
                  style={{
                    position: "relative",
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    gap: 13,
                    padding: "8px 14px",
                    border: `1px solid ${isHighlighted ? "var(--copper-200)" : "var(--copper-800)"}`,
                    background: isHighlighted
                      ? "rgba(217,158,108,0.08)"
                      : "transparent",
                    boxShadow: isHighlighted
                      ? "0 0 18px rgba(217,158,108,0.18)"
                      : "none",
                    transition: "all 0.2s var(--ease)",
                    cursor: "pointer",
                  }}
                >
                  {isPinned && (
                    <span
                      aria-label="pinned"
                      style={{
                        position: "absolute",
                        top: 4,
                        right: 6,
                        color: "var(--copper-200)",
                        display: "inline-flex",
                      }}
                    >
                      <LucideIcon name="Pin" size={11} color="currentColor" />
                    </span>
                  )}
                  <span
                    style={{
                      display: "inline-flex",
                      flexShrink: 0,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <LucideIcon
                      name={uc.icon}
                      size={20}
                      color={
                        isHighlighted
                          ? "var(--copper-200)"
                          : "var(--copper-500)"
                      }
                    />
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontFamily: "var(--mono)",
                        fontSize: 12,
                        letterSpacing: "0.1em",
                        color: isHighlighted
                          ? "var(--copper-100)"
                          : "var(--neutral-100)",
                        textTransform: "uppercase",
                        lineHeight: 1.2,
                      }}
                    >
                      {uc.title}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--serif)",
                        fontStyle: "italic",
                        fontSize: 13,
                        color: "var(--neutral-400)",
                        marginTop: 2,
                        lineHeight: 1.25,
                      }}
                    >
                      {highlight(uc.subtitle, SUBTITLE_KW[uc.id] ?? [])}
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Col 3, rows 1–2 — detail popover (spans the full height). */}
        {activeUseCase && (
          <div
            style={{
              gridColumn: 3,
              gridRow: "1 / span 2",
              display: "flex",
              minHeight: 0,
            }}
          >
            <UseCaseDetail
              uc={activeUseCase}
              litStructures={litStructures}
              setActiveStructures={setActiveStructures}
            />
          </div>
        )}
      </div>

      {/* Footer — revealed on step 1, bottom-left of the stage (E4 pattern,
          no box). Stage-level sibling so it doesn't disturb the grid. */}
      {showFooter && (
        <Reveal
          on={showFooter}
          data-testid="e5-footer"
          style={{ position: "absolute", left: 48, right: 48, bottom: 50 }}
        >
          <p
            style={{
              fontFamily: "var(--serif)",
              fontStyle: "italic",
              fontSize: 14,
              color: "var(--neutral-400)",
              margin: 0,
              lineHeight: 1.4,
            }}
          >
            {highlight(C.footer, C.footerKw)}
          </p>
        </Reveal>
      )}
    </>
  );
}

// ───────────────────── UseCaseDetail (the right popover) ─────────────────────

interface UseCaseDetailProps {
  uc: UseCase;
  litStructures: Set<string>;
  setActiveStructures: (s: string[]) => void;
}

function UseCaseDetail({
  uc,
  litStructures,
  setActiveStructures,
}: UseCaseDetailProps) {
  const { pieces, fullText } = useMemo(() => buildPieces(uc), [uc]);

  // Streaming duration scales with prompt length, clamped to a comfortable
  // band so short prompts don't snap and long ones don't drag.
  const duration = Math.min(2400, Math.max(700, fullText.length * 14));

  const popoverStyle: CSSProperties = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    border: "1px solid var(--copper-300)",
    background: "rgba(20,12,6,0.85)",
    boxShadow: "0 0 0 1px rgba(217,158,108,0.18) inset",
    paddingTop: 20,
    paddingLeft: 24,
    paddingRight: 24,
    paddingBottom: 20,
    minHeight: 0,
    overflow: "hidden",
  };

  // The Typewriter render-prop: slice each piece out of the streamed prefix so
  // segment spans appear progressively AND remain hoverable for cross-highlight.
  const renderStream = (visible: string): ReactNode => {
    const shown = visible.length;
    return (
      <>
        {pieces.map((piece, idx) => {
          if (piece.start >= shown) return null;
          const vis = piece.text.slice(0, Math.max(0, shown - piece.start));
          if (piece.kind === "sep") {
            return <Fragment key={`sep-${idx}`}>{vis}</Fragment>;
          }
          const lit = litStructures.has(piece.structure);
          const placeholder = isPlaceholder(piece.text);
          return (
            <span
              key={`seg-${piece.segIndex}`}
              data-seg-structure={piece.structure}
              onMouseEnter={() => setActiveStructures([piece.structure])}
              onMouseLeave={() => setActiveStructures([])}
              style={{
                whiteSpace: "pre-line",
                borderRadius: 2,
                margin: "0 -2px",
                padding: "0 2px",
                background: lit ? "rgba(217,158,108,0.22)" : "transparent",
                color: placeholder
                  ? "var(--neutral-500)"
                  : lit
                    ? "var(--copper-100)"
                    : "var(--neutral-100)",
                fontStyle: placeholder ? "italic" : "normal",
                transition: "background 0.18s var(--ease), color 0.18s var(--ease)",
                cursor: "default",
              }}
            >
              {vis}
            </span>
          );
        })}
      </>
    );
  };

  return (
    <div data-testid={`e5-detail-${uc.id}`} style={popoverStyle}>
      {/* GOAL */}
      <div
        style={{
          fontFamily: "var(--mono)",
          fontSize: 10,
          letterSpacing: "0.22em",
          color: "var(--copper-400)",
          textTransform: "uppercase",
          marginBottom: 6,
        }}
      >
        Goal
      </div>
      <p
        data-testid="e5-goal"
        style={{
          fontFamily: "var(--serif)",
          fontSize: 16,
          color: "var(--neutral-100)",
          margin: 0,
          lineHeight: 1.4,
        }}
      >
        {highlight(uc.goal, [GOAL_KW[uc.id] ?? ""].filter(Boolean))}
      </p>

      <div style={{ height: 14 }} />
      <CopperRule on width="30%" />
      <div style={{ height: 14 }} />

      {/* PROMPT — streamed, segment-aware. */}
      <div
        style={{
          fontFamily: "var(--mono)",
          fontSize: 10,
          letterSpacing: "0.22em",
          color: "var(--copper-400)",
          textTransform: "uppercase",
          marginBottom: 8,
        }}
      >
        Prompt
      </div>
      <div
        data-testid="e5-prompt"
        style={{
          flex: 1,
          minHeight: 0,
          overflow: "auto",
          border: "1px solid var(--copper-800)",
          background: "rgba(0,0,0,0.45)",
          padding: "12px 14px",
        }}
      >
        <Typewriter
          key={uc.id}
          play
          text={fullText}
          duration={duration}
          caretStyle="block"
          render={renderStream}
          style={{
            fontFamily: "var(--mono)",
            fontSize: 12.5,
            color: "var(--neutral-100)",
            whiteSpace: "pre-wrap",
            margin: 0,
            lineHeight: 1.6,
          }}
        />
      </div>

      <div style={{ height: 16 }} />

      {/* STRUCTURES pill row. */}
      <PillSection
        label="Structures"
        items={uc.structures.map((id) => ({
          key: id,
          testid: `e5-structure-${id}`,
          text: STRUCTURE_NAMES[id] ?? id,
          refs: [id],
        }))}
        litStructures={litStructures}
        setActiveStructures={setActiveStructures}
      />

      <div style={{ height: 12 }} />

      {/* TECHNIQUES pill row. */}
      <PillSection
        label="Techniques"
        items={uc.techniques.map((t) => ({
          key: t.id,
          testid: `e5-technique-${t.id}`,
          text: t.label,
          refs: [...t.refs],
        }))}
        litStructures={litStructures}
        setActiveStructures={setActiveStructures}
        variant="technique"
      />
    </div>
  );
}

// ───────────────────── PillSection ─────────────────────

interface PillItem {
  key: string;
  testid: string;
  text: string;
  /** Structure ids this pill highlights when hovered. */
  refs: string[];
}

interface PillSectionProps {
  label: string;
  items: PillItem[];
  litStructures: Set<string>;
  setActiveStructures: (s: string[]) => void;
  /** "structure" pills light when their own id is lit; "technique" pills light
   *  when ALL their refs are lit (so a 2-technique case highlights each one). */
  variant?: "structure" | "technique";
}

function PillSection({
  label,
  items,
  litStructures,
  setActiveStructures,
  variant = "structure",
}: PillSectionProps) {
  // When something is lit, dim the non-matching pills slightly so the active
  // relationship reads clearly (DisciplineWall idiom).
  const anyLit = litStructures.size > 0;

  return (
    <div>
      <div
        style={{
          fontFamily: "var(--mono)",
          fontSize: 10,
          letterSpacing: "0.22em",
          color: "var(--copper-400)",
          textTransform: "uppercase",
          marginBottom: 8,
        }}
      >
        {label}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {items.map((item) => {
          const isLit =
            variant === "structure"
              ? litStructures.has(item.refs[0])
              : item.refs.length > 0 &&
                item.refs.every((r) => litStructures.has(r));
          const dim = anyLit && !isLit;
          return (
            <span
              key={item.key}
              data-testid={item.testid}
              data-lit={isLit ? "true" : "false"}
              onMouseEnter={() => setActiveStructures(item.refs)}
              onMouseLeave={() => setActiveStructures([])}
              style={{
                fontFamily: "var(--mono)",
                fontSize: 11,
                letterSpacing: "0.08em",
                color: isLit ? "var(--copper-100)" : "var(--copper-300)",
                padding: "4px 11px",
                border: `1px solid ${isLit ? "var(--copper-200)" : "var(--copper-700)"}`,
                background: isLit
                  ? "rgba(217,158,108,0.16)"
                  : "rgba(10,10,10,0.55)",
                boxShadow: isLit
                  ? "0 0 14px rgba(217,158,108,0.3)"
                  : "none",
                opacity: dim ? 0.45 : 1,
                transition: "all 0.18s var(--ease)",
                cursor: "default",
                textTransform: "uppercase",
              }}
            >
              {item.text}
            </span>
          );
        })}
      </div>
    </div>
  );
}

// ───────────────────── slide def ─────────────────────

export const e5Slide: SlideDef = {
  steps: 2,
  canonicalPose: 1,
  animationMode: "step-reveal",
  surface: "dark",
  section: "E",
  render: () => <E5PromptExamples />,
};
