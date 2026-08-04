// E.12 · LOOP ENGINEERING — pose 0, the mindset diptych.
//
// THE ARGUMENT, drawn twice. Left: prompting turn by turn — four chips on an
// endless relay with a dashed "round and round" return path, which is a picture of a
// system that cannot run without a person in it. Right: a loop drawn as the
// system it is — one heartbeat feeding four stations, a spine read first and
// written last, a person at ONE gate. The left panel visibly cannot run without
// you; the right one visibly can, and that contrast is the slide's thesis (§8.3).
// It is carried by motion, not by a caption: the relay cycles, the EKG sweeps,
// and a token runs the right column end to end.
//
// GEOMETRY IS SHARED, NOT REPEATED. `LEFT` and `RIGHT` hold the two panels'
// boxes and the quote blocks read their own `left` from those same constants,
// which is what makes owner correction 3 (a quote's left edge aligns with its
// panel's left border) true by construction and not by two numbers that happen to
// agree today. `VERDICT`
// does the same job for correction 1: one block, one fixed height, one fixed
// offset off the panel's bottom, used by both panels — so the two verdict
// dividers land at the same y whatever the copy does.
//
// Rewritten from `src/slides/prototype-gh19b-e12-loop-engineering/Step0Mindset.tsx`,
// not lifted: the prototype is inline-styled throughout with no shared boxes and
// no hover. CSS vars only, no hex literals.
//
// THE PRIMITIVES MOVED OUT on gh#49. `Box`, the two type registers, the EKG and
// the arrow markers were defined here when pose 0 was the whole slide; poses 1
// and 2 draw with the same ones, so they now live in `./E12Primitives` and this
// file imports them. Nothing about them changed in the move.
import type { CSSProperties } from "react";
import { Bot, User } from "lucide-react";
import { highlight } from "@/components/highlight";
import { Reveal } from "./Reveal";
import {
  ArrowMarkers,
  Box,
  Ekg,
  MONO_FLOOR,
  PROSE_FLOOR,
  TEXT_FLOOR,
  arrowIds,
  edgeLabel,
  mono,
  prose,
} from "./E12Primitives";
import { e12Content as C } from "../content";

const M = C.mindset;

// ───────────────────── geometry ─────────────────────
// Stage coordinates: the diptych owns everything below the headline. The area is
// 1184 wide (1280 less the deck's 48px gutters), and the two panels plus the
// bridge between them fill it exactly.

const AREA = { left: 48, right: 48, top: 152, bottom: 26 };
const AREA_W = 1280 - AREA.left - AREA.right;

const PANEL_H = 424;
/** Panel padding, and therefore the inset every absolutely-placed child of a
 *  panel measures from. A panel's own 1px border sits outside this. */
const PANEL_PAD = { x: 18, y: 14 };

const LEFT = { left: 0, width: 486 };
const RIGHT = { left: AREA_W - 584, width: 584 };
const BRIDGE = { left: LEFT.width, width: RIGHT.left - LEFT.width, top: 150 };

/** The verdict block, IDENTICAL in both panels — see the header. The height is
 *  the divider (1) + its padding (11) + one line of title (~21) + one line of
 *  body (~17), and it is fixed rather than flowed so that a copy edit can never
 *  move one panel's divider without moving the other's. */
const VERDICT = { bottom: 14, height: 56 };

const QUOTES_TOP = 446;

// ───────────────────── the verdict ─────────────────────

/** A panel's verdict: the claim, then the reason. One component and one set of
 *  offsets for both panels — see `VERDICT`. */
function Verdict({
  testid,
  title,
  body,
  bodyKw,
}: {
  testid: string;
  title: string;
  body: string;
  bodyKw: readonly string[];
}) {
  return (
    <div
      data-testid={testid}
      style={{
        position: "absolute",
        left: PANEL_PAD.x,
        right: PANEL_PAD.x,
        bottom: VERDICT.bottom,
        height: VERDICT.height,
        borderTop: "1px solid var(--copper-900)",
        paddingTop: 11,
        boxSizing: "border-box",
      }}
    >
      <div style={{ ...prose(15.5, "var(--neutral-50)"), fontWeight: 600 }}>{title}</div>
      <div style={{ ...prose(12.5, "var(--neutral-300)", true), marginTop: 5 }}>
        {highlight(body, bodyKw)}
      </div>
    </div>
  );
}

