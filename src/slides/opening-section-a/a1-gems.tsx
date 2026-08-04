// A.1 (GEMS variant) — WHAT GEMS ALREADY RUNS
//
// Same component and morph mechanics as the Berau A.1; only the content
// differs (see a1GemsContent for the framing rationale and claim discipline).
import type { SlideDef } from "@/deck/types";
import { A1WhatYouveSeen } from "./a1-what-youve-seen";
import { a1GemsContent } from "./content";

export const a1GemsSlide: SlideDef = {
  id: "a1-gems",
  steps: 3,
  canonicalPose: 2,
  animationMode: "step-reveal",
  surface: "dark",
  sectionKey: "opening",
  render: () => <A1WhatYouveSeen content={a1GemsContent} />,
};
