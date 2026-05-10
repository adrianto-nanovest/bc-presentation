/* global window, React, ReactDOM, DeckProvider, Stage,
   SlideE1, SlideE2, SlideE3, SlideE4, SlideE5, SlideE6, SlideE7, SlideE8, SlideE9, SlideE10, SlideE11 */

const SLIDES = [
  { id: 'e1',  steps: 4, component: SlideE1 },
  { id: 'e2',  steps: 6, component: SlideE2 },
  { id: 'e3',  steps: 3, component: SlideE3 },
  { id: 'e4',  steps: 4, component: SlideE4 },
  { id: 'e5',  steps: 4, component: SlideE5 },
  { id: 'e6',  steps: 3, component: SlideE6 },
  { id: 'e7',  steps: 6, component: SlideE7 },
  { id: 'e8',  steps: 2, component: SlideE8 },
  { id: 'e9',  steps: 5, component: SlideE9 },
  { id: 'e10', steps: 2, component: SlideE10 },
  { id: 'e11', steps: 2, component: SlideE11 },
];

function App() {
  return (
    <DeckProvider slides={SLIDES}>
      <Stage />
    </DeckProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
