import type { SlideDef } from "@/deck/types";
import { j1Slide } from "./j1-humility-intro";
import { j2Slide } from "./j2-five-principles";
import { j3Slide } from "./j3-recipe-buildup";
import { k1Slide } from "./k1-challenge-handoff";

// Order matches spec §1: I → J → K.
export const revealAndClosingSlides: SlideDef[] = [j1Slide, j2Slide, j3Slide, k1Slide];
