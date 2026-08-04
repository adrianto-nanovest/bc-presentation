// E.12 · LOOP ENGINEERING — pose 2: the worked example.
//
// The morning-triage loop, one beat, end to end: 9:00 → read the spine → find the
// work → draft in its own worktree (the maker) → a separate reviewer grades it
// (the checker) → THE VERDICT? forks to "needs a human" or a PR → update the spine
// → dashed return, again tomorrow at 9:00.
//
// THE RAIL IS STILL THE INDEX. Hovering a part lights exactly the stages that part
// owns and demotes the rest — `e12Content.lights` is that table, and it is the
// whole reason this pose follows pose 1: the anatomy, then the anatomy wearing a
// name badge. RANK IS A COLOUR TIER, NEVER OPACITY (§8.3): a demoted stage moves
// its border to copper-900 and its text to neutral-400, and nothing on the pose
// ever rests semi-transparent.
//
// TWO DAY-TOKENS run the flow on alternating laps — one lap passes and opens a PR,
// the next fails and flags a person. That is the closer, drawn: "You wake up to
// two PRs and one flagged decision. You typed nothing."
//
// Rewritten from `prototype-gh19b-e12-loop-engineering/TriagePanel.tsx`: inline
// styles, a kicker line this ticket deletes, and connectors whose arrow tips
// mounted before their boxes.
import { highlight } from "@/components/highlight";
import { Reveal } from "./Reveal";
import {
  ArrowMarkers,
  Box,
  CANVAS_W,
  Connector,
  DEMOTED_TEXT,
  Ekg,
  ILLUS_H,
  NumChip,
  PanelShell,
  TEXT_FLOOR,
  arrowIds,
  mono,
  prose,
} from "./E12Primitives";
import { e12Content as C, type E12PartId, type E12StageId } from "../content";

const T = C.triage;

// ───────────────────── geometry ─────────────────────
// Local to the illustration area: one centre column, one fork, one return run.

const CX = 300;
const COL = { x: 110, width: 380 };
const HB = { x: CX - 165, y: 0, w: 330, h: 26 };
const READ = { y: 40, h: 30 };
const FIND = { y: 82, h: 44 };
const DRAFT = { y: 138, h: 30 };
const REVIEW = { y: 180, h: 30 };
const VERDICT = { x: CX - 76, y: 222, w: 152, h: 26 };
const FAIL = { x: 20, y: 268, w: 272, h: 48 };
const PASS = { x: 308, y: 268, w: 272, h: 48 };
const UPDATE = { y: 330, h: 30 };
const RET_X = 648; // the return path's vertical run, clear of the PASS branch

// ───────────────────── rank ─────────────────────

type Lit = "on" | "dim" | "idle";

/** `idle` is "no part hovered" and is NOT a rank — it is the pose at rest, where
 *  every stage reads equally because none of them has been named yet. */
function litOf(stage: E12StageId, active: E12PartId | null): Lit {
  if (!active) return "idle";
  return (C.lights[active] as readonly E12StageId[]).includes(stage) ? "on" : "dim";
}

const BORDER: Record<Lit, string> = {
  on: "var(--copper-200)",
  dim: "var(--copper-900)",
  idle: "var(--copper-800)",
};
const TEXT: Record<Lit, string> = {
  on: "var(--neutral-50)",
  dim: DEMOTED_TEXT,
  idle: "var(--neutral-100)",
};
const SUB_TEXT: Record<Lit, string> = { on: "var(--copper-200)", dim: DEMOTED_TEXT, idle: TEXT_FLOOR };
const background = (lit: Lit) => (lit === "on" ? "var(--copper-950)" : "var(--neutral-900)");
/**
 * A MONO LABEL DEMOTES INSIDE THE COPPER RAMP, not to neutral-400. §8.3's
 * "text to neutral-400" is the rule for PROSE — the flow nodes' sentences, which
 * `TEXT` and `SUB_TEXT` follow. A grey mono label sitting among copper mono labels
 * reads as a different kind of element rather than as the same element ranked
 * lower, so the copper voice demotes in copper.
 */
const MONO_LABEL: Record<Lit, string> = {
  on: "var(--copper-200)",
  dim: "var(--copper-800)",
  idle: "var(--copper-400)",
};
/** A connector carries the rank of the stage it points INTO: when a part owns a
 *  run of stages, the arrows between them have to stay in that run, or the lit
 *  path stops reading as a path. */
