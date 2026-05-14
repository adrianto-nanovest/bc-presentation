// JourneyTimeline — looping milestone rail used by I.2.
//
// Renders a horizontal rail with N anchor nodes evenly distributed. First
// circle snaps to the rail's left start, last to the right end (positions
// 0% / 25% / 50% / 75% / 100% for 5 nodes). Each anchor: copper-bordered
// circle holding a Lucide icon + a fixed-height label box BELOW the rail
// listing 2–3 bullet points. Between consecutive anchors, an italic mono
// segment label sits ABOVE the rail.
//
// While `on=true`, an `activeIndex` cycles 0→1→2→3→4→0… every TICK_MS ms.
// On each tick:
//   - The previously active circle/box dims; the new active one brightens.
//   - The segment label crossed during the transition brightens for ~600ms.
//   - A bright copper "pulse" segment glides along the rail from the
//     previous circle to the new one (handled by transitioning the
//     bright-segment's `left`/`width` between consecutive node positions).
import { motion } from "framer-motion";
import { useEffect, useReducer, useRef, type ReactNode } from "react";
import { LucideIcon } from "@/slides/foundation-core-section-e/components/LucideIcon";

export interface JourneyBullet {
  text: string;
  keywords: readonly string[];
}

export interface JourneyAnchor {
  id: string;
  label: string;
  icon: string;
  bullets: readonly JourneyBullet[];
}

interface JourneyTimelineProps {
  anchors: JourneyAnchor[];          // ordered left → right (N items)
  segments: readonly string[];       // N-1 segment labels
  on: boolean;                       // when true, looping animation runs
  /** ms each anchor stays active before advancing. */
  tickMs?: number;
  /** Width of each label box (px); also drives bullet-row max-width. */
  boxWidth?: number;
  /** Render bullets with highlighted keywords. */
  highlight: (text: string, keywords: readonly string[]) => ReactNode;
}

const RAIL_TOP = 56;            // rail vertical center within the timeline container
const CIRCLE_RADIUS = 18;
const CONNECTOR_LENGTH = 14;

