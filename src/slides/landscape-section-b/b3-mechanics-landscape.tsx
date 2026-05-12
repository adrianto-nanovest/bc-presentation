// B.3 — HOW LLMs WORK · THE PIPELINE AND ITS DIALS
//
// Layout: 50:50 split below the header.
//   ┌─ FIG · slide-headline ───────────────────────────────────────────┐
//   │ ┌─ Pipeline column (595w) ─┐  ┌─ MODEL PARAMETERS (595w) ─────┐ │
//   │ │ RAW INPUT                │  │  [EFFORT] [MAX TOK] [CTX WIN] │ │
//   │ │ token→flow→attend→bars   │  │  [TEMP]   [TOP-P]   [SYS PR]  │ │
//   │ │ PREDICTED NEXT WORD      │  │                                │ │
//   │ └──────────────────────────┘  └────────────────────────────────┘ │
//   │   footer · bottom-left, small italic                              │
//   └──────────────────────────────────────────────────────────────────┘
//
// Step map (stepIndex 0 = first Space press):
//   load (on mount):    FIG label fades in. Both columns empty.
//   stepIndex 0:        Pipeline column reveals (its internal build-up + loop).
//   stepIndex 1:        3×2 tile grid reveals — 80ms row-major stagger.
//   stepIndex 2:        Footer caption fades in italic with copper-300 KW.

import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { highlight as KW } from "@/components/highlight";
import { Reveal } from "../foundation-core-section-e/components/Reveal";
import { B3Pipeline } from "./components/B3Pipeline";
import { B3ParamTile } from "./components/B3ParamTile";
import {
  EffortAnim,
  MaxTokensAnim,
  ContextWindowAnim,
  TemperatureAnim,
  TopPAnim,
  SystemPromptAnim,
} from "./components/B3ParamAnims";
import { b3Content as C } from "./content";

const STAGE_W = 1280;
const STAGE_H = 720;

// Body envelope under the header (FIG + slide headline occupy ~y 0–155).
// Section titles sit at y=BODY_TOP, ~50px below the headline.
const BODY_TOP = 155;
const BODY_BOT = 640;
// H = effective left edge of `.slide-headline-row` (CSS: left: 48px). Both
// columns anchor here so the section titles, RAW INPUT label, TOKENIZE
// column, and PREDICTED NEXT WORD box all share the slide's left-edge
// rhythm — visually rhyming with the FIG label and slide headline above.
const H = 48;
const COL_W = 580;
const COL_H = BODY_BOT - BODY_TOP; // 485
//
// Column layout math: 48 (H) + 580 (left col) + 24 (mid gutter) +
// 580 (right col) + 48 (H) = 1280. Clean 24px gutter between columns; no
// overlap. Mirrors the `.slide-headline-row` left/right padding.

// Section-title block sits at y=BODY_TOP. Its full height (text + 6px gap +
// 1px copper rule + 18px breathing room below) is ~40px → content envelope
// runs from BODY_TOP + 40 = 170 down to BODY_BOT = 640 (470px tall).
//
// Fix #14.1: Right-column grid's first tile top must visually align with the
// LEFT column's first BOX top (not the RAW INPUT label top). The RAW INPUT
// label is 16px tall + 6px gap, so the box top sits 22px below where the
// section-title block ends on the left. To make the right grid match, we
// push the right grid down by 20px (gap 14 → 34) AND shrink each tile by
// 10px (215 → 205) so the grid still bottoms out at y=BODY_BOT.
//   Math: 28 (section title) + 34 (gap) + 205 + 13 (row-gap) + 205 = 485 ✓
const SECTION_TITLE_GAP = 18;
const RIGHT_GRID_TITLE_GAP = 39;

// Map param-tile ids → animation components. Order matches `paramTiles`
// content order: effort, max-tok, context, temp, top-p, sys-prompt.
function animFor(id: string) {
  switch (id) {
    case "effort":     return <EffortAnim />;
    case "max-tok":    return <MaxTokensAnim />;
    case "context":    return <ContextWindowAnim />;
    case "temp":       return <TemperatureAnim />;
    case "top-p":      return <TopPAnim />;
    case "sys-prompt": return <SystemPromptAnim />;
    default:           return null;
  }
}

