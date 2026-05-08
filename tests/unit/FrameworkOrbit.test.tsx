import { render, screen, fireEvent } from "@testing-library/react";
import { FrameworkOrbit } from "@/slides/foundation-core-section-e/components/FrameworkOrbit";

const TILES = [
  { id: "race", acronym: "RACE", breakdown: "Role · Action · Context · Explanation", spineHits: [1, 2, 4] },
  { id: "care", acronym: "CARE", breakdown: "Context · Action · Result · Example", spineHits: [4, 2, 3, 5] },
  { id: "ape", acronym: "APE", breakdown: "Action · Purpose · Execution", spineHits: [2] },
  { id: "roses", acronym: "ROSES", breakdown: "Role · Objective · Scenario · Expected output · Solution", spineHits: [1, 2, 4, 3, 2] },
  { id: "create", acronym: "CREATE", breakdown: "Character · Request · Examples · Adjustments · Type · Extras", spineHits: [1, 2, 5, 3, 4] },
  { id: "coast", acronym: "COAST", breakdown: "Context · Objective · Actions · Scenario · Task", spineHits: [4, 2, 2, 4, 2] },
  { id: "tag", acronym: "TAG", breakdown: "Task · Action · Goal", spineHits: [2, 2, 2] },
  { id: "pain", acronym: "PAIN", breakdown: "Problem · Action · Information · Next steps", spineHits: [4, 2, 6, 2] },
  { id: "rise", acronym: "RISE", breakdown: "Role · Input · Steps · Execution", spineHits: [1, 6, 2, 2] },
  { id: "creo", acronym: "CREO", breakdown: "Context · Request · Explanation · Outcome", spineHits: [4, 2, 3, 2] },
] as const;

test("FrameworkOrbit renders 10 acronym tiles", () => {
  render(<FrameworkOrbit tiles={TILES} revealed onHoverChange={() => {}} />);
  expect(screen.getAllByTestId(/^framework-tile-/)).toHaveLength(10);
});

test("hovering a tile fires onHoverChange with the framework id", () => {
  const calls: (string | null)[] = [];
  render(<FrameworkOrbit tiles={TILES} revealed onHoverChange={(id) => calls.push(id)} />);
  fireEvent.mouseEnter(screen.getByTestId("framework-tile-race"));
  fireEvent.mouseLeave(screen.getByTestId("framework-tile-race"));
  expect(calls).toEqual(["race", null]);
});

test("orbit hides until revealed", () => {
  const { rerender } = render(<FrameworkOrbit tiles={TILES} revealed={false} onHoverChange={() => {}} />);
  const orbit = screen.getByTestId("framework-orbit");
  expect(orbit.getAttribute("data-revealed")).toBe("false");
  rerender(<FrameworkOrbit tiles={TILES} revealed onHoverChange={() => {}} />);
  expect(screen.getByTestId("framework-orbit").getAttribute("data-revealed")).toBe("true");
});
