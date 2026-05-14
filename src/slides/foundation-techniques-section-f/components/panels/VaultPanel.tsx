// VaultPanel — F.8 Vault tab (spec §4.4). Scrollable folder list (left) +
// document preview pane (right). Selection is panel-local; default comes from
// `vault.selectedFolder`. Preview falls back to the "drafts" entry, then to an
// empty body keyed on the folder name — keeps the mockup robust.
import { useState, type CSSProperties } from "react";

export interface VaultFolder { readonly id: string; readonly name: string; readonly count: number; }
export interface VaultPreview { readonly title: string; readonly lastEdited: string; readonly body: readonly string[]; }
export interface VaultContent {
  readonly folders: readonly VaultFolder[];
  readonly selectedFolder: string;
  readonly previews: Readonly<Record<string, VaultPreview>>;
}
export interface VaultPanelProps { readonly vault: VaultContent; }

const MONO: CSSProperties = { fontFamily: "var(--mono)", letterSpacing: "0.12em", fontWeight: 500 };
const ITALIC: CSSProperties = { fontFamily: "var(--serif)", fontStyle: "italic" };

export function VaultPanel({ vault }: VaultPanelProps) {
  const [selectedId, setSelectedId] = useState<string>(vault.selectedFolder);
  const folder = vault.folders.find((f) => f.id === selectedId) ?? null;
  const preview: VaultPreview =
    vault.previews[selectedId] ??
    vault.previews["drafts"] ??
    { title: folder?.name ?? "", lastEdited: "", body: [] };

  return (
    <div
      data-testid="vault-panel"
      role="tabpanel"
      aria-label="Vault"
      style={{ display: "flex", flexDirection: "column", padding: 12, gap: 8, height: "100%", boxSizing: "border-box" }}
    >
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          type="button"
          data-testid="vault-add-btn"
          className="f8-add-btn"
          style={{
            fontFamily: "var(--mono)", fontSize: 10, padding: "4px 10px",
            background: "transparent", border: "1px solid var(--copper-700)", borderRadius: 4,
            color: "var(--copper-200)", cursor: "pointer", letterSpacing: "0.12em", fontWeight: 500,
          }}
        >+ NEW DOCUMENT</button>
      </div>
      <div style={{ display: "flex", flex: 1, minHeight: 0, gap: 12 }}>
        <div
          className="f8-vault-list"
          role="listbox"
          aria-label="Vault folders"
          onWheelCapture={(e) => e.stopPropagation()}
          style={{
            flex: "0 0 230px", overflowY: "auto",
            background: "var(--neutral-900)", border: "1px solid var(--copper-800)", borderRadius: 4,
          }}
        >
          {vault.folders.map((f) => {
            const selected = f.id === selectedId;
            return (
              <div
                key={f.id}
                role="option"
                aria-selected={selected}
                tabIndex={0}
                onClick={() => setSelectedId(f.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSelectedId(f.id); }
                }}
                className={`f8-vault-row${selected ? " f8-vault-row--selected" : ""}`}
                style={{
                  display: "flex", alignItems: "center", height: 36, padding: "6px 10px",
                  borderBottom: "1px solid var(--copper-900)",
                  borderLeft: selected ? "2px solid var(--copper-200)" : "2px solid transparent",
                  background: selected ? "rgba(184,110,61,0.15)" : "transparent",
                  cursor: "pointer", boxSizing: "border-box",
                }}
              >
                <span style={{
                  ...MONO, fontSize: 12, color: "var(--copper-200)", flex: 1,
                  overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                }}>{f.name}</span>
                <span style={{ ...ITALIC, fontSize: 11, color: "var(--neutral-400)" }}>{f.count}</span>
              </div>
            );
          })}
        </div>

        <div
          role="region"
          aria-label="Document preview"
          style={{
            flex: 1, minWidth: 0,
            background: "var(--neutral-900)", border: "1px solid var(--copper-800)", borderRadius: 4,
            padding: "12px 14px", display: "flex", flexDirection: "column", gap: 10, boxSizing: "border-box",
          }}
        >
          <div style={{
            display: "flex", alignItems: "baseline", gap: 8,
            borderBottom: "1px solid var(--copper-900)", paddingBottom: 8,
          }}>
            <span style={{
              ...ITALIC, fontSize: 14, color: "var(--copper-100)", flex: 1,
              overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
            }}>{preview.title}</span>
            <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--neutral-400)", letterSpacing: "0.08em" }}>
              {preview.lastEdited}
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {preview.body.map((p, i) => (
              <p key={i} style={{
                ...ITALIC, fontSize: 11, lineHeight: 1.55, color: "var(--neutral-300)", margin: 0,
              }}>{p}</p>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .f8-vault-list::-webkit-scrollbar { width: 4px; }
        .f8-vault-list::-webkit-scrollbar-track { background: transparent; }
        .f8-vault-list::-webkit-scrollbar-thumb { background: var(--copper-800); border-radius: 2px; }
        .f8-vault-list::-webkit-scrollbar-thumb:hover { background: var(--copper-700); }
        .f8-vault-row:hover { background: rgba(184,110,61,0.10); }
        .f8-vault-row--selected:hover { background: rgba(184,110,61,0.20); }
        .f8-vault-row:focus-visible { outline: 1px solid var(--copper-200); outline-offset: -2px; }
        .f8-add-btn:hover { border-color: var(--copper-200); color: var(--copper-100); }
      `}</style>
    </div>
  );
}
