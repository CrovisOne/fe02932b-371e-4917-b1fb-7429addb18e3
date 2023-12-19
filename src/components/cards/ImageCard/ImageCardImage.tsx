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
      className="aspect-video rounded-t-lg object-cover object-top"
      src={imageUrl ?? PlaceholderImage}
    ></img>
  );
}
