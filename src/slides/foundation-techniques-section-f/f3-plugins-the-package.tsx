// F.3 — THE PACKAGE (Plugins overview)
//
// Mirrors the F.2 canonical Section F facet-slide pattern: 2 steps,
// canonical pose 1, hover-only details, right-pane bordered box aligned to
// the FacetMenu's top + bottom edges.
//
// Step axis (2 steps; canonical pose = 1):
//   0 — All 5 facet cards stagger-reveal on the left. Hover is always on.
//       Right pane shows the bordered box framing an empty content area.
//       Hovering any facet card crossfades the matching illustration into
//       the bordered box. Footer hidden.
//   1 — Footer (italic copper-200 caption) fades in below the facet cards.
//       Everything else stays revealed; hover continues to drive details.
//
// Hover states (NONE pre-shown — empty bordered box until hover):
//   ◉ WHAT IT IS    → LayerCake (compact + ribbon, all layers lit) with
//                     row-by-row shimmer + MCPConnectors fan-in with steady
//                     dashed-stroke flow.
//   ◉ WHAT'S INSIDE → cake `mode="exploded"` with forward-pointer labels
//                     (SKILLS→F.4 · HOOKS→F.6 · AGENTS→F.7) and a gently
//                     pulsing "+MCP" adjunct (F.5).
//   ◉ WHY PACKAGE   → install diagram (1 PLUGIN folder → 10×5 laptop grid)
//                     with row-by-row sweep loop on the laptops.
//   ◉ HOW IT LOADS  → 3-step (discover → load → context-budget) sequential
//                     pulse via shared `f-seq-pulse-*` keyframes + token widget.
//   ◉ EXAMPLE       → ASCII file tree for `weekly-report-plugin/` with
//                     row-by-row highlight loop.
import { type CSSProperties, Fragment, type ReactNode, useState } from "react";
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { highlight } from "@/components/highlight";
import { FacetMenu } from "./components/FacetMenu";
import { DetailCanvas } from "./components/DetailCanvas";
import { LayerCake } from "./components/LayerCake";
import {
  MCPConnectors,
  type MCPConnectorItem,
} from "./components/MCPConnectors";
import { LucideIcon } from "./components/LucideIcon";
import { useFacetListBounds } from "./components/useFacetListBounds";
import { f3Content as C } from "./content";

// ───────────────────── shared layout constants (F-section canonical) ─────────────────────
//
// Right pane width — top / bottom are measured at runtime via
// `useFacetListBounds` so the wrapper aligns with the FacetMenu's card stack
// exactly.

const RIGHT_W = 660;

// Map plain connector names → LucideIcon names. The content file carries
// connector names as plain strings; we resolve the icon here so the icon
// vocabulary stays local to F.3's visual decisions.
const CONNECTOR_ICON_BY_NAME: Record<string, string> = {
  Notion: "Library",
  GitHub: "GitBranch",
  Slack: "Share2",
  GDrive: "Folder",
  Mongo: "Globe",
};

function resolveConnectors(names: readonly string[]): MCPConnectorItem[] {
  return names.map((name) => ({
    name,
    icon: CONNECTOR_ICON_BY_NAME[name] ?? "Plug",
  }));
}

// ───────────────────── slide ─────────────────────

