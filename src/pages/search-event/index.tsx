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

export function SearchEventPage(): JSX.Element {
  const { events, setEvents } = useContext(EventListContext);
  const { addCartItem } = useContext(CartContext);

  const [currentDate, setCurrentDate] = useState<string | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [filteredEvents, setFilteredEvents] = useState<EventProps[]>([]);

  const cards = filteredEvents
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map((item, index) => (
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

  const search = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length === 0) {
      setFilteredEvents(events);
    }

    const newEventList = events.filter((event) =>
      event.title.toLowerCase().includes(e.target.value.toLowerCase()),
    );
    setFilteredEvents(newEventList);
  };

  useEffect(() => {
    let visibleEntries: IntersectionObserverEntry[] = [];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleEntries.push(entry);
          } else {
            visibleEntries = visibleEntries.filter(
              (e) => e.target !== entry.target,
            );
          }

          if (visibleEntries.length > 0) {
            const earliestEntry = visibleEntries.reduce((earliest, current) => {
              return new Date(earliest.target.getAttribute("data-date") || "") <
                new Date(current.target.getAttribute("data-date") || "")
                ? earliest
                : current;
            });

            setCurrentDate(earliestEntry.target.getAttribute("data-date"));
          }
        });
      },
      { threshold: 0.1 },
    );

    cardRefs.current.forEach((ref) => ref && observer.observe(ref));

    return () => {
      cardRefs.current.forEach((ref) => ref && observer.unobserve(ref));
    };
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
        </main>
        <StickyBar>{trimTimeFromDate(currentDate ?? "")}</StickyBar>
        <Grid>{cards}</Grid>
      </Content>
    </>
  );
}
