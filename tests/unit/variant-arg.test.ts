// The export and screenshot scripts choose their deck; they never inherit it.
//
// `scripts/lib/variant-arg.mjs` is the seam. It reads the ids from
// `src/deck-variants.ts`, so this file checks that the wiring holds — under
// vitest's resolver here, and under bare `node`'s type stripping in the spawned
// checks at the bottom, which is how the scripts themselves load it.
import { spawnSync } from "node:child_process";
import { describe, expect, test } from "vitest";
import { VARIANTS } from "@/deck-variants";
import {
  DEFAULT_VARIANT_ID,
  VARIANT_IDS,
  VariantArgError,
  deckUrl,
  parseVariantArg,
  scriptUsage,
} from "../../scripts/lib/variant-arg.mjs";

describe("the id list comes from the shared table", () => {
  test("VARIANT_IDS is exactly the registered variant ids", () => {
    expect([...VARIANT_IDS].sort()).toEqual(Object.keys(VARIANTS).sort());
  });

  // Stated in the scripts, not read from the resolver: flipping the resolver's
  // default should not silently re-aim every export.
  test("the default is `general`, chosen deliberately and registered", () => {
    expect(DEFAULT_VARIANT_ID).toBe("general");
    expect(VARIANT_IDS).toContain(DEFAULT_VARIANT_ID);
  });
});

describe("parseVariantArg", () => {
  test("no arguments at all falls back to the documented default", () => {
    expect(parseVariantArg([])).toEqual({ variant: "general", positionals: [], flags: {}, values: {} });
  });

  test("a lone positional is left for the caller as the output path", () => {
    expect(parseVariantArg(["exports/smoke-deck.pdf"])).toEqual({
      variant: "general",
      positionals: ["exports/smoke-deck.pdf"],
      flags: {},
      values: {},
    });
  });

  test("`--variant=<id>` after the output path", () => {
    expect(parseVariantArg(["out.pdf", "--variant=gems-middle-mgmt"])).toEqual({
      variant: "gems-middle-mgmt",
      positionals: ["out.pdf"],
      flags: {},
      values: {},
    });
  });

  test("`--variant <id>` before the output path", () => {
    expect(parseVariantArg(["--variant", "berau-leader", "out.pdf"])).toEqual({
      variant: "berau-leader",
      positionals: ["out.pdf"],
      flags: {},
      values: {},
    });
  });

  test("every registered id is accepted", () => {
    for (const id of VARIANT_IDS) {
      expect(parseVariantArg([`--variant=${id}`]).variant).toBe(id);
    }
  });

  test("an unknown id is refused, and the message lists the valid ones", () => {
    expect(() => parseVariantArg(["--variant=berau"])).toThrow(VariantArgError);
    try {
      parseVariantArg(["--variant=berau"]);
    } catch (err) {
      expect((err as Error).message).toContain("berau");
      for (const id of VARIANT_IDS) expect((err as Error).message).toContain(id);
    }
  });

  // gh#50 — `booleans` and `values` exist so a script can take its OWN options
  // without each script inventing its own parser, and without loosening the rule
  // that an undeclared option is an error.
  test("a declared boolean switch is read, and defaults to false", () => {
    const opts = { booleans: ["strict"] };
    expect(parseVariantArg(["--strict"], opts).flags).toEqual({ strict: true });
    expect(parseVariantArg([], opts).flags).toEqual({ strict: false });
  });

  test("a declared value option takes `=value` or a following word", () => {
    const opts = { values: ["out"] };
    expect(parseVariantArg(["--out=/tmp/a"], opts).values).toEqual({ out: "/tmp/a" });
    expect(parseVariantArg(["--out", "/tmp/a"], opts).values).toEqual({ out: "/tmp/a" });
  });

  test("a declared value option refuses an empty, missing or repeated value", () => {
    const opts = { values: ["out"] };
    expect(() => parseVariantArg(["--out="], opts)).toThrow(VariantArgError);
    expect(() => parseVariantArg(["--out"], opts)).toThrow(VariantArgError);
    expect(() => parseVariantArg(["--out", "--variant=general"], opts)).toThrow(VariantArgError);
    expect(() => parseVariantArg(["--out=a", "--out=b"], opts)).toThrow(VariantArgError);
  });

  test("an option the caller did NOT declare is still an error", () => {
    // The whole point: a misspelt switch must not read as its own absence.
    expect(() => parseVariantArg(["--strict"])).toThrow(VariantArgError);
    expect(() => parseVariantArg(["--strcit"], { booleans: ["strict"] })).toThrow(VariantArgError);
    expect(() => parseVariantArg(["--out=/tmp/a"], { booleans: ["strict"] })).toThrow(VariantArgError);
  });

  test("an empty value is refused rather than read as the default", () => {
    expect(() => parseVariantArg(["--variant="])).toThrow(VariantArgError);
    expect(() => parseVariantArg(["--variant", ""])).toThrow(VariantArgError);
  });

  test("a trailing `--variant` with nothing after it is refused", () => {
    expect(() => parseVariantArg(["out.pdf", "--variant"])).toThrow(VariantArgError);
  });

  test("a value that looks like the next flag is not swallowed", () => {
    expect(() => parseVariantArg(["--variant", "--quiet"])).toThrow(VariantArgError);
  });

  // The whole point of the ticket: a misspelt flag must not export `general`.
  test("a misspelt flag is refused, not ignored into the default", () => {
    expect(() => parseVariantArg(["--varient=gems-middle-mgmt"])).toThrow(VariantArgError);
    expect(() => parseVariantArg(["-variant=gems-middle-mgmt"])).toThrow(VariantArgError);
  });

  test("two variants in one invocation is ambiguous, so it is refused", () => {
    expect(() =>
      parseVariantArg(["--variant=general", "--variant=gems-leader"]),
    ).toThrow(VariantArgError);
  });
});

