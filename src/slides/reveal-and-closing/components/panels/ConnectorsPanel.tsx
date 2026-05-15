// I.3 — ConnectorsPanel (custom MCPs built — 3 in-use, 6 retired)
//
// Mirrors F8's ConnectorsPanel pixel-for-pixel, with these divergences:
//  • Uses `inUse: boolean` instead of `connected: boolean`.
//  • Active pill reads "✓ IN USE" (copper-200 fill); inactive reads
//    "NOT USED" (outlined copper-700 border, copper-200 text) — these are
//    retired MCPs replaced by Anthropic's official MCPs.
//  • Grid is 3 × 3 (9 tiles) instead of 4 × 2 (8 tiles).
//  • No hover popover; the italic footer line carries the explanation
//    (highlighted via `kw`).
import { highlight } from "../../../../components/highlight";
import { i3Content } from "../../content";

const PILL_BASE = {
  padding: "1px 7px",
  fontFamily: "var(--mono)",
  fontSize: 9,
  letterSpacing: "0.16em",
} as const;

export function ConnectorsPanel() {
  const connectors = i3Content.connectors;
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
      <div style={{ display: "flex", justifyContent: "flex-start" }}>
        <h2
          data-testid="connectors-title"
          style={{
            margin: 0,
            fontFamily: "var(--display)",
            fontSize: 18,
            fontWeight: 600,
            color: "var(--neutral-100)",
            letterSpacing: 0,
            lineHeight: 1.2,
            textAlign: "left",
          }}
        >
          {highlight("All the AI Connectors I built", ["AI Connectors"])}
        </h2>
      </div>
      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gridTemplateRows: "repeat(3, 1fr)",
          gap: 10,
        }}
      >
        {connectors.map((c) => (
          <button
            key={c.id}
            type="button"
            className="i3-connector-tile"
            data-no-advance
            aria-label={`${c.name} — ${c.inUse ? "in use" : "not used"}`}
            style={{
              position: "relative",
              background: "var(--neutral-900)",
              border: "1px solid var(--copper-800)",
              padding: "10px 12px",
              display: "flex",
              flexDirection: "column",
              cursor: "default",
              transition:
                "border-color 0.18s var(--ease), box-shadow 0.18s var(--ease)",
              font: "inherit",
              color: "inherit",
              textAlign: "left",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ flex: 1 }} />
              {c.inUse ? (
                <span
                  style={{
                    ...PILL_BASE,
                    background: "var(--copper-200)",
                    color: "var(--neutral-950)",
                  }}
                >
                  ✓ IN USE
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
                  NOT USED
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
                fontSize: 15,
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
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                alignItems: "flex-start",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--serif)",
                  fontStyle: "italic",
                  fontSize: 11,
                  color: "var(--copper-300)",
                }}
              >
                {c.sublabel}
              </span>
              <span
                style={{
                  fontFamily: "var(--serif)",
                  fontStyle: "italic",
                  fontSize: 10,
                  color: "var(--neutral-400)",
                }}
              >
                {highlight(c.footer, c.kw)}
              </span>
            </div>
          </button>
        ))}
      </div>
      <style>{`
        .i3-connector-tile:hover { border-color: var(--copper-200); box-shadow: 0 0 0 1px var(--copper-200), 0 0 16px rgba(184,110,61,0.12); }
      `}</style>
    </div>
  );
}
