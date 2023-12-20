import { ImageCard } from "@/components/cards/ImageCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusIcon, SearchIcon } from "lucide-react";

import DummyData from "../../assets/dummy.json";
import { Content, Grid, StickyBar } from "@/components/layout";
import { ChangeEvent, useContext, useLayoutEffect, useState } from "react";
import { EventListContext } from "@/provider/EventListProvider";
import { CartContext } from "@/provider/CartProvider";
import { EventProps } from "@/types/events";

export function SearchEventPage(): JSX.Element {
  const { events, setEvents } = useContext(EventListContext);
  const { addCartItem } = useContext(CartContext);

  const [filteredEvents, setFilteredEvents] = useState<EventProps[]>([]);

  const cards = filteredEvents.map((item) => (
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

  useLayoutEffect(() => {
    setEvents(DummyData);
    setFilteredEvents(DummyData);

    console.log("reset");
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
        <StickyBar>Im Sticky!</StickyBar>
        <Grid>{cards}</Grid>
      </Content>
    </>
  );
}
