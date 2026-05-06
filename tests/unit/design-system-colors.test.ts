import { copper, neutral, surface } from "@/design-system/colors";

test("copper ladder spans 50..950 anchored at 500=#b86e3d", () => {
  expect(copper[500]).toBe("#b86e3d");
  expect(Object.keys(copper)).toEqual([
    "50",
    "100",
    "200",
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
    "900",
    "950",
  ]);
});

test("neutrals are pure grayscale (R==G==B at every stop)", () => {
  for (const hex of Object.values(neutral)) {
    const r = hex.slice(1, 3);
    const g = hex.slice(3, 5);
    const b = hex.slice(5, 7);
    expect(r).toBe(g);
    expect(g).toBe(b);
  }
});

test("surface.dark is matte near-black, not pure #000", () => {
  expect(surface.dark).toBe("#0a0a0a");
  expect(surface.dark).not.toBe("#000000");
});
