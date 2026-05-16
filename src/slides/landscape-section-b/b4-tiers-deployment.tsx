// B.4 — MODELS BY CATEGORY · FRONTIER vs OPEN-WEIGHT
//
// Two-column composition matching B.2 / B.3:
//   ┌─ FIG · slide-headline ───────────────────────────────────────────┐
//   │ ┌─ SIX CATEGORIES (left) ─┐  ┌─ (right) ───────────────────────┐ │
//   │ │  [icon] LABEL           │  │ step 0: section box appears     │ │
//   │ │   essence (italic)      │  │   ONLY while a card is hovered  │ │
//   │ │  ... ×6 cards           │  │ step 1: bare qualitative matrix │ │
//   │ │                         │  │   (no border, no fill)          │ │
//   │ │                         │  │                                 │ │
//   │ │   footer · italic caption                                    │ │
//   └──────────────────────────────────────────────────────────────────┘
//
// Step map (2 stepIndex slots; canonical pose = 1):
//   stepIndex 0:   Left cards staggered in top→bottom. Right side is fully
//                  empty by default; hovering a card mounts the bordered
//                  section box with the matching `B4ModelDetailPanel`.
//                  Leaving the card unmounts the box again.
//                  Footer is hidden.
//   stepIndex 1:   Right side renders the qualitative summary BARE — no
//                  border, no copper-700 fill. Cards still highlight on
//                  hover but DO NOT drive the right pane. Footer fades in.

import { useState } from "react";
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { HintIcon } from "@/components/HintIcon";
import { highlight as KW } from "@/components/highlight";
import { Reveal } from "../foundation-core-section-e/components/Reveal";
import { B4CategoryList } from "./components/B4CategoryCard";
import { B4ModelDetailPanel } from "./components/B4ModelDetailPanel";
import { B4QualitativeSummary } from "./components/B4QualitativeSummary";
import { b4Content as C, type B4CategoryId } from "./content";

const STAGE_W = 1280;
const STAGE_H = 720;

const H = 48;                  // shared left/right edge
const BODY_TOP = 155;
const SECTION_TITLE_GAP = 18;
// Right column uses a tighter gap so its content top visually aligns with
// the first left card's top border.
const RIGHT_SECTION_TITLE_GAP = 10;
// Footer band sits at bottom: 50 → 14px tall caption → ~64. Give the columns
// a 16px breathing space above the band.
const COLS_BOTTOM = 100;

const LEFT_COL_W = 520;
const RIGHT_COL_LEFT = STAGE_W - H - 620; // 612 — leaves 612px right column
const RIGHT_COL_W = STAGE_W - H - RIGHT_COL_LEFT; // 620

// ───────────────────── slide ─────────────────────

