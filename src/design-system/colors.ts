// Single-hue copper ladder anchored at 500=#b86e3d (deep copper, primary accent).
// Final values get refined via projection testing on real auditorium hardware
// (see Task 17 — HexLadder slide). These are the starting calibration points.
export const copper = {
  50: "#fbf6f1",
  100: "#f4e4d2",
  200: "#e8c4a0",
  300: "#d99e6c",
  400: "#c98548",
  500: "#b86e3d",
  600: "#9c5a30",
  700: "#7a4626",
  800: "#5a341c",
  900: "#3d2413",
  950: "#21130a",
} as const;

// Pure grayscale — no blue tint, no warm tint.
export const neutral = {
  0: "#ffffff",
  50: "#f5f5f5",
  100: "#e5e5e5",
  200: "#d4d4d4",
  300: "#a3a3a3",
  400: "#737373",
  500: "#525252",
  600: "#404040",
  700: "#262626",
  800: "#171717",
  900: "#0a0a0a",
  950: "#050505",
} as const;

// Semantic surface tokens — what a slide's background actually paints.
// dark is the default (per spec §6.4 dark-primary inversion), light flips
// for content-dense informational slides only.
export const surface = {
  dark: neutral[900], // #0a0a0a — matte near-black, never #000
  light: neutral[50],
} as const;
