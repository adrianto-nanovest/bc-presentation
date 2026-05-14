// F.8 — YOUR AGENTIC OS · slide tests.
//
// The slide is a thin orchestrator that renders <AgenticOSMonitor stepIndex>.
// Round-2 step axis (2 steps; canonicalPose = 1) per
// docs/specs/2026-05-14-f8-agentic-os-monitor.md after the rework:
//   0 — bezel materializes; staggered reveal of top bar, nav rail, main canvas,
//       chat rail (panel content is always mounted)
//   1 — footer tagline reveals; canonical pose
//
// There are NO scripted per-region pulse highlights. All inner-monitor
// interactions are state-driven (click nav tab, click model picker, type into
// chat prompt, click Clear, click a quick-skill chip). Click-to-advance is
// blocked inside the bezel via `data-no-advance`.
import fs from "node:fs";
import path from "node:path";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { DeckProvider, useDeck } from "@/deck/DeckContext";
import {
  F8YourAgenticOs,
  f8Slide,
} from "@/slides/foundation-techniques-section-f/f8-your-agentic-os";
import { f8Content } from "@/slides/foundation-techniques-section-f/content";

// ---------------------------------------------------------------------------
// Render harness — mirrors the pattern used by every other Section F test.
// ---------------------------------------------------------------------------
function AdvanceTo({ step }: { step: number }) {
  const { goTo } = useDeck();
  return (
    <button data-testid="goto" onClick={() => goTo(0, step)} />
  );
}

function renderAtStep(step: number) {
  const utils = render(
    <DeckProvider stepCounts={[f8Slide.steps]}>
      <AdvanceTo step={step} />
      <F8YourAgenticOs />
    </DeckProvider>,
  );
  act(() => {
    screen.getByTestId("goto").click();
  });
  return utils;
}

// ---------------------------------------------------------------------------
// Slide-def sanity (not a numbered test in spec §10, but cheap insurance).
// ---------------------------------------------------------------------------
test("F.8 slide-def declares 2 steps with canonicalPose=1, dark surface, section F", () => {
  expect(f8Slide.steps).toBe(2);
  expect(f8Slide.canonicalPose).toBe(1);
  expect(f8Slide.animationMode).toBe("step-reveal");
  expect(f8Slide.section).toBe("F");
  expect(f8Slide.surface).toBe("dark");
});

// ---------------------------------------------------------------------------
// §10.1 — Smoke: render at step 0 and step 1 without throwing.
// ---------------------------------------------------------------------------
test("§10.1 smoke — renders without throwing at step 0", () => {
  expect(() => renderAtStep(0)).not.toThrow();
});

test("§10.1 smoke — canonical pose (step 1) renders without throwing", () => {
  expect(() => renderAtStep(1)).not.toThrow();
});

// ---------------------------------------------------------------------------
// §10.2 — Header: FigLabel + headline present.
// ---------------------------------------------------------------------------
test("§10.2 header — FigLabel `F.8 · YOUR AGENTIC OS` + headline present", () => {
  renderAtStep(0);
  const fig = document.querySelector(".fig-label");
  expect(fig).not.toBeNull();
  expect(fig?.textContent).toMatch(/FIG\.\s*F\.8.*YOUR\s*AGENTIC\s*OS/i);

  const headline = screen.getByTestId("f8-headline");
  expect(headline.textContent).toMatch(/the command center you carry\./);
});

// ---------------------------------------------------------------------------
// §10.3 — Step 0: bezel present, dashboard panel mounted (no scripted gate).
// The bezel runs an entry keyframe once; the panel content is always there.
// Tagline is hidden at step 0 (Reveal `on={false}`).
// ---------------------------------------------------------------------------
test("§10.3 step 0 — bezel + dashboard-panel mounted; tagline hidden", () => {
  renderAtStep(0);
  expect(screen.getByTestId("bezel")).toBeInTheDocument();
  expect(screen.getByTestId("dashboard-panel")).toBeInTheDocument();
  // Tagline is hidden at step 0 (Reveal `on={false}`).
  const tagline = screen.getByTestId("f8-tagline");
  expect(tagline.className).not.toMatch(/\bon\b/);
});

