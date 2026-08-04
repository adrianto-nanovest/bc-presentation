// B.4 — MODELS BY CATEGORY · the 2 Aug 2026 v4.1 refresh (gh#31).
//
// The slide's failure mode is MIXED VINTAGE: a pane that still carries June
// values while the freshness stamp says August. These tests pin every number
// on the slide to the 2 August 2026 Intelligence Index v4.1 capture, and pin
// the two derived structures (the at-a-glance bands, the scatter geometry) to
// rules rather than to hand-set values.
//
// Sources for every figure asserted here:
//   docs/researches/2026-07-31-artificialanalysis-model-data.md
//   docs/researches/2026-08-02-aa-gemini-pro-addendum.md
//   docs/references/artificialanalysis/2026-07-31-{text-to-image,text-to-video,
//                                                  text-to-speech,vocal}.png
import { render, screen, act } from "@testing-library/react";
import { useDeck } from "@/deck/DeckContext";
import { SlideHarness } from "../support/slide-harness";
import {
  B4ModelsByCategory,
  b4Slide,
} from "@/slides/landscape-section-b/b4-tiers-deployment";
import { B4ModelDetailPanel } from "@/slides/landscape-section-b/components/B4ModelDetailPanel";
import {
  b4Content as C,
  type B4QualitativeCell,
} from "@/slides/landscape-section-b/content";

const R1_KEYS = ["write-reason", "code", "agentic", "multimodal"] as const;
const ROSTER = [
  "Claude Opus 5",
  "GPT-5.6 Sol",
  "Gemini 3.6 Flash",
  "Kimi K3",
] as const;

function AdvanceTo({ step }: { step: number }) {
  const { goTo } = useDeck();
  return <button data-testid="goto" onClick={() => goTo(0, step)} />;
}

function renderAtStep(step: number) {
  const result = render(
    <SlideHarness def={b4Slide}>
      <AdvanceTo step={step} />
      <B4ModelsByCategory />
    </SlideHarness>,
  );
  act(() => {
    screen.getByTestId("goto").click();
  });
  return result;
}

// ───────────────────── spine is unchanged ─────────────────────

test("B.4 keeps its pose contract — 2 steps, canonicalPose 1", () => {
  expect(b4Slide.steps).toBe(2);
  expect(b4Slide.canonicalPose).toBe(1);
  expect(b4Slide.animationMode).toBe("step-reveal");
  expect(b4Slide.sectionKey).toBe("landscape");
});

test("B.4 still renders six category cards in the locked order", () => {
  expect(C.categories.map((c) => c.id)).toEqual([
    "write-reason",
    "code",
    "agentic",
    "multimodal",
    "creative",
    "cost-intel",
  ]);
});

// ───────────────────── slide copy ─────────────────────

test("B.4 copy carries the August vintage and the new argument", () => {
  expect(C.figLabel).toBe("MODELS BY CATEGORY");
  expect(C.slideTitle).toBe("Six categories, one map of what to use where.");
  expect(C.slideTitleKw).toEqual(["to use where"]);
  expect(C.footer).toBe(
    "The best models are within a few points of each other. The bills are not.",
  );
  expect(C.qualitativeSummary.footer).toBe(
    "Capability has one leader. Cost has another. Kimi K3 is close to both.",
  );
});

test("B.4 freshness stamps 2 August 2026 and discloses the effort tier once", () => {
  expect(C.freshness).toMatch(/2 August 2026/);
  expect(C.freshness).toMatch(/maximum reasoning effort/i);
  expect(C.freshness).not.toMatch(/June/i);
});

test("B.4 sub-labels reframe the two non-index cards", () => {
  const byId = (id: string) => C.categories.find((c) => c.id === id)!;
  expect(byId("creative").subLabel).toBe("Elo arenas · human preference");
  expect(byId("cost-intel").subLabel).toBe("What capability costs");
});

