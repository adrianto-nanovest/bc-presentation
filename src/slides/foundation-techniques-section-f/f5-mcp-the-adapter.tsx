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
import type { ReactNode } from "react";
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
import { f5Content as C } from "./content";

// ───────────────────── shared layout constants (F-section canonical) ─────────────────────
const PANE_TOP = 156;
const PANE_BOTTOM = 80;
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
  const effectiveFacet = hoverEnabled ? activeFacet : null;

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
        data-testid="f5-right-pane"
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
            top border exactly. Padding 16px matches the bordered box's gutter. */}
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

// ───────────────────── shared sub-section header ─────────────────────
//
// Used by every facet hover state to label the illustration. Mono uppercase
// label + italic serif caption underneath. Sits at the top of each state.

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

// ───────────────────── WHAT IT IS state — USB analogy ─────────────────────
//
// USB icon → Claude hub → fanout to 6 connector pills. Pills take turns
// brightening on a 3.6s loop via the shared f-pill-pulse-1..6 keyframes
// (added to globals.css for F.5; sibling family of f-row-pulse and
// f-cake-shimmer). 600ms per pill, 6 pills.

const USB_PULSE_CLASSES = [
  "f-pill-pulse-1",
  "f-pill-pulse-2",
  "f-pill-pulse-3",
  "f-pill-pulse-4",
  "f-pill-pulse-5",
  "f-pill-pulse-6",
] as const;

