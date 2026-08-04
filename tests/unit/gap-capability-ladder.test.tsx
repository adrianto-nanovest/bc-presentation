// THE CAPABILITY LADDER · slide tests. All five poses, both brands.
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
  capabilityLadderFor,
  gapLadderContent,
  type LadderBrandBlock,
} from "@/slides/leader-gap/content";
import {
  CHIP_SHELF,
  LEADER_GAP,
  RUNG_COUNT,
  STAIR_PATH,
  TECH_SLOT,
  TREADS,
  anchorPoint,
} from "@/slides/leader-gap/geometry";
import { BRANDS, type Brand } from "@/deck-variants";

const C = gapLadderContent;
const POSES = [0, 1, 2, 3, 4] as const;

/**
 * The position the ladder holds in the deck it actually composes into.
 *
 * `at` IS required here, and it is the one case `SlideHarness` documents: unit
 * tests resolve the default `general` deck, `general` has no leader variant, and
 * this slide reaches the two leader deck sets ALONE. So there is no derived
 * position to look up — which is itself the fact `deck-numbering-fixture` and
 * `deck-registry` prove, from the decks that do run it.
 *
 * B.1 rather than §4.3's B.5 because `gap` holds one slide today; #55–#58 put four
 * in front of it. Neither number is authored in the slide (§3.5), so this is a
 * harness input and not a claim the slide makes.
 */
const AT = { letter: "B", num: 1, sectionKey: "gap" } as const;

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
  test("is the file's basename, five steps, closing on the fullest pose", () => {
    // The id is the basename (`deck-slide-ids.test.ts` owns the rule; this pins
    // the value), and §7.2 settled the step budget at five.
    expect(gapCapabilityLadderSlide.id).toBe("gap-capability-ladder");
    expect(gapCapabilityLadderSlide.steps).toBe(5);
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

  test("hang under their own tread, and the staircase is one path", () => {
    renderLadder(gems);

    // Structural, because jsdom places nothing: each label reads its own tread's
    // numbers, so a label and its rung cannot disagree.
    C.rungs.forEach((rung, i) => {
      const box = screen.getByTestId(`gap-rung-${rung.id}`);
      expect(box.style.left, rung.id).toBe(`${TREADS[i].x1 + 10}px`);
      expect(box.style.top, rung.id).toBe(`${TREADS[i].y + 10}px`);
    });

    // ONE path, so the draw-in climbs instead of assembling in nine places.
    expect(screen.getByTestId("gap-ladder-path").getAttribute("d")).toBe(STAIR_PATH);
  });

  test("carry the provenance line on the slide, from pose 0", () => {
    // §6.5 requires it visible, not footnoted — the rungs are adapted, not
    // invented, and the two systems they are adapted from are named.
    renderLadder(gems);
    expect(screen.getByTestId("gap-ladder-provenance").textContent).toBe(C.provenance);
    expect(C.provenance).toContain("SAE J3016");
    expect(C.provenance).toContain("Anthropic");
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
  });

  test("the path visits every tread and every riser, in order", () => {
    // Parsed back out of the string, so the path cannot skip a step and still
    // match a hand-written expectation.
    const horizontals = [...STAIR_PATH.matchAll(/H (\d+(?:\.\d+)?)/g)].map((m) => Number(m[1]));
    const verticals = [...STAIR_PATH.matchAll(/V (\d+(?:\.\d+)?)/g)].map((m) => Number(m[1]));
    expect(STAIR_PATH.startsWith(`M ${TREADS[0].x1} ${TREADS[0].y}`)).toBe(true);
    expect(horizontals).toEqual(TREADS.map((t) => t.x2));
    expect(verticals).toEqual(TREADS.slice(1).map((t) => t.y));
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
    renderLadder(gems, 1);

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
    expect(source).toContain("4,000+ users");

    // On L3's tread, by the rung index the content names — not by a coordinate
    // this test also believes in.
    const dot = screen.getByTestId("gap-dot-asserted");
    const at = anchorPoint({ on: "tread", rung: marker.rung });
    expect(marker.rung).toBe(2); // L3 — "Agentic, bounded"
    expect(dot.getAttribute("cx")).toBe(String(at.x));
    expect(dot.getAttribute("cy")).toBe(String(at.y));
  });

  test("asks the organization question in serif italic, ending in “?”, with its evidence", () => {
    renderLadder(gems, 2);

    const question = screen.getByTestId("gap-open-question").textContent ?? "";
    expect(question).toBe(gems.open.question);
    expect(question).toContain("the other 90%");
    expect(question.endsWith("?")).toBe(true);
    // DigiTech's own words are what make the question fair to ask in the room.
    expect(screen.getByTestId("gap-open-evidence").textContent).toContain(
      "AI adoption is not really adopted well",
    );
  });
});

