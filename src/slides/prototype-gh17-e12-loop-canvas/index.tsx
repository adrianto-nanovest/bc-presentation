// PROTOTYPE — throwaway (gh#17). Delete from main once a variant wins.
//
// ─────────────────────────────────────────────────────────────────────────────
// THE QUESTION
//
// Can the E.12 loop canvas be built so it reads at projection distance and is
// paced entirely by hover? The slide skeleton is FIXED by #10 — this prototype
// changes nothing about layout, copy or step count. Left column is a stub.
// Only the right-hand canvas is in scope.
//
// Three variants, and they disagree about exactly one thing — the issue's open
// question 2, "can BUDGET overlay the same ring, or does it need a second
// figure?". BUDGET is the only row that needs a comparison rather than a
// highlight, so it is the only real structural fork on the canvas:
//
//   A — OVERLAY   concentric dashed ghost twin, always faintly present.
//                 Apparatus permanently on canvas, dim. Nothing ever moves.
//   B — TWIN      a genuine second figure: ring shrinks + slides left, an
//                 uncapped twin draws beside it, meters between them.
//   C — GAUGE     nothing is duplicated. Spend is an arc gauge wrapped around
//                 the ring with a cap tick. Apparatus is hidden until hovered
//                 and docks in place.
//
// A vs C therefore also settles "must the canvas show everything at once".
//
// Open questions 1 and 3 are SCALARS, not structures, so they are switcher
// CONTROLS rather than variants — that way each can be judged against all
// three figures instead of being baked one-per-variant:
//   Q1 fold timing      → entry-duration slider (1000–4000ms) + replay
//   Q3 un-hover → idle? → hold/release toggle
// Q4 (legibility at 1280×720) is answered by the host: this renders inside the
// real <Slide> stage, so it is the real projector geometry, not a mock.
//
// ─────────────────────────────────────────────────────────────────────────────
// RUN IT
//
//   npm run dev  →  http://localhost:5173/?dev=proto17
//
//   ← →            cycle variant           Space / click   next step
//   1–5            force a row (as if hovered)             Backspace  prev step
//   \              replay the entry sequence
//   h              toggle un-hover behaviour (release / hold last)
//   0              clear the forced row
//
// State is in the URL (`?dev=proto17&v=…&fold=…&hold=…`) so any frame is
// shareable and reload-stable.
// ─────────────────────────────────────────────────────────────────────────────
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { DeckProvider, useDeck } from "@/deck/DeckContext";
import { Slide } from "@/deck/Slide";
import { FigLabel } from "@/components/FigLabel";
import { HintIcon } from "@/components/HintIcon";
import { CopperRule, Reveal } from "@/slides/foundation-core-section-e/components/Reveal";
import { LucideIcon } from "@/slides/foundation-core-section-e/components/LucideIcon";
import { LoopCanvas, type LoopRow, type VariantKey } from "./LoopCanvas";

// ───────────────────────── content (fixed by #10 / #17) ─────────────────────────

const HEADLINE = "The loop: stop doing the turns.";
const TAGLINE = "Done is a check, not an opinion.";

interface RowDef {
  id: LoopRow;
  title: string;
  essence: string;
  icon: string;
  caption: string;
  chips: string[];
}

const ROWS: RowDef[] = [
  {
    id: "trigger",
    title: "Trigger",
    essence: "what starts it, not you",
    icon: "Calendar",
    caption: "Every Friday, 4 PM. Nobody presses start.",
    chips: ["schedule", "event", "queue"],
  },
  {
    id: "memory",
    title: "Memory",
    essence: "state outside the chat",
    icon: "FileText",
    caption: "The chat forgets. The file doesn't.",
    chips: ["state", "anti-repetition", "profile"],
  },
  {
    id: "condition",
    title: "Condition",
    essence: "countable, not taste",
    icon: "ListChecks",
    caption: "“Every client got an update” — checkable. “Is it good” — not.",
    chips: [],
  },
  {
    id: "budget",
    title: "Budget",
    essence: "closed loop, capped",
    icon: "Scale",
    caption:
      "A closed loop with an unsatisfiable condition is an open loop, on a schedule, unattended.",
    chips: [],
  },
  {
    id: "gate",
    title: "Gate",
    essence: "where a person signs",
    icon: "Users",
    caption: "Output goes to a person → a person signs.",
    chips: [],
  },
];

