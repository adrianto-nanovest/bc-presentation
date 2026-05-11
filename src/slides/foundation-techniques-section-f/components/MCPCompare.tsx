// MCPCompare — F.5 right-canvas state when ◉ "API vs MCP vs CLI" facet active.
//
// Three equal-width columns (API · MCP · CLI), each with:
//   • icon (GitBranch / Plug / Terminal)
//   • mono uppercase column title
//   • copper star ★ + underline below name if this column is the `highlight`
//   • italic-serif tradeoff bullets (3-4 short lines)
//   • sublabel "best for AI agents" beneath the highlighted column (copper-200)
//
// Each column is hoverable (border shifts to copper-200, faint bg tint) and
// clickable. Click opens a local `<ColumnModal>` overlay with the column's
// detailed tradeoff breakdown (Rigidity / Portability / Security / Dev-effort
// / Runtime-cost) rendered as serif bullets.
//
// Per spec §3.2 `<MCPCompare highlight>` and §8.6 click-modal behavior.
import { useState, type ReactNode } from "react";
import { highlight as hl } from "@/components/highlight";
import { LucideIcon } from "./LucideIcon";

export type CompareColumnId = "API" | "MCP" | "CLI";

export interface MCPCompareColumnModal {
  bullets: string[];
}

export interface MCPCompareProps {
  /** Which column to elevate with star + underline + sublabel. */
  highlight?: CompareColumnId;
  /** Per-column click-modal payloads. */
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

// Fallback short tradeoff bullets per column (italic serif). Matches spec
// §8.4 essence copy when caller doesn't override.
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

const ICONS: Record<CompareColumnId, string> = {
  API: "GitBranch",
  MCP: "Plug",
  CLI: "Terminal",
};

const ORDER: CompareColumnId[] = ["API", "MCP", "CLI"];

// ───────────────────────── ColumnModal ─────────────────────────
//
// Local overlay component. Fixed-positioned backdrop rgba(0,0,0,0.7) +
// centered card. Close on backdrop click, close button, or Escape.
interface ColumnModalProps {
  open: boolean;
  onClose: () => void;
  column: CompareColumnId;
  bullets: string[];
}

function ColumnModal({ open, onClose, column, bullets }: ColumnModalProps) {
  if (!open) return null;

  // Try to split each bullet on the first colon → label + body, so the
  // tradeoff axes (Rigidity / Portability / etc.) render as a copper-mono
  // label with a serif body line. If no colon, render the whole line as body.
  const rows = bullets.map((b) => {
    const colonIdx = b.indexOf(":");
    if (colonIdx === -1) return { label: "", body: b };
    return {
      label: b.slice(0, colonIdx).trim(),
      body: b.slice(colonIdx + 1).trim(),
    };
  });

  return (
    <div
      data-testid={`f-mcp-compare-modal-${column}`}
      onClick={onClose}
      style={{
        position: "absolute",
        inset: 0,
        background: "rgba(0,0,0,0.7)",
        backdropFilter: "blur(2px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 20,
        cursor: "pointer",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 480,
          maxWidth: "92%",
          background: "var(--neutral-950, #0d0d0d)",
          border: "1px solid var(--copper-700)",
          padding: "24px 28px",
          cursor: "default",
          boxShadow: "0 12px 48px rgba(0,0,0,0.6)",
        }}
      >
        {/* Header row: mono title + close button */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 14,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <LucideIcon name={ICONS[column]} size={18} />
            <span
              style={{
                fontFamily: "var(--mono)",
                fontSize: 13,
                letterSpacing: "0.22em",
                color: "var(--copper-200)",
                textTransform: "uppercase",
              }}
            >
              {column} · tradeoffs
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            style={{
              fontFamily: "var(--mono)",
              fontSize: 14,
              background: "transparent",
              color: "var(--neutral-400)",
              border: "1px solid var(--copper-800)",
              padding: "2px 10px",
              cursor: "pointer",
              lineHeight: 1.2,
            }}
          >
            ×
          </button>
        </div>

        {/* Copper rule under header */}
        <div
          style={{
            height: 1,
            width: "30%",
            background: "var(--copper-700)",
            marginBottom: 18,
          }}
        />

        {/* Tradeoff rows */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {rows.map((r, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column" }}>
              {r.label ? (
                <span
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: 10,
                    letterSpacing: "0.22em",
                    color: "var(--copper-300)",
                    textTransform: "uppercase",
                    marginBottom: 2,
                  }}
                >
                  {r.label}
                </span>
              ) : null}
              <span
                style={{
                  fontFamily: "var(--serif)",
                  fontStyle: "italic",
                  fontSize: 14,
                  lineHeight: 1.5,
                  color: "var(--neutral-200)",
                }}
              >
                {r.body}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ───────────────────────── MCPCompare ─────────────────────────

export function MCPCompare({
  highlight,
  modals,
  columns,
}: MCPCompareProps): ReactNode {
  const [hoverCol, setHoverCol] = useState<CompareColumnId | null>(null);
  const [openCol, setOpenCol] = useState<CompareColumnId | null>(null);

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

  const modalsByCol: Record<CompareColumnId, MCPCompareColumnModal> = {
    API: modals.api,
    MCP: modals.mcp,
    CLI: modals.cli,
  };

  return (
    <div
      data-testid="f-mcp-compare"
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "20px 8px",
      }}
    >
      {/* Section header */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: 28,
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
            marginTop: 10,
          }}
        />
      </div>

      {/* Three columns */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 16,
          alignItems: "stretch",
        }}
      >
        {ORDER.map((id) => {
          const col = resolved[id];
          const isHighlight = highlight === id;
          const isHover = hoverCol === id;
          return (
            <div
              key={id}
              data-testid={`f-mcp-compare-col-${id}`}
              data-active={isHover ? "true" : "false"}
              data-highlight={isHighlight ? "true" : "false"}
              onMouseEnter={() => setHoverCol(id)}
              onMouseLeave={() => setHoverCol(null)}
              onClick={() => setOpenCol(id)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 10,
                padding: "16px 12px 18px",
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
                cursor: "pointer",
                minHeight: 220,
              }}
            >
              {/* Icon row */}
              <div style={{ marginTop: 4 }}>
                <LucideIcon
                  name={ICONS[id]}
                  size={26}
                  color={
                    isHighlight ? "var(--copper-200)" : "var(--copper-400)"
                  }
                />
              </div>

              {/* Column name */}
              <div
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 14,
                  letterSpacing: "0.22em",
                  color: isHighlight
                    ? "var(--copper-100)"
                    : "var(--neutral-200)",
                  textTransform: "uppercase",
                  marginTop: 2,
                }}
              >
                {id}
              </div>

              {/* Star + underline if highlighted */}
              {isHighlight ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 4,
                    marginTop: 2,
                  }}
                >
                  <span
                    style={{
                      color: "var(--copper-200)",
                      fontSize: 14,
                      lineHeight: 1,
                    }}
                  >
                    ★
                  </span>
                  <div
                    style={{
                      width: 40,
                      height: 1,
                      background: "var(--copper-300)",
                    }}
                  />
                </div>
              ) : (
                // Maintain vertical rhythm across columns
                <div style={{ height: 19 }} />
              )}

              {/* Tradeoff bullets — italic serif */}
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: "8px 0 0",
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                  textAlign: "center",
                }}
              >
                {col.bullets.map((b, i) => (
                  <li
                    key={i}
                    style={{
                      fontFamily: "var(--serif)",
                      fontStyle: "italic",
                      fontSize: 13,
                      lineHeight: 1.45,
                      color: "var(--neutral-300)",
                    }}
                  >
                    {b}
                  </li>
                ))}
              </ul>

              {/* Spacer to push sublabel to bottom */}
              <div style={{ flex: 1 }} />

              {/* Sublabel — only on highlighted column */}
              {isHighlight && col.sublabel ? (
                <div
                  style={{
                    fontFamily: "var(--serif)",
                    fontStyle: "italic",
                    fontSize: 13,
                    color: "var(--copper-200)",
                    marginTop: 8,
                    textAlign: "center",
                  }}
                >
                  {hl(col.sublabel, ["AI agents"])}
                </div>
              ) : null}

              {/* Click-to-expand hint */}
              <span
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 9,
                  letterSpacing: "0.2em",
                  color: "var(--copper-500)",
                  textTransform: "uppercase",
                  marginTop: 6,
                  opacity: isHover ? 1 : 0.55,
                  transition: "opacity 0.2s var(--ease)",
                }}
              >
                click for details
              </span>
            </div>
          );
        })}
      </div>

      <ColumnModal
        open={openCol !== null}
        onClose={() => setOpenCol(null)}
        column={openCol ?? "MCP"}
        bullets={openCol ? modalsByCol[openCol].bullets : []}
      />
    </div>
  );
}
