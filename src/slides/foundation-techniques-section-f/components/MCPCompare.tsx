// MCPCompare — F.5 right-canvas state when ◉ "API vs MCP vs CLI" facet active.
//
// Three equal-width columns (API · MCP · CLI), each with:
//   • icon (GitBranch / Plug / Terminal)
//   • mono uppercase column title
//   • copper star ★ + underline below name if this column is the `highlight`
//   • per-option illustration (code block or text-stream) — Item 16
//   • Pros: bullet list (copper-accent markers) — Item 15
//   • Cons: bullet list (dim copper text) — Item 15
//   • sublabel "best for AI agents" beneath the highlighted column
//
// The previous "click for details" hover affordance was removed in Item 15 —
// since the popover is hover-driven, "click" was misleading. The column-modal
// machinery still exists in the props shape for back-compat but is no longer
// surfaced in the UI.
//
// Per spec §3.2 `<MCPCompare highlight>` (modals retained for compatibility).
import { useState, type ReactNode } from "react";
import { highlight as hl } from "@/components/highlight";
import { LucideIcon } from "./LucideIcon";
import { Typewriter } from "./Typewriter";

export type CompareColumnId = "API" | "MCP" | "CLI";

export interface MCPCompareColumnModal {
  bullets: string[];
}

export interface MCPCompareProps {
  /** Which column to elevate with star + underline + sublabel. */
  highlight?: CompareColumnId;
  /** Per-column click-modal payloads. Retained for API compatibility; no
   *  longer rendered (the click-modal interaction was removed in Item 15). */
  modals: {
    api: MCPCompareColumnModal;
    mcp: MCPCompareColumnModal;
    cli: MCPCompareColumnModal;
  };
  /** Optional tradeoff bullet text per column. Falls back to default copy. */
  columns?: ReadonlyArray<{
    id: CompareColumnId;
    bullets: string[];
    sublabel?: string;
  }>;
}

// Fallback short tradeoff bullets per column. The legacy `bullets` field is
// no longer rendered directly — we now show Pros/Cons (below) — but we keep
// it on the type so older callers still type-check.
const DEFAULT_COLUMNS: Record<CompareColumnId, {
  bullets: string[];
  sublabel?: string;
}> = {
  API: {
    bullets: [
      "rigid contract",
      "devs lift each one",
      "low portability",
    ],
  },
  MCP: {
    bullets: [
      "standardized protocol",
      "portable across servers",
      "install once",
    ],
    sublabel: "best for AI agents",
  },
  CLI: {
    bullets: [
      "shell freedom",
      "powerful but local",
      "machine-bound",
    ],
  },
};

// ─────────────── Pros / Cons content (Item 15) ───────────────
// 3–4 bullets per list. Copper-accent markers + dim copper text.

const PROS_CONS: Record<CompareColumnId, { pros: string[]; cons: string[] }> = {
  API: {
    pros: [
      "predictable contract",
      "fine-grained control",
      "strong typing per endpoint",
      "battle-tested patterns",
    ],
    cons: [
      "each integration coded by hand",
      "rigid schema, brittle to changes",
      "bespoke auth per vendor",
      "low portability across systems",
    ],
  },
  MCP: {
    pros: [
      "one protocol, many servers",
      "install once, reuse everywhere",
      "scoped permissions at boundary",
      "swap servers without rewriting",
    ],
    cons: [
      "small protocol overhead",
      "still maturing ecosystem",
      "depends on quality of server",
    ],
  },
  CLI: {
    pros: [
      "maximum shell freedom",
      "wraps existing tools quickly",
      "ergonomic for power users",
      "no extra protocol layer",
    ],
    cons: [
      "machine-bound — local only",
      "broad blast radius if mis-prompted",
      "hard to audit cleanly",
      "per-call shell spin-up cost",
    ],
  },
};

const ICONS: Record<CompareColumnId, string> = {
  API: "GitBranch",
  MCP: "Plug",
  CLI: "Terminal",
};

const ORDER: CompareColumnId[] = ["API", "MCP", "CLI"];

