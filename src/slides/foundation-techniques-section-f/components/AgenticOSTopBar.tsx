// F.8 monitor top status bar (spec §3.1).
//
// AGENTICOS wordmark · click-based model picker pill · clock · Settings.
// The pill is a controlled button: clicking it toggles a state-driven
// dropdown (no CSS-hover). Selecting an option calls `onModelChange` and
// closes the dropdown; clicking outside the wrapper also closes it. The
// pill text reflects the `activeModel` prop (lifted state in AgenticOSMonitor).
import { useEffect, useRef, useState } from "react";
import { LucideIcon } from "./LucideIcon";

export interface AgenticOSTopBarProps {
  topBarData: {
    wordmark: string;
    models: readonly string[];
    activeModel: string;
    clock: string;
  };
  activeModel: string;
  onModelChange: (model: string) => void;
  stepIndex: number;
}

const MONO = "var(--mono)" as const;

export function AgenticOSTopBar({ topBarData, activeModel, onModelChange }: AgenticOSTopBarProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!dropdownOpen) return;
    function handleDoc(e: MouseEvent) {
      if (!wrapRef.current?.contains(e.target as Node)) setDropdownOpen(false);
    }
    document.addEventListener("click", handleDoc);
    return () => document.removeEventListener("click", handleDoc);
  }, [dropdownOpen]);

  return (
    <div
      className="f8-topbar"
      style={{
        display: "flex",
        alignItems: "center",
        height: 36,
        padding: "0 14px",
        background: "var(--neutral-950)",
        borderBottom: "1px solid var(--copper-800)",
        gap: 24,
      }}
    >
      <span style={{ fontFamily: MONO, fontSize: 14, fontWeight: 600, color: "var(--copper-200)", letterSpacing: "0.22em" }}>
        {topBarData.wordmark}
      </span>

      <div ref={wrapRef} className="model-picker-wrap" style={{ position: "relative" }}>
        <button
          type="button"
          className="model-picker"
          aria-haspopup="listbox"
          aria-expanded={dropdownOpen}
          aria-label={`Active model: ${activeModel}`}
          data-testid="model-picker-btn"
          onClick={(e) => { e.stopPropagation(); setDropdownOpen((o) => !o); }}
          style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            height: 22, padding: "0 10px",
            background: "var(--neutral-900)", border: "1px solid var(--copper-700)", borderRadius: 999,
            color: "var(--copper-100)", fontFamily: MONO, fontSize: 12, cursor: "pointer",
          }}
        >
          {activeModel} <span aria-hidden="true">▾</span>
        </button>
        <div
          className="model-dropdown"
          role="listbox"
          data-testid="model-dropdown"
          style={{
            position: "absolute", top: "calc(100% + 6px)", left: 0, width: 190, padding: 8,
            background: "var(--neutral-950)", border: "1px solid var(--copper-700)", borderRadius: 8,
            opacity: dropdownOpen ? 1 : 0,
            pointerEvents: dropdownOpen ? "auto" : "none",
            transition: "opacity 0.18s var(--ease)",
            zIndex: 50,
          }}
        >
          {topBarData.models.map((m) => (
            <div
              key={m}
              role="option"
              aria-selected={m === activeModel}
              data-testid={`model-option-${m}`}
              className="model-dropdown-row"
              onClick={() => { onModelChange(m); setDropdownOpen(false); }}
              style={{
                padding: "6px 8px", fontFamily: MONO, fontSize: 11, borderRadius: 4, cursor: "pointer",
                color: m === activeModel ? "var(--copper-100)" : "var(--neutral-300)",
              }}
            >
              {m}
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ fontFamily: MONO, fontSize: 12, color: "var(--neutral-400)" }}>{topBarData.clock}</span>
        <span className="f8-topbar-settings" style={{ display: "inline-flex", cursor: "pointer" }}>
          <LucideIcon name="Settings" size={14} color="var(--copper-300)" />
        </span>
      </div>

      <style>{`
        .model-dropdown-row:hover { background: var(--copper-900); color: var(--copper-100); }
        .f8-topbar-settings:hover svg { color: var(--copper-100) !important; }
      `}</style>
    </div>
  );
}
