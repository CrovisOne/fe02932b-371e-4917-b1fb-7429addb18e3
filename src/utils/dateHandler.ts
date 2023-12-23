export function trimTimeFromDate(date: string): string {
  const newDate = new Date(date);

  const dateOnly = newDate
    .toLocaleDateString("en-UK", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/\//g, ".");

  return dateOnly;
}

export function getTime(date: string): string {
  const newDate = new Date(date);

  return newDate.toLocaleTimeString("en-UK", {
    hour: "numeric",
    minute: "numeric",
  });
}

export function cleanedDate(startTime?: string, endTime?: string): string {
  let cleanStart = startTime ? trimTimeFromDate(startTime) : "";
  let cleanEnd = endTime ? trimTimeFromDate(endTime) : "";

  if (cleanStart && cleanEnd && cleanStart === cleanEnd) return cleanStart;

  return cleanStart || cleanEnd
    ? `${cleanStart}${cleanEnd ? ` - ${cleanEnd}` : ""}`
    : "Coming soon";
}