export function B4ModelsByCategory() {
  const { stepIndex } = useDeck();

  const showCards = stepIndex >= 0;
  const isSummary = stepIndex >= 1;
  const showFooter = stepIndex >= 1;

  const [hoveredId, setHoveredId] = useState<B4CategoryId | null>(null);
  const [pinnedId, setPinnedId] = useState<B4CategoryId | null>(null);

  // `activeId` drives the card *hover* visual ONLY — it always reflects the
  // raw `hoveredId`. The card's `pinned` visual comes from the separate
  // `pinnedId` prop. This split means that while card A is pinned, hovering
  // card B still highlights B (A keeps its pin styling).
  // `effectiveId = pinned ?? hovered` drives the right pane content.
  const effectiveId: B4CategoryId | null = pinnedId ?? hoveredId;
  const activeId: B4CategoryId | null = hoveredId;
  const showDetailBox = !isSummary && effectiveId !== null;

  return (
    <div
      data-testid="slide-b4"
      style={{
        position: "absolute",
        inset: 0,
        width: STAGE_W,
        height: STAGE_H,
        overflow: "hidden",
      }}
    >
      {/* Background — neutral-950 + faint dot-grid (matches B.1/B.2/B.3). */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background: "var(--neutral-950)",
          zIndex: 0,
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.05,
          backgroundImage:
            "radial-gradient(rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          zIndex: 1,
        }}
      />

      <FigLabel section="B" num={4} label={C.figLabel} />

      <div className="slide-headline-row">
        <h1 className="slide-headline small">
          {KW(C.slideTitle, C.slideTitleKw)}
        </h1>
      </div>

      {/* ── LEFT COLUMN · Six category cards ──────────────────────────── */}
      {/* `data-no-advance` is applied ONLY on step 0, where card clicks
          mean "toggle pin". On step 1 it's removed so clicking a card
          advances the deck normally (the qualitative summary is static,
          no pin needed). */}
      <div
        data-testid="b4-left-column"
        {...(stepIndex === 0 ? { "data-no-advance": "" } : {})}
        style={{
          position: "absolute",
          left: H,
          top: BODY_TOP,
          width: LEFT_COL_W,
          bottom: COLS_BOTTOM,
          zIndex: 5,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Reveal
          on={showCards}
          data-testid="b4-left-title"
          style={{ position: "relative", zIndex: 50 }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: 10,
            }}
          >
            <SectionTitle label={C.leftSectionTitle} />
            {stepIndex === 0 && <HintIcon />}
          </div>
        </Reveal>
        <div style={{ height: SECTION_TITLE_GAP }} />

        <B4CategoryList
          categories={C.categories}
          activeId={activeId}
          pinnedId={isSummary ? null : pinnedId}
          onHover={setHoveredId}
          onClick={
            isSummary
              ? undefined
              : (id) => setPinnedId((cur) => (cur === id ? null : id))
          }
          showCards={showCards}
        />
      </div>

      {/* ── RIGHT COLUMN · invisible-placeholder header so the content
          envelope shares the LEFT column's vertical rhythm exactly (Task 18).
          The placeholder mirrors the SectionTitle + 18px gap on the left so
          the right-side content top aligns with the first card top without
          any hand-tuned offsets. */}
      <div
        data-testid="b4-right-column"
        style={{
          position: "absolute",
          left: RIGHT_COL_LEFT,
          top: BODY_TOP,
          width: RIGHT_COL_W,
          bottom: COLS_BOTTOM,
          zIndex: 6,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Section title — visible only at step 1 (the qualitative summary
            pose). At step 0 the same SectionTitle renders invisibly so the
            right content top stays vertically aligned with the first left
            card's top border. */}
        <div
          style={{ visibility: isSummary ? "visible" : "hidden" }}
          aria-hidden={!isSummary}
        >
          <SectionTitle
            label={isSummary ? C.qualitativeSummary.header : C.leftSectionTitle}
          />
        </div>
        <div style={{ height: RIGHT_SECTION_TITLE_GAP }} />

        <div
          data-testid="b4-right-content"
          style={{
            flex: 1,
            position: "relative",
          }}
        >
          {/* Qualitative summary (step 1) — rendered BARE, no border/fill.
              Lives behind the detail box so transitions cross-fade cleanly. */}
          <PaneLayer visible={isSummary} delayIn={80} padded={false}>
            {isSummary ? (
              <B4QualitativeSummary
                key="qsum"
                data={C.qualitativeSummary}
                freshness={C.freshness}
              />
            ) : null}
          </PaneLayer>

          {/* Detail box (step 0) — copper-bordered section box wraps the
              detail panel and only mounts while a card is hovered. */}
          <PaneLayer visible={showDetailBox} delayIn={50} padded={false}>
            {showDetailBox ? (
              <div
                data-testid="b4-section-box"
                style={{
                  width: "100%",
                  height: "100%",
                  border: "1px solid var(--copper-700)",
                  background: "rgba(10,10,10,0.6)",
                  boxSizing: "border-box",
                  padding: 20,
                  overflow: "hidden",
                }}
              >
                <B4ModelDetailPanel key={effectiveId!} categoryId={effectiveId!} />
              </div>
            ) : null}
          </PaneLayer>
        </div>
      </div>

      {/* ── FOOTER BAND ─ caption-only; freshness lives inside the
          qualitative summary panel. ───────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          left: H,
          right: H,
          bottom: 50,
          zIndex: 7,
        }}
      >
        <p
          data-testid="b4-footer-caption"
          style={{
            margin: 0,
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontSize: 14,
            color: "var(--neutral-400)",
            lineHeight: 1.4,
            opacity: showFooter ? 1 : 0,
            transform: showFooter ? "translateY(0)" : "translateY(6px)",
            transition:
              "opacity 500ms var(--ease), transform 500ms var(--ease)",
            maxWidth: 760,
          }}
        >
          {KW(C.footer, C.footerKw)}
        </p>
      </div>
    </div>
  );
}

// ───────────────────── Section title (A.1 / B.3 convention) ─────────────────────

function SectionTitle({ label }: { label: string }) {
  return (
    <div
      style={{
        width: "fit-content",
        borderBottom: "1px solid var(--copper-700)",
        paddingBottom: 5,
        fontFamily: "var(--mono)",
        fontSize: 11,
        letterSpacing: "0.22em",
        color: "var(--copper-500)",
        textTransform: "uppercase",
        lineHeight: 1.2,
      }}
    >
      {label}
    </div>
  );
}

// ───────────────────── PaneLayer — cross-fade wrapper ─────────────────────

function PaneLayer({
  visible,
  delayIn,
  padded = true,
  children,
}: {
  visible: boolean;
  delayIn?: number;
  /** When false, the layer omits its 20px inner padding (used for layers
   *  that own their own padded wrapper — see the detail section box). */
  padded?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        padding: padded ? 20 : 0,
        boxSizing: "border-box",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(6px)",
        transition: `opacity 300ms var(--ease) ${
          visible ? delayIn ?? 0 : 0
        }ms, transform 300ms var(--ease) ${visible ? delayIn ?? 0 : 0}ms`,
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      {children}
    </div>
  );
}

// ───────────────────── slide def ─────────────────────

export const b4Slide: SlideDef = {
  steps: 2,
  canonicalPose: 1,
  animationMode: "step-reveal",
  surface: "dark",
  section: "B",
  render: () => <B4ModelsByCategory />,
};
