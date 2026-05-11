// F.5 — THE ADAPTER (MCP)
//
// Spec §8. 5-facet left menu + right detail canvas with USB-analogy default
// state. Hover facet → canvas crossfades:
//   ◉ DUAL ROLE            split visual (knowledge connectors | tool connectors)
//   ◉ API vs MCP vs CLI    `<MCPCompare>` 3-column compare + per-column click-modal
//   ◉ WHAT MCP EXPOSES     3 cards (Resources / Tools / Prompts)
//   ◉ EXAMPLE              4-step inbox-summary flow
//
// Step reveal:
//   0   title + facet header + copper rule; default canvas at 0.5 opacity
//   1–5 facet items 1–5 cascade (FacetMenu handles via showCards gate)
//   6   footer reveals; default canvas brightens to opacity 1
//
// Canonical pose = 5 (per spec §8.7 — DUAL ROLE active, most teaching-loaded).
//
// Layout: E.8-style 480/660 split. FigLabel · headline · FacetMenu · DetailCanvas.
import { useState } from "react";
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { highlight as hl } from "@/components/highlight";
import { FacetMenu } from "./components/FacetMenu";
import { DetailCanvas } from "./components/DetailCanvas";
import { LucideIcon } from "./components/LucideIcon";
import { Reveal } from "./components/Reveal";
import {
  MCPCompare,
  type CompareColumnId,
} from "./components/MCPCompare";
import { f5Content as C } from "./content";

// ───────────────────────── default canvas: USB analogy ─────────────────────────
//
// Simple SVG illustration: USB icon → Claude hub → fanout to 6 connector
// pills (Calendar / DB / Files / Email / Slack / +). Uses copper accent.
function UsbAnalogyState({ bright }: { bright: boolean }) {
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
      data-testid="f5-default-canvas"
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 26,
        opacity: bright ? 1 : 0.5,
        transition: "opacity 700ms var(--ease)",
        padding: "20px 8px",
      }}
    >
      <div
        style={{
          fontFamily: "var(--serif)",
          fontStyle: "italic",
          fontSize: 22,
          color: "var(--copper-200)",
          letterSpacing: 0.2,
        }}
      >
        “USB for AI”
      </div>

      {/* Top row: USB → Claude */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 18,
        }}
      >
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

        <Arrow length={64} />

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

      {/* Fanout arrow row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginTop: -8,
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

      {/* Connector grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 12,
          width: "82%",
        }}
      >
        {connectors.map((c) => (
          <div
            key={c.name}
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
  );
}

// Tiny horizontal copper arrow used in the USB / EXAMPLE flow diagrams.
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

// ───────────────────────── DUAL ROLE state ─────────────────────────
//
// Split visual: LEFT half "knowledge connectors" (Confluence/GDrive/DB),
// RIGHT half "tool connectors" (Email/Sheet/Message). Mono copper center
// label "MCP protocol".
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
        alignItems: "center",
        justifyContent: "center",
        gap: 18,
        padding: "16px 8px",
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
        one protocol · two roles
      </span>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          gap: 16,
          alignItems: "stretch",
          width: "100%",
          padding: "0 8px",
        }}
      >
        {/* LEFT — knowledge connectors */}
        <div
          style={{
            border: "1px solid var(--copper-700)",
            padding: "16px 14px",
            background: "rgba(184,110,61,0.04)",
            display: "flex",
            flexDirection: "column",
            gap: 12,
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

        {/* CENTER — MCP protocol pillar */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            minWidth: 90,
          }}
        >
          <Arrow length={40} />
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
          <Arrow length={40} />
        </div>

        {/* RIGHT — tool connectors */}
        <div
          style={{
            border: "1px solid var(--copper-700)",
            padding: "16px 14px",
            background: "rgba(184,110,61,0.04)",
            display: "flex",
            flexDirection: "column",
            gap: 12,
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

// ───────────────────────── WHAT MCP EXPOSES state ─────────────────────────
//
// 3 cards: Resources · Tools · Prompts. Mono header + italic serif body.
function ExposesState() {
  return (
    <div
      data-testid="f5-exposes"
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
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <span
          style={{
            fontFamily: "var(--mono)",
            fontSize: 11,
            letterSpacing: "0.24em",
            color: "var(--copper-300)",
            textTransform: "uppercase",
          }}
        >
          what MCP exposes
        </span>
        <div
          style={{
            height: 1,
            width: 60,
            background: "var(--copper-700)",
            marginTop: 10,
          }}
        />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 14,
          width: "100%",
        }}
      >
        {C.exposes.map((card) => (
          <div
            key={card.id}
            data-testid={`f5-exposes-${card.id}`}
            style={{
              border: "1px solid var(--copper-600)",
              background: "rgba(184,110,61,0.04)",
              padding: "16px 14px",
              display: "flex",
              flexDirection: "column",
              gap: 10,
              minHeight: 170,
            }}
          >
            <span
              style={{
                fontFamily: "var(--mono)",
                fontSize: 12,
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
                fontSize: 14,
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

// ───────────────────────── EXAMPLE state ─────────────────────────
//
// "summarize my inbox at 5pm daily" — 4-step horizontal arrow flow.
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
        alignItems: "center",
        justifyContent: "center",
        gap: 24,
        padding: "20px 8px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
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
          example flow
        </span>
        <div
          style={{
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontSize: 18,
            color: "var(--copper-200)",
          }}
        >
          “{hl("summarize my inbox", ["summarize my inbox"])} at 5pm daily”
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 14,
          width: "92%",
        }}
      >
        {steps.map((s, i) => (
          <div
            key={s.n}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
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

            {/* Step pill */}
            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                gap: 10,
                border: "1px solid var(--copper-700)",
                background: "rgba(184,110,61,0.03)",
                padding: "8px 14px",
              }}
            >
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

            {/* Down arrow connector except for last */}
            {i < steps.length - 1 ? (
              <div
                style={{
                  width: 18,
                  display: "flex",
                  justifyContent: "center",
                }}
              />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

// ───────────────────────── slide ─────────────────────────

export function F5McpTheAdapter() {
  const { stepIndex } = useDeck();

  // Step gates per spec §8.5
  const showCards = stepIndex >= 1;
  const showFooter = stepIndex >= 6;
  const canvasBright = stepIndex >= 6;

  const [activeFacet, setActiveFacet] = useState<string | null>(null);

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

      {/* LEFT — facet menu */}
      <Reveal on={stepIndex >= 0}>
        <FacetMenu
          items={C.facets.map((f) => ({
            id: f.id,
            title: f.title,
            essence: f.essence,
            essenceKw: f.essenceKw,
            icon: f.icon,
          }))}
          activeFacet={activeFacet}
          onHover={setActiveFacet}
          showCards={showCards}
          header={C.header}
          footer={C.footer}
          footerKw={[...C.footerKw]}
          showFooter={showFooter}
        />
      </Reveal>

      {/* RIGHT — detail canvas (USB default + 4 hover states) */}
      <div
        data-testid="f5-right-pane"
        style={{
          position: "absolute",
          right: 48,
          top: 156,
          width: 660,
          bottom: 80,
        }}
      >
        <DetailCanvas
          activeFacet={activeFacet}
          defaultState={<UsbAnalogyState bright={canvasBright} />}
          states={{
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
    </>
  );
}

// ───────────────────────── slide def ─────────────────────────

export const f5Slide: SlideDef = {
  steps: 7,
  canonicalPose: 5,
  animationMode: "step-reveal",
  surface: "dark",
  section: "F",
  render: () => <F5McpTheAdapter />,
};
