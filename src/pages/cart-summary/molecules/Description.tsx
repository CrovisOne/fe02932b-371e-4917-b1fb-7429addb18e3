import { EventProps } from "@/types/events";
import { cleanedDate } from "@/utils/dateHandler";
import { CalendarIcon, MapPinIcon } from "lucide-react";

interface DescriptionProps {
  event: EventProps;
}

export function Description({ event }: DescriptionProps): JSX.Element {
  return (
    <>
      <span className="flex items-center gap-2 text-slate-500">
        <CalendarIcon className="h-4" />
        <p>{cleanedDate(event.startTime, event.endTime)}</p>
      </span>
      <span className="flex items-center gap-2 text-slate-500">
        <MapPinIcon className="h-4" />
        <a href={event.venue.direction} className="a-link" target="_blank">
          {event.venue.name}
        </a>
      </span>
    </>
  );
}
