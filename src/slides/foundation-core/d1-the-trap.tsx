// D.1 — THE TRAP
//
// Ported from `claude-design-section-d/jsx/slides-d.jsx:143-257`.
// 3 steps: 0=stat full-bleed center, 1=stat shrinks into header +
// mechanism/bars/AutomationLoop, 2=prescription block at the bottom.
// canonicalPose = 2.
//
// Layout uses absolute coordinates against the 1280×720 stage (see
// src/deck/Slide.tsx + globals.css `.stage-wrap`). The design source is the
// spec for pixel positions — do not refactor into Tailwind utilities.
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { highlight as KW } from "@/components/highlight";
import { CountUp } from "./components/CountUp";
import { AmpBar } from "./components/AmpBar";
import { AutomationLoop } from "./components/AutomationLoop";
import { Reveal, CopperRule } from "../foundation-core-section-e/components/Reveal";
import { d1Content as D1 } from "./content";

export function D1TheTrap() {
  const { stepIndex } = useDeck();
  const showStat = stepIndex >= 0;
  const showBody = stepIndex >= 1;
  const showRx = stepIndex >= 2;

  return (
    <>
      <FigLabel section="D" num={1} label="THE TRAP" />

      {/* The big stat — full-bleed at step 0; shrinks into header style at step 1+ */}
      <div
        style={{
          position: "absolute",
          left: 48,
          right: 48,
          top: showBody ? 76 : 130,
          transition: "top 0.7s var(--ease)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: showBody ? 16 : 24,
            justifyContent: showBody ? "flex-start" : "center",
            flexWrap: "wrap",
          }}
        >
          <h1
            style={{
              margin: 0,
              fontFamily: "var(--display)",
              fontWeight: 400,
              lineHeight: showBody ? 1.05 : 0.9,
              letterSpacing: showBody ? "-0.01em" : "normal",
              fontSize: showBody ? 40 : 200,
              transition:
                "font-size 0.7s var(--ease), line-height 0.7s var(--ease), letter-spacing 0.7s var(--ease)",
              display: "inline-flex",
              alignItems: "baseline",
              color: "var(--copper-700)",
            }}
          >
            <CountUp
              from={0}
              to={D1.beat1.statValue}
              durationMs={1500}
              testId="d1-stat-counter"
            />
            <span
              style={{
                fontSize: showBody ? "1em" : "0.55em",
                marginLeft: showBody ? "0.02em" : "0.05em",
                color: "var(--copper-300)",
                transition: "font-size 0.7s var(--ease)",
              }}
            >
              {D1.beat1.statSuffix}
            </span>
          </h1>
          <p
            style={{
              margin: 0,
              fontFamily: showBody ? "var(--display)" : "var(--serif)",
              fontWeight: 400,
              color: showBody ? "var(--neutral-50)" : "var(--neutral-100)",
              fontSize: showBody ? 40 : 32,
              lineHeight: showBody ? 1.05 : 1.25,
              letterSpacing: showBody ? "-0.01em" : "normal",
              transition:
                "font-size 0.7s var(--ease), line-height 0.7s var(--ease), color 0.7s var(--ease), font-family 0s 0.35s",
              maxWidth: 720,
            }}
          >
            {KW(D1.beat1.subLine, D1.beat1.subLineKw)}
          </p>
        </div>
        {!showBody && (
          <Reveal
            on={showStat}
            delay={1700}
            style={{ textAlign: "center", marginTop: 28 }}
          >
            <p
              style={{
                fontFamily: "var(--mono)",
                fontSize: 12,
                letterSpacing: "0.18em",
                color: "var(--neutral-500)",
                textTransform: "uppercase",
                margin: 0,
              }}
            >
              {D1.beat1.caption}
            </p>
          </Reveal>
        )}
      </div>

      {/* Body — 50:50 split. Left = text/bars/caption + prescription. Right = looping automation. */}
      <div
        style={{
          position: "absolute",
          left: 48,
          right: 48,
          top: 156,
          bottom: 80,
          display: "flex",
          gap: 48,
          opacity: showBody ? 1 : 0,
          transition: "opacity 0.5s var(--ease) 0.4s",
          pointerEvents: showBody ? "auto" : "none",
        }}
      >
        {/* LEFT */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            minWidth: 0,
          }}
        >
          <Reveal on={showBody}>
            <h2
              style={{
                fontFamily: "var(--display)",
                fontWeight: 400,
                fontSize: 36,
                color: "var(--neutral-50)",
                margin: 0,
                lineHeight: 1.15,
              }}
            >
              {KW(D1.beat2.mechanism, D1.beat2.mechanismKw)}
            </h2>
          </Reveal>
          <div style={{ height: 14 }} />
          <CopperRule on={showBody} delay={250} width="32%" />
          <div style={{ height: 22 }} />

          {/* Bars */}
          <Reveal
            on={showBody}
            delay={400}
            style={{ display: "flex", flexDirection: "column", gap: 16 }}
          >
            <AmpBar
              label={D1.beat2.manualLabel}
              value={D1.beat2.manualValue}
              widthPct={1.5}
              on={showBody}
              delay={500}
              accent="copper-700"
            />
            <AmpBar
              label={D1.beat2.machineLabel}
              value={D1.beat2.machineValue}
              widthPct={140}
              on={showBody}
              delay={1100}
              accent="copper-300"
              tall
            />
          </Reveal>

          <Reveal on={showBody} delay={1300} style={{ marginTop: 18 }}>
            <p
              style={{
                fontFamily: "var(--serif)",
                fontStyle: "italic",
                fontSize: 15,
                color: "var(--neutral-400)",
                margin: 0,
              }}
            >
              {KW(D1.beat2.caption, D1.beat2.captionKw)}
            </p>
          </Reveal>

          {/* Prescription */}
          <Reveal
            on={showRx}
            delay={150}
            style={{
              marginTop: "auto",
              paddingTop: 24,
              borderTop: "1px solid var(--copper-800)",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--display)",
                fontWeight: 400,
                fontSize: 32,
                color: "var(--copper-200)",
                margin: 0,
                lineHeight: 1.1,
              }}
            >
              {KW(D1.beat3.prescription, D1.beat3.prescriptionKw)}
            </h2>
            <p
              style={{
                fontFamily: "var(--serif)",
                fontStyle: "italic",
                fontSize: 16,
                color: "var(--neutral-300)",
                margin: "6px 0 0 0",
              }}
            >
              {KW(D1.beat3.sub, D1.beat3.subKw)}
            </p>
          </Reveal>
        </div>

        {/* RIGHT — looping automation animation */}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minWidth: 0,
          }}
        >
          <AutomationLoop on={showBody} />
        </div>
      </div>
    </>
  );
}

export const d1Slide: SlideDef = {
  steps: 3,
  canonicalPose: 2,
  animationMode: "step-reveal",
  surface: "dark",
  section: "D",
  render: () => <D1TheTrap />,
};
