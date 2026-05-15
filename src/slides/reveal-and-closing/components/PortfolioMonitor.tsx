// I.3 — PortfolioMonitor (F8-style bezel shell for the portfolio slide)
//
// 2-column grid: 160px label-only nav rail + main panel. No top bar, no right
// chat rail (intentional divergence from F8's 3-column layout). Owns the
// `activeTab` state and dispatches to one of four panels: workflows / plugins
// / connectors / workshops. Reuses F8's bezel chrome, entrance animation, and
// `data-no-advance` + `onWheelCapture` to keep deck navigation quiet while
// the audience interacts with the monitor.
import { useState } from "react";
import { PortfolioNavRail } from "./PortfolioNavRail";
import { WorkflowsPanel } from "./panels/WorkflowsPanel";
import { PluginsPanel } from "./panels/PluginsPanel";
import { ConnectorsPanel } from "./panels/ConnectorsPanel";
import { WorkshopsPanel } from "./panels/WorkshopsPanel";

export type PortfolioTabId =
  | "workflows"
  | "plugins"
  | "connectors"
  | "workshops";

export interface PortfolioMonitorProps {
  stepIndex: number;
  initialTab?: PortfolioTabId;
}

export function PortfolioMonitor({
  stepIndex,
  initialTab = "workflows",
}: PortfolioMonitorProps) {
  const [activeTab, setActiveTab] = useState<PortfolioTabId>(initialTab);

  // Step 0 = bezel entry animation; once stepIndex >= 0 the class is applied.
  const bezelEntered = stepIndex >= 0;

  return (
    <div
      data-testid="portfolio-bezel"
      data-no-advance
      onWheelCapture={(e) => e.stopPropagation()}
      className={bezelEntered ? "i3-bezel i3-bezel-in" : "i3-bezel"}
      style={{
        position: "relative",
        width: 1180,
        height: 484,
        borderRadius: 14,
        border: "1px solid var(--copper-700)",
        boxShadow:
          "inset 0 0 0 1px rgba(184,110,61,0.18), 0 16px 48px rgba(0,0,0,0.55)",
        background: "var(--neutral-950)",
        overflow: "hidden",
        display: "grid",
        gridTemplateColumns: "160px 1fr",
        gridTemplateAreas: `"nav main"`,
      }}
    >
      <div className="i3-region-nav" style={{ gridArea: "nav", minHeight: 0 }}>
        <PortfolioNavRail
          activeTab={activeTab}
          onTabChange={(id) => setActiveTab(id)}
        />
      </div>

      <div
        className="i3-region-main"
        style={{
          gridArea: "main",
          minWidth: 0,
          minHeight: 0,
          overflow: "hidden",
          padding: 16,
        }}
      >
        <div
          key={activeTab}
          className="i3-panel-swap"
          style={{ width: "100%", height: "100%" }}
        >
          {activeTab === "workflows" && <WorkflowsPanel />}
          {activeTab === "plugins" && <PluginsPanel />}
          {activeTab === "connectors" && <ConnectorsPanel />}
          {activeTab === "workshops" && <WorkshopsPanel />}
        </div>
      </div>

      <style>{`
        .i3-bezel { opacity: 0; transform: scale(0.96); }
        .i3-bezel-in {
          animation: i3BezelIn 600ms var(--ease) both;
        }
        @keyframes i3BezelIn {
          from { opacity: 0; transform: scale(0.96); }
          to   { opacity: 1; transform: scale(1); }
        }
        .i3-region-nav {
          animation: i3RegionNavIn 280ms var(--ease) both;
          animation-delay: 120ms;
        }
        @keyframes i3RegionNavIn {
          from { opacity: 0; transform: translateX(-8px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .i3-region-main {
          animation: i3RegionMainIn 280ms var(--ease) both;
          animation-delay: 220ms;
        }
        @keyframes i3RegionMainIn {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .i3-panel-swap {
          animation: i3PanelSwapIn 180ms var(--ease) both;
        }
        @keyframes i3PanelSwapIn {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
