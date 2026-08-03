// PROTOTYPE gh#19b — throwaway. Step 0: the mindset shift, as a diptych.
//
// Left panel: prompting, turn by turn — four chips lighting in an endless
// relay, a dashed "you, again" return path. The cadence never stops needing
// the human, which is the panel's whole argument.
// Right panel: a loop, drawn as the system it is — a heartbeat feeding four
// stations, a spine read first and written last, a human at one gate only.
// The right panel runs itself; the left one visibly cannot.
import { Bot, User } from "lucide-react";
import { Reveal } from "@/slides/foundation-core-section-e/components/Reveal";
import { highlight } from "@/components/highlight";
import { content } from "./content";
import { Ekg, mono, serif } from "./ui";

const S0 = content.step0;

export function Step0Mindset({ reduced }: { reduced: boolean }) {
  return (
    <div
      data-testid="p19b-step0"
      style={{ position: "absolute", left: 48, right: 48, top: 152, bottom: 26 }}
    >
      <Reveal on delay={60} style={{ position: "absolute", left: 0, top: 0, width: 486, height: 424 }}>
        <TurnByTurn reduced={reduced} />
      </Reveal>

      <Reveal on delay={330} style={{ position: "absolute", left: 494, width: 112, top: 150, textAlign: "center" }}>
        <Bridge />
      </Reveal>

      <Reveal on delay={180} style={{ position: "absolute", right: 0, top: 0, width: 584, height: 424 }}>
        <LoopSystem reduced={reduced} />
      </Reveal>

      {/* the two practitioners who renamed the job */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 446, display: "flex", gap: 44 }}>
        {S0.quotes.map((q, i) => (
          <Reveal key={q.attr} on delay={480 + i * 140} style={{ flex: 1 }}>
            <div style={{ borderLeft: "2px solid var(--copper-600)", paddingLeft: 16 }}>
              <p style={{ ...serif(14.5, "var(--neutral-100)", true), margin: 0, lineHeight: 1.4 }}>
                “{highlight(q.text, q.kw)}”
              </p>
              <div style={{ ...mono(9.5, "var(--copper-400)"), marginTop: 7 }}>— {q.attr}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

// ───────────────────────── left — the relay ─────────────────────────

function TurnByTurn({ reduced }: { reduced: boolean }) {
  const L = S0.left;
  const ROW_H = 46;
  const GAP = 24;
  const rowTop = (i: number) => i * (ROW_H + GAP);
  const rowMid = (i: number) => rowTop(i) + ROW_H / 2;

  return (
    <div
      style={{
        position: "relative",
        height: "100%",
        border: "1px solid var(--copper-900)",
        padding: "14px 18px",
        boxSizing: "border-box",
      }}
    >
      <div style={mono(10.5, "var(--copper-300)", 0.22)}>{L.title}</div>

      {/* the four turns — an endless conveyor of you */}
      <div style={{ position: "absolute", left: 18, top: 48, width: 310 }}>
        {L.rows.map((r, i) => (
          <Reveal
            key={r.text}
            on
            delay={140 + i * 80}
            className={reduced ? "" : "f-card-cycle"}
            style={{
              position: "absolute",
              left: 0,
              top: rowTop(i),
              width: "100%",
              height: ROW_H,
              border: "1px solid var(--copper-900)",
              display: "flex",
              alignItems: "center",
              gap: 11,
              padding: "0 13px",
              boxSizing: "border-box",
              // 4-phase relay: each row owns a quarter of the 6s cycle.
              ...(reduced ? {} : ({ "--cycle-duration": "6s", "--cycle-delay": `${i * 1.5}s` } as object)),
            }}
          >
            <span style={mono(9.5, "var(--copper-500)", 0.12)}>0{i + 1}</span>
            <span style={{ display: "flex", color: r.who === "you" ? "var(--copper-300)" : "var(--neutral-400)" }}>
              {r.who === "you" ? <User size={14} /> : <Bot size={14} />}
            </span>
            <span style={serif(14, "var(--neutral-100)")}>{r.text}</span>
          </Reveal>
        ))}

        {/* down-arrows between turns + the dashed way back up */}
        <svg
          width={430}
          height={rowTop(3) + ROW_H}
          style={{ position: "absolute", left: 0, top: 0, overflow: "visible", pointerEvents: "none" }}
          aria-hidden
        >
          <defs>
            <marker id="p19b-t-arr" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0,0.6 L7,4 L0,7.4" fill="none" stroke="var(--copper-500)" strokeWidth="1.4" />
            </marker>
            <marker id="p19b-t-arr-dim" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0,0.6 L7,4 L0,7.4" fill="none" stroke="var(--copper-600)" strokeWidth="1.4" />
            </marker>
          </defs>
          {[0, 1, 2].map((i) => (
            <line
              key={i}
              x1={155}
              y1={rowTop(i) + ROW_H + 3}
              x2={155}
              y2={rowTop(i + 1) - 4}
              stroke="var(--copper-500)"
              strokeWidth={1.2}
              markerEnd="url(#p19b-t-arr)"
            />
          ))}
          {/* you, again — the reply's only destination is your next turn */}
          <path
            d={`M316,${rowMid(3)} H345 V${rowMid(0)} H322`}
            fill="none"
            stroke="var(--copper-600)"
            strokeWidth={1.2}
            markerEnd="url(#p19b-t-arr-dim)"
            className={reduced ? "" : "p19b-dash-slow"}
            strokeDasharray="4 6"
          />
          <text
            x={356}
            y={(rowMid(1) + rowMid(2)) / 2 + 4}
            style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 12, fill: "var(--copper-300)" }}
          >
            {L.returnLabel}
          </text>
        </svg>
      </div>

      {/* verdict */}
      <div style={{ position: "absolute", left: 18, right: 18, bottom: 14 }}>
        <div style={{ borderTop: "1px solid var(--copper-900)", paddingTop: 11 }}>
          <div style={{ ...serif(15.5, "var(--neutral-50)"), fontWeight: 600 }}>{L.verdictTitle}</div>
          <div style={{ ...serif(12.5, "var(--neutral-300)", true), marginTop: 5 }}>
            {highlight(L.verdict, L.verdictKw)}
          </div>
        </div>
      </div>
    </div>
  );
}

// ───────────────────────── the bridge ─────────────────────────

function Bridge() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
      {content.step0.bridge.map((w) => (
        <span key={w} style={mono(9, "var(--copper-400)", 0.3)}>
          {w}
        </span>
      ))}
      <svg width={64} height={18} style={{ marginTop: 6 }} aria-hidden>
        {[0, 1, 2].map((i) => (
          <path
            key={i}
            d={`M${14 + i * 14},3 L${23 + i * 14},9 L${14 + i * 14},15`}
            fill="none"
            stroke="var(--copper-400)"
            strokeWidth={1.6}
            style={{ animation: `p19b-chev 1.6s linear ${i * 0.28}s infinite` }}
          />
        ))}
      </svg>
    </div>
  );
}

