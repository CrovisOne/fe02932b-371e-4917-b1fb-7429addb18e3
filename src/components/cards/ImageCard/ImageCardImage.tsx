import { ReactNode } from "react";
import { useImageCardContext } from "./ImageCardContext";
import PlaceholderImage from "@/assets/pexels-pixabay-36717.jpg";

interface ImageProps {
  imageUrl?: string;
  badge?: ReactNode;
}

export function ImageCardImage({ imageUrl, badge }: ImageProps): JSX.Element {
  const { id } = useImageCardContext();

  return (
    <div className="image-wrapper">
      <img
        id={`image-card-image-${id}`}
        className="image-card-image"
        src={imageUrl ?? PlaceholderImage}
        onError={(e) => {
          (e.target as HTMLImageElement).src = PlaceholderImage;
        }}
      />
      {badge ? (
        <div className="image-badge backdrop-blur-lg">{badge}</div>
      ) : null}
    </div>
  );
}
