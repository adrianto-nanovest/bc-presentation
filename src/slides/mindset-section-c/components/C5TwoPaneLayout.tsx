// C5TwoPaneLayout — pure structural two-pane layout for C.5
// (Role → Trajectory). Mirrors E9's coordinate envelope exactly:
// LEFT: left:48 top:156 width:500 bottom:80
// RIGHT: right:48 top:156 width:540 bottom:80
//
// No animation, no content, no padding. The consumer places the absolute
// container around this component and supplies `left` / `right` ReactNode
// children which render inside the two flex-column panes.

import type { CSSProperties, ReactNode } from "react";

export interface C5TwoPaneLayoutProps {
  left: ReactNode;
  right: ReactNode;
}

const LEFT_PANE_STYLE: CSSProperties = {
  position: "absolute",
  left: 48,
  top: 156,
  width: 500,
  bottom: 80,
  display: "flex",
  flexDirection: "column",
};

const RIGHT_PANE_STYLE: CSSProperties = {
  position: "absolute",
  right: 48,
  top: 156,
  width: 540,
  bottom: 80,
  display: "flex",
  flexDirection: "column",
};

export default function C5TwoPaneLayout({ left, right }: C5TwoPaneLayoutProps) {
  return (
    <>
      <div data-testid="c5-left-pane" style={LEFT_PANE_STYLE}>
        {left}
      </div>
      <div data-testid="c5-right-pane" style={RIGHT_PANE_STYLE}>
        {right}
      </div>
    </>
  );
}
