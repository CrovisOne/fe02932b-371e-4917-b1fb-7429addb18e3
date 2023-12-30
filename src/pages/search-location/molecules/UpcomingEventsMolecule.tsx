import { EventProps } from "@/types/events";
import { useNavigate } from "react-router-dom";
import { ImageCard } from "@/components/cards/ImageCard";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { Grid, LazyLoader } from "@/components/layout";

interface UpcomingEventsMoleculeProps {
  events: EventProps[];
  addToCart: (events: EventProps) => void;
}

export function UpcomingEventsMolcule({
  events,
  addToCart,
}: UpcomingEventsMoleculeProps): JSX.Element {
  const navigate = useNavigate();

  const handleImageCardClick = (url: string): void => {
    navigate(url);
  };

  const renderCard = (item: EventProps, index: number) => (
    <ImageCard
      id={item._id}
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
      {events.length > 0 ? (
        <>
          <div className="events-header">
            <h4>Upcoming Events</h4>
            <span>
              In{" "}
              <a className="a-link">
                {events.length > 0 ? events[0].venue.name : ""}
              </a>{" "}
              • Events: {events.length}
            </span>
          </div>
          <Grid>
            <LazyLoader
              items={events}
              renderRow={renderCard}
              initialCount={18}
              increment={18}
            />
          </Grid>
        </>
      ) : null}
    </>
  );
}
