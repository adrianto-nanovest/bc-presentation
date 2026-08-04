// E.12 · LOOP ENGINEERING — pose 1's four right-canvas panels.
//
// One panel per part of the big loop, each a self-contained micro-infographic:
// the four heartbeats, the agent runtime inside one beat, the checker ladder, and
// the spine's memory between runs. The CHECKER panel is also the verification
// card §8.2 found missing from the whole harness treatment — "done is a check,
// not an opinion" lives on its foot line.
//
// THE THREE RULES THIS FILE IS BUILT AROUND (gh#49):
//   · correction 2 — no panel has a subtitle. Title, then the illustration.
//   · correction 5 — on panels 2 and 4 every connector REVEALS WITH ITS BOX, arrow
//     tip included. `Connector` is what makes that true: a draw-in on the path
//     alone leaves the marker painted from frame 0, because SVG markers ignore the
//     dash offset. The prototype shipped exactly that bug.
//   · correction 7 — nothing reads below `TEXT_FLOOR`. The axis label
//     `more and more unattended →` was `--neutral-400` italic at 10.5px and
//     illegible on a washed-out projector; it is now copper-200 at 11px, and no
//     other grey on these four panels sits below the floor either.
//
// gh#50 (§12.1 call 3) adds the SIZE half of that rule: `MONO_FLOOR` /
// `PROSE_FLOOR`, and no label on these panels sits under either. The tool strips,
// both axes and the read / write annotations were the runs below it.
//
// Rewritten from `prototype-gh19b-e12-loop-engineering/PartPanels.tsx`: inline
// styles throughout, no shared box, kickers on every panel, connectors that mount
// fully drawn. CSS vars only, no hex literals.
import { User } from "lucide-react";
import { highlight } from "@/components/highlight";
import { Reveal } from "./Reveal";
import {
  ArrowMarkers,
  Box,
  CANVAS_W,
  Connector,
  ILLUS_H,
  MONO_FLOOR,
  NumChip,
  PROSE_FLOOR,
  PanelShell,
  TEXT_FLOOR,
  arrowIds,
  mono,
  prose,
} from "./E12Primitives";
import { e12Content as C, type E12PartId } from "../content";

const PANELS = C.panels;

/** A mono label drawn INSIDE an SVG — `fill`, not `color`. */
function monoFill(size: number, fill: string, ls = 0.14) {
  return { fontFamily: "var(--mono)", fontSize: size, letterSpacing: `${ls}em`, fill };
}

export function PartPanel({ id, reduced }: { id: E12PartId; reduced: boolean }) {
  switch (id) {
    case "heartbeat":
      return <HeartbeatsPanel reduced={reduced} />;
    case "beat":
      return <OneBeatPanel reduced={reduced} />;
    case "checker":
      return <CheckerPanel />;
    case "spine":
      return <SpinePanel reduced={reduced} />;
  }
}

// ───────────────────── 01 · the four heartbeats ─────────────────────

const KINDS = { height: 320, gap: 10 };
/**
 * THE CALLBACK ROW (§12.1 call 2, closed on gh#50). `/goal` is taught here as
 * kind 2 and is also E.11's Ralph card, so kind 2 carries one line naming that
 * card — `kinds[1].callback` in `../content.tsx`, where the reasoning sits.
 *
 * gh#49 RESERVED THIS HEIGHT ON ALL FOUR CARDS so the copy could land without a
 * re-layout, and the row stays reserved on the three cards that have no callback:
 * the four cards are read side by side, so their tool strips and analogies have
 * to sit on one line each. An `auto`-collapsing row would stagger them.
 */
const CALLBACK_RESERVE = 15;

