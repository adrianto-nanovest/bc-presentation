// THE CAPABILITY LADDER · slide tests. All three poses, both brands.
//
// WHAT THIS FILE CAN AND CANNOT PROVE. jsdom has no layout, so nothing here
// measures a pixel that a browser would place — every geometric claim is asserted
// as the ONE NUMBER both sides read (`../../src/slides/leader-gap/geometry.ts`),
// and the composition itself was walked at 1280×720. What jsdom is good for is the
// thing this slide is actually at risk of: §7.2's four form encodings are four
// independent attributes on four elements, and three of them agreeing while the
// fourth quietly does not is a slide that has silently lost its legend-free
// distinction. That is checkable here, and only here.
//
// BOTH BRANDS IN ONE EPOCH. The component reads no `VARIANT` — the slide file
// resolves the brand once at module scope and hands the block down as a prop
// (§4.4 slot 2) — so both ladders mount side by side in this one module registry.
// A test that had to re-point `window.location` per brand could not compare them.
import { act, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test } from "vitest";
import { useDeck } from "@/deck/DeckContext";
import { SlideHarness } from "../support/slide-harness";
import {
  GapCapabilityLadder,
  gapCapabilityLadderSlide,
} from "@/slides/leader-gap/gap-capability-ladder";
import {
  POINT_MAX,
  capabilityLadderFor,
  gapLadderContent,
  type LadderBrandBlock,
} from "@/slides/leader-gap/content";
import {
  ASIDE_LEADER,
  ASIDE_SLOT,
  CHIP_SHELF,
  CLOSER_SLOT,
  CORNERS,
  EARNED_THROUGH_RUNG,
  GAP_TAG_SLOT,
  LEADER_GAP,
  RUNG_COUNT,
  RUNG_LABEL_FLOOR,
  STAIR_PATH_EARNED,
  STAIR_PATH_UNEARNED,
  TECH_SLOT,
  TREADS,
  alongStair,
  anchorPoint,
  stairPathBetween,
} from "@/slides/leader-gap/geometry";
import { BRANDS, type Brand } from "@/deck-variants";

const C = gapLadderContent;
const POSES = [0, 1, 2] as const;

/**
 * The position the ladder holds in the deck it actually composes into.
 *
 * `at` IS required here, and it is the one case `SlideHarness` documents: unit
 * tests resolve the default `general` deck, `general` has no leader variant, and
 * this slide reaches the two leader deck sets ALONE. So there is no derived
 * position to look up — which is itself the fact `deck-numbering-fixture` and
 * `deck-registry` prove, from the decks that do run it.
 *
 * B.4 — what both leader decks derive for this slide today, read off
 * `deck-registry.test.ts` and `deck-sets.ts` rather than off §4.3, which still says B.5.
 * The run filled from the front behind this one: B.1 while it was the run's only member,
 * B.2 once gh#65 put §6.1's `gap-hardest-part` at the head, B.3 once gh#66's `gap-no-sop`
 * landed behind that, B.5 then B.6 while gh#67's §6.3 and §6.4 content was two rows and
 * then three, and B.4 now that all three retired into one `gap-failures-pattern`.
 *
 * THIS CONSTANT HAS BEEN STALE TWICE — `num: 2` for the whole of gh#66's life and `num: 5`
 * for the whole of gh#67's — because nothing here asserts against the composed number, so
 * a wrong value is silent. It is corrected rather than re-argued: the number is not
 * authored in the slide (§3.5), which makes this a harness input and not a claim the slide
 * makes, and `deck-composed-numbering.test.ts` is what holds the real one.
 */
const AT = { letter: "B", num: 4, sectionKey: "gap" } as const;

/** One button per pose, so a test can WALK the slide inside one mounted tree. */
function Nav() {
  const { goTo } = useDeck();
  return (
    <>
      {POSES.map((s) => (
        <button key={s} data-testid={`goto-${s}`} onClick={() => goTo(0, s)} />
      ))}
    </>
  );
}

function renderLadder(content: LadderBrandBlock, pose = 0) {
  const out = render(
    <SlideHarness def={gapCapabilityLadderSlide} at={AT}>
      <Nav />
      <GapCapabilityLadder content={content} />
    </SlideHarness>,
  );
  if (pose > 0) goToPose(pose);
  return out;
}

function goToPose(pose: number) {
  act(() => screen.getByTestId(`goto-${pose}`).click());
}

const gems = capabilityLadderFor("gems");
const berau = capabilityLadderFor("berau");

/**
 * Every brand the app REGISTERS, from `BRANDS` and not from the ladder's own
 * table — which is why that table is not exported. A rule held over the keys of
 * the thing being checked proves the thing equals itself; held over `BRANDS` it
 * proves the pick answers for every brand that can actually reach a deck.
 */
const REGISTERED_BRANDS = Object.keys(BRANDS) as Brand[];

// ── the def ──────────────────────────────────────────────────────────────────

describe("the slide def", () => {
  test("is the file's basename, three steps, closing on the fullest pose", () => {
    // The id is the basename (`deck-slide-ids.test.ts` owns the rule; this pins
    // the value). THREE and not §7.2's five: the two marks that arrive with their
    // own evidence share pose 0, so the slide spends one pose on the vocabulary
    // and its placements, one on the question, and one on the distance between
    // them.
    expect(gapCapabilityLadderSlide.id).toBe("gap-capability-ladder");
    expect(gapCapabilityLadderSlide.steps).toBe(3);
    expect(POSES).toHaveLength(gapCapabilityLadderSlide.steps);
    // The exports print `canonicalPose` and nothing else, so a canonical pose
    // short of the last one would ship a PDF whose closer nobody ever reads.
    expect(gapCapabilityLadderSlide.canonicalPose).toBe(gapCapabilityLadderSlide.steps - 1);
    expect(gapCapabilityLadderSlide.sectionKey).toBe("gap");
    expect(gapCapabilityLadderSlide.animationMode).toBe("step-reveal");
    expect(gapCapabilityLadderSlide.surface).toBe("dark");
  });
});

// ── the ladder itself ────────────────────────────────────────────────────────