describe("deckUrl", () => {
  test("appends the variant to a bare base url", () => {
    expect(deckUrl("http://localhost:5173", "gems-middle-mgmt")).toBe(
      "http://localhost:5173/?variant=gems-middle-mgmt",
    );
  });

  test("the chosen variant overrides one already in DECK_URL", () => {
    expect(deckUrl("http://localhost:5173/?variant=general", "berau-middle-mgmt")).toBe(
      "http://localhost:5173/?variant=berau-middle-mgmt",
    );
  });

  test("keeps unrelated query params and adds the extras it is given", () => {
    const url = new URL(deckUrl("http://localhost:5173/?debug=1", "general", { slide: 12 }));
    expect(url.searchParams.get("debug")).toBe("1");
    expect(url.searchParams.get("variant")).toBe("general");
    expect(url.searchParams.get("slide")).toBe("12");
  });
});

describe("scriptUsage", () => {
  const usage = scriptUsage({
    script: "scripts/export-pdf.mjs",
    outArg: "out.pdf",
    outDefault: "exports/smoke-deck.pdf",
  });

  test("states every id and names the variant default", () => {
    for (const id of VARIANT_IDS) expect(usage).toContain(id);
    expect(usage).toContain(`Default: ${DEFAULT_VARIANT_ID}`);
  });

  test("names the script, its output argument and that argument's default", () => {
    expect(usage).toContain("node scripts/export-pdf.mjs [out.pdf] [--variant=<id>]");
    expect(usage).toContain("Default: exports/smoke-deck.pdf");
  });
});

// Spawned, not imported: the exit code and the ordering are the contract. Each
// script must reject the argument BEFORE it launches chromium or writes a file,
// which is why these run in ~0.3s and need no dev server.
describe("the scripts wire the parser in ahead of any work", () => {
  const scripts = [
    "scripts/export-pdf.mjs",
    "scripts/export-pptx.mjs",
    "scripts/screenshot-exchange-alerts.mjs",
  ];

  for (const script of scripts) {
    test(`${script} exits non-zero on an unknown id, printing the usage`, () => {
      const run = spawnSync("node", [script, "--variant=berau"], { encoding: "utf8" });
      expect(run.status).toBe(1);
      expect(run.stderr).toContain("Unknown variant `berau`");
      expect(run.stderr).toContain("--variant=<id>");
      expect(run.stderr).toContain(`Default: ${DEFAULT_VARIANT_ID}`);
    });

    test(`${script} exits non-zero on a misspelt flag, not into the default`, () => {
      const run = spawnSync("node", [script, "--varient=gems-middle-mgmt"], {
        encoding: "utf8",
      });
      expect(run.status).toBe(1);
      expect(run.stderr).toContain("Unknown option");
    });
  }
});
