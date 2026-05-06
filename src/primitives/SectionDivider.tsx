// Between-section divider. Big letter + label, Apple-hero discipline,
// optional photography in the back. Used between A↔B, B↔C, etc.
interface SectionDividerProps {
  letter: string;
  label: string;
  imageSrc?: string;
}

export function SectionDivider({ letter, label, imageSrc }: SectionDividerProps) {
  return (
    <div className="relative flex h-full w-full items-center">
      {imageSrc && (
        <img
          src={imageSrc}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
      )}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(10,10,10,0.95) 30%, rgba(10,10,10,0.4) 100%)",
        }}
      />
      <div className="relative z-10 px-32">
        <p
          className="font-display text-copper-500"
          style={{ fontSize: "clamp(8rem, 14vw, 16rem)", lineHeight: 0.95 }}
        >
          {letter}
        </p>
        <p
          className="mt-4 font-serif"
          style={{ fontSize: "clamp(2.5rem, 4.5vw, 4rem)", lineHeight: 1.15 }}
        >
          {label}
        </p>
      </div>
    </div>
  );
}
