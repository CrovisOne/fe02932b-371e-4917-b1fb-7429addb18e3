import { createContext, useContext } from "react";
import { ImageCardProps } from ".";

const ImageCardContext = createContext<ImageCardProps | null>(null);

export function useImageCardContext(): ImageCardProps {
  const context = useContext(ImageCardContext);

  if (context === null) {
    throw new Error("ImageCard.* must be rendered as a child of ImageCard");
  }

  return context;
}

export default ImageCardContext;
