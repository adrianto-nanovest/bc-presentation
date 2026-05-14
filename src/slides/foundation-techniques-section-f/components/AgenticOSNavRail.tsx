// AgenticOSNavRail — F.8 left icon nav rail for the Agentic OS monitor.
// Spec: docs/specs/2026-05-14-f8-agentic-os-monitor.md §3.2, §5 step 5, §6.4.
//
// • ~56px-wide vertical rail, dark fill, 1px copper-800 right border.
// • 8 icon-only buttons (~56×52) backed by the LucideIcon shim.
// • Active: copper-200 3px left border + copper-100 icon. Inactive: copper-400.
// • CSS-only hover tooltip anchored to the right (mono 11px copper-200,
//   dark fill, copper-700 border, role="tooltip").
// • Step 5 shimmer: copper-200 sweep across icons, 80ms per icon. The
//   global `prefers-reduced-motion` rule (src/styles/globals.css) collapses
//   the keyframe duration so the shimmer is effectively skipped.
import { LucideIcon } from "./LucideIcon";

export interface NavRailItem {
  id: string;
  icon: string;
  label: string;
}

export interface AgenticOSNavRailProps {
  activeTab: string;
  onTabChange: (id: string) => void;
  stepIndex: number;
  navRail: readonly NavRailItem[];
}

const RAIL_WIDTH = 56;
const ITEM_HEIGHT = 52;
const SHIMMER_PER_ICON_MS = 80;

export function AgenticOSNavRail({
  activeTab,
  onTabChange,
  stepIndex,
  navRail,
}: AgenticOSNavRailProps) {
  const shimmerActive = stepIndex >= 5;

  return (
    <div
      role="tablist"
      aria-label="Agentic OS sections"
      data-testid="agentic-os-nav-rail"
      className="f8-nav-rail"
      style={{
        width: RAIL_WIDTH,
        flex: `0 0 ${RAIL_WIDTH}px`,
        display: "flex",
        flexDirection: "column",
        background: "var(--neutral-950)",
        borderRight: "1px solid var(--copper-800)",
        position: "relative",
      }}
    >
      {navRail.map((item, idx) => {
        const isActive = item.id === activeTab;
        return (
          <div
            key={item.id}
            className="f8-nav-item-wrap"
            style={{ position: "relative" }}
          >
            <button
              type="button"
              role="tab"
              aria-pressed={isActive}
              aria-label={item.label}
              aria-selected={isActive}
              data-testid={`nav-${item.id}`}
              data-active={isActive ? "true" : "false"}
              onClick={() => onTabChange(item.id)}
              className="f8-nav-item"
              style={{
                position: "relative",
                width: RAIL_WIDTH,
                height: ITEM_HEIGHT,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "transparent",
                border: "none",
                borderLeft: `3px solid ${isActive ? "var(--copper-200)" : "transparent"}`,
                padding: 0,
                cursor: "pointer",
                color: isActive ? "var(--copper-100)" : "var(--copper-400)",
                transition: "color 0.18s var(--ease)",
                outline: "none",
              }}
            >
              <LucideIcon name={item.icon} size={20} />
              {shimmerActive ? (
                <span
                  aria-hidden="true"
                  className="f8-nav-shimmer"
                  style={{
                    position: "absolute",
                    inset: 0,
                    pointerEvents: "none",
                    animationDelay: `${idx * SHIMMER_PER_ICON_MS}ms`,
                  }}
                />
              ) : null}
            </button>
            <div
              role="tooltip"
              className="f8-nav-tooltip"
              style={{
                position: "absolute",
                top: "50%",
                left: "calc(100% + 8px)",
                transform: "translateY(-50%)",
                padding: "4px 8px",
                background: "var(--neutral-900)",
                border: "1px solid var(--copper-700)",
                color: "var(--copper-200)",
                fontFamily: "var(--mono)",
                fontSize: 11,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
                opacity: 0,
                pointerEvents: "none",
                transition: "opacity 0.18s var(--ease)",
                zIndex: 30,
                boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
              }}
            >
              {item.label}
            </div>
          </div>
        );
      })}
      <style>{`
        .f8-nav-item:hover { color: var(--copper-200) !important; }
        .f8-nav-item-wrap:hover .f8-nav-tooltip { opacity: 1; }
        @keyframes f8-nav-shimmer-sweep {
          0%   { background: transparent; }
          40%  { background: rgba(232,179,128,0.45); }
          100% { background: transparent; }
        }
        .f8-nav-shimmer { animation: f8-nav-shimmer-sweep 240ms var(--ease) 1; }
      `}</style>
    </div>
  );
}
