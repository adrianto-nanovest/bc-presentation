// PeoplePanel — F.8 monitor · PEOPLE tab (spec §4.7).
//
// 5 stacked person cards, vertically scrollable. Generic knowledge-work
// personas only (no mining-specific names per audience-framing memory).
// `highlight()` is applied to the persona one-liner using each person's
// `kw`. The helper safely no-ops on keywords not present in the target
// text, so any role-side keywords in `kw` are simply skipped.
import type { CSSProperties } from "react";
import { highlight } from "../../../../components/highlight";

export interface PersonCard {
  id: string;
  initials: string;
  name: string;
  role: string;
  persona: string;
  lastInteraction: readonly [string, string];
  kw?: readonly string[];
}

export interface PeoplePanelProps {
  people: readonly PersonCard[];
  /** Spec §8.2 — kept for contract uniformity; PeoplePanel has no scripted beats. */
  highlighted?: readonly string[];
}

const MONO: CSSProperties = { fontFamily: "var(--mono)", letterSpacing: "0.18em", fontWeight: 500 };
const SI: CSSProperties = { fontFamily: "var(--serif)", fontStyle: "italic" };

export function PeoplePanel({ people }: PeoplePanelProps) {
  return (
    <div
      data-testid="people-panel"
      role="tabpanel"
      aria-label="People"
      style={{ display: "flex", flexDirection: "column", padding: 12, height: "100%", boxSizing: "border-box" }}
    >
      <div style={{ display: "flex", justifyContent: "flex-end", flex: "0 0 auto", marginBottom: 8 }}>
        <button
          type="button"
          data-testid="people-add-btn"
          className="f8-add-btn"
          style={{
            fontFamily: "var(--mono)", fontSize: 10, padding: "4px 10px",
            background: "transparent", border: "1px solid var(--copper-700)", borderRadius: 4,
            color: "var(--copper-200)", cursor: "pointer", letterSpacing: "0.12em", fontWeight: 500,
          }}
        >
          + NEW PERSON
        </button>
      </div>
      <div
        className="f8-people-list"
        onWheelCapture={(e) => e.stopPropagation()}
        style={{ flex: 1, minHeight: 0, overflowY: "auto", display: "flex", flexDirection: "column", gap: 10 }}
      >
        {people.map((p) => (
          <div
            key={p.id}
            data-testid={`person-${p.id}`}
            className="f8-person-card"
            style={{
              display: "flex", flexDirection: "row", alignItems: "flex-start", gap: 16,
              padding: 14, background: "var(--neutral-900)",
              border: "1px solid var(--copper-800)", borderRadius: 6,
              transition: "border-color 0.18s var(--ease), box-shadow 0.18s var(--ease)",
            }}
          >
            <span
              aria-hidden="true"
              style={{
                flex: "0 0 auto", display: "inline-flex",
                alignItems: "center", justifyContent: "center",
                width: 48, height: 48, borderRadius: 999,
                background: "var(--neutral-700)", color: "var(--copper-100)",
                ...MONO, fontSize: 14, fontWeight: 600,
              }}
            >
              {p.initials}
            </span>

            <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 2 }}>
              <span style={{ ...MONO, fontSize: 13, fontWeight: 500, color: "var(--copper-100)" }}>
                {p.name}
              </span>
              <span style={{ ...SI, fontSize: 11, color: "var(--neutral-300)", lineHeight: 1.35 }}>
                {p.role}
              </span>
              <span style={{ ...SI, fontSize: 11, color: "var(--neutral-200)", lineHeight: 1.4, marginTop: 4 }}>
                {p.kw && p.kw.length > 0 ? highlight(p.persona, p.kw) : p.persona}
              </span>
            </div>

            <div style={{ flex: "0 0 220px", display: "flex", flexDirection: "column", gap: 4 }}>
              <span style={{ ...MONO, fontSize: 9, color: "var(--copper-300)", letterSpacing: "0.18em" }}>
                LAST INTERACTION
              </span>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 4 }}>
                {p.lastInteraction.map((line, i) => (
                  <li
                    key={i}
                    style={{
                      display: "flex", alignItems: "flex-start", gap: 5,
                      fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 10,
                      color: "var(--neutral-200)", lineHeight: 1.4,
                    }}
                  >
                    <span aria-hidden="true" style={{ color: "var(--copper-300)", flex: "0 0 auto" }}>▸</span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .f8-person-card { transition: border-color 0.18s var(--ease), box-shadow 0.18s var(--ease); }
        .f8-person-card:hover {
          border-color: var(--copper-200);
          box-shadow: 0 0 0 1px var(--copper-200), 0 0 16px rgba(184,110,61,0.10);
        }
        .f8-add-btn:hover { border-color: var(--copper-200); color: var(--copper-100); }
        .f8-people-list::-webkit-scrollbar { width: 6px; }
        .f8-people-list::-webkit-scrollbar-track { background: transparent; }
        .f8-people-list::-webkit-scrollbar-thumb {
          background: var(--copper-700); border-radius: 3px;
        }
      `}</style>
    </div>
  );
}
