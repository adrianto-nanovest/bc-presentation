// Title slide — interaction help legend.
//
// A pulsing Info icon (echoes <HintIcon>'s aesthetic) that lives inline at
// the end of the facilitator chip line. Hover reveals a keymap legend
// positioned above the facilitator chip, left-aligned with the chip's left
// edge (which matches every title-slide content row at x=80).
//
// The legend renders as a sibling of the trigger inside the facilitator
// chip, so `position: absolute; left: 0; bottom: calc(100% + N)` resolves
// against the chip's coordinate system — no Playwright-measured offsets
// needed, the legend tracks the chip's left edge automatically.
//
// Layout uses CSS Grid with `grid-template-columns: max-content auto` so
// the keys column auto-sizes to the WIDEST row's content and every row's
// action text aligns on the same x. Switching to flex per-row caused the
// action column to drift right whenever a key row was wider than its
// neighbours (notably the SPACE/BACKSPACE/CLICK row).
//
// pointerEvents:none on the legend keeps hover semantics simple: pointer
// over icon → show legend; off icon → hide. The legend cannot "trap" the
// pointer.
import { Fragment, useState } from "react";
import { motion } from "framer-motion";
import { Info } from "lucide-react";

interface KeymapEntry {
  keys: string[];
  action: string;
}

const ENTRIES: KeymapEntry[] = [
  { keys: ["←", "→"], action: "Prev / next slide" },
  {
    keys: ["↑", "↓", "SPACE", "BACKSPACE", "CLICK"],
    action: "Prev / next step",
  },
  {
    keys: ["HOVER", "CLICK"],
    action: "Reveal / pin card details (some slides, first step)",
  },
  {
    keys: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"],
    action: "Jump to section's first slide",
  },
  { keys: ["R"], action: "Go to first slide" },
  { keys: ["U"], action: "Go to first step in current slide" },
];

export function TitleKeymap() {
  const [hover, setHover] = useState(false);

  return (
    <>
      <span
        data-testid="title-keymap-trigger"
        data-no-advance=""
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          display: "inline-flex",
          alignItems: "center",
          marginLeft: 10,
          paddingTop: 7,
          paddingBottom: 5,
          cursor: "help",
          color: "var(--copper-400)",
        }}
      >
        <motion.span
          animate={
            hover
              ? { scale: 1.1, opacity: 1 }
              : { scale: [1, 1.18, 1], opacity: [0.65, 1, 0.65] }
          }
          transition={
            hover
              ? { duration: 0.18, ease: "easeOut" }
              : { duration: 1.6, repeat: Infinity, ease: "easeInOut" }
          }
          style={{ display: "inline-flex" }}
        >
          <Info size={14} strokeWidth={2} aria-hidden />
        </motion.span>
      </span>

      <motion.div
        data-testid="title-keymap-legend"
        data-revealed={String(hover)}
        initial={false}
        animate={{ opacity: hover ? 1 : 0, y: hover ? 0 : 6 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        style={{
          position: "absolute",
          left: 0,
          bottom: "calc(100% + 18px)",
          padding: "14px 22px 16px",
          background: "rgba(15, 15, 15, 0.96)",
          border: "1px solid var(--copper-700)",
          borderRadius: 2,
          pointerEvents: "none",
          zIndex: 30,
        }}
      >
        <div
          style={{
            fontFamily: "var(--mono)",
            fontSize: 10,
            letterSpacing: "0.22em",
            color: "var(--copper-400)",
            textTransform: "uppercase",
            marginBottom: 6,
            borderBottom: "1px solid var(--copper-700)",
            paddingBottom: 8,
          }}
        >
          Interaction guide
        </div>

        <div
          data-testid="title-keymap-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "max-content auto",
            columnGap: 18,
            rowGap: 7,
            alignItems: "center",
          }}
        >
          {ENTRIES.map((entry, i) => (
            <Fragment key={i}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  flexShrink: 0,
                }}
              >
                {entry.keys.map((k, j) => (
                  <span
                    key={`k-${j}`}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    {j > 0 && (
                      <span
                        style={{
                          fontFamily: "var(--mono)",
                          fontSize: 9,
                          color: "var(--neutral-500)",
                        }}
                      >
                        ·
                      </span>
                    )}
                    <KeyChip label={k} />
                  </span>
                ))}
              </div>
              <span
                style={{
                  fontFamily: "var(--serif)",
                  fontStyle: "italic",
                  fontSize: 13,
                  color: "var(--neutral-100)",
                  lineHeight: 1.3,
                  letterSpacing: "0.02em",
                  textTransform: "none",
                  whiteSpace: "nowrap",
                }}
              >
                {entry.action}
              </span>
            </Fragment>
          ))}
        </div>
      </motion.div>
    </>
  );
}

function KeyChip({ label }: { label: string }) {
  return (
    <span
      style={{
        fontFamily: "var(--mono)",
        fontSize: 10,
        letterSpacing: "0.08em",
        color: "var(--copper-200)",
        background: "rgba(217,119,87,0.10)",
        border: "1px solid var(--copper-700)",
        padding: "2px 6px",
        borderRadius: 2,
        textTransform: "uppercase",
        lineHeight: 1.2,
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </span>
  );
}
