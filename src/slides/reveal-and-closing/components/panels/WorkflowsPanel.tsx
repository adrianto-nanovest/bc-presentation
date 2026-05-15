// I.3 — WorkflowsPanel (n8n workflow harnesses)
//
// Top horizontal sub-tab strip across the 3 workflows (stocks-intel /
// legal-docs / exchange-alerts). Below: the active simulation diagram. The
// top-right "see it real" button opens a modal lightbox carousel of the
// real-product screenshots for the active workflow (the diagram stays
// mounted underneath). Lightbox is closed and reset on every sub-tab change.
import { useEffect, useState, type ReactNode } from "react";
import { highlight } from "../../../../components/highlight";
import { i3Content } from "../../content";
import { StocksIntel } from "../../simulations/StocksIntel";
import { LegalDocs } from "../../simulations/LegalDocs";
import { ExchangeAlerts } from "../../simulations/ExchangeAlerts";
import { ScreenshotLightbox } from "../ScreenshotLightbox";

type WorkflowId = "stocks-intel" | "legal-docs" | "exchange-alerts";

const SCREENSHOTS: Record<WorkflowId, readonly string[]> = {
  "stocks-intel": [
    "/n8n-workflows/n8n-stocks-news-sentiment.png",
    "/n8n-workflows/slack-stocks-news-sentiment.png",
    "/n8n-workflows/apps-stocks-news-sentiment.jpg",
  ],
  "legal-docs": [
    "/n8n-workflows/n8n-legal-docs-generation.png",
    "/n8n-workflows/slack-legal-docs-generation.png",
    "/n8n-workflows/gdocs-legal-docs-generation.png",
  ],
  "exchange-alerts": [
    "/n8n-workflows/n8n-3rdparties-announcement-alert-system.png",
    "/n8n-workflows/slack-3rdparties-announcement-alert-system.png",
    "/n8n-workflows/opsgenie-3rdparties-announcement-alert-system.png",
  ],
};

const RENDERERS: Record<WorkflowId, () => ReactNode> = {
  "stocks-intel": () => <StocksIntel />,
  "legal-docs": () => <LegalDocs />,
  "exchange-alerts": () => <ExchangeAlerts />,
};

export function WorkflowsPanel() {
  const [activeSubTab, setActiveSubTab] = useState<WorkflowId>("stocks-intel");
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Close the lightbox whenever the sub-tab changes so it never leaks across
  // workflows (and so reopening always starts from the first image of the
  // new workflow's set).
  useEffect(() => {
    setIsLightboxOpen(false);
  }, [activeSubTab]);

  const activeMeta = i3Content.workflows.find((w) => w.id === activeSubTab);

  return (
    <div
      role="tabpanel"
      data-testid="workflows-panel"
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 12,
        gap: 8,
        height: "100%",
        boxSizing: "border-box",
      }}
    >
      {/* Sub-tab strip + see-it-real toggle */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          borderBottom: "1px solid var(--copper-800)",
          paddingBottom: 6,
        }}
      >
        <div role="tablist" aria-label="Workflows" style={{ display: "flex", gap: 4 }}>
          {i3Content.workflows.map((w) => {
            const isActive = w.id === activeSubTab;
            return (
              <button
                key={w.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                data-no-advance
                data-testid={`workflows-subtab-${w.id}`}
                onClick={() => setActiveSubTab(w.id as WorkflowId)}
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
                {w.label}
              </button>
            );
          })}
        </div>

        <div style={{ flex: 1 }} />

        <button
          type="button"
          data-no-advance
          data-testid="workflows-mode-toggle"
          onClick={() => setIsLightboxOpen(true)}
          className="i3-mode-toggle"
          style={{
            position: "relative",
            overflow: "hidden",
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
            textTransform: "uppercase",
            transition:
              "color 0.2s var(--ease), border-color 0.2s var(--ease), box-shadow 0.25s var(--ease), transform 0.2s var(--ease), background-color 0.25s var(--ease)",
          }}
        >
          <span style={{ position: "relative", zIndex: 1 }}>see it real</span>
        </button>
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
          {highlight(activeMeta.description, activeMeta.kw)}
        </div>
      ) : null}

      {/* Diagram canvas (simulation stays mounted; lightbox overlays it) */}
      <div
        style={{
          position: "relative",
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

        <ScreenshotLightbox
          images={SCREENSHOTS[activeSubTab]}
          isOpen={isLightboxOpen}
          onClose={() => setIsLightboxOpen(false)}
        />
      </div>

      <style>{`
        .i3-subtab:hover { color: var(--copper-200) !important; }

        .i3-mode-toggle::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            110deg,
            transparent 0%,
            transparent 35%,
            rgba(232, 178, 130, 0.35) 50%,
            transparent 65%,
            transparent 100%
          );
          transform: translateX(-120%);
          pointer-events: none;
          z-index: 0;
        }
        .i3-mode-toggle:hover {
          border-color: var(--copper-200);
          color: var(--copper-50, #fdebd9);
          background-color: rgba(184, 110, 61, 0.12);
          transform: translateY(-1px) scale(1.03);
          box-shadow:
            0 0 0 1px rgba(232, 178, 130, 0.35),
            0 0 14px rgba(232, 178, 130, 0.45),
            0 0 28px rgba(184, 110, 61, 0.35);
          animation: i3ModeTogglePulse 1.6s ease-in-out infinite;
        }
        .i3-mode-toggle:hover::before {
          animation: i3ModeToggleShimmer 1.4s ease-in-out infinite;
        }
        .i3-mode-toggle:focus-visible {
          outline: none;
          border-color: var(--copper-200);
          box-shadow: 0 0 0 2px rgba(232, 178, 130, 0.55);
        }
        @keyframes i3ModeTogglePulse {
          0%, 100% {
            box-shadow:
              0 0 0 1px rgba(232, 178, 130, 0.35),
              0 0 12px rgba(232, 178, 130, 0.35),
              0 0 22px rgba(184, 110, 61, 0.28);
          }
          50% {
            box-shadow:
              0 0 0 1px rgba(232, 178, 130, 0.55),
              0 0 20px rgba(232, 178, 130, 0.6),
              0 0 36px rgba(184, 110, 61, 0.5);
          }
        }
        @keyframes i3ModeToggleShimmer {
          0%   { transform: translateX(-120%); }
          60%  { transform: translateX(120%); }
          100% { transform: translateX(120%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .i3-mode-toggle:hover {
            animation: none;
            transform: none;
          }
          .i3-mode-toggle:hover::before { animation: none; }
        }
      `}</style>
    </div>
  );
}
