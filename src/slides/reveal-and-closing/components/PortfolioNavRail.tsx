// I.3 — PortfolioNavRail (text-label vertical menu, 160px wide)
//
// Diverges from F8's icon-only nav rail — labels are visible. 4 entries:
// WORKFLOWS / PLUGINS / CONNECTORS / WORKSHOPS. Active item: 3px copper-200
// left border + copper-100 text. Inactive: copper-400. Hover: copper-200.
import type { PortfolioTabId } from "./PortfolioMonitor";

export interface PortfolioNavRailProps {
  activeTab: PortfolioTabId;
  onTabChange: (id: PortfolioTabId) => void;
}

const RAIL_WIDTH = 160;
const ITEM_HEIGHT = 52;

const ITEMS: ReadonlyArray<{ id: PortfolioTabId; label: string }> = [
  { id: "workflows", label: "WORKFLOWS" },
  { id: "plugins", label: "PLUGINS" },
  { id: "connectors", label: "CONNECTORS" },
  { id: "workshops", label: "WORKSHOPS" },
];

export function PortfolioNavRail({
  activeTab,
  onTabChange,
}: PortfolioNavRailProps) {
  return (
    <div
      role="tablist"
      aria-label="Portfolio sections"
      data-testid="portfolio-nav-rail"
      className="i3-nav-rail"
      style={{
        width: RAIL_WIDTH,
        height: "100%",
        flex: `0 0 ${RAIL_WIDTH}px`,
        display: "flex",
        flexDirection: "column",
        background: "var(--neutral-950)",
        borderRight: "1px solid var(--copper-800)",
        position: "relative",
      }}
    >
      {ITEMS.map((item) => {
        const isActive = item.id === activeTab;
        return (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-pressed={isActive}
            data-testid={`nav-${item.id}`}
            data-active={isActive ? "true" : "false"}
            data-no-advance
            onClick={() => onTabChange(item.id)}
            className="i3-nav-item"
            style={{
              position: "relative",
              width: RAIL_WIDTH,
              height: ITEM_HEIGHT,
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              background: "transparent",
              border: "none",
              borderLeft: `3px solid ${isActive ? "var(--copper-200)" : "transparent"}`,
              padding: "0 0 0 18px",
              cursor: "pointer",
              color: isActive ? "var(--copper-100)" : "var(--copper-400)",
              fontFamily: "var(--mono)",
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              textAlign: "left",
              transition: "color 0.18s var(--ease)",
              outline: "none",
            }}
          >
            {item.label}
          </button>
        );
      })}
      <style>{`
        .i3-nav-item:hover { color: var(--copper-200) !important; }
      `}</style>
    </div>
  );
}
