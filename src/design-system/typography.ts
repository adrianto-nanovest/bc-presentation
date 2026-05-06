// Per spec §7.1 — all free / Google Fonts.
// --serif-id is included for forward compatibility even though spec §12
// answers "fully English" — keeps the token contract symmetric.
export const fontFamily = {
  serifEn: '"Source Serif 4", Georgia, serif',
  serifId: '"Source Serif 4", Georgia, serif',
  serifDisplay: '"Instrument Serif", Georgia, serif',
  sans: '"Inter", system-ui, sans-serif',
  mono: '"JetBrains Mono", "IBM Plex Mono", ui-monospace, monospace',
} as const;

// Projection-scale calibrated. Body sits 36–44px at projected scale so an
// auditorium back-row reader can still parse it (spec §7.2). 1rem === 16px.
export const fontSize = {
  display: "clamp(4.5rem, 8vw, 9rem)", // 72–144px — title hero
  h1: "clamp(3.5rem, 6vw, 6rem)", // 56–96px — section heads
  h2: "clamp(2.5rem, 4.5vw, 4rem)", // 40–64px — slide heads
  h3: "clamp(2rem, 3vw, 2.75rem)", // 32–44px — sub-heads
  body: "clamp(2.25rem, 2.5vw, 2.75rem)", // 36–44px — body
  caption: "clamp(1.25rem, 1.5vw, 1.75rem)", // 20–28px — sans labels
  monoSm: "clamp(1.125rem, 1.25vw, 1.5rem)", // 18–24px — code
} as const;

export const lineHeight = {
  display: 1.05,
  heading: 1.15,
  body: "1.6",
  prose: 1.6,
} as const;

export const fontWeight = {
  // Spec §6.2 — typographic restraint, max 3 weights total per family.
  regular: 400,
  medium: 500,
  semibold: 600,
} as const;
