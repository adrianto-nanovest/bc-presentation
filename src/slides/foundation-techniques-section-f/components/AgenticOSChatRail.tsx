// AgenticOSChatRail — F.8 right-side command rail (spec §3.4, §5 step 4, §6.3).
//
// Always-visible "command" column inside the AgenticOS monitor bezel. Stack:
//   heading → prompt textarea → RUN/CLEAR buttons → QUICK SKILLS chips (2-col,
//   6 entries) → RECENT RUNS scrollable list (~12 entries). At step 4 the
//   wrapper gets a copper-200 glow pulse (1500ms). The runs list captures
//   `onWheel` so panel-local scroll never bubbles up to the deck navigator.
import type { CSSProperties } from "react";
import { highlight } from "../../../components/highlight";

export interface ChatRailRecentRun {
  time: string;
  label: string;
  status: string;
  kw?: readonly string[];
}

export interface ChatRailContent {
  heading: string;
  placeholder: string;
  quickSkills: readonly { label: string; command: string }[];
  recentRuns: readonly ChatRailRecentRun[];
}

export interface AgenticOSChatRailProps {
  chatRail: ChatRailContent;
  promptValue: string;
  onPromptChange: (value: string) => void;
  onSkillSelect: (command: string) => void;
  /** Region ids currently highlighted by the step axis. */
  highlighted?: readonly string[];
  /** Current step index — kept on the API for future per-step hooks. */
  stepIndex?: number;
}

const MONO: CSSProperties = { fontFamily: "var(--mono)", letterSpacing: "0.18em", fontWeight: 500 };
const SERIF_ITALIC: CSSProperties = { fontFamily: "var(--serif)", fontStyle: "italic" };
const SECTION_LABEL: CSSProperties = { ...MONO, fontSize: 10, color: "var(--copper-300)", textTransform: "uppercase" };