const LINE: Record<Lit, string> = {
  on: "var(--copper-300)",
  dim: "var(--copper-900)",
  idle: "var(--copper-500)",
};

// ───────────────────── the pose ─────────────────────

export function TriageFlow({ active, reduced }: { active: E12PartId | null; reduced: boolean }) {
  return (
    <PanelShell
      testid="e12-panel-triage"
      title={T.title}
      foot={T.closer}
      footKw={T.closerKw}
      footDelay={1150}
    >
      <div style={{ position: "relative", height: ILLUS_H }} data-active-part={active ?? "none"}>
        <FlowLines active={active} reduced={reduced} />

        {/* the heartbeat pill */}
        <Reveal on delay={60} style={{ position: "absolute", left: HB.x, top: HB.y, width: HB.w, height: HB.h }}>
          <Box
            testid="e12-flow-hb"
            lit={litOf("hb", active)}
            border={litOf("hb", active) === "idle" ? "var(--copper-500)" : BORDER[litOf("hb", active)]}
            background={background(litOf("hb", active))}
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 9,
            }}
          >
            <Ekg w={30} h={10} color="var(--copper-300)" />
            <span className="e12-mono" style={mono(8.5, MONO_LABEL[litOf("hb", active)], 0.18)}>
              {T.hb}
            </span>
          </Box>
        </Reveal>

        <FlowNode stage="read" active={active} delay={150} y={READ.y} h={READ.h} node={T.nodes.read} />
        <FlowNode stage="find" active={active} delay={240} y={FIND.y} h={FIND.h} node={T.nodes.find} />
        <FlowNode stage="draft" active={active} delay={330} y={DRAFT.y} h={DRAFT.h} node={T.nodes.draft} />
        <FlowNode stage="review" active={active} delay={420} y={REVIEW.y} h={REVIEW.h} node={T.nodes.review} />

        {/* THE VERDICT — a filled chip, not a card: it is the question the fork
            asks, so it carries the copper block the two branches hang off. */}
        <Reveal
          on
          delay={520}
          data-testid="e12-flow-verdict"
          data-lit={litOf("verdict", active)}
          style={{
            position: "absolute",
            left: VERDICT.x,
            top: VERDICT.y,
            width: VERDICT.w,
            height: VERDICT.h,
            background: litOf("verdict", active) === "dim" ? "var(--copper-900)" : "var(--copper-500)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            ...mono(10, litOf("verdict", active) === "dim" ? "var(--copper-400)" : "var(--neutral-950)", 0.2),
            fontWeight: 700,
            transition: "background 200ms var(--ease), color 200ms var(--ease)",
            boxSizing: "border-box",
          }}
        >
          {T.nodes.verdict}
        </Reveal>

        {/* fork labels — outboard of the fork's vertical drops */}
        <Reveal
          on
          delay={600}
          style={{ position: "absolute", left: 0, width: FAIL.x + FAIL.w / 2 - 14, top: VERDICT.y + 8, textAlign: "right" }}
        >
          <span style={mono(8.5, MONO_LABEL[litOf("fail", active)], 0.18)}>{T.nodes.failLabel}</span>
        </Reveal>
        <Reveal on delay={600} style={{ position: "absolute", left: PASS.x + PASS.w / 2 + 14, top: VERDICT.y + 8 }}>
          <span style={mono(8.5, MONO_LABEL[litOf("pass", active)], 0.18)}>{T.nodes.passLabel}</span>
        </Reveal>

        <BranchBox stage="fail" active={active} delay={660} box={FAIL} node={T.nodes.fail} />
        <BranchBox stage="pass" active={active} delay={660} box={PASS} node={T.nodes.pass} />

        <FlowNode stage="update" active={active} delay={780} y={UPDATE.y} h={UPDATE.h} node={T.nodes.update} />

        {/* and again tomorrow */}
        <Reveal
          on
          delay={900}
          data-testid="e12-flow-ret"
          data-lit={litOf("ret", active)}
          style={{ position: "absolute", left: RET_X + 14, top: 128, width: 132 }}
        >
          <span style={prose(11, litOf("ret", active) === "on" ? "var(--copper-100)" : "var(--copper-300)", true)}>
            {highlight(T.ret, T.retKw)}
          </span>
        </Reveal>
      </div>
    </PanelShell>
  );
}

// ───────────────────── the stages ─────────────────────

