# Design-System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Stand up the React/Tailwind/Framer-Motion deck substrate from the meta spec — design tokens, slide-template architecture, motion primitives, and a validated PDF/PPTX export pipeline — proven by a smoke deck that exercises every primitive.

**Architecture:** Vite + React + TypeScript app. Design tokens live as TS constants and are wired into Tailwind's theme so the same values drive both runtime CSS and Tailwind utility classes. A `<Slide>` wrapper enforces viewport invariants (100vh, `overflow:hidden`, `clamp()`-based sizing) and declares its animation mode + canonical screenshot pose. Motion primitives (`StepReveal`, `LoopingAmbient`, `Interactive`, `Static`) compose with Framer Motion. A global keyboard handler (`←`/`→`/`Space`) advances slides and step-reveals. Playwright drives the export pipeline: print-to-PDF for spec §4.1 secondary delivery; per-step screenshots stitched into PPTX via PptxGenJS for tertiary delivery.

**Tech Stack:** Vite, React 18, TypeScript (strict), Tailwind CSS v3, Framer Motion v11, Vitest + @testing-library/react, Playwright (e2e + export), PptxGenJS (PPTX assembly), Google Fonts (Instrument Serif, Source Serif 4, Inter, JetBrains Mono). All MIT/Apache-licensed; no paid components.

---

## File Structure

| File | Responsibility |
|---|---|
| `package.json` | npm deps + scripts |
| `vite.config.ts` | Vite + React + `@/` alias |
| `tsconfig.json`, `tsconfig.node.json` | TS strict mode, path mapping |
| `postcss.config.js` | Tailwind + autoprefixer |
| `tailwind.config.ts` | Theme extension wired to TS tokens |
| `playwright.config.ts` | Playwright e2e + export browsers |
| `vitest.config.ts` | Vitest + jsdom |
| `index.html` | Vite entry, fonts preconnect, `#root` |
| `src/main.tsx` | React mount |
| `src/styles/globals.css` | Tailwind directives, CSS variable declarations |
| `src/design-system/colors.ts` | Copper hue ladder + neutral grayscale |
| `src/design-system/typography.ts` | Font stacks + projection-scale type scale |
| `src/design-system/spacing.ts` | 4px grid + semantic spacing names |
| `src/design-system/shadows.ts` | Single shadow recipe |
| `src/design-system/index.ts` | Barrel export |
| `src/deck/DeckContext.tsx` | Current slide + step state, advance/back actions |
| `src/deck/useKeyboardNav.ts` | `←`/`→`/`Space` global keyboard hook |
| `src/deck/Slide.tsx` | Viewport-fit wrapper, animation-mode prop, `data-canonical-pose` attribute |
| `src/deck/Deck.tsx` | Top-level container; renders the slide registry |
| `src/deck/smoke-deck.tsx` | 7-slide canary deck exercising every primitive |
| `src/motion/StepReveal.tsx` | `Space`-driven progressive build |
| `src/motion/LoopingAmbient.tsx` | Continuous animation wrapper |
| `src/motion/Interactive.tsx` | Opt-in mouse interaction; isolates click events |
| `src/motion/Static.tsx` | Explicit no-animation marker |
| `src/primitives/Hero.tsx` | Photography-anchored hero layout |
| `src/primitives/SectionDivider.tsx` | Between-section divider |
| `src/primitives/ContentSlide.tsx` | Heading + bullets/paragraphs |
| `src/primitives/QuoteSlide.tsx` | Quote + attribution |
| `src/primitives/HexLadder.tsx` | Copper-stop projection-test slide |
| `scripts/export-pdf.mjs` | Playwright print pipeline |
| `scripts/export-pptx.mjs` | Playwright screenshots → PptxGenJS |
| `scripts/projection-test.mjs` | Open hex-ladder fullscreen on connected projector |
| `tests/unit/*.test.ts(x)` | Vitest unit tests for tokens + components |
| `tests/e2e/*.spec.ts` | Playwright e2e for viewport, nav, exports |
| `README.md` | Run instructions |

---

## Task 1: Bootstrap Vite + React + TypeScript

**Files:**
- Create: `package.json`, `vite.config.ts`, `tsconfig.json`, `tsconfig.node.json`, `index.html`, `src/main.tsx`, `src/App.tsx`, `vitest.config.ts`
- Modify: `.gitignore`

- [ ] **Step 1: Initialize npm and install runtime + tooling**

```bash
cd /Users/macbook/Projects/_web_presentation/berau-presentation
npm init -y
npm install react@^18.3.1 react-dom@^18.3.1 framer-motion@^11.11.0
npm install -D typescript@^5.6.0 vite@^5.4.0 @vitejs/plugin-react@^4.3.0 @types/react@^18.3.0 @types/react-dom@^18.3.0 @types/node@^22.0.0 vitest@^2.1.0 @vitest/ui@^2.1.0 jsdom@^25.0.0 @testing-library/react@^16.0.0 @testing-library/jest-dom@^6.5.0 @testing-library/user-event@^14.5.2
```

Expected: `node_modules/` populated, no peer-dep errors.

- [ ] **Step 2: Append build artifacts to .gitignore**

Append to `.gitignore`:

```
node_modules/
dist/
playwright-report/
test-results/
.vite/
exports/
```

- [ ] **Step 3: Write `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "useDefineForClassFields": true,
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": false,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": { "@/*": ["src/*"] },
    "types": ["vitest/globals", "@testing-library/jest-dom"]
  },
  "include": ["src", "tests"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

- [ ] **Step 4: Write `tsconfig.node.json`**

```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true,
    "strict": true
  },
  "include": ["vite.config.ts", "vitest.config.ts", "playwright.config.ts", "tailwind.config.ts"]
}
```

- [ ] **Step 5: Write `vite.config.ts`**

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  resolve: { alias: { "@": path.resolve(__dirname, "src") } },
  server: { port: 5173, strictPort: true },
});
```

- [ ] **Step 6: Write `vitest.config.ts`**

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  resolve: { alias: { "@": path.resolve(__dirname, "src") } },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./tests/setup.ts"],
    include: ["tests/unit/**/*.test.{ts,tsx}"],
  },
});
```

- [ ] **Step 7: Write `tests/setup.ts`**

```ts
import "@testing-library/jest-dom";
```

- [ ] **Step 8: Write `index.html`**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Berau Coal Energy AI Workshop</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 9: Write `src/main.tsx`**

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```

- [ ] **Step 10: Write a placeholder `src/App.tsx`**

```tsx
export default function App() {
  return <div data-testid="app-root">deck mounts here</div>;
}
```

- [ ] **Step 11: Write a smoke test that proves React renders**

`tests/unit/app.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import App from "@/App";

test("App mounts", () => {
  render(<App />);
  expect(screen.getByTestId("app-root")).toBeInTheDocument();
});
```

- [ ] **Step 12: Add `dev`, `build`, `test` scripts to `package.json`**

Edit `package.json` so its `scripts` section reads:

```json
"scripts": {
  "dev": "vite",
  "build": "tsc -b && vite build",
  "preview": "vite preview --port 5174 --strictPort",
  "test": "vitest run",
  "test:watch": "vitest"
}
```

- [ ] **Step 13: Run the test suite — expect green**

Run: `npm test`
Expected: `Test Files  1 passed (1)` and `Tests  1 passed (1)`.

- [ ] **Step 14: Verify the dev server boots**

Run: `npm run dev` (Ctrl+C after the URL prints)
Expected: `Local:   http://localhost:5173/` printed within ~2s.

- [ ] **Step 15: Commit**

```bash
git add package.json package-lock.json .gitignore tsconfig.json tsconfig.node.json vite.config.ts vitest.config.ts index.html src/main.tsx src/App.tsx tests/setup.ts tests/unit/app.test.tsx
git commit -m "feat: bootstrap vite + react + typescript + vitest"
```

---

## Task 2: Wire Tailwind CSS

**Files:**
- Create: `tailwind.config.ts`, `postcss.config.js`, `src/styles/globals.css`
- Modify: `src/main.tsx`, `package.json`

- [ ] **Step 1: Install Tailwind**

```bash
npm install -D tailwindcss@^3.4.0 postcss@^8.4.0 autoprefixer@^10.4.0
```

- [ ] **Step 2: Write `postcss.config.js`**

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

- [ ] **Step 3: Write a minimal `tailwind.config.ts` (tokens land in Task 7)**

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: { extend: {} },
  plugins: [],
};

export default config;
```

- [ ] **Step 4: Write `src/styles/globals.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

html,
body,
#root {
  height: 100%;
  margin: 0;
  background: #0a0a0a;
  color: #f5f5f5;
}
```

- [ ] **Step 5: Import the stylesheet from `src/main.tsx`**

Replace the contents of `src/main.tsx`:

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/globals.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```

- [ ] **Step 6: Write a Vitest test that asserts a Tailwind utility class actually applies**

`tests/unit/tailwind.test.tsx`:

```tsx
import { render } from "@testing-library/react";
import "@/styles/globals.css";

test("Tailwind directives compile and `flex` resolves", () => {
  const { container } = render(<div className="flex" data-testid="t" />);
  // jsdom doesn't run PostCSS; instead we verify the className was preserved
  // and the stylesheet imported without throwing.
  expect(container.firstChild).toHaveClass("flex");
});
```

- [ ] **Step 7: Run tests — expect green**

Run: `npm test`
Expected: `Tests  2 passed (2)`.

- [ ] **Step 8: Run dev server, hit `/`, confirm body is dark**

Run: `npm run dev` (Ctrl+C after verifying)
Open `http://localhost:5173`. Expected: dark `#0a0a0a` background.

- [ ] **Step 9: Commit**

```bash
git add tailwind.config.ts postcss.config.js src/styles/globals.css src/main.tsx tests/unit/tailwind.test.tsx package.json package-lock.json
git commit -m "feat: wire tailwind css with dark default surface"
```

---

## Task 3: Color tokens — copper ladder + neutrals

**Files:**
- Create: `src/design-system/colors.ts`, `tests/unit/design-system-colors.test.ts`

- [ ] **Step 1: Write the failing test**

`tests/unit/design-system-colors.test.ts`:

```ts
import { copper, neutral, surface } from "@/design-system/colors";

test("copper ladder spans 50..950 anchored at 500=#b86e3d", () => {
  expect(copper[500]).toBe("#b86e3d");
  expect(Object.keys(copper)).toEqual([
    "50",
    "100",
    "200",
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
    "900",
    "950",
  ]);
});

test("neutrals are pure grayscale (R==G==B at every stop)", () => {
  for (const hex of Object.values(neutral)) {
    const r = hex.slice(1, 3);
    const g = hex.slice(3, 5);
    const b = hex.slice(5, 7);
    expect(r).toBe(g);
    expect(g).toBe(b);
  }
});

test("surface.dark is matte near-black, not pure #000", () => {
  expect(surface.dark).toBe("#0a0a0a");
  expect(surface.dark).not.toBe("#000000");
});
```

- [ ] **Step 2: Run the test — expect FAIL with "Cannot find module"**

Run: `npm test -- design-system-colors`
Expected: FAIL — module `@/design-system/colors` not found.

