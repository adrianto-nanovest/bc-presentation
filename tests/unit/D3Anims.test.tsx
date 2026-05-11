// D3Anims — slide D.3 looping motion glyphs (one per level) smoke tests.
import { render, screen } from "@testing-library/react";
import {
  D3BpmAnim,
  D3RpaAnim,
  D3IpaAnim,
  D3AgenticAnim,
} from "@/slides/foundation-core/components/D3Anims";

test("D3BpmAnim renders without crashing", () => {
  render(<D3BpmAnim copper="copper-700" />);
  expect(screen.getByTestId("d3-bpm-anim")).toBeInTheDocument();
});

test("D3RpaAnim renders without crashing", () => {
  render(<D3RpaAnim copper="copper-500" />);
  expect(screen.getByTestId("d3-rpa-anim")).toBeInTheDocument();
});

test("D3IpaAnim renders without crashing and contains an SVG", () => {
  const { container } = render(<D3IpaAnim copper="copper-300" />);
  expect(screen.getByTestId("d3-ipa-anim")).toBeInTheDocument();
  expect(container.querySelector("svg")).not.toBeNull();
});

test("D3AgenticAnim renders without crashing and contains an SVG", () => {
  const { container } = render(<D3AgenticAnim copper="copper-200" />);
  expect(screen.getByTestId("d3-agentic-anim")).toBeInTheDocument();
  expect(container.querySelector("svg")).not.toBeNull();
});
