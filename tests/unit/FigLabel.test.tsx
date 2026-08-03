// FigLabel prints the number the deck DERIVED, never one it was handed.
//
// Spec §3.5 (gh#35). Both format assertions below are the ones this file has
// always made — the rendered string is a no-op across the refactor, and that is
// exactly what has to stay true. What changed is where the letter and number
// come from: the slide-number context instead of `section=` / `num=` props.
//
// There is deliberately NO test that FigLabel accepts a section/num prop, and
// there must never be one: a props fallback is how hardcoding survives, and
// Phase 4/5 would then have two sources of truth for the same string (§3.5).
import { render } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import { FigLabel } from "@/components/FigLabel";
import { SlideNumberProvider, type SlideNumber } from "@/deck/SlideNumberContext";

/** Mounts FigLabel at a given composed position. */
function at(value: SlideNumber, label: string) {
  return render(
    <SlideNumberProvider value={value}>
      <FigLabel label={label} />
    </SlideNumberProvider>,
  );
}

test("FigLabel renders the canonical FIG <section>.<num> · <label> format", () => {
  const { container } = at({ letter: "I", num: 2, sectionKey: "meta" }, "THE JOURNEY");
  const el = container.querySelector(".fig-label") as HTMLElement;
  expect(el).not.toBeNull();
  // Combined text content across child spans should match the canonical format.
  expect(el.textContent).toMatch(/— FIG\. I\.2\s*·\s*THE JOURNEY/);
  // Must include the em-dash prefix per spec §3 row 2.
  expect(el.textContent).toMatch(/^— FIG\./);
});

test("FigLabel uses the .fig-label class for positioning", () => {
  const { container } = at({ letter: "J", num: 1, sectionKey: "principles" }, "THE RECIPE");
  const el = container.querySelector(".fig-label") as HTMLElement;
  expect(el).not.toBeNull();
  // Positioning is delegated to the .fig-label CSS class (see globals.css).
  expect(el.className).toContain("fig-label");
});

test("the printed letter and number follow the context, not the label", () => {
  // The same component at a different composed position prints a different
  // figure. This is the whole behaviour flip: move the slide, the number moves.
  const { container } = at({ letter: "C", num: 2, sectionKey: "mindset" }, "YOUR AGENTIC OS");
  expect(container.querySelector(".fig-label")?.textContent).toMatch(
    /— FIG\. C\.2\s*·\s*YOUR AGENTIC OS/,
  );
});

// EDGE CASE 2 (§3.5) — `numbered: false` means the slide claims no number. Only
// the cover is, and it renders no FigLabel, so reaching here is a bug in the
// slide rather than a state to render. `FIG. A.null` on a projector is worse
// than a failed build, so this throws instead of printing.
test("a slide that claims no number cannot print a FigLabel", () => {
  const errorLog = vi.spyOn(console, "error").mockImplementation(() => {});
  try {
    expect(() => at({ letter: "A", num: null, sectionKey: "opening" }, "TITLE")).toThrow(
      /numbered: false|claims no number/,
    );
  } finally {
    errorLog.mockRestore();
  }
});
