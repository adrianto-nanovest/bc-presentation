import { chromium } from "@playwright/test";
const b = await chromium.launch();

// reduced motion must jump to each step's end pose
const p1 = await b.newPage({ viewport: { width: 1280, height: 800 }, reducedMotion: "reduce" });
const errs = [];
p1.on("pageerror", (e) => errs.push(e.message));
await p1.goto("http://localhost:5173/?dev=proto19", { waitUntil: "networkidle" });
await p1.waitForTimeout(400);
console.log("reduced, step0 phase:", await p1.getAttribute('[data-testid="p19-figure"]', "data-phase"));
await p1.keyboard.press("Space");
await p1.waitForTimeout(300);
console.log("reduced, step1 phase:", await p1.getAttribute('[data-testid="p19-figure"]', "data-phase"));
await p1.keyboard.press("Space");
await p1.waitForTimeout(300);
console.log("reduced, step2 phase:", await p1.getAttribute('[data-testid="p19-figure"]', "data-phase"));
await p1.screenshot({ path: "/tmp/p19/20-reduced-step2.png", clip: { x: 0, y: 0, width: 1280, height: 720 } });

// laps=4 must stay true: caption words, node count, two survivors
const p2 = await b.newPage({ viewport: { width: 1280, height: 800 } });
p2.on("pageerror", (e) => errs.push(e.message));
await p2.goto("http://localhost:5173/?dev=proto19&laps=4&lap=300", { waitUntil: "networkidle" });
await p2.waitForTimeout(2600);
console.log("laps=4 caption:", (await p2.textContent('[data-testid="p19-caption-hero"]'))?.trim());
await p2.screenshot({ path: "/tmp/p19/21-laps4.png", clip: { x: 0, y: 0, width: 1280, height: 720 } });
await p2.keyboard.press("Space");
await p2.waitForTimeout(2400);
const humans = await p2.$$eval('[data-testid="p19-figure"] g[transform^="translate"]', (e) => e.length);
console.log("laps=4 human glyphs after merge:", humans);

// laps=2 sanity
const p3 = await b.newPage({ viewport: { width: 1280, height: 800 } });
p3.on("pageerror", (e) => errs.push(e.message));
await p3.goto("http://localhost:5173/?dev=proto19&laps=2", { waitUntil: "networkidle" });
await p3.waitForTimeout(2200);
console.log("laps=2 caption:", (await p3.textContent('[data-testid="p19-caption-hero"]'))?.trim());
await p3.screenshot({ path: "/tmp/p19/22-laps2.png", clip: { x: 0, y: 0, width: 1280, height: 720 } });

console.log("page errors:", errs.length ? errs : "none");
await b.close();
