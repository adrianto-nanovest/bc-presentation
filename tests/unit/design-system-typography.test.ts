import { fontFamily, fontSize, lineHeight } from "@/design-system/typography";

test("font stacks match the spec §7.1 CSS token contract", () => {
  expect(fontFamily.serifEn).toBe('"Source Serif 4", Georgia, serif');
  expect(fontFamily.serifDisplay).toBe('"Instrument Serif", Georgia, serif');
  expect(fontFamily.sans).toBe('"Inter", system-ui, sans-serif');
  expect(fontFamily.mono).toBe('"JetBrains Mono", "IBM Plex Mono", ui-monospace, monospace');
});

test("body type at projection scale clamps to 36–44px range (spec §7.2)", () => {
  expect(fontSize.body).toBe("clamp(2.25rem, 2.5vw, 2.75rem)");
});

test("line-height stays in the 1.5–1.7 range for body and prose", () => {
  expect(lineHeight.body).toBe("1.6");
  expect(lineHeight.prose).toBeGreaterThanOrEqual(1.5);
  expect(lineHeight.prose).toBeLessThanOrEqual(1.7);
});
