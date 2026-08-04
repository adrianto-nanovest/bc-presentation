// PROTOTYPE gh#19b — throwaway. Delete from main once the form is signed off.
//
// ─────────────────────────────────────────────────────────────────────────────
// WHAT THIS IS
//
// A clean-sheet rebuild of E.12, sourced entirely from the Panaversity
// "Loop Engineering: A Crash Course" doc. One candidate, not a variant
// bracket (owner call, 2026-08-03). It shares nothing with proto19's
// spiral-to-ring figure: the form here is the course's own three moves —
//
//   step 0  THE MINDSET SHIFT. A diptych: prompting turn-by-turn (an endless
//           relay that visibly cannot run without you) against looping (a
//           system you design once — heartbeat, four stations, spine, one
//           human gate). Cherny and Steinberger below, who renamed the job.
//   step 1  THE BIG LOOP, four parts on a left rail — HEARTBEAT · ONE BEAT ·
//           CHECKER · SPINE — with a return arc ("tomorrow's beat starts by
//           reading the spine"). Hovering a part MAGNIFIES it on the right
//           canvas: the four heartbeats, the agent runtime inside one beat,
//           the checker ladder, the spine's memory-between-runs. Idle shows
//           ONE BEAT (the "two loops, one name" panel). Un-hover releases;
//           click pins.
//   step 2  THE WORKED EXAMPLE. The rail stays; the canvas becomes the
//           morning-triage loop, one beat, end to end. Hovering a rail part
//           now LIGHTS the flow stages that part owns. The recap footnote
//           lands bottom-left, display weight.
//
// RULES: no qualifier line · hint icon beside the left heading · kw on every
// serif chunk, never on mono · CSS vars only · rank is colour tier, never
// opacity · reduced motion drops the ambient loops, keeps the poses.
//
// ─────────────────────────────────────────────────────────────────────────────
// RUN IT
//
//   npm run dev  →  http://localhost:5173/?dev=proto19b
//
//   Space / click   next step        Backspace / ↑ / ←   previous step
//   1–4             pin a part       0                   clear + step 0
//   \               replay the current step's entry
// ─────────────────────────────────────────────────────────────────────────────
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Activity, ClipboardCheck, Database, Pin, RotateCw } from "lucide-react";
import { DeckProvider, useDeck } from "@/deck/DeckContext";
import { Slide } from "@/deck/Slide";
import { FigLabel } from "@/components/FigLabel";
import { HintIcon } from "@/components/HintIcon";
import { highlight } from "@/components/highlight";
import { CopperRule, Reveal } from "@/slides/foundation-core-section-e/components/Reveal";
import { content, type PartId } from "./content";
import { Proto19bKeyframes, mono, serif } from "./ui";
import { Step0Mindset } from "./Step0Mindset";
import { PartPanel } from "./PartPanels";
import { TriagePanel } from "./TriagePanel";

const PART_ICONS: Record<PartId, typeof Activity> = {
  heartbeat: Activity,
  beat: RotateCw,
  checker: ClipboardCheck,
  spine: Database,
};

// ── rail geometry (stage coordinates, shared with the leader line) ──
const RAIL = { left: 48, top: 168, width: 356 };
const CARD = { h: 62, gap: 20, inset: 30 }; // inset leaves the return arc its gutter
const CARDS_TOP = RAIL.top + 16 + 10 + 1 + 14; // heading + rule + margins
const cardMidY = (i: number) => CARDS_TOP + i * (CARD.h + CARD.gap) + CARD.h / 2;

export function Proto19bRoute() {
  return (
    // steps: 3 — step 0 the shift, step 1 the anatomy, step 2 the worked example.
    <DeckProvider stepCounts={[3]}>
      <Proto19bKeyframes />
      <ProtoSlide />
    </DeckProvider>
  );
}

