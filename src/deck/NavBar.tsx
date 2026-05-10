import { type MouseEvent } from "react";
import { useDeck } from "./DeckContext";
import type { SlideSection } from "./types";

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
  section: SlideSection;
}

// Hover-revealed bottom nav. The outer `.nav-zone` is a transparent hot-zone
// that triggers the reveal CSS in globals.css; `.nav-bar` is the visible
// pill. `data-no-advance` prevents Slide.tsx's click-to-advance handler
// (T6) from firing when the nav is interacted with — the inner `stop`
// handlers are belt-and-braces against synthetic-event bubbling quirks.
export function NavBar({ section }: NavBarProps) {
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
          <div className="nav-section-tag">Section {section}</div>
          <div className="nav-group">
            <div className="nav-group-head">
              <span className="nav-group-label">Step</span>
              <span className="nav-group-count">{stepCount}</span>
            </div>
            <div className="nav-group-row">
              <button
                className="nav-btn"
                title="Previous step"
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
                title="Reset to step 1 (U)"
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
