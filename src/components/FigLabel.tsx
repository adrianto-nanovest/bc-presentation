// The figure caption every numbered slide prints, top-left of the stage.
//
// Spec §3.5 — the letter and number are DERIVED from the slide's position in
// the composed deck and read off the slide-number context. They are not props,
// deliberately: a slide that could name its own number is a slide that goes
// stale the moment the deck is cut, reordered or inserted into, which is what
// `E.1, E.2, E.4 …` looked like before this.
//
// DO NOT ADD A `section` / `num` PROP BACK, not even as a fallback. A fallback
// path is how the hardcoding survives, and the leader deck (Phase 4) and E.12's
// insertion (Phase 5) would then have two sources of truth for one string.
import { useSlideNumber } from "@/deck/SlideNumberContext";

export function FigLabel({ label }: { label: string }) {
  const { letter, num, sectionKey } = useSlideNumber();

  // `numbered: false` slides claim no number. The cover is the only one, and it
  // prints no FigLabel — so arriving here means a slide grew a caption it has
  // no number for. `FIG. A.null` in front of a room is worse than a red build.
  if (num === null) {
    throw new Error(
      `FigLabel ${JSON.stringify(label)} rendered on a slide that claims no ` +
        `number (numbered: false, section "${sectionKey}" → letter ` +
        `"${letter}"). Either give the slide a number or drop the FigLabel.`,
    );
  }

  return (
    <div className="fig-label">
      — FIG. {letter}.{num}
      <span className="dot">·</span>
      <span style={{ color: "var(--copper-200)" }}>{label}</span>
    </div>
  );
}
