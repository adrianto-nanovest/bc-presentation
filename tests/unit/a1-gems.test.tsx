// A.1 (GEMS) — WHAT GEMS ALREADY RUNS · content + render tests (gh#25).
//
// The slide's job: GEMS' portfolio was built FOR participants by a central
// team, so "what you've already seen" can land as *the experts already handled
// this*. The tagline makes the turn to ownership. These tests fence in the two
// things that can silently break that turn:
//
//   1. A keyword that is not a substring of its copy. `highlight()` is a plain
//      `String.includes` match that NO-OPS SILENTLY (spec §trap 5), so a typo
//      or a curly apostrophe drops a copper highlight with no error anywhere.
//   2. `questions` losing its shared-by-reference link. The five questions ARE
//      the agenda and are identical across brands, so they are one shared
//      array; the hazard is editing a question THROUGH that reference for GEMS,
//      which silently ships the edit to berau and general as well. Rewording one
//      for GEMS means cloning the array first.
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { useDeck } from "@/deck/DeckContext";
import { SlideHarness } from "../support/slide-harness";
import { a1Slide } from "@/slides/opening-section-a/a1-what-youve-seen";
import { a1GemsSlide } from "@/slides/opening-section-a/a1-gems";
import {
  a1Content,
  a1GemsContent,
  a1GeneralContent,
  type A1Content,
} from "@/slides/opening-section-a/content";

function AdvanceTo({ step }: { step: number }) {
  const { goTo } = useDeck();
  return <button data-testid="goto" onClick={() => goTo(0, step)} />;
}

/**
 * Renders through `a1GemsSlide.render()`, NOT by mounting the shared component
 * with `a1GemsContent` directly: the slide def is the thing the deck actually
 * calls, so injecting the content here would let a1-gems.tsx point at the wrong
 * object with every assertion below still passing.
 */
// GEMS' A.1 replaces the default deck's A.1, so `general` — the variant unit
// tests resolve to — does not carry it and there is no composed row to look up.
// It occupies section A's first numbered position in the deck that does run it;
// that the GEMS deck really prints A.1 there is proved from rendered output, for
// all three brands, by `deck-numbering-fixture.test.tsx`.
const A1_IN_GEMS_DECK = { letter: "A", num: 1, sectionKey: "opening" } as const;

function renderAtStep(step: number) {
  const result = render(
    <SlideHarness def={a1GemsSlide} at={A1_IN_GEMS_DECK}>
      <AdvanceTo step={step} />
      {a1GemsSlide.render()}
    </SlideHarness>,
  );
  act(() => {
    screen.getByTestId("goto").click();
  });
  // Settle the mount stagger (220/460/680ms) and the right column's 650ms gate.
  // Both matter because EVERY gated element stays MOUNTED at opacity 0 — a test
  // that only reads `textContent` therefore passes with the reveal fully broken.
  act(() => {
    vi.advanceTimersByTime(1200);
  });
  return result;
}

beforeEach(() => vi.useFakeTimers());
afterEach(() => vi.useRealTimers());

/** Inline-opacity gate, used by the tagline, rule header and both columns. */
const opacityOf = (testId: string): string =>
  (screen.getByTestId(testId) as HTMLElement).style.opacity;

/** `Reveal`'s gate: the element is always mounted; `.on` is what shows it. */
const isRevealed = (testId: string): boolean =>
  screen.getByTestId(testId).classList.contains("on");

// ── The brief, verbatim ──────────────────────────────────────────────────────

describe("A.1 (GEMS) copy", () => {
  test("the frame strings match the brief", () => {
    expect(a1GemsContent.figLabel).toBe("WHAT GEMS ALREADY RUNS");
    expect(a1GemsContent.slideTitle).toBe("The AI already running at GEMS.");
    expect(a1GemsContent.tagline).toBe(
      "DigiTech built these for you. The questions ahead are about building with them.",
    );
    expect(a1GemsContent.ruleHeader).toBe("Already In Production");
    expect(a1GemsContent.leftHeading).toBe("Five systems already running");
    expect(a1GemsContent.footerCaption).toBe(
      "Five systems already live. Five questions still ahead.",
    );
  });

  test("the right-hand heading is unchanged from both existing variants", () => {
    expect(a1GemsContent.rightHeading).toBe("Questions we'll answer");
    expect(a1GemsContent.rightHeading).toBe(a1Content.rightHeading);
  });

  test("the keyword arrays match the brief", () => {
    expect(a1GemsContent.slideTitleKw).toEqual(["already running"]);
    expect(a1GemsContent.taglineKw).toEqual(["built these for you", "building with them"]);
    expect(a1GemsContent.footerCaptionKw).toEqual(["already live", "ahead"]);
  });

  test("the five chips are the product names, in order, with their icons", () => {
    expect(
      a1GemsContent.capabilities.map((c) => [c.label, c.iconName]),
    ).toEqual([
      ["GEMVIS", "MessageSquare"],
      ["SICANTIK", "Camera"],
      ["FAMOUS", "Truck"],
      ["USIGN", "FileSignature"],
      ["MIRRAX", "Map"],
    ]);
  });

  test("each chip's description and keyword match the brief", () => {
    expect(a1GemsContent.capabilities.map((c) => [c.description, c.descriptionKw])).toEqual([
      [
        "One assistant, routing your question to specialist agents across fifty systems.",
        ["specialist agents"],
      ],
      [
        "Cameras that watch for violations and unsafe behaviour, not just record them.",
        ["watch for violations"],
      ],
      [
        "Sensors and AI reading fleet status, driver behaviour, and fatigue in real time.",
        ["fatigue"],
      ],
      [
        "Approvals signed digitally, with an AI assistant checking the document first.",
        ["checking the document first"],
      ],
      [
        "Field monitoring and analysis across the mining area, read by machine vision.",
        ["read by machine vision"],
      ],
    ]);
  });
});

