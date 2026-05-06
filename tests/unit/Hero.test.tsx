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
