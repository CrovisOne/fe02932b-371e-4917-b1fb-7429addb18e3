import { ImageCard } from "@/components/cards/ImageCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusIcon, SearchIcon } from "lucide-react";

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

export function SearchEventPage(): JSX.Element {
  const { events, setEvents } = useContext(EventListContext);
  const { addCartItem } = useContext(CartContext);

  const [currentDate, setCurrentDate] = useState<string | null>(null);
  const [filteredEvents, setFilteredEvents] = useState<EventProps[]>([]);

  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const cards = sortEvents(filteredEvents).map((item, index) => (
    <div ref={(ref) => (cardRefs.current[index] = ref)} data-date={item.date}>
      <ImageCard id={item._id}>
        <ImageCard.Image imageUrl={undefined} />
        <ImageCard.Body
          title={item.title}
          locationUrl={item.venue.direction}
          locationName={item.venue.name}
          startTime={item.startTime}
          endTime={item.endTime}
        />
        <ImageCard.Footer align="right">
          <Button
            size={"icon"}
            onClick={() => {
              addCartItem(item);
            }}
          >
            <PlusIcon className="h-5" />
          </Button>
        </ImageCard.Footer>
      </ImageCard>
    </div>
  ));

  const search = debounce((e: ChangeEvent<HTMLInputElement>) => {
    const newEvents = filterEvents(events, e.target.value);
    setFilteredEvents(newEvents);
    console.log("search");
  }, 400);

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
          <div className="mb-4 flex justify-between">
            <div className="flex gap-4">
              <Badge variant={"outline"}>Country</Badge>
              <Badge variant={"outline"}>Date</Badge>
            </div>
            <div className="itmes-center flex max-w-lg gap-2">
              <Button variant={"ghost"} size={"icon"}>
                <SearchIcon />
              </Button>
              <Input type="search" placeholder="Search..." onChange={search} />
            </div>
          </div>
          <StickyBar>{trimTimeFromDate(currentDate ?? "")}</StickyBar>
          <Grid>{cards}</Grid>
        </main>
      </Content>
    </>
  );
}
