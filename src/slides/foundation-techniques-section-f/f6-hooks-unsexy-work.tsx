// F.6 — THE UNSEXY WORK (Hooks)
//
// Spec §9. E.8-style 480/660 split. 4-facet menu (collapsed from 5 since
// the 3-column visual is dense; STRUCTURE/TYPES is fused with
// THREE HOOKS DOING THE UNSEXY WORK).
//
// Steps (6 total — spec §9.5):
//   0: title + facet header visible; default 3-column canvas at 0.5 opacity
//   1–4: facet items 1–4 cascade (delay 120 + i × 90)
//   5: footer reveals; default canvas brightens to opacity 1; 3 columns
//      assemble left-to-right (300ms stagger)
//
// Right-canvas states (spec §9.4):
//   - default / three-hooks: 3-column canonical visual with stagger
//   - what-it-is: bell-icon → reflex-action pairs (3 examples)
//   - lifecycle-events: ~8-event horizontal timeline strip
//   - example: 4-step auto-audit workflow
import { useState, type CSSProperties } from "react";
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { highlight } from "@/components/highlight";
import { Reveal } from "./components/Reveal";
import { FacetMenu } from "./components/FacetMenu";
import { DetailCanvas } from "./components/DetailCanvas";
import { HookColumn } from "./components/HookColumn";
import { f6Content as C } from "./content";

// ───────────────────── canvas: default 3-column ─────────────────────

interface ThreeHooksCanvasProps {
  /** Container brightness (0.5 dim default → 1.0 after step 5). */
  bright: boolean;
  /** When true, stagger-assemble the 3 columns left-to-right. */
  assemble: boolean;
}

function ThreeHooksCanvas({ bright, assemble }: ThreeHooksCanvasProps) {
  return (
    <div
      data-testid="f6-canvas-three-hooks"
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 28,
        opacity: bright ? 1 : 0.5,
        transition: "opacity 700ms var(--ease)",
      }}
    >
      <div
        style={{
          fontFamily: "var(--mono)",
          fontSize: 11,
          letterSpacing: "0.22em",
          color: "var(--copper-300)",
          textTransform: "uppercase",
          textAlign: "center",
        }}
      >
        Three hooks doing the unsexy work
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 20,
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <HookColumn type="SessionStart" on={assemble} delay={0} />
        <HookColumn type="PostToolUse" on={assemble} delay={300} />
        <HookColumn type="Stop" on={assemble} delay={600} />
      </div>
    </div>
  );
}

// ───────────────────── canvas: WHAT IT IS ─────────────────────
// Bell-icon → reflex pairs. 3 stacked example rows.

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

function WhatItIsCanvas() {
  const rows: { reflex: string }[] = [
    { reflex: "auto-convert PDF" },
    { reflex: "log every edit" },
    { reflex: "ask before close" },
  ];
  const labelStyle: CSSProperties = {
    fontFamily: "var(--serif)",
    fontStyle: "italic",
    fontSize: 16,
    color: "var(--neutral-200)",
  };
  return (
    <div
      data-testid="f6-canvas-what-it-is"
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 36,
      }}
    >
      <div
        style={{
          fontFamily: "var(--mono)",
          fontSize: 11,
          letterSpacing: "0.22em",
          color: "var(--copper-300)",
          textTransform: "uppercase",
        }}
      >
        event → reflex
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 22,
        }}
      >
        {rows.map((r, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 18,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                width: 96,
              }}
            >
              <BellIcon size={22} />
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
            <ArrowRight width={64} />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                width: 240,
              }}
            >
              <CheckIcon size={22} />
              <span style={labelStyle}>{r.reflex}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ───────────────────── canvas: LIFECYCLE EVENTS ─────────────────────
// Horizontal timeline. ~8 events labelled, mono uppercase, tick marks.

function LifecycleCanvas() {
  // Spaced along x from 70 → 580 (timeline runs 50 → 600).
  // Beat order matches a real Claude session lifecycle vocabulary.
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
      data-testid="f6-canvas-lifecycle"
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 24,
        padding: "0 20px",
      }}
    >
      <div
        style={{
          fontFamily: "var(--mono)",
          fontSize: 11,
          letterSpacing: "0.22em",
          color: "var(--copper-300)",
          textTransform: "uppercase",
        }}
      >
        Lifecycle events · one session
      </div>

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
              {/* connector tick */}
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
      </svg>

      <div
        style={{
          fontFamily: "var(--serif)",
          fontStyle: "italic",
          fontSize: 13,
          color: "var(--copper-200)",
          textAlign: "center",
        }}
      >
        hooks fire on these events — quietly, in the background
      </div>
    </div>
  );
}

