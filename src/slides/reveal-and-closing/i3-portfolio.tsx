import { useState } from "react";
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { Interactive } from "@/motion/Interactive";
import { FigLabel } from "./components/FigLabel";
import { CategoryList } from "./components/CategoryList";
import type { ListEntry } from "./components/CategoryList";
import { HarnessCanvas } from "./components/HarnessCanvas";
import { LightPanel } from "./components/LightPanel";
import { ScreenshotGrid } from "./components/ScreenshotGrid";
import { highlight } from "./components/highlight";
import { StocksIntel } from "./simulations/StocksIntel";
import { LegalDocs } from "./simulations/LegalDocs";
import { ExchangeAlerts } from "./simulations/ExchangeAlerts";
import { NanovestProduct } from "./simulations/NanovestProduct";
import { NotebookLM } from "./simulations/NotebookLM";
import { i3Content as C } from "./content";

const HEAVY_SCREENSHOTS: Record<string, readonly string[]> = {
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
  // nanovest-product + notebooklm screenshots are TBD per spec §4.3 §9; show
  // a "screenshots TBD" placeholder for now.
  "nanovest-product": [],
  "notebooklm": [],
};

const LIGHT_PANELS: Record<string, { title: string; body: React.ReactNode }> = {
  "gemini-image-gen": {
    title: "gemini-image-gen MCP",
    body: (
      <p>
        Visual generation in any agent. Main: {highlight("nano banana pro", ["nano banana pro"])}. Imagen 4 + Veo 3.1 supported.
      </p>
    ),
  },
  "sonarqube": {
    title: "Sonarqube MCP",
    body: <p>Code-quality APIs surfaced as MCP tools. Used in dev review flow.</p>,
  },
  "bitbucket": {
    title: "Bitbucket MCP",
    body: <p>Repo-ops APIs surfaced as MCP tools. Daily team use.</p>,
  },
  "hr-group-ai": {
    title: "HR Group AI Workshop",
    body: <p>{highlight("Sinarmas Group cross-org", ["Sinarmas Group cross-org"])} · agentic organization · selected for it.</p>,
  },
  "townhall-aisc": {
    title: "Townhall AISC",
    body: <p>Nanovest internal · AI Steering Committee briefing.</p>,
  },
  "ai-sdlc": {
    title: "AI-SDLC",
    body: <p>Nanovest internal · AI in software development lifecycle.</p>,
  },
  "pilot-workshop": {
    title: "Pilot Workshop",
    body: <p>Nanovest internal · AI pilot kickoff.</p>,
  },
};

const HEAVY_RENDERERS: Record<string, () => React.ReactElement> = {
  "stocks-intel": () => <StocksIntel />,
  "legal-docs": () => <LegalDocs />,
  "exchange-alerts": () => <ExchangeAlerts />,
  "nanovest-product": () => <NanovestProduct />,
  "notebooklm": () => <NotebookLM />,
};

export function I3Portfolio() {
  const { stepIndex } = useDeck();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [mode, setMode] = useState<"simulation" | "screenshots">("simulation");
  // Reveal grouping per spec §4.3 motion:
  //   Space 1 → HARNESSES (header 0)
  //   Space 2 → TOOLS + WORKSHOPS (headers 1+2)
  //   Space 3 → right canvas appears
  //   Space 4 → connector ambient pulse begins
  const revealedHeaders = stepIndex >= 2 ? 3 : stepIndex >= 1 ? 1 : 0;
  const canvasRevealed = stepIndex >= 3;
  // Resolve canvas content from selectedId + mode.
  const canvasChild = (() => {
    if (!selectedId) return undefined;        // HarnessCanvas falls back to DefaultHarness
    if (mode === "screenshots" && HEAVY_RENDERERS[selectedId]) {
      const paths = HEAVY_SCREENSHOTS[selectedId];
      if (paths.length === 0) {
        return (
          <div className="flex h-full items-center justify-center font-serif italic text-neutral-400">
            screenshots TBD
          </div>
        );
      }
      return <ScreenshotGrid paths={paths} />;
    }
    if (HEAVY_RENDERERS[selectedId]) return HEAVY_RENDERERS[selectedId]();
    if (LIGHT_PANELS[selectedId]) {
      const { title, body } = LIGHT_PANELS[selectedId];
      return <LightPanel title={title} body={body} />;
    }
    return undefined;
  })();

  return (
    <div className="relative h-full w-full bg-neutral-900">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <FigLabel section="I" num={3} label="THE PORTFOLIO" />
      <Interactive>
        <div className="relative z-10 flex h-full flex-col gap-6 px-12 py-20">
          <h2
            className="font-display text-neutral-50"
            style={{ fontSize: "clamp(2.25rem, 3.6vw, 3.5rem)", lineHeight: 1.15 }}
          >
            {highlight(C.headline, ["Built. Taught. In production"])}
          </h2>
          <div className="grid flex-1 grid-cols-[30%_70%] gap-8 overflow-hidden">
            {/* Left pane — categorized list */}
            <div className="overflow-y-auto pr-4">
              <CategoryList
                items={C.list as ListEntry[]}
                selectedId={selectedId}
                onSelect={(id) => {
                  // Reset mode to simulation whenever the selection changes,
                  // so a previously-toggled "see it real" doesn't persist
                  // across items.
                  setMode("simulation");
                  setSelectedId(id);
                }}
                revealedHeaders={revealedHeaders}
              />
            </div>
            {/* Right pane — canvas (gated by canvasRevealed) */}
            <div className={canvasRevealed ? "opacity-100 transition-opacity duration-500" : "opacity-0"}>
              <HarnessCanvas
                selectedId={selectedId}
                mode={mode}
                onToggleMode={() => setMode((m) => (m === "simulation" ? "screenshots" : "simulation"))}
              >
                {canvasChild}
              </HarnessCanvas>
            </div>
          </div>
          <p
            className="font-serif italic text-copper-300"
            style={{ fontSize: "clamp(1rem, 1.2vw, 1.4rem)" }}
          >
            {highlight(C.caption, ["Click any item to see how it works"])}
          </p>
        </div>
      </Interactive>
    </div>
  );
}

export const i3Slide: SlideDef = {
  steps: 5,
  animationMode: "interactive",
  canonicalPose: 4,
  surface: "dark",
  render: () => <I3Portfolio />,
};
