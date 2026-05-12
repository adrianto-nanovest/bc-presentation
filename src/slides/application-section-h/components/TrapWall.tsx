// TrapWall — composition-level animation loop wrapping 8 pitfall cards.
// Spec §1 + §H.1 (docs/specs/2026-05-12-slides-application-H-discipline.md).
//
// Visual:
//   ┌────┬────┬────┬────┐
//   │ A  │ B  │ C  │ D  │   ← 4×2 pitfall grid (gap 18px)
//   ├────┼────┼────┼────┤
//   │ E  │ F  │ G  │ H  │
//   └────┴────┴────┴────┘
//
// Behaviour (CHAOTIC by design — contrast with H.2's calm DisciplineWall):
//   • At each tick: pick 1 card (or 2, with ~30% chance) at random,
//     flare them copper-200 for ~800ms (200ms in, 600ms out).
//   • Next tick scheduled at a random interval between 1500–3500ms.
//   • Loop runs continuously regardless of stepIndex; never blocks
//     step-reveal.
//   • Hover overrides composition flare (lit = hover || flared).
//
// Implementation: useEffect + recursive setTimeout chain (NOT setInterval),
// because intervals are uniform and we want chaos. State: a Set<number>
// of currently-flared indices so multiple cards can flare simultaneously.
// All pending timers tracked in a ref array and cleared on unmount.
import { useEffect, useRef, useState } from "react";
import { AnimatedGlyph } from "@/components/AnimatedGlyph";
import { Reveal } from "../../foundation-core-section-e/components/Reveal";
import type { h1Content } from "../content";

type Pitfall = (typeof h1Content.cards)[number];

interface TrapWallProps {
  pitfalls: readonly Pitfall[];
}

// Timing knobs — see header comment for rationale.
const FLARE_DURATION_MS = 800;
const TICK_MIN_MS = 1500;
const TICK_MAX_MS = 3500;
const TWO_CARD_PROBABILITY = 0.3;
// Wait for the stagger entry to finish (8 cards * 80ms + 120ms base + reveal
// transition ~500ms ≈ 1.2s) before starting the chaos loop. Lets the wall
// settle visually first.
const LOOP_START_DELAY_MS = 1200;

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function TrapWall({ pitfalls }: TrapWallProps) {
  const [flared, setFlared] = useState<Set<number>>(() => new Set());
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    let cancelled = false;
    const cardCount = pitfalls.length;

    const pushTimer = (id: ReturnType<typeof setTimeout>) => {
      timersRef.current.push(id);
    };

    const tick = () => {
      if (cancelled) return;

      // Pick 1 card, or 2 with TWO_CARD_PROBABILITY.
      const pickCount = Math.random() < TWO_CARD_PROBABILITY ? 2 : 1;
      const picked = new Set<number>();
      while (picked.size < pickCount && picked.size < cardCount) {
        picked.add(Math.floor(Math.random() * cardCount));
      }

      // Flare on.
      setFlared((prev) => {
        const next = new Set(prev);
        for (const i of picked) next.add(i);
        return next;
      });

      // Flare off after FLARE_DURATION_MS.
      pushTimer(
        setTimeout(() => {
          if (cancelled) return;
          setFlared((prev) => {
            const next = new Set(prev);
            for (const i of picked) next.delete(i);
            return next;
          });
        }, FLARE_DURATION_MS),
      );

      // Schedule next tick at random interval.
      const nextDelay = randomInt(TICK_MIN_MS, TICK_MAX_MS);
      pushTimer(
        setTimeout(() => {
          tick();
        }, nextDelay),
      );
    };

    // Kick off after stagger entry finishes.
    const startId = setTimeout(() => {
      tick();
    }, LOOP_START_DELAY_MS);
    pushTimer(startId);

    return () => {
      cancelled = true;
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
    };
  }, [pitfalls]);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gridTemplateRows: "repeat(2, 1fr)",
        gap: 18,
        height: "100%",
        width: "100%",
      }}
    >
      {pitfalls.map((p, i) => (
        <PitfallCard
          key={p.id}
          pitfall={p}
          flared={flared.has(i)}
          index={i}
        />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PitfallCard — single card. Co-located: it has no use outside TrapWall.
// ─────────────────────────────────────────────────────────────────────────────

interface PitfallCardProps {
  pitfall: Pitfall;
  flared: boolean;
  index: number;
}

function PitfallCard({ pitfall, flared, index }: PitfallCardProps) {
  const [hover, setHover] = useState(false);
  const lit = hover || flared;

  return (
    <Reveal
      on={true}
      delay={120 + index * 80}
      style={{ height: "100%", width: "100%" }}
    >
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          height: "100%",
          width: "100%",
          boxSizing: "border-box",
          padding: 16,
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          gap: 8,
          border: `1px solid ${lit ? "var(--copper-200)" : "var(--copper-700)"}`,
          background: "rgba(10, 10, 10, 0.5)",
          transition:
            "border-color 0.2s var(--ease), box-shadow 0.2s var(--ease)",
          boxShadow: lit ? "0 0 12px rgba(184, 110, 61, 0.18)" : "none",
          position: "relative",
        }}
      >
        {/* ID pill — mono 11px copper-300 */}
        <div
          style={{
            fontFamily: "var(--mono)",
            fontSize: 11,
            letterSpacing: "0.18em",
            color: "var(--copper-300)",
          }}
        >
          {pitfall.id}
        </div>

        {/* Glyph — 48×48 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            paddingTop: 2,
            paddingBottom: 2,
          }}
        >
          <AnimatedGlyph kind={pitfall.glyphKind} size={48} />
        </div>

        {/* Name — display 18px, neutral-50, uppercase */}
        <div
          style={{
            fontFamily: "var(--display)",
            fontSize: 18,
            color: "var(--neutral-50)",
            lineHeight: 1.1,
            letterSpacing: "0.02em",
            textTransform: "uppercase",
          }}
        >
          {pitfall.name}
        </div>

        {/* Symptom — mono 11px copper-100 */}
        <div
          style={{
            fontFamily: "var(--mono)",
            fontSize: 11,
            letterSpacing: "0.04em",
            color: "var(--copper-100)",
            lineHeight: 1.35,
          }}
        >
          {pitfall.symptom}
        </div>

        {/* Cost — serif italic 13px neutral-300 */}
        <div
          style={{
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontSize: 13,
            color: "var(--neutral-300)",
            lineHeight: 1.3,
            marginTop: "auto",
          }}
        >
          {pitfall.cost}
        </div>
      </div>
    </Reveal>
  );
}
