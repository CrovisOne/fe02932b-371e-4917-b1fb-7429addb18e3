import { ReactNode } from "react";

import "./Content.scss";

interface ContentProps {
  children: ReactNode;
  navSpace?: boolean;
}

export function Content({
  navSpace = false,
  children,
}: ContentProps): JSX.Element {
  return (
    <div className={`c-wrapper ${navSpace ? "with-nav-space" : ""}`}>
      {children}
    </div>
  );
}