// ───────────────────── the diptych ─────────────────────

export function E12MindsetDiptych() {
  // SMIL is invisible to the global prefers-reduced-motion rule in globals.css
  // (it squashes CSS animations only), so the one motion node is gated at mount
  // — the same gate `RingStack`'s orbit uses.
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches === true;

  return (
    <div
      data-testid="e12-mindset"
      style={{
        position: "absolute",
        left: AREA.left,
        right: AREA.right,
        top: AREA.top,
        bottom: AREA.bottom,
      }}
    >
      <Reveal
        on
        delay={60}
        style={{ position: "absolute", left: LEFT.left, top: 0, width: LEFT.width, height: PANEL_H }}
      >
        <TurnByTurn />
      </Reveal>

      <Reveal
        on
        delay={330}
        style={{
          position: "absolute",
          left: BRIDGE.left,
          top: BRIDGE.top,
          width: BRIDGE.width,
          textAlign: "center",
        }}
      >
        <Bridge />
      </Reveal>

      <Reveal
        on
        delay={180}
        style={{
          position: "absolute",
          left: RIGHT.left,
          top: 0,
          width: RIGHT.width,
          height: PANEL_H,
        }}
      >
        <LoopSystem reduced={reduced} />
      </Reveal>

      <Quotes />
    </div>
  );
}

// ───────────────────── left — the relay ─────────────────────

const ROW = { height: 46, gap: 24, width: 310, top: 48 };
const rowTop = (i: number) => i * (ROW.height + ROW.gap);
const rowMid = (i: number) => rowTop(i) + ROW.height / 2;
/**
 * THE RELAY IS A THREE-ROW LOOP WITH A ONE-ROW ENTRY (owner call, 2026-08-04).
 *
 * Row 01 is how you ENTER the relay; rows 02–04 are the turn you can never leave
 * — the agent replies, you read it, you type again, and the next thing that
 * happens is the agent replying again. So the return path lands on row 02, not on
 * row 01, and the highlight travels 01 → 02 → 03 → 04 → 02 → 03 → 04 → …
 *
 * The cycle holds THREE slots (`LOOP_ROWS`), 1.5s each, which is the slot width
 * the four-row version shipped with. Rows 02–04 take slot delays of 1, 2 and 3
 * slots: row 04's delay is a WHOLE period, so its first highlight lands after row
 * 01's and every later one lands after row 03's. Row 01 runs the same keyframe
 * ONCE (`animationIterationCount`) and then rests — a row that keeps re-lighting
 * would say the loop returns to it, which is the thing this arrangement denies.
 */
const LOOP_ROWS = 3;
const SLOT_S = 1.5;
const CYCLE_S = LOOP_ROWS * SLOT_S;