function HeartbeatsPanel({ reduced }: { reduced: boolean }) {
  const heartbeat = PANELS.heartbeat;
  return (
    <PanelShell testid="e12-panel-heartbeat" title={heartbeat.title}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: KINDS.gap,
          height: KINDS.height,
        }}
      >
        {heartbeat.kinds.map((k, i) => (
          <Reveal key={k.name} on delay={80 + i * 90} style={{ display: "flex", minWidth: 0 }}>
            <Box
              testid={`e12-kind-${k.num}`}
              border="var(--copper-800)"
              style={{
                flex: 1,
                padding: "11px 12px",
                display: "flex",
                flexDirection: "column",
                // The card is taller than its copy, so the slack is SPREAD across
                // the rows. Dumping it in one place (an `auto` margin above the
                // analogy) leaves a hole in the middle of the card, which reads as
                // missing content rather than as air.
                justifyContent: "space-between",
                gap: 7,
                minWidth: 0,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span
                  className={reduced ? undefined : "e12-pulse"}
                  style={{ display: "inline-flex", animationDelay: `${i * 1.1}s` }}
                >
                  <NumChip n={k.num} />
                </span>
                <span className="e12-mono" style={mono(10.5, "var(--copper-100)", 0.14)}>
                  {k.name}
                </span>
              </div>
              {/* `also called run-until-done` — only kind 2 has one, and the row
                  is held open on all four so the cards stay in register. */}
              <div style={{ ...prose(PROSE_FLOOR, "var(--copper-300)", true), marginTop: -4, minHeight: 15 }}>
                {k.alt}
              </div>
              <div className="e12-prose" style={{ ...prose(12, "var(--neutral-200)"), minHeight: 48 }}>
                {highlight(k.desc, k.descKw)}
              </div>
              <div style={{ width: 26, height: 2, background: "var(--copper-500)" }} />
              <div style={{ ...prose(11.5, "var(--neutral-50)"), fontWeight: 600, minHeight: 30 }}>
                {k.stop}
              </div>
              {/* The tool strip is mono and keyword-free (§8.3), and it is THE
                  strip §12.1 call 3 was written about: 8.5px in the prototype,
                  9px after gh#49, and now `MONO_FLOOR` — the audit in
                  `scripts/projection-test.mjs --audit` holds it there. */}
              <div style={{ borderTop: "1px dotted var(--copper-800)", paddingTop: 6, minHeight: 30 }}>
                {k.tools.map((t) => (
                  <div
                    key={t}
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: MONO_FLOOR,
                      letterSpacing: "0.04em",
                      color: "var(--copper-200)",
                      lineHeight: 1.6,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {t}
                  </div>
                ))}
              </div>
              {/* Kind 2 only. `↩` because the room has met this heartbeat
                  already — decoration, so it is `aria-hidden` and the copy audit
                  sees only the string in `content.tsx`. */}
              <div
                data-testid={`e12-kind-${k.num}-callback-room`}
                style={{
                  ...prose(PROSE_FLOOR, "var(--copper-200)", true),
                  height: CALLBACK_RESERVE,
                  whiteSpace: "nowrap",
                }}
              >
                {"callback" in k ? (
                  <>
                    <span aria-hidden>↩ </span>
                    {highlight(k.callback, k.callbackKw)}
                  </>
                ) : null}
              </div>
              <div
                className="e12-prose"
                style={{
                  ...prose(10.5, "var(--copper-300)", true),
                  borderTop: "1px dotted var(--copper-800)",
                  paddingTop: 6,
                }}
              >
                {highlight(k.analogy, k.analogyKw)}
              </div>
            </Box>
          </Reveal>
        ))}
      </div>

      {/* the attended → unattended axis, with one beat travelling it */}
      <Reveal on delay={520} style={{ position: "absolute", left: 0, right: 0, top: KINDS.height + 20 }}>
        <div style={{ position: "relative", height: 34 }}>
          <svg width="100%" height="12" style={{ display: "block", overflow: "visible" }} aria-hidden>
            <ArrowMarkers scope="axis" bright="var(--copper-300)" />
            <line
              x1="0"
              y1="6"
              x2="98.6%"
              y2="6"
              stroke="var(--copper-700)"
              strokeWidth="1.2"
              markerEnd={`url(#${arrowIds("axis").arrow})`}
            />
            {[12.5, 37.5, 62.5, 87.5].map((p) => (
              <line
                key={p}
                x1={`${p}%`}
                y1="2"
                x2={`${p}%`}
                y2="10"
                stroke="var(--copper-600)"
                strokeWidth="1.2"
              />
            ))}
          </svg>
          {!reduced && <span className="e12-axis-spark" />}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
            <span style={mono(MONO_FLOOR, "var(--copper-100)", 0.2)}>{heartbeat.axis.left}</span>
            {/* correction 7 — this is the label that was illegible. */}
            <span style={prose(11, "var(--copper-200)", true)}>{heartbeat.axis.mid} →</span>
            <span style={mono(MONO_FLOOR, "var(--copper-100)", 0.2)}>{heartbeat.axis.right}</span>
          </div>
        </div>
      </Reveal>
    </PanelShell>
  );
}