// ── The silent no-op trap ────────────────────────────────────────────────────

/** Every `(copy, keywords)` pair the slide will hand to `highlight()`. */
function highlightPairs(C: A1Content): [string, string, readonly string[]][] {
  return [
    ["slideTitle", C.slideTitle, C.slideTitleKw],
    ["tagline", C.tagline, C.taglineKw],
    ["footerCaption", C.footerCaption, C.footerCaptionKw],
    ...C.capabilities.map(
      (c) => [`capability ${c.label}`, c.description, c.descriptionKw] as [
        string,
        string,
        readonly string[],
      ],
    ),
    ...C.questions.map(
      (q, i) => [`question ${i + 1}`, q.text, q.kw] as [string, string, readonly string[]],
    ),
  ];
}

describe("A.1 keyword highlighting cannot silently no-op", () => {
  // Guards all three variants, not just GEMS: the matcher is case-sensitive and
  // returns the plain text on a miss, so nothing else in the suite would catch
  // a keyword that stopped matching its copy.
  test.each([
    ["gems", a1GemsContent],
    ["berau", a1Content],
    ["general", a1GeneralContent],
  ] as const)("every %s keyword is a substring of the copy it highlights", (_id, C) => {
    for (const [where, text, keywords] of highlightPairs(C)) {
      for (const k of keywords) {
        expect(text.includes(k), `${where}: ${JSON.stringify(k)} not found in ${JSON.stringify(text)}`).toBe(
          true,
        );
      }
    }
  });
});

// ── Shared by reference ──────────────────────────────────────────────────────

describe("A.1 (GEMS) questions", () => {
  test("are the SAME array object as the shared agenda, not a copy", () => {
    // Identity, not equality: a copy would let a GEMS reword drift away from
    // berau and general silently. Rewording for GEMS means cloning first.
    expect(a1GemsContent.questions).toBe(a1Content.questions);
    expect(a1GeneralContent.questions).toBe(a1Content.questions);
  });

  test("still point at the same five sections, in order", () => {
    // By KEY, not by printed label: gh#37 moved the letter and the name out of
    // the content and into the composed deck. That what GEMS PRINTS is still
    // "SECTION D · PROCESS & METHODOLOGY" is asserted from rendered output by
    // `a1-agenda-pointers.test.tsx`.
    expect(a1GemsContent.questions.map((q) => q.sectionRef.keys)).toEqual([
      ["process"],
      ["fundamentals"],
      ["techniques"],
      ["tools"],
      ["pitfalls"],
    ]);
  });
});

// ── Claim discipline (docs/researches/2026-07-31-gems-digitech-ai-landscape.md) ──

describe("A.1 (GEMS) claim discipline", () => {
  const allCopy = [
    a1GemsContent.figLabel,
    a1GemsContent.slideTitle,
    a1GemsContent.tagline,
    a1GemsContent.ruleHeader,
    a1GemsContent.leftHeading,
    a1GemsContent.rightHeading,
    a1GemsContent.footerCaption,
    ...a1GemsContent.capabilities.flatMap((c) => [c.label, c.description]),
  ].join(" ");

  test("the company renders as the acronym, never the full legal name", () => {
    expect(allCopy).toContain("GEMS");
    expect(allCopy).not.toMatch(/Golden Energy Mines/i);
  });

  test.each(["Databricks", "AI-OCR", "WIM"])(
    "%s is excluded — publicly unverified, a sub-capability, or a separate product",
    (excluded) => {
      expect(allCopy).not.toMatch(new RegExp(excluded, "i"));
    },
  );

  test("no computer vision is attributed to FAMOUS", () => {
    // Public sources assign computer vision to SiCantik and WIM, not FAMOUS.
    const famous = a1GemsContent.capabilities.find((c) => c.label === "FAMOUS");
    expect(famous?.description).not.toMatch(/camera|vision|visual/i);
  });

  test("Usign's AI is limited to a validation assist, not open Q&A over documents", () => {
    const usign = a1GemsContent.capabilities.find((c) => c.label === "USIGN");
    expect(usign?.description).toMatch(/checking the document first/);
    expect(usign?.description).not.toMatch(/ask|question|chat|any document/i);
  });

  test("MIRRAX carries no metric, vendor, or outcome — internal attestation only", () => {
    const mirrax = a1GemsContent.capabilities.find((c) => c.label === "MIRRAX");
    expect(mirrax?.description).not.toMatch(/\d/); // no figures at all
    expect(mirrax?.description).not.toMatch(/google|gemini|databricks|custodian/i);
  });
});

