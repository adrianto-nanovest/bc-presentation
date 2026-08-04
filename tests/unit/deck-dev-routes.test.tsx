// The dev-only escape hatches in `<Deck>`, mounted the way a browser mounts them.
//
// WHY THIS FILE EXISTS. `?dev=hexladder` shipped broken: the branch returned a
// bare `<Slide>`, and `<Slide>` calls `useDeck()` for click-to-advance, so the
// route threw `useDeck must be used inside <DeckProvider>` and rendered an empty
// page. Nothing caught it, because every other test that mounts `<Slide>` brings
// its own `DeckProvider` (see `Slide.test.tsx` and `tests/support/slide-harness`)
// — the provider was missing only on the one path no test entered. That route is
// the DEFAULT target of `scripts/projection-test.mjs`, so the colour-calibration
// harness of §6.5 / §11 was broken with it (gh#51).
//
// These tests mount `<Deck>` ITSELF and let it pick its own branch off the query
// string, which is the only way the missing provider is observable.
import { render, screen } from "@testing-library/react";
import { afterEach, expect, test, vi } from "vitest";

const realLocation = window.location;

function browserAt(search: string): void {
  Object.defineProperty(window, "location", {
    configurable: true,
    writable: true,
    value: new URL(`http://localhost:5173/${search}`),
  });
}

afterEach(() => {
  Object.defineProperty(window, "location", {
    configurable: true,
    writable: true,
    value: realLocation,
  });
  vi.resetModules();
});

test("?dev=hexladder renders the calibration swatch standalone, with its own step state", async () => {
  browserAt("?dev=hexladder");
  vi.resetModules();
  const { Deck } = await import("@/deck/Deck");

  render(<Deck />);

  // The ladder is every copper + neutral stop, so this is many nodes, not one.
  expect(screen.getAllByTestId("swatch").length).toBeGreaterThan(0);
  // It renders through `<Slide>`, which is what needed the provider.
  expect(screen.getByTestId("slide")).toBeInTheDocument();
});

test("the audience deck still mounts when no dev hatch is asked for", async () => {
  browserAt("");
  vi.resetModules();
  const { Deck } = await import("@/deck/Deck");

  render(<Deck />);

  expect(screen.getByTestId("slide")).toBeInTheDocument();
  // The hex ladder is a dev utility and never composed with the audience deck.
  expect(screen.queryAllByTestId("swatch")).toHaveLength(0);
});
