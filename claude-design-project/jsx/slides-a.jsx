/* global window, React */
const { useState, useEffect, useMemo } = React;

// ────── helpers shared across slides ──────

// Draw a clean line from (x1,y1) to (x2,y2) but inset both endpoints
// so connectors stop short of node boxes (no overlap).
function insetLine(x1, y1, x2, y2, padStart, padEnd) {
  const dx = x2 - x1, dy = y2 - y1;
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len, uy = dy / len;
  return {
    x1: x1 + ux * padStart, y1: y1 + uy * padStart,
    x2: x2 - ux * padEnd,   y2: y2 - uy * padEnd,
  };
}

function LucideIcon({ name, size = 20, color = 'var(--copper-300)' }) {
  // Render via lucide createIcons after mount
  const ref = React.useRef(null);
  useEffect(() => {
    if (!ref.current || !window.lucide) return;
    ref.current.setAttribute('data-lucide', name.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, ''));
    ref.current.setAttribute('width', size);
    ref.current.setAttribute('height', size);
    ref.current.style.color = color;
    ref.current.style.strokeWidth = '1.75';
    window.lucide.createIcons({ nameAttr: 'data-lucide', icons: window.lucide.icons });
  }, [name, size, color]);
  return <i ref={ref} style={{ display: 'inline-flex', color, width: size, height: size }} />;
}