function TurnByTurn() {
  const L = M.left;
  const railX = ROW.width / 2; // the down-arrows' centreline
  const svgH = rowTop(3) + ROW.height;
  const arrow = arrowIds("relay");

  return (
    <div
      data-testid="e12-panel-prompting"
      style={{
        position: "relative",
        height: "100%",
        border: "1px solid var(--copper-900)",
        padding: `${PANEL_PAD.y}px ${PANEL_PAD.x}px`,
        boxSizing: "border-box",
      }}
    >
      <div style={mono(10.5, "var(--copper-300)", 0.22)}>{L.title}</div>

      {/* The rows are IN FLOW, one flex item each, and the connector SVG is the
          one absolute child. `.fade`'s translateY makes every Reveal a containing
          block, so an absolutely-placed row would measure from its own wrapper
          and not from this column — the flex gap is what keeps the rows and the
          SVG's `rowTop` arithmetic agreeing. */}
      <div
        style={{
          position: "absolute",
          left: PANEL_PAD.x,
          top: ROW.top,
          width: ROW.width,
          display: "flex",
          flexDirection: "column",
          gap: ROW.gap,
        }}
      >
        {L.rows.map((r, i) => (
          <Reveal key={r.text} on delay={140 + i * 80}>
            <Box
              testid={`e12-turn-${i}`}
              border="var(--copper-900)"
              className="f-card-cycle"
              style={{
                height: ROW.height,
                display: "flex",
                alignItems: "center",
                gap: 11,
                padding: "0 13px",
                // Each row owns one slot of the relay — see `LOOP_ROWS`. The
                // class is the deck-wide highlight cycle, parameterized
                // (globals.css); row 01 runs it once and drops out.
                "--cycle-duration": `${CYCLE_S}s`,
                "--cycle-delay": `${i * SLOT_S}s`,
                ...(i === 0 ? { animationIterationCount: 1 } : null),
              } as CSSProperties}
            >
              <span className="e12-mono" style={mono(9.5, "var(--copper-500)", 0.12)}>
                0{i + 1}
              </span>
              <span
                aria-hidden
                style={{
                  display: "flex",
                  color: r.who === "you" ? "var(--copper-300)" : "var(--neutral-400)",
                }}
              >
                {r.who === "you" ? <User size={14} /> : <Bot size={14} />}
              </span>
              <span className="e12-prose" style={prose(14, "var(--neutral-100)")}>
                {r.text}
              </span>
            </Box>
          </Reveal>
        ))}

        {/* the turns' order, and the way back up: your next turn */}
        <svg
          width={430}
          height={svgH}
          style={{ position: "absolute", left: 0, top: 0, overflow: "visible", pointerEvents: "none" }}
          aria-hidden
        >
          <ArrowMarkers scope="relay" />
          {[0, 1, 2].map((i) => (
            <line
              key={i}
              x1={railX}
              y1={rowTop(i) + ROW.height + 3}
              x2={railX}
              y2={rowTop(i + 1) - 4}
              stroke="var(--copper-500)"
              strokeWidth={1.2}
              markerEnd={`url(#${arrow.arrow})`}
            />
          ))}
          {/* round and round — the turn has no exit, which is why this path
              exists and why it never leaves the panel. It lands on ROW 02: row 01
              is the entry, and what follows your next prompt is the agent
              replying again (see `LOOP_ROWS`). The LABEL names the repetition and
              not the person, because since the arc moved it points at the box
              where the AGENT speaks — `mindset.left.returnLabel` in
              `../content.tsx` carries that reasoning. The label sits on the arc's
              own midpoint, which is row 03's centreline. */}
          <path
            className="f-arrow-stream"
            d={`M${ROW.width + 6},${rowMid(3)} H345 V${rowMid(1)} H${ROW.width + 12}`}
            fill="none"
            stroke="var(--copper-600)"
            strokeWidth={1.2}
            markerEnd={`url(#${arrow.dim})`}
          />
          <text x={356} y={rowMid(2) + 4} style={edgeLabel(12)}>
            {L.returnLabel}
          </text>
        </svg>
      </div>

      <Verdict
        testid="e12-verdict-prompting"
        title={L.verdictTitle}
        body={L.verdict}
        bodyKw={L.verdictKw}
      />
    </div>
  );
}

// ───────────────────── the bridge ─────────────────────

function Bridge() {
  return (
    <div
      data-testid="e12-bridge"
      style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}
    >
      {M.bridge.map((word) => (
        <span key={word} style={mono(MONO_FLOOR, "var(--copper-400)", 0.3)}>
          {word}
        </span>
      ))}
      {/* ››› — the leverage moving, left to right */}
      <svg width={64} height={18} style={{ marginTop: 6 }} aria-hidden>
        {[0, 1, 2].map((i) => (
          <path
            key={i}
            className="e12-chevron"
            d={`M${14 + i * 14},3 L${23 + i * 14},9 L${14 + i * 14},15`}
            fill="none"
            stroke="var(--copper-400)"
            strokeWidth={1.6}
            style={{ "--chev-delay": `${i * 0.28}s` } as CSSProperties}
          />
        ))}
      </svg>
    </div>
  );
}

