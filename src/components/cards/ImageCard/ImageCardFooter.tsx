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
      className={`image-card-footer align-${align}`}
    >
      {children}
    </div>
  );
}
