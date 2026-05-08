import type { SlideDef } from "@/deck/types";
import { e1Slide } from "./e1-three-layers";
import { e2Slide } from "./e2-prompt-what-why";
import { e3Slide } from "./e3-prompt-structure";
import { e4Slide } from "./e4-prompt-methodologies";
import { e5Slide } from "./e5-prompt-the-wall";

// Spec §1.1 — locked Section E order.
// Plan A: E.1 → E.5; Plan B will append E.6 → E.11.
export const foundationCoreSectionESlides: SlideDef[] = [
  e1Slide,
  e2Slide,
  e3Slide,
  e4Slide,
  e5Slide,
];
