import { ReactNode } from "react";
import ImageCardContext from "./ImageCardContext";
import { ImageCardImage } from "./ImageCardImage";
import { ImageCardBody } from "./ImageCardBody";
import { ImageCardFooter } from "./ImageCardFooter";

import "./ImageCard.scss";

export interface ImageCardProps {
  id: string | number;
  children?: ReactNode;
}

export function ImageCard({ id, children }: ImageCardProps): JSX.Element {
  return (
    <ImageCardContext.Provider value={{ id }}>
      <div className="image-card shadow-md">{children}</div>
    </ImageCardContext.Provider>
  );
}

ImageCard.Image = ImageCardImage;
ImageCard.Body = ImageCardBody;
ImageCard.Footer = ImageCardFooter;