function ProtoSlide() {
  const { stepIndex, advance, retreat, goTo } = useDeck();
  const [hovered, setHovered] = useState<PartId | null>(null);
  const [pinned, setPinned] = useState<PartId | null>(null);
  const [replayKey, setReplayKey] = useState(0);

  // Un-hover releases; click pins. A lit panel left behind by a departed
  // pointer must mean "pinned", never "stale".
  const active = pinned ?? hovered;

  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches === true;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t?.tagName === "INPUT" || t?.tagName === "TEXTAREA" || t?.isContentEditable) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === " " || e.key === "Enter" || e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        advance();
      } else if (e.key === "Backspace" || e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        retreat();
      } else if (e.key === "\\") {
        e.preventDefault();
        setReplayKey((k) => k + 1);
      } else if (e.key === "0") {
        e.preventDefault();
        setPinned(null);
        setHovered(null);
        goTo(0, 0);
      } else if (/^[1-4]$/.test(e.key)) {
        e.preventDefault();
        setPinned(content.parts[Number(e.key) - 1].id);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [advance, retreat, goTo]);

  const activeIdx = active ? content.parts.findIndex((p) => p.id === active) : -1;

  return (
    <>
      {/* PROTOTYPE — publishes its own content's figure so its FigLabel keeps
          rendering off the number context (§3.5). Goes with this directory. */}
      <Slide
        index={0}
        animationMode="step-reveal"
        canonicalPose={2}
        surface="dark"
        letter={content.fig.section}
        num={content.fig.num}
        sectionKey="fundamentals"
      >
        <FigLabel label={content.fig.label} />

        <div className="slide-headline-row">
          <h1 className="slide-headline small">{highlight(content.headline, content.headlineKw)}</h1>
        </div>

        {stepIndex === 0 && <Step0Mindset key={`s0-${replayKey}`} reduced={reduced} />}

        {stepIndex >= 1 && (
          <Rail
            key={`rail-${replayKey}`}
            stepIndex={stepIndex}
            active={active}
            pinned={pinned}
            setHovered={setHovered}
            setPinned={setPinned}
          />
        )}

        {/* magnifier leader — the active card physically reaches the canvas */}
        {stepIndex >= 1 && activeIdx >= 0 && (
          <svg
            key={`leader-${active}`}
            width={30}
            height={530}
            style={{ position: "absolute", left: RAIL.left + RAIL.width, top: 156, pointerEvents: "none" }}
            aria-hidden
          >
            <path
              d={`M1,${cardMidY(activeIdx) - 156} H13 V9 H24`}
              fill="none"
              stroke="var(--copper-300)"
              strokeWidth={1.2}
              pathLength={1}
              className="p19b-draw"
              style={{ animationDuration: "0.4s" }}
            />
            <path d={`M20,5.4 L25.4,9 L20,12.6`} fill="none" stroke="var(--copper-300)" strokeWidth={1.4} />
          </svg>
        )}

        {stepIndex >= 1 && (
          <div
            data-testid="p19b-canvas"
            data-no-advance=""
            data-panel={stepIndex >= 2 ? "triage" : (active ?? "beat")}
            style={{ position: "absolute", left: 434, right: 48, top: 156, bottom: 34 }}
          >
            {stepIndex === 1 ? (
              <PartPanel key={`${active ?? "beat"}-${replayKey}`} id={active ?? "beat"} reduced={reduced} />
            ) : (
              <TriagePanel key={`triage-${replayKey}`} active={active} reduced={reduced} />
            )}
          </div>
        )}
      </Slide>

      <DevBar stepIndex={stepIndex} active={active} onReplay={() => setReplayKey((k) => k + 1)} />
    </>
  );
}

// ───────────────────────── the left rail ─────────────────────────

