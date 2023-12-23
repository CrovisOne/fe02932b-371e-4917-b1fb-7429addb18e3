import { getTime, trimTimeFromDate } from "./dateHandler";

interface MoreDetailsContentProps {
  start?: string;
  end?: string;
}

export function MoreDetailsContent({
  start,
  end,
}: MoreDetailsContentProps): JSX.Element {
  const startDate = start ? trimTimeFromDate(start) : "";
  const startTime = start ? getTime(start) : "";

  const endDate = end ? trimTimeFromDate(end) : "";
  const endTime = end ? getTime(end) : "";

  return (
    <>
      <div className="start-date flex gap-1 ">
        <p>Start: </p>
        <p>{startDate} - </p>
        <p>{startTime}</p>
      </div>
      <div className="end-date flex gap-1">
        <p>End: </p>
        <p>{endDate} - </p>
        <p>{endTime}</p>
      </div>
    </>
  );
}
