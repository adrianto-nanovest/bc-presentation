// K.2 (GEMS variant) — THE PRACTICE LAB
//
// Same component, steps and pin/hover mechanics as the shared K.2; only part 2
// differs, because GEMS runs a single track (see k2GemsContent for the copy and
// the reasoning). Parts 1, 3 and 4 are shared by reference.
import type { SlideDef } from "@/deck/types";
import { K2PracticeLabOverview } from "./k2-practice-lab-overview";
import { k2GemsContent } from "./content";

export const k2GemsSlide: SlideDef = {
  id: "k2-gems",
  steps: 2,
  canonicalPose: 1,
  animationMode: "step-reveal",
  surface: "dark",
  section: "K",
  sectionKey: "lab",
  render: () => <K2PracticeLabOverview content={k2GemsContent} />,
};
