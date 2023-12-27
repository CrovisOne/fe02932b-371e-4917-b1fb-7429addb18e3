import { Content } from "@/components/layout";
import {
  BadgeMolecule,
  LocationsMolecule,
  SearchMolecule,
  UpcomingEventsMolcule,
} from "./molecules";
import {
  ChangeEvent,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { EventListContext } from "@/provider/EventListProvider";
import { getDateRange } from "../search-event/scripts/eventDateRange";
import {
  LocationProps,
  reduceToUniqueLocations,
} from "./scripts/reduceToUniqueLocations";
import { useParams } from "react-router-dom";
import { CartContext } from "@/provider/CartProvider";
import { EventProps } from "@/types/events";
import { useToast } from "@/components/ui/use-toast";
import { debounce } from "@/utils/debouncer";
import { filterLocations, sortEvents } from "./scripts/eventHandler";
import { UseAxiosProps, useAxios } from "@/hooks/useAxios";
import { getEventsApiRoute } from "@/routes/apiRoutes";

import "./search-location.scss";
import { FloatingScrollButton } from "@/components/floating/FloatingScrollButton";

export function SearchLocationsPage(): JSX.Element {
  const { toast } = useToast();
  const { id } = useParams();
  const { events, setEvents } = useContext(EventListContext);
  const { addCartItem, cartContent } = useContext(CartContext);

  const reducedEvents = useMemo(() => {
    return reduceToUniqueLocations(events);
  }, [events]);
  const [reducedLocations, setReducedLocations] =
    useState<LocationProps[]>(reducedEvents);
  const [filteredLocations, setFilteredLocations] =
    useState<LocationProps[]>(reducedEvents);

  const axiosPorps: UseAxiosProps = { url: getEventsApiRoute(), method: "get" };
  const {
    callAxios: fetchEvents,
    data: eventData,
    loading,
    error,
  } = useAxios<EventProps[]>(axiosPorps);

  const searchRef = useRef<HTMLInputElement>(null);
  const fetchedData = useRef(false); // To make sure, that data gets fetched only once

  const dateRange = getDateRange(events);

  const correspondingEvents =
    filteredLocations.find((location) => location.venue.id === id)?.events ??
    [];
  const sortedEvents = sortEvents(correspondingEvents).filter(
    (item) => !cartContent.some((cartItem) => cartItem._id === item._id),
  );

  const search = debounce((e: ChangeEvent<HTMLInputElement>) => {
    const newLocations = filterLocations(reducedLocations, e.target.value);
    setFilteredLocations(newLocations);
  }, 400);

  const handleSearchClick = () => {
    if (searchRef.current) {
      const newLocations = filterLocations(
        reducedLocations,
        searchRef.current.value,
      );
      setFilteredLocations(newLocations);
    }
  };

  const addToCart = (event: EventProps): void => {
    addCartItem(event);
    toast({
      variant: "success",
      title: "You Added an Event to your Cart",
      description: event.title,
    });
  };

  // Add event data to Context API
  useEffect(() => {
    if (eventData === null) return;
    if (error !== null) return;
    setEvents(eventData);
    setReducedLocations(reduceToUniqueLocations(eventData));
    setFilteredLocations(reduceToUniqueLocations(eventData));
  }, [eventData]);

  // Fetch Data
  useLayoutEffect(() => {
    if (fetchedData.current) return;
    if (events.length > 0) return;
    fetchEvents();
    fetchedData.current = true;
  }, []);

  return (
    <>
      <main className="search-location-main-content">
        <Content navSpace>
          <div className="header">
            <h3>Locations</h3>
            <div className="tools flex-col sm:flex-row">
              <BadgeMolecule dateRange={dateRange} />
              <SearchMolecule
                handleSearchClick={handleSearchClick}
                search={search}
                ref={searchRef}
              />
            </div>
          </div>
          <LocationsMolecule
            currentLocationId={id ?? "-1"}
            locations={filteredLocations}
            loading={loading}
            error={error}
          />
          <UpcomingEventsMolcule events={sortedEvents} addToCart={addToCart} />
        </Content>
      </main>
      <FloatingScrollButton />
    </>
  );
}