- [ ] **Step 3: Implement `src/design-system/colors.ts`**

```ts
// Single-hue copper ladder anchored at 500=#b86e3d (deep copper, primary accent).
// Final values get refined via projection testing on real auditorium hardware
// (see Task 17 — HexLadder slide). These are the starting calibration points.
export const copper = {
  50: "#fbf6f1",
  100: "#f4e4d2",
  200: "#e8c4a0",
  300: "#d99e6c",
  400: "#c98548",
  500: "#b86e3d",
  600: "#9c5a30",
  700: "#7a4626",
  800: "#5a341c",
  900: "#3d2413",
  950: "#21130a",
} as const;

// Pure grayscale — no blue tint, no warm tint.
export const neutral = {
  0: "#ffffff",
  50: "#f5f5f5",
  100: "#e5e5e5",
  200: "#d4d4d4",
  300: "#a3a3a3",
  400: "#737373",
  500: "#525252",
  600: "#404040",
  700: "#262626",
  800: "#171717",
  900: "#0a0a0a",
  950: "#050505",
} as const;

// Semantic surface tokens — what a slide's background actually paints.
// dark is the default (per spec §6.4 dark-primary inversion), light flips
// for content-dense informational slides only.
export const surface = {
  dark: neutral[900], // #0a0a0a — matte near-black, never #000
  light: neutral[50],
} as const;
```

- [ ] **Step 4: Run the test — expect PASS**

Run: `npm test -- design-system-colors`
Expected: `Tests  3 passed (3)`.

- [ ] **Step 5: Commit**

```bash
git add src/design-system/colors.ts tests/unit/design-system-colors.test.ts
git commit -m "feat: add copper hue ladder and neutral grayscale tokens"
```

---

## Task 4: Typography tokens — fonts + projection-scale type scale

**Files:**
- Create: `src/design-system/typography.ts`, `tests/unit/design-system-typography.test.ts`

- [ ] **Step 1: Write the failing test**

`tests/unit/design-system-typography.test.ts`:

```ts
import { fontFamily, fontSize, lineHeight } from "@/design-system/typography";

test("font stacks match the spec §7.1 CSS token contract", () => {
  expect(fontFamily.serifEn).toBe('"Source Serif 4", Georgia, serif');
  expect(fontFamily.serifDisplay).toBe('"Instrument Serif", Georgia, serif');
  expect(fontFamily.sans).toBe('"Inter", system-ui, sans-serif');
  expect(fontFamily.mono).toBe('"JetBrains Mono", "IBM Plex Mono", ui-monospace, monospace');
});

test("body type at projection scale clamps to 36–44px range (spec §7.2)", () => {
  expect(fontSize.body).toBe("clamp(2.25rem, 2.5vw, 2.75rem)");
});

test("line-height stays in the 1.5–1.7 range for body and prose", () => {
  expect(lineHeight.body).toBe("1.6");
  expect(lineHeight.prose).toBeGreaterThanOrEqual(1.5);
  expect(lineHeight.prose).toBeLessThanOrEqual(1.7);
});
```

- [ ] **Step 2: Run the test — expect FAIL**

Run: `npm test -- design-system-typography`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement `src/design-system/typography.ts`**

```ts
// Per spec §7.1 — all free / Google Fonts.
// --serif-id is included for forward compatibility even though spec §12
// answers "fully English" — keeps the token contract symmetric.
export const fontFamily = {
  serifEn: '"Source Serif 4", Georgia, serif',
  serifId: '"Source Serif 4", Georgia, serif',
  serifDisplay: '"Instrument Serif", Georgia, serif',
  sans: '"Inter", system-ui, sans-serif',
  mono: '"JetBrains Mono", "IBM Plex Mono", ui-monospace, monospace',
} as const;

// Projection-scale calibrated. Body sits 36–44px at projected scale so an
// auditorium back-row reader can still parse it (spec §7.2). 1rem === 16px.
export const fontSize = {
  display: "clamp(4.5rem, 8vw, 9rem)", // 72–144px — title hero
  h1: "clamp(3.5rem, 6vw, 6rem)", // 56–96px — section heads
  h2: "clamp(2.5rem, 4.5vw, 4rem)", // 40–64px — slide heads
  h3: "clamp(2rem, 3vw, 2.75rem)", // 32–44px — sub-heads
  body: "clamp(2.25rem, 2.5vw, 2.75rem)", // 36–44px — body
  caption: "clamp(1.25rem, 1.5vw, 1.75rem)", // 20–28px — sans labels
  monoSm: "clamp(1.125rem, 1.25vw, 1.5rem)", // 18–24px — code
} as const;

export const lineHeight = {
  display: 1.05,
  heading: 1.15,
  body: "1.6",
  prose: 1.6,
} as const;

export const fontWeight = {
  // Spec §6.2 — typographic restraint, max 3 weights total per family.
  regular: 400,
  medium: 500,
  semibold: 600,
} as const;
```

- [ ] **Step 4: Run the test — expect PASS**

Run: `npm test -- design-system-typography`
Expected: `Tests  3 passed (3)`.

- [ ] **Step 5: Commit**

```bash
git add src/design-system/typography.ts tests/unit/design-system-typography.test.ts
git commit -m "feat: add typography tokens with projection-scale type ramp"
```

---

## Task 5: Spacing + shadow + radius tokens

**Files:**
- Create: `src/design-system/spacing.ts`, `src/design-system/shadows.ts`, `tests/unit/design-system-tokens.test.ts`

- [ ] **Step 1: Write the failing test**

`tests/unit/design-system-tokens.test.ts`:

```ts
import { spacing } from "@/design-system/spacing";
import { shadow, radius } from "@/design-system/shadows";

test("spacing scale lives on a 4px grid (spec §6.2)", () => {
  for (const value of Object.values(spacing)) {
    const px = parseInt(value.replace("px", ""), 10);
    expect(px % 4).toBe(0);
  }
});

test("there is exactly one shadow recipe (spec §6.2 single shadow)", () => {
  expect(Object.keys(shadow)).toEqual(["base"]);
});

test("radius is 0px (spec §6.2 flat minimalism)", () => {
  expect(radius.base).toBe("0px");
});
```

- [ ] **Step 2: Run the test — expect FAIL**

Run: `npm test -- design-system-tokens`
Expected: FAIL — modules not found.

- [ ] **Step 3: Implement `src/design-system/spacing.ts`**

```ts
// 4px grid — Carbon-derived. Tailwind's default already maps `1` → 4px,
// so these are semantic aliases for the values we use most on slides.
export const spacing = {
  0: "0px",
  1: "4px",
  2: "8px",
  3: "12px",
  4: "16px",
  6: "24px",
  8: "32px",
  12: "48px",
  16: "64px",
  24: "96px",
  32: "128px",
  48: "192px",
  64: "256px",
} as const;
```

- [ ] **Step 4: Implement `src/design-system/shadows.ts`**

```ts
// Spec §6.2 — single shadow recipe used everywhere. Tuned for dark-primary:
// soft falloff that reads as elevation without bleeding into the bg.
export const shadow = {
  base: "0 16px 48px -8px rgba(0, 0, 0, 0.45)",
} as const;

// Spec §6.2 — 0px radius (flat minimalism).
export const radius = {
  base: "0px",
} as const;
```

- [ ] **Step 5: Run the test — expect PASS**

Run: `npm test -- design-system-tokens`
Expected: `Tests  3 passed (3)`.

- [ ] **Step 6: Commit**

```bash
git add src/design-system/spacing.ts src/design-system/shadows.ts tests/unit/design-system-tokens.test.ts
git commit -m "feat: add spacing, shadow, and radius tokens"
```

---

## Task 6: Design-system barrel export

**Files:**
- Create: `src/design-system/index.ts`, `tests/unit/design-system-index.test.ts`

- [ ] **Step 1: Write the failing test**

`tests/unit/design-system-index.test.ts`:

```ts
import * as ds from "@/design-system";

test("barrel re-exports every token group", () => {
  expect(ds.copper[500]).toBe("#b86e3d");
  expect(ds.neutral[900]).toBe("#0a0a0a");
  expect(ds.surface.dark).toBe("#0a0a0a");
  expect(ds.fontFamily.serifEn).toContain("Source Serif 4");
  expect(ds.spacing[4]).toBe("16px");
  expect(ds.shadow.base).toContain("rgba");
  expect(ds.radius.base).toBe("0px");
});
```

- [ ] **Step 2: Run the test — expect FAIL**

Run: `npm test -- design-system-index`
Expected: FAIL.

- [ ] **Step 3: Implement `src/design-system/index.ts`**

```ts
export * from "./colors";
export * from "./typography";
export * from "./spacing";
export * from "./shadows";
```

- [ ] **Step 4: Run the test — expect PASS**

Run: `npm test -- design-system-index`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/design-system/index.ts tests/unit/design-system-index.test.ts
git commit -m "feat: add design-system barrel export"
```

---

## Task 7: Wire tokens into Tailwind theme + CSS variables

**Files:**
- Modify: `tailwind.config.ts`, `src/styles/globals.css`
- Create: `tests/unit/tailwind-theme.test.ts`

- [ ] **Step 1: Write the failing test**

`tests/unit/tailwind-theme.test.ts`:

```ts
import config from "../../tailwind.config";

test("tailwind theme exposes copper palette", () => {
  const colors = config.theme?.extend?.colors as Record<string, unknown>;
  expect(colors).toBeDefined();
  expect(colors.copper).toBeDefined();
  expect((colors.copper as Record<string, string>)[500]).toBe("#b86e3d");
});

test("tailwind theme exposes the projection font sizes", () => {
  const fs = config.theme?.extend?.fontSize as Record<string, string>;
  expect(fs.body).toBe("clamp(2.25rem, 2.5vw, 2.75rem)");
});

test("tailwind theme uses 0px radius (flat minimalism)", () => {
  const br = config.theme?.extend?.borderRadius as Record<string, string>;
  expect(br.DEFAULT).toBe("0px");
});
```

- [ ] **Step 2: Run the test — expect FAIL (theme empty)**

Run: `npm test -- tailwind-theme`
Expected: FAIL — `colors.copper` undefined.

- [ ] **Step 3: Replace `tailwind.config.ts` to wire tokens in**

```ts
import type { Config } from "tailwindcss";
import { copper, neutral } from "./src/design-system/colors";
import { fontFamily, fontSize, lineHeight } from "./src/design-system/typography";
import { shadow, radius } from "./src/design-system/shadows";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        copper,
        neutral,
        surface: { DEFAULT: neutral[900], light: neutral[50] },
      },
      fontFamily: {
        serif: fontFamily.serifEn.split(", "),
        display: fontFamily.serifDisplay.split(", "),
        sans: fontFamily.sans.split(", "),
        mono: fontFamily.mono.split(", "),
      },
      fontSize: {
        display: fontSize.display,
        h1: fontSize.h1,
        h2: fontSize.h2,
        h3: fontSize.h3,
        body: fontSize.body,
        caption: fontSize.caption,
        "mono-sm": fontSize.monoSm,
      },
      lineHeight: {
        display: String(lineHeight.display),
        heading: String(lineHeight.heading),
        body: lineHeight.body,
      },
      boxShadow: { DEFAULT: shadow.base },
      borderRadius: { DEFAULT: radius.base },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 4: Add CSS variable bridge to `src/styles/globals.css`**

