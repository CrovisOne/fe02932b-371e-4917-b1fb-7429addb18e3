import { EventProps } from "@/types/events";

/**
 * A simple filter function
 *
 * Filters the events by comparing title and search query string
 *
 * @param events List of events, which need to be filtered
 * @param query The Query string which is used for the comparision
 * @returns Filtered event list
 */
const filterEvents = (events: EventProps[], query: string) => {
  if (query.length === 0) return events;

  return events.filter((event) =>
    event.title.toLocaleLowerCase().includes(query.toLocaleLowerCase()),
  );
};

/**
 * A simple sort function
 *
 * Sorts the events by earliest to latest
 *
 * @param events List of events, which need to be sorted
 * @returns Sorted event list
 */
const sortEvents = (events: EventProps[]) => {
  return events.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );
};

export { filterEvents, sortEvents };