test("B.4 leaves the four section titles byte-identical", () => {
  expect(C.leftSectionTitle).toBe("SIX CATEGORIES");
  expect(C.rightSectionTitle).toBe("MODEL DETAILS");
  expect(C.rightSectionTitlePinned).toBe("PINNED · MODEL DETAILS");
  expect(C.qualitativeSummary.header).toBe("AT A GLANCE — RELATIVE STRENGTH");
});

// ───────────────────── R1 · four benchmark panels ─────────────────────

test("every R1 panel scores against a common denominator of 100", () => {
  for (const key of R1_KEYS) {
    expect(C.benchmarks[key].scaleMax).toBe(100);
  }
});

test("every R1 panel carries the same four-model roster", () => {
  for (const key of R1_KEYS) {
    const b = C.benchmarks[key];
    expect(b.frontier.map((r) => r.name)).toEqual([
      "Claude Opus 5",
      "GPT-5.6 Sol",
      "Gemini 3.6 Flash",
    ]);
    expect(b.openWeight.name).toBe("Kimi K3");
  }
});

test("R1 scores match the 2 Aug 2026 v4.1 capture exactly", () => {
  const expected: Record<string, readonly [number, number, number, number]> = {
    // [Claude Opus 5, GPT-5.6 Sol, Gemini 3.6 Flash, Kimi K3]
    "write-reason": [61, 59, 50, 57],
    code: [78.0, 77.4, 69.2, 76.2],
    agentic: [55.3, 54.0, 38.7, 50.1],
    multimodal: [85, 83, 83, 81],
  };
  for (const key of R1_KEYS) {
    const b = C.benchmarks[key];
    expect([...b.frontier.map((r) => r.score), b.openWeight.score]).toEqual([
      ...expected[key],
    ]);
  }
});

