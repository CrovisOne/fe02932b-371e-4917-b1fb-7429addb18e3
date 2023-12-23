import { ReactNode } from "react";
import { useImageCardContext } from "./ImageCardContext";
import { CalendarIcon, InfoIcon, MapPinIcon } from "lucide-react";
import { Popover } from "@/components/ui/popover";
import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { Button } from "@/components/ui/button";
import { cleanedDate } from "@/utils/dateHandler";
import { MoreDetailsContent } from "@/utils/MoreDetailsDate";

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
            <Button
              variant={"ghost"}
              size={"sm"}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
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
        <a
          className="a-link"
          href={locationUrl}
          target="_blank"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {locationName}
        </a>
      </div>
    </div>
  );
}