// ───────────────────────── right — the system ─────────────────────────

function LoopSystem({ reduced }: { reduced: boolean }) {
  const R = S0.right;
  // Scene coordinates, local to the 548px inner width.
  const CX = 294; // main column centreline
  const NODE_X = 194;
  const NODE_W = 200;
  const NODE_H = 30;
  const nodeTop = (i: number) => 44 + i * 42;
  const nodeMid = (i: number) => nodeTop(i) + NODE_H / 2;

  return (
    <div
      style={{
        position: "relative",
        height: "100%",
        border: "1px solid var(--copper-700)",
        padding: "14px 18px",
        boxSizing: "border-box",
      }}
    >
      <div style={mono(10.5, "var(--copper-100)", 0.22)}>{R.title}</div>

      <div style={{ position: "absolute", left: 18, top: 42, width: 548, height: 292 }}>
        {/* connective tissue — drawn first, so chips sit on top */}
        <svg width={548} height={292} style={{ position: "absolute", inset: 0, overflow: "visible", pointerEvents: "none" }} aria-hidden>
          <defs>
            <marker id="p19b-s-arr" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0,0.6 L7,4 L0,7.4" fill="none" stroke="var(--copper-400)" strokeWidth="1.4" />
            </marker>
          </defs>
          {/* heartbeat feed + the spine's two errands + the beat's spine */}
          <line x1={CX} y1={30} x2={CX} y2={nodeTop(0) - 3} stroke="var(--copper-400)" strokeWidth={1.2} markerEnd="url(#p19b-s-arr)" />
          {[0, 1, 2].map((i) => (
            <line key={i} x1={CX} y1={nodeTop(i) + NODE_H} x2={CX} y2={nodeTop(i + 1) - 3} stroke="var(--copper-400)" strokeWidth={1.2} markerEnd="url(#p19b-s-arr)" />
          ))}
          {/* read first: spine → discover. written last: commit → spine. */}
          <path d={`M140,${nodeMid(1) - 10} H165 V${nodeMid(0)} H${NODE_X - 4}`} fill="none" stroke="var(--copper-600)" strokeWidth={1.1} markerEnd="url(#p19b-s-arr)" className={reduced ? "" : "p19b-dash-slow"} />
          <path d={`M${NODE_X},${nodeMid(3)} H165 V${nodeMid(1) + 30} H144`} fill="none" stroke="var(--copper-600)" strokeWidth={1.1} markerEnd="url(#p19b-s-arr)" className={reduced ? "" : "p19b-dash-slow"} />
          {/* pass, between verify and commit */}
          <text x={CX + 9} y={nodeTop(3) - 5} style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 10.5, fill: "var(--copper-300)" }}>
            {R.pass}
          </text>
          {/* risky: verify escapes right, down into the gate */}
          <path d={`M${NODE_X + NODE_W},${nodeMid(2)} H512 V264 H488`} fill="none" stroke="var(--copper-500)" strokeWidth={1.1} strokeDasharray="4 4" markerEnd="url(#p19b-s-arr)" />
          <text x={520} y={200} style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 10.5, fill: "var(--copper-300)" }}>
            {R.risky}
          </text>
          {/* approved: the gate hands it back to commit */}
          <line x1={214} y1={238} x2={214} y2={nodeTop(3) + NODE_H + 4} stroke="var(--copper-500)" strokeWidth={1.1} markerEnd="url(#p19b-s-arr)" />
          <text x={222} y={228} style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 10.5, fill: "var(--copper-300)" }}>
            {R.approved}
          </text>
          {/* one beat, running — the only moving part the human never touches */}
          {!reduced && (
            <circle r={2.6} fill="var(--copper-100)">
              <animateMotion dur="3.4s" repeatCount="indefinite" path={`M${CX},30 V${nodeTop(3) + NODE_H}`} />
            </circle>
          )}
        </svg>

        {/* heartbeat chip */}
        <div
          style={{
            position: "absolute",
            left: CX - 150,
            top: 0,
            width: 300,
            height: 30,
            border: "1px solid var(--copper-600)",
            background: "var(--copper-950)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            boxSizing: "border-box",
          }}
        >
          <Ekg />
          <span style={mono(8.5, "var(--copper-200)", 0.16)}>{R.heartbeat}</span>
        </div>

        {/* the four stations */}
        {R.stations.map((s, i) => (
          <div
            key={s.label}
            style={{
              position: "absolute",
              left: NODE_X,
              top: nodeTop(i),
              width: NODE_W,
              height: NODE_H,
              border: "1px solid var(--copper-800)",
              background: "var(--neutral-900)",
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "0 10px",
              boxSizing: "border-box",
            }}
          >
            <span style={mono(9.5, "var(--copper-200)", 0.14)}>{s.label}</span>
            <span style={{ ...serif(10.5, "var(--neutral-400)", true), whiteSpace: "nowrap" }}>{s.sub}</span>
          </div>
        ))}

        {/* the spine */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: nodeMid(1) - 10,
            width: 140,
            border: "1px solid var(--copper-700)",
            background: "var(--neutral-900)",
            padding: "7px 11px",
            boxSizing: "border-box",
          }}
        >
          <div style={mono(8.5, "var(--copper-400)", 0.22)}>{R.spine.label}</div>
          <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--copper-100)", marginTop: 2 }}>{R.spine.file}</div>
          <div style={{ ...serif(9.5, "var(--neutral-400)", true), marginTop: 2 }}>{R.spine.sub}</div>
        </div>

        {/* the one gate */}
        <div
          style={{
            position: "absolute",
            left: 144,
            top: 240,
            width: 344,
            height: 48,
            border: "1px solid var(--copper-600)",
            background: "var(--copper-950)",
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "0 14px",
            boxSizing: "border-box",
          }}
        >
          <span style={{ display: "flex", color: "var(--copper-300)" }}>
            <User size={16} />
          </span>
          <div>
            <div style={mono(9.5, "var(--copper-100)", 0.16)}>{R.gate.label}</div>
            <div style={{ ...serif(11, "var(--neutral-300)", true), marginTop: 2 }}>
              {highlight(R.gate.sub, R.gate.subKw)}
            </div>
          </div>
        </div>
      </div>

      {/* verdict */}
      <div style={{ position: "absolute", left: 18, right: 18, bottom: 14 }}>
        <div style={{ borderTop: "1px solid var(--copper-900)", paddingTop: 11 }}>
          <div style={{ ...serif(15.5, "var(--neutral-50)"), fontWeight: 600 }}>{R.verdictTitle}</div>
          <div style={{ ...serif(12.5, "var(--neutral-300)", true), marginTop: 5 }}>
            {highlight(R.verdict, R.verdictKw)}
          </div>
        </div>
      </div>
    </div>
  );
}
