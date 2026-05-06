import { spacing } from "@/design-system/spacing";
import { shadow, radius } from "@/design-system/shadows";

test("spacing scale lives on a 4px grid (spec §6.2)", () => {
  for (const value of Object.values(spacing)) {
    const px = parseInt(value.replace("px", ""), 10);
    expect(px % 4).toBe(0);
  }
});

test("there is exactly one shadow recipe (spec §6.2 single shadow)", () => {
  expect(Object.keys(shadow)).toEqual(["base"]);
});

test("radius is 0px (spec §6.2 flat minimalism)", () => {
  expect(radius.base).toBe("0px");
});
