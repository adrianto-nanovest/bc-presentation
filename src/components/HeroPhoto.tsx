import { useState } from "react";

type VignetteSide = "bottom-left" | "bottom" | "right" | "none";

interface HeroPhotoProps {
  /**
   * Image path served from `assets/` (Vite `publicDir`). Pass an empty
   * string or `undefined` to skip the `<img>` entirely and paint only the
   * fallback gradient — used by the Title slide while the real hero asset
   * is still being procured (avoids a 404 in dev/prod consoles).
   */
  src?: string;
  alt: string;
  vignetteSide?: VignetteSide;
  /**
   * CSS background used when the image fails to load (404 or network error)
   * or when `src` is empty. Defaults to a deep near-black radial with
   * subtle copper-tinted glow — matches the "abstract data-flow topology"
   * mood described in the Title sub-spec.
   */
  fallbackBackground?: string;
}

const vignetteFor: Record<Exclude<VignetteSide, "none">, string> = {
  // Each gradient keeps the named region dark (~95% near-black) and
  // fades to ~30% opacity in the rest. Per memory rule
  // (feedback_slide_visual_conventions.md): backgrounds STAY STATIC.
  "bottom-left":
    "radial-gradient(ellipse at bottom left, rgba(10,10,10,0.95) 20%, rgba(10,10,10,0.35) 80%)",
  "bottom":
    "linear-gradient(180deg, rgba(10,10,10,0.2) 0%, rgba(10,10,10,0.92) 100%)",
  "right":
    "linear-gradient(270deg, rgba(10,10,10,0.95) 20%, rgba(10,10,10,0.3) 80%)",
};

// Default fallback — deep near-black with a soft copper-tinted glow that
// pools just below center. Mimics "fine copper threads converging across
// deep near-black space" without depending on an asset that may not exist.
const DEFAULT_FALLBACK =
  "radial-gradient(ellipse 80% 60% at 50% 55%, rgba(184,110,61,0.18) 0%, rgba(122,70,38,0.08) 35%, rgba(10,10,10,0.95) 75%, #050505 100%), #050505";

export function HeroPhoto({
  src,
  alt,
  vignetteSide = "bottom-left",
  fallbackBackground = DEFAULT_FALLBACK,
}: HeroPhotoProps) {
  const [errored, setErrored] = useState(false);
  const showFallback = !src || errored;
  return (
    <>
      {showFallback ? (
        <div
          data-testid="hero-fallback"
          aria-hidden={alt === ""}
          className="absolute inset-0 z-0 h-full w-full"
          style={{ background: fallbackBackground }}
        />
      ) : (
        <img
          src={src}
          alt={alt}
          role="img"
          aria-hidden={alt === ""}
          onError={() => setErrored(true)}
          className="absolute inset-0 z-0 h-full w-full object-cover"
        />
      )}
      {vignetteSide !== "none" && (
        <div
          data-testid="hero-vignette"
          className="absolute inset-0 z-10"
          style={{ background: vignetteFor[vignetteSide] }}
        />
      )}
    </>
  );
}