// ---------------------------------------------------------------------------
// §10.4 — Step 1: tagline visible; 4 dashboard tiles + chat rail present.
// (4 tiles are visible from step 0; no per-tile scripted highlight — we just
// assert presence.)
// ---------------------------------------------------------------------------
test("§10.4 step 1 — tagline visible; 4 tiles + chat rail present", () => {
  renderAtStep(1);
  const tagline = screen.getByTestId("f8-tagline");
  expect(tagline.className).toMatch(/\bon\b/);
  expect(screen.getByTestId("dashboard-panel")).toBeInTheDocument();
  expect(screen.getByTestId("tile-digest")).toBeInTheDocument();
  expect(screen.getByTestId("tile-brief")).toBeInTheDocument();
  expect(screen.getByTestId("tile-calendar")).toBeInTheDocument();
  expect(screen.getByTestId("tile-activity")).toBeInTheDocument();
  expect(screen.getByTestId("chat-rail")).toBeInTheDocument();
});

// ---------------------------------------------------------------------------
// §10.8 (renumbered) — Tagline exact text at step 1.
// ---------------------------------------------------------------------------
test("§10.8 tagline — exact text visible at step 1", () => {
  renderAtStep(1);
  const tagline = screen.getByTestId("f8-tagline");
  expect(tagline.className).toMatch(/\bon\b/);
  // `highlight()` wraps keywords in <em class="kw"> spans, but textContent
  // strips tags — so the parent string should equal the spec tagline exactly.
  expect(tagline.textContent).toBe(
    "this is yours — wherever you go, you carry it.",
  );
});

// ---------------------------------------------------------------------------
// §10.9 — Click nav: clicking SKILLS swaps panel.
// ---------------------------------------------------------------------------
test("§10.9 click nav — clicking SKILLS swaps dashboard out, skills in", () => {
  renderAtStep(1);
  expect(screen.getByTestId("dashboard-panel")).toBeInTheDocument();

  act(() => {
    fireEvent.click(screen.getByTestId("nav-skills"));
  });

  expect(screen.queryByTestId("dashboard-panel")).toBeNull();
  expect(screen.getByTestId("skills-panel")).toBeInTheDocument();
});

// ---------------------------------------------------------------------------
// §10.10 — Click each of the 8 nav items; matching panel renders.
// ---------------------------------------------------------------------------
test.each([
  ["dashboard"],
  ["skills"],
  ["agents"],
  ["vault"],
  ["memory"],
  ["connectors"],
  ["people"],
  ["settings"],
] as const)("§10.10 click each nav item — %s renders its panel", (tabId) => {
  renderAtStep(1);
  act(() => {
    fireEvent.click(screen.getByTestId(`nav-${tabId}`));
  });
  expect(screen.getByTestId(`${tabId}-panel`)).toBeInTheDocument();
});

// ---------------------------------------------------------------------------
// §10.11 — Model picker: CLICK-based dropdown with state.
// ---------------------------------------------------------------------------
test("§10.11 model picker — click opens dropdown, 4 options visible, selecting one updates pill text and closes dropdown", () => {
  renderAtStep(1);
  const btn = screen.getByTestId("model-picker-btn");
  // Default model on the pill.
  expect(btn.textContent).toMatch(/claude-opus-4-7/);

  // Click to open the dropdown.
  act(() => {
    fireEvent.click(btn);
  });

  // All 4 options present.
  const opusOpt = screen.getByTestId("model-option-claude-opus-4-7");
  const haikuOpt = screen.getByTestId("model-option-claude-haiku-4.5");
  const geminiOpt = screen.getByTestId("model-option-gemini-3.1-pro");
  const gptOpt = screen.getByTestId("model-option-gpt-5.5");
  expect(opusOpt.textContent?.trim()).toBe("claude-opus-4-7");
  expect(haikuOpt.textContent?.trim()).toBe("claude-haiku-4.5");
  expect(geminiOpt.textContent?.trim()).toBe("gemini-3.1-pro");
  expect(gptOpt.textContent?.trim()).toBe("gpt-5.5");

  // Dropdown is open: container has pointerEvents=auto via inline style.
  const dropdown = screen.getByTestId("model-dropdown");
  expect((dropdown as HTMLElement).style.pointerEvents).toBe("auto");

  // Select Gemini.
  act(() => {
    fireEvent.click(geminiOpt);
  });

  // Pill text reflects the new selection.
  expect(btn.textContent).toMatch(/gemini-3\.1-pro/);

  // Dropdown closes: pointerEvents flips back to none.
  expect((dropdown as HTMLElement).style.pointerEvents).toBe("none");
});