function Rail({
  stepIndex,
  active,
  pinned,
  setHovered,
  setPinned,
}: {
  stepIndex: number;
  active: PartId | null;
  pinned: PartId | null;
  setHovered: (id: PartId | null) => void;
  setPinned: (fn: (c: PartId | null) => PartId | null) => void;
}) {
  const railH = 4 * CARD.h + 3 * CARD.gap;
  return (
    <div
      data-testid="p19b-rail"
      data-no-advance=""
      style={{
        position: "absolute",
        left: RAIL.left,
        top: RAIL.top,
        width: RAIL.width,
        bottom: 30,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, height: 16 }}>
        <span style={mono(11, "var(--copper-300)", 0.22)}>{content.leftHeading}</span>
        <HintIcon text={content.hint} />
      </div>
      <div style={{ marginTop: 10 }}>
        <CopperRule on width={RAIL.width} />
      </div>

      <div style={{ position: "relative", marginTop: 14, height: railH, flex: "0 0 auto" }}>
        {/* the flow down, and the way back up: tomorrow reads the spine */}
        <svg width={RAIL.width} height={railH} style={{ position: "absolute", inset: 0, overflow: "visible", pointerEvents: "none" }} aria-hidden>
          <defs>
            <marker id="p19b-r-arr" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0,0.6 L7,4 L0,7.4" fill="none" stroke="var(--copper-500)" strokeWidth="1.4" />
            </marker>
          </defs>
          {[0, 1, 2].map((i) => (
            <line
              key={i}
              x1={CARD.inset + (RAIL.width - CARD.inset) / 2}
              y1={i * (CARD.h + CARD.gap) + CARD.h + 3}
              x2={CARD.inset + (RAIL.width - CARD.inset) / 2}
              y2={(i + 1) * (CARD.h + CARD.gap) - 4}
              stroke="var(--copper-500)"
              strokeWidth={1.2}
              markerEnd="url(#p19b-r-arr)"
            />
          ))}
          <path
            d={`M${CARD.inset},${3 * (CARD.h + CARD.gap) + CARD.h / 2} H10 V${CARD.h / 2} H${CARD.inset - 5}`}
            fill="none"
            stroke="var(--copper-500)"
            strokeWidth={1.2}
            strokeDasharray="4 5"
            markerEnd="url(#p19b-r-arr)"
            className="p19b-dash-slow"
            style={{ animationDuration: "2.2s" }}
          />
        </svg>

        {content.parts.map((p, i) => {
          const Icon = PART_ICONS[p.id];
          const on = active === p.id;
          const isPinned = pinned === p.id;
          return (
            <Reveal key={p.id} on delay={90 + i * 85}>
              <div
                data-testid={`p19b-card-${p.id}`}
                data-active={on ? "true" : "false"}
                onMouseEnter={() => setHovered(p.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => setPinned((c) => (c === p.id ? null : p.id))}
                style={{
                  position: "absolute",
                  left: CARD.inset,
                  top: i * (CARD.h + CARD.gap),
                  width: RAIL.width - CARD.inset,
                  height: CARD.h,
                  border: "1px solid",
                  borderColor: on ? "var(--copper-200)" : "var(--copper-800)",
                  background: on ? "var(--copper-950)" : "var(--neutral-900)",
                  display: "flex",
                  alignItems: "center",
                  gap: 13,
                  padding: "0 15px",
                  boxSizing: "border-box",
                  cursor: "pointer",
                  transition: "border-color 200ms var(--ease), background 200ms var(--ease)",
                }}
              >
                <span style={{ display: "flex", color: on ? "var(--copper-100)" : "var(--copper-400)", transition: "color 200ms var(--ease)" }}>
                  <Icon size={19} strokeWidth={1.7} />
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={mono(12, on ? "var(--copper-100)" : "var(--copper-200)", 0.2)}>{p.title}</div>
                  <div style={{ ...serif(12.5, on ? "var(--neutral-100)" : "var(--neutral-300)", true), marginTop: 3, whiteSpace: "nowrap", transition: "color 200ms var(--ease)" }}>
                    {highlight(p.desc, p.descKw)}
                  </div>
                </div>
                <span style={{ ...mono(10, on ? "var(--copper-300)" : "var(--copper-700)", 0.1), alignSelf: "flex-start", marginTop: 8 }}>
                  {isPinned ? <Pin size={10} style={{ display: "inline" }} /> : p.num}
                </span>
              </div>
            </Reveal>
          );
        })}
      </div>

      <Reveal on delay={430} style={{ marginTop: 12, paddingLeft: CARD.inset }}>
        <span style={serif(11.5, "var(--copper-300)", true)}>↺ {content.returnArc}</span>
      </Reveal>

      <div style={{ flex: 1 }} />

      {/* the whole course, one sentence — step 2's payoff owns this corner */}
      <Reveal on={stepIndex >= 2} delay={300}>
        <p
          data-testid="p19b-footnote"
          style={{ fontFamily: "var(--display)", fontSize: 23.5, lineHeight: 1.18, color: "var(--copper-100)", margin: 0 }}
        >
          {highlight(content.footnote, content.footnoteKw)}
        </p>
      </Reveal>
    </div>
  );
}

// ───────────────────────── dev bar ─────────────────────────
// Portalled to <body> so it escapes the stage scale and stays out of the
// 1280×720 frame. One design, so no variant cycling — status + replay only.

function DevBar({ stepIndex, active, onReplay }: { stepIndex: number; active: PartId | null; onReplay: () => void }) {
  if (!import.meta.env.DEV) return null;
  return createPortal(
    <div
      data-no-advance=""
      data-testid="p19b-switcher"
      style={{
        position: "fixed",
        left: "50%",
        bottom: 12,
        transform: "translateX(-50%)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "7px 14px",
        background: "var(--neutral-950)",
        border: "1px solid var(--copper-600)",
        boxShadow: "var(--shadow-base)",
        fontFamily: "var(--mono)",
        fontSize: 11,
        color: "var(--copper-100)",
        whiteSpace: "nowrap",
      }}
    >
      <span style={{ color: "var(--copper-300)" }}>proto19b</span>
      <span style={{ color: "var(--copper-700)" }}>|</span>
      <span>
        step {stepIndex} · {active ?? "idle"}
      </span>
      <span style={{ color: "var(--copper-700)" }}>|</span>
      <button
        onClick={onReplay}
        style={{
          background: "transparent",
          border: "1px solid var(--copper-700)",
          color: "var(--copper-200)",
          fontFamily: "var(--mono)",
          fontSize: 11,
          padding: "3px 8px",
          cursor: "pointer",
        }}
      >
        replay ⟲
      </button>
      <span style={{ color: "var(--copper-500)", fontSize: 10 }}>space → · bksp ← · 1–4 pin · 0 clear · \ replay</span>
    </div>,
    document.body,
  );
}
