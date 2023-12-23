import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MoreDetailsContent } from "@/utils/MoreDetailsDate";
import { cleanedDate, getTime, trimTimeFromDate } from "@/utils/dateHandler";
import { CalendarIcon, InfoIcon, MapPinIcon } from "lucide-react";

interface DateAndLocationProps {
  startTime: string | undefined;
  endTime: string | undefined;
  direction?: string;
  venueName: string;
}

export function DateAndLocation({
  startTime,
  endTime,
  direction,
  venueName,
}: DateAndLocationProps): JSX.Element {
  const cleanDate = cleanedDate(startTime, endTime);

  return (
    <div className="date-location flex-col md:flex-row">
      <div className="box">
        <span className="title">
          <CalendarIcon />
          <p>When?</p>
        </span>
        <span className="date">
          {cleanDate}{" "}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"ghost"}
                size={"sm"}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <InfoIcon className="h-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="popover-box">
              <p className="popover-title">More Details</p>
              <div className="popover-content">
                <MoreDetailsContent start={startTime} end={endTime} />
              </div>
            </PopoverContent>
          </Popover>
        </span>
      </div>
      <div className="box">
        <span className="title">
          <MapPinIcon />
          <p>Where?</p>
        </span>
        {direction ? (
          <a className="a-link" href={direction} target="_blank">
            {venueName}
          </a>
        ) : (
          "Coming soon"
        )}
      </div>
    </div>
  );
}