// ---------------------------------------------------------------------------
// §NEW prompt typing — controlled textarea reflects user input.
// ---------------------------------------------------------------------------
test("§NEW prompt typing — typing into chat-prompt updates its value", () => {
  renderAtStep(0);
  const prompt = screen.getByTestId("chat-prompt") as HTMLTextAreaElement;
  act(() => {
    fireEvent.change(prompt, { target: { value: "hello" } });
  });
  expect(prompt.value).toBe("hello");
});

// ---------------------------------------------------------------------------
// §NEW clear button — CLEAR wipes the prompt value.
// ---------------------------------------------------------------------------
test("§NEW clear button — clicking CLEAR empties the prompt", () => {
  renderAtStep(0);
  const prompt = screen.getByTestId("chat-prompt") as HTMLTextAreaElement;
  act(() => {
    fireEvent.change(prompt, { target: { value: "draft a summary" } });
  });
  expect(prompt.value).toBe("draft a summary");

  act(() => {
    fireEvent.click(screen.getByTestId("chat-clear"));
  });
  expect(prompt.value).toBe("");
});

// ---------------------------------------------------------------------------
// §NEW quick skill click — clicking a chip appends a /command to the prompt.
// ---------------------------------------------------------------------------
test("§NEW quick skill click — clicking a quick-skill chip appends its /command to the prompt", () => {
  renderAtStep(0);
  const prompt = screen.getByTestId("chat-prompt") as HTMLTextAreaElement;
  act(() => {
    fireEvent.click(screen.getByTestId("quick-skill-morning-brief"));
  });
  expect(prompt.value).toContain("/morning-brief");
});

// ---------------------------------------------------------------------------
// §NEW Memory 4 sections — 2×2 grid with bullets in each section.
// ---------------------------------------------------------------------------
test("§NEW memory panel — 4 sections each contain at least one bullet", () => {
  renderAtStep(1);
  act(() => {
    fireEvent.click(screen.getByTestId("nav-memory"));
  });

  const ids = [
    "memory-identity",
    "memory-preferences",
    "memory-recurring",
    "memory-recent",
  ] as const;
  for (const id of ids) {
    const box = screen.getByTestId(id);
    expect(box).toBeInTheDocument();
    const lis = box.querySelectorAll("li");
    expect(lis.length).toBeGreaterThan(0);
  }
});

// ---------------------------------------------------------------------------
// §NEW Add buttons — 6 panels expose `{tab}-add-btn`.
// ---------------------------------------------------------------------------
test.each([
  ["skills"],
  ["agents"],
  ["vault"],
  ["memory"],
  ["connectors"],
  ["people"],
] as const)("§NEW add button — %s panel exposes its add button", (tabId) => {
  renderAtStep(1);
  act(() => {
    fireEvent.click(screen.getByTestId(`nav-${tabId}`));
  });
  expect(screen.getByTestId(`${tabId}-add-btn`)).toBeInTheDocument();
});

// ---------------------------------------------------------------------------
// §NEW data-no-advance — the bezel carries the click-blocker contract.
// Slide.tsx honors this attribute by skipping `nextStep()` when the click
// originates inside an element marked `data-no-advance`. Asserting the
// attribute is the cheapest, most stable proxy for that behavior.
// ---------------------------------------------------------------------------
test("§NEW data-no-advance — bezel carries the data-no-advance attribute", () => {
  renderAtStep(0);
  const bezel = screen.getByTestId("bezel");
  expect(bezel.hasAttribute("data-no-advance")).toBe(true);
});

// ---------------------------------------------------------------------------
// §NEW Agent workflow diagrams — visible diagrams per agent (no hover popover).
// ---------------------------------------------------------------------------
test("§NEW agent workflow — clicking Agents reveals at least workflow-finn", () => {
  renderAtStep(1);
  act(() => {
    fireEvent.click(screen.getByTestId("nav-agents"));
  });
  expect(screen.getByTestId("workflow-finn")).toBeInTheDocument();
});

