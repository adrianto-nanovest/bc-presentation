// F.6 — THE UNSEXY WORK (Hooks)
//
// CANONICAL Section F facet slide. Two-step structure with hover-only details
// and an aligned right-pane bordered box. Mirrors F.2 exactly (one wrinkle:
// F.6 has 4 facets, not 5).
//
// Step axis (2 steps; canonical pose = 1):
//   0 — All 4 facet cards stagger-reveal on the left. Hover is always on.
//       Right pane shows the bordered box framing an empty content area.
//       Hovering any facet card crossfades the matching illustration into
//       the bordered box. Footer hidden.
//   1 — Footer (italic copper-200 caption) fades in below the facet cards.
//       Everything else stays revealed; hover continues to drive details.
//
// Border alignment (canonical):
//   The right-pane bordered box uses the same `top: 156 / bottom: 80` as the
//   left FacetMenu so the top and bottom borders align exactly with the
//   FacetMenu's top edge (header baseline) and bottom edge. An invisible
//   visibility section title inside the bordered box mirrors the left's
//   mono header + 12px gap + CopperRule, so when a facet hover illustration
//   crossfades in, its content top sits on the same baseline as the left's
//   first facet card.
//
// Facet → state map (all hover-only, NO defaultState):
//   what-it-is        → WhatItIsCanvas — bell→reflex pairs cycle through the
//                       deck-wide f-card-cycle highlight loop top→bottom
//                       (3 rows → 3s loop).
//   lifecycle-events  → LifecycleCanvas — SVG timeline with a traveling
//                       copper dot sweeping left→right via f-flow-dot (2s loop).
//   three-hooks       → ThreeHooksCanvas — 3-column canonical sketch; columns
//                       participate in the f-card-cycle highlight loop
//                       left→right (3 cols → 3s loop). One-time R2-15 entry
//                       stagger stays on an outer wrapper.
//   example           → ExampleCanvas — 4-step horizontal flow; steps
//                       participate in the f-card-cycle highlight loop
//                       left→right (4 steps → 4s loop).
import { useState, type CSSProperties } from "react";
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { highlight } from "@/components/highlight";
import { FacetMenu } from "./components/FacetMenu";
import { DetailCanvas } from "./components/DetailCanvas";
import { HookColumn } from "./components/HookColumn";
import { useFacetListBounds } from "./components/useFacetListBounds";
import { f6Content as C } from "./content";

// ───────────────────── shared layout constants (F-section canonical) ─────────────────────
//
// Right pane width — top / bottom are measured at runtime via
// `useFacetListBounds`.

const RIGHT_W = 660;

// ───────────────────── slide ─────────────────────