describe("the five rungs", () => {
  test("are §6.5's five, in order, each with its name and its definition", () => {
    renderLadder(gems);

    // FIVE, from the content module's own array rather than a literal here: the
    // rungs, the treads and the markers' indices are all the same five, and a
    // sixth rung with no tread would render off the staircase.
    expect(C.rungs).toHaveLength(RUNG_COUNT);
    expect(C.rungs.map((r) => r.level)).toEqual(["L1", "L2", "L3", "L4", "L5"]);
    expect(C.rungs.map((r) => r.title)).toEqual([
      "Assisted",
      "Copilot at scale",
      "Agentic, bounded",
      "Multi-agent mesh",
      "Full agentic org",
    ]);

    // Read back out of the DOM, name and definition both: a rung rendered without
    // its definition is a rung the room cannot place itself on.
    C.rungs.forEach((rung) => {
      const name = screen.getByTestId(`gap-rung-${rung.id}-name`);
      expect(name.textContent, rung.id).toBe(`${rung.level} · ${rung.title}`);
      expect(screen.getByTestId(`gap-rung-${rung.id}-sub`).textContent, rung.id).toBe(rung.sub);
    });
  });

  test("hang under their own tread, and the climb is drawn as one path", () => {
    renderLadder(gems);

    // Structural, because jsdom places nothing: each label reads its own tread's
    // numbers, so a label and its rung cannot disagree.
    C.rungs.forEach((rung, i) => {
      const box = screen.getByTestId(`gap-rung-${rung.id}`);
      expect(box.style.left, rung.id).toBe(`${TREADS[i].x1 + 10}px`);
      expect(box.style.top, rung.id).toBe(`${TREADS[i].y + 10}px`);
    });

    // ONE path for the climb, so its draw-in climbs instead of assembling in
    // seven places.
    expect(screen.getByTestId("gap-ladder-path").getAttribute("d")).toBe(STAIR_PATH_EARNED);
  });

  test("draw L5's step dashed, in the mark the deck already spends on “not claimed”", () => {
    // THE ONE PLACE THE FIGURE ARGUES ABOUT ITSELF. L5 is declared only when
    // earned and nothing on this ladder is placed near it, so its step is drawn
    // in the same dash the open marker's chip and leader use. Asserted as the
    // pair of properties that makes it that mark and not a fifth encoding: it is
    // dashed, and the climb below it is not.
    renderLadder(gems);
    const earned = screen.getByTestId("gap-ladder-path");
    const unearned = screen.getByTestId("gap-ladder-path-unearned");

    expect(unearned.getAttribute("d")).toBe(STAIR_PATH_UNEARNED);
    expect(unearned.hasAttribute("stroke-dasharray")).toBe(true);
    expect(earned.hasAttribute("stroke-dasharray")).toBe(false);
    // Both halves of the ladder, and no third: together they run from L1's left
    // end to L5's right end, meeting exactly once.
    expect(STAIR_PATH_EARNED.startsWith(`M ${TREADS[0].x1} ${TREADS[0].y}`)).toBe(true);
    const join = anchorPoint({ on: "tread", rung: EARNED_THROUGH_RUNG, t: 1 });
    expect(STAIR_PATH_EARNED.endsWith(`L ${join.x} ${join.y}`)).toBe(true);
    expect(STAIR_PATH_UNEARNED.startsWith(`M ${join.x} ${join.y}`)).toBe(true);
    const top = TREADS[RUNG_COUNT - 1];
    expect(STAIR_PATH_UNEARNED.endsWith(`L ${top.x2} ${top.y}`)).toBe(true);
  });

  test("no citation line is printed above the figure any more", () => {
    // THE SUBTITLE IS GONE ON PURPOSE (owner, 2026-08-13): a 90-character mono
    // line naming SAE J3016 and Anthropic sat between the headline and the
    // staircase, and it was read by nobody in a room and by no reader of the
    // export. Held as an absence so a later edit cannot restore it silently — the
    // provenance belongs in the spec, which is where it still is.
    renderLadder(gems, 2);
    expect(screen.queryByTestId("gap-ladder-provenance")).toBeNull();
    const text = document.body.textContent ?? "";
    expect(text).toContain(C.headline); // positive control
    expect(text).not.toContain("SAE J3016");
    expect(text).not.toContain("Adapted from");
  });

  test("define the two rungs whose §6.5 wording named a term without defining it", () => {
    // L3 SAID "Decision contract · 70/30 split" and L4 said "Coordinated agents,
    // escalation paths" — one a ratio that collides with B.1's own 70/30 four
    // slides earlier, the other a mechanism with no stated end. Both terms of art
    // survive, because `mandate-phases-gates` turns each into a gate and quotes
    // the definition back; what this holds is that the definition now DEFINES
    // them, and that the ratio is gone.
    const l3 = C.rungs[2].sub;
    const l4 = C.rungs[3].sub;
    expect(l3).toContain("decision contract");
    expect(l3).toContain("limits");
    expect(l4).toContain("escalation path");
    expect(l4).toContain("people");
    C.rungs.forEach((rung) => expect(rung.sub, rung.id).not.toContain("70/30"));
  });
});

// ── the geometry, on its own terms ───────────────────────────────────────────

describe("the staircase geometry", () => {
  // ASSERTED AS INDEPENDENT INVARIANTS, not by calling the thing being checked.
  // The renderer reads `TREADS` and `anchorPoint`, so a test that expects
  // `anchorPoint(x)` and renders `anchorPoint(x)` passes on any return value at
  // all — including a coordinate off the figure, which is precisely the prototype
  // bug this module was rewritten to fix. These are properties a staircase has.

  test("climbs: every tread is left of and above the one before it, and they join", () => {
    TREADS.forEach((tread, i) => {
      expect(tread.x2, `tread ${i} runs left to right`).toBeGreaterThan(tread.x1);
      if (i === 0) return;
      const below = TREADS[i - 1];
      // A staircase, so each tread starts exactly where the last one ended (the
      // riser is that shared x) and sits strictly higher (smaller y).
      expect(tread.x1, `tread ${i} joins tread ${i - 1}`).toBe(below.x2);
      expect(tread.y, `tread ${i} is above tread ${i - 1}`).toBeLessThan(below.y);
    });
  });

  test("stays inside the stage, clear of the header and the NavBar band", () => {
    // The two budgets `geometry.ts` documents, held as numbers rather than prose.
    const first = TREADS[0];
    const last = TREADS[TREADS.length - 1];
    expect(first.x1).toBeGreaterThanOrEqual(48);
    expect(last.x2).toBeLessThanOrEqual(1280 - 48);
    // A rung label hangs under its tread and runs up to 78px; the NavBar band
    // starts at 660. The chips hang above the top tread, from a shelf that must
    // clear it.
    expect(first.y + 78).toBeLessThanOrEqual(660);
    expect(CHIP_SHELF).toBeLessThan(last.y);
  });

  test("a tread anchor is that tread's midpoint; a riser anchor is on the riser", () => {
    TREADS.forEach((tread, rung) => {
      const at = anchorPoint({ on: "tread", rung });
      // Independently computed, and checked as a property too: equidistant from
      // both ends, and exactly on the tread's own line.
      expect(at.x, `rung ${rung}`).toBe((tread.x1 + tread.x2) / 2);
      expect(at.x - tread.x1, `rung ${rung} is centred`).toBe(tread.x2 - at.x);
      expect(at.y, `rung ${rung} sits on its tread`).toBe(tread.y);
      // AND `t` NEVER LEAVES THE TREAD, which is the whole reason it is a fraction
      // of one tread and not a fraction of the ladder. Its default is the midpoint
      // above, so adding it took nothing away from any marker that does not ask.
      [0, 0.15, 0.5, 1].forEach((t) => {
        const along = anchorPoint({ on: "tread", rung, t });
        expect(along.y, `rung ${rung} t=${t}`).toBe(tread.y);
        expect(along.x, `rung ${rung} t=${t}`).toBeGreaterThanOrEqual(tread.x1);
        expect(along.x, `rung ${rung} t=${t}`).toBeLessThanOrEqual(tread.x2);
      });
    });

    // A RISER ANCHOR IS THE POINT THE PROTOTYPE GOT WRONG. Its x is the x the two
    // treads share — so it is on the figure — and its y is strictly between them,
    // so it is on neither rung.
    const riser = anchorPoint({ on: "riser", below: 0 });
    expect(riser.x).toBe(TREADS[0].x2);
    expect(riser.x).toBe(TREADS[1].x1);
    expect(riser.y).toBeLessThan(TREADS[0].y);
    expect(riser.y).toBeGreaterThan(TREADS[1].y);
  });

  test("refuses an anchor the ladder does not have, rather than clamping it", () => {
    // A marker silently clamped to L5 is a marker making a claim nobody authored,
    // and it would look deliberate on a projector.
    expect(() => anchorPoint({ on: "tread", rung: RUNG_COUNT })).toThrow(/no rung/);
    expect(() => anchorPoint({ on: "tread", rung: -1 })).toThrow(/no rung/);
    expect(() => anchorPoint({ on: "riser", below: RUNG_COUNT - 1 })).toThrow(/no riser/);
    // Same rule for `t`: off the tread is off the figure.
    expect(() => anchorPoint({ on: "tread", rung: 0, t: 1.2 })).toThrow(/off rung/);
    expect(() => anchorPoint({ on: "tread", rung: 0, t: -0.1 })).toThrow(/off rung/);
  });

  test("the two drawn paths visit every tread and every riser, in order", () => {
    // Parsed back out of the strings, so a path cannot skip a step and still match
    // a hand-written expectation. Every corner of the figure, in climbing order,
    // is what the two paths together must name — the split between them is a
    // rendering decision and must not be able to lose a step.
    const points = (d: string) =>
      [...d.matchAll(/[ML] (\d+(?:\.\d+)?) (\d+(?:\.\d+)?)/g)].map((m) => ({
        x: Number(m[1]),
        y: Number(m[2]),
      }));
    const walked = [...points(STAIR_PATH_EARNED), ...points(STAIR_PATH_UNEARNED).slice(1)];
    expect(walked).toEqual(CORNERS.map((c) => ({ x: c.x, y: c.y })));
    // And the walk climbs: strictly increasing distance along the staircase.
    walked.forEach((p, i) => {
      if (i === 0) return;
      expect(alongStair(p), `corner ${i}`).toBeGreaterThan(alongStair(walked[i - 1]));
    });
  });

  test("a stretch between two marks follows the staircase, and only ever upward", () => {
    // WHAT THE GAP IS DRAWN FROM. The highlight is not a straight line between two
    // dots — it is the staircase itself, re-walked, which is why it cannot drift
    // off the figure. Read as properties: it starts and ends on the two marks, and
    // every corner between them is in it.
    const from = anchorPoint({ on: "tread", rung: 0 });
    const to = anchorPoint({ on: "tread", rung: 2 });
    const d = stairPathBetween(from, to);
    expect(d.startsWith(`M ${from.x} ${from.y}`)).toBe(true);
    expect(d.endsWith(`L ${to.x} ${to.y}`)).toBe(true);
    for (const corner of [
      { x: TREADS[0].x2, y: TREADS[0].y },
      { x: TREADS[1].x1, y: TREADS[1].y },
      { x: TREADS[1].x2, y: TREADS[1].y },
      { x: TREADS[2].x1, y: TREADS[2].y },
    ]) {
      expect(d, `${corner.x},${corner.y}`).toContain(`L ${corner.x} ${corner.y}`);
    }

    // A stretch drawn downhill would still render — as a highlight over the wrong
    // steps — so it throws instead. Same for a point that is not on the figure at
    // all, which is the prototype's mid-air marker bug arriving by another door.
    expect(() => stairPathBetween(to, from)).toThrow(/one way/);
    expect(() => stairPathBetween(from, from)).toThrow(/one way/);
    expect(() => stairPathBetween({ x: 400, y: 400 }, to)).toThrow(/not on the staircase/);
  });
});

