// E.12 · LOOP ENGINEERING — poses 1 and 2: the rail, and what it magnifies.
//
// ONE RAIL, TWO POSES. Pose 1 is the anatomy of the big loop — four parts, each
// magnified onto the right canvas on hover. Pose 2 keeps the same rail and turns
// the canvas into one real loop running, where hovering a part lights the stages
// that part owns. The rail is therefore not "pose 1 furniture": it is the slide's
// index, and the two poses are two things it points at.
//
// THE OWNER CORRECTIONS OF 2026-08-04 (gh#49) THAT LIVE IN THIS FILE:
//   1. Both headings follow G.7's rule-to-text pattern — a `fit-content` wrapper
//      with the rule at `100%`, so the rule ENDS AT THE TEXT. The HintIcon sits
//      outside that wrapper, so it never lengthens the rule.
//   3. NO CONNECTOR between the rail and the canvas. §8.3 named a stepped leader
//      line with an arrow tip as part of the contract; this supersedes it, and it
//      is read literally — line and tip both gone. What replaces it as the tie is
//      the `NN ·` number each panel title carries.
//   4. The canvas is COMPLETELY BLANK until a card is hovered or pinned, so pose
//      1 opens rail-only. §8.3's idle `ONE BEAT` resting pose is dropped.
//   6. Every panel illustration starts level with the HEARTBEAT card's top
//      border. `HEAD_H` is that promise as one number, used by both columns —
//      switching panels cannot make the canvas jump.
//   8. Pose 2 drops the return-arc LABEL (the arc itself stays — it is anatomy)
//      and the recap becomes one quiet line in E.11's footer style.
//   9. Every card box hover-reacts, on both poses, by colour tier (`Box`).
//
// 1280×720 absolute stage, CSS vars only, no hex literals. Rewritten from
// `prototype-gh19b-e12-loop-engineering/index.tsx`, not lifted: the prototype is
// inline-styled, carries dev-only key handlers (`1`–`4`, `0`, `\`) that do not
// ship, and draws the leader line this ticket deletes.
import { useEffect, useState } from "react";
import { Activity, ClipboardCheck, Database, Pin, RotateCw } from "lucide-react";
import { highlight } from "@/components/highlight";
import { Reveal } from "./Reveal";
import {
  AREA,
  ArrowMarkers,
  Box,
  CANVAS,
  CANVAS_H,
  CANVAS_W,
  E12Heading,
  HEAD_H,
  MONO_FLOOR,
  RAIL,
  arrowIds,
  mono,
  prose,
} from "./E12Primitives";
import { PartPanel } from "./E12PartPanels";
import { TriageFlow } from "./E12TriageFlow";
import { e12Content as C, type E12PartId } from "../content";

// ───────────────────── the rail's own geometry ─────────────────────
// The two columns' boxes and the heading block are the shared contract, in
// `./E12Primitives`. What is local here is the cards: `inset` leaves the return
// arc its gutter down the left.
const CARD = { h: 62, gap: 20, inset: 30 };
const CARDS_H = 4 * CARD.h + 3 * CARD.gap;
const cardTop = (i: number) => i * (CARD.h + CARD.gap);

/**
 * THE GUARDRAIL'S SLOT (§12.1 call 1, closed on gh#50 — copy and reasoning in
 * `../content.tsx`). It is the FIRST FREE ROW UNDER THE RAIL, and that row is
 * lower on pose 1 than on pose 2 because pose 1 has one more thing above it:
 * measured at 1280×720, the cards end at stage y=505, pose 1's return label runs
 * 517→541, and pose 2's recap starts at y=612. So pose 1 takes 549 (clear of the
 * label, nothing below it) and pose 2 takes 517 (straight under the cards, 37px
 * of air above the recap). One offset for both would leave 5px between this
 * block and the recap, and the two italic notes would read as one paragraph.
 */
const guardTop = (pose: number) => HEAD_H + CARDS_H + (pose < 2 ? 44 : 12);

const PART_ICONS: Record<E12PartId, typeof Activity> = {
  heartbeat: Activity,
  beat: RotateCw,
  checker: ClipboardCheck,
  spine: Database,
};

// ───────────────────── poses 1 and 2 ─────────────────────

