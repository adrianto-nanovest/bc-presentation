// DarkenOverlay — full-bleed dark wash over a hero photo. Used by the
// photographic slides (Title, C.1, C.5, Bridge) on top of HeroPhoto to
// modulate contrast against the foreground text.
//
// Scaffolded; later tasks may layer a vignette gradient on top.
import type { CSSProperties } from "react";

export interface DarkenOverlayProps {
  /** 0–1 wash opacity. 0 = no darken, 1 = fully black. */
  strength: number;
  /** Override stacking. Default sits between HeroPhoto (z-0) and content (z-20). */
  zIndex?: number;
}

export function DarkenOverlay({ strength, zIndex = 15 }: DarkenOverlayProps) {
  const clamped = Math.max(0, Math.min(1, strength));
  const style: CSSProperties = {
    position: "absolute",
    inset: 0,
    background: `rgba(10,10,10,${clamped})`,
    pointerEvents: "none",
    zIndex,
  };
  return <div data-testid="darken-overlay" data-strength={clamped} style={style} />;
}
