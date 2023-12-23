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

  useEffect(() => {
    const observeElements = cardRefs
      .map((ref) => ref?.current)
      .filter((ref) => ref !== undefined) as (HTMLDivElement | null)[];

    const cleanup = observeCards(observeElements, setCurrentDate);
    return cleanup;
  });

  useEffect(() => {
    setEvents(DummyData);
    setFilteredEvents(DummyData);
    if (eventData === null) return;
    setEvents(eventData);
    setFilteredEvents(eventData);
  }, [eventData]);

  useEffect(() => {
    setCardRefs(events.map(() => createRef<HTMLDivElement>()));
  }, [events]);

  // useLayoutEffect(() => {
  //   if (fetchedData.current) return;
  //   fetchEvents();
  //   fetchedData.current = true;
  // }, []);

  return (
    <>
      <Content>
        <main className="flex flex-col gap-4 pt-4">
          <h3 className="my-4">Public Events</h3>
          <div className="flex justify-between">
            <BadgeMolecule dateRange={dateRange} />
            <SearchMolecule
              handleSearchClick={handleSearchClick}
              search={search}
              ref={searchRef}
            />
          </div>
          <StickyBarMolecule
            eventCount={filteredEvents.length}
            currentDate={currentDate ?? ""}
          />
          <ContentMolecule
            addToCart={addToCart}
            events={sortedEvents}
            cardRefs={cleanedCardRefs}
            loading={loading}
            error={error}
          />
        </main>
      </Content>
      <FloatingScrollButton />
    </>
  );
}
