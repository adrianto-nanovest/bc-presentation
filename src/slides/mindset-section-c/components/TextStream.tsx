// TextStream — typewriter reveal that streams characters left-to-right while keeping full layout reserved.
import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

export interface TextStreamProps {
  text: string;
  keywords?: readonly string[];
  on: boolean;
  delayMs?: number;
  msPerChar?: number;
  onComplete?: () => void;
  testId?: string;
}

const ACCENT_STYLE: CSSProperties = {
  fontFamily: "var(--serif)",
  fontStyle: "italic",
  color: "var(--copper-400)",
  fontWeight: 400,
};

// Pre-compute the set of character indices that fall inside any keyword
// substring. Single pass, case-sensitive (matches existing `renderLine`).
function computeAccentMask(text: string, keywords: readonly string[]): boolean[] {
  const mask = new Array<boolean>(text.length).fill(false);
  for (const kw of keywords) {
    if (!kw) continue;
    let from = 0;
    while (from <= text.length - kw.length) {
      const idx = text.indexOf(kw, from);
      if (idx === -1) break;
      for (let i = idx; i < idx + kw.length; i++) mask[i] = true;
      from = idx + kw.length;
    }
  }
  return mask;
}

export function TextStream({
  text,
  keywords = [],
  on,
  delayMs = 0,
  msPerChar = 25,
  onComplete,
  testId,
}: TextStreamProps) {
  const [shown, setShown] = useState(0);
  const completedRef = useRef(false);

  useEffect(() => {
    if (!on) {
      setShown(0);
      completedRef.current = false;
      return;
    }
    let intervalId: number | undefined;
    const startTimer = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        setShown((prev) => {
          const next = prev + 1;
          if (next >= text.length) {
            if (intervalId !== undefined) window.clearInterval(intervalId);
            if (!completedRef.current) {
              completedRef.current = true;
              if (onComplete) onComplete();
            }
            return text.length;
          }
          return next;
        });
      }, msPerChar);
    }, delayMs);
    return () => {
      window.clearTimeout(startTimer);
      if (intervalId !== undefined) window.clearInterval(intervalId);
    };
  }, [on, text, delayMs, msPerChar, onComplete]);

  const accentMask = computeAccentMask(text, keywords);

  return (
    <span data-testid={testId}>
      {Array.from(text).map((ch, i) => {
        const visible = i < shown;
        const accent = accentMask[i];
        const style: CSSProperties = {
          opacity: visible ? 1 : 0,
          ...(accent ? ACCENT_STYLE : null),
        };
        return (
          <span key={i} style={style} aria-hidden={!visible}>
            {ch}
          </span>
        );
      })}
    </span>
  );
}
