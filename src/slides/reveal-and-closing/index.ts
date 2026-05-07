import type { SlideDef } from "@/deck/types";
import { i1Slide } from "./i1-meta-process";
import { i2Slide } from "./i2-profile-journey";
import { j1Slide } from "./j1-humility-intro";
import { j2Slide } from "./j2-five-principles";
import { j3Slide } from "./j3-recipe-buildup";
import { j4Slide } from "./j4-recipe-ship";
import { k1Slide } from "./k1-challenge-handoff";

// Order matches spec §1. I.3/I.4 land in subsequent tasks.
export const revealAndClosingSlides: SlideDef[] = [
  i1Slide,
  i2Slide,
  j1Slide,
  j2Slide,
  j3Slide,
  j4Slide,
  k1Slide,
];
