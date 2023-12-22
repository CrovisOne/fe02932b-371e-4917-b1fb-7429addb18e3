import { useImageCardContext } from "./ImageCardContext";
import PlaceholderImage from "@/assets/pexels-pixabay-36717.jpg";

interface ImageProps {
  imageUrl?: string;
}

export function ImageCardImage({ imageUrl }: ImageProps): JSX.Element {
  const { id } = useImageCardContext();

  return (
    <img
      id={`image-card-image-${id}`}
      className="image-card-image"
      src={imageUrl ?? PlaceholderImage}
    ></img>
  );
}
