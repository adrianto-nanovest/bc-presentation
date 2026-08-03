import { Deck } from "./deck/Deck";
// PROTOTYPE gh#15 — light theme toggle + variant bar. Remove with the branch.
import { PrototypeGh15ThemeBar } from "./deck/PrototypeGh15ThemeBar";

export default function App() {
  return (
    <>
      <Deck />
      {import.meta.env.DEV && <PrototypeGh15ThemeBar />}
    </>
  );
}
