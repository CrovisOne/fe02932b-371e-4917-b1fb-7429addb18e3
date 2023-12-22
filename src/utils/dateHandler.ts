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
