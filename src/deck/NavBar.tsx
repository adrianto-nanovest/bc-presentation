import { type MouseEvent } from "react";
import { useDeck } from "./DeckContext";
import { SECTION_NAMES, type SectionKey } from "./sections";

// Six chevron variants used by the nav buttons. SVG paths copied verbatim
// from the original Claude-Design shell so the visual stays identical.
type ChevDir = "left" | "right" | "dleft" | "dright" | "reset-step" | "reset-deck";

function IconChev({ dir }: { dir: ChevDir }) {
  if (dir === "left")
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <polyline points="15 18 9 12 15 6" />
      </svg>
    );
  if (dir === "right")
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <polyline points="9 18 15 12 9 6" />
      </svg>
    );
  if (dir === "dleft")
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <polyline points="11 18 5 12 11 6" />
        <polyline points="19 18 13 12 19 6" />
      </svg>
    );
  if (dir === "dright")
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <polyline points="13 18 19 12 13 6" />
        <polyline points="5 18 11 12 5 6" />
      </svg>
    );
  if (dir === "reset-step")
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M3 12a9 9 0 1 0 3-6.7" />
        <polyline points="3 4 3 10 9 10" />
      </svg>
    );
  // reset-deck
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M3 12a9 9 0 1 0 3-6.7" />
      <polyline points="3 4 3 10 9 10" />
      <line x1="14" y1="9" x2="14" y2="15" />
      <line x1="18" y1="9" x2="18" y2="15" />
    </svg>
  );
}

export interface NavBarProps {
  /**
   * The DERIVED display letter of the showing slide's section (§3.5). Handed
   * down by `<Slide>` from the composed deck, so the nav chrome holds no letter
   * of its own and cannot disagree with the figure number beside it.
   *
   * A plain `string`, not `SlideSection`: the composer hands out letters up to
   * "Q" and the union stops at "K".
   */
  letter: string;
  /**
   * The showing slide's section, as a semantic KEY (§3.3) — the tag looks its
   * name up in `SECTION_NAMES` (gh#39).
   *
   * The key, and not the name, because the letter beside it is only a position:
   * §4.3 re-letters every section for the leader deck, so a name derived from
   * the letter — or from a slide id — would read correctly in one deck and lie
   * in the other. The key is the same in both.
   */
  sectionKey: SectionKey;
}

// Hover-revealed bottom nav. The outer `.nav-zone` is a transparent hot-zone
// that triggers the reveal CSS in globals.css; `.nav-bar` is the visible
// pill. `data-no-advance` prevents Slide.tsx's click-to-advance handler
// (T6) from firing when the nav is interacted with — the inner `stop`
// handlers are belt-and-braces against synthetic-event bubbling quirks.
export function NavBar({ letter, sectionKey }: NavBarProps) {
  const {
    slideIndex,
    stepIndex,
    stepCounts,
    goTo,
    nextStep,
    prevStep,
    resetStep,
    resetDeck,
  } = useDeck();

  const totalSteps = stepCounts[slideIndex] ?? 1;
  const totalSlides = stepCounts.length;

  const atFirstStep = stepIndex <= 0;
  const atLastStep = stepIndex >= totalSteps - 1;
  const atFirstSlide = slideIndex <= 0;
  const atLastSlide = slideIndex >= totalSlides - 1;

  const stop = (e: MouseEvent<HTMLElement>) => e.stopPropagation();

  const stepCount = `${String(stepIndex + 1).padStart(2, "0")} / ${String(totalSteps).padStart(2, "0")}`;
  const slideCount = `${String(slideIndex + 1).padStart(2, "0")} / ${String(totalSlides).padStart(2, "0")}`;

  return (
    <div className="nav-zone" data-no-advance>
      <div className="nav-bar" onClick={stop} onMouseDown={stop}>
        <div className="nav-clusters">
          {/* Letter and name, in that order: the letter is what the figure
              numbers on the slide are keyed to, the name is what tells a
              presenter of the 14-section leader deck where the letter puts
              them. The tag is right-anchored and `nowrap`, so it grows leftward
              into empty stage and leaves the Step / Slide clusters where they
              are — measured, not assumed; see `.nav-section-tag` in
              globals.css. */}
          <div className="nav-section-tag">
            Section {letter} · {SECTION_NAMES[sectionKey]}
          </div>
          <div className="nav-group">
            <div className="nav-group-head">
              <span className="nav-group-label">Step</span>
              <span className="nav-group-count">{stepCount}</span>
            </div>
            <div className="nav-group-row">
              <button
                className="nav-btn"
                title="Previous step (Backspace)"
                disabled={atFirstStep}
                onClick={prevStep}
              >
                <IconChev dir="left" />
              </button>
              <button
                className="nav-btn"
                title="Next step"
                disabled={atLastStep}
                onClick={nextStep}
              >
                <IconChev dir="right" />
              </button>
              <button
                className="nav-btn"
                title="Reset step (U)"
                onClick={resetStep}
              >
                <IconChev dir="reset-step" />
              </button>
            </div>
          </div>
          <div className="nav-group">
            <div className="nav-group-head">
              <span className="nav-group-label">Slide</span>
              <span className="nav-group-count">{slideCount}</span>
            </div>
            <div className="nav-group-row">
              <button
                className="nav-btn"
                title="Previous slide (←)"
                disabled={atFirstSlide}
                onClick={() => goTo(slideIndex - 1, 0)}
              >
                <IconChev dir="dleft" />
              </button>
              <button
                className="nav-btn"
                title="Next slide (→)"
                disabled={atLastSlide}
                onClick={() => goTo(slideIndex + 1, 0)}
              >
                <IconChev dir="dright" />
              </button>
              <button
                className="nav-btn"
                title="Reset deck (R)"
                onClick={resetDeck}
              >
                <IconChev dir="reset-deck" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