describe("Berau", () => {
  test("renders NO MineTech marker — no chip, no leader, no dot", () => {
    renderLadder(berau, 4); // the fullest pose: if it were anywhere, it is here

    expect(berau.techFunction.kind).toBe("absent");
    expect(screen.queryByTestId("gap-marker-asserted")).toBeNull();
    expect(screen.queryByTestId("gap-leader-asserted")).toBeNull();
    expect(screen.queryByTestId("gap-dot-asserted")).toBeNull();
    // And nothing invented one under another name: exactly one mark on the
    // staircase, the open ring, plus the aside's own dot.
    expect(screen.queryAllByTestId("gap-mark-asserted")).toHaveLength(0);
    expect(screen.getAllByTestId("gap-mark-open")).toHaveLength(1);
  });

  test("states the absence as real copy, in the slot the chip would have used", () => {
    renderLadder(berau, 1);

    if (berau.techFunction.kind !== "absent") throw new Error("unreachable");
    const line = screen.getByTestId("gap-tech-absence");
    expect(line.textContent).toBe(berau.techFunction.line);
    // REAL COPY, not a placeholder (#16 finding 4): it names MineTech, it says
    // what was looked for, and it says the absence is the finding.
    expect(line.textContent).toContain("MineTech");
    expect(line.textContent).toContain("the finding");

    // THE SPACE IS NEVER LEFT BLANK, and it is the same space: the absence line
    // and the asserted chip share one slot, so a leader walking either deck looks
    // at the same rectangle. Asserted on the slot both fills sit inside, not on
    // two numbers — and the slot is the one box that is NOT the fill, which is why
    // it has a test id of its own.
    const slot = screen.getByTestId("gap-tech-slot");
    expect(slot).toContainElement(line);
    expect(slot.style.left).toBe(`${TECH_SLOT.left}px`);
    expect(slot.style.width).toBe(`${TECH_SLOT.width}px`);
    // And the slot carries no border of its own: one drawn here would put a box
    // around the absence line too, turning "we found nothing" into a claim.
    expect(slot.style.border).toBe("");
  });

  test("asks its own organization question — the training, not the tech function", () => {
    renderLadder(berau, 2);

    const question = screen.getByTestId("gap-open-question").textContent ?? "";
    expect(question).toBe(berau.open.question);
    expect(question).toContain("stop at the certificate");
    expect(screen.getByTestId("gap-open-evidence").textContent).toContain("382 trained");
    // NOT "382 leaders trained" — that word is the throwaway prototype's, and §6.5
    // says "382 trained". A headcount is exactly what a leader checks.
    expect(screen.getByTestId("gap-open-evidence").textContent).not.toContain("382 leaders");
  });

  test("closes on a line that does not claim a rung it has not claimed", () => {
    // The closer names what is ON the ladder, so it cannot be shared: GEMS has a
    // claim to contrast its question with and Berau does not, and the GEMS line
    // would be false here. This is why `closer` is on the brand axis at all.
    renderLadder(berau, 4);
    expect(screen.getByTestId("gap-closer").textContent).toBe(berau.closer);
    expect(berau.closer).not.toBe(gems.closer);
    expect(berau.closer).toContain("a question for this room");
  });
});

