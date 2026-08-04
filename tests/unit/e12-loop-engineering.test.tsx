// E.12 — LOOP ENGINEERING · slide tests (gh#48 slice: pose 0 only).
//
// WHAT THIS FILE CAN AND CANNOT PROVE. jsdom has no layout, so "both verdict
// dividers sit at the same y" is asserted the only way it can be true for good:
// STRUCTURALLY. Both panels render the same `Verdict` component at the same fixed
// offset and height, so the assertion below compares those declarations rather
// than two measured positions — a copy edit cannot move one divider without
// moving the other. The rendered y values, the one-line verdict body and the
// quote-to-panel alignment were measured in the browser at 1280×720; the
// numbers are in the ticket.
//
// The hover TIERS are in globals.css (`.e12-box`), which jsdom does not apply
// either. What is checkable here is that every card box is routed through the one
// component that carries the class — which is the actual failure mode owner
// correction 4 names: a box that forgot the affordance.
import { render, screen } from "@testing-library/react";
import { SlideHarness } from "../support/slide-harness";
import {
  E12LoopEngineering,
  e12Slide,
} from "@/slides/foundation-core-section-e/e12-loop-engineering";
import { e12Content } from "@/slides/foundation-core-section-e/content";

function renderSlide() {
  return render(
    <SlideHarness def={e12Slide}>
      <E12LoopEngineering />
    </SlideHarness>,
  );
}

/** Every card box on the slide, by testid — the eleven boxes pose 0 draws. */
const BOX_TESTIDS = [
  "e12-turn-0",
  "e12-turn-1",
  "e12-turn-2",
  "e12-turn-3",
  "e12-heartbeat",
  "e12-station-discover",
  "e12-station-implement",
  "e12-station-verify",
  "e12-station-commit",
  "e12-spine",
  "e12-gate",
] as const;

// ── the slide def ────────────────────────────────────────────────────────────

test("E.12 declares this slice's shape: 1 step, canonical pose 0, in `fundamentals`", () => {
  // gh#49 raises these to 3 / 2. Until then the deck is walkable and exportable
  // at every commit, which is why the count is not declared ahead of the poses.
  expect(e12Slide.id).toBe("e12-loop-engineering");
  expect(e12Slide.steps).toBe(1);
  expect(e12Slide.canonicalPose).toBe(0);
  expect(e12Slide.animationMode).toBe("step-reveal");
  expect(e12Slide.surface).toBe("dark");
  expect(e12Slide.sectionKey).toBe("fundamentals");
});

// ── the figure, the headline, and what is NOT on the slide ───────────────────

test("prints `FIG. E.12 · LOOP ENGINEERING`, derived from its composed position", () => {
  renderSlide();
  expect(document.querySelector(".fig-label")?.textContent).toMatch(
    /FIG\.\s*E\.12.*LOOP ENGINEERING/,
  );
});

test("the headline renders with `writing loops` as its keyword", () => {
  renderSlide();
  const headline = document.querySelector("h1.slide-headline");
  expect(headline?.textContent).toBe("Stop writing prompts. Start writing loops.");
  const keywords = [...(headline?.querySelectorAll("em.text-copper-400") ?? [])].map(
    (k) => k.textContent,
  );
  expect(keywords).toEqual(["writing loops"]);
});

test("carries NO qualifier strip — the FigLabel and the quotes carry the term", () => {
  // §8.3, owner call: the mono line under the headline is deleted. Asserted as
  // the slide's whole structure, because "no strip" is a claim about what is
  // absent and a testid for an absent element would always pass.
  const { container } = renderSlide();
  const top = [...container.children].map((el) => el.className || el.getAttribute("data-testid"));
  expect(top).toEqual(["fig-label", "slide-headline-row", "e12-mindset"]);
});

// ── pose 0: both panels, the bridge, both quotes ─────────────────────────────

test("pose 0 renders both panels and the bridge between them", () => {
  renderSlide();

  const left = screen.getByTestId("e12-panel-prompting");
  expect(left.textContent).toContain("PROMPTING — TURN BY TURN");
  e12Content.mindset.left.rows.forEach((r) => expect(left.textContent).toContain(r.text));
  expect(left.textContent).toContain("you, again");

  const right = screen.getByTestId("e12-panel-looping");
  expect(right.textContent).toContain("LOOPING — A SYSTEM YOU DESIGN ONCE");
  e12Content.mindset.right.stations.forEach((s) => expect(right.textContent).toContain(s.label));
  expect(right.textContent).toContain("progress.md");
  expect(right.textContent).toContain("YOU — THE HUMAN GATE");
  // The escapes that make the gate the only human stop on the panel.
  expect(right.textContent).toContain("risky");
  expect(right.textContent).toContain("approved");

  expect(screen.getByTestId("e12-bridge").textContent).toBe("THELEVERAGEMOVES");
});