// ───────────────────── right — the system ─────────────────────

// Scene coordinates, local to the panel's inner box.
const SCENE = { left: PANEL_PAD.x, top: 42, width: 548, height: 292 };
const COLUMN_X = 294; // the stations' centreline, and the token's track
/** The station chips. `x` and `width` stay centred on `COLUMN_X` — 8px wider
 *  than gh#48 shipped them, because `the checker — a second agent` was reaching
 *  2px into the chip's own right padding (found by
 *  `scripts/projection-test.mjs e12 --audit`, gh#50 call 3). The `risky` escape
 *  measures from `NODE.x + NODE.width`, so it follows the edge on its own. */
const NODE = { x: 190, width: 208, height: 30, top: 44, pitch: 42 };
const nodeTop = (i: number) => NODE.top + i * NODE.pitch;
const nodeMid = (i: number) => nodeTop(i) + NODE.height / 2;
/** The heartbeat pill. 330 wide, not gh#48's 300: at `MONO_FLOOR` the label
 *  needs ~301px next to the EKG and was WRAPPING inside a 30px pill (gh#50 call
 *  3). Centred on `COLUMN_X`, so it still clears the scene on both sides. */
const HEARTBEAT = { width: 330, height: 30 };
const SPINE = { left: 0, width: 140 };
const GATE = { left: 144, top: 240, width: 344, height: 48 };