describe("the Nanovest mark", () => {
  test("sits on the L1–L2 riser under both brands, with no chip and no leader", () => {
    for (const [name, block] of [
      ["gems", gems],
      ["berau", berau],
    ] as const) {
      const { unmount } = renderLadder(block, 3);

      // ON THE RISER, which is what "L1–L2" honestly means on a staircase — the
      // prototype interpolated between tread centres and put this mark in mid-air.
      const dot = screen.getByTestId("gap-dot-aside");
      const at = anchorPoint({ on: "riser", below: 0 });
      expect(dot.getAttribute("cx"), name).toBe(String(at.x));
      expect(dot.getAttribute("cy"), name).toBe(String(at.y));
      expect(at.y).toBeGreaterThan(TREADS[1].y);
      expect(at.y).toBeLessThan(TREADS[0].y);

      expect(screen.getByTestId("gap-aside-label").textContent, name).toBe(C.aside.label);
      expect(C.aside.label, name).toContain("L1–L2");
      // Self-deprecating, and BRAND-INVARIANT: the admission only lands if it is
      // the same one in both rooms.
      expect(screen.getByTestId("gap-aside").textContent, name).toContain(
        "standing on its second rung too",
      );

      // A footnote, not a fifth marker: no chip border, and no leader of its own.
      expect(screen.getByTestId("gap-aside").style.border, name).toBe("");
      expect(screen.queryByTestId("gap-leader-aside"), name).toBeNull();

      unmount();
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
    const first = renderLadder(gems, 1);
    expect(screen.getByTestId("gap-marker-asserted")).toBeInTheDocument();
    first.unmount();

    renderLadder(berau, 1);
    expect(screen.queryByTestId("gap-marker-asserted")).toBeNull();
    expect(screen.getByTestId("gap-tech-absence")).toBeInTheDocument();
  });
});

// ── the poses ────────────────────────────────────────────────────────────────

describe("the five poses build the argument once each", () => {
  test("pose 0 draws the ladder and places nothing on it", () => {
    renderLadder(gems, 0);

    // The rungs and their provenance, and NO marks: this is the pose the room
    // reads the vocabulary in, before anyone is placed. A leader who places
    // themselves has self-diagnosed; one who is told argues with the next slide.
    expect(screen.getByTestId("gap-ladder-path")).toBeInTheDocument();
    expect(screen.getByTestId("gap-ladder-provenance")).toBeInTheDocument();
    expect(screen.queryByTestId("gap-mark-asserted")).toBeNull();
    expect(screen.queryByTestId("gap-mark-open")).toBeNull();
    expect(screen.queryByTestId("gap-dot-aside")).toBeNull();
  });

  test("each pose adds its own mark and keeps the ones before it", () => {
    renderLadder(gems, 0);

    // Walked inside ONE mounted tree, so a mark that survives only a fresh mount
    // — or a pose that clears one it should have kept — fails here.
    const revealed = (id: string) => screen.getByTestId(id).classList.contains("on");

    goToPose(1);
    expect(screen.getByTestId("gap-mark-asserted")).toBeInTheDocument();
    expect(revealed("gap-tech-slot")).toBe(true);
    expect(revealed("gap-marker-open")).toBe(false);

    goToPose(2);
    expect(screen.getByTestId("gap-mark-asserted")).toBeInTheDocument();
    expect(revealed("gap-tech-slot")).toBe(true);
    expect(revealed("gap-marker-open")).toBe(true);
    expect(revealed("gap-aside")).toBe(false);

    goToPose(3);
    expect(screen.getByTestId("gap-dot-aside")).toBeInTheDocument();
    expect(revealed("gap-aside")).toBe(true);
    expect(revealed("gap-closer")).toBe(false);

    goToPose(4);
    expect(revealed("gap-closer")).toBe(true);
    expect(screen.getByTestId("gap-closer").textContent).toBe(gems.closer);
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
    // motion budget is the staircase's one-shot path draw and the chips' reveals,
    // both of which are CSS and both of which the global rule already handles, so
    // there is nothing to gate. Asserted at every pose and under both brands
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
    // reached reveal at opacity 1, at all five poses under BOTH brands — is asserted
    // in a real engine by `scripts/gh53-verify.mjs --reduced`. Neither half alone is
    // the AC; both are run.
    renderLadder(gems, 0);
    expect(screen.getByTestId("gap-ladder-path")).toHaveClass("gap-ladder-draw");
    C.rungs.forEach((rung) => {
      expect(screen.getByTestId(`gap-rung-${rung.id}-name`).textContent, rung.id).not.toBe("");
    });

    goToPose(1);
    expect(screen.getByTestId("gap-asserted-source").textContent).not.toBe("");
    goToPose(2);
    expect(screen.getByTestId("gap-open-question").textContent).toBe(gems.open.question);
    goToPose(3);
    expect(screen.getByTestId("gap-aside-label").textContent).toBe(C.aside.label);
    goToPose(4);
    expect(screen.getByTestId("gap-closer").textContent).toBe(gems.closer);
  });
});

// ── the copy rule §6.5's build rules state, checked over the copy ────────────

describe("keywords go on prose only", () => {
  /** Labels, never sentences. A copper italic inside any of these reads as a
   *  rendering fault, so none of them has a `*Kw` sibling to begin with — this
   *  holds that they never gain one by carrying a highlight-shaped string. */
  const LABELS: readonly string[] = [
    C.provenance,
    C.aside.label,
    ...C.rungs.flatMap((r) => [r.level, r.title, r.sub]),
    ...REGISTERED_BRANDS.flatMap((brand) => {
      const block = capabilityLadderFor(brand);
      return [
        block.open.label,
        ...(block.techFunction.kind === "asserted"
          ? [block.techFunction.marker.label, block.techFunction.marker.source]
          : []),
      ];
    }),
  ];

  test("no mono label, rung name or source is rendered through the highlighter", () => {
    // Rendered check, not an authored one: `<em class="kw">` is what a highlight
    // IS on the stage, so this reads the DOM for one inside any of those runs.
    for (const block of [gems, berau]) {
      const { unmount } = renderLadder(block, 4);
      const labelBoxes = [
        "gap-ladder-provenance",
        "gap-aside-label",
        "gap-open-label",
        ...C.rungs.flatMap((r) => [`gap-rung-${r.id}-name`, `gap-rung-${r.id}-sub`]),
        ...(block.techFunction.kind === "asserted"
          ? ["gap-asserted-label", "gap-asserted-source"]
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
      C.provenance,
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
            ? [block.techFunction.marker.label, block.techFunction.marker.source]
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
