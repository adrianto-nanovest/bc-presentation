import type { SlideDef } from "@/deck/types";
import { BRANDS, type Brand } from "@/deck-variants";
import { VARIANT } from "@/variant";
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

// K.2's part 2 states how many tracks the lab runs, which is a BRAND fact: GEMS
// runs one, so its part 2 names the single persona instead (gh#26). `general` has
// no practice lab, so its row is never read — it is declared to keep the map
// exhaustive when a brand is added.
const k2ByBrand: Record<Brand, SlideDef> = {
  berau: k2Slide,
  gems: k2GemsSlide,
  general: k2Slide,
};

// Spec §1 final order. A brand without a Practice Lab drops K.1 (handoff) and
// K.2 (lab overview); the thank-you closer then renumbers itself to K.1 (see
// k3-thank-you.tsx). Leaders run the same lab, so this is brand-level.
const kSlides: SlideDef[] = BRANDS[VARIANT.brand].practiceLab
  ? [k1Slide, k2ByBrand[VARIANT.brand], k3Slide]
  : [k3Slide];

export const revealAndClosingSlides: SlideDef[] = [
  i1Slide,
  i2Slide,
  i3Slide,
  i4Slide,
  j1Slide,
  j2Slide,
  j3Slide,
  j4Slide,
  ...kSlides,
];