export function E12LoopAnatomy({ pose }: { pose: number }) {
  // Un-hover RELEASES; click PINS (settled on #19 — pinning is the only way to
  // hold state). `hovered ?? pinned` and not the other way round: a pin's job is
  // to HOLD a panel after the pointer leaves, not to lock the rail, so hovering
  // another card still swaps the panel and letting go falls back to the pin.
  const [hovered, setHovered] = useState<E12PartId | null>(null);
  const [pinned, setPinned] = useState<E12PartId | null>(null);
  const active = hovered ?? pinned;

  // A PIN DOES NOT CROSS A POSE BOUNDARY. The rail is mounted for both poses, so a
  // pin set on pose 1 would otherwise still be holding a panel when the presenter
  // walks back from pose 2 — and pose 1 has to open RAIL-ONLY (correction 4).
  // Arriving at pose 2 is the same story in reverse: it opens with no stage lit.
  // `hovered` is deliberately NOT cleared: it is the pointer's own truth, and
  // `mouseleave` is what ends it.
  useEffect(() => setPinned(null), [pose]);

  // SMIL is invisible to the global prefers-reduced-motion rule in globals.css
  // (it squashes CSS animations only), so every motion node is gated at mount.
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches === true;

  return (
    // Full-stage box, because both columns place themselves in STAGE
    // coordinates and the rail measures its own bottom off it. It carries no
    // `pointerEvents: none`: every box on both columns has to hover-react
    // (correction 9), and a click that lands on neither column still bubbles to
    // the stage and advances, which is the deck's normal behaviour.
    <div data-testid="e12-anatomy" style={{ position: "absolute", inset: 0 }}>
      <Rail
        pose={pose}
        active={active}
        pinned={pinned}
        onHover={setHovered}
        onPin={(id) => setPinned((cur) => (cur === id ? null : id))}
      />

      {/* THE CANVAS. Blank until a card is hovered or pinned on pose 1
          (correction 4), so the pose opens rail-only and the audience meets the
          four parts before any one of them is magnified. */}
      <div
        data-testid="e12-canvas"
        data-panel={pose >= 2 ? "triage" : (active ?? "none")}
        style={{
          position: "absolute",
          left: CANVAS.left,
          top: AREA.top,
          width: CANVAS_W,
          height: CANVAS_H,
        }}
      >
        {pose >= 2 ? (
          <TriageFlow active={active} reduced={reduced} />
        ) : (
          active && <PartPanel key={active} id={active} reduced={reduced} />
        )}
      </div>
    </div>
  );
}

// ───────────────────── the left rail ─────────────────────

