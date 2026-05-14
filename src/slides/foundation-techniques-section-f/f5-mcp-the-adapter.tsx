// F.5 — THE ADAPTER (MCP · universal adapter)
//
// CANONICAL Section F facet slide. Two-step structure with hover-only details
// and an aligned right-pane bordered box. Mirrors F.2 exactly.
//
// Step axis (2 steps; canonical pose = 1):
//   0 — All 5 facet cards stagger-reveal on the left. Hover is always on.
//       Right pane shows the bordered box framing an empty content area.
//       Hovering any facet card crossfades the matching illustration into
//       the bordered box. Footer hidden.
//   1 — Footer (italic copper-200 caption) fades in below the facet cards.
//       Everything else stays revealed; hover continues to drive details.
//
// Border alignment (canonical):
//   The right-pane bordered box uses the same `top: 156 / bottom: 80` as the
//   left FacetMenu so the top and bottom borders align exactly with the
//   FacetMenu's top edge (header baseline) and bottom edge. An invisible
//   visibility section title inside the bordered box mirrors the left's
//   mono header + 12px gap + CopperRule, so when a facet hover illustration
//   crossfades in, its content top sits on the same baseline as the left's
//   first facet card.
//
// Facet → state map:
//   what-it-is        → UsbAnalogyState (USB-for-AI fanout, 6-pill sweep)
//   dual-role         → DualRoleState (split: knowledge | MCP | tools, flow dots)
//   compare           → MCPCompare (3-column compare, hover-driven)
//   what-mcp-exposes  → ExposesState (Resources / Tools / Prompts seq-pulse)
//   example           → ExampleState (4-step vertical flow, row-pulse)
import { Fragment, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { highlight as hl } from "@/components/highlight";
import { FacetMenu } from "./components/FacetMenu";
import { DetailCanvas } from "./components/DetailCanvas";
import { LucideIcon } from "./components/LucideIcon";
import {
  MCPCompare,
  type CompareColumnId,
} from "./components/MCPCompare";
import { Typewriter } from "./components/Typewriter";
import { useFacetListBounds } from "./components/useFacetListBounds";
import { f5Content as C } from "./content";

// ───────────────────── shared layout constants (F-section canonical) ─────────────────────
//
// Right pane width — top / bottom are measured at runtime via
// `useFacetListBounds`.

const RIGHT_W = 660;

// ───────────────────── slide ─────────────────────

export function F5McpTheAdapter() {
  const { stepIndex } = useDeck();

  // CANONICAL Section F step-gate pattern (mirrors F.2):
  //   showCards     = stepIndex >= 0   → all 5 cards stagger-reveal at step 0
  //   hoverEnabled  = stepIndex >= 0   → hover always-on once cards are in
  //   showFooter    = stepIndex >= 1   → footer reveals at canonical pose
  const showCards = stepIndex >= 0;
  const hoverEnabled = stepIndex >= 0;
  const showFooter = stepIndex >= 1;

  const [activeFacet, setActiveFacet] = useState<string | null>(null);
  const [pinnedFacet, setPinnedFacet] = useState<string | null>(null);
  // Pin wins over hover so a pinned facet remains the right-pane illustration
  // even when the user mouses away (or onto another card pre-click).
  const effectiveFacet = hoverEnabled ? (pinnedFacet ?? activeFacet) : null;

  const { top: paneTop, bottom: paneBottom } = useFacetListBounds();

  // Compose per-column modal payload for MCPCompare from content.tsx.
  const cmpModals: {
    api: { bullets: string[] };
    mcp: { bullets: string[] };
    cli: { bullets: string[] };
  } = {
    api: { bullets: [...C.compare[0].modal.bullets] },
    mcp: { bullets: [...C.compare[1].modal.bullets] },
    cli: { bullets: [...C.compare[2].modal.bullets] },
  };

  // Per-column display bullets (short, italic-serif inside the compare card).
  const cmpColumns: ReadonlyArray<{
    id: CompareColumnId;
    bullets: string[];
    sublabel?: string;
  }> = [
    {
      id: "API",
      bullets: ["rigid contract", "devs lift each one", "low portability"],
    },
    {
      id: "MCP",
      bullets: ["standardized", "portable", "install once"],
      sublabel: C.compare[1].sublabel,
    },
    {
      id: "CLI",
      bullets: ["flexible", "powerful", "but local"],
    },
  ];

  return (
    <>
      <FigLabel section="F" num={5} label="THE ADAPTER" />

      <div className="slide-headline-row">
        <h1 className="slide-headline small">
          {hl(C.headline, [...C.headlineKw])}
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
        activeFacet={hoverEnabled ? activeFacet : null}
        onHover={hoverEnabled ? setActiveFacet : () => {}}
        pinnedFacet={pinnedFacet}
        onPin={setPinnedFacet}
        showCards={showCards}
        header={C.header}
        footer={C.footer}
        footerKw={[...C.footerKw]}
        showFooter={showFooter}
      />

      {/* RIGHT — transparent popover anchor. Top / bottom match the left
          FacetMenu's card-stack extent exactly (measured at runtime). */}
      <div
        data-testid="f5-right-pane"
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
        {/* Content area — DetailCanvas renders nothing until a facet hover. */}
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
              "what-it-is": <UsbAnalogyState />,
              "dual-role": <DualRoleState />,
              compare: (
                <MCPCompare
                  highlight="MCP"
                  modals={cmpModals}
                  columns={cmpColumns}
                />
              ),
              "what-mcp-exposes": <ExposesState />,
              example: <ExampleState />,
            }}
          />
        </div>
      </div>
    </>
  );
}

