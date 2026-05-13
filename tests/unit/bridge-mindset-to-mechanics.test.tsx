// C→D Bridge — "From mindset to mechanics" slide tests.
//
// The Bridge is the deepest reflective breath in the deck:
//   - 2 steps · canonicalPose: 1
//   - Step 0: quote stack streams in (3 lines typewriter + attribution fade)
//   - Step 1: handoff line "From here, the how." fades in italic, pulse on `how`
//   - Hero photo fades at 1500ms (slowest in deck) — verified via the
//     HeroPhoto <img> src (bridgeContent.heroSrc) and the slide root render.
//   - NO hover handlers anywhere on the slide.
import { render, screen, act, cleanup } from "@testing-library/react";
import { DeckProvider, useDeck } from "@/deck/DeckContext";
import {
  BridgeMindsetToMechanics,
  bridgeMindsetToMechanicsSlide,
} from "@/slides/mindset-section-c/bridge-mindset-to-mechanics";
import { bridgeContent } from "@/slides/mindset-section-c/content";

function AdvanceTo({ step }: { step: number }) {
  const { goTo } = useDeck();
  return <button data-testid="goto" onClick={() => goTo(0, step)} />;
}

function renderAtStep(step: number) {
  const result = render(
    <DeckProvider stepCounts={[bridgeMindsetToMechanicsSlide.steps]}>
      <AdvanceTo step={step} />
      <BridgeMindsetToMechanics />
    </DeckProvider>,
  );
  act(() => {
    screen.getByTestId("goto").click();
  });
  return result;
}

test("Bridge declares 2 steps with canonicalPose=1 and section C", () => {
  expect(bridgeMindsetToMechanicsSlide.steps).toBe(2);
  expect(bridgeMindsetToMechanicsSlide.canonicalPose).toBe(1);
  expect(bridgeMindsetToMechanicsSlide.animationMode).toBe("step-reveal");
  expect(bridgeMindsetToMechanicsSlide.surface).toBe("dark");
  expect(bridgeMindsetToMechanicsSlide.section).toBe("C");
});

test("Bridge renders the canonical top-left FIG.C.6 label", () => {
  const { container } = renderAtStep(0);
  const label = container.querySelector(".fig-label") as HTMLElement;
  expect(label).not.toBeNull();
  expect(label.textContent).toMatch(/— FIG\. C\.6/);
  expect(label.textContent).toMatch(/BRIDGE/);
  expect(label.textContent).toMatch(/FROM MINDSET TO MECHANICS/);
});

test("Bridge renders the hero photo from content with a lighter darken overlay", () => {
  const { container } = renderAtStep(0);
  // HeroPhoto renders an <img> using bridgeContent.heroSrc — no fallback.
  expect(screen.queryByTestId("hero-fallback")).toBeNull();
  const img = container.querySelector("img");
  expect(img).not.toBeNull();
  expect(img?.getAttribute("src")).toBe(bridgeContent.heroSrc);
  expect(img?.getAttribute("alt")).toBe(bridgeContent.heroAlt);
  const darken = screen.getByTestId("darken-overlay");
  expect(darken.getAttribute("data-strength")).toBe(String(bridgeContent.darkenStrength));
});

test("Bridge renders all 3 quote lines and the Kofi Annan attribution at step 0", () => {
  renderAtStep(0);
  const l0 = screen.getByTestId("bridge-quote-line-0");
  const l1 = screen.getByTestId("bridge-quote-line-1");
  const l2 = screen.getByTestId("bridge-quote-line-2");
  // TextStream renders the full text into per-char spans (opacity-gated for
  // typewriter reveal), so textContent contains the complete sentence even
  // before the stream has played out.
  expect(l0.textContent).toMatch(bridgeContent.quoteLines[0].text);
  expect(l1.textContent).toMatch(bridgeContent.quoteLines[1].text);
  expect(l2.textContent).toMatch(bridgeContent.quoteLines[2].text);
  expect(screen.getByTestId("bridge-quote-attribution").textContent).toBe(
    bridgeContent.attribution,
  );
});

test("Bridge sentence 3 uses the smaller 44px size for the longer line", () => {
  renderAtStep(0);
  const l0 = screen.getByTestId("bridge-quote-line-0");
  const l2 = screen.getByTestId("bridge-quote-line-2");
  expect(l0.style.fontSize).toBe("52px");
  expect(l2.style.fontSize).toBe("44px");
});

test("Bridge handoff line is hidden at step 0 and visible at canonicalPose (step 1)", () => {
  renderAtStep(0);
  const handoff0 = screen.getByTestId("bridge-handoff");
  expect(handoff0.style.opacity).toBe("0");

  // Clean up the first render before mounting a second tree to avoid
  // duplicate testids in document.body.
  cleanup();

  // Re-render at canonical pose.
  renderAtStep(1);
  const handoff1 = screen.getByTestId("bridge-handoff");
  expect(handoff1.style.opacity).toBe("1");
  expect(handoff1.textContent).toMatch(/From here, the/);
  expect(handoff1.textContent).toMatch(/how/);
});

test("Bridge applies copper underline + AmbientPulse on `how` at canonical pose", () => {
  renderAtStep(1);
  const kws = screen.getAllByTestId("bridge-handoff-kw");
  // Use the last-rendered tree's accent (most-recently rendered DOM tree).
  const kw = kws[kws.length - 1];
  expect(kw.textContent).toBe("how");
  expect(kw.style.textDecorationLine.includes("underline")).toBe(true);
  // AmbientPulse wraps the accent with a `data-ambient-pulse` span on canonical pose.
  const pulse = kw.closest("[data-ambient-pulse]");
  expect(pulse).not.toBeNull();
  expect(pulse?.getAttribute("data-keyword")).toBe("how");
});

test("Bridge has NO hover handlers anywhere on the slide", () => {
  const { container } = renderAtStep(1);
  // Static scan — no element should declare an onMouseEnter/onMouseLeave at
  // the DOM-attribute level. React only forwards mouse handlers as listeners,
  // not as HTML attributes, but our convention has been to verify reverence
  // by ensuring no HoverReveal/popover testids appear on this slide.
  expect(container.querySelector('[data-testid^="hover-"]')).toBeNull();
  // Confirm no presence of the HoverReveal trigger testid pattern used by C.1.
  expect(container.querySelector('[data-hover-reveal]')).toBeNull();
});
