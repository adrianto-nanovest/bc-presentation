// E.6 — CONTEXT · WHAT & WHY
//
// Ported from `claude-design-project/jsx/slides-b.jsx:283-379`.
//
// 3 steps:
//   0 — left panel reveals (sub-kicker, copper rule, definition, 3 why-points)
//   1 — context network reveals + flow animation runs
//        (phase progresses idle → hub → reveal → flow)
//   2 — next-pointer footer reveals at bottom of left panel
//
// Hover state: hovering a satellite in the network surfaces the satellite's
// rich `hover` payload (kicker, body, tag) inside a details box that lives in
// the left panel — the box is invisible/blank when nothing is hovered.
//
// Layout uses absolute coordinates against the 1280×720 stage. The reveal
// primitives are `<Reveal>` and `<CopperRule>` (CSS-class based, T10 pattern).
// No Framer Motion here — phase transitions are driven by useEffect timers
// against the lifted ContextNetworkPhase machine.
import { useEffect, useState } from "react";
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { HintIcon } from "@/components/HintIcon";
import { highlight } from "@/components/highlight";
import { Reveal, CopperRule } from "./components/Reveal";
import {
  ContextNetwork,
  type ContextNetworkPhase,
} from "./components/ContextNetwork";
import { LucideIcon } from "./components/LucideIcon";
import { e7Content as C } from "./content";

// ───────────────────── slide ─────────────────────

