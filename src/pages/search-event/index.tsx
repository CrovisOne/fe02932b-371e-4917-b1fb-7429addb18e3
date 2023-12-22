import { ImageCard } from "@/components/cards/ImageCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InfoIcon, PlusIcon, SearchIcon } from "lucide-react";
import UkFlag from "@/assets/united-kingdom.png";
import DummyData from "../../assets/dummy.json";
import { Content, Grid, StickyBar } from "@/components/layout";
import {
  ChangeEvent,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { EventListContext } from "@/provider/EventListProvider";
import { CartContext } from "@/provider/CartProvider";
import { EventProps } from "@/types/events";
import { trimTimeFromDate } from "@/utils/dateHandler";
import { observeCards } from "./scripts/dateObserver";
import { filterEvents, sortEvents } from "./scripts/eventHandler";
import { debounce } from "@/utils/debouncer";
import { getDateRange } from "./scripts/eventDateRange";
import { useToast } from "@/components/ui/use-toast";
import { FloatingScrollButton } from "@/components/floating/FloatingScrollButton";
import { NotePlaceholder } from "@/components/placeholder/NotePlaceholder";

export function SearchEventPage(): JSX.Element {
  const { toast } = useToast();

  const { events, setEvents } = useContext(EventListContext);
  const { addCartItem, cartContent } = useContext(CartContext);

  const [currentDate, setCurrentDate] = useState<string | null>(null);
  const [filteredEvents, setFilteredEvents] = useState<EventProps[]>([]);

  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const searchRef = useRef<HTMLInputElement>(null);

  const cards = sortEvents(filteredEvents)
    .filter(
      (item) => !cartContent.some((cartItem) => cartItem._id === item._id),
    )
    .map((item, index) => (
      <div ref={(ref) => (cardRefs.current[index] = ref)} data-date={item.date}>
        <ImageCard id={item._id}>
          <ImageCard.Image imageUrl={undefined} />
          <ImageCard.Body
            title={item.title}
            locationUrl={item.venue.direction}
            locationName={item.venue.name}
            startTime={item.startTime ?? item.date}
            endTime={item.endTime}
          />
          <ImageCard.Footer align="right">
            <Button
              size={"icon"}
              onClick={() => {
                addToCart(item);
              }}
            >
              <PlusIcon className="h-5" />
            </Button>
          </ImageCard.Footer>
        </ImageCard>
      </div>
    ));

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
    const cleanup = observeCards(cardRefs.current, setCurrentDate);
    return cleanup;
  });

  useLayoutEffect(() => {
    setEvents(DummyData);
    setFilteredEvents(DummyData);
  }, []);

  return (
    <>
      <Content>
        <main className="flex flex-col gap-4 pt-4">
          <h3 className="my-4">Public Events</h3>
          <div className="flex justify-between">
            <div className="flex gap-4">
              <Badge variant={"outline"} className="flex gap-2 px-2">
                <img
                  src={UkFlag}
                  className="aspect-square h-6 w-6 overflow-hidden rounded-full"
                />
                LONDON
              </Badge>
              <Badge
                variant={"outline"}
              >{`${dateRange.earliest} - ${dateRange.latest}`}</Badge>
            </div>
            <div className="itmes-center flex max-w-lg gap-2">
              <Button
                variant={"ghost"}
                size={"icon"}
                onClick={handleSearchClick}
              >
                <SearchIcon />
              </Button>
              <Input
                ref={searchRef}
                type="search"
                placeholder="Search..."
                onChange={search}
              />
            </div>
          </div>
          <StickyBar>
            {filteredEvents.length !== 0
              ? trimTimeFromDate(currentDate ?? "")
              : ""}
          </StickyBar>
          {filteredEvents.length !== 0 ? (
            <Grid>{cards}</Grid>
          ) : (
            <NotePlaceholder>
              <InfoIcon />
              No Results found
            </NotePlaceholder>
          )}
        </main>
      </Content>
      <FloatingScrollButton />
    </>
  );
}