export function AgenticOSChatRail({
  chatRail,
  promptValue,
  onPromptChange,
  onSkillSelect,
  highlighted = [],
}: AgenticOSChatRailProps) {
  const isHighlighted = highlighted.includes("chat-rail");
  return (
    <aside
      role="complementary"
      aria-label="Command rail"
      data-testid="chat-rail"
      data-highlighted={isHighlighted ? "true" : "false"}
      className={`f8-chat-rail${isHighlighted ? " f8-chat-rail--pulse" : ""}`}
      style={{
        width: 210,
        height: "100%",
        background: "var(--neutral-950)",
        borderLeft: "1px solid var(--copper-800)",
        padding: 12,
        display: "flex",
        flexDirection: "column",
        gap: 10,
        boxSizing: "border-box",
      }}
    >
      {/* Heading */}
      <div style={{ ...MONO, fontSize: 11, color: "var(--copper-200)" }}>{chatRail.heading}</div>

      {/* Prompt box */}
      <textarea
        value={promptValue}
        onChange={(e) => onPromptChange(e.target.value)}
        placeholder={chatRail.placeholder}
        className="f8-chat-prompt"
        data-testid="chat-prompt"
        style={{
          width: "100%",
          height: 64,
          resize: "none",
          padding: "8px 10px",
          borderRadius: 6,
          background: "var(--neutral-900)",
          border: "1px solid var(--copper-800)",
          color: "var(--neutral-200)",
          ...SERIF_ITALIC,
          fontSize: 11,
          lineHeight: 1.35,
          outline: "none",
          boxSizing: "border-box",
        }}
      />

      {/* RUN / CLEAR */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
        <button
          type="button"
          className="f8-chat-btn run"
          data-testid="chat-run"
          onClick={() => {}}
          style={{
            height: 32, ...MONO, fontSize: 10,
            borderRadius: 4, cursor: "pointer",
          }}
        >RUN →</button>
        <button
          type="button"
          className="f8-chat-btn clear"
          data-testid="chat-clear"
          onClick={() => onPromptChange("")}
          style={{
            height: 32, ...MONO, fontSize: 10,
            borderRadius: 4, cursor: "pointer",
          }}
        >CLEAR</button>
      </div>

      {/* QUICK SKILLS */}
      <div style={SECTION_LABEL}>QUICK SKILLS</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
        {chatRail.quickSkills.map((skill) => (
          <button
            key={skill.command}
            type="button"
            className="f8-chat-chip"
            onClick={() => onSkillSelect(skill.command)}
            data-testid={`quick-skill-${skill.command.replace("/", "")}`}
            style={{
              height: 32, padding: "0 8px", ...MONO, fontSize: 10,
              borderRadius: 4,
              cursor: "pointer", textAlign: "center", whiteSpace: "nowrap",
              overflow: "hidden", textOverflow: "ellipsis",
            }}
          >{skill.label}</button>
        ))}
      </div>

      {/* RECENT RUNS */}
      <div style={SECTION_LABEL}>RECENT RUNS</div>
      <div
        className="f8-chat-runs"
        onWheelCapture={(e) => e.stopPropagation()}
        style={{
          flex: 1, minHeight: 0, overflowY: "auto", paddingRight: 2,
          display: "flex", flexDirection: "column", gap: 2,
        }}
      >
        {chatRail.recentRuns.map((run, i) => (
          <div
            key={`${run.time}-${i}`}
            className="f8-chat-run-row"
            style={{
              height: 28, display: "grid", gridTemplateColumns: "auto 1fr auto",
              alignItems: "center", gap: 6, padding: "0 4px",
            }}
          >
            <span style={{ ...MONO, fontSize: 10, color: "var(--neutral-400)" }}>{run.time}</span>
            <span style={{ ...SERIF_ITALIC, fontSize: 11, color: "var(--neutral-200)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {run.kw ? highlight(run.label, run.kw) : run.label}
            </span>
            <span style={{
              ...MONO, fontSize: 9, padding: "1px 6px",
              background: "var(--copper-200)", color: "var(--neutral-950)", borderRadius: 2,
            }}>{run.status}</span>
          </div>
        ))}
      </div>

      <style>{`
        .f8-chat-prompt:focus { border-color: var(--copper-400); }
        .f8-chat-chip {
          background: var(--neutral-900);
          color: var(--copper-200);
          border: 1px solid var(--copper-800);
          transition: border-color 0.18s var(--ease), background 0.18s var(--ease), color 0.18s var(--ease);
        }
        .f8-chat-chip:hover {
          border-color: var(--copper-200);
          background: rgba(184,110,61,0.10);
          color: var(--copper-100);
        }
        .f8-chat-btn {
          transition: border-color 0.18s var(--ease), filter 0.18s var(--ease), background 0.18s var(--ease);
        }
        .f8-chat-btn.run {
          background: var(--copper-700);
          color: var(--neutral-50);
          border: 1px solid var(--copper-700);
        }
        .f8-chat-btn.clear {
          background: transparent;
          color: var(--copper-200);
          border: 1px solid var(--copper-700);
        }
        .f8-chat-btn.run:hover { border-color: var(--copper-200); filter: brightness(1.15); }
        .f8-chat-btn.clear:hover { border-color: var(--copper-200); background: rgba(184,110,61,0.10); }
        .f8-chat-run-row { transition: background 0.18s var(--ease); border-radius: 3px; }
        .f8-chat-run-row:hover { background: rgba(184,110,61,0.10); }
        .f8-chat-runs::-webkit-scrollbar { width: 4px; }
        .f8-chat-runs::-webkit-scrollbar-track { background: transparent; }
        .f8-chat-runs::-webkit-scrollbar-thumb { background: var(--copper-800); border-radius: 2px; }
        .f8-chat-runs::-webkit-scrollbar-thumb:hover { background: var(--copper-700); }
        .f8-chat-rail--pulse { animation: f8ChatRailPulse 1500ms var(--ease) 1; }
        @keyframes f8ChatRailPulse {
          0%   { box-shadow: inset 0 0 0 0 rgba(232,196,160,0); }
          40%  { box-shadow: inset 0 0 0 1px var(--copper-200), inset 0 0 24px rgba(232,196,160,0.18); }
          100% { box-shadow: inset 0 0 0 0 rgba(232,196,160,0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .f8-chat-rail--pulse { animation: none; box-shadow: inset 0 0 0 1px var(--copper-200); }
        }
      `}</style>
    </aside>
  );
}
