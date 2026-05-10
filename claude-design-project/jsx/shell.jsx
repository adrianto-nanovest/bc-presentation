/* global React */
const { useState, useEffect, useRef, useMemo, useCallback, createContext, useContext, Fragment } = React;

// ─────────────────────────────────────────────────────────
// Stage / shell — handles 1280x720 letterbox scaling, slide
// + step navigation, keyboard, and the bottom nav bar.
// ─────────────────────────────────────────────────────────

function useViewportScale() {
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const fit = () => {
      const sx = window.innerWidth / 1280;
      const sy = window.innerHeight / 720;
      setScale(Math.min(sx, sy));
    };
    fit();
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, []);
  return scale;
}

const DeckCtx = createContext(null);
const useDeck = () => useContext(DeckCtx);

function DeckProvider({ slides, children }) {
  const [slideIdx, setSlideIdx] = useState(0);
  const [stepIdx, setStepIdx] = useState(0);

  const slide = slides[slideIdx];
  const totalSteps = slide ? slide.steps : 1;

  const nextStep = useCallback(() => {
    setStepIdx((s) => {
      if (s < totalSteps - 1) return s + 1;
      return s;
    });
  }, [totalSteps]);

  const prevStep = useCallback(() => {
    setStepIdx((s) => Math.max(0, s - 1));
  }, []);

  // Space/Enter: next step, but spill over to next slide on last step.
  const advance = useCallback(() => {
    setStepIdx((s) => {
      if (s < totalSteps - 1) return s + 1;
      // already at last step → next slide (if any), reset step to 0
      setSlideIdx((i) => {
        if (i < slides.length - 1) return i + 1;
        return i;
      });
      return 0;
    });
  }, [totalSteps, slides.length]);

  // Backspace/Delete: prev step, spill back to previous slide's last step.
  const retreat = useCallback(() => {
    setStepIdx((s) => {
      if (s > 0) return s - 1;
      // already at first step → prev slide, jump to its last step
      let nextSlideIdx = slideIdx;
      setSlideIdx((i) => {
        if (i > 0) { nextSlideIdx = i - 1; return i - 1; }
        nextSlideIdx = i; return i;
      });
      const target = slides[nextSlideIdx];
      return target ? target.steps - 1 : 0;
    });
  }, [slideIdx, slides]);

  const nextSlide = useCallback(() => {
    setSlideIdx((i) => {
      if (i < slides.length - 1) {
        setStepIdx(0);
        return i + 1;
      }
      return i;
    });
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setSlideIdx((i) => {
      if (i > 0) {
        setStepIdx(0);
        return i - 1;
      }
      return i;
    });
  }, []);

  const resetStep = useCallback(() => setStepIdx(0), []);
  const resetDeck = useCallback(() => { setSlideIdx(0); setStepIdx(0); }, []);

  useEffect(() => {
    const handler = (e) => {
      if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;
      switch (e.key) {
        case ' ':
        case 'Enter':
          e.preventDefault(); advance(); break;
        case 'Backspace':
        case 'Delete':
          e.preventDefault(); retreat(); break;
        case 'ArrowRight':
        case 'PageDown':
          e.preventDefault(); nextSlide(); break;
        case 'ArrowLeft':
        case 'PageUp':
          e.preventDefault(); prevSlide(); break;
        case 'r':
        case 'R':
          e.preventDefault(); resetDeck(); break;
        case 'u':
        case 'U':
          e.preventDefault(); resetStep(); break;
        default: break;
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [advance, retreat, nextSlide, prevSlide, resetDeck, resetStep]);

  const value = {
    slides, slideIdx, stepIdx, totalSteps, slide,
    nextStep, prevStep, advance, retreat, nextSlide, prevSlide, resetStep, resetDeck,
    setSlideIdx, setStepIdx,
  };

  return <DeckCtx.Provider value={value}>{children}</DeckCtx.Provider>;
}

// ───────────────────── Building blocks ─────────────────────

function FigLabel({ section = 'E', num, kind, title }) {
  return (
    <div className="fig-label">
      — FIG. {section}.{num}
      <span className="dot">·</span>
      <span style={{ color: 'var(--copper-200)' }}>{kind}</span>
      {title ? <><span className="dot">·</span><span style={{ color: 'var(--neutral-300)' }}>{title}</span></> : null}
    </div>
  );
}

function Headline({ children, className = '' }) {
  return (
    <div className="slide-headline-row">
      <h1 className={`slide-headline ${className}`}>{children}</h1>
    </div>
  );
}

// Inline keyword highlighter — wraps any matched substring in <em class="kw">
function KW({ text, keywords }) {
  if (!keywords || !keywords.length) return <>{text}</>;
  const sorted = [...keywords].sort((a, b) => b.length - a.length);
  let parts = [text];
  sorted.forEach((kw) => {
    parts = parts.flatMap((p) => {
      if (typeof p !== 'string' || !p.includes(kw)) return [p];
      const split = p.split(kw);
      const out = [];
      split.forEach((s, j) => {
        if (j > 0) out.push(<em key={`${kw}-${j}-${Math.random()}`} className="kw">{kw}</em>);
        if (s) out.push(s);
      });
      return out;
    });
  });
  return <>{parts.map((p, i) => typeof p === 'string' ? <span key={i}>{p}</span> : React.cloneElement(p, { key: i }))}</>;
}

function Reveal({ on, delay = 0, children, style = {}, as = 'div', className = '' }) {
  const Tag = as;
  return (
    <Tag
      className={`fade ${on ? 'on' : ''} ${className}`}
      style={{ ...style, transitionDelay: on ? `${delay}ms` : '0ms', animationDelay: on ? `${delay}ms` : '0ms' }}
    >
      {children}
    </Tag>
  );
}

function CopperRule({ on, delay = 0, width = '100%', style = {} }) {
  return (
    <div
      className={`copper-rule ${on ? 'on' : ''}`}
      style={{ width, transitionDelay: on ? `${delay}ms` : '0ms', ...style }}
    />
  );
}

// ───────────────────── Nav bar ─────────────────────

function IconChev({ dir }) {
  // simple svg chevrons
  if (dir === 'left') return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><polyline points="15 18 9 12 15 6"/></svg>;
  if (dir === 'right') return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><polyline points="9 18 15 12 9 6"/></svg>;
  if (dir === 'dleft') return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><polyline points="11 18 5 12 11 6"/><polyline points="19 18 13 12 19 6"/></svg>;
  if (dir === 'dright') return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><polyline points="13 18 19 12 13 6"/><polyline points="5 18 11 12 5 6"/></svg>;
  if (dir === 'reset-step') return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 12a9 9 0 1 0 3-6.7"/><polyline points="3 4 3 10 9 10"/></svg>;
  if (dir === 'reset-deck') return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 12a9 9 0 1 0 3-6.7"/><polyline points="3 4 3 10 9 10"/><line x1="14" y1="9" x2="14" y2="15"/><line x1="18" y1="9" x2="18" y2="15"/></svg>;
  return null;
}

function NavBar() {
  const d = useDeck();
  const atFirstStep = d.stepIdx <= 0;
  const atLastStep = d.stepIdx >= d.totalSteps - 1;
  const atFirstSlide = d.slideIdx <= 0;
  const atLastSlide = d.slideIdx >= d.slides.length - 1;
  const stop = (e) => e.stopPropagation();
  return (
    <div className="nav-bar" onClick={stop} onMouseDown={stop}>
      <div className="nav-clusters">
        <div className="nav-section-tag">Section E</div>
        <div className="nav-group">
          <div className="nav-group-head">
            <span className="nav-group-label">Step</span>
            <span className="nav-group-count">{String(d.stepIdx + 1).padStart(2, '0')} / {String(d.totalSteps).padStart(2, '0')}</span>
          </div>
          <div className="nav-group-row">
            <button className="nav-btn" title="Previous step (Backspace)" disabled={atFirstStep} onClick={d.prevStep}><IconChev dir="left"/></button>
            <button className="nav-btn" title="Next step (Space)" disabled={atLastStep} onClick={d.nextStep}><IconChev dir="right"/></button>
            <button className="nav-btn" title="Reset step (U)" onClick={d.resetStep}><IconChev dir="reset-step"/></button>
          </div>
        </div>
        <div className="nav-group">
          <div className="nav-group-head">
            <span className="nav-group-label">Slide</span>
            <span className="nav-group-count">{String(d.slideIdx + 1).padStart(2, '0')} / {String(d.slides.length).padStart(2, '0')}</span>
          </div>
          <div className="nav-group-row">
            <button className="nav-btn" title="Previous slide (←)" disabled={atFirstSlide} onClick={d.prevSlide}><IconChev dir="dleft"/></button>
            <button className="nav-btn" title="Next slide (→)" disabled={atLastSlide} onClick={d.nextSlide}><IconChev dir="dright"/></button>
            <button className="nav-btn" title="Reset deck (R)" onClick={d.resetDeck}><IconChev dir="reset-deck"/></button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ───────────────────── Stage ─────────────────────

function Stage() {
  const scale = useViewportScale();
  const d = useDeck();
  const Slide = d.slide.component;
  return (
    <div className="viewport">
      <div className="stage-wrap" style={{ transform: `scale(${scale})` }}>
        <div
          className={`stage ${d.slide.bg === 'light' ? 'light' : ''}`}
          onClick={(e) => {
            // Click anywhere inside the slide advances ONE step within the current slide.
            // No spillover to the next slide — that requires the explicit Slide buttons or arrow keys.
            const t = e.target;
            if (t && t.closest && t.closest('button, a, input, textarea, select, [data-no-advance]')) return;
            d.nextStep();
          }}
          style={{ cursor: 'pointer' }}
        >
          <Slide step={d.stepIdx} key={d.slideIdx} />
          <div className="nav-zone">
            <NavBar />
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, {
  DeckProvider, Stage, FigLabel, Headline, KW, Reveal, CopperRule, useDeck,
});
