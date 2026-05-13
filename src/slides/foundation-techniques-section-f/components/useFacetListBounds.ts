// useFacetListBounds — measure the FacetMenu's card stack vertical extent.
//
// Section F slides (F.2–F.7) align the right-side popover pane to the left
// FacetMenu's card-stack top + bottom (Items 1-3 of the deck-wide popover
// refactor). The FacetMenu's card stack lives inside an element with
// `data-testid="f-facet-list"` (rendered by `./FacetMenu.tsx`). Its top/bottom
// vary with card count (F.6 has 4 facets; the rest have 5) and with whichever
// padding/gap values the menu applies internally, so we measure rather than
// hard-code.
//
// The slide root (`.stage`) is the offset-parent for absolutely-positioned
// children, and the `.stage-wrap` transform scale is applied above it, so
// `HTMLElement.offsetTop` / `offsetHeight` return design-pixel coordinates
// suitable for round-tripping into `top` / `bottom` inline styles on a sibling
// absolutely-positioned wrapper.
import { useLayoutEffect, useState } from "react";

export interface FacetListBounds {
  /** Distance (px) from the stage top to the first card's top edge. */
  top: number;
  /** Distance (px) from the stage bottom to the last card's bottom edge. */
  bottom: number;
}

/**
 * Reads the FacetMenu card-stack's vertical extent and exposes `top` /
 * `bottom` values matching the same `position: absolute` coordinate system.
 *
 * The returned `bottom` is the distance from the stage bottom to the last
 * card's bottom (so a sibling with `bottom: <value>` aligns exactly). When
 * the FacetMenu element can't be found (test environment, transient render),
 * we fall back to the legacy `top: 156 / bottom: 80` constants so the slide
 * still renders something sane.
 */
export function useFacetListBounds(): FacetListBounds {
  const [bounds, setBounds] = useState<FacetListBounds>({
    top: 156,
    bottom: 80,
  });

  useLayoutEffect(() => {
    function measure(): FacetListBounds | null {
      // FacetMenu renders the card stack inside this element. There is only
      // one per slide.
      const list = document.querySelector<HTMLElement>(
        '[data-testid="f-facet-list"]',
      );
      if (!list) return null;
      // Walk up to the stage so we can compute offsets relative to it.
      const stage = list.closest<HTMLElement>(".stage");
      if (!stage) return null;
      // offsetTop is relative to the nearest positioned ancestor — for our
      // layout that's the `.stage` element. If something is wrapping the
      // list in another positioned div, sum offsetTop up the chain until we
      // reach the stage.
      let top = 0;
      let cursor: HTMLElement | null = list;
      while (cursor && cursor !== stage) {
        top += cursor.offsetTop;
        cursor = cursor.offsetParent as HTMLElement | null;
      }
      const listHeight = list.offsetHeight;
      const stageHeight = stage.offsetHeight;
      const bottom = stageHeight - (top + listHeight);
      return { top, bottom };
    }

    // Measure immediately after layout, then re-measure once on the next
    // animation frame to catch any post-mount layout shifts (e.g. font
    // loading or sibling reveal animations finishing their initial paint).
    const initial = measure();
    if (initial) setBounds(initial);
    const raf = window.requestAnimationFrame(() => {
      const next = measure();
      if (next) setBounds(next);
    });
    return () => window.cancelAnimationFrame(raf);
  }, []);

  return bounds;
}
