import type { SlideDef } from "@/deck/types";
import { g1Slide } from "./g1-ecosystem-overview";
import { g2Slide } from "./g2-claude-platforms";
import { g3Slide } from "./g3-claude-capabilities";
import { g4Slide } from "./g4-builtin-tools";
import { g5Slide } from "./g5-google";
import { g6Slide } from "./g6-openai";
import { g7Slide } from "./g7-head-to-head";
import { g8Slide } from "./g8-capability-matrix";
import { g9Slide } from "./g9-workflow";
import { g10Slide } from "./g10-beyond-big-three";
import { g11Slide } from "./g11-bridge-to-h";

// Section G — Tools Ecosystem.
// G.1–G.6 catalogue spec: docs/specs/2026-05-12-slides-application-G1-G6-catalogue.md
// G.7–G.11 synthesis spec: docs/specs/2026-05-12-slides-application-G7-G11-synthesis.md
export const applicationSectionGSlides: SlideDef[] = [
  g1Slide,
  g2Slide,
  g3Slide,
  g4Slide,
  g5Slide,
  g6Slide,
  g7Slide,
  g8Slide,
  g9Slide,
  g10Slide,
  g11Slide,
];
