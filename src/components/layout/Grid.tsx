import { ReactNode } from "react";

import "./Grid.scss";

interface GridProps {
  children: ReactNode;
}

export function Grid({ children }: GridProps): JSX.Element {
  return <div className="c-grid">{children}</div>;
}
