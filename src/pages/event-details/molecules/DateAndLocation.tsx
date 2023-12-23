import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
