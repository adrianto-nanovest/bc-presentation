// F.8 — AgenticOSMonitor (Task #2 orchestrator)
//
// Owns the bezel chrome + activeTab/promptValue/activeModel state and composes
// TopBar, NavRail, the active panel, and ChatRail in a CSS grid layout. The
// bezel captures wheel events so panel-local scrolling never propagates to
// deck navigation, and carries `data-no-advance` to block click-advance.
//
// Spec refs: §2.2 bezel, §5 step axis, §6.3 onWheel capture, §7.4 motion,
// §8.1 monitor interface, §8.2 panel contract.
import { useState } from "react";
import { AgenticOSTopBar } from "./AgenticOSTopBar";
import { AgenticOSNavRail } from "./AgenticOSNavRail";
import { AgenticOSChatRail } from "./AgenticOSChatRail";
import { DashboardPanel } from "./panels/DashboardPanel";
import { SkillsPanel } from "./panels/SkillsPanel";
import { AgentsPanel } from "./panels/AgentsPanel";
import { VaultPanel } from "./panels/VaultPanel";
import { MemoryPanel } from "./panels/MemoryPanel";
import { ConnectorsPanel } from "./panels/ConnectorsPanel";
import { PeoplePanel } from "./panels/PeoplePanel";
import { SettingsPanel } from "./panels/SettingsPanel";
import { f8Content } from "../content";

export type TabId =
  | "dashboard"
  | "skills"
  | "agents"
  | "vault"
  | "memory"
  | "connectors"
  | "people"
  | "settings";

export interface AgenticOSMonitorProps {
  stepIndex: number;
  initialTab?: TabId;
}

export function AgenticOSMonitor({
  stepIndex,
  initialTab = "dashboard",
}: AgenticOSMonitorProps) {
  const [activeTab, setActiveTab] = useState<TabId>(initialTab);
  const [promptValue, setPromptValue] = useState("");
  const [activeModel, setActiveModel] = useState<string>(f8Content.topBar.activeModel);

  // Skill insert helper — append a skill command to the current prompt value.
  // If empty, replaces; otherwise appends with a single space separator.
  const insertSkillCommand = (command: string) => {
    setPromptValue((prev) => (prev.trim() ? `${prev.trim()} ${command}` : command));
  };

  // Round-2 step axis (2 steps) has no scripted region highlights; kept on
  // children for forward-compat with future scripted reveals.
  const highlightedRegions: string[] = [];

  // Step 0 = bezel entry animation; once stepIndex >= 0 the class is applied
  // and the keyframe runs once. Reduced-motion is honored deck-wide via
  // globals.css media rule (transition/animation durations → 0.01ms).
  const bezelEntered = stepIndex >= 0;

  return (
    <div
      data-testid="bezel"
      data-no-advance
      onWheelCapture={(e) => e.stopPropagation()}
      className={bezelEntered ? "f8-bezel f8-bezel-in" : "f8-bezel"}
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
        gridTemplateRows: "36px 1fr",
        gridTemplateColumns: "56px 1fr 210px",
        gridTemplateAreas: `
          "top top  top"
          "nav main chat"
        `,
      }}
    >
      <div className="f8-region-top" style={{ gridArea: "top", minWidth: 0, position: "relative", zIndex: 20 }}>
        <AgenticOSTopBar
          topBarData={f8Content.topBar}
          stepIndex={stepIndex}
          activeModel={activeModel}
          onModelChange={setActiveModel}
        />
      </div>

      <div className="f8-region-nav" style={{ gridArea: "nav", minHeight: 0 }}>
        <AgenticOSNavRail
          activeTab={activeTab}
          onTabChange={(id) => setActiveTab(id as TabId)}
          stepIndex={stepIndex}
          navRail={f8Content.navRail}
        />
      </div>

      <div
        className="f8-region-main"
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
          className="f8-panel-swap"
          style={{ width: "100%", height: "100%" }}
        >
          {activeTab === "dashboard" && (
            <DashboardPanel
              highlighted={highlightedRegions}
              dashboard={f8Content.dashboard}
            />
          )}
          {activeTab === "skills" && (
            <SkillsPanel
              skills={f8Content.skills}
              onSkillSelect={insertSkillCommand}
            />
          )}
          {activeTab === "agents" && <AgentsPanel agents={f8Content.agents} />}
          {activeTab === "vault" && <VaultPanel vault={f8Content.vault} />}
          {activeTab === "memory" && <MemoryPanel memory={f8Content.memory} />}
          {activeTab === "connectors" && (
            <ConnectorsPanel connectors={f8Content.connectors} />
          )}
          {activeTab === "people" && <PeoplePanel people={f8Content.people} />}
          {activeTab === "settings" && <SettingsPanel />}
        </div>
      </div>

      <div className="f8-region-chat" style={{ gridArea: "chat", minHeight: 0 }}>
        <AgenticOSChatRail
          chatRail={f8Content.chatRail}
          highlighted={highlightedRegions}
          stepIndex={stepIndex}
          promptValue={promptValue}
          onPromptChange={setPromptValue}
          onSkillSelect={insertSkillCommand}
        />
      </div>

      <style>{`
        .f8-bezel { opacity: 0; transform: scale(0.96); }
        .f8-bezel-in {
          animation: f8BezelIn 600ms var(--ease) both;
        }
        @keyframes f8BezelIn {
          from { opacity: 0; transform: scale(0.96); }
          to   { opacity: 1; transform: scale(1); }
        }
        .f8-region-top {
          animation: f8RegionTopIn 200ms var(--ease) both;
          animation-delay: 40ms;
        }
        @keyframes f8RegionTopIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .f8-region-nav {
          animation: f8RegionNavIn 280ms var(--ease) both;
          animation-delay: 120ms;
        }
        @keyframes f8RegionNavIn {
          from { opacity: 0; transform: translateX(-8px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .f8-region-main {
          animation: f8RegionMainIn 280ms var(--ease) both;
          animation-delay: 220ms;
        }
        @keyframes f8RegionMainIn {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .f8-region-chat {
          animation: f8RegionChatIn 280ms var(--ease) both;
          animation-delay: 340ms;
        }
        @keyframes f8RegionChatIn {
          from { opacity: 0; transform: translateX(8px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .f8-panel-swap {
          animation: f8PanelSwapIn 180ms var(--ease) both;
        }
        @keyframes f8PanelSwapIn {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
