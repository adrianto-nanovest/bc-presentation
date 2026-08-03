// PROTOTYPE gh#19b — throwaway. Step 2: the worked example — the morning-triage
// loop, one beat, drawn as the flow it is. The left rail stays mounted; hovering
// a rail part LIGHTS the flow stages that part owns (heartbeat → the 9:00 pill
// and the return path; one beat → the maker stages; checker → the reviewer and
// the verdict fork; spine → the read and the write). Rank is colour tier,
// never opacity. Two day-tokens run the flow on alternating laps: one lap
// passes and opens a PR, the next fails and waits for a person.
import { Reveal } from "@/slides/foundation-core-section-e/components/Reveal";
import { highlight } from "@/components/highlight";
import { content, type PartId } from "./content";
import { Ekg, NumChip, PanelShell, mono, serif } from "./ui";

const T = content.triage;

// ── geometry (local to the panel content area) ──
const CX = 300; // main column centreline
const COL_X = 110;
const COL_W = 380;
const HB = { x: CX - 165, y: 0, w: 330, h: 26 };
const READ = { y: 40, h: 30 };
const FIND = { y: 82, h: 44 };
const DRAFT = { y: 138, h: 30 };
const REVIEW = { y: 180, h: 30 };
const VERDICT = { x: CX - 76, y: 222, w: 152, h: 26 };
const FAIL = { x: 20, y: 268, w: 272, h: 48 };
const PASS = { x: 308, y: 268, w: 272, h: 48 };
const UPDATE = { y: 330, h: 30 };
const RET_X = 648; // return path's vertical run

type Lit = "on" | "dim" | "idle";

function litOf(node: string, active: PartId | null): Lit {
  if (!active) return "idle";
  return (T.lights[active] ?? []).includes(node) ? "on" : "dim";
}

const nodeBorder: Record<Lit, string> = {
  on: "var(--copper-200)",
  dim: "var(--copper-900)",
  idle: "var(--copper-800)",
};
const nodeText: Record<Lit, string> = {
  on: "var(--neutral-50)",
  dim: "var(--neutral-400)",
  idle: "var(--neutral-100)",
};

export function TriagePanel({ active, reduced }: { active: PartId | null; reduced: boolean }) {
  return (
    <PanelShell
      testid="p19b-panel-triage"
      title={T.title}
      kicker={T.kicker}
      kickerKw={T.kickerKw}
      foot={T.closer}
      footKw={T.closerKw}
      footDelay={1150}
    >
      <div style={{ position: "relative", height: 372 }} data-active-part={active ?? "none"}>
        <FlowLines active={active} reduced={reduced} />

        {/* the heartbeat pill */}
        <FlowChip lit={litOf("hb", active)} delay={60} accent style={{ left: HB.x, top: HB.y, width: HB.w, height: HB.h }}>
          <Ekg w={30} h={10} color="var(--copper-300)" />
          <span style={{ ...mono(8.5, "inherit", 0.18), color: "inherit" }}>{T.hb}</span>
        </FlowChip>

        <FlowNode lit={litOf("read", active)} delay={150} y={READ.y} h={READ.h} node={T.nodes.read} />
        <FlowNode lit={litOf("find", active)} delay={240} y={FIND.y} h={FIND.h} node={T.nodes.find} />
        <FlowNode lit={litOf("draft", active)} delay={330} y={DRAFT.y} h={DRAFT.h} node={T.nodes.draft} />
        <FlowNode lit={litOf("review", active)} delay={420} y={REVIEW.y} h={REVIEW.h} node={T.nodes.review} />

        {/* the verdict */}
        <Reveal
          on
          delay={520}
          style={{
            position: "absolute",
            left: VERDICT.x,
            top: VERDICT.y,
            width: VERDICT.w,
            height: VERDICT.h,
            background: litOf("verdict", active) === "dim" ? "var(--copper-900)" : "var(--copper-500)",
            color: litOf("verdict", active) === "dim" ? "var(--copper-400)" : "var(--neutral-950)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "var(--mono)",
            fontSize: 10,
            letterSpacing: "0.2em",
            fontWeight: 700,
            transition: "background 200ms var(--ease), color 200ms var(--ease)",
            boxSizing: "border-box",
          }}
        >
          {T.nodes.verdict}
        </Reveal>

        {/* fork labels — outboard of the fork's vertical drops */}
        <Reveal on delay={600} style={{ position: "absolute", left: 0, width: FAIL.x + FAIL.w / 2 - 14, top: VERDICT.y + 8, textAlign: "right" }}>
          <span style={mono(8.5, litOf("fail", active) === "dim" ? "var(--copper-800)" : "var(--copper-400)", 0.18)}>{T.nodes.failLabel}</span>
        </Reveal>
        <Reveal on delay={600} style={{ position: "absolute", left: PASS.x + PASS.w / 2 + 14, top: VERDICT.y + 8 }}>
          <span style={mono(8.5, litOf("pass", active) === "dim" ? "var(--copper-800)" : "var(--copper-400)", 0.18)}>{T.nodes.passLabel}</span>
        </Reveal>

        <BranchBox lit={litOf("fail", active)} delay={660} box={FAIL} node={T.nodes.fail} />
        <BranchBox lit={litOf("pass", active)} delay={660} box={PASS} node={T.nodes.pass} />

        <FlowNode lit={litOf("update", active)} delay={780} y={UPDATE.y} h={UPDATE.h} node={T.nodes.update} />

        {/* and again tomorrow */}
        <Reveal on delay={900} style={{ position: "absolute", left: RET_X + 14, top: 128, width: 132 }}>
          <span style={serif(11, litOf("ret", active) === "on" ? "var(--copper-100)" : "var(--copper-300)", true)}>{T.ret}</span>
        </Reveal>
      </div>
    </PanelShell>
  );
}

