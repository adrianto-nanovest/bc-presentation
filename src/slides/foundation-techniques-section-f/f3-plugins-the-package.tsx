// F.3 — THE PACKAGE (Plugins overview)
//
// Spec §6. Capability-umbrella opener · introduces Plugins as the folder
// that bundles Skills + MCP + Hooks + Sub-agents + CLAUDE.md.
//
// Layout — E.8-style 480/660 split. FacetMenu on the left (5 facets:
// WHAT IT IS · WHAT'S INSIDE · WHY PACKAGE · HOW IT LOADS · EXAMPLE);
// DetailCanvas on the right with the layer-cake + MCP connectors as the
// default state.
//
// Step axis (7 steps — spec §6.5):
//   0 — title + facet header + copper rule visible; default canvas dim
//   1–5 — facet items 1–5 cascade (gated via `revealUntilIndex`)
//   6 — footer reveals; default canvas brightens; cake assembles
//       bottom→top (CLAUDE.md → HOOKS → SKILLS → AGENTS, 250ms each);
//       ribbon wraps; MCP connectors fan in
//
// Hover (after step 5):
//   ◉ WHAT IT IS    → default canvas (cake + connectors)
//   ◉ WHAT'S INSIDE → cake `mode="exploded"` with forward-pointer labels
//                     (SKILLS→F.4 · HOOKS→F.6 · AGENTS→F.7 — and MCP labelled
//                     separately via the connectors, F.5)
//   ◉ WHY PACKAGE   → install diagram (1 SKILL.md → 50 laptops via single cmd)
//   ◉ HOW IT LOADS  → 3-step discover → load → context-budget flow with a
//                     tiny token-counter widget
//   ◉ EXAMPLE       → ASCII file tree for `weekly-report-plugin/`
//
// Canonical pose: 6 — full cake + ribbon + connectors + all facets revealed.
import { Fragment, useState } from "react";
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
import { Reveal } from "./components/Reveal";
import { LucideIcon } from "./components/LucideIcon";
import { f3Content as C } from "./content";

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

// ───────────────────── default canvas ─────────────────────
//
// Layer cake (compact + ribbon + animateAssembly) sits center-left of the
// canvas; the MCPConnectors column sits to its right with thin sketchy
// lines reaching back to the cake's right edge. The canvas dims at 0.5
// opacity until step 6 (per spec §6.5), then brightens to 1.0.

interface DefaultCanvasProps {
  /** Container brightness (0.5 dim default → 1.0 after step 6). */
  bright: boolean;
  /** When true, kicks off the cake-assembly + connector fan-in. */
  assemble: boolean;
  connectors: MCPConnectorItem[];
}
function DefaultCanvas({ bright, assemble, connectors }: DefaultCanvasProps) {
  return (
    <div
      data-testid="f3-default-canvas"
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 48,
        opacity: bright ? 1 : 0.5,
        transition: "opacity 700ms var(--ease)",
        padding: "0 12px",
      }}
    >
      <LayerCake
        layers={[...C.cakeLayers]}
        ribbon
        animateAssembly={assemble}
        lit={assemble ? [...C.cakeLayers] : []}
      />
      {/* cakeRightEdge negative so the connector lines bleed leftward to
          touch the cake's outer ribbon. The 48px gap above + ribbon border
          padding give us an aesthetic gap. */}
      <MCPConnectors
        logos={connectors}
        on={assemble}
        cakeRightEdge={-44}
      />
    </div>
  );
}

// ───────────────────── WHAT'S INSIDE state ─────────────────────
//
// Cake in exploded mode with forward pointers. The layer cake's `pointers`
// prop only handles per-layer arrow labels — MCP is shown as a separate
// note below the cake because it lives outside the strict 4-layer stack.

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
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
        padding: "12px 0",
      }}
    >
      <span
        style={{
          fontFamily: "var(--mono)",
          fontSize: 11,
          letterSpacing: "0.24em",
          color: "var(--copper-300)",
          textTransform: "uppercase",
        }}
      >
        what's inside the package
      </span>
      <LayerCake
        layers={[...C.cakeLayers]}
        mode="exploded"
        pointers={pointers}
        lit={[...C.cakeLayers]}
      />
      <div
        style={{
          marginTop: 4,
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
  );
}

// ───────────────────── WHY PACKAGE state ─────────────────────
//
// Install diagram: 1 SKILL.md folder → arrow → 10×5 grid of tiny laptop
// glyphs. Mono command text below.

function LaptopGlyph({ size = 10 }: { size?: number }) {
  // 14×10 viewbox — screen + base. Stroke-only, copper-300.
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

function WhyPackageState() {
  const cells = Array.from({ length: 50 });
  return (
    <div
      data-testid="f3-why-package"
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 22,
        padding: "16px 12px",
      }}
    >
      <span
        style={{
          fontFamily: "var(--mono)",
          fontSize: 11,
          letterSpacing: "0.24em",
          color: "var(--copper-300)",
          textTransform: "uppercase",
        }}
      >
        single command · everyone gets it
      </span>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          width: "100%",
          justifyContent: "center",
        }}
      >
        {/* LEFT — single SKILL.md folder */}
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
              width: 72,
              height: 72,
              border: "1px solid var(--copper-500)",
              background: "rgba(184,110,61,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <LucideIcon name="Package" size={32} color="var(--copper-200)" />
          </div>
          <span
            style={{
              fontFamily: "var(--mono)",
              fontSize: 10,
              letterSpacing: "0.22em",
              color: "var(--copper-200)",
              textTransform: "uppercase",
            }}
          >
            plugin
          </span>
        </div>

        {/* MIDDLE — arrow */}
        <Arrow length={56} />

        {/* RIGHT — 10×5 laptop grid */}
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
              display: "grid",
              gridTemplateColumns: "repeat(10, 1fr)",
              gap: 6,
              padding: "10px 12px",
              border: "1px solid var(--copper-700)",
              background: "rgba(184,110,61,0.03)",
            }}
          >
            {cells.map((_, i) => (
              <LaptopGlyph key={i} size={10} />
            ))}
          </div>
          <span
            style={{
              fontFamily: "var(--mono)",
              fontSize: 10,
              letterSpacing: "0.22em",
              color: "var(--copper-300)",
              textTransform: "uppercase",
            }}
          >
            50 user laptops
          </span>
        </div>
      </div>

      {/* mono command text */}
      <div
        style={{
          marginTop: 4,
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
  );
}

