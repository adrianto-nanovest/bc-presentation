// B3ParamTile — single parameter tile shell for slide B.3.
//
// Composition (180 × 205 tile, symmetric 14px top/bottom padding):
//   ┌──────────────────────────────┐
//   │ 14px padding-top                              │
//   │  LABEL (mono caps · 11px · copper-500) ~14px  │
//   │  14px gap                                     │
//   │  ANIMATION SLOT (75px · `.d3-anim` shell)     │
//   │  14px gap                                     │
//   │  • bullet 1 (→ glyph + serif 11px · nowrap)   │
//   │  • bullet 2          (3 × 20 = 60px total)    │
//   │  • bullet 3                                   │
//   │ 14px padding-bottom                           │
//   └──────────────────────────────┘
//   Stack math: 14 + 14 + 14 + 75 + 14 + 60 + 14 = 205. Symmetric padding =
//   gap between top border and label equals gap between last bullet and
//   bottom border. (Fix #14.1: tile height 215 → 205 to compensate for the
//   right-column grid being pushed 20px lower so its top edge aligns with
//   the LEFT column's RAW INPUT box top.)
//   Hover lift (delight only — no detail popcard):
//     • border: copper-800 → copper-300
//     • scale:  1.0 → 1.06
//     • drop-shadow: copper-300 8px blur 30% opacity
//
// Bullet style mirrors `B2FieldsTerminology.FocalDetail` (mono `→` glyph in
// copper-400 + serif body), with `KW(text, keywords)` for inline italic
// copper-300 keyword highlight.

import { useState, type CSSProperties, type ReactNode } from "react";
import { highlight as KW } from "@/components/highlight";

export interface B3ParamTileBulletInput {
  text: string;
  keywords: readonly string[];
}

export interface B3ParamTileProps {
  /** Mono-caption tile heading (already in caps in content). */
  label: string;
  /** Max 3 short bullets, each one line at tile width. */
  bullets: ReadonlyArray<B3ParamTileBulletInput>;
  /** Animation component rendered inside the 80px shell. */
  children: ReactNode;
  /**
   * Optional style overrides. Used by C.2 v2's 2×2 grid where the tile needs
   * to stretch (`height: "100%"`, `width: "100%"`) inside a CSS Grid cell
   * rather than the default fixed 180×205. Merged AFTER hover-driven props,
   * so callers can override width/height while hover transitions still work.
   */
  style?: CSSProperties;
  /**
   * When `true`, bullets wrap to multiple lines instead of `whiteSpace:
   * nowrap`. Used by narrower grid cells (e.g. C.2 v2's ~225px tiles) where
   * some bullets exceed one line. Default `false` matches B.3 behavior.
   */
  allowBulletWrap?: boolean;
}

export function B3ParamTile({
  label,
  bullets,
  children,
  style,
  allowBulletWrap = false,
}: B3ParamTileProps) {
  const [hovered, setHovered] = useState(false);

  const tileStyle: CSSProperties = {
    position: "relative",
    width: 180,
    height: 205,
    padding: "14px 14px",
    display: "flex",
    flexDirection: "column",
    gap: 14,
    border: `1px solid ${hovered ? "var(--copper-300)" : "var(--copper-800)"}`,
    background: hovered ? "rgba(217,158,108,0.05)" : "rgba(10,10,10,0.55)",
    transform: hovered ? "scale(1.06)" : "scale(1)",
    transformOrigin: "center",
    boxShadow: hovered
      ? "0 0 8px rgba(217,158,108,0.3), 0 0 22px -10px rgba(217,158,108,0.5)"
      : "none",
    transition:
      "transform 200ms var(--ease), border-color 200ms var(--ease), box-shadow 200ms var(--ease), background 200ms var(--ease)",
    zIndex: hovered ? 20 : 1,
    cursor: "default",
    boxSizing: "border-box",
    // Caller overrides (e.g. width/height for grid-stretch). Merged last so
    // grid cells can stretch the tile beyond the default 180×205 footprint.
    ...style,
  };

  return (
    <div
      data-testid={`b3-tile-${slug(label)}`}
      data-hovered={hovered ? "1" : "0"}
      style={tileStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Label — locked to 14px line-box so the symmetric-padding math holds. */}
      <span
        style={{
          fontFamily: "var(--mono)",
          fontSize: 11,
          lineHeight: "14px",
          letterSpacing: "0.22em",
          color: "var(--copper-500)",
          textTransform: "uppercase",
        }}
      >
        {label}
      </span>

      {/* Animation slot — 75px tall (Fix #14.1: shrunk from 85 with the
          tile, so the stack math still adds to 205). Inner SVGs in
          `B3ParamAnims` render at ~60px height inside SHELL_STYLE flex
          centering, so they still slot cleanly into the 75px shell. */}
      <div
        className="d3-anim"
        style={{
          height: 75,
          padding: 0,
          gap: 0,
        }}
      >
        {children}
      </div>

      {/* Bullets — B.2 FocalDetail style: mono → + serif body.
          Each row is a 20px line-box, no marginBottom: 3 × 20 = 60px total.
          That's the bottom slice of the symmetric stack:
            14 + 14(label) + 14 + 75(anim) + 14 + 60(bullets) + 14 = 205. */}
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
        }}
      >
        {bullets.slice(0, 3).map((b, i) => (
          <li
            key={i}
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 6,
              // In wrap mode we drop the fixed line-box so multi-line bullets
              // can grow vertically; default keeps the 20px row baseline used
              // by B.3 for its symmetric padding math.
              minHeight: 20,
              marginBottom: 0,
            }}
          >
            <span
              aria-hidden
              style={{
                fontFamily: "var(--mono)",
                fontSize: 11,
                color: "var(--copper-400)",
                lineHeight: "20px",
                flex: "0 0 auto",
              }}
            >
              →
            </span>
            <span
              style={{
                fontFamily: "var(--serif)",
                fontSize: 11,
                color: "var(--neutral-200)",
                lineHeight: "20px",
                whiteSpace: allowBulletWrap ? "normal" : "nowrap",
                wordWrap: allowBulletWrap ? "break-word" : "normal",
              }}
            >
              {KW(b.text, b.keywords)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function slug(label: string) {
  return label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
