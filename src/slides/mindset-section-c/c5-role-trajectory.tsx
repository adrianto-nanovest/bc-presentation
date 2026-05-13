// C.5 — ROLE → TRAJECTORY (canonical dark surface · Hook 2 detonator)
//
// Section C closer. Lifts "I have a new role" → "I have a new trajectory" by
// mirroring C.1's strikethrough idiom (now on `role`) and planting the Hook 2
// seed `where you are` with an italic-copper-400 highlight. (Per Task 27 v3
// rework: prior ambient pulse removed; KW highlight is the sole emphasis.)
//
// Per spec §3.5 (rev. v3): standard dark + dot-grid surface (no hero photo),
// canonical FigLabel + .slide-headline.small header, E9-derived two-pane
// layout. The LEFT pane carries the 4 trajectory beats as a CARD STACK under
// a "WHY NOW" section title. The RIGHT pane carries the strikethrough
// declaration, italic clarifier, 60% copper rule, and a SMALL closing line —
// stacked compactly top-to-bottom (no flex spacer) and vertically centered
// inside the right pane envelope so it sits centered against the left card
// stack.
//
// Layout —
//   FIG label + slide title at top-left (canonical).
//   LEFT pane (left:48 top:156 width:500 bottom:80):
//     "WHY NOW" mono caps + 40% copper-700 rule + 4 stacked beat cards.
//   RIGHT pane (right:48 top:156 width:540 bottom:80), vertically centered:
//     72px display "It's not a role you take." (strikethrough on `role`)
//     ~18px gap
//     44px italic copper-400 "It's a trajectory you build."
//     ~18px gap
//     60% copper-700 rule
//     ~18px gap
//     22px italic closing line w/ italic-copper-400 KW on `where you are`.
//
// Motion (2 steps; canonicalPose: 1) —
//   load (stepIndex 0 = user's "step 1"): FIG label + slide title shown
//                        instantly (no fade, matches C.1/C.2 header behavior).
//                        LEFT "WHY NOW" + 40% rule fade in immediately, then
//                        the 4 LEFT beat cards stagger-fade (130ms apart →
//                        520ms span) on mount so they're all visible the first
//                        time the slide is shown.
//   stepIndex 1 (canon = user's "step 2"): RIGHT pane reveals with internal
//                        stagger (~1.7s total):
//                          T+200ms:  RIGHT bigHeadline reveals
//                          T+600ms:  copper-700 strikethrough draws on `role`
//                                    (400ms easeOutExpo)
//                          T+1100ms: italic copper-400 clarifier reveals
//                          T+1500ms: 60% copper-700 rule draws
//                          T+1700ms: closing line reveals (italic 22px)
//
// Hover (presenter detail layer) — each card highlights its copper border
// and scales 1.02 on hover to feel tactile.
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { StrikethroughAnimator } from "@/components/StrikethroughAnimator";
import { highlight as KW } from "@/components/highlight";
import { Reveal, CopperRule } from "../foundation-core-section-e/components/Reveal";
import C5TwoPaneLayout from "./components/C5TwoPaneLayout";
import {
  CompetitiveAnim,
  CapacityAnim,
  CulturalAnim,
  PersonalAnim,
} from "./components/C5CardAnims";
import { c5Content as C } from "./content";

// Map beat label → anim component. Order matches `c5Content.beats`.
const BEAT_ANIMS: Record<string, () => ReactNode> = {
  COMPETITIVE: CompetitiveAnim,
  CAPACITY: CapacityAnim,
  CULTURAL: CulturalAnim,
  PERSONAL: PersonalAnim,
};

// Internal stagger timings (ms from stepIndex 1 entry).
const T_BIGHEADLINE = 200;
const T_STRIKE = 600;
const T_CLARIFIER = 1100;
const T_RULE = 1500;
const T_CLOSING = 1700;

// ───────────────────── slide ─────────────────────

