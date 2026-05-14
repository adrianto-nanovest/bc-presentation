// F.8 — ConnectorsPanel (Task #11)
//
// 4×2 grid of 8 connector tiles. 7 are "connected" (copper-200 status pill);
// Linear is "not connected" (copper-700 outlined "+ ADD" pill). Each tile
// hovers up a CSS-only popover anchored ABOVE the tile describing what
// actions are permitted. Brand glyph is plain wordmark text — no SVGs.
//
// Spec refs: §4.6 panel layout, §6.4 hover-popover pattern, §7.1 colors.
import { highlight } from "../../../../components/highlight";

export interface ConnectorItem {
  readonly id: string;
  readonly name: string;
  readonly sublabel: string;
  readonly lastUsed: string;
  readonly connected: boolean;
  readonly popover: string;
  readonly kw?: readonly string[];
}

export interface ConnectorsPanelProps {
  connectors: readonly ConnectorItem[];
}

const PILL_BASE = {
  padding: "1px 7px",
  fontFamily: "var(--mono)",
  fontSize: 9,
  letterSpacing: "0.16em",
} as const;

export function ConnectorsPanel({ connectors }: ConnectorsPanelProps) {
  return (
    <div
      data-testid="connectors-panel"
      role="tabpanel"
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 12,
        gap: 8,
        height: "100%",
        boxSizing: "border-box",
      }}
    >
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          type="button"
          data-testid="connectors-add-btn"
          className="f8-add-btn"
          style={{
            fontFamily: "var(--mono)",
            fontSize: 10,
            padding: "4px 10px",
            background: "transparent",
            border: "1px solid var(--copper-700)",
            borderRadius: 4,
            color: "var(--copper-200)",
            cursor: "pointer",
            letterSpacing: "0.12em",
            fontWeight: 500,
          }}
        >
          + NEW CONNECTOR
        </button>
      </div>
      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gridTemplateRows: "repeat(2, 1fr)",
          gap: 12,
        }}
      >
        {connectors.map((c) => (
        <button
          key={c.id}
          type="button"
          className="f8-connector-tile"
          aria-label={`${c.name} — ${c.connected ? "connected" : "not connected"}`}
          style={{
            position: "relative",
            width: 210,
            height: 120,
            background: "var(--neutral-900)",
            border: "1px solid var(--copper-800)",
            padding: "10px 12px",
            display: "flex",
            flexDirection: "column",
            cursor: "default",
            transition: "border-color 0.18s var(--ease), box-shadow 0.18s var(--ease)",
            font: "inherit",
            color: "inherit",
            textAlign: "left",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ flex: 1 }} />
            {c.connected ? (
              <span
                style={{ ...PILL_BASE, background: "var(--copper-200)", color: "var(--neutral-950)" }}
              >
                ✓ CONNECTED
              </span>
            ) : (
              <span
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 9,
                  padding: "1px 8px",
                  background: "transparent",
                  border: "1px solid var(--copper-700)",
                  color: "var(--copper-200)",
                  borderRadius: 2,
                  letterSpacing: "0.12em",
                }}
              >
                Authenticate
              </span>
            )}
          </div>
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "var(--mono)",
              fontSize: 16,
              fontWeight: 600,
              color: "var(--copper-200)",
              letterSpacing: 0,
              textAlign: "center",
              lineHeight: 1,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "100%",
            }}
          >
            {c.name}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 2, alignItems: "flex-start" }}>
            <span style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 11, color: "var(--copper-300)" }}>
              {c.sublabel}
            </span>
            <span style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 10, color: "var(--neutral-400)" }}>
              {c.lastUsed}
            </span>
          </div>
          <div
            className="f8-connector-popover"
            role="tooltip"
            style={{
              position: "absolute",
              bottom: "calc(100% + 8px)",
              left: "50%",
              transform: "translateX(-50%)",
              width: 220,
              padding: "10px 12px",
              background: "var(--neutral-900)",
              border: "1px solid var(--copper-700)",
              boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
              fontFamily: "var(--serif)",
              fontStyle: "italic",
              fontSize: 11.5,
              lineHeight: 1.45,
              color: "var(--neutral-200)",
              opacity: 0,
              pointerEvents: "none",
              transition: "opacity 0.18s var(--ease)",
              zIndex: 20,
            }}
          >
            {c.kw && c.kw.length > 0 ? highlight(c.popover, c.kw) : c.popover}
          </div>
        </button>
        ))}
      </div>
      <style>{`
        .f8-connector-tile:hover { border-color: var(--copper-200); box-shadow: 0 0 0 1px var(--copper-200), 0 0 16px rgba(184,110,61,0.12); }
        .f8-connector-tile:hover .f8-connector-popover { opacity: 1; }
        .f8-add-btn:hover { border-color: var(--copper-200); color: var(--copper-100); }
      `}</style>
    </div>
  );
}
