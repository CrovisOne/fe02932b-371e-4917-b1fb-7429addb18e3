import PlaceholderImage from "@/assets/pexels-pixabay-36717.jpg";

interface SummaryCardImageProps {
  imageUrl?: string;
  className?: string;
}

export function SummaryCardImage({
  imageUrl,
  className,
}: SummaryCardImageProps): JSX.Element {
  return (
    <img
      className={`summary-card-image ${className ?? ""}`}
      src={imageUrl ?? PlaceholderImage}
    ></img>
  );
}