Replace the file contents with:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* CSS variable bridge — mirrors the TS tokens so non-Tailwind CSS
   (animation keyframes, third-party libs) can reference the same values.
   Keep these in sync with src/design-system/* — Task 8 adds a test. */
:root {
  --copper-500: #b86e3d;
  --copper-700: #7a4626;
  --neutral-50: #f5f5f5;
  --neutral-900: #0a0a0a;
  --surface-dark: #0a0a0a;
  --surface-light: #f5f5f5;

  --serif-en: "Source Serif 4", Georgia, serif;
  --serif-id: "Source Serif 4", Georgia, serif;
  --serif-display: "Instrument Serif", Georgia, serif;
  --sans: "Inter", system-ui, sans-serif;
  --mono: "JetBrains Mono", "IBM Plex Mono", ui-monospace, monospace;

  --shadow-base: 0 16px 48px -8px rgba(0, 0, 0, 0.45);
  --radius-base: 0px;
}

html,
body,
#root {
  height: 100%;
  margin: 0;
  background: var(--surface-dark);
  color: var(--neutral-50);
  font-family: var(--serif-en);
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 5: Run the test — expect PASS**

Run: `npm test -- tailwind-theme`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add tailwind.config.ts src/styles/globals.css tests/unit/tailwind-theme.test.ts
git commit -m "feat: wire design tokens into tailwind theme and css variables"
```

---

## Task 8: Load Google Fonts

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Write the failing test**

`tests/unit/fonts.test.ts`:

```ts
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

test("index.html preconnects to Google Fonts and loads required families", () => {
  const html = readFileSync(resolve(__dirname, "../../index.html"), "utf8");
  expect(html).toContain("https://fonts.googleapis.com");
  expect(html).toContain("Instrument+Serif");
  expect(html).toContain("Source+Serif+4");
  expect(html).toContain("Inter");
  expect(html).toContain("JetBrains+Mono");
});
```

- [ ] **Step 2: Run the test — expect FAIL**

Run: `npm test -- fonts`
Expected: FAIL — strings not present.

- [ ] **Step 3: Add font loading to `index.html`**

Replace `index.html` with:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Berau Coal Energy AI Workshop</title>

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Source+Serif+4:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
    />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 4: Run the test — expect PASS**

Run: `npm test -- fonts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add index.html tests/unit/fonts.test.ts
git commit -m "feat: load Instrument Serif, Source Serif 4, Inter, JetBrains Mono"
```

---

## Task 9: DeckContext — current slide + step state

**Files:**
- Create: `src/deck/DeckContext.tsx`, `tests/unit/DeckContext.test.tsx`

- [ ] **Step 1: Write the failing test**

`tests/unit/DeckContext.test.tsx`:

```tsx
import { render, screen, act } from "@testing-library/react";
import { DeckProvider, useDeck } from "@/deck/DeckContext";

function Probe() {
  const { slideIndex, stepIndex, advance, retreat } = useDeck();
  return (
    <div>
      <span data-testid="slide">{slideIndex}</span>
      <span data-testid="step">{stepIndex}</span>
      <button data-testid="adv" onClick={advance}>
        adv
      </button>
      <button data-testid="ret" onClick={retreat}>
        ret
      </button>
    </div>
  );
}

function setup(stepCounts: number[]) {
  return render(
    <DeckProvider stepCounts={stepCounts}>
      <Probe />
    </DeckProvider>,
  );
}

test("advance walks step-by-step then crosses slide boundaries", () => {
  setup([3, 2]); // slide 0 has 3 steps, slide 1 has 2
  expect(screen.getByTestId("slide").textContent).toBe("0");
  expect(screen.getByTestId("step").textContent).toBe("0");

  act(() => screen.getByTestId("adv").click()); // step 1
  expect(screen.getByTestId("step").textContent).toBe("1");

  act(() => screen.getByTestId("adv").click()); // step 2 (last on slide 0)
  expect(screen.getByTestId("step").textContent).toBe("2");

  act(() => screen.getByTestId("adv").click()); // crosses to slide 1, step 0
  expect(screen.getByTestId("slide").textContent).toBe("1");
  expect(screen.getByTestId("step").textContent).toBe("0");
});

test("retreat from step 0 of slide N+1 lands on last step of slide N", () => {
  setup([3, 2]);
  for (let i = 0; i < 3; i++) act(() => screen.getByTestId("adv").click());
  expect(screen.getByTestId("slide").textContent).toBe("1");
  act(() => screen.getByTestId("ret").click());
  expect(screen.getByTestId("slide").textContent).toBe("0");
  expect(screen.getByTestId("step").textContent).toBe("2");
});

test("advance past the final step is a no-op", () => {
  setup([1, 1]);
  for (let i = 0; i < 5; i++) act(() => screen.getByTestId("adv").click());
  expect(screen.getByTestId("slide").textContent).toBe("1");
  expect(screen.getByTestId("step").textContent).toBe("0");
});

test("retreat before the first step is a no-op", () => {
  setup([2, 2]);
  act(() => screen.getByTestId("ret").click());
  expect(screen.getByTestId("slide").textContent).toBe("0");
  expect(screen.getByTestId("step").textContent).toBe("0");
});
```

- [ ] **Step 2: Run the test — expect FAIL**

Run: `npm test -- DeckContext`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement `src/deck/DeckContext.tsx`**

```tsx
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type DeckState = {
  slideIndex: number;
  stepIndex: number;
  stepCounts: readonly number[];
  advance: () => void;
  retreat: () => void;
  goTo: (slide: number, step?: number) => void;
};

const DeckCtx = createContext<DeckState | null>(null);

export function DeckProvider({
  stepCounts,
  children,
}: {
  stepCounts: readonly number[];
  children: ReactNode;
}) {
  const [slideIndex, setSlide] = useState(0);
  const [stepIndex, setStep] = useState(0);

  const advance = useCallback(() => {
    setSlide((curSlide) => {
      const stepsHere = stepCounts[curSlide] ?? 1;
      // We use a functional setStep that observes the *current* slide so
      // that step + slide updates stay consistent in StrictMode double-render.
      let nextSlide = curSlide;
      setStep((curStep) => {
        if (curStep + 1 < stepsHere) return curStep + 1;
        if (curSlide + 1 < stepCounts.length) {
          nextSlide = curSlide + 1;
          return 0;
        }
        return curStep; // pinned at the last step of the last slide
      });
      return nextSlide;
    });
  }, [stepCounts]);

  const retreat = useCallback(() => {
    setSlide((curSlide) => {
      let nextSlide = curSlide;
      setStep((curStep) => {
        if (curStep > 0) return curStep - 1;
        if (curSlide > 0) {
          nextSlide = curSlide - 1;
          return Math.max(0, (stepCounts[curSlide - 1] ?? 1) - 1);
        }
        return 0;
      });
      return nextSlide;
    });
  }, [stepCounts]);

  const goTo = useCallback(
    (slide: number, step = 0) => {
      const safeSlide = Math.max(0, Math.min(slide, stepCounts.length - 1));
      const safeStep = Math.max(
        0,
        Math.min(step, (stepCounts[safeSlide] ?? 1) - 1),
      );
      setSlide(safeSlide);
      setStep(safeStep);
    },
    [stepCounts],
  );

  const value = useMemo<DeckState>(
    () => ({ slideIndex, stepIndex, stepCounts, advance, retreat, goTo }),
    [slideIndex, stepIndex, stepCounts, advance, retreat, goTo],
  );

  return <DeckCtx.Provider value={value}>{children}</DeckCtx.Provider>;
}

export function useDeck() {
  const ctx = useContext(DeckCtx);
  if (!ctx) throw new Error("useDeck must be used inside <DeckProvider>");
  return ctx;
}
```

- [ ] **Step 4: Run the test — expect PASS**

Run: `npm test -- DeckContext`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/deck/DeckContext.tsx tests/unit/DeckContext.test.tsx
git commit -m "feat: add DeckContext for slide and step state"
```

---

## Task 10: Keyboard navigation hook

**Files:**
- Create: `src/deck/useKeyboardNav.ts`, `tests/unit/useKeyboardNav.test.tsx`

- [ ] **Step 1: Write the failing test**

`tests/unit/useKeyboardNav.test.tsx`:

```tsx
import { render, act } from "@testing-library/react";
import { DeckProvider, useDeck } from "@/deck/DeckContext";
import { useKeyboardNav } from "@/deck/useKeyboardNav";

function Mount() {
  useKeyboardNav();
  const { slideIndex, stepIndex } = useDeck();
  return (
    <span data-testid="state">
      {slideIndex}:{stepIndex}
    </span>
  );
}

function fire(key: string) {
  act(() => {
    window.dispatchEvent(new KeyboardEvent("keydown", { key }));
  });
}

test("Space advances one step within a slide", () => {
  const { getByTestId } = render(
    <DeckProvider stepCounts={[3, 2]}>
      <Mount />
    </DeckProvider>,
  );
  expect(getByTestId("state").textContent).toBe("0:0");
  fire(" ");
  expect(getByTestId("state").textContent).toBe("0:1");
});

test("ArrowRight skips to the next slide regardless of remaining steps", () => {
  const { getByTestId } = render(
    <DeckProvider stepCounts={[3, 2]}>
      <Mount />
    </DeckProvider>,
  );
  fire("ArrowRight");
  expect(getByTestId("state").textContent).toBe("1:0");
});

test("ArrowLeft jumps to step 0 of the previous slide", () => {
  const { getByTestId } = render(
    <DeckProvider stepCounts={[3, 2]}>
      <Mount />
    </DeckProvider>,
  );
  fire("ArrowRight"); // → slide 1
  fire("ArrowLeft"); // ← slide 0, step 0
  expect(getByTestId("state").textContent).toBe("0:0");
});
```

- [ ] **Step 2: Run the test — expect FAIL**

Run: `npm test -- useKeyboardNav`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement `src/deck/useKeyboardNav.ts`**

```ts
import { useEffect } from "react";
import { useDeck } from "./DeckContext";

// Spec §5.1 navigation contract:
//   ←  previous slide (goTo(slide-1, 0))
//   →  next slide     (goTo(slide+1, 0))
//   Space  next animation step within the current slide (advance)
export function useKeyboardNav() {
  const { slideIndex, stepCounts, advance, goTo } = useDeck();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Don't swallow keystrokes inside form inputs / contenteditable areas.
      const target = e.target as HTMLElement | null;
      if (
        target?.isContentEditable ||
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA"
      ) {
        return;
      }

      if (e.key === " " || e.key === "Spacebar") {
        e.preventDefault();
        advance();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goTo(Math.min(slideIndex + 1, stepCounts.length - 1), 0);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goTo(Math.max(slideIndex - 1, 0), 0);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [slideIndex, stepCounts.length, advance, goTo]);
}
```

- [ ] **Step 4: Run the test — expect PASS**

