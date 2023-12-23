import { EventProps } from "@/types/events";
import { trimTimeFromDate } from "@/utils/dateHandler";

export type DateRangeReturnType = {
  earliest: string;
  latest: string;
};

export function getDateRange(events: EventProps[]): DateRangeReturnType {
  if (events.length === 0) return { earliest: "", latest: "" };

  let earliest = new Date(events[0].date);
  let latest = new Date(events[0].date);

  for (let i = 0; i < events.length; i++) {
    const date = new Date(events[i].date);
    if (date < earliest) {
      earliest = date;
    }
    if (date > latest) {
      latest = date;
    }
  }

  const cleanedEarliest = trimTimeFromDate(earliest.toISOString());
  const ceanedLatest = trimTimeFromDate(latest.toISOString());

  return { earliest: cleanedEarliest, latest: ceanedLatest };
}
