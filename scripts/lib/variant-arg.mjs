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
    "",
    optionLine("DECK_URL", "Base url to render. Default: http://localhost:5173"),
  ].join("\n");
}

/**
 * Split `argv` (already sliced past `node script`) into the chosen variant and
 * the remaining positionals — the scripts read their output path from those.
 *
 * A flag, not a positional, so `node scripts/export-pdf.mjs out.pdf` keeps
 * meaning what it always meant.
 *
 * @param {string[]} argv
 * @returns {{ variant: string, positionals: string[] }}
 */
export function parseVariantArg(argv) {
  const positionals = [];
  let variant;

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (!arg.startsWith("-")) {
      positionals.push(arg);
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

  return { variant: variant ?? DEFAULT_VARIANT_ID, positionals };
}

/**
 * `parseVariantArg`, but a bad argument prints the usage and exits non-zero.
 * Call it before launching a browser so a typo costs nothing.
 *
 * @param {string[]} argv
 * @param {string} usage Full usage text, variant lines included.
 */
export function parseVariantArgOrExit(argv, usage) {
  try {
    return parseVariantArg(argv);
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
