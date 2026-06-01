import type { SlideDef } from "@/deck/types";
import { e1Slide } from "./e1-three-layers";
import { e2Slide } from "./e2-prompt-what-why";
import { e3Slide } from "./e3-prompt-structure";
import { e4Slide } from "./e4-prompt-methodologies";
import { e5Slide } from "./e5-prompt-examples";
import { e6Slide } from "./e6-prompt-the-wall";
import { e7Slide } from "./e7-context-what-why";
import { e8Slide } from "./e8-context-strategies";
import { e9Slide } from "./e9-context-the-wall";
import { e10Slide } from "./e10-harness-what-why";
import { e11Slide } from "./e11-harness-practices";
import { e12Slide } from "./e12-bridge-to-f";

// Spec §1.1 — locked Section E order.
export const foundationCoreSectionESlides: SlideDef[] = [
  e1Slide,
  e2Slide,
  e3Slide,
  e4Slide,
  e5Slide,
  e6Slide,
  e7Slide,
  e8Slide,
  e9Slide,
  e10Slide,
  e11Slide,
  e12Slide,
];
