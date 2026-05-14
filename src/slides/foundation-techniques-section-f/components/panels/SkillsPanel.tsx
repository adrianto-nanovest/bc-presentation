// F.8 — SkillsPanel (Task #7, extended Task #24, refreshed Task #34). 4-col
// scrollable grid of skill chips with a CSS-only top-right hover popover
// (spec §4.2, §6.4). Chips are row-flex with a LucideIcon on the left and the
// label/micro stacked on the right; clicking fires onSkillSelect with the
// chip's command string. A "+ NEW SKILL" button sits above the grid.
// Self-contained.
import { highlight } from "../../../../components/highlight";
import { LucideIcon } from "../LucideIcon";

const SKILL_ICONS: Record<string, string> = {
  "vault-cleanup": "Trash2",
  "morning-brief": "Sun",
  "inbox-triage": "Inbox",
  "deep-research": "Telescope",
  "yt-titles": "Youtube",
  "outline": "ListTree",
  "kb-query": "BookOpen",
  "carousel": "Layers",
  "short-form": "Film",
  "lightrag-upload": "Upload",
  "reply-drafter": "Reply",
  "meeting-notes": "NotebookPen",
  "calendar-optimizer": "CalendarCheck",
  "prd-drafter": "FileSpreadsheet",
};

export interface SkillCard {
  id: string;
  command: string;
  label: string;
  micro: string;
  popover: string;
  kw?: readonly string[];
}

export interface SkillsPanelProps {
  skills: readonly SkillCard[];
  onSkillSelect?: (command: string) => void;
  /** §8.2 contract — unused; SkillsPanel has no scripted beats. */
  highlighted?: readonly string[];
}

export function SkillsPanel({ skills, onSkillSelect }: SkillsPanelProps) {
  return (
    <div
      role="tabpanel"
      data-testid="skills-panel"
      aria-label="Skills"
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
          data-testid="skills-add-btn"
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
          + NEW SKILL
        </button>
      </div>

      <div
        className="f8-skills-grid"
        style={{
          flex: 1,
          minHeight: 0,
          overflowY: "auto",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 12,
        }}
      >
        {skills.map((s) => (
          <button
            key={s.id}
            type="button"
            data-testid={`skill-${s.id}`}
            onClick={() => onSkillSelect?.(s.command)}
            className="skill-chip"
            aria-label={`${s.label} — ${s.micro}`}
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              padding: "10px 12px",
              minHeight: 64,
              borderRadius: 4,
              cursor: "pointer",
              textAlign: "left",
              color: "inherit",
            }}
          >
            <span
              className="skill-icon"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 28,
                height: 28,
                flex: "0 0 28px",
                color: "var(--copper-300)",
                transition: "color 0.18s var(--ease)",
              }}
            >
              <LucideIcon name={SKILL_ICONS[s.id] ?? "Sparkles"} size={16} />
            </span>
            <span
              style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                minWidth: 0,
                gap: 2,
              }}
            >
              <span
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 11,
                  fontWeight: 500,
                  color: "var(--copper-100)",
                  letterSpacing: "0.06em",
                }}
              >
                {s.kw && s.kw.length > 0 ? highlight(s.label, s.kw) : s.label}
              </span>
              <span
                style={{
                  fontFamily: "var(--serif)",
                  fontStyle: "italic",
                  fontSize: 10,
                  color: "var(--neutral-400)",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {s.micro}
              </span>
            </span>

            <span
              className="skill-popover"
              role="tooltip"
              style={{
                position: "absolute",
                bottom: "calc(100% + 8px)",
                right: 0,
                width: 240,
                padding: "10px 12px",
                background: "var(--neutral-900)",
                border: "1px solid var(--copper-700)",
                boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
                fontFamily: "var(--serif)",
                fontStyle: "italic",
                fontSize: 11.5,
                color: "var(--neutral-200)",
                lineHeight: 1.45,
                opacity: 0,
                pointerEvents: "none",
                transition: "opacity 0.18s var(--ease)",
                zIndex: 30,
              }}
            >
              {s.popover}
            </span>
          </button>
        ))}
      </div>

      <style>{`
        .skill-chip {
          background: var(--neutral-900);
          border: 1px solid var(--copper-800);
          transition: border-color 0.18s var(--ease), background 0.18s var(--ease);
        }
        .skill-chip:hover {
          border-color: var(--copper-200);
          background: rgba(184,110,61,0.08);
        }
        .skill-chip:hover .skill-icon { color: var(--copper-100); }
        .skill-chip:hover .skill-popover { opacity: 1; }
        .f8-add-btn:hover { border-color: var(--copper-200); color: var(--copper-100); }
        .f8-skills-grid::-webkit-scrollbar { width: 6px; }
        .f8-skills-grid::-webkit-scrollbar-track { background: transparent; }
        .f8-skills-grid::-webkit-scrollbar-thumb {
          background: var(--copper-700); border-radius: 3px;
        }
      `}</style>
    </div>
  );
}
