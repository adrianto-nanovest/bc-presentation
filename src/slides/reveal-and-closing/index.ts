import type { SlideDef } from "@/deck/types";
import { j1Slide } from "./j1-humility-intro";
import { k1Slide } from "./k1-challenge-handoff";

// Order matches spec §1: I → J → K. Currently we have only the J/K
// hero slides while diagrammatic + portfolio slides land in later tasks.
export const revealAndClosingSlides: SlideDef[] = [j1Slide, k1Slide];