// ─────────────── Per-column illustration (Item 16) ───────────────
//
// Each column gets a small framed illustration that visually represents
// what the option *is*, so all 3 cards do not look identical:
//   • API → code block (HTTP request snippet — the bespoke contract feel)
//   • MCP → text-stream typewriter (server name streaming in, “install once”
//          ergonomic feel)
//   • CLI → code block (shell prompt — wrapping local tools)

function ApiIllustration() {
  return (
    <IllustrationFrame label="HTTP">
      <pre
        style={{
          margin: 0,
          fontFamily: "var(--mono)",
          fontSize: 9.5,
          lineHeight: 1.45,
          color: "var(--neutral-200)",
          whiteSpace: "pre",
        }}
      >
        <span style={{ color: "var(--copper-300)" }}>POST</span>{" "}
        /v1/calendar/event{"\n"}
        <span style={{ color: "var(--copper-400)" }}>Auth:</span>{" "}
        Bearer ••••{"\n"}
        <span style={{ color: "var(--copper-400)" }}>Body:</span>{" "}
        {"{ \"title\":… }"}
      </pre>
    </IllustrationFrame>
  );
}

function McpIllustration() {
  return (
    <IllustrationFrame label="STREAM">
      <Typewriter
        text={"mcp connect calendar-server ✓"}
        play
        loop
        duration={1400}
        loopPauseMs={1200}
        caretStyle="thin"
        style={{
          margin: 0,
          fontFamily: "var(--mono)",
          fontSize: 9.5,
          lineHeight: 1.45,
          color: "var(--copper-100)",
          whiteSpace: "pre-wrap",
        }}
      />
    </IllustrationFrame>
  );
}

function CliIllustration() {
  return (
    <IllustrationFrame label="SHELL">
      <pre
        style={{
          margin: 0,
          fontFamily: "var(--mono)",
          fontSize: 9.5,
          lineHeight: 1.45,
          color: "var(--neutral-200)",
          whiteSpace: "pre",
        }}
      >
        <span style={{ color: "var(--copper-300)" }}>$</span> cal add{" "}
        <span style={{ color: "var(--copper-400)" }}>--title</span> "…"{"\n"}
        <span style={{ color: "var(--copper-300)" }}>$</span> mail send{" "}
        <span style={{ color: "var(--copper-400)" }}>--to</span> a@b
      </pre>
    </IllustrationFrame>
  );
}

