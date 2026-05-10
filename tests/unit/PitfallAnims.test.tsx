import { render, screen } from "@testing-library/react";
import {
  ConflictAnim,
  ConfusionAnim,
  PoisoningAnim,
  DistractionAnim,
  PitCaption,
  PIT_DETAIL,
  PitfallAnim,
  type PitfallKind,
} from "@/slides/foundation-core-section-e/components/PitfallAnims";

test("ConflictAnim mounts and renders an svg", () => {
  render(<ConflictAnim />);
  expect(screen.getByTestId("pit-anim-conflict")).toBeInTheDocument();
});

test("ConfusionAnim mounts and renders an svg", () => {
  render(<ConfusionAnim />);
  expect(screen.getByTestId("pit-anim-confusion")).toBeInTheDocument();
});

test("PoisoningAnim mounts and renders an svg", () => {
  render(<PoisoningAnim />);
  expect(screen.getByTestId("pit-anim-poisoning")).toBeInTheDocument();
});

test("DistractionAnim mounts and renders an svg", () => {
  render(<DistractionAnim />);
  expect(screen.getByTestId("pit-anim-distraction")).toBeInTheDocument();
});

const KINDS: PitfallKind[] = ["conflict", "confusion", "poisoning", "distraction"];

test.each(KINDS)("PitCaption renders detail copy for %s", (kind) => {
  render(<PitCaption kind={kind} />);
  expect(screen.getByTestId(`pit-caption-${kind}`)).toBeInTheDocument();
  expect(screen.getByText((content) => content.includes(PIT_DETAIL[kind].mit))).toBeInTheDocument();
});

test.each(KINDS)("PitfallAnim wrapper resolves %s to its anim", (kind) => {
  render(<PitfallAnim kind={kind} />);
  expect(screen.getByTestId(`pit-anim-${kind}`)).toBeInTheDocument();
});
