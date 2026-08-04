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
import { k2GemsSlide } from "./k2-gems";
import { k3Slide } from "./k3-thank-you";

// Reveal + closing — every def authored for sections I, J and K, the GEMS K.2
// alternate included.
//
// A CATALOGUE, NOT A DECK FRAGMENT (§4.1, gh#40). This module used to read
// `BRANDS[VARIANT.brand].practiceLab` to decide whether K.1 and K.2 composed,
// and to pick between the two K.2s. Both decisions now sit in
// `src/deck/slots.ts` — the lab-only ids declared once, the alternate resolving
// behind the canonical slot id `k2-practice-lab-overview` — so a brand without
// a Practice Lab drops the two slots there and the closer renumbers itself to
// K.1 by compose.ts R3.
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
  k2GemsSlide,
  k3Slide,
];
