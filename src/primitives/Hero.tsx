// Spec §6.3 — Apple-discipline photography-anchored hero.
// Used for: title slide, section dividers, Hook 1, Section I (Showcase).
interface HeroProps {
  title: string;
  subtitle?: string;
  imageSrc?: string;
  attribution?: string;
}

export function Hero({ title, subtitle, imageSrc, attribution }: HeroProps) {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      {imageSrc && (
        <img
          src={imageSrc}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover opacity-70"
        />
      )}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,10,10,0.2) 0%, rgba(10,10,10,0.85) 100%)",
        }}
      />
      <div className="relative z-10 mx-auto max-w-[80vw] px-24 text-center">
        <h1
          className="font-display"
          style={{ fontSize: "var(--fs-display, clamp(4.5rem, 8vw, 9rem))", lineHeight: 1.05 }}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className="mt-8 font-serif text-copper-300"
            style={{ fontSize: "clamp(1.75rem, 2.25vw, 2.5rem)" }}
          >
            {subtitle}
          </p>
        )}
      </div>
      {attribution && (
        <p
          className="absolute bottom-8 left-12 font-sans text-copper-300/80"
          style={{ fontSize: "clamp(1rem, 1.1vw, 1.25rem)" }}
        >
          {attribution}
        </p>
      )}
    </div>
  );
}
