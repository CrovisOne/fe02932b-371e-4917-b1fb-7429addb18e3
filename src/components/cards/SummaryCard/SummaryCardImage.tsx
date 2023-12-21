import PlaceholderImage from "@/assets/pexels-pixabay-36717.jpg";

interface SummaryCardImageProps {
  imageUrl?: string;
}

export function SummaryCardImage({
  imageUrl,
}: SummaryCardImageProps): JSX.Element {
  return (
    <img
      className="aspect-square rounded-sm object-cover"
      src={imageUrl ?? PlaceholderImage}
    ></img>
  );
}
