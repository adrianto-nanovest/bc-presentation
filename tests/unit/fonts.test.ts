import { readFileSync } from "node:fs";
import { resolve } from "node:path";

test("index.html preconnects to Google Fonts and loads required families", () => {
  const html = readFileSync(resolve(__dirname, "../../index.html"), "utf8");
  expect(html).toContain("https://fonts.googleapis.com");
  expect(html).toContain("Instrument+Serif");
  expect(html).toContain("Source+Serif+4");
  expect(html).toContain("Inter");
  expect(html).toContain("JetBrains+Mono");
});
