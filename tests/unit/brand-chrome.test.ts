import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { applyBrandChrome } from "@/brand-chrome";
import { BRANDS, VARIANTS, type Brand, type VariantId } from "@/deck-variants";

/** A fresh document shaped exactly like the shipped `index.html` head. */
function shippedDocument(): Document {
  const doc = document.implementation.createHTMLDocument("AI Catalyst Workshop");
  const link = doc.createElement("link");
  link.setAttribute("rel", "icon");
  link.setAttribute("type", "image/png");
  link.setAttribute("href", "/brand/general-ai-logo.png");
  doc.head.appendChild(link);
  return doc;
}

let doc: Document;
const icon = (d: Document) => d.querySelector<HTMLLinkElement>('link[rel="icon"]')!;

beforeEach(() => {
  doc = shippedDocument();
});

describe("applyBrandChrome", () => {
  test("applies title + favicon for every brand, unconditionally", () => {
    for (const brand of Object.keys(BRANDS) as Brand[]) {
      const d = shippedDocument();
      applyBrandChrome(brand, d);
      expect(d.title, brand).toBe(BRANDS[brand].label);
      expect(icon(d).getAttribute("href"), brand).toBe(BRANDS[brand].favicon);
    }
  });

  test("`?variant=gems-middle-mgmt` branding is GEMS title + GEMS favicon", () => {
    applyBrandChrome(VARIANTS["gems-middle-mgmt"].brand, doc);
    expect(doc.title).toBe("GEMS AI Catalyst Workshop");
    expect(icon(doc).getAttribute("href")).toBe("/brand/gems-logo.svg");
  });

  test("the tab title never carries the leader label suffix", () => {
    applyBrandChrome(VARIANTS["gems-leader"].brand, doc);
    expect(doc.title).toBe("GEMS AI Catalyst Workshop");
    expect(doc.title).not.toContain("Leadership");
  });

  test("re-points the icon's `type` so an SVG favicon is not declared as PNG", () => {
    applyBrandChrome("gems", doc);
    expect(icon(doc).getAttribute("type")).toBe("image/svg+xml");

    const png = shippedDocument();
    applyBrandChrome("berau", png);
    expect(icon(png).getAttribute("type")).toBe("image/png");
  });

  test("still sets the title when the document has no icon link", () => {
    const bare = document.implementation.createHTMLDocument("x");
    expect(() => applyBrandChrome("berau", bare)).not.toThrow();
    expect(bare.title).toBe("Berau AI Catalyst Workshop");
  });
});

// ── The seam main.tsx wires: URL → resolver → chrome ─────────────────────────
// The cases above prove the function; these prove the path a viewer takes, so
// that dropping `?variant=` support could not pass unnoticed. The one line NOT
// covered here is `main.tsx`'s call itself — importing it would mount the app.

const realLocation = window.location;

afterEach(() => {
  Object.defineProperty(window, "location", {
    configurable: true,
    writable: true,
    value: realLocation,
  });
});

async function chromeAt(href: string): Promise<{ title: string; favicon: string | null }> {
  Object.defineProperty(window, "location", {
    configurable: true,
    writable: true,
    value: new URL(href),
  });
  vi.resetModules();
  const [{ resolveClientVariant }, { applyBrandChrome: apply }] = await Promise.all([
    import("@/variant"),
    import("@/brand-chrome"),
  ]);
  const doc = shippedDocument();
  apply(resolveClientVariant().brand, doc);
  return { title: doc.title, favicon: icon(doc).getAttribute("href") };
}

describe("URL → resolver → chrome", () => {
  test("`?variant=gems-middle-mgmt` on localhost renders GEMS title + favicon", async () => {
    expect(await chromeAt("http://localhost:5173/?variant=gems-middle-mgmt")).toEqual({
      title: "GEMS AI Catalyst Workshop",
      favicon: "/brand/gems-logo.svg",
    });
  });

  test("bare localhost renders the general chrome index.html already ships", async () => {
    expect(await chromeAt("http://localhost:5173/")).toEqual({
      title: "AI Catalyst Workshop",
      favicon: "/brand/general-ai-logo.png",
    });
  });

  test("each variant's host serves its own brand's chrome", async () => {
    const cases: Array<[string, VariantId]> = [
      ["https://bc-presentation.vercel.app/", "berau-middle-mgmt"],
      ["https://bc-leader-ai-workshop.vercel.app/", "berau-leader"],
      ["https://gems-middle-mgmt-ai-workshop.vercel.app/", "gems-middle-mgmt"],
      ["https://gems-leader-ai-workshop.vercel.app/", "gems-leader"],
      ["https://ai-catalyst-workshop.vercel.app/", "general"],
    ];
    for (const [href, id] of cases) {
      const { brand } = VARIANTS[id];
      expect(await chromeAt(href), href).toEqual({
        title: BRANDS[brand].label,
        favicon: BRANDS[brand].favicon,
      });
    }
  });
});