interface IllustrationFrameProps {
  label: string;
  children: ReactNode;
}
function IllustrationFrame({ label, children }: IllustrationFrameProps) {
  return (
    <div
      style={{
        width: "100%",
        border: "1px dashed var(--copper-700)",
        background: "rgba(10,10,10,0.55)",
        padding: "6px 8px",
        position: "relative",
        minHeight: 56,
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

const ILLUSTRATIONS: Record<CompareColumnId, () => ReactNode> = {
  API: ApiIllustration,
  MCP: McpIllustration,
  CLI: CliIllustration,
};

// ─────────────── ProsConsList ───────────────

interface ProsConsListProps {
  label: "Pros" | "Cons";
  items: string[];
}
function ProsConsList({ label, items }: ProsConsListProps) {
  const isPros = label === "Pros";
  return (
    <div
      data-testid={`f-mcp-compare-${label.toLowerCase()}`}
      style={{ display: "flex", flexDirection: "column", gap: 3 }}
    >
      <span
        style={{
          fontFamily: "var(--mono)",
          fontSize: 9,
          letterSpacing: "0.24em",
          color: "var(--copper-200)",
          textTransform: "uppercase",
        }}
      >
        {label}
      </span>
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {items.map((b, i) => (
          <li
            key={i}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 6,
              fontFamily: "var(--serif)",
              fontStyle: "italic",
              fontSize: 11,
              lineHeight: 1.35,
              color: isPros ? "var(--neutral-200)" : "var(--copper-400)",
            }}
          >
            <span
              aria-hidden
              style={{
                color: "var(--copper-300)",
                fontFamily: "var(--mono)",
                fontSize: 10,
                lineHeight: 1.35,
                flexShrink: 0,
                marginTop: 1,
              }}
            >
              {isPros ? "+" : "–"}
            </span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ───────────────────────── MCPCompare ─────────────────────────

export function MCPCompare({
  highlight,
  modals: _modals,
  columns,
}: MCPCompareProps): ReactNode {
  const [hoverCol, setHoverCol] = useState<CompareColumnId | null>(null);

  // Build resolved per-column data (merge defaults with caller override).
  const resolved: Record<CompareColumnId, {
    bullets: string[];
    sublabel?: string;
  }> = {
    API: { ...DEFAULT_COLUMNS.API },
    MCP: { ...DEFAULT_COLUMNS.MCP },
    CLI: { ...DEFAULT_COLUMNS.CLI },
  };
  if (columns) {
    for (const c of columns) {
      resolved[c.id] = { bullets: c.bullets, sublabel: c.sublabel };
    }
  }

  return (
    <div
      data-testid="f-mcp-compare"
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "12px 8px",
      }}
    >
      {/* Section header */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: 16,
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
          three ways AI talks to your systems
        </span>
        <div
          style={{
            height: 1,
            width: "32%",
            background: "var(--copper-700)",
            marginTop: 8,
          }}
        />
      </div>

      {/* Three columns */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 12,
          alignItems: "stretch",
        }}
      >
        {ORDER.map((id) => {
          const col = resolved[id];
          const isHighlight = highlight === id;
          const isHover = hoverCol === id;
          const Illustration = ILLUSTRATIONS[id];
          const pc = PROS_CONS[id];
          return (
            <div
              key={id}
              data-testid={`f-mcp-compare-col-${id}`}
              data-active={isHover ? "true" : "false"}
              data-highlight={isHighlight ? "true" : "false"}
              onMouseEnter={() => setHoverCol(id)}
              onMouseLeave={() => setHoverCol(null)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "stretch",
                gap: 8,
                padding: "12px 10px 12px",
                border: "1px solid",
                borderColor: isHover
                  ? "var(--copper-200)"
                  : isHighlight
                  ? "var(--copper-500)"
                  : "var(--copper-800)",
                background: isHover
                  ? "rgba(184,110,61,0.08)"
                  : isHighlight
                  ? "rgba(184,110,61,0.04)"
                  : "transparent",
                transition:
                  "border-color 0.2s var(--ease), background 0.2s var(--ease)",
              }}
            >
              {/* Header row — icon + name + (★ if highlighted) */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                }}
              >
                <LucideIcon
                  name={ICONS[id]}
                  size={18}
                  color={
                    isHighlight ? "var(--copper-200)" : "var(--copper-400)"
                  }
                />
                <span
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: 13,
                    letterSpacing: "0.22em",
                    color: isHighlight
                      ? "var(--copper-100)"
                      : "var(--neutral-200)",
                    textTransform: "uppercase",
                  }}
                >
                  {id}
                </span>
                {isHighlight ? (
                  <span
                    aria-hidden
                    style={{
                      color: "var(--copper-200)",
                      fontSize: 13,
                      lineHeight: 1,
                    }}
                  >
                    ★
                  </span>
                ) : null}
              </div>

              {/* R2-11: copper underline beneath the highlighted column
                  title was removed — the star + border treatment is enough
                  to signal "best for AI agents" without a redundant rule. */}

              {/* Per-option illustration */}
              <div style={{ marginTop: 2 }}>
                <Illustration />
              </div>

              {/* Pros / Cons */}
              <ProsConsList label="Pros" items={pc.pros} />
              <ProsConsList label="Cons" items={pc.cons} />

              {/* Spacer + sublabel */}
              <div style={{ flex: 1 }} />
              {isHighlight && col.sublabel ? (
                <div
                  style={{
                    fontFamily: "var(--serif)",
                    fontStyle: "italic",
                    fontSize: 12,
                    color: "var(--copper-200)",
                    marginTop: 4,
                    textAlign: "center",
                  }}
                >
                  {hl(col.sublabel, ["AI agents"])}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