export function JourneyTimeline({
  anchors,
  segments,
  on,
  tickMs = 2200,
  boxWidth = 210,
  highlight,
}: JourneyTimelineProps) {
  const total = anchors.length;
  // Inset positions so the label boxes (boxWidth wide, centered on each
  // circle) don't overflow the container. The rail itself ALSO spans
  // positions[0] → positions[N-1], so the first circle sits AT the rail's
  // left starting point and the last circle at its right end.
  // For 5 nodes: 10, 30, 50, 70, 90.
  const positions = anchors.map((_, i) => 10 + (i / (total - 1)) * 80);

  // Looping active-index cycle using a requestAnimationFrame-based scheduler
  // with a `last-tick` timestamp ref. This is immune to React StrictMode
  // double-mount (which can stack setTimeout chains) and to clock-drift
  // patterns we've seen with setInterval/setTimeout in dev.
  const counterRef = useRef(0);
  const [, forceRender] = useReducer((n: number) => n + 1, 0);

  useEffect(() => {
    if (!on) {
      counterRef.current = 0;
      forceRender();
      return;
    }
    let cancelled = false;
    let rafId = 0;
    let lastTick = performance.now();
    const loop = (now: number) => {
      if (cancelled) return;
      if (now - lastTick >= tickMs) {
        counterRef.current += 1;
        lastTick = now;
        forceRender();
      }
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);
    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
    };
  }, [on, tickMs]);

  const activeIndex = on ? counterRef.current % total : 0;
  const prevIndex = on ? (counterRef.current - 1 + total) % total : 0;

  // Segment-label highlight: the segment "between prev and active" lights up
  // briefly when activeIndex changes. We just key off `activeIndex` (and
  // ignore the wrap 4→0 segment-highlight since there isn't a segment
  // connecting node 4 back to node 0 — it gracefully fades).
  const transitioningSegmentIndex =
    on && activeIndex !== prevIndex && activeIndex === prevIndex + 1
      ? prevIndex
      : null;

  // Bright pulse segment: positioned between adjacent circles. Uses left/right
  // CSS for the segment from min(prev, active) to max(prev, active). When the
  // cycle wraps (4→0), we just snap it (no visual slide back).
  const pulseLeft = positions[Math.min(prevIndex, activeIndex)];
  const pulseRight = 100 - positions[Math.max(prevIndex, activeIndex)];
  // On wrap (prev=4, active=0), prevIndex briefly stays 4. Skip the slide.
  const wrap = activeIndex === 0 && prevIndex === total - 1;

  return (
    <div
      data-testid="journey-timeline"
      style={{ position: "relative", width: "100%", height: "100%" }}
    >
      {/* Dim base rail — spans from first to last circle center. */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: `${positions[0]}%`,
          right: `${100 - positions[total - 1]}%`,
          top: RAIL_TOP,
          height: 1,
          background: "var(--copper-700)",
          opacity: on ? 1 : 0,
          transition: "opacity 400ms var(--ease)",
        }}
      />

      {/* Bright pulse segment — slides between adjacent circles. */}
      {!wrap && (
        <div
          data-testid="journey-pulse"
          aria-hidden
          style={{
            position: "absolute",
            left: `${pulseLeft}%`,
            right: `${pulseRight}%`,
            top: RAIL_TOP - 0.5,
            height: 2,
            background:
              "linear-gradient(90deg, transparent 0%, var(--copper-200) 50%, transparent 100%)",
            boxShadow: "0 0 8px var(--copper-400)",
            opacity: on ? 1 : 0,
            transition:
              "left 700ms var(--ease), right 700ms var(--ease), opacity 400ms var(--ease)",
          }}
        />
      )}

      {/* Segment labels — italic mono above rail, between adjacent anchor pairs. */}
      {segments.map((seg, i) => {
        const midpoint = (positions[i] + positions[i + 1]) / 2;
        const isActive = transitioningSegmentIndex === i || activeIndex === i + 1;
        return (
          <span
            key={`seg-${i}`}
            data-testid="journey-segment"
            data-active={isActive ? "1" : "0"}
            style={{
              position: "absolute",
              top: RAIL_TOP - 26,
              left: `${midpoint}%`,
              transform: "translateX(-50%)",
              fontFamily: "var(--serif)",
              fontStyle: "italic",
              fontSize: 12,
              color: isActive ? "var(--copper-200)" : "var(--copper-400)",
              opacity: on ? (isActive ? 1 : 0.55) : 0,
              whiteSpace: "nowrap",
              letterSpacing: "0.02em",
              transition:
                "color 400ms var(--ease), opacity 400ms var(--ease), text-shadow 400ms var(--ease)",
              textShadow: isActive ? "0 0 12px var(--copper-400)" : "none",
              textAlign: "center",
            }}
          >
            {seg}
          </span>
        );
      })}

      {/* Anchors — circle + connector + label box. Each in its own absolute slot. */}
      {anchors.map((a, i) => {
        const isActive = on && activeIndex === i;
        const circleBorder = isActive ? "var(--copper-200)" : "var(--copper-400)";
        const circleBg = isActive
          ? "rgba(217,158,108,0.18)"
          : "var(--neutral-950)";
        const circleShadow = isActive
          ? "0 0 0 1px var(--copper-200), 0 0 20px -4px var(--copper-400)"
          : "none";
        const iconColor = isActive ? "var(--copper-100)" : "var(--copper-300)";
        const boxBorder = isActive ? "var(--copper-200)" : "var(--copper-700)";
        const boxBg = isActive ? "rgba(217,158,108,0.08)" : "rgba(10,10,10,0.78)";
        const boxShadow = isActive
          ? "0 0 0 1px var(--copper-200), 0 0 22px -8px var(--copper-400)"
          : "none";
        const dateColor = isActive ? "var(--copper-200)" : "var(--copper-300)";
        const bulletColor = isActive ? "var(--neutral-100)" : "var(--neutral-300)";

        return (
          // Outer plain div owns the centering transform — framer-motion
          // would otherwise clobber `transform: translateX(-50%)` when it
          // animates `y`.
          <div
            key={a.id}
            style={{
              position: "absolute",
              left: `${positions[i]}%`,
              top: 0,
              transform: "translateX(-50%)",
            }}
          >
          <motion.div
            data-testid="journey-anchor"
            data-active={isActive ? "1" : "0"}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: on ? 1 : 0, y: on ? 0 : 8 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* Circle node (icon inside) */}
            <div
              style={{
                width: CIRCLE_RADIUS * 2,
                height: CIRCLE_RADIUS * 2,
                marginTop: RAIL_TOP - CIRCLE_RADIUS,
                borderRadius: "50%",
                border: `1px solid ${circleBorder}`,
                background: circleBg,
                boxShadow: circleShadow,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                zIndex: 2,
                transition:
                  "border-color 400ms var(--ease), background 400ms var(--ease), box-shadow 400ms var(--ease)",
              }}
            >
              <LucideIcon
                name={a.icon}
                size={16}
                color={iconColor}
              />
            </div>
            {/* Connector stub */}
            <div
              aria-hidden
              style={{
                width: 1,
                height: CONNECTOR_LENGTH,
                background: isActive
                  ? "var(--copper-300)"
                  : "var(--copper-700)",
                transition: "background 400ms var(--ease)",
              }}
            />
            {/* Date + bullets label box (consistent height) */}
            <div
              data-testid="journey-label-box"
              style={{
                width: boxWidth,
                minHeight: 110,
                border: `1px solid ${boxBorder}`,
                background: boxBg,
                boxShadow: boxShadow,
                padding: "10px 12px",
                display: "flex",
                flexDirection: "column",
                gap: 6,
                transition:
                  "border-color 400ms var(--ease), background 400ms var(--ease), box-shadow 400ms var(--ease)",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 11,
                  letterSpacing: "0.18em",
                  color: dateColor,
                  textTransform: "uppercase",
                  lineHeight: 1.2,
                  transition: "color 400ms var(--ease)",
                }}
              >
                {a.label}
              </span>
              <ul
                style={{
                  margin: 0,
                  padding: 0,
                  listStyle: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                }}
              >
                {a.bullets.map((b, bi) => (
                  <li
                    key={bi}
                    style={{
                      fontFamily: "var(--serif)",
                      fontSize: 12,
                      color: bulletColor,
                      lineHeight: 1.35,
                      display: "flex",
                      alignItems: "baseline",
                      gap: 6,
                      transition: "color 400ms var(--ease)",
                    }}
                  >
                    <span
                      aria-hidden
                      style={{
                        color: isActive
                          ? "var(--copper-200)"
                          : "var(--copper-500)",
                        fontSize: 9,
                        lineHeight: 1.35,
                        flexShrink: 0,
                        transition: "color 400ms var(--ease)",
                      }}
                    >
                      ●
                    </span>
                    <span style={{ flex: 1 }}>
                      {b.keywords.length > 0
                        ? highlight(b.text, b.keywords)
                        : b.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
          </div>
        );
      })}
    </div>
  );
}
