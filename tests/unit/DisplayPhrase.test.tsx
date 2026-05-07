import { render, screen } from "@testing-library/react";
import { DisplayPhrase } from "@/slides/reveal-and-closing/components/DisplayPhrase";

test("DisplayPhrase renders all words as inline spans", () => {
  render(<DisplayPhrase staggerType="word" words={["Foundation", "before", "velocity"]} />);
  const words = screen.getAllByTestId("phrase-word");
  expect(words.map((w) => w.textContent?.trim())).toEqual([
    "Foundation",
    "before",
    "velocity",
  ]);
});

test("DisplayPhrase supports per-word duration overrides", () => {
  render(
    <DisplayPhrase
      staggerType="word"
      words={[
        { text: "Foundation", durationMs: 250 },
        { text: "before", durationMs: 200 },
        { text: "velocity", durationMs: 250 },
      ]}
    />,
  );
  const words = screen.getAllByTestId("phrase-word");
  expect(words[0].getAttribute("data-duration-ms")).toBe("250");
  expect(words[1].getAttribute("data-duration-ms")).toBe("200");
});

test("DisplayPhrase phrase mode renders each phrase as a discrete block", () => {
  render(
    <DisplayPhrase
      staggerType="phrase"
      words={["Theory ends.", "Hands begin."]}
    />,
  );
  const phrases = screen.getAllByTestId("phrase-word");
  expect(phrases).toHaveLength(2);
});