function LoopSystem({ reduced }: { reduced: boolean }) {
  const R = M.right;
  const spineTop = nodeMid(1) - 10;
  const arrow = arrowIds("loop");

  return (
    <div
      data-testid="e12-panel-looping"
      style={{
        position: "relative",
        height: "100%",
        border: "1px solid var(--copper-700)",
        padding: `${PANEL_PAD.y}px ${PANEL_PAD.x}px`,
        boxSizing: "border-box",
      }}
    >
      <div style={mono(10.5, "var(--copper-100)", 0.22)}>{R.title}</div>

      <div
        style={{
          position: "absolute",
          left: SCENE.left,
          top: SCENE.top,
          width: SCENE.width,
          height: SCENE.height,
        }}
      >
        {/*
          §12.1 CALL 4, CLOSED 2026-08-04 (gh#50): CONFIRMED AS BUILT — the
          connectors MOUNT WITH THE PANEL, and there is no draw-in.

          The call was open because poses 1 and 2 do the opposite: every connector
          there reveals with the box it points into (gh#49 correction 5, `Connector`
          in `./E12Primitives`). This pose is deliberately not those poses.

          Pose 0 is a POSTER whose argument is a COMPARISON: the left panel cannot
          run without you, the right one can. The audience has to be able to read
          both wirings at once for that contrast to land, and a ~1s draw-in would
          animate the very lines being compared — the right panel would assemble
          itself while the left one sat finished, which reads as "the right one is
          newer", not "the right one runs on its own".

          The pose also has its motion budget spent, on the two things that ARE the
          argument: the left panel's relay cycling through four turns it can never
          leave, and the token below running the right column unattended. A third
          moving layer competes with both.

          Nothing about a build-up is cheap here either: the presenter talks over
          this pose from the first second, and the connectors are the map they talk
          against.
        */}
        {/* connective tissue — drawn first, so the boxes sit on top of it */}
        <svg
          width={SCENE.width}
          height={SCENE.height}
          style={{ position: "absolute", inset: 0, overflow: "visible", pointerEvents: "none" }}
          aria-hidden
        >
          <ArrowMarkers scope="loop" />

          {/* the heartbeat's feed into DISCOVER, then station to station */}
          <line
            x1={COLUMN_X}
            y1={HEARTBEAT.height}
            x2={COLUMN_X}
            y2={nodeTop(0) - 3}
            stroke="var(--copper-400)"
            strokeWidth={1.2}
            markerEnd={`url(#${arrow.arrow})`}
          />
          {[0, 1, 2].map((i) => (
            <line
              key={i}
              x1={COLUMN_X}
              y1={nodeTop(i) + NODE.height}
              x2={COLUMN_X}
              y2={nodeTop(i + 1) - 3}
              stroke="var(--copper-400)"
              strokeWidth={1.2}
              markerEnd={`url(#${arrow.arrow})`}
            />
          ))}

          {/* the spine's two errands: READ FIRST into discover, WRITTEN LAST out
              of commit. Dashed, because neither is the work itself. */}
          <path
            className="f-arrow-stream"
            d={`M${SPINE.width},${spineTop} H165 V${nodeMid(0)} H${NODE.x - 4}`}
            fill="none"
            stroke="var(--copper-600)"
            strokeWidth={1.1}
            markerEnd={`url(#${arrow.arrow})`}
          />
          <path
            className="f-arrow-stream"
            d={`M${NODE.x},${nodeMid(3)} H165 V${spineTop + 40} H${SPINE.width + 4}`}
            fill="none"
            stroke="var(--copper-600)"
            strokeWidth={1.1}
            markerEnd={`url(#${arrow.arrow})`}
          />
          <text x={COLUMN_X + 9} y={nodeTop(3) - 5} style={edgeLabel()}>
            {R.pass}
          </text>

          {/* risky — VERIFY's escape, right and down into the one gate */}
          <path
            d={`M${NODE.x + NODE.width},${nodeMid(2)} H512 V${GATE.top + 24} H${
              GATE.left + GATE.width
            }`}
            fill="none"
            stroke="var(--copper-500)"
            strokeWidth={1.1}
            strokeDasharray="4 4"
            markerEnd={`url(#${arrow.arrow})`}
          />
          <text x={520} y={200} style={edgeLabel()}>
            {R.risky}
          </text>

          {/* approved — the gate hands it back to COMMIT and nowhere else */}
          <line
            x1={214}
            y1={GATE.top - 2}
            x2={214}
            y2={nodeTop(3) + NODE.height + 4}
            stroke="var(--copper-500)"
            strokeWidth={1.1}
            markerEnd={`url(#${arrow.arrow})`}
          />
          <text x={222} y={GATE.top - 12} style={edgeLabel()}>
            {R.approved}
          </text>

          {/* ONE BEAT, RUNNING — the only moving part no human touches, and the
              half of the thesis a caption cannot carry.

              THE CIRCLE ALWAYS MOUNTS; only the <animateMotion> is gated. A
              reduced-motion pose has to render COMPLETE, so the token rests at the
              top of the column — where the heartbeat hands the beat over — instead
              of leaving the column bare. SMIL is invisible to the global CSS
              reduced-motion rule, which is why the gate is here and not in
              globals.css. */}
          <circle
            data-testid="e12-token"
            r={2.6}
            fill="var(--copper-100)"
            cx={reduced ? COLUMN_X : undefined}
            cy={reduced ? HEARTBEAT.height : undefined}
          >
            {!reduced && (
              <animateMotion
                dur="3.4s"
                repeatCount="indefinite"
                path={`M${COLUMN_X},${HEARTBEAT.height} V${nodeTop(3) + NODE.height}`}
              />
            )}
          </circle>
        </svg>

        <Box
          testid="e12-heartbeat"
          border="var(--copper-600)"
          background="var(--copper-950)"
          style={{
            position: "absolute",
            left: COLUMN_X - HEARTBEAT.width / 2,
            top: 0,
            width: HEARTBEAT.width,
            height: HEARTBEAT.height,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
          }}
        >
          <Ekg />
          {/* `nowrap` is load-bearing: a wrapped label spills out of a 30px
              pill, and a wrap is the one overflow the audit cannot see. */}
          <span
            className="e12-mono"
            style={{ ...mono(MONO_FLOOR, "var(--copper-200)", 0.16), whiteSpace: "nowrap" }}
          >
            {R.heartbeat}
          </span>
        </Box>

        {R.stations.map((s, i) => (
          <Box
            key={s.label}
            testid={`e12-station-${s.label.toLowerCase()}`}
            border="var(--copper-800)"
            background="var(--neutral-900)"
            style={{
              position: "absolute",
              left: NODE.x,
              top: nodeTop(i),
              width: NODE.width,
              height: NODE.height,
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "0 10px",
            }}
          >
            <span className="e12-mono" style={mono(9.5, "var(--copper-200)", 0.14)}>
              {s.label}
            </span>
            <span
              className="e12-prose"
              style={{ ...prose(PROSE_FLOOR, TEXT_FLOOR, true), whiteSpace: "nowrap" }}
            >
              {s.sub}
            </span>
          </Box>
        ))}

        <Box
          testid="e12-spine"
          border="var(--copper-700)"
          background="var(--neutral-900)"
          style={{
            position: "absolute",
            left: SPINE.left,
            top: spineTop,
            width: SPINE.width,
            padding: "7px 11px",
          }}
        >
          <div className="e12-mono" style={mono(MONO_FLOOR, "var(--copper-400)", 0.22)}>
            {R.spine.label}
          </div>
          {/* the file name is mono and never highlighted — it is a path, not prose */}
          <div
            className="e12-mono"
            style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--copper-100)", marginTop: 2 }}
          >
            {R.spine.file}
          </div>
          <div
            className="e12-prose"
            style={{ ...prose(PROSE_FLOOR, TEXT_FLOOR, true), marginTop: 2 }}
          >
            {R.spine.sub}
          </div>
        </Box>

        <Box
          testid="e12-gate"
          border="var(--copper-600)"
          background="var(--copper-950)"
          style={{
            position: "absolute",
            left: GATE.left,
            top: GATE.top,
            width: GATE.width,
            height: GATE.height,
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "0 14px",
          }}
        >
          <span aria-hidden style={{ display: "flex", color: "var(--copper-300)" }}>
            <User size={16} />
          </span>
          <div>
            <div className="e12-mono" style={mono(9.5, "var(--copper-100)", 0.16)}>
              {R.gate.label}
            </div>
            <div
              className="e12-prose"
              style={{ ...prose(11, "var(--neutral-300)", true), marginTop: 2 }}
            >
              {highlight(R.gate.sub, R.gate.subKw)}
            </div>
          </div>
        </Box>
      </div>

      <Verdict
        testid="e12-verdict-looping"
        title={R.verdictTitle}
        body={R.verdict}
        bodyKw={R.verdictKw}
      />
    </div>
  );
}