function FlowNode({
  stage,
  active,
  delay,
  y,
  h,
  node,
}: {
  stage: E12StageId;
  active: E12PartId | null;
  delay: number;
  y: number;
  h: number;
  node: { num: string; text: string; kw: readonly string[]; sources?: string };
}) {
  const lit = litOf(stage, active);
  return (
    <Reveal on delay={delay} style={{ position: "absolute", left: COL.x, top: y, width: COL.width, height: h }}>
      <Box
        testid={`e12-flow-${stage}`}
        lit={lit}
        border={BORDER[lit]}
        background={background(lit)}
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "0 13px",
        }}
      >
        <NumChip n={node.num} on={lit !== "dim"} />
        <div style={{ minWidth: 0 }}>
          <div className="e12-prose" style={{ ...prose(12.5, TEXT[lit]), whiteSpace: "nowrap" }}>
            {highlight(node.text, node.kw)}
          </div>
          {/* the source strip — mono, keyword-free, like the tool strips (§8.3) */}
          {node.sources && (
            <div
              style={{
                ...mono(9, MONO_LABEL[lit], 0.06),
                whiteSpace: "nowrap",
                marginTop: 1,
              }}
            >
              {node.sources}
            </div>
          )}
        </div>
      </Box>
    </Reveal>
  );
}

function BranchBox({
  stage,
  active,
  delay,
  box,
  node,
}: {
  stage: E12StageId;
  active: E12PartId | null;
  delay: number;
  box: { x: number; y: number; w: number; h: number };
  node: { num: string; text: string; kw: readonly string[]; sub: string; subKw: readonly string[] };
}) {
  const lit = litOf(stage, active);
  return (
    <Reveal on delay={delay} style={{ position: "absolute", left: box.x, top: box.y, width: box.w, height: box.h }}>
      <Box
        testid={`e12-flow-${stage}`}
        lit={lit}
        border={lit === "idle" ? "var(--copper-700)" : BORDER[lit]}
        background={background(lit)}
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "0 13px",
        }}
      >
        <NumChip n={node.num} on={lit !== "dim"} />
        <div style={{ minWidth: 0 }}>
          <div className="e12-prose" style={{ ...prose(12, TEXT[lit]), whiteSpace: "nowrap" }}>
            {highlight(node.text, node.kw)}
          </div>
          <div style={{ ...prose(10.5, SUB_TEXT[lit], true), whiteSpace: "nowrap" }}>
            {highlight(node.sub, node.subKw)}
          </div>
        </div>
      </Box>
    </Reveal>
  );
}

// ───────────────────── the wiring ─────────────────────