export function F3PluginsThePackage() {
  const { stepIndex } = useDeck();

  // CANONICAL Section F step-gate pattern (mirrors F.2):
  //   showCards     = stepIndex >= 0   → all 5 cards stagger-reveal at step 0
  //   hoverEnabled  = stepIndex >= 0   → hover always-on once cards are in
  //   showFooter    = stepIndex >= 1   → footer reveals at canonical pose
  const showCards = stepIndex >= 0;
  const hoverEnabled = stepIndex >= 0;
  const showFooter = stepIndex >= 1;

  const [activeFacet, setActiveFacet] = useState<string | null>(null);
  const effectiveFacet = hoverEnabled ? activeFacet : null;

  const { top: paneTop, bottom: paneBottom } = useFacetListBounds();

  const connectors = resolveConnectors([...C.mcpConnectors]);

  return (
    <>
      <FigLabel section="F" num={3} label="THE PACKAGE" />

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

      {/* RIGHT — transparent popover anchor. Top / bottom match the left
          FacetMenu's card-stack extent exactly (measured at runtime).
          Content centers vertically within that range. */}
      <div
        data-testid="f3-right-pane"
        style={{
          position: "absolute",
          right: 48,
          top: paneTop,
          width: RIGHT_W,
          bottom: paneBottom,
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        {/* Content area — DetailCanvas renders nothing until a facet hover.
            `maxHeight: 100%` constrains popover content to the FacetMenu's
            card-stack vertical bounds. */}
        <div
          style={{
            position: "relative",
            width: "100%",
            maxHeight: "100%",
            height: "100%",
            pointerEvents: "auto",
          }}
        >
          <DetailCanvas
            activeFacet={effectiveFacet}
            states={{
              "what-it-is": <WhatItIsState connectors={connectors} />,
              "whats-inside": <WhatsInsideState />,
              "why-package": <WhyPackageState />,
              "how-it-loads": <HowItLoadsState />,
              example: <ExampleState />,
            }}
          />
        </div>
      </div>
    </>
  );
}

// ───────────────────── shared atoms (mirrors F.2) ─────────────────────
//
// FacetHeader was removed in the popover refactor (Item 1).

// Mono uppercase column title — used at the top of each column block.
function ColumnTitle({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        fontFamily: "var(--mono)",
        fontSize: 10.5,
        letterSpacing: "0.12em",
        color: "var(--copper-200)",
        textTransform: "uppercase",
        lineHeight: 1.2,
      }}
    >
      {children}
    </div>
  );
}

// ───────────────────── WHAT IT IS state ─────────────────────
//
// LayerCake (compact + ribbon, all layers lit) on the left + MCPConnectors
// on the right. Each cake bar shimmers in turn on a 3s loop, and the dashed
// connector strokes get a steady flowing dash via `f-arrow-stream`.

interface WhatItIsStateProps {
  connectors: MCPConnectorItem[];
}

function WhatItIsState({ connectors }: WhatItIsStateProps) {
  return (
    <div
      data-testid="f3-what-it-is"
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "8px 12px",
        gap: 14,
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 40,
          minHeight: 0,
          position: "relative",
        }}
      >
        {/* Wrap the LayerCake so we can apply per-bar shimmer classes via a
            sibling overlay — LayerCake itself doesn't accept className for
            individual bars, so we use a transparent absolutely-positioned
            stack of pulse-only boxes sized to each bar. */}
        <div style={{ position: "relative" }}>
          <LayerCake
            layers={[...C.cakeLayers]}
            ribbon
            lit={[...C.cakeLayers]}
          />
          <CakeShimmerOverlay layers={[...C.cakeLayers]} />
        </div>

        <MCPConnectors logos={connectors} on cakeRightEdge={-32} />
      </div>
    </div>
  );
}

// Transparent pulse-only overlay that sits on top of the rendered LayerCake.
// Each box matches one layer-bar's bounding box and animates its box-shadow
// via the shared `f-cake-shimmer-N` keyframes so the bars appear to shimmer
// in sequence (CLAUDE.md → HOOKS → SKILLS → AGENTS) on a 3s loop.
function CakeShimmerOverlay({ layers }: { layers: string[] }) {
  // Geometry mirrors LayerCake's defaults: 340px wide, 36px tall bars, 2px
  // gap, 22px bottom padding + 32px top padding inside the ribbon. We render
  // the boxes top-down (AGENTS first), inset into the ribbon by 28px on each
  // side.
  const BAR_H = 36;
  const GAP = 2;
  const RIBBON_TOP_PAD = 32;
  const RIBBON_SIDE_PAD = 28;
  const BAR_W = 340;
  // Top → bottom: layers reversed since LayerCake renders in displayOrder.
  const ordered = [...layers].reverse();
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        top: RIBBON_TOP_PAD,
        left: RIBBON_SIDE_PAD,
        width: BAR_W,
        pointerEvents: "none",
        display: "flex",
        flexDirection: "column",
        gap: GAP,
      }}
    >
      {ordered.map((name, i) => (
        <div
          key={name}
          data-testid={`f3-cake-shimmer-${name}`}
          className="f-card-cycle"
          style={{
            height: BAR_H,
            width: BAR_W,
            boxSizing: "border-box",
            borderRadius: 0,
            "--cycle-duration": `${4}s`,
            "--cycle-delay": `${i}s`,
          } as CSSProperties}
        />
      ))}
    </div>
  );
}

