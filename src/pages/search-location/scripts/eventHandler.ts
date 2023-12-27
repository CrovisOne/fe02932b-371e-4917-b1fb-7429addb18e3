import { EventProps } from "@/types/events";
import { LocationProps } from "./reduceToUniqueLocations";

/**
 * A simple filter function
 *
 * Filters the locations by comparing title and search query string
 *
 * @param locations List of locations, which need to be filtered
 * @param query The Query string which is used for the comparision
 * @returns Filtered event list
 */
const filterLocations = (locations: LocationProps[], query: string) => {
  if (query.length === 0) return locations;

  return locations.filter((location) =>
    location.venue.name.toLocaleLowerCase().includes(query.toLocaleLowerCase()),
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

export { filterLocations, sortEvents };