export function F6HooksUnsexyWork() {
  const { stepIndex } = useDeck();

  // CANONICAL Section F step-gate pattern (mirrors F.2):
  //   showCards     = stepIndex >= 0   → all 4 cards stagger-reveal at step 0
  //   hoverEnabled  = stepIndex >= 0   → hover always-on once cards are in
  //   showFooter    = stepIndex >= 1   → footer reveals at canonical pose
  const showCards = stepIndex >= 0;
  const hoverEnabled = stepIndex >= 0;
  const showFooter = stepIndex >= 1;

  const [activeFacet, setActiveFacet] = useState<string | null>(null);
  const [pinnedFacet, setPinnedFacet] = useState<string | null>(null);
  // Pin wins over hover so a pinned facet remains the right-pane illustration
  // even when the user mouses away (or onto another card pre-click).
  const effectiveFacet = hoverEnabled ? (pinnedFacet ?? activeFacet) : null;

  const { top: paneTop, bottom: paneBottom } = useFacetListBounds();

  return (
    <>
      <FigLabel section="F" num={6} label="THE UNSEXY WORK" />

      <div className="slide-headline-row">
        <h1 className="slide-headline small">
          {highlight(C.headline, [...C.headlineKw])}
        </h1>
      </div>

      {/* LEFT — facet menu. All 4 cards reveal at stepIndex 0; footer at 1. */}
      <FacetMenu
        items={C.facets.map((f) => ({
          id: f.id,
          title: f.title,
          essence: f.essence,
          essenceKw: f.essenceKw,
          icon: f.icon,
        }))}
        activeFacet={hoverEnabled ? activeFacet : null}
        onHover={hoverEnabled ? setActiveFacet : () => {}}
        pinnedFacet={pinnedFacet}
        onPin={setPinnedFacet}
        showCards={showCards}
        header={C.header}
        footer={C.footer}
        footerKw={[...C.footerKw]}
        showFooter={showFooter}
      />

      {/* RIGHT — transparent popover anchor. Top / bottom match the left
          FacetMenu's card-stack extent exactly (measured at runtime). */}
      <div
        data-testid="f6-right-pane"
        style={{
          position: "absolute",
          right: 48,
          top: paneTop,
          width: RIGHT_W,
          bottom: paneBottom,
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        {/* Content area — DetailCanvas renders nothing until a facet hover. */}
        <div
          style={{
            position: "relative",
            width: "100%",
            maxHeight: "100%",
            height: "100%",
            pointerEvents: "auto",
          }}
        >
          <DetailCanvas
            activeFacet={effectiveFacet}
            states={{
              "what-it-is": <WhatItIsCanvas />,
              "lifecycle-events": <LifecycleCanvas />,
              "three-hooks": <ThreeHooksCanvas />,
              example: <ExampleCanvas />,
            }}
          />
        </div>
      </div>
    </>
  );
}

// FacetHeader was removed in the popover refactor (Item 1).

// ───────────────────── shared atoms ─────────────────────

function ArrowRight({ width = 56 }: { width?: number }) {
  return (
    <svg
      viewBox={`0 0 ${width} 14`}
      width={width}
      height={14}
      fill="none"
      stroke="var(--neutral-200)"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={`M2 7 L${width - 4} 7`} />
      <path d={`M${width - 10} 3 L${width - 4} 7 L${width - 10} 11`} />
    </svg>
  );
}

function BellIcon({ size = 24 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="var(--neutral-200)"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}

function CheckIcon({ size = 22 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="var(--copper-200)"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12.5 L10 17.5 L19 7" />
    </svg>
  );
}

// ───────────────────── WHAT IT IS state ─────────────────────
// Bell-icon → reflex pairs. Three event→reflex rows participate in the
// deck-wide `f-card-cycle` highlight loop (top→bottom). One card-width
// border cycle per row; delays 0/1/2s on a 3s loop.

function WhatItIsCanvas() {
  const rows: { reflex: string }[] = [
    { reflex: "auto-convert PDF" },
    { reflex: "log every edit" },
    { reflex: "ask before close" },
  ];
  const labelStyle: CSSProperties = {
    fontFamily: "var(--serif)",
    fontStyle: "italic",
    fontSize: 14,
    color: "var(--neutral-200)",
  };
  const total = rows.length;
  return (
    <div
      data-testid="f6-what-it-is"
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "8px 12px",
        gap: 14,
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 14,
          minHeight: 0,
        }}
      >
        {rows.map((r, i) => (
          <div
            key={i}
            data-testid={`f6-what-it-is-row-${i}`}
            className="f-card-cycle"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              padding: "10px 14px",
              "--cycle-duration": `${total}s`,
              "--cycle-delay": `${i}s`,
            } as CSSProperties}
          >
            {/* event side */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                width: 110,
                flexShrink: 0,
              }}
            >
              <BellIcon size={20} />
              <span
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 10,
                  letterSpacing: "0.18em",
                  color: "var(--copper-300)",
                  textTransform: "uppercase",
                }}
              >
                event
              </span>
            </div>
            <ArrowRight width={48} />
            {/* reflex side */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                flex: 1,
              }}
            >
              <CheckIcon size={20} />
              <span style={labelStyle}>{r.reflex}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ───────────────────── LIFECYCLE EVENTS state ─────────────────────
