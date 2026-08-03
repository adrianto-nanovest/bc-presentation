import { afterEach, describe, expect, test } from "vitest";
import { VARIANTS, VARIANT_BY_HOST, type VariantId } from "@/deck-variants";
import { VARIANT, resolveClientVariant } from "@/variant";

// `src/variant.ts` reads `window.location.{search,hostname}` and nothing else,
// so a plain `URL` is a faithful stand-in. jsdom's own `location` is read-only,
// hence the redefine.
const realLocation = window.location;

function setLocation(href: string): void {
  Object.defineProperty(window, "location", {
    configurable: true,
    writable: true,
    value: new URL(href),
  });
}

afterEach(() => {
  Object.defineProperty(window, "location", {
    configurable: true,
    writable: true,
    value: realLocation,
  });
});

const ALL_IDS: VariantId[] = [
  "berau-middle-mgmt",
  "berau-leader",
  "gems-middle-mgmt",
  "gems-leader",
  "general",
];

describe("resolveClientVariant — host rule", () => {
  test("resolves every host-map entry to its variant row", () => {
    for (const [hostname, id] of Object.entries(VARIANT_BY_HOST)) {
      setLocation(`https://${hostname}/`);
      expect(resolveClientVariant(), hostname).toEqual(VARIANTS[id]);
    }
  });

  test("an unmatched host (Vercel preview) falls back to general", () => {
    setLocation("https://bc-presentation-git-feature-abc.vercel.app/");
    expect(resolveClientVariant()).toEqual(VARIANTS.general);
  });

  test("berau is no longer the localhost default — general is", () => {
    setLocation("http://localhost:5173/");
    expect(resolveClientVariant()).toEqual(VARIANTS.general);
    setLocation("http://127.0.0.1:5173/");
    expect(resolveClientVariant()).toEqual(VARIANTS.general);
  });
});

describe("resolveClientVariant — ?variant= override", () => {
  test("an explicit ?variant= beats the host, for all five ids", () => {
    for (const id of ALL_IDS) {
      setLocation(`http://localhost:5173/?variant=${id}`);
      expect(resolveClientVariant(), id).toEqual(VARIANTS[id]);

      setLocation(`https://bc-presentation.vercel.app/?variant=${id}`);
      expect(resolveClientVariant(), id).toEqual(VARIANTS[id]);
    }
  });

  test("the override survives other query params and a hash", () => {
    setLocation("http://localhost:5173/?dev=proto16&variant=gems-leader#x");
    expect(resolveClientVariant()).toEqual(VARIANTS["gems-leader"]);
  });

  test("an unknown ?variant= is ignored, leaving the host rule in charge", () => {
    setLocation("https://bc-presentation.vercel.app/?variant=berau");
    expect(resolveClientVariant()).toEqual(VARIANTS["berau-middle-mgmt"]);
    setLocation("http://localhost:5173/?variant=nope");
    expect(resolveClientVariant()).toEqual(VARIANTS.general);
  });
});

describe("VARIANT (module-scope resolution)", () => {
  test("is a resolved { id, brand, deckSet } row, general under the jsdom host", () => {
    expect(VARIANT).toEqual(VARIANTS.general);
    expect(VARIANT.id).toBe("general");
    expect(VARIANT.brand).toBe("general");
    expect(VARIANT.deckSet).toBe("standard");
  });
});
