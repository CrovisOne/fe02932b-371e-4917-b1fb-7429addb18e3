import { ImageCard } from "@/components/cards/ImageCard";
import { Grid, LazyLoader } from "@/components/layout";
import { NotePlaceholder } from "@/components/placeholder/NotePlaceholder";
import { Button } from "@/components/ui/button";
import { EventProps } from "@/types/events";
import { InfoIcon, PlusIcon } from "lucide-react";
import { RefObject } from "react";

interface ContentMoleculeProps {
  events: EventProps[];
  addToCart: (event: EventProps) => void;
  loading: boolean;
  error: string | null;
  cardRefs: RefObject<HTMLDivElement>[];
}

export function ContentMolecule({
  events,
  addToCart,
  loading,
  error,
  cardRefs,
}: ContentMoleculeProps): JSX.Element {
  const renderCard = (item: EventProps, index: number) => (
    <ImageCard id={item._id} ref={cardRefs[index]} data-date={item.date}>
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
  );

  return (
    <>
      {loading ? <NotePlaceholder>Please wait a moment</NotePlaceholder> : null}
      {!loading && error ? (
        <NotePlaceholder>
          {"Sorry, I couldn't find any events :("}
        </NotePlaceholder>
      ) : null}
      {!loading && !error && events.length === 0 ? (
        <NotePlaceholder>
          <InfoIcon />
          No search results found
        </NotePlaceholder>
      ) : null}
      {!loading && !error && events.length !== 0 ? (
        <Grid>
          <LazyLoader
            items={events}
            renderRow={renderCard}
            initialCount={10}
            increment={10}
          />
        </Grid>
      ) : null}
    </>
  );
}
