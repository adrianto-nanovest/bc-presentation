// I.3 — PluginsPanel (Claude plugins shipped for internal use)
//
// Structurally identical to WorkflowsPanel but with 2 sub-tabs and NO
// "see it real" toggle (no real-screenshots are wired up for plugins yet).
import { useState, type ReactNode } from "react";
import { i3Content } from "../../content";
import { NanovestProduct } from "../../simulations/NanovestProduct";
import { NotebookLM } from "../../simulations/NotebookLM";

type PluginId = "nanovest-product" | "notebooklm";

const RENDERERS: Record<PluginId, () => ReactNode> = {
  "nanovest-product": () => <NanovestProduct />,
  "notebooklm": () => <NotebookLM />,
};

export function PluginsPanel() {
  const [activeSubTab, setActiveSubTab] = useState<PluginId>("nanovest-product");
  const activeMeta = i3Content.plugins.find((p) => p.id === activeSubTab);

  return (
    <div
      role="tabpanel"
      data-testid="plugins-panel"
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 12,
        gap: 8,
        height: "100%",
        boxSizing: "border-box",
      }}
    >
      {/* Sub-tab strip (no mode toggle) */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          borderBottom: "1px solid var(--copper-800)",
          paddingBottom: 6,
        }}
      >
        <div role="tablist" aria-label="Plugins" style={{ display: "flex", gap: 4 }}>
          {i3Content.plugins.map((p) => {
            const isActive = p.id === activeSubTab;
            return (
              <button
                key={p.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                data-no-advance
                data-testid={`plugins-subtab-${p.id}`}
                onClick={() => setActiveSubTab(p.id as PluginId)}
                className="i3-subtab"
                style={{
                  background: "transparent",
                  border: "none",
                  borderBottom: `2px solid ${isActive ? "var(--copper-200)" : "transparent"}`,
                  padding: "6px 10px",
                  cursor: "pointer",
                  color: isActive ? "var(--copper-100)" : "var(--copper-400)",
                  fontFamily: "var(--mono)",
                  fontSize: 11,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  transition: "color 0.18s var(--ease), border-color 0.18s var(--ease)",
                }}
              >
                {p.label}
              </button>
            );
          })}
        </div>
        <div style={{ flex: 1 }} />
      </div>

      {/* Sub-tab caption */}
      {activeMeta ? (
        <div
          style={{
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontSize: 11.5,
            color: "var(--neutral-300)",
            lineHeight: 1.4,
          }}
        >
          {activeMeta.description}
        </div>
      ) : null}

      {/* Diagram canvas */}
      <div
        style={{
          flex: 1,
          minHeight: 0,
          background: "var(--neutral-900)",
          border: "1px solid var(--copper-800)",
          borderRadius: 6,
          overflow: "hidden",
        }}
      >
        <div
          key={activeSubTab}
          className="i3-panel-swap"
          style={{ width: "100%", height: "100%" }}
        >
          {RENDERERS[activeSubTab]()}
        </div>
      </div>

      <style>{`
        .i3-subtab:hover { color: var(--copper-200) !important; }
      `}</style>
    </div>
  );
}
