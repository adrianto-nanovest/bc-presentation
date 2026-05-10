/* global window, React, ReactDOM, DeckProvider, Stage,
   SlideD1, SlideD2, SlideD3, SlideD4, SlideD5 */

const SLIDES = [
  { id: 'd1', steps: 3, component: SlideD1 },
  { id: 'd2', steps: 3, component: SlideD2 },
  { id: 'd3', steps: 5, component: SlideD3 },
  { id: 'd4', steps: 6, component: SlideD4 },
  { id: 'd5', steps: 3, component: SlideD5 },
];

function App() {
  return (
    <DeckProvider slides={SLIDES}>
      <Stage />
    </DeckProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