// ────────────────────── SLIDE E1 ──────────────────────
// THREE LAYERS — concentric rings + per-layer detail.
// 4 steps: 0=PROMPT, 1=CONTEXT, 2=HARNESS, 3=SUMMARY.
function SlideE1({ step }) {
  const focal = step === 0 ? 'prompt' : step === 1 ? 'context' : step === 2 ? 'harness' : null;
  const isSummary = step === 3;
  const [hoverTag, setHoverTag] = useState(null);

  // Ring sizes — outer ring expands as we add layers; on summary all 3 visible.
  const promptD  = step === 0 ? 220 : step === 1 ? 140 : 110;
  const contextD = step === 0 ? 0   : step === 1 ? 320 : 240;
  const harnessD = step <= 1 ? 0   : 380;

  return (
    <>
      <FigLabel num="1" kind="THE THREE LAYERS" />
      <Headline>
        <KW text={E1.headline} keywords={E1.headlineKw} />
      </Headline>

      {/* Left: concentric ring diagram — top-aligned with right column */}
      <div style={{ position: 'absolute', left: 60, top: 155, width: 540, height: 460, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <RingStack focal={focal} summary={isSummary} promptD={promptD} contextD={contextD} harnessD={harnessD} />
      </div>

      {/* Right: focal detail (steps 0–2) or summary (step 3) */}
      <div style={{ position: 'absolute', right: 60, top: 170, width: 580, bottom: 80 }}>
        {focal && <FocalDetail key={focal} layer={focal} hoverTag={hoverTag} setHoverTag={setHoverTag} />}
        {isSummary && <LayerSummary key="summary" />}
      </div>

      {/* Footer quote — only on summary step */}
      <Reveal on={isSummary} delay={250} style={{ position: 'absolute', left: 60, right: 60, bottom: 30 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
          <span style={{ fontFamily: 'var(--display)', fontSize: 36, color: 'var(--copper-400)', lineHeight: 1 }}>“</span>
          <p style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 17, color: 'var(--neutral-200)', margin: 0, lineHeight: 1.4, maxWidth: 800 }}>
            <KW text={E1.quote} keywords={E1.quoteKw} />
          </p>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.18em', color: 'var(--neutral-500)', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{E1.attr}</span>
        </div>
      </Reveal>
    </>
  );
}

function RingStack({ focal, summary, promptD, contextD, harnessD }) {
  const ring = (d, color, focalThis, layer, label, essence, kw) => d > 0 ? (
    <div style={{
      position: 'absolute', width: d, height: d, borderRadius: '50%',
      border: `1px solid ${color}`,
      background: focalThis ? 'rgba(184,110,61,0.05)' : 'transparent',
      transition: 'all 0.7s var(--ease)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: d <= 140 ? 8 : 12,
    }}>
      <span style={{ fontFamily: 'var(--mono)', fontSize: d <= 140 ? 9 : 11, letterSpacing: '0.18em', color: summary ? '#e8c4a0' : focalThis ? 'var(--copper-200)' : 'var(--copper-300)', textTransform: 'uppercase' }}>{label}</span>
      {(focalThis || summary) && (
        <span style={{
          fontFamily: 'var(--display)', fontStyle: 'italic',
          fontSize: d <= 140 ? 11 : d <= 240 ? 13 : 16,
          color: focalThis ? 'var(--neutral-100)' : 'var(--neutral-300)',
          marginTop: d <= 140 ? 1 : 4,
          whiteSpace: 'nowrap',
        }}>
          <KW text={essence} keywords={kw} />
        </span>
      )}
    </div>
  ) : null;

  return (
    <div style={{ position: 'relative', width: 400, height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {ring(harnessD, summary ? '#e8c4a0' : focal === 'harness' ? 'var(--copper-200)' : 'var(--copper-700)', focal === 'harness', 'harness', 'HARNESS', 'the system', ['system'])}
      {ring(contextD, summary ? '#e8c4a0' : focal === 'context' ? 'var(--copper-200)' : 'var(--copper-600)', focal === 'context', 'context', 'CONTEXT', 'the information', ['information'])}
      {ring(promptD,  summary ? '#e8c4a0' : focal === 'prompt'  ? 'var(--copper-200)' : 'var(--copper-500)', focal === 'prompt',  'prompt',  'PROMPT',  'the instructions', ['instructions'])}
    </div>
  );
}

function FocalDetail({ layer, hoverTag, setHoverTag }) {
  const data = E1.layers.find((l) => l.id === layer);
  const layerNum = layer === 'prompt' ? 1 : layer === 'context' ? 2 : 3;
  return (
    <Reveal on>
      <span style={{ fontFamily: 'var(--mono)', fontSize: 12, letterSpacing: '0.22em', color: 'var(--copper-300)', textTransform: 'uppercase' }}>Layer {layerNum}</span>
      <h2 style={{ fontFamily: 'var(--display)', fontSize: 56, color: 'var(--neutral-50)', margin: '8px 0 6px 0', lineHeight: 0.98 }}>
        {data.titleA}<br />{data.titleB}
      </h2>
      <p style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 20, color: 'var(--copper-200)', margin: '0 0 14px 0' }}>
        <KW text={data.essence} keywords={data.kw} />
      </p>
      <CopperRule on width="40%" delay={300} />
      <p style={{ fontFamily: 'var(--serif)', fontSize: 16, color: 'var(--neutral-300)', margin: '16px 0 18px 0', lineHeight: 1.5, maxWidth: 500 }}>
        {data.blurb}
      </p>

      {/* Keyword tag boxes — hover to highlight */}
      <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.22em', color: 'var(--copper-400)', textTransform: 'uppercase', marginBottom: 8 }}>
        Key terms · echoed in following slides
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, maxWidth: 540 }}>
        {data.tags.map((t) => {
          const isHover = hoverTag === t;
          return (
            <span
              key={t}
              onMouseEnter={() => setHoverTag(t)}
              onMouseLeave={() => setHoverTag(null)}
              style={{
                fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase',
                padding: '6px 10px',
                border: `1px solid ${isHover ? 'var(--copper-200)' : 'var(--copper-700)'}`,
                background: isHover ? 'rgba(217,158,108,0.12)' : 'rgba(10,10,10,0.4)',
                color: isHover ? 'var(--copper-100)' : 'var(--neutral-200)',
                transition: 'all 0.2s var(--ease)',
                cursor: 'default',
              }}
            >
              {t}
            </span>
          );
        })}
      </div>
    </Reveal>
  );
}

function LayerSummary() {
  return (
    <Reveal on>
      <span style={{ fontFamily: 'var(--mono)', fontSize: 12, letterSpacing: '0.22em', color: '#e8c4a0', textTransform: 'uppercase' }}>Three Layers · Summary</span>
      <h2 style={{ fontFamily: 'var(--display)', fontSize: 44, color: '#e8c4a0', margin: '10px 0 6px 0', lineHeight: 1 }}>The full stack.</h2>
      <div className="copper-rule on" style={{ width: '40%', background: '#e8c4a0' }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 22 }}>
        {E1.layers.map((l, i) => (
          <Reveal key={l.id} on delay={300 + i * 150}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, padding: '10px 14px', borderLeft: '2px solid #e8c4a0' }}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.22em', color: 'var(--copper-300)', textTransform: 'uppercase', minWidth: 56 }}>Layer {i + 1}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'var(--display)', fontSize: 24, color: 'var(--neutral-50)', lineHeight: 1.05 }}>
                  {l.titleA} {l.titleB}
                </div>
                <div style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 15, color: 'var(--neutral-300)', marginTop: 4, lineHeight: 1.35 }}>
                  {l.summarySub}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Reveal>
  );
}

