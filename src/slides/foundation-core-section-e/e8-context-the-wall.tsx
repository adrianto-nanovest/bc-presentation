// E.8 — CONTEXT · PITFALLS
//
// Ported from `claude-design-project/jsx/slides-b.jsx:460-636`.
//
// 2 steps:
//   0 — 4 pitfall cards visible (left col) + headline; right canvas is empty
//        until a card is hovered.
//   1 — italic footer caption reveals at the bottom of the left column.
//
// Hover state: hovering pitfall card N sets `activeKind = N.id`. The
// `<PitfallCanvas>` on the right reads that state and renders the matching
// SMIL anim + caption. When `activeKind` is null, the canvas renders nothing
// (per T9 — `defaultIllustration` was removed).
//
// Layout uses absolute coordinates against the 1280×720 stage. Reveal /
// CopperRule are the shared T10 reveal primitives — no Framer Motion.
import { useState } from "react";
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { highlight } from "@/components/highlight";
import { Reveal, CopperRule } from "./components/Reveal";
import { LucideIcon } from "./components/LucideIcon";
import { PitfallCanvas } from "./components/PitfallCanvas";
import { type PitfallKind } from "./components/PitfallAnims";
import { e8Content as C } from "./content";

// ───────────────────── slide ─────────────────────

export function E8ContextTheWall() {
  const { stepIndex } = useDeck();

  const showCards = stepIndex >= 0;
  const showFooter = stepIndex >= 1;

  const [activeKind, setActiveKind] = useState<PitfallKind | null>(null);
  const [pinnedKind, setPinnedKind] = useState<PitfallKind | null>(null);
  const effectiveKind = pinnedKind ?? activeKind;

  return (
    <>
      <FigLabel section="E" num={8} label="CONTEXT · PITFALLS" />

      <div className="slide-headline-row">
        <h1 className="slide-headline small">
          {highlight(C.headline, C.headlineKw)}
        </h1>
      </div>

      {/* LEFT — pitfall cards + footer.
          Top:156 / bottom:80 aligns with the codebase's `.slide-content` rule
          (the design source uses 200/80 — we follow the codebase convention as
          established by E.5 / E.6 / E.7 in this rewrite series). */}
      <div
        data-testid="e8-left-pane"
        style={{
          position: "absolute",
          left: 48,
          top: 156,
          width: 480,
          bottom: 80,
          display: "flex",
          flexDirection: "column",
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
          Four pitfalls
        </span>
        <div style={{ marginTop: 12 }}>
          <CopperRule on width="40%" />
        </div>

        <div
          data-testid="e8-pitfall-list"
          data-no-advance=""
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            marginTop: 16,
          }}
        >
          {C.pitfalls.map((p, i) => {
            const kind = p.id as PitfallKind;
            // Hover visual reads RAW `activeKind` (not effectiveKind) so
            // hovering a card while another is pinned still highlights the
            // hovered card; the pinned card keeps its pin styling from
            // `isPinned`.
            const isHover = activeKind === kind;
            const isPinned = pinnedKind === kind;
            return (
              <Reveal
                key={p.id}
                on={showCards}
                delay={120 + i * 90}
                data-testid={`pitfall-item-${p.id}`}
                data-active={isHover ? "true" : "false"}
                data-pinned={isPinned ? "true" : "false"}
              >
                <div
                  onMouseEnter={() => setActiveKind(kind)}
                  onMouseLeave={() => setActiveKind(null)}
                  onClick={() =>
                    setPinnedKind((cur) => (cur === kind ? null : kind))
                  }
                  style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 12,
                    padding: "10px 12px",
                    border: "1px solid",
                    borderColor:
                      isPinned || isHover
                        ? "var(--copper-200)"
                        : "var(--copper-800)",
                    background: isHover
                      ? "rgba(184,110,61,0.06)"
                      : "transparent",
                    boxShadow: isPinned
                      ? "inset 0 0 0 1px rgba(217,158,108,0.3)"
                      : "none",
                    transition:
                      "border-color 0.2s var(--ease), background 0.2s var(--ease), box-shadow 0.2s var(--ease)",
                    cursor: "pointer",
                  }}
                >
                  {isPinned && (
                    <div
                      aria-label="pinned"
                      style={{
                        position: "absolute",
                        top: 6,
                        right: 8,
                        color: "var(--copper-200)",
                        display: "flex",
                      }}
                    >
                      <LucideIcon name="Pin" size={11} color="currentColor" />
                    </div>
                  )}
                  <div style={{ marginTop: 2 }}>
                    <LucideIcon name={p.icon} size={20} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontFamily: "var(--mono)",
                        fontSize: 12,
                        letterSpacing: "0.18em",
                        color: "var(--copper-100)",
                        textTransform: "uppercase",
                      }}
                    >
                      {p.title}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--serif)",
                        fontStyle: "italic",
                        fontSize: 13,
                        color: "var(--neutral-300)",
                        marginTop: 3,
                      }}
                    >
                      {p.essence}
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <div style={{ flex: 1 }} />

        <Reveal on={showFooter} data-testid="e8-footer">
          <p
            style={{
              fontFamily: "var(--serif)",
              fontStyle: "italic",
              fontSize: 15,
              color: "var(--copper-200)",
              margin: 0,
              lineHeight: 1.4,
            }}
          >
            {highlight(C.footer, C.footerKw)}
          </p>
        </Reveal>
      </div>

      {/* RIGHT — pitfall illustration + caption (renders nothing until hover). */}
      <div
        data-testid="e8-right-pane"
        style={{
          position: "absolute",
          right: 48,
          top: 156,
          width: 660,
          bottom: 80,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <PitfallCanvas activeKind={effectiveKind} />
      </div>
    </>
  );
}

// ───────────────────── slide def ─────────────────────

export const e8Slide: SlideDef = {
  steps: 2,
  canonicalPose: 1,
  animationMode: "step-reveal",
  surface: "dark",
  section: "E",
  render: () => <E8ContextTheWall />,
};