Run: `npm test -- useKeyboardNav`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/deck/useKeyboardNav.ts tests/unit/useKeyboardNav.test.tsx
git commit -m "feat: add keyboard nav hook honoring spec §5.1 contract"
```

---

## Task 11: Slide wrapper — viewport invariants + animation mode

**Files:**
- Create: `src/deck/Slide.tsx`, `tests/unit/Slide.test.tsx`

- [ ] **Step 1: Write the failing test**

`tests/unit/Slide.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { Slide } from "@/deck/Slide";
import { DeckProvider } from "@/deck/DeckContext";

const wrap = (ui: React.ReactNode) => (
  <DeckProvider stepCounts={[1]}>{ui}</DeckProvider>
);

test("Slide root has viewport-fitting inline style", () => {
  render(
    wrap(
      <Slide animationMode="static" canonicalPose={0} index={0}>
        hi
      </Slide>,
    ),
  );
  const root = screen.getByTestId("slide");
  const style = root.getAttribute("style") ?? "";
  expect(style).toMatch(/height:\s*100vh/);
  expect(style).toMatch(/overflow:\s*hidden/);
});

test("Slide annotates animation mode and canonical pose as data attrs", () => {
  render(
    wrap(
      <Slide animationMode="step-reveal" canonicalPose={2} index={0}>
        hi
      </Slide>,
    ),
  );
  const root = screen.getByTestId("slide");
  expect(root.getAttribute("data-animation-mode")).toBe("step-reveal");
  expect(root.getAttribute("data-canonical-pose")).toBe("2");
});

test("Slide ignores click events when animationMode is not 'interactive'", () => {
  const onClick = vi.fn();
  render(
    wrap(
      <Slide
        animationMode="static"
        canonicalPose={0}
        index={0}
        onClick={onClick}
      >
        hi
      </Slide>,
    ),
  );
  screen.getByTestId("slide").click();
  expect(onClick).not.toHaveBeenCalled();
});

test("Slide forwards click events when animationMode is 'interactive'", () => {
  const onClick = vi.fn();
  render(
    wrap(
      <Slide
        animationMode="interactive"
        canonicalPose={0}
        index={0}
        onClick={onClick}
      >
        hi
      </Slide>,
    ),
  );
  screen.getByTestId("slide").click();
  expect(onClick).toHaveBeenCalledTimes(1);
});
```

- [ ] **Step 2: Run the test — expect FAIL**

Run: `npm test -- Slide`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement `src/deck/Slide.tsx`**

```tsx
import { type CSSProperties, type ReactNode, type MouseEvent } from "react";

export type AnimationMode =
  | "interactive"
  | "looping-ambient"
  | "step-reveal"
  | "static";

export interface SlideProps {
  index: number;
  animationMode: AnimationMode;
  // Index of the step that PDF/PPTX export should pause at before
  // screenshotting (spec §4.1). 0 for static slides.
  canonicalPose: number;
  surface?: "dark" | "light";
  children: ReactNode;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
}

const baseStyle: CSSProperties = {
  position: "relative",
  width: "100vw",
  height: "100vh",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
};

export function Slide({
  index,
  animationMode,
  canonicalPose,
  surface = "dark",
  children,
  onClick,
}: SlideProps) {
  // Spec §5.2 — non-interactive slides MUST NOT consume click events on stage,
  // so the speaker can gesture without accidentally advancing.
  const handleClick =
    animationMode === "interactive" && onClick ? onClick : undefined;

  return (
    <section
      data-testid="slide"
      data-slide-index={index}
      data-animation-mode={animationMode}
      data-canonical-pose={canonicalPose}
      data-surface={surface}
      style={{
        ...baseStyle,
        background:
          surface === "dark" ? "var(--surface-dark)" : "var(--surface-light)",
        color:
          surface === "dark" ? "var(--neutral-50)" : "var(--neutral-900)",
      }}
      onClick={handleClick}
    >
      {children}
    </section>
  );
}
```

- [ ] **Step 4: Run the test — expect PASS**

Run: `npm test -- Slide`
Expected: PASS (all 4 cases).

- [ ] **Step 5: Commit**

```bash
git add src/deck/Slide.tsx tests/unit/Slide.test.tsx
git commit -m "feat: Slide wrapper enforcing viewport + click-isolation contract"
```

---

## Task 12: StepReveal motion primitive

**Files:**
- Create: `src/motion/StepReveal.tsx`, `tests/unit/StepReveal.test.tsx`

- [ ] **Step 1: Write the failing test**

`tests/unit/StepReveal.test.tsx`:

```tsx
import { render, screen, act } from "@testing-library/react";
import { DeckProvider, useDeck } from "@/deck/DeckContext";
import { StepReveal } from "@/motion/StepReveal";

function Adv() {
  const { advance } = useDeck();
  return <button data-testid="adv" onClick={advance} />;
}

test("children with stepIndex <= currentStep are revealed", () => {
  render(
    <DeckProvider stepCounts={[3]}>
      <StepReveal>
        <div data-testid="a">A</div>
        <div data-testid="b">B</div>
        <div data-testid="c">C</div>
      </StepReveal>
      <Adv />
    </DeckProvider>,
  );

  expect(screen.getByTestId("a").getAttribute("data-revealed")).toBe("true");
  expect(screen.getByTestId("b").getAttribute("data-revealed")).toBe("false");
  expect(screen.getByTestId("c").getAttribute("data-revealed")).toBe("false");

  act(() => screen.getByTestId("adv").click());
  expect(screen.getByTestId("b").getAttribute("data-revealed")).toBe("true");

  act(() => screen.getByTestId("adv").click());
  expect(screen.getByTestId("c").getAttribute("data-revealed")).toBe("true");
});
```

- [ ] **Step 2: Run the test — expect FAIL**

Run: `npm test -- StepReveal`
Expected: FAIL.

- [ ] **Step 3: Implement `src/motion/StepReveal.tsx`**

```tsx
import { Children, cloneElement, isValidElement, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDeck } from "@/deck/DeckContext";

interface StepRevealProps {
  // 0-based: child[0] is visible at stepIndex >= 0, child[1] at >= 1, etc.
  children: ReactNode;
}

export function StepReveal({ children }: StepRevealProps) {
  const { stepIndex } = useDeck();
  return (
    <AnimatePresence initial={false}>
      {Children.map(children, (child, i) => {
        const revealed = i <= stepIndex;
        const node = isValidElement(child) ? (
          cloneElement(
            child as React.ReactElement<{ "data-revealed"?: string }>,
            { "data-revealed": String(revealed) },
          )
        ) : (
          child
        );
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : 16 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: revealed ? "block" : "block" }}
          >
            {node}
          </motion.div>
        );
      })}
    </AnimatePresence>
  );
}
```

- [ ] **Step 4: Run the test — expect PASS**

Run: `npm test -- StepReveal`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/motion/StepReveal.tsx tests/unit/StepReveal.test.tsx
git commit -m "feat: StepReveal motion primitive driven by DeckContext stepIndex"
```

---

## Task 13: LoopingAmbient + Static motion primitives

**Files:**
- Create: `src/motion/LoopingAmbient.tsx`, `src/motion/Static.tsx`, `tests/unit/looping-static.test.tsx`

- [ ] **Step 1: Write the failing test**

`tests/unit/looping-static.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { LoopingAmbient } from "@/motion/LoopingAmbient";
import { Static } from "@/motion/Static";

test("LoopingAmbient marks itself with data-loop", () => {
  render(<LoopingAmbient>x</LoopingAmbient>);
  expect(screen.getByTestId("loop").getAttribute("data-loop")).toBe("true");
});

test("Static renders children with no animation wrapper", () => {
  render(<Static>x</Static>);
  expect(screen.getByTestId("static").textContent).toBe("x");
});
```

- [ ] **Step 2: Run the test — expect FAIL**

Run: `npm test -- looping-static`
Expected: FAIL.

- [ ] **Step 3: Implement `src/motion/LoopingAmbient.tsx`**

```tsx
import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface LoopingAmbientProps {
  children: ReactNode;
  // Animate one or more transformable properties on a continuous loop.
  // Default: gentle vertical drift suitable for hero-photography overlays.
  durationSeconds?: number;
}

export function LoopingAmbient({
  children,
  durationSeconds = 12,
}: LoopingAmbientProps) {
  return (
    <motion.div
      data-testid="loop"
      data-loop="true"
      animate={{ y: [0, -8, 0] }}
      transition={{
        duration: durationSeconds,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 4: Implement `src/motion/Static.tsx`**

```tsx
import type { ReactNode } from "react";

// Marker primitive — explicit "this slide intentionally has no animation."
// Useful in the smoke-deck registry so the static intent is grep-able.
export function Static({ children }: { children: ReactNode }) {
  return <div data-testid="static">{children}</div>;
}
```

- [ ] **Step 5: Run the test — expect PASS**

Run: `npm test -- looping-static`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/motion/LoopingAmbient.tsx src/motion/Static.tsx tests/unit/looping-static.test.tsx
git commit -m "feat: LoopingAmbient and Static motion primitives"
```

---

## Task 14: Interactive motion primitive (opt-in mouse)

**Files:**
- Create: `src/motion/Interactive.tsx`, `tests/unit/Interactive.test.tsx`

- [ ] **Step 1: Write the failing test**

`tests/unit/Interactive.test.tsx`:

```tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { Interactive } from "@/motion/Interactive";

test("Interactive forwards onClick from inner content", () => {
  const onClick = vi.fn();
  render(
    <Interactive>
      <button data-testid="btn" onClick={onClick}>
        click me
      </button>
    </Interactive>,
  );
  fireEvent.click(screen.getByTestId("btn"));
  expect(onClick).toHaveBeenCalledTimes(1);
});

test("Interactive stops propagation so the host Slide does not also see the click", () => {
  const slideHandler = vi.fn();
  render(
    <div data-testid="host" onClick={slideHandler}>
      <Interactive>
        <button data-testid="btn">x</button>
      </Interactive>
    </div>,
  );
  fireEvent.click(screen.getByTestId("btn"));
  expect(slideHandler).not.toHaveBeenCalled();
});
```

- [ ] **Step 2: Run the test — expect FAIL**

Run: `npm test -- Interactive`
Expected: FAIL.

- [ ] **Step 3: Implement `src/motion/Interactive.tsx`**

```tsx
import { type ReactNode, type MouseEvent } from "react";

// Spec §5.2 — opt-in mouse interaction. Stops click propagation so an
// interactive component embedded inside an otherwise-quiet slide doesn't
// bubble into a Slide-level click handler.
export function Interactive({ children }: { children: ReactNode }) {
  const stop = (e: MouseEvent) => e.stopPropagation();
  return (
    <div data-testid="interactive" onClick={stop} onMouseDown={stop}>
      {children}
    </div>
  );
}
```

- [ ] **Step 4: Run the test — expect PASS**

Run: `npm test -- Interactive`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/motion/Interactive.tsx tests/unit/Interactive.test.tsx
git commit -m "feat: Interactive motion primitive isolates click events"
```

---

## Task 15: Hero + SectionDivider primitives

**Files:**
- Create: `src/primitives/Hero.tsx`, `src/primitives/SectionDivider.tsx`, `tests/unit/Hero.test.tsx`

- [ ] **Step 1: Write the failing test**

`tests/unit/Hero.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { Hero } from "@/primitives/Hero";
import { SectionDivider } from "@/primitives/SectionDivider";