// ───────────────────── shared atoms ─────────────────────
//
// FacetHeader was removed in the popover refactor (Item 1).

// ───────────────────── WHAT IT IS state — MCP fan-in/fan-out ─────────────────────
//
// 3-column layout:
//   Col 1 (left)   — 3 MCP nodes stacked vertically. Connectors fan IN to
//                    Claude (column 2) with a directional pulse animation.
//   Col 2 (center) — single, prominent Claude box.
//   Col 3 (right)  — 3 "3rd Party Tools" nodes stacked vertically.
//                    Connectors fan OUT from Claude to each tool.
//
// All 6 connector lines have a flowing copper dot (shared `f-flow-dot`
// keyframe) and a staggered start delay so the pulses feel alive, not
// robotic. Lines are drawn as SVGs in each fan-in / fan-out half.

function UsbAnalogyState() {
  // Column 1 — MCP nodes (data/context sources exposed via MCP).
  const mcpNodes = [
    { name: "DB-MCP", icon: "Database" },
    { name: "Files-MCP", icon: "Folder" },
    { name: "Mail-MCP", icon: "Mail" },
  ];
  // Column 3 — 3rd party tools that Claude reaches out to.
  const toolNodes = [
    { name: "Calendar", icon: "Calendar" },
    { name: "Slack", icon: "MessageSquare" },
    { name: "Sheets", icon: "FileSpreadsheet" },
  ];

  // Vertical positions (in % of fan-svg height) where the 3 rows
  // sit. Used to draw lines from edge → Claude center.
  const ROWS_Y = [22, 50, 78];
  // 6 connectors total; stagger pulse start so they feel alive.
  // 6 stagger slots over a 2s loop period.
  const STAGGER_DELAYS = [0, 333, 666, 1000, 1333, 1666];

  return (
    <div
      data-testid="f5-what-it-is"
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
          gridTemplateColumns: "minmax(0,1fr) minmax(0,0.9fr) minmax(0,1fr)",
          alignItems: "center",
          gap: 0,
          minHeight: 0,
        }}
      >
        {/* COLUMN 1 — MCP nodes (left) */}
        <div
          data-testid="f5-fan-mcp-col"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            gap: 10,
            height: "100%",
            paddingLeft: 4,
            paddingRight: 0,
          }}
        >
          {mcpNodes.map((n, i) => (
            <FanNode
              key={n.name}
              testId={`f5-mcp-node-${i}`}
              name={n.name}
              icon={n.icon}
              accent="copper-500"
            />
          ))}
        </div>

        {/* COLUMN 2 — Claude box + flanking fan lines */}
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          {/* LEFT fan-in SVG: 3 lines from column-1 nodes → Claude center */}
          <FanLines
            testId="f5-fan-in-lines"
            side="in"
            rowsY={ROWS_Y}
            delays={[STAGGER_DELAYS[0], STAGGER_DELAYS[1], STAGGER_DELAYS[2]]}
          />

          {/* Claude box */}
          <div
            data-testid="f5-claude-box"
            style={{
              position: "relative",
              zIndex: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
              padding: "16px 14px",
              border: "1px solid var(--copper-300)",
              background: "rgba(184,110,61,0.12)",
              boxShadow: "0 0 24px rgba(217,158,108,0.18)",
              minWidth: 96,
            }}
          >
            <LucideIcon name="Bot" size={32} color="var(--copper-100)" />
            <span
              style={{
                fontFamily: "var(--mono)",
                fontSize: 11,
                letterSpacing: "0.24em",
                color: "var(--copper-100)",
                textTransform: "uppercase",
              }}
            >
              Claude
            </span>
          </div>

          {/* RIGHT fan-out SVG: 3 lines from Claude → column-3 nodes */}
          <FanLines
            testId="f5-fan-out-lines"
            side="out"
            rowsY={ROWS_Y}
            delays={[STAGGER_DELAYS[3], STAGGER_DELAYS[4], STAGGER_DELAYS[5]]}
          />
        </div>

        {/* COLUMN 3 — 3rd Party Tools (right) */}
        <div
          data-testid="f5-fan-tools-col"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            gap: 10,
            height: "100%",
            paddingLeft: 0,
            paddingRight: 4,
          }}
        >
          {toolNodes.map((n, i) => (
            <FanNode
              key={n.name}
              testId={`f5-tool-node-${i}`}
              name={n.name}
              icon={n.icon}
              accent="copper-600"
            />
          ))}
        </div>
      </div>

      {/* Column labels (mono caps) under the diagram */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0,1fr) minmax(0,0.9fr) minmax(0,1fr)",
          alignItems: "center",
          marginTop: -2,
        }}
      >
        <span
          style={{
            fontFamily: "var(--mono)",
            fontSize: 9.5,
            letterSpacing: "0.24em",
            color: "var(--copper-300)",
            textTransform: "uppercase",
            textAlign: "center",
          }}
        >
          MCP
        </span>
        <span
          style={{
            fontFamily: "var(--mono)",
            fontSize: 9.5,
            letterSpacing: "0.24em",
            color: "var(--copper-200)",
            textTransform: "uppercase",
            textAlign: "center",
          }}
        >
          fan-in · fan-out
        </span>
        <span
          style={{
            fontFamily: "var(--mono)",
            fontSize: 9.5,
            letterSpacing: "0.24em",
            color: "var(--copper-300)",
            textTransform: "uppercase",
            textAlign: "center",
          }}
        >
          3rd Party Tools
        </span>
      </div>
    </div>
  );
}

