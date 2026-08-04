// K.2 (GEMS) — part 2 is THE ANALYST, not Two Tracks (gh#26).
//
// GEMS runs one track, so `Two Tracks` is wrong on the facts, not merely
// off-tone. Two properties a rendering test alone cannot show are asserted
// directly on the content:
//   - parts 1, 3 and 4 are the SAME OBJECTS as the shared spine, so a copy-edit
//     to The Case or The Outputs cannot drift between brands;
//   - the word "track" appears in no string GEMS can see — the reason the
//     override exists at all.
import { act, render, screen } from "@testing-library/react";
import { SlideHarness } from "../support/slide-harness";
import { k2Content, k2GemsContent } from "@/slides/reveal-and-closing/content";
import { k2Slide } from "@/slides/reveal-and-closing/k2-practice-lab-overview";
import { k2GemsSlide } from "@/slides/reveal-and-closing/k2-gems";

// Every string in the content tree except `href` values: link ids are opaque
// and never read by the audience, so they are not "copy".
function visibleCopy(value: unknown, out: string[] = []): string[] {
  if (typeof value === "string") out.push(value);
  else if (Array.isArray(value)) value.forEach((v) => visibleCopy(v, out));
  else if (value && typeof value === "object")
    for (const [key, v] of Object.entries(value)) {
      if (key !== "href") visibleCopy(v, out);
    }
  return out;
}

// A canonical Google id and nothing else: no `ouid=`, no `usp=`, no query at
// all. Berau's chips were reduced this way in ace479e; GEMS ships that way.
const CANONICAL_LINK =
  /^https:\/\/(docs\.google\.com\/document\/d|drive\.google\.com\/drive\/folders)\/[A-Za-z0-9_-]+$/;

// Through the slide def's own `render`, not the component directly: that is what
// proves the def hands the GEMS content over. Rendering
// `<K2PracticeLabOverview content={k2GemsContent} />` here would pass even if
// k2-gems.tsx forgot the prop and fell back to the shared spine.
// K.2 exists only where the Practice Lab runs, and `general` — the variant unit
// tests resolve to — drops it, so there is no composed row to look up. That a
// practiceLab deck really prints K.2 here is proved from rendered output by
// `deck-numbering-fixture.test.tsx`.
const K2_IN_PRACTICE_LAB_DECK = { letter: "K", num: 2, sectionKey: "lab" } as const;

function renderGems() {
  return render(
    <SlideHarness def={k2GemsSlide} at={K2_IN_PRACTICE_LAB_DECK}>
      {k2GemsSlide.render()}
    </SlideHarness>,
  );
}

/** Pin a part (click = pin, which survives mouse-leave) and read the popover. */
function pin(id: string): HTMLElement {
  act(() => screen.getByTestId(`k2-part-${id}`).click());
  return screen.getByTestId(`k2-popover-${id}`);
}

// ── the slide is a content delta, not a new component ────────────────────────

test("K.2 GEMS declares exactly the shared K.2's step + morph mechanics", () => {
  expect(k2GemsSlide.steps).toBe(k2Slide.steps);
  expect(k2GemsSlide.canonicalPose).toBe(k2Slide.canonicalPose);
  expect(k2GemsSlide.animationMode).toBe(k2Slide.animationMode);
  expect(k2GemsSlide.surface).toBe(k2Slide.surface);
  expect(k2GemsSlide.sectionKey).toBe("lab");
});

// ── storage: override part 2 only ────────────────────────────────────────────

test("parts 1, 3 and 4 are shared by reference, not copied", () => {
  expect(k2GemsContent.spine).toHaveLength(4);
  expect(k2GemsContent.spine[0]).toBe(k2Content.spine[0]);
  expect(k2GemsContent.spine[2]).toBe(k2Content.spine[2]);
  expect(k2GemsContent.spine[3]).toBe(k2Content.spine[3]);
  expect(k2GemsContent.spine[1]).not.toBe(k2Content.spine[1]);
});

test("nothing outside the spine is re-authored — same headline, footer, keywords", () => {
  // Strings compare by value; the keyword arrays are the reference checks.
  expect(k2GemsContent.figLabel).toBe(k2Content.figLabel);
  expect(k2GemsContent.headline).toBe(k2Content.headline);
  expect(k2GemsContent.leftHeader).toBe(k2Content.leftHeader);
  expect(k2GemsContent.footer).toBe(k2Content.footer);
  expect(k2GemsContent.headlineKw).toBe(k2Content.headlineKw);
  expect(k2GemsContent.footerKw).toBe(k2Content.footerKw);
});

