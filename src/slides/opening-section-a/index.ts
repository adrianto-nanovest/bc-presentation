import type { SlideDef } from "@/deck/types";
import type { Brand } from "@/deck-variants";
import { VARIANT } from "@/variant";
import { titleSlide } from "./title";
import { a1Slide } from "./a1-what-youve-seen";
import { a1GeneralSlide } from "./a1-general";
import { a1GemsSlide } from "./a1-gems";

// A.1's hook is a BRAND decision, not a deck-set one: it points at evidence the
// audience's own organisation recognises. `general` has no Session-1 winners to
// point at, so it trades social proof for familiarity; GEMS points at the
// DigiTech portfolio it already runs, and turns it from "handled for you" into
// "yours to build with" (gh#25).
const a1ByBrand: Record<Brand, SlideDef> = {
  berau: a1Slide,
  gems: a1GemsSlide,
  general: a1GeneralSlide,
};

// Opening — Title + Section A (locked order).
// The Title is grouped here because it belongs to the `opening` run, and it
// carries `numbered: false`: it prints no figure, and pressing `A` skips past it
// to A.1 (compose.ts R5).
export const openingSectionASlides: SlideDef[] = [
  titleSlide,
  a1ByBrand[VARIANT.brand],
];
