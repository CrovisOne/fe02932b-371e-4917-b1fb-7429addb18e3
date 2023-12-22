import { ReactNode } from "react";

import "./NotePlaceholder.scss";

interface NotePlaceholderProps {
  children: ReactNode;
}

export function NotePlaceholder({
  children,
}: NotePlaceholderProps): JSX.Element {
  return <div className="note-placeholder">{children}</div>;
}
