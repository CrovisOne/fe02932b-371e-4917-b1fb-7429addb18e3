/**
 * Takes date string of format ISO and returns a cleaned date
 *
 * @param date YYYY-MM-DDT00:00:00.000
 * @returns DD.MM.YYYY as string
 */
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

/**
 * Takes date string of format ISO and returns the time
 *
 * @param date YYYY-MM-DDT00:00:00.000
 * @returns HH:MM as string
 */
export function getTime(date: string): string {
  const newDate = new Date(date);

  return newDate.toLocaleTimeString("en-UK", {
    hour: "numeric",
    minute: "numeric",
  });
}

/**
 * Takes two date strings of format ISO and returns a grouped string with cleaned dates.
 *
 * If The endTime is invalid, than only the startDate will be returned
 *
 * If both dates are invalid, than a backup string will be returned.
 *
 * @param startTime YYYY-MM-DDT00:00:00.000
 * @param endTime YYYY-MM-DDT00:00:00.000
 * @returns DD.MM.YYYY | DD.MM.YYYY - DD.MM.YYYY | Coming soon
 */
export function cleanedDate(startTime?: string, endTime?: string): string {
  let cleanStart = startTime ? trimTimeFromDate(startTime) : "";
  let cleanEnd = endTime ? trimTimeFromDate(endTime) : "";

  if (cleanStart && cleanEnd && cleanStart === cleanEnd) return cleanStart;

  return cleanStart || cleanEnd
    ? `${cleanStart}${cleanEnd ? ` - ${cleanEnd}` : ""}`
    : "Coming soon";
}