test("the shared K.2 still carries Two Tracks — berau and general are untouched", () => {
  const tracks = k2Content.spine[1];
  expect(tracks.id).toBe("tracks");
  expect(tracks.name).toBe("Two Tracks");
  expect(tracks.essence).toBe("Same data, two disciplines");
  expect(tracks.pop.rows.map((r) => r.label)).toEqual([
    "Section Head · Analyst",
    "Team Leader · Comms Booster",
  ]);
  // Both personas keep their own three materials.
  for (const row of tracks.pop.rows) {
    expect(row.links?.map((l) => l.label)).toEqual([
      "Runbook",
      "Main folder",
      "Starter pack",
    ]);
  }
});

// ── the copy ─────────────────────────────────────────────────────────────────

test("GEMS part 2 is THE ANALYST, with the spec's card copy", () => {
  const analyst = k2GemsContent.spine[1];
  expect(analyst.id).toBe("analyst");
  expect(analyst.num).toBe(2);
  expect(analyst.name).toBe("THE ANALYST");
  expect(analyst.essence).toBe("Same data, same discipline");
  expect(analyst.pop.desc).toBe(
    "Everyone works the same dataset as the same persona — an operational analyst. One provided Skill, built to cite its sources and refuse to fabricate.",
  );
  expect(analyst.pop.descKw).toEqual([
    "the same persona",
    "cite its sources",
    "refuse to fabricate",
  ]);
});

test("every keyword is a substring of the description it highlights", () => {
  const { desc, descKw } = k2GemsContent.spine[1].pop;
  for (const kw of descKw) expect(desc).toContain(kw);
});

test("GEMS part 2 splits into three rows — question, Skill, collateral", () => {
  const rows = k2GemsContent.spine[1].pop.rows;
  expect(rows.map((r) => r.label)).toEqual([
    "The question",
    "The Skill",
    "The collateral",
  ]);
  expect(rows[0].items).toEqual(['"Why did this happen?"']);
  expect(rows[1].items).toEqual(["root-cause-investigator", "evidence-tracing"]);
  // The collateral row is the links; no chips duplicate them.
  expect(rows[2].items).toEqual([]);
  expect(rows[2].links?.map((l) => l.label)).toEqual([
    "Runbook",
    "Main folder",
    "Starter pack",
  ]);
});

test("the three links are GEMS' own, in canonical form and ordered by use", () => {
  expect(k2GemsContent.spine[1].pop.rows[2].links).toEqual([
    {
      label: "Runbook",
      href: "https://docs.google.com/document/d/1piHjL5Vm25mj3Nvv-_bN5u3cG3vPX1z3",
    },
    {
      label: "Main folder",
      href: "https://drive.google.com/drive/folders/1AIUJsU8usuj8TEIYN8yObN0iQDJ-v4FY",
    },
    {
      label: "Starter pack",
      href: "https://drive.google.com/drive/folders/11aqVeWEXWqdwLu6FI3DYu2U6zv0apNeR",
    },
  ]);
  for (const link of k2GemsContent.spine[1].pop.rows[2].links ?? []) {
    expect(link.href).toMatch(CANONICAL_LINK);
  }
});

test("no GEMS-visible K.2 copy contains the word 'track'", () => {
  for (const s of visibleCopy(k2GemsContent)) expect(s).not.toMatch(/track/i);
});

// ── rendered ─────────────────────────────────────────────────────────────────

test("pinning part 2 shows THE ANALYST and its three row headers", () => {
  renderGems();
  const pop = pin("analyst");
  expect(pop.textContent).toMatch(/THE ANALYST/);
  expect(pop.textContent).toMatch(/Same data, same discipline/);
  expect(pop.textContent).toMatch(/an operational analyst/);
  expect(pop.textContent).toMatch(/The question/);
  expect(pop.textContent).toMatch(/The Skill/);
  expect(pop.textContent).toMatch(/The collateral/);
  expect(pop.textContent).toMatch(/Why did this happen\?/);
  expect(pop.textContent).toMatch(/root-cause-investigator/);
});

test("the collateral renders as three new-tab link chips", () => {
  renderGems();
  pin("analyst");
  const chips = screen.getAllByTestId("k2-linkchip");
  expect(chips).toHaveLength(3);
  expect(chips.map((c) => c.textContent?.trim())).toEqual([
    "Runbook",
    "Main folder",
    "Starter pack",
  ]);
  for (const chip of chips) {
    expect(chip.getAttribute("href")).toMatch(CANONICAL_LINK);
    expect(chip).toHaveAttribute("target", "_blank");
    expect(chip).toHaveAttribute("rel", "noopener noreferrer");
  }
});

test("the whole GEMS slide, all four parts opened, never says 'track'", () => {
  const { container } = renderGems();
  for (const part of k2GemsContent.spine) {
    pin(part.id); // pin wins, so re-pinning the next part needs the previous off
    expect(screen.getByTestId(`k2-popover-${part.id}`)).toBeInTheDocument();
    expect(container.textContent ?? "").not.toMatch(/track/i);
    act(() => screen.getByTestId(`k2-part-${part.id}`).click()); // unpin
  }
});
