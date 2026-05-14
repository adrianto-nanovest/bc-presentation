// Boots the dev server and opens the HexLadder slide directly in fullscreen
// for the projection-calibration session. Adri runs this with a connected
// projector; the goal is to verify the copper hex ladder against actual
// auditorium hardware (spec §6.5, §11).

import { spawn } from "node:child_process";

const server = spawn("npm", ["run", "dev"], { stdio: "inherit", shell: true });

setTimeout(async () => {
  // HexLadder is no longer part of audience navigation. Deck.tsx renders
  // it standalone when the ?dev=hexladder query param is present.
  const url = `http://localhost:5173/?dev=hexladder&fullscreen=1`;
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
