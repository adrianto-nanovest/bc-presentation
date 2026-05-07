import type { SlideDef } from "@/deck/types";
import { d1Slide } from "./d1-the-trap";
import { d2Slide } from "./d2-the-convergence";
import { d3Slide } from "./d3-one-process-four-levels";
import { d4Slide } from "./d4-decision-pattern";
import { d5Slide } from "./d5-bridge-to-e";

// Spec §1.1 — locked Section D order.
export const foundationCoreSlides: SlideDef[] = [
  d1Slide,
  d2Slide,
  d3Slide,
  d4Slide,
  d5Slide,
];
