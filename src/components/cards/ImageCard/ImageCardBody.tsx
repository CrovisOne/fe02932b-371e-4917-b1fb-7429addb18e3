import { ReactNode } from "react";
import { useImageCardContext } from "./ImageCardContext";
import { CalendarIcon, MapPinIcon } from "lucide-react";
import { cleanedDate } from "./scripts/handleDate";

interface ImageCardBodyProps {
  title?: string;
  startTime?: string;
  endTime?: string;
  locationUrl?: string;
  locationName?: string;
  children?: ReactNode;
}

export function ImageCardBody({
  title,
  startTime,
  endTime,
  locationUrl,
  locationName,
  children,
}: ImageCardBodyProps): JSX.Element {
  const { id } = useImageCardContext();

  const cleanedStartAndEnd = cleanedDate(startTime, endTime);

  return (
    <div id={`image-card-body-${id}`} className="mx-4 mb-4 mt-4 flex-grow">
      <div className="flex flex-col gap-3">
        <h4 className="line-clamp-2">{title}</h4>
        <div className="flex gap-2 font-medium text-gray-500">
          <CalendarIcon />
          <p>{cleanedStartAndEnd}</p>
        </div>
        <div className="flex gap-2 font-medium text-gray-500">
          <MapPinIcon />
          <a
            className="text-purple-600 underline"
            href={locationUrl}
            target="_blank"
          >
            {locationName}
          </a>
        </div>
      </div>
    </div>
  );
}
