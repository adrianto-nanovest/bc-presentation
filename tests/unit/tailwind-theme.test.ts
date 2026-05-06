import config from "../../tailwind.config";

test("tailwind theme exposes copper palette", () => {
  const colors = config.theme?.extend?.colors as Record<string, unknown>;
  expect(colors).toBeDefined();
  expect(colors.copper).toBeDefined();
  expect((colors.copper as Record<string, string>)[500]).toBe("#b86e3d");
});

test("tailwind theme exposes the projection font sizes", () => {
  const fs = config.theme?.extend?.fontSize as Record<string, string>;
  expect(fs.body).toBe("clamp(2.25rem, 2.5vw, 2.75rem)");
});

test("tailwind theme uses 0px radius (flat minimalism)", () => {
  const br = config.theme?.extend?.borderRadius as Record<string, string>;
  expect(br.DEFAULT).toBe("0px");
});