// ───────────────────── HOW IT LOADS state ─────────────────────
//
// Three horizontal steps: discover → load → context-budget. Each step is a
// labelled card. Below the row: tiny token-counter widget.

function HowItLoadsState() {
  const steps: ReadonlyArray<{
    n: number;
    label: string;
    body: string;
    icon: string;
  }> = [
    {
      n: 1,
      label: "discover",
      body: "Claude scans ~/.claude/plugins/",
      icon: "Search",
    },
    {
      n: 2,
      label: "load",
      body: "per-session metadata only",
      icon: "Layers",
    },
    {
      n: 3,
      label: "context-budget",
      body: "instructions on demand",
      icon: "Target",
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
        alignItems: "center",
        justifyContent: "center",
        gap: 26,
        padding: "12px 12px",
      }}
    >
      <span
        style={{
          fontFamily: "var(--mono)",
          fontSize: 11,
          letterSpacing: "0.24em",
          color: "var(--copper-300)",
          textTransform: "uppercase",
        }}
      >
        load only what's needed
      </span>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr auto 1fr",
          gap: 10,
          alignItems: "center",
          width: "100%",
        }}
      >
        {steps.map((s, i) => (
          <Fragment key={s.n}>
            <StepCard step={s} />
            {i < steps.length - 1 ? <Arrow length={28} /> : null}
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
        {/* Tiny bar */}
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

// Small helper — wraps a single 3-step card. Kept inline to keep the file
// self-contained.
function StepCard({
  step,
}: {
  step: { n: number; label: string; body: string; icon: string };
}) {
  return (
    <div
      data-testid={`f3-step-${step.label}`}
      style={{
        border: "1px solid var(--copper-700)",
        background: "rgba(184,110,61,0.03)",
        padding: "12px 12px",
        display: "flex",
        flexDirection: "column",
        gap: 6,
        minHeight: 100,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
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
        <LucideIcon
          name={step.icon}
          size={14}
          color="var(--copper-300)"
        />
        <span
          style={{
            fontFamily: "var(--mono)",
            fontSize: 11,
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

// ───────────────────── EXAMPLE state ─────────────────────
//
// ASCII file tree of `weekly-report-plugin/`. Mono font, copper-300 for tree
// characters, neutral-100 for filenames.

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
        alignItems: "center",
        justifyContent: "center",
        gap: 18,
        padding: "16px 12px",
      }}
    >
      <span
        style={{
          fontFamily: "var(--mono)",
          fontSize: 11,
          letterSpacing: "0.24em",
          color: "var(--copper-300)",
          textTransform: "uppercase",
        }}
      >
        a plugin · the folder
      </span>

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
          return (
            <div
              key={i}
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

// ───────────────────── slide ─────────────────────

export function F3PluginsThePackage() {
  const { stepIndex } = useDeck();
  const [activeFacet, setActiveFacet] = useState<string | null>(null);

  // Per spec §6.5 — 7 steps total.
  // step 0  : header only, canvas dim
  // steps 1-5: cascade facets one at a time
  // step 6  : footer + canvas bright + cake assembly + connector fan-in
  const revealUntilIndex = stepIndex - 1; // -1 at step 0 → no cards yet
  const showFooter = stepIndex >= 6;
  const canvasBright = stepIndex >= 6;
  const animateAssembly = stepIndex >= 6;

  // Hover enabled once all 5 facets are revealed (step 5+).
  const hoverEnabled = stepIndex >= 5;
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

      {/* LEFT — facet menu */}
      <FacetMenu
        items={C.facets}
        activeFacet={effectiveFacet}
        onHover={hoverEnabled ? setActiveFacet : () => {}}
        showCards={stepIndex >= 1}
        revealUntilIndex={revealUntilIndex}
        header={C.header}
        footer={C.footer}
        footerKw={C.footerKw}
        showFooter={showFooter}
      />

      {/* RIGHT — detail canvas */}
      <div
        data-testid="f3-right-pane"
        style={{
          position: "absolute",
          right: 48,
          top: 156,
          width: 660,
          bottom: 80,
        }}
      >
        <Reveal on={stepIndex >= 0} style={{ position: "absolute", inset: 0 }}>
          <DetailCanvas
            activeFacet={effectiveFacet}
            defaultState={
              <DefaultCanvas
                bright={canvasBright}
                assemble={animateAssembly}
                connectors={connectors}
              />
            }
            states={{
              // WHAT IT IS hover === default canvas (spec §6.4 default + WHAT IT IS)
              // Omitting the key falls back to the default state.
              "whats-inside": <WhatsInsideState />,
              "why-package": <WhyPackageState />,
              "how-it-loads": <HowItLoadsState />,
              example: <ExampleState />,
            }}
          />
        </Reveal>
      </div>
    </>
  );
}

// ───────────────────── slide def ─────────────────────

export const f3Slide: SlideDef = {
  steps: 7,
  canonicalPose: 6,
  animationMode: "step-reveal",
  surface: "dark",
  section: "F",
  render: () => <F3PluginsThePackage />,
};
