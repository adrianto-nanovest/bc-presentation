// Char-by-char streaming text. Used by E.2 (naive/proper prompts and their
// streamed results) and E.4 (technique example body).
//
// Ported from `claude-design-project/jsx/slides-a.jsx:283-313`. The animation
// runs on requestAnimationFrame and resets whenever `text`, `duration`, or
// `play` change. The blinking caret is an inline span styled by globals.css
// (`.tw-caret`, `.tw-caret-block`, `@keyframes tw-blink`).
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

export interface TypewriterProps {
  text: string;
  /** When true, start streaming. When false, hold at zero chars. */
  play?: boolean;
  /** Total streaming duration in ms. */
  duration?: number;
  /** "thin" → copper bar character; "block" → solid block caret. */
  caretStyle?: "thin" | "block";
  /** Override caret visibility (otherwise: visible while streaming). */
  caretWhen?: boolean;
  /** Optional render-prop to wrap the visible substring (e.g. with highlights). */
  render?: (visible: string) => ReactNode;
  className?: string;
  style?: CSSProperties;
}

export function Typewriter({
  text,
  play = true,
  duration = 900,
  caretStyle = "thin",
  caretWhen,
  render,
  className,
  style,
}: TypewriterProps) {
  const [chars, setChars] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!play) {
      setChars(0);
      return;
    }
    const total = text.length;
    if (total === 0) {
      setChars(0);
      return;
    }
    const start = performance.now();
    const tick = (t: number) => {
      const elapsed = t - start;
      const frac = Math.min(1, elapsed / duration);
      setChars(Math.floor(frac * total));
      if (frac < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setChars(total);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [play, text, duration]);

  const done = chars >= text.length;
  const visible = text.slice(0, chars);
  const showCaret = caretWhen !== undefined ? caretWhen : play && !done;
  const caret =
    caretStyle === "block" ? (
      <span className="tw-caret tw-caret-block" aria-hidden="true" />
    ) : (
      <span
        className="tw-caret"
        style={{ color: "var(--copper-300)" }}
        aria-hidden="true"
      >
        ▍
      </span>
    );

  return (
    <pre data-testid="typewriter" data-done={done} className={className} style={style}>
      {render ? render(visible) : visible}
      {showCaret ? caret : null}
    </pre>
  );
}