function DemoPromptTyping({ play }) {
  const lines = [
    { l: 'Role:', b: ' You are a project lead.' },
    { l: 'Task:', b: ' Draft the weekly status.' },
    { l: 'Context:', b: ' Friday standup, 8 stakeholders.' },
    { l: 'Examples:', b: " See last week's report." },
    { l: 'Output:', b: ' Markdown, ~250 words.' },
  ];
  return (
    <div style={{ border: '1px solid var(--copper-700)', background: 'rgba(10,10,10,0.7)', padding: 22 }}>
      <div style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.18em', color: 'var(--copper-300)', marginBottom: 10, textTransform: 'uppercase' }}>Prompt skeleton</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontFamily: 'var(--mono)', fontSize: 14, lineHeight: 1.6 }}>
        {lines.map((ln, i) => (
          <Reveal key={i} on={play} delay={150 + i * 220}>
            <span style={{ color: 'var(--copper-300)', fontWeight: 600 }}>{ln.l}</span>
            <span style={{ color: 'var(--neutral-100)' }}>{ln.b}</span>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

function DemoContextNetwork({ play }) {
  const N = E1.layers; // unused but ensures import bundle keeps
  const labels = ['system instructions','user memory','RAG knowledge','tools & APIs','state','output'];
  const cx = 200, cy = 175, r = 110;
  const positions = labels.map((label, i) => {
    const theta = (i * Math.PI) / 3 - Math.PI / 2;
    return { label, x: cx + Math.cos(theta) * r, y: cy + Math.sin(theta) * r };
  });
  return (
    <div style={{ position: 'relative', width: 400, height: 350 }}>
      <svg viewBox="0 0 400 350" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        {/* Lines first so satellite circles paint over them */}
        {positions.map((p, i) => {
          const seg = insetLine(cx, cy, p.x, p.y, 14, 14);
          return (
            <line key={i} x1={seg.x1} y1={seg.y1} x2={seg.x2} y2={seg.y2} stroke="var(--copper-700)" strokeWidth="1" style={{ transition: `stroke-dashoffset 0.5s var(--ease) ${0.2 + i * 0.12}s, opacity 0.4s var(--ease) ${0.2 + i * 0.12}s`, strokeDasharray: 200, strokeDashoffset: play ? 0 : 200, opacity: play ? 1 : 0 }} />
          );
        })}
        <circle cx={cx} cy={cy} r="9" fill="var(--copper-400)" />
        {positions.map((p, i) => (
          <g key={i} style={{ transition: `opacity 0.3s var(--ease) ${0.5 + i * 0.12}s, transform 0.3s var(--ease) ${0.5 + i * 0.12}s`, opacity: play ? 1 : 0, transformOrigin: `${p.x}px ${p.y}px` }}>
            <circle cx={p.x} cy={p.y} r="6" fill="var(--copper-300)" />
            <text x={p.x} y={p.y + (p.y >= cy ? 22 : -12)} textAnchor="middle" fill="var(--neutral-200)" fontSize="11" fontFamily="var(--mono)">{p.label}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

function DemoMultiAgent({ play }) {
  // MAIN at top, 3 sub-agents at bottom (A B C). Lines drawn first, boxes after.
  const W = 460, H = 350;
  const main = { x: W / 2, y: 70, w: 200, h: 50, label: 'MAIN AGENT' };
  const subs = [
    { x: 90,  y: 240, w: 120, h: 50, label: 'AGENT A' },
    { x: W/2,y: 240, w: 120, h: 50, label: 'AGENT B' },
    { x: W-90, y: 240, w: 120, h: 50, label: 'AGENT C' },
  ];
  const boxEdge = (from, to) => {
    // inset toward target by half-height of `to` box plus 4px gap
    return insetLine(from.x, from.y, to.x, to.y, from.h / 2 + 4, to.h / 2 + 4);
  };
  return (
    <div style={{ position: 'relative', width: W, height: H }}>
      <div style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.18em', color: 'var(--copper-300)', textTransform: 'uppercase', position: 'absolute', top: -20, left: 0 }}>Orchestration</div>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        {/* Connectors first */}
        {subs.map((s, i) => {
          const seg = boxEdge(main, s);
          return (
            <line key={i} x1={seg.x1} y1={seg.y1} x2={seg.x2} y2={seg.y2} stroke="var(--copper-500)" strokeWidth="1.2" style={{ transition: `stroke-dashoffset 0.5s var(--ease) ${0.4 + i * 0.15}s`, strokeDasharray: 240, strokeDashoffset: play ? 0 : 240 }} />
          );
        })}
        {/* Boxes after — paint over line ends so visuals never cross */}
        <BoxNode {...main} on={play} delay={0} variant="primary" />
        {subs.map((s, i) => <BoxNode key={i} {...s} on={play} delay={700 + i * 150} variant="sub" />)}
      </svg>
    </div>
  );
}

function BoxNode({ x, y, w, h, label, on, delay = 0, variant = 'sub' }) {
  const x0 = x - w / 2, y0 = y - h / 2;
  return (
    <g style={{ transition: `opacity 0.4s var(--ease) ${delay}ms, transform 0.4s var(--ease) ${delay}ms`, opacity: on ? 1 : 0, transformOrigin: `${x}px ${y}px`, transform: on ? 'scale(1)' : 'scale(0.85)' }}>
      <rect x={x0} y={y0} width={w} height={h} fill="var(--neutral-900)" stroke={variant === 'primary' ? 'var(--copper-200)' : 'var(--copper-500)'} strokeWidth="1.2" />
      <text x={x} y={y + 4} textAnchor="middle" fill={variant === 'primary' ? 'var(--copper-100)' : 'var(--neutral-100)'} fontSize="12" fontFamily="var(--mono)" letterSpacing="2" style={{ textTransform: 'uppercase' }}>{label}</text>
    </g>
  );
}

// Streaming typewriter — animates `text` in over `duration` ms when `on` flips true.
// Used on slide E2 to make naive/proper LLM outputs feel like a live stream.
function Typewriter({ text, on, duration = 900, style, className, caretStyle = 'thin', caretWhen, render }) {
  const [chars, setChars] = useState(0);
  useEffect(() => {
    if (!on) { setChars(0); return; }
    const total = text.length;
    if (total === 0) { setChars(0); return; }
    const start = performance.now();
    let raf;
    const tick = (t) => {
      const elapsed = t - start;
      const frac = Math.min(1, elapsed / duration);
      setChars(Math.floor(frac * total));
      if (frac < 1) raf = requestAnimationFrame(tick);
      else setChars(total);
    };
    raf = requestAnimationFrame(tick);
    return () => { if (raf) cancelAnimationFrame(raf); };
  }, [on, text, duration]);
  const done = chars >= text.length;
  const visible = text.slice(0, chars);
  const showCaret = caretWhen !== undefined ? caretWhen : (on && !done);
  const caret = caretStyle === 'block'
    ? <span className="tw-caret tw-caret-block" aria-hidden="true" />
    : <span className="tw-caret" style={{ color: 'var(--copper-300)' }}>▍</span>;
  return (
    <pre className={className} style={style}>
      {render ? render(visible) : visible}
      {showCaret ? caret : null}
    </pre>
  );
}

// ────────────────────── SLIDE E2 ──────────────────────
// PROMPT — naive vs proper, side-by-side reveal.
function SlideE2({ step }) {
  return (
    <>
      <FigLabel num="2" kind="LAYER 1 · PROMPT" />
      <Headline className="small">
        <KW text={E2.headline} keywords={E2.headlineKw} />
      </Headline>

      {/* LEFT: definition + outcomes + bridge */}
      <div style={{ position: 'absolute', left: 48, top: 170, width: 460, bottom: 80, display: 'flex', flexDirection: 'column', gap: 18 }}>
        <Reveal on={step >= 0}>
          <p style={{ fontFamily: 'var(--serif)', fontSize: 22, color: 'var(--neutral-100)', margin: 0, lineHeight: 1.4 }}>
            <KW text={E2.definition} keywords={E2.definitionKw} />
          </p>
        </Reveal>
        <CopperRule on={step >= 0} width="30%" delay={300} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {E2.outcomes.map((o, i) => (
            <Reveal key={i} on={step >= 0} delay={400 + i * 150}>
              <p style={{ fontFamily: 'var(--serif)', fontSize: 17, color: 'var(--neutral-300)', margin: 0, lineHeight: 1.4 }}>
                <KW text={o.text} keywords={o.kw} />
              </p>
            </Reveal>
          ))}
        </div>
        <div style={{ flex: 1 }} />
        <Reveal on={step >= 5} delay={150}>
          <div style={{ borderLeft: '2px solid var(--copper-500)', paddingLeft: 14 }}>
            <p style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 16, color: 'var(--copper-200)', margin: 0, lineHeight: 1.4 }}>
              <KW text={E2.bridge} keywords={E2.bridgeKw} />
            </p>
          </div>
        </Reveal>
      </div>

      {/* RIGHT: NAIVE block (top), PROPER block (bottom) */}
      <div style={{ position: 'absolute', right: 48, top: 170, width: 680, bottom: 80, display: 'flex', flexDirection: 'column', gap: 14 }}>
        <Reveal on={step >= 1} className="card" style={{ borderColor: 'var(--copper-700)', flex: '0 0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.22em', color: 'var(--copper-400)', textTransform: 'uppercase' }}>Naive</span>
          </div>
          <Typewriter
            on={step >= 1}
            text={E2.naivePrompt}
            duration={400}
            caretStyle="block"
            caretWhen={step === 1}
            style={{ fontFamily: 'var(--mono)', fontSize: 14, color: 'var(--neutral-100)', whiteSpace: 'pre-wrap', margin: 0, lineHeight: 1.4 }}
          />
          <div style={{ height: step >= 2 ? 'auto' : 0, overflow: 'hidden', transition: 'opacity 0.5s var(--ease)', opacity: step >= 2 ? 1 : 0, marginTop: step >= 2 ? 10 : 0 }}>
            <Typewriter
              on={step >= 2}
              text={E2.naiveResult}
              duration={900}
              style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--neutral-300)', fontStyle: 'italic', whiteSpace: 'pre-wrap', margin: 0, lineHeight: 1.5 }}
            />
          </div>
        </Reveal>
        <Reveal on={step >= 3} className="card active" style={{ flex: '1 1 auto', overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.22em', color: 'var(--copper-300)', textTransform: 'uppercase' }}>Proper</span>
          </div>
          <Typewriter
            on={step >= 3}
            text={E2.properPrompt}
            duration={1000}
            caretStyle="block"
            caretWhen={step === 3}
            render={(t) => highlightLabels(t, E2.properLabels)}
            style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--neutral-100)', whiteSpace: 'pre-wrap', margin: 0, lineHeight: 1.5 }}
          />
          <div style={{ height: step >= 4 ? 'auto' : 0, overflow: 'hidden', transition: 'opacity 0.5s var(--ease)', opacity: step >= 4 ? 1 : 0, marginTop: step >= 4 ? 10 : 0, borderTop: step >= 4 ? '1px solid var(--copper-800)' : 'none', paddingTop: step >= 4 ? 10 : 0 }}>
            <Typewriter
              on={step >= 4}
              text={E2.properResult}
              duration={1000}
              style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--neutral-200)', whiteSpace: 'pre-wrap', margin: 0, lineHeight: 1.5 }}
            />
          </div>
        </Reveal>
      </div>
    </>
  );
}

function highlightLabels(text, labels) {
  const sorted = [...labels].sort((a, b) => b.length - a.length);
  let parts = [text];
  sorted.forEach((label, idx) => {
    parts = parts.flatMap((p, i) => {
      if (typeof p !== 'string' || !p.includes(label)) return [p];
      const split = p.split(label);
      const out = [];
      split.forEach((s, j) => {
        if (j > 0) out.push(<span key={`${idx}-${i}-${j}`} style={{ color: 'var(--copper-300)', fontWeight: 600 }}>{label}</span>);
        if (s) out.push(s);
      });
      return out;
    });
  });
  return <>{parts.map((p, i) => typeof p === 'string' ? <span key={i}>{p}</span> : React.cloneElement(p, { key: i }))}</>;
}

// ────────────────────── SLIDE E3 ──────────────────────
// One skeleton, many names. Spine on left, framework grid on right.
// Steps:
//   0 — spine 1–6 visible · hover popovers active · right column empty
//   1 — right title + framework grid
//   2 — footer
function SlideE3({ step }) {
  const [hoverFw, setHoverFw] = useState(null);
  const [hoverSpine, setHoverSpine] = useState(null);
  const lit = useMemo(() => {
    if (!hoverFw) return new Set();
    const fw = E3.frameworks.find((f) => f.id === hoverFw);
    return new Set((fw?.hits) || []);
  }, [hoverFw]);
  const showSpine = step >= 0;
  const showFrameworks = step >= 1;
  const showFooter = step >= 2;

  // Hover popover only available on step 0
  const popSpine = step === 0 && hoverSpine
    ? E3.spine.find((s) => s.id === hoverSpine)
    : null;

  // NOTE: SectionHeader and FrameworkGrid are intentionally inlined below.
  // Defining them as inner components caused React to remount the subtree on
  // every parent re-render (e.g. on hover) — which retriggered the entry
  // animation on the framework cards every time the user hovered.

  return (
    <>
      <FigLabel num="3" kind="LAYER 1 · STRUCTURE" />
      <Headline className="small">
        <KW text={E3.headline} keywords={E3.headlineKw} />
      </Headline>

      {/*
        Two-column grid that pins both sections to the same row grid:
        - row 1: section headers
        - rows 2–7: 6 spine cards in col 1
        - col 3 spans rows 2–7 with popover (step 0) or frameworks (steps ≥1)
        - on step 2, frameworks span rows 2–6 and footer goes in row 7
          → footer text bottom aligns exactly with card 6 bottom
      */}
      <div style={{
        position: 'absolute', left: 48, right: 48, top: 170, bottom: 80,
        display: 'grid',
        gridTemplateColumns: '470px 32px minmax(0, 1fr)',
        gridTemplateRows: 'auto repeat(6, minmax(0, 1fr))',
        rowGap: 8,
      }}>
        {/* Row 1 — headers (inlined; see note above) */}
        <div style={{ gridColumn: 1, gridRow: 1 }}>
          <div>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.22em', color: 'var(--copper-400)', textTransform: 'uppercase' }}>The Spine · 6 elements</span>
            <div style={{ height: 8 }} />
            <CopperRule on width="40%" />
            <div style={{ height: 14 }} />
          </div>
        </div>
        <div style={{ gridColumn: 3, gridRow: 1 }}>
          <div style={{ visibility: step === 0 ? 'hidden' : 'visible' }}>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.22em', color: 'var(--copper-400)', textTransform: 'uppercase' }}>{step === 0 ? 'The Spine · placeholder' : `Mnemonics · ${E3.frameworks.length} framings`}</span>
            <div style={{ height: 8 }} />
            <CopperRule on={step === 0 ? true : showFrameworks} width="40%" />
            <div style={{ height: 14 }} />
          </div>
        </div>

        {/* Rows 2–7 col 1 — spine cards */}
        {E3.spine.map((s, i) => {
          const isLit = lit.has(s.num);
          const isHovered = step === 0 && hoverSpine === s.id;
          return (
            <Reveal key={s.id} on={showSpine} delay={120 + i * 80}
              style={{ gridColumn: 1, gridRow: i + 2, display: 'flex' }}
            >
              <div
                onMouseEnter={() => setHoverSpine(s.id)}
                onMouseLeave={() => setHoverSpine(null)}
                style={{
                  flex: 1,
                  display: 'flex', alignItems: 'center', gap: 14,
                  padding: '10px 14px',
                  border: `1px solid ${isLit || isHovered ? 'var(--copper-200)' : 'var(--copper-800)'}`,
                  background: isLit || isHovered ? 'rgba(217,158,108,0.08)' : 'transparent',
                  transition: 'all 0.2s var(--ease)',
                }}
              >
                <span style={{ fontFamily: 'var(--display)', fontSize: 22, color: isLit || isHovered ? 'var(--copper-200)' : 'var(--copper-500)', minWidth: 24, lineHeight: 1 }}>{s.num}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 12, letterSpacing: '0.18em', color: isLit || isHovered ? 'var(--copper-100)' : 'var(--neutral-100)', textTransform: 'uppercase' }}>{s.name}</div>
                  <div style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 13, color: 'var(--neutral-400)', marginTop: 2 }}>{s.essence}</div>
                </div>
              </div>
            </Reveal>
          );
        })}

        {/* Right column — popover / frameworks / footer */}
        {step === 0 && popSpine && (
          <div style={{ gridColumn: 3, gridRow: '2 / span 6', display: 'flex', minHeight: 0 }}>
            <SpinePopover entry={popSpine} />
          </div>
        )}
        {step >= 1 && (
          <div style={{ gridColumn: 3, gridRow: showFooter ? '2 / span 5' : '2 / span 6', display: 'flex', minHeight: 0 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: 'repeat(5, 1fr)', gap: 10, height: '100%', width: '100%' }}>
              {E3.frameworks.map((f, i) => (
                <Reveal key={f.id} on={showFrameworks} delay={i * 50} style={{ display: 'flex' }}>
                  <div
                    onMouseEnter={() => setHoverFw(f.id)}
                    onMouseLeave={() => setHoverFw(null)}
                    style={{ flex: 1, padding: '10px 14px', border: `1px solid ${hoverFw === f.id ? 'var(--copper-300)' : 'var(--copper-800)'}`, background: hoverFw === f.id ? 'rgba(184,110,61,0.08)' : 'rgba(10,10,10,0.5)', transition: 'all 0.2s var(--ease)', cursor: 'default' }}
                  >
                    <div style={{ fontFamily: 'var(--display)', fontSize: 22, color: 'var(--neutral-50)', lineHeight: 1, marginBottom: 4 }}>{f.acronym}</div>
                    <div style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.1em', color: 'var(--neutral-400)', textTransform: 'uppercase', lineHeight: 1.3 }}>{f.breakdown}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        )}
        {showFooter && (
          <Reveal on={showFooter} style={{ gridColumn: 3, gridRow: 7, display: 'flex', alignItems: 'flex-end' }}>
            <p style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 14, color: 'var(--neutral-400)', margin: 0 }}>
              <KW text={E3.footer} keywords={E3.footerKw} /> Hover any acronym to light up the matching spine elements.
            </p>
          </Reveal>
        )}
      </div>
    </>
  );
}

// Rich-content popover that mirrors the spine column on the right.
// Returns null when nothing is hovered — right column stays blank.
function SpinePopover({ entry }) {
  if (!entry) return null;
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', border: '1px solid var(--copper-300)', background: 'rgba(20,12,6,0.85)', boxShadow: '0 0 0 1px rgba(217,158,108,0.18) inset', padding: '24px 28px', transition: 'all 0.2s var(--ease)' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
        <span style={{ fontFamily: 'var(--display)', fontSize: 56, color: 'var(--copper-200)', lineHeight: 0.9 }}>{entry.num}</span>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.22em', color: 'var(--copper-400)', textTransform: 'uppercase' }}>{entry.name}</span>
          <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 16, color: 'var(--neutral-300)' }}>{entry.essence}</span>
        </div>
      </div>
      <div style={{ height: 10 }} />
      <CopperRule on width="30%" />
      <div style={{ height: 16 }} />
      <p style={{ fontFamily: 'var(--serif)', fontSize: 18, color: 'var(--neutral-100)', margin: 0, lineHeight: 1.45 }}>{entry.pop.desc}</p>
      {entry.pop.pattern && (
        <>
          <div style={{ height: 14 }} />
          <div style={{ fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--copper-200)', padding: '10px 14px', border: '1px solid var(--copper-700)', background: 'rgba(0,0,0,0.45)', lineHeight: 1.45 }}>
            {entry.pop.pattern}
          </div>
        </>
      )}
      <div style={{ height: 16 }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {entry.pop.rows.map((r) => (
          <div key={r.label}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.22em', color: 'var(--copper-400)', textTransform: 'uppercase', marginBottom: 6 }}>{r.label}</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {r.items.map((it) => (
                <span key={it} style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--neutral-100)', padding: '4px 10px', border: '1px solid var(--copper-800)', background: 'rgba(10,10,10,0.55)' }}>{it}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div style={{ flex: 1 }} />
      {entry.pop.note && (
        <p style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 13, color: 'var(--neutral-400)', margin: '14px 0 0 0', borderTop: '1px solid var(--copper-800)', paddingTop: 12 }}>
          {entry.pop.note}
        </p>
      )}
    </div>
  );
}

// ────────────────────── SLIDE E4 ──────────────────────
// Eight techniques, three tiers. Hover a card to reveal details inline.
function SlideE4({ step }) {
  const [hoverId, setHoverId] = useState(null);
  const showFooter = step >= 3;
  const allCards = E4.tiers.flatMap((t) => t.cards.map((c) => ({ ...c, tier: t })));
  const hovered = hoverId ? allCards.find((c) => c.id === hoverId) : null;
  return (
    <>
      <FigLabel num="4" kind="PROMPT METHODOLOGIES" />
      <Headline className="small">
        <KW text={E4.headline} keywords={E4.headlineKw} />
      </Headline>

      <div style={{ position: 'absolute', left: 48, right: 48, top: 158, bottom: 290, display: 'flex', flexDirection: 'column', gap: 16 }}>
        {E4.tiers.map((tier, i) => {
          const revealed = step >= i;
          return (
            <Reveal key={tier.id} on={revealed} delay={i * 100} style={{ display: 'flex', alignItems: 'stretch', gap: 16, flex: 1 }}>
              <div style={{ width: 140, display: 'flex', flexDirection: 'column', justifyContent: 'center', borderLeft: `2px solid var(--${tier.copper})`, paddingLeft: 12 }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 14, letterSpacing: '0.18em', color: `var(--${tier.copper})`, textTransform: 'uppercase' }}>{tier.label}</span>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.18em', color: 'var(--neutral-500)', textTransform: 'uppercase', marginTop: 4 }}>Tier {i + 1}</span>
              </div>
              <div style={{ flex: 1, display: 'grid', gridTemplateColumns: `repeat(${tier.cards.length}, 1fr)`, gap: 12 }}>
                {tier.cards.map((c) => {
                  const active = hoverId === c.id;
                  return (
                    <div
                      key={c.id}
                      className="pcard"
                      onMouseEnter={() => setHoverId(c.id)}
                      onMouseLeave={() => setHoverId((prev) => (prev === c.id ? null : prev))}
                      style={{
                        borderColor: active ? `var(--${tier.copper})` : `var(--${tier.copper})`,
                        alignItems: 'flex-start',
                        cursor: 'default',
                        textAlign: 'left',
                        background: active ? 'rgba(217,119,87,0.08)' : 'rgba(10,10,10,0.7)',
                        boxShadow: active ? `0 0 0 1px var(--${tier.copper}), 0 0 24px -8px var(--${tier.copper})` : 'none',
                        transition: 'background 0.18s var(--ease), box-shadow 0.18s var(--ease)',
                      }}
                    >
                      <span style={{ fontFamily: 'var(--display)', fontSize: 22, color: 'var(--neutral-50)', lineHeight: 1.05 }}>{c.title}</span>
                      <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 13, color: 'var(--neutral-300)', lineHeight: 1.3 }}>{c.essence}</span>
                    </div>
                  );
                })}
              </div>
            </Reveal>
          );
        })}
      </div>

      <div style={{ position: 'absolute', left: 48, right: 48, bottom: 88, height: 190, pointerEvents: 'none' }}>
        <TechniqueDetail card={hovered} />
      </div>

      <Reveal on={showFooter} style={{ position: 'absolute', left: 48, right: 48, bottom: 50 }}>
        <p style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 14, color: 'var(--neutral-400)', margin: 0, lineHeight: 1.4 }}>
          <KW text={E4.footer} keywords={E4.footerKw} /> Hover a card for details.
        </p>
      </Reveal>
    </>
  );
}

