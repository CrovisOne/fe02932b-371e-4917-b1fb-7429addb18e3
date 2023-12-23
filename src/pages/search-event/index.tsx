import DummyData from "../../assets/dummy.json";
import { Content } from "@/components/layout";
import {
  ChangeEvent,
  RefObject,
  createRef,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { EventListContext } from "@/provider/EventListProvider";
import { CartContext } from "@/provider/CartProvider";
import { EventProps } from "@/types/events";
import { observeCards } from "./scripts/dateObserver";
import { filterEvents, sortEvents } from "./scripts/eventHandler";
import { debounce } from "@/utils/debouncer";
import { getDateRange } from "./scripts/eventDateRange";
import { useToast } from "@/components/ui/use-toast";
import { FloatingScrollButton } from "@/components/floating/FloatingScrollButton";
import { useAxios } from "@/hooks/useAxios";
import { getEventsApiRoute } from "@/routes/apiRoutes";
import {
  BadgeMolecule,
  ContentMolecule,
  SearchMolecule,
  StickyBarMolecule,
} from "./molecules";

import "./search-events.scss";

export function SearchEventPage(): JSX.Element {
  const { toast } = useToast();
  const {
    callAxios: fetchEvents,
    data: eventData,
    loading,
    error,
  } = useAxios<EventProps[]>({
    url: getEventsApiRoute(),
    method: "get",
  });
  const { events, setEvents } = useContext(EventListContext);
  const { addCartItem, cartContent } = useContext(CartContext);
  const [currentDate, setCurrentDate] = useState<string | null>(null);
  const [filteredEvents, setFilteredEvents] = useState<EventProps[]>([]);
  const [cardRefs, setCardRefs] = useState<
    (RefObject<HTMLDivElement> | null)[]
  >([]);

  const fetchedData = useRef(false);
  const searchRef = useRef<HTMLInputElement>(null);

  const sortedEvents = sortEvents(filteredEvents).filter(
    (item) => !cartContent.some((cartItem) => cartItem._id === item._id),
  );
  const cleanedCardRefs = cardRefs.filter(
    (ref) => ref !== null,
  ) as RefObject<HTMLDivElement>[];

  const addToCart = (event: EventProps): void => {
    addCartItem(event);
    toast({
      variant: "success",
      title: "You Added an Event to your Cart",
      description: event.title,
    });
  };

  const search = debounce((e: ChangeEvent<HTMLInputElement>) => {
    const newEvents = filterEvents(events, e.target.value);
    setFilteredEvents(newEvents);
  }, 400);

  const handleSearchClick = () => {
    if (searchRef.current) {
      const newEvents = filterEvents(events, searchRef.current.value);
      setFilteredEvents(newEvents);
    }
  };

  const dateRange = getDateRange(events);

  // Add current visible date observer
  useEffect(() => {
    const observeElements = cardRefs
      .map((ref) => ref?.current)
      .filter((ref) => ref !== undefined) as (HTMLDivElement | null)[];

    const cleanup = observeCards(observeElements, setCurrentDate);
    return cleanup;
  });

  // Add eventDate to context API
  useEffect(() => {
    setEvents(DummyData);
    setFilteredEvents(DummyData);
    if (eventData === null) return;
    setEvents(eventData);
    setFilteredEvents(eventData);
  }, [eventData]);

  // Refresh eventCardsRef for date observer
  useEffect(() => {
    setCardRefs(events.map(() => createRef<HTMLDivElement>()));
  }, [events]);

  // Fetch data
  // useLayoutEffect(() => {
  //   if (fetchedData.current) return;
  //   fetchEvents();
  //   fetchedData.current = true;
  // }, []);

  return (
    <>
      <main className="search-event-main-content">
        <Content navSpace>
          <div className="header">
            <h3>Public Events</h3>
            <div className="tools flex-col sm:flex-row">
              <BadgeMolecule dateRange={dateRange} />
              <SearchMolecule
                handleSearchClick={handleSearchClick}
                search={search}
                ref={searchRef}
              />
            </div>
          </div>
        </Content>
        <StickyBarMolecule
          eventCount={filteredEvents.length}
          currentDate={currentDate ?? ""}
        />
        <Content>
          <ContentMolecule
            addToCart={addToCart}
            events={sortedEvents}
            cardRefs={cleanedCardRefs}
            loading={loading}
            error={error}
          />
        </Content>
      </main>
      <FloatingScrollButton />
    </>
  );
}
