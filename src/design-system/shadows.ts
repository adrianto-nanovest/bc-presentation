// Spec §6.2 — single shadow recipe used everywhere. Tuned for dark-primary:
// soft falloff that reads as elevation without bleeding into the bg.
export const shadow = {
  base: "0 16px 48px -8px rgba(0, 0, 0, 0.45)",
} as const;

// Spec §6.2 — 0px radius (flat minimalism).
export const radius = {
  base: "0px",
} as const;
