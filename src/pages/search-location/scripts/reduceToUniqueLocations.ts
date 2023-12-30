import { EventProps, VenueProps } from "@/types/events";

export interface LocationProps {
  venue: VenueProps;
  events: EventProps[];
}

export function reduceToUniqueLocations(events: EventProps[]): LocationProps[] {
  return events.reduce(
    (acc: LocationProps[], event: EventProps): LocationProps[] => {
      const venueId = event.venue.id;
      const existingVenue = acc.find(
        (location) => location.venue.id === venueId,
      );

      if (existingVenue) {
        existingVenue.events.push(event);
      } else {
        acc.push({ venue: event.venue, events: [event] });
      }

      return acc;
    },
    [],
  );
}