// ───────────────────── WHAT'S INSIDE state ─────────────────────
//
// 5-column grid — each column represents one Claude Code primitive that
// plugins package: Skills · Hooks · Agents · MCP · Commands. Each column has
// a title, a 1-word subtitle, and a looping CSS illustration animation that
// symbolically represents the primitive.

interface InsidePrimitive {
  id: string;
  title: string;
  word: string;
  glyph: ReactNode;
}

function WhatsInsideState() {
  const primitives: InsidePrimitive[] = [
    {
      id: "skills",
      title: "Skills",
      word: "brain",
      glyph: <BrainGlyph />,
    },
    {
      id: "hooks",
      title: "Hooks",
      word: "guard",
      glyph: <GuardGlyph />,
    },
    {
      id: "agents",
      title: "Agents",
      word: "worker",
      glyph: <WorkerGlyph />,
    },
    {
      id: "mcp",
      title: "MCP",
      word: "bridge",
      glyph: <BridgeGlyph />,
    },
    {
      id: "commands",
      title: "Commands",
      word: "shortcut",
      glyph: <ShortcutGlyph />,
    },
  ];
  return (
    <div
      data-testid="f3-whats-inside"
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "8px 12px",
        gap: 14,
      }}
    >
      <div
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: 8,
          alignItems: "stretch",
          minHeight: 0,
        }}
      >
        {primitives.map((p, i) => (
          <InsidePrimitiveColumn key={p.id} prim={p} index={i} />
        ))}
      </div>
    </div>
  );
}

function InsidePrimitiveColumn({
  prim,
  index,
}: {
  prim: InsidePrimitive;
  index: number;
}) {
  return (
    <div
      data-testid={`f3-inside-${prim.id}`}
      className="f-card-cycle"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 10,
        padding: "14px 8px",
        background: "rgba(10,10,10,0.5)",
        "--cycle-duration": `${5}s`,
        "--cycle-delay": `${index}s`,
      } as CSSProperties}
    >
      <div
        style={{
          fontFamily: "var(--mono)",
          fontSize: 11,
          letterSpacing: "0.18em",
          color: "var(--copper-100)",
          textTransform: "uppercase",
          lineHeight: 1.2,
        }}
      >
        {prim.title}
      </div>
      <div
        style={{
          fontFamily: "var(--serif)",
          fontStyle: "italic",
          fontSize: 12,
          color: "var(--copper-300)",
          lineHeight: 1.2,
        }}
      >
        {prim.word}
      </div>
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          minHeight: 60,
        }}
      >
        {prim.glyph}
      </div>
    </div>
  );
}

// ── Inside-state primitive glyphs (looping CSS illustrations) ──

// Skills → "brain". Concentric pulsing rings around a Brain icon (neural pulse).
function BrainGlyph() {
  return (
    <div
      style={{
        position: "relative",
        width: 56,
        height: 56,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      aria-hidden
    >
      <span
        className="f-brain-ring-1"
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          border: "1px solid var(--copper-500)",
        }}
      />
      <span
        className="f-brain-ring-2"
        style={{
          position: "absolute",
          inset: 6,
          borderRadius: "50%",
          border: "1px solid var(--copper-400)",
        }}
      />
      <LucideIcon name="Brain" size={26} color="var(--copper-200)" />
    </div>
  );
}