test("the right panel's token is a live SMIL node — the half the caption cannot carry", () => {
  renderSlide();
  expect(screen.getByTestId("e12-token")).toBeInTheDocument();
  expect(document.querySelectorAll("animateMotion")).toHaveLength(1);
});

// ── owner correction 1 — one verdict block, so one divider height ────────────

test("both verdict dividers are the same block at the same offset", () => {
  renderSlide();
  const left = screen.getByTestId("e12-verdict-prompting");
  const right = screen.getByTestId("e12-verdict-looping");

  // The divider IS this block's top border, so equal `bottom` + `height` in
  // panels of equal height put both rules on one line. Compared as the whole
  // declaration, so a future style edit to one panel cannot pass this.
  for (const el of [left, right]) {
    expect(el.style.bottom).toBe("14px");
    expect(el.style.height).toBe("56px");
  }
  expect(left.style.cssText).toBe(right.style.cssText);
});

test("the left verdict body is one line's worth of copy, and keeps its meaning", () => {
  // The wrap itself is a browser fact (measured at 1280×720). What is pinned here
  // is the copy that made it fit — short enough for the 448px panel, and still
  // naming all three jobs plus the consequence.
  const { verdict, verdictKw } = e12Content.mindset.left;
  expect(verdict).toBe("Heartbeat, checker, memory — all you. Stop, and the work stops.");
  expect(verdict.length).toBeLessThanOrEqual(72);
  expect(verdictKw).toEqual(["the work stops"]);
});

// ── owner corrections 2 and 3 — the quotes ──────────────────────────────────

test("Steinberger is left with his affiliation; Cherny is right and one line", () => {
  renderSlide();

  const left = screen.getByTestId("e12-quote-left");
  expect(left.textContent).toContain("PETER STEINBERGER · FOUNDER OF OPENCLAW");
  expect(left.textContent).toContain("designing loops that prompt your agents");

  const right = screen.getByTestId("e12-quote-right");
  expect(right.textContent).toContain("BORIS CHERNY · CREATOR OF CLAUDE CODE");
  // A PARAPHRASE, not the prototype's sentence: that one traces to a secondary
  // article marked *not verified* (§12.1 call 5).
  expect(e12Content.mindset.quotes[1].text).toBe(
    "I don't prompt Claude anymore — I write the loops that prompt it.",
  );
  expect(e12Content.mindset.quotes[1].text.length).toBeLessThanOrEqual(80);
});

test("each quote block's left edge is its own panel's left edge", () => {
  renderSlide();
  // Correction 3, as the two numbers that have to agree: the left column starts
  // at the diptych's own left edge, the right column at the right panel's.
  expect(screen.getByTestId("e12-quote-left").style.left).toBe("0px");
  expect(screen.getByTestId("e12-quote-right").style.left).toBe("600px");
  expect(screen.getByTestId("e12-quote-right").style.width).toBe("584px");
});

// ── owner correction 4 — every box hover-reacts ─────────────────────────────

test("every card box on the slide carries the hover class, and nothing fades", () => {
  renderSlide();
  BOX_TESTIDS.forEach((id) => {
    const box = screen.getByTestId(id);
    expect(box.className, id).toContain("e12-box");
    // Rank is a colour tier (§8.3): no box rests semi-transparent, on any pose.
    expect(box.style.opacity, id).toBe("");
  });
  // Boxes are only ever built by the one component, so this count is also the
  // guard against a twelfth box drawn by hand without the affordance.
  expect(document.querySelectorAll(".e12-box")).toHaveLength(BOX_TESTIDS.length);
});

// ── reduced motion ─────────────────────────────────────────────────────────

describe("prefers-reduced-motion: reduce", () => {
  const realMatchMedia = window.matchMedia;

  beforeEach(() => {
    window.matchMedia = ((query: string) => ({
      matches: query.includes("prefers-reduced-motion"),
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    })) as unknown as typeof window.matchMedia;
  });

  afterEach(() => {
    window.matchMedia = realMatchMedia;
  });

  test("mounts zero SMIL nodes, and pose 0 still renders complete", () => {
    renderSlide();
    // SMIL is invisible to the global CSS reduced-motion rule, so it is gated at
    // mount — the CSS loops (relay, EKG, chevrons) are squashed by that rule and
    // stay in the markup as still frames.
    expect(document.querySelectorAll("animateMotion")).toHaveLength(0);
    // COMPLETE means complete: the token itself still mounts, at rest where the
    // heartbeat hands the beat over. Only its motion node is gated.
    const token = screen.getByTestId("e12-token");
    expect(token.getAttribute("cx")).toBe("294");
    expect(token.getAttribute("cy")).toBe("30");

    expect(screen.getByTestId("e12-panel-prompting")).toBeInTheDocument();
    expect(screen.getByTestId("e12-panel-looping")).toBeInTheDocument();
    expect(screen.getByTestId("e12-bridge")).toBeInTheDocument();
    expect(screen.getByTestId("e12-quote-left")).toBeInTheDocument();
    expect(screen.getByTestId("e12-quote-right")).toBeInTheDocument();
    expect(document.querySelectorAll(".e12-box")).toHaveLength(BOX_TESTIDS.length);
  });
});