// ───────────────────── 02 · inside one beat ─────────────────────

/** A clockwise arc between two angles, in degrees. */
function arc(cx: number, cy: number, r: number, a0: number, a1: number) {
  const rad = (d: number) => (d * Math.PI) / 180;
  const pt = (a: number) => `${(cx + r * Math.cos(rad(a))).toFixed(1)},${(cy + r * Math.sin(rad(a))).toFixed(1)}`;
  return `M${pt(a0)} A${r},${r} 0 0 1 ${pt(a1)}`;
}

/** `cy` centres the whole figure in the illustration band: the chips reach 147px
 *  either side of it, so `(ILLUS_H - 294) / 2 + 147` is the only value that leaves
 *  equal air above and below. */
const ORBIT = { cx: 300, cy: 205, r: 95 };
const CHIP = { width: 196, height: 44 };
/** Station chip centres sit OUTSIDE the ring — the arcs own the circle, the chips
 *  orbit it. N, E, S, W: clockwise, matching the arcs. */
const CHIP_POS = [
  { x: ORBIT.cx, y: ORBIT.cy - ORBIT.r - 30 },
  { x: ORBIT.cx + ORBIT.r + 104, y: ORBIT.cy },
  { x: ORBIT.cx, y: ORBIT.cy + ORBIT.r + 30 },
  { x: ORBIT.cx - ORBIT.r - 104, y: ORBIT.cy },
];
const ARC_ANGLES = [-90, 0, 90, 180];
const EXIT = { left: 612, top: 104, width: 180, midY: 139 };
/** Station i reveals here; the arc INTO station i and the exit read the same
 *  numbers, which is what "the connector reveals with its box" means. */
const chipDelay = (i: number) => 120 + i * 120;
const EXIT_DELAY = 560;

function OneBeatPanel({ reduced }: { reduced: boolean }) {
  const beat = PANELS.beat;
  const arrow = arrowIds("beat");

  return (
    <PanelShell testid="e12-panel-beat" title={beat.title}>
      <div style={{ position: "relative", height: ILLUS_H }}>
        <svg
          width={CANVAS_W}
          height={ILLUS_H}
          style={{ position: "absolute", inset: 0, overflow: "visible", pointerEvents: "none" }}
          aria-hidden
        >
          <ArrowMarkers scope="beat" bright="var(--copper-400)" />

          {/* the orbital field — three hairline halos behind the ring */}
          {[0.62, 0.8, 1.18].map((f) => (
            <circle
              key={f}
              cx={ORBIT.cx}
              cy={ORBIT.cy}
              r={ORBIT.r * f}
              fill="none"
              stroke="var(--copper-950)"
              strokeWidth={1}
            />
          ))}

          {/* Each arc arrives at the NEXT station, so it reveals on that
              station's frame — arc 3 closes the ring back onto station 1 and
              therefore comes last. */}
          {ARC_ANGLES.map((a, i) => (
            <Connector key={a} delay={chipDelay(i + 1)}>
              <path
                className="e12-draw"
                style={{ animationDelay: `${chipDelay(i + 1)}ms` }}
                d={arc(ORBIT.cx, ORBIT.cy, ORBIT.r, a + 14, a + 76)}
                fill="none"
                stroke="var(--copper-500)"
                strokeWidth={1.4}
                markerEnd={`url(#${arrow.arrow})`}
                pathLength={1}
              />
            </Connector>
          ))}

          {/* THE RUNTIME, RUNNING. The comet always mounts; only its motion node
              is gated, so a reduced-motion pose still renders complete with the
              comet at rest at the top of the orbit. */}
          <circle
            data-testid="e12-comet"
            r={3}
            fill="var(--copper-100)"
            cx={reduced ? ORBIT.cx : undefined}
            cy={reduced ? ORBIT.cy - ORBIT.r : undefined}
          >
            {!reduced && (
              <animateMotion
                dur="5s"
                repeatCount="indefinite"
                path={`M${ORBIT.cx},${ORBIT.cy - ORBIT.r} A${ORBIT.r},${ORBIT.r} 0 1 1 ${
                  ORBIT.cx - 0.01
                },${ORBIT.cy - ORBIT.r}`}
              />
            )}
          </circle>

          {/* the exit — the model stops asking */}
          <Connector delay={EXIT_DELAY}>
            <path
              d={`M${ORBIT.cx + ORBIT.r + 205},${ORBIT.cy} H${EXIT.left - 6} V${EXIT.midY} H${EXIT.left - 2}`}
              fill="none"
              stroke="var(--copper-600)"
              strokeWidth={1.2}
              strokeDasharray="4 4"
              markerEnd={`url(#${arrow.arrow})`}
            />
          </Connector>
        </svg>

        {beat.stations.map((s, i) => (
          <Reveal
            key={s.name}
            on
            delay={chipDelay(i)}
            style={{
              position: "absolute",
              left: CHIP_POS[i].x - CHIP.width / 2,
              top: CHIP_POS[i].y - CHIP.height / 2,
              width: CHIP.width,
              height: CHIP.height,
            }}
          >
            <Box
              testid={`e12-station-${s.num}`}
              border="var(--copper-700)"
              background="var(--neutral-900)"
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                gap: 9,
                padding: "0 11px",
              }}
            >
              <NumChip n={s.num} />
              <div style={{ minWidth: 0 }}>
                <div className="e12-mono" style={mono(10, "var(--copper-100)", 0.12)}>
                  {s.name}
                </div>
                <div
                  className="e12-prose"
                  style={{ ...prose(10.5, TEXT_FLOOR, true), whiteSpace: "nowrap" }}
                >
                  {s.sub}
                </div>
              </div>
            </Box>
          </Reveal>
        ))}

        <Reveal
          on
          delay={420}
          style={{ position: "absolute", left: ORBIT.cx - 78, top: ORBIT.cy - 26, width: 156, textAlign: "center" }}
        >
          <span style={prose(12.5, TEXT_FLOOR, true)}>{highlight(beat.center, beat.centerKw)}</span>
        </Reveal>

        <Reveal on delay={EXIT_DELAY} style={{ position: "absolute", left: EXIT.left, top: EXIT.top, width: EXIT.width }}>
          <Box
            testid="e12-beat-exit"
            border="var(--copper-700)"
            dashed
            style={{ width: "100%", padding: "11px 14px" }}
          >
            <div className="e12-prose" style={{ ...prose(12.5, "var(--neutral-50)"), fontWeight: 600 }}>
              {highlight(beat.exitTitle, beat.exitTitleKw)}
            </div>
            <div className="e12-prose" style={{ ...prose(11, TEXT_FLOOR, true), marginTop: 5 }}>
              {highlight(beat.exitSub, beat.exitSubKw)}
            </div>
          </Box>
        </Reveal>
      </div>
    </PanelShell>
  );
}

