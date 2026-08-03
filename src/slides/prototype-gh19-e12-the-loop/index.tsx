// PROTOTYPE gh#19 — throwaway. Delete from main once the form is signed off.
//
// ─────────────────────────────────────────────────────────────────────────────
// WHAT THIS IS
//
// The resolution of #19, built. Not a variant bracket — the form was settled in
// the grilling session on 2026-08-03 and this is the single candidate:
//
//   FORM      gh#17 C's skeleton (left five-row list + right persistent
//             canvas), improved. gh#18 A · THE DIAL is dropped; the owner
//             reversed the "mostly 18A" lean on the record.
//   STEPS     3, not 2. canonicalPose 2.
//     step 0  FULL-STAGE HERO. An Archimedean spiral draws lap by lap, each
//             lap slower than the last. Every human turn fires on ONE radial
//             spoke, so your turns are collinear — one per lap.
//     step 1  Every point's radius is interpolated toward one constant: the
//             spiral becomes an exact circle, and the stacked human turns
//             merge into TWO — the entry and the gate. Then the figure docks
//             right and the five rows write in.
//     step 2  The apparatus mounts, labelled with the Friday 4 PM run. The
//             tagline lands bottom-left.
//
// ─────────────────────────────────────────────────────────────────────────────
// RULES THIS BUILD OBEYS (from the session, not invented here)
//
//   - Nothing unrevealed is drawn. No ghosts, ever. An element is absent from
//     the SVG, or it is at full strength. Opacity is only an entry cross-fade.
//   - Rank is stroke weight and colour tier. Never opacity.
//   - Hover is live from step 1 (words only) and full at step 2. Un-hover
//     RELEASES. Click pins. — this closes #19's last open item.
//   - The worked example is not a card: it is the apparatus' labels.
//   - kw everywhere. Mono strings never carry keywords.
//   - CSS vars only, no hex literals, no new fonts, no new libraries.
//
// ─────────────────────────────────────────────────────────────────────────────
// RUN IT
//
//   npm run dev  →  http://localhost:5173/?dev=proto19
//
//   Space / click   next step        Backspace / ↑   previous step
//   1–5             pin a row        0               clear + back to step 0
//   \               replay the current step's entry
//
// State is in the URL (`?dev=proto19&laps=…&lap=…&merge=…&hold=…&dock=…`) so
// any frame is shareable and reload-stable.
// ─────────────────────────────────────────────────────────────────────────────
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { DeckProvider, useDeck } from "@/deck/DeckContext";
import { Slide } from "@/deck/Slide";
import { FigLabel } from "@/components/FigLabel";
import { HintIcon } from "@/components/HintIcon";
import { highlight } from "@/components/highlight";
import { LucideIcon } from "@/slides/foundation-core-section-e/components/LucideIcon";
import { CopperRule, Reveal } from "@/slides/foundation-core-section-e/components/Reveal";
import { brief as B, heroCaption, type DecisionId } from "./brief";
import { LoopFigure } from "./LoopFigure";
import { TAU, ease, spiral } from "./geometry";

// ───────────────────────── switcher state ─────────────────────────

interface ProtoState {
  laps: number;
  lapMs: number;
  mergeMs: number;
  holdMs: number;
  dockMs: number;
}

const DEFAULTS: ProtoState = {
  laps: 3,
  lapMs: 620,
  mergeMs: 1100,
  holdMs: 250,
  dockMs: 700,
};

const clampN = (v: number, lo: number, hi: number, fb: number) =>
  Number.isFinite(v) && v > 0 ? Math.max(lo, Math.min(hi, v)) : fb;

function readUrl(): ProtoState {
  const p = new URLSearchParams(window.location.search);
  return {
    laps: clampN(Number(p.get("laps")), 2, 4, DEFAULTS.laps),
    lapMs: clampN(Number(p.get("lap")), 200, 1400, DEFAULTS.lapMs),
    mergeMs: clampN(Number(p.get("merge")), 300, 2600, DEFAULTS.mergeMs),
    holdMs: clampN(Number(p.get("hold")), 1, 900, DEFAULTS.holdMs),
    dockMs: clampN(Number(p.get("dock")), 200, 1800, DEFAULTS.dockMs),
  };
}

function writeUrl(s: ProtoState) {
  const p = new URLSearchParams(window.location.search);
  p.set("dev", "proto19");
  p.set("laps", String(s.laps));
  p.set("lap", String(s.lapMs));
  p.set("merge", String(s.mergeMs));
  p.set("hold", String(s.holdMs));
  p.set("dock", String(s.dockMs));
  window.history.replaceState(null, "", `?${p.toString()}`);
}

// ───────────────────────── entry timeline ─────────────────────────

