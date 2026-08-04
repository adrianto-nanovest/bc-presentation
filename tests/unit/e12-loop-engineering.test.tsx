// E.12 — LOOP ENGINEERING · slide tests. All three poses.
//
// WHAT THIS FILE CAN AND CANNOT PROVE. jsdom has no layout, so every claim about
// a rendered position is asserted STRUCTURALLY — as the one number both sides
// read — and measured in the browser instead. Two examples, both of them owner
// corrections:
//   · gh#48 correction 1, "both verdict dividers sit at the same y": both panels
//     render the same `Verdict` at the same fixed offset and height, so the test
//     compares those declarations. Measured at 1280×720: both dividers at y=545.
//   · gh#49 correction 6, "all four panel illustrations start at the same y, level
//     with the HEARTBEAT card's top border": every panel's illustration band and
//     the rail's card band both start at `HEAD_H`, so the test asserts that one
//     number four times. Measured at 1280×720: all four at y=197, and no foot line
//     within 16px of the NavBar.
//
// The hover TIERS are in globals.css (`.e12-box`), which jsdom does not apply
// either. What is checkable here is that every card box is routed through the one
// component that carries the class — which is the actual failure mode corrections
// 4 and 9 name: a box that forgot the affordance.
import { act, fireEvent, render, screen } from "@testing-library/react";
import { useDeck } from "@/deck/DeckContext";
import { SlideHarness } from "../support/slide-harness";
import {
  E12LoopEngineering,
  e12Slide,
} from "@/slides/foundation-core-section-e/e12-loop-engineering";
import { e12Content } from "@/slides/foundation-core-section-e/content";
import {
  MONO_FLOOR,
  PROSE_FLOOR,
} from "@/slides/foundation-core-section-e/components/E12Primitives";

/** One button per pose, so a test can WALK the slide inside one mounted tree —
 *  which is the only way to catch state that outlives a step change. */
function Nav() {
  const { goTo } = useDeck();
  return (
    <>
      {[0, 1, 2].map((s) => (
        <button key={s} data-testid={`goto-${s}`} onClick={() => goTo(0, s)} />
      ))}
    </>
  );
}

/** Jump to a pose in a fresh tree. */
function renderSlide(step = 0) {
  const out = render(
    <SlideHarness def={e12Slide}>
      <Nav />
      <E12LoopEngineering />
    </SlideHarness>,
  );
  if (step > 0) goToPose(step);
  return out;
}

/** Walk to a pose in the tree that is already mounted. */
function goToPose(step: number) {
  act(() => screen.getByTestId(`goto-${step}`).click());
}