// ───────────────────── 03 · the checker ladder ─────────────────────

const RUNGS = { height: 246, gap: 12 };

function CheckerPanel() {
  const checker = PANELS.checker;
  const arrow = arrowIds("ladder");

  return (
    <PanelShell testid="e12-panel-checker" title={checker.title}>
      {/* strongest → weakest: the axis the three rungs hang off */}
      <div style={{ position: "relative", height: 26 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <span style={mono(MONO_FLOOR, "var(--copper-300)", 0.2)}>{checker.axisL}</span>
          <span style={mono(MONO_FLOOR, "var(--copper-300)", 0.2)}>{checker.axisR}</span>
        </div>
        <svg width="100%" height="10" style={{ display: "block", overflow: "visible" }} aria-hidden>
          <ArrowMarkers scope="ladder" bright="var(--copper-400)" />
          <line
            x1="0"
            y1="5"
            x2="98.8%"
            y2="5"
            stroke="var(--copper-700)"
            strokeWidth="1.2"
            markerEnd={`url(#${arrow.arrow})`}
          />
          {[16.6, 50, 83.3].map((p, i) => (
            <circle
              key={p}
              cx={`${p}%`}
              cy="5"
              r="3.4"
              fill={i === 2 ? "var(--copper-500)" : "var(--copper-300)"}
            />
          ))}
        </svg>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: RUNGS.gap,
          marginTop: 10,
          height: RUNGS.height,
        }}
      >
        {checker.rungs.map((r, i) => (
          <Reveal key={r.name} on delay={100 + i * 110} style={{ display: "flex", minWidth: 0 }}>
            <Box
              testid={`e12-rung-${r.num}`}
              // The weakest rung keeps a bright border on purpose: "a claim, not
              // a proof" is the rung the room has to remember.
              border={r.claim ? "var(--copper-500)" : "var(--copper-800)"}
              style={{
                flex: 1,
                padding: "13px 15px",
                display: "flex",
                flexDirection: "column",
                gap: 9,
                minWidth: 0,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                <NumChip n={r.num} />
                <span className="e12-mono" style={mono(11, "var(--copper-100)", 0.14)}>
                  {r.name}
                </span>
              </div>
              <div style={{ height: 1, background: "var(--copper-900)" }} />
              <div
                className="e12-prose"
                style={{ ...prose(12, "var(--neutral-200)"), lineHeight: 1.45, flex: 1 }}
              >
                {highlight(r.desc, r.descKw)}
              </div>
              <span
                style={{
                  alignSelf: "flex-start",
                  padding: "3px 12px",
                  background: r.claim ? "var(--copper-500)" : "var(--copper-900)",
                  ...mono(9.5, r.claim ? "var(--neutral-950)" : "var(--copper-100)", 0.12),
                }}
              >
                {r.badge}
              </span>
            </Box>
          </Reveal>
        ))}
      </div>

      {/* THE HUMAN GATE WIDENS AS THE PROOF THINS. The bars are the argument:
          each one is as wide as the judgment its rung leaves to a person. */}
      <Reveal on delay={480} style={{ marginTop: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
          <span aria-hidden style={{ display: "flex", color: "var(--copper-400)" }}>
            <User size={13} />
          </span>
          <span style={mono(9.5, "var(--copper-300)", 0.22)}>{checker.gateLabel}</span>
          <div style={{ flex: 1, height: 1, background: "var(--copper-900)" }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: RUNGS.gap }}>
          {checker.rungs.map((r, i) => (
            <div key={r.name} data-testid={`e12-gate-${r.num}`} data-gate-width={r.gateWidth}>
              <div style={{ display: "flex", alignItems: "center", height: 9 }}>
                <div style={{ width: 2, height: 9, background: "var(--copper-300)" }} />
                <div
                  className="e12-grow"
                  style={{
                    width: `${r.gateWidth * 100}%`,
                    height: 5,
                    background: "var(--copper-500)",
                    animationDelay: `${560 + i * 140}ms`,
                  }}
                />
                <div style={{ width: 2, height: 9, background: "var(--copper-300)" }} />
              </div>
              <div style={{ marginTop: 6 }}>
                <span style={{ ...prose(11, "var(--neutral-50)"), fontWeight: 600 }}>{r.gate}: </span>
                <span style={prose(11, TEXT_FLOOR)}>{r.gateDesc}</span>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </PanelShell>
  );
}

// ───────────────────── 04 · the spine ─────────────────────

const RUN_DELAY = [100, 360];
/** The wipe's two dashed segments point INTO run 2, so the block reveals on run
 *  2's frame and not before it (correction 5). */
const WIPE_DELAY = RUN_DELAY[1];
const REPO_DELAY = 480;

function SpinePanel({ reduced }: { reduced: boolean }) {
  const spine = PANELS.spine;
  const arrow = arrowIds("spine");

  return (
    <PanelShell testid="e12-panel-spine" title={spine.title}>
      <div
        style={{
          height: ILLUS_H,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 4,
        }}
      >
        {/* two runs, one amnesia between them */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 168px 1fr", gap: 14 }}>
          {([0, 1] as const).map((ri) => (
            <Reveal
              key={spine.runs[ri].name}
              on
              delay={RUN_DELAY[ri]}
              style={{ order: ri === 0 ? 0 : 2, display: "flex", minWidth: 0 }}
            >
              <Box
                testid={`e12-run-${ri + 1}`}
                border="var(--copper-500)"
                dashed
                style={{ flex: 1, padding: "10px 14px", minWidth: 0 }}
              >
                <div className="e12-mono" style={mono(9.5, "var(--copper-100)", 0.16)}>
                  {spine.runs[ri].name}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 9 }}>
                  {spine.runs[ri].steps.map((st, i) => (
                    <div key={st} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <NumChip n={String(i + 1)} size={14} />
                      <span className="e12-prose" style={prose(11.5, "var(--neutral-200)")}>
                        {st}
                      </span>
                    </div>
                  ))}
                </div>
              </Box>
            </Reveal>
          ))}

          <Reveal on delay={WIPE_DELAY} style={{ order: 1, textAlign: "center", alignSelf: "center" }}>
            {/* No `Connector` here: these two lines and their tip sit INSIDE the
                Reveal that carries the ✕ and its caption, so they already fade in
                on the same frame as the block they belong to (correction 5). */}
            <svg width={168} height={22} style={{ display: "block" }} aria-hidden>
              <ArrowMarkers scope="spine" bright="var(--copper-600)" />
              <line x1="2" y1="11" x2="62" y2="11" stroke="var(--copper-600)" strokeWidth="1.2" strokeDasharray="4 4" />
              <line
                x1="106"
                y1="11"
                x2="160"
                y2="11"
                stroke="var(--copper-600)"
                strokeWidth="1.2"
                strokeDasharray="4 4"
                markerEnd={`url(#${arrow.arrow})`}
              />
            </svg>
            <div
              className={reduced ? undefined : "e12-stamp"}
              style={{
                position: "relative",
                marginTop: -22,
                fontFamily: "var(--mono)",
                fontSize: 16,
                fontWeight: 700,
                color: "var(--copper-400)",
                animationDelay: "620ms",
              }}
            >
              ✕
            </div>
            <div style={{ ...prose(10.5, "var(--copper-300)", true), marginTop: 6 }}>
              {highlight(spine.wipe, spine.wipeKw)}
            </div>
          </Reveal>
        </div>

        {/* read ↑ / write ↓ between each run and the one continuous thing. The
            lines span the FULL band, so each one visibly touches the run box above
            and the repo band below — a connector with air at both ends reads as a
            fragment. */}
        <div style={{ position: "relative", height: 52 }}>
          <svg width="100%" height="52" style={{ display: "block", overflow: "visible" }} aria-hidden>
            <ArrowMarkers scope="rw" />
            {[9, 84].map((base) => (
              <Connector key={base} delay={REPO_DELAY}>
                <line
                  className={reduced ? undefined : "e12-dash-slow"}
                  x1={`${base}%`}
                  y1="52"
                  x2={`${base}%`}
                  y2="1"
                  stroke="var(--copper-500)"
                  strokeWidth="1.1"
                  markerEnd={`url(#${arrowIds("rw").arrow})`}
                />
                <line
                  className={reduced ? undefined : "e12-dash-slow"}
                  x1={`${base + 7}%`}
                  y1="0"
                  x2={`${base + 7}%`}
                  y2="51"
                  stroke="var(--copper-500)"
                  strokeWidth="1.1"
                  markerEnd={`url(#${arrowIds("rw").arrow})`}
                />
                <text x={`${base - 1.6}%`} y="30" textAnchor="end" style={monoFill(MONO_FLOOR, "var(--copper-300)")}>
                  {spine.read.toUpperCase()}
                </text>
                <text x={`${base + 8.6}%`} y="30" style={monoFill(MONO_FLOOR, "var(--copper-300)")}>
                  {spine.write.toUpperCase()}
                </text>
              </Connector>
            ))}
          </svg>
          <Reveal on delay={700} style={{ position: "absolute", left: "30%", right: "30%", top: 12, textAlign: "center" }}>
            <span style={prose(10.5, "var(--copper-300)", true)}>{highlight(spine.lesson, spine.lessonKw)}</span>
          </Reveal>
        </div>

        {/* the repo — the only continuous thing in the picture */}
        <Reveal on delay={REPO_DELAY}>
          <Box
            testid="e12-repo"
            border="var(--copper-600)"
            background="var(--copper-950)"
            style={{ padding: "10px 14px" }}
          >
            <div className="e12-mono" style={mono(9.5, "var(--copper-300)", 0.22)}>
              {spine.repoTitle}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 9 }}>
              {spine.files.map((f, i) => (
                <Box
                  key={f.name}
                  testid={`e12-diary-${i}`}
                  border="var(--copper-800)"
                  background="var(--neutral-900)"
                  style={{ padding: "8px 12px", minWidth: 0 }}
                >
                  <div style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    <span
                      className="e12-mono"
                      style={{ fontFamily: "var(--mono)", fontSize: 10.5, color: "var(--copper-100)" }}
                    >
                      {f.name}
                    </span>
                    <span style={prose(11, "var(--copper-300)", true)}> — {f.role}</span>
                  </div>
                  <div className="e12-prose" style={{ ...prose(10.5, TEXT_FLOOR), marginTop: 4 }}>
                    {highlight(f.desc, f.descKw)}
                  </div>
                </Box>
              ))}
            </div>
          </Box>
        </Reveal>
      </div>
    </PanelShell>
  );
}
