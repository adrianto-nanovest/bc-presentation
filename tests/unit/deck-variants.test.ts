import { describe, expect, test } from "vitest";
import { readFileSync } from "node:fs";
import { resolve as resolvePath } from "node:path";
import {
  BRANDS,
  DECK_SETS,
  DEFAULT_VARIANT_ID,
  VARIANTS,
  VARIANT_BY_HOST,
  isVariantId,
  loginTitle,
  resolveVariant,
  variantLabel,
  type Brand,
  type VariantId,
} from "@/deck-variants";

const ALL_IDS: VariantId[] = [
  "berau-middle-mgmt",
  "berau-leader",
  "gems-middle-mgmt",
  "gems-leader",
  "general",
];

describe("BRANDS × DECK_SETS table", () => {
  test("registers all five variant ids, each pointing at a real brand + deck set", () => {
    expect(Object.keys(VARIANTS).sort()).toEqual([...ALL_IDS].sort());
    for (const id of ALL_IDS) {
      const v = VARIANTS[id];
      expect(v.id).toBe(id);
      expect(BRANDS[v.brand]).toBeDefined();
      expect(DECK_SETS[v.deckSet]).toBeDefined();
    }
  });

  test("variant rows map to the brand and deck set the spec assigns them", () => {
    expect(VARIANTS["berau-middle-mgmt"]).toEqual({
      id: "berau-middle-mgmt",
      brand: "berau",
      deckSet: "standard",
    });
    expect(VARIANTS["berau-leader"]).toEqual({
      id: "berau-leader",
      brand: "berau",
      deckSet: "leader",
    });
    expect(VARIANTS["gems-middle-mgmt"]).toEqual({
      id: "gems-middle-mgmt",
      brand: "gems",
      deckSet: "standard",
    });
    expect(VARIANTS["gems-leader"]).toEqual({
      id: "gems-leader",
      brand: "gems",
      deckSet: "leader",
    });
    expect(VARIANTS.general).toEqual({
      id: "general",
      brand: "general",
      deckSet: "standard",
    });
  });

  test("each brand row carries label, cookie, password env, favicon and practice-lab flag", () => {
    expect(BRANDS.berau).toEqual({
      label: "Berau AI Catalyst Workshop",
      cookie: "berau_session",
      passwordEnv: "SITE_PASSWORD_BERAU",
      favicon: "/brand/bce-logo.png",
      practiceLab: true,
    });
    expect(BRANDS.gems).toEqual({
      label: "GEMS AI Catalyst Workshop",
      cookie: "gems_session",
      passwordEnv: "SITE_PASSWORD_GEMS",
      favicon: "/brand/gems-logo.svg",
      practiceLab: true,
    });
    expect(BRANDS.general).toEqual({
      label: "AI Catalyst Workshop",
      cookie: "general_session",
      passwordEnv: "SITE_PASSWORD_GENERAL",
      favicon: "/brand/general-ai-logo.png",
      practiceLab: false,
    });
  });

  test("cookies and password envs are unique per brand (no cross-brand collisions)", () => {
    const brands = Object.keys(BRANDS) as Brand[];
    const cookies = brands.map((b) => BRANDS[b].cookie);
    const envs = brands.map((b) => BRANDS[b].passwordEnv);
    expect(new Set(cookies).size).toBe(brands.length);
    expect(new Set(envs).size).toBe(brands.length);
  });

  test("only the leader deck set carries a label suffix", () => {
    expect(DECK_SETS.standard.labelSuffix).toBeUndefined();
    expect(DECK_SETS.leader.labelSuffix).toBe(" · Leadership");
  });

  test("stays plain data — no imports, no React, no DOM at module scope", () => {
    // `middleware.ts` imports this module by a relative path (gh#23), and the
    // `@/` alias does not resolve in Vercel's middleware build. An import added
    // here would break that build, not this one — so assert there are none,
    // rather than wait for a deploy to say so.
    const src = readFileSync(
      resolvePath(__dirname, "../../src/deck-variants.ts"),
      "utf8",
    );
    // Comments legitimately name `window.location` and `middleware.ts`; only
    // executable code is under test here.
    const code = src
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .replace(/^\s*\/\/.*$/gm, "");
    expect(code).not.toMatch(/^\s*import\s/m);
    expect(code).not.toMatch(/\bfrom\s+["']/);
    expect(code).not.toMatch(/\b(document|window|localStorage|navigator)\b/);
  });
});

describe("host map", () => {
  test("maps every declared hostname to a registered variant id", () => {
    const hosts = Object.keys(VARIANT_BY_HOST);
    expect(hosts.length).toBeGreaterThan(0);
    for (const host of hosts) {
      expect(isVariantId(VARIANT_BY_HOST[host])).toBe(true);
    }
  });

  test("carries the spec's hostnames, with localhost and 127.0.0.1 as ordinary entries", () => {
    expect(VARIANT_BY_HOST).toEqual({
      "bc-presentation.vercel.app": "berau-middle-mgmt",
      "bc-middle-mgmt-ai-workshop.vercel.app": "berau-middle-mgmt",
      "bc-leader-ai-workshop.vercel.app": "berau-leader",
      "gems-middle-mgmt-ai-workshop.vercel.app": "gems-middle-mgmt",
      "gems-leader-ai-workshop.vercel.app": "gems-leader",
      "ai-catalyst-workshop.vercel.app": "general",
      localhost: "general",
      "127.0.0.1": "general",
    });
  });

  test("resolves each host-map entry to that entry's variant", () => {
    for (const [hostname, id] of Object.entries(VARIANT_BY_HOST)) {
      expect(resolveVariant({ hostname })).toEqual(VARIANTS[id]);
    }
  });
});

describe("resolveVariant — explicit ?variant= → explicit host → general", () => {
  test("defaults to general", () => {
    expect(DEFAULT_VARIANT_ID).toBe("general");
    expect(resolveVariant({})).toEqual(VARIANTS.general);
  });

  test("an unmatched host (Vercel preview) falls back to general", () => {
    expect(resolveVariant({ hostname: "bc-presentation-git-abc123.vercel.app" })).toEqual(
      VARIANTS.general,
    );
    expect(resolveVariant({ hostname: "" })).toEqual(VARIANTS.general);
    expect(resolveVariant({ hostname: null })).toEqual(VARIANTS.general);
  });

  test("a hostname that names an inherited Object member still lands on general", () => {
    // `__proto__` and `constructor` are legal URL hosts, so a bare map lookup
    // would hand back an inherited member instead of falling through.
    for (const hostname of ["__proto__", "constructor", "toString", "hasOwnProperty"]) {
      expect(resolveVariant({ hostname }), hostname).toEqual(VARIANTS.general);
    }
    expect(resolveVariant({ variantParam: "__proto__", hostname: "localhost" })).toEqual(
      VARIANTS.general,
    );
  });

  test("an explicit ?variant= wins over the host, for all five ids", () => {
    for (const id of ALL_IDS) {
      expect(
        resolveVariant({ variantParam: id, hostname: "bc-presentation.vercel.app" }),
      ).toEqual(VARIANTS[id]);
      expect(resolveVariant({ variantParam: id, hostname: "localhost" })).toEqual(
        VARIANTS[id],
      );
    }
  });

  test("an unknown or absent ?variant= leaves the host rule in charge", () => {
    const host = "bc-presentation.vercel.app";
    expect(resolveVariant({ variantParam: "berau", hostname: host })).toEqual(
      VARIANTS["berau-middle-mgmt"],
    );
    expect(resolveVariant({ variantParam: "", hostname: host })).toEqual(
      VARIANTS["berau-middle-mgmt"],
    );
    expect(resolveVariant({ variantParam: null, hostname: host })).toEqual(
      VARIANTS["berau-middle-mgmt"],
    );
  });

  test("an unknown ?variant= on an unmatched host still lands on general", () => {
    expect(resolveVariant({ variantParam: "nope", hostname: "preview.vercel.app" })).toEqual(
      VARIANTS.general,
    );
  });
});

describe("derived labels", () => {
  test("the eyebrow / title-chip label appends the deck set's suffix", () => {
    expect(variantLabel(VARIANTS["berau-middle-mgmt"])).toBe("Berau AI Catalyst Workshop");
    expect(variantLabel(VARIANTS["berau-leader"])).toBe(
      "Berau AI Catalyst Workshop · Leadership",
    );
    expect(variantLabel(VARIANTS["gems-middle-mgmt"])).toBe("GEMS AI Catalyst Workshop");
    expect(variantLabel(VARIANTS["gems-leader"])).toBe(
      "GEMS AI Catalyst Workshop · Leadership",
    );
    expect(variantLabel(VARIANTS.general)).toBe("AI Catalyst Workshop");
  });

  test("the login page title is the plain brand label — never suffixed", () => {
    expect(loginTitle("berau")).toBe("Berau AI Catalyst Workshop — Access");
    expect(loginTitle("gems")).toBe("GEMS AI Catalyst Workshop — Access");
    expect(loginTitle("general")).toBe("AI Catalyst Workshop — Access");
    for (const id of ALL_IDS) {
      expect(loginTitle(VARIANTS[id].brand)).not.toContain("Leadership");
    }
  });
});

describe("isVariantId", () => {
  test("accepts the five ids and rejects everything else", () => {
    for (const id of ALL_IDS) expect(isVariantId(id)).toBe(true);
    for (const bad of ["berau", "gems", "leader", "", "GENERAL", null, undefined]) {
      expect(isVariantId(bad)).toBe(false);
    }
  });
});
