import { trimTimeFromDate } from "@/utils/dateHandler";

export function cleanedDate(startTime?: string, endTime?: string): string {
  let cleanStart = startTime ? trimTimeFromDate(startTime) : "";
  let cleanEnd = endTime ? trimTimeFromDate(endTime) : "";

  return cleanStart || cleanEnd
    ? `${cleanStart}${cleanEnd ? ` - ${cleanEnd}` : ""}`
    : "Coming soon";
}