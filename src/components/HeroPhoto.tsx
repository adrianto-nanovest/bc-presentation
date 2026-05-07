type VignetteSide = "bottom-left" | "bottom" | "right";

interface HeroPhotoProps {
  src: string;
  alt: string;
  vignetteSide?: VignetteSide;
}

const vignetteFor: Record<VignetteSide, string> = {
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

export function HeroPhoto({
  src,
  alt,
  vignetteSide = "bottom-left",
}: HeroPhotoProps) {
  return (
    <>
      <img
        src={src}
        alt={alt}
        role="img"
        aria-hidden={alt === ""}
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div
        data-testid="hero-vignette"
        className="absolute inset-0 z-10"
        style={{ background: vignetteFor[vignetteSide] }}
      />
    </>
  );
}