// Horizontal timeline with ~8 events and a traveling copper dot sweeping
// left→right via the shared f-flow-dot keyframe (2s loop along the rail).

function LifecycleCanvas() {
  // Spaced along x from 80 → 580 (timeline runs 50 → 600). Beat order
  // matches a real Claude session lifecycle vocabulary.
  const events = [
    { x: 80, label: "SESSION START" },
    { x: 160, label: "USER PROMPT" },
    { x: 230, label: "PRE TOOL USE" },
    { x: 300, label: "EDIT" },
    { x: 360, label: "POST TOOL USE" },
    { x: 430, label: "WRITE" },
    { x: 500, label: "POST TOOL USE" },
    { x: 580, label: "STOP" },
  ];
  return (
    <div
      data-testid="f6-lifecycle"
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "8px 12px",
        gap: 14,
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: 0,
        }}
      >
        <svg
          viewBox="0 0 620 200"
          width="620"
          height="200"
          fill="none"
          stroke="var(--neutral-200)"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          style={{ overflow: "visible" }}
        >
          {/* main timeline rail */}
          <path d="M50 110 L600 110" />
          {/* arrow head */}
          <path d="M592 104 L600 110 L592 116" />

          {/* tick marks */}
          {events.map((e, i) => (
            <path key={`tick-${i}`} d={`M${e.x} 102 L${e.x} 118`} />
          ))}

          {/* event labels — alternate above / below to avoid overlap */}
          {events.map((e, i) => {
            const above = i % 2 === 0;
            const ty = above ? 92 : 138;
            return (
              <g key={`lbl-${i}`}>
                <path
                  d={`M${e.x} ${above ? 102 : 118} L${e.x} ${above ? 96 : 124}`}
                  opacity={0.7}
                />
                <text
                  x={e.x}
                  y={ty}
                  textAnchor="middle"
                  fontSize="9"
                  fill="var(--neutral-200)"
                  stroke="none"
                  fontFamily="var(--mono)"
                  letterSpacing="0.18em"
                >
                  {e.label}
                </text>
              </g>
            );
          })}

          {/* copper accents at endpoints */}
          <circle cx="50" cy="110" r="3.5" fill="var(--copper-200)" stroke="none" />
          <circle
            cx="600"
            cy="110"
            r="3.5"
            fill="var(--copper-200)"
            stroke="none"
          />

          {/* Traveling dot — loops left→right every 2s via shared
              f-flow-dot keyframe (CSS Motion Path). */}
          <circle
            data-testid="f6-lifecycle-dot"
            className="f-flow-dot"
            r="4"
            fill="var(--copper-200)"
            stroke="none"
            style={{
              offsetPath: "path('M 50 110 L 600 110')",
            }}
          />
        </svg>
      </div>
    </div>
  );
}

// ───────────────────── THREE HOOKS state ─────────────────────
// The 3-column canonical sketch. Columns reveal immediately on hover
// (no stagger from a global step — the FacetMenu reveal handles slide-level
// entrance; here the assembled columns are always visible inside the state).
// Each column participates in the deck-wide `f-card-cycle` highlight loop
// (left→right; 3 columns → 3s loop, delays 0/1/2s).
//
// Two animation layers stack cleanly on separate DOM levels:
//   • outer wrapper  → one-time R2-15 entry stagger (`f6-hooks-col-in`,
//                       0.2s, animationDelay = i * 100ms). Replays each
//                       time the state remounts via DetailCanvas's inner
//                       key flip.
//   • inner card     → infinite `f-card-cycle` border/background loop,
//                       parameterized by --cycle-duration / --cycle-delay.

