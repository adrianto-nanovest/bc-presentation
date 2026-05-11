// FacetStrip — F.8 horizontal mono-uppercase facet strip (spec §11.3).
//
// Replaces the standard E.8/F-deep-dive left-side FacetMenu for the
// coronation slide F.8. Items are displayed inline, separated by a thin
// copper "·" middle-dot. Each item lights up to copper-200 with an
// animated copper underline (0 → 100% width) when its index <= activeStep.
//
// Used only on F.8 — pass activeStep mapped as follows:
//   step 1  → COMPONENTS active (index 0)
//   step 10 → OUTPUTS active (index 1)
//   step 12 → PORTABLE active (index 2)
//   step 13 → BUILD INCREMENTAL active (index 3)
//
// All transitions use `var(--ease)` at 400ms — matching the deck-wide
// motion-timing reference (spec §3.3).

export interface FacetStripProps {
  /** Ordered list of mono-uppercase facet labels, e.g. ["COMPONENTS", ...]. */
  items: readonly string[];
  /** Highest facet index to light up. -1 = none, 0 = first, etc. */
  activeStep: number;
}

export function FacetStrip({ items, activeStep }: FacetStripProps) {
  return (
    <div
      data-testid="f8-facet-strip"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 0,
        flexWrap: "nowrap",
      }}
    >
      {items.map((label, i) => {
        const active = i <= activeStep;
        return (
          <span
            key={label}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 14,
            }}
          >
            <span
              data-testid={`facet-strip-item-${i}`}
              data-active={active ? "true" : "false"}
              style={{
                position: "relative",
                display: "inline-block",
                fontFamily: "var(--mono)",
                fontSize: 12,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: active ? "var(--copper-200)" : "var(--neutral-400)",
                transition: "color 400ms var(--ease)",
                padding: "4px 2px",
              }}
            >
              {label}
              {/* Animated copper underline — width 0 → 100% on activation */}
              <span
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: 0,
                  bottom: 0,
                  height: 1,
                  background: "var(--copper-300)",
                  width: active ? "100%" : "0%",
                  transition: "width 400ms var(--ease)",
                  transformOrigin: "left center",
                }}
              />
            </span>
            {i < items.length - 1 ? (
              <span
                aria-hidden="true"
                style={{
                  color: "var(--copper-700)",
                  fontFamily: "var(--mono)",
                  fontSize: 12,
                  letterSpacing: "0.22em",
                }}
              >
                ·
              </span>
            ) : null}
          </span>
        );
      })}
    </div>
  );
}
