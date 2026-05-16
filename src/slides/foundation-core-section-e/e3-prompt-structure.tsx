// E.3 — PROMPT · STRUCTURE
//
// Ported from `claude-design-project/jsx/slides-a.jsx:426-600` (slide body
// + the inlined `<SpinePopover>` sub-component).
//
// 3 steps:
//   0 — spine cards on the left; right column shows the SpinePopover for the
//        currently hovered spine entry (or stays blank if nothing is hovered)
//   1 — framework 5×2 grid mounts on the right (popover is gone). Hovering a
//        framework tile lights up the spine entries listed in `f.hits`
//   2 — footer caption reveals beneath the framework grid
//
// Layout uses absolute coordinates against the 1280×720 stage. Reveal /
// CopperRule are the shared T10 reveal primitives — no Framer Motion here.
import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { HintIcon } from "@/components/HintIcon";
import { highlight } from "@/components/highlight";
import { Reveal, CopperRule } from "./components/Reveal";
import { LucideIcon } from "./components/LucideIcon";
import { e3Content as C } from "./content";

// ───────────────────── slide ─────────────────────

type SpineEntry = (typeof C.spine)[number];

export function E3PromptStructure() {
  const { stepIndex } = useDeck();
  const [hoverFw, setHoverFw] = useState<string | null>(null);
  const [hoverSpine, setHoverSpine] = useState<string | null>(null);
  const [pinnedSpine, setPinnedSpine] = useState<string | null>(null);
  const [pinnedFw, setPinnedFw] = useState<string | null>(null);

  // Click-to-pin: pinned value wins, else hover.
  const activeSpine = pinnedSpine ?? hoverSpine;
  const activeFw = pinnedFw ?? hoverFw;

  // Spine indices "lit" by the currently active framework (steps ≥ 1).
  const lit = useMemo(() => {
    if (!activeFw) return new Set<number>();
    const fw = C.frameworks.find((f) => f.id === activeFw);
    return new Set<number>(fw ? [...fw.hits] : []);
  }, [activeFw]);

  const showSpine = stepIndex >= 0;
  const showFrameworks = stepIndex >= 1;
  const showFooter = stepIndex >= 2;

  // Popover only appears on step 0 — past that the right column is owned by
  // the framework grid.
  const popSpine: SpineEntry | null =
    stepIndex === 0 && activeSpine
      ? C.spine.find((s) => s.id === activeSpine) ?? null
      : null;

  return (
    <>
      <FigLabel section="E" num={3} label="LAYER 1 · STRUCTURE" />

      <div className="slide-headline-row">
        <h1 className="slide-headline small">
          {highlight(C.headline, C.headlineKw)}
        </h1>
      </div>

      {/*
        Two-column grid:
          row 1            — section headers (left + right)
          rows 2–7         — 6 spine cards (left col); right col holds either
                             the SpinePopover (step 0) or the framework grid
                             (steps ≥ 1)
          row 7 (right)    — when the footer is shown, the framework grid
                             shrinks to rows 2–6 and the footer occupies row 7
                             so it bottom-aligns with spine card 6.
      */}
      <div
        data-testid="e3-grid"
        style={{
          position: "absolute",
          left: 48,
          right: 48,
          top: 156,
          bottom: 80,
          display: "grid",
          gridTemplateColumns: "470px 32px minmax(0, 1fr)",
          gridTemplateRows: "auto repeat(6, minmax(0, 1fr))",
          rowGap: 8,
        }}
      >
        {/* Row 1 — left header */}
        <div style={{ gridColumn: 1, gridRow: 1, position: "relative", zIndex: 50 }}>
          <div>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
              <div style={{ width: "fit-content" }}>
                <span
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: 10,
                    letterSpacing: "0.22em",
                    color: "var(--copper-400)",
                    textTransform: "uppercase",
                  }}
                >
                  The Spine · 6 elements
                </span>
                <div style={{ height: 8 }} />
                <CopperRule on width="100%" />
              </div>
              {stepIndex === 0 && <HintIcon />}
            </div>
            <div style={{ height: 14 }} />
          </div>
        </div>

        {/* Row 1 — right header (hidden on step 0) */}
        <div style={{ gridColumn: 3, gridRow: 1 }}>
          <div style={{ visibility: stepIndex === 0 ? "hidden" : "visible" }}>
            <span
              style={{
                fontFamily: "var(--mono)",
                fontSize: 10,
                letterSpacing: "0.22em",
                color: "var(--copper-400)",
                textTransform: "uppercase",
              }}
            >
              {stepIndex === 0
                ? "The Spine · placeholder"
                : `Mnemonics · ${C.frameworks.length} framings`}
            </span>
            <div style={{ height: 8 }} />
            <CopperRule on={stepIndex === 0 ? true : showFrameworks} width="40%" />
            <div style={{ height: 14 }} />
          </div>
        </div>

        {/* Rows 2–7, col 1 — spine cards. */}
        {C.spine.map((s, i) => {
          const isLit = lit.has(s.num);
          // Pin and hover drive the visual independently: while one spine is
          // pinned, hovering another still highlights the hovered one.
          const isHovered = stepIndex === 0 && hoverSpine === s.id;
          const isPinned = stepIndex === 0 && pinnedSpine === s.id;
          const isActive = isHovered || isPinned;
          const active = isLit || isActive;
          return (
            <Reveal
              key={s.id}
              on={showSpine}
              delay={120 + i * 80}
              style={{ gridColumn: 1, gridRow: i + 2, display: "flex" }}
            >
              <div
                data-testid={`spine-card-${s.id}`}
                data-active={active ? "true" : "false"}
                {...(stepIndex === 0 ? { "data-no-advance": "" } : {})}
                onMouseEnter={() => setHoverSpine(s.id)}
                onMouseLeave={() => setHoverSpine(null)}
                onClick={
                  stepIndex === 0
                    ? () =>
                        setPinnedSpine((cur) => (cur === s.id ? null : s.id))
                    : undefined
                }
                style={{
                  position: "relative",
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "10px 14px",
                  border: `1px solid ${active ? "var(--copper-200)" : "var(--copper-800)"}`,
                  background: active ? "rgba(217,158,108,0.08)" : "transparent",
                  transition: "all 0.2s var(--ease)",
                  cursor: stepIndex === 0 ? "pointer" : "default",
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
                    fontFamily: "var(--display)",
                    fontSize: 22,
                    color: active ? "var(--copper-200)" : "var(--copper-500)",
                    minWidth: 24,
                    lineHeight: 1,
                  }}
                >
                  {s.num}
                </span>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: 12,
                      letterSpacing: "0.18em",
                      color: active ? "var(--copper-100)" : "var(--neutral-100)",
                      textTransform: "uppercase",
                    }}
                  >
                    {s.name}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--serif)",
                      fontStyle: "italic",
                      fontSize: 13,
                      color: "var(--neutral-400)",
                      marginTop: 2,
                    }}
                  >
                    {s.essence}
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}

        {/* Right column — popover (step 0, hover) or framework grid (≥1). */}
        {stepIndex === 0 && popSpine && (
          <div
            data-testid="e3-popover-slot"
            style={{
              gridColumn: 3,
              gridRow: "2 / span 6",
              display: "flex",
              minHeight: 0,
            }}
          >
            <SpinePopover entry={popSpine} />
          </div>
        )}

        {stepIndex >= 1 && (
          <div
            data-testid="e3-framework-grid"
            {...(stepIndex === 1 ? { "data-no-advance": "" } : {})}
            style={{
              gridColumn: 3,
              gridRow: showFooter ? "2 / span 5" : "2 / span 6",
              display: "flex",
              minHeight: 0,
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gridTemplateRows: "repeat(5, 1fr)",
                gap: 10,
                height: "100%",
                width: "100%",
              }}
            >
              {C.frameworks.map((f, i) => {
                // Pin and hover drive the visual independently — same idiom
                // as the spine cards above. The `lit` set on the left uses
                // `activeFw` (pinned ?? hovered) so a pin keeps the spine
                // highlight stable while you explore other tiles.
                const isHovered = hoverFw === f.id;
                const isPinned = pinnedFw === f.id && stepIndex === 1;
                const isActive = isHovered || isPinned;
                return (
                  <Reveal
                    key={f.id}
                    on={showFrameworks}
                    delay={i * 50}
                    style={{ display: "flex" }}
                  >
                    <div
                      data-testid={`framework-tile-${f.id}`}
                      data-hovered={isActive ? "true" : "false"}
                      onMouseEnter={() => setHoverFw(f.id)}
                      onMouseLeave={() => setHoverFw(null)}
                      onClick={
                        stepIndex === 1
                          ? () =>
                              setPinnedFw((cur) =>
                                cur === f.id ? null : f.id,
                              )
                          : undefined
                      }
                      style={{
                        position: "relative",
                        flex: 1,
                        padding: "10px 14px",
                        border: `1px solid ${isActive ? "var(--copper-300)" : "var(--copper-800)"}`,
                        background: isActive
                          ? "rgba(184,110,61,0.08)"
                          : "rgba(10,10,10,0.5)",
                        transition: "all 0.2s var(--ease)",
                        cursor: stepIndex === 1 ? "pointer" : "default",
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
                          <LucideIcon
                            name="Pin"
                            size={11}
                            color="currentColor"
                          />
                        </span>
                      )}
                      <div
                        style={{
                          fontFamily: "var(--display)",
                          fontSize: 22,
                          color: "var(--neutral-50)",
                          lineHeight: 1,
                          marginBottom: 4,
                        }}
                      >
                        {f.acronym}
                      </div>
                      <div
                        style={{
                          fontFamily: "var(--mono)",
                          fontSize: 9,
                          letterSpacing: "0.1em",
                          color: "var(--neutral-400)",
                          textTransform: "uppercase",
                          lineHeight: 1.3,
                        }}
                      >
                        {f.breakdown}
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        )}

        {showFooter && (
          <Reveal
            on={showFooter}
            data-testid="e3-footer"
            style={{
              gridColumn: 3,
              gridRow: 7,
              display: "flex",
              alignItems: "flex-end",
            }}
          >
            <p
              style={{
                fontFamily: "var(--serif)",
                fontStyle: "italic",
                fontSize: 14,
                color: "var(--neutral-400)",
                margin: 0,
              }}
            >
              {highlight(C.footer, C.footerKw)} Hover any acronym to light up
              the matching spine elements.
            </p>
          </Reveal>
        )}
      </div>
    </>
  );
}

// ───────────────────── SpinePopover (step 0 hover) ─────────────────────
//
// Rich-content popover that mirrors the spine column on the right. Renders
// the spine entry's `pop` payload — `desc`, optional `pattern`, an array of
// `rows[]{label, items}`, and an optional `note` footer.
//
// Inlined here per the new pattern: only E.3 uses this layout, so it lives
// alongside the slide rather than being promoted to its own file.
interface SpinePopoverProps {
  entry: SpineEntry;
}

function SpinePopover({ entry }: SpinePopoverProps) {
  const popoverStyle: CSSProperties = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    border: "1px solid var(--copper-300)",
    background: "rgba(20,12,6,0.85)",
    boxShadow: "0 0 0 1px rgba(217,158,108,0.18) inset",
    padding: "24px 28px",
    transition: "all 0.2s var(--ease)",
  };

  return (
    <div data-testid={`spine-popover-${entry.id}`} style={popoverStyle}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
        <span
          style={{
            fontFamily: "var(--display)",
            fontSize: 56,
            color: "var(--copper-200)",
            lineHeight: 0.9,
          }}
        >
          {entry.num}
        </span>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              fontFamily: "var(--mono)",
              fontSize: 11,
              letterSpacing: "0.22em",
              color: "var(--copper-400)",
              textTransform: "uppercase",
            }}
          >
            {entry.name}
          </span>
          <span
            style={{
              fontFamily: "var(--serif)",
              fontStyle: "italic",
              fontSize: 16,
              color: "var(--neutral-300)",
            }}
          >
            {entry.essence}
          </span>
        </div>
      </div>

      <div style={{ height: 10 }} />
      <CopperRule on width="30%" />
      <div style={{ height: 16 }} />

      <p
        style={{
          fontFamily: "var(--serif)",
          fontSize: 18,
          color: "var(--neutral-100)",
          margin: 0,
          lineHeight: 1.45,
        }}
      >
        {entry.pop.desc}
      </p>

      {"pattern" in entry.pop && entry.pop.pattern && (
        <>
          <div style={{ height: 14 }} />
          <div
            style={{
              fontFamily: "var(--mono)",
              fontSize: 13,
              color: "var(--copper-200)",
              padding: "10px 14px",
              border: "1px solid var(--copper-700)",
              background: "rgba(0,0,0,0.45)",
              lineHeight: 1.45,
            }}
          >
            {entry.pop.pattern}
          </div>
        </>
      )}

      <div style={{ height: 16 }} />

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {entry.pop.rows.map((r) => (
          <div key={r.label}>
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
              {r.label}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {r.items.map((it) => (
                <span
                  key={it}
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: 12,
                    color: "var(--neutral-100)",
                    padding: "4px 10px",
                    border: "1px solid var(--copper-800)",
                    background: "rgba(10,10,10,0.55)",
                  }}
                >
                  {it}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={{ flex: 1 }} />

      {"note" in entry.pop && entry.pop.note && (
        <p
          style={{
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontSize: 13,
            color: "var(--neutral-400)",
            margin: "14px 0 0 0",
            borderTop: "1px solid var(--copper-800)",
            paddingTop: 12,
          }}
        >
          {entry.pop.note}
        </p>
      )}
    </div>
  );
}

// ───────────────────── slide def ─────────────────────

export const e3Slide: SlideDef = {
  steps: 3,
  canonicalPose: 2,
  animationMode: "step-reveal",
  surface: "dark",
  section: "E",
  render: () => <E3PromptStructure />,
};