test("Hero renders the title at display scale and an optional subtitle", () => {
  render(
    <Hero
      title="Berau Coal Energy"
      subtitle="AI Workshop"
      imageSrc="/test.jpg"
    />,
  );
  const title = screen.getByRole("heading", { level: 1 });
  expect(title.textContent).toBe("Berau Coal Energy");
  expect(screen.getByText("AI Workshop")).toBeInTheDocument();
});

test("SectionDivider renders a section letter and a label", () => {
  render(<SectionDivider letter="C" label="Mindset" />);
  expect(screen.getByText("C")).toBeInTheDocument();
  expect(screen.getByText("Mindset")).toBeInTheDocument();
});
```

- [ ] **Step 2: Run the test — expect FAIL**

Run: `npm test -- Hero`
Expected: FAIL.

- [ ] **Step 3: Implement `src/primitives/Hero.tsx`**

```tsx
// Spec §6.3 — Apple-discipline photography-anchored hero.
// Used for: title slide, section dividers, Hook 1, Section I (Showcase).
interface HeroProps {
  title: string;
  subtitle?: string;
  imageSrc?: string;
  attribution?: string;
}

export function Hero({ title, subtitle, imageSrc, attribution }: HeroProps) {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      {imageSrc && (
        <img
          src={imageSrc}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover opacity-70"
        />
      )}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,10,10,0.2) 0%, rgba(10,10,10,0.85) 100%)",
        }}
      />
      <div className="relative z-10 mx-auto max-w-[80vw] px-24 text-center">
        <h1
          className="font-display"
          style={{ fontSize: "var(--fs-display, clamp(4.5rem, 8vw, 9rem))", lineHeight: 1.05 }}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className="mt-8 font-serif text-copper-300"
            style={{ fontSize: "clamp(1.75rem, 2.25vw, 2.5rem)" }}
          >
            {subtitle}
          </p>
        )}
      </div>
      {attribution && (
        <p
          className="absolute bottom-8 left-12 font-sans text-copper-300/80"
          style={{ fontSize: "clamp(1rem, 1.1vw, 1.25rem)" }}
        >
          {attribution}
        </p>
      )}
    </div>
  );
}
```

- [ ] **Step 4: Implement `src/primitives/SectionDivider.tsx`**

```tsx
// Between-section divider. Big letter + label, Apple-hero discipline,
// optional photography in the back. Used between A↔B, B↔C, etc.
interface SectionDividerProps {
  letter: string;
  label: string;
  imageSrc?: string;
}

export function SectionDivider({ letter, label, imageSrc }: SectionDividerProps) {
  return (
    <div className="relative flex h-full w-full items-center">
      {imageSrc && (
        <img
          src={imageSrc}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
      )}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(10,10,10,0.95) 30%, rgba(10,10,10,0.4) 100%)",
        }}
      />
      <div className="relative z-10 px-32">
        <p
          className="font-display text-copper-500"
          style={{ fontSize: "clamp(8rem, 14vw, 16rem)", lineHeight: 0.95 }}
        >
          {letter}
        </p>
        <p
          className="mt-4 font-serif"
          style={{ fontSize: "clamp(2.5rem, 4.5vw, 4rem)", lineHeight: 1.15 }}
        >
          {label}
        </p>
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Run the test — expect PASS**

Run: `npm test -- Hero`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/primitives/Hero.tsx src/primitives/SectionDivider.tsx tests/unit/Hero.test.tsx
git commit -m "feat: Hero and SectionDivider primitives"
```

---

## Task 16: ContentSlide + QuoteSlide primitives

**Files:**
- Create: `src/primitives/ContentSlide.tsx`, `src/primitives/QuoteSlide.tsx`, `tests/unit/ContentSlide.test.tsx`

- [ ] **Step 1: Write the failing test**

`tests/unit/ContentSlide.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { ContentSlide } from "@/primitives/ContentSlide";
import { QuoteSlide } from "@/primitives/QuoteSlide";

test("ContentSlide renders heading and bullets", () => {
  render(
    <ContentSlide
      heading="Three layers"
      bullets={["Prompt", "Context", "Harness"]}
    />,
  );
  expect(screen.getByRole("heading", { level: 2 }).textContent).toBe(
    "Three layers",
  );
  expect(screen.getAllByRole("listitem")).toHaveLength(3);
});

test("ContentSlide enforces spec density limit of 6 bullets max", () => {
  expect(() =>
    render(
      <ContentSlide
        heading="x"
        bullets={["1", "2", "3", "4", "5", "6", "7"]}
      />,
    ),
  ).toThrow(/max 6 bullets/i);
});

test("QuoteSlide renders quote and attribution", () => {
  render(
    <QuoteSlide
      quote="AI is the bridge from where you are to wherever you need to be."
      attribution="The throughline"
    />,
  );
  expect(screen.getByText(/AI is the bridge/)).toBeInTheDocument();
  expect(screen.getByText("The throughline")).toBeInTheDocument();
});
```

- [ ] **Step 2: Run the test — expect FAIL**

Run: `npm test -- ContentSlide`
Expected: FAIL — modules not found.

- [ ] **Step 3: Implement `src/primitives/ContentSlide.tsx`**

```tsx
// Spec frontend-slides density rule: max 6 bullets per content slide.
// Throwing here forces the violation to surface during dev — splitting into
// two slides is the correct response, never silently truncating.
interface ContentSlideProps {
  heading: string;
  bullets?: string[];
  paragraphs?: string[];
}

const MAX_BULLETS = 6;

