// FacetMenu — Section F left-side vertical menu (480px wide).
//
// Mirrors E.8's left-pane pitfall card pattern
// (`src/slides/foundation-core-section-e/e8-context-the-wall.tsx:52-168`):
// mono-uppercase header span → copper rule (40% width) → 16px gap → facet
// cards stacked with 12px gap → flex spacer → italic copper-200 footer.
//
// Each facet card consists of a LucideIcon (20px) + flex column with
// mono-uppercase title (fontSize 12, letterSpacing 0.18em, copper-100) and
// italic serif essence (fontSize 13, neutral-300). Hover toggles border color
// (copper-800 → copper-200) and background (transparent → rgba(184,110,61,0.06))
// with a 0.2s var(--ease) transition.
//
// Cards are wrapped in `<Reveal on={showCards} delay={120 + i * 90}>` matching
// E.8's cascade timing. `data-active="true"|"false"` is applied per card based
// on hover state so downstream tests can assert active facet.
import { highlight } from "@/components/highlight";
import { Reveal, CopperRule } from "./Reveal";
import { LucideIcon } from "./LucideIcon";

export interface FacetItem {
  id: string;
  /** Uppercase mono, e.g., "WHAT IT IS". Rendered verbatim. */
  title: string;
  /** Italic serif copy. */
  essence: string;
  /** Substrings of `essence` to highlight at render. */
  essenceKw?: readonly string[];
  /** lucide-react icon name (resolved via LucideIcon component). */
  icon: string;
}

export interface FacetMenuProps {
  items: readonly FacetItem[];
  activeFacet: string | null;
  onHover: (id: string | null) => void;
  /** Gate for the per-card reveal cascade. */
  showCards: boolean;
  /**
   * Optional per-step gate. When provided, each card uses
   * `Reveal on={i <= revealUntilIndex}` instead of the single `showCards`
   * boolean. Lets a slide reveal facets one-by-one tied to stepIndex
   * (e.g. F.2's spec §5.6 — steps 1–5 each reveal one facet item).
   * When undefined, falls back to the original showCards behaviour
   * (all cards cascade at once with per-item Reveal delays).
   */
  revealUntilIndex?: number;
  /** e.g. "FIVE FACETS · RAG" — mono uppercase header above copper rule. */
  header?: string;
  /** Italic copper-200 footer copy. Reveal-gated by `showFooter`. */
  footer?: string;
  footerKw?: readonly string[];
  showFooter?: boolean;
}

export function FacetMenu({
  items,
  activeFacet,
  onHover,
  showCards,
  revealUntilIndex,
  header,
  footer,
  footerKw,
  showFooter = false,
}: FacetMenuProps) {
  return (
    <div
      data-testid="f-facet-menu"
      style={{
        position: "absolute",
        left: 48,
        top: 156,
        width: 480,
        bottom: 80,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {header ? (
        <>
          <span
            style={{
              fontFamily: "var(--mono)",
              fontSize: 11,
              letterSpacing: "0.22em",
              color: "var(--copper-300)",
              textTransform: "uppercase",
            }}
          >
            {header}
          </span>
          <div style={{ marginTop: 12 }}>
            <CopperRule on width="40%" />
          </div>
        </>
      ) : null}

      <div
        data-testid="f-facet-list"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          marginTop: 16,
        }}
      >
        {items.map((item, i) => {
          const isHover = activeFacet === item.id;
          const itemOn =
            revealUntilIndex !== undefined
              ? i <= revealUntilIndex
              : showCards;
          return (
            <Reveal
              key={item.id}
              on={itemOn}
              delay={120 + i * 90}
              data-testid={`facet-item-${item.id}`}
              data-active={isHover ? "true" : "false"}
            >
              <div
                onMouseEnter={() => onHover(item.id)}
                onMouseLeave={() => onHover(null)}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 12,
                  padding: "10px 12px",
                  border: "1px solid",
                  borderColor: isHover
                    ? "var(--copper-200)"
                    : "var(--copper-800)",
                  background: isHover
                    ? "rgba(184,110,61,0.06)"
                    : "transparent",
                  transition:
                    "border-color 0.2s var(--ease), background 0.2s var(--ease)",
                  cursor: "pointer",
                }}
              >
                <div style={{ marginTop: 2 }}>
                  <LucideIcon name={item.icon} size={20} />
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: 12,
                      letterSpacing: "0.18em",
                      color: "var(--copper-100)",
                      textTransform: "uppercase",
                    }}
                  >
                    {item.title}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--serif)",
                      fontStyle: "italic",
                      fontSize: 13,
                      color: "var(--neutral-300)",
                      marginTop: 3,
                    }}
                  >
                    {item.essenceKw && item.essenceKw.length > 0
                      ? highlight(item.essence, item.essenceKw)
                      : item.essence}
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      <div style={{ flex: 1 }} />

      {footer ? (
        <Reveal on={showFooter} data-testid="f-facet-footer">
          <p
            style={{
              fontFamily: "var(--serif)",
              fontStyle: "italic",
              fontSize: 15,
              color: "var(--copper-200)",
              margin: 0,
              lineHeight: 1.4,
            }}
          >
            {footerKw && footerKw.length > 0
              ? highlight(footer, footerKw)
              : footer}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
