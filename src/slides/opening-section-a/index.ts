import type { SlideDef } from "@/deck/types";
import { VARIANT } from "@/variant";
import { titleSlide } from "./title";
import { a1Slide } from "./a1-what-youve-seen";
import { a1GeneralSlide } from "./a1-general";

// Opening — Title + Section A (locked order).
// Title is grouped here but tagged section="A" so the NavBar can rely on a
// non-optional section field.
// The general variant swaps A.1's hook (no Session-1 winners to point at).
export const openingSectionASlides: SlideDef[] = [
  titleSlide,
  VARIANT === "general" ? a1GeneralSlide : a1Slide,
];