export function E7ContextWhatWhy() {
  const { stepIndex } = useDeck();

  const showLeft = stepIndex >= 0;
  const showNetwork = stepIndex >= 1;
  const showNext = stepIndex >= 2;

  // Phase machine — driven by stepIndex.
  //
  //   step 0 → idle (network not yet revealed)
  //   step 1 → hub (immediately) → reveal (after 350ms) → flow (after 1500ms)
  //   step 2 → flow (latched)
  const [phase, setPhase] = useState<ContextNetworkPhase>("idle");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!showNetwork) {
      setPhase("idle");
      return;
    }
    // step 1+ → progress hub → reveal → flow.
    setPhase("hub");
    const t1 = window.setTimeout(() => setPhase("reveal"), 350);
    const t2 = window.setTimeout(() => setPhase("flow"), 1500);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [showNetwork]);

  const hovered =
    hoveredIndex != null ? C.satellites[hoveredIndex] ?? null : null;

  return (
    <>
      <FigLabel section="E" num={7} label="LAYER 2 · CONTEXT" />

      <div className="slide-headline-row">
        <h1 className="slide-headline small">
          {highlight(C.headline, C.headlineKw)}
        </h1>
      </div>

      {/* LEFT panel — definition + 3 why-points + hover details surface +
          next-slide pointer.
          Top:156 / bottom:80 aligns with the codebase's `.slide-content`
          rule (the design source uses 170/80 — we follow the codebase
          convention as established in T14). */}
      <div
        data-testid="e7-left-pane"
        style={{
          position: "absolute",
          left: 48,
          top: 156,
          width: 410,
          bottom: 80,
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        <Reveal on={showLeft} data-testid="e7-definition">
          <p
            style={{
              fontFamily: "var(--serif)",
              fontSize: 19,
              color: "var(--neutral-100)",
              margin: 0,
              lineHeight: 1.45,
            }}
          >
            {highlight(C.definition, C.definitionKw)}
          </p>
        </Reveal>

        <CopperRule on={showLeft} width="40%" delay={250} />

        <div style={{ height: 4 }} />

        <ul
          data-testid="e7-why-list"
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          {C.whyPoints.map((b, i) => (
            <Reveal
              key={i}
              on={showLeft}
              delay={350 + i * 130}
              as="li"
              data-testid={`e7-why-${i}`}
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 10,
                fontFamily: "var(--serif)",
                fontSize: 15,
                color: "var(--neutral-300)",
                lineHeight: 1.4,
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  background: "var(--copper-400)",
                  flexShrink: 0,
                  transform: "translateY(-1px)",
                }}
              />
              <span>{highlight(b.text, b.kw)}</span>
            </Reveal>
          ))}
        </ul>

        {/* Hover details surface — invisible/blank unless hovering a
            satellite. No placeholder copy. */}
        <div
          data-testid="e7-hover-surface"
          style={{
            flex: 1,
            position: "relative",
            minHeight: 140,
            marginTop: 8,
          }}
        >
          <div
            data-testid="e7-hover-box"
            data-active={hovered ? "true" : "false"}
            style={{
              position: "absolute",
              inset: 0,
              border: "1px solid",
              borderColor: hovered ? "var(--copper-500)" : "transparent",
              background: hovered ? "rgba(184,110,61,0.06)" : "transparent",
              padding: hovered ? "16px 18px" : 0,
              opacity: hovered ? 1 : 0,
              transform: hovered ? "translateY(0)" : "translateY(6px)",
              transition:
                "opacity 0.22s var(--ease), transform 0.22s var(--ease), border-color 0.22s var(--ease), background 0.22s var(--ease)",
              pointerEvents: "none",
            }}
          >
            {hovered && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <LucideIcon name={hovered.icon} size={18} />
                  <span
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: 12,
                      letterSpacing: "0.2em",
                      color: "var(--copper-200)",
                      textTransform: "uppercase",
                    }}
                  >
                    {hovered.label}
                  </span>
                </div>
                <span
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: 10.5,
                    letterSpacing: "0.16em",
                    color: "var(--copper-400)",
                    textTransform: "uppercase",
                  }}
                >
                  {hovered.hover.kicker}
                </span>
                <p
                  style={{
                    fontFamily: "var(--serif)",
                    fontSize: 15,
                    color: "var(--neutral-100)",
                    margin: 0,
                    lineHeight: 1.4,
                  }}
                >
                  {hovered.hover.body}
                </p>
                <p
                  style={{
                    fontFamily: "var(--serif)",
                    fontStyle: "italic",
                    fontSize: 14,
                    color: "var(--copper-200)",
                    margin: 0,
                    lineHeight: 1.4,
                  }}
                >
                  {highlight(hovered.hover.tag, hovered.hover.tagKw)}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Next-slide pointer footer — copper-bordered italic, like E.2's
            bridge line. */}
        <Reveal
          on={showNext}
          delay={150}
          data-testid="e7-next"
          style={{ borderLeft: "2px solid var(--copper-500)", paddingLeft: 14 }}
        >
          <p
            style={{
              fontFamily: "var(--serif)",
              fontStyle: "italic",
              fontSize: 16,
              color: "var(--copper-200)",
              margin: 0,
              lineHeight: 1.4,
            }}
          >
            {highlight(C.next, C.nextKw)}
          </p>
        </Reveal>
      </div>

      {/* RIGHT — node network with reveal + flow animation. */}
      <div
        data-testid="e7-right-pane"
        style={{
          position: "absolute",
          left: 480,
          right: 36,
          top: 156,
          bottom: 76,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Reveal
          on={showNetwork}
          data-testid="e7-reveal-kicker"
          style={{
            flex: "0 0 auto",
            marginBottom: 18,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
          }}
        >
          <span
            style={{
              fontFamily: "var(--mono)",
              fontSize: 11,
              letterSpacing: "0.22em",
              color: "var(--copper-300)",
              textTransform: "uppercase",
            }}
          >
            {highlight(C.reveal, C.revealKw)}
          </span>
          {/* Hint affordance — visible at code stepIndex >= 1 (Adri Steps
              2 and 3) alongside the kicker. Satellites are hover-only on
              E6, so the copy reflects that (no pin/unpin). */}
          <HintIcon
            position="below"
            text="Hover each component for details."
          />
        </Reveal>

        <div
          style={{
            position: "relative",
            flex: "1 1 auto",
            minHeight: 0,
          }}
        >
          {showNetwork && (
            <ContextNetwork
              satellites={C.satellites.map((s) => ({
                id: s.id,
                label: s.label,
                icon: s.icon,
              }))}
              hubX={382}
              hubY={222}
              rx={300}
              ry={170}
              phase={phase}
              hoveredIndex={hoveredIndex}
              onHover={setHoveredIndex}
            />
          )}
        </div>
      </div>
    </>
  );
}

// ───────────────────── slide def ─────────────────────

export const e7Slide: SlideDef = {
  steps: 3,
  canonicalPose: 2,
  animationMode: "step-reveal",
  surface: "dark",
  section: "E",
  render: () => <E7ContextWhatWhy />,
};
