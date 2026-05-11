import type { SlideDef } from "@/deck/types";
import { c1Slide } from "./c1-tool-to-bridge";
import { c2Slide } from "./c2-replacement-multiplier";
import { c3Slide } from "./c3-executor-orchestrator";
import { c4Slide } from "./c4-v-bounce-workflow";
import { c5Slide } from "./c5-role-trajectory";
import { bridgeMindsetToMechanicsSlide } from "./bridge-mindset-to-mechanics";

// Section C — locked order. Bridge slide closes the mindset arc and hands
// off into Section D (Foundation Core).
export const mindsetSectionCSlides: SlideDef[] = [
  c1Slide,
  c2Slide,
  c3Slide,
  c4Slide,
  c5Slide,
  bridgeMindsetToMechanicsSlide,
];
