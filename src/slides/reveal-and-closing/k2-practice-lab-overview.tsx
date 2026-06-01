// K.2 — THE PRACTICE LAB (overview of the hands-on lab)
//
// Answers "what does the Practice Lab give you?": a left spine of four parts
// (Case · Tracks · Stages · Outputs); hovering or pinning a card reveals its
// detail in the full-height right-hand popover. Layout mirrors E.5's
// stepIndex-0 grid (left card list in a single flex cell + right popover that
// spans the full content height, so the dense Outputs detail never overflows).
//
// 2 steps:
//   0 — interactive card list + detail popover
//   1 — footer caption reveals bottom-left (E.4/E.5 pattern)
//
// PIN-WINS semantics (deck convention, same as E3/E4/E5): the pin LOCKS the
// right panel — once a part is pinned, hovering other cards does not change the
// detail; it retains the pinned part until unpinned (click again). With nothing
// pinned, hover drives the preview. Hence `pinnedPart ?? hoverPart`.
//
// Reveal / CopperRule are the shared T10 reveal primitives from Section E.
import { useState } from "react";
import type { CSSProperties } from "react";
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { HintIcon } from "@/components/HintIcon";
import { highlight } from "@/components/highlight";
import { Reveal, CopperRule } from "../foundation-core-section-e/components/Reveal";
import { LucideIcon } from "../foundation-core-section-e/components/LucideIcon";
import { k2Content as C } from "./content";

// ───────────────────── slide ─────────────────────

type LabPart = (typeof C.spine)[number];

