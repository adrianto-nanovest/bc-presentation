// I.3 — WorkshopsPanel (4 facilitated workshops in a 2×2 grid)
//
// Mirrors F8 MemoryPanel structure: 2×2 grid of bulleted section cards. Each
// card has a mono-uppercase heading (with an optional Lucide icon mapped per
// workshop) and italic-serif ▸ bullets with optional keyword highlighting.
import { highlight } from "../../../../components/highlight";
import { LucideIcon } from "../../../foundation-techniques-section-f/components/LucideIcon";
import { i3Content } from "../../content";

// Optional icon per workshop id (kept here so content.ts stays icon-free).
const WORKSHOP_ICONS: Record<string, string> = {
  "hr-group-ai": "Users",
  "townhall-aisc": "Bot",
  "ai-sdlc": "Workflow",
  "pilot-workshop": "Sparkles",
};

interface WorkshopSection {
  id: string;
  heading: string;
  bullets: readonly string[];
  kw?: readonly string[];
}

function SectionBox({ section }: { section: WorkshopSection }) {
  return (
    <div
      className="i3-workshop-box"
      data-testid={`workshop-${section.id}`}
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
        transition:
          "border-color 0.18s var(--ease), box-shadow 0.18s var(--ease)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 10,
        }}
      >
        <LucideIcon
          name={WORKSHOP_ICONS[section.id] ?? "Sparkles"}
          size={14}
          color="var(--copper-300)"
        />
        <div
          style={{
            fontFamily: "var(--mono)",
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: "0.18em",
            color: "var(--copper-200)",
            textTransform: "uppercase",
          }}
        >
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

export function WorkshopsPanel() {
  const workshops = i3Content.workshops;
  return (
    <div
      role="tabpanel"
      data-testid="workshops-panel"
      aria-label="Workshops"
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 12,
        gap: 8,
        height: "100%",
        boxSizing: "border-box",
      }}
    >
      <div style={{ display: "flex", justifyContent: "flex-start" }}>
        <h2
          data-testid="workshops-title"
          style={{
            margin: 0,
            fontFamily: "var(--display)",
            fontSize: 18,
            fontWeight: 600,
            color: "var(--neutral-100)",
            letterSpacing: 0,
            lineHeight: 1.2,
            textAlign: "left",
          }}
        >
          {highlight("All the AI Workshops I facilitated", ["AI Workshops"])}
        </h2>
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
        {workshops.map((w) => (
          <SectionBox
            key={w.id}
            section={{
              id: w.id,
              heading: w.heading,
              bullets: w.bullets,
              kw: w.kw,
            }}
          />
        ))}
      </div>

      <style>{`
        .i3-workshop-box { transition: border-color 0.18s var(--ease), box-shadow 0.18s var(--ease); }
        .i3-workshop-box:hover { border-color: var(--copper-200); box-shadow: 0 0 0 1px var(--copper-200), 0 0 16px rgba(184,110,61,0.12); }
        .i3-workshop-box:hover svg { color: var(--copper-100) !important; }
        .i3-workshop-box::-webkit-scrollbar { width: 4px; }
        .i3-workshop-box::-webkit-scrollbar-track { background: transparent; }
        .i3-workshop-box::-webkit-scrollbar-thumb { background: var(--copper-800); border-radius: 2px; }
        .i3-workshop-box::-webkit-scrollbar-thumb:hover { background: var(--copper-700); }
      `}</style>
    </div>
  );
}
