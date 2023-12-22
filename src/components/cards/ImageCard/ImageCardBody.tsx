import { ReactNode } from "react";
import { useImageCardContext } from "./ImageCardContext";
import { CalendarIcon, InfoIcon, MapPinIcon } from "lucide-react";
import { cleanedDate } from "./scripts/handleDate";
import { Popover } from "@/components/ui/popover";
import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { Button } from "@/components/ui/button";
import { getTime, trimTimeFromDate } from "@/utils/dateHandler";

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
    <div id={`image-card-body-${id}`} className="image-card-body">
      <h4 className="title">{title}</h4>
      <div className="date-info">
        <CalendarIcon />
        <p>{cleanedStartAndEnd}</p>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant={"ghost"} size={"sm"}>
              <InfoIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="popover-box">
            <p className="popover-title">More Details</p>
            <div className="popover-content">
              <MoreDetailsContent start={startTime} end={endTime} />
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <div className="location-info">
        <MapPinIcon />
        <a href={locationUrl} target="_blank">
          {locationName}
        </a>
      </div>
    </div>
  );
}

interface MoreDetailsContentProps {
  start?: string;
  end?: string;
}

function MoreDetailsContent({
  start,
  end,
}: MoreDetailsContentProps): JSX.Element {
  const startDate = start ? trimTimeFromDate(start) : "";
  const startTime = start ? getTime(start) : "";

  const endDate = end ? trimTimeFromDate(end) : "";
  const endTime = end ? getTime(end) : "";

  return (
    <>
      <div className="start-date">
        <p>Start</p>
        <p>{startDate}</p>
        <p>{startTime}</p>
      </div>
      <div className="end-date">
        <p>End</p>
        <p>{endDate}</p>
        <p>{endTime}</p>
      </div>
    </>
  );
}
