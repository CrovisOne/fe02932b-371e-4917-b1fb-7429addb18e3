import { ReactNode } from "react";
import { useImageCardContext } from "./ImageCardContext";

interface ImageCardFooterProps {
  children?: ReactNode;
  align?: "left" | "center" | "right" | "between";
}

export function ImageCardFooter({
  children,
  align,
}: ImageCardFooterProps): JSX.Element {
  const { id } = useImageCardContext();

  return (
    <div
      id={`image-card-footer-${id}`}
      className={`mx-4 mb-4 flex align-${align}`}
    >
      {children}
    </div>
  );
}
