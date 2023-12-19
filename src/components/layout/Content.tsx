import { ReactNode } from "react";

interface ContentProps {
  children: ReactNode;
}

export function Content({ children }: ContentProps): JSX.Element {
  return (
    <div className="mx-auto mt-16 h-full max-w-screen-xl px-4">{children}</div>
  );
}
