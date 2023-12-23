import { ReactNode } from "react";
import "./StickyBar.scss";

interface StickyBarProps {
  children: ReactNode;
  className?: string;
}

export function StickyBar({
  children,
  className,
}: StickyBarProps): JSX.Element {
  return (
    <div className={`bar backdrop-blur-xl ${className ?? ""}`}>
      <div className="content">{children}</div>
    </div>
  );
}
