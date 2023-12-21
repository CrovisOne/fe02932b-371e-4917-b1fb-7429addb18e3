import { ReactNode } from "react";
import "./StickyBar.scss";

interface StickyBarProps {
  children: ReactNode;
}

export function StickyBar({ children }: StickyBarProps): JSX.Element {
  return (
    <div className="bar top-16 bg-white/60 px-4 py-2 backdrop-blur-xl">
      <p className="text">{children}</p>
    </div>
  );
}
