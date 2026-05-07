import type { JSX } from "react";
import type { AnimationMode } from "./Slide";

// Shared shape for any slide registered in the deck. Each section's
// sub-spec contributes an array of these and the deck composes them
// into a single ordered registry (see src/deck/registry.ts).
export interface SlideDef {
  steps: number;                       // step count fed to DeckProvider
  animationMode: AnimationMode;        // controls click bubbling per Slide.tsx
  canonicalPose: number;               // step index the export pipeline pauses at
  surface?: "dark" | "light";
  render: () => JSX.Element;
}