// ── the four encodings, all at once ──────────────────────────────────────────

describe("asserted and open are separated four ways at once", () => {
  // THE CORE OF THE SLIDE (§7.2). Copper has no second hue to spend, so the two
  // epistemic statuses are carried by form — and by FOUR forms, so that a chip
  // border lost to a refactor does not silently take the distinction with it.
  // Read off GEMS, the one brand that renders both marks.
  beforeEach(() => renderLadder(gems, 2));

  test("1 · the chip — solid and filled against hairline dashed and unfilled", () => {
    const asserted = screen.getByTestId("gap-marker-asserted");
    const open = screen.getByTestId("gap-marker-open");

    expect(asserted.style.border).toContain("solid");
    expect(open.style.border).toContain("dashed");
    expect(asserted.style.border).not.toContain("dashed");
    expect(open.style.border).not.toContain("solid");
    // The fill rides along with the border and says the same thing: nothing has
    // been placed here, so nothing is coloured in.
    expect(asserted.style.background).not.toBe("transparent");
    expect(open.style.background).toBe("transparent");
  });

  test("2 · the leader — solid against dashed", () => {
    const asserted = screen.getByTestId("gap-leader-asserted");
    const open = screen.getByTestId("gap-leader-open");

    // Absence, not the string "none": the attribute is simply not on the solid
    // leader, so this cannot pass on a keyword that renders as a dash pattern.
    expect(asserted.hasAttribute("stroke-dasharray")).toBe(false);
    expect(open.getAttribute("stroke-dasharray")).toBe("3 5");
    expect(Number(asserted.getAttribute("stroke-width"))).toBeGreaterThan(
      Number(open.getAttribute("stroke-width")),
    );
  });

  test("3 · the mark — a filled dot against an open ring", () => {
    const dot = screen.getByTestId("gap-dot-asserted");
    const ring = screen.getByTestId("gap-dot-open");

    expect(dot.getAttribute("fill")).toBe("var(--copper-300)");
    // AN OPEN RING: unfilled and outlined. Both halves, because a ring that lost
    // its stroke would be invisible and a ring that gained a fill would be a dot.
    expect(ring.getAttribute("fill")).toBe("none");
    expect(ring.getAttribute("stroke")).toBe("var(--copper-600)");
  });

  test("4 · the type — mono uppercase with a source against serif italic ending in “?”", () => {
    const label = screen.getByTestId("gap-asserted-label");
    const question = screen.getByTestId("gap-open-question");

    expect(label.style.fontFamily).toBe("var(--mono)");
    expect(label.style.textTransform).toBe("uppercase");
    // THE WHOLE CHIP IS ONE REGISTER, body included. A serif citation would put the
    // asserted body in the open question's register and leave encoding 4 carried by
    // the eyebrow alone — three encodings doing the work of four.
    const source = screen.getByTestId("gap-asserted-source");
    expect(source.style.fontFamily).toBe("var(--mono)");
    // The asserted mark's body IS its source, printed on the slide (§6.5).
    expect(source.textContent).toBe(
      gems.techFunction.kind === "asserted" ? gems.techFunction.marker.source : "",
    );

    expect(question.style.fontFamily).toBe("var(--serif)");
    expect(question.style.fontStyle).toBe("italic");
    // Held over the COPY, for every brand, not just the one rendered here: the
    // trailing "?" is one of the four encodings and an author can delete it.
    for (const brand of REGISTERED_BRANDS) {
      expect(capabilityLadderFor(brand).open.question.trimEnd().endsWith("?"), brand).toBe(true);
    }
  });

  test("and the ring's position is asked, not asserted — the label names its own rung", () => {
    // THE RING SITS ON A TREAD, so the slide has to say why. §6.5 is explicit that
    // no adoption-assessment data exists for either brand: an unlabelled ring on
    // L2's tread reads as "they are around L2", which is a placement nobody
    // authored. The eyebrow therefore names the rung under examination AND ends in
    // "?", which is the whole difference from the asserted chip's `≈`.
    //
    // Held over every brand's copy, because this is the one encoding a reword can
    // silently drop while the slide still looks finished.
    for (const brand of REGISTERED_BRANDS) {
      const { open } = capabilityLadderFor(brand);
      const rung = C.rungs[open.rung];
      expect(open.label, `${brand} names the rung its ring sits on`).toContain(rung.level);
      expect(open.label.trimEnd().endsWith("?"), `${brand} asks it`).toBe(true);
    }
    // And the asserted chip does NOT end in a question mark — it hedges with `≈`
    // and then cites. Two different moves, two different marks.
    if (gems.techFunction.kind !== "asserted") throw new Error("unreachable");
    expect(gems.techFunction.marker.label.endsWith("?")).toBe(false);
    expect(gems.techFunction.marker.label).toContain("≈");
    // Rendered, so the eyebrow the room reads is the one just checked.
    expect(screen.getByTestId("gap-open-label").textContent).toBe(gems.open.label);
  });

  test("and no legend appears anywhere on the slide", () => {
    // NO LEGEND IS THE POINT, not a stylistic preference: a legend would let the
    // four encodings above be wrong without anyone noticing, because the words
    // would carry the meaning instead. So nothing on the stage may NAME the
    // distinction — not a swatch, not a key, and not the field names the content
    // module uses for it.
    const text = document.body.textContent ?? "";
    // POSITIVE CONTROL FIRST. Every assertion below is a `not.toMatch` over this
    // one string, so an empty stage would pass all of them and the test would be
    // proving nothing. This is what makes it a check.
    expect(text).toContain(C.headline);
    expect(text).toContain(gems.open.question);

    for (const word of [/\basserted\b/i, /\bopen question\b/i, /\blegend\b/i, /\bkey\b\s*:/i]) {
      expect(text, String(word)).not.toMatch(word);
    }
    // The two `TechFunction` discriminants and the marker ids are internal
    // vocabulary; printing either is how a legend gets in by accident.
    for (const internal of ["asserted", "absent", gems.open.id]) {
      expect(text.toLowerCase()).not.toContain(internal.toLowerCase());
    }
  });
});

// ── the brand axis (§4.4 slot 2) ──────────────────────────────────────────────

