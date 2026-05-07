// Boots the dev server and opens the HexLadder slide directly in fullscreen
// for the projection-calibration session. Adri runs this with a connected
// projector; the goal is to verify the copper hex ladder against actual
// auditorium hardware (spec §6.5, §11).

import { spawn } from "node:child_process";

const server = spawn("npm", ["run", "dev"], { stdio: "inherit", shell: true });

setTimeout(async () => {
  // Resolve the HexLadder index = slide count - 1 (always last per registry.ts).
  const { chromium } = await import("playwright");
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto("http://localhost:5173", { waitUntil: "networkidle" });
  const count = await page.evaluate(() => window.__DECK_SLIDE_COUNT__);
  await browser.close();
  const ladderIndex = Math.max(0, count - 1);

  const url = `http://localhost:5173/?slide=${ladderIndex}&fullscreen=1`;
  console.log("\nProjection test ready. Opening:", url);
  console.log(
    "Steps:\n" +
      "  1. Connect projector and mirror display.\n" +
      "  2. Press F11 (or Cmd+Ctrl+F on macOS) for browser fullscreen.\n" +
      "  3. Walk to the back row and confirm: every copper-* and neutral-* swatch is distinguishable from its neighbors.\n" +
      "  4. Note any stops that wash out — those are the ones to retune in src/design-system/colors.ts.\n" +
      "  5. Ctrl+C this script when done.",
  );
  spawn(process.platform === "darwin" ? "open" : "xdg-open", [url], {
    stdio: "ignore",
    detached: true,
  });
}, 3000);

process.on("SIGINT", () => {
  server.kill();
  process.exit(0);
});
