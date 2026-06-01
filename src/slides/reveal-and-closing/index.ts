import type { SlideDef } from "@/deck/types";
import { i1Slide } from "./i1-meta-process";
import { i2Slide } from "./i2-profile-journey";
import { i3Slide } from "./i3-portfolio";
import { i4Slide } from "./i4-key-message-bridge";
import { j1Slide } from "./j1-humility-intro";
import { j2Slide } from "./j2-five-principles";
import { j3Slide } from "./j3-recipe-buildup";
import { j4Slide } from "./j4-recipe-ship";
import { k1Slide } from "./k1-challenge-handoff";
import { k2Slide } from "./k2-practice-lab-overview";
import { k3Slide } from "./k3-thank-you";

// Spec §1 final order.
export const revealAndClosingSlides: SlideDef[] = [
  i1Slide,
  i2Slide,
  i3Slide,
  i4Slide,
  j1Slide,
  j2Slide,
  j3Slide,
  j4Slide,
  k1Slide,
  k2Slide,
  k3Slide,
];
