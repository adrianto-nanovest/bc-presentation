// THE AGENTIC ORGANIZATION · slide tests. Both poses, all three brands.
//
// WHAT THIS FILE CAN AND CANNOT PROVE. jsdom has no layout, so nothing here
// measures a pixel a browser would place — every geometric claim is asserted as
// the ONE NUMBER both sides read (`../../src/slides/leader-shape/geometry.ts`),
// and the rendered composition is walked at 1280×720 in a real engine separately.
// What jsdom is good for is the two things this slide is actually at risk of:
//
//   1. THE FLOOR. §7.1 recorded one open risk against variant A — the lowest
//      pillar sits close to the NavBar's hover band and GROWS on focus. The
//      prototype's numbers put it 26px inside the band. That is arithmetic, and
//      arithmetic is checkable here.
//   2. PRE-DIMMING. §7.1: attention is bought with added light, never subtracted.
//      At rest all six pillars must carry the same full border and the same
//      full-strength label, and the cheapest way to break that is to reach for
//      the prototype's three-tier ranking, which only makes sense once the focus
//      walk exists. Six identical style objects is exactly what jsdom can read.
//
// ALL THREE BRANDS IN ONE EPOCH. The component reads no `VARIANT` — the slide file
// resolves the hub's brand line once at module scope and hands it down as a prop
// (§4.4 slot 5) — so three hubs mount side by side in this one module registry. A
// test that had to re-point `window.location` per brand could not compare them.
import { act, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { useDeck } from "@/deck/DeckContext";
import { SlideHarness } from "../support/slide-harness";
import {
  ShapeAgenticOrg,
  shapeAgenticOrgSlide,
} from "@/slides/leader-shape/shape-agentic-org";
import { hubBrandLineFor, shapeOrgContent } from "@/slides/leader-shape/content";
// Imported for ONE test — the figure takes its pose as a prop, so it can be asked
// about a pose the slide's own step count cannot reach. Everything else here goes
// through the slide, because that is what the deck renders.
import { PillarOrbit } from "@/slides/leader-shape/components/PillarOrbit";
import {
  FIGURE_CEILING,
  FOCUS_GROWTH_RESERVE,
  HUB,
  KICKER_TOP,
  LOWEST_PILLAR_BOTTOM,
  LOWEST_PILLAR_INDEX,
  NAV_ZONE_CLEARANCE,
  NAV_ZONE_TOP,
  PILLAR_BOX,
  PILLAR_CENTRES,
  PILLAR_COUNT,
  RING,
  SIDE_MARGIN,
  SPOKE_STANDOFF,
  WALK_COLUMN_LEFT,
  pillarBox,
  pillarCentre,
  spokeSegment,
} from "@/slides/leader-shape/geometry";
import { BRANDS, type Brand } from "@/deck-variants";

const C = shapeOrgContent;
const POSES = [0, 1] as const;

/**
 * The position the slide holds in the deck it actually composes into.
 *
 * `at` IS required here, and it is the one case `SlideHarness` documents: unit
 * tests resolve the default `general` deck, `general` has no leader variant, and
 * this slide reaches the two leader deck sets ALONE. So there is no derived
 * position to look up — which is itself the fact the composed-pair test at the
 * bottom of this file proves, from a deck that does run it.
 */
const AT = { letter: "C", num: 1, sectionKey: "shape" } as const;

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

function renderOrg(brandLine: string | null, pose = 0) {
  const out = render(
    <SlideHarness def={shapeAgenticOrgSlide} at={AT}>
      <Nav />
      <ShapeAgenticOrg brandLine={brandLine} />
    </SlideHarness>,
  );
  if (pose > 0) goToPose(pose);
  return out;
}

function goToPose(pose: number) {
  act(() => screen.getByTestId(`goto-${pose}`).click());
}

const gems = hubBrandLineFor("gems");
const berau = hubBrandLineFor("berau");

/**
 * Every brand the app REGISTERS, from `BRANDS` and not from the slide's own
 * table — which is why that table is not exported. A rule held over the keys of
 * the thing being checked proves the thing equals itself; held over `BRANDS` it
 * proves the pick answers for every brand that can actually reach a deck.
 */
const REGISTERED_BRANDS = Object.keys(BRANDS) as Brand[];

/** The tiers that count as "full strength" for a label — everything at or above
 *  `--neutral-200`. gh#50's floor is `--neutral-300`, so a label resting ON the
 *  floor is not full strength: it is a label with nothing left to lose. */
const FULL_LABEL_TIERS = [
  "var(--neutral-0)",
  "var(--neutral-50)",
  "var(--neutral-100)",
  "var(--neutral-200)",
];

/** Copper tiers dark enough to read as "not yet" on a near-black stage. A resting
 *  pillar may not use one: at rest there is no walk to have skipped it. */
const DIM_COPPER_TIERS = ["copper-700", "copper-800", "copper-900", "copper-950"];

// ── the def ──────────────────────────────────────────────────────────────────

describe("the slide def", () => {
  test("is the file's basename, TWO steps, closing on the fullest pose", () => {
    // The id is the basename (`deck-slide-ids.test.ts` owns the rule; this pins
    // the value).
    expect(shapeAgenticOrgSlide.id).toBe("shape-agentic-org");
    // TWO, not §7.1's nine. The six-beat focus walk and the closer are the NEXT
    // ticket, and the copy for them is deliberately unwritten — see the list at
    // the top of `src/slides/leader-shape/content.ts`. A `steps: 9` shipped now
    // would be seven blank poses in front of a room.
    expect(shapeAgenticOrgSlide.steps).toBe(2);
    // The exports print `canonicalPose` and nothing else, so a canonical pose
    // short of the last one would ship a PDF of a hub with no organisation
    // around it.
    expect(shapeAgenticOrgSlide.canonicalPose).toBe(1);
    expect(shapeAgenticOrgSlide.canonicalPose).toBe(shapeAgenticOrgSlide.steps - 1);
    expect(shapeAgenticOrgSlide.sectionKey).toBe("shape");
    expect(shapeAgenticOrgSlide.animationMode).toBe("step-reveal");
    expect(shapeAgenticOrgSlide.surface).toBe("dark");
  });
});

// ── the hub, and the one axis it varies on (§4.4 slot 5) ─────────────────────

describe("the hub", () => {
  test("says “The Enabler” in that casing, and shouts it through CSS", () => {
    renderOrg(gems);

    // THE STRING IS TITLE CASE AND THE GLYPHS ARE NOT. The issue's AC, the spec
    // and this test all quote "The Enabler", so the data holds that and the mono
    // LABEL register uppercases it at render — which means `textContent` stays
    // quotable while the stage still reads THE ENABLER.
    const label = screen.getByTestId("shape-hub-label");
    expect(label.textContent).toBe("The Enabler");
    expect(C.hubLabel).toBe("The Enabler");
    expect(label.style.textTransform).toBe("uppercase");
    expect(label.style.fontFamily).toBe("var(--mono)");
  });

  test("names DigiTech under gems and MineTech under berau — in one epoch", () => {
    // THE ACTUAL CHECK behind "no component reads VARIANT", and the reason it
    // matters: if anything below the slide read `VARIANT` itself, both of these
    // renders would show the same brand, because one module epoch holds one
    // variant. The slide file resolves the line once and passes it down.
    expect(gems).toBe("DigiTech");
    expect(berau).toBe("MineTech");

    const first = renderOrg(gems);
    expect(screen.getByTestId("shape-hub-brand-line").textContent).toBe("DigiTech");
    expect(screen.getByTestId("shape-hub").textContent).toContain("The Enabler");
    first.unmount();

    renderOrg(berau);
    expect(screen.getByTestId("shape-hub-brand-line").textContent).toBe("MineTech");
    expect(screen.getByTestId("shape-hub").textContent).toContain("The Enabler");
  });

  test("prints NO second line where the deck names no organisation", () => {
    // `general` has no leader variant registered, so no composed deck asks for
    // this — and the honest answer is still not an empty string. An empty line
    // inside the disc reads as a slide that did not finish rendering; a
    // placeholder name would be an invented organisation at the centre of the
    // deck's centrepiece. So the element is ABSENT, and the hub prints its label
    // alone.
    expect(hubBrandLineFor("general")).toBeNull();

    renderOrg(hubBrandLineFor("general"), 1);
    expect(screen.queryByTestId("shape-hub-brand-line")).toBeNull();
    expect(screen.getByTestId("shape-hub-label").textContent).toBe("The Enabler");
    // And nothing invented one under another name: the disc holds exactly the
    // label.
    expect(screen.getByTestId("shape-hub").textContent).toBe("The Enabler");
  });

  test("is present from pose 0, because pose 0 IS the hub", () => {
    renderOrg(berau, 0);
    expect(screen.getByTestId("shape-hub")).toBeInTheDocument();
    expect(screen.getByTestId("shape-hub-brand-line")).toBeInTheDocument();
    // The kicker stands with it, and keeps standing at pose 1 — it is true at
    // both poses, so it does not spend one.
    expect(screen.getByTestId("shape-kicker").textContent).toBe(C.kicker);
    goToPose(1);
    expect(screen.getByTestId("shape-kicker").textContent).toBe(C.kicker);
  });

  test("resolves through a typed pick over every registered brand", () => {
    // A `Record<Brand, …>`, so a fourth brand fails to COMPILE rather than
    // silently showing one organisation another's name. Walked here as a value
    // too, so `general` — which reaches no deck — is held to the same rules.
    expect([...REGISTERED_BRANDS].sort()).toEqual(["berau", "gems", "general"]);
    for (const brand of REGISTERED_BRANDS) {
      const line = hubBrandLineFor(brand);
      expect(hubBrandLineFor(brand), brand).toBe(line);
      // Either a real name or a stated absence — never an empty or blank string,
      // which is the one value that renders as a fault.
      if (line !== null) expect(line.trim(), brand).not.toBe("");
    }
  });
});

// ── the six pillars ──────────────────────────────────────────────────────────

describe("the six pillars", () => {
  test("are HR p4's six, verbatim, in the walk's teaching order", () => {
    renderOrg(gems, 1);

    // SIX, from the geometry's own count rather than a literal here: the labels
    // and the ring centres are the same six, and a seventh pillar would have no
    // point to sit on (`pillarCentre` throws rather than wrapping it onto the
    // first — see the geometry tests below).
    expect(C.pillars).toHaveLength(PILLAR_COUNT);
    expect(new Set(C.pillars.map((p) => p.id)).size).toBe(PILLAR_COUNT);

    // THE ORDER IS THE WALK'S, NOT HR p4's PRINTED ORDER, and it is asserted so
    // that "the owner approved variant A including this order" survives a
    // reviewer who checks the labels against the HR deck and re-sorts them. The
    // next ticket's six focus beats index this array.
    expect(C.pillars.map((p) => p.label)).toEqual([
      "Governance & Policies",
      "Tools & Platform",
      "People & Mindset",
      "Strategy & Leadership",
      "Process & Methodology",
      "AI Companions",
    ]);

    // Read back out of the DOM: all six labels on the stage at pose 1, each in
    // its own box.
    C.pillars.forEach((pillar) => {
      expect(
        screen.getByTestId(`shape-pillar-${pillar.id}-label`).textContent,
        pillar.id,
      ).toBe(pillar.label);
    });
  });

  test("each renders an icon the shim actually has", () => {
    renderOrg(gems, 1);

    // THE HALF THE `PillarIcon` UNION CANNOT PROVE. A name can be spelled right,
    // pass the type, and still be missing from the shim's map — which renders
    // nothing at all and reads on a six-icon ring as a pillar that did not load.
    // So this counts the SVGs.
    C.pillars.forEach((pillar) => {
      const icon = screen.getByTestId(`shape-pillar-${pillar.id}-icon`);
      expect(icon.querySelectorAll("svg"), `${pillar.id} · ${pillar.icon}`).toHaveLength(1);
    });
  });

  test("sit on their own ring point, box centred on it", () => {
    renderOrg(gems, 1);

    // Structural, because jsdom places nothing: each box reads its own centre,
    // so a box and its spoke cannot disagree about where the pillar is.
    C.pillars.forEach((pillar, i) => {
      const box = screen.getByTestId(`shape-pillar-${pillar.id}`);
      expect(box.style.left, pillar.id).toBe(`${pillarCentre(i).x}px`);
      expect(box.style.top, pillar.id).toBe(`${pillarCentre(i).y}px`);
      expect(box.style.width, pillar.id).toBe(`${PILLAR_BOX.w}px`);
      expect(box.style.height, pillar.id).toBe(`${PILLAR_BOX.h}px`);
      // The centring translate is what makes `left`/`top` a CENTRE, and the
      // scale rides on the same transform.
      expect(box.style.transform, pillar.id).toContain("translate(-50%, -50%)");
    });
  });
});

// ── nothing is pre-dimmed (§7.1) ─────────────────────────────────────────────

describe("at rest, all six pillars carry full light", () => {
  // "Attention is bought with added light, never subtracted." At the resting pose
  // there is no walk, so there is nothing for a dim tier to mean — and the
  // cheapest way to break this is to port the prototype's three-tier ranking,
  // which only makes sense once the focus walk exists.
  beforeEach(() => renderOrg(berau, 1));

  test("with the same border, at the same opacity — no ranking of any kind", () => {
    const boxes = C.pillars.map((p) => screen.getByTestId(`shape-pillar-${p.id}`));

    const borders = new Set(boxes.map((b) => b.style.border));
    expect(borders.size, `borders: ${[...borders].join(" | ")}`).toBe(1);

    const [border] = [...borders];
    expect(border).toContain("solid");
    expect(border).toContain("var(--copper-");
    // NOT one of the dark tiers. A `--copper-800` border is the prototype's
    // "not visited yet", and at this pose nothing has been visited.
    DIM_COPPER_TIERS.forEach((tier) => expect(border, tier).not.toContain(tier));

    // FULLY OPAQUE, all six. Opacity on this slide means "not revealed yet",
    // which is time — so a pillar left at 0.6 would be a pillar ranked by the
    // one channel that must never carry rank.
    boxes.forEach((box, i) => expect(box.style.opacity, C.pillars[i].id).toBe("1"));
  });

  test("with the same label tier, and a full-strength one", () => {
    const colors = new Set(
      C.pillars.map((p) => screen.getByTestId(`shape-pillar-${p.id}-label`).style.color),
    );
    expect(colors.size, `label tiers: ${[...colors].join(" | ")}`).toBe(1);
    const [color] = [...colors];
    expect(FULL_LABEL_TIERS, `label tier ${color}`).toContain(color);
  });

  test("and the same spoke — one stroke, one width, no thickened one", () => {
    const spokes = C.pillars.map((p) => screen.getByTestId(`shape-spoke-${p.id}`));
    expect(new Set(spokes.map((s) => s.style.stroke)).size).toBe(1);
    expect(new Set(spokes.map((s) => s.style.strokeWidth)).size).toBe(1);
    expect(new Set(spokes.map((s) => s.style.opacity))).toEqual(new Set(["1"]));

    // THROUGH `style`, NOT THROUGH THE PRESENTATION ATTRIBUTE. `var()` only
    // resolves in CSS properties, so `stroke="var(--copper-600)"` as an attribute
    // is a black line on a black stage — the prototype's one hard-won line, and a
    // refactor that "tidies" it back into attributes loses all six spokes
    // silently.
    spokes.forEach((spoke, i) => {
      expect(spoke.style.stroke, C.pillars[i].id).toContain("var(--copper-");
      expect(spoke.hasAttribute("stroke"), C.pillars[i].id).toBe(false);
      expect(spoke.hasAttribute("stroke-width"), C.pillars[i].id).toBe(false);
    });
  });
});

// ── the two poses ────────────────────────────────────────────────────────────

describe("the two poses build the argument once each", () => {
  test("pose 0 is the hub alone — the six have not arrived", () => {
    renderOrg(gems, 0);

    // Mounted but not revealed: the boxes and spokes hold the ring's geometry
    // from the first frame so nothing reflows when they arrive, and opacity is
    // what says "not yet".
    C.pillars.forEach((pillar) => {
      expect(
        screen.getByTestId(`shape-pillar-${pillar.id}`).style.opacity,
        pillar.id,
      ).toBe("0");
      expect(
        screen.getByTestId(`shape-spoke-${pillar.id}`).style.opacity,
        pillar.id,
      ).toBe("0");
    });
  });

  test("pose 1 brings all six in, inside one mounted tree", () => {
    renderOrg(gems, 0);
    goToPose(1);

    // Walked rather than re-mounted, so a pose that only works from a fresh
    // mount fails here.
    C.pillars.forEach((pillar) => {
      expect(
        screen.getByTestId(`shape-pillar-${pillar.id}`).style.opacity,
        pillar.id,
      ).toBe("1");
      expect(
        screen.getByTestId(`shape-spoke-${pillar.id}`).style.opacity,
        pillar.id,
      ).toBe("1");
    });
  });

  test("and there is no third pose hiding in the render", () => {
    // The step budget grows to nine in the NEXT ticket. Nothing here may already
    // react to a pose this slide cannot reach — a panel keyed on `pose >= 2` is
    // dead copy with a trigger attached, which is the exact hazard `content.ts`
    // refuses.
    //
    // Asserted by handing the figure a pose the DECK CANNOT PRODUCE (`steps: 2`
    // clamps at 1), which is why this one render goes to the component directly
    // instead of through the harness: the slide's own step state can never reach
    // 2, so walking it could never ask the question.
    const one = render(<PillarOrbit brandLine={gems} pose={1} />);
    const atPoseOne = one.container.innerHTML;
    one.unmount();

    const two = render(<PillarOrbit brandLine={gems} pose={2} />);
    expect(two.container.innerHTML).toBe(atPoseOne);
    // And at pose 9 — §7.1's finished step budget — still nothing extra.
    two.unmount();
    expect(render(<PillarOrbit brandLine={gems} pose={9} />).container.innerHTML).toBe(
      atPoseOne,
    );
  });
});

// ── the panel §6.6 refuses ───────────────────────────────────────────────────

describe("Specify → Generate → Verify appears nowhere", () => {
  test("at either pose, under any brand", () => {
    // §6.6 DROPS the HR original's panel — C.4 (leader F.4) already does it
    // better — and the freed space is what the next ticket's focus walk is spent
    // on. It is refused, not pending, and this is the assertion that says so out
    // loud so nobody re-adds it as "the bit that's missing".
    for (const brandLine of [gems, berau, hubBrandLineFor("general")]) {
      for (const pose of POSES) {
        const { unmount } = renderOrg(brandLine, pose);
        const text = document.body.textContent ?? "";
        // POSITIVE CONTROL FIRST. Every assertion below is a `not.toMatch` over
        // this one string, so an empty stage would pass all of them.
        expect(text, `pose ${pose}`).toContain(C.headline);
        expect(text, `pose ${pose}`).toContain("The Enabler");

        for (const word of [/\bspecify\b/i, /\bgenerate\b/i, /\bverify\b/i]) {
          expect(text, `pose ${pose} · ${word}`).not.toMatch(word);
        }
        unmount();
      }
    }
  });
});

// ── the geometry, on its own terms ───────────────────────────────────────────

describe("the ring geometry", () => {
  // ASSERTED AS INDEPENDENT INVARIANTS, not by calling the thing being checked.
  // The renderer reads `PILLAR_CENTRES` and `spokeSegment`, so a test that
  // expects `spokeSegment(i)` and renders `spokeSegment(i)` passes on any return
  // value at all — including a coordinate off the figure, which is precisely the
  // class of bug this module was rewritten to fix. These are properties a ring
  // has.

  test("six points, evenly spaced on the ellipse, starting at twelve o'clock", () => {
    expect(PILLAR_CENTRES).toHaveLength(PILLAR_COUNT);

    PILLAR_CENTRES.forEach((p, i) => {
      // ON the ellipse: the normalised radius is 1 for every point.
      const r = ((p.x - HUB.x) / RING.rx) ** 2 + ((p.y - HUB.y) / RING.ry) ** 2;
      expect(r, `pillar ${i} is on the ellipse`).toBeCloseTo(1, 10);
    });

    // Index 0 is the top of the ring, which is what makes the walk step AROUND
    // the ring rather than jump across it.
    expect(PILLAR_CENTRES[0].x).toBe(HUB.x);
    expect(PILLAR_CENTRES[0].y).toBeLessThan(HUB.y);

    // Evenly spaced, read as the symmetry that spacing produces: the ring
    // mirrors about the hub's vertical axis, and the two pairs share a y.
    expect(PILLAR_CENTRES[3].x).toBe(HUB.x);
    expect(PILLAR_CENTRES[3].y).toBeGreaterThan(HUB.y);
    expect(PILLAR_CENTRES[1].x - HUB.x).toBeCloseTo(HUB.x - PILLAR_CENTRES[5].x, 10);
    expect(PILLAR_CENTRES[2].x - HUB.x).toBeCloseTo(HUB.x - PILLAR_CENTRES[4].x, 10);
    expect(PILLAR_CENTRES[1].y).toBeCloseTo(PILLAR_CENTRES[5].y, 10);
    expect(PILLAR_CENTRES[2].y).toBeCloseTo(PILLAR_CENTRES[4].y, 10);
  });

  test("every box clears the header and stays out of the reserved column", () => {
    // The horizontal budget and the ceiling half of the vertical one, held as
    // numbers rather than prose.
    for (let i = 0; i < PILLAR_COUNT; i++) {
      const box = pillarBox(i);
      expect(box.left, `pillar ${i} left margin`).toBeGreaterThanOrEqual(SIDE_MARGIN);
      // The right column is the next ticket's walk panel. The figure has to fit
      // between the margin and that edge, and this is the assertion that stops a
      // "let's widen the ring" edit from taking the panel's space.
      expect(box.right, `pillar ${i} clears the walk column`).toBeLessThanOrEqual(
        WALK_COLUMN_LEFT,
      );
      expect(box.top, `pillar ${i} clears the kicker`).toBeGreaterThanOrEqual(
        FIGURE_CEILING,
      );
      expect(FIGURE_CEILING).toBeGreaterThan(KICKER_TOP);
    }
  });

  test("the lowest pillar clears the NavBar hover band, with the walk's growth paid for", () => {
    // §7.1's ONE RECORDED RISK, as arithmetic. The band's top edge is 632 —
    // `.nav-zone` is `bottom: 0; height: 88px` — and the prototype's numbers put
    // the lowest box bottom at 658, i.e. 26px inside it.
    expect(NAV_ZONE_TOP).toBe(720 - 88);

    // WHICH pillar is lowest is derived, not assumed, so re-cutting the ring
    // moves the budget with it.
    const lowest = PILLAR_CENTRES.reduce(
      (acc, p, i) => (p.y > PILLAR_CENTRES[acc].y ? i : acc),
      0,
    );
    expect(LOWEST_PILLAR_INDEX).toBe(lowest);
    expect(LOWEST_PILLAR_BOTTOM).toBe(PILLAR_CENTRES[lowest].y + PILLAR_BOX.h / 2);

    // The clearance is asserted against the CONSTANT and its derivation, so a
    // later edit that lowers the ellipse fails here instead of silently
    // re-entering the band.
    expect(NAV_ZONE_CLEARANCE).toBe(NAV_ZONE_TOP - LOWEST_PILLAR_BOTTOM);
    expect(LOWEST_PILLAR_BOTTOM).toBeLessThan(NAV_ZONE_TOP);

    // AND IT MUST STILL CLEAR ONCE THE WALK GROWS IT. The focused pillar gains a
    // scale and a halo (§7.1), which is the next ticket's work — the HEADROOM for
    // it is this ticket's, because a resting figure measured to the pixel against
    // the wrong pose passes review and fails on a projector one ticket later.
    expect(NAV_ZONE_CLEARANCE).toBeGreaterThan(FOCUS_GROWTH_RESERVE);
    expect(LOWEST_PILLAR_BOTTOM + FOCUS_GROWTH_RESERVE).toBeLessThanOrEqual(NAV_ZONE_TOP);
  });

  test("refuses a pillar the ring does not have, rather than wrapping it", () => {
    // A seventh pillar folded onto the first renders as five pillars and one that
    // looks emphasised — the state §7.1 forbids at rest, arriving by accident.
    expect(() => pillarCentre(PILLAR_COUNT)).toThrow(/no pillar/);
    expect(() => pillarCentre(-1)).toThrow(/no pillar/);
    expect(() => spokeSegment(PILLAR_COUNT)).toThrow(/no pillar/);
  });

  test("every spoke runs box edge → disc edge, and none of them is NaN", () => {
    for (let i = 0; i < PILLAR_COUNT; i++) {
      const spoke = spokeSegment(i);
      const box = pillarBox(i);
      const centre = pillarCentre(i);

      // NO NaN. Pillars 0 and 3 sit exactly above and below the hub, where the
      // horizontal box crossing is at infinity — two of six spokes, and the
      // guard that keeps that term out of the `min` is the only thing between
      // this figure and two missing lines.
      for (const v of [spoke.x1, spoke.y1, spoke.x2, spoke.y2]) {
        expect(Number.isFinite(v), `spoke ${i} is finite`).toBe(true);
      }

      // The pillar end is OUTSIDE its own box, by the standoff, measured along
      // the ray — so the spoke is not drawn under the box that hides it.
      const insideBox =
        spoke.x1 > box.left &&
        spoke.x1 < box.right &&
        spoke.y1 > box.top &&
        spoke.y1 < box.bottom;
      expect(insideBox, `spoke ${i} starts outside its box`).toBe(false);

      // The hub end is OUTSIDE the disc, by the same standoff — exactly, because
      // that end is measured on a circle and not on a rectangle.
      const fromHub = Math.hypot(spoke.x2 - HUB.x, spoke.y2 - HUB.y);
      expect(fromHub, `spoke ${i} stops clear of the disc`).toBeCloseTo(
        HUB.r + SPOKE_STANDOFF,
        10,
      );

      // And it points AT the hub: the pillar end is farther from the hub than the
      // hub end is, and both ends lie on the segment between them.
      expect(
        Math.hypot(spoke.x1 - HUB.x, spoke.y1 - HUB.y),
        `spoke ${i} runs inward`,
      ).toBeGreaterThan(fromHub);
      expect(
        Math.hypot(spoke.x1 - centre.x, spoke.y1 - centre.y),
        `spoke ${i} leaves its own pillar`,
      ).toBeGreaterThan(0);
    }
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

  test("mounts zero SMIL nodes at every pose, under every brand", () => {
    // ZERO BY CONSTRUCTION, and that is the decision this asserts rather than a
    // happy accident. SMIL is invisible to the global reduced-motion rule in
    // `globals.css` — it squashes CSS animations and transitions only — so a SMIL
    // node has to be gated at mount, as E.12 gates its `<animateMotion>`. This
    // slide's whole motion budget is CSS transitions on a pose change, which that
    // rule already handles, so there is nothing to gate. Asserted at every pose
    // and under every brand because the cheapest way to break it is to reach for
    // `<animate>` on one spoke in one pose.
    for (const brandLine of [gems, berau, hubBrandLineFor("general")]) {
      for (const pose of POSES) {
        const { unmount } = renderOrg(brandLine, pose);
        for (const tag of ["animate", "animateTransform", "animateMotion", "set"]) {
          expect(
            document.querySelectorAll(tag),
            `pose ${pose} · <${tag}>`,
          ).toHaveLength(0);
        }
        unmount();
      }
    }
  });

  test("both poses render complete — every string the pose has reached is there", () => {
    // WHAT THIS CAN AND CANNOT SAY. jsdom runs no transition, so "the pillars rest
    // on their finished frame" is not checkable here — a computed opacity mid
    // transition is nothing jsdom computes. This test therefore claims only the
    // DOM half: at each pose every element that pose has reached is mounted with
    // its copy and its resting style. The computed half is checked in a real
    // engine.
    renderOrg(berau, 0);
    expect(screen.getByTestId("shape-kicker").textContent).toBe(C.kicker);
    expect(screen.getByTestId("shape-hub-label").textContent).toBe("The Enabler");
    expect(screen.getByTestId("shape-hub-brand-line").textContent).toBe("MineTech");

    goToPose(1);
    C.pillars.forEach((pillar) => {
      expect(
        screen.getByTestId(`shape-pillar-${pillar.id}-label`).textContent,
        pillar.id,
      ).toBe(pillar.label);
      expect(
        screen.getByTestId(`shape-pillar-${pillar.id}`).style.opacity,
        pillar.id,
      ).toBe("1");
    });
  });
});

// ── the copy rules, checked over the copy ────────────────────────────────────

describe("keywords go on prose only", () => {
  /** Labels, never sentences. A copper italic inside any of these reads as a
   *  rendering fault, so none of them has a `*Kw` sibling to begin with — this
   *  holds that they never gain one by carrying a highlight-shaped string. */
  const LABELS: readonly string[] = [
    C.figLabel,
    C.kicker,
    C.hubLabel,
    ...C.pillars.map((p) => p.label),
  ];

  test("no label, kicker or pillar name is rendered through the highlighter", () => {
    // Rendered check, not an authored one: `<em class="kw">` is what a highlight
    // IS on the stage, so this reads the DOM for one inside any of those runs.
    renderOrg(gems, 1);
    const labelBoxes = [
      "shape-kicker",
      "shape-hub-label",
      "shape-hub-brand-line",
      ...C.pillars.map((p) => `shape-pillar-${p.id}-label`),
    ];
    for (const id of labelBoxes) {
      expect(screen.getByTestId(id).querySelectorAll("em"), id).toHaveLength(0);
    }
    // And the labels carry no stray markup of their own.
    LABELS.forEach((label) => expect(label).not.toContain("<em"));
  });

  test("the headline's keyword is a substring of the headline", () => {
    // A keyword that does not occur is a highlight that silently does nothing —
    // the copy still reads, so nothing on the stage says the emphasis was lost.
    C.headlineKw.forEach((word) => expect(C.headline).toContain(word));
    // And the highlight lands: the headline is this slide's one line of prose, so
    // it is also the one place an `<em>` belongs.
    renderOrg(gems, 1);
    expect(document.querySelectorAll("h1 em").length).toBeGreaterThan(0);
  });

  test("no authored string names a section letter", () => {
    // §3.4 R2. This slide is C.1 today and the `shape` run moves again as the
    // rest of Phase 6 lands, so a literal "C.1" or "SECTION C" anywhere in this
    // copy would be a lie on a projector within the week.
    const authored = [
      ...LABELS,
      C.headline,
      ...REGISTERED_BRANDS.map((brand) => hubBrandLineFor(brand) ?? ""),
    ];

    authored.forEach((copy) => {
      expect(copy).not.toMatch(/\bSECTIONS?\s+[A-N]\b/i);
      // A bare figure reference — `C.1`, `G.12`.
      expect(copy).not.toMatch(/\b[A-N]\.\d+\b/);
    });
  });

  test("and no figure-shaped literal reaches the DOM except the derived one", () => {
    // THE RENDERED HALF of the same rule. `FigLabel` prints one figure reference
    // and it comes from the composed deck through `SlideNumberContext` — the
    // harness's `at` supplies it here. So: strip that one element and nothing of
    // that shape may be left, which is what catches a letter written into a
    // component rather than into the content module.
    const { container } = renderOrg(gems, 1);
    expect(
      container.querySelector(".fig-label")?.textContent,
      "the derived reference is there to strip",
    ).toContain(`${AT.letter}.${AT.num}`);

    // Stripped from a CLONE, not from the live tree: React owns those nodes and
    // removing one behind its back throws on the next commit.
    const stripped = container.cloneNode(true) as HTMLElement;
    stripped.querySelector(".fig-label")?.remove();
    expect(stripped.textContent ?? "").not.toMatch(/\b[A-N]\.\d+\b/);
    // The label itself is still authored, and still letter-free.
    expect(C.figLabel).toBe("THE AGENTIC ORGANIZATION");
  });
});

// ── the composed pair (§4.3 C.1 → C.2) ───────────────────────────────────────

describe("the composed leader deck", () => {
  // A LEADER EPOCH, loaded dynamically. `VARIANT` resolves at module scope, so
  // reading the leader deck means re-pointing `window.location` and resetting the
  // registry — which is why this describe uses no `SlideHarness` (see that file's
  // "ONE EPOCH" note) and compares slides by id rather than by identity.
  const realLocation = window.location;

  afterEach(() => {
    Object.defineProperty(window, "location", {
      configurable: true,
      writable: true,
      value: realLocation,
    });
  });

  async function leaderDeck(variant: string) {
    Object.defineProperty(window, "location", {
      configurable: true,
      writable: true,
      value: new URL(`http://localhost:5173/?variant=${variant}`),
    });
    vi.resetModules();
    const { composedDeck } = await import("@/deck/registry");
    return composedDeck;
  }

  test("puts f8-your-agentic-os immediately behind this slide, both in `shape`", async () => {
    for (const variant of ["berau-leader", "gems-leader"]) {
      const deck = await leaderDeck(variant);
      const i = deck.slides.findIndex((s) => s.def.id === "shape-agentic-org");
      expect(i, `${variant} composes shape-agentic-org`).toBeGreaterThan(-1);

      const c1 = deck.slides[i];
      const c2 = deck.slides[i + 1];
      // §4.3's C.2, relocated out of the cut F section by the deck set's single
      // `sectionOverrides` entry. ADJACENT AND IN THE SAME RUN: the move and the
      // override are one edit, because either half alone gives one key two runs
      // and throws (R4).
      expect(c2?.def.id, variant).toBe("f8-your-agentic-os");
      expect(c1.sectionKey, variant).toBe("shape");
      expect(c2.sectionKey, variant).toBe("shape");

      // And the run gets letter C. The COMPOSER derives that, from `opening` and
      // `gap` being the two runs in front of it; no slide file authors it. These
      // four lines PIN what the composer produces, deliberately as literals —
      // recomputing the expectation from `composeDeck` would assert only that the
      // composer agrees with itself, and the failure worth catching here is the
      // composer quietly producing a different letter after a list edit.
      expect(c1.letter, variant).toBe("C");
      expect(c2.letter, variant).toBe("C");
      expect(c1.num, variant).toBe(1);
      expect(c2.num, variant).toBe(2);
      expect(deck.letterOf("shape"), variant).toBe("C");

      // ONE `shape` RUN, not two: the whole reason the override value had to flip
      // in the same edit that moved the row.
      const shapeRun = deck.slides.filter((s) => s.sectionKey === "shape");
      expect(shapeRun.map((s) => s.def.id), variant).toEqual([
        "shape-agentic-org",
        "f8-your-agentic-os",
      ]);
    }
  });

  test("leaves the standard deck untouched — no `shape` run at all", async () => {
    for (const variant of ["berau-middle-mgmt", "gems-middle-mgmt", "general"]) {
      const deck = await leaderDeck(variant);
      expect(deck.slides.some((s) => s.def.id === "shape-agentic-org"), variant).toBe(
        false,
      );
      expect(deck.letterOf("shape"), variant).toBeUndefined();
      // f8 is back where it was authored, inside `techniques`.
      const f8 = deck.slides.find((s) => s.def.id === "f8-your-agentic-os");
      expect(f8?.sectionKey, variant).toBe("techniques");
    }
  });
});
