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
import { afterEach, beforeEach, describe, vi } from "vitest";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { useDeck } from "@/deck/DeckContext";
import {
  DECK_SETS,
  VARIANTS,
  type DeckSetId,
  type VariantId,
} from "@/deck-variants";
import { SlideHarness } from "../support/slide-harness";
import {
  F8YourAgenticOs,
  f8Slide,
} from "@/slides/foundation-techniques-section-f/f8-your-agentic-os";
import {
  f8CloserFor,
  f8Content,
  type F8Closer,
} from "@/slides/foundation-techniques-section-f/content";

// ---------------------------------------------------------------------------
// The closer, signed off deck set by deck set (#54).
//
// QUOTED HERE AS LITERALS, not read back off `f8CloserFor`: reading the content
// module would only re-state whatever it currently holds and would pass straight
// through a silent rewording. The standard line is the one that shipped before
// #54 and must not move by one byte; the leader line is the variant #54 decided
// on, in place of a builder's portability promise addressed to a sponsor.
//
// A `Record<DeckSetId, …>` in the test too, for the reason the production table
// is one: a third deck set fails to compile HERE, by name, instead of quietly
// going unasserted.
// ---------------------------------------------------------------------------
const CLOSER_AS_SIGNED_OFF: Record<DeckSetId, F8Closer> = {
  standard: {
    tagline: "this is yours — wherever you go, you carry it.",
    taglineKw: ["yours", "carry it"],
  },
  leader: {
    tagline: "one person carries this — you decide whether a division does.",
    /** In the order `highlight()` renders them — DOM order, i.e. copy order. */
    taglineKw: ["one person", "a division"],
  },
};

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
    <SlideHarness def={f8Slide}>
      <AdvanceTo step={step} />
      <F8YourAgenticOs />
    </SlideHarness>,
  );
  act(() => {
    screen.getByTestId("goto").click();
  });
  return utils;
}