function TechniqueDetail({ card }) {
  const detail = card ? E4.modal[card.id] : null;
  const accent = card ? `var(--${card.tier.copper})` : 'var(--copper-700)';
  const exampleDuration = detail ? Math.min(2400, Math.max(700, detail.example.length * 16)) : 800;
  return (
    <div
      style={{
        position: 'relative',
        height: '100%',
        border: card ? `1px solid ${accent}` : '1px solid transparent',
        background: card ? 'linear-gradient(180deg, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.6) 100%)' : 'transparent',
        padding: '16px 24px 14px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        opacity: card ? 1 : 0,
        transition: 'opacity 0.2s var(--ease), border-color 0.2s var(--ease), background 0.2s var(--ease)',
      }}
    >
      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, borderBottom: `1px solid ${accent}`, paddingBottom: 10 }}>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.22em', color: accent, textTransform: 'uppercase' }}>{card ? `${card.tier.label} · TIER` : '\u00A0'}</span>
        <h3 style={{ fontFamily: 'var(--display)', fontSize: 24, color: 'var(--neutral-50)', margin: 0, lineHeight: 1 }}>{card ? card.title : '\u00A0'}</h3>
        <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 14, color: 'var(--neutral-400)', marginLeft: 'auto' }}>{card ? card.essence : '\u00A0'}</span>
      </div>

      {/* Body grid: left = best for + trade-off · right = streaming example */}
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1.1fr 2fr', gap: 28, alignItems: 'stretch', minHeight: 0 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, justifyContent: 'flex-start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.22em', color: accent, textTransform: 'uppercase' }}>Best for</span>
            <span style={{ fontFamily: 'var(--serif)', fontSize: 14, color: 'var(--neutral-100)', lineHeight: 1.4 }}>{detail ? detail.bestFor : '\u00A0'}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.22em', color: accent, textTransform: 'uppercase' }}>Trade-off</span>
            <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 14, color: 'var(--neutral-300)', lineHeight: 1.4 }}>{detail ? detail.tradeOff : '\u00A0'}</span>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minHeight: 0, borderLeft: `1px solid ${accent}`, paddingLeft: 20 }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.22em', color: accent, textTransform: 'uppercase' }}>Example prompt</span>
          {detail && (
            <Typewriter
              key={card.id}
              on={true}
              text={detail.example}
              duration={exampleDuration}
              caretStyle="block"
              style={{ fontFamily: 'var(--mono)', fontSize: 12.5, color: 'var(--neutral-100)', whiteSpace: 'pre-wrap', margin: 0, lineHeight: 1.5 }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { SlideE1, SlideE2, SlideE3, SlideE4, LucideIcon, insetLine });