// Hooks → "guard". Shield icon with a clamping bracket animation around it.
function GuardGlyph() {
  return (
    <div
      style={{
        position: "relative",
        width: 56,
        height: 56,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      aria-hidden
    >
      <span
        className="f-guard-bracket-l"
        style={{
          position: "absolute",
          left: 0,
          top: 8,
          bottom: 8,
          width: 6,
          borderLeft: "1px solid var(--copper-400)",
          borderTop: "1px solid var(--copper-400)",
          borderBottom: "1px solid var(--copper-400)",
        }}
      />
      <span
        className="f-guard-bracket-r"
        style={{
          position: "absolute",
          right: 0,
          top: 8,
          bottom: 8,
          width: 6,
          borderRight: "1px solid var(--copper-400)",
          borderTop: "1px solid var(--copper-400)",
          borderBottom: "1px solid var(--copper-400)",
        }}
      />
      <LucideIcon name="Shield" size={26} color="var(--copper-200)" />
    </div>
  );
}

// Agents → "worker". Bot icon with a small task-line stream below it.
function WorkerGlyph() {
  return (
    <div
      style={{
        position: "relative",
        width: 56,
        height: 56,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
      }}
      aria-hidden
    >
      <LucideIcon name="Bot" size={26} color="var(--copper-200)" />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          gap: 2,
          width: 36,
        }}
      >
        <span
          className="f-worker-line-1"
          style={{
            height: 2,
            background: "var(--copper-500)",
          }}
        />
        <span
          className="f-worker-line-2"
          style={{
            height: 2,
            background: "var(--copper-500)",
          }}
        />
        <span
          className="f-worker-line-3"
          style={{
            height: 2,
            background: "var(--copper-500)",
          }}
        />
      </div>
    </div>
  );
}

// MCP → "bridge". Two endpoints joined by a flowing dashed stroke.
function BridgeGlyph() {
  return (
    <svg
      width={72}
      height={48}
      viewBox="0 0 72 48"
      aria-hidden
      style={{ display: "block" }}
    >
      <circle cx={10} cy={24} r={6} fill="none" stroke="var(--copper-300)" strokeWidth={1} />
      <circle cx={62} cy={24} r={6} fill="none" stroke="var(--copper-300)" strokeWidth={1} />
      <line
        x1={16}
        y1={24}
        x2={56}
        y2={24}
        stroke="var(--copper-400)"
        strokeWidth={1}
        className="f-arrow-stream"
      />
      <LucideIcon name="Plug" size={0} />
    </svg>
  );
}

// Commands → "shortcut". Lightning bolt blinking on a slash prompt baseline.
function ShortcutGlyph() {
  return (
    <div
      style={{
        position: "relative",
        width: 56,
        height: 56,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
      }}
      aria-hidden
    >
      <span
        className="f-shortcut-slash"
        style={{
          fontFamily: "var(--mono)",
          fontSize: 22,
          color: "var(--copper-300)",
          lineHeight: 1,
        }}
      >
        /
      </span>
      <span className="f-shortcut-zap">
        <LucideIcon name="Zap" size={22} color="var(--copper-200)" />
      </span>
    </div>
  );
}

// ───────────────────── WHY PACKAGE state ─────────────────────
//
// Install diagram. 1 PLUGIN folder → arrow → 10×5 laptop grid. Each row of
// 10 laptops lights up in turn (4s loop) via `f-grid-row-N` shared keyframes.

function LaptopGlyph({ size = 10 }: { size?: number }) {
  return (
    <svg
      width={size + 4}
      height={size}
      viewBox="0 0 14 10"
      aria-hidden="true"
      style={{ display: "block" }}
    >
      <rect
        x={2}
        y={1}
        width={10}
        height={6}
        fill="none"
        stroke="var(--copper-400)"
        strokeWidth={0.8}
      />
      <line
        x1={0}
        y1={9}
        x2={14}
        y2={9}
        stroke="var(--copper-300)"
        strokeWidth={0.8}
      />
    </svg>
  );
}

const GRID_ROW_CLASSES = [
  "f-grid-row-1",
  "f-grid-row-2",
  "f-grid-row-3",
  "f-grid-row-4",
  "f-grid-row-5",
] as const;