// ───────────────────── canvas: EXAMPLE (auto-audit) ─────────────────────
// 4-step horizontal arrow flow.

function ExampleCanvas() {
  const steps = [
    { label: "USER SAVES", sub: "weekly-report.md" },
    { label: "HOOK FIRES", sub: "PostToolUse" },
    { label: "AUDIT SCRIPT", sub: "runs in background" },
    { label: "FILE UPDATED", sub: "compliance timestamp" },
  ];
  return (
    <div
      data-testid="f6-canvas-example"
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 28,
        padding: "0 16px",
      }}
    >
      <div
        style={{
          fontFamily: "var(--mono)",
          fontSize: 11,
          letterSpacing: "0.22em",
          color: "var(--copper-300)",
          textTransform: "uppercase",
          textAlign: "center",
        }}
      >
        auto-audit on every weekly-report save
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 6,
        }}
      >
        {steps.map((s, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <div
              style={{
                width: 128,
                padding: "12px 10px",
                border: "1px solid var(--copper-800)",
                background: "rgba(184,110,61,0.04)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 6,
                minHeight: 70,
              }}
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
                }}
              >
                {s.sub}
              </div>
            </div>
            {i < steps.length - 1 ? <ArrowRight width={28} /> : null}
          </div>
        ))}
      </div>

      <div
        style={{
          fontFamily: "var(--serif)",
          fontStyle: "italic",
          fontSize: 13,
          color: "var(--copper-200)",
          textAlign: "center",
        }}
      >
        the user never has to remember — the hook does it every time
      </div>
    </div>
  );
}

// ───────────────────── slide ─────────────────────

export function F6HooksUnsexyWork() {
  const { stepIndex } = useDeck();

  // Step gates per spec §9.5
  const showCards = stepIndex >= 0;
  const showFooter = stepIndex >= 5;
  const bright = stepIndex >= 5;
  const assemble = stepIndex >= 5;

  const [activeFacet, setActiveFacet] = useState<string | null>(null);

  // After step 4, all 4 facets are revealed → hover-canvas-swap enabled.
  const hoverEnabled = stepIndex >= 4;
  const effectiveActiveFacet = hoverEnabled ? activeFacet : null;

  return (
    <>
      <FigLabel section="F" num={6} label="THE UNSEXY WORK" />

      <div className="slide-headline-row">
        <h1 className="slide-headline small">
          {highlight(C.headline, C.headlineKw)}
        </h1>
      </div>

      {/* LEFT — facet menu */}
      <FacetMenu
        items={C.facets}
        activeFacet={effectiveActiveFacet}
        onHover={setActiveFacet}
        showCards={showCards}
        header={C.header}
        footer={C.footer}
        footerKw={C.footerKw}
        showFooter={showFooter}
      />

      {/* RIGHT — detail canvas */}
      <div
        data-testid="f6-right-pane"
        style={{
          position: "absolute",
          right: 48,
          top: 156,
          width: 660,
          bottom: 80,
        }}
      >
        {/* Wrap the canvas in a Reveal so the whole pane animates with the
            slide. The brightness / assembly are handled inside the canvas. */}
        <Reveal on={showCards} style={{ position: "absolute", inset: 0 }}>
          <DetailCanvas
            activeFacet={effectiveActiveFacet}
            defaultState={
              <ThreeHooksCanvas bright={bright} assemble={assemble} />
            }
            states={{
              "what-it-is": <WhatItIsCanvas />,
              "lifecycle-events": <LifecycleCanvas />,
              // THREE HOOKS hover === default state; mapping it explicitly
              // lets the canvas treat the hover as a no-swap (falls through
              // to default since the key isn't in states OR we can mirror).
              // We intentionally OMIT "three-hooks" key so the default
              // state stays visible when that facet is hovered (per spec
              // §9.4 — default and THREE HOOKS hover are the same).
              example: <ExampleCanvas />,
            }}
          />
        </Reveal>
      </div>
    </>
  );
}

// ───────────────────── slide def ─────────────────────

export const f6Slide: SlideDef = {
  steps: 6,
  canonicalPose: 4,
  animationMode: "step-reveal",
  surface: "dark",
  section: "F",
  render: () => <F6HooksUnsexyWork />,
};