// ── the copy rule §8.3 states, checked over the copy itself ─────────────────

const M = e12Content.mindset;

/** Labels, never sentences — §8.3 forbids keywords on any of these. */
const MONO: readonly string[] = [
  M.left.title,
  ...M.bridge,
  M.right.title,
  M.right.heartbeat,
  ...M.right.stations.map((s) => s.label),
  M.right.spine.label,
  M.right.spine.file,
  M.right.gate.label,
  ...M.quotes.map((q) => q.attr),
];

/** The prose chunks long enough to hold a keyword inside them. */
const HIGHLIGHTED: readonly { text: string; kw: readonly string[] }[] = [
  { text: e12Content.headline, kw: e12Content.headlineKw },
  { text: M.left.verdict, kw: M.left.verdictKw },
  { text: M.right.verdict, kw: M.right.verdictKw },
  { text: M.right.gate.sub, kw: M.right.gate.subKw },
  ...M.quotes.map((q) => ({ text: q.text, kw: q.kw })),
];

/** Serif, but two to five words — a keyword "inside" one of these would be the
 *  whole string. The 1–3-per-chunk rule needs a chunk. */
const MICRO_LABELS: readonly string[] = [
  ...M.left.rows.map((r) => r.text),
  M.left.returnLabel,
  ...M.right.stations.map((s) => s.sub),
  M.right.spine.sub,
  M.right.risky,
  M.right.approved,
  M.right.pass,
];

/** One chunk on two lines: the claim, then the reason. The keywords are in the
 *  reason, which is why these two carry none of their own. */
const VERDICT_CLAIMS: readonly string[] = [M.left.verdictTitle, M.right.verdictTitle];

test("every highlighted chunk carries 1–3 keywords that are really in it", () => {
  HIGHLIGHTED.forEach(({ text, kw }) => {
    expect(kw.length, text).toBeGreaterThanOrEqual(1);
    expect(kw.length, text).toBeLessThanOrEqual(3);
    kw.forEach((k) => expect(text, k).toContain(k));
  });
});

/** Words, so a standalone em dash does not count as one. */
function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).length;
}

test("a bare prose string is a micro-label or a verdict claim, never a long sentence", () => {
  MICRO_LABELS.forEach((t) => expect(wordCount(t), t).toBeLessThanOrEqual(5));
  // A claim's keywords live in its reason, so the reason must actually have some.
  expect(M.left.verdictKw.length).toBeGreaterThan(0);
  expect(M.right.verdictKw.length).toBeGreaterThan(0);
  VERDICT_CLAIMS.forEach((t) => expect(t, t).toMatch(/\.$/));
});

test("mono strings carry no `*Kw` sibling", () => {
  // Asserted as "no such key exists" rather than "the key is empty": an empty
  // array would still say a keyword belongs there one day.
  const bearers: readonly object[] = [M.left, M.right, M.right.spine, ...M.right.stations];
  bearers.forEach((o) => {
    ["titleKw", "labelKw", "fileKw", "headingKw", "heartbeatKw"].forEach((key) =>
      expect(Object.keys(o)).not.toContain(key),
    );
  });
  M.quotes.forEach((q) => expect(Object.keys(q)).not.toContain("attrKw"));
});

test("the four groups account for EVERY string in the slide's copy", () => {
  // The guard that makes the three tests above a complete statement rather than a
  // sample. A new string lands in no group and fails HERE, by value — which is the
  // only way "kw on every prose string" can be checked over copy that also holds
  // labels, and the only way a bare sentence cannot slip in unnoticed.
  const strings: string[] = [];
  const walk = (node: unknown, key?: string) => {
    // `who` is a marker that picks an icon, not copy; `kw` / `*Kw` hold keywords,
    // which are substrings OF the copy and not copy of their own.
    if (key === "who" || key === "kw" || key?.endsWith("Kw")) return;
    if (typeof node === "string") strings.push(node);
    else if (Array.isArray(node)) node.forEach((n) => walk(n));
    else if (node && typeof node === "object")
      Object.entries(node).forEach(([k, v]) => walk(v, k));
  };
  walk(M);
  walk(e12Content.headline);

  const accounted = new Set<string>([
    ...MONO,
    ...HIGHLIGHTED.map((h) => h.text),
    ...MICRO_LABELS,
    ...VERDICT_CLAIMS,
  ]);
  expect(strings.filter((s) => !accounted.has(s))).toEqual([]);
  // …and nothing is claimed twice, which would let a group hide a real gap.
  expect(accounted.size).toBe(
    MONO.length + HIGHLIGHTED.length + MICRO_LABELS.length + VERDICT_CLAIMS.length,
  );
});
