import type { SlideDef } from "@/deck/types";
import { titleSlide } from "./title";
import { a1Slide } from "./a1-what-youve-seen";

// Opening — Title + Section A (locked order).
// Title is grouped here but tagged section="A" so the NavBar can rely on a
// non-optional section field.
export const openingSectionASlides: SlideDef[] = [titleSlide, a1Slide];