function WhyPackageState() {
  const rows = 5;
  const cols = 10;
  return (
    <div
      data-testid="f3-why-package"
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "8px 12px",
        gap: 14,
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 18,
          minHeight: 0,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
          }}
        >
          {/* LEFT — single PLUGIN folder */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 6,
            }}
          >
            <div
              style={{
                width: 64,
                height: 64,
                border: "1px solid var(--copper-500)",
                background: "rgba(184,110,61,0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <LucideIcon name="Package" size={28} color="var(--copper-200)" />
            </div>
            <ColumnTitle>plugin</ColumnTitle>
          </div>

          {/* MIDDLE — arrow */}
          <Arrow length={56} />

          {/* RIGHT — 10×5 laptop grid with row-by-row sweep */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 6,
            }}
          >
            <div
              data-testid="f3-laptop-grid"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 4,
                padding: "10px 12px",
                border: "1px solid var(--copper-700)",
                background: "rgba(184,110,61,0.03)",
              }}
            >
              {Array.from({ length: rows }).map((_, rowIdx) => (
                <div
                  key={rowIdx}
                  data-testid={`f3-laptop-row-${rowIdx}`}
                  className={GRID_ROW_CLASSES[rowIdx]}
                  style={{
                    display: "grid",
                    gridTemplateColumns: `repeat(${cols}, 1fr)`,
                    gap: 6,
                  }}
                >
                  {Array.from({ length: cols }).map((_, colIdx) => (
                    <LaptopGlyph key={colIdx} size={10} />
                  ))}
                </div>
              ))}
            </div>
            <ColumnTitle>50 user laptops</ColumnTitle>
          </div>
        </div>

        {/* mono command text */}
        <div
          style={{
            padding: "8px 14px",
            border: "1px solid var(--copper-700)",
            background: "rgba(0,0,0,0.32)",
            fontFamily: "var(--mono)",
            fontSize: 12,
            letterSpacing: "0.08em",
            color: "var(--copper-100)",
          }}
        >
          <span style={{ color: "var(--copper-400)" }}>$ </span>
          plugins install weekly-report-plugin
        </div>
      </div>
    </div>
  );
}

// ───────────────────── HOW IT LOADS state ─────────────────────
//
// Three columns — DISCOVER · LOAD · CONTEXT-BUDGET — each with a caption and
// a continuously looping illustration that semantically fits its phase:
//   DISCOVER  → streaming filesystem-scan log (typewriter-style lines)
//   LOAD      → animated stack of metadata cards loading in
//   CONTEXT-BUDGET → a copper meter that fills on demand + instruction chip

interface LoadStep {
  n: number;
  label: string;
  caption: string;
  icon: string;
  illustration: ReactNode;
}

