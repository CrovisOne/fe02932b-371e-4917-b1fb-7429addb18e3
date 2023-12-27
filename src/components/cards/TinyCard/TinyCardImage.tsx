import PlaceholderImage from "@/assets/pexels-pixabay-36717.jpg";
import { useTinyCardContext } from "./TinyCardContext";

interface TinyCardImageProps {
  imageUrl?: string;
  locationName: string;
}

export function TinyCardImage({
  imageUrl,
  locationName,
}: TinyCardImageProps): JSX.Element {
  const { id } = useTinyCardContext();

  return (
    <div className="img-wrapper" id={`tiny-card-image-${id}`}>
      <img
        src={imageUrl ?? PlaceholderImage}
        onError={(e) => {
          (e.target as HTMLImageElement).src = PlaceholderImage;
        }}
      />
      <p className="title">{locationName}</p>
    </div>
  );
}
