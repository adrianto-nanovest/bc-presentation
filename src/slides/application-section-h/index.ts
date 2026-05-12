import type { SlideDef } from "@/deck/types";
import { h1Slide } from "./h1-pitfall-wall";
import { h2Slide } from "./h2-discipline-wall";
import { h3Slide } from "./h3-bridge-to-i";

// Section H — Pitfalls + Discipline.
// Spec: docs/specs/2026-05-12-slides-application-H-discipline.md
//   H.1 The Trap (pitfall wall) · H.2 The Discipline (practice wall) ·
//   H.3 Bridge to I.
export const applicationSectionHSlides: SlideDef[] = [
  h1Slide,
  h2Slide,
  h3Slide,
];