/** The spiral draws one lap per beat, each lap SLOWER than the last. The
 *  deceleration is what says "this is getting worse" without a word. */
function drawTimeline(laps: number, lapMs: number) {
  const s = spiral(laps);
  const segs: { t0: number; t1: number; th0: number; th1: number }[] = [];
  let t = 0;
  for (let i = 0; i < laps; i++) {
    const dur = lapMs * (1 + 0.25 * i);
    segs.push({ t0: t, t1: t + dur, th0: i * TAU, th1: (i + 1) * TAU });
    t += dur;
  }
  const tail = lapMs * 0.35;
  segs.push({ t0: t, t1: t + tail, th0: laps * TAU, th1: s.thetaEnd });
  return { segs, total: t + tail, thetaEnd: s.thetaEnd };
}

interface Anim {
  drawn: number;
  q: number;
  d: number;
  ringOn: boolean;
}

const HERO_ZERO: Anim = { drawn: 0, q: 0, d: 0, ringOn: false };
const HERO_DONE: Anim = { drawn: 1, q: 0, d: 0, ringOn: false };
const RING_DONE: Anim = { drawn: 1, q: 1, d: 1, ringOn: true };

// ───────────────────────── route ─────────────────────────

export function Proto19Route() {
  const [state, setState] = useState<ProtoState>(readUrl);
  useEffect(() => writeUrl(state), [state]);

  return (
    // steps: 3 — step 0 hero, step 1 the loop, step 2 the apparatus.
    <DeckProvider stepCounts={[3]}>
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
  const [hovered, setHovered] = useState<DecisionId | null>(null);
  const [pinned, setPinned] = useState<DecisionId | null>(null);
  const [anim, setAnim] = useState<Anim>(HERO_ZERO);

  // Un-hover RELEASES (#19 item 2). Click-to-pin is the only way to hold a
  // state, and it is visible — a lit group left behind by a departed pointer
  // reads as "this one is different", which is a false statement.
  const active = pinned ?? hovered;

  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches === true;

  // Timings live in a ref so the animation effect can depend only on the step
  // and the replay key — a slider drag bumps replayKey explicitly.
  const cfg = useRef(state);
  cfg.current = state;
  const landed = useRef(false);
  const prevReplay = useRef(replayKey);

  useEffect(() => {
    if (prevReplay.current !== replayKey) {
      prevReplay.current = replayKey;
      landed.current = false;
    }
    const { laps, lapMs, mergeMs, holdMs, dockMs } = cfg.current;
    let raf = 0;

    if (stepIndex === 0) {
      landed.current = false;
      if (reduced) {
        setAnim(HERO_DONE);
        return undefined;
      }
      const tl = drawTimeline(laps, lapMs);
      const t0 = performance.now();
      const tick = () => {
        const e = performance.now() - t0;
        if (e >= tl.total) {
          setAnim(HERO_DONE);
          return;
        }
        const seg = tl.segs.find((g) => e < g.t1) ?? tl.segs[tl.segs.length - 1];
        const local = (e - seg.t0) / (seg.t1 - seg.t0);
        const th = seg.th0 + (seg.th1 - seg.th0) * local;
        setAnim({ drawn: th / tl.thetaEnd, q: 0, d: 0, ringOn: false });
        raf = requestAnimationFrame(tick);
      };
      setAnim(HERO_ZERO);
      raf = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(raf);
    }

    // Steps 1 and 2 share one landed ring. Moving 1 → 2 → 1 must never
    // replay the merge: the ring is drawn once and only ever re-lit.
    if (landed.current || reduced) {
      setAnim(RING_DONE);
      landed.current = true;
      return undefined;
    }

    const mergeEnd = mergeMs;
    const holdEnd = mergeEnd + holdMs;
    const dockEnd = holdEnd + dockMs;
    const t0 = performance.now();
    const tick = () => {
      const e = performance.now() - t0;
      if (e >= dockEnd) {
        landed.current = true;
        setAnim(RING_DONE);
        return;
      }
      if (e < mergeEnd) {
        // Linear in q on purpose: the radius collapse should read as
        // mechanical, not springy.
        setAnim({ drawn: 1, q: e / mergeEnd, d: 0, ringOn: false });
      } else if (e < holdEnd) {
        setAnim({ drawn: 1, q: 1, d: 0, ringOn: false });
      } else {
        setAnim({ drawn: 1, q: 1, d: ease((e - holdEnd) / dockMs), ringOn: false });
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [stepIndex, replayKey, reduced]);

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
      } else if (/^[1-5]$/.test(e.key)) {
        e.preventDefault();
        setPinned(B.decisions[Number(e.key) - 1].id);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [advance, retreat, goTo]);

  const rowsOn = anim.ringOn || anim.d > 0.15;
  const apparatusOn = stepIndex >= 2 && anim.ringOn;
  const showRingCaption = anim.ringOn || anim.d > 0.5;
  const activeRow = B.decisions.find((r) => r.id === active) ?? null;

  return (
    <>
      <Slide index={0} animationMode="step-reveal" canonicalPose={2} surface="dark" section="E">
        <FigLabel {...B.fig} />

        <div className="slide-headline-row">
          <h1 className="slide-headline small">
            {highlight(B.headline, B.headlineKw)}
          </h1>
        </div>

        <div style={{ position: "absolute", left: 48, top: 134, display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: "0.22em", color: "var(--copper-600)", textTransform: "uppercase" }}>
            {B.qualifier}
          </span>
          {stepIndex >= 1 && <HintIcon text={B.hint} />}
        </div>

        {/* The worked example's implementation strip. On from step 1, so the
            abstraction never floats free of something you can actually build. */}
        <Reveal
          on={stepIndex >= 1}
          delay={120}
          style={{ position: "absolute", right: 48, top: 86, textAlign: "right" }}
        >
          <span style={{ fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: "0.2em", color: "var(--copper-600)" }}>
            {B.buildStrip}
          </span>
        </Reveal>

        <LoopFigure
          laps={state.laps}
          drawn={anim.drawn}
          q={anim.q}
          d={anim.d}
          ringOn={anim.ringOn}
          apparatusOn={apparatusOn}
          active={active}
          reduced={reduced}
        />

        {/* ── LEFT — the five decisions ──────────────────────────────────── */}
        {rowsOn && (
          <div
            data-testid="p19-left"
            data-no-advance=""
            style={{ position: "absolute", left: 48, top: 180, width: 440, bottom: 78, display: "flex", flexDirection: "column" }}
          >
            <div style={{ width: "fit-content" }}>
              <span style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.22em", color: "var(--copper-300)" }}>
                {B.leftHeading}
              </span>
              <div style={{ marginTop: 11 }}>
                <CopperRule on width={440} />
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 9, marginTop: 15 }}>
              {B.decisions.map((r, i) => {
                const isPinned = pinned === r.id;
                const on = active === r.id;
                return (
                  <Reveal key={r.id} on delay={90 + i * 85}>
                    <div
                      data-testid={`p19-row-${r.id}`}
                      data-active={on ? "true" : "false"}
                      onMouseEnter={() => setHovered(r.id)}
                      onMouseLeave={() => setHovered(null)}
                      onClick={() => setPinned((c) => (c === r.id ? null : r.id))}
                      style={{
                        position: "relative",
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 12,
                        padding: "8px 12px",
                        border: "1px solid",
                        borderColor: on ? "var(--copper-200)" : "var(--copper-900)",
                        background: on ? "var(--copper-950)" : "transparent",
                        cursor: "pointer",
                        transition: "border-color 200ms var(--ease), background 200ms var(--ease)",
                      }}
                    >
                      {isPinned && (
                        <div style={{ position: "absolute", top: 5, right: 7, color: "var(--copper-200)", display: "flex" }}>
                          <LucideIcon name="Pin" size={10} color="currentColor" />
                        </div>
                      )}
                      <div style={{ marginTop: 2, color: on ? "var(--copper-100)" : "var(--copper-400)", display: "flex", transition: "color 200ms var(--ease)" }}>
                        <LucideIcon name={r.icon} size={18} color="currentColor" />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontFamily: "var(--mono)", fontSize: 11.5, letterSpacing: "0.2em", color: on ? "var(--copper-100)" : "var(--copper-200)", transition: "color 200ms var(--ease)" }}>
                          {r.title}
                        </div>
                        <div style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 13, lineHeight: 1.3, color: on ? "var(--neutral-100)" : "var(--neutral-300)", marginTop: 3, whiteSpace: "nowrap", transition: "color 200ms var(--ease)" }}>
                          {highlight(r.desc, r.descKw)}
                        </div>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>

            <div style={{ flex: 1 }} />

            {/* Bottom-left is the tagline's corner and nothing else ever
                occupies it. Display weight, so it outranks the running
                commentary in the caption well. */}
            <Reveal on={stepIndex >= 2} delay={260}>
              <p style={{ fontFamily: "var(--display)", fontSize: 27, lineHeight: 1.12, color: "var(--copper-100)", margin: 0 }}>
                {highlight(B.tagline, B.taglineKw)}
              </p>
            </Reveal>
          </div>
        )}

        {/* ── the caption well — it travels with the figure ────────────────
            Step 0: centred under the full-stage spiral. Steps 1–2: centred
            under the docked canvas. One element, four jobs. */}
        {stepIndex === 0 && (
          <div data-testid="p19-caption-hero" style={{ position: "absolute", left: 320, top: 630, width: 640, textAlign: "center" }}>
            <Reveal on={anim.drawn > 0.55} delay={0}>
              <p style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 16, lineHeight: 1.4, color: "var(--neutral-300)", margin: 0 }}>
                {highlight(heroCaption(state.laps), B.captions.heroKw)}
              </p>
            </Reveal>
          </div>
        )}

        {stepIndex >= 1 && (
          <div
            data-testid="p19-caption-well"
            data-no-advance=""
            style={{ position: "absolute", left: 514, top: 626, width: 640, minHeight: 64, textAlign: "center" }}
          >
            {activeRow ? (
              <div key={activeRow.id} className="fade on">
                <p style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 16, lineHeight: 1.35, color: "var(--copper-100)", margin: 0 }}>
                  {highlight(activeRow.caption, activeRow.captionKw)}
                </p>
                {activeRow.chips.length > 0 && (
                  <div style={{ display: "flex", gap: 14, justifyContent: "center", marginTop: 7 }}>
                    {activeRow.chips.map((c) => (
                      <span key={c} style={{ fontFamily: "var(--mono)", fontSize: 9.5, letterSpacing: "0.18em", color: "var(--copper-400)", textTransform: "uppercase" }}>
                        {c}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Reveal on={showRingCaption} delay={80}>
                <p style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 16, lineHeight: 1.35, color: "var(--neutral-300)", margin: 0 }}>
                  {stepIndex >= 2
                    ? highlight(B.closer, B.closerKw)
                    : highlight(B.captions.ring, B.captions.ringKw)}
                </p>
              </Reveal>
            )}
          </div>
        )}
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
// Portalled to <body> so it escapes the stage's scale transform: it must be
// obviously NOT part of the design under review, and it must stay out of the
// 1280×720 frame when screenshotting.

function SwitcherBar({
  state,
  setState,
  stepIndex,
  active,
  onReplay,
}: {
  state: ProtoState;
  setState: (fn: (s: ProtoState) => ProtoState) => void;
  stepIndex: number;
  active: DecisionId | null;
  onReplay: () => void;
}) {
  const bump = useCallback(
    (patch: Partial<ProtoState>) => {
      setState((s) => ({ ...s, ...patch }));
      onReplay();
    },
    [setState, onReplay],
  );

  if (!import.meta.env.DEV) return null;

  const btn: React.CSSProperties = {
    background: "transparent",
    border: "1px solid var(--copper-700)",
    color: "var(--copper-200)",
    fontFamily: "var(--mono)",
    fontSize: 11,
    padding: "3px 8px",
    cursor: "pointer",
  };

  const slider = (
    label: string,
    key: keyof ProtoState,
    lo: number,
    hi: number,
    step: number,
  ) => (
    <label style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--copper-300)" }}>
      {label} {state[key]}
      <input
        type="range"
        min={lo}
        max={hi}
        step={step}
        value={state[key]}
        onChange={(e) => bump({ [key]: Number(e.target.value) } as Partial<ProtoState>)}
        style={{ width: 76, accentColor: "var(--copper-400)" }}
      />
    </label>
  );

  return createPortal(
    <div
      data-no-advance=""
      data-testid="p19-switcher"
      style={{
        position: "fixed",
        left: "50%",
        bottom: 12,
        transform: "translateX(-50%)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        gap: 12,
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
      <span style={{ color: "var(--copper-300)" }}>laps</span>
      {[2, 3, 4].map((n) => (
        <button
          key={n}
          style={{ ...btn, borderColor: state.laps === n ? "var(--copper-200)" : "var(--copper-700)" }}
          onClick={() => bump({ laps: n })}
        >
          {n}
        </button>
      ))}
      <span style={{ color: "var(--copper-700)" }}>|</span>
      {slider("lap", "lapMs", 200, 1400, 20)}
      {slider("merge", "mergeMs", 300, 2600, 50)}
      {slider("hold", "holdMs", 1, 900, 25)}
      {slider("dock", "dockMs", 200, 1800, 50)}
      <span style={{ color: "var(--copper-700)" }}>|</span>
      <button style={btn} onClick={onReplay}>
        replay ⟲
      </button>
      <button style={btn} onClick={() => setState(() => ({ ...DEFAULTS }))}>
        reset
      </button>
      <span style={{ color: "var(--copper-700)" }}>|</span>
      <span style={{ color: "var(--copper-300)" }}>
        step {stepIndex} · {active ?? "idle"}
      </span>
    </div>,
    document.body,
  );
}