// ───────────────────── the two practitioners ─────────────────────

/**
 * The two people who renamed the job, one under each panel.
 *
 * PLACED, NOT FLOWED. Owner correction 3 asks each quote's left edge to align
 * with the left border of the panel above it, so each block takes its `left` and
 * `width` from that panel's own constants — the alignment cannot drift, and the
 * copper rule down the left edge reads as the panel's border continuing.
 */
function Quotes() {
  const columns = [LEFT, RIGHT];
  return (
    <>
      {M.quotes.map((q, i) => (
        <Reveal
          key={q.attr}
          on
          delay={480 + i * 140}
          data-testid={i === 0 ? "e12-quote-left" : "e12-quote-right"}
          style={{
            position: "absolute",
            left: columns[i].left,
            width: columns[i].width,
            top: QUOTES_TOP,
          }}
        >
          <div style={{ borderLeft: "2px solid var(--copper-600)", paddingLeft: 16 }}>
            <p style={{ ...prose(14.5, "var(--neutral-100)", true), margin: 0, lineHeight: 1.4 }}>
              “{highlight(q.text, q.kw)}”
            </p>
            <div style={{ ...mono(9.5, "var(--copper-400)"), marginTop: 7 }}>— {q.attr}</div>
          </div>
        </Reveal>
      ))}
    </>
  );
}
