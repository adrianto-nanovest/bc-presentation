// The title slide's interaction guide, against the deck it is describing (gh#72).
//
// Five of its six rows are fixed bindings in `useKeyboardNav` and are authored in
// the component. The sixth is not: section letters are handed out per deck, so the
// row was hand-written as A–K and stayed A–K while the leader deck grew to
// fourteen sections and answered A–N. This pins the row to the composed deck
// instead — both deck sets, and by reading the SAME map `useKeyboardNav` jumps on.
//
// `VARIANT` resolves at module scope, so each case re-points `window.location`,
// resets the module registry, and imports the slide and the registry in that one
// epoch — the registry is what publishes the letters the legend prints.
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { cleanup, render } from "@testing-library/react";
import type { VariantId } from "@/deck-variants";

const realLocation = window.location;

const JUMP_ACTION = "Jump to section's first slide";

beforeEach(() => vi.resetModules());

afterEach(() => {
  cleanup();
  Object.defineProperty(window, "location", {
    configurable: true,
    writable: true,
    value: realLocation,
  });
});

/** The keys the legend PRINTS on that variant's row, and the keys that variant's
 *  deck actually answers — read in one epoch so the two describe one deck. */
async function jumpRowFor(
  id: VariantId,
): Promise<{ printed: string[]; composed: string[] }> {
  Object.defineProperty(window, "location", {
    configurable: true,
    writable: true,
    value: new URL(`http://localhost:5173/?variant=${id}`),
  });
  vi.resetModules();
  cleanup(); // several variants are checked inside one case
  const [{ Title }, { composedDeck }] = await Promise.all([
    import("@/slides/opening-section-a/title"),
    import("@/deck/registry"),
  ]);

  const { container } = render(<Title />);
  const grid = container.querySelector('[data-testid="title-keymap-grid"]');
  expect(grid, `no keymap grid rendered for ${id}`).not.toBeNull();

  // Cells alternate keys, action, keys, action… so the jump row's chips are the
  // cell immediately before the cell carrying its action text.
  const cells = Array.from(grid?.children ?? []);
  const actionAt = cells.findIndex((el) => el.textContent === JUMP_ACTION);
  expect(actionAt, `no "${JUMP_ACTION}" row for ${id}`).toBeGreaterThan(0);

  return {
    printed: (cells[actionAt - 1]?.textContent ?? "")
      .split("·")
      .filter((k) => k.length > 0),
    composed: [...composedDeck.sectionFirstIndex.keys()],
  };
}

describe("the interaction guide's section-jump row", () => {
  test("prints A–K on a standard deck", async () => {
    for (const id of ["berau-middle-mgmt", "gems-middle-mgmt", "general"] as VariantId[]) {
      const { printed, composed } = await jumpRowFor(id);
      expect(printed, id).toEqual("ABCDEFGHIJK".split(""));
      expect(printed, id).toEqual(composed);
    }
  });

  test("prints A–N on a leader deck — the three letters it was missing", async () => {
    for (const id of ["berau-leader", "gems-leader"] as VariantId[]) {
      const { printed, composed } = await jumpRowFor(id);
      expect(printed, id).toEqual("ABCDEFGHIJKLMN".split(""));
      expect(printed, id).toEqual(composed);
      expect(printed, id).toContain("N");
    }
  });
});