export function B3MechanicsLandscape() {
  const { stepIndex } = useDeck();

  const pipelineOn = stepIndex >= 0;
  const tilesOn = stepIndex >= 1;
  const footerOn = stepIndex >= 2;

  return (
    <div
      data-testid="slide-b3"
      style={{
        position: "absolute",
        inset: 0,
        width: STAGE_W,
        height: STAGE_H,
        overflow: "hidden",
      }}
    >
      {/* Background — neutral-950 base + subtle dot grid (deck convention). */}
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

      <FigLabel section="B" num={3} label={C.figLabel} />

      <div className="slide-headline-row">
        <h1 className="slide-headline small">
          {KW(C.slideTitle, C.slideTitleKw)}
        </h1>
      </div>

      {/* ── LEFT COLUMN · Pipeline ─────────────────────────────────── */}
      <div
        data-testid="b3-pipeline-column"
        style={{
          position: "absolute",
          left: H,
          top: BODY_TOP,
          width: COL_W,
          height: COL_H,
          zIndex: 5,
          display: "flex",
          flexDirection: "column",
          opacity: pipelineOn ? 1 : 0,
          transition: "opacity 400ms var(--ease)",
        }}
      >
        {/* Section title — A.1 convention (mono-caps + copper rule the
            width of the text). Sits at y=BODY_TOP, paired with the right
            column's title at the same y for visual symmetry. */}
        <Reveal on={pipelineOn} data-testid="b3-pipeline-title">
          <SectionTitle label={C.leftSectionTitle} />
        </Reveal>
        <div style={{ height: SECTION_TITLE_GAP }} />

        {/* Pipeline fills the remaining vertical space. The ~438px pipeline
            content (66 + 10 + 290 + 6 + 66) fits inside the ~445px content
            envelope (BODY_TOP + ~40 title → BODY_BOT), so the PREDICTED
            NEXT WORD box bottoms out near y≈640 matching the right column. */}
        <B3Pipeline mounted={pipelineOn} />
      </div>

      {/* ── RIGHT COLUMN · Model Parameters grid ─────────────────────
          Same top/bottom as the left column (BODY_TOP → BODY_BOT). The
          3×2 grid is positioned to bottom-out at y=BODY_BOT so the two
          columns visually end at the same y. */}
      <div
        data-testid="b3-params-column"
        style={{
          position: "absolute",
          right: H,
          top: BODY_TOP,
          width: COL_W,
          height: COL_H,
          display: "flex",
          flexDirection: "column",
          zIndex: 6,
        }}
      >
        {/* Section title — A.1 convention, same y as the left column title. */}
        <Reveal on={tilesOn} data-testid="b3-params-title">
          <SectionTitle label={C.rightSectionTitle} />
        </Reveal>
        <div style={{ height: RIGHT_GRID_TITLE_GAP }} />

        {/* 3×2 tile grid — top-aligned 20px lower than before so the first
            tile's top edge lines up with the LEFT column's RAW INPUT BOX top
            (Fix #14.1). Grid footprint: 3×180 + 2×10 = 560 wide (20px slack
            on the right), 2×205 + 13 = 423 tall. Combined with the 28px
            section title block + 34px gap below it = 485, fills the 485px
            content envelope (BODY_TOP → BODY_BOT) exactly.
            `justifyContent: flex-start` puts the first tile at column-local
            x=0 so it shares its left edge with the section title above. */}
        <div
          data-testid="b3-tile-grid"
          style={{
            flex: 1,
            display: "grid",
            gridTemplateColumns: "repeat(3, 180px)",
            gridTemplateRows: "repeat(2, 205px)",
            columnGap: 10,
            rowGap: 13,
            alignContent: "start",
            justifyContent: "flex-start",
          }}
        >
          {C.paramTiles.map((tile, i) => (
            <Reveal
              key={tile.id}
              on={tilesOn}
              delay={i * 80}
              data-testid={`b3-tile-reveal-${tile.id}`}
            >
              <B3ParamTile label={tile.label} bullets={tile.bullets}>
                {animFor(tile.id)}
              </B3ParamTile>
            </Reveal>
          ))}
        </div>
      </div>

      {/* ── FOOTER CAPTION ────────────────────────────────────────────── */}
      <Reveal
        on={footerOn}
        delay={200}
        data-testid="b3-footer-caption"
        style={{
          position: "absolute",
          left: 48,
          bottom: 50,
          right: 48,
          fontFamily: "var(--serif)",
          fontStyle: "italic",
          fontSize: 14,
          color: "var(--neutral-400)",
          lineHeight: 1.4,
          zIndex: 7,
        }}
      >
        {KW(C.footer, C.footerKw)}
      </Reveal>
    </div>
  );
}

// ───────────────────── Section title (A.1 convention) ─────────────────────
//
// Mono-caption ~11px, copper-500, with a 1px copper-700 underline whose width
// equals the text width (achieved via `width: fit-content` + borderBottom).
// Reveal/fade is handled by the surrounding <Reveal> wrapper.
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

// ───────────────────── slide def ─────────────────────

export const b3Slide: SlideDef = {
  // 3 stepIndex values (0..2): pipeline reveal, tiles reveal, footer fade.
  // Pipeline loop runs continuously once revealed — not step-gated past 0.
  steps: 3,
  canonicalPose: 2,
  animationMode: "step-reveal",
  surface: "dark",
  section: "B",
  render: () => <B3MechanicsLandscape />,
};
