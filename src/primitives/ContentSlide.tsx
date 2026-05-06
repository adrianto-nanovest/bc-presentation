// Spec frontend-slides density rule: max 6 bullets per content slide.
// Throwing here forces the violation to surface during dev — splitting into
// two slides is the correct response, never silently truncating.
interface ContentSlideProps {
  heading: string;
  bullets?: string[];
  paragraphs?: string[];
}

const MAX_BULLETS = 6;

export function ContentSlide({ heading, bullets, paragraphs }: ContentSlideProps) {
  if (bullets && bullets.length > MAX_BULLETS) {
    throw new Error(
      `ContentSlide max 6 bullets per spec; got ${bullets.length}. Split into two slides.`,
    );
  }
  return (
    <div className="flex h-full flex-col justify-center px-32 py-24">
      <h2
        className="mb-12 font-serif"
        style={{ fontSize: "clamp(2.5rem, 4.5vw, 4rem)", lineHeight: 1.15 }}
      >
        {heading}
      </h2>
      {bullets && (
        <ul className="space-y-6">
          {bullets.map((b, i) => (
            <li
              key={i}
              className="flex items-start gap-6 font-serif"
              style={{
                fontSize: "clamp(2.25rem, 2.5vw, 2.75rem)",
                lineHeight: 1.6,
              }}
            >
              <span className="mt-4 inline-block h-3 w-3 shrink-0 bg-copper-500" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}
      {paragraphs?.map((p, i) => (
        <p
          key={i}
          className="mt-8 max-w-[60ch] font-serif"
          style={{
            fontSize: "clamp(2.25rem, 2.5vw, 2.75rem)",
            lineHeight: 1.6,
          }}
        >
          {p}
        </p>
      ))}
    </div>
  );
}