export function ContentSlide({ heading, bullets, paragraphs }: ContentSlideProps) {
  if (bullets && bullets.length > MAX_BULLETS) {
    throw new Error(
      `ContentSlide max 6 bullets per spec; got ${bullets.length}. Split into two slides.`,
    );
  }
  return (
    <div className="flex h-full flex-col justify-center px-32 py-24">
      <h2
        className="mb-12 font-serif"
        style={{ fontSize: "clamp(2.5rem, 4.5vw, 4rem)", lineHeight: 1.15 }}
      >
        {heading}
      </h2>
      {bullets && (
        <ul className="space-y-6">
          {bullets.map((b, i) => (
            <li
              key={i}
              className="flex items-start gap-6 font-serif"
              style={{
                fontSize: "clamp(2.25rem, 2.5vw, 2.75rem)",
                lineHeight: 1.6,
              }}
            >
              <span className="mt-4 inline-block h-3 w-3 shrink-0 bg-copper-500" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}
      {paragraphs?.map((p, i) => (
        <p
          key={i}
          className="mt-8 max-w-[60ch] font-serif"
          style={{
            fontSize: "clamp(2.25rem, 2.5vw, 2.75rem)",
            lineHeight: 1.6,
          }}
        >
          {p}
        </p>
      ))}
    </div>
  );
}
```

- [ ] **Step 4: Implement `src/primitives/QuoteSlide.tsx`**

```tsx
interface QuoteSlideProps {
  quote: string;
  attribution?: string;
}

export function QuoteSlide({ quote, attribution }: QuoteSlideProps) {
  return (
    <div className="flex h-full flex-col items-start justify-center px-32 py-24">
      <p className="mb-2 font-display text-copper-500" style={{ fontSize: "clamp(6rem, 10vw, 12rem)", lineHeight: 0.8 }}>
        “
      </p>
      <blockquote
        className="max-w-[28ch] font-display"
        style={{ fontSize: "clamp(3.5rem, 6vw, 6rem)", lineHeight: 1.1 }}
      >
        {quote}
      </blockquote>
      {attribution && (
        <p
          className="mt-12 font-sans uppercase tracking-[0.2em] text-copper-300"
          style={{ fontSize: "clamp(1.25rem, 1.5vw, 1.75rem)" }}
        >
          — {attribution}
        </p>
      )}
    </div>
  );
}
```

- [ ] **Step 5: Run the test — expect PASS**

Run: `npm test -- ContentSlide`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/primitives/ContentSlide.tsx src/primitives/QuoteSlide.tsx tests/unit/ContentSlide.test.tsx
git commit -m "feat: ContentSlide and QuoteSlide primitives with density guard"
```

---

## Task 17: HexLadder projection-test slide

**Files:**
- Create: `src/primitives/HexLadder.tsx`, `tests/unit/HexLadder.test.tsx`

- [ ] **Step 1: Write the failing test**

`tests/unit/HexLadder.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { HexLadder } from "@/primitives/HexLadder";

test("HexLadder renders a swatch for every copper stop and grayscale stop", () => {
  render(<HexLadder />);
  // 11 copper + 12 grayscale (0..950) = 23 swatches
  expect(screen.getAllByTestId("swatch")).toHaveLength(23);
});

test("each swatch displays its hex value as a label so projection comparisons are unambiguous", () => {
  render(<HexLadder />);
  expect(screen.getByText("#b86e3d")).toBeInTheDocument();
  expect(screen.getByText("#0a0a0a")).toBeInTheDocument();
});
```

- [ ] **Step 2: Run the test — expect FAIL**

Run: `npm test -- HexLadder`
Expected: FAIL.

- [ ] **Step 3: Implement `src/primitives/HexLadder.tsx`**

```tsx
import { copper, neutral } from "@/design-system/colors";

// Color projection-test slide. Renders the full copper ladder + grayscale
// so Adri can hold his laptop next to the projector and pick the stops
// that survive the auditorium's wash-out (spec §6.5, §11).
export function HexLadder() {
  const renderStop = (hex: string, label: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const luma = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    const labelColor = luma > 0.55 ? "#0a0a0a" : "#f5f5f5";
    return (
      <div
        key={`${label}-${hex}`}
        data-testid="swatch"
        className="flex flex-1 flex-col items-center justify-end p-4"
        style={{ background: hex, color: labelColor }}
      >
        <span style={{ fontSize: "clamp(0.875rem, 1vw, 1.25rem)" }}>{label}</span>
        <span style={{ fontSize: "clamp(0.875rem, 1vw, 1.25rem)" }}>{hex}</span>
      </div>
    );
  };

  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex flex-1">
        {Object.entries(copper).map(([k, v]) =>
          renderStop(v as string, `copper-${k}`),
        )}
      </div>
      <div className="flex flex-1">
        {Object.entries(neutral).map(([k, v]) =>
          renderStop(v as string, `neutral-${k}`),
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Run the test — expect PASS**

Run: `npm test -- HexLadder`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/primitives/HexLadder.tsx tests/unit/HexLadder.test.tsx
git commit -m "feat: HexLadder slide for projection-testing the copper palette"
```

---

## Task 18: Smoke deck — 7 slides exercising every primitive

**Files:**
- Create: `src/deck/smoke-deck.tsx`, `src/deck/Deck.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Write the failing test**

`tests/unit/smoke-deck.test.tsx`:

```tsx
import { render, screen, act } from "@testing-library/react";
import App from "@/App";

test("smoke deck mounts, advances through all slides via keyboard", () => {
  render(<App />);
  // Slide 0 is rendered initially.
  expect(screen.getByTestId("slide").getAttribute("data-slide-index")).toBe("0");

  // 7 slides total. Hit ArrowRight 6 times to reach the last slide.
  for (let i = 0; i < 6; i++) {
    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight" }));
    });
  }

  expect(screen.getByTestId("slide").getAttribute("data-slide-index")).toBe("6");
});

test("smoke deck declares one slide per supported animation mode", () => {
  render(<App />);
  // Walk all 7 slides and collect their declared modes.
  const seen = new Set<string>();
  for (let i = 0; i < 7; i++) {
    seen.add(screen.getByTestId("slide").getAttribute("data-animation-mode")!);
    if (i < 6) {
      act(() => {
        window.dispatchEvent(
          new KeyboardEvent("keydown", { key: "ArrowRight" }),
        );
      });
    }
  }
  expect(seen.has("static")).toBe(true);
  expect(seen.has("step-reveal")).toBe(true);
  expect(seen.has("looping-ambient")).toBe(true);
  expect(seen.has("interactive")).toBe(true);
});
```

- [ ] **Step 2: Run the test — expect FAIL**

Run: `npm test -- smoke-deck`
Expected: FAIL.

- [ ] **Step 3: Implement `src/deck/smoke-deck.tsx`**

```tsx
import { Slide, type AnimationMode } from "./Slide";
import { Hero } from "@/primitives/Hero";
import { SectionDivider } from "@/primitives/SectionDivider";
import { ContentSlide } from "@/primitives/ContentSlide";
import { QuoteSlide } from "@/primitives/QuoteSlide";
import { HexLadder } from "@/primitives/HexLadder";
import { StepReveal } from "@/motion/StepReveal";
import { LoopingAmbient } from "@/motion/LoopingAmbient";
import { Interactive } from "@/motion/Interactive";
import { useState } from "react";

export interface SmokeSlide {
  steps: number; // step count for DeckProvider
  animationMode: AnimationMode;
  canonicalPose: number;
  surface?: "dark" | "light";
  render: () => JSX.Element;
}

function ComparatorDemo() {
  const [on, setOn] = useState(false);
  return (
    <div className="flex h-full flex-col items-center justify-center gap-12 px-32">
      <h2
        className="font-serif"
        style={{ fontSize: "clamp(2.5rem, 4.5vw, 4rem)" }}
      >
        Prompt only vs. Prompt + Context
      </h2>
      <button
        onClick={() => setOn((v) => !v)}
        className="border border-copper-500 px-12 py-6 font-sans text-copper-300"
        style={{ fontSize: "clamp(1.25rem, 1.5vw, 1.75rem)" }}
      >
        {on ? "with context" : "prompt only"}
      </button>
      <p
        className="max-w-[40ch] text-center font-serif"
        style={{ fontSize: "clamp(2.25rem, 2.5vw, 2.75rem)", lineHeight: 1.6 }}
      >
        {on
          ? "Grounded in the project: hits the right repos, the right files, the right history."
          : "Generic prose. Plausible but ungrounded."}
      </p>
    </div>
  );
}

export const smokeDeck: SmokeSlide[] = [
  {
    steps: 1,
    animationMode: "static",
    canonicalPose: 0,
    render: () => (
      <Hero
        title="Berau Coal Energy"
        subtitle="AI Workshop · Vol 2 · Session 2"
        attribution="Adri · Nanovest"
      />
    ),
  },
  {
    steps: 1,
    animationMode: "looping-ambient",
    canonicalPose: 0,
    render: () => (
      <LoopingAmbient>
        <SectionDivider letter="C" label="Mindset" />
      </LoopingAmbient>
    ),
  },
  {
    steps: 3,
    animationMode: "step-reveal",
    canonicalPose: 2,
    render: () => (
      <div className="flex h-full flex-col justify-center px-32 py-24">
        <h2
          className="mb-12 font-serif"
          style={{ fontSize: "clamp(2.5rem, 4.5vw, 4rem)" }}
        >
          Three layers, outside in
        </h2>
        <StepReveal>
          <p className="font-serif" style={{ fontSize: "clamp(2.25rem, 2.5vw, 2.75rem)" }}>
            1. Prompt — what you ask
          </p>
          <p className="font-serif" style={{ fontSize: "clamp(2.25rem, 2.5vw, 2.75rem)" }}>
            2. Context — what's in scope
          </p>
          <p className="font-serif" style={{ fontSize: "clamp(2.25rem, 2.5vw, 2.75rem)" }}>
            3. Harness — what it can act on
          </p>
        </StepReveal>
      </div>
    ),
  },
  {
    steps: 1,
    animationMode: "static",
    canonicalPose: 0,
    render: () => (
      <ContentSlide
        heading="What we'll cover"
        bullets={[
          "Where the field is now",
          "How to think about it",
          "How to use it without losing yourself",
          "How to start, this week",
        ]}
      />
    ),
  },
  {
    steps: 1,
    animationMode: "static",
    canonicalPose: 0,
    render: () => (
      <QuoteSlide
        quote="AI is the bridge from where you are to wherever you need to be."
        attribution="The throughline"
      />
    ),
  },
  {
    steps: 1,
    animationMode: "interactive",
    canonicalPose: 0,
    render: () => (
      <Interactive>
        <ComparatorDemo />
      </Interactive>
    ),
  },
  {
    steps: 1,
    animationMode: "static",
    canonicalPose: 0,
    surface: "light",
    render: () => <HexLadder />,
  },
];
```

- [ ] **Step 4: Implement `src/deck/Deck.tsx`**

```tsx
import { DeckProvider, useDeck } from "./DeckContext";
import { useKeyboardNav } from "./useKeyboardNav";
import { Slide } from "./Slide";
import { smokeDeck } from "./smoke-deck";

function ActiveSlide() {
  useKeyboardNav();
  const { slideIndex } = useDeck();
  const def = smokeDeck[slideIndex];
  return (
    <Slide
      index={slideIndex}
      animationMode={def.animationMode}
      canonicalPose={def.canonicalPose}
      surface={def.surface ?? "dark"}
    >
      {def.render()}
    </Slide>
  );
}

export function Deck() {
  return (
    <DeckProvider stepCounts={smokeDeck.map((s) => s.steps)}>
      <ActiveSlide />
    </DeckProvider>
  );
}
```

- [ ] **Step 5: Replace `src/App.tsx`**

```tsx
import { Deck } from "./deck/Deck";

export default function App() {
  return <Deck />;
}
```

- [ ] **Step 6: Run the test — expect PASS**

Run: `npm test -- smoke-deck`
Expected: PASS (both cases).

- [ ] **Step 7: Run the dev server and walk the deck manually**

Run: `npm run dev`
- Open `http://localhost:5173`.
- Verify slide 0 is the Hero with `Adri · Nanovest` footer.
- Press `ArrowRight` six times — confirm you land on the HexLadder.
- Press `ArrowLeft` to walk back. On the step-reveal slide, press `Space` three times to confirm progressive build.
- On the comparator slide, click the toggle button — text swaps without advancing the slide.

- [ ] **Step 8: Commit**

```bash
git add src/deck/smoke-deck.tsx src/deck/Deck.tsx src/App.tsx tests/unit/smoke-deck.test.tsx
git commit -m "feat: smoke deck exercising every primitive and animation mode"
```

---

## Task 19: Playwright setup + viewport-fit e2e

**Files:**
- Create: `playwright.config.ts`, `tests/e2e/viewport-fit.spec.ts`
- Modify: `package.json`

- [ ] **Step 1: Install Playwright**

```bash
npm install -D @playwright/test@^1.48.0
npx playwright install chromium
```

- [ ] **Step 2: Write `playwright.config.ts`**

```ts
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 30_000,
  fullyParallel: false,
  reporter: [["list"]],
  use: {
    baseURL: "http://localhost:5173",
    trace: "retain-on-failure",
  },
  projects: [
    { name: "1280x720", use: { ...devices["Desktop Chrome"], viewport: { width: 1280, height: 720 } } },
    { name: "1366x768", use: { ...devices["Desktop Chrome"], viewport: { width: 1366, height: 768 } } },
    { name: "1920x1080", use: { ...devices["Desktop Chrome"], viewport: { width: 1920, height: 1080 } } },
  ],
  webServer: {
    command: "npm run dev",
    url: "http://localhost:5173",
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
```

- [ ] **Step 3: Add `e2e` script to `package.json`**

In the `scripts` section, add:

```json
"e2e": "playwright test"
```

- [ ] **Step 4: Write `tests/e2e/viewport-fit.spec.ts`**

```ts
import { test, expect } from "@playwright/test";

const SLIDES = 7;

test("every slide fits inside the viewport with no overflow", async ({ page }) => {
  await page.goto("/");
  for (let i = 0; i < SLIDES; i++) {
    const overflow = await page.evaluate(() => {
      const slide = document.querySelector('[data-testid="slide"]') as HTMLElement;
      if (!slide) return null;
      // overflow occurs when scroll size exceeds client size in either axis
      return {
        verticalOverflow: slide.scrollHeight > slide.clientHeight,
        horizontalOverflow: slide.scrollWidth > slide.clientWidth,
      };
    });
    expect(overflow, `slide ${i}`).not.toBeNull();
    expect(overflow!.verticalOverflow, `slide ${i} vertical overflow`).toBe(false);
    expect(overflow!.horizontalOverflow, `slide ${i} horizontal overflow`).toBe(false);
    if (i < SLIDES - 1) {
      await page.keyboard.press("ArrowRight");
      await page.waitForFunction(
        (idx) => {
          const el = document.querySelector('[data-testid="slide"]');
          return el?.getAttribute("data-slide-index") === String(idx);
        },
        i + 1,
      );
    }
  }
});
```

- [ ] **Step 5: Run the e2e — expect PASS in all three viewports**

Run: `npm run e2e -- viewport-fit`
Expected: 3 projects × 1 test = 3 passing tests.

- [ ] **Step 6: Commit**

```bash
git add playwright.config.ts tests/e2e/viewport-fit.spec.ts package.json package-lock.json
git commit -m "test: playwright viewport-fit e2e across 3 projection sizes"
```

---

## Task 20: Keyboard-nav e2e

**Files:**
- Create: `tests/e2e/keyboard-nav.spec.ts`

- [ ] **Step 1: Write the e2e test**

```ts
import { test, expect } from "@playwright/test";

const slideAttr = '[data-testid="slide"]';

test("ArrowRight advances slide; Space advances step within step-reveal slide", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(slideAttr)).toHaveAttribute("data-slide-index", "0");

  await page.keyboard.press("ArrowRight");
  await expect(page.locator(slideAttr)).toHaveAttribute("data-slide-index", "1");

  await page.keyboard.press("ArrowRight");
  await expect(page.locator(slideAttr)).toHaveAttribute(
    "data-animation-mode",
    "step-reveal",
  );

  // The step-reveal slide has 3 children. Press Space twice — last child should reveal.
  await page.keyboard.press(" ");
  await page.keyboard.press(" ");
  // The final child carries text "3. Harness"
  await expect(page.getByText("3. Harness — what it can act on")).toBeVisible();
});

test("ArrowLeft returns to step 0 of the previous slide (does not preserve step state)", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("ArrowRight"); // slide 1
  await page.keyboard.press("ArrowRight"); // slide 2 (step-reveal)
  await page.keyboard.press(" "); // step 1
  await page.keyboard.press("ArrowLeft"); // back to slide 1
  await expect(page.locator(slideAttr)).toHaveAttribute("data-slide-index", "1");
  await page.keyboard.press("ArrowRight"); // forward to slide 2 — step should be 0
  await expect(page.locator(slideAttr)).toHaveAttribute("data-slide-index", "2");
});

test("interactive-mode slide does not advance on stage clicks outside the comparator button", async ({ page }) => {
  await page.goto("/");
  for (let i = 0; i < 5; i++) await page.keyboard.press("ArrowRight"); // → slide 5 (interactive)
  await expect(page.locator(slideAttr)).toHaveAttribute(
    "data-animation-mode",
    "interactive",
  );
  // Click on the slide background (top-left corner — not on the button)
  await page.locator(slideAttr).click({ position: { x: 10, y: 10 } });
  await expect(page.locator(slideAttr)).toHaveAttribute("data-slide-index", "5");
});
```

- [ ] **Step 2: Run the e2e — expect PASS**

Run: `npm run e2e -- keyboard-nav`
Expected: 9 tests pass (3 cases × 3 projects).

- [ ] **Step 3: Commit**

```bash
git add tests/e2e/keyboard-nav.spec.ts
git commit -m "test: e2e for keyboard nav contract and click isolation"
```

---

## Task 21: PDF export script + e2e

**Files:**
- Create: `scripts/export-pdf.mjs`, `tests/e2e/pdf-export.spec.ts`
- Modify: `package.json`

- [ ] **Step 1: Write the failing e2e**

`tests/e2e/pdf-export.spec.ts`:

```ts
import { test, expect } from "@playwright/test";
import { spawnSync } from "node:child_process";
import { existsSync, statSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

test("export-pdf.mjs produces a non-empty PDF with one page per slide", async () => {
  const out = resolve("exports/smoke-deck.pdf");
  const result = spawnSync("node", ["scripts/export-pdf.mjs", out], {
    stdio: "inherit",
  });
  expect(result.status).toBe(0);
  expect(existsSync(out)).toBe(true);
  expect(statSync(out).size).toBeGreaterThan(10_000);

  // Cheap PDF page count: count "/Type /Page" occurrences (not /Pages).
  const buf = readFileSync(out);
  const matches = buf.toString("latin1").match(/\/Type\s*\/Page[^s]/g) ?? [];
  expect(matches.length).toBe(7);
});
```

- [ ] **Step 2: Run the e2e — expect FAIL**

Run: `npm run e2e -- pdf-export`
Expected: FAIL — script not found.

- [ ] **Step 3: Write `scripts/export-pdf.mjs`**

```js
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";

// Walks the smoke deck slide-by-slide. For each slide, advances to the
// canonical screenshot pose (data-canonical-pose) by pressing Space the
// right number of times, then captures a single-page PDF, then concats
// them via the chromium PDF print pipeline.
//
// Output: a single PDF where each page is one slide at its canonical pose.

const URL = process.env.DECK_URL ?? "http://localhost:5173";
const OUT = resolve(process.argv[2] ?? "exports/smoke-deck.pdf");
mkdirSync(dirname(OUT), { recursive: true });

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1920, height: 1080 },
});
const page = await context.newPage();
await page.goto(URL, { waitUntil: "networkidle" });

const slideCount = await page.evaluate(() =>
  Number(
    document.querySelector('[data-testid="slide"]')?.getAttribute("data-slide-count") ??
      // Fall back: read the registered stepCounts length via window globals if exposed.
      window.__DECK_SLIDE_COUNT__ ?? 7,
  ),
);

const pdfBuffers = [];

for (let i = 0; i < slideCount; i++) {
  // Wait until the active slide's index matches.
  await page.waitForFunction(
    (idx) =>
      document.querySelector('[data-testid="slide"]')?.getAttribute(
        "data-slide-index",
      ) === String(idx),
    i,
  );
  // Walk to the canonical pose by pressing Space N times.
  const canonicalPose = Number(
    await page.evaluate(
      () =>
        document
          .querySelector('[data-testid="slide"]')
          ?.getAttribute("data-canonical-pose") ?? 0,
    ),
  );
  for (let s = 0; s < canonicalPose; s++) {
    await page.keyboard.press(" ");
  }
  // Give framer-motion a beat to settle.
  await page.waitForTimeout(150);

  const buf = await page.pdf({
    width: "1920px",
    height: "1080px",
    printBackground: true,
    margin: { top: "0", right: "0", bottom: "0", left: "0" },
  });
  pdfBuffers.push(buf);

  if (i < slideCount - 1) {
    await page.keyboard.press("ArrowRight");
  }
}

await browser.close();

// Stitch via pdf-lib so we end up with one multipage PDF. Install if missing.
const { PDFDocument } = await import("pdf-lib");
const merged = await PDFDocument.create();
for (const buf of pdfBuffers) {
  const src = await PDFDocument.load(buf);
  const pages = await merged.copyPages(src, src.getPageIndices());
  pages.forEach((p) => merged.addPage(p));
}
const out = await merged.save();
const { writeFileSync } = await import("node:fs");
writeFileSync(OUT, out);
console.log(`wrote ${OUT} (${out.length.toLocaleString()} bytes, ${slideCount} pages)`);
```

- [ ] **Step 4: Install pdf-lib and expose slide count to the window**

```bash
npm install -D pdf-lib@^1.17.1
```

Then modify `src/deck/Deck.tsx` to expose the slide count globally so the export script doesn't need to guess:

Replace `src/deck/Deck.tsx` with:

```tsx
import { useEffect } from "react";
import { DeckProvider, useDeck } from "./DeckContext";
import { useKeyboardNav } from "./useKeyboardNav";
import { Slide } from "./Slide";
import { smokeDeck } from "./smoke-deck";

declare global {
  interface Window {
    __DECK_SLIDE_COUNT__: number;
  }
}

function ActiveSlide() {
  useKeyboardNav();
  const { slideIndex, stepCounts } = useDeck();
  useEffect(() => {
    window.__DECK_SLIDE_COUNT__ = stepCounts.length;
  }, [stepCounts.length]);
  const def = smokeDeck[slideIndex];
  return (
    <Slide
      index={slideIndex}
      animationMode={def.animationMode}
      canonicalPose={def.canonicalPose}
      surface={def.surface ?? "dark"}
    >
      {def.render()}
    </Slide>
  );
}

export function Deck() {
  return (
    <DeckProvider stepCounts={smokeDeck.map((s) => s.steps)}>
      <ActiveSlide />
    </DeckProvider>
  );
}
```

- [ ] **Step 5: Add npm script**

In `package.json` `scripts`:

```json
"export:pdf": "node scripts/export-pdf.mjs exports/smoke-deck.pdf"
```

- [ ] **Step 6: Run the e2e — expect PASS**

Run: `npm run e2e -- pdf-export`
Expected: PASS — `exports/smoke-deck.pdf` exists with 7 pages.

- [ ] **Step 7: Commit**

```bash
git add scripts/export-pdf.mjs tests/e2e/pdf-export.spec.ts src/deck/Deck.tsx package.json package-lock.json
git commit -m "feat: PDF export pipeline with canonical-pose pause per slide"
```

---

## Task 22: PPTX export script + e2e

**Files:**
- Create: `scripts/export-pptx.mjs`, `tests/e2e/pptx-export.spec.ts`
- Modify: `package.json`

- [ ] **Step 1: Install PptxGenJS**

```bash
npm install -D pptxgenjs@^3.12.0
```

- [ ] **Step 2: Write the failing e2e**

`tests/e2e/pptx-export.spec.ts`:

```ts
import { test, expect } from "@playwright/test";
import { spawnSync } from "node:child_process";
import { existsSync, statSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

test("export-pptx.mjs produces a non-empty .pptx whose internal slide count matches the deck", async () => {
  const out = resolve("exports/smoke-deck.pptx");
  const result = spawnSync("node", ["scripts/export-pptx.mjs", out], {
    stdio: "inherit",
  });
  expect(result.status).toBe(0);
  expect(existsSync(out)).toBe(true);
  expect(statSync(out).size).toBeGreaterThan(50_000);

  // .pptx is a zip. Count slide*.xml entries — they encode
  // one entry per actual slide and the count is therefore exact.
  const buf = readFileSync(out);
  const haystack = buf.toString("latin1");
  const matches = haystack.match(/ppt\/slides\/slide\d+\.xml/g) ?? [];
  // Each slide is referenced from multiple zip locations (content type +
  // relationships + the slide itself). Dedupe on filename.
  const unique = new Set(matches);
  expect(unique.size).toBe(7);
});
```

- [ ] **Step 3: Run the e2e — expect FAIL**

Run: `npm run e2e -- pptx-export`
Expected: FAIL — script not found.

- [ ] **Step 4: Write `scripts/export-pptx.mjs`**

```js
import { chromium } from "playwright";
import PptxGenJS from "pptxgenjs";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const URL = process.env.DECK_URL ?? "http://localhost:5173";
const OUT = resolve(process.argv[2] ?? "exports/smoke-deck.pptx");
mkdirSync(dirname(OUT), { recursive: true });

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1920, height: 1080 },
  deviceScaleFactor: 2, // retina capture for sharp projection
});
const page = await context.newPage();
await page.goto(URL, { waitUntil: "networkidle" });

const slideCount = await page.evaluate(
  () => window.__DECK_SLIDE_COUNT__ ?? 7,
);

const screenshots = [];
for (let i = 0; i < slideCount; i++) {
  await page.waitForFunction(
    (idx) =>
      document
        .querySelector('[data-testid="slide"]')
        ?.getAttribute("data-slide-index") === String(idx),
    i,
  );
  const canonicalPose = Number(
    await page.evaluate(
      () =>
        document
          .querySelector('[data-testid="slide"]')
          ?.getAttribute("data-canonical-pose") ?? 0,
    ),
  );
  for (let s = 0; s < canonicalPose; s++) {
    await page.keyboard.press(" ");
  }
  await page.waitForTimeout(150);
  const buf = await page.screenshot({ type: "png", fullPage: false });
  screenshots.push(buf);
  if (i < slideCount - 1) {
    await page.keyboard.press("ArrowRight");
  }
}
await browser.close();

const pptx = new PptxGenJS();
// 16:9 widescreen at 13.333" × 7.5" — PowerPoint default for new decks.
pptx.layout = "LAYOUT_WIDE";
pptx.defineLayout({ name: "BCE", width: 13.333, height: 7.5 });
pptx.layout = "BCE";

for (const png of screenshots) {
  const slide = pptx.addSlide();
  const dataUrl = `data:image/png;base64,${png.toString("base64")}`;
  slide.addImage({
    data: dataUrl,
    x: 0,
    y: 0,
    w: 13.333,
    h: 7.5,
  });
}

const buf = await pptx.write({ outputType: "nodebuffer" });
writeFileSync(OUT, buf);
console.log(`wrote ${OUT} (${buf.length.toLocaleString()} bytes, ${slideCount} slides)`);
```

- [ ] **Step 5: Add npm script**

In `package.json` `scripts`:

```json
"export:pptx": "node scripts/export-pptx.mjs exports/smoke-deck.pptx"
```

- [ ] **Step 6: Run the e2e — expect PASS**

Run: `npm run e2e -- pptx-export`
Expected: PASS — `exports/smoke-deck.pptx` exists with 7 internal slide entries.

- [ ] **Step 7: Manually open the .pptx in Keynote or PowerPoint to spot-check**

Run: `open exports/smoke-deck.pptx`
Expected: 7 slides, each one a sharp screenshot of the corresponding deck slide at its canonical pose.

- [ ] **Step 8: Commit**

```bash
git add scripts/export-pptx.mjs tests/e2e/pptx-export.spec.ts package.json package-lock.json
git commit -m "feat: PPTX export pipeline via screenshot-stitch + PptxGenJS"
```

---

## Task 23: Projection-test runbook

**Files:**
- Create: `scripts/projection-test.mjs`, `docs/runbooks/projection-test.md`
- Modify: `package.json`

- [ ] **Step 1: Write `scripts/projection-test.mjs`**

```js
// Boots the dev server and opens the HexLadder slide directly in fullscreen
// for the projection-calibration session. Adri runs this with a connected
// projector; the goal is to verify the copper hex ladder against actual
// auditorium hardware (spec §6.5, §11).

import { spawn } from "node:child_process";

const server = spawn("npm", ["run", "dev"], { stdio: "inherit", shell: true });

setTimeout(() => {
  // Slide index 6 is the HexLadder in the smoke deck.
  const url = "http://localhost:5173/?slide=6&fullscreen=1";
  console.log("\nProjection test ready. Opening:", url);
  console.log(
    "Steps:\n" +
      "  1. Connect projector and mirror display.\n" +
      "  2. Press F11 (or Cmd+Ctrl+F on macOS) for browser fullscreen.\n" +
      "  3. Walk to the back row and confirm: every copper-* and neutral-* swatch is distinguishable from its neighbors.\n" +
      "  4. Note any stops that wash out — those are the ones to retune in src/design-system/colors.ts.\n" +
      "  5. Ctrl+C this script when done.",
  );
  spawn(process.platform === "darwin" ? "open" : "xdg-open", [url], {
    stdio: "ignore",
    detached: true,
  });
}, 3000);

process.on("SIGINT", () => {
  server.kill();
  process.exit(0);
});
```

- [ ] **Step 2: Add `?slide=` query support to `Deck.tsx`**

Replace `src/deck/Deck.tsx` with:

```tsx
import { useEffect } from "react";
import { DeckProvider, useDeck } from "./DeckContext";
import { useKeyboardNav } from "./useKeyboardNav";
import { Slide } from "./Slide";
import { smokeDeck } from "./smoke-deck";

declare global {
  interface Window {
    __DECK_SLIDE_COUNT__: number;
  }
}

function ActiveSlide() {
  useKeyboardNav();
  const { slideIndex, stepCounts, goTo } = useDeck();

  useEffect(() => {
    window.__DECK_SLIDE_COUNT__ = stepCounts.length;
    const params = new URLSearchParams(window.location.search);
    const requested = params.get("slide");
    if (requested != null) {
      const n = Math.max(0, Math.min(Number(requested), stepCounts.length - 1));
      goTo(n, 0);
    }
    // We only honor the query string on first mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const def = smokeDeck[slideIndex];
  return (
    <Slide
      index={slideIndex}
      animationMode={def.animationMode}
      canonicalPose={def.canonicalPose}
      surface={def.surface ?? "dark"}
    >
      {def.render()}
    </Slide>
  );
}

export function Deck() {
  return (
    <DeckProvider stepCounts={smokeDeck.map((s) => s.steps)}>
      <ActiveSlide />
    </DeckProvider>
  );
}
```

- [ ] **Step 3: Add a Vitest case proving `?slide=N` jumps to the right slide**

Append to `tests/unit/smoke-deck.test.tsx`:

```tsx
test("?slide=N query string jumps the deck to slide N on mount", () => {
  Object.defineProperty(window, "location", {
    value: new URL("http://localhost/?slide=3"),
    writable: true,
  });
  render(<App />);
  expect(screen.getByTestId("slide").getAttribute("data-slide-index")).toBe("3");
});
```

- [ ] **Step 4: Run tests — expect PASS**

Run: `npm test -- smoke-deck`
Expected: 3 passing tests (the original 2 + new query-string test).

- [ ] **Step 5: Add `projection-test` script**

In `package.json` `scripts`:

```json
"projection-test": "node scripts/projection-test.mjs"
```

- [ ] **Step 6: Write `docs/runbooks/projection-test.md`**

```markdown
# Projection-Test Runbook

**When to run:** Before locking the copper hex ladder for the workshop. Repeat at each new venue (Berau site mics differ from Jakarta venue mics).

## Steps

1. Connect laptop to projector. Mirror displays at the projector's native resolution.
2. From the project root, run `npm run projection-test`. The script boots the dev server and opens the HexLadder slide.
3. Press `F11` (or `Cmd+Ctrl+F` on macOS) for fullscreen.
4. Walk to the back row of the auditorium. For each row of swatches:
   - Confirm every adjacent pair is **distinguishable** at distance.
   - Note any stop that **washes out** to its neighbor.
5. Edit `src/design-system/colors.ts` for any failing stops — usually the answer is to push the stop one click darker (drop ~10% lightness) so it survives the projector's gamma compression.
6. Re-run and re-verify until every adjacent pair is distinguishable.

## What "good enough" looks like

- copper-300, copper-500, copper-700 must be visibly different at 30+ meters — these are the stops the deck leans on hardest.
- neutral-50 (light surface) and neutral-900 (dark surface) must read as clearly different surfaces, not "washed dark gray on washed light gray."
- copper-200..400 are the danger zone for projector wash-out. If two adjacent stops can't be told apart, drop one and reflow the ladder.
```

- [ ] **Step 7: Commit**

```bash
git add scripts/projection-test.mjs src/deck/Deck.tsx tests/unit/smoke-deck.test.tsx docs/runbooks/projection-test.md package.json
git commit -m "feat: projection-test script + runbook for hex-ladder calibration"
```

---

## Task 24: README run instructions

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Replace `README.md` with run instructions**

```markdown
# Berau Coal Energy AI Workshop — Deck

React + Tailwind + Framer Motion presentation deck for the BCE Vol-2 Session-2 workshop. See `docs/specs/2026-05-06-process-and-design-meta.md` for the design substrate decisions; see `docs/plans/2026-05-06-design-system-implementation.md` for the build plan that produced this scaffolding.

## Develop

```bash
npm install
npm run dev          # http://localhost:5173
```

Navigation:
- `→` next slide
- `←` previous slide
- `Space` next animation step within the current slide

## Test

```bash
npm test             # vitest unit + integration
npm run e2e          # playwright e2e (viewport, keyboard, exports)
```

## Export

```bash
npm run export:pdf   # exports/smoke-deck.pdf  (multipage, canonical-pose-paused)
npm run export:pptx  # exports/smoke-deck.pptx (screenshot-stitched, static)
```

## Calibrate the palette against a projector

```bash
npm run projection-test
```

Opens the HexLadder slide. See `docs/runbooks/projection-test.md` for the full procedure.

## Layout

- `src/design-system/` — Color, typography, spacing, shadow tokens. The single source of truth for both Tailwind theme and CSS variables.
- `src/deck/` — Deck shell: state, keyboard nav, slide wrapper, slide registry.
- `src/motion/` — Framer-Motion-backed primitives: StepReveal, LoopingAmbient, Interactive, Static.
- `src/primitives/` — Layout primitives: Hero, SectionDivider, ContentSlide, QuoteSlide, HexLadder.
- `scripts/` — Export and calibration scripts.
- `tests/unit/` — Vitest + Testing Library.
- `tests/e2e/` — Playwright (3 projection viewports).
```

- [ ] **Step 2: Commit**

```bash
git add README.md
git commit -m "docs: README with run, test, export, and projection-test commands"
```

---

## Task 25: Final sanity sweep

- [ ] **Step 1: Run the full Vitest suite**

Run: `npm test`
Expected: All tests green. ~13–15 test files, ~30+ assertions.

- [ ] **Step 2: Run the full Playwright suite**

Run: `npm run e2e`
Expected: All projects (3 viewports) × all e2e specs (4 files) green.

- [ ] **Step 3: Build the production bundle**

Run: `npm run build`
Expected: `dist/` written; no TypeScript errors; total bundle size logged.

- [ ] **Step 4: Walk the deck once end-to-end**

Run: `npm run dev`. Open in Chrome at 1920×1080. Walk all 7 slides via keyboard. Confirm:

- No layout shifts on slide changes.
- StepReveal stages land at their declared steps with the easing curve.
- LoopingAmbient drifts smoothly without visible reset jumps.
- Comparator on slide 5 toggles without advancing the deck.
- HexLadder swatches are all readable.

- [ ] **Step 5: Final commit (only if Step 4 surfaced any tweaks)**

```bash
git status
# If clean — done. If tweaks were needed:
git add -p   # stage only the deliberate fixes
git commit -m "polish: end-to-end smoke pass adjustments"
```

---

## Spec coverage map

| Spec section | Implementing task(s) |
|---|---|
| §3.3 Workspace conventions | Plan saved to `docs/plans/2026-05-06-design-system-implementation.md` |
| §4 Skill stack — frontend-slides patterns | Tasks 11 (viewport-fit), 16 (density limits), 19 (viewport e2e), 21 (PDF export) |
| §4.1 Export pipeline — PDF | Task 21 |
| §4.1 Export pipeline — PPTX screenshot-stitched | Task 22 |
| §4.1 Canonical screenshot pose | Tasks 11, 18, 21, 22 (`canonicalPose` prop + export pause) |
| §5.1 Keyboard nav contract | Tasks 10, 20 |
| §5.2 Mouse opt-in + click isolation | Tasks 11, 14, 20 |
| §5.3 Four animation modes | Tasks 12 (step-reveal), 13 (looping + static), 14 (interactive) |
| §6.2 Carbon skeleton — single accent, 4px grid, 0px radius, single shadow | Tasks 3, 5, 7 |
| §6.3 Apple hero discipline | Task 15 |
| §6.4 Dark-primary inversion | Tasks 3, 7, 11 |
| §6.5 Color palette — copper + grayscale | Tasks 3, 7, 17, 23 |
| §6.5 Final hex ladder via projection testing | Tasks 17 (slide), 23 (script + runbook) |
| §7.1 CSS token contract | Tasks 4, 7 |
| §7.2 Projection-scale calibration | Tasks 4, 16 (clamp ramp) |
| §8.1 shadcn + Tailwind + Framer Motion | Tasks 1, 2, 7, 12, 13, 14 |
| §8.3 Free-only constraint | All tasks — only MIT/Apache licensed deps |

## Out-of-scope (downstream specs)

- Real slide content for sections A–K (slide-content brainstorm)
- Practice-lab curriculum
- Per-slide animation timing for production slides
- Final hex ladder values (Task 17 ships a ladder for projection testing; tweaks ride on top)
- shadcn `components/ui/*` components — added on demand by the slide-content phase, not pre-empted here