function UsbAnalogyState() {
  const connectors = [
    { name: "Calendar", icon: "Calendar" },
    { name: "DB", icon: "Database" },
    { name: "Files", icon: "Folder" },
    { name: "Email", icon: "Mail" },
    { name: "Slack", icon: "MessageSquare" },
    { name: "...", icon: "Plug" },
  ];

  return (
    <div
      data-testid="f5-what-it-is"
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
        caption="USB for AI — one plug into many systems"
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
        {/* Top row: USB → Claude */}
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
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
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(184,110,61,0.06)",
              }}
            >
              <LucideIcon name="Usb" size={32} color="var(--copper-200)" />
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
              MCP
            </span>
          </div>

          <FlowArrow length={64} testId="f5-usb-arrow" />

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
                height: 64,
                border: "1px solid var(--copper-300)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(184,110,61,0.1)",
              }}
            >
              <LucideIcon name="Bot" size={30} color="var(--copper-100)" />
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
              Claude
            </span>
          </div>
        </div>

        {/* Fanout label */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginTop: -4,
          }}
        >
          <span
            style={{
              fontFamily: "var(--mono)",
              fontSize: 10,
              letterSpacing: "0.2em",
              color: "var(--copper-400)",
              textTransform: "uppercase",
            }}
          >
            fanout
          </span>
          <div
            style={{
              width: 1,
              height: 24,
              background: "var(--copper-600)",
            }}
          />
        </div>

        {/* Connector grid — 6 pills, sequential pulse */}
        <div
          data-testid="f5-usb-connectors"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 12,
            width: "82%",
          }}
        >
          {connectors.map((c, i) => (
            <div
              key={c.name}
              data-testid={`f5-usb-pill-${i}`}
              className={USB_PULSE_CLASSES[i]}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 12px",
                border: "1px solid var(--copper-800)",
                background: "rgba(184,110,61,0.03)",
              }}
            >
              <LucideIcon name={c.icon} size={16} color="var(--copper-300)" />
              <span
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 11,
                  letterSpacing: "0.18em",
                  color: "var(--neutral-200)",
                  textTransform: "uppercase",
                }}
              >
                {c.name}
              </span>
            </div>
          ))}
        </div>
      </div>
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
  const knowledge = [
    { name: "Confluence", icon: "BookOpen" },
    { name: "GDrive", icon: "Folder" },
    { name: "Company DB", icon: "Database" },
  ];
  const tools = [
    { name: "Send email", icon: "Mail" },
    { name: "Update sheet", icon: "FileText" },
    { name: "Post message", icon: "MessageSquare" },
  ];
  return (
    <div
      data-testid="f5-dual-role"
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
        label="DUAL ROLE"
        caption="one protocol, two roles — read and do"
      />

      <div
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "1fr 110px 1fr",
          gap: 12,
          alignItems: "stretch",
          minHeight: 0,
        }}
      >
        {/* LEFT — knowledge connectors */}
        <div
          data-testid="f5-dual-role-knowledge"
          style={{
            border: "1px solid var(--copper-700)",
            padding: "12px 12px",
            background: "rgba(184,110,61,0.04)",
            display: "flex",
            flexDirection: "column",
            gap: 10,
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
              fontSize: 12,
              color: "var(--neutral-300)",
              lineHeight: 1.4,
            }}
          >
            {hl("what AI reads", ["reads"])}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {knowledge.map((k) => (
              <div
                key={k.name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "6px 8px",
                  border: "1px solid var(--copper-800)",
                }}
              >
                <LucideIcon name={k.icon} size={14} color="var(--copper-300)" />
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
            style={{
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
              fontFamily: "var(--mono)",
              fontSize: 11,
              letterSpacing: "0.3em",
              color: "var(--copper-200)",
              textTransform: "uppercase",
              padding: "16px 4px",
              border: "1px solid var(--copper-500)",
              background: "rgba(184,110,61,0.08)",
            }}
          >
            MCP protocol
          </div>
          <FlowArrow length={70} testId="f5-dual-role-arrow-out" />
        </div>

        {/* RIGHT — tool connectors */}
        <div
          data-testid="f5-dual-role-tools"
          style={{
            border: "1px solid var(--copper-700)",
            padding: "12px 12px",
            background: "rgba(184,110,61,0.04)",
            display: "flex",
            flexDirection: "column",
            gap: 10,
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
              fontSize: 12,
              color: "var(--neutral-300)",
              lineHeight: 1.4,
            }}
          >
            {hl("what AI does", ["does"])}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {tools.map((t) => (
              <div
                key={t.name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "6px 8px",
                  border: "1px solid var(--copper-800)",
                }}
              >
                <LucideIcon name={t.icon} size={14} color="var(--copper-300)" />
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
// 3 cards: Resources · Tools · Prompts. Each card pulses in sequence on a
// 2.5s loop using the shared `f-seq-pulse-1/2/3` keyframes (same family as
// F.2 HOW IT WORKS pipeline). Mono header + italic serif body.

const EXPOSES_PULSE_CLASSES = [
  "f-seq-pulse-1",
  "f-seq-pulse-2",
  "f-seq-pulse-3",
] as const;

function ExposesState() {
  return (
    <div
      data-testid="f5-exposes"
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
        label="WHAT MCP EXPOSES"
        caption="resources · tools · prompts"
      />

      <div
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 12,
          minHeight: 0,
        }}
      >
        {C.exposes.map((card, i) => (
          <div
            key={card.id}
            data-testid={`f5-exposes-${card.id}`}
            className={EXPOSES_PULSE_CLASSES[i]}
            style={{
              border: "1px solid var(--copper-700)",
              background: "rgba(184,110,61,0.04)",
              padding: "14px 12px",
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
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
          </div>
        ))}
      </div>
    </div>
  );
}

// ───────────────────── EXAMPLE state ─────────────────────
//
// "summarize my inbox at 5pm daily" — 4-step vertical flow. Each step pulses
// in turn on a ~4s loop using the shared `f-row-pulse-1..4` keyframes (same
// family as F.2 WHEN TO REACH matrix). 1s per step.

const EXAMPLE_PULSE_CLASSES = [
  "f-row-pulse-1",
  "f-row-pulse-2",
  "f-row-pulse-3",
  "f-row-pulse-4",
] as const;

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
        padding: "8px 12px",
        gap: 14,
      }}
    >
      <FacetHeader
        label="EXAMPLE · daily inbox"
        caption="“summarize my inbox at 5pm daily”"
      />

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
            <div
              data-testid={`f5-example-step-${s.n}`}
              className={EXAMPLE_PULSE_CLASSES[i]}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                border: "1px solid var(--copper-700)",
                background: "rgba(10,10,10,0.6)",
                padding: "10px 14px",
              }}
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
            {/* Downward connector except for last */}
            {i < steps.length - 1 ? (
              <div
                aria-hidden
                style={{
                  display: "flex",
                  justifyContent: "center",
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
