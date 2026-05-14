// B4CategoryCard — left-column list of 6 category cards for slide B.4.
//
// Cards follow the A.1 / E.8 box pattern: [icon] [uppercase mono label +
// serif-italic essence] with a 1px copper border and a `rgba(10,10,10,0.6)`
// dark fill. Hover state brightens the border and lays a copper wash over
// the background.
//
// Interaction (parent owns state):
//   - `onHover(id|null)` fires on mouse enter/leave.
//   - Visual "active" state = `id === activeId`.
//
// Step-1 (qualitative summary) keeps hover highlighting on cards but the
// right pane stops responding to it — that gating lives in the slide.
import type { CSSProperties } from "react";
import { PenLine, Code2, Wrench, Eye, Sparkles, DollarSign, Pin } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { highlight as KW } from "@/components/highlight";
import { Reveal } from "../../foundation-core-section-e/components/Reveal";
import type { B4Category, B4CategoryId, B4IconName } from "../content";

const ICONS: Record<B4IconName, LucideIcon> = {
  PenLine,
  Code2,
  Wrench,
  Eye,
  Sparkles,
  DollarSign,
};

const CARD_HEIGHT = 64;
const CARD_GAP = 10;

export interface B4CategoryListProps {
  categories: readonly B4Category[];
  activeId: B4CategoryId | null;
  /** Which card is currently pinned (step 0 only). null when nothing pinned. */
  pinnedId?: B4CategoryId | null;
  onHover: (id: B4CategoryId | null) => void;
  /** Click handler — when defined, cards become clickable to toggle pin.
   *  Pass `undefined` to disable (e.g. step 1 lets clicks bubble to advance). */
  onClick?: (id: B4CategoryId) => void;
  /** Cards render only when true; gated on slide mount (always true for B4). */
  showCards: boolean;
}

export function B4CategoryList({
  categories,
  activeId,
  pinnedId = null,
  onHover,
  onClick,
  showCards,
}: B4CategoryListProps) {
  return (
    <div
      data-testid="b4-category-list"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: CARD_GAP,
        width: "100%",
      }}
    >
      {categories.map((cat, i) => (
        <Reveal
          key={cat.id}
          on={showCards}
          delay={120 + i * 90}
          data-testid={`b4-card-reveal-${cat.id}`}
        >
          <B4CategoryCard
            cat={cat}
            active={cat.id === activeId}
            pinned={cat.id === pinnedId}
            onHover={onHover}
            onClick={onClick}
          />
        </Reveal>
      ))}
    </div>
  );
}

interface CardProps {
  cat: B4Category;
  active: boolean;
  pinned: boolean;
  onHover: (id: B4CategoryId | null) => void;
  onClick?: (id: B4CategoryId) => void;
}

function B4CategoryCard({ cat, active, pinned, onHover, onClick }: CardProps) {
  const Icon = ICONS[cat.iconName];

  const shellStyle: CSSProperties = {
    position: "relative",
    display: "flex",
    alignItems: "center",
    gap: 12,
    minHeight: CARD_HEIGHT,
    width: "100%",
    padding: "10px 14px",
    boxSizing: "border-box",
    border: "1px solid",
    borderColor: pinned
      ? "var(--copper-300)"
      : active
        ? "var(--copper-200)"
        : "var(--copper-700)",
    background: pinned
      ? "rgba(184,110,61,0.08)"
      : active
        ? "rgba(184,110,61,0.06)"
        : "rgba(10,10,10,0.6)",
    boxShadow: pinned
      ? "inset 0 0 0 1px rgba(217, 158, 108, 0.3)"
      : "none",
    cursor: onClick ? "pointer" : "default",
    transition:
      "border-color 200ms var(--ease), background 200ms var(--ease), box-shadow 200ms var(--ease)",
  };

  return (
    <div
      data-testid={`b4-card-${cat.id}`}
      data-active={active ? "1" : "0"}
      data-pinned={pinned ? "1" : "0"}
      onMouseEnter={() => onHover(cat.id)}
      onMouseLeave={() => onHover(null)}
      onClick={onClick ? () => onClick(cat.id) : undefined}
      style={shellStyle}
    >
      {pinned && (
        <div
          aria-label="pinned"
          style={{
            position: "absolute",
            top: 6,
            right: 8,
            width: 14,
            height: 14,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--copper-200)",
          }}
        >
          <Pin size={11} color="currentColor" strokeWidth={1.75} />
        </div>
      )}

      <div
        style={{
          flex: "0 0 22px",
          width: 22,
          height: 22,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--copper-300)",
        }}
      >
        <Icon size={22} color="currentColor" strokeWidth={1.5} />
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontFamily: "var(--mono)",
            fontSize: 12,
            letterSpacing: "0.18em",
            color: "var(--copper-100)",
            textTransform: "uppercase",
            lineHeight: 1,
          }}
        >
          {cat.label}
        </div>
        <div
          style={{
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontSize: 13,
            color: "var(--neutral-300)",
            marginTop: 4,
            lineHeight: 1.3,
          }}
        >
          {KW(cat.essence, cat.essenceKw)}
        </div>
      </div>
    </div>
  );
}
