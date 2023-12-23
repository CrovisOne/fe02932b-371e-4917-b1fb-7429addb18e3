import { ImageCard } from "@/components/cards/ImageCard";
import { Grid, LazyLoader } from "@/components/layout";
import { NotePlaceholder } from "@/components/placeholder/NotePlaceholder";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { EventProps } from "@/types/events";
import { InfoIcon, PlusIcon } from "lucide-react";
import { RefObject } from "react";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const handleImageCardClick = (url: string): void => {
    navigate(url);
  };

  const renderCard = (item: EventProps, index: number) => (
    <ImageCard
      id={item._id}
      ref={cardRefs[index]}
      key={index}
      data-date={item.date}
      className="img-card transition-transform hover:scale-105"
      tabIndex={0}
      onKeyDown={(e: any) => {
        if (e.key === "Enter") handleImageCardClick(item.contentUrl);
      }}
      onClick={() => {
        handleImageCardClick(item.contentUrl);
      }}
    >
      <ImageCard.Image
        imageUrl={item.flyerFront ?? undefined}
        badge={item.venue.live ? <p className="img-badge">Live</p> : undefined}
      />
      <ImageCard.Body
        title={item.title}
        locationUrl={item.venue.direction}
        locationName={item.venue.name}
        startTime={item.startTime ?? item.date}
        endTime={item.endTime}
      />
      <ImageCard.Footer align="right">
        <p className="price">00,00 £</p>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Button
                size={"icon"}
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(item);
                }}
              >
                <PlusIcon className="h-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent align="end">Add to Cart</TooltipContent>
          </Tooltip>
        </TooltipProvider>
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
            initialCount={18}
            increment={18}
          />
        </Grid>
      ) : null}
    </>
  );
}
