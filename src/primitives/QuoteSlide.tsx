interface QuoteSlideProps {
  quote: string;
  attribution?: string;
}

export function QuoteSlide({ quote, attribution }: QuoteSlideProps) {
  return (
    <div className="flex h-full flex-col items-start justify-center px-32 py-24">
      <p
        className="mb-2 font-display text-copper-500"
        style={{ fontSize: "clamp(6rem, 10vw, 12rem)", lineHeight: 0.8 }}
      >
        &ldquo;
      </p>
      <blockquote
        className="max-w-[28ch] font-display"
        style={{ fontSize: "clamp(3.5rem, 6vw, 6rem)", lineHeight: 1.1 }}
      >
        {quote}
      </blockquote>
      {attribution && (
        <p
          className="mt-12 font-sans uppercase tracking-[0.2em] text-copper-300"
          style={{ fontSize: "clamp(1.25rem, 1.5vw, 1.75rem)" }}
        >
          <span aria-hidden>— </span>
          <span>{attribution}</span>
        </p>
      )}
    </div>
  );
}