function HowItLoadsState() {
  const steps: LoadStep[] = [
    {
      n: 1,
      label: "discover",
      caption: "Claude scans your plugin folders",
      icon: "Search",
      illustration: <DiscoverScanIllustration />,
    },
    {
      n: 2,
      label: "load",
      caption: "per-session metadata only",
      icon: "Layers",
      illustration: <LoadStackIllustration />,
    },
    {
      n: 3,
      label: "context-budget",
      caption: "instructions on demand",
      icon: "Target",
      illustration: <BudgetMeterIllustration />,
    },
  ];

  return (
    <div
      data-testid="f3-how-it-loads"
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "8px 12px",
        gap: 14,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "stretch",
          gap: 10,
          flex: 1,
          minHeight: 0,
        }}
      >
        {steps.map((s, i) => (
          <Fragment key={s.n}>
            <LoadStepCard step={s} index={i} />
            {i < steps.length - 1 ? <PipeArrow /> : null}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

// Fixed-height "illustration band" so all 3 columns share the same vertical
// mid-line for their illustrations regardless of caption line-count.
const LOAD_ILLUSTRATION_BAND_H = 130;

function LoadStepCard({ step, index }: { step: LoadStep; index: number }) {
  return (
    <div
      data-testid={`f3-step-${step.label}`}
      className="f-card-cycle"
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: 10,
        padding: 12,
        background: "rgba(10,10,10,0.5)",
        minWidth: 0,
        "--cycle-duration": `${3}s`,
        "--cycle-delay": `${index}s`,
      } as CSSProperties}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div
          style={{
            width: 22,
            height: 22,
            borderRadius: "50%",
            border: "1px solid var(--copper-500)",
            background: "rgba(184,110,61,0.06)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "var(--mono)",
            fontSize: 10,
            color: "var(--copper-200)",
            flexShrink: 0,
          }}
        >
          {step.n}
        </div>
        <LucideIcon name={step.icon} size={14} color="var(--copper-300)" />
        <span
          style={{
            fontFamily: "var(--mono)",
            fontSize: 10.5,
            letterSpacing: "0.18em",
            color: "var(--copper-100)",
            textTransform: "uppercase",
          }}
        >
          {step.label}
        </span>
      </div>
      <div
        style={{
          fontFamily: "var(--serif)",
          fontStyle: "italic",
          fontSize: 12,
          color: "var(--neutral-300)",
          lineHeight: 1.4,
        }}
      >
        {step.caption}
      </div>
      {/* Illustration band — fixed-height container that centers its contents
          so DISCOVER box, LOAD card-stack, and BUDGET meter share the same
          vertical mid-line across all 3 columns regardless of caption
          line-count differences above. */}
      <div
        data-testid={`f3-step-${step.label}-illustration-band`}
        style={{
          marginTop: "auto",
          height: LOAD_ILLUSTRATION_BAND_H,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        {step.illustration}
      </div>
    </div>
  );
}

// DISCOVER — streaming filesystem-scan log. Lines highlight in sequence to
// suggest a continuous scan.
function DiscoverScanIllustration() {
  const lines = [
    "scanning ~/.claude/plugins/",
    "  + commit-helper/",
    "  + pr-reviewer/",
    "  + weekly-report/",
    "found 3 plugins",
  ];
  return (
    <div
      data-testid="f3-discover-stream"
      style={{
        width: "100%",
        fontFamily: "var(--mono)",
        fontSize: 10.5,
        lineHeight: 1.55,
        color: "var(--neutral-300)",
        padding: "8px 10px",
        border: "1px solid var(--copper-800)",
        background: "rgba(0,0,0,0.32)",
        overflow: "hidden",
      }}
      aria-hidden
    >
      {lines.map((line, i) => (
        <div
          key={i}
          className={`f-tree-line-${i + 1}`}
          style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
        >
          {i === 0 ? (
            <span style={{ color: "var(--copper-300)" }}>$ </span>
          ) : null}
          {line}
        </div>
      ))}
    </div>
  );
}

// LOAD — stack of metadata cards loading in. Three small "card" rows fade up
// in sequence then loop.
function LoadStackIllustration() {
  return (
    <div
      data-testid="f3-load-stack"
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 4,
        padding: "4px 2px",
      }}
      aria-hidden
    >
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`f-tree-line-${i + 1}`}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "5px 8px",
            border: "1px solid var(--copper-700)",
            background: "rgba(184,110,61,0.05)",
            fontFamily: "var(--mono)",
            fontSize: 9.5,
            color: "var(--neutral-300)",
            letterSpacing: "0.08em",
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "var(--copper-400)",
              flexShrink: 0,
            }}
          />
          <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {i === 0
              ? "plugin.json"
              : i === 1
                ? "SKILL.md · meta"
                : "agent · meta"}
          </span>
        </div>
      ))}
    </div>
  );
}

// CONTEXT-BUDGET — a meter that fills on demand + an "instructions" chip that
// pulses each cycle to suggest just-in-time loading.
function BudgetMeterIllustration() {
  return (
    <div
      data-testid="f3-budget-meter"
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        gap: 8,
      }}
      aria-hidden
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontFamily: "var(--mono)",
          fontSize: 9.5,
          letterSpacing: "0.14em",
          color: "var(--copper-300)",
          textTransform: "uppercase",
        }}
      >
        <span>budget</span>
        <span style={{ color: "var(--neutral-400)" }}>on demand</span>
      </div>
      <div
        style={{
          position: "relative",
          width: "100%",
          height: 8,
          border: "1px solid var(--copper-700)",
          background: "var(--neutral-800)",
          overflow: "hidden",
        }}
      >
        <div
          className="f-budget-fill"
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            background: "var(--copper-400)",
          }}
        />
      </div>
      <div
        className="f-pointer-pulse"
        style={{
          alignSelf: "flex-start",
          padding: "3px 7px",
          border: "1px solid var(--copper-500)",
          background: "rgba(184,110,61,0.08)",
          fontFamily: "var(--mono)",
          fontSize: 9.5,
          letterSpacing: "0.1em",
          color: "var(--copper-100)",
        }}
      >
        + instructions
      </div>
    </div>
  );
}

