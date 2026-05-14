// AgentsPanel — F.8 monitor · AGENTS tab (spec §4.3, §6.4).
//
// Top bar holds a "+ NEW AGENT" button at top-right; below sits a 3-column ×
// 2-row grid of agent cards (6 total). Each card is a <button> split into
// two halves separated by a 1px copper-900 rule: the top (~60%) holds the
// avatar + name + READY pill header plus role + lastActivity body, and the
// bottom (~40%) renders a visible "HOW IT WORKS" mini diagram of the
// agent's internal 3-step pipeline (verbs that run INSIDE the agent) so
// the agent's job is legible without hover. Panel ignores `highlighted`
// (spec §8.2 — no scripted beats on this tab); prop kept for shape parity.
import { Fragment, type CSSProperties } from "react";
import { highlight } from "../../../../components/highlight";

export interface AgentCard {
  id: string;
  initial: string;
  name: string;
  role: string;
  lastActivity: string;
  popover: string;
  kw?: readonly string[];
}

export interface AgentsPanelProps {
  agents: readonly AgentCard[];
  highlighted?: readonly string[];
}

// Hard-coded internal-pipeline map keyed by agent.id (kept here so
// content.tsx stays stable). Each entry is a 3-verb sequence of steps that
// run INSIDE the agent. Fallback to a generic read/process/write loop
// when an id is unmapped.
const WORKFLOWS: Record<string, readonly string[]> = {
  finn:  ["ingest", "reconcile", "summarize"],
  sched: ["scan", "cluster", "optimize"],
  draft: ["brief", "outline", "expand"],
  rex:   ["search", "synthesize", "cite"],
  qa:    ["lint", "cross-check", "flag"],
  reply: ["parse", "match", "draft"],
};
const FALLBACK_WORKFLOW: readonly string[] = ["read", "process", "write"];

const MONO: CSSProperties = { fontFamily: "var(--mono)", letterSpacing: "0.18em", fontWeight: 500 };
const SERIF_ITALIC: CSSProperties = { fontFamily: "var(--serif)", fontStyle: "italic" };

const CARD: CSSProperties = {
  display: "flex", flexDirection: "column", gap: 8, padding: 12,
  background: "var(--neutral-900)", border: "1px solid var(--copper-800)", borderRadius: 6,
  color: "var(--neutral-200)", textAlign: "left", cursor: "pointer",
  transition: "border-color 0.18s var(--ease), box-shadow 0.18s var(--ease)",
};

const AVATAR: CSSProperties = {
  ...MONO, display: "inline-flex", alignItems: "center", justifyContent: "center",
  width: 32, height: 32, borderRadius: 999, background: "var(--copper-700)",
  color: "var(--neutral-50)", fontSize: 13, fontWeight: 600, textTransform: "uppercase",
};

const PILL: CSSProperties = {
  ...MONO, fontSize: 9, padding: "1px 6px", background: "var(--copper-200)",
  color: "var(--neutral-950)", borderRadius: 2, letterSpacing: "0.12em",
};

const SEPARATOR: CSSProperties = {
  height: 1, background: "var(--copper-900)", border: 0, margin: "4px 0 0",
};

const NODE_STEP: CSSProperties = {
  padding: "3px 7px", fontFamily: "var(--mono)", fontSize: 9,
  background: "var(--neutral-900)", border: "1px solid var(--copper-800)",
  borderRadius: 3, color: "var(--copper-200)", letterSpacing: "0.06em",
};

const ARROW: CSSProperties = {
  fontFamily: "var(--mono)", fontSize: 11, color: "var(--copper-300)",
};

const HOW_LABEL: CSSProperties = {
  fontFamily: "var(--mono)", fontSize: 9, color: "var(--copper-300)",
  letterSpacing: "0.18em", marginBottom: 6,
};

export function AgentsPanel({ agents }: AgentsPanelProps) {
  return (
    <div
      role="tabpanel"
      data-testid="agents-panel"
      aria-label="Agents"
      style={{
        display: "flex", flexDirection: "column", padding: 12, gap: 8,
        height: "100%", boxSizing: "border-box",
      }}
    >
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          type="button"
          data-testid="agents-add-btn"
          className="f8-add-btn"
          style={{
            ...MONO, fontSize: 10, padding: "4px 10px",
            background: "transparent", border: "1px solid var(--copper-700)", borderRadius: 4,
            color: "var(--copper-200)", cursor: "pointer", letterSpacing: "0.12em",
          }}
        >
          + NEW AGENT
        </button>
      </div>

      <div
        style={{
          flex: 1, minHeight: 0, display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)", gridTemplateRows: "repeat(2, 1fr)", gap: 12,
        }}
      >
        {agents.map((a) => {
          const steps = WORKFLOWS[a.id] ?? FALLBACK_WORKFLOW;
          return (
            <button
              key={a.id}
              type="button"
              className="f8-agent-card"
              data-testid={`agent-${a.id}`}
              aria-label={`${a.name} — ${a.role}`}
              style={CARD}
            >
              {/* Top half (~60%): header + role + lastActivity */}
              <div style={{ flex: "0 0 auto", display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span aria-hidden="true" style={AVATAR}>{a.initial}</span>
                  <span style={{ ...MONO, fontSize: 12, color: "var(--copper-200)" }}>{a.name}</span>
                  <span style={{ flex: 1 }} />
                  <span style={PILL}>READY</span>
                </div>

                <div style={{ ...SERIF_ITALIC, fontSize: 11, color: "var(--neutral-300)", lineHeight: 1.4 }}>
                  <div>{a.role}</div>
                  <div>{a.kw ? highlight(a.lastActivity, a.kw) : a.lastActivity}</div>
                </div>
              </div>

              <hr aria-hidden="true" style={SEPARATOR} />

              {/* Bottom half (~40%): "HOW IT WORKS" — agent's internal 3-step pipeline */}
              <div style={{ paddingTop: 8 }}>
                <div style={HOW_LABEL}>HOW IT WORKS</div>
                <div
                  data-testid={`workflow-${a.id}`}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center",
                    gap: 6, flexWrap: "wrap",
                  }}
                >
                  {steps.map((step, i, arr) => (
                    <Fragment key={i}>
                      <span style={NODE_STEP}>{step}</span>
                      {i < arr.length - 1 && (
                        <span style={ARROW} aria-hidden="true">{"→"}</span>
                      )}
                    </Fragment>
                  ))}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <style>{`
        .f8-agent-card:hover {
          border-color: var(--copper-200);
          box-shadow: 0 0 0 1px var(--copper-200), 0 0 16px rgba(184,110,61,0.12);
        }
        .f8-add-btn:hover { border-color: var(--copper-200); color: var(--copper-100); }
      `}</style>
    </div>
  );
}
