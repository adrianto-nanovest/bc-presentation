// PROTOTYPE gh#19b — throwaway. The four right-canvas panels, one per part of
// the big loop. Each is a self-contained micro-infographic sourced from the
// crash-course doc: the four heartbeats, the agent runtime inside one beat,
// the checker ladder, and the spine's memory-between-runs.
import { User } from "lucide-react";
import { Reveal } from "@/slides/foundation-core-section-e/components/Reveal";
import { highlight } from "@/components/highlight";
import { content, type PartId } from "./content";
import { NumChip, PanelShell, mono, serif } from "./ui";

const P = content.panels;

export function PartPanel({ id, reduced }: { id: PartId; reduced: boolean }) {
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

function HeartbeatsPanel({ reduced }: { reduced: boolean }) {
  const H = P.heartbeat;
  return (
    <PanelShell testid="p19b-panel-heartbeat" title={H.title} kicker={H.kicker} kickerKw={H.kickerKw} foot={H.foot} footKw={H.footKw}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, height: 330 }}>
        {H.kinds.map((k, i) => (
          <Reveal
            key={k.name}
            on
            delay={80 + i * 90}
            style={{
              border: "1px solid var(--copper-800)",
              padding: "11px 12px",
              display: "flex",
              flexDirection: "column",
              gap: 7,
              boxSizing: "border-box",
              minWidth: 0,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={reduced ? {} : { display: "inline-flex", animation: `p19b-pulse 4.4s var(--ease) ${i * 1.1}s infinite` }}>
                <NumChip n={k.num} />
              </span>
              <span style={mono(10.5, "var(--copper-100)", 0.14)}>{k.name}</span>
            </div>
            <div style={{ ...serif(10, "var(--copper-400)", true), marginTop: -4, minHeight: 13 }}>{k.alt}</div>
            <div style={{ ...serif(12, "var(--neutral-200)"), minHeight: 48 }}>{highlight(k.desc, k.descKw)}</div>
            <div style={{ width: 26, height: 2, background: "var(--copper-500)" }} />
            <div style={{ ...serif(11.5, "var(--neutral-50)"), fontWeight: 600, minHeight: 30 }}>{k.stop}</div>
            <div style={{ borderTop: "1px dotted var(--copper-800)", paddingTop: 6, minHeight: 30 }}>
              {k.tools.map((t) => (
                <div key={t} style={{ fontFamily: "var(--mono)", fontSize: 8.5, letterSpacing: "0.04em", color: "var(--copper-300)", lineHeight: 1.6, whiteSpace: "nowrap" }}>
                  {t}
                </div>
              ))}
            </div>
            <div style={{ ...serif(10.5, "var(--copper-300)", true), borderTop: "1px dotted var(--copper-800)", paddingTop: 6, marginTop: "auto" }}>
              {k.analogy}
            </div>
          </Reveal>
        ))}
      </div>

      {/* attended → unattended axis, with one beat travelling it */}
      <Reveal on delay={520} style={{ position: "absolute", left: 0, right: 0, top: 352 }}>
        <div style={{ position: "relative", height: 34 }}>
          <svg width="100%" height="12" style={{ display: "block", overflow: "visible" }} aria-hidden>
            <defs>
              <marker id="p19b-ax-arr" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="8" markerHeight="8" orient="auto">
                <path d="M0,0.6 L7,4 L0,7.4" fill="none" stroke="var(--copper-300)" strokeWidth="1.4" />
              </marker>
            </defs>
            <line x1="0" y1="6" x2="98.6%" y2="6" stroke="var(--copper-700)" strokeWidth="1.2" markerEnd="url(#p19b-ax-arr)" />
            {[12.5, 37.5, 62.5, 87.5].map((p) => (
              <line key={p} x1={`${p}%`} y1="2" x2={`${p}%`} y2="10" stroke="var(--copper-600)" strokeWidth="1.2" />
            ))}
          </svg>
          {!reduced && (
            <span
              style={{
                position: "absolute",
                top: 3,
                width: 6,
                height: 6,
                marginLeft: -3,
                background: "var(--copper-200)",
                animation: "p19b-axis-dot 5s linear infinite",
              }}
            />
          )}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
            <span style={mono(9, "var(--copper-100)", 0.2)}>{H.axis.left}</span>
            <span style={serif(10.5, "var(--neutral-400)", true)}>{H.axis.mid} →</span>
            <span style={mono(9, "var(--copper-100)", 0.2)}>{H.axis.right}</span>
          </div>
        </div>
      </Reveal>
    </PanelShell>
  );
}

// ───────────────────── 02 · inside one beat ─────────────────────

function arc(cx: number, cy: number, r: number, a0: number, a1: number) {
  const rad = (d: number) => (d * Math.PI) / 180;
  const x0 = cx + r * Math.cos(rad(a0));
  const y0 = cy + r * Math.sin(rad(a0));
  const x1 = cx + r * Math.cos(rad(a1));
  const y1 = cy + r * Math.sin(rad(a1));
  return `M${x0.toFixed(1)},${y0.toFixed(1)} A${r},${r} 0 0 1 ${x1.toFixed(1)},${y1.toFixed(1)}`;
}

function OneBeatPanel({ reduced }: { reduced: boolean }) {
  const B = P.beat;
  const CX = 300;
  const CY = 196;
  const R = 95;
  // Station chip centres sit OUTSIDE the ring — the arcs own the circle, the
  // chips orbit it. N, E, S, W — clockwise, matching the arcs.
  const POS = [
    { x: CX, y: CY - R - 30 },
    { x: CX + R + 104, y: CY },
    { x: CX, y: CY + R + 30 },
    { x: CX - R - 104, y: CY },
  ];
  const ANGLES = [-90, 0, 90, 180];

  return (
    <PanelShell testid="p19b-panel-beat" title={B.title} kicker={B.kicker} kickerKw={B.kickerKw} foot={B.foot} footKw={B.footKw}>
      <div style={{ position: "relative", height: 400 }}>
        <svg width={802} height={400} style={{ position: "absolute", inset: 0, overflow: "visible", pointerEvents: "none" }} aria-hidden>
          <defs>
            <marker id="p19b-b-arr" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="7.5" markerHeight="7.5" orient="auto">
              <path d="M0,0.6 L7,4 L0,7.4" fill="none" stroke="var(--copper-400)" strokeWidth="1.4" />
            </marker>
          </defs>
          {/* faint orbital field — three hairline halos behind the ring */}
          {[0.62, 0.8, 1.18].map((f) => (
            <circle key={f} cx={CX} cy={CY} r={R * f} fill="none" stroke="var(--copper-950)" strokeWidth={1} />
          ))}
          {ANGLES.map((a, i) => (
            <path
              key={a}
              d={arc(CX, CY, R, a + 14, a + 76)}
              fill="none"
              stroke="var(--copper-500)"
              strokeWidth={1.4}
              markerEnd="url(#p19b-b-arr)"
              pathLength={1}
              className="p19b-draw"
              style={{ animationDelay: `${150 + i * 130}ms` }}
            />
          ))}
          {/* the runtime, running */}
          {!reduced && (
            <circle r={3} fill="var(--copper-100)">
              <animateMotion
                dur="5s"
                repeatCount="indefinite"
                path={`M${CX},${CY - R} A${R},${R} 0 1 1 ${CX - 0.01},${CY - R}`}
              />
            </circle>
          )}
          {/* the exit — the model stops asking */}
          <path
            d={`M${CX + R + 202},${CY} H606 V132 H614`}
            fill="none"
            stroke="var(--copper-600)"
            strokeWidth={1.2}
            strokeDasharray="4 4"
            markerEnd="url(#p19b-b-arr)"
          />
        </svg>

        {B.stations.map((s, i) => (
          <Reveal
            key={s.name}
            on
            delay={120 + i * 120}
            style={{
              position: "absolute",
              left: POS[i].x - 98,
              top: POS[i].y - 22,
              width: 196,
              height: 44,
              border: "1px solid var(--copper-700)",
              background: "var(--neutral-900)",
              display: "flex",
              alignItems: "center",
              gap: 9,
              padding: "0 11px",
              boxSizing: "border-box",
            }}
          >
            <NumChip n={s.num} />
            <div style={{ minWidth: 0 }}>
              <div style={mono(10, "var(--copper-100)", 0.12)}>{s.name}</div>
              <div style={{ ...serif(10.5, "var(--neutral-400)", true), whiteSpace: "nowrap" }}>{s.sub}</div>
            </div>
          </Reveal>
        ))}

        <Reveal on delay={420} style={{ position: "absolute", left: CX - 78, top: CY - 26, width: 156, textAlign: "center" }}>
          <span style={serif(12.5, "var(--neutral-300)", true)}>{highlight(B.center, B.centerKw)}</span>
        </Reveal>

        <Reveal
          on
          delay={560}
          style={{
            position: "absolute",
            left: 616,
            top: 96,
            width: 182,
            border: "1px dashed var(--copper-700)",
            padding: "11px 14px",
            boxSizing: "border-box",
          }}
        >
          <div style={{ ...serif(12.5, "var(--neutral-50)"), fontWeight: 600 }}>{highlight(B.exitTitle, B.exitTitleKw)}</div>
          <div style={{ ...serif(11, "var(--neutral-300)", true), marginTop: 5 }}>{highlight(B.exitSub, B.exitSubKw)}</div>
        </Reveal>
      </div>
    </PanelShell>
  );
}

// ───────────────────── 03 · the checker ladder ─────────────────────

function CheckerPanel() {
  const C = P.checker;
  return (
    <PanelShell testid="p19b-panel-checker" title={C.title} kicker={C.kicker} kickerKw={C.kickerKw} foot={C.foot} footKw={C.footKw}>
      {/* strongest → weakest */}
      <div style={{ position: "relative", height: 26 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <span style={mono(9, "var(--copper-300)", 0.2)}>{C.axisL}</span>
          <span style={mono(9, "var(--copper-300)", 0.2)}>{C.axisR}</span>
        </div>
        <svg width="100%" height="10" style={{ display: "block", overflow: "visible" }} aria-hidden>
          <defs>
            <marker id="p19b-c-arr" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="8" markerHeight="8" orient="auto">
              <path d="M0,0.6 L7,4 L0,7.4" fill="none" stroke="var(--copper-400)" strokeWidth="1.4" />
            </marker>
          </defs>
          <line x1="0" y1="5" x2="98.8%" y2="5" stroke="var(--copper-700)" strokeWidth="1.2" markerEnd="url(#p19b-c-arr)" />
          {[16.6, 50, 83.3].map((p, i) => (
            <circle key={p} cx={`${p}%`} cy="5" r="3.4" fill={i === 2 ? "var(--copper-500)" : "var(--copper-300)"} />
          ))}
        </svg>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginTop: 10, height: 246 }}>
        {C.rungs.map((r, i) => (
          <Reveal
            key={r.name}
            on
            delay={100 + i * 110}
            style={{
              border: `1px solid ${r.claim ? "var(--copper-500)" : "var(--copper-800)"}`,
              padding: "13px 15px",
              display: "flex",
              flexDirection: "column",
              gap: 9,
              boxSizing: "border-box",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
              <NumChip n={r.num} />
              <span style={mono(11, "var(--copper-100)", 0.14)}>{r.name}</span>
            </div>
            <div style={{ height: 1, background: "var(--copper-900)" }} />
            <div style={{ ...serif(12, "var(--neutral-200)"), lineHeight: 1.45, flex: 1 }}>{highlight(r.desc, r.descKw)}</div>
            <span
              style={{
                alignSelf: "flex-start",
                padding: "3px 12px",
                background: r.claim ? "var(--copper-500)" : "var(--copper-900)",
                color: r.claim ? "var(--neutral-950)" : "var(--copper-100)",
                fontFamily: "var(--mono)",
                fontSize: 9.5,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              {r.badge}
            </span>
          </Reveal>
        ))}
      </div>

      {/* the human gate widens as the proof thins */}
      <Reveal on delay={480} style={{ marginTop: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
          <span style={{ display: "flex", color: "var(--copper-400)" }}>
            <User size={13} />
          </span>
          <span style={mono(9.5, "var(--copper-300)", 0.22)}>{C.gateLabel}</span>
          <div style={{ flex: 1, height: 1, background: "var(--copper-900)" }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
          {C.rungs.map((r, i) => (
            <div key={r.name}>
              <div style={{ display: "flex", alignItems: "center", height: 9 }}>
                <div style={{ width: 2, height: 9, background: "var(--copper-300)" }} />
                <div
                  className="p19b-grow"
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
                <span style={{ ...serif(11, "var(--neutral-50)"), fontWeight: 600 }}>{r.gate}: </span>
                <span style={serif(11, "var(--neutral-300)")}>{r.gateDesc}</span>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </PanelShell>
  );
}

// ───────────────────── 04 · the spine ─────────────────────

function SpinePanel({ reduced }: { reduced: boolean }) {
  const S = P.spine;
  return (
    <PanelShell testid="p19b-panel-spine" title={S.title} kicker={S.kicker} kickerKw={S.kickerKw} foot={S.foot} footKw={S.footKw}>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%" }}>
      {/* two runs, one amnesia between them */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 168px 1fr", gap: 14, alignItems: "stretch" }}>
        {([0, 1] as const).map((ri) => (
          <Reveal
            key={S.runs[ri].name}
            on
            delay={100 + ri * 260}
            style={{
              order: ri === 0 ? 0 : 2,
              border: "1px dashed var(--copper-500)",
              padding: "10px 14px",
              boxSizing: "border-box",
            }}
          >
            <div style={mono(9.5, "var(--copper-100)", 0.16)}>{S.runs[ri].name}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 9 }}>
              {S.runs[ri].steps.map((st, i) => (
                <div key={st} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <NumChip n={String(i + 1)} size={14} />
                  <span style={serif(11.5, "var(--neutral-200)")}>{st}</span>
                </div>
              ))}
            </div>
          </Reveal>
        ))}

        <Reveal on delay={300} style={{ order: 1, textAlign: "center", alignSelf: "center" }}>
          <svg width={168} height={22} style={{ display: "block" }} aria-hidden>
            <defs>
              <marker id="p19b-w-arr" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="7" markerHeight="7" orient="auto">
                <path d="M0,0.6 L7,4 L0,7.4" fill="none" stroke="var(--copper-600)" strokeWidth="1.4" />
              </marker>
            </defs>
            <line x1="2" y1="11" x2="62" y2="11" stroke="var(--copper-600)" strokeWidth="1.2" strokeDasharray="4 4" />
            <line x1="106" y1="11" x2="160" y2="11" stroke="var(--copper-600)" strokeWidth="1.2" strokeDasharray="4 4" markerEnd="url(#p19b-w-arr)" />
          </svg>
          <div
            className={reduced ? "" : "p19b-stamp"}
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
          <div style={{ ...serif(10.5, "var(--copper-300)", true), marginTop: 6 }}>{highlight(S.wipe, S.wipeKw)}</div>
        </Reveal>
      </div>

      {/* read ↑ / write ↓ between the runs and the repo */}
      <div style={{ position: "relative", height: 52 }}>
        <svg width="100%" height="46" style={{ display: "block", overflow: "visible" }} aria-hidden>
          <defs>
            <marker id="p19b-rw-arr" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="7" markerHeight="7" orient="auto">
              <path d="M0,0.6 L7,4 L0,7.4" fill="none" stroke="var(--copper-500)" strokeWidth="1.4" />
            </marker>
          </defs>
          {[9, 84].map((base, ri) => (
            <g key={base}>
              <line x1={`${base}%`} y1="42" x2={`${base}%`} y2="6" stroke="var(--copper-500)" strokeWidth="1.1" markerEnd="url(#p19b-rw-arr)" className={reduced ? "" : "p19b-dash-slow"} />
              <line x1={`${base + 7}%`} y1="4" x2={`${base + 7}%`} y2="40" stroke="var(--copper-500)" strokeWidth="1.1" markerEnd="url(#p19b-rw-arr)" className={reduced ? "" : "p19b-dash-slow"} />
              <text x={`${base - 1.6}%`} y="28" textAnchor="end" style={{ fontFamily: "var(--mono)", fontSize: 9, fill: "var(--copper-400)", letterSpacing: "0.14em" }}>
                {S.read.toUpperCase()}
              </text>
              <text x={`${base + 8.6}%`} y="28" style={{ fontFamily: "var(--mono)", fontSize: 9, fill: "var(--copper-400)", letterSpacing: "0.14em" }}>
                {S.write.toUpperCase()}
              </text>
              {ri === 1 && null}
            </g>
          ))}
        </svg>
        <Reveal on delay={700} style={{ position: "absolute", left: "30%", right: "30%", top: 12, textAlign: "center" }}>
          <span style={serif(10.5, "var(--copper-300)", true)}>{S.lesson}</span>
        </Reveal>
      </div>

      {/* the repo — the only continuous thing in the picture */}
      <Reveal on delay={480} style={{ border: "1px solid var(--copper-600)", background: "var(--copper-950)", padding: "10px 14px" }}>
        <div style={mono(9.5, "var(--copper-300)", 0.22)}>{S.repoTitle}</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 9 }}>
          {S.files.map((f) => (
            <div key={f.name} style={{ border: "1px solid var(--copper-800)", background: "var(--neutral-900)", padding: "8px 12px" }}>
              <div style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                <span style={{ fontFamily: "var(--mono)", fontSize: 10.5, color: "var(--copper-100)" }}>{f.name}</span>
                <span style={serif(11, "var(--copper-300)", true)}> — {f.role}</span>
              </div>
              <div style={{ ...serif(10.5, "var(--neutral-400)"), marginTop: 4 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </Reveal>
      </div>
    </PanelShell>
  );
}
