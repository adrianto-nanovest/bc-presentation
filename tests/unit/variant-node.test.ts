// @vitest-environment node
//
// The node branch of the client resolver — the one every non-DOM consumer hits
// (this suite, export scripts, any future SSR). It must land on `general`, the
// same default as an unmatched host; `berau` used to win here.
import { expect, test } from "vitest";
import { VARIANTS } from "@/deck-variants";
import { VARIANT, resolveClientVariant } from "@/variant";

test("there is no window in this environment", () => {
  expect(typeof window).toBe("undefined");
});

test("the node branch resolves to the general variant row", () => {
  expect(resolveClientVariant()).toEqual(VARIANTS.general);
  expect(VARIANT).toEqual(VARIANTS.general);
});