export function C5RoleTrajectory() {
  const { stepIndex } = useDeck();

  // Mount-driven load: LEFT "WHY NOW" + 40% rule + the 4 LEFT beat cards all
  // reveal on the first viewing of the slide. The cards use staggered delays
  // (i * 130ms) inside <Reveal>, gated by a single mount flag.
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = window.setTimeout(() => setLoaded(true), 80);
    return () => window.clearTimeout(t);
  }, []);

  // Step gates.
  // LEFT side (header + cards) is mount-driven so it appears on stepIndex 0
  // (user's "step 1"). RIGHT pane stays gated on stepIndex 1 (user's "step 2").
  const showLeftHeader = loaded;
  const beatsOn = loaded;

  // stepIndex 1 has internal timing: all RIGHT pane elements chain off stepIndex >= 1.
  const [bigHeadlineOn, setBigHeadlineOn] = useState(false);
  const [strikeOn, setStrikeOn] = useState(false);
  const [clarifierOn, setClarifierOn] = useState(false);
  const [ruleOn, setRuleOn] = useState(false);
  const [closingOn, setClosingOn] = useState(false);

  useEffect(() => {
    const timers: number[] = [];
    if (stepIndex >= 1) {
      timers.push(window.setTimeout(() => setBigHeadlineOn(true), T_BIGHEADLINE));
      timers.push(window.setTimeout(() => setStrikeOn(true), T_STRIKE));
      timers.push(window.setTimeout(() => setClarifierOn(true), T_CLARIFIER));
      timers.push(window.setTimeout(() => setRuleOn(true), T_RULE));
      timers.push(window.setTimeout(() => setClosingOn(true), T_CLOSING));
    } else {
      setBigHeadlineOn(false);
      setStrikeOn(false);
      setClarifierOn(false);
      setRuleOn(false);
      setClosingOn(false);
    }
    return () => {
      for (const t of timers) window.clearTimeout(t);
    };
  }, [stepIndex]);

  return (
    <div
      data-testid="slide-c5"
      style={{ position: "absolute", inset: 0, overflow: "hidden" }}
    >
      {/* FIG label — canonical top-left position, via shared component.
          Renders instantly with no opacity gate (matches C.1/C.2). */}
      <FigLabel section="C" num={5} label={C.figLabel} />

      {/* Slide title — canonical .slide-headline.small at top:80 left:48.
          Renders instantly with no opacity gate (matches C.1/C.2). */}
      <div className="slide-headline-row">
        <h1 className="slide-headline small">{KW(C.headline, C.headlineKw)}</h1>
      </div>

      <C5TwoPaneLayout
        left={<LeftPaneContent showHeader={showLeftHeader} beatsOn={beatsOn} />}
        right={
          <RightPaneContent
            bigHeadlineOn={bigHeadlineOn}
            strikeOn={strikeOn}
            clarifierOn={clarifierOn}
            ruleOn={ruleOn}
            closingOn={closingOn}
          />
        }
      />
    </div>
  );
}

// ───────────────────── LEFT pane ─────────────────────

interface LeftPaneContentProps {
  showHeader: boolean;
  beatsOn: boolean;
}

function LeftPaneContent({ showHeader, beatsOn }: LeftPaneContentProps) {
  return (
    <>
      <Reveal on={showHeader} data-testid="c5-why-now">
        <span
          style={{
            fontFamily: "var(--mono)",
            fontSize: 11,
            letterSpacing: "0.22em",
            color: "var(--copper-300)",
            textTransform: "uppercase",
          }}
        >
          WHY NOW
        </span>
      </Reveal>

      <div style={{ height: 10 }} />
      <CopperRule on={showHeader} width="40%" delay={120} />
      <div style={{ height: 16 }} />

      <div
        data-testid="c5-beats"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        {C.beats.map((beat, i) => {
          const Anim = BEAT_ANIMS[beat.label];
          return (
            <Reveal
              key={beat.label}
              on={beatsOn}
              delay={i * 130}
              data-testid={`c5-beat-${beat.label.toLowerCase()}`}
            >
              <BeatCard
                label={beat.label}
                caption={beat.caption}
                captionKw={beat.captionKw}
                anim={Anim ? <Anim /> : null}
              />
            </Reveal>
          );
        })}
      </div>
    </>
  );
}

// ───────────────────── RIGHT pane ─────────────────────

interface RightPaneContentProps {
  bigHeadlineOn: boolean;
  strikeOn: boolean;
  clarifierOn: boolean;
  ruleOn: boolean;
  closingOn: boolean;
}

