import type { JSX, ReactNode } from "react";
import { KeywordHighlight } from "./KeywordHighlight";

export function highlight(text: string, keywords: readonly string[]): ReactNode {
  // Sort longest-first to avoid shorter keywords matching inside longer ones
  // (e.g. "AI" inside "AI Steering Committee Lead").
  const sorted = [...keywords].sort((a, b) => b.length - a.length);
  const parts: (string | JSX.Element)[] = [text];
  for (const k of sorted) {
    for (let i = 0; i < parts.length; i++) {
      const seg = parts[i];
      if (typeof seg !== "string" || !seg.includes(k)) continue;
      const split = seg.split(k);
      const rebuilt: (string | JSX.Element)[] = [];
      split.forEach((s, j) => {
        if (j > 0) rebuilt.push(<KeywordHighlight key={`${k}-${i}-${j}`}>{k}</KeywordHighlight>);
        if (s) rebuilt.push(s);
      });
      parts.splice(i, 1, ...rebuilt);
      i += rebuilt.length - 1;
    }
  }
  return <>{parts.map((p, i) => (typeof p === "string" ? <span key={i}>{p}</span> : p))}</>;
}