const VARIANTS: Record<VariantKey, string> = {
  A: "Overlay — ghost twin on the same ring",
  B: "Twin — second figure, ring moves",
  C: "Gauge — spend on the ring, nothing duplicated",
};
const VARIANT_KEYS: VariantKey[] = ["A", "B", "C"];

// ───────────────────────── URL state ─────────────────────────

interface ProtoState {
  variant: VariantKey;
  fold: number;
  /** true = un-hovering holds the last state; false = returns to the idle ring. */
  hold: boolean;
}

function readUrl(): ProtoState {
  const p = new URLSearchParams(window.location.search);
  const v = p.get("v")?.toUpperCase();
  const variant = VARIANT_KEYS.includes(v as VariantKey) ? (v as VariantKey) : "A";
  const fold = Math.max(1000, Math.min(4000, Number(p.get("fold")) || 2400));
  return { variant, fold, hold: p.get("hold") === "1" };
}

function writeUrl(s: ProtoState) {
  const p = new URLSearchParams(window.location.search);
  p.set("dev", "proto17");
  p.set("v", s.variant);
  p.set("fold", String(s.fold));
  p.set("hold", s.hold ? "1" : "0");
  window.history.replaceState(null, "", `?${p.toString()}`);
}

// ───────────────────────── route ─────────────────────────

export function Proto17Route() {
  const [state, setState] = useState<ProtoState>(readUrl);
  useEffect(() => writeUrl(state), [state]);

  return (
    // steps: 2 — the real budget from #10. Judging (c) "does it hold at
    // steps: 2" needs the real step machine, not a boolean.
    <DeckProvider stepCounts={[2]}>
      <ProtoSlide state={state} setState={setState} />
    </DeckProvider>
  );
}