// ── Render + mechanics ───────────────────────────────────────────────────────

describe("A.1 (GEMS) renders", () => {
  test("declares mechanics identical to the existing A.1 — a content delta, not a component", () => {
    expect(a1GemsSlide.steps).toBe(a1Slide.steps);
    expect(a1GemsSlide.canonicalPose).toBe(a1Slide.canonicalPose);
    expect(a1GemsSlide.animationMode).toBe(a1Slide.animationMode);
    expect(a1GemsSlide.surface).toBe(a1Slide.surface);
    expect(a1GemsSlide.section).toBe(a1Slide.section);
  });

  test("step 0 shows the GEMS fig label, title, tagline, rule header and five chips", () => {
    const { container } = renderAtStep(0);

    const fig = container.querySelector(".fig-label") as HTMLElement;
    expect(fig.textContent).toMatch(/FIG\.\s*A\.1\s*·\s*WHAT GEMS ALREADY RUNS/);
    expect(container.textContent).toContain("The AI already running at GEMS.");

    const tagline = screen.getByTestId("a1-tagline");
    expect(tagline.textContent).toBe(
      "DigiTech built these for you. The questions ahead are about building with them.",
    );
    expect(opacityOf("a1-tagline")).toBe("1");

    expect(screen.getByTestId("a1-rule-header").textContent).toContain("Already In Production");
    expect(opacityOf("a1-rule-header")).toBe("1");

    expect(screen.getAllByTestId("capability-chip")).toHaveLength(5);
    // The two step-1+ payloads are hidden, not merely absent-looking.
    expect(isRevealed("a1-footer-caption")).toBe(false);
  });

  test("step 1 shows the five product cards and reveals the shared questions column", () => {
    renderAtStep(1);

    for (const icon of ["MessageSquare", "Camera", "Truck", "FileSignature", "Map"]) {
      expect(screen.getByTestId(`a1-cap-card-${icon}`)).toBeInTheDocument();
    }
    expect(screen.getByTestId("a1-capabilities-column").textContent).toContain(
      "Five systems already running",
    );

    const questions = screen.getByTestId("a1-questions-column");
    expect(questions.textContent).toContain("Questions we'll answer");
    // The column is mounted at step 0 too, so opacity is the real assertion.
    expect(opacityOf("a1-questions-column")).toBe("1");
    expect(screen.getAllByTestId(/^a1-question-card-/)).toHaveLength(5);

    // The opener has handed over, and the footer is still held back.
    expect(opacityOf("a1-tagline")).toBe("0");
    expect(isRevealed("a1-footer-caption")).toBe(false);
  });

  test("the three NEW icons render at the same size and stroke weight as the reused ones", () => {
    // The AC in gh#25: Camera, Truck and FileSignature must not look bolder or
    // larger than MessageSquare and Map, which the berau A.1 already ships.
    renderAtStep(1);

    const svgOf = (icon: string) =>
      screen.getByTestId(`a1-cap-card-${icon}`).querySelector("svg") as SVGElement;

    const reference = svgOf("MessageSquare");
    const attrs = (svg: SVGElement) => [
      svg.getAttribute("width"),
      svg.getAttribute("height"),
      svg.getAttribute("stroke-width"),
    ];

    expect(attrs(reference)).toEqual(["22", "22", "1.5"]);
    for (const icon of ["Camera", "Truck", "FileSignature", "Map"]) {
      expect(attrs(svgOf(icon)), icon).toEqual(attrs(reference));
    }
  });

  test("step 2 reveals the footer, which stays hidden before it", () => {
    renderAtStep(2);
    expect(screen.getByTestId("a1-footer-caption").textContent).toBe(
      "Five systems already live. Five questions still ahead.",
    );
    // `Reveal` never unmounts, so `.on` — not presence — is what "revealed"
    // means. The step-0 and step-1 cases above assert the other side of this.
    expect(isRevealed("a1-footer-caption")).toBe(true);
  });
});