// ───────────────────────── pieces ─────────────────────────

function FlowChip({
  lit,
  delay,
  accent = false,
  style,
  children,
}: {
  lit: Lit;
  delay: number;
  accent?: boolean;
  style: React.CSSProperties;
  children: React.ReactNode;
}) {
  const border = lit === "on" ? "var(--copper-200)" : lit === "dim" ? "var(--copper-900)" : accent ? "var(--copper-500)" : "var(--copper-800)";
  const color = lit === "on" ? "var(--copper-100)" : lit === "dim" ? "var(--copper-700)" : "var(--copper-200)";
  return (
    <Reveal
      on
      delay={delay}
      style={{
        position: "absolute",
        border: `1px solid ${border}`,
        background: lit === "on" ? "var(--copper-950)" : "var(--neutral-900)",
        color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 9,
        transition: "border-color 200ms var(--ease), color 200ms var(--ease), background 200ms var(--ease)",
        boxSizing: "border-box",
        ...style,
      }}
    >
      {children}
    </Reveal>
  );
}

function FlowNode({
  lit,
  delay,
  y,
  h,
  node,
}: {
  lit: Lit;
  delay: number;
  y: number;
  h: number;
  node: { num: string; text: string; kw: readonly string[]; sub?: string };
}) {
  return (
    <Reveal
      on
      delay={delay}
      data-testid={`p19b-flow-${node.num}`}
      data-lit={lit}
      style={{
        position: "absolute",
        left: COL_X,
        top: y,
        width: COL_W,
        height: h,
        border: `1px solid ${nodeBorder[lit]}`,
        background: lit === "on" ? "var(--copper-950)" : "var(--neutral-900)",
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "0 13px",
        transition: "border-color 200ms var(--ease), background 200ms var(--ease)",
        boxSizing: "border-box",
      }}
    >
      <NumChip n={node.num} on={lit !== "dim"} />
      <div style={{ minWidth: 0 }}>
        <div style={{ ...serif(12.5, nodeText[lit]), whiteSpace: "nowrap", transition: "color 200ms var(--ease)" }}>
          {highlight(node.text, node.kw)}
        </div>
        {node.sub && (
          <div style={{ ...serif(9.5, lit === "dim" ? "var(--neutral-500)" : "var(--neutral-400)", true), whiteSpace: "nowrap" }}>
            {node.sub}
          </div>
        )}
      </div>
    </Reveal>
  );
}

function BranchBox({
  lit,
  delay,
  box,
  node,
}: {
  lit: Lit;
  delay: number;
  box: { x: number; y: number; w: number; h: number };
  node: { num: string; text: string; kw: readonly string[]; sub: string };
}) {
  return (
    <Reveal
      on
      delay={delay}
      data-lit={lit}
      style={{
        position: "absolute",
        left: box.x,
        top: box.y,
        width: box.w,
        height: box.h,
        border: `1px solid ${lit === "on" ? "var(--copper-200)" : lit === "dim" ? "var(--copper-900)" : "var(--copper-700)"}`,
        background: lit === "on" ? "var(--copper-950)" : "var(--neutral-900)",
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "0 13px",
        transition: "border-color 200ms var(--ease), background 200ms var(--ease)",
        boxSizing: "border-box",
      }}
    >
      <NumChip n={node.num} on={lit !== "dim"} />
      <div style={{ minWidth: 0 }}>
        <div style={{ ...serif(12, nodeText[lit]), whiteSpace: "nowrap", transition: "color 200ms var(--ease)" }}>
          {highlight(node.text, node.kw)}
        </div>
        <div style={{ ...serif(9.5, lit === "dim" ? "var(--neutral-500)" : "var(--neutral-400)", true), whiteSpace: "nowrap" }}>{node.sub}</div>
      </div>
    </Reveal>
  );
}

