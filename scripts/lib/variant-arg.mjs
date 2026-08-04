// Variant argument for the export and screenshot scripts (gh#27).
//
// These scripts used to navigate to a bare `localhost:5173` and inherit
// whatever the resolver made of it. Since gh#22 flipped the localhost default
// to `general`, inheriting means every PDF, PPTX and screenshot quietly holds
// the wrong deck — no error, no signal, until someone opens the file. So the
// deck is now CHOSEN: an explicit id, or the one documented default.
//
// Anything else fails loudly. That includes a misspelt flag: `--varient=gems-…`
// exiting 1 is the whole point, because treating it as "no variant given" is
// exactly the silent-wrong-deck bug this replaces.
//
// The ids come from `src/deck-variants.ts` itself — it stays the single source
// of truth, and a sixth variant needs no edit here. Two things make importing a
// `.ts` module from bare `node` safe: that file is plain data with NO imports at
// all (asserted by `tests/unit/deck-variants.test.ts`, for the Edge build's
// sake), so Node's type stripping resolves it standalone; and it needs Node
// >=22.18 / >=23.6, where stripping is on by default. An older Node fails these
// scripts loudly at startup, which is the failure mode we want.
import { VARIANTS } from "../../src/deck-variants.ts";

/** The registered variant ids, straight from the shared table. */
export const VARIANT_IDS = Object.keys(VARIANTS);

/**
 * Deliberate, and stated here rather than read from the resolver: the scripts
 * default to the *unbranded* deck, so a forgotten flag yields a file nobody
 * mistakes for a client's. It coincides with the resolver's own default today,
 * but this is the scripts' own policy — flipping that one should not silently
 * re-aim every export.
 */
export const DEFAULT_VARIANT_ID = "general";

/** Thrown for a bad or ambiguous variant argument. Never for a missing one. */
export class VariantArgError extends Error {
  constructor(message) {
    super(message);
    this.name = "VariantArgError";
  }
}

/** Two-column layout shared by every option line, so the three scripts align. */
function optionLine(flag, description) {
  return `  ${flag.padEnd(14)}  ${description}`;
}

/**
 * The full usage text for one script. Only the names differ between the three,
 * so they differ in arguments here rather than in three near-copies.
 *
 * @param {{ script: string, outArg: string, outDefault: string }} spec
 */
export function scriptUsage({ script, outArg, outDefault }) {
  return [
    `Usage: node ${script} [${outArg}] [--variant=<id>]`,
    "",
    optionLine(outArg, `Output path. Default: ${outDefault}`),
    optionLine("--variant=<id>", `Deck to render. Default: ${DEFAULT_VARIANT_ID}.`),
    optionLine("", `Ids: ${VARIANT_IDS.join(", ")}`),
    optionLine("--strict", "Exit non-zero if any pose was still animating at capture."),
    "",
    optionLine("DECK_URL", "Base url to render. Default: http://localhost:5173"),
  ].join("\n");
}

/**
 * Split `argv` (already sliced past `node script`) into the chosen variant, any
 * boolean switches the caller declares, and the remaining positionals — the
 * scripts read their output path from those.
 *
 * A flag, not a positional, so `node scripts/export-pdf.mjs out.pdf` keeps
 * meaning what it always meant.
 *
 * `booleans` and `values` are how a script adds its own options WITHOUT loosening
 * the policy in this file: anything not declared is still an error, so a misspelt
 * `--strcit` cannot pass as "not strict" and a misspelt `--varient=` cannot pass
 * as "no variant given" (gh#50). Every script that takes arguments comes through
 * here, so there is one policy and not one per script.
 *
 * @param {string[]} argv
 * @param {{ booleans?: string[], values?: string[] }} [options]
 * @returns {{ variant: string, positionals: string[], flags: Record<string, boolean>,
 *            values: Record<string, string | undefined> }}
 */
export function parseVariantArg(argv, options = {}) {
  const booleans = options.booleans ?? [];
  const valueNames = options.values ?? [];
  const flags = Object.fromEntries(booleans.map((name) => [name, false]));
  const values = Object.fromEntries(valueNames.map((name) => [name, undefined]));
  const positionals = [];
  let variant;

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (!arg.startsWith("-")) {
      positionals.push(arg);
      continue;
    }

    if (booleans.includes(arg.slice(2)) && !arg.includes("=")) {
      flags[arg.slice(2)] = true;
      continue;
    }

    const named = valueNames.find((name) => arg === `--${name}` || arg.startsWith(`--${name}=`));
    if (named) {
      let v;
      if (arg === `--${named}`) {
        v = argv[i + 1];
        // A following flag is not a value — the same rule `--variant` follows.
        if (v === undefined || v === "" || v.startsWith("-")) {
          throw new VariantArgError(`\`--${named}\` needs a value.`);
        }
        i++;
      } else {
        v = arg.slice(named.length + 3);
        if (v === "") throw new VariantArgError(`\`--${named}=\` needs a value.`);
      }
      if (values[named] !== undefined) {
        throw new VariantArgError(`\`--${named}\` given twice; pick one.`);
      }
      values[named] = v;
      continue;
    }

    let value;
    if (arg === "--variant") {
      value = argv[i + 1];
      // A following flag is not a value: `--variant --quiet` is a missing id.
      if (value === undefined || value === "" || value.startsWith("-")) {
        throw new VariantArgError("`--variant` needs an id, e.g. `--variant=general`.");
      }
      i++;
    } else if (arg.startsWith("--variant=")) {
      value = arg.slice("--variant=".length);
      if (value === "") {
        throw new VariantArgError("`--variant=` needs an id, e.g. `--variant=general`.");
      }
    } else {
      throw new VariantArgError(`Unknown option \`${arg}\`.`);
    }

    if (variant !== undefined) {
      throw new VariantArgError(
        `\`--variant\` given twice (\`${variant}\` then \`${value}\`); pick one.`,
      );
    }
    if (!VARIANT_IDS.includes(value)) {
      throw new VariantArgError(
        `Unknown variant \`${value}\`. Valid ids: ${VARIANT_IDS.join(", ")}`,
      );
    }
    variant = value;
  }

  return { variant: variant ?? DEFAULT_VARIANT_ID, positionals, flags, values };
}

/**
 * `parseVariantArg`, but a bad argument prints the usage and exits non-zero.
 * Call it before launching a browser so a typo costs nothing.
 *
 * @param {string[]} argv
 * @param {string} usage Full usage text, variant lines included.
 * @param {{ booleans?: string[], values?: string[] }} [options]
 */
export function parseVariantArgOrExit(argv, usage, options) {
  try {
    return parseVariantArg(argv, options);
  } catch (err) {
    if (!(err instanceof VariantArgError)) throw err;
    console.error(`error: ${err.message}\n`);
    console.error(usage);
    process.exit(1);
  }
}

/**
 * The deck URL for `variant`. `set`, not append: an explicit choice overrides a
 * `?variant=` already sitting in `DECK_URL`, and re-running never stacks params.
 *
 * @param {string} base
 * @param {string} variant
 * @param {Record<string, string | number>} [extraParams]
 */
export function deckUrl(base, variant, extraParams = {}) {
  const url = new URL(base);
  url.searchParams.set("variant", variant);
  for (const [key, value] of Object.entries(extraParams)) {
    url.searchParams.set(key, String(value));
  }
  return url.toString();
}
