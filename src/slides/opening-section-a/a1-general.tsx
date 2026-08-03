// A.1 (general variant) — WHERE WE ALL START
//
// Same component and morph mechanics as the Berau A.1; only the content
// differs (see a1GeneralContent for the framing rationale).
import type { SlideDef } from "@/deck/types";
import { A1WhatYouveSeen } from "./a1-what-youve-seen";
import { a1GeneralContent } from "./content";

export const a1GeneralSlide: SlideDef = {
  id: "a1-general",
  steps: 3,
  canonicalPose: 2,
  animationMode: "step-reveal",
  surface: "dark",
  section: "A",
  sectionKey: "opening",
  render: () => <A1WhatYouveSeen content={a1GeneralContent} />,
};