function FlowLines({ active, reduced }: { active: PartId | null; reduced: boolean }) {
  const retLit = litOf("ret", active);
  const retColor = retLit === "on" ? "var(--copper-200)" : retLit === "dim" ? "var(--copper-800)" : "var(--copper-500)";
  const arrows: { d: string; delay: number; dashed?: boolean }[] = [
    { d: `M${CX},${HB.y + HB.h} V${READ.y - 3}`, delay: 120 },
    { d: `M${CX},${READ.y + READ.h} V${FIND.y - 3}`, delay: 210 },
    { d: `M${CX},${FIND.y + FIND.h} V${DRAFT.y - 3}`, delay: 300 },
    { d: `M${CX},${DRAFT.y + DRAFT.h} V${REVIEW.y - 3}`, delay: 390 },
    { d: `M${CX},${REVIEW.y + REVIEW.h} V${VERDICT.y - 3}`, delay: 480 },
    // the fork
    { d: `M${VERDICT.x},${VERDICT.y + VERDICT.h / 2} H${FAIL.x + FAIL.w / 2} V${FAIL.y - 3}`, delay: 580 },
    { d: `M${VERDICT.x + VERDICT.w},${VERDICT.y + VERDICT.h / 2} H${PASS.x + PASS.w / 2} V${PASS.y - 3}`, delay: 580 },
    // the join
    { d: `M${FAIL.x + FAIL.w / 2},${FAIL.y + FAIL.h} V${UPDATE.y - 10} H${CX - 4}`, delay: 700 },
    { d: `M${PASS.x + PASS.w / 2},${PASS.y + PASS.h} V${UPDATE.y - 10} H${CX + 4}`, delay: 700 },
    { d: `M${CX},${UPDATE.y - 10} V${UPDATE.y - 3}`, delay: 760 },
  ];
  // A full day's path, verdict included — one lap opens a PR, the next flags a
  // human. The two tokens split the 15s cycle between them. One continuous
  // subpath each: a second M would make animateMotion teleport.
  const vMid = VERDICT.y + VERDICT.h / 2;
  const lap = (bx: number) =>
    `M${CX},${HB.y + HB.h} V${vMid} H${bx} V${UPDATE.y - 10} H${CX} V${UPDATE.y + UPDATE.h / 2} H${RET_X} V${HB.y + HB.h / 2} H${HB.x + HB.w + 4}`;
  const lapPass = lap(PASS.x + PASS.w / 2);
  const lapFail = lap(FAIL.x + FAIL.w / 2);

  return (
    <svg width={802} height={372} style={{ position: "absolute", inset: 0, overflow: "visible", pointerEvents: "none" }} aria-hidden>
      <defs>
        <marker id="p19b-f-arr" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0,0.6 L7,4 L0,7.4" fill="none" stroke="var(--copper-500)" strokeWidth="1.4" />
        </marker>
        <marker id="p19b-f-arr-ret" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0,0.6 L7,4 L0,7.4" fill="none" stroke={retColor} strokeWidth="1.4" />
        </marker>
      </defs>
      {arrows.map((a, i) => (
        <path
          key={i}
          d={a.d}
          fill="none"
          stroke="var(--copper-500)"
          strokeWidth={1.2}
          markerEnd="url(#p19b-f-arr)"
          pathLength={1}
          className="p19b-draw"
          style={{ animationDelay: `${a.delay}ms` }}
        />
      ))}
      {/* the return — tomorrow, 9:00 */}
      <path
        d={`M${COL_X + COL_W},${UPDATE.y + UPDATE.h / 2} H${RET_X} V${HB.y + HB.h / 2} H${HB.x + HB.w + 4}`}
        fill="none"
        stroke={retColor}
        strokeWidth={1.2}
        strokeDasharray="5 4"
        markerEnd="url(#p19b-f-arr-ret)"
        style={{ transition: "stroke 200ms var(--ease)" }}
      />
      {!reduced && (
        <>
          <circle r={3} fill="var(--copper-100)">
            <animateMotion dur="15s" repeatCount="indefinite" calcMode="linear" keyPoints="0;1;1" keyTimes="0;0.46;1" path={lapPass} />
            <animate attributeName="opacity" dur="15s" repeatCount="indefinite" values="1;1;0;0" keyTimes="0;0.459;0.46;1" />
          </circle>
          <circle r={3} fill="var(--copper-100)" opacity={0}>
            <animateMotion dur="15s" begin="7.5s" repeatCount="indefinite" calcMode="linear" keyPoints="0;1;1" keyTimes="0;0.46;1" path={lapFail} />
            <animate attributeName="opacity" dur="15s" begin="7.5s" repeatCount="indefinite" values="1;1;0;0" keyTimes="0;0.459;0.46;1" />
          </circle>
        </>
      )}
    </svg>
  );
}