// ---------------------------------------------------------------------------
// §10.12 — Vault: clicking another folder updates the preview pane title.
// ---------------------------------------------------------------------------
test("§10.12 vault — clicking Reports folder updates preview pane title", () => {
  renderAtStep(1);
  act(() => {
    fireEvent.click(screen.getByTestId("nav-vault"));
  });

  // Default selected = "drafts" → title = "untitled · launch announcement".
  const defaultTitle = f8Content.vault.previews.drafts.title;
  expect(screen.getByText(defaultTitle)).toBeInTheDocument();

  // Click the Reports folder row (role="option" with aria-selected text).
  const reportsRow = Array.from(
    document.querySelectorAll(".f8-vault-row"),
  ).find((el) => el.textContent?.startsWith("Reports"));
  expect(reportsRow).toBeTruthy();
  act(() => {
    fireEvent.click(reportsRow as HTMLElement);
  });

  const reportsTitle = f8Content.vault.previews.reports.title;
  expect(screen.getByText(reportsTitle)).toBeInTheDocument();
});

// ---------------------------------------------------------------------------
// §10.13 — Tagline exclusivity: the exact tagline string is the literal
// payload of EXACTLY ONE slide-content file (Section F's content.tsx). To
// avoid false positives from comments / doc-strings that document the
// constraint, strip line and block comments before matching.
// ---------------------------------------------------------------------------
test("§10.13 tagline exclusivity — string literal appears exactly once across src/slides/**/*.tsx", () => {
  const SLIDES_ROOT = path.resolve(__dirname, "../../src/slides");
  const TAGLINE = "this is yours — wherever you go, you carry it.";

  function walk(dir: string, acc: string[] = []): string[] {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full, acc);
      } else if (entry.isFile() && entry.name.endsWith(".tsx")) {
        acc.push(full);
      }
    }
    return acc;
  }

  // Strip /* … */ block comments and //-to-EOL line comments so a comment that
  // documents the constraint doesn't count as a second occurrence.
  function stripComments(src: string): string {
    return src
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .replace(/(^|[^:])\/\/.*$/gm, "$1");
  }

  const files = walk(SLIDES_ROOT);
  const matches: string[] = [];
  for (const file of files) {
    const text = stripComments(fs.readFileSync(file, "utf8"));
    if (text.includes(TAGLINE)) matches.push(file);
  }
  expect(matches).toHaveLength(1);
  expect(matches[0]).toMatch(/content\.tsx$/);
});

// ---------------------------------------------------------------------------
// §10.14 — Accessibility: nav rail tablist, nav buttons aria-label, panels
// role=tabpanel, tooltips role=tooltip.
// ---------------------------------------------------------------------------
test("§10.14 a11y — nav rail role=tablist; buttons aria-label; panel role=tabpanel; tooltip role=tooltip", () => {
  renderAtStep(1);

  // Nav rail tablist.
  const rail = screen.getByTestId("agentic-os-nav-rail");
  expect(rail.getAttribute("role")).toBe("tablist");

  // Every nav button has aria-label matching its content.label.
  for (const item of f8Content.navRail) {
    const btn = screen.getByTestId(`nav-${item.id}`);
    expect(btn.getAttribute("aria-label")).toBe(item.label);
    expect(btn.getAttribute("role")).toBe("tab");
  }

  // Dashboard panel reports role=tabpanel.
  expect(screen.getByTestId("dashboard-panel").getAttribute("role")).toBe(
    "tabpanel",
  );

  // At least one nav tooltip is in the DOM with role=tooltip.
  const tooltips = document.querySelectorAll("[role='tooltip']");
  expect(tooltips.length).toBeGreaterThan(0);
});

// ---------------------------------------------------------------------------
// §10.15 — Reduced motion: stub matchMedia, verify the slide still renders.
// ---------------------------------------------------------------------------
test("§10.15 reduced motion — render OK when prefers-reduced-motion is set", () => {
  const originalMatchMedia = window.matchMedia;
  window.matchMedia = ((query: string) => ({
    matches: query.includes("prefers-reduced-motion"),
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  })) as typeof window.matchMedia;

  try {
    expect(() => renderAtStep(1)).not.toThrow();
    // Sanity: the canonical-pose-visible elements still mount.
    expect(screen.getByTestId("bezel")).toBeInTheDocument();
    expect(screen.getByTestId("dashboard-panel")).toBeInTheDocument();
    expect(screen.getByTestId("chat-rail")).toBeInTheDocument();
  } finally {
    window.matchMedia = originalMatchMedia;
  }
});
