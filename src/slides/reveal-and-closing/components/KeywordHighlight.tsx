import type { ReactNode } from "react";

// Memory rule (feedback_keyword_highlighting.md): 1–3 keywords per chunk.
// Always copper-400 italic. <em> is the semantic tag — already italic
// by browser default; we keep the class for explicit control.
export function KeywordHighlight({ children }: { children: ReactNode }) {
  return (
    <em className="text-copper-400 italic font-normal not-italic-fallback">
      {children}
    </em>
  );
}