// ---------------------------------------------------------------------------
// Slide-def sanity (not a numbered test in spec §10, but cheap insurance).
// ---------------------------------------------------------------------------
test("F.8 slide-def declares 2 steps with canonicalPose=1, dark surface, `techniques`", () => {
  expect(f8Slide.steps).toBe(2);
  expect(f8Slide.canonicalPose).toBe(1);
  expect(f8Slide.animationMode).toBe("step-reveal");
  expect(f8Slide.sectionKey).toBe("techniques");
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
//
// This file mounts the slide under the default variant (`localhost` → `general`
// → deck set `standard`), so the STANDARD closer is the one under test here —
// unchanged by #54. The leader closer needs a module epoch of its own and is
// asserted in "the closer, per deck set" below.
// ---------------------------------------------------------------------------
test("§10.8 tagline — exact text visible at step 1", () => {
  renderAtStep(1);
  const tagline = screen.getByTestId("f8-tagline");
  expect(tagline.className).toMatch(/\bon\b/);
  // `highlight()` wraps keywords in <em class="kw"> spans, but textContent
  // strips tags — so the parent string should equal the spec tagline exactly.
  expect(tagline.textContent).toBe(CLOSER_AS_SIGNED_OFF.standard.tagline);
});

// ---------------------------------------------------------------------------
// The closer, per deck set (#54, spec §4.1 / §4.5).
//
// F.8 is relocated to C.2 in both leader decks, where the audience will sponsor
// this rather than build it, so the closer is deck-set-scoped copy resolved by
// section F's own content module. Two things can break silently:
//
//   1. The pick resolving to the wrong line — a leader deck closing C.2 on
//      "wherever you go, you carry it" looks like a working slide and argues
//      against C.1's whole-organisation abstraction in front of it. So the line
//      is READ BACK OUT OF THE DOM under a real leader `?variant=`, not asserted
//      off the content object: asserting the data against itself would pass even
//      with the slide wired to the other deck set's line.
//   2. A keyword that is not a substring of its copy. `highlight()` is a plain
//      `String.includes` that NO-OPS SILENTLY, so a typo drops a copper
//      highlight with no error anywhere.
//
// ONE EPOCH HOLDS ONE DECK SET. `VARIANT` resolves at module scope and the slide
// reads it, so a deck set's closer only exists inside a module registry loaded
// with that variant's `?variant=` in place. That also rules out `SlideHarness`
// here — it imports `composedDeck` statically and would mix a stale context
// object into a fresh registry — so these cases build the two providers the way
// `variant-composition.test.tsx` does.
// ---------------------------------------------------------------------------
const DECK_SET_IDS = Object.keys(DECK_SETS) as DeckSetId[];

/** Every registered variant, grouped by the deck set it serves. Read off
 *  `VARIANTS` rather than hand-listed, so a new variant arrives here by being
 *  registered — and a new DECK SET fails to compile on this initializer. */
const VARIANT_IDS_BY_DECK_SET: Record<DeckSetId, VariantId[]> = {
  standard: [],
  leader: [],
};
for (const variant of Object.values(VARIANTS)) {
  VARIANT_IDS_BY_DECK_SET[variant.deckSet].push(variant.id);
}

const realLocation = window.location;

interface RenderedCloser {
  /** Raw `textContent`: "byte-identical" has to mean it. */
  text: string;
  /** The keywords `highlight()` actually rendered, in DOM order — an empty array
   *  means every one of them missed. `KeywordHighlight` renders an `<em>`, and
   *  the closer carries no other emphasis, so the tag IS the selector. */
  highlights: string[];
  /** Whether the Reveal is lit — the closer only counts at its canonical pose. */
  revealed: boolean;
}

describe("the closer, per deck set", () => {
  beforeEach(() => vi.resetModules());

  afterEach(() => {
    Object.defineProperty(window, "location", {
      configurable: true,
      writable: true,
      value: realLocation,
    });
  });

  async function closerFor(id: VariantId): Promise<RenderedCloser> {
    Object.defineProperty(window, "location", {
      configurable: true,
      writable: true,
      value: new URL(`http://localhost:5173/?variant=${id}`),
    });
    vi.resetModules();
    cleanup(); // several variants are rendered inside one test case

    // FOUR MODULES, ONE EPOCH — including `SlideNumberContext` and
    // `DeckContext`. A React context is an object identity, so a provider
    // imported from outside this epoch would hand the slide a different context
    // than its `FigLabel` and `useDeck` read, and the render would throw.
    const [deck, slideNumber, { composedDeck }, f8] = await Promise.all([
      import("@/deck/DeckContext"),
      import("@/deck/SlideNumberContext"),
      import("@/deck/registry"),
      import("@/slides/foundation-techniques-section-f/f8-your-agentic-os"),
    ]);
    // BY ID, NOT BY IDENTITY. On a leader deck this slide is the one row the
    // deck set's `sectionOverrides` rewrites, and `resolveDeckSetSlides` returns
    // `{ ...def, sectionKey }` for an overridden slot — so the composed row holds
    // a COPY of the def and `row.def === f8Slide` is false there by construction.
    // The id is the join key (as `bridgeBeat2For` in
    // `variant-composition.test.tsx` also uses).
    const row = composedDeck.slides.find((s) => s.def.id === f8.f8Slide.id);
    if (!row) throw new Error(`F.8 is not in ${id}'s composed deck`);

    // The closer reveals at `canonicalPose`, and only this epoch's own `useDeck`
    // can reach this epoch's provider — hence a component declared in here.
    function AdvanceToCanonicalPose() {
      const { goTo } = deck.useDeck();
      return (
        <button
          data-testid="goto"
          onClick={() => goTo(0, f8.f8Slide.canonicalPose)}
        />
      );
    }

    const { container } = render(
      <deck.DeckProvider stepCounts={[f8.f8Slide.steps]}>
        <slideNumber.SlideNumberProvider
          value={{ letter: row.letter, num: row.num, sectionKey: row.sectionKey }}
        >
          <AdvanceToCanonicalPose />
          <f8.F8YourAgenticOs />
        </slideNumber.SlideNumberProvider>
      </deck.DeckProvider>,
    );
    act(() => {
      (container.querySelector('[data-testid="goto"]') as HTMLElement).click();
    });

    const closer = container.querySelector('[data-testid="f8-tagline"]');
    expect(closer, `no closer rendered for ${id}`).not.toBeNull();
    return {
      text: closer?.textContent ?? "",
      highlights: Array.from(closer?.querySelectorAll("em") ?? []).map(
        (el) => el.textContent ?? "",
      ),
      revealed: /\bon\b/.test(closer?.className ?? ""),
    };
  }

  test("every variant prints the closer its own deck set owns", async () => {
    for (const deckSet of DECK_SET_IDS) {
      for (const id of VARIANT_IDS_BY_DECK_SET[deckSet]) {
        const rendered = await closerFor(id);
        expect(rendered.text, id).toBe(CLOSER_AS_SIGNED_OFF[deckSet].tagline);
        expect(rendered.revealed, `${id}: closer revealed at canonical pose`).toBe(
          true,
        );
      }
    }
  });

  test("neither deck set prints the other's closer", async () => {
    // The negative is not implied by the positives above: both would still pass
    // if the two table rows were ever aliased to one string.
    expect((await closerFor("berau-leader")).text).not.toBe(
      CLOSER_AS_SIGNED_OFF.standard.tagline,
    );
    expect((await closerFor("berau-middle-mgmt")).text).not.toBe(
      CLOSER_AS_SIGNED_OFF.leader.tagline,
    );
  });

  test("the leader closer's two keywords both land, in copy order", async () => {
    // The contrast IS the line, and it is carried by the highlights: a keyword
    // that misses costs the copper on "one person" or "a division" and reports
    // nothing.
    const { highlights } = await closerFor("gems-leader");
    expect(highlights).toEqual([...CLOSER_AS_SIGNED_OFF.leader.taglineKw]);
  });

  test("the standard closer's two keywords both land, in copy order", async () => {
    const { highlights } = await closerFor("general");
    expect(highlights).toEqual([...CLOSER_AS_SIGNED_OFF.standard.taglineKw]);
  });
});

// ---------------------------------------------------------------------------
// `f8CloserFor` — the pick itself.
//
// Walks the REGISTERED deck sets (`DECK_SETS`), not a hand-kept pair: the
// `Record<DeckSetId, …>` already makes a missing deck set a compile error, and
// this is what holds the rules the compiler cannot see — an empty string, a
// keyword that misses, or a third deck set inheriting a line written for another
// audience.
// ---------------------------------------------------------------------------
describe("f8CloserFor", () => {
  test("every registered deck set resolves to the copy it was signed off with", () => {
    for (const deckSet of DECK_SET_IDS) {
      const closer = f8CloserFor(deckSet);
      expect(closer.tagline, deckSet).toBe(CLOSER_AS_SIGNED_OFF[deckSet].tagline);
      expect(closer.taglineKw, deckSet).toEqual([
        ...CLOSER_AS_SIGNED_OFF[deckSet].taglineKw,
      ]);
      expect(closer.tagline, `${deckSet}: closer is not empty`).not.toBe("");
    }
  });

  test("the standard closer is byte-identical to the line that shipped before #54", () => {
    // The literal, not the constant: this is the one assertion in the file that
    // may not be indirected, because it is the whole "do not change the string"
    // half of #54's decision.
    expect(f8CloserFor("standard").tagline).toBe(
      "this is yours — wherever you go, you carry it.",
    );
  });

  test("no two deck sets share a closer", () => {
    // Pairwise-distinct rather than `standard !== leader`, so a third deck set
    // has to bring its own line instead of copying one of these two.
    const taglines = DECK_SET_IDS.map((deckSet) => f8CloserFor(deckSet).tagline);
    expect(new Set(taglines).size).toBe(DECK_SET_IDS.length);
  });

  test("every keyword is a substring of the closer it highlights", () => {
    for (const deckSet of DECK_SET_IDS) {
      const closer = f8CloserFor(deckSet);
      for (const kw of closer.taglineKw) {
        expect(closer.tagline, `${deckSet}: closer kw`).toContain(kw);
      }
      // 1–3 keywords per chunk (feedback_keyword_highlighting.md).
      expect(closer.taglineKw.length, `${deckSet}: 1–3 keywords`).toBeLessThanOrEqual(3);
      expect(closer.taglineKw.length, `${deckSet}: at least one keyword`).toBeGreaterThan(0);
    }
  });
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
// §10.13 — Closer exclusivity: each deck set's closer is the literal payload of
// EXACTLY ONE slide-content file (Section F's content.tsx), and no other slide
// carries either of them.
//
// This is the surviving half of the original "appears EXACTLY ONCE in the entire
// deck" rule, which is a WITHIN-DECK uniqueness constraint — the 2026-05-11
// section-F spec lets sections C and J echo the theme but never repeat the
// phrase. #54's deck-set-scoped variant keeps it: one closer per deck set, both
// authored in one place, and no second slide printing either line.
//
// To avoid false positives from comments / doc-strings that document the
// constraint — the doc comment above the table quotes the old rule and part of
// the standard line — strip line and block comments before matching.
// ---------------------------------------------------------------------------
test("§10.13 closer exclusivity — each deck set's closer appears in exactly one file across src/slides/**/*.tsx", () => {
  const SLIDES_ROOT = path.resolve(__dirname, "../../src/slides");

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

  const sources = walk(SLIDES_ROOT).map((file) => ({
    file,
    code: stripComments(fs.readFileSync(file, "utf8")),
  }));

  // Per deck set, off the registered ids — a third deck set's closer is held to
  // the same rule the day it is registered.
  for (const deckSet of DECK_SET_IDS) {
    const matches = sources
      .filter(({ code }) => code.includes(f8CloserFor(deckSet).tagline))
      .map(({ file }) => file);
    expect(matches, deckSet).toHaveLength(1);
    expect(matches[0], deckSet).toMatch(/content\.tsx$/);
  }
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