function RightPaneContent({
  bigHeadlineOn,
  strikeOn,
  clarifierOn,
  ruleOn,
  closingOn,
}: RightPaneContentProps) {
  // Vertically centered content wrapper — uses margin:auto inside the
  // flex-column pane so the entire stack centers between the pane's
  // top:156 and bottom:80, lining up against the LEFT card stack mid-line.
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        margin: "auto 0",
      }}
    >
      {/* Big headline — "It's not a role you take." (72px, strikethrough on `role`). */}
      <Reveal on={bigHeadlineOn} data-testid="c5-bigheadline">
        <h2
          style={{
            fontFamily: "var(--display)",
            fontWeight: 400,
            fontSize: 72,
            lineHeight: 1.0,
            letterSpacing: "-0.01em",
            color: "var(--neutral-50)",
            margin: 0,
          }}
        >
          {renderBigHeadline(C.bigHeadline, C.strikethroughWord, strikeOn)}
        </h2>
      </Reveal>

      <div style={{ height: 18 }} />

      {/* Clarifier — "It's a trajectory you build." (44px italic copper-400). */}
      <Reveal on={clarifierOn} data-testid="c5-clarifier">
        <p
          style={{
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontSize: 44,
            color: "var(--copper-400)",
            margin: 0,
            lineHeight: 1.1,
            fontWeight: 400,
          }}
        >
          {C.clarifier}
        </p>
      </Reveal>

      <div style={{ height: 18 }} />

      {/* 60% copper-700 rule. */}
      <CopperRule on={ruleOn} width="60%" />

      <div style={{ height: 18 }} />

      {/* Closing line — italic 22px with italic-copper-400 KW on `where you are`.
          NO ambient pulse (removed per v3). KW highlight is the only emphasis. */}
      <Reveal on={closingOn} data-testid="c5-closing">
        <p
          style={{
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontSize: 22,
            color: "var(--neutral-100)",
            margin: 0,
            lineHeight: 1.3,
            fontWeight: 400,
          }}
        >
          {KW(C.closing, C.closingKw)}
        </p>
      </Reveal>
    </div>
  );
}

// ───────────────────── helpers ─────────────────────

// Big headline with strikethrough on `role`. Match is whitespace-aware so
// trailing punctuation isn't struck.
function renderBigHeadline(text: string, word: string, active: boolean): ReactNode {
  const idx = text.indexOf(word);
  if (idx === -1) return text;
  const before = text.slice(0, idx);
  const after = text.slice(idx + word.length);
  return (
    <>
      {before}
      <StrikethroughAnimator active={active} duration={400} thickness={4}>
        {word}
      </StrikethroughAnimator>
      {after}
    </>
  );
}

// ───────────────────── beat card ─────────────────────

interface BeatCardProps {
  label: string;
  caption: string;
  captionKw: readonly string[];
  anim: ReactNode;
}

// One card: horizontal flex row, ~80px tall, 1px copper-800 border, 12×14
// padding. Left side (~70% width): mono-caps label + Source Serif caption
// with italic-copper highlight on keyword. Right side (~30% fixed at 90×56):
// the matching anim component. Hover: copper-300 border + scale 1.02.
function BeatCard({ label, caption, captionKw, anim }: BeatCardProps) {
  const [hover, setHover] = useState(false);
  const captionNode: ReactNode = captionKw.length
    ? KW(caption, captionKw)
    : caption;

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        minHeight: 80,
        padding: "12px 14px",
        border: `1px solid ${hover ? "var(--copper-300)" : "var(--copper-800)"}`,
        background: "transparent",
        transform: hover ? "scale(1.02)" : "scale(1)",
        transformOrigin: "left center",
        transition:
          "border-color 200ms var(--ease), transform 200ms var(--ease)",
        willChange: "transform",
      }}
    >
      {/* LEFT: label + caption (~70% width). */}
      <div
        style={{
          flex: "1 1 70%",
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
          gap: 4,
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
          {label}
        </span>
        <span
          style={{
            fontFamily: "var(--serif)",
            fontSize: 15,
            color: "var(--neutral-300)",
            lineHeight: 1.4,
          }}
        >
          {captionNode}
        </span>
      </div>

      {/* RIGHT: 90×56 anim slot. */}
      <div
        aria-hidden
        style={{
          flex: "0 0 90px",
          width: 90,
          height: 56,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {anim}
      </div>
    </div>
  );
}

// ───────────────────── slide def ─────────────────────

export const c5Slide: SlideDef = {
  steps: 2,
  canonicalPose: 1,
  animationMode: "step-reveal",
  surface: "dark",
  section: "C",
  render: () => <C5RoleTrajectory />,
};
