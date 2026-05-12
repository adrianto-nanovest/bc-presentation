import type { JSX } from "react";
import type { AnimationMode } from "./Slide";

// Shared shape for any slide registered in the deck. Each section's
// sub-spec contributes an array of these and the deck composes them
// into a single ordered registry (see src/deck/registry.ts).
// Section tag drives the NavBar's "Section X" label. Required so the
// NavBar can rely on it for every slide; the dev-only hex-ladder slide
// gets "K" as a deliberate trade-off to keep the field non-optional.
export type SlideSection = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K";

export interface SlideDef {
  steps: number;                       // step count fed to DeckProvider
  animationMode: AnimationMode;        // controls click bubbling per Slide.tsx
  canonicalPose: number;               // step index the export pipeline pauses at
  surface?: "dark" | "light";
  section: SlideSection;               // section tag consumed by NavBar
  render: () => JSX.Element;
}