describe("GEMS", () => {
  test("asserts DigiTech at ≈ L3, on L3's tread, with its source printed", () => {
    renderLadder(gems, 0);

    expect(gems.techFunction.kind).toBe("asserted");
    if (gems.techFunction.kind !== "asserted") throw new Error("unreachable");
    const { marker } = gems.techFunction;

    expect(screen.getByTestId("gap-asserted-label").textContent).toBe(marker.label);
    expect(marker.label).toContain("L3");
    // THE SOURCE IS THE CLAIM'S LICENCE. §6.5 sources L3 to Google Cloud's
    // published GEMVIS description, and an asserted mark with no visible citation
    // is the thing §6.5 forbids — so both the copy and the render are checked.
    const source = screen.getByTestId("gap-asserted-source").textContent ?? "";
    expect(source).toBe(marker.source);
    expect(source).toContain("Google Cloud");

    // THE EVIDENCE IS A LIST NOW, and one <li> per authored point — a point that
    // renders as prose has stopped being a point. Read off the DOM in order, so a
    // reordering that broke the L3-clause mapping below fails here.
    const items = [...screen.getByTestId("gap-asserted-points").querySelectorAll("li")];
    expect(items.map((li) => li.textContent)).toEqual([...marker.points]);
    expect(marker.points).toHaveLength(3);

    // AND EACH POINT ANSWERS ONE CLAUSE OF L3, which is the whole reason the
    // paragraph was cut: the room is being asked to accept `≈ L3`, not to admire a
    // platform. Held over the joined copy rather than per index, so a reword may
    // move a fact between points but may not drop one.
    const why = marker.points.join(" ");
    expect(why).toContain("dispatcher"); // an AGENT takes the request — past L2
    expect(why).toContain("scope"); // and it is BOUNDED — L3's second clause
    expect(why).toContain("4,000+ users"); // in production, so it is a rung
    // "Hierarchical multi-agent" was the phrase that made L3 defensible to an
    // architect and opaque to everyone else. It stays out.
    expect(why.toLowerCase()).not.toContain("hierarchical");
    // AND THE BOX DOES NOT ARGUE THE NEGATIVE. "Not a mesh yet" would be this deck's
    // reading against a source that calls GEMVIS multi-agent; the `≈` is the hedge.
    expect(why.toLowerCase()).not.toContain("not a mesh");

    // On L3's tread, by the rung index the content names — not by a coordinate
    // this test also believes in. ALONG that tread by the figure's own constant:
    // the dot sits left of centre so the aside keeps the riser pocket beside it.
    const dot = screen.getByTestId("gap-dot-asserted");
    const at = anchorPoint({ on: "tread", rung: marker.rung, t: marker.t });
    expect(marker.rung).toBe(2); // L3 — "Agentic, bounded"
    // AND NO `t` OF ITS OWN: L3's midpoint is at 638 and the tech slot runs
    // 456…740, so this is the mark the default was written for. The Berau chip
    // authors one because L2's tread runs out from under the slot.
    expect(marker.t).toBeUndefined();
    expect(dot.getAttribute("cx")).toBe(String(at.x));
    expect(dot.getAttribute("cy")).toBe(String(at.y));
    expect(at.y).toBe(TREADS[2].y);
  });

  test("asks the organization question at L1, ending in “?”, with its evidence", () => {
    renderLadder(gems, 1);

    const question = screen.getByTestId("gap-open-question").textContent ?? "";
    expect(question).toBe(gems.open.question);
    expect(question.endsWith("?")).toBe(true);
    // THE RING MOVED DOWN TO L1 (owner, 2026-08-13): "not really adopted well" is
    // not an org-wide rollout people drive, it is a few people working their own
    // way, which is L1's own definition.
    expect(gems.open.rung).toBe(0);
    expect(gems.open.label).toContain("L1");
    // AND THE UNSOURCED NUMBER IS GONE. It used to ask about "the other 90%" — a
    // share of headcount this deck never sourced and the research record files as
    // unverified internal context. Held as an absence, because a figure like that
    // is exactly what a leader in the room checks.
    expect(question).not.toContain("90%");
    expect(question).not.toMatch(/\d/);
    // DigiTech's own brief is what makes the question fair to ask in the room.
    expect(screen.getByTestId("gap-open-evidence").textContent).toContain(
      "AI adoption is not really adopted well",
    );
  });

  test("lights the stretch between the question and the claim, and names it once", () => {
    renderLadder(gems, 2);
    if (gems.techFunction.kind !== "asserted") throw new Error("unreachable");

    // THE ARGUMENT, DRAWN. The highlight runs from the ring to the claim along the
    // staircase itself, so what the room sees is the distance rather than a
    // sentence about it. Read off the render against the geometry, so a highlight
    // that starts at the wrong mark fails here.
    const lit = screen.getByTestId("gap-ladder-path-gap");
    expect(lit.getAttribute("d")).toBe(
      stairPathBetween(
        anchorPoint({ on: "tread", rung: gems.open.rung }),
        anchorPoint({
          on: "tread",
          rung: gems.techFunction.marker.rung,
          t: gems.techFunction.marker.t,
        }),
      ),
    );
    // Thicker and brighter than the climb it lies over — the two are the same line
    // read twice, and the second reading has to win.
    const climb = screen.getByTestId("gap-ladder-path");
    expect(Number(lit.getAttribute("stroke-width"))).toBeGreaterThan(
      Number(climb.getAttribute("stroke-width")),
    );
    // NAMED ONCE, in two words, and the count is in the closer instead: "two
    // rungs" is true of this brand's own two marks and of no other's.
    expect(screen.getByTestId("gap-tag").textContent).toBe(C.gapLabel);
    expect(gems.closer).toContain("two rungs");
    expect(gems.techFunction.marker.rung - gems.open.rung).toBe(2);
  });
});