function PipeArrow() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 18,
        color: "var(--copper-300)",
        fontFamily: "var(--mono)",
        fontSize: 18,
      }}
      aria-hidden="true"
    >
      &rarr;
    </div>
  );
}

// ───────────────────── EXAMPLE state ─────────────────────
//
// ASCII file tree for `weekly-report-plugin/`. Each row highlights in turn
// (~4.2s loop) via shared `f-tree-line-N` keyframes — a typing/highlight
// rhythm without re-running the whole tree every hover.

function ExampleState() {
  // `weekly-report` plugin directory layout. Two skills (each a directory
  // containing SKILL.md) and two agent example files. Tree connectors:
  //   ├──  non-last child
  //   └──  last child
  //   │    vertical continuation at parent indent level
  const treeLines: ReadonlyArray<{ tree: string; name: string }> = [
    { tree: "", name: "weekly-report/" },
    { tree: "├── ", name: ".claude-plugin/" },
    { tree: "│   └── ", name: "plugin.json" },
    { tree: "├── ", name: "skills/" },
    { tree: "│   ├── ", name: "data-loader/" },
    { tree: "│   │   └── ", name: "SKILL.md" },
    { tree: "│   └── ", name: "chart-builder/" },
    { tree: "│       └── ", name: "SKILL.md" },
    { tree: "├── ", name: "agents/" },
    { tree: "│   ├── ", name: "summarizer.md" },
    { tree: "│   └── ", name: "publisher.md" },
    { tree: "├── ", name: "hooks/" },
    { tree: "│   └── ", name: "hooks.json" },
    { tree: "└── ", name: ".mcp.json" },
  ];
  return (
    <div
      data-testid="f3-example"
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "8px 12px",
        gap: 14,
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: 0,
          gap: 8,
        }}
      >
        {/* Title — mono uppercase, copper-300, small margin to the tree box. */}
        <div
          data-testid="f3-example-title"
          style={{
            fontFamily: "var(--mono)",
            fontSize: 11,
            letterSpacing: "0.18em",
            color: "var(--copper-300)",
            textTransform: "uppercase",
            lineHeight: 1.2,
            alignSelf: "center",
          }}
        >
          Plugin Structure
        </div>
        <div
          style={{
            border: "1px solid var(--copper-700)",
            background: "rgba(0,0,0,0.32)",
            padding: "16px 22px",
            minWidth: 360,
          }}
        >
          {treeLines.map((line, i) => {
            const isRoot = i === 0;
            // Only 7 f-tree-line-N keyframes exist; cycle them so all rows
            // animate without bunching the pulses at the top.
            const pulseClass = `f-tree-line-${(i % 7) + 1}`;
            return (
              <div
                key={i}
                data-testid={`f3-tree-line-${i}`}
                className={pulseClass}
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 12,
                  lineHeight: 1.55,
                  whiteSpace: "pre",
                }}
              >
                <span style={{ color: "var(--copper-300)" }}>{line.tree}</span>
                <span
                  style={{
                    color: isRoot
                      ? "var(--copper-100)"
                      : "var(--neutral-100)",
                    fontWeight: isRoot ? 500 : 400,
                  }}
                >
                  {line.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ───────────────────── Shared atoms ─────────────────────

function Arrow({ length = 48 }: { length?: number }) {
  return (
    <svg
      width={length}
      height={12}
      viewBox={`0 0 ${length} 12`}
      style={{ display: "block" }}
      aria-hidden
    >
      <line
        x1={0}
        y1={6}
        x2={length - 6}
        y2={6}
        stroke="var(--copper-400)"
        strokeWidth={1}
      />
      <polyline
        points={`${length - 10},2 ${length - 2},6 ${length - 10},10`}
        fill="none"
        stroke="var(--copper-300)"
        strokeWidth={1}
      />
    </svg>
  );
}

// ───────────────────── slide def ─────────────────────

export const f3Slide: SlideDef = {
  steps: 2,
  canonicalPose: 1,
  animationMode: "step-reveal",
  surface: "dark",
  section: "F",
  render: () => <F3PluginsThePackage />,
};