test("bar names are bare — no effort tier rides along on the chart", () => {
  for (const key of R1_KEYS) {
    const b = C.benchmarks[key];
    for (const name of [...b.frontier.map((r) => r.name), b.openWeight.name]) {
      expect(name).not.toMatch(/\(|max|high|xhigh|reasoning/i);
    }
  }
});

test("each category's gap figure appears exactly once — in the tagline", () => {
  const gaps: Record<string, string> = {
    "write-reason": "4 pts off the lead",
    code: "1.8 pts off the lead",
    agentic: "5.2 pts off the lead",
    multimodal: "4 pts off the lead",
  };
  for (const key of R1_KEYS) {
    expect(C.benchmarks[key].openWeight.tagline).toBe(gaps[key]);
  }
});

test("R1 footnotes carry meaning and never numbers", () => {
  for (const key of R1_KEYS) {
    const cat = C.categories.find((c) => c.id === key)!;
    expect(cat.footnote).not.toBe("");
    expect(cat.footnote).not.toMatch(/\d/);
    for (const kw of cat.footnoteKw) expect(kw).not.toMatch(/\d/);
    // The keyword must actually occur in the line it highlights.
    for (const kw of cat.footnoteKw) expect(cat.footnote).toContain(kw);
  }
});

test("the licence restriction is disclosed exactly once, in the R1 section head", () => {
  const { container } = render(<B4ModelDetailPanel categoryId="code" />);
  const hits = (container.textContent ?? "").match(
    /COMMERCIAL USE RESTRICTED/g,
  );
  expect(hits).toHaveLength(1);
  expect(container.textContent).toContain(
    "OPEN-WEIGHT CONTENDER · COMMERCIAL USE RESTRICTED",
  );
});

test("R1 bars render integer indices without invented precision", () => {
  const { container } = render(
    <B4ModelDetailPanel categoryId="write-reason" />,
  );
  const text = container.textContent ?? "";
  expect(text).toContain("61");
  expect(text).not.toContain("61.0");
});

test("multimodal bars keep their percent unit", () => {
  const { container } = render(<B4ModelDetailPanel categoryId="multimodal" />);
  expect(container.textContent).toContain("85%");
  expect(container.textContent).not.toContain("85.0%");
});

test("code bars keep the one decimal AA publishes", () => {
  const { container } = render(<B4ModelDetailPanel categoryId="code" />);
  expect(container.textContent).toContain("78.0");
});

// ───────────────────── R2 · creative card, four groups ─────────────────────

test("the creative card splits speech from music — four groups, names only", () => {
  expect(C.creativeChips.image).toEqual([
    "GPT Image 2",
    "Reve 2.1",
    "Nano Banana 2",
  ]);
  expect(C.creativeChips.video).toEqual([
    "Gemini Omni Flash",
    "MiniMax H3",
    "Dreamina Seedance 2.0",
  ]);
  expect(C.creativeChips.speech).toEqual([
    "Simba 3.2",
    "Qwen-Audio-3.0-TTS-Plus",
    "Gemini 3.1 Flash TTS",
  ]);
  expect(C.creativeChips.music).toEqual(["Suno V5.5", "Mureka V9"]);
});

test("the creative card renders all four group heads and no scores", () => {
  const { container } = render(<B4ModelDetailPanel categoryId="creative" />);
  const text = container.textContent ?? "";
  for (const head of ["IMAGE", "VIDEO", "SPEECH", "MUSIC"]) {
    expect(text).toContain(head);
  }
  // Names only — no Elo figures leak onto the card.
  expect(text).not.toMatch(/1,\d{3}/);
});

test("the retired creative names are gone from the deck", () => {
  const all = JSON.stringify(C);
  for (const dropped of ["Veo 3.1", "ElevenLabs", "Suno v5", "Midjourney"]) {
    expect(all).not.toContain(dropped);
  }
});

// ───────────────────── R3 · cost per task scatter ─────────────────────

test("the scatter plots eight models, one per vendor, four open and four closed", () => {
  expect(C.scatter).toHaveLength(8);
  expect(new Set(C.scatter.map((p) => p.name)).size).toBe(8);
  expect(C.scatter.filter((p) => p.kind === "frontier")).toHaveLength(4);
  expect(C.scatter.filter((p) => p.kind === "open-weight")).toHaveLength(4);
});

test("scatter values match the 2 Aug 2026 cost-per-task capture", () => {
  const expected = [
    { name: "Claude Opus 5", intelligence: 61, cost: 2.34, kind: "frontier" },
    { name: "GPT-5.6 Sol", intelligence: 59, cost: 1.86, kind: "frontier" },
    { name: "Grok 4.5", intelligence: 54, cost: 0.44, kind: "frontier" },
    { name: "Gemini 3.6 Flash", intelligence: 50, cost: 0.56, kind: "frontier" },
    { name: "Kimi K3", intelligence: 57, cost: 0.86, kind: "open-weight" },
    { name: "GLM-5.2", intelligence: 51, cost: 0.69, kind: "open-weight" },
    {
      name: "DeepSeek V4 Flash",
      intelligence: 50,
      cost: 0.03,
      kind: "open-weight",
    },
    { name: "MiniMax-M3", intelligence: 44, cost: 0.14, kind: "open-weight" },
  ];
  expect([...C.scatter].map((p) => ({ ...p }))).toEqual(
    expect.arrayContaining(expected),
  );
  expect(C.scatter).toHaveLength(expected.length);
});

test("DeepSeek V4 Flash sits in the open column — the 31 Jul label was refuted", () => {
  const ds = C.scatter.find((p) => p.name === "DeepSeek V4 Flash")!;
  expect(ds.kind).toBe("open-weight");
});

test("the scatter annotation is reproducible from the two dots it joins", () => {
  const a = C.scatterAnnotation;
  expect(a.from).toBe("Claude Opus 5");
  expect(a.to).toBe("DeepSeek V4 Flash");
  expect(a.label).toBe("82% of the intelligence, 1/78th the cost");

  const from = C.scatter.find((p) => p.name === a.from)!;
  const to = C.scatter.find((p) => p.name === a.to)!;
  // 50/61 = 82.0% (nearest whole percent).
  expect(Math.round((to.intelligence / from.intelligence) * 100)).toBe(82);
  // 2.34/0.03 = 78× (nearest whole multiple).
  expect(Math.round(from.cost / to.cost)).toBe(78);
});

test("every dot lands inside the plot area — including MiniMax-M3 at index 44", () => {
  const { container } = render(<B4ModelDetailPanel categoryId="cost-intel" />);
  const xAxis = container.querySelector(
    '[data-testid="b4-scatter-x-axis"]',
  ) as SVGLineElement | null;
  const yAxis = container.querySelector(
    '[data-testid="b4-scatter-y-axis"]',
  ) as SVGLineElement | null;
  expect(xAxis).not.toBeNull();
  expect(yAxis).not.toBeNull();

  // The two axis lines bound the plot area: x from the x-axis span, y from
  // the y-axis span.
  const left = Number(xAxis!.getAttribute("x1"));
  const right = Number(xAxis!.getAttribute("x2"));
  const top = Number(yAxis!.getAttribute("y1"));
  const bottom = Number(yAxis!.getAttribute("y2"));

  for (const p of C.scatter) {
    const dot = container.querySelector(
      `[data-testid="b4-scatter-dot-${p.name}"] circle`,
    ) as SVGCircleElement | null;
    expect(dot, `dot missing for ${p.name}`).not.toBeNull();
    const cx = Number(dot!.getAttribute("cx"));
    const cy = Number(dot!.getAttribute("cy"));
    const r = Number(dot!.getAttribute("r"));
    expect(cx - r, `${p.name} clips the left edge`).toBeGreaterThanOrEqual(left);
    expect(cx + r, `${p.name} clips the right edge`).toBeLessThanOrEqual(right);
    expect(cy - r, `${p.name} clips the top edge`).toBeGreaterThanOrEqual(top);
    expect(cy + r, `${p.name} falls out of the plot area`).toBeLessThanOrEqual(
      bottom,
    );
  }
});

test("the cost card carries no footnote — the scatter is dense enough", () => {
  const cat = C.categories.find((c) => c.id === "cost-intel")!;
  expect(cat.footnote).toBe("");
  const { container } = render(<B4ModelDetailPanel categoryId="cost-intel" />);
  expect(
    container.querySelector('[data-testid="b4-detail-footnote"]'),
  ).toBeNull();
});

test("the x axis is labelled cost per task, not cost to run the index", () => {
  const { container } = render(<B4ModelDetailPanel categoryId="cost-intel" />);
  const text = container.textContent ?? "";
  expect(text).toMatch(/COST PER TASK/i);
  expect(text).not.toMatch(/COST TO RUN/i);
  // The four new ticks, and none of the retired $200…$5k set.
  for (const tick of ["$0.05", "$0.20", "$1", "$3"]) {
    expect(text).toContain(tick);
  }
  expect(text).not.toMatch(/\$\d+k/);
});

// ───────────────────── step 1 · at-a-glance matrix ─────────────────────

test("the matrix rows follow the roster and the columns are unchanged", () => {
  expect(C.qualitativeSummary.rows).toEqual([...ROSTER]);
  expect(C.qualitativeSummary.columns).toEqual([
    "WRITE & REASON",
    "CODE",
    "AGENTIC",
    "MULTIMODAL",
    "COST",
  ]);
});

test("the matrix uses five bands, and uses all five", () => {
  const used = new Set(C.qualitativeSummary.cells.flat());
  expect(used).toEqual(
    new Set<B4QualitativeCell>([
      "best",
      "very-good",
      "good",
      "average",
      "weak",
    ]),
  );
});

test("exactly one BEST per column — a strict column leader", () => {
  const { cells, columns } = C.qualitativeSummary;
  for (let ci = 0; ci < columns.length; ci++) {
    const bests = cells.filter((row) => row[ci] === "best");
    expect(bests, `column ${columns[ci]}`).toHaveLength(1);
  }
});

// The bands are DERIVED, not hand-set. This test re-applies the documented
// rule to the slide's own numbers and requires the authored grid to match —
// so a future data edit that forgets to re-band the matrix fails here.
test("every band is reproducible from the slide's own numbers", () => {
  const capabilityBand = (score: number, leader: number): B4QualitativeCell => {
    if (score === leader) return "best";
    const r = score / leader;
    if (r >= 0.95) return "very-good";
    if (r >= 0.88) return "good";
    if (r >= 0.75) return "average";
    return "weak";
  };
  const costBand = (cost: number, cheapest: number): B4QualitativeCell => {
    if (cost === cheapest) return "best";
    const m = cost / cheapest;
    if (m <= 1.75) return "very-good";
    if (m <= 2.5) return "good";
    if (m <= 4) return "average";
    return "weak";
  };

  const scoreOf = (key: (typeof R1_KEYS)[number], model: string): number => {
    const b = C.benchmarks[key];
    const hit =
      b.frontier.find((r) => r.name === model) ??
      (b.openWeight.name === model ? b.openWeight : undefined);
    if (!hit) throw new Error(`${model} missing from ${key}`);
    return hit.score;
  };
  const costOf = (model: string): number => {
    const hit = C.scatter.find((p) => p.name === model);
    if (!hit) throw new Error(`${model} missing from the scatter`);
    return hit.cost;
  };

  const derived = ROSTER.map((model) => {
    const capability = R1_KEYS.map((key) => {
      const leader = Math.max(
        ...ROSTER.map((m) => scoreOf(key, m)),
      );
      return capabilityBand(scoreOf(key, model), leader);
    });
    const cheapest = Math.min(...ROSTER.map(costOf));
    return [...capability, costBand(costOf(model), cheapest)];
  });

  expect(C.qualitativeSummary.cells.map((r) => [...r])).toEqual(derived);
});

test("Kimi K3 is the value row — never best, never bad", () => {
  const { rows, cells } = C.qualitativeSummary;
  const kimi = cells[rows.indexOf("Kimi K3")];
  expect(kimi).not.toContain("best");
  expect(kimi).not.toContain("weak");
  expect(kimi).not.toContain("average");
});

test("Claude Opus 5 tops every capability column and pays for it", () => {
  const { rows, cells } = C.qualitativeSummary;
  const opus = cells[rows.indexOf("Claude Opus 5")];
  expect(opus.slice(0, 4)).toEqual(["best", "best", "best", "best"]);
  expect(opus[4]).toBe("weak");
});

test("the matrix renders one cell per model per column, with readable labels", () => {
  renderAtStep(1);
  const matrix = screen.getByTestId("b4-qualitative-summary");
  const cells = matrix.querySelectorAll('[data-testid^="b4-qsum-cell-"]');
  expect(cells).toHaveLength(20);
  // Band labels are display strings, not raw union members — "very-good"
  // must never reach the screen. The full "VERY GOOD" fits (measured: 68.4px
  // in a 90.4px cell), so no abbreviation is in play.
  expect(matrix.textContent).not.toContain("VERY-GOOD");
  expect(matrix.textContent).toContain("VERY GOOD");
});

test("no band label can wrap — every one is a single unbroken token run", () => {
  renderAtStep(1);
  const matrix = screen.getByTestId("b4-qualitative-summary");
  for (const cell of matrix.querySelectorAll('[data-testid^="b4-qsum-cell-"]')) {
    // jsdom has no layout, so this guards the input to layout rather than the
    // outcome: the rendered width is measured in the browser (see the note on
    // CELL_LABELS). What is checkable here is that nothing is long enough to
    // be a new risk and nothing arrived as a raw union id.
    const label = cell.textContent ?? "";
    expect(label).toMatch(/^[A-Z. ]+$/);
    expect(label.length).toBeLessThanOrEqual(9);
  }
});

// ───────────────────── the on-prem footnote ─────────────────────

test("the on-prem line renders at step 1, below the freshness stamp", () => {
  renderAtStep(1);
  const note = screen.getByTestId("b4-onprem-note");
  expect(note.textContent).toMatch(/most secure setup is the one you host/i);
  expect(note.textContent).toMatch(/sub-100B/);

  // It must sit AFTER the freshness stamp in document order.
  const freshness = screen.getByTestId("b4-freshness");
  expect(
    freshness.compareDocumentPosition(note) &
      Node.DOCUMENT_POSITION_FOLLOWING,
  ).toBeTruthy();
});

test("the on-prem line does not compete with the italic-serif thesis line", () => {
  renderAtStep(1);
  const note = screen.getByTestId("b4-onprem-note");
  const caption = screen.getByTestId("b4-footer-caption");
  // The bottom-left thesis line owns the italic-serif idiom on this slide.
  expect(caption.style.fontFamily).toContain("serif");
  expect(caption.style.fontStyle).toBe("italic");
  // The on-prem note must use a different idiom.
  expect(note.style.fontFamily).toContain("mono");
  expect(note.style.fontStyle).not.toBe("italic");
});

test("the on-prem line is absent at step 0", () => {
  renderAtStep(0);
  expect(screen.queryByTestId("b4-onprem-note")).toBeNull();
});

// ───────────────────── guards ─────────────────────

// `heatmap` is deprecated and unrendered. This locks it so a data refresh
// neither updates it (implying it is live) nor deletes it (out of scope).
test("the deprecated heatmap is left exactly as it was", () => {
  expect(C.heatmap.rows).toEqual([
    "Claude Opus 4.8",
    "GPT-5.5",
    "Gemini 3.1 Pro",
    "MiniMax-M3",
  ]);
  expect(C.heatmap.scores[0]).toEqual([1.0, 0.95, 1.0, 0.95, 0.17]);
  expect(C.heatmap.descriptor).toBe(
    "Frontier leads 4/5. Open-weight wins cost. The gap is fine-tunable.",
  );
});

test("the heatmap is not rendered at either pose", () => {
  for (const step of [0, 1]) {
    const { container, unmount } = renderAtStep(step);
    expect(container.textContent).not.toContain("Claude Opus 4.8");
    expect(container.textContent).not.toContain("GPT-5.5");
    unmount();
  }
});

test("no June-vintage model name survives on the slide", () => {
  const live = JSON.stringify({
    figLabel: C.figLabel,
    slideTitle: C.slideTitle,
    categories: C.categories,
    benchmarks: C.benchmarks,
    creativeChips: C.creativeChips,
    scatter: C.scatter,
    scatterAnnotation: C.scatterAnnotation,
    qualitativeSummary: C.qualitativeSummary,
    footer: C.footer,
    freshness: C.freshness,
  });
  for (const retired of [
    "Opus 4.8",
    "Opus 4.7",
    "GPT-5.5",
    "Gemini 3.1 Pro",
    "Gemini 3.5 Flash",
    "DeepSeek V4 Pro",
    "Kimi K2.6",
    "MiMo-V2.5-Pro",
    "Grok 4.3",
  ]) {
    expect(live, `${retired} is June vintage`).not.toContain(retired);
  }
});

test("B.4 still renders its FIG label with the section/num props intact", () => {
  const { container } = renderAtStep(1);
  const fig = container.querySelector(".fig-label") as HTMLElement;
  expect(fig).not.toBeNull();
  expect(fig.textContent).toMatch(/FIG\.\s*B\.4\s*·\s*MODELS BY CATEGORY/);
});