// Small bordered node used in both columns of the fan diagram.
interface FanNodeProps {
  name: string;
  icon: string;
  accent: "copper-500" | "copper-600";
  testId?: string;
}
function FanNode({ name, icon, accent, testId }: FanNodeProps) {
  return (
    <div
      data-testid={testId}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "8px 10px",
        border: `1px solid var(--${accent})`,
        background: "rgba(184,110,61,0.05)",
      }}
    >
      <LucideIcon name={icon} size={16} color="var(--copper-200)" />
      <span
        style={{
          fontFamily: "var(--mono)",
          fontSize: 10,
          letterSpacing: "0.18em",
          color: "var(--neutral-100)",
          textTransform: "uppercase",
          whiteSpace: "nowrap",
        }}
      >
        {name}
      </span>
    </div>
  );
}

// Fan lines — 3 SVG lines, each with a flowing copper dot. `side="in"`
// draws lines from x=0 → x=100 (column 1 → Claude). `side="out"` draws
// lines from x=0 (Claude) → x=100 (column 3). Dot direction follows the
// line; `delays` are per-line ms offsets so the pulses stagger.
//
// Endpoint clamping (R2-9): the SVG's left/right CSS edges are clamped to
// the center-column boundary (no negative bleed). For `side="in"` the SVG
// spans from the center column's LEFT edge (x=0) to its CENTER (x=100,
// where Claude sits). For `side="out"` it spans CENTER → RIGHT edge.
// This guarantees the line endpoints terminate exactly at the MCP /
// tool-column boundary, never overflowing into those columns.
interface FanLinesProps {
  side: "in" | "out";
  rowsY: number[];
  delays: number[];
  testId?: string;
}
function FanLines({ side, rowsY, delays, testId }: FanLinesProps) {
  // Each line's source/target in viewBox 100×100. Center row (y=50) is
  // Claude's anchor point on whichever side the lines connect to.
  const W = 100;
  const claudeY = 50;
  return (
    <div
      data-testid={testId}
      aria-hidden="true"
      style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        // Clamp to the center column's half-width — no negative bleed.
        ...(side === "in"
          ? { left: 0, right: "50%" }
          : { left: "50%", right: 0 }),
        pointerEvents: "none",
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${W} 100`}
        preserveAspectRatio="none"
        style={{ overflow: "visible" }}
      >
        {rowsY.map((y, i) => {
          // For "in": line from (0, y) to (W, claudeY).
          // For "out": line from (0, claudeY) to (W, y).
          const x1 = 0;
          const y1 = side === "in" ? y : claudeY;
          const x2 = W;
          const y2 = side === "in" ? claudeY : y;
          // Build motion path for the flowing dot.
          const path = `M ${x1} ${y1} L ${x2} ${y2}`;
          return (
            <g key={i}>
              <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="var(--copper-500)"
                strokeWidth={0.6}
                opacity={0.55}
                vectorEffect="non-scaling-stroke"
              />
              <circle
                className="f-flow-dot"
                r={1.4}
                fill="var(--copper-100)"
                style={{
                  offsetPath: `path('${path}')`,
                  animationDelay: `${delays[i]}ms`,
                }}
                vectorEffect="non-scaling-stroke"
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// Continuous flowing-dot arrow. The arrow itself is a static horizontal line
// + arrowhead; a small copper dot loops along the line every 2s via the
// shared `f-flow-dot` keyframe (CSS Motion Path).
interface FlowArrowProps {
  length?: number;
  testId?: string;
}
function FlowArrow({ length = 48, testId }: FlowArrowProps) {
  return (
    <div
      data-testid={testId}
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: length,
      }}
      aria-hidden="true"
    >
      <svg
        width={length}
        height="20"
        viewBox={`0 0 ${length} 20`}
        style={{ overflow: "visible" }}
      >
        <line
          x1={2}
          y1={10}
          x2={length - 8}
          y2={10}
          stroke="var(--copper-500)"
          strokeWidth="1.2"
          opacity="0.7"
        />
        <polygon
          points={`${length - 2},10 ${length - 10},6 ${length - 10},14`}
          fill="var(--copper-300)"
          opacity="0.9"
        />
        <circle
          className="f-flow-dot"
          r="2"
          fill="var(--copper-200)"
          style={{
            offsetPath: `path('M 2 10 L ${length - 8} 10')`,
          }}
        />
      </svg>
    </div>
  );
}

// ───────────────────── DUAL ROLE state ─────────────────────
//
// Split visual: LEFT half "knowledge connectors" (Confluence/GDrive/DB),
// RIGHT half "tool connectors" (Email/Sheet/Message). Center MCP pillar with
// flowing dots fanning between knowledge → MCP → tools (reuses f-flow-dot).

function DualRoleState() {
  // 3 existing + 3 added per column (6 total each side).
  const knowledge = [
    { name: "Confluence", icon: "BookOpen" },
    { name: "GDrive", icon: "Folder" },
    { name: "Company DB", icon: "Database" },
    { name: "Notion", icon: "FileText" },
    { name: "SharePoint", icon: "FolderOpen" },
    { name: "Wiki", icon: "Library" },
  ];
  const tools = [
    { name: "Send email", icon: "Mail" },
    { name: "Update sheet", icon: "FileText" },
    { name: "Post message", icon: "MessageSquare" },
    { name: "Create ticket", icon: "Ticket" },
    { name: "Schedule mtg", icon: "Calendar" },
    { name: "Run report", icon: "BarChart3" },
  ];
  return (
    <div
      data-testid="f5-dual-role"
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
          gridTemplateColumns: "1fr 130px 1fr",
          gap: 10,
          // R2-10: center the CLAUDE column at the vertical midpoint of the
          // 6-card stacks on either side. Side columns size to their content
          // (knowledge / tool connector lists); center column with smaller
          // content (Arrow + CLAUDE + Arrow) now centers between them
          // instead of stretching with the row.
          alignItems: "center",
          minHeight: 0,
        }}
      >
        {/* LEFT — knowledge connectors */}
        <div
          data-testid="f5-dual-role-knowledge"
          style={{
            border: "1px solid var(--copper-700)",
            padding: "10px 10px",
            background: "rgba(184,110,61,0.04)",
            display: "flex",
            flexDirection: "column",
            gap: 6,
            minWidth: 0,
          }}
        >
          <span
            style={{
              fontFamily: "var(--mono)",
              fontSize: 10,
              letterSpacing: "0.22em",
              color: "var(--copper-200)",
              textTransform: "uppercase",
            }}
          >
            knowledge connectors
          </span>
          <div
            style={{
              fontFamily: "var(--serif)",
              fontStyle: "italic",
              fontSize: 11,
              color: "var(--neutral-300)",
              lineHeight: 1.4,
            }}
          >
            {hl("what AI reads", ["reads"])}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            {knowledge.map((k) => (
              <div
                key={k.name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "4px 7px",
                  border: "1px solid var(--copper-800)",
                }}
              >
                <LucideIcon name={k.icon} size={12} color="var(--copper-300)" />
                <span
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: 10,
                    letterSpacing: "0.16em",
                    color: "var(--neutral-200)",
                    textTransform: "uppercase",
                  }}
                >
                  {k.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CENTER — MCP protocol pillar with flowing pulse dots */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            minWidth: 0,
          }}
        >
          <FlowArrow length={70} testId="f5-dual-role-arrow-in" />
          <div
            data-testid="f5-dual-role-center-label"
            style={{
              fontFamily: "var(--mono)",
              fontSize: 12,
              letterSpacing: "0.28em",
              color: "var(--copper-100)",
              textTransform: "uppercase",
              padding: "10px 14px",
              border: "1px solid var(--copper-300)",
              background: "rgba(184,110,61,0.12)",
              boxShadow: "0 0 16px rgba(217,158,108,0.18)",
              whiteSpace: "nowrap",
            }}
          >
            CLAUDE
          </div>
          <FlowArrow length={70} testId="f5-dual-role-arrow-out" />
        </div>

        {/* RIGHT — tool connectors */}
        <div
          data-testid="f5-dual-role-tools"
          style={{
            border: "1px solid var(--copper-700)",
            padding: "10px 10px",
            background: "rgba(184,110,61,0.04)",
            display: "flex",
            flexDirection: "column",
            gap: 6,
            minWidth: 0,
          }}
        >
          <span
            style={{
              fontFamily: "var(--mono)",
              fontSize: 10,
              letterSpacing: "0.22em",
              color: "var(--copper-200)",
              textTransform: "uppercase",
            }}
          >
            tool connectors
          </span>
          <div
            style={{
              fontFamily: "var(--serif)",
              fontStyle: "italic",
              fontSize: 11,
              color: "var(--neutral-300)",
              lineHeight: 1.4,
            }}
          >
            {hl("what AI does", ["does"])}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            {tools.map((t) => (
              <div
                key={t.name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "4px 7px",
                  border: "1px solid var(--copper-800)",
                }}
              >
                <LucideIcon name={t.icon} size={12} color="var(--copper-300)" />
                <span
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: 10,
                    letterSpacing: "0.16em",
                    color: "var(--neutral-200)",
                    textTransform: "uppercase",
                  }}
                >
                  {t.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ───────────────────── WHAT MCP EXPOSES state ─────────────────────
//
// 3 cards: Resources · Tools · Prompts. Each card runs the deck-wide
// `f-card-cycle` highlight loop (left→right). The cycle duration is set to
// N seconds (N = 3 sub-cards) with per-card delay = index seconds, matching
// the unified Section F popover sub-card highlight pattern.

// R2-12: per-card illustration band keyed by card id. Mirrors F.3 card 4's
// pattern — a fixed-height region inside each exposes card holding a small
// looping illustration that semantically represents the primitive.
//   Resources → code block listing of resource URIs (data + context)
//   Tools     → typewriter showing a function call trace
//   Prompts   → code block with a templated workflow snippet
// (See `EXPOSES_ILLUSTRATIONS` map below — declared after the per-card
//  components so we don't reference identifiers before they're defined.)

function ExposesIllustrationFrame({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div
      style={{
        width: "100%",
        border: "1px dashed var(--copper-700)",
        background: "rgba(10,10,10,0.55)",
        padding: "8px 10px",
        position: "relative",
        minHeight: 72,
      }}
    >
      <span
        style={{
          position: "absolute",
          top: -7,
          left: 8,
          padding: "0 6px",
          background: "var(--neutral-950, #0d0d0d)",
          fontFamily: "var(--mono)",
          fontSize: 8.5,
          letterSpacing: "0.22em",
          color: "var(--copper-400)",
          textTransform: "uppercase",
        }}
      >
        {label}
      </span>
      {children}
    </div>
  );
}

function ResourcesIllustration() {
  // Code block: 3 resource URIs (documents, notes, records).
  return (
    <ExposesIllustrationFrame label="URIs">
      <pre
        style={{
          margin: 0,
          fontFamily: "var(--mono)",
          fontSize: 9.5,
          lineHeight: 1.5,
          color: "var(--neutral-200)",
          whiteSpace: "pre",
        }}
      >
        <span style={{ color: "var(--copper-300)" }}>doc://</span>
        wiki/onboarding.md{"\n"}
        <span style={{ color: "var(--copper-300)" }}>note://</span>
        meeting/2025-q4{"\n"}
        <span style={{ color: "var(--copper-300)" }}>rec://</span>
        crm/customer/482
      </pre>
    </ExposesIllustrationFrame>
  );
}

function ToolsIllustration() {
  // Typewriter: a function call trace cycling through tool invocations.
  return (
    <ExposesIllustrationFrame label="CALL">
      <Typewriter
        text={"send_email(to, subject, body) ✓"}
        play
        loop
        duration={1400}
        loopPauseMs={1100}
        caretStyle="thin"
        style={{
          margin: 0,
          fontFamily: "var(--mono)",
          fontSize: 9.5,
          lineHeight: 1.5,
          color: "var(--copper-100)",
          whiteSpace: "pre-wrap",
        }}
      />
    </ExposesIllustrationFrame>
  );
}

function PromptsIllustration() {
  // Code block: templated workflow with placeholder slots.
  return (
    <ExposesIllustrationFrame label="TEMPLATE">
      <pre
        style={{
          margin: 0,
          fontFamily: "var(--mono)",
          fontSize: 9.5,
          lineHeight: 1.5,
          color: "var(--neutral-200)",
          whiteSpace: "pre",
        }}
      >
        <span style={{ color: "var(--copper-400)" }}>/weekly-report</span>{"\n"}
        summarize <span style={{ color: "var(--copper-300)" }}>{"{inbox}"}</span>
        {"\n"}
        post to <span style={{ color: "var(--copper-300)" }}>{"{channel}"}</span>
      </pre>
    </ExposesIllustrationFrame>
  );
}

const EXPOSES_ILLUSTRATIONS: Record<string, () => ReactNode> = {
  resources: ResourcesIllustration,
  tools: ToolsIllustration,
  prompts: PromptsIllustration,
};

function ExposesState() {
  return (
    <div
      data-testid="f5-exposes"
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
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 12,
          minHeight: 0,
        }}
      >
        {C.exposes.map((card, i) => {
          const Illustration = EXPOSES_ILLUSTRATIONS[card.id];
          return (
            <div
              key={card.id}
              data-testid={`f5-exposes-${card.id}`}
              className="f-card-cycle"
              style={{
                padding: "14px 12px",
                display: "flex",
                flexDirection: "column",
                gap: 10,
                "--cycle-duration": `${C.exposes.length}s`,
                "--cycle-delay": `${i}s`,
              } as CSSProperties}
            >
              <span
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 11.5,
                  letterSpacing: "0.22em",
                  color: "var(--copper-100)",
                  textTransform: "uppercase",
                }}
              >
                {card.title}
              </span>
              <div
                style={{
                  height: 1,
                  width: 32,
                  background: "var(--copper-500)",
                }}
              />
              <p
                style={{
                  fontFamily: "var(--serif)",
                  fontStyle: "italic",
                  fontSize: 13,
                  lineHeight: 1.45,
                  color: "var(--neutral-200)",
                  margin: 0,
                }}
              >
                {card.bodyKw && card.bodyKw.length > 0
                  ? hl(card.body, card.bodyKw)
                  : card.body}
              </p>
              {/* R2-12: per-card illustration band — code-block or text-stream
                  picked for semantic fit with each primitive. */}
              {Illustration ? (
                <div
                  data-testid={`f5-exposes-${card.id}-illustration`}
                  style={{ marginTop: "auto", paddingTop: 6 }}
                >
                  <Illustration />
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ───────────────────── EXAMPLE state ─────────────────────
//
// "summarize my inbox at 5pm daily" — 4-step vertical flow. Each step runs
// the deck-wide `f-card-cycle` highlight loop (top→bottom). The cycle
// duration is set to N seconds (N = 4 steps) with per-step delay = index
// seconds, matching the unified Section F popover sub-card highlight pattern.
// The one-time top-to-bottom entry stagger (`f-state-reveal`) sits on a
// separate outer wrapper div so the two animations don't collide.

function ExampleState() {
  const steps = [
    { n: 1, label: "Email-MCP fetch", icon: "Inbox" },
    { n: 2, label: "filter last 24hr", icon: "Clock" },
    { n: 3, label: "summarize via Skill", icon: "Sparkles" },
    { n: 4, label: "return to user", icon: "Users" },
  ];
  return (
    <div
      data-testid="f5-example"
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
          justifyContent: "center",
          gap: 10,
          minHeight: 0,
        }}
      >
        {steps.map((s, i) => (
          <Fragment key={s.n}>
            {/* R2-13: top-to-bottom stagger reveal wrapper. Each step uses the
                shared `f-state-reveal` keyframe (translateY -8px → 0 + opacity
                0 → 1 over 0.2s var(--ease)) with a 100ms-per-index delay. The
                inner div carries the deck-wide `f-card-cycle` looping
                highlight (parameterized via --cycle-duration / --cycle-delay)
                so the one-time entry and the infinite cycle live on
                different DOM levels and don't collide. */}
            <div
              data-testid={`f5-example-step-${s.n}-reveal`}
              className="f-state-reveal"
              style={{
                animationDelay: `${i * 100}ms`,
              }}
            >
              <div
                data-testid={`f5-example-step-${s.n}`}
                className="f-card-cycle"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "10px 14px",
                  "--cycle-duration": `${steps.length}s`,
                  "--cycle-delay": `${i}s`,
                } as CSSProperties}
              >
                {/* Step number */}
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    border: "1px solid var(--copper-500)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--mono)",
                    fontSize: 11,
                    color: "var(--copper-200)",
                    background: "rgba(184,110,61,0.06)",
                    flexShrink: 0,
                  }}
                >
                  {s.n}
                </div>

                {/* Icon + label */}
                <LucideIcon name={s.icon} size={16} color="var(--copper-300)" />
                <span
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: 11,
                    letterSpacing: "0.18em",
                    color: "var(--neutral-200)",
                    textTransform: "uppercase",
                  }}
                >
                  {s.label}
                </span>
              </div>
            </div>
            {/* Downward connector except for last — also staggered into the
                top-to-bottom reveal sequence (sits between step i and i+1, so
                shares a slightly later delay than its preceding step). */}
            {i < steps.length - 1 ? (
              <div
                aria-hidden
                className="f-state-reveal"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  animationDelay: `${i * 100 + 50}ms`,
                }}
              >
                <DownArrow />
              </div>
            ) : null}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

// Small vertical copper arrow used between the 4 EXAMPLE steps.
function DownArrow(): ReactNode {
  return (
    <svg width="12" height="14" viewBox="0 0 12 14" aria-hidden>
      <line
        x1="6"
        y1="0"
        x2="6"
        y2="9"
        stroke="var(--copper-500)"
        strokeWidth="1"
      />
      <polyline
        points="2,9 6,13 10,9"
        fill="none"
        stroke="var(--copper-300)"
        strokeWidth="1"
      />
    </svg>
  );
}

// ───────────────────── slide def ─────────────────────

export const f5Slide: SlideDef = {
  steps: 2,
  canonicalPose: 1,
  animationMode: "step-reveal",
  surface: "dark",
  section: "F",
  render: () => <F5McpTheAdapter />,
};
