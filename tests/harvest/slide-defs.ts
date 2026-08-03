// Every `SlideDef` literal in the source tree, found by PARSING it.
//
// The instrument behind `tests/unit/deck-slide-ids.test.ts`, which pins the rule
// that a slide's `id` is its file's basename (spec §3.3, gh#34).
//
// WHY THE SOURCE AND NOT AN IMPORT. The rule ties an id to the FILE it lives
// in, and an imported def does not know its own path. Importing every def is
// otherwise perfectly possible — `tests/unit/variant-composition.test.tsx`
// already loads the three A.1 alternates side by side in one epoch — so the
// path, not module isolation, is the whole reason this reads source.
//
// WHY THE AST AND NOT A REGEX. A regex over TypeScript recognises exactly the
// spelling it was written for. `satisfies SlideDef`, a single-quoted id, a
// one-line literal or a nested `id:` all defeat one, and each failure is
// SILENT — the def vanishes from the scan and every assertion over the scan
// still passes. `tests/unit/f8-your-agentic-os.test.tsx` greps source, but for
// a literal string, which is a textual question; "which declarations exist" is
// a syntactic one and gets the parser. TypeScript is already a direct
// dependency, so this costs nothing.
//
// The scan's own completeness is not self-provable — a def declared by a
// factory function would be missed here and missed by any count taken from
// here. `tests/unit/deck-composed-numbering.test.ts` closes that loop from the
// other side, requiring every id in a live composed deck to appear in this scan.
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import ts from "typescript";

const SRC = path.resolve(__dirname, "../../src");
const REPO_ROOT = path.resolve(SRC, "..");

export interface SlideDefSite {
  /** Repo-relative posix path — `src/slides/foundation-core/d1-the-trap.tsx`. */
  file: string;
  /** The declared const's name, for a readable failure message. */
  name: string;
  /** The `id` property's literal value. `null` when absent or not a plain
   *  string literal, which the test reports rather than silently skips. */
  id: string | null;
}

/** Every `.ts`/`.tsx` file under `src/`, walked in a stable order. */
function sourceFiles(dir: string = SRC, acc: string[] = []): string[] {
  for (const entry of readdirSync(dir, { withFileTypes: true }).sort((a, b) =>
    a.name.localeCompare(b.name),
  )) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) sourceFiles(full, acc);
    else if (entry.isFile() && /\.tsx?$/.test(entry.name)) acc.push(full);
  }
  return acc;
}

/** `x: SlideDef = {…}`, `x = {…} satisfies SlideDef` and `x = {…} as SlideDef`
 *  all declare one. Unwraps to the object literal, or null if this is not a
 *  slide def. */
function slideDefLiteral(decl: ts.VariableDeclaration): ts.ObjectLiteralExpression | null {
  const named = (node: ts.Node | undefined): boolean =>
    node !== undefined && ts.isTypeReferenceNode(node) && node.typeName.getText() === "SlideDef";

  let init = decl.initializer;
  if (init && (ts.isSatisfiesExpression(init) || ts.isAsExpression(init))) {
    if (!named(init.type)) return null;
    init = init.expression;
  } else if (!named(decl.type)) {
    return null;
  }

  return init && ts.isObjectLiteralExpression(init) ? init : null;
}

/** The `id` property declared DIRECTLY on this literal. Nested objects are not
 *  searched: a `fig: { id: … }` further down must never be mistaken for it. */
function idOf(literal: ts.ObjectLiteralExpression): string | null {
  for (const prop of literal.properties) {
    if (!ts.isPropertyAssignment(prop)) continue;
    if (prop.name.getText().replace(/["']/g, "") !== "id") continue;
    const value = prop.initializer;
    // Both quote styles are StringLiteral; a template literal with no
    // substitutions is still a constant and is accepted as one.
    if (ts.isStringLiteral(value) || ts.isNoSubstitutionTemplateLiteral(value)) return value.text;
    return null;
  }
  return null;
}

/** Every slide def in the tree, in file order. */
export function findSlideDefs(): SlideDefSite[] {
  return sourceFiles().flatMap((full) => {
    const source = ts.createSourceFile(
      full,
      readFileSync(full, "utf8"),
      ts.ScriptTarget.Latest,
      /* setParentNodes */ true,
      full.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
    );

    const found: SlideDefSite[] = [];
    const file = path.relative(REPO_ROOT, full).split(path.sep).join("/");

    const visit = (node: ts.Node): void => {
      if (ts.isVariableDeclaration(node)) {
        const literal = slideDefLiteral(node);
        if (literal) found.push({ file, name: node.name.getText(), id: idOf(literal) });
      }
      ts.forEachChild(node, visit);
    };
    visit(source);

    return found;
  });
}
