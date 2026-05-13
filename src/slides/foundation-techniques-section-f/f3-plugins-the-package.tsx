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
import { Fragment, type ReactNode, useState } from "react";
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
import { f3Content as C } from "./content";

// ───────────────────── shared layout constants (F-section canonical) ─────────────────────

const PANE_TOP = 156;
const PANE_BOTTOM = 80;
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

      {/* RIGHT — bordered box. Top/bottom borders align with FacetMenu's
          top edge (PANE_TOP) and bottom edge (PANE_BOTTOM) exactly. */}
      <div
        data-testid="f3-right-pane"
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
            top border exactly. */}
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

// ───────────────────── shared sub-section header (mirrors F.2) ─────────────────────

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

const CAKE_SHIMMER_BY_LAYER: Record<string, string> = {
  "CLAUDE.md": "f-cake-shimmer-1",
  HOOKS: "f-cake-shimmer-2",
  SKILLS: "f-cake-shimmer-3",
  AGENTS: "f-cake-shimmer-4",
};

function WhatItIsState({ connectors }: WhatItIsStateProps) {
  return (
    <div
      data-testid="f3-what-it-is"
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
        caption="your expertise, in a folder anyone can install"
      />

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
      {ordered.map((name) => (
        <div
          key={name}
          data-testid={`f3-cake-shimmer-${name}`}
          className={CAKE_SHIMMER_BY_LAYER[name]}
          style={{
            height: BAR_H,
            width: BAR_W,
            boxSizing: "border-box",
            // Box-shadow is animated by the keyframe; transparent fill keeps
            // the underlying LayerCake bar visible.
            background: "transparent",
            borderRadius: 0,
          }}
        />
      ))}
    </div>
  );
}

// ───────────────────── WHAT'S INSIDE state ─────────────────────
//
// LayerCake in exploded mode with forward pointers. A small "+ MCP · F.5"
// note pulses below the cake to indicate the MCP adjunct.

function WhatsInsideState() {
  const pointers: Record<string, string> = {
    "CLAUDE.md": "the foundation",
    HOOKS: "F.6",
    SKILLS: "F.4",
    AGENTS: "F.7",
  };
  return (
    <div
      data-testid="f3-whats-inside"
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
        label="WHAT'S INSIDE"
        caption="four layers + one adapter"
      />

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 14,
          minHeight: 0,
        }}
      >
        <LayerCake
          layers={[...C.cakeLayers]}
          mode="exploded"
          pointers={pointers}
          lit={[...C.cakeLayers]}
        />
        <div
          className="f-pointer-pulse"
          data-testid="f3-mcp-adjunct"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontSize: 13,
            color: "var(--copper-200)",
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: 18,
              height: 1,
              background: "var(--copper-500)",
            }}
          />
          plus MCP connectors · {highlight("F.5", ["F.5"])}
        </div>
      </div>
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
        padding: "8px 12px",
        gap: 14,
      }}
    >
      <FacetHeader
        label="WHY PACKAGE"
        caption="single command · everyone gets it"
      />

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
// Three horizontal steps: discover → load → context-budget. Sequential pulse
// via shared `f-seq-pulse-1/2/3` keyframes (same engine F.2's HOW IT WORKS
// uses). Below the row: tiny token-counter widget.

interface LoadStep {
  n: number;
  label: string;
  body: string;
  icon: string;
  pulseClass: "f-seq-pulse-1" | "f-seq-pulse-2" | "f-seq-pulse-3";
}

function HowItLoadsState() {
  const steps: LoadStep[] = [
    {
      n: 1,
      label: "discover",
      body: "Claude scans ~/.claude/plugins/",
      icon: "Search",
      pulseClass: "f-seq-pulse-1",
    },
    {
      n: 2,
      label: "load",
      body: "per-session metadata only",
      icon: "Layers",
      pulseClass: "f-seq-pulse-2",
    },
    {
      n: 3,
      label: "context-budget",
      body: "instructions on demand",
      icon: "Target",
      pulseClass: "f-seq-pulse-3",
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
        padding: "8px 12px",
        gap: 14,
      }}
    >
      <FacetHeader
        label="HOW IT LOADS"
        caption="discover → load → context-budget"
      />

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
            <LoadStepCard step={s} />
            {i < steps.length - 1 ? <PipeArrow /> : null}
          </Fragment>
        ))}
      </div>

      {/* Token-counter widget */}
      <div
        data-testid="f3-token-counter"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "8px 14px",
          border: "1px solid var(--copper-700)",
          background: "rgba(184,110,61,0.04)",
          alignSelf: "flex-start",
        }}
      >
        <span
          style={{
            fontFamily: "var(--mono)",
            fontSize: 10,
            letterSpacing: "0.18em",
            color: "var(--copper-300)",
            textTransform: "uppercase",
          }}
        >
          tokens loaded
        </span>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 4,
            fontFamily: "var(--mono)",
            fontSize: 13,
            color: "var(--copper-100)",
          }}
        >
          <span style={{ color: "var(--copper-100)" }}>100</span>
          <span style={{ color: "var(--neutral-400)" }}>of</span>
          <span style={{ color: "var(--neutral-300)" }}>5,000</span>
        </div>
        <div
          style={{
            position: "relative",
            width: 90,
            height: 4,
            background: "var(--neutral-800)",
            border: "1px solid var(--copper-800)",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              width: "2%",
              background: "var(--copper-400)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

function LoadStepCard({ step }: { step: LoadStep }) {
  return (
    <div
      data-testid={`f3-step-${step.label}`}
      className={step.pulseClass}
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: 8,
        padding: 12,
        border: "1px solid var(--copper-700)",
        background: "rgba(10,10,10,0.5)",
      }}
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
        {step.body}
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
  const treeLines: ReadonlyArray<{ tree: string; name: string }> = [
    { tree: "", name: "weekly-report-plugin/" },
    { tree: "├── ", name: "SKILL.md" },
    { tree: "├── ", name: "hooks/" },
    { tree: "│   └── ", name: "post-tool-use.sh" },
    { tree: "├── ", name: "mcp_servers.json" },
    { tree: "└── ", name: "agents/" },
    { tree: "    └── ", name: "reviewer.md" },
  ];
  return (
    <div
      data-testid="f3-example"
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
        label="EXAMPLE · weekly-report plugin"
        caption="a plugin is just a folder"
      />

      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: 0,
        }}
      >
        <div
          style={{
            border: "1px solid var(--copper-700)",
            background: "rgba(0,0,0,0.32)",
            padding: "18px 24px",
            minWidth: 360,
          }}
        >
          {treeLines.map((line, i) => {
            const isRoot = i === 0;
            const pulseClass = `f-tree-line-${i + 1}`;
            return (
              <div
                key={i}
                data-testid={`f3-tree-line-${i}`}
                className={pulseClass}
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 13,
                  lineHeight: 1.7,
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
