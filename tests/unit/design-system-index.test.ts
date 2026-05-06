import * as ds from "@/design-system";

test("barrel re-exports every token group", () => {
  expect(ds.copper[500]).toBe("#b86e3d");
  expect(ds.neutral[900]).toBe("#0a0a0a");
  expect(ds.surface.dark).toBe("#0a0a0a");
  expect(ds.fontFamily.serifEn).toContain("Source Serif 4");
  expect(ds.spacing[4]).toBe("16px");
  expect(ds.shadow.base).toContain("rgba");
  expect(ds.radius.base).toBe("0px");
});