export function K2PracticeLabOverview() {
  const { stepIndex } = useDeck();
  const [hoverPart, setHoverPart] = useState<string | null>(null);
  const [pinnedPart, setPinnedPart] = useState<string | null>(null);

  // Pin wins: a pinned part stays in the right panel regardless of hover, until
  // it is unpinned. Nothing pinned on arrival → empty until first interaction.
  const activePart = pinnedPart ?? hoverPart;
  const popPart: LabPart | null = activePart
    ? C.spine.find((s) => s.id === activePart) ?? null
    : null;

  const showFooter = stepIndex >= 1;

  return (
    <>
      <FigLabel section="K" num={2} label={C.figLabel} />

      <div className="slide-headline-row">
        <h1 className="slide-headline small">
          {highlight(C.headline, [...C.headlineKw])}
        </h1>
      </div>

      {/*
        Two-column grid (mirrors E.5's stepIndex-0 layout):
          col 1, row 1 — section label + hint
          col 1, row 2 — the four parts (flex column)
          col 3        — detail popover spanning the full content height
        Grid bottom is 92 (not 80) to clear the step-1 footer at bottom:50.
      */}
      <div
        data-testid="k2-grid"
        style={{
          position: "absolute",
          left: 48,
          right: 48,
          top: 156,
          bottom: 92,
          display: "grid",
          gridTemplateColumns: "470px 32px minmax(0, 1fr)",
          gridTemplateRows: "auto minmax(0, 1fr)",
          rowGap: 12,
          columnGap: 0,
        }}
      >
        {/* Col 1, row 1 — section label + hint */}
        <div style={{ gridColumn: 1, gridRow: 1, position: "relative", zIndex: 50 }}>
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
                {C.leftHeader}
              </span>
              <div style={{ height: 8 }} />
              <CopperRule on width="100%" />
            </div>
            <HintIcon />
          </div>
        </div>

        {/* Col 1, row 2 — the four parts. */}
        <div
          style={{
            gridColumn: 1,
            gridRow: 2,
            display: "flex",
            flexDirection: "column",
            gap: 10,
            minHeight: 0,
          }}
        >
          {C.spine.map((s, i) => {
            // Hover lights the card border even when another part is pinned, but
            // the right panel still follows the pin (pinned ?? hover above).
            const isHovered = hoverPart === s.id;
            const isPinned = pinnedPart === s.id;
            const active = isHovered || isPinned;
            return (
              <Reveal
                key={s.id}
                on={stepIndex >= 0}
                delay={120 + i * 80}
                style={{ display: "flex", flex: 1, minHeight: 0 }}
              >
                <div
                  data-testid={`k2-part-${s.id}`}
                  data-active={active ? "true" : "false"}
                  data-no-advance=""
                  onMouseEnter={() => setHoverPart(s.id)}
                  onMouseLeave={() => setHoverPart(null)}
                  onClick={() =>
                    setPinnedPart((cur) => (cur === s.id ? null : s.id))
                  }
                  style={{
                    position: "relative",
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    padding: "10px 16px",
                    border: `1px solid ${active ? "var(--copper-200)" : "var(--copper-800)"}`,
                    background: active ? "rgba(217,158,108,0.08)" : "transparent",
                    boxShadow: active ? "0 0 18px rgba(217,158,108,0.18)" : "none",
                    transition: "all 0.2s var(--ease)",
                    cursor: "pointer",
                  }}
                >
                  {isPinned && (
                    <span
                      aria-label="pinned"
                      style={{
                        position: "absolute",
                        top: 6,
                        right: 8,
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
        </div>

        {/* Col 3, rows 1–2 — detail popover, full content height. */}
        {popPart && (
          <div
            data-testid="k2-popover-slot"
            style={{
              gridColumn: 3,
              gridRow: "1 / span 2",
              display: "flex",
              minHeight: 0,
            }}
          >
            <LabPartPopover entry={popPart} />
          </div>
        )}
      </div>

      {/* Footer — revealed on step 1, bottom-left of the stage (E.4/E.5 pattern,
          no box). Stage-level sibling so it doesn't disturb the grid. */}
      {showFooter && (
        <Reveal
          on={showFooter}
          data-testid="k2-footer"
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
            {highlight(C.footer, [...C.footerKw])}
          </p>
        </Reveal>
      )}
    </>
  );
}

// ───────────────────── LabPartPopover (hover / pin detail) ─────────────────────
//
// Rich-content popover mirroring the spine column on the right. Renders the
// part's `pop` payload — `desc` (keyword-highlighted via `descKw`) plus an
// array of `rows[]{label, items, links?}`. Only the Two Tracks rows carry
// `links` (each persona's runbook + Drive folders), rendered as a row of
// clickable LinkChips beneath that row's skill chips.
// Compact vertical rhythm so the densest part (Outputs · 5 rows) fits the
// full-height slot without overflow. Inlined here (like E.3/E.5) — only K.2
// uses this layout.
function LabPartPopover({ entry }: { entry: LabPart }) {
  const popoverStyle: CSSProperties = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    border: "1px solid var(--copper-300)",
    background: "rgba(20,12,6,0.85)",
    boxShadow: "0 0 0 1px rgba(217,158,108,0.18) inset",
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 28,
    paddingRight: 28,
    minHeight: 0,
    overflow: "hidden",
  };

  return (
    <div data-testid={`k2-popover-${entry.id}`} style={popoverStyle}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
        <span
          style={{
            fontFamily: "var(--display)",
            fontSize: 52,
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
      <div style={{ height: 14 }} />

      <p
        style={{
          fontFamily: "var(--serif)",
          fontSize: 16,
          color: "var(--neutral-100)",
          margin: 0,
          lineHeight: 1.4,
        }}
      >
        {highlight(entry.pop.desc, [...entry.pop.descKw])}
      </p>

      <div style={{ height: 16 }} />

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {entry.pop.rows.map((r) => (
          <div key={r.label}>
            <div
              style={{
                fontFamily: "var(--mono)",
                fontSize: 10,
                letterSpacing: "0.22em",
                color: "var(--copper-400)",
                textTransform: "uppercase",
                marginBottom: 5,
              }}
            >
              {r.label}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {r.items.map((it) => (
                <Chip key={it} text={it} />
              ))}
            </div>
            {/* Resource links (only the Two Tracks persona rows carry these). */}
            {"links" in r && r.links.length > 0 && (
              <div
                style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 6 }}
              >
                {r.links.map((l) => (
                  <LinkChip key={l.href} label={l.label} href={l.href} />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{ flex: 1 }} />
    </div>
  );
}

// ───────────────────── Chip (hover-lit tag) ─────────────────────
//
// A popover tag that lights on hover, reusing E5's lit-pill palette so the
// affordance reads identically across the deck. Self-contained hover state —
// only the hovered chip lights.
function Chip({ text }: { text: string }) {
  const [hover, setHover] = useState(false);
  return (
    <span
      data-testid="k2-chip"
      data-lit={hover ? "true" : "false"}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        fontFamily: "var(--mono)",
        fontSize: 12,
        color: hover ? "var(--copper-100)" : "var(--neutral-100)",
        padding: "4px 10px",
        border: `1px solid ${hover ? "var(--copper-200)" : "var(--copper-800)"}`,
        background: hover ? "rgba(217,158,108,0.16)" : "rgba(10,10,10,0.55)",
        boxShadow: hover ? "0 0 14px rgba(217,158,108,0.3)" : "none",
        transition: "all 0.18s var(--ease)",
        cursor: "default",
      }}
    >
      {text}
    </span>
  );
}

// ───────────────────── LinkChip (external resource link) ─────────────────────
//
// A clickable variant of Chip for the Two Tracks materials (runbooks + Drive
// folders). Rendered as a real <a> so Slide.tsx's click-to-advance handler
// skips it (it excludes `a`), and opened in a new tab. Copper-toned text +
// trailing ↗ icon distinguish it from the neutral, non-interactive skill chips.
// Usable once the card is pinned — hovering alone closes the popover on leave.
function LinkChip({ label, href }: { label: string; href: string }) {
  const [hover, setHover] = useState(false);
  return (
    <a
      data-testid="k2-linkchip"
      data-lit={hover ? "true" : "false"}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        fontFamily: "var(--mono)",
        fontSize: 12,
        color: hover ? "var(--copper-100)" : "var(--copper-300)",
        textDecoration: "none",
        padding: "4px 10px",
        border: `1px solid ${hover ? "var(--copper-200)" : "var(--copper-700)"}`,
        background: hover ? "rgba(217,158,108,0.16)" : "rgba(10,10,10,0.55)",
        boxShadow: hover ? "0 0 14px rgba(217,158,108,0.3)" : "none",
        transition: "all 0.18s var(--ease)",
        cursor: "pointer",
      }}
    >
      {label}
      <LucideIcon name="ArrowUpRight" size={12} color="currentColor" />
    </a>
  );
}

// ───────────────────── slide def ─────────────────────

export const k2Slide: SlideDef = {
  steps: 2,
  canonicalPose: 1,
  animationMode: "step-reveal",
  surface: "dark",
  section: "K",
  render: () => <K2PracticeLabOverview />,
};