function FlowLines({ active, reduced }: { active: E12PartId | null; reduced: boolean }) {
  const arrow = arrowIds("flow");
  const retLit = litOf("ret", active);

  // Each arrow names the stage it POINTS INTO, which fixes two things at once: it
  // reveals on that box's frame — tip included, via `Connector` (correction 5) —
  // and it takes that box's rank, so a hovered part lights a continuous path and
  // not a row of bright arrows between dimmed boxes (correction 9).
  const arrows: { d: string; to: E12StageId; delay: number }[] = [
    { d: `M${CX},${HB.y + HB.h} V${READ.y - 3}`, to: "read", delay: 150 },
    { d: `M${CX},${READ.y + READ.h} V${FIND.y - 3}`, to: "find", delay: 240 },
    { d: `M${CX},${FIND.y + FIND.h} V${DRAFT.y - 3}`, to: "draft", delay: 330 },
    { d: `M${CX},${DRAFT.y + DRAFT.h} V${REVIEW.y - 3}`, to: "review", delay: 420 },
    { d: `M${CX},${REVIEW.y + REVIEW.h} V${VERDICT.y - 3}`, to: "verdict", delay: 520 },
    // the fork
    { d: `M${VERDICT.x},${VERDICT.y + VERDICT.h / 2} H${FAIL.x + FAIL.w / 2} V${FAIL.y - 3}`, to: "fail", delay: 660 },
    { d: `M${VERDICT.x + VERDICT.w},${VERDICT.y + VERDICT.h / 2} H${PASS.x + PASS.w / 2} V${PASS.y - 3}`, to: "pass", delay: 660 },
    // the join — both branches end at the spine
    { d: `M${FAIL.x + FAIL.w / 2},${FAIL.y + FAIL.h} V${UPDATE.y - 10} H${CX - 4}`, to: "update", delay: 780 },
    { d: `M${PASS.x + PASS.w / 2},${PASS.y + PASS.h} V${UPDATE.y - 10} H${CX + 4}`, to: "update", delay: 780 },
    { d: `M${CX},${UPDATE.y - 10} V${UPDATE.y - 3}`, to: "update", delay: 780 },
  ];

  // A full day's path, verdict included. One continuous subpath each — a second
  // `M` would make `animateMotion` teleport — and the two tokens split the 15s
  // cycle, so one lap opens a PR and the next flags a human.
  const vMid = VERDICT.y + VERDICT.h / 2;
  const lap = (branchX: number) =>
    `M${CX},${HB.y + HB.h} V${vMid} H${branchX} V${UPDATE.y - 10} H${CX} V${UPDATE.y + UPDATE.h / 2} H${RET_X} V${
      HB.y + HB.h / 2
    } H${HB.x + HB.w + 4}`;

  return (
    <svg
      width={CANVAS_W}
      height={ILLUS_H}
      style={{ position: "absolute", inset: 0, overflow: "visible", pointerEvents: "none" }}
      aria-hidden
    >
      {/* the dim tier IS copper-900 on this pose, so a demoted arrow's tip is
          dimmed with its line rather than left bright on a dark stroke */}
      <ArrowMarkers scope="flow" dim="var(--copper-900)" />
      {arrows.map((a) => {
        const lit = litOf(a.to, active);
        return (
          <Connector key={a.d} delay={a.delay}>
            <path
              className="e12-draw"
              data-testid={`e12-arrow-${a.to}`}
              data-lit={lit}
              style={{ animationDelay: `${a.delay}ms`, transition: "stroke 200ms var(--ease)" }}
              d={a.d}
              fill="none"
              stroke={LINE[lit]}
              strokeWidth={1.2}
              markerEnd={`url(#${lit === "dim" ? arrow.dim : arrow.arrow})`}
              pathLength={1}
            />
          </Connector>
        );
      })}

      {/* the return — tomorrow, 9:00. It carries the heartbeat's rank, because
          the heartbeat is what fires it. */}
      <Connector delay={900}>
        <path
          data-testid="e12-arrow-ret"
          data-lit={retLit}
          d={`M${COL.x + COL.width},${UPDATE.y + UPDATE.h / 2} H${RET_X} V${HB.y + HB.h / 2} H${HB.x + HB.w + 4}`}
          fill="none"
          stroke={LINE[retLit]}
          strokeWidth={1.2}
          strokeDasharray="5 4"
          markerEnd={`url(#${retLit === "dim" ? arrow.dim : arrow.arrow})`}
          style={{ transition: "stroke 200ms var(--ease)" }}
        />
      </Connector>

      {/* THE TWO DAYS. Both circles always mount; only the motion nodes are
          gated, so a reduced-motion pose still renders complete with both tokens
          at rest where the heartbeat starts the beat. */}
      {[
        { testid: "e12-day-pass", path: lap(PASS.x + PASS.w / 2), begin: "0s" },
        { testid: "e12-day-fail", path: lap(FAIL.x + FAIL.w / 2), begin: "7.5s" },
      ].map((day) => (
        <circle
          key={day.testid}
          data-testid={day.testid}
          r={3}
          fill="var(--copper-100)"
          // THE SECOND DAY HAS NOT HAPPENED YET. Before its `begin`, a SMIL
          // element is unanimated: `cx`/`cy` fall back to 0 and the token sits
          // visibly in the panel's top-left corner for the first 7.5s. The base
          // opacity is what hides it until its own lap starts — and it stays 1
          // under reduced motion, where the pose has to render complete.
          opacity={!reduced && day.begin !== "0s" ? 0 : undefined}
          cx={reduced ? CX : undefined}
          cy={reduced ? HB.y + HB.h : undefined}
        >
          {!reduced && (
            <>
              <animateMotion
                dur="15s"
                begin={day.begin}
                repeatCount="indefinite"
                calcMode="linear"
                keyPoints="0;1;1"
                keyTimes="0;0.46;1"
                path={day.path}
              />
              {/* the token is only on the stage for its own half of the cycle */}
              <animate
                attributeName="opacity"
                dur="15s"
                begin={day.begin}
                repeatCount="indefinite"
                values="1;1;0;0"
                keyTimes="0;0.459;0.46;1"
              />
            </>
          )}
        </circle>
      ))}
    </svg>
  );
}