describe("Berau", () => {
  test("asserts MineTech at ≥ L2, on L2's tread, and cites Berau rather than an outsider", () => {
    // THIS BLOCK USED TO PLACE NOBODY, and the test used to hold the absence. The
    // owner's correction of 2026-08-14: MineTech stands at L2 or above, and what it
    // has no equivalent of is a PUBLISHED output, not a rung. So the placement is
    // asserted and the absence moved into the source line — which is what the last
    // two assertions here are for.
    renderLadder(berau, 0);

    expect(berau.techFunction.kind).toBe("asserted");
    if (berau.techFunction.kind !== "asserted") throw new Error("unreachable");
    const { marker } = berau.techFunction;

    expect(screen.getByTestId("gap-asserted-label").textContent).toBe(marker.label);
    expect(marker.label).toContain("L2");
    // `≥` AND NOT `≈`: "L2 at minimum" is a floor, not an approximation, and the
    // GEMS chip's `≈` says the other thing. Held against that chip so the two
    // operators cannot converge on one house hedge.
    expect(marker.label).toContain("≥");
    expect(marker.label).not.toContain("≈");

    // EACH POINT ANSWERS ONE CLAUSE OF L2 — "Everyone has the tool. People still do
    // every step." — which is the same discipline the DigiTech chip follows against
    // L3. Held over the joined copy, so a reword may move a fact but not drop one.
    const items = [...screen.getByTestId("gap-asserted-points").querySelectorAll("li")];
    expect(items.map((li) => li.textContent)).toEqual([...marker.points]);
    expect(marker.points).toHaveLength(3);
    const why = marker.points.join(" ").toLowerCase();
    expect(why).toContain("tools"); // the tools are THERE — past L1's few people
    expect(why).toContain("every step"); // and people still drive — under L3
    expect(why).toContain("no agent"); // the ceiling, which is what makes it a floor

    // THE SOURCE CARRIES THE EPISTEMIC DISTANCE, and it is the whole reason a solid
    // chip with no outside citation is honest here. GEMS names Google Cloud; this
    // one says self-reported and unpublished, which keeps §6.5's finding — no
    // GEMVIS-equivalent output to point at — on the slide as a fact about EVIDENCE.
    const source = screen.getByTestId("gap-asserted-source").textContent ?? "";
    expect(source).toBe(marker.source);
    expect(source).toContain("MineTech's own account");
    expect(source).toContain("unpublished");
    // And it does not borrow the other brand's authority.
    expect(source).not.toContain("Google Cloud");

    // On L2's tread, by the rung index the content names.
    const dot = screen.getByTestId("gap-dot-asserted");
    const at = anchorPoint({ on: "tread", rung: marker.rung, t: marker.t });
    expect(marker.rung).toBe(1); // L2 — "Copilot at scale"
    expect(dot.getAttribute("cx")).toBe(String(at.x));
    expect(dot.getAttribute("cy")).toBe(String(at.y));
    expect(at.y).toBe(TREADS[1].y);
    // ALONG that tread by an authored `t`, and this is the one number a content
    // edit can get wrong silently: L2's midpoint is at 418 and the tech slot starts
    // at 456, so a mark with no `t` starts its leader in mid-air beside its chip.
    // The generic leader-under-its-chip test walks every brand for that; this holds
    // the two things the number ALSO has to clear — the gap tag's pocket, which ends
    // at 506, and the L2–L3 riser at 528.
    expect(at.x).toBeGreaterThan(GAP_TAG_SLOT.left + GAP_TAG_SLOT.width);
    expect(at.x).toBeLessThan(TREADS[1].x2);
  });

  test("the tech slot is the same rectangle under either brand", () => {
    // ONE SLOT, WHATEVER FILLS IT. A leader walking either deck looks at the same
    // place, so the slot's geometry belongs to neither fill — and the slot carries no
    // border of its own, because one drawn here would box a brand's absence line too
    // and turn "we found nothing" into a claim.
    renderLadder(berau, 0);
    const slot = screen.getByTestId("gap-tech-slot");
    expect(slot).toContainElement(screen.getByTestId("gap-marker-asserted"));
    expect(slot.style.left).toBe(`${TECH_SLOT.left}px`);
    expect(slot.style.width).toBe(`${TECH_SLOT.width}px`);
    expect(slot.style.border).toBe("");
  });

  test("asks its own organization question — the training, not the tech function", () => {
    renderLadder(berau, 1);

    const question = screen.getByTestId("gap-open-question").textContent ?? "";
    expect(question).toBe(berau.open.question);
    expect(question).toContain("stay in the room");
    // THE RING MOVED DOWN TO L1 with the tech function's arrival (owner,
    // 2026-08-14): it no longer has to carry MineTech too, and the programme is
    // still running — so nothing yet says the wider company left the rung it started
    // on. Same placement as the GEMS ring, for the same reason.
    expect(berau.open.rung).toBe(0);
    expect(berau.open.rung).toBe(gems.open.rung);
    expect(berau.open.label).toContain("L1");

    const evidence = screen.getByTestId("gap-open-evidence").textContent ?? "";
    expect(evidence).toContain("382 trained");
    // NOT "382 leaders trained" — that word is the throwaway prototype's, and §6.5
    // says "382 trained". A headcount is exactly what a leader checks.
    expect(evidence).not.toContain("382 leaders");
    // AND THE TWO FACTS §6.5 GOT WRONG STAY WRONG-PROOF. §6.5 was written against a
    // plan: it says the competition is complete and the Ambassadors are named, and
    // on 2026-08-14 neither had happened. A deck that tells a room its own programme
    // has finished loses the room, so both are held as absences here — this is the
    // kind of claim a reword restores by accident.
    expect(evidence).not.toMatch(/competition is complete/i);
    expect(evidence).not.toMatch(/Ambassadors named/i);
    // The certificate went with them: it asked about what people kept AFTER an event
    // that has not happened.
    expect(berau.open.question).not.toMatch(/certificate/i);
  });

  test("lights one rung, and closes by pointing at the one above it", () => {
    renderLadder(berau, 2);
    if (berau.techFunction.kind !== "asserted") throw new Error("unreachable");

    // TWO MARKS, SO THERE IS A DISTANCE — and it is ONE rung, against the GEMS
    // ladder's two. Read off the render against the geometry, including the `t`, so
    // a lit stretch that stops at the tread's midpoint instead of at the mark fails
    // here.
    const lit = screen.getByTestId("gap-ladder-path-gap");
    expect(lit.getAttribute("d")).toBe(
      stairPathBetween(
        anchorPoint({ on: "tread", rung: berau.open.rung }),
        anchorPoint({
          on: "tread",
          rung: berau.techFunction.marker.rung,
          t: berau.techFunction.marker.t,
        }),
      ),
    );
    expect(screen.getByTestId("gap-tag").textContent).toBe(C.gapLabel);
    expect(berau.techFunction.marker.rung - berau.open.rung).toBe(1);

    // THE CLOSER READS THAT LINE AND THEN LOOKS UP. It cannot be the GEMS sentence
    // with a number swapped — "one rung" alone sounds like good news, and the
    // finding is that both marks sit UNDER L3. It also cannot still say "Nothing is
    // claimed on this ladder yet", which is what it said while this brand placed
    // nobody and which the chip above now makes false.
    expect(screen.getByTestId("gap-closer").textContent).toBe(berau.closer);
    expect(berau.closer).not.toBe(gems.closer);
    expect(berau.closer).toContain("one rung");
    expect(berau.closer).toContain("The rung above it");
    expect(berau.closer).not.toMatch(/\btwo rungs\b/);
    expect(berau.closer).not.toMatch(/Nothing is claimed/i);
  });
});

describe("a brand with nothing to place", () => {
  test("states the absence as real copy, in the slot the chip would have used", () => {
    // NO REGISTERED VARIANT TAKES THIS ARM TODAY — it was Berau's until the owner's
    // correction of 2026-08-14 — so `general` is what keeps the renderer honest. The
    // rule it holds is #16's finding 4 and it outlives the brand that prompted it: a
    // slot with nothing in it gets a SENTENCE, because a leader reads a blank
    // rectangle on a projector as a slide that did not finish loading.
    const general = capabilityLadderFor("general");
    if (general.techFunction.kind !== "absent") throw new Error("unreachable");
    renderLadder(general, 0);

    const line = screen.getByTestId("gap-tech-absence");
    expect(line.textContent).toBe(general.techFunction.line);
    expect(line.textContent?.length).toBeGreaterThan(40);
    // NO chip, NO leader, NO dot — the three things that would make it a placement.
    expect(screen.queryByTestId("gap-marker-asserted")).toBeNull();
    expect(screen.queryByTestId("gap-leader-asserted")).toBeNull();
    expect(screen.queryByTestId("gap-dot-asserted")).toBeNull();

    // AND NO GAP IS LIT. A distance needs two ends: with nothing asserted there is
    // nothing to measure to, and a highlight running from the ring to nowhere would
    // be the invented placement this slide exists to refuse. The tag goes with it —
    // a name for a stretch that was not drawn.
    goToPose(2);
    expect(screen.queryByTestId("gap-ladder-path-gap")).toBeNull();
    expect(screen.queryByTestId("gap-tag")).toBeNull();

    // Same rectangle as the chip's, and no border of its own.
    const slot = screen.getByTestId("gap-tech-slot");
    expect(slot).toContainElement(line);
    expect(slot.style.left).toBe(`${TECH_SLOT.left}px`);
    expect(slot.style.width).toBe(`${TECH_SLOT.width}px`);
    expect(slot.style.border).toBe("");
  });
});

