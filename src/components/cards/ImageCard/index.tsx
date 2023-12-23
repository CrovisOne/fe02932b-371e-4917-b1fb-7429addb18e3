import { ForwardedRef, ReactNode, forwardRef } from "react";
import ImageCardContext from "./ImageCardContext";
import { ImageCardImage } from "./ImageCardImage";
import { ImageCardBody } from "./ImageCardBody";
import { ImageCardFooter } from "./ImageCardFooter";

import "./ImageCard.scss";

export interface ImageCardProps {
  id: string | number;
  children?: ReactNode;
  [prop: string]: any;
}

const ForwardedImageCard = forwardRef<HTMLDivElement, ImageCardProps>(
  (
    { id, children, ...props },
    ref: ForwardedRef<HTMLDivElement>,
  ): JSX.Element => {
    return (
      <ImageCardContext.Provider value={{ id }}>
        <div ref={ref} {...props} className="image-card shadow-md">
          {children}
        </div>
      </ImageCardContext.Provider>
    );
  },
);

export const ImageCard = Object.assign(ForwardedImageCard, {
  Image: ImageCardImage,
  Body: ImageCardBody,
  Footer: ImageCardFooter,
});
