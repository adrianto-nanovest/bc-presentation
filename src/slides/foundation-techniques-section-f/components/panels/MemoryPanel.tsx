// MemoryPanel — F.8 main-canvas panel for the "Memory" tab (spec §4.5).
//
// 2×2 grid of bulleted section boxes (identity / preferences / recurring /
// recentLearnings) plus a "+ NEW MEMORY" add button anchored top-right. Each
// box owns its own scrollbar and hover-borders independently. Bullets are
// italic-serif lines with a copper ▸ glyph; optional per-section `kw` array
// drives deck-wide keyword highlighting via the shared `highlight()` helper.
import { highlight } from "../../../../components/highlight";
import { LucideIcon } from "../LucideIcon";

interface MemorySection {
  heading: string;
  bullets: readonly string[];
  kw?: readonly string[];
}

const SECTION_ICONS: Record<string, string> = {
  "WHO YOU ARE": "Users",
  "HOW YOU WORK": "Workflow",
  "WHAT YOU'RE WORKING ON": "Target",
  "RECENT LEARNINGS": "Sparkles",
};

export interface MemoryPanelContent {
  identity: MemorySection;
  preferences: MemorySection;
  recurring: MemorySection;
  recentLearnings: MemorySection;
}

export interface MemoryPanelProps {
  memory: MemoryPanelContent;
  /** Region ids highlighted by the step axis. Currently unused; kept on the
   *  panel API for parity with §8.2 PanelProps contract. */
  highlighted?: readonly string[];
}

function SectionBox({
  section,
  testId,
}: {
  section: MemorySection;
  testId: string;
}) {
  return (
    <div
      className="f8-memory-box"
      data-testid={testId}
      style={{
        background: "var(--neutral-900)",
        border: "1px solid var(--copper-800)",
        borderRadius: 6,
        padding: "14px 16px",
        display: "flex",
        flexDirection: "column",
        gap: 8,
        minHeight: 0,
        overflowY: "auto",
        transition: "border-color 0.18s var(--ease), box-shadow 0.18s var(--ease)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
        <LucideIcon name={SECTION_ICONS[section.heading] ?? "Sparkles"} size={14} color="var(--copper-300)" />
        <div style={{ fontFamily: "var(--mono)", fontSize: 11, fontWeight: 500, letterSpacing: "0.18em", color: "var(--copper-200)", textTransform: "uppercase" }}>
          {section.heading}
        </div>
      </div>
      <ul
        style={{
          listStyle: "none",
          margin: 0,
          padding: 0,
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        {section.bullets.map((b, i) => (
          <li
            key={i}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 6,
              fontFamily: "var(--serif)",
              fontStyle: "italic",
              fontSize: 11.5,
              lineHeight: 1.45,
              color: "var(--neutral-200)",
            }}
          >
            <span
              aria-hidden="true"
              style={{
                color: "var(--copper-300)",
                flex: "0 0 auto",
                lineHeight: 1.45,
              }}
            >
              ▸
            </span>
            <span>
              {section.kw && section.kw.length > 0
                ? highlight(b, section.kw)
                : b}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function MemoryPanel({ memory }: MemoryPanelProps) {
  return (
    <div
      role="tabpanel"
      data-testid="memory-panel"
      aria-label="Memory"
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 12,
        gap: 8,
        height: "100%",
        boxSizing: "border-box",
      }}
    >
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          type="button"
          data-testid="memory-add-btn"
          className="f8-add-btn"
          style={{
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
          }}
        >
          + NEW MEMORY
        </button>
      </div>
      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "1fr 1fr",
          gap: 12,
        }}
      >
        <SectionBox section={memory.identity} testId="memory-identity" />
        <SectionBox section={memory.preferences} testId="memory-preferences" />
        <SectionBox section={memory.recurring} testId="memory-recurring" />
        <SectionBox section={memory.recentLearnings} testId="memory-recent" />
      </div>

      <style>{`
        .f8-memory-box { transition: border-color 0.18s var(--ease), box-shadow 0.18s var(--ease); }
        .f8-memory-box:hover { border-color: var(--copper-200); box-shadow: 0 0 0 1px var(--copper-200), 0 0 16px rgba(184,110,61,0.12); }
        .f8-memory-box:hover svg { color: var(--copper-100) !important; }
        .f8-memory-box::-webkit-scrollbar { width: 4px; }
        .f8-memory-box::-webkit-scrollbar-track { background: transparent; }
        .f8-memory-box::-webkit-scrollbar-thumb { background: var(--copper-800); border-radius: 2px; }
        .f8-memory-box::-webkit-scrollbar-thumb:hover { background: var(--copper-700); }
        .f8-add-btn:hover { border-color: var(--copper-200); color: var(--copper-100); }
      `}</style>
    </div>
  );
}