describe("the Nanovest mark", () => {
  test("points at the L3–L4 riser under both brands, from a box of its own form", () => {
    for (const [name, block] of [
      ["gems", gems],
      ["berau", berau],
    ] as const) {
      const { unmount } = renderLadder(block, 0);

      // ON THE RISER, which is what "L3–L4" honestly means on a staircase — the
      // prototype interpolated between tread centres and put this mark in mid-air.
      // `below: 2` is the riser rising out of L3, so the arrow lands between the two
      // rungs the label names.
      //
      // READ OFF THE PATH ITSELF: the leader leaves the box's underside, turns once,
      // and its last point is on the riser's own height, `ASIDE_LEADER.tipGap` short
      // of it so the arrowhead — not the stroke — is what touches the figure.
      const leader = screen.getByTestId("gap-mark-aside");
      const at = anchorPoint({ on: "riser", below: 2 });
      const d = leader.getAttribute("d") ?? "";
      expect(d, name).toBe(
        `M ${ASIDE_LEADER.x} ${ASIDE_SLOT.bottom} L ${ASIDE_LEADER.x} ${at.y} ` +
          `L ${at.x - ASIDE_LEADER.tipGap} ${at.y}`,
      );
      expect(at.y).toBeGreaterThan(TREADS[3].y);
      expect(at.y).toBeLessThan(TREADS[2].y);

      expect(screen.getByTestId("gap-aside-label").textContent, name).toBe(C.aside.label);
      expect(C.aside.label, name).toContain("L3–L4");
      // MOVED UP TWO RUNGS on the owner's placement (2026-08-13), and the copy moved
      // with it: the old note was a joke about standing on the second rung, which a
      // mark at L3–L4 cannot make. STILL BRAND-INVARIANT, and now for a better
      // reason than the joke — it is a fact about us, and a fact about us that
      // changed per audience would be a sales pitch.
      expect(screen.getByTestId("gap-aside").textContent, name).toContain(
        "not above it",
      );
      expect(C.aside.note, name).not.toContain("second rung");

      // A BOX NOW (owner, 2026-08-13), and a THIRD form — dotted, where the two
      // chips are solid and dashed. Held per brand because it is the mark that does
      // not vary: whatever the ladder carries, this is where we say we stand.
      const box = screen.getByTestId("gap-aside");
      expect(box.style.border, name).toContain("dotted");
      expect(box.style.background, name).toBe("transparent");
      // Still no source line: L3–L4 is our own account of our own work, and a
      // citation slot here would invite one that does not exist.
      expect(screen.queryByTestId("gap-aside-source"), name).toBeNull();

      unmount();
    }
  });

  test("is the only leader on the stage that ends in an arrowhead", () => {
    // THE THIRD FORM'S FOURTH DIFFERENCE. Two chips TETHER to the rung they name —
    // the tether says the chip and the mark are one claim — and this one POINTS,
    // which is a different sentence: that height, there, said by a box that is not
    // making a claim about the room at all. Asserted as an exclusive, because an
    // arrowhead that spread to the other two leaders would erase the distinction
    // while every individual box still looked right.
    renderLadder(gems, 2);
    const arrowed = [...document.querySelectorAll("[marker-end]")];
    expect(arrowed).toHaveLength(1);
    expect(arrowed[0]).toBe(screen.getByTestId("gap-mark-aside"));
    // And the head it references is actually defined — a dangling `url(#…)` renders
    // as no arrow at all, silently.
    const ref = arrowed[0].getAttribute("marker-end") ?? "";
    const id = ref.replace(/^url\(#|\)$/g, "");
    expect(document.querySelector(`marker#${id}`)).not.toBeNull();
  });

  test("connects with a dashed leader, and never crosses the step it points under", () => {
    // THE TURN IS LOAD-BEARING, not a flourish. The box stands on L4's step and the
    // riser is below and left of it: any straight run between them crosses L4's
    // tread or L4's rung label. So the leader drops into the empty band LEFT of the
    // riser first — held here as the two properties that make that true.
    //
    // POSE 2, because the open leader this is compared against does not exist
    // before pose 1 — the aside's own arrow is on the stage from pose 0.
    renderLadder(gems, 2);
    const leader = screen.getByTestId("gap-mark-aside");
    expect(leader.tagName.toLowerCase()).toBe("path");
    expect(screen.queryByTestId("gap-dot-aside")).toBeNull();

    // DASHED — the connecting line the owner asked for, and a third dash pattern:
    // not the open leader's "3 5", so the two are not read as the same statement.
    const dash = leader.getAttribute("stroke-dasharray") ?? "";
    expect(dash).not.toBe("");
    expect(dash).not.toBe(screen.getByTestId("gap-leader-open").getAttribute("stroke-dasharray"));

    // The drop happens LEFT of the riser, which is what keeps it off L4's tread and
    // off L4's rung label (whose box starts at the riser + 10).
    expect(ASIDE_LEADER.x).toBeLessThan(TREADS[3].x1);
    // And it starts at the box's underside, so the tether leaves the box it belongs
    // to rather than passing beside it.
    expect(ASIDE_LEADER.x).toBeGreaterThan(ASIDE_SLOT.left);
    expect(ASIDE_LEADER.x).toBeLessThan(ASIDE_SLOT.left + ASIDE_SLOT.width);
    // Thinner than the asserted leader — rank by size and by what it is not given,
    // never by opacity, which on this slide still means "not revealed yet".
    expect(Number(leader.getAttribute("stroke-width"))).toBeLessThan(
      Number(screen.getByTestId("gap-leader-asserted").getAttribute("stroke-width")),
    );
    expect(leader.style.opacity).toBe("");
  });
});

// ── the three boxes ──────────────────────────────────────────────────────────

describe("the boxes", () => {
  test("wear three different border styles, and no two share one", () => {
    // ENCODING 1, NOW OVER THREE OBJECTS. The stage carries a claim, a question and
    // an aside, and each is bordered differently — solid, dashed, dotted. Read as a
    // SET so that a copy-paste which gave two boxes the same style fails, which is
    // the failure a per-box assertion cannot see.
    renderLadder(gems, 2);
    const styles = ["gap-marker-asserted", "gap-marker-open", "gap-aside"].map((id) => {
      const border = screen.getByTestId(id).style.border;
      return ["solid", "dashed", "dotted"].find((s) => border.includes(s)) ?? border;
    });
    expect(styles).toEqual(["solid", "dashed", "dotted"]);
    expect(new Set(styles).size).toBe(3);
  });

  test("all three carry the border travel, and it is an overlay and not the border", () => {
    // THE CONTINUOUS MOTION (owner, 2026-08-13) is drawn by `.gap-box-live::after`
    // in globals.css, on the same rectangle as the border and never instead of it.
    // Held as the pair: every box has the class, and every box still states its own
    // border style inline — so the travel cannot be what a later edit reaches for
    // when it needs a box to look different.
    renderLadder(gems, 2);
    for (const id of ["gap-marker-asserted", "gap-marker-open", "gap-aside"]) {
      const box = screen.getByTestId(id);
      expect(box, id).toHaveClass("gap-box-live");
      expect(box.style.border, id).not.toBe("");
    }
    // ONE SPEED AND ONE COLOUR FOR ALL THREE: a per-box rhythm would be a fifth
    // encoding nobody authored, so nothing here sets a duration or a delay of its
    // own on top of the shared rule.
    for (const id of ["gap-marker-asserted", "gap-marker-open", "gap-aside"]) {
      expect(screen.getByTestId(id).style.animationDuration, id).toBe("");
    }
  });
});

// ── the brand pick itself ────────────────────────────────────────────────────

describe("brand variance resolves through a typed pick over Brand", () => {
  test("every registered brand has a block, and every block is internally consistent", () => {
    // A `Record<Brand, …>`, so a fourth brand fails to COMPILE rather than
    // silently showing one organisation another's evidence. Walked here as a
    // value too, so `general` — which has no leader variant registered and so
    // reaches no deck — is still held to the same rules.
    const brands = REGISTERED_BRANDS;
    expect(brands.sort()).toEqual(["berau", "gems", "general"]);

    for (const brand of brands) {
      const block = capabilityLadderFor(brand);
      expect(capabilityLadderFor(brand), brand).toBe(block);

      // The union is what makes "never both, never neither" true. Read as a value
      // so a block built by some future spread cannot lose its discriminant.
      expect(["asserted", "absent"], brand).toContain(block.techFunction.kind);
      if (block.techFunction.kind === "absent") {
        expect(block.techFunction.line.trim(), brand).not.toBe("");
      } else {
        expect(block.techFunction.marker.source.trim(), brand).not.toBe("");
        expect(block.techFunction.marker.rung, brand).toBeLessThan(RUNG_COUNT);
        // AN ASSERTED MARK ARGUES ITS RUNG. Points are what carry that argument, so
        // a block with none is a placement stated and never defended — and it would
        // still render, as a bordered label with a citation under it.
        expect(block.techFunction.marker.points.length, brand).toBeGreaterThan(0);
        block.techFunction.marker.points.forEach((point, i) => {
          expect(point.trim(), `${brand} point ${i}`).not.toBe("");
          // AND IT FITS ON ONE LINE. jsdom measures nothing, so a wrap cannot be
          // caught by rendering one — this is the only check between a reword and a
          // projector. The first cut of point 3 was 36 characters and wrapped
          // "users" onto a line of its own, which made three points look like four.
          expect(point.length, `${brand} point ${i}: "${point}"`).toBeLessThanOrEqual(POINT_MAX);
        });
      }
      expect(block.open.rung, brand).toBeLessThan(RUNG_COUNT);
      expect(block.closer.trim(), brand).not.toBe("");
    }
  });

  test("every marker's leader starts under its own chip, read off the render", () => {
    // The one geometric assumption CONTENT can break: a marker names a rung, and a
    // rung whose tread sits outside the chip's box starts the tether in mid-air
    // beside the chip it belongs to. Measured from the RENDERED leader and the
    // RENDERED slot — not from the production predicate, which this test used to
    // call and which would therefore have passed on `return true`.
    for (const brand of REGISTERED_BRANDS) {
      const block = capabilityLadderFor(brand);
      const { unmount } = renderLadder(block, 2);

      const pairs: Array<[string, string, string]> = [
        ["open", "gap-leader-open", "gap-marker-open"],
        ...(block.techFunction.kind === "asserted"
          ? ([["asserted", "gap-leader-asserted", "gap-tech-slot"]] as Array<[string, string, string]>)
          : []),
      ];
      for (const [name, leaderId, slotId] of pairs) {
        const leader = screen.getByTestId(leaderId);
        const slot = screen.getByTestId(slotId);
        const x = Number(leader.getAttribute("x1"));
        const left = parseFloat(slot.style.left);
        const width = parseFloat(slot.style.width);
        // Vertical, so "under the chip" is one number and not two.
        expect(leader.getAttribute("x1"), `${brand} ${name}`).toBe(leader.getAttribute("x2"));
        expect(x, `${brand} ${name} left edge`).toBeGreaterThanOrEqual(left);
        expect(x, `${brand} ${name} right edge`).toBeLessThanOrEqual(left + width);
        // It hangs FROM the shelf and stops short of its mark, so the tether and
        // the dot read as two marks rather than one blob.
        expect(Number(leader.getAttribute("y1")), `${brand} ${name} hangs from the shelf`).toBe(
          CHIP_SHELF,
        );
        const dot = screen.getByTestId(`gap-dot-${name}`);
        expect(
          Number(dot.getAttribute("cy")) - Number(leader.getAttribute("y2")),
          `${brand} ${name} stops short of its mark`,
        ).toBe(LEADER_GAP);
      }
      unmount();
    }
  });

  test("no component reads VARIANT — the same tree renders either brand", () => {
    // THE ACTUAL CHECK behind that rule, and the reason it matters: if any
    // component below the slide read `VARIANT` itself, both of these renders
    // would show the same brand, because one module epoch holds one variant.
    //
    // COMPARED ON THE COPY AND NOT ON THE PRESENCE OF A CHIP, which is what this
    // used to do while Berau placed nobody: both brands now assert a tech function,
    // so "one renders a chip and the other does not" would no longer catch a
    // component that read `VARIANT` — it would pass on two identical GEMS ladders.
    if (gems.techFunction.kind !== "asserted") throw new Error("unreachable");
    if (berau.techFunction.kind !== "asserted") throw new Error("unreachable");
    expect(gems.techFunction.marker.label).not.toBe(berau.techFunction.marker.label);

    const first = renderLadder(gems, 1);
    expect(screen.getByTestId("gap-asserted-label").textContent).toBe(
      gems.techFunction.marker.label,
    );
    expect(screen.getByTestId("gap-open-question").textContent).toBe(gems.open.question);
    first.unmount();

    renderLadder(berau, 1);
    expect(screen.getByTestId("gap-asserted-label").textContent).toBe(
      berau.techFunction.marker.label,
    );
    expect(screen.getByTestId("gap-open-question").textContent).toBe(berau.open.question);
  });
});

// ── the poses ────────────────────────────────────────────────────────────────

describe("the three poses build one distance", () => {
  test("pose 0 draws the ladder and both marks that come with their own evidence", () => {
    renderLadder(gems, 0);

    // THE LADDER AND WHAT WE CAN NAME ON IT (owner's step plan, 2026-08-13). The two
    // marks share this pose because they share a property — each arrives with its
    // own evidence, one cited outside and one self-reported — and because a
    // distance needs both of its ends on the stage before the room can be asked
    // about the middle.
    expect(screen.getByTestId("gap-ladder-path")).toBeInTheDocument();
    expect(screen.getByTestId("gap-ladder-path-unearned")).toBeInTheDocument();
    expect(screen.getByTestId("gap-mark-asserted")).toBeInTheDocument();
    expect(screen.getByTestId("gap-mark-aside")).toBeInTheDocument();

    // AND NOTHING THAT IS ABOUT THE ROOM. The question has not been asked yet and
    // the distance has not been drawn: a leader who places themselves has
    // self-diagnosed, one who is told argues with the next slide.
    expect(screen.queryByTestId("gap-mark-open")).toBeNull();
    expect(screen.queryByTestId("gap-ladder-path-gap")).toBeNull();
    expect(screen.queryByTestId("gap-tag")).toBeNull();
  });

  test("pose 0 sequences itself rather than landing five things at once", () => {
    // ONE KEYPRESS, NOT ONE INSTANT. Five things arrive on pose 0, so each carries
    // its own delay: the staircase climbs, the rung labels land as the line passes
    // them, and the two marks arrive last. Held as an ORDER rather than as
    // millisecond values, so retiming the build cannot break this and reordering it
    // cannot pass.
    renderLadder(gems, 0);
    const delayOf = (id: string) =>
      parseFloat(screen.getByTestId(id).style.animationDelay || "0");

    const rungDelays = C.rungs.map((rung) => delayOf(`gap-rung-${rung.id}`));
    rungDelays.forEach((delay, i) => {
      if (i === 0) return;
      expect(delay, C.rungs[i].id).toBeGreaterThan(rungDelays[i - 1]);
    });
    // The marks land after the last rung label, which lands after the first.
    expect(delayOf("gap-tech-slot")).toBeGreaterThan(rungDelays[RUNG_COUNT - 1]);
    expect(delayOf("gap-aside")).toBeGreaterThan(delayOf("gap-tech-slot"));
    // The dashed top step waits for the solid climb to finish drawing.
    expect(delayOf("gap-ladder-path-unearned")).toBeGreaterThan(0);
    expect(delayOf("gap-ladder-path")).toBe(0);
  });

  test("each pose adds its own move and keeps the ones before it", () => {
    renderLadder(gems, 0);

    // Walked inside ONE mounted tree, so a mark that survives only a fresh mount
    // — or a pose that clears one it should have kept — fails here.
    const revealed = (id: string) => screen.getByTestId(id).classList.contains("on");

    expect(revealed("gap-tech-slot")).toBe(true);
    expect(revealed("gap-aside")).toBe(true);
    expect(revealed("gap-marker-open")).toBe(false);
    expect(revealed("gap-closer")).toBe(false);

    goToPose(1);
    expect(screen.getByTestId("gap-mark-open")).toBeInTheDocument();
    expect(revealed("gap-marker-open")).toBe(true);
    expect(revealed("gap-tech-slot")).toBe(true);
    expect(revealed("gap-aside")).toBe(true);
    expect(revealed("gap-closer")).toBe(false);
    expect(screen.queryByTestId("gap-ladder-path-gap")).toBeNull();

    goToPose(2);
    expect(screen.getByTestId("gap-ladder-path-gap")).toBeInTheDocument();
    expect(revealed("gap-tag")).toBe(true);
    expect(revealed("gap-closer")).toBe(true);
    expect(revealed("gap-marker-open")).toBe(true);
    expect(screen.getByTestId("gap-closer").textContent).toBe(gems.closer);
  });

  test("the closer lands on one line, on L1's own baseline", () => {
    // OWNER, 2026-08-13. It used to sit at y=500 and wrap to two right-aligned
    // lines, which put the deck's one reframe in a ragged block floating level with
    // L3's label. Bottom-aligned to the floor L1's definition reaches, the stage
    // closes on ONE horizontal: the lowest rung on the left, the sentence about the
    // whole ladder on the right.
    //
    // ASSERTED AS THE SHARED NUMBER, because jsdom lays nothing out — the closer is
    // pinned to `RUNG_LABEL_FLOOR` and so is nothing else, so the two cannot drift
    // apart in the source. The rendered pair was walked at 1280×720.
    for (const block of [gems, berau]) {
      const { unmount } = renderLadder(block, 2);
      const closer = screen.getByTestId("gap-closer");
      expect(closer.style.bottom).toBe(`${720 - RUNG_LABEL_FLOOR}px`);
      expect(closer.style.top).toBe("");
      // ONE LINE, and it is the style that makes it one rather than a hope about
      // the column width.
      expect(closer.style.whiteSpace).toBe("nowrap");
      expect(closer.style.textAlign).toBe("right");
      unmount();
    }
    // And the floor is L1's, derived from its own tread rather than written twice.
    expect(RUNG_LABEL_FLOOR).toBeGreaterThan(TREADS[0].y);
    expect(CLOSER_SLOT.bottom).toBe(RUNG_LABEL_FLOOR);
    // It clears L1's label column: at this height that block is the only thing on
    // the stage, and the closer starts to the right of where it ends.
    expect(CLOSER_SLOT.left).toBeGreaterThan(TREADS[0].x1 + 10 + 200);
    // Still inside the stage's right margin, which is 48 everywhere in this figure.
    expect(CLOSER_SLOT.right).toBe(48);
  });
});

// ── reduced motion ───────────────────────────────────────────────────────────

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

  test("mounts zero SMIL nodes at every pose, under both brands", () => {
    // ZERO BY CONSTRUCTION, and that is the decision this asserts rather than a
    // happy accident. SMIL is invisible to the global reduced-motion rule in
    // globals.css — it squashes CSS animations only — so a SMIL node has to be
    // gated at mount, as E.12 gates its `<animateMotion>`. This slide's whole
    // motion budget is three one-shot path draws, the chips' reveals and the SVG
    // marks' `.gap-mark-in` fade — all CSS, all already handled by the global rule,
    // so there is nothing to gate. Asserted at every pose and under both brands
    // because the cheapest way to break it is to reach for `<animate>` on one
    // marker in one pose.
    for (const block of [gems, berau]) {
      for (const pose of POSES) {
        const { unmount } = renderLadder(block, pose);
        for (const tag of ["animate", "animateMotion", "animateTransform", "set"]) {
          expect(document.querySelectorAll(tag), `pose ${pose} · <${tag}>`).toHaveLength(0);
        }
        unmount();
      }
    }
  });

  test("every pose still mounts every mark it has reached, with its copy", () => {
    // WHAT THIS CAN AND CANNOT SAY. jsdom runs no animation, so "the staircase
    // rests on its FINISHED frame" is not checkable here — the class is present and
    // the computed dashoffset is nothing jsdom computes. This test therefore claims
    // only the DOM half: every mark the pose has reached is mounted, with its copy,
    // and the draw class is on the path. The computed half — dashoffset 0 and every
    // reached reveal at opacity 1, at all three poses under BOTH brands — is asserted
    // in a real engine by `scripts/gh53-verify.mjs --reduced`. Neither half alone is
    // the AC; both are run.
    renderLadder(gems, 0);
    expect(screen.getByTestId("gap-ladder-path")).toHaveClass("gap-ladder-draw");
    // The dashed step FADES rather than draws — a class setting `stroke-dasharray`
    // beats the attribute, so a path cannot both sweep and look dashed — which puts
    // it in the same bet as the marks below rather than the one above.
    expect(screen.getByTestId("gap-ladder-path-unearned")).toHaveClass("gap-mark-in");

    // AND EVERY DELAYED BOX GIVES ITS DELAY BACK HERE. The global rule squashes
    // durations and leaves delays alone, which is right for one-reveal-per-keypress
    // and wrong for the two places this figure stages reveals inside a pose — so
    // `.gap-beat` and `.gap-mark-in` are what globals.css hooks to zero them. Held as
    // a class on every box that reads a number from `BEAT`, because the failure is
    // silent: a reader who asked for no animation would simply wait 1.9s.
    C.rungs.forEach((rung) => {
      expect(screen.getByTestId(`gap-rung-${rung.id}`), rung.id).toHaveClass("gap-beat");
    });
    ["gap-tech-slot", "gap-aside"].forEach((id) => {
      expect(screen.getByTestId(id), id).toHaveClass("gap-beat");
    });
    goToPose(1);
    expect(screen.getByTestId("gap-marker-open")).toHaveClass("gap-beat");
    goToPose(2);
    ["gap-tag", "gap-closer"].forEach((id) => {
      expect(screen.getByTestId(id), id).toHaveClass("gap-beat");
    });
    goToPose(0);
    // The SVG marks fade by opacity through their own class, so they are the other
    // half of the same bet: `both` leaves them AT opacity 1 once the rule squashes
    // the duration, exactly as the paths rest on their finished frame.
    expect(screen.getByTestId("gap-mark-aside")).toHaveClass("gap-mark-in");
    C.rungs.forEach((rung) => {
      expect(screen.getByTestId(`gap-rung-${rung.id}-name`).textContent, rung.id).not.toBe("");
    });
    expect(screen.getByTestId("gap-asserted-source").textContent).not.toBe("");
    expect(screen.getByTestId("gap-aside-label").textContent).toBe(C.aside.label);

    goToPose(1);
    expect(screen.getByTestId("gap-open-question").textContent).toBe(gems.open.question);
    goToPose(2);
    expect(screen.getByTestId("gap-ladder-path-gap")).toHaveClass("gap-ladder-draw");
    expect(screen.getByTestId("gap-closer").textContent).toBe(gems.closer);
  });
});

