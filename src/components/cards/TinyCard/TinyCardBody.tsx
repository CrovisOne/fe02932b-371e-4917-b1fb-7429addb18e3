import { MapPinIcon, PartyPopperIcon } from "lucide-react";
import { useTinyCardContext } from "./TinyCardContext";

interface TinyCardContentProps {
  locationUrl?: string;
  locationName?: string;
  eventCount?: number;
}

export function TinyCardBody({
  locationUrl,
  eventCount,
}: TinyCardContentProps) {
  const { id } = useTinyCardContext();

  return (
    <div id={`tiny-card-body-${id}`} className="tiny-card-body">
      <div className="direction">
        <MapPinIcon className="h-4 w-4" />
        <a href={locationUrl} target="_blank" className="a-link line-clamp-2">
          Direction
        </a>
      </div>
      <div className="event-count">
        <PartyPopperIcon className="h-4 w-4" />
        <p>{`Events: ${eventCount ?? 0}`}</p>
      </div>
    </div>
  );
}