function Rail({
  pose,
  active,
  pinned,
  onHover,
  onPin,
}: {
  pose: number;
  active: E12PartId | null;
  pinned: E12PartId | null;
  onHover: (id: E12PartId | null) => void;
  onPin: (id: E12PartId) => void;
}) {
  const arrow = arrowIds("rail");
  const railX = CARD.inset + (RAIL.width - CARD.inset) / 2;

  return (
    <div
      data-testid="e12-rail"
      data-no-advance=""
      style={{
        position: "absolute",
        left: RAIL.left,
        top: AREA.top,
        width: RAIL.width,
        bottom: AREA.bottom,
      }}
    >
      <E12Heading text={C.railHeading} testid="e12-rail-heading" hint />

      <div style={{ position: "absolute", left: 0, top: HEAD_H, width: RAIL.width, height: CARDS_H }}>
        {/* the flow down, and the way back up: tomorrow reads the spine. The ARC
            stays on both poses — it is the loop's shape; only its LABEL is pose
            1's (correction 8). */}
        <svg
          width={RAIL.width}
          height={CARDS_H}
          style={{ position: "absolute", inset: 0, overflow: "visible", pointerEvents: "none" }}
          aria-hidden
        >
          <ArrowMarkers scope="rail" />
          {[0, 1, 2].map((i) => (
            <line
              key={i}
              x1={railX}
              y1={cardTop(i) + CARD.h + 3}
              x2={railX}
              y2={cardTop(i + 1) - 4}
              stroke="var(--copper-500)"
              strokeWidth={1.2}
              markerEnd={`url(#${arrow.arrow})`}
            />
          ))}
          <path
            className="e12-dash-slow"
            d={`M${CARD.inset},${cardTop(3) + CARD.h / 2} H10 V${CARD.h / 2} H${CARD.inset - 5}`}
            fill="none"
            stroke="var(--copper-500)"
            strokeWidth={1.2}
            markerEnd={`url(#${arrow.arrow})`}
          />
        </svg>

        {C.parts.map((p, i) => {
          const Icon = PART_ICONS[p.id];
          const on = active === p.id;
          const isPinned = pinned === p.id;
          return (
            <Reveal key={p.id} on delay={90 + i * 85}>
              <Box
                testid={`e12-card-${p.id}`}
                active={on}
                interactive
                border={on ? "var(--copper-200)" : "var(--copper-800)"}
                background={on ? "var(--copper-950)" : "var(--neutral-900)"}
                onMouseEnter={() => onHover(p.id)}
                onMouseLeave={() => onHover(null)}
                onClick={() => onPin(p.id)}
                style={{
                  position: "absolute",
                  left: CARD.inset,
                  top: cardTop(i),
                  width: RAIL.width - CARD.inset,
                  height: CARD.h,
                  display: "flex",
                  alignItems: "center",
                  gap: 13,
                  padding: "0 15px",
                }}
              >
                <span
                  aria-hidden
                  style={{
                    display: "flex",
                    color: on ? "var(--copper-100)" : "var(--copper-400)",
                    transition: "color 200ms var(--ease)",
                  }}
                >
                  <Icon size={19} strokeWidth={1.7} />
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="e12-mono" style={mono(12, on ? "var(--copper-100)" : "var(--copper-200)", 0.2)}>
                    {p.title}
                  </div>
                  <div
                    className="e12-prose"
                    style={{
                      ...prose(12.5, on ? "var(--neutral-100)" : "var(--neutral-300)", true),
                      marginTop: 3,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {highlight(p.desc, p.descKw)}
                  </div>
                </div>
                {/* The pin glyph replaces the row number, so "pinned" is a state
                    the row itself reports — the same affordance E.9 uses. */}
                <span
                  className="e12-mono"
                  style={{
                    ...mono(10, on ? "var(--copper-300)" : "var(--copper-700)", 0.1),
                    alignSelf: "flex-start",
                    marginTop: 8,
                  }}
                >
                  {isPinned ? <Pin size={10} aria-label="pinned" style={{ display: "inline" }} /> : p.num}
                </span>
              </Box>
            </Reveal>
          );
        })}
      </div>

      {/* Pose 1 only. On pose 2 the flow's own dashed return says the same thing
          in the example's words — "and again tomorrow at 9:00" — so this label
          would be the second copy of one idea (correction 8). */}
      {pose < 2 && (
        <Reveal
          on
          delay={430}
          data-testid="e12-rail-return"
          style={{ position: "absolute", left: CARD.inset, top: HEAD_H + CARDS_H + 12, width: RAIL.width - CARD.inset }}
        >
          <span style={prose(11.5, "var(--copper-300)", true)}>
            ↺ {highlight(C.returnArc, C.returnArcKw)}
          </span>
        </Reveal>
      )}

      {/* THE GUARDRAIL — the slide's one risk row (§12.1 call 1, gh#50). On both
          poses, because the canonical pose is the one that prints: a pose-1-only
          line would be missing from every PDF the room takes home. A mono kicker
          and a dotted rule above it, so it reads as a caution note and not as a
          fifth part of the loop. */}
      <Reveal
        on
        delay={560}
        data-testid="e12-guardrail"
        style={{
          position: "absolute",
          left: CARD.inset,
          top: guardTop(pose),
          width: RAIL.width - CARD.inset,
        }}
      >
        <div style={{ borderTop: "1px dotted var(--copper-800)", paddingTop: 8 }}>
          <div style={mono(MONO_FLOOR, "var(--copper-300)", 0.22)}>{C.guardrail.label}</div>
          <p style={{ ...prose(11.5, "var(--copper-100)", true), margin: "5px 0 0" }}>
            {highlight(C.guardrail.text, C.guardrail.textKw)}
          </p>
        </div>
      </Reveal>

      {/* Pose 2's recap, in E.11's footer style (correction 8): serif italic
          13.5px on neutral-400, quiet, at the bottom-left of the stage where
          E.11's own thesis sits. */}
      {pose >= 2 && (
        <Reveal on delay={300} data-testid="e12-thesis" style={{ position: "absolute", left: 0, bottom: 0, width: RAIL.width }}>
          <p style={{ ...prose(13.5, "var(--neutral-400)", true), margin: 0 }}>
            {highlight(C.thesis, C.thesisKw)}
          </p>
        </Reveal>
      )}
    </div>
  );
}