// ── the copy rule §6.5's build rules state, checked over the copy ────────────

describe("keywords go on prose only", () => {
  /** Labels, never sentences. A copper italic inside any of these reads as a
   *  rendering fault, so none of them has a `*Kw` sibling to begin with — this
   *  holds that they never gain one by carrying a highlight-shaped string. */
  const LABELS: readonly string[] = [
    C.gapLabel,
    C.aside.label,
    ...C.rungs.flatMap((r) => [r.level, r.title, r.sub]),
    ...REGISTERED_BRANDS.flatMap((brand) => {
      const block = capabilityLadderFor(brand);
      return [
        block.open.label,
        ...(block.techFunction.kind === "asserted"
          ? [
              block.techFunction.marker.label,
              block.techFunction.marker.source,
              // THE POINTS ARE LABELS TOO, and this is the list's newest and least
              // obvious member: they are sentence-shaped, so a later editor will
              // want to highlight one. They argue a PLACEMENT — three copper
              // italics inside the one bordered claim on the stage would rank three
              // reasons the slide ranks by order alone.
              ...block.techFunction.marker.points,
            ]
          : []),
      ];
    }),
  ];

  test("no mono label, rung name or source is rendered through the highlighter", () => {
    // Rendered check, not an authored one: `<em class="kw">` is what a highlight
    // IS on the stage, so this reads the DOM for one inside any of those runs.
    for (const block of [gems, berau]) {
      const { unmount } = renderLadder(block, 2);
      const labelBoxes = [
        "gap-aside-label",
        "gap-open-label",
        ...C.rungs.flatMap((r) => [`gap-rung-${r.id}-name`, `gap-rung-${r.id}-sub`]),
        ...(block.techFunction.kind === "asserted"
          ? ["gap-asserted-label", "gap-asserted-points", "gap-asserted-source", "gap-tag"]
          : []),
      ];
      for (const id of labelBoxes) {
        expect(screen.getByTestId(id).querySelectorAll("em"), id).toHaveLength(0);
      }
      unmount();
    }
    // And the labels carry no stray markup of their own.
    LABELS.forEach((label) => expect(label).not.toContain("<em"));
  });

  test("every prose keyword is a substring of the copy it highlights", () => {
    // A keyword that does not occur is a highlight that silently does nothing —
    // the copy still reads, so nothing on the stage says the emphasis was lost.
    const pairs: Array<[string, string, readonly string[]]> = [
      ["headline", C.headline, C.headlineKw],
      ["aside.note", C.aside.note, C.aside.noteKw],
      ...REGISTERED_BRANDS.flatMap<[string, string, readonly string[]]>(
        (brand) => {
          const block = capabilityLadderFor(brand);
          return [
            [`${brand}.closer`, block.closer, block.closerKw],
            [`${brand}.open.question`, block.open.question, block.open.questionKw],
            [`${brand}.open.evidence`, block.open.evidence, block.open.evidenceKw],
            ...(block.techFunction.kind === "absent"
              ? ([[`${brand}.absence`, block.techFunction.line, block.techFunction.lineKw]] as Array<
                  [string, string, readonly string[]]
                >)
              : []),
          ];
        },
      ),
    ];

    pairs.forEach(([where, copy, kw]) => {
      kw.forEach((word) => expect(copy, `${where}: "${word}"`).toContain(word));
    });
  });

  test("no authored string names a section letter", () => {
    // §3.4 R2. This slide's own letter moves twice more inside Phase 6, and the
    // deck it lands in renumbers behind it — so a literal "B.5" or "SECTION B"
    // anywhere in this copy would be a lie on a projector within the week.
    const authored = [
      C.figLabel,
      C.headline,
      C.gapLabel,
      C.aside.label,
      C.aside.note,
      ...C.rungs.flatMap((r) => [r.level, r.title, r.sub]),
      ...REGISTERED_BRANDS.flatMap((brand) => {
        const block = capabilityLadderFor(brand);
        return [
          block.closer,
          block.open.label,
          block.open.question,
          block.open.evidence,
          ...(block.techFunction.kind === "asserted"
            ? [
                block.techFunction.marker.label,
                block.techFunction.marker.source,
                ...block.techFunction.marker.points,
              ]
            : [block.techFunction.line]),
        ];
      }),
    ];

    authored.forEach((copy) => {
      expect(copy).not.toMatch(/\bSECTIONS?\s+[A-N]\b/i);
      // A bare figure reference — `B.5`, `F.12`. The rung names `L1`…`L5` are not
      // of that shape, which is why the pattern requires the dot and a digit.
      expect(copy).not.toMatch(/\b[A-N]\.\d+\b/);
    });
  });
});