function ProtoSlide({
  state,
  setState,
}: {
  state: ProtoState;
  setState: (fn: (s: ProtoState) => ProtoState) => void;
}) {
  const { stepIndex, advance, retreat, goTo } = useDeck();
  const [replayKey, setReplayKey] = useState(0);
  const [hovered, setHovered] = useState<LoopRow | null>(null);
  const [pinned, setPinned] = useState<LoopRow | null>(null);
  // Q3's "hold last" needs somewhere to remember what was last hovered.
  const lastHovered = useRef<LoopRow | null>(null);
  if (hovered) lastHovered.current = hovered;

  const active = pinned ?? hovered ?? (state.hold ? lastHovered.current : null);
  const allLit = stepIndex >= 1;

  const cycleVariant = useCallback(
    (d: number) =>
      setState((s) => {
        const i = VARIANT_KEYS.indexOf(s.variant);
        const next = VARIANT_KEYS[(i + d + VARIANT_KEYS.length) % VARIANT_KEYS.length];
        return { ...s, variant: next };
      }),
    [setState],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t?.tagName === "INPUT" || t?.tagName === "TEXTAREA" || t?.isContentEditable) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === "ArrowRight") { e.preventDefault(); cycleVariant(1); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); cycleVariant(-1); }
      else if (e.key === " " || e.key === "Enter" || e.key === "ArrowDown") { e.preventDefault(); advance(); }
      else if (e.key === "Backspace" || e.key === "ArrowUp") { e.preventDefault(); retreat(); }
      else if (e.key === "\\") { e.preventDefault(); setReplayKey((k) => k + 1); }
      else if (e.key === "h") { e.preventDefault(); setState((s) => ({ ...s, hold: !s.hold })); }
      else if (e.key === "0") { e.preventDefault(); setPinned(null); lastHovered.current = null; goTo(0, 0); }
      else if (/^[1-5]$/.test(e.key)) {
        e.preventDefault();
        setPinned(ROWS[Number(e.key) - 1].id);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [advance, retreat, goTo, cycleVariant, setState]);

  // Replaying the entry sequence when the variant changes keeps the three
  // comparable — you always see each one from the same cold start.
  useEffect(() => setReplayKey((k) => k + 1), [state.variant, state.fold]);

  const caption = active ? ROWS.find((r) => r.id === active)! : null;

  return (
    <>
      <Slide index={0} animationMode="step-reveal" canonicalPose={1} surface="dark" section="E">
        <FigLabel section="E" num={12} label="THE LOOP" />

        <div className="slide-headline-row">
          <h1 className="slide-headline small">{HEADLINE}</h1>
        </div>

        {/* ── LEFT — STUB. Not in scope (gh#17): five rows, E.9's hover/pin
            grammar, so the canvas is paced the way the real slide will be. ── */}
        <div
          data-testid="proto17-left"
          data-no-advance=""
          style={{
            position: "absolute", left: 48, top: 156, width: 480, bottom: 80,
            display: "flex", flexDirection: "column",
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
            <div style={{ width: "fit-content" }}>
              <span style={{
                fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.22em",
                color: "var(--copper-300)", textTransform: "uppercase",
              }}>
                Five decisions
              </span>
              <div style={{ marginTop: 12 }}><CopperRule on width="100%" /></div>
            </div>
            <HintIcon />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 16 }}>
            {ROWS.map((r, i) => {
              const isHover = hovered === r.id;
              const isPinned = pinned === r.id;
              const isOn = allLit || isHover || isPinned;
              return (
                <Reveal key={r.id} on delay={100 + i * 80}>
                  <div
                    data-testid={`proto17-row-${r.id}`}
                    data-active={isOn ? "true" : "false"}
                    onMouseEnter={() => setHovered(r.id)}
                    onMouseLeave={() => setHovered(null)}
                    onClick={() => setPinned((c) => (c === r.id ? null : r.id))}
                    style={{
                      position: "relative", display: "flex", alignItems: "flex-start",
                      gap: 12, padding: "9px 12px", border: "1px solid",
                      borderColor: isOn ? "var(--copper-200)" : "var(--copper-800)",
                      background: isHover ? "var(--copper-950)" : "transparent",
                      cursor: "pointer",
                      transition: "border-color 0.2s var(--ease), background 0.2s var(--ease)",
                    }}
                  >
                    {isPinned && (
                      <div style={{ position: "absolute", top: 6, right: 8, color: "var(--copper-200)", display: "flex" }}>
                        <LucideIcon name="Pin" size={11} color="currentColor" />
                      </div>
                    )}
                    <div style={{ marginTop: 2 }}>
                      <LucideIcon name={r.icon} size={19} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontFamily: "var(--mono)", fontSize: 12, letterSpacing: "0.18em",
                        color: "var(--copper-100)", textTransform: "uppercase",
                      }}>
                        {r.title}
                      </div>
                      <div style={{
                        fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 13,
                        color: "var(--neutral-300)", marginTop: 3,
                      }}>
                        {r.essence}
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <div style={{ flex: 1 }} />

          <Reveal on={allLit}>
            <p style={{
              fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 16,
              color: "var(--copper-200)", margin: 0, lineHeight: 1.4,
            }}>
              {TAGLINE}
            </p>
          </Reveal>
        </div>

        {/* ── RIGHT — the canvas under test. One persistent figure. ── */}
        <div
          data-testid="proto17-right"
          data-no-advance=""
          style={{
            position: "absolute", right: 48, top: 150, width: 660, bottom: 76,
            display: "flex", flexDirection: "column", alignItems: "center",
          }}
        >
          <LoopCanvas
            variant={state.variant}
            active={active}
            allLit={allLit}
            entryMs={state.fold}
            replayKey={replayKey}
          />

          <div
            data-testid="proto17-caption"
            style={{ width: "100%", minHeight: 54, marginTop: 2, textAlign: "center" }}
          >
            {caption && (
              <div key={caption.id} className="fade on">
                <p style={{
                  fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 17,
                  color: "var(--copper-100)", margin: 0, lineHeight: 1.35,
                }}>
                  {caption.caption}
                </p>
                {caption.chips.length > 0 && (
                  <div style={{ display: "flex", gap: 14, justifyContent: "center", marginTop: 7 }}>
                    {caption.chips.map((c) => (
                      <span key={c} style={{
                        fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.18em",
                        color: "var(--copper-300)", textTransform: "uppercase",
                      }}>
                        {c}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </Slide>

      <SwitcherBar
        state={state}
        setState={setState}
        stepIndex={stepIndex}
        active={active}
        onReplay={() => setReplayKey((k) => k + 1)}
      />
    </>
  );
}

// ───────────────────────── floating switcher ─────────────────────────
// Portalled to <body> so it escapes the stage's scale transform — it must be
// obviously NOT part of the design being judged, and it must stay out of the
// 1280×720 frame when screenshotting.

function SwitcherBar({
  state, setState, stepIndex, active, onReplay,
}: {
  state: ProtoState;
  setState: (fn: (s: ProtoState) => ProtoState) => void;
  stepIndex: number;
  active: LoopRow | null;
  onReplay: () => void;
}) {
  if (!import.meta.env.DEV) return null;

  const cycle = (d: number) =>
    setState((s) => {
      const i = VARIANT_KEYS.indexOf(s.variant);
      return { ...s, variant: VARIANT_KEYS[(i + d + 3) % 3] };
    });

  const btn: React.CSSProperties = {
    background: "transparent", border: "1px solid var(--copper-700)",
    color: "var(--copper-200)", fontFamily: "var(--mono)", fontSize: 12,
    padding: "3px 9px", cursor: "pointer",
  };

  return createPortal(
    <div
      data-no-advance=""
      data-testid="proto17-switcher"
      style={{
        position: "fixed", left: "50%", bottom: 14, transform: "translateX(-50%)",
        zIndex: 9999, display: "flex", alignItems: "center", gap: 14,
        padding: "8px 16px", background: "var(--neutral-950)",
        border: "1px solid var(--copper-600)", boxShadow: "var(--shadow-base)",
        fontFamily: "var(--mono)", fontSize: 12, color: "var(--copper-100)",
        whiteSpace: "nowrap",
      }}
    >
      <button style={btn} onClick={() => cycle(-1)}>←</button>
      <span style={{ minWidth: 330, textAlign: "center" }}>
        <strong>{state.variant}</strong> — {VARIANTS[state.variant]}
      </span>
      <button style={btn} onClick={() => cycle(1)}>→</button>

      <span style={{ color: "var(--copper-700)" }}>|</span>

      <label style={{ display: "flex", alignItems: "center", gap: 7, color: "var(--copper-300)" }}>
        fold {state.fold}ms
        <input
          type="range" min={1000} max={4000} step={100} value={state.fold}
          onChange={(e) => setState((s) => ({ ...s, fold: Number(e.target.value) }))}
          style={{ width: 110, accentColor: "var(--copper-400)" }}
        />
      </label>
      <button style={btn} onClick={onReplay}>replay ⟲</button>

      <span style={{ color: "var(--copper-700)" }}>|</span>

      <button
        style={{ ...btn, borderColor: state.hold ? "var(--copper-200)" : "var(--copper-700)" }}
        onClick={() => setState((s) => ({ ...s, hold: !s.hold }))}
      >
        un-hover: {state.hold ? "hold last" : "release"}
      </button>

      <span style={{ color: "var(--copper-700)" }}>|</span>
      <span style={{ color: "var(--copper-300)" }}>
        step {stepIndex} · {active ?? "idle"}
      </span>
    </div>,
    document.body,
  );
}
