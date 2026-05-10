// Reveal / CopperRule — smoke tests for the Section E animation primitives.
import { render } from "@testing-library/react";
import {
  Reveal,
  CopperRule,
} from "@/slides/foundation-core-section-e/components/Reveal";

test("Reveal applies `fade` baseline class and adds `on` when on=true", () => {
  const { rerender, container } = render(<Reveal on={false}>x</Reveal>);
  const div = container.firstElementChild as HTMLElement;
  expect(div.className).toContain("fade");
  expect(div.className).not.toContain(" on");
  rerender(<Reveal on>x</Reveal>);
  expect(div.className).toContain("fade");
  expect(div.className).toContain("on");
});

test("Reveal applies transitionDelay/animationDelay only when on=true", () => {
  const { rerender, container } = render(
    <Reveal on={false} delay={250}>
      x
    </Reveal>,
  );
  const div = container.firstElementChild as HTMLElement;
  expect(div.style.transitionDelay).toBe("0ms");
  expect(div.style.animationDelay).toBe("0ms");
  rerender(
    <Reveal on delay={250}>
      x
    </Reveal>,
  );
  expect(div.style.transitionDelay).toBe("250ms");
  expect(div.style.animationDelay).toBe("250ms");
});

test("Reveal honors `as` prop and merges className", () => {
  const { container } = render(
    <Reveal on as="section" className="custom">
      x
    </Reveal>,
  );
  const el = container.firstElementChild as HTMLElement;
  expect(el.tagName).toBe("SECTION");
  expect(el.className).toContain("fade");
  expect(el.className).toContain("on");
  expect(el.className).toContain("custom");
});

test("Reveal forwards data-* attributes", () => {
  const { container } = render(
    <Reveal on data-testid="reveal-x">
      x
    </Reveal>,
  );
  const el = container.firstElementChild as HTMLElement;
  expect(el.getAttribute("data-testid")).toBe("reveal-x");
});

test("CopperRule sets width and toggles `on` class", () => {
  const { rerender, container } = render(<CopperRule on={false} width="40%" />);
  const div = container.firstElementChild as HTMLElement;
  expect(div.className).toContain("copper-rule");
  expect(div.className).not.toContain(" on");
  expect(div.style.width).toBe("40%");
  rerender(<CopperRule on width="40%" delay={300} />);
  expect(div.className).toContain("on");
  expect(div.style.transitionDelay).toBe("300ms");
});
