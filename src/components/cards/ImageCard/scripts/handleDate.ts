import { trimTimeFromDate } from "@/utils/dateHandler";

export function cleanedDate(startTime?: string, endTime?: string): string {
  let cleanStart = startTime ? trimTimeFromDate(startTime) : "";
  let cleanEnd = endTime ? trimTimeFromDate(endTime) : "";

  if (cleanStart && cleanEnd && cleanStart === cleanEnd) return cleanStart;

  return cleanStart || cleanEnd
    ? `${cleanStart}${cleanEnd ? ` - ${cleanEnd}` : ""}`
    : "Coming soon";
}