function ThreeHooksCanvas() {
  const types = ["SessionStart", "PostToolUse", "Stop"] as const;
  const total = types.length;
  return (
    <div
      data-testid="f6-three-hooks"
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "4px 10px",
        gap: 6,
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "row",
          gap: 10,
          justifyContent: "center",
          alignItems: "center",
          minHeight: 0,
          paddingTop: 0,
        }}
      >
        {types.map((type, i) => (
          // Outer wrapper handles the one-time R2-15 entry stagger.
          <div
            key={type}
            style={{
              animation: `f6-hooks-col-in 0.2s var(--ease) both`,
              animationDelay: `${i * 100}ms`,
            }}
          >
            {/* Inner card runs the infinite f-card-cycle border loop. */}
            <div
              data-testid={`f6-three-hooks-col-${i}`}
              className="f-card-cycle"
              style={{
                padding: "6px 4px",
                "--cycle-duration": `${total}s`,
                "--cycle-delay": `${i}s`,
              } as CSSProperties}
            >
              <HookColumn type={type} on={true} delay={0} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ───────────────────── EXAMPLE state ─────────────────────
// 4-step horizontal auto-audit flow. Each step participates in the
// deck-wide `f-card-cycle` highlight loop (left→right; 4 steps → 4s loop,
// delays 0/1/2/3s).

function ExampleCanvas() {
  const steps = [
    { label: "USER SAVES", sub: "weekly-report.md" },
    { label: "HOOK FIRES", sub: "PostToolUse" },
    { label: "AUDIT SCRIPT", sub: "runs in background" },
    { label: "FILE UPDATED", sub: "compliance timestamp" },
  ];
  const total = steps.length;
  return (
    <div
      data-testid="f6-example"
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        padding: "8px 12px",
      }}
    >
      {/* Top spacer — absorbs space above the diagram so the diagram sits at
          the vertical midpoint of the popover. */}
      <div style={{ flex: 1 }} />

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 4,
        }}
      >
        {steps.map((s, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <div
              data-testid={`f6-example-step-${i}`}
              className="f-card-cycle"
              style={{
                width: 132,
                padding: "12px 10px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 6,
                minHeight: 78,
                "--cycle-duration": `${total}s`,
                "--cycle-delay": `${i}s`,
              } as CSSProperties}
            >
              <div
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 10,
                  letterSpacing: "0.18em",
                  color: "var(--copper-200)",
                  textTransform: "uppercase",
                  textAlign: "center",
                }}
              >
                {s.label}
              </div>
              <div
                style={{
                  fontFamily: "var(--serif)",
                  fontStyle: "italic",
                  fontSize: 12,
                  color: "var(--neutral-200)",
                  textAlign: "center",
                  lineHeight: 1.4,
                }}
              >
                {s.sub}
              </div>
            </div>
            {i < steps.length - 1 ? <ArrowRight width={22} /> : null}
          </div>
        ))}
      </div>

      {/* Bottom spacer — symmetric with the top spacer so the diagram is
          vertically centered between the popover top and the footer. */}
      <div style={{ flex: 1 }} />

      {/* Footer caption — matches F.4's ExampleState footer styling (italic
          copper-200 serif, 12.5px). Crystallizes the insight without
          restating the title. Pinned at the bottom of the popover. */}
      <p
        style={{
          fontFamily: "var(--serif)",
          fontStyle: "italic",
          fontSize: 12.5,
          color: "var(--copper-200)",
          margin: 0,
          lineHeight: 1.4,
        }}
      >
        {highlight(
          "Hooks fire deterministically on every save — no LLM call, no forgetting.",
          ["deterministically", "no LLM call"],
        )}
      </p>
    </div>
  );
}

// ───────────────────── slide def ─────────────────────

export const f6Slide: SlideDef = {
  steps: 2,
  canonicalPose: 1,
  animationMode: "step-reveal",
  surface: "dark",
  section: "F",
  render: () => <F6HooksUnsexyWork />,
};
