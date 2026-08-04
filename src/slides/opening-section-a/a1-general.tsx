// A.1 (general variant) — WHERE WE ALL START
//
// Same component and morph mechanics as the Berau A.1; only the content
// differs (see a1GeneralContent for the framing rationale).
import type { SlideDef } from "@/deck/types";
import { VARIANT } from "@/variant";
import { A1WhatYouveSeen } from "./a1-what-youve-seen";
import { a1ContentFor, a1GeneralContent } from "./content";

// Applied even though no `general-leader` variant is registered, so that
// registering one serves the leader agenda rather than silently serving the
// middle-management one. Today this resolves to `a1GeneralContent` by identity.
const C = a1ContentFor(a1GeneralContent, VARIANT.deckSet);

export const a1GeneralSlide: SlideDef = {
  id: "a1-general",
  steps: 3,
  canonicalPose: 2,
  animationMode: "step-reveal",
  surface: "dark",
  sectionKey: "opening",
  render: () => <A1WhatYouveSeen content={C} />,
};
