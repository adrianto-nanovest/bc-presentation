// A.1 (GEMS variant) — WHAT GEMS ALREADY RUNS
//
// Same component and morph mechanics as the Berau A.1; only the content
// differs (see a1GemsContent for the framing rationale and claim discipline).
import type { SlideDef } from "@/deck/types";
import { VARIANT } from "@/variant";
import { A1WhatYouveSeen } from "./a1-what-youve-seen";
import { a1ContentFor, a1GemsContent } from "./content";

// GEMS' left column crossed with this deck set's right column (§4.4 slot 1):
// `gems-leader` keeps the DigiTech portfolio and takes the five leader movements.
// Resolved at module scope because `VARIANT` is — see a1-what-youve-seen.tsx.
const C = a1ContentFor(a1GemsContent, VARIANT.deckSet);

export const a1GemsSlide: SlideDef = {
  id: "a1-gems",
  steps: 3,
  canonicalPose: 2,
  animationMode: "step-reveal",
  surface: "dark",
  sectionKey: "opening",
  render: () => <A1WhatYouveSeen content={C} />,
};