/** Every card box pose 0 draws — the eleven gh#48 shipped. */
const POSE_0_BOXES = [
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

/** The four rail cards, plus the boxes each panel adds when it is magnified. */
const RAIL_BOXES = ["e12-card-heartbeat", "e12-card-beat", "e12-card-checker", "e12-card-spine"] as const;
const PANEL_BOXES: Record<string, readonly string[]> = {
  heartbeat: ["e12-kind-1", "e12-kind-2", "e12-kind-3", "e12-kind-4"],
  beat: ["e12-station-1", "e12-station-2", "e12-station-3", "e12-station-4", "e12-beat-exit"],
  checker: ["e12-rung-1", "e12-rung-2", "e12-rung-3"],
  spine: ["e12-run-1", "e12-run-2", "e12-repo", "e12-diary-0", "e12-diary-1"],
};
/** Pose 2's boxes: the pill, the five column stages and the two branches. */
const FLOW_BOXES = [
  "e12-flow-hb",
  "e12-flow-read",
  "e12-flow-find",
  "e12-flow-draft",
  "e12-flow-review",
  "e12-flow-update",
  "e12-flow-fail",
  "e12-flow-pass",
] as const;

const PART_IDS = ["heartbeat", "beat", "checker", "spine"] as const;

/** The heading block's height, and therefore where BOTH columns' content starts
 *  (correction 6). Duplicated as a literal on purpose: if the constant moves, the
 *  browser-measured y=197 in this file's header stops being true and this fails. */
const HEAD_H = "41px";

function hover(part: string) {
  fireEvent.mouseEnter(screen.getByTestId(`e12-card-${part}`));
}
function unhover(part: string) {
  fireEvent.mouseLeave(screen.getByTestId(`e12-card-${part}`));
}
function panelOf() {
  return screen.getByTestId("e12-canvas").getAttribute("data-panel");
}

// ── the slide def ────────────────────────────────────────────────────────────

test("E.12 declares its final shape: 3 steps, canonical pose 2, in `fundamentals`", () => {
  expect(e12Slide.id).toBe("e12-loop-engineering");
  expect(e12Slide.steps).toBe(3);
  expect(e12Slide.canonicalPose).toBe(2);
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

test("the headline renders with `writing loops` as its keyword, on every pose", () => {
  for (const step of [0, 1, 2]) {
    const { unmount } = renderSlide(step);
    const headline = document.querySelector("h1.slide-headline");
    expect(headline?.textContent).toBe("Stop writing prompts. Start writing loops.");
    const keywords = [...(headline?.querySelectorAll("em.text-copper-400") ?? [])].map(
      (k) => k.textContent,
    );
    expect(keywords).toEqual(["writing loops"]);
    unmount();
  }
});

test("carries NO qualifier strip — the FigLabel and the quotes carry the term", () => {
  // §8.3, owner call: the mono line under the headline is deleted. Asserted as
  // the slide's whole structure, because "no strip" is a claim about what is
  // absent and a testid for an absent element would always pass.
  const { container } = renderSlide();
  const top = [...container.children]
    .filter((el) => !el.getAttribute("data-testid")?.startsWith("goto-"))
    .map((el) => el.className || el.getAttribute("data-testid"));
  expect(top).toEqual(["fig-label", "slide-headline-row", "e12-mindset"]);
});

test("one pose is on the stage at a time, and `0 → 1 → 2 → 1 → 0` re-renders both ways", () => {
  // Walked in ONE tree, forward then back — a fresh mount per pose would pass this
  // even if a pose left something of itself behind. Each pose's own root is the
  // assertion: a stale pose still mounted shows up as two roots at once.
  renderSlide();
  for (const step of [0, 1, 2, 1, 0]) {
    goToPose(step);
    if (step === 0) {
      expect(screen.getByTestId("e12-mindset")).toBeInTheDocument();
      expect(screen.queryByTestId("e12-anatomy")).toBeNull();
    } else {
      expect(screen.getByTestId("e12-anatomy")).toBeInTheDocument();
      expect(screen.queryByTestId("e12-mindset")).toBeNull();
      expect(screen.getByTestId("e12-rail")).toBeInTheDocument();
      expect(screen.getByTestId("e12-canvas")).toBeInTheDocument();
    }
  }
});

// ── pose 0: both panels, the bridge, both quotes ─────────────────────────────

test("pose 0 renders both panels and the bridge between them", () => {
  renderSlide();

  const left = screen.getByTestId("e12-panel-prompting");
  expect(left.textContent).toContain("PROMPTING — TURN BY TURN");
  e12Content.mindset.left.rows.forEach((r) => expect(left.textContent).toContain(r.text));
  expect(left.textContent).toContain("round and round");

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
  // CREATOR, not "founder" (§12.1 call 5, closed on gh#50): he wrote OpenClaw and
  // its stewardship has since moved to a foundation, so "founder of" is both the
  // weaker word and the one that ages worse. A named person plus a named company
  // is a factual claim on a slide, so the wording is pinned here.
  expect(left.textContent).toContain("PETER STEINBERGER · CREATOR OF OPENCLAW");
  expect(left.textContent).toContain("designing loops that prompt your agents");

  const right = screen.getByTestId("e12-quote-right");
  expect(right.textContent).toContain("BORIS CHERNY · CREATOR OF CLAUDE CODE");
  // VERBATIM from Addy Osmani's originating essay, with an ellipsis where a
  // sentence is elided — the earlier paraphrase sat inside quotation marks, which
  // reads as verbatim to a room.
  expect(e12Content.mindset.quotes[1].text).toBe(
    "I don't prompt Claude anymore … My job is to write loops.",
  );
  expect(e12Content.mindset.quotes[1].text.length).toBeLessThanOrEqual(80);
});

test("the quote copy keeps the marks that make it quotable (§12.1 call 5)", () => {
  // The two failure modes this guards, both of them one careless edit away: a
  // compressed quote losing the mark that says it is compressed, and an
  // attribution drifting to a title nobody published.
  const [steinberger, cherny] = e12Content.mindset.quotes;
  expect(steinberger.attr).not.toMatch(/FOUNDER/i);
  expect(cherny.text).toContain("…");
  // Both lines are set in quotation marks on the slide, so both must be quotable
  // as they stand — no bracketed edits, no paraphrase dressed as a quote.
  e12Content.mindset.quotes.forEach((q) => expect(q.text, q.attr).not.toMatch(/[[\]]/));
});

test("each quote block's left edge is its own panel's left edge", () => {
  renderSlide();
  // Correction 3, as the two numbers that have to agree: the left column starts
  // at the diptych's own left edge, the right column at the right panel's.
  expect(screen.getByTestId("e12-quote-left").style.left).toBe("0px");
  expect(screen.getByTestId("e12-quote-right").style.left).toBe("600px");
  expect(screen.getByTestId("e12-quote-right").style.width).toBe("584px");
});

// ── pose 1 — the rail, and the canvas it magnifies onto ─────────────────────

test("pose 1 opens RAIL-ONLY: four cards, and a canvas with nothing in it", () => {
  // gh#49 correction 4. §8.3's idle `ONE BEAT` resting pose is dropped, so the
  // room meets the four parts before any one of them is magnified.
  renderSlide(1);

  RAIL_BOXES.forEach((id) => expect(screen.getByTestId(id)).toBeInTheDocument());
  e12Content.parts.forEach((p) => {
    const card = screen.getByTestId(`e12-card-${p.id}`);
    expect(card.textContent).toContain(p.title);
    expect(card.textContent).toContain(p.desc);
    expect(card.getAttribute("data-active")).toBe("false");
  });

  expect(panelOf()).toBe("none");
  expect(screen.getByTestId("e12-canvas").children).toHaveLength(0);
  PART_IDS.forEach((id) => expect(screen.queryByTestId(`e12-panel-${id}`)).toBeNull());
});

test("each card swaps in its own panel on hover, and un-hover RELEASES", () => {
  renderSlide(1);

  for (const id of PART_IDS) {
    hover(id);
    expect(panelOf()).toBe(id);
    expect(screen.getByTestId(`e12-panel-${id}`)).toBeInTheDocument();
    expect(screen.getByTestId(`e12-card-${id}`).getAttribute("data-active")).toBe("true");
    // …and only that card is active.
    RAIL_BOXES.filter((b) => b !== `e12-card-${id}`).forEach((other) =>
      expect(screen.getByTestId(other).getAttribute("data-active")).toBe("false"),
    );

    unhover(id);
    expect(panelOf()).toBe("none");
    expect(screen.queryByTestId(`e12-panel-${id}`)).toBeNull();
  }
});

test("click PINS: the panel holds after the pointer leaves, and clicking again releases", () => {
  renderSlide(1);
  const card = screen.getByTestId("e12-card-checker");

  hover("checker");
  fireEvent.click(card);
  unhover("checker");

  expect(panelOf()).toBe("checker");
  expect(screen.getByTestId("e12-panel-checker")).toBeInTheDocument();
  // The pin glyph replaces the row number, so the row reports its own state.
  expect(card.querySelector('[aria-label="pinned"]')).not.toBeNull();

  fireEvent.click(card);
  expect(panelOf()).toBe("none");
  expect(card.querySelector('[aria-label="pinned"]')).toBeNull();
});

test("a pin LOCKS the canvas: another card still lights, but the panel does not move", () => {
  // Owner call, 2026-08-04, and a REVERSAL of the behaviour gh#49 shipped: a pin
  // used to survive un-hover only, so a pointer crossing the rail while the
  // presenter talked replaced the pinned panel mid-sentence. The pin now holds the
  // right column outright.
  renderSlide(1);
  fireEvent.click(screen.getByTestId("e12-card-spine"));

  hover("beat");
  expect(panelOf()).toBe("spine");
  expect(screen.getByTestId("e12-panel-spine")).toBeInTheDocument();
  expect(screen.queryByTestId("e12-panel-beat")).toBeNull();
  // …and the rail still answers the pointer, which is the other half of the call:
  // BOTH cards read active — the hovered one and the one the canvas is showing.
  expect(screen.getByTestId("e12-card-beat").getAttribute("data-active")).toBe("true");
  expect(screen.getByTestId("e12-card-spine").getAttribute("data-active")).toBe("true");

  unhover("beat");
  expect(panelOf()).toBe("spine");
  expect(screen.getByTestId("e12-card-beat").getAttribute("data-active")).toBe("false");
});

test("a pin locks pose 2's lighting too — the same rail, the same grammar", () => {
  renderSlide(2);
  fireEvent.click(screen.getByTestId("e12-card-checker"));
  expect(screen.getByTestId("e12-flow-review").getAttribute("data-lit")).toBe("on");

  hover("spine");
  // The flow keeps the CHECKER's stages lit; only the rail card follows the pointer.
  expect(screen.getByTestId("e12-flow-review").getAttribute("data-lit")).toBe("on");
  expect(screen.getByTestId("e12-flow-read").getAttribute("data-lit")).toBe("dim");
  expect(screen.getByTestId("e12-card-spine").getAttribute("data-active")).toBe("true");
});

test("a pin does not cross a pose boundary — each pose arrives at rest", () => {
  // The rail is mounted for BOTH poses, so a pin outlives a step change unless
  // something clears it, and "pose 1 opens rail-only" has to hold on the way BACK
  // as well as the way in. Walked in one tree, because that is the only place this
  // can go wrong.
  renderSlide(1);
  fireEvent.click(screen.getByTestId("e12-card-spine"));
  expect(panelOf()).toBe("spine");

  // 1 → 2: the flow arrives with no stage lit…
  goToPose(2);
  FLOW_BOXES.forEach((id) => expect(screen.getByTestId(id).getAttribute("data-lit")).toBe("idle"));

  // …and pinning there does not follow the presenter back to pose 1 either.
  fireEvent.click(screen.getByTestId("e12-card-checker"));
  expect(screen.getByTestId("e12-flow-review").getAttribute("data-lit")).toBe("on");
  goToPose(1);
  expect(panelOf()).toBe("none");
  expect(screen.getByTestId("e12-canvas").children).toHaveLength(0);
});

test("NOTHING is drawn between the rail and the canvas, on either pose", () => {
  // gh#49 correction 3, read literally: the stepped leader line AND its arrow tip
  // are gone, which supersedes the §8.3 clause that named the connector. Asserted
  // as the pose's whole structure — an absent element cannot have a testid — plus
  // the two columns' own boxes, so nothing can reach across the 30px gutter.
  for (const step of [1, 2]) {
    const { unmount } = renderSlide(step);
    const anatomy = screen.getByTestId("e12-anatomy");
    expect([...anatomy.children].map((el) => el.getAttribute("data-testid"))).toEqual([
      "e12-rail",
      "e12-canvas",
    ]);
    expect(screen.getByTestId("e12-rail").style.width).toBe("356px");
    expect(screen.getByTestId("e12-canvas").style.left).toBe("434px");
    unmount();
  }
});

test("both columns' rules end at their own text, and the hint sits outside the rule", () => {
  // gh#49 correction 1, G.7's pattern: a `fit-content` wrapper with the rule at
  // 100%. The HintIcon is a SIBLING of that wrapper — inside it, it would
  // lengthen the rule by its own width.
  renderSlide(1);
  const railHeading = screen.getByTestId("e12-rail-heading");
  expect(railHeading.style.width).toBe("fit-content");
  expect(railHeading.querySelector(".copper-rule")?.getAttribute("style")).toContain("width: 100%");
  expect(railHeading.querySelector('[data-testid="hint-icon"]')).toBeNull();
  expect(screen.getByTestId("hint-icon")).toBeInTheDocument();

  hover("heartbeat");
  const panelTitle = screen
    .getByTestId("e12-panel-heartbeat")
    .querySelector('div[style*="fit-content"]');
  expect(panelTitle).not.toBeNull();
  expect(panelTitle?.textContent).toBe(e12Content.panels.heartbeat.title);
  expect(panelTitle?.querySelector(".copper-rule")?.getAttribute("style")).toContain("width: 100%");
});

test("no panel renders a subtitle or a foot, and all four illustrations start at the same y", () => {
  // gh#49 corrections 2 and 6, plus the 2026-08-04 foot deletion. A panel is now
  // exactly TWO bands — heading, illustration — so a third child is either the
  // deleted kicker or the deleted foot line coming back.
  renderSlide(1);
  for (const id of PART_IDS) {
    hover(id);
    const panel = screen.getByTestId(`e12-panel-${id}`);
    expect([...panel.children], id).toHaveLength(2);
    const illus = screen.getByTestId(`e12-panel-${id}-illustration`);
    expect(illus.style.top, id).toBe(HEAD_H);
    expect(illus.style.height, id).toBe("409px");
    unhover(id);
  }
});

test("the rail's cards start level with the panels' illustrations", () => {
  // The other half of correction 6: one number, both columns. The cards' band and
  // every illustration band both begin at `HEAD_H` inside a column that starts at
  // y=156, which is the y=197 measured in the browser.
  renderSlide(1);
  const cardBand = screen.getByTestId("e12-card-heartbeat").parentElement?.parentElement;
  expect(cardBand?.style.top).toBe(HEAD_H);
  expect(screen.getByTestId("e12-rail").style.top).toBe("156px");
  // …and the canvas ends 72px off the stage floor, which is what keeps every foot
  // line clear of the NavBar (measured at 1280×720).
  expect(screen.getByTestId("e12-canvas").style.height).toBe("492px");
});

// ── pose 1 — what each panel has to say ─────────────────────────────────────

test("HEARTBEAT renders all four kinds, each with a stop condition and an analogy", () => {
  renderSlide(1);
  hover("heartbeat");
  const panel = screen.getByTestId("e12-panel-heartbeat");

  e12Content.panels.heartbeat.kinds.forEach((k) => {
    const card = screen.getByTestId(`e12-kind-${k.num}`);
    expect(card.textContent).toContain(k.name);
    expect(card.textContent).toContain(k.stop);
    expect(card.textContent).toContain(k.analogy);
    k.tools.forEach((t) => expect(card.textContent).toContain(t));
  });
  // EVERY kind names when it STOPS, in one construction — §8.3 asks for "each
  // with its own stop condition", and "runs while you sleep" (the prototype's
  // third) describes autonomy, not a stop.
  const stops = e12Content.panels.heartbeat.kinds.map((k) => k.stop);
  stops.forEach((s) => expect(s, s).toMatch(/^stops when /));
  expect(new Set(stops).size).toBe(4);

  // The four kinds run left to right along one axis, and the label that names it
  // is the one correction 7 raised out of the grey.
  expect(panel.textContent).toContain("YOU HOLD IT");
  expect(panel.textContent).toContain("more and more unattended");
  expect(panel.textContent).toContain("IT RUNS WITHOUT YOU");
});

test("kind 2, and only kind 2, calls back to the Ralph card (§12.1 call 2)", () => {
  // gh#49 reserved the row and left the copy to the closing ticket; gh#50 writes
  // it. `/goal` is taught on this card AND on E.11's Ralph card, so kind 2 says so
  // out loud — that is the whole of call 2. The row stays reserved and EMPTY on the
  // other three, because the four cards are read side by side and their tool strips
  // and analogies have to stay in register.
  renderSlide(1);
  hover("heartbeat");
  const kinds = e12Content.panels.heartbeat.kinds;
  kinds.forEach((k) => {
    const room = screen.getByTestId(`e12-kind-${k.num}-callback-room`);
    // One line of the card's smallest prose is 10.5px × 1.35 ≈ 15px.
    expect(Number.parseFloat(room.style.height), k.num).toBeGreaterThanOrEqual(15);
    const expected = "callback" in k ? `↩ ${k.callback}` : "";
    expect(room.textContent, k.num).toBe(expected);
  });
  expect(kinds.filter((k) => "callback" in k)).toHaveLength(1);
  expect(kinds[1]).toHaveProperty("callback");

  // It names the CARD, and no letter or number: §3 derives E.11's letter per deck
  // set, so a letter in copy is a line that goes silently wrong on one of five
  // decks. This is the assertion that keeps the fix deck-set-safe.
  const line = kinds[1].callback;
  expect(kinds[1].callbackKw).toEqual(["Ralph Wiggum"]);
  expect(line).toMatch(/Ralph Wiggum/);
  expect(line).not.toMatch(/E\.?1?1|\bslide\b/i);
  expect(screen.getByTestId("e12-panel-heartbeat").textContent).toMatch(/Ralph Wiggum/);
});

test("CHECKER renders three rungs with the human gate widening as the proof thins", () => {
  renderSlide(1);
  hover("checker");

  const widths = e12Content.panels.checker.rungs.map((r) => {
    const rung = screen.getByTestId(`e12-rung-${r.num}`);
    expect(rung.textContent).toContain(r.name);
    expect(rung.textContent).toContain(r.badge);
    return Number(screen.getByTestId(`e12-gate-${r.num}`).getAttribute("data-gate-width"));
  });
  // Strictly widening, left to right: proof → partial proof → a claim.
  expect(widths).toEqual([...widths].sort((a, b) => a - b));
  expect(new Set(widths).size).toBe(3);
  expect(widths[2]).toBe(1);
  // This panel IS the verification card §8.2 found missing, and it still is with
  // the foot line gone: the argument moved from a sentence to the BADGES, which
  // run proof → partial proof → a claim, and to the widening gate bars above.
  const badges = e12Content.panels.checker.rungs.map((r) => r.badge);
  expect(badges[2]).toBe("a claim, not a proof");
  badges.forEach((b, i) => expect(screen.getByTestId(`e12-rung-${i + 1}`).textContent).toContain(b));
});

test("ONE BEAT and SPINE render the runtime and the memory between runs", () => {
  renderSlide(1);

  hover("beat");
  const beat = screen.getByTestId("e12-panel-beat");
  e12Content.panels.beat.stations.forEach((s) => expect(beat.textContent).toContain(s.name));
  expect(beat.textContent).toContain("the beat ends");
  expect(screen.getByTestId("e12-comet")).toBeInTheDocument();
  unhover("beat");

  hover("spine");
  const spine = screen.getByTestId("e12-panel-spine");
  expect(spine.textContent).toContain("RUN 1 — MONDAY, 9:00");
  expect(spine.textContent).toContain("RUN 2 — TUESDAY, 9:00");
  expect(spine.textContent).toContain("memory is wiped");
  expect(spine.textContent).toContain("CLAUDE.md / AGENTS.md");
  expect(spine.textContent).toContain("progress.md");
});

test("NO OpenCode string appears anywhere — in the copy or on any pose", () => {
  // Owner call (§8.3): Codex and ChatGPT stand in. Checked over the copy AND over
  // the rendered DOM of all three poses, because a tool name could also be
  // written at a call site.
  expect(JSON.stringify(e12Content)).not.toMatch(/opencode/i);
  for (const step of [0, 1, 2]) {
    const { container, unmount } = renderSlide(step);
    if (step === 1) PART_IDS.forEach((id) => hover(id));
    expect(container.textContent).not.toMatch(/opencode/i);
    unmount();
  }
});

// ── pose 2 — the worked example ─────────────────────────────────────────────

test("pose 2 renders the triage flow, the fork and both day-tokens", () => {
  renderSlide(2);

  expect(panelOf()).toBe("triage");
  const panel = screen.getByTestId("e12-panel-triage");
  expect(panel.textContent).toContain("THE MORNING-TRIAGE LOOP — ONE BEAT");
  FLOW_BOXES.forEach((id) => expect(screen.getByTestId(id)).toBeInTheDocument());

  expect(screen.getByTestId("e12-flow-verdict").textContent).toBe("THE VERDICT?");
  expect(panel.textContent).toContain("FAIL, OR RISKY");
  expect(panel.textContent).toContain("PASS, AND LOW RISK");
  expect(panel.textContent).toContain("needs a human");
  expect(panel.textContent).toContain("Open a pull request");
  expect(panel.textContent).toContain("again tomorrow at 9:00");

  // Two days, on alternating laps: one opens a PR, the next flags a person.
  expect(screen.getByTestId("e12-day-pass")).toBeInTheDocument();
  expect(screen.getByTestId("e12-day-fail")).toBeInTheDocument();
  expect(document.querySelectorAll("animateMotion")).toHaveLength(2);
});

test("the branch join carries ONE arrowhead, on the drop into `Update progress.md`", () => {
  // Owner call, 2026-08-04. The two horizontal runs out of FAIL and PASS used to
  // carry a tip each and stop 4px short of the centreline, so the junction drew
  // three heads meeting in a star. They now run flush into the centreline with no
  // marker, and the short vertical drop below them owns the only tip.
  renderSlide(2);
  const joins = [...document.querySelectorAll('[data-testid="e12-arrow-update"]')];
  expect(joins).toHaveLength(3);

  const headed = joins.filter((p) => p.getAttribute("marker-end"));
  expect(headed).toHaveLength(1);
  // …and the one that keeps it is the drop INTO the box, not either branch run.
  expect(headed[0].getAttribute("d")).toBe("M300,320 V327");
  joins
    .filter((p) => !p.getAttribute("marker-end"))
    .forEach((p) => expect(p.getAttribute("d")).toMatch(/H300$/));
});

test("hovering a rail part lights EXACTLY the stages it owns, and demotes the rest", () => {
  renderSlide(2);

  // At rest nothing is ranked: no part has been named yet, so every stage reads
  // the same. `idle` is not a tier.
  FLOW_BOXES.forEach((id) => expect(screen.getByTestId(id).getAttribute("data-lit")).toBe("idle"));

  const ALL_STAGES = ["hb", "read", "find", "draft", "review", "verdict", "fail", "pass", "update", "ret"];
  for (const part of PART_IDS) {
    hover(part);
    const owned = e12Content.lights[part] as readonly string[];
    ALL_STAGES.forEach((stage) => {
      const el = screen.getByTestId(`e12-flow-${stage}`);
      expect(el.getAttribute("data-lit"), `${part} → ${stage}`).toBe(
        owned.includes(stage) ? "on" : "dim",
      );
    });
    unhover(part);
  }

  // THE ARROWS TAKE THE RANK OF THE STAGE THEY POINT INTO. Without this, a lit run
  // of stages is joined by bright arrows to dimmed ones and stops reading as a
  // path. Checked on `checker`, which owns a run of four.
  hover("checker");
  const arrowLit = (to: string) =>
    screen.getByTestId(`e12-arrow-${to}`).getAttribute("data-lit");
  expect(arrowLit("verdict")).toBe("on");
  expect(arrowLit("fail")).toBe("on");
  expect(arrowLit("pass")).toBe("on");
  expect(arrowLit("read")).toBe("dim");
  expect(arrowLit("ret")).toBe("dim");
  unhover("checker");
  ["read", "verdict", "ret"].forEach((to) => expect(arrowLit(to)).toBe("idle"));

  // The table itself: every part owns at least one stage, every stage is owned by
  // exactly one part, and the four sets together are the whole flow.
  const claimed = PART_IDS.flatMap((p) => e12Content.lights[p] as readonly string[]);
  expect(new Set(claimed).size).toBe(claimed.length);
  expect([...claimed].sort()).toEqual([...ALL_STAGES].sort());
});

test("NEITHER pose draws a return label, and pose 2's thesis is one quiet line", () => {
  // gh#49 correction 8 dropped the label from pose 2; the owner dropped it from
  // pose 1 as well on 2026-08-04, so the arc back up to HEARTBEAT is the whole
  // statement. The recap stays in E.11's footer style — serif italic 13.5px on
  // neutral-400 — not the prototype's display-weight three-liner.
  const one = renderSlide(1);
  expect(screen.queryByTestId("e12-rail-return")).toBeNull();
  expect(screen.queryByTestId("e12-thesis")).toBeNull();
  one.unmount();

  renderSlide(2);
  expect(screen.queryByTestId("e12-rail-return")).toBeNull();
  const thesis = screen.getByTestId("e12-thesis");
  const line = thesis.querySelector("p")!;
  expect(line.style.fontSize).toBe("13.5px");
  expect(line.style.fontStyle).toBe("italic");
  expect(line.style.color).toBe("var(--neutral-400)");
  expect(line.style.fontFamily).toBe("var(--serif)");
  expect(line.textContent).toBe(e12Content.thesis);
  // ONE LINE, and asserted as the two declarations that make it one: the recap
  // spans the rail's left edge to the canvas's right edge (1232 − 48), not the
  // rail's own 356px, and it does not wrap. jsdom has no layout, so the wrap
  // itself is a browser fact — measured at 1280×720, the line runs ~571px.
  expect(thesis.style.width).toBe("1184px");
  expect(line.style.whiteSpace).toBe("nowrap");
  // …with its keywords really highlighted, 1–3 of them.
  const keywords = [...line.querySelectorAll("em.text-copper-400")].map((k) => k.textContent);
  expect(keywords).toEqual([...e12Content.thesisKw]);
  expect(keywords.length).toBeGreaterThanOrEqual(1);
  expect(keywords.length).toBeLessThanOrEqual(3);
});

// ── owner corrections 4 and 9 — every box hover-reacts, on every pose ───────

function expectBoxes(ids: readonly string[]) {
  ids.forEach((id) => {
    const box = screen.getByTestId(id);
    expect(box.className, id).toContain("e12-box");
    // Rank is a colour tier (§8.3): no box rests semi-transparent, on any pose.
    expect(box.style.opacity, id).toBe("");
  });
  // Boxes are only ever built by the one component, so the count is also the
  // guard against one more box drawn by hand without the affordance.
  expect(document.querySelectorAll(".e12-box")).toHaveLength(ids.length);
}

test("every card box on pose 0 carries the hover class, and nothing fades", () => {
  renderSlide();
  expectBoxes(POSE_0_BOXES);
});

test("every card box on poses 1 and 2 carries it too — rail cards and panels alike", () => {
  const one = renderSlide(1);
  expectBoxes(RAIL_BOXES);
  for (const id of PART_IDS) {
    hover(id);
    expectBoxes([...RAIL_BOXES, ...PANEL_BOXES[id]]);
    unhover(id);
  }
  one.unmount();

  renderSlide(2);
  expectBoxes([...RAIL_BOXES, ...FLOW_BOXES]);
});

// ── §12.1 call 1 — the guardrail, and the pose that prints ──────────────────

test("the guardrail is on BOTH working poses, because pose 2 is the one that prints", () => {
  // The `BUDGET` row of the old brief had no successor in the shipping form, and
  // §12.1 forbids letting it vanish by omission. It sits under the rail — and it
  // has to be on pose 2, because `canonicalPose` is 2 and `scripts/export-pdf.mjs`
  // and `export-pptx.mjs` print exactly the canonical pose. A pose-1-only
  // guardrail is missing from every PDF the room takes home, which is the same
  // omission by a quieter route.
  const { label, text } = e12Content.guardrail;

  const pose0 = renderSlide(0);
  expect(screen.queryByTestId("e12-guardrail")).toBeNull();
  pose0.unmount();

  for (const pose of [1, 2] as const) {
    const view = renderSlide(pose);
    const rail = screen.getByTestId("e12-guardrail");
    expect(rail.textContent, `pose ${pose}`).toContain(label);
    expect(rail.textContent, `pose ${pose}`).toContain("Cap what runs unattended");
    view.unmount();
  }

  // A cap is not a slogan: the line names what to cap, and all three are the caps
  // a runaway loop actually needs.
  ["items per beat", "spend", "an end date"].forEach((cap) => expect(text).toContain(cap));
  // And it stays out of vendor-terms territory (§12.2) — no product's current
  // policy is asserted, so nothing here expires.
  expect(text).not.toMatch(/7 day|claude|routine/i);
});

test("the guardrail sits at ONE offset on both poses, and clears the recap", () => {
  // jsdom has no layout, so the claim is asserted as the offsets that make it
  // true. With pose 1's return label deleted (2026-08-04), nothing sits between
  // the cards and this block on either pose — so the two offsets are now the SAME
  // number, and the block no longer jumps when the presenter steps between poses.
  // Measured at 1280×720: the cards end at stage y=505 and the guardrail at y=517.
  const one = renderSlide(1);
  const pose1 = Number.parseFloat(screen.getByTestId("e12-guardrail").style.top);
  one.unmount();

  renderSlide(2);
  const pose2 = Number.parseFloat(screen.getByTestId("e12-guardrail").style.top);
  expect(pose2).toBe(pose1);
  // The recap is bottom-anchored and now ONE line, so "above the recap" is the
  // offset staying inside the rail's own height less that line and the heading.
  expect(screen.getByTestId("e12-thesis").style.bottom).toBe("0px");
  expect(pose2).toBeLessThan(492 - 18 - 41);
});

// ── §12.1 call 3 — the type floors, enforced over the rendered tree ──────────

test("no run of type on any pose sits below the projector floor", () => {
  // The browser half of this is `node scripts/projection-test.mjs e12 --audit`,
  // which also measures overflow; what is checkable HERE — and therefore in CI on
  // every commit — is the floor itself. Every piece of type on this slide is
  // inline-styled, so jsdom can read the sizes back even with no layout engine.
  //
  // §12.1 call 3 flagged the 8.5px tool strips. The audit found 34 runs under the
  // two floors across the three poses, including the pose-2 heartbeat pill and
  // both fork labels, which PRINT. Anything new that lands below a floor fails
  // here before it reaches a projector.
  const below: string[] = [];
  const collect = () => {
    for (const el of Array.from(document.querySelectorAll<HTMLElement>("[style]"))) {
      const size = Number.parseFloat(el.style.fontSize);
      if (!Number.isFinite(size)) continue;
      const family = el.style.fontFamily || "";
      const floor = family.includes("mono") ? MONO_FLOOR : family.includes("serif") ? PROSE_FLOOR : 0;
      if (floor && size < floor) {
        below.push(`${size}px < ${floor} · ${(el.textContent ?? "").trim().slice(0, 40)}`);
      }
    }
  };

  const pose0 = renderSlide(0);
  collect();
  pose0.unmount();

  const pose1 = renderSlide(1);
  for (const id of ["heartbeat", "beat", "checker", "spine"]) {
    hover(id);
    collect();
    unhover(id);
  }
  pose1.unmount();

  renderSlide(2);
  collect();

  expect(below).toEqual([]);
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

  test("pose 0 mounts zero SMIL nodes and still renders complete", () => {
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
    expectBoxes(POSE_0_BOXES);
  });

  test("pose 1 mounts zero SMIL nodes at every panel, and every panel still renders", () => {
    renderSlide(1);
    for (const id of PART_IDS) {
      hover(id);
      expect(screen.getByTestId(`e12-panel-${id}`), id).toBeInTheDocument();
      expect(document.querySelectorAll("animateMotion"), id).toHaveLength(0);
      expectBoxes([...RAIL_BOXES, ...PANEL_BOXES[id]]);
      unhover(id);
    }
    // The ONE BEAT comet is the gated node, and it still mounts — at rest at the
    // top of the orbit, so the figure is not missing its runtime.
    hover("beat");
    const comet = screen.getByTestId("e12-comet");
    expect(comet.getAttribute("cx")).toBe("300");
    expect(comet.getAttribute("cy")).toBe("110");
  });

  test("pose 2 mounts zero SMIL nodes, and both day-tokens still render at rest", () => {
    renderSlide(2);
    expect(document.querySelectorAll("animateMotion")).toHaveLength(0);
    for (const id of ["e12-day-pass", "e12-day-fail"]) {
      const token = screen.getByTestId(id);
      expect(token.getAttribute("cx"), id).toBe("300");
      expect(token.getAttribute("cy"), id).toBe("26");
    }
    expect(screen.getByTestId("e12-panel-triage")).toBeInTheDocument();
    expect(screen.getByTestId("e12-thesis")).toBeInTheDocument();
    expectBoxes([...RAIL_BOXES, ...FLOW_BOXES]);
  });
});

// ── the copy rule §8.3 states, checked over the copy itself ─────────────────

const M = e12Content.mindset;
const P = e12Content.panels;
const T = e12Content.triage;

/** Labels, never sentences — §8.3 forbids keywords on any of these. */
const MONO: readonly string[] = [
  // pose 0
  M.left.title,
  ...M.bridge,
  M.right.title,
  M.right.heartbeat,
  ...M.right.stations.map((s) => s.label),
  M.right.spine.label,
  M.right.spine.file,
  M.right.gate.label,
  ...M.quotes.map((q) => q.attr),
  // the rail
  e12Content.railHeading,
  e12Content.guardrail.label,
  ...e12Content.parts.map((p) => p.title),
  ...e12Content.parts.map((p) => p.num),
  // the panels
  P.heartbeat.title,
  ...P.heartbeat.kinds.map((k) => k.num),
  ...P.heartbeat.kinds.map((k) => k.name),
  ...P.heartbeat.kinds.flatMap((k) => k.tools),
  P.heartbeat.axis.left,
  P.heartbeat.axis.right,
  P.beat.title,
  ...P.beat.stations.map((s) => s.num),
  ...P.beat.stations.map((s) => s.name),
  P.checker.title,
  P.checker.axisL,
  P.checker.axisR,
  ...P.checker.rungs.map((r) => r.num),
  ...P.checker.rungs.map((r) => r.name),
  ...P.checker.rungs.map((r) => r.badge),
  P.checker.gateLabel,
  P.spine.title,
  ...P.spine.runs.map((r) => r.name),
  ...P.spine.files.map((f) => f.name),
  P.spine.repoTitle,
  P.spine.read,
  P.spine.write,
  // pose 2
  T.title,
  T.hb,
  T.nodes.verdict,
  T.nodes.failLabel,
  T.nodes.passLabel,
  T.nodes.find.sources,
  T.nodes.read.num,
  T.nodes.find.num,
  T.nodes.draft.num,
  T.nodes.review.num,
  T.nodes.fail.num,
  T.nodes.pass.num,
  T.nodes.update.num,
];

/** The prose chunks long enough to hold a keyword inside them. */
const HIGHLIGHTED: readonly { text: string; kw: readonly string[] }[] = [
  { text: e12Content.headline, kw: e12Content.headlineKw },
  { text: M.left.verdict, kw: M.left.verdictKw },
  { text: M.right.verdict, kw: M.right.verdictKw },
  { text: M.right.gate.sub, kw: M.right.gate.subKw },
  ...M.quotes.map((q) => ({ text: q.text, kw: q.kw })),
  { text: e12Content.guardrail.text, kw: e12Content.guardrail.textKw },
  // Kind 2's callback to the Ralph card — the only one (§12.1 call 2), and prose,
  // so §8.3 wants a keyword on it.
  { text: P.heartbeat.kinds[1].callback, kw: P.heartbeat.kinds[1].callbackKw },
  { text: e12Content.thesis, kw: e12Content.thesisKw },
  ...e12Content.parts.map((p) => ({ text: p.desc, kw: p.descKw })),
  ...P.heartbeat.kinds.map((k) => ({ text: k.desc, kw: k.descKw })),
  ...P.heartbeat.kinds.map((k) => ({ text: k.analogy, kw: k.analogyKw })),
  { text: P.beat.center, kw: P.beat.centerKw },
  { text: P.beat.exitTitle, kw: P.beat.exitTitleKw },
  { text: P.beat.exitSub, kw: P.beat.exitSubKw },
  ...P.checker.rungs.map((r) => ({ text: r.desc, kw: r.descKw })),
  { text: P.spine.wipe, kw: P.spine.wipeKw },
  { text: P.spine.lesson, kw: P.spine.lessonKw },
  ...P.spine.files.map((f) => ({ text: f.desc, kw: f.descKw })),
  { text: T.nodes.read.text, kw: T.nodes.read.kw },
  { text: T.nodes.find.text, kw: T.nodes.find.kw },
  { text: T.nodes.draft.text, kw: T.nodes.draft.kw },
  { text: T.nodes.review.text, kw: T.nodes.review.kw },
  { text: T.nodes.update.text, kw: T.nodes.update.kw },
  { text: T.nodes.fail.text, kw: T.nodes.fail.kw },
  { text: T.nodes.fail.sub, kw: T.nodes.fail.subKw },
  { text: T.nodes.pass.text, kw: T.nodes.pass.kw },
  { text: T.nodes.pass.sub, kw: T.nodes.pass.subKw },
  { text: T.ret, kw: T.retKw },
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
  ...P.heartbeat.kinds.map((k) => k.alt),
  ...P.heartbeat.kinds.map((k) => k.stop),
  P.heartbeat.axis.mid,
  ...P.beat.stations.map((s) => s.sub),
  ...P.checker.rungs.map((r) => r.gate),
  ...P.checker.rungs.map((r) => r.gateDesc),
  ...P.spine.runs.flatMap((r) => r.steps),
  ...P.spine.files.map((f) => f.role),
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

/** Words, so a standalone em dash or `+` does not count as one. */
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
  const bearers: readonly object[] = [
    M.left,
    M.right,
    M.right.spine,
    ...M.right.stations,
    ...e12Content.parts,
    e12Content.guardrail,
    P.heartbeat,
    ...P.heartbeat.kinds,
    P.heartbeat.axis,
    P.beat,
    ...P.beat.stations,
    P.checker,
    ...P.checker.rungs,
    P.spine,
    ...P.spine.runs,
    ...P.spine.files,
    T,
    T.nodes,
    T.nodes.find,
  ];
  bearers.forEach((o) => {
    [
      "titleKw",
      "labelKw",
      "fileKw",
      "headingKw",
      "heartbeatKw",
      "nameKw",
      "numKw",
      "badgeKw",
      "toolsKw",
      "axisKw",
      "axisLKw",
      "axisRKw",
      "gateLabelKw",
      "repoTitleKw",
      "readKw",
      "writeKw",
      "hbKw",
      "verdictKw2",
      "sourcesKw",
      "failLabelKw",
      "passLabelKw",
    ].forEach((key) => expect(Object.keys(o), key).not.toContain(key));
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
    // `who` and `id` are markers that pick an icon or a panel, not copy; `kw` /
    // `*Kw` hold keywords, which are substrings OF the copy and not copy of their
    // own; `lights` is a table of machine ids on both sides.
    if (key === "who" || key === "id" || key === "lights" || key === "kw" || key?.endsWith("Kw"))
      return;
    if (typeof node === "string") strings.push(node);
    else if (Array.isArray(node)) node.forEach((n) => walk(n));
    else if (node && typeof node === "object")
      Object.entries(node).forEach(([k, v]) => walk(v, k));
  };
  walk(e12Content);

  const groups = { MONO, HIGHLIGHTED: HIGHLIGHTED.map((h) => h.text), MICRO_LABELS, VERDICT_CLAIMS };
  const accounted = new Set<string>(Object.values(groups).flat());

  // An EMPTY string is a row held open, not copy — three of the four heartbeat
  // kinds have no alternate name and the fourth's line keeps the cards in
  // register. Nothing else here may be empty.
  expect(strings.filter((s) => s === "")).toHaveLength(3);
  expect(strings.filter((s) => s !== "" && !accounted.has(s))).toEqual([]);

  // …and no string is claimed by TWO groups, which would let one group hide a real
  // gap. Duplicates WITHIN a group are legitimate: both spine runs read and write
  // the spine with the same words.
  const names = Object.keys(groups) as (keyof typeof groups)[];
  for (const a of names) {
    for (const b of names) {
      if (a >= b) continue;
      const overlap = [...new Set(groups[a])].filter((s) => s !== "" && groups[b].includes(s));
      expect(overlap, `${a} ∩ ${b}`).toEqual([]);
    }
  }
});
